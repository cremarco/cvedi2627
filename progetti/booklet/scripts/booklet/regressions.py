"""Prove editoriali isolate: pesi, APA, flusso, sagome e richiami ripetuti."""

from __future__ import annotations

from pathlib import Path
import json
import re
import sys
import xml.etree.ElementTree as ET

from .common import PROVE, PT_MM, ROOT, require, run, typst_options
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


def flow_data(source: Path, inputs: dict) -> dict:
    expression = '{ import path("/progetti/booklet/scripts/booklet-prove/flusso.typ"): flow-data; flow-data() }'
    return json.loads(run(["typst", "eval", *typst_options(inputs), "--in", str(source), expression]))


def check_flow_layout(data: dict) -> int:
    paragraphs = data["paragrafi"]
    require([p["valore"] for p in paragraphs] == ["apertura", *range(16)],
            "Paragrafi del flusso persi, duplicati o riordinati.")
    opening, following = paragraphs[0], paragraphs[1:]
    filled = sum(p["pagina"] == opening["pagina"] for p in following)
    require(filled >= 3, "Il seguito non completa la pagina precedente alla tavola mobile.")
    require(opening["pagina"] < data["tavola"]["pagina"] < following[-1]["pagina"],
            "La tavola non si colloca fra la prima pagina riempita e il seguito della prosa.")
    require(all(p["pagina"] != data["tavola"]["pagina"] for p in paragraphs),
            "La prosa occupa la pagina riservata alla tavola intera.")
    positions = [(p["pagina"], round(p["x"], 1), p["y"]) for p in paragraphs]
    require(positions == sorted(positions), "Il flusso non conserva l'ordine sinistra-destra.")
    return filled


def check_column_flow_layout(data: dict, native: dict) -> int:
    """La metafora di Ricerca resta nella colonna insieme alla prosa."""
    paragraphs = data["paragrafi"]
    require([p["valore"] for p in paragraphs] == ["apertura", *range(16)],
            "Paragrafi del flusso persi, duplicati o riordinati.")
    positions = [(p["pagina"], round(p["x"], 1), p["y"]) for p in paragraphs]
    require(positions == sorted(positions), "Il flusso non conserva l'ordine sinistra-destra.")
    figures = native.get("figure_nel_testo", [])
    require(len(figures) == 1 and figures[0]["figura"] == "<booklet-prova-tavola>",
            "La prova di Ricerca non identifica una sola figura nel testo.")
    figure, target = figures[0], data["tavola"]
    require(figure["colonne"] == 1 and abs(figure["larghezza"] - 66 * PT_MM) < .01,
            "La metafora di Ricerca non occupa una colonna da 66 mm.")
    require(figure["origine"]["pagina"] == target["pagina"]
            and all(abs(figure["origine"][key] - target[key]) < .1 for key in ("x", "y")),
            "La quota della metafora non coincide con l'immagine visibile.")
    require(figure["altezza_totale"] > figure["altezza_visuale"] > 0,
            "La quota della metafora non comprende immagine e didascalia.")
    # check_inventory verifica queste quote contro il fondo reale del corpo,
    # compresa la didascalia: il campione non richiede più un foglio esclusivo.
    require(paragraphs[0]["pagina"] <= target["pagina"] < paragraphs[-1]["pagina"],
            "La metafora non si colloca fra l'apertura e il seguito della prosa.")
    shared = sum(p["pagina"] == target["pagina"] for p in paragraphs[1:])
    require(shared >= 1, "La metafora di Ricerca non condivide la pagina con il seguito della prosa.")
    return shared


def check_flow_reference(pdf: Path, data: dict) -> dict:
    """Il PDF deve raggiungere l'immagine effettiva, anche nei gruppi mobili."""
    from pypdf import PdfReader

    reader = PdfReader(pdf)
    source, target = data["richiamo"], data["tavola"]
    source_page = reader.pages[source["pagina"] - 1]
    links = []
    for reference in source_page.get("/Annots", []):
        annotation = reference.get_object()
        if annotation.get("/Subtype") != "/Link":
            continue
        rect = list(map(float, annotation["/Rect"]))
        height = float(source_page.mediabox.top)
        if (abs(rect[0] - source["x"]) < 0.1
                and height - rect[3] <= source["y"] <= height - rect[1]):
            links.append(annotation)
    require(len(links) == 1, "Il richiamo della tavola non ha un unico collegamento PDF.")
    destination = links[0].get("/Dest")
    require(destination is not None, "Il richiamo non ha una destinazione interna.")
    destination = destination.get_object()
    require(destination[1] == "/XYZ", "La destinazione non identifica la posizione della visuale.")
    page_ids = {page.indirect_reference.idnum: i for i, page in enumerate(reader.pages, start=1)}
    page = page_ids.get(destination[0].idnum)
    require(page == target["pagina"], "Il richiamo raggiunge il punto logico anziché la tavola visibile.")
    x = float(destination[2])
    y = float(reader.pages[page - 1].mediabox.top) - float(destination[3])
    # Typst anticipa le destinazioni di 10 pt e le limita al bordo del foglio.
    require(abs(x - target["x"]) < 0.1 and abs(y - max(0, target["y"] - 10)) < 0.1,
            "Il richiamo non raggiunge le coordinate della visuale.")
    return {"pagina": page, "posizione_visuale": True}


