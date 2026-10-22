"""Compone le aperture SVG: disegni nativi, titolo e codice ancora testo."""

from pathlib import Path
import base64
import copy
import hashlib
import json
import xml.etree.ElementTree as ET

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[2]
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)


def node(name, attributes=None, value=None):
    result = ET.Element(f"{{{NS}}}{name}", attributes or {})
    result.text = value
    return result


def main():
    composizioni = json.loads((BASE / "composizioni.json").read_text())
    piano = json.loads((ROOT / "typst-booklet/piano.json").read_text())
    capitoli = {c["numero"]: c for c in piano["capitoli"]}
    font = ROOT / composizioni["font"]
    # Il font completo rende gli SVG portabili anche quando cambia il testo.
    # È un font OFL, non un'immagine; titoli e cifre non diventano tracciati.
    dati_font = base64.b64encode(font.read_bytes()).decode("ascii")
    font_css = ('@font-face{font-family:"CVeDI Sora";font-style:normal;'
                'font-weight:100 800;src:url("data:font/ttf;base64,' +
                dati_font + '") format("truetype")}')
    esiti = []
    for c in composizioni["capitoli"]:
        capitolo = capitoli[c["numero"]]
        titolo = capitolo["titolo"]
        parole = titolo.split()
        indice = c["a_capo_dopo"]
        righe = [" ".join(parole[:indice]), " ".join(parole[indice:])]
        source = BASE / "disegni" / (c["nome"] + ".svg")
        disegno = ET.parse(source).getroot()
        completo = node("svg", {
            "width": "170mm", "height": "240mm", "viewBox": "0 0 1055 1491",
            "overflow": "hidden",
            "role": "img", "aria-labelledby": "titolo descrizione",
            "data-capitolo": str(c["numero"]),
        })
        completo.append(node("title", {"id": "titolo"}, titolo))
        completo.append(node("desc", {"id": "descrizione"},
            "Apertura ricostruita dal concept ImageGen. Disegno vettoriale, "
            "titolo e numero modificabili come testo. Font Sora, licenza OFL 1.1."))
        completo.append(node("style", {"id": "font-portabile"}, font_css))
        geometria = node("g", {"id": "disegno"})
        for child in disegno:
            if child.tag.rsplit("}", 1)[-1] not in ("title", "desc", "metadata"):
                geometria.append(copy.deepcopy(child))
        completo.append(geometria)
        testo = node("g", {"id": "testi-editoriali", "fill": "#2E3138",
            "font-family": "CVeDI Sora, Sora, sans-serif", "font-weight": "700"})
        t = c["titolo"]
        titolo_svg = node("text", {"id": "titolo-capitolo", "data-ruolo": "titolo",
            "aria-label": titolo,
            "font-size": str(t["corpo"]), "letter-spacing": str(t["spaziatura"])})
        for i, riga in enumerate(righe):
            riga_svg = node("tspan", {"x": str(t["x"]),
                "y": str(t["y"] + i * t["interlinea"])}, riga)
            if "corpi_righe" in t:
                riga_svg.set("font-size", str(t["corpi_righe"][i]))
            if i < len(righe) - 1:
                riga_svg.tail = " "
            titolo_svg.append(riga_svg)
        testo.append(titolo_svg)
        n = c["codice"]
        testo.append(node("text", {"id": "numero-capitolo", "data-ruolo": "numero",
            "x": str(n["x"]), "y": str(n["y"]), "font-size": str(n["corpo"]),
            "letter-spacing": str(n["spaziatura"]), "fill": n.get("colore", "#2E3138")},
            capitolo["codice"]))
        completo.append(testo)
        output = BASE / "svg" / (c["nome"] + ".svg")
        output.parent.mkdir(parents=True, exist_ok=True)
        ET.ElementTree(completo).write(output, encoding="utf-8", xml_declaration=True)
        esiti.append({"numero": c["numero"], "titolo": titolo,
            "svg": str(output.relative_to(BASE)), "disegno": str(source.relative_to(BASE)),
            "riferimento": "originali/" + c["riferimento"] + ".png",
            "prompt": "prompts/" + c["riferimento"] + ".txt",
            "sha256_riferimento": hashlib.sha256((BASE / "originali" / (c["riferimento"] + ".png")).read_bytes()).hexdigest(),
            "sha256_prompt": hashlib.sha256((BASE / "prompts" / (c["riferimento"] + ".txt")).read_bytes()).hexdigest(),
            "sha256_svg": hashlib.sha256(output.read_bytes()).hexdigest(),
            "sha256_disegno": hashlib.sha256(source.read_bytes()).hexdigest(),
            "testi_editabili": ["titolo-capitolo", "numero-capitolo"]})
    manifest = {
        "versione": 1, "stato": "Sette aperture approvate e attive nel booklet Typst; fondi SVG con titolo e numero composti come testo nativo.",
        "origine": "Concept ImageGen built-in della sessione del 22 ottobre 2026",
        "piano": "typst-booklet/piano.json", "font": composizioni["font"],
        "licenza_font": composizioni["licenza_font"],
        "note": [
            "Illustrazioni ricostruite in forme e tracciati; nessun raster incorporato.",
            "Rifinitura geometrica: bordi condivisi, tangenti raccordate, archi ellittici esatti e nastro spettrale governato da un unico profilo continuo.",
            "Colore: nastro e contesti composti esclusivamente da archi ellittici A e rette H/V/L. Raggi e centri sono in geometria-colore.json; geometria-colore.py calcola le tangenti comuni.",
            "Controllo generale: controcurve di Ricerca e Tipografia regolarizzate, tangenti Gestalt riallineate e modulo bianco Griglie sullo stesso asse del quarto superiore. Numero Tipografia blue 600 per contrasto 3,74 sul fondo verde, senza cambiare font, dimensione o posizione.",
            "Le lievi sfumature del generatore sono sostituite dalle campiture piatte del capitolo.",
            "Titoli e numeri sono testo Sora 700, con font OFL completo incorporato negli SVG portabili.",
            "Il macrosegno del capitolo 06 riprende il disegno del concept: è un'illustrazione, non un campione autentico del glifo Sora.",
            "Lo spettro del capitolo 05 usa le 17 famiglie esatte del sistema; i due campioni sono identici.",
            "Testi e posizioni si aggiornano con composizioni.json e componi.py; il titolo completo proviene dal piano unico."
        ], "capitoli": esiti}
    (BASE / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(f"Composte {len(esiti)} aperture SVG con testi editabili.")


if __name__ == "__main__":
    main()
