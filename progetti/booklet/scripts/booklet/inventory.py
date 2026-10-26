"""Contratti strutturali del volume e delle composizioni editoriali."""

from __future__ import annotations

from collections import defaultdict
from math import isfinite
import re

from .common import PT_MM, require


def check_separated_captions(captions: list[dict]) -> None:
    """Il rimando segue il folio reale dell'immagine, anche dopo spostamenti."""
    labels = []
    for caption in captions:
        label = caption["figura"]
        require(isinstance(label, str) and bool(label),
                "Etichetta della didascalia separata assente.")
        labels.append(label)
        for key in ("origine", "immagine"):
            position = caption[key]
            require(type(position["pagina"]) is int and position["pagina"] > 0
                    and all(type(position[axis]) in (int, float) and isfinite(position[axis])
                            for axis in ("x", "y")),
                    f"Posizione della didascalia separata non valida: {label}")
        require(caption["origine"]["pagina"] != caption["immagine"]["pagina"],
                f"La didascalia separata non rimanda a un altro foglio: {label}")
        require(type(caption["folio"]) is int and caption["folio"] > 0
                and type(caption["folio_atteso"]) is int
                and caption["folio"] == caption["folio_atteso"],
                f"Folio della didascalia separata diverso dalla pagina dell'immagine: {label}")
    require(len(labels) == len(set(labels)),
            "Una figura ha più didascalie separate invece di un rimando univoco.")


