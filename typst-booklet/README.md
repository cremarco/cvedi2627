# Booklet in Typst

`piano.json` è l’autorità per ordine, titoli, numerazione, file e stato dei capitoli. Il booklet comprende sette capitoli, numerati **01–07**: alle sei lezioni iniziali si aggiunge **Griglie e layout**, dalla Page Figma corrente `4954:42`, su richiesta dell’utente. `main.typ` richiama i file disponibili in `capitoli/`, con le rispettive fonti in `bibliografia/`: **I sette capitoli sono inclusi**; **i capitoli 06 e 07 sono in revisione editoriale**. Il capitolo 06 conserva le sezioni 6.1–6.9 e le fonti complete; il capitolo 07 importa la fonte corrente e la propria bibliografia APA. Gli inserti a pagina intera dei capitoli 02–04 sono verificati. I capitoli in preparazione non producono pagine vuote.

I titoli sono brevi sintagmi nominali che identificano il contenuto. Si aggiornano soltanto nel piano, così aperture, indice e segnalibri PDF conservano lo stesso titolo completo. Gli eventuali salti di riga dell’apertura sono una scelta di presentazione e non una seconda copia del titolo. Nei titoli riformulati la congiunzione «e», anche maiuscola, resta unita alla parola seguente, per evitare una riga composta dalla sola congiunzione. «Colore e significato» mantiene il titolo e la presentazione approvati.

Il campo `fonti` accetta un percorso oppure una lista di percorsi. La bibliografia nativa combina BibLaTeX e YAML quando occorre: i numeri di articolo, come `e340` in Gestalt, sono nel campo YAML `serial-number.serial`, perché Typst 0.15.1 non importa il campo BibLaTeX `eid`. Le citazioni e lo stile APA restano gestiti da Typst.

Frontespizio, crediti e indice usano numeri romani minuscoli (`i`, `ii`, `iii`…), anche nei folio e nelle etichette PDF. L’indice cresce con il piano; il primo capitolo comincia sul recto e riparte da pagina 1. Il salto nativo conserva la parità dei capitoli esistenti quando l’indice occupa una pagina in più, mantenendo margini speculari, doppie pagine e tavole di raccordo.

| Codice e capitolo | Lezione Slidev | Tema storico | Colore assegnato | Stato |
| --- | --- | --- | --- | --- |
| 00 · Frontespizio, crediti e indice | — | — | gray 300 · `#D1D5DC` | Incluso |
| 01 · Storia del design visivo | 03 | 2 | red 300 · `#FFA2A2` | Completo |
| 02 · Ricerca, persone e culture | 04 | 4 | orange 300 · `#FFB86A` | Completo |
| 03 · Accessibilità e inclusione | 05 | 5 | amber 300 · `#FFD230` | Completo |
| 04 · Percezione e Gestalt | 06 | 7 | yellow 300 · `#FFDF20` | Completo |
| 05 · Colore e significato | 07 | 10 | lime 300 · `#BBF451` | Completo |
| 06 · Tipografia e lettura | 08 | 11 | green 300 · `#7BF1A8` | In revisione |
| 07 · Griglie e layout | 08 (percorso storico) | 12 | emerald 300 · `#5EE9B5` | In revisione |

Introduzione, Processo UX, Define, Linguaggio visivo e Gerarchia visiva sono esclusi dal piano. Le vecchie prove di Introduzione e Griglia, con le fonti, restano in `esperimenti/capitoli-esclusi/`; il vecchio `12-griglia.typ` non è la fonte del nuovo capitolo 07. Per La griglia, il numero 08 identifica il percorso storico delle slide, oggi escluso dalla lezione di sola Tipografia; la fonte corrente resta la Page Figma `4954:42`. I numeri delle lezioni Slidev e i codici Figma identificano le fonti, senza fissare numeri di capitolo o folio del nuovo volume. Il vecchio concept della metropolitana è escluso.

## Organizzazione

```text
typst-booklet/
├── main.typ                  Ingresso del booklet
├── piano.json                Sette capitoli, ordine e stato editoriale
├── capitoli/                 Un solo file completo per capitolo, compilabile da solo
│   ├── 00-frontespizio-indice.typ
│   ├── 01-storia-del-design.typ
│   ├── 02-ricerca.typ
│   ├── 03-accessibilita.typ
│   ├── 04-gestalt.typ
│   ├── 05-colore.typ
│   ├── 06-tipografia.typ
│   └── 07-griglia.typ
├── bibliografia/             Fonti APA dei singoli capitoli
├── template/
│   ├── stile.typ             Gabbia, tipografia e apparati
│   ├── geometria.typ         Quote e larghezze derivate del sistema editoriale
│   ├── editoriale.typ        Caption, diritti, sottotitoli e note compatte
│   ├── pagine.typ            Contenitori documentari, al vivo e Appunti
│   ├── figure.typ            Figure ordinarie, schermate e inserti autonomi
│   ├── piano.typ             Metadati e fonti condivisi da volume e anteprime
│   ├── note.typ              Note a tutta gabbia sotto le due colonne
│   ├── sagome.typ            Testo attorno alle trasparenze
│   ├── profili.typ           Contratto e lettura comune dei profili alpha
│   ├── doppia-pagina.typ     Sagoma sul dorso e note nelle colonne esterne
│   ├── documenti-doppi.typ   Documenti rettangolari sul dorso, con testi nativi
│   ├── ricerca.typ          Tavole e grafici specifici del capitolo
│   ├── accessibilita.typ    Composizione della mappa WCAG
│   ├── gestalt.typ          Tavole documentarie della Gestalt
│   ├── griglia.typ          Figure e doppie pagine del capitolo
│   ├── consigli-tipografia.typ  Campioni dei consigli tipografici
│   └── aperture/             Composizioni di titolo e numero
├── anteprime/aperture.typ     Campionario delle aperture attive
├── scripts/                  Preparazione delle sagome e dei colori
├── esperimenti/              Demo e capitoli esclusi dal piano
└── build/                    PDF generati, esclusi da Git
```

