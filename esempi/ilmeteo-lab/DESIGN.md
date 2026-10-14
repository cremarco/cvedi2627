---
name: iLMeteo · redesign incrementale
description: Il redesign costruito dall’utente sulla pagina acquisita, con confronto animato alla versione precedente.
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

L’interfaccia del redesign usa esclusivamente SVG ufficiali Heroicons 2.2.0: variante `24/outline`, tratto 1,5px e colore ereditato, con `24/solid/star` per le stelle selezionate. La famiglia copre ricerca e località, profilo, frecce dei giorni e dei selettori nativi, download, chiusure, ticker, segnalazioni, tab, player, zoom, schermo intero, confronto, simboli meteo, sole/luna, vento e valutazioni. I select mantengono il comportamento nativo e mostrano il chevron ufficiale; gli input di invio con immagine usano lo stesso SVG incorporato nello sfondo, senza perdere gli attributi o i listener originali. Marchi, ritratti, fotografie e contenuto delle mappe restano immagini della fonte. Gli originali e le licenze sono conservati in `assets/controls/heroicons/manifest.json` e `LICENSE.txt`; `scripts/build-heroicons.mjs` genera il catalogo SVG comune, caricato senza fetch anche in `file://`. `app.js` applica le icone ai controlli e ai pannelli dinamici, conservando etichette, attributi, listener e rotazioni delle frecce del vento. Le condizioni meteorologiche mantengono i codici e i testi acquisiti; i pittogrammi usano sole, luna, nuvola, nuvola con freccia, fulmine e scintille, con composizioni dei soli SVG ufficiali per sole/luna e nuvola. Le pagine acquisite conservano i loro asset; il confronto comune riusa la nuova icona `arrows-right-left`.

## Navbar e ricerca

Barra navy da 56px, attaccata al bordo superiore. Il logo da 56px usa `assets/brand/ilmeteo-modern-v1.png`: lettering e monogramma resi bianchi, sole arancio. Il marchio apre il menu tramite un pulsante nativo. Voci acquisite senza Contatti; la voce attiva ha il segno arancio sopra. La ricerca sta a destra, con campo bianco, angoli retti, focus arancio e pulsanti su superficie fredda. Sulla home logo, menu e ricerca occupano tre aree distinte: solo le voci del menu scorrono orizzontalmente, senza andare a capo né trascinare fuori la ricerca. Entro 767px la navbar misura 100px: logo e ricerca nella prima riga da 56px, voci scorrevoli nella seconda da 44px. La ricerca è alta 44px; popup e sottomenu restano ancorati ai rispettivi controlli, entro la viewport e fuori dal ritaglio della fila scorrevole. Milano e Domani conservano la propria struttura.

Link e summary dei sottomenu condividono la centratura verticale, il padding orizzontale da 12px e il bordo superiore da 3px, trasparente per le voci non attive. I summary usano flex con 8px fra testo e chevron; tutti i controlli sono alti 56px su desktop e 44px nella seconda riga mobile. Hover e sottomenu aperto usano navy profondo; il chevron aperto è arancio. Il focus da tastiera ha un outline arancio interno da 2px, visibile su tutte le voci.

La ricerca distingue campo vuoto, nessuna corrispondenza e località non acquisita. Le prime due condizioni sono spiegate nel popup con uno stato annunciato e il suggerimento di consultare Milano; gruppi e colonne privi di risultati sono nascosti. Una località presente nell’elenco ma non acquisita usa il dialog esistente con il nome della destinazione; gli altri collegamenti conservano il messaggio generale della copia. Bozza e focus restano disponibili per correggere la ricerca; Escape chiude i risultati e i menu.

Sulla home, Home è l’unica pagina corrente nella navigazione principale. Radar nella navbar e negli altri strumenti porta alla mappa locale, seleziona il livello Radar e sposta il focus alla relativa tab conservando l’inquadratura. Il menu completo conserva le destinazioni acquisite con l’etichetta visibile «Radar originale · non disponibile». Senza JavaScript i collegamenti locali raggiungono la mappa tramite un’ancora.

## Home

La pagina usa tutta la larghezza da 1024px e non ha margini laterali dell’area principale. Il fondale acquisito è omesso. L’apertura contiene una pubblicità del booklet, il titolo visibile Previsioni Meteo Italia con la data dell’edizione acquisita — giovedì 8 ottobre 2026, ore 19:56 — e tre notizie di Prima pagina tratte dalle sedici notizie conservate. La navigazione Accedi riusa il messaggio locale. Seguono mappa principale e riepilogo, carte giornaliere con sidebar pubblicitaria, l’elenco completo delle sedici notizie, previsioni sintetiche dei sette giorni e video, Meteo nel mondo, social e informazioni legali. Le mappe, il ticker, il riepilogo e i controlli conservano il redesign corrente.

