from pathlib import Path
import json
import re
import hashlib
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, BooleanObject, DecodedStreamObject, DictionaryObject, FloatObject, NameObject, RectangleObject
import pdfplumber

root = Path('/Users/marco/Sites/cvedi2627')
work = root / 'tmp/pdfs/capitolo1'
final = root / 'output/pdf/CVeDI-2026-2027-Capitolo-1-Introduzione-DRAFT.pdf'
manifest = json.loads((work / 'figma-manifest.json').read_text())
assert len(manifest) == 20
writer = PdfWriter()
checks = []
for i, frame in enumerate(manifest, 1):
    assert int(re.search(r'\d{3}', frame['name']).group()) == i
    assert frame['draft'] == 1
    source = work / 'source' / f'{i:03}.pdf'
    reader = PdfReader(source)
    assert len(reader.pages) == 1
    page = reader.pages[0]
    trim = frame['trim'][0]
    left, top, width, height = [trim[k] for k in ['x', 'y', 'width', 'height']]
    bottom = float(page.mediabox.height) - top - height
    # Preserve Figma's original encoded text bytes while translating the page.
    # Parsing and rewriting text operators can alter custom glyph encodings.
    translated = DecodedStreamObject()
    translated.set_data(f'q\n1 0 0 1 {-left:.10f} {-bottom:.10f} cm\n'.encode('ascii') + page.get_contents().get_data() + b'\nQ\n')
    page[NameObject('/Contents')] = translated.flate_encode()
    box = RectangleObject([0, 0, width, height])
    for key in ['/MediaBox', '/CropBox', '/TrimBox', '/BleedBox', '/ArtBox']:
        page[NameObject(key)] = RectangleObject(box)
    for annotation in page.get('/Annots', []):
        a = annotation.get_object()
        if '/Rect' in a:
            x0, y0, x1, y1 = [float(v) for v in a['/Rect']]
            a[NameObject('/Rect')] = RectangleObject([x0-left,y0-bottom,x1-left,y1-bottom])
        if '/QuadPoints' in a:
            a[NameObject('/QuadPoints')] = ArrayObject([FloatObject(float(v) - (left if j%2==0 else bottom)) for j,v in enumerate(a['/QuadPoints'])])
    writer.add_page(page)
    text = re.sub(r'\s', '', page.extract_text())
    assert 'DRAFT' in text, (i, 'missing watermark text')
    if i == 1:
        assert 'marco.cremaschi@unimib.it' in text
        assert 'preventivaautorizzazionescritta' in text
    checks.append({'pdf_page':i,'figma_node':frame['id'],'figma_name':frame['name'],'draft':True,'trim_mm':[round(width*25.4/72,3),round(height*25.4/72,3)],'source_bytes':source.stat().st_size})

writer.add_metadata({'/Title':'Comunicazione visiva e design delle interfacce - Capitolo 1: Introduzione - DRAFT','/Author':'Marco Cremaschi','/Subject':'Anno accademico 2026/2027. PDF del capitolo 1, 20 pagine singole in ordine di lettura, predisposto per stampa fronte-retro sul lato lungo.','/Keywords':'CVeDI, Capitolo 1, Introduzione, DRAFT, fronte-retro'})
writer.page_layout = '/SinglePage'
writer.root_object[NameObject('/ViewerPreferences')] = DictionaryObject({NameObject('/Duplex'):NameObject('/DuplexFlipLongEdge'),NameObject('/PrintScaling'):NameObject('/None'),NameObject('/PickTrayByPDFSize'):BooleanObject(True)})
with final.open('wb') as out:
    writer.write(out)

reader = PdfReader(final)
assert len(reader.pages) == 20 and len(reader.pages)%2 == 0
for i,p in enumerate(reader.pages,1):
    assert abs(float(p.mediabox.width)-479.05511474609375)<0.001
    assert abs(float(p.mediabox.height)-640.6299438476562)<0.001
    assert 'DRAFT' in re.sub(r'\s','',p.extract_text())

outside_text=[]
with pdfplumber.open(final) as doc:
    for i,p in enumerate(doc.pages,1):
        for c in p.chars:
            if not c['text'].strip():
                continue
            if c['x0'] < -0.05 or c['x1'] > p.width+0.05 or c['top'] < -0.05 or c['bottom'] > p.height+0.05:
                outside_text.append({'page':i,'text':c['text'],'box':[c['x0'],c['top'],c['x1'],c['bottom']]})
        checks[i-1]['text_characters'] = len(p.chars)
        checks[i-1]['images'] = len(p.images)
        checks[i-1]['vector_paths'] = len(p.curves)+len(p.lines)+len(p.rects)
assert not outside_text, outside_text[:20]

report={'file':str(final),'pages':20,'sheet_count_duplex':10,'format_mm':[169,226],'duplex_preference':'DuplexFlipLongEdge','print_scaling':'None','page_order':'001-020, single pages','sha256':hashlib.sha256(final.read_bytes()).hexdigest(),'bytes':final.stat().st_size,'rights_notice_first_page':True,'email_link_preserved':any(a.get_object().get('/A',{}).get('/URI')=='mailto:marco.cremaschi@unimib.it' for a in reader.pages[0].get('/Annots',[])),'outside_page_text':outside_text,'pages_checks':checks}
(work/'qa-manifest.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='pages_checks'},ensure_ascii=False,indent=2))
