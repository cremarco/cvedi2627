"""Prepare static diagram instances from the retained slide WOFF2.

Run only when refreshing the font receipts, with fontTools and Brotli installed.
Ordinary deck builds use the retained TTF files and need neither dependency.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
import hashlib
import json

base = Path(__file__).resolve().parent
root = base.parents[6]
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
source = base / 'nunito-sans-latin-wght-normal.woff2'
font = TTFont(source, recalcTimestamp=False)
font.flavor = None
variable = base / 'nunito-sans-variabile.ttf'
font.save(variable)
family = 'CVeDI Diagram Sans'
manifest = dict(source=str(source.relative_to(root)), sourceSha256=sha(source),
                ttf=str(variable.relative_to(root)), ttfSha256=sha(variable), family=family,
                license=str((base / 'OFL-NunitoSans.txt').relative_to(root)),
                licenseSha256=sha(base / 'OFL-NunitoSans.txt'), instances=[],
                conversion='fontTools: WOFF2 to TTF, then static wght 400/600/700. '
                           'Glyphs match the same web weights; the derived family is renamed CVeDI Diagram Sans.')
for weight, style in [(400, 'Regular'), (600, 'SemiBold'), (700, 'Bold')]:
    instance = instantiateVariableFont(TTFont(variable, recalcTimestamp=False), {'wght': weight}, inplace=False)
    names = {1: family, 2: style, 3: 'CVeDIDiagramSans-' + style,
             4: family + ' ' + style, 6: 'CVeDIDiagramSans-' + style, 16: family, 17: style}
    for key, value in names.items():
        instance['name'].setName(value, key, 3, 1, 0x409)
        instance['name'].setName(value, key, 1, 0, 0)
    instance['OS/2'].usWeightClass = weight
    instance['OS/2'].fsSelection = (1 << 6) if weight == 400 else ((1 << 5) if weight == 700 else 0)
    instance['head'].macStyle = 1 if weight == 700 else 0
    target = base / ('cvedi-nunito-sans-' + str(weight) + '.ttf')
    instance.save(target)
    manifest['instances'].append(dict(weight=weight, file=str(target.relative_to(root)), sha256=sha(target)))
(base / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
