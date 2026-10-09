import { readFile, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { localAssetDirectories, sharedLessonAssetDirectories } from './utils/publication.mjs'
import { webDesignExamplesPlugin } from './utils/web-design-examples.mjs'
import { ilmeteoPlugin } from './utils/ilmeteo.mjs'
import { preventIndexingHTML } from './utils/indexing.mjs'

function localAssetsPlugin() {
  let outputDirectory: string
  return {
    name: 'cvedi-local-assets',
    apply: 'build' as const,
    configResolved(config: { root: string; build: { outDir: string } }) {
      outputDirectory = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
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
  plugins: [
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
