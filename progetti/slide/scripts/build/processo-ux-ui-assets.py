"""Export chapter-09 visuals to SVG and preserve documentary originals.

No booklet PDF is compiled or opened. Slide-only sources and derivatives live
with the lesson; captions and provenance are stored separately from the deck.
"""
from pathlib import Path
import hashlib
import json
import os
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[4]
BASE = ROOT / 'progetti/slide/assets/booklet/lezione-processo-ux-ui'
ASSETS = ROOT / 'progetti/slide/assets/slide-materials/processo-ux-ui'
PUBLIC = ROOT / 'progetti/slide/public/images/processo-ux-ui'
SOURCE = 'progetti/booklet/capitoli/09-processo-ux-ui.typ'
DIAGRAMS = 'progetti/booklet/assets/diagrams/ux-process-examples.typ'
local = ROOT / 'progetti/booklet/.venv/bin/typst'
TYPST = os.environ.get('BOOKLET_TYPST') or (str(local) if local.is_file() else shutil.which('typst'))
if not TYPST:
    raise RuntimeError('Typst compiler not available')
for folder in (BASE, ASSETS, PUBLIC):
    folder.mkdir(parents=True, exist_ok=True)


def sha(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


images = []
chapter = (ROOT / SOURCE).read_text()
overrides = json.loads((BASE / 'figure-overrides.json').read_text())['figures']


def clean(value):
    return re.sub(r'\s+', ' ', re.sub(r'@ux\w+', '', value.replace('_', ''))).strip()


def register(code, file, caption, rights, alt, use_overrides=True, **extra):
    if use_overrides and code in overrides:
        extra['sourceCaption'] = caption
        extra['sourceAlt'] = alt
        caption = overrides[code].get('caption', caption)
        alt = overrides[code].get('alt', alt)
    target = PUBLIC / (code + file.suffix)
    shutil.copyfile(file, target)
    images.append(dict(code=code, source=str(file.relative_to(ROOT)), sourceSha256=sha(file),
                       web='/images/processo-ux-ui/' + target.name, sha256=sha(target),
                       caption=caption, rights=rights, alt=alt, **extra))


functions = {
    'process-map': ('processo', 500), 'brief-record': ('brief', 470),
    'objective-record': ('obiettivi', 440), 'evidence-record': ('evidenze', 470),
    'viola-profile': ('viola', 470), 'journey-example': ('journey', 520),
    'flow-example': ('flow', 470), 'requirements-record': ('requisiti', 450),
    'sitemap-example': ('sitemap', 500), 'wireframe-progression': ('wireframe-ui', 500),
    'prototype-states': ('stati', 500), 'test-plan': ('test', 470),
    'iteration-record': ('iterazione', 500), 'learning-loop': ('ciclo', 500),
}
for function, (code, width) in functions.items():
    call = re.search(r'#figure\(' + re.escape(function) + r'\(\).*?caption-content\(\[([^\]]+)\]', chapter, re.S)
    if not call:
        raise RuntimeError('Chapter caption missing: ' + function)
    caption = clean(call[1])
    entry = ASSETS / (code + '.typ')
    entry.write_text(f'#import "/{DIAGRAMS}": *\n'
                     f'#set page(width: {width}pt, height: auto, margin: (top: 1pt, bottom: 8pt, x: 1pt))\n'
                     '#set text(font: "DM Sans 9pt", size: 10pt, weight: 400)\n'
                     f'#{function}()\n')
    target = ASSETS / (code + '.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT),
                    '--font-path', 'risorse-condivise/font/editoriali', str(entry), str(target)], check=True)
    register(code, target, caption, 'CVeDI, 2026. Esempio didattico simulato.', caption,
             metadataSource=SOURCE, nativeSource=str(entry.relative_to(ROOT)),
             inputs=[dict(file=p, sha256=sha(ROOT / p)) for p in [DIAGRAMS,
                     'risorse-condivise/font/editoriali/dm-sans-variabile.ttf',
                     'risorse-condivise/font/editoriali/dm-sans-licenza.txt']])

