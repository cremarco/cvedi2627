import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'
import { openSlide } from './browser.mjs'

const deck = await loadSlideDeck()
const slides = deck.slides.filter(s => s.frontmatter.interactiveExample)
assert.equal(slides.length, 17)
const exampleSources = JSON.parse(await readFile(new URL('../../assets/booklet/accessibilita-commenti-2026-10/esempi.json', import.meta.url), 'utf8'))
const base = process.env.SLIDEV_URL || 'http://localhost:3045'
const out = process.env.A11Y_REPORT || 'reports/lesson-05/interactive'
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
const errors = [], reports = []
page.on('pageerror', e => { if (e.message !== 'Wake Lock permission request denied') errors.push(e.message) })
try {
  for (const slide of slides) {
    const root = await openSlide(page, base, slide.index + 1, { settle: true })
    const demo = root.locator('.a11y-demo'), good = demo.locator('[data-variant="good"]'), bad = demo.locator('[data-variant="bad"]')
    const source = exampleSources.find(example => example.key === slide.frontmatter.interactiveExample)
    assert.ok(source, slide.title + ': source example exists')
    assert.equal(await demo.count(), 1, slide.title)
    assert.equal(await demo.locator('.a11y-scenario').count(), 2)
    assert.equal(await demo.locator('details.collapse.a11y-demo-verification').count(), 1)
    assert.ok((await demo.locator('.a11y-demo-observe').textContent()).trim(), slide.title + ': observable result is explained')
    assert.equal(await demo.locator('.a11y-demo-verification').getByText(source.verify, { exact: true }).count(), 1, slide.title + ': source verification is preserved')
    for (const scenario of [bad, good]) {
      assert.ok(await scenario.getByRole('heading', { level: 2 }).isVisible(), slide.title + ': scenario heading is visible')
      assert.ok((await scenario.locator('.a11y-scenario-summary').textContent()).trim(), slide.title + ': scenario barrier or design choice is explained')
    }
    switch (slide.frontmatter.interactiveExample) {
      case 'contrasto-testo':
        await good.getByRole('button', { name: '10:00', exact: true }).click(); await bad.getByRole('button', { name: '10:00', exact: true }).click()
        assert.match(await good.locator('[role="status"]').textContent(), /Orario non disponibile/)
        assert.equal(await bad.getByText('Orario non disponibile', { exact: false }).count(), 0)
        assert.notEqual(await good.locator('.a11y-appointment h3').evaluate(e => getComputedStyle(e).color), await bad.locator('.a11y-appointment h3').evaluate(e => getComputedStyle(e).color))
        break
      case 'contrasto-controlli':
        await good.getByRole('checkbox').check(); await bad.getByRole('checkbox').check()
        assert.match(await good.locator('[role="status"]').textContent(), /selezionata/)
        assert.notEqual(await good.getByRole('checkbox').evaluate(e => getComputedStyle(e).borderColor), await bad.getByRole('checkbox').evaluate(e => getComputedStyle(e).borderColor))
        break
      case 'adattamento': {
        for (const scenario of [good, bad]) {
          await scenario.getByRole('slider').evaluate(e => { e.value = '200'; e.dispatchEvent(new Event('input', { bubbles: true })) })
          await scenario.getByRole('button', { name: 'Ingrandisci al 200%', exact: true }).click()
          assert.equal(await scenario.getByRole('button', { name: 'Ripristina al 100%', exact: true }).getAttribute('aria-pressed'), 'true')
        }
        const fits = s => s.locator('.a11y-viewport').evaluate(e => { const box = e.getBoundingClientRect(), b = e.querySelector('button').getBoundingClientRect(); return b.right <= box.right + 1 && b.left >= box.left })
        assert.ok(await fits(good)); assert.ok(!await fits(bad))
        await good.getByRole('button', { name: 'Conferma', exact: true }).click(); assert.match(await good.locator('[role="status"]').textContent(), /confermata/)
        break
      }
      case 'tastiera':
        await good.getByLabel('Email', { exact: true }).focus(); await page.keyboard.press('Tab'); assert.ok(await good.getByLabel('Corso', { exact: true }).evaluate(e => e === document.activeElement))
        await page.keyboard.press('d'); assert.equal(await good.getByLabel('Corso', { exact: true }).inputValue(), 'Design'); await page.keyboard.press('Tab'); await page.keyboard.press('Enter'); assert.match(await good.locator('[role="status"]').textContent(), /Iscrizione/)
        await bad.getByLabel('Email', { exact: true }).focus(); await page.keyboard.press('Tab'); assert.ok(await bad.getByRole('button', { name: 'Invia' }).evaluate(e => e === document.activeElement))
        await page.keyboard.press('Enter'); assert.match(await bad.locator('.a11y-form > p').textContent(), /Seleziona un corso/)
        break
      case 'puntamento':
        await good.getByRole('button', { name: 'Sposta Milano su', exact: true }).click(); assert.equal(await good.locator('.a11y-city-list li > span').first().textContent(), 'Milano')
        assert.equal(await bad.getByRole('button', { name: /Sposta/ }).count(), 0); assert.equal(await bad.locator('[draggable="true"]').count(), 3)
        await bad.locator('li').filter({ hasText: 'Milano' }).dragTo(bad.locator('li').filter({ hasText: 'Roma' })); assert.equal(await bad.locator('li > span').first().textContent(), 'Milano')
        break
      case 'immagini':
        assert.equal(await good.getByRole('img').getAttribute('alt'), 'Zaino rosso, due tasche frontali'); assert.equal(await bad.getByRole('img').getAttribute('alt'), 'foto_018.jpg')
        await good.getByRole('checkbox').check(); await bad.getByRole('checkbox').check(); assert.match(await good.locator('.a11y-alt-preview').textContent(), /due tasche/); assert.equal(await bad.locator('.a11y-alt-preview').textContent(), 'foto_018.jpg')
        break
      case 'media': {
        assert.equal(await good.getByRole('checkbox').count(), 2); assert.equal(await bad.getByRole('checkbox').count(), 0)
        await good.getByRole('button', { name: 'Riproduci', exact: true }).focus(); await page.keyboard.press('Enter')
        assert.match(await good.locator('.a11y-captions').textContent(), /Il percorso è questo\./)
        assert.match(await good.locator('.a11y-description').textContent(), /a destra/)
        await good.getByLabel('Descrizione visiva', { exact: true }).uncheck(); assert.equal(await good.locator('.a11y-description').count(), 0)
        assert.match(await good.locator('.a11y-captions').textContent(), /Il percorso è questo\./)
        await good.getByLabel('Descrizione visiva', { exact: true }).check()
        await page.waitForFunction(e => e.textContent.includes('destinazione'), await good.locator('.a11y-captions').elementHandle(), { timeout: 5000 })
        await good.getByRole('button', { name: 'Pausa', exact: true }).click()
        const pausedCue = await good.locator('.a11y-media-stage').textContent(), pausedCaptions = await good.locator('.a11y-captions').textContent()
        assert.ok(await good.getByRole('button', { name: 'Riprendi', exact: true }).isVisible())
        await page.waitForTimeout(350)
        assert.equal(await good.locator('.a11y-media-stage').textContent(), pausedCue); assert.equal(await good.locator('.a11y-captions').textContent(), pausedCaptions)
        await good.getByRole('button', { name: 'Riprendi', exact: true }).click(); assert.equal(await good.locator('.a11y-captions').textContent(), pausedCaptions)
        await good.getByRole('button', { name: 'Ricomincia', exact: true }).click(); assert.match(await good.locator('.a11y-captions').textContent(), /Il percorso è questo\./)
        await good.getByLabel('Sottotitoli', { exact: true }).uncheck(); assert.equal(await good.locator('.a11y-captions').count(), 0)
        assert.match(await good.locator('.a11y-description').textContent(), /a destra/)
        await good.getByLabel('Sottotitoli', { exact: true }).check()
        await bad.getByRole('button', { name: 'Riproduci', exact: true }).click()
        assert.ok(await good.getByRole('button', { name: 'Riproduci', exact: true }).isVisible(), 'playing the other scenario stops and resets the first')
        assert.match(await good.locator('.a11y-captions').textContent(), /Il percorso è questo\./)
        break
      }
      case 'semantica':
        await good.getByRole('button', { name: 'Dettagli consegna' }).focus(); await page.keyboard.press('Enter'); assert.equal(await good.getByRole('button', { name: 'Dettagli consegna' }).getAttribute('aria-expanded'), 'true')
        await page.keyboard.press('Enter'); assert.equal(await good.locator('.a11y-delivery').count(), 0)
        assert.equal(await bad.getByRole('button', { name: 'Dettagli consegna' }).count(), 0); await bad.locator('.a11y-fake-link').click(); assert.equal(await bad.locator('.a11y-delivery').count(), 1)
        break
      case 'feedback':
        await good.getByRole('button', { name: 'Salva', exact: true }).focus(); await page.keyboard.press('Enter'); assert.equal(await good.locator('[role="status"]').getAttribute('aria-live'), 'polite')
        assert.ok(await good.getByRole('button', { name: 'Salva', exact: true }).evaluate(e => e === document.activeElement)); await bad.getByRole('button', { name: 'Salva', exact: true }).click(); assert.equal(await bad.locator('[role="status"]').count(), 0)
        break
      case 'cognitiva':
        assert.equal(await good.locator('ol.steps > li').count(), 3); assert.equal(await bad.locator('ol.steps').count(), 0)
        await good.getByLabel('Ora', { exact: true }).selectOption('11:30'); await good.getByRole('button', { name: 'Continua' }).click(); assert.match(await good.locator('.a11y-ui').textContent(), /14 ottobre 2026 · 11:30/)
        assert.ok(await good.getByRole('heading', { name: 'Controlla la prenotazione' }).evaluate(e => e === document.activeElement), 'the next step receives keyboard focus')
        await good.getByRole('button', { name: 'Modifica' }).click(); assert.equal(await good.getByLabel('Data', { exact: true }).inputValue(), '2026-10-14')
        assert.ok(await good.getByLabel('Data', { exact: true }).evaluate(e => e === document.activeElement), 'returning to edit restores focus to the date')
        await bad.getByRole('button', { name: 'Continua' }).click(); assert.ok(!(await bad.locator('.a11y-ui').textContent()).includes('2026-10-14')); await bad.getByRole('button', { name: 'Torna indietro' }).click(); assert.equal(await bad.getByLabel('Data', { exact: true }).inputValue(), '')
        break
      case 'movimento': {
        await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(100)
        await good.getByRole('button', { name: 'Avvia aggiornamenti' }).click(); await bad.getByRole('button', { name: 'Avvia aggiornamenti' }).click(); await page.waitForTimeout(1400)
        const count = s => s.locator('.a11y-news .a11y-small').textContent()
        await good.getByRole('button', { name: 'Pausa aggiornamenti' }).click(); const frozen = await count(good), beforeBad = await count(bad); await page.waitForTimeout(1400)
        assert.equal(await count(good), frozen); assert.notEqual(await count(bad), beforeBad)
        await good.getByRole('button', { name: 'Riprendi' }).click(); await page.waitForTimeout(1400); assert.notEqual(await count(good), frozen)
        await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(50); assert.equal(await good.getByRole('button', { name: 'Avvia aggiornamenti' }).count(), 1)
        break
      }
      case 'moduli':
        await good.getByRole('button', { name: 'Conferma', exact: true }).click(); assert.match(await good.getByRole('alert').textContent(), /quattro cifre/); assert.equal(await good.getByLabel('Nota', { exact: true }).inputValue(), 'Portare il documento.')
        assert.ok(await good.getByLabel('Data dell’appuntamento', { exact: true }).evaluate(e => e === document.activeElement))
        await bad.getByRole('button', { name: 'Conferma', exact: true }).click(); assert.equal(await bad.getByLabel('Nota', { exact: true }).inputValue(), '')
        await good.getByLabel('Data dell’appuntamento', { exact: true }).fill('14/10/2026'); await good.getByRole('button', { name: 'Conferma', exact: true }).click(); assert.match(await good.locator('[role="status"]').textContent(), /confermato/)
        await bad.locator('input').first().fill('14/10/2026'); await bad.getByRole('button', { name: 'Conferma', exact: true }).click()
        assert.doesNotMatch(await bad.locator('.a11y-form').textContent(), /nota è conservata/, 'the flawed version does not claim to preserve data it cleared')
        assert.equal(await bad.getByLabel('Nota', { exact: true }).inputValue(), '')
        break
      case 'autenticazione': {
        const allowsPaste = s => s.getByLabel('Password', { exact: true }).evaluate(e => e.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true })))
        assert.equal(await good.getByLabel('Password', { exact: true }).getAttribute('autocomplete'), 'current-password')
        assert.equal(await bad.getByLabel('Password', { exact: true }).getAttribute('autocomplete'), 'off')
        assert.ok(await allowsPaste(good)); assert.ok(!await allowsPaste(bad))
        await good.getByRole('button', { name: 'Incolla l’esempio' }).click(); await good.getByRole('button', { name: 'Accedi' }).click(); assert.match(await good.locator('[role="status"]').textContent(), /riuscito/)
        await bad.getByRole('button', { name: 'Incolla l’esempio' }).click(); assert.equal(await bad.getByLabel('Password', { exact: true }).inputValue(), '')
        break
      }
      case 'personalizzazione':
        await good.getByRole('button', { name: 'Ingrandisci il testo', exact: true }).click(); assert.equal(await good.locator('.a11y-reader p').evaluate(e => getComputedStyle(e).fontSize), '22px')
        await good.getByRole('checkbox').check(); assert.equal(await good.locator('.high-contrast').count(), 1); await good.getByRole('button', { name: 'Ripristina' }).click(); assert.equal(await good.locator('.a11y-reader p').evaluate(e => getComputedStyle(e).fontSize), '20px')
        assert.equal(await bad.getByRole('button', { name: 'Ingrandisci il testo', exact: true }).count(), 0)
        break
      case 'lingua':
        await good.getByLabel('Lingua del messaggio', { exact: true }).selectOption('en'); await good.getByRole('button', { name: 'Invia' }).click(); assert.equal(await good.locator('[role="status"]').getAttribute('lang'), 'en'); assert.match(await good.locator('[role="status"]').textContent(), /Ana María O’Neill/)
        await bad.getByRole('button', { name: 'Invia' }).click(); assert.match(await bad.locator('.a11y-form > p').textContent(), /solo lettere/)
        break
      case 'verifica-wcag':
        for (let i = 0; i < 3; i++) await good.getByRole('button', { name: 'Includi questo passaggio', exact: true }).click()
        assert.equal(await good.locator('.a11y-audit-steps li').filter({ hasText: 'Incluso' }).count(), 3)
        assert.equal(await good.getByText('Da includere', { exact: false }).count(), 0); await bad.getByRole('button', { name: 'Chiudi dopo l’accesso', exact: true }).click(); assert.equal(await bad.getByText('Da includere', { exact: false }).count(), 2)
        assert.doesNotMatch(await good.locator('[role="status"]').textContent(), /(?:conforme|conformità|certificat)/i, 'including all steps does not declare WCAG conformity')
        break
      case 'valutazione': {
        assert.equal(await bad.locator('.a11y-mouse-select').count(), 1); assert.equal(await good.getByRole('combobox', { name: 'Corso', exact: true }).count(), 0)
        await good.getByRole('button', { name: 'Annota l’ostacolo', exact: true }).click()
        assert.ok(await good.getByLabel('Ostacolo osservato', { exact: true }).evaluate(e => e === document.activeElement))
        const correction = await good.getByLabel('Modifica proposta', { exact: true }).inputValue()
        await good.getByRole('button', { name: 'Registra', exact: true }).click()
        assert.ok((await good.locator('.a11y-ui').textContent()).includes(correction), 'the proposed modification remains visible in the recorded observation')
        assert.ok(await good.locator('.a11y-observation-review > p[tabindex="-1"]').evaluate(e => e === document.activeElement))
        await good.getByRole('button', { name: 'Prova il menu corretto', exact: true }).click()
        assert.equal(await good.locator('.a11y-mouse-select').count(), 0)
        assert.ok(await good.getByLabel('Corso', { exact: true }).evaluate(e => e === document.activeElement))
        await good.getByLabel('Corso', { exact: true }).focus(); await page.keyboard.press('d'); assert.equal(await good.getByLabel('Corso', { exact: true }).inputValue(), 'Design')
        await good.getByRole('button', { name: 'Registra la nuova prova', exact: true }).click(); assert.match(await good.locator('[role="status"]').textContent(), /riuscita/)
        await bad.getByRole('button', { name: 'Registra', exact: true }).click(); assert.equal(await bad.getByRole('button', { name: 'Prova il menu corretto', exact: true }).count(), 0)
        break
      }
      default: throw new Error('Unverified example: ' + slide.frontmatter.interactiveExample)
    }
    await demo.locator('.a11y-demo-verification > summary').focus(); await page.keyboard.press('Enter')
    assert.ok(await demo.locator('.a11y-demo-verification').getByText(source.verify, { exact: true }).isVisible(), slide.title + ': verification opens from the keyboard')
    await demo.getByRole('button', { name: 'Reimposta gli scenari' }).click()
    assert.equal(await demo.locator('.a11y-demo-verification').getAttribute('open'), null, slide.title + ': reset closes the verification')
    for (const [mode, viewport, media] of [['desktop', { width: 1280, height: 720 }, 'screen'], ['narrow', { width: 390, height: 844 }, 'screen'], ['print', { width: 1280, height: 720 }, 'print']]) {
      await page.setViewportSize(viewport); await page.emulateMedia({ media }); await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
      const geometry = await demo.evaluate(e => {
        const box = e.getBoundingClientRect(), footer = e.closest('.slidev-layout').querySelector('.slide-footer').getBoundingClientRect()
        return { bottom: box.bottom, footerTop: footer.top, hasScroller: [...e.querySelectorAll('.a11y-ui')].some(e => e.scrollHeight > e.clientHeight),
          goodHorizontalOverflow: [...e.querySelectorAll('[data-variant="good"] .a11y-ui')].some(e => e.scrollWidth > e.clientWidth + 1),
          headingsVisible: [...e.querySelectorAll('.a11y-scenario-heading > h2')].every(e => e.getBoundingClientRect().height > 0),
          summariesVisible: [...e.querySelectorAll('.a11y-scenario-summary')].every(e => e.getBoundingClientRect().height > 0),
          toolbarHidden: getComputedStyle(e.querySelector('.a11y-demo-toolbar')).display === 'none',
          idsUnique: new Set([...e.querySelectorAll('[id]')].map(e => e.id)).size === e.querySelectorAll('[id]').length,
          brokenImages: [...e.querySelectorAll('img')].filter(e => !e.complete || !e.naturalWidth).length }
      })
      assert.ok(geometry.bottom <= geometry.footerTop + 1, slide.title + ': safe footer'); assert.ok(geometry.idsUnique); assert.equal(geometry.brokenImages, 0)
      assert.equal(geometry.goodHorizontalOverflow, false, slide.title + ': functioning scenario fits horizontally in ' + mode)
      assert.ok(geometry.headingsVisible && geometry.summariesVisible, slide.title + ': scenario context remains visible in ' + mode)
      if (slide.frontmatter.interactiveExample === 'media') assert.equal(geometry.hasScroller, false, 'both media channels and their controls are visible in ' + mode)
      if (mode === 'print') {
        assert.ok(geometry.toolbarHidden, slide.title + ': print omits the interaction toolbar')
        assert.ok(await demo.locator('.a11y-demo-verification').getByText(source.verify, { exact: true }).isVisible(), slide.title + ': print exposes the full source verification')
      }
      await page.screenshot({ path: `${out}/${mode}-${slide.frontmatter.interactiveExample}.png` })
      reports.push({ id: slide.frontmatter.interactiveExample, page: slide.index + 1, mode, ...geometry })
    }
    await page.emulateMedia({ media: 'screen' }); await page.setViewportSize({ width: 1280, height: 720 })
  }
  assert.deepEqual(errors, [])
  await writeFile(`${out}/report.json`, JSON.stringify({ status: 'passed', examples: slides.length, renders: reports.length, errors, reports }, null, 2))
  console.log(JSON.stringify({ status: 'passed', examples: slides.length, renders: reports.length, errors }))
} finally { await browser.close() }
