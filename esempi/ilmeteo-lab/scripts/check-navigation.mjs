import {chromium} from 'playwright-chromium';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs/promises';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const out=path.join(root,'reports/ilmeteo-lab/navigation');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base=`http://127.0.0.1:${process.env.ILMETEO_PORT || 4187}/`;
const results=[];
for(const width of [1440,390,320])for(const version of ['originale','redesign'])for(const file of ['index','milano','domani']){
 await page.setViewportSize({width,height:900});
 const response=await page.goto(`${base}${version}/${file}.html`);await page.waitForLoadState('load');
 const nav=page.locator('#ilmeteo-version-nav');
 const box=await nav.boundingBox();
 const overflow=await nav.evaluate(el=>el.scrollWidth>el.clientWidth);
 const switchBox=await nav.locator('[data-version-switch]').boundingBox();
 const fixed=await nav.evaluate(el=>getComputedStyle(el).position==='fixed');
 if(response.status()!==200||await nav.count()!==1||overflow||!fixed||Math.abs(box.x+box.width-width)>1||Math.abs(box.y+box.height/2-450)>1||switchBox.width<44||switchBox.height<44)throw Error(`Side switch layout: ${version}/${file} ${width}`);
 if(await nav.locator('nav,.version-lab,.version-nav-inner').count())throw Error('Duplicated toolbar remains');
 await page.evaluate(()=>scrollTo(0,500));
 const scrolled=await nav.boundingBox();
 if(Math.abs(scrolled.y-box.y)>1)throw Error('Side switch moves during scroll');
 await page.evaluate(()=>scrollTo(0,0));
 const other=version==='originale'?'redesign':'originale';
 await Promise.all([page.waitForURL(`${base}${other}/${file}.html`),nav.locator('[data-version-switch]').click()]);
 await page.waitForTimeout(650);
 if(await page.locator('#ilmeteo-version-nav').count()!==1)throw Error('Lost navigation after switch');
 const direction=await page.evaluate(()=>document.documentElement.dataset.versionDirection);
 if(direction!==other)throw Error('Missing switch motion direction');
 await page.locator('[data-version-switch]').focus();
 await Promise.all([page.waitForURL(`${base}${version}/${file}.html`),page.keyboard.press('Enter')]);
 await page.waitForTimeout(650);
 if(width!==320)await page.screenshot({path:`${out}/${version}-${file}-${width}.png`});
 await page.emulateMedia({media:'print'});
 if(await page.locator('#ilmeteo-version-nav').isVisible())throw Error('Side switch visible in print');
 await page.emulateMedia({media:'screen'});
 results.push({version,file,width,navigation:'pass',switchBothDirections:'pass',keyboard:'pass',sideSwitchOverflow:false,print:'hidden'});
}
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(`${base}originale/milano.html`);
await Promise.all([page.waitForURL(`${base}redesign/milano.html`),page.locator('[data-version-switch]').click()]);
if(await page.evaluate(()=>document.documentElement.dataset.versionDirection))throw Error('Reduced motion not respected');
// Existing source anchors must now stay inside the same local version.
for(const file of ['index','milano','domani']){
 await page.goto(`${base}originale/${file}.html`);
 const broken=await page.locator('a[href],area[href]').evaluateAll(els=>els.filter(el=>['/','/portale/','/meteo/milano','/portale/meteo-domani'].includes(el.getAttribute('href'))).map(el=>el.getAttribute('href')));
 if(broken.length)throw Error(`Unmapped source links: ${broken}`);
}
// Basic navigation also works when scripts are disabled.
const noJS=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJS.newPage();
await staticPage.goto(`${base}originale/domani.html`);await staticPage.locator('[data-version-switch]').click();
if(staticPage.url()!==`${base}redesign/domani.html`)throw Error('No-JS switch failed');
await fs.writeFile(`${out}/checks.json`,JSON.stringify({results,reducedMotion:'pass',withoutJavaScript:'pass',sourceLinks:'pass',errors},null,2));
if(errors.length)throw Error(errors.join('\n'));
await browser.close();console.log(`PASS: ${results.length} page/viewport checks, bidirectional switches, keyboard, print, reduced motion, no JavaScript.`);
