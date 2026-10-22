import hashlib
import html
import importlib.util
import json
import sys
from pathlib import Path

import fontTools
import uharfbuzz as harfbuzz
from fontTools.ttLib import TTFont


DIRECTORY = Path(__file__).resolve().parent
WORKSPACE = DIRECTORY.parents[2]
HELPER = DIRECTORY.parent / "tipografia-comment394" / "generate_figures.py"
SOURCE_DIRECTORY = DIRECTORY.parent / "tipografia-comment394" / "originals"
INK = "#2E3138"
FONT_FILES = {"dm-sans": "DMSans[opsz,wght].ttf", "roboto-serif": "RobotoSerif[GRAD,opsz,wdth,wght].ttf"}
FONT_CACHE = {}


def checksum(filename):
    return hashlib.sha256(filename.read_bytes()).hexdigest()


sys.dont_write_bytecode = True
SPECIFICATION = importlib.util.spec_from_file_location("comment394_outline_engine", HELPER)
ENGINE = importlib.util.module_from_spec(SPECIFICATION)
SPECIFICATION.loader.exec_module(ENGINE)
ENGINE.DIRECTORY = DIRECTORY


class FeatureFont(ENGINE.Font):
    def __init__(self, key, size, kerning=True):
        super().__init__(key, size, 400, size)
        self.kerning = kerning

    def shape(self, text, tracking=0, word_spacing=0):
        buffer = harfbuzz.Buffer()
        buffer.add_str(text)
        buffer.guess_segment_properties()
        buffer.direction = "ltr"
        buffer.script = "Latn"
        buffer.language = "it"
        harfbuzz.shape(self.hb_font, buffer, {"kern": self.kerning, "liga": True})
        positions = []
        cursor = 0
        for index, (info, position) in enumerate(zip(buffer.glyph_infos, buffer.glyph_positions)):
            if info.codepoint == 0:
                raise ValueError(f"Missing authentic glyph: {self.key}, {text!r}")
            positions.append((self.order[info.codepoint], cursor + position.x_offset, position.y_offset))
            cursor += position.x_advance
            if info.cluster < len(text) and text[info.cluster] == " ":
                cursor += word_spacing / self.scale
            if index + 1 < len(buffer.glyph_infos):
                cursor += tracking / self.scale
        return positions, cursor * self.scale


def font(key, size, kerning=True):
    identity = key, size, kerning
    if identity not in FONT_CACHE:
        FONT_CACHE[identity] = FeatureFont(*identity)
    return FONT_CACHE[identity]


def label_font():
    return ENGINE.font("dm-sans", 10, weight=500, optical_size=14)


def draw(figure, text, horizontal, baseline, face, tracking=0, word_spacing=0, role="sample"):
    advance = figure.text(text, horizontal, baseline, face, tracking=tracking, word_spacing=word_spacing, role=role)
    positions, _ = face.shape(text, tracking, word_spacing)
    figure.runs[-1].update({"features": {"kern": getattr(face, "kerning", True), "liga": True}, "glyphNames": [entry[0] for entry in positions], "glyphOriginsPt": [[horizontal + entry[1] * face.scale, baseline - entry[2] * face.scale] for entry in positions]})
    return advance


def kerning_figure(enabled):
    filename = "02-kerning-on.svg" if enabled else "01-kerning-off.svg"
    heading = "Con kerning" if enabled else "Senza kerning"
    figure = ENGINE.Figure(filename, 187.09, 86, heading, {}, "")
    draw(figure, heading, 0, 10, label_font(), role="label")
    word_advance = draw(figure, "AVATAR", 0, 44, font("roboto-serif", 32, enabled))
    if word_advance > figure.width:
        raise ValueError("AVATAR exceeds187.09pt at its authentic32pt size")
    for text, horizontal in [("AV", 0), ("VA", 62), ("To", 124)]:
        if draw(figure, text, horizontal, 78, font("roboto-serif", 20, enabled)) + horizontal > figure.width:
            raise ValueError("Authentic kerning pair exceeds its viewport")
    figure.parameters = {"font": "roboto-serif", "weight": 400, "widthAxis": 100, "grade": 0, "features": {"kern": enabled, "liga": True}, "word": {"text": "AVATAR", "nominalSize": 32, "opticalSize": 32, "firstGlyphOrigin": [0, 44]}, "pairs": {"texts": ["AV", "VA", "To"], "nominalSize": 20, "opticalSize": 20, "firstGlyphOrigins": [[0, 78], [62, 78], [124, 78]]}, "horizontalScaling": False}
    return figure


