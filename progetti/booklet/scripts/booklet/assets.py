"""Verifica piano editoriale, font, licenze e profili delle trasparenze."""

from __future__ import annotations

from collections import defaultdict
import base64
from math import isfinite
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

from .common import BOOKLET, ROOT, digest, local_path, read_json, require, run, typst_executable


def check_environment() -> str:
    require(sys.version_info >= (3, 10), "Serve Python 3.10 o successivo.")
    require(typst_executable() is not None,
            "Typst non trovato: installarlo nel PATH o in progetti/booklet/.venv/bin/.")
    expected = (BOOKLET / ".typst-version").read_text(encoding="utf-8").strip()
    version = run(["typst", "--version"]).strip()
    require(re.match(r"typst " + re.escape(expected) + r"(?:\s|$)", version) is not None,
            f"Serve Typst {expected}, rilevato {version}. Aggiornare la versione dopo il collaudo.")
    try:
        import PIL  # noqa: F401
        import pypdf  # noqa: F401
    except ImportError as error:
        raise ValueError("Dipendenze Python mancanti. Creare progetti/booklet/.venv e installare "
                         "progetti/booklet/requirements.txt come indicato nel README.") from error
    return version


def check_plan() -> list[dict]:
    plan = read_json(BOOKLET / "piano.json")
    require(plan.get("versione") == 1, "Versione del piano non supportata.")
    chapters = plan["capitoli"]
    require(isinstance(chapters, list) and bool(chapters),
            "Il piano editoriale deve contenere almeno un capitolo.")
    openings = read_json(ROOT / "risorse-condivise/immagini/aperture/manifest.json")
    themes = openings["capitoli"]
    palette = openings["palette"]
    order, families = palette["ordine"], palette["famiglie"]
    require(palette["tonalita"] == 300 and palette["preliminari"] == "gray",
            "Il booklet richiede tonalità 300 e preliminari gray.")
    require(isinstance(order, list) and all(isinstance(family, str) for family in order)
            and len(order) == len(set(order))
            and len(order) >= len(chapters), "Sequenza cromatica assente, duplicata o insufficiente.")
    require(set(order) == set(families) and palette["preliminari"] in families,
            "Famiglie diverse dalla sequenza cromatica o grigio dei preliminari assente.")
    for family, color in families.items():
        require(re.fullmatch(r"#[0-9a-fA-F]{6}", color["colore"]) is not None,
                f"Colore di palette non valido: {family}")
    theme_ids = [theme["numero"] for theme in themes]
    require(len(theme_ids) == len(set(theme_ids)), "Temi di apertura duplicati nel manifest.")
    for theme in themes:
        local_path(theme["percorso"])
        require(re.fullmatch(r"#[0-9a-fA-F]{6}", theme["colore"]) is not None,
                f"Colore di apertura non valido: {theme['numero']}")
    require(len({chapter["apertura_originale"] for chapter in chapters}) == len(chapters),
            "Un tema di apertura è assegnato a più capitoli.")
    for number, chapter in enumerate(chapters, start=1):
        require(chapter["numero"] == number and chapter["codice"] == f"{number:02}",
                f"Ordine o codice del capitolo {number} non coerente.")
        require(isinstance(chapter["titolo"], str) and chapter["titolo"].strip(),
                f"Titolo del capitolo {number} assente.")
        require(chapter["apertura_originale"] in theme_ids, f"Tema assente per il capitolo {number}.")
        require(chapter["stato"] in ("completo", "estratto", "in-preparazione", "in-revisione"),
                f"Stato non riconosciuto nel capitolo {number}.")
        if chapter["file"] is None:
            require(chapter["stato"] == "in-preparazione", f"Capitolo {number} senza file ma attivo.")
            continue
        require(chapter["stato"] != "in-preparazione", f"Capitolo {number} in preparazione con file attivo.")
        local_path(chapter["file"], BOOKLET)
        sources = chapter["fonti"]
        sources = sources if isinstance(sources, list) else [sources]
        require(bool(sources), f"Bibliografia assente per il capitolo {number}.")
        for source in sources:
            path = local_path(source, BOOKLET)
            require(path.suffix in (".yml", ".yaml", ".bib"), f"Formato bibliografico non supportato: {source}")
    if "aperture" in plan:
        check_opening_series(plan, chapters, palette, themes)
    return chapters


