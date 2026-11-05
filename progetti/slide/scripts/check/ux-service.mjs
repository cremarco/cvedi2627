import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'

const manifest = JSON.parse(await readFile('progetti/slide/assets/booklet/lezione-processo-ux-ui/manifest.json', 'utf8'))
const fixture = JSON.parse(await readFile('progetti/slide/data/ux-service-prototype.json', 'utf8'))
const base = (process.env.SLIDEV_URL || 'http://localhost:3048').replace(/\/$/, '') + '/lezioni/processo-ux-ui'
const output = 'reports/processo-ux-ui-slidev/servizio'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
const reports = [], checks = [], failures = [], errors = []
page.on('pageerror', error => { if (!error.message.includes('Wake Lock permission request denied')) errors.push(error.message) })
let prototype, fatal
const require = (condition, description) => {
  checks.push({ description, passed: !!condition })
  if (!condition) failures.push(description)
}
const click = async id => { if (id === 'service-send') await prototype.getByTestId('service-consent').check(); await prototype.getByTestId(id).click() }
async function waitStage(value) {
  await page.waitForFunction(value => document.querySelector('.slidev-layout.is-active [data-testid="ux-service-prototype"]')?.getAttribute('data-stage') === value, value)
}
async function openVersion(version) {
  const slide = manifest.slides.find(slide => slide.kind === 'service-prototype' && slide.prototypeVersion === version)
  assert.ok(slide, `${version}: intentional prototype slide in manifest`)
  await openSlide(page, base, slide.alias, { settle: true })
  prototype = page.locator('.slidev-layout.is-active [data-testid="ux-service-prototype"]')
  require(await prototype.getAttribute('data-version') === version, `${version}: owning version rendered`)
  return slide
}
const detailVersions = new Set()
async function selectVisit(index) {
  await click('service-choose-' + index)
  await waitStage('detail')
  require(await prototype.getByTestId('service-state-heading').innerText() === 'La tua visita a domicilio.', 'selection opens the wireframe detail before the summary')
  require(await prototype.getByTestId('service-continue').innerText() === 'Continua al riepilogo', 'the detail leads explicitly to the summary')
  require((await prototype.locator('.prototype-summary').innerText()).includes('60 €'), 'the detail exposes the total before request submission')
  const version = await prototype.getAttribute('data-version')
  if (!detailVersions.has(version)) { await inspect(version + '-dettaglio'); detailVersions.add(version) }
  await click('service-continue')
  await waitStage('review')
  require(await prototype.getByTestId('service-state-heading').innerText() === 'Un ultimo sguardo, poi ci incontriamo.', 'the next screen uses the approved summary heading')
}
async function inspect(name, mode = 'desktop') {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const report = await prototype.evaluate(root => {
    const outer = root.getBoundingClientRect(), canvas = root.closest('.slidev-layout').getBoundingClientRect()
    const app = root.querySelector('.prototype-app').getBoundingClientRect(), side = root.querySelector('.prototype-teaching').getBoundingClientRect()
    const screen = root.querySelector('.prototype-screen').getBoundingClientRect()
    const footer = root.closest('.slidev-layout').querySelector('.slide-footer').getBoundingClientRect()
    const overflow = [], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim() || node.parentElement.closest('.sr-only')) continue
      const range = document.createRange(); range.selectNodeContents(node)
      const bound = node.parentElement.closest('.prototype-screen') ? screen : node.parentElement.closest('.prototype-teaching') ? side : outer
      for (const rect of range.getClientRects()) {
        if (!rect.width) continue
        if (rect.left < bound.left - 1 || rect.right > bound.right + 1 || rect.top < bound.top - 1 || rect.bottom > bound.bottom + 1 || rect.bottom > footer.top - 6 * canvas.width / 1280)
          overflow.push(node.textContent.trim())
      }
    }
    const controls = [...root.querySelectorAll('button, input, select')].filter(node => node.getClientRects().length > 0)
    const labels = [...root.querySelectorAll('label')].filter(node => node.getClientRects().length > 0)
    return {
      stage: root.dataset.stage, version: root.dataset.version, overflow: [...new Set(overflow)],
      appHeight: app.height, sideHeight: side.height,
      targetSizes: controls.map(node => { const target = node.matches('input[type=checkbox]') ? node.closest('label') : node; return { width: parseFloat(getComputedStyle(target).width), height: parseFloat(getComputedStyle(target).height) } }),
      labelsAssociated: labels.every(label => label.htmlFor === label.querySelector('input, select')?.id),
      focusedHeading: root.querySelector('.prototype-screen h3') === document.activeElement,
      printVisible: !!root.querySelector('.prototype-print')?.getClientRects().length,
      productVisible: !!root.querySelector('.prototype-app')?.getClientRects().length,
      titleTop: (root.closest('.slidev-layout').querySelector('h1').getBoundingClientRect().top - canvas.top) / (canvas.width / 1280),
      canvasFits: canvas.top >= -1 && canvas.left >= -1 && canvas.right <= innerWidth + 1 && canvas.bottom <= innerHeight + 1,
    }
  })
  reports.push({ name, mode, ...report })
  require(!report.overflow.length, `${name}: visible text fits the screen, teaching pane and footer`)
  require(Math.abs(report.titleTop - 52) < .5 && report.canvasFits, `${name}: canvas and title retain the shared slide placement`)
  if (mode !== 'print') {
    require(report.targetSizes.every(size => size.width >= 44 && size.height >= 44), `${name}: controls retain 44 px targets on the slide canvas`)
    require(report.labelsAssociated, `${name}: input labels remain associated`)
  }
  await page.screenshot({ path: `${output}/${name}.png` })
  return report
}

