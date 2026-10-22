# Booklet in Typst

`piano.json` è l’autorità per ordine, titoli, numerazione, file e stato dei capitoli. Il booklet comprende soltanto le sei lezioni richieste, numerate **01–06**. `main.typ` richiama i file disponibili in `capitoli/`, con le rispettive fonti in `bibliografia/`: **Tutti i sei capitoli sono inclusi**; **Tipografia è in revisione editoriale**, con le sezioni 6.1–6.9 e le fonti complete. Gli inserti a pagina intera dei capitoli 02–04 sono verificati. I capitoli in preparazione non producono pagine vuote.

Il campo `fonti` accetta un percorso oppure una lista di percorsi. La bibliografia nativa combina BibLaTeX e YAML quando occorre: i numeri di articolo, come `e340` in Gestalt, sono nel campo YAML `serial-number.serial`, perché Typst 0.15.1 non importa il campo BibLaTeX `eid`. Le citazioni e lo stile APA restano gestiti da Typst.

| Codice e capitolo | Lezione Slidev | Tema originale | Palette conservata | Stato |
| --- | --- | --- | --- | --- |
| 01 · Storia del design | 03 | 2 | orange 300 · `#FFB86A` | Completo |
| 02 · Ricerca, contesto e inclusione | 04 | 4 | yellow 300 · `#FFDF20` | Completo |
| 03 · Accessibilità e design inclusivo | 05 | 5 | lime 300 · `#BBF451` | Completo |
| 04 · Gestalt | 06 | 7 | emerald 300 · `#5EE9B5` | Completo |
| 05 · Colore e significato | 07 | 10 | sky 300 · `#74D4FF` | Completo |
| 06 · Tipografia | 08 | 11 | blue 300 · `#8EC5FF` | In revisione |

Introduzione, Processo UX, Define, Linguaggio visivo, Gerarchia visiva e Griglia sono esclusi dal piano. Le vecchie prove di Introduzione e Griglia, con le fonti, restano in `esperimenti/capitoli-esclusi/`. I numeri delle lezioni Slidev e i codici Figma identificano le fonti, senza fissare numeri di capitolo o folio del nuovo volume. Il vecchio concept della metropolitana è escluso.

## Organizzazione

```text
typst-booklet/
├── main.typ                  Ingresso del booklet
├── piano.json                Sei lezioni, ordine e stato dei capitoli
├── apparati/                 Crediti e avvisi del volume
├── capitoli/                 Ingressi dei sei capitoli e moduli per argomento
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
│   └── aperture/             Composizioni di titolo e numero
├── anteprime/aperture.typ     Campionario delle sei aperture attive
├── scripts/                  Preparazione delle sagome e dei colori
├── esperimenti/              Demo e capitoli esclusi dal piano
└── build/                    PDF generati, esclusi da Git
```

Il comando comune è `../scripts/booklet.mjs`; `../scripts/booklet.py` è l’ingresso Python dei moduli in `../scripts/booklet/`: ambiente e asset, compilazione, inventario editoriale, PDF, regressioni e CLI. Le prove sono in `../scripts/booklet-prove/`. Gli hash degli originali vengono calcolati a blocchi; i collegamenti delle note sono indicizzati per pagina.

Gli ingressi `.typ` direttamente in `capitoli/` mantengono l’ordine esplicito dei moduli nelle rispettive sottocartelle. Ogni modulo importa soltanto i componenti usati. Le composizioni specifiche di Ricerca, Accessibilità e Gestalt sono separate dalla prosa; le regole di pagina che devono agire sulla stessa sequenza restano nello stesso ambito Typst. Le tre fonti di Tipografia sono dichiarate una sola volta nel piano; il resolver assegna i quattro gruppi APA del capitolo. Lo stato `in-revisione` indica che il testo è presente ma la verifica editoriale non è conclusa.

