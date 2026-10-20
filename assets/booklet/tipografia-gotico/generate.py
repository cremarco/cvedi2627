"""Publish an authentic document detail using an SVG viewport only.

The complete original JPEG is embedded byte for byte. No pixels, glyphs,
colors or proportions are changed; the viewport selects three full lines.
"""
import base64
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
FOLDER = Path(__file__).resolve().parent
SOURCE = ROOT / 'assets/booklet/tipografia-gotico/bsb00004647-00013.jpg'
CROP = {'x': 264, 'y': 1185, 'width': 560, 'height': 135}
raw = SOURCE.read_bytes()
original_hash = hashlib.sha256(raw).hexdigest()
assert original_hash == '5de3677a190bf1ebe8fc86edf9cadffbb5b90fd56c3edcdaa559cb720e237be6'
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="560" height="135" '
    'viewBox="264 1185 560 135">\n'
    '<title>Gotico della Bibbia di Gutenberg, circa 1455: tre righe della colonna sinistra.</title>\n'
    '<image x="0" y="0" width="1780" height="2500" href="data:image/jpeg;base64,'
    + base64.b64encode(raw).decode() + '"/>\n</svg>\n'
).encode()
publication_hash = hashlib.sha256(svg).hexdigest()
publication = FOLDER / 'gutenberg-gotico-dettaglio.svg'
publication.write_bytes(svg)
web = ROOT / f'public/images/tipografia/gutenberg-gotico-{publication_hash[:12]}.svg'
web.write_bytes(svg)
asset = {
    'id': 'tipografia-gutenberg-gotico-dettaglio',
    'nodeId': 'https://www.digitale-sammlungen.de/en/view/bsb00004647?page=13',
    'title': 'Gotico librario — Bibbia di Gutenberg, circa 1455',
    'caption': 'Dettaglio del gotico librario della Bibbia di Gutenberg, circa 1455. Bayerische Staatsbibliothek, 2 Inc.s.a. 197-1, fol. 5r; digitalizzazione HUMI Project, Keio University.',
    'sourceLinks': [
        'https://www.digitale-sammlungen.de/en/view/bsb00004647?page=13',
        'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00004647/manifest',
        'https://www.loc.gov/exhibits/bibles/interactives/gutenberg/text.html',
    ],
    'naturalWidth': CROP['width'],
    'naturalHeight': CROP['height'],
    'original': str(SOURCE.relative_to(ROOT)),
    'web': '/' + str(web.relative_to(ROOT / 'public')),
    'retainedSources': [
        'assets/booklet/tipografia-gotico/bsb00004647-iiif-manifest.json',
        'assets/booklet/tipografia-gotico/bsb00004647-00013-info.json',
        'assets/booklet/tipografia-gotico/generate.py',
        'assets/booklet/tipografia-gotico/manifest.json',
    ],
    'originalBytes': len(raw),
    'webBytes': len(svg),
    'sha256': original_hash,
    'publicationSource': str(publication.relative_to(ROOT)),
    'publicationSourceSha256': publication_hash,
    'publicationSha256': publication_hash,
    'encoding': {
        'format': 'SVG',
        'lossless': True,
        'exactAlpha': True,
        'transformation': 'SVG viewBox selects a document region; complete source JPEG embedded byte for byte, without raster edits or glyph redrawing.',
    },
    'provenance': {
        'kind': 'authentic-document-detail',
        'createdAt': '2026-10-20',
        'library': 'Bayerische Staatsbibliothek',
        'callNumber': '2 Inc.s.a. 197-1',
        'folio': '5r (0013)',
        'sourceDimensions': [1780, 2500],
        'viewport': CROP,
        'catalogUrl': 'https://www.digitale-sammlungen.de/en/view/bsb00004647?page=13',
        'sourceUrl': 'https://api.digitale-sammlungen.de/iiif/image/v2/bsb00004647_00013/full/full/0/default.jpg',
        'manifestUrl': 'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00004647/manifest',
        'license': 'https://creativecommons.org/publicdomain/mark/1.0/',
        'rights': 'Public Domain Mark 1.0. Bayerische Staatsbibliothek, 2 Inc.s.a. 197-1, fol. 5r; digitalizzazione HUMI Project, Keio University.',
        'scope': 'Supplementary detail in the typography slide; derived from the preserved document image, not a new Figma export.',
        'aiGenerated': False,
    },
}
(FOLDER / 'manifest.json').write_text(json.dumps({
    'schemaVersion': 1,
    'date': '2026-10-20',
    'slide': {'lesson': 'tipografia-griglie', 'number': 10, 'alias': 'tipografia-griglie-tipo-venezia-jenson'},
    'asset': asset,
}, ensure_ascii=False, indent=2) + '\n')
print(asset['web'])
