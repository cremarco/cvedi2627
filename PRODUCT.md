# CVeDI 2026/27

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

Presentazione didattica del corso Comunicazione visiva e design delle interfacce, con informazioni sul corso, brief di progetto, approfondimenti individuali e lezioni teoriche. I contenuti e gli esempi devono restare leggibili durante la presentazione e consultabili autonomamente.

## Operating Context

Slidev e Vue su canvas 1280 × 720, navigazione da tastiera e indice. Numerazione e avanzamento sono autonomi per set. Il progetto conserva anche l’archivio dei lavori degli studenti.

## Capabilities and Constraints

Il deck contiene 242 slide online e 498 nell’anteprima locale; i sorgenti conservano 498 slide. Le lezioni 04–09 sono escluse dalle build pubblicate tramite gli import `localOnly: true`; anche le loro voci dell’indice e immagini esclusive sono escluse. La lezione 3 di storia del design e la voce 03 dell’indice sono attive in entrambe le modalità. Queste scelte, i contenuti e le destinazioni dei collegamenti devono essere conservati nel restyling.

Gli esempi autonomi di Caffè TTC hanno il percorso `/web-design-examples/`, con quattro pagine e 21 stili selezionabili. Su GitHub Pages appartengono alla radice del progetto, `/cvedi2627/web-design-examples/`; i contenuti delle slide continuano a usare le proprie figure didattiche. I sorgenti degli esempi restano in `esempi/caffe-luce/`.

## Brand Commitments

L’utente ha richiesto di copiare la grafica delle slide locali in `/Users/marco/Sites/Gestione web`. Del precedente sistema CVeDI può restare il formalismo dei tracciati della metro. Le immagini e gli artefatti didattici conservano il loro contenuto.

## Home del corso · Pages

La radice GitHub Pages `/cvedi2627/` è la home del corso, con nome ufficiale, A.A. 2026/27, 8 CFU e docenti Marco Cremaschi, Elia Guarnieri e Andrea Primo Pierotti, allineati alle slide. La scena metro animata introduce quattro destinazioni: slide in `slides/`, archivio degli studenti in `project/`, Caffè TTC in `web-design-examples/index.html?stile=liquid` e iLMeteo. I collegamenti relativi funzionano anche servendo la build dalla radice `/`.

iLMeteo è esplicitamente «In arrivo»: l’utente ha scelto il sito riprogettato quando sarà pronto. Fino ad allora la quarta destinazione resta visibile e priva di collegamento. Le tre destinazioni disponibili sono consultabili anche senza JavaScript; la home offre pausa e ripresa delle tracce e rispetta movimento ridotto, scheda nascosta e stampa. Il deck e gli esempi conservano i propri sistemi e sorgenti.

## Evidence on Hand

`slides.md`, `lezioni/`, mappe delle fonti in `docs/fonti/`, materiali e figure in `assets/` e `public/`. Il riferimento grafico è un progetto Slidev esistente e ispezionabile.


## Approfondimenti individuali

Dopo il brief, il set autonomo `approfondimenti` contiene una copertina e una slide per ciascuna delle 20 tracce A01–A20 pubblicate su eLearning. Titoli e domande ufficiali sono conservati; ogni tema ha un’immagine originale ImageGen nella palette giallo/indaco assegnata da `DESIGN.md`. La fonte ufficiale resta in `assets/approfondimenti/`; prompt, raster e verifiche della famiglia a contorni arrotondati sono registrati in `assets/theme-imagegen/manifest-outline-v3.json`.

## Processo UX · lezioni 04–09

Il capitolo C03 del booklet Figma (`WLdDzbdqP3P5rpYbK1OxYC`, pagina `2008:1741`) è articolato in sei lezioni da 120 minuti: ricerca e inclusione; percezione e gerarchia; colore; tipografia e griglie; prototipi e videogiochi; test e implementazione. Le 256 slide coprono 260 tavole e usano 138 asset originali. La fonte, le figure e le corrispondenze sono conservate in `assets/booklet/capitolo-3/`; il piano è in `data/ux-curriculum.json` e le mappe in `docs/fonti/04–09`. Le nuove voci dell’indice sono attive soltanto in locale; la lezione 03 di storia è attiva anche online.

## Manutenzione

Il deck non contiene note del relatore e disabilita presenter. Conservare i materiali attivi, le attribuzioni e le licenze; rapporti temporanei e output riproducibili restano fuori dalla documentazione.

## Riferimento per le nuove slide

`DESIGN.md` nella radice è il contratto grafico; deve essere letto prima di aggiungere o modificare slide. `AGENTS.md` indica la procedura di lavoro e le verifiche.
