"""Rebuild the authentic, two-panel anatomy diagram without network access.

PYTHONPATH=/private/tmp/comment357-fonttools python3 assets/booklet/tipografia-anatomia-revisione/generate.py

Requires fontTools 4.67+ and Node.js (its built-in Brotli decodes the local WOFF2).
The Roboto Serif specimens and Nunito Sans labels are actual font outlines.
panels.json deliberately omits label outlines so Figma can add native DM Sans text.
"""
from pathlib import Path
import hashlib
import json
import os
import shutil
import subprocess
import sys
import types
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
INK, BLUE, GUIDE = '#2c333f', '#17608b', '#bdd4e8'
ROBOT = ROOT / 'assets/font-previews/downloads/robotoserif/RobotoSerif[GRAD,opsz,wdth,wght].ttf'
NUNITO = ROOT / 'public/fonts/deck/nunito-sans-latin-wght-normal.woff2'

# Keep the generator usable with a bare fontTools installation: Node ships the
# same standard Brotli decoder needed for WOFF2, without a pip/network install.
try:
    import brotli
except ImportError:
    node = os.environ.get('NODE') or shutil.which('node')
    if not node:
        candidate = Path('/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node')
        node = str(candidate) if candidate.exists() else None
    if not node:
        raise RuntimeError('Install Brotli for Python or expose Node.js on PATH.')
    brotli = types.ModuleType('brotli')
    def decompress(data):
        return subprocess.run([node, '-e', "process.stdout.write(require('zlib').brotliDecompressSync(require('fs').readFileSync(0)))"], input=data, stdout=subprocess.PIPE, check=True).stdout
    brotli.decompress = decompress
    sys.modules['brotli'] = brotli

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def instantiate(path, weight):
    font = TTFont(path)
    defaults = {axis.axisTag: axis.defaultValue for axis in font['fvar'].axes}
    values = dict(defaults, wght=weight)
    return instantiateVariableFont(font, values, inplace=True), values


font, axes = instantiate(ROBOT, 500)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
label_fonts = {weight: instantiate(NUNITO, weight)[0] for weight in [400, 500, 600]}


