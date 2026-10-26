#!/usr/bin/env python3
"""Ricostruzione SVG nativa della mappa WCAG; dati separati in criteri.json."""
from pathlib import Path
from html import escape
from collections import Counter
import base64
import hashlib
import json
import math
import os
import subprocess
import sys
import tempfile
from PIL import ImageFont

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[3]
FONT_DIR = ROOT / 'risorse-condivise/font/editoriali'
INK, ACCENT, DARK, GRAY = '#2E3138', '#FFD230', '#973C00', '#6B7280'
W, H = 1054, 1492
parts, text_boxes, sections = [], [], []
font_cache = {}

def add(s): parts.append(s)
def font(size, weight=400, family='DM Sans'):
    key = (size, weight, family)
    if key not in font_cache:
        name = 'dm-sans-variabile.ttf' if family == 'DM Sans' else 'sora-variabile.ttf'
        f = ImageFont.truetype(str(FONT_DIR / name), round(size * 10))
        if family == 'DM Sans':
            f.set_variation_by_axes([18, weight])
        else:
            f.set_variation_by_axes([weight])
        font_cache[key] = f
    return font_cache[key]

def measure(s, size, weight=400, family='DM Sans'):
    return font(size, weight, family).getlength(s) / 10

def wrap(s, width, size, weight=400, family='DM Sans'):
    lines, current = [], ''
    for word in s.split():
        candidate = (current + ' ' + word).strip()
        if current and measure(candidate, size, weight, family) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current: lines.append(current)
    return lines

def text(x, y, s, size=11, weight=400, fill=INK, family='DM Sans',
         width=None, leading=None, anchor='start', ident=None, decoration=None):
    lines = wrap(s, width, size, weight, family) if width else [s]
    leading = leading or size * 1.23
    extra = (f' id="{ident}"' if ident else '') + (f' text-decoration="{decoration}"' if decoration else '')
    add(f'<text{extra} x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">')
    for i, line in enumerate(lines):
        add(f'<tspan x="{x}" y="{y+i*leading:.3f}">{escape(line)}</tspan>')
    add('</text>')
    for i, line in enumerate(lines):
        length = measure(line, size, weight, family)
        left = x - length / 2 if anchor == 'middle' else x
        text_boxes.append(dict(testo=line, x=left, y=y+i*leading-size, larghezza=length, altezza=leading))
    return len(lines) * leading

def path(d, stroke=INK, width=3, fill='none', extra=''):
    add(f'<path d="{d}" stroke="{stroke}" stroke-width="{width}" fill="{fill}" stroke-linecap="round" stroke-linejoin="round" {extra}/>')

def rect(x,y,w,h,fill='white',stroke=INK,sw=3,rx=0):
    add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

def circle(x,y,r,fill='white',stroke=INK,sw=3):
    add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

def star(x,y,r=4.3,fill=DARK):
    pts=[]
    for i in range(10):
        a=-math.pi/2+i*math.pi/5; rr=r if i%2==0 else r*.44
        pts.append(f'{x+math.cos(a)*rr:.3f},{y+math.sin(a)*rr:.3f}')
    add(f'<polygon points="{" ".join(pts)}" fill="{fill}"/>')

def group_start(x,y,scale=1,ident=None):
    add(f'<g transform="translate({x} {y}) scale({scale})"'+(f' id="{ident}"' if ident else '')+'>')
def end():add('</g>')

def laptop(x,y,scale=1,code=False):
    group_start(x,y,scale)
    rect(3,0,83,58,'white',INK,3,3)
    path('M-7 62 H96 L87 74 H1 Z',fill='white')
    if code:
        path('M32 19 L22 29 L32 39 M59 19 L69 29 L59 39',ACCENT,5)
        path('M49 17 L42 42',DARK,3)
    else:
        for yy in [13,23,33,43]:path(f'M16 {yy} H70',GRAY,2)
    end()

