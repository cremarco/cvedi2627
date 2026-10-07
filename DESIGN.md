# DESIGN · CVeDI 2026/27

Questo è il riferimento normativo per aggiungere o modificare slide, componenti e immagini. Leggerlo prima di iniziare. Le regole descrivono il sistema implementato; modifiche intenzionali al sistema devono aggiornare codice e documento insieme. Le istruzioni esplicite dell’utente hanno precedenza.

Modalità Read, grafica del riferimento Gestione web e canvas 1280×720. Il player scala la composizione senza riordinarla. Titoli ordinari a top 52 / left 72 px, corpo centrato sopra il footer. Linguaggio delle copertine metro, contenuti, asset, palette e visibilità dei set sono vincoli del progetto.

## Responsabilità

| Modulo | Responsabilità |
| --- | --- |
| `daisy.css` | Tailwind e tema semantico daisyUI |
| `tokens.css` | Valori Tailwind e ruoli cromatici |
| `slides.css`, `components.css`, `lessons.css` | Strutture del canvas e componenti |
| `compositions.css`, `ux-process.css`, `grades.css` | Figure, diagrammi e dati |
| `theme.css` | Superfici, copertine e tema finale |
| `typography.css` | Font locali e scala tipografica |
| `layout.css` | Relazioni spaziali e allineamenti |
| `motion.css` | Entrate finite e riscontri |
| `web-styles.css` | Linguaggi storici didattici |
| `slide-sets.ts`, `use-slide-set.ts` | Identità e palette del set proprietario |
| `lesson-pagination.ts` | Numerazione per set, compresa la chiusura non contigua |
| `useSlidePlayback.ts` | Attivazione, visibilità, stampa e movimento ridotto |

I componenti usano card, alert, btn, table, badge, progress e modal daisyUI. Il CSS specifico serve al canvas e alle composizioni didattiche. Palette e numerazione appartengono al set, non all'indice globale. I dialog teletrasportati ricevono il tema della slide proprietaria.

## Palette