### Gerarchia e moduli editoriali

Il titolo visibile usa il font condensato locale in grassetto, 28px con interlinea 1,2, ridotti a 26px sotto 600px. I titoli di sezione sono da 24px con interlinea 1,2; Prima pagina presenta tre notizie in colonne `1.2fr 1fr 1fr`, con intervalli di 24px, immagini da 120×110px e titoli da 18px. Sotto 1000px le notizie si impilano con intervalli di 16px; sotto 600px la miniatura è 84×84px. Data d’edizione e intestazioni possono andare a capo senza comprimere i titoli. I moduli mantengono le superfici aperte del sito, con margine sinistro da 16px e spazio destro da 60px per il confronto.

La regione giornaliera affianca il modulo delle mappe a una sidebar da 300px, con intervallo di 24px; sotto 1000px la sidebar segue le mappe e presenta due colonne, poi una sotto 600px. La zona delle previsioni sintetiche usa la stessa sidebar da 300px per iLMeteo TV e LAB UX.

Le sette previsioni sintetiche conservano le narrazioni acquisite dall’8 al 14 ottobre 2026 e la firma Antonio Sanò, generate dai record di `data/supplementary.json`. Titolo della data da 22px, corpo da 18px con interlinea 1,55 e misura massima 70ch, filetto neutro fra i pannelli. Le date usano tab daisyUI piatte da almeno 44px, navy su superficie fredda e navy pieno per la selezione. Con JavaScript c’è un solo pannello visibile e un solo tab nella sequenza di tabulazione; frecce, Home, End, Invio e Spazio permettono la scelta. Senza JavaScript tutti i sette articoli e i collegamenti restano disponibili nel documento; in stampa tutte le narrazioni sono visibili e i selettori sono omessi. Poster, logo e collegamenti di iLMeteo TV restano quelli acquisiti; le destinazioni non disponibili riusano il dialog locale. Le precedenti mappe e opzioni di Europa e Mondo restano conservate nella copia acquisita e nelle fonti.

### Mappa mondiale e ricerca

La sezione unica «Meteo nel mondo» (`#international-world`) sostituisce i due moduli Europa e Mondo. La composizione aperta affianca la cartografia a una colonna da 300px, con intervallo da 24px, margini comuni e titolo condensato da 28px. La mappa misura 360px in altezza. Entro 1000px la ricerca segue la cartografia: i due form occupano una colonna e lo stato del paese l’altra. Entro 600px form e stato si impilano nell’ordine del documento e la mappa misura 260px. Input, risultati e pulsanti daisyUI hanno etichette esplicite, bersagli di almeno 44px, angoli retti e focus navy visibile; testi e stati possono andare a capo.

Leaflet 1.9.4 usa la proiezione geografica EPSG:4326 per mostrare tutto il mondo, compresa l’Antartide. I 242 paesi e territori provengono dalla cartografia Natural Earth 1:50m locale di pubblico dominio. Mare `search-hover`, terre `paper`, confini navy e hover `--color-info` del tema daisyUI (corrispondente a `search-button`) riusano i token correnti; il paese selezionato ha riempimento arancio `accent` al 28%, bordo più marcato, nome visibile e stato annunciato. Il riepilogo del paese è separato da un filetto arancio da 3px. La mappa è geografica e non mostra condizioni meteorologiche. La selezione inquadra il poligono principale del paese per evitare che territori lontani o la linea del cambio di data allarghino inutilmente la vista; tutte le geometrie restano nel catalogo.

Clic, Invio e Spazio selezionano lo stesso paese. I tracciati usano una sola fermata di tabulazione: frecce, Home ed End spostano il focus fra i paesi in ordine alfabetico italiano, con nome e contorno visibili; Escape riporta il focus al contenitore. Zoom, trascinamento, pinch e tastiera permettono di esplorare la cartografia; la rotella è disattivata per conservare lo scorrimento della pagina. I comandi di zoom si disabilitano ai limiti e «Mostra tutto il mondo» ripristina inquadratura, selezione e campi. L’overview si riadatta al cambio viewport; zoom e posizione scelti dall’utente restano conservati. Movimento ridotto, scheda nascosta e mappa fuori viewport disattivano le transizioni.

«Cerca un paese» usa una combobox con elenco locale, nomi italiani e alias; la ricerca ignora maiuscole e accenti e distingue nessuna corrispondenza, risultati e selezione. Frecce, Home, End e Invio scelgono un risultato; Escape chiude l’elenco senza cancellare il testo. La ricerca di città resta separata: Milano apre la pagina locale quando non è selezionato un paese oppure quando è selezionata Italia; campo vuoto e altre destinazioni ricevono un messaggio esplicito, mantenendo la bozza. Le previsioni internazionali sono dichiarate non acquisite. Il collegamento nativo a Milano resta disponibile in tutti gli stati, anche senza JavaScript, e conserva il focus quando cambiano i messaggi.

