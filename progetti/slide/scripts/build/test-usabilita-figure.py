"""Rebuild lesson 12 figures; historical crops and transcriptions stay untouched.

ImageGen originals are stored separately. Native SVG UI examples/diagrams use
the shared palette and Nunito Sans, outlined for portable rendering in images.
Run with the bundled Python (Pillow and fontTools).
"""
from pathlib import Path
import hashlib
import json
import math
import re
import xml.etree.ElementTree as ET
from html import escape

from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[4]
BASE = ROOT / 'progetti/slide/assets/lezione-test-usabilita'
OUTPUT = BASE / 'ricostruite'
WEB = ROOT / 'progetti/slide/public/images/test-usabilita/ricostruite'
FONT = ROOT / 'progetti/slide/assets/slide-materials/processo-ux-ui/ricostruite/font'
TOKENS = ROOT / 'risorse-condivise/stili/tokens.css'
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
OUTPUT.mkdir(parents=True, exist_ok=True)
WEB.mkdir(parents=True, exist_ok=True)
tokens = TOKENS.read_text()


def relative(path):
    return path.relative_to(ROOT).as_posix()


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def token_hex(name):
    value = re.search(r'--cvedi-' + name + r':\s*([^;]+);', tokens)[1]
    if value.startswith('#'):
        return value
    L, C, H = map(float, re.fullmatch(r'oklch\(([\d.]+)% ([\d.]+) ([\d.]+)\)', value).groups())
    L /= 100
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l = (L + .3963377774 * a + .2158037573 * b) ** 3
    m = (L - .1055613458 * a - .0638541728 * b) ** 3
    s = (L - .0894841775 * a - 1.291485548 * b) ** 3
    values = [4.0767416621*l-3.3077115913*m+.2309699292*s,
              -1.2684380046*l+2.6097574011*m-.3413193965*s,
              -.0041960863*l-.7034186147*m+1.707614701*s]
    rgb = [round(255*max(0, min(1, 12.92*v if v <= .0031308 else 1.055*max(0, v)**(1/2.4)-.055))) for v in values]
    return '#' + ''.join(f'{v:02x}' for v in rgb)


P = token_hex('purple-800')
PALE = token_hex('purple-100')
SOFT = token_hex('purple-50')
GREEN = token_hex('purple-accent-vivid')
GREEN_INK = token_hex('purple-accent')
GREEN_SOFT = token_hex('purple-accent-light')
INK, BODY, RULE, WHITE = '#0f172a', '#334155', '#cbd5e1', '#ffffff'
fonts = {weight: TTFont(FONT / f'cvedi-nunito-sans-{weight}.ttf') for weight in [400, 600, 700]}


def rect(x, y, w, h, fill=WHITE, radius=16, stroke=None):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}"' + (f' stroke="{stroke}" stroke-width="2"' if stroke else '') + '/>'


def path(d, stroke=P, width=3, fill='none', extra=''):
    return f'<path d="{d}" stroke="{stroke}" stroke-width="{width}" fill="{fill}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'


def circle(x, y, r, fill=WHITE, stroke=None):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"' + (f' stroke="{stroke}" stroke-width="3"' if stroke else '') + '/>'


