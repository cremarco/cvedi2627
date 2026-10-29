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
  gestalt: { id: 'gestalt', label: 'Lezione 06', palette: 'ux-gestalt', lessonNumber: 6, artworkPalette: 'gestalt' },
  colore: { id: 'colore', label: 'Lezione 07', palette: 'ux-color', lessonNumber: 7, artworkPalette: 'colore' },
  'tipografia-griglie': { id: 'tipografia-griglie', label: 'Lezione 08', palette: 'ux-type', lessonNumber: 8, artworkPalette: 'tipografia-griglie' },
  'composizione-gerarchia': { id: 'composizione-gerarchia', label: 'Lezione 10', palette: 'ux-composition', lessonNumber: 10, artworkPalette: 'composizione-gerarchia' },
  'griglie-layout': { id: 'griglie-layout', label: 'Lezione 09', palette: 'ux-grid', lessonNumber: 9, artworkPalette: 'griglie-layout' },
  'esercitazione-01': { id: 'esercitazione-01', label: 'Esercitazione 01', palette: 'course' },
  'esercitazione-02': { id: 'esercitazione-02', label: 'Esercitazione 02', palette: 'introduction' },
  'esercitazione-03': { id: 'esercitazione-03', label: 'Esercitazione 03', palette: 'history' },
  'esercitazione-04': { id: 'esercitazione-04', label: 'Esercitazione 04', palette: 'ux-research' },
  'esercitazione-05': { id: 'esercitazione-05', label: 'Esercitazione 05', palette: 'ux-perception' },
  'esercitazione-06': { id: 'esercitazione-06', label: 'Esercitazione 06', palette: 'ux-gestalt' },
  'esercitazione-07': { id: 'esercitazione-07', label: 'Esercitazione 07', palette: 'ux-color' },
  'esercitazione-08': { id: 'esercitazione-08', label: 'Esercitazione 08', palette: 'ux-type' },
  'esercitazione-09': { id: 'esercitazione-09', label: 'Esercitazione 09', palette: 'ux-grid' },
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
