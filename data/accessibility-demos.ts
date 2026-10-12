import examples from '../assets/booklet/accessibilita-commenti-2026-10/esempi.json'

// The booklet owns the explanatory copy; this catalog owns the live task.
export const demoInstructions = {
  'contrasto-testo': 'Scegli prima 10:00, poi 11:30: confronta come viene indicata la disponibilità.',
  'contrasto-controlli': 'Individua la casella, selezionala e confronta la visibilità del bordo e della spunta.',
  adattamento: 'Riduci la larghezza, poi prova il testo al 200%: confronta se Conferma resta raggiungibile.',
  tastiera: 'Parti dal campo Email: usa Tab per raggiungere il corso, scegli Design e invia senza mouse.',
  puntamento: 'Sposta Milano al primo posto usando i comandi disponibili.',
  immagini: 'Mostra l’alternativa testuale e confronta quali dettagli del prodotto rimangono disponibili.',
  media: 'Riproduci la clip simulata di 6 secondi: confronta sottotitoli del parlato e descrizione visiva.',
  semantica: 'Apri e richiudi i dettagli di consegna, anche usando la tastiera.',
  feedback: 'Modifica la nota e salva: confronta messaggio e focus; con uno screen reader, verifica l’annuncio.',
  cognitiva: 'Modifica data e ora, continua, poi torna indietro: confronta riepilogo e dati conservati.',
  movimento: 'Avvia gli aggiornamenti e prova Pausa e Riprendi: la dimostrazione termina entro 8 secondi.',
  moduli: 'Invia 14/10/26; correggi l’anno con quattro cifre (2026), poi invia e confronta la nota.',
  autenticazione: 'Prova a incollare la password dimostrativa e completa l’accesso simulato.',
  personalizzazione: 'Adatta il testo e il contrasto, poi ripristina la lettura iniziale.',
  lingua: 'Invia Ana María O’Neill; nella versione funzionante scegli English e invia di nuovo.',
  'verifica-wcag': 'Includi accesso, modulo e conferma nella prova; confronta dove si interrompe il percorso.',
  valutazione: 'Prova il menu a sinistra con Tab; annota l’ostacolo, poi prova il menu corretto.',
} as const

export type AccessibilityDemoId = keyof typeof demoInstructions

type AccessibilityDemoGuidance = {
  variantLabels: { bad: string; good: string }
  observe: string
}

export const demoGuidance = {
  'contrasto-testo': {
    variantLabels: { bad: 'Testo tenue e stato solo cromatico', good: 'Testo leggibile e stato in parole' },
    observe: 'L’errore deve restare comprensibile anche senza distinguere il rosso.',
  },
  'contrasto-controlli': {
    variantLabels: { bad: 'Bordo e spunta quasi invisibili', good: 'Bordo distinguibile e spunta visibile' },
    observe: 'L’etichetta e il controllo hanno segnali distinti: confronta bordo e spunta.',
  },
  adattamento: {
    variantLabels: { bad: 'Riga fissa e comando tagliato', good: 'Contenuto ridistribuito e comando raggiungibile' },
    observe: 'Quando lo spazio cambia, informazioni e comando devono restare raggiungibili.',
  },
  tastiera: {
    variantLabels: { bad: 'Menu del corso accessibile solo al mouse', good: 'Scelta del corso anche da tastiera' },
    observe: 'Il focus deve permettere di completare anche la scelta del corso.',
  },
  puntamento: {
    variantLabels: { bad: 'Riordino possibile solo con trascinamento', good: 'Riordino possibile con pulsanti Su e Giù' },
    observe: 'Pulsanti e trascinamento raggiungono lo stesso ordine con azioni diverse.',
  },
  immagini: {
    variantLabels: { bad: 'Nome del file come alternativa', good: 'Dettagli del prodotto come alternativa' },
    observe: 'Confronta ciò che l’alternativa racconta del prodotto, senza affidarti alla figura.',
  },
  media: {
    variantLabels: { bad: 'Parlato senza sottotitoli né descrizione', good: 'Sottotitoli per l’audio, descrizione del percorso' },
    observe: 'I sottotitoli rendono disponibile l’audio; la descrizione spiega il percorso visivo.',
  },
  semantica: {
    variantLabels: { bad: 'Testo cliccabile senza ruolo né stato', good: 'Pulsante con nome, ruolo e stato' },
    observe: 'Il pulsante comunica l’azione e se i dettagli sono aperti o chiusi.',
  },
  feedback: {
    variantLabels: { bad: 'Esito lontano e senza annuncio', good: 'Esito vicino e annunciato, focus conservato' },
    observe: 'Un esito visibile può non essere annunciato: confronta anche con uno screen reader.',
  },
  cognitiva: {
    variantLabels: { bad: 'Conferma senza riepilogo, ritorno senza dati', good: 'Riepilogo visibile e dati conservati' },
    observe: 'Il riepilogo e i dati conservati evitano di ricominciare quando modifichi.',
  },
  movimento: {
    variantLabels: { bad: 'Avvisi aggiornati senza possibilità di pausa', good: 'Avvisi controllabili con pausa e ripresa' },
    observe: 'La pausa lascia il messaggio fermo; Riprendi riavvia gli aggiornamenti.',
  },
  moduli: {
    variantLabels: { bad: 'Errore generico e nota cancellata', good: 'Errore spiegato e nota conservata' },
    observe: 'Dopo l’errore, confronta la correzione indicata e il contenuto della nota.',
  },
  autenticazione: {
    variantLabels: { bad: 'Password da trascrivere, incolla bloccato', good: 'Incolla consentito per la password dimostrativa' },
    observe: 'Consentire l’incolla riduce la necessità di ricordare o trascrivere la password.',
  },
  personalizzazione: {
    variantLabels: { bad: 'Lettura con una sola configurazione', good: 'Testo e contrasto regolabili e ripristinabili' },
    observe: 'Le preferenze cambiano la lettura; contenuti e azioni essenziali restano disponibili.',
  },
  lingua: {
    variantLabels: { bad: 'Nome limitato alle lettere A–Z', good: 'Nome completo e lingua dichiarata' },
    observe: 'Confronta i caratteri accettati nel nome e la lingua dichiarata per il messaggio.',
  },
  'verifica-wcag': {
    variantLabels: { bad: 'Prova fermata al solo accesso', good: 'Prova estesa a tutti i passaggi' },
    observe: 'Confronta quali passaggi sono inclusi nella prova e quali restano esclusi.',
  },
  valutazione: {
    variantLabels: { bad: 'Segnalazione generica, senza nuova prova', good: 'Ostacolo, modifica e nuova prova collegati' },
    observe: 'Una nota precisa collega ostacolo e conseguenza alla modifica e alla nuova prova.',
  },
} as const satisfies Record<AccessibilityDemoId, AccessibilityDemoGuidance>

export function accessibilityDemo(id: AccessibilityDemoId) {
  const source = examples.find(example => example.key === id)
  if (!source) throw new Error(`Unknown accessibility demonstration: ${id}`)
  return { ...source, instructions: demoInstructions[id], ...demoGuidance[id] }
}

export const demoProductImage = '/images/processo-ux/l05-immagini-scelte-59b07f120e0d.webp'