# These are the unaltered embedded images recovered for the current chapter.
for code, file, rights, caption, alt, page in [
    ('persona', 'persona-corunga.png', 'Iulian Corunga.',
     'Claudia deve acquistare biglietti ferroviari per gruppi. La scheda collega compiti, bisogni e frustrazioni; la grafica non dimostra il metodo di ricerca.',
     'Scheda persona di Claudia con fotografia, aspirazioni, compiti, bisogni e frustrazioni in inglese.', 74),
    ('wireframe-carta', 'originali/wireframe-carta.jpg', 'Jolanda Dekker, 2019.',
     'Analisi della funzione preferiti di NS: schermate abbozzate e azioni collegate. È una ricostruzione analitica di un’app esistente.',
     'Wireframe a mano della funzione preferiti NS, con schermate e frecce per cercare, nominare e salvare.', 81),
]:
    register(code, ROOT / 'progetti/booklet/assets/processo-ux-ui' / file, caption, rights, alt,
             metadataSource=SOURCE, preparatorySource='materiali/booklet precedente/Booklet_CVDI_12_2024.pdf', physicalPage=page)

# Same crop as the current chapter; the complete original remains untouched.
original = ROOT / 'progetti/booklet/assets/processo-ux-ui/originali/wireframe-mockup.png'
shutil.copyfile(original, ASSETS / 'wireframe-mockup-originale.png')
entry = ASSETS / 'mockup.typ'
entry.write_text('#import "/progetti/booklet/template/figures.typ": image-crop\n'
                 '#set page(width: 500pt, height: auto, margin: 0pt)\n'
                 '#image-crop("/progetti/booklet/assets/processo-ux-ui/originali/wireframe-mockup.png", '
                 'width: 500pt, height: 101pt, source-width: 500pt, source-height: 500pt * 1590 / 1726)\n')
target = ASSETS / 'mockup.svg'
subprocess.run([TYPST, 'compile', '--root', str(ROOT), str(entry), str(target)], check=True)
register('mockup', target, 'WCC Properties: dettaglio superiore del wireframe e della proposta UI. Struttura riconoscibile, fotografia e gerarchia visiva a confronto.',
         'JH Specialty; Evan Sauers, 2022.', 'Testata WCC Properties in wireframe e mockup, con titolo, immagine e comando.',
         metadataSource=SOURCE, crop='Top 101/460.6 pt of the full image, matching the chapter header detail; no raster edits.',
         inputs=[dict(file=str(original.relative_to(ROOT)), sha256=sha(original))])

# Editable slide-specific diagrams supplement the preserved chapter figures.
for code, expression, caption in [
    ('confronto-alternative', '''grid(columns: (110pt, 1fr, 1fr, 1fr), gutter: 10pt,
      [*Stesso compito*], [*Telefono*], [*Sito dello studio*], [*Piattaforma*],
      [Orario serale?], [Da chiedere.], [Da cercare.], [Da filtrare.],
      [Visita a domicilio?], [Da concordare.], [Da verificare.], [Zona da controllare.],
      [Costo totale?], [Preventivo.], [Tariffario.], [Riepilogo.])''',
     'Griglia di confronto simulata: le celle sono domande e ipotesi da verificare seguendo lo stesso compito in ogni alternativa.'),
    ('fedelta', '''grid(columns: (1fr, 1fr), gutter: 18pt,
      panel([Fedeltà visiva], [Quanto sono definiti testi, immagini, tipografia e componenti?]),
      panel([Fedeltà del comportamento], [Quali azioni, risposte e rami della prova funzionano?]),
      panel([Mockup statico], [Può essere molto rifinito senza permettere una sequenza.], fill: white),
      panel([Prototipo su carta], [Può simulare un compito completo con segni essenziali.], fill: white))''',
     'Aspetto e comportamento sono dimensioni distinte. La domanda della prova orienta il dettaglio necessario.'),
]:
    entry = ASSETS / (code + '.typ')
    entry.write_text(f'#import "/{DIAGRAMS}": graphic, panel\n'
                     '#set page(width: 500pt, height: auto, margin: 1pt)\n'
                     '#graphic[' + '\n#' + expression + '\n]\n')
    target = ASSETS / (code + '.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
                    'risorse-condivise/font/editoriali', str(entry), str(target)], check=True)
    register(code, target, caption, 'CVeDI, 2026. Diagramma didattico.', caption,
             nativeSource=str(entry.relative_to(ROOT)), metadataSource=SOURCE)

