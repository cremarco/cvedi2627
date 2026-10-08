import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import vm from 'node:vm'
import { chromium } from 'playwright-chromium'

const folder = path.resolve('esempi/caffe-luce')
const output = path.resolve(process.env.CAFFE_REPORT || 'reports/caffe-ttc-v3')
const expectedIds = ['text', 'html', 'web2', 'scheu', 'flat', 'material', 'material2', 'material3', 'neumo', 'glass', 'liquid', 'minimal', 'y2k', 'max', 'neo', 'pixel', 'bento', 'adattabile', 'spaziale', 'generativa', 'olografica']
const futureIds = ['adattabile']
const pictureSlots = ['hero', 'locale', 'coffee', 'croissant', 'tea', 'frontage']
const resourceBudget = 100_000
const boxSelectors = ['.cafe-header', '#cafe > section', '.menu-tools', '.cafe-footer', '.cafe-picture', '.future-scene']
const pageFixtures = [
  { id: 'home', file: 'index.html', images: 5, slots: ['hero', 'coffee', 'croissant', 'tea', 'locale'], title: 'Un buon caffè. Un po’ di tempo.' },
  { id: 'menu', file: 'menu.html', images: 3, slots: ['coffee', 'croissant', 'tea'], title: 'Il menu del TTC.' },
  { id: 'locale', file: 'locale.html', images: 3, slots: ['locale', 'frontage', 'coffee'], title: 'Il locale. Il tuo tempo.' },
  { id: 'contatti', file: 'contatti.html', images: 1, slots: ['frontage'], title: 'Passa. Oppure scrivici.' },
]
const content = JSON.parse(await readFile(path.join(folder, 'contenuti.json'), 'utf8'))
const normalized = value => value.replace(/\s+/g, ' ').trim()
const euro = value => normalized(new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value))
const sandbox = { window: {} }
vm.runInNewContext(await readFile(path.join(folder, 'immagini.js'), 'utf8'), sandbox)
vm.runInNewContext(await readFile(path.join(folder, 'stili.js'), 'utf8'), sandbox)
const styles = JSON.parse(JSON.stringify(sandbox.window.CAFFE_STYLES))
assert.deepEqual(styles.map(style => style.id), expectedIds, 'All twenty-one requested directions must be available')
assert.deepEqual(styles.reduce((groups, style) => ({ ...groups, [style.group]: (groups[style.group] || 0) + 1 }), {}), { atlante: 17, booklet: 3, sperimentale: 1 })
assert.deepEqual(styles.filter(style => style.layout === 'legacy').map(style => style.id), ['html', 'web2', 'scheu', 'y2k'], 'Only the four intentional historical reconstructions keep a fixed-width layout')
for (const style of styles) {
  const css = await readFile(path.join(folder, 'styles', `${style.id}.css`), 'utf8')
  await readFile(path.join(folder, 'styles', `${style.id}.source.css`), 'utf8')
  assert.ok(css.length && !/@import\b/.test(css), `${style.id}: its compiled stylesheet must be complete and work offline`)
  assert.match(style.years, /^\d{4}–\d{4}$/, `${style.id}: the selector needs a year range`)
  if (!style.image) { assert.equal(style.id, 'text'); continue }
  assert.deepEqual(Object.keys(style.image.regions).sort(), [...pictureSlots].sort(), `${style.id}: all six TTC scene slots are required`)
  assert.ok(style.sources.length, `${style.id}: provenance must be available`)
  const bitmap = await readFile(path.join(folder, style.image.src))
  assert.equal(bitmap.length, style.image.bytes, `${style.id}: registry bytes must match the actual runtime bitmap`)
  const redesign = JSON.parse(await readFile(path.join(folder, 'assets/redesign/manifest.json'), 'utf8')).find(record => record.runtime?.src === style.image.src)
  const provenance = redesign || JSON.parse(await readFile(path.join(folder, `assets/ttc-v3/provenance-${style.imageId}.json`), 'utf8'))
  assert.deepEqual(style.image.regions, provenance.runtime?.regions || provenance.regions, `${style.id}: preserve measured source regions`)
  if (provenance.runtime?.sha256) assert.equal(createHash('sha256').update(bitmap).digest('hex'), provenance.runtime.sha256, `${style.id}: runtime must match provenance`)
  if (style.scene) {
    assert.ok(style.scene.alt?.trim(), `${style.id}: the usage scene needs an accessible description`)
    assert.ok(style.scene.width > 0 && style.scene.height > 0, `${style.id}: the usage scene needs its original dimensions`)
    await readFile(path.join(folder, style.scene.src))
  }
  for (const [slot, [x, y, width, height]] of Object.entries(style.image.regions)) {
    assert.ok(x >= 0 && y >= 0 && width > 0 && height > 0 && x + width <= style.image.width && y + height <= style.image.height,
      `${style.id}/${slot}: crop must fit the original image`)
  }
  for (const [slot, picture] of Object.entries(style.pictures || {})) {
    const label = `${style.id}/${slot}`
    assert.ok(pictureSlots.includes(slot), `${label}: a picture override must belong to a semantic scene slot`)
    assert.ok(picture.alt?.trim(), `${label}: a picture override needs an accessible description`)
    assert.ok(Number.isInteger(picture.width) && picture.width > 0 && Number.isInteger(picture.height) && picture.height > 0,
      `${label}: a picture override needs its original pixel dimensions`)
    assert.match(picture.sha256, /^[a-f0-9]{64}$/, `${label}: a picture override needs its runtime hash`)
    const picturePath = path.resolve(folder, picture.src)
    const pictureBitmap = await readFile(picturePath)
    assert.equal(pictureBitmap.length, picture.bytes, `${label}: picture override bytes must match the runtime bitmap`)
    assert.equal(createHash('sha256').update(pictureBitmap).digest('hex'), picture.sha256, `${label}: picture override pixels must match the registered hash`)
    const manifest = JSON.parse(await readFile(path.join(path.dirname(picturePath), 'manifest.json'), 'utf8'))
    const records = Array.isArray(manifest) ? manifest : manifest.assets
    assert.ok(Array.isArray(records), `${label}: picture overrides need an asset provenance manifest`)
    const record = records.find(record => record.runtime?.src === picture.src || record.variants?.some(variant => path.resolve(variant.path) === picturePath))
    assert.ok(record?.provenance?.trim(), `${label}: the individual product needs documented provenance`)
    const runtime = record.runtime?.src === picture.src ? record.runtime : record.variants.find(variant => path.resolve(variant.path) === picturePath)
    assert.deepEqual([picture.width, picture.height, picture.bytes, picture.sha256], [runtime.width, runtime.height, runtime.bytes, runtime.sha256],
      `${label}: picture override metadata must match the original asset manifest`)
    const [x, y, width, height] = picture.region || [0, 0, picture.width, picture.height]
    assert.ok(x >= 0 && y >= 0 && width > 0 && height > 0 && x + width <= picture.width && y + height <= picture.height,
      `${label}: the individual product crop must fit its image`)
  }
}
for (const fixture of pageFixtures) {
  const html = await readFile(path.join(folder, fixture.file), 'utf8')
  assert.ok(html.includes('id="cafe-stylesheet" rel="stylesheet" href="styles/flat.css" data-style="flat"'), `${fixture.id}: Flat must remain styled without JavaScript`)
  const images = html.match(/<img\b[^>]*>/gi) || []
  assert.equal(images.length, fixture.images, `${fixture.id}: preserve the TTC image slots`)
  assert.ok(images.every(image => !/\s(?:src|srcset)\s*=/i.test(image)), `${fixture.id}: image sources must be chosen by JavaScript before any bitmap request`)
  assert.ok(html.includes('class="brand-symbol brand-image" aria-hidden="true"') && html.includes('Caffè TTC'), `${fixture.id}: the TTC identity needs a decorative generated mark and its accessible name`)
  assert.ok(!/Caffè Luce|CAFFÈ LUCE/.test(html), `${fixture.id}: no previous café identity may remain`)
}
await mkdir(output, { recursive: true })
const copied = await mkdtemp(path.join(tmpdir(), 'caffe-luce-offline-'))
await cp(folder, path.join(copied, 'site'), { recursive: true })
const offlineURL = pathToFileURL(path.join(copied, 'site', 'index.html')).href
const report = { status: 'running', styles: expectedIds, cases: [], errors: [], externalRequests: [], consoleErrors: [], screenshots: [], printPages: [], languages: [] }
const browser = await chromium.launch({ headless: true })
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    const target = path.resolve(folder, `.${pathname === '/' ? '/index.html' : pathname}`)
    if (!target.startsWith(`${folder}${path.sep}`)) { response.writeHead(403).end(); return }
    const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' }[path.extname(target)] || 'text/plain'
    response.writeHead(200, { 'Content-Type': type })
    response.end(await readFile(target))
  } catch { response.writeHead(404).end() }
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const serverURL = `http://127.0.0.1:${server.address().port}/`

async function settle(page, styleId) {
  const style = styles.find(style => style.id === styleId)
  await page.waitForFunction(({ id, src, scene, pictures, counts }) => {
    const root = document.querySelector('#cafe')
    if (!root || root.dataset.ready !== 'true' || root.dataset.style !== id) return false
    const css = document.querySelector('#cafe-stylesheet')
    if (!css?.sheet || css.dataset.style !== id || !css.href.endsWith(`/styles/${id}.css`)) return false
    const frames = [...root.querySelectorAll('.cafe-picture[data-picture]')]
    if (frames.length !== counts[root.dataset.page]) return false
    if (id === 'text') return frames.every(frame => !frame.querySelector('img').hasAttribute('src'))
    if (id === 'spaziale') {
      const stage = root.querySelector('.ar-stage')
      return stage?.dataset.ready === 'true' && [...stage.querySelectorAll('img')].every(img => img.complete && img.naturalWidth > 0)
    }
    if (id === 'generativa') return root.querySelector('.conversation-stage')?.dataset.complete === 'true' && [...root.querySelectorAll('.conversation-stage img')].every(img => img.complete && img.naturalWidth > 0)
    const deferred = id === 'risorse' && root.dataset.images === 'deferred'
    const framesReady = frames.every(frame => {
      const img = frame.querySelector('img')
      if (!img) return false
      if (deferred) return !img.hasAttribute('src') && !img.hasAttribute('srcset')
      const expected = pictures?.[frame.dataset.picture]?.src || (scene && frame.classList.contains('hero-picture') ? scene.src : src)
      return img.complete && img.naturalWidth > 0 && decodeURIComponent(img.currentSrc).endsWith(expected)
    })
    const usage = [...root.querySelectorAll('.future-scene img')]
    const usageCount = scene && ['menu', 'contatti'].includes(root.dataset.page) ? 1 : 0
    return framesReady && usage.length === usageCount && usage.every(img => img.complete && img.naturalWidth > 0 && decodeURIComponent(img.currentSrc).endsWith(scene.src))
  }, { id: styleId, src: style.image?.src, scene: style.scene, pictures: style.pictures, counts: Object.fromEntries(pageFixtures.map(fixture => [fixture.id, fixture.images])) })
  await page.evaluate(async () => {
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    await document.fonts.ready
    await Promise.all([...document.querySelectorAll('#cafe img[src]')].map(img => img.decode()))
    await Promise.all(document.getAnimations().filter(a => Number.isFinite(a.effect?.getComputedTiming().endTime)).map(a => a.finished.catch(() => {})))
  })
}

