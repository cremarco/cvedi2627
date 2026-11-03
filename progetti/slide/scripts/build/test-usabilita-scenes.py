"""Publish the user-requested original scenes without changing source pixels."""
from pathlib import Path
import hashlib
import json
import shutil

from PIL import Image

ROOT = Path(__file__).resolve().parents[4]
BASE = ROOT / 'progetti/slide/assets/lezione-test-usabilita/illustrazioni-testo'
plans = json.loads((BASE / 'prompts.json').read_text())
receipts = json.loads((BASE / 'provider-files.json').read_text())
layouts = json.loads((BASE.parent / 'layout-illustrato.json').read_text())
descriptions = {
    'scena-laboratorio': 'Laboratorio storico di usabilità: un partecipante al computer viene registrato da una videocamera; due ricercatori osservano dall’altra stanza attraverso il vetro.',
    'scena-sessione': 'Una persona usa un computer durante un test; accanto, il facilitatore osserva e prende appunti. Sul tavolo sono presenti mouse e microfono.',
    'scena-iterazione': 'Ciclo fra bozza di interfaccia, osservazione di una persona e revisione del progetto, collegato da tre frecce.',
    'scena-prototipo-precoce': 'Una persona prova un prototipo di carta mentre il facilitatore osserva; tre bozze richiamano la progressione del progetto.',
    'scena-qualitativo': 'Confronto fra osservazione individuale di un problema e analisi di dati aggregati di un gruppo, senza indicare dimensioni campionarie.',
    'scena-priorita': 'Due membri del team ordinano su una lavagna i problemi osservati, mettendo in evidenza una priorità.',
    'scena-partecipanti': 'Persone con esperienze e dispositivi diversi svolgono attività individuali con computer, smartphone e tablet.',
    'scena-osservatori': 'Il team segue su un grande schermo un partecipante che svolge un compito; un’osservatrice prende appunti.',
    'scena-moderazione': 'Il partecipante lavora autonomamente al computer e pensa ad alta voce; il facilitatore ascolta senza indicare il percorso.',
    'scena-richieste': 'Una persona propone una nuova funzione; il ricercatore ascolta, chiede chiarimenti e annota il bisogno da approfondire.',
    'scena-remoto': 'Partecipante e facilitatore comunicano a distanza attraverso dispositivi e condivisione dello schermo.',
    'scena-registrazione': 'Una persona svolge i compiti da sola al computer; registrazione e riproduzione del video rappresentano l’osservazione successiva.',
}
images = []
for item in plans['images']:
    original = ROOT / item['original']
    original.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(receipts[item['id']], original)
    target = ROOT / ('progetti/slide/public' + item['web'])
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(original) as image:
        image.save(target, lossless=True, exact=True)
        size = list(image.size)
    digest = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
    images.append({**item, 'providerFile': receipts[item['id']],
        'originalSha256': digest(original), 'sha256': digest(target), 'webSize': size,
        'alt': descriptions[item['id']],
        'owners': [{'lessonSlide': layout['lessonSlide'], 'alias': layout['alias']}
                   for layout in layouts['slides'] if layout['scene'] == item['id']],
        'publicationEncoding': {'format': 'webp', 'lossless': True, 'exact': True},
        'visualReview': 'Reviewed for clear subject, palette, pose and absence of fine text.'})
(BASE / 'manifest.json').write_text(json.dumps({**plans, 'images': images}, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'scenes': len(images), 'illustratedSlides': len(layouts['slides'])}))