# Operational records extend the chapter with editable lesson-only examples.
for code, function, caption, alt in [
    ('responsabilita', 'responsibilities',
     'Mappa simulata delle responsabilità: ogni vincolo del servizio ha un interlocutore e una conseguenza sull’interfaccia.',
     'Tabella di zona coperta, disponibilità e annullamento, con responsabili e conseguenze sul prodotto.'),
    ('ipotesi', 'hypothesis-record',
     'Un problema, una proposta, un cambiamento atteso e una possibile smentita: quattro parti di un’ipotesi da provare.',
     'Ipotesi simulata sugli orari serali, con un esito alternativo legato alla copertura del domicilio.'),
    ('journey-responsabilita', 'journey-responsibilities',
     'Il percorso di Viola collega ciò che appare sullo schermo alle attività necessarie prima, durante e dopo la prenotazione.',
     'Tre momenti del servizio con bisogno di Viola, risposta dell’interfaccia e attività organizzativa corrispondente.'),
    ('accettazione', 'acceptance-example',
     'Una user story e un esempio di accettazione del riepilogo. Il criterio precisa un comportamento da verificare.',
     'User story della visita serale, con condizione iniziale, azione e risultato atteso del riepilogo.'),
    ('registro-prova', 'observation-log',
     'Registro di un episodio simulato: contesto, comportamento, parole, facilitazione, interpretazione e prossima prova restano separati.',
     'Scheda di osservazione di una persona che torna alla ricerca perché non riconosce se la visita è a domicilio.'),
    ('priorita-problemi', 'problem-priorities',
     'Tre episodi simulati con conseguenze diverse. La priorità richiede un giudizio motivato, oltre al conteggio delle occorrenze.',
     'Confronto fra compito bloccato, costo poco chiaro e difficoltà recuperata autonomamente.'),
    ('consegna-stato', 'handoff-record',
     'Scheda di consegna dello stato di indisponibilità: messaggio, dati conservati, criterio di accettazione e dipendenza dal servizio.',
     'Specifiche simulate per un orario perso prima della conferma, con recupero e responsabilità ancora da chiarire.'),
]:
    entry = ASSETS / (code + '.typ')
    entry.write_text('#import "/progetti/slide/assets/slide-materials/processo-ux-ui/approfondimenti.typ": *\n'
                     '#set page(width: 500pt, height: auto, margin: (top: 1pt, bottom: 20pt, x: 1pt))\n'
                     f'#{function}()\n')
    target = ASSETS / (code + '.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
                    'risorse-condivise/font/editoriali', str(entry), str(target)], check=True)
    register(code, target, caption, 'CVeDI, 2026. Esempio didattico simulato.', alt,
             nativeSource=str(entry.relative_to(ROOT)),
             inputs=[dict(file=p, sha256=sha(ROOT / p)) for p in [
                 'progetti/slide/assets/slide-materials/processo-ux-ui/approfondimenti.typ', DIAGRAMS]])

# Comparisons connect the current process to the earlier lessons' visual methods.
comparison_source = 'progetti/slide/assets/slide-materials/processo-ux-ui/confronti.typ'
for code, function, caption, alt in [
    ('confronto-mappe', 'maps-comparison',
     'Momenti del servizio, sequenza di azioni e struttura dei contenuti a confronto.',
     'Journey con prima, durante e dopo; flow con disponibilità e rami sì e no; sitemap con Il servizio, Trova una visita e Le mie visite.'),
    ('ui-annotata', 'ui-annotated',
     'Disponibilità e richiesta sono stati diversi. Le scelte visive sostengono la comprensione del compito.',
     'Schermata simulata di una visita a domicilio alle 20:30 con azione Invia richiesta e nota che distingue l’invio dalla conferma; spiegazioni dei tre gruppi di scelte visive.'),
]:
    entry = ASSETS / (code + '.typ')
    entry.write_text(f'#import "/{comparison_source}": *\n'
                     '#set page(width: 500pt, height: auto, margin: 1pt, fill: none)\n'
                     f'#{function}()\n')
    target = ASSETS / (code + '.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT), '--font-path',
                    'risorse-condivise/font/editoriali', str(entry), str(target)], check=True)
    register(code, target, caption, 'CVeDI, 2026. Esempio didattico simulato.', alt,
             nativeSource=str(entry.relative_to(ROOT)),
             inputs=[dict(file=comparison_source, sha256=sha(ROOT / comparison_source))])