def tracking_figure():
    figure = ENGINE.Figure("03-tracking-wordspace.svg", 187.09, 200, "Tracking e spazi fra parole", {}, "")
    for label, label_baseline, baseline, tracking in [("Tracking −0,8 pt", 10, 34, -0.8), ("Tracking 0 pt", 50, 74, 0), ("Tracking +1,6 pt", 90, 114, 1.6)]:
        draw(figure, label, 0, label_baseline, label_font(), role="label")
        if draw(figure, "tracking", 0, baseline, font("dm-sans", 26), tracking=tracking) > figure.width:
            raise ValueError("Tracking word exceeds viewport at its authentic26pt size")
    draw(figure, "Spazi fra parole", 0, 150, label_font(), role="label")
    for baseline, word_spacing, label in [(168, 0, "0 pt"), (184, 3, "+3 pt")]:
        draw(figure, "il nome", 0, baseline, font("dm-sans", 12), word_spacing=word_spacing)
        draw(figure, label, 130, baseline, label_font(), role="label")
    figure.parameters = {"font": "dm-sans", "weight": 400, "features": {"kern": True, "liga": True}, "tracking": {"text": "tracking", "nominalSize": 26, "opticalSize": 26, "addedPt": [-0.8, 0, 1.6], "labelBaselines": [10, 50, 90], "sampleBaselines": [34, 74, 114], "boundaryDefinition": "Added after every successive shaped glyph except the final glyph;0 retains original font advances including kerning."}, "wordSpacing": {"text": "il nome", "nominalSize": 12, "opticalSize": 12, "addedPt": [0, 3], "trackingAddedPt": 0, "labelTop": 140, "labelBaseline": 150, "sampleBaselines": [168, 184], "valueLabelX": 130, "definition": "Added only to the existing single word space;0 retains the original font space advance."}, "horizontalScaling": False, "rankingClaim": False, "cssQualification": "These are explicit illustrative font-layout increments, not a claim of universally correct CSS spacing values."}
    return figure


def kerning_audit():
    result = []
    for text, size in [("AVATAR", 32), ("AV", 20), ("VA", 20), ("To", 20)]:
        off_font = font("roboto-serif", size, False)
        on_font = font("roboto-serif", size, True)
        off_positions, off_advance = off_font.shape(text)
        on_positions, on_advance = on_font.shape(text)
        off_names = [entry[0] for entry in off_positions]
        on_names = [entry[0] for entry in on_positions]
        if off_names != on_names:
            raise ValueError("Kerning state unexpectedly changes glyph identity")
        for glyph_name in off_names:
            if off_font.glyph_path(glyph_name) != on_font.glyph_path(glyph_name):
                raise ValueError("Kerning state unexpectedly changes glyph contours")
        result.append({"text": text, "nominalSize": size, "opticalSize": size, "glyphNames": off_names, "sameContours": True, "offAdvance": off_advance, "onAdvance": on_advance, "advanceDeltaOnMinusOff": on_advance - off_advance, "glyphOriginXDeltaOnMinusOff": [(on[1] - off[1]) * off_font.scale for off, on in zip(off_positions, on_positions)]})
    return result


