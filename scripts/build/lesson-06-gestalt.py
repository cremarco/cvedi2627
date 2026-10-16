"""Rebuild the Gestalt lesson from its current, locally preserved Figma snapshot.

Content, source selection and original exports live in assets/booklet/lezione-06-gestalt.
No network access, recolouring or resampling is involved in this build.
"""
from pathlib import Path
from PIL import Image
import base64
import hashlib
import html
import io
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / 'assets/booklet/lezione-06-gestalt'
SOURCE_PATH = 'assets/booklet/lezione-06-gestalt/figma-source.json'
source = json.loads((ROOT / SOURCE_PATH).read_text())
plan = json.loads((BASE / 'content-plan.json').read_text())
selection = json.loads((BASE / 'asset-sources.json').read_text())
frames = {f['id']: f for f in source['frames']}
PUBLIC = ROOT / 'public/images/processo-ux'
PUBLIC.mkdir(parents=True, exist_ok=True)
records = {}
uses = {}

def digest(data):
    return hashlib.sha256(data).hexdigest()

def quoted(value):
    return json.dumps(value, ensure_ascii=False)

def escape(value):
    return html.escape(value, quote=True)

def publish(node_id, original, data, extension, dimensions, provenance, retained):
    publication_hash = digest(data)
    identity = 'l06-' + re.sub(r'[^a-zA-Z0-9-]', '-', node_id).strip('-')
    web = f'/images/processo-ux/{identity}-{publication_hash[:12]}.{extension}'
    (ROOT / 'public' / web.lstrip('/')).write_bytes(data)
    record = dict(id=identity, original=original, web=web, nodeId=node_id,
        caption='', sha256=digest((ROOT / original).read_bytes()), dimensions=dimensions,
        encoding=dict(lossless=True, exactAlpha=True), retainedSources=sorted(set(retained)),
        publicationSha256=publication_hash,
        provenance=dict(kind='figma-import', fileKey=source['fileKey'], pageId=source['pageId'],
            importedOn=source['date'], **provenance),
        publicationEncoding=dict(pixelPreserved=True, alphaPreserved=True))
    return record

for node_id, node in selection['nodes'].items():
    if 'hash' not in node:
        continue
    original = node['sourcePath']
    metadata = selection['hashes'][node['hash']]
    with Image.open(ROOT / original) as image:
        image.load()
        image = image.convert('RGBA')
        crop = node.get('crop')
        pixels = None
        if crop:
            c = crop['normalized']
            w, h = image.size
            pixels = [round(c['x'] * w), round(c['y'] * h),
                      round((c['x'] + c['width']) * w), round((c['y'] + c['height']) * h)]
            image = image.crop(pixels)
        # Reuse a previous lossless encoding only after comparing the actual
        # decoded pixels, including the current Figma crop and transparency.
        identity = 'l06-' + re.sub(r'[^a-zA-Z0-9-]', '-', node_id).strip('-')
        data = None
        for cached in PUBLIC.glob(identity + '-*.webp'):
            with Image.open(cached) as check:
                if check.size == image.size and check.convert('RGBA').tobytes() == image.tobytes():
                    data = cached.read_bytes()
                    break
        if data is None:
            buffer = io.BytesIO()
            image.save(buffer, 'WEBP', lossless=True, exact=True)
            data = buffer.getvalue()
        with Image.open(io.BytesIO(data)) as check:
            assert check.convert('RGBA').tobytes() == image.tobytes(), node_id
        uses[node_id] = publish(node_id, original, data, 'webp', list(image.size),
            dict(sourceNode=node_id, sourceImageHash=node['hash'], cropPixels=pixels,
                 imageTransform=node.get('imageTransform'), credit=metadata['rights'],
                 source=metadata.get('provenance')), [original, SOURCE_PATH, metadata['provenance']['manifest']])

