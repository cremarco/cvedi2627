"""Controlla consegna, testo nativo, fonti e anteprime delle sette aperture."""
from pathlib import Path
import hashlib
import json
import xml.etree.ElementTree as ET

from PIL import Image, ImageDraw
import pymupdf

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[3]
OUT = ROOT / "reports/booklet-aperture-svg-v1"
NS = {"s": "http://www.w3.org/2000/svg"}


def main():
    manifest = json.loads((BASE / "manifest.json").read_text())
    composizioni = json.loads((BASE / "composizioni.json").read_text())["capitoli"]
    pdf = pymupdf.open(OUT / "campionario.pdf")
    assert len(manifest["capitoli"]) == len(pdf) == 7
    checks = []
    for i, c in enumerate(manifest["capitoli"]):
        for kind in ("svg", "disegno"):
            path = BASE / c[kind]
            root = ET.parse(path).getroot()
            ids = [n.get("id") for n in root.iter() if n.get("id")]
            assert len(ids) == len(set(ids)), path
            tags = {n.tag.rsplit("}", 1)[-1] for n in root.iter()}
            assert not tags & {"image", "foreignObject", "linearGradient", "radialGradient", "filter", "script"}, path
            texts = root.findall(".//s:text", NS)
            assert len(texts) == (2 if kind == "svg" else 0), path
            assert hashlib.sha256(path.read_bytes()).hexdigest() == c["sha256_" + kind]
            if kind == "svg":
                title = "".join(root.find('.//s:text[@id="titolo-capitolo"]', NS).itertext())
                assert title == c["titolo"]
                assert "data:font/ttf;base64," in root.find("s:style", NS).text
        for kind in ("riferimento", "prompt"):
            assert hashlib.sha256((BASE / c[kind]).read_bytes()).hexdigest() == c["sha256_" + kind]
        page = pdf[i]
        assert abs(page.rect.width - 170 * 72 / 25.4) < .02
        assert abs(page.rect.height - 240 * 72 / 25.4) < .02
        text = " ".join(page.get_text().split())
        assert c["titolo"] in text and f'{c["numero"]:02}' in text
        assert not page.get_images(), "Il campionario deve contenere forme e testo, senza raster."
        image = page.get_pixmap(matrix=pymupdf.Matrix(1055 / page.rect.width, 1491 / page.rect.height), alpha=False)
        image.save(OUT / (Path(c["svg"]).stem + ".png"))
        checks.append({"capitolo": c["numero"], "testi_nativi": True,
            "raster_svg": 0, "raster_pdf": 0, "id_univoci": True, "font_portabile": True,
            "originale_e_prompt_verificati": True})
    color = ET.parse(BASE / "disegni/05-colore.svg").getroot()
    spectrum = [n for n in color.iter() if n.get("data-famiglia")]
    assert len(spectrum) == len({n.get("data-famiglia") for n in spectrum}) == 17
    palette_library = json.loads((ROOT / "risorse-condivise/immagini/aperture/manifest.json").read_text())
    reference = next(c for c in palette_library["capitoli"] if c.get("spettro_famiglie"))
    assert [(n.get("data-famiglia"), n.get("fill")) for n in spectrum] == list(zip(reference["spettro_famiglie"], reference["spettro"]))
    samples = [color.find(f'.//*[@id="{name}"]') for name in ("campione-su-scuro", "campione-su-chiaro")]
    assert samples[0].get("width") == samples[1].get("width")
    assert samples[0].get("height") == samples[1].get("height")
    assert color.find('.//*[@id="campioni-identici"]').get("fill") == "#FF6467"

    # Le anteprime sono composizioni di QA, non nuovi asset del booklet.
    w, h, gap, label = 350, 495, 16, 24
    gallery = Image.new("RGB", (4 * (w + gap) + gap, 2 * (h + label + gap) + gap), "#E7E7E7")
    draw = ImageDraw.Draw(gallery)
    compare = Image.new("RGB", (7 * (w + gap) + gap, 2 * (h + label + gap) + gap), "#E7E7E7")
    compare_draw = ImageDraw.Draw(compare)
    print_gallery = gallery.copy()
    print_draw = ImageDraw.Draw(print_gallery)
    for i, (c, q) in enumerate(zip(manifest["capitoli"], composizioni)):
        name = Path(c["svg"]).stem
        svg_image = Image.open(OUT / "browser" / (name + ".png")).convert("RGB")
        pdf_image = Image.open(OUT / (name + ".png")).convert("RGB")
        original = Image.open(BASE / c["riferimento"]).convert("RGB")
        x, y = gap + (i % 4) * (w + gap), gap + (i // 4) * (h + label + gap)
        for sheet, painter, visual in ((gallery, draw, svg_image), (print_gallery, print_draw, pdf_image)):
            painter.text((x, y), c["titolo"], fill="#2E3138")
            sheet.paste(visual.resize((w, h)), (x, y + label))
        for j, visual in enumerate((original, svg_image)):
            x1, y1 = gap + i * (w + gap), gap + j * (h + label + gap)
            compare_draw.text((x1, y1), f'{i+1:02} ' + ("concept" if j == 0 else "SVG con testo editabile"), fill="#2E3138")
            compare.paste(visual.resize((w, h)), (x1, y1 + label))
    gallery.save(OUT / "contatto-svg.png")
    print_gallery.save(OUT / "contatto-stampa.png")
    compare.save(OUT / "confronto-svg.png")
    (OUT / "verifica.json").write_text(json.dumps({"capitoli": checks,
        "spettro_famiglie": 17, "campioni_identici": True,
        "pagine_pdf": 7, "formato_mm": [170, 240]}, ensure_ascii=False, indent=2) + "\n")
    print("Verificati 7 esecutivi SVG, 7 fondi e 7 pagine PDF native; confronti aggiornati.")


if __name__ == "__main__":
    main()
