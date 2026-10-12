import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'
import { openSlide } from './browser.mjs'

const deck = await loadSlideDeck()
const slides = deck.slides.filter(s => s.frontmatter.interactiveExample)
assert.equal(slides.length, 17)
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
    assert.equal(await demo.count(), 1, slide.title)
    assert.equal(await demo.locator('.a11y-scenario').count(), 2)
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
          await scenario.getByRole('button', { name: 'Testo 100%' }).click()
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
      case 'media':
        assert.equal(await good.getByRole('checkbox').count(), 2); assert.equal(await bad.getByRole('checkbox').count(), 0)
        await good.getByRole('button', { name: 'Riproduci' }).focus(); await page.keyboard.press('Enter'); assert.match(await good.locator('.a11y-captions').textContent(), /a destra/)
        await good.getByRole('button', { name: 'Pausa', exact: true }).click(); await good.getByLabel('Sottotitoli').uncheck(); assert.equal(await good.locator('.a11y-captions').count(), 0)
        break
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
        await good.getByLabel('Ora', { exact: true }).selectOption('11:30'); await good.getByRole('button', { name: 'Continua' }).click(); assert.match(await good.locator('.a11y-ui').textContent(), /2026-10-14 · 11:30/)
        await good.getByRole('button', { name: 'Modifica' }).click(); assert.equal(await good.getByLabel('Data', { exact: true }).inputValue(), '2026-10-14')
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
        break
      case 'autenticazione': {
        const allowsPaste = s => s.getByLabel('Password', { exact: true }).evaluate(e => e.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true })))
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
        for (let i = 0; i < 3; i++) await good.getByRole('button', { name: 'Verifica questo passaggio' }).click()
        assert.equal(await good.getByText('Da verificare', { exact: false }).count(), 0); await bad.getByRole('button', { name: 'Verifica accesso e chiudi audit' }).click(); assert.equal(await bad.getByText('Da verificare', { exact: false }).count(), 2)
        break
      case 'valutazione':
        await good.getByRole('button', { name: 'Registra', exact: true }).click(); await good.getByRole('button', { name: 'Applica la modifica' }).click(); await good.getByLabel('Corso', { exact: true }).selectOption('Design'); await good.getByRole('button', { name: 'Riprova il compito' }).click(); assert.match(await good.locator('[role="status"]').textContent(), /riuscita/)
        await bad.getByRole('button', { name: 'Registra', exact: true }).click(); assert.equal(await bad.getByRole('button', { name: 'Applica la modifica' }).count(), 0)
        break
      default: throw new Error('Unverified example: ' + slide.frontmatter.interactiveExample)
    }
    await demo.getByRole('button', { name: 'Reimposta gli scenari' }).click()
    for (const [mode, viewport, media] of [['desktop', { width: 1280, height: 720 }, 'screen'], ['narrow', { width: 390, height: 844 }, 'screen'], ['print', { width: 1280, height: 720 }, 'print']]) {
      await page.setViewportSize(viewport); await page.emulateMedia({ media }); await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
      const geometry = await demo.evaluate(e => {
        const box = e.getBoundingClientRect(), footer = e.closest('.slidev-layout').querySelector('.slide-footer').getBoundingClientRect()
        return { bottom: box.bottom, footerTop: footer.top, hasScroller: [...e.querySelectorAll('.a11y-ui')].some(e => e.scrollHeight > e.clientHeight),
          idsUnique: new Set([...e.querySelectorAll('[id]')].map(e => e.id)).size === e.querySelectorAll('[id]').length,
          brokenImages: [...e.querySelectorAll('img')].filter(e => !e.complete || !e.naturalWidth).length }
      })
      assert.ok(geometry.bottom <= geometry.footerTop + 1, slide.title + ': safe footer'); assert.ok(geometry.idsUnique); assert.equal(geometry.brokenImages, 0)
      await page.screenshot({ path: `${out}/${mode}-${slide.frontmatter.interactiveExample}.png` })
      reports.push({ id: slide.frontmatter.interactiveExample, page: slide.index + 1, mode, ...geometry })
    }
    await page.emulateMedia({ media: 'screen' }); await page.setViewportSize({ width: 1280, height: 720 })
  }
  assert.deepEqual(errors, [])
  await writeFile(`${out}/report.json`, JSON.stringify({ status: 'passed', examples: slides.length, renders: reports.length, errors, reports }, null, 2))
  console.log(JSON.stringify({ status: 'passed', examples: slides.length, renders: reports.length, errors }))
} finally { await browser.close() }
