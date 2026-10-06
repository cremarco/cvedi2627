interface SlideSet {
  id: string
  label: string
  palette: string
  lessonNumber?: number
  artworkPalette?: string
}

/** One identity for palette, chapter labels and generated card artwork. */
export const slideSets: Record<string, SlideSet> = {
  apertura: { id: 'apertura', label: 'CVeDI 2026/27', palette: 'opening' },
  'presentazione-corso': { id: 'presentazione-corso', label: 'Lezione 01', palette: 'course', lessonNumber: 1, artworkPalette: 'course' },
  'brief-progetto': { id: 'brief-progetto', label: 'Brief di progetto', palette: 'brief', artworkPalette: 'brief' },
  approfondimenti: { id: 'approfondimenti', label: 'Approfondimenti', palette: 'research' },
  introduzione: { id: 'introduzione', label: 'Lezione 02', palette: 'introduction', lessonNumber: 2, artworkPalette: 'introduction' },
  'storia-design': { id: 'storia-design', label: 'Lezione 03', palette: 'history', lessonNumber: 3 },
  'design-thinking': { id: 'design-thinking', label: 'Design Thinking', palette: 'design-thinking', lessonNumber: 4 },
  'lean-ux': { id: 'lean-ux', label: 'Lean UX', palette: 'lean-ux', lessonNumber: 5 },
  conclusioni: { id: 'conclusioni', label: 'Conclusioni', palette: 'conclusions', lessonNumber: 6 },
}

export function slideSet(lesson: unknown): SlideSet {
  const id = String(lesson ?? 'presentazione-corso')
  return Object.hasOwn(slideSets, id) ? slideSets[id] : slideSets['presentazione-corso']
}

export function slideSetStyle(set: SlideSet) {
  const token = (role: string) => `var(--cvedi-${set.palette}-${role})`
  return {
    '--section-primary': token('base'),
    '--section-primary-deep': token('canvas'),
    '--section-track': token('deep'),
    '--section-accent': token('accent'),
    '--section-accent-soft': token('accent-light'),
    '--section-accent-on-dark': token('accent-vivid'),
    // Compatibility roles for existing geometric components and lesson layouts.
    '--lesson-color': token('base'),
    '--lesson-canvas': token('canvas'),
    '--lesson-color-deep': token('deep'),
    '--lesson-accent': token('accent'),
    '--lesson-accent-on-color': token('accent-vivid'),
  }
}
