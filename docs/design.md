# Sistema visivo CVeDI

## Immagini attive · 6 ottobre 2026

La famiglia corrente contiene 95 immagini generate con ImageGen integrato: 67 sfondi semantici per le card e 28 figure didattiche. I prompt, le immagini selezionate, i riferimenti stilistici e la verifica della conversione sono in `assets/theme-imagegen/manifest-v1.json`; i PNG originali sono in `assets/theme-imagegen/originals/` e i WebP pubblici in `public/images/generated/theme-2026/`. La conversione è lossless, con pixel RGBA e trasparenza conservati esattamente.

La direzione è editoriale 2D, con figure semplici, contorni precisi, campiture chiare e margini trasparenti. Ogni scena è scelta in relazione al contenuto della card. Il corso usa rosso/ambra, il brief ambra/giallo, Introduzione lime/verde e Approfondimenti indaco/lime. Le 224 card scritte nei sorgenti, le 8 card dinamiche della mappa del sito e le 5 stazioni UX ricevono immagini di questa famiglia attraverso `data/card-artwork.json`. Gli sfondi sono decorativi, dietro al testo nativo, a bassa opacità; le precedenti icone outline delle card e dei nuclei UX sono rimosse.

Sono rigenerate le venti immagini di Approfondimenti, le tre scene del brief, il rinnovo dei materiali, il bollino di aggiornamento, il customer journey e le due interfacce di gerarchia. Le interfacce A e B mostrano gli stessi contenuti e la stessa disposizione; cambia l’enfasi di titolo, riepilogo e azione. Le fotografie documentarie, le opere, gli screenshot autentici e gli artefatti progettuali mantengono la loro identità. Le copertine metro ripristinate e i diagrammi geometrici nativi restano conservati. La terza lezione resta nascosta.

Queste indicazioni sostituiscono le descrizioni storiche delle immagini e delle icone nelle sezioni successive.

## Colori coordinati delle sezioni

Il secondo elemento dell’indice è un gruppo daisyUI `join-vertical` diviso in due aree cliccabili: Introduzione a UX e UI sopra, Brief di progetto sotto. Le due metà mantengono i colori dei rispettivi set e condividono l’altezza di 112 px del pulsante del corso. Il brief compare una sola volta nell’indice; Approfondimenti conserva il proprio collegamento separato. Ogni metà è un pulsante indipendente, senza pulsanti annidati e senza tagliare i contorni di focus.

I pulsanti dell’indice sono campiture nel primario 800 del set di destinazione: corso rosso, introduzione lime, brief ambra e approfondimenti indaco. Le etichette sono bianche e i numeri delle lezioni usano l’accento chiaro della rispettiva coppia. Hover e pressione passano alla tonalità 900; il focus mantiene un contorno visibile dello stesso primario. I collegamenti alle lezioni sospese restano nascosti.

La revisione dei colori del 6 ottobre 2026 assegna la stessa coppia Tailwind a copertina, ribbon, collegamenti, controlli e diagrammi di ciascun set. `tokens.css` definisce le famiglie; `reference.css` le applica attraverso i ruoli `--section-primary`, `--section-primary-deep`, `--section-accent` e `--section-accent-soft`. Il layout espone `data-lesson` per distinguere l’apertura dalle pagine del corso senza affidarsi alla posizione della slide.

| Set | Primario | Accento |
| --- | --- | --- |
| Apertura | indigo | lime |
| Lezione 1 · Il corso | red | amber |
| Brief di progetto | amber | yellow |
| Approfondimenti | indigo | lime |
| Lezione 2 · Introduzione | lime | green |
| Lezione 3 · Storia, ancora nascosta | emerald | teal |
| Design Thinking, ancora nascosto | cyan | sky |
| Lean UX, ancora nascosto | blue | sky |
| Conclusioni, ancora nascoste | violet | rose |

Le copertine usano lo stesso primario 800 dell’indice e del ribbon, con metro 950 e accenti 100; link, testo colorato e controlli usano 800 per restare leggibili sulle superfici chiare. Le aperture delle lezioni mostrano «Lezione 01», «Lezione 02» e «Lezione 03» in una posizione comune in alto a sinistra, attraverso il campo `lessonNumber`; la terza resta nascosta. Brief e Approfondimenti sono set autonomi senza numero di lezione. I numeri dell’indice riprendono il colore della lezione di destinazione. Le icone decorative delle card seguono il primario del set; gli elenchi usano l’accento scuro. La scala dei voti è rossa, coerente con il set del corso. La barra di avanzamento resta indaco per tutti i set e la modale immagini conserva il tema condiviso indaco. La composizione multicolore originale della copertina generale resta invariata. Queste regole sostituiscono le precedenti assegnazioni dei colori descritte nelle sezioni storiche seguenti.