Libreria e catalogo sono locali, senza fetch, tile remoti o chiavi API. `scripts/build-world-map.mjs` genera `assets/maps/world/catalog.js`, l’SVG 1200×600 `world.svg` e il manifest con provenienza, licenza, configurazione e hash, riusando l’originale geografico conservato in `assets/maps/forecast-v3/sources/`. La semplificazione conserva tutti i paesi e gli anelli della fonte. Senza JavaScript restano la mappa completa, un datalist con 242 nomi, l’avviso sul comportamento interattivo e il link a Milano. La stampa usa lo stesso SVG e conserva attribuzione, stato del paese e collegamento locale, omettendo form e comandi.

### Campagne pubblicitarie autonome

Gli annunci sono creatività raster complete di terzi, con copy e CTA dentro l’immagine; il wrapper mostra soltanto «Pubblicità», un collegamento esterno e testo alternativo con messaggio e azione. L’identità navy/arancio resta propria dell’interfaccia meteo: le campagne mantengono palette, caratteri e marchi indipendenti. Il booklet usa indaco, lime e rete metro; TTC Bicocca usa bordeaux, bianco, carattere condensato PT Sans Narrow e fotografia; Caffè TTC usa verde petrolio, legno e fotografia calda; Atlante usa giallo, nero e magenta con tre interpretazioni della tazza; LAB UX usa rosso, bianco e nero con griglia editoriale. Inter e PT Sans Narrow appartengono alle reference e al lettering raster delle campagne: non sono famiglie CSS caricate nella home e non diventano token tipografici del sito.

I cinque formati hanno dimensioni proprie: booklet billboard 970×250, TTC Bicocca half page 300×600, Caffè TTC medium rectangle 300×250, Atlante leaderboard 728×90 e LAB UX small banner 300×100. Booklet e Atlante hanno creatività mobili dedicate, rispettivamente 300×250 e 300×100, selezionate sotto 600px tramite `picture`. Gli annunci non hanno cornici, card, ombre o angoli introdotti dal wrapper; eventuali forme interne appartengono all’artwork. Il focus del link è navy da 3px con scarto 4px. Le creatività scalano entro lo spazio disponibile, restano consultabili senza JavaScript e sono omesse in stampa. Conservare PNG originali, prompt, reference, fonti e licenze; il runtime usa le WebP in `assets/advertising/campaign-v4/`.

Il titolo della previsione è un ticker arancio da 38px sotto la navbar, con icona di pioggia bianca. Contiene soltanto l’avviso meteo, con punti bianchi fra le ripetizioni e 20px per lato. Un solo elemento sorgente viene ripetuto in funzione della viewport. Scorrimento lineare continuo: un elemento ogni 19s; pausa al passaggio del puntatore e a scheda nascosta. Movimento ridotto mantiene il contenuto fermo e accessibile.

“Segnala il tempo nella tua città” è un FAB daisyUI a singola azione sulla home, fisso in basso a destra a 16px dai bordi e rispettoso delle safe area. Il pulsante navy con testo bianco conserva l’etichetta completa su due righe, l’icona ufficiale Heroicons pencil-square e il collegamento acquisito. Altezza minima 48px, focus visibile, nessun menu aggiuntivo. Al passaggio del puntatore, al focus da tastiera o alla pressione, la matita compie un breve gesto di scrittura di 320ms; niente movimento continuo e l’animazione si disattiva con `prefers-reduced-motion`. Rimane visibile durante lo scorrimento; nei viewport bassi si sposta a 60px dal bordo destro per evitare il controllo di confronto. Entro 767px il pulsante resta compatto a icona 44×48px nel margine libero, con etichetta accessibile completa e title anche senza JavaScript; i dati legali lasciano lo stesso spazio laterale. Su desktop, quando l’ingombro esteso si sovrapporrebbe a una creatività pubblicitaria, `home-ui.js` applica `data-clear-ad` e il pulsante diventa un’icona da 44×48px nel margine libero; etichetta accessibile e title conservano il nome completo. Lo stesso controllo usa `data-clear-world` quando la forma estesa coprirebbe i campi o gli stati della ricerca mondiale. Su desktop la forma estesa ritorna quando non copre annunci o ricerca, senza nascondere l’azione o gli altri controlli. Il footer include 80px di spazio inferiore per lasciare liberi i collegamenti dal FAB; il body non aggiunge una fascia bianca dopo il footer. La stampa omette il FAB. Il CSS daisyUI è compilato nell’overlay con prefisso lab-, limitato a button e fab.

