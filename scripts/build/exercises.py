"""Import the supplied teaching decks without executing their HTML or scripts.

PPTX preserves editable text, code, links and source geometry. PDF is used only
to render composite documentary diagrams, retaining their labels and arrows.
Run with the bundled Python runtime (pypdf, Pillow).
"""
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import hashlib, json, re, posixpath, subprocess, tempfile, math, html
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
NS = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
RID = '{' + NS['r'] + '}id'
manifest_path = ROOT / 'assets/esercitazioni/manifest.json'
manifest = json.loads(manifest_path.read_text())
inferred_titles = {(1,15): 'Tag di apertura e chiusura', (1,18): 'Attributi di un tag HTML', (1,56): 'Sintassi di una regola CSS'}
PUBLIC = ROOT / 'public/images/esercitazioni'
PUBLIC.mkdir(parents=True, exist_ok=True)
(ROOT / 'esercitazioni').mkdir(exist_ok=True)
(ROOT / 'data/esercitazioni').mkdir(exist_ok=True)

def digest(data): return hashlib.sha256(data).hexdigest()
def clean(text): return re.sub(r'\s+', ' ', text).strip()
def display_title(text):
    if text.endswith(' · esempio'): return display_title(text[:-10])+' · esempio'
    if not text.isupper(): return text
    text=text.lower()
    text=text[0].upper()+text[1:]
    for term in ['HTML','HTML5','CSS','CSS3','HTTP','HTTPS','DOM','URL','IP','W3C','CDN','JavaScript','jQuery','Git','GitHub','Bootstrap','Web']:
        text=re.sub(r'\b'+re.escape(term)+r'\b',term,text,flags=re.IGNORECASE)
    return text
_boxes = {}
def raw_rect(shape):
    xf = shape.find('./p:spPr/a:xfrm', NS)
    if xf is None: xf = shape.find('./p:xfrm', NS)
    if xf is None: return [0, 0, 0, 0]
    off, ext = xf.find('a:off', NS), xf.find('a:ext', NS)
    if off is None or ext is None: return [0, 0, 0, 0]
    return [int(off.get('x', 0)), int(off.get('y', 0)), int(ext.get('cx', 0)), int(ext.get('cy', 0))]

def rect(shape): return _boxes.get(id(shape), raw_rect(shape))

def register_boxes(root):
    """Resolve grouped DrawingML coordinates before cropping a PDF figure."""
    _boxes.clear()
    def walk(node, tx=0, ty=0, sx=1, sy=1):
        for child in node:
            if child.tag == '{'+NS['p']+'}grpSp':
                xf=child.find('p:grpSpPr/a:xfrm', NS)
                if xf is None: walk(child,tx,ty,sx,sy);continue
                off,ext,ch_off,ch_ext=[xf.find('a:'+name,NS) for name in ['off','ext','chOff','chExt']]
                if any(v is None for v in [off,ext,ch_off,ch_ext]): walk(child,tx,ty,sx,sy);continue
                gx=int(ext.get('cx'))/max(1,int(ch_ext.get('cx')))
                gy=int(ext.get('cy'))/max(1,int(ch_ext.get('cy')))
                walk(child,tx+sx*(int(off.get('x'))-gx*int(ch_off.get('x'))),ty+sy*(int(off.get('y'))-gy*int(ch_off.get('y'))),sx*gx,sy*gy)
            elif child.tag in ['{'+NS['p']+'}'+tag for tag in ['sp','pic','cxnSp']]:
                x,y,w,h=raw_rect(child)
                _boxes[id(child)]=[tx+sx*x,ty+sy*y,sx*w,sy*h]
            else: walk(child,tx,ty,sx,sy)
    walk(root)

def paragraphs(shape, rels):
    result = []
    for p in shape.findall('./p:txBody/a:p', NS):
        runs = []
        for child in p:
            if child.tag == '{'+NS['a']+'}br': runs.append({'text':'\n'}); continue
            t = child.find('a:t', NS)
            if t is None: continue
            props = child.find('a:rPr', NS)
            run = {'text':t.text or ''}
            if props is not None:
                font = props.find('a:latin', NS)
                if font is not None and font.get('typeface') in ['Fira Code','Source Code Pro','Courier New']: run['mono'] = True
                if props.get('b') == '1': run['bold'] = True
                if props.get('i') == '1': run['italic'] = True
                if props.get('u') and props.get('u') != 'none': run['underline'] = True
                link = props.find('a:hlinkClick', NS)
                if link is not None:
                    url = rels.get(link.get(RID), {}).get('Target', '')
                    if re.match(r'^(https?://|mailto:)', url): run['href'] = url
            runs.append(run)
        text = ''.join(r['text'] for r in runs)
        pp = p.find('a:pPr', NS)
        result.append({'text': text, 'runs': runs,
                       'bullet': pp is not None and (pp.find('a:buChar', NS) is not None or pp.find('a:buAutoNum', NS) is not None),
                       'level': int(pp.get('lvl',0)) if pp is not None else 0})
    return result

