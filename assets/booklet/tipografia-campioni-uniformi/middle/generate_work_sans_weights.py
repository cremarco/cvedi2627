from pathlib import Path
import hashlib
import json
import sys

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


DIRECTORY = Path(__file__).resolve().parent
SOURCE = DIRECTORY.parents[1] / "tipografia-variabile/WorkSansVF.ttf"
SAMPLE = sys.argv[1] if len(sys.argv) > 1 else "Aag"


def main():
    original = TTFont(SOURCE)
    samples = []
    for weight in (400, 550, 700):
        instance = instantiateVariableFont(original, {"wght": weight}, inplace=False)
        glyph_set = instance.getGlyphSet()
        mapping = instance.getBestCmap()
        scale = 36 / instance["head"].unitsPerEm
        advance = 0
        paths = []
        bounds = []
        for character in SAMPLE:
            name = mapping[ord(character)]
            transform = (scale, 0, 0, -scale, advance * scale, 31.2)
            drawing = SVGPathPen(glyph_set)
            glyph_set[name].draw(TransformPen(drawing, transform))
            boundary = BoundsPen(glyph_set)
            glyph_set[name].draw(TransformPen(boundary, transform))
            paths.append('<path d="' + drawing.getCommands() + '"/>')
            bounds.append(boundary.bounds)
            advance += instance["hmtx"].metrics[name][0]
        left = min(0, min(bound[0] for bound in bounds)) - 1
        right = max(advance * scale, max(bound[2] for bound in bounds)) + 1
        assert min(bound[1] for bound in bounds) >= 0
        assert max(bound[3] for bound in bounds) <= 54
        width = right - left
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="54" viewBox="{left} 0 {width} 54"><g fill="#30323a">' + "".join(paths) + "</g></svg>"
        filename = f"work-sans-{SAMPLE}-wght-{weight}.svg"
        (DIRECTORY / filename).write_text(svg + "\n")
        samples.append({"file": filename, "weight": weight, "text": SAMPLE, "fontSize": 36, "baseline": 31.2, "bandHeight": 54, "viewBox": [left, 0, width, 54], "glyphBounds": bounds, "copyright": original["name"].getDebugName(0), "postscriptName": original["name"].getDebugName(6), "licensePath": "assets/booklet/tipografia-variabile/OFL.txt", "sha256": hashlib.sha256((svg + "\n").encode()).hexdigest()})
    manifest = {"family": "Work Sans", "version": original["name"].getDebugName(5), "source": str(SOURCE), "sourceSha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(), "primaryUrl": "https://github.com/google/fonts/tree/main/ofl/worksans", "license": "SIL OFL 1.1; original license preserved in tipografia-variabile/OFL.txt", "method": "fontTools.varLib.instancer, original advances; no horizontal stretch or tracking", "samples": samples}
    manifest_filename = "work-sans-weights-manifest.json" if SAMPLE == "Aag" else "work-sans-Aa-weights-manifest.json"
    (DIRECTORY / manifest_filename).write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({str(sample["weight"]): (DIRECTORY / sample["file"]).read_text() for sample in samples}))


if __name__ == "__main__":
    main()
