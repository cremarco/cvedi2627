import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile, readdir, rm } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'
import { checkExerciseSources } from './exercise-sources.mjs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'

const manifest = JSON.parse(await readFile('progetti/slide/assets/esercitazioni/manifest.json', 'utf8'))
const base = (process.env.EXERCISE_URL || 'http://localhost:3055').replace(/\/$/, '')
const output = 'reports/esercitazioni'
const indexesOnly = process.env.EXERCISE_INDEX_ONLY === '1'
const publishedSite = process.env.EXERCISE_SITE || 'progetti/slide/dist'
const publishedPrefix = process.env.EXERCISE_BASE || '/'
assert.ok(publishedPrefix.startsWith('/') && publishedPrefix.endsWith('/'), 'published base starts and ends with /')
await mkdir(output, { recursive: true })
if (!indexesOnly) for (const file of await readdir(output)) if (file.startsWith('failure-') || /^\d{2}-\d+-(desktop|narrow|print)\.png$/.test(file)) await rm(`${output}/${file}`)
const report = { status: 'running', scope: indexesOnly ? 'indexes' : 'complete', sources: await checkExerciseSources(), slides: [], failures: [], errors: [] }
const browser = await chromium.launch()
const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
const serve = require('sirv')(publishedSite, { dev: true })
const server = createServer((request, response) => {
  if (!request.url.startsWith(publishedPrefix)) { response.writeHead(404).end(); return }
  request.url = '/' + request.url.slice(publishedPrefix.length)
  serve(request, response, () => response.writeHead(404).end())
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const published = `http://127.0.0.1:${server.address().port}${publishedPrefix}`.replace(/\/$/, '')
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  for (const exercise of manifest.exercises) {
    const response = await page.request.get(`${published}/lezioni/${exercise.id}/`)
    assert.equal(response.status(), exercise.number === 1 ? 200 : 404, `${exercise.id}: authorized publication status`)
  }
  report.publication = { site: publishedSite, base: publishedPrefix, unavailableExerciseUrls: manifest.exercises.length - 1 }
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') report.errors.push(error.message) })
  for (const [profile, viewport, media] of [
    ['desktop', { width: 1280, height: 720 }, 'screen'],
    ['narrow', { width: 390, height: 844 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media })
    const index = await openSlide(page, base, 'indice-esercitazioni', { settle: true })
    assert.equal(await index.locator('.index-grid a').count(), 9)
    const localColors = await index.locator('.index-grid .btn').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor))
    await page.screenshot({ path: `${output}/index-${profile}.png` })
    const publicIndex = await openSlide(page, published, 'indice-esercitazioni', { settle: true })
    assert.equal(await publicIndex.locator('.index-grid a').count(), 1, 'the first exercise is linked online')
    assert.equal(await publicIndex.locator('.index-grid button:disabled[aria-disabled="true"]').count(), 8, 'the eight unpublished exercises remain disabled')
    assert.deepEqual(await publicIndex.locator('.index-grid .btn').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor)), localColors, 'online index preserves the same ordered colors')
    await publicIndex.locator('button').first().evaluate(node => node.click())
    assert.ok(page.url().endsWith('#/indice-esercitazioni'), 'disabled controls cannot navigate')
    await page.screenshot({ path: `${output}/published-index-${profile}.png` })
    if (indexesOnly) continue
    for (const exercise of manifest.exercises) {
      const number = String(exercise.number).padStart(2, '0')
      const data = JSON.parse(await readFile(`progetti/slide/data/esercitazioni/${number}.json`, 'utf8'))
      const lessonBase = `${base}/lezioni/${exercise.id}`
      const limit = Number(process.env.EXERCISE_LIMIT || data.length)
      for (const slide of data.slice(0, limit)) {
        const root = await openSlide(page, lessonBase, slide.number, { settle: true })
        if (!['cover', 'divider'].includes(slide.kind)) {
          await root.locator(`[data-exercise-slide="${slide.number}"]`).waitFor()
          assert.equal((await root.locator('.slide-index').textContent()).trim(), `${slide.number} / ${data.length}`, 'pagination stays inside the selected exercise')
          if (slide.sourceKind === 'official-docs') {
            assert.deepEqual(await root.locator('.exercise-code code').allTextContents(), slide.blocks.filter(block => block.kind === 'code').map(block => block.text), 'new code examples preserve exact text and indentation')
            assert.deepEqual(await root.locator('.exercise-sources a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), slide.sources.map(source => source.url), 'official references are linked in each new slide')
          }
        }
        if (profile !== 'print' && !['cover', 'divider'].includes(slide.kind)) {
          const progress = page.locator(`.presentation-progress-rail[data-lesson="${exercise.id}"] progress`)
          assert.equal(await progress.getAttribute('max'), String(data.length))
          assert.equal(await progress.getAttribute('value'), String(slide.number))
        }
        await root.evaluate(root => Promise.all([...root.querySelectorAll('img')].map(image => image.complete ? undefined : new Promise(resolve => { image.addEventListener('load', resolve, { once: true }); image.addEventListener('error', resolve, { once: true }) }))))
        const nativeIssues = []
        const resources = slide.blocks.flatMap(block => block.resources || [])
        if (resources.length) {
          assert.deepEqual(await root.locator('.exercise-resources a').evaluateAll(nodes => nodes.map(node => ({ title: node.childNodes[0].textContent, url: node.getAttribute('href') }))), resources)
          assert.equal(await root.locator('.exercise-resources a[target="_blank"][rel="noopener noreferrer"]').count(), resources.length, 'resource links open outside the isolated HTML examples')
        }
        for (const handle of await root.locator('.exercise-native-frame').elementHandles()) {
          const frame = await handle.contentFrame()
          await frame.locator('[data-native-root]').waitFor()
          await frame.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))) })
          const geometry = await frame.evaluate(() => ({ height: document.querySelector('main').scrollHeight, viewport: innerHeight, width: document.documentElement.scrollWidth, available: innerWidth, images: document.querySelectorAll('img').length }))
          if (geometry.height > geometry.viewport + 1 || geometry.width > geometry.available + 1 || geometry.images) nativeIssues.push(`native content clipped or rasterized: ${JSON.stringify(geometry)}`)
        }
        const metrics = await root.evaluate(root => {
          const stage = root.getBoundingClientRect(), scale = stage.width / 1280
          const title = root.querySelector('h1').getBoundingClientRect()
          const footer = root.querySelector('.slide-footer')?.getBoundingClientRect()
          const body = root.querySelector('.exercise-content')?.getBoundingClientRect()
          const issues = []
          if (body && body.top < title.bottom + 15 * scale) issues.push('body overlaps title')
          if (body && body.bottom > (footer?.top ?? stage.bottom - 45 * scale) - 10 * scale) issues.push('body overlaps footer')
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            if (!node.textContent.trim() || node.parentElement.closest('dialog, .slide-ribbon')) continue
            // A deliberately clipped screen-reader label has no painted text bounds.
            const hiddenLabel = node.parentElement.closest('.sr-only')
            if (hiddenLabel) {
              const style = getComputedStyle(hiddenLabel)
              if (style.position === 'absolute' && style.width === '1px' && style.height === '1px' && style.overflow === 'hidden') continue
            }
            const range = document.createRange(); range.selectNodeContents(node)
            for (const box of range.getClientRects()) if (box.width && (box.left < stage.left - 1 || box.right > stage.right + 1 || box.top < stage.top - 1 || box.bottom > stage.bottom + 1)) { issues.push('text outside canvas: ' + node.textContent.slice(0, 50)); break }
          }
          const images = [...root.querySelectorAll('img')]
          if (images.some(image => !image.complete || !image.naturalWidth)) issues.push('missing image')
          return { issues, titleTop: (title.top - stage.top) / scale, bodyHeight: body?.height / scale, images: images.length }
        })
        metrics.issues.push(...nativeIssues)
        if (metrics.issues.length) {
          report.failures.push({ exercise: number, slide: slide.number, source: slide.sourceSlide, profile, ...metrics })
          await page.screenshot({ path: `${output}/failure-${number}-${slide.number}-${profile}.png` })
        } else if (slide.number === 1 || slide.number === 4 || slide.blocks.some(block => ['native', 'resources'].includes(block.kind)) || slide.number === data.find(s => s.blocks.some(b => b.kind === 'code'))?.number || slide.number === data.find(s => s.blocks.some(b => b.kind === 'image'))?.number) await page.screenshot({ path: `${output}/${number}-${slide.number}-${profile}.png` })
        report.slides.push({ exercise: number, slide: slide.number, profile, ...metrics })
      }
      if (profile === 'desktop') {
        if (exercise.number === 6) {
          const modalSlide = data.find(slide => slide.blocks.some(block => block.example === 'framework:modal'))
          const modalRoot = await openSlide(page, lessonBase, modalSlide.number, { settle: true })
          const modalFrame = modalRoot.locator('.exercise-native-frame').contentFrame()
          await modalFrame.locator('dialog').waitFor({ state: 'attached' })
          assert.equal(await modalFrame.locator('dialog').evaluate(node => node.open), false)
          const trigger = modalFrame.getByRole('button', { name: 'Apri', exact: true })
          await trigger.focus(); await page.keyboard.press('Enter')
          await modalFrame.getByRole('dialog', { name: 'Posto prenotato' }).waitFor()
          await page.keyboard.press('Escape')
          assert.equal(await trigger.evaluate(node => document.activeElement === node), true, 'first Escape closes the dialog and restores its trigger')
          await page.keyboard.press('Enter')
          await modalFrame.getByRole('button', { name: 'Chiudi', exact: true }).click()
          assert.equal(await modalFrame.locator('dialog').evaluate(node => node.open), false, 'method=dialog works inside the real sandbox')
          assert.equal(await trigger.evaluate(node => document.activeElement === node), true)
          await page.keyboard.press('Escape')
          await page.waitForFunction(() => document.activeElement?.classList.contains('exercise-native'))
          await page.keyboard.press('ArrowRight')
          await page.waitForURL(url => url.hash === `#/${modalSlide.number + 1}`)
          const selectionSlide = data.find(slide => slide.blocks.some(block => block.example === 'framework:selection'))
          const selectionRoot = await openSlide(page, lessonBase, selectionSlide.number, { settle: true })
          await selectionRoot.locator('.exercise-native-frame').contentFrame().getByLabel('Scegli un turno').focus()
          await page.keyboard.press('ArrowDown')
          assert.equal(new URL(page.url()).hash, `#/${selectionSlide.number}`, 'arrow keys within controls do not navigate the presentation')
          await page.keyboard.press('Escape')
          await page.waitForFunction(() => document.activeElement?.classList.contains('exercise-native'))
          const loadingSlide = data.find(slide => slide.blocks.some(block => block.example === 'framework:loading'))
          const loadingRoot = await openSlide(page, lessonBase, loadingSlide.number, { settle: true })
          const loadingFrame = await (await loadingRoot.locator('.exercise-native-frame').elementHandle()).contentFrame()
          await loadingFrame.waitForFunction(() => document.documentElement.hasAttribute('data-native-paused'))
          await page.emulateMedia({ reducedMotion: 'no-preference' })
          await loadingFrame.waitForFunction(() => !document.documentElement.hasAttribute('data-native-paused'))
          await page.emulateMedia({ reducedMotion: 'reduce' })
          await loadingFrame.waitForFunction(() => document.documentElement.hasAttribute('data-native-paused'))
          const formSlide = data.find(slide => slide.blocks.some(block => block.example === 'framework:form'))
          const formRoot = await openSlide(page, lessonBase, formSlide.number, { settle: true })
          const formFrame = formRoot.locator('.exercise-native-frame').contentFrame()
          await formFrame.getByRole('button', { name: 'Iscriviti', exact: true }).click()
          assert.equal(await formFrame.getByRole('status').textContent(), '', 'invalid form has no confirmation')
          await formFrame.getByLabel('Nome e cognome', { exact: true }).fill('Esempio didattico')
          await formFrame.getByLabel('Email', { exact: true }).fill('studente@example.org')
          await formFrame.getByRole('button', { name: 'Iscriviti', exact: true }).click()
          assert.equal(await formFrame.getByRole('status').textContent(), 'Dati ricevuti nell’esempio locale.', 'the real iframe sandbox permits the locally handled submit event')
          const formHandle = await formRoot.locator('.exercise-native-frame').elementHandle()
          await (await formHandle.contentFrame()).waitForFunction(() => document.querySelector('main').scrollHeight <= innerHeight)
          report.interactions = ['dialog opens on request', 'Escape returns from the iframe to slide keyboard navigation', 'control arrow keys remain local', 'playback state reaches the isolated example', 'valid form confirms locally inside the actual sandbox']
          const actionSlide = data.find(slide => slide.blocks.some(block => block.example === 'framework:actionAndLink'))
          const actionRoot = await openSlide(page, lessonBase, actionSlide.number, { settle: true })
          const actionFrame = actionRoot.locator('.exercise-native-frame').contentFrame()
          await actionFrame.getByRole('button', { name: 'Salva la bozza', exact: true }).click()
          assert.equal(await actionFrame.getByRole('status').textContent(), 'Bozza salvata (demo).')
          await actionFrame.getByRole('link', { name: 'Vai al programma', exact: true }).click()
          assert.equal(await actionFrame.locator('#programma').evaluate(() => location.href), 'about:srcdoc#programma', 'the anchor reaches its own target without loading the enclosing deck')
          assert.equal(new URL(page.url()).hash, `#/${actionSlide.number}`, 'the worked link navigates inside its example')
          const choicesSlide = data.find(slide => slide.blocks.some(block => block.example === 'framework:exclusiveChoices'))
          const choicesRoot = await openSlide(page, lessonBase, choicesSlide.number, { settle: true })
          const choicesFrame = choicesRoot.locator('.exercise-native-frame').contentFrame()
          await choicesFrame.getByRole('radio', { name: 'Pomeriggio', exact: true }).check()
          assert.equal(await choicesFrame.getByRole('radio', { name: 'Mattina', exact: true }).isChecked(), false)
          await choicesFrame.getByRole('checkbox', { name: 'Slide', exact: true }).check()
          await choicesFrame.getByRole('checkbox', { name: 'Esercizi', exact: true }).check()
          assert.equal(await choicesFrame.locator('input[type=checkbox]:checked').count(), 2)
          report.interactions.push('worked action, local link, radios and checkboxes run inside Slidev')
        }
        if (exercise.number === 7) {
          const themeSlide = data.find(slide => slide.blocks.some(block => block.example === 'framework:themeSwitch'))
          const themeRoot = await openSlide(page, lessonBase, themeSlide.number, { settle: true })
          const themeFrame = themeRoot.locator('.exercise-native-frame').contentFrame()
          const surface = themeFrame.locator('main > div')
          const before = await surface.evaluate(node => getComputedStyle(node).backgroundColor)
          await themeFrame.getByRole('checkbox', { name: 'Tema scuro', exact: true }).check()
          assert.notEqual(await surface.evaluate(node => getComputedStyle(node).backgroundColor), before)
          await themeFrame.getByRole('checkbox', { name: 'Tema scuro', exact: true }).uncheck()
          assert.equal(await surface.evaluate(node => getComputedStyle(node).backgroundColor), before)
          report.interactions.push('worked theme switch updates and restores the actual Slidev example')
        }
        const figureSlide = data.find(slide => slide.blocks.some(block => block.kind === 'image'))
        if (figureSlide) {
          const figureRoot = await openSlide(page, lessonBase, figureSlide.number, { settle: true })
          const trigger = figureRoot.locator('.lesson-image-button').first()
          await trigger.focus(); await page.keyboard.press('Enter')
          await page.locator('dialog[open]').waitFor()
          await page.keyboard.press('Escape')
          assert.equal(await trigger.evaluate(node => node === document.activeElement), true, 'image dialog returns keyboard focus')
        }
        const back = page.getByRole('link', { name: 'Torna al menu delle esercitazioni', exact: true })
        assert.equal(await back.getAttribute('href'), '/#/indice-esercitazioni')
        await back.focus(); await page.keyboard.press('Enter')
        await page.getByRole('heading', { name: 'Indice delle esercitazioni', exact: true }).waitFor()
      }
      console.log(`${profile}: esercitazione ${number}, ${Math.min(limit, data.length)} slide verificate`)
    }
  }
  assert.deepEqual(report.errors, [])
  assert.equal(report.failures.length, 0, 'All imported slides fit the canvas; inspect render-report.json for any failures')
  report.status = 'passed'
} catch (error) {
  report.status = 'failed'
  throw error
} finally {
  await browser.close()
  await new Promise(resolve => server.close(resolve))
  await writeFile(`${output}/${indexesOnly ? 'index-report' : 'render-report'}.json`, JSON.stringify(report, null, 2) + '\n')
}
