#!/usr/bin/env node
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto')
const sharp=require('/tmp/cvedi-pages-tools/node_modules/sharp'),{ssim}=require('/tmp/cvedi-pages-tools/node_modules/ssim.js')
const root=path.resolve('progetti'),work='/tmp/cvedi-pages-svg-raster-candidates',report=path.resolve('reports/pages-2026-09-30/svg-rasters.jsonl')
sharp.concurrency(1);sharp.cache(false)
const imageURI=/data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=\s]+?)(?=["'])/gi
async function walk(dir){let out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.isFile()&&e.name.endsWith('.svg'))out.push(p)}return out}
async function render(s){return sharp(Buffer.from(s),{limitInputPixels:160e6}).resize({width:1024,height:1024,fit:'inside',withoutEnlargement:true}).ensureAlpha().raw().toBuffer({resolveWithObject:true})}
function psnr(a,b){let e=0;for(let i=0;i<a.data.length;i++)e+=(a.data[i]-b.data[i])**2;return e?10*Math.log10(65025/(e/a.data.length)):99}
async function main(){await fs.mkdir(work,{recursive:true});await fs.writeFile(report,'');let saved=0,count=0
for(const source of await walk(root)){
let row={path:path.relative(root,source),status:'kept'}
try{const text=await fs.readFile(source,'utf8'),matches=[...text.matchAll(imageURI)];if(!matches.length)continue
const view=text.match(/viewBox\s*=\s*["']([\d.\s,-]+)["']/i);const dims=view?view[1].trim().split(/[\s,]+/).map(Number).slice(2):[512,512]
const maximum=Math.min(3840,Math.max(1024,Math.ceil(Math.max(...dims)*2)))
let updated=text,replacements=[]
for(const match of matches){const data=Buffer.from(match[2].replace(/\s/g,''),'base64');if(data.length<50000)continue
const meta=await sharp(data,{limitInputPixels:160e6}).metadata();if((meta.pages||1)>1||(meta.orientation||1)>1)continue
if(Math.max(meta.width,meta.height)<=maximum)continue
const pipeline=sharp(data,{limitInputPixels:160e6}).keepIccProfile().resize({width:maximum,height:maximum,fit:'inside',withoutEnlargement:true,fastShrinkOnLoad:false})
const output=await pipeline.webp({quality:97,effort:5,alphaQuality:100}).toBuffer()
if(output.length>=data.length*.85)continue
const nextURI='data:image/webp;base64,'+output.toString('base64');updated=updated.replace(match[0],()=>nextURI);replacements.push({before:match[0],after:nextURI})
}
if(!replacements.length)continue
const before=await render(text),after=await render(updated)
if(before.info.width!==after.info.width||before.info.height!==after.info.height)continue
const score=psnr(before,after),structural=ssim({data:before.data,width:before.info.width,height:before.info.height},{data:after.data,width:after.info.width,height:after.info.height}).mssim
if(score>=40&&structural>=.999){const candidate=path.join(work,`${count++}.json`);await fs.writeFile(candidate,JSON.stringify(replacements));const oldBytes=Buffer.byteLength(text),newBytes=Buffer.byteLength(updated);saved+=oldBytes-newBytes;row={...row,status:'candidate',oldBytes,newBytes,psnr:score,ssim:structural,replacements:candidate};console.log(count,(saved/1e6).toFixed(2),'MB',row.path)}
}catch(e){row.error=e.message.slice(0,100)}
await fs.appendFile(report,JSON.stringify(row)+'\n')
}
console.log(count,'SVG raster candidates',saved,'bytes saved')}
main().catch(e=>{console.error(e);process.exit(1)})
