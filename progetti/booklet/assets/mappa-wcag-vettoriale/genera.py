#!/usr/bin/env python3
"""Mappa WCAG 2.2: tre colonne, gerarchia nativa e verifiche delle geometrie."""
from pathlib import Path
from html import escape
from collections import Counter
from PIL import ImageFont
import base64
import hashlib
import json
import math
import os
import shutil
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[3]
FONT_DIR = ROOT / "risorse-condivise/font/editoriali"
W, H = 1054.0, 1492.0
INK, ACCENT, DARK, GRAY = "#2E3138", "#FFD230", "#973C00", "#6B7280"
PALE, RULE = "#FFF6D6", "#D1D5DC"
MARGIN, GUTTER, TOP, BOTTOM = 28.0, 26.0, 120.0, 1433.0
COLUMN = (W - 2 * MARGIN - 2 * GUTTER) / 3
COL_X = [MARGIN + i * (COLUMN + GUTTER) for i in range(3)]
DATA = json.loads((BASE / "criteri.json").read_text())
CRITERIA = DATA["criteri"]
PRINCIPLES = DATA["principi"]
FONT_CACHE = {}
PARTS, BOXES, ROWS, SECTIONS, PANELS = [], [], [], [], []
CURRENT = None

def number(value):
    return f"{value:.4f}".rstrip("0").rstrip(".")

def emit(value):
    PARTS.append(value)

def font(size, weight=400, family="DM Sans"):
    key = (round(size, 4), weight, family)
    if key not in FONT_CACHE:
        file = "sora-variabile.ttf" if family == "Sora" else "dm-sans-variabile.ttf"
        f = ImageFont.truetype(str(FONT_DIR / file), round(size * 10))
        f.set_variation_by_axes([weight] if family == "Sora" else [18, weight])
        FONT_CACHE[key] = f
    return FONT_CACHE[key]

def measure(value, size, weight=400, family="DM Sans"):
    return font(size, weight, family).getlength(value) / 10

def wrap(value, width, size, weight=400, family="DM Sans"):
    lines, current = [], ""
    for word in value.split():
        candidate = (current + " " + word).strip()
        if current and measure(candidate, size, weight, family) > width - 4:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    assert all(measure(line, size, weight, family) <= width for line in lines), value
    return lines

def text(x, y, value, size=16, weight=400, fill=INK, width=None,
         leading=None, family="DM Sans", anchor="start", role="text"):
    lines = wrap(value, width, size, weight, family) if width else [value]
    leading = leading or size * 1.2
    extra = ' style="font-variation-settings: &apos;opsz&apos; 18"' if family == "DM Sans" else ""
    emit(f'<text x="{number(x)}" y="{number(y)}" font-family="{family}" '
         f'font-size="{number(size)}" font-weight="{weight}" fill="{fill}" '
         f'text-anchor="{anchor}" data-ruolo="{role}"{extra}>')
    for i, line in enumerate(lines):
        baseline = y + i * leading
        emit(f'<tspan x="{number(x)}" y="{number(baseline)}">{escape(line)}</tspan>')
        length = measure(line, size, weight, family)
        left = x - length / 2 if anchor == "middle" else x - length if anchor == "end" else x
        BOXES.append(dict(testo=line, x=left, y=baseline-size,
                          larghezza=length, altezza=leading, ruolo=role, criterio=CURRENT))
    emit("</text>")
    return len(lines) * leading

def rect(x, y, width, height, fill=ACCENT, radius=0):
    emit(f'<rect x="{number(x)}" y="{number(y)}" width="{number(width)}" '
         f'height="{number(height)}" rx="{number(radius)}" fill="{fill}"/>')

def line(x1, y1, x2, y2, color=RULE, width=1):
    emit(f'<path d="M{number(x1)} {number(y1)}H{number(x2)}" '
         f'stroke="{color}" stroke-width="{number(width)}"/>' if y1 == y2 else
         f'<path d="M{number(x1)} {number(y1)}L{number(x2)} {number(y2)}" '
         f'stroke="{color}" stroke-width="{number(width)}"/>')

def star(x, y, radius=4.8):
    points=[]
    for i in range(10):
        angle=-math.pi/2+i*math.pi/5
        r=radius if i % 2 == 0 else radius*.45
        points.append(f"{number(x+math.cos(angle)*r)},{number(y+math.sin(angle)*r)}")
    emit(f'<polygon points="{" ".join(points)}" fill="{DARK}" data-ruolo="novita"/>')

def active_for(prefix):
    return [c for c in CRITERIA
            if not c["rimosso"] and c["id"].rsplit(".", 1)[0] == prefix]

