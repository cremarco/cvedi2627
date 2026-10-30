---
name: Passo
description: Fisioterapia a domicilio, nel tuo spazio.
colors:
  primary: "var(--cvedi-ux-process-base)"
  primary-deep: "var(--cvedi-ux-process-deep)"
  violet-light: "var(--cvedi-ux-process-light)"
  violet-surface: "var(--cvedi-ux-process-surface)"
  cedro: "var(--cvedi-ux-process-accent-vivid)"
  cedro-ink: "var(--cvedi-ux-process-accent)"
  paper: "#ffffff"
  surface: "#f7f5fa"
  border: "#ddd7e8"
  ink: "#291b3b"
  muted: "#685c75"
  placeholder: "#74697e"
  info: "#eee8fa"
  info-content: "#3f2463"
  error: "#ac2743"
  error-surface: "#fbeef1"
  error-content: "#8d2038"
typography:
  display:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: "clamp(3.2rem, 5.2vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-.035em"
  headline:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: "clamp(2.6rem, 4.1vw, 4rem)"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-.03em"
  section:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: "clamp(1.9rem, 3.1vw, 2.8rem)"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-.03em"
  title:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: "1.65rem"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-.03em"
  body:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: ".83rem"
    fontWeight: 700
    lineHeight: 1.6
  button:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: ".94rem"
    fontWeight: 750
    lineHeight: 1.35
    letterSpacing: "0"
  wordmark:
    fontFamily: '"Nunito Sans", sans-serif'
    fontSize: "2.6rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-.04em"
rounded:
  button: ".5rem"
  control: "8px"
  panel: "12px"
  surface: "16px"
  portrait: "10px"
  badge: "6px"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "28": "28px"
  "32": "32px"
  "36": "36px"
  "48": "48px"
  "64": "64px"
  "72": "72px"
  "96": "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-outline-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-cedro:
    backgroundColor: "{colors.cedro}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-cedro-hover:
    backgroundColor: "{colors.violet-light}"
    textColor: "{colors.primary}"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  input-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 12px"
    width: "100%"
  navigation-main:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  badge-confirmed:
    backgroundColor: "{colors.cedro}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.badge}"
    padding: "4px 10px"
  card-summary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "30px"
  slot-selected:
    backgroundColor: "{colors.violet-light}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
---

# Design System: Passo

## Overview

**Creative North Star: "Il concierge di quartiere"**

Passo accoglie con fotografie domestiche luminose e accompagna le scelte con informazioni precise. Il violetto identifica il servizio; superfici chiare, filetti sottili e forme morbide danno ordine senza imitare una cartella clinica. Il riferimento già scelto è il concierge di quartiere: vicino nelle parole, accurato nelle informazioni.

Home e servizio operano in modalità Persuade; ricerca, risultati, dettaglio, riepilogo e gestione operano in modalità Operate. Le pagine operative ereditano palette, carattere e componenti, con nome del professionista, orario, domicilio, durata, totale e stato ben distinti. Questo documento registra il mondo costruito dopo le correzioni approvate; la composizione della prima vista rimane nel contratto di superficie.

**Key Characteristics:**

- Violetto e Cedro derivati dai token condivisi della lezione.
- Una sola famiglia tipografica locale, con gerarchie espresse da scala e peso.
- Superfici piatte, bordi sottili, controlli ampi e fotografie domestiche.
- Orario selezionato e informazioni della visita coerenti lungo il percorso.

Fonti del sistema: `styles/site.source.css`, componenti in `app.js`, `PRODUCT.md` locale e token in `../../risorse-condivise/stili/tokens.css`. `styles/site.css` è generato. Il contratto della superficie è `../../.impeccable/surfaces/progetti-fisioterapia-index-html.md`.

## Colors

Il violetto profondo sostiene la riconoscibilità; il Cedro compare come accento della scelta e della conferma, con neutri caldi quasi bianchi intorno.

### Primary

