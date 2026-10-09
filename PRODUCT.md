# CVeDI 2026/27

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

Presentazione didattica del corso Comunicazione visiva e design delle interfacce, con informazioni sul corso, brief di progetto, approfondimenti individuali e lezioni teoriche. I contenuti e gli esempi devono restare leggibili durante la presentazione e consultabili autonomamente.

## Operating Context

Slidev e Vue su canvas 1280 × 720, navigazione da tastiera e indice. Numerazione e avanzamento sono autonomi per set. Il progetto rimanda all’[archivio dei lavori degli studenti](https://cremarco.github.io/cvedi-progetti/), conservato nel repository autonomo `cremarco/cvedi-progetti`.

## Capabilities and Constraints

Il deck contiene 328 slide online e 535 nell’anteprima locale; i sorgenti conservano 535 slide. Le lezioni 05–09 sono escluse dalle build pubblicate tramite gli import `localOnly: true`; anche le loro voci dell’indice e immagini esclusive sono escluse. La lezione 3 di storia del design e la lezione 4 «Ricerca, contesto e inclusione», con le sue 86 slide dopo la rimozione delle slide 87–109, sono attive in entrambe le modalità. Le figure del processo UX sono esportate soltanto se referenziate dal bundle pubblicato. Queste scelte, i contenuti e le destinazioni dei collegamenti devono essere conservati nel restyling.

Gli esempi autonomi di Caffè TTC hanno il percorso `/web-design-examples/`, con quattro pagine e 21 stili selezionabili. Su GitHub Pages appartengono alla radice del progetto, `/cvedi2627/web-design-examples/`; i contenuti delle slide continuano a usare le proprie figure didattiche. I sorgenti degli esempi restano in `esempi/caffe-luce/`.

## Brand Commitments

L’utente ha richiesto di copiare la grafica delle slide locali in `/Users/marco/Sites/Gestione web`. Del precedente sistema CVeDI può restare il formalismo dei tracciati della metro. Le immagini e gli artefatti didattici conservano il loro contenuto.

## Home del corso · Pages

La radice GitHub Pages `/cvedi2627/` è la home del corso, con nome ufficiale, A.A. 2026/27, 8 CFU e docenti Marco Cremaschi, Elia Guarnieri e Andrea Primo Pierotti, allineati alle slide. La scena metro animata introduce quattro destinazioni: slide in `slides/`, archivio degli studenti in `https://cremarco.github.io/cvedi-progetti/`, Caffè TTC in `web-design-examples/index.html?stile=liquid` e iLMeteo. I collegamenti interni relativi funzionano anche servendo la build dalla radice `/`; l’archivio usa il proprio URL assoluto. Le anteprime locali delle slide restano in `public/images/project-gallery/`, con provenienza nel catalogo `data/projects.json`. I vecchi URL `project/` sono reindirizzati al nuovo archivio, conservando percorsi, query e frammenti tramite JavaScript.

iLMeteo è esplicitamente «In arrivo»: l’utente ha scelto il sito riprogettato quando sarà pronto. Fino ad allora la quarta destinazione resta visibile e priva di collegamento. Le tre destinazioni disponibili sono consultabili anche senza JavaScript; l’introduzione animata della home termina automaticamente entro 4,5 secondi e rispetta movimento ridotto, scheda nascosta e stampa, senza un pulsante di pausa. Il deck e gli esempi conservano i propri sistemi e sorgenti.

## Evidence on Hand

`slides.md`, `lezioni/`, mappe delle fonti in `docs/fonti/`, materiali e figure in `assets/` e `public/`. Il riferimento grafico è un progetto Slidev esistente e ispezionabile.


## Approfondimenti individuali

Dopo il brief, il set autonomo `approfondimenti` contiene una copertina e una slide per ciascuna delle 20 tracce A01–A20 pubblicate su eLearning. Titoli e domande ufficiali sono conservati; ogni tema ha un’immagine originale ImageGen nella palette giallo/indaco assegnata da `DESIGN.md`. La fonte ufficiale resta in `assets/approfondimenti/`; prompt, raster e verifiche della famiglia a contorni arrotondati sono registrati in `assets/theme-imagegen/manifest-outline-v3.json`.

## Processo UX · lezioni 04–09

Il capitolo C03 del booklet Figma (`WLdDzbdqP3P5rpYbK1OxYC`) è distribuito in 13 Pages tematiche C03.01–C03.13, con ingresso da C03.01 · Apertura (`2008:1741`). Il registro delle Pages e degli intervalli di tavole è in `assets/booklet/capitolo-3/testo-figma-aggiornato.json`. I contenuti sono articolati in sei lezioni: ricerca e inclusione; percezione e gerarchia; colore; tipografia e griglie; prototipi e videogiochi; test e implementazione. Il capitolo Figma corrente conta 289 tavole: 10 di apertura e 59 nella sezione di ricerca, utenti e contesto. Il ripristino del 9 ottobre 2026 recupera le due pagine dell’apertura precedente e conserva tutte le sei tavole con le integrazioni. Nella sezione culturale, le dimensioni e gli altri framework precedono i casi McDonald’s e Alibaba importati integralmente dal booklet 2024, con testi nativi e immagini della stessa fonte. Il booklet termina alla pagina stampata 399. L’apertura corrente è registrata in `assets/booklet/apertura-ux-revisione/manifest.json`, con il controllo del ripristino in `reports/apertura-ux/ripristino.json`; lo stato corrente della sezione culturale è in `assets/booklet/contesto-culturale-revisione/manifest.json`, mentre fonti, immagini e mappa PDF delle importazioni sono in `assets/booklet/casi-studio-integrali/manifest.json`. Le 293 slide e i loro 138 asset originali, integrati con 23 catture dal booklet 2024 e 19 nuove catture online dei siti ufficiali, conservano il riferimento allo snapshot storico di 260 tavole del 7 ottobre 2026. La fonte, le figure e le corrispondenze sono conservate in `assets/booklet/capitolo-3/`; il piano è in `data/ux-curriculum.json` e le mappe in `docs/fonti/04–09`. Le voci 05–09 dell’indice sono attive soltanto in locale; le lezioni 03 e 04 sono attive anche online. Le 20 card attive della lezione 04 usano le illustrazioni della famiglia originale ImageGen di 31 asset per 36 titoli, nella palette lime/magenta; originali, prompt e diritti sono nel manifest della famiglia, con catalogo e asset condivisi fra anteprima locale e build della lezione.

## Manutenzione

La sezione Figma C03.02 · Ricerca, utenti e contesto include le sei dimensioni di Hofstede, Hall, Schwartz, GLOBE e WVS, con casi storici di localizzazione. Le 59 tavole correnti sono ordinate in 37 tavole teoriche, una tavola ponte, 16 per McDonald’s e 5 per Alibaba. Le sei aperture delle dimensioni usano sfondi artistici originali ImageGen a tutta pagina, con codice, titolo e nomi dei due poli modificabili in Figma; ciascuna è seguita da una tavola distinta con il grafico nativo e i dati The Culture Factor consultati il 9 ottobre 2026. I casi del booklet 2024 restano invariati. I casi riprendono integralmente le pagine PDF 172–187 di `materiali/booklet precedente/Booklet_CVDI_12_2024.pdf`: copertine, 41 blocchi di testo e tutte le figure. Cinque continuazioni separano le schermate dai testi più lunghi per conservarne la leggibilità. Le 37 tavole teoriche, incluse Kinder e le 7 aggiunte culturali precedenti, restano nel percorso; il diagramma originale di Hofstede resta visibile nell’introduzione. Le 14 tavole dei casi della composizione precedente sono conservate nella Page Figma 99 · Archivio e revisioni, sezione `2665:278`; il loro contenuto è sostituito nel percorso attivo dall’edizione 2024. Fonti, licenze e corrispondenze correnti sono registrate in `assets/booklet/casi-studio-integrali/manifest.json`, con la verifica in `reports/contesto-culturale/casi-integrali/verifica.json`. La tavola sulle personas AI resta esclusa e conservata in archivio. I dati di estrazione e le mappe Slidev precedenti conservano il riferimento temporale allo snapshot storico; il mapping culturale precedente è conservato esplicitamente come storico.

Il deck non contiene note del relatore e disabilita presenter. Conservare i materiali attivi, le attribuzioni e le licenze; rapporti temporanei e output riproducibili restano fuori dalla documentazione.

## Riferimento per le nuove slide

`DESIGN.md` nella radice è il contratto grafico; deve essere letto prima di aggiungere o modificare slide. `AGENTS.md` indica la procedura di lavoro e le verifiche.
