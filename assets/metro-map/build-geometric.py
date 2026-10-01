"""Rebuild the metro map using constant-offset circular fillets.

Construction SVG: 18px bands, 22px center pitch (4px clear gap).
Figma Outline Stroke converts these centerlines to solid editable shapes.
"""
import math,json
from pathlib import Path
W,H=1741,903
colors={'indigo':'#432DD7','violet':'#615FFF','orange':'#FF6900','yellow':'#F0B100','pink':'#F6339A','teal':'#00BBA7','red':'#FF233C','blue':'#C8D9EF'}
paths=[]
lanes=[]
dot_data=[]
def offset(points,d):
 seg=[]
 for a,b in zip(points,points[1:]):
  dx,dy=b[0]-a[0],b[1]-a[1];l=math.hypot(dx,dy);u=(dx/l,dy/l);n=(-u[1],u[0]);seg.append(((a[0]+d*n[0],a[1]+d*n[1]),u,n))
 out=[seg[0][0]]
 for i in range(1,len(seg)):
  p,u,_=seg[i-1];q,v,_=seg[i];cross=u[0]*v[1]-u[1]*v[0];t=((q[0]-p[0])*v[1]-(q[1]-p[1])*v[0])/cross;out.append((p[0]+t*u[0],p[1]+t*u[1]))
 a=points[-1];n=seg[-1][2];out.append((a[0]+d*n[0],a[1]+d*n[1]));return out
f=lambda x: f'{x:.4f}'.rstrip('0').rstrip('.')
def rounded(points,radius=40,d=0):
 base=points;points=offset(base,d) if d else points
 cmd=[f'M{f(points[0][0])} {f(points[0][1])}']
 for i in range(1,len(points)-1):
  a,b,c=points[i-1:i+2];ux,uy=b[0]-a[0],b[1]-a[1];vx,vy=c[0]-b[0],c[1]-b[1];ul=math.hypot(ux,uy);vl=math.hypot(vx,vy);ux/=ul;uy/=ul;vx/=vl;vy/=vl
  cross=ux*vy-uy*vx;theta=math.acos(max(-1,min(1,ux*vx+uy*vy)));r=radius-d*(1 if cross>0 else -1);trim=r*math.tan(theta/2)
  p=(b[0]-ux*trim,b[1]-uy*trim);q=(b[0]+vx*trim,b[1]+vy*trim)
  cmd.extend([f'L{f(p[0])} {f(p[1])}',f'A{f(r)} {f(r)} 0 0 {1 if cross>0 else 0} {f(q[0])} {f(q[1])}'])
 cmd.append(f'L{f(points[-1][0])} {f(points[-1][1])}');return ' '.join(cmd)
def filled_band(pts,r,d,width):
 h=width/2
 forward=rounded(pts,r,d-h)
 backward=rounded(list(reversed(pts)),r,-d-h)
 end=offset(pts,d+h)[-1]
 start=offset(pts,d-h)[0]
 return forward+f' A{f(h)} {f(h)} 0 0 1 {f(end[0])} {f(end[1])} '+backward.split(' ',2)[2]+f' A{f(h)} {f(h)} 0 0 1 {f(start[0])} {f(start[1])} Z'

timing={
 'indaco-verticale':(4.8,0),'turchese-verticale':(5.4,.7),
 'rosso-discesa':(5.2,1.1),'rosso-raccordo':(6.4,1.5),
 'arancio-discesa':(5.7,.35),'indaco-orizzontale':(5.6,2.4),
 'arancio-traversa':(6,2),'arancio-diagonale':(5.9,2.8),
 'giallo-traversa':(6.2,1.9),'giallo-raccordo':(4.8,3.4),
 'giallo-destra':(4.6,4.1),'turchese-alto':(6,3.1),
 'rosa-traversa':(6.3,3.7),'viola-raccordo':(2.7,5)}
def route(name,family,pts,n=1,width=18,r=40,offset_d=0):
 for i in range(n):
  d=(i-(n-1)/2)*22+offset_d
  duration,delay=timing.get(name,(0,0))
  lanes.append(dict(id=f'{name}-{i+1}',family=family,d=rounded(pts,r,d),fillD=filled_band(pts,r,d,width),color=colors[family],width=width,duration=f'{duration}s',delay=f'{delay}s'))
  paths.append(f'<path id="{name}-{i+1}" d="{rounded(pts,r,d)}" fill="none" stroke="{colors[family]}" stroke-width="{width}" stroke-linecap="round"/>')