def render_region(pdf, page, box, filename, width, height):
    # Render only the source illustration, excluding the old title and footer.
    pagebox = PdfReader(pdf).pages[page-1].mediabox
    scale = 1800 / float(pagebox.width)
    x,y,w,h = box
    left,top = max(0,math.floor(x/width*1800)-6), max(0,math.floor(y/height*float(pagebox.height)*scale)-6)
    right,bottom = min(1800,math.ceil((x+w)/width*1800)+6), math.ceil((y+h)/height*float(pagebox.height)*scale)+6
    with tempfile.TemporaryDirectory() as tmp:
        target = Path(tmp)/'figure'
        subprocess.run(['pdftoppm','-f',str(page),'-l',str(page),'-singlefile','-scale-to-x','1800','-scale-to-y','-1','-x',str(left),'-y',str(top),'-W',str(right-left),'-H',str(bottom-top),'-png',str(pdf),str(target)], check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        from PIL import Image
        Image.open(str(target)+'.png').save(PUBLIC/filename, 'WEBP', lossless=True)
    return '/images/esercitazioni/'+filename

def text_weight(block):
    if block['kind']=='image': return 9
    if block['kind']=='code':
        return max(1,sum(max(1,math.ceil(len(line)/105)) for line in block['text'].split('\n')))*.66 + 1
    return sum(max(1,math.ceil(len(p['text'])/88)) + .4 for p in block['paragraphs'])

for ex in manifest['exercises']:
    if ex.get('replacement') or ex.get('nativeRebuild'):
        print(f"{ex['number']:02}: revisione editoriale attiva; import originale conservato in archivio")
        continue
    original = ROOT/ex['original']
    pdf = original.with_suffix('.pdf')
    source_slides = []
    with ZipFile(original) as z:
        pres = ET.fromstring(z.read('ppt/presentation.xml'))
        size = pres.find('p:sldSz',NS)
        width,height = int(size.get('cx')),int(size.get('cy'))
        files = sorted([s for s in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+.xml',s)], key=lambda s:int(re.search(r'(\d+)\.xml',s)[1]))
        if len(PdfReader(pdf).pages) != len(files): raise ValueError(f"PDF/PPTX page mismatch: {original.name}")
        for number,file in enumerate(files,1):
            root=ET.fromstring(z.read(file))
            register_boxes(root)
            relfile=posixpath.dirname(file)+'/_rels/'+posixpath.basename(file)+'.rels'
            rels={r.get('Id'):r.attrib for r in ET.fromstring(z.read(relfile))} if relfile in z.namelist() else {}
            texts=[]
            for shape in root.findall('.//p:sp',NS):
                ps=paragraphs(shape,rels)
                text='\n'.join(p['text'] for p in ps).strip()
                if not clean(text) or clean(text)=='‹#›': continue
                ph=shape.find('./p:nvSpPr/p:nvPr/p:ph',NS)
                mono_chars=sum(len(run['text']) for p in ps for run in p['runs'] if run.get('mono'))
                texts.append({'kind':'code' if mono_chars/max(1,len(text)) > .55 else 'text','paragraphs':ps,'text':text,'box':rect(shape),'placeholder':ph.get('type','body') if ph is not None else None})
            title_shape=next((t for t in texts if t['placeholder']=='ctrTitle' or (t['placeholder']=='title' and t['box'][1] < height*.32)),None)
            if title_shape is not None: title=clean(title_shape['text'])
            elif source_slides:
                title=source_slides[-1]['title']
                if not title.endswith(' · esempio'): title+=' · esempio'
            else: title=f"Esempio {number}"
            if title_shape is None: title=inferred_titles.get((ex['number'],number),title)
            body=[t for t in texts if t is not title_shape]
            media=[]
            for pic in root.findall('.//p:pic',NS):
                blip=pic.find('.//a:blip',NS)
                target=rels.get(blip.get('{'+NS['r']+'}embed'),{}).get('Target','') if blip is not None else ''
                if not target: continue
                file_path=posixpath.normpath(posixpath.join('ppt/slides',target))
                if file_path not in z.namelist(): continue
                data=z.read(file_path)
                ext=Path(file_path).suffix.lower()
                filename=digest(data)[:20]+ext
                (PUBLIC/filename).write_bytes(data)
                media.append({'kind':'image','src':'/images/esercitazioni/'+filename,'box':rect(pic),'alt':f"{title} · figura della slide originale {number}"})
            # Composite drawings retain relationships that isolated bitmap extraction loses.
            drawing=[s for s in root.findall('.//p:cxnSp',NS) if height*.12 < rect(s)[1] < height*.90]
            shapes=[s for s in root.findall('.//p:sp',NS) if s.find('./p:spPr/a:prstGeom',NS) is not None and not ''.join(s.itertext()).strip() and height*.12 < rect(s)[1] < height*.90 and rect(s)[2]>0 and rect(s)[3]>0]
            if len(shapes)>1: drawing+=shapes
            # Text-only groups are ordinary editable content, not illustrations.
            diagram=bool(drawing or len(media)>1)
            if diagram and number not in (1,len(files)):
                boxes=[m['box'] for m in media]+[rect(s) for s in drawing]
                boxes=[b for b in boxes if b[2]>0 and b[3]>=0 and b[1] < height*.93]
                if boxes:
                    top=min(b[1] for b in boxes); bottom=max(b[1]+b[3] for b in boxes)
                    # Text above the drawing remains native. Only short labels and
                    # annotated snippets in its vertical band belong to the figure.
                    labels=[t for t in body if len(clean(t['text']))<=80 or t['kind']=='code' or (t['box'][1]+t['box'][3] >= top-height*.04 and t['box'][1] <= bottom+height*.04 and len(clean(t['text']))<180)]
                    boxes += [t['box'] for t in labels if t['box'][2]>0 and t['box'][3]>0]
                    x=min(b[0] for b in boxes); y=min(b[1] for b in boxes)
                    right=max(b[0]+b[2] for b in boxes); bottom=min(height*.98,max(b[1]+b[3] for b in boxes))
                    src=render_region(pdf,number,[x,y,right-x,bottom-y],f"{ex['number']:02}-{number:03}-diagram.webp",width,height)
                    media=[{'kind':'image','src':src,'alt':title+'. '+clean(' '.join(t['text'] for t in labels)),'sourceDiagram':True}]
                    links={run['href']: run for block in labels for p in block.get('paragraphs',[]) for run in p['runs'] if run.get('href')}
                    # A diagram can show annotated code and its rendered outcome;
                    # retain a selectable native version of that code as well.
                    body=[t for t in body if t not in labels or t['kind']=='code' or len(clean(t['text']))>40]
                    if links: body.append({'kind':'text','paragraphs':[{'text':run['text'], 'runs':[run], 'bullet':False, 'level':0} for run in links.values()], 'box':[0,0,0,0]})
            # Tables are editable, with every cell retained in reading order.
            for table in root.findall('.//a:tbl',NS):
                rows=[]
                for row in table.findall('a:tr',NS):
                    rows.append(['\n'.join(''.join(n.text or '' for n in p.findall('.//a:t',NS)) for p in cell.findall('.//a:p',NS)) for cell in row.findall('a:tc',NS)])
                if rows: body.append({'kind':'table','rows':rows,'box':[0,0,0,0]})
            body.sort(key=lambda t:(round(t['box'][1]/(height*.035)),t['box'][0]))
            for block in body:
                block.pop('placeholder',None)
                block.pop('box',None)
            for image in media: image.pop('box',None)
            source_slides.append({'sourceSlide':number,'title':title,'blocks':body+media,'originalText':[t['text'] for t in texts],'diagram':diagram})
    ex['sourceSlides']=len(source_slides)
    ex['sha256']=digest(original.read_bytes())
    ex['pdf']=str(pdf.relative_to(ROOT))
    ex['pdfSha256']=digest(pdf.read_bytes())
    (ROOT/f"assets/esercitazioni/{ex['number']:02}-source.json").write_text(json.dumps(source_slides,ensure_ascii=False,indent=2)+'\n')
    # Reflow text and code into sequential teaching slides rather than shrinking them.
    adapted=[]
    mapping=[]
    for s in source_slides:
        if s['sourceSlide']==1:
            parts=[{'kind':'cover','title':ex['title'].split(' - ',1)[-1],'blocks':[]}]
        elif s['sourceSlide']==len(source_slides):
            parts=[{'kind':'closing','title':f"Fine esercitazione {ex['number']:02}",'blocks':[]}]
        else:
            blocks=[]
            for b in s['blocks']:
                if b['kind']=='code':
                    lines=b['text'].split('\n')
                    # Account for wrapped comments and URLs without changing code lines.
                    chunk=[]; visual_lines=0
                    for line in lines:
                        line_height=max(1,math.ceil(len(line)/95))
                        if chunk and visual_lines+line_height>14:
                            blocks.append({**b,'text':'\n'.join(chunk)});chunk=[];visual_lines=0
                        chunk.append(line);visual_lines+=line_height
                    if chunk: blocks.append({**b,'text':'\n'.join(chunk)})
                elif b['kind']=='text':
                    group=[];weight=0
                    for p in b['paragraphs']:
                        if not p['text'].strip(): continue
                        w=max(1,math.ceil(len(p['text'])/88))+.5
                        if group and weight+w>9:
                            blocks.append({'kind':'text','paragraphs':group}); group=[];weight=0
                        group.append(p); weight+=w
                    if group: blocks.append({'kind':'text','paragraphs':group})
                else: blocks.append(b)
            parts=[];current=[];weight=0
            for block in blocks:
                w=8 if block['kind']=='table' else text_weight(block)
                if block['kind']=='image' and current and all(b['kind']=='text' for b in current) and weight<=3:
                    current.append(block);weight+=w;continue
                if current and (weight+w>11 or block['kind']=='image' or current[-1]['kind']=='image'):
                    parts.append({'kind':'content','title':s['title'],'blocks':current});current=[];weight=0
                current.append(block);weight+=w
            if current: parts.append({'kind':'content','title':s['title'],'blocks':current})
            if not parts: parts=[{'kind':'divider','title':s['title'],'blocks':[]}]
        targets=[]
        for i,part in enumerate(parts):
            part['title']=display_title(part['title'])
            no=len(adapted)+1
            part.update({'sourceSlide':s['sourceSlide'],'number':no,'part':i+1,'parts':len(parts)})
            adapted.append(part);targets.append(no)
        mapping.append({'sourceSlide':s['sourceSlide'],'sourceTitle':s['title'],'slides':targets})
    ex['slideCount']=len(adapted)
    ex['mapping']=mapping
    (ROOT/f"data/esercitazioni/{ex['number']:02}.json").write_text(json.dumps(adapted,ensure_ascii=False,indent=2)+'\n')
    md=[]
    for s in adapted:
        cover=s['kind'] in ('cover','divider')
        matter=['layout: default',f"class: {'chapter-slide' if cover else 'content-slide exercise-slide reading-slide'}",f"lesson: {ex['id']}",f"lessonSlide: {s['number']}",f"exerciseNumber: {ex['number']}",f"sourceSlide: {s['sourceSlide']}",f"footer: Esercitazione {ex['number']:02} · Elia Guarnieri"]
        if s['number']==1:matter.append(f"routeAlias: {ex['id']}")
        if cover:
            content=f'<ChapterMetro section="{ex["palette"]}" />\n\n# {html.escape(s["title"])}'
            if s['kind']=='cover':content+='\n\n<p>Elia Guarnieri · elia.guarnieri@unimib.it</p>'
        else:
            content=f'# {html.escape(s["title"])}\n\n<ExerciseContent exercise="{ex["number"]:02}" :slide="{s["number"]}" />'
        md.append('---\n'+'\n'.join(matter)+'\n---\n\n'+content+'\n')
    ex['file']=f"esercitazioni/{ex['number']:02}-{ex['slug']}.md"
    (ROOT/ex['file']).write_text('\n'.join(md))
    print(f"{ex['number']:02}: {len(source_slides)} originali → {len(adapted)} slide")
manifest['sourceSlides']=sum(e['sourceSlides'] for e in manifest['exercises'])
manifest['slideCount']=sum(e['slideCount'] for e in manifest['exercises'])
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
# Embedded originals remain in PPTX; publish only the selected derivatives.
used=set()
for file in (ROOT/'data/esercitazioni').glob('*.json'):
    for slide in json.loads(file.read_text()):
        used.update(Path(b['src']).name for b in slide['blocks'] if b['kind']=='image')
for file in PUBLIC.iterdir():
    if file.is_file() and file.name not in used: file.unlink()