def metrics(principle, size):
    desc_lines=wrap(principle["definizione"], COLUMN, 13.4)
    y=44 + 11 + len(desc_lines)*16.2 + 14
    for guideline in principle["linee_guida"]:
        heads=wrap(guideline["id"]+" "+guideline["titolo"], COLUMN, 16.8, 800)
        y += len(heads)*20.2 + 8
        for item in active_for(guideline["id"]):
            y += len(wrap(item["titolo"], COLUMN-103, size))*size*1.2+2.4
        y += 13
    return y

def paragraph_height(value, width, size, leading):
    return len(wrap(value, width, size)) * leading

HISTORY_TITLE = "4.1.1 · Analisi sintattica (parsing)"
HISTORY = "Obsoleto e rimosso nelle WCAG 2.2. È riportato come riferimento storico e non rientra negli 86 criteri attivi."
LEVEL_NOTE = "Le sigle indicano il livello del singolo criterio."
CONFORMITY = "La conformità AA comprende tutti i criteri A e AA; la conformità AAA comprende A, AA e AAA."
NEW_NOTE = "Criterio introdotto con le WCAG 2.2."
HISTORY_H = 29 + paragraph_height(HISTORY_TITLE, COLUMN, 14, 17) + 10 + paragraph_height(HISTORY, COLUMN, 13.8, 17)
LEGEND_H = 29 + 29 + paragraph_height(LEVEL_NOTE, COLUMN, 13.8, 17) + 12 + paragraph_height(CONFORMITY, COLUMN, 13.8, 17) + 16 + paragraph_height(NEW_NOTE, COLUMN-24, 13.8, 17)

assert len(CRITERIA) == 87
assert len({c["id"] for c in CRITERIA}) == 87
assert sum(not c["rimosso"] for c in CRITERIA) == 86
assert sum(c["nuovo"] for c in CRITERIA) == 9
assert sum(len(p["linee_guida"]) for p in PRINCIPLES) == 13
assert [p["numero"] for p in PRINCIPLES] == [1, 2, 3, 4]
assert next(c for c in CRITERIA if c["rimosso"])["livello"] is None

# Un solo corpo per tutti i criteri. La misura dipende dalla gabbia completa.
SIZE=None
for attempt in range(175, 144, -1):
    candidate=attempt/10
    heights=[metrics(p, candidate) for p in PRINCIPLES]
    total_third=heights[2]+28+heights[3]+24+HISTORY_H+27+LEGEND_H
    if TOP+max(heights[0], heights[1], total_third) <= BOTTOM:
        SIZE=candidate
        break
assert SIZE is not None, "La tavola richiede più spazio: non ridurre il corpo sotto 14,5."
LEADING=SIZE*1.2

emit(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
     f'width="170mm" height="240mm" viewBox="0 0 {number(W)} {number(H)}" '
     'role="img" aria-labelledby="titolo descrizione">')
emit('<title id="titolo">WCAG 2.2 · Mappa dei criteri</title>')
emit('<desc id="descrizione">Leggere le colonne da sinistra a destra. '
     'Prima Percepibile, poi Utilizzabile; nella terza colonna Comprensibile e Robusto. '
     'Quattro principi, tredici linee guida e 86 criteri attivi. '
     'Ogni criterio mostra il proprio livello A, AA o AAA. '
     'Nove stelle indicano i criteri nuovi nella 2.2. '
     'Il criterio 4.1.1 rimosso è separato in una nota storica.</desc>')
emit('<metadata>Intopia e Sketch Group; traduzione Roberto Scano; '
     'rielaborazione vettoriale. CC BY-SA 4.0.</metadata>')
styles=[]
for family,file in [("DM Sans","dm-sans-variabile.ttf"),("Sora","sora-variabile.ttf")]:
    encoded=base64.b64encode((FONT_DIR/file).read_bytes()).decode()
    styles.append(f"@font-face{{font-family:'{family}';src:url(data:font/ttf;base64,{encoded}) format('truetype');font-weight:100 1000;}}")
for file in ["dm-sans-licenza.txt","sora-licenza.txt"]:
    emit(f'<metadata id="{file.replace(".", "-")}">{escape((FONT_DIR/file).read_text())}</metadata>')
emit("<defs><style>"+"".join(styles)+"</style></defs>")
rect(0,0,W,H,"white")
text(MARGIN,53,"WCAG 2.2",34,700,family="Sora",role="titolo")
text(267,53,"Mappa dei criteri",31,600,family="Sora",role="titolo")
text(MARGIN,85,"4 principi · 13 linee guida · 86 criteri attivi",16.4,500,role="riepilogo")
star(840,79,5.2)
text(854,84,"Novità della versione 2.2",13,500,role="legenda")
line(MARGIN,102,W-MARGIN,102,INK,1.2)

