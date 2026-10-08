import { cp, mkdir, readFile, readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { webDesignExamplesDirectory, webDesignExamplesSource } from '../../utils/web-design-examples.mjs'

/** Copy the site's runtime dependency graph, retaining original assets in source. */
export async function copyWebDesignExamples(destination) {
  const source = webDesignExamplesSource
  const styles = JSON.parse(await readFile(path.join(source, 'stili.json'), 'utf8')).styles
  const pending = ['index.html', 'menu.html', 'locale.html', 'contatti.html',
    ...styles.map(style => `styles/${style.id}.css`),
    // Historical GIFs choose their animated or still file at runtime.
    ...['coffee-steam.gif', 'new.gif', 'coffee-still.png', 'new-still.png', 'gif-provenance.json']
      .map(name => 'assets/redesign/historical/' + name)]
  const files = new Set()
  for (const name of await readdir(path.join(source, 'assets/licenses')))
    pending.push('assets/licenses/' + name)

  function reference(value, owner) {
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return
    const pathname = decodeURIComponent(value.split(/[?#]/)[0])
    const relative = path.posix.normalize(path.posix.join(path.posix.dirname(owner), pathname))
    if (relative.startsWith('../') || path.isAbsolute(relative))
      throw new Error(`Example resource escapes its site: ${owner} → ${value}`)
    pending.push(relative)
  }

  while (pending.length) {
    const name = pending.pop()
    if (files.has(name)) continue
    const location = path.join(source, name)
    if ((await stat(location)).isDirectory()) {
      for (const child of await readdir(location)) pending.push(path.posix.join(name, child))
      continue
    }
    files.add(name)
    if (/\.(?:html|css|js)$/.test(name)) {
      const text = await readFile(location, 'utf8')
      if (name.endsWith('.html')) {
        for (const match of text.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) reference(match[1], name)
      } else if (name.endsWith('.css')) {
        for (const match of text.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) reference(match[1], name)
      } else if (name !== 'immagini.js') {
        // immagini.js also registers archived sets. Active image sources are
        // embedded in stili.js; its material set is shared with the conversation.
        for (const match of text.matchAll(/["'`](assets\/[^"'`\s]*[^/])["'`]/g)) reference(match[1], name)
      }
    }
    // Preserve per-asset provenance alongside the published resource when present.
    if (/\.(?:webp|png|jpe?g|gif|svg|woff2?)$/.test(name)) {
      const sidecars = [name + '.json', path.posix.join(path.posix.dirname(name), `provenance-${path.parse(name).name}.json`)]
      for (const sidecar of sidecars) {
        try { if ((await stat(path.join(source, sidecar))).isFile()) pending.push(sidecar) }
        catch (error) { if (error.code !== 'ENOENT') throw error }
      }
    }
  }
  await rm(destination, { recursive: true, force: true })
  let bytes = 0
  for (const name of files) {
    const target = path.join(destination, name)
    await mkdir(path.dirname(target), { recursive: true })
    await cp(path.join(source, name), target)
    bytes += (await stat(target)).size
  }
  console.log(`Web design examples: ${files.size} files, ${(bytes / 1e6).toFixed(2)} MB`)
  return { files: files.size, bytes }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await copyWebDesignExamples(path.resolve(process.argv[2] || 'dist', webDesignExamplesDirectory))
