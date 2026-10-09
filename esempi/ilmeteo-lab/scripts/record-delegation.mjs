import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=JSON.parse(await fs.readFile(path.join(root,'.impeccable/mocks/decision/model-pick.json'),'utf8'));
await fs.writeFile(path.join(root,'.impeccable/mocks/compositions/a.json'),JSON.stringify({...source,approved:true,approval:{kind:'explicit-user-delegation',userText:'sceti tu e prosegui',date:'2026-10-09',selectedBy:'assistant',rationale:'Chronological working surface; correct captured data, local/national scope separated; complete details retained.'},productionExceptions:['Authentic original logo/map instead of generative approximations.','Original raster resolution retained, no invented detail.','Source/date caption replaces preview-reconstruction caption.']},null,2));
for(const name of ['b','c']){
 const data=JSON.parse(await fs.readFile(path.join(root,`.impeccable/mocks/compositions/${name}.json`),'utf8'));
 await fs.writeFile(path.join(root,`.impeccable/mocks/compositions/${name}.prompt.txt`),data.prompt);
}
const checkpoint=JSON.parse(await fs.readFile(path.join(root,'.impeccable/checkpoint.json'),'utf8'));
checkpoint.status='building-delegated-direction';
checkpoint.selected={direction:'Previsioni lungo la giornata',kind:'pick',seed:'5c8270c7',comp:'.impeccable/mocks/compositions/a.png',buildPath:'comp',userDelegation:'sceti tu e prosegui',delegatedAt:'2026-10-09'};
checkpoint.waitingAudit={resolved:true,reason:'Explicit human delegation of direction and composition on9Oct2026'};
checkpoint.pending=checkpoint.pending.filter(x=>!x.includes('approval or explicit delegation'));
await fs.writeFile(path.join(root,'.impeccable/checkpoint.json'),JSON.stringify(checkpoint,null,2));
console.log('Explicit delegation recorded; composition A chosen; source facts remain authoritative.');
