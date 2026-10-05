#!/usr/bin/env node
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto')
const {optimize}=require('/tmp/cvedi-pages-tools/node_modules/svgo/dist/svgo-node.cjs')
const sharp=require('/tmp/cvedi-pages-tools/node_modules/sharp')
const root=path.resolve('progetti'),work='/tmp/cvedi-pages-svg-candidates',report=path.resolve('reports/pages-2026-09-30/svg.jsonl')
sharp.concurrency(1);sharp.cache(false)
async function walk(dir){let files=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())files.push(...await walk(p));else if(e.isFile()&&e.name.endsWith('.svg'))files.push(p)}return files}
const plugins=['removeDoctype','removeXMLProcInst','removeComments','removeMetadata','removeEditorsNSData','cleanupAttrs',{name:'convertPathData',params:{floatPrecision:8,applyTransforms:false}},{name:'cleanupNumericValues',params:{floatPrecision:8,applyTransforms:false}}]
async function render(data){return sharp(Buffer.from(data),{limitInputPixels:160e6}).resize({width:512,height:512,fit:'inside'}).ensureAlpha().raw().toBuffer({resolveWithObject:true})}
async function main(){await fs.mkdir(work,{recursive:true});await fs.writeFile(report,'');let saved=0,n=0
for(const p of await walk(root)){const source=await fs.readFile(p);if(source.length<5000 || /<(?:animate|set|script)\b|onload\s*=/i.test(source.toString()))continue
let row={path:path.relative(root,p),oldBytes:source.length,status:'kept'}
try{const output=optimize(source.toString('utf8'),{plugins}).data
if(Buffer.byteLength(output)<source.length*.95){
const before=await render(source),after=await render(output)
if(before.info.width===after.info.width&&before.info.height===after.info.height&&before.data.equals(after.data)){
const candidate=path.join(work,`${n++}.svg`);await fs.writeFile(candidate,output)
row={...row,status:'candidate',newBytes:Buffer.byteLength(output),sha256:crypto.createHash('sha256').update(source).digest('hex'),candidate};saved+=source.length-row.newBytes
}else row.status='render_difference_kept'
}}catch(e){row.status='kept';row.reason=e.message.slice(0,100)}
await fs.appendFile(report,JSON.stringify(row)+'\n')
}
console.log(n,'pixel-identical SVG candidates,',saved,'bytes saved')}
main().catch(e=>{console.error(e);process.exit(1)})