async function snapshot(page) {
  return page.evaluate(selectors => {
    const root = document.querySelector('#cafe')
    const boxes = selectors.flatMap(selector => [...root.querySelectorAll(selector)].filter(node => node.getClientRects().length).map(node => {
      const r = node.getBoundingClientRect()
      return { selector, x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }
    }))
    function textBoxes(node) {
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
      const rectangles = []
      while (walker.nextNode()) {
        if (!walker.currentNode.textContent.trim()) continue
        const range = document.createRange()
        range.selectNodeContents(walker.currentNode)
        rectangles.push(...[...range.getClientRects()].filter(rect => rect.width > 0 && rect.height > 0))
      }
      return rectangles
    }
    const overflow = [...document.querySelectorAll('#cafe h1, #cafe h2, #cafe h3, #cafe p, #cafe a, #cafe dt, #cafe dd, #cafe label, #cafe button, #cafe summary')].flatMap(node => {
      if (node.closest('[aria-hidden="true"]') || node.closest('details:not([open])') && !node.closest('summary')) return []
      const style = getComputedStyle(node)
      const ink = textBoxes(node)
      if (!node.getClientRects().length || !ink.length || style.display === 'contents') return []
      const box = node.getBoundingClientRect()
      const spatialScroller = root.dataset.style === 'spaziale' && node.closest('.ar-panel-body')
      const scrollsVertically = spatialScroller && ['auto', 'scroll'].includes(getComputedStyle(spatialScroller).overflowY) && spatialScroller.scrollHeight > spatialScroller.clientHeight
      let reason = box.height <= 1 ? 'zero-text-layout-height' : ''
      let clippingAncestor
      for (let ancestor = node; !reason && ancestor; ancestor = ancestor.parentElement) {
        const css = getComputedStyle(ancestor), rect = ancestor.getBoundingClientRect()
        const clipsX = ['hidden', 'clip'].includes(css.overflowX), clipsY = ['hidden', 'clip'].includes(css.overflowY)
        if (!clipsX && !clipsY) continue
        const left = rect.left + ancestor.clientLeft, top = rect.top + ancestor.clientTop
        // The AR menu deliberately scrolls within a bounded panel. Preserve
        // horizontal and inner text clipping checks without flagging rows
        // that are reachable below that vertical scrolling viewport.
        const scrollClipsY = scrollsVertically && ancestor.contains(spatialScroller)
        if (ink.some(glyph => (clipsX && (glyph.left < left - 2 || glyph.right > left + ancestor.clientWidth + 2)) || (clipsY && !scrollClipsY && (glyph.top < top - 2 || glyph.bottom > top + ancestor.clientHeight + 2)))) {
          reason = 'text-cut-by-overflow'
          clippingAncestor = ancestor.id || ancestor.className || ancestor.tagName
        }
      }
      // A short line box with visible font overshoot is not clipping. Text in
      // fixed cards is checked against the card below, including its ink extent.
      return reason ? [{ text: node.textContent.trim(), reason, clippingAncestor, width: node.clientWidth, scrollWidth: node.scrollWidth, height: node.clientHeight, scrollHeight: node.scrollHeight }] : []
    })
    const roots = getComputedStyle(root)
    const heading = getComputedStyle(root.querySelector('#cafe-title'))
    const text = [...root.querySelectorAll('h1, h2, h3, p, a, dt, dd, label, button')]
      .filter(node => !node.closest('.style-control, .future-experience, .usage-scene, .projection-dialog') && node.getClientRects().length)
      .map(node => node.id === 'cafe-title' && node.querySelector('span')
        ? [...node.querySelectorAll('span')].map(span => span.textContent).join(' ')
        : node.textContent).join(' ').replace(/\s+/g, ' ').trim()
    const control = getComputedStyle(document.querySelector('#style-select'))
    const body = getComputedStyle(document.body)
    const pageBox = root.getBoundingClientRect()
    const layoutIssues = []
    for (const category of root.querySelectorAll('.menu-category, .home-highlights .menu-item, .cafe-values > div')) {
      if (!category.getClientRects().length) continue
      const outer = category.getBoundingClientRect()
      for (const child of category.querySelectorAll(':scope > h2, :scope > h3, :scope > p, :scope > .menu-list')) {
        const rectangles = [child.getBoundingClientRect(), ...textBoxes(child)]
        const inner = { top: Math.min(...rectangles.map(rect => rect.top)), bottom: Math.max(...rectangles.map(rect => rect.bottom)), left: Math.min(...rectangles.map(rect => rect.left)), right: Math.max(...rectangles.map(rect => rect.right)) }
        inner.width = inner.right - inner.left
        inner.height = inner.bottom - inner.top
        if (!child.closest('[aria-hidden="true"]') && inner.width && inner.height && (inner.top < outer.top - 2 || inner.bottom > outer.bottom + 2 || inner.left < outer.left - 2 || inner.right > outer.right + 2)) {
          layoutIssues.push({ kind: 'container-content-outside', category: category.dataset.product || category.className || child.textContent.trim(), child: child.className || child.tagName, outer: { top: outer.top, bottom: outer.bottom, left: outer.left, right: outer.right }, inner })
        }
      }
    }
    const flow = [...root.children].filter(node => !node.hasAttribute('aria-hidden') && node.matches('header, section, footer, .menu-tools') && node.getClientRects().length)
    for (let i = 0; i < flow.length; i++) for (let j = i + 1; j < flow.length; j++) {
      const a = flow[i].getBoundingClientRect(), b = flow[j].getBoundingClientRect()
      const width = Math.min(a.right, b.right) - Math.max(a.left, b.left)
      const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      // Liquid Glass intentionally floats its controls over photography.
      // Test text/action intersections instead of treating a photograph as text.
      if (root.dataset.style === 'liquid' && flow[i].matches('.cafe-header') && flow[j].matches('.cafe-hero, .page-intro')) {
        const obscured = [...flow[j].querySelectorAll('h1, .hero-lead, .cafe-cta')].filter(node => {
          const rects = textBoxes(node)
          return rects.some(rect => Math.min(a.right, rect.right) - Math.max(a.left, rect.left) > 2 && Math.min(a.bottom, rect.bottom) - Math.max(a.top, rect.top) > 2)
        })
        if (obscured.length) layoutIssues.push({ kind: 'floating-controls-cover-text', text: obscured.map(node => node.textContent.trim()) })
        continue
      }
      if (width > 2 && height > 2) layoutIssues.push({ kind: 'section-overlap', first: flow[i].className, second: flow[j].className, width, height })
    }
    return { text, boxes, overflow, layoutIssues,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      signature: [roots.backgroundColor, roots.color, heading.fontFamily, heading.fontWeight, heading.fontSize].join('|'),
      controlSignature: [control.backgroundColor, control.backgroundImage, control.color, control.fontFamily, control.fontWeight, control.fontSize, control.borderRadius, control.borderColor, control.borderStyle, control.borderWidth, control.boxShadow, control.padding].join('|'),
      integratedSelect: Boolean(root.querySelector('.cafe-header #style-select')),
      fullBleed: Math.abs(pageBox.x + scrollX) < 1 && Math.abs(pageBox.y + scrollY) < 1 && Math.abs(pageBox.width - Math.max(innerWidth, root.dataset.layout === 'legacy' ? 1024 : 0)) < 1 && parseFloat(body.paddingLeft) === 0 && parseFloat(body.paddingRight) === 0,
      layout: root.dataset.layout,
      images: root.dataset.images,
      imageLabels: [...root.querySelectorAll('img')].filter(node => !node.closest('[aria-hidden="true"]')).map(node => node.alt),
      sources: [...root.querySelectorAll('img')].map(node => node.currentSrc),
      futureVisible: Boolean(root.querySelector('.future-experience')?.getClientRects().length) }
  }, boxSelectors)
}

async function checkImageFrames(page, style, fixture) {
  const frames = await page.locator('.cafe-picture[data-picture]').evaluateAll(nodes => nodes.map(node => {
    const image = node.querySelector('img')
    const imageStyle = getComputedStyle(image)
    const rect = image.getBoundingClientRect()
    return { slot: node.dataset.picture, hero: node.classList.contains('hero-picture'), crop: image.dataset.crop, src: image.getAttribute('src'), alt: image.alt, objectFit: imageStyle.objectFit, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, displayedWidth: parseFloat(imageStyle.width), displayedHeight: parseFloat(imageStyle.height), renderedWidth: rect.width, renderedHeight: rect.height }
  }))
  assert.equal(frames.length, fixture.images, 'The TTC scene slots must remain available')
  assert.deepEqual(frames.map(frame => frame.slot), fixture.slots, 'The semantic scene order must remain available')
  for (const frame of frames) {
    if (['text', 'scene', 'conversation'].includes(style.presentation)) { assert.equal(frame.src, null, 'Hidden site bitmaps must not be requested'); continue }
    const picture = style.pictures?.[frame.slot]
    const scene = frame.hero && style.scene
    const source = picture || scene || style.image
    const region = picture ? picture.region || [0, 0, picture.width, picture.height] : scene ? [0, 0, scene.width, scene.height] : style.image.regions[frame.slot]
    assert.equal(frame.crop, region.join(','), `${style.id}/${frame.slot}: use the crop of the selected asset`)
    if (picture || scene) assert.equal(frame.alt, source.alt, `${style.id}/${frame.slot}: describe the selected image`)
    if (style.id === 'risorse' && await page.locator('#cafe').getAttribute('data-images') === 'deferred') {
      assert.equal(frame.src, null, 'Deferred pictures must omit src rather than download a hidden bitmap')
    } else {
      assert.equal(frame.src, source.src, `${style.id}/${frame.slot}: the frame must use its own expected source`)
      assert.equal(frame.naturalWidth, source.width, `${style.id}/${frame.slot}: source width differs from the registry`)
      assert.equal(frame.naturalHeight, source.height, `${style.id}/${frame.slot}: source height differs from the registry`)
      assert.ok(frame.displayedWidth > 0 && frame.displayedHeight > 0, `${style.id}/${frame.slot}: the bitmap needs nonempty displayed geometry`)
      assert.ok(frame.renderedWidth > 0 && frame.renderedHeight > 0, `${style.id}/${frame.slot}: a decoded bitmap must actually occupy visible layout space`)
      const uniformElementScale = Math.abs(frame.displayedWidth / frame.displayedHeight - source.width / source.height) < 0.015
      // A standalone product can keep its natural ratio inside a differently
      // shaped image element. Atlas sprites still need uniform element scaling.
      assert.ok(uniformElementScale || Boolean(picture && frame.objectFit === 'contain'), `${style.id}/${frame.slot}: source pixels must scale uniformly, through their element ratio or a standalone image with object-fit contain`)
    }
  }
}

