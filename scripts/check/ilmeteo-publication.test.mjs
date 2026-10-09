import assert from 'node:assert/strict';
import { test } from 'node:test';
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { copyIlmeteo } from '../build/ilmeteo.mjs';
import { isIlmeteoRuntimePath } from '../../utils/ilmeteo.mjs';

test('Pages exports six equivalent pages, switches and all referenced local assets', async () => {
  const destination = await mkdtemp(path.join(os.tmpdir(), 'ilmeteo-export-'));
  try {
    await copyIlmeteo(destination);
    const visited = new Set();
    async function checkResource(file) {
      if (visited.has(file)) return;
      visited.add(file);
      await access(path.join(destination, file));
      if (!/\.(?:html|css)$/.test(file)) return;
      const content = await readFile(path.join(destination, file), 'utf8');
      const source = content.replace(/<!--[\s\S]*?-->/g, '');
      const refs = file.endsWith('.css')
        ? [...source.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)].map(match => match[1])
        : [...source.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1]);
      for (const ref of refs) {
        if (!ref || /^(?:#|data:|https?:|mailto:|tel:|javascript:)/.test(ref)) continue;
        const url = new URL(ref, `https://example.test/cvedi2627/ilmeteo/${file}`);
        assert.ok(url.pathname.startsWith('/cvedi2627/ilmeteo/'), `resource escaped the published base: ${file} → ${ref}`);
        await checkResource(decodeURIComponent(url.pathname.slice('/cvedi2627/ilmeteo/'.length)));
      }
    }
    for (const version of ['originale', 'redesign']) for (const page of ['index', 'milano', 'domani']) {
      const file = `${version}/${page}.html`;
      const html = await readFile(path.join(destination, file), 'utf8');
      const other = version === 'originale' ? 'redesign' : 'originale';
      assert.equal((html.match(/id="ilmeteo-version-nav"/g) || []).length, 1, file);
      assert.ok(html.includes(`href="../${other}/${page}.html" data-version-switch="${other}"`), `${file} switches to its equivalent page`);
      await checkResource(file);
    }
    assert.ok((await readFile(path.join(destination, 'index.html'), 'utf8')).includes('redesign/index.html'));
    for (const file of ['scripts/build-redesign.mjs', 'redesign/style.source.css', 'sources/home.html', '.impeccable/config.json']) {
      assert.equal(isIlmeteoRuntimePath(file), false, `${file} is not public`);
      await assert.rejects(access(path.join(destination, file)));
    }
    assert.equal(isIlmeteoRuntimePath('assets/../../PRODUCT.md'), false);
  } finally { await rm(destination, { recursive: true, force: true }); }
});
