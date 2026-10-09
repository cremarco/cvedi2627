import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.impeccable/mocks/decision');
if (process.argv.includes('--prepare')) {
  const metadata = JSON.parse(await fs.readFile(path.join(dir,'model-pick.prompt.json'),'utf8'));
  if (typeof metadata.prompt !== 'string') throw new Error('Exact prompt missing');
  await fs.writeFile(path.join(dir,'model-pick.prompt.txt'),metadata.prompt);
} else {
  for (const name of ['assigned','model-pick','challenger-console','canon']) {
    const image = await fs.readFile(path.join(dir,name+'.png'));
    const promptFile = name==='assigned' ? name+'.refinement.prompt.txt' : name+'.prompt.txt';
    const prompt = await fs.readFile(path.join(dir,promptFile),'utf8');
    const provenancePath = path.join(dir,name+'.provenance.json');
    const provenance = JSON.parse(await fs.readFile(provenancePath,'utf8'));
    const sha256 = crypto.createHash('sha256').update(image).digest('hex');
    let offset=8, embedded=false;
    while (offset+12<=image.length) {
      const length=image.readUInt32BE(offset), type=image.toString('ascii',offset+4,offset+8);
      if (type==='tEXt' && image.toString('utf8',offset+8,offset+8+length).startsWith('impeccable:prompt\0')) embedded=true;
      offset+=length+12;
    }
    const final = {...provenance,sha256,bytes:image.length,prompt,approved:false,kind:'decision-preview',embeddedPromptVerified:embedded};
    if (name==='challenger-console') final.copyPreservesOriginalPNGBytes=false;
    await fs.writeFile(path.join(dir,name+'.json'),JSON.stringify(final,null,2)+'\n');
    await fs.writeFile(provenancePath,JSON.stringify({...provenance,finalImageSha256:sha256,finalBytes:image.length,embeddedPromptVerified:embedded},null,2)+'\n');
  }
  console.log('Four decision-comp sidecars saved; none implies user approval.');
}
