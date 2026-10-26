"""Compilazione e inventario nativo, con le stesse opzioni di radice e font."""

from __future__ import annotations

import json
from pathlib import Path
import time

from .common import ROOT, run, typst_options


def compile_document(source: Path, output: Path, inputs: dict | None = None) -> dict:
    output.parent.mkdir(parents=True, exist_ok=True)
    start = time.monotonic()
    run(["typst", "compile", *typst_options(inputs), str(source), str(output)])
    return {"sorgente": str(source.relative_to(ROOT)), "uscita": str(output.relative_to(ROOT)),
            "secondi": round(time.monotonic() - start, 2), "byte": output.stat().st_size}


def inventory(source: Path, inputs: dict | None = None) -> dict:
    expression = '{ import path("/progetti/booklet/scripts/booklet-prove/inventario.typ"): inventory; inventory() }'
    return json.loads(run(["typst", "eval", *typst_options(inputs), "--in", str(source), expression]))