def check_bleed_figures(captions: list[dict], bottoms: list[dict], pictures: list[dict],
                       notes: list[dict], figures: list[dict]) -> None:
    """Ogni immagine al vivo segue una sola caption al piede del foglio prima."""
    groups = {}
    for name, entries in (("didascalie al piede", bottoms), ("immagini al vivo", pictures)):
        labels = [entry["figura"] for entry in entries]
        require(all(isinstance(label, str) and bool(label) for label in labels)
                and len(labels) == len(set(labels)),
                f"Etichette assenti o duplicate nelle {name}.")
        groups[name] = {entry["figura"]: entry for entry in entries}
    by_bottom, by_picture = groups["didascalie al piede"], groups["immagini al vivo"]
    require(by_bottom.keys() == by_picture.keys(),
            "Immagine al vivo o didascalia al piede assente, duplicata o senza corrispondenza.")
    by_caption = {entry["figura"]: entry for entry in captions}
    for label, bottom in by_bottom.items():
        require(label in by_caption,
                f"La didascalia al piede non ha un unico rimando separato: {label}")
        picture, caption = by_picture[label], by_caption[label]
        origin, target = bottom["origine"], picture["origine"]
        for position in (origin, target):
            require(type(position["pagina"]) is int and position["pagina"] > 0
                    and all(type(position[axis]) in (int, float) and isfinite(position[axis])
                            for axis in ("x", "y")),
                    f"Posizione della figura al vivo o della didascalia al piede non valida: {label}")
        require(target["pagina"] == origin["pagina"] + 1
                and caption["origine"]["pagina"] == origin["pagina"]
                and caption["immagine"]["pagina"] == target["pagina"],
                f"La didascalia al piede non precede immediatamente l'immagine al vivo: {label}")
        require(all(type(bottom[key]) in (int, float) and isfinite(bottom[key]) and bottom[key] > 0
                    for key in ("altezza", "fondo"))
                and abs(origin["y"] + bottom["altezza"] - bottom["fondo"]) < 0.1
                and abs(bottom["fondo"] - 220 * PT_MM) < 0.1,
                f"La didascalia separata non è allineata al piede: {label}")
        require(all(type(bottom[key]) in (int, float) and isfinite(bottom[key]) and bottom[key] > 0
                    for key in ("riserva", "fondo_corpo"))
                and abs(bottom["fondo_corpo"] - ((240 - 20 - 35) * PT_MM - 8 - bottom["riserva"])) < .1,
                f"La riserva del corpo sopra la didascalia al piede non è valida: {label}")
        page_notes = [note for note in notes if note["pagina"] == origin["pagina"]]
        for note in page_notes:
            height = note.get("altezza")
            require(type(height) in (int, float) and isfinite(height) and height > 0
                    and len(note["voci"]) == 1
                    and note["voci"][0]["y"] + height <= origin["y"] - 8 + .1,
                    f"Le note non conservano 8 pt di distacco sopra la didascalia al piede: {label}")
        apparatus_top = (min(note["voci"][0]["y"] for note in page_notes) - 4.4
                         if page_notes else origin["y"])
        require(apparatus_top >= bottom["fondo_corpo"] + 8 - .1,
                f"Le note o la didascalia invadono lo spazio riservato alla prosa: {label}")
        require(abs(target["x"]) < 0.1 and abs(target["y"]) < 0.1,
                f"L'immagine al vivo non comincia sul bordo del foglio: {label}")
        native = picture["native"]
        require(len(native) == 1 and native[0]["pagina"] == target["pagina"]
                and all(abs(native[0][axis] - target[axis]) < 0.1 for axis in ("x", "y")),
                f"Figura al vivo nativa assente, duplicata o diversa dall'inserto dichiarato: {label}")
        require(type(picture["rapporto"]) in (int, float) and isfinite(picture["rapporto"])
                and picture["rapporto"] > 0
                and isinstance(picture["ancoraggio"], list) and len(picture["ancoraggio"]) == 2
                and all(type(value) in (int, float) and isfinite(value) and 0 <= value <= 1
                        for value in picture["ancoraggio"]),
                f"Rapporto o ancoraggio dell'immagine al vivo non valido: {label}")
        thumbnail, text, divider = (caption[key] for key in ("miniatura", "testo", "divisorio"))
        require(all(frame["origine"]["pagina"] == origin["pagina"]
                    for frame in (thumbnail, text, divider))
                and abs(thumbnail["altezza"] - text["altezza"]) < .01
                and abs(thumbnail["origine"]["y"] - text["origine"]["y"]) < .01
                and abs(thumbnail["larghezza"] / thumbnail["altezza"] - picture["rapporto"]) < .000001
                and abs(text["origine"]["x"] - thumbnail["origine"]["x"]
                        - thumbnail["larghezza"] - 3 * PT_MM) < .01,
                f"Miniatura e didascalia non sono allineate o proporzionate: {label}")
        require(abs(divider["origine"]["y"] - origin["y"]) < .01
                and abs(divider["origine"]["x"] - thumbnail["origine"]["x"]) < .01
                and abs(divider["larghezza"] - 137 * PT_MM) < .01
                and abs(thumbnail["origine"]["y"] - divider["origine"]["y"]
                        - divider["spessore"] - divider["distacco"]) < .01
                and abs(text["origine"]["y"] + text["altezza"] - bottom["fondo"]) < .01,
                f"Il divisorio o il gruppo didascalia non rispettano la gabbia: {label}")
    pages = [picture["origine"]["pagina"] for picture in pictures]
    require(len(pages) == len(set(pages)), "Due immagini al vivo occupano lo stesso foglio.")
    require(not (set(pages) & {bottom["origine"]["pagina"] for bottom in bottoms}),
            "Una didascalia occupa il foglio riservato a un'immagine al vivo.")
    require(not any(note["pagina"] in pages for note in notes),
            "Una nota occupa il foglio riservato a un'immagine al vivo.")
    for page in pages:
        require(sum(figure.get("visuale", {}).get("pagina") == page for figure in figures) == 1,
                f"Il foglio al vivo {page} non contiene una sola figura visiva.")


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


def check_exercises(exercises: list[dict], backgrounds: list[dict], ends: list[dict]) -> None:
    """Il fondo deve seguire soltanto la consegna, senza propagarsi ad altri fogli."""
    ids = [entry["id"] for entry in exercises]
    require(all(isinstance(ident, str) and bool(ident) for ident in ids)
            and len(ids) == len(set(ids)), "Identificatori degli esercizi assenti o duplicati.")
    require(len(backgrounds) == len(ends) == len(exercises),
            "Fondi o chiusure degli esercizi assenti, duplicati o su pagine estranee.")
    pages = [entry["origine"]["pagina"] for entry in exercises]
    require(len(pages) == len(set(pages)), "Due esercizi al piede sulla stessa pagina.")
    for entry in exercises:
        ident, origin = entry["id"], entry["origine"]
        background = [item for item in backgrounds if item["id"] == ident]
        end = [item for item in ends if item["id"] == ident]
        require(len(background) == len(end) == 1,
                f"Fondo o chiusura non univoci per l’esercizio {ident}.")
        background, end = background[0], end[0]["origine"]
        require(origin["pagina"] == background["pagina"] == background["dichiarata"]
                == background["ancora"] == end["pagina"],
                f"Fondo dell’esercizio su una pagina diversa dalla consegna: {ident}")
        require(all(type(value) in (int, float) and isfinite(value)
                    for value in (origin["x"], origin["y"], entry["y_fondo"], end["y"])),
                f"Geometria dell’esercizio non finita: {ident}")
        require(any(abs(origin["x"] - mm * PT_MM) < 0.1 for mm in (15, 18))
                and 15 * PT_MM - 0.1 <= entry["y_fondo"] < origin["y"]
                and origin["y"] < end["y"] <= 220 * PT_MM + 0.1,
                f"L’esercizio supera la gabbia o cambia pagina: {ident}")


