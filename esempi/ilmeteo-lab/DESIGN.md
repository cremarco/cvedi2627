---
name: The weather forecast · redesign incrementale
description: Identità navy e arancio del redesign didattico, con confronto animato alla versione acquisita.
colors:
  primary: '#092b60'
  primary-active: '#061d42'
  accent: '#f28c18'
  notice: '#b85600'
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
  forecast-sea: '#dce8f4'
  forecast-land: '#fff'
  forecast-country: '#eef2f7'
  forecast-border: '#092b60'
  forecast-country-border: '#c8d5e5'
  switch-surface: '#eaf5fb'
  switch-rule: '#c9d9e9'
  switch-action: '#064ec3'
  switch-hover: '#a93a00'
  switch-accent: '#dc5700'
typography:
  home-title:
    fontFamily: 'OpenSansHebrewCondensed-Bold,sans-serif'
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
  home-title-mobile:
    fontFamily: 'OpenSansHebrewCondensed-Bold,sans-serif'
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.2
  home-section-title:
    fontFamily: 'OpenSansHebrewCondensed-Bold,sans-serif'
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
  home-summary-title:
    fontFamily: 'OpenSansHebrewCondensed-Bold,sans-serif'
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
  forecast-title:
    fontFamily: 'OpenSansHebrewCondensed-Bold,Helvetica,Arial,sans-serif'
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.2
  forecast-summary-body:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  forecast-period:
    fontFamily: 'OpenSansHebrewCondensed-Bold,Helvetica,Arial,sans-serif'
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
  navigation:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 16px
  day:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.15
  map-day:
    fontFamily: 'OpenSansHebrewCondensed-Bold,Helvetica,Arial,sans-serif'
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
  map-credit:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  search:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 14px
    fontWeight: 500
  map-layer:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
  map-layer-mobile:
    fontFamily: 'OpenSansHebrewCondensed,Helvetica,Arial,sans-serif'
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
  switch:
    fontFamily: "'Nunito Sans',sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.4
rounded:
  flat: 0px
  field: 0px
  input: 0px
  search-button: 0px
spacing:
  compact: 4px
  field: 0px
  group: 12px
  navbar: 16px
  ticker-separator: 20px
---

# Sistema corrente

L’utente ha sostituito il precedente redesign con la versione costruita sulla copia originale. Questo documento descrive la superficie corrente; gli originali acquisiti mantengono il proprio CSS autentico e non assumono questi token. La composizione si conserva durante il riordino del codice.

## Angoli

Su richiesta dell’utente, tutte le superfici e i controlli del redesign hanno angoli retti: ricerca, pulsanti, tab, timeline, finestre, FAB, controlli della mappa e confronto. L’overlay azzera anche i raggi ereditati dalla copia acquisita e dagli pseudo-elementi. I soli nodi della timeline conservano la forma circolare; gli SVG Heroicons mantengono la propria geometria. Questa regola sostituisce le precedenti indicazioni sui raggi dei singoli componenti.

## Iconografia comune

L’interfaccia del redesign usa esclusivamente SVG ufficiali Heroicons 2.2.0: variante `24/outline`, tratto 1,5px e colore ereditato, con `24/solid/star` per le stelle selezionate. La famiglia copre ricerca e località, profilo, frecce dei giorni e dei selettori nativi, download, chiusure, ticker, segnalazioni, tab, player, zoom, schermo intero, confronto, simboli meteo, sole/luna, vento e valutazioni. I select mantengono il comportamento nativo e mostrano il chevron ufficiale; gli input di invio con immagine usano lo stesso SVG incorporato nello sfondo, senza perdere gli attributi o i listener originali. Il marchio del redesign è il vettore locale The weather forecast; ritratti, fotografie, marchi editoriali e contenuto delle mappe conservano le rispettive fonti. Gli originali e le licenze sono conservati in `assets/controls/heroicons/manifest.json` e `LICENSE.txt`; `scripts/build-heroicons.mjs` genera il catalogo SVG comune, caricato senza fetch anche in `file://`. `app.js` applica le icone ai controlli e ai pannelli dinamici, conservando etichette, attributi, listener e rotazioni delle frecce del vento. Le condizioni meteorologiche mantengono i codici e i testi acquisiti; i pittogrammi usano sole, luna, nuvola, nuvola con freccia, fulmine e scintille, con composizioni dei soli SVG ufficiali per sole/luna e nuvola. Le pagine acquisite conservano i loro asset; il confronto comune riusa la nuova icona `arrows-right-left`.

## Navbar e ricerca

Barra navy da 56px, attaccata al bordo superiore. Il logo da 56px usa `assets/brand/the-weather-forecast/mark-light.svg`: monogramma WF bianco e sole arancio sopra la F. Il nome dell’identità è «The weather forecast», con questa capitalizzazione, nei metadati e nei nomi accessibili. Il favicon usa `mark-color.svg`. Il marchio apre il menu tramite un pulsante nativo. Voci acquisite senza Contatti; la voce attiva ha il segno arancio sopra. La ricerca sta a destra, con campo bianco, angoli retti, focus arancio e pulsanti su superficie fredda. Sulla home logo, menu e ricerca occupano tre aree distinte: solo le voci del menu scorrono orizzontalmente, senza andare a capo né trascinare fuori la ricerca. Entro 767px la navbar misura 104px: logo e ricerca nella prima riga da 56px, voci scorrevoli da 44px nella seconda da 48px, con scrollbar sottile arancio. La ricerca è alta 48px e i due pulsanti hanno bersagli 44×44px; popup e sottomenu restano ancorati ai rispettivi controlli, entro la viewport e fuori dal ritaglio della fila scorrevole. Milano e Domani conservano la propria struttura.

Link e summary dei sottomenu condividono la centratura verticale, il padding orizzontale da 12px e il bordo superiore da 3px, trasparente per le voci non attive. I summary usano flex con 8px fra testo e chevron; tutti i controlli sono alti 56px su desktop e 44px nella seconda riga mobile. Hover e sottomenu aperto usano navy profondo; il chevron aperto è arancio. Il focus da tastiera ha un outline arancio interno da 2px, visibile su tutte le voci.

La ricerca distingue campo vuoto, nessuna corrispondenza e località non acquisita. Le prime due condizioni sono spiegate nel popup con uno stato annunciato e il suggerimento di consultare Milano; gruppi e colonne privi di risultati sono nascosti. Una località presente nell’elenco ma non acquisita usa il dialog esistente con il nome della destinazione; gli altri collegamenti conservano il messaggio generale della copia. Bozza e focus restano disponibili per correggere la ricerca; Escape chiude i risultati e i menu. Il menu WF porta il focus al primo controllo visibile e lo restituisce al pulsante quando viene chiuso da tastiera. I dropdown della navbar si chiudono anche al clic esterno e restituiscono il focus al summary se il controllo attivo stava nel contenuto nascosto. Senza JavaScript la ricerca torna alla home e a un avviso esplicito, con un link a Milano, senza sostituire la città richiesta con dati di un’altra località. Il pulsante Chiudi del dialog mantiene un bersaglio alto almeno 44px.

