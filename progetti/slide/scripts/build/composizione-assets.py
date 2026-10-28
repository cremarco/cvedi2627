"""Publish preserved chapter-08 figures and native diagrams without changing originals.

Run from the repository root. Typst exports glyph outlines directly to SVG;
no booklet PDF is opened or generated. Editorial metadata comes from the current
chapter, while source manifests retain historical provenance.
"""
from pathlib import Path
import base64
import hashlib
import json
import os
import re
import shutil
import subprocess
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[4]
local_typst = ROOT / 'progetti/booklet/.venv/bin/typst'
TYPST = os.environ.get('BOOKLET_TYPST') or (str(local_typst) if local_typst.is_file() else shutil.which('typst'))
if not TYPST:
    raise RuntimeError('Typst compiler not available')
BASE = ROOT / 'progetti/slide/assets/booklet/lezione-composizione'
OUT = ROOT / 'risorse-condivise/immagini/figure/composizione-slidev'
SOURCE = 'progetti/booklet/capitoli/08-composizione-gerarchia.typ'
DIAGRAMS = ROOT / 'progetti/slide/assets/slide-materials/composizione'
chapter = (ROOT / SOURCE).read_text()
OUT.mkdir(parents=True, exist_ok=True)
DIAGRAMS.mkdir(parents=True, exist_ok=True)
records = {}
previous_manifest_file = BASE / 'image-manifest.json'
previous_images = json.loads(previous_manifest_file.read_text()).get('images', []) if previous_manifest_file.exists() else []


def sha(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def plain(text):
    return re.sub(r'\s+', ' ', re.sub(r'@comp\w+', '', text.replace('_', ''))).strip()


def register(code, source, caption, rights, alt, origin=SOURCE, filename=None):
    source = Path(source)
    target = OUT / (filename or (code + source.suffix))
    if source.resolve() != target.resolve():
        shutil.copyfile(source, target)
    records[code] = dict(code=code, source=str(source.relative_to(ROOT)),
        sourceSha256=sha(source), file=str(target.relative_to(ROOT)), sha256=sha(target),
        web='/images/shared/figure/composizione-slidev/' + target.name,
        caption=caption, rights=rights, alt=alt, metadataSource=origin)


for match in re.finditer(r'#image-figure\(path\("([^"]+)"\),\s*\[([^\]]*)\],(.*?)\n\)', chapter, re.S):
    file, caption, options = match.groups()
    ident = re.search(r'id:\s*"fig-comp-([^"]+)"', options)
    if not ident:
        continue
    code = ident[1]
    rights = re.search(r'rights:\s*\[([^\]]*)\]', options)
    alt = re.search(r'alt:\s*"([^"]*)"', options)
    register(code, ROOT / file.lstrip('/'), plain(caption), plain(rights[1]) if rights else '',
        alt[1] if alt else plain(caption))

# Current composed figures have caption, attribution and panel labels in the
# chapter. Their single-slide derivatives retain those authored relationships.
native = {
    'ibm-pittogrammi': ('stack(dir: ttb, spacing: 6pt, image(path("/risorse-condivise/immagini/figure/composizione/ibm-pittogrammi.svg"), width: 100%), grid(columns: (1fr, 1fr), align(center)[a], align(center)[b]))', 500,
        'IBM: a. un pittogramma usato come illustrazione; b. pittogrammi impiegati al posto di icone UI, uso sconsigliato dal sistema.',
        'IBM: pittogramma illustrativo e uso sconsigliato in una lista di controlli.'),
    'invito': ('invitation-comparison()', 500,
        'Lo stesso contenuto in tre composizioni simulate: a. informazioni con peso simile; b. titolo, data e luogo distinti; c. invito all’azione riconoscibile.',
        'Invito al laboratorio: elenco, relazioni e azione a confronto.'),
    'metafore': ('metaphor-comparison()', 400,
        'Una pausa caffè per ripartire: a. la batteria sostituisce la tazza; b. tazza e batteria sono fuse. Il riferimento all’energia è figurato.',
        'Batteria e tazza-batteria: sostituzione e fusione nel messaggio simulato.'),
    'salienza': ('visual-search()', 230,
        'Ricerca visiva in due campi simulati: a. un solo disco è diverso; b. più differenze competono. Non sono rappresentati tempi o risultati misurati.',
        'Un disco distinto e un campo con più segnali concorrenti.'),
    'priorita': ('grid(columns: (1fr, 1fr), gutter: 16pt, [*a · Enfasi concorrenti*#v(6pt)#appointment(competing: true)], [*b · Una priorità esplicita*#v(6pt)#appointment()])', 460,
        'Spostare una visita: a. tre azioni con identica enfasi; b. modifica, indicazioni e annullamento ricevono pesi differenti. Annulla resta leggibile e disponibile.',
        'Due versioni simulate di una visita: enfasi concorrenti e una priorità esplicita.'),
    'equilibrio': ('balance-comparison()', 250,
        'Due schemi simulati: a. dischi speculari; b. dimensioni e distanze differenti. L’asse permette di confrontare le posizioni e non misura il peso percettivo.',
        'Equilibrio simmetrico e asimmetrico a confronto.'),
}
for code, (expression, width, caption, alt) in native.items():
    entry = DIAGRAMS / (code + '.typ')
    entry.write_text('#import "/progetti/booklet/assets/diagrams/composition-examples.typ": *\n'
        f'#set page(width: {width}pt, height: auto, margin: 1pt)\n'
        '#set text(font: "DM Sans 9pt", size: 10pt, weight: 400, variations: (opsz: 18))\n'
        '#set par(justify: false, leading: 2pt, spacing: 7pt)\n#' + expression + '\n')
    target = OUT / (code + '.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
        'risorse-condivise/font/editoriali', str(entry), str(target)], check=True)
    register(code, target, caption, 'CVeDI, 2026. Diagramma simulato.', alt)
    if code == 'ibm-pittogrammi': records[code]['rights'] = '© IBM. Esempi della documentazione ufficiale.'
    records[code]['nativeSource'] = str(entry.relative_to(ROOT))
    records[code]['nativeSourceSha256'] = sha(entry)
    records[code]['inputs'] = [dict(file=str(p.relative_to(ROOT)), sha256=sha(p)) for p in [ROOT / 'progetti/booklet/assets/diagrams/composition-examples.typ', ROOT / 'risorse-condivise/font/editoriali/dm-sans-variabile.ttf', ROOT / 'risorse-condivise/font/editoriali/dm-sans-licenza.txt']]


