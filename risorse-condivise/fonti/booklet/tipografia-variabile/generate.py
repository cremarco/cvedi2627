from pathlib import Path
import hashlib
import json
import xml.etree.ElementTree as ElementTree

import fontTools
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


DIRECTORY = Path(__file__).resolve().parent
WEIGHTS = (400, 550, 700)
FONT_SIZE = 40
PADDING = 1
FILL = "#30323a"


def number(value):
    return format(value, ".5f").rstrip("0").rstrip(".") if value else "0"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    original_path = DIRECTORY / "WorkSansVF.ttf"
    license_path = DIRECTORY / "OFL.txt"
    original_font = TTFont(original_path)
    units_per_em = original_font["head"].unitsPerEm
    scale = FONT_SIZE / units_per_em
    axes = [
        {
            "tag": axis.axisTag,
            "minimum": axis.minValue,
            "default": axis.defaultValue,
            "maximum": axis.maxValue,
        }
        for axis in original_font["fvar"].axes
    ]
    assert axes == [{"tag": "wght", "minimum": 100.0, "default": 400.0, "maximum": 900.0}]
    records = []
    for weight in WEIGHTS:
        instance = instantiateVariableFont(original_font, {"wght": weight}, inplace=False)
        glyph_set = instance.getGlyphSet()
        character_map = instance.getBestCmap()
        glyph_records = []
        advance = 0
        for character in "Aa":
            glyph_name = character_map[ord(character)]
            bounds_pen = BoundsPen(glyph_set)
            glyph_set[glyph_name].draw(bounds_pen)
            glyph_records.append({
                "character": character,
                "glyphName": glyph_name,
                "boundsUnits": list(bounds_pen.bounds),
                "originUnits": advance,
                "advanceUnits": instance["hmtx"].metrics[glyph_name][0],
            })
            advance += instance["hmtx"].metrics[glyph_name][0]
        records.append({
            "weight": weight,
            "font": instance,
            "glyphs": glyph_records,
            "advanceUnits": advance,
        })
    minimum_y = min(glyph["boundsUnits"][1] for record in records for glyph in record["glyphs"])
    maximum_y = max(glyph["boundsUnits"][3] for record in records for glyph in record["glyphs"])
    baseline = round(PADDING + maximum_y * scale, 5)
    view_height = round((maximum_y - minimum_y) * scale + 2 * PADDING, 5)
    samples = []
    for record in records:
        width = record["advanceUnits"] * scale + 2 * PADDING
        assert width < 59
        glyph_set = record["font"].getGlyphSet()
        paths = []
        for glyph in record["glyphs"]:
            path_pen = SVGPathPen(glyph_set, ntos=number)
            transform = (scale, 0, 0, -scale, PADDING + glyph["originUnits"] * scale, baseline)
            glyph_set[glyph["glyphName"]].draw(TransformPen(path_pen, transform))
            paths.append('<path d="' + path_pen.getCommands() + '"/>')
        svg = (
            '<svg xmlns="http://www.w3.org/2000/svg" width="' + number(width)
            + '" height="' + number(view_height) + '" viewBox="0 0 '
            + number(width) + " " + number(view_height) + '"><g fill="'
            + FILL + '">' + "".join(paths) + "</g></svg>"
        )
        filename = "work-sans-Aa-wght-" + str(record["weight"]) + ".svg"
        output_path = DIRECTORY / filename
        output_path.write_text(svg + "\n", encoding="utf-8")
        parsed = ElementTree.fromstring(svg)
        assert len(parsed.findall(".//{http://www.w3.org/2000/svg}path")) == 2
        assert not parsed.findall(".//{http://www.w3.org/2000/svg}text")
        assert not parsed.findall(".//{http://www.w3.org/2000/svg}image")
        samples.append({
            "file": filename,
            "text": "Aa",
            "coordinates": {"wght": record["weight"]},
            "fontSize": FONT_SIZE,
            "baseline": baseline,
            "width": width,
            "height": view_height,
            "viewBox": [0, 0, width, view_height],
            "fill": FILL,
            "glyphs": record["glyphs"],
            "kerningAaUnits": 0,
            "sha256": digest(output_path),
        })
    manifest = {
        "purpose": "Commento372: confronto didattico fra posizioni discrete e regolazione del peso.",
        "scope": "Solo asset; nessuna modifica Figma, prosa, figure o commenti.",
        "family": original_font["name"].getDebugName(1),
        "version": original_font["name"].getDebugName(5),
        "authors": "Wei Huang / The Work Sans Project Authors",
        "copyright": original_font["name"].getDebugName(0),
        "license": {
            "name": "SIL Open Font License 1.1",
            "file": license_path.name,
            "sha256": digest(license_path),
        },
        "original": {
            "file": original_path.name,
            "upstreamFilename": "WorkSans[wght].ttf",
            "sha256": digest(original_path),
            "bytes": original_path.stat().st_size,
            "modified": False,
            "reusedFrom": "/private/tmp/comment357-WorkSans.ttf",
        },
        "source": {
            "primaryUrl": "https://github.com/google/fonts/tree/main/ofl/worksans",
            "fontUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/worksans/WorkSans%5Bwght%5D.ttf",
            "metadataUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/worksans/METADATA.pb",
            "licenseUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/worksans/OFL.txt",
            "authorRepository": "https://github.com/weiweihuanghuang/Work-Sans",
            "verifiedAt": "2026-10-19",
            "verification": "Cartella e METADATA ufficiali consultati; famiglia, autore, asse e licenza corrispondono al font originale conservato.",
        },
        "axes": axes,
        "unitsPerEm": units_per_em,
        "rendering": {
            "method": "fontTools.varLib.instancer.instantiateVariableFont, native glyph outlines",
            "fontToolsVersion": fontTools.__version__,
            "fontSize": FONT_SIZE,
            "commonScale": scale,
            "commonBaseline": baseline,
            "commonViewBoxY": 0,
            "commonViewBoxHeight": view_height,
            "padding": PADDING,
            "horizontalRescaling": False,
            "kerningVerification": "La coppia Aa ha XAdvance0 nelle lookup GPOS kern delle tre istanze.",
            "captionNote": "Tre campioni autentici dello stesso font variabile, istanziati a wght400/550/700; non tre file statici originali distribuiti.",
        },
        "samples": samples,
    }
    (DIRECTORY / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    inline = {
        str(sample["coordinates"]["wght"]): (DIRECTORY / sample["file"]).read_text(encoding="utf-8").strip()
        for sample in samples
    }
    (DIRECTORY / "inline-svg.json").write_text(json.dumps(inline, separators=(",", ":")) + "\n", encoding="utf-8")
    print(json.dumps({"directory": str(DIRECTORY), "baseline": baseline, "height": view_height, "samples": samples}, ensure_ascii=False))


if __name__ == "__main__":
    main()