def check_flow(output: Path) -> dict:
    source = PROVE / "flusso.typ"
    result = {}
    for case in ("ricerca", "gestalt", "documentaria", "figura-pagina", "solo-testo"):
        inputs, pdf = {"caso": case}, output / f"flusso-{case}.pdf"
        compile_document(source, pdf, inputs)
        data = flow_data(source, inputs)
        native = inventory(source, inputs)
        filled = (check_column_flow_layout(data, native) if case == "ricerca"
                  else check_flow_layout(data))
        summary = check_inventory(native, {"figure": 2, "note": 0})
        require([f["numero"] for f in native["figure"]] == [1, 2],
                "La tavola mobile cambia l'ordine o il numero delle figure.")
        if case == "solo-testo":
            require(data["ancore-immagini"] == 0 and data["ancore-blocchi"] > 0,
                    "Il campione testuale mobile non usa la propria ancora di blocco.")
        if case == "ricerca":
            flow_summary = {"figura_in_colonna": True, "paragrafi_con_figura": filled}
        else:
            # Le quattro tavole ancora autonome conservano il controllo negativo
            # della barriera, senza modificare i componenti produttivi.
            negative = flow_data(source, {**inputs, "barriera": "si"})
            try:
                check_flow_layout(negative)
            except ValueError as error:
                require("Il seguito non completa" in str(error),
                        "Il controllo negativo fallisce per una causa estranea al flusso.")
            else:
                raise ValueError("La prova di flusso non rileva la barriera place.flush().")
            flow_summary = {"paragrafi_prima_della_tavola": filled, "barriera_rilevata": True}
        result[case] = {**summary, **check_pdf(pdf, native), **flow_summary,
                        "richiamo": check_flow_reference(pdf, data)}
    return result


def separated_caption_references(annotations: list[dict], texts: list[str], captions: list[dict]) -> list[dict]:
    """Verifica il link sul rimando testuale, distinto da quello della miniatura."""
    result = []
    for caption in captions:
        source, target = caption["origine"], caption["immagine"]
        links = [annotation for annotation in annotations
                 if annotation["pagina"] == source["pagina"]
                 and abs(annotation["rettangolo"][0] - source["x"]) < .1
                 and annotation["rettangolo"][1] - .01 <= source["y"] <= annotation["rettangolo"][3] + .01]
        require(len(links) == 1,
                f"Il rimando della didascalia separata non ha un unico link PDF: {caption['figura']}")
        destination = links[0]["destinazione"]
        require(destination is not None and destination["pagina"] == target["pagina"]
                and abs(destination["x"] - target["x"]) < .1
                and abs(destination["y"] - max(0, target["y"] - 10)) < .1,
                f"Il rimando della didascalia separata non raggiunge l'immagine visibile: {caption['figura']}")
        text = re.sub(r"\s+", "", texts[source["pagina"] - 1])
        expected = f"Nellapaginasuccessiva·p.{caption['folio']:03}→"
        require(expected in text,
                f"Numero di pagina assente o errato nel rimando stampato: {caption['figura']}")
        result.append({"figura": caption["figura"], "pagina_didascalia": source["pagina"],
                       "pagina_immagine": target["pagina"], "folio": caption["folio"],
                       "posizione_visuale": True})
    return result