Le famiglie primarie seguono esattamente l’ordine della [pagina dei colori Tailwind](https://tailwindcss.com/docs/colors), inclusi i neutri e le nuove famiglie taupe, mauve, mist e olive. Le palette restano assegnate ai set, compresi quelli senza numero: Il corso red, Introduzione orange, Brief amber, Approfondimenti yellow. Le lezioni 04–09 continuano con lime, green, emerald, teal, cyan e sky. La numerazione delle lezioni conserva il proprio significato e non viene usata come indice della palette. Ogni famiglia riceve un accento vivace esclusivo: 26 accenti con tonalità differenti, senza riutilizzi nel catalogo. I primari sono Tailwind 800; gli accenti sono personalizzati in OKLCH. Indigo conserva l’abbinamento con lime-400 nella copertina generale e nelle pagine preliminari.

[Adobe Color](https://color.adobe.com/create/color-wheel) è stato verificato esplorando armonie complementari divise su red, orange, yellow, green, blue e indigo. Il catalogo finale è una scelta progettuale in OKLCH, non un’esportazione automatica del tool: le direzioni cromatiche guidano gli abbinamenti, mentre luminosità e saturazione sono adattate alle superfici effettive delle slide. Le tonalità degli accenti occupano 26 posizioni distinte sulla ruota cromatica; quelle dei neutri sono scelte per distinguere i set. La saturazione rimane vicina al limite sRGB, ridotta nei ruoli di testo e nelle superfici chiare.

### Catalogo per le slide presenti e future

| Ordine Tailwind | Primario | Accento grafico esclusivo | Anteprima sRGB |
| --- | --- | --- | --- |
| 1 | red-800 | Menta | `#11CE7E` |
| 2 | orange-800 | Ciano | `#11BFF1` |
| 3 | amber-800 | Blu elettrico | `#8CACFE` |
| 4 | yellow-800 | Indaco | `#A6AAFE` |
| 5 | lime-800 | Magenta | `#F087FE` |
| 6 | green-800 | Corallo | `#FE935E` |
| 7 | emerald-800 | Rosa fragola | `#FE7DBE` |
| 8 | teal-800 | Mandarino | `#FC8E0E` |
| 9 | cyan-800 | Vermiglio | `#FE8E78` |
| 10 | sky-800 | Ambra | `#F9C213` |
| 11 | blue-800 | Giallo limone | `#E3CD13` |
| 12 | indigo-800 | Lime | `#9AE600` |
| 13 | violet-800 | Cedro | `#C8D713` |
| 14 | purple-800 | Verde prato | `#11D217` |
| 15 | fuchsia-800 | Giada | `#12CBA0` |
| 16 | pink-800 | Turchese | `#11C8B8` |
| 17 | rose-800 | Azzurro | `#11C3DD` |
| 18 | slate-800 | Rosso vivo | `#FE6270` |
| 19 | gray-800 | Blu cielo | `#47B9FE` |
| 20 | zinc-800 | Orchidea | `#C373FE` |
| 21 | neutral-800 | Rosa acceso | `#FE3ADB` |
| 22 | stone-800 | Acqua | `#12C6CB` |
| 23 | taupe-800 | Pervinca | `#4FA1FE` |
| 24 | mauve-800 | Albicocca | `#FEBD60` |
| 25 | mist-800 | Ciliegia | `#FE5C8F` |
| 26 | olive-800 | Lavanda | `#A884FE` |

Il catalogo è implementato in `styles/tokens.css`: le scale dei primari conservano i valori ufficiali Tailwind, mentre `--cvedi-{famiglia}-accent`, `-accent-light` e `-accent-vivid` definiscono le tre varianti dell’accento proprietario. Tutte conservano la stessa direzione cromatica; indigo riusa i token lime originali. I codici sRGB della tabella sono anteprime arrotondate: i valori OKLCH nei token sono il riferimento. L’ordine del catalogo è quello della documentazione Tailwind, anche quando l’ordine interno del pacchetto è diverso.

### Assegnazione ai set

| Identità `lesson` | Primario / accento grafico sulle superfici scure | Numero |
| --- | --- | --- |
| `apertura` | indigo-800 / lime-400 | Nessuno; identità generale |
| `presentazione-corso` | red-800 / Menta | 01 |
| `introduzione` | orange-800 / Ciano | 02 |
| `brief-progetto` | amber-800 / Blu elettrico | Nessuno |
| `approfondimenti` | yellow-800 / Indaco | Nessuno |
| `ricerca-inclusiva` | lime-800 / Magenta | 04 |
| `percezione-gerarchia` | green-800 / Corallo | 05 |
| `colore` | emerald-800 / Rosa fragola | 06 |
| `tipografia-griglie` | teal-800 / Mandarino | 07 |
| `prototipi-interfacce` | cyan-800 / Vermiglio | 08 |
| `test-implementazione` | sky-800 / Ambra | 09 |
| `storia-design` | blue-800 / Giallo limone | 03, locale e online |

Le identità sono registrate in `utils/slide-sets.ts`; gli alias cromatici rimandano al catalogo della famiglia. Le lezioni 04–09 conservano lime, green, emerald, teal, cyan e sky; la storia conserva il numero 03 e la coppia blue. L’indice segue l’ordine numerico delle lezioni, senza riassegnare le palette. L’apertura usa l’identità generale indigo/lime. Numeri e ordine del catalogo cromatico hanno ruoli separati.

I ruoli distinguono la superficie:

- `--section-primary`: primario 800 per copertine, ribbon, titoli locali e collegamenti.
- `--section-primary-deep` e `--section-track`: primario 900 e 950 per gerarchia e tracce della metro.
- `--section-accent`: variante scura dell’accento per testo, indicatori e avanzamento sulle pagine chiare. Non usare l’accento brillante come testo su bianco.
- `--section-accent-soft`: variante chiara dell’accento per selezione, badge e riquadri leggeri.
- `--section-accent-on-dark`: accento vivace esclusivo per stazioni, linee, indicatori e avanzamento su superfici scure. I segni e i controlli mantengono almeno 3:1 rispetto alla superficie effettiva.
- Sulle copertine, sottotitoli, metadati e collegamenti usano `--color-primary-content` bianco: il testo conserva almeno 4,5:1. La saturazione degli accenti non deve imporre tinte pastello né ridurre la leggibilità delle etichette.

Le superfici ordinarie restano slate-50 e bianco, con testo slate-900/slate-700. I colori semantici rimangono disponibili per errori, stati ed eventi annullati. I grafici dei voti usano la scala sequenziale red-200/300/500/800 del corso, mantenendo categorie, etichette e dati.

Indice, ribbon, avanzamento, controlli, alert e diagrammi appartengono alla coppia del set. I tre collegamenti locali di Obiettivo e percorso restano neri; la copertina generale conserva la metro originale multicolore. I raster già pubblicati conservano colori, originali e attribuzioni: la palette riguarda il tema dell’interfaccia; per nuove illustrazioni usare la coppia del set e registrarla nel manifest. Non applicare filtri cromatici a fotografie o artefatti didattici.

Un nuovo set va registrato prima di usare colori propri, seguendo il catalogo e verificando il contrasto su chiaro e scuro. Le pagine esistenti del corso omettono `lesson` e vengono assegnate al set predefinito `presentazione-corso`: mantenere questa convenzione quando si estende il file del corso.

L’indice usa una griglia unica a due colonne uguali, con righe di 72 px, gap 12 px e testo 22 px. La lezione 02 è un unico gruppo daisyUI `join join-horizontal`, suddiviso tramite tagli verticali in tre sezioni cliccabili affiancate, tutte alte 72 px come gli altri pulsanti e con testo 20 px: Introduzione a UX e UI, Brief di progetto · WHAT IF? 2050 e Approfondimenti individuali · 20 tracce. Il gruppo `.index-lesson-two` occupa una sola cella a destra di 01, mantiene un’unica sagoma arrotondata e conserva la palette di ogni destinazione. Le larghezze interne seguono il rapporto 1 / 1,1 / 1,3 per accogliere i titoli completi; il numero 02 compare soltanto sulla prima parte, in un riquadro compatto da 24 px accanto al testo. Le lezioni 03–09 proseguono in ordine numerico sulle righe successive, da sinistra a destra. Tutte le voci usano `SlideAction` e conservano titolo e alias di destinazione. Il gruppo `.index-ux-lessons` usa `display: contents` per mantenere le sei lezioni locali nella griglia condivisa. Le lezioni 04–09 dichiarano `localOnly: true` sugli import; il preparser Slidev esclude le loro slide e rimuove il contenitore `LocalOnly` dell’indice prima delle build. Online restano 01, il gruppo 02 con le sue tre parti e 03, sempre su due colonne. Le immagini esclusive in `images/processo-ux` sono escluse dall’output; gli originali e l’anteprima locale restano completi. La composizione rimane fissa durante il ridimensionamento del player e in stampa.

## Tipografia e spazi

Nunito Sans variabile locale, normale e corsivo; Inter nelle copertine e come fallback. Le famiglie degli esempi storici sono contenuto didattico. Nessun servizio font esterno durante la presentazione.

| Ruolo | Corpo / peso |
| --- | --- |
| Titolo | 47 px / 500 |
| Lead / prosa | 27 / 23 px |
| Titolo card / compatto | 24 / 22 px, 600 |
| Testo card / note e didascalie | 20 / 18 px |
| Metadati / etichetta footer / ribbon | 16 / 14 / 12 px |
| Numero di pagina | Nunito Sans 16 px / 600, cifre tabulari |
| Valori statistici | 32 px / 700, cifre tabulari |
| Copertina generale / lezione | Inter 72 / 92 px, 700 |

Prosa entro 65ch e lead entro 70ch, limitati dal contenitore. Interlinea 1,48 nella prosa e 1,5 nelle card. Spazi: 12 px fra raster e didascalia, 16 fra parti correlate, 24 fra elementi equivalenti, 48 fra testo e figura.

La numerazione ha un unico stile in tutti i set, comprese copertine di lezione ed esempi storici: Nunito Sans, 16 px, peso 600, interlinea 1,2 e spaziatura 0,04 em. Mantiene il formato `01 / 82` e il colore del footer; non eredita font o dimensioni dalle varianti decorative. La copertina generale (`cover-slide`) omette il contatore nel footer.

Le card equivalenti usano subgrid per allineare le spiegazioni sotto il titolo più lungo; il flusso normale resta il fallback. Gli approfondimenti seguono domanda, aspetti e figura, esito; il frame può ridursi per titoli lunghi senza imporre altezze al testo.

## Sintesi iniziale delle lezioni

Le nove lezioni 01–09 hanno una slide `layout: summary` subito dopo la copertina. Gli import `src` di queste lezioni non impongono un layout, così ogni pagina conserva la propria scelta `default` o `summary`. Una tesi centrale e una breve spiegazione anticipano la lezione, conservando le pagine degli obiettivi e i contenuti successivi. Il layout riusa `default.vue`, il ribbon, la numerazione e la palette del set: titolo ordinario a x 72 / y 52, corpo centrato nell’area sicura sopra il footer. `summaryStatement` e `summarySupport` sono contenuti nel frontmatter del Markdown; il corpo contiene soltanto il titolo H1.

La tesi usa Nunito Sans 40 px / 600, interlinea 1,3, colore primario del set e bilanciamento delle righe; la spiegazione usa 27 px / 400 e interlinea 1,48. Il gruppo è largo al massimo 1000 px, con 32 px fra le due parti. Non aggiungere card, immagini decorative o un’agenda al layout di sintesi. Il canvas conserva la composizione nel player stretto e in stampa. La lezione 03 riusa il testo «Dall’introduzione alla storia»; le altre sintesi sono ricavate dagli obiettivi e dai contenuti già presenti.

## Figure e interazione

LessonImageContent conserva proporzioni e dimensioni occupate. LessonFigure allinea didascalia e icona al raster. Immagini e ingrandimenti sono senza cornice, angoli aggiunti o ombra. Le figure a pannelli dichiarano panelAspectRatio.

Ingrandisci è un'icona sopra l'immagine, in basso a destra: opacità 45%, 100% su hover/focus, bersaglio 44×44 px. Il dialog nativo gestisce Esc e ritorno del focus; nei viewport bassi può scorrere. SlideIllustration serve agli asset decorativi, RenewalMaterials al grafico del rinnovo.

## Movimento e dati

La metro è il momento principale delle aperture: sequenze finite entro 900 ms, titoli e sottotitoli fermi. Le copertine di lezione e la chiusura hanno due percorsi disegnati con maschere SVG e tempi/direzioni dedicati; le stazioni si assestano dopo il passaggio. Una fermata principale di 56 px riprende i cerchi della timeline: un segmento percorre la traccia, raggiunge il cerchio e svanisce; all’arrivo il bordo emette un solo impulso di 200 ms. La copertina generale conserva la coreografia della mappa multicolore, senza il cerchio principale e il segmento aggiunti sulla traversa inferiore. Calendari e voti seguono l'ordine di lettura. motion-enabled deriva dallo stato Slidev; uscita, scheda nascosta, anteprima, export e movimento ridotto mostrano il risultato statico. Le fermate delle copertine di lezione restano visibili. Il listener del browser è condiviso.

Le timeline didattiche e le sequenze orizzontali usano tutte `ProcessTimeline`: daisyUI `timeline-horizontal`, tre–cinque fermate da 56 px, titoli ed eventuali descrizioni sotto la linea. L’API accetta stringhe oppure oggetti `{ title, detail }`, mantenendo ordine e label accessibile del contenuto. Il percorso metro conserva la curva originale a quattro stazioni e adatta ingresso, piega centrale e uscita alle altre cardinalità. Traccia, segmento e impulsi ereditano primario e accento del set. Un unico segmento compie il viaggio in 800 ms; ogni impulso di 200 ms parte quando la sua testa raggiunge davvero il centro della fermata, con ritardo ricavato dalla lunghezza del percorso. I testi e i cerchi sono sempre leggibili e fermi. L’attivazione dipende dal componente e dal guard condiviso `motion-enabled`, anche nelle slide che non hanno `process-slide`; uscita, scheda nascosta, movimento ridotto, stampa ed export mostrano il risultato statico. Le mappe ramificate e i cicli mantengono la propria composizione.

L'avanzamento usa progress accessibile e trasformazione decorativa. Cambio set e stampa evitano transizioni improprie; l'export mostra la metro completa anche con media screen.

La barra usa la variante scura dell’accento del set su una traccia chiara tinta al 10%. Sulle copertine di lezione e nell’archivio scuro usa `--section-accent-on-dark` (variante vivace); la traccia miscela primario profondo 900 e accento brillante all’88/12%. La copertina generale conserva questa barra su fondo bianco. Ribbon e segno del titolo restano nel primario: stessa coppia cromatica, ruoli distinti.

I contenuti sono in Markdown o data; i componenti gestiscono presentazione e interazione. La normalizzazione dei titoli delle immagini è condivisa fra runtime e controlli. Le note del relatore sono assenti e presenter è disabilitato.

## Verifica

check:source include sorgenti nascosti, durate di frontmatter, fonti e asset selezionati. check misura titoli, centraggio, footer, immagini e ingrandimenti su desktop, viewport stretto e stampa. check:covers verifica percorsi unici, assenza di sovrapposizioni e almeno 16 px di distanza fra tracce e testo su tutti e tre i formati. I controlli dedicati coprono geometria, movimento, avanzamento e font. Il helper browser aspetta contenuti e risorse renderizzati, senza affidarsi all'inattività della rete.

Rapporti cronologici e screenshot non appartengono alla documentazione: rigenerarli in reports o in una cartella temporanea. Conservare attribuzioni, licenze e originali attivi.

## Regole vincolanti per nuove slide

1. Usare `layout: default` e un solo titolo H1; la sintesi iniziale delle lezioni usa il layout condiviso `summary`. Le slide ordinarie mantengono l’ancoraggio comune e il corpo centrato; non correggere il centraggio con margini o trasformazioni applicati a una singola pagina.
2. Scegliere una composizione esistente in base alla relazione fra i contenuti: card equivalenti, testo e figura, confronto affiancato, affermazione oppure percorso. Non usare card per ogni paragrafo e non annidarle.
3. Mantenere leggibile tutto il testo. Con un titolo lungo verificare due righe, spazio residuo e footer; distribuire il contenuto su più slide se necessario, senza tagliarlo o ridurre arbitrariamente il corpo del testo.
4. Riutilizzare token e componenti. Niente CSS inline per font, palette, padding o altezze del testo; gli stili dinamici interni che misurano le immagini e applicano la palette sono responsabilità dei componenti condivisi.
5. Non aggiungere note del relatore: i commenti HTML nei Markdown sono interpretati da Slidev come note. `presenter: false` resta nell’headmatter.
6. Non riattivare la terza lezione o le voci future dell’indice senza richiesta esplicita. L’archivio dei progetti conserva il proprio tema indipendente.
7. Non reinserire cornici, ombre o arrotondamenti sulle immagini. Il comando di ingrandimento rimane una sola icona; non aggiungere il testo Ingrandisci sopra o sotto la figura.
8. Non usare esempi di interfacce simulati con form HTML. Per gli esempi didattici usare immagini che spiegano il concetto; i contenuti della lezione e i controlli reali restano semantici e accessibili.
9. Non aggiungere icone Heroicons come sfondo delle card: usare immagini generate coerenti con il significato e la palette. Le piccole icone SVG dei controlli e le geometrie della metro restano ammesse.
10. Conservare fotografie, opere e screenshot documentari autentici. Non ricolorarli per uniformarli al set e non modificare il testo incorporato negli artefatti.
11. Non introdurre loop, autoplay sonoro o effetti che rendano temporaneamente illeggibili i contenuti. Collegare il movimento a `useSlidePlayback` e rispettare stampa, export, visibilità e movimento ridotto.
12. Non modificare manualmente footer, numero totale, ribbon o progressione nel Markdown: li forniscono layout e componenti dal contesto nativo Slidev.

### Copertine

La copertina generale usa `ClosingMetro original`, mappa multicolore e fascia indaco opaca che protegge titolo, metadati e attribuzioni. La mappa conserva i tracciati originali senza una fermata circolare principale sovrapposta. Le copertine di lezione usano `chapter-slide`, `ChapterMetro`, fondo primario del set, Inter, titolo bianco allineato a sinistra e numero della lezione. Mantengono margine sinistro 68 px e il numero in alto a 64 px; il testo occupa al massimo 1016 px, con padding verticale 144 / 200 px e 28 px fra titolo e sottotitolo. Brief e Approfondimenti non ricevono numeri di lezione inventati. Le copertine non mostrano immagini o illustrazioni: titolo, metadati e metro animata occupano il canvas. Il titolo mantiene Inter 92 px e l’area testuale larga 1016 px. Le 13 illustrazioni generate restano conservate come asset disponibili nel progetto, con PNG originali, prompt, WebP lossless e registrazione in `assets/theme-imagegen/manifest-chapters-v1.json`; `ChapterMetro` non le carica. Le sei immagini delle lezioni 04–09 restano nel sottoalbero `chapters/local`, escluso dalle build.

I percorsi in `data/cover-routes.ts` sono distinti per corso, esame, archivio, brief, approfondimenti, introduzione, storia, le sei lezioni sul processo UX e chiusura. Le linee occupano la fascia inferiore e il margine destro, lasciando libera l’area del testo (x 68–1084, y 176–472) e il footer. `MetroTrack` condivide maschere e segmento mobile; `ChapterMetro` sceglie i dati tramite `section` e dispone le stazioni sopra entrambe le linee. `MetroStop` disegna la fermata principale, con la geometria del cerchio della timeline e un punto centrale senza nuovi numeri o testi. `stopProgress` registra la posizione sulla traccia: il controllo del movimento verifica che il segmento la raggiunga. La chiusura mantiene il layout ordinario su fondo chiaro e un proprio percorso in uscita. La lezione di storia è attiva in locale e online. Non sostituire i titoli delle copertine con badge circolari o nuovi effetti di luce.

### Superfici, gerarchia e accessibilità

- Fondo ordinario slate-50, testo principale slate-900, prosa slate-700; usare i token del tema, non nuovi valori isolati.
- Card bianche, raggio 16 px, ombra condivisa `--theme-shadow` (0 8px 24px al 5%). Nessun bordo aggiuntivo per dare una seconda elevazione. Le illustrazioni sono selettive: pochi motivi con contorni scuri arrotondati e campiture chiare, nella palette del set, solo quando aiutano a riconoscere il concetto. Nei gruppi di due card equivalenti occupano l’angolo in basso a destra: 168 × 168 px, opacità 60%, rientro di −24 px su entrambi i lati e ritaglio tramite overflow hidden della card. Il corpo riserva 176 px a destra, così il testo non passa sopra l’immagine. Nei gruppi compatti, nelle formule e nelle card isolate l’immagine è omessa e il testo usa tutta la larghezza. La composizione si scala insieme al canvas senza riordinare i contenuti.
- Domande, richieste didattiche, inviti ad approfondire e curiosità usano `CvediNotice` (`kind`: `question`, `request`, `explore`, `curiosity`), basato su `alert alert-soft` daisyUI. Stesso stile in tutti i set: tinta del primario al 4%, bordo completo 1 px al 18%, raggio 12 px, titolo facoltativo 22 px e corpo 18 px (token titolo compatto e nota). L’icona cambia per tipo (domanda, scrittura, libro, lampadina), è decorativa, 96 × 96 px al 12% e tagliata di 16 px in alto a destra; il testo riserva 112 px sul lato destro. Collocare il componente come ultimo contenuto diretto della slide: bordo inferiore a 82 px dal fondo del canvas, sopra footer e avanzamento, con almeno 24 px di separazione dal contenuto precedente e corpo principale centrato nello spazio residuo. Nelle card `interaction-examples` con un box finale, le figure usano un’altezza di 176 px per riservare questo spazio, conservando le proporzioni. Conservare i testi; didascalie, tempi delle attività, regole di valutazione e risultati strutturati dei temi mantengono i propri componenti. Non usare barre laterali colorate o trattamenti da errore per una nota informativa.
- Didascalie e testo secondario devono conservare contrasto; gli sfondi delle card sono decorativi, a bassa opacità e fuori dall’albero accessibile.
- Testo corrente almeno 4,5:1 e testo grande almeno 3:1. Etichette, focus e ordine del DOM devono spiegare l’interazione anche da tastiera.
- Font reali locali, senza grassetto o corsivo artificiali. Il titolo lungo si bilancia senza tracking più stretto di −0,04 em.
- Il ribbon è il segnalibro condiviso in alto a destra, con ombra morbida verso il basso (`--theme-ribbon-shadow`: 0 4px 6px, colore del testo al 18%). Applicare il drop-shadow al contenitore per seguire anche l’angolo tagliato; non ripristinare il ribbon diagonale o collocarlo nel footer. In stampa rimane nascosto.

## Componenti da scegliere

| Esigenza | Componente / struttura |
| --- | --- |
| Domande, richieste, approfondimenti e curiosità | `CvediNotice` come ultimo contenuto diretto |
| Card equivalenti | `CvediCard` dentro `cvedi-grid`, eventualmente `three` o `four` |
| Fotografia, diagramma o confronto ingrandibile | `LessonFigure`, anche dentro `lesson-columns` |
| Immagine decorativa | `SlideIllustration`, senza testo alternativo ridondante |
| Collegamento a una slide | `SlideAction` con alias `to` |
| Calendario / distribuzione / confronto dei voti | `CourseCalendar`, `GradeDistribution`, `GradeYearTable` |
| Timeline o sequenza di 3–5 elementi | `ProcessTimeline`, con titolo e descrizione facoltativa |
| Alberatura / nuclei UX | `SitemapDiagram`, `UxProcessMap` |
| Esempio UX da catalogo | `UxExampleSlide`, con dati in `data/ux-examples.json` |
| Materiali, copertine e chiusura | `RenewalMaterials`, `ChapterMetro`, `ClosingMetro` |

L’API delle card contiene il titolo e lo slot dei contenuti; la vecchia proprietà illustration è assente. Le figure non accettano più la proprietà bordered. Per ogni card registrare il titolo normalizzato in `data/card-artwork.json`: un asset semanticamente pertinente solo se utile, altrimenti `null`. Non assegnare un’immagine per riempire la card. `thematicAssets` conserva separatamente le figure della mappa UX; non alimenta gli sfondi delle card. Le cinque figure della mappa occupano una fascia dedicata di 72 px sopra i titoli delle stazioni, a piena opacità e con 12 px di separazione dal testo; non sono sfondi dietro le fasi. PNG, prompt e WebP dei motivi precedenti sono registrati in `assets/theme-imagegen/manifest-cards-v2.json`. Il rifacimento approvato è registrato in `assets/theme-imagegen/manifest-outline-v3.json`: contorni scuri arrotondati, campiture chiare, un accento semantico e profondità illustrativa leggera. Gli originali precedenti restano conservati.

Per un’immagine nuova: produrre il raster con ImageGen quando richiesto dal contenuto, nella famiglia illustrativa 2D approvata: contorni arrotondati nel primario 950, superfici bianche o tinte 100/200 e un accento del set. La profondità è limitata a un sottile piano arretrato, con campiture prevalentemente piatte; niente texture di carta, riflessi lucidi, ombre esterne, cornici o testo decorativo inutile. I motivi decorativi conservano il fondo trasparente; le figure didattiche complesse usano la superficie opaca slate-50 della slide (bianco per i confronti di gerarchia), così diagrammi e scritte restano puliti senza aloni. Conservare PNG originale, licenza/provenienza e manifest; il WebP selezionato deve mantenere pixel e trasparenza. Per i percorsi pubblici riutilizzare `publicAsset`, così la risorsa funziona anche in `/cvedi2627/slides/`.

## Esempi di partenza

Esempio illustrativo di una nuova pagina nel brief. Numero, alias, titolo e contenuti devono essere adattati alla posizione effettiva; i titoli delle card qui riusano chiavi già presenti nel catalogo.

```md
---
layout: default
lesson: brief-progetto
lessonSlide: 26
class: content-slide project-section reading-slide lesson-slide brief-section
routeAlias: brief-nuovo-argomento
footer: "WHAT IF? · Nuovo argomento"
---

# Titolo della slide

<p class="lead">Una frase che introduce l’idea centrale.</p>
<div class="cvedi-grid">
  <CvediCard title="Persone e valore">
    <p>Un contenuto sintetico, con una sola priorità.</p>
  </CvediCard>
  <CvediCard title="AI e controllo">
    <p>Un secondo aspetto equivalente, con il suo contenuto.</p>
  </CvediCard>
</div>
```

Per una figura usare il pattern già presente, con percorso dell’asset reale:

```html
<div class="lesson-columns">
  <div>
    <p class="lead">Il concetto da osservare nell’immagine.</p>
    <p>Una spiegazione collegata all’esempio.</p>
  </div>
  <LessonFigure
    src="/images/percorso-reale.webp"
    alt="Descrizione dell’informazione visiva rilevante."
    caption="Didascalia o fonte necessaria."
  />
</div>
```

Aggiungere al frontmatter le classi `figure-slide` e, quando la figura è primaria, `figure-dominant`. Per una coppia confrontabile usare `figure-pair`, con ordine A/B uguale nel DOM e nella lettura visiva. Gli approfondimenti riusano `topic-layout`: domanda, colonne di sviluppo e figura, esito. Le lezioni 04–09 usano le composizioni ordinarie già presenti: spiegazione, confronto, card equivalenti, tabella e attività. Le figure del booklet sono esportate senza le barre e i filetti della pagina, conservando proporzioni, originali, crediti e copie WebP lossless. Il diagramma dei tempi usa il raster originale orizzontale fornito da Figma, senza la rotazione della pagina stampata; l’esportazione ruotata resta conservata. Le tabelle delle lezioni usano il corpo condiviso da 20 px. Gli esempi di wireflow e stati sono immagini del contenuto Figma, senza form didattici HTML interattivi. Le nuove card hanno una decisione esplicita `null` nel catalogo: le figure informative hanno una collocazione propria. Il caso prenotazione resta dichiarato come simulato; interpretazioni culturali e indicazioni operative conservano i limiti esplicitati dalla fonte.

## Procedura di aggiunta e verifica

1. Identificare il set, il file Markdown proprietario e il pattern più vicino; leggere questo documento e `PRODUCT.md`.
2. Inserire la pagina nell’ordine corretto, con alias unico e `lessonSlide` progressivo dove il set lo usa. Nelle lezioni teoriche registrare `lessonMinutes` e mantenere il totale previsto.
3. Aggiornare fonti, dati e cataloghi interessati. Footer e progressione si ricalcolano automaticamente; non creare conteggi paralleli.
4. Adeguare i controlli strutturali soltanto per le variazioni intenzionali di numero o sequenza: non rimuovere le verifiche di asset, fonti, accessibilità o layout per far passare la nuova pagina.
5. Eseguire `pnpm check:source` e `pnpm build`. Per una nuova composizione verificare desktop, viewport stretto e stampa con `pnpm check` e i controlli dedicati pertinenti. Per palette, immagini o stato attivo verificare anche ingrandimento, focus, movimento ridotto ed export.
6. Usare un’anteprima isolata per i test; salvare prove e rapporti in `reports/` o fuori dal repository. Non aggiungere nuovi documenti cronologici duplicati.
7. La pagina è pronta quando titolo e corpo rispettano gli ancoraggi, non c’è contenuto fuori margine, gli asset reali sono caricati, i colori appartengono al set e la tastiera mantiene un percorso completo.

L’architettura deve mantenere separate informazione e presentazione: Markdown e `data/` descrivono contenuti; Vue gestisce visualizzazione e interazione; CSS condiviso possiede i ruoli. Estendere il modulo proprietario quando manca una regola riusabile, senza introdurre copie locali nei singoli Markdown.