Il 6 ottobre 2026 l’utente ha richiesto di copiare la grafica del progetto locale `/Users/marco/Sites/Gestione web`, conservando del precedente sistema soltanto il formalismo dei tracciati della metro. Questo riferimento sostituisce la precedente scelta di coppie BASE + ACCENTO e la tipografia Inter/Merriweather. La modalità della presentazione è **Read**: i contenuti didattici e le note devono essere leggibili durante la lezione e nella consultazione autonoma.

## Riferimento e implementazione

Sono stati ispezionati `styles/index.css`, `LessonCover.vue`, `CourseCard.vue`, `global-top.vue`, `global-bottom.vue` e le aperture, le slide di lettura e le schede del riferimento. Il progetto di riferimento resta invariato; l’anteprima è stata eseguita su una copia temporanea.

`styles/reference.css`, importato dopo i fogli strutturali, è l’autorità grafica delle slide. Mantiene il canvas 1280 × 720 e riporta i valori del riferimento alla sua scala. I fogli precedenti continuano a definire le strutture dei contenuti; il nuovo foglio sostituisce fondi, tipografia, card, tabelle, aperture, pulsanti e dettagli. I contenuti, le figure documentarie e le note del relatore restano conservati.

| Ruolo | Valore ripreso dal riferimento |
| --- | --- |
| Fondo delle slide ordinarie | `#f3f4f6` · gray-100 |
| Titoli e testo principale | `#0f172a` · slate-900 |
| Testo corrente | `#334155` · slate-700 |
| Primario e collegamenti | `#4f46e5` · indigo-600 |
| Accento, marcatori ed evidenziatori | `#84cc16` · lime-500 |
| Intestazioni interne | `#0f172a` · slate-900 |
| Card e pannelli | Bianco, raggio 16 px, ombra morbida al 6% |
| Copertina generale | Blu `#002f5f`, luce indaco e lime |
| Apertura lezione 1 | Indaco `#4338ca` |
| Apertura lezione 2 | Sky `#0284c7` |
| Apertura brief | Ambra `#d97706` |

La famiglia sans è quella del riferimento: `Avenir Next`, poi `Nunito Sans`, con Inter locale come fallback. I testi narrativi non usano più il serif. I titoli delle slide ordinarie sono 47 px, peso 400, i testi 23 px e le card 20 px; le scale sono proporzionate rispetto al canvas del riferimento. Le aperture hanno titolo bianco centrato da 88 px e badge della lezione. La copertina generale usa il titolo in maiuscolo, metadati e docenti sul fondo blu.

## Componenti e superfici

Gli alert condividono un trattamento distinto dalle card: fondo al 4% del primario della sezione, bordo completo di 1 px al 18%, raggio 12 px e nessuna ombra. L’icona outline occupa un’area di 44 px su una campitura dello stesso colore al 10%; titolo e parole evidenziate usano il primario scuro, mentre il testo resta slate. Titoli da 24 px e testo da 20 px mantengono la gerarchia comune alle slide, con 20 px fra icona e contenuto. Il richiamo al forum resta una nota statica (`role="note"`), senza annunci da errore o urgenza. Le regole sono applicate a `.alert` in `reference.css`, senza eccezioni per la slide del rinnovo.

Le card riprendono i pannelli bianchi del riferimento, con ombra tenue e titoli sans semibold. Gli sfondi generati della famiglia corrente sostituiscono le precedenti icone outline; il testo nativo e l’API dei contenuti restano conservati. Le composizioni di concept tornano a pannelli bianchi disposti sotto il titolo, eliminando il vecchio sistema di subgrid trasparenti e filetti.

Le tabelle hanno superficie bianca, bordi sottili, intestazione slate scura e righe alternate. Le barre dei voti usano una scala indaco. Figure e didascalie hanno cornici neutre e controlli chiari. La mappa del sito conserva la gerarchia dei contenuti e i collegamenti, con pannelli bianchi. Rinnovo del corso, domande e chiusura adottano gli stessi fondi chiari e la stessa tipografia.

## Metro e movimento

Le timeline delle fasi ereditano esplicitamente la coppia del set: tracciato nel primario, separatore bianco, stazioni e tratto animato nell’accento chiaro, numeri nel primario scuro e anello nell’accento. I percorsi di gruppo e individuale della lezione 1 usano quindi rosso/ambra, attraverso gli stessi ruoli `--section-*` delle copertine e del ribbon.

