import { createRequire } from 'node:module'
import { realpath } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

/** Read current slide identities for focused browser checks. Structural and
 * asset validation remains the responsibility of check:source. */
export async function loadSlideDeck() {
  const root = fileURLToPath(new URL('../..', import.meta.url))
  const require = createRequire(await realpath(new URL('../../node_modules/@slidev/cli/package.json', import.meta.url)))
  const { load } = await import(require.resolve('@slidev/parser/fs'))
  return load({ roots: [root], userRoot: root, allowedRoots: [root] }, `${root}/slides.md`)
}