def check_separated_caption_references(pdf: Path, data: dict) -> list[dict]:
    """Usabile anche sul volume completo dopo la sua verifica strutturale."""
    from pypdf import PdfReader

    reader = PdfReader(pdf)
    page_ids = {page.indirect_reference.idnum: i for i, page in enumerate(reader.pages, start=1)}
    annotations = []
    for page_number, page in enumerate(reader.pages, start=1):
        height = float(page.mediabox.top)
        for reference in page.get("/Annots", []):
            annotation = reference.get_object()
            if annotation.get("/Subtype") != "/Link":
                continue
            action = annotation.get("/A", {})
            action = action.get_object() if hasattr(action, "get_object") else action
            destination = annotation.get("/Dest")
            if action.get("/S") == "/GoTo":
                destination = action.get("/D")
            point = None
            if destination is not None:
                destination = destination.get_object() if hasattr(destination, "get_object") else destination
                if not isinstance(destination, str) and destination[1] == "/XYZ":
                    number = page_ids.get(destination[0].idnum)
                    if number is not None:
                        point = {"pagina": number, "x": float(destination[2]),
                                 "y": float(reader.pages[number - 1].mediabox.top) - float(destination[3])}
            rect = list(map(float, annotation["/Rect"]))
            annotations.append({"pagina": page_number,
                                "rettangolo": [rect[0], height - rect[3], rect[2], height - rect[1]],
                                "destinazione": point})
    return separated_caption_references(annotations, [page.extract_text() or "" for page in reader.pages],
                                        data.get("didascalie_separate", []))


def check_top_anchored_crop(matrix: tuple[float, ...], page_height: float) -> dict:
    """La trasformazione PDF deve rifilare un originale alto soltanto in basso."""
    _, _, _, height, x, bottom = matrix
    top = page_height - bottom - height
    require(abs(x) < .01 and abs(top) < .01 and height > page_height and bottom < -.01,
            "L'ancoraggio superiore dell'immagine al vivo ritaglia anche il bordo alto.")
    return {"rifilo_superiore_mm": round(abs(top) / PT_MM, 4),
            "rifilo_inferiore_mm": round(-bottom / PT_MM, 4)}


def raster_placements(page, reader, dimensions: tuple[int, int]) -> list[dict]:
    """Legge trasformazione e frame visibile dopo le clip rettangolari Typst."""
    from pypdf.generic import ContentStream

    def point(x, y):
        a, b, c, d, e, f = matrix
        return a * float(x) + c * float(y) + e, b * float(x) + d * float(y) + f

    xobjects = page["/Resources"].get("/XObject", {})
    matrix, clip = (1., 0., 0., 1., 0., 0.), tuple(map(float, page.mediabox))
    stack, path, matches = [], [], []
    for operands, operation in ContentStream(page.get_contents(), reader).operations:
        if operation == b"q":
            stack.append((matrix, clip))
        elif operation == b"Q":
            matrix, clip = stack.pop()
        elif operation == b"cm":
            a, b, c, d, e, f = matrix
            g, h, i, j, k, l = map(float, operands)
            matrix = (a*g + c*h, b*g + d*h, a*i + c*j, b*i + d*j,
                      a*k + c*l + e, b*k + d*l + f)
        elif operation in (b"m", b"l"):
            path.append(point(*operands))
        elif operation == b"re":
            x, y, width, height = map(float, operands)
            path.extend(point(px, py) for px, py in
                        ((x, y), (x + width, y), (x + width, y + height), (x, y + height)))
        elif operation in (b"c", b"v", b"y"):
            path.extend(point(*operands[index:index + 2]) for index in range(0, len(operands), 2))
        elif operation in (b"W", b"W*") and path:
            xs, ys = zip(*path)
            clip = (max(clip[0], min(xs)), max(clip[1], min(ys)),
                    min(clip[2], max(xs)), min(clip[3], max(ys)))
        elif operation in (b"n", b"S", b"s", b"f", b"F", b"f*", b"B", b"B*", b"b", b"b*"):
            path = []
        elif operation == b"Do":
            visual = xobjects[operands[0]].get_object()
            if (visual.get("/Subtype") == "/Image"
                    and (visual.get("/Width"), visual.get("/Height")) == dimensions):
                matches.append({"matrix": matrix, "clip": clip})
    return matches


def check_thumbnail_visibility(matrix: tuple[float, ...], clip: tuple[float, ...]) -> dict:
    """Una CTM corretta non basta se il frame interno ritaglia la miniatura."""
    a, _, _, d, x, bottom = matrix
    visible_width = min(x + a, clip[2]) - max(x, clip[0])
    visible_height = min(bottom + d, clip[3]) - max(bottom, clip[1])
    require(abs(visible_width - a) < .01 and abs(visible_height - d) < .01,
            "La miniatura è ritagliata dal frame interno nonostante le proporzioni della matrice PDF.")
    return {"larghezza_visibile_mm": round(visible_width / PT_MM, 4),
            "altezza_visibile_mm": round(visible_height / PT_MM, 4)}