Le geometrie di `MetroTrack`, `ChapterMetro` e `ClosingMetro` sono conservate. Le tracce e le stazioni usano i colori del riferimento; le precedenti campiture crema/oro della copertina sono state rimosse. La metro appare come traccia discreta dietro alle aperture e alla copertina, integrata con le luci morbide del riferimento. Le vecchie animazioni di scala e blur dei titoli di capitolo sono disattivate; le luci delle aperture rispettano movimento ridotto e stampa.

Il ribbon diagonale della lezione e la barra di avanzamento arrotondata riprendono il riferimento. Numerazione e progressione restano autonome per set e accessibili. L’indice continua a mostrare soltanto le lezioni 01 e 02, più il collegamento al brief. Le voci 03–06 restano nascoste; l’import della lezione 3 resta `disabled: true`. Sono presenti 153 slide visibili e 221 nei sorgenti.

## Materiali e strutture conservati

Le note seguenti descrivono contenuti, asset e strutture del deck. Le indicazioni grafiche storiche che contrastano con il sistema descritto sopra sono superate da `styles/reference.css`.

## Impaginazione

Le slide di lettura ancorano il titolo a 64 px dal bordo superiore e condividono margini laterali di 68 px. Il layout riserva 88 px sotto e separa il contenuto dal footer di almeno 12 px. Gli intervalli ricorrenti sono 16, 24, 32 e 48 px. Domande, percorsi metro, aperture e chiusura mantengono la propria composizione centrale; le affermazioni delle lezioni combinano il titolo stabile con una tesi centrale. I capitoli non mostrano numeri decorativi; la chiusura riprende la mappa della copertina con una fascia opaca nella BASE del corso dietro al testo. Il canvas 1280 × 720 viene scalato proporzionalmente, senza reimpaginare le colonne nei viewport stretti.

Le card informative si distinguono dalla pagina per superfici BASE molto chiare nelle slide amministrative e grigio 50 nelle lezioni. Matrici e casi didattici mantengono pannelli equivalenti; i confronti brevi usano colonne aperte con un filetto neutro, titoli di 28 px e testo di 21 px. La subgrid allinea le spiegazioni anche quando un’intestazione va a capo. La slide 29 segnala tre passi con numeri; la slide 56 collega i due calcoli con una freccia geometrica. Non si aggiungono frecce alle relazioni fra concetti equivalenti.

La slide 122 raccoglie le quattordici fasi UX in cinque stazioni su un’unica superficie BASE 800 di Introduzione, collegate da una linea nell’ACCENTO 200. Cinque illustrazioni tridimensionali di carta rappresentano brief, ricerca, percorsi, wireframe e verifica. Sono porzioni dello stesso PNG trasparente, generato con lo strumento integrato imagegen e conservato senza modifiche in `public/images/generated/ux-process/`; prompt e manifest sono in `assets/ux-process/`. Titoli, numeri e attività restano testo nativo accessibile. Il richiamo all’iterazione chiarisce che le evidenze possono riportare a qualsiasi nucleo; la linea è una mappa di riferimento, non una sequenza obbligatoria. Il componente e il foglio `styles/ux-process.css` contengono la composizione senza modificare le card delle altre slide.

La slide 120 dell’attività «UX, UI o usabilità?» riusa `CvediCard` nella variante illustrata ampia. Tre PNG trasparenti generati con imagegen rappresentano menu, ricerca di una prenotazione e visita a un servizio, senza etichette che anticipino le risposte. Nei raster originali riprendono la carta tridimensionale petrolio e arancione della mappa UX; sono allineati a 12 px dai bordi destro e inferiore, nello spazio riservato sotto il testo. La cornice della slide segue la coppia `lime` + `purple` di Introduzione. File originali pubblici in `public/images/generated/ux-ui-usability/`, prompt e provenienza in `assets/ux-ui-usability/`.

`LessonFigure` usa l’altezza disponibile sotto il titolo: circa 440 px per immagini e poster, con didascalia separata. Diagrammi e interfacce ricevono circa il 70% dello spazio orizzontale; la coppia di poster ha altezze uguali. Dritto/rovescio della moneta e tre aperture di rivista sono ricomposti in regioni affiancate mediante CSS, conservando tutte le parti degli asset originali. Sia l’immagine sia il pulsante «Ingrandisci» nella didascalia aprono l’ingrandimento daisyUI su `dialog` nativo: didascalia, chiusura visibile, Esc, focus protetto e ritorno al pulsante che lo ha aperto. L’ingrandimento usa il viewport, si chiude cambiando slide e rispetta la riduzione del movimento; non appare in stampa.

