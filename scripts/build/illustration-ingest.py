"""Retain an ImageGen original and encode lossless WebP without changing pixels."""
import hashlib
import json
import shutil
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
manifest_path = root / 'assets/theme-imagegen/manifest-outline-v3.json'
manifest = json.loads(manifest_path.read_text())
job = next(job for job in manifest['jobs'] if job['id'] == sys.argv[1])
source = Path(sys.argv[2])
if len(sys.argv) > 3 and sys.argv[3] == '--repair':
    prior = {key: job.get(key) for key in ['original', 'web', 'generatedSource', 'prompt', 'sha256', 'visualReview']}
    job.setdefault('attempts', []).append(prior)
    revision = len(job['attempts']) + 1
    job['original'] = f"assets/theme-imagegen/originals/{job['id']}-v3-r{revision}.png"
    job['web'] = str(Path(job['web']).with_name(f"{job['id']}-v3-r{revision}.webp"))
original = root / job['original']
web = root / job['web']
original.parent.mkdir(parents=True, exist_ok=True)
web.parent.mkdir(parents=True, exist_ok=True)
if original.exists():
    raise SystemExit(f'Original already retained: {original}; use a new version for repairs')
shutil.copy2(source, original)
with Image.open(original) as image:
    rgba = image.convert('RGBA')
    rgba.save(web, format='WEBP', lossless=True, exact=True, method=6)
    with Image.open(web) as encoded:
        decoded = encoded.convert('RGBA')
        assert decoded.size == rgba.size
        assert decoded.tobytes() == rgba.tobytes(), 'WebP changes source RGBA pixels'
    alpha = rgba.getchannel('A')
    extrema = alpha.getextrema()
    transparent = alpha.histogram()[0]
    job.update({
        'status': 'generated', 'generatedSource': str(source),
        'prompt': (root / f"assets/theme-imagegen/prompts/{job['id']}-v3.txt").read_text(),
        'promptFile': f"assets/theme-imagegen/prompts/{job['id']}-v3.txt",
        'dimensions': list(rgba.size), 'webBytes': web.stat().st_size,
        'sha256': hashlib.sha256(web.read_bytes()).hexdigest(),
        'originalSha256': hashlib.sha256(original.read_bytes()).hexdigest(),
        'alpha': {'range': list(extrema), 'transparentPixels': transparent, 'bounds': list(alpha.getbbox() or [])},
        'publicationEncoding': {'format': 'WebP', 'lossless': True, 'pixelPreserved': True, 'alphaPreserved': True},
    })
job.pop('generationHandle', None)
job.pop('generationPrompt', None)
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({key: job[key] for key in ['id', 'status', 'dimensions', 'alpha', 'webBytes']}))