Le tab dei giorni sono piatte, navy su fondo freddo, estese ai bordi. “Generale” è selezionata con fondo navy e testo bianco. La fila rimane alta 44px a tutte le larghezze, senza wrapping; scorre e mostra una sfumatura arancio soltanto sul lato dove rimangono altre schede. Il gradiente è l’indicatore richiesto dall’utente, non decorazione.

Il riepilogo `#html_pre1` apre con “Perturbazione in transito sull’Italia.” in rosso: titolo da 26px, 24px sotto 600px, con interlinea 1,2 e 24px prima del testo. I tre marcatori “Venerdì:”, “Sabato e Domenica:” e “PROSSIMA SETTIMANA:” sono in navy e grassetto, su una riga propria, con 6px prima della rispettiva descrizione. Il corpo resta normale da 18px, con interlinea 1,55 e misura massima 65ch. Fra i periodi ci sono un filetto neutro da 1px e spazi di 20px sopra e sotto. Il font condensato locale e tutti i testi originali sono conservati. La composizione resta aperta, senza card o sfondo aggiunto, sia accanto alla mappa sia nel flusso mobile.

La dicitura visibile «Simulazione didattica · valori illustrativi» precede la cartografia e i livelli, su superficie fredda con testo navy da 14px e interlinea 1,4. Occupa una riga propria a tutta larghezza del modulo, rimane disponibile senza JavaScript e in stampa e non aggiunge una data al radar.

Le sei mappe principali — Tempo, Precipitazioni, Neve, Temperature, Venti-Mari e Radar — usano una sola istanza Leaflet 1.9.4 e la stessa base geografica locale della mappa giornaliera. `weather-map-base.js` crea entrambe le basi con paesi Natural Earth, venti regioni ISTAT / geojson-italy e gli stessi token: mare `search-hover`, Italia `paper`, paesi circostanti `tabs`, coste navy e confini esteri `search-rule`. Tempo mostra venti icone del set originale outline; Precipitazioni usa una scala sequenziale navy per regione; Neve mostra aree sulle quote alte; Temperature usa navy per il freddo e arancio per il caldo; Venti-Mari mostra frecce ufficiali Heroicons e cinque aree marine con altezze illustrative; Radar sovrappone contorni geografici di intensità crescente. Legende, valori e popup rendono leggibili le scale; sul telefono i numeri regionali compaiono solo con ingrandimento sufficiente. Le sei viste sono illustrative e non richiedono dati remoti o chiavi API. I dati sono separati in `data/leaflet-weather.mjs`; `scripts/build-leaflet-weather.mjs` genera il catalogo e le immagini SVG per stampa e senza JavaScript in `assets/maps/leaflet-weather/`. Gli originali e i manifest delle risorse cartografiche attive restano conservati; le varianti raster dismesse sono rimosse dalla cartella del sito.

Il radar conserva sette orari illustrativi, dalle 17:20 alle 23:20 dell’8 ottobre 2026. Ogni fotogramma è un insieme di contorni GeoJSON generati localmente: una banda di echi si sposta gradualmente verso sud-est, con navy chiaro, arancio e `notice` per intensità crescente. Sotto la cartografia la timeline radar mostra i sette orari, dalle 17:20 alle 23:20, e un cursore daisyUI `lab-range` con indicatore circolare arancio. La traccia distingue le ore passate in navy dalle ore previste in `notice`, con le etichette native «Ore passate», «Ora» e «Ore previste». Il marcatore «Ora» resta fisso sul fotogramma delle 19:20 identificato nei dati come `phase: ora`, indipendentemente dal cursore selezionato. L’orario corrente è in grassetto e sottolineato. Il trascinamento, le frecce, Home ed End selezionano il fotogramma e fermano la riproduzione. Il pulsante Riproduci resta allineato a destra; la data visibile resta omessa. Riproduzione, pausa, arresto all’ultimo fotogramma e movimento ridotto sono conservati. Il cambio tab, la scheda nascosta e l’apertura di un dettaglio regionale fermano la riproduzione. Il nome accessibile della mappa e dei dettagli conserva data, orario e natura illustrativa. Zoom e trascinamento agiscono sulla cartografia geografica e sui suoi livelli; Mostra tutta Italia ripristina la vista, mentre lo schermo intero ingrandisce lo stesso modulo. Su telefono zoom e schermo intero hanno bersagli 44×44px; sotto 361px il reset è omesso per lasciare spazio agli altri comandi.

