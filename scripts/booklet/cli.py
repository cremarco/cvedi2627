"""Orchestrazione dei comandi pubblici build e check e dei rispettivi rapporti."""

from __future__ import annotations

import argparse
import sys
import time

from .assets import check_environment, check_fonts, check_plan, check_profiles, manifest_index
from .common import BOOKLET, PROVE, ROOT, TARGETS, read_json, require, run, save_json
from .documents import compile_document, inventory
from .inventory import check_inventory
from .pdf import check_pdf
from .regressions import check_regressions


def report_name(action: str, *, assets_only: bool = False, target: str | None = None) -> str:
    """Una verifica parziale non sostituisce i rapporti delle operazioni complete."""
    if assets_only:
        return "dati.json"
    if target:
        return f"compilazione-{target}.json"
    return "compilazione.json" if action == "build" else "verifica.json"


def arguments(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("azione", choices=("build", "check"))
    selection = parser.add_mutually_exclusive_group()
    selection.add_argument("--target", choices=TARGETS, help="Compila un solo ingresso (solo build).")
    selection.add_argument("--assets-only", action="store_true", help="Verifica solo ambiente e dati, senza compilare.")
    args = parser.parse_args(argv)
    if args.target and args.azione != "build":
        parser.error("--target è disponibile soltanto per build.")
    return args


def main(argv: list[str] | None = None) -> int:
    args = arguments(argv)
    reports = ROOT / "reports/typst-booklet/check"
    report = {"schema": "cvedi-booklet-check/v1", "esito": "in-corso", "azione": args.azione}
    start = time.monotonic()
    try:
        report["typst"] = check_environment()
        chapters = check_plan()
        report["font"] = check_fonts()
        report["profili"] = check_profiles()
        run([sys.executable, str(BOOKLET / "scripts/colora-aperture.py"), "--check"])
        save_json(reports / "manifest-assets.json", {"manifest": manifest_index()})
        print(f"Dati verificati: {len(chapters)} capitoli, {report['font']['font']} font, "
              f"{len(report['profili'])} profili alpha; palette coerenti.", flush=True)
        if not args.assets_only:
            report["documenti"] = {}
            for name in ([args.target] if args.target else TARGETS):
                source, pdf = TARGETS[name]
                print(f"Compilazione: {name}…", flush=True)
                summary = compile_document(source, pdf)
                if args.azione == "check":
                    data = inventory(source)
                    expected = read_json(PROVE / "attesi.json") if name == "booklet" else None
                    summary["struttura"] = check_inventory(data, expected)
                    summary["pdf"] = check_pdf(pdf, data)
                    if name == "booklet":
                        active = sum(chapter["file"] is not None for chapter in chapters)
                        require(data["capitoli"] == data["bibliografie"] == active,
                                "Aperture o bibliografie diverse dai capitoli attivi del piano.")
                    save_json(reports / f"inventario-{name}.json", data)
                report["documenti"][name] = summary
                print(f"  OK · {summary['secondi']} s", flush=True)
            if args.azione == "check":
                print("Regressioni: pesi, sagoma con overflow, metadati pari/dispari, note ripetute…", flush=True)
                report["regressioni"] = check_regressions(BOOKLET / "build/verifiche")
        report["esito"] = "ok"
        print("Verifica completata senza avvisi." if args.azione == "check" else "Compilazione completata senza avvisi.")
        return 0
    except (ValueError, KeyError, OSError) as error:
        report["esito"], report["errore"] = "errore", str(error)
        print(f"Errore: {error}", file=sys.stderr)
        return 1
    finally:
        report["secondi"] = round(time.monotonic() - start, 2)
        name = report_name(args.azione, assets_only=args.assets_only, target=args.target)
        save_json(reports / name, report)