async function checkCaféContent(page, fixture, media) {
  if (['spaziale','generativa'].includes(await page.locator('#cafe').getAttribute('data-style'))) return checkScenarioContent(page, fixture)
  assert.equal(await page.locator('.cafe-header .brand-symbol').count(), 1, 'The header needs the TTC symbol')
  assert.equal(await page.locator('.cafe-header .cafe-brand').getAttribute('aria-label'), 'Caffè TTC, Home', 'The decorative generated logo must have an accessible brand link')
  const logo = await page.locator('.cafe-header .brand-symbol').evaluate(node => {
    const css = getComputedStyle(node);
    const maskEquals = name => {
      const uri = css.getPropertyValue(name).match(/data:image\/webp;base64,[A-Za-z0-9+/=]+/)?.[0];
      return Boolean(uri && css.maskImage.includes(uri));
    };
    return { hidden: css.display === 'none', source: css.backgroundImage, essentialMask: maskEquals('--brand-essential-mask'), pixelMask: maskEquals('--brand-pixel-mask'), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height, decorative: node.getAttribute('aria-hidden') };
  })
  const logoStyle = await page.locator('#cafe').getAttribute('data-style')
  assert.equal(normalized(await page.locator('.cafe-header .brand-name').innerText()), content.brand, 'The complete café name must remain live, visible text')
  assert.equal(logo.decorative, 'true', 'The generated café symbol is decorative beside the accessible full name')
  if (['text', 'html'].includes(logoStyle)) {
    assert.equal(logo.hidden, true, `${logoStyle}: historical identity must remain live text`)
  } else {
    const family = media === 'print' ? 'essential' : ({ scheu: 'classic', web2: 'chrome', y2k: 'chrome', glass: 'glass', liquid: 'glass', neumo: 'glass', max: 'pop', neo: 'pop', pixel: 'pixel' }[logoStyle] || 'essential')
    const usesFamily = family === 'essential' ? logo.essentialMask : family === 'pixel' ? logo.pixelMask : logo.source.includes(`/assets/brand/imagegen-v1/${family}.webp`)
    assert.ok(usesFamily, `${logoStyle}: the current family must render using its exact generated asset, including an offline-safe alpha mask where needed`)
    assert.ok(!logo.hidden && Math.abs(logo.width - logo.height) < 1 && logo.height >= 28, `${logoStyle}: the café symbol needs legible square geometry`)
  }
  assert.deepEqual(await page.locator('.cafe-nav a').allTextContents(), ['Menu', 'Il locale', 'Contatti'])
  assert.deepEqual(await page.locator('.hours-list dt').allTextContents(), content.hours.map(row => row.days), 'Opening days must match the café data')
  assert.deepEqual(await page.locator('.hours-list dd').allTextContents(), content.hours.map(row => row.time), 'Opening hours must match the café data')
  if (fixture.id === 'menu') {
    assert.deepEqual(await page.locator('.menu-category h2').allTextContents(), content.menu.map(category => category.name))
    assert.deepEqual(await page.locator('.menu-item-name').allTextContents(), content.menu.flatMap(category => category.items.map(item => item.name)), 'All fifteen menu items must retain their names and order')
    assert.deepEqual((await page.locator('.menu-item-price').allTextContents()).map(normalized), content.menu.flatMap(category => category.items.map(item => euro(item.price))), 'Displayed prices must equal the canonical list')
  }
  if (fixture.id === 'home') assert.deepEqual((await page.locator('.product-price').allTextContents()).map(normalized), content.highlights.map(item => normalized(item.price)))
  if (fixture.id === 'home' && media === 'print' && await page.locator('#cafe').getAttribute('data-style') === 'adattabile') {
    const printFlow = await page.evaluate(() => {
      function ink(selector) {
        const node = document.querySelector(selector), walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT), rects = []
        while (walker.nextNode()) {
          if (!walker.currentNode.textContent.trim()) continue
          const range = document.createRange()
          range.selectNodeContents(walker.currentNode)
          rects.push(...[...range.getClientRects()].filter(rect => rect.width && rect.height))
        }
        return { top: Math.min(...rects.map(rect => rect.top)), bottom: Math.max(...rects.map(rect => rect.bottom)) }
      }
      const cta = document.querySelector('.cafe-hero .cafe-cta').getBoundingClientRect()
      return { width: document.querySelector('#cafe').getBoundingClientRect().width,
        title: ink('.cafe-hero #cafe-title'), lead: ink('.cafe-hero .hero-lead'), cta: { top: cta.top, bottom: cta.bottom }, menuTitle: ink('#menu-title'),
        categoryTop: Math.min(...[...document.querySelectorAll('.home-highlights .menu-item')].map(node => node.getBoundingClientRect().top)) }
    })
    assert.ok(Math.abs(printFlow.width - 704) <= 1, 'Adaptive print typography must be checked at the real A4 content width')
    assert.ok(printFlow.title.bottom <= printFlow.lead.top + 2 && printFlow.lead.bottom <= printFlow.cta.top + 2 && printFlow.cta.bottom <= printFlow.menuTitle.top + 2 && printFlow.menuTitle.bottom <= printFlow.categoryTop + 2,
      `Adaptive A4 text lines, CTA and menu heading must keep their reading order without overlap: ${JSON.stringify(printFlow)}`)
  }
  if (fixture.id === 'contatti') {
    assert.ok(normalized(await page.locator('.contact-address').innerText()).includes(content.address))
    assert.equal(await page.locator('#contact-form input, #contact-form select, #contact-form textarea').evaluateAll(nodes => nodes.every(node => node.labels?.length)), true, 'Contact fields must have associated labels')
    if (media === 'screen' && await page.locator('#cafe').getAttribute('data-style') !== 'text') await checkContactControls(page)
  }
  const fonts = await page.evaluate(() => {
    const node = document.querySelector('#cafe-title'), heading = getComputedStyle(node)
    const lead = getComputedStyle(document.querySelector('.hero-lead'))
    return { ready: document.fonts.status, headingSize: parseFloat(heading.fontSize), bodySize: parseFloat(lead.fontSize), available: document.fonts.check(`${heading.fontStyle} ${heading.fontWeight} ${heading.fontSize} ${heading.fontFamily}`, node.textContent) }
  })
  assert.equal(fonts.ready, 'loaded', 'Requested local fonts must finish loading')
  assert.equal(fonts.available, true, 'The heading font must be available')
  assert.ok(fonts.headingSize >= 18 && fonts.bodySize >= (media === 'print' ? 10 : 14), 'Heading and introductory text need a readable scale')
}

async function checkScenarioContent(page, fixture) {
  const id = await page.locator('#cafe').getAttribute('data-style')
  const identity = page.locator(id === 'spaziale' ? '.ar-title' : '.generated-identity .brand-lockup')
  assert.equal(await identity.getAttribute('aria-label'), content.brand, `${id}: the scenario identity needs the full accessible café name`)
  assert.equal(normalized(await identity.locator('.brand-name').innerText()), content.brand, `${id}: the full brand remains visible beside its café symbol`)
  assert.equal(await identity.locator('.brand-symbol[aria-hidden="true"]').count(), 1, `${id}: the scenario must use the shared decorative café symbol`)
  const oldSections = await page.locator('#cafe > section:not(.scenario-stage), #cafe > footer, .cafe-nav').evaluateAll(nodes => nodes.filter(node => node.getClientRects().length).map(node => node.className))
  assert.deepEqual(oldSections, [], `${id}: the site must be replaced by its requested scenario`)
  if (id === 'spaziale') {
    assert.equal(await page.locator('.ar-stage').getAttribute('data-ready'), 'true', 'The AR scene and product images must be ready')
    const scene = await page.locator('.ar-environment').evaluate(node => ({ alt:node.alt, width:node.naturalWidth, height:node.naturalHeight, complete:node.complete }))
    assert.ok(scene.alt && scene.complete && scene.width > 0 && scene.height > 0)
    assert.equal(await page.locator('.ar-tabs [role="tab"]').count(), 4, 'AR needs navigable menu, locale, hours and contact panels')
    assert.equal(await page.locator('.ar-tab-content[role="tabpanel"]').count(), 4)
    assert.deepEqual(await page.locator('.ar-menu-name').allTextContents(), content.menu.flatMap(category => category.items.map(item => item.name)), 'The spatial menu must preserve every product')
    assert.deepEqual((await page.locator('.ar-menu-price').allTextContents()).map(normalized), content.menu.flatMap(category => category.items.map(item => euro(item.price))), 'The spatial menu must preserve every price')
    assert.deepEqual(await page.locator('.ar-menu-description').allTextContents(), content.menu.flatMap(category => category.items.map(item => item.detail)))
    assert.equal(await page.locator('.ar-product-choice').count(), 3, 'AR needs working choices for the three photographic products')
  } else {
    assert.equal(await page.locator('.conversation-stage').getAttribute('data-complete'), 'true')
    assert.ok(await page.locator('.generated-piece').count() >= 3, 'The conversation must create multiple working page components')
    assert.equal(await page.locator('.conversation-user').count(), 3)
    if (fixture.id === 'menu') {
      assert.deepEqual(await page.locator('.generated-menu-category dt > span:first-child').allTextContents(), content.menu.flatMap(category => category.items.map(item => item.name)))
      assert.deepEqual((await page.locator('.generated-price').allTextContents()).map(normalized), content.menu.flatMap(category => category.items.map(item => euro(item.price))))
      await page.locator('.generated-menu-filters [data-category="tea"]').click()
      assert.deepEqual(await page.locator('.generated-menu-category h3').allTextContents(), ['Tè e freschi'])
      await page.locator('.generated-menu-filters [data-category="all"]').click()
    }
    if (fixture.id !== 'menu') assert.ok((await page.locator('.generated-contact').innerText()).includes(content.address))
  }
}

