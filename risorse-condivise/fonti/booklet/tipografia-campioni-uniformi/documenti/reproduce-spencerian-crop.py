import hashlib
import json
from pathlib import Path

from PIL import Image


asset_directory = Path(__file__).resolve().parent
source_path = asset_directory / "spencerian-msj1885-p54-original.jpg"
crop_path = asset_directory / "spencerian-msj1885-p54-spencerian-crop.png"
crop_box = (2095, 2262, 2433, 2357)
assert hashlib.sha256(source_path.read_bytes()).hexdigest() == "3f0912919c919bf98537c5493b32eb783de7411b19f146e37e2a9082141c0f4d"

with Image.open(source_path) as source_image:
    source_image.load()
    assert source_image.mode == "L"
    assert source_image.size == (2780, 3802)
    crop_image = source_image.crop(crop_box)
    crop_image.save(crop_path, optimize=True)
    assert crop_image.tobytes() == source_image.crop(crop_box).tobytes()
    ink_mask = crop_image.point(lambda intensity: 255 if intensity < 180 else 0)
    ink_bounds = ink_mask.getbbox()
    print(json.dumps({
        "sourceDimensions": list(source_image.size),
        "sourceMode": source_image.mode,
        "sourceSha256": hashlib.sha256(source_path.read_bytes()).hexdigest(),
        "cropBox": list(crop_box),
        "cropDimensions": list(crop_image.size),
        "cropSha256": hashlib.sha256(crop_path.read_bytes()).hexdigest(),
        "cropInkBoundsThreshold180": list(ink_bounds),
        "decodedPixelsIdentical": True,
    }, indent=2))
