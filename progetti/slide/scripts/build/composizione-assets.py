"""Publish preserved chapter-08 figures and native diagrams without changing originals.

Run from the repository root. Typst exports glyph outlines directly to SVG;
no booklet PDF is opened or generated. Editorial metadata comes from the current
chapter, while source manifests retain historical provenance.
"""
from pathlib import Path
import base64
import hashlib
import json
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[4]
BASE = ROOT / 'progetti/slide/assets/booklet/lezione-composizione'
OUT = ROOT / 'risorse-condivise/immagini/figure/composizione-slidev'
SOURCE = 'progetti/booklet/capitoli/08-composizione-gerarchia.typ'
DIAGRAMS = ROOT / 'progetti/slide/assets/slide-materials/composizione'
chapter = (ROOT / SOURCE).read_text()
OUT.mkdir(parents=True, exist_ok=True)
DIAGRAMS.mkdir(parents=True, exist_ok=True)
records = {}


def sha(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def plain(text):
    return re.sub(r'\s+', ' ', re.sub(r'@comp\w+', '', text.replace('_', ''))).strip()


def register(code, source, caption, rights, alt, origin=SOURCE):
    source = Path(source)
    target = OUT / (code + source.suffix)
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
    subprocess.run(['typst', 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
        str(ROOT / 'risorse-condivise/font/editoriali'), str(entry), str(target)], check=True)
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
subprocess.run(['typst','compile','--ignore-system-fonts','--root',str(ROOT),'--font-path',str(ROOT/'risorse-condivise/font/editoriali'),str(entry),str(invito)],check=True)
body='<defs><filter id="sfocatura"><feGaussianBlur stdDeviation="3"/></filter></defs>'
body+=embedded(invito,0,0,480,600)
body+='<g filter="url(#sfocatura)">'+embedded(invito,540,0,480,600)+'</g>'
composite('squint',body,1020,600,'A sinistra una proposta dell’invito originale; a destra la stessa composizione con sfocatura uniforme. Stessa scala: il confronto riguarda masse e contrasti, non comprensione o percorso degli occhi.',
    'CVeDI, 2026. Diagramma simulato.', 'Una proposta dell’invito e la copia sfocata alla stessa scala, affiancate.',[invito])
BASE.mkdir(parents=True,exist_ok=True)
(BASE/'image-manifest.json').write_text(json.dumps(dict(version=1,sourceFile=SOURCE,images=list(records.values())),ensure_ascii=False,indent=2)+'\n')
print(f'Composition: {len(records)} source and native figures prepared.')
