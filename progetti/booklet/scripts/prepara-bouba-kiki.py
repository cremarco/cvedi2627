#!/usr/bin/env python3
"""Extract the published stimuli and derive transparent wrappers and alpha profiles.

The original PDF is preserved locally. SVG filters turn grayscale into alpha;
the published pixels are neither traced nor resampled. Compositing the derived
black silhouettes on white must reproduce the source within one grayscale level.
"""

from __future__ import annotations

import argparse
import base64
import sys

from PIL import Image
from pypdf import PdfReader

from booklet.common import BOOKLET, digest, read_json, require, run, save_json, typst_options

BASE = BOOKLET / "assets/bouba-kiki"
PDF = BASE / "originali/cwiek-2022.pdf"
SHAPES = {"bouba": "Im2.png", "kiki": "Im3.png"}


def verify(manifest):
    for entry in manifest["files"]:
        require(digest(BASE / entry["file"]) == entry["sha256"],
                "Bouba/kiki asset changed: " + entry["file"])
    for name, original in SHAPES.items():
        with Image.open(BASE / "originali" / original) as source, \
                Image.open(BASE / "derivati" / (name + ".png")) as transparent:
            require(source.size == transparent.size and transparent.mode == "RGBA",
                    "The transparent stimulus must retain its original pixel dimensions.")
            require(transparent.getchannel("A").getextrema() == (0, 255),
                    "The stimulus must have an opaque core and a transparent background.")
            pixels = source.convert("RGB").tobytes()
            on_white = bytes(255 - value for value in transparent.getchannel("A").tobytes())
            error = max(abs(channel - expected) for index in range(3)
                        for channel, expected in zip(pixels[index::3], on_white))
            require(error <= 1, "The transparent silhouette no longer matches the published pixels.")
        profile = read_json(BASE / "derivati" / (name + ".json"))
        require(profile["sha256"] == digest(BASE / "derivati" / (name + ".png")),
                "The alpha profile is stale: " + name)


def prepare():
    document = PdfReader(PDF)
    images = {entry.name: entry for entry in document.pages[2].images}
    (BASE / "derivati").mkdir(parents=True, exist_ok=True)
    temporary = BOOKLET / "build/verifiche/bouba-kiki"
    temporary.mkdir(parents=True, exist_ok=True)
    for name, original in SHAPES.items():
        extracted = images[original]
        (BASE / "originali" / original).write_bytes(extracted.data)
        width, height = extracted.image.size
        encoded = base64.b64encode(extracted.data).decode("ascii")
        svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  <title>{name.capitalize()}</title>
  <desc>Published stimulus from Ćwiek et al. (2022), Figure 1. Black pixels and the original dimensions are preserved; white becomes transparent.</desc>
  <defs>
    <filter id="paper-to-alpha" filterUnits="userSpaceOnUse" x="0" y="0" width="{width}" height="{height}" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.2126 -0.7152 -0.0722 0 1"/>
    </filter>
  </defs>
  <image width="{width}" height="{height}" filter="url(#paper-to-alpha)" href="data:image/png;base64,{encoded}"/>
</svg>
'''
        (BASE / (name + ".svg")).write_text(svg, encoding="utf-8")
        source = temporary / (name + ".typ")
        source.write_text(f'''#set page(width: {width}pt, height: {height}pt, margin: 0pt, fill: none)
#image(path("/progetti/booklet/assets/bouba-kiki/{name}.svg"), width: 100%, height: 100%)
''', encoding="utf-8")
        png = BASE / "derivati" / (name + ".png")
        run(["typst", "compile", *typst_options(), "--format", "png", "--ppi", "72", str(source), str(png)])
        run([sys.executable, str(BOOKLET / "scripts/contorni.py"), str(png),
             str(BASE / "derivati" / (name + ".json")), "--fasce", "96"])
    manifest = {
        "schema": "cvedi-bouba-kiki/v1",
        "reference": {
            "authors": "Ćwiek et al.", "year": 2022, "copyright_year": 2021,
            "title": "The bouba/kiki effect is robust across cultures and writing systems",
            "doi": "10.1098/rstb.2020.0390", "figure": 1, "pdf_page": 3,
            "article_url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8591387/",
            "pdf_url": "https://findresearcher.sdu.dk/ws/portalfiles/portal/196586109/Open_Access_Version.pdf",
            "figure_url": "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/13d7/8591387/59c355c6cb38/rstb20200390f01.jpg",
            "data_repository": "https://osf.io/w7crs/",
            "license": "CC BY 4.0", "license_url": "https://creativecommons.org/licenses/by/4.0/",
            "upstream_credit": "The article credits the shapes as adapted from Bremner et al. (2013).",
            "retrieved": "2026-10-26",
        },
        "shapes": SHAPES,
        "transformation": "Original PDF image streams extracted as lossless PNGs. SVG converts grayscale into alpha without tracing or resampling. Rendering at 72 ppi preserves the original pixel grid; contorni.py derives the text-wrap profiles.",
        "chapter_properties": "Each call owns its format, width, side, caption, rights, alternative text and body.",
        "files": [{"file": str(p.relative_to(BASE)), "sha256": digest(p)}
                  for p in sorted(BASE.rglob("*")) if p.is_file() and p.name != "manifest.json"],
    }
    verify(manifest)
    save_json(BASE / "manifest.json", manifest)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check hashes, original pixels and alpha profiles.")
    args = parser.parse_args()
    if args.check:
        verify(read_json(BASE / "manifest.json"))
    else:
        prepare()
    print("Bouba/kiki originals, transparent silhouettes and alpha profiles verified.")
