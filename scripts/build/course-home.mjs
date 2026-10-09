import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))

export async function copyCourseHome(destination) {
  const geometry = JSON.parse(await readFile(path.join(root, 'assets/metro-map/geometric-animation.json'), 'utf8'))
  const routes = geometry.lanes.filter(route => route.family !== 'blue')
  const tracks = routes.map(route => `<path class="metro-track" d="${route.d}" stroke="${route.color}" stroke-width="${route.width}" fill="none"/>`).join('')
  const lines = routes.map((route, index) => `<path class="metro-route" d="${route.d}" stroke="${route.color}" stroke-width="${route.width}" fill="none" pathLength="1000" style="--route-delay:${index * 45}ms"/>`).join('')
  const packets = routes.filter((_, index) => index % 3 === 0).map((route, index) => `<path class="metro-packet" d="${route.d}" stroke="white" stroke-width="5" fill="none" pathLength="1000" stroke-dasharray="22 978" style="--route-duration:${12 + index}s;--packet-delay:-${index * 1.9}s"/>`).join('')
  const map = `<svg viewBox="0 0 1741 903" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><g stroke-linecap="round" stroke-linejoin="round">${tracks}${lines}${packets}</g></svg>`
  const html = (await readFile(path.join(root, 'home/index.html'), 'utf8')).replace('<!-- metro-map -->', map)
  const assets = path.join(destination, 'home-assets')
  await mkdir(path.join(assets, 'fonts'), { recursive: true })
  await writeFile(path.join(destination, 'index.html'), html)
  for (const file of ['home.css', 'home.js']) await cp(path.join(root, 'home', file), path.join(assets, file))
  for (const weight of [400, 700]) await cp(path.join(root, 'node_modules/@fontsource/inter/files', `inter-latin-${weight}-normal.woff2`), path.join(assets, 'fonts', `inter-${weight}.woff2`))
  await cp(path.join(root, 'node_modules/@fontsource/inter/LICENSE'), path.join(assets, 'fonts/INTER-LICENSE.txt'))
  console.log('Course home: original metro geometry, local fonts and four destinations.')
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await copyCourseHome(path.resolve(process.argv[2] || '_site'))