def check_bleed_flow_layout(data: dict) -> int:
    """Il seguito della prosa completa il foglio sopra la didascalia mobile."""
    markers = data["flusso_al_vivo"]
    require([(m["fase"], m["indice"]) for m in markers]
            == [(phase, index) for index in range(-1, 16) for phase in ("inizio", "fine")],
            "Paragrafi del flusso al vivo persi, duplicati o riordinati.")
    require(len(data["didascalie_al_piede"]) == len(data["figure_al_vivo"]) == 1,
            "La prova di flusso richiede una sola coppia mobile.")
    caption = data["didascalie_al_piede"][0]["origine"]
    picture = data["figure_al_vivo"][0]["origine"]
    starts = {m["indice"]: m for m in markers if m["fase"] == "inizio"}
    ends = {m["indice"]: m for m in markers if m["fase"] == "fine"}
    filled = sum(starts[i]["pagina"] == ends[i]["pagina"] == caption["pagina"]
                 for i in range(16))
    require(filled >= 3, "Il testo successivo non riempie la pagina sopra la didascalia al vivo.")
    require(caption["pagina"] + 1 == picture["pagina"] < ends[15]["pagina"],
            "La coppia mobile non conserva l'adiacenza fra caption e immagine con seguito della prosa.")
    require(all(m["pagina"] != picture["pagina"] for m in markers),
            "La prosa occupa il foglio riservato all'immagine al vivo.")
    require(all(m["y"] < caption["y"] - 8 + .1 for m in markers
                if m["pagina"] == caption["pagina"]),
            "La prosa si sovrappone alla didascalia al vivo.")
    positions = [(m["pagina"], round(m["x"], 1), m["y"]) for m in markers]
    require(positions == sorted(positions), "Il flusso al vivo non conserva l'ordine sinistra-destra.")
    return filled


def check_bleed_flow(output: Path) -> dict:
    source, result = PROVE / "flusso-al-vivo.typ", {}
    for case in ("senza-note", "nota-caption", "note-miste", "float-precedente", "figura-in-coda", "figura-colonna"):
        inputs, pdf = {"caso": case}, output / f"flusso-al-vivo-{case}.pdf"
        compile_document(source, pdf, inputs)
        data = inventory(source, inputs)
        notes = 3 if case == "note-miste" else 1 if case == "nota-caption" else 0
        summary = check_inventory(data, {"figure": 2 if case in ("float-precedente", "figura-in-coda", "figura-colonna") else 1,
                                         "note": notes})
        filled = check_bleed_flow_layout(data)
        caption_page = data["didascalie_al_piede"][0]["origine"]["pagina"]
        require(all(note["pagina"] == caption_page for note in data["note"]),
                "Le note della prova non restano nella pagina della caption e della prosa associata.")
        from pypdf import PdfReader
        picture_page = data["figure_al_vivo"][0]["origine"]["pagina"]
        if case == "figura-in-coda":
            require(data["figure"][1]["visuale"]["pagina"] > picture_page,
                    "La figura ordinaria in coda invade il foglio riservato all'immagine al vivo.")
        require(not (PdfReader(pdf).pages[picture_page - 1].extract_text() or "").strip(),
                "Il foglio al vivo mobile contiene testo, folio o apparati sovrapposti.")
        negative = inventory(source, {**inputs, "barriera": "si"})
        try:
            check_bleed_flow_layout(negative)
        except ValueError as error:
            require("Il testo successivo non riempie" in str(error),
                    "Il controllo negativo del flusso al vivo fallisce per una causa diversa dal riempimento.")
        else:
            raise ValueError("La prova di flusso al vivo non rileva la barriera place.flush().")
        result[case] = {**summary, **check_pdf(pdf, data),
                        "rimandi": check_separated_caption_references(pdf, data),
                        "paragrafi_dopo_la_chiamata_sopra_caption": filled,
                        "barriera_rilevata": True}
        if case == "figura-in-coda":
            result[case]["pagina_figura_ordinaria_in_coda"] = data["figure"][1]["visuale"]["pagina"]
    return result


def check_bleed_exclusivity(output: Path) -> dict:
    """Le figure auto di colonna non entrano nei fogli riservati dai float parent."""
    from pypdf import PdfReader

    source, result = PROVE / "esclusivita-al-vivo.typ", {}
    for case in ("piccola", "alta"):
        inputs, pdf = {"caso": case}, output / f"esclusivita-al-vivo-{case}.pdf"
        compile_document(source, pdf, inputs)
        data = inventory(source, inputs)
        summary = check_inventory(data, {"figure": 4, "note": 2})
        require(len(data["figure_al_vivo"]) == 2,
                "La prova di esclusività deve contenere due coppie mobili al vivo.")
        reader = PdfReader(pdf)
        pages = [picture["origine"]["pagina"] for picture in data["figure_al_vivo"]]
        require(all(not (reader.pages[page - 1].extract_text() or "").strip() for page in pages),
                "Una figura di colonna con didascalia o il folio invade il foglio al vivo.")
        result[case] = {**summary, **check_pdf(pdf, data),
                        "rimandi": check_separated_caption_references(pdf, data),
                        "fogli_esclusivi": pages}
    return result