Le quattro mappe dal 9 al 12 ottobre 2026 sono illustrazioni vettoriali con un’unica base Natural Earth 1:50m di pubblico dominio. Coste, isole, confini, inquadratura 1200×1180 e venti punti geografici sono identici fra le date: cambiano soltanto le condizioni illustrative, rappresentate dal set meteo originale outline (sole arancio, nuvole e pioggia navy). Mare azzurro freddo `search-hover`, Italia bianca `paper`, paesi circostanti `tabs`, coste navy e confini esteri `search-rule` riusano la palette del sito. Il generatore `scripts/build-forecast-maps.mjs` risolve i token di `style.source.css` anche per le immagini di stampa e senza JavaScript, separando cartografia, coordinate e condizioni dalla presentazione; sorgente geografica, licenze, hash e configurazione sono in `assets/maps/forecast-v3/`. Le precedenti rielaborazioni ImageGen, sostituite dalle mappe vettoriali, sono rimosse dalla cartella del sito.

Date e attribuzioni restano testo HTML nativo. Le immagini sono senza cornici, ombre o arrotondamenti e condividono dimensioni identiche. Sullo schermo occupano la stessa area, con una sola data visibile alla volta. Su richiesta, cartografia e blocco complessivo seguono esattamente le larghezze della mappa superiore; un ResizeObserver mantiene l’allineamento al cambio viewport. La composizione conserva il margine sinistro di 16px. Il selettore dei giorni è una colonna esterna a destra della cartografia, larga 128px, ridotta a 84px sotto 600px, con bersagli alti almeno 48px. L’immagine mantiene almeno 284px di altezza sullo schermo per lasciare spazio ai comandi sul telefono. L’inquadratura Italia usa tutta la cartografia, senza riservare spazio interno alle tab. Titolo e dimensioni restano stabili durante la selezione. I selettori sono tab accessibili, con frecce, Home, End, Tab, Invio e Spazio; stato selezionato e pannello sono collegati semanticamente. Senza JavaScript e in stampa tutte le mappe restano consultabili: due colonne su desktop e stampa, una sul telefono. Link e gestione locale sono conservati.

I sei tipi usano il componente daisyUI `lab-tabs` / `lab-tab` in una colonna a destra della mappa, fuori dalla cartografia. Le tab formano un’unica superficie bianca con filetto neutro da 1px, raggio esterno 8px, padding 4px e intervalli di 2px. Le singole tab non hanno bordi o ombre; icona e testo sono allineati in due colonne, con icone ufficiali Heroicons 2.2.0 `24/outline`, con tratto 1,5px e visualizzazione da 20px, testo da 15px e altezza minima 48px. La colonna coincide in altezza con la mappa; le sei tab si dividono uniformemente lo spazio disponibile. La selezione è navy con testo bianco e icona arancio; hover, pressione e focus hanno stati distinti. Il focus navy ha uno scarto di 2px dalla tab e le transizioni cromatiche da 160ms sono omesse con movimento ridotto. La colonna misura 128px, 84px sotto 600px; i bersagli mantengono almeno 48px anche quando si distribuiscono sull’altezza della mappa; sul telefono icona ed etichetta da 12px sono centrate su due righe. La mappa occupa la colonna sinistra e il player radar si dispone sotto di essa. Selezione, pannello e orientamento verticale hanno semantica tab; Tab, Invio, Spazio, frecce, Home ed End restano disponibili. Nei viewport stretti la cartografia si può ingrandire con i comandi mantenuti. La stampa omette tab e player e conserva immagine selezionata, testo e attribuzioni.

### Rifinitura della home

La sezione principale usa carta bianca, un filetto inferiore neutro e una composizione aperta. Su desktop la mappa guida la lettura a sinistra e il riepilogo occupa una colonna fra 280 e 360px a destra, separata da 32px. La sezione mantiene il margine sinistro comune di 16px, 24px sopra, 32px sotto e 60px liberi a destra per il confronto fisso. Sotto 1000px mappa e riepilogo si dispongono in una colonna, nell’ordine mappa → player → testo, evitando la compressione della cartografia sui tablet. Le tab restano a destra della mappa e sono accostate al suo bordo senza un intervallo laterale; timeline e pulsante radar sono separati dalla mappa da 8px; sopra 600px condividono una riga, mentre sul telefono la timeline occupa la larghezza completa del modulo per distanziare gli orari e il pulsante la segue su una seconda riga, allineato a destra sotto la cartografia. Contenuti, immagini, attribuzioni, zoom e selezioni restano quelli correnti.

Il ticker usa il token arancio scuro `notice` per mantenere leggibile il testo bianco; l’accento dei controlli resta `accent`. Le tab hanno bersagli alti almeno 44px e segnalano i giorni nascosti su entrambi i lati. Il riepilogo resta visibile anche sotto 770px e usa la gerarchia tipografica e la spaziatura definite sopra. I vecchi slot pubblicitari vuoti e la skin di sfondo acquisita sono omessi; le cinque campagne correnti occupano formati e posizioni espliciti. La composizione usa margini di 16px e intervalli di 24px.

