import { spawn } from 'node:child_process'
import { createServer, connect } from 'node:net'
import { request } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { lessonDeck, lessonDecks } from './lesson-decks.mjs'
import { legacyRedirectScript } from '../scripts/build/lesson-decks.mjs'
const root = fileURLToPath(new URL('../', import.meta.url))
const cli = fileURLToPath(new URL('../../../node_modules/@slidev/cli/bin/slidev.mjs', import.meta.url))

/** Start a lesson's Vite process only when its page is requested. */
export function lessonDecksDevPlugin() {
  const children = new Map(), pending = new Map()
  const stop = () => { for (const child of children.values()) child.kill('SIGTERM') }
  const match = url => /^\/lezioni\/([a-z0-9-]+)(?:\/|$)/.exec(url || '')
  async function start(id) {
    lessonDeck(id)
    if (id === 'apertura') throw new Error('The menu is served at the root URL')
    if (pending.has(id)) return pending.get(id)
    const ready = (async () => {
      const reserve = createServer()
      await new Promise(resolve => reserve.listen(0, '127.0.0.1', resolve))
      const port = reserve.address().port
      await new Promise(resolve => reserve.close(resolve))
      const child = spawn(process.execPath, [cli, '--port', String(port), '--base', `/lezioni/${id}/`], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, CVEDI_DECK: id, VITE_CVEDI_DECK: id, VITE_CVEDI_MENU_BASE: '/' } })
      children.set(id, child)
      let failure = '', exited = false
      child.stderr.on('data', data => { failure = (failure + data).slice(-3000) })
      child.stdout.on('data', () => {})
      child.on('error', error => { exited = true; failure = error.message })
      child.on('exit', () => { exited = true; children.delete(id); pending.delete(id) })
      const until = Date.now() + 60_000
      while (Date.now() < until) {
        if (exited) throw new Error(`${id}: ${failure}`)
        try { const res = await fetch(`http://localhost:${port}/lezioni/${id}/`, { signal: AbortSignal.timeout(800) }); if (res.ok) return port }
        catch {}
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      child.kill('SIGTERM'); throw new Error(`${id}: preview startup timed out`)
    })()
    pending.set(id, ready)
    try { return await ready } catch (error) { pending.delete(id); throw error }
  }
  return {
    name: 'cvedi-independent-lesson-previews',
    apply: 'serve',
    enforce: 'pre',
    async configureServer(server) {
      if (process.env.CVEDI_DECK !== 'apertura') return
      const redirect = process.env.CVEDI_DECK_ROUTES
        ? `<script id="cvedi-deck-redirect">${legacyRedirectScript(JSON.parse(await readFile(process.env.CVEDI_DECK_ROUTES, 'utf8')), '/')}</script>`
        : ''
      server.middlewares.use(async (req, res, next) => {
        const metadataPath = /^\/__slidev\/slides\/\d+\.json(?:\?|$)/.test(req.url || '')
        const metadata = req.method === 'GET' && metadataPath
        let found = match(req.url)
        // Slidev fetches note metadata from an absolute URL. Select the same
        // lesson as the referring page. Never let a child editor write to
        // the menu through that same absolute URL.
        if (metadataPath) {
          res.setHeader('Cache-Control', 'no-store')
          res.setHeader('Vary', 'Referer')
          try {
            const referer = new URL(req.headers.referer)
            if (referer.host === req.headers.host) found = match(referer.pathname)
          } catch {}
          if (found && req.method !== 'GET') {
            res.writeHead(405, { Allow: 'GET', 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Le note delle lezioni sono gestite nei rispettivi sorgenti.')
            return
          }
        }
        if (!found) {
          // Slidev serves its own HTML without Vite's transformIndexHtml hook.
          // Intercept only the menu response, leaving examples and assets alone.
          if (redirect && /^\/(?:index\.html)?(?:\?|$)/.test(req.url || '')) {
            const end = res.end.bind(res)
            res.end = (body, ...args) => {
              if (typeof body === 'string' && String(res.getHeader('Content-Type')).includes('text/html')) {
                body = body.replace('<head>', `<head>${redirect}`)
                res.removeHeader('Content-Length')
              }
              return end(body, ...args)
            }
          }
          return next()
        }
        if (!lessonDecks.some(deck => deck.id === found[1])) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
          res.end('Presentazione non disponibile.')
          return
        }
        try {
          const port = await start(found[1])
          const upstream = request({ hostname: 'localhost', port, path: req.url, method: req.method, headers: { ...req.headers, host: `localhost:${port}` } }, incoming => {
            const headers = { ...incoming.headers }
            if (metadata) {
              headers['cache-control'] = 'no-store'
              headers.vary = [...new Set([...(headers.vary || '').split(',').map(value => value.trim()).filter(Boolean), 'Referer'])].join(', ')
            }
            res.writeHead(incoming.statusCode || 502, headers); incoming.pipe(res)
          })
          upstream.on('error', error => { res.writeHead(502); res.end(error.message) })
          req.pipe(upstream)
        } catch (error) { res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(String(error)) }
      })
      server.httpServer?.on('upgrade', async (req, socket, head) => {
        const found = match(req.url)
        if (!found) return
        if (!lessonDecks.some(deck => deck.id === found[1])) { socket.destroy(); return }
        try {
          const port = await start(found[1])
          const upstream = connect(port, 'localhost', () => {
            const headers = { ...req.headers, host: `localhost:${port}` }
            upstream.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n${Object.entries(headers).map(([k,v]) => `${k}: ${v}`).join('\r\n')}\r\n\r\n`)
            if (head.length) upstream.write(head)
            socket.pipe(upstream).pipe(socket)
          })
          upstream.on('error', () => socket.destroy()); socket.on('error', () => upstream.destroy())
        } catch { socket.destroy() }
      })
      server.httpServer?.once('close', stop)
      process.once('exit', stop)
    },
  }
}
