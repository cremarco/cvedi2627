// Anteporre FIGURES_DATA da figure-native.json. Figure didattiche native, nessun nuovo artboard.
const page=await figma.getNodeByIdAsync('2613:1110');
await figma.setCurrentPageAsync(page);
const section=await figma.getNodeByIdAsync('2188:1088');
if(section.children.filter(n=>n.type==='FRAME').length!==36)throw new Error('Attese36tavole: rileggere il capitolo.');
const styles=Object.fromEntries((await figma.getLocalTextStylesAsync()).map(s=>[s.name,s]));
const fontMap=new Map();
for(const name of ['H3','Body_copy','Intro_capitolo','Didascalie'])fontMap.set(JSON.stringify(styles[name].fontName),styles[name].fontName);
const targets=[];
for(const f of FIGURES_DATA.figures){
 const b=await figma.getNodeByIdAsync(f.boardId),main=b.children.find(n=>n.name.startsWith('Contenuto ·'));
 if(main.children.some(n=>n.name==='Figura nativa · '+f.key))throw new Error('Figura già presente: '+f.key);
 for(const t of b.query('TEXT'))for(const seg of t.getStyledTextSegments(['fontName']))fontMap.set(JSON.stringify(seg.fontName),seg.fontName);
 targets.push({data:f,board:b,main,refs:b.children.find(n=>n.name.startsWith('Fonti verificate ·'))});
}
await Promise.all([...fontMap.values()].map(f=>figma.loadFontAsync(f)));
const tokens={};
for(const [role,id]of Object.entries({ink:'VariableID:2679:257',accent:'VariableID:2679:255',muted:'VariableID:2679:259',rule:'VariableID:2679:261'}))tokens[role]=await figma.variables.getVariableByIdAsync(id);
const basePaint=(await figma.getNodeByIdAsync('198:3491')).fills[0];
const paper=targets[0].board.fills;
const createdNodeIds=[],mutatedNodeIds=[],changedTexts=[],figures=[];
function mark(n){createdNodeIds.push(n.id);return n;}
function trackTree(n){mark(n);if('children'in n)for(const c of n.children)trackTree(c);}
function color(role){return figma.variables.setBoundVariableForPaint({...basePaint,color:{...basePaint.color}},'color',tokens[role]);}
function paint(n,role='ink'){n.fills=[color(role)];}
function stroke(n,role='ink'){n.strokes=[color(role)];n.strokeWeight=1;n.strokeAlign='INSIDE';}
function col(name,w,gap=4){const f=mark(figma.createAutoLayout('VERTICAL'));f.name=name;f.fills=[];f.resize(w,1);f.itemSpacing=gap;f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='FIXED';return f;}
function row(name,w,gap=16){const f=mark(figma.createAutoLayout('HORIZONTAL'));f.name=name;f.fills=[];f.resize(w,1);f.itemSpacing=gap;f.primaryAxisSizingMode='FIXED';f.counterAxisSizingMode='AUTO';return f;}
function scene(name,w,h,direction='HORIZONTAL'){const f=mark(figma.createAutoLayout(direction));f.name=name;f.fills=[];f.resize(w,h);f.primaryAxisSizingMode='FIXED';f.counterAxisSizingMode='FIXED';return f;}
async function text(value,w,{bold=false,size=9,role='ink',caption=false,align='LEFT'}={}){
 const style=caption?'Didascalie':bold?'H3':'Body_copy';
 const t=mark(figma.createText());t.fontName=styles[style].fontName;await t.setTextStyleIdAsync(styles[style].id);
 t.resize(w,1);t.textAutoResize='HEIGHT';t.fontSize=caption?7:size;t.lineHeight={unit:'PIXELS',value:12};t.characters=value;t.textAlignHorizontal=align;t.name='Figura · '+value.slice(0,55);paint(t,role);return t;
}
async function label(parent,value,w,opts={}){const t=await text(value,w,opts);parent.appendChild(t);return t;}
async function caption(parent,f){
 if(f.calloutId){const t=await figma.getNodeByIdAsync(f.calloutId),before=t.characters;parent.appendChild(t);await t.setTextStyleIdAsync(styles.Didascalie.id);t.fontSize=7;t.lineHeight={unit:'PIXELS',value:12};if(f.captionPrefix)t.characters=f.captionPrefix+before;t.name='Didascalia figura · '+f.key;paint(t,'muted');mutatedNodeIds.push(t.id);changedTexts.push({nodeId:t.id,before,after:t.characters,role:'figure-caption'});}
 else await label(parent,f.caption,363,{caption:true,role:'muted'});
}
async function button(parent,value,w,h=24,chevron=null){
 const b=scene('Controllo illustrativo · '+value,w,h);b.fills=paper;stroke(b);b.paddingLeft=6;b.paddingRight=6;b.itemSpacing=4;b.counterAxisAlignItems='CENTER';parent.appendChild(b);
 await label(b,value,w-12-(chevron?14:0),{bold:true});
 if(chevron){const path=chevron==='up'?'M1 6 L5 2 L9 6':'M1 2 L5 6 L9 2';const icon=figma.createNodeFromSvg('<svg width="10" height="8" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg"><path d="'+path+'" fill="none" stroke="black" stroke-width="1.5"/></svg>');trackTree(icon);icon.name='Chevron · '+chevron;for(const v of icon.query('VECTOR'))v.strokes=[color('ink')];b.appendChild(icon);}
 return b;
}
async function reflow(parent,f){
 const pair=row('Confronto · reflow',363);parent.appendChild(pair);
 for(const good of [false,true]){
  const c=col(good?'Si ridistribuisce':'Deborda',173.5,4);pair.appendChild(c);c.counterAxisAlignItems='CENTER';
  await label(c,good?'Si ridistribuisce':'Deborda',173.5,{bold:true,role:'accent',align:'CENTER'});
  const viewport=scene(good?'Viewport · contenuto ridistribuito':'INTENZIONALE · contenuto oltre il viewport',140,66,good?'VERTICAL':'HORIZONTAL');stroke(viewport,'rule');viewport.fills=paper;viewport.paddingLeft=6;viewport.paddingRight=6;viewport.paddingTop=6;viewport.paddingBottom=6;viewport.itemSpacing=good?2:6;viewport.clipsContent=true;c.appendChild(viewport);
  if(good){await label(viewport,'Riepilogo · 14 ottobre',128);await label(viewport,'Ora · 10:00',128);await button(viewport,'Conferma',128,22);}
  else{viewport.counterAxisAlignItems='CENTER';await label(viewport,'Riepilogo\n14 ottobre · ore 10:00',124);await button(viewport,'Conferma',64,22);const track=mark(figma.createRectangle());track.name='Scorrimento orizzontale necessario';track.resize(116,1);paint(track,'rule');viewport.appendChild(track);track.layoutPositioning='ABSOLUTE';track.x=6;track.y=61;const thumb=mark(figma.createRectangle());thumb.name='Indicatore di scorrimento';thumb.resize(28,2);paint(thumb,'muted');viewport.appendChild(thumb);thumb.layoutPositioning='ABSOLUTE';thumb.x=6;thumb.y=60;}
 }
 await caption(parent,f);
}
async function targetSize(parent,f){
 const samples=[{size:24,gap:2,label:'24 × 24 CSS px',status:'Dimensione\nrispettata',circles:false},{size:20,gap:4,label:'20 × 20 · spazio 4',status:'Spaziatura\nsufficiente',circles:true},{size:20,gap:0,label:'20 × 20 · spazio 0',status:'Spaziatura\ninsufficiente',circles:true}];
 const pair=row('Tre casi · dimensioni e spaziatura',363,12);parent.appendChild(pair);
 for(const sample of samples){
  const c=col(sample.label,113,4);pair.appendChild(c);c.counterAxisAlignItems='CENTER';await label(c,sample.label,113,{bold:true,align:'CENTER'});
  const canvas=scene('Quote CSS · '+sample.label,74,36);canvas.itemSpacing=sample.gap;canvas.primaryAxisAlignItems='CENTER';canvas.counterAxisAlignItems='CENTER';c.appendChild(canvas);
  const boxes=[];for(let i=0;i<2;i++){const box=mark(figma.createRectangle());box.name='Bersaglio · '+sample.size+' × '+sample.size;box.resize(sample.size,sample.size);box.fills=paper;stroke(box);canvas.appendChild(box);boxes.push(box);}
  if(sample.circles)for(const box of boxes){const circle=mark(figma.createEllipse());circle.name='Cerchio di verifica · diametro24CSSpx';circle.resize(24,24);circle.fills=[];stroke(circle,'accent');circle.dashPattern=[2,2];canvas.appendChild(circle);circle.layoutPositioning='ABSOLUTE';circle.x=box.x+(box.width-24)/2;circle.y=box.y+(box.height-24)/2;}
  await label(c,sample.status,113,{role:sample.gap===0?'accent':'ink',align:'CENTER'});
 }
 await caption(parent,f);
}
async function nameRoleState(parent,f){
 const pair=row('Controllo espandibile · due stati',363);parent.appendChild(pair);
 for(const open of [false,true]){
  const c=col(open?'Espanso':'Compresso',173.5,4);pair.appendChild(c);await label(c,open?'Aperto':'Chiuso',173.5,{bold:true,role:'accent'});
  await button(c,'Dettagli consegna',173.5,28,open?'up':'down');
  const area=scene('Contenuto del pannello',173.5,26,'VERTICAL');c.appendChild(area);await label(area,open?'Consegna · 14 ottobre\nOra · 10:00':'Contenuto nascosto',173.5,{role:open?'ink':'muted'});
  await label(c,'Nome: Dettagli consegna\nRuolo: pulsante\nStato: '+(open?'espanso':'compresso'),173.5);
 }
 await caption(parent,f);
}
async function formErrors(parent,f){
 const pair=row('Modulo · correzione del dato',363);parent.appendChild(pair);
 for(const corrected of [false,true]){
  const c=col(corrected?'Dopo la correzione':'Prima della correzione',173.5,4);pair.appendChild(c);
  await label(c,corrected?'Dopo la correzione':'Prima della correzione',173.5,{bold:true,role:corrected?'ink':'accent'});
  await label(c,'Data dell’appuntamento',173.5);
  const input=scene('Campo con etichetta persistente',173.5,24);input.paddingLeft=6;input.paddingRight=6;input.counterAxisAlignItems='CENTER';input.fills=paper;stroke(input,corrected?'ink':'accent');c.appendChild(input);await label(input,corrected?'14/10/2026':'14/10/26',161.5);
  await label(c,corrected?'Formato GG/MM/AAAA corretto.':'Errore: usa l’anno di quattro cifre.',173.5,{role:corrected?'ink':'accent'});
 }
 await caption(parent,f);
}
for(const target of targets){
 const {data:f,board,main,refs}=target;
 for(const change of f.changes||[]){const t=await figma.getNodeByIdAsync(change.nodeId);const before=t.characters;t.characters=change.text;mutatedNodeIds.push(t.id);changedTexts.push({nodeId:t.id,before,after:t.characters,role:'same-content-condensed'});}
 main.itemSpacing=6;mutatedNodeIds.push(main.id);
 for(const child of main.children.filter(n=>n.type==='FRAME')){child.itemSpacing=4;mutatedNodeIds.push(child.id);}
 const figure=col('Figura nativa · '+f.key,363,6);main.appendChild(figure);
 if(f.key==='reflow')await reflow(figure,f);
 else if(f.key==='target-size')await targetSize(figure,f);
 else if(f.key==='name-role-state')await nameRoleState(figure,f);
 else if(f.key==='form-errors')await formErrors(figure,f);
 const top=106;refs.y=610-refs.height;const bottom=Math.min(576,refs.y-14);main.y=top+(bottom-top-main.height)/2;mutatedNodeIds.push(refs.id);
 figures.push({key:f.key,folio:f.folio,boardId:board.id,figureId:figure.id,figureHeight:figure.height,bodyId:main.id,bodyHeight:main.height,bodyY:main.y,availableHeight:bottom-top,bodyBottom:main.y+main.height,sourceTop:refs.y,fits:main.height<=bottom-top});
}
return {createdNodeIds,mutatedNodeIds:[...new Set(mutatedNodeIds)],changedTexts,figures,boardCount:36,allFit:figures.every(f=>f.fits)};
