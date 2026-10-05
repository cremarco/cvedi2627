#!/usr/bin/env python3
"""Rebuild image references from the checkpoint with complete filename mappings."""
import json,re,shutil,urllib.parse
from pathlib import Path
from collections import defaultdict
root=Path('progetti');backup=Path('/tmp/cvedi-pages-before-compression');report=Path('reports/pages-2026-09-30')
rows=[]
for filename in ['images-phase1.jsonl','images-phase2.jsonl','images.jsonl']:
 rows += [json.loads(line) for line in (report/filename).read_text().splitlines()]
renames={r['path']:r['target'] for r in rows if r['status']=='replaced' and r['path']!=r['target']}

def final(relative):
 seen=set()
 while relative in renames and relative not in seen:
  seen.add(relative);relative=renames[relative]
 return relative

# Gallery thumbnails and dynamically constructed filenames stay in their original format.
restored=[]
text_cache={}
for original in backup.rglob('*.webp'):
 rel=original.relative_to(backup).as_posix();target=final(rel)
 site=backup/Path(rel).parts[0]/Path(rel).parts[1]
 if site not in text_cache:text_cache[site]=b'\n'.join(p.read_bytes() for p in site.rglob('*') if p.is_file() and p.suffix.lower() in {'.html','.css','.js','.json','.svg','.xml'})
 text=text_cache[site]
 name=original.name
 literal=any(n in text for n in (name.encode(),urllib.parse.quote(name).encode()))
 if name=='screenshot.webp' or (target!=rel and not literal):
  if target!=rel and (root/target).exists():(root/target).unlink()
  shutil.copy2(original,root/rel);restored.append(rel)

mappings={};changed=0
for year in sorted(backup.glob('a.a.*')):
 for site in sorted(year.iterdir()):
  if not site.is_dir():continue
  groups=defaultdict(list)
  for p in site.rglob('*'):
   if p.is_file() and p.suffix.lower() in {'.webp','.png','.jpg','.jpeg'}:groups[p.name].append(p)
  names={}
  for name,group in groups.items():
   destinations=[root/final(p.relative_to(backup).as_posix()) for p in group]
   if all(not (root/p.relative_to(backup)).exists() and dest.exists() for p,dest in zip(group,destinations)) and len({p.name for p in destinations})==1:
    names[name]=destinations[0].name
  mappings[site.relative_to(backup).as_posix()]=names
  for original in site.rglob('*'):
   if not original.is_file() or original.suffix.lower() not in {'.html','.css','.js','.json','.svg','.xml','.htm'}:continue
   p=root/original.relative_to(backup)
   if not p.exists():continue
   data=original.read_text(errors='strict')
   for old,new in sorted(names.items(),key=lambda pair:-len(pair[0])):
    for a,b in {(old,new),(urllib.parse.quote(old),urllib.parse.quote(new))}:
     data=re.sub(r'(?<![A-Za-z0-9_.-])'+re.escape(a)+r'(?![A-Za-z0-9_.-])',lambda _:b,data)
   # MIME hints are optional; mixed responsive candidates can now use WebP and AVIF.
   def hint(tag):
    if '.pages.' not in tag.group(0) and '.lossless.' not in tag.group(0):return tag.group(0)
    return re.sub(r'''\s+type\s*=\s*(?:"image/[^" ]+"|'image/[^' ]+'|image/[^\s>]+)''','',tag.group(0),flags=re.I)
   data=re.sub(r'<(?:source|link)\b[^>]*>',hint,data,flags=re.I)
   if data!=p.read_text():p.write_text(data);changed+=1
p=root/'a.a.2024_2025/AstroMed/css/companion-styles.css';s=p.read_text();s=re.sub(r'''(url\(\s*['"]?)/img/robot-info.webp''',r'\1../img/robot-info.webp',s);p.write_text(s)
(report/'image-reference-mappings.json').write_text(json.dumps(mappings,ensure_ascii=False,indent=2))
(report/'preserved-original-formats.json').write_text(json.dumps(restored,ensure_ascii=False,indent=2))
print('Updated',changed,'text files;',len(restored),'thumbnails/dynamic formats retained')
