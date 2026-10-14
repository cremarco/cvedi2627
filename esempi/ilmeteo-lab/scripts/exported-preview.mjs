import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { realpathSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { copyIlmeteo } from '../../../scripts/build/ilmeteo.mjs';

/** Every browser check uses the same isolated Pages export and an available port. */
export async function createExportedPreview() {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'ilmeteo-preview-'));
  let server;
  try {
    await copyIlmeteo(path.join(directory, 'ilmeteo'));
    const require = createRequire(realpathSync(new URL('../../../node_modules/@slidev/cli/package.json', import.meta.url)));
    const serve = require('sirv')(directory, { dev: true });
    server = createServer((request, response) => {
      request.url = request.url.replace(/^\/cvedi2627\//, '/');
      serve(request, response, () => response.writeHead(404).end());
    });
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
  } catch (error) {
    if (server?.listening) await new Promise(resolve => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
    throw error;
  }
  const base = `http://127.0.0.1:${server.address().port}/cvedi2627/ilmeteo/`;
  return {
    base,
    url: base + 'redesign/index.html',
    async close() {
      await new Promise(resolve => server.close(resolve));
      await rm(directory, { recursive: true, force: true });
    },
  };
}