I recuperi dal materiale 2025/26 riusano card daisyUI e figure ingrandibili. Il confronto di gerarchia usa due immagini generate con ImageGen, con gli stessi contenuti e sola differenza di evidenza visiva. Non contiene form HTML: gli esempi si visualizzano e si ingrandiscono con `LessonFigure`. Gli esempi SMART, personas, priorità e test mantengono testi nativi nelle card. Il confronto di Albers è composto da campiture CSS e due quadrati centrali dello stesso colore; non richiede un’immagine raster. Recuperi e limiti di copertura sono nel [confronto 2025/26](../assets/slide-audit/2025-2026.json).

Le classi di composizione sono dichiarate nel frontmatter e implementate in `styles/compositions.css`. [layouts.md](layouts.md) documenta la struttura scelta per ciascuna delle 221 slide.

La slide dell'archivio usa 76 schermate reali dei siti in `progetti/`, ottimizzate come anteprime per il browser. Dodici tessere grandi riempiono il canvas senza spazi né bordi. Una tessera cambia ogni 1,4 secondi, in posizioni distribuite sulla slide, con una dissolvenza morbida e un leggero zoom. Tutti i progetti passano nel ciclo; le immagini vengono precaricate prima del cambio. Titolo e link all'archivio sono sovrapposti alle immagini in un box opaco nella BASE del corso; il link usa l’ACCENTO 200. La barra di avanzamento indaco resta visibile anche su questa slide. La rotazione si ferma fuori dalla slide, con movimento ridotto e in stampa; in quei casi resta un fotogramma statico.

Gli elenchi mantengono la struttura semantica HTML. Ogni voce usa un punto nell’ACCENTO 700 del set e una colonna di testo con rientro sospeso: le righe lunghe restano allineate all'inizio del testo. Tra le voci ci sono 24 px nelle slide e 16 px nelle card; gli elenchi ampi sono disposti su due colonne.

## Brief WHAT IF?

Nella slide «Obiettivo e percorso», i tre collegamenti Tema e requisiti, Metodo di progetto e Consegna usano testo, frecce, bordo e focus neri. Hover e pressione hanno fondo nero e testo bianco, attraverso la classe locale `brief-navigation`.

Le tre illustrazioni attive sono la versione `v3`, generata con ImageGen integrato il 6 ottobre 2026 nella palette Tailwind amber/yellow del brief. Le scene mostrano progettazione dei servizi futuri, scelta del concept e sito responsive, con figure umane, tratti ambra, campiture crema/giallo e fondo trasparente. Non contengono testo o cornici; `NextMeIllustration` carica i raster effettivi attraverso `publicAsset`, anche in sottocartelle. Gli originali PNG sono in `assets/next-me/` e le versioni WebP pubbliche mantengono esattamente tutti i pixel RGBA e la trasparenza. Prompt, passaggio di pulizia e provenienza sono in `assets/next-me/imagegen-manifest-v3.json`. Questa versione sostituisce le immagini indaco e le precedenti icone SVG; le generazioni precedenti restano archiviate.

Le slide 48–54, nel set autonomo Brief di progetto, presentano il progetto di un sito web solo in italiano per un’organizzazione che offre servizi del 2050 basati sull’evoluzione dell’AI. Usano la coppia `amber` + `blue`, conservando scala tipografica, margini e linguaggio geometrico del booklet. Tre illustrazioni raster editoriali generate con imagegen accompagnano il brief, la definizione del concept e il passaggio al sito. La seconda versione riprende il linguaggio geometrico del booklet: figure astratte, forme nette, binari doppi e nodi circolari collegano persone, servizi e scelte. Indaco, lavanda e giallo su bianco sono i colori incorporati nei raster originali, senza testo incorporato.

Le slide 55–69 sviluppano la parte operativa del set autonomo importato da `lezioni/00-brief-progetto.md`: ricerca e riferimenti, proto-personas, moodboard, architettura, wireframe, user flow, look & feel, mockup, revisioni e materiali finali. Riutilizzano `CvediCard` e le griglie a due o tre colonne, con la stessa superficie chiara delle slide del progetto. Le illustrazioni decorative usano le varianti ampia o compatta già disponibili e si ancorano in basso a destra. La struttura del sito è un’alberatura con homepage, quattro sezioni e tre schede collegate al catalogo; il flusso illustrativo distingue tre passi effettivi. Le condizioni di consegna e le precisazioni restano in una riga separata sotto le card. Le fonti e il rapporto fra requisiti recuperati, adattamenti e ipotesi del 2050 sono documentati in [docs/fonti/00-brief-progetto.md](fonti/00-brief-progetto.md).

