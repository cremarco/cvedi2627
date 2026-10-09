import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

// Content-only adapter. It never executes source handlers or copies HTML into UI.
const lab = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.resolve(lab, '../..');
const read = async file => JSON.parse(await fs.readFile(path.join(lab, file), 'utf8'));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const [weather, normalized, supplement, sourceManifest, assetManifest, attributions, widgets] = await Promise.all([
  read('data/weather.json'), read('data/normalized.json'), read('data/supplementary.json'),
  read('sources/manifest.json'), read('assets/manifest.json'), read('assets/attributions.json'), read('sources/rendered-widgets.json'),
]);
const records = supplement.records;
const bolognaHTML = await fs.readFile(path.join(lab,'sources/bologna.html'),'utf8');
const usedRefs = new Set();
const assetFiles = new Set();
const number = value => {
  const match = String(value ?? '').match(/-?\d+(?:[.,]\d+)?/);
  return match ? Number(match[0].replace(',', '.')) : null;
};
const compact = value => String(value ?? '').replace(/\s+/gu, ' ').trim();
const record = ref => {
  assert.ok(records[ref], `Unknown source reference ${ref}`);
  usedRefs.add(ref);
  return records[ref];
};
const content = ref => {
  const r = record(ref);
  assert.ok(!['script', 'style', 'template'].includes(r.tag));
  return { text:r.text, sourceText:r.textContent, sourceRefs:[ref] };
};
const descendants = ref => {
  const parent = record(ref);
  return Object.entries(records).filter(([, r]) => r.source.document === parent.source.document && r.source.xpath.startsWith(parent.source.xpath + '/'));
};
const asset = (fileOrUrl, ref) => {
  const found = assetManifest.assets.find(a => a.file === fileOrUrl || a.url === fileOrUrl || a.resolvedUrl === fileOrUrl);
  assert.ok(found, `Asset not in captured manifest: ${fileOrUrl}`);
  assetFiles.add(found.file);
  if (ref) record(ref);
  return {src:`assets/${path.basename(found.file)}`,originalPath:found.file,sourceUrl:found.url,sha256:found.sha256,sourceSha256:found.sourceSha256,sourceRefs:ref?[ref]:[],license:assetManifest.license};
};
const image = ref => {
  const r = record(ref);
  const captured = r.assetReferences?.find(a => a.attribute === 'src' && a.status === 'captured-local-asset');
  return captured ? {...asset(captured.localPath, ref),alt:r.attributes.alt || r.attributes['aria-label'] || '',sourceAlt:r.attributes.alt ?? null} : {src:null,alt:r.attributes.alt||'',sourceRefs:[ref],availability:'unavailable',reason:'Immagine non acquisita nel corpus.'};
};
const sourceRoute = url => {
  if (!url) return null;
  const u = new URL(url);
  if (u.hostname !== 'www.ilmeteo.it') return null;
  if (u.pathname === '/') return 'index.html';
  if (u.pathname.replace(/\/$/, '') === '/meteo/milano') return 'milano.html';
  if (u.pathname.replace(/\/$/, '') === '/portale/meteo-domani') return 'domani.html';
  return null;
};
const link = ref => {
  const r = record(ref);
  const proposedUrl = r.url?.absoluteUrl || null;
  const url = proposedUrl && /^https?:\/\//.test(proposedUrl) ? proposedUrl : null;
  const localHref = sourceRoute(url);
  return {label:r.text || r.attributes['aria-label'] || r.attributes.title || '',sourceText:r.textContent,sourceUrl:url,href:localHref || url,availability:localHref?'local':url?'external':'unavailable',sourceRefs:[ref],sourceTitle:r.attributes.title||null,sourceKind:r.url?.kind||null};
};
const uniqueLinks = refs => {
  const byKey = new Map();
  for (const ref of refs) {
    const l = link(ref);
    if (!l.label && !l.sourceUrl) continue;
    const key = JSON.stringify([l.label,l.sourceUrl]);
    if (byKey.has(key)) byKey.get(key).sourceRefs.push(ref);
    else byKey.set(key,l);
  }
  return [...byKey.values()];
};
const linksWithin = ref => uniqueLinks(descendants(ref).filter(([,r])=>r.url).map(([id])=>id));
const imagesWithin = ref => descendants(ref).filter(([,r])=>r.tag==='img'&&r.assetReferences?.some(a=>a.status==='captured-local-asset')).map(([id])=>image(id));
const plainNarrative = ref => {
  const c = content(ref);
  const related = linksWithin(ref);
  // CTA labels are separate named links, not forecast prose; exact source is retained.
  const firstCTA = related.map(l=>c.sourceText.indexOf(l.sourceText)).filter(i=>i>=0).sort((a,b)=>a-b)[0];
  const text = firstCTA === undefined ? c.text : compact(c.sourceText.slice(0,firstCTA));
  return {...c,text,links:related};
};
const dateFromTitle = text => {
  const months = {Gennaio:'01',Febbraio:'02',Marzo:'03',Aprile:'04',Maggio:'05',Giugno:'06',Luglio:'07',Agosto:'08',Settembre:'09',Ottobre:'10',Novembre:'11',Dicembre:'12'};
  const m = text.match(/(\d{1,2})\s+(\p{L}+)\s+(\d{4})/u);
  assert.ok(m && months[m[2]],`No fully written date: ${text}`);
  return `${m[3]}-${months[m[2]]}-${m[1].padStart(2,'0')}`;
};
const homeSource = supplement.pages.home.secondary;
const bolognaSource = supplement.pages.bologna.secondary;
const nationalSource = supplement.pages.domani.secondary;

