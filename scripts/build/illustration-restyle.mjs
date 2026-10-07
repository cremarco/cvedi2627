import { readFile, writeFile, mkdir, copyFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSlideDeck } from '../check/deck.mjs'
import { normalizeTitle } from '../../utils/normalize-title.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))
const readJSON = async file => JSON.parse(await readFile(path.join(root, file), 'utf8'))
const output = 'assets/theme-imagegen/manifest-outline-v3.json'
try {
  await access(path.join(root, output))
  throw new Error('The outline manifest already exists. Resume its pending jobs; do not reset recorded generations or reviews.')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
const existing = await readJSON('assets/theme-imagegen/manifest-v1.json')
const cards = await readJSON('assets/theme-imagegen/manifest-cards-v2.json')
const artwork = await readJSON('data/card-artwork.json')
const deck = await loadSlideDeck()
const tokens = await readFile(path.join(root, 'styles/tokens.css'), 'utf8')
const values = Object.fromEntries([...tokens.matchAll(/(--cvedi-[\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2]]))

function resolve(name) {
  const value = values[name]
  if (!value) throw new Error(`Missing palette token ${name}`)
  if (value.startsWith('var(')) return resolve(value.slice(4, -1))
  const m = value.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/)
  if (!m) throw new Error(`Unsupported color ${name}: ${value}`)
  const L = Number(m[1]) / 100, C = Number(m[2]), h = Number(m[3]) * Math.PI / 180
  const a = C * Math.cos(h), b = C * Math.sin(h)
  const l = (L + .3963377774 * a + .2158037573 * b) ** 3
  const n = (L - .1055613458 * a - .0638541728 * b) ** 3
  const s = (L - .0894841775 * a - 1.291485548 * b) ** 3
  const rgb = [4.0767416621 * l - 3.3077115913 * n + .2309699292 * s, -1.2684380046 * l + 2.6097574011 * n - .3413193965 * s, -.0041960863 * l - .7034186147 * n + 1.707614701 * s]
  return '#' + rgb.map(v => Math.round(255 * Math.max(0, Math.min(1, v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055)))).map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

const paletteNames = { course: 'red', introduction: 'orange', brief: 'amber', research: 'yellow', opening: 'indigo' }
const palettes = Object.fromEntries(Object.entries(paletteNames).map(([id, family]) => [id, {
  family, primary: resolve(`--cvedi-${family}-800`), outline: resolve(`--cvedi-${family}-950`),
  light: resolve(`--cvedi-${family}-100`), mid: resolve(`--cvedi-${family}-200`),
  accent: resolve(`--cvedi-${family}-accent`), accentLight: resolve(`--cvedi-${family}-accent-light`),
  accentVivid: resolve(`--cvedi-${family}-accent-vivid`),
}]))

const styleReferences = [
  'assets/theme-imagegen/originals/intro-example-signifier-v1.png',
  'assets/theme-imagegen/originals/intro-example-mapping-v1.png',
  'assets/theme-imagegen/originals/intro-example-feedback-v1.png',
]
const approvedPreview = 'assets/theme-imagegen/style-references/outline-approved-preview.png'
await mkdir(path.join(root, 'assets/theme-imagegen/style-references'), { recursive: true })
await copyFile('/Users/marco/.codex/generated_images/01a11310-83d8-75c2-bdb5-8a8e02af5177/exec-1486a13f-04f7-40dd-8520-987961c12451.png', path.join(root, approvedPreview))

const owners = (src, group, id) => deck.slides.filter(slide => {
  if (slide.content.includes(src)) return true
  if (id === 'renewal-materials') return /<RenewalMaterials\b/.test(slide.content)
  if (id === 'syllabus-update') return /<SyllabusSticker\b/.test(slide.content)
  if (group === 'thematic') return /<UxProcessMap\b/.test(slide.content)
  if (group === 'card') {
    const p = { 'presentazione-corso': 'course', 'brief-progetto': 'brief', introduzione: 'introduction' }[slide.frontmatter.lesson ?? 'presentazione-corso']
    return [...slide.content.matchAll(/<CvediCard\b[^>]*title="([^"]+)"/g)].some(m => artwork.mappings[p]?.[normalizeTitle(m[1])] === id)
  }
  return false
}).map(slide => ({ page: slide.index + 1, title: slide.title, lesson: slide.frontmatter.lesson ?? 'presentazione-corso', alias: slide.frontmatter.routeAlias ?? null }))

const jobs = []
function add(source, group, key = source.id) {
  const id = group === 'thematic' ? `${source.id}-map` : source.id
  const oldPublic = '/' + source.web.replace(/^public\//, '')
  const uses = owners(oldPublic, group, key)
  if (!uses.length) throw new Error(`Illustration has no slide owner: ${id}`)
  const palette = source.id === 'renewal-materials' ? 'opening' : source.palette
  const directory = group === 'card' ? 'cards' : group === 'thematic' ? 'process' : 'figures'
  jobs.push({ id, group, key, palette, paletteColors: palettes[palette], subject: source.subject ?? '',
    previous: { original: source.original, web: source.web, prompt: source.prompt },
    original: `assets/theme-imagegen/originals/${id}-v3.png`,
    web: `public/images/generated/theme-2026/${directory}/${id}-v3.webp`,
    owners: uses, status: 'pending', styleReferences, approvedPreview,
    visualReview: { status: 'pending' }, slideReview: { status: 'pending' },
  })
}
for (const job of cards.jobs) add(job, 'card')
for (const [key, src] of Object.entries(artwork.thematicAssets)) {
  const source = existing.jobs.find(job => '/' + job.web.replace(/^public\//, '') === src)
  if (!source) throw new Error(`Thematic source missing: ${key}`)
  add(source, 'thematic', key)
}
for (const job of existing.jobs.filter(job => job.kind === 'teaching-figure')) add(job, 'figure')
const manifest = { version: '2026-10-07-outline-v3', mode: 'built-in image_gen',
  style: 'rounded dark contours, clear pale fills and restrained illustrative depth',
  rights: 'Original illustrations generated for CVeDI with OpenAI ImageGen. Previous PNGs, source references and prompts retained.',
  paletteAuthority: 'DESIGN.md and styles/tokens.css', palettes, approvedPreview,
  counts: { images: jobs.length, cardMotifs: 7, processFigures: 5, teachingFigures: 32 }, jobs }
await writeFile(path.join(root, output), JSON.stringify(manifest, null, 2) + '\n')
console.log(JSON.stringify({ manifest: output, counts: manifest.counts, palettes, affectedSlides: [...new Set(jobs.flatMap(job => job.owners.map(owner => owner.page)))].sort((a, b) => a - b) }, null, 2))
