"""Convert the booklet cover raster into flat, editable SVG geometry.

One-time authoring utility: requires Pillow, NumPy and vtracer 0.6.15.
The runtime uses the same SVG uploaded to Figma, not this utility.
"""
from pathlib import Path
import sys
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image
import vtracer

ROOT = Path(__file__).resolve().parents[2]
PALETTE = {
    'paper': '#FFFFFF', 'indigo': '#432DD7', 'violet': '#615FFF',
    'teal': '#00BBA7', 'red': '#FB2C36', 'orange': '#FF6900',
    'yellow': '#F0B100', 'pink': '#F6339A',
    'pale-blue': '#C4D6EF', 'pale-yellow': '#F5F4D7', 'gray': '#D1D5DB',
}

source = np.asarray(Image.open(ROOT / 'public/images/manuale-cover-pattern.png').convert('RGB'), dtype=np.int32)
colors = np.array([tuple(bytes.fromhex(c[1:])) for c in PALETTE.values()], dtype=np.int32)
best = np.full(source.shape[:2], np.inf)
indices = np.zeros(source.shape[:2], dtype=np.uint8)
for index, color in enumerate(colors):
    distance = np.sum((source - color) ** 2, axis=2)
    selected = distance < best
    indices[selected] = index
    best[selected] = distance[selected]

ET.register_namespace('', 'http://www.w3.org/2000/svg')
ns = '{http://www.w3.org/2000/svg}'
svg = ET.Element(ns + 'svg', {
    'width': '1741', 'height': '903', 'viewBox': '0 0 1741 903',
})
ET.SubElement(svg, ns + 'rect', {'id': 'paper', 'width': '1741', 'height': '903', 'fill': '#FFFFFF'})
counts = {name: 0 for name in PALETTE}
for index, (name, color) in enumerate(PALETTE.items()):
    if name == 'paper':
        continue
    mask_path = Path(f'/tmp/cvedi-mask-{name}.png')
    traced_path = Path(f'/tmp/cvedi-trace-{name}.svg')
    Image.fromarray(np.where(indices == index, 0, 255).astype(np.uint8)).save(mask_path)
    # Separate binary passes preserve small station dots and palette values;
    # color tracing otherwise merges small dots into neighboring white clusters.
    vtracer.convert_image_to_svg_py(
        str(mask_path), str(traced_path), colormode='binary', mode='spline',
        filter_speckle=3, corner_threshold=60, length_threshold=3.5,
        max_iterations=10, splice_threshold=45, path_precision=2,
    )
    group = ET.SubElement(svg, ns + 'g', {'id': 'metro-' + name})
    for path in ET.parse(traced_path).getroot().findall(ns + 'path'):
        path.set('fill', color)
        counts[name] += 1
        path.set('id', f'{name}-{counts[name]:03d}')
        group.append(path)

output = ROOT / 'assets/metro-map/manuale-metro-traced.svg'
ET.ElementTree(svg).write(output, encoding='utf-8', xml_declaration=True)
(ROOT / 'public/images/manuale-metro-map.svg').write_bytes(output.read_bytes())
print({'output': str(output), 'paths': counts, 'bytes': output.stat().st_size})
