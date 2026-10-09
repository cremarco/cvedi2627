import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))

export async function copyCourseHome(destination) {
  const geometry = JSON.parse(await readFile(path.join(root, 'assets/metro-map/geometric-animation.json'), 'utf8'))
  const fields = geometry.lanes.filter(route => route.family === 'blue')
  const routes = geometry.lanes.filter(route => route.family !== 'blue')
  // Compress the authored choreography as one entrance, preserving its order.
  const arrivalEnd = Math.max(...routes.map(route => parseFloat(route.delay) + parseFloat(route.duration)))
  const entranceTime = time => `${Math.round(parseFloat(time) * 1100 / arrivalEnd)}ms`
  const backgrounds = fields.map((field, index) => `<path class="metro-field" data-field="${field.id}" d="${field.fillD}" fill="${field.color}" stroke="none" style="--field-delay:${index * 80}ms"/>`).join('')
    + '<rect class="metro-field" data-field="campo-giallo" x="340" y="215" width="405" height="370" rx="22" fill="#F5F3D7" stroke="none" style="--field-delay:160ms"/>'
  const packetRoutes = new Map(routes.filter((_, index) => index % 3 === 0).map((route, index) => [route.id, index]))
  const families = [...new Set(routes.map(route => route.family))].map(family => {
    const familyRoutes = routes.filter(route => route.family === family)
    const tracks = familyRoutes.map(route => `<path class="metro-track" d="${route.d}" stroke="${route.color}" stroke-width="${route.width}" fill="none"/>`).join('')
    const lines = familyRoutes.map(route => `<path class="metro-route" data-route="${route.id}" d="${route.d}" stroke="${route.color}" stroke-width="${route.width}" fill="none" pathLength="1000" style="--route-delay:${entranceTime(route.delay)};--route-duration:${entranceTime(route.duration)}"/>`).join('')
    const packets = familyRoutes.filter(route => packetRoutes.has(route.id)).map(route => {
      const index = packetRoutes.get(route.id)
      return `<path class="metro-packet" data-route="${route.id}" d="${route.d}" stroke="white" stroke-width="5" fill="none" pathLength="1000" stroke-dasharray="22 978" style="--route-duration:${12 + index}s;--packet-delay:-${index * 1.9}s"/>`
    }).join('')
    return `<g class="metro-family" data-family="${family}">${tracks}${lines}${packets}</g>`
  }).join('')
  const dotEnd = Math.max(...geometry.dots.map(dot => parseFloat(dot.delay)))
  const dots = geometry.dots.map(dot => `<circle class="metro-dot" cx="${dot.cx}" cy="${dot.cy}" r="3.5" fill="#F0B100" stroke="none" style="--dot-delay:${Math.round(parseFloat(dot.delay) * 1020 / dotEnd)}ms"/>`).join('')
  const map = `<svg class="metro-map" viewBox="0 0 1741 903" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect class="metro-paper" width="1741" height="903" fill="white" stroke="none"/><g class="metro-fields">${backgrounds}</g><g stroke-linecap="round" stroke-linejoin="round">${families}</g><g class="metro-dots">${dots}</g></svg>`
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
