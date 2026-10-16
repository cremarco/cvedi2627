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
  // Figure width sets caption width, which can resize the image slot again.
  // Wait for ResizeObserver-driven layout to converge before measuring gaps.
  await root.evaluate(root => new Promise((resolve, reject) => {
    const figures = [...root.querySelectorAll('.lesson-figure, .lesson-figure-media, .lesson-figure img, .lesson-figure figcaption')]
    if (!figures.length) { resolve(); return }
    let frame, previous, stableFrames = 0
    const timeout = setTimeout(() => {
      cancelAnimationFrame(frame)
      reject(new Error('Slide figure and caption geometry did not stabilize within 5000 ms'))
    }, 5000)
    function measure() {
      const geometry = JSON.stringify(figures.map(element => {
        const { x, y, width, height } = element.getBoundingClientRect()
        return [x, y, width, height]
      }))
      stableFrames = geometry === previous ? stableFrames + 1 : 1
      previous = geometry
      if (stableFrames >= 3) { clearTimeout(timeout); resolve(); return }
      frame = requestAnimationFrame(measure)
    }
    frame = requestAnimationFrame(measure)
  }))
  return root
}
