"""Rebuild authentic preview words/documents from retained source fonts and images.

macOS: PYTHONPATH=/private/tmp/comment357-fonttools python3 assets/font-previews/generate.py
Requires fontTools4.67+, Pillow, Swift/CoreText. No network or font installation.
System font binaries remain outside the project; only shaped outlines are emitted.
"""
import argparse, base64, hashlib, io, json, re, subprocess
from pathlib import Path
from xml.sax.saxutils import escape
from fontTools.ttLib import TTCollection, TTFont
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
ASSETS=ROOT/'assets/font-previews'
PUBLIC=ROOT/'public/images/font-previews'
REPORT=ROOT/'reports/font-preview'
for folder in [PUBLIC,REPORT]:folder.mkdir(parents=True,exist_ok=True)
SOURCES=json.loads((ASSETS/'sources.json').read_text())
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--slugs',nargs='+',help='Regenerate only these specimens, preserving the complete catalog and manifest.')
args=parser.parse_args()
selected=set(args.slugs) if args.slugs else None
if selected and selected-{source['slug'] for source in SOURCES}:
 parser.error('Unknown specimen slug: '+', '.join(sorted(selected-{source['slug'] for source in SOURCES})))
FAMILY_OVERRIDES={'Caslon':('Big Caslon','Medium'),'Bodoni':('Bodoni 72','Book'),'Garamond':('EB Garamond','Regular'),'Noto':('Noto Sans','Regular'),'EB Garamond Italic':('EB Garamond','Italic')}
requests=[]
metadata=json.loads((ASSETS/'manifest.json').read_text())['entries'] if selected else []
catalog=json.loads((ROOT/'data/font-previews.json').read_text()) if selected else {}
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def local(path):return ROOT/'public'/path.lstrip('/') if path.startswith('/images/') else Path(path) if path.startswith('/') else ROOT/path
for source in SOURCES:
 if selected and source['slug'] not in selected:continue
 slug=source['slug'];name=source['name'];sample={'src':'/images/font-previews/'+slug+'.svg','alt':('Tipografia, composta in '+name) if source['mode']=='outline' else ('Campione documentario autentico di '+name),'kind':'word' if source['mode']=='outline' else 'document'}
 if source.get('caption'):sample['caption']=source['caption']
 catalog[slug]={'name':name,'aliases':source.get('aliases',[name]),'sample':sample}
 record={'slug':slug,'name':name,'mode':sample['kind'],'sampleText':'Tipografia' if sample['kind']=='word' else None,'note':source.get('note'),'sourceOriginalPreserved':True,'output':sample['src']}
 if source['mode']=='outline':
  path=local(source['binaryPath'])
  fonts=TTCollection(path).fonts if path.suffix.lower()=='.ttc' else [TTFont(path)]
  family,style=FAMILY_OVERRIDES.get(name,(name,source['style'].split(' wght')[0]))
  matches=[f for f in fonts if f['name'].getDebugName(1)==family and f['name'].getDebugName(2)==style]
  if len(matches)!=1:matches=[f for f in fonts if f['name'].getDebugName(2)==style]
  if len(matches)!=1:raise ValueError((name,[(f['name'].getDebugName(1),f['name'].getDebugName(2)) for f in fonts]))
  font=matches[0];ps=font['name'].getDebugName(6)
  sample['alt']='Tipografia, composta in '+font['name'].getDebugName(1)+' '+font['name'].getDebugName(2)
  if not source.get('caption'):sample['caption']=font['name'].getDebugName(1)+' '+font['name'].getDebugName(2)+'.'
  variationDefaults={v.axisTag:v.defaultValue for v in font['fvar'].axes} if 'fvar'in font else {}
  variations=dict(variationDefaults)
  if 'wght' in variations:variations['wght']=400
  requests.append({'slug':slug,'name':name,'path':str(path),'postscriptName':ps,'body':48,'variations':variations or None})
  if variations and not source.get('caption'):
   actualName='EB Garamond Italic' if name=='EB Garamond Italic' else name
   sample['alt']='Tipografia, composta in '+actualName+' (wght 400)'
   sample['caption']=actualName+' · peso 400'+(' · opsz '+str(int(variations['opsz'])) if 'opsz'in variations else '')+'.'
  notices=[]
  if not str(path).startswith('/System/'):
   for license in path.parent.glob('*OFL*'):
    if path.parent.name=='originali' and '-' in license.name and not license.name.startswith(re.sub('[^A-Za-z]','',font['name'].getDebugName(1))):continue
    notices.append({'path':str(license.relative_to(ROOT)),'sha256':sha(license)})
   if not notices:
    notices=[{'path':str(p.relative_to(ROOT)),'sha256':sha(p)} for p in path.parent.glob('*OFL*')]
   if not notices:raise ValueError('Missing retained notice for '+name)
  record.update(sourceOriginal=str(path) if str(path).startswith('/System/') else str(path.relative_to(ROOT)),sourceSha256=sha(path),fontFamily=font['name'].getDebugName(1),fontStyle=font['name'].getDebugName(2),postscriptName=ps,version=font['name'].getDebugName(5),copyright=font['name'].getDebugName(0),unitsPerEm=font['head'].unitsPerEm,variationDefaults={v.axisTag:v.defaultValue for v in font['fvar'].axes} if 'fvar'in font else None,fontBinaryCopied=False,license='Installed macOS font licence; original copyright retained, no open-licence claim' if str(path).startswith('/System/') else 'SIL Open Font License 1.1',licenseNotices=notices)
 else:
  path=local(source['specimen']);data=path.read_bytes();originalPath=path
  if source.get('cropPixels'):
   raster=Image.open(path).crop(tuple(source['cropPixels']));buf=io.BytesIO();raster.save(buf,format='PNG',optimize=True);data=buf.getvalue();record['cropOriginalPixels']=source['cropPixels'];path=path.with_suffix('.png')
  elif name=='Swift':
   originalPath=ROOT/'assets/booklet/tipografia-campioni-uniformi/documenti/swift-lt-poster03-original.png'
   raster=Image.open(originalPath);raster=raster.crop((165,903,574,1031));buf=io.BytesIO();raster.save(buf,format='PNG',optimize=True);data=buf.getvalue();record['cropOriginalPixels']=[165,903,409,128];path=path.with_suffix('.png')
  elif name in ['Chicago','San Francisco','SF Pro','SF Compact','SF Mono']:
   boxes={'Chicago':(500,240,905,346),'San Francisco':(100,108,650,425),'SF Pro':(100,108,278,166),'SF Compact':(174,240,420,296),'SF Mono':(174,372,330,425)}
   raster=Image.open(path).crop(boxes[name]);buf=io.BytesIO();raster.save(buf,format='PNG',optimize=True);data=buf.getvalue();record['cropOriginalPixels']=list(boxes[name]);path=path.with_suffix('.png')
  elif name in ['Golden','Troy','Chaucer']:
   boxes={'Golden':(65,120,425,149),'Troy':(117,150,403,181),'Chaucer':(117,181,390,208)}
   raster=Image.open(path).crop(boxes[name]);buf=io.BytesIO();raster.save(buf,format='PNG',optimize=True);data=buf.getvalue();record['cropOriginalPixels']=list(boxes[name]);path=path.with_suffix('.png')
  if path.suffix.lower()=='.svg':
   svg=data.decode('utf-8')
   viewboxes={'Noto Sans Arabic':(0,142,389,77),'Liberation Mono':(0,70,389,70)}
   if name in viewboxes:
    x,y,w,h=viewboxes[name]
    svg=re.sub(r'viewBox="[^"]+"',f'viewBox="{x} {y} {w} {h}"',svg,count=1)
    svg=re.sub(r'(<svg[^>]*?)width="[^"]+"',r'\1'+f'width="{w}"',svg,count=1)
    svg=re.sub(r'(<svg[^>]*?)height="[^"]+"',r'\1'+f'height="{h}"',svg,count=1)
    record['cropSourceSvgViewBox']=[x,y,w,h]
   # Preserve all original vector geometry and embedded original image bytes.
   svg=re.sub(r'<title[^>]*>.*?</title>','',svg,flags=re.S)
   svg=re.sub(r'<desc[^>]*>.*?</desc>','',svg,flags=re.S)
   svg=re.sub(r'(<svg\b[^>]*>)',r'\1<title>'+escape(name)+' — campione documentario</title><desc>'+escape(sample.get('caption','Campione documentario autentico, tratto dalle fonti conservate nel progetto.'))+'</desc>',svg,count=1)
  else:
   raster=Image.open(io.BytesIO(data));width,height=raster.size;mime='image/png' if data.startswith(b'\x89PNG') else 'image/jpeg'
   encoded=base64.b64encode(data).decode('ascii')
   svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><title>{escape(name)} — campione documentario</title><desc>{escape(sample.get("caption","Campione documentario autentico."))}</desc><image width="{width}" height="{height}" href="data:{mime};base64,{encoded}"/></svg>\n'
  (PUBLIC/(slug+'.svg')).write_text(svg)
  record.update(sourceOriginal=str(originalPath.relative_to(ROOT)),sourceSha256=sha(originalPath),fontBinaryCopied=False,license='Rights and attribution retained in the original cited source manifests; no open-licence claim for commercial specimens',sourceLinks=source.get('sourceLinks'),credit=sample.get('caption'),transformation='Original vector geometry/embedded image preserved; explicit lossless pixel crop when cropOriginalPixels is recorded')
 metadata=[entry for entry in metadata if entry['slug']!=slug]
 metadata.append(record)