Le immagini e i font sono condivisi con le slide nella cartella `../assets/`: figure in `images/figure/<tema>/`, copertine in `images/aperture/`, font in `fonts/editoriali/` e profili alpha in `dati/sagome/`. Le prove grafiche precedenti stanno in `archivio/typst/`. La [guida agli asset](../assets/README.md) indica originali, manifest, licenze e copie generate.

## Aprire e compilare

Aprire **questa cartella** in VS Code. La configurazione `.vscode/settings.json` di Tinymist imposta la radice del progetto al repository padre e carica soltanto i font condivisi. Aprire `main.typ` e avviare **Typst Preview**. La versione collaudata della CLI è **Typst 0.15.1**, fissata in `.typst-version`: il comando rifiuta altre versioni. Aggiornare la versione soltanto dopo il confronto dei rendering e il superamento delle verifiche. La Preview di Tinymist usa il proprio motore: la verifica CLI rimane quella di consegna.

Con **⌘⇧B** l’attività predefinita `Typst: booklet` usa lo stesso comando della CLI e compila volume e anteprime. `Typst: anteprima aperture` compila soltanto il campionario; `Typst: verifica booklet` esegue tutti i controlli. Le impostazioni sono in `.vscode/tasks.json`.

Dalla radice del repository, preparare una volta Python **3.10 o successivo** con le dipendenze collaudate per immagini e PDF:

```sh
python3 -m venv typst-booklet/.venv
typst-booklet/.venv/bin/python3 -m pip install -r typst-booklet/requirements.txt
pnpm build:booklet
pnpm check:booklet
```

Su Windows usare `typst-booklet/.venv/Scripts/python.exe` per l’installazione. Il runner sceglie `BOOKLET_PYTHON` quando impostato, altrimenti il Python del venv locale e infine `python3`. Non è necessario attivare il venv. La versione Typst deve essere disponibile nel `PATH`.

Entrambi i comandi verificano piano, temi, percorsi, font e licenze con hash, dimensioni e contenuto dei profili alpha, poi compilano `main.typ`, aperture, Colore e la bozza estesa di Tipografia. Qualsiasi avviso Typst causa un fallimento. `check:booklet` controlla inoltre inventario delle figure, note e voci singole sulla pagina del richiamo, bibliografie, ancore delle figure mobili, metadati e parità delle doppie pagine, destinazioni interne dei PDF. Le regressioni isolate verificano i contorni dei glifi a peso 700/800/900, le note ripetute, le date APA con solo anno/senza data/data completa, i profili alpha e l’overflow delle sagome con e senza note, anche su pagina pari e dispari. Le prove Python verificano inoltre i controlli stessi: link mancanti o duplicati, gruppi di pagine incompleti, profili malformati e conservazione dei rapporti completi durante una compilazione parziale. Il controllo dei link certifica la presenza delle destinazioni nel PDF; non verifica la raggiungibilità degli URL in rete o la conformità completa del PDF accessibile.

I PDF restano in `build/`; il rapporto e l’indice generato dei manifest stanno in `../reports/typst-booklet/check/`. Il controllo completo conserva `verifica.json`; compilazioni, controlli dei soli dati e ingressi singoli usano rapporti distinti, così una prova parziale non sostituisce l’ultimo controllo completo. I conteggi di figure e note attesi sono in `../scripts/booklet-prove/attesi.json`: aggiornarli soltanto dopo inserimenti o rimozioni intenzionali. Nessun numero di pagine è fissato. Per i soli dati usare `pnpm check:booklet --assets-only`; per un ingresso usare, per esempio, `pnpm build:booklet --target aperture`.

Per l’aggiornamento continuo usare Typst Preview oppure `typst watch --root . --ignore-system-fonts --font-path assets/fonts/editoriali typst-booklet/main.typ typst-booklet/build/booklet.pdf`. La prima compilazione scarica **Meander 0.4.4** e la dipendenza hy-dro-gen dal registro ufficiale; le successive usano la cache locale. Il nuovo template importa il pacchetto ufficiale senza modifiche. La copia in `esperimenti/vendor/` appartiene soltanto alle vecchie demo.

