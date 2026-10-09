---
name: iLMeteo · laboratorio di riprogettazione
description: 'Previsioni lungo la giornata: un’interfaccia di servizio locale con dati acquisiti e materiali autentici.'
colors:
  primary: '#064ec3'
  secondary: '#a93a00'
  accent: '#dc5700'
  base-100: '#fff'
  base-200: '#eaf5fb'
  base-300: '#c9d9e9'
  base-content: '#171c23'
  muted: '#46505d'
  search-surface: '#f8fbfe'
  scrollbar-thumb: '#819fba'
  map-backdrop: '#092b6080'
typography:
  display:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 48px
    fontWeight: 850
    lineHeight: 1.08
    letterSpacing: -.025em
  headline:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: -.025em
  title:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 24px
    fontWeight: 750
    lineHeight: 1.3
  body:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1
  search:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 23px
    fontWeight: 700
    lineHeight: 1.5
  hour-control:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.5
  forecast-band:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.5
  forecast-value:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -.02em
  table:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.5
  table-heading:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 20px
    fontWeight: 650
    lineHeight: 1.5
  row-control:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.5
rounded:
  flat: 0px
  field: .5rem
  box: .75rem
spacing:
  '4': 4px
  '8': 8px
  '12': 12px
  '16': 16px
  '20': 20px
  '24': 24px
  '28': 28px
  '32': 32px
  '40': 40px
  '48': 48px
  '64': 64px
components:
  button-hour:
    backgroundColor: transparent
    textColor: '{colors.base-content}'
    typography: '{typography.hour-control}'
    rounded: '{rounded.flat}'
    padding: '0'
    height: 48px
    width: 25%
  button-hour-selected:
    backgroundColor: transparent
    textColor: '{colors.secondary}'
    typography: '{typography.hour-control}'
    rounded: '{rounded.flat}'
  button-row:
    backgroundColor: transparent
    textColor: '{colors.base-content}'
    typography: '{typography.row-control}'
    rounded: '{rounded.flat}'
    padding: '0'
    height: 38px
  search-input:
    backgroundColor: '{colors.search-surface}'
    textColor: '{colors.base-content}'
    typography: '{typography.search}'
    rounded: '{rounded.field}'
    padding: 0 55px 0 .75rem
    height: 52px
    width: 100%
  select:
    backgroundColor: '{colors.base-100}'
    textColor: '{colors.base-content}'
    typography: '{typography.body}'
    rounded: '{rounded.field}'
    padding: 0 1.75rem 0 .75rem
    height: 48px
  navigation:
    backgroundColor: '{colors.base-100}'
    textColor: '{colors.base-content}'
    typography: '{typography.navigation}'
    rounded: '{rounded.flat}'
    padding: 11px 10px 9px
  forecast-band:
    backgroundColor: '{colors.base-200}'
    textColor: '{colors.base-content}'
    typography: '{typography.forecast-band}'
    rounded: '{rounded.flat}'
    padding: 10px 24px
  hourly-table:
    backgroundColor: '{colors.base-100}'
    textColor: '{colors.base-content}'
    typography: '{typography.table}'
    rounded: '{rounded.flat}'
    padding: 5px 12px
    width: 100%
  disclosure:
    backgroundColor: transparent
    textColor: '{colors.base-content}'
    rounded: '{rounded.flat}'
    padding: 16px 40px 16px 0
  map-dialog:
    backgroundColor: '{colors.base-100}'
    textColor: '{colors.base-content}'
    rounded: '{rounded.box}'
    padding: 24px
    width: 91.6667%
---
# Design System: iLMeteo · laboratorio di riprogettazione

## Overview

**Creative North Star: "Previsioni lungo la giornata"**

La previsione si legge lungo la giornata. Il sistema usa un campo bianco, scrittura umanista in nero tonalizzato e segni arancio che collegano una scelta al suo contenuto. Numeri, date e condizioni guidano la lettura; divisori leggeri distinguono i gruppi senza trasformarli in una collezione di card.