- **Violetto Passo** (`colors.primary`): marchio, titoli della home, azioni principali, link, focus e progressione. Il valore locale è un alias: `--color-primary` → `--cvedi-ux-process-base` → `--cvedi-violet-800`. Il valore canonico condiviso è conservato nel sidecar, senza conversione in esadecimale.
- **Violetto profondo** (`primary-deep`): hover primario e testo sul Cedro.

### Secondary

- **Lavanda chiara** (`violet-light`): orari selezionati, numeri dei passaggi e contatore visite. Lo sfondo selezionato è sempre accompagnato da contorno e stato nativo del controllo.
- **Lavanda di fondo** (`violet-surface`): superfici estese della home e del footer.

### Tertiary

- **Cedro vivo** (`cedro`): azione nella fascia prezzo, selezione del testo e stato confermato. Il tema assegna la stessa tinta ad accent e success.
- **Cedro inchiostro** (`cedro-ink`): punto del marchio.

### Neutral

- **Carta** (`paper`): fondo principale, card e campi; testo sui pulsanti primari.
- **Superficie chiara** (`surface`): riepiloghi di ricerca, aiuti e pannelli secondari.
- **Filetto lavanda** (`border`): bordi e separatori.
- **Inchiostro** (`ink`), **testo secondario** (`muted`) e **segnaposto** (`placeholder`): gerarchia del testo su sfondo chiaro.
- **Informazione** (`info`, `info-content`): avvisi e richiesta in attesa. **Errore** (`error`): messaggi puntuali e azioni distruttive; la coppia morbida `error-surface` / `error-content` è usata negli avvisi di recupero. Ogni stato mantiene una dicitura testuale.

**The Shared Palette Rule.** Usare gli alias cromatici condivisi e i ruoli semantici del tema passo; non creare copie locali dei valori della palette.

Il frontmatter conserva gli alias CSS come sorgente normativa. Le tonalità di anteprima del sidecar sono metadati per il pannello: per il violetto usano la scala esistente, per i colori senza scala sono derivate in OKLCH e non istituiscono nuovi token applicativi.

## Typography

**Display Font:** Nunito Sans, fallback sans-serif.

**Body Font:** Nunito Sans, fallback sans-serif.

Il font variabile locale è `assets/fonts/nunito-sans.woff2`, pesi dichiarati (200–900), stile normale e `font-display: swap`; la licenza è `assets/fonts/OFL.txt`. Il marchio usa la stessa famiglia e il proprio punto Cedro.

### Hierarchy

I ruoli normativi sono nel frontmatter. Display è il titolo della home; headline e section sono i titoli ordinari; title descrive il nome nei risultati; body, label e button distinguono lettura, campo e azione. Non è imposta una scala matematica: i valori derivano dai componenti esistenti.

La radice passa a (16px) sul mobile. Il display usa (4rem) sotto 1190px, (3.3rem) sotto 900px, `clamp(2.75rem,10.5vw,4.3rem)` sotto 680px e (5.2rem) dai 1700px. I titoli operativi su mobile usano (2.45rem); il titolo di esito (2.5rem). Il testo introduttivo della home ha misura massima (41ch); il testo operativo abituale (57ch), mentre le note del servizio arrivano a (70ch).

I paragrafi hanno interlinea ariosa; i titoli usano `text-wrap: balance` e tracking compatto. Orari, date di riferimento e prezzo usano cifre tabulari dove previste. I ritorni di riga visivi non devono unire parole nel title o nell’annuncio della pagina.

**The One Family Rule.** Nunito Sans sostiene marchio, titoli, testo e comandi; cambiare gerarchia attraverso dimensione e peso prima di introdurre un’altra famiglia.

## Layout

Il contenitore centrato ha larghezza massima (1440px), inclusi gli spazi interni, e insets laterali (64px). La composizione è a griglie CSS e flex, con spazio fra sezioni e maggiore densità nelle decisioni operative. La scala di spaziatura registra misure ricorrenti; non sostituisce i padding specifici già presenti nei componenti.

