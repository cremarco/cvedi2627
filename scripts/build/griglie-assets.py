"""Prepare self-contained SVG figures for the Griglie e layout slides.

Original booklet assets and their non-text geometry remain untouched. The web
copies replace SVG text with authentic outlines from the locally preserved DM
Sans variable font, shaped by HarfBuzz. This works inside Chromium <img>, where
SVG-embedded @font-face is unavailable. Requires fonttools and uharfbuzz.

Both source family names resolve to the preserved font's 9pt optical master:
this is its default opsz and the named DM Sans 9pt instance used by the booklet.
The source font-size, weight, baseline, text anchor, spacing and transforms are
retained. U+25A1 in figure 398 is a semantic empty checkbox; DM Sans has no glyph
for it, so this explicitly documented symbol becomes a geometric square rather
than a missing glyph or a falsely attributed font outline.
"""
from pathlib import Path
from functools import lru_cache
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import uharfbuzz as hb

ROOT = Path(__file__).resolve().parents[2]
CATALOG = 'assets/images/figure/griglia/manifest.json'
FONT = 'assets/fonts/editoriali/dm-sans-variabile.ttf'
LICENSE = 'assets/fonts/editoriali/dm-sans-licenza.txt'
OUTPUT = ROOT / 'assets/images/figure/griglia-slidev'
MANIFEST = ROOT / 'assets/booklet/lezione-griglie/image-manifest.json'
SVG = 'http://www.w3.org/2000/svg'
TEXT_TAGS = {'text', 'tspan'}
FONT_PROPERTIES = {'font-family', 'font-size', 'font-weight', 'letter-spacing',
                   'text-anchor', 'font-variation-settings', 'font-optical-sizing'}
DEFAULTS = {'font-family': 'DM Sans', 'font-size': '16', 'font-weight': '400',
            'letter-spacing': '0', 'text-anchor': 'start'}
ET.register_namespace('', SVG)
ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')


def sha(data):
    return hashlib.sha256(data).hexdigest()


def tag(node):
    return node.tag.rsplit('}', 1)[-1]


def number(value):
    return format(float(value), '.12g')


def length(value, font_size=1):
    """Resolve the source's unitless/px lengths and em letter spacing."""
    value = str(value).strip()
    match = re.fullmatch(r'([-+]?(?:\d*\.)?\d+)(px|em)?', value)
    assert match, f'Unsupported source SVG length: {value!r}'
    return float(match[1]) * (font_size if match[2] == 'em' else 1)


def properties(node, inherited):
    result = dict(inherited)
    result.update({k: v for k, v in node.attrib.items() if k in FONT_PROPERTIES})
    for declaration in node.get('style', '').split(';'):
        if ':' in declaration:
            name, value = declaration.split(':', 1)
            if name.strip() in FONT_PROPERTIES:
                result[name.strip()] = value.strip()
    return result


def visual_attributes(node):
    # Font and position attributes do not affect groups. Keep all paint, opacity,
    # clip, identifiers and transforms on the same node in the source hierarchy.
    removed = FONT_PROPERTIES | {'x', 'y', 'dx', 'dy', 'rotate', 'textLength',
                                 'lengthAdjust', '{http://www.w3.org/XML/1998/namespace}space'}
    attrs = {k: v for k, v in node.attrib.items() if k not in removed}
    if 'style' in attrs:
        declarations = []
        for item in attrs['style'].split(';'):
            if not item.strip():
                continue
            name = item.split(':', 1)[0].strip()
            if name not in FONT_PROPERTIES | {'white-space'}:
                declarations.append(item.strip())
        if declarations:
            attrs['style'] = ';'.join(declarations)
        else:
            del attrs['style']
    return attrs