Questa identità appartiene alle tre pagine riprogettate del laboratorio. Nome, dati e attribuzioni iLMeteo restano quelli acquisiti. La mappa nazionale principale del redesign è una reinterpretazione grafica autorizzata dall’utente; le altre mappe e tutte le copie originali restano autentiche. Il redesign usa, su richiesta esplicita dell’utente, il logo didattico ImageGen `redesign/assets/brand/ilmeteo-modern-v1.png`: monogramma iL blu, punto della i a sole arancio e lettering Meteo sans-serif su fondo trasparente. Il logo autentico resta nelle copie originali e negli asset acquisiti. Prompt e provenienza del nuovo marchio sono in `redesign/assets/brand/manifest.json`. La fonte è un’acquisizione congelata: edizione, disponibilità e unità fanno parte della presentazione, perché danno significato ai valori. Il sistema grafico delle slide CVeDI e quello di Caffè TTC non si applicano a queste pagine.

Il riferimento è il codice finito: `redesign/style.source.css`, `redesign/app.js`, `scripts/redesign-lib.mjs`, `scripts/redesign-pages.mjs` e `scripts/redesign-secondary.mjs`. I token descrivono i ruoli effettivamente resi; i ruoli semantici daisyUI dichiarati ma senza un componente attivo non vengono promossi a nuovi pattern. La composizione attiva di Milano riusa gerarchia, controlli, tabella iniziale e token della pagina locale; date, condizioni, valori e conteggi derivano dalla sua fonte del 9 ottobre 2026. Il comp storico di Bologna resta nel [brief della superficie](.impeccable/surfaces/redesign-bologna-html.md).

**Key Characteristics:**

- Gerarchia di servizio: luogo, data, valore, dettaglio.
- Nero tonalizzato di lettura, azzurro di selezione e arancio di stato.
- Superfici aperte, separatori sottili e immagini senza cornici.
- Controlli nativi e contenuto disponibile prima dell’attivazione del runtime.

## Colors

La palette accosta un nero leggermente tonalizzato verso il blu a bianco e azzurri freddi, con un arancio luminoso per i segni di stato e un arancio più scuro per il testo.

### Primary

- **Blu di azione** (`primary`): collegamenti, caret e selezione del testo.

### Secondary

- **Arancio di lettura** (`secondary`): ora selezionata, hover dei collegamenti e focus generale.

### Tertiary

- **Arancio di stato** (`accent`): linea mobile delle ore e indicatore della destinazione corrente. Il suo impiego osservato è grafico, non il corpo del testo.

### Neutral

- **Bianco aperto** (`base-100`): fondo della pagina, dialogo e campi ordinari.
- **Azzurro selezionato** (`base-200`): fascia dell’ora e riga selezionata; anche superficie del pulsante standard daisyUI.
- **Regola azzurra** (`base-300`): divisori, bordi e asse delle ore.
- **Nero tonalizzato** (`base-content`, `#171c23`): corpo, titoli, numeri e navigazione, anche nella tab laterale del redesign.
- **Ardesia tonalizzata** (`muted`, `#46505d`): edizione, note, didascalie, placeholder e metadati.
- **Bianco di ricerca** (`search-surface`): campo di località.
- **Blu della scrollbar** (`scrollbar-thumb`): cursore di scorrimento; la pista riusa l’azzurro selezionato.
- **Velo del dialogo** (`map-backdrop`): fondo trasparente dell’ingrandimento nativo; non una superficie di lettura.

**The Arancio di stato Rule.** Usare l’accento per il segno di selezione; usare il secondario più scuro per testo interattivo selezionato e hover. Non scambiare i due ruoli.

## Typography

**Display Font:** Nunito Sans, con fallback Arial, sans-serif.
**Body Font:** Nunito Sans, con fallback Arial, sans-serif.

Il file variabile locale `redesign/fonts/nunito-sans.woff2` copre pesi da 200 a 900, con `font-display: swap` e sintesi disabilitata. Il disegno aperto delle lettere tiene insieme titoli, dati e testo di servizio. I pesi marcano una gerarchia unica, senza una seconda famiglia ornamentale.

### Hierarchy

