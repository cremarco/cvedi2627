import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { ilmeteoRuntimeFiles, ilmeteoSource } from '../../utils/ilmeteo.mjs';

/** Export both versions and local assets, excluding acquisition and authoring files. */
export async function copyIlmeteo(destination) {
  await mkdir(destination, { recursive: true });
  for (const file of ilmeteoRuntimeFiles) {
    const target = path.join(destination, file);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(path.join(ilmeteoSource, file), target);
  }
  await cp(path.join(ilmeteoSource, 'assets'), path.join(destination, 'assets'), {
    recursive: true, filter: file => !path.basename(file).startsWith('.'),
  });
  console.log('iLMeteo: original and current redesign exported with local assets and provenance.');
}
