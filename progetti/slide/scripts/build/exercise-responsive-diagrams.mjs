import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const directory = 'progetti/slide/assets/esercitazioni/schemi'
const manifest = JSON.parse(await readFile(`${directory}/manifest.json`, 'utf8'))
const rect = (x,y,w,h,stroke='#86efac',fill='#27272a') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
const t = (x,y,value,size=21,fill='#fafafa') => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}">${value}</text>`
const line = (x,y,X,Y,color='#fbbf24',dash='') => `<path d="M${x} ${y}L${X} ${Y}" stroke="${color}" stroke-width="1.5" ${dash ? 'stroke-dasharray="7 6"' : ''}/>`
const para = (x,y,lines,size=20,leading=25) => lines.map((v,i)=>t(x,y+i*leading,v,size)).join('')
const lorem = ['Lorem ipsum dolor sit amet, consectetur','adipiscing elit. Fusce id euismod purus. Proin','id egestas turpis, quis semper est.','Suspendisse fringilla dui eu egestas']
const centerText = (x,y,label,size=40,color='#fafafa') => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${color}" font-size="${size}">${label}</text>`
const arrow = (path,color='#f9a8d4') => `<path d="${path}" fill="none" stroke="${color}" stroke-width="3" marker-end="url(#arrow-${color==='#f9a8d4'?'pink':'amber'})"/>`
const bubble = (x,y,label,r=39,color='#f9a8d4') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`+centerText(x,y+2,label,label==='XYZ'?34:48,'#18181b')
const screen = (cx,y,type,label,color='#f9a8d4') => {
 const [w,h] = type==='desktop'?[150,94]:type==='tablet'?[74,114]:[46,88], x=cx-w/2
 return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#fafafa"/><rect x="${x+7}" y="${y+7}" width="${w-14}" height="${h-22}" fill="${color}"/>`+centerText(cx,y+(h-10)/2,label,type==='phone'?30:44,'#18181b')+`<circle cx="${cx}" cy="${y+h-7}" r="3" fill="#18181b"/>`+(type==='desktop'?`<path d="M${cx-12} ${y+h}v13h-22v7h68v-7h-22v-13" fill="#fafafa"/>`:'')
}
const comparison = `<defs><marker id="arrow-pink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#f9a8d4"/></marker><marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#fbbf24"/></marker></defs>`+
 [0,1].map(i=>{const left=15+i*350;return rect(left,58,340,757,'#52525b','#27272a')+centerText(left+170,106,['Responsive','Adaptive','Hybrid'][i],37)+line(left+20,139,left+320,139,'#71717a')+line(left+20,709,left+320,709,'#71717a')}).join('')+
 bubble(185,207,'X')+arrow('M185 248V274')+screen(185,286,'desktop','X')+arrow('M185 404V442')+screen(185,454,'tablet','X')+arrow('M185 580V605')+screen(185,618,'phone','X')+
 [0,1,2].map((i)=>{const y=[220,450,630][i];return bubble(438,y,['X','Y','Z'][i],i===2?33:39,'#fbbf24')+arrow(`M${i===2?472:479} ${y}H${i===0?523:i===1?554:566}`,'#fbbf24')+screen(598,y-(i===0?47:i===1?57:44),['desktop','tablet','phone'][i],['X','Y','Z'][i],'#fbbf24')}).join('')+
 [ ['Contenuti coerenti','Esperienza indipendente','dal dispositivo'],['Contenuti personalizzati','Esperienza specifica','per dispositivo'] ].map((rows,i)=>rows.map((label,j)=>centerText(185+i*350,740+j*27,label,25)).join('')).join('')
