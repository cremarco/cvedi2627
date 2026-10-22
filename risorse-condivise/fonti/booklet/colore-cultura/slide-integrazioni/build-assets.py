"""Preserve source pixels and build the teaching figures for lesson 07."""
from pathlib import Path
from io import BytesIO
import base64, hashlib, html, json
from PIL import Image, ImageChops
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[5]
BASE = Path(__file__).resolve().parent
ORIGINALS = BASE / 'originals'
PUBLIC = ROOT / 'progetti/slide/public/images/processo-ux'
font_data = base64.b64encode((ROOT / 'progetti/slide/public/fonts/deck/nunito-sans-latin-wght-normal.woff2').read_bytes()).decode()
font_license = (ROOT / 'progetti/slide/public/fonts/deck/OFL-NunitoSans.txt').read_text()

def sha(data):
    return hashlib.sha256(data).hexdigest()

def relative(path):
    return str(path.relative_to(ROOT))

def label(text, x, y, size=26, color='#0f172a'):
    return f'<text x="{x}" y="{y}" font-family="Nunito Sans, sans-serif" font-size="{size}" font-weight="500" fill="{color}">{html.escape(text)}</text>'

def svg(width, height, title, body):
    font_face = f'<style>@font-face{{font-family:"Nunito Sans";font-style:normal;font-weight:200 900;src:url(data:font/woff2;base64,{font_data}) format("woff2")}}</style>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img"><title>{html.escape(title)}</title><metadata>{html.escape(font_license)}</metadata>{font_face}{body}</svg>\n'.encode()

def publish(identifier, original, caption, node, links, retained, rights, kind, dimensions):
    data = original.read_bytes()
    if original.suffix == '.svg':
        encoded, extension = data, 'svg'
    else:
        image = Image.open(original).convert('RGBA')
        buffer = BytesIO()
        image.save(buffer, format='WEBP', lossless=True, exact=True, method=6)
        encoded, extension = buffer.getvalue(), 'webp'
        decoded = Image.open(BytesIO(encoded)).convert('RGBA')
        assert image.tobytes() == decoded.tobytes(), 'pixel/alpha preservation'
    target = PUBLIC / f'{identifier}-{sha(encoded)[:12]}.{extension}'
    target.write_bytes(encoded)
    return {'id': identifier, 'original': relative(original), 'web': '/images/processo-ux/' + target.name,
            'nodeId': node, 'caption': caption, 'sha256': sha(data), 'publicationSha256': sha(encoded),
            'dimensions': dimensions, 'encoding': {'lossless': True, 'exactAlpha': True},
            'sourceLinks': links, 'retainedSources': [relative(p) for p in retained], 'rights': rights,
            'provenance': {'kind': kind, 'retrievedOn': '2026-10-16', 'sourceCatalog': 'risorse-condivise/fonti/booklet/colore-cultura/slide-integrazioni/fonti.json'}}

reader = PdfReader(ORIGINALS / 'cgse-trader-2021.pdf')
images = list(reader.pages[12].images)
for i, image in enumerate(images):
    (ORIGINALS / ('cgse-p13-' + image.name)).write_bytes(image.data)
charts = images[1:3]
body = label('A · Verde su, rosso giù', 0, 30) + label('B · Rosso su, verde giù', 563, 30)
for image, x in zip(charts, [0, 563]):
    width, height = image.image.size
    encoded = base64.b64encode(image.data).decode()
    body += f'<image x="{x}" y="52" width="{width}" height="{height}" href="data:image/png;base64,{encoded}"/>'
pair = ORIGINALS / 'cgse-convenzioni.svg'
pair.write_bytes(svg(1081, 655, 'Due convenzioni cromatiche nel CGSE Trader Terminal, manuale 2021', body))

body = '<rect x="20" y="20" width="230" height="180" fill="#65b8f6"/><rect x="290" y="20" width="230" height="180" fill="#2455b3"/>'
body += label('goluboy', 63, 247, 34) + label('siniy', 367, 247, 34)
body += label('area dei blu chiari', 36, 282, 25) + label('area dei blu scuri', 307, 282, 25)
language = ORIGINALS / 'lingua-categorie-blu.svg'
language.write_bytes(svg(540, 310, 'Campioni illustrativi per goluboy e siniy: non sono gli stimoli sperimentali', body))

assets = [
    publish('l07-cultura-convenzioni-cgse', pair,
            'CGSE Trader Terminal, manuale 2021, pagina PDF 13 / folio 12, §5.1.4. Due grafici originali con convenzioni opposte; lettere e traduzione didattica aggiunte senza modificare i bitmap.',
            'pdf:cgse-trader-2021:page-13:images-210-211',
            ['https://cgse.com.hk/chines/sites/default/files/gtp-user-manual-trader-terminal-20211022b.pdf'],
            [ORIGINALS / 'cgse-trader-2021.pdf', *[ORIGINALS / ('cgse-p13-' + c.name) for c in charts]],
            'Schermate documentarie CGSE / Infocast Finance; nessuna licenza aperta documentata. Impaginazione didattica CVeDI 2026.',
            'official-document-extract', [1081, 655]),
    publish('l07-cultura-lingua-blu', language,
            'Schema didattico CVeDI 2026. Campioni cromatici illustrativi per goluboy e siniy, non riproduzioni degli stimoli di Winawer et al. (2007).',
            'original:cvedi:lingua-categorie-blu', ['https://doi.org/10.1073/pnas.0701644104'],
            [BASE / 'build-assets.py', ROOT / 'progetti/slide/public/fonts/deck/nunito-sans-latin-wght-normal.woff2', ROOT / 'progetti/slide/public/fonts/deck/OFL-NunitoSans.txt'],
            'Schema originale CVeDI 2026; font Nunito Sans conservato con la licenza del progetto.', 'original-teaching-diagram', [540, 310]),
    publish('l07-cultura-google-muertos', ORIGINALS / 'google-dia-muertos-2024.png',
            'Day of the Dead 2024, Google Doodles, 1 novembre 2024. Illustrazione di Lucia Sarabia. Originale acquisito dal sito ufficiale il 16 ottobre 2026.',
            'web:google-doodles:day-of-the-dead-2024',
            ['https://doodles.google/doodle/day-of-the-dead-2024/', 'https://www.google.com/logos/doodles/2024/day-of-the-dead-2024-6753651837110312-2x.png'],
            [ORIGINALS / 'google-dia-muertos-2024.png'],
            'Google Doodles; illustrazione Lucia Sarabia. Nessuna licenza aperta documentata; originale non modificato.',
            'official-artwork', list(Image.open(ORIGINALS / 'google-dia-muertos-2024.png').size)),
]
(BASE / 'assets.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n')
print(json.dumps([{'id': a['id'], 'web': a['web'], 'dimensions': a['dimensions']} for a in assets], ensure_ascii=False))