# Generated editorial illustrations keep their original PNGs and prompt receipts.
illustrations = json.loads((ROOT / 'progetti/slide/assets/theme-imagegen/lesson-11-process/manifest.json').read_text())
for image in illustrations['images']:
    register(image['code'], ROOT / image['derivative'], image['caption'], image['displayRights'], image['alt'],
             original=image['original'], originalSha256=image['originalSha256'],
             prompt=image['prompt'], promptSha256=image['promptSha256'],
             generationTool=image['generationTool'], transparentBackground=image['transparentBackground'])

# Three portraits introduce the people in the lesson's cumulative case.
cast = json.loads((ROOT / 'progetti/slide/assets/theme-imagegen/lesson-11-cast/manifest.json').read_text())
for image in cast['images']:
    register(image['code'], ROOT / image['derivative'], image['caption'], image['displayRights'], image['alt'],
             original=image['original'], originalSha256=image['originalSha256'],
             prompt=image['prompt'], promptSha256=image['promptSha256'],
             generationTool=image['generationTool'], transparentBackground=image['transparentBackground'])

# The participant slide reveals a realistic version of the existing Viola portrait.
viola_transition = json.loads((ROOT / 'progetti/slide/assets/theme-imagegen/lesson-11-viola-transition/manifest.json').read_text())
for image in viola_transition['images']:
    register(image['code'], ROOT / image['derivative'], image['caption'], image['rights'], image['alt'],
             original=image['original'], originalSha256=image['originalSha256'],
             prompt=image['prompt'], promptSha256=image['promptSha256'],
             generationTool=image['generationTool'], transparentBackground=image['transparentBackground'])

# A mnemonic infographic introduces the SMART sequence.
smart_infographic = json.loads((ROOT / 'progetti/slide/assets/theme-imagegen/lesson-11-smart/manifest.json').read_text())
for image in smart_infographic['images']:
    register(image['code'], ROOT / image['derivative'], image['caption'], image['rights'], image['alt'],
             original=image['original'], originalSha256=image['originalSha256'],
             prompt=image['prompt'], promptSha256=image['promptSha256'],
             generationTool=image['generationTool'], transparentBackground=image['transparentBackground'])

# The prototype reuses the final site's exact professional portraits.
for person in ['giulia-riva', 'luca-sala']:
    shutil.copyfile(ROOT / f'progetti/fisioterapia/assets/images/{person}.webp', PUBLIC / f'passo-{person}.webp')

# The same eight Passo screens progress through hand sketches, mid and high fidelity.
wireframes = json.loads((ROOT / 'progetti/slide/assets/theme-imagegen/lesson-11-wireframes/manifest.json').read_text())
for image in wireframes['images']:
    register(image['code'], ROOT / image['derivative'], image['caption'], image['rights'], image['alt'],
             original=image['original'], originalSha256=image['originalSha256'],
             prompt=image['prompt'], promptSha256=image['promptSha256'],
             generationTool=image['generationTool'], transparentBackground=image['transparentBackground'],
             wireframeLevel=image['level'], wireframePair=image['pair'], references=image['references'])

# Decorative map artwork keeps a separate provenance register from lesson figures.
map_artwork = json.loads((ROOT / 'progetti/slide/assets/theme-imagegen/lesson-11-map/manifest.json').read_text())
for image in map_artwork['images']:
    shutil.copyfile(ROOT / image['source'], PUBLIC / Path(image['web']).name)

