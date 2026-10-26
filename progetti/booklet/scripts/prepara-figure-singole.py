"""Rebuild independent panels while preserving original image bytes and provenance."""

from __future__ import annotations

import argparse
import copy
from pathlib import Path
import re
import shutil
import xml.etree.ElementTree as ET

from booklet.common import BOOKLET, ROOT, digest, read_json, require

BASE = BOOKLET / "assets/figure-singole"
SVG = "{http://www.w3.org/2000/svg}"
ET.register_namespace("", SVG[1:-1])
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")


def panel_bytes(entry: dict) -> bytes:
    """Extract one existing group, including its palette, without rasterising it."""
    original = ET.parse(ROOT / entry["source"]).getroot()
    groups = original.findall(SVG + "g")
    panel = copy.deepcopy(list(groups[-1])[entry["panel"]])
    panel.attrib.pop("transform", None)
    for text in panel.iter(SVG + "text"):
        if text.text:
            text.text = re.sub(r"^[AB] · ", "", text.text)
    width, height = entry["size"]
    root = ET.Element(SVG + "svg", {"width": str(width), "height": str(height),
        "viewBox": f"0 0 {width} {height}"})
    ET.SubElement(root, SVG + "title").text = entry["title"]
    root.append(panel)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    manifest = read_json(BASE / "manifest.json")
    for entry in manifest["assets"]:
        source, target = ROOT / entry["source"], BASE / entry["file"]
        require(digest(source) == entry["source_sha256"], f"Original changed: {source}")
        if args.check:
            require(digest(target) == entry["sha256"], f"Independent asset changed: {target}")
            if entry["method"] == "copy":
                require(digest(target) == digest(source), f"Original bytes changed: {target}")
            else:
                require(target.read_bytes() == panel_bytes(entry), f"Panel needs rebuilding: {target}")
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            if entry["method"] == "copy":
                shutil.copyfile(source, target)
            else:
                target.write_bytes(panel_bytes(entry))
            require(digest(target) == entry["sha256"], f"Rebuild differs from manifest: {target}")
    print(f"Verified {len(manifest['assets'])} independent assets.")


if __name__ == "__main__":
    main()
