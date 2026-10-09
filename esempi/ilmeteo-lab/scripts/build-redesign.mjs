import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildVersionNavigation } from './version-navigation.mjs';

const lab = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.resolve(lab, '../..');
const compiler = path.join(workspace, 'node_modules/@tailwindcss/cli/dist/index.mjs');
for (const [source, output] of [['redesign/style.source.css', 'redesign/style.css'], ['version-nav.source.css', 'version-nav.css']]) {
  const result = spawnSync(process.execPath, [compiler, '-i', path.join(lab, source), '-o', path.join(lab, output), '--minify'], { cwd: workspace, stdio: 'inherit' });
  if (result.status !== 0) throw result.error || new Error(`CSS build failed: ${source}`);
}
// HTML is authored directly. Rebuild only the shared, idempotent switch.
await buildVersionNavigation();
console.log('iLMeteo: current redesign styles and six version switches built.');