def text(x, y, value, size=30, fill=INK, weight=400, anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" font-family="Nunito Sans">{escape(value)}</text>'


def lines(x, y, values, size=30, fill=BODY, weight=400, anchor='start', leading=None):
    return ''.join(text(x, y+i*(leading or size*1.32), value, size, fill, weight, anchor) for i, value in enumerate(values))


def icon(name, x, y, size=40, color=P):
    drawings = {
        'check': path('M 4 12 l 5 5 l 11 -12', color, 2.4),
        'music': path('M 9 17 V 4 L 20 2 v 13 M 9 7 l 11 -2', color, 1.8) + circle(5.5, 18, 3.5, color) + circle(16.5, 16, 3.5, color),
        'film': rect(2, 3, 20, 18, 'none', 2, color) + path('M 7 3 v 18 M 17 3 v 18 M 2 9 h 5 M 2 15 h 5 M 17 9 h 5 M 17 15 h 5', color, 1.5),
        'book': path('M 3 3 h 8 q 2 0 2 2 q 0 -2 2 -2 h 7 v 17 h -7 q -2 0 -2 2 q 0 -2 -2 -2 H 3 Z M 13 5 v 17', color, 1.8),
        'tv': rect(2, 6, 20, 15, 'none', 2, color) + path('M 7 1 l 5 5 l 5 -5', color, 1.8),
        'podcast': circle(12, 7, 3, color) + path('M 8 13 q 4 -3 8 0 l -1 9 H 9 Z M 5 16 a 10 10 0 1 1 14 0', color, 1.8),
        'folder': path('M 2 7 V 4 h 8 l 3 3 h 9 v 14 H 2 Z', color, 1.8),
        'search': circle(10, 10, 7, 'none', color) + path('M 15 15 l 7 7', color, 2),
        'archive': path('M 4 9 h 16 v 12 H 4 Z M 2 3 h 20 v 6 H 2 Z M 9 13 h 6', color, 1.8),
        'close': path('M 5 5 l 14 14 M 19 5 L 5 19', color, 2),
        'clip': path('M 8 16 l 9 -9 a 3 3 0 0 1 4 4 L 10 22 a 5 5 0 0 1 -7 -7 L 15 3 a 4 4 0 0 1 6 6 L 9 21', color, 1.8),
        'mail': rect(2, 4, 20, 16, 'none', 2, color) + path('M 3 5 l 9 8 l 9 -8', color, 1.8),
        'warning': path('M 12 2 L 23 22 H 1 Z M 12 8 v 6 M 12 18 v .2', color, 1.8),
        'headset': path('M 4 14 V 11 a 8 8 0 0 1 16 0 v 7 q 0 4 -6 4 M 2 11 h 4 v 8 H 2 Z M 18 11 h 4 v 8 h -4 Z', color, 1.8),
        'tasks': path('M 2 4 h 4 v 4 H 2 Z M 2 12 h 4 v 4 H 2 Z M 2 20 h 4 v 3 H 2 Z M 10 6 h 12 M 10 14 h 12 M 10 22 h 12', color, 1.7),
        'participant': circle(8, 7, 4, 'none', color) + path('M 1 23 v -5 q 7 -8 14 0 v 5 Z M 16 3 h 7 v 8 h -3 l -4 3 Z', color, 1.8),
        'arrow': path('M 3 12 h 18 M 15 6 l 6 6 l -6 6', color, 2),
    }
    return f'<g transform="translate({x} {y}) scale({size/24})">{drawings[name]}</g>'


def button(x, y, w, label, fill=P, color=WHITE, size=28, h=60):
    return rect(x, y, w, h, fill, 12) + text(x+w/2, y+h/2+size*.35, label, size, color, 600, 'middle')


def arrow(d, color=P):
    return path(d, color, 3, extra=f'marker-end="url(#{"green-arrow" if color == GREEN_INK else "arrow"})"')


def outline_text(svg):
    """Keep editable text in the source, publish stable glyph paths in the SVG."""
    tree = ET.fromstring(svg)
    for parent in tree.iter():
        for element in list(parent):
            if element.tag != f'{{{NS}}}text':
                continue
            value = element.text or ''
            attrs = element.attrib
            weight = int(attrs.get('font-weight', '400'))
            font = fonts[weight]
            glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
            names = [cmap.get(ord(char), '.notdef') for char in value]
            assert '.notdef' not in names, f'Unsupported character in {value}'
            scale = float(attrs['font-size']) / font['head'].unitsPerEm
            widths = [font['hmtx'][name][0] for name in names]
            x, y = float(attrs['x']), float(attrs['y'])
            width = sum(widths)*scale
            x -= width/2 if attrs.get('text-anchor') == 'middle' else width if attrs.get('text-anchor') == 'end' else 0
            group = ET.Element(f'{{{NS}}}g', {'data-label': value, 'fill': attrs['fill']})
            title = ET.SubElement(group, f'{{{NS}}}title')
            title.text = value
            offset = 0
            for name, advance in zip(names, widths):
                pen = SVGPathPen(glyphs)
                glyphs[name].draw(pen)
                d = pen.getCommands()
                if d:
                    ET.SubElement(group, f'{{{NS}}}path', {'d': d, 'transform': f'translate({x+offset*scale:.4f} {y:g}) scale({scale:g} {-scale:g})'})
                offset += advance
            position = list(parent).index(element)
            parent.remove(element)
            parent.insert(position, group)
    return ET.tostring(tree, encoding='unicode')


historical = json.loads((BASE / 'immagini.json').read_text())
by_id = {image['id']: image for image in historical['images']}
entries = []


def save_svg(id, title, alt, w, h, body, relationships=None):
    defs = ''.join(f'<marker id="{id}" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="{color}" stroke-width="2"/></marker>' for id, color in [('arrow', P), ('green-arrow', GREEN_INK)])
    svg = f'<svg xmlns="{NS}" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{escape(title)}</title><desc>{escape(alt)}</desc><defs>{defs}</defs>{body}</svg>'
    editable = OUTPUT / (id + '.source.svg')
    editable.write_text(svg + '\n')
    target = WEB / (id + '.svg')
    target.write_text(outline_text(svg) + '\n')
    old = by_id[id]
    entries.append({'id': id, 'sourcePage': old['sourcePage'], 'kind': 'native-svg',
                    'original': relative(editable), 'originalSha256': sha(editable),
                    'web': '/images/test-usabilita/ricostruite/' + target.name, 'sha256': sha(target),
                    'webSize': [w, h], 'alt': alt,
                    'caption': 'Ricostruzione didattica dell’esempio originale' if id.startswith('figura-') else None,
                    'rights': old['rights'], 'historicalOriginal': old['original'],
                    'labels': re.findall(r'<text[^>]*>(.*?)</text>', svg),
                    'relationships': relationships or [], 'zoomClearanceRight': 56})


# Eight Nielsen interface examples. These are explicitly reconstructed examples,
# not simulated claims that the old branded interfaces look like this today.
body = rect(16, 34, 496, 320, SOFT, 20)
body += text(44, 86, 'Caricamento del file', 31, P, 600)
body += text(44, 130, 'presentazione.pdf', 29, BODY)
body += rect(44, 159, 432, 20, PALE, 10) + rect(44, 159, 302, 20, P, 10)
body += text(44, 220, '70%', 32, P, 600) + text(476, 220, 'Annulla', 28, P, 600, 'end')
body += rect(32, 268, 464, 66, GREEN_SOFT, 12) + icon('check', 48, 286, 30, GREEN_INK)
body += text(90, 311, 'Link di recupero inviato', 28, GREEN_INK, 600)
save_svg('figura-31', 'Visibilità dello stato del sistema',
         'Caricamento di presentazione.pdf al 70%, comando Annulla e conferma che un link di recupero è stato inviato. Ricostruzione didattica.', 560, 390, body)

body = rect(36, 12, 456, 438, SOFT, 18) + text(66, 62, 'Libreria', 34, P, 600)
for i, (label, symbol) in enumerate([('Musica', 'music'), ('Film', 'film'), ('Serie TV', 'tv'), ('Podcast', 'podcast'), ('Audiolibri', 'book'), ('Applicazioni', 'folder')]):
    y = 91 + i*56
    if i == 0:
        body += rect(52, y-25, 420, 52, PALE, 10)
    body += icon(symbol, 68, y-16, 31, P) + text(120, y+10, label, 30, INK, 600 if i == 0 else 400)
save_svg('figura-32', 'Corrispondenza fra sistema e mondo reale',
         'Menu di una libreria con categorie comprensibili: musica, film, serie TV, podcast, audiolibri e applicazioni. Ricostruzione didattica.', 560, 480, body)

body = rect(84, 8, 344, 430, WHITE, 24, RULE)
body += rect(84, 8, 344, 66, P, 24) + text(106, 53, 'Posta in arrivo', 30, WHITE, 600)
for y, sender, subject in [(116, 'Team', 'Riunione di domani'), (208, 'Biblioteca', 'Prestito rinnovato'), (300, 'Segreteria', 'Nuovo messaggio')]:
    body += circle(117, y-6, 15, PALE) + text(150, y-1, sender, 27, INK, 600) + text(106, y+32, subject, 26, BODY)
body += rect(84, 354, 344, 84, GREEN_SOFT, 14)
body += text(104, 387, 'Archiviato', 27, GREEN_INK, 600) + text(104, 421, 'Annulla', 30, P, 700)
save_svg('figura-33', 'Controllo dell’utente e libertà',
         'Interfaccia di posta con conferma di archiviazione e comando Annulla ben visibile. Ricostruzione didattica.', 560, 480, body)

body = rect(12, 30, 500, 310, SOFT, 20)
body += icon('clip', 40, 52, 32, P) + text(88, 80, 'Allegato mancante', 32, P, 600)
body += lines(40, 130, ['Hai scritto «in allegato»,', 'ma non hai aggiunto file.', 'Vuoi inviare comunque?'], 29, BODY)
body += button(40, 254, 208, 'Aggiungi file', P, WHITE, 26)
body += button(264, 254, 220, 'Invia comunque', PALE, P, 25)
save_svg('figura-35', 'Prevenzione dell’errore',
         'Prima di inviare una mail che cita un allegato assente, il sistema avvisa e offre Aggiungi file oppure Invia comunque. Ricostruzione didattica.', 560, 390, body)

body = rect(16, 20, 250, 378, SOFT, 16)
for i, label in enumerate(['Nuovo', 'Apri…', 'Apri recenti', 'Chiudi', 'Salva']):
    y = 67+i*65
    if i == 2:
        body += rect(28, y-35, 225, 54, PALE, 8)
    body += text(42, y, label, 29, P if i == 2 else BODY, 600 if i == 2 else 400)
    if i == 2:
        body += path(f'M 232 {y-17} l 8 7 l -8 7', P, 2)
body += rect(278, 134, 232, 224, WHITE, 12, RULE)
body += lines(300, 181, ['Lezione 12', 'Progetto UX', 'Appunti', 'Relazione'], 28, BODY, leading=49)
save_svg('figura-36', 'Riconoscimento anziché ricordo',
         'Menu Apri recenti con documenti visibili da riconoscere, senza ricordarne il nome e digitarlo. Ricostruzione didattica.', 560, 450, body)

body = ''
for x, title in [(8, 'Link rapidi'), (182, 'Categorie'), (356, 'Visti di recente')]:
    body += rect(x, 32, 162, 270, SOFT, 14) + text(x+12, 72, title, 23, P, 700)
body += lines(20, 127, ['Quartieri', 'Scuole', 'Trasporti', 'Mappa'], 25, BODY, leading=47)
body += button(195, 103, 136, 'Scuole', PALE, P, 24, 47) + button(195, 164, 136, 'Quartieri', PALE, P, 22, 47)
body += button(195, 225, 136, 'Mappa', PALE, P, 24, 47)
body += lines(368, 127, ['Centro', 'Parco Nord', 'Scuole'], 25, BODY, leading=47)
save_svg('figura-37', 'Flessibilità ed efficienza',
         'Tre percorsi di accesso alle informazioni: link rapidi, categorie e contenuti visti di recente. Ricostruzione didattica.', 560, 350, body)

body = text(272, 106, 'Google', 70, P, 600, 'middle')
body += rect(30, 154, 482, 68, WHITE, 34, RULE) + icon('search', 52, 173, 31, BODY)
body += button(102, 258, 340, 'Cerca con Google', PALE, P, 28)
save_svg('figura-38', 'Estetica e progettazione minimalista',
         'Ricostruzione didattica della ricerca Google: nome, campo di ricerca e un’azione principale. Non è una schermata del servizio attuale.', 560, 350, body)

ERROR = '#b91c1c'
body = text(26, 42, 'Informazioni di contatto', 31, P, 600)
for y, label, value, message in [(92, 'Indirizzo email', 'test@email', 'Inserisci un indirizzo valido.'), (252, 'Telefono', '', 'Inserisci il numero di telefono.')]:
    body += text(26, y, label, 28, INK, 600) + rect(26, y+17, 478, 57, WHITE, 10, ERROR)
    if value:
        body += text(44, y+56, value, 28, INK)
    body += icon('warning', 26, y+91, 26, ERROR) + text(64, y+114, message, 25, ERROR)
body += button(26, 402, 478, 'Continua', P, WHITE, 29)
save_svg('figura-39', 'Riconoscimento e risoluzione degli errori',
         'Modulo con email incompleta e telefono assente. Ogni campo ha un messaggio specifico per correggere l’errore. Ricostruzione didattica.', 560, 500, body)


# NN/g relationships and role definitions are preserved, with a consistent set
# of line symbols and no red/yellow/blue circles from the historical deck.
roles = [
    ('facilitatore', 'Facilitatore', 'headset', ['Guida il partecipante', 'lungo il processo']),
    ('compiti', 'Compiti', 'tasks', ['Attività realistiche che il', 'partecipante potrebbe svolgere', 'nella vita reale']),
    ('partecipante', 'Partecipante', 'participant', ['Utente realistico del prodotto', 'o servizio in fase di studio']),
]
for id, title, symbol, definition in roles:
    body = circle(222, 112, 84, PALE) + icon(symbol, 170, 60, 104, P)
    body += text(222, 258, title, 39, P, 700, 'middle')
    body += lines(222, 311, definition, 29, BODY, anchor='middle', leading=39)
    save_svg('ruolo-'+id, title, title + ': ' + ' '.join(definition) + '. Schema rielaborato da Nielsen Norman Group.', 500, 440, body)

body = arrow('M 180 198 V 64 H 1020 V 198') + text(600, 43, 'Osserva e intervista', 29, P, 600, 'middle')
body += arrow('M 1020 205 V 132 H 180 V 205', GREEN_INK) + text(600, 116, 'Dà feedback', 29, GREEN_INK, 600, 'middle')
body += arrow('M 254 274 H 526') + text(390, 252, 'Amministra', 28, P, 600, 'middle')
body += arrow('M 946 274 H 674') + text(810, 252, 'Esegue', 28, P, 600, 'middle')
for x, (_, title, symbol, definition) in zip([180, 600, 1020], roles):
    body += circle(x, 274, 70, PALE) + icon(symbol, x-43, 231, 86, P)
    body += text(x, 393, title, 34, P, 700, 'middle')
    body += lines(x, 435, definition, 25, BODY, anchor='middle', leading=32)
save_svg('componenti-test', 'Le componenti di un test di usabilità',
         'Il facilitatore amministra i compiti e osserva e intervista il partecipante. Il partecipante esegue i compiti e dà feedback al facilitatore. Schema rielaborato da Nielsen Norman Group.',
         1200, 540, body, [
             {'from': 'facilitatore', 'to': 'compiti', 'label': 'Amministra'},
             {'from': 'partecipante', 'to': 'compiti', 'label': 'Esegue'},
             {'from': 'facilitatore', 'to': 'partecipante', 'label': 'Osserva e intervista'},
             {'from': 'partecipante', 'to': 'facilitatore', 'label': 'Dà feedback'},
         ])

generated = json.loads((OUTPUT / 'imagegen.json').read_text())
for item in generated['images']:
    id = item['id']
    original = ROOT / item['original']
    assert original.exists(), f'Copy the ImageGen original into the project: {original}'
    target = WEB / (id + '.webp')
    with Image.open(original) as image:
        image.save(target, lossless=True)
        size = list(image.size)
    old = by_id[id]
    entries.append({'id': id, 'sourcePage': old['sourcePage'], 'kind': 'imagegen',
                    'original': item['original'], 'originalSha256': sha(original),
                    'web': '/images/test-usabilita/ricostruite/' + target.name, 'sha256': sha(target),
                    'webSize': size, 'alt': old['alt'].replace('Tavola originale di confronto', 'Tavola ridisegnata di confronto'),
                    'rights': old['rights'], 'historicalOriginal': old['original'],
                    'promptRegistry': relative(OUTPUT / 'imagegen.json'), 'zoomClearanceRight': 56})

manifest = {'version': 1, 'lesson': 'test-usabilita', 'palette': 'ux-usability',
            'paletteSource': relative(TOKENS),
            'colors': {'primary': P, 'primarySoft': PALE, 'accent': GREEN, 'accentInk': GREEN_INK, 'accentSoft': GREEN_SOFT},
            'sourceManifest': relative(BASE / 'immagini.json'),
            'generator': relative(Path(__file__)),
            'fonts': [{'file': relative(FONT / f'cvedi-nunito-sans-{weight}.ttf'), 'sha256': sha(FONT / f'cvedi-nunito-sans-{weight}.ttf')} for weight in fonts],
            'preservedDocumentaryImages': ['figura-12', 'figura-30'],
            'images': sorted(entries, key=lambda item: item['sourcePage'])}
(OUTPUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'redrawn': len(entries), 'imagegen': 6, 'nativeSvg': 12, 'preservedPortraits': 2}))
