"""Confronto prima/dopo: resa in memoria, testo posizionato, link e inventari.

Non compila e non crea anteprime: per l'ispezione usare preview:booklet.
Eseguire con il Python del booklet e PYTHONPATH=progetti/booklet/scripts:
  python -m booklet.comparison snapshot prima.json --pdf-dir /tmp/baseline
  python -m booklet.comparison compare prima.json --output confronto.json
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys

from .common import ROOT, TARGETS, read_json, require, save_json

MAX_SIDE = 1600


def normalized(value):
    """Conserva sei decimali di punto; ignora soltanto il rumore numerico."""
    if isinstance(value, float):
        return round(value, 6)
    if isinstance(value, dict):
        return {str(key): normalized(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [normalized(item) for item in value]
    return value


def fingerprint(value) -> str:
    data = json.dumps(normalized(value), ensure_ascii=False, sort_keys=True).encode()
    return hashlib.sha256(data).hexdigest()


def page_links(page, reader, page_ids) -> list:
    """Risolve le destinazioni, senza conservare gli id degli oggetti PDF."""
    result = []
    for reference in page.get("/Annots", []):
        annotation = reference.get_object()
        if annotation.get("/Subtype") != "/Link":
            continue
        action = annotation.get("/A", {})
        action = action.get_object() if hasattr(action, "get_object") else action
        destination = annotation.get("/Dest", action.get("/D"))
        target = None
        if destination is not None:
            destination = destination.get_object() if hasattr(destination, "get_object") else destination
            if isinstance(destination, str):
                destination = reader.named_destinations[destination].dest_array
            target = [page_ids[destination[0].idnum], *destination[1:]]
        require(action.get("/S") in (None, "/URI", "/GoTo"),
                f"Azione link non supportata nel confronto: {action.get('/S')}")
        result.append({"rect": list(annotation["/Rect"]), "target": target,
                       "uri": action.get("/URI")})
    return sorted(normalized(result), key=lambda value: json.dumps(value, sort_keys=True))


def document_snapshot(path: Path) -> dict:
    """Una pagina alla volta: nessun PDF o raster completo viene caricato in RAM."""
    from pypdf import PdfReader
    try:
        import pypdfium2 as pdfium
    except ImportError as error:
        raise ValueError("Il confronto richiede pypdfium2; usare il runtime Python con PDFium.") from error

    pages = []
    with path.open("rb") as source, pdfium.PdfDocument(path) as rendering:
        reader = PdfReader(source)
        page_ids = {page.indirect_reference.idnum: index
                    for index, page in enumerate(reader.pages, 1)}
        require(len(reader.pages) == len(rendering), "Lettori PDF discordi sul numero di pagine.")
        for index, page in enumerate(reader.pages):
            positioned = []

            def visit(text, cm, tm, font, size):
                if text:
                    # Prodotto delle matrici: posizione e trasformazione effettive.
                    a, b, c, d, e, f = map(float, cm)
                    g, h, i, j, k, l = map(float, tm)
                    matrix = [a*g+c*h, b*g+d*h, a*i+c*j, b*i+d*j,
                              a*k+c*l+e, b*k+d*l+f]
                    positioned.append([text, matrix, float(size)])

            text = page.extract_text(visitor_text=visit) or ""
            rendered_page = rendering[index]
            try:
                # Un piccolo margine evita il ceil a 1601 causato dai float.
                scale = (MAX_SIDE - .01) / max(rendered_page.get_size())
                bitmap = rendered_page.render(scale=scale)
                try:
                    require(max(bitmap.width, bitmap.height) <= MAX_SIDE,
                            "Il raster supera il limite di 1600 px.")
                    pixels = hashlib.sha256(bitmap.to_pil().tobytes()).hexdigest()
                    dimensions = [bitmap.width, bitmap.height]
                finally:
                    bitmap.close()
            finally:
                rendered_page.close()
            pages.append({"box": normalized([*page.mediabox, *page.cropbox, page.rotation]),
                          "text": fingerprint(text), "positioned_text": fingerprint(positioned),
                          "links": fingerprint(page_links(page, reader, page_ids)),
                          "pixels": pixels, "raster_size": dimensions})
    return {"pages": pages}


def snapshot(pdf_dir: Path | None = None, targets=None) -> dict:
    import pypdfium2 as pdfium

    result = {"schema": "cvedi-booklet-layout/v1", "max_side": MAX_SIDE,
              "renderer": str(pdfium.PDFIUM_INFO), "wrapper": str(pdfium.PYPDFIUM_INFO),
              "targets": {}}
    for name in targets or TARGETS:
        pdf = pdf_dir / f"{name}.pdf" if pdf_dir else TARGETS[name][1]
        inventory = (pdf_dir or ROOT / "reports/typst-booklet/check") / f"inventario-{name}.json"
        require(pdf.is_file() and inventory.is_file(), f"PDF o inventario assente: {name}")
        result["targets"][name] = {**document_snapshot(pdf),
                                    "inventory": fingerprint(read_json(inventory))}
        print(f"  {name}: {len(result['targets'][name]['pages'])} pagine confrontabili.", flush=True)
    return result


def compare(before: dict, after: dict) -> dict:
    differences = []
    for field in ("schema", "max_side", "renderer", "wrapper"):
        if before.get(field) != after.get(field):
            differences.append({"configuration": field})
    names = sorted(set(before["targets"]) | set(after["targets"]))
    for name in names:
        left, right = before["targets"].get(name), after["targets"].get(name)
        if left is None or right is None:
            differences.append({"target": name, "fields": ["target assente"]})
            continue
        if left["inventory"] != right["inventory"]:
            differences.append({"target": name, "fields": ["inventory"]})
        if len(left["pages"]) != len(right["pages"]):
            differences.append({"target": name, "fields": ["numero pagine"],
                                "before": len(left["pages"]), "after": len(right["pages"])})
        for page, (old, new) in enumerate(zip(left["pages"], right["pages"]), 1):
            fields = [key for key in old if old[key] != new.get(key)]
            if fields:
                differences.append({"target": name, "page": page, "fields": fields})
    return {"schema": "cvedi-booklet-layout-comparison/v1",
            "esito": "errore" if differences else "ok", "targets": len(names),
            "pages": sum(len(value["pages"]) for value in after["targets"].values()),
            "differences": differences}


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("snapshot", "compare"))
    parser.add_argument("baseline", type=Path, help="Snapshot JSON da scrivere o confrontare.")
    parser.add_argument("--pdf-dir", type=Path, help="Cartella con NOME.pdf e inventario-NOME.json.")
    parser.add_argument("--output", type=Path, help="Rapporto obbligatorio per compare.")
    parser.add_argument("--target", choices=TARGETS, action="append")
    args = parser.parse_args(argv)
    if args.action == "compare" and args.output is None:
        parser.error("compare richiede --output.")
    try:
        before = read_json(args.baseline) if args.action == "compare" else None
        current = snapshot(args.pdf_dir, args.target or (list(before["targets"]) if before else None))
        if before is None:
            save_json(args.baseline, current)
            return 0
        result = compare(before, current)
        save_json(args.output, result)
        print(f"Confronto {result['esito']}: {result['pages']} pagine, {len(result['differences'])} differenze.")
        return 0 if result["esito"] == "ok" else 1
    except (ValueError, KeyError, OSError, ImportError) as error:
        print(f"Errore: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
