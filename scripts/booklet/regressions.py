"""Prove editoriali isolate: pesi, APA, sagome e richiami ripetuti."""

from __future__ import annotations

from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

from .common import PROVE, require, run
from .documents import compile_document, inventory
from .inventory import check_inventory
from .pdf import check_pdf


def check_strong(output: Path) -> dict:
    compile_document(PROVE / "grassetto.typ", output)
    svg = ET.parse(output).getroot()
    references = [node.get("{http://www.w3.org/1999/xlink}href") for node in svg.iter()
                  if node.tag.endswith("}use")]
    paths = {"#" + node.get("id"): tuple(child.get("d") for child in node.iter()
             if child.tag.endswith("}path")) for node in svg.iter() if node.tag.endswith("}symbol")}
    require(len(references) >= 7, "Il campione SVG dei pesi non contiene i glifi attesi.")
    outlines = [paths[reference] for reference in references]
    require(outlines[0] == outlines[1] and outlines[0] != outlines[2],
            "Il contorno strong non coincide con DM Sans 700/opsz14 oppure coincide con 900.")
    require(outlines.count(outlines[3]) == 2, "Il titolo di sezione non conserva Sora 800.")
    require(outlines.count(outlines[4]) == 2, "Il sottoparagrafo non conserva DM Sans 900/opsz14.")
    return {"strong_700": True, "sezione_800": True, "sottoparagrafo_900": True}


def check_regressions(output: Path) -> dict:
    # Le prove Python proteggono anche i controlli: un errore nella verifica
    # non deve trasformare silenziosamente un documento errato in un successo.
    run([sys.executable, "-m", "unittest", "discover", "-s", str(PROVE), "-p", "test_*.py"])
    result = {"strumenti": {"esito": "ok"}, "pesi": check_strong(output / "grassetto.svg")}
    # La compatibilità APA deve conservare suffissi e date complete, correggendo
    # soltanto la virgola errata delle date che attestano esclusivamente l'anno.
    source, pdf = PROVE / "bibliografia.typ", output / "bibliografia.pdf"
    compile_document(source, pdf)
    from pypdf import PdfReader
    text = re.sub(r"\s+", "", "".join(page.extract_text() or "" for page in PdfReader(pdf).pages))
    require("(2020,)" not in text and "(2020)" in text, "Punteggiatura APA errata per il solo anno.")
    require("(2024,marzo12)" in text, "La data APA completa non è conservata.")
    require("(s.d.-a)" in text and "(s.d.-b)" in text, "Suffissi APA senza data assenti.")
    data = inventory(source)
    result["bibliografia"] = {**check_inventory(data, {"figure": 0, "note": 0}), **check_pdf(pdf, data)}
    for case in ("overflow", "senza-note", "iniziale", "breve", "pari"):
        source, inputs = PROVE / "sagoma.typ", {"caso": case}
        pdf = output / f"sagoma-{case}.pdf"
        compile_document(source, pdf, inputs)
        data = inventory(source, inputs)
        expected_notes = 0 if case == "senza-note" else 3 if case == "overflow" else 1
        summary = check_inventory(data, {"figure": 1, "note": expected_notes})
        expected_paragraphs = list(range(3 if case in ("breve", "pari") else 30))
        require(data["paragrafi"] == expected_paragraphs, f"Paragrafi persi, duplicati o riordinati: {case}")
        shape = data["sagome"][0]
        require(shape["pagina"] % 2 == (0 if case == "pari" else 1), f"Parità errata nella prova {case}.")
        result[f"sagoma-{case}"] = {**summary, **check_pdf(pdf, data)}
    source, pdf = PROVE / "note-ripetute.typ", output / "note-ripetute.pdf"
    compile_document(source, pdf)
    data = inventory(source)
    require(data["ripetute"] == 3, "I riferimenti ripetuti alla nota non sono conservati.")
    result["note-ripetute"] = {**check_inventory(data, {"figure": 0, "note": 1}), **check_pdf(pdf, data)}
    return result