def embedded(file, x, y, width, height):
    mime = 'image/svg+xml' if file.suffix == '.svg' else 'image/jpeg'
    data = base64.b64encode(file.read_bytes()).decode()
    return f'<image x="{x}" y="{y}" width="{width}" height="{height}" href="data:{mime};base64,{data}"/>'


def composite(code, body, width, height, caption, rights, alt, inputs):
    target = OUT / (code + '.svg')
    target.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">{body}</svg>')
    register(code, target, caption, rights, alt)
    records[code]['inputs'] = [dict(file=str(p.relative_to(ROOT)), sha256=sha(p)) for p in inputs]


# Reflow only the outer grid for the wide slide canvas. Inner geometry,
# colors, glyphs, panel labels and panel widths stay native and unchanged.
native_code = (ROOT / 'progetti/booklet/assets/diagrams/composition-examples.typ').read_text()
for code, function, next_marker, width in [
    ('equilibrio', 'balance-comparison', '#let appointment', 528),
    ('salienza', 'visual-search', '// Compare mirrored', 488),
]:
    start = native_code.index('#let ' + function + '(')
    definition = native_code[start:native_code.index(next_marker, start)].strip()
    definition = definition.replace('grid(columns: 1, row-gutter: 14pt,',
        'grid(columns: (1fr, 1fr), column-gutter: 30pt,', 1)
    entry = DIAGRAMS / (code + '.typ')
    entry.write_text('#import "/progetti/booklet/template/editorial.typ": panel-letter\n'
        '#import "/progetti/booklet/template/geometry.typ": ink\n'
        f'#set page(width: {width}pt, height: auto, margin: 1pt)\n'
        '#set text(font: "DM Sans 9pt", size: 10pt, weight: 400, variations: (opsz: 18))\n'
        '#set par(justify: false, leading: 2pt, spacing: 7pt)\n'
        + definition + '\n#' + function + '()\n')
    target = OUT / (code + '.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
        'risorse-condivise/font/editoriali', str(entry), str(target)], check=True)
    old = records[code].copy()
    register(code, target, old['caption'], old['rights'], old['alt'])
    records[code]['nativeSource'] = str(entry.relative_to(ROOT))
    records[code]['nativeSourceSha256'] = sha(entry)
    records[code]['inputs'] = old['inputs']

# One controlled variable: the vertical position of the complete place group.
# Every string, glyph size, color, action and panel dimension remains identical.
controlled = DIAGRAMS / 'invito-variazione.typ'
controlled.write_text("""#import "/progetti/booklet/assets/diagrams/composition-examples.typ": demo-panel, demo-action
#set page(width: 542pt, height: auto, margin: 1pt)
#set text(font: "DM Sans 9pt", size: 10pt, variations: (opsz: 18))
#set par(justify: false, leading: 2pt)
#let invitation(place-y) = demo-panel[
  #box(width: 100%, height: 202pt)[
    #place(top + left)[#text(size: 17pt, weight: 700)[Laboratorio#linebreak()di fotografia]]
    #place(top + left, dy: 50pt)[*Sabato 14 novembre*#linebreak()Dalle 10 alle 13]
    #place(top + left, dy: place-y)[Spazio Officina#linebreak()#text(size: 9pt)[Via del Parco 8]]
    #place(top + left, dy: 146pt)[#text(size: 9pt)[Iscrizione gratuita]]
    #place(top + left, dy: 172pt)[#demo-action([Iscriviti])]
  ]
]
#grid(columns: (1fr, 1fr), gutter: 20pt,
  [*a · Versione iniziale*#v(6pt)#invitation(83pt)],
  [*b · Gruppo del luogo spostato*#v(6pt)#invitation(106pt)])
""")
controlled_svg = OUT / 'invito-variazione.svg'
subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
    'risorse-condivise/font/editoriali', str(controlled), str(controlled_svg)], check=True)
