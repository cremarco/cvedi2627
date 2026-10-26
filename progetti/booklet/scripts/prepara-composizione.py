"""Prepara le visuali del capitolo 08 dagli originali verificati in Figma.

I raster non vengono riscritti: gli SVG li incorporano alle proporzioni originali.
Didascalie, diritti e numeri appartengono ai componenti Typst.
"""
from pathlib import Path
import base64
import hashlib
import json
import mimetypes
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[3]
FONTI = ROOT / "risorse-condivise/fonti/booklet/composizione-gerarchia"
FIGURE = ROOT / "risorse-condivise/immagini/figure/composizione"

# Snapshot Figma 3.173: il pannello 363 × 458,342 pt contiene un raster
# orizzontale di 1140 × 900 px. Le dimensioni verificate valgono soltanto per
# questi byte: il wrapper conserva il raster intero, senza il bianco della tela.
COLORE_ATMOSFERE_RASTER = {
    "image_hash": "1a6ee8382ba465079ed7f2cb0559421121ff1aa1",
    "sha256": "9a06db3cc758156d202ee47498f4492fde79ad4e26af05473e2ac2cb2c8d4f8b",
    "larghezza_px": 1140, "altezza_px": 900,
}


def salva(percorso, dati):
    percorso.write_text(json.dumps(dati, ensure_ascii=False, indent=2) + "\n")