Il controllo radar affianca alla timeline un pulsante daisyUI `lab-btn`, navy con testo bianco e icona ufficiale Heroicons outline da 16px: Riproduci / Pausa, oppure Avanza con movimento ridotto. Misura 80×44px, ha angoli retti e focus navy visibile; il contenitore è aperto, senza bordo, sfondo o padding. È allineato al bordo destro della cartografia e compare soltanto per Radar: sopra 600px affianca il cursore della timeline, sul telefono segue la timeline. La riproduzione si arresta quando la scheda è nascosta o viene scelto un altro livello; movimento ridotto usa Avanza e omette le transizioni. Il FAB evita il comando se rischia di coprirlo. Il cursore offre un bersaglio alto 44px, mostra tutti i sette orari anche sul telefono e comunica orario, fase (passata, di riferimento o prevista), data e natura illustrativa con `aria-valuetext`; la selezione resta sincronizzata durante la riproduzione. La stampa omette timeline e pulsante. Fotogrammi, metadati, SVG originali, fonti, hash e licenze restano conservati.

### Seguici e condividi

La sezione prima del footer è una composizione aperta su carta bianca, separata dalle notizie con un filetto neutro. Su desktop presenta tre gruppi allineati: iscrizione a WhatsApp, condivisione Facebook / X e fonte preferita su Google. WhatsApp usa un pulsante navy da almeno 72px; Google un pulsante bianco con filetto neutro della stessa altezza. Le due azioni conservano testi e loghi acquisiti, con icone da 32px e gerarchia su due righe. Facebook e X hanno nome visibile, marchio decorativo da 20px e bersagli da almeno 44px; la loro etichetta comune resta «Condividi la notizia». Gli elementi usano daisyUI `lab-btn`, font condensato locale, angoli retti e focus navy da 2px con scarto 3px. La sezione ha 28px sopra e sotto, 32px fra i gruppi e margini laterali comuni di 16px e 60px. Entro 900px i gruppi si impilano nell’ordine del documento, con 24px di intervallo e pulsanti a tutta larghezza. Destinazioni e messaggi locali restano conservati; la stampa omette la sezione.

### Footer della home

Il footer chiude la pagina con una composizione grafica a due aree sulla superficie fredda `tabs`, un filetto superiore arancio da 3px e angoli retti. Il blocco di identità a sinistra è navy con testo bianco, padding da 28px e marchio autentico da 96px: lo stesso trattamento della navbar rende bianchi lettering e monogramma, conservando il sole arancio. Il marchio collega Home con un nome accessibile. Copyright e ragione sociale sono da 32px con interlinea 1,2; dati societari da 14px con interlinea 1,6, misura massima 65ch e tinta bianca all’85%. Contenuti acquisiti e `id="year"` restano conservati.

A destra, il titolo visibile «Informazioni legali» da 22px nomina la navigazione. Privacy e Cookie Policy, Termini e Condizioni, Consensi GDPR, Accessibilità e Pubblicità mantengono destinazioni e messaggi locali. Il menu daisyUI è una griglia a due colonne, con intervalli da 24px, filetti neutri da 1px e frecce decorative Heroicons `chevron-right` da 20px; i link sono da 16px e hanno bersagli alti almeno 48px. Hover e focus schiariscono la riga; il focus navy ha uno scarto da 3px, mentre il marchio sul navy ha un outline bianco con scarto da 4px.

Le due aree sono separate da 40px. Il padding esterno è 32px sopra, 16px a sinistra, 60px a destra e 80px sotto per lasciare libero il FAB. Entro 767px le aree si impilano con 24px di intervallo: marchio da 64px, copyright da 28px, padding dell’identità da 20px e link su una colonna. In stampa fondo e identità tornano su carta bianca con testo navy, il marchio conserva i colori originali e il copyright scende a 20px; dati e collegamenti restano leggibili. Il footer termina direttamente la pagina, senza fascia bianca aggiunta al body.

## Confronto e movimento

Il pulsante daisyUI di confronto resta fisso al bordo destro e centrato verticalmente, largo 44px e alto almeno 188px. Collega Home, Milano e Domani alla stessa pagina dell’altra versione. Il CSS è isolato e usa Nunito Sans locale con licenza OFL. Icona SVG comune alle due versioni; focus interno visibile e controllo nascosto in stampa.

La tendina orizzontale dura 520ms, da sinistra verso il redesign e da destra verso l’originale. Fallback di 450ms nei browser privi di View Transitions; movimento ridotto usa navigazione immediata. Il passaggio ordinario tra pagine non anima la tendina. I collegamenti funzionano anche senza JavaScript e storage.