def check_opening_series(plan: dict, chapters: list[dict], palette: dict,
                         legacy_themes: list[dict]) -> None:
    """Verifica la serie attiva senza confonderla con la biblioteca conservata."""
    folder = plan["aperture"]
    require(isinstance(folder, str) and folder and not Path(folder).is_absolute(),
            "Il percorso delle aperture attive deve essere relativo al repository.")
    base = local_path(folder + "/manifest.json").parent
    manifest = read_json(base / "manifest.json")
    compositions = read_json(local_path("composizioni.json", base))
    require(manifest.get("versione") == compositions.get("versione") == 1,
            "Versione delle aperture attive non supportata.")
    require(compositions["tela"] == [1055, 1491] and compositions["formato_mm"] == [170, 240],
            "Tela o formato delle aperture attive diversi dal contratto editoriale.")
    require(local_path(manifest["piano"]) == BOOKLET / "piano.json",
            "Le aperture attive non fanno riferimento al piano corrente.")
    require(isinstance(manifest.get("origine"), str) and manifest["origine"].strip(),
            "Provenienza delle aperture attive assente.")
    fonts = read_json(ROOT / "risorse-condivise/font/editoriali/manifest.json")
    sora = next((font for font in fonts["font"] if font["famiglia_typst"] == "Sora"), None)
    require(sora is not None, "Sora assente dal manifest dei font editoriali.")
    licence = next((item for item in fonts["licenze"] if item["id"] == sora["licenza_id"]), None)
    require(licence is not None, "Licenza editoriale di Sora assente.")
    for key, entry in (("font", sora), ("licenza_font", licence)):
        require(manifest[key] == compositions[key] == entry["percorso"],
                f"{key} delle aperture diverso dal font editoriale autorizzato.")
        require(digest(local_path(entry["percorso"])) == entry["sha256"],
                f"Hash non coerente: {entry['percorso']}")

    numbers = [chapter["numero"] for chapter in chapters]
    for data, label in ((manifest, "manifest"), (compositions, "composizioni")):
        require([chapter["numero"] for chapter in data["capitoli"]] == numbers,
                f"Capitoli delle aperture diversi dal piano o duplicati: {label}.")
    font_data = base64.b64encode(local_path(sora["percorso"]).read_bytes()).decode("ascii")
    spectrum = {family: color.upper() for theme in legacy_themes
                for family, color in zip(theme.get("spettro_famiglie", []), theme.get("spettro", []))}
    namespace = "{http://www.w3.org/2000/svg}"
    native_tags = {"svg", "g", "path", "rect", "circle", "ellipse", "line", "polyline",
                   "polygon", "defs", "clipPath", "title", "desc", "metadata"}

    def series_path(value: str) -> Path:
        require(isinstance(value, str) and not Path(value).is_absolute(),
                "Il percorso di un'apertura deve essere relativo alla sua cartella.")
        result = local_path(value, base)
        require(result.is_relative_to(base), f"Asset esterno alla serie delle aperture: {value}")
        return result

    def numeric(value) -> bool:
        return type(value) in (int, float) and isfinite(value)

    def parse_svg(path: Path):
        try:
            root = ET.parse(path).getroot()
        except ET.ParseError as error:
            raise ValueError(f"SVG non valido: {path.name}: {error}") from error
        require(root.tag == namespace + "svg" and root.get("viewBox") == "0 0 1055 1491",
                f"Tela SVG non coerente: {path.name}")
        ids = [node.get("id") for node in root.iter() if node.get("id")]
        require(len(ids) == len(set(ids)), f"ID SVG duplicati: {path.name}")
        return root

    for chapter, entry, composition in zip(chapters, manifest["capitoli"], compositions["capitoli"]):
        number = chapter["numero"]
        require(entry["titolo"] == chapter["titolo"], f"Titolo non canonico nell'apertura {number}.")
        require(entry["testi_editabili"] == ["titolo-capitolo", "numero-capitolo"],
                f"Ruoli di testo non coerenti nell'apertura {number}.")
        files = {}
        for kind in ("disegno", "svg", "riferimento", "prompt"):
            files[kind] = series_path(entry[kind])
            require(digest(files[kind]) == entry["sha256_" + kind],
                    f"Hash non coerente: {entry[kind]}")
        name = composition["nome"]
        require(isinstance(name, str) and re.fullmatch(f"{number:02}-[a-z0-9-]+", name) is not None
                and entry["disegno"] == f"disegni/{name}.svg" and entry["svg"] == f"svg/{name}.svg",
                f"Disegno e composizione non corrispondono nell'apertura {number}.")
        reference = composition["riferimento"]
        require(entry["riferimento"] == f"originali/{reference}.png"
                and entry["prompt"] == f"prompts/{reference}.txt"
                and bool(files["prompt"].read_text(encoding="utf-8").strip()),
                f"Originale o prompt non corrispondente nell'apertura {number}.")
        line_break = composition["a_capo_dopo"]
        require(type(line_break) is int and 0 < line_break < len(chapter["titolo"].split()),
                f"A capo del titolo non valido nell'apertura {number}.")
        for role in ("titolo", "codice"):
            measures = composition[role]
            require(all(numeric(measures[key]) for key in ("x", "y", "corpo", "spaziatura"))
                    and 0 <= measures["x"] < 1055 and 0 < measures["y"] < 1491
                    and 0 < measures["corpo"] < 1491
                    and abs(measures["spaziatura"]) < measures["corpo"],
                    f"Quote {role} non valide nell'apertura {number}.")
            if "colore" in measures:
                require(re.fullmatch(r"#[0-9a-fA-F]{6}", measures["colore"]) is not None,
                        f"Colore {role} non valido nell'apertura {number}.")
        title = composition["titolo"]
        require(numeric(title["interlinea"]) and title["interlinea"] > 0
                and title["y"] + title["interlinea"] < 1491
                and numeric(title["limite_destro"]) and title["x"] < title["limite_destro"] <= 1055,
                f"Interlinea o limite del titolo non valido nell'apertura {number}.")
        if "corpi_righe" in title:
            require(isinstance(title["corpi_righe"], list) and len(title["corpi_righe"]) == 2
                    and all(numeric(value) and 0 < value < 1491 for value in title["corpi_righe"]),
                    f"Corpi delle righe non validi nell'apertura {number}.")

        art = parse_svg(files["disegno"])
        require(art.get("width") == "1055" and art.get("height") == "1491",
                f"Dimensioni del fondo SVG non coerenti: {name}")
        require(all(node.tag.removeprefix(namespace) in native_tags for node in art.iter()),
                f"Il fondo {name} deve contenere soltanto forme SVG native senza testo o raster.")
        principal = palette["famiglie"][palette["ordine"][number - 1]]["colore"].upper()
        seen = set()

        def check_colors(node, role=None):
            role = node.get("data-palette", role)
            require(all(not key.rsplit("}", 1)[-1].lower().startswith("on")
                        and key.rsplit("}", 1)[-1] not in ("href", "style") for key in node.attrib),
                    f"Attributi non nativi nel fondo {name}.")
            for attribute in ("fill", "stroke"):
                color = node.get(attribute)
                if color is None or color == "none":
                    continue
                require(re.fullmatch(r"#[0-9a-fA-F]{6}", color) is not None
                        and role in ("principale", "secondario", "spettro", "inchiostro", "carta"),
                        f"Campitura o ruolo non valido nel fondo {name}.")
                expected = {"principale": principal, "inchiostro": "#2E3138", "carta": "#FFFFFF"}.get(role)
                if role == "spettro":
                    expected = spectrum.get(node.get("data-famiglia"))
                    require(expected is not None, f"Famiglia dello spettro non riconosciuta: {name}")
                require(expected is None or color.upper() == expected,
                        f"Campitura {role} diversa dalla palette nel fondo {name}.")
                seen.add(role)
            for child in node:
                check_colors(child, role)

        check_colors(art)
        require("principale" in seen, f"Tinta del capitolo assente nel fondo {name}.")
        spectral_families = [node.get("data-famiglia") for node in art.iter() if node.get("data-famiglia")]
        if spectral_families:
            require(spectral_families == list(spectrum),
                    f"Spettro incompleto, duplicato o riordinato nel fondo {name}.")
        complete = parse_svg(files["svg"])
        require(all(node.tag.removeprefix(namespace) in native_tags | {"style", "text", "tspan"}
                    for node in complete.iter()), f"Elementi non nativi nell'esecutivo {name}.")
        texts = complete.findall(".//" + namespace + "text")
        require(len(texts) == 2 and {node.get("id") for node in texts} == set(entry["testi_editabili"]),
                f"Titolo o numero assente, duplicato o non modificabile: {name}")
        values = {node.get("id"): "".join(node.itertext()) for node in texts}
        require(values == {"titolo-capitolo": chapter["titolo"], "numero-capitolo": chapter["codice"]},
                f"Testi SVG diversi dal piano corrente: {name}")
        by_id = {node.get("id"): node for node in texts}

        def svg_quote(node, attribute, expected):
            try:
                actual = float(node.get(attribute, ""))
            except ValueError:
                actual = float("nan")
            require(isfinite(actual) and abs(actual - expected) < 0.00001,
                    f"Quote SVG diverse dalle composizioni: {name}, {attribute}.")

        title_node, code_node = by_id["titolo-capitolo"], by_id["numero-capitolo"]
        svg_quote(title_node, "font-size", title["corpo"])
        svg_quote(title_node, "letter-spacing", title["spaziatura"])
        lines = title_node.findall(namespace + "tspan")
        require(len(lines) == 2, f"Numero di righe del titolo diverso dalle composizioni: {name}")
        words = chapter["titolo"].split()
        expected_lines = [" ".join(words[:line_break]), " ".join(words[line_break:])]
        for index, line in enumerate(lines):
            require(line.text == expected_lines[index], f"A capo SVG diverso dalle composizioni: {name}")
            svg_quote(line, "x", title["x"])
            svg_quote(line, "y", title["y"] + index * title["interlinea"])
            if "corpi_righe" in title:
                svg_quote(line, "font-size", title["corpi_righe"][index])
            else:
                require(line.get("font-size") is None, f"Corpo della riga SVG inatteso: {name}")
        code = composition["codice"]
        for attribute, key in (("x", "x"), ("y", "y"), ("font-size", "corpo"),
                               ("letter-spacing", "spaziatura")):
            svg_quote(code_node, attribute, code[key])
        require(code_node.get("fill") == code.get("colore", "#2E3138"),
                f"Colore del codice SVG diverso dalle composizioni: {name}")
        style = complete.find(namespace + "style")
        require(style is not None and "data:font/ttf;base64," + font_data in (style.text or ""),
                f"Font Sora completo non incorporato nell'esecutivo {name}.")
        geometry = complete.find(f".//{namespace}g[@id='disegno']")
        art_children = [node for node in art if node.tag.removeprefix(namespace) not in ("title", "desc", "metadata")]
        require(geometry is not None and [ET.tostring(node) for node in geometry] ==
                [ET.tostring(node) for node in art_children],
                f"Geometria dell'esecutivo diversa dal fondo attivo: {name}")


