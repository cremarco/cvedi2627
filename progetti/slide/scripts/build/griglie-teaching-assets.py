"""Build original lesson supplements with the existing DM Sans outliner.

Run: uv run --with fonttools==4.65.0 --with uharfbuzz python progetti/slide/scripts/build/griglie-teaching-assets.py
Booklet source figures and their registry are never changed.
"""
from pathlib import Path
import importlib.util
import hashlib
import json
import xml.etree.ElementTree as ET
import zipfile
import io
import uharfbuzz as hb

ROOT = Path(__file__).resolve().parents[4]
BASE = Path('progetti/slide/assets/slide-materials/griglie')
OUTPUT = Path('progetti/slide/assets/figure/griglia-didattica')
spec = importlib.util.spec_from_file_location('grid_outliner', ROOT / 'progetti/slide/scripts/build/griglie-assets.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
sha = lambda data: hashlib.sha256(data).hexdigest()


def main():
    catalog = json.loads((ROOT / BASE / 'catalog.json').read_text())
    (ROOT / OUTPUT).mkdir(parents=True, exist_ok=True)
    outliner = module.Outliner()
    records = []
    for entry in catalog['images']:
        source = (ROOT / entry['source']).read_bytes()
        svg = ET.fromstring(source)
        has_text = any(module.tag(node) == 'text' for node in svg.iter())
        data = outliner.outline(svg, entry['code']) if has_text else source
        target = OUTPUT / (entry['code'] + '.svg')
        (ROOT / target).write_bytes(data)
        fonts = [dict(source=module.FONT, sourceSha256=sha(outliner.font_bytes),
            license=module.LICENSE, licenseSha256=sha((ROOT / module.LICENSE).read_bytes()))] if has_text else []
        records.append(dict(**entry, web=str(target).replace('risorse-condivise/immagini/', '/images/shared/'),
            sourceSha256=sha(source), sha256=sha(data), fonts=fonts,
            transformation='outlined-source-text' if has_text else 'identical-bytes'))

    kit = json.loads((ROOT / BASE / 'exercise-kit.json').read_text())
    assert len(kit['text'].split()) == kit['wordCount'] == 80
    download = ROOT / 'progetti/slide/public/materiali/griglie-layout'
    download.mkdir(parents=True, exist_ok=True)
    markdown = '# ' + kit['title'] + '\n\nContenuti simulati per l’esercizio CVeDI.\n\n' + kit['text']
    markdown += '\n\n## Appuntamenti\n\n' + '\n'.join('- ' + item for item in kit['appointments'])
    markdown += '\n\n## Nota di servizio\n\n' + kit['note']
    markdown += '\n\n## Immagine e vincoli\n\n![Campione geometrico](immagine-luce-e-spazio.svg)\n\n'
    markdown += kit['focalDetail'] + '\n\nProgettare a 960 e 360 px CSS, conservando tutti i contenuti.\n'
    files = {'contenuti.md': markdown.encode(), 'contenuti.json': (ROOT / BASE / 'exercise-kit.json').read_bytes(),
        kit['image']: (ROOT / BASE / 'originals/luce-e-spazio.svg').read_bytes()}
    archive = io.BytesIO()
    with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as z:
        for name, data in files.items():
            z.writestr(zipfile.ZipInfo(name, date_time=(2026, 10, 22, 0, 0, 0)), data)
            (download / name).write_bytes(data)
    zip_data = archive.getvalue()
    (download / 'luce-e-spazio.zip').write_bytes(zip_data)
    manifest = dict(version=1, generator='progetti/slide/scripts/build/griglie-teaching-assets.py',
        sourceCatalog=str(BASE / 'catalog.json'), shapingEngine='HarfBuzz ' + hb.version_string(),
        images=records, exerciseKit=dict(source=str(BASE / 'exercise-kit.json'),
            sourceSha256=sha((ROOT / BASE / 'exercise-kit.json').read_bytes()),
            download='/materiali/griglie-layout/luce-e-spazio.zip', sha256=sha(zip_data), wordCount=80))
    (ROOT / BASE / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    print(f'Teaching supplements: {len(records)} original figures; 80-word exercise kit.')


if __name__ == '__main__':
    main()
