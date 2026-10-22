// Verifica gli SVG come documenti autonomi, con font e testo editabile.
import { chromium } from 'playwright-chromium'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const base = dirname(fileURLToPath(import.meta.url))
const root = resolve(base, '../../..')
const out = resolve(root, 'reports/booklet-aperture-svg-v1')
const data = JSON.parse(await readFile(resolve(base, 'composizioni.json'), 'utf8'))
await mkdir(resolve(out, 'browser'), { recursive: true })
const dettagli = process.argv.includes('--dettagli')
const approfondito = process.argv.includes('--approfondito')
const audit = resolve(out, 'audit')
if (approfondito) await mkdir(audit, { recursive: true })
const zone = {
  '01-storia': [[400, 380, 450, 320], [400, 820, 360, 440], [650, 530, 390, 450]],
  '02-ricerca': [[400, 560, 320, 520], [650, 480, 300, 260], [320, 1070, 600, 360], [540, 250, 130, 190]],
  '03-accessibilita': [[315, 460, 600, 450], [730, 870, 250, 450]],
  '04-gestalt': [[405, 800, 300, 420], [650, 450, 240, 140], [390, 570, 100, 250]],
  '05-colore': [[660, 680, 350, 460], [60, 1020, 500, 420], [420, 90, 390, 350]],
  '06-tipografia': [[220, 660, 420, 250], [640, 480, 240, 280], [700, 1140, 250, 310], [230, 820, 540, 540], [270, 660, 570, 100]],
  '07-griglie': [[380, 730, 270, 260], [650, 0, 395, 420], [740, 900, 300, 550], [370, 1180, 80, 290]],
}
if (dettagli) await mkdir(resolve(out, 'dettagli-400'), { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1055, height: 1491 } })
const checks = []
try {
  for (const c of data.capitoli) {
    await page.setViewportSize({ width: 1055, height: 1491 })
    await page.goto(pathToFileURL(resolve(base, 'svg', `${c.nome}.svg`)).href)
    await page.evaluate(async () => {
      document.documentElement.style.width = '1055px'
      document.documentElement.style.height = '1491px'
      await document.fonts.load('700 100px "CVeDI Sora"')
      await document.fonts.ready
    })
    const state = await page.evaluate(() => ({
      font: [...document.fonts].map(f => ({ family: f.family, status: f.status })),
      testi: [...document.querySelectorAll('[data-ruolo]')].map(el => {
        const { x, y, width, height } = el.getBBox()
        return { id: el.id, testo: el.textContent, x, y, width, height }
      }),
      raster: document.querySelectorAll('image, foreignObject, linearGradient, radialGradient, filter').length,
      righe: [...document.querySelectorAll('#titolo-capitolo tspan')].map(el => {
        const { x, width } = el.getBBox()
        return { testo: el.textContent, x, larghezza: width }
      }),
      geometriaColore: (() => {
        const profile = document.querySelector('#contorno-nastro')
        if (!profile) return null
        const commands = [...new Set([...document.querySelectorAll('#disegno path')]
          .flatMap(el => el.getAttribute('d').match(/[a-zA-Z]/g) || []))].sort()
        const verticesInside = []
        for (const el of document.querySelectorAll('#nastro-spettrale path')) {
          for (const m of el.getAttribute('d').matchAll(/[ML]\s*([-+.\d]+)[,\s]+([-+.\d]+)/g)) {
            const x = Number(m[1]), y = Number(m[2])
            if (x > 0 && x < 1055 && y > 0 && y < 1491 && profile.isPointInFill(new DOMPoint(x, y)))
              verticesInside.push({ id: el.id, x, y })
          }
        }
        return { commands, verticesInside }
      })(),
    }))
    if (!state.font.some(f => f.status === 'loaded')) throw new Error(`Font assente: ${c.nome}`)
    if (state.testi.length !== 2 || state.raster !== 0) throw new Error(`Struttura non valida: ${c.nome}`)
    if (state.geometriaColore) {
      if (state.geometriaColore.commands.some(x => !['M', 'L', 'H', 'V', 'A', 'Z'].includes(x)))
        throw new Error('Colore deve usare soltanto archi ellittici e rette.')
      if (state.geometriaColore.verticesInside.length)
        throw new Error('Un vertice del separatore cromatico cade dentro il nastro: ' + JSON.stringify(state.geometriaColore.verticesInside))
    }
    for (const t of state.testi) {
      // getBBox include l'intera ascendenza del font, anche sopra le cifre.
      // L'ingombro visibile verticale viene controllato nei rendering.
      if (t.x < 0 || t.x + t.width > 1055)
        throw new Error(`Testo oltre il foglio: ${c.nome}/${t.id}`)
    }
    for (const riga of state.righe) {
      if (riga.x + riga.larghezza > c.titolo.limite_destro)
        throw new Error(`Titolo invade la grafica: ${c.nome}/${riga.testo}`)
    }
    await page.screenshot({ path: resolve(out, 'browser', `${c.nome}.png`) })
    if (approfondito) {
      state.modificaProgrammatica = await page.evaluate(() => {
        const titolo = document.querySelector('#titolo-capitolo tspan')
        const numero = document.querySelector('#numero-capitolo')
        const forma = document.querySelector('#disegno rect, #disegno circle, #disegno ellipse')
        const oldTitle = titolo.textContent, oldNumber = numero.textContent, oldFill = forma.getAttribute('fill')
        titolo.textContent = 'Modificabile'
        numero.textContent = '09'
        forma.setAttribute('fill', '#123456')
        const result = titolo.textContent === 'Modificabile' && titolo.getBBox().width > 0
          && numero.textContent === '09' && numero.getBBox().width > 0
          && getComputedStyle(forma).fill === 'rgb(18, 52, 86)'
        titolo.textContent = oldTitle
        numero.textContent = oldNumber
        if (oldFill === null) forma.removeAttribute('fill')
        else forma.setAttribute('fill', oldFill)
        return result
      })
      if (!state.modificaProgrammatica) throw new Error(`Modifica nativa fallita: ${c.nome}`)
      await page.evaluate(() => { document.querySelector('#testi-editoriali').style.display = 'none' })
      await page.screenshot({ path: resolve(audit, `${c.nome}-fondo.png`) })
      await page.evaluate(() => {
        document.querySelector('#disegno').style.display = 'none'
        document.querySelector('#testi-editoriali').style.display = ''
      })
      for (const id of ['titolo-capitolo', 'numero-capitolo']) {
        await page.evaluate(id => {
          for (const el of document.querySelectorAll('[data-ruolo]'))
            el.style.display = el.id === id ? '' : 'none'
        }, id)
        await page.screenshot({ path: resolve(audit, `${c.nome}-${id}.png`), omitBackground: true })
      }
      await page.evaluate(() => {
        document.querySelector('#disegno').style.display = ''
        for (const el of document.querySelectorAll('[data-ruolo]')) el.style.display = ''
      })
    }
    await page.setViewportSize({ width: 390, height: 552 })
    await page.evaluate(() => {
      document.documentElement.style.width = '100vw'
      document.documentElement.style.height = 'auto'
    })
    await page.screenshot({ path: resolve(out, 'browser', `${c.nome}-stretto.png`) })
    if (dettagli) {
      await page.setViewportSize({ width: 4220, height: 5964 })
      await page.evaluate(() => {
        document.documentElement.style.width = '4220px'
        document.documentElement.style.height = '5964px'
      })
      for (const [i, [x, y, width, height]] of zone[c.nome].entries()) {
        await page.screenshot({ path: resolve(out, 'dettagli-400', `${c.nome}-${i + 1}.png`),
          clip: { x: x * 4, y: y * 4, width: width * 4, height: height * 4 } })
      }
    }
    checks.push({ capitolo: c.numero, ...state })
  }
  await writeFile(resolve(out, 'browser.json'), JSON.stringify(checks, null, 2) + '\n')
  console.log('Verificati 7 SVG: font incorporato caricato, testi editabili, vista intera e stretta.')
} finally {
  await browser.close()
}