def check_separated_captions(output: Path) -> dict:
    """Caption al piede e immagine adiacente resistono a testo e float precedenti."""
    from PIL import Image
    from pypdf import PdfReader

    source = PROVE / "didascalia-separata.typ"
    result, positions = {}, {}
    for case in ("base", "spostata", "densa", "float-precedente", "ancoraggio-alto"):
        asset = ROOT / ("risorse-condivise/immagini/figure/ricerca/c03-020-01.jpeg"
                        if case == "ancoraggio-alto" else
                        "risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primo-web-home.png")
        with Image.open(asset) as original:
            dimensions = original.size
        inputs, pdf = {"caso": case}, output / f"didascalia-separata-{case}.pdf"
        compile_document(source, pdf, inputs)
        data = inventory(source, inputs)
        count = 3 if case == "float-precedente" else 2
        summary = check_inventory(data, {"figure": count, "note": 1})
        require([figure["numero"] for figure in data["figure"]] == list(range(1, count + 1)),
                "La miniatura aggiunge un progressivo o altera il numero della schermata.")
        require(len(data["didascalie_separate"]) == len(data["didascalie_al_piede"])
                == len(data["figure_al_vivo"]) == 1,
                "La prova deve avere una sola immagine al vivo con didascalia separata al piede.")
        caption = data["didascalie_separate"][0]
        origin, picture = caption["origine"], caption["immagine"]
        require(data["note"][0]["origine"]["pagina"] == origin["pagina"],
                "La nota della fonte non resta sulla pagina della didascalia.")
        require(caption["folio"] != picture["pagina"],
                "Il rimando usa la pagina PDF al posto del folio stampato.")
        # La tavola mobile può aggiungere un foglio durante lo scarico dei float:
        # il rimando deve seguire il contatore della destinazione verificato sopra.
        if case != "float-precedente":
            require(caption["folio"] == picture["pagina"] + 6,
                    "Il rimando non conserva l'offset del contatore stampato.")
        references = check_separated_caption_references(pdf, data)
        reader = PdfReader(pdf)
        require(not (reader.pages[picture["pagina"] - 1].extract_text() or "").strip(),
                "La schermata a pieno formato contiene testi o apparati sovrapposti.")
        images = {}
        for number in (origin["pagina"], picture["pagina"]):
            page = reader.pages[number - 1]
            matches = raster_placements(page, reader, dimensions)
            require(len(matches) == 1,
                    "La miniatura o la schermata non conserva una sola copia dell'immagine originale.")
            matrix = matches[0]["matrix"]
            a, b, c, d, x, bottom = matrix
            require(abs(b) < .001 and abs(c) < .001 and a > 0 and d > 0
                    and abs(a / d - dimensions[0] / dimensions[1]) < .001,
                    "La miniatura o la schermata è ritagliata, deformata o ruotata.")
            expected = caption["miniatura"]["larghezza"] if number == origin["pagina"] else 170 * PT_MM
            require(abs(a - expected) < .01,
                    "La miniatura non segue la didascalia oppure la schermata ha perso il pieno formato.")
            crop = {}
            if number == origin["pagina"]:
                crop = check_thumbnail_visibility(matrix, matches[0]["clip"])
                require(abs(d - caption["testo"]["altezza"]) < .01,
                        "L'immagine non ha la stessa altezza della didascalia.")
            elif case == "ancoraggio-alto":
                require(data["figure_al_vivo"][0]["ancoraggio"] == [.5, 0]
                        and abs(data["figure_al_vivo"][0]["rapporto"]
                                - dimensions[0] / dimensions[1]) < .000001,
                        "La prova non esercita l'ancoraggio superiore di un originale più alto del foglio.")
                crop = check_top_anchored_crop(matrix, float(page.mediabox.top))
            elif number == picture["pagina"]:
                require(abs(x) < .01 and abs(bottom) < .01
                        and abs(d - 240 * PT_MM) < .01,
                        "La schermata lascia un bordo fra l'immagine e il foglio.")
            images[number] = {"larghezza_mm": round(a / PT_MM, 4), **crop}
        positions[case] = (origin["pagina"], picture["pagina"], caption["folio"])
        bottom = data["didascalie_al_piede"][0]
        result[case] = {**summary, **check_pdf(pdf, data), "rimandi": references,
                        "immagini": images, "nota_con_didascalia": True,
                        "pagine_adiacenti": True,
                        "fondo_didascalia_pt": round(bottom["origine"]["y"] + bottom["altezza"], 4)}
    require(positions["spostata"] == tuple(value + 1 for value in positions["base"]),
            "Inserire un foglio a monte non aggiorna insieme didascalia, immagine e folio.")
    require(positions["densa"][0] > positions["base"][0]
            and positions["float-precedente"][0] > positions["base"][0],
            "Le prove non esercitano una didascalia spostata dal testo o dal float precedente.")
    return result


