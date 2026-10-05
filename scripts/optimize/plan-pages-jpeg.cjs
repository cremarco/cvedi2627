#!/usr/bin/env node
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto')
const sharp=require('/tmp/cvedi-pages-tools/node_modules/sharp'),{ssim}=require('/tmp/cvedi-pages-tools/node_modules/ssim.js')
const root=path.resolve('progetti'),work='/tmp/cvedi-pages-jpeg-candidates',report=path.resolve('reports/pages-2026-09-30/jpeg.jsonl')
sharp.concurrency(1);sharp.cache(false)
async function walk(dir){let out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.isFile()&&/\.jpe?g$/i.test(e.name))out.push(p)}return out}
async function pixels(p,maximum,dimensions){const geo=dimensions?{width:dimensions.width,height:dimensions.height,fit:'fill'}:{width:maximum,height:maximum,fit:'inside',withoutEnlargement:true};return sharp(p,{limitInputPixels:160e6}).resize({...geo,fastShrinkOnLoad:false}).toColourspace('srgb').ensureAlpha().raw().toBuffer({resolveWithObject:true})}
function psnr(a,b){let err=0;for(let i=0;i<a.data.length;i+=4)for(let c=0;c<3;c++)err+=(a.data[i+c]-b.data[i+c])**2;return err?10*Math.log10(65025/(err/(a.data.length/4*3))):99}
async function main(){await fs.mkdir(work,{recursive:true});await fs.writeFile(report,'');const files=(await walk(root)).filter(p=>!path.basename(p).startsWith('screenshot'));let next=0,accepted=0,saved=0
async function worker(){while(next<files.length){const index=next++,source=files[index];let row={path:path.relative(root,source),status:'kept'}
try{const data=await fs.readFile(source);if(data.length<100000)continue;const meta=await sharp(data,{limitInputPixels:160e6}).metadata();if((meta.orientation||1)>1)continue
const ratio=Math.max(meta.width/meta.height,meta.height/meta.width);const detailed=/map|mapp|timeline|chart|schema|diagram|planimetr|cartina/i.test(source)
const maximum=detailed||ratio>3?Math.max(meta.width,meta.height):2400
const reference=await pixels(data,maximum),display=await pixels(data,1280)
for(const quality of [93,97]){const candidate=path.join(work,`${index}.jpg`)
await sharp(data,{limitInputPixels:160e6}).keepIccProfile().resize({width:maximum,height:maximum,fit:'inside',withoutEnlargement:true,fastShrinkOnLoad:false}).jpeg({quality,mozjpeg:true,chromaSubsampling:'4:4:4'}).toFile(candidate)
const newBytes=(await fs.stat(candidate)).size
if(newBytes>=data.length*.88){await fs.rm(candidate);continue}
const after=await pixels(candidate,maximum,reference.info),native=psnr(reference,after);if(native<38){await fs.rm(candidate);continue}
const rendered=await pixels(candidate,1280,display.info),displayPsnr=psnr(display,rendered)
const displaySsim=ssim({data:display.data,width:display.info.width,height:display.info.height},{data:rendered.data,width:rendered.info.width,height:rendered.info.height}).mssim
if(displayPsnr<43&&(displayPsnr<28||displaySsim<.995)){await fs.rm(candidate);continue}
row={...row,status:'candidate',oldBytes:data.length,newBytes,quality,nativePsnr:native,displayPsnr,displaySsim,width:after.info.width,height:after.info.height,sourceWidth:meta.width,sourceHeight:meta.height,sha256:crypto.createHash('sha256').update(data).digest('hex'),candidate};accepted++;saved+=data.length-newBytes;break
}}catch(e){row.error=e.message}
await fs.appendFile(report,JSON.stringify(row)+'\n')
if(index%50===0)console.log(index,'/',files.length,accepted,'candidates,',(saved/1e6).toFixed(1),'MB saved')
}}
await Promise.all([worker(),worker()]);console.log(accepted,'JPEG candidates;',saved,'bytes saved')}
main().catch(e=>{console.error(e);process.exit(1)})
