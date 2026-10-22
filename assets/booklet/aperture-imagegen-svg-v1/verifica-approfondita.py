"""Audit dei raccordi, dei testi reali e della coerenza SVG/PDF del campionario.

Richiede verifica-svg.mjs --dettagli --approfondito e verifica.py già eseguiti.
"""
from pathlib import Path
from zipfile import ZipFile
import base64
import hashlib
import json
import math
import re
import xml.etree.ElementTree as ET

import numpy as np
from PIL import Image, ImageFilter

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[2]
OUT = ROOT / "reports/booklet-aperture-svg-v1"


def luminance(rgb):
    v = rgb / 255
    return np.where(v <= .04045, v / 12.92, ((v + .055) / 1.055) ** 2.4) @ np.array([.2126, .7152, .0722])


def tangenti_gestalt():
    checks = []
    for el in ET.parse(BASE / "disegni/04-gestalt.svg").getroot().iter():
        if not el.tag.endswith("path"):
            continue
        tokens = re.findall(r"[A-Za-z]|[-+]?(?:\d*\.\d+|\d+)", el.get("d"))
        i, pos, previous = 0, (0., 0.), None
        while i < len(tokens):
            cmd = tokens[i]
            i += 1
            if cmd == "Z":
                break
            count = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6}[cmd]
            v = list(map(float, tokens[i:i + count]))
            i += count
            end = tuple(v[-2:]) if cmd in ("M", "L", "C") else ((v[0], pos[1]) if cmd == "H" else (pos[0], v[0]))
            if cmd == "M":
                pos, previous = end, None
                continue
            control = tuple(v[:2]) if cmd == "C" else end
            direction = (control[0] - pos[0], control[1] - pos[1])
            # Punta espressiva e tagli al bordo sono angoli intenzionali.
            smooth = 0 < pos[0] < 1055 and 0 < pos[1] < 1491 and pos != (795., 528.)
            if previous and smooth and (cmd == "C" or previous[0] == "C"):
                a, b = previous[1], direction
                angle = abs(math.degrees(math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1])))
                assert angle < .001, (el.get("id"), pos, angle)
                checks.append({"path": el.get("id"), "nodo": pos, "scarto_gradi": angle})
            previous = (cmd, (end[0] - v[2], end[1] - v[3]) if cmd == "C" else direction)
            pos = end
    return checks


def main():
    data = json.loads((BASE / "manifest.json").read_text())
    browser = json.loads((OUT / "browser.json").read_text())
    font = (ROOT / data["font"]).read_bytes()
    palette = ["#FFA2A2", "#FFB86A", "#FFD230", "#FFDF20", "#BBF451", "#7BF1A8", "#5EE9B5"]
    chapters = []
    with ZipFile(OUT / "aperture-svg.zip") as package:
        assert package.testzip() is None
        assert len([p for p in package.namelist() if p.endswith(".svg")]) == 7
        assert package.read("Sora-OFL.txt") == (ROOT / data["licenza_font"]).read_bytes()
        for i, c in enumerate(data["capitoli"]):
            path = BASE / c["svg"]
            name = path.stem
            svg, art = ET.parse(path).getroot(), ET.parse(BASE / c["disegno"]).getroot()
            assert package.read(path.name) == path.read_bytes()
            ids = {el.get("id") for el in svg.iter() if el.get("id")}
            for el in svg.iter():
                for key, value in el.attrib.items():
                    for ref in re.findall(r"url\(#([^)]+)\)", value):
                        assert ref in ids, (path, ref)
                    if key.endswith("href"):
                        assert value.startswith("#") and value[1:] in ids
            style = svg.find("{*}style").text
            embedded = re.search(r"base64,([^\"]+)", style).group(1)
            assert base64.b64decode(embedded) == font
            geometry = svg.find('.//*[@id="disegno"]')
            original = [el for el in art if el.tag.rsplit("}", 1)[-1] not in ("title", "desc", "metadata")]
            assert [ET.tostring(el) for el in geometry] == [ET.tostring(el) for el in original]
            assert art.find('.//*[@data-palette="principale"]').get("fill") == palette[i]
            assert browser[i]["modificaProgrammatica"]
            full = Image.open(OUT / "browser" / f"{name}.png").convert("RGB")
            printed = Image.open(OUT / f"{name}.png").convert("RGB")
            a, b = np.asarray(full, dtype=np.int16), np.asarray(printed, dtype=np.int16)
            flat = np.ones(a.shape[:2], dtype=bool)
            # Esclude due pixel attorno ai bordi: l'antialias differisce fra i motori.
            for visual in (full, printed):
                high = np.asarray(visual.filter(ImageFilter.MaxFilter(5)), dtype=np.int16)
                low = np.asarray(visual.filter(ImageFilter.MinFilter(5)), dtype=np.int16)
                flat &= np.max(high - low, axis=2) < 4
            mismatch = int(((np.max(np.abs(a - b), axis=2) > 8) & flat).sum())
            assert mismatch == 0, (name, mismatch)
            check = {"capitolo": i + 1, "font_incorporato_identico": True, "forme_fondo_esecutivo_identiche": True,
                     "palette_esatta": True, "modifica_programmatica_verificata": True,
                     "differenze_svg_pdf_campiture_interne": mismatch, "pixel_interni_confrontati": int(flat.sum()),
                     "sha256_svg": hashlib.sha256(path.read_bytes()).hexdigest(), "testi": []}
            bg = np.asarray(Image.open(OUT / "audit" / f"{name}-fondo.png").convert("RGB"))
            for role in ("titolo-capitolo", "numero-capitolo"):
                mask = np.asarray(Image.open(OUT / "audit" / f"{name}-{role}.png").convert("RGBA"))
                ys, xs = np.where(mask[:, :, 3] > 250)
                ink, back = luminance(mask[ys, xs, :3]), luminance(bg[ys, xs, :])
                contrast = (np.maximum(ink, back) + .05) / (np.minimum(ink, back) + .05)
                assert xs.min() > 0 and ys.min() > 0 and xs.max() < 1054 and ys.max() < 1490
                assert contrast.min() >= 3, (name, role, contrast.min())
                check["testi"].append({"ruolo": role, "inchiostro_interamente_nel_foglio": True,
                                       "limiti": [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1],
                                       "contrasto_minimo": round(float(contrast.min()), 3)})
            chapters.append(check)
    joins = tangenti_gestalt()
    result = {"esito": "superato", "capitoli": chapters, "tangenti_gestalt": joins,
              "massimo_scarto_tangenti_gradi": max(c["scarto_gradi"] for c in joins),
              "archivio_coerente": True, "licenza_inclusa": True,
              "limiti": "Confronto digitale a 1055×1491, dettagli al 400%; non è una prova fisica di stampa. Il confronto numerico esclude l'antialias dei bordi; i raccordi sono anche ispezionati visivamente."}
    (OUT / "audit-generale.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(f"Audit superato: 7 aperture, 14 testi, {len(joins)} raccordi Gestalt, archivio e resa SVG/PDF.")


if __name__ == "__main__":
    main()
