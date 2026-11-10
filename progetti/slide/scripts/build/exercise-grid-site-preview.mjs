import { chromium } from 'playwright-chromium'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
const base = (process.env.EXERCISE_URL || 'http://localhost:3055').replace(/\/$/, '')
const folder = 'progetti/slide/assets/esercitazioni/esempio-03/catture'
await mkdir(folder, { recursive: true })
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  await page.goto(`${base}/images/esercitazioni/esercizio-03/index.html`)
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())) })
  await page.locator('body').screenshot({ path: `${folder}/home-desktop.png` })
} finally { await browser.close() }
const output = `${folder}/home-desktop.webp`
if (spawnSync('magick', [`${folder}/home-desktop.png`, '-quality', '90', output]).status !== 0) throw new Error('Screenshot conversion failed')
const manifestPath = 'progetti/slide/assets/esercitazioni/schemi/manifest.json'
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const entry = { source: '../esempio-03/catture/home-desktop.webp', web: '/images/esercitazioni/sito-grid-responsive.webp', sha256: createHash('sha256').update(await readFile(output)).digest('hex'), sourceKind: 'browser-capture', capturedFrom: '/images/esercitazioni/esercizio-03/index.html', original: '../esempio-03/catture/home-desktop.png', generator: 'progetti/slide/scripts/build/exercise-grid-site-preview.mjs', exercise: '03', description: 'Schermata effettiva della home del sito con Grid e immagini responsive, viewport 1100 × 900, contenuti e colori del sito Flexbox precedente' }
manifest.archivedScreenshots ??= []
entry.reason = 'Slide dedicata rimossa: la consegna collega già il sito completo.'
const index = manifest.archivedScreenshots.findIndex(asset => asset.web === entry.web)
if (index < 0) manifest.archivedScreenshots.push(entry)
else manifest.archivedScreenshots[index] = entry
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log('Grid site screenshot captured and catalogued')
