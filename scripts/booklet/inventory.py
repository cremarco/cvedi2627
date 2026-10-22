"""Contratti strutturali del volume e delle composizioni editoriali."""

from __future__ import annotations

from collections import defaultdict
from math import isfinite
import re

from .common import PT_MM, require


def check_document_spreads(spreads: list[dict]) -> None:
    """Verifica le coppie documentarie rispetto alle figure native effettive."""
    by_id = defaultdict(list)
    for spread in spreads:
        ident = spread["id"]
        require(isinstance(ident, str) and bool(ident), "ID della doppia documentaria non valido.")
        by_id[ident].append(spread)
        require(type(spread["pagine"]) is int and spread["pagine"] == 2,
                f"La doppia documentaria deve dichiarare due fogli: {ident}")
        require(type(spread["lato"]) is int and spread["lato"] in (0, 1),
                f"Lato della doppia documentaria non valido: {ident}")
        require(spread["pagina"] == spread["dichiarata"],
                f"Metadati della doppia sulla pagina errata: {ident}")
        for key in ("x", "y", "larghezza", "altezza", "scala"):
            value = spread[key]
            require(type(value) in (int, float) and isfinite(value),
                    f"Geometria della doppia non numerica o finita: {ident}")
        require(all(spread[key] > 0 for key in ("larghezza", "altezza", "scala")),
                f"Dimensioni o scala della doppia non positive: {ident}")
        dimensions = spread["dimensioni_fonte"]
        require(isinstance(dimensions, list) and len(dimensions) == 2
                and all(type(value) in (int, float) and isfinite(value) and value > 0
                        for value in dimensions),
                f"Dimensioni della fonte della doppia non valide: {ident}")
        require(abs(spread["larghezza"] / dimensions[0] - spread["scala"]) < 0.00001
                and abs(dimensions[1] * spread["scala"] - spread["altezza"]) < 0.01,
                f"Rapporto della fonte alterato sulla doppia: {ident}")
    for ident, pair in by_id.items():
        require(sorted(side["lato"] for side in pair) == [0, 1],
                f"Lati della doppia documentaria assenti, duplicati o non validi: {ident}")
        left, right = sorted(pair, key=lambda side: side["lato"])
        require(type(left["pagina"]) is int and type(right["pagina"]) is int
                and left["pagina"] % 2 == 0 and right["pagina"] == left["pagina"] + 1,
                f"Doppia documentaria senza pagine pari/dispari affiancate: {ident}")
        require(all(abs(left[key] - right[key]) < 0.01
                    for key in ("y", "larghezza", "altezza", "scala"))
                and left["dimensioni_fonte"] == right["dimensioni_fonte"],
                f"Scala, quota o fonte diversa sui due fogli della doppia: {ident}")
        require(abs(left["x"] - right["x"] - 170 * PT_MM) < 0.1,
                f"Documento disallineato sul dorso: {ident}")
        require(len(left["figura"]) == 1,
                f"Figura documentaria assente o duplicata: {ident}")
        actual = left["figura"][0]
        require(actual["pagina"] == left["pagina"]
                and abs(actual["x"] - left["x"]) < 0.1
                and abs(actual["y"] - left["y"]) < 0.1,
                f"Metadati diversi dalla figura documentaria nativa: {ident}")


def check_inventory(data: dict, expected: dict | None = None) -> dict:
    require(data["bibliografie_native"] == data["parti_bibliografiche_attese"],
            "Il numero delle parti bibliografiche native differisce dagli apparati dichiarati.")
    notes = data["note"]
    require(len(notes) == data["voci"] == len(data["regioni"]), "Il numero di note, voci e regioni differisce.")
    for i, note in enumerate(notes, start=1):
        require(len(note["voci"]) == 1, f"La nota {i} ha {len(note['voci'])} voci invece di una.")
        require(note["voci"][0]["pagina"] == note["pagina"], f"La nota {i} non è sulla pagina del richiamo.")
    for region in data["regioni"]:
        require(region["pagina"] == region["dichiarata"], "Regione note sulla pagina errata.")
        require(region["altezza"] <= region["spazio"] + 0.01, "Regione note oltre la fascia riservata.")
        require(abs(region["spazio"] - 35 * PT_MM) < 0.01, "La fascia note non misura 35 mm.")
        require(any(abs(region["larghezza"] - mm * PT_MM) < 0.01 for mm in (66, 137)),
                "Larghezza delle note diversa dai preset editoriali.")
    for figure in data["figure"]:
        if figure["mobile"]:
            require(figure["ancore"] >= 1, "Figura mobile priva dell'ancora visiva.")
    if expected:
        require(len(notes) == expected["note"], f"Inventario note cambiato: {len(notes)} invece di {expected['note']}.")
        require(len(data["figure"]) == expected["figure"],
                f"Inventario figure cambiato: {len(data['figure'])} invece di {expected['figure']}.")
        if data["capitoli"]:
            sequences = defaultdict(list)
            for figure in data["figure"]:
                match = re.fullmatch(r"(\d+)\.(\d+)", figure["progressivo"])
                require(match is not None, f"Progressivo figura non valido: {figure['progressivo']}")
                sequences[int(match[1])].append(int(match[2]))
            require(sorted(sequences) == list(range(1, data["capitoli"] + 1)),
                    "Le figure non appartengono ai capitoli attivi.")
            for chapter, sequence in sequences.items():
                require(sequence == list(range(1, len(sequence) + 1)),
                        f"Progressivi delle figure non consecutivi nel capitolo {chapter}.")
    by_id = defaultdict(list)
    for shape in data["sagome"]:
        by_id[shape["id"]].append(shape)
        if shape["lato"] == 0:
            require(len(shape["figura"]) == 1, f"Figura sagomata assente o duplicata: {shape['id']}")
            actual = shape["figura"][0]
            require(actual["pagina"] == shape["pagina"] and abs(actual["x"] - shape["x"]) < 0.1
                    and abs(actual["y"] - shape["y"]) < 0.1,
                    f"Metadati geometrici diversi dalla figura: {shape['id']}")
    for ident, shapes in by_id.items():
        # La dichiarazione del componente distingue il foglio singolo da una
        # doppia pagina a cui mancasse una metà. ID duplicati non sono altre sagome.
        pages = shapes[0]["pagine"]
        require(type(pages) is int and pages in (1, 2)
                and all(type(shape["pagine"]) is int and shape["pagine"] == pages for shape in shapes),
                f"Numero di pagine della sagoma assente o incoerente: {ident}")
        require(sorted(shape["lato"] for shape in shapes) == list(range(pages)),
                f"Lati della sagoma assenti, duplicati o non validi: {ident}")
        if len(shapes) == 2:
            left, right = sorted(shapes, key=lambda shape: shape["lato"])
            require(left["pagina"] % 2 == 0 and right["pagina"] == left["pagina"] + 1,
                    f"Coppia di pagine non affiancata: {ident}")
            require(all(abs(left[key] - right[key]) < 0.01 for key in ("y", "larghezza", "altezza")),
                    f"Scala o quota diversa sui due fogli: {ident}")
            require(abs(left["x"] - right["x"] - 170 * PT_MM) < 0.1,
                    f"Immagine disallineata sul dorso: {ident}")
    check_document_spreads(data.get("documenti_doppi", []))
    return {"capitoli": data["capitoli"], "bibliografie": data["bibliografie"],
            "bibliografie_native": data["bibliografie_native"],
            "figure": len(data["figure"]), "note": len(notes), "ripetute": data["ripetute"],
            "sagome": len(data["sagome"]),
            "documenti_doppi": len(data.get("documenti_doppi", []))}
