import {chromium} from 'playwright-chromium'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {brand,professionals} from '../../../fisioterapia/data/content.mjs'
const base=process.env.PASSO_URL||'http://localhost:3045/'
const dir='progetti/slide/assets/theme-imagegen/lesson-11-wireframes/passo-references'
await mkdir(dir,{recursive:true})
const browser=await chromium.launch()
const captures=[]
try{
 const context=await browser.newContext({viewport:{width:1200,height:1000},locale:'it-IT',reducedMotion:'reduce'})
 const page=await context.newPage()
 async function capture(id){
  const titles={home:'Il prossimo passo',ricerca:'Il momento giusto',risultati:'Un incontro',profilo:'Giulia Riva',dettaglio:'La tua visita',riepilogo:'Un ultimo sguardo',attesa:'Richiesta inviata.',conferma:'Il tuo prossimo passo',visite:'Il tuo spazio',assistenza:'Facciamo chiarezza'}
  await page.waitForFunction(title=>document.querySelector('h1')?.textContent.includes(title),titles[id])
  await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready)
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(i=>i.decode().catch(()=>{}))))
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
  const file=`${dir}/${id}.png`;await page.screenshot({path:file})
  captures.push({id,file,sha256:createHash('sha256').update(await readFile(file)).digest('hex'),route:page.url().split('#')[1],heading:await page.locator('h1').innerText()})
 }
 await page.goto(base+'#/');await capture('home')
 await page.locator('.care-section').screenshot({path:dir+'/paziente.png'})
 await page.goto(base+'#/cerca')
 await page.getByLabel('Domicilio a Milano').fill(brand.address);await capture('ricerca')
 await page.getByRole('button',{name:'Cerca disponibilità'}).click();await capture('risultati')
 await page.locator('.result-card').first().getByRole('link',{name:'Conosci il professionista'}).click();await capture('profilo')
 await page.getByRole('link',{name:'Torna ai professionisti'}).click()
 await page.locator('.result-card').first().getByRole('button',{name:'Vedi visita'}).click();await capture('dettaglio')
 await page.getByRole('link',{name:'Continua al riepilogo'}).click()
 await page.getByLabel('Nome e cognome').fill('Viola Esempio');await page.getByLabel('Email',{exact:true}).fill('viola@example.com');await page.getByRole('checkbox').check();await capture('riepilogo')
 await page.getByRole('button',{name:'Invia richiesta'}).click();await page.waitForURL(/richiesta\//);await capture('attesa')
 await page.goto(base+'#/professionista');await page.getByRole('button',{name:'Accetta richiesta'}).click();await capture('conferma')
 await page.goto(base+'#/visite');await capture('visite')
 await page.goto(base+'#/assistenza');await capture('assistenza')
 await writeFile(dir+'/manifest.json',JSON.stringify({version:1,sourceProject:'progetti/fisioterapia/',sourceFiles:['progetti/fisioterapia/app.js','progetti/fisioterapia/data/content.mjs','progetti/fisioterapia/styles/site.source.css'],viewport:{width:1200,height:1000},scenario:{brand,professionals:professionals.map(p=>({id:p.id,name:p.name,image:p.image,times:p.times}))},captures},null,2)+'\n')
 console.log(JSON.stringify(captures.map(c=>({id:c.id,heading:c.heading})),null,2))
}catch(error){console.error(error.message);throw error}finally{await browser.close()}
