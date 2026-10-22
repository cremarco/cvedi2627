import examples from '../../../risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/esempi.json'

// The booklet owns the explanatory copy; this catalog owns the live task.
export const demoInstructions = {
  'contrasto-testo': 'Scegli 10:00 e 11:30; rendi grigio l’indicatore di stato e confronta la disponibilità.',
  'contrasto-controlli': 'Attiva il promemoria via email, controlla la spunta e salva la preferenza.',
  adattamento: 'Prova 320 CSS px, ripristina 400, poi ingrandisci il testo al 200%. Riesci ancora a confermare?',
  tastiera: 'Premi Inizia dalla Email, poi usa Tab: scegli Design e completa l’iscrizione senza mouse.',
  puntamento: 'Metti Milano come prima tappa e salva l’itinerario. Prova anche senza trascinare.',
  immagini: 'Leggi le informazioni senza foto: puoi riconoscere colore e tasche? Mostra poi la foto per confrontare.',
  media: 'Spegni Audio e riproduci i due passaggi della clip. Quale uscita nomina il docente?',
  semantica: 'Inizia la prova con Tab: apri i dettagli dell’ordine n. 204 con Invio e conferma la consegna.',
  feedback: 'Cambia il promemoria della consegna e salvalo. Confronta l’esito e il punto in cui resta il focus.',
  cognitiva: 'Sposta l’appuntamento al 15 ottobre, 11:30. Controlla i dati, torna a modificarli e conferma.',
  movimento: 'Avvia gli avvisi, leggi il codice e trascrivilo. Prova a fermare la lettura durante i 12 secondi della demo.',
  moduli: 'Salva 14/10/26 con la nota già compilata; correggi in 14/10/2026 e controlla quale nota rimane.',
  autenticazione: 'Simula l’incolla di design-2026 e accedi come Sara. È una prova locale: non usa gli appunti.',
  personalizzazione: 'Ingrandisci il testo e aumenta il contrasto; apri gli orari e verifica che le preferenze restino applicate.',
  lingua: 'Invia Ana María O’Neill; poi prova il messaggio English. A sinistra usa Ana per raggiungere il secondo test.',
  'verifica-wcag': 'Controlla l’accesso, poi prova la data nel modulo e raggiungi la conferma. Quale passaggio era escluso?',
  valutazione: 'Prova il menu a sinistra con Tab; registra l’ostacolo, apri la versione corretta e completa l’iscrizione a Design.',
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
    variantLabels: { bad: 'Il nome del file non descrive colore e tasche', good: 'La descrizione permette di riconoscere il prodotto' },
    observe: 'Confronta ciò che l’alternativa racconta del prodotto, senza affidarti alla figura.',
  },
  media: {
    variantLabels: { bad: 'Parlato senza sottotitoli né descrizione', good: 'Sottotitoli per l’audio, descrizione del percorso' },
    observe: 'I sottotitoli rendono disponibile l’audio; la descrizione spiega il percorso visivo.',
  },
  semantica: {
    variantLabels: { bad: 'Il comando si apre col mouse, ma viene saltato da Tab', good: 'Dettagli raggiungibili da tastiera e apertura comunicata' },
    observe: 'Il pulsante comunica l’azione e se i dettagli sono aperti o chiusi.',
  },
  feedback: {
    variantLabels: { bad: 'Un generico Fatto, senza stato annunciabile', good: 'Promemoria identificato nello stato di salvataggio' },
    observe: 'Un esito visibile può non essere annunciato: confronta anche con uno screen reader.',
  },
  cognitiva: {
    variantLabels: { bad: 'Conferma senza riepilogo, ritorno senza dati', good: 'Riepilogo visibile e dati conservati' },
    observe: 'Il riepilogo e i dati conservati evitano di ricominciare quando modifichi.',
  },
  movimento: {
    variantLabels: { bad: 'Il codice cambia mentre lo trascrivi', good: 'Una pausa conserva il riferimento da leggere' },
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
    variantLabels: { bad: 'Il controllo iniziale esclude modulo e conferma', good: 'Il percorso include errori e conferma' },
    observe: 'Confronta quali passaggi sono inclusi nella prova e quali restano esclusi.',
  },
  valutazione: {
    variantLabels: { bad: 'Segnalazione generica, senza nuova prova', good: 'Ostacolo, modifica e nuova prova collegati' },
    observe: 'Una nota precisa collega ostacolo e conseguenza alla modifica e alla nuova prova.',
  },
} as const satisfies Record<AccessibilityDemoId, AccessibilityDemoGuidance>

type AccessibilityTrialGuidance = {
  startHints: { bad: string; good: string }
  liveVerify: string
}

