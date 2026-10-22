#!/usr/bin/env python3
"""Rigenera diagrammi, catalogo di sintesi e quattro registrazioni canoniche.

Solo libreria standard: tutti i testi e le forme restano elementi SVG nativi.
Le misure numeriche sono esempi costruiti, non dati rilevati nei materiali.
Con --check verifica gli stessi contenuti senza scrivere alcun file.
"""
from __future__ import annotations

import argparse
from html import escape
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[5]
HERE = Path(__file__).resolve().parent
CATALOGUE = ROOT / 'risorse-condivise/dati/figure/griglia/integrazioni-materiali.json'
MANIFEST = ROOT / 'risorse-condivise/immagini/figure/griglia/manifest.json'
TEXTS = ROOT / 'risorse-condivise/dati/figure/griglia/figure.json'
INK = '#2E3138'
ACCENT = '#A3B3FF'
PALE = '#EEF0FF'
GRAY = '#E9ECEE'
WHITE = '#FFFFFF'
WIDTH = 389


def text(x, y, value, size=10, weight=400, anchor='start'):
    assert size >= 9
    return f'<text x="{x:g}" y="{y:g}" font-size="{size:g}" font-weight="{weight}" text-anchor="{anchor}">{escape(value)}</text>'


def rect(x, y, w, h, fill=PALE, stroke=None):
    attrs = f' stroke="{stroke}" stroke-width="0.8"' if stroke else ''
    return f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" fill="{fill}"{attrs}/>'


def line(x1, y1, x2, y2, width=0.8, color=INK, dashed=False):
    dash = ' stroke-dasharray="3 3"' if dashed else ''
    return f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" stroke="{color}" stroke-width="{width:g}"{dash}/>'


def dimension(x1, x2, y, label, below=False):
    return '\n'.join([
        line(x1, y, x2, y), line(x1, y-3, x1, y+3), line(x2, y-3, x2, y+3),
        text((x1+x2)/2, y+14 if below else y-7, label, 9, anchor='middle')])


