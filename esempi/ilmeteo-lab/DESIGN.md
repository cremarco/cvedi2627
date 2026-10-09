---
name: iLMeteo · redesign incrementale
description: Il redesign costruito dall’utente sulla pagina acquisita, con confronto animato alla versione precedente.
colors:
  primary: '#092b60'
  primary-active: '#061d42'
  accent: '#f28c18'
  paper: '#fff'
  tabs: '#eef2f7'
  rule: '#d5dde7'
  search-rule: '#c8d5e5'
  search-button: '#edf3f9'
  search-hover: '#dce8f4'
  search-shadow: 'rgb(3 24 54 / 16%)'
  search-focus: 'rgb(247 148 29 / 35%)'
  placeholder: '#68788c'
  forecast-title: '#990000'
  tab-ink: '#17365d'
  map-backdrop: '#b8e0f5'
  switch-surface: '#eaf5fb'
  switch-rule: '#c9d9e9'
  switch-action: '#064ec3'
  switch-hover: '#a93a00'
  switch-accent: '#dc5700'
typography:
  body:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
  forecast-title:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.4
  navigation:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 16px
  day:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.15
  search:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 14px
    fontWeight: 500
  switch:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.4
rounded:
  flat: 0px
  field: 8px
  input: 4px
  search-button: 5px
spacing:
  compact: 4px
  field: 8px
  group: 12px
  navbar: 16px
  ticker-separator: 20px
---

# Sistema corrente

L’utente ha sostituito il precedente redesign con la versione costruita sulla copia originale. Questo documento descrive la superficie corrente; gli originali acquisiti mantengono il proprio CSS autentico e non assumono questi token. La composizione si conserva durante il riordino del codice.

## Navbar e ricerca

Barra navy da 56px, attaccata al bordo superiore. Il logo da 56px usa `assets/brand/ilmeteo-modern-v1.png`: lettering e monogramma resi bianchi, sole arancio. Il marchio apre il menu tramite un pulsante nativo. Voci acquisite senza Contatti; la voce attiva ha il segno arancio sopra. La ricerca sta a destra, con campo bianco, raggi da 8px, focus arancio e pulsanti su superficie fredda. Il menu scorre sui viewport stretti; il popup della ricerca è ancorato al campo senza restare tagliato dalla navbar.

## Home

La pagina usa tutta la larghezza da 1024px e non ha margini laterali dell’area principale. Pubblicità, fondale, colonna video, barra Previsioni Meteo Italia e carosello Prima Pagina sono rimossi dal redesign. Gli originali sono conservati nell’altra versione.

Il titolo della previsione è un ticker arancio da 38px sotto la navbar, con icona di pioggia bianca. Il testo e il collegamento “Segnala il tempo nella tua città” sono separati da punti bianchi con 20px per lato. Un solo elemento sorgente viene ripetuto in funzione della viewport. Scorrimento lineare continuo: un elemento ogni 19s; pausa al passaggio del puntatore e a scheda nascosta. Il focus riporta il testo all’inizio; movimento ridotto mantiene il contenuto fermo e accessibile.

Le tab dei giorni sono piatte, navy su fondo freddo, estese ai bordi. “Generale” è selezionata con fondo navy e testo bianco. La fila scorre e mostra una sfumatura arancio soltanto sul lato dove rimangono altre schede. Il gradiente è l’indicatore richiesto dall’utente, non decorazione.

Il testo inizia con “Perturbazione in transito sull’Italia.” in rosso su una riga separata. Seguono tre paragrafi con i marcatori “Venerdì:”, “Sabato e Domenica:” e “PROSSIMA SETTIMANA:” in grassetto; il corpo resta normale, da 18px con interlinea 1,4. Il font condensato locale mantiene l’identità della pagina acquisita.

La mappa radar usa `assets/ilmeteo-weather-placeholder.png`, segnaposto illustrativo ImageGen dell’Italia con finte nuvole. La descrizione accessibile lo dichiara; dati e controlli live non sono inventati. La mappa è allineata al bordo destro tramite lo spazio flex disponibile, senza offset negativi. Le altre mappe, i loro dati e le attribuzioni restano quelli acquisiti.

## Confronto e movimento

Il pulsante daisyUI di confronto resta fisso al bordo destro e centrato verticalmente, largo 44px e alto almeno 188px. Collega Home, Milano e Domani alla stessa pagina dell’altra versione. Il CSS è isolato e usa Nunito Sans locale con licenza OFL. Icona SVG comune alle due versioni; focus interno visibile e controllo nascosto in stampa.

La tendina orizzontale dura 520ms, da sinistra verso il redesign e da destra verso l’originale. Fallback di 450ms nei browser privi di View Transitions; movimento ridotto usa navigazione immediata. Il passaggio ordinario tra pagine non anima la tendina. I collegamenti funzionano anche senza JavaScript e storage.

## Sorgenti

`redesign/*.html` sono i sorgenti modificabili delle tre pagine. `redesign/style.source.css` possiede l’overlay, compilato in `style.css`; non modificare il CSS compilato. `redesign/app.js` gestisce ripetizioni, indicatori di overflow e accessibilità dei controlli nuovi. `originale/snapshot.js` e `snapshot-data.js` sono condivisi per i controlli dei dati congelati. `version-nav.source.css`, `version-nav.js` e `scripts/version-navigation.mjs` possiedono il confronto comune. `pnpm build:ilmeteo` ricompila CSS e aggiorna i sei pulsanti senza rigenerare o sovrascrivere i contenuti HTML.