def main():
    originali = json.loads((FONTI / "originali-per-hash.json").read_text())
    nomi = ["quadrato", "cerchio", "triangolo", "esagono", "takete-maluma",
        "forme-naturali", "colore-atmosfere", "fotografia-illustrazione",
        "funzioni-immagini", "allbirds-headspace", "doisneau-widener",
        "ibm-pittogrammi", "sguardo-spazio", "pieno-vuoto", "julius-caesar",
        "barbie-dune", "moma-tipografia", "aesop-percorso", "diesel-contrasto",
        "pareidolia-legno", "melbourne", "adidas", "haagen-dazs", "cocacola",
        "linee-direzione", "triennale", "manifesto-modulare", "manifesto-denso",
        "prospettiva-tipografica"]
    diritti = {
        167: "Marchi dei rispettivi titolari.", 168: "Marchi dei rispettivi titolari.",
        169: "Marchi dei rispettivi titolari.", 170: "Marchi dei rispettivi titolari.",
        171: "", 172: "Autori delle fotografie non identificati; diritti dei rispettivi titolari.",
        173: "Autori delle immagini non identificati; diritti dei rispettivi titolari.",
        174: "Afghan Girl: © Steve McCurry. Le Baiser de l’Hôtel de Ville: © Atelier Robert Doisneau. Lunch Atop a Skyscraper: autore non identificato, Bettmann / Getty Images. Xilografia: autore non identificato.",
        175: "Autori delle immagini non identificati; diritti dei rispettivi titolari.",
        176: "© Allbirds e Headspace. Versioni storiche; data delle catture non indicata.",
        177: "© Robert Doisneau; © Jeff Widener / Associated Press.",
        178: "© IBM. Esempi della documentazione ufficiale.",
        179: "Autori delle fotografie non identificati; diritti dei rispettivi titolari.",
        180: "© Tang Yau Hoong; Richard Fonteneau, Spartan Golf, concept, 2010. Diritti dei rispettivi titolari.",
        181: "Paula Scher / Pentagram per The Public Theater; collaborazione Kirstin Rocke-Huber. Diritti dei rispettivi titolari.",
        182: "© Warner Bros. e rispettivi titolari dei materiali promozionali.",
        183: "© Rebecca Nolte. Marchio MoMA del rispettivo titolare.",
        184: "© Aesop. Cattura storica; data non indicata.",
        185: "© Diesel; diritti dei rispettivi titolari della campagna.",
        186: "Autore della fotografia non identificato; diritti dei rispettivi titolari.",
        187: "Melbourne Food & Wine Festival; diritti dei rispettivi titolari.",
        188: "© Adidas; diritti dei rispettivi titolari della campagna.",
        189: "© Häagen-Dazs; diritti dei rispettivi titolari della campagna.",
        190: "© The Coca-Cola Company; diritti dei rispettivi titolari della campagna.",
        191: "Autore non identificato; diritti dei rispettivi titolari.",
        192: "Ernst Scheidegger; diritti dei rispettivi titolari.",
        193: "Paula Scher / Pentagram per The Public Theater; collaborazione Kirstin Rocke-Huber. Diritti dei rispettivi titolari.",
        194: "© Paula Scher. Esemplare conservato al MoMA; dono della designer.",
        195: "Autore non identificato; diritti dei rispettivi titolari.",
    }
    didascalie_verificate = {
        180: "a. Negative Spaces, di Tang Yau Hoong. b. Spartan Golf, concept di Richard Fonteneau, 2010: sagoma di golfista e richiamo all’elmo.",
        181: "Julius Caesar, Shakespeare in the Park 2017, Paula Scher / Pentagram: scala e dimensione nella gerarchia del manifesto.",
        183: "Rebecca Nolte, MoMA Poster Series, 2014: esercizio tipografico sul calendario espositivo 2013. Dimensioni, pesi e disposizione distinguono le informazioni.",
        185: "Campagna Diesel: contrasto fra testo, immagine e sfondo nella composizione.",
        192: "Ernst Scheidegger, manifesto della Nona Triennale di Milano, 1951: relazioni fra campiture, numero e testi.",
        193: "Paula Scher / Pentagram, Shakespeare in the Park 2013: sovrapposizioni, lettere di scala diversa e gerarchia del testo.",
        194: "Paula Scher, The Public Theater, 95–96 Season, 1995: densità tipografica, direzioni contrastanti e variazioni di peso."}
    catalogo, registro = {}, []
    for tema in ("linguaggio", "gerarchia"):
        pagina = json.loads((FONTI / f"figma-{tema}.json").read_text())
        dati = pagina["children"][0]
        for testo in dati["texts"]:
            match = re.match(r"Figura 3\.(\d+) — (.+)", testo["text"], re.S)
            if not match:
                continue
            numero, caption = int(match[1]), match[2]
            nome = nomi[numero - 167]
            radice = testo["id"].split(";")[0].removeprefix("I")
            pannelli = [im for im in dati["images"] if im["id"].startswith("I" + radice + ";3165:593;")]
            file = FIGURE / (nome + ".svg")
            if numero == 171:
                w, h = 295, 158
            else:
                assert pannelli, (numero, radice)
                x = min(p["x"] for p in pannelli)
                y = min(p["y"] for p in pannelli)
                w = max(p["x"] + p["width"] for p in pannelli) - x
                h = max(p["y"] + p["height"] for p in pannelli) - y
                if numero == 173:
                    assert len(pannelli) == 1
                    assert pannelli[0]["fills"][0]["imageHash"] == COLORE_ATMOSFERE_RASTER["image_hash"]
                    h = w * COLORE_ATMOSFERE_RASTER["altezza_px"] / COLORE_ATMOSFERE_RASTER["larghezza_px"]
                    pannelli = [{**pannelli[0], "height": h}]
                svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">']
                for pannello in pannelli:
                    fonte = originali[pannello["fills"][0]["imageHash"]]
                    p = ROOT / fonte
                    raster = p.read_bytes()
                    if numero == 173:
                        assert hashlib.sha256(raster).hexdigest() == COLORE_ATMOSFERE_RASTER["sha256"]
                    immagine = base64.b64encode(raster).decode()
                    mime = mimetypes.guess_type(p.name)[0]
                    px, py = pannello["x"] - x, pannello["y"] - y
                    # L'intera immagine resta visibile, senza deformare gli originali.
                    svg.append(f'<image x="{px}" y="{py}" width="{pannello["width"]}" height="{pannello["height"]}" preserveAspectRatio="xMidYMid meet" href="data:{mime};base64,{immagine}"/>')
                svg.append('</svg>')
                file.write_text('\n'.join(svg))
            caption = caption.replace("Tre funzioni negli esempi delle slide:", "Tre funzioni delle immagini:")
            caption = caption.replace("Esempi ufficiali verificati il 13 ottobre 2026.", "")
            if numero == 184:
                caption = "Homepage di Aesop: distribuzione dei blocchi nella versione documentata. Lo schema a Z è una lettura compositiva, non una misurazione dello sguardo."
            if numero == 179:
                caption = "Spazio e direzione dello sguardo. Nel ritratto, looking room indica lo spazio davanti al volto; l’etichetta headroom è collocata lateralmente, ma il termine indica lo spazio sopra la testa. Le annotazioni sono conservate nel documento."
            if numero == 171:
                caption = "Profili spigolosi e curvilinei a confronto."
            caption = didascalie_verificate.get(numero, caption)
            catalogo[nome] = {"file": "/" + str(file.relative_to(ROOT)), "didascalia": caption.strip(),
                "diritti": diritti[numero], "rapporto": w / h, "numero_fonte": f"3.{numero}",
                "figma": radice, "tavola": numero not in (171, 178, 180, 184)}
            registro.append({"nome": nome, "file": str(file.relative_to(ROOT)),
                "sha256": hashlib.sha256(file.read_bytes()).hexdigest(), "figma": radice,
                "pagina_figma": pagina["page"]["id"], "numero_originale": f"3.{numero}",
                "originali": [originali[p["fills"][0]["imageHash"]] for p in pannelli],
                "diritti": diritti[numero], "trattamento": (
                    "Raster originale incorporato senza riscrittura né ritaglio; wrapper alle proporzioni verificate di 1140 × 900 px, senza il bianco della tela Figma."
                    if numero == 173 else
                    "Originali integri e proporzioni conservate; disposizione derivata dalle coordinate dei pannelli correnti.")})
    assert len(catalogo) == 29
    fonti_integrazioni = json.loads((FONTI / "originali-integrazioni/manifest.json").read_text())
    integrazioni = []
    for nome in ("up-1", "up-2", "budapest-simmetria-1", "budapest-cornice-4",
                 "budapest-spazio-formati-1", "cenacolo-1"):
        fonte = next(item for item in fonti_integrazioni if Path(item["file"]).stem == nome)
        originale = ROOT / fonte["file"]
        attivo = FIGURE / (nome + (".jpg" if nome.startswith("up-") else ".png"))
        integrazioni.append({"file": str(attivo.relative_to(ROOT)),
            "sha256": hashlib.sha256(attivo.read_bytes()).hexdigest(),
            "originale": fonte["file"], "sha256_originale": fonte["sha256"],
            "fonte": fonte["fonte"], "pagina_pdf": fonte["pagina_pdf"],
            "trattamento": "Immagine integrale; sola transcodifica da JPEG 2000 a PNG, quando necessaria.",
            "diritti": ("© Disney / Pixar. Autore delle annotazioni geometriche non identificato."
                if nome.startswith("up-") else "© Fox Searchlight Pictures / rispettivi titolari del film."
                if nome.startswith("budapest-") else "Opera di pubblico dominio. Autore della fotografia e delle annotazioni non identificato.")})
        assert hashlib.sha256(originale.read_bytes()).hexdigest() == fonte["sha256"]
    recuperi = json.loads((FONTI / "vecchio-booklet/manifest.json").read_text())
    for fonte in recuperi["figure"]:
        originale = ROOT / fonte["originale"]
        dati = originale.read_bytes()
        assert hashlib.sha256(dati).hexdigest() == fonte["sha256"]
        attivo = ROOT / fonte["file"]
        attivo.write_bytes(dati)
        integrazioni.append({"file": fonte["file"], "sha256": fonte["sha256"],
            "originale": fonte["originale"], "sha256_originale": fonte["sha256"],
            "fonte": recuperi["source_pdf"], "pagina_pdf": fonte["pagina_fisica"],
            "oggetto_pdf": fonte["oggetto_pdf"], "trattamento": fonte["trattamento"],
            "attribuzione": fonte["attribuzione"], "diritti": fonte["diritti"],
            **({"nota_documentaria": fonte["nota_documentaria"]}
               if "nota_documentaria" in fonte else {})})
    salva(FONTI / "figure.json", catalogo)
    salva(FIGURE / "manifest.json", {"versione": 1, "capitolo": 8, "figure_figma": registro,
        "integrazioni": integrazioni,
        "verifiche_attribuzioni": {
            "Afghan Girl": "https://www.nationalgeographic.com/magazine/article/afghan-girl-revealed?sf21474920=1",
            "Le Baiser de l’Hôtel de Ville": "https://www.expo-doisneau.com/home-liege/the-exhibition/",
            "Lunch Atop a Skyscraper": "https://www.gettyimages.co.uk/detail/news-photo/sep-1932-manhattan-new-york-city-new-york-state-usa-news-photo/517397798"},
        "attribuzioni_riesaminate": {
            "Julius Caesar": "https://www.pentagram.com/work/shakespeare-in-the-park-2017-1",
            "MoMA Poster Series": "https://www.behance.net/gallery/16323343/MoMA-Poster-Series",
            "Nona Triennale di Milano": "https://catalogo.cultura.gov.it/detail/HistoricOrArtisticProperty/0500671353",
            "Shakespeare in the Park 2013": "https://www.pentagram.com/work/shakespeare-in-the-park-2013",
            "The Public Theater, 95–96 Season": "https://www.moma.org/collection/works/8840"},
        "schema_vettoriale": {"file": "takete-maluma.svg", "nodo": "I3699:3833;3165:593;3699:4967;3492:6174"},
        "originali_conservati": True, "nota": "Le didascalie e i diritti sono testo nativo Typst. I rimandi ai materiali preparatori rimangono esclusivamente nei manifest locali."})
    print(f"Preparate {len(catalogo)} figure Figma e {len(recuperi['figure'])} moodboard, con originali verificati.")


if __name__ == "__main__":
    main()
