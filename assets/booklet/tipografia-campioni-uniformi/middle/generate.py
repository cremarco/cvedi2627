from pathlib import Path
import hashlib
import json
import xml.etree.ElementTree as ElementTree

import fontTools
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTCollection, TTFont


DIRECTORY = Path(__file__).resolve().parent


def number(value):
    return format(value, ".5f").rstrip("0").rstrip(".") if value else "0"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_regular(record):
    source_path = Path(record["source"])
    if source_path.suffix.lower() == ".ttc":
        collection = TTCollection(source_path)
        matches = [
            (index, font)
            for index, font in enumerate(collection.fonts)
            if font["name"].getDebugName(6) == record["postScript"]
        ]
        assert len(matches) == 1, record["family"]
        return matches[0][1], matches[0][0]
    font = TTFont(source_path)
    assert font["name"].getDebugName(6) == record["postScript"], record["family"]
    return font, None


def pair_kerning(font, first, second):
    indices = set()
    if "GPOS" in font:
        for feature in font["GPOS"].table.FeatureList.FeatureRecord:
            if feature.FeatureTag == "kern":
                indices.update(feature.Feature.LookupListIndex)
    if indices:
        advance = 0
        for index in indices:
            lookup = font["GPOS"].table.LookupList.Lookup[index]
            for subtable in lookup.SubTable:
                table = subtable.ExtSubTable if lookup.LookupType == 9 else subtable
                if not hasattr(table, "Coverage") or first not in table.Coverage.glyphs:
                    continue
                if table.Format == 1:
                    pairs = table.PairSet[table.Coverage.glyphs.index(first)].PairValueRecord
                    for pair in pairs:
                        if pair.SecondGlyph == second:
                            advance += getattr(pair.Value1, "XAdvance", 0)
                elif table.Format == 2:
                    first_class = table.ClassDef1.classDefs.get(first, 0)
                    second_class = table.ClassDef2.classDefs.get(second, 0)
                    value = table.Class1Record[first_class].Class2Record[second_class].Value1
                    advance += getattr(value, "XAdvance", 0)
        return advance
    if "kern" in font:
        return sum(
            table.kernTable.get((first, second), 0)
            for table in font["kern"].kernTables
            if hasattr(table, "kernTable")
        )
    return 0


