#!/usr/bin/env python3
"""Apply verified media candidates only when their original input still matches."""
import hashlib,json,re,shutil,urllib.parse
from collections import defaultdict
from pathlib import Path

root=Path('progetti'); report=Path('reports/pages-2026-09-30')
applied=[]; names=defaultdict(dict)
def rows(filename):
 return [json.loads(line) for line in (report/filename).read_text().splitlines()]
def matches(p,row):
 return p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==row['sha256']

for row in rows('jpeg.jsonl'):
 if row.get('status')!='candidate':continue
 p=root/row['path']
 if matches(p,row):
  shutil.copy2(row['candidate'],p); applied.append({**row,'kind':'jpeg'})

for row in rows('png-lossless.jsonl'):
 p=root/row['path']; dest=p.with_name(p.name+'.lossless.webp')
 if not matches(p,row) or dest.exists():continue
 shutil.copy2(row['candidate'],dest); p.unlink()
 names[Path(*Path(row['path']).parts[:2])][p.name]=dest.name
 applied.append({**row,'kind':'png','target':dest.relative_to(root).as_posix()})

for site,mapping in names.items():
 pairs={}
 for old,new in mapping.items():
  pairs[old]=new; pairs[urllib.parse.quote(old)]=urllib.parse.quote(new)
 pattern=re.compile(r'(?<![A-Za-z0-9_.-])(?:'+'|'.join(re.escape(s) for s in sorted(pairs,key=len,reverse=True))+r')(?![A-Za-z0-9_.-])')
 for p in (root/site).rglob('*'):
  if not p.is_file() or p.suffix.lower() not in {'.html','.htm','.css','.js','.json','.xml','.svg'}:continue
  data=p.read_text(); new=pattern.sub(lambda m:pairs[m[0]],data)
  if new!=data:
   def hint(m):
    tag=m[0]
    return re.sub(r'''\s+type\s*=\s*(?:"image/[^" ]+"|'image/[^' ]+'|image/[^\s>]+)''','',tag,flags=re.I) if '.lossless.' in tag or '.pages.' in tag else tag
   new=re.sub(r'<(?:source|link)\b[^>]*>',hint,new,flags=re.I)
   p.write_text(new)

for row in rows('svg-rasters.jsonl'):
 if row.get('status')!='candidate':continue
 p=root/row['path']; data=p.read_text(); new=data
 for pair in json.loads(Path(row['replacements']).read_text()):new=new.replace(pair['before'],pair['after'])
 if new!=data:
  p.write_text(new);applied.append({**row,'kind':'svg-raster','oldBytes':len(data.encode()),'newBytes':len(new.encode())})

(report/'applied-candidates.json').write_text(json.dumps(applied,ensure_ascii=False,indent=2))
for kind in ['jpeg','png','svg-raster']:
 group=[r for r in applied if r['kind']==kind]
 print(kind,len(group),'files;',sum(r['oldBytes']-r['newBytes'] for r in group),'bytes saved')
