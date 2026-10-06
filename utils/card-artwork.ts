import artwork from '../data/card-artwork.json'
import { slideSet } from './slide-sets'
import { normalizeTitle } from './normalize-title.mjs'

const catalog = artwork as {
  mappings: Record<string, Record<string, string | null>>
  assets: Record<string, string>
  thematicAssets: Record<string, string>
}

export function thematicArtwork(id: string) {
  return catalog.thematicAssets[id]
}

export function cardArtwork(lesson: string, title: string) {
  const palette = slideSet(lesson).artworkPalette
  if (!palette) return undefined
  const key = normalizeTitle(title)
  const id = catalog.mappings[palette]?.[key]
  return id ? catalog.assets[id] : undefined
}