# Reconstruct the dense chapter diagrams for projection, preserving each original.
reconstruction = 'progetti/slide/assets/slide-materials/processo-ux-ui/ricostruite'
diagram_source = reconstruction + '/diagrammi.typ'
font_manifest = json.loads((ROOT / reconstruction / 'font/manifest.json').read_text())
captions = {
    'processo': 'Quattordici attività in cinque nuclei; ogni verifica può riaprire una decisione.',
    'brief': 'La richiesta iniziale si traduce in domande sul servizio e sulle ipotesi.',
    'obiettivi': 'Da un obiettivo generico a una domanda osservabile nel prossimo ciclo.',
    'evidenze': 'Osservazione, interpretazione, decisione e nuova domanda restano distinte.',
    'viola': 'Orario, domicilio e informazioni necessarie orientano le scelte per Viola.',
    'journey': 'La journey distingue azioni, contatti, domande e opportunità da verificare.',
    'flow': 'Il compito comprende scelta, riepilogo e ritorni per correggere o cercare ancora.',
    'requisiti': 'Un bisogno diventa requisito, condizione e criterio da verificare.',
    'sitemap': 'La struttura raggruppa contenuti e funzioni; il flow descrive azioni e condizioni.',
    'wireframe-ui': 'Lo stesso esempio passa dalle aree ai contenuti e alla proposta di UI.',
    'stati': 'Scelta, recupero ed esito comunicano condizioni differenti del percorso.',
    'test': 'La domanda orienta partecipante, compito, osservazioni e facilitazione.',
    'iterazione': 'Ogni revisione conserva il collegamento con l’episodio osservato.',
    'ciclo': 'Ipotesi, prova e apprendimento preparano la decisione successiva.',
    'confronto-alternative': 'Le stesse domande rendono confrontabili alternative diverse.',
    'fedelta': 'Aspetto e comportamento sono dimensioni distinte della fedeltà.',
    'responsabilita': 'Ogni vincolo del servizio ha un responsabile e una conseguenza sul prodotto.',
    'ipotesi': 'Un’ipotesi collega problema, proposta, effetto atteso e possibile smentita.',
    'journey-responsabilita': 'Il percorso di Viola richiede risposte dell’interfaccia e attività del servizio.',
    'accettazione': 'La user story è accompagnata da condizione, azione ed esito osservabile.',
    'registro-prova': 'Un episodio conserva fatti, parole, facilitazione e interpretazione separati.',
    'priorita-problemi': 'Le priorità dipendono dalle conseguenze e dalle possibilità di recupero.',
    'consegna-stato': 'Uno stato collega messaggio, dati conservati, criterio e responsabilità.',
    'confronto-mappe': 'Momenti del servizio, azioni e struttura dei contenuti sono rappresentazioni diverse.',
    'ui-annotata': 'Griglia, tipografia, colore e stati rendono comprensibili disponibilità e richiesta.',
}
for image in images:
    code = image['code']
    if code not in captions:
        continue
    original = dict(source=image['source'], sha256=image['sourceSha256'],
                    caption=image['caption'], alt=image['alt'])
    entry = ROOT / reconstruction / (code + '.typ')
    entry.write_text(f'#import "/{diagram_source}": *\n'
                     '#set page(width: 842pt, height: auto, margin: (left: 1pt, right: 41pt, y: 1pt), fill: none)\n'
                     f'#{code}()\n')
    target = entry.with_suffix('.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT),
                    '--font-path', reconstruction + '/font', str(entry), str(target)], check=True, cwd=ROOT)
    svg = target.read_text().replace('<svg ', '<svg data-cvedi-body-size="15.5" data-cvedi-note-size="14" ', 1)
    target.write_text(svg)
    public = PUBLIC / (code + '.svg')
    shutil.copyfile(target, public)
    image.update(source=str(target.relative_to(ROOT)), sourceSha256=sha(target),
                 sha256=sha(public), caption=captions[code],
                 reconstruction=dict(original=original, nativeSource=str(entry.relative_to(ROOT)),
                     renderer=diagram_source, rendererSha256=sha(ROOT / diagram_source),
                     bodySize=15.5, noteSize=14, canvasWidth=842, zoomClearance=40,
                     fontManifest=reconstruction + '/font/manifest.json',
                     palette='violet/Cedro', background='transparent'))