def shape(char):
    name = cmap[ord(char)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(pen)
    bounds = BoundsPen(glyphs)
    glyphs[name].draw(bounds)
    return pen.getCommands(), bounds.bounds, glyphs[name].width


SHAPES = {char: shape(char) for char in 'Hhxpog'}


def fmt(value):
    return f'{value:.6f}'.rstrip('0').rstrip('.')


def specimen(char, x, baseline, size, fill=INK, extra=''):
    d, _, _ = SHAPES[char]
    return f'<path fill="{fill}" transform="translate({fmt(x)} {fmt(baseline)}) scale({fmt(size/1000)} {fmt(-size/1000)})" d="{d}" {extra}/>'


def inner_contour(char, index):
    pen = RecordingPen()
    glyphs[cmap[ord(char)]].draw(pen)
    contours = []
    current = []
    for command in pen.value:
        current.append(command)
        if command[0] in ['closePath', 'endPath']:
            contours.append(current)
            current = []
    recorder = RecordingPen()
    recorder.value = contours[index]
    svg_pen = SVGPathPen(glyphs)
    recorder.replay(svg_pen)
    return svg_pen.getCommands()


def text(text, x, y, width, size=24, weight=500, color=INK, align='left', height=None):
    return dict(text=text, x=x, y=y, width=width, height=height or size*1.25,
                fontSize=size, weight=weight, color=color, align=align, lineHeight=size*1.25)


def outlined_text(item):
    f = label_fonts[item['weight']]
    gs = f.getGlyphSet()
    mp = f.getBestCmap()
    scale = item['fontSize']/f['head'].unitsPerEm
    total = sum(gs[mp[ord(char)]].width for char in item['text']) * scale
    x = item['x'] + ((item['width']-total)/2 if item['align']=='center' else item['width']-total if item['align']=='right' else 0)
    baseline = item['y'] + item['fontSize']*.97
    paths = []
    for char in item['text']:
        name = mp[ord(char)]
        pen = SVGPathPen(gs)
        gs[name].draw(pen)
        d = pen.getCommands()
        if d:
            paths.append(f'<path fill="{item["color"]}" transform="translate({fmt(x)} {fmt(baseline)}) scale({fmt(scale)} {fmt(-scale)})" d="{d}"/>')
        x += gs[name].width*scale
    if total > item['width']+.01:
        raise ValueError(f'Label too wide: {item["text"]} ({total:.1f} > {item["width"]})')
    return ''.join(paths)


def svg(content, title, width=600, height=280):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><title>{escape(title)}</title>{content}</svg>\n'


# Panel 1: labels stay well apart even where the true cap and ascender heights
# nearly coincide. Guides measure this specimen's ink, not OS/2/hhea font metrics.
texts1 = [text('Riferimenti verticali', 0, 0, 600, 26, 600),
          text('Quote del campione: non coincidono con il corpo.', 0, 253, 600, 20, 400)]
sample_x, baseline, size = 245, 220, 125
positions = {}
cursor = sample_x
for char in 'Hhxp':
    positions[char] = cursor
    cursor += SHAPES[char][2] * size/1000
references = [
    ('Ascendente (h)', 'h', SHAPES['h'][1][3]),
    ('Maiuscole (H)', 'H', SHAPES['H'][1][3]),
    ('Altezza della x', 'x', SHAPES['x'][1][3]),
    ('Linea di base', 'H', 0),
    ('Discendente (p)', 'p', SHAPES['p'][1][1]),
]
geometry1 = []
measurements = []
for i, (label, char, value) in enumerate(references):
    label_y = 65 + i*34
    y = baseline - value*size/1000
    geometry1.append(f'<path d="M205 {fmt(label_y+15)} H221 L241 {fmt(y)} H590" fill="none" stroke="{GUIDE}" stroke-width="1.4"/>')
    # A blue tick is directly over the relevant glyph; it reinforces the
    # correspondence of the leaders when the top two rules are only 3.125 px apart.
    glyph_x = positions[char]
    left = glyph_x + SHAPES[char][1][0]*size/1000
    right = glyph_x + SHAPES[char][1][2]*size/1000
    geometry1.append(f'<path d="M{fmt(left)} {fmt(y)} H{fmt(right)}" fill="none" stroke="{BLUE}" stroke-width="2"/>')
    texts1.append(text(label, 0, label_y, 198))
    measurements.append(dict(label=label, glyph=char, fontUnits=value, y=y, labelY=label_y))
geometry1 += [specimen(char, positions[char], baseline, size) for char in 'Hhxp']


# Panel 2: one part per glyph, with direct colour emphasis instead of six
# crossing leaders. All glyphs preserve their own natural outlines/proportions.
texts2 = [text('Dettagli anatomici', 0, 0, 600, 26, 600)]
geometry2 = []
examples = [
    ('Asta', 'H', dict(rect=(127, 90, 270, 630))),
    ('Spalla', 'h', dict(rect=(228, 410, 605, 535))),
    ('Orecchio', 'g', dict(contour=0)),
    ('Grazia', 'H', dict(rect=(39, 0, 348, 89))),
    ('Controforma', 'o', dict(contour=1)),
    ('Pancia', 'p', dict(rect=(229, -1, 625, 525))),
]
example_metadata = []
for i, (label, char, target) in enumerate(examples):
    col, row = i%3, i//3
    _, bounds, _ = SHAPES[char]
    x_min, y_min, x_max, y_max = bounds
    glyph_size = 74/(y_max-y_min)*1000
    scale = glyph_size/1000
    x = col*200 + 100 - (x_min+x_max)*scale/2
    bottom = 121 + row*122
    base = bottom + y_min*scale
    geometry2.append(specimen(char, x, base, glyph_size))
    transform = f'translate({fmt(x)} {fmt(base)}) scale({fmt(scale)} {fmt(-scale)})'
    if 'contour' in target:
        # The g ear and o counter are exact, separate contours in this font.
        d = inner_contour(char, target['contour'])
        geometry2.append(f'<path d="{d}" fill="{BLUE}" transform="{transform}"/>')
    else:
        a, b, c, d = target['rect']
        clip = f'target-{i}'
        geometry2.append(f'<defs><clipPath id="{clip}" clipPathUnits="userSpaceOnUse"><rect x="{a}" y="{b}" width="{c-a}" height="{d-b}"/></clipPath></defs>')
        geometry2.append(f'<g transform="{transform}"><path d="{SHAPES[char][0]}" fill="{BLUE}" clip-path="url(#{clip})"/></g>')
    texts2.append(text(label, col*200, 126+row*122, 200, align='center'))
    example_metadata.append(dict(label=label, glyph=char, sourceInkBounds=list(bounds), fontSize=glyph_size, target=target))


panels = []
full = []
for i, (name, geometry, texts) in enumerate([
    ('Riferimenti verticali', geometry1, texts1),
    ('Dettagli anatomici', geometry2, texts2),
]):
    body = ''.join(geometry)
    geom_svg = svg(body, name)
    complete = body + ''.join(outlined_text(item) for item in texts)
    (OUT/f'panel-{i+1}.svg').write_text(svg(complete, name))
    (OUT/f'panel-{i+1}-geometry.svg').write_text(geom_svg)
    panels.append(dict(name=name, width=600, height=280, geometrySvg=geom_svg, texts=texts))
    full.append(f'<g transform="translate(0 {i*300})">{complete}</g>')
(OUT/'anatomia-tipografica.svg').write_text(svg(''.join(full), 'Riferimenti verticali e dettagli anatomici — Roboto Serif 500', height=580))
(OUT/'panels.json').write_text(json.dumps(dict(coordinateSystem='x/y are top-left; lineHeight and height are pixels', panels=panels), ensure_ascii=False, indent=2)+'\n')

font_record = dict(path=str(ROBOT.relative_to(ROOT)), sha256=sha(ROBOT), family=font['name'].getDebugName(1), version=font['name'].getDebugName(5), axes=axes, unitsPerEm=font['head'].unitsPerEm,
                   license='SIL Open Font License 1.1', licensePath='assets/font-previews/downloads/robotoserif/OFL.txt', licenseSha256=sha(ROBOT.parent/'OFL.txt'))
label_record = dict(path=str(NUNITO.relative_to(ROOT)), sha256=sha(NUNITO), family='Nunito Sans', weights=[400,500,600], license='SIL Open Font License 1.1', licensePath='public/fonts/deck/OFL-NunitoSans.txt', licenseSha256=sha(ROOT/'public/fonts/deck/OFL-NunitoSans.txt'))
provenance = dict(schemaVersion=1, date='2026-10-20', purpose='Replace the overcrowded anatomy diagram on tipografia-griglie-08 and the corresponding booklet pages.',
                  originalAsset='tipografia-4368-45107', specimenFont=font_record, slideLabels=label_record,
                  sourceReferences=[dict(url='https://www.monotype.com/resources/expertise/typography-terms-and-definitions', role='Terminology and anatomy reference; no illustration copied.'),
                                    dict(url='https://fonts.google.com/knowledge/glossary/x_height', role='Definition of x-height; no illustration copied.'),
                                    dict(url='https://www.w3.org/TR/CSS2/fonts.html#font-size-props', role='Font-size/em distinction from visible glyph dimensions; no illustration copied.')],
                  construction='Original vector composition; authentic Roboto Serif outlines; geometry and labels separated for editable Figma text. No raster trace or substituted typeface.',
                  measurements=dict(sample='Hhxp', fontSize=125, baseline=220, values=measurements, note='Values are measured ink bounds, not a claim about nominal OS/2, hhea or em-square metrics.'),
                  examples=example_metadata,
                  generator=dict(path=str(Path(__file__).relative_to(ROOT)), sha256=sha(Path(__file__)), fontToolsVersion=__import__('fontTools').__version__),
                  outputs=[dict(path=p.name, sha256=sha(p)) for p in sorted(OUT.glob('*.svg'))]+[dict(path='panels.json', sha256=sha(OUT/'panels.json'))])
(OUT/'provenance.json').write_text(json.dumps(provenance, ensure_ascii=False, indent=2)+'\n')
print(json.dumps(dict(output=str(OUT/'anatomia-tipografica.svg'), panels=len(panels), font=font_record['family'], variations=axes, svgTextElements=0), ensure_ascii=False))
