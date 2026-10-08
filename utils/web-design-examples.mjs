import { realpathSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

export const webDesignExamplesDirectory = 'web-design-examples'
export const webDesignExamplesSource = fileURLToPath(new URL('../esempi/caffe-luce/', import.meta.url))

/** Serve the independent example site before Slidev's application fallback. */
export function webDesignExamplesPlugin() {
  const require = createRequire(realpathSync(new URL('../node_modules/@slidev/cli/package.json', import.meta.url)))
  const sirv = require('sirv')
  return {
    name: 'cvedi-web-design-examples',
    configureServer(server) {
      const prefix = '/' + webDesignExamplesDirectory
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url, 'http://localhost')
        if (url.pathname !== prefix) return next()
        response.writeHead(308, { Location: prefix + '/' + url.search })
        response.end()
      })
      const serve = sirv(webDesignExamplesSource, { dev: true, etag: true })
      server.middlewares.use(prefix, (request, response) => {
        serve(request, response, () => {
          response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
          response.end('Not found')
        })
      })
    },
  }
}
