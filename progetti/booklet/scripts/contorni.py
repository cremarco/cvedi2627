#!/usr/bin/env python3
"""Ricava un profilo esterno dalla trasparenza di un'immagine, senza modificarla."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image


def argomenti() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Genera il contorno JSON di una fotografia o illustrazione scontornata. "
            "Il file originale resta invariato; sagome.typ applica il distacco di stampa."
        ),
        epilog=(
            "Esempio: python3 progetti/booklet/scripts/contorni.py risorse-condivise/immagini/figure/tipografia/duomo-firenze-illustrazione.png "
            "risorse-condivise/dati/sagome/duomo-firenze.json --fasce 96"
        ),
    )
    parser.add_argument("immagine", type=Path, help="Immagine originale dotata di trasparenza")
    parser.add_argument("uscita", type=Path, help="File JSON derivato da scrivere")
    parser.add_argument("--fasce", type=int, default=96, help="Numero di fasce orizzontali (predefinito: 96)")
    parser.add_argument("--soglia", type=int, default=16, help="Alpha minimo da considerare pieno, da 0 a 254 (predefinito: 16)")
    return parser.parse_args()


def main() -> None:
    args = argomenti()
    if not 8 <= args.fasce <= 512:
        raise SystemExit("Il numero di fasce deve essere compreso tra 8 e 512.")
    if not 0 <= args.soglia < 255:
        raise SystemExit("La soglia alpha deve essere compresa tra 0 e 254.")
    if args.immagine.resolve() == args.uscita.resolve():
        raise SystemExit("Immagine e file di uscita devono avere percorsi diversi.")

    with Image.open(args.immagine) as originale:
        if originale.height < 8:
            raise SystemExit("L’immagine deve avere almeno 8 righe di pixel per un profilo alpha valido.")
        if "A" not in originale.getbands() and "transparency" not in originale.info:
            raise SystemExit("L'immagine non contiene trasparenza: usarla come figura ordinaria.")
        immagine = originale.convert("RGBA")
        alpha = immagine.getchannel("A")
        if alpha.getextrema()[0] == 255:
            raise SystemExit("L'immagine è interamente opaca: usarla come figura ordinaria.")
        maschera = alpha.point(lambda valore: 255 if valore > args.soglia else 0)
        if maschera.getbbox() is None:
            raise SystemExit("L'immagine non contiene pixel visibili alla soglia scelta.")

        # Per ogni fascia basta l'inviluppo esterno sinistra/destra. Gli eventuali
        # buchi interni non vengono riempiti di testo; non sarebbero leggibili.
        numero = min(args.fasce, immagine.height)
        fasce: list[list[float] | None] = []
        for indice in range(numero):
            alto = indice * immagine.height // numero
            basso = (indice + 1) * immagine.height // numero
            limiti = maschera.crop((0, alto, immagine.width, basso)).getbbox()
            fasce.append(
                [limiti[0] / immagine.width, limiti[2] / immagine.width]
                if limiti else None
            )

        profilo = {
            "schema": "cvedi-alpha-profile/v1",
            "sorgente": args.immagine.name,
            "sha256": hashlib.sha256(args.immagine.read_bytes()).hexdigest(),
            "larghezza_px": immagine.width,
            "altezza_px": immagine.height,
            "soglia_alpha": args.soglia,
            "fasce": fasce,
        }
    args.uscita.parent.mkdir(parents=True, exist_ok=True)
    args.uscita.write_text(json.dumps(profilo, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Contorno generato: {args.uscita} ({len(fasce)} fasce)")


if __name__ == "__main__":
    main()