def export(figure):
    description = "Genuine font outlines shaped from the preserved original font with HarfBuzz. Explicit OpenType features and variation axes are recorded in manifest.json. Kerning changes positions, not contours; tracking and word-space values are added increments. No font substitution, geometric stretching, clipping, universal spacing rule or legibility ranking. Historical2025–2026slide figures are reference only, not the font or raster reproduced here. Native editorial captions and rights remain external."
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{ENGINE.number(figure.width)}" height="{ENGINE.number(figure.height)}" viewBox="0 0 {ENGINE.number(figure.width)} {ENGINE.number(figure.height)}"><title>{html.escape(figure.title)}</title><desc>{description}</desc><rect width="{ENGINE.number(figure.width)}" height="{ENGINE.number(figure.height)}" fill="#FFFFFF"/>{"".join(figure.elements)}</svg>\n'
    output = DIRECTORY / figure.filename
    output.write_text(svg)
    return {"file": figure.filename, "width": figure.width, "height": figure.height, "bytes": output.stat().st_size, "sha256": checksum(output), "parameters": figure.parameters, "textRuns": figure.runs, "allInkInsideViewport": True, "clipPaths": False}


def font_metadata(key):
    filename = FONT_FILES[key]
    font_path = DIRECTORY / "originals" / filename
    source = TTFont(font_path)
    prefix = "DMSans" if key == "dm-sans" else "RobotoSerif"
    license_path = DIRECTORY / "originals" / f"{prefix}-OFL.txt"
    metadata_path = DIRECTORY / "originals" / f"{prefix}-METADATA.pb"
    return {"family": source["name"].getDebugName(1), "version": source["name"].getDebugName(5), "postscriptName": source["name"].getDebugName(6), "copyright": source["name"].getDebugName(0), "fontPath": str(font_path.relative_to(WORKSPACE)), "sha256": checksum(font_path), "copiedByteIdenticalFrom": str((SOURCE_DIRECTORY / filename).relative_to(WORKSPACE)), "sourceUrl": "https://github.com/google/fonts/tree/main/ofl/" + ("dmsans" if key == "dm-sans" else "robotoserif"), "license": "SIL Open Font License1.1", "licensePath": str(license_path.relative_to(WORKSPACE)), "licenseSha256": checksum(license_path), "metadataPath": str(metadata_path.relative_to(WORKSPACE)), "metadataSha256": checksum(metadata_path), "axes": [{"tag": axis.axisTag, "min": axis.minValue, "default": axis.defaultValue, "max": axis.maxValue} for axis in source["fvar"].axes]}


def main():
    figures = [export(kerning_figure(False)), export(kerning_figure(True)), export(tracking_figure())]
    manifest = {"comment": 397, "date": "2026-10-20", "status": "LOCAL_SOURCE_ASSETS_READY_FIGMA_APPLICATION_TRACKED_SEPARATELY", "fonts": {key: font_metadata(key) for key in FONT_FILES}, "model": {"background": "#FFFFFF", "ink": INK, "labels": "DM SansMedium10pt/wght500/opsz14, native editorial caption and rights external", "accent": "#AFC7E8; no decorative accent added"}, "shaping": {"engine": "HarfBuzz", "pythonBinding": harfbuzz.__version__, "fontTools": fontTools.__version__, "helper": str(HELPER.relative_to(WORKSPACE)), "helperSha256": checksum(HELPER), "customFeatureControl": "FeatureFont.shape explicitly sets kern0/1 and liga1. The394helper is imported read-only; no394output or manifest is regenerated.", "direction": "ltr", "script": "Latn", "language": "it"}, "figures": figures, "kerningAudit": kerning_audit(), "historicalReferenceOnly": {"pdf": "materiali/lezioni/2025-2026/07-tipografia-accessibilita.pdf", "pages": [104, 105], "figures": ["risorse-condivise/fonti/booklet/tipografia-spaziatura-recupero/kerning.png", "risorse-condivise/fonti/booklet/tipografia-spaziatura-recupero/tracking.png"], "provenance": "risorse-condivise/fonti/booklet/tipografia-spaziatura-recupero/manifest.json", "qualification": "The old PDF's figure font is unknown; these new SVGs are controlled recompositions with identified genuine fonts, not recovered copies or claims of the same font. No historical erroneous1/3emrule or conflation of tracking/word spacing is reused."}, "limitations": ["No Figma import, current-page fit, native caption/rights typography, PDF or print certification.", "No universally correct kerning/tracking/CSS values or better-font ranking claimed."]}
    (DIRECTORY / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"figures": [{key: figure[key] for key in ["file", "width", "height", "bytes", "sha256"]} for figure in figures], "kerningAudit": manifest["kerningAudit"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
