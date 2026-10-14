"""Outline the local OFL Nunito Sans font and build the authored WF/sun mark.
Requires fontTools; Node's bundled Brotli decoder is used if Python Brotli is absent.
Logo artwork is authored here; the acquired brand remains preserved separately.
"""
from pathlib import Path
import json, hashlib, sys, types, subprocess, re, math
try:
    import brotli
except ImportError:
    def decompress(data):
        js='const z=require("node:zlib");const b=[];process.stdin.on("data",c=>b.push(c));process.stdin.on("end",()=>process.stdout.write(z.brotliDecompressSync(Buffer.concat(b))));'
        return subprocess.run(['node','-e',js],input=data,stdout=subprocess.PIPE,check=True).stdout
    sys.modules['brotli']=types.SimpleNamespace(decompress=decompress)
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

lab=Path(__file__).resolve().parent.parent
out=lab/'assets/brand/the-weather-forecast'
out.mkdir(parents=True,exist_ok=True)
font=instantiateVariableFont(TTFont(lab/'assets/fonts/nunito-sans.woff2'),{'wght':900},inplace=False)
glyphs=font.getGlyphSet();cmap=font.getBestCmap();scale=100/font['head'].unitsPerEm

def word(text,x,y):
    pen=SVGPathPen(glyphs)
    for char in text:
        name=cmap[ord(char)]
        glyphs[name].draw(TransformPen(pen,(scale,0,0,-scale,x,y)))
        x+=font['hmtx'][name][0]*scale-1.3
    return re.sub(r"-?\d+\.\d+",lambda m:format(round(float(m[0]),2),"g"),pen.getCommands()),x

def capsule(start,end,radius=15):
    """Filled, round-ended letter stroke; consistent winding joins without seams."""
    x1,y1=start;x2,y2=end
    length=math.hypot(x2-x1,y2-y1)
    nx=-(y2-y1)*radius/length;ny=(x2-x1)*radius/length
    return (f'M{x1+nx:.2f} {y1+ny:.2f}L{x2+nx:.2f} {y2+ny:.2f}'
            f'A{radius} {radius} 0 0 0 {x2-nx:.2f} {y2-ny:.2f}'
            f'L{x1-nx:.2f} {y1-ny:.2f}A{radius} {radius} 0 0 0 {x1+nx:.2f} {y1+ny:.2f}Z')

# Softer lettering follows the rounded terminals of the previous mark.
# The geometry remains independent from the acquired brand artwork.
w_points=[(35,104),(58,204),(94,146),(130,204),(153,104)]
wf=' '.join(capsule(a,b) for a,b in zip(w_points,w_points[1:]))
wf+=' '+capsule((194,104),(194,204))
wf+=' '+capsule((194,104),(234,104))
wf+=' '+capsule((194,154),(225,154))
sun='<circle cx="207" cy="46" r="27" fill="#f28c18"/>'
first,end=word('The weather',288,116)
second,_=word('forecast',288,216)
width=round(end+24)
for variant,ink in [('color','#092b60'),('light','#fff')]:
    symbol=f'<g id="symbol"><path fill="{ink}" d="{wf}"/>{sun}</g>'
    for name,canvas,body in [('mark',(256,256),symbol),('wordmark',(width,256),symbol+f'<g id="wordmark" fill="{ink}"><path d="{first}"/><path d="{second}"/></g>')]:
        w,h=canvas
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-labelledby="brand-title"><title id="brand-title">The weather forecast</title>{body}</svg>\n'
        (out/f'{name}-{variant}.svg').write_text(svg)
subprocess.run(["rsvg-convert","-w","180","-h","180","-o",str(out/"apple-touch-icon.png"),str(out/"mark-color.svg")],check=True)
files=[]
for file in sorted([*out.glob('*.svg'),out/'apple-touch-icon.png']):
    files.append({'file':file.name,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
(out/'manifest.json').write_text(json.dumps({'name':'The weather forecast','design':'Authored WF letterforms with soft joins and rounded terminals, following the previous lettering style; an orange sun above F and the inherited navy/orange palette.','generator':'../../../scripts/build-weather-brand.py','palette':{'navy':'#092b60','orange':'#f28c18','paper':'#fff'},'wordmark':{'font':'Nunito Sans','weight':900,'format':'Outlined paths, no live text','source':'../../fonts/nunito-sans.woff2','license':'../../fonts/OFL-NunitoSans.txt'},'assets':files},indent=2)+'\n')
print(f'Weather brand: WF mark and outlined wordmark built; lockup {width}×256.')