Il comando comune è `../scripts/booklet.mjs`; `../scripts/booklet.py` è l’ingresso Python dei moduli in `../scripts/booklet/`: ambiente e asset, compilazione, inventario editoriale, PDF, regressioni e CLI. Le prove sono in `../scripts/booklet-prove/`. Gli hash degli originali vengono calcolati a blocchi; i collegamenti delle note sono indicizzati per pagina.

Ogni `.typ` in `capitoli/` contiene tutto il testo del capitolo, senza inclusioni di frammenti esterni. Il file esporta `testo`, che `main.typ` importa per il volume, e applica il template quando viene compilato direttamente. `00-frontespizio-indice.typ` raccoglie anche i crediti; la sua anteprima mostra l’elenco dei capitoli, mentre l’indice analitico con i numeri di pagina si popola nel volume completo. I blocchi di contenuto conservano gli ambiti locali delle regole di pagina e delle figure. Le composizioni specifiche restano in `template/`, separate dalla prosa. Le tre fonti di Tipografia sono dichiarate una sola volta nel piano; il resolver assegna i quattro gruppi APA del capitolo. Lo stato `in-revisione` indica che il testo è presente ma la verifica editoriale non è conclusa.

Le immagini e i font sono nella cartella `../assets/`: figure condivise con le slide in `images/figure/<tema>/`, aperture attive in `booklet/aperture-imagegen-svg-v1/`, biblioteca precedente in `images/aperture/`, font in `fonts/editoriali/` e profili alpha in `dati/sagome/`. Le prove grafiche precedenti stanno in `archivio/typst/`. La [guida agli asset](../assets/README.md) indica originali, manifest, licenze e copie generate.

## Aprire e compilare

Aprire **questa cartella** in VS Code. La configurazione `.vscode/settings.json` di Tinymist imposta la radice del progetto al repository padre e carica soltanto i font condivisi. Aprire `main.typ` per il volume oppure un file di `capitoli/` per il singolo capitolo e avviare **Typst Preview**. La versione collaudata della CLI è **Typst 0.15.1**, fissata in `.typst-version`: il comando rifiuta altre versioni. Aggiornare la versione soltanto dopo il confronto dei rendering e il superamento delle verifiche. La Preview di Tinymist usa il proprio motore: la verifica CLI rimane quella di consegna.

Nella **preview di Codex non aprire i PDF del booklet**, compresi i PDF dei capitoli: anche questi possono essere troppo grandi e provocare il crash dell’app. Compilare e verificare i PDF tramite CLI e consultare il volume completo in un lettore esterno. Le risposte di Codex mostrano soltanto PNG delle pagine interessate, senza allegati o collegamenti al PDF. Typst Preview esterno in VS Code è un ambiente distinto.

Per controllare la composizione effettiva del PDF già compilato, dalla radice del repository:

```sh
pnpm preview:booklet --pages 8-9
pnpm preview:booklet --target tipografia --pages 12,15-16
```

Il comando richiede **pagine fisiche numerate da 1**, distinte dal folio stampato, e accetta al massimo **otto pagine** con intervalli chiusi. Crea soltanto `pagina-NNNN.png` in `build/anteprime-ispezione/<target>/`, con lato lungo massimo **1600 px**, e stampa i soli percorsi richiesti. Non apre file, non ricompila il volume e non riscrive PDF o rapporti di verifica. Occorrono il venv con le dipendenze già previste e `pdftoppm` di Poppler nel `PATH`. Dopo una modifica ai sorgenti compilare prima il target pertinente: i PNG rappresentano il PDF presente su disco, non certificano che sia aggiornato. Il comando `pnpm check:booklet` resta la verifica editoriale.