## Sorgenti

`redesign/*.html` sono i sorgenti modificabili delle tre pagine. `redesign/style.source.css` e `redesign/home.source.css` possiedono gli stili compilati; non modificare manualmente `style.css` o `home.css`. `ui.js` condivide tastiera delle tab e aggiornamenti per fotogramma; `app.js` gestisce composizione e selettori delle mappe; `icons.js` applica i cataloghi delle icone; `weather-map-base.js` crea la base Leaflet condivisa; `primary-weather-map.js` possiede le sei viste, il radar e l’accessibilità; `forecast-interactive.js` possiede i quattro giorni; `world-weather-map.js` possiede mappa mondiale, selezione dei paesi, combobox e ricerca città. `primary-weather-map.css` e `forecast-interactive.css` sono sorgenti cartografici scritti a mano. `data/leaflet-weather.mjs` conserva i valori sintetici; il catalogo generato in `assets/maps/leaflet-weather/` separa dati e runtime. `originale/snapshot.js` e `snapshot-data.js` conservano i controlli dei dati congelati. `version-nav.source.css`, `version-nav.js` e `scripts/version-navigation.mjs` possiedono il confronto comune. `pnpm build:ilmeteo` genera cataloghi, fallback, CSS e pulsanti di confronto senza sostituire i contenuti delle mappe. `scripts/check-primary-weather-map.mjs` e `scripts/check-forecast-interactive.mjs` verificano le copie esportate, con prove in `reports/ilmeteo-leaflet-layers/` e `reports/ilmeteo-map/`.

`scripts/build-home-modules.mjs`, incluso in `pnpm build:ilmeteo`, ricostruisce soltanto gli slot marcati `home-module:opening`, `sidebar` e `resources` di `redesign/index.html`: Prima pagina riusa le prime tre notizie dell’elenco conservato; previsioni e attribuzione vengono da `data/supplementary.json`; la sezione mondiale dal catalogo `assets/maps/world/catalog.js`, generato prima degli slot da `scripts/build-world-map.mjs`; contenuti, destinazioni e formati pubblicitari da `data/home-promotions.json`. Rigenera il manifest `assets/advertising/campaign-v4/manifest.json` con hash delle WebP, riferimenti ai PNG e ai prompt; reference e licenze sono conservate in `assets/advertising/references/`. Gli artwork precedenti restano conservati nelle cartelle delle campagne. Confronto con la home osservata il 13 ottobre 2026 ed evidenze browser della copia esportata sono in `reports/ilmeteo-home-comparison/comparison.json` e `verification.json`, con screenshot e anteprima di stampa nella stessa cartella. La verifica corrente della home copre 1280, 897, 768, 375 e 320px, selezione sulla mappa e da combobox, alias e accenti, stati di ricerca città, tastiera, movimento ridotto, assenza di scorrimento orizzontale, fallback senza JavaScript e stampa.

## Struttura della home e componenti daisyUI

La home `redesign/index.html` è HTML autonomo e semantico: header, navigazioni nominate, main con titolo visibile e accessibile, sezioni e footer. Non carica CSS incorporato, `responsive_template.css`, `snapshot.js` o i dati di inizializzazione della pagina acquisita. Navbar, menu e sottomenu nativi details/summary, ricerca input, select, tab, pulsanti, notizie card, avvisi modal e footer usano i componenti daisyUI con prefisso `lab-`. Le icone dei menu restano SVG ufficiali Heroicons. Il tema locale `ilmeteo` in `redesign/home.source.css` riusa navy, arancio, superfici fredde, raggi e font condensati correnti; `pnpm build:ilmeteo` compila `home.css` prima degli stili condivisi. Il CSS custom resta per composizione, cartografia, identità e responsività.

`home-ui.js` possiede ricerca locale della navbar, apertura/chiusura dei risultati, tab delle sette previsioni sintetiche, messaggi per destinazioni assenti e ingombro del FAB su annunci e ricerca mondiale; `world-weather-map.js` possiede la navigazione mondiale e la ricerca separata di paesi e città; `app.js` conserva le migliorie condivise, mappe, player e icone; i cataloghi conservano dati e asset. I controlli sono pulsanti nativi, i sottomenu usano details, il salto al contenuto precede la navbar. L’avviso locale è un dialog daisyUI con chiusura nativa, Escape e focus confinato, riusato anche da Accedi e video. Rimangono testo del riepilogo principale, sette narrazioni acquisite, sedici notizie, navigazione, collegamenti social e informazioni legali. Gli slot pubblicitari vuoti, template di geolocalizzazione, aree di image-map non collegate e i pannelli cartografici dismessi sono omessi dal runtime; i contenuti della fonte restano in `originale/` e `sources/`. Il confronto si ricostruisce senza duplicati indipendentemente da indentazione e ordine degli attributi.