inputPath=ASSETS/'outline-input.json'
shaping=[]
if requests:
 inputPath.write_text(json.dumps(requests,ensure_ascii=False,indent=2)+'\n')
 result=subprocess.run(['swift','-module-cache-path','/private/tmp/font-preview-swiftcache',str(ASSETS/'outline.swift'),str(inputPath),str(PUBLIC)],cwd=ROOT,check=True,capture_output=True,text=True)
 shaping=json.loads(result.stdout)
shaped={entry['slug']:entry for entry in shaping}
sourceOrder={source['slug']:index for index,source in enumerate(SOURCES)}
metadata.sort(key=lambda entry:sourceOrder[entry['slug']])
catalog={source['slug']:catalog[source['slug']] for source in SOURCES}
for x in metadata:
 if x['mode']=='word' and x['slug'] in shaped:
  x.update(shaped[x['slug']])
  if x.get('variationDefaults') and not next(y for y in SOURCES if y['slug']==x['slug']).get('caption'):
   currentAxes={**x['variationDefaults'],**x.get('effectiveVariations',{})}
   actualName='EB Garamond Italic' if x['name']=='EB Garamond Italic' else x['name']
   catalog[x['slug']]['sample']['caption']=actualName+' · peso '+str(int(currentAxes.get('wght',400)))+(' · opsz '+str(int(currentAxes['opsz'])) if 'opsz'in currentAxes else '')+'.'
 p=PUBLIC/(x['slug']+'.svg');x.update(outputSha256=sha(p),outputBytes=p.stat().st_size)
(ASSETS/'manifest.json').write_text(json.dumps({'purpose':'Authentic inline font previews; shaped outlines and retained documentary specimens','generator':'assets/font-previews/generate.py','sources':'assets/font-previews/sources.json','fontSoftwareRedistributed':False,'commercialFontBinariesCopied':False,'shaping':'CoreText on macOS: exact source-file font descriptors, CTLine/CTRun positioning and outlines; fails on any fallback run','bodyPx':48,'sample':'Tipografia','entries':metadata},ensure_ascii=False,indent=2)+'\n')
(ROOT/'data/font-previews.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
if requests:(REPORT/'shaping-output.json').write_text(result.stdout)
print(json.dumps({'catalog':len(catalog),'words':sum(x['mode']=='word' for x in metadata),'documents':sum(x['mode']=='document' for x in metadata),'bytes':sum(x['outputBytes'] for x in metadata)}))
