#!/usr/bin/env python3
"""Compare local HTML/CSS resource failures with the pre-compression checkpoint."""
import json,re,os
from pathlib import Path
from urllib.parse import unquote,urlsplit
from bs4 import BeautifulSoup

def audit(root):
 missing=set();checked=0
 for p in root.rglob('*'):
  if not p.is_file() or p.suffix.lower() not in {'.html','.htm','.css'}:continue
  rel=p.relative_to(root).as_posix();text=p.read_text(errors='replace');urls=[]
  if p.suffix.lower()!='.css':
   soup=BeautifulSoup(text,'html.parser')
   for tag in soup.find_all(True):
    for attr in ['src','poster','data-src','data-static','data-gif','data-end-src']:
     if tag.get(attr):urls.append(tag[attr])
    if tag.name=='link' and tag.get('href'):urls.append(tag['href'])
    if tag.get('srcset'):
     srcset=tag['srcset'];matches=re.findall(r'(?:^|,\s*)(\S+)\s+\d+(?:\.\d+)?[wx](?=\s*,|\s*$)',srcset)
     urls+=matches if matches else [srcset]
  urls += [next(v for v in groups if v) for groups in re.findall(r'''url\(\s*(?:'([^']+)'|"([^"]+)"|([^)\s]+))\s*\)''',text)]
  for url in urls:
   url=url.strip();parsed=urlsplit(url)
   if parsed.scheme or url.startswith('//') or not parsed.path or any(s in url for s in ['${','{{','<%']):continue
   filename=unquote(parsed.path)
   if filename.startswith('/'):
    target=root/filename.lstrip('/') if filename.lstrip('/').startswith('a.a.') else root/Path(rel).parts[0]/Path(rel).parts[1]/filename.lstrip('/')
   else:target=p.parent/filename
   checked+=1
   if not target.exists():missing.add((rel,filename))
 return checked,missing

root=Path('progetti').resolve();backup=Path('/tmp/cvedi-pages-before-compression')
old_checked,old=audit(backup);checked,current=audit(root)
def normalized(pair):
 page,url=pair
 return page,re.sub(r'\.pages\.(?:webp|avif)|\.lossless\.webp','',url)
old_names={normalized(pair) for pair in old}
new=sorted(pair for pair in current if normalized(pair) not in old_names)
report={'checked':checked,'missingBefore':len(old),'missingNow':len(current),'newMissing':new}
Path('reports/pages-2026-09-30/assets-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False))
raise SystemExit(bool(new))
