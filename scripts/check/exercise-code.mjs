import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { highlightExerciseCode, exerciseCodeLanguage } from '../../utils/exercise-code.mjs'
import { nativeExamples, renderNativeDocument } from '../../data/esercitazioni/native-examples.mjs'
import { openSlide } from './browser.mjs'

const data = await Promise.all(Array.from({ length: 9 }, (_, i) => readFile(`data/esercitazioni/${String(i + 1).padStart(2, '0')}.json`, 'utf8').then(JSON.parse)))
const snippets = data.flatMap(slides => slides.flatMap(slide => slide.blocks.filter(block => block.kind === 'code').map(block => block.text)))
snippets.push('<script>window.codeExecuted=true</script>\n<input onfocus="alert(1)" value="<&>">', 'const x = "<span>";\r\n\t// comment\r\n')
const base = await readFile('assets/esercitazioni/tailwind-daisyui/render.css', 'utf8')
const custom = await readFile('assets/esercitazioni/tailwind-daisyui/custom.css', 'utf8')
const folder = 'reports/exercise-code'
await mkdir(folder, { recursive: true })
const report = { status: 'running', sourceBlocks: snippets.length - 2, renders: [], errors: [] }
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') report.errors.push(error.message) })
  const html = snippets.map(code => `<div class="mockup-code"><pre><code>${highlightExerciseCode(code)}</code></pre></div>`).join('')
  await page.setContent(renderNativeDocument({ html }, base, custom))
  // HTML parsers normalize CRLF; test the helper's exact source preservation separately.
  assert.deepEqual(await page.locator('main .mockup-code code').allTextContents(), snippets.map(code => code.replaceAll('\r\n', '\n').replaceAll('\r', '\n')))
  assert.equal(await page.locator('main script, main input').count(), 0, 'highlighted source is inert text')
  assert.equal(await page.evaluate(() => window.codeExecuted), undefined)
  const colors = await page.locator('main .mockup-code code span').evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).color))])
  assert.ok(colors.length >= 5, 'syntax receives distinct token colors')
  const contrasts = await page.locator('main .mockup-code').first().evaluate(panel => {
    const rgb = color => color.match(/[\d.]+/g).slice(0, 3).map(Number)
    const luminance = values => values.map(value => { const v = value / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0)
    const canvas = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
    canvas.fillStyle = getComputedStyle(panel).backgroundColor; canvas.fillRect(0, 0, 1, 1)
    const background = luminance([...canvas.getImageData(0, 0, 1, 1).data].slice(0, 3))
    const colors = [...new Set([...document.querySelectorAll('main .mockup-code span')].map(node => getComputedStyle(node).color))]
    return colors.map(color => { const text = luminance(rgb(color)); return { color, ratio: (Math.max(text, background) + .05) / (Math.min(text, background) + .05) } })
  })
  assert.ok(contrasts.every(color => color.ratio >= 4.5), JSON.stringify(contrasts.filter(color => color.ratio < 4.5)))
  report.contrast = contrasts

  const firstCode = (exercise, language) => ({ exercise, slide: data[exercise - 1].find(slide => slide.blocks.some(block => block.kind === 'code' && exerciseCodeLanguage(block.text) === language)).number })
  const firstNativeCode = exercise => ({ exercise, slide: data[exercise - 1].find(slide => slide.blocks.some(block => block.kind === 'native' && nativeExamples[block.example]?.html.includes('mockup-code'))).number })
  const cases = [firstCode(1, 'html'), firstCode(2, 'css'), firstCode(5, 'javascript'), { exercise: 6, slide: 29 }, firstCode(7, 'css'), firstNativeCode(1), firstNativeCode(8), firstCode(9, 'javascript')]
  for (const [profile, viewport, media] of [['desktop', { width: 1280, height: 720 }, 'screen'], ['narrow', { width: 390, height: 844 }, 'screen'], ['print', { width: 1280, height: 720 }, 'print']]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media })
    for (const { exercise, slide } of cases) {
      const number = String(exercise).padStart(2, '0')
      const root = await openSlide(page, `http://localhost:3035/lezioni/esercitazione-${number}`, slide, { settle: true })
      await root.locator(`[data-exercise-slide="${slide}"]`).waitFor()
      const expected = data[exercise - 1][slide - 1].blocks.filter(block => block.kind === 'code').map(block => block.text)
      assert.deepEqual(await root.locator('.exercise-code code').allTextContents(), expected)
      let colored = await root.locator('.exercise-code code span[style]').count()
      for (const handle of await root.locator('.exercise-native-frame').elementHandles()) {
        const frame = await handle.contentFrame()
        await frame.locator('main').waitFor()
        colored += await frame.locator('.mockup-code code span[style]').count()
      }
      assert.ok(colored > 0, `${number}/${slide}: syntax remains colored in ${profile}`)
      const bounds = await root.evaluate(root => {
        const scale = root.getBoundingClientRect().width / 1280, body = root.querySelector('.exercise-content').getBoundingClientRect()
        return { top: (body.top - root.querySelector('h1').getBoundingClientRect().bottom) / scale, bottom: (root.querySelector('.slide-footer').getBoundingClientRect().top - body.bottom) / scale }
      })
      assert.ok(bounds.top >= 15 && bounds.bottom >= 10, `${number}/${slide}: ${JSON.stringify(bounds)}`)
      await page.screenshot({ path: `${folder}/${number}-${slide}-${profile}.png` })
      report.renders.push({ exercise, slide, profile, coloredTokens: colored, ...bounds })
    }
  }
  assert.deepEqual(report.errors, [])
  report.status = 'passed'
} finally {
  await browser.close()
  await writeFile(`${folder}/report.json`, JSON.stringify(report, null, 2) + '\n')
}
console.log(JSON.stringify({ status: report.status, sourceBlocks: report.sourceBlocks, renders: report.renders.length, colors: report.contrast.length }))
