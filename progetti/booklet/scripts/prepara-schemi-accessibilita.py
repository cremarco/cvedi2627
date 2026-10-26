"""Esporta e verifica gli schemi nativi di Accessibilità senza incorporare raster."""

from __future__ import annotations

import argparse
from pathlib import Path
import xml.etree.ElementTree as ET

from booklet.common import BOOKLET, ROOT, digest, read_json, require, run, save_json, typst_options

BASE = BOOKLET / "assets/schemi-accessibilita-vettoriali"
DATI = BASE / "contenuti.json"
RENDERER = BOOKLET / "assets/diagrams/interface-barriers.typ"
NS = "{http://www.w3.org/2000/svg}"
ET.register_namespace("", "http://www.w3.org/2000/svg")
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")


def controlla_svg(file: Path) -> None:
    root = ET.parse(file).getroot()
    require(root.tag == NS + "svg", f"SVG non valido: {file.name}")
    ids = {node.get("id") for node in root.iter() if node.get("id")}
    for node in root.iter():
        require(node.tag not in {NS + "image", NS + "foreignObject", NS + "filter"},
                f"Raster, HTML o filtro nello schema: {file.name}")
        if node.tag == NS + "use":
            href = node.get("href", node.get("{http://www.w3.org/1999/xlink}href", ""))
            require(href.startswith("#") and href[1:] in ids,
                    f"Contorno del glifo mancante: {file.name}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    dati = read_json(DATI)
    for caso in dati["bersagli"]["casi"]:
        # Per quadrati allineati, il passo dei centri coincide con lato + spazio.
        # I cerchi di verifica di diametro 24 sono disgiunti o tangenti da passo 24.
        passa = caso["lato"] >= 24 or caso["lato"] + caso["spazio"] >= 24
        require(caso["sufficiente"] == passa, "Esito incompatibile con la geometria dei bersagli.")
    capitolo = (BOOKLET / "capitoli/03-accessibilita.typ").read_text(encoding="utf-8")
    jobs = [("bersagli", "barriera", dati["bersagli"]["titolo"], dati["bersagli"]["originale"])]
    for schema in dati["confronti"]:
        for variante in ("barriera", "scelte"):
            jobs.append((schema["nome"], variante, schema["titolo"], schema["originali"][variante]))
    entries = []
    for nome, variante, titolo, originale in jobs:
        name = nome if nome == "bersagli" else f"{nome}-{variante}"
        file = BASE / "svg" / f"{name}.svg"
        if not args.check:
            file.parent.mkdir(parents=True, exist_ok=True)
            run(["typst", "compile", *typst_options({"schema": nome, "variante": variante}),
                 str(BASE / "esporta.typ"), str(file)])
            root = ET.parse(file).getroot()
            label = ET.Element(NS + "title", {"id": "titolo-schema"})
            label.text = titolo + ("" if nome == "bersagli" else " · " + variante)
            root.insert(0, label)
            root.set("role", "img")
            root.set("aria-labelledby", "titolo-schema")
            ET.ElementTree(root).write(file, encoding="utf-8", xml_declaration=True)
        controlla_svg(file)
        if nome != "bersagli":
            require(capitolo.count("/" + str(file.relative_to(ROOT))) == 1
                    and "/" + originale not in capitolo,
                    f"Schema SVG assente, duplicato o ancora affiancato al raster: {name}")
        require(digest(ROOT / originale) == dati["sha256_originali"][originale],
                f"Originale modificato: {originale}")
        entries.append({"nome": nome, "variante": variante,
                        "percorso": str(file.relative_to(ROOT)), "sha256": digest(file),
                        "originale": originale, "sha256_originale": digest(ROOT / originale)})
    fonts = read_json(ROOT / "risorse-condivise/font/editoriali/manifest.json")
    font = next(f for f in fonts["font"] if f["id"] == "dm-sans-variabile")
    manifest = {
        "schema": "cvedi-booklet-accessibilita-vettoriale/v1", "data": "2026-10-25",
        "ambito": "17 confronti simulati in 34 pannelli SVG; schema dei bersagli nativo Typst e SVG autonomo.",
        "contenuti": {"percorso": str(DATI.relative_to(ROOT)), "sha256": digest(DATI)},
        "renderer": {"percorso": str(RENDERER.relative_to(ROOT)), "sha256": digest(RENDERER)},
        "esportatore": {"percorso": str((BASE / "esporta.typ").relative_to(ROOT)),
                        "sha256": digest(BASE / "esporta.typ")},
        "generatore": str(Path(__file__).resolve().relative_to(ROOT)),
        "font": {"percorso": font["percorso"], "sha256": font["sha256"],
                 "licenza_id": font["licenza_id"], "famiglia": "DM Sans", "peso": "400–700"},
        "resa": "Geometrie e contorni autentici dei glifi esportati da Typst. Nessuna immagine incorporata, nessun filtro o testo HTML.",
        "conservazione": "Raster e SVG precedenti restano integri nei percorsi condivisi e con i rispettivi manifest.",
        "palette": {"capitolo": "amber 300 #FFD230", "inchiostro": "#2E3138",
                    "errore": "#C10007", "guida_bersagli": "#973C00"},
        "fonte_bersagli": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
        "asset": entries,
    }
    if args.check:
        require(read_json(BASE / "manifest.json") == manifest,
                "Contenuti, renderer o SVG cambiati: rigenerare gli schemi.")
    else:
        save_json(BASE / "manifest.json", manifest)
    print(("Verificati" if args.check else "Esportati"), len(entries), "schemi SVG senza raster.")


if __name__ == "__main__":
    main()