def svg(height, title, content, defs=''):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{height}" viewBox="0 0 {WIDTH} {height}" fill="none">
<title>{escape(title)}</title>
{defs}
<g fill="{INK}" font-family="DM Sans 9pt">
{content}
</g>
</svg>
'''


def spaces():
    # Il bordo esterno è il limite del contenitore: fa parte del concetto.
    out = [text(12,17,'Tre distanze, tre relazioni',12,600), rect(12,45,365,125,WHITE,INK)]
    out += [rect(42,65,140,85,PALE),rect(206,65,141,85,PALE)]
    for x in (58,222):
        out += [text(x,91,'Scheda',11,600),line(x,106,x+96,106,2),line(x,115,x+78,115,2)]
    out += [dimension(12,42,36,'margine'),dimension(182,206,36,'gutter'),dimension(42,58,142,'',below=True)]
    out += [line(50,142,50,183),text(50,198,'padding',10,500,anchor='middle'),text(193,198,'gutter: fra le schede',10,500,anchor='middle')]
    out += [text(12,223,'Margine: fuori dal campo. Padding: dentro ogni scheda.',10)]
    return svg(238,'Margine, gutter e padding', '\n'.join(out))


def container():
    out = [text(12,17,'Contenitore fluido, massimo di 960 px CSS',12,600)]
    # Le due finestre sono disegnate nella stessa scala, 0,28 pt per CSS px.
    scale = 0.28
    for y,viewport,content in ((54,720,672),(139,1280,960)):
        width=viewport*scale; x=(WIDTH-width)/2
        inset=(viewport-content)/2*scale
        out += [text(12,y-12,f'Viewport {viewport} px',10,500),rect(x,y,width,35,GRAY),rect(x+inset,y,content*scale,35,ACCENT)]
        out += [text(WIDTH/2,y+22,f'{content} px',11,600,anchor='middle')]
        out += [dimension(x,x+inset,y+47,f'{int((viewport-content)/2)}',below=True),dimension(x+width-inset,x+width,y+47,f'{int((viewport-content)/2)}',below=True)]
    out += [text(12,226,'Minimo 24 px per lato; oltre il massimo crescono i margini.',10)]
    return svg(241,'Contenitore fluido con una larghezza massima', '\n'.join(out))


def twelve():
    x0=12; available=365; gap=5; unit=(available-11*gap)/12
    out=[text(12,17,'Dodici tracce, più modi di occupare lo spazio',12,600)]
    # Primo reticolo: le tracce e gli undici intervalli sono distinti.
    for i in range(12):
        x=x0+i*(unit+gap)
        out += [rect(x,44,unit,27,PALE),text(x+unit/2,62,str(i+1),9,anchor='middle')]
        if i<11: out += [line(x+unit+gap/2,40,x+unit+gap/2,75,0.7,INK,True)]
    out += [text(12,89,'12 tracce e 11 intervalli interni',10)]
    for y,span in ((107,6),(151,4),(195,3)):
        count=12//span; w=span*unit+(span-1)*gap
        for i in range(count):
            x=x0+i*(w+gap)
            out += [rect(x,y,w,28,ACCENT),text(x+w/2,y+18,f'{span} tracce',10,500,anchor='middle')]
    out += [text(12,247,'Gli elementi sono 2, 3 o 4; la griglia resta di 12 tracce.',10)]
    return svg(260,'Dodici colonne e occupazione delle tracce', '\n'.join(out))


def images():
    # Paesaggio schematico 320 × 180: il soggetto è sul lato destro.
    landscape = '\n'.join([
        rect(0,0,320,180,'#EEF0FF'),
        '<path d="M0 117L61 65L131 124L196 75L270 129L320 102V180H0Z" fill="#A3B3FF"/>',
        rect(0,144,320,36,'#DCE2E6'),
        '<circle cx="48" cy="35" r="14" fill="#FFFFFF"/>',
        rect(277,102,7,48,INK),
        '<path d="M280 60L257 112H303Z" fill="#2E3138"/>',
    ])
    defs=f'<defs><g id="paesaggio">{landscape}</g>'+''.join(f'<clipPath id="campo-{i}"><rect x="{x}" y="126" width="107" height="116"/></clipPath>' for i,x in enumerate((12,141,270)))+'</defs>'
    out=[text(12,16,'Immagine completa',10,500), '<use href="#paesaggio" transform="translate(12 25) scale(0.35)"/>',text(146,44,'Il soggetto è sul lato destro.',10),text(146,61,'Cambia il ritaglio, non il campo.',10)]
    labels=('contain','cover: centro','cover: punto focale')
    for i,x in enumerate((12,141,270)):
        out += [text(x,116,labels[i],10,500),rect(x,126,107,116,GRAY)]
        scale=min(107/320,116/180) if i==0 else max(107/320,116/180)
        dx=(107-320*scale)/2 if i!=2 else 107-320*scale
        dy=(116-180*scale)/2
        out += [f'<g clip-path="url(#campo-{i})"><use href="#paesaggio" transform="translate({x+dx:g} {126+dy:g}) scale({scale:g})"/></g>']
    return svg(254,'Ritagli della stessa immagine: contain e cover', '\n'.join(out),defs)


SOURCE_PATHS = {
    'dossi': 'materiali/approfondimenti/2023-2024/dossi-gloria-899821.pdf',
    'sraidi': 'materiali/approfondimenti/2024-2025/approfondimento-sraidi-chaimaa.pdf',
    'celentano': 'materiali/approfondimenti/2020-2021/materiali-collegati-2cfu/stefano-celentano-2-cfu.pdf',
    'radavelli': 'materiali/approfondimenti/2022-2023/materiali-collegati-2cfu/radavelli-marta-873872-un-viaggio-nel-graphic-design.pdf',
}

FIGURES = [
    ('materiali-spazi','01-margine-gutter-padding.svg',238,spaces,
     'Margine, gutter e padding separano relazioni diverse: bordo e campo, schede adiacenti, contenuto e limite della scheda.',
     'Un contenitore contiene due schede. Il margine esterno è distinto dal gutter fra le schede e dal padding dentro ciascuna scheda.',
     [('dossi',[8]),('sraidi',[6,7,8]),('radavelli',[9,10])]),
    ('materiali-contenitore','02-contenitore-fluido-massimo.svg',241,container,
     'Con un minimo di 24 px CSS per lato e un massimo di 960 px, il contenitore misura 672 px in un viewport di 720 e 960 px in uno di 1280. Nel secondo caso i margini sono di 160 px.',
     'Due viewport alla stessa scala: quello da 720 px contiene un campo da 672 px con margini di 24; quello da 1280 contiene un campo da 960 con margini di 160.',
     [('dossi',[8]),('sraidi',[6,7,8])]),
    ('materiali-dodici','03-dodici-tracce-occupazioni.svg',260,twelve,
     'La stessa griglia di dodici tracce può ospitare due elementi da sei, tre da quattro o quattro da tre. Ogni elemento comprende gli intervalli interni alla propria occupazione.',
     'Dodici tracce uguali separate da undici intervalli. Tre righe mostrano due elementi da sei tracce, tre da quattro e quattro da tre.',
     [('dossi',[7,8]),('sraidi',[6,7,8])]),
    ('materiali-immagini','04-immagine-contain-cover-focale.svg',254,images,
     'La stessa immagine in tre campi uguali. Contain conserva tutta la scena con bande; cover riempie il campo. Il ritaglio centrato esclude il soggetto a destra, quello orientato sul soggetto lo conserva.',
     'Un paesaggio con un albero sul lato destro. Il primo campo contiene tutta la scena con bande. Il secondo la ritaglia al centro ed esclude l’albero. Il terzo mantiene l’albero con un ritaglio verso destra.',
     [('celentano',[8])]),
]


def build_outputs():
    """Calcola tutti gli output attesi, anche per il controllo in sola lettura."""
    outputs={}
    entries=[]
    for code,name,height,build,caption,alt,sources in FIGURES:
        file=HERE/name
        raw=build().encode('utf-8')
        outputs[file]=raw
        entries.append({
            'codice':code,
            'asset':{
                'id':'griglia-'+code,'codice':code,
                'percorso':str(file.relative_to(ROOT)),
                'sha256':hashlib.sha256(raw).hexdigest(),'byte':len(raw),
                'formato':'SVG','dimensioni_px':[389,height],
                'dimensioni_pt':[389,height],
                'tipo':'diagramma',
                'provenienza':{
                    'metodo':'Sintesi editoriale originale in SVG nativo; non esportazione Figma.',
                    'generatore':str(Path(__file__).resolve().relative_to(ROOT)),
                    'data':'2026-10-22',
                    'materiali_di_partenza':[{'file':SOURCE_PATHS[source],'pagine_pdf':pages} for source,pages in sources],
                    'misure':'I valori numerici e i paesaggi schematici sono esempi costruiti per il confronto, non dati rilevati nei PDF.',
                },
                'attribuzione':{'nota':'Diagrammi di sintesi editoriale; autori del volume nei crediti.'},
                'diritti':{'licenza':None,'nota':'Nessuna immagine esterna o nuova licenza assegnata.'},
            },
            'testi':{'didascalia':caption,'alt':alt,'diritti':None},
        })
    catalogue={'versione':1,'descrizione':'Quattro diagrammi di sintesi editoriale a partire dalla ricognizione locale dei materiali sulla griglia. Le fonti tecniche primarie sono nella bibliografia del capitolo.','figure':entries}
    return outputs,catalogue


def read_json(file):
    return json.loads(file.read_text(encoding='utf-8'))


def write_json(file,data):
    file.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check',action='store_true',help='Controlla SVG e cataloghi senza modificarli.')
    args=parser.parse_args(argv)
    try:
        if not (ROOT/'PRODUCT.md').is_file():
            raise ValueError('Radice del progetto non riconosciuta.')
        outputs,catalogue=build_outputs()
        entries={entry['codice']:entry for entry in catalogue['figure']}
        if len(entries)!=4:
            raise ValueError('I diagrammi devono avere quattro codici distinti.')
        manifest=read_json(MANIFEST)
        texts=read_json(TEXTS)
        if not isinstance(manifest.get('immagini'),list) or not isinstance(texts,dict):
            raise ValueError('Formato dei cataloghi canonici non riconosciuto.')
        matches={code:[asset for asset in manifest['immagini'] if asset.get('codice')==code]
                 for code in entries}
        if any(len(assets)>1 for assets in matches.values()):
            raise ValueError('Il manifest contiene codici duplicati per questi diagrammi.')
        if args.check:
            for file,raw in outputs.items():
                if not file.is_file() or file.read_bytes()!=raw:
                    raise ValueError(f'SVG mancante o da rigenerare: {file.relative_to(ROOT)}')
            if read_json(CATALOGUE)!=catalogue:
                raise ValueError('Catalogo delle integrazioni da rigenerare.')
            for code,entry in entries.items():
                if matches[code]!=[entry['asset']]:
                    raise ValueError(f'Registrazione asset da aggiornare: {code}')
                if texts.get(code)!=entry['testi']:
                    raise ValueError(f'Registrazione dei testi da aggiornare: {code}')
            print('Verifica completata: quattro SVG e registrazioni coerenti; nessun file modificato.')
            return 0
        # Aggiorna soltanto i quattro codici gestiti da questo generatore.
        # Ordine, metadati del manifest e documenti di altra provenienza restano intatti.
        manifest['immagini']=[entries[asset['codice']]['asset']
                             if asset.get('codice') in entries else asset
                             for asset in manifest['immagini']]
        for code,entry in entries.items():
            if not matches[code]:
                manifest['immagini'].append(entry['asset'])
            texts[code]=entry['testi']
        for file,raw in outputs.items():
            file.write_bytes(raw)
        write_json(CATALOGUE,catalogue)
        write_json(MANIFEST,manifest)
        write_json(TEXTS,texts)
        print('Rigenerati quattro SVG, catalogo di sintesi e quattro registrazioni canoniche.')
        return 0
    except (OSError,ValueError,KeyError,TypeError) as error:
        print(f'Errore: {error}',file=sys.stderr)
        return 1


if __name__=='__main__':
    raise SystemExit(main())
