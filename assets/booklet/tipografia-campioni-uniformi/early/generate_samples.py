import hashlib
import json
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools import version as fonttools_version
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTCollection, TTFont


PROJECT_ROOT = Path(__file__).resolve().parents[4]
OUTPUT_DIRECTORY = Path("assets/booklet/tipografia-campioni-uniformi/early")
SAMPLE = "Aag"
NOMINAL_SIZE = 36
BASELINE = 31.2
BAND_HEIGHT = 54
SIDE_PADDING = 1
FILL = "#30323a"
SOURCES = [
    {"slug": "futura-medium", "path": "/System/Library/Fonts/Supplemental/Futura.ttc", "family": "Futura", "style": "Medium", "reference": None},
    {"slug": "helvetica-regular", "path": "/System/Library/Fonts/Helvetica.ttc", "family": "Helvetica", "style": "Regular", "reference": None},
    {"slug": "eb-garamond-regular", "path": "assets/booklet/tipografia-campioni-uniformi/early/originali/EBGaramond[wght].ttf", "family": "EB Garamond", "style": "Regular", "reference": "https://github.com/google/fonts/tree/main/ofl/ebgaramond", "sourceUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/ebgaramond/EBGaramond%5Bwght%5D.ttf", "license": "SIL Open Font License 1.1", "licensePath": "assets/booklet/tipografia-campioni-uniformi/early/originali/EBGaramond-OFL.txt", "metadataPath": "assets/booklet/tipografia-campioni-uniformi/early/originali/EBGaramond-METADATA.pb", "fontBinaryCopied": True, "location": {"wght": 400}},
    {"slug": "work-sans-regular", "path": "assets/booklet/tipografia-variabile/WorkSansVF.ttf", "family": "Work Sans", "style": "Regular", "reference": "https://github.com/google/fonts/tree/main/ofl/worksans", "license": "SIL Open Font License 1.1", "licensePath": "assets/booklet/tipografia-variabile/OFL.txt", "fontBinaryCopied": False, "location": {"wght": 400}},
    {"slug": "pacifico-regular", "path": "assets/booklet/tipografia-campioni-uniformi/early/originali/Pacifico-Regular.ttf", "family": "Pacifico", "style": "Regular", "reference": "https://github.com/google/fonts/tree/main/ofl/pacifico", "sourceUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/pacifico/Pacifico-Regular.ttf", "license": "SIL Open Font License 1.1", "licensePath": "assets/booklet/tipografia-campioni-uniformi/early/originali/Pacifico-OFL.txt", "metadataPath": "assets/booklet/tipografia-campioni-uniformi/early/originali/Pacifico-METADATA.pb", "fontBinaryCopied": True},
    {"slug": "great-vibes-regular", "path": "assets/booklet/tipografia-campioni-uniformi/early/originali/GreatVibes-Regular.ttf", "family": "Great Vibes", "style": "Regular", "reference": "https://github.com/google/fonts/tree/main/ofl/greatvibes", "sourceUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/greatvibes/GreatVibes-Regular.ttf", "license": "SIL Open Font License 1.1", "licensePath": "assets/booklet/tipografia-campioni-uniformi/early/originali/GreatVibes-OFL.txt", "metadataPath": "assets/booklet/tipografia-campioni-uniformi/early/originali/GreatVibes-METADATA.pb", "fontBinaryCopied": True},
    {"slug": "eb-garamond-italic", "path": "assets/booklet/tipografia-campioni-uniformi/early/originali/EBGaramond-Italic[wght].ttf", "family": "EB Garamond", "style": "Italic", "reference": "https://github.com/google/fonts/tree/main/ofl/ebgaramond", "sourceUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/ebgaramond/EBGaramond-Italic%5Bwght%5D.ttf", "license": "SIL Open Font License 1.1", "licensePath": "assets/booklet/tipografia-campioni-uniformi/early/originali/EBGaramond-OFL.txt", "metadataPath": "assets/booklet/tipografia-campioni-uniformi/early/originali/EBGaramond-METADATA.pb", "fontBinaryCopied": True, "location": {"wght": 400}},
]


def load_font(source):
    filename = Path(source["path"])
    if not filename.is_absolute():
        filename = PROJECT_ROOT / filename
    if filename.suffix.lower() == ".ttc":
        fonts = TTCollection(filename).fonts
        matching = [
            font for font in fonts
            if font["name"].getDebugName(1) == source["family"]
            and font["name"].getDebugName(2) == source["style"]
        ]
        if len(matching) != 1:
            raise ValueError(f"Expected one exact collection face: {source['slug']}")
        return matching[0]
    font = TTFont(filename)
    if font["name"].getDebugName(1) != source["family"] or font["name"].getDebugName(2) != source["style"]:
        raise ValueError(f"Font identity mismatch: {source['slug']}")
    return font


