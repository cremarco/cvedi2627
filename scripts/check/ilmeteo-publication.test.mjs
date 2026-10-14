import assert from 'node:assert/strict';
import { test } from 'node:test';
import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { copyIlmeteo } from '../build/ilmeteo.mjs';
import { getIlmeteoPublicFiles, isIlmeteoRuntimePath } from '../../utils/ilmeteo.mjs';
import { collectLocalResources } from '../../utils/ilmeteo-assets.mjs';

test('Legacy CSS comment wrappers keep active assets while HTML comments stay excluded', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'ilmeteo-resources-'));
  try {
    await mkdir(path.join(directory, 'assets'));
    await writeFile(path.join(directory, 'assets/rating.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    await writeFile(path.join(directory, 'index.html'), '<style><!-- .rating {background:url("assets/rating.svg")} //--></style><!-- <img src="assets/unused.png"> -->');
    assert.deepEqual(collectLocalResources(directory, ['index.html']), ['assets/rating.svg', 'index.html']);
  } finally { await rm(directory, {recursive:true, force:true}); }
});

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
    const expected = getIlmeteoPublicFiles();
    async function walk(directory, prefix = '') {
      const entries = await readdir(directory, { withFileTypes: true });
      return (await Promise.all(entries.map(entry => entry.isDirectory()
        ? walk(path.join(directory, entry.name), prefix + entry.name + '/')
        : prefix + entry.name))).flat();
    }
    assert.deepEqual((await walk(destination)).sort(), expected, 'export contains exactly the reachable resources and declared dynamic assets');
    for (const file of ['assets/advertising/campaign-v4/booklet-mobile-v4.webp', 'assets/maps/leaflet-weather/radar-6.svg', 'assets/controls/heroicons/LICENSE.txt']) {
      assert(expected.includes(file), `${file}: responsive, dynamic and license assets stay available`);
    }
    for (const file of ['assets/maps/forecast-v3/sources/ne_50m_admin_0_countries.geojson', 'assets/advertising/campaign-v4/booklet-billboard-v4.png', 'assets/vendor/leaflet/leaflet.css']) {
      assert.equal(isIlmeteoRuntimePath(file), false, `${file}: authoring-only asset is not public`);
      await assert.rejects(access(path.join(destination, file)));
    }
  } finally { await rm(destination, { recursive: true, force: true }); }
});