def draw_principle(principle, x, y):
    global CURRENT
    origin=y
    n=principle["numero"]
    emit(f'<g id="principio-{n}" data-principio="{n}">')
    rect(x,y,COLUMN,44,ACCENT)
    text(x+12,y+31,str(n),27,900,role="numero-principio")
    text(x+44,y+30,principle["titolo"],21.6,700,family="Sora",role="titolo-principio")
    y += 44+11
    h=text(x,y+13.4,principle["definizione"],13.4,width=COLUMN,leading=16.2,role="definizione")
    y += h+14
    for guideline in principle["linee_guida"]:
        sid=guideline["id"]
        section_top=y
        emit(f'<g id="linea-guida-{sid.replace(".", "-")}" data-linea-guida="{sid}">')
        y += text(x,y+16.8,sid+" "+guideline["titolo"],16.8,800,
                  width=COLUMN,leading=20.2,role="linea-guida")+8
        for item in active_for(sid):
            CURRENT=item["id"]
            lines=wrap(item["titolo"],COLUMN-103,SIZE)
            height=len(lines)*LEADING+2.4
            emit(f'<g id="criterio-{CURRENT.replace(".", "-")}" data-criterio="{CURRENT}" '
                 f'data-livello="{item["livello"]}" data-nuovo="{str(item["nuovo"]).lower()}" data-rimosso="false">')
            baseline=y+SIZE
            text(x,baseline,CURRENT,13.4,700,role="codice")
            if item["nuovo"]:
                star(x+46.4,baseline-5.2,4.1)
            text(x+61,baseline,item["titolo"],SIZE,width=COLUMN-103,
                 leading=LEADING,role="titolo-criterio")
            badge_x=x+COLUMN-29
            rect(badge_x,baseline-14.7,29,19.2,ACCENT)
            text(badge_x+14.5,baseline-1,item["livello"],11.4,700,anchor="middle",role="livello")
            ROWS.append(dict(id=CURRENT,principio=n,linea_guida=sid,
                             livello=item["livello"],nuovo=item["nuovo"],
                             x=x,y=y,larghezza=COLUMN,altezza=height,righe=len(lines)))
            CURRENT=None
            y += height
            emit("</g>")
        y += 13
        SECTIONS.append(dict(id=sid,principio=n,x=x,y=section_top,larghezza=COLUMN,fondo=y))
        emit("</g>")
    PANELS.append(dict(numero=n,x=x,y=origin,larghezza=COLUMN,fondo=y))
    emit("</g>")
    assert abs(y-origin-metrics(principle,SIZE)) < .01
    return y

end_1=draw_principle(PRINCIPLES[0],COL_X[0],TOP)
end_2=draw_principle(PRINCIPLES[1],COL_X[1],TOP)
end_3=draw_principle(PRINCIPLES[2],COL_X[2],TOP)
end_4=draw_principle(PRINCIPLES[3],COL_X[2],end_3+28)
x,y=COL_X[2],end_4+24

# Il criterio rimosso non possiede un badge di livello e non entra nei conteggi.
emit('<g id="criterio-4-1-1" data-criterio="4.1.1" data-rimosso="true" data-nuovo="false">')
line(x,y,x+COLUMN,y,RULE,1.1)
text(x,y+24,"Rimosso nella 2.2",15.5,800,fill=GRAY,role="storico")
y+=29
y+=text(x,y+14,HISTORY_TITLE,14,700,width=COLUMN,leading=17,role="storico")+10
y+=text(x,y+13.8,HISTORY,13.8,fill=GRAY,width=COLUMN,leading=17,role="storico")
emit("</g>")
y+=27

emit('<g id="legenda">')
line(x,y,x+COLUMN,y,RULE,1.1)
text(x,y+24,"Come leggere la mappa",16,800,role="legenda")
y+=29
for i,level in enumerate(["A","AA","AAA"]):
    bx=x+i*37
    rect(bx,y+1,29,20,ACCENT)
    text(bx+14.5,y+15.8,level,11.4,700,anchor="middle",role="legenda")
y+=29
y+=text(x,y+13.8,LEVEL_NOTE,13.8,width=COLUMN,leading=17,role="legenda")+12
y+=text(x,y+13.8,CONFORMITY,13.8,width=COLUMN,leading=17,role="legenda")+16
star(x+6,y+8,4.7)
y+=text(x+24,y+13.8,NEW_NOTE,13.8,width=COLUMN-24,leading=17,role="legenda")
emit("</g>")
assert y<=BOTTOM
line(MARGIN,1451,W-MARGIN,1451,RULE,1.1)
text(W-MARGIN,1474,"Lettura per colonne: 1 → 2 → 3 → 4",10.4,anchor="end",role="ordine")
emit("</svg>")

