"""Build the five-axis diagram from retained, authentic variable-font outlines.

macOS, Swift/CoreText and fontTools are required. Example:
PYTHONPATH=/private/tmp/comment357-fonttools python3 assets/booklet/tipografia-assi-variabili/generate.py
No network access is used. All requested axes and source files are checked.
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

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
WIDTH, HEIGHT = 640, 520
INK, BLUE = '#2c333f', '#17608b'

FONTS = {
    'roboto-serif': {
        'family': 'Roboto Serif',
        'path': ROOT / 'assets/font-previews/downloads/robotoserif/RobotoSerif[GRAD,opsz,wdth,wght].ttf',
        'licensePath': ROOT / 'assets/font-previews/downloads/robotoserif/OFL.txt',
        'sourceUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/robotoserif/RobotoSerif%5BGRAD%2Copsz%2Cwdth%2Cwght%5D.ttf',
        'licenseUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/robotoserif/OFL.txt',
    },
    'roboto-flex': {
        'family': 'Roboto Flex',
        'path': OUT / 'originali/RobotoFlex[GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght].ttf',
        'licensePath': OUT / 'originali/RobotoFlex-OFL.txt',
        'sourceUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/robotoflex/RobotoFlex%5BGRAD%2CXOPQ%2CXTRA%2CYOPQ%2CYTAS%2CYTDE%2CYTFI%2CYTLC%2CYTUC%2Copsz%2Cslnt%2Cwdth%2Cwght%5D.ttf',
        'licenseUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/robotoflex/OFL.txt',
    },
    'nunito': {
        'family': 'Nunito',
        'path': OUT / 'originali/Nunito[ital,wght].ttf',
        'licensePath': OUT / 'originali/Nunito-OFL.txt',
        'sourceUrl': 'https://raw.githubusercontent.com/googlefonts/nunito/main/fonts/variable/Nunito%5Bital,wght%5D.ttf',
        'licenseUrl': 'https://raw.githubusercontent.com/googlefonts/nunito/main/OFL.txt',
    },
}

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def relative(path):
    return str(path.relative_to(ROOT))

def number(value):
    return f'{value:.5f}'.rstrip('0').rstrip('.')

font_records = []
for key, info in FONTS.items():
    font = TTFont(info['path'])
    info['postscriptName'] = font['name'].getDebugName(6)
    info['defaults'] = {axis.axisTag: axis.defaultValue for axis in font['fvar'].axes}
    info['ranges'] = {axis.axisTag: {'minimum': axis.minValue, 'default': axis.defaultValue, 'maximum': axis.maxValue} for axis in font['fvar'].axes}
    font_records.append({
        'id': key, 'family': info['family'], 'path': relative(info['path']),
        'originalFilename': info['path'].name, 'postscriptName': info['postscriptName'],
        'version': font['name'].getDebugName(5), 'sha256': sha(info['path']),
        'bytes': info['path'].stat().st_size, 'axes': info['ranges'],
        'sourceUrl': info['sourceUrl'], 'license': 'SIL Open Font License 1.1',
        'licensePath': relative(info['licensePath']), 'licenseSha256': sha(info['licensePath']),
        'licenseUrl': info['licenseUrl'], 'copyright': font['name'].getDebugName(0),
    })

rows = [
    {'tag': 'wght', 'meaning': 'Peso', 'font': 'roboto-serif', 'text': 'Tipo', 'body': 52, 'values': [300, 800], 'labels': ['300 · leggero', '800 · pesante']},
    {'tag': 'wdth', 'meaning': 'Larghezza', 'font': 'roboto-serif', 'text': 'Tipo', 'body': 52, 'values': [50, 150], 'labels': ['50 · stretto', '150 · largo']},
    {'tag': 'slnt', 'meaning': 'Inclinazione', 'font': 'roboto-flex', 'text': 'Tipo', 'body': 56, 'values': [0, -10], 'labels': ['0° · diritto', '−10° · inclinato']},
    {'tag': 'ital', 'meaning': 'Corsivo', 'font': 'nunito', 'text': 'ag', 'body': 72, 'values': [0, 1], 'labels': ['0 · tondo', '1 · corsivo']},
    {'tag': 'opsz', 'meaning': 'Dimensione ottica', 'font': 'roboto-serif', 'text': 'Ag', 'body': 68, 'values': [8, 144], 'labels': ['per 8 pt', 'per 144 pt']},
]
requests, placements, samples = [], [], []

def add(slug, text, body, font_id, changes, x, baseline, color=INK):
    info = FONTS[font_id]
    axes = dict(info['defaults'], **changes)
    for tag, value in axes.items():
        limits = info['ranges'][tag]
        assert limits['minimum'] <= value <= limits['maximum'], (slug, tag, value)
    requests.append({'slug': slug, 'path': str(info['path']), 'postscriptName': info['postscriptName'], 'text': text, 'body': body, 'variations': axes})
    placements.append({'slug': slug, 'x': x, 'baseline': baseline, 'color': color})

for index, row in enumerate(rows):
    top = index * 104
    add(f'{row["tag"]}-tag', row['tag'], 22, 'nunito', {'wght': 800, 'ital': 0}, 8, top + 35, BLUE)
    # Keep the longer opsz explanation on two lines, without shrinking labels.
    if row['tag'] == 'opsz':
        add('opsz-meaning-1', 'Dimensione', 20, 'nunito', {'wght': 600, 'ital': 0}, 8, top + 62)
        add('opsz-meaning-2', 'ottica · stesso corpo', 16, 'nunito', {'wght': 600, 'ital': 0}, 8, top + 86)
    else:
        add(f'{row["tag"]}-meaning', row['meaning'], 20, 'nunito', {'wght': 600, 'ital': 0}, 8, top + 63)
    for column, (value, label) in enumerate(zip(row['values'], row['labels'])):
        x = [208, 430][column]
        slug = f'{row["tag"]}-{column}'
        # Every axis except the illustrated one is fixed to its explicit default.
        axes = {row['tag']: value}
        if row['font'] == 'nunito':
            axes['wght'] = 400
        add(slug, row['text'], row['body'], row['font'], axes, x, top + 59)
        add(slug + '-label', label, 18, 'nunito', {'wght': 600, 'ital': 0}, x, top + 91, BLUE)
        samples.append({'slug': slug, 'axis': row['tag'], 'meaningItalian': row['meaning'], 'fontId': row['font'], 'sample': row['text'], 'bodyPx': row['body'], 'value': value, 'label': label, 'coordinates': requests[-2]['variations'], 'x': x, 'baseline': top + 59})

with tempfile.TemporaryDirectory(prefix='typography-axes-') as temp:
    temp = Path(temp)
    # CoreText may omit the registered ital axis when creating a descriptor.
    # Pin every axis with the OpenType instancer first, then shape the resulting
    # exact static face. The contours still come exclusively from the font data.
    instances = {}
    source_by_slug = {}
    for request in requests:
        source_by_slug[request['slug']] = dict(request)
        identity = (request['path'], tuple(sorted(request['variations'].items())))
        if identity not in instances:
            instance = instantiateVariableFont(TTFont(request['path']), request['variations'], inplace=True)
            assert 'fvar' not in instance, 'The instance must have no unpinned variation axes.'
            suffix = hashlib.sha256(repr(identity[1]).encode()).hexdigest()[:12]
            ps_name = request['postscriptName'] + '-Axes' + suffix
            for name in instance['name'].names:
                if name.nameID == 6:
                    name.string = ps_name.encode(name.getEncoding())
            instance_path = temp / (ps_name + '.ttf')
            instance.save(instance_path, reorderTables=False)
            instances[identity] = (instance_path, ps_name)
        request['path'], request['postscriptName'] = map(str, instances[identity])
        request['variations'] = {}
    request_path = temp / 'requests.json'
    request_path.write_text(json.dumps(requests, ensure_ascii=False), encoding='utf-8')
    environment = dict(os.environ, CLANG_MODULE_CACHE_PATH=str(temp / 'clang-cache'), SWIFT_MODULECACHE_PATH=str(temp / 'swift-cache'), LC_ALL='en_US.UTF-8')
    result = subprocess.run(['swift', str(OUT / 'outline-text.swift'), str(request_path)], check=True, stdout=subprocess.PIPE, env=environment)
    reports = json.loads(result.stdout)
    for report in reports:
        report['pinnedCoordinates'] = source_by_slug[report['slug']]['variations']

by_slug = {report['slug']: report for report in reports}
parts = []
for place in placements:
    report = by_slug[place['slug']]
    min_x, min_y, width, height = report['inkBounds']
    assert place['x'] + min_x >= 0 and place['x'] + min_x + width <= WIDTH, place['slug']
    assert place['baseline'] - min_y - height >= 0 and place['baseline'] - min_y <= HEIGHT, place['slug']
    parts.append(f'<g aria-label="{escape(report["text"])}"><path fill="{place["color"]}" transform="translate({number(place["x"])} {number(place["baseline"])}) scale(1 -1)" d="{report["path"]}"/></g>')

title = 'Cinque assi dei font variabili'
description = 'Ogni riga confronta due campioni autentici allo stesso corpo. wght: peso 300 e 800; wdth: larghezza 50 e 150; slnt: inclinazione 0 e meno 10 gradi; ital: tondo 0 e corsivo 1; opsz: disegno per 8 e per 144 punti, entrambi mostrati allo stesso corpo. Roboto Serif, Roboto Flex e Nunito; contorni originali composti con CoreText.'
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>{"".join(parts)}</svg>\n'
output = OUT / 'cinque-assi-variabili.svg'
output.write_text(svg, encoding='utf-8')
output_hash = sha(output)
published = ROOT / f'public/images/tipografia/assi-variabili-{output_hash[:12]}.svg'
published.parent.mkdir(parents=True, exist_ok=True)
published.write_bytes(output.read_bytes())
for sample in samples:
    report = by_slug[sample['slug']]
    sample['pinnedCoordinates'] = report['pinnedCoordinates']
    sample['coreTextVariationParameters'] = report['effectiveVariations']
    sample['inkBounds'] = report['inkBounds']
    sample['advanceWidth'] = report['advanceWidth']
    sample['glyphCount'] = report['glyphCount']

manifest = {
    'schemaVersion': 1, 'date': '2026-10-20',
    'purpose': 'Clarify the five registered variation axes with paired authentic samples on the existing typography slide.',
    'construction': 'Original diagram; all lettering is retained-font outlines. FontTools pins all axes to exact static instances, then CoreText shapes each exact source face. Only baseline translations and a y-axis reflection are used; no synthetic slant, stretching or weight. Transparent background and no frames.',
    'palette': {'ink': INK, 'blue': BLUE},
    'rules': ['Both samples in every pair use the same nominal displayed body.', 'Only the illustrated variation axis differs within each pair.', 'The ital pair uses the true fvar ital axis of the combined Nunito font, not separate Roman/Italic files.', 'The opsz pair changes the intended optical size while preserving the displayed body.', 'The italic example does not claim a mandatory structural change to a or g.'],
    'fonts': font_records,
    'sources': [
        {'title': 'OpenType Design-Variation Axis Tag Registry', 'url': 'https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg'},
        {'title': 'OpenType ital axis', 'url': 'https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_ital'},
        {'title': 'OpenType slnt axis', 'url': 'https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_slnt'},
        {'title': 'OpenType opsz axis', 'url': 'https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_opsz'},
    ],
    'samples': samples,
    'labels': [dict(placement, text=by_slug[placement['slug']]['text'], bodyPx=by_slug[placement['slug']]['bodyPx'], inkBounds=by_slug[placement['slug']]['inkBounds']) for placement in placements if placement['slug'] not in {sample['slug'] for sample in samples}],
    'shaping': {'engine': 'FontTools OpenType instancer; Apple CoreText CTLine / CTRun', 'coordinateVerification': 'Every requested coordinate is range-checked and pinned by fontTools.varLib.instancer. The resulting static font must have no fvar table. CoreText receives that exact static instance and no variation parameters.', 'guards': ['All axes pinned to the documented coordinates before shaping', 'Exact instantiated font-file URL', 'Exact unique PostScript face', 'No fallback runs', 'All glyphs available', 'All ink fits inside SVG viewBox'], 'outlineReportCount': len(reports)},
    'generator': {'path': relative(Path(__file__)), 'sha256': sha(Path(__file__)), 'helper': relative(OUT / 'outline-text.swift'), 'helperSha256': sha(OUT / 'outline-text.swift'), 'fontToolsVersion': fonttools_version},
    'output': {'path': relative(output), 'publishedPath': relative(published), 'sha256': output_hash, 'naturalWidth': WIDTH, 'naturalHeight': HEIGHT, 'bytes': output.stat().st_size},
    'retainedSources': [relative(info[field]) for info in FONTS.values() for field in ['path', 'licensePath']] + [relative(OUT / 'generate.py'), relative(OUT / 'outline-text.swift'), relative(OUT / 'manifest.json'), relative(output), 'assets/font-previews/downloads/robotoserif/provenance.json'],
}
(OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(manifest['output']))