- **Display:** titolo principale; sullo schermo stretto il titolo città passa a 42px e quello delle pagine di lettura a 38px.
- **Headline:** titoli di sezione; nel reflow mobile la misura ordinaria passa a 28px.
- **Title:** sottogruppi e fasce di mappa.
- **Body:** testo principale, con colonne di lettura fino a 75ch; la base passa a 17px sul viewport stretto. I ruoli usano unità `rem`, con radice al 100% della preferenza del browser; le misure in px qui riportate descrivono la resa con base browser di 16px.
- **Lead:** sintesi nazionale e testo iniziale delle pagine di lettura; passa a 21px sul viewport stretto.
- **Label:** note, edizione, didascalie e metadati. Note, edizione e footer mantengono almeno 16px anche sul viewport stretto.
- **Navigation / Search:** destinazioni del masthead e input di località. La navigazione desktop usa l’ultima regola della cascata; mobile navigazione e ricerca usano 19px.
- **Hour control / Forecast band / Forecast value:** scala di scelta, contesto e valore focale. Il valore della fascia passa a 36px sul viewport stretto.
- **Row control:** ore nella tabella, con peso 700 e misura della riga.
- **Table / Table heading:** valori confrontabili e intestazioni della tabella essenziale. I valori passano a 19px sotto 1000px e a 18px sotto 700px; le intestazioni passano a 17px e 15px. Le tabelle secondarie scorrevoli usano 16px sotto 700px.

**The Numeri confrontabili Rule.** Conservare cifre tabulari e allineate in tabelle, ore, fascia selezionata, riepiloghi e dettagli numerici, con unità accanto ai valori. Una conversione dell’interfaccia non riscrive i campi originali della fonte.

Il corpo usa interlinea 1,55; la sintesi nazionale usa 1,5. I paragrafi consecutivi nelle colonne di lettura distano 0,75em e il footer rimane entro 75ch. La navigazione mantiene interlinea 1,25. I token CSS `--type-display`, `--type-headline`, `--type-title`, `--type-body`, `--type-label`, `--type-forecast-value` e `--type-table` possiedono i ruoli ricorrenti; la famiglia locale e i pesi esistenti restano autorevoli. In stampa i titoli principali usano 28pt anche dopo il reflow mobile, quelli di sezione 20pt.

## Layout

Masthead, edizione, contenuto e footer condividono una larghezza massima di 1600px e margini automatici. Il gutter sinistro è 32px (20px fino a 700px); a destra sono riservati almeno 64px per la tab di confronto da 44px, lasciando 20px liberi tra tab e contenuto anche sul viewport stretto. I token `--layout-width`, `--layout-gutter`, `--layout-tab-clearance`, `--layout-group-gap` e `--layout-section-gap` descrivono questi ruoli.

Il masthead conserva logo, ricerca e destinazioni in una riga; il logo misura 74px e il campo ricerca 490px, limitato dalla larghezza disponibile. La previsione locale usa due colonne con rapporto 1,755:1 e gap di 32px sopra 1000px; il riferimento nazionale è separato da una regola verticale. Home e Domani usano rapporto 1,6:1 e gap di 48px. Le loro mappe iniziali sono larghe al massimo 360px, allineate all’inizio della lettura; sul viewport stretto il massimo passa a 300px. Le immagini mantengono proporzioni e ingrandimento condiviso.

A 1000px e sotto le composizioni principali passano a una colonna, conservando l’ordine testo o previsione locale, poi cartografia o riferimento nazionale. Il separatore nazionale diventa orizzontale. Le gallerie mantengono due colonne fino a 700px, poi una. A 700px e sotto il masthead si riordina e il logo passa a 52px. Fra 1001 e 1200px la condizione della fascia occupa una riga propria; fino a 480px il simbolo affianca ora e temperatura impilate, con la condizione sotto. Questo permette anche temperature Fahrenheit senza sovrapposizione alla tab laterale.

Il ritmo distingue gruppi ravvicinati (8–16px), sottogruppi (24–32px) e sezioni (64px, 48px su mobile). Titoli di sezione e corpo distano 24px, 20px su mobile. Le tre misure del riepilogo di domani occupano colonne uguali; il collegamento di consultazione segue sulla propria riga. I controlli hanno etichette sopra i select e passano a tutta larghezza su mobile. Gallerie e coppie di mappe usano il gap del contenitore, senza sommare margini verticali sulle singole figure. I link di ingrandimento e gli elenchi di destinazioni mantengono almeno 44px di altezza interattiva.

