"""Build three original educational diagrams from geometry and real font outlines.

Run from any directory with fontTools available:
  PYTHONPATH=/private/tmp/comment357-fonttools python3 risorse-condivise/fonti/booklet/tipografia-correttezza/generate.py

No network, external SVG font, raster image or generative image is required.
Python Brotli is optional: the existing Node runtime can decode the local WOFF2.
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

ROOT = Path(__file__).resolve().parents[4]
OUT = Path(__file__).resolve().parent
FONT = ROOT / 'progetti/slide/public/fonts/deck/nunito-sans-latin-wght-normal.woff2'
LICENSE = ROOT / 'progetti/slide/public/fonts/deck/OFL-NunitoSans.txt'
INK = '#0f172a'
SKY = '#075985'
PALE = '#e0f2fe'
LINE = '#7dd3fc'
AMBER = '#F9C213'
WHITE = '#ffffff'
WIDTH, HEIGHT = 700, 460

try:
    import brotli
except ImportError:
    node = os.environ.get('NODE') or shutil.which('node')
    if not node:
        bundled = Path('/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node')
        node = str(bundled) if bundled.exists() else None
    if not node:
        raise RuntimeError('Expose Node.js on PATH or install Brotli for Python.')
    brotli = types.ModuleType('brotli')
    def decompress(data):
        return subprocess.run([node, '-e', "process.stdout.write(require('zlib').brotliDecompressSync(require('fs').readFileSync(0)))"], input=data, stdout=subprocess.PIPE, check=True).stdout
    brotli.decompress = decompress
    sys.modules['brotli'] = brotli

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


fonts = {}
for weight in (400, 600, 700):
    font = TTFont(FONT)
    axes = {axis.axisTag: axis.defaultValue for axis in font['fvar'].axes}
    fonts[weight] = instantiateVariableFont(font, dict(axes, wght=weight), inplace=True)


def fmt(value):
    return f'{value:.6f}'.rstrip('0').rstrip('.')


class Diagram:
    def __init__(self, filename, title, description, sources):
        self.filename, self.title, self.description = filename, title, description
        self.sources, self.geometry, self.labels, self.facts = sources, [], [], {}

    def rect(self, x, y, width, height, fill=WHITE, stroke=None, sw=1.5):
        assert x >= 0 and y >= 0 and x + width <= WIDTH and y + height <= HEIGHT
        self.geometry.append(f'<rect x="{fmt(x)}" y="{fmt(y)}" width="{fmt(width)}" height="{fmt(height)}" fill="{fill}"' + (f' stroke="{stroke}" stroke-width="{sw}"' if stroke else '') + '/>')

    def line(self, x1, y1, x2, y2, color=SKY, sw=1.5, dash=None):
        self.geometry.append(f'<path d="M{fmt(x1)} {fmt(y1)} L{fmt(x2)} {fmt(y2)}" fill="none" stroke="{color}" stroke-width="{sw}"' + (f' stroke-dasharray="{dash}"' if dash else '') + '/>')

    def circle(self, x, y, radius, fill=AMBER, stroke=SKY, sw=2):
        self.geometry.append(f'<circle cx="{fmt(x)}" cy="{fmt(y)}" r="{radius}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

    def text(self, value, x, y, size=24, weight=600, color=INK, align='left', max_width=None):
        """y is the top of a line box; every visible letter is a true font path."""
        assert size >= 24
        f = fonts[weight]
        gs, cm = f.getGlyphSet(), f.getBestCmap()
        scale = size / f['head'].unitsPerEm
        total = sum(gs[cm[ord(c)]].width for c in value) * scale
        if max_width is not None and total > max_width + .01:
            raise ValueError(f'{self.filename}: label too wide: {value} ({total:.1f}>{max_width})')
        start = x - (total/2 if align == 'center' else total if align == 'right' else 0)
        baseline, cursor = y + size * .97, start
        if start < -.01 or start + total > WIDTH + .01 or y < 0 or baseline > HEIGHT:
            raise ValueError(f'{self.filename}: label out of bounds: {value}')
        paths = []
        for c in value:
            glyph = gs[cm[ord(c)]]
            pen = SVGPathPen(gs)
            glyph.draw(pen)
            if pen.getCommands():
                paths.append(f'<path d="{pen.getCommands()}" transform="translate({fmt(cursor)} {fmt(baseline)}) scale({fmt(scale)} {fmt(-scale)})"/>')
            cursor += glyph.width * scale
        self.geometry.append(f'<g fill="{color}" aria-label="{escape(value)}">' + ''.join(paths) + '</g>')
        self.labels.append(dict(text=value, x=x, y=y, size=size, weight=weight, color=color, align=align, advanceWidth=round(total, 4)))

    def save(self):
        metadata = {'kind':'original-educational-vector-diagram', 'font':'Nunito Sans', 'fontSourceSha256':sha(FONT), 'fontLicense':'SIL OFL 1.1', 'sources':self.sources, 'facts':self.facts}
        source = f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" role="img" aria-labelledby="title desc"><title id="title">{escape(self.title)}</title><desc id="desc">{escape(self.description)}</desc><metadata>{escape(json.dumps(metadata, ensure_ascii=False, sort_keys=True))}</metadata>' + ''.join(self.geometry) + '</svg>\n'
        path = OUT / self.filename
        path.write_text(source)
        return dict(id=path.stem, path=str(path.relative_to(ROOT)), sha256=sha(path), width=WIDTH, height=HEIGHT, title=self.title, description=self.description, sources=self.sources, labels=self.labels, facts=self.facts, minLabelSize=24, fontSource='font-provenance.json', rights='Schema didattico originale CVeDI 2026. Contorni Nunito Sans da font SIL OFL 1.1; font e licenza originali conservati nel progetto.')


responsive_sources = ['https://web.dev/learn/design/intro', 'https://alistapart.com/article/responsive-web-design/']
d = Diagram('responsive-adaptive.svg', 'Responsive e adaptive: due strategie di adattamento', 'Tre larghezze di viewport: a sinistra la griglia si ridimensiona; a destra vengono scelte due configurazioni predisposte. Schema originale; nessuna attribuzione client o server.', responsive_sources)
d.text('Responsive', 0, 0, 32, 700, SKY)
d.text('Adaptive', 370, 0, 32, 700, SKY)
d.text('Griglia fluida', 0, 43, 24)
d.text('Layout predisposti', 370, 43, 24, max_width=330)
viewports = []
for column, origin in [('responsive', 0), ('adaptive', 370)]:
    for index, viewport_width in enumerate((330, 260, 190)):
        y, h = 94 + index * 108, 88
        d.rect(origin, y, viewport_width, h, WHITE, SKY, 1.5)
        d.line(origin, y + 16, origin + viewport_width, y + 16, SKY, 1)
        d.line(origin + 9, y + 8, origin + 29, y + 8, SKY, 3)
        # The viewport boundary is technical content, not an enclosing frame.
        # Both adaptive wide views use exactly the same 238 px content layout.
        content_width = viewport_width - 20 if column == 'responsive' else (238 if index < 2 else 150)
        content_x = origin + (viewport_width - content_width) / 2
        d.rect(content_x, y + 27, content_width, 11, AMBER)
        if index < 2:
            gap, card_width = 10, (content_width - 10) / 2
            for card in range(2):
                d.rect(content_x + card * (card_width + gap), y + 48, card_width, 28, PALE)
        else:
            d.rect(content_x, y + 48, content_width, 11, PALE)
            d.rect(content_x, y + 65, content_width, 11, PALE)
        viewports.append(dict(strategy=column, viewport=dict(x=origin,y=y,width=viewport_width,height=h), contentWidth=content_width, configuration='wide' if index < 2 else 'narrow'))
d.text('Schema originale', 0, 421, 24, 400, SKY)
d.facts = dict(viewports=viewports, adaptiveDistinctContentWidths=[238,150], responsiveDistinctContentWidths=[310,240,170], caveat='Confronto schematico di griglia fluida e configurazioni predisposte. Strategie e breakpoint possono convivere; non implica una distinzione client/server.')
outputs = [d.save()]


d = Diagram('regola-terzi.svg', 'Regola dei terzi: riferimenti di composizione', 'Griglia tre per tre con quattro intersezioni identiche. Le linee dividono larghezza e altezza esattamente a un terzo e due terzi; non rappresentano percentuali di attenzione.', ['https://www.adobe.com/creativecloud/photography/technique/rule-of-thirds.html', 'https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/5-easy-composition-guidelines'])
d.text('Regola dei terzi', 0, 0, 32, 700, SKY)
x, y, w, h = 98, 82, 504, 288
d.rect(x, y, w, h, WHITE)
for fraction in (0, 1/3, 2/3, 1):
    d.line(x + w*fraction, y, x + w*fraction, y+h, SKY, 1.5)
    d.line(x, y + h*fraction, x+w, y + h*fraction, SKY, 1.5)
for fraction, label in [(1/3,'1/3'), (2/3,'2/3')]:
    d.text(label, x+w*fraction, 47, 24, 600, SKY, 'center')
    d.text(label, 78, y+h*fraction-14, 24, 600, SKY, 'right')
intersections = []
for fx in (1/3, 2/3):
    for fy in (1/3, 2/3):
        px, py = x+w*fx, y+h*fy
        d.circle(px, py, 10)
        intersections.append(dict(x=px,y=py,xFraction=fx,yFraction=fy))
d.text('Riferimenti di composizione,', 0, 392, 24, 400)
d.text('non percentuali di attenzione.', 0, 423, 24, 400)
d.facts = dict(grid=dict(x=x,y=y,width=w,height=h,columns=3,rows=3), intersections=intersections, intersectionEncoding='Tutti i punti hanno lo stesso raggio, riempimento e contorno; nessuna gerarchia quantitativa.', statistics=False, goldenRatio=False)
outputs.append(d.save())


d = Diagram('architettura-interfaccia.svg', 'Architettura di un’interfaccia: aree e componenti', 'Schema didattico originale con navigazione superiore, menu laterale, contenuto principale, due card e un’azione. Non è uno screenshot di un prodotto o di un marchio.', ['https://www.w3.org/TR/css-grid-1/#grid-concepts'])
d.text('Aree e componenti', 0, 0, 32, 700, SKY)
# The boundaries below identify interface areas and controls, not an image frame.
d.rect(0, 61, 700, 59, PALE)
d.text('Navigazione', 18, 75, 26, 700, SKY)
for label, pos in [('Home', 288), ('Cerca', 427), ('Profilo', 557)]:
    if label == 'Home':
        d.rect(pos-14, 69, 111, 43, AMBER)
    d.text(label, pos, 77, 24)
d.rect(0, 139, 190, 252, PALE)
d.text('Menu', 18, 152, 26, 700, SKY)
d.rect(0, 209, 5, 39, AMBER)
d.text('Sezione 1', 18, 214, 24)
d.text('Sezione 2', 18, 267, 24)
d.text('Contenuto principale', 216, 143, 28, 700, SKY, max_width=484)
cards = []
for n, cx in [(1, 216), (2, 468)]:
    d.rect(cx, 201, 232, 103, WHITE, LINE, 1.5)
    d.rect(cx, 201, 232, 9, PALE)
    d.text(f'Card {n}', cx+17, 219, 24)
    d.line(cx+17, 270, cx+145, 270, LINE, 3)
    d.line(cx+17, 283, cx+117, 283, LINE, 3)
    cards.append(dict(x=cx,y=201,width=232,height=103))
d.rect(216, 328, 218, 51, AMBER)
d.text('Apri dettaglio', 325, 339, 24, 700, INK, 'center', max_width=200)
d.text('Schema didattico originale', 0, 421, 24, 400, SKY)
d.facts = dict(areas=['Navigazione superiore','Menu laterale','Contenuto principale'], components=['Card 1','Card 2','Azione Apri dettaglio'], cards=cards, brand=None, screenshot=False)
outputs.append(d.save())

font_manifest = json.loads((ROOT/'progetti/slide/public/fonts/deck/manifest.json').read_text())
font_record = dict(family='Nunito Sans', sourcePath=str(FONT.relative_to(ROOT)), sha256=sha(FONT), package=font_manifest['package'], source=font_manifest['source'], weights=[400,600,700], output='Outlines SVG dai glifi autentici, senza font esterni o fallback.', license='SIL Open Font License 1.1', licensePath=str(LICENSE.relative_to(ROOT)), licenseSha256=sha(LICENSE), copyright=LICENSE.read_text().splitlines()[0])
(OUT/'font-provenance.json').write_text(json.dumps(font_record, ensure_ascii=False, indent=2)+'\n')
(OUT/'metadata.json').write_text(json.dumps(dict(generator=str(Path(__file__).relative_to(ROOT)), canvas=[WIDTH,HEIGHT], palette=dict(ink=INK,sky800=SKY,sky100=PALE,sky300=LINE,amber=AMBER,white=WHITE), assets=outputs), ensure_ascii=False, indent=2)+'\n')
for output in outputs:
    print(f'{output["id"]}: {output["sha256"]}')
