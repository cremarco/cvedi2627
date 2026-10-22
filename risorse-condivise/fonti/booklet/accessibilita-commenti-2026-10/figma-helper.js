const page=await figma.getNodeByIdAsync('2613:1110');
await figma.setCurrentPageAsync(page);
const section=await figma.getNodeByIdAsync('2188:1088');
const ids=['3122:598','3122:764','2811:845','2811:844','2811:842','2811:853'];
const found=await Promise.all(ids.map(id=>figma.getNodeByIdAsync(id)));
const [masterSX,masterDX,bodyTemplate,headingTemplate,leadTemplate,sourceTemplate]=found;
const styles=await figma.getLocalTextStylesAsync();
const styleMap=Object.fromEntries(styles.map(s=>[s.name,s]));
const vars=await figma.variables.getLocalVariablesAsync();
const variableMap=Object.fromEntries(vars.map(v=>[v.id,v]));
const fonts=new Map();
for(const f of [masterSX,masterDX])for(const t of f.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
for(const s of styles)fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const createdNodeIds=[],mutatedNodeIds=[],boards=[],imageTargets=[];
function remember(n){createdNodeIds.push(n.id);if('children'in n)for(const c of n.children)remember(c);return n;}
function mark(n){createdNodeIds.push(n.id);return n;}
function paint(role='ink',opacity=1){const id={ink:'VariableID:2883:71',accent:'VariableID:2883:67',muted:'VariableID:2679:259',paper:'VariableID:2883:70',rule:'VariableID:2679:261'}[role];return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0},opacity},'color',variableMap[id]);}
function stack(name,width,gap=12,direction='VERTICAL'){const f=mark(figma.createAutoLayout(direction));f.name=name;f.fills=[];f.resize(width,1);f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='FIXED';f.itemSpacing=gap;const id=gap===20?'VariableID:2883:81':gap===12?'VariableID:2883:80':gap===5?'VariableID:2883:82':null;if(id)f.setBoundVariable('itemSpacing',variableMap[id]);return f;}
async function txt(value,role='body',width=363){
  const template={body:bodyTemplate,heading:headingTemplate,lead:leadTemplate,source:sourceTemplate}[role]||bodyTemplate;
  const t=mark(template.clone());t.name='Testo · '+value.slice(0,65);t.resize(width,1);t.textAutoResize='HEIGHT';t.characters=value;
  t.fills=[paint(role==='heading'?'accent':role==='source'?'muted':'ink')];return t;
}
async function lab(parent,value,x,y,w=151,color='ink',size=10){
  const t=mark(figma.createText());const st=styleMap['Booklet / Grafici / Etichetta'];
  t.fontName=st.fontName;await t.setTextStyleIdAsync(st.id);t.resize(w,1);t.textAutoResize='HEIGHT';t.characters=value;t.fills=[paint(color)];if(size!==10)t.fontSize=size;
  parent.appendChild(t);t.x=x;t.y=y;t.name='Etichetta · '+value.slice(0,60);return t;
}
function box(parent,x,y,w,h,role='rule',opacity=1,fill=null){const n=mark(figma.createRectangle());parent.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=fill?[paint(fill)]:[];n.strokes=[paint(role,opacity)];n.strokeWeight=1;n.name='Controllo illustrato';return n;}
function circle(parent,x,y,size,role='accent'){const n=mark(figma.createEllipse());parent.appendChild(n);n.x=x;n.y=y;n.resize(size,size);n.fills=[paint(role)];n.name='Segnale illustrato';return n;}
async function diagram(parent,p,good,w=171.5){
 const f=mark(figma.createFrame());parent.appendChild(f);f.resize(w,150);f.fills=[];f.clipsContent=false;f.name='Schema simulato · '+p.kind+' · '+(good?'scelta':'barriera');
 const value=good?p.after:p.before;
 if(p.kind==='text'){
   const t=await lab(f,value,6,32,w-12,good?'ink':'rule',14);if(!good)t.opacity=.5;
   await lab(f,good?'Orario non disponibile':'',6,88,w-12,'accent',10);
 }else if(p.kind==='checkbox'){
   box(f,6,48,18,18,good?'accent':'rule',good?1:.4);
   if(good){const svg=figma.createNodeFromSvg('<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M4 9l3 3 7-7" fill="none" stroke="#C10007" stroke-width="2"/></svg>');remember(svg);f.appendChild(svg);svg.x=6;svg.y=48;}
   await lab(f,value,32,47,w-36);await lab(f,good?'Selezionata':'Bordo poco distinguibile',6,100,w-12,'muted',9);
 }else if(p.kind==='reflow'){
   const viewport=mark(figma.createFrame());f.appendChild(viewport);viewport.resize(130,112);viewport.x=5;viewport.y=12;viewport.fills=[];viewport.clipsContent=true;box(viewport,0,0,130,112);
   await lab(viewport,value,8,12,good?112:220);
   box(viewport,8,good?78:48,good?112:190,23,'accent');await lab(viewport,'Conferma',16,good?81:51,96,'accent');
   await lab(f,'Vista equivalente a 320 CSS px',0,128,w,'muted',8);
 }else if(p.kind==='keyboard'||p.kind==='form'||p.kind==='password'){
   const lines=value.split('\n');
   for(let i=0;i<Math.min(lines.length,3);i++){const y=10+i*39;if(i===1){box(f,5,y-5,w-10,30,good?'accent':'rule');}await lab(f,lines[i],10,y,w-20,i===2?'accent':'ink',p.kind==='form'?9:10);}
   if(p.kind==='keyboard')await lab(f,good?'Tab → scelta → invio':'Il menu richiede il mouse',5,132,w-10,'muted',9);
 }else if(p.kind==='list'||p.kind==='flow'){
   const lines=value.split('\n');
   for(let i=0;i<lines.length;i++){const y=8+i*42;box(f,4,y,w-8,34);await lab(f,lines[i],12,y+8,w-24,good&&p.kind==='flow'?'accent':'ink',10);}
   if(p.kind==='list')await lab(f,good?'Comandi senza trascinamento':'Solo trascinamento',4,137,w-8,'muted',8);
 }else if(p.kind==='image'){
   const svg=figma.createNodeFromSvg('<svg xmlns="http://www.w3.org/2000/svg" width="95" height="85" viewBox="0 0 95 85"><path d="M30 21c0-21 35-21 35 0" fill="none" stroke="#030712" stroke-width="3"/><path d="M23 21h49l6 54H17z" fill="#C10007" stroke="#030712" stroke-width="2"/><rect x="26" y="43" width="39" height="23" rx="3" fill="#fff" stroke="#030712" stroke-width="2"/><path d="M19 25L7 50M75 25l13 25" stroke="#030712" stroke-width="3"/></svg>');remember(svg);f.appendChild(svg);svg.x=38;svg.y=0;
   await lab(f,value,5,95,w-10,good?'ink':'muted',9);
 }else if(p.kind==='video'){
   box(f,5,4,w-10,84);circle(f,w/2-10,20,20,'ink');box(f,w/2-23,45,46,32,'accent',1,'accent');
   if(good){box(f,8,66,w-16,20,'ink',1,'ink');const t=await lab(f,'«Il percorso è questo».',12,68,w-24,'paper',8);}
   await lab(f,value,5,100,w-10,'muted',9);
 }else if(p.kind==='disclosure'){
   box(f,5,12,w-10,34,'accent');await lab(f,'Dettagli consegna',12,21,w-24,'accent',10);
   await lab(f,good?'Nome • Dettagli consegna\nRuolo • pulsante\nStato • espanso':'Testo cliccabile\nRuolo non disponibile\nStato non comunicato',5,68,w-10,'ink',9);
 }else if(p.kind==='status'){
   box(f,5,12,75,30,'accent');await lab(f,'Salva',15,20,55,'accent');
   if(good)box(f,2,9,81,36,'ink');
   await lab(f,good?'Salvataggio completato\nFocus sul comando':'Aggiornamento visibile\nNessun annuncio',5,76,w-10,good?'accent':'muted',10);
 }else if(p.kind==='summary'||p.kind==='reader'||p.kind==='audit'){
   await lab(f,value,8,18,w-16,'ink',11);
   if(good&&p.kind==='summary'){box(f,5,107,71,28);box(f,84,107,81,28,'accent');await lab(f,'Modifica',11,113,65,'ink',9);await lab(f,'Conferma',92,113,70,'accent',9);}
   if(p.kind==='reader'){await lab(f,good?'Una lettura configurabile':'Una lettura obbligata',8,104,w-16,'muted',9);}
   if(p.kind==='audit'){box(f,0,0,w,147);await lab(f,good?'→ nuova prova':'Manca il contesto',8,124,w-16,'accent',9);}
 }else if(p.kind==='motion'){
   for(let i=0;i<3;i++){box(f,5,5+i*30,w-10,25);await lab(f,'Notizia '+(i+1),12,9+i*30,w-24,'ink',9);}
   await lab(f,value,5,108,w-10,'accent',10);
 }
 return f;
}
async function newBoard(p){
 const existing=section.children.find(f=>f.type==='FRAME'&&f.children.some(c=>c.name==='Contenuto · commenti/'+p.key));
 if(existing){boards.push({key:p.key,id:existing.id,reused:true});return null;}
 const left=p.side==='SX';const f=(left?masterSX:masterDX).clone();remember(f);
 for(const c of [...f.children])if(!(c.type==='SLICE'||c.name==='01 · Testata editoriale'||c.name==='02 · Titolo editoriale'||c.type==='TEXT'&&c.name.startsWith('Numero pagina')))c.remove();
 section.appendChild(f);f.name='C03 · '+String(p.ordinal).padStart(3,'0')+' · '+p.side+' — '+p.title;f.x=48+(p.index%6)*560;f.y=section.height+96+Math.floor(p.index/6)*722;
 const header=f.children.find(c=>c.name==='01 · Testata editoriale');header.setProperties({Lato:p.side});
 const title=f.children.find(c=>c.name==='02 · Titolo editoriale');title.setProperties({Ruolo:'Titolo'});
 const titleText=title.findAllWithCriteria({types:['TEXT']})[0];titleText.resize(363,1);titleText.textAutoResize='HEIGHT';titleText.characters=p.title;await titleText.setTextStyleIdAsync(styleMap['Booklet / Titoli / Titolo'].id);titleText.textAlignHorizontal=left?'RIGHT':'LEFT';title.x=left?60:74;title.y=60;
 const footer=f.children.find(c=>c.type==='TEXT'&&c.name.startsWith('Numero pagina'));footer.characters=String(p.folio);footer.name='Numero pagina · '+p.folio;
 const main=stack('Contenuto · commenti/'+p.key,363,20);f.appendChild(main);main.x=left?60:74;
 const refs=stack('Fonti · commenti/'+p.key,363,0);f.appendChild(refs);refs.x=main.x;
 const source=p.sourceInfo;const sourceText=await txt('* '+source.label+' — '+source.url.replace(/^https?:\/\/(www\.)?/,'') ,'source',363);refs.appendChild(sourceText);sourceText.setRangeHyperlink(0,sourceText.characters.length,{type:'URL',value:source.url});
 const lead=await txt(p.lead,'lead',363);main.appendChild(lead);
 return {f,main,refs,title,footer};
}
function finishBoard(p,n){n.refs.y=610-n.refs.height;const top=Math.max(110,n.title.y+n.title.height+20);const bottom=Math.min(584,n.refs.y-14);const available=bottom-top;if(n.main.height>available+.5)throw new Error('Contenuto troppo alto '+p.key+': '+n.main.height+' > '+available);n.main.y=top+(available-n.main.height)/2;boards.push({key:p.key,id:n.f.id,folio:p.folio,ordinal:p.ordinal,side:p.side,title:p.title,mainHeight:n.main.height,mainY:n.main.y,mainBottom:n.main.y+n.main.height,sourcesBottom:n.refs.y+n.refs.height});}