Sulla home, Home è l’unica pagina corrente nella navigazione principale. Radar nella navbar e negli altri strumenti porta alla mappa locale, seleziona il livello Radar e sposta il focus alla relativa tab conservando l’inquadratura. Il menu completo conserva le destinazioni acquisite con l’etichetta visibile «Radar originale · non disponibile». Senza JavaScript i collegamenti locali raggiungono la mappa tramite un’ancora.

## Home

La pagina usa tutta la larghezza da 1024px e non ha margini laterali dell’area principale. Il fondale acquisito è omesso. L’apertura presenta subito il titolo visibile Previsioni Meteo Italia, senza la dicitura dell’edizione acquisita su richiesta dell’utente, poi la pubblicità del booklet e tre notizie di Prima pagina tratte dalle sedici notizie conservate. La navigazione Accedi riusa il messaggio locale. Seguono mappa principale e riepilogo, carte giornaliere con sidebar pubblicitaria e strumenti, previsioni sintetiche dei sette giorni e video, Meteo nel mondo, l’elenco completo delle sedici notizie, condivisione e footer. Le mappe, il ticker, il riepilogo e i controlli conservano il redesign corrente.

### Gerarchia e moduli editoriali

Il titolo visibile usa il font condensato locale in grassetto, 36px con interlinea 1,15, ridotti a 32px sotto 600px. I titoli principali di sezione sono da 28px con interlinea 1,2. Prima pagina distingue una notizia guida, con immagine a tutta colonna alta 220px e titolo da 24px, da due secondarie con titolo da 18px: la griglia `1.2fr 1fr` dispone la guida sulle due righe. Sotto 768px la guida conserva l’immagine larga in 16:9; i titoli delle due secondarie occupano tutta la riga, poi seguono miniatura 64×48px e data. Nei tablet le secondarie usano miniature 84×84px. Tutti i moduli mantengono margine sinistro da 16px e spazio destro da 60px per confronto e azione fissa.

La regione giornaliera affianca il modulo delle mappe a una sidebar da 300px, con intervallo di 32px; sotto 1000px la sidebar segue le mappe e presenta due colonne, poi una sotto 600px. La zona delle previsioni sintetiche usa la stessa sidebar da 300px per video previsioni meteo e LAB UX.

Le sette previsioni sintetiche conservano le narrazioni acquisite dall’8 al 14 ottobre 2026, generate dai record di `data/supplementary.json`. La firma visibile della home è «A cura di Elia Guarnieri», derivata da `data/site.json`; l’autore acquisito Antonio Sanò resta nei dati e nella provenienza. Titolo della data da 22px, corpo da 18px con interlinea 1,55 e misura massima 70ch, filetto neutro fra i pannelli. Le date usano tab daisyUI piatte da almeno 44px, navy su superficie fredda e navy pieno per la selezione. Con JavaScript c’è un solo pannello visibile e un solo tab nella sequenza di tabulazione; frecce, Home, End, Invio e Spazio permettono la scelta. Senza JavaScript tutti i sette articoli e i collegamenti restano disponibili nel documento; in stampa tutte le narrazioni sono visibili e i selettori sono omessi. Il modulo video usa l’etichetta «The weather forecast · video» e una superficie navy con testo bianco e padding 24px (16px sul telefono); poster modificato e collegamenti restano conservati; le destinazioni non disponibili riusano il dialog locale. Le precedenti mappe e opzioni di Europa e Mondo restano conservate nella copia acquisita e nelle fonti.

### Mappa mondiale e ricerca

La sezione unica «Meteo nel mondo» (`#international-world`) sostituisce i due moduli Europa e Mondo. La composizione aperta affianca la cartografia a una colonna da 300px, con intervallo orizzontale da 32px, margini comuni e titolo condensato da 28px. La mappa misura 360px in altezza. Il DOM dispone ricerca del paese, cartografia e gruppo di consultazione (stato del paese, link a Milano e ricerca città). Su desktop la mappa occupa la colonna principale e il form paese precede il gruppo di consultazione nella colonna da 300px. Entro 1000px il percorso verticale è ricerca paese → cartografia → consultazione; stato e ricerca città condividono due colonne fino a 600px, poi si impilano. La mappa mobile misura 260px. Input, risultati e pulsanti daisyUI hanno etichette esplicite, bersagli di almeno 44px, angoli retti e focus navy visibile; testi e stati possono andare a capo.

Leaflet 1.9.4 usa la proiezione geografica EPSG:4326 per mostrare tutto il mondo, compresa l’Antartide. I 242 paesi e territori provengono dalla cartografia Natural Earth 1:50m locale di pubblico dominio. Mare `search-hover`, terre `paper`, confini navy e hover `--color-info` del tema daisyUI (corrispondente a `search-button`) riusano i token correnti; il paese selezionato ha riempimento arancio `accent` al 28%, bordo più marcato, nome visibile e stato annunciato. Il riepilogo del paese è separato da un filetto arancio da 3px. La mappa è geografica e non mostra condizioni meteorologiche. La selezione inquadra il poligono principale del paese per evitare che territori lontani o la linea del cambio di data allarghino inutilmente la vista; tutte le geometrie restano nel catalogo.

Clic, Invio e Spazio selezionano lo stesso paese. I tracciati usano una sola fermata di tabulazione: frecce, Home ed End spostano il focus fra i paesi in ordine alfabetico italiano, con nome e contorno visibili; Escape riporta il focus al contenitore. Zoom, trascinamento, pinch e tastiera permettono di esplorare la cartografia; la rotella è disattivata per conservare lo scorrimento della pagina. I comandi di zoom si disabilitano ai limiti e «Mostra tutto il mondo» ripristina inquadratura, selezione e campi. L’overview si riadatta al cambio viewport; zoom e posizione scelti dall’utente restano conservati. Movimento ridotto, scheda nascosta e mappa fuori viewport disattivano le transizioni.

«Cerca un paese» usa una combobox con elenco locale, nomi italiani e alias; la ricerca ignora maiuscole e accenti e distingue nessuna corrispondenza, risultati e selezione. Frecce, Home, End e Invio scelgono un risultato; Escape chiude l’elenco senza cancellare il testo. La ricerca di città resta separata: Milano apre la pagina locale quando non è selezionato un paese oppure quando è selezionata Italia; campo vuoto e altre destinazioni ricevono un messaggio esplicito, mantenendo la bozza. Le previsioni internazionali sono dichiarate non acquisite. Il collegamento nativo a Milano resta disponibile in tutti gli stati, anche senza JavaScript, e conserva il focus quando cambiano i messaggi.

