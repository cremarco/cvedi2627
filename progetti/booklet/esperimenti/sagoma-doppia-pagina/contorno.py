"""Deriva l'ingombro del Duomo dall'alpha, senza toccare l'immagine originale."""
import json
from pathlib import Path
from PIL import Image, ImageFilter

# Il file è in progetti/booklet/esperimenti/sagoma-doppia-pagina/: il quarto
# genitore è la radice del repository, condivisa anche con gli asset attivi.
root = Path(__file__).resolve().parents[4]
image = Image.open(root / "risorse-condivise/immagini/figure/tipografia/duomo-firenze-illustrazione.png").convert("RGBA")
alpha = image.getchannel("A")
# 8 pt di rispetto alla scala di stampa originale (476 pt di larghezza).
radius = round(8 * image.width / 476)
mask = alpha.point(lambda a: 255 if a > 16 else 0).filter(
    ImageFilter.MaxFilter(radius * 2 + 1)
)
rows = []
for i in range(44):
    y0, y1 = round(i * image.height / 44), round((i + 1) * image.height / 44)
    bounds = mask.crop((0, y0, image.width, y1)).getbbox()
    rows.append([bounds[0] / image.width, bounds[2] / image.width] if bounds else [0, 0])
# Questo array di 44 fasce appartiene soltanto alla demo storica. È diverso
# dal profilo a dizionario generato da scripts/contorni.py per il nuovo template.
(root / "progetti/booklet/assets/archivio/typst/dati/duomo-profilo-sperimentale.json").write_text(
    json.dumps(rows, indent=2) + "\n"
)