const viewportComparison = [0,1].map(i=>{
 const x=40+i*350,y=110,scale=i?.265:1,contentWidth=i?900:236
 const phone=`<rect x="${x-7}" y="${y-8}" width="274" height="451" rx="22" fill="#3f3f46"/><rect x="${x}" y="${y}" width="260" height="435" rx="16" fill="#09090b"/><rect x="${x+93}" y="${y+7}" width="74" height="7" rx="3.5" fill="#71717a"/>`
 const content=`<g transform="translate(${x+12} ${y+28}) scale(${scale})">`+rect(0,0,contentWidth,45,'#f9a8d4','#3f3f46')+t(12,31,'Il mio sito',28)+rect(0,64,contentWidth,100,'#fbbf24','#52525b')+(i?para(12,201,['Titolo della pagina','Il testo rifluisce alla larghezza dello schermo.'],28,40):para(12,201,['Titolo della','pagina','Il testo rifluisce','alla larghezza','dello schermo.'],28,36))+`</g>`
 return t(x,67,i?'Senza meta':'Con meta',31)+t(x,97,'viewport',31)+phone+content+t(x,589,i?'Pagina ridotta':'Testo leggibile',28)+t(x,626,i?'Viewport virtuale ampio':'width=device-width',24)
}).join('')
const figures = [
  ['responsive-adaptive',6,'Responsive e adaptive', comparison],
  ['viewport',10,'Con e senza meta viewport', viewportComparison],
  ['layout-desktop',32,'Esercizio 3: layout desktop',
    rect(55,100,990,225)+rect(332.5,145,435,135,'#f9a8d4')+t(352.5,172,'Titolo h1',23)+para(352.5,199,lorem,18)+
    rect(55,340,220,225)+rect(285,340,545,225)+rect(845,340,200,225)+rect(303,352,306,130,'#fbbf24')+rect(303,493,306,60,'#fbbf24')+rect(623,352,194,201,'#fbbf24')+t(355,389,'1')+t(355,532,'2')+t(675,389,'3')+t(858,377,'(IMMAGINE)',19)+
    [110,215].map(x=>`<circle cx="${x}" cy="393" r="29" fill="none" stroke="#fafafa"/>`+para(x-27,460,['Lorem','ipsum'],18)).join('')+line(0,516,1100,516,'#f9a8d4',true)],
  ['layout-mobile',33,'Esercizio 3: layout mobile',
    t(190,75,'Prima parte',23)+t(710,75,'Segue',23)+
    rect(180,115,255,260)+rect(201,138,213,218,'#f9a8d4')+t(215,165,'Titolo h1',22)+para(215,193,['Lorem ipsum dolor sit','amet, consectetur','adipiscing elit. Fusce','id euismod purus.','Proin id egestas','turpis, quis semper','est. Suspendisse','fringilla dui eu egestas'],17,22)+
    rect(180,389,255,195)+[440,526].map(y=>`<circle cx="307" cy="${y-20}" r="24" fill="none" stroke="#fafafa"/>`+t(258,y+19,'Lorem ipsum',17)).join('')+
    rect(710,115,255,175)+t(725,150,'(IMMAGINE)',20)+rect(710,310,255,274)+[ [325,112,'1'],[451,51,'2'],[516,51,'3'] ].map(([y,h,n])=>rect(750,y,175,h,'#fbbf24')+t(830,y+32,n)).join('')+line(0,375,520,375,'#f9a8d4',true)+line(550,60,550,590,'#71717a')],
]
for (const [name,sourceSlide,title,body] of figures) {
  const height = sourceSlide === 6 ? 840 : sourceSlide === 10 ? 665 : 610
  const width = sourceSlide === 6 ? 720 : sourceSlide === 10 ? 720 : 1100
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title><rect width="${width}" height="${height}" rx="12" fill="#18181b"/><path d="M0 43H1100" stroke="#3f3f46"/><g fill="#71717a"><circle cx="24" cy="22" r="5"/><circle cx="44" cy="22" r="5"/><circle cx="64" cy="22" r="5"/></g><g font-family="Arial, sans-serif">${body}</g></svg>\n`
  const source = `responsive-${name}.svg`
  await writeFile(`${directory}/${source}`, svg)
  const entry = { source, web: `/images/esercitazioni/${source}`, sha256: createHash('sha256').update(svg).digest('hex'), exercise: '04', sourceSlides: [sourceSlide], original: 'progetti/slide/assets/esercitazioni/originali/04-responsive-mobile-first.pdf', generator: 'progetti/slide/scripts/build/exercise-responsive-diagrams.mjs', description: title, ...(sourceSlide === 6 ? { references: ['https://medium.com/react-camp/adaptive-responsive-reactive-62fb938d6191', 'https://web.dev/learn/design/intro/'], referenceImage: 'riferimenti/responsive-adaptive-hybrid.png', referenceImageSha256: createHash('sha256').update(await readFile(`${directory}/riferimenti/responsive-adaptive-hybrid.png`)).digest('hex'), note: 'Ricostruzione dal riferimento allegato dall’utente, derivato dall’articolo: colonne Responsive e Adaptive; la colonna Hybrid del riferimento è esclusa su richiesta. X/Y/Z identificano le varianti concettuali del riferimento.' } : sourceSlide === 10 ? { references: ['https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport'] } : {}) }
  const index = manifest.diagrams.findIndex(asset=>asset.source===source)
  if(index<0) manifest.diagrams.push(entry); else manifest.diagrams[index]=entry
}
await writeFile(`${directory}/manifest.json`,JSON.stringify(manifest,null,2)+'\n')
console.log('Exercise 04: four diagrams reconstructed; original PDF retained')
