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
DM_ORIGINALS = DIRECTORY.parent / "tipografia-comment394" / "originals"
FONT_SOURCES = {
    "dm-sans": {
        "fontPath": DM_ORIGINALS / "DMSans[opsz,wght].ttf",
        "licensePath": DM_ORIGINALS / "DMSans-OFL.txt",
        "metadataPath": DM_ORIGINALS / "DMSans-METADATA.pb",
        "sourceUrl": "https://github.com/google/fonts/tree/main/ofl/dmsans",
    },
    "sora": {
        "fontPath": DIRECTORY / "originals" / "Sora[wght].ttf",
        "licensePath": DIRECTORY / "originals" / "Sora-OFL.txt",
        "metadataPath": DIRECTORY / "originals" / "Sora-METADATA.pb",
        "sourceUrl": "https://github.com/google/fonts/tree/main/ofl/sora",
        "rawFontUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/sora/Sora%5Bwght%5D.ttf",
        "rawLicenseUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/sora/OFL.txt",
        "rawMetadataUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/sora/METADATA.pb",
    },
}
INK = "#2E3138"
ACCENT = "#AFC7E8"
FONT_CACHE = {}


def checksum(filename):
    return hashlib.sha256(filename.read_bytes()).hexdigest()


sys.dont_write_bytecode = True
SPECIFICATION = importlib.util.spec_from_file_location("comment402_outline_engine", HELPER)
ENGINE = importlib.util.module_from_spec(SPECIFICATION)
SPECIFICATION.loader.exec_module(ENGINE)
ENGINE.DIRECTORY = DIRECTORY
ENGINE.FONT_FILES = {key: str(source["fontPath"]) for key, source in FONT_SOURCES.items()}
ENGINE.FAMILY_NAMES["sora"] = "Sora"


def font(key, size, weight=400, optical_size=None):
    identity = key, size, weight, optical_size
    if identity not in FONT_CACHE:
        FONT_CACHE[identity] = ENGINE.Font(*identity)
    return FONT_CACHE[identity]


def label_font():
    return font("dm-sans", 10, 500, 14)


def draw(figure, text, horizontal, baseline, face, role="sample"):
    advance = figure.text(text, horizontal, baseline, face, role=role)
    positions, shaped_advance = face.shape(text)
    if abs(advance - shaped_advance) > 0.000001:
        raise ValueError("Shaping advance mismatch")
    figure.runs[-1].update({
        "features": {"kern": True, "liga": True},
        "glyphNames": [entry[0] for entry in positions],
        "glyphOriginsPt": [[horizontal + entry[1] * face.scale, baseline - entry[2] * face.scale] for entry in positions],
    })
    if horizontal + advance > figure.width:
        raise ValueError(f"Text advance exceeds {figure.filename}: {text!r}")
    return advance


def availability_figure():
    figure = ENGINE.Figure("01-disponibilita-font.svg", 187.09, 180, "Disponibilità del font", {}, "")
    states = []
    for key, top, heading, family_label in [
        ("sora", 0, "Font scelto in attesa", "Sora già disponibile"),
        ("dm-sans", 88, "Font scelto pronto", "DM Sans disponibile"),
    ]:
        draw(figure, heading, 0, top + 10, label_font(), "label")
        draw(figure, family_label, 0, top + 28, label_font(), "label")
        draw(figure, "Conferma", 0, top + 62, font(key, 24, 400, 24))
        states.append({"font": key, "heading": heading, "text": "Conferma", "nominalSize": 24, "weight": 400, "firstGlyphOrigin": [0, top + 62]})
    figure.parameters = {
        "familyListIllustrated": ["DM Sans", "Sora", "sans-serif"],
        "assumption": "Sora is already available in the first state; it is not claimed to be the platform's generic sans-serif.",
        "states": states,
        "measuredTime": None,
        "browserScreenshot": False,
        "performanceOrLayoutShiftClaim": False,
    }
    figure.caption = "Due condizioni della stessa richiesta. Sora è già disponibile come riserva; quando DM Sans è disponibile, torna la priorità del primo nome. Non sono misurati tempi di caricamento."
    return figure


