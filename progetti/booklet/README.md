# Booklet in Typst

`piano.json` governa ordine, titoli, numerazione, file e stato degli otto capitoli **01–08**. Dopo **Griglie e layout**, il capitolo **Composizione e gerarchia visiva** integra le due Pages Figma `3699:2475` e `2613:1113` con i materiali della ricognizione locale. In `main.typ` gli otto richiami `include-chapter(1)`–`include-chapter(8)` sono commentati: togliere `//` dalle sole righe dei capitoli da includere, nel loro ordine di lettura. Frontespizio, crediti e indice restano attivi; i capitoli 06 e 07 restano in revisione editoriale. Testo e fonti del capitolo 08 sono in `capitoli/08-composizione-gerarchia.typ` e `bibliografia/08-composizione-gerarchia.yml`.

I titoli sono brevi sintagmi nominali che identificano il contenuto. Si aggiornano soltanto nel piano, così aperture, indice e segnalibri PDF conservano lo stesso titolo completo. Gli eventuali salti di riga dell’apertura sono una scelta di presentazione e non una seconda copia del titolo. Nei titoli riformulati la congiunzione «e», anche maiuscola, resta unita alla parola seguente, per evitare una riga composta dalla sola congiunzione. «Colore e significato» mantiene il titolo e la presentazione approvati.

Il campo `sources` accetta un percorso oppure una lista di percorsi. La bibliografia nativa combina BibLaTeX e YAML quando occorre: i numeri di articolo, come `e340` in Gestalt, sono nel campo YAML `serial-number.serial`, perché Typst 0.15.1 non importa il campo BibLaTeX `eid`. Le citazioni e lo stile APA restano gestiti da Typst.

Frontespizio, crediti e indice usano numeri romani minuscoli (`i`, `ii`, `iii`…), anche nei folio e nelle etichette PDF. L’indice cresce con i capitoli attivati; il primo capitolo comincia sul recto e riparte da pagina 1. Il salto nativo conserva la parità dei capitoli esistenti quando l’indice occupa una pagina in più, mantenendo margini speculari, doppie pagine e tavole di raccordo.

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
| 08 · Composizione e gerarchia visiva | — (due Pages Figma) | 9 | teal 300 · `#46ECD5` | Completo |

Introduzione, Processo UX e Define sono esclusi dal piano; Linguaggio visivo e Gerarchia visiva confluiscono nel capitolo 08. Le vecchie prove di Introduzione e Griglia, con le fonti, restano in `esperimenti/capitoli-esclusi/`; il vecchio `12-griglia.typ` non è la fonte del nuovo capitolo 07. Per La griglia, il numero 08 identifica il percorso storico delle slide, oggi escluso dalla lezione di sola Tipografia; la fonte corrente resta la Page Figma `4954:42`. I numeri delle lezioni Slidev e i codici Figma identificano le fonti, senza fissare numeri di capitolo o folio del nuovo volume. Il vecchio concept della metropolitana è escluso.

## Organizzazione

```text
progetti/booklet/
├── main.typ                  Ingresso del booklet
├── piano.json                Otto capitoli, ordine e stato editoriale
├── capitoli/                 Un solo file completo per capitolo, compilabile da solo
│   ├── 00-frontespizio-indice.typ
│   ├── 01-storia-del-design.typ
│   ├── 02-ricerca.typ
│   ├── 03-accessibilita.typ
│   ├── 04-gestalt.typ
│   ├── 05-colore.typ
│   ├── 06-tipografia.typ
│   ├── 07-griglia.typ
│   └── 08-composizione-gerarchia.typ
├── bibliografia/             Fonti APA dei singoli capitoli
├── assets/diagrams/          Disegni nativi specifici, senza apparati editoriali
├── template/                 Soltanto componenti riutilizzabili
│   ├── layout.typ            Aperture, gabbia, tipografia e contatori
│   ├── geometry.typ          Quote condivise
│   ├── editorial.typ         Didascalie, diritti e note compatte
│   ├── figures.typ           Immagini, campioni e dettagli nativi
│   ├── pages.typ             Contenitori documentari, al vivo e Appunti
│   ├── plan.typ              Metadati e fonti dal piano
│   ├── footnotes.typ         Note a tutta gabbia e richiami locali
│   ├── text-wrap.typ         Profili alpha e testo attorno alle trasparenze
│   ├── spreads.typ           Sagome di pagina e documenti sul dorso
│   ├── exercises.typ         Esercizi al piede e fondi vettoriali
│   ├── bibliography.typ      Bibliografia APA, anche per gruppi
│   └── palette.typ           Palette comune
├── anteprime/aperture.typ     Campionario delle aperture attive
├── anteprime/elenchi.typ      Campione di elenchi puntati e numerati
├── scripts/                  Preparazione delle sagome e dei colori
├── esperimenti/              Demo e capitoli esclusi dal piano
└── build/                    PDF generati, esclusi da Git
```

Il comando comune è `./scripts/booklet.mjs`; `./scripts/booklet.py` è l’ingresso Python dei moduli in `./scripts/booklet/`: ambiente e asset, compilazione, inventario editoriale, PDF, regressioni e CLI. Le prove sono in `./scripts/booklet-prove/`. Gli hash degli originali vengono calcolati a blocchi; i collegamenti delle note sono indicizzati per pagina.

