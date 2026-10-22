import hashlib
import html
import importlib.util
import json
import sys
from pathlib import Path

import fontTools
import uharfbuzz
from fontTools.ttLib import TTFont


DIRECTORY = Path(__file__).resolve().parent
WORKSPACE = DIRECTORY.parents[2]
HELPER = DIRECTORY.parent / "tipografia-comment394" / "generate_figures.py"
FONT_PATH = DIRECTORY / "originals" / "DMSans[opsz,wght].ttf"
LICENSE_PATH = DIRECTORY / "originals" / "DMSans-OFL.txt"
METADATA_PATH = DIRECTORY / "originals" / "DMSans-METADATA.pb"


def checksum(filename):
    return hashlib.sha256(filename.read_bytes()).hexdigest()


def main():
    sys.dont_write_bytecode = True
    specification = importlib.util.spec_from_file_location("comment394_outline_engine", HELPER)
    engine = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(engine)
    engine.DIRECTORY = DIRECTORY
    face = engine.font(size=12, weight=400, optical_size=12)
    text = "Leggi il nome e il codice."
    figure = engine.Figure("13-distanza-riga.svg", 187.09, 14, "Una riga da leggere a due distanze", {}, "")
    advance = figure.text(text, 0, 10, face)
    if advance > figure.width:
        raise ValueError("The complete authentic sentence does not fit the requested width")
    description = "Genuine DM Sans 4.004 outlines, shaped at 12 pt/wght400/opsz12 with HarfBuzz. One complete sentence at baseline10; no deformation, scaling compensation, clipping, ranking or simulated distance. The native external caption proposes reading the same physical page at two real distances; this SVG does not model experimental conditions or reading performance. Font, licence and metadata are preserved in originals/."
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="187.09" height="14" viewBox="0 0 187.09 14"><title>{html.escape(figure.title)}</title><desc>{description}</desc><rect width="187.09" height="14" fill="#FFFFFF"/>{"".join(figure.elements)}</svg>\n'
    output_path = DIRECTORY / figure.filename
    output_path.write_text(svg)
    source_font = TTFont(FONT_PATH)
    manifest = {
        "comment": 396,
        "date": "2026-10-20",
        "status": "LOCAL_SOURCE_ASSET_READY_FIGMA_APPLICATION_TRACKED_SEPARATELY",
        "file": str(output_path.relative_to(WORKSPACE)),
        "sha256": checksum(output_path),
        "bytes": output_path.stat().st_size,
        "width": 187.09,
        "height": 14,
        "textRuns": figure.runs,
        "parameters": {"samePhysicalSample": True, "nominalSize": 12, "weight": 400, "opticalSize": 12, "baseline": 10, "trackingAdded": 0, "wordSpacingAdded": 0, "geometricDeformation": False, "distanceSimulation": False, "rankingClaim": False},
        "font": {
            "family": "DM Sans",
            "version": source_font["name"].getDebugName(5),
            "postscriptName": source_font["name"].getDebugName(6),
            "copyright": source_font["name"].getDebugName(0),
            "sourceUrl": "https://github.com/google/fonts/tree/main/ofl/dmsans",
            "rawFontUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/DMSans%5Bopsz%2Cwght%5D.ttf",
            "path": str(FONT_PATH.relative_to(WORKSPACE)),
            "sha256": checksum(FONT_PATH),
            "copiedByteIdenticalFrom": "assets/booklet/tipografia-comment394/originals/",
            "license": "SIL Open Font License1.1",
            "licensePath": str(LICENSE_PATH.relative_to(WORKSPACE)),
            "licenseSha256": checksum(LICENSE_PATH),
            "metadataPath": str(METADATA_PATH.relative_to(WORKSPACE)),
            "metadataSha256": checksum(METADATA_PATH),
        },
        "shaping": {"engine": "HarfBuzz", "pythonBinding": uharfbuzz.__version__, "fontTools": fontTools.__version__, "helper": str(HELPER.relative_to(WORKSPACE)), "helperSha256": checksum(HELPER), "features": {"kern": True, "liga": True}, "direction": "ltr", "script": "Latn", "language": "it", "pathPrecision": "0.001font units and0.001pt translations; original contours, no redraw or fallback"},
        "model": {"background": "#FFFFFF", "ink": "#2E3138", "internalLabels": False, "clipPaths": False, "allInkInsideViewport": True},
        "nativeCaptionProposal": "DM Sans a 12 pt. Leggi la stessa riga da vicino, poi tenendo la pagina a braccio teso. Cambia la distanza, non il corpo del campione.",
        "limitations": ["An observation exercise using two real viewing distances, not a simulated distance or a measured experiment.", "No universal legibility ranking or performance claim.", "Native caption and rights are external; no Figma import, current-page fit or PDF-print certification."],
    }
    (DIRECTORY / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"file": manifest["file"], "dimensions": [figure.width, figure.height], "advance": advance, "inkBounds": figure.runs[0]["inkBounds"], "bytes": manifest["bytes"], "sha256": manifest["sha256"]}))


if __name__ == "__main__":
    main()
