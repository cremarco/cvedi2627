/** Wait for rendered slide content rather than background prefetch/network idle. */
export async function openSlide(page, base, target, { settle = false } = {}) {
  await page.goto(`${base.replace(/\/$/, '')}/#/${target}`, { waitUntil: 'domcontentloaded' })
  const selector = typeof target === 'number'
    ? `.slidev-page-${target} .slidev-layout`
    : '.slidev-layout.is-active'
  const root = page.locator(selector)
  await root.waitFor({ state: 'visible' })
  await page.evaluate(() => document.fonts.ready)
  await root.evaluate(root => Promise.all([...root.querySelectorAll('img')].map(image => {
    if (image.complete) return Promise.resolve()
    return new Promise(resolve => {
      image.addEventListener('load', resolve, { once: true })
      image.addEventListener('error', resolve, { once: true })
    })
  })))
  if (settle) await page.evaluate(() => Promise.all(document.getAnimations()
    .filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime))
    .map(animation => animation.finished.catch(() => {}))))
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  return root
}
