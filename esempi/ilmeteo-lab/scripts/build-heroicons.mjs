import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('../assets/controls/heroicons/', import.meta.url));
export async function buildHeroiconCatalog() {
  const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8'));
  const icons = {};
  for (const entry of manifest.icons) {
    const svg = (await fs.readFile(path.join(directory, entry.original), 'utf8')).trim();
    icons[entry.name] = svg.replace('<svg ', `<svg focusable="false" data-heroicon="${entry.name}" `);
  }
  await fs.writeFile(path.join(directory, 'catalog.js'), `/* Generated from official Heroicons ${manifest.version}; MIT. See manifest.json and LICENSE.txt. */\nwindow.ILMETEO_HEROICONS = Object.freeze(${JSON.stringify(icons, null, 2)});\n`);
}