register('invito-variazione', controlled_svg,
    'Confronto simulato: cambia soltanto la posizione verticale del gruppo del luogo. Testi, caratteri, colori, comando e dimensioni dei pannelli sono identici.',
    'CVeDI, 2026. Sviluppo didattico dell’invito del capitolo 08.',
    'Due inviti identici: nella seconda versione il gruppo Spazio Officina e indirizzo è spostato più in basso.')
records['invito-variazione']['origin'] = 'lesson-diagram'
records['invito-variazione']['nativeSource'] = str(controlled.relative_to(ROOT))
records['invito-variazione']['nativeSourceSha256'] = sha(controlled)
records['invito-variazione']['inputs'] = [dict(file=str(p.relative_to(ROOT)), sha256=sha(p)) for p in [ROOT / 'progetti/booklet/assets/diagrams/composition-examples.typ', ROOT / 'risorse-condivise/font/editoriali/dm-sans-variabile.ttf']]
takete = ROOT / 'progetti/booklet/assets/takete-maluma/takete.svg'
maluma = ROOT / 'progetti/booklet/assets/takete-maluma/maluma.svg'
composite('takete', embedded(takete, 0, 0, 480, 350) + embedded(maluma, 520, 0, 480, 350), 1000, 350,
    'A sinistra Takete, a destra Maluma: profili spigolosi e curvilinei a confronto.',
    'Da Shinohara et al. (2016), fig. 1a, su disegni di Wolfgang Köhler. CC BY 4.0; colore e disposizione adattati.',
    'Takete angoloso a sinistra; Maluma curvilineo a destra.', [takete, maluma])
up1 = ROOT / 'risorse-condivise/immagini/figure/composizione/up-1.jpg'
up2 = ROOT / 'risorse-condivise/immagini/figure/composizione/up-2.jpg'
# Original source coordinates from the current chapter; no bitmap is rewritten.
body = embedded(up1, 0, 0, 797, 411) + embedded(up2, 837, 0, 797, 411)
body += ''.join(f'<circle cx="{837+x+d/2}" cy="{y+d/2}" r="{d/2}" fill="none" stroke="white" stroke-width="2"/>' for x,y,d in [(259,113,184),(300,176,28),(355,176,28)])
composite('up', body, 1634, 411,
    'Carl Fredricksen e Russell in Up (2009). I rettangoli su Carl e i cerchi su Russell evidenziano la costruzione dei profili.',
    '© Disney / Pixar.', 'Profili di Carl e Russell, con rettangoli e cerchi come nel capitolo corrente.', [up1, up2])
natural = [ROOT / f'progetti/booklet/assets/forme-naturali-scontornate/immagini/{n}.png' for n in ['foglia','fiore','conchiglia']]
body = ''
for i,p in enumerate(natural):
    data=base64.b64encode(p.read_bytes()).decode()
    body += f'<image x="{i*340}" width="300" height="320" href="data:image/png;base64,{data}"/>'
composite('natura', body, 1000, 320, 'Venature di una foglia, petali di un fiore e spirale di una conchiglia.',
    'CVeDI, 2026.', 'Foglia, fiore e conchiglia interi, su fondo trasparente.', natural)
# Compare one complete proposal and its uniformly blurred copy at equal scale.
entry=DIAGRAMS/'invito-azione.typ'
entry.write_text('#import "/progetti/booklet/assets/diagrams/composition-examples.typ": *\n#set page(width: 220pt, height: auto, margin: 1pt)\n#set text(font: "DM Sans 9pt", size: 10pt, variations: (opsz: 18))\n#set par(justify: false, leading: 2pt, spacing: 7pt)\n#workshop-invitation(2)\n')
invito=OUT/'invito-azione.svg'
subprocess.run([TYPST,'compile','--ignore-system-fonts','--root',str(ROOT),'--font-path','risorse-condivise/font/editoriali',str(entry),str(invito)],check=True)
body='<defs><filter id="sfocatura"><feGaussianBlur stdDeviation="3"/></filter></defs>'
view = [float(value) for value in ET.fromstring(invito.read_text()).attrib['viewBox'].split()]
scaled_height = 480 * view[3] / view[2]
body+=embedded(invito,0,0,480,scaled_height)
body+='<g filter="url(#sfocatura)">'+embedded(invito,540,0,480,scaled_height)+'</g>'
composite('squint',body,1020,scaled_height,'A sinistra una proposta dell’invito originale; a destra la stessa composizione con sfocatura uniforme. Stessa scala: il confronto riguarda masse e contrasti, non comprensione o percorso degli occhi.',
    'CVeDI, 2026. Diagramma simulato.', 'Una proposta dell’invito e la copia sfocata alla stessa scala, affiancate.',[invito])
