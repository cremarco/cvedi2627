"""Audit the actual selected PNG/WebP pixels, transparency and review coverage."""
import hashlib
import json
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
manifest = json.loads((root / 'assets/theme-imagegen/manifest-outline-v3.json').read_text())
complete = '--complete' in sys.argv
jobs = manifest['jobs'] if complete else [job for job in manifest['jobs'] if job.get('published')]
assert len(manifest['jobs']) == manifest['counts']['images'] == 44
results = []
for job in jobs:
    assert job['status'] == 'complete' and job['visualReview']['status'] == 'accepted', job['id']
    if complete:
        assert job.get('published'), f"{job['id']}: runtime publication missing"
        assert job['slideReview']['status'] == 'accepted', f"{job['id']}: slide visual review missing"
        assert set(job['slideReview']['modes']) == {'desktop', 'narrow', 'print'}
    original, web = root / job['original'], root / job['web']
    assert hashlib.sha256(web.read_bytes()).hexdigest() == job['sha256']
    assert hashlib.sha256(original.read_bytes()).hexdigest() == job['originalSha256']
    with Image.open(original) as source, Image.open(web) as published:
        rgba = source.convert('RGBA')
        assert rgba.size == published.size
        assert rgba.tobytes() == published.convert('RGBA').tobytes(), f"{job['id']}: RGBA changed"
        alpha = rgba.getchannel('A')
        if job['expectedTransparency']:
            assert alpha.getextrema() == (0, 255), f"{job['id']}: object surfaces must be opaque with transparent exterior"
            box = alpha.getbbox()
            assert box[0] > 0 and box[1] > 0 and box[2] < rgba.width and box[3] < rgba.height, f"{job['id']}: subject touches canvas edge"
        else:
            assert alpha.getextrema() == (255, 255), f"{job['id']}: opaque teaching UI surface changed"
        results.append({'id': job['id'], 'size': list(rgba.size), 'alphaRange': list(alpha.getextrema()), 'rgbaPreserved': True})
report = root / 'reports/outline-v3/files-check.json'
report.parent.mkdir(parents=True, exist_ok=True)
report.write_text(json.dumps({'completeAudit': complete, 'images': len(results), 'results': results}, indent=2) + '\n')
print(json.dumps({'images': len(results), 'completeAudit': complete, 'report': str(report)}))