Libreria e catalogo sono locali, senza fetch, tile remoti o chiavi API. `scripts/build-world-map.mjs` genera `assets/maps/world/catalog.js`, l’SVG 1200×600 `world.svg` e il manifest con provenienza, licenza, configurazione e hash, riusando l’originale geografico conservato in `assets/maps/forecast-v3/sources/`. La semplificazione conserva tutti i paesi e gli anelli della fonte. Senza JavaScript restano la mappa completa, un datalist con 242 nomi, l’avviso sul comportamento interattivo e il link a Milano. La stampa usa lo stesso SVG e conserva attribuzione, stato del paese e collegamento locale, omettendo form e comandi.

### Campagne pubblicitarie autonome

Gli annunci sono creatività raster complete di terzi, con copy e CTA dentro l’immagine; il wrapper mostra soltanto «Pubblicità», un collegamento esterno e testo alternativo con messaggio e azione. L’identità navy/arancio resta propria dell’interfaccia meteo: le campagne mantengono palette, caratteri e marchi indipendenti. Il booklet usa indaco, lime e rete metro; TTC Bicocca usa bordeaux, bianco, carattere condensato PT Sans Narrow e fotografia; Caffè TTC usa verde petrolio, legno e fotografia calda; Atlante usa giallo, nero e magenta con tre interpretazioni della tazza; LAB UX usa rosso, bianco e nero con griglia editoriale. Inter e PT Sans Narrow appartengono alle reference e al lettering raster delle campagne: non sono famiglie CSS caricate nella home e non diventano token tipografici del sito.

I cinque formati hanno dimensioni proprie: booklet billboard 970×250, TTC Bicocca half page 300×600, Caffè TTC medium rectangle 300×250, Atlante leaderboard 728×90 e LAB UX small banner 300×100. Booklet e Atlante hanno creatività mobili dedicate, rispettivamente 300×250 e 300×100, selezionate sotto 600px tramite `picture`. Gli annunci non hanno cornici, card, ombre o angoli introdotti dal wrapper; eventuali forme interne appartengono all’artwork. Il focus del link è navy da 3px con scarto 4px. Le creatività scalano entro lo spazio disponibile, restano consultabili senza JavaScript e sono omesse in stampa. Conservare PNG originali, prompt, reference, fonti e licenze; il runtime usa le WebP in `assets/advertising/campaign-v4/`.

Il titolo della previsione è un ticker arancio da 38px sotto la navbar, con icona di pioggia bianca. Contiene soltanto l’avviso meteo, con punti bianchi fra le ripetizioni e 20px per lato. Un solo elemento sorgente viene ripetuto in funzione della viewport. Scorrimento lineare continuo: un elemento ogni 19s; pausa al passaggio del puntatore e a scheda nascosta. Movimento ridotto mantiene il contenuto fermo e accessibile.

“Segnala il tempo nella tua città” è un FAB daisyUI a singola azione sulla home, fisso in basso a destra a 16px dai bordi e rispettoso delle safe area. Il pulsante navy con testo bianco conserva l’etichetta completa su due righe, l’icona ufficiale Heroicons pencil-square e il collegamento acquisito. Altezza minima 48px, focus visibile, nessun menu aggiuntivo. Al passaggio del puntatore, al focus da tastiera o alla pressione, la matita compie un breve gesto di scrittura di 320ms; niente movimento continuo e l’animazione si disattiva con `prefers-reduced-motion`. Rimane visibile durante lo scorrimento; nei viewport bassi si sposta a 60px dal bordo destro per evitare il controllo di confronto. Entro 1000px il pulsante resta compatto a icona 44×48px nel margine libero, con etichetta accessibile completa e title anche senza JavaScript; il footer lascia lo stesso spazio laterale. Su desktop, quando l’ingombro esteso si sovrapporrebbe a una creatività pubblicitaria, `home-ui.js` applica `data-clear-ad` e il pulsante diventa un’icona da 44×48px nel margine libero; etichetta accessibile e title conservano il nome completo. Lo stesso controllo usa `data-clear-world` quando la forma estesa coprirebbe i campi o gli stati della ricerca mondiale. Su desktop la forma estesa ritorna quando non copre annunci o ricerca, senza nascondere l’azione o gli altri controlli. Il footer include 80px di spazio inferiore per lasciare liberi i collegamenti dal FAB; il body non aggiunge una fascia bianca dopo il footer. La stampa omette il FAB. Il CSS daisyUI è compilato nell’overlay con prefisso lab-, limitato a button e fab.

Le tab dei giorni sono piatte, navy su fondo freddo, estese ai bordi. “Generale” è selezionata con fondo navy e testo bianco. La fila rimane alta 44px a tutte le larghezze, senza wrapping; scorre e mostra una sfumatura arancio soltanto sul lato dove rimangono altre schede. Il gradiente è l’indicatore richiesto dall’utente, non decorazione.

Il riepilogo `#html_pre1` apre con “Perturbazione in transito sull’Italia.” in rosso: titolo da 26px, 24px sotto 600px, con interlinea 1,2 e 24px prima del testo. I tre marcatori “Venerdì:”, “Sabato e Domenica:” e “PROSSIMA SETTIMANA:” sono in navy e grassetto, su una riga propria, con 6px prima della rispettiva descrizione. Il corpo resta normale da 18px, con interlinea 1,55 e misura massima 65ch. Fra i periodi ci sono un filetto neutro da 1px e spazi di 20px sopra e sotto. Il font condensato locale e tutti i testi originali sono conservati. La composizione resta aperta, senza card o sfondo aggiunto, sia accanto alla mappa sia nel flusso mobile.

La dicitura visibile «Simulazione didattica · valori illustrativi» precede la cartografia e i livelli, su superficie fredda con testo navy da 14px e interlinea 1,4. Occupa una riga propria a tutta larghezza del modulo, rimane disponibile senza JavaScript e in stampa e non aggiunge una data al radar.

