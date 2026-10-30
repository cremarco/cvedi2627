import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'
import { registry, lessonTables, processTables } from '../../data/lesson-tables.mjs'

const plan = JSON.parse(await readFile('progetti/slide/assets/booklet/lezione-processo-ux-ui/content-plan.json', 'utf8'))
const source = await readFile(registry.source, 'utf8')
assert.equal(createHash('sha256').update(source).digest('hex'), registry.sourceSha256, 'the table transcription follows the current source')
const sourceTables = source.split(/(?=#let [\w-]+\(\) = graphic\[)/)
  .filter(block => /^#let/.test(block) && /#(?:record|matrix)\(/.test(block))
  .map(block => block.match(/^#let ([\w-]+)/)[1])
assert.deepEqual(Object.keys(registry.tables).map(src => src.split('/').at(-1).replace('.svg', '')).sort(), sourceTables.sort(), 'all source tables have native HTML transcriptions')
for (const definition of Object.values(lessonTables)) {
  assert.equal(Math.round(definition.widths.reduce((sum, value) => sum + value, 0)), 100)
  assert.ok(definition.rows.length && definition.rows.every(row => row.length === definition.widths.length && row.every(Boolean)))
  assert.ok(!definition.headers.length || definition.headers.length === definition.widths.length)
}
const service = JSON.parse(await readFile('progetti/slide/data/ux-service-case.json', 'utf8'))
const tableSlides = plan.slides.flatMap(slide => {
  const tables = slide.figures.filter(code => processTables[code]).map(code => ({ slide, code, definition: processTables[code] }))
  if (slide.kind === 'case-application') {
    const stage = service.stages.find(stage => stage.step === slide.step)
    tables.push({ slide, code: slide.slug, definition: {
      headers: slide.caseLayout === 'comparison' ? ['Alternativa', stage.artifactTitle] : [],
      rows: stage.rows.map(row => [row.label, row.text]),
    } })
  }
  if (slide.kind === 'decision-table') tables.push({ slide, code: slide.slug, definition: {
    headers: ['Incertezza', 'Prossima attività', 'Domanda da affrontare'],
    rows: slide.rows.map(row => [row.uncertainty, row.activity, row.question]),
  } })
  return tables
})
const base = (process.env.SLIDEV_URL || 'http://localhost:3030').replace(/\/$/, '')
const output = 'reports/processo-ux-ui-slidev/native-tables'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = [], failures = [], errors = []
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
  for (const [mode, viewport, media] of [
    ['desktop', { width: 1280, height: 720 }, 'screen'],
    ['narrow', { width: 636, height: 778 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media })
    for (const { slide, code, definition } of tableSlides) {
      const root = await openSlide(page, base + '/lezioni/processo-ux-ui', slide.alias, { settle: true })
      const report = await root.evaluate(root => {
        const canvas = root.getBoundingClientRect(), scale = canvas.width / 1280
        const table = root.querySelector('table')
        if (!table) return { missingTable: true }
        const region = table.closest('.lesson-table-figure, .ux-case-artifact') ?? table
        const overflow = [], walker = document.createTreeWalker(region, NodeFilter.SHOW_TEXT)
        const introBottom = (root.querySelector('.lesson-teaching-intro') ?? root.querySelector('h1')).getBoundingClientRect().bottom
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('.sr-only')) continue
          const range = document.createRange(); range.selectNodeContents(node)
          for (const rect of range.getClientRects())
            if (rect.width && (rect.left < canvas.left + 71 * scale || rect.right > canvas.right - 71 * scale || rect.bottom > canvas.top + 639 * scale || rect.top < introBottom + 15 * scale)) overflow.push(node.textContent.trim())
        }
        const range = document.createRange(); range.selectNodeContents(table)
        const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range)
        const selectedText = selection.toString(); selection.removeAllRanges()
        return { rows: [...table.querySelectorAll('tbody tr')].map(row => [...row.children].map(cell => cell.textContent.trim())),
          headings: [...table.querySelectorAll('thead th')].map(cell => cell.textContent.trim()),
          scopes: [...table.querySelectorAll('th')].every(cell => cell.scope === (cell.closest('thead') ? 'col' : 'row')),
          labelSizes: [...table.querySelectorAll('th')].map(cell => parseFloat(getComputedStyle(cell).fontSize)),
          bodySizes: [...table.querySelectorAll('td')].map(cell => parseFloat(getComputedStyle(cell).fontSize)),
          selectable: getComputedStyle(table).userSelect === 'text' && selectedText.length > 50,
          images: region.querySelectorAll('img, svg, canvas, .lesson-image-button').length,
          overflow: [...new Set(overflow)], caption: region.querySelector('figcaption')?.textContent.trim() }
      })
      reports.push({ mode, code, ...report })
      try {
        assert.ok(!report.missingTable, 'native table present')
        assert.deepEqual(report.rows, definition.rows, 'complete cell content')
        assert.deepEqual(report.headings, definition.headers, 'complete column headings')
        assert.ok(report.scopes && report.selectable && report.images === 0, 'semantic, selectable HTML with no image')
        assert.ok(report.labelSizes.every(size => size >= (slide.kind === 'case-application' ? 18 : 20)) && report.bodySizes.every(size => size >= 20), 'readable table type')
        assert.deepEqual(report.overflow, [], 'table stays in the content safe area')
      } catch (error) { failures.push(`${mode}/${code}: ${error.message}`) }
      if (['confronto-alternative', 'requisiti', 'caso-servizio-finale', 'caso-journey'].includes(code)) await page.screenshot({ path: `${output}/${mode}-${code}.png` })
    }
  }
  assert.deepEqual(errors, [], 'no page errors')
} finally {
  await browser.close()
  await writeFile(`${output}/report.json`, JSON.stringify({ reports, failures, errors }, null, 2) + '\n')
}
assert.deepEqual(failures, [])
console.log(`Native HTML tables: ${reports.length} desktop, narrow and print states passed.`)
