from pathlib import Path
import json, hashlib, shutil
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/'assets/theme-imagegen/lesson-05-icons'
data=json.loads((BASE/'generation-results.json').read_text())
catalog=json.loads((ROOT/'data/card-artwork-local.json').read_text())
jobs=[]
for job in data['jobs']:
    asset_id='percezione-gerarchia-'+job['id']
    original=BASE/'originals'/f"{job['id']}-v1.png"
    original.parent.mkdir(parents=True,exist_ok=True)
    if not original.exists(): shutil.copyfile(job['generatedPath'],original)
    prompt=BASE/'prompts'/f"{job['id']}-v1.txt"
    prompt.parent.mkdir(parents=True,exist_ok=True); prompt.write_text(job['prompt']+'\n')
    web=ROOT/'public'/catalog['assets'][asset_id].lstrip('/')
    web.parent.mkdir(parents=True,exist_ok=True)
    with Image.open(original) as im:
        rgba=im.convert('RGBA')
        assert rgba.getchannel('A').getextrema()==(0,255), job['id']
        rgba.save(web,'WEBP',lossless=True,exact=True)
        with Image.open(web) as published: assert rgba.tobytes()==published.convert('RGBA').tobytes()
        jobs.append(dict(id=asset_id,status='complete',mode='built-in image_gen',original=str(original.relative_to(ROOT)),web=str(web.relative_to(ROOT)),
            prompt=job['prompt'],promptFile=str(prompt.relative_to(ROOT)),sha256=hashlib.sha256(original.read_bytes()).hexdigest(),
            publicationSha256=hashlib.sha256(web.read_bytes()).hexdigest(),dimensions=list(im.size),
            owners=[k for k,v in catalog['mappings']['percezione-gerarchia'].items() if v==asset_id],
            visualReview=dict(status='accepted',date='2026-10-12',notes='Rounded dark green contours, pale fills, coral accent and transparent alpha; meaning reviewed.'),
            publicationEncoding=dict(pixelPreserved=True,alphaPreserved=True)))
(BASE/'manifest.json').write_text(json.dumps(dict(date=data['date'],mode='built-in image_gen',rights='Original illustrations generated for CVeDI with OpenAI ImageGen; original PNGs and exact prompts retained.',
    paletteAuthority='DESIGN.md and styles/tokens.css',counts=dict(images=len(jobs),cardTitles=len(catalog['mappings']['percezione-gerarchia'])),jobs=jobs),ensure_ascii=False,indent=2)+'\n')
print(f'Copied and verified {len(jobs)} ImageGen icons with original alpha.')