Le sei mappe principali — Tempo, Precipitazioni, Neve, Temperature, Venti-Mari e Radar — usano una sola istanza Leaflet 1.9.4 e la stessa base geografica locale della mappa giornaliera. `weather-map-base.js` crea entrambe le basi con paesi Natural Earth, venti regioni ISTAT / geojson-italy e gli stessi token: mare `search-hover`, Italia `paper`, paesi circostanti `tabs`, coste navy e confini esteri `search-rule`. Tempo mostra venti icone del set originale outline; Precipitazioni usa una scala sequenziale navy per regione; Neve mostra aree sulle quote alte; Temperature usa navy per il freddo e arancio per il caldo; Venti-Mari mostra frecce ufficiali Heroicons e cinque aree marine con altezze illustrative; Radar sovrappone contorni geografici di intensità crescente. Legende, valori e popup rendono leggibili le scale; sul telefono i numeri regionali compaiono solo con ingrandimento sufficiente. Le sei viste sono illustrative e non richiedono dati remoti o chiavi API. I dati sono separati in `data/leaflet-weather.mjs`; `scripts/build-leaflet-weather.mjs` genera il catalogo e le immagini SVG per stampa e senza JavaScript in `assets/maps/leaflet-weather/`. Gli originali e i manifest delle risorse cartografiche attive restano conservati; le varianti raster dismesse sono rimosse dalla cartella del sito.

Il radar conserva sette orari illustrativi, dalle 17:20 alle 23:20 dell’8 ottobre 2026. Ogni fotogramma è un insieme di contorni GeoJSON generati localmente: una banda di echi si sposta gradualmente verso sud-est, con navy chiaro, arancio e `notice` per intensità crescente. Sotto la cartografia la timeline radar mostra i sette orari, dalle 17:20 alle 23:20, e un cursore daisyUI `lab-range` con indicatore circolare arancio. La traccia distingue le ore passate in navy dalle ore previste in `notice`, con le etichette native «Ore passate», «Ora» e «Ore previste». Il marcatore «Ora» resta fisso sul fotogramma delle 19:20 identificato nei dati come `phase: ora`, indipendentemente dal cursore selezionato. L’orario corrente è in grassetto e sottolineato. Il trascinamento, le frecce, Home ed End selezionano il fotogramma e fermano la riproduzione. Il pulsante Riproduci resta allineato a destra; la data visibile resta omessa. Riproduzione, pausa, arresto all’ultimo fotogramma e movimento ridotto sono conservati. Il cambio tab, la scheda nascosta e l’apertura di un dettaglio regionale fermano la riproduzione. Il nome accessibile della mappa e dei dettagli conserva data, orario e natura illustrativa. Zoom e trascinamento agiscono sulla cartografia geografica e sui suoi livelli; Mostra tutta Italia ripristina la vista, mentre lo schermo intero ingrandisce lo stesso modulo. Su telefono zoom e schermo intero hanno bersagli 44×44px; sotto 361px il reset è omesso per lasciare spazio agli altri comandi.

Le quattro mappe dal 9 al 12 ottobre 2026 sono illustrazioni vettoriali con un’unica base Natural Earth 1:50m di pubblico dominio. Coste, isole, confini, inquadratura 1200×1180 e venti punti geografici sono identici fra le date: cambiano soltanto le condizioni illustrative, rappresentate dal set meteo originale outline (sole arancio, nuvole e pioggia navy). Mare azzurro freddo `search-hover`, Italia bianca `paper`, paesi circostanti `tabs`, coste navy e confini esteri `search-rule` riusano la palette del sito. Il generatore `scripts/build-forecast-maps.mjs` risolve i token di `style.source.css` anche per le immagini di stampa e senza JavaScript, separando cartografia, coordinate e condizioni dalla presentazione; sorgente geografica, licenze, hash e configurazione sono in `assets/maps/forecast-v3/`. Le precedenti rielaborazioni ImageGen, sostituite dalle mappe vettoriali, sono rimosse dalla cartella del sito.

Date e attribuzioni restano testo HTML nativo. Le immagini sono senza cornici, ombre o arrotondamenti e condividono dimensioni identiche. Sullo schermo occupano la stessa area, con una sola data visibile alla volta. Su richiesta, cartografia e blocco complessivo seguono esattamente le larghezze della mappa superiore; un ResizeObserver mantiene l’allineamento al cambio viewport. La composizione conserva il margine sinistro di 16px. Il selettore dei giorni è una colonna esterna a destra della cartografia, larga 128px su desktop; entro 600px diventa una griglia 2×2 sopra la mappa, con bersagli alti almeno 48px. Mappa e fallback condividono il margine sinistro di 16px e la larghezza libera dal confronto, anche senza JavaScript. L’immagine mantiene almeno 284px di altezza sullo schermo per lasciare spazio ai comandi sul telefono. L’inquadratura Italia usa tutta la cartografia, senza riservare spazio interno alle tab. Titolo e dimensioni restano stabili durante la selezione. I selettori sono tab accessibili, con frecce, Home, End, Tab, Invio e Spazio; stato selezionato e pannello sono collegati semanticamente. Senza JavaScript e in stampa tutte le mappe restano consultabili: due colonne su desktop e stampa, una sul telefono. Link e gestione locale sono conservati.

I sei tipi usano il componente daisyUI `lab-tabs` / `lab-tab` in una colonna a destra della mappa, fuori dalla cartografia. Le tab formano un’unica superficie bianca con filetto neutro da 1px, raggio esterno 8px, padding 4px e intervalli di 2px. Le singole tab non hanno bordi o ombre; icona e testo sono allineati in due colonne, con icone ufficiali Heroicons 2.2.0 `24/outline`, con tratto 1,5px e visualizzazione da 20px, testo da 15px e altezza minima 48px. La colonna coincide in altezza con la mappa; le sei tab si dividono uniformemente lo spazio disponibile. La selezione è navy con testo bianco e icona arancio; hover, pressione e focus hanno stati distinti. Il focus navy ha uno scarto di 2px dalla tab e le transizioni cromatiche da 160ms sono omesse con movimento ridotto. La colonna misura 128px; entro 600px i sei livelli formano una fila scorrevole sopra la mappa, con bersagli larghi 84px e scrollbar visibile, lasciando l’intera larghezza alla cartografia; i bersagli mantengono almeno 48px anche quando si distribuiscono sull’altezza della mappa; sul telefono icona ed etichetta da 12px sono centrate su due righe. La mappa occupa la colonna sinistra e il player radar si dispone sotto di essa. Selezione e pannello hanno semantica tab; l’orientamento è verticale su desktop e orizzontale sul telefono, sincronizzato anche dopo un resize; Tab, Invio, Spazio, frecce, Home ed End restano disponibili. Nei viewport stretti la cartografia si può ingrandire con i comandi mantenuti. La stampa omette tab e player e conserva immagine selezionata, testo e attribuzioni.

### Rifinitura della home

