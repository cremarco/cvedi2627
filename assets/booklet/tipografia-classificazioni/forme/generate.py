"""Build four classification teaching figures from retained authentic fonts.

macOS: PYTHONPATH=/private/tmp/comment357-fonttools python3
assets/booklet/tipografia-classificazioni/forme/generate.py
Requires fontTools and Swift/CoreText; no network access or font installation.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import hashlib
import json
import os
import subprocess
import tempfile

from fontTools import __version__ as fonttools_version
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[4]
OUT = Path(__file__).resolve().parent
INK, BLUE = '#2c333f', '#17608b'
EARLY = 'assets/booklet/tipografia-campioni-uniformi/early/originali/'
MIDDLE = 'assets/booklet/tipografia-campioni-uniformi/middle/originali/'

FONTS = {
    'eb-garamond': ('EB Garamond', EARLY + 'EBGaramond[wght].ttf', EARLY + 'EBGaramond-OFL.txt', 'ebgaramond'),
    'work-sans': ('Work Sans', 'assets/booklet/tipografia-variabile/WorkSansVF.ttf', 'assets/booklet/tipografia-variabile/OFL.txt', 'worksans'),
    'pacifico': ('Pacifico', EARLY + 'Pacifico-Regular.ttf', EARLY + 'Pacifico-OFL.txt', 'pacifico'),
    'unifraktur': ('UnifrakturMaguntia', 'assets/booklet/tipografia-campioni-uniformi/classificazioni/originali/UnifrakturMaguntia-Book.ttf', 'assets/booklet/tipografia-campioni-uniformi/classificazioni/originali/OFL.txt', 'unifrakturmaguntia'),
    'libre-baskerville': ('Libre Baskerville', 'assets/font-previews/downloads/librebaskerville/LibreBaskerville[wght].ttf', 'assets/font-previews/downloads/librebaskerville/OFL.txt', 'librebaskerville'),
    'bodoni-moda': ('Bodoni Moda', 'assets/font-previews/downloads/bodonimoda/BodoniModa[opsz,wght].ttf', 'assets/font-previews/downloads/bodonimoda/OFL.txt', 'bodonimoda'),
    'bitter': ('Bitter', 'assets/font-previews/downloads/bitter/Bitter[wght].ttf', 'assets/font-previews/downloads/bitter/OFL.txt', 'bitter'),
    'alegreya-sans': ('Alegreya Sans', MIDDLE + 'AlegreyaSans-Regular.ttf', MIDDLE + 'AlegreyaSans-OFL.txt', 'alegreyasans'),
    'quicksand': ('Quicksand', MIDDLE + 'Quicksand-VF.ttf', MIDDLE + 'Quicksand-OFL.txt', 'quicksand'),
    'great-vibes': ('Great Vibes', EARLY + 'GreatVibes-Regular.ttf', EARLY + 'GreatVibes-OFL.txt', 'greatvibes'),
    'labels': ('Nunito', 'assets/booklet/tipografia-assi-variabili/originali/Nunito[ital,wght].ttf', 'assets/booklet/tipografia-assi-variabili/originali/Nunito-OFL.txt', None),
}

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def rel(path):
    return str(path.relative_to(ROOT))

def number(value):
    return f'{value:.5f}'.rstrip('0').rstrip('.')

font_records = []
for key, (family, path, license_path, slug) in list(FONTS.items()):
    font = TTFont(ROOT / path)
    ranges = {a.axisTag: {'minimum': a.minValue, 'default': a.defaultValue, 'maximum': a.maxValue} for a in font['fvar'].axes} if 'fvar' in font else {}
    defaults = {tag: limits['default'] for tag, limits in ranges.items()}
    url = f'https://github.com/google/fonts/tree/main/ofl/{slug}' if slug else 'https://github.com/googlefonts/nunito'
    info = {'id': key, 'family': family, 'path': path, 'licensePath': license_path, 'sourceUrl': url,
            'version': font['name'].getDebugName(5), 'postscriptName': font['name'].getDebugName(6),
            'copyright': font['name'].getDebugName(0), 'sha256': sha(ROOT / path), 'bytes': (ROOT / path).stat().st_size,
            'license': 'SIL Open Font License 1.1', 'licenseSha256': sha(ROOT / license_path),
            'axes': ranges, 'defaults': defaults}
    FONTS[key] = info
    font_records.append(info)

figures = []
requests = []

def figure(name, title, height, description):
    item = {'id': 'tipografia-classificazioni-' + name, 'name': name, 'title': title,
            'naturalWidth': 640, 'naturalHeight': height, 'description': description, 'placements': []}
    figures.append(item)
    return item

def add(fig, suffix, text, body, font_id, x, baseline, color=INK, kind='sample', axes=None):
    font = FONTS[font_id]
    coordinates = dict(font['defaults'])
    if 'wght' in coordinates:
        coordinates['wght'] = 400
    if 'ital' in coordinates:
        coordinates['ital'] = 0
    coordinates.update(axes or {})
    for tag, value in coordinates.items():
        limits = font['axes'][tag]
        assert limits['minimum'] <= value <= limits['maximum'], (font_id, tag, value)
    slug = fig['name'] + '-' + suffix
    requests.append({'slug': slug, 'path': str(ROOT / font['path']), 'postscriptName': font['postscriptName'],
                     'text': text, 'body': body, 'variations': coordinates})
    fig['placements'].append({'slug': slug, 'text': text, 'fontId': font_id, 'bodyPx': body, 'coordinates': coordinates,
                              'x': x, 'baseline': baseline, 'color': color, 'kind': kind})

def label(fig, slug, text, x, y, body=20, blue=False, bold=False):
    add(fig, slug, text, body, 'labels', x, y, BLUE if blue else INK, 'label', {'wght': 800 if bold else 600})

overview = figure('panoramica', 'Quattro direzioni da riconoscere', 456,
    'La stessa parola Tipografia allo stesso corpo64 in EB Garamond, Work Sans, Pacifico e UnifrakturMaguntia. Grazie, assenza delle grazie, gesto continuo e tratti spezzati orientano il confronto.')
for index, (font_id, category, detail) in enumerate([
    ('eb-garamond', 'Serif', 'con grazie'), ('work-sans', 'Sans serif', 'senza grazie'),
    ('pacifico', 'Script', 'gesto continuo'), ('unifraktur', 'Blackletter', 'tratti spezzati'),
]):
    y = index * 114
    label(overview, f'{index}-name', FONTS[font_id]['family'], 230, y + 22, 20, True)
    label(overview, f'{index}-category', category, 12, y + 43, 22, True, True)
    label(overview, f'{index}-detail', detail, 12, y + 70, 18)
    add(overview, f'{index}-word', 'Tipografia', 64, font_id, 230, y + 86)

serif = figure('serif', 'Quattro direzioni dei serif', 456,
    'H o a allo stesso corpo76 in EB Garamond, Libre Baskerville, Bodoni Moda e Bitter. Le etichette indicano le direzioni antico, transizionale, didone e slab serif; le versioni digitali originali restano identificate.')
for index, (font_id, category, detail) in enumerate([
    ('eb-garamond', 'Antichi / oldstyle', 'grazie raccordate'),
    ('libre-baskerville', 'Transizionali', 'contrasto più marcato'),
    ('bodoni-moda', 'Didoni', 'filetti sottili'),
    ('bitter', 'Slab serif', 'grazie robuste'),
]):
    y = index * 114
    label(serif, f'{index}-name', FONTS[font_id]['family'], 12, y + 25, 21, True, True)
    label(serif, f'{index}-category', category, 12, y + 52, 19)
    label(serif, f'{index}-detail', detail, 12, y + 79, 17)
    add(serif, f'{index}-glyphs', 'H o a', 76, font_id, 295, y + 82)

sans = figure('sans', 'Tre costruzioni dei sans serif', 456,
    'Le lettere a e g R al corpo72 e la parola Tipografia al corpo40 sono confrontate in Work Sans, Alegreya Sans e Quicksand. Ogni gruppo conserva testo e corpo; i campioni mostrano costruzioni differenti, senza graduatorie di leggibilità.')
for index, (font_id, category, detail) in enumerate([
    ('work-sans', 'Grottesca', 'forme regolari'), ('alegreya-sans', 'Umanistica', 'modulazione e gesto'),
    ('quicksand', 'Geometrica', 'strutture geometriche'),
]):
    y = index * 152
    label(sans, f'{index}-name', FONTS[font_id]['family'], 12, y + 26, 21, True, True)
    label(sans, f'{index}-category', category, 12, y + 54, 19)
    label(sans, f'{index}-detail', detail, 12, y + 81, 17)
    add(sans, f'{index}-glyphs', 'a e g R', 72, font_id, 235, y + 79)
    add(sans, f'{index}-word', 'Tipografia', 40, font_id, 235, y + 131)

script = figure('script', 'Due interpretazioni del gesto scritto', 432,
    'La stessa parola Letteratura è composta al corpo78 con Pacifico e Great Vibes, usando le connessioni e lo shaping originali dei font. Il confronto mostra pennello e calligrafia formale senza attribuire un tono universale.')
for index, (font_id, category) in enumerate([
    ('pacifico', 'Pennello e collegamenti'), ('great-vibes', 'Calligrafia formale'),
]):
    y = index * 216
    label(script, f'{index}-name', FONTS[font_id]['family'], 12, y + 27, 22, True, True)
    label(script, f'{index}-category', category, 12, y + 55, 19)
    add(script, f'{index}-word', 'Letteratura', 78, font_id, 95, y + 153)

with tempfile.TemporaryDirectory(prefix='typography-classifications-') as temp:
    temp = Path(temp)
    source_by_slug = {request['slug']: dict(request) for request in requests}
    instances = {}
    for request in requests:
        identity = (request['path'], tuple(sorted(request['variations'].items())))
        if identity not in instances:
            font = TTFont(request['path'])
            instance = instantiateVariableFont(font, request['variations'], inplace=True) if 'fvar' in font else font
            assert 'fvar' not in instance
            suffix = hashlib.sha256(repr(identity).encode()).hexdigest()[:12]
            postscript = request['postscriptName'] + '-Class' + suffix
            for name in instance['name'].names:
                if name.nameID == 6:
                    name.string = postscript.encode(name.getEncoding())
            path = temp / (postscript + '.ttf')
            instance.save(path, reorderTables=False)
            instances[identity] = (str(path), postscript)
        request['path'], request['postscriptName'] = instances[identity]
        request['variations'] = {}
    input_path = temp / 'requests.json'
    input_path.write_text(json.dumps(requests, ensure_ascii=False), encoding='utf-8')
    env = dict(os.environ, CLANG_MODULE_CACHE_PATH=str(temp / 'clang-cache'), SWIFT_MODULECACHE_PATH=str(temp / 'swift-cache'), LC_ALL='en_US.UTF-8')
    result = subprocess.run(['swift', str(OUT / 'outline-text.swift'), str(input_path)], stdout=subprocess.PIPE, check=True, env=env)
    reports = {report['slug']: report for report in json.loads(result.stdout)}

for fig in figures:
    paths = []
    for place in fig['placements']:
        report = reports[place['slug']]
        x, y, width, height = report['inkBounds']
        assert place['x'] + x >= 0 and place['x'] + x + width <= fig['naturalWidth'], (place['slug'], 'horizontal', report['inkBounds'])
        assert place['baseline'] - y - height >= 0 and place['baseline'] - y <= fig['naturalHeight'], (place['slug'], 'vertical', report['inkBounds'])
        paths.append(f'<g aria-label="{escape(place["text"])}"><path fill="{place["color"]}" transform="translate({number(place["x"])} {number(place["baseline"])}) scale(1 -1)" d="{report["path"]}"/></g>')
        place.update(inkBounds=report['inkBounds'], advanceWidth=report['advanceWidth'], glyphCount=report['glyphCount'],
                     pinnedCoordinates=source_by_slug[place['slug']]['variations'], coreTextVariationParameters=report['effectiveVariations'])
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{fig["naturalWidth"]}" height="{fig["naturalHeight"]}" viewBox="0 0 {fig["naturalWidth"]} {fig["naturalHeight"]}" role="img" aria-labelledby="title desc"><title id="title">{escape(fig["title"])}</title><desc id="desc">{escape(fig["description"])}</desc>{"".join(paths)}</svg>\n'
    path = OUT / (fig['name'] + '.svg')
    path.write_text(svg, encoding='utf-8')
    digest = sha(path)
    publication = ROOT / f'public/images/tipografia/classificazioni-{fig["name"]}-{digest[:12]}.svg'
    publication.write_bytes(path.read_bytes())
    font_ids = sorted({place['fontId'] for place in fig['placements']})
    fig.update(original=rel(path), web='/' + rel(publication).removeprefix('public/'), publishedPath=rel(publication),
               sha256=digest, bytes=path.stat().st_size, fontIds=font_ids,
               sourceLinks=['https://www.monotype.com/resources/guide-type-styles'] + [FONTS[font_id]['sourceUrl'] for font_id in font_ids],
               retainedSources=[FONTS[font_id][field] for font_id in font_ids for field in ['path', 'licensePath']] +
                   [rel(OUT / 'generate.py'), rel(OUT / 'outline-text.swift'), rel(OUT / 'manifest.json')])

manifest = {
    'schemaVersion': 1, 'date': '2026-10-20',
    'purpose': 'Four authentic paired teaching specimens for the reorganized typography classification section.',
    'construction': 'Transparent SVGs with original font outlines. FontTools pins every variable axis before CoreText shaping; no synthetic widening, slanting or emboldening. Only baseline translations and y-axis reflection place the outlines.',
    'palette': {'ink': INK, 'blue': BLUE}, 'fonts': font_records,
    'generator': {'path': rel(Path(__file__)), 'sha256': sha(Path(__file__)), 'helper': rel(OUT / 'outline-text.swift'), 'helperSha256': sha(OUT / 'outline-text.swift'), 'fontToolsVersion': fonttools_version},
    'guards': ['All axes range-checked and pinned before shaping', 'No remaining fvar table', 'Exact unique font-file and PostScript face', 'No fallback glyph runs', 'Every glyph available', 'All ink inside SVG viewBox'],
    'figures': figures,
}
(OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps([{key: fig[key] for key in ['id', 'original', 'web', 'naturalWidth', 'naturalHeight', 'sha256', 'bytes']} for fig in figures], ensure_ascii=False, indent=2))
