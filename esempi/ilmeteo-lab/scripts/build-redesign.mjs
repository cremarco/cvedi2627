import fs from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {shell} from './redesign-lib.mjs';
import {h} from './redesign-lib.mjs';
import {buildVersionNavigation} from './version-navigation.mjs';
import {loadMilano, buildMilano} from './redesign-milano.mjs';
import {weatherIconCells} from './redesign-icons.mjs';
import * as pages from './redesign-pages.mjs';
import {sharedServices} from './redesign-secondary.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ctx={window:{}};
vm.runInNewContext(await fs.readFile(path.join(root,'redesign/data.js'),'utf8'),ctx);
const d=ctx.window.ILMETEO_DATA;
d.milano=await loadMilano(root);
const runtime={brand:{weatherSymbols:d.brand.weatherSymbols,weatherIconCells},milano:d.milano,home:{mapFamilies:d.home.mapFamilies.map(({id,label,maps})=>({id,label,maps:maps.map(({id,label})=>({id,label}))}))}};
await fs.writeFile(path.join(root,'redesign/runtime.js'),'/* Derived local UI data; original source/provenance retained in data/milano.json and data.js. */\nwindow.ILMETEO_DATA='+JSON.stringify(runtime)+';\n');
await buildMilano(root,d);
const services=sharedServices(d,h);
for(const [file,title,body] of [['index','Previsioni meteo',pages.home(d,h)],['domani','Meteo Italia · 9 ottobre',pages.domani(d,h)]]) {
 await fs.writeFile(path.join(root,'redesign',file+'.html'),shell(d,file==='index'?'home':file,title,body,services));
}
const redirect='<!doctype html><html lang="it"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=milano.html"><title>Meteo Milano</title><script>location.replace("milano.html");</script></head><body><a href="milano.html">Apri Milano</a></body></html>';
for(const version of ['originale','redesign']) await fs.writeFile(path.join(root,version,'bologna.html'),redirect);
await buildVersionNavigation();
console.log('Built redesign: Milano, Home, Domani');
