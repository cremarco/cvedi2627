import { spawnSync } from 'node:child_process'
import { readdir, rename, rm, stat } from 'node:fs/promises'
import path from 'node:path'

async function filesIn(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await filesIn(location))
    else if (entry.isFile()) files.push({ location, bytes: (await stat(location)).size })
  }
  return files
}

function probe(ffmpeg, location) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-i', location], { encoding: 'utf8' })
  if (result.error) throw new Error(`FFmpeg is required for the Pages media budget: ${result.error.message}`)
  const duration = result.stderr.match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/)
  const dimensions = result.stderr.match(/Video:[^\n]*?\b(\d{2,5})x(\d{2,5})\b/)
  const fps = result.stderr.match(/(\d+(?:\.\d+)?) fps/)
  return {
    duration: duration ? Number(duration[1]) * 3600 + Number(duration[2]) * 60 + Number(duration[3]) : null,
    width: dimensions ? Number(dimensions[1]) : null,
    height: dimensions ? Number(dimensions[2]) : null,
    fps: fps ? Number(fps[1]) : null,
    audio: /Audio:/.test(result.stderr),
    hdr: /smpte2084|arib-std-b67|bt2020/i.test(result.stderr),
  }
}

/** Compress only exported MP4 copies. Source files and public URLs stay intact. */
export async function optimizePagesMedia(directory, targetBytes = 980_000_000) {
  const files = await filesIn(directory)
  const originalBytes = files.reduce((sum, file) => sum + file.bytes, 0)
  let bytes = originalBytes
  const optimized = []
  if (bytes <= targetBytes) return { originalBytes, bytes, optimized }
  const ffmpeg = process.env.PAGES_FFMPEG || 'ffmpeg'
  const videos = files.filter(file => /\.mp4$/i.test(file.location) && file.bytes >= 2_000_000)
    .sort((a, b) => b.bytes - a.bytes)

  for (const video of videos) {
    if (bytes <= targetBytes) break
    const before = probe(ffmpeg, video.location)
    if (!before.width || before.hdr) continue
    const temporary = `${video.location}.pages-optimized.mp4`
    try {
      const result = spawnSync(ffmpeg, [
        '-hide_banner', '-loglevel', 'error', '-nostdin', '-y', '-i', video.location,
        '-map', '0:v:0', '-map', '0:a?', '-map_metadata', '0',
        '-vf', "scale=w='min(1280,iw)':h=-2", '-c:v', 'libx264', '-preset', 'fast',
        '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', temporary,
      ], { encoding: 'utf8' })
      if (result.error || result.status !== 0)
        throw new Error(`Pages video encoding failed: ${result.error?.message || result.stderr}`)
      const nextBytes = (await stat(temporary)).size
      if (nextBytes >= video.bytes) continue
      const after = probe(ffmpeg, temporary)
      if (before.duration === null || after.duration === null || Math.abs(before.duration - after.duration) > .15
        || before.audio !== after.audio || before.fps !== after.fps
        || !after.width || !after.height || Math.abs(before.width / before.height - after.width / after.height) > .005)
        throw new Error(`Pages video duration, audio, frame rate or proportions changed: ${video.location}`)
      await rename(temporary, video.location)
      bytes -= video.bytes - nextBytes
      const entry = { path: path.relative(directory, video.location), originalBytes: video.bytes, bytes: nextBytes,
        duration: after.duration, width: after.width, height: after.height, fps: after.fps, audio: after.audio }
      optimized.push(entry)
      console.log(`Pages media: ${entry.path} · ${(video.bytes / 1e6).toFixed(2)} → ${(nextBytes / 1e6).toFixed(2)} MB`)
    } finally {
      await rm(temporary, { force: true })
    }
  }
  return { originalBytes, bytes, optimized }
}
