import {createExportedPreview} from './exported-preview.mjs';
/* Verify the six Leaflet views in an isolated browser on the Pages export. */
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright-chromium';

const output=path.resolve('reports/ilmeteo-leaflet-layers');await mkdir(output,{recursive:true});
const screenshots=!process.argv.includes('--no-screenshots');
const preview = await createExportedPreview();
const url = preview.url;
const report={status:'running',cases:[],errors:[]};
let browser;
const record=(name,details={})=>report.cases.push({name,...details});
const names=['Tempo','Precipitazioni','Neve','Temperature','Venti-Mari','Radar'];
const kinds=['0','1','4','2','3','9'];
const state=page=>page.evaluate(()=>{
  const map=window.__weatherMaps.map;
  return {zoom:map.getZoom(),center:map.getCenter(),size:map.getSize(),kind:document.querySelector('#map').dataset.weatherLayer};
});
async function open(width,options={}) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',...options});
  await context.route('**/weather-map-base.js',async route=>{
    const response=await route.fetch();
    const prefix='const originalMap=L.map;L.map=(container,options)=>{const map=originalMap(container,options);(window.__weatherMaps||={})[container.id]=map;return map;};\n';
    await route.fulfill({response,body:prefix+await response.text()});
  });
  const page=await context.newPage();
  page.on('pageerror',error=>report.errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)report.errors.push(`${response.status()} ${response.url()}`);});
  page.on('request',request=>{if(!request.url().startsWith(new URL(url).origin)&&!request.url().startsWith('data:'))report.errors.push(`Remote request: ${request.url()}`);});
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  if(options.javaScriptEnabled!==false)await page.locator('#map .forecast-map-region').first().waitFor();
  return {context,page};
}
try {
  browser=await chromium.launch({headless:true});
  for(const width of [1280,897,390,320]) {
    const {context,page}=await open(width);
    const initial=await state(page);
    assert.equal(await page.locator('.leaflet-container').count(),2,'one primary map and one daily map');
    assert.equal(await page.locator('#map .forecast-map-region').count(),20);
    assert.equal(await page.locator('#forecast-interactive .forecast-map-region').count(),20);
    const sameBase=await page.evaluate(()=>{
      const features=map=>{const result=[];map.eachLayer(layer=>{if(layer.feature?.properties.code)result.push(layer.feature);});return result;};
      const primary=features(window.__weatherMaps.map),daily=features(window.__weatherMaps['forecast-interactive']);
      return primary.every((feature,index)=>feature===daily[index]);
    });
    assert(sameBase,'both maps use the exact same regional source features');
    for(let index=0;index<names.length;index++) {
      await page.getByRole('tab',{name:names[index],exact:true}).click();
      await page.waitForFunction(kind=>document.querySelector('#map').dataset.weatherLayer===kind,kinds[index]);
      const selected=await state(page);
      assert.equal(selected.zoom,initial.zoom);assert.deepEqual(selected.center,initial.center);
      const root=page.locator('#map');
      assert.match(await root.getAttribute('aria-label'),/Non mostra dati meteorologici reali/);
      assert.equal(await page.locator('#bigmap-container').getAttribute('aria-labelledby'),`map-layer-tab-${kinds[index]}`);
      assert.equal(await root.locator('.forecast-map-region[tabindex="0"]').count(),20);
      assert.equal(await page.locator('.radar-player__toggle').isVisible(),kinds[index]==='9');
      assert.equal(await page.locator('.radar-player__timeline').isVisible(),kinds[index]==='9');
      if(kinds[index]==='0')assert.equal(await root.locator('.forecast-weather-marker').count(),20);
      if(kinds[index]==='1'||kinds[index]==='2')assert.equal(await root.locator('.weather-value-marker').count(),20);
      if(kinds[index]==='4')assert.equal(await root.locator('.weather-snow-patch').count(),6);
      if(kinds[index]==='3'){assert.equal(await root.locator('.weather-wind-marker').count(),20);assert.equal(await root.locator('.weather-sea-marker').count(),5);}
      if(kinds[index]==='9')assert(await root.locator('.weather-radar-patch').count()>20);
      const layout=await root.evaluate(viewport=>{
        const bounds=viewport.getBoundingClientRect();
        const controls=[...viewport.querySelectorAll('.forecast-map-tool')].filter(element=>getComputedStyle(element).display!=='none');
        const inside=controls.every(element=>{const rect=element.getBoundingClientRect();return rect.left>=bounds.left&&rect.right<=bounds.right&&rect.top>=bounds.top&&rect.bottom<=bounds.bottom&&rect.width>=44&&rect.height>=44;});
        const legend=viewport.querySelector('.weather-map-legend').getBoundingClientRect();
        return {overflow:document.documentElement.scrollWidth-innerWidth,controlsInside:inside,legendInside:legend.left>=bounds.left&&legend.right<=bounds.right&&legend.bottom<=bounds.bottom,sea:getComputedStyle(viewport).backgroundColor};
      });
      assert.equal(layout.overflow,0);assert(layout.controlsInside,`${width}/${names[index]}: controls remain inside the map`);assert(layout.legendInside,`${width}/${names[index]}: legend remains inside the map`);
      assert.equal(layout.sea,'rgb(220, 232, 244)');
      if(screenshots)await page.locator('.map-surface').screenshot({path:path.join(output,`${width}-${kinds[index]}.png`)});
      record(`${width}-${names[index]}`,{...selected,...layout});
    }
    const player=page.locator('.radar-player__toggle');
    const alignment=await player.evaluate(button=>Math.abs(button.getBoundingClientRect().right-document.querySelector('#bigmap-container').getBoundingClientRect().right));
    assert(alignment<=1,'radar action stays aligned right below the cartography');
    const timeline=page.getByRole('slider',{name:'Orario del fotogramma radar illustrativo'});
    assert.equal(await page.locator('.radar-player__times span').count(),7);
    assert.deepEqual(await page.locator('.radar-player__phases span').allTextContents(),['Ore passate','Ora','Ore previste']);
    assert.equal(await page.locator('.radar-player__times [data-phase="passato"]').count(),2);
    assert.equal(await page.locator('.radar-player__times [data-phase="ora"]').innerText(),'19:20');
    assert.equal(await page.locator('.radar-player__times [data-phase="previsione"]').count(),4);
    // Keyboard focus may scroll the page; Ora must stay anchored within its timeline.
    const nowPosition=()=>page.locator('.radar-player__phases [data-phase="ora"]').evaluate(element=>{
      const rect=element.getBoundingClientRect(),timeline=element.closest('.radar-player__timeline').getBoundingClientRect();
      return {x:rect.left-timeline.left,y:rect.top-timeline.top,width:rect.width,height:rect.height};
    });
    const nowMarker=await nowPosition();
    await timeline.focus();await timeline.press('Home');
    assert.equal(await page.locator('#map').getAttribute('data-radar-frame'),'0');
    assert.match(await timeline.getAttribute('aria-valuetext'),/17:20/);
    assert.match(await timeline.getAttribute('aria-valuetext'),/ora passata/);
    await timeline.press('End');
    assert.equal(await page.locator('#map').getAttribute('data-radar-frame'),'6');
    assert.match(await page.locator('.radar-player__times [data-current]').innerText(),/23:20/);
    assert.match(await timeline.getAttribute('aria-valuetext'),/ora prevista/);
    assert.deepEqual(await nowPosition(),nowMarker,'reference time stays fixed within the timeline while scrubbing');
    await timeline.press('ArrowLeft');
    assert.equal(await page.locator('#map').getAttribute('data-radar-frame'),'5');
    await timeline.press('Home');await timeline.press('ArrowRight');await timeline.press('ArrowRight');
    const timelineLayout=await timeline.evaluate(element=>{
      const bounds=element.closest('.map-playback').getBoundingClientRect(),rect=element.getBoundingClientRect();
      const labels=[...document.querySelectorAll('.radar-player__times span')].map(label=>label.getBoundingClientRect());
      const phases=[...document.querySelectorAll('.radar-player__phases span')].map(label=>{const range=document.createRange();range.selectNodeContents(label);return range.getBoundingClientRect();});
      return {inside:rect.left>=bounds.left&&rect.right<=bounds.right,height:rect.height,labelsFit:labels.every((label,index)=>index===0||label.left-labels[index-1].right>=4),phasesFit:phases.every((label,index)=>label.left>=bounds.left&&label.right<=bounds.right&&(index===0||label.left>=phases[index-1].right))};
    });
    assert(timelineLayout.inside&&timelineLayout.labelsFit&&timelineLayout.height>=44,'timeline and all times fit with an accessible touch target');
    assert(timelineLayout.phasesFit,'past, reference and predicted labels fit without overlapping');
    const region=page.locator('#map .forecast-map-region').first();
    await region.focus();await region.press('Enter');
    assert.match(await page.locator('#map .leaflet-popup-content').innerText(),/Piemonte/);
    await region.press('Escape');assert.equal(await page.locator('#map .leaflet-popup').count(),0);
    await region.press('Space');assert.match(await page.locator('#map .leaflet-popup-content').innerText(),/Valori illustrativi/);
    await region.press('Escape');
    await page.locator('#map').focus();await page.keyboard.press('ArrowRight');
    const moved=await state(page);assert.notDeepEqual(moved.center,initial.center);
    await page.locator('#map').getByRole('button',{name:'Ingrandisci mappa',exact:true}).click();
    const zoomed=await state(page);assert(zoomed.zoom>initial.zoom);
    await page.getByRole('tab',{name:'Temperature',exact:true}).click();assert.equal((await state(page)).zoom,zoomed.zoom);
    await page.locator('#forecast-date-1').click();assert.equal((await state(page)).zoom,zoomed.zoom,'daily dates do not alter primary zoom');
    await page.getByRole('tab',{name:'Tempo',exact:true}).focus();await page.keyboard.press('End');
    await page.waitForFunction(()=>document.querySelector('#map').dataset.weatherLayer==='9');
    const frame=Number(await page.locator('#map').getAttribute('data-radar-frame'));
    await player.focus();await player.press('Space');
    assert.notEqual(Number(await page.locator('#map').getAttribute('data-radar-frame')),frame);
    assert.equal(await player.getAttribute('data-playing'),null,'reduced motion advances manually');
    await page.emulateMedia({media:'print'});
    assert.equal(await page.locator('#map').isVisible(),false);
    assert.equal(await page.locator('.weather-map-fallback').isVisible(),true);
    assert.equal(await player.isVisible(),false);
    assert.equal(await timeline.isVisible(),false);
    assert.equal(await page.locator('.weather-map-fallback').evaluate(image=>image.complete&&image.naturalWidth>0),true);
    if(screenshots&&width===1280)await page.locator('.map-surface').screenshot({path:path.join(output,'print.png')});
    record(`${width}-interaction-and-print`);await context.close();
  }
  const normal=await open(897,{reducedMotion:'no-preference',hasTouch:true});
  const page=normal.page,player=page.locator('.radar-player__toggle');
  await player.click();assert.equal(await player.getAttribute('data-playing'),'true');
  await page.waitForFunction(()=>document.querySelector('#map').dataset.radarFrame==='3');
  await player.click();const paused=await page.locator('#map').getAttribute('data-radar-frame');
  await page.waitForTimeout(1200);assert.equal(await page.locator('#map').getAttribute('data-radar-frame'),paused);
  await player.click();await page.getByRole('tab',{name:'Neve',exact:true}).click();
  assert.equal(await player.getAttribute('data-playing'),null,'switching away stops playback');
  await page.getByRole('tab',{name:'Radar',exact:true}).click();await player.click();
  const scrubber=page.getByRole('slider',{name:'Orario del fotogramma radar illustrativo'});
  await scrubber.focus();await scrubber.press('Home');
  assert.equal(await player.getAttribute('data-playing'),null,'scrubbing stops playback');
  await page.waitForTimeout(1200);assert.equal(await page.locator('#map').getAttribute('data-radar-frame'),'0');
  await player.click();
  await page.waitForFunction(()=>document.querySelector('#map').dataset.radarFrame==='6'&&!document.querySelector('.radar-player__toggle').hasAttribute('data-playing'));
  assert.equal(await page.evaluate(()=>window.__weatherMaps.map.touchZoom.enabled()),true);
  await page.locator('#map').getByRole('button',{name:'Apri mappa a schermo intero',exact:true}).click();
  await page.waitForFunction(()=>!!document.fullscreenElement);
  await page.locator('#map').getByRole('button',{name:'Esci dallo schermo intero',exact:true}).click();
  await page.waitForFunction(()=>!document.fullscreenElement);
  record('play-pause-stop-fullscreen-touch');await normal.context.close();
  const resize=await open(1280);
  const before=await state(resize.page);
  await resize.page.setViewportSize({width:390,height:900});await resize.page.waitForFunction(()=>window.__weatherMaps.map.getSize().x<300);
  const narrow=await state(resize.page);assert(narrow.zoom<before.zoom);
  await resize.page.setViewportSize({width:1280,height:900});await resize.page.waitForFunction(()=>window.__weatherMaps.map.getSize().x>600);
  assert.equal((await state(resize.page)).zoom,before.zoom);
  record('resize-overview');await resize.context.close();
  for(const width of [1280,390]) {
    const {context,page}=await open(width,{javaScriptEnabled:false});
    assert.equal(await page.locator('.leaflet-container').count(),0);
    assert.equal(await page.locator('.weather-map-fallback').isVisible(),true);
    assert.equal(await page.locator('.weather-static-links a').count(),6);
    record(`no-javascript-${width}`);await context.close();
  }
  assert.deepEqual(report.errors,[],'no missing resources, browser errors or remote services');
  report.status='passed';console.log(`Six Leaflet views: ${report.cases.length} exported-browser cases passed.`);
}catch(error){report.status='failed';report.errors.push(error.stack);throw error;}
finally{
  await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2)+'\n');
  await browser?.close();await preview.close();
}
