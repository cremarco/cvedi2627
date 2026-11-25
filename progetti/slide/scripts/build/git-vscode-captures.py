"""Compose the selected-window captures and their documentary annotations."""
import html
import json
import math
from pathlib import Path
import subprocess
import tempfile

ASSETS = Path(__file__).resolve().parents[2] / 'assets/esercitazioni/git'


def magick(*args):
    subprocess.run(['magick', *map(str, args)], check=True)


def toward(center, point, radius_x, radius_y, ellipse=False):
    dx, dy = (b - a for a, b in zip(center, point))
    scaled_x, scaled_y = dx / radius_x, dy / radius_y
    scale = math.hypot(scaled_x, scaled_y) if ellipse else max(abs(scaled_x), abs(scaled_y))
    return center[0] + dx / scale, center[1] + dy / scale


def ring(control, color='#ffd076'):
    x, y, rx, ry = control
    path = []
    # A filled band also works in rasterizers that drop strokes on SVG ellipses.
    for offset, direction in ((3, 1), (-3, -1)):
        vertices = []
        for step in range(64):
            angle = direction * step * math.tau / 64
            vertices.append(f'{x + (rx + offset) * math.cos(angle):.2f},{y + (ry + offset) * math.sin(angle):.2f}')
        path.append('M' + ' L'.join(vertices) + ' Z')
    return f'<path d="{" ".join(path)}" fill="{color}"/>'


def annotation(label):
    text = html.escape(label['text'])
    x, y = label['at']
    color = label.get('color', '#ffd076')
    width = 28 + len(label['text']) * 17
    tag = (
        f'<rect x="{x}" y="{y}" width="{width}" height="54" rx="9" fill="#17181e"/>'
        f'<text x="{x + 13}" y="{y + 36}" font-family="Helvetica" '
        f'font-size="31" font-weight="bold" fill="{color}">{text}</text>'
    )
    control = label.get('control')
    if 'to' not in label and not control:
        return tag

    center = (x + width / 2, y + 27)
    bends = label.get('via', [])
    target = control[:2] if control else label['to']
    start = toward(center, bends[0] if bends else target, width / 2 - 3, 24)
    origin = bends[-1] if bends else start
    # Keep the arrowhead outside the ring and the control it surrounds.
    end = toward(target, origin, control[2] + 7, control[3] + 7, ellipse=True) if control else target
    points = [start, *bends, end]
    angle = math.atan2(end[1] - origin[1], end[0] - origin[0])
    head = [end] + [
        (end[0] - 19 * math.cos(angle + offset), end[1] - 19 * math.sin(angle + offset))
        for offset in (-0.48, 0.48)
    ]
    line = ''.join(stroke(first, second, color) for first, second in zip(points, points[1:]))
    return f'{line}{polygon(head, color)}{ring(control, color) if control else ""}{tag}'


def polygon(vertices, color):
    points = ' '.join(f'{x:.2f},{y:.2f}' for x, y in vertices)
    return f'<polygon points="{points}" fill="{color}"/>'


def stroke(start, end, color):
    x, y = start
    x2, y2 = end
    angle = math.atan2(y2 - y, x2 - x)
    dx, dy = -3.5 * math.sin(angle), 3.5 * math.cos(angle)
    return polygon([(x + dx, y + dy), (x2 + dx, y2 + dy), (x2 - dx, y2 - dy), (x - dx, y - dy)], color)


def compose(record, destination):
    width, height = record['size']
    args = ['-size', f'{width}x{height}', 'xc:#24262c']
    for fragment in record['fragments']:
        x, y, w, h = fragment['crop']
        left, top = fragment['at']
        out_w, out_h = fragment.get('resize', (w, h))
        assert left + out_w <= width and top + out_h <= height
        args += ['(', ASSETS / 'vscode-originali' / fragment['file'],
                 '-crop', f'{w}x{h}+{x}+{y}', '+repage']
        if 'resize' in fragment:
            args += ['-resize', f'{out_w}x{out_h}']
        args += [')', '-geometry', f'+{left}+{top}', '-composite']
    with tempfile.TemporaryDirectory() as tmp:
        if record.get('labels') or record.get('controls'):
            overlay = Path(tmp) / 'annotations.svg'
            markup = ''.join(map(annotation, record.get('labels', [])))
            markup += ''.join(map(ring, record.get('controls', [])))
            overlay.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
                               f'width="{width}" height="{height}">{markup}</svg>')
            args += ['(', '-background', 'none', overlay, ')', '-geometry', '+0+0', '-composite']
        magick(*args, '-strip', '-define', 'webp:lossless=true', destination)


def main():
    output = ASSETS / 'vscode'
    output.mkdir(exist_ok=True)
    for page, record in json.loads((ASSETS / 'vscode.json').read_text()).items():
        compose(record, output / f'{page}.webp')


if __name__ == '__main__':
    main()
