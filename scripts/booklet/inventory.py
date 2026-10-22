"""Contratti strutturali del volume e delle composizioni editoriali."""

from __future__ import annotations

from collections import defaultdict
import re

from .common import PT_MM, require


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
    return {"capitoli": data["capitoli"], "bibliografie": data["bibliografie"],
            "bibliografie_native": data["bibliografie_native"],
            "figure": len(data["figure"]), "note": len(notes), "ripetute": data["ripetute"],
            "sagome": len(data["sagome"])}
