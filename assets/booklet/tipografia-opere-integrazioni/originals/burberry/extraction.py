import hashlib
import io
import json
from pathlib import Path
from xml.sax.saxutils import escape

import pdfplumber
from PIL import ImageCms
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject


source_path = Path('/tmp/cvedi-comment384-sources/burberry-annual-report-2022-23.pdf')
reader = PdfReader(source_path)
page = reader.pages[0]
operations = page.get_contents().operations
color_space = page['/Resources']['/ColorSpace']['/CS0'].get_object()[1].get_object()
profile_name = ImageCms.getProfileDescription(ImageCms.ImageCmsProfile(io.BytesIO(color_space.get_data()))).strip()
assert profile_name == 'sRGB IEC61966-2.1'
assert operations[2][1] == b'scn'
assert list(map(float, operations[2][0])) == [0, 0.059, 0.624]
assert operations[3290][1] == b'q'
assert operations[3603][1] == b'BT'

with pdfplumber.open(source_path) as document:
    curves = [curve for curve in document.pages[0].curves if curve['top'] > 650 and curve['x0'] > 0]
    ink_bounds = [min(curve['x0'] for curve in curves), min(curve['top'] for curve in curves), max(curve['x1'] for curve in curves), max(curve['bottom'] for curve in curves)]

crop_bounds = [ink_bounds[0] - 1, ink_bounds[1] - 1, ink_bounds[2] + 1, ink_bounds[3] + 1]
width = crop_bounds[2] - crop_bounds[0]
height = crop_bounds[3] - crop_bounds[1]


def number(value):
    return format(float(value), '.10f').rstrip('0').rstrip('.') or '0'


paths = []
commands = []
transform = None
point = None
start_point = None
for operands, operator in operations[3290:3603]:
    values = list(map(float, operands))
    if operator == b'q':
        assert not commands
        transform = None
    elif operator == b'cm':
        assert transform is None
        assert values[:4] == [1, 0, 0, 1]
        transform = values
    elif operator in (b'm', b'l'):
        commands.append(operator.decode().upper() + ' ' + ' '.join(map(number, values)))
        point = values
        if operator == b'm':
            start_point = values
    elif operator == b'c':
        commands.append('C ' + ' '.join(map(number, values)))
        point = values[-2:]
    elif operator == b'v':
        commands.append('C ' + ' '.join(map(number, point + values)))
        point = values[-2:]
    elif operator == b'y':
        commands.append('C ' + ' '.join(map(number, values + values[-2:])))
        point = values[-2:]
    elif operator == b'h':
        commands.append('Z')
        point = start_point
    elif operator == b'f':
        assert transform is not None
        paths.append('<path transform="matrix(' + ' '.join(map(number, transform)) + ')" d="' + ' '.join(commands) + '"/>')
        commands = []
    elif operator == b'Q':
        assert not commands
    else:
        raise ValueError('Unsupported selected PDF operator: ' + str(operator))
assert len(paths) == 8

description = 'Burberry serif wordmark, documentary extraction of the eight original filled vector paths from the cover of Burberry Annual Report 2022/23. The report describes the new wordmark as revealed in early February 2023 on printed page 26 (PDF page 28). Source: https://www.burberryplc.com/content/dam/burberryplc/corporate/documents/annual-report-2022-23/Annual-report-2022-23.pdf . Burberry Group plc; all third-party rights retained, no open licence claimed. No font, glyph, spacing, colour or contour reconstruction; PDF v/y Bezier shorthand expanded exactly to C commands. Original sRGB values 0, 0.059, 0.624 preserved. Only coordinate origin, y-axis direction and one-point clear margin changed.'
svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + number(width) + '" height="' + number(height) + '" viewBox="0 0 ' + number(width) + ' ' + number(height) + '">\n<title>Burberry wordmark · Annual Report 2022/23</title>\n<desc>' + escape(description) + '</desc>\n<g fill="rgb(0%,5.9%,62.4%)" fill-rule="nonzero" transform="matrix(1 0 0 -1 ' + number(-crop_bounds[0]) + ' ' + number(float(page.mediabox.height) - crop_bounds[1]) + ')">\n' + '\n'.join(paths) + '\n</g>\n</svg>\n'

writer = PdfWriter()
writer.add_page(page)
writer.pages[0].cropbox = RectangleObject([crop_bounds[0], float(page.mediabox.height) - crop_bounds[3], crop_bounds[2], float(page.mediabox.height) - crop_bounds[1]])
pdf_output = source_path.parent / 'burberry-2023-wordmark-cover-crop.pdf'
with pdf_output.open('wb') as stream:
    writer.write(stream)

print(json.dumps({'svg': svg, 'sourceSha256': hashlib.sha256(source_path.read_bytes()).hexdigest(), 'sourceBytes': source_path.stat().st_size, 'inkBoundsPdfTopLeftPoints': ink_bounds, 'cropBoundsPdfTopLeftPoints': crop_bounds, 'width': width, 'height': height, 'pathCount': len(paths), 'profile': profile_name, 'originalOperationRangeInclusive': [3290, 3602], 'cropPdfPath': str(pdf_output)}, ensure_ascii=False))
