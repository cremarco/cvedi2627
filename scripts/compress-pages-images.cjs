#!/usr/bin/env node
// One-time media optimization. Tools are isolated from the published archive.
const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require(process.env.SHARP_MODULE || '/tmp/cvedi-pages-tools/node_modules/sharp')
const { ssim } = require(process.env.SSIM_MODULE || '/tmp/cvedi-pages-tools/node_modules/ssim.js')
const root = path.resolve('progetti')
const work = '/tmp/cvedi-pages-image-candidates'
const report = path.resolve(process.env.IMAGE_REPORT || 'reports/pages-2026-09-30/images.jsonl')
sharp.cache(false)
sharp.concurrency(1)
const extensions = new Set(process.env.IMAGE_PHOTO_PASS ? ['.webp','.jpg','.jpeg','.avif'] : ['.webp','.jpg','.jpeg','.png','.avif'])
const textExtensions = new Set(['.html', '.htm', '.css', '.js', '.json', '.svg', '.xml'])
async function walk(dir) {
  const files = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const location = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(location))
    else if (entry.isFile()) files.push(location)
  }
  return files
}
function psnr(a,b) {
  if (a.info.width !== b.info.width || a.info.height !== b.info.height) return 0
  let rgbError = 0, alphaError = 0
  for (let i = 0; i < a.data.length; i += 4) {
    alphaError += (a.data[i+3] - b.data[i+3]) ** 2
    const alpha = a.data[i+3] / 255
    for (let c = 0; c < 3; c++) rgbError += ((a.data[i+c] - b.data[i+c]) * alpha) ** 2
  }
  const pixels = a.data.length / 4
  return Math.min(rgbError ? 10*Math.log10(65025/(rgbError/(pixels*3))) : 99,
    alphaError ? 10*Math.log10(65025/(alphaError/pixels)) : 99)
}
async function pixels(source, maximum, dimensions) {
  const geometry = dimensions ? { width:dimensions.width, height:dimensions.height, fit:'fill' }
    : { width:maximum, height:maximum, fit:'inside', withoutEnlargement:true }
  return sharp(source, { limitInputPixels: 160e6 }).resize({ ...geometry,
    fastShrinkOnLoad:false }).toColourspace('srgb')
    .ensureAlpha().raw().toBuffer({ resolveWithObject:true })
}
async function optimize(source, sequence) {
  const size = (await fs.stat(source)).size
  const ext = path.extname(source).toLowerCase()
  const result = { path:path.relative(root,source), oldBytes:size, status:'kept' }
  if (size < Number(process.env.IMAGE_MIN_BYTES || 100000)) return result
  try {
    const meta = await sharp(source, { limitInputPixels:160e6 }).metadata()
    if ((meta.pages || 1) > 1 || (meta.orientation || 1) > 1) return { ...result, status:'animation_or_orientation_kept' }
    // Leave detailed maps, diagrams and narrow panoramas at their supplied resolution.
    const detailed = /map|mapp|timeline|chart|schema|diagram|planimetr|cartina/i.test(path.basename(source))
    const ratio = Math.max(meta.width/meta.height,meta.height/meta.width)
    const maximum = (ext === '.png' && meta.hasAlpha) || detailed || ratio > 3
      ? Math.max(meta.width,meta.height) : Number(process.env.IMAGE_MAX_EDGE || 2400)
    if(process.env.IMAGE_ONLY_OVERSIZED && (Math.max(meta.width,meta.height)<=maximum || detailed || ratio>3 || (ext==='.png'&&meta.hasAlpha)))return result
    const reference = await pixels(source,maximum)
    const displayReference = await pixels(source,Math.min(1280,maximum))
    for (const [format,quality] of (process.env.IMAGE_PHOTO_PASS ? [['webp',85],['avif',75]] : [['webp',90],['webp',95],['avif',85],['avif',90]])) {
      const candidate = path.join(work,`${sequence}.${format}`)
      let pipeline = sharp(source,{limitInputPixels:160e6}).resize({width:maximum,height:maximum,
        fit:'inside',withoutEnlargement:true,fastShrinkOnLoad:false}).keepIccProfile()
      pipeline = format === 'webp' ? pipeline.webp({quality,effort:5,alphaQuality:100})
        : pipeline.avif({quality,effort:4,chromaSubsampling:'4:4:4'})
      await pipeline.toFile(candidate)
      const newSize = (await fs.stat(candidate)).size
      if (newSize >= size * .88 || size-newSize < 10000) { await fs.rm(candidate); continue }
      const encoded = await pixels(candidate,maximum,reference.info)
      const nativeScore = psnr(reference,encoded)
      if (nativeScore < Number(process.env.IMAGE_MIN_PSNR || 38)) { await fs.rm(candidate); continue }
      const displayCandidate = await pixels(candidate,Math.min(1280,maximum),displayReference.info)
      const displayScore = psnr(displayReference,displayCandidate)
      // Successive resampling can change fine texture while retaining its appearance.
      const displaySsim = displayScore >= 43 ? null : ssim(
        { data:displayReference.data, width:displayReference.info.width, height:displayReference.info.height },
        { data:displayCandidate.data, width:displayCandidate.info.width, height:displayCandidate.info.height },
      ).mssim
      if (displayScore < 43 && (displayScore < 28 || displaySsim < .995)) { await fs.rm(candidate); continue }
      return { ...result,status:'candidate',newBytes:newSize,format,quality,
        sourceWidth:meta.width,sourceHeight:meta.height,width:encoded.info.width,height:encoded.info.height,
        nativePsnr:nativeScore,displayPsnr:displayScore,displaySsim,candidate }
    }
  } catch(error) { result.error=error.message }
  return result
}
async function main() {
  await fs.mkdir(work,{recursive:true});await fs.writeFile(report,'')
  let sequence=0,totalSaved=0,accepted=0
  for (const year of (await fs.readdir(root)).filter(n=>n.startsWith('a.a.')).sort()) {
    for (const siteName of await fs.readdir(path.join(root,year))) {
      const site = path.join(root,year,siteName)
      if (!(await fs.stat(site)).isDirectory()) continue
      const files = await walk(site)
      const texts = files.filter(p=>textExtensions.has(path.extname(p).toLowerCase()))
      const textData = new Map(await Promise.all(texts.map(async p=>[p,await fs.readFile(p,'utf8')])))
      const haystack = [...textData.values()].join('\n')
      const groups = new Map()
      for (const file of files.filter(p=>extensions.has(path.extname(p).toLowerCase()))) {
        const name=path.basename(file)
        if(!groups.has(name))groups.set(name,[])
        groups.get(name).push(file)
      }
      const pending = [...groups].filter(([name,files])=>name !== 'screenshot.webp' && (name.endsWith('.webp') || haystack.includes(name) || haystack.includes(encodeURI(name))))
      // Process independent image groups concurrently, apply text changes afterwards.
      const results=[];let next=0
      async function worker(){while(next<pending.length){const [name,group]=pending[next++];const converted=[]
        for(const source of group)converted.push(await optimize(source,sequence++))
        if(converted.every(r=>r.status==='candidate') && new Set(converted.map(r=>r.format)).size===1
          && (converted[0].format==='webp' || haystack.includes(name) || haystack.includes(encodeURI(name)))){
          const format=converted[0].format
          const targetName=path.extname(name).toLowerCase()==='.'+format?name:name.replace(/\.pages\.(?:webp|avif)$/,'')+'.pages.'+format
          if(group.every(source=>source===path.join(path.dirname(source),targetName)||!files.includes(path.join(path.dirname(source),targetName)))){
            for(const r of converted){const source=path.join(root,r.path);const target=path.join(path.dirname(source),targetName)
              await fs.copyFile(r.candidate,target);if(target!==source)await fs.unlink(source)
              totalSaved+=r.oldBytes-r.newBytes;accepted++;r.status='replaced';r.target=path.relative(root,target)
            }
            results.push({name,targetName,converted});continue
          }
        }
        for(const r of converted){if(r.status==='candidate')r.status='group_kept';if(r.candidate)await fs.rm(r.candidate,{force:true})}
        results.push({name,converted})
      }}
      await Promise.all([worker(),worker(),worker()])
      for(const {name,targetName,converted} of results){
        if(targetName && targetName!==name){
          for(const [p,data] of textData){let updated=data
            for(const [a,b] of new Map([[name,targetName],[encodeURI(name),encodeURI(targetName)],[encodeURIComponent(name),encodeURIComponent(targetName)]])){
              const pattern=new RegExp('(?<![A-Za-z0-9_.-])'+a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![A-Za-z0-9_.-])','g')
              updated=updated.replace(pattern,()=>b)
            }
            textData.set(p,updated)
          }
        }
        for(const row of converted){delete row.candidate;await fs.appendFile(report,JSON.stringify(row)+'\n')}
      }
      for(const [p,data] of textData){let output=data.replace(/<(?:source|link)\b[^>]*>/gi,tag=>tag.includes('.pages.')?tag.replace(/\s+type\s*=\s*(?:"image\/[^" ]+"|'image\/[^' ]+'|image\/[^\s>]+)/gi,''):tag);if(output!==await fs.readFile(p,'utf8'))await fs.writeFile(p,output)}
      console.log(`${year}/${siteName}: ${accepted} accepted, ${(totalSaved/1e6).toFixed(1)} MB saved`)
    }
  }
}
main().catch(e=>{console.error(e);process.exit(1)})
