"""Verifica delle destinazioni PDF e dei collegamenti delle note."""

from __future__ import annotations

from collections import defaultdict
from pathlib import Path
import re

from .common import PT_MM, digest, require


def note_links(annotations: list[dict], data: dict) -> dict:
    """Riconcilia coordinate native con link PDF, compreso l'offset Typst di 10 pt."""
    def reaches(annotation: dict, source: dict, target: dict) -> bool:
        destination = annotation["destinazione"]
        return (annotation["pagina"] == source["pagina"] and destination is not None
                and destination["pagina"] == target["pagina"]
                and abs(annotation["rettangolo"][0] - source["x"]) < 0.1
                and abs(destination["x"] - target["x"]) < 0.1
                and abs(destination["y"] - (target["y"] - 10)) < 0.1)

    # I link rilevanti stanno sulla pagina del richiamo o della voce: indicizzarli
    # una sola volta evita di ripercorrere l’intero volume per ciascuna nota.
    by_page = defaultdict(list)
    for annotation in annotations:
        by_page[annotation["pagina"]].append(annotation)
    entries = [note["voci"][0] for note in data["note"]]
    entries_by_page = defaultdict(list)
    for entry in entries:
        entries_by_page[entry["pagina"]].append(entry)
    for i, note in enumerate(data["note"], start=1):
        origin, entry = note["origine"], note["voci"][0]
        forward = sum(reaches(annotation, origin, entry) for annotation in by_page[origin["pagina"]])
        backward = sum(reaches(annotation, entry, origin) for annotation in by_page[entry["pagina"]])
        require(forward == backward == 1,
                f"Link della nota {i} errati: {forward} di andata, {backward} di ritorno.")
        # Verifica che gli URL del corpo siano presenti nella propria voce PDF.
        following = [other["y"] for other in entries_by_page[entry["pagina"]]
                     if other["y"] > entry["y"] + 0.1]
        end = min(following) - 0.1 if following else 220 * PT_MM + 4
        expected = set(re.findall(r'dest: "(https?://[^"\\]+)"', note["corpo"]))
        actual = {annotation["uri"] for annotation in by_page[entry["pagina"]]
                  if annotation["uri"]
                  and entry["y"] - 2 <= annotation["rettangolo"][1] < end}
        require(expected <= actual, f"URL mancanti nella voce della nota {i}: {sorted(expected - actual)}")
    for i, repetition in enumerate(data["ripetizioni"], start=1):
        require(len(repetition["voci"]) == 1, f"Il richiamo ripetuto {i} non ha una voce unica.")
        count = sum(reaches(annotation, repetition["origine"], repetition["voci"][0])
                    for annotation in by_page[repetition["origine"]["pagina"]])
        require(count == 1, f"Il richiamo ripetuto {i} non raggiunge la voce originale.")
    return {"andata_ritorno": len(entries), "ripetuti": len(data["ripetizioni"])}


def check_pdf(path: Path, data: dict | None = None) -> dict:
    from pypdf import PdfReader

    initial_hash = digest(path)
    reader = PdfReader(path)
    page_ids = {page.indirect_reference.idnum: i for i, page in enumerate(reader.pages, start=1)}
    names = reader.named_destinations
    internal = external = 0
    annotations = []
    for page_number, page in enumerate(reader.pages, start=1):
        for reference in page.get("/Annots", []):
            annotation = reference.get_object()
            if annotation.get("/Subtype") != "/Link":
                continue
            action = annotation.get("/A", {})
            action = action.get_object() if hasattr(action, "get_object") else action
            if action.get("/S") == "/URI":
                require(bool(action.get("/URI")), f"Collegamento esterno vuoto: {path.name}")
                external += 1
            destination = annotation.get("/Dest")
            if action.get("/S") == "/GoTo":
                destination = action.get("/D")
            point = None
            rect = list(map(float, annotation["/Rect"]))
            rect = [rect[0], float(page.mediabox.top) - rect[3],
                    rect[2], float(page.mediabox.top) - rect[1]]
            if destination is None:
                annotations.append({"pagina": page_number, "rettangolo": rect,
                                    "destinazione": None, "uri": action.get("/URI")})
                continue
            internal += 1
            destination = destination.get_object() if hasattr(destination, "get_object") else destination
            if isinstance(destination, str):
                require(destination in names, f"Destinazione interna assente: {destination} in {path.name}")
                require(reader.get_destination_page_number(names[destination]) is not None,
                        f"Destinazione interna senza pagina: {destination}")
                named = names[destination]
                target_page = reader.get_destination_page_number(named) + 1
                if named.left is not None and named.top is not None:
                    point = {"pagina": target_page, "x": float(named.left),
                             "y": float(reader.pages[target_page - 1].mediabox.top) - float(named.top)}
            else:
                page_ref = destination[0]
                require(getattr(page_ref, "idnum", None) in page_ids,
                        f"Destinazione verso una pagina assente: {path.name}")
                target_page = page_ids[page_ref.idnum]
                if destination[1] == "/XYZ":
                    point = {"pagina": target_page, "x": float(destination[2]),
                             "y": float(reader.pages[target_page - 1].mediabox.top) - float(destination[3])}
            annotations.append({"pagina": page_number, "rettangolo": rect,
                                "destinazione": point, "uri": action.get("/URI")})
    result = {"pagine": len(reader.pages), "link_interni": internal, "link_esterni": external}
    if data is not None:
        result["link_note"] = note_links(annotations, data)
    require(digest(path) == initial_hash, f"Il PDF è cambiato durante il controllo: {path.name}")
    result["sha256"] = initial_hash
    return result