La sezione principale usa carta bianca, un filetto inferiore neutro e una composizione aperta. Su desktop la mappa guida la lettura a sinistra e il riepilogo occupa una colonna di supporto da 300px a destra, separata da 32px. La griglia è condivisa con mappa giornaliera e risorse: `--home-support-width` 300px, `--home-column-gap` 32px e `--home-group-gap` 24px sono i ruoli spaziali riutilizzati. Il DOM presenta mappa e poi riepilogo, nello stesso ordine visivo. La sezione mantiene il margine sinistro comune di 16px, 24px sopra, 32px sotto e 60px liberi a destra per il confronto fisso. Sotto 1000px mappa e riepilogo si dispongono in una colonna, nell’ordine mappa → player → testo, evitando la compressione della cartografia sui tablet. Le tab restano a destra della mappa e sono accostate al suo bordo senza un intervallo laterale; timeline e pulsante radar sono separati dalla mappa da 8px; sopra 600px condividono una riga, mentre sul telefono la timeline occupa la larghezza completa del modulo per distanziare gli orari e il pulsante la segue su una seconda riga, allineato a destra sotto la cartografia. Contenuti, immagini, attribuzioni, zoom e selezioni restano quelli correnti.

Il ticker usa il token arancio scuro `notice` per mantenere leggibile il testo bianco; l’accento dei controlli resta `accent`. Le tab hanno bersagli alti almeno 44px e segnalano i giorni nascosti su entrambi i lati. Il riepilogo resta visibile anche sotto 770px e usa la gerarchia tipografica e la spaziatura definite sopra. I vecchi slot pubblicitari vuoti e la skin di sfondo acquisita sono omessi; le cinque campagne correnti occupano formati e posizioni espliciti. La composizione usa margini di 16px e intervalli di 24px.

Il controllo radar affianca alla timeline un pulsante daisyUI `lab-btn`, navy con testo bianco e icona ufficiale Heroicons outline da 16px: Riproduci / Pausa, oppure Avanza con movimento ridotto. Misura 80×44px, ha angoli retti e focus navy visibile; il contenitore è aperto, senza bordo, sfondo o padding. È allineato al bordo destro della cartografia e compare soltanto per Radar: sopra 600px affianca il cursore della timeline, sul telefono segue la timeline e termina al bordo destro della cartografia, senza una colonna vuota. La riproduzione si arresta quando la scheda è nascosta o viene scelto un altro livello; movimento ridotto usa Avanza e omette le transizioni. Il FAB evita il comando se rischia di coprirlo. Il cursore offre un bersaglio alto 44px, mostra tutti i sette orari anche sul telefono e comunica orario, fase (passata, di riferimento o prevista), data e natura illustrativa con `aria-valuetext`; la selezione resta sincronizzata durante la riproduzione. La stampa omette timeline e pulsante. Fotogrammi, metadati, SVG originali, fonti, hash e licenze restano conservati.

### Relazioni spaziali della home

La home è organizzata per capitoli funzionali. L’apertura editoriale è bianca; «Mappe meteo Italia» usa `info`, «Meteo dei prossimi giorni» torna su carta bianca, le previsioni sintetiche usano una tinta dell’accento arancio all’8% su bianco, il video ha fondo navy e testo bianco, la ricerca mondiale riusa `info`, l’archivio completo delle notizie torna su carta bianca, distinta dal fondo freddo mondiale. WhatsApp conserva il proprio verde e il footer la superficie fredda del marchio. Le superfici appartengono ai wrapper completi, senza cornici o card annidate; gli artwork pubblicitari conservano colori e formati indipendenti. Due titoli visibili nominano i capitoli cartografici anche senza JavaScript.

Il ritmo distingue 48px fra capitoli (`--home-chapter-space`), 24–32px fra moduli e 8–16px nei gruppi; entro 600px il passo dei capitoli scende a 32px. Griglie, gutter, ordine DOM e focus seguono lo stesso percorso. Previsioni sintetiche e mondo precedono le sedici notizie, così il compito meteo non richiede di attraversare l’intero archivio. In stampa le superfici tornano bianche e le narrazioni restano tutte leggibili.

La colonna editoriale `.home-daily-content` raggruppa mappa giornaliera e strumenti con 24px fra i gruppi; gli annunci da 300px occupano la colonna di supporto a 32px. Gli strumenti seguono la mappa nel DOM e nel flusso mobile, prima degli annunci e delle notizie. Mappa principale e giornaliera condividono la stessa larghezza cartografica, i selettori da 128px su desktop e il margine sinistro da 16px. La colonna delle date giornaliere aderisce al bordo destro della cartografia, con bordo superiore e altezza coincidenti; quattro tab di uguale altezza riempiono il supporto bianco piatto, con filetto neutro e senza ombra, come i livelli della mappa principale. L’allineamento segue il riquadro della mappa anche al cambio data e al ridimensionamento, senza scarto aggiuntivo di 12px. Il gutter destro di 60px appartiene al contenitore esterno e non viene sottratto una seconda volta alla mappa. Sotto 1000px le colonne si impilano; stampa e fallback mantengono i contenuti.

### Leggibilità e navigazione delle notizie

Ogni notizia usa un unico link `home-news__link` con nome accessibile ricavato dal titolo e miniatura decorativa; data e destinazione sono conservate. Su desktop la griglia interna affianca la miniatura da 132×88px al corpo. Le categorie News Meteo e News Extra si affiancano da 768px, con margini 16/60px e intervallo 32px. Titoli da 28px e filetti navy distinguono le categorie; i filetti neutri fra le notizie accompagnano il passo verticale di 24px. Ogni colonna è un container `news-column`: sotto 450px interni il titolo occupa tutta la larghezza, seguito da miniatura 64×48px e data sulla seconda riga. Sotto 768px le categorie si impilano; il modello dipende dalla larghezza effettiva della colonna, anche nei due binari del tablet. Le quattro date della mappa giornaliera passano dalla colonna laterale a una griglia 2×2 sopra la mappa, senza ombre o sovrapposizioni, conservando tastiera, zoom e selezione. Entro 600px l’annuncio booklet si limita alla larghezza disponibile meno i 76px riservati ai margini e al confronto; il formato mobile dell’Atlante mantiene il rapporto 3:1 quando si riduce. Tutto l’artwork rimane visibile con `contain`.

### Miniature editoriali

Le quattordici miniature selezionate dall’utente (notizie 1–6 e 9–16) usano immagini editoriali rigenerate con ImageGen integrato: navy `primary`, blu freddi e bianco con accenti arancio `accent`, trattamento pittorico semirealistico e soggetti distinti legati alle notizie. Nessun logo, testo o play è incorporato. `assets/news/editorial-v1/` conserva PNG master e WebP da 720×540px, prompt e provenienza; `data/home-news-art.json` collega gli originali alle sostituzioni senza modificare le fonti. Il generatore applica gli stessi asset alle tre notizie di Prima pagina. Layout, link, titoli e date restano quelli correnti; gli originali restano nella copia acquisita. Queste immagini sono illustrazioni, non fotografie documentarie degli eventi o mappe di dati meteorologici.