Ogni `.typ` in `capitoli/` contiene tutto il testo del capitolo, senza inclusioni di frammenti esterni. Il file esporta `content`, che `main.typ` importa per il volume, e applica il template quando viene compilato direttamente. `00-frontespizio-indice.typ` raccoglie anche i crediti; l’anteprima autonoma contiene frontespizio e crediti. Nel volume completo segue soltanto l’indice nativo con i numeri di pagina e i collegamenti, senza un secondo elenco dei capitoli. I blocchi di contenuto conservano gli ambiti locali delle regole di pagina e delle figure. I disegni specifici stanno in `assets/diagrams/`; `template/` contiene soltanto componenti riutilizzabili. Didascalie, diritti, ID e tipo di ogni immagine sono nel capitolo, con `image-figure(..., format: "una-colonna", ...)`. Gli altri tipi e gli esempi sono nella [guida operativa](DESIGN.md#proprietà-editoriali-e-tipi-delle-figure). Le tre fonti di Tipografia sono dichiarate una sola volta nel piano; il resolver assegna i quattro gruppi APA del capitolo. Lo stato `in-revisione` indica che il testo è presente ma la verifica editoriale non è conclusa.

Le immagini e i font sono nella cartella `../../risorse-condivise/`: figure condivise con le slide in `immagini/figure/<tema>/`, biblioteca precedente in `immagini/aperture/`, font in `font/editoriali/` e profili alpha in `dati/sagome/`. Le aperture attive sono in `assets/aperture-imagegen-svg-v1/`; le prove grafiche precedenti in `assets/archivio/typst/`. La [guida agli asset](../../risorse-condivise/README.md) indica originali, manifest, licenze e copie generate.

## Aprire e compilare

I percorsi in `tinymist.fontPaths` sono relativi alla radice Typst, anche aprendo la sola cartella del booklet: evitano di inserire nei percorsi dei font il separatore `:` presente nel nome del repository. Dopo un cambiamento di queste impostazioni, eseguire «Sviluppatore: Ricarica finestra» prima di ricontrollare la diagnostica: il solo riavvio del server Tinymist può riutilizzare la configurazione caricata all’avvio dell’estensione.

Aprire **questa cartella oppure la radice del repository** in VS Code. Entrambe hanno una configurazione `.vscode/settings.json` di Tinymist: impostano la radice Typst al repository e caricano soltanto i font condivisi. Aprire `main.typ` per il volume oppure un file di `capitoli/` per il singolo capitolo e avviare **Typst Preview**. La versione collaudata della CLI è **Typst 0.15.1**, fissata in `.typst-version`: il comando rifiuta altre versioni. Aggiornare la versione soltanto dopo il confronto dei rendering e il superamento delle verifiche. La Preview di Tinymist usa il proprio motore: la verifica CLI rimane quella di consegna.

Nella **preview di Codex non aprire i PDF del booklet**, compresi i PDF dei capitoli: anche questi possono essere troppo grandi e provocare il crash dell’app. Compilare e verificare i PDF tramite CLI e consultare il volume completo in un lettore esterno. Le risposte di Codex mostrano soltanto PNG delle pagine interessate, senza allegati o collegamenti al PDF. Typst Preview esterno in VS Code è un ambiente distinto.

Per controllare la composizione effettiva del PDF già compilato, dalla radice del repository:

```sh
pnpm preview:booklet --pages 8-9
pnpm preview:booklet --target tipografia --pages 12,15-16
```

Il comando richiede **pagine fisiche numerate da 1**, distinte dal folio stampato, e accetta al massimo **otto pagine** con intervalli chiusi. Crea soltanto `pagina-NNNN.png` in `build/anteprime-ispezione/<target>/`, con lato lungo massimo **1600 px**, e stampa i soli percorsi richiesti. Non apre file, non ricompila il volume e non riscrive PDF o rapporti di verifica. Occorrono il venv con le dipendenze già previste e `pdftoppm` di Poppler nel `PATH`. Dopo una modifica ai sorgenti compilare prima il target pertinente: i PNG rappresentano il PDF presente su disco, non certificano che sia aggiornato. Il comando `pnpm check:booklet` resta la verifica editoriale.

Il [hook locale](../../.codex/hooks.json) controlla `open_in_codex` prima dell’apertura, bloccando tutti i PDF sotto `progetti/booklet/` e, per le chat di questo progetto, i PDF da almeno **20 MiB**, anche se copiati o rinominati. Lo script [booklet-preview-guard.py](../../scripts/booklet-preview-guard.py) controlla percorso e dimensione senza leggere il PDF; gli altri strumenti e i PNG restano disponibili. Per attivarlo una volta sola, avviare il Codex CLI nella radice del progetto, aprire `/hooks` e rivedere e autorizzare «Verifica anteprima booklet». Codex richiede fiducia esplicita per i nuovi hook; finché non viene concessa, il blocco tecnico non è attivo. Il ripristino automatico di una vecchia scheda e le aperture manuali non passano dal hook: chiudere le schede PDF già salvate. Non modificare il bundle dell’app o gli hash di fiducia per forzare l’attivazione. Il comportamento degli hook è descritto nella [documentazione ufficiale OpenAI](https://learn.chatgpt.com/docs/hooks).

Sul Mac corrente il CLI è incluso nell’app, anche senza `codex` nel `PATH`. Avviarlo da Terminale con:

```sh
"/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex" -C /Users/marco/Sites/cvedi2627
```

Digitare `/hooks`, rivedere il solo hook di progetto «Verifica anteprima booklet» e concedere la fiducia. Riaprire quindi le chat interessate perché carichino la configurazione aggiornata. Se il hook viene modificato, Codex ne richiederà una nuova revisione.

Con **⌘⇧B** l’attività predefinita `Typst: booklet` usa lo stesso comando della CLI e compila volume e anteprime. `Typst: anteprima aperture` compila soltanto il campionario; `Typst: verifica booklet` esegue tutti i controlli. Le impostazioni sono in `.vscode/tasks.json`.

Dalla radice del repository, preparare una volta Python **3.10 o successivo** con le dipendenze collaudate per immagini e PDF. Su questo Mac `python3` è la versione di sistema 3.9: usare l’interprete aggiornato `python3.12`. Poiché il nome del repository contiene `:`, che Python non accetta durante la creazione di un venv, per una nuova installazione creare l’ambiente fuori dal repository e collegarlo:

```sh
python3.12 -m venv "$HOME/.venvs/cvedi-booklet"
ln -s "$HOME/.venvs/cvedi-booklet" progetti/booklet/.venv
progetti/booklet/.venv/bin/python3 -m pip install -r progetti/booklet/requirements.txt
pnpm build:booklet
pnpm check:booklet
```

Su Windows usare `progetti/booklet/.venv/Scripts/python.exe` per l’installazione. Il runner sceglie `BOOKLET_PYTHON` quando impostato, altrimenti il Python del venv locale e infine `python3`. Non è necessario attivare il venv. Per Typst il resolver usa prima `BOOKLET_TYPST`, poi l’eseguibile locale `.venv/bin/typst` (`.venv/Scripts/typst.exe` su Windows), infine il `PATH`; verifica sempre la versione **0.15.1**. L’eseguibile locale viene invocato mediante il percorso completo, senza aggiungere la cartella del repository al `PATH`: spazi e `:` nel nome non interrompono la ricerca. Il venv e gli eseguibili locali sono esclusi da Git.

Entrambi i comandi verificano piano, temi, percorsi, font e licenze con hash, dimensioni e contenuto dei profili alpha, poi compilano `main.typ`, il campionario delle aperture e gli otto file autonomi di `capitoli/`. Qualsiasi avviso Typst causa un fallimento. `check:booklet` controlla inoltre inventario delle figure, note e voci singole sulla pagina del richiamo, bibliografie, ancore delle figure mobili, metadati e parità delle doppie pagine, destinazioni interne dei PDF. Le regressioni isolate verificano i contorni dei glifi a peso 700/800/900, le note ripetute, le date APA con solo anno/senza data/data completa, i profili alpha e l’overflow delle sagome con e senza note, anche su pagina pari e dispari. Le prove Python verificano inoltre i controlli stessi: link mancanti o duplicati, gruppi di pagine incompleti, profili malformati e conservazione dei rapporti completi durante una compilazione parziale. Il controllo dei link certifica la presenza delle destinazioni nel PDF; non verifica la raggiungibilità degli URL in rete o la conformità completa del PDF accessibile.

I PDF restano in `build/`; il rapporto e l’indice generato dei manifest stanno in `../../reports/typst-booklet/check/`. Il controllo completo conserva `verifica.json`; compilazioni, controlli dei soli dati e ingressi singoli usano rapporti distinti, così una prova parziale non sostituisce l’ultimo controllo completo. I conteggi di figure e note attesi sono in `./scripts/booklet-prove/attesi.json`: aggiornarli soltanto dopo inserimenti o rimozioni intenzionali. Nessun numero di pagine è fissato. La verifica completa `pnpm check:booklet` richiede tutti gli otto richiami attivi in `main.typ`, perché conserva i conteggi e i controlli dell’intero volume. Per i soli dati usare `pnpm check:booklet --assets-only`. Per un ingresso usare `pnpm build:booklet --target NOME`: i nomi disponibili sono `booklet`, `aperture`, `styled-lists`, `frontespizio-indice`, `storia-del-design`, `ricerca`, `accessibilita`, `gestalt`, `color`, `tipografia`, `griglia` e `composizione-gerarchia`.

Il campione `styled-lists` usa gli stessi stili nativi dei capitoli, con un confronto fra punti e numeri e il passaggio da una a due cifre. Per mostrarlo in Codex, dopo la compilazione usare `pnpm preview:booklet --target styled-lists --pages 1`.

La prova `flusso.typ` verifica che il testo successivo riempia la pagina precedente alle tavole mobili di Ricerca, Gestalt e dei componenti documentari, conservando ordine, numerazione e destinazioni PDF dei richiami. Un controllo negativo riproduce la barriera `place.flush()` e deve essere rilevato. I campioni composti soltanto con testo verificano anche l’ancora visiva di blocco, senza dipendere dalla presenza di un’immagine.

Per gli inserti al vivo, `flusso-al-vivo.typ` verifica che i paragrafi successivi riempiano sopra la caption, allineata a 220 mm, e che le note conservino 8 pt di distacco dalla prosa e dalla didascalia. `esclusivita-al-vivo.typ` controlla due coppie con figure ordinarie di colonna prima e dopo: i fogli delle immagini non possono contenere altre figure, note o folio. `didascalia-separata.typ` verifica anche il rifilo superiore, l’altezza della miniatura uguale al testo, il divisorio a tutta gabbia e la visibilità integrale attraverso le clip effettive del PDF. Il controllo PDF verifica su tutti gli inserti del volume l’assenza di prosa, didascalie, note e folio nei fogli al vivo.

Per un refactor senza cambiamenti visivi è disponibile anche il confronto esatto di tutti i PDF già compilati. Richiede `pypdfium2` nello stesso ambiente Python (dipendenza opzionale, usata soltanto dal confronto). Dalla radice, dopo un `pnpm check:booklet` riuscito, salvare il riferimento; dopo le modifiche ripetere il check e confrontare:

```sh
progetti/booklet/.venv/bin/python3 -m pip install pypdfium2
PYTHONPATH=progetti/booklet/scripts progetti/booklet/.venv/bin/python3 -m booklet.comparison snapshot /tmp/booklet-prima.json
# Modificare i sorgenti, poi aggiornare PDF e inventari.
pnpm check:booklet
PYTHONPATH=progetti/booklet/scripts progetti/booklet/.venv/bin/python3 -m booklet.comparison compare /tmp/booklet-prima.json --output reports/typst-booklet/refactor-posizionamento/confronto.json
```

Lo snapshot conserva firme per ogni pagina: formato, testo, trasformazioni e posizioni, destinazioni dei link e pixel renderizzati; confronta anche gli inventari editoriali. Ogni differenza fa fallire il confronto. PDFium e la sua versione devono coincidere fra le due esecuzioni. Il raster viene elaborato in memoria, una pagina alla volta con lato massimo 1600 px: non crea anteprime o copie dei PDF. L’ispezione visiva continua a usare soltanto `preview:booklet`.

Per l’aggiornamento continuo usare Typst Preview oppure `typst watch --root . --ignore-system-fonts --font-path risorse-condivise/font/editoriali progetti/booklet/main.typ progetti/booklet/build/booklet.pdf`. La prima compilazione scarica **Meander 0.4.4** e la dipendenza hy-dro-gen dal registro ufficiale; le successive usano la cache locale. Il nuovo template importa il pacchetto ufficiale senza modifiche. La copia in `esperimenti/vendor/` appartiene soltanto alle vecchie demo.

`build/` è ignorata da Git. I PDF delle fonti e gli asset originali restano versionabili. Le prove di questa sessione usano una cache temporanea ufficiale, selezionabile con `--package-cache-path /tmp/cvedi-typst-packages`; quel percorso non è necessario su un altro computer.

## Modificare il testo

Il corpo usa **DM Sans 11 pt con interlinea 13,5 pt** in tutti i capitoli, comprese le sagome. Il preset predefinito è `lettura=11-13.5`, applicato anche dai comandi ordinari di compilazione e verifica. `lettura=12-14` resta disponibile per confrontare la misura precedente: per esempio `typst compile --root . --ignore-system-fonts --font-path risorse-condivise/font/editoriali --input lettura=12-14 progetti/booklet/capitoli/02-ricerca.typ progetti/booklet/build/prove/02-ricerca-corpo-12.pdf`, dalla radice del repository. Figure e campioni didattici, titoli, note, didascalie, diritti, folio e apparati conservano le rispettive misure. Ogni ricomposizione richiede di ricontrollare note, sagome e rimandi; una compilazione con avvisi non costituisce una verifica superata.

Scrivere paragrafi normali nei file `.typ` di `capitoli/`, lasciando una riga vuota fra loro. `==` introduce una sezione; `===` introduce un sottoparagrafo. Entrambi proseguono nel flusso delle due colonne, senza salti obbligatori che lascino colonne vuote; il titolo rimane legato al testo seguente. `*content*` è grassetto e `_testo_` è corsivo. I nomi di persona sono in corsivo nella prosa, nelle intestazioni, nelle didascalie e nelle note editoriali; citazioni e bibliografie native conservano lo stile APA.

Le citazioni bibliografiche nel testo, parentetiche e narrative, mantengono famiglia e peso del testo circostante, con dimensione pari a **10/11 della sua misura** (**10 pt nel corpo da 11 pt**) e colore **`#626872`**; l’interlinea del paragrafo resta invariata. La regola comune di presentazione segue anche le citazioni nelle didascalie e conserva gli elementi `cite` nativi, con contenuti, APA, suffissi, ordinamento e collegamenti automatici. La bibliografia finale mantiene 8/10 pt e l’inchiostro ordinario `#2E3138`; sitografia nei footnote e misure delle note restano quelle approvate.

Le righe, le colonne e le pagine sono composte da Typst: non aggiungere coordinate, spezzature manuali dei paragrafi o salti per imitare i folio Figma. I numeri di pagina e i richiami sono rigenerati. In `piano.json` si gestiscono ordine, titolo, stato, file del testo e file bibliografico. `main.typ` legge questi dati e include soltanto i capitoli i cui richiami sono stati scommentati; i moduli di `template/` separano geometria, ruoli editoriali e composizione del capitolo.

Le figure ordinarie usano `placement: auto`: il testo successivo può occupare lo spazio che precede una figura spostata. Non inserire `place.flush()` fra paragrafi, titoli o esempi. Anche le tavole documentarie a pagina intera hanno posizione automatica e mantengono insieme immagini, didascalie e diritti. `tavola-documentaria(fixed: true)` è riservato a esercizi e raccordi intenzionali delle doppie pagine; sagome, figure sul dorso e schermate al vivo conservano i propri contenitori. La fascia note di 35 mm resta riservata nel corpo.

Scrivere le formule con il markup matematico nativo: `$a > b > 0$` nel testo, `$ c = (W - L - R - (n - 1) g) / n $` per un’equazione isolata. Usare `sqrt(5)` per la radice, `thin "mm"` per un’unità in tondo e `"1,5"` per un decimale italiano senza spazio dopo la virgola. Variabili e richiami usano la stessa notazione. Le didascalie con formule ricevono contenuto Typst dal capitolo, mantenendo nei cataloghi la trascrizione originale e il testo alternativo; non interpretare le stringhe dei dati come codice.

### Scegliere il componente

I sei grafici di Hofstede condividono `cultural-chart()` in `assets/diagrams/cultural-indices.typ`: il volume mantiene testi e geometrie nativi con bandiere SVG originali flag-icons. `assets/schemi-hofstede-vettoriali/` contiene le esportazioni SVG autonome dello stesso disegno, con titoli e descrizioni accessibili. Per rigenerarle dalla radice usare `progetti/booklet/.venv/bin/python3 progetti/booklet/scripts/prepara-schemi-hofstede.py`; aggiungere `--check` per verificare dati, asset, licenza e assenza di raster senza riscrivere i file. I valori sono confrontati con le verifiche online del 25 ottobre 2026; gli originali precedenti restano conservati.

La [mappa dei contenitori in DESIGN.md](DESIGN.md#scegliere-il-contenitore) distingue tutti i casi attivi: figure di colonna e larghe, tavole documentarie e Gestalt, documenti di Ricerca, inserti al vivo, sagome, doppie pagine, campioni ed esercizi. La stessa guida contiene ricette minime con import e percorsi, quote condivise ed eccezioni per capitolo. Usarla come riferimento unico per le nuove pagine.

`geometry.typ` raccoglie le quote; `editorial.typ` i ruoli di caption, diritti, dettagli e titoli degli apparati. I componenti descrivono il contenuto e il suo comportamento; i sorgenti dei capitoli mantengono prosa, riferimenti e ordine editoriale. Per i nuovi moduli verificare lo [scope di import e include](https://typst.app/docs/reference/scripting/#modules) e delle [regole di stile](https://typst.app/docs/reference/styling/): l’uscita da un ambito può cambiare il flusso delle pagine anche con gli stessi valori di `page`.

Noto Sans JP completa i caratteri giapponesi assenti nei font editoriali, come quelli del glossario ukiyo-e. Noto Sans SC completa quelli cinesi assenti anche nel font JP, per esempio 劳 nel nome 麦当劳. Originali e licenze OFL sono nella cartella dei font condivisi; DM Sans e Sora conservano i propri ruoli.

Per una citazione bibliografica (articoli, libri, capitoli, atti di convegno, rapporti e altre pubblicazioni) usare `@chiave`, con la voce nel file di fonti del capitolo. Typst accetta nativamente **Hayagriva YAML** (`.yml`) e **BibLaTeX** (`.bib`): Storia usa `bibliografia/01-storia-del-design.yml`, Tipografia usa `bibliografia/06-tipografia.bib`, `06-tipografia-articoli.yml` e `06-tipografia-opere.yml`. Lo stile nativo **APA 7** genera autore–anno e bibliografia alfabetica. DOI e URL bibliografici previsti da APA rimangono nel riferimento. I collegamenti di consultazione usano invece `#sito([Descrizione], "https://…")` e diventano note al piede. Non scrivere a mano l’elenco bibliografico. Ogni capitolo termina con bibliografia a gabbia intera e una pagina Appunti.

**Note e bibliografia sono due apparati distinti.** Le spiegazioni in `#footnote[...]` e i siti in `website-note()` o `compact-note()` producono soltanto numeri in apice nel testo. Un sito citato soltanto in nota non richiede `@chiave`. Se una fonte ha anche un riferimento bibliografico, conservare sia la citazione APA sia il numero della nota URL: per esempio, `@preston2026-graphic.#website-note(...)` è intenzionale. La presenza dell’URL non basta a decidere se togliere una citazione; verificare il ruolo della fonte. Il testo descrittivo dentro la nota resta distinto dal richiamo numerico.

Per ripetere un URL sulla stessa pagina, assegnare un'etichetta alla nota originale (`#sito([Fonte], "https://…") <nota-fonte>`) e usare `#footnote(<nota-fonte>)` negli altri punti. Una pagina deve avere una sola voce per URL. Se più note condividono parte dei collegamenti, unirne descrizioni e URL distinti nella nota comune e aggiornare tutti i richiami. Non scrivere i numeri a mano. Il controllo CLI di volume e capitoli autonomi verifica gli URL nelle voci della pagina effettiva, compresi quelli delle note con più fonti; ripetere il controllo dopo modifiche al flusso. Le diverse query e ancore mantengono la propria identità. **Ogni richiamo deve avere la nota sulla stessa pagina fisica.** Se l’URL ricompare in un’altra pagina, scrivere una nuova nota locale e lasciare assegnare un nuovo numero al contatore nativo. Riutilizzare un’etichetta solo fra richiami della medesima pagina. Questo vale anche per figure, sagome e apparati di lettura delle fonti: i controlli strutturali e dei link PDF rifiutano i rimandi a note di altre pagine.

Classificare ogni nuova fonte in `bibliografia/ruoli-fonti.json`: `pubblicazioni` ammette i richiami APA; `siti` contiene soltanto i collegamenti da mantenere nelle note. Il registro motiva anche articoli e documenti pubblicati online, distinti dalle semplici pagine web. I metadati originari dei siti restano nei file `.bib` e `.yml` per conservarne la provenienza; la bibliografia stampata include soltanto le pubblicazioni effettivamente citate. Per i siti eliminare anche eventuali citazioni con `form: none` e chiavi nei preordini APA. `pnpm check:booklet` verifica tutte le citazioni native del volume, anche quelle invisibili, i numeri delle note e la presenza degli URL sitografici nelle note del rispettivo capitolo. Le note URL delle pubblicazioni restano consentite insieme alla citazione APA.

Per Tipografia, `../../risorse-condivise/dati/fonti/tipografia/riferimenti-figma.json` conserva le dodici tavole originali degli apparati; `riconciliazione.json`, nella stessa cartella, documenta il ruolo dei rimandi nella nuova edizione. Distingue opere citate, consultazioni nelle note, provenienza delle immagini, fonti alternative e risorse ulteriori non usate. Una diversa URL non significa automaticamente un’opera mancante o una copia della stessa pagina. I riferimenti agli esemplari di una collezione non vanno attribuiti alle fotografie di un’altra. Le limitazioni delle risorse archiviate restano esplicite nel registro.

Typst 0.15.1 presenta un [difetto noto di APA con date limitate al solo anno](https://github.com/typst/hayagriva/issues/246): può generare `(2022,)`. Una regola locale documentata `show regex` in `template/bibliography.typ` elimina la sola virgola superflua dalle date tra parentesi nell’apparato. Autori, titoli, anni, suffissi, date complete e collegamenti rimangono nativi; non si aggiungono giorni o mesi fittizi.

Le note occupano tutta la gabbia sotto le due colonne, in una **fascia fissa di 35 mm confermata dall’utente**, con 8 pt di distacco dal corpo. La fascia rimane riservata anche con poche note. Nei capitoli usare `website-note()`, `footnote` oppure `compact-note()` da `template/editorial.typ`, che accetta anche una lista di URL e le rispettive etichette brevi. `template/footnotes.typ` raccoglie le note della pagina reale, conserva numerazione e collegamenti e misura esclusivamente i loro testi. Una nota può stare anche nel mezzo di un paragrafo. Il corpo della nota resta nel documento, vicino al proprio richiamo nell’ordine di lettura; il footer contiene soltanto il folio. Se le fonti eccedono la fascia, Typst segnala un errore con il numero della pagina: nessuna voce viene tagliata. La misura `footnote-space` è definita in `template/geometry.typ`; non inserire salti o spostamenti nei file dei capitoli per risolvere l’ingombro.

## Immagini condivise

Una fotografia, opera o schermata indipendente ha normalmente una figura propria. Conservare composizioni soltanto per confronti necessari, sequenze, classificazioni o dettagli dello stesso documento. Questa regola vale anche per le immagini riunite dentro un SVG; gli originali e le attribuzioni restano nel manifest. I pannelli autonomi sono in `assets/figure-singole/` e si verificano con `scripts/prepara-figure-singole.py --check`.

### Modificare una figura e il suo tipo

Nel capitolo modificare direttamente immagine, didascalia, diritti, ID, alternativa testuale e `format`:

```typst
#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/pranzo-grattacielo.jpeg"),
  [_Lunch Atop a Skyscraper_: scena di vita nella fotografia.],
  format: "una-colonna", id: "fig-comp-fotografia-illustrazione",
  rights: [Bettmann / Getty Images.],
  alt: "Lunch Atop a Skyscraper: scena di vita nella fotografia.",
  height: 110mm,
)
```

I dieci tipi sono `una-colonna`, `due-colonne`, `tutta-pagina`, `al-vivo`, `al-vivo-esterno`, `sagoma`, `sagoma-pagina`, `sagoma-doppia`, `doppia-pagina` e `capolettera`. La [guida completa](DESIGN.md#proprietà-editoriali-e-tipi-delle-figure) descrive comportamento, opzioni e corpi di testo delle sagome e delle doppie. Il formato è codice eseguibile, senza direttive nei commenti. I valori non validi causano un errore nella chiamata.

`rights: none` omette la riga dei diritti; sostituirlo con `[Attribuzione verificata.]` per aggiungerla. Le didascalie sono contenuto nativo con corsivi, formule, citazioni e note. I diagrammi e i confronti composti usano normali figure Typst: corpo, caption, diritti ed etichetta sono nel capitolo; i disegni specifici sono in `assets/diagrams/`. I cataloghi e i manifest conservano provenienza, originali e licenze.

### Asset, didascalie e diritti

Gli originali attivi stanno in **`../../risorse-condivise/immagini/figure/<tema>/`**, con nomi descrittivi italiani; font e licenze sono in `../../risorse-condivise/font/editoriali/`. I manifest conservano provenienza, hash e attribuzioni. Nei file Typst usare `path("/risorse-condivise/immagini/…")`: `/` indica la radice del repository impostata da `--root`, non la radice del computer.

Il componente `image-figure()` gestisce figura, didascalia, diritti e numerazione; un’etichetta come `<fig-bodoni>` permette il richiamo `@fig-bodoni`. Autore, ente di provenienza e titolare dei diritti sono informazioni distinte: non aggiungere una licenza se non è documentata.

Nelle figure personalizzate importare `rights-text` da `template/editorial.typ` e scrivere `#rights-text[Credito e condizioni d’uso.]`. È lo stesso ruolo usato da `image-figure()`: corpo 8/10 pt, peso 400, corsivo. Un nome già racchiuso fra `_` conserva il corsivo anche dentro questo ruolo; nella prosa ordinaria l’enfasi mantiene il comportamento nativo di Typst.

Per una figura che richiede tutta la gabbia, scegliere `format: "due-colonne"`; `placement` e `scope` restano disponibili per le composizioni native. Sono parametri nativi di [figure](https://typst.app/docs/reference/model/figure/#parameters-scope): Typst trova lo spazio e ricompone le colonne. Il testo resta nel suo ordine di lettura e l’immagine conserva le proporzioni. Usare questa opzione per diagrammi e schermate con dettagli minuti, senza fissare una pagina.

Il template corregge i normali richiami alle figure mobili per il [difetto Typst #4359](https://github.com/typst/typst/issues/4359): un marker invisibile segue l’immagine e il collegamento apre quella posizione, anche per i pannelli fissi all’interno di un contenitore mobile. Numeri e supplementi restano nativi. Non serve aggiungere codice ai capitoli né una nuova dipendenza.

Le note delle figure mobili a gabbia intera vanno nel paragrafo che le richiama: Typst può perdere le note inserite direttamente in una figura con `scope: "parent"`. Le didascalie restano accanto alle immagini, mentre URL e richiamo della nota seguono la prosa.

Per le figure a foglio intero con didascalia su un’altra pagina scegliere `format: "al-vivo"` nella chiamata di `image-figure()`: la miniatura dello stesso asset ha **la stessa altezza dell’intero blocco di testo**, conserva le proporzioni e l’immagine intera senza cornici e lascia **3 mm** al testo. Un divisorio sottile in colore inchiostro `#2E3138` a tutta gabbia precede il gruppo di **8 pt**; le eventuali note stanno sopra il divisorio. Il blocco indivisibile comprende miniatura, numero della figura, didascalia e diritti, quindi il rimando «Nella pagina successiva · p. NNN →» sull’ultima riga; non crea un altro progressivo. Caption e diritti mantengono rispettivamente **9/10,8 pt** e **8/10 pt**. Numero della figura e numero della pagina sono collegati alla destinazione dell’immagine. Il folio deriva dalla destinazione e si aggiorna dopo la ricomposizione, anche nel volume con preliminari romani e ripartenza araba da 1: non scrivere numeri di pagina manuali né ricavarli aggiungendo 1 alla pagina della caption. La nota sitografica resta al piede della pagina della didascalia.

Le quindici schermate Caffè TTC usano figure ordinarie nel testo con caption e nota URL sulla stessa pagina. Scegliere una colonna se il dettaglio rimane leggibile, altrimenti due; le schermate complete del sito richiedono generalmente la gabbia larga. `inline-figure(id: ..., file: ..., caption: ..., rights: ..., alt: ..., aspect-ratio: ..., columns: 1)` conserva proporzioni e font editoriali senza riservare un foglio. Gli originali restano integri e le catture escludono tab Design e selettore dello stile.

Per le slide, `pnpm prepare:assets` genera copie identiche in `progetti/slide/public/images/shared/`. È già richiamato prima di sviluppo, build ed esportazione. Non modificare le copie generate: cambiare l’originale in `risorse-condivise/immagini/`. `node scripts/build/shared-assets.mjs --check` verifica l’identità dei file. Le immagini precedenti già usate dalle slide sono conservate; la migrazione dei riferimenti avverrà con i rispettivi contenuti.

## Testo attorno alle trasparenze

`template/text-wrap.typ` usa il profilo alpha della figura e Meander soltanto nella regione che la circonda; il seguito torna al normale flusso Typst. Il testo non ha un numero prefissato di righe o pagine. La didascalia segue il paragrafo associato alla sagoma, così non ne interrompe una frase. Passare quel paragrafo alla funzione e proseguire poi con prosa ordinaria.

Per più sagome distribuite su pagine consecutive usare `image-spread()` da `template/figures.typ`: un elenco di immagini autonome e un solo corpo di testo. Ogni elemento dichiara `format: "sagoma"`, file, profilo, ID, pagina relativa, quote della visuale, didascalia e diritti. I contenuti restano nel capitolo; il componente comune conserva il flusso delle colonne, le note e i richiami. Composizione applica questa modalità a foglia, fiore e conchiglia; riferimenti e prompt delle nuove immagini sono in `assets/forme-naturali-scontornate/`.

Il foglio autonomo si sceglie per la funzione artistica dell’opera, senza ereditare automaticamente la tavola della fonte. `page-figure()` conserva soltanto gli inserti selezionati con margini e folio; fotografie, screenshot, campioni e schemi rientrano nel flusso con `inline-figure()` a una o due colonne. Proporzioni, originali, didascalie, diritti e URL si conservano. La verifica dell’inventario controlla anche le quote fisiche del gruppo immagine e caption, per impedirne l’invasione nella fascia delle note.

Per il Duomo il capitolo dichiara `format: "sagoma-doppia"` e le quote specifiche nella chiamata a `image-figure()`, con `outer-notes: true`. Una sola immagine attraversa il dorso alla stessa scala e raggiunge il bordo inferiore; il motore garantisce pagina pari a sinistra e dispari a destra. La prosa scorre nelle quattro colonne sul profilo alpha, con didascalia e note nelle colonne esterne. Le altre sagome dichiarano le proprie quote nel capitolo. Per un solo foglio usare `format: "sagoma-pagina"`; il seguito torna alle colonne native.

`format: "sagoma-pagina"` consente di mantenere automatica la partenza o di richiedere una parità tramite `start-page`. L’annuncio Olivetti Lettera 32 usa `start-page: "even"` e `bleed-left: true`: comincia sulla pagina sinistra e allinea il primo pixel visibile al bordo esterno del foglio, conservando larghezza di 240 pt e rispetto del profilo di 8 pt. La parità viene raggiunta anche quando il testo precedente si ricompone; l’eventuale pagina di parità è parte di questa composizione fissa.

Le voci delle note sono composte in regioni indipendenti dalle misure del testo sagomato. La loro altezza deriva dal contenuto: questo evita dipendenze circolari quando una modifica precedente cambia la paginazione e mantiene separate più note sulla stessa pagina.

Il profilo si rigenera soltanto se cambia l’immagine, con Python e Pillow:

```sh
python3 progetti/booklet/scripts/contorni.py risorse-condivise/immagini/figure/tipografia/duomo-firenze-illustrazione.png risorse-condivise/dati/sagome/duomo-firenze.json
```

Il JSON è un dato derivato: non è un elenco di righe del testo. Scala e distacco di 8 pt sono gestiti dal componente. La larghezza richiesta viene limitata per mantenere almeno 108 pt al testo; usare una gabbia più ampia quando l’immagine perderebbe leggibilità.

La sillabazione di Typst resta attiva nei frammenti composti, ma Meander restituisce il seguito fra parole intere. I campioni alpha sono riuniti in fasce alte almeno una riga, conservandone l’ingombro massimo; le righe interrotte dal contorno hanno la spaziatura finale naturale. Il giustificato resta attivo all’interno dei frammenti. Le sagome centrali di `image-spread()` richiedono almeno 108 pt continui di testo su entrambi i lati: il componente segnala una visuale troppo larga, da ridurre o riposizionare nel capitolo.

## Aperture vettoriali a tutta pagina

`anteprime/aperture.typ` legge `piano.json` e mostra le stesse otto aperture attive del volume. Il campo radice `aperture` del piano vale `progetti/booklet/assets/aperture-imagegen-svg-v1`: `template/plan.typ` legge `manifest.json` e `composizioni.json` della famiglia, seleziona la grafica per numero e usa i fondi senza testo di `disegni/`. Gli SVG autonomi con testo editabile restano in `svg/`; il booklet non li usa come pagine appiattite.

Il confronto dell’integrazione è in `../../reports/typst-booklet/aperture-integrazione/`: registra destinazioni dell’indice, pagine interessate, identità visiva rispetto al campionario e testo nativo. `aperture-dal-volume.pdf` è l’estratto delle sole sette aperture, consultabile in un lettore esterno.

`number` e `code` identificano il capitolo corrente, da 01 a 08. `apertura_originale` resta soltanto un riferimento storico alla biblioteca precedente. `chapter-opening()` in `template/layout.typ` prepara lo sfondo a tutta pagina e compone titolo e numero come testo **Sora 700 nativo**, con corpi, interlinee, spaziature, posizioni e salti di riga approvati nel campionario. Il titolo completo proviene dal piano unico: un solo heading alimenta indice e segnalibri PDF. `composizioni.json` contiene quote di presentazione e posizione del salto di riga, senza una seconda copia del titolo.

Per modificare le forme usare `./assets/aperture-imagegen-svg-v1/disegni/`; per la composizione tipografica aggiornare `composizioni.json`. `componi.py` nella stessa famiglia rigenera gli SVG autonomi e gli hash del manifest. Originali, prompt, font, licenze e comandi di verifica sono descritti nel relativo [README](./assets/aperture-imagegen-svg-v1/README.md). Il volume e il campionario Typst leggono direttamente gli stessi dati e fondi.

Frontespizio, crediti e indice mantengono gray 300; gli otto capitoli conservano red, orange, amber, yellow, lime, green, emerald e teal 300. `template/palette.typ` continua a risolvere le tinte dalla sezione `palette` del manifest storico in `../../risorse-condivise/immagini/aperture/`, con l’intera sequenza di 26 famiglie. I fondi attivi usano i colori esatti; accenti secondari, segmenti del nastro di Colore e due campioni corallo identici mantengono i propri ruoli `data-palette`. Il codice 06 di Tipografia usa blue 600 `#155DFC` sul fondo green 300; il macrosegno è la forma illustrativa ricostruita dal concept, distinta dal glifo autentico Sora della biblioteca precedente. Titoli e numeri usano invece il font Sora autentico.

La biblioteca in `../../risorse-condivise/immagini/aperture/` conserva le dodici grafiche precedenti e le loro composizioni, comprese la variante del titolo di Griglie a 200 pt e la «a» autentica di Sora Bold. I file `capitoli-01-06.typ`, `capitoli-07-10.typ` e `capitoli-11-12.typ` appartengono a quel sistema storico; non selezionano le sette aperture correnti. `python3 progetti/booklet/scripts/colora-aperture.py --check` controlla la biblioteca storica; senza `--check` ne riallinea gli SVG ai dati originali del manifest. Le tinte delle fonti Figma restano dati distinti, compresa la Salvia della Griglia.

Lo sfondo si estende all’intero foglio; i tagli delle forme sul bordo sono intenzionali. Le illustrazioni delle aperture sono distinte dai documenti e dagli esempi citati nei capitoli. Le grafiche precedenti e i collage rifiutati restano conservati nei rispettivi archivi.

## Commenti Figma e stato dell’importazione

Prima di ogni capitolo vanno riletti testo corrente e commenti ancorati alle relative tavole. Una correzione già applicata non va ripetuta; una richiesta puntuale non si estende automaticamente all’intero volume. Il registro di lavoro è in `../../reports/typst-booklet/commenti-importazione.json`: comprende 111 commenti: 95 riletti dal vivo e 16 storici non riverificati, ed è **parziale**. Non certifica la revisione di tutti i commenti Figma. Nessun commento è stato risolto o modificato durante l’importazione.

Il capitolo 01, Storia del design, importa la prosa corrente e le figure documentarie, con 36 riferimenti bibliografici. Quindici schermate Caffè TTC sostituiscono le visuali precedenti del bar; Adattabile conserva la vista desktop, dopo la rimozione della schermata mobile richiesta dall’utente. Gli originali precedenti restano nell’archivio e le catture condivise conservano provenienza e licenze. La ricognizione dei commenti del capitolo comprende 31 thread risolti nell’interfaccia; il rapporto `../../reports/typst-booklet/import-source/storia-commenti.json` conserva i bersagli, le correzioni già applicate e il limite dell’avviso di riconnessione. I registri storici non sono presentati come nuove verifiche dal vivo.

I capitoli 02–05 sono integrati dalle consegne verificate, con 81, 30, 94 e 51 figure rispettivamente. I rapporti di copertura e verifica restano in `../../reports/typst-booklet/02-ricerca/`, `03-accessibilita/`, `04-gestalt/` e `05-colore/`; il confronto del volume integrato è in `../../reports/typst-booklet/integrazione/`. Il capitolo 06, Tipografia, è incluso integralmente come bozza in revisione; il precedente estratto è conservato invariato in `./assets/archivio/typst/estratti/06-tipografia.typ`. Il campionario delle aperture verifica soltanto le grafiche. Stato e percorsi effettivi sono in `piano.json`.

Il capitolo 07, La griglia, segue la Page corrente `102 · Griglia · Nuovo design` (`4954:42`), con le integrazioni editoriali richieste dai materiali locali. `bibliografia/07-griglia.yml` raccoglie ventiquattro fonti APA, compresa l’edizione PDF del 2024; le descrizioni editoriali restano nell’apparato «Lettura delle fonti» incluso in `capitoli/07-griglia.typ`; note e collegamenti di consultazione restano vicini ai passaggi pertinenti. I manifest della fonte in `../../risorse-condivise/fonti/booklet/griglia-nuovo-design/` conservano originali, autori, diritti e identificatori Figma: una fonte bibliografica non attribuisce automaticamente una licenza alle immagini. L’anteprima `capitoli/07-griglia.typ` e il volume includono lo stesso sorgente; `pnpm build:booklet --target griglia` compila il capitolo isolato.

Il capitolo dichiara file, ID, didascalia, diritti, testo alternativo e tipo di ogni figura attraverso l’API comune `image-figure()`. I diagrammi composti restano figure Typst native nel capitolo; i documenti sul dorso usano `format: "doppia-pagina"`. Il catalogo `../../risorse-condivise/dati/figure/griglia/figure.json` e il manifest conservano provenienza e dati condivisi. Il progressivo stampato deriva dal capitolo. I 39 diagrammi sono SVG con testo conservato; opere e dettagli mantengono originali e ritagli documentati.

Il capitolo include anche gli otto originali della sezione «La griglia & lo spazio responsive» del booklet di dicembre 2024 (pp. 100–107): Golden Grid System, anatomia, doppia pagina editoriale, dispositivi, responsive/adaptive, costruzione aurea e due schemi dei terzi. Le sette immagini raster e il diagramma vettoriale sono registrati nel manifest, con hash del PDF e pagine di provenienza; la numerazione è unica con le 42 figure correnti. I codici `2024-...` distinguono le fonti storiche e non vengono stampati. I documenti verticali riusano `page-figure` tramite `page-number: true`; gli altri seguono il flusso ordinario. Le didascalie chiariscono la distinzione client/server dell’infografica HTMLBurger, le percentuali senza metodo documentato e l’etichetta «Area aurea» nel reticolo dei terzi, conservando le immagini originali. Le verifiche sono in `../../reports/typst-booklet/07-griglia/vecchio-booklet/`.

Le integrazioni dai materiali sviluppano margine/gutter/padding, contenitori fluidi con limite massimo, dodici colonne, scelta fra Grid e Flexbox e immagini responsive. Le sottosezioni sulle immagini separano risorsa, inquadratura e ritaglio; un confronto storico di Vogue e l’esercizio di ricomposizione collegano spiegazione e verifica. Quattro diagrammi modificabili e il confronto documentario portano il capitolo a 55 figure; le note sono 23. Provenienza delle aggiunte e verifica delle fonti primarie sono in `../../risorse-condivise/fonti/booklet/griglia-integrazioni-materiali/manifest.json`. Gli approfondimenti restano nei registri locali, mentre testo e bibliografia rimandano alle fonti primarie. Il generatore dei quattro SVG è in `../../risorse-condivise/immagini/figure/griglia/integrazioni-materiali/generatore.py`; il catalogo della sintesi è distinto dagli originali Figma. La figura iniziale e il titolo restano nel medesimo blocco a gabbia intera, con prosa successiva nelle due colonne.

Dalla radice, `python3 risorse-condivise/immagini/figure/griglia/integrazioni-materiali/generatore.py --check` verifica SVG, catalogo di sintesi e registrazioni canoniche senza modificarli. Senza `--check`, rigenera i quattro diagrammi e aggiorna soltanto le loro registrazioni; originali Figma, schermate e altri metadati sono conservati.

`image-figure(file, caption, format: "doppia-pagina", dimensions: …, id: …, rights: …, alt: …, left-body: [...], right-body: [...])` usa `template/spreads.typ` per i due diagrammi sul dorso. Il componente assicura pagina pari a sinistra e dispari a destra, una sola figura numerata e la stessa immagine alla stessa quota e scala. I testi restano nativi; la quota cresce insieme all’ingombro maggiore e la compilazione segnala uno spazio insufficiente. Non occorrono profili alpha. I metadati `booklet-documento-doppio` espongono parità e geometrie per la verifica. La lettura corrente dei commenti della sola Page Griglia è documentata in `../../reports/typst-booklet/07-griglia/commenti.json`, distinta dal registro generale parziale.

L’anteprima di lavoro `capitoli/06-tipografia.typ` contiene tutto il testo modificabile di Tipografia e lo condivide con il volume. `image-crop()` in `template/figures.typ` conserva gli ingrandimenti fotografici delle tavole documentarie: il ritaglio agisce sull’originale immutato, mentre titoli e didascalie restano testo nativo. Le dimensioni esplicite della fotografia mantengono il rapporto originale dentro la finestra del dettaglio. Queste quote riguardano soltanto l’immagine; non assegnano righe o pagine alla prosa.

`template/figures.typ` mantiene una fascia comune per gli esempi dei font, con titolo e didascalia modificabili. I glifi conservano corpo e contorni autentici; un ingrandimento dichiarato resta distinto dalla scala ordinaria. `keep-together()` tiene vicine le figure correlate nella gabbia intera, lasciando a Typst il posizionamento mobile. `specimen-row()` allinea le etichette modificabili delle classificazioni e conserva la scala dei glifi. Gli SVG delle visuali non incorporano le didascalie editoriali. La bozza estesa comprende tutte le sezioni 6.1–6.9 fino alla tavola 490, compresi leggibilità, consigli e web. Volume e anteprima usano questi stessi contenuti. Restano la verifica editoriale conclusiva e le decisioni locali prima della pubblicazione.

La bibliografia dell’anteprima di Tipografia combina nativamente `06-tipografia.bib`, `06-tipografia-articoli.yml` e `06-tipografia-opere.yml`. Il formato Hayagriva conserva i numeri degli articoli nel campo documentato `serial-number`: il convertitore BibLaTeX di Typst 0.15.1 ignora invece `eid`. Citazioni autore–anno, ordinamento e apparato APA restano automatici; le voci non vengono riscritte manualmente nel testo.

Typst 0.15.1 include Hayagriva 0.10.1, che [disambigua soltanto tre coorti autore–anno per bibliografia](https://github.com/typst/hayagriva/issues/507). Il capitolo di Tipografia usa perciò `bibliografia/06-tipografia-gruppi.typ`: quattro intervalli contigui di chiavi, con al massimo tre coorti ciascuno. `template/bibliography.typ` assegna le citazioni con il parametro nativo `target` e stampa le parti consecutive sotto un solo titolo. Dati bibliografici e citazioni visibili rimangono nei file originali. Il preordine delle sole coorti ambigue usa `cite(form: none)`; i suffissi seguono l’ordine dell’elenco nativo, comprese le date complete W3C del 2024. Aggiungendo una fonte a questo capitolo, inserire anche la sua chiave nell’intervallo appropriato. La variante è attiva sia nel volume sia nell’anteprima isolata, attraverso lo stesso resolver del piano.

Le dodici grafiche precedenti confermate dall’utente restano nella biblioteca storica; il volume e il campionario attivo usano le sette ricostruzioni e l’apertura 08 nativa della famiglia `aperture-imagegen-svg-v1`. Restano confermate le note 7,5/9 pt con URL 7/8,5 pt. Le versioni SVG precedenti sono conservate in `./assets/archivio/typst/copertine/svg-v1/`.

## Esperimenti precedenti

`esperimenti/base.typ`, `esperimenti/pagine-figma/main.typ` e `esperimenti/sagoma-doppia-pagina/main.typ` conservano le prove precedenti. Il secondo usa coordinate Figma; il terzo ricrea una doppia pagina fissa con un vecchio Meander modificato. Le dipendenze sono in `esperimenti/vendor/`; le immagini condivise usano gli stessi originali del booklet, quelle esclusive sono in `./assets/archivio/typst/`. `main.typ` importa soltanto il template corrente.

`esperimenti/capitoli-esclusi/` conserva i sorgenti di Introduzione e Griglia e le rispettive bibliografie. Restano prove consultabili e non vengono inclusi da `main.typ` o aggiunti al piano attivo.

I PDF ordinari sono `build/booklet.pdf`, le nove anteprime dei preliminari e dei capitoli e il campionario delle aperture in `build/anteprime/`. Le verifiche isolate si rigenerano in `build/verifiche/`; i PDF delle vecchie demo e dei campioni A/B superati sono rimossi. I temporanei e i rapporti restano in `../../reports/typst-booklet/`.

La [documentazione delle demo](esperimenti/README.md) conserva istruzioni, fonti e attribuzioni dei relativi asset.

Documentazione: [Typst](https://typst.app/docs/), [bibliografie multiple](https://typst.app/docs/reference/model/bibliography/#multiple-bibliographies), [Meander](https://typst.app/universe/package/meander/), [Tinymist](https://myriad-dreamin.github.io/tinymist/config/vscode.html).


## Composizione e gerarchia visiva

Compilazione isolata: `pnpm build:booklet --target composizione-gerarchia`. Ispezione del PDF già compilato: `pnpm preview:booklet --target composizione-gerarchia --pages 1-8`. Il target conserva la stessa prosa del volume, bibliografia APA e Appunti. Il capitolo conserva **53 figure e 14 pubblicazioni APA**; paginazione e voci di nota seguono la ricomposizione, conservando i siti pertinenti e le note locali. Include ancoraggio/relais, formato narrativo del quadro, concept visivo, moodboard e controllo con sfocatura. Le due moodboard conservano i JPEG originali senza ricompressione. Attribuzioni, provenienze, snapshot e selezione dei materiali restano nei manifest di `../../risorse-condivise/fonti/booklet/composizione-gerarchia/` e `../../risorse-condivise/immagini/figure/composizione/`. Il comando `scripts/prepara-composizione.py` rigenera le composizioni dagli originali. La verifica dei commenti dei due capitoli e i controlli di impaginazione sono in `../../reports/typst-booklet/08-composizione-gerarchia/`.

La prosa attorno alle tavole a pagina intera usa paragrafi nativi; i raccordi fra inserti sono risolti nel testo. L’unica eccezione è in **8.8**: cinque brevi capoversi usano `block(breakable: false)` per evitare frammenti fra le moodboard e il passaggio alla variazione. Questi blocchi non contengono figure, titoli o note interne e non si applicano agli altri paragrafi. Le moodboard sono float ordinari a tutta gabbia di **137 mm**, in basso (`placement: bottom`). L’esercizio conclusivo usa `exercises.typ`: box al piede con cornice a L tenue e tre paragrafi nelle colonne native, senza un `colbreak()` manuale.

`image-figure(format: "tutta-pagina")` accetta il parametro opzionale `aspect-ratio` (larghezza/altezza): quando definito, mantiene l’immagine intera alla massima dimensione disponibile e la accosta in basso alla caption misurata. Il wrapper `colore-atmosfere.svg` è corretto alle proporzioni naturali del raster incorporato, senza ritagli né alterazioni dei byte; dimensioni, hash e dettaglio del trattamento sono nel manifest della fonte. Il contratto editoriale e i limiti dell’eccezione dei capoversi sono in `DESIGN.md`.

Il formato al vivo è riservato alle locandine, alle pubblicità e alle opere artistiche selezionate per la composizione integrale. Queste usano `figura-al-vivo(id: ..., file: ..., didascalia: ..., diritti: ..., alt: ..., rapporto: ..., ancoraggio: (..., ...))`; `crop: false` conserva interamente le opere con testi ai bordi. Caption con miniatura e rimando restano sulla pagina fisica precedente, con note, quote e collegamenti verificati dall’inventario. Le altre visuali usano figure ordinarie: una colonna come prima scelta, due soltanto per testi, dettagli e confronti. Il registro corrente è in `../../reports/typst-booklet/figure-una-colonna/`; il vecchio elenco in `immagini-tutta-pagina/` resta storico. Non inserire `place.flush()` o pagine vuote per correggere il flusso.
