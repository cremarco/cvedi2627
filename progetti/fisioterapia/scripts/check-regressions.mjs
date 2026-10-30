import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'

const base=process.env.PASSO_URL||'http://localhost:3045/'
const output='reports/fisioterapia/regressions'
await mkdir(output,{recursive:true})
const browser=await chromium.launch(), checks=[], errors=[]
const seed={id:'REG-1',status:'confirmed',professional:'giulia-riva',address:'Via Esempio 12, Milano',cap:'20121',date:'2026-11-17',period:'sera',time:'20:30',name:'Viola Esempio',email:'viola@example.com',phone:'',notes:'Citofono originale'}
const check=(value,label)=>{assert.ok(value,label);checks.push(label)}
async function context(){
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',locale:'it-IT'})
 const page=await ctx.newPage();page.setDefaultTimeout(15000)
 page.on('pageerror',error=>errors.push(error.message))
 return {ctx,page}
}
async function open(page,path){await page.goto(base+'#'+path);await page.locator('h1').waitFor()}
async function search(page,address='Via Esempio 12, Milano'){
 await page.getByLabel('Domicilio a Milano').fill(address)
 await page.getByLabel('CAP',{exact:true}).fill('20121')
 await page.getByRole('button',{name:'Cerca disponibilità'}).click()
 await page.waitForURL(/risultati/);await page.locator('.result-card').first().waitFor()
}
async function review(page,index=0){
 await page.locator('.result-card').nth(index).getByRole('button',{name:'Vedi visita'}).click()
 await page.getByRole('link',{name:'Continua al riepilogo'}).click()
 await page.waitForURL(/riepilogo/)
}
async function contact(page){await page.getByLabel('Nome e cognome').fill('Viola Esempio');await page.getByLabel('Email',{exact:true}).fill('viola@example.com')}
async function booking(page){await open(page,'/');await page.evaluate(item=>localStorage.setItem('passo-visite-v1',JSON.stringify([item])),seed);await open(page,'/richiesta/'+seed.id)}
async function capture(page,name){
 await page.evaluate(()=>document.fonts.ready)
 await page.screenshot({path:`${output}/${name}.png`,fullPage:true})
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+': no horizontal overflow')
}
async function boundaries(page){
 const ratios=await page.locator('.input,.select,.textarea,.checkbox').evaluateAll(nodes=>{
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d')
  function l(color){ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3).map(v=>v/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)}
  return nodes.filter(el=>el.getClientRects().length).map(el=>(1.05)/(l(getComputedStyle(el).borderTopColor)+.05))
 })
 check(ratios.length>0&&ratios.every(r=>r>=3),'visible field boundaries reach 3:1: '+ratios.map(r=>r.toFixed(2)).join(', '))
}
try {
 {
  const {ctx,page}=await context();await open(page,'/cerca');await search(page);await review(page)
  await page.getByRole('link',{name:'Modifica i dati'}).click();await page.getByLabel('Giorno',{exact:true}).fill('2026-11-18')
  await page.getByRole('button',{name:'Cerca disponibilità'}).click();await page.waitForURL(/risultati/)
  await page.goBack();await page.goBack();await page.waitForURL(/risultati/)
  check(await page.getByRole('heading',{name:'Nessuna proposta per questa ricerca.'}).isVisible(),'browser Back cannot restore an unsupported proposal')
  await open(page,'/riepilogo');check(page.url().includes('/risultati'),'direct review URL also guards unsupported proposals')
  check(await page.evaluate(()=>JSON.parse(localStorage.getItem('passo-visite-v1')||'[]').length)===0,'unsupported day creates no booking')
  await ctx.close()
 }
 {
  const {ctx,page}=await context();await booking(page)
  await page.getByRole('button',{name:'Modifica visita',exact:true}).click()
  await page.getByRole('button',{name:'Interrompi la modifica'}).waitFor()
  check(await page.getByRole('button',{name:'Interrompi la modifica'}).isVisible(),'editing has an explicit exit from the search')
  await search(page,'Via Nuova 24, Milano');await review(page,1)
  await page.getByLabel('Nome e cognome').fill('Viola Nuova');await page.getByLabel('Email',{exact:true}).fill('nuova@example.com')
  await page.getByLabel('Indicazioni per il domicilio (facoltativo)').fill('Citofono NUOVO 24')
  await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Invia modifica'}).click();await page.waitForURL(/richiesta/)
  await page.getByRole('heading',{name:'Modifica in attesa di risposta.'}).waitFor()
  check((await page.locator('.current-visit').innerText()).includes('Giulia Riva')&&(await page.locator('.current-visit').innerText()).includes('Via Esempio 12'),'current confirmed visit stays separate from the proposal')
  const proposed=await page.locator('.proposed-visit').innerText()
  check(proposed.includes('Luca Sala')&&proposed.includes('Via Nuova 24')&&proposed.includes('Viola Nuova')&&proposed.includes('Citofono NUOVO 24'),'proposed visit includes professional, address, contacts and access notes')
  check(await page.locator('.booking-status-header .badge-info').count()===1,'pending change uses waiting status, not confirmed success')
  await capture(page,'pending-change-desktop');await page.setViewportSize({width:390,height:844});await capture(page,'pending-change-mobile');await page.setViewportSize({width:1440,height:1000})
  await page.emulateMedia({media:'print'});await capture(page,'pending-change-print');await page.emulateMedia({media:'screen'})
  await page.getByRole('link',{name:'Prova la risposta del professionista'}).click();await page.waitForURL(/professionista/)
  const queue=await page.locator('.professional-requests').innerText()
  check(await page.getByRole('heading',{name:'Luca Sala',exact:true}).isVisible()&&queue.includes('Via Nuova 24')&&queue.includes('Viola Nuova')&&queue.includes('Citofono NUOVO 24'),'professional reviews the full new proposal, not mixed old/new data')
  await capture(page,'professional-change-desktop');await page.setViewportSize({width:390,height:844});await capture(page,'professional-change-mobile');await page.setViewportSize({width:1440,height:1000})
  await page.getByRole('button',{name:'Accetta modifica'}).click();await page.waitForURL(/richiesta/)
  const accepted=await page.evaluate(()=>JSON.parse(localStorage.getItem('passo-visite-v1'))[0])
  check(accepted.professional==='luca-sala'&&accepted.address==='Via Nuova 24, Milano'&&accepted.name==='Viola Nuova'&&accepted.notes==='Citofono NUOVO 24'&&!accepted.change,'acceptance applies every changed field')
  await open(page,'/cerca');await page.getByRole('button',{name:'Cerca disponibilità'}).click();await page.waitForURL(/risultati/)
  check((await page.locator('.page-heading p').first().innerText()).startsWith('1 professionista per'),'single professional uses singular copy')
  await open(page,'/richiesta/'+seed.id);await page.getByRole('button',{name:'Modifica visita',exact:true}).click();await search(page);await review(page)
  await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Invia modifica'}).click();await page.waitForURL(/richiesta/)
  await page.getByRole('button',{name:'Ritira la modifica',exact:true}).click();await page.getByRole('button',{name:'Ritira modifica',exact:true}).click()
  check(await page.locator('.proposed-visit').count()===0&&(await page.locator('.current-visit').innerText()).includes('Luca Sala'),'withdrawing the change preserves the confirmed visit')
  await ctx.close()
 }
 {
  const {ctx,page}=await context();await booking(page);await page.getByRole('button',{name:'Modifica visita',exact:true}).click()
  await page.getByRole('link',{name:'Passo, home',exact:true}).click();await page.locator('.visits-link').click()
  await page.locator('main').getByRole('link',{name:'Trova una visita',exact:true}).click()
  await page.waitForURL(/cerca/);await page.getByRole('button',{name:'Cerca disponibilità'}).waitFor()
  check(await page.locator('.editing-context').count()===0&&await page.evaluate(()=>JSON.parse(sessionStorage.getItem('passo-ricerca')).editing)==='','leaving the edit flow starts a fresh request rather than a hidden modification')
  await ctx.close()
 }
 {
  const {ctx,page}=await context();await open(page,'/cerca');await boundaries(page);await search(page);await review(page);await contact(page)
  await page.getByRole('button',{name:'Invia richiesta'}).click()
  check(await page.getByRole('checkbox').getAttribute('aria-invalid')==='true'&&await page.getByRole('checkbox').evaluate(el=>el===document.activeElement),'privacy-only error is marked invalid and receives keyboard focus')
  await page.getByRole('checkbox').check();check(await page.getByRole('checkbox').getAttribute('aria-invalid')==='false','correcting privacy clears the invalid state')
  await page.locator('.visits-link').click();await page.getByRole('button',{name:'Elimina tutti i dati locali'}).click();await page.getByRole('button',{name:'Elimina i dati',exact:true}).click()
  const data=await page.evaluate(()=>({draft:JSON.parse(sessionStorage.getItem('passo-ricerca')),bookings:JSON.parse(localStorage.getItem('passo-visite-v1'))}))
  check(!data.draft.query.address&&!data.draft.contact.name&&!data.draft.contact.email&&data.bookings.length===0,'clear works for an unsent draft and removes address, contacts and visits')
  await open(page,'/cerca');check(await page.getByLabel('Domicilio a Milano').inputValue()==='','cleared address does not reappear from a mutated default state')
  await open(page,'/assistenza/contatti');await boundaries(page)
  await ctx.close()
 }
 check(errors.length===0,'no runtime errors in regression paths: '+errors.join(' | '))
 await writeFile(output+'/report.json',JSON.stringify({base,checks,errors},null,2)+'\n')
 console.log(JSON.stringify({checks:checks.length,errors}))
} finally {await browser.close()}
