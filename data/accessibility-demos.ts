import examples from '../assets/booklet/accessibilita-commenti-2026-10/esempi.json'

// The booklet owns the explanatory copy; this catalog owns the live task.
export const demoInstructions = {
  'contrasto-testo': 'Scegli un orario e prova a riconoscere quello non disponibile.',
  'contrasto-controlli': 'Seleziona la casella e osserva come cambia il segno di spunta.',
  adattamento: 'Riduci lo spazio e ingrandisci il testo: il comando di conferma resta raggiungibile?',
  tastiera: 'Usa Tab, frecce e Invio per scegliere un corso e inviare il modulo.',
  puntamento: 'Sposta Milano al primo posto usando i comandi disponibili.',
  immagini: 'Nascondi la figura e confronta l’informazione che rimane disponibile.',
  media: 'Riproduci il contenuto; nella versione funzionante prova sottotitoli e descrizione.',
  semantica: 'Apri e richiudi i dettagli di consegna, anche usando la tastiera.',
  feedback: 'Modifica una nota, salvala e controlla dove rimane il focus.',
  cognitiva: 'Scegli data e ora, passa alla conferma e torna a correggere un dato.',
  movimento: 'Avvia gli aggiornamenti e prova a fermarli durante la lettura.',
  moduli: 'Invia la data proposta, poi correggi l’anno senza perdere la nota.',
  autenticazione: 'Prova a incollare la password dimostrativa e completa l’accesso simulato.',
  personalizzazione: 'Adatta il testo e il contrasto, poi ripristina la lettura iniziale.',
  lingua: 'Prova Ana María O’Neill e cambia la lingua del messaggio.',
  'verifica-wcag': 'Attraversa accesso, modulo e conferma; confronta quali passaggi vengono verificati.',
  valutazione: 'Registra l’ostacolo, applica la modifica e riprova il compito.',
} as const

export type AccessibilityDemoId = keyof typeof demoInstructions
export function accessibilityDemo(id: AccessibilityDemoId) {
  const source = examples.find(example => example.key === id)
  if (!source) throw new Error(`Unknown accessibility demonstration: ${id}`)
  return { ...source, instructions: demoInstructions[id] }
}

export const demoProductImage = '/images/processo-ux/l05-immagini-scelte-59b07f120e0d.webp'