def weight_figure():
    figure = ENGINE.Figure("02-pesi-css.svg", 187.09, 180, "Pesi del font e CSS", {}, "")
    for weight, label_baseline, sample_baseline in [(400, 10, 34), (650, 66, 90), (800, 122, 146)]:
        draw(figure, f"font-weight: {weight}", 0, label_baseline, label_font(), "label")
        draw(figure, "Aa24", 0, sample_baseline, font("dm-sans", 24, weight, 24))
    figure.parameters = {
        "font": "dm-sans",
        "text": "Aa24",
        "nominalSize": 24,
        "opticalSize": 24,
        "weights": [400, 650, 800],
        "sampleBaselines": [34, 90, 146],
        "cssDeclaration": "font-weight",
        "sameOriginalFontFile": True,
        "syntheticBold": False,
        "browserScreenshot": False,
    }
    figure.caption = "DM Sans a 24 pt, dimensione ottica 24: cambiano soltanto i pesi 400, 650 e 800 dell’asse wght. I valori CSS non sono deformazioni geometriche né misure di prestazione."
    return figure


def wrap(text, face, measure):
    lines = []
    current = ""
    for word in text.split(" "):
        candidate = f"{current} {word}" if current else word
        if face.shape(candidate)[1] > measure and current:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    if " ".join(lines) != text:
        raise ValueError("Wrapped control content changed")
    if any(face.shape(line)[1] > measure for line in lines):
        raise ValueError("Unbreakable control text exceeds measure")
    return lines


def responsive_figure():
    figure = ENGINE.Figure("03-controllo-adattabile.svg", 187.09, 200, "Un comando che si adatta", {}, "")
    text = "Conferma la prenotazione"
    padding = 8
    states = []
    for size, leading, top, label_baseline in [(12, 18, 20, 10), (24, 36, 90, 80)]:
        face = font("dm-sans", size, 400, 12)
        lines = wrap(text, face, figure.width - padding * 2)
        height = padding * 2 + len(lines) * leading
        if top + height > figure.height:
            raise ValueError("Control exceeds illustration viewport")
        draw(figure, f"Testo {size} pt", 0, label_baseline, label_font(), "label")
        figure.elements.append(f'<rect x="0" y="{ENGINE.number(top)}" width="{ENGINE.number(figure.width)}" height="{ENGINE.number(height)}" fill="{ACCENT}"/>')
        baselines = []
        for index, line in enumerate(lines):
            baseline = top + padding + leading * 0.75 + index * leading
            draw(figure, line, padding, baseline, face)
            baselines.append(baseline)
            bounds = figure.runs[-1]["inkBounds"]
            if bounds[0] < padding or bounds[2] > figure.width - padding or bounds[1] < top + padding or bounds[3] > top + height - padding:
                raise ValueError("Control ink violates declared padding")
        states.append({"nominalSize": size, "leading": leading, "top": top, "width": figure.width, "height": height, "padding": padding, "measure": figure.width - padding * 2, "lines": lines, "baselines": baselines})
    if len(states[0]["lines"]) != 1 or len(states[1]["lines"]) != 2:
        raise ValueError("Unexpected one-line to two-line comparison")
    if states[0]["top"] + states[0]["height"] >= 68:
        raise ValueError("First control collides with second label")
    figure.parameters = {
        "font": "dm-sans",
        "text": text,
        "weight": 400,
        "opticalSizeFixed": 12,
        "opticalSizeReason": "Fixed to isolate nominal type size, not to simulate a browser with automatic optical sizing.",
        "states": states,
        "sameContent": True,
        "sameMeasure": True,
        "fontSizeScale": 2,
        "functionalControlFill": ACCENT,
        "noFixedHeightOrCropping": True,
        "browserScreenshot": False,
        "wcagOrPhysicalZoomTest": False,
    }
    figure.caption = "Lo stesso comando a 12 e 24 pt, nella stessa larghezza e con dimensione ottica fissata a 12. Il controllo cresce e conserva le parole. Lo schema non è un test di conformità WCAG."
    return figure