Le tabelle secondarie hanno larghezza minima di 650px sui viewport stretti. Scorrono dentro regioni nominate e focalizzabili, con suggerimento visibile; ore, intestazioni e unità restano integre. La tabella essenziale iniziale continua invece a rientrare nel viewport. Lo scorrimento non deve spostare l’intera pagina.

Il CSS di stampa riduce misure, usa una composizione principalmente verticale, nasconde controlli interattivi e servizi, conserva edizione e attribuzioni e mostra i disclosure aperti. È un contratto nel sorgente, non una stampa osservata. Il [finish review](../../reports/ilmeteo-lab/finish-review.md) ha disposition `ship` per il rendering web locale documentato: 15 acquisizioni esaminate, hero 90,77% a 1200×833 e matrice manuale delle 42 regioni. Il gate responsive automatico rimane **FAIL, 69,19%, aperto e non forzato**. File nativo, stampa e zoom browser nativo al 200% non sono stati osservati; il reflow a 640px non sostituisce quest’ultima prova. Questi limiti non sono token da ottimizzare né difetti da normalizzare nello stile.

## Elevation & Depth

La lettura ordinaria è piatta: il tema dichiara `depth: 0` e `noise: 0`. La distinzione fra zone nasce da spazio, regole sottili e azzurro di selezione. Il dialogo nativo di ingrandimento conserva l’ombra diffusa daisyUI e un velo blu; è l’eccezione per un elemento temporaneamente sovrapposto, non un modello di card da propagare.

### Shadow Vocabulary

- **Dialogo sovrapposto** (`0 25px 50px -12px oklch(0% 0 0/.25)`): valore daisyUI effettivo del contenitore modale nel CSS compilato, non una dichiarazione custom del laboratorio.

**The Superficie aperta Rule.** Le sezioni di lettura sono piatte e separate da spazio o regole sottili. Il dialogo di ingrandimento può usare la profondità diffusa fornita da daisyUI.

## Shapes

Le superfici di lettura, la fascia dell’ora, i pulsanti delle ore e i disclosure hanno angoli diritti. Campi e pulsanti standard usano il raggio `field`; il contenitore dell’ingrandimento usa `box`. I bordi ricorrenti sono regole da 1px, l’asse delle ore da 2px e i segni arancio di selezione da 5px. Le mappe mantengono le proporzioni della fonte; quella nazionale principale adotta fondi azzurri chiari e icone blu/arancio su richiesta dell’utente; il logo del redesign mantiene proporzioni quadrate e trasparenza, senza cornici ornamentali.

## Components

### Buttons

I pulsanti delle ore sono scelte testuali sulla linea. Hanno fondo trasparente, larghezza pari a un quarto del gruppo e stato `aria-pressed`; lo stato selezionato cambia il colore del testo e sposta il segno sottostante. Il marker anima solo `transform` per 250ms con `cubic-bezier(.16,1,.3,1)`. I pulsanti della tabella aprono il dettaglio relativo a data, ora e intervallo e spostano il focus sul suo titolo. La chiusura del dialogo riusa il pulsante standard daisyUI.

Il focus generale è un contorno secondario da 3px, con offset di 4px. I selettori daisyUI più specifici mantengono i propri trattamenti di focus, ad esempio sui link e sui disclosure; verificare la cascata effettiva quando si estende un componente. `prefers-reduced-motion` elimina transizioni e animazioni.

### Inputs / Fields

La ricerca usa una superficie leggermente tinta, bordi azzurri e un’icona SVG incorporata. La ricerca locale porta a Bologna; per altre località mostra una spiegazione, una destinazione locale e il collegamento ufficiale. Escape e una nuova modifica svuotano il feedback. I select nativi hanno etichette visibili e filtrano dati già acquisiti. Controlli inizialmente disabilitati vengono attivati dal runtime; il contenuto e i collegamenti fondamentali sono già nel documento statico.

### Navigation

Home, Milano e Domani sono destinazioni testuali nello stesso masthead. `aria-current="page"` aggiunge il segno arancio inferiore senza trasformare le voci in chip. Sullo schermo stretto la navigazione occupa una riga separata. I collegamenti nel corpo restano sottolineati.

### Forecast band and tables