### Navigazione delle previsioni sintetiche

Le sette date usano tab daisyUI su una griglia uniforme, con giorno abbreviato da 14px sopra il numero da 24px e nome accessibile completo. Ogni tab misura almeno 44px di larghezza e 64px di altezza; il giorno selezionato usa navy, testo bianco e filetto inferiore arancio da 3px. Le date restano tutte visibili: sette colonne sopra 600px, quattro colonne e poi tre entro 600px. «Meteo 15gg» è un link separato dalla tablist, a fianco su desktop e sotto a destra sul telefono, con bersaglio minimo di 44px. Focus, frecce, Home/End, fallback ad ancore e stampa di tutte le sette narrazioni sono conservati.

### Azioni delle previsioni sintetiche

Le azioni sotto ogni riepilogo sono pulsanti-link daisyUI distinti: «Previsioni meteo complete» usa `lab-btn-primary` navy con testo bianco e chevron a destra; «Guarda il Video Meteo» usa `lab-btn-primary lab-btn-outline`, superficie bianca, bordo navy e icona play a sinistra. Conservano copy e destinazioni acquisiti e il dialog locale delle risorse assenti; Domani apre la pagina locale. Bersagli alti almeno 48px, padding 12×16px, intervallo di 12px e margine superiore di 24px rendono separate le azioni. Angoli retti, nessuna ombra, focus navy e testo su più righe seguono il sito; entro 600px i pulsanti occupano la larghezza del modulo e si impilano. La stampa continua a omettere le azioni.

### Ritratto del curatore

La firma «A cura di Elia Guarnieri» nelle previsioni sintetiche affianca il ritratto modificato con ImageGen integrato: giacca navy, sfondo blu con accento arancio e spilletta WF. Il componente daisyUI `lab-avatar` mantiene il taglio quadrato, 64×64px, senza cornice o angoli arrotondati. Immagine e firma sono allineate al centro con intervallo di 12px; il nome è in grassetto e la dicitura da 14px precede il nome da 18px su una seconda riga, con misura massima 160px. Il titolo di sezione e il gruppo si dispongono su due righe quando necessario, con 24px prima della navigazione delle date. `data/site.json` possiede riferimento e testo alternativo; `assets/people/elia-guarnieri-v1/` conserva reference originale, PNG master, WebP runtime da 640px e prompt. Il ritratto resta presente senza JavaScript e in stampa.

### Anteprima video

Il poster della home usa la foto modificata con ImageGen integrato in `assets/video/presenter-studio-v2/`: il presentatore deriva dalla foto fornita dall’utente, indossa giacca e pantaloni neri e il pannello dello studio mostra «Dati WF». PNG master, WebP runtime e prompt sono conservati insieme; la prima composizione resta in `presenter-studio-v1/`. Il play è un overlay Heroicons separato dalla foto, centrato nel poster: 56×56px, icona da 28px, superficie navy al 90%, filetto e icona bianchi. È decorativo, senza controllo annidato; l’intero link mantiene focus e dialog di disponibilità locali. Il rapporto 1663:945 resta invariato e il poster occupa tutta la larghezza disponibile. La didascalia conserva la data acquisita; l’immagine modificata non rappresenta un video appena registrato.

### Altri strumenti meteo

La sezione `#home-tools` mantiene il titolo visibile «Altri strumenti meteo» da 24px e un menu daisyUI aperto, su carta bianca con filetti neutri. Da 768px le tre destinazioni Meteo Record, Radar e Webcam occupano colonne uguali; entro 767px si impilano nell’ordine del documento con separatori orizzontali. Ogni link dispone un’icona Heroicons outline da 28px a sinistra e, a destra, titolo condensato da 22px, descrizione da 16px e stato da 14px. Le icone sono `flag`, `signal` ed `eye`; la freccia d’azione è da 18px. Il padding del link è 20px verticali e 16px orizzontali, con 12px fra icona e testo e 8px fra le righe. Nomi, descrizioni e stati restano testo visibile e associato semanticamente al link.

Radar usa la superficie fredda `info` e lo stato in grassetto «Apri il radar»: apre il livello locale, conserva l’inquadratura e sposta il focus alla relativa tab. Meteo Record e Webcam dichiarano «Non disponibile nella copia» e aprono il dialog esistente con un messaggio specifico sulla mancata acquisizione; gli indirizzi originali restano nei dati del link. Hover usa `search-hover`; focus navy da 2px interno e angoli retti mantengono leggibili gli stati. Senza JavaScript Radar raggiunge l’ancora della mappa e gli altri link l’avviso locale. La stampa omette il menu.

### Banner WhatsApp

Prima del gruppo di condivisione, lo slot `home-module:community` contiene un banner grafico `aside` con il nome The weather forecast, la frase «Il meteo, a portata di chat.» e l’etichetta WhatsApp, tutti derivati da `data/site.json`. Il marchio WhatsApp riusa l’SVG locale acquisito `74340fa0a487-social_mobile_whatsapp.svg`: simbolo flat bianco su fondo trasparente, senza sfumature o riquadro verde. Il verde del solo banner è definito dalla proprietà locale `--whatsapp-surface` (`#075e54`): non diventa un colore globale dell’identità navy/arancio. Testi bianchi e sottotitolo bianco all’85% mantengono la leggibilità; il banner conserva font condensati e angoli retti del sito.

Su desktop banner e condivisione occupano la stessa riga, separati da 24px. Il banner compatto dispone logo da 40px, testo flessibile ed etichetta finale, con intervallo di 12px e padding 12×16px; titolo da 20px, corpo e label da 16px. Sotto 768px i due gruppi si impilano con 16px di intervallo. Entro 600px il banner usa logo da 36px su due righe, testo su una seconda colonna, padding 12px e label da 14px sotto il testo. Il banner è un elemento puramente grafico: per esplicita richiesta dell’utente non contiene link, pulsanti, tabindex o inviti «Iscriviti» e non introduce uno stato di canale da configurare. Rimane leggibile senza JavaScript; la stampa lo omette insieme alla sezione di condivisione.

### Condividi