try {
  // V0 and V1 retain their deliberate shortcomings; the comparisons demonstrate changes, not a user study.
  await openVersion('v0')
  await inspect('v0-lista')
  require(await prototype.locator('.prototype-price').count() === 0, 'V0: list postpones the cost until the detail')
  require(await prototype.locator('.prototype-search-summary').count() === 0, 'V0: list does not expose zone and evening compatibility')
  await selectVisit(0)
  require((await prototype.locator('.prototype-summary').innerText()).includes('60 €'), 'V0: cost appears in the detail')
  require(await prototype.getByTestId('service-send').innerText() === 'Prenota', 'V0: original ambiguous action retained for comparison')
  await click('service-send')
  require(await prototype.getByTestId('service-state-heading').innerText() === 'Prenotazione ricevuta', 'V0: receipt retains the intentionally ambiguous wording')
  await inspect('v0-ricevuta')

  await openVersion('v1')
  await inspect('v1-compatibilita')
  require(await prototype.locator('.prototype-price').count() === 2, 'V1: both visits expose total cost before selection')
  require((await prototype.locator('.prototype-search-summary').innerText()).includes('dopo le 20'), 'V1: evening and zone criteria precede selection')
  require((await prototype.locator('.prototype-price').first().innerText()).toLowerCase().includes('spostamento incluso'), 'V1: total price includes travel')
  await selectVisit(0)
  require(await prototype.getByTestId('service-send').innerText() === 'Prenota', 'V1: action wording remains the next issue to revise')
  await click('service-send')
  require(await prototype.getByTestId('service-state-heading').innerText() === 'Prenotazione ricevuta', 'V1: receipt still motivates the next revision')

  await openVersion('v2')
  await inspect('v2-riepilogo')
  require(await prototype.getByTestId('service-send').innerText() === 'Invia richiesta', 'V2: action states that it sends a request')
  await click('service-send')
  require((await prototype.getByTestId('service-pending-note').innerText()).includes('non è ancora confermata'), 'V2: sending does not falsely confirm the visit')
  require(await prototype.getByTestId('simulate-confirm').isEnabled(), 'V2: professional acceptance is a separate event')
  await click('simulate-confirm')
  require(await prototype.getByTestId('service-state-heading').innerText() === 'Il tuo prossimo passo è fissato.', 'V2: acceptance produces the confirmed state')
  await inspect('v2-conferma')

  const finalSlide = await openVersion('v3')
  await inspect('v3-ricerca')
  const header = await prototype.locator('.prototype-header').evaluate(element => {
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
    function rgb(color) { ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3) }
    function luminance(values) { return values.map(value => { const x = value / 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4 }).reduce((sum, x, index) => sum + x * [.2126, .7152, .0722][index], 0) }
    const text = luminance(rgb(getComputedStyle(element.querySelector('strong')).color)), background = luminance(rgb(getComputedStyle(element).backgroundColor))
    return (Math.max(text, background) + .05) / (Math.min(text, background) + .05)
  })
  require(header >= 4.5, 'V3: service title contrasts with the white wireframe header')

  const originalUrl = page.url()
  await prototype.getByTestId('service-address').focus(); await page.keyboard.press('ArrowRight')
  require(page.url() === originalUrl, 'input arrow keys do not navigate the deck')
  await page.keyboard.press('Escape')
  require(await prototype.getByTestId('service-address').evaluate(node => document.activeElement !== node), 'Escape releases the input focus')
  await prototype.getByTestId('service-address').fill('')
  await click('service-search')
  require(await prototype.getByTestId('service-address').getAttribute('aria-invalid') === 'true', 'blank domicile is identified as an input error')
  require(await prototype.getByTestId('service-address').evaluate(node => document.activeElement === node), 'invalid domicile receives focus')
  await inspect('v3-errore-domicilio')

  await prototype.getByTestId('service-address').fill(fixture.service.address)
  await prototype.getByTestId('service-cap').fill('00100')
  await click('service-search'); await waitStage('outside')
  await inspect('v3-fuori-copertura')
  await prototype.getByRole('button', { name: 'Chiedi assistenza', exact: true }).click()
  await waitStage('help'); await inspect('v3-assistenza')
  await prototype.getByRole('button', { name: 'Riprendi la ricerca', exact: true }).click()
  require(await prototype.getByTestId('service-address').inputValue() === fixture.service.address, 'assistance preserves the domicile')
  await prototype.getByTestId('service-cap').fill('20121'); await prototype.getByTestId('service-period').selectOption('mattina')
  await click('service-search'); await waitStage('empty'); await inspect('v3-nessun-risultato')
  await click('service-recover-search')
  require(await prototype.getByTestId('service-address').inputValue() === fixture.service.address, 'empty search preserves the domicile')
  await prototype.getByTestId('service-cap').fill('20121'); await prototype.getByTestId('service-period').selectOption('sera')
  await prototype.getByTestId('service-search').focus(); await page.keyboard.press('Enter')
  await waitStage('results'); await inspect('v3-risultati')
  require(await prototype.locator('.prototype-screen h3').evaluate(node => document.activeElement === node), 'new result screen receives meaningful focus')
  require((await prototype.getByTestId('service-choose-0').getAttribute('aria-label')).includes('Giulia Riva'), 'repeated selection actions have distinct accessible names')

  await selectVisit(0); await inspect('v3-riepilogo')
  await click('simulate-conflict'); await waitStage('conflict'); await inspect('v3-orario-perso')
  const saved = await prototype.getByTestId('service-saved-data').innerText()
  require(saved.includes(fixture.service.address) && saved.includes('17 novembre') && saved.includes('dopo le 20'), 'slot conflict preserves domicile, day and period')
  await click('service-alternative')
  const alternative = await prototype.locator('.prototype-summary').innerText()
  require(alternative.includes('21:15') && alternative.includes(fixture.service.address) && alternative.includes('45 minuti') && alternative.includes('60 €'), 'alternative changes only the time and retains the agreed visit details')
  await click('service-send'); await waitStage('pending'); await inspect('v3-attesa')
  require((await prototype.getByTestId('service-pending-note').innerText()).includes('non è ancora confermata'), 'V3: request remains pending before professional acceptance')
  await click('service-visits')
  require(await prototype.getAttribute('data-stage') === 'pending', 'Le mie visite retrieves the pending request')
  await click('simulate-confirm'); await waitStage('confirmed'); await inspect('v3-conferma')

  await click('service-modify'); await waitStage('search'); await inspect('v3-modifica')
  require((await prototype.locator('.prototype-edit-note').innerText()).includes('21:15'), 'rescheduling keeps the existing visit visible')
  await prototype.getByTestId('service-address').fill('Via Esempio 99, Milano')
  await click('service-search'); await waitStage('results'); await selectVisit(1); await click('service-send')
  await inspect('v3-modifica-in-attesa')
  require((await prototype.getByTestId('service-pending-note').innerText()).includes('precedente resta confermata'), 'new pending request does not revoke the old visit')
  await click('service-cancel'); await inspect('v3-annulla-nuova-richiesta')
  await click('service-cancel-confirm'); await waitStage('confirmed')
  const preserved = await prototype.locator('.prototype-summary').innerText()
  require(preserved.includes('21:15') && preserved.includes(fixture.service.address), 'cancelling the new request preserves old time and domicile')
  await inspect('v3-visita-precedente-conservata')

  await click('service-modify'); await prototype.getByTestId('service-address').fill('Via Esempio 99, Milano')
  await click('service-search'); await waitStage('results'); await selectVisit(1); await click('service-send')
  await click('simulate-confirm'); await waitStage('confirmed')
  const changed = await prototype.locator('.prototype-summary').innerText()
  require(changed.includes('21:45') && changed.includes('Via Esempio 99'), 'acceptance replaces the old visit with the requested new details')
  await inspect('v3-modifica-confermata')
  await click('service-cancel')
  require(await prototype.getAttribute('data-stage') === 'confirmed', 'annulment requires an explicit second action')
  await inspect('v3-conferma-annullamento'); await click('service-cancel-confirm'); await waitStage('cancelled')
  await inspect('v3-annullata'); await click('service-visits'); await waitStage('visits'); await inspect('v3-visite-vuote')

  // Refusal is a real alternative to acceptance; it never destroys an existing confirmed visit.
  await click('prototype-reset'); await click('service-search'); await waitStage('results'); await selectVisit(0); await click('service-send')
  await click('simulate-reject'); await waitStage('declined'); await inspect('v3-richiesta-non-accettata')
  require((await prototype.getByTestId('service-rejected-data').innerText()).includes(fixture.service.address), 'professional refusal preserves the search criteria')
  require((await prototype.locator('.prototype-screen').innerText()).includes('non è stata confermata'), 'professional refusal never becomes a confirmed visit')
  await click('service-rejected-alternatives'); await waitStage('results')
  require(await prototype.locator('.prototype-result').count() === 2 && (await prototype.getByTestId('service-choose-0').getAttribute('aria-label')).includes('21:15') && await prototype.locator('.prototype-slots').getByRole('button', { name: '20:30', exact: true }).count() === 0, 'refused slot is excluded while the same professional can still offer 21:15')
  await inspect('v3-alternative-dopo-rifiuto')

  await click('prototype-reset'); await click('service-search'); await waitStage('results'); await selectVisit(0); await click('service-send'); await click('simulate-confirm')
  await click('service-modify'); await click('service-search'); await waitStage('results'); await selectVisit(1); await click('service-send')
  await click('simulate-reject'); await waitStage('declined'); await inspect('v3-modifica-non-accettata')
  require((await prototype.getByTestId('service-old-visit').innerText()).includes('20:30'), 'refused rescheduling preserves the old confirmed time')
  await click('service-keep-old'); await waitStage('confirmed')
  require((await prototype.locator('.prototype-summary').innerText()).includes('20:30'), 'old visit remains retrievable after the new request is refused')
  await inspect('v3-visita-conservata-dopo-rifiuto')

  await click('prototype-reset'); await click('service-search'); await waitStage('results'); await selectVisit(1)
  await prototype.getByTestId('service-send').click()
  require(await prototype.getByTestId('service-consent').getAttribute('aria-invalid') === 'true', 'missing consent is exposed as an invalid control')
  require(await prototype.getByTestId('service-consent').evaluate(node => node === document.activeElement), 'consent-only error receives focus')
  await prototype.getByTestId('service-consent').check()
  require(await prototype.getByTestId('service-consent').getAttribute('aria-invalid') === 'false', 'corrected consent clears its invalid state')
  await click('simulate-conflict'); await waitStage('conflict')
  const lostLuca = await prototype.locator('.prototype-state-note').innerText()
  require(lostLuca.includes('Luca Sala') && lostLuca.includes('21:45'), 'slot loss follows the selected professional and time')
  await inspect('v3-slot-luca-perso')
  await click('service-alternative'); await waitStage('review')
  require((await prototype.locator('.prototype-summary').innerText()).includes('Giulia Riva'), 'recovery offers a remaining professional when the selected one has no other slots')
  require((await prototype.locator('.prototype-summary').innerText()).includes('20:30'), 'the offered alternative is an actually available remaining slot')

  await page.setViewportSize({ width: 636, height: 778 })
  await openSlide(page, base, finalSlide.alias, { settle: true }); prototype = page.locator('.slidev-layout.is-active [data-testid="ux-service-prototype"]')
  await click('prototype-reset'); await inspect('narrow-ricerca', 'narrow')
  await click('service-search'); await waitStage('results'); await selectVisit(0); await click('simulate-conflict')
  await inspect('narrow-recupero', 'narrow')
  await click('service-alternative'); await click('service-send'); await click('simulate-confirm')
  await inspect('narrow-conferma', 'narrow')

  await page.setViewportSize({ width: 1280, height: 720 }); await page.emulateMedia({ media: 'print' })
  await prototype.locator('.prototype-print').waitFor({ state: 'visible' })
  await page.mouse.move(0, 0)
  const printed = await inspect('stampa-servizio', 'print')
  require(printed.printVisible && !printed.productVisible, 'print uses the complete deterministic service summary')
  const printText = await prototype.locator('.prototype-print').innerText()
  require(printText.includes('Nessuna richiesta viene inviata') && printText.includes('senza geocodifica') && printText.includes('spostamento incluso'), 'print retains prototype limits and total-price conditions')
  await page.emulateMedia({ media: 'screen' }); await prototype.locator('.prototype-app').waitFor({ state: 'visible' })
  require(await prototype.getAttribute('data-stage') === 'confirmed', 'return from print preserves the current interactive state')
  await click('prototype-reset'); await prototype.getByTestId('service-address').focus(); await page.keyboard.press('Escape'); await page.keyboard.press('ArrowRight')
  await page.waitForFunction(alias => location.hash !== '#/' + alias, finalSlide.alias)
  require(!page.url().endsWith('/#/' + finalSlide.alias), 'Escape returns subsequent arrow keys to slide navigation')
} catch (error) {
  fatal = error
  errors.push(error.stack || String(error))
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ description: 'Behavioral checks of a simulated teaching prototype; no research participants or real requests.', base, checks, failures, errors, reports }, null, 2) + '\n')
  await browser.close()
}
if (fatal) throw fatal
assert.deepEqual(failures, [])
assert.deepEqual(errors, [])
console.log(`UX service: ${checks.length} checks, ${reports.length} rendered states; V0–V3, search, recovery, request, acceptance, rescheduling, cancellation, keyboard, narrow viewport and print passed.`)
