import { readFile, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { lessonDecksDevPlugin } from './utils/lesson-decks-dev.mjs'
import { localAssetDirectories, sharedLessonAssetDirectories } from './utils/publication.mjs'
import { webDesignExamplesPlugin } from './utils/web-design-examples.mjs'
import { ilmeteoPlugin } from './utils/ilmeteo.mjs'
import { preventIndexingHTML } from './utils/indexing.mjs'
import { annotateAcronyms } from './utils/acronyms.mjs'
import { annotateFontNames, catalog as fontPreviews, splitFontNames } from './utils/font-previews.mjs'
import { lessonDecks } from './utils/lesson-decks.mjs'

// A public lesson receives only specimens it actually cites. In particular,
// unpublished lessons must not publish their documentary images through
// the shared inline-help component.
function fontPreviewCatalogPlugin() {
  let selected: Promise<string> | undefined
  const catalogFile = path.resolve('data/font-previews.json')
  return {
    name: 'cvedi-font-preview-catalog',
    apply: 'build' as const,
    enforce: 'pre' as const,
    async load(id: string) {
      if (id.split('?')[0] !== catalogFile) return
      selected ??= (async () => {
        const decks = lessonDecks.filter(deck => process.env.CVEDI_DECK
          ? deck.id === process.env.CVEDI_DECK : !deck.localOnly)
        const files = [...new Set(['slides.md', ...decks.map(deck => deck.file).filter(Boolean)])] as string[]
        const texts = await Promise.all(files.map(file => readFile(path.resolve(file), 'utf8')))
        const ids = new Set(texts.flatMap(text => splitFontNames(text).flatMap(part => part.fontId ? [part.fontId] : [])))
        return JSON.stringify(Object.fromEntries(Object.entries(fontPreviews).filter(([id]) => ids.has(id))))
      })()
      return selected
    },
  }
}

function localAssetsPlugin() {
  let outputDirectory: string
  return {
    name: 'cvedi-local-assets',
    apply: 'build' as const,
    configResolved(config: { root: string; build: { outDir: string } }) {
      outputDirectory = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      if (process.env.CVEDI_SHARED_ASSETS) return
      for (const directory of localAssetDirectories)
        await rm(path.join(outputDirectory, directory), { recursive: true, force: true })
      const bundle = path.join(outputDirectory, 'assets')
      const references = (await Promise.all((await readdir(bundle)).filter(file => /\.(?:js|css)$/.test(file))
        .map(file => readFile(path.join(bundle, file), 'utf8')))).join('\n')
      async function prune(directory: string) {
        for (const entry of await readdir(path.join(outputDirectory, directory), { withFileTypes: true })) {
          const asset = path.posix.join(directory, entry.name)
          if (entry.isDirectory()) await prune(asset)
          else if (!references.includes('/' + asset)) await rm(path.join(outputDirectory, asset))
        }
      }
      for (const directory of sharedLessonAssetDirectories) await prune(directory)
    },
  }
}

export default {
  ...(process.env.CVEDI_SHARED_ASSETS ? {
    build: { copyPublicDir: false },
    experimental: { renderBuiltUrl(filename: string, { type }: { type: string }) {
      if (type === 'public') return `${process.env.VITE_CVEDI_ASSET_BASE}${filename}`
    } },
  } : {}),
  slidev: {
    markdown: { transforms: { after: (html: string) => annotateAcronyms(annotateFontNames(html)) } },
  },
  plugins: [
    fontPreviewCatalogPlugin(),
    lessonDecksDevPlugin(),
    localAssetsPlugin(),
    webDesignExamplesPlugin(),
    ilmeteoPlugin(),
    { name: 'cvedi-noindex', transformIndexHtml: preventIndexingHTML },
  ],
  resolve: {
    alias: {
      // Slidev installs Twoslash even without code blocks. Keep ordinary tooltips
      // without its incompatible FloatingVue Popper patch in this deck.
      '@shikijs/vitepress-twoslash/client': 'floating-vue',
    },
  },
  server: {
    host: 'localhost',
    fs: {
      // Vite rejects ':' in the workspace path before checking fs.allow.
      // Bind to loopback so this local Slidev preview remains private.
      strict: !process.cwd().includes(':'),
    },
  },
}
