/** Independent presentations; source files and lesson identities stay unchanged. */
export const lessonDecks = [
  { id: 'apertura', lesson: 'apertura', alias: 'apertura', title: 'Lezioni', file: null },
  { id: 'presentazione-corso', lesson: 'presentazione-corso', alias: 'presentazione-corso', title: 'Il corso', file: null },
  { id: 'introduzione', lesson: 'introduzione', alias: 'introduzione-teorica', title: 'Introduzione a UX e UI', file: 'lezioni/01-introduzione.md' },
  { id: 'brief-progetto', lesson: 'brief-progetto', alias: 'brief-progetto', title: 'Brief di progetto', file: 'lezioni/00-brief-progetto.md' },
  { id: 'approfondimenti', lesson: 'approfondimenti', alias: 'approfondimenti', title: 'Approfondimenti', file: 'lezioni/00-approfondimenti.md' },
  { id: 'storia-design', lesson: 'storia-design', alias: 'storia-design', title: 'Storia del design', file: 'lezioni/03-storia-design.md' },
  { id: 'ricerca-inclusiva', lesson: 'ricerca-inclusiva', alias: 'ricerca-inclusiva', title: 'Ricerca, contesto e inclusione', file: 'lezioni/04-ricerca-inclusiva.md' },
  { id: 'percezione-gerarchia', lesson: 'percezione-gerarchia', alias: 'percezione-gerarchia', title: 'Accessibilità e design inclusivo', file: 'lezioni/05-percezione-gerarchia.md' },
  { id: 'gestalt', lesson: 'gestalt', alias: 'gestalt', title: 'Gestalt', file: 'lezioni/06-gestalt.md' },
  { id: 'colore', lesson: 'colore', alias: 'colore', title: 'Colore e significato', file: 'lezioni/06-colore.md' },
  { id: 'tipografia-griglie', lesson: 'tipografia-griglie', alias: 'tipografia-griglie', title: 'Tipografia', file: 'lezioni/07-tipografia-griglie.md' },
  { id: 'griglie-layout', lesson: 'griglie-layout', alias: 'griglie-layout', title: 'Griglie e layout', file: 'lezioni/07-griglie-layout.md', localOnly: true },
  { id: 'prototipi-interfacce', lesson: 'prototipi-interfacce', alias: 'prototipi-interfacce', title: 'Prototipi e videogiochi', file: 'lezioni/08-prototipi-interfacce.md', localOnly: true },
  { id: 'test-implementazione', lesson: 'test-implementazione', alias: 'test-implementazione', title: 'Test e implementazione', file: 'lezioni/09-test-implementazione.md', localOnly: true },
  { id: 'esercitazione-01', lesson: 'esercitazione-01', alias: 'esercitazione-01', title: "Esercitazione 1 - Ripasso HTML e CSS di base", file: 'esercitazioni/01-html-css-base.md', localOnly: true },
  { id: 'esercitazione-02', lesson: 'esercitazione-02', alias: 'esercitazione-02', title: "Esercitazione 2 - Ripasso HTML e CSS avanzato", file: 'esercitazioni/02-html-css-avanzato.md', localOnly: true },
  { id: 'esercitazione-03', lesson: 'esercitazione-03', alias: 'esercitazione-03', title: "Esercitazione 3 - Nuove proprietà CSS, Grid e Srcset", file: 'esercitazioni/03-css-grid-srcset.md', localOnly: true },
  { id: 'esercitazione-04', lesson: 'esercitazione-04', alias: 'esercitazione-04', title: "Esercitazione 4 - Interfacce responsive e approccio mobile-first", file: 'esercitazioni/04-responsive-mobile-first.md', localOnly: true },
  { id: 'esercitazione-05', lesson: 'esercitazione-05', alias: 'esercitazione-05', title: "Esercitazione 5 - Tailwind CSS: basi e layout", file: 'esercitazioni/05-tailwind-css.md', localOnly: true },
  { id: 'esercitazione-06', lesson: 'esercitazione-06', alias: 'esercitazione-06', title: "Esercitazione 6 - daisyUI: componenti per le interfacce", file: 'esercitazioni/06-daisyui-componenti.md', localOnly: true },
  { id: 'esercitazione-07', lesson: 'esercitazione-07', alias: 'esercitazione-07', title: "Esercitazione 7 - Temi con Tailwind CSS e daisyUI", file: 'esercitazioni/07-temi-tailwind-daisyui.md', localOnly: true },
  { id: 'esercitazione-08', lesson: 'esercitazione-08', alias: 'esercitazione-08', title: "Esercitazione 8 - Git", file: 'esercitazioni/08-git.md', localOnly: true },
  { id: 'esercitazione-09', lesson: 'esercitazione-09', alias: 'esercitazione-09', title: "Esercitazione 9 - JavaScript e jQuery", file: 'esercitazioni/09-javascript-jquery.md', localOnly: true },
]
export function lessonDeck(id) {
  const deck = lessonDecks.find(deck => deck.id === id)
  if (!deck) throw new Error(`Unknown lesson deck: ${id}`)
  return deck
}
export const deckDirectory = id => id === 'apertura' ? '' : `lezioni/${id}/`
export const deckForTarget = alias => lessonDecks.find(deck => deck.alias === alias || deck.id === alias)

/** Disable unrelated imports before the parser opens their Markdown files. */
export function lessonDeckExtensions(id, filepath) {
  if (!id) return []
  const selected = lessonDeck(id)
  const isRoot = /(?:^|[/\\])slides\.md$/.test(filepath)
  return [{
    name: 'cvedi-lesson-deck',
    transformSlide(content, matter) {
      if (!isRoot) return
      if (Object.hasOwn(matter, 'theme')) matter.preloadImages = false
      const keep = matter.src
        ? matter.src.replace(/^\.\//, '') === selected.file
        : (matter.lesson ?? 'presentazione-corso') === selected.lesson
      if (!keep) matter.disabled = true
      return content
    },
  }]
}
