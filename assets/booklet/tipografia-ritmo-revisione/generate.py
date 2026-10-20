"""Generate the original, static rhythm diagram from local Nunito Sans outlines.

PYTHONPATH=/private/tmp/comment357-fonttools python3 assets/booklet/tipografia-ritmo-revisione/generate.py
Requires fontTools; Node's Brotli decoder is used when Python Brotli is absent.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import hashlib
import json
import os
import shutil
import subprocess
import sys
import types

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
FONT = ROOT / 'public/fonts/deck/nunito-sans-latin-wght-normal.woff2'
LICENSE = ROOT / 'public/fonts/deck/OFL-NunitoSans.txt'
INK, BLUE, LIGHT, PAUSE = '#0f172a', '#075985', '#e0f2fe', '#e2e8f0'

try:
    import brotli
except ImportError:
    node = os.environ.get('NODE') or shutil.which('node')
    if not node:
        candidate = Path('/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node')
        node = str(candidate) if candidate.exists() else None
    if not node:
        raise RuntimeError('Expose Node.js on PATH, or install Python Brotli.')
    brotli = types.ModuleType('brotli')
    def decompress(data):
        return subprocess.run([node, '-e', "process.stdout.write(require('zlib').brotliDecompressSync(require('fs').readFileSync(0)))"], input=data, stdout=subprocess.PIPE, check=True).stdout
    brotli.decompress = decompress
    sys.modules['brotli'] = brotli

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

fonts = {}
for weight in [500, 600, 700]:
    font = TTFont(FONT)
    axes = {axis.axisTag: axis.defaultValue for axis in font['fvar'].axes}
    fonts[weight] = instantiateVariableFont(font, dict(axes, wght=weight), inplace=True)

labels = []
def number(value):
    return f'{value:.5f}'.rstrip('0').rstrip('.')

def text(value, x, baseline, size=34, weight=500, color=INK, align='left', max_width=None):
    font = fonts[weight]
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    scale = size / font['head'].unitsPerEm
    width = sum(glyphs[cmap[ord(c)]].width for c in value) * scale
    if max_width is not None and width > max_width:
        raise ValueError(f'Text exceeds its slot: {value}: {width} > {max_width}')
    if align == 'center':
        x -= width / 2
    elif align == 'right':
        x -= width
    labels.append(dict(text=value, x=x, baseline=baseline, size=size, weight=weight, width=width))
    paths = []
    for char in value:
        glyph = glyphs[cmap[ord(char)]]
        pen = SVGPathPen(glyphs)
        glyph.draw(pen)
        if pen.getCommands():
            paths.append(f'<path fill="{color}" transform="translate({number(x)} {baseline}) scale({number(scale)} {number(-scale)})" d="{pen.getCommands()}"/>')
        x += glyph.width * scale
    return f'<g aria-label="{escape(value)}">{"".join(paths)}</g>'

parts = ['<rect width="1200" height="800" fill="#fff"/>']
parts.append(text('Sullo schermo', 0, 55, 44, 600))
for index, interval in enumerate(['0–1 s', '1–2 s', '2–3 s']):
    center = 200 + index * 400
    parts.append(text(interval, center, 122, 44, 600, align='center'))
    parts.append(f'<rect x="{20 + index * 400}" y="153" width="360" height="224" fill="{LIGHT}"/>')
    if index != 1:
        word = 'ASCOLTA' if index == 0 else 'ORA'
        parts.append(text(word, center, 291, 70, 700, BLUE, 'center', 344))
    parts.append(text(['Compare ASCOLTA', 'Schermo vuoto', 'Compare ORA'][index], center, 435, 40, 500, align='center', max_width=390))
for x in [388, 788]:
    parts.append(f'<path d="M{x} 265h22m-8-8 8 8-8 8" fill="none" stroke="{BLUE}" stroke-width="3"/>')
parts.append(text('Durata e pausa', 0, 495, 44, 600))
for index, word in enumerate(['ASCOLTA', 'PAUSA', 'ORA']):
    parts.append(f'<rect x="{index * 400}" y="535" width="400" height="85" fill="{PAUSE if index == 1 else BLUE}"/>')
    parts.append(text(word, 200 + index * 400, 592, 40, 700, INK if index == 1 else '#fff', 'center'))
parts.append(f'<path d="M0 640h1200M1.5 631v22M400 631v22M800 631v22M1198.5 631v22" fill="none" stroke="{BLUE}" stroke-width="3"/>')
for index in range(4):
    parts.append(text(f'{index} s', index * 400, 700, 44, 500, align='left' if index == 0 else 'right' if index == 3 else 'center'))

title = 'ASCOLTA per un secondo, schermo vuoto per un secondo, ORA per un secondo'
description = 'Tre fotogrammi mostrano le parole alla stessa posizione. Il fotogramma centrale è vuoto. La linea del tempo sotto mostra tre intervalli consecutivi di un secondo, con la pausa tra le due parole.'
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>{"".join(parts)}</svg>\n'
output = OUT / 'parole-pausa-tempo.svg'
output.write_text(svg)
sha = lambda file: hashlib.sha256(file.read_bytes()).hexdigest()
manifest = dict(
    schemaVersion=1, date='2026-10-20', originalAsset='tipografia-4370-45150',
    purpose='Clarify the rhythm example on the typography slide with an actually empty pause and a proportional timeline.',
    originalRetained='assets/booklet/lezione-08-tipografia/originals/4370-45150.svg',
    construction='Original static vector diagram. Three equal video frames; three equal one-second timeline segments. No text appears inside the middle frame. All text uses authentic local Nunito Sans outlines.',
    durationSeconds=3,
    sequence=[dict(start=0,end=1,text='ASCOLTA'),dict(start=1,end=2,text=''),dict(start=2,end=3,text='ORA')],
    font=dict(family='Nunito Sans', path=str(FONT.relative_to(ROOT)), sha256=sha(FONT), weights=[500,600,700], license='SIL Open Font License 1.1', licensePath=str(LICENSE.relative_to(ROOT)), licenseSha256=sha(LICENSE)),
    labels=labels,
    generator=dict(path=str(Path(__file__).relative_to(ROOT)),sha256=sha(Path(__file__)),fontToolsVersion=__import__('fontTools').__version__),
    output=dict(path=str(output.relative_to(ROOT)),sha256=sha(output),width=1200,height=800),
)
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(manifest['output']))