const nationalDays = homeSource.syntheticForecast.days.map((day,index)=>({
  id:`national-${index}`,date:dateFromTitle(record(day.dateTitleRef).text),label:record(day.tabRef).text,
  title:content(day.dateTitleRef),narrative:plainNarrative(day.narrativeRef),sourceRefs:[day.tabRef,day.dateTitleRef,day.narrativeRef],
}));
const dialogs = bolognaSource.hourlyDetailDialogs.map(d=>({
  id:d.sourceDialogId,intervalHours:d.intervalHours,description:content(d.descriptionRef),
  sourceText:record(d.dialogRef).textContent,sourceRefs:[d.dialogRef],
  fields:d.fields.map(f=>({label:f.label,value:f.value,sourceValue:record(f.valueRef).textContent,sourceLabel:record(f.labelRef).textContent,sourceRefs:[f.labelRef,f.valueRef]})),
  directRowRefs:d.directRowRefs,
}));
const gap = bolognaSource.sourceDialogAssociationGaps[0];
assert.equal(gap.sourceDialogIdRequested,'dialog-dettaglio-2h3');
const hourly = normalized.hourly.map((row,index)=>{
  const sourceRow = bolognaSource.airQuality.hourlyMeasures.find(r=>r.hour===row.sourceHour&&r.intervalHours===row.intervalHours&&r.dataImportTs===row.source.timestamp);
  assert.ok(sourceRow,`Missing exact row ${row.sourceHour}/${row.intervalHours}`);
  const r = record(sourceRow.rowRef);
  let detail = dialogs.find(d=>d.directRowRefs.includes(sourceRow.rowRef));
  let association = {method:'source-id',requestedId:`dialog-dettaglio-${r.attributes['data-dialogid']}`,derived:false};
  if (!detail) {
    assert.equal(sourceRow.rowRef,gap.rowRef);
    detail = dialogs.find(d=>d.sourceRefs.includes(gap.candidateDialogRef));
    assert.ok(detail && detail.intervalHours===row.intervalHours);
    association = {method:'derived-matching-3h-row-and-dialog',requestedId:gap.sourceDialogIdRequested,resolvedId:detail.id,derived:true,sourceRefs:[gap.rowRef,gap.candidateDialogRef],evidence:{visibleRowHour:row.sourceHour,intervalHours:row.intervalHours,dialogHeader:compact(detail.sourceText).split('Temp')[0],temperature:row.source.temperature,humidity:row.source.humidity,windDirection:row.source.windDirection,windSpeed:row.source.windSpeed,gustSpeed:row.source.gustSpeed,pressure:row.source.pressure,freezingLevel:row.source.freezingLevel},note:'La fonte richiede 2h3, ma contiene 26h3. Associazione derivata verificando giorno, ora, intervallo e valori; gli ID originali restano documentati.'};
  }
  const probability = detail.fields.find(f=>f.label==='Probabilità di precipitazione');
  const {source,...values} = row;
  return {...values,id:`bologna-${row.date}-${row.time.replace(':','')}-${row.intervalHours}h`,source,sourceRefs:[sourceRow.rowRef],condition:detail.description.text,precipitationProbabilityPercent:number(probability.value),precipitationProbabilitySourceRefs:probability.sourceRefs,detail:{...detail,association},airMeasures:sourceRow.airQualityRefs.map(ref=>content(ref))};
});
const daily = normalized.daily.map(day=>{
  const {source,...values} = day;
  const sourceRefs=Object.entries(records).filter(([,r])=>r.source.document==='bologna'&&r.url?.absoluteUrl===source.sourceUrl&&r.attributes.class?.includes('forecast_day_selector__list__item__link')).map(([ref])=>ref);
  sourceRefs.forEach(ref=>record(ref));
  const escapedUrl=source.sourceUrl.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const anchor=bolognaHTML.match(new RegExp(`<a href="${escapedUrl}" class="forecast_day_selector__list__item__link[\\s\\S]*?<\\/a>`))?.[0];
  assert.ok(anchor,'Daily source selector markup missing');
  const flags=[...anchor.matchAll(/class="[^"]*small-flag_([a-z_]+)[^"]*"/g)].map(m=>m[1]);
  return {...values,source,sourceRefs,symbolFlags:flags,hourly:hourly.filter(r=>r.date===day.date).map(r=>r.id),hasFullDayHourly:false,availableForecastEdition:weather.editionDate};
});
const realtimeRows = Object.entries(records).filter(([,r])=>r.source.document==='bologna'&&r.tag==='tr'&&r.attributes.class?.includes('realtime'));
const realtime = weather.realtime.map((row,index)=>({
  ...row,date:weather.editionDate,observationTime:row.time,live:false,sourceRefs:realtimeRows[index]?[realtimeRows[index][0]]:[],
  temperatureC:number(row.temperature),feelsLikeC:number(row.feelsLike),windDirectionCode:row.wind.match(/^[A-Z]+/)?.[0]||null,
  sourceEvidence:{file:'data/weather.json',jsonPointer:`/realtime/${index}`,sourceDocument:'bologna',sourceSha256:supplement.sourceDocuments.bologna.sha256},
}));
realtimeRows.forEach(([ref])=>record(ref));
const observationRows=[...bolognaHTML.matchAll(/<tr class="[^"]*latest_detection[^"]*"[\s\S]*?<\/tr>/g)].map(m=>m[0]).filter(text=>text.includes('radar-ora'));
assert.equal(observationRows.length,realtime.length);
for (const [index,row] of realtime.entries()) {
  const markup=observationRows[index];
  const winds=[...markup.matchAll(/<(?:span|abbr)[^>]*class="[^"]*wind_kmkn[^"]*"[^>]*>(\d+)<\/(?:span|abbr)>/g)].map(m=>Number(m[1]));
  assert.equal(winds.length,2);
  Object.assign(row,{windKmh:winds[0],gustKmh:winds[1],precipitationDetected:/id="is-raining" data-value="true"/.test(markup),sourceEvidence:{...row.sourceEvidence,htmlFile:'sources/bologna.html',htmlRowClass:'latest_detection',derivation:'Valori separati dalle span wind_kmkn della riga osservazione; nessuna separazione euristica del testo concatenato.'}});
  assert.equal(`${row.windDirectionCode} ${row.windKmh}${row.gustKmh}`,row.wind);
}
const totals = bolognaSource.totals.map(t=>({title:content(t.titleRef),values:t.valueRefs.map(ref=>content(ref)),sourceRefs:[t.sectionRef]}));
const climateAndHistory = bolognaSource.climateAndHistory.map(t=>({title:content(t.titleRef),values:t.paragraphRefs.map(ref=>content(ref)),links:t.linkRefs.map(ref=>link(ref)),sourceRefs:[t.sectionRef]}));
const airCurrent = content(bolognaSource.airQuality.currentRef);
const airMatch = airCurrent.text.match(/^(\d+)\s+(\p{L}+)\s+NO2\s+([\d.]+)\s+PM10\s+([\d.]+)$/u);
assert.ok(airMatch,'Unrecognized source air-quality current widget');
const otherAirDays = bolognaSource.airQuality.otherPublishedDays.map(ref=>{
  const c=content(ref); const m=c.text.match(/^(\p{L}+)\s+(\d+)\s+(.+)$/u); assert.ok(m);
  return {...c,dayLabel:m[1],date:null,index:Number(m[2]),quality:m[3]};
});
const pollen = {
  sourceText:content(bolognaSource.airQuality.sectionRef),selectedLabel:'Assente',
  legend:bolognaSource.airQuality.pollenLegendItems.map(ref=>content(ref)),
  selectionMethod:'Indicatore visivo della fonte: solo il pallino di Assente ha uno stile inline.',
  note:bolognaSource.airQuality.pollenNote,
};
assert.match(bolognaHTML,/<div class="pollini-dot" style="background:#00A0FF">[\s\S]*?Assente/);
const geography = {...content(bolognaSource.location.paragraphRef),fields:bolognaSource.location.fieldsFromSourceText,population:bolognaSource.location.populationSourceText,sourceRefs:[bolognaSource.location.sectionRef,bolognaSource.location.paragraphRef,bolognaSource.location.coordinateAttributeRef]};
geography.sourceRefs.forEach(ref=>record(ref));
const sunMoon = {...content(bolognaSource.sunMoon.sectionRef),editionDate:weather.editionDate,date:null,times:bolognaSource.sunMoon.timeValuesFromSourceText,moonPhase:'Luna calante',dateNote:'Orari pubblicati nella pagina acquisita; la fonte non stampa una data separata per questo widget.'};
const ratingRef=Object.entries(records).find(([,r])=>r.source.document==='bologna'&&r.attributes.class==='responsive-content-container attend-prev')?.[0];
assert.ok(ratingRef);
const ratingContent=content(ratingRef);
const ratingValues=ratingContent.text.match(/Voto medio: ([\d.]+)\/(\d+) Voti totali: (\d+)/);assert.ok(ratingValues);
const userRating={...ratingContent,score:Number(ratingValues[1]),maximum:Number(ratingValues[2]),totalVotes:Number(ratingValues[3]),label:'Voto degli utenti',availability:'source-only',note:'Voto degli utenti acquisito, distinto dall’attendibilità della previsione. Invio del voto non disponibile nella copia locale.'};