BASE.mkdir(parents=True,exist_ok=True)
# Lesson-specific corrections keep the chapter and acquired originals intact.
overrides_file = BASE / 'figure-overrides.json'
if overrides_file.exists():
    overrides = json.loads(overrides_file.read_text())
    if overrides.get('version') != 1 or overrides.get('lesson') != 'composizione-gerarchia':
        raise ValueError('Invalid composition figure overrides')
    for correction in overrides['figures']:
        code = correction['code']
        previous = records[code].copy()
        source = ROOT / correction['source']
        native_source = ROOT / correction['nativeSource']
        subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
            'risorse-condivise/font/editoriali', str(native_source), str(source)], check=True)
        register(code, source, correction['caption'], correction['rights'], correction['alt'],
            origin=str(overrides_file.relative_to(ROOT)))
        records[code]['origin'] = 'lesson-correction'
        records[code]['slideAlias'] = correction['slideAlias']
        records[code]['preservedOriginal'] = previous
        records[code]['nativeSource'] = str(native_source.relative_to(ROOT))
        records[code]['nativeSourceSha256'] = sha(native_source)
        records[code]['inputs'] = [dict(file=file, sha256=sha(ROOT / file)) for file in correction['inputs']]
# Original lesson examples have their own provenance, separate from the chapter.
lesson_figures_file = BASE / 'lesson-figures.json'
if lesson_figures_file.exists():
    lesson_figures = json.loads(lesson_figures_file.read_text())
    if lesson_figures.get('version') != 1 or lesson_figures.get('lesson') != 'composizione-gerarchia':
        raise ValueError('Invalid composition lesson figures')
    for figure in lesson_figures['images']:
        code = figure['code']
        if code in records:
            raise ValueError('Lesson figure would replace a chapter figure: ' + code)
        register(code, ROOT / figure['source'], figure['caption'], figure['rights'], figure['alt'],
            origin=str(lesson_figures_file.relative_to(ROOT)),
            filename=code + '-' + sha(ROOT / figure['source'])[:12] + Path(figure['source']).suffix)
        records[code]['origin'] = figure['origin']
        records[code]['slideAlias'] = figure['slideAlias']
        records[code]['inputs'] = [dict(file=file, sha256=sha(ROOT / file)) for file in figure['inputs']]
bibliography = 'progetti/booklet/bibliografia/08-composizione-gerarchia.yml'
references = json.loads(subprocess.run([TYPST, 'eval', '--root', str(ROOT), f'yaml("{bibliography}")'], cwd=ROOT, check=True, capture_output=True, text=True).stdout)
(BASE/'references.json').write_text(json.dumps(dict(source=bibliography, sourceSha256=sha(ROOT/bibliography), publications=references), ensure_ascii=False, indent=2)+'\n')
# Publish only active figures and their required intermediate inputs.
plan = json.loads((BASE / 'content-plan.json').read_text())
active_codes = {code for slide in plan['slides'] for code in slide['figures']}
active = [image for code, image in records.items() if code in active_codes]
required = {ROOT / image['source'] for image in active}
required.update(ROOT / entry['file'] for image in active for entry in image.get('inputs', []))
retained = required | {ROOT / image['file'] for image in active}
for previous in previous_images:
    target = ROOT / previous['file']
    if target.parent == OUT and target not in retained and previous['file'] != previous['source']:
        target.unlink(missing_ok=True)
archived = []
for code, image in records.items():
    if code not in active_codes:
        target = ROOT / image['file']
        if target not in required and image['file'] != image['source']:
            target.unlink(missing_ok=True)
        archived.append(dict(image, fileRemoved=not target.exists()))
for image in active:
    previous = image.get('preservedOriginal')
    if previous and previous['file'] != previous['source']:
        target = ROOT / previous['file']
        if target not in required:
            target.unlink(missing_ok=True)
            previous['fileRemoved'] = True
(BASE/'image-manifest.json').write_text(json.dumps(dict(version=1, sourceFile=SOURCE,
    images=active, archivedImages=archived, materials=[]), ensure_ascii=False, indent=2)+'\n')
print(f'Composition: {len(active)} active figures prepared; {len(archived)} inactive web copies excluded.')