def check_olivetti(output: Path) -> dict:
    """Riconcilia i pixel alpha originali con la trasformazione effettiva nel PDF."""
    from PIL import Image
    from pypdf import PdfReader
    from pypdf.generic import ContentStream

    asset = ROOT / "risorse-condivise/immagini/figure/tipografia/esempi/manifesti/olivetti-lettera-32-annuncio.png"
    profile = json.loads((ROOT / "risorse-condivise/dati/sagome/olivetti-lettera-32-annuncio.json").read_text())
    with Image.open(asset) as original:
        width, height = original.size
        alpha = original.getchannel("A").point(lambda value: 255 if value >= profile["soglia_alpha"] else 0)
        first_pixel = alpha.getbbox()[0]

    result = {}
    source = PROVE / "olivetti.typ"
    for case in ("dispari", "pari", "sinistra"):
        inputs = {"caso": case, "lettura": "11-13.5"}
        pdf = output / f"olivetti-{case}.pdf"
        compile_document(source, pdf, inputs)
        native = inventory(source, inputs)
        summary = check_inventory(native, {"figure": 1, "note": 3})
        require(native["paragrafi"] == list(range(30)),
                f"Paragrafi Olivetti persi, duplicati o riordinati: {case}")
        require(len(native["sagome"]) == 1, "La prova Olivetti deve avere una sola sagoma.")
        shape = native["sagome"][0]
        require(shape["pagina"] % 2 == (1 if case == "dispari" else 0),
                f"La prova Olivetti non esercita la parità richiesta: {case}")
        if case == "sinistra":
            require(shape["pagina"] == 2, "La sagoma sinistra non segue il testo a monte sulla prima pagina pari.")

        expression = '{ import path("/progetti/booklet/scripts/booklet-prove/olivetti.typ"): dati-olivetti; dati-olivetti() }'
        data = json.loads(run(["typst", "eval", *typst_options(inputs), "--in", str(source), expression]))
        positions = [(p["pagina"], int(p["x"] > 85 * 72 / 25.4), p["y"])
                     for p in data["paragrafi"]]
        require(positions == sorted(positions), "La prosa Olivetti non segue le due colonne in ordine.")
        require(data["paragrafi"][-1]["pagina"] > shape["pagina"],
                "La prosa Olivetti non prosegue oltre la pagina sagomata.")

        reader = PdfReader(pdf)
        page = reader.pages[shape["pagina"] - 1]
        xobjects = page["/Resources"]["/XObject"]
        stack, matrix, images = [], (1., 0., 0., 1., 0., 0.), []
        for operands, operation in ContentStream(page.get_contents(), reader).operations:
            if operation == b"q":
                stack.append(matrix)
            elif operation == b"Q":
                matrix = stack.pop()
            elif operation == b"cm":
                a, b, c, d, e, f = matrix
                g, h, i, j, k, l = map(float, operands)
                matrix = (a*g + c*h, b*g + d*h, a*i + c*j, b*i + d*j,
                          a*k + c*l + e, b*k + d*l + f)
            elif operation == b"Do":
                image = xobjects[operands[0]].get_object()
                if image.get("/Subtype") == "/Image" and image.get("/Width") == width and image.get("/Height") == height:
                    images.append(matrix)
        require(len(images) == 1, "L'originale Olivetti non è presente una sola volta nel PDF.")
        a, b, c, d, x, bottom = images[0]
        require(abs(b) < .001 and abs(c) < .001 and a > 0 and d > 0,
                "La fotografia Olivetti è ruotata o ribaltata nella prova.")
        y = float(page.mediabox.top) - bottom - d
        visible_x = x + a * first_pixel / width
        require(abs(a - 240) < .01 and abs(d - 240 * height / width) < .01,
                "La scala o le proporzioni dell'originale Olivetti sono cambiate.")
        require(abs(visible_x) < .01,
                f"Il primo pixel alpha non tocca il bordo sinistro: {case}, x={visible_x:.3f} pt.")
        require(abs(shape["x"] - x) < .01 and abs(shape["y"] - y) < .01
                and abs(y - 15 * 72 / 25.4) < .01,
                "La posizione PDF dell'annuncio Olivetti differisce dalla sagoma o dalla quota approvata.")
        starts, baselines, extracted = [], [], []
        for pdf_page in reader.pages:
            sample, first_x = [], None

            def body_text(value, cm, tm, font, size):
                nonlocal first_x
                if re.match(r"Passaggio\s+\d+\.", value):
                    starts.append(size)
                    if first_x is None:
                        first_x = cm[0] * tm[4] + cm[2] * tm[5] + cm[4]
                if first_x is None or len(sample) == 3 or not value.strip():
                    return
                x = cm[0] * tm[4] + cm[2] * tm[5] + cm[4]
                y = cm[1] * tm[4] + cm[3] * tm[5] + cm[5]
                if abs(x - first_x) < .1 and (not sample or abs(y - sample[-1][0]) > .1):
                    sample.append((y, size))

            extracted.append(pdf_page.extract_text(visitor_text=body_text) or "")
            if first_x is not None:
                require(len(sample) == 3 and all(abs(size - 11) < .01 for _, size in sample),
                        "Il corpo della prova Olivetti non è composto a 11 pt nel PDF.")
                baselines.extend(sample[i][0] - sample[i + 1][0] for i in range(2))
        require(len(starts) == 30 and all(abs(size - 11) < .01 for size in starts),
                "I paragrafi Olivetti non conservano il corpo 11 pt nel PDF.")
        require(baselines and all(abs(distance - 13.5) < .01 for distance in baselines),
                "Le baseline della prosa Olivetti non distano 13,5 pt nel PDF.")
        text = "\n".join(extracted)
        require([int(n) for n in re.findall(r"Passaggio\s*(\d+)\.", text)] == list(range(30)),
                "Il PDF Olivetti non conserva tutti i paragrafi della prova.")
        result[case] = {**summary, **check_pdf(pdf, native),
                        "alpha_x_pt": round(visible_x, 6), "larghezza_pt": a,
                        "corpo_pt": 11, "interlinea_pt": 13.5,
                        "richiamo": check_flow_reference(pdf, data)}
    return result