def main():
    manifest_path = DIRECTORY / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    target = manifest["target"]
    reference = {
        record["slug"]: record
        for record in json.loads(Path(manifest["provenanceReference"]).read_text(encoding="utf-8"))
    }
    samples = []
    inline = {}
    for record in manifest["fonts"]:
        font, collection_index = load_regular(record)
        source_path = Path(record["source"])
        source_hash = digest(source_path)
        if record["slug"] in reference:
            assert source_hash == reference[record["slug"]]["sourceSha256"]
        glyph_set = font.getGlyphSet()
        character_map = font.getBestCmap()
        glyph_names = [character_map[ord(character)] for character in target["text"]]
        scale = target["nominalSize"] / font["head"].unitsPerEm
        advance_units = 0
        glyph_records = []
        path_elements = []
        total_bounds_pen = BoundsPen(glyph_set)
        for index, glyph_name in enumerate(glyph_names):
            glyph = glyph_set[glyph_name]
            kerning_units = pair_kerning(font, glyph_names[index - 1], glyph_name) if index else 0
            advance_units += kerning_units
            origin_units = advance_units
            glyph_bounds_pen = BoundsPen(glyph_set)
            glyph.draw(glyph_bounds_pen)
            glyph.draw(TransformPen(total_bounds_pen, (1, 0, 0, 1, origin_units, 0)))
            path_pen = SVGPathPen(glyph_set, ntos=number)
            glyph.draw(TransformPen(path_pen, (scale, 0, 0, -scale, origin_units * scale, target["baseline"])))
            path_elements.append('<path d="' + path_pen.getCommands() + '"/>')
            glyph_records.append({
                "character": target["text"][index],
                "glyph": glyph_name,
                "originUnits": origin_units,
                "advanceUnits": font["hmtx"].metrics[glyph_name][0],
                "kerningBeforeUnits": kerning_units,
                "boundsUnits": list(glyph_bounds_pen.bounds),
            })
            advance_units += font["hmtx"].metrics[glyph_name][0]
        minimum_x, minimum_y, maximum_x, maximum_y = total_bounds_pen.bounds
        ink_bounds = [
            minimum_x * scale,
            target["baseline"] - maximum_y * scale,
            (maximum_x - minimum_x) * scale,
            (maximum_y - minimum_y) * scale,
        ]
        advance_width = advance_units * scale
        view_minimum_x = min(0, ink_bounds[0]) - target["sidePadding"]
        view_maximum_x = max(advance_width, ink_bounds[0] + ink_bounds[2]) + target["sidePadding"]
        width = view_maximum_x - view_minimum_x
        assert ink_bounds[1] >= 0, (record["family"], ink_bounds)
        assert ink_bounds[1] + ink_bounds[3] <= target["bandHeight"], (record["family"], ink_bounds)
        svg = (
            '<svg xmlns="http://www.w3.org/2000/svg" width="' + number(width)
            + '" height="' + number(target["bandHeight"]) + '" viewBox="'
            + number(view_minimum_x) + " 0 " + number(width) + " "
            + number(target["bandHeight"]) + '"><g fill="' + target["fill"] + '">'
            + "".join(path_elements) + "</g></svg>"
        )
        filename = record["slug"] + "-Aag-36.svg"
        output_path = DIRECTORY / filename
        output_path.write_text(svg + "\n", encoding="utf-8")
        parsed = ElementTree.fromstring(svg)
        assert len(parsed.findall(".//{http://www.w3.org/2000/svg}path")) == 3
        assert not parsed.findall(".//{http://www.w3.org/2000/svg}text")
        assert not parsed.findall(".//{http://www.w3.org/2000/svg}image")
        sample = {
            "family": record["family"],
            "style": font["name"].getDebugName(2),
            "postScript": font["name"].getDebugName(6),
            "version": font["name"].getDebugName(5),
            "copyright": font["name"].getDebugName(0),
            "sourcePath": str(source_path),
            "sourceSha256": source_hash,
            "collectionIndex": collection_index,
            "sourceMatches370": record["slug"] in reference,
            "file": filename,
            "sha256": digest(output_path),
            "text": target["text"],
            "nominalSize": target["nominalSize"],
            "baseline": target["baseline"],
            "bandHeight": target["bandHeight"],
            "unitsPerEm": font["head"].unitsPerEm,
            "advanceWidth": advance_width,
            "viewBox": [view_minimum_x, 0, width, target["bandHeight"]],
            "inkBounds": ink_bounds,
            "glyphs": glyph_records,
            "fill": target["fill"],
            "softwareFontRedistributed": False,
            "qualification": "Current installed digital version; not a historic bitmap, original metal type or experimental study stimulus.",
        }
        samples.append(sample)
        inline[record["slug"]] = svg
    manifest["samples"] = samples
    manifest["generator"] = {
        "file": "generate.py",
        "fontToolsVersion": fontTools.__version__,
        "method": "Original glyph outlines and hmtx advances, with native pair kerning; no synthetic tracking or horizontal stretch.",
        "validation": "Nine originals checked, TTC face names exact, native advance/ink union plus1px per side, vertical bounds within54px.",
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (DIRECTORY / "inline-svg.json").write_text(json.dumps(inline, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(json.dumps([
        {"font": sample["family"], "viewBox": sample["viewBox"], "inkBounds": sample["inkBounds"], "kerning": [glyph["kerningBeforeUnits"] for glyph in sample["glyphs"]]}
        for sample in samples
    ], ensure_ascii=False))


if __name__ == "__main__":
    main()