class Outliner:
    def __init__(self):
        self.font_bytes = (ROOT / FONT).read_bytes()
        self.font = TTFont(ROOT / FONT, recalcTimestamp=False)
        self.face = hb.Face(self.font_bytes)
        self.upem = self.font['head'].unitsPerEm
        self.cmap = self.font.getBestCmap()
        self.order = self.font.getGlyphOrder()
        self.axes = {a.axisTag: a for a in self.font['fvar'].axes}
        self.reset()

    def reset(self):
        self.families = set()
        self.variations = set()
        self.characters = set()
        self.geometric_symbols = []
        self.run_count = 0
        self.glyph_count = 0

    @lru_cache(maxsize=None)
    def font_instance(self, wght, opsz):
        location = {'wght': wght, 'opsz': opsz}
        shaper = hb.Font(self.face)
        shaper.scale = (self.upem, self.upem)
        shaper.set_variations(location)
        return shaper, self.font.getGlyphSet(location=location)

    def run(self, value, props, x, y, attrs, code):
        # Figma stores a trailing newline in multiline tspans. Line positions
        # are already explicit in x/y, so the control itself has no glyph.
        value = value.replace('\r', '').replace('\n', '').replace('\t', ' ')
        family = props['font-family'].strip('"\' ')
        assert family in {'DM Sans', 'DM Sans 9pt'}, (code, family)
        self.families.add(family)
        size = length(props['font-size'])
        weight = float({'normal': '400', 'bold': '700'}.get(props['font-weight'], props['font-weight']))
        # Source exports have no optical override. Use the original 9pt instance,
        # and honour explicit axis settings if future source figures declare them.
        optical = self.axes['opsz'].defaultValue
        for axis, setting in re.findall(r'["\']([A-Za-z0-9]{4})["\']\s+([-+.\d]+)',
                                        props.get('font-variation-settings', '')):
            if axis == 'wght':
                weight = float(setting)
            elif axis == 'opsz':
                optical = float(setting)
            else:
                raise AssertionError(f'Unsupported variation axis {axis} in {code}')
        for axis, val in {'wght': weight, 'opsz': optical}.items():
            assert self.axes[axis].minValue <= val <= self.axes[axis].maxValue, (code, axis, val)
        self.variations.add((weight, optical))
        self.characters.update(value)
        scale = size / self.upem
        anchor = props.get('text-anchor', 'start')
        assert anchor in {'start', 'middle', 'end'}, (code, anchor)
        group = ET.Element(f'{{{SVG}}}g', attrs)
        self.run_count += 1
        if not value:
            return group, 0
        if value == '\u25a1':
            # A semantic checkbox is not supplied by DM Sans. Its own group and
            # manifest record name the geometric construction, never a font glyph.
            advance = 750.0
            offset = {'start': 0, 'middle': -advance / 2, 'end': -advance}[anchor]
            d = f'M{number(75 + offset)} 0h650v650h-650Z M{number(135 + offset)} 60v530h530V60Z'
            ET.SubElement(group, f'{{{SVG}}}path', {
                'd': d, 'transform': f'translate({number(x)} {number(y)}) scale({number(scale)} {number(-scale)})',
                'fill-rule': 'evenodd', 'data-geometric-symbol': 'empty-checkbox'})
            self.geometric_symbols.append(dict(character=value, unicode='U+25A1',
                role='empty-checkbox', sourceFigure=code, sourcePosition=dict(x=x, y=y),
                construction='Geometric square, 0.65em side and 0.06em border; source baseline and text slot preserved.',
                reason='The preserved DM Sans font has no U+25A1 glyph; no font attribution applies to this symbol.'))
            return group, advance * scale
        missing = sorted({c for c in value if not c.isspace() and ord(c) not in self.cmap})
        assert not missing, f'{code}: missing Unicode glyphs: {missing!r}'
        shaper, glyph_set = self.font_instance(weight, optical)
        buffer = hb.Buffer()
        buffer.add_str(value)
        buffer.guess_segment_properties()
        spacing = length(props.get('letter-spacing', '0'), size) / scale
        hb.shape(shaper, buffer, {'kern': True, 'liga': not bool(spacing), 'clig': not bool(spacing)})
        infos, positions = buffer.glyph_infos, buffer.glyph_positions
        assert all(info.codepoint != 0 for info in infos), f'{code}: HarfBuzz emitted .notdef for {value!r}'
        advance = sum(pos.x_advance for pos in positions)
        cluster_breaks = sum(infos[i].cluster != infos[i + 1].cluster for i in range(len(infos) - 1))
        advance += cluster_breaks * spacing
        pen_x = {'start': 0, 'middle': -advance / 2, 'end': -advance}[anchor]
        pen_y = 0
        pen = SVGPathPen(glyph_set)
        for i, (info, pos) in enumerate(zip(infos, positions)):
            name = self.order[info.codepoint]
            assert name != '.notdef', (code, value)
            glyph_set[name].draw(TransformPen(pen, (1, 0, 0, 1,
                pen_x + pos.x_offset, pen_y + pos.y_offset)))
            pen_x += pos.x_advance
            pen_y += pos.y_advance
            if i + 1 < len(infos) and info.cluster != infos[i + 1].cluster:
                pen_x += spacing
        path = pen.getCommands()
        if path:
            ET.SubElement(group, f'{{{SVG}}}path', {'d': path,
                'transform': f'translate({number(x)} {number(y)}) scale({number(scale)} {number(-scale)})'})
        self.glyph_count += len(infos)
        return group, advance * scale

    def text(self, node, props, code):
        group = ET.Element(f'{{{SVG}}}g', visual_attributes(node))
        group.set('data-outlined-source-text', 'true')
        group.tail = node.tail
        x, y = length(node.get('x', '0')), length(node.get('y', '0'))
        # Every exported tspan has explicit x/y; material figures use a text x/y.
        # Keep those baselines exactly instead of reconstructing a line height.
        if node.text and (not len(node) or node.text.strip()):
            run, advance = self.run(node.text, props, x, y, {}, code)
            group.append(run)
            x += advance
        for child in node:
            assert tag(child) == 'tspan' and not len(child), (code, child.tag)
            assert not child.tail or not child.tail.strip(), (code, child.tail)
            assert not any(a in child.attrib for a in ('dx', 'dy', 'rotate', 'textLength')), (code, child.attrib)
            x, y = length(child.get('x', str(x))), length(child.get('y', str(y)))
            run, advance = self.run(child.text or '', properties(child, props), x, y,
                                    visual_attributes(child), code)
            group.append(run)
            x += advance
        return group

    def outline(self, svg, code):
        self.reset()
        # Retain identity and attributes of every existing non-text node. This
        # also asserts that image data, dimensions, guides and transforms survive.
        existing = [(node, dict(node.attrib), node.text, node.tail)
                    for node in svg.iter() if tag(node) not in TEXT_TAGS]
        def visit(parent, inherited):
            props = properties(parent, inherited)
            for index, child in enumerate(list(parent)):
                if tag(child) == 'text':
                    parent.remove(child)
                    parent.insert(index, self.text(child, properties(child, props), code))
                else:
                    visit(child, props)
        visit(svg, DEFAULTS)
        for node, attrs, text, tail in existing:
            assert node.attrib == attrs and node.text == text and node.tail == tail, (code, tag(node))
        assert not any(tag(node) in TEXT_TAGS for node in svg.iter()), f'{code}: residual SVG text'
        return ET.tostring(svg, encoding='utf-8', xml_declaration=False)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    outliner = Outliner()
    records = []
    images = json.loads((ROOT / CATALOG).read_text())['immagini']
    # This dedicated directory contains generated derivatives only. Remove
    # the previous generic names and regenerate their collision-free names.
    for image in images:
        for name in (f'{image["codice"]}.svg', f'griglie-{image["codice"]}-testo-tracciato.svg'):
            (OUTPUT / name).unlink(missing_ok=True)
    for image in images:
        source = image['percorso']
        original = (ROOT / source).read_bytes()
        data, fonts, symbols = original, [], []
        target = source
        verification = None
        if source.endswith('.svg'):
            svg = ET.fromstring(original)
            if any(tag(node) == 'text' for node in svg.iter()):
                data = outliner.outline(svg, image['codice'])
                target = f'assets/images/figure/griglia-slidev/griglie-{image["codice"]}-testo-tracciato.svg'
                (ROOT / target).write_bytes(data)
                fonts = [dict(source=FONT, font=FONT,
                    sourceSha256=sha(outliner.font_bytes), sha256=sha(outliner.font_bytes),
                    license=LICENSE, licenseSha256=sha((ROOT / LICENSE).read_bytes()),
                    families=sorted(outliner.families),
                    variations=[dict(wght=w, opsz=o) for w, o in sorted(outliner.variations)],
                    opticalSizePolicy='Original default 9pt optical master unless explicitly overridden in source.',
                    outlinedCharacters=''.join(sorted(outliner.characters - {'\u25a1'})),
                    shaping='HarfBuzz; kerning and standard ligatures; original per-tspan baselines.')]
                symbols = outliner.geometric_symbols
                verification = dict(residualTextNodes=0, missingGlyphs=0,
                    sourceTextRuns=outliner.run_count, shapedGlyphs=outliner.glyph_count,
                    unchangedNonTextGeometry=True)
        record = dict(code=image['codice'], source=source,
                      web=target.replace('assets/images/', '/images/shared/', 1),
                      sourceSha256=sha(original), sha256=sha(data), fonts=fonts,
                      transformation='outlined-source-text' if fonts else 'identical-bytes')
        if symbols:
            record['geometricSymbols'] = symbols
        if verification:
            record['verification'] = verification
        records.append(record)
    MANIFEST.write_text(json.dumps(dict(version=1, sourceCatalog=CATALOG,
                                       generator='scripts/build/griglie-assets.py',
                                       shapingEngine=f'HarfBuzz {hb.version_string()}',
                                       images=records), ensure_ascii=False, indent=2) + '\n')
    print(f'Griglie: {len(records)} figure; {sum(bool(r["fonts"]) for r in records)} SVG with outlined source text.')
    print('Verified: no residual text/tspan, no missing glyphs, all original non-text geometry retained.')
    print(f'Explicit geometric symbols: {sum(len(r.get("geometricSymbols", [])) for r in records)} empty checkboxes (figure 398).')


if __name__ == '__main__':
    main()
