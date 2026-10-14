import {createExportedPreview} from './exported-preview.mjs';
/* Isolated browser verification of the exported daily map. */
import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright-chromium';

const output = path.resolve('reports/ilmeteo-map');
const screenshots = !process.argv.includes('--no-screenshots');
await mkdir(output, {recursive:true});
const preview = await createExportedPreview();
const url = preview.url;
const report = {status:'running', cases:[], errors:[]};
let browser;
const record = (name, details = {}) => report.cases.push({name,...details});
const state = page => page.evaluate(() => {
  const map = window.__forecastMap;
  const viewport = document.querySelector('#forecast-interactive');
  const bounds = viewport.getBoundingClientRect();
  const markers = [...viewport.querySelectorAll('.forecast-weather-marker')];
  return {
    size:map.getSize(), zoom:map.getZoom(), center:map.getCenter(),
    visible:markers.filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.left >= bounds.left && rect.right <= bounds.right && rect.top >= bounds.top && rect.bottom <= bounds.bottom;
    }).length,
    overflow:document.documentElement.scrollWidth - innerWidth,
    labels:markers.map(element => element.getAttribute('aria-label')),
    conditions:markers.map(element => element.querySelector('svg').dataset.weatherIcon),
  };
});
async function open(width, options = {}) {
  const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',...options});
  if (options.javaScriptEnabled !== false) {
    // Inspect the instance without adding a debug API to shipped JavaScript.
    await context.route('**/forecast-interactive.js', async route => {
      const response = await route.fetch();
      const instrumentation = 'const createMap=L.map;L.map=(...args)=>{const instance=createMap(...args);if(args[0]?.id==="forecast-interactive"||args[0]==="forecast-interactive")window.__forecastMap=instance;return instance;};\n';
      await route.fulfill({response,body:instrumentation + await response.text()});
    });
  }
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('response', response => {if(response.status() >= 400) report.errors.push(`${response.status()} ${response.url()}`);});
  page.on('request', request => {
    if (!request.url().startsWith(new URL(url).origin) && !request.url().startsWith('data:')) report.errors.push(`Remote request: ${request.url()}`);
  });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  if (options.javaScriptEnabled !== false) await page.locator('.forecast-weather-marker').first().waitFor();
  return {context,page};
}

