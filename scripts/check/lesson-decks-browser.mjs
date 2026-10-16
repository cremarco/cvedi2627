import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'
const site=path.resolve(process.env.DECK_SITE || 'dist'), prefix=process.env.DECK_BASE || '/'
const output=path.resolve(process.env.DECK_REPORT || 'reports/lesson-decks/browser')
await mkdir(output,{recursive:true})
const catalog=JSON.parse(await readFile(path.join(site,'decks.json'),'utf8'))
const require=createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
const serve=require('sirv')(site,{dev:true})
const server=createServer((req,res)=>{
 if(!req.url.startsWith(prefix)){res.writeHead(404).end();return}
 req.url='/'+req.url.slice(prefix.length)
 serve(req,res,()=>res.writeHead(404).end())
})
await new Promise(r=>server.listen(0,'127.0.0.1',r))
const base=`http://127.0.0.1:${server.address().port}${prefix}`
const browser=await chromium.launch()
const report={status:'running',decks:[],profiles:[],errors:[],failedRequests:[]}
try{
 const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'})
 page.on('pageerror',e=>{if(e.message!=='Wake Lock permission request denied')report.errors.push(e.message)})
 page.on('response',r=>{if(r.status()>=400)report.failedRequests.push({status:r.status(),url:r.url()})})
 for(const [profile,viewport] of [['desktop',{width:1280,height:720}],['narrow',{width:636,height:778}]]){
  await page.setViewportSize(viewport)
  const menu=await openSlide(page,base,3,{settle:true})
  assert.equal(await menu.locator('.index-grid a').count(),catalog.decks.length-1)
  assert.equal(await page.locator('link[rel="preload"][as="image"]').count(),0,'No eager image downloads across the presentation')
  const bounds=await menu.locator('.index-grid a').evaluateAll(nodes=>nodes.map(n=>{const b=n.getBoundingClientRect(),r=document.querySelector('.slidev-layout.is-active').getBoundingClientRect();return {inside:b.left>=r.left&&b.right<=r.right+1&&b.top>=r.top&&b.bottom<=r.bottom,href:n.getAttribute('href')}}))
  assert.ok(bounds.every(b=>b.inside),'All menu destinations fit the canvas')
  await page.screenshot({path:path.join(output,`menu-${profile}.png`),animations:'disabled'})
  report.profiles.push({profile,links:bounds.length})
 }
 await page.setViewportSize({width:1280,height:720})
 for(const deck of catalog.decks.filter(d=>d.id!=='apertura')){
  const paths=[]
  const record=r=>{if(r.resourceType()==='script')paths.push(new URL(r.url()).pathname)}
  page.on('request',record)
  const menu=await openSlide(page,base,3,{settle:true})
  await menu.locator(`a[href$="#/${deck.alias}"]`).click()
  await page.waitForURL(`**/lezioni/${deck.id}/**`)
  await page.locator('.slidev-page-1 .slidev-layout').waitFor({state:'visible'})
  const lessonBase=`${base}lezioni/${deck.id}/`
  const second=await openSlide(page,lessonBase,2,{settle:true})
  assert.equal(await second.locator('.slide-index').textContent(),`2 / ${deck.slides.length}`)
  if (deck.id === 'colore') await page.screenshot({path:path.join(output,'colore.png'),animations:'disabled'})
  assert.equal(await page.locator('.lesson-deck-menu').getAttribute('href'),`${prefix}#/3`)
  assert.ok(paths.every(p=>!p.includes('/lezioni/')||p.includes(`/lezioni/${deck.id}/`)),'Only the selected lesson scripts are requested')
  const last=await openSlide(page,lessonBase,deck.slides.length,{settle:true})
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(120)
  assert.equal(await last.isVisible(),true,'Last slide stays inside its own presentation')
  await page.locator('.lesson-deck-menu').focus();await page.keyboard.press('Enter')
  await page.waitForURL(`${base}#/3`)
  await page.getByRole('heading',{name:'Indice delle lezioni',exact:true}).waitFor()
  page.off('request',record)
  report.decks.push({id:deck.id,slides:deck.slides.length,scripts:paths.length})
 }
 // Existing bookmarks keep their intended slide after the split.
 const color=catalog.decks.find(d=>d.id==='colore')
 await page.goto(`${base}#/colore-schema-analogo`)
 await page.waitForURL(`**/lezioni/colore/#/colore-schema-analogo`)
 await page.getByRole('heading',{name:'Schema analogo',exact:true}).waitFor()
 const number=Object.entries(catalog.legacy).find(([n,r])=>/^\d+$/.test(n)&&r.deck==='gestalt')
 await page.goto(`${base}#/${number[0]}`)
 await page.waitForURL(`**/lezioni/gestalt/#/${number[1].target}`)
 assert.deepEqual(report.errors,[])
 assert.deepEqual(report.failedRequests,[])
 report.status='passed'
}finally{await browser.close();await new Promise(r=>server.close(r));await writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n')}
console.log(JSON.stringify(report,null,2))
