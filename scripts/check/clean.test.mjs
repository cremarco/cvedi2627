import assert from 'node:assert/strict'
import { access, mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { cleanProject } from '../clean.mjs'

test('preserves sources and referenced evidence while cleaning output and empty directories', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'cvedi-clean-'))
  const fixtures = {
    'assets/manifest.json': '{"verification":"../reports/evidence/verification.json"}',
    'README.md': 'Risultati: reports/reference-group/ e reports/empty-parent/evidence/',
    'reports/evidence/verification.json': '{"passed":true}',
    'reports/evidence/unused.png': 'old screenshot',
    'reports/reference-group/result.json': '{}',
    'reports/unused/large.png': 'old screenshot',
    'public/images/original.webp': 'source image',
    'materiali/original.pdf': 'source document',
    'dist/index.html': 'build',
    '.slidev/decks-dev.json': '{"mode":"dev"}',
    'output/pdf/draft.pdf': 'export',
    'slides-export/1.png': 'export',
    '.impeccable/config.json': '{}',
    '.impeccable/review/old.png': 'review',
    'progetti/obsolete/.DS_Store': 'metadata',
    'node_modules/package/.DS_Store': 'dependency metadata',
  }
  try {
    for (const [file, content] of Object.entries(fixtures)) {
      await mkdir(path.dirname(path.join(root, file)), { recursive: true })
      await writeFile(path.join(root, file), content)
    }
    await mkdir(path.join(root, 'reports/empty-parent/evidence'), { recursive: true })
    await symlink(path.join(root, 'materiali'), path.join(root, 'reports/source-link'))
    const preview = await cleanProject(root, { dryRun: true, keepDev: true })
    assert.ok(preview.removedPaths.includes('progetti'))
    for (const [file, content] of Object.entries(fixtures)) assert.equal(await readFile(path.join(root, file), 'utf8'), content)
    const result = await cleanProject(root, { keepDev: true })
    assert.deepEqual(result.removedPaths, preview.removedPaths)
    assert.equal(result.removedBytes, preview.removedBytes)
    for (const file of ['assets/manifest.json', 'reports/evidence/verification.json', 'reports/reference-group/result.json', 'public/images/original.webp', 'materiali/original.pdf', '.impeccable/config.json', 'node_modules/package/.DS_Store'])
      assert.equal(await readFile(path.join(root, file), 'utf8'), fixtures[file])
    await access(path.join(root, 'reports/empty-parent/evidence'))
    assert.equal(await readFile(path.join(root, '.slidev/decks-dev.json'), 'utf8'), fixtures['.slidev/decks-dev.json'])
    for (const file of ['dist', 'output', 'slides-export', 'progetti', 'reports/unused', 'reports/evidence/unused.png', 'reports/source-link', '.impeccable/review'])
      await assert.rejects(readFile(path.join(root, file)), { code: 'ENOENT' })
    assert.deepEqual((await cleanProject(root, { keepDev: true })).removedPaths, [])
    assert.ok((await cleanProject(root)).removedPaths.includes('.slidev'))
  } finally { await rm(root, { recursive: true, force: true }) }
})