const periods = nationalSource.periodMaps.map((period,index)=>{
  const m=period.sourceLabel.match(/^(.+) - (.+), ore (.+)$/);assert.ok(m);
  return {id:['morning','afternoon','evening','night'][index],label:m[1],hours:m[3],date:period.dateContext.dateIsoDerived,sourceLabel:period.sourceLabel,dateDerivation:period.dateContext,weatherMap:image(period.mapRefs[0]),precipitationMap:image(period.mapRefs[1]),sourceRefs:[period.sectionRef,period.labelRef,...period.mapRefs]};
});
const nationalRegions = weather.regions.map((region,index)=>({...region,sourceRefs:[nationalSource.regions[index]],sourceText:record(nationalSource.regions[index]).textContent}));
const update = content(nationalSource.updateRefs[0]);
const updatedMatch=update.text.match(/Aggiornamento del (\d{2}\/\d{2}\/\d{2}) (\d{2})\.(\d{2}) - Prossimo: (\d{2}\/\d{2}\/\d{2}) (\d{2})\.(\d{2})/);assert.ok(updatedMatch);
const dateDmy=text=>{const [day,month,year]=text.split('/');return `20${year}-${month}-${day}`;};
Object.assign(update,{date:dateDmy(updatedMatch[1]),time:`${updatedMatch[2]}:${updatedMatch[3]}`,sourceNextUpdate:{date:dateDmy(updatedMatch[4]),time:`${updatedMatch[5]}:${updatedMatch[6]}`,scheduledInLocalCopy:false}});