La fascia selezionata è un piano azzurro con ora, simbolo, temperatura e condizione; le condizioni sono anche testuali. I simboli del redesign usano l’atlante PNG trasparente ImageGen `redesign/assets/icons/weather-atlas-v1.png`, richiesto dall’utente. La griglia 3×2 distingue sereno (1), poco nuvoloso di giorno (3), nubi sparse di giorno (4), poco nuvoloso di notte (103), nubi sparse di notte (104) e pioggia debole (109). `scripts/redesign-icons.mjs` associa i codici originali alle celle senza alterare le condizioni: il runtime riusa la stessa mappa. Il simbolo occupa una cella di 60×60px; il ritaglio avviene soltanto in CSS, senza modificare i PNG generati. Le copie originali conservano il proprio artwork. La mappa nazionale principale del redesign usa lo stesso linguaggio di icone; le altre mappe conservano i propri simboli. Il simbolo non sostituisce il testo della condizione né introduce un nuovo dato meteorologico. La riga corrispondente nella tabella riusa lo stesso azzurro. La tabella essenziale usa tre colonne e cifre tabulari, le tabelle successive mantengono vento e dati aggiuntivi con scorrimento contenuto.

Celsius/Fahrenheit e km/h/nodi cambiano i valori derivati della presentazione. I campi originali conservano le unità pubblicate dalla fonte. La mezzanotte locale è il 9 ottobre; la fascia nazionale notturna è del 10 ottobre: entrambi i passaggi di data rimangono espliciti.

### Maps and zoom

Figure aperte, didascalia con data e fonte, azione testuale di ingrandimento. L’immagine mantiene il rapporto originale. L’azione apre un `<dialog>` nativo; Escape, pulsante Chiudi e sfondo lo chiudono. Senza supporto del dialogo, il collegamento apre direttamente l’asset. Un’immagine fallita lascia un messaggio leggibile; non si genera una mappa sostitutiva. Il radar è dichiarato non disponibile perché la base acquisita contiene errori 403; risorse e attribuzioni originali rimangono conservate.

### Disclosures and availability

I dettagli nativi hanno un titolo leggibile, regola inferiore e contenuto aperto su richiesta. La loro forma rimane piatta. Gli stati mancanti sono testo di servizio con possibilità di approfondire sul sito ufficiale: non simulano risultati, aggiornamenti o valori disponibili. Non esiste una famiglia di card o chip da introdurre per analogia con il framework.

## Do's and Don'ts

### Do:

- **Do** usare i ruoli semantici del tema ilmeteo e il font locale Nunito Sans.
- **Do** mantenere data, intervallo, unità e indicazione dell’edizione vicino ai dati che descrivono.
- **Do** conservare proporzioni, fonti, attribuzioni e originali delle immagini attive.
- **Do** mantenere tabelle secondarie leggibili con scorrimento contenuto, nome accessibile, focus e suggerimento sui viewport stretti.
- **Do** separare probabilità di precipitazione, attendibilità, osservazione e previsione; un campo non fornito non è zero.
- **Do** controllare la cascata dei componenti daisyUI e aggiornare il CSS sorgente prima di rigenerare gli asset compilati.

### Don't:

- **Don’t** applicare alle pagine il linguaggio grafico delle slide o di Caffè TTC.
- **Don’t** inventare previsioni, allerte, cartografia o disponibilità di servizi assenti dall’acquisizione.
- **Don’t** usare i raster del comp come fonte meteorologica. La mappa nazionale ridisegnata su richiesta dell’utente rimanda alla fonte acquisita e dichiara la reinterpretazione grafica. Il marchio didattico è una revisione autorizzata dall’utente, distinta dal logo autentico delle copie originali.
- **Don’t** spezzare ore, intestazioni e unità per comprimere tabelle dense dentro il viewport.
- **Don’t** aggiungere cornici ornamentali o contenitori annidati alle immagini e alle sezioni aperte.
- **Don’t** dichiarare osservati stampa, file:// o zoom nativo al 200% sulla base del solo CSS o del reflow a 640 px.

## Confronto tra versioni

