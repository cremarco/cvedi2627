import hsv from '../assets/booklet/colore-schemi-slide/native/ruota-hsv.svg?raw'
import ryb from '../assets/booklet/colore-schemi-slide/native/ruota-ryb.svg?raw'
import monocromatico from '../assets/booklet/colore-schemi-slide/native/schema-monocromatico.svg?raw'
import analogo from '../assets/booklet/colore-schemi-slide/native/schema-analogo.svg?raw'
import complementare from '../assets/booklet/colore-schemi-slide/native/schema-complementare.svg?raw'
import divergente from '../assets/booklet/colore-schemi-slide/native/schema-complementare-divergente.svg?raw'
import triadico from '../assets/booklet/colore-schemi-slide/native/schema-triadico.svg?raw'

// Animate the retained native vectors without changing their colors, positions,
// radii or paths. Only timing attributes are added to these trusted local SVGs.
function sequence(source: string, offset = 0) {
  let circleIndex = 0
  let selectionIndex = 0
  return source.replace(/<circle\b[^>]*\/>/g, circle => {
    const index = circleIndex++
    const radius = Number(circle.match(/\br="([^"]+)"/)?.[1])
    const swatch = index >= 12
    if (!swatch && radius < 10) return circle
    const delay = offset + (swatch ? .65 + (index - 12) * .25 : .25 + selectionIndex++ * .3)
    const initialScale = radius > 15 ? 7.15 / radius : 5.57375 / radius
    return circle.replace('<circle', `<circle class="wheel-${swatch ? 'swatch' : 'selection'}" style="--wheel-delay:${delay}s;--wheel-initial-scale:${initialScale}"`)
  }).replace(/<path\b/g, `<path class="wheel-link" pathLength="1" style="--wheel-delay:${offset + 1.1}s"`)
}

const comparison = `<svg viewBox="0 0 363 214.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="wheel-labels" fill="#030712" font-family="Nunito Sans, sans-serif" font-size="8" font-weight="600">
    <text x="0" y="9">RGB / HSV</text><text x="191.5" y="9">RYB · TRADIZIONALE</text>
    <text x="0" y="201.5">Rosso e ciano: opposti</text><text x="0" y="212.5">Primari RGB: rosso, verde, blu.</text>
    <text x="191.5" y="201.5">Rosso e verde: opposti</text><text x="191.5" y="212.5">Primari RYB: rosso, giallo, blu.</text>
  </g>
  ${sequence(hsv).replace('<svg ', '<svg x="0" y="16" ')}
  ${sequence(ryb, .2).replace('<svg ', '<svg x="191.5" y="16" ')}
</svg>`

export const colorWheels = {
  confronto: comparison,
  monocromatico: sequence(monocromatico),
  analogo: sequence(analogo),
  complementare: sequence(complementare),
  divergente: sequence(divergente),
  triadico: sequence(triadico),
}

export type ColorWheelVariant = keyof typeof colorWheels
