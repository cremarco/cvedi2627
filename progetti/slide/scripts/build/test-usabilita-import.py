"""Import the historical testing slides without rewriting their teaching copy.

Requires pdfplumber, pypdf and Pillow (available in the Codex bundled Python).
The original PDF stays in materiali/; coordinates and hashes document all crops.
"""
from pathlib import Path
import hashlib
import json
import re
from collections import Counter

import pdfplumber
from pypdf import PdfReader
from PIL import Image

ROOT = Path(__file__).resolve().parents[4]
SOURCE = ROOT / "materiali/lezioni/2025-2026/08-usability-testing-contesto-culturale.pdf"
BASE = ROOT / "progetti/slide/assets/lezione-test-usabilita"
WEB = ROOT / "progetti/slide/public/images/test-usabilita"


def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def relative(path):
    return path.relative_to(ROOT).as_posix()


def text_in(page, box):
    return " ".join((page.crop(box).extract_text() or "").split())


def paragraphs(page, box):
    lines = page.crop(box).extract_text_lines()
    result = []
    previous = None
    for line in lines:
        text = line["text"].strip()
        marker = re.match(r"^(?:❏|\d+\.)\s*", text)
        separate = previous is None or line["top"] - previous["top"] > 22 or marker
        if separate:
            result.append({"type": "item" if marker else "paragraph", "text": text})
        else:
            result[-1]["text"] += " " + text
        previous = line
    return result


def crop(page, number, name, box, alt, rights, rasters_only=False):
    target = BASE / "originali" / (name + ".png")
    target.parent.mkdir(parents=True, exist_ok=True)
    WEB.mkdir(parents=True, exist_ok=True)
    # Embedded bitmaps are extracted independently of overlapping slide furniture.
    # Vector diagrams use an explicit crop of the original physical page instead.
    originals = []
    if rasters_only:
        scale = 180 / 72
        image = Image.new("RGB", (round((box[2] - box[0]) * scale), round((box[3] - box[1]) * scale)), "white")
        for placement in page.images:
            embedded = reader.pages[number - 1].images["/" + placement["name"]]
            original = BASE / "originali" / (name + "-" + embedded.name)
            original.write_bytes(embedded.data)
            originals.append({"file": relative(original), "sha256": digest(original)})
            bitmap = embedded.image.convert("RGB").resize((round((placement["x1"] - placement["x0"]) * scale), round((placement["bottom"] - placement["top"]) * scale)), Image.Resampling.LANCZOS)
            image.paste(bitmap, (round((placement["x0"] - box[0]) * scale), round((placement["top"] - box[1]) * scale)))
    else:
        image = page.crop(box).to_image(resolution=180).original
    image.save(target)
    web = WEB / (name + ".webp")
    # Reserve clear space for the shared zoom affordance; source pixels stay intact.
    padding_right = 96 if name.startswith("ruolo-") else 0
    display_image = image
    if padding_right:
        display_image = Image.new("RGB", (image.width + padding_right, image.height), "white")
        display_image.paste(image, (0, 0))
    display_image.save(web, lossless=True)
    return {"id": name, "sourcePage": number, "crop": list(box),
            "original": relative(target), "originalSha256": digest(target),
            "web": "/images/test-usabilita/" + web.name, "sha256": digest(web),
            "alt": alt, "rights": rights, "size": list(image.size),
            "webSize": list(display_image.size), "zoomClearanceRight": padding_right,
            "extraction": "embedded rasters without slide furniture" if rasters_only else "physical page crop",
            "embeddedOriginals": originals}


