import hashlib
import json
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools import version as fonttools_version
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTCollection, TTFont


PROJECT_ROOT = Path(__file__).resolve().parents[5]
OUTPUT_DIRECTORY = Path("risorse-condivise/fonti/booklet/tipografia-campioni-uniformi/late")
SAMPLE = "Aag"
NOMINAL_SIZE = 36
BASELINE = 31.2
BAND_HEIGHT = 54
SIDE_PADDING = 1
FILL = "#30323a"
SOURCES = [
    {
        "slug": "brush-script-mt-italic",
        "path": "/System/Library/Fonts/Supplemental/Brush Script.ttf",
        "family": "Brush Script MT",
        "style": "Italic",
        "reference": "https://learn.microsoft.com/en-us/typography/font-list/brush-script-mt",
    },
    {
        "slug": "bodoni-72-book",
        "path": "/System/Library/Fonts/Supplemental/Bodoni 72.ttc",
        "family": "Bodoni 72",
        "style": "Book",
        "reference": None,
    },
    {
        "slug": "impact-regular",
        "path": "/System/Library/Fonts/Supplemental/Impact.ttf",
        "family": "Impact",
        "style": "Regular",
        "reference": "https://learn.microsoft.com/en-us/typography/font-list/impact",
    },
    {
        "slug": "comic-sans-ms-regular",
        "path": "/System/Library/Fonts/Supplemental/Comic Sans MS.ttf",
        "family": "Comic Sans MS",
        "style": "Regular",
        "reference": "https://learn.microsoft.com/en-us/typography/font-list/comic-sans-ms",
    },
    {
        "slug": "opendyslexic-regular",
        "path": str(PROJECT_ROOT / "reports/figma-commenti/2026-10-19/comment370-late-sources/OpenDyslexic-Regular.otf"),
        "family": "OpenDyslexic",
        "style": "Regular",
        "reference": "https://github.com/antijingoist/opendyslexic",
        "license": "SIL Open Font License 1.1",
        "licensePath": "reports/figma-commenti/2026-10-19/comment370-late-sources/OpenDyslexic-OFL.txt",
    },
]


def load_font(source):
    filename = Path(source["path"])
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
    glyph_set = font.getGlyphSet()
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
    description = escape("Authentic font outlines. Fixed baseline 31.2 px, 54 px band; original advances preserved. No font binary embedded.")
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
        "sourcePath": source["path"],
        "sourceSha256": hashlib.sha256(Path(source["path"]).read_bytes()).hexdigest(),
        "reference": source["reference"],
        "license": source.get("license", "Existing macOS system-font license; not an open-license claim"),
        "licensePath": source.get("licensePath"),
        "fontBinaryCopied": False,
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
        "generatorInvocation": "PYTHONPATH=/private/tmp/comment357-fonttools python3 risorse-condivise/fonti/booklet/tipografia-campioni-uniformi/late/generate_samples.py",
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
        "samples": samples,
    }
    files.append({"path": str(OUTPUT_DIRECTORY / "manifest.json"), "content": json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"})
    print(json.dumps({"files": files, "manifest": manifest}, ensure_ascii=False))


if __name__ == "__main__":
    main()
