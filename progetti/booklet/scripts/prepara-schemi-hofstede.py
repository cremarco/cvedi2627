"""Esporta i sei schemi culturali dal disegno Typst nativo condiviso col volume."""

from __future__ import annotations

import argparse
from pathlib import Path
import xml.etree.ElementTree as ET

from booklet.common import BOOKLET, ROOT, digest, read_json, require, run, save_json, typst_options


BASE = BOOKLET / "assets/schemi-hofstede-vettoriali"
CATALOGO = ROOT / "risorse-condivise/immagini/figure/ricerca/dimensioni.json"
BANDIERE = ROOT / "risorse-condivise/immagini/figure/ricerca/bandiere"
FONTE_BANDIERE = ROOT / "risorse-condivise/fonti/booklet/dimensioni-culturali-native/flags/manifest.json"
SVG = "{http://www.w3.org/2000/svg}"
ET.register_namespace("", "http://www.w3.org/2000/svg")
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")


def annota_punteggi(root: ET.Element, values: list[dict], color: str) -> None:
    """Identifica i sei punteggi per verificare colore e resa dei singoli valori."""
    score_groups = []
    for parent in root.iter():
        for use in parent:
            if use.tag != SVG + "use":
                continue
            if use.get("fill", "").lower() == color and parent not in score_groups:
                score_groups.append(parent)
    require(len(score_groups) == len(values), "Numero di gruppi dei punteggi SVG errato.")
    for group, value in zip(score_groups, values):
        group.set("data-country", value["italianName"])
        group.set("data-score", str(value["score"]))


def relativo(path: Path) -> str:
    return str(path.relative_to(ROOT))


def controlla_svg(path: Path) -> ET.Element:
    root = ET.parse(path).getroot()
    require(root.tag == SVG + "svg", f"SVG non valido: {path}")
    ids = {e.get("id") for e in root.iter() if e.get("id")}
    for node in root.iter():
        if node.tag == SVG + "use":
            href = node.get("href", node.get("{http://www.w3.org/1999/xlink}href", ""))
            require(href.startswith("#") and href[1:] in ids, f"Glifo SVG non risolto in {path}")
        if node.tag == SVG + "image":
            href = node.get("href", node.get("{http://www.w3.org/1999/xlink}href", ""))
            require(href.startswith("data:image/svg+xml"), f"Immagine non vettoriale in {path}")
    require(not any(value in path.read_text() for value in ("data:image/png", "data:image/jpeg")),
            f"Raster incorporato in {path}")
    return root


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Verifica gli SVG senza rigenerarli.")
    args = parser.parse_args()
    dimensions = read_json(CATALOGO)
    source = BASE / "esporta.typ"
    palette = read_json(ROOT / "risorse-condivise/immagini/aperture/manifest.json")["palette"]
    color = palette["famiglie"][palette["ordine"][1]]["colore"].lower()
    flags_manifest = read_json(FONTE_BANDIERE)
    require(digest(ROOT / flags_manifest["license"]["path"]) == flags_manifest["license"]["sha256"],
            "Licenza delle bandiere diversa dall’originale conservato.")
    verified = read_json(BASE / "valori-verificati.json")["dimensions"]
    pdi = read_json(BASE.parent / "schema-pdi-imagegen-v4/valori-verificati.json")
    expected = {d["code"]: [(v["italianName"], v["score"]) for v in d["observations"]]
                for d in verified}
    expected["PDI"] = [(v["paese"], v["indice"]) for v in pdi["observations"]]
    entries = []
    for dimension in dimensions:
        code = dimension["code"]
        values = dimension["data"]
        require([(v["italianName"], v["score"]) for v in values] == expected[code],
                f"Dati {code} diversi dai valori verificati online.")
        target = BASE / (code.lower() + ".svg")
        if not args.check:
            run(["typst", "compile", *typst_options({"dimensione": code}), str(source), str(target)])
            root = controlla_svg(target)
            annota_punteggi(root, values, color)
            title = ET.Element(SVG + "title", {"id": "titolo"})
            title.text = dimension["title"] + " · " + code
            desc = ET.Element(SVG + "desc", {"id": "descrizione"})
            desc.text = "Scala lineare 0–100. " + "; ".join(
                v["italianName"] + " " + str(v["score"]) for v in values)
            root.insert(0, title)
            root.insert(1, desc)
            root.set("role", "img")
            root.set("aria-labelledby", "titolo descrizione")
            ET.ElementTree(root).write(target, encoding="utf-8", xml_declaration=True)
        root = controlla_svg(target)
        require(root.find(SVG + "title") is not None and root.find(SVG + "desc") is not None,
                f"Titolo o descrizione accessibile assente: {target}")
        scores = [e for e in root.iter() if e.get("data-score") is not None]
        require([(e.get("data-country"), int(e.get("data-score"))) for e in scores]
                == [(v["italianName"], v["score"]) for v in values],
                f"Punteggi SVG mancanti o associati ai paesi errati: {target}")
        for score in scores:
            require(all(e.get("fill", color).lower() == color for e in score.iter()),
                    f"Colore del punteggio diverso dal capitolo: {target}")
        flags = []
        for value in values:
            flag = BANDIERE / (value["iso"] + ".svg")
            controlla_svg(flag)
            original = FONTE_BANDIERE.parent / "originals" / flag.name
            require(digest(flag) == digest(original), f"Bandiera diversa dall’originale: {flag.name}")
            flags.append({"paese": value["italianName"], "iso": value["iso"],
                          "punteggio": value["score"], "asset": relativo(flag), "sha256": digest(flag)})
        entries.append({"codice": code, "titolo": dimension["title"], "svg": target.name,
                        "sha256": digest(target), "valori_bandiere": flags})
    manifest = {
        "versione": 1, "stato": "attivo-booklet-vettoriale",
        "origine": "Ricostruzione nativa dello schema PDI approvato, estesa alle sei dimensioni.",
        "riferimento_grafico": "../schema-pdi-imagegen-v4/schema-pdi-rifinito-v4.png",
        "valori_verificati": "valori-verificati.json", "consultazione": "2026-10-25",
        "catalogo": relativo(CATALOGO), "sorgente_esportazione": relativo(source),
        "renderer": {"percorso": "progetti/booklet/assets/diagrams/cultural-indices.typ",
                     "sha256": digest(BOOKLET / "assets/diagrams/cultural-indices.typ"), "funzione": "cultural-chart"},
        "generatore": relativo(Path(__file__).resolve()),
        "font": "risorse-condivise/font/editoriali/manifest.json",
        "bandiere": {"manifest": relativo(FONTE_BANDIERE), "origine": flags_manifest["sourceRepository"],
                     "commit": flags_manifest["upstreamCommit"], "licenza": flags_manifest["license"]},
        "vettoriale": True, "raster_incorporati": False,
        "colore_punteggi": color,
        "gruppi_punteggi_svg": 6,
        "testi_booklet": "Testi, valori, didascalie e attribuzioni Typst nativi; bandiere SVG originali.",
        "schemi": entries,
    }
    if args.check:
        require(read_json(BASE / "manifest.json") == manifest,
                "Esportazioni, dati o renderer cambiati: rigenerare gli schemi.")
    else:
        save_json(BASE / "manifest.json", manifest)
    print("Verificati" if args.check else "Esportati", len(entries), "schemi SVG senza raster; 36 valori coerenti.")


if __name__ == "__main__":
    main()