Le composizioni illustrate usano due colonne, con testo a sinistra e immagine contenuta a destra. Il concept e le pagine del sito sono descritti con liste di definizione, evitando testo sovrapposto alle immagini. Le sei direzioni dell’AI usano una griglia di tre colonne e due righe con le superfici delle card condivise. `NextMeIllustration` risolve i percorsi pubblici anche in sottocartelle ed esclude le immagini decorative dall’albero accessibile. Gli originali, il riferimento di copertina e i manifest dei prompt sono in `assets/next-me/`; il sito carica i file `*-v2.webp` in `public/images/generated/next-me/`. La prima versione è conservata per confronto.

## Movimento

Nella slide 10, una linea rosso 700 barra la precedente voce sul framework Bootstrap e la sola parola Bootstrap nella voce su JavaScript. Subito dopo viene applicato lo sticker giallo e indaco “Nuovo argomento 26/27 · Sarà comunicato”, generato con ImageGen su fondo trasparente e conservato in `public/images/generated/syllabus/`; il prompt è in `assets/syllabus/imagegen-manifest.json`. Il badge daisyUI contiene l’immagine con testo alternativo ed è posizionato in alto a destra, accanto all’intestazione, fuori dal flusso dell’elenco: le tre righe mantengono allineamento e spaziatura regolare. Lo sticker entra dall’alto con una rivelazione progressiva, rotazione e scala, si posa con un breve rimbalzo e resta fermo. Il suo ingresso dura 720 ms; l’intera sequenza dura 1,6 secondi e riparte rientrando nella slide. In stampa e con movimento ridotto, cancellazioni e sticker sono subito visibili.

Le timeline del progetto e dell’approfondimento riprendono le coppie di strisce della copertina: ogni linea colorata è larga 14 px, con un filetto bianco di 2 px e raccordi a 45°. La traccia attraversa tutto il canvas, da bordo a bordo, mentre le quattro fermate DaisyUI e le etichette mantengono i margini del contenuto. All’ingresso, un breve tratto nell’ACCENTO 200 percorre la linea in 2,3 secondi e un anello discreto segnala l’arrivo alle fermate; la sequenza termina e riparte solo rientrando nella slide. In stampa e con movimento ridotto resta la mappa statica. Il percorso individuale riassume scelta dell’argomento, ricerca e analisi delle fonti, stesura del documento e consegna finale; la sua etichetta accessibile distingue le fasi dell’approfondimento da quelle del progetto.

Le tre aperture dei capitoli riprendono il tracciato metro vicino al titolo, con geometrie disegnate sulla lunghezza effettiva del testo: “Il corso” ha una svolta compatta dopo il titolo, “Modalità d’esame” una tratta superiore più lunga e una discesa sul lato destro, “Archivio progetti” una linea che sale da sotto il sottotitolo e passa accanto al titolo. Le tracce attraversano il canvas da bordo a bordo e lasciano liberi i testi. Le linee usano il tono BASE 800 sul fondo BASE 700 e conservano lo spessore di 14 px; il separatore assume il colore del fondo. Il passaggio nell’ACCENTO 200 parte dopo 520 ms, accompagnando l’ingresso del testo, e termina dopo un solo percorso. Il componente SVG `MetroTrack` condivide tratto, accento e movimento con la timeline; `ChapterMetro` contiene i tre percorsi. Anche queste linee restano statiche in stampa e con movimento ridotto.

La copertina e la slide finale compongono progressivamente la mappa geometrica ricostruita nel nodo Figma [285:2031](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=285-2031). Le fasce sono forme piene senza bordi, larghe 18 px e distanti 4 px; le curve parallele sono concentriche. Il generatore in `assets/metro-map/build-geometric.py` produce lo SVG statico e gli stessi dati usati da `ClosingMetro`: ogni fascia ha una maschera animata sul proprio percorso esatto, mentre i 147 punti gialli restano cerchi separati e appaiono in sequenza. Entrambe le slide riutilizzano lo stesso componente e gli stessi tempi: la mappa si completa in 10,5 secondi; testo e fascia nella BASE del corso rimangono fermi e leggibili. La sequenza riparte rientrando nella slide e mostra subito la mappa completa con movimento ridotto e in stampa. La precedente versione tracciata è conservata come riferimento storico.