try {
  browser = await chromium.launch({headless:true});
  for (const width of [1280,897,768,390,320]) {
    const {context,page} = await open(width);
    const initial = await state(page);
    assert.equal(initial.visible,20, `${width}: twenty markers inside the overview`);
    assert.equal(initial.overflow,0, `${width}: no page overflow`);
    assert.equal(new Set(initial.labels.map(label => label.split(':')[0])).size,20);
    assert.equal(await page.locator('#forecast-interactive .forecast-map-region').count(),20);
    if (screenshots) await page.locator('.forecast-map-browser').screenshot({path:path.join(output,`after-${width}.png`)});
    const palette = await page.evaluate(() => {
      const style = element => getComputedStyle(document.querySelector(element));
      return {sea:style('#forecast-interactive').backgroundColor, italy:style('#forecast-interactive .forecast-map-region').fill,
        countries:style('.forecast-map-country').fill, border:style('#forecast-interactive .forecast-map-region').stroke,
        marker:style('.forecast-weather-marker svg').stroke,
        animation:style('.forecast-weather-marker svg > path').animationName,
        controls:[...document.querySelectorAll('#forecast-interactive .forecast-map-tool')].map(element => {const rect=element.getBoundingClientRect();return [rect.width,rect.height];})};
    });
    assert.equal(palette.sea,'rgb(220, 232, 244)');
    assert.equal(palette.italy,'rgb(255, 255, 255)');
    assert.equal(palette.countries,'rgb(238, 242, 247)');
    assert.equal(palette.border,'rgb(9, 43, 96)');
    assert.equal(palette.marker,'rgb(9, 43, 96)');
    assert.equal(palette.animation,'none');
    assert(palette.controls.every(([w,h]) => w >= 44 && h >= 44));
    for (let day = 1; day < 4; day++) {
      await page.locator(`#forecast-date-${day}`).click();
      await page.waitForFunction(index => document.querySelector('#forecast-interactive').getAttribute('aria-label').includes(['9 ottobre','10 ottobre','11 ottobre','12 ottobre'][index]), day);
      const selected = await state(page);
      assert.deepEqual(selected.conditions,await page.evaluate(index => window.ILMETEO_FORECAST_INTERACTIVE.days[index].conditions,day));
      assert.equal(selected.zoom,initial.zoom);
      assert.deepEqual(selected.center,initial.center);
      assert.equal(selected.visible,20);
    }
    await page.locator('#forecast-date-3').press('Home');
    await page.waitForFunction(() => document.querySelector('#forecast-date-0').getAttribute('aria-selected') === 'true');
    const marker = page.locator('.forecast-weather-marker').filter({has:page.locator('svg')}).first();
    await marker.focus();
    await marker.press('Enter');
    await page.locator('.leaflet-popup-content').waitFor();
    assert.match(await page.locator('.leaflet-popup-content').innerText(),/Piemonte.*Pioggia/s);
    assert.equal(await page.locator('.forecast-map-region.is-selected').count(),1);
    await page.locator('#forecast-interactive').focus();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.leaflet-popup').count(),0);
    await marker.press('Space');
    await page.locator('.leaflet-popup-content').waitFor();
    await page.locator('#forecast-interactive').focus();
    await page.keyboard.press('Escape');
    await page.locator('#forecast-interactive').getByRole('button',{name:'Mostra tutta Italia',exact:true}).click();
    record(`layout-${width}`,{...initial,palette});
    await context.close();
  }

  const {context,page} = await open(1280);
  const overview = await state(page);
  await page.setViewportSize({width:390,height:900});
  await page.waitForFunction(() => window.__forecastMap.getSize().x < 400);
  const mobile = await state(page);
  assert.equal(mobile.visible,20,'overview refits when the viewport becomes narrow');
  assert(mobile.zoom < overview.zoom);
  await page.setViewportSize({width:1280,height:900});
  // Returning from mobile must restore the measured overview, including its
  // current sidebar/date-selector allocation, rather than an assumed width.
  await page.waitForFunction(width => Math.abs(window.__forecastMap.getSize().x - width) < 1, overview.size.x);
  assert.equal((await state(page)).visible,20,'overview refits when returning to desktop');
  await page.locator('#forecast-interactive').getByRole('button',{name:'Ingrandisci mappa giornaliera',exact:true}).click();
  const zoomed = await state(page);
  assert(zoomed.zoom > overview.zoom);
  await page.locator('#forecast-date-1').click();
  await page.waitForFunction(() => document.querySelector('#forecast-date-1').getAttribute('aria-selected') === 'true');
  assert.equal((await state(page)).zoom,zoomed.zoom,'date changes preserve user zoom');
  await page.locator('#forecast-interactive .forecast-map-region').nth(19).scrollIntoViewIfNeeded();
  const region = await page.evaluate(() => {
    const layers = Object.values(window.__forecastMap._layers);
    const region = layers.find(layer => layer.feature?.properties.code === 20);
    // Interior point away from the weather symbol at 40.1, 9.05.
    const point = window.__forecastMap.latLngToContainerPoint([40.7,9.5]);
    return {point:{x:point.x,y:point.y},name:region.feature.properties.name};
  });
  const mapBox = await page.locator('#forecast-interactive').boundingBox();
  const clickPoint = {x:mapBox.x+region.point.x,y:mapBox.y+region.point.y};
  const hit = await page.evaluate(({x,y}) => {
    const element = document.elementFromPoint(x,y);
    const layer = Object.values(window.__forecastMap._layers).find(layer => layer.getElement?.() === element);
    return {code:layer?.feature?.properties.code,element:element?.tagName,x,y,
      viewport:element?.closest('.leaflet-container')?.id,
      path:document.querySelectorAll('#forecast-interactive .forecast-map-region')[19]?.getAttribute('d'),
      pointerEvents:getComputedStyle(document.querySelectorAll('#forecast-interactive .forecast-map-region')[19]).pointerEvents,
      center:window.__forecastMap.getCenter(),zoom:window.__forecastMap.getZoom()};
  },clickPoint);
  assert.equal(hit.code,20,`Sardegna geographic click reaches its path: ${JSON.stringify(hit)}`);
  await page.mouse.click(clickPoint.x,clickPoint.y);
  assert.match(await page.locator('.leaflet-popup-content').innerText(),/Sardegna/);
  await page.evaluate(() => window.__forecastMap.closePopup());
  const custom = await state(page);
  await page.setViewportSize({width:390,height:900});
  await page.waitForFunction(() => window.__forecastMap.getSize().x < 400);
  const resizedCustom = await state(page);
  assert.equal(resizedCustom.zoom,custom.zoom,'resize preserves deliberately chosen zoom');
  assert(Math.abs(resizedCustom.center.lat-custom.center.lat) < .05 && Math.abs(resizedCustom.center.lng-custom.center.lng) < .05,'resize preserves deliberately chosen position');
  await page.locator('#forecast-interactive').getByRole('button',{name:'Mostra tutta Italia',exact:true}).click();
  assert.equal((await state(page)).visible,20);
  const keyboardBefore = await state(page);
  await page.locator('#forecast-interactive').focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(lng => window.__forecastMap.getCenter().lng !== lng,keyboardBefore.center.lng);
  await page.evaluate(() => window.__forecastMap.setZoom(window.__forecastMap.getMaxZoom(),{animate:false}));
  assert(await page.locator('#forecast-interactive').getByRole('button',{name:'Ingrandisci mappa giornaliera',exact:true}).isDisabled());
  await page.evaluate(() => window.__forecastMap.setZoom(window.__forecastMap.getMinZoom(),{animate:false}));
  assert(await page.locator('#forecast-interactive').getByRole('button',{name:'Riduci mappa giornaliera',exact:true}).isDisabled());
  record('resize-zoom-region-keyboard',{desktopZoom:overview.zoom,mobileZoom:mobile.zoom});
  await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('#forecast-interactive').isVisible(),false);
  assert.equal(await page.locator('.forecast-maps > li:visible').count(),4);
  assert.equal(await page.locator('.forecast-maps img:visible').count(),4);
  if (screenshots) await page.locator('.forecast-map-browser').screenshot({path:path.join(output,'print.png')});
  record('print',{maps:4});
  await context.close();

  for (const width of [1280,390]) {
    const {context,page} = await open(width,{javaScriptEnabled:false});
    assert.equal(await page.locator('#forecast-interactive').count(),0);
    assert.equal(await page.locator('.forecast-maps img:visible').count(),4);
    assert.equal(await page.locator('.forecast-maps img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)),true);
    record(`no-javascript-${width}`,{maps:4});
    await context.close();
  }
  const normal = await open(390,{reducedMotion:'no-preference',isMobile:true,hasTouch:true});
  await normal.page.locator('.forecast-map-browser').scrollIntoViewIfNeeded();
  await normal.page.waitForFunction(() => document.querySelector('#forecast-interactive').dataset.weatherMotion === 'active');
  assert(await normal.page.evaluate(() => window.__forecastMap.touchZoom.enabled()));
  await normal.page.emulateMedia({reducedMotion:'reduce'});
  await normal.page.waitForFunction(() => document.querySelector('#forecast-interactive').dataset.weatherMotion === 'static');
  record('touch-and-motion',{pinchEnabled:true,reducedMotionStatic:true});
  await normal.context.close();
  assert.deepEqual(report.errors,[],'no browser errors, missing assets or remote requests');
  report.status = 'passed';
  console.log(`Daily map: ${report.cases.length} exported-browser cases passed.`);
} catch (error) {
  report.status = 'failed'; report.errors.push(error.stack); throw error;
} finally {
  await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2)+'\n');
  await browser?.close();
  await preview.close();
}
