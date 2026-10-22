"""Verifica piano editoriale, font, licenze e profili delle trasparenze."""

from __future__ import annotations

from collections import defaultdict
import re
import shutil
import sys

from .common import BOOKLET, ROOT, digest, local_path, read_json, require, run


def check_environment() -> str:
    require(sys.version_info >= (3, 10), "Serve Python 3.10 o successivo.")
    require(shutil.which("typst") is not None, "Typst non trovato nel PATH.")
    expected = (BOOKLET / ".typst-version").read_text(encoding="utf-8").strip()
    version = run(["typst", "--version"]).strip()
    require(re.match(r"typst " + re.escape(expected) + r"(?:\s|$)", version) is not None,
            f"Serve Typst {expected}, rilevato {version}. Aggiornare la versione dopo il collaudo.")
    try:
        import PIL  # noqa: F401
        import pypdf  # noqa: F401
    except ImportError as error:
        raise ValueError("Dipendenze Python mancanti. Creare typst-booklet/.venv e installare "
                         "typst-booklet/requirements.txt come indicato nel README.") from error
    return version


def check_plan() -> list[dict]:
    plan = read_json(BOOKLET / "piano.json")
    require(plan.get("versione") == 1, "Versione del piano non supportata.")
    chapters = plan["capitoli"]
    require(len(chapters) == 6, "Il piano editoriale comprende le sei lezioni approvate.")
    themes = read_json(ROOT / "assets/images/aperture/manifest.json")["capitoli"]
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
    return chapters


def check_fonts() -> dict:
    manifest = read_json(ROOT / "assets/fonts/editoriali/manifest.json")
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
                    "--font-path", str(ROOT / "assets/fonts/editoriali")]).splitlines()
    for font in manifest["font"]:
        require(font["licenza_id"] in licences, f"Licenza assente per {font['id']}.")
        require(font["famiglia_typst"] in families, f"Font non rilevato da Typst: {font['famiglia_typst']}")
    return {"font": len(manifest["font"]), "licenze": len(licences)}


def check_profiles() -> list[dict]:
    from PIL import Image

    profiles = sorted((ROOT / "assets/dati/sagome").glob("*.json"))
    require(bool(profiles), "Nessun profilo alpha trovato.")
    files = defaultdict(list)
    for file in (ROOT / "assets/images/figure").rglob("*"):
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
    return sorted(str(path.relative_to(ROOT)) for folder in ("assets/images", "assets/fonts", "assets/dati")
                  for path in (ROOT / folder).rglob("*manifest*.json"))
