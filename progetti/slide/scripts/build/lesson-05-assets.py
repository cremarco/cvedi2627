"""Import the selected Figma source images without recolouring or resampling."""
from pathlib import Path
import json, hashlib
from PIL import Image

ROOT = Path(__file__).resolve().parents[4]
BASE = ROOT / 'progetti/slide/assets/booklet/lezione-05-accessibilita'
SOURCE = json.loads((BASE / 'figma-source.json').read_text())
REGISTRY = ROOT / 'risorse-condivise/fonti/booklet/capitolo-3/slide-assets.json'
registry = json.loads(REGISTRY.read_text())
registry['assets'] = [a for a in registry['assets'] if not a['id'].startswith('l05-')]
records = []
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def import_image(key, original, node, caption, credit, crop=None, retained=None):
    source = ROOT / original
    with Image.open(source) as im:
        im.load()
        if crop: im = im.crop(crop)
        digest = hashlib.sha256(im.tobytes()).hexdigest()[:12]
        web = f'images/processo-ux/l05-{key}-{digest}.webp'
        dest = ROOT / 'progetti/slide/public' / web
        im.save(dest, 'WEBP', lossless=True, exact=True)
        with Image.open(dest) as check:
            assert check.convert('RGBA').tobytes() == im.convert('RGBA').tobytes(), key
        record = dict(id='l05-'+key, original=original, web='/'+web, nodeId=node,
            caption=caption, sha256=sha(source), dimensions=list(im.size),
            encoding=dict(lossless=True,exactAlpha=True), retainedSources=retained or [original],
            provenance=dict(kind='figma-import',fileKey=SOURCE['fileKey'],pageId=SOURCE['pageId'],
                importedOn=SOURCE['date'],credit=credit,cropPixels=crop),
            publicationEncoding=dict(pixelPreserved=True,alphaPreserved=True))
        registry['assets'].append(record); records.append(record)
        return record

examples_root='risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/imagegen-esempi-v2'
examples=json.loads((ROOT/examples_root/'manifest.json').read_text())
for a in examples['assets']:
    frame=next(f for f in SOURCE['frames'] if f['id']==a['pageId'])
    assert frame['images'][0]['imageHash']==a['figma']['imageHash']
    original=f"{examples_root}/{a['filename']}"
    im=Image.open(ROOT/original); w,h=im.size; c=a['figma']['crop']
    for column,role in enumerate(['barriere','scelte']):
        x=(1-c['w'])*column; box=[round(x*w),round(c['y']*h),round((x+c['w'])*w),round((c['y']+c['h'])*h)]
        import_image(f"{a['key']}-{role}",original,a['figma']['activeNodes'][column],
            f"{a['title']} · {'Barriera' if column==0 else 'Scelta di progetto'}. Mockup originale ImageGen, esempio simulato.",
            'Originale ImageGen del progetto; prompt e diritti nel manifest degli esempi.',box,
            [original,f'{examples_root}/manifest.json',f'{examples_root}/prompts.json',f'{examples_root}/RIGHTS.txt'])

atlas='risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/persona-spectrum-atlas.png'
persona_manifest=ROOT/'progetti/slide/assets/theme-imagegen/lesson-05-persona-spectrum/manifest.json'
persona_assets={a['id']:a for a in json.loads(persona_manifest.read_text())['assets']} if persona_manifest.exists() else {}
if persona_assets:
    assert set(persona_assets)=={f'l05-persona-{row}-{col}' for row in range(4) for col in range(3)}, 'complete Persona Spectrum selection'
im=Image.open(ROOT/atlas); w,h=im.size
labels=[['Un solo braccio','Braccio infortunato','Neo-genitore'],['Cecità','Cataratta','Guida: sguardo altrove'],['Sordità','Infezione all’orecchio','Bar affollato'],['Persona non verbale','Laringite','Accento non riconosciuto']]
node_ids=[['3126:796','3126:799','3126:802'],['3126:807','3126:810','3126:813'],['3126:818','3126:821','3126:824'],['3126:829','3126:832','3126:835']]
for row in range(4):
    for col in range(3):
        selected=persona_assets.get(f'l05-persona-{row}-{col}')
        if selected:
            # Explicit ImageGen restyling survives a re-import of the booklet.
            assert sha(ROOT/selected['original'])==selected['sha256']
            assert sha(ROOT/selected['publicationSource'])==selected['publicationSourceSha256']
            destination=ROOT/'progetti/slide/public'/selected['web'].lstrip('/')
            destination.write_bytes((ROOT/selected['publicationSource']).read_bytes())
            with Image.open(ROOT/selected['original']) as original, Image.open(destination) as published:
                assert original.convert('RGBA').tobytes()==published.convert('RGBA').tobytes()
            registry['assets'].append(selected); records.append(selected)
            continue
        # The Figma fills select 21% × 20.5% of the original atlas.
        x=.075+.325*col; y=.04+.24*row
        import_image(f'persona-{row}-{col}',atlas,node_ids[row][col],labels[row][col]+' · Persona Spectrum, rielaborazione italiana del booklet.',
            'Modello Microsoft Inclusive Design / Persona Spectrum; illustrazioni originali ImageGen del progetto.',
            [round(x*w),round(y*h),round((x+.21)*w),round((y+.205)*h)],
            [atlas,'risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/manifest.json'])

