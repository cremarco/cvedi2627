"""Authentic classification examples: pinned OpenType instances, CoreText outlines.

Requires macOS, Swift/CoreText and fontTools. No network access during generation.
Example: PYTHONPATH=/private/tmp/comment357-fonttools python3 <this-file>
Commercial system fonts are referenced in place; their binaries are not copied.
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

FONTS = {
    'times': {'family': 'Times New Roman', 'path': Path('/System/Library/Fonts/Supplemental/Times New Roman.ttf'), 'sourceUrl': 'https://learn.microsoft.com/en-us/typography/font-list/times-new-roman'},
    'georgia': {'family': 'Georgia', 'path': Path('/System/Library/Fonts/Supplemental/Georgia.ttf'), 'sourceUrl': 'https://learn.microsoft.com/en-us/typography/font-list/georgia'},
    'bitter': {'family': 'Bitter', 'path': ROOT / 'assets/font-previews/downloads/bitter/Bitter[wght].ttf', 'licensePath': ROOT / 'assets/font-previews/downloads/bitter/OFL.txt', 'sourceUrl': 'https://github.com/google/fonts/tree/main/ofl/bitter'},
    'arvo': {'family': 'Arvo', 'path': OUT / 'originali/Arvo-Regular.ttf', 'licensePath': OUT / 'originali/arvo-OFL.txt', 'sourceUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/arvo/Arvo-Regular.ttf'},
    'gotico': {'family': 'UnifrakturMaguntia', 'path': ROOT / 'assets/booklet/tipografia-campioni-uniformi/classificazioni/originali/UnifrakturMaguntia-Book.ttf', 'licensePath': ROOT / 'assets/booklet/tipografia-campioni-uniformi/classificazioni/originali/OFL.txt', 'sourceUrl': 'https://github.com/google/fonts/tree/main/ofl/unifrakturmaguntia'},
    'plex-sans': {'family': 'IBM Plex Sans', 'path': OUT / 'originali/IBMPlexSans[wdth,wght].ttf', 'licensePath': OUT / 'originali/ibmplexsans-OFL.txt', 'sourceUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsans/IBMPlexSans%5Bwdth%2Cwght%5D.ttf'},
    'plex-serif': {'family': 'IBM Plex Serif', 'path': OUT / 'originali/IBMPlexSerif-Regular.ttf', 'licensePath': OUT / 'originali/ibmplexserif-OFL.txt', 'sourceUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexserif/IBMPlexSerif-Regular.ttf'},
    'plex-mono': {'family': 'IBM Plex Mono', 'path': OUT / 'originali/IBMPlexMono-Regular.ttf', 'licensePath': OUT / 'originali/ibmplexmono-OFL.txt', 'sourceUrl': 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/IBMPlexMono-Regular.ttf'},
    'label': {'family': 'Nunito', 'path': ROOT / 'assets/booklet/tipografia-assi-variabili/originali/Nunito[ital,wght].ttf', 'licensePath': ROOT / 'assets/booklet/tipografia-assi-variabili/originali/Nunito-OFL.txt', 'sourceUrl': 'https://github.com/googlefonts/nunito'},
}

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def local(path):
    return str(path.relative_to(ROOT)) if path.is_relative_to(ROOT) else str(path)

def number(value):
    return f'{value:.5f}'.rstrip('0').rstrip('.')

font_records = []
for font_id, info in FONTS.items():
    font = TTFont(info['path'])
    info['postscriptName'] = font['name'].getDebugName(6)
    info['defaults'] = {a.axisTag: a.defaultValue for a in font['fvar'].axes} if 'fvar' in font else {}
    info['ranges'] = {a.axisTag: {'minimum': a.minValue, 'default': a.defaultValue, 'maximum': a.maxValue} for a in font['fvar'].axes} if 'fvar' in font else {}
    record = {'id': font_id, 'family': info['family'], 'path': local(info['path']), 'sourceUrl': info['sourceUrl'], 'sha256': sha(info['path']), 'bytes': info['path'].stat().st_size, 'postscriptName': info['postscriptName'], 'version': font['name'].getDebugName(5), 'copyright': font['name'].getDebugName(0), 'axes': info['ranges'], 'fontBinaryRedistributedInPublic': False}
    if info.get('licensePath'):
        record.update(license='SIL Open Font License 1.1', licensePath=local(info['licensePath']), licenseSha256=sha(info['licensePath']), originalPreservedInProject=True)
    else:
        record.update(license='Installed macOS font licence; original copyright retained. No open-licence claim.', originalPreservedInProject=False, preservation='Installed source file referenced by exact path and SHA256; only document outlines are published.')
    font_records.append(record)

figures = [
    {'slug': 'times-georgia', 'title': 'Times New Roman e Georgia allo stesso corpo', 'width': 640, 'height': 440, 'description': 'Due font originali confrontati con lo stesso testo e lo stesso corpo: ag 012345 a 64 px; Leggere le parole a 36 px. Le diverse proporzioni delle minuscole e delle cifre restano visibili.', 'fonts': ['times', 'georgia'], 'sources': [FONTS['times']['sourceUrl'], FONTS['georgia']['sourceUrl']]},
    {'slug': 'slab', 'title': 'Bitter e Arvo: grazie robuste', 'width': 640, 'height': 440, 'description': 'Bitter e Arvo Regular allo stesso corpo: H n o a 76 px e Tipo a 48 px. I campioni mostrano differenze negli innesti e nelle forme delle grazie senza attribuire un tono universale ai caratteri.', 'fonts': ['bitter', 'arvo'], 'sources': [FONTS['bitter']['sourceUrl'], FONTS['arvo']['sourceUrl']]},
    {'slug': 'gotico', 'title': 'Il ritmo della Fraktur', 'width': 640, 'height': 440, 'description': 'UnifrakturMaguntia, un font contemporaneo di tradizione Fraktur: Tipografia a 82 px; h o n a 104 px. Tratti spezzati e alternanza verticale sono osservabili nei contorni autentici. Fraktur è una direzione della blackletter; il campione non è identificato come Textura di Gutenberg.', 'fonts': ['gotico'], 'sources': [FONTS['gotico']['sourceUrl'], 'https://github.com/google/fonts/blob/main/cc-by-sa/knowledge/glossary/terms/blackletter/content.md']},
    {'slug': 'superfamiglia', 'title': 'IBM Plex: tre disegni della stessa superfamiglia', 'width': 640, 'height': 450, 'description': 'IBM Plex Serif, Sans e Mono Regular: la stessa parola Tipografia a 62 px. Le etichette distinguono grazie, assenza delle grazie e avanzamento monospaziato. La parentela è documentata da IBM, non dedotta da una semplice somiglianza.', 'fonts': ['plex-serif', 'plex-sans', 'plex-mono'], 'sources': ['https://www.ibm.com/design/impact/plex/', 'https://github.com/IBM/plex/']},
]
requests, placements = [], []

def add(figure, slug, text, body, font_id, x, baseline, color=INK, weight=400):
    info = FONTS[font_id]
    axes = dict(info['defaults'])
    if 'wght' in axes:
        axes['wght'] = weight
    for tag, value in axes.items():
        assert info['ranges'][tag]['minimum'] <= value <= info['ranges'][tag]['maximum']
    slug = figure + '-' + slug
    requests.append({'slug': slug, 'path': str(info['path']), 'postscriptName': info['postscriptName'], 'text': text, 'body': body, 'variations': axes})
    placements.append({'figure': figure, 'slug': slug, 'fontId': font_id, 'x': x, 'baseline': baseline, 'color': color, 'coordinates': axes})

def label(figure, slug, text, x, baseline, body=22, color=BLUE):
    add(figure, slug, text, body, 'label', x, baseline, color, 700)

for i, font_id in enumerate(['times', 'georgia']):
    top = i * 204
    label('times-georgia', font_id+'-name', FONTS[font_id]['family'], 12, top+28)
    add('times-georgia', font_id+'-letters', 'ag 012345', 64, font_id, 12, top+109)
    add('times-georgia', font_id+'-sentence', 'Leggere le parole', 36, font_id, 12, top+165)
label('times-georgia', 'body', 'Stesso testo · stesso corpo', 12, 432, 18)

for i, font_id in enumerate(['bitter', 'arvo']):
    top = i * 216
    label('slab', font_id+'-name', FONTS[font_id]['family']+' · slab serif', 12, top+30)
    add('slab', font_id+'-letters', 'H n o', 76, font_id, 12, top+121)
    add('slab', font_id+'-word', 'Tipo', 48, font_id, 370, top+118)
    label('slab', font_id+'-instruction', 'Osserva gli innesti fra aste e grazie', 12, top+179, 20, INK)

label('gotico', 'name', 'UnifrakturMaguntia · Fraktur', 12, 32)
add('gotico', 'word', 'Tipografia', 82, 'gotico', 12, 160)
add('gotico', 'detail', 'h o n', 104, 'gotico', 12, 310)
label('gotico', 'angular', 'Tratti spezzati', 12, 376)
label('gotico', 'rhythm', 'Ritmo verticale', 330, 376)
label('gotico', 'identity', 'Un disegno contemporaneo della tradizione gotica', 12, 420, 20, INK)

for i, (font_id, meaning) in enumerate([('plex-serif', 'con grazie'), ('plex-sans', 'senza grazie'), ('plex-mono', 'monospazio')]):
    top = i * 150
    label('superfamiglia', font_id+'-name', FONTS[font_id]['family'], 12, top+27)
    add('superfamiglia', font_id+'-word', 'Tipografia', 62, font_id, 12, top+105)
    label('superfamiglia', font_id+'-meaning', meaning, 454, top+85, 20, INK)

# A monospaced description is checked against the source metrics.
mono = TTFont(FONTS['plex-mono']['path'])
cmap = mono.getBestCmap()
mono_advances = [mono['hmtx'][cmap[ord(char)]][0] for char in 'Tipografia']
assert len(set(mono_advances)) == 1

with tempfile.TemporaryDirectory(prefix='classification-confronti-') as directory:
    temp = Path(directory)
    instances, original_requests = {}, {}
    for request in requests:
        original_requests[request['slug']] = dict(request)
        if request['variations']:
            identity = (request['path'], tuple(sorted(request['variations'].items())))
            if identity not in instances:
                instance = instantiateVariableFont(TTFont(request['path']), request['variations'], inplace=True)
                assert 'fvar' not in instance
                suffix = hashlib.sha256(repr(identity[1]).encode()).hexdigest()[:12]
                name = request['postscriptName'] + '-Class' + suffix
                for record in instance['name'].names:
                    if record.nameID == 6:
                        record.string = name.encode(record.getEncoding())
                path = temp / (name+'.ttf')
                instance.save(path, reorderTables=False)
                instances[identity] = (path, name)
            request['path'], request['postscriptName'] = map(str, instances[identity])
            request['variations'] = {}
    request_path = temp/'requests.json'
    request_path.write_text(json.dumps(requests, ensure_ascii=False), encoding='utf-8')
    env = dict(os.environ, CLANG_MODULE_CACHE_PATH=str(temp/'clang-cache'), SWIFT_MODULECACHE_PATH=str(temp/'swift-cache'), LC_ALL='en_US.UTF-8')
    result = subprocess.run(['swift', str(OUT/'outline-text.swift'), str(request_path)], check=True, stdout=subprocess.PIPE, env=env)
    reports = json.loads(result.stdout)

by_slug = {r['slug']: r for r in reports}
outputs = []
for figure in figures:
    parts, specimens = [], []
    for place in placements:
        if place['figure'] != figure['slug']:
            continue
        report = by_slug[place['slug']]
        min_x, min_y, width, height = report['inkBounds']
        assert place['x']+min_x >= 0 and place['x']+min_x+width <= figure['width'], (place['slug'], report['inkBounds'])
        assert place['baseline']-min_y-height >= 0 and place['baseline']-min_y <= figure['height'], (place['slug'], report['inkBounds'])
        text = escape(report['text'], {'"': '&quot;'})
        parts.append(f'<g aria-label="{text}"><path fill="{place["color"]}" transform="translate({number(place["x"])} {number(place["baseline"])}) scale(1 -1)" d="{report["path"]}"/></g>')
        specimens.append(dict(place, text=report['text'], bodyPx=report['bodyPx'], pinnedCoordinates=original_requests[place['slug']]['variations'], coreTextVariationParameters=report['effectiveVariations'], inkBounds=report['inkBounds'], advanceWidth=report['advanceWidth'], glyphCount=report['glyphCount']))
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{figure["width"]}" height="{figure["height"]}" viewBox="0 0 {figure["width"]} {figure["height"]}" role="img" aria-labelledby="title desc"><title id="title">{escape(figure["title"])}</title><desc id="desc">{escape(figure["description"])}</desc>{"".join(parts)}</svg>\n'
    path = OUT/(figure['slug']+'.svg')
    path.write_text(svg, encoding='utf-8')
    digest = sha(path)
    published = ROOT/f'public/images/tipografia/classificazioni-{figure["slug"]}-{digest[:12]}.svg'
    published.write_bytes(path.read_bytes())
    outputs.append({'id': 'tipografia-classificazioni-'+figure['slug'], 'title': figure['title'], 'description': figure['description'], 'sourceLinks': figure['sources'], 'path': local(path), 'publishedPath': local(published), 'naturalWidth': figure['width'], 'naturalHeight': figure['height'], 'sha256': digest, 'bytes': path.stat().st_size, 'fonts': figure['fonts'], 'specimens': specimens})

retained = [local(OUT/'generate.py'), local(OUT/'outline-text.swift'), local(OUT/'manifest.json')]
for info in FONTS.values():
    if info['path'].is_relative_to(ROOT):
        retained.append(local(info['path']))
    if info.get('licensePath'):
        retained.append(local(info['licensePath']))
manifest = {'date': '2026-10-20', 'purpose': 'Authentic supplementary examples for the typography classification section', 'construction': 'Original diagrams from original-font outlines. FontTools pins every axis before CoreText CTLine/CTRun shaping. Only baseline translations and y-axis reflection; no synthetic weight, slant or width. Transparent backgrounds, no frames.', 'fonts': font_records, 'outputs': outputs, 'retainedSources': list(dict.fromkeys(retained)), 'sources': [{'url': 'https://www.ibm.com/design/impact/plex/', 'verifiedClaim': 'IBM documents Sans, Sans Condensed, Mono and Serif as members of the same Plex family.'}], 'monoVerification': {'font': 'plex-mono', 'text': 'Tipografia', 'sourceAdvanceUnits': mono_advances, 'equalAdvance': True}, 'generator': {'path': local(OUT/'generate.py'), 'sha256': sha(OUT/'generate.py'), 'helper': local(OUT/'outline-text.swift'), 'helperSha256': sha(OUT/'outline-text.swift'), 'fontToolsVersion': fonttools_version}, 'guards': ['Exact font-file URL', 'Exact PostScript face', 'No fallback runs', 'All glyphs available', 'Every axis frozen before shaping', 'All ink fits SVG viewBox']}
(OUT/'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps([{k:v for k,v in o.items() if k!='specimens'} for o in outputs],ensure_ascii=False,indent=2))