for logo in selection['nativeLogos']:
    original = logo['path']
    data = (ROOT / original).read_bytes()
    svg = ET.fromstring(data)
    viewbox = [float(n) for n in svg.get('viewBox', '0 0 300 300').replace(',', ' ').split()]
    uses[logo['nodeId']] = publish(logo['nodeId'], original, data, 'svg', viewbox[2:],
        dict(credit=logo['attribution'], source=logo['source'], rights=logo['rights']),
        [original, SOURCE_PATH, logo['manifest']])

for figure in selection['currentDiagramExports']:
    node_id = figure['nodeId']
    original = figure['path']
    path = ROOT / original
    if not path.exists():
        continue
    data = path.read_bytes()
    svg = ET.fromstring(data)
    viewbox = [float(n) for n in svg.get('viewBox').split()]
    uses[node_id] = publish(node_id, original, data, 'svg', viewbox[2:],
        dict(credit='Schema didattico originale CVeDI, 2026.', export='SVG con testo convertito in tracciati; geometrie e colori Figma conservati.'),
        [original, SOURCE_PATH])

def composite(row, figures):
    """Embed the selected source bytes; SVG only arranges them, without resampling."""
    count = len(figures)
    if count == 6:
        cols, rows, cell_w, cell_h = 3, 2, 420, 210
    elif count == 4:
        cols, rows, cell_w, cell_h = 3, 2, 420, 240
    elif count == 3:
        cols, rows, cell_w, cell_h = 3, 1, 420, 290
    else:
        cols, rows, cell_w, cell_h = 2, 1, 630, 540
    width, height = cols * cell_w, rows * cell_h
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">']
    for i, figure in enumerate(figures):
        if count == 4:
            x, y, w, h = (420, 0, 420, cell_h) if i == 0 else ((i-1) * cell_w, cell_h, cell_w, cell_h)
        else:
            x, y, w, h = (i % cols) * cell_w, (i // cols) * cell_h, cell_w, cell_h
        if row['folio'] == 257:
            label = ('Vista' if i < 3 else 'Dettaglio') + ' · ' + ['6,5000 s', '6,6167 s', '6,7667 s'][i % 3]
        elif count == 4 and row['folio'] in [260, 261]:
            label = 'Vista completa' if i == 0 else (['t₀', 't₁', 't₂'][i-1] if row['folio'] == 261 else f'Stato {i}')
        elif count >= 3:
            label = ('Vista completa' if i == 0 else f'Dettaglio {i}') if count == 4 else f'Stato {i % 3 + 1}'
        elif len(row.get('bookletFigureNumbers', [])) == count:
            label = 'Figura ' + row['bookletFigureNumbers'][i]
        else:
            label = 'Vista completa' if i == 0 else 'Dettaglio'
        svg.append(f'<text x="{x+w/2}" y="{y+20}" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#0f172a">{label}</text>')
        data = (ROOT / 'public' / figure['web'].lstrip('/')).read_bytes()
        mime = 'image/svg+xml' if figure['web'].endswith('.svg') else 'image/webp'
        payload = base64.b64encode(data).decode()
        svg.append(f'<image x="{x+8}" y="{y+32}" width="{w-16}" height="{h-40}" preserveAspectRatio="xMidYMid meet" href="data:{mime};base64,{payload}"/>')
    svg.append('</svg>')
    data = '\n'.join(svg).encode()
    original = f"assets/booklet/lezione-06-gestalt/originals/sequence-{row['sequence']:03}.svg"
    (ROOT / original).write_bytes(data)
    record = publish(f"sequence-{row['sequence']:03}", original, data, 'svg', [width, height],
        dict(credit=row['credit'], sourceNodes=row['figureCandidates'],
             composition='Originali incorporati senza ricampionamento; viste e dettagli disposti in ordine di lettura.'),
        [original, SOURCE_PATH, *[f for figure in figures for f in figure['retainedSources']]])
    return record

def compact_credit(row):
    credit = row['credit']
    if row['folio'] == 317:
        return 'Möller, Brezing e Unz, 2012; Kapllani ed Elmimouni, 2020. Fonti e limiti nel booklet.'
    # Keep the relevant case's attribution when the printed page carries two cases.
    if row.get('caseSourceIndex') is not None:
        sources = credit.split('\n')
        credit = sources[min(row['caseSourceIndex'], len(sources)-1)]
    credit = credit.split('\n')[0]
    credit = re.sub(r'[¹²³⁴⁵⁶⁷⁸⁹]', '', credit)
    credit = re.sub(r'\s+—\s+(?:https?://)?\S+.*', '', credit)
    if len(credit) > 240:
        credit = 'Booklet, folio ' + str(row['folio']) + ' · ' + credit[:225].rsplit(' ', 1)[0] + '…'
    return credit

def prose(row):
    body = []
    if row['lead']:
        body.append(f'<p class="lead">{escape(row["lead"])}</p>')
    body.extend(f'<p>{escape(p)}</p>' for p in row['paragraphs'])
    if row['bullets']:
        body.append('<ul class="cvedi-list">' + ''.join(f'<li><span>{escape(b)}</span></li>' for b in row['bullets']) + '</ul>')
    return '\n'.join(body)

slides = []
mapping = []
def add(title, body, minutes, nodes, folios, classes, alias, assets=None, **frontmatter):
    number = len(slides) + 1
    fm = dict(layout='default', lesson='gestalt', lessonSlide=number, lessonMinutes=minutes,
        lessonSection='gestalt', **{'class': 'content-slide ux-process-lesson lesson-slide ' + classes},
        routeAlias=alias, footer='Gestalt', bookletNodes=nodes, bookletFolios=folios,
        bookletAssets=[a['id'] for a in assets or []])
    fm.update(frontmatter)
    slides.append('---\n' + '\n'.join(f'{key}: {quoted(value)}' for key,value in fm.items()) + '\n---\n\n# ' + title + '\n\n' + body.strip() + '\n')
    mapping.append(dict(lesson='gestalt', lessonSlide=number, alias=alias, title=title,
        minutes=minutes, sourcePages=[], sourceNodes=nodes, sourceFolios=folios,
        currentSource=SOURCE_PATH, assets=fm['bookletAssets'],
        bookletFigures=fm.get('bookletFigures', []),
        bookletFigureReferences=fm.get('bookletFigureReferences', [])))

add('Gestalt', '<ChapterMetro section="ux-gestalt" />\n<p class="lead">Dalle relazioni percettive alle scelte di progetto</p>',
    .5, [source['frames'][0]['id']], [230], 'chapter-slide', 'gestalt', lessonNumber=6)
add('Dalle parti alle relazioni', '', .5, [source['frames'][0]['id']], [230], 'reading-slide', 'gestalt-sintesi',
    layout='summary', summaryStatement='Le relazioni fra gli elementi guidano ciò che percepiamo come un insieme.',
    summarySupport='Confrontiamo nove principi attraverso schemi, marchi, fotografie e interfacce. Ogni lettura visiva diventa un’ipotesi da verificare con le persone e il loro compito.')

for row in plan:
    figures = [uses[node] for node in row['figureCandidates']]
    figure = composite(row, figures) if len(figures) > 1 else (figures[0] if figures else None)
    credit = compact_credit(row)
    text = prose(row)
    title = row['title']
    css = 'reading-slide'
    if figure:
        figure['caption'] = row['caption'] or title
        caption = ' '.join(row['caption'].split())
        if credit:
            caption += (' · ' if caption else '') + credit
        alt = ' '.join((row['caption'] or title).split())
        figure_html = f'<LessonFigure src="{figure["web"]}" alt="{escape(alt)}" caption="{escape(caption)}"' + (' :max-scale="1"' if row['kind'] == 'screenshot' else '') + ' />'
        css += ' figure-slide'
        if text and len(figures) < 3:
            words = len(re.findall(r'\S+', row['lead'] + ' '.join(row['paragraphs'] + row['bullets'])))
            if words <= 28:
                css += ' figure-dominant'
            body = f'<div class="lesson-columns">\n<div>\n{text}\n</div>\n{figure_html}\n</div>'
        else:
            css += ' screenshot-slide'
            if text:
                # The full-width image is primary; its original explanation remains in the caption.
                narrative = ' '.join([row['lead'], *row['paragraphs'], *row['bullets']]).strip()
                caption = narrative + ' ' + caption
                figure_html = f'<LessonFigure src="{figure["web"]}" alt="{escape(alt)}" caption="{escape(caption)}"' + (' :max-scale="1"' if row['kind'] == 'screenshot' else '') + ' />'
            body = figure_html
        records[figure['id']] = figure
    elif row['folio'] == 235:
        # Nine named principles form a compact, open three-column index.
        body = f'<p class="lead">{escape(row["lead"])}</p>\n<ol class="lesson-principles">' + ''.join(f'<li>{escape(b)}</li>' for b in row['bullets']) + '</ol>\n' + ''.join(f'<p class="aside">{escape(p)}</p>' for p in row['paragraphs'])
    elif row['folio'] == 234:
        body = '<p class="lesson-statement">Distanze, somiglianze e contorni organizzano ciò che vediamo.</p>'
    elif row['kind'] == 'activity':
        css += ' lesson-activity'
        body = text + '\n<CvediNotice kind="request">Confronta le due versioni con una persona, annota ciò che osservi e rivedi la proposta.</CvediNotice>'
    else:
        body = text
    if not figure and row['folio'] == 317:
        body += '\n<p class="aside">Fonti: <a class="link" href="https://doi.org/10.1080/0144929X.2011.642893" target="_blank" rel="noopener noreferrer">Möller, Brezing e Unz (2012)</a>; <a class="link" href="https://doi.org/10.1002/pra2.340" target="_blank" rel="noopener noreferrer">Kapllani ed Elmimouni (2020)</a>.</p>'
    motion_sources = {256: 'Apri la transizione Bootstrap', 257: 'Guarda l’animazione Google Dots',
        260: 'Apri il carousel Bootstrap', 261: 'Apri il carousel Swiper',
        272: 'Osserva lo spinner Bootstrap', 277: 'Apri gli spinner Bootstrap'}
    if row['folio'] in motion_sources:
        url = next((url for url in row['links'] if url.endswith('.mp4')), row['links'][0])
        body += f'\n<div class="lesson-tool-resources"><ul class="lesson-tools"><li><a class="link" href="{escape(url)}" target="_blank" rel="noopener noreferrer">{motion_sources[row["folio"]]}</a></li></ul></div>'
    add(title, body, row['minutes'], [row['boardId']], [row['folio']], css,
        f'gestalt-{row["sequence"]:03}', [figure] if figure else [],
        bookletFigures=row.get('bookletFigureNumbers', []),
        bookletFigureReferences=row.get('proseFigureReferences', []))

(ROOT / 'lezioni/06-gestalt.md').write_text('\n'.join(slides))
registry_path = ROOT / 'assets/booklet/capitolo-3/slide-assets.json'
registry = json.loads(registry_path.read_text())
registry['assets'] = [r for r in registry['assets'] if not r['id'].startswith('l06-')] + list(records.values())
registry_path.write_text(json.dumps(registry, ensure_ascii=False, indent=2) + '\n')
mapping_path = ROOT / 'assets/booklet/capitolo-3/slide-mapping.json'
registered = json.loads(mapping_path.read_text())
registered['lessons'] = [r for r in registered['lessons'] if r['lesson'] != 'gestalt']
at = next((i for i,r in enumerate(registered['lessons']) if r['lesson'] == 'colore'), len(registered['lessons']))
registered['lessons'][at:at] = mapping
mapping_path.write_text(json.dumps(registered, ensure_ascii=False, indent=2) + '\n')
(BASE / 'image-manifest.json').write_text(json.dumps(dict(date=source['date'], fileKey=source['fileKey'],
    pageId=source['pageId'], sectionId=source['sectionId'], source=SOURCE_PATH,
    sourceImageNodes=sorted(selection['nodes']), selectedFigureNodes=sorted(uses),
    assets=list(records.values())), ensure_ascii=False, indent=2) + '\n')

# Composite views embed their original bytes. Do not publish a second unused
# copy of each embedded source, or stale composites from an earlier rebuild.
selected_public = {r['web'] for r in records.values()}
for path in PUBLIC.glob('l06-*'):
    if '/images/processo-ux/' + path.name not in selected_public:
        path.unlink()

doc = ['# Lezione 06 · Gestalt', '',
    'Fonte: [capitolo Gestalt del booklet Figma](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC/Booklet?node-id=204-8297), sincronizzato il 16 ottobre 2026: 89 tavole, folio 230–318, con 94 figure numerate da 3.73 a 3.166. I folio sono quelli visibili nelle tavole; alcuni nomi storici dei frame hanno numeri precedenti.', '',
    f'{len(slides)} slide; {sum(r["minutes"] for r in mapping):g} minuti pianificati. La lezione è autonoma dopo Accessibilità e disponibile nell’anteprima locale. La precedente lezione di Percezione e gerarchia visiva resta conservata in archivio.', '',
    'Ogni tavola corrente ha almeno una corrispondenza. Le spiegazioni estese e i casi distinti sono suddivisi per mantenere leggibilità; le sequenze temporali rimangono unite. Regione comune chiude le nove leggi ed è attribuita a Palmer (1992), successivamente alle formulazioni classiche; esperienza appresa, raggruppamento e organizzazione figura-sfondo mantengono le distinzioni della fonte. Chiusura, contorni illusori e completamento amodale restano distinti. Fotografie e screenshot statici non sono presentati come dimostrazioni di movimento. Le 94 caption e i richiami conservano il progressivo globale C03, registrato in `assets/booklet/capitolo-3/figure-index.json`. Gli alias delle slide conservano le identità precedenti al riordino.', '',
    'Snapshot: `assets/booklet/lezione-06-gestalt/figma-source.json`. Piano editoriale e selezione: `content-plan.json`, `asset-sources.json`; figure pubblicate e provenienza: `image-manifest.json`. Gli schemi sono esportazioni SVG dei vettori correnti, con font convertiti in tracciati. I compositi incorporano i byte delle immagini senza ricampionamento; i ritagli sono registrati e gli originali restano conservati. Ricostruzione: `python3 scripts/build/lesson-06-gestalt.py`.', '',
    '| Slide | Titolo | Fonte | Minuti |', '| --- | --- | --- | --- |']
for row in mapping:
    doc.append(f'| {row["lessonSlide"]} | {row["title"].replace("|", "/")} | Folio {", ".join(map(str,row["sourceFolios"]))} | {row["minutes"]:g} |')
doc += ['', '## Fonti e attribuzioni delle tavole', '']
for frame in source['frames']:
    doc += [f'### Folio {frame["folio"]}', '']
    rows = [r for r in plan if r['boardId'] == frame['id']]
    credits = list(dict.fromkeys(r['credit'] for r in rows if r['credit']))
    if frame['folio'] == 317:
        credits = [t['text'] for t in frame['texts'] if 'doi.org/' in t['text']]
    doc += credits or ['La tavola non riporta un’attribuzione aggiuntiva. Non sono stati aggiunti autori o date non documentati.']
    urls = list(dict.fromkeys(link['value'] for t in frame['texts'] for link in t.get('links',[]) if link['type'] == 'URL'))
    doc += ['', *[f'- [Fonte {i+1}]({url})' for i,url in enumerate(urls)], '']
(ROOT / 'docs/fonti/06-gestalt.md').write_text('\n'.join(doc))
print(json.dumps(dict(slides=len(slides), minutes=sum(r['minutes'] for r in mapping),
    boards=len({r['sourceNodes'][0] for r in mapping}), figures=len(records)), ensure_ascii=False))