Il passaggio fra slide usa la dissolvenza nativa di Slidev: 260 ms in entrata e 150 ms in uscita. Le aperture di capitolo hanno un'entrata focalizzata: il titolo passa da un tono vicino allo sfondo al bianco con uno zoom e una breve messa a fuoco (760 ms); il sottotitolo viene rivelato dopo 230 ms. I tre calendari mostrano le righe in ordine cronologico con un ingresso di 6 px e una dissolvenza: 360 ms per riga, ritardo progressivo di 28 ms e durata complessiva inferiore a 800 ms. L’intestazione rimane stabile; la sequenza riparte entrando nella slide. Con movimento ridotto e in stampa, tutte le righe sono subito visibili. Nelle slide dei voti le barre dei componenti `progress` si riempiono in sequenza: quattro fasce nelle distribuzioni e sei registri nel confronto, mentre numeri e testi restano sempre leggibili. Con la preferenza di sistema per la riduzione del movimento, le barre sono immediatamente complete, il titolo dei capitoli cambia solo colore in 180 ms, il sottotitolo resta fermo e la dissolvenza fra slide dura 80 ms.

## Implementazione condivisa

`layouts/default.vue` legge il contesto nativo Slidev per la slide corrente e lo stato attivo. `utils/lesson-pagination.ts` calcola numero e totale nel singolo set identificato da `lesson`, contando le slide senza questo campo nella Presentazione del corso (compresa la chiusura finale). Footer e barra di avanzamento usano questi valori: 6 slide di apertura generale (`lesson: apertura`), 40 slide del corso, 25 del Brief di progetto, 82 di Introduzione e 68 di Storia del design. La prima lezione inizia da “Il corso”, alla slide complessiva 7: l’alias `presentazione-corso` apre questa slide, numerata `01 / 40`; la copertina generale usa l’alias `apertura`. La barra riparte all'ingresso di una lezione e resta sempre indaco 700 su traccia grigio 200, anche nella galleria e nei linguaggi storici delle interfacce. `global-top.vue` non applica classi di colore per set. La label inferiore è il campo `footer` del frontmatter. Le animazioni si attivano con `is-active`, senza selettori legati agli attributi HTML interni del player.

La build pubblicata online nasconde la barra dei comandi del player Slidev con `styles/published.css`, attivo tramite la classe `cvedi-published` impostata in produzione solo su host online. Localhost, loopback, indirizzi privati della rete locale e host `.local` conservano la barra anche servendo la build statica. La navigazione nativa con tastiera e gesti resta attiva; anteprima locale e vista relatore conservano i propri comandi. La regola seleziona la barra di Slidev attraverso il suo pulsante di avanzamento, lasciando liberi eventuali elementi di navigazione nei contenuti.

Le card usano `CvediCard`, i tre calendari `CourseCalendar`, le due timeline `ProcessTimeline` e le quattro distribuzioni `GradeDistribution`. I componenti mantengono il markup nativo DaisyUI e i contenuti restano in `slides.md` o nei file JSON. Le intestazioni delle tabelle hanno `scope`; illustrazioni decorative escluse dall’albero accessibile; tre pulsanti dell’indice realmente disabilitati.

Il CSS è diviso in token, layout, componenti, dati e movimento; il file generato Tailwind non contiene modifiche manuali. La specificità del tema Slidev viene neutralizzata solo dove interferisce con il sistema: opacità dei paragrafi introduttivi e rientri di elenchi/timeline.

## Indice dei progetti

La pagina autonoma `progetti/index.html` conserva il fondo scuro caldo dell’archivio (`#1C1917`), il testo chiaro (`#FAFAF9`) e l’accento lime (`#A3E635`) per il filtro generale e il focus. Inter riprende la famiglia del sistema condiviso. I testi secondari usano `#A8A29E`; il bordo del campo di ricerca `#78716C` mantiene almeno 3:1 rispetto alle superfici adiacenti. Le anteprime conservano i colori originali dei siti.

L’indice privilegia l’esplorazione: anni dal più recente al più remoto, anteprime in tre colonne su desktop, due su tablet e una su telefono. Le immagini hanno rapporto 16:10, bordo discreto, angoli di 12 px e didascalie libere dalla superficie della card. Il titolo usa una scala fluida di 32–60 px; i titoli annuali 22–26 px. I filtri mantengono i sei colori annuali dell’archivio originale, con conteggi ricavati dal JSON, selezione esplicita e navigazione da tastiera. Su schermi stretti scorrono orizzontalmente; la ricerca occupa la riga seguente. La barra dei controlli resta disponibile durante lo scorrimento.

La ricerca per nome si combina con l’anno e ignora maiuscole, accenti e punteggiatura. Il numero di risultati è annunciato separatamente dalla galleria. Ogni anteprima è un collegamento nativo che apre il progetto in una nuova scheda. Caricamento, errore con riprova, ricerca senza risultati, archivio vuoto e anteprima mancante hanno testi e azioni in italiano. Il solo movimento è il piccolo spostamento della freccia al passaggio sul link; con movimento ridotto resta ferma.