def check_classic_notes(output: Path) -> dict:
    """Una nota nella regione non deve sparire quando Meander restituisce il seguito."""
    from pypdf import PdfReader

    source, pdf = PROVE / "sagoma-classica.typ", output / "sagoma-classica.pdf"
    compile_document(source, pdf)
    data = inventory(source)
    summary = check_inventory(data, {"figure": 1, "note": 3})
    require(data["paragrafi"] == list(range(12)),
            "La sagoma classica perde o riordina i paragrafi del seguito.")
    expression = ('{ let p = query(<booklet-prova-classica-note>).first().location().position(); '
                  '(pagina: p.page, y: p.y / 1pt) }')
    picture = json.loads(run(["typst", "eval", *typst_options(), "--in", str(source), expression]))
    early, overflow, following = [note["origine"] for note in data["note"]]
    profile = json.loads((ROOT / "risorse-condivise/dati/sagome/tipi-legno-illustrazione.json").read_text())
    bottom = picture["y"] + 70 * profile["altezza_px"] / profile["larghezza_px"]
    require(early["pagina"] == picture["pagina"] and early["y"] < bottom,
            "La prova classica non esercita una nota dentro la regione sagomata.")
    require(overflow["pagina"] > picture["pagina"] or overflow["y"] > bottom,
            "La prova classica non esercita una nota nel seguito restituito da Meander.")
    require(following["pagina"] >= overflow["pagina"],
            "La nota nativa successiva precede il seguito della sagoma.")
    text = "\n".join(page.extract_text() or "" for page in PdfReader(pdf).pages)
    require([int(n) for n in re.findall(r"Passaggio\s*(\d+)\.", text)] == list(range(12)),
            "Il PDF della sagoma classica perde o duplica il testo del seguito.")
    return {**summary, **check_pdf(pdf, data), "nota_nella_regione": True, "nota_nel_seguito": True}


def check_note_at_bottom(output: Path) -> dict:
    """Il marker dell'ultima riga deve trattenere la propria ancora sulla stessa pagina."""
    from pypdf import PdfReader

    source, pdf = PROVE / "nota-fondo.typ", output / "nota-fondo.pdf"
    compile_document(source, pdf)
    data = inventory(source)
    summary = check_inventory(data, {"figure": 0, "note": 1})
    origin = data["note"][0]["origine"]
    bottom = (240 - 20 - 35) * 72 / 25.4 - 8
    require(origin["pagina"] == 1 and origin["x"] > 85 * 72 / 25.4
            and 0 <= bottom - origin["y"] <= 2,
            "La prova non colloca il richiamo nell'ultima riga della seconda colonna.")
    reader = PdfReader(pdf)
    require(len(reader.pages) == 2 and "La fotografia continua" in (reader.pages[1].extract_text() or ""),
            "Il seguito della prova deve passare alla pagina successiva al richiamo.")
    return {**summary, **check_pdf(pdf, data), "nota_ultima_riga": True}


