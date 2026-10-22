// Le costanti REVISION e SOURCES vengono anteposte dal chiamante dai JSON locali.
const page=await figma.getNodeByIdAsync('2613:1110');
await figma.setCurrentPageAsync(page);
const section=await figma.getNodeByIdAsync('2188:1088');
const oldFrames=section.children.filter(n=>n.type==='FRAME');
if(oldFrames.length!==32)throw new Error('Base diversa dalle32tavole verificate: leggere il canvas prima di rieseguire.');
const styles=await figma.getLocalTextStylesAsync();
const st=Object.fromEntries(styles.map(s=>[s.name,s]));
const needed=['H3','Body_copy','Intro_capitolo','Didascalie'];
const fonts=new Map();
for(const n of needed){if(!st[n])throw new Error('Stile mancante: '+n);fonts.set(JSON.stringify(st[n].fontName),st[n].fontName);}
for(const f of oldFrames)for(const t of f.query('TEXT'))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const tokenIds={ink:'VariableID:2679:257',accent:'VariableID:2679:255',muted:'VariableID:2679:259',rule:'VariableID:2679:261'};
const tokens={};for(const [r,id]of Object.entries(tokenIds))tokens[r]=await figma.variables.getVariableByIdAsync(id);
const basePaint=(await figma.getNodeByIdAsync('198:3491')).fills[0];
const createdNodeIds=[],mutatedNodeIds=[],removedNodeIds=[],boards=[],changedTexts=[];
const before=oldFrames.map(b=>({id:b.id,name:b.name,folio:b.query('TEXT').filter(t=>t.name.startsWith('Numero pagina')).first()?.characters}));
function mark(n){createdNodeIds.push(n.id);return n;}
function tree(n,a){a.push(n.id);if('children'in n)for(const c of n.children)tree(c,a);}
function paint(n,r){n.fills=[figma.variables.setBoundVariableForPaint({...basePaint,color:{...basePaint.color}},'color',tokens[r])];}
async function txt(value,style,width,role='ink'){
const t=mark(figma.createText());t.fontName=st[style].fontName;await t.setTextStyleIdAsync(st[style].id);
t.resize(width,1);t.textAutoResize='HEIGHT';t.characters=value;t.name=style+' · '+value.slice(0,54);paint(t,role);return t;
}
function column(name,width,gap){const n=mark(figma.createAutoLayout('VERTICAL',{name,itemSpacing:gap}));n.fills=[];n.resize(width,1);n.counterAxisSizingMode='FIXED';n.primaryAxisSizingMode='AUTO';return n;}
async function block(parent,b,width){const f=column(b.heading,width,5);parent.appendChild(f);const h=await txt(b.heading,'H3',width,'accent');h.fontSize=12;h.lineHeight={unit:'PIXELS',value:16};f.appendChild(h);const t=await txt(b.text,'Body_copy',width);f.appendChild(t);return f;}
async function ref(parent,key,width){const s=SOURCES[key];if(!s)throw new Error('Fonte non registrata: '+key);const t=await txt(s.label,'Didascalie',width,'muted');t.lineHeight={unit:'PIXELS',value:10};t.setRangeHyperlink(0,t.characters.length,{type:'URL',value:s.url});const credit=parent.children.find(n=>n.type==='TEXT'&&n.characters.startsWith('Spunti:'));if(credit)parent.insertChild(parent.children.indexOf(credit),t);else parent.appendChild(t);return t;}
function center(b){const main=b.children.find(n=>n.name.startsWith('Contenuto ·'));const refs=b.children.find(n=>n.name.startsWith('Fonti verificate ·'));const title=b.children.find(n=>n.name.startsWith('Titolo ·'));if(!main||!refs||!title)return;
refs.y=610-refs.height;const top=Math.max(106,title.y+title.height+20),bottom=Math.min(576,refs.y-14);if(main.height>bottom-top+.5)throw new Error('Testo troppo alto: '+b.name+' '+main.height+' > '+(bottom-top));main.y=top+(bottom-top-main.height)/2;mutatedNodeIds.push(main.id,refs.id);
}
async function contrastExample(parent,width){
const figure=column('Esempio simulato · contrasto del bordo',width,6);parent.appendChild(figure);
const row=mark(figma.createAutoLayout('HORIZONTAL',{name:'Confronto del contrasto',itemSpacing:18}));row.fills=[];row.resize(width,1);row.counterAxisSizingMode='AUTO';row.primaryAxisSizingMode='FIXED';figure.appendChild(row);
for(const sample of [{v:170/255,ratio:'2,32:1 · sotto soglia'},{v:102/255,ratio:'5,74:1 · sopra soglia'}]){
 const col=column(sample.ratio,(width-18)/2,8);row.appendChild(col);
 const h=await txt(sample.ratio,'Body_copy',col.width);h.fontSize=9;h.lineHeight={unit:'PIXELS',value:13};col.appendChild(h);
 const pair=mark(figma.createAutoLayout('HORIZONTAL',{name:'Casella e etichetta',itemSpacing:8,counterAxisAlignItems:'CENTER'}));pair.fills=[];pair.resize(col.width,24);pair.primaryAxisSizingMode='FIXED';pair.counterAxisSizingMode='FIXED';col.appendChild(pair);
 const box=mark(figma.createRectangle());box.name='Bordo misurato sul bianco';box.resize(20,20);box.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];box.strokes=[{type:'SOLID',color:{r:sample.v,g:sample.v,b:sample.v}}];box.strokeWeight=2;pair.appendChild(box);
 const label=await txt('Ricevi aggiornamenti','Body_copy',col.width-28);label.fontSize=9;label.lineHeight={unit:'PIXELS',value:13};pair.appendChild(label);
}return figure;
}
for(let i=0;i<REVISION.pages.length;i++){
const p=REVISION.pages[i],left=i%2===0;const template=await figma.getNodeByIdAsync(left?'198:3481':'198:3913');const f=template.clone();tree(f,createdNodeIds);
for(const c of [...f.children]){if(c.type==='SLICE'||c.name==='Header'||(c.type==='TEXT'&&c.name.startsWith('Numero pagina')))continue;tree(c,removedNodeIds);c.remove();}
section.appendChild(f);f.name='Integrazione pratica · '+p.key;
const x=left?60:74,w=363;const title=await txt(p.title,'H3',w);title.name='Titolo · '+p.title;title.textAlignHorizontal=left?'RIGHT':'LEFT';f.appendChild(title);title.x=x;title.y=60;
const main=column('Contenuto · '+p.key,w,12);f.appendChild(main);main.x=x;main.appendChild(await txt(p.lead,'Intro_capitolo',w));
for(const b of p.blocks)await block(main,b,w);
if(p.example==='checkbox-contrast'){await contrastExample(main,w);const caption=await txt(p.caption,'Didascalie',w,'muted');main.appendChild(caption);}
if(p.callout)main.appendChild(await txt(p.callout,'Intro_capitolo',w));
const refs=column('Fonti verificate · '+p.key,w,0);f.appendChild(refs);refs.x=x;for(const key of p.sources)await ref(refs,key,w);center(f);
boards.push({key:p.key,id:f.id,title:p.title,insertBefore:p.insertBefore,contentHeight:main.height});
}
for(const e of REVISION.edits.filter(e=>e.nodeId)){
const n=await figma.getNodeByIdAsync(e.nodeId);if(n.type!=='TEXT')throw new Error('Destinazione non testuale: '+e.nodeId);
const old=n.characters;if(e.replace){const pos=old.indexOf(e.replace);if(pos<0)throw new Error('Testo atteso mancante: '+e.key);n.insertCharacters(pos,e.with,'AFTER');n.deleteCharacters(pos+e.with.length,pos+e.with.length+e.replace.length);}else n.characters=e.with;
mutatedNodeIds.push(n.id);changedTexts.push({key:e.key,nodeId:n.id,before:old,after:n.characters});
}
for(const e of REVISION.edits.filter(e=>e.addSources||e.appendBlock)){
const b=await figma.getNodeByIdAsync(e.boardId),main=b.children.find(n=>n.name.startsWith('Contenuto ·')),refs=b.children.find(n=>n.name.startsWith('Fonti verificate ·'));
if(e.appendBlock)await block(main,e.appendBlock,363);
for(const key of e.removeRepeatedSources||[]){const s=SOURCES[key];const t=refs.children.find(n=>n.type==='TEXT'&&n.characters===s.label);if(t){removedNodeIds.push(t.id);t.remove();}}
for(const key of e.addSources||[])await ref(refs,key,363);center(b);
}
for(const id of ['2811:218','2811:639','2811:857','2811:725'])center(await figma.getNodeByIdAsync(id));
const map=REVISION.edits.find(e=>e.key==='map');const mapParent=await figma.getNodeByIdAsync('2168:1427');
const oldImage=await figma.getNodeByIdAsync('2141:1362');const oldImageData={id:oldImage.id,name:oldImage.name,width:oldImage.width,height:oldImage.height};tree(oldImage,removedNodeIds);oldImage.remove();
const replacement=mark(figma.createRectangle());replacement.name='Mappa WCAG 2.2 completa · italiano · Intopia';replacement.resize(348.79864501953125,503.5);replacement.fills=[];mapParent.insertChild(0,replacement);mutatedNodeIds.push(mapParent.id);
const caption=await figma.getNodeByIdAsync('2141:1360');changedTexts.push({key:'map-caption',nodeId:caption.id,before:caption.characters,after:map.caption});caption.characters=map.caption;caption.textAutoResize='HEIGHT';caption.setRangeHyperlink(0,caption.characters.length,{type:'URL',value:map.sourceUrl});mutatedNodeIds.push(caption.id);
const fig=await figma.getNodeByIdAsync('2141:1363');fig.name='Figura 01 · Mappa completa WCAG 2.2 in italiano';mutatedNodeIds.push(fig.id);
const order=[];for(const original of oldFrames){for(const b of boards.filter(b=>b.insertBefore===original.id))order.push(await figma.getNodeByIdAsync(b.id));order.push(original);}
for(let i=0;i<order.length;i++){
const f=order[i];section.insertChild(i,f);f.x=48+Math.floor((i%6)/2)*(f.width*2+64)+(i%2)*f.width;f.y=96+Math.floor(i/6)*(f.height+64);
const left=i%2===0,oldName=f.name,title=boards.find(b=>b.id===f.id)?.title||oldName.slice(oldName.indexOf(' — ')+3);
f.name='C03 · '+String(70+i).padStart(3,'0')+' · '+(left?'SX':'DX')+' — '+title;
const footer=f.query('TEXT').filter(t=>t.name.startsWith('Numero pagina')).first();footer.characters=String(168+i);footer.name='Numero pagina · '+(168+i);
mutatedNodeIds.push(f.id,footer.id);const nb=boards.find(b=>b.id===f.id);if(nb){nb.ordinal=70+i;nb.folio=168+i;}
}
section.name='03 · Accessibilità · 070–105';section.resize(3200.3779296875,96+Math.ceil(order.length/6)*(oldFrames[0].height+64)-64+48);mutatedNodeIds.push(section.id);
const familySet=new Set();for(const b of boards){const f=await figma.getNodeByIdAsync(b.id);for(const t of f.query('TEXT'))for(const seg of t.getStyledTextSegments(['fontName']))familySet.add(seg.fontName.family);}
if([...familySet].some(f=>!['Geom','Merriweather'].includes(f)))throw new Error('Famiglia tipografica inattesa');
return {createdNodeIds,mutatedNodeIds:[...new Set(mutatedNodeIds)],removedNodeIds,boards,changedTexts,before,order:order.map((b,i)=>({id:b.id,name:b.name,ordinal:70+i,folio:168+i})),mapTargetId:replacement.id,oldImageData,fonts:[...familySet],section:{id:section.id,name:section.name,count:order.length,height:section.height}};