export const demoTrials = {
  'contrasto-testo': {
    startHints: { bad: 'Scegli 10:00, poi 11:30. Rendi grigio il pallino: puoi ancora distinguere la disponibilità?', good: 'Prova gli stessi due orari: le parole distinguono l’orario esaurito da quello disponibile anche con il pallino grigio.' },
    liveVerify: 'Dopo 10:00 cerca lo stato «Esaurito». Rendi grigio l’indicatore di stato: le parole devono continuare a distinguere 10:00 da 11:30. Si modifica soltanto il pallino, non l’intera interfaccia; confronta separatamente la leggibilità del testo.',
  },
  'contrasto-controlli': {
    startHints: { bad: 'Seleziona la casella: puoi riconoscere la spunta prima del salvataggio?', good: 'Attiva il promemoria: bordo e spunta permettono di controllare la scelta prima di Salva preferenza.' },
    liveVerify: 'Attiva e disattiva la casella prima di salvare. Il promemoria applicato deve corrispondere alla scelta; confronta quanto chiaramente il controllo mostra il proprio stato.',
  },
  adattamento: {
    startHints: { bad: 'Restringi a 320 CSS px per vedere il taglio. Ripristina 400 e prova separatamente il testo al 200%.', good: 'Prova 320 CSS px, poi ripristina 400 e usa Testo 200%: data, ora e Conferma devono restare visibili.' },
    liveVerify: 'Restringi a 320 CSS px, poi ripristina 400. Prova quindi il testo al 200% e solo dopo combina le due modifiche. Controlla tutta la data, l’ora e il pulsante Conferma, senza limitarti a trovare il comando con Tab.',
  },
  tastiera: {
    startHints: { bad: 'Premi Inizia dalla Email, poi usa Tab: riesci a scegliere Design e inviare l’iscrizione senza mouse?', good: 'Premi Inizia dalla Email; scegli Design con Tab e frecce, poi passa a Iscriviti e invia.' },
    liveVerify: 'Dopo Inizia dalla Email premi Tab. A sinistra il menu viene saltato e l’invio manca del corso; a destra scegli Design con i tasti del menu, passa a Iscriviti e invia.',
  },
  puntamento: {
    startHints: { bad: 'L’ordine richiesto è Milano, Roma, Torino; prova a ottenerlo con singole attivazioni.', good: 'Il pulsante Su di Milano permette di raggiungere lo stesso ordine.' },
    liveVerify: 'Salva l’ordine iniziale: il servizio conserva Roma, Milano, Torino, ma la prova richiede Milano al primo posto. Sposta Milano con Su e salva di nuovo; confronta lo stesso ordine ottenuto trascinando a sinistra.',
  },
  immagini: {
    startHints: { bad: 'Senza la foto resta solo «foto_018.jpg»: non sai il colore né quante tasche ci sono davanti.', good: 'Leggi la descrizione: puoi riconoscere colore e numero delle tasche. Mostra la foto per controllare che corrispondano.' },
    liveVerify: 'La prova parte senza foto: confronta colore e tasche, poi scegli Seleziona il modello. Usa Mostra la foto e Prova senza foto nella fascia inferiore per controllare la corrispondenza. Il testo mostrato riproduce il valore alt dell’immagine; non simula uno screen reader.',
  },
  media: {
    startHints: { bad: 'Spegni Audio, premi Riproduci e indica l’uscita nominata: puoi rispondere senza ascoltare?', good: 'Spegni Audio e riproduci: usa i sottotitoli per scegliere A o B. La descrizione aggiunge la direzione mostrata.' },
    liveVerify: 'Disattiva Audio prima di Riproduci e scegli l’uscita nominata. A destra i sottotitoli riportano B e il suono di conferma; disattiva poi la descrizione per distinguere l’informazione visiva dal parlato.',
  },
  semantica: {
    startHints: { bad: 'Inizia la prova con Tab: il comando dei dettagli viene saltato. Senza aprirli, la consegna non si può confermare.', good: 'Dopo Inizia la prova con Tab, premi Tab e Invio: leggi data e ora, poi raggiungi Conferma consegna.' },
    liveVerify: 'Inizia la prova con Tab nella fascia inferiore, poi premi Tab e Invio: a sinistra i dettagli vengono saltati e la conferma è bloccata; a destra leggi data e ora e scegli Conferma consegna. Prova Spazio per aprire e richiudere. Con uno screen reader verifica nome, ruolo pulsante e stato espanso/compresso.',
  },
  feedback: {
    startHints: { bad: 'Salva un promemoria diverso: cerca quale informazione ricevi sull’esito.', good: 'Il riscontro deve identificare il promemoria appena salvato senza spostare il focus.' },
    liveVerify: 'Modifica il promemoria, focalizza Salva promemoria e premi Invio. A destra lo stato contiene il dato salvato e il focus rimane sul pulsante; con uno screen reader verifica l’annuncio. La nota didattica sotto al pannello non è il messaggio del servizio.',
  },
  cognitiva: {
    startHints: { bad: 'Sposta al 15 ottobre, 11:30, poi torna indietro: controlla quali dati devi ricordare e reinserire.', good: 'Scegli 15 ottobre, 11:30: controlla il riepilogo, torna a Modifica e verifica che entrambi i dati restino.' },
    liveVerify: 'Scegli 15 ottobre e 11:30. Controlla il riepilogo, torna a modificare e verifica che entrambi i valori restino. Dopo la conferma devi poter riconoscere esattamente quale appuntamento è stato spostato.',
  },
  movimento: {
    startHints: { bad: 'Avvia gli avvisi, poi trascrivi il codice mentre cambia: manca un comando per fermarlo.', good: 'Avvia gli avvisi e usa Pausa avvisi prima di trascrivere: il codice resta fermo mentre lo controlli.' },
    liveVerify: 'Con aggiornamenti consentiti, metti in pausa un avviso e osserva che il conteggio resta fermo mentre trascrivi il codice. Riprendi e controlla che cambi di nuovo. Con movimento ridotto usa Simula aggiornamento: la pausa deve impedirgli di cambiare il codice.',
  },
  moduli: {
    startHints: { bad: 'Il valore iniziale sembra plausibile, ma il campo non spiega il formato richiesto.', good: 'Il formato è indicato prima dell’invio; la correzione non deve cancellare la nota valida.' },
    liveVerify: 'Invia il valore iniziale con la nota Portare il documento. A destra l’errore indica l’anno a quattro cifre e focalizza la data. Dopo 14/10/2026 confronta il valore della nota salvata nei due pannelli.',
  },
  autenticazione: {
    startHints: { bad: 'La password è disponibile ma la prova dell’incolla viene bloccata.', good: 'Premi Simula l’incolla, poi Accedi: il dato dimostrativo viene inserito senza trascriverlo.' },
    liveVerify: 'Usa Simula l’incolla nella fascia inferiore, poi Accedi. A sinistra il campo resta vuoto; a destra si apre l’area di Sara. Apri un laboratorio, torna all’elenco e prova Esci. Controlla anche il normale incolla nel campo.',
  },
  personalizzazione: {
    startHints: { bad: 'La base è leggibile, ma la richiesta di adattarla non trova comandi nel servizio.', good: 'Le opzioni cambiano il testo che leggi e si conservano aprendo gli orari.' },
    liveVerify: 'Aumenta il corpo, attiva Più contrasto e apri gli orari. Controlla che anche i nuovi contenuti usino le preferenze. Ripristina lettura deve riportare 20 px e contrasto standard senza chiudere gli orari.',
  },
  lingua: {
    startHints: { bad: 'Il nome completo viene rifiutato; prova Ana per raggiungere anche il messaggio inglese.', good: 'Il nome completo può essere conservato e la lingua del messaggio viene dichiarata.' },
    liveVerify: 'Invia il nome completo nei due pannelli. A destra resta Ana María O’Neill. Per il secondo test scegli English: il messaggio è inglese. Con uno screen reader o ispezionando il nodo verifica la lingua dichiarata: lang="en" a destra, mentre a sinistra resta lang="it". La pronuncia non è verificabile soltanto guardando il testo.',
  },
  'verifica-wcag': {
    startHints: { bad: 'Il controllo si ferma all’accesso: scopri che cosa accade nel modulo escluso.', good: 'La prova comprende anche l’errore nel modulo e la conferma.' },
    liveVerify: 'Dopo il controllo iniziale prova 14/10/26 nel modulo, correggi in 14/10/2026 e raggiungi la conferma. Confronta i passaggi coperti dal controllo registrato; includerli qui non equivale a un audit completo di conformità.',
  },
  valutazione: {
    startHints: { bad: 'Una segnalazione generica non identifica il menu che interrompe il compito.', good: 'La registrazione collega controllo, conseguenza, correzione e nuova prova.' },
    liveVerify: 'Prova il menu errato con Tab e registra la segnalazione. Usa Apri versione corretta nella fascia inferiore, scegli Design e premi Iscriviti nel modulo. Infine scegli Registra la nuova prova: deve confermare l’iscrizione effettivamente completata allo stesso corso.',
  },
} as const satisfies Record<AccessibilityDemoId, AccessibilityTrialGuidance>

export function accessibilityDemo(id: AccessibilityDemoId) {
  const source = examples.find(example => example.key === id)
  if (!source) throw new Error(`Unknown accessibility demonstration: ${id}`)
  return { ...source, instructions: demoInstructions[id], ...demoGuidance[id], ...demoTrials[id] }
}

export const demoProductImage = '/images/accessibility-services/product.webp'