# Le verifiche distinguono contenuto, gabbia e spazio fra le righe.
for box in BOXES:
    assert box["x"]>=MARGIN-1 and box["y"]>=0
    assert box["x"]+box["larghezza"]<=W-MARGIN+1,box
    assert box["y"]+box["altezza"]<=H,box
assert {r["id"] for r in ROWS}=={c["id"] for c in CRITERIA if not c["rimosso"]}
assert len(ROWS)==86 and sum(r["nuovo"] for r in ROWS)==9
for row in ROWS:
    for box in [b for b in BOXES if b["criterio"]==row["id"]]:
        assert box["x"]>=row["x"]-1,box
        assert box["x"]+box["larghezza"]<=row["x"]+COLUMN+1,box
for panel in PANELS:
    assert panel["fondo"]<=BOTTOM
for a,b in zip(ROWS,ROWS[1:]):
    if a["x"]==b["x"]:
        assert a["y"]+a["altezza"]<=b["y"]+.01
for section in SECTIONS:
    ids=[r["id"] for r in ROWS if r["linea_guida"]==section["id"]]
    assert ids==sorted(ids,key=lambda i:tuple(map(int,i.split("."))))

svg=BASE/"mappa-wcag-2.2-editabile.svg"
svg.write_text("\n".join(PARTS)+"\n")
report=dict(versione=2,tela=[W,H],colonne=3,corpo_criteri=SIZE,
            interlinea_criteri=LEADING,larghezza_colonna=COLUMN,
            principi=PANELS,linee_guida=SECTIONS,criteri=ROWS,testi=BOXES,
            fondo_contenuti=max(end_1,end_2,y),limite_contenuti=BOTTOM)
(BASE/"misure.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n")
print(f"SVG nativo: corpo {SIZE:g}, interlinea {LEADING:g}; fondo {max(end_1,end_2,y):.1f}/{BOTTOM:g}.")
print("Principi:",[(p["numero"],round(p["y"]),round(p["fondo"])) for p in PANELS])

if "--export" in sys.argv:
    with tempfile.TemporaryDirectory(prefix="cvedi-wcag-") as folder:
        tmp=Path(folder)
        system=next((p for p in [Path("/opt/homebrew/etc/fonts/fonts.conf"),Path("/etc/fonts/fonts.conf")] if p.exists()),None)
        include=f'<include ignore_missing="yes">{system}</include>' if system else ""
        config=tmp/"fonts.conf"
        config.write_text('<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">'
                          f'<fontconfig>{include}<dir>{escape(str(FONT_DIR))}</dir>'
                          f'<cachedir>{tmp}/cache</cachedir></fontconfig>')
        env={**os.environ,"FONTCONFIG_FILE":str(config)}
        subprocess.run(["rsvg-convert","-w","1130","-h","1600",str(svg),"-o",str(BASE/"anteprima.png")],check=True,env=env)
        subprocess.run(["rsvg-convert","-f","pdf",str(svg),"-o",str(tmp/"mappa.pdf")],check=True,env=env)
        subprocess.run(["pdftocairo","-svg",str(tmp/"mappa.pdf"),str(BASE/"mappa-wcag-2.2.svg")],check=True)
        # Anche la variante in tracciati conserva titolo, descrizione e diritti.
        output=BASE/"mappa-wcag-2.2.svg"
        native=ET.parse(svg).getroot()
        root=ET.parse(output).getroot()
        ET.register_namespace("","http://www.w3.org/2000/svg")
        ET.register_namespace("xlink","http://www.w3.org/1999/xlink")
        for i,tag in enumerate(["title","desc","metadata"]):
            source=native.find("{http://www.w3.org/2000/svg}"+tag)
            root.insert(i,source)
        root.set("role","img")
        root.set("aria-labelledby","titolo descrizione")
        ET.ElementTree(root).write(output,encoding="UTF-8",xml_declaration=True)
        for file in [svg,output]:
            parsed=ET.parse(file).getroot()
            assert not any(e.tag.endswith("}image") for e in parsed.iter()),file
        # L’anteprima mostra la variante effettivamente pronta per la stampa.
        subprocess.run(["rsvg-convert","-w","1130","-h","1600",str(output),"-o",str(BASE/"anteprima.png")],check=True)
        for canonical,versioned in [(output.name,"mappa-wcag-2.2-v2.svg"),
                                     (svg.name,"mappa-wcag-2.2-v2-editabile.svg"),
                                     ("anteprima.png","anteprima-v2.png")]:
            shutil.copy2(BASE/canonical,BASE/versioned)
        print("Esportati i due SVG e il PNG, senza immagini raster incorporate.")