# Soft background fields are solid fills, with no outline.
route('campo-azzurro-alto','blue',[(660,-90),(865,115),(1540,115),(1710,-55)],width=72,r=56)
route('campo-azzurro-verticale','blue',[(1090,115),(1090,860),(1160,930)],width=72,r=56)
paths.append('<rect id="campo-giallo" x="340" y="215" width="405" height="370" rx="22" fill="#F5F3D7"/>')
route('rosso-discesa','red',[(195,-70),(195,485),(444,734),(444,960)],2)
route('rosso-raccordo','red',[(580,-70),(580,287),(195,287),(195,485)],2)
route('giallo-traversa','yellow',[(510,960),(510,550),(1410,550),(1410,155)],3,r=56)
route('giallo-raccordo','yellow',[(554,960),(554,465),(990,465),(990,402)],r=40)
route('giallo-destra','yellow',[(1320,530),(1490,530),(1490,366),(1795,366)],r=40)
route('arancio-discesa','orange',[(325,-70),(325,625),(620,625),(620,960)],2)
route('arancio-traversa','orange',[(653,960),(653,485),(1520,485),(1617,388),(1795,388)],r=40)
route('arancio-diagonale','orange',[(697,960),(697,670),(1395,670),(1655,410),(1795,410)],r=40,offset_d=-22)
route('indaco-orizzontale','indigo',[(307,960),(307,670),(1395,670),(1655,410),(1795,410)],r=40)
route('rosa-traversa','pink',[(118,960),(118,780),(1290,780),(1290,590),(1640,590),(1790,440)],2)
route('indaco-verticale','indigo',[(275,-70),(275,960)],2)
route('turchese-verticale','teal',[(858,-70),(858,960)],3)
route('turchese-alto','teal',[(902,305),(902,23),(1380,23),(1450,-47)],r=44)
route('viola-raccordo','violet',[(1228,960),(1228,702),(1290,702)],r=24)
# Explicit filled circles preserve the dotted route during Figma import/outline.
pts=[(212,230),(212,162),(252,122),(1210,122),(1210,220),(1795,220)]
segments=[]; cursor=pts[0]
def line_to(to):
 global cursor
 length=math.dist(cursor,to)
 segments.append(('line',cursor,to,length));cursor=to
for i in range(1,len(pts)-1):
 a,b,c=pts[i-1:i+2]; ux,uy=b[0]-a[0],b[1]-a[1];vx,vy=c[0]-b[0],c[1]-b[1]
 ul=math.hypot(ux,uy);vl=math.hypot(vx,vy);ux/=ul;uy/=ul;vx/=vl;vy/=vl
 sign=1 if ux*vy-uy*vx>0 else -1;angle=math.acos(max(-1,min(1,ux*vx+uy*vy)));r=14;trim=r*math.tan(angle/2)
 p0=(b[0]-ux*trim,b[1]-uy*trim);q=(b[0]+vx*trim,b[1]+vy*trim);center=(p0[0]-uy*r*sign,p0[1]+ux*r*sign)
 line_to(p0);segments.append(('arc',center,(r,math.atan2(p0[1]-center[1],p0[0]-center[0]),sign),r*angle));cursor=q
line_to(pts[-1]);dots=[]
for distance in range(0,int(sum(s[3] for s in segments))+1,12):
 remaining=distance
 for kind,a,b,length in segments:
  if remaining>length:remaining-=length;continue
  if kind=='line':x=a[0]+(b[0]-a[0])*remaining/length;y=a[1]+(b[1]-a[1])*remaining/length
  else:
   r,angle,sign=b;angle+=sign*remaining/r;x=a[0]+r*math.cos(angle);y=a[1]+r*math.sin(angle)
  dot_data.append(dict(id=f'punto-{len(dots)+1}',cx=round(x,4),cy=round(y,4),delay=f'{4.8+len(dots)*5.5/146:.4f}s'))
  dots.append(f'<circle id="punto-{len(dots)+1}" cx="{f(x)}" cy="{f(y)}" r="3.5" fill="#F0B100"/>');break
paths.append('<g id="giallo-punteggiato">'+''.join(dots)+'</g>')
svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#FFFFFF"/>'+''.join(paths)+'</svg>'
p=Path('assets/metro-map/manuale-metro-geometric.svg');p.write_text(svg)
Path('/tmp/metro-svg.json').write_text(json.dumps(svg))
filled_svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#FFFFFF"/>'
for lane in lanes:
 filled_svg+=f'<path id="{lane["id"]}" d="{lane["fillD"]}" fill="{lane["color"]}"/>'
 if lane['id']=='campo-azzurro-verticale-1':filled_svg+='<rect x="340" y="215" width="405" height="370" rx="22" fill="#F5F3D7"/>'
filled_svg+='<g id="giallo-punteggiato">'+''.join(dots)+'</g></svg>'
Path('assets/metro-map/manuale-metro-geometric-filled.svg').write_text(filled_svg)
Path('assets/metro-map/geometric-animation.json').write_text(json.dumps(dict(lanes=lanes,dots=dot_data),indent=2)+'\n')
print(f'Generated {len(lanes)} filled lanes and {len(dots)} separate circles.')
