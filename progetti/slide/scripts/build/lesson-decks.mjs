import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { readFile, writeFile, mkdir, readdir, rm, cp, realpath } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { lessonDecks, deckDirectory } from '../../utils/lesson-decks.mjs'
import { publicationExtensions, localAssetDirectories } from '../../utils/publication.mjs'
const root = fileURLToPath(new URL('../../../..', import.meta.url))
const slideRoot = fileURLToPath(new URL('../..', import.meta.url))

export async function deckCatalog(mode = 'build') {
  const require = createRequire(await realpath(path.join(root, 'node_modules/@slidev/cli/package.json')))
  const { load, injectPreparserExtensionLoader } = await import(require.resolve('@slidev/parser/fs'))
  injectPreparserExtensionLoader(async (_roots, _headmatter, _file, mode) => publicationExtensions(mode))
  let source
  try { source = await load({ roots: [slideRoot], userRoot: slideRoot, allowedRoots: [root] }, path.join(root, 'progetti/slide/slides.md'), undefined, mode) }
  finally { injectPreparserExtensionLoader(null) }
  const decks = lessonDecks.filter(d => mode !== 'build' || !d.localOnly).map(d => ({ ...d, slides: [] }))
  const legacy = {}
  for (const slide of source.slides) {
    const deck = decks.find(d => d.lesson === (slide.frontmatter.lesson ?? 'presentazione-corso'))
    if (!deck) throw new Error(`No owner for ${slide.title}`)
    const no = deck.slides.length + 1
    const alias = slide.frontmatter.routeAlias
    deck.slides.push({ no, title: slide.title, alias })
    const destination = { deck: deck.id, target: alias || no }
    legacy[String(slide.index + 1)] = destination
    if (alias) legacy[alias] = destination
  }
  return { mode, total: source.slides.length, decks, legacy }
}

export function legacyRedirectScript(catalog, base) {
  return `(()=>{const routes=${JSON.stringify(catalog.legacy)};let redirecting=false;function redirect(){if(redirecting)return;const fragment=decodeURIComponent(location.hash.replace(/^#\\//,'')),parts=fragment.split('?'),segments=parts[0].split('/'),route=routes[segments[0]];if(route&&route.deck!=='apertura'){redirecting=true;location.replace(${JSON.stringify(base)}+'lezioni/'+route.deck+'/#/'+route.target+(segments.length>1?'/'+segments.slice(1).join('/'):'')+(parts.length>1?'?'+parts.slice(1).join('?'):''))}}addEventListener('hashchange',redirect);redirect()})()`
}

async function runBuild(deck, output, base, menuBase) {
  const child = spawn(process.execPath, [path.join(root, 'node_modules/@slidev/cli/bin/slidev.mjs'), 'build', 'slides.md', '--base', base, '--out', output], {
    cwd: slideRoot, stdio: 'inherit', env: { ...process.env, CVEDI_DECK: deck.id, CVEDI_SHARED_ASSETS: '1', VITE_CVEDI_DECK: deck.id, VITE_CVEDI_MENU_BASE: menuBase, VITE_CVEDI_ASSET_BASE: menuBase },
  })
  await new Promise((resolve, reject) => { child.on('error', reject); child.on('exit', code => code === 0 ? resolve() : reject(new Error(`${deck.id}: build failed (${code})`))) })
}

export async function buildLessonDecks(directory, base = '/') {
  const mode = 'build'
  if (!/^\/(?:[^?#\s]*\/)?$/.test(base)) throw new Error('Deck base must start and end with /')
  const output = path.resolve(root, directory)
  const generatedRoots = [path.join(slideRoot, 'dist'), path.join(root, '_site'), path.join(root, 'reports')]
  if (!generatedRoots.some(directory => output === directory || output.startsWith(directory + path.sep))) throw new Error('Deck output must be a generated directory inside this project')
  const catalog = await deckCatalog(mode)
  await rm(output, { recursive: true, force: true }); await mkdir(output, { recursive: true })
  for (const deck of catalog.decks) {
    const destination = path.join(output, deckDirectory(deck.id))
    await runBuild(deck, destination, base + deckDirectory(deck.id), base)
    const index = path.join(destination, 'index.html')
    if (deck.id === 'apertura') await writeFile(index, (await readFile(index, 'utf8')).replace('<head>', `<head><script id="cvedi-deck-redirect">${legacyRedirectScript(catalog, base)}</script>`))
  }
  // Media are copied once for the entire collection, never once per lesson.
  for (const item of await readdir(path.join(root, 'progetti/slide/public'), { withFileTypes: true })) {
    if (item.name === 'index.html' || item.name === 'assets' || item.name === 'lezioni') continue
    await cp(path.join(root, 'progetti/slide/public', item.name), path.join(output, item.name), { recursive: true })
  }
  if (mode === 'build') for (const directory of localAssetDirectories) await rm(path.join(output, directory), { recursive: true, force: true })
  const references = (await Promise.all(catalog.decks.map(async deck => {
    const dir = path.join(output, deckDirectory(deck.id), 'assets')
    return (await Promise.all((await readdir(dir)).filter(f => /\.(?:js|css)$/.test(f)).map(f => readFile(path.join(dir, f), 'utf8')))).join('\n')
  }))).join('\n')
  async function prune(directory) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name)
      if (item.isDirectory()) await prune(file)
      else if (/\.(?:png|webp|jpe?g|gif|avif|svg)$/i.test(item.name) && !references.includes(item.name)) await rm(file)
    }
  }
  await prune(path.join(output, 'images'))
  await writeFile(path.join(output, 'decks.json'), JSON.stringify(catalog, null, 2) + '\n')
  console.log(`Independent presentations: ${catalog.decks.length}; ${catalog.total} source slides; shared media copied once.`)
  return catalog
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await buildLessonDecks(process.argv[2] || 'progetti/slide/dist', process.env.SLIDEV_BASE || '/')