La sezione prima del footer resta aperta su carta bianca con filetto neutro, margini comuni, font condensato locale e angoli retti. Il gruppo «Condividi la notizia» conserva Facebook e X, nomi visibili, marchi decorativi da 20px e pulsanti uniformi da 108×44px, con 8px fra le azioni e focus navy da 2px con scarto 3px. La dicitura da 14px precede i pulsanti; sul telefono entrambi si estendono in colonne uguali. Il gruppo di chiusura usa padding verticale da 24px. Le destinazioni acquisite e il dialog locale sono conservati; la stampa omette il gruppo. I collegamenti promozionali al canale WhatsApp e alla fonte preferita Google della versione acquisita sono omessi dal redesign. Il nuovo banner WhatsApp resta grafico e privo di destinazione.

### Identità e footer condiviso

The weather forecast riusa navy, arancio e carta del sito. Il monogramma WF ha lettere disegnate come tracciati, con terminali e raccordi arrotondati che riprendono il carattere morbido del lettering precedente, e un sole circolare arancio sopra la F; il wordmark affianca il nome in Nunito Sans 900 convertito in tracciati. Questo lettering appartiene all’asset del marchio e non cambia la tipografia CSS dell’interfaccia. `assets/brand/the-weather-forecast/` conserva mark e wordmark, varianti chiare e a colori, icona Apple da 180px e manifest con palette, font, licenza OFL e hash. `scripts/build-weather-brand.py` rigenera gli asset dal font locale; la rigenerazione è separata dalla normale build CSS. Gli asset precedenti e gli originali acquisiti mantengono la propria provenienza.

Il footer comune a Home, Milano e Domani chiude la pagina su superficie fredda `tabs`, con filetto superiore arancio da 3px e angoli retti. Gli stili condivisi sono in `redesign/style.source.css`. La griglia affianca un’area flessibile a una colonna fra 260 e 420px, con intervallo orizzontale da 40px; sulla home il supporto è da 300px con intervallo 32px, coerente con gli altri capitoli. L’identità a sinistra ha fondo navy, testo bianco, padding da 28px e wordmark chiaro largo al massimo 440px. Il marchio collega Home con un nome accessibile. La dicitura di progetto è omessa su richiesta dell’utente; la fonte da 14px, misura massima 65ch e bianco all’85%, conserva il credito «iLMeteo.it e rispettivi autori» e le acquisizioni dell’8 e 9 ottobre 2026. Il footer non attribuisce alla nuova identità una società, un copyright societario o servizi legali della fonte.

A destra, il titolo visibile «Esplora le previsioni» da 22px nomina la navigazione verso Meteo Italia, Milano, Domani, Meteo nel mondo e Versione acquisita. Il menu daisyUI usa due colonne, intervalli orizzontali da 24px, filetti neutri da 1px e frecce decorative Heroicons `chevron-right` da 20px; i link sono da 16px con bersagli alti almeno 48px. Hover e focus schiariscono e sottolineano la riga; il focus ha outline da 2px nel colore del testo, con scarto da 3px.

Il padding esterno è 32px sopra, 16px a sinistra, 60px a destra e 80px sotto per lasciare libero il FAB. Entro 767px le aree si impilano con 24px di intervallo, padding dell’identità da 20px e link su una colonna. In stampa fondo e identità tornano su carta bianca con testo navy e il `picture` mostra il wordmark a colori, largo al massimo 320px; fonti e collegamenti restano leggibili. Il footer termina direttamente la pagina, senza fascia bianca aggiunta al body.

## Confronto e movimento

Il pulsante daisyUI di confronto resta fisso al bordo destro e centrato verticalmente, largo 44px e alto almeno 188px. Collega Home, Milano e Domani alla stessa pagina dell’altra versione. Il CSS è isolato e usa Nunito Sans locale con licenza OFL. Icona SVG comune alle due versioni; focus interno visibile e controllo nascosto in stampa.

La tendina orizzontale dura 520ms, da sinistra verso il redesign e da destra verso l’originale. Fallback di 450ms nei browser privi di View Transitions; movimento ridotto usa navigazione immediata. Il passaggio ordinario tra pagine non anima la tendina. I collegamenti funzionano anche senza JavaScript e storage.

## Sorgenti

`redesign/*.html` sono i sorgenti modificabili delle tre pagine. `redesign/style.source.css` possiede anche identità e footer condiviso; insieme a `redesign/home.source.css` possiede gli stili compilati; non modificare manualmente `style.css` o `home.css`. `ui.js` condivide tastiera delle tab e aggiornamenti per fotogramma; `app.js` gestisce composizione e selettori delle mappe; `icons.js` applica i cataloghi delle icone; `weather-map-base.js` crea la base Leaflet condivisa; `primary-weather-map.js` possiede le sei viste, il radar e l’accessibilità; `forecast-interactive.js` possiede i quattro giorni; `world-weather-map.js` possiede mappa mondiale, selezione dei paesi, combobox e ricerca città. `primary-weather-map.css` e `forecast-interactive.css` sono sorgenti cartografici scritti a mano. `data/leaflet-weather.mjs` conserva i valori sintetici; il catalogo generato in `assets/maps/leaflet-weather/` separa dati e runtime. `originale/snapshot.js` e `snapshot-data.js` conservano i controlli dei dati congelati. `version-nav.source.css`, `version-nav.js` e `scripts/version-navigation.mjs` possiedono il confronto comune. `pnpm build:ilmeteo` genera cataloghi, fallback, CSS e pulsanti di confronto senza sostituire i contenuti delle mappe. `scripts/check-primary-weather-map.mjs` e `scripts/check-forecast-interactive.mjs` verificano le copie esportate, con prove in `reports/ilmeteo-leaflet-layers/` e `reports/ilmeteo-map/`.

`scripts/build-home-modules.mjs`, incluso in `pnpm build:ilmeteo`, ricostruisce soltanto gli slot marcati `home-module:opening`, `sidebar`, `resources` e `community` di `redesign/index.html`: Prima pagina riusa le prime tre notizie dell’elenco conservato; le narrazioni e la provenienza vengono da `data/supplementary.json`, mentre identità, firma visibile e banner WhatsApp vengono da `data/site.json`; la sezione mondiale dal catalogo `assets/maps/world/catalog.js`, generato prima degli slot da `scripts/build-world-map.mjs`; contenuti, destinazioni e formati pubblicitari da `data/home-promotions.json`. Rigenera il manifest `assets/advertising/campaign-v4/manifest.json` con hash delle WebP, riferimenti ai PNG e ai prompt; reference e licenze sono conservate in `assets/advertising/references/`. Gli artwork precedenti restano conservati nelle cartelle delle campagne. Confronto con la home osservata il 13 ottobre 2026 ed evidenze browser della copia esportata sono in `reports/ilmeteo-home-comparison/comparison.json` e `verification.json`, con screenshot e anteprima di stampa nella stessa cartella. La verifica corrente della home copre 1280, 897, 768, 375 e 320px, selezione sulla mappa e da combobox, alias e accenti, stati di ricerca città, tastiera, movimento ridotto, assenza di scorrimento orizzontale, fallback senza JavaScript e stampa.

