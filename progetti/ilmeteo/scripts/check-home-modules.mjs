import {createExportedPreview} from './exported-preview.mjs';
/* Homepage integration check in an isolated exported preview. */
import assert from 'node:assert/strict';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright-chromium';

const out = path.resolve('reports/ilmeteo-home-comparison');
const recaptureWorld320 = process.argv.includes('--recapture-world-320');
const toolsOnly = process.argv.includes('--tools-only');
const brandingOnly = process.argv.includes('--branding-only');
const captureSummaryActions = process.argv.includes('--capture-summary-actions');
const videoOnly = process.argv.includes('--video-only');
const newsOnly = process.argv.includes('--news-only');
await mkdir(out, {recursive:true});
const preview = await createExportedPreview();
const url = preview.url;
const report = {status:'running', cases:[], errors:[], source:'https://www.ilmeteo.it/', sourceObserved:'2026-10-13', observedAdFormats:['970x250','300x600','300x100']};
const data = JSON.parse(await readFile(new URL('../data/supplementary.json',import.meta.url)));
let browser;
async function open(width, options={}) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',...options});
  if(options.javaScriptEnabled!==false) await context.route('**/world-weather-map.js',async route=>{
    const response=await route.fetch();
    const probe='const createWorldTestMap=L.map;L.map=(container,options)=>{const map=createWorldTestMap(container,options);if(container.id==="world-weather-map")window.__ilmeteoWorldTestMap=map;return map;};\n';
    await route.fulfill({response,body:probe+await response.text()});
  });
  const page=await context.newPage();
  page.on('pageerror',error=>report.errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)report.errors.push(`${response.status()} ${response.url()}`);});
  page.on('request',request=>{if(!request.url().startsWith(new URL(url).origin)&&!request.url().startsWith('data:'))report.errors.push(`Remote request: ${request.url()}`);});
  await page.goto(url);
  await page.locator('h1').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  return {context,page};
}
async function checkFab(page,width) {
  const fab=page.getByRole('link',{name:'Segnala il tempo nella tua città',exact:true});
  assert.equal(await fab.count(),1,'The compact FAB keeps its complete accessible name');
  const bounds=await fab.boundingBox();
  assert(bounds&&bounds.width>=44&&bounds.height>=48,'FAB keeps its touch target');
  if(width<=767) assert(Math.abs(bounds.width-44)<1&&Math.abs(bounds.height-48)<1,`FAB is always compact at ${width}px`);
  const covered=await page.locator('#weather-report-fab a').evaluate(link=>{
    const fab=link.getBoundingClientRect();
    return [...document.querySelectorAll('.home-frontpage h3,.block_news__col__list__item h3')].filter(title=>{
      const box=title.getBoundingClientRect();
      return box.width&&box.height&&box.bottom>0&&box.top<innerHeight&&box.left<fab.right&&box.right>fab.left&&box.top<fab.bottom&&box.bottom>fab.top;
    }).map(title=>title.textContent.trim());
  });
  assert.deepEqual(covered,[],`FAB leaves visible news titles readable at ${width}px`);
}
async function checkTools(page,width) {
  const menuTrigger=page.getByRole('button',{name:'Apri menu The weather forecast',exact:true});
  await menuTrigger.click();
  assert.equal(await page.evaluate(()=>document.querySelector('.side_menu').contains(document.activeElement)),true,'Opening the WF menu moves focus into its contents');
  await page.keyboard.press('Escape');
  assert.equal(await menuTrigger.evaluate(button=>button===document.activeElement),true,'Escape returns focus to the visible menu trigger');
  const tools=page.locator('#home-tools');
  await tools.scrollIntoViewIfNeeded();
  await page.evaluate(()=>document.activeElement?.blur());
  await page.waitForTimeout(250);
  assert.equal(await tools.getByRole('heading',{name:'Altri strumenti meteo'}).count(),1);
  assert.equal(await tools.getByRole('link').count(),3);
  const bounds=await tools.locator('.home-tools__link').evaluateAll(links=>links.map(link=>{
    const box=link.getBoundingClientRect();return {x:box.x,y:box.y,width:box.width,height:box.height};
  }));
  for(const box of bounds) assert(box.width>=44&&box.height>=44,'Tools keep usable pointer and keyboard targets');
  if(width>=768) assert(bounds.every(box=>Math.abs(box.y-bounds[0].y)<1),'Tools share a row on larger screens');
  else assert(bounds[0].y<bounds[1].y&&bounds[1].y<bounds[2].y,'Tools stack on phones');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,`Tools do not overflow at ${width}px`);
  if([1280,897,375,320].includes(width)) await tools.screenshot({path:path.join(out,`tools-${width}.png`)});
  const dialog=page.locator('#snapshot-unavailable');
  for(const [id,phrase] of [['record',/valori estremi non sono state acquisite/],['webcam',/webcam non sono state acquisite/]]) {
    const link=tools.locator(`#weather-tool-${id}`);
    assert.match(await link.innerText(),/Non disponibile nella copia/);
    await link.focus();await page.keyboard.press('Enter');
    assert.equal(await dialog.isVisible(),true);
    assert.match(await dialog.locator('p').innerText(),phrase);
    await page.keyboard.press('Escape');
    await dialog.waitFor({state:'hidden'});
    assert.equal(await link.evaluate(element=>document.activeElement===element),true,'Dialog closing returns to its tool');
  }
  await tools.locator('#weather-tool-radar').focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('#map').getAttribute('data-weather-layer'),'9');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'map-layer-tab-9');
  assert.equal(await dialog.isVisible(),false);
}
async function checkToolsOnly() {
  const result={status:'running',cases:[],errors:report.errors};
  for(const width of [1280,897,768,375,320]) {
    const {context,page}=await open(width);
    try {
      await checkTools(page,width);
      if(width===1280) {
        await page.emulateMedia({media:'print'});
        assert.equal(await page.locator('#home-tools').isVisible(),false,'Print omits the whole interactive section');
      }
      result.cases.push({width,tools:3,keyboard:'passed',radar:'passed',unavailableMessages:'passed',overflow:0});
    } finally {await context.close();}
  }
  const {context,page}=await open(375,{javaScriptEnabled:false});
  try {
    assert.equal(await page.locator('#home-tools h2').isVisible(),true);
    assert.equal(await page.locator('#home-tools .home-tools__icon').count(),3,'Icons remain visible without script');
    assert.equal(await page.locator('#weather-tool-radar').getAttribute('href'),'#home-weather-map');
    assert.match(await page.locator('#weather-tool-record').innerText(),/Non disponibile nella copia/);
    assert.match(await page.locator('#weather-tool-webcam').innerText(),/Non disponibile nella copia/);
    result.cases.push({javaScript:false,visibleLabels:'passed',localRadarAnchor:'passed'});
  } finally {await context.close();}
  assert.deepEqual(report.errors,[]);
  result.status='passed';
  await writeFile(path.join(out,'tools-verification.json'),JSON.stringify(result,null,2)+'\n');
  console.log('Weather tools: layout, local Radar, specific messages, keyboard, no-script and print passed.');
}
async function checkBrandingOnly() {
  const result={status:'running',cases:[],errors:report.errors};
  for(const width of [1280,897,375,320]) for(const file of ['index','milano','domani']) {
    const {context,page}=await open(width);
    try {
      if(file!=='index') await page.goto(new URL(`${file}.html`,url).href);
      await page.evaluate(()=>document.fonts.ready);
      assert.match(await page.title(),/The weather forecast/);
      assert.equal(await page.getByRole('button',{name:'Apri menu The weather forecast',exact:true}).count(),1);
      const footer=page.locator('.site-footer');
      assert.equal(await footer.count(),1);
      assert.equal(await footer.getByRole('img',{name:'The weather forecast',exact:true}).count(),1);
      assert.doesNotMatch(await footer.innerText(),/Srl|P\.IVA|449669|05184350287|Mefin/i);
      assert.equal(await footer.locator('.main_footer__project').count(),0);
      assert.match(await footer.innerText(),/Fonte dei contenuti.*iLMeteo.it/s);
      for(const id of ['index.html','milano.html','domani.html']) assert.equal(await footer.locator(`a[href="${id}"]`).count()>=1,true);
      assert.equal(await page.locator('.whatsapp_channel,.google_favorite').count(),0,'The redesign does not advertise channels of the acquired brand');
      if(file==='index') {
        const summaryHeading=page.locator('.home-summaries > .home-section-heading');
        assert.equal((await summaryHeading.locator('p').innerText()).replace(/\s+/g,' '),'A cura di Elia Guarnieri');
        const portrait=summaryHeading.getByRole('img',{name:'Ritratto di Elia Guarnieri'});
        await portrait.scrollIntoViewIfNeeded();await portrait.evaluate(img=>img.decode());
        assert.match(await portrait.getAttribute('src'),/people\/elia-guarnieri-v1\/portrait.webp/);
        assert.deepEqual(await portrait.evaluate(img=>[img.naturalWidth,img.naturalHeight]),[640,640]);
        const portraitBox=await portrait.boundingBox();
        assert.equal(portraitBox.width,112);assert.equal(portraitBox.height,112);
        const banner=page.locator('.whatsapp-banner');
        assert.equal(await banner.count(),1);
        assert.equal(await banner.getByRole('heading',{name:'The weather forecast',exact:true}).count(),1);
        assert.equal(await banner.locator('a,button,input,[role="button"],[role="link"],[tabindex]').count(),0,'The requested WhatsApp graphic has no links or controls');
        await banner.scrollIntoViewIfNeeded();await banner.locator('img').evaluate(img=>img.decode());
        await page.evaluate(()=>document.activeElement?.blur());await page.waitForTimeout(250);
        await banner.screenshot({path:path.join(out,`whatsapp-${width}.png`)});
        await summaryHeading.screenshot({path:path.join(out,`curator-${width}.png`)});
        if(captureSummaryActions) {
          await page.mouse.move(width-1,1);
          await page.locator('#summary-panel-0 .home-summary-links').screenshot({path:path.join(out,`summary-actions-${width}.png`)});
          await page.locator('#summary-panel-0 .home-summary-links a').nth(1).focus();
          await page.keyboard.press('Enter');
          assert.equal(await page.locator('#snapshot-unavailable').isVisible(),true);
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
          await page.locator('#summary-tab-4').click();
          await page.waitForTimeout(250);
          await page.locator('#summary-panel-4 .home-summary-links').screenshot({path:path.join(out,`summary-actions-long-${width}.png`)});
          await page.locator('#summary-tab-1').click();
          await page.locator('#summary-panel-1 .home-summary-links a').first().click();
          await page.waitForURL('**/domani.html');
          await page.goto(url);
        }
      }
      const icon=page.locator('link[rel="icon"]');
      assert.match(await icon.getAttribute('href'),/the-weather-forecast\/mark-color.svg/);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,`Branding overflow: ${file} ${width}`);
      if(file==='index'||[1280,320].includes(width)) {
        await page.locator('.main_menu').screenshot({path:path.join(out,`brand-header-${file}-${width}.png`)});
        await footer.scrollIntoViewIfNeeded();await footer.locator('img').evaluate(img=>img.decode());
        await page.evaluate(()=>document.activeElement?.blur());await page.waitForTimeout(250);
        await footer.screenshot({path:path.join(out,`brand-footer-${file}-${width}.png`)});
      }
      if(file==='index'&&width===1280) {
        await page.emulateMedia({media:'print'});
        assert.equal(await page.locator('.whatsapp-banner').isVisible(),false,'Print omits the social graphic');
        assert.equal(await page.locator('.home-summaries > .home-section-heading p').innerText(),'A cura di Elia Guarnieri');
        assert.equal(await page.getByRole('img',{name:'Ritratto di Elia Guarnieri'}).isVisible(),true,'The curator portrait remains in print');
        const image=footer.locator('img');await image.evaluate(img=>img.decode());
        assert.match(await image.evaluate(img=>img.currentSrc),/wordmark-color.svg/);
        await footer.screenshot({path:path.join(out,'brand-footer-print.png')});
      }
      result.cases.push({file,width,title:'passed',logo:'passed',footer:'passed',overflow:0});
    } finally {await context.close();}
  }
  const {context,page}=await open(375,{javaScriptEnabled:false});
  try {assert.equal(await page.locator('.site-footer').isVisible(),true);assert.match(await page.title(),/The weather forecast/);assert.equal(await page.locator('.whatsapp-banner').isVisible(),true);assert.equal(await page.locator('.home-summaries > .home-section-heading p').innerText(),'A cura di Elia Guarnieri');const portrait=page.getByRole('img',{name:'Ritratto di Elia Guarnieri'});await portrait.scrollIntoViewIfNeeded();await portrait.evaluate(img=>img.decode());assert.equal(await portrait.isVisible(),true);}
  finally {await context.close();}
  assert.deepEqual(report.errors,[]);result.status='passed';
  await writeFile(path.join(out,'brand-verification.json'),JSON.stringify(result,null,2)+'\n');
  console.log('Weather branding: three pages, logo, names, company removal, source attribution, responsive footer, no-script and print passed.');
}
async function checkNewsOnly() {
  const catalog=JSON.parse(await readFile(new URL('../data/home-news-art.json',import.meta.url)));
  const result={status:'running',cases:[],errors:report.errors};
  for(const [width,options] of [[1280,{}],[897,{}],[375,{}],[320,{javaScriptEnabled:false}],[1280,{print:true}]]) {
    const {context,page}=await open(width,options);
    try {
      if(options.print) await page.emulateMedia({media:'print'});
      const items=page.locator('.block_news__col__list__item');
      assert.equal(await items.count(),16);
      for(const art of catalog.assets) {
        const image=items.nth(art.newsIndex-1).locator('img');
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img=>img.decode());
        assert.equal(await image.getAttribute('src'),art.runtime);
        assert.deepEqual(await image.evaluate(img=>[img.naturalWidth,img.naturalHeight]),[720,540]);
      }
      const opening=page.locator('.home-frontpage__stories img');
      for(let i=0;i<3;i++) assert.equal(await opening.nth(i).getAttribute('src'),catalog.assets[i].runtime);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
      await page.locator('.block_news').scrollIntoViewIfNeeded();
      await page.mouse.move(width-1,1);
      await page.evaluate(()=>document.activeElement?.blur());
      const columns=page.locator('.block_news__col');
      for(let i=0;i<await columns.count();i++) await columns.nth(i).screenshot({path:path.join(out,`news-${width}-${options.print?'print-':''}${i+1}.png`)});
      if(!options.print&&options.javaScriptEnabled!==false) {
        await items.nth(0).locator(':scope > a').focus();await page.keyboard.press('Enter');
        assert.equal(await page.locator('#snapshot-unavailable').isVisible(),true);
        await page.keyboard.press('Escape');
      }
      result.cases.push({width,print:!!options.print,javaScript:options.javaScriptEnabled!==false,replaced:catalog.assets.length,opening:3,images:'passed',overflow:0});
    } finally {await context.close();}
  }
  assert.deepEqual(report.errors,[]);result.status='passed';
  await writeFile(path.join(out,'news-verification.json'),JSON.stringify(result,null,2)+'\n');
  console.log(`Editorial news images: ${catalog.assets.length} replacements, shared opening, responsive layout, keyboard, no-script and print passed.`);
}
async function checkVideoOnly() {
  const result={status:'running',cases:[],errors:report.errors};
  for(const width of [1280,897,375,320]) {
    const {context,page}=await open(width);
    try {
      const section=page.locator('.home-video'),link=section.locator('.home-video__preview'),image=link.locator('img');
      await section.scrollIntoViewIfNeeded();await image.evaluate(img=>img.decode());
      assert.match(await image.getAttribute('src'),/presenter-studio-v2\/presenter-studio.webp/);
      assert.deepEqual(await image.evaluate(img=>[img.naturalWidth,img.naturalHeight]),[1663,945]);
      const poster=await link.locator('.home-video__poster').boundingBox(),play=await link.locator('.home-video__play').boundingBox();
      assert(Math.abs(play.x+play.width/2-poster.x-poster.width/2)<1&&Math.abs(play.y+play.height/2-poster.y-poster.height/2)<1,'Play is centered over the image');
      assert.equal(await link.locator('.home-video__play').getAttribute('aria-hidden'),'true');
      assert.equal(await link.locator('button,a').count(),0,'The overlay does not introduce a nested control');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
      await page.evaluate(()=>document.activeElement?.blur());await page.waitForTimeout(250);
      await section.screenshot({path:path.join(out,`video-${width}.png`)});
      await link.focus();await page.keyboard.press('Enter');
      assert.equal(await page.locator('#snapshot-unavailable').isVisible(),true,'The acquired video destination retains its local availability message');
      await page.keyboard.press('Escape');
      result.cases.push({width,image:'passed',play:'centered',keyboard:'passed',overflow:0});
    } finally {await context.close();}
  }
  assert.deepEqual(report.errors,[]);result.status='passed';
  await writeFile(path.join(out,'video-verification.json'),JSON.stringify(result,null,2)+'\n');
  console.log('Edited video poster: local image, centered play, responsive layout and keyboard passed.');
}
async function checkMilanoFallback(page,state) {
  const link=page.locator('#world-milano-link');
  assert.equal(await link.count(),1,`${state}: one actionable Milano fallback`);
  assert.equal(await link.isVisible(),true,`${state}: fallback remains visible`);
  assert.equal(await link.getAttribute('href'),'milano.html',`${state}: fallback stays local`);
  assert.equal(await link.getAttribute('data-live-href'),null,`${state}: fallback is not intercepted as unavailable`);
}
const worldState=page=>page.evaluate(()=>{
  const map=window.__ilmeteoWorldTestMap,bounds=map.getBounds();
  return {zoom:map.getZoom(),width:map.getSize().x,west:bounds.getWest(),east:bounds.getEast(),south:bounds.getSouth(),north:bounds.getNorth()};
});
async function checkWorldOverview(page,width) {
  const state=await worldState(page);
  assert(state.west<=-180+1e-5&&state.east>=180-1e-5&&state.south<=-90+1e-5&&state.north>=90-1e-5,`The complete world, including poles, fits at ${width}px: ${JSON.stringify(state)}`);
  assert.equal(await page.locator('#world-weather-map .world-map-country').count(),242,'The world contains every catalogued country');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,`World module overflow at ${width}px`);
  return state;
}
async function checkWorldSelection(page,id,name) {
  assert.equal(await page.locator('#world-weather-map').getAttribute('data-selected-country'),id);
  const country=page.locator(`.world-map-country[data-country-id="${id}"]`);
  assert.equal(await country.getAttribute('aria-pressed'),'true');
  assert((await country.getAttribute('class')).split(/\s+/).includes('is-selected'));
  assert.equal(await page.locator('#world-selected-country').innerText(),name);
  await checkMilanoFallback(page,`selected ${name}`);
}
async function checkWorldModule(page,width) {
  const world=page.locator('#international-world'),map=page.locator('#world-weather-map');
  await map.locator('.world-map-country').first().waitFor();
  await world.scrollIntoViewIfNeeded();
  await page.evaluate(()=>document.activeElement?.blur());
  await page.waitForFunction(()=>{
    const box=document.querySelector('.world-discovery').getBoundingClientRect();
    const fab=document.querySelector('#weather-report-fab a').getBoundingClientRect();
    return !(fab.left<box.right&&fab.right>box.left&&fab.top<box.bottom&&fab.bottom>box.top);
  });
  const overview=await checkWorldOverview(page,width);
  const country=page.locator('#world-country-search'),results=page.locator('#world-country-results');
  const countrySubmit=page.locator('#world-country-form button[type="submit"]');
  const city=page.locator('#world-city-search'),citySubmit=page.locator('#world-city-form button[type="submit"]');
  const countryStatus=page.locator('#world-country-status'),searchStatus=page.locator('#world-search-status'),cityStatus=page.locator('#world-city-status');
  const reset=page.locator('#world-map-reset');
  assert.equal(await country.getAttribute('role'),'combobox');
  assert.equal(await country.getAttribute('aria-controls'),'world-country-results');
  assert.equal(await results.getAttribute('role'),'listbox');
  assert.equal(await country.getAttribute('list'),null,'The enhanced combobox replaces the native datalist');
  for(const status of [countryStatus,searchStatus,cityStatus]) assert.equal(await status.getAttribute('aria-live'),'polite');
  for(const id of ['world-map-zoom-in','world-map-zoom-out','world-map-reset']) assert.equal(await page.locator(`#${id}`).isEnabled(),true);
  assert.match(await page.locator('#world-selected-country').innerText(),/Scegli un paese/);
  await checkMilanoFallback(page,'world initial');
  if([1280,897,375,320].includes(width)) await world.screenshot({path:path.join(out,`world-${width}.png`)});
  await country.fill('');await countrySubmit.click();
  assert.equal(await results.isVisible(),true,'An empty country search reveals the available countries');
  assert.equal(await results.getByRole('option').count(),242);
  await country.press('Escape');
  assert.equal(await results.isVisible(),false);
  assert.equal(await country.getAttribute('aria-expanded'),'false');
  await country.fill('zzzzzzzz');
  assert.equal(await results.getByRole('option').count(),0);
  assert.match(await searchStatus.innerText(),/Nessun|non.*trovat/i);
  assert.equal(await country.inputValue(),'zzzzzzzz','No-result feedback preserves the query');
  await checkMilanoFallback(page,'country no results');
  await country.fill('France');
  assert.equal(await results.getByRole('option',{name:'Francia',exact:true}).count(),1,'English aliases find their Italian country');
  await country.press('Escape');
  assert.equal(await results.isVisible(),false);
  assert.equal(await country.inputValue(),'France','Escape dismisses suggestions without discarding the country query');
  await country.press('ArrowDown');
  assert(await country.getAttribute('aria-activedescendant'),'Arrow navigation announces its active option');
  await country.press('Enter');
  await checkWorldSelection(page,'FRA','Francia');
  assert.equal(await results.isVisible(),false,'Selection dismisses the country suggestions');
  if([1280,375].includes(width)) {
    await country.evaluate(element=>element.blur());
    await world.screenshot({path:path.join(out,`world-selected-${width}.png`)});
  }
  await city.fill('Parigi');await citySubmit.click();
  assert.match(await cityStatus.innerText(),/Parigi/);
  assert.match(await cityStatus.innerText(),/non.*acquisit/i);
  assert.equal(await city.inputValue(),'Parigi');
  assert.equal(page.url(),url,'Unacquired city does not open an unrelated forecast');
  await checkMilanoFallback(page,'unacquired city');
  await country.fill('Frància');
  assert.equal(await results.getByRole('option',{name:'Francia',exact:true}).count(),1,'Country search folds Italian accents');
  await country.press('ArrowDown');await country.press('Enter');
  await checkWorldSelection(page,'FRA','Francia');
  assert.equal(await city.inputValue(),'Parigi','Country selection preserves the typed city');
  await city.fill('Milano');await citySubmit.click();
  assert.match(await cityStatus.innerText(),/Milano.*non.*acquisit/i);
  assert.equal(page.url(),url,'Milano in a selected foreign country remains explicitly unavailable');
  await checkMilanoFallback(page,'Milano outside Italy');
  await city.fill('');await citySubmit.click();
  assert.match(await cityStatus.innerText(),/Scrivi|Inserisci/i);
  assert.equal(await city.evaluate(element=>document.activeElement===element),true,'Empty city search returns focus to its field');
  await checkMilanoFallback(page,'empty city');
  await reset.click();
  const point=await page.evaluate(()=>window.__ilmeteoWorldTestMap.latLngToContainerPoint([46.5,2.5]));
  await map.click({position:{x:point.x,y:point.y}});
  await checkWorldSelection(page,'FRA','Francia');
  await city.fill('Parigi');
  const beforeZoom=await worldState(page);
  await page.locator('#world-map-zoom-in').click();
  assert((await worldState(page)).zoom>beforeZoom.zoom,'World zoom control changes the geographic scale');
  await checkWorldSelection(page,'FRA','Francia');
  assert.equal(await city.inputValue(),'Parigi','Manual zoom preserves the city draft');
  await reset.click();
  assert.equal(await map.getAttribute('data-selected-country'),null);
  assert.equal(await map.locator('.world-map-country[aria-pressed="true"]').count(),0);
  assert.equal(await country.inputValue(),'');assert.equal(await city.inputValue(),'');
  assert.equal(await results.isVisible(),false);
  assert.match(await page.locator('#world-selected-country').innerText(),/Scegli un paese/);
  assert.equal((await checkWorldOverview(page,width)).zoom,overview.zoom,'Reset restores the world overview');
  await checkMilanoFallback(page,'world reset');
  await country.fill('Fiji');await country.press('ArrowDown');await country.press('Enter');
  await checkWorldSelection(page,'FJI','Figi');
  const fiji=await worldState(page);
  assert(fiji.east-fiji.west<60&&fiji.zoom>overview.zoom,'Fiji selection fits its main islands rather than the whole world');
  await reset.click();
}
async function recaptureWorldEvidence() {
  const capture={mode:'world-320-only',status:'running',url,initialViewport:{width:320,height:900},screenshots:[],errors:report.errors};
  let context;
  const state=page=>page.evaluate(()=>{
    const active=document.activeElement,link=document.querySelector('.skip-link'),style=getComputedStyle(link);
    const rect=link.getBoundingClientRect(),region=document.querySelector('#international-world').getBoundingClientRect();
    return {
      activeElement:{tag:active?.tagName,id:active?.id,className:active?.getAttribute('class')},
      viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},
      region:{x:region.x,y:region.y,width:region.width,height:region.height},
      skipLink:{focused:link.matches(':focus'),focusVisible:link.matches(':focus-visible'),
        transform:style.transform,translate:style.translate,visibility:style.visibility,display:style.display,
        opacity:style.opacity,position:style.position,transitionDuration:style.transitionDuration,transitionDelay:style.transitionDelay,
        bounds:{x:rect.x,y:rect.y,width:rect.width,height:rect.height,top:rect.top,bottom:rect.bottom,left:rect.left,right:rect.right},
        outsideViewport:rect.bottom<=0||rect.top>=innerHeight||rect.right<=0||rect.left>=innerWidth},
    };
  });
  try {
    const opened=await open(320);context=opened.context;const page=opened.page;
    await page.waitForFunction(()=>document.querySelector('#international-world')?.dataset.worldReady==='true');
    await page.evaluate(()=>document.fonts.ready);
    const world=page.locator('#international-world');
    await world.scrollIntoViewIfNeeded();
    const region=await world.boundingBox();
    const height=Math.max(900,Math.ceil(region.height)+64);
    if(height!==900) await page.setViewportSize({width:320,height});
    capture.captureMethod='locator screenshot with viewport tall enough for the complete region; width remains 320px';
    capture.viewportHeightNote=height===900?'The section already fits the initial viewport height.':`Viewport height increased from 900px to ${height}px to avoid screenshot-driven resizing; no product styles changed.`;
    await world.evaluate(element=>element.scrollIntoView({block:'start',behavior:'instant'}));
    await page.evaluate(async()=>{
      document.activeElement?.blur();
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      const style=getComputedStyle(document.querySelector('.skip-link'));
      const milliseconds=value=>value.trim().endsWith('ms')?parseFloat(value):parseFloat(value)*1000;
      const durations=style.transitionDuration.split(',').map(milliseconds),delays=style.transitionDelay.split(',').map(milliseconds);
      const settle=Math.max(0,...durations.map((duration,index)=>duration+(delays[index%delays.length]||0)));
      await new Promise(resolve=>setTimeout(resolve,settle+50));
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    });
    capture.beforeScreenshot=await state(page);
    assert.equal(capture.beforeScreenshot.skipLink.focused,false,'Skip link is not focused during world recapture');
    assert.equal(capture.beforeScreenshot.skipLink.outsideViewport,true,'Unfocused skip link is outside the viewport');
    assert.equal(capture.beforeScreenshot.viewport.width,320);
    assert(capture.beforeScreenshot.region.height<=capture.beforeScreenshot.viewport.height,'The complete region fits without screenshot resizing');
    await world.screenshot({path:path.join(out,'world-320.png')});capture.screenshots.push('world-320.png');
    await page.screenshot({path:path.join(out,'viewport-world-320.png')});capture.screenshots.push('viewport-world-320.png');
    capture.afterScreenshot=await state(page);
    assert.equal(capture.afterScreenshot.skipLink.focused,false);
    assert.equal(capture.afterScreenshot.skipLink.outsideViewport,true);
    assert.deepEqual(report.errors,[]);
    capture.status='passed';
  } catch(error) {capture.status='failed';capture.failure=error.stack;throw error;}
  finally {await writeFile(path.join(out,'world-capture-320.json'),JSON.stringify(capture,null,2)+'\n');await context?.close();}
}
try {
  browser=await chromium.launch({headless:true});
  if(newsOnly) await checkNewsOnly();
  else if(videoOnly) await checkVideoOnly();
  else if(brandingOnly) await checkBrandingOnly();
  else if(toolsOnly) await checkToolsOnly();
  else if(recaptureWorld320) await recaptureWorldEvidence();
  else {
  for(const width of [1280,768,375,320]) {
    const {context,page}=await open(width);
    if([1280,375].includes(width)) {
      await page.locator('.home-ad--billboard img').evaluate(img=>img.decode());
      await page.screenshot({path:path.join(out,`home-${width}.png`)});
    }
    await checkFab(page,width);
    await checkTools(page,width);
    assert.equal(await page.locator('#main_menu [aria-current="page"]').count(),1,'Only Home is current in the primary navigation');
    assert.equal(await page.locator('#main_menu [aria-current="page"]').innerText(),'Home');
    assert.equal(await page.locator('#main_menu [aria-current="page"]').getAttribute('href'),'index.html');
    const notice=page.locator('#weather-map-notice');
    assert.equal(await notice.isVisible(),true,'The illustrative map has a visible declaration');
    assert.match(await notice.innerText(),/Simulazione didattica.*valori illustrativi/);
    assert((await page.locator('#home-weather-map').getAttribute('aria-describedby')).split(/\s+/).includes('weather-map-notice'));
    const radarLinks=page.locator('a[data-local-radar]');
    assert.equal(await radarLinks.count(),2,'Navigation and weather tools share the local Radar');
    for(let index=0;index<await radarLinks.count();index++) {
      await page.getByRole('tab',{name:'Tempo',exact:true}).click();
      assert.equal(await page.locator('#map').getAttribute('data-weather-layer'),'0');
      assert.equal(await radarLinks.nth(index).getAttribute('href'),'#home-weather-map');
      await radarLinks.nth(index).click();
      assert.equal(await page.locator('#map').getAttribute('data-weather-layer'),'9');
      assert.equal(await page.getByRole('tab',{name:'Radar',exact:true}).getAttribute('aria-selected'),'true');
      assert.equal(await page.evaluate(()=>document.activeElement.id),'map-layer-tab-9','Radar navigation transfers focus to the selected tab');
      assert.equal(await page.locator('#snapshot-unavailable').isVisible(),false,'Local Radar avoids the unavailable-service dialog');
    }
    if([1280,375].includes(width)) await page.locator('#home-weather-map').screenshot({path:path.join(out,`weather-${width}.png`)});
    assert.equal(await page.locator('.home-ad').count(),6);
    assert.equal(await page.locator('[data-summary-panel]').count(),7);
    assert.equal(await page.locator('.block_news__col__list__item').count(),16);
    assert.equal(await page.locator('.block_news__col__list__item a').count(),16,'Each news item has one named link');
    for(const [i,day] of data.pages.home.secondary.syntheticForecast.days.entries()) {
      const expected=data.records[day.narrativeRef].text.split(' Previsioni meteo complete')[0];
      assert.equal(await page.locator(`#summary-panel-${i} > p`).textContent(),expected);
    }
    for(const id of ['booklet','corso','caffe','atlante','laboratorio','tipografia']) {
      const unit=page.locator(`[data-promotion="${id}"]`);
      await unit.scrollIntoViewIfNeeded();
      await unit.locator('img').evaluate(img=>img.decode());
      await page.waitForFunction(id => {
        const ad=document.querySelector(`[data-promotion="${id}"] a`).getBoundingClientRect();
        const fab=document.querySelector('#weather-report-fab a').getBoundingClientRect();
        return !(fab.left < ad.right && fab.right > ad.left && fab.top < ad.bottom && fab.bottom > ad.top);
      }, id);
      const box=await unit.locator('a').boundingBox();
      assert(box.width>0&&box.height>0&&box.width<=width, `${id}: invalid ad bounds at ${width}`);
      await checkFab(page,width);
      if(width===1280) {
        const expected={booklet:[970,250],corso:[300,600],caffe:[300,250],atlante:[728,90],laboratorio:[300,100],tipografia:[728,90]}[id];
        assert(Math.abs(box.width-expected[0])<1&&Math.abs(box.height-expected[1])<1, `${id}: ${box.width}×${box.height}`);
        await unit.screenshot({path:path.join(out,`ad-${id}-desktop.png`)});
      }
      if(width===375&&['booklet','atlante'].includes(id)) {
        const src=await unit.locator('img').evaluate(img=>img.currentSrc);
        assert(src.includes('mobile-v4'),`${id}: mobile creative missing`);
        await unit.screenshot({path:path.join(out,`ad-${id}-mobile.png`)});
      }
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,`overflow at ${width}`);
    await page.locator('#summary-tab-0').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#summary-tab-1').getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#summary-panel-1').isVisible(),true);
    assert.equal(await page.locator('#summary-panel-0').isVisible(),false);
    await page.keyboard.press('End');
    assert.equal(await page.locator('#summary-tab-6').getAttribute('aria-selected'),'true');
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#summary-tab-0').getAttribute('aria-selected'),'true');
    await checkWorldModule(page,width);
    await page.getByRole('link',{name:'Accedi',exact:true}).click();
    assert.equal(await page.locator('#snapshot-unavailable').isVisible(),true);
    await page.keyboard.press('Escape');
    await page.locator('#snapshot-unavailable').waitFor({state:'hidden'});
    const footer=page.locator('.main_footer');
    await footer.scrollIntoViewIfNeeded();
    await footer.locator('img').evaluate(img=>img.decode());
    await footer.screenshot({path:path.join(out,`footer-${width}.png`)});
    if([1280,375].includes(width)) {
      await page.evaluate(()=>document.activeElement?.blur());
      await page.locator('.home-daily-region').screenshot({path:path.join(out,`daily-${width}.png`)});
      await page.locator('.home-secondary-reading').screenshot({path:path.join(out,`resources-${width}.png`)});
    }
    if(width===1280) {
      await page.emulateMedia({media:'print'});
      assert.equal(await page.locator('.home-ad:visible').count(),0,'Print omits ads');
      assert.equal(await page.locator('[data-summary-panel]:visible').count(),7,'Print keeps every acquired day');
      assert.equal(await notice.isVisible(),true,'Print preserves the simulation declaration');
      assert.equal(await page.locator('#world-weather-map').isVisible(),false,'Print omits the interactive world');
      assert.equal(await page.locator('#world-map-fallback').isVisible(),true,'Print retains the static world');
      assert.equal(await page.locator('#world-map-fallback').evaluate(image=>image.complete&&image.naturalWidth>0),true);
      await page.screenshot({path:path.join(out,'print.png'),fullPage:true});
      await page.locator('#international-world').screenshot({path:path.join(out,'world-print.png')});
      await footer.screenshot({path:path.join(out,'footer-print.png')});
      await page.pdf({path:path.join(out,'print.pdf'),format:'A4',printBackground:true});
    }
    report.cases.push({width,ads:6,sourceNarratives:7,news:16,overflow:0,keyboard:'passed',worldCountries:242,worldSearch:'passed',worldSelection:'passed',internationalFallback:'passed',radarNavigation:'passed',simulationNotice:'passed',fab:'passed'});
    await context.close();
  }
  const tablet=await open(897);
  await checkWorldModule(tablet.page,897);
  const wide=await worldState(tablet.page);
  await tablet.page.setViewportSize({width:375,height:900});
  await tablet.page.waitForFunction(width=>window.__ilmeteoWorldTestMap.getSize().x<width,wide.width);
  const narrow=await checkWorldOverview(tablet.page,375);
  assert(narrow.zoom<wide.zoom,'The world overview adapts to a narrower viewport');
  await tablet.page.locator('#world-country-search').fill('France');
  await tablet.page.locator('#world-country-search').press('ArrowDown');
  await tablet.page.locator('#world-country-search').press('Enter');
  await tablet.page.locator('#world-map-zoom-in').click();
  const manual=await worldState(tablet.page);
  await tablet.page.setViewportSize({width:897,height:900});
  await tablet.page.waitForFunction(width=>window.__ilmeteoWorldTestMap.getSize().x>width,manual.width);
  assert.equal((await worldState(tablet.page)).zoom,manual.zoom,'Resize preserves a manual country zoom');
  await checkWorldSelection(tablet.page,'FRA','Francia');
  await tablet.page.locator('#world-map-reset').click();
  await checkWorldOverview(tablet.page,897);
  await tablet.page.locator('.main_footer').scrollIntoViewIfNeeded();
  await tablet.page.locator('.main_footer img').evaluate(img=>img.decode());
  assert.equal(await tablet.page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,'No footer overflow at 897px');
  await tablet.page.locator('.main_footer').screenshot({path:path.join(out,'footer-897.png')});
  await tablet.context.close();
  const {context,page}=await open(375,{javaScriptEnabled:false});
  assert.equal(await page.locator('[data-summary-panel]:visible').count(),7,'No-script keeps every day');
  assert.equal(await page.locator('.home-ad a').count(),6,'No-script ads remain links');
  assert.equal(await page.locator('#weather-map-notice').isVisible(),true,'No-script preserves the simulation declaration');
  await page.locator('#main_menu a[data-local-radar]').click();
  assert.equal(new URL(page.url()).hash,'#home-weather-map','No-script Radar opens the local map');
  assert.equal(await page.locator('#home-weather-map .weather-map-fallback').isVisible(),true);
  assert.equal(await page.locator('#world-weather-map').isVisible(),false,'No-script omits the inactive interactive world');
  const fallback=page.locator('#world-map-fallback');
  assert.equal(await fallback.isVisible(),true,'No-script keeps the static world');
  assert.equal(await fallback.evaluate(image=>image.complete&&image.naturalWidth>0),true);
  assert.equal(await page.locator('#world-country-search').getAttribute('list'),'world-country-options');
  assert.equal(await page.locator('#world-country-options option').count(),242,'No-script retains the native country chooser');
  await page.locator('#search-main').fill('Roma');
  await page.locator('#search-main').press('Enter');
  await page.waitForURL('**/index.html?citta=Roma#locality-fallback');
  assert.equal(await page.locator('#locality-fallback').isVisible(),true,'No-script search explains the limitation rather than showing another city');
  assert.equal(await page.locator('#locality-fallback a').getAttribute('href'),'milano.html','Available Milano is an explicit recovery link');
  for(const id of ['world-map-zoom-in','world-map-zoom-out','world-map-reset']) assert.equal(await page.locator(`#${id}`).isEnabled(),false);
  await checkMilanoFallback(page,'no JavaScript');
  await checkFab(page,375);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
  await Promise.all([page.waitForURL(new URL('milano.html',url).href),page.locator('#world-milano-link').click()]);
  report.cases.push({javaScript:false,sourceNarratives:7,ads:6,overflow:0});
  await context.close();
  const local=await open(1280);
  for(const country of [null,'Italia']) {
    await local.page.goto(url);
    await local.page.locator('#world-weather-map .world-map-country').first().waitFor();
    if(country) {
      await local.page.locator('#world-country-search').fill(country);
      await local.page.locator('#world-country-search').press('ArrowDown');
      await local.page.locator('#world-country-search').press('Enter');
      await checkWorldSelection(local.page,'ITA','Italia');
    }
    await local.page.locator('#world-city-search').fill('Milano');
    await Promise.all([local.page.waitForURL(new URL('milano.html',url).href),local.page.locator('#world-city-form button[type="submit"]').click()]);
  }
  await local.page.goto(url);
  await Promise.all([local.page.waitForURL(new URL('milano.html',url).href),local.page.locator('#world-milano-link').click()]);
  report.cases.push({localMilanoSearch:['world','ITA'],internationalFallbackLink:'passed',worldResize:'passed'});
  await local.context.close();
  const original=await readFile(new URL('../originale/index.html',import.meta.url),'utf8');
  const originalRadarLinks=[...original.matchAll(/<a\b[^>]*\bdata-live-href="https:\/\/www\.ilmeteo\.it\/portale\/radar-italia"[^>]*>/g)];
  assert(originalRadarLinks.length>0,'The original retains its acquired Radar links');
  assert(originalRadarLinks.every(([tag])=>/\bhref="#snapshot-unavailable"/.test(tag)&&!/\bdata-local-radar\b/.test(tag)),'Original Radar links do not become the local illustrative map');
  assert.deepEqual(report.errors,[]);
  report.status='passed';
  }
} catch(error) {report.status='failed'; report.failure=error.stack; throw error;}
finally {
  if(!recaptureWorld320&&!toolsOnly&&!brandingOnly&&!videoOnly&&!newsOnly) await writeFile(path.join(out,'verification.json'),JSON.stringify(report,null,2)+'\n');
  await browser?.close();
  await preview.close();
}
if(!toolsOnly&&!brandingOnly&&!videoOnly&&!newsOnly) console.log(recaptureWorld320?'World 320px evidence recaptured with an unfocused skip link outside the viewport.':'Home modules: six promotional creatives, archived content, keyboard, search states, responsive creatives, print, no-script and isolated Pages export passed.');