# The cumulative case has its own editable originals, not reconstructed chapter figures.
case_diagrams = {
    'caso-wireframe-v0': ('V0: ricerca, lista e riepilogo della prima bozza.', 'Tre schermate del wireframe V0 con i punti deboli della compatibilità e del costo.'),
    'caso-iterazione-v1': ('V0 → V1: anticipare domicilio, fascia serale e totale.', 'Confronto della prima revisione, con criteri di compatibilità prima dei risultati.'),
    'caso-iterazione-v2': ('V1 → V2: richiesta, attesa e conferma del professionista.', 'Sequenza che distingue invio della richiesta, attesa e accettazione del professionista.'),
    'caso-iterazione-v3': ('V2 → V3: uno slot perso conserva i dati validi.', 'Recupero dalla perdita dello slot delle 20:30 verso una proposta alle 21:15.'),
    'caso-servizio-finale': ('Il servizio V3 collega percorso di Viola, interfaccia, professionista e gestore.', 'Blueprint del servizio finale dal cercare una visita alla gestione della conferma.'),
    'caso-sistema-ui': ('Griglia, tipografia, colore e stati danno forma alle decisioni del servizio.', 'Sistema visivo V2 con gerarchie tipografiche, relazioni, azioni e stati scritti.'),
}
for code, (caption, alt) in case_diagrams.items():
    entry = ROOT / reconstruction / (code + '.typ')
    entry.write_text(f'#import "/{diagram_source}": *\n'
                     '#set page(width: 842pt, height: auto, margin: (left: 1pt, right: 41pt, y: 1pt), fill: none)\n'
                     f'#{code}()\n')
    target = entry.with_suffix('.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT),
                    '--font-path', reconstruction + '/font', str(entry), str(target)], check=True, cwd=ROOT)
    target.write_text(target.read_text().replace('<svg ', '<svg data-cvedi-body-size="15.5" data-cvedi-note-size="14" ', 1))
    public = PUBLIC / (code + '.svg')
    shutil.copyfile(target, public)
    images.append(dict(code=code, source=str(target.relative_to(ROOT)), sourceSha256=sha(target),
        web='/images/processo-ux-ui/' + code + '.svg', sha256=sha(public), caption=caption,
        rights='CVeDI, 2026. Esempio didattico simulato.', alt=alt,
        nativeDiagram=dict(nativeSource=str(entry.relative_to(ROOT)), renderer=diagram_source,
            rendererSha256=sha(ROOT / diagram_source), bodySize=15.5, noteSize=14,
            canvasWidth=842, zoomClearance=40, fontManifest=reconstruction + '/font/manifest.json',
            palette='violet/Cedro', background='transparent')))

# SMART examples share the existing diagram system and keep their content in JSON.
smart_file = 'progetti/slide/data/ux-smart.json'
smart = json.loads((ROOT / smart_file).read_text())
smart_renderer = reconstruction + '/smart.typ'
for item in [*smart['criteria'], smart['summary']]:
    code = item['code']
    entry = ROOT / reconstruction / (code + '.typ')
    expression = f'smart-example("{item["letter"]}")' if 'letter' in item else 'smart-summary()'
    entry.write_text(f'#import "/{smart_renderer}": *\n'
                     '#set page(width: 842pt, height: auto, margin: (left: 1pt, right: 41pt, y: 1pt), fill: none)\n'
                     f'#{expression}\n')
    target = entry.with_suffix('.svg')
    subprocess.run([TYPST, 'compile', '--ignore-system-fonts', '--root', str(ROOT),
                    '--font-path', reconstruction + '/font', str(entry), str(target)], check=True, cwd=ROOT)
    target.write_text(target.read_text().replace('<svg ', '<svg data-cvedi-body-size="15.5" data-cvedi-note-size="14" ', 1))
    register(code, target, item['caption'], 'CVeDI, 2026. Diagramma didattico.', item['alt'],
        smartCriterion=item.get('letter', 'summary'),
        inputs=[dict(file=file, sha256=sha(ROOT / file)) for file in [smart_file, diagram_source]],
        nativeDiagram=dict(nativeSource=str(entry.relative_to(ROOT)), renderer=smart_renderer,
            rendererSha256=sha(ROOT / smart_renderer), bodySize=15.5, noteSize=14,
            canvasWidth=842, zoomClearance=40, fontManifest=reconstruction + '/font/manifest.json',
            palette='violet/Cedro', background='transparent'))