## Struttura della home e componenti daisyUI

La home `redesign/index.html` è HTML autonomo e semantico: header, navigazioni nominate, main con titolo visibile e accessibile, sezioni e footer. Non carica CSS incorporato, `responsive_template.css`, `snapshot.js` o i dati di inizializzazione della pagina acquisita. Navbar, menu e sottomenu nativi details/summary, ricerca input, select, tab, pulsanti, notizie card, avvisi modal e footer usano i componenti daisyUI con prefisso `lab-`. Le icone dei menu restano SVG ufficiali Heroicons. Il tema locale `ilmeteo` in `redesign/home.source.css` riusa navy, arancio, superfici fredde, raggi e font condensati correnti; `pnpm build:ilmeteo` compila `home.css` prima degli stili condivisi. Il CSS custom resta per composizione, cartografia, identità e responsività.

`home-ui.js` possiede ricerca locale della navbar, apertura/chiusura dei risultati, tab delle sette previsioni sintetiche, messaggi per destinazioni assenti e ingombro del FAB su annunci e ricerca mondiale; `world-weather-map.js` possiede la navigazione mondiale e la ricerca separata di paesi e città; `app.js` conserva le migliorie condivise, mappe, player e icone; i cataloghi conservano dati e asset. I controlli sono pulsanti nativi, i sottomenu usano details, il salto al contenuto precede la navbar. L’avviso locale è un dialog daisyUI con chiusura nativa, Escape e focus confinato, riusato anche da Accedi e video. Rimangono testo del riepilogo principale, sette narrazioni acquisite, sedici notizie, navigazione, collegamenti di condivisione e attribuzioni nel footer di progetto. Gli slot pubblicitari vuoti, template di geolocalizzazione, aree di image-map non collegate e i pannelli cartografici dismessi sono omessi dal runtime; i contenuti della fonte restano in `originale/` e `sources/`. Il confronto si ricostruisce senza duplicati indipendentemente da indentazione e ordine degli attributi.


### Mappa giornaliera interattiva

Il contenitore `.forecast-interactive` ritaglia esplicitamente pannelli, cartografia e marker con `overflow: hidden` nel foglio sorgente dedicato. Il ritaglio si applica al contenitore stesso, che Leaflet rende anche `.leaflet-container`, e impedisce lo scorrimento orizzontale dell’intera pagina quando la mappa si adatta al telefono. Zoom, trascinamento, marker e ripristino dell’inquadratura restano confinati alla sua area; i fallback di stampa e senza JavaScript mantengono la propria rappresentazione.

La sezione dei quattro giorni usa Leaflet 1.9.4 con GeoJSON Natural Earth locale: una sola istanza conserva zoom e posizione al cambio data. I venti marker regionali mostrano il set meteo originale outline; navy, bianco e arancio seguono il sito. `forecast-interactive.css` possiede i ruoli cromatici come alias dei token comuni: mare `search-hover`, Italia `paper`, paesi circostanti `tabs`, confini regionali navy al 65% e confini esteri `search-rule`. Hover e selezione aggiungono rispettivamente la superficie `search-button` e una tinta arancio al 16%; il popup conserva il nome e la condizione, così il colore non è l’unico segnale. Zoom, trascinamento, pinch e tastiera sono disponibili; la rotella è disattivata per conservare lo scorrimento della pagina. I comandi hanno bersagli 44×44px e gli zoom si disabilitano ai limiti; Mostra tutta Italia ripristina l’inquadratura. L’overview si riadatta al cambio di viewport; zoom e spostamenti scelti dall’utente sono conservati. Clic sulla regione, clic sul marker, Invio e Spazio aprono lo stesso contenuto del popup. Il contenitore interattivo è collegato semanticamente alle tab, senza fermate di tabulazione sulle immagini nascoste. Libreria, licenza e catalogo sono locali e non richiedono fetch, servizi cartografici o chiavi API; `pnpm build:ilmeteo` esegue anche `scripts/build-dynamic-forecast.mjs`, rigenerando catalogo, SVG e CSS Leaflet isolato. Le immagini vettoriali restano il fallback senza JavaScript e in stampa. L’overlay dedicato `forecast-interactive.css` è sorgente scritto a mano, non CSS compilato. I due file della mappa fanno parte dell’elenco di runtime esportato; le immagini ufficiali della distribuzione Leaflet conservano fonti e hash in `assets/vendor/leaflet/images-manifest.json`. `scripts/check-forecast-interactive.mjs` verifica la copia esportata su desktop, viewport stretti, stampa, tastiera e movimento ridotto, con prove in `reports/ilmeteo-map/`.

### Icone meteo originali

Nei marker della mappa giornaliera il sole usa l’accento arancio `#f28c18`, anche quando emerge dalla nuvola; contorni delle nuvole e pioggia restano navy. Le icone eseguono un gesto di 4,4 secondi all’ingresso della mappa in vista e al cambio giorno: leggera oscillazione dei raggi, deriva delle nuvole e caduta delle gocce. L’animazione agisce soltanto sui tracciati SVG, senza spostare il marker geografico o la sua area attivabile. Fuori viewport, a scheda nascosta e con movimento ridotto i pittogrammi sono fermi; il colore del sole rimane arancio. Originali SVG, condizioni e cataloghi restano conservati.

La home usa `assets/controls/weather-outline/`: SVG originali su griglia 24×24, tratto 1,5px e terminali/giunzioni arrotondati, compatibili visivamente con Heroicons outline ma non appartenenti alla libreria ufficiale. Sole, luna, nuvole, varianti giorno/notte, pioggia, pioviggine, pioggia intensa, neve, precipitazioni miste, temporali, nebbia, vento e temperatura hanno geometrie dedicate. Il catalogo locale funziona anche in file://. Tab meteo, ticker e marker interattivi e di fallback usano questo set; i comandi generali mantengono Heroicons. Le condizioni illustrative e le coordinate restano invariate. Manifest e SVG originali sono conservati nella cartella del set.

La mappa interattiva mostra i confini delle 20 regioni italiani (fonte ISTAT / geojson-italy, CC-BY-4.0, originali conservati in `forecast-interactive/sources/`). Ogni regione ha un solo marker, collocato al suo interno e sempre visibile; il cambio giorno aggiorna tutte le condizioni illustrative. Il clic sul simbolo o sulla regione mostra il nome regionale e la condizione. I simboli sul telefono sono ridotti a 26px; zoom e tastiera restano disponibili. Su richiesta, la didascalia sotto la mappa giornaliera è nascosta anche in stampa; fonti e descrizione accessibile restano conservate.