Le sei pagine condividono soltanto il pulsante daisyUI di confronto, fissato al bordo destro e centrato verticalmente nella viewport. La tab misura 44px in larghezza e almeno 188px in altezza, con testo verticale e angoli arrotondati soltanto a sinistra. Apre la stessa pagina nell’altra versione e resta disponibile durante lo scorrimento anche su mobile. Riusa Nunito Sans locale e i ruoli cromatici del laboratorio; il CSS è isolato dalle copie originali. Il focus usa un outline interno visibile, la stampa nasconde il controllo. La barra didattica superiore e la sua navigazione duplicata sono rimosse; ciascuna pagina mantiene il proprio masthead. Il corpo e il footer del redesign riservano 44px aggiuntivi a destra, così la tab non copre i testi: il padding totale è 76px su desktop e 64px su mobile. La geometria delle copie originali rimane quella acquisita.

Il cambio versione rivela la nuova pagina con una tendina orizzontale di 520ms: da sinistra verso il redesign, da destra verso l’originale. Le View Transitions mantengono visibile la pagina precedente; nei browser senza supporto è disponibile un reveal di 450ms. L’animazione si applica al solo cambio versione, non alla navigazione ordinaria. Movimento ridotto usa la navigazione immediata. Collegamenti e contenuti restano disponibili senza JavaScript o sessionStorage. `version-nav.source.css` è la sorgente del CSS compilato, `version-nav.js` gestisce la continuità e `scripts/version-navigation.mjs` genera il pulsante e normalizza le destinazioni locali acquisite. Gli HTML grezzi in sources/ non vengono modificati.

### Icone di servizio del redesign

Ricerca e cambio versione usano l’atlante trasparente ImageGen `redesign/assets/icons/utility-atlas-v1.png`: lente a sinistra, due frecce opposte a destra. La ricerca usa una cella di 28px e la tab di confronto una di 22px. Etichette accessibili, azioni e dimensioni dei controlli restano quelle esistenti; le icone sono decorative. La tab delle copie originali conserva il proprio SVG. Prompt, primo atlante meteo e PNG finali sono conservati insieme al manifest in `redesign/assets/icons/`. In forced colors la ricerca mostra l’etichetta “Cerca”; il testo del passaggio resta sempre visibile.


## Correzioni dall’audit tecnico

L’edizione congelata e il fallback senza JavaScript appartengono al landmark del masthead. Il contenuto principale è focalizzabile attraverso lo skip link. Il placeholder usa il blu secondario di lettura a opacità piena; superfici di ricerca, velo del dialogo e scrollbar hanno token condivisi. Collegamenti autonomi nel lead e nel radar mantengono 44px di altezza, senza trasformare i collegamenti incorporati nei paragrafi in pulsanti.

L’ingrandimento del testo non viene limitato. La navigazione può andare a capo; i termini lunghi si spezzano solo quando necessario. Il contenitore della previsione locale usa una query a 14rem: quando il testo ingrandito riduce lo spazio relativo, le ore passano a due colonne e la selezione conserva un bordo arancio sul controllo attivo. Riepilogo giornaliero e fascia selezionata si ricompongono verticalmente. La tabella essenziale ha una regione di scorrimento nominata, focalizzabile e larga almeno 14rem; resta integra senza far scorrere tutta la pagina. In stampa il minimo viene rimosso.

Il server locale serve esplicitamente il solo manifest JSON della provenienza di Milano; HTML grezzo, script e brief restano esclusi. L’audit e le prove correnti sono in `reports/ilmeteo-lab/audit/`: controlli axe-core e browser sono evidenza tecnica nel loro ambito, non certificazione completa WCAG.

### Mappa nazionale ridisegnata

La mappa principale di Italia del 9 ottobre, condivisa da Home, Milano e Domani, usa `redesign/assets/maps/italia-9-ottobre-v1.png`, generata con ImageGen a partire dalla mappa acquisita e dall’atlante di icone. Il fondo è azzurro chiaro; soli arancio, nuvole azzurre, contorni e segni blu riprendono la famiglia dei simboli. È una reinterpretazione grafica didattica, distinta dalla fonte iLMeteo. Il caption lo dichiara e il collegamento “Vedi mappa originale” apre l’asset acquisito. Temperature stampate, data e attribuzione sono confrontate con la fonte; il controllo ha corretto la massima di PE a 27. L’ingrandimento comune apre il raster ridisegnato. `scripts/redesign-maps.mjs` possiede la sostituzione di presentazione; dati, asset e copie originali restano conservati. PNG, prompt e manifest sono in `redesign/assets/maps/`.
