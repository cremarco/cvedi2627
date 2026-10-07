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
  'storia-design': { id: 'storia-design', label: 'Lezione 03', palette: 'history', lessonNumber: 3, artworkPalette: 'history' },
  'ricerca-inclusiva': { id: 'ricerca-inclusiva', label: 'Lezione 04', palette: 'ux-research', lessonNumber: 4, artworkPalette: 'ricerca-inclusiva' },
  'percezione-gerarchia': { id: 'percezione-gerarchia', label: 'Lezione 05', palette: 'ux-perception', lessonNumber: 5, artworkPalette: 'percezione-gerarchia' },
  colore: { id: 'colore', label: 'Lezione 06', palette: 'ux-color', lessonNumber: 6, artworkPalette: 'colore' },
  'tipografia-griglie': { id: 'tipografia-griglie', label: 'Lezione 07', palette: 'ux-type', lessonNumber: 7, artworkPalette: 'tipografia-griglie' },
  'prototipi-interfacce': { id: 'prototipi-interfacce', label: 'Lezione 08', palette: 'ux-prototype', lessonNumber: 8, artworkPalette: 'prototipi-interfacce' },
  'test-implementazione': { id: 'test-implementazione', label: 'Lezione 09', palette: 'ux-test', lessonNumber: 9, artworkPalette: 'test-implementazione' },
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