async function checkContactControls(page) {
  const indicator = await page.locator('#contact-subject').evaluate(node => {
    const style = getComputedStyle(node)
    const native = ['auto', 'menulist', 'menulist-button'].includes(style.appearance)
    // A fill gradient alone cannot identify the dropdown: the chevron needs
    // an image or two transparent triangle layers, with visible icon geometry.
    const sizes = style.backgroundSize.split(',').slice(0, 2).map(size => size.trim().split(/\s+/).map(parseFloat))
    const triangles = (style.backgroundImage.match(/linear-gradient\(/g) || []).length >= 2 && (style.backgroundImage.match(/rgba\(0, 0, 0, 0\)/g) || []).length >= 2
    const iconGeometry = sizes.length === 2 && sizes.every(size => size.length === 2 && size.every(value => Number.isFinite(value) && value > 0 && value <= 24))
    return { style: document.querySelector('#cafe').dataset.style, native, image: /url\(/.test(style.backgroundImage), chevron: triangles && iconGeometry, background: style.backgroundImage }
  })
  assert.ok((['html', 'brutal'].includes(indicator.style) && indicator.native) || indicator.image || indicator.chevron,
    `${indicator.style}: the subject selector needs a visible native dropdown indicator or CSS arrow, not just a fill gradient`)
  if (!['minimal', 'bento'].includes(indicator.style)) return
  const boundaries = await page.locator('#contact-form input, #contact-form select, #contact-form textarea').evaluateAll(nodes => {
    const paint = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
    const color = value => {
      paint.clearRect(0, 0, 1, 1)
      paint.fillStyle = value
      paint.fillRect(0, 0, 1, 1)
      return [...paint.getImageData(0, 0, 1, 1).data]
    }
    const blend = (foreground, background) => foreground.slice(0, 3).map((value, i) => value * foreground[3] / 255 + background[i] * (1 - foreground[3] / 255))
    function background(node) {
      if (!node) return [255, 255, 255]
      return blend(color(getComputedStyle(node).backgroundColor), background(node.parentElement))
    }
    const luminance = rgb => rgb.map(value => value / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0)
    const contrast = (foreground, surface) => {
      const [a, b] = [luminance(blend(foreground, surface)), luminance(surface)].sort((a, b) => b - a)
      return (a + 0.05) / (b + 0.05)
    }
    return nodes.map(node => {
      const style = getComputedStyle(node), border = color(style.borderBottomColor)
      return { id: node.id, width: parseFloat(style.borderBottomWidth), style: style.borderBottomStyle, inside: contrast(border, background(node)), outside: contrast(border, background(node.parentElement)) }
    })
  })
  assert.ok(boundaries.every(boundary => boundary.width > 0 && !['none', 'hidden'].includes(boundary.style) && Math.min(boundary.inside, boundary.outside) >= 3),
    `${indicator.style}: functional field boundaries must reach 3:1 against both the field and surrounding section: ${JSON.stringify(boundaries)}`)
}

async function checkFutureAccessibility(page, mode) {
  const experience = page.locator('.future-experience')
  assert.ok((await experience.locator('.future-heading').innerText()).trim(), 'The future experience needs a meaningful heading')
  assert.equal(await experience.locator('.future-status').getAttribute('aria-live'), 'polite', 'Interaction feedback must be announced')
  const inputs = await experience.locator('input').evaluateAll(nodes => nodes.map(node => Boolean(node.labels?.length || node.getAttribute('aria-label'))))
  assert.ok(inputs.every(Boolean), 'Future fields need associated labels')
  const buttons = await experience.locator('button').evaluateAll(nodes => nodes.map(node => Boolean(node.textContent.trim() || node.getAttribute('aria-label'))))
  assert.ok(buttons.every(Boolean), 'Future controls need accessible names')
  const choices = await experience.locator('.future-choice-group').evaluateAll(nodes => nodes.map(node => ({
    label: node.getAttribute('aria-label'), selected: node.querySelectorAll('[aria-pressed="true"]').length
  })))
  assert.ok(choices.every(group => group.label && group.selected === 1), 'Every choice group must announce one selected option')
  if (mode.media === 'print') {
    assert.equal(await experience.locator('.future-controls').isVisible(), false, 'Print must show the result without interactive controls')
    assert.equal(await experience.locator('.future-result').isVisible(), true, 'Print must retain the meaning of the future experience')
  }
}

function observeContext(context) {
  context.on('page', page => {
    page.on('pageerror', error => report.consoleErrors.push(error.message))
    page.on('console', msg => { if (msg.type() === 'error') report.consoleErrors.push(msg.text()) })
    page.on('request', request => { if (/^https?:/.test(request.url()) && !request.url().startsWith(serverURL)) report.externalRequests.push(request.url()) })
  })
}

async function renderedSurface(page) {
  return page.locator('.future-experience, .future-result, .future-selection-output, .future-scene, .hero-picture, .menu-grid, .menu-item').evaluateAll(nodes => nodes.map(node => {
    const style = getComputedStyle(node)
    return { className: node.className, transform: style.transform, borderRadius: style.borderRadius, clipPath: style.clipPath, columns: style.gridTemplateColumns }
  }))
}

async function typography(page) {
  return page.locator('#cafe-title').evaluate(node => {
    const style = getComputedStyle(node)
    const range = document.createRange()
    range.selectNodeContents(node.querySelector('span') || node)
    const box = range.getBoundingClientRect()
    return { size: parseFloat(style.fontSize), weight: style.fontWeight, weightAxis: style.fontVariationSettings.match(/["']wght["']\s+([\d.]+)/)?.[1], stretch: style.fontStretch, axes: style.fontVariationSettings, width: box.width, height: box.height }
  })
}

async function choose(page, value) {
  await page.locator(`.future-choice[data-value="${value}"]`).click()
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  assert.equal(await page.locator(`.future-choice[data-value="${value}"]`).getAttribute('aria-pressed'), 'true')
}

async function assertFutureLink(page, selector, file, hash = '') {
  const href = new URL(await page.locator(selector).getAttribute('href'), page.url())
  assert.ok(href.pathname.endsWith(`/${file}`), 'The composed link must lead to the matching café page')
  assert.equal(href.searchParams.get('stile'), 'generativa', 'Composed links must preserve the selected style')
  assert.equal(href.hash, hash)
}

async function checkFutureBehaviour(page, styleId, fixture) {
  const root = page.locator('#cafe')
  const result = page.locator('.future-result')
  if (styleId === 'adattabile') {
    const readingType = selector => page.locator(selector).evaluateAll(nodes => nodes.map(node => {
      const style = getComputedStyle(node)
      return { size: parseFloat(style.fontSize), weight: style.fontWeight, axes: style.fontVariationSettings, optical: style.fontOpticalSizing }
    }))
    const baselineType = () => readingType('.reading-base .reading-sample, .reading-base .reading-detail')
    const controlsType = () => readingType('.future-heading, .future-choice')
    await choose(page, 'vicino')
    const close = await typography(page)
    const closeSample = await readingType('.reading-live .reading-sample')
    const baseline = await baselineType()
    const stableControls = await controlsType()
    await choose(page, 'lontano')
    const far = await typography(page)
    assert.ok(far.size > close.size, 'Choosing a longer reading distance must actually enlarge the text')
    assert.ok(far.weight !== close.weight || far.weightAxis !== close.weightAxis, 'The chosen reading distance must also alter the rendered weight')
    const farSample = await readingType('.reading-live .reading-sample')
    const farDetail = await readingType('.reading-live .reading-detail')
    assert.ok(farSample[0].size > closeSample[0].size, 'The live comparison headline must grow with the selected reading distance')
    assert.equal(farDetail[0].optical, 'auto', 'Optical sizing must follow the actual rendered text size')
    assert.notEqual(farDetail[0].weight, farSample[0].weight, 'The adaptive body and comparison headline must preserve their weight hierarchy')
    assert.deepEqual(await baselineType(), baseline, 'The comparison reference must remain fixed when the reading profile changes')
    assert.deepEqual(await controlsType(), stableControls, 'Reading controls must remain typographically stable while the content changes')
    const slider = page.locator('.future-reading-range')
    await slider.focus()
    await page.keyboard.press('Home')
    assert.equal(await slider.inputValue(), '75', 'The letter-width range must work with the keyboard')
    const narrow = await typography(page)
    assert.deepEqual(await baselineType(), baseline, 'Changing letter width must leave the reference typography fixed')
    assert.deepEqual(await controlsType(), stableControls, 'Changing letter width must leave the control typography fixed')
    await page.keyboard.press('End')
    assert.equal(await slider.inputValue(), '125')
    const wide = await typography(page)
    assert.ok(narrow.axes !== wide.axes || narrow.stretch !== wide.stretch, 'The range must change the rendered variable-font width')
    assert.ok(Math.abs(narrow.width - wide.width) > 1 || Math.abs(narrow.height - wide.height) > 1, 'The variable-font width must visibly change text geometry')
    assert.deepEqual(await baselineType(), baseline, 'The widest letter setting must not alter the reference typography')
    assert.deepEqual(await controlsType(), stableControls, 'The widest letter setting must not alter the control typography')
    const destination = fixture.id === 'menu' ? 'locale.html' : 'menu.html'
    await page.locator(`.cafe-nav a[href^="${destination}"]`).click()
    await settle(page, 'adattabile')
    assert.equal(await root.getAttribute('data-reading'), 'lontano', 'Reading preferences must survive café navigation')
    assert.equal(await slider.inputValue(), '125', 'Letter width must survive café navigation')
    await page.reload()
    await settle(page, 'adattabile')
    assert.equal(await slider.inputValue(), '125', 'Letter width must survive reload')
    const liveNode = await page.locator('.reading-live .reading-sample').elementHandle()
    const sizeSlider = page.locator('.reading-size-range')
    const sizeNode = await sizeSlider.elementHandle()
    await sizeSlider.focus()
    await page.keyboard.press('Home')
    assert.equal(await sizeSlider.inputValue(), '16', 'Manual text size must expose its lower limit from the keyboard')
    const small = await readingType('.reading-live .reading-sample, .reading-live .reading-detail')
    assert.equal(await sizeNode.evaluate(node => node.isConnected && document.activeElement === node), true, 'Changing size must preserve the slider and its keyboard focus')
    await page.keyboard.press('End')
    assert.equal(await sizeSlider.inputValue(), '26', 'Manual text size must expose its upper limit from the keyboard')
    const large = await readingType('.reading-live .reading-sample, .reading-live .reading-detail')
    assert.ok(large.every((type, index) => type.size > small[index].size), 'Manual size must enlarge both the live headline and body')
    assert.equal(large[1].size, 26, 'The displayed size must match the actual body text')
    assert.equal(await liveNode.evaluate(node => node.isConnected), true, 'Changing size must update the existing comparison without replacing its DOM')
    assert.equal(await sizeNode.evaluate(node => node.isConnected && document.activeElement === node), true, 'Continuous size changes must preserve keyboard focus')
    assert.deepEqual(await baselineType(), baseline, 'Manual size must leave the comparison reference fixed')
    const weightSlider = page.locator('.reading-weight-range')
    const weightNode = await weightSlider.elementHandle()
    await weightSlider.focus()
    await page.keyboard.press('Home')
    assert.equal(await weightSlider.inputValue(), '350', 'Manual font weight must expose its lower limit from the keyboard')
    assert.equal((await readingType('.reading-live .reading-detail'))[0].weight, '350', 'The weight control must change the rendered body weight')
    await page.keyboard.press('End')
    assert.equal(await weightSlider.inputValue(), '750', 'Manual font weight must expose its upper limit from the keyboard')
    const heavy = await readingType('.reading-live .reading-sample, .reading-live .reading-detail')
    assert.equal(heavy[1].weight, '750', 'The maximum weight must reach the rendered body')
    assert.notEqual(heavy[0].weight, heavy[1].weight, 'Manual weight changes must preserve the headline and body hierarchy')
    assert.equal(await weightNode.evaluate(node => node.isConnected && document.activeElement === node), true, 'Changing weight must preserve the slider and its keyboard focus')
    assert.equal(await liveNode.evaluate(node => node.isConnected), true, 'Changing weight must keep the existing comparison DOM')
    assert.equal(await page.locator('.future-choice[aria-pressed="true"]').count(), 0, 'Manual size and weight must clear the selected distance preset')
    assert.equal(normalized(await page.locator('.reading-live .reading-settings').innerText()), '26 px · peso 750 · larghezza 125%', 'The comparison metadata must reflect the actual manual settings')
    assert.deepEqual(await baselineType(), baseline, 'Manual weight must leave the reference typography fixed')
    assert.deepEqual(await controlsType(), stableControls, 'Manual size and weight must leave the control typography stable')
    await page.locator('.reading-mode-control [data-mode="text"]').click()
    await page.reload()
    await settle(page, 'adattabile')
    assert.equal(await root.getAttribute('data-reading-mode'), 'text', 'Text-first reading mode must survive reload')
    assert.equal(await page.locator('.cafe-picture').evaluateAll(nodes => nodes.every(node => !node.getClientRects().length)), true, 'Restored text-first mode must hide the page photographs')
    await page.locator('#style-select').selectOption('flat')
    await settle(page, 'flat')
    await page.locator('#style-select').selectOption('adattabile')
    await settle(page, 'adattabile')
    assert.equal(await page.locator('.reading-adjustments .range').count(), 3, 'Returning to Adattabile must not duplicate its sliders')
    assert.equal(await page.locator('.reading-comparison > section').count(), 2, 'Returning to Adattabile must keep one reference and one live comparison')
    assert.deepEqual([await sizeSlider.inputValue(), await weightSlider.inputValue(), await slider.inputValue(), await root.getAttribute('data-reading-mode')], ['26', '750', '125', 'text'], 'Manual settings and reading mode must survive a style round trip')
    await page.locator('.reading-reset').click()
    assert.deepEqual([await sizeSlider.inputValue(), await weightSlider.inputValue(), await slider.inputValue(), await root.getAttribute('data-reading-mode')], ['20', '500', '100', 'full'], 'Reset must restore the comfortable reading settings and full site')
    assert.equal(await page.locator('.future-choice[data-value="comoda"]').getAttribute('aria-pressed'), 'true', 'Reset must restore the comfortable distance preset')
    assert.equal(await page.locator('.cafe-picture').evaluateAll(nodes => nodes.every(node => node.getClientRects().length > 0)), true, 'Reset must reveal the page photographs')
    return
  }
  if (styleId === 'generativa') {
    const prompt = page.locator('#future-prompt')
    const submit = page.locator('.future-submit')
    await prompt.fill('zzzz999')
    await submit.click()
    assert.equal(await result.locator('.future-empty-output').count(), 1, 'Unknown requests need a recoverable empty state')
    assert.equal(await prompt.isVisible(), true, 'The prompt must remain available after an unknown request')
    await prompt.fill('Mostra caffè e croissant')
    await submit.click()
    assert.deepEqual(await result.locator('.future-product-name').allTextContents(), ['Caffè', 'Croissant'], 'The composed products must respond to the actual request')
    assert.equal(await result.locator('.future-composed-hours, .future-composed-place, .future-empty-output').count(), 0)
    await assertFutureLink(page, '.future-composed-menu .future-link', 'menu.html')
    for (const request of [
      { text: 'Dal forno', categories: ['croissant'] },
      { text: 'Mostra gli infusi', categories: ['tea'] },
      { text: 'Mostra le bevande', categories: ['coffee', 'tea'] },
    ]) {
      await prompt.fill(request.text)
      await submit.click()
      assert.deepEqual(await result.locator('.future-recipe dt').allTextContents(),
        content.menu.filter(category => request.categories.includes(category.id)).flatMap(category => category.items.map(item => item.name)),
        `The visible request “${request.text}” must compose exactly the matching categories`)
      assert.equal(await result.locator('.future-composed-hours, .future-composed-place, .future-empty-output').count(), 0)
    }
    const menu = await result.innerHTML()
    await prompt.fill('Mostra gli orari')
    await submit.click()
    assert.equal(await result.locator('.future-composed-hours').count(), 1)
    assert.equal(await result.locator('.future-hours li').count(), content.week.length, 'The hours result must show the complete stated week')
    assert.equal(await result.locator('.future-composed-menu, .future-composed-place').count(), 0, 'New tasks must replace the previous composition')
    assert.notEqual(await result.innerHTML(), menu, 'An hours task must produce a materially different result from a product task')
    await assertFutureLink(page, '.future-composed-hours .future-link', 'contatti.html')
    const hours = await result.innerHTML()
    await prompt.fill('Mostra il locale')
    await submit.click()
    assert.equal(await result.locator('.future-composed-place').count(), 1)
    assert.equal(await result.locator('.future-composed-menu, .future-composed-hours').count(), 0)
    assert.notEqual(await result.innerHTML(), hours, 'A locale task must replace the hours with the requested place')
    assert.ok((await result.innerText()).includes(content.address) && (await result.innerText()).includes(content.city))
    await assertFutureLink(page, '.future-composed-place .future-link', 'locale.html')
    return
  }
  if (styleId === 'spaziale') {
    await choose(page, 'coffee')
    await choose(page, 'overview')
    const overview = await renderedSurface(page)
    await choose(page, 'near')
    assert.equal(await root.getAttribute('data-depth'), 'near')
    const near = await renderedSurface(page)
    assert.notDeepEqual(near.map(node => node.transform), overview.map(node => node.transform), 'The near plane must change the actual rendered spatial transform')
    await choose(page, 'tea')
    assert.equal(await root.getAttribute('data-active-product'), 'tea')
    assert.equal(await result.locator('[data-product="tea"]').count(), 1, 'Spatial product selection must open the requested content')
  }
  if (styleId === 'organica') {
    await choose(page, 'coffee')
    const before = await renderedSurface(page)
    await choose(page, 'tea')
    assert.equal(await root.getAttribute('data-organic-focus'), 'tea')
    assert.equal(await result.locator('[data-product="tea"]').count(), 1, 'Organic selection must open the requested content')
    assert.notDeepEqual(await renderedSurface(page), before, 'Organic selection must actually reshape the rendered surface')
  }
  if (styleId === 'olografica') {
    await choose(page, 'coffee')
    await choose(page, 'front')
    const front = await renderedSurface(page)
    await choose(page, 'side')
    assert.equal(await root.getAttribute('data-projection-view'), 'side')
    const side = await renderedSurface(page)
    assert.notDeepEqual(side.map(node => node.transform), front.map(node => node.transform), 'The lateral view must change the actual projection transform')
    await choose(page, 'tea')
    assert.equal(await root.getAttribute('data-projection-product'), 'tea')
    assert.equal(await result.locator('[data-product="tea"]').count(), 1, 'Projection selection must display the requested product')
  }
  if (['home', 'menu'].includes(fixture.id)) {
    assert.equal(await page.locator('.menu-item[data-future-selected="true"]').count(), 1, 'The selected product must be reflected in the café menu')
    assert.equal(await page.locator('.menu-item[data-future-selected="true"] h2, .menu-item[data-future-selected="true"] h3').innerText(), fixture.id === 'home' ? 'Tè' : content.menu.find(category => category.id === 'tea').name)
  } else if (['locale', 'contatti'].includes(fixture.id)) {
    await choose(page, 'hours')
    assert.equal(await result.locator('.future-hours-output').count(), 1, 'The locale must also offer its actual opening hours')
    const hoursText = await result.innerText()
    assert.ok(content.hours.every(row => hoursText.includes(row.time)), 'The selected hours must match the actual café hours')
  }
}

async function checkResourceBehaviour(page, fixture, protocol) {
  const requests = []
  const responses = []
  page.on('request', request => { if (request.resourceType() === 'image') requests.push(request.url()) })
  page.on('response', response => {
    if (response.request().resourceType() === 'image' && protocol === 'http') responses.push(response.body().then(body => ({ bytes: body.length, url: response.url() }), error => ({ error: error.message, url: response.url() })))
  })
  const base = protocol === 'http' ? serverURL : offlineURL
  await page.goto(new URL(`${fixture.file}?stile=risorse`, base).href)
  await settle(page, 'risorse')
  assert.equal(await page.locator('#cafe').getAttribute('data-images'), 'deferred')
  assert.equal(await page.locator('#cafe img[src], #cafe img[srcset]').count(), 0, 'The first resource-conscious view must not assign bitmap sources')
  assert.deepEqual(requests, [], `The first ${protocol} view must make zero image requests`)
  await page.locator('.future-load-images').click()
  await page.waitForFunction(() => document.querySelector('#cafe').dataset.images === 'loaded')
  await settle(page, 'risorse')
  await checkImageFrames(page, styles.find(style => style.id === 'risorse'), fixture)
  assert.equal(await page.locator('.future-load-images').isDisabled(), true, 'The image request must finish with an explicit loaded state')
  assert.equal(new Set(requests).size, 1, 'All subjects must reuse one unique requested bitmap')
  const resource = styles.find(style => style.id === 'risorse').image
  assert.ok(requests.every(url => decodeURIComponent(url).endsWith(resource.src)))
  const bodies = await Promise.all(responses)
  if (protocol === 'http') {
    assert.ok(bodies.length > 0, 'The HTTP image load must have a measured response')
    assert.ok(bodies.every(response => response.bytes === resource.bytes && response.bytes <= resourceBudget), 'The actual response must equal the declared bitmap bytes and stay within 100 kB')
  }
  report.cases.push({ page: fixture.id, style: 'risorse', mode: `interaction-${protocol}`, initialImageRequests: 0, loadedBitmaps: new Set(requests).size, bitmapBytes: resource.bytes, passed: true })
}

async function checkMenuFilters(page, styleId) {
  await page.goto(new URL(`menu.html?stile=${styleId}`, offlineURL).href)
  await settle(page, styleId)
  assert.equal(await page.locator('.menu-filter').count(), content.menu.length + 1, 'The menu needs all four categories and an all-categories choice')
  assert.equal(await page.locator('.menu-filter-status').getAttribute('aria-live'), 'polite')
  for (const category of content.menu) {
    await page.locator(`.menu-filter[data-category="${category.id}"]`).click()
    assert.deepEqual(await page.locator('.menu-category:visible h2').allTextContents(), [category.name], 'A filter must show exactly the requested category')
    assert.equal(await page.locator('.menu-filter[aria-pressed="true"]').count(), 1, 'Only one category choice may be selected')
    assert.equal(await page.locator(`.menu-filter[data-category="${category.id}"]`).getAttribute('aria-pressed'), 'true')
    assert.deepEqual((await page.locator('.menu-category:visible .menu-item-price').allTextContents()).map(normalized), category.items.map(item => euro(item.price)))
    assert.ok((await page.locator('.menu-filter-status').innerText()).includes(category.name), 'Filter feedback must identify the visible category')
    assert.deepEqual((await snapshot(page)).layoutIssues, [], 'Filtered content must remain within the category and page flow')
  }
  const all = page.locator('.menu-filter[data-category="all"]')
  await all.focus()
  await page.keyboard.press('Enter')
  assert.deepEqual(await page.locator('.menu-category:visible h2').allTextContents(), content.menu.map(category => category.name), 'Keyboard activation must restore the complete menu')
  assert.equal(await all.getAttribute('aria-pressed'), 'true')
  if (styleId === 'spaziale') {
    const viewport = page.viewportSize()
    await page.setViewportSize({ width: 390, height: 844 })
    // Fresh markup leaves the filter status empty, matching the reported
    // first-open collision rather than adding a feedback row that masks it.
    await page.goto(new URL('menu.html?stile=spaziale', offlineURL).href)
    await settle(page, styleId)
    await choose(page, 'coffee')
    await choose(page, 'near')
    const lastFilter = page.locator('.menu-filter[data-category="salato"]')
    async function centerClickFilter() {
      await lastFilter.scrollIntoViewIfNeeded()
      const hit = await lastFilter.evaluate(node => {
        const rect = node.getBoundingClientRect(), x = rect.x + rect.width / 2, y = rect.y + rect.height / 2
        const target = document.elementFromPoint(x, y)
        return { ownsCenter: target === node || node.contains(target), intercept: target?.closest('.menu-item')?.dataset.product, x, y }
      })
      assert.equal(hit.ownsCenter, true, `Spatial cards must not intercept the last filter's center after a selection: ${JSON.stringify(hit)}`)
      await page.mouse.click(hit.x, hit.y)
      assert.deepEqual(await page.locator('.menu-category:visible h2').allTextContents(), [content.menu.find(category => category.id === 'salato').name], 'A real pointer click must open the last category')
      assert.equal(await lastFilter.getAttribute('aria-pressed'), 'true')
    }
    await centerClickFilter()
    await all.click()
    await choose(page, 'tea')
    await centerClickFilter()
    await all.click()
    await choose(page, 'coffee')
    await centerClickFilter()
    await page.setViewportSize(viewport)
  }
  report.cases.push({ page: 'menu', style: styleId, mode: 'interaction-menu-filters', categories: content.menu.length, passed: true })
}

async function checkContactDraft(page, styleId) {
  await page.goto(new URL(`contatti.html?stile=${styleId}`, offlineURL).href)
  await settle(page, styleId)
  const form = page.locator('#contact-form'), result = page.locator('#contact-result')
  const submit = form.getByRole('button', { name: 'Prepara il messaggio', exact: true })
  const requests = []
  const record = request => { if (/^https?:/.test(request.url()) || request.method() !== 'GET') requests.push({ method: request.method(), url: request.url() }) }
  page.on('request', record)
  const stored = () => page.evaluate(() => {
    const read = kind => { try { const storage = window[kind]; return Object.fromEntries(Object.keys(storage).map(key => [key, storage.getItem(key)])) } catch { return 'unavailable' } }
    return { local: read('localStorage'), session: read('sessionStorage') }
  })
  try {
    const before = await stored()
    await submit.click()
    assert.ok(await form.locator(':invalid').count(), 'Empty required fields must block the draft')
    assert.equal(await result.locator('a').count(), 0)
    await form.locator('#contact-name').fill('   ')
    await form.locator('#contact-email').fill('ada.test@example.invalid')
    await form.locator('#contact-message').fill('            ')
    await submit.click()
    assert.equal(await form.locator('#contact-name').evaluate(node => node.checkValidity()), false, 'Whitespace cannot substitute for a name')
    assert.equal(await form.locator('#contact-message').evaluate(node => node.checkValidity()), false, 'Whitespace cannot substitute for a message')
    assert.equal(await result.locator('a').count(), 0)
    await form.locator('#contact-name').fill('  Ada Test  ')
    await form.locator('#contact-email').fill('invalid-mail')
    await form.locator('#contact-message').fill('Vorrei informazioni sui tavoli.')
    await submit.click()
    assert.equal(await form.locator('#contact-email').evaluate(node => node.checkValidity()), false, 'A malformed email must not produce a draft')
    assert.equal(await result.locator('a').count(), 0)
    const message = 'Vorrei informazioni sui tavoli.\n<svg onload="window.__formProbe=true"></svg>'
    await form.locator('#contact-email').fill('ada.test@example.invalid')
    await form.locator('#contact-message').fill(message)
    await submit.click()
    const draft = result.locator('a[download="messaggio-caffe-ttc.txt"]')
    const href = await draft.getAttribute('href')
    assert.ok(href?.startsWith('blob:'), 'The downloadable draft must stay local in a Blob URL')
    const text = await page.evaluate(async url => (await fetch(url)).text(), href)
    assert.ok(text.includes('Da: Ada Test <ada.test@example.invalid>') && text.includes(message), 'The plaintext draft must preserve the entered message and trimmed identity')
    const email = new URL(await result.locator('a[href^="mailto:"]').getAttribute('href'))
    assert.equal(email.pathname, content.email)
    assert.ok(email.searchParams.get('body').includes(message), 'The optional mail link must encode the message without sending it')
    assert.equal(await page.evaluate(() => Boolean(window.__formProbe)), false, 'User-supplied markup must remain plain text')
    assert.equal(await result.locator('svg, script, img').count(), 0, 'Draft preparation must not interpret submitted markup')
    assert.ok((await result.innerText()).includes('non ha inviato'))
    const readyStatus = await result.innerText()
    async function assertDraftNeedsUpdate() {
      assert.equal(await result.locator('a[href^="blob:"], a[href^="mailto:"]').count(), 0, 'Editing the form must make every previous draft action unavailable')
      const status = normalized(await result.innerText())
      assert.ok(status && status !== normalized(readyStatus) && !status.includes('La bozza è pronta'), 'Editing the form must announce that the draft needs preparation again')
    }
    await form.locator('#contact-message').fill('Una seconda bozza aggiornata.')
    await assertDraftNeedsUpdate()
    await submit.click()
    const updated = await draft.getAttribute('href')
    assert.notEqual(updated, href, 'Repreparing after a message edit must produce a new local draft')
    const updatedText = await page.evaluate(async url => (await fetch(url)).text(), updated)
    assert.ok(updatedText.includes('Una seconda bozza aggiornata.') && !updatedText.includes(message), 'A second submission must replace the draft content')
    const updatedMail = new URL(await result.locator('a[href^="mailto:"]').getAttribute('href'))
    assert.ok(updatedMail.searchParams.get('body').includes('Una seconda bozza aggiornata.') && !updatedMail.searchParams.get('body').includes(message), 'The mail action must use the updated message too')
    const subject = await form.locator('#contact-subject option').nth(1).textContent()
    await form.locator('#contact-subject').selectOption({ label: subject })
    await assertDraftNeedsUpdate()
    await submit.click()
    const changedSubject = await draft.getAttribute('href')
    assert.notEqual(changedSubject, updated, 'Changing the subject must require a fresh draft')
    const changedSubjectText = await page.evaluate(async url => (await fetch(url)).text(), changedSubject)
    assert.equal(changedSubjectText.split('\n')[0], subject, 'The newly downloaded draft must carry the selected subject')
    const changedSubjectMail = new URL(await result.locator('a[href^="mailto:"]').getAttribute('href'))
    assert.equal(changedSubjectMail.searchParams.get('subject'), subject, 'The newly prepared mail action must carry the selected subject')
    assert.equal(changedSubjectMail.searchParams.get('body'), updatedMail.searchParams.get('body'), 'A subject change must preserve the latest message')
    assert.deepEqual(await stored(), before, 'Personal form contents must not be stored in browser storage')
    assert.deepEqual(requests, [], 'Draft preparation must not transmit any request')
    report.cases.push({ page: 'contatti', style: styleId, mode: 'interaction-local-draft', validation: true, plaintext: true, transmittedRequests: 0, passed: true })
  } finally { page.off('request', record) }
}

async function checkProjection(page, viewport) {
  await page.goto(new URL('index.html?stile=olografica', offlineURL).href)
  await settle(page, 'olografica')
  const dialog = page.locator('.projection-dialog'), trigger = page.locator('[data-projection-open]')
  assert.equal(await dialog.locator('.projection-scene').getAttribute('src'), null, 'The dialog scene must be assigned only when projection is opened')
  await trigger.focus()
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.querySelector('.projection-dialog').open && getComputedStyle(document.querySelector('#cafe')).opacity === '0')
  assert.equal(await dialog.evaluate(node => node.matches(':modal')), true, 'The projection needs native modal semantics')
  assert.equal(await page.locator('#cafe').evaluate(node => getComputedStyle(node).pointerEvents), 'none', 'The disappearing site must stop receiving input')
  await dialog.locator('.projection-scene').evaluate(image => image.decode())
  assert.ok(normalized(await dialog.locator('.projection-identity').innerText()).includes(content.brand))
  assert.equal(await dialog.locator('.projection-nav button').count(), pageFixtures.length)
  for (const fixture of pageFixtures) {
    await dialog.locator(`.projection-nav button[data-page="${fixture.id}"]`).click()
    assert.equal(await dialog.locator('.projection-content h3').innerText(), fixture.title, 'The projected page must show the requested café content')
    assert.equal(await dialog.locator('.projection-nav button[aria-pressed="true"]').count(), 1)
    if (fixture.id === 'home') {
      assert.equal(await dialog.locator('.projection-product img').count(), content.highlights.length)
      await dialog.locator('.projection-product img').evaluateAll(async images => {
        await Promise.all(images.map(image => image.decode()))
      })
      assert.equal(await dialog.locator('.projection-product img').evaluateAll(images => images.every(image => image.naturalWidth > 0 && image.getBoundingClientRect().width > 0 && image.getBoundingClientRect().height > 0)), true, 'The projected food must render as three actual images')
    }
    if (fixture.id === 'menu') {
      assert.deepEqual(await dialog.locator('.projection-menu h4').allTextContents(), content.menu.map(category => category.name))
      assert.deepEqual((await dialog.locator('.projection-menu .projection-price').allTextContents()).map(normalized), content.menu.flatMap(category => category.items.map(item => euro(item.price))))
    }
    if (['locale', 'contatti'].includes(fixture.id)) assert.deepEqual(await dialog.locator('.projection-hours dd').allTextContents(), content.hours.map(row => row.time))
  }
  const front = await dialog.locator('.projection-plane').evaluate(node => getComputedStyle(node).transform)
  await dialog.locator('.projection-view').click()
  assert.equal(await dialog.getAttribute('data-view'), 'side')
  assert.equal(await dialog.locator('.projection-view').getAttribute('aria-pressed'), 'true')
  assert.notEqual(await dialog.locator('.projection-plane').evaluate(node => getComputedStyle(node).transform), front, 'The lateral view must alter the actual projection plane')
  await page.keyboard.press('Tab')
  assert.equal(await dialog.evaluate(node => node.contains(document.activeElement)), true, 'Focus must remain within the modal projection')
  await page.evaluate(async () => {
    await Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map(animation => animation.finished.catch(() => {})))
  })
  assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0, 'Reduced motion must make the projection static')
  const contrast = await checkContrast(page)
  assert.deepEqual(contrast.filter(sample => sample.ratio + 0.02 < sample.required), [], 'Projection text must retain AA contrast')
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' })
  assert.equal(await dialog.isVisible(), false, 'Print must show the original page rather than the modal scene')
  assert.equal(await page.locator('#cafe').evaluate(node => getComputedStyle(node).opacity), '1')
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' })
  await page.keyboard.press('Escape')
  assert.equal(await dialog.evaluate(node => node.open), false)
  assert.equal(await trigger.evaluate(node => node === document.activeElement), true, 'Escape must restore focus to the projection trigger')
  assert.equal(await page.locator('#cafe').evaluate(node => getComputedStyle(node).opacity), '1', 'Closing projection must restore the site')
  await trigger.click()
  await dialog.locator('.projection-close').click()
  assert.equal(await trigger.evaluate(node => node === document.activeElement), true, 'The close action must restore focus too')
  report.cases.push({ page: 'home', style: 'olografica', mode: 'interaction-projection', viewport, projectedPages: pageFixtures.length, reducedMotion: true, minimumContrast: Math.min(...contrast.map(sample => sample.ratio)), passed: true })
}

async function checkHolographicMotion(page) {
  await page.goto(`${serverURL}index.html?stile=olografica`)
  await settle(page, 'olografica')
  const root = page.locator('#cafe')
  const control = page.locator('.holo-motion-control')
  const offsets = () => root.evaluate(node => ['--holo-pointer-x', '--holo-pointer-y'].map(property => parseFloat(node.style.getPropertyValue(property))))
  const renderer = await root.getAttribute('data-projection-renderer')
  assert.ok(['webgl', 'css'].includes(renderer), 'The projection must declare its active renderer or CSS fallback')
  assert.equal(await page.locator('canvas.holo-light-field[aria-hidden="true"]').count(), 1, 'The light field must have one decorative canvas')
  if (renderer === 'webgl') {
    assert.equal(await page.locator('canvas.holo-light-field').evaluate(canvas => {
      const gl = canvas.getContext('webgl')
      return Boolean(gl && !gl.isContextLost() && gl.drawingBufferWidth > 0 && gl.drawingBufferHeight > 0)
    }), true, 'The WebGL renderer must own a live context and nonempty drawing buffer')
  }
  assert.equal(await control.count(), 1, 'The floating page needs one motion control')
  assert.equal(await page.locator('.holo-orbit[aria-hidden="true"] img[alt=""]').count(), 1, 'The secondary product must stay decorative')
  assert.equal(await page.locator('.holo-orbit img').evaluate(image => image.complete && image.naturalWidth > 0), true, 'The floating product must be decoded before the page is ready')
  await page.mouse.move(1400, 900)
  await page.waitForFunction(() => parseFloat(document.querySelector('#cafe').style.getPropertyValue('--holo-pointer-x')) > 0)
  assert.ok((await offsets()).every(value => value > 0 && value <= 16), 'The fine pointer must move the depth layers within the 16 px limit')
  await control.click()
  assert.equal(await root.getAttribute('data-float-paused'), 'true')
  assert.equal(await control.getAttribute('aria-pressed'), 'true')
  assert.equal(await control.innerText(), 'Riattiva il movimento')
  await page.mouse.move(20, 20)
  assert.deepEqual(await offsets(), [0, 0], 'Pausing must reset pointer depth and ignore new movement')
  assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running' && animation.effect?.getComputedTiming().iterations === Infinity).length), 0, 'Pausing must also freeze the idle levitation')
  await control.click()
  assert.equal(await control.innerText(), 'Ferma il movimento')
  await page.mouse.move(1400, 900)
  await page.waitForFunction(() => parseFloat(document.querySelector('#cafe').style.getPropertyValue('--holo-pointer-x')) > 0)
  await page.evaluate(() => document.documentElement.dispatchEvent(new PointerEvent('pointerleave')))
  assert.deepEqual(await offsets(), [0, 0], 'Leaving the document must reset depth')
  await page.mouse.move(1300, 800)
  await page.waitForFunction(() => parseFloat(document.querySelector('#cafe').style.getPropertyValue('--holo-pointer-x')) > 0)
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')))
  assert.deepEqual(await offsets(), [0, 0], 'Printing must reset pointer depth')
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await settle(page, 'olografica')
  await page.mouse.move(1400, 900)
  assert.deepEqual(await offsets(), [0, 0], 'Reduced motion must keep the depth layers still')
  assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0, 'Reduced motion must disable idle levitation')
  await page.locator('#style-select').selectOption('flat')
  await settle(page, 'flat')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.mouse.move(10, 10)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  assert.equal(await page.locator('.holo-orbit, .holo-motion-control, .holo-light-field').count(), 0, 'Changing style must remove holographic components and its canvas')
  assert.equal(await root.getAttribute('data-projection-renderer'), null, 'Changing style must remove renderer state')
  assert.deepEqual(await root.evaluate(node => ['--holo-pointer-x', '--holo-pointer-y'].map(property => node.style.getPropertyValue(property))), ['', ''], 'Changing style must stop pointer listeners and remove their state')
  await page.locator('#style-select').selectOption('olografica')
  await settle(page, 'olografica')
  assert.equal(await control.count(), 1, 'Returning to the style must not duplicate its control')
  assert.equal(await page.locator('.holo-orbit').count(), 1, 'Returning to the style must not duplicate its product')
  assert.equal(await page.locator('canvas.holo-light-field[aria-hidden="true"]').count(), 1, 'Returning to the style must create exactly one projection canvas')
  assert.ok(['webgl', 'css'].includes(await root.getAttribute('data-projection-renderer')), 'Returning to the style must restore its renderer state')
  assert.equal(await root.getAttribute('data-float-paused'), 'false', 'A new activation must start with its own motion state')
}

async function checkContrast(page) {
  const texts = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const samples = []
    while (walker.nextNode()) {
      const node = walker.currentNode
      const parent = node.parentElement
      if (!node.textContent.trim() || parent.closest('option, script, style, noscript, [hidden], [aria-hidden="true"]') || parent.closest('details:not([open])') && !parent.closest('summary')) continue
      let visible = true
      for (let ancestor = parent; ancestor; ancestor = ancestor.parentElement) {
        const ancestorStyle = getComputedStyle(ancestor)
        if (ancestorStyle.visibility === 'hidden' || parseFloat(ancestorStyle.opacity) === 0) { visible = false; break }
      }
      if (!visible) continue
      const range = document.createRange()
      range.selectNodeContents(node)
      const style = getComputedStyle(parent)
      for (const box of range.getClientRects()) {
        if (!box.width || !box.height || box.top < 0 || box.left < 0) continue
        samples.push({ text: node.textContent.trim(), color: style.color, large: parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseFloat(style.fontWeight) >= 700), x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height })
      }
    }
    for (const select of document.querySelectorAll('#style-select, #contact-subject')) if (select.getClientRects().length && !document.body.dataset.projection) {
      const box = select.getBoundingClientRect()
      samples.push({ text: select.id === 'style-select' ? 'Selected style' : 'Selected contact subject', color: getComputedStyle(select).color, large: false, x: box.x + scrollX + 12, y: box.y + scrollY + 12, width: box.width - 58, height: box.height - 24 })
    }
    return samples
  })
  // Sample the actual backgrounds, including translucent surfaces and gradients,
  // with the glyphs temporarily hidden so foreground pixels cannot inflate ratios.
  const hideText = await page.addStyleTag({ content: '* { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; text-decoration-color: transparent !important; }' })
  let background
  try { background = await page.screenshot({ fullPage: true }) } finally { await hideText.evaluate(node => node.remove()) }
  return page.evaluate(async ({ samples, pixels }) => {
    const image = new Image()
    image.src = `data:image/png;base64,${pixels}`
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d', { willReadFrequently: true })
    context.drawImage(image, 0, 0)
    const paint = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
    function luminance(rgb) { return rgb.slice(0, 3).map(c => c / 255).map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4).reduce((sum, c, index) => sum + c * [0.2126, 0.7152, 0.0722][index], 0) }
    return samples.map(sample => {
      paint.clearRect(0, 0, 1, 1)
      paint.fillStyle = sample.color
      paint.fillRect(0, 0, 1, 1)
      const foreground = [...paint.getImageData(0, 0, 1, 1).data]
      const ratios = []
      for (const dx of [0.2, 0.5, 0.8]) for (const dy of [0.25, 0.5, 0.75]) {
        const x = Math.min(image.width - 1, Math.round(sample.x + sample.width * dx))
        const y = Math.min(image.height - 1, Math.round(sample.y + sample.height * dy))
        const bg = [...context.getImageData(x, y, 1, 1).data]
        const fg = foreground.slice(0, 3).map((c, i) => c * foreground[3] / 255 + bg[i] * (1 - foreground[3] / 255))
        const [a, b] = [luminance(fg), luminance(bg)].sort((a, b) => b - a)
        ratios.push((a + 0.05) / (b + 0.05))
      }
      return { text: sample.text, ratio: Math.min(...ratios), required: sample.large ? 3 : 4.5 }
    })
  }, { samples: texts, pixels: background.toString('base64') })
}

