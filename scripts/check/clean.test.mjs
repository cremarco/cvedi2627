import assert from 'node:assert/strict'
import { access, mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { cleanProject } from '../clean.mjs'

async function fixture(root, files) {
  for (const [file, content] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true })
    await writeFile(path.join(root, file), content)
  }
}

test('removes only known output and bytecode while preserving all evidence and originals', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'cvedi-clean-'))
  const keep = {
    'reports/unreferenced/result.json': '{"passed":true}',
    'reports/unreferenced/screenshot.png': 'evidence',
    'reports/__pycache__/evidence.pyc': 'retained evidence',
    'progetti/booklet/build/verifiche/regression.pdf': 'verification artifact',
    'progetti/booklet/build/anteprime/source.typ': 'unknown source',
    'progetti/booklet/build/anteprime/custom.pdf': 'unknown PDF',
    'progetti/booklet/assets/original.pdf': 'original',
    'progetti/slide/public/images/original.webp': 'source image',
    'progetti/slide/assets/audio/lezione-composizione/original.mp3': 'original audio',
    'risorse-condivise/immagini/manifest.json': '{}',
    'materiali/original.pdf': 'source document',
    'progetti/ilmeteo/archive/previous.html': 'archive',
    '.impeccable/config.json': '{}',
    '.impeccable/review/check.json': 'verification',
    '.impeccable/critique/screenshot.png': 'evidence',
    'progetti/ilmeteo/.impeccable/mocks/prompt.txt': 'original prompt',
    'progetti/booklet/scripts/__pycache__/notes.md': 'unknown file',
    'scripts/build/generator.mjs': 'source tool',
    'node_modules/package/code.js': 'installed dependency',
  }
  const generated = {
    '_site/index.html': 'published copy',
    'progetti/slide/dist/index.html': 'build',
    'progetti/slide/public/images/shared/copy.png': 'mirror',
    'progetti/slide/public/audio/lezione-griglie/clip.mp3': 'mirror',
    'progetti/slide/public/audio/lezione-composizione/clip.mp3': 'mirror',
    'progetti/booklet/main.pdf': 'old compiled volume',
    'progetti/booklet/build/booklet.pdf': 'compiled volume',
    'progetti/booklet/build/anteprime/07-griglia.pdf': 'compiled chapter',
    '.impeccable/hook.cache.json': 'cache',
    'scripts/build/__pycache__/generator.cpython-310.pyc': 'bytecode',
    'progetti/booklet/scripts/__pycache__/runner.pyc': 'bytecode',
  }
  try {
    await fixture(root, { ...keep, ...generated })
    const preview = await cleanProject(root, { dryRun: true })
    for (const [file, content] of Object.entries({ ...keep, ...generated }))
      assert.equal(await readFile(path.join(root, file), 'utf8'), content)
    const result = await cleanProject(root)
    assert.deepEqual(result, { ...preview, dryRun: false })
    for (const [file, content] of Object.entries(keep)) assert.equal(await readFile(path.join(root, file), 'utf8'), content)
    for (const file of Object.keys(generated)) await assert.rejects(access(path.join(root, file)), { code: 'ENOENT' })
    assert.deepEqual((await cleanProject(root)).removedPaths, [])
    assert.ok(result.preservedReports.includes('reports'))
  } finally { await rm(root, { recursive: true, force: true }) }
})

test('keep-dev preserves the Slidev catalog and local runtime caches', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'cvedi-clean-dev-'))
  const caches = {
    'progetti/slide/.slidev/decks-dev.json': '{}',
    'progetti/slide/node_modules/.slidev/virtual.ts': 'virtual module',
    'progetti/slide/node_modules/.vite-temp/config.mjs': 'transformed configuration',
    'progetti/slide/public/images/shared/runtime.png': 'preview image',
    'progetti/slide/public/audio/lezione-griglie/runtime.mp3': 'preview audio',
    'progetti/slide/public/audio/lezione-composizione/runtime.mp3': 'preview audio',
  }
  try {
    await fixture(root, { ...caches, 'progetti/slide/dist/index.html': 'build' })
    await cleanProject(root, { keepDev: true })
    for (const [file, content] of Object.entries(caches)) assert.equal(await readFile(path.join(root, file), 'utf8'), content)
    await cleanProject(root)
    for (const file of Object.keys(caches)) await assert.rejects(access(path.join(root, file)), { code: 'ENOENT' })
  } finally { await rm(root, { recursive: true, force: true }) }
})

test('never follows a symbolic-link project directory into source data', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'cvedi-clean-link-'))
  const outside = await mkdtemp(path.join(tmpdir(), 'cvedi-clean-outside-'))
  try {
    await fixture(outside, { 'dist/original.txt': 'source outside the project', 'scripts/__pycache__/tool.pyc': 'outside bytecode' })
    await mkdir(path.join(root, 'progetti'), { recursive: true })
    await symlink(outside, path.join(root, 'progetti/slide'))
    const result = await cleanProject(root)
    assert.ok(result.skippedSymlinks.includes('progetti/slide'))
    assert.equal(await readFile(path.join(outside, 'dist/original.txt'), 'utf8'), 'source outside the project')
    assert.equal(await readFile(path.join(outside, 'scripts/__pycache__/tool.pyc'), 'utf8'), 'outside bytecode')
  } finally { await rm(root, { recursive: true, force: true }); await rm(outside, { recursive: true, force: true }) }
})