Il tema daisyUI dell’archivio, i font locali e gli stili compilati restano dentro `progetti/`, con URL relativi compatibili con la pubblicazione in `project/`. `gallery.source.css` è la sorgente; `gallery.css` viene generato da `pnpm css:projects`, incluso anche nella build Pages. Le regole delle slide restano nei rispettivi fogli di stile.

Le slide 101–116 (31–46 del capitolo Introduzione) presentano un esempio di UX oltre lo schermo per pagina: 12 fotografie originali della lezione 3 (2025/26), due casi documentati da Nielsen Norman Group nel 2018 (fornelli e biglietteria) e due esempi ufficiali OXO e LEGO. `UxExampleSlide` riceve un `example-id` stabile e legge titolo, descrizione, domanda, fotografia e didascalia da `data/ux-examples.json`. Ogni pagina ha il proprio titolo e si raggiunge con la navigazione nativa Slidev; non contiene selettori o comandi di galleria. Le immagini conservano proporzioni e orientamento originali, con didascalie larghe quanto l’immagine e ingrandimento tramite `LessonFigure`. La sequenza dura 9,5 minuti: le nove foto iniziali e la cassa dopo il pagamento hanno 30 secondi ciascuna; gli altri sei casi hanno 45 secondi ciascuno. Questi tempi rientrano nei 120 minuti del capitolo.

Le didascalie `LessonFigure` riprendono lo stile del booklet: Merriweather Light Italic (300), allineamento a destra, BASE del capitolo e filetto inferiore da 0,5 px. Il corpo è adattato alle slide a 15 px con interlinea 1,7; il font corsivo è caricato localmente. `LessonImageContent` dimensiona l’immagine secondo le proporzioni originali e la incornicia nella BASE del capitolo; `--cvedi-image-border` definisce lo spessore di 1 px. I colori interni della riproduzione restano originali. La cornice segue il perimetro effettivo dell’immagine, senza comprendere lo spazio libero del contenitore, anche nell’ingrandimento. Il renderer comunica la propria larghezza esterna a `LessonFigure`: didascalia e filetto restano della stessa larghezza dell’immagine bordata, seguendo i cambi di asset e di dimensione. Nelle sequenze affiancate ogni pannello ha il proprio bordo e la didascalia copre l’intero gruppo. Il pulsante «Ingrandisci» sta sulla riga successiva, allineato a destra. Riferimenti Figma: `198:2065` e `198:2066` per C02, `I198:1875;7:1283` per C01.

Il comando «Ingrandisci» usa `btn btn-outline` di daisyUI, con icona decorativa a quattro angoli, superficie leggermente colorata e bordo nel colore della lezione. Ha altezza 44 px, testo Inter 600 e focus visibile; al passaggio del puntatore assume il colore pieno della lezione con testo bianco. La didascalia mantiene larghezza e filetto indipendenti dal pulsante. La prop `bordered`, attiva per default, consente di togliere la cornice dalla figura e dal relativo ingrandimento: la customer journey della slide 131 usa `:bordered="false"`.

## Linguaggi storici delle interfacce

Le undici slide sugli stili sono interpretazioni editoriali dell’intero linguaggio discusso, coordinate con il booklet aggiornato. Il primo web usa Noto Serif e link blu; il Web 2.0 Nunito/Roboto e gradienti blu; lo scheumorfismo Lora e carta calda; il flat Inter e campiture piatte; Material Roboto e superfici lilla; il neumorfismo Nunito e rilievi morbidi; il glassmorfismo Inter Light e trasparenze chiare; il minimalismo Inter Light, nero e spazio negativo; Y2K Audiowide/Space Grotesk e cromature; il massimalismo Fraunces/Space Grotesk e colori vivaci; il neobrutalismo Archivo Black/IBM Plex Mono, giallo e bordi netti. Questi casi didattici conservano il linguaggio e i colori rappresentati; didascalie e footer seguono il carattere della pagina, mentre la barra di avanzamento resta indaco 700. Font WOFF2 e licenze sono locali; non si caricano font remoti durante la presentazione. I moduli didattici con finti pulsanti sono assenti: la pagina stessa rende visibile lo stile.