scenario_manifest=ROOT/'progetti/slide/assets/theme-imagegen/lesson-05-scenarios/manifest.json'
scenario_assets={a['id']:a for a in json.loads(scenario_manifest.read_text())['assets']} if scenario_manifest.exists() else {}
for key,file,node,caption,credit in [
 ('screen-reader','risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/screen-reader-mobile.jpg','3124:748','Screen reader su smartphone · esplorazione con gesti e sintesi vocale. ©2016 W3C®, CC BY 3.0 US.','©2016 W3C®, CC BY 3.0 US; fonte WebAIM Introduction.'),
 ('puntatore','risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/puntatore-bocca.jpg','3124:750','Puntatore a bocca per azionare i tasti. ©2016 W3C®, CC BY 3.0 US.','©2016 W3C®, CC BY 3.0 US; fonte WebAIM Introduction.'),
 ('scenario-colore','risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/scenario-colore.png','3124:878','Scegliere un prodotto: nome del colore e selezione visibile. Scenario illustrativo originale ImageGen.','Originale ImageGen del progetto; scenario ispirato a WAI Stories of Web Users.'),
 ('scenario-tastiera','risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/scenario-tastiera-v2.png','3124:883','Completare un modulo: controlli e focus da tastiera. Scenario illustrativo originale ImageGen.','Originale ImageGen del progetto; scenario ispirato a WAI Stories of Web Users.'),
 ('scenario-media','risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/scenario-sottotitoli.png','3124:888','Seguire una lezione: sottotitoli e informazioni visive. Scenario illustrativo originale ImageGen.','Originale ImageGen del progetto; scenario ispirato a WAI Stories of Web Users.'),
 ('tlou-controlli','risorse-condivise/fonti/booklet/accessibilita-estensione/tlou-controller-remap.png','2811:931','The Last of Us Part II · rimappatura dei controlli. Screenshot ufficiale PlayStation / Naughty Dog, acquisito l’11 ottobre 2026.','PlayStation / Naughty Dog; immagine documentaria, diritti dei rispettivi titolari.'),
 ('tlou-contrasto','risorse-condivise/fonti/booklet/accessibilita-estensione/tlou-high-contrast.png','2811:963','The Last of Us Part II · presentazione ad alto contrasto. Screenshot ufficiale PlayStation / Naughty Dog, acquisito l’11 ottobre 2026.','PlayStation / Naughty Dog; immagine documentaria, diritti dei rispettivi titolari.'),
 ('adobe-contrasto','progetti/slide/assets/booklet/lezione-05-accessibilita/originals/adobe-contrasto.png','I198:3922;15:2761','Adobe Color · verifica del contrasto; immagine conservata dalla tavola 178 del booklet.','Screenshot Adobe Color nel booklet; diritti dei rispettivi titolari.'),
 ('adobe-visione','progetti/slide/assets/booklet/lezione-05-accessibilita/originals/adobe-color-vision.png','I198:3923;15:2761','Adobe Color · simulazione della visione dei colori; immagine conservata dalla tavola 178 del booklet.','Screenshot Adobe Color nel booklet; diritti dei rispettivi titolari.')]:
    selected=scenario_assets.get('l05-'+key)
    if selected:
        assert selected['nodeId']==node
        assert sha(ROOT/selected['original'])==selected['sha256']
        assert sha(ROOT/selected['publicationSource'])==selected['publicationSourceSha256']
        destination=ROOT/'progetti/slide/public'/selected['web'].lstrip('/')
        destination.write_bytes((ROOT/selected['publicationSource']).read_bytes())
        with Image.open(ROOT/selected['original']) as original, Image.open(destination) as published:
            assert original.convert('RGBA').tobytes()==published.convert('RGBA').tobytes()
        registry['assets'].append(selected); records.append(selected)
    else:
        import_image(key,file,node,caption,credit)
REGISTRY.write_text(json.dumps(registry,ensure_ascii=False,indent=2)+'\n')
(BASE/'image-manifest.json').write_text(json.dumps(dict(date=SOURCE['date'],fileKey=SOURCE['fileKey'],sectionId=SOURCE['sectionId'],
    source='figma-source.json',rights='Credits and rights remain in each source manifest; imports preserve colours, proportions and original files.',assets=records),ensure_ascii=False,indent=2)+'\n')
print(f'Imported {len(records)} lossless images for lesson 05.')
