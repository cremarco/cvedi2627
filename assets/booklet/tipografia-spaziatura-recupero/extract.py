"""Recover the exact spacing figures from the local 2025/26 course PDF.

Run with the bundled Python runtime (pypdf 6.10.0, Pillow 12.3.0,
pdfplumber 0.11.9). The main PNGs match the previously reviewed report files.
The PDF stores JPEG colour streams plus soft masks. pypdf combines those into
RGBA images and JP2 files; these JP2s are extracted composites, not raw PDF
streams. The actual JPEG source streams and decoded masks are also retained.
"""
from pathlib import Path
import hashlib
import json

import PIL
from PIL import Image
import pdfplumber
import pypdf
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
SOURCE = ROOT / 'materiali/lezioni/2025-2026/07-tipografia-accessibilita.pdf'
SOURCE_SHA256 = 'd076df0444f50eb9b5bc96e68075255efb5cb80cf65d3921a7310fe26fb62551'
FIGURES = [
    dict(name='kerning', page=104, xobject='/Image108',
         expected_png_sha256='ba3768329761e354190c965573f9350dcbd29c5ecfaa2cb05f9dd19aada2ece3',
         description='La parola kerning con e senza crenatura, con le due etichette originali.'),
    dict(name='tracking', page=105, xobject='/Image109',
         expected_png_sha256='f7d5be3e5fce1636d1d7e3cb54b1eab725fe568d41e2d21c2900686a7a731e55',
         description='La parola tracking su tre righe con spaziatura crescente.'),
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def output_record(file):
    return dict(path=str(file.relative_to(ROOT)), sha256=sha(file.read_bytes()), bytes=file.stat().st_size)


assert sha(SOURCE.read_bytes()) == SOURCE_SHA256, 'The source PDF differs from the reviewed local file.'
reader = PdfReader(SOURCE)
records = []
with pdfplumber.open(SOURCE) as geometry:
    for item in FIGURES:
        page = reader.pages[item['page'] - 1]
        xobjects = page['/Resources']['/XObject'].get_object()
        colour_ref = xobjects.raw_get(item['xobject'])
        colour = colour_ref.get_object()
        mask_ref = colour.raw_get('/SMask')
        mask = mask_ref.get_object()
        assert colour['/Filter'] == '/DCTDecode', 'Expected original JPEG stream.'
        assert mask['/Filter'] == '/FlateDecode', 'Expected the original lossless soft mask.'
        assert len(page.images) == 1
        embedded = page.images[0]
        assert embedded.name.endswith('.jp2')
        image = embedded.image
        assert image.mode == 'RGBA'
        width, height = image.size

        png = OUT / f"{item['name']}.png"
        jp2 = OUT / f"{item['name']}.jp2"
        jpeg = OUT / f"{item['name']}-source.jpg"
        alpha = OUT / f"{item['name']}-mask.png"
        image.save(png, format='PNG')
        jp2.write_bytes(embedded.data)
        jpeg.write_bytes(colour._data)
        Image.frombytes('L', (width, height), mask.get_data()).save(alpha, format='PNG')
        assert sha(png.read_bytes()) == item['expected_png_sha256'], 'PNG bytes must match the reviewed extraction.'
        assert Image.open(jp2).convert('RGBA').tobytes() == image.tobytes(), 'JP2 composite preserves the reviewed pixels.'
        assert Image.open(alpha).tobytes() == image.getchannel('A').tobytes(), 'Soft mask matches the PNG alpha channel.'

        page_geometry = geometry.pages[item['page'] - 1]
        placement = next(i for i in page_geometry.images if i['name'] == item['xobject'].lstrip('/'))
        records.append(dict(
            name=item['name'], description=item['description'], page=item['page'],
            pageXref=page.indirect_reference.idnum,
            xObjectName=item['xobject'], xObjectXref=colour_ref.idnum,
            sourceFilter=str(colour['/Filter']), sourceColorSpace=str(colour['/ColorSpace']),
            sourceBitsPerComponent=colour['/BitsPerComponent'],
            softMask=dict(xref=mask_ref.idnum, filter=str(mask['/Filter']),
                          colorSpace=str(mask['/ColorSpace']), bitsPerComponent=mask['/BitsPerComponent'],
                          compressedStreamSha256=sha(mask._data), decodedPixelsSha256=sha(mask.get_data()),
                          file=output_record(alpha)),
            pageSizePt=[page_geometry.width, page_geometry.height],
            figureBoundsTopLeftPt=[placement[k] for k in ['x0', 'top', 'x1', 'bottom']],
            naturalWidth=width, naturalHeight=height, mode=image.mode,
            rgbaPixelsSha256=sha(image.tobytes()),
            png=output_record(png),
            jp2Composite=output_record(jp2),
            originalJpegStream=output_record(jpeg),
            originalLabels=['con kerning', 'senza kerning'] if item['name'] == 'kerning' else [],
            attributionPrintedOnPage=None, sourceUrlPrintedOnPage=None,
        ))

manifest = dict(
    schemaVersion=1, recoveredAt='2026-10-20',
    source=dict(path=str(SOURCE.relative_to(ROOT)), sha256=SOURCE_SHA256,
                title='Corso di CVeDI (8 CFU) - Lezione 7', year='2025-2026',
                courseAuthor='Marco Cremaschi', pageCount=len(reader.pages)),
    attribution='Materiali del corso CVeDI, lezione 7 (2025-2026), Marco Cremaschi. Autori originari delle due figure non indicati nel PDF.',
    rights='Nessuna licenza aperta indicata nel PDF; fonte originale conservata.',
    extraction='Original embedded JPEG colour streams and soft masks retained. Main PNGs are lossless RGBA composites at native resolution, identical to the reviewed report PNGs. JP2s are the pypdf RGBA composites, not original PDF codestreams. No crop, rescaling, retouching or relabelling.',
    generator=dict(path=str(Path(__file__).relative_to(ROOT)), sha256=sha(Path(__file__).read_bytes()),
                   dependencies=dict(pypdf=pypdf.__version__, Pillow=PIL.__version__, pdfplumber=pdfplumber.__version__)),
    figures=records,
)
(OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({item['name']: output_record(OUT / f"{item['name']}.png") for item in FIGURES}, ensure_ascii=False))
