"""Separazione verificabile fra pubblicazioni APA e semplici siti nelle note."""

from __future__ import annotations

from collections import defaultdict
import re

from .common import require


def normalized_url(value: str) -> str:
    """Un'ancora di sezione non cambia l'identità del sito di consultazione."""
    return re.sub(r"^https?://(?:www\.)?", "", value.split("#", 1)[0]).rstrip("/")


def check_unique_note_urls(notes: list[dict]) -> dict:
    """Lo stesso URL completo deve appartenere a una sola voce per pagina."""
    seen = {}
    for index, note in enumerate(notes, start=1):
        # Query e frammenti identificano destinazioni diverse e restano integri.
        urls = set(re.findall(r'dest: "(https?://[^"\\]+)"', note["corpo"]))
        for url in urls:
            key = (note["pagina"], url)
            require(key not in seen,
                    f"URL ripetuto in note diverse sulla pagina {note['pagina']}: {url} "
                    f"(voci {seen.get(key)} e {index}). Riutilizzare lo stesso richiamo numerico.")
            seen[key] = index
    return {"url_pagina": len(seen), "voci": len(notes)}


def check_sources(data: dict, roles: dict) -> dict:
    require(roles.get("versione") == 1, "Versione dei ruoli delle fonti non supportata.")
    chapters = roles["capitoli"]
    unique_urls = check_unique_note_urls(data["note"])
    require(sorted(chapters) == [f"{n:02}" for n in range(1, data["capitoli"] + 1)],
            "I ruoli delle fonti non coprono tutti i capitoli attivi.")
    urls = defaultdict(set)
    for note in data["note"]:
        require(re.fullmatch(r'"[0-9]+"', note["richiamo"]) is not None,
                f"Richiamo di nota non numerico a pagina {note['pagina']}.")
        urls[f"{note['capitolo']:02}"].update(
            normalized_url(url) for url in re.findall(r'dest: "(https?://[^"\\]+)"', note["corpo"]))

    cited = defaultdict(set)
    for citation in data["citazioni"]:
        code, key = f"{citation['capitolo']:02}", citation["chiave"]
        require(code in chapters, f"Citazione esterna ai capitoli registrati: {key}.")
        chapter = chapters[code]
        # Anche cite(form: none) inserisce una voce nell'apparato nativo.
        require(key not in chapter["siti"],
                f"Sito nella bibliografia APA del capitolo {code}: {key} "
                f"(pagina {citation['pagina']}). Usare soltanto la nota numerica.")
        require(key in chapter["pubblicazioni"],
                f"Fonte da classificare prima della citazione APA nel capitolo {code}: {key}.")
        cited[code].add(key)

    result = {}
    for code, chapter in chapters.items():
        publications, sites = chapter["pubblicazioni"], chapter["siti"]
        require(len(publications) == len(set(publications)) and not (set(publications) & set(sites)),
                f"Ruoli duplicati o contraddittori nel capitolo {code}.")
        for key, url in sites.items():
            require(normalized_url(url) in urls[code],
                    f"URL del sito assente dalle note del capitolo {code}: {key}.")
        result[code] = {"pubblicazioni_citate": len(cited[code]), "siti_solo_note": len(sites)}
    return {"capitoli": result, "richiami_note_numerici": len(data["note"]),
            "url_note_unici_per_pagina": unique_urls["url_pagina"],
            "pubblicazioni_citate": sum(len(keys) for keys in cited.values()),
            "siti_solo_note": sum(len(chapter["siti"]) for chapter in chapters.values())}