def person(x,y,scale=1,action='laptop'):
    group_start(x,y,scale)
    circle(38,22,18,'white',INK,3.2)
    path('M21 18 Q17-2 39 2 Q59-1 58 19 Q47 16 42 9 Q33 20 21 18 Z',fill=INK)
    path('M26 42 Q8 44 8 61 V100 H67 V60 Q67 45 50 42 L39 52 Z',fill=ACCENT,width=3.2)
    if action=='book':
        path('M24 64 L44 69 L65 65 V99 L44 102 L24 97 Z',fill='white',width=3)
        path('M44 70 V99 M31 76 L39 79 M50 77 L59 75',width=2)
        path('M12 70 L28 83 M65 72 L59 86',width=5)
    else:
        path('M17 59 L27 80 H61 M62 57 L73 75 L94 76',width=4)
        laptop(70,52,.65)
    end()

def keyboard(x,y,scale=1):
    group_start(x,y,scale);rect(0,0,115,42,'white',INK,3,4)
    for row in range(3):
        for col in range(11):rect(7+col*9.3,6+row*9,5,4,INK,'none',0)
    path('M25 35 H86',width=3)
    end()

data=json.loads((BASE/'criteri.json').read_text())
criteria=data['criteri']
assert len(criteria)==87 and sum(not c['rimosso'] for c in criteria)==86
assert len({c['id'] for c in criteria})==87
assert sum(c['nuovo'] for c in criteria)==9