### Mappa giornaliera interattiva

Il contenitore `.forecast-interactive` ritaglia esplicitamente pannelli, cartografia e marker con `overflow: hidden` nel foglio sorgente dedicato. Il ritaglio si applica al contenitore stesso, che Leaflet rende anche `.leaflet-container`, e impedisce lo scorrimento orizzontale dell’intera pagina quando la mappa si adatta al telefono. Zoom, trascinamento, marker e ripristino dell’inquadratura restano confinati alla sua area; i fallback di stampa e senza JavaScript mantengono la propria rappresentazione.

La sezione dei quattro giorni usa Leaflet 1.9.4 con GeoJSON Natural Earth locale: una sola istanza conserva zoom e posizione al cambio data. I venti marker regionali mostrano il set meteo originale outline; navy, bianco e arancio seguono il sito. `forecast-interactive.css` possiede i ruoli cromatici come alias dei token comuni: mare `search-hover`, Italia `paper`, paesi circostanti `tabs`, confini regionali navy al 65% e confini esteri `search-rule`. Hover e selezione aggiungono rispettivamente la superficie `search-button` e una tinta arancio al 16%; il popup conserva il nome e la condizione, così il colore non è l’unico segnale. Zoom, trascinamento, pinch e tastiera sono disponibili; la rotella è disattivata per conservare lo scorrimento della pagina. I comandi hanno bersagli 44×44px e gli zoom si disabilitano ai limiti; Mostra tutta Italia ripristina l’inquadratura. L’overview si riadatta al cambio di viewport; zoom e spostamenti scelti dall’utente sono conservati. Clic sulla regione, clic sul marker, Invio e Spazio aprono lo stesso contenuto del popup. Il contenitore interattivo è collegato semanticamente alle tab, senza fermate di tabulazione sulle immagini nascoste. Libreria, licenza e catalogo sono locali e non richiedono fetch, servizi cartografici o chiavi API; `pnpm build:ilmeteo` esegue anche `scripts/build-dynamic-forecast.mjs`, rigenerando catalogo, SVG e CSS Leaflet isolato. Le immagini vettoriali restano il fallback senza JavaScript e in stampa. L’overlay dedicato `forecast-interactive.css` è sorgente scritto a mano, non CSS compilato. I due file della mappa fanno parte dell’elenco di runtime esportato; le immagini ufficiali della distribuzione Leaflet conservano fonti e hash in `assets/vendor/leaflet/images-manifest.json`. `scripts/check-forecast-interactive.mjs` verifica la copia esportata su desktop, viewport stretti, stampa, tastiera e movimento ridotto, con prove in `reports/ilmeteo-map/`.

### Icone meteo originali

Nei marker della mappa giornaliera il sole usa l’accento arancio `#f28c18`, anche quando emerge dalla nuvola; contorni delle nuvole e pioggia restano navy. Le icone eseguono un gesto di 4,4 secondi all’ingresso della mappa in vista e al cambio giorno: leggera oscillazione dei raggi, deriva delle nuvole e caduta delle gocce. L’animazione agisce soltanto sui tracciati SVG, senza spostare il marker geografico o la sua area attivabile. Fuori viewport, a scheda nascosta e con movimento ridotto i pittogrammi sono fermi; il colore del sole rimane arancio. Originali SVG, condizioni e cataloghi restano conservati.

La home usa `assets/controls/weather-outline/`: SVG originali su griglia 24×24, tratto 1,5px e terminali/giunzioni arrotondati, compatibili visivamente con Heroicons outline ma non appartenenti alla libreria ufficiale. Sole, luna, nuvole, varianti giorno/notte, pioggia, pioviggine, pioggia intensa, neve, precipitazioni miste, temporali, nebbia, vento e temperatura hanno geometrie dedicate. Il catalogo locale funziona anche in file://. Tab meteo, ticker e marker interattivi e di fallback usano questo set; i comandi generali mantengono Heroicons. Le condizioni illustrative e le coordinate restano invariate. Manifest e SVG originali sono conservati nella cartella del set.

La mappa interattiva mostra i confini delle 20 regioni italiani (fonte ISTAT / geojson-italy, CC-BY-4.0, originali conservati in `forecast-interactive/sources/`). Ogni regione ha un solo marker, collocato al suo interno e sempre visibile; il cambio giorno aggiorna tutte le condizioni illustrative. Il clic sul simbolo o sulla regione mostra il nome regionale e la condizione. I simboli sul telefono sono ridotti a 26px; zoom e tastiera restano disponibili. Su richiesta, la didascalia sotto la mappa giornaliera è nascosta anche in stampa; fonti e descrizione accessibile restano conservate.
