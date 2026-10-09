#!/usr/bin/env python3
"""Stage the frozen iLMeteo assets without touching captured source bytes.

Run with --verify-only to check the existing copies and embedded provenance.
Pillow is used only to inspect pixels; images are never resampled or encoded.
"""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import hashlib
import json
from pathlib import Path
import re
import shutil
import struct
import subprocess
import sys
import xml.etree.ElementTree as ET
import zlib

from PIL import Image, UnidentifiedImageError


ROOT = Path(__file__).resolve().parents[1]
LAB = ROOT / "esempi/ilmeteo-lab"
DEST = LAB / "redesign/assets"
REPORT = ROOT / "reports/ilmeteo-lab/redesign-assets.json"
EMBED = Path("/Users/marco/.agents/skills/impeccable/scripts/impeccable")
RASTER_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp"}
FONT_SUFFIXES = {".ttf", ".woff", ".woff2", ".eot"}


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def relative(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def load(path: Path):
    return json.loads(path.read_text())


def write(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def provenance_read(path: Path) -> str:
    result = subprocess.run([str(EMBED), "embed-prompt", str(path), "--read"],
                            capture_output=True, text=True)
    return result.stdout.rstrip("\n") if result.returncode == 0 else ""


def image_info(path: Path) -> dict:
    with Image.open(path) as image:
        result = {"format": image.format, "width": image.width, "height": image.height,
                  "mode": image.mode, "frames": getattr(image, "n_frames", 1)}
        pixels = hashlib.sha256()
        if image.format == "ICO":
            sizes = sorted(image.ico.sizes())
            result["iconSizes"] = [list(size) for size in sizes]
            for size in sizes:
                pixels.update(struct.pack(">II", *size))
                pixels.update(image.ico.getimage(size).convert("RGBA").tobytes())
        else:
            for frame in range(result["frames"]):
                image.seek(frame)
                pixels.update(struct.pack(">II", image.width, image.height))
                pixels.update(image.convert("RGBA").tobytes())
        result["decodedPixelSha256"] = pixels.hexdigest()
        return result


def svg_info(path: Path) -> dict:
    root = ET.fromstring(path.read_text())
    return {key: root.attrib.get(key) for key in ("width", "height", "viewBox")
            if key in root.attrib}


def font_info(path: Path) -> dict:
    """Check file headers and preserve license/copyright names where readable."""
    data = path.read_bytes()
    result = {"format": path.suffix[1:], "headerValid": False}
    name_table = None
    if path.suffix == ".ttf":
        result["headerValid"] = len(data) >= 12 and data[:4] in (b"\0\1\0\0", b"OTTO")
        if result["headerValid"]:
            for pos in range(12, 12 + 16 * struct.unpack_from(">H", data, 4)[0], 16):
                tag, _, offset, length = struct.unpack_from(">4sIII", data, pos)
                if tag == b"name":
                    name_table = data[offset:offset + length]
    elif path.suffix in (".woff", ".woff2"):
        signature = b"wOFF" if path.suffix == ".woff" else b"wOF2"
        result["headerValid"] = (len(data) >= 44 and data[:4] == signature
                                 and struct.unpack_from(">I", data, 8)[0] == len(data))
        result["tableCount"] = struct.unpack_from(">H", data, 12)[0]
        if result["headerValid"] and path.suffix == ".woff":
            for pos in range(44, 44 + 20 * result["tableCount"], 20):
                tag, offset, compressed, original, _ = struct.unpack_from(">4sIIII", data, pos)
                if tag == b"name":
                    block = data[offset:offset + compressed]
                    name_table = zlib.decompress(block) if compressed < original else block
    elif path.suffix == ".eot":
        result["headerValid"] = (len(data) >= 36 and struct.unpack_from("<I", data)[0] == len(data)
                                 and struct.unpack_from("<H", data, 34)[0] == 0x504C)
    if name_table:
        _, count, start = struct.unpack_from(">HHH", name_table)
        names = defaultdict(set)
        for pos in range(6, 6 + 12 * count, 12):
            platform, _, _, name_id, length, offset = struct.unpack_from(">HHHHHH", name_table, pos)
            if name_id not in (0, 1, 2, 5, 8, 9, 13, 14):
                continue
            raw = name_table[start + offset:start + offset + length]
            value = raw.decode("utf-16-be" if platform in (0, 3) else "mac_roman", errors="replace")
            names[name_id].add(value)
        labels = {0: "copyright", 1: "family", 2: "subfamily", 5: "version",
                  8: "manufacturer", 9: "designer", 13: "licenseText", 14: "licenseUrl"}
        result["embeddedNames"] = {labels[key]: sorted(values) for key, values in names.items()}
    elif path.suffix == ".woff2":
        result["embeddedNamesInspection"] = "Compressed name table retained in original bytes; no license inferred."
    return result


def category(asset: dict) -> str:
    url = asset["url"]
    name = Path(asset["file"]).name
    if "tile.openstreetmap.org" in url:
        return "radar-base-tile"
    if "maps-geoserver.ilmeteo.it" in url:
        return "radar-overlay-tile"
    if "mattia-gussoni" in name:
        return "meteorologist-photo"
    if "thumb_" in name:
        return "news-photo"
    if "logo_ilmeteo_search" in name:
        return "brand-logo"
    if "weather_sprite" in name or "s-big" in name or "s-cartoon" in name or re.search(r"-s\d+\.gif$", name):
        return "weather-symbols"
    if "/portale/italy" in url or "/prec/italy" in url:
        return "national-weather-map"
    if "/maps2/assets/images/" in url:
        return "map-preview"
    if Path(name).suffix in FONT_SUFFIXES or "glyphicons-halflings-regular.svg" in name:
        return "font"
    return "source-support-asset"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--verify-only", action="store_true")
    args = parser.parse_args()
    manifest_path = LAB / "assets/manifest.json"
    manifest = load(manifest_path)
    attributions = load(LAB / "assets/attributions.json")
    supplementary = load(LAB / "data/supplementary.json")
    weather = load(LAB / "data/weather.json")
    previous = load(REPORT) if REPORT.exists() else {}
    old_assets = {row["file"]: row for row in previous.get("assets", [])}
    references = defaultdict(list)
    for record_id, record in supplementary["records"].items():
        for ref in record.get("assetReferences", []):
            if ref.get("localPath"):
                references[ref["localPath"]].append(record_id)
    for index, news in enumerate(weather["news"]):
        references[news["localImage"]].append(f"weather.news[{index}]")

    errors, rows, supplementary_files = [], [], []
    reused_count = 0
    if not args.verify_only:
        DEST.mkdir(parents=True, exist_ok=True)
    for asset in manifest["assets"]:
        captured = LAB / asset["file"]
        original = LAB / asset.get("sourceFile", asset["file"])
        copied = DEST / captured.name
        original_sha = sha(original)
        captured_sha = sha(captured)
        if original_sha != asset.get("sourceSha256", asset["sha256"]):
            errors.append(f"Original source SHA mismatch: {original}")
        if captured_sha != asset["sha256"] or captured.stat().st_size != asset["bytes"]:
            errors.append(f"Captured local SHA/bytes mismatch: {captured}")
        is_raster = captured.suffix.lower() in RASTER_SUFFIXES
        prompt = (f"Sourced original asset from {asset['url']}. Resolved source URL: "
                  f"{asset.get('resolvedUrl', asset['url'])}. Original source SHA-256: {original_sha}. "
                  f"Captured local asset SHA-256: {captured_sha}. Frozen acquisition: 8 October 2026. "
                  f"Rights recorded by source inventory: {manifest['license']}")
        if category(asset) == "radar-base-tile":
            prompt += (f" Recorded map attribution: {attributions['mapAttribution']}. "
                       f"Attribution source: {attributions['mapAttributionSource']}.")
        elif category(asset) == "radar-overlay-tile":
            prompt += f" Recorded map attribution: {attributions['mapAttribution']}."

        old = old_assets.get(asset["file"], {})
        reusable = (copied.exists() and sha(copied) == old.get("copiedSha256")
                    and original_sha == old.get("originalSha256")
                    and captured_sha == old.get("capturedSha256")
                    and (not is_raster or provenance_read(copied) == prompt))
        reused_count += int(reusable)
        if not args.verify_only and not reusable:
            shutil.copyfile(captured, copied)
            if is_raster:
                result = subprocess.run([str(EMBED), "embed-prompt", str(copied), "--prompt", prompt],
                                        capture_output=True, text=True)
                if result.returncode:
                    errors.append(f"Provenance embedding failed: {copied}: {result.stderr.strip()}")
        if not copied.exists():
            errors.append(f"Missing copied asset: {copied}")
            continue
        row = {"file": asset["file"], "copiedFile": relative(copied), "browserPath": f"assets/{copied.name}",
               "category": category(asset), "sourceUrl": asset["url"],
               "resolvedSourceUrl": asset.get("resolvedUrl", asset["url"]),
               "originalFile": relative(original), "originalSha256": original_sha,
               "originalBytes": original.stat().st_size, "capturedSha256": captured_sha,
               "capturedBytes": captured.stat().st_size, "copiedSha256": sha(copied),
               "copiedBytes": copied.stat().st_size, "contentType": asset["contentType"],
               "rights": manifest["license"], "sourceRecordIds": sorted(set(references[asset["file"]]))}
        if is_raster:
            try:
                source_image, copied_image = image_info(captured), image_info(copied)
                row["image"] = source_image
                row["copiedImage"] = copied_image
                row["pixelsUnchanged"] = source_image == copied_image
                if not row["pixelsUnchanged"]:
                    errors.append(f"Image pixel/dimension mismatch: {copied}")
            except (OSError, UnidentifiedImageError) as error:
                errors.append(f"Cannot inspect image {copied}: {error}")
            row["embeddedProvenance"] = prompt
            row["provenanceVerified"] = provenance_read(copied) == prompt
            row["provenanceStorage"] = "sidecar" if copied.with_suffix(copied.suffix + ".json").exists() else "in-file"
            if row["provenanceStorage"] == "sidecar":
                sidecar = copied.with_suffix(copied.suffix + ".json")
                row["provenanceSidecar"] = {"file": relative(sidecar), "sha256": sha(sidecar)}
            if not row["provenanceVerified"]:
                errors.append(f"Missing or incorrect provenance: {copied}")
        elif captured.suffix == ".svg":
            try:
                row["svg"] = svg_info(copied)
            except ET.ParseError as error:
                errors.append(f"Invalid SVG {copied}: {error}")
        elif captured.suffix in FONT_SUFFIXES:
            row["font"] = font_info(copied)
            if not row["font"]["headerValid"]:
                errors.append(f"Invalid font header: {copied}")
        if not is_raster and sha(copied) != captured_sha:
            errors.append(f"Non-raster bytes modified: {copied}")
        if args.verify_only and row["copiedSha256"] != old.get("copiedSha256"):
            errors.append(f"Copied SHA differs from saved audit: {copied}")
        rows.append(row)
        if original != captured:
            original_copy = DEST / original.name
            if not args.verify_only:
                shutil.copyfile(original, original_copy)
            if not original_copy.exists() or sha(original_copy) != original_sha:
                errors.append(f"Missing/changed retained original: {original_copy}")
            else:
                supplementary_files.append({"file": relative(original_copy), "sourceFile": relative(original),
                                            "sha256": original_sha, "bytes": original.stat().st_size})

    for name in ("manifest.json", "attributions.json"):
        source, target = LAB / "assets" / name, DEST / name
        if not args.verify_only:
            shutil.copyfile(source, target)
        if not target.exists() or sha(source) != sha(target):
            errors.append(f"Source metadata copy mismatch: {target}")
        else:
            supplementary_files.append({"file": relative(target), "sourceFile": relative(source),
                                        "sha256": sha(source), "bytes": source.stat().st_size})
    staged_by_source = {row["file"]: row for row in rows}
    missing_references = sorted(set(references) - set(staged_by_source))
    errors += [f"Documented local reference missing from staged asset set: {path}" for path in missing_references]
    source_rechecks = [row["file"] for row in rows
                       if sha(LAB / row["file"]) != row["capturedSha256"]
                       or sha(ROOT / row["originalFile"]) != row["originalSha256"]]
    errors += [f"Source changed while staging: {path}" for path in source_rechecks]
    report = {"schemaVersion": 1, "editionDate": weather["editionDate"], "liveData": False,
              "strategy": "Original source rasters as authoritative plates; same filenames, source pixels and dimensions. Metadata only; no resampling or generated factual imagery.",
              "assetManifestSha256": sha(manifest_path), "supplementarySha256": sha(LAB / "data/supplementary.json"),
              "weatherSha256": sha(LAB / "data/weather.json"), "rights": manifest["license"],
              "mapAttributions": attributions, "assets": rows, "retainedSourceMetadata": supplementary_files,
              "sprite": {"browserPath": "assets/c0cceccd7403-weather_sprite.png", "width": 2013, "height": 185,
                         "cellWidth": 60, "cellHeight": 60,
                         "positions": {"3": [-122, 0], "4": [-183, 0], "104": [-1342, 0], "109": [-1708, 0]},
                         "sourceFile": "esempi/ilmeteo-lab/assets/0f1e28f30645-responsive_template.css"},
              "resolutionLimits": {"nationalFullDayMap": [425, 460], "nationalPeriodMap": [315, 340],
                                   "newsPhotos": [200, 150], "meteorologistPhoto": [64, 64],
                                   "note": "Pixel dimensions are the captured source dimensions. No new detail or retina-resolution imagery is claimed."},
              "checks": {"assetCount": len(rows), "rasterCount": sum("image" in row for row in rows),
                         "fontCount": sum(row["category"] == "font" for row in rows),
                         "reusedAssetCount": reused_count,
                         "provenanceStorageCounts": dict(sorted(Counter(row["provenanceStorage"] for row in rows if "provenanceStorage" in row).items())),
                         "categoryCounts": dict(sorted(Counter(row["category"] for row in rows).items())),
                         "documentedLocalReferenceCount": len(references), "missingReferences": missing_references,
                         "originalBytesUntouched": not source_rechecks, "allSourceManifestHashesVerified": not any("SHA" in e or "bytes" in e for e in errors),
                         "allRasterPixelsUnchanged": all(row.get("pixelsUnchanged", True) for row in rows),
                         "allRasterProvenanceVerified": all(row.get("provenanceVerified", True) for row in rows),
                         "errors": errors, "passed": not errors}}
    if not args.verify_only:
        write(REPORT, report)
    print(json.dumps(report["checks"], ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