| Soglia CSS | Comportamento costruito |
| --- | --- |
| `max-width:1190px` | Insets (36px), ricerca su quattro colonne con invio a tutta riga; riepilogo laterale (370px), aside risultati (260px). |
| `max-width:900px` | Navigazione principale sostituita dal menu; risultati su una colonna, assistenza impilata; dettaglio e riepilogo conservano una colonna laterale da (340px). |
| `max-width:680px` | Insets (22px), radice mobile, home in sequenza testo/foto/ricerca; data e fascia su righe intere. Dettaglio, riepilogo, gestione, servizio e profilo diventano una colonna. |
| `min-width:1700px` | Titolo home e foto aumentano entro il contenitore: foto fino a (520px), spazio superiore home (60px). |

La griglia della home ha due colonne equivalenti, separate da (56px). Le sezioni ordinarie hanno spazio verticale (96px), ridotto a (72px) e poi (60px). Nei risultati la lista affianca un aiuto da (300px), con distanza (56px); dettaglio e riepilogo usano una colonna di (420px) e distanza (76px). Le riduzioni responsive mantengono l’ordine dei contenuti.

L’intestazione misura (100px), poi (84px) sul mobile; il menu si apre sotto l’intestazione, senza una barra laterale permanente. Il footer conserva gruppi riconoscibili, diventando due colonne sotto il blocco del marchio sul mobile.

In stampa navigazione, footer, progressione, pulsanti e controlli di gestione sono nascosti; le colonne operative diventano un flusso singolo e il riepilogo evita interruzioni interne.

## Elevation & Depth

Il sistema è piatto: `--depth:0`, `--noise:0` e `box-shadow:none` sui componenti principali. Alternanza dei fondi, bordi e spazio separano i livelli; la profondità naturale appartiene alle fotografie. Il dialogo usa un velo (`rgb(28 15 45 / 45%)`), senza istituire una scala di ombre.

**The Flat Surface Rule.** Card, campi, avvisi e pulsanti restano senza ombre anche al passaggio del puntatore; la separazione è affidata a tono, spazio e bordo.

## Shapes

Tre raggi in pixel ricorrono: controlli e orari (8px), pannelli secondari e riepiloghi compatti (12px), card, fotografie principali e dialoghi (16px). I pulsanti seguono il raggio di tema (`.5rem`), distinto dal raggio fisso dei campi. I ritratti nei risultati e i blocchi data usano (10px); i badge (6px). I soli cerchi funzionali sono numeri dei passaggi e contatore visite.

I bordi ordinari sono sottili (1px). Un bordo attivo o un outline segnala stato e focus senza ispessire un lato della card. Le immagini non hanno cornici aggiunte: i contenitori ritagliano il raster con `object-fit:cover` e i raggi previsti.

## Components

### Buttons

Azioni nette, con testo concreto e icona SVG quando utile. I pulsanti standard hanno altezza minima (48px), padding normativo e nessuna ombra; i controlli compatti dell’intestazione mantengono almeno (44px). L’invio ricerca arriva a (50px), poi (54px) sul mobile. Il primario diventa violetto profondo su hover; outline e ghost restano secondari, il Cedro è la variante della fascia prezzo, il rosso è riservato all’azione distruttiva nel dialogo.

Il focus globale usa outline primario (3px) e offset (4px). I cambi di colore durano (160ms). Il caricamento rende il pulsante disabilitato, aggiorna il testo e imposta aria-busy; non basta attenuarne il colore.

### Cards / Containers

Card bianche con bordo sottile, raggio surface e padding (30px), ridotto a (24px) sotto 900px e (22px) sotto 680px. I pannelli d’aiuto usano il fondo surface; riepilogo di ricerca e pannello dimostrativo sono compatti. Nei risultati il nome precede ruolo e descrizione, mentre prezzo e azione chiudono la scheda. Il riepilogo conserva le stesse informazioni della scelta.

### Inputs / Fields

Campi bianchi con bordo border, raggio control, testo ereditato e altezza minima (50px), poi (52px) sul mobile. Le icone sono decorative e le etichette rimangono visibili; il focus del campo usa outline primario (2px), offset (2px) e bordo primario. Il messaggio di errore accompagna il campo, senza sostituire l’etichetta; una correzione valida elimina l’errore senza ricreare il campo o spostare il cursore.

