import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { nativeExamples, renderNativeDocument } from '../../data/esercitazioni/native-examples.mjs'
import { examples } from '../../data/esercitazioni/framework-curriculum.mjs'

const output = 'reports/native-exercises'
await mkdir(output, { recursive: true })
const base = await readFile('progetti/slide/assets/esercitazioni/tailwind-daisyui/render.css', 'utf8')
const custom = await readFile('progetti/slide/assets/esercitazioni/tailwind-daisyui/custom.css', 'utf8')
const browser = await chromium.launch()
const report = { status: 'running', examples: [], errors: [] }
try {
  const page = await browser.newPage({ viewport: { width: 1136, height: 396 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => report.errors.push(error.message))
  for (const [name, entry] of Object.entries({ ...nativeExamples, ...Object.fromEntries(Object.entries(examples).map(([key, value]) => [`framework-${key}`, value])) })) {
    await page.setContent(renderNativeDocument(entry, base, custom))
    await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))) })
    const metrics = await page.evaluate(() => {
      const issues = [], main = document.querySelector('main')
      if (main.scrollHeight > 396) issues.push(`content height ${main.scrollHeight}`)
      if (main.scrollWidth > innerWidth) issues.push(`content width ${main.scrollWidth}`)
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent.trim()) continue
        const range = document.createRange(); range.selectNodeContents(node)
        for (const rect of range.getClientRects()) if (rect.width && (rect.left < -1 || rect.right > innerWidth + 1 || rect.top < -1 || rect.bottom > 397)) { issues.push(`text clipped: ${node.textContent.slice(0, 50)}`); break }
      }
      return { issues, height: main.scrollHeight, rasterImages: document.querySelectorAll('img').length, text: main.innerText }
    })
    assert.equal(metrics.rasterImages, 0, 'native examples contain no bitmap teaching content')
    await page.screenshot({ path: `${output}/${name.replace(/\.[^.]+$/, '')}.png`, animations: 'disabled' })
    report.examples.push({ name, ...metrics })
  }
  await page.setContent(renderNativeDocument(nativeExamples['01-028-diagram.webp'], base, custom))
  await page.getByLabel('Name', { exact: true }).fill('Esempio locale')
  await page.getByRole('button', { name: 'OK', exact: true }).click()
  assert.equal(await page.locator('output').textContent(), 'Dati ricevuti nell’esempio locale.')
  await page.setContent(renderNativeDocument(nativeExamples['02-031-diagram.webp'], base, custom))
  const lines = await page.locator('.native-flex').evaluateAll(nodes => nodes.map(node => new Set([...node.children].map(child => Math.round(child.getBoundingClientRect().top))).size))
  assert.equal(lines[0], 1, 'nowrap keeps every item on one line')
  assert.ok(lines[1] > 1, 'wrap demonstrates an actual second line')
  report.interactions = ['native form gives local feedback', 'wrap and nowrap produce different real layouts']
  assert.deepEqual(report.errors, [])
  assert.ok(report.examples.every(example => !example.issues.length), 'All native examples fit their canvas; inspect native-report.json')
  report.status = 'passed'
} catch (error) {
  report.status = 'failed'
  throw error
} finally {
  await browser.close()
  await writeFile(`${output}/native-report.json`, JSON.stringify(report, null, 2) + '\n')
}
console.log(JSON.stringify({ status: report.status, examples: report.examples.length, errors: report.errors }, null, 2))