async function check(label, action) {
  try { await action() } catch (error) { report.errors.push({ label, message: error.message }) }
}

try {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  observeContext(context)
  const page = await context.newPage()
  for (const fixture of pageFixtures) {
  for (const mode of [
    { name: 'desktop', viewport: { width: 1440, height: 1000 }, media: 'screen' },
    { name: 'user', viewport: { width: 1032, height: 703 }, media: 'screen' },
    { name: 'tablet', viewport: { width: 768, height: 1024 }, media: 'screen' },
    { name: 'mobile', viewport: { width: 390, height: 844 }, media: 'screen' },
    { name: 'print', viewport: { width: 704, height: 1033 }, media: 'print' },
  ]) {
    await page.setViewportSize(mode.viewport)
    await page.emulateMedia({ media: mode.media, reducedMotion: 'reduce' })
    let baseline
    await check(`${fixture.id}/${mode.name}/baseline`, async () => {
      await page.goto(new URL(fixture.file, offlineURL).href)
      await settle(page, 'flat')
      baseline = await snapshot(page)
      await page.locator('#style-select').selectOption('html', { force: mode.media === 'print' })
      await settle(page, 'html')
      assert.equal(await page.locator('#style-select option').count(), expectedIds.length)
      assert.deepEqual(await page.locator('#style-select option').allTextContents(), styles.map(style => `${style.years} · ${style.label}`), 'Every selector entry must put its year range before the style name')
      assert.equal(await page.locator('.style-lab, .lab-footer, .style-context').count(), 0, 'The café must have no external teaching frame')
      assert.equal(await page.locator('#cafe').getAttribute('data-page'), fixture.id)
      assert.equal((await page.locator('#cafe-title').innerText()).replace(/\s+/g, ' ').trim(), fixture.title)
      assert.ok(baseline.text.includes(content.brand) && baseline.text.includes(content.tagline), 'The canonical TTC identity and tagline must remain readable')
      assert.ok(baseline.boxes.length >= fixture.images + 3, 'Common sections and image slots must be measured')
    })
    for (const style of styles) {
      await check(`${fixture.id}/${mode.name}/${style.id}`, async () => {
        // Dispatching the select event also verifies all skins in print, where the toolbar is hidden.
        await page.locator('#style-select').selectOption(style.id, { force: mode.media === 'print' })
        await settle(page, style.id)
        const current = await snapshot(page)
        if (mode.name === 'desktop') report.languages.push({ page: fixture.id, style: style.id, signature: current.signature, controlSignature: current.controlSignature })
        assert.ok(baseline, 'The page needs an available baseline for its unchanged café content')
        // The new brief authorizes style-specific additions. Canonical café content is checked below.
        if (style.layout !== 'legacy' || mode.media === 'print') assert.equal(current.horizontalOverflow, false, 'Responsive layouts and A4 must fit their viewport')
        else if (mode.viewport.width < 1024) assert.equal(current.horizontalOverflow, true, 'Legacy desktop compositions must keep their intended canvas')
        assert.equal(current.layout, style.layout, 'The layout must reflect the selected historical profile')
        assert.equal(current.integratedSelect, true, 'The style selector must be inside the café header')
        if (mode.media === 'screen' && !['html','web2','scheu','glass','liquid','olografica'].includes(style.id)) assert.equal(current.fullBleed, true, 'Unframed site variants must fill the viewport')
        assert.deepEqual(current.overflow, [], 'Café text is clipped')
        assert.deepEqual(current.layoutIssues, [], 'A section overlaps another section or menu content exceeds its category')
        assert.ok(current.imageLabels.every(Boolean), 'Every food illustration needs an accessible description')
        await checkImageFrames(page, style, fixture)
        await checkCaféContent(page, fixture, mode.media)
        assert.ok(current.boxes.every(box => Object.values(box).filter(value => typeof value === 'number').every(Number.isFinite) && box.width > 0 && box.height > 0),
          'Visible sections and illustrations need valid, nonempty geometry')
        if (futureIds.includes(style.id)) {
          assert.equal(current.futureVisible, true, 'Each future direction needs its own meaningful experience in screen and print')
          await checkFutureAccessibility(page, mode)
        }
        if (style.id === 'risorse') {
          assert.equal(current.images, 'deferred', 'Resource-conscious images must stay deferred until explicitly requested')
          assert.ok(current.sources.every(source => !source), 'The resource-conscious default must have no active image sources')
        }
        const colors = mode.name === 'desktop' && style.id !== 'spaziale' ? await checkContrast(page) : []
        const lowContrast = colors.filter(sample => sample.ratio + 0.02 < sample.required)
        assert.deepEqual(lowContrast, [], 'Text fails contrast on the rendered backgrounds')
        report.cases.push({ page: fixture.id, mode: mode.name, style: style.id, signature: current.signature, controlSignature: current.controlSignature, integratedSelect: current.integratedSelect, fullBleed: current.fullBleed, minimumContrast: colors.length ? Math.min(...colors.map(sample => sample.ratio)) : undefined, passed: true })
      })
      await check(`${fixture.id}/${mode.name}/${style.id}/artifacts`, async () => {
        if (process.env.CAFFE_SCREENSHOTS !== '0' && ['desktop', 'user', 'mobile'].includes(mode.name)) {
          const shot = `${fixture.id}-${mode.name}-${style.id}.png`
          await page.screenshot({ path: path.join(output, shot), fullPage: true })
          report.screenshots.push(shot)
        }
        if (mode.name === 'print') {
          const pdf = await page.pdf({ path: path.join(output, `${fixture.id}-print-${style.id}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true })
          const source = pdf.toString('latin1')
          const pages = (source.match(/\/Type\s*\/Page\b/g) || []).length
          const media = [...source.matchAll(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/g)]
          assert.ok(pages >= 1 && media.length >= 1, 'The printable page needs complete PDF pages')
          assert.ok(media.every(match => Math.abs(Number(match[1]) - 595.28) < 2 && Math.abs(Number(match[2]) - 841.89) < 2), 'Every print page must use portrait A4')
          report.printPages.push({ page: fixture.id, style: style.id, pages, paper: 'A4', passed: true })
        }
      })
    }
    console.log(`[Caffè TTC] ${fixture.id}/${mode.name}: ${styles.length} styles checked; ${report.errors.length} errors so far`)
  }
  }
  for (const fixture of pageFixtures) {
    for (const styleId of futureIds) {
      await check(`${fixture.id}/interaction/${styleId}`, async () => {
        const interactionContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
        observeContext(interactionContext)
        const interactionPage = await interactionContext.newPage()
        try {
          if (styleId === 'risorse') {
            await checkResourceBehaviour(interactionPage, fixture, 'file')
          } else {
            await interactionPage.goto(new URL(`${fixture.file}?stile=${styleId}`, offlineURL).href)
            await settle(interactionPage, styleId)
            await checkFutureBehaviour(interactionPage, styleId, fixture)
            report.cases.push({ page: fixture.id, style: styleId, mode: 'interaction-file', passed: true })
          }
        } finally {
          if (process.env.CAFFE_SCREENSHOTS !== '0') await check(`${fixture.id}/interaction/${styleId}/artifacts`, async () => {
            const shot = `${fixture.id}-interaction-${styleId}.png`
            await interactionPage.screenshot({ path: path.join(output, shot), fullPage: true })
            report.screenshots.push(shot)
          })
          await interactionContext.close()
        }
      })
    }
    if (styles.some(style => style.id === 'risorse')) await check(`${fixture.id}/resources-first-http`, async () => {
      const resourceContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
      observeContext(resourceContext)
      try { await checkResourceBehaviour(await resourceContext.newPage(), fixture, 'http') }
      finally { await resourceContext.close() }
    })
  }
  for (const style of styles.filter(style => style.presentation === 'site')) {
    await check(`menu-and-local-draft/${style.id}`, async () => {
      const interactionContext = await browser.newContext({ viewport: { width: 1032, height: 703 }, reducedMotion: 'reduce' })
      observeContext(interactionContext)
      try {
        const interactionPage = await interactionContext.newPage()
        await checkMenuFilters(interactionPage, style.id)
        await checkContactDraft(interactionPage, style.id)
      } finally { await interactionContext.close() }
    })
  }
  await check('Keyboard, links and motion', async () => {
    await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto(offlineURL)
    await settle(page, 'flat')
    await page.locator('#style-select').focus()
    assert.equal(await page.locator('#style-select').evaluate(node => document.activeElement === node), true)
    await page.keyboard.press('Space')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    const selected = await page.locator('#style-select').inputValue()
    assert.notEqual(selected, 'flat', 'The native selector cannot be operated with the keyboard')
    await settle(page, selected)
    const focus = await page.locator('#style-select').evaluate(node => ({ outline: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth, label: node.labels?.[0]?.textContent }))
    assert.ok(focus.label && focus.outline !== 'none' && parseFloat(focus.width) > 0, 'The selector needs an associated label and visible focus')
    await page.locator('.cafe-nav').getByRole('link', { name: 'Menu', exact: true }).click()
    await settle(page, selected)
    assert.ok(new URL(page.url()).pathname.endsWith('/menu.html'))
    await page.locator('.cafe-nav').getByRole('link', { name: 'Il locale', exact: true }).click()
    await settle(page, selected)
    assert.ok(new URL(page.url()).pathname.endsWith('/locale.html'))
    await page.locator('.cafe-nav').getByRole('link', { name: 'Contatti', exact: true }).click()
    await settle(page, selected)
    assert.ok(new URL(page.url()).pathname.endsWith('/contatti.html'))
    await page.locator('.cafe-header .cafe-brand').click()
    await settle(page, selected)
    await page.locator('.cafe-hero .cafe-cta').click()
    await settle(page, selected)
    assert.ok(new URL(page.url()).pathname.endsWith('/menu.html'))
    assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0)
    report.cases.push({ mode: 'keyboard-links-reduced-motion', passed: true })
  })
  await check('Style retained across every page, navigation and reload', async () => {
    for (const style of styles.filter(style => !['scene','conversation'].includes(style.presentation))) {
      await page.goto(new URL(`index.html?stile=${style.id}`, offlineURL).href)
      await settle(page, style.id)
      for (const destination of [{ name: 'Menu', file: 'menu.html' }, { name: 'Il locale', file: 'locale.html' }, { name: 'Contatti', file: 'contatti.html' }]) {
        await page.locator(`#cafe a[href^="${destination.file}"]`).filter({ visible: true }).first().click()
        await settle(page, style.id)
        assert.ok(new URL(page.url()).pathname.endsWith(`/${destination.file}`))
        assert.equal(new URL(page.url()).searchParams.get('stile'), style.id)
        assert.equal(await page.locator('#style-select').inputValue(), style.id)
      }
      await page.reload()
      await settle(page, style.id)
      report.cases.push({ mode: 'navigation-reload', style: style.id, passed: true })
    }
  })
  await check('Rapid switching, resize and HTTP', async () => {
    await page.goto(serverURL)
    await settle(page, 'flat')
    await page.evaluate(() => {
      const select = document.querySelector('#style-select')
      for (const id of ['neo', 'spaziale', 'minimal', 'olografica', 'html', 'liquid']) {
        select.value = id
        select.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
    await settle(page, 'liquid')
    await page.setViewportSize({ width: 390, height: 844 })
    await settle(page, 'liquid')
    assert.equal((await snapshot(page)).horizontalOverflow, false)
    report.cases.push({ mode: 'http-rapid-switch-resize', passed: true })
  })
  await check('Delayed stylesheet, stale load and recoverable stylesheet failure', async () => {
    const cssContext = await browser.newContext({ reducedMotion: 'reduce' })
    const cssPage = await cssContext.newPage()
    let release
    try {
      await cssPage.goto(serverURL)
      await settle(cssPage, 'flat')
      let reached
      const started = new Promise(resolve => { reached = resolve })
      const delayed = new Promise(resolve => { release = resolve })
      await cssPage.route('**/styles/neo.css', async route => {
        reached()
        await delayed
        await route.continue()
      })
      await cssPage.locator('#style-select').selectOption('neo')
      await started
      assert.equal(await cssPage.locator('#cafe').getAttribute('data-style'), 'flat', 'Keep the previous composition until the new CSS is available')
      assert.equal(await cssPage.locator('#cafe-stylesheet').getAttribute('data-style'), 'flat')
      await cssPage.locator('#style-select').selectOption('html')
      await settle(cssPage, 'html')
      release()
      await cssPage.waitForFunction(() => document.querySelectorAll('link[rel="stylesheet"][data-style]').length === 1)
      assert.equal(await cssPage.locator('#cafe-stylesheet').getAttribute('data-style'), 'html', 'An older CSS request must not replace the latest choice')
      await cssPage.route('**/styles/glass.css', route => route.abort())
      await cssPage.locator('#style-select').selectOption('glass')
      await cssPage.waitForFunction(() => document.querySelector('#cafe').dataset.ready === 'error')
      assert.equal(await cssPage.locator('#cafe-stylesheet').getAttribute('data-style'), 'html', 'A missing CSS file must leave the previous stylesheet available')
      assert.equal(await cssPage.locator('#style-select').inputValue(), 'html')
      assert.equal(await cssPage.locator('#load-error').isVisible(), true)
      await cssPage.unroute('**/styles/glass.css')
      await cssPage.locator('#style-select').selectOption('glass')
      await settle(cssPage, 'glass')
      assert.equal(await cssPage.locator('link[rel="stylesheet"][data-style]').count(), 1)
      await cssPage.goto(`${serverURL}?stile=unknown`)
      await settle(cssPage, 'flat')
      report.cases.push({ mode: 'stylesheet-delay-failure-recovery', passed: true })
    } finally {
      release?.()
      await cssContext.close()
    }
  })
  await check('Holographic pointer depth, pause, reduced motion and cleanup', async () => {
    const animated = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 1000 } })
    observeContext(animated)
    try {
      await checkHolographicMotion(await animated.newPage())
      report.cases.push({ mode: 'holographic-pointer-pause-reduced-motion-cleanup', passed: true })
    } finally { await animated.close() }
  })
  await check('Conversation animation, pause, restart and cleanup', async () => {
    const animated = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: 1032, height: 703 } })
    observeContext(animated)
    const chat = await animated.newPage()
    try {
      await chat.goto(`${serverURL}menu.html?stile=generativa`)
      await chat.waitForFunction(() => document.querySelector('#cafe').dataset.ready === 'true')
      await chat.waitForFunction(() => document.querySelectorAll('.generated-piece').length === 1)
      await chat.locator('.conversation-pause').click()
      assert.equal(await chat.locator('.conversation-stage').getAttribute('data-paused'), 'true')
      await chat.locator('.conversation-replay').click()
      assert.equal(await chat.locator('.conversation-stage').getAttribute('data-paused'), 'false', 'Restart must reset visual motion as well as chat timing')
      await chat.waitForFunction(() => document.querySelectorAll('.generated-piece').length === 1)
      await chat.locator('.conversation-pause').click()
      await chat.locator('.conversation-finish').click()
      await settle(chat, 'generativa')
      assert.equal(await chat.locator('.generated-piece').count(), 3)
      assert.equal(await chat.locator('.conversation-stage').getAttribute('data-paused'), 'false')
      await checkScenarioContent(chat, pageFixtures.find(fixture => fixture.id === 'menu'))
      await chat.locator('#style-select').selectOption('text')
      await settle(chat, 'text')
      assert.equal(await chat.locator('.scenario-stage').count(), 0, 'Leaving a scenario must remove its components and stop its timeline')
      for (const removed of ['brutal','swiss','deco','risorse','organica']) {
        await chat.goto(`${serverURL}?stile=${removed}`)
        await settle(chat, 'flat')
        assert.equal(await chat.locator('#style-select option[value="' + removed + '"]').count(), 0)
      }
      report.cases.push({ mode: 'conversation-animation-restart-cleanup-and-removed-catalogue', passed: true })
    } finally { await animated.close() }
  })
  await check('Offline resources and distinct languages', async () => {
    assert.deepEqual(report.externalRequests, [], 'The offline site requests external resources')
    assert.deepEqual(report.consoleErrors, [], 'The site reports browser errors')
    const signatures = new Set(report.languages.map(test => test.signature))
    assert.ok(signatures.size >= 19, 'The interface languages need materially different palettes and typography')
    const controls = new Set(report.languages.filter(test => test.page === 'home').map(test => test.controlSignature))
    assert.equal(controls.size, expectedIds.length, 'Every style must also change the selector appearance')
    assert.equal(report.printPages.length, pageFixtures.length * expectedIds.length, 'Every café page and style must have an A4 export')
    assert.ok(report.printPages.some(test => test.pages > 1), 'The expanded café must produce real multi-page A4 documents')
  })
  report.status = report.errors.length ? 'failed' : 'passed'
  await writeFile(path.join(output, 'verification.json'), `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify({ status: report.status, cases: report.cases.length, pages: pageFixtures.length, styles: expectedIds.length, viewports: 4, userViewport: { width: 1032, height: 703 }, print: 'A4, content width 704 px, multiple pages permitted', futureInteractionCases: report.cases.filter(test => test.mode.startsWith('interaction-')).length, portableOfflineCopy: true, externalRequests: report.externalRequests.length, errors: report.errors, report: output }, null, 2))
  assert.equal(report.errors.length, 0, 'Caffè TTC checks failed; see the report')
} finally {
  await browser.close()
  await new Promise(resolve => server.close(resolve))
  await rm(copied, { recursive: true, force: true })
}