### Navigation

Marchio a sinistra, navigazione orizzontale e accesso alle visite a destra. La voce corrente usa violetto e sottolineatura sottile (2px), insieme ad aria-current. I link autonomi, i ritorni e i link ai profili mantengono altezza minima (44px); i link del footer hanno anche larghezza minima (44px). Il menu mobile ha un comando etichettato con aria-expanded e aria-controls. Il salto al contenuto mette a fuoco il main corrente senza cambiare la rotta.

### Orari, progressione e stati

Gli orari sono radio nativi con etichetta rettangolare, cifre tabulari, larghezza minima (90px) e stato selezionato lavanda/violetto. Il focus resta visibile anche con il radio graficamente nascosto. La scelta si conserva tornando dai profili o dal dettaglio. I quattro passaggi distinguono cerca, scegli, controlla ed esito e marcano quello corrente con aria-current.

I badge sono etichette, non pulsanti: confermato in Cedro, attesa in info, non accettato in error, annullato neutro. La richiesta inviata rimane distinta dalla conferma; l’esito in attesa offre il collegamento per provare la risposta dimostrativa del professionista.

### Fotografie, icone e movimento

Le fotografie generate o rielaborate con IA mostrano ambienti domestici luminosi e persone, senza attestare trattamenti o risultati reali. I raster web attivi sono `assets/images/visita-a-casa.webp`, `assets/images/giulia-riva.webp`, `assets/images/luca-sala.webp` e `assets/images/paziente-a-casa.webp`. Gli originali PNG, i prompt e gli hash restano in `assets/originals/`, `assets/prompts/` e `assets/manifest.json`; i metadati di ciascun raster rimangono nei file `.webp.json` vicini. Il file manifest conserva anche la fonte e la licenza del font. Il paziente della sezione sulla quotidianità è un ritratto molto invecchiato, rielaborato con ImageGen dalla fotografia fornita dall’utente; conserva i tratti distintivi e usa la stessa luce domestica delle altre immagini. La foto personale di riferimento rimane fuori dal repository.

Le icone sono SVG lineari nativi, normalmente (22px) con tratto (1.7), ereditano il colore e non sostituiscono le etichette. Il movimento è breve: la foto home rivela il ritaglio una volta (700ms), le frecce dei link si spostano di (3px) in (180ms). Con prefers-reduced-motion si disattivano animazioni, transizioni e scorrimento fluido; la stampa mantiene immagini e contenuti statici.

## Do's and Don'ts

### Do:

- Do riusare i token del tema passo e modificare soltanto il CSS sorgente, rigenerando il compilato con gli strumenti del progetto.
- Do mettere il nome del professionista prima del ruolo; mantenere prezzo totale, durata, domicilio e stato accanto alla scelta pertinente.
- Do mantenere controlli autonomi raggiungibili, focus visibile e le etichette reali dei campi; conservare la selezione dell’orario nei ritorni e nelle deviazioni verso il profilo.
- Do conservare fotografie, prompt, originali e manifest; dichiarare il carattere illustrativo dei profili e della disponibilità vicino alle decisioni.
- Do mantenere leggibili i dati della visita in stampa e rispettare la preferenza di movimento ridotto.

### Don't:

- Don’t aggiungere ombre decorative o effetti di profondità ai componenti piatti del sistema.
- Don’t trasformare il ruolo professionale in un’etichetta decorativa sopra il nome o usare il colore come unico segnale di stato.
- Don’t presentare fotografie sintetiche, qualifiche, testimonianze, disponibilità o risultati clinici come attestazioni reali.
- Don’t far coincidere invio della richiesta e conferma: l’accettazione del professionista è un passaggio distinto, dimostrativo.
- Don’t dichiarare attivi backend, autenticazione, pagamento o notifiche esterne: il sito conserva dati locali e non invia prenotazioni reali.