def make_sample(source):
    font = load_font(source)
    glyph_set = font.getGlyphSet(location=source.get("location"))
    character_map = font.getBestCmap()
    scale = NOMINAL_SIZE / font["head"].unitsPerEm
    logical_advance = 0
    paths = []
    bounds = []
    glyph_names = []
    for character in SAMPLE:
        glyph_name = character_map[ord(character)]
        glyph = glyph_set[glyph_name]
        transform = (scale, 0, 0, -scale, logical_advance * scale, BASELINE)
        path_pen = SVGPathPen(glyph_set)
        glyph.draw(TransformPen(path_pen, transform))
        bounds_pen = BoundsPen(glyph_set)
        glyph.draw(TransformPen(bounds_pen, transform))
        paths.append(path_pen.getCommands())
        bounds.append(bounds_pen.bounds)
        glyph_names.append(glyph_name)
        logical_advance += glyph.width
    full_advance = logical_advance * scale
    ink_left = min(item[0] for item in bounds)
    ink_top = min(item[1] for item in bounds)
    ink_right = max(item[2] for item in bounds)
    ink_bottom = max(item[3] for item in bounds)
    viewbox_left = min(0, ink_left) - SIDE_PADDING
    viewbox_right = max(full_advance, ink_right) + SIDE_PADDING
    width = viewbox_right - viewbox_left
    if ink_top < 0 or ink_bottom > BAND_HEIGHT:
        raise ValueError(f"Vertical clipping: {source['slug']}")
    title = escape(f"{source['family']} {source['style']} — Aag, 36 px")
    description = escape("Authentic font outlines. Fixed baseline31.2px,54px band; original advances preserved. No font binary embedded.")
    markup = "".join(f'<path d="{commands}"/>' for commands in paths)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width:.9f}" height="{BAND_HEIGHT}" '
        f'viewBox="{viewbox_left:.9f} 0 {width:.9f} {BAND_HEIGHT}">'
        f'<title>{title}</title><desc>{description}</desc><g fill="{FILL}">{markup}</g></svg>\n'
    )
    filename = OUTPUT_DIRECTORY / f"{source['slug']}.svg"
    metadata = {
        "font": source["family"],
        "style": source["style"],
        "version": font["name"].getDebugName(5),
        "postscriptName": font["name"].getDebugName(6),
        "copyright": font["name"].getDebugName(0),
        "sourcePath": str(Path(source["path"]) if Path(source["path"]).is_absolute() else PROJECT_ROOT / source["path"]),
        "sourceSha256": hashlib.sha256((Path(source["path"]) if Path(source["path"]).is_absolute() else PROJECT_ROOT / source["path"]).read_bytes()).hexdigest(),
        "sourceUrl": source.get("sourceUrl"),
        "variationLocation": source.get("location"),
        "unitsPerEm": font["head"].unitsPerEm,
        "reference": source["reference"],
        "license": source.get("license", "Existing macOS system-font license; not an open-license claim"),
        "licensePath": source.get("licensePath"),
        "fontBinaryCopied": source.get("fontBinaryCopied", False),
        "licenseSha256": hashlib.sha256((PROJECT_ROOT / source["licensePath"]).read_bytes()).hexdigest() if source.get("licensePath") else None,
        "metadataPath": source.get("metadataPath"),
        "metadataSha256": hashlib.sha256((PROJECT_ROOT / source["metadataPath"]).read_bytes()).hexdigest() if source.get("metadataPath") else None,
        "glyphNames": glyph_names,
        "sample": SAMPLE,
        "nominalSize": NOMINAL_SIZE,
        "baseline": BASELINE,
        "fill": FILL,
        "fullAdvance": full_advance,
        "inkBounds": [ink_left, ink_top, ink_right, ink_bottom],
        "inkWidth": ink_right - ink_left,
        "inkHeight": ink_bottom - ink_top,
        "viewBox": [viewbox_left, 0, width, BAND_HEIGHT],
        "leftOverhang": max(0, -ink_left),
        "rightOverhang": max(0, ink_right - full_advance),
        "sidePadding": SIDE_PADDING,
        "output": str(filename),
        "outputSha256": hashlib.sha256(svg.encode()).hexdigest(),
        "verticalFit": True,
        "currentVersionNotStudyStimulus": True,
    }
    return {"path": str(filename), "content": svg}, metadata


def main():
    files = []
    samples = []
    for source in SOURCES:
        artifact, metadata = make_sample(source)
        files.append(artifact)
        samples.append(metadata)
    manifest = {
        "purpose": "Uniform, authentic local Aag specimens; no Figma mutation",
        "generator": str(OUTPUT_DIRECTORY / "generate_samples.py"),
        "generatorInvocation": "PYTHONPATH=/private/tmp/comment357-fonttools /Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 assets/booklet/tipografia-campioni-uniformi/early/generate_samples.py",
        "fontToolsVersion": fonttools_version,
        "outputMode": "Emits JSON payload to stdout; caller saves files with apply_patch",
        "sample": SAMPLE,
        "nominalSize": NOMINAL_SIZE,
        "baseline": BASELINE,
        "bandHeight": BAND_HEIGHT,
        "fill": FILL,
        "background": "transparent",
        "spacing": "Original hmtx advances, no manual tracking, no kerning or horizontal fitting",
        "horizontalBounds": "Union of logical advance and real ink bounds, plus1px each side",
        "commercialFontBinariesCopied": False,
        "openFontAndLicensePreservedAtExistingPaths": True,
        "openFontDownloads": "Three licensed originals downloaded with official Google Fonts metadata and complete OFL notices, plus the previously downloaded EB Garamond Italic retained locally; Work Sans already preserved in the project.",
        "approvedOutputOnly": "Local SVG assets; no Figma mutations",
        "samples": samples,
    }
    files.append({"path": str(OUTPUT_DIRECTORY / "manifest.json"), "content": json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"})
    print(json.dumps({"files": files, "manifest": manifest}, ensure_ascii=False))


if __name__ == "__main__":
    main()
