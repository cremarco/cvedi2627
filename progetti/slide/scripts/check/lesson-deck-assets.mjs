import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
import { publicationExtensions } from '../../utils/publication.mjs'
import { lessonDecks } from '../../utils/lesson-decks.mjs'

const root = fileURLToPath(new URL('../../../..', import.meta.url))
const imagePaths = text => [...text.matchAll(/\/images\/[^\s"'<>`)}]+/g)].map(match => decodeURIComponent(match[0]))

/** An independent source inventory, so a foreign image request cannot pass unnoticed. */
export async function lessonAssetInventory(mode) {
  const require = createRequire(await realpath(path.join(root, 'node_modules/@slidev/cli/package.json')))
  const { load, injectPreparserExtensionLoader } = await import(require.resolve('@slidev/parser/fs'))
  injectPreparserExtensionLoader(async (_r, _h, _f, mode) => publicationExtensions(mode))
  let source
  try { source = await load({ roots: [path.join(root, 'progetti/slide')], userRoot: path.join(root, 'progetti/slide'), allowedRoots: [root] }, path.join(root, 'progetti/slide/slides.md'), undefined, mode) }
  finally { injectPreparserExtensionLoader(null) }
  const json = async file => JSON.parse(await readFile(path.join(root, file), 'utf8'))
  const artwork = await json('progetti/slide/data/card-artwork.json'), local = await json('progetti/slide/data/card-artwork-local.json')
  const mappings = { ...artwork.mappings, ...local.mappings }, assets = { ...artwork.assets, ...local.assets }
  const cardFamily = { 'presentazione-corso': 'course', 'brief-progetto': 'brief', introduzione: 'introduction', 'storia-design': 'history' }
  const components = new Map()
  async function componentAssets(name, seen = new Set()) {
    if (seen.has(name)) return []
    if (components.has(name)) return components.get(name)
    let text
    try { text = await readFile(path.join(root, 'progetti/slide/components', `${name}.vue`), 'utf8') }
    catch (error) { if (error.code === 'ENOENT') return []; throw error }
    const result = imagePaths(text), next = new Set([...seen, name])
    for (const [, child] of text.matchAll(/<([A-Z][\w]+)\b/g)) result.push(...await componentAssets(child, next))
    // These two components select images from their own data rather than Markdown.
    if (name === 'ProjectGallery') result.push(...(await json('progetti/slide/data/projects.json')).map(project => project.image))
    if (name === 'UxProcessMap') {
      for (const id of ['introduction-goals', 'introduction-research', 'introduction-workflow', 'introduction-structure', 'introduction-testing']) result.push(artwork.thematicAssets[id])
    }
    components.set(name, result)
    return result
  }
  const inventory = new Map(lessonDecks.filter(deck => mode !== 'build' || !deck.localOnly).map(deck => [deck.id, { images: new Set(), slides: [] }]))
  for (const slide of source.slides) {
    const owner = slide.frontmatter.lesson ?? 'presentazione-corso', entry = inventory.get(owner)
    const images = new Set(imagePaths(slide.content))
    if (slide.frontmatter.exerciseNumber) {
      const number = String(slide.frontmatter.exerciseNumber).padStart(2, '0')
      const data = await json(`progetti/slide/data/esercitazioni/${number}.json`)
      function collect(value) {
        if (!value || typeof value !== 'object') return
        if (typeof value.src === 'string' && value.src.startsWith('/images/')) images.add(value.src)
        Object.values(value).filter(item => item && typeof item === 'object').forEach(collect)
      }
      collect(data[slide.frontmatter.lessonSlide - 1].blocks)
    }
    for (const [, name] of slide.content.matchAll(/<([A-Z][\w]+)\b/g)) for (const image of await componentAssets(name)) images.add(image)
    for (const [, title] of slide.content.matchAll(/<CvediCard\b[^>]*\btitle="([^"]+)"/g)) {
      const id = mappings[cardFamily[owner] || owner]?.[normalizeTitle(title)]
      if (id) images.add(assets[id])
    }
    for (const image of images) entry.images.add(decodeURIComponent(image))
    entry.slides.push({ no: entry.slides.length + 1, images: images.size })
  }
  return inventory
}