`build/` è ignorata da Git. I PDF delle fonti e gli asset originali restano versionabili. Le prove di questa sessione usano una cache temporanea ufficiale, selezionabile con `--package-cache-path /tmp/cvedi-typst-packages`; quel percorso non è necessario su un altro computer.

## Modificare il testo

Scrivere paragrafi normali nei file `.typ` di `capitoli/`, lasciando una riga vuota fra loro. `==` introduce una sezione; `===` introduce un sottoparagrafo. Entrambi proseguono nel flusso delle due colonne, senza salti obbligatori che lascino colonne vuote; il titolo rimane legato al testo seguente. `*testo*` è grassetto e `_testo_` è corsivo. I nomi di persona nella prosa sono in corsivo.

Le righe, le colonne e le pagine sono composte da Typst: non aggiungere coordinate, spezzature manuali dei paragrafi o salti per imitare i folio Figma. I numeri di pagina e i richiami sono rigenerati. In `piano.json` si gestiscono ordine, titolo, stato, file del testo e file bibliografico. `main.typ` legge questi dati e include soltanto i capitoli disponibili; i moduli di `template/` separano geometria, ruoli editoriali e composizione del capitolo.

### Scegliere il componente

| Contenuto o tipo di pagina | Componente e responsabilità |
| --- | --- |
| Prosa, sezioni e sottoparagrafi | Markup Typst nativo; `stile.typ` definisce le regole comuni. |
| Figura nel flusso o mobile a gabbia intera | `figure.typ`: `immagine()`, con `placement` e `scope` nativi. |
| Documento mobile con altezza limitata o gabbia riservata | `figure.typ`: `documento-mobile()`; i wrapper di Ricerca e della mappa WCAG conservano rapporto, allineamento e riserva specifici. |
| Un’unica figura su un foglio autonomo | `figure.typ`: `figura-pagina()`, misura caption e diritti e adatta l’immagine. |
| Più documenti sullo stesso foglio | `documenti.typ`: `tavola-documentaria()`, contenuti composti con i componenti granulari. |
| Schermata Caffè TTC al vivo | `figure.typ`: `schermata()`, con didascalia nella prosa precedente. |
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

