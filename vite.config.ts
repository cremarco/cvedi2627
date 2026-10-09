import { rm } from 'node:fs/promises'
import path from 'node:path'
import { localAssetDirectories } from './utils/publication.mjs'
import { webDesignExamplesPlugin } from './utils/web-design-examples.mjs'
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
    },
  }
}

export default {
  plugins: [
    localAssetsPlugin(),
    webDesignExamplesPlugin(),
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
