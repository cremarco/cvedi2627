import artwork from '../data/card-artwork.json'

const catalog = artwork as { mappings: Record<string, Record<string, string>>; assets: Record<string, string> }

export function thematicArtwork(id: string) {
  return catalog.assets[id]
}

export function cardArtwork(lesson: string, title: string) {
  const palette = ({ 'presentazione-corso': 'course', 'brief-progetto': 'brief', introduzione: 'introduction' } as Record<string, string>)[lesson]
  if (!palette) return undefined
  const key = title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, '').replace(/^(?:\d+|[a-z])\s*[·.]\s*/i, '').trim().toLowerCase()
  const id = catalog.mappings[palette]?.[key]
  return id ? catalog.assets[id] : undefined
}