def check_figures_in_text(pictures: list[dict]) -> None:
    """Le quote effettive includono l'intera caption, anche dopo i float larghi."""
    for picture in pictures:
        label = picture["figura"]
        columns = picture["colonne"]
        require(columns in (1, 2), f"Formato della figura nel testo non valido: {label}")
        values = [picture[key] for key in
                  ("larghezza", "altezza_visuale", "altezza_totale", "fondo_corpo")]
        require(all(type(value) in (int, float) and isfinite(value) and value > 0
                    for value in values), f"Quote della figura nel testo non valide: {label}")
        require(picture["larghezza"] <= (66 if columns == 1 else 137) * PT_MM + 0.1,
                f"Figura più larga del proprio contenitore: {label}")
        require(picture["altezza_totale"] >= picture["altezza_visuale"],
                f"La figura nel testo non riserva la propria visuale: {label}")
        top = picture["origine"]["y"]
        require(isfinite(top) and top >= 15 * PT_MM - 0.1
                and top + picture["altezza_totale"] <= picture["fondo_corpo"] + 0.1,
                f"Figura e didascalia oltre il corpo a pagina {picture['origine']['pagina']}: {label}")


def check_inventory(data: dict, expected: dict | None = None) -> dict:
    require(data["bibliografie_native"] == data["parti_bibliografiche_attese"],
            "Il numero delle parti bibliografiche native differisce dagli apparati dichiarati.")
    notes = data["note"]
    require(len(notes) == data["voci"] == len(data["regioni"]), "Il numero di note, voci e regioni differisce.")
    for i, note in enumerate(notes, start=1):
        require(len(note["voci"]) == 1, f"La nota {i} ha {len(note['voci'])} voci invece di una.")
        require(note["voci"][0]["pagina"] == note["pagina"], f"La nota {i} non è sulla pagina del richiamo.")
    for i, repetition in enumerate(data.get("ripetizioni", []), start=1):
        require(len(repetition["voci"]) == 1,
                f"Il richiamo ripetuto {i} non ha una voce unica.")
        require(repetition["origine"]["pagina"] == repetition["voci"][0]["pagina"],
                f"Il richiamo ripetuto {i} a pagina {repetition['origine']['pagina']} "
                "deve avere la nota sulla stessa pagina; creare una nuova nota locale.")
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
    check_figures_in_text(data.get("figure_nel_testo", []))
    check_separated_captions(data.get("didascalie_separate", []))
    check_bleed_figures(data.get("didascalie_separate", []), data.get("didascalie_al_piede", []),
                       data.get("figure_al_vivo", []), notes, data["figure"])
    check_exercises(data.get("esercizi", []), data.get("sfondi_esercizi", []),
                    data.get("fine_esercizi", []))
    return {"capitoli": data["capitoli"], "bibliografie": data["bibliografie"],
            "bibliografie_native": data["bibliografie_native"],
            "figure": len(data["figure"]), "note": len(notes), "ripetute": data["ripetute"],
            "sagome": len(data["sagome"]),
            "documenti_doppi": len(data.get("documenti_doppi", [])),
            "didascalie_separate": len(data.get("didascalie_separate", [])),
            "didascalie_al_piede": len(data.get("didascalie_al_piede", [])),
            "figure_al_vivo": len(data.get("figure_al_vivo", [])),
            "figure_nel_testo": len(data.get("figure_nel_testo", [])),
            "esercizi": len(data.get("esercizi", []))}
