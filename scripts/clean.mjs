import { rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

// Fixed project-local outputs only. Source slides, media and archive stay intact.
for (const directory of ['dist', '_site', '.slidev', 'reports']) {
  await rm(fileURLToPath(new URL(`../${directory}`, import.meta.url)), { recursive: true, force: true })
}