def check_editorial_helpers() -> dict:
    # Le parentesi del corpo funzione sono necessarie per un if multilinea
    # in un modulo Typst: i rami successivi non devono restituire none.
    expression = '{\n      import "progetti/booklet/template/editorial.typ": arabic-folio;\n      import "progetti/booklet/template/footnotes.typ": footnote-height;\n      (folio: (1, 9, 10, 99, 100, 348, 1000).map(arabic-folio),\n        note: (footnote-height(()) / 1pt, footnote-height((9pt, 18pt)) / 1pt))\n    }'
    data = json.loads(run(["typst", "eval", *typst_options(), expression]))
    require(data["folio"] == ["001", "009", "010", "099", "100", "348", "1000"],
            "Il folio arabo deve conservare tutte le cifre, anche oltre 99.")
    require(data["note"] == [0, 34.9], "Ingombro note vuote o multiple errato.")
    return data


def check_figure_formats(output: Path) -> dict:
    source, pdf = PROVE / 'figure-formats.typ', output / "formati-figure.pdf"
    compile_document(source, pdf)
    expression = '{ query(<booklet-formato-figura>).map(m => m.value) }'
    applied = json.loads(run(["typst", "eval", *typst_options(), "--in", str(source), expression]))
    expected = {"prova-colonna": "una-colonna", "prova-gabbia": "due-colonne",
                "prova-pagina": "tutta-pagina", "prova-vivo": "al-vivo"}
    require({m["id"]: m["formato"] for m in applied} == expected,
            "Explicit figure formats were not applied.")
    data = inventory(source)
    require(len(data["figure_nel_testo"]) == 2 and len(data["figure_al_vivo"]) == 1,
            "Ordinary and full-bleed figures have incorrect containers.")
    for figure in data["figure_nel_testo"]:
        requested = expected[figure["figura"][1:-1]]
        require(figure["colonne"] == (1 if requested == "una-colonna" else 2),
                "The figure does not occupy the requested number of columns.")
    pages = json.loads(run(["typst", "eval", *typst_options(), "--in", str(source),
                           '{ query(<booklet-figura-pagina>).map(m => m.value) }']))
    require(pages == ["prova-pagina"], "The dedicated page lost its margins.")
    return {**check_inventory(data, {"figure": 4, "note": 0}), **check_pdf(pdf, data),
            "formati": expected}


def check_regressions(output: Path) -> dict:
    # Le prove Python proteggono anche i controlli: un errore nella verifica
    # non deve trasformare silenziosamente un documento errato in un successo.
    run([sys.executable, "-m", "unittest", "discover", "-s", str(PROVE), "-p", "test_*.py"])
    result = {"strumenti": {"esito": "ok"}, "helper-editoriali": check_editorial_helpers(),
              "pesi": check_strong(output / "grassetto.svg"),
              "formati-figure": check_figure_formats(output)}
    # La compatibilità APA deve conservare suffissi e date complete, correggendo
    # soltanto la virgola errata delle date che attestano esclusivamente l'anno.
    source, pdf = PROVE / 'bibliography.typ', output / "bibliografia.pdf"
    compile_document(source, pdf)
    from pypdf import PdfReader
    text = re.sub(r"\s+", "", "".join(page.extract_text() or "" for page in PdfReader(pdf).pages))
    require("(2020,)" not in text and "(2020)" in text, "Punteggiatura APA errata per il solo anno.")
    require("(2024,marzo12)" in text, "La data APA completa non è conservata.")
    require("(s.d.-a)" in text and "(s.d.-b)" in text, "Suffissi APA senza data assenti.")
    data = inventory(source)
    result["bibliografia"] = {**check_inventory(data, {"figure": 0, "note": 0}), **check_pdf(pdf, data)}
    result["flusso"] = check_flow(output)
    result["didascalie-separate"] = check_separated_captions(output)
    result["flusso-al-vivo"] = check_bleed_flow(output)
    result["esclusivita-al-vivo"] = check_bleed_exclusivity(output)
    result["olivetti"] = check_olivetti(output)
    result["sagoma-classica"] = check_classic_notes(output)
    result["nota-fondo"] = check_note_at_bottom(output)
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
    require([note["richiamo"] for note in data["note"]] == ['"1"', '"2"'],
            "Lo stesso URL su pagine diverse deve avere numeri di nota distinti.")
    result["note-ripetute"] = {**check_inventory(data, {"figure": 0, "note": 2}), **check_pdf(pdf, data)}
    return result
