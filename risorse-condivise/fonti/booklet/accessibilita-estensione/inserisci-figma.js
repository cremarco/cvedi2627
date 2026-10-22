// Impaginazione Figma: il chiamante antepone PAGES da contenuti.json,
// SOURCES indicizzato per id e INSPIRATIONS (id → autore) da fonti.json.
// Eseguire con use_figma sul file del manifest; il controllo iniziale impedisce duplicati.

const page = await figma.getNodeByIdAsync('2613:1110');
await figma.setCurrentPageAsync(page);
const section = await figma.getNodeByIdAsync('2188:1088');
const sx = await figma.getNodeByIdAsync('198:3481');
const dx = await figma.getNodeByIdAsync('198:3913');
const oldFrames = section.children.filter(n => n.type === 'FRAME');
if (oldFrames.length !== 12) throw new Error('La sezione non ha più le dodici tavole della base registrata: ispezionare prima di rieseguire.');
const styles = await figma.getLocalTextStylesAsync();
const styleByName = Object.fromEntries(styles.map(s => [s.name,s]));
const required = ['H3','Body_copy','Body_strong','Intro_capitolo','Didascalie'];
for (const name of required) if (!styleByName[name]) throw new Error('Stile mancante: '+name);
const fonts = new Map();
for (const s of styles) if (required.includes(s.name)) fonts.set(JSON.stringify(s.fontName),s.fontName);
for (const f of oldFrames) for (const t of f.query('TEXT')) for (const seg of t.getStyledTextSegments(['fontName'])) fonts.set(JSON.stringify(seg.fontName),seg.fontName);
await Promise.all([...fonts.values()].map(f => figma.loadFontAsync(f)));
const tokens = {};
for (const [role,id] of Object.entries({ink:'VariableID:2679:257',accent:'VariableID:2679:255',muted:'VariableID:2679:259',rule:'VariableID:2679:261'})) tokens[role] = await figma.variables.getVariableByIdAsync(id);
const basePaint = (await figma.getNodeByIdAsync('198:3491')).fills[0];
const createdNodeIds = [];
const removedCloneNodeIds = [];
const mutatedNodeIds = [];
const boards=[];
const images=[];
function rememberTree(n){createdNodeIds.push(n.id);if('children' in n)for(const c of n.children)rememberTree(c);}
function mark(n){createdNodeIds.push(n.id);return n;}
function paint(n,role){n.fills=[figma.variables.setBoundVariableForPaint({...basePaint,color:{...basePaint.color}},'color',tokens[role])];}
async function text(value,styleName,width,role='ink'){
  const t=mark(figma.createText());
  const style=styleByName[styleName];
  t.fontName=style.fontName;
  await t.setTextStyleIdAsync(style.id);
  t.name=styleName+' · '+value.slice(0,54);
  t.resize(width,1);t.textAutoResize='HEIGHT';t.characters=value;
  paint(t,role);
  return t;
}
function column(name,width,gap){const f=mark(figma.createAutoLayout('VERTICAL',{name,itemSpacing:gap}));f.fills=[];f.resize(width,1);f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='FIXED';return f;}
async function block(parent,item,width){const f=column(item.heading,width,5);parent.appendChild(f);const h=await text(item.heading,'H3',width,'accent');h.fontSize=12;h.lineHeight={unit:'PIXELS',value:16};f.appendChild(h);const b=await text(item.text,'Body_copy',width);f.appendChild(b);return f;}
for(let i=0;i<PAGES.length;i++){
  const p=PAGES[i];const left=i%2===0;const f=(left?sx:dx).clone();rememberTree(f);
  for(const child of [...f.children]){
    if(child.type==='SLICE'||child.name==='Header'||(child.type==='TEXT'&&child.name.startsWith('Numero pagina')))continue;
    function rememberRemoved(n){removedCloneNodeIds.push(n.id);if('children'in n)for(const c of n.children)rememberRemoved(c);}rememberRemoved(child);child.remove();
  }
  section.appendChild(f);
  const ordinal=80+i;const folio=178+i;
  f.name='C03 · '+String(ordinal).padStart(3,'0')+' · '+(left?'SX':'DX')+' — '+p.title;
  const footer=f.query('TEXT').filter(n=>n.name.startsWith('Numero pagina')).first();footer.characters=String(folio);footer.name='Numero pagina · '+folio;
  const x=left?60:74;const width=363;
  const title=await text(p.title,'H3',width);title.name='Titolo · '+p.title;title.textAlignHorizontal=left?'RIGHT':'LEFT';f.appendChild(title);title.x=x;title.y=60;
  const main=column('Contenuto · '+p.key,width,12);f.appendChild(main);main.x=x;
  const lead=await text(p.lead,'Intro_capitolo',width);main.appendChild(lead);
  if(p.key==='tlou-visione'){
    const image=mark(figma.createFrame());image.name='Figura documentaria · '+p.image;image.resize(width,width*9/16);image.fills=[];image.clipsContent=true;main.appendChild(image);images.push({boardId:f.id,nodeId:image.id,file:p.image});
    const caption=await text(p.caption,'Didascalie',width,'muted');main.appendChild(caption);
  }
  for(const b of p.blocks||[])await block(main,b,width);
  if(p.image&&p.key!=='tlou-visione'){
    const image=mark(figma.createFrame());image.name='Figura documentaria · '+p.image;image.resize(width,width*9/16);image.fills=[];image.clipsContent=true;main.appendChild(image);images.push({boardId:f.id,nodeId:image.id,file:p.image});
    const caption=await text(p.caption,'Didascalie',width,'muted');main.appendChild(caption);
  }
  if(p.after){const t=await text(p.after,'Body_copy',width);main.appendChild(t);}
  if(p.callout){const t=await text(p.callout,'Intro_capitolo',width);main.appendChild(t);}
  const refs=column('Fonti verificate · '+p.key,width,0);f.appendChild(refs);refs.x=x;
  for(const key of p.sources){const s=SOURCES[key];const t=await text(s.label,'Didascalie',width,'muted');t.lineHeight={unit:'PIXELS',value:10};t.setRangeHyperlink(0,t.characters.length,{type:'URL',value:s.url});refs.appendChild(t);}
  if(p.inspiration?.length){const credit=await text('Spunti: '+p.inspiration.map(k=>INSPIRATIONS[k]).join('; ')+'.','Didascalie',width,'muted');credit.lineHeight={unit:'PIXELS',value:10};refs.appendChild(credit);}
  refs.y=610-refs.height;
  const areaTop=Math.max(106,title.y+title.height+20);const areaBottom=Math.min(576,refs.y-14);const available=areaBottom-areaTop;
  main.y=areaTop+Math.max(0,(available-main.height)/2);
  if(main.height>available+0.5)throw new Error('Contenuto troppo alto per '+p.key+': '+main.height+' > '+available);
  boards.push({key:p.key,id:f.id,title:p.title,ordinal,folio,contentHeight:main.height,contentY:main.y,sourcesY:refs.y,imageId:images.find(x=>x.boardId===f.id)?.nodeId});
}
const order=[...oldFrames.slice(0,10),...boards.map(b=>section.children.find(n=>n.id===b.id)),...oldFrames.slice(10)];
for(let i=0;i<order.length;i++){
  const f=order[i];section.insertChild(i,f);f.x=48+(Math.floor((i%6)/2))*(f.width*2+64)+(i%2)*f.width;f.y=96+Math.floor(i/6)*(f.height+64);
  if(oldFrames.some(o=>o.id===f.id))mutatedNodeIds.push(f.id);
  f.name=f.name.replace(/^C03 · \d+ · /,'C03 · '+String(70+i).padStart(3,'0')+' · ');
  if(i>=30){const t=f.query('TEXT').filter(n=>n.name.startsWith('Numero pagina')).first();t.characters=String(168+i);t.name='Numero pagina · '+(168+i);mutatedNodeIds.push(t.id);}
}
section.name='03 · Accessibilità · 070–101';section.resize(3200.3779296875,96+Math.ceil(order.length/6)*(sx.height+64)-64+48);mutatedNodeIds.push(section.id);
return {createdNodeIds,removedCloneNodeCount:removedCloneNodeIds.length,mutatedNodeIds,boards,images,section:{id:section.id,count:order.length,name:section.name,width:section.width,height:section.height},fonts:[...new Set([...fonts.values()].map(f=>f.family))]};
