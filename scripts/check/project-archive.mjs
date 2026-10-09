import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { projectArchiveURL } from '../../utils/project-archive.mjs'
import { publicationExtensions } from '../../utils/publication.mjs'

const root = process.cwd()
const output = path.resolve(process.env.ARCHIVE_MIGRATION_REPORT || 'reports/project-archive')
await mkdir(output, { recursive: true })
const directory = path.join(root, '_site')
const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
const serve = require('sirv')(directory, { dev: true })
const missing = await readFile(path.join(directory, '404.html'))
const server = createServer((request, response) => {
  if (request.url.startsWith('/cvedi2627/')) request.url = request.url.slice('/cvedi2627'.length)
  serve(request, response, () => response.writeHead(404, { 'Content-Type': 'text/html' }).end(missing))
})
await new Promise((resolve, reject) => { server.on('error', reject); server.listen(0, '127.0.0.1', resolve) })
const origin = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({ headless: true })
const report = { cases: [] }
try {
  const projects = JSON.parse(await readFile('data/projects.json', 'utf8'))
  assert.equal(projects.length, 76, 'all archived projects retain their slide previews')
  for (const project of projects) {
    assert.ok(project.source.startsWith(projectArchiveURL), `${project.title}: external provenance`)
    await access(path.join(root, 'public', project.image))
  }
  await assert.rejects(access(path.join(directory, 'project/gallery-data.json')), { code: 'ENOENT' }, 'course builds contain only the archive redirect')
  const context = await browser.newContext()
  await context.route(`${projectArchiveURL}**`, route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Archive destination</title>' }))
  for (const suffix of ['', 'index.html?year=2025-2026#projects', 'totem.html?project=a.a.2024_2025/AstroMed/#index-home.html', 'a.a.2025_2026/riff/menu/descrizione-piatto-1.html?original=1#menu', 'a.a.2021_2022/Akawa_Project/3-city_access.html']) {
    const page = await context.newPage()
    await page.goto(`${origin}/cvedi2627/project/${suffix}`)
    const destination = new URL(suffix, projectArchiveURL).href
    await page.waitForURL(destination)
    assert.equal(page.url(), destination, 'legacy paths, queries and fragments survive the migration')
    report.cases.push({ legacy: `/cvedi2627/project/${suffix}`, destination })
    await page.close()
  }
  const unknown = await context.newPage()
  const response = await unknown.goto(`${origin}/cvedi2627/missing-page`)
  assert.equal(response.status(), 404)
  assert.equal(new URL(unknown.url()).origin, origin, 'unrelated missing pages do not redirect to the archive')
  await unknown.close()
  const fallback = await browser.newContext({ javaScriptEnabled: false })
  const fallbackPage = await fallback.newPage()
  await fallbackPage.goto(`${origin}/cvedi2627/project/a.a.2025_2026/riff/menu.html`)
  assert.equal(await fallbackPage.getByRole('link', { name: 'Apri l’archivio dei progetti' }).getAttribute('href'), projectArchiveURL, 'deep legacy links have an accessible no-JavaScript fallback')
  await fallback.close()
  const { load, injectPreparserExtensionLoader } = await import(require.resolve('@slidev/parser/fs'))
  injectPreparserExtensionLoader(async (_roots, _headmatter, _file, mode) => publicationExtensions(mode))
  const deck = await load({ roots: [root], userRoot: root, allowedRoots: [root] }, path.join(root, 'slides.md'), undefined, 'build')
  injectPreparserExtensionLoader(null)
  const gallerySlide = deck.slides.findIndex(slide => /<ProjectGallery\b/.test(slide.content)) + 1
  assert.ok(gallerySlide > 0, 'the published deck retains its gallery slide')
  const page = await context.newPage()
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(`${origin}/cvedi2627/slides/#/${gallerySlide}`)
    await page.locator('.project-gallery-linkbar a').waitFor()
    assert.equal(await page.locator('.project-gallery-linkbar a').getAttribute('href'), projectArchiveURL)
    await page.waitForFunction(() => [...document.querySelectorAll('.project-gallery img')].every(image => image.complete && image.naturalWidth > 0))
    const images = await page.locator('.project-gallery img').evaluateAll(elements => elements.map(image => ({ loaded: image.complete && image.naturalWidth > 0, url: image.src })))
    assert.ok(images.length >= 12 && images.every(image => image.loaded), 'slide thumbnails remain available locally')
    assert.ok(images.every(image => new URL(image.url).origin === origin), 'slides do not need the external archive to display thumbnails')
    await page.screenshot({ path: path.join(output, `slide-${width}.png`) })
    report.cases.push({ slide: 'archivio-progetti', width, localThumbnails: images.length })
  }
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' })
  assert.equal(await page.locator('.project-gallery-linkbar a').getAttribute('href'), projectArchiveURL)
  await page.screenshot({ path: path.join(output, 'slide-print.png') })
  report.cases.push({ slide: 'archivio-progetti', media: 'print' })
  await context.close()
} finally {
  await browser.close()
  await new Promise(resolve => server.close(resolve))
  await writeFile(path.join(output, 'verification.json'), JSON.stringify(report, null, 2) + '\n')
}
console.log(`Project archive migration: ${report.cases.length} browser cases passed; 76 local previews preserved.`)
