#!/usr/bin/env python3
"""Plan smaller, pixel-identical WebP replacements for the remaining small PNGs."""
import hashlib,json,subprocess,urllib.parse,os
from pathlib import Path
from collections import Counter
from PIL import Image
root=Path('progetti');work=Path(os.environ.get('PNG_WORK','/tmp/cvedi-pages-png-candidates'));work.mkdir(exist_ok=True)
report=Path(os.environ.get('PNG_REPORT','reports/pages-2026-09-30/png-lossless.jsonl'));rows=[];saved=0;n=0
for year in sorted(root.glob('a.a.*')):
 for site in sorted(year.iterdir()):
  if not site.is_dir():continue
  texts=[p for p in site.rglob('*') if p.is_file() and p.suffix.lower() in {'.html','.css','.js','.json','.svg','.xml'}]
  haystack=b'\n'.join(p.read_bytes() for p in texts);counts=Counter(p.name for p in site.rglob('*.png'))
  for p in site.rglob('*.png'):
   size=p.stat().st_size
   if size<int(os.environ.get('PNG_MIN','5000')) or size>=int(os.environ.get('PNG_MAX','100000')) or counts[p.name]!=1:continue
   if not any(s in haystack for s in (p.name.encode(),urllib.parse.quote(p.name).encode())):continue
   try:
    with Image.open(p) as im:
     if getattr(im,'n_frames',1)>1 or im.mode.startswith('I') or abs(im.info.get('gamma',.45455)-.45455)>.0001:continue
     old=im.convert('RGBA').tobytes();icc=im.info.get('icc_profile');dimensions=im.size
    out=work/f'{n}.webp';n+=1
    proc=subprocess.run(['cwebp','-quiet','-lossless','-m','6','-exact','-metadata','all',str(p),'-o',str(out)],capture_output=True)
    if proc.returncode:continue
    newSize=out.stat().st_size
    if newSize>=size*.8 or size-newSize<1000:out.unlink();continue
    with Image.open(out) as im:
     if im.size!=dimensions or im.convert('RGBA').tobytes()!=old or im.info.get('icc_profile')!=icc:out.unlink();continue
    row={'path':p.relative_to(root).as_posix(),'oldBytes':size,'newBytes':newSize,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'candidate':str(out)}
    rows.append(row);saved+=size-newSize
   except Exception as e:print(p,str(e)[:70],flush=True)
  report.write_text(''.join(json.dumps(r,ensure_ascii=False)+'\n' for r in rows))
print(len(rows),'pixel-identical candidates,',saved,'bytes saved',flush=True)
