// Rebuilds only the image inside Figura 01. The wrapper, caption and page layout are preserved.
const page = await figma.getNodeByIdAsync('2002:1740');
await figma.setCurrentPageAsync(page);
const root = await figma.getNodeByIdAsync('2107:241');
if (!root || root.type !== 'FRAME') throw new Error('Expected the existing UX/UI image frame');
if (root.children.length) throw new Error('Figure already has native content; inspect before rebuilding');
await Promise.all([
  { family: 'Inter', style: 'Regular' },
  { family: 'Geom', style: 'Regular' },
  { family: 'Geom', style: 'Medium' },
  { family: 'Geom', style: 'SemiBold' },
  { family: 'Geom', style: 'Bold' },
  { family: 'Merriweather', style: 'Light' },
].map(f => figma.loadFontAsync(f)));
const created = [];
const green = { r: 0, g: 120 / 255, b: 111 / 255 };
const ink = { r: 3 / 255, g: 7 / 255, b: 18 / 255 };
const pale = { r: 195 / 255, g: 221 / 255, b: 219 / 255 };
const paint = color => [{ type: 'SOLID', color }];
const frame = (parent, name, direction, width, height, gap = 0) => {
  const n = figma.createAutoLayout(direction);
  created.push(n.id);
  n.name = name;
  n.fills = [];
  n.strokes = [];
  n.clipsContent = false;
  parent.appendChild(n);
  n.resize(width, height);
  n.layoutSizingHorizontal = 'FIXED';
  n.layoutSizingVertical = 'FIXED';
  n.itemSpacing = gap;
  n.primaryAxisAlignItems = 'MIN';
  n.counterAxisAlignItems = 'MIN';
  return n;
};
const text = (parent, name, content, width, size, lineHeight, font, color = ink, align = 'LEFT', tracking = 0) => {
  const n = figma.createText();
  created.push(n.id);
  parent.appendChild(n);
  n.fontName = font;
  n.fontSize = size;
  n.lineHeight = { unit: 'PIXELS', value: lineHeight };
  n.letterSpacing = { unit: 'PIXELS', value: tracking };
  n.fills = paint(color);
  n.textAlignHorizontal = align;
  n.textAutoResize = 'HEIGHT';
  n.resize(width, lineHeight);
  n.characters = content;
  n.name = name;
  n.layoutSizingHorizontal = 'FIXED';
  n.layoutSizingVertical = 'HUG';
  return n;
};
const rect = (parent, name, width, height, color) => {
  const n = figma.createRectangle();
  created.push(n.id);
  n.name = name;
  n.fills = paint(color);
  n.strokes = [];
  parent.appendChild(n);
  n.resize(width, height);
  return n;
};
const svgNode = (parent, name, svg) => {
  const n = figma.createNodeFromSvg(svg);
  parent.appendChild(n);
  n.name = name;
  n.x = 0; n.y = 0;
  created.push(n.id, ...n.query('*').map(c => c.id));
  return n;
};
const glyphs = {
  person: '<circle cx="12" cy="8" r="2.8"/><path d="M6.5 18v-1.3a5.5 5.5 0 0 1 11 0V18Z"/>',
  wireframe: '<rect x="9" y="5.5" width="6" height="4" rx=".3"/><path d="M12 9.5v3M6 14v-1.5h12V14"/><rect x="4" y="14" width="4" height="4" rx=".3"/><rect x="10" y="14" width="4" height="4" rx=".3"/><rect x="16" y="14" width="4" height="4" rx=".3"/>',
  information: '<circle cx="12" cy="7" r=".7" fill="#00786f" stroke="none"/><path d="M10.5 10.5H12v7.2M10 17.7h4"/>',
  research: '<circle cx="10.5" cy="10.5" r="5"/><path d="m14 14 4.8 4.8M7.8 12.8a2.7 2.7 0 0 1 5.4 0"/><circle cx="10.5" cy="9" r="1.4"/>',
  document: '<path d="M7 5.5h10v13H7Z M9.5 9h5M9.5 12h5M9.5 15h3.5"/>',
  eye: '<path d="M5 12s3.1-5 7-5 7 5 7 5-3.1 5-7 5-7-5-7-5Z"/><circle cx="12" cy="12" r="2.5"/>',
  palette: '<path d="M18.5 12.2a6.5 6.5 0 1 0-6.5 6.3h1.1a1.4 1.4 0 0 0 1.1-2.3 1.5 1.5 0 0 1 1.2-2.5h1.2a1.9 1.9 0 0 0 1.9-1.5Z"/><circle cx="8.5" cy="9.5" r=".7" fill="#00786f"/><circle cx="12" cy="7.8" r=".7" fill="#00786f"/><circle cx="15.5" cy="9.8" r=".7" fill="#00786f"/><circle cx="8.6" cy="13.8" r=".7" fill="#00786f"/>',
  pen: '<path d="M12 5.7 7.7 14l2.5 3h3.6l2.5-3L12 5.7ZM12 5.7v6M10 18.4h4M6.5 5.7h11"/><circle cx="12" cy="13" r="1"/>',
  layout: '<rect x="5.5" y="5.5" width="13" height="13" rx=".3"/><path d="M8 8h3v8H8ZM13.5 8H16M13.5 11H16M13.5 14H16M13.5 16H16"/>',
  typography: '<path d="M6 7h8M10 7v10M7.5 17h5M15.5 10v5.7a1.3 1.3 0 0 0 1.3 1.3h.7M13.5 12h4"/>',
};
const iconSvg = key => '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11.1" stroke="#00786f" stroke-width=".8"/><g stroke="#00786f" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">' + glyphs[key] + '</g></svg>';
const uxGraphic = '<svg width="161.25" height="42" viewBox="0 0 161.25 42" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="80.625" cy="23" rx="34" ry="18" fill="#eef7f6"/><path d="M49 37H66c22 0 28-8 9-14S75 13 88 11s14-5 13-8" stroke="#00786f" stroke-width="1.1" stroke-linecap="round"/><g fill="#fff" stroke="#00786f" stroke-width="1.1"><circle cx="53" cy="37" r="2.4"/><circle cx="89" cy="29" r="2.4"/><circle cx="78" cy="14" r="2.4"/></g><path d="M101 3v13M101 3h10l-2.5 4 2.5 4h-10" stroke="#00786f" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="#c3dddb"/></svg>';
const uiGraphic = '<svg width="161.25" height="42" viewBox="0 0 161.25 42" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="47.125" y="1" width="67" height="40" rx="2" fill="#fff" stroke="#00786f" stroke-width="1.1"/><path d="M47.125 9h67" stroke="#00786f" stroke-width="1.1"/><g fill="#00786f"><circle cx="52.125" cy="5" r="1"/><circle cx="56.125" cy="5" r="1"/><circle cx="60.125" cy="5" r="1"/></g><rect x="53.125" y="14" width="23" height="16" rx="1" fill="#eef7f6" stroke="#00786f" stroke-width="1.1"/><path d="m54.125 28 6-6 4 4 5-7 6 9" stroke="#00786f" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/><circle cx="59.125" cy="18.5" r="1.7" fill="#00786f"/><path d="M83.125 15h25M83.125 20h20M83.125 25h25" stroke="#00786f" stroke-width="1.1" stroke-linecap="round"/><rect x="83.125" y="30" width="25" height="5" rx="1" fill="#00786f"/><path d="M53.125 35h23" stroke="#00786f" stroke-width="1.1" stroke-linecap="round"/></svg>';
root.name = 'Immagine · UX e UI · vettoriale';
root.layoutMode = 'VERTICAL';
root.fills = paint({r:1,g:1,b:1});
root.strokes = [];
root.resize(363,316);
root.layoutSizingHorizontal = 'FIXED';
root.layoutSizingVertical = 'FIXED';
root.paddingTop = 12; root.paddingBottom = 14;
root.paddingLeft = 12; root.paddingRight = 12;
root.itemSpacing = 6;
root.primaryAxisAlignItems = 'MIN';
root.counterAxisAlignItems = 'CENTER';
root.clipsContent = false;
const header = frame(root, 'Titolo della figura', 'VERTICAL', 339, 16, 4);
header.counterAxisAlignItems = 'CENTER';
text(header, 'Esperienza e interfaccia', 'ESPERIENZA E INTERFACCIA', 339, 8, 11, {family:'Geom',style:'Medium'}, ink, 'CENTER', 1.5);
rect(header, 'Accento titolo', 24, 1, green);
const body = frame(root, 'Confronto UX e UI', 'HORIZONTAL', 339, 268);
const entries = [
  [
    ['person','Interaction design','Interazioni e flussi\nsignificativi'],
    ['wireframe','Wireframe e prototipi','Strutturare e\nverificare le idee'],
    ['information','Architettura dell’informazione','Organizzare\ncontenuti e percorsi'],
    ['research','Ricerca sugli utenti','Comprendere\nbisogni e abitudini'],
    ['document','Scenari d’uso','Mappare percorsi\ne casi d’uso'],
  ],
  [
    ['eye','Design visivo','Aspetto e percezione\ndel prodotto'],
    ['palette','Colori','Abbinamenti\ne contrasti'],
    ['pen','Elementi grafici','Segni, icone\ne immagini'],
    ['layout','Layout','Chiarezza e\ncoerenza visiva'],
    ['typography','Tipografia','Caratteri, tono\ne gerarchia'],
  ],
];
const columns = [];
for (let i=0; i<2; i++) {
  if (i===1) {
    const separator=frame(body,'Separatore UX / UI','VERTICAL',16.5,268,14);
    separator.paddingTop=10;
    separator.counterAxisAlignItems='CENTER';
    text(separator,'Congiunzione','&',16.5,16,24,{family:'Geom',style:'Regular'},ink,'CENTER');
    rect(separator,'Asse centrale',.5,220,pale);
  }
  const short=i===0?'UX':'UI';
  const col=frame(body,'Ambiti · '+short,'VERTICAL',161.25,268,5);
  columns.push(col);
  const intro=frame(col,'Intestazione · '+short,'VERTICAL',161.25,74,2);
  text(intro,short,short,161.25,36,39,{family:'Geom',style:'Bold'},green,'CENTER');
  text(intro,'Significato · '+short,i===0?'ESPERIENZA UTENTE':'INTERFACCIA UTENTE',161.25,7.2,9,{family:'Geom',style:'SemiBold'},green,'CENTER',.3);
  text(intro,'Definizione · '+short,i===0?'Progettare esperienze e risolvere\nproblemi delle persone.':'Dare forma visiva alle interfacce\ndei prodotti digitali.',161.25,7.6,11,{family:'Merriweather',style:'Light'},ink,'CENTER');
  svgNode(col,'Illustrazione · '+short,i===0?uxGraphic:uiGraphic);
  const list=frame(col,'Strumenti · '+short,'VERTICAL',161.25,142,2);
  list.paddingTop=4;
  for(const [key,title,desc] of entries[i]){
    const row=frame(list,'Ambito · '+title,'HORIZONTAL',161.25,26,5);
    row.counterAxisAlignItems='CENTER';
    svgNode(row,'Icona · '+title,iconSvg(key));
    const copy=frame(row,'Testi · '+title,'VERTICAL',134.25,26);
    text(copy,'Titolo · '+title,title,134.25,7.4,9,{family:'Geom',style:'SemiBold'},green);
    text(copy,'Descrizione · '+title,desc,134.25,6.7,8.5,{family:'Merriweather',style:'Light'},ink);
  }
}
const all=root.query('*').toArray();
const texts=all.filter(n=>n.type==='TEXT');
const rows=all.filter(n=>n.type==='FRAME'&&n.name.startsWith('Ambito · '));
const overflow=[];
for(const n of all){
  const p=n.parent;
  if(p && p.type==='FRAME' && p.layoutMode!=='NONE' && (n.x<-.01||n.y<-.01||n.x+n.width>p.width+.01||n.y+n.height>p.height+.01))overflow.push({id:n.id,name:n.name,parent:p.name,x:n.x,y:n.y,width:n.width,height:n.height,parentWidth:p.width,parentHeight:p.height});
}
const report={
  rootNodeId:root.id,
  createdNodeIds:created,
  mutatedNodeIds:[root.id],
  size:{width:root.width,height:root.height},
  nativeTextCount:texts.length,
  imagePaintCount:[root,...all].filter(n=>'fills' in n&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).length,
  columns:columns.map(n=>({id:n.id,x:n.x,y:n.y,width:n.width,height:n.height})),
  rows:rows.map(n=>({id:n.id,width:n.width,height:n.height,y:n.y})),
  textMetrics:texts.map(n=>({id:n.id,name:n.name,characters:n.characters,width:n.width,height:n.height,fontSize:n.fontSize,fontName:n.fontName,lineHeight:n.lineHeight})),
  overflow
};
await root.screenshot({scale:4});
return report;
