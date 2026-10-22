// Execute through use_figma after injecting `plan`; upload source images to returned imageNodes.
const page = await figma.getNodeByIdAsync(plan.pageId);
await figma.setCurrentPageAsync(page);
const section = await figma.getNodeByIdAsync(plan.sectionId);
const oldBoards = section.children.slice();
if (plan.pages.some(spec => oldBoards.some(n => n.name.endsWith('— ' + spec.title))))
  throw new Error('The extension is already present; inspect its current nodes before rerunning.');
const sx = await figma.getNodeByIdAsync('4035:12265');
const dx = await figma.getNodeByIdAsync('4035:12268');
const originalText = await figma.getNodeByIdAsync('4039:1428');
const originalFigure = await figma.getNodeByIdAsync('4039:1429');
const fonts = new Map();
for (const text of page.findAllWithCriteria({ types: ['TEXT'] }))
  for (const segment of text.getStyledTextSegments(['fontName']))
    fonts.set(JSON.stringify(segment.fontName), segment.fontName);
for (const f of [{family:'Geom',style:'Regular'}, {family:'Geom',style:'Bold'}, {family:'Merriweather',style:'Bold'}])
  fonts.set(JSON.stringify(f), f);
for (const font of fonts.values()) await figma.loadFontAsync(font);
const styles = await figma.getLocalTextStylesAsync();
const labelStyle = styles.find(n => n.name === 'Booklet / Schemi / Etichetta compatta');
const smallStyle = styles.find(n => n.name === 'Booklet / Schemi / Testo compatto');
const imageNodes = {};
const created = [], mutated = [], pages = [], removedNodeIds = [];
function remember(n) { created.push(n.id); return n; }
function active(n) { for (let p=n; p && p.id!==page.id; p=p.parent) if(p.visible===false) return false; return true; }
function descendants(n) { return [n, ...('findAll' in n ? n.findAll(()=>true) : [])]; }
function removeChildren(n) { for(const child of n.children.slice()) { removedNodeIds.push(...descendants(child).map(n=>n.id));child.remove(); } }
function stack(parent, name, width, direction='VERTICAL', gap=12) {
  const n=remember(figma.createAutoLayout(direction)); parent.appendChild(n); n.name=name;
  n.fills=[];n.strokes=[];n.clipsContent=false;n.paddingTop=0;n.paddingBottom=0;n.paddingLeft=0;n.paddingRight=0;
  n.itemSpacing=gap;n.resize(width,1);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';
  n.primaryAxisSizingMode=direction==='VERTICAL'?'AUTO':'FIXED';
  n.counterAxisSizingMode=direction==='VERTICAL'?'FIXED':'AUTO';return n;
}
function body(parent, text, name='Corpo testo', width=363) {
  const n=remember(originalText.clone());parent.appendChild(n);n.name=name;
  n.characters=text;n.textAutoResize='HEIGHT';n.resize(width,n.height);n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';
  n.setRangeHyperlink(0,n.characters.length,null);
  const lead=/^([^.]+\.) /.exec(text);
  if(lead && lead[1].length<45)n.setRangeFontName(0,lead[1].length,{family:'Merriweather',style:'Bold'});
  return n;
}
async function label(parent,text,width,small=false) {
  const n=remember(figma.createText());parent.appendChild(n);
  await n.setTextStyleIdAsync((small?smallStyle:labelStyle).id);
  n.name=text;n.characters=text;n.textAutoResize='HEIGHT';n.resize(width,n.height);
  n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical='HUG';return n;
}
function image(parent, name, width, height, file) {
  const n=remember(figma.createRectangle());parent.appendChild(n);n.name=name;n.resize(width,height);
  n.fills=[];n.strokes=[];imageNodes[file]=n.id;return n;
}
function replaceDigits(t,replacements) {
  for(const r of replacements.reverse()) { t.deleteCharacters(r.start,r.end);t.insertCharacters(r.start,r.value,'BEFORE'); }
}
// Preserve the rich text surrounding every number in existing pages.
for(const t of page.findAllWithCriteria({types:['TEXT']}).filter(active)) {
  if(/^Numero pagina/.test(t.name) && /^\d+$/.test(t.characters) && +t.characters>=398) {
    const value=String(+t.characters+6);replaceDigits(t,[{start:0,end:t.characters.length,value}]);t.name='Numero pagina · '+value;mutated.push(t.id);
  } else {
    const replacements=[...t.characters.matchAll(/\b[Ff]igura\s+3\.(\d+)/g)].filter(m=>+m[1]>=225)
      .map(m=>({start:m.index+m[0].length-m[1].length,end:m.index+m[0].length,value:String(+m[1]+3)}));
    if(replacements.length){replaceDigits(t,replacements);mutated.push(t.id);}
  }
}
for(const n of oldBoards) {
  const m=/^(C03 · )(\d+)( ·.*)$/.exec(n.name);
  if(m && +m[2]>=306){n.name=m[1]+(+m[2]+6)+m[3];mutated.push(n.id);}
}
const insertion=oldBoards.findIndex(n=>n.id===plan.insertAfterBoardId)+1;
for(let i=0;i<plan.pages.length;i++) {
  const spec=plan.pages[i], template=i%2===0?sx:dx;
  const f=template.clone();section.insertChild(insertion+i,f);created.push(...descendants(f).map(n=>n.id));
  f.name='C03 · '+(306+i)+' · '+(i%2===0?'SX':'DX')+' — '+spec.title;
  f.x=48;f.y=section.height+80+i*720;
  const title=f.children.find(n=>n.name==='02 · Titolo editoriale');
  const titleText=title.findAllWithCriteria({types:['TEXT']})[0];titleText.characters=spec.title;titleText.name='Titolo · '+spec.title;
  const note=f.children.find(n=>n.name==='Note e fonti · fondo pagina');
  const noteText=note.findAllWithCriteria({types:['TEXT']}).find(t=>t.name!=='Numero in apice');
  noteText.characters=spec.sources.map(s=>s.label).join('\n');noteText.name='Fonti primarie · '+spec.title;
  noteText.setRangeHyperlink(0,noteText.characters.length,null);
  let offset=0;for(const source of spec.sources){noteText.setRangeHyperlink(offset,offset+source.label.length,{type:'URL',value:source.url});offset+=source.label.length+1;}
  note.y=610-note.height;
  const area=f.children.find(n=>n.name==='Area corpo · centrata');removeChildren(area);
  area.y=title.y+title.height+20;area.resize(363,note.y-5-area.y);
  const content=stack(area,'Contenuto · '+spec.title,363);
  const bodyIds=[];let figure=null,caption=null,visual=null;
  if(spec.kind==='text') {
    for(const text of spec.paragraphs)bodyIds.push(body(content,text).id);
  } else {
    bodyIds.push(body(content,spec.intro,'Corpo testo · Introduzione').id);
    figure=originalFigure.clone();content.appendChild(figure);created.push(...descendants(figure).map(n=>n.id));figure.name='Figura didattica · Cultura · '+spec.figure;
    const slot=figure.findAllWithCriteria({types:['SLOT']}).find(n=>n.name==='Visuale');removeChildren(slot);
    visual=stack(slot,'Visuale · '+spec.title,363,spec.kind==='doodle'?'VERTICAL':'HORIZONTAL',20);
    if(spec.kind==='charts') {
      for(const [j,chart] of ['cgse-p13-Image210.png','cgse-p13-Image211.png'].entries()) {
        const column=stack(visual,'Configurazione '+(j===0?'A':'B'),171.5,'VERTICAL',5);
        await label(column,j===0?'A · Verde su, rosso giù':'B · Rosso su, verde giù',171.5);
        image(column,'Screenshot originale · CGSE · '+(j===0?'A':'B'),171.5,171.5*603/518,chart);
        await label(column,j===0?'Verde: aumento · Rosso: diminuzione':'Rosso: aumento · Verde: diminuzione',171.5,true);
      }
    } else if(spec.kind==='language') {
      for(const [j,word] of ['goluboy','siniy'].entries()) {
        const column=stack(visual,'Categoria · '+word,171.5,'VERTICAL',5);
        const chip=remember(figma.createRectangle());column.appendChild(chip);chip.name='Campione illustrativo · '+word;chip.resize(171.5,105);
        chip.fills=[{type:'SOLID',color:j===0?{r:101/255,g:184/255,b:246/255}:{r:36/255,g:85/255,b:179/255}}];chip.strokes=[];
        await label(column,word,171.5);await label(column,j===0?'Area dei blu chiari':'Area dei blu scuri',171.5,true);
      }
    } else image(visual,'Originale · Google Doodles / Lucia Sarabia',363,145.2,'google-dia-muertos-2024.png');
    const capSlot=figure.findAllWithCriteria({types:['SLOT']}).find(n=>n.name==='Caption');
    caption=capSlot.findAllWithCriteria({types:['TEXT']})[0];caption.characters=spec.caption;caption.name=spec.caption;
    caption.setRangeHyperlink(0,caption.characters.length,null);
    bodyIds.push(body(content,spec.after,'Corpo testo · Applicazione').id);
  }
  const folio=f.children.find(n=>n.type==='TEXT'&&/^Numero pagina/.test(n.name));folio.characters=String(spec.folio);folio.name='Numero pagina · '+spec.folio;
  pages.push({id:f.id,folio:spec.folio,title:spec.title,bodyIds,titleId:titleText.id,noteId:noteText.id,folioId:folio.id,
    figure:spec.figure,figureId:figure?.id,captionId:caption?.id,visualId:visual?.id,
    titleHeight:title.height,bodyHeight:content.height,availableHeight:area.height,noteHeight:note.height});
}
// Preserve six-column facing-page geometry and the final unnumbered notes page.
for(const [i,n] of section.children.entries()) {
  n.x=48+Math.floor((i%6)/2)*(2*sx.width+64)+(i%2)*sx.width;
  n.y=96+Math.floor(i/6)*(sx.height+64);mutated.push(n.id);
}
section.resize(section.width,Math.max(...section.children.map(n=>n.y+n.height))+48);
section.name=section.name.replace('274–325','274–331');mutated.push(section.id);
return {createdNodeIds:[...new Set(created)],mutatedNodeIds:[...new Set(mutated)],removedNodeIds,
  pages,boardCount:section.children.length,errors:pages.filter(n=>n.bodyHeight>n.availableHeight+0.1),imageNodes};