const news = weather.news.map((article,index)=>{
  const sourceLinks = Object.entries(records).filter(([,r])=>r.source.document==='home'&&r.url?.absoluteUrl===article.url);
  sourceLinks.forEach(([ref])=>record(ref));
  const column = homeSource.newsColumns.find(ref=>sourceLinks.some(([,r])=>r.source.xpath.startsWith(record(ref).source.xpath+'/')));
  const columnRecord=column?record(column):null;
  const category=columnRecord?.text.match(/^(News Meteo|News Extra)/)?.[1]||'Carosello';
  // Publication metadata is in source text nodes, separate from carousel time.
  const publicationNodes = columnRecord ? sourceLinks.filter(([,r])=>r.source.xpath.startsWith(columnRecord.source.xpath+'/')).flatMap(([,r])=>{
    const li=r.source.xpath.match(/^(.*\/li\[\d+\])\//)?.[1];
    return li?supplement.pages.home.textNodeInventory.filter(n=>n.sourceXPath.startsWith(li+'/p/')&&/\d{1,2}\/\d{1,2}\/\d{4}/.test(n.text)):[];
  }):[];
  const publicationNode=publicationNodes[0];
  assert.ok(publicationNode,`Missing publication metadata for ${article.title}`);
  const timestampText=publicationNode.text;
  const dateMatch=timestampText.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  const timeMatch=timestampText.match(/ore\s+(\d{1,2}:\d{2})/);
  const columnTitle=sourceLinks.find(([,r])=>r.source.xpath.startsWith(columnRecord.source.xpath+'/')&&r.source.xpath.includes('/h3/'))?.[1].text;
  return {...article,title:columnTitle||article.title,sourceCarouselTitle:article.title,id:`news-${index}`,category,image:asset(article.localImage),sourceImageUrl:article.image,publishedDate:dateMatch?`${dateMatch[3]}-${dateMatch[2].padStart(2,'0')}-${dateMatch[1].padStart(2,'0')}`:null,publishedTime:timeMatch?timeMatch[1]:null,publication:{text:timestampText,source:{document:'home',file:supplement.sourceDocuments.home.file,sha256:supplement.sourceDocuments.home.sha256,xpath:publicationNode.sourceXPath}},sourceRefs:sourceLinks.map(([ref])=>ref),availability:'external'};
});

const directoryLabel = r => r.attributes['aria-label'] || ({'select-europa':'Nazioni europee','select-mondo':'Zone del mondo'}[r.attributes.name]) || r.attributes.name || 'Elenco di fonte';
const directories = Object.entries(supplement.pages).flatMap(([page,p])=>p.directories.map((d,index)=>{
  const select = record(d.selectRef);
  return {id:`${page}-directory-${index}`,page,label:directoryLabel(select),sourceRefs:[d.selectRef],availability:'source-only',note:'Elenco originale conservato. Le altre pagine locali non sono acquisite; i valori non sono eseguiti come handler.',options:d.options.map(ref=>{
    const r=record(ref);return {label:r.text,value:r.attributes.value??null,selected:'selected' in r.attributes,sourceRefs:[ref],availability:r.text==='Milano'?'local':'source-only'};
  })};
}));
for (const [label,key] of [['Seleziona regione','region'],['Seleziona provincia','province']]) {
  const selected=directories.find(d=>d.page==='bologna'&&d.label===label)?.options.find(o=>o.selected);
  assert.ok(selected);geography[key]={label:selected.label,code:selected.value,sourceRefs:selected.sourceRefs};
}
const navigation = [{id:'home',label:'Home',href:'index.html'},{id:'milano',label:'Milano',href:'milano.html'},{id:'national',label:'Italia domani',href:'domani.html'}];
const serviceGroups = [];
// Group each direct source menu item, preserving all subordinate services.
const topItems=Object.entries(records).filter(([,r])=>r.source.document==='home'&&r.tag==='li'&&r.source.xpath.match(/\/header\/nav\[1\]\/ul\[3\]\/li\[\d+\]$/));
for (const [ref] of topItems) {
  const links=linksWithin(ref);if (!links.length) continue;
  serviceGroups.push({label:links[0].label,links,sourceRefs:[ref],availability:'external'});
}
if (!serviceGroups.length) {
  const navLinks=supplement.pages.home.links.filter(ref=>record(ref).source.xpath.includes('/header/'));
  serviceGroups.push({label:'Servizi iLMeteo',links:uniqueLinks(navLinks),availability:'external'});
}
const footerRef=supplement.pages.home.footer;
const footer={...content(footerRef),links:linksWithin(footerRef),images:imagesWithin(footerRef)};
const sourceLinksByPage=Object.fromEntries(Object.entries(supplement.pages).map(([page,p])=>[page,{
  header:uniqueLinks(p.links.filter(ref=>record(ref).source.xpath.includes('/header/'))),
  footer:uniqueLinks(p.links.filter(ref=>record(ref).source.xpath.includes('/footer/'))),
  content:uniqueLinks(p.links.filter(ref=>!record(ref).source.xpath.includes('/header/')&&!record(ref).source.xpath.includes('/footer/'))),
}]));
const regionControls=uniqueLinks(supplement.pages.domani.links.filter(ref=>record(ref).tag==='area'));
const regionLinks=regionControls.filter(l=>l.availability==='external');
const sourceRegionControls=regionControls.filter(l=>l.availability==='unavailable');
assert.equal(regionLinks.length,20);assert.equal(sourceRegionControls.length,20);
const cityServiceDirectory=directories.find(d=>d.page==='bologna'&&d.label==='Scopri di più');
const serviceUrlsLiteral=bolognaHTML.match(/var urls = (\['https:\/\/www\.ilmeteo\.it\/webcam\/bologna'[\s\S]*?\]);/);
assert.ok(serviceUrlsLiteral,'Missing source city service literal list');
const cityServiceUrls=JSON.parse(serviceUrlsLiteral[1].replaceAll("'",'"'));
assert.equal(cityServiceUrls.length,7);
const cityServiceLinks=cityServiceDirectory.options.filter(o=>/^\d+$/.test(o.value)&&Number(o.value)<cityServiceUrls.length).map(o=>({label:o.label,href:cityServiceUrls[Number(o.value)],sourceUrl:cityServiceUrls[Number(o.value)],availability:'external',sourceRefs:o.sourceRefs,sourceEvidence:{file:'sources/bologna.html',sha256:supplement.sourceDocuments.bologna.sha256,line:bolognaHTML.slice(0,serviceUrlsLiteral.index).split('\n').length,method:'Literal URL array extraction without executing JavaScript.'}}));

const radarRef=homeSource.runtimeEvidence.radarMapRef;
const radarRecord=record(radarRef);
const radarImages=supplement.runtimeFragments['home-rendered-map'].images;
// Parse only the captured fragment's tag/attribute hierarchy. This is not a
// browser emulation: visibility and opacity come from its explicit inline DOM.
const radarDOMStates=new Map();
const radarAncestors=[];
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
for (const token of widgets.map.replace(/<!--[\s\S]*?-->/g,'').matchAll(/<(\/?)([a-z][a-z\d:-]*)\b([^>]*?)>/gi)) {
  const tag=token[2].toLowerCase();
  if (token[1]) {
    const index=radarAncestors.findLastIndex(node=>node.tag===tag);
    assert.ok(index>=0,`Unbalanced captured radar closing tag ${tag}`);
    radarAncestors.splice(index);
    continue;
  }
  const attributes=Object.fromEntries([...token[3].matchAll(/([a-z\d_:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/gi)].map(a=>[a[1].toLowerCase(),a[2]??a[3]??a[4]??'']));
  const styles=Object.fromEntries((attributes.style||'').split(';').filter(Boolean).map(pair=>{const i=pair.indexOf(':');return [pair.slice(0,i).trim().toLowerCase(),pair.slice(i+1).trim().toLowerCase()];}));
  const node={tag,attributes,styles};
  if (tag==='img'&&attributes.class?.split(/\s+/).includes('leaflet-tile')) {
    const chain=[...radarAncestors,node];
    const visible=!chain.some(n=>n.styles.display==='none'||['hidden','collapse'].includes(n.styles.visibility)||'hidden' in n.attributes);
    const opacity=chain.reduce((value,n)=>{
      if (n.styles.opacity===undefined) return value;
      const nOpacity=Number(n.styles.opacity);assert.ok(Number.isFinite(nOpacity)&&nOpacity>=0&&nOpacity<=1);
      return value*nOpacity;
    },1);
    const ancestorStyles=chain.filter(n=>n.styles.display!==undefined||n.styles.opacity!==undefined||n.styles.visibility!==undefined||'hidden' in n.attributes).map(n=>({tag:n.tag,display:n.styles.display??null,opacity:n.styles.opacity===undefined?null:Number(n.styles.opacity),visibility:n.styles.visibility??null,hiddenAttribute:'hidden' in n.attributes}));
    assert.ok(!radarDOMStates.has(attributes.src),'Duplicate captured tile source');
    radarDOMStates.set(attributes.src,{visible,opacity,ancestorStyles});
  }
  if (!voidTags.has(tag)&&!token[3].trimEnd().endsWith('/')) radarAncestors.push(node);
}
assert.equal(radarAncestors.length,0,'Captured radar tag hierarchy did not close');
const radarTiles=radarImages.filter(ref=>record(ref).attributes.class?.includes('leaflet-tile')).map(ref=>{
  const r=record(ref);const m=r.attributes.style?.match(/translate3d\(\s*(-?[\d.]+)px,\s*(-?[\d.]+)px,/);assert.ok(m);
  const state=radarDOMStates.get(r.attributes.src);assert.ok(state,`Missing captured ancestor state ${ref}`);
  return {...image(ref),x:Number(m[1]),y:Number(m[2]),width:256,height:256,layer:r.attributes.src.includes('tile.openstreetmap.org')?'base':'radar',visible:state.visible,opacity:state.opacity,visibilityEvidence:{sourceFile:'sources/rendered-widgets.json',jsonPointer:'/map',sourceXPath:r.source.xpath,ancestorStyles:state.ancestorStyles,method:'Visible when no captured ancestor or image has inline display:none, visibility:hidden/collapse or hidden attribute. Opacity is the product of captured inline ancestor and image opacity values.'}};
});
assert.equal(radarDOMStates.size,radarTiles.length);
assert.equal(radarTiles.length,28);
assert.equal(radarTiles.filter(tile=>tile.visible&&tile.layer==='base').length,4);
assert.equal(radarTiles.filter(tile=>tile.visible&&tile.layer==='radar').length,4);
assert.equal(radarTiles.filter(tile=>!tile.visible).length,20);
assert.ok(radarTiles.filter(tile=>tile.layer==='base').every(tile=>tile.opacity===1));
assert.ok(radarTiles.filter(tile=>tile.layer==='radar').every(tile=>tile.opacity===0.8));
const radarTimestamp=radarRecord.text.match(/(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})/);assert.ok(radarTimestamp);
const radar={sourceRefs:[radarRef],sourceText:radarRecord.textContent,label:'Radar (passato+futuro)',date:weather.editionDate,time:radarTimestamp[2],sourceTimestamp:radarTimestamp[0],sourceState:'previsione',width:425,height:460,tiles:radarTiles,attribution:attributions.mapAttribution,attributionUrl:attributions.mapAttributionSource,live:false,note:attributions.mode};
const mapFamilies=[
  {id:'weather',label:'Tempo',filename:'italybig'},
  {id:'precipitation',label:'Precipitazioni',filename:'italyprecbig',suffix:'.neve',ext:'png'},
  {id:'snow',label:'Neve',filename:'italysnowbig',ext:'png'},
  {id:'temperature',label:'Temperature',filename:'italytempbig'},
  {id:'wind-sea',label:'Venti-Mari',filename:'italyseabig'},
].map(f=>({id:f.id,label:f.label,editionDate:weather.editionDate,maps:[['day','Giornata',''],['morning','Mattina','_m'],['afternoon','Pomeriggio','_p'],['evening','Sera','_s'],['night','Notte','1_n']].flatMap(([id,label,suffix])=>{
  const ending=`/${f.filename}${suffix}${f.suffix||''}.${f.ext||'jpg'}`;
  const a=assetManifest.assets.find(a=>a.url.endsWith(ending));return a?[{id,label,asset:asset(a.file),date:null,editionDate:weather.editionDate,dateNote:'Risorsa acquisita con la Home. Il filename non viene trattato come data pubblicata.'}]:[];
})}));
const smallMapContainer=homeSource.smallForecastMaps[0];
const smallMaps=imagesWithin(smallMapContainer);

const data = {
  schemaVersion:1,
  edition:{date:weather.editionDate,label:'8 ottobre 2026',timeZone:'Europe/Rome',live:false,capturedAt:sourceManifest.pages.home.capturedAt,notice:'Edizione acquisita l’8 ottobre 2026 · copia didattica congelata',source:'iLMeteo.it'},
  brand:{name:'iLMeteo',logo:asset('https://www.ilmeteo.it/assets/responsive_layout/logo_ilmeteo_search.png'),weatherSprite:asset('assets/c0cceccd7403-weather_sprite.png'),weatherSymbols:{'3':{x:-122,y:0,width:60,height:60},'4':{x:-183,y:0,width:60,height:60},'104':{x:-1342,y:0,width:60,height:60},'109':{x:-1708,y:0,width:60,height:60}},license:assetManifest.license},
  shared:{navigation,serviceGroups,footer,directories,sourceLinksByPage,searchPlaces:[{name:'Milano',href:'milano.html',availability:'local'}]},
  home:{headline:content(homeSource.headlineRef),summary:content(homeSource.summaryRef),nationalDays,nationalAttribution:content(homeSource.syntheticForecast.attributionRef),news,mapFamilies,smallMaps,radar,services:linksWithin(homeSource.serviceMenuRef),video:{...content(homeSource.videoRef),availability:'unavailable',reason:'Video remoto non acquisito nella copia locale.'}},
  bologna:{city:weather.city,date:weather.editionDate,update:weather.update,author:weather.author,daily,hourly,realtime,narrative:content(bolognaSource.forecastParagraphRef),fullNarrative:content(bolognaSource.forecastNarrativeRef),reliability:{indicator:content(bolognaSource.reliability.indicatorRef),explanation:content(bolognaSource.reliability.explanationRef),percent:daily[0].forecastReliabilityPercent},meteorologist:{attribution:content(bolognaSource.meteorologist.attributionRef),photo:image(bolognaSource.meteorologist.photoRef),profileUrl:bolognaSource.meteorologist.profileUrl.absoluteUrl},geography,sunMoon,airQuality:{current:{...airCurrent,index:Number(airMatch[1]),quality:airMatch[2],NO2:airMatch[3],PM10:airMatch[4],unit:null},otherPublishedDays:otherAirDays,unitNote:bolognaSource.airQuality.unitNote},pollen,totals,climate:climateAndHistory[0],history:climateAndHistory[1],tools:{...content(bolognaSource.forecastToolsRef),links:linksWithin(bolognaSource.forecastToolsRef),availability:'source-only'},services:{...content(bolognaSource.cityServicesRef),links:linksWithin(bolognaSource.cityServicesRef),cityServiceLinks},webcams:{...content(bolognaSource.webcamStripRef),images:imagesWithin(bolognaSource.webcamStripRef),links:linksWithin(bolognaSource.webcamStripRef)},dialogs},
  national:{scope:'Italia',date:nationalDays[1].date,title:nationalDays[1].title,update,summary:content(nationalSource.summaryRef),regions:nationalRegions,fullDayMap:image(nationalSource.fullDayMapRef),periods,regionLinks,sourceRegionControls,days:nationalDays,sourceDayNavigation:content(nationalSource.dayNavigationRef)},
  semantics:{...normalized.semantics,precipitation:'Descrizione testuale di fonte; la probabilità di precipitazione è un campo orario separato presente nei dialoghi acquisiti.',precipitationProbability:'Probabilità di precipitazione pubblicata nel dettaglio del proprio giorno, ora e intervallo. Distinta dall’attendibilità della previsione e dalla grandine.',sourceHourlyDate:'Data ricostruita dalla sequenza visibile, separatamente per 1h e 3h. Il dato data-import_ts rimane opaco e preservato.',missingDailyReliability:'Un campo vuoto è non pubblicato: non equivale a zero.',unacquiredDays:'Il riepilogo locale di sette giorni non equivale a una tabella oraria completa dei giorni futuri.',sourceOnly:'Contenuti acquisiti di servizi senza comportamento remoto locale. Handler e script originali restano solo nelle fonti immutate.',airUnits:bolognaSource.airQuality.unitNote,airDates:'Le etichette Lunedì/Martedì/Mercoledì del widget aria non hanno date di calendario nel corpus: data=null.'},
  limits:weather.limits,
};
data.bologna.userRating=userRating;

// Required value/coverage checks protect meaning, rather than mirroring output markup.
assert.equal(daily.length,7);assert.equal(hourly.length,10);assert.equal(dialogs.length,10);
assert.deepEqual(hourly.filter(r=>r.intervalHours===1).map(r=>r.precipitationProbabilityPercent),[50,11,0,0,0,0,0]);
assert.deepEqual(hourly.filter(r=>r.intervalHours===3).map(r=>r.precipitationProbabilityPercent),[11,11,0]);
assert.deepEqual(daily.map(d=>[d.minimumC,d.maximumC]),[[17,25],[16,21],[15,21],[13,22],[15,21],[11,22],[10,22]]);
assert.equal(daily[0].forecastReliabilityPercent,50);assert.equal(daily[1].forecastReliabilityPercent,49);
assert.ok(daily.slice(2).every(d=>d.forecastReliabilityPercent===null));
assert.equal(hourly[0].hailProbabilityPercent,3);assert.equal(hourly[0].windKmh,8);assert.equal(hourly[0].gustKmh,25);
assert.equal(hourly.find(r=>r.sourceHour==='24').date,'2026-10-09');
assert.equal(hourly.find(r=>r.sourceHour==='24').time,'00:00');
assert.ok(hourly.filter(r=>['1','2'].includes(r.sourceHour)).every(r=>r.date==='2026-10-09'));
const derived=hourly.filter(r=>r.detail.association.derived);assert.equal(derived.length,1);assert.equal(derived[0].detail.id,'dialog-dettaglio-26h3');
for (const row of hourly) {
  const field = label => row.detail.fields.find(f=>f.label===label)?.value;
  assert.equal(number(field('Temperatura')),row.temperatureC);
  assert.equal(number(field('Umidità rel.')),row.humidityPercent);
  assert.equal(number(field('Grandine')),row.hailProbabilityPercent);
  assert.equal(number(field('Pressione')),number(row.source.pressure));
  assert.equal(number(field('Quota 0°C')),number(row.source.freezingLevel));
  assert.equal(field('Precipitazioni'),row.source.precipitation);
  const wm=field('Vento').match(/^([A-Z]+) (\d+)\/(\d+) km\/h/);assert.ok(wm);
  assert.deepEqual([wm[1],Number(wm[2]),Number(wm[3])],[row.windDirectionCode,row.windKmh,row.gustKmh]);
  assert.equal(row.detail.intervalHours,row.intervalHours);
}
assert.equal(periods.length,4);assert.equal(periods.flatMap(p=>[p.weatherMap,p.precipitationMap]).length,8);
assert.equal(periods[3].date,'2026-10-10');assert.equal(periods[3].sourceLabel,'NOTTE - meteo dopodomani, ore 2-5');
assert.equal(nationalDays.length,7);assert.equal(news.length,16);assert.equal(new Set(news.map(n=>n.url)).size,16);
assert.equal(news.filter(n=>n.category==='News Meteo').length,8);assert.equal(news.filter(n=>n.category==='News Extra').length,8);
assert.ok(news.every(n=>n.publishedDate==='2026-10-08'&&n.publishedTime));
assert.equal(news[4].publishedTime,'18:28');assert.match(news[4].sourceCarouselTitle,/ore 19:56/);
assert.equal(cityServiceLinks.length,7);assert.equal(serviceGroups.length,9);
assert.equal(userRating.score,4.9);assert.equal(userRating.totalVotes,55364);
assert.equal(geography.population,'380.181 abitanti');assert.equal(sunMoon.moonPhase,'Luna calante');
assert.equal(airCurrent.text,'7 Discreta NO2 17.7 PM10 10.7');assert.ok(otherAirDays.every(d=>d.date===null));
assert.equal(pollen.legend.length,4);assert.equal(pollen.selectedLabel,'Assente');
assert.equal(radar.sourceTimestamp,'08/10/2026, 19:20:00');assert.ok(radarTiles.length>0);
assert.equal(data.home.summary.text,weather.homeSummary);assert.equal(data.national.summary.text,weather.tomorrowSummary);
assert.deepEqual(daily.map(d=>d.symbolFlags),[['pioggia'],['pioggia'],[],[],[],[],[]]);
const spriteCSS='assets/0f1e28f30645-responsive_template.css';
const spriteSource=await fs.readFile(path.join(lab,spriteCSS),'utf8');
for (const [symbol,position] of Object.entries(data.brand.weatherSymbols)) assert.ok(spriteSource.includes(`.ss-small${symbol}{background-position:${position.x}px ${position.y}}`),`Sprite position ${symbol} no longer matches source CSS`);
data.brand.weatherSymbolsSource={file:spriteCSS,sha256:hash(spriteSource),method:'Exact CSS background-position and original sprite image; coordinates carry no invented forecast condition.'};
const unsafeUIValues=[];
const scanUIStrings=(value,location='')=>{
  if (value && typeof value==='object') for (const [key,item] of Object.entries(value)) scanUIStrings(item,`${location}.${key}`);
  else if (typeof value==='string'&&/(?:\bfunction\s*\(|<script|javascript:|%cfw-)/.test(value)) unsafeUIValues.push(location);
};
scanUIStrings(data);assert.deepEqual(unsafeUIValues,[],'Script, handler or source placeholder leaked into adapter UI values');

const inputs=['data/weather.json','data/normalized.json','data/supplementary.json','sources/manifest.json','assets/manifest.json','assets/attributions.json','sources/rendered-widgets.json'];
const inputHashes=Object.fromEntries(await Promise.all(inputs.map(async file=>[file,hash(await fs.readFile(path.join(lab,file)))])));
for (const source of Object.values(supplement.sourceDocuments)) assert.equal(hash(await fs.readFile(path.join(lab,source.file))),source.sha256,`Source changed: ${source.file}`);
assert.equal(inputHashes['sources/manifest.json'],supplement.provenance.sourceManifestSha256);
assert.equal(inputHashes['assets/manifest.json'],supplement.provenance.assetManifestSha256);
for (const file of assetFiles) {
  const manifest=assetManifest.assets.find(a=>a.file===file);
  assert.equal(hash(await fs.readFile(path.join(lab,file))),manifest.sha256,`Asset changed: ${file}`);
}
const provenance=Object.fromEntries([...usedRefs].sort().map(ref=>[ref,{...records[ref].source,sourceState:records[ref].state.classification}]));
data.sources={pages:Object.fromEntries(Object.entries(sourceManifest.pages).map(([page,p])=>[page,{url:p.url,capturedAt:p.capturedAt,file:p.file,sha256:p.sha256}])),inputHashes,references:provenance,sourceInventory:'../data/supplementary.json',assetManifest:'../assets/manifest.json',attributions:'../assets/attributions.json'};
const output=`/* Generated by scripts/build-redesign-data.mjs; content only, no network dependency. */\nwindow.ILMETEO_DATA = ${JSON.stringify(data,null,2)};\n`;
const sandbox={window:{}};vm.runInNewContext(output,sandbox);
assert.equal(sandbox.window.ILMETEO_DATA.bologna.hourly.length,10);
assert.equal(sandbox.window.ILMETEO_DATA.national.periods[3].date,'2026-10-10');
const contract={schemaVersion:1,builder:'esempi/ilmeteo-lab/scripts/build-redesign-data.mjs',output:'esempi/ilmeteo-lab/redesign/data.js',global:'window.ILMETEO_DATA',execution:'Browser classic script; no fetch, CDN, imports, HTML or DOM dependencies. Works from file://.',inputHashes,outputSha256:hash(output),coverage:{localDays:daily.length,hourlyRows:hourly.length,hourly1h:hourly.filter(r=>r.intervalHours===1).length,hourly3h:hourly.filter(r=>r.intervalHours===3).length,dialogs:dialogs.length,dialogFields:dialogs.reduce((n,d)=>n+d.fields.length,0),derivedDialogMappings:derived.length,nationalDays:nationalDays.length,nationalPeriods:periods.length,nationalPeriodMaps:8,news:news.length,geographicFields:geography.fields.length,solarLunarTimes:sunMoon.times.length,airOtherDayLabels:otherAirDays.length,pollenLegend:pollen.legend.length,environmentTotals:totals.length,climateHistory:climateAndHistory.length,directories:directories.length,directoryOptions:directories.reduce((n,d)=>n+d.options.length,0),serviceGroups:serviceGroups.length,footerLinks:footer.links.length,sourceReferences:usedRefs.size,activeAssets:assetFiles.size,radarTiles:radarTiles.length},api:{edition:'Captured edition date/timezone/live=false; acquisition time separate from published updates.',brand:'Authentic logo and attribution.',shared:'navigation, serviceGroups, footer, directories, sourceLinksByPage, searchPlaces.',home:'headline, summary, nationalDays, nationalAttribution, news, mapFamilies, smallMaps, radar, services, video.',bologna:'daily, hourly, realtime, narrative, fullNarrative, reliability, meteorologist, geography, sunMoon, airQuality, pollen, totals, climate, history, tools, services, webcams, dialogs.',national:'date, title, update, summary, regions, fullDayMap, periods, regionLinks, days, sourceDayNavigation.',sources:'Page hashes, input hashes and provenance references (no source code or raw record dump).',content:'Named prose fields retain text, sourceText and sourceRefs; exact dialog fields retain label/value/sourceValue/sourceLabel.',asset:'src relative to redesign; originalPath at lab root; sourceUrl/hash/sourceRefs/license preserved.',link:'label/href/sourceUrl/sourceRefs, availability local/external/unavailable; handler values never executed.'},missingFields:[{field:'bologna.daily[2..6].forecastReliabilityPercent',reason:'Not published in acquired daily summaries.',value:null},{field:'bologna.airQuality.current.unit',reason:'No pollutant units printed by source widgets.',value:null},{field:'bologna.airQuality.otherPublishedDays[].date',reason:'Source weekday labels lack dates; no calendar deduction.',value:null},{field:'other localities and future-day full hourly tables',reason:'Not acquired; source-only or external availability.'},{field:'remote account, geolocation, advertising, reports, video, alternate forecast models',reason:'Remote behaviors not acquired; source labels and links retained.'}],derivedMappings:derived.map(r=>({rowId:r.id,...r.detail.association})),assertions:{passed:true,values:true,coverage:true,sourceHashes:true,assetHashes:true,browserClassicExecution:true,networkDependencies:0,uiCodePresent:false}};
Object.assign(contract.coverage,{newsWithPublicationMetadata:news.filter(n=>n.publishedDate&&n.publishedTime).length,externalRegionLinks:regionLinks.length,unavailableSourceRegionControls:sourceRegionControls.length,cityServiceLinks:cityServiceLinks.length,homeMapFamilies:mapFamilies.length,homeMapAssets:mapFamilies.reduce((n,f)=>n+f.maps.length,0),dailyRainFlags:daily.filter(d=>d.symbolFlags.includes('pioggia')).length});
Object.assign(contract.coverage,{visibleRadarTiles:radarTiles.filter(tile=>tile.visible).length,hiddenRadarTiles:radarTiles.filter(tile=>!tile.visible).length});
contract.radarDisplayDerivation={sourceFile:'sources/rendered-widgets.json',jsonPointer:'/map',sourceSha256:inputHashes['sources/rendered-widgets.json'],method:'Inline attributes of each captured image and all captured ancestors; no filename-time inference and no frame synthesis.',totalTiles:radarTiles.length,visibleBaseTiles:4,visibleRadarTiles:4,hiddenRadarTiles:20,baseOpacity:1,radarOpacity:0.8,visibleSourceUrls:radarTiles.filter(tile=>tile.visible).map(tile=>tile.sourceUrl)};
contract.api.home += ' radar.tiles preserve all28source records; render only visible=true, applying source-derived opacity.';
contract.api.bologna += ' userRating holds the frozen user score, separately from forecast reliability.';
contract.api.national += ' sourceRegionControls preserves the twenty source script-controls as unavailable.';
contract.api.brand += ' weatherSprite/weatherSymbols contain authentic sprite coordinates, verified against source CSS.';
contract.missingFields.push({field:'bologna.sunMoon.date',reason:'Source widget has no independently printed date; editionDate is preserved.',value:null},{field:'home.mapFamilies[].maps[].date',reason:'Captured asset filename is not treated as an explicit published date; editionDate is preserved.',value:null});
contract.assertions.exactNewsTimestampAndCategory=true;
contract.assertions.sourceCSSCoordinates=true;
contract.assertions.unsafeUIValues=unsafeUIValues.length;
contract.assertions.radarAncestorDisplayAndOpacity=true;
await fs.mkdir(path.join(lab,'redesign'),{recursive:true});
await fs.mkdir(path.join(repo,'reports/ilmeteo-lab'),{recursive:true});
await fs.writeFile(path.join(lab,'redesign/data.js'),output);
await fs.writeFile(path.join(repo,'reports/ilmeteo-lab/data-contract.json'),JSON.stringify(contract,null,2)+'\n');
console.log(JSON.stringify({output:contract.output,outputSha256:contract.outputSha256,coverage:contract.coverage,assertions:contract.assertions}));