def font_metadata(key, source):
    original = TTFont(source["fontPath"])
    result = {name: str(value.relative_to(WORKSPACE)) if isinstance(value, Path) else value for name, value in source.items()}
    result.update({
        "family": original["name"].getDebugName(1),
        "version": original["name"].getDebugName(5),
        "postscriptName": original["name"].getDebugName(6),
        "copyright": original["name"].getDebugName(0),
        "license": "SIL Open Font License 1.1",
        "sha256": checksum(source["fontPath"]),
        "licenseSha256": checksum(source["licensePath"]),
        "metadataSha256": checksum(source["metadataPath"]),
        "axes": [{"tag": axis.axisTag, "min": axis.minValue, "default": axis.defaultValue, "max": axis.maxValue} for axis in original["fvar"].axes],
        "acquiredOn": "2026-10-20" if key == "sora" else "Preserved original from comment394; referenced without copying or rewriting",
    })
    return result


def export(figure):
    description = "Controlled schematic illustration using authentic glyph outlines shaped with HarfBuzz. Source fonts, whole OFL licences, hashes, variation locations and complete text runs are recorded in manifest.json. Not a browser screenshot, loading-time measurement, working website, physical zoom test or WCAG conformance claim. No glyph substitution, geometric deformation or clipping. Editorial caption and rights remain external native text."
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{ENGINE.number(figure.width)}" height="{ENGINE.number(figure.height)}" viewBox="0 0 {ENGINE.number(figure.width)} {ENGINE.number(figure.height)}"><title>{html.escape(figure.title)}</title><desc>{description}</desc><rect width="{ENGINE.number(figure.width)}" height="{ENGINE.number(figure.height)}" fill="#FFFFFF"/>{"".join(figure.elements)}</svg>\n'
    destination = DIRECTORY / figure.filename
    destination.write_text(svg)
    return {"file": figure.filename, "title": figure.title, "width": figure.width, "height": figure.height, "bytes": destination.stat().st_size, "sha256": checksum(destination), "parameters": figure.parameters, "textRuns": figure.runs, "nativeCaptionProposal": figure.caption, "allInkInsideViewport": True, "clipPaths": False}


def main():
    protected = {candidate: checksum(candidate) for candidate in (DIRECTORY.parent / "tipografia-comment394").glob("*.svg")}
    figures = [export(availability_figure()), export(weight_figure()), export(responsive_figure())]
    manifest = {
        "comment": 402,
        "date": "2026-10-20",
        "status": "GENUINE_LOCAL_SOURCE_ASSETS_READY_NOT_IMPORTED",
        "fonts": {key: font_metadata(key, source) for key, source in FONT_SOURCES.items()},
        "model": {"paper": "#FFFFFF", "ink": INK, "accent": ACCENT, "labels": "DM Sans Medium 10 pt, wght500, opsz14", "captionsAndRights": "External native components; not embedded in SVG", "decorativeFramesOrShadows": False},
        "shaping": {"engine": "HarfBuzz", "bindingVersion": harfbuzz.__version__, "fontToolsVersion": fontTools.__version__, "helper": str(HELPER.relative_to(WORKSPACE)), "helperSha256": checksum(HELPER), "helperUsedReadOnly": True, "features": {"kern": True, "liga": True}, "direction": "ltr", "script": "Latn", "language": "it"},
        "figures": figures,
        "primaryContext": "reports/figma-commenti/2026-10-19/comment402-primary-web-context.json",
        "limits": ["No browser, network-load, DevTools, working web page, physical zoom or WCAG test performed.", "The first comparison assumes Sora is already available; a generic sans-serif is not assigned a false fixed identity.", "Native page fit, linked captions, rights, figure numbering and import fidelity require later separate verification."],
        "protected394SvgFilesUnchanged": all(checksum(candidate) == digest for candidate, digest in protected.items()),
    }
    if not manifest["protected394SvgFilesUnchanged"]:
        raise ValueError("Protected comment394 source changed")
    (DIRECTORY / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"figures": [{key: figure[key] for key in ["file", "width", "height", "bytes", "sha256"]} for figure in figures], "responsiveStates": figures[2]["parameters"]["states"], "soraVersion": manifest["fonts"]["sora"]["version"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
