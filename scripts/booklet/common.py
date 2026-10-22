"""Percorsi, I/O e invocazioni condivise dagli strumenti del booklet."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
import re
import subprocess

# Questo modulo risiede in scripts/booklet/: la radice resta indipendente dal cwd.
ROOT = Path(__file__).resolve().parents[2]
BOOKLET = ROOT / "typst-booklet"
PROVE = ROOT / "scripts/booklet-prove"
TARGETS = {
    "booklet": (BOOKLET / "main.typ", BOOKLET / "build/booklet.pdf"),
    "aperture": (BOOKLET / "anteprime/aperture.typ", BOOKLET / "build/anteprime/aperture.pdf"),
    "frontespizio-indice": (BOOKLET / "capitoli/00-frontespizio-indice.typ", BOOKLET / "build/anteprime/00-frontespizio-indice.pdf"),
    "storia-del-design": (BOOKLET / "capitoli/01-storia-del-design.typ", BOOKLET / "build/anteprime/01-storia-del-design.pdf"),
    "ricerca": (BOOKLET / "capitoli/02-ricerca.typ", BOOKLET / "build/anteprime/02-ricerca.pdf"),
    "accessibilita": (BOOKLET / "capitoli/03-accessibilita.typ", BOOKLET / "build/anteprime/03-accessibilita.pdf"),
    "gestalt": (BOOKLET / "capitoli/04-gestalt.typ", BOOKLET / "build/anteprime/04-gestalt.pdf"),
    "colore": (BOOKLET / "capitoli/05-colore.typ", BOOKLET / "build/anteprime/05-colore.pdf"),
    "tipografia": (BOOKLET / "capitoli/06-tipografia.typ", BOOKLET / "build/anteprime/06-tipografia.pdf"),
    "griglia": (BOOKLET / "capitoli/07-griglia.typ", BOOKLET / "build/anteprime/07-griglia.pdf"),
}
PT_MM = 72 / 25.4


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def digest(path: Path) -> str:
    # PDF e originali possono essere grandi: l’hash non richiede di caricarli
    # interamente in memoria. Questa variante resta compatibile con Python 3.10.
    result = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            result.update(chunk)
    return result.hexdigest()


def local_path(value: str, base: Path = ROOT) -> Path:
    require(isinstance(value, str) and bool(value), "Percorso vuoto o non testuale.")
    path = (base / value).resolve()
    require(path.is_relative_to(ROOT), f"Percorso esterno al progetto: {value}")
    require(path.is_file(), f"File assente: {path.relative_to(ROOT)}")
    return path


def run(command: list[str]) -> str:
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
    diagnostics = result.stderr.strip()
    require(result.returncode == 0,
            f"Comando fallito: {' '.join(command)}\n{diagnostics}\n{result.stdout}")
    require(not re.search(r"\bwarning:", diagnostics, re.IGNORECASE),
            f"Avviso trattato come errore: {' '.join(command)}\n{diagnostics}")
    return result.stdout


def typst_options(inputs: dict | None = None) -> list[str]:
    options = ["--root", str(ROOT), "--ignore-system-fonts",
               "--font-path", str(ROOT / "assets/fonts/editoriali")]
    for key, value in (inputs or {}).items():
        options.extend(["--input", f"{key}={value}"])
    return options