def check_fonts() -> dict:
    manifest = read_json(ROOT / "risorse-condivise/font/editoriali/manifest.json")
    licences = {item["id"] for item in manifest["licenze"]}
    require(len(licences) == len(manifest["licenze"]), "Licenze dei font duplicate.")
    for entry in manifest["font"] + manifest["licenze"]:
        path = local_path(entry["percorso"])
        require(digest(path) == entry["sha256"], f"Hash non coerente: {entry['percorso']}")
        if "byte" in entry:
            require(path.stat().st_size == entry["byte"], f"Dimensione non coerente: {entry['percorso']}")
        if entry.get("copia_identica_all_originale"):
            original = local_path(entry["percorso_originale"])
            require(digest(original) == entry["sha256"], f"Originale diverso dal font o licenza: {original}")
    families = run(["typst", "fonts", "--ignore-system-fonts", "--ignore-embedded-fonts",
                    "--font-path", "risorse-condivise/font/editoriali"]).splitlines()
    for font in manifest["font"]:
        require(font["licenza_id"] in licences, f"Licenza assente per {font['id']}.")
        require(font["famiglia_typst"] in families, f"Font non rilevato da Typst: {font['famiglia_typst']}")
    return {"font": len(manifest["font"]), "licenze": len(licences)}


def check_profiles() -> list[dict]:
    from PIL import Image

    profiles = sorted((ROOT / "risorse-condivise/dati/sagome").glob("*.json"))
    require(bool(profiles), "Nessun profilo alpha trovato.")
    files = defaultdict(list)
    for file in (ROOT / "risorse-condivise/immagini/figure").rglob("*"):
        if file.is_file():
            files[file.name].append(file)
    result = []
    for path in profiles:
        profile = read_json(path)
        require(profile.get("schema") == "cvedi-alpha-profile/v1", f"Schema alpha non valido: {path.name}")
        candidates = files[profile["sorgente"]]
        require(len(candidates) == 1, f"Sorgente alpha assente o ambigua: {profile['sorgente']}")
        source = candidates[0]
        require(digest(source) == profile["sha256"], f"Profilo alpha obsoleto: {path.name}; rigenerarlo con contorni.py.")
        bands, threshold = profile["fasce"], profile["soglia_alpha"]
        # JSON distingue booleani e numeri; Python considera invece bool una
        # sottoclasse di int. I profili devono conservare veri dati geometrici.
        require(all(type(profile[key]) is int and profile[key] > 0
                    for key in ("larghezza_px", "altezza_px")),
                f"Dimensioni alpha non valide: {path.name}")
        require(type(threshold) is int and 0 <= threshold < 255,
                f"Soglia alpha non valida: {path.name}")
        require(isinstance(bands, list) and 8 <= len(bands) <= 512, f"Numero di fasce non valido: {path.name}")
        for band in bands:
            require(band is None or (isinstance(band, list) and len(band) == 2
                    and all(type(v) in (int, float) for v in band) and 0 <= band[0] < band[1] <= 1),
                    f"Intervallo alpha non valido: {path.name}")
        require(any(band is not None for band in bands), f"Profilo alpha senza fasce visibili: {path.name}")
        with Image.open(source) as image:
            require(image.size == (profile["larghezza_px"], profile["altezza_px"]),
                    f"Dimensioni alpha obsolete: {path.name}")
            require("A" in image.getbands() or "transparency" in image.info,
                    f"L'immagine non ha trasparenza: {source.name}")
            alpha = image.convert("RGBA").getchannel("A")
            require(alpha.getextrema()[0] < 255, f"L'immagine è completamente opaca: {source.name}")
            mask = alpha.point(lambda value: 255 if value > threshold else 0)
            require(mask.getbbox() is not None, f"Profilo alpha completamente vuoto: {path.name}")
            require(len(bands) <= image.height, f"Più fasce che righe di pixel: {path.name}")
            for i, band in enumerate(bands):
                bounds = mask.crop((0, i * image.height // len(bands), image.width,
                                    (i + 1) * image.height // len(bands))).getbbox()
                expected = [bounds[0] / image.width, bounds[2] / image.width] if bounds else None
                require(band == expected, f"Fascia alpha {i} non coerente: {path.name}; rigenerare il profilo.")
        result.append({"profilo": str(path.relative_to(ROOT)), "sorgente": str(source.relative_to(ROOT)),
                       "sha256": profile["sha256"], "fasce": len(bands)})
    return result


def manifest_index() -> list[str]:
    manifests = {str(path.relative_to(ROOT)) for folder in ("risorse-condivise/immagini", "risorse-condivise/font", "risorse-condivise/dati")
                 for path in (ROOT / folder).rglob("*manifest*.json")}
    plan = read_json(BOOKLET / "piano.json")
    if "aperture" in plan:
        manifests.add(str(local_path(plan["aperture"] + "/manifest.json").relative_to(ROOT)))
    return sorted(manifests)