Il template corregge i normali richiami alle figure mobili per il [difetto Typst #4359](https://github.com/typst/typst/issues/4359): un marker invisibile segue l’immagine e il collegamento apre quella posizione. Numeri e supplementi restano nativi. Non serve aggiungere codice ai capitoli né una nuova dipendenza.

Le note delle figure mobili a gabbia intera vanno nel paragrafo che le richiama: Typst può perdere le note inserite direttamente in una figura con `scope: "parent"`. Le didascalie restano accanto alle immagini, mentre URL e richiamo della nota seguono la prosa.

Per gli screenshot Caffè TTC richiesti a piena pagina usare `schermata(file, didascalia, etichetta, alt)`: la caption modificabile e la nota URL precedono una pagina senza margini, folio o apparati. Passare l’etichetta come argomento, per esempio `<fig-ttc-flat>`, e richiamarla con `@fig-ttc-flat`. Due viste consecutive possono condividere la spiegazione: la seconda chiamata riceve `none` come didascalia. Le immagini hanno il rapporto del foglio 17:24 e non vengono ritagliate o deformate. Le catture escludono tab Design e selettore dello stile, conservando i controlli propri dell’esempio; i sorgenti del sito rimangono immutati.

Per le slide, `pnpm prepare:assets` genera copie identiche in `public/images/shared/`. È già richiamato prima di sviluppo, build ed esportazione. Non modificare le copie generate: cambiare l’originale in `assets/images/`. `node scripts/build/shared-assets.mjs --check` verifica l’identità dei file. Le immagini precedenti già usate dalle slide sono conservate; la migrazione dei riferimenti avverrà con i rispettivi contenuti.

## Testo attorno alle trasparenze

`template/sagome.typ` usa il profilo alpha della figura e Meander soltanto nella regione che la circonda; il seguito torna al normale flusso Typst. Il testo non ha un numero prefissato di righe o pagine. La didascalia segue il paragrafo associato alla sagoma, così non ne interrompe una frase. Passare quel paragrafo alla funzione e proseguire poi con prosa ordinaria.

Le immagini documentarie che occupavano una tavola autonoma conservano il formato a pagina intera. `template/figure.typ` espone `figura-pagina(id: ..., file: ..., didascalia: ..., diritti: ..., alt: ...)`: misura la didascalia e adatta proporzionalmente l’immagine alla gabbia ordinaria, con folio. Gli inserti privi di note recuperano il margine inferiore ordinario; gli URL restano nella prosa pertinente.

Per il Duomo, `template/doppia-pagina.typ` espone `sagoma-duomo()`, con le quote e l’eccezione delle note raccolte in `preset-duomo`. Una sola immagine attraversa il dorso di due pagine affiancate, alla stessa scala e allineata al bordo inferiore. Il componente assicura pagina pari a sinistra e dispari a destra. Il capitolo contiene un unico blocco di paragrafi modificabili: Meander li distribuisce fra le quattro colonne seguendo l’alpha, poi il testo continua nelle colonne native senza un limite di pagine. La didascalia comune è nella colonna esterna sinistra. Solo queste due pagine usano note nelle colonne esterne da 66 mm, nella fascia di 35 mm confermata dall’utente; il resto del volume conserva le note a tutta gabbia. Per nuove composizioni usare `sagoma-regionale()`, con `larghezza` e `inizio-immagine` esplicite e note ordinarie per impostazione predefinita; `sagoma-pagina()` applica lo stesso motore a un foglio singolo. Le altre sagome sul dorso si fermano sopra la fascia delle note. Il contenitore usa pagine native per la sola coppia, così il seguito e i paragrafi successivi continuano senza un nuovo salto di pagina.

Le voci delle note sono composte in regioni indipendenti dalle misure del testo sagomato. La loro altezza deriva dal contenuto: questo evita dipendenze circolari quando una modifica precedente cambia la paginazione e mantiene separate più note sulla stessa pagina.

Il profilo si rigenera soltanto se cambia l’immagine, con Python e Pillow:

```sh
python3 typst-booklet/scripts/contorni.py assets/images/figure/tipografia/duomo-firenze-illustrazione.png assets/dati/sagome/duomo-firenze.json
```

Il JSON è un dato derivato: non è un elenco di righe del testo. Scala e distacco di 8 pt sono gestiti dal componente. La larghezza richiesta viene limitata per mantenere almeno 108 pt al testo; usare una gabbia più ampia quando l’immagine perderebbe leggibilità.

La sillabazione di Typst resta attiva nei frammenti composti, ma Meander restituisce il seguito fra parole intere. Il breve tratto sagomato non ha quindi tutte le opportunità di sillabazione di un paragrafo nativo: per evitare spazi eccessivi nel giustificato occorre lasciare una giustezza adeguata ai lati della figura.

## Aperture vettoriali a tutta pagina

`anteprime/aperture.typ` legge `piano.json` e mostra soltanto le sei aperture attive, comprese quelle dei capitoli ancora da importare. La biblioteca in `../assets/images/aperture/` conserva le dodici grafiche approvate: soltanto forme SVG, senza immagini raster incorporate. Si possono importare in Figma o modificare con un editor SVG. Titoli e numeri restano testo Typst nativo e modificabile.

`numero` e `codice` nel piano indicano il capitolo corrente, da 01 a 06; `apertura_originale` seleziona il tema nel manifest, mantenendo motivo e palette approvati. L’API `apertura(numero: ..., tema: ...)` separa i due valori. `template/aperture/apertura.typ` prepara pagina e sfondo; i tre file `capitoli-01-06.typ`, `capitoli-07-10.typ` e `capitoli-11-12.typ` compongono i temi originali. I loro nomi identificano la biblioteca grafica e non il numero di capitoli attivi. Il titolo proviene sempre dal piano; la variante ne cambia la presentazione.

La biblioteca usa le prime dodici famiglie [Tailwind](https://tailwindcss.com/docs/colors), tonalità 300: red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo. Il piano attivo conserva orange, yellow, lime, emerald, sky e blue nei sei temi selezionati, senza ricolorare le grafiche. Il manifest conserva OKLCH ufficiale, equivalente esadecimale usato per SVG/PDF e assegnazione. Gli accenti secondari mantengono dominante il colore del capitolo; Colore usa un disco con tutte le diciassette famiglie cromatiche, più un campo sky.

Per cambiare una tinta, modificare `colore` o `secondario` nel manifest ed eseguire `python3 typst-booklet/scripts/colora-aperture.py` dalla radice del repository; `--check` controlla soltanto la coerenza. Nell’SVG gli attributi `data-palette` distinguono i ruoli, anche quando un figlio eredita il colore del gruppo. I segmenti `spettro` mantengono le proprie tinte, elencate nel manifest. Le forme restano modificabili direttamente negli SVG. Il grande glifo di Tipografia è il contorno autentico di Sora Bold, non una lettera approssimata con forme geometriche; font e licenza restano nella cartella condivisa.

Lo sfondo si estende all’intero foglio; i tagli di forme astratte sul bordo sono intenzionali. I margini proteggono il testo. Le illustrazioni decorative delle aperture sono distinte dai documenti e dagli esempi citati nei capitoli. I collage ImageGen rifiutati sono conservati in `../assets/archivio/typst/copertine/collage/`, fuori dagli asset attivi condivisi.

## Commenti Figma e stato dell’importazione

Prima di ogni capitolo vanno riletti testo corrente e commenti ancorati alle relative tavole. Una correzione già applicata non va ripetuta; una richiesta puntuale non si estende automaticamente all’intero volume. Il registro di lavoro è in `../reports/typst-booklet/commenti-importazione.json`: comprende 111 commenti: 95 riletti dal vivo e 16 storici non riverificati, ed è **parziale**. Non certifica la revisione di tutti i commenti Figma. Nessun commento è stato risolto o modificato durante l’importazione.

Il capitolo 01, Storia del design, importa la prosa corrente e le figure documentarie, con 36 riferimenti bibliografici. Quindici schermate Caffè TTC sostituiscono le visuali precedenti del bar; Adattabile conserva la vista desktop, dopo la rimozione della schermata mobile richiesta dall’utente. Gli originali precedenti restano nell’archivio e le catture condivise conservano provenienza e licenze. La ricognizione dei commenti del capitolo comprende 31 thread risolti nell’interfaccia; il rapporto `../reports/typst-booklet/import-source/storia-commenti.json` conserva i bersagli, le correzioni già applicate e il limite dell’avviso di riconnessione. I registri storici non sono presentati come nuove verifiche dal vivo.

I capitoli 02–05 sono integrati dalle consegne verificate, con 81, 29, 94 e 45 figure rispettivamente. I rapporti di copertura e verifica restano in `../reports/typst-booklet/02-ricerca/`, `03-accessibilita/`, `04-gestalt/` e `05-colore/`; il confronto del volume integrato è in `../reports/typst-booklet/integrazione/`. Il capitolo 06, Tipografia, è incluso integralmente come bozza in revisione; il precedente estratto è conservato invariato in `../assets/archivio/typst/estratti/06-tipografia.typ`. Il campionario delle aperture verifica soltanto le grafiche. Stato e percorsi effettivi sono in `piano.json`.

L’anteprima di lavoro `anteprime/06-tipografia.typ` compone gli stessi frammenti modificabili di `capitoli/06-tipografia/` inclusi nel volume. `template/documenti.typ` conserva gli ingrandimenti fotografici delle tavole documentarie: il ritaglio agisce sull’originale immutato, mentre titoli e didascalie restano testo nativo. Le dimensioni esplicite della fotografia mantengono il rapporto originale dentro la finestra del dettaglio. Queste quote riguardano soltanto l’immagine; non assegnano righe o pagine alla prosa.

`template/campioni.typ` mantiene una fascia comune per gli esempi dei font, con titolo e didascalia modificabili. I glifi conservano corpo e contorni autentici; un ingrandimento dichiarato resta distinto dalla scala ordinaria. `confronto()` tiene vicine le figure correlate nella gabbia intera, lasciando a Typst il posizionamento mobile. `riga-campioni()` allinea le etichette modificabili delle classificazioni e conserva la scala dei glifi. Gli SVG delle visuali non incorporano le didascalie editoriali. La bozza estesa comprende tutte le sezioni 6.1–6.9 fino alla tavola 490, compresi leggibilità, consigli e web. Volume e anteprima usano questi stessi contenuti. Restano la verifica editoriale conclusiva e le decisioni locali prima della pubblicazione.

La bibliografia dell’anteprima di Tipografia combina nativamente `06-tipografia.bib`, `06-tipografia-articoli.yml` e `06-tipografia-opere.yml`. Il formato Hayagriva conserva i numeri degli articoli nel campo documentato `serial-number`: il convertitore BibLaTeX di Typst 0.15.1 ignora invece `eid`. Citazioni autore–anno, ordinamento e apparato APA restano automatici; le voci non vengono riscritte manualmente nel testo.

Typst 0.15.1 include Hayagriva 0.10.1, che [disambigua soltanto tre coorti autore–anno per bibliografia](https://github.com/typst/hayagriva/issues/507). Il capitolo di Tipografia usa perciò `bibliografia/06-tipografia-gruppi.typ`: quattro intervalli contigui di chiavi, con al massimo tre coorti ciascuno. `template/bibliografia.typ` assegna le citazioni con il parametro nativo `target` e stampa le parti consecutive sotto un solo titolo. Dati bibliografici e citazioni visibili rimangono nei file originali. Il preordine delle sole coorti ambigue usa `cite(form: none)`; i suffissi seguono l’ordine dell’elenco nativo, comprese le date complete W3C del 2024. Aggiungendo una fonte a questo capitolo, inserire anche la sua chiave nell’intervallo appropriato. La variante è attiva sia nel volume sia nell’anteprima isolata, attraverso lo stesso resolver del piano.

Le dodici grafiche della biblioteca sono confermate dall’utente; il campionario attivo ne seleziona sei. Restano confermate le note 7,5/9 pt con URL 7/8,5 pt. Le versioni SVG precedenti sono conservate in `../assets/archivio/typst/copertine/svg-v1/`.

## Esperimenti precedenti

`esperimenti/base.typ`, `esperimenti/pagine-figma/main.typ` e `esperimenti/sagoma-doppia-pagina/main.typ` conservano le prove precedenti. Il secondo usa coordinate Figma; il terzo ricrea una doppia pagina fissa con un vecchio Meander modificato. Le dipendenze sono in `esperimenti/vendor/`; le immagini condivise usano gli stessi originali del booklet, quelle esclusive sono in `../assets/archivio/typst/`. `main.typ` importa soltanto il template corrente.

`esperimenti/capitoli-esclusi/` conserva i sorgenti di Introduzione e Griglia e le rispettive bibliografie. Restano prove consultabili e non vengono inclusi da `main.typ` o aggiunti al piano attivo.

I PDF ordinari sono `build/booklet.pdf` e le tre anteprime in `build/anteprime/`. Le verifiche isolate si rigenerano in `build/verifiche/`; i PDF delle vecchie demo e dei campioni A/B superati sono rimossi. I temporanei e i rapporti restano in `../reports/typst-booklet/`.

La [documentazione delle demo](esperimenti/README.md) conserva istruzioni, fonti e attribuzioni dei relativi asset.

Documentazione: [Typst](https://typst.app/docs/), [bibliografie multiple](https://typst.app/docs/reference/model/bibliography/#multiple-bibliographies), [Meander](https://typst.app/universe/package/meander/), [Tinymist](https://myriad-dreamin.github.io/tinymist/config/vscode.html).