# Three transparent vector motifs follow the shared illustrated objective cards.
# Violet and Cedro match the lesson's roles; these are original editable drawings.
motifs = {
    'domande': '<path fill="#ddd6fe" d="M24 18h50v70H24z"/><path fill="#fff" d="M34 10h30v18H34z"/><path d="M35 40h28M35 53h20M35 66h14"/><circle cx="75" cy="66" r="18" fill="#d9ef75"/><path d="m88 79 17 18M69 65l5 5 9-10"/>',
    'percorsi': '<rect x="10" y="14" width="34" height="26" rx="5" fill="#ddd6fe"/><rect x="71" y="48" width="34" height="26" rx="5" fill="#d9ef75"/><rect x="14" y="83" width="34" height="24" rx="5" fill="#ddd6fe"/><path d="M44 27h15v34h12M88 74v21H48M63 53l8 8-8 8M56 88l-8 7 8 7"/>',
    'prove': '<rect x="14" y="20" width="78" height="60" rx="6" fill="#ddd6fe"/><path d="M14 34h78M25 27h1M33 27h1M41 27h1M36 94h34M53 80v14"/><circle cx="83" cy="78" r="21" fill="#d9ef75"/><path d="m73 78 7 7 14-16"/>',
}
icons = []
for code, body in motifs.items():
    file = ASSETS / ('obiettivo-' + code + '.svg')
    file.write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><g stroke="#18181b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">' + body + '</g></svg>\n')
    target = PUBLIC / file.name
    shutil.copyfile(file, target)
    icons.append(dict(id='processo-ux-ui-' + code, source=str(file.relative_to(ROOT)),
                      sha256=sha(file), web='/images/processo-ux-ui/' + file.name,
                      rights='CVeDI, 2026. Illustrazione vettoriale originale.'))

# Replace the generic progression with the approved scenario's same summary at three fidelities.
previous_progression = [dict(image, archivedReason='Replaced by the ImageGen comparison of the approved Viola wireframes.')
                        for image in images if image['code'] == 'wireframe-ui']
images = [image for image in images if image['code'] != 'wireframe-ui']
comparison = wireframes['comparison']
register(comparison['code'], ROOT / comparison['derivative'], comparison['caption'], comparison['rights'], comparison['alt'],
         use_overrides=False,
         original=comparison['original'], originalSha256=comparison['originalSha256'],
         prompt=comparison['prompt'], promptSha256=comparison['promptSha256'],
         generationTool=comparison['generationTool'], transparentBackground=comparison['transparentBackground'],
         references=comparison['references'], wireframeComparison=True)

# Revision comparisons reuse the approved wireframes and preserve their earlier SVGs.
previous_revisions = []
for revision in wireframes.get('revisions', []):
    previous_revisions += [dict(image, archivedReason='Replaced by the ImageGen comparison based on the approved Viola wireframes.')
                           for image in images if image['code'] == revision['code']]
    images = [image for image in images if image['code'] != revision['code']]
    register(revision['code'], ROOT / revision['derivative'], revision['caption'], revision['rights'], revision['alt'],
             use_overrides=False,
             original=revision['original'], originalSha256=revision['originalSha256'],
             prompt=revision['prompt'], promptSha256=revision['promptSha256'],
             generationTool=revision['generationTool'], transparentBackground=revision['transparentBackground'],
             references=revision['references'], wireframeRevision=dict(screenId=revision['screenId'],
                 beforeVersion=revision['beforeVersion'], afterVersion=revision['afterVersion']))

# Keep ownership in the source record while omitting repeated in-house credits on slides.
for image in images:
    if image['rights'].startswith('CVeDI,'):
        image['displayRights'] = ''

# The Viola sheet replaces the railway persona; retain the source and attribution.
archived_images = [dict(image, archivedReason='Replaced by the native Viola persona sheet at the user’s request.')
                   for image in images if image['code'] == 'persona'] + previous_progression + previous_revisions
images = [image for image in images if image['code'] != 'persona']

# Preserve figures owned only by slides explicitly removed from the active plan.
plan = json.loads((BASE / 'content-plan.json').read_text())
active_codes = {code for slide in plan['slides'] for code in slide['figures']}
archived_reasons = {code: slide['archivedReason'] for slide in plan.get('archivedSlides', [])
                    for code in slide['figures'] if code not in active_codes}
archived_images += [dict(image, archivedReason=archived_reasons[image['code']])
                    for image in images if image['code'] in archived_reasons]
images = [image for image in images if image['code'] not in archived_reasons]

(BASE / 'image-manifest.json').write_text(json.dumps(dict(version=1, lesson='processo-ux-ui',
    chapterSource=SOURCE, images=images, archivedImages=archived_images, objectiveArtwork=icons), ensure_ascii=False, indent=2) + '\n')
print(f'Processo UX/UI: {len(images)} figures and {len(icons)} objective motifs prepared.')
