"""Acquire Milano independently; preserve the existing frozen corpus and assets.

The first run accepts --source FILE (an authentic downloaded HTML response).
Subsequent runs reuse sources/milano.html and its recorded metadata.
"""
import argparse
import concurrent.futures
import copy
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import shutil
from urllib.parse import urljoin, urlsplit
from zoneinfo import ZoneInfo

from lxml import html
import capture as c

ROOT = Path(__file__).resolve().parents[1]
URL = 'https://www.ilmeteo.it/meteo/milano'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path)
    args = parser.parse_args()
    raw = ROOT / 'sources/milano.html'
    metadata_file = ROOT / 'sources/milano-manifest.json'
    if not raw.exists():
        if not args.source:
            parser.error('Provide --source for the first acquisition')
        shutil.copy2(args.source, raw)
        c.write_json(metadata_file, {'url': URL, 'file': 'sources/milano.html',
            'capturedAt': datetime.now(timezone.utc).isoformat(),
            'sha256': c.digest(raw.read_bytes()), 'bytes': raw.stat().st_size})
    metadata = json.loads(metadata_file.read_text())
    assert c.digest(raw.read_bytes()) == metadata['sha256'], 'Immutable Milano source changed'
    tree = html.document_fromstring(raw.read_text(), base_url=URL)
    assert 'Meteo Milano' in c.text_content(tree.find('.//title'))
    existing = json.loads((ROOT / 'assets/manifest.json').read_text())
    local_manifest = ROOT / 'assets/milano-manifest.json'
    cached = existing['assets'] + (json.loads(local_manifest.read_text())['assets'] if local_manifest.exists() else [])
    assets = {a['url']: a for a in cached if a['status'] != 'failed' and (ROOT / a['file']).exists()}
    needed = c.html_references(tree, URL)
    visited = set()
    acquired = {}
    failures = []

    def acquire(url):
        if url in assets:
            return assets[url]
        data, headers, final_url, status = c.fetch(url)
        # A separate folder prevents an acquisition from replacing an existing bitmap.
        name = Path(c.resource_file(url)).name
        file = 'assets/milano/' + name
        dest = ROOT / file
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        is_css = file.endswith('.css')
        if is_css:
            Path(str(dest) + '.source').write_bytes(data)
        return {'url': url, 'resolvedUrl': final_url, 'file': file, 'status': status,
            'contentType': headers.get('Content-Type', ''), 'bytes': len(data),
            'sha256': c.digest(data), 'sourceSha256': c.digest(data),
            'sourceFile': file + '.source' if is_css else file}

    while needed - visited:
        batch = sorted(needed - visited)
        print(f'Milano resources: {len(batch)}', flush=True)
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            tasks = [(url, pool.submit(acquire, url)) for url in batch]
            for url, task in tasks:
                visited.add(url)
                try:
                    item = task.result()
                    assets[url] = acquired[url] = item
                    if item['file'].endswith('.css'):
                        source = ROOT / item.get('sourceFile', item['file'] + '.source')
                        needed.update(c.css_references(source.read_text(), item.get('resolvedUrl', url)))
                except Exception as error:
                    failures.append({'url': url, 'error': str(error)})

    owner = ROOT / 'originale/milano.html'

    def local(value, base, target):
        url = c.absolute(value, base)
        item = acquired.get(url)
        if not item:
            return None
        suffix = '#' + urlsplit(value).fragment if urlsplit(value).fragment else ''
        return os.path.relpath(ROOT / item['file'], target.parent) + suffix

    def css(text, base, target):
        def rewrite(match):
            value = match.group(2)
            resolved = local(value, base, target)
            return 'url("' + resolved + '")' if resolved else match.group(0) if value.startswith(('data:', '#')) else 'url(data:,)'
        text = c.CSS_URL.sub(rewrite, text)
        return c.CSS_IMPORT.sub(lambda m: '@import "' + (local(m.group(1), base, target) or 'data:text/css,') + '"', text)

    for item in acquired.values():
        if item['file'].startswith('assets/milano/') and item['file'].endswith('.css'):
            target = ROOT / item['file']
            target.write_text(css((ROOT / item['sourceFile']).read_text(), item['resolvedUrl'], target))
            item['sha256'] = c.digest(target.read_bytes())
            item['bytes'] = target.stat().st_size

    # Reuse the factual weather extractor with Milano as its city tree. Its legacy
    # city/date labels are explicitly replaced from this source's daily selector.
    home = html.document_fromstring((ROOT / 'sources/home.html').read_text())
    national = html.document_fromstring((ROOT / 'sources/domani.html').read_text())
    extracted = {key: c.extract_data(t, key, metadata) for key, t in [('home', home), ('bologna', tree), ('domani', national)]}
    weather = c.weather_data({'home': home, 'bologna': tree, 'domani': national}, extracted, assets)
    edition = datetime.fromtimestamp(int(weather['daily'][0]['timestamp']), ZoneInfo('Europe/Rome')).date().isoformat()
    daily = []
    for day in weather['daily']:
        day['date'] = datetime.fromtimestamp(int(day['timestamp']), ZoneInfo('Europe/Rome')).date().isoformat()
        day['hourlyAvailable'] = day['sourceUrl'].rstrip('/') == URL
        daily.append(day)
    dialogs = {}
    for dialog in tree.xpath('//dialog'):
        fields = []
        for field in c.exact_class(dialog, 'data-row'):
            label = c.exact_class(field, 'data-label')
            value = c.exact_class(field, 'data-value')
            if label and value:
                fields.append({'label': c.text_content(label[0]), 'value': c.text_content(value[0])})
        descriptions = c.exact_class(dialog, 'previ-descri')
        dialogs[dialog.get('id')] = {'fields': fields, 'description': c.text_content(descriptions[0]) if descriptions else '',
            'sourceXPath': tree.getroottree().getpath(dialog)}
    hourly = []
    sequences = {}
    from datetime import date, timedelta
    source_rows = tree.xpath('//tr[@data-hour]')
    assert len(weather['hourly']) == len(source_rows)
    for index, (row, element) in enumerate(zip(weather['hourly'], source_rows)):
        interval = row['intervalHours']
        hour = int(row['hour']) % 24
        state = sequences.setdefault(interval, {'last': -1, 'offset': 0})
        if hour < state['last']:
            state['offset'] += 1
        state['last'] = hour
        day = (date.fromisoformat(edition) + timedelta(days=state['offset'])).isoformat()
        requested = 'dialog-dettaglio-' + element.get('data-dialogid')
        resolved = requested
        if resolved not in dialogs:
            # Preserve and document the source's 02/26-hour spelling mismatch.
            candidate = 'dialog-dettaglio-' + str(hour + 24) + ('h3' if interval == 3 else '')
            assert candidate in dialogs, f'Missing source detail: {requested}'
            resolved = candidate
        detail = dialogs[resolved]
        hourly.append({**row, 'id': f'milano-{day}-{hour:02d}-{interval}h', 'date': day, 'time': f'{hour:02d}:00',
            'detail': detail, 'condition': detail['description'], 'sourceXPath': tree.getroottree().getpath(element),
            'detailAssociation': {'requestedId': requested, 'resolvedId': resolved, 'derived': requested != resolved}})
    sections = []
    for cls in ['notizia-geo', 'infoloc', 'eff', 'quality-air', 'pollini-container', 'weather_informations__box', 'attend-prev']:
        for element in c.exact_class(tree, cls):
            text = c.text_content(element)
            if not text or any(text in section['text'] for section in sections):
                continue
            headings = element.xpath('.//h2|.//h3')
            title = c.text_content(headings[0]) if headings else {'eff': 'Sole e luna', 'quality-air': 'Qualità dell’aria', 'pollini-container': 'Pollini', 'attend-prev': 'Voto degli utenti'}.get(cls, 'Informazioni della fonte')
            paragraphs = [c.text_content(p) for p in element.xpath('.//p') if c.text_content(p)]
            sections.append({'title': title, 'text': text, 'paragraphs': paragraphs,
                'sourceXPath': tree.getroottree().getpath(element),
                'links': [{'label': c.text_content(a), 'href': urljoin(URL, a.get('href'))} for a in element.xpath('.//a[@href]') if c.text_content(a) and a.get('href').startswith(('http', '/'))]})
    air = tree.get_element_by_id('box-previsioni-aria', None)
    if air is not None:
        sections.append({'title': 'Qualità dell’aria', 'text': c.text_content(air),
            'paragraphs': [], 'links': [], 'sourceXPath': tree.getroottree().getpath(air)})
    services = c.exact_class(tree, 'city_services')
    for service in services:
        sections.append({'title': 'Servizi di Milano', 'text': c.text_content(service),
            'paragraphs': [], 'sourceXPath': tree.getroottree().getpath(service),
            'links': [{'label': c.text_content(a), 'href': urljoin(URL, a.get('href'))}
                for a in service.xpath('.//a[@href]') if c.text_content(a) and a.get('href').startswith(('http', '/'))]})
    data = {'schemaVersion': 1, 'city': 'Milano', 'date': edition, 'source': metadata,
        'update': weather['update'], 'author': weather['author'], 'daily': daily, 'hourly': hourly,
        'realtime': weather['realtime'], 'sections': sections, 'live': False}
    c.write_json(ROOT / 'data/milano.json', data)

    # Keep the authentic DOM and presentation, stripping remote execution only.
    served = copy.deepcopy(tree)
    for element in list(served.xpath('//script|//iframe|//embed|//object|//base')):
        element.drop_tree()
    for element in list(served.xpath('//link')):
        if element.get('rel') in ['preconnect', 'dns-prefetch', 'prefetch', 'manifest', 'alternate'] or element.get('as') == 'script':
            element.drop_tree()
    routes = {'/': 'index.html', '/portale': 'index.html', '/meteo/milano': 'milano.html', '/portale/meteo-domani': 'domani.html'}
    for element in list(served.iter()):
        if not isinstance(element.tag, str):
            continue
        for attr in list(element.attrib):
            if attr.lower().startswith('on'):
                del element.attrib[attr]
        for attr in ['src', 'poster', 'data-src', 'data-original', 'data-lazy-src']:
            if element.get(attr):
                target = local(element.get(attr), URL, owner)
                if target:
                    element.set(attr, target)
                elif not element.get(attr).startswith(('data:', '#')):
                    element.attrib.pop(attr, None)
        for attr in ['srcset', 'data-srcset']:
            if element.get(attr):
                values = []
                for item in element.get(attr).split(','):
                    parts = item.strip().split()
                    if parts and (target := local(parts[0], URL, owner)):
                        values.append(' '.join([target, *parts[1:]]))
                element.set(attr, ', '.join(values))
        if element.get('style'):
            element.set('style', css(element.get('style'), URL, owner))
        if element.tag == 'style':
            element.text = css(element.text or '', URL, owner)
        if element.tag == 'link' and element.get('href'):
            target = local(element.get('href'), URL, owner)
            if target:
                element.set('href', target)
            elif element.get('rel') in ['stylesheet', 'preload', 'icon', 'apple-touch-icon']:
                element.drop_tree()
        if element.tag in ['a', 'area'] and element.get('href'):
            url = urljoin(URL, element.get('href'))
            route = routes.get(urlsplit(url).path.rstrip('/') or '/') if urlsplit(url).hostname in ['www.ilmeteo.it', 'ilmeteo.it'] else None
            if route:
                element.set('href', route)
                element.attrib.pop('target', None)
            elif url.startswith(('http:', 'https:', 'javascript:')):
                element.set('data-live-href', url)
                element.set('href', '#snapshot-unavailable')
        if element.tag == 'form':
            element.set('action', 'milano.html')
    served.find('.//head').insert(0, html.Element('meta', {'http-equiv': 'Content-Security-Policy',
        'content': "default-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'"}))
    served.find('.//body').append(html.Element('script', {'src': 'snapshot.js', 'defer': 'defer', 'data-page': 'milano'}))
    owner.write_bytes(html.tostring(served, encoding='utf8', method='html', doctype='<!DOCTYPE html>'))
    c.write_json(local_manifest, {'schemaVersion': 1, 'source': metadata, 'assets': list(acquired.values()), 'failures': failures, 'license': existing['license']})
    assert len(hourly) == len(dialogs), 'Incomplete hourly detail coverage'
    print(json.dumps({'city': data['city'], 'date': edition, 'hourly': len(hourly), 'dialogs': len(dialogs), 'days': len(daily), 'resources': len(acquired), 'failures': failures}, ensure_ascii=False))


if __name__ == '__main__':
    main()
