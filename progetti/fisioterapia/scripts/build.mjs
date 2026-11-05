import { spawnSync } from 'node:child_process'
import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const root=fileURLToPath(new URL('../',import.meta.url))
const repo=fileURLToPath(new URL('../../../',import.meta.url))
const css=spawnSync(process.execPath,[path.join(repo,'node_modules/@tailwindcss/cli/dist/index.mjs'),'-i',path.join(root,'styles/site.source.css'),'-o',path.join(root,'styles/site.css'),'--minify'],{cwd:repo,stdio:'inherit'})
if(css.status!==0)process.exit(css.status||1)
const output=path.join(root,'dist')
await rm(output,{recursive:true,force:true})
await mkdir(path.join(output,'styles'),{recursive:true})
for(const file of ['index.html','app.js','favicon.svg'])await cp(path.join(root,file),path.join(output,file))
for(const dir of ['assets/images','assets/fonts','data'])await cp(path.join(root,dir),path.join(output,dir),{recursive:true})
await cp(path.join(root,'styles/site.css'),path.join(output,'styles/site.css'))
await writeFile(path.join(output,'robots.txt'),'User-agent: *\nDisallow: /\n')
console.log('Passo: sito autonomo compilato in progetti/fisioterapia/dist/')
