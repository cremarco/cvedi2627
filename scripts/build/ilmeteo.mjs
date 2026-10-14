import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { getIlmeteoPublicFiles, ilmeteoSource } from '../../utils/ilmeteo.mjs';

/** Export both versions and local assets, excluding acquisition and authoring files. */
export async function copyIlmeteo(destination) {
  await mkdir(destination, { recursive: true });
  const files = getIlmeteoPublicFiles();
  for (const file of files) {
    const target = path.join(destination, file);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(path.join(ilmeteoSource, file), target);
  }
  console.log(`iLMeteo: ${files.length} public files exported; authoring assets remain in the source project.`);
}