add(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="170mm" height="240mm" viewBox="0 0 {W} {H}" role="img" aria-labelledby="titolo descrizione">')
add('<title id="titolo">Mappa WCAG 2.2</title><desc id="descrizione">Ricostruzione interamente vettoriale: quattro principi, tredici linee guida, 86 criteri attivi e il criterio 4.1.1 rimosso. I livelli A, AA e AAA sono distinti; nove stelle indicano le novità WCAG 2.2.</desc>')
add('<metadata>Intopia e Sketch Group; traduzione Roberto Scano; rielaborazione vettoriale. CC BY-SA 4.0.</metadata>')
for name in ['dm-sans-licenza.txt','sora-licenza.txt']:
    add('<metadata id="'+name.replace('.','-')+'">'+escape((FONT_DIR/name).read_text())+'</metadata>')
styles=[]
for family,file in [('DM Sans','dm-sans-variabile.ttf'),('Sora','sora-variabile.ttf')]:
    b64=base64.b64encode((FONT_DIR/file).read_bytes()).decode()
    styles.append(f"@font-face{{font-family:'{family}';src:url(data:font/ttf;base64,{b64}) format('truetype');font-weight:100 1000;}}")
add('<defs><style>'+''.join(styles)+'</style></defs>')
rect(0,0,W,H,'white','none',0)

# Banner e pittogrammi nativi: nessun raster, filtro o tracciamento automatico.
path('M250 45 L214 60 L242 86 L213 118 L285 107 M804 45 L843 60 L817 86 L846 118 L773 107',fill=ACCENT,width=3.5)
path('M262 34 Q529 0 793 34 L780 111 Q529 80 275 111 Z',fill='white',width=3.5)
text(320,76,'Mappa',36,700,family='Sora')
text(473,76,'WCAG 2.2',36,700,DARK,family='Sora')

group_start(42,120,1.12,'illustrazione-media')
person(0,8,.93,'book')
path('M19 31 Q12 2 38 0 Q66-1 61 30',width=5)
rect(12,24,9,24,ACCENT,INK,2,4);rect(59,24,9,24,ACCENT,INK,2,4)
rect(81,23,91,65,'white',INK,3,3);circle(126,55,15,ACCENT,'none',0)
path('M122 47 L135 55 L122 64 Z',stroke='none',fill=INK,width=0)
path('M91 78 H159',INK,2);end()

group_start(515,135,1,'illustrazione-tastiera')
circle(32,25,26,'white',DARK,3);path('M32 9 V26 L46 36',width=3)
keyboard(87,24,.95)
path('M84 87 L87 65 L97 57 L105 62 L111 46 Q119 40 122 48 L119 74 L111 91',width=3)
path('M162 91 L159 69 L151 62 L149 47 Q149 40 156 42 L168 60 L179 65 L180 87',width=3)
path('M77 89 L112 92 L108 106 L72 103 Z',fill=ACCENT,width=2)
path('M160 91 L186 88 L192 104 L164 107 Z',fill=ACCENT,width=2);end()

group_start(845,132,1,'illustrazione-navigazione')
rect(0,0,112,74,'white',INK,3,3);path('M0 18 H112',width=2)
for x in [10,19,28]:circle(x,9,2.5,ACCENT,'none',0)
for yy in [30,42,54]:path(f'M11 {yy} H75',width=2)
path('M89 59 L105 48 Q116 40 123 50 Q131 60 120 69 L111 76 M111 76 L95 88 Q84 96 76 85 Q69 76 80 68 L89 61',ACCENT,8)
path('M92 66 L108 56',width=4);end()

# Connettori della composizione radiale, disegnati prima dei contenuti.
add('<g id="connessioni" stroke="'+DARK+'" stroke-width="1.4" fill="none" stroke-linejoin="round">')
for d in [
 'M425 628 V548 H310 V508',
 'M350 678 H320 V505 H19 V265 H30',
 'M299 775 H18 V515 H30',
 'M284 887 H18 V730 H30',
 'M555 607 V465 H505',
 'M530 605 V593 H791 V319 H783',
 'M779 760 H794 V620 H805',
 'M700 640 V585 H793 V247 H805',
 'M780 941 H794 V828 H805',
 'M453 1094 V1135 H370',
 'M604 1095 V1135 H585',
 'M704 1042 V1106 H805',
 'M346 1056 V1135 H30']:
    add('<path d="'+d+'"/>')
end()

# Centro: stessi quattro principi e spiegazioni della fonte italiana.
circle(530,855,250,'white',DARK,2.2)
path('M530 605 V1105 M280 855 H780',DARK,2.2)
rect(325,631,152,32,'white','none',0)
rect(580,631,156,32,'white','none',0)
text(400,656,'Percepibile',21,700,DARK,family='Sora',anchor='middle')
text(657,656,'Utilizzabile',21,700,DARK,family='Sora',anchor='middle')
text(399,935,'Robusto',21,700,DARK,family='Sora',anchor='middle')
text(654,935,'Comprensibile',20,700,DARK,family='Sora',anchor='middle')
definitions=[
 (391,682,121,'Le informazioni e i componenti dell’interfaccia utente devono essere presentati agli utenti in modi in cui essi possano percepirli.'),
 (549,682,122,'I componenti e la navigazione dell’interfaccia utente devono essere utilizzabili.'),
 (386,958,139,'Il contenuto deve essere abbastanza robusto per essere interpretato in maniera affidabile da una grande varietà di programmi utente, comprese le tecnologie assistive.'),
 (549,958,123,'Le informazioni e le operazioni dell’interfaccia utente devono essere comprensibili.')]
for x,y,w,s in definitions:
    small = x == 386
    text(x,y,s,11 if small else 11.6,width=w,leading=12.8 if small else 14)
person(301,741,.65,'book')
person(677,742,.66,'laptop')
laptop(297,992,.76,True)
person(686,983,.67,'book')
circle(530,855,77,ACCENT,'white',10)
text(530,849,'WCAG',28,700,family='Sora',anchor='middle')
text(530,886,'2.2',32,700,family='Sora',anchor='middle')

# Blocchi delle linee guida: testi, numeri e livelli sono tutti modificabili.
layouts=[
 ('1.2','Media temporizzati',30,265,278,10.6),
 ('1.3','Adattabile',30,515,278,10.6),
 ('1.4','Distinguibile',30,730,255,10.4),
 ('1.1','Alternative testuali',310,508,190,10.0),
 ('2.2','Adeguata disponibilità di tempo',505,285,278,10.6),
 ('2.1','Accessibile da tastiera',505,465,278,10.6),
 ('2.4','Navigabile',805,247,225,10.0),
 ('2.3','Convulsioni e reazioni fisiche',805,620,225,10.0),
 ('2.5','Modalità di input',805,828,225,10.0),
 ('4.1','Compatibile',30,1155,278,10.6),
 ('3.1','Leggibile',370,1140,204,10.2),
 ('3.2','Prevedibile',585,1140,204,10.2),
 ('3.3','Assistenza nell’inserimento',805,1110,225,10.0)]

for prefix,title,x,y,width,size in layouts:
    ident='linea-guida-'+prefix.replace('.','-')
    start = len(parts)
    add(f'<g id="{ident}" data-linea-guida="{prefix}">')
    yy=y+text(x,y,prefix+' '+title,14.5,800,DARK,width=width,leading=17)+6
    rows=[c for c in criteria if c['id'].rsplit('.',1)[0]==prefix]
    for level in ['A','AA','AAA']:
        group=[c for c in rows if c['livello']==level]
        if not group:continue
        top=yy-10
        for c in group:
            ci='criterio-'+c['id'].replace('.','-')
            add(f'<g id="{ci}" data-criterio="{c["id"]}" data-livello="{level}" data-nuovo="{str(c["nuovo"]).lower()}" data-rimosso="{str(c["rimosso"]).lower()}">')
            color=GRAY if c['rimosso'] else INK
            dec='line-through' if c['rimosso'] else None
            text(x+38,yy,c['id'],size,600,color,decoration=dec)
            hh=text(x+82,yy,c['titolo'],size,400,color,width=width-84,leading=size*1.26,decoration=dec)
            if c['nuovo']:star(x+73,yy-3,3.8)
            yy+=max(hh,size*1.26)+2
            end()
        bottom=yy-2
        path(f'M{x+31} {top} V{bottom} H{x+width}',DARK,1.25)
        rect(x+1,top+3,28,23,ACCENT,'none',0)
        text(x+15,top+19,level,11.5,700,anchor='middle')
        yy+=8
    sections.append(dict(id=prefix,x=x,y=y,larghezza=width,fondo=yy))
    end()
    parts.insert(start+1,f'<rect x="{x-3}" y="{y-17}" width="{width+6}" height="{yy-y+21}" fill="white"/>')

# Pittogramma conclusivo e legenda con attribuzione locale alla tavola.
laptop(101,1326,1.25,True)
rect(359,1351,405,73,'white',INK,1.4,0)
text(374,1373,'Legenda',12,700)
star(437,1369,5)
text(451,1373,'Novità WCAG 2.2',11)
for i,level in enumerate(['A','AA','AAA']):
    rect(374+i*34,1385,29,21,ACCENT,'none',0)
    text(388.5+i*34,1400,level,10.8,700,anchor='middle')
text(486,1400,'Livelli dei criteri di successo',11)
text(30,1460,'Intopia e Sketch Group · Traduzione Roberto Scano · Rielaborazione vettoriale · CC BY-SA 4.0',9.4,400)
add('</svg>')

for b in text_boxes:
    assert b['x']>=0 and b['y']>=0 and b['x']+b['larghezza']<=W and b['y']+b['altezza']<=H,b
svg=BASE/'mappa-wcag-2.2-editabile.svg'
svg.write_text('\n'.join(parts)+'\n',encoding='utf-8')
(BASE/'misure.json').write_text(json.dumps({'tela':[W,H],'blocchi':sections,'testi':text_boxes},ensure_ascii=False,indent=2)+'\n')
print('SVG nativo:',svg)
for s in sections:print(s['id'],round(s['y']),round(s['fondo']))

if '--export' in sys.argv:
    with tempfile.TemporaryDirectory(prefix='cvedi-wcag-') as tmp:
        tmp=Path(tmp)
        config=tmp/'fonts.conf'
        system=next((p for p in [Path('/opt/homebrew/etc/fonts/fonts.conf'),Path('/etc/fonts/fonts.conf')] if p.exists()),None)
        include=f'<include ignore_missing="yes">{system}</include>' if system else ''
        config.write_text(f'<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd"><fontconfig>{include}<dir>{escape(str(FONT_DIR))}</dir><cachedir>{tmp}/cache</cachedir></fontconfig>')
        env={**os.environ,'FONTCONFIG_FILE':str(config)}
        subprocess.run(['rsvg-convert','-w','1130','-h','1600',str(svg),'-o',str(BASE/'anteprima.png')],check=True,env=env)
        subprocess.run(['rsvg-convert','-f','pdf',str(svg),'-o',str(tmp/'mappa.pdf')],check=True,env=env)
        subprocess.run(['pdftocairo','-svg',str(tmp/'mappa.pdf'),str(BASE/'mappa-wcag-2.2.svg')],check=True)
        print('Esportati SVG con caratteri in tracciati e anteprima PNG.')
