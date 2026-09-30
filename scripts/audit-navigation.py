#!/usr/bin/env python3
"""Audit the built archive using browser URL resolution and Linux path spelling.

Also inventory placeholders, form destinations and JavaScript navigation for
manual/runtime review; a valid href alone does not prove a working control.
"""
import argparse
import json
import re
from collections import Counter
from pathlib import Path
from urllib.parse import quote, unquote, urljoin, urlsplit

from bs4 import BeautifulSoup


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', default='_site')
    parser.add_argument('--base', default='https://cremarco.github.io/cvedi2627/')
    parser.add_argument('--report', default='reports/links-2026-10-01/static.json')
    parser.add_argument('--runtime', help='Optional DOM link inventory captured in the browser')
    args = parser.parse_args()
    root = Path(args.root).resolve()
    archive = root / 'project'
    base = args.base.rstrip('/') + '/'
    base_path = urlsplit(base).path
    inventory = {p.relative_to(root).as_posix(): p for p in root.rglob('*') if p.is_file()}
    runtime_capture = json.loads(Path(args.runtime).read_text()) if args.runtime else []
    runtime_ids = {item['page']: set(item.get('ids', [])) for item in runtime_capture}
    soups = {}
    def soup(p):
        if p not in soups:
            soups[p] = BeautifulSoup(p.read_text(errors='replace'), 'html.parser')
        return soups[p]
    def check(url, context):
        url = url.strip()
        # urllib joins empty path segments away; browsers preserve doubled slashes.
        protected = url.replace('//', '/__cvedi_empty_segment__/') if not urlsplit(url).scheme and not url.startswith('//') else url
        absolute = urljoin(context, protected).replace('/__cvedi_empty_segment__/', '//')
        parsed = urlsplit(absolute)
        if parsed.scheme not in ('http', 'https'):
            return 'protocol', absolute
        if parsed.netloc != urlsplit(base).netloc:
            return 'external', absolute
        decoded = unquote(parsed.path)
        if not decoded.startswith(base_path):
            return 'outside-repository', absolute
        rel = decoded[len(base_path):]
        if not rel or rel.endswith('/'):
            rel += 'index.html'
        # GitHub Pages redirects directories without a trailing slash.
        if rel not in inventory and rel + '/index.html' in inventory:
            rel += '/index.html'
        if rel not in inventory:
            similar = [name for name in inventory if name.casefold() == rel.casefold()]
            return ('case' if similar else 'missing'), absolute
        if parsed.fragment and inventory[rel].suffix.lower() in ('.html', '.htm'):
            fragment = unquote(parsed.fragment)
            dest = soup(inventory[rel])
            if not (dest.find(id=fragment) or dest.find(attrs={'name': fragment}) or fragment in runtime_ids.get(rel, set())):
                return 'fragment', absolute
        return 'ok', absolute

    pages = sorted(p for p in archive.rglob('*') if p.is_file() and p.suffix.lower() in ('.html', '.htm'))
    links, issues, placeholders, forms, resources, js, js_links = [], [], [], [], [], [], []
    sites, external = set(), set()
    js_seen = set()
    for page in pages:
        rel = page.relative_to(root).as_posix()
        parts = page.relative_to(archive).parts
        if len(parts) < 3:
            continue
        sites.add('/'.join(parts[:2]))
        url = urljoin(base, quote(rel, safe='/'))
        doc = soup(page)
        base_tag = doc.find('base', href=True)
        context = urljoin(url, base_tag['href']) if base_tag else url
        for a in doc.select('a, area'):
            href = a.get('href')
            label = a.get_text(' ', strip=True) or a.get('aria-label') or ' '.join(i.get('alt', '') for i in a.select('img'))
            record = {'page': rel, 'href': href, 'label': label[:180]}
            if href is None or href.strip() in ('', '#', '#!', '#0') or href.lower().startswith('javascript:'):
                record.update({k: a.get(k) for k in ('id', 'class', 'onclick', 'role', 'data-toggle', 'data-bs-toggle', 'data-target', 'data-bs-target') if a.get(k)})
                placeholders.append(record)
                continue
            status, absolute = check(href, context)
            record.update(status=status, url=absolute)
            links.append(record)
            if status == 'external':
                external.add(absolute.split('#')[0])
            elif status not in ('ok', 'protocol'):
                issues.append(record)
        for form in doc.find_all('form'):
            action = form.get('action', '')
            status, absolute = check(action, context)
            forms.append({'page': rel, 'action': action, 'method': form.get('method', 'get'), 'status': status, 'url': absolute, 'onsubmit': form.get('onsubmit')})
        for tag in doc.select('script[src], iframe[src]'):
            status, absolute = check(tag['src'], context)
            record = {'page': rel, 'tag': tag.name, 'src': tag['src'], 'status': status, 'url': absolute}
            resources.append(record)
            if status not in ('ok', 'external', 'protocol'):
                issues.append(record)
        for tag in doc.find_all(True):
            for attr in ('onclick', 'onchange', 'data-href', 'data-url'):
                if tag.get(attr):
                    js.append({'page': rel, 'source': attr, 'code': tag[attr][:1200], 'label': tag.get_text(' ', strip=True)[:100]})
                    code = tag[attr]
                    for match in re.finditer(r'''(?:location(?:\.href)?\s*=|location\.(?:assign|replace)\(|window\.open\()\s*(["'`])([^"'`\n]+)\1''', code):
                        href = match.group(2)
                        if href in ('#', '#!', '#0') or '${' in href:
                            continue
                        status, absolute = check(href, context)
                        record = {'page': rel, 'source': attr, 'href': href, 'status': status, 'url': absolute}
                        js_links.append(record)
                        if status not in ('ok', 'external', 'protocol'):
                            issues.append(record)
                        if status == 'external':
                            external.add(absolute.split('#')[0])
        for tag in doc.find_all('script'):
            if tag.get('src'):
                src = urljoin(context, tag['src'])
                parsed = urlsplit(src)
                if parsed.netloc != urlsplit(base).netloc or not unquote(parsed.path).startswith(base_path):
                    continue
                script_path = inventory.get(unquote(parsed.path)[len(base_path):])
                if not script_path:
                    continue
                previously_seen = script_path in js_seen
                js_seen.add(script_path)
                code = script_path.read_text(errors='replace')
                source = script_path.relative_to(root).as_posix()
            else:
                code = tag.get_text()
                source = rel + ':inline'
                previously_seen = False
            for match in re.finditer(r'''(?:location(?:\.href)?\s*=|location\.(?:assign|replace)\(|window\.open\()\s*(["'`])([^"'`\n]+)\1''', code):
                href = match.group(2)
                if '${' in href or href.startswith('#') and href in ('#', '#!', '#0'):
                    continue
                status, absolute = check(href, context)
                record = {'page': rel, 'source': source, 'href': href, 'status': status, 'url': absolute}
                js_links.append(record)
                if status not in ('ok', 'external', 'protocol'):
                    issues.append(record)
                if status == 'external':
                    external.add(absolute.split('#')[0])
            if previously_seen:
                continue
            # Capture navigation/HTML loads without printing whole minified libraries.
            patterns = [r'(?:window\.)?location(?:\.href|\.assign|\.replace)?\s*(?:=|\()', r'window\.open\(', r'(?:fetch|\.load|get|\.get)\([^\n;]{0,100}\.html?', r'preventDefault\(', r'\.html?[\"\x27`]']
            matches = sorted({m.start() for pattern in patterns for m in re.finditer(pattern, code)})
            if len(code) > 100000 and ('min.' in source or '/dist/' in source or '/bootstrap' in source or 'jquery' in source):
                continue
            if matches:
                js.append({'page': rel, 'source': source, 'snippets': [code[max(0, i-100):i+230] for i in matches][:100]})

    runtime_links = []
    if args.runtime:
        for captured in runtime_capture:
            context = urljoin(base, quote(captured['page'], safe='/'))
            for link in captured.get('links', []):
                href = link.get('href') or ''
                if href.strip() in ('', '#', '#!', '#0') or href.lower().startswith('javascript:'):
                    continue
                # Leaflet inserts popup close buttons rather than document anchors.
                if href == '#close' and 'leaflet-popup-close-button' in link.get('class', '').split() and link.get('role') == 'button':
                    continue
                absolute = link['url']
                parsed = urlsplit(absolute)
                if parsed.hostname in ('127.0.0.1', 'localhost') and parsed.path.startswith(base_path):
                    absolute = base.rstrip('/') + parsed.path[len(base_path)-1:]
                    if parsed.query:
                        absolute += '?' + parsed.query
                    if parsed.fragment:
                        absolute += '#' + parsed.fragment
                status, absolute = check(absolute, context)
                record = {'page': captured['page'], 'source': 'runtime', 'href': href, 'status': status, 'url': absolute}
                runtime_links.append(record)
                if status not in ('ok', 'external', 'protocol'):
                    issues.append(record)
    report = {'summary': {'sites': len(sites), 'pages': sum(len(p.relative_to(archive).parts) >= 3 for p in pages), 'links': len(links), 'javascriptLinks': len(js_links), 'runtimeLinks': len(runtime_links), 'status': dict(Counter(l['status'] for l in links)), 'issues': len(issues), 'placeholders': len(placeholders)}, 'issues': issues, 'links': links, 'external': sorted(external), 'placeholders': placeholders, 'forms': forms, 'resources': resources, 'javascript': js, 'javascriptLinks': js_links, 'runtimeLinks': runtime_links, 'pages': [p.relative_to(root).as_posix() for p in pages]}
    out = Path(args.report)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2))
    print(json.dumps(report['summary'], ensure_ascii=False))
    for issue in issues:
        print(json.dumps(issue, ensure_ascii=False))
    return bool(issues)


if __name__ == '__main__':
    raise SystemExit(main())