Il [hook locale](../.codex/hooks.json) controlla `open_in_codex` prima dell’apertura, bloccando tutti i PDF sotto `typst-booklet/` e, per le chat di questo progetto, i PDF da almeno **20 MiB**, anche se copiati o rinominati. Lo script [booklet-preview-guard.py](../scripts/booklet-preview-guard.py) controlla percorso e dimensione senza leggere il PDF; gli altri strumenti e i PNG restano disponibili. Per attivarlo una volta sola, avviare il Codex CLI nella radice del progetto, aprire `/hooks` e rivedere e autorizzare «Verifica anteprima booklet». Codex richiede fiducia esplicita per i nuovi hook; finché non viene concessa, il blocco tecnico non è attivo. Il ripristino automatico di una vecchia scheda e le aperture manuali non passano dal hook: chiudere le schede PDF già salvate. Non modificare il bundle dell’app o gli hash di fiducia per forzare l’attivazione. Il comportamento degli hook è descritto nella [documentazione ufficiale OpenAI](https://learn.chatgpt.com/docs/hooks).

Sul Mac corrente il CLI è incluso nell’app, anche senza `codex` nel `PATH`. Avviarlo da Terminale con:

```sh
"/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex" -C /Users/marco/Sites/cvedi2627
```

Digitare `/hooks`, rivedere il solo hook di progetto «Verifica anteprima booklet» e concedere la fiducia. Riaprire quindi le chat interessate perché carichino la configurazione aggiornata. Se il hook viene modificato, Codex ne richiederà una nuova revisione.

Con **⌘⇧B** l’attività predefinita `Typst: booklet` usa lo stesso comando della CLI e compila volume e anteprime. `Typst: anteprima aperture` compila soltanto il campionario; `Typst: verifica booklet` esegue tutti i controlli. Le impostazioni sono in `.vscode/tasks.json`.

Dalla radice del repository, preparare una volta Python **3.10 o successivo** con le dipendenze collaudate per immagini e PDF:

```sh
python3 -m venv typst-booklet/.venv
typst-booklet/.venv/bin/python3 -m pip install -r typst-booklet/requirements.txt
pnpm build:booklet
pnpm check:booklet
```

Su Windows usare `typst-booklet/.venv/Scripts/python.exe` per l’installazione. Il runner sceglie `BOOKLET_PYTHON` quando impostato, altrimenti il Python del venv locale e infine `python3`. Non è necessario attivare il venv. La versione Typst deve essere disponibile nel `PATH`.

Entrambi i comandi verificano piano, temi, percorsi, font e licenze con hash, dimensioni e contenuto dei profili alpha, poi compilano `main.typ`, il campionario delle aperture e gli otto file autonomi di `capitoli/`. Qualsiasi avviso Typst causa un fallimento. `check:booklet` controlla inoltre inventario delle figure, note e voci singole sulla pagina del richiamo, bibliografie, ancore delle figure mobili, metadati e parità delle doppie pagine, destinazioni interne dei PDF. Le regressioni isolate verificano i contorni dei glifi a peso 700/800/900, le note ripetute, le date APA con solo anno/senza data/data completa, i profili alpha e l’overflow delle sagome con e senza note, anche su pagina pari e dispari. Le prove Python verificano inoltre i controlli stessi: link mancanti o duplicati, gruppi di pagine incompleti, profili malformati e conservazione dei rapporti completi durante una compilazione parziale. Il controllo dei link certifica la presenza delle destinazioni nel PDF; non verifica la raggiungibilità degli URL in rete o la conformità completa del PDF accessibile.

I PDF restano in `build/`; il rapporto e l’indice generato dei manifest stanno in `../reports/typst-booklet/check/`. Il controllo completo conserva `verifica.json`; compilazioni, controlli dei soli dati e ingressi singoli usano rapporti distinti, così una prova parziale non sostituisce l’ultimo controllo completo. I conteggi di figure e note attesi sono in `../scripts/booklet-prove/attesi.json`: aggiornarli soltanto dopo inserimenti o rimozioni intenzionali. Nessun numero di pagine è fissato. Per i soli dati usare `pnpm check:booklet --assets-only`. Per un ingresso usare `pnpm build:booklet --target NOME`: i nomi disponibili sono `booklet`, `aperture`, `frontespizio-indice`, `storia-del-design`, `ricerca`, `accessibilita`, `gestalt`, `colore`, `tipografia` e `griglia`.

La prova `flusso.typ` verifica che il testo successivo riempia la pagina precedente alle tavole mobili di Ricerca, Gestalt e dei componenti documentari, conservando ordine, numerazione e destinazioni PDF dei richiami. Un controllo negativo riproduce la barriera `place.flush()` e deve essere rilevato. I campioni composti soltanto con testo verificano anche l’ancora visiva di blocco, senza dipendere dalla presenza di un’immagine.

Per l’aggiornamento continuo usare Typst Preview oppure `typst watch --root . --ignore-system-fonts --font-path assets/fonts/editoriali typst-booklet/main.typ typst-booklet/build/booklet.pdf`. La prima compilazione scarica **Meander 0.4.4** e la dipendenza hy-dro-gen dal registro ufficiale; le successive usano la cache locale. Il nuovo template importa il pacchetto ufficiale senza modifiche. La copia in `esperimenti/vendor/` appartiene soltanto alle vecchie demo.

`build/` è ignorata da Git. I PDF delle fonti e gli asset originali restano versionabili. Le prove di questa sessione usano una cache temporanea ufficiale, selezionabile con `--package-cache-path /tmp/cvedi-typst-packages`; quel percorso non è necessario su un altro computer.

## Modificare il testo

Il corpo usa **DM Sans 11 pt con interlinea 13,5 pt** in tutti i capitoli, comprese le sagome. Il preset predefinito è `lettura=11-13.5`, applicato anche dai comandi ordinari di compilazione e verifica. `lettura=12-14` resta disponibile per confrontare la misura precedente: per esempio `typst compile --root . --ignore-system-fonts --font-path assets/fonts/editoriali --input lettura=12-14 typst-booklet/capitoli/02-ricerca.typ typst-booklet/build/prove/02-ricerca-corpo-12.pdf`, dalla radice del repository. Figure e campioni didattici, titoli, note, didascalie, diritti, folio e apparati conservano le rispettive misure. Ogni ricomposizione richiede di ricontrollare note, sagome e rimandi; una compilazione con avvisi non costituisce una verifica superata.

Scrivere paragrafi normali nei file `.typ` di `capitoli/`, lasciando una riga vuota fra loro. `==` introduce una sezione; `===` introduce un sottoparagrafo. Entrambi proseguono nel flusso delle due colonne, senza salti obbligatori che lascino colonne vuote; il titolo rimane legato al testo seguente. `*testo*` è grassetto e `_testo_` è corsivo. I nomi di persona sono in corsivo nella prosa, nelle intestazioni, nelle didascalie e nelle note editoriali; citazioni e bibliografie native conservano lo stile APA.

Le citazioni bibliografiche nel testo, parentetiche e narrative, mantengono famiglia e peso del testo circostante, con dimensione pari a **10/11 della sua misura** (**10 pt nel corpo da 11 pt**) e colore **`#626872`**; l’interlinea del paragrafo resta invariata. La regola comune di presentazione segue anche le citazioni nelle didascalie e conserva gli elementi `cite` nativi, con contenuti, APA, suffissi, ordinamento e collegamenti automatici. La bibliografia finale mantiene 8/10 pt e l’inchiostro ordinario `#2E3138`; sitografia nei footnote e misure delle note restano quelle approvate.

Le righe, le colonne e le pagine sono composte da Typst: non aggiungere coordinate, spezzature manuali dei paragrafi o salti per imitare i folio Figma. I numeri di pagina e i richiami sono rigenerati. In `piano.json` si gestiscono ordine, titolo, stato, file del testo e file bibliografico. `main.typ` legge questi dati e include soltanto i capitoli disponibili; i moduli di `template/` separano geometria, ruoli editoriali e composizione del capitolo.

Le figure ordinarie usano `placement: auto`: il testo successivo può occupare lo spazio che precede una figura spostata. Non inserire `place.flush()` fra paragrafi, titoli o esempi. Anche le tavole documentarie a pagina intera hanno posizione automatica e mantengono insieme immagini, didascalie e diritti. `tavola-documentaria(fissa: true)` è riservato a esercizi e raccordi intenzionali delle doppie pagine; sagome, figure sul dorso e schermate al vivo conservano i propri contenitori. La fascia note di 35 mm resta riservata nel corpo.

Scrivere le formule con il markup matematico nativo: `$a > b > 0$` nel testo, `$ c = (W - L - R - (n - 1) g) / n $` per un’equazione isolata. Usare `sqrt(5)` per la radice, `thin "mm"` per un’unità in tondo e `"1,5"` per un decimale italiano senza spazio dopo la virgola. Variabili e richiami usano la stessa notazione. Le didascalie con formule ricevono contenuto Typst dal capitolo, mantenendo nei cataloghi la trascrizione originale e il testo alternativo; non interpretare le stringhe dei dati come codice.

### Scegliere il componente

| Contenuto o tipo di pagina | Componente e responsabilità |
| --- | --- |
| Prosa, sezioni e sottoparagrafi | Markup Typst nativo; `stile.typ` definisce le regole comuni. |
| Figura nel flusso o mobile a gabbia intera | `figure.typ`: `immagine()`, con `placement` e `scope` nativi. |
| Documento mobile con altezza limitata o gabbia riservata | `figure.typ`: `documento-mobile()`; i wrapper di Ricerca e della mappa WCAG conservano rapporto, allineamento e riserva specifici. |
| Un’unica figura su un foglio autonomo mobile | `figure.typ`: `figura-pagina()`, misura caption e diritti e adatta l’immagine. |
| Più documenti sullo stesso foglio mobile | `documenti.typ`: `tavola-documentaria()`, contenuti composti con i componenti granulari; `fissa: true` conserva i raccordi intenzionali. |
| Figura a foglio intero con didascalia su un’altra pagina | `figure.typ`: `didascalia-separata()`, con miniatura e rimando automatico alla pagina dell’immagine. |
| Schermata Caffè TTC al vivo | `figure.typ`: `schermata()`, che usa `didascalia-separata()` nella prosa precedente. |
| Campione tipografico, confronto o dettaglio | `campioni.typ`; `documenti.typ` conserva i ritagli degli originali. |
| Immagine trasparente accanto a un paragrafo | `sagome.typ`: `sagoma()`, con prosecuzione nativa del testo. |
| Sagoma su uno o due fogli | `doppia-pagina.typ`: `sagoma-pagina()` o `sagoma-regionale()`; `sagoma-duomo()` conserva il solo preset del Duomo. |
| Bibliografia e Appunti | `bibliografia.typ` e `pagine.typ`, fuori dalla fascia delle note del corpo. |
| Note e profili alpha | `note.typ` e `profili.typ`, condivisi da flusso ordinario e sagome. |

`geometria.typ` raccoglie le quote; `editoriale.typ` i ruoli di caption, diritti, dettagli e titoli degli apparati. I componenti descrivono il contenuto e il suo comportamento; i sorgenti dei capitoli mantengono prosa, riferimenti e ordine editoriale. Per i nuovi moduli verificare lo [scope di import e include](https://typst.app/docs/reference/scripting/#modules) e delle [regole di stile](https://typst.app/docs/reference/styling/): l’uscita da un ambito può cambiare il flusso delle pagine anche con gli stessi valori di `page`.

Noto Sans JP completa i caratteri giapponesi assenti nei font editoriali, come quelli del glossario ukiyo-e. Noto Sans SC completa quelli cinesi assenti anche nel font JP, per esempio 劳 nel nome 麦当劳. Originali e licenze OFL sono nella cartella dei font condivisi; DM Sans e Sora conservano i propri ruoli.

Per una citazione usare `@chiave`, con la voce nel file di fonti del capitolo. Typst accetta nativamente **Hayagriva YAML** (`.yml`) e **BibLaTeX** (`.bib`): Storia usa `bibliografia/01-storia-del-design.yml`, Tipografia usa `bibliografia/06-tipografia.bib`, `06-tipografia-articoli.yml` e `06-tipografia-opere.yml`. Lo stile nativo **APA 7** genera autore–anno e bibliografia alfabetica. DOI e URL bibliografici previsti da APA rimangono nel riferimento. I collegamenti di consultazione usano invece `#sito([Descrizione], "https://…")` e diventano note al piede. Non scrivere a mano l’elenco bibliografico. Ogni capitolo termina con bibliografia a gabbia intera e una pagina Appunti.

Per Tipografia, `../assets/dati/fonti/tipografia/riferimenti-figma.json` conserva le dodici tavole originali degli apparati; `riconciliazione.json`, nella stessa cartella, documenta il ruolo dei rimandi nella nuova edizione. Distingue opere citate, consultazioni nelle note, provenienza delle immagini, fonti alternative e risorse ulteriori non usate. Una diversa URL non significa automaticamente un’opera mancante o una copia della stessa pagina. I riferimenti agli esemplari di una collezione non vanno attribuiti alle fotografie di un’altra. Le limitazioni delle risorse archiviate restano esplicite nel registro.

Typst 0.15.1 presenta un [difetto noto di APA con date limitate al solo anno](https://github.com/typst/hayagriva/issues/246): può generare `(2022,)`. Una regola locale documentata `show regex` in `template/bibliografia.typ` elimina la sola virgola superflua dalle date tra parentesi nell’apparato. Autori, titoli, anni, suffissi, date complete e collegamenti rimangono nativi; non si aggiungono giorni o mesi fittizi.

Le note occupano tutta la gabbia sotto le due colonne, in una **fascia fissa di 35 mm confermata dall’utente**, con 8 pt di distacco dal corpo. La fascia rimane riservata anche con poche note. Nei capitoli usare `sito()`, `footnote` oppure `nota-compatta()` da `template/editoriale.typ`, che accetta anche una lista di URL e le rispettive etichette brevi. `template/note.typ` raccoglie le note della pagina reale, conserva numerazione e collegamenti e misura esclusivamente i loro testi. Una nota può stare anche nel mezzo di un paragrafo. Il corpo della nota resta nel documento, vicino al proprio richiamo nell’ordine di lettura; il footer contiene soltanto il folio. Se le fonti eccedono la fascia, Typst segnala un errore con il numero della pagina: nessuna voce viene tagliata. La misura `spazio-note` è definita in `template/geometria.typ`; non inserire salti o spostamenti nei file dei capitoli per risolvere l’ingombro.

## Immagini condivise

Gli originali attivi stanno in **`../assets/images/figure/<tema>/`**, con nomi descrittivi italiani; font e licenze sono in `../assets/fonts/editoriali/`. I manifest conservano provenienza, hash e attribuzioni. Nei file Typst usare `path("/assets/images/…")`: `/` indica la radice del repository impostata da `--root`, non la radice del computer.

Il componente `immagine()` gestisce figura, didascalia, diritti e numerazione; un’etichetta come `<fig-bodoni>` permette il richiamo `@fig-bodoni`. Autore, ente di provenienza e titolare dei diritti sono informazioni distinte: non aggiungere una licenza se non è documentata.

Nelle figure personalizzate importare `testo-diritti` da `template/editoriale.typ` e scrivere `#testo-diritti[Credito e condizioni d’uso.]`. È lo stesso ruolo usato da `immagine()`: corpo 8/10 pt, peso 400, corsivo. Un nome già racchiuso fra `_` conserva il corsivo anche dentro questo ruolo; nella prosa ordinaria l’enfasi mantiene il comportamento nativo di Typst.

Per una figura che richiede tutta la gabbia, aggiungere `placement: top, scope: "parent"` alla chiamata di `immagine()`. Sono parametri nativi di [figure](https://typst.app/docs/reference/model/figure/#parameters-scope): Typst trova lo spazio e ricompone le colonne. Il testo resta nel suo ordine di lettura e l’immagine conserva le proporzioni. Usare questa opzione per diagrammi e schermate con dettagli minuti, senza fissare una pagina.

Il template corregge i normali richiami alle figure mobili per il [difetto Typst #4359](https://github.com/typst/typst/issues/4359): un marker invisibile segue l’immagine e il collegamento apre quella posizione, anche per i pannelli fissi all’interno di un contenitore mobile. Numeri e supplementi restano nativi. Non serve aggiungere codice ai capitoli né una nuova dipendenza.

Le note delle figure mobili a gabbia intera vanno nel paragrafo che le richiama: Typst può perdere le note inserite direttamente in una figura con `scope: "parent"`. Le didascalie restano accanto alle immagini, mentre URL e richiamo della nota seguono la prosa.

Per le figure a foglio intero con didascalia su un’altra pagina usare il componente comune `didascalia-separata()` di `template/figure.typ`: la miniatura dello stesso asset misura **18 mm in larghezza**, conserva l’immagine intera senza cornici e lascia **3 mm** al testo. Il blocco indivisibile comprende miniatura, numero della figura, rimando «p.» e didascalia; non crea un altro progressivo. Caption e diritti mantengono rispettivamente **9/10,8 pt** e **8/10 pt**. Numero della figura e numero della pagina sono collegati alla destinazione dell’immagine. Il folio deriva dalla destinazione e si aggiorna dopo la ricomposizione, anche nel volume con preliminari romani e ripartenza araba da 1: non scrivere numeri di pagina manuali né ricavarli aggiungendo 1 alla pagina della caption. La nota sitografica resta al piede della pagina della didascalia.

Per gli screenshot Caffè TTC richiesti a piena pagina usare `schermata(file, didascalia, etichetta, alt)`, che richiama `didascalia-separata()`: caption modificabile, miniatura, rimando e nota URL precedono una pagina senza margini, folio o apparati. Le quindici schermate attive usano questa composizione. Passare l’etichetta come argomento, per esempio `<fig-ttc-flat>`, e richiamarla con `@fig-ttc-flat`. Se la spiegazione è condivisa fra più viste, ciascuna immagine conserva comunque una miniatura con il proprio numero e rimando. Le immagini a pieno formato hanno il rapporto del foglio 17:24 e restano integre, senza ritagli, deformazioni o sovrapposizioni. Le catture escludono tab Design e selettore dello stile, conservando i controlli propri dell’esempio; i sorgenti del sito rimangono immutati.

Per le slide, `pnpm prepare:assets` genera copie identiche in `public/images/shared/`. È già richiamato prima di sviluppo, build ed esportazione. Non modificare le copie generate: cambiare l’originale in `assets/images/`. `node scripts/build/shared-assets.mjs --check` verifica l’identità dei file. Le immagini precedenti già usate dalle slide sono conservate; la migrazione dei riferimenti avverrà con i rispettivi contenuti.

## Testo attorno alle trasparenze

`template/sagome.typ` usa il profilo alpha della figura e Meander soltanto nella regione che la circonda; il seguito torna al normale flusso Typst. Il testo non ha un numero prefissato di righe o pagine. La didascalia segue il paragrafo associato alla sagoma, così non ne interrompe una frase. Passare quel paragrafo alla funzione e proseguire poi con prosa ordinaria.

Le immagini documentarie che occupavano una tavola autonoma conservano il formato a pagina intera, con posizione mobile nel volume. `template/figure.typ` espone `figura-pagina(id: ..., file: ..., didascalia: ..., diritti: ..., alt: ...)`: misura la didascalia e adatta proporzionalmente l’immagine alla gabbia ordinaria, con folio. `tavola-mobile()` in `template/pagine.typ` riserva un foglio nel flusso senza interrompere il testo precedente. Gli inserti privi di note recuperano il margine inferiore ordinario; gli URL restano nella prosa pertinente.

Per il Duomo, `template/doppia-pagina.typ` espone `sagoma-duomo()`, con le quote e l’eccezione delle note raccolte in `preset-duomo`. Una sola immagine attraversa il dorso di due pagine affiancate, alla stessa scala e allineata al bordo inferiore. Il componente assicura pagina pari a sinistra e dispari a destra. Il capitolo contiene un unico blocco di paragrafi modificabili: Meander li distribuisce fra le quattro colonne seguendo l’alpha, poi il testo continua nelle colonne native senza un limite di pagine. La didascalia comune è nella colonna esterna sinistra. Solo queste due pagine usano note nelle colonne esterne da 66 mm, nella fascia di 35 mm confermata dall’utente; il resto del volume conserva le note a tutta gabbia. Per nuove composizioni usare `sagoma-regionale()`, con `larghezza` e `inizio-immagine` esplicite e note ordinarie per impostazione predefinita; `sagoma-pagina()` applica lo stesso motore a un foglio singolo. Le altre sagome sul dorso si fermano sopra la fascia delle note. Il contenitore usa pagine native per la sola coppia, così il seguito e i paragrafi successivi continuano senza un nuovo salto di pagina.

`sagoma-pagina()` consente di mantenere automatica la partenza o di richiedere una parità tramite `partenza`. L’annuncio Olivetti Lettera 32 usa `partenza: "even"` e `al-vivo-sinistro: true`: comincia sulla pagina sinistra e allinea il primo pixel visibile al bordo esterno del foglio, conservando larghezza di 240 pt e rispetto del profilo di 8 pt. La parità viene raggiunta anche quando il testo precedente si ricompone; l’eventuale pagina di parità è parte di questa composizione fissa.

Le voci delle note sono composte in regioni indipendenti dalle misure del testo sagomato. La loro altezza deriva dal contenuto: questo evita dipendenze circolari quando una modifica precedente cambia la paginazione e mantiene separate più note sulla stessa pagina.

Il profilo si rigenera soltanto se cambia l’immagine, con Python e Pillow:

```sh
python3 typst-booklet/scripts/contorni.py assets/images/figure/tipografia/duomo-firenze-illustrazione.png assets/dati/sagome/duomo-firenze.json
```

Il JSON è un dato derivato: non è un elenco di righe del testo. Scala e distacco di 8 pt sono gestiti dal componente. La larghezza richiesta viene limitata per mantenere almeno 108 pt al testo; usare una gabbia più ampia quando l’immagine perderebbe leggibilità.

La sillabazione di Typst resta attiva nei frammenti composti, ma Meander restituisce il seguito fra parole intere. Il breve tratto sagomato non ha quindi tutte le opportunità di sillabazione di un paragrafo nativo: per evitare spazi eccessivi nel giustificato occorre lasciare una giustezza adeguata ai lati della figura.

## Aperture vettoriali a tutta pagina

`anteprime/aperture.typ` legge `piano.json` e mostra le stesse sette aperture attive del volume. Il campo radice `aperture` del piano vale `assets/booklet/aperture-imagegen-svg-v1`: `template/piano.typ` legge `manifest.json` e `composizioni.json` della famiglia, seleziona la grafica per numero e usa i fondi senza testo di `disegni/`. Gli SVG autonomi con testo editabile restano in `svg/`; il booklet non li usa come pagine appiattite.

Il confronto dell’integrazione è in `../reports/typst-booklet/aperture-integrazione/`: registra destinazioni dell’indice, pagine interessate, identità visiva rispetto al campionario e testo nativo. `aperture-dal-volume.pdf` è l’estratto delle sole sette aperture, adatto alla preview di Codex.

`numero` e `codice` identificano il capitolo corrente, da 01 a 07. `apertura_originale` resta soltanto un riferimento storico alla biblioteca precedente. `template/aperture/apertura.typ` prepara lo sfondo a tutta pagina e compone titolo e numero come testo **Sora 700 nativo**, con corpi, interlinee, spaziature, posizioni e salti di riga approvati nel campionario. Il titolo completo proviene dal piano unico: un solo heading alimenta indice e segnalibri PDF. `composizioni.json` contiene quote di presentazione e posizione del salto di riga, senza una seconda copia del titolo.

Per modificare le forme usare `../assets/booklet/aperture-imagegen-svg-v1/disegni/`; per la composizione tipografica aggiornare `composizioni.json`. `componi.py` nella stessa famiglia rigenera gli SVG autonomi e gli hash del manifest. Originali, prompt, font, licenze e comandi di verifica sono descritti nel relativo [README](../assets/booklet/aperture-imagegen-svg-v1/README.md). Il volume e il campionario Typst leggono direttamente gli stessi dati e fondi.

Frontespizio, crediti e indice mantengono gray 300; i sette capitoli conservano red, orange, amber, yellow, lime, green ed emerald 300. `template/palette.typ` continua a risolvere le tinte dalla sezione `palette` del manifest storico in `../assets/images/aperture/`, con l’intera sequenza di 26 famiglie. I fondi attivi usano i colori esatti; accenti secondari, segmenti del nastro di Colore e due campioni corallo identici mantengono i propri ruoli `data-palette`. Il codice 06 di Tipografia usa blue 600 `#155DFC` sul fondo green 300; il macrosegno è la forma illustrativa ricostruita dal concept, distinta dal glifo autentico Sora della biblioteca precedente. Titoli e numeri usano invece il font Sora autentico.

La biblioteca in `../assets/images/aperture/` conserva le dodici grafiche precedenti e le loro composizioni, comprese la variante del titolo di Griglie a 200 pt e la «a» autentica di Sora Bold. I file `capitoli-01-06.typ`, `capitoli-07-10.typ` e `capitoli-11-12.typ` appartengono a quel sistema storico; non selezionano le sette aperture correnti. `python3 typst-booklet/scripts/colora-aperture.py --check` controlla la biblioteca storica; senza `--check` ne riallinea gli SVG ai dati originali del manifest. Le tinte delle fonti Figma restano dati distinti, compresa la Salvia della Griglia.

Lo sfondo si estende all’intero foglio; i tagli delle forme sul bordo sono intenzionali. Le illustrazioni delle aperture sono distinte dai documenti e dagli esempi citati nei capitoli. Le grafiche precedenti e i collage rifiutati restano conservati nei rispettivi archivi.

## Commenti Figma e stato dell’importazione

Prima di ogni capitolo vanno riletti testo corrente e commenti ancorati alle relative tavole. Una correzione già applicata non va ripetuta; una richiesta puntuale non si estende automaticamente all’intero volume. Il registro di lavoro è in `../reports/typst-booklet/commenti-importazione.json`: comprende 111 commenti: 95 riletti dal vivo e 16 storici non riverificati, ed è **parziale**. Non certifica la revisione di tutti i commenti Figma. Nessun commento è stato risolto o modificato durante l’importazione.

Il capitolo 01, Storia del design, importa la prosa corrente e le figure documentarie, con 36 riferimenti bibliografici. Quindici schermate Caffè TTC sostituiscono le visuali precedenti del bar; Adattabile conserva la vista desktop, dopo la rimozione della schermata mobile richiesta dall’utente. Gli originali precedenti restano nell’archivio e le catture condivise conservano provenienza e licenze. La ricognizione dei commenti del capitolo comprende 31 thread risolti nell’interfaccia; il rapporto `../reports/typst-booklet/import-source/storia-commenti.json` conserva i bersagli, le correzioni già applicate e il limite dell’avviso di riconnessione. I registri storici non sono presentati come nuove verifiche dal vivo.

I capitoli 02–05 sono integrati dalle consegne verificate, con 81, 29, 94 e 45 figure rispettivamente. I rapporti di copertura e verifica restano in `../reports/typst-booklet/02-ricerca/`, `03-accessibilita/`, `04-gestalt/` e `05-colore/`; il confronto del volume integrato è in `../reports/typst-booklet/integrazione/`. Il capitolo 06, Tipografia, è incluso integralmente come bozza in revisione; il precedente estratto è conservato invariato in `../assets/archivio/typst/estratti/06-tipografia.typ`. Il campionario delle aperture verifica soltanto le grafiche. Stato e percorsi effettivi sono in `piano.json`.

Il capitolo 07, La griglia, segue la Page corrente `102 · Griglia · Nuovo design` (`4954:42`), con le integrazioni editoriali richieste dai materiali locali. `bibliografia/07-griglia.yml` raccoglie ventiquattro fonti APA, compresa l’edizione PDF del 2024; le descrizioni editoriali restano nell’apparato «Lettura delle fonti» incluso in `capitoli/07-griglia.typ`; note e collegamenti di consultazione restano vicini ai passaggi pertinenti. I manifest della fonte in `../assets/booklet/griglia-nuovo-design/` conservano originali, autori, diritti e identificatori Figma: una fonte bibliografica non attribuisce automaticamente una licenza alle immagini. L’anteprima `capitoli/07-griglia.typ` e il volume includono lo stesso sorgente; `pnpm build:booklet --target griglia` compila il capitolo isolato.

`template/griglia.typ` associa i codici delle figure originali al catalogo `../assets/dati/figure/griglia/figure.json` e al manifest `../assets/images/figure/griglia/manifest.json`. `figura-griglia("359")` mantiene figura, didascalia, diritti, testo alternativo e rimando nativi; il progressivo stampato deriva dal capitolo, non dal codice della fonte. I 39 diagrammi sono SVG esportati dai componenti correnti con testo conservato. Le tre opere documentarie coincidono con gli originali caricati in Figma; la vista e il dettaglio di April Greiman usano lo stesso file, con il ritaglio normalizzato dell’istanza.

Il capitolo include anche gli otto originali della sezione «La griglia & lo spazio responsive» del booklet di dicembre 2024 (pp. 100–107): Golden Grid System, anatomia, doppia pagina editoriale, dispositivi, responsive/adaptive, costruzione aurea e due schemi dei terzi. Le sette immagini raster e il diagramma vettoriale sono registrati nel manifest, con hash del PDF e pagine di provenienza; la numerazione è unica con le 42 figure correnti. I codici `2024-...` distinguono le fonti storiche e non vengono stampati. I documenti verticali riusano `figura-pagina` tramite `pagina: true`; gli altri seguono il flusso ordinario. Le didascalie chiariscono la distinzione client/server dell’infografica HTMLBurger, le percentuali senza metodo documentato e l’etichetta «Area aurea» nel reticolo dei terzi, conservando le immagini originali. Le verifiche sono in `../reports/typst-booklet/07-griglia/vecchio-booklet/`.

Le integrazioni dai materiali sviluppano margine/gutter/padding, contenitori fluidi con limite massimo, dodici colonne, scelta fra Grid e Flexbox e immagini responsive. Le sottosezioni sulle immagini separano risorsa, inquadratura e ritaglio; un confronto storico di Vogue e l’esercizio di ricomposizione collegano spiegazione e verifica. Quattro diagrammi modificabili e il confronto documentario portano il capitolo a 55 figure; le note sono 23. Provenienza delle aggiunte e verifica delle fonti primarie sono in `../assets/booklet/griglia-integrazioni-materiali/manifest.json`. Gli approfondimenti restano nei registri locali, mentre testo e bibliografia rimandano alle fonti primarie. Il generatore dei quattro SVG è in `../assets/images/figure/griglia/integrazioni-materiali/generatore.py`; il catalogo della sintesi è distinto dagli originali Figma. La figura iniziale e il titolo restano nel medesimo blocco a gabbia intera, con prosa successiva nelle due colonne.

Dalla radice, `python3 assets/images/figure/griglia/integrazioni-materiali/generatore.py --check` verifica SVG, catalogo di sintesi e registrazioni canoniche senza modificarli. Senza `--check`, rigenera i quattro diagrammi e aggiorna soltanto le loro registrazioni; originali Figma, schermate e altri metadati sono conservati.

`doppia-griglia("370", sinistra: [...], destra: [...])` riusa `template/documenti-doppi.typ` per i due diagrammi sul dorso. Il componente assicura pagina pari a sinistra e dispari a destra, una sola figura numerata e la stessa immagine alla stessa quota e scala. I testi restano nativi; la quota cresce insieme all’ingombro maggiore e la compilazione segnala uno spazio insufficiente. Non occorrono profili alpha. I metadati `booklet-documento-doppio` espongono parità e geometrie per la verifica. La lettura corrente dei commenti della sola Page Griglia è documentata in `../reports/typst-booklet/07-griglia/commenti.json`, distinta dal registro generale parziale.

L’anteprima di lavoro `capitoli/06-tipografia.typ` contiene tutto il testo modificabile di Tipografia e lo condivide con il volume. `template/documenti.typ` conserva gli ingrandimenti fotografici delle tavole documentarie: il ritaglio agisce sull’originale immutato, mentre titoli e didascalie restano testo nativo. Le dimensioni esplicite della fotografia mantengono il rapporto originale dentro la finestra del dettaglio. Queste quote riguardano soltanto l’immagine; non assegnano righe o pagine alla prosa.

`template/campioni.typ` mantiene una fascia comune per gli esempi dei font, con titolo e didascalia modificabili. I glifi conservano corpo e contorni autentici; un ingrandimento dichiarato resta distinto dalla scala ordinaria. `confronto()` tiene vicine le figure correlate nella gabbia intera, lasciando a Typst il posizionamento mobile. `riga-campioni()` allinea le etichette modificabili delle classificazioni e conserva la scala dei glifi. Gli SVG delle visuali non incorporano le didascalie editoriali. La bozza estesa comprende tutte le sezioni 6.1–6.9 fino alla tavola 490, compresi leggibilità, consigli e web. Volume e anteprima usano questi stessi contenuti. Restano la verifica editoriale conclusiva e le decisioni locali prima della pubblicazione.

La bibliografia dell’anteprima di Tipografia combina nativamente `06-tipografia.bib`, `06-tipografia-articoli.yml` e `06-tipografia-opere.yml`. Il formato Hayagriva conserva i numeri degli articoli nel campo documentato `serial-number`: il convertitore BibLaTeX di Typst 0.15.1 ignora invece `eid`. Citazioni autore–anno, ordinamento e apparato APA restano automatici; le voci non vengono riscritte manualmente nel testo.

Typst 0.15.1 include Hayagriva 0.10.1, che [disambigua soltanto tre coorti autore–anno per bibliografia](https://github.com/typst/hayagriva/issues/507). Il capitolo di Tipografia usa perciò `bibliografia/06-tipografia-gruppi.typ`: quattro intervalli contigui di chiavi, con al massimo tre coorti ciascuno. `template/bibliografia.typ` assegna le citazioni con il parametro nativo `target` e stampa le parti consecutive sotto un solo titolo. Dati bibliografici e citazioni visibili rimangono nei file originali. Il preordine delle sole coorti ambigue usa `cite(form: none)`; i suffissi seguono l’ordine dell’elenco nativo, comprese le date complete W3C del 2024. Aggiungendo una fonte a questo capitolo, inserire anche la sua chiave nell’intervallo appropriato. La variante è attiva sia nel volume sia nell’anteprima isolata, attraverso lo stesso resolver del piano.

Le dodici grafiche precedenti confermate dall’utente restano nella biblioteca storica; il volume e il campionario attivo usano le sette ricostruzioni della famiglia `aperture-imagegen-svg-v1`. Restano confermate le note 7,5/9 pt con URL 7/8,5 pt. Le versioni SVG precedenti sono conservate in `../assets/archivio/typst/copertine/svg-v1/`.

## Esperimenti precedenti

`esperimenti/base.typ`, `esperimenti/pagine-figma/main.typ` e `esperimenti/sagoma-doppia-pagina/main.typ` conservano le prove precedenti. Il secondo usa coordinate Figma; il terzo ricrea una doppia pagina fissa con un vecchio Meander modificato. Le dipendenze sono in `esperimenti/vendor/`; le immagini condivise usano gli stessi originali del booklet, quelle esclusive sono in `../assets/archivio/typst/`. `main.typ` importa soltanto il template corrente.

`esperimenti/capitoli-esclusi/` conserva i sorgenti di Introduzione e Griglia e le rispettive bibliografie. Restano prove consultabili e non vengono inclusi da `main.typ` o aggiunti al piano attivo.

I PDF ordinari sono `build/booklet.pdf`, le otto anteprime dei preliminari e dei capitoli e il campionario delle aperture in `build/anteprime/`. Le verifiche isolate si rigenerano in `build/verifiche/`; i PDF delle vecchie demo e dei campioni A/B superati sono rimossi. I temporanei e i rapporti restano in `../reports/typst-booklet/`.

La [documentazione delle demo](esperimenti/README.md) conserva istruzioni, fonti e attribuzioni dei relativi asset.

Documentazione: [Typst](https://typst.app/docs/), [bibliografie multiple](https://typst.app/docs/reference/model/bibliography/#multiple-bibliographies), [Meander](https://typst.app/universe/package/meander/), [Tinymist](https://myriad-dreamin.github.io/tinymist/config/vscode.html).
