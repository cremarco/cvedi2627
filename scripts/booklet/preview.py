"""Anteprime PNG limitate, ricavate soltanto dai PDF già compilati."""

from __future__ import annotations

from pathlib import Path
import re
import shutil
import tempfile

from .common import BOOKLET, TARGETS, require, run

MAX_PAGES = 8
MAX_SIDE = 1600


def parse_pages(value: str) -> list[int]:
    """Accetta pagine fisiche da 1 e intervalli chiusi, senza espansioni illimitate."""
    pages = set()
    for selection in value.split(","):
        selection = selection.strip()
        require(bool(re.fullmatch(r"[1-9][0-9]*(?:-[1-9][0-9]*)?", selection)),
                "--pages richiede numeri da 1 o intervalli chiusi, per esempio 8-9,12.")
        bounds = selection.split("-")
        first, last = int(bounds[0]), int(bounds[-1])
        require(first <= last, f"Intervallo invertito in --pages: {selection}.")
        require(last - first + 1 <= MAX_PAGES,
                f"L'anteprima può contenere al massimo {MAX_PAGES} pagine.")
        pages.update(range(first, last + 1))
        require(len(pages) <= MAX_PAGES,
                f"L'anteprima può contenere al massimo {MAX_PAGES} pagine.")
    return sorted(pages)


def page_count(pdf: Path) -> int:
    try:
        from pypdf import PdfReader
        from pypdf.errors import PdfReadError
    except ImportError as error:
        raise ValueError("pypdf non disponibile: installare typst-booklet/requirements.txt.") from error
    try:
        # Il file aperto evita una copia dell'intero volume in memoria.
        with pdf.open("rb") as source:
            return len(PdfReader(source).pages)
    except PdfReadError as error:
        raise ValueError(f"PDF non leggibile: {pdf.name}: {error}") from error


def create_preview(target: str, selection: str) -> dict:
    pages = parse_pages(selection)
    _, pdf = TARGETS[target]
    require(pdf.is_file(),
            f"PDF compilato assente: {pdf}. Eseguire prima pnpm build:booklet --target {target}.")
    total = page_count(pdf)
    outside = [page for page in pages if page > total]
    require(not outside,
            f"Pagine fuori intervallo: {', '.join(map(str, outside))}. Il PDF contiene {total} pagine fisiche.")
    renderer = shutil.which("pdftoppm")
    require(renderer is not None,
            "pdftoppm non disponibile nel PATH: installare Poppler per creare le anteprime PNG.")

    output = BOOKLET / "build/anteprime-ispezione" / target
    output.mkdir(parents=True, exist_ok=True)
    files = []
    # Un prefisso temporaneo evita di accettare un vecchio PNG se il render fallisce.
    with tempfile.TemporaryDirectory(prefix="cvedi-booklet-preview-") as temporary:
        for page in pages:
            name = f"pagina-{page:04d}"
            prefix = Path(temporary) / name
            run([renderer, "-f", str(page), "-l", str(page), "-singlefile",
                 "-scale-to", str(MAX_SIDE), "-png", str(pdf), str(prefix)])
            rendered = prefix.with_suffix(".png")
            require(rendered.is_file(), f"Anteprima PNG non generata per la pagina {page}.")
            destination = output / f"{name}.png"
            shutil.copyfile(rendered, destination)
            files.append(destination)
    return {"pagine": pages, "pagine_totali": total, "file": files}