BASE.mkdir(parents=True, exist_ok=True)
pages = []
images = []
reader = PdfReader(SOURCE)
with pdfplumber.open(SOURCE) as pdf:
    for number in range(8, 87):
        page = pdf.pages[number - 1]
        item = {"page": number, "originalText": reader.pages[number - 1].extract_text(),
                "title": text_in(page, (40, 103, 680, 134)), "blocks": []}
        if number in [8, 11, 29, 41, 61]:
            box = (0, 0, 720, 380) if number in [8, 41] else (40, 140, 680, 285)
            item.update(kind="section", title=text_in(page, box))
        elif number in [15, 18, 20, 23, 26, 28]:
            concept = {15: "Affordance", 18: "Significanti", 20: "Mapping", 23: "Vincoli", 26: "Feedback", 28: "Modello concettuale"}[number]
            item.update(kind="image", title=concept + " · esempio")
            source_image = page.images[0]
            box = tuple(source_image[key] for key in ["x0", "top", "x1", "bottom"])
            image = crop(page, number, f"esempio-{number}", box,
                         "Tavola originale di confronto: " + concept.lower() + " negli oggetti quotidiani e nell’interfaccia web.",
                         "Esempio nella presentazione originale; attribuzione dell’immagine non indicata nella fonte", rasters_only=True)
            images.append(image)
            item["figure"] = image["id"]
        elif number in [12, 30] or 31 <= number <= 39 and page.images:
            item.update(kind="illustrated")
            if number in [12, 30]:
                item["blocks"] = paragraphs(page, (40, 137, 350, 375))
                alt = "Ritratto di " + ("Donald Norman" if number == 12 else "Jakob Nielsen") + " nella presentazione originale."
            else:
                subtitle = paragraphs(page, (40, 137, 680, 157))
                for block in subtitle:
                    block["type"] = "subtitle"
                item["blocks"] = subtitle + paragraphs(page, (40, 158, 320 if number == 38 else 360, 375))
                alt = "Esempio originale: " + " ".join(block["text"] for block in subtitle)
            box = (min(im["x0"] for im in page.images), min(im["top"] for im in page.images),
                   max(im["x1"] for im in page.images), min(page.height, max(im["bottom"] for im in page.images)))
            image = crop(page, number, f"figura-{number}", box, alt,
                         "Immagine nella presentazione originale; attribuzione non indicata nella fonte", rasters_only=True)
            images.append(image)
            item["figure"] = image["id"]
        elif number == 47:
            item.update(kind="table", title="Test tradizionali e test fai da te", rows=[])
            table_page = page.filter(lambda obj: not (obj.get("object_type") == "char" and obj.get("x0", 0) > 690 and obj.get("top", 0) > 380))
            cells = [r for r in page.rects if abs(r["x0"]) < .1 and abs(r["x1"] - 140.5) < 1 and r["top"] > 30]
            for cell in sorted(cells, key=lambda r: r["top"]):
                row = []
                for left, right in [(0, 140.5), (140.5, 438.2), (438.2, 720)]:
                    box = (left + 1, cell["top"] + 1, right - 1, min(cell["bottom"], page.height) - .5)
                    row.append(text_in(table_page, box))
                item["rows"].append(row)
            item["columns"] = ["", "TEST TRADIZIONALI", "TEST FAI DA TE"]
        elif number == 48:
            item.update(kind="objectives", blocks=paragraphs(page, (40, 140, 680, 175)), cards=[])
            for left, right in [(40, 253), (258, 466), (470, 680)]:
                item["cards"].append(text_in(page, (left, 280, right, 340)))
        elif number == 53:
            item.update(kind="diagram", title="Usability testing: le componenti")
            image = crop(page, number, "componenti-test", (60, 87, 646, 340),
                         "Il facilitatore amministra i compiti e osserva e intervista il partecipante, che esegue i compiti e dà feedback. Sotto sono riportate le definizioni dei tre ruoli.",
                         "Nielsen Norman Group · schema nella presentazione originale")
            images.append(image)
            item["figure"] = image["id"]
            item["figureText"] = text_in(page, (60, 87, 646, 340))
        elif 54 <= number <= 60:
            item.update(kind="role", blocks=paragraphs(page, (40, 140, 340, 375)))
            role = "facilitatore" if number <= 55 else "compiti" if number <= 58 else "partecipante"
            image_id = "ruolo-" + role
            image = next((im for im in images if im["id"] == image_id), None)
            if image is None:
                image = crop(page, number, image_id, (440, 155, 628, 340),
                             text_in(page, (440, 250, 645, 345)),
                             "Nielsen Norman Group · schema nella presentazione originale")
                images.append(image)
            item["figure"] = image_id
            item["figureText"] = text_in(page, (440, 250, 645, 345))
        elif number == 79:
            item.update(kind="problems", cards=[])
            for box in [(40, 160, 345, 225), (375, 160, 680, 225), (40, 255, 345, 335)]:
                block = paragraphs(page, box)
                item["cards"].append({"title": block[0]["text"], "text": " ".join(b["text"] for b in block[1:])})
        else:
            item.update(kind="text", blocks=paragraphs(page, (40, 137, 680, 375)))
            if number in [13, 14, 16, 17, 19, 21, 22, 24, 25, 27, 34, 40] and item["blocks"]:
                item["blocks"][0]["type"] = "subtitle"
        # The book cover and NN/g logo identify sources, not decorative assets.
        if number in [44, 49] or 53 <= number <= 60:
            item["attribution"] = "Nielsen Norman Group"
        elif number in [45, 46, 50, 51, 52] or number >= 62:
            item["attribution"] = "Steve Krug · Don’t Make Me Think"
        pages.append(item)

checks = []
for page in pages:
    original = re.sub(r"(?m)^\s*" + str(page["page"]) + r"\s*$", "", page["originalText"])
    if page["page"] in [8, 41]:
        original = re.sub(r"\s+" + str(page["page"]) + r"$", "", original)
    imported = [page["title"]] + [block["text"] for block in page["blocks"]]
    if page["kind"] == "image":
        imported = []
    elif page["kind"] == "table":
        imported = page["columns"] + [cell for row in page["rows"] for cell in row]
    elif page["kind"] == "diagram":
        imported = [page["figureText"]]
    elif page["kind"] == "objectives":
        imported += page["cards"]
    elif page["kind"] == "problems":
        imported += [text for card in page["cards"] for text in card.values()]
    if page["kind"] == "role":
        imported += [page["figureText"]]
    normalize = lambda text: re.sub(r"[\s❏]", "", text)
    assert Counter(normalize(original)) == Counter(normalize(" ".join(imported))), f"Incomplete source extraction on page {page['page']}"
    checks.append({"page": page["page"], "completeText": True})

save(BASE / "fonte-originale.json", {
    "file": relative(SOURCE), "sha256": digest(SOURCE),
    "collection": "materiali/lezioni/2025-2026", "originalTitle": reader.metadata.title,
    "physicalPages": [8, 86], "pageCount": len(reader.pages), "pages": pages, "transcriptionChecks": checks,
    "excluded": [{"pages": [1, 7], "reason": "Apertura e richiamo al processo UX: fuori dalla sezione selezionata."},
                 {"pages": [87, 172], "reason": "Contesto culturale e chiusura: fuori dalla sezione selezionata."}],
})
save(BASE / "immagini.json", {"source": relative(SOURCE), "sourceSha256": digest(SOURCE), "images": images})
print(f"Imported {len(pages)} source pages and {len(images)} original figures.")
