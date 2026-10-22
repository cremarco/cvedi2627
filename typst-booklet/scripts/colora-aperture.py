#!/usr/bin/env python3
"""Allinea le tinte principali e secondarie degli SVG senza modificare le forme."""

import argparse
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET


def main():
    # --check verifica soltanto; senza opzioni aggiorna la tinta degli asset.
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Verifica senza scrivere")
    args = parser.parse_args()
    radice = Path(__file__).resolve().parents[2]
    manifest = radice / "assets/images/aperture/manifest.json"
    capitoli = json.loads(manifest.read_text(encoding="utf-8"))["capitoli"]
    ET.register_namespace("", "http://www.w3.org/2000/svg")
    for capitolo in capitoli:
        file = radice / capitolo["percorso"]
        # I ruoli espliciti evitano di trasformare tutti gli accenti nella tinta
        # principale. Lo spettro del capitolo Colore mantiene le singole tinte.
        parser_xml = ET.XMLParser(target=ET.TreeBuilder(insert_comments=True))
        svg = ET.fromstring(file.read_text(encoding="utf-8"), parser=parser_xml)
        tinte = {"principale": capitolo["colore"],
                 "secondario": capitolo.get("secondario")}
        spettro = {c.upper() for c in capitolo.get("spettro", [])}
        modificato = False

        def allinea(elemento, ruolo=None):
            nonlocal modificato
            ruolo = elemento.get("data-palette", ruolo)
            for attributo in ("fill", "stroke"):
                colore = elemento.get(attributo, "")
                if not re.fullmatch(r"#[0-9a-fA-F]{6}", colore):
                    continue
                # Typst riassegna in memoria soltanto questa tinta. Un colore
                # condiviso con altri ruoli renderebbe ambigua la sostituzione.
                if ruolo != "principale" and colore.upper() == capitolo["colore"].upper():
                    raise SystemExit(f"{file.name}: tinta principale condivisa con {ruolo}")
                if ruolo == "spettro":
                    if colore.upper() not in spettro:
                        raise SystemExit(f"{file.name}: tinta {colore} assente dallo spettro")
                    continue
                richiesto = tinte.get(ruolo)
                if richiesto is None:
                    raise SystemExit(f"{file.name}: assegnare data-palette a {colore}")
                if colore.upper() != richiesto.upper():
                    if args.check:
                        raise SystemExit(f"{file.name}: {colore} diverso da {richiesto}")
                    elemento.set(attributo, richiesto)
                    modificato = True
            for figlio in elemento:
                allinea(figlio, ruolo)

        allinea(svg)
        if modificato:
            ET.indent(svg, space="  ")
            file.write_text(ET.tostring(svg, encoding="unicode") + "\n", encoding="utf-8")
    print(f"Colori di {len(capitoli)} aperture {'verificati' if args.check else 'allineati'}.")


if __name__ == "__main__":
    main()