La sezione autonoma Brief di progetto occupa 46–70 del deck. La copertina ha fondo BASE `amber-700`, titolo bianco e percorso metro con accento `blue-200`; l’obiettivo include un indice di tema, metodo e consegna. `brief-section` applica la coppia al modulo, mentre la sua barra di avanzamento resta indaco 700 e conta solo le 25 slide del set. Il pulsante dedicato dell’indice apre l’alias `brief-progetto`. `SitemapDiagram` riusa `CvediCard`, testo nativo e connettori SVG decorativi per preservare la gerarchia della fonte senza rasterizzare le etichette.

I collegamenti del brief usano `SlideAction`: pulsante daisyUI con bordo nella BASE del set, etichetta Inter, freccia decorativa e area minima di 44 px. Il componente riceve il testo tramite slot e l’alias di destinazione tramite `to`, senza duplicare lo stile fra indice, panoramica del progetto e indice interno. La prop `showArrow` disattiva la freccia solo sul pulsante del Brief nell’indice generale; gli altri collegamenti conservano l’icona.


## Immagini materiali del corso

Il 6 ottobre 2026 è stata rigenerata con ImageGen integrato un’unica immagine per Slide e Bibliografia: presentazione e libro riuniti in un elemento grafico indaco e lime, senza card. L’asset attivo è `public/images/generated/renewal/materiali-v1.png`, con fondo trasparente; prompt e provenienza sono in `assets/renewal/imagegen-manifest-unified.json`. Le generazioni separate precedenti sono archiviate.


## Eccezione: copertina generale

Su richiesta dell’utente la copertina generale conserva la composizione precedente: metro multicolore su fondo bianco, fascia indaco centrale e titolo Inter in maiuscolo. `ClosingMetro original` applica i colori originari soltanto alla copertina. Il resto del deck mantiene il riferimento Gestione web.


## Eccezione: aperture delle lezioni

Ripristinata anche la composizione precedente delle aperture: titoli Inter 96 px allineati a sinistra, tracciato metro a tutta slide, senza badge né cerchi decorativi. Le campiture usano i token Tailwind delle rispettive lezioni: corso rosso, introduzione lime, storia emerald (ancora nascosta), brief ambra, con gli accenti chiari assegnati a ciascuna famiglia.


## Immagini senza cornice

Tutte le immagini delle slide e degli ingrandimenti usano un trattamento uniforme senza bordo, arrotondamenti né ombra applicata all’immagine. Il token `--cvedi-image-border` è 0 px. Le coppie di figure mantengono le proporzioni e la spaziatura; i pulsanti e le didascalie restano separati.

Il comando di ingrandimento è una sola icona a quattro angoli, sovrapposta in basso a destra ai pixel effettivi dell’immagine, anche per figure verticali e pannelli affiancati. Non occupa una riga sopra la figura e non mostra testo, bordo o superficie del pulsante. L’opacità passa da 45% a 100% quando il puntatore è sull’immagine o quando il controllo riceve focus; su dispositivi senza hover resta al 70%. Il tratto bianco sotto l’icona ne mantiene la leggibilità su fotografie e diagrammi. L’area cliccabile resta 44 × 44 px, con nome accessibile «Ingrandisci», focus visibile e apertura tramite tastiera. La misura comunicata da `LessonImageContent` mantiene icona e didascalia allineate alle proporzioni reali della figura. Questa regola sostituisce i precedenti posizionamenti del pulsante descritti nelle note storiche.


## Modale immagini

La modale ha un tema autonomo comune perché viene teletrasportata sotto `body`: fondo bianco, raggio 16 px, ombra morbida, titolo Avenir e comando Chiudi indaco con icona. L’accento non viene ereditato dalla lezione. Immagini singole e coppie restano senza cornice; apertura, chiusura con Esc e ritorno del focus usano il dialog nativo condiviso.


## Titoli e centraggio del contenuto

Le slide ordinarie mantengono il titolo a 52 px dall’alto e 72 px da sinistra; lo spazio libero sopra e sotto il contenuto è distribuito in modo uniforme, senza cambiare l’ordine di lettura. Le copertine ripristinate restano indipendenti. Anche l’archivio a tutta pagina usa l’ancoraggio comune del titolo, su una superficie leggibile. La suite misura entrambe le coordinate del titolo e lo scarto del centro del gruppo di contenuto.


## Approfondimenti A01–A20

Il set di 21 slide segue il brief e mantiene gli ancoraggi comuni di titolo, contenuti, footer e ingrandimenti. Ogni traccia combina domanda ufficiale, tre aspetti da sviluppare, un esito e una figura. La sezione usa indaco con accento lime; venti immagini ImageGen spiegano relazioni e stati specifici, senza mockup HTML interattivi. Titoli e domande sono verificati contro il testo eLearning registrato il 6 ottobre 2026.
