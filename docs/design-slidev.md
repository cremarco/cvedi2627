# Sistema delle slide CVeDI

Questo è il contratto visivo delle presentazioni Slidev, comprese le esercitazioni. `DESIGN.md` nella radice riguarda esclusivamente il booklet Figma. La home e gli esempi autonomi conservano i propri sistemi.

## Struttura e contenuti

Il canvas è 1280 × 720, in rapporto 16:9; Slidev lo scala nel viewport senza trasformarlo in una pagina a scorrimento. `slides.md` compone i contenuti Markdown; `utils/lesson-decks.mjs` registra le presentazioni autonome e `utils/slide-sets.ts` ne possiede identità, etichette e palette. Contenuti, dati, componenti Vue e CSS hanno responsabilità distinte. Riutilizzare il layout `default`, le figure e le interazioni esistenti.

I titoli ordinari condividono la posizione superiore; il corpo è centrato nello spazio disponibile sopra il footer. I margini laterali sono 72 px; titolo 47 px, testo 23 px, introduzione 27 px, note e didascalie 18 px, codice monospaziato 19 px. Nunito Sans è il carattere di lettura locale; Inter resta nelle copertine originali. Se il contenuto non entra, dividerlo in slide consecutive conservando ordine, codice e attribuzioni, prima di ridurre il corpo. Il codice va a capo nel canvas senza tagliare commenti o URL. Non aggiungere scorrimento interno al contenuto didattico.

Le copertine e i divisori riusano `ChapterMetro` e i tracciati originali in `data/cover-routes.ts`. Le figure riusano `LessonFigure`: proporzioni originali, nessuna cornice aggiunta, ingrandimento condiviso, didascalia e testo alternativo. Il codice deve restare testo selezionabile e conservare spaziatura e sintassi. Dentro `mockup-code`, `utils/exercise-code.mjs` applica i colori di Shiki con il tema GitHub Dark High Contrast, condividendo istanza e cache fra slide e documenti nativi. Carica soltanto le grammatiche HTML, CSS, JavaScript, shell, JSON e diff; le parti testuali e gli schemi di directory restano testo semplice. I colori non cambiano dimensioni, peso o struttura del componente e sono conservati in stampa. Nelle esercitazioni testo, codice, schemi e interfacce sono ricostruiti con elementi nativi: le schermate precedenti restano soltanto nell’archivio delle fonti. Nelle esercitazioni i blocchi nativi usano `mockup-code` di daisyUI, con pannello neutro e intestazione originali del componente; gli adattamenti riguardano soltanto corpo, spaziatura e ritorno a capo nel canvas.

## Palette e indici

Ogni presentazione possiede una sola palette. I colori sono token di `styles/tokens.css`, applicati da `slideSetStyle`; non vanno duplicati nei contenuti. Le esercitazioni seguono lo stesso ordine cromatico delle lezioni: 01 course, 02 introduction, 03 history, 04 ux-research, 05 ux-perception, 06 ux-gestalt, 07 ux-color, 08 ux-type, 09 ux-prototype. Le copertine, il ribbon, l’avanzamento e i pulsanti devono concordare.

«Indice delle esercitazioni» segue immediatamente «Indice delle lezioni». Entrambi usano la stessa griglia e pulsanti daisyUI `btn` attraverso `SlideAction`. In locale le esercitazioni aprono presentazioni autonome con numerazione propria e ritorno al relativo indice. Online l’indice delle esercitazioni resta visibile con tutti i titoli e colori; i pulsanti sono elementi `button` nativamente `disabled`, senza destinazioni attivabili. I contenuti e gli asset esclusivi delle esercitazioni sono locali. L’indice delle lezioni conserva le destinazioni già pubblicate.

## daisyUI e Slidev

Tailwind 4 e daisyUI 5 sono compilati da `styles/daisy.css`; i file compilati non si modificano a mano. Il tema light esistente eredita i valori daisyUI e ridefinisce i ruoli necessari con i token del corso. Le palette di sezione aggiornano i colori semantici sul canvas proprietario, anche per le slide inattive e i dialoghi.

Usare `btn` per azioni e navigazione, `join` per gruppi collegati, `card`/`card-body` per i componenti didattici esistenti, `table` per dati tabellari, `kbd` per scorciatoie, `stat` per valori e `modal`/`tooltip` per le interazioni condivise. Non sostituire il comportamento accessibile con la sola classe visiva: pulsanti disabilitati nativi, etichette dei controlli, focus visibile, Escape e ritorno del focus nei dialoghi. La composizione tipografica della slide resta affidata ai layout e token del deck.

Importare i capitoli con `src` e frontmatter Slidev; i nuovi contenuti locali dichiarano `localOnly: true`. Conservare gli alias esistenti. Non aggiungere note del relatore o modificare la configurazione del presenter: le note già autorizzate di Tipografia restano conservate. Animazioni soltanto nella slide attiva; rispettare movimento ridotto, scheda nascosta e stampa.

Le ruote di Colore animano gli SVG originali conservati: prima le tinte selezionate, poi i collegamenti; nel monocromatico seguono i campioni di saturazione e valore. La sequenza termina entro 2,2 secondi sul diagramma completo e si ripete con «Rianima», anche da tastiera. `LessonFigure` mantiene testo alternativo, didascalia e ingrandimento dell’originale. Movimento ridotto, stampa, slide inattiva, scheda nascosta e dialogo aperto fermano l’animazione. `pnpm check:color-wheels` verifica geometrie, colori, ripetizione, ingrandimento e i profili desktop, viewport stretto, stampa ed export Slidev.

I moduli 05–07 delle esercitazioni insegnano Tailwind CSS 4, daisyUI 5 e temi. La specifica dei contenuti e degli esempi è in `data/esercitazioni/framework-curriculum.mjs`; i nuovi testi riportano fonti ufficiali e non dichiarano pagine storiche. I risultati visivi sono documenti HTML effettivi tramite `ExerciseNative`, con altezza misurata sul contenuto, tema isolato, etichetta accessibile e controlli nativi; il codice usa `mockup-code`. I confronti responsive hanno due viewport reali. I 19 casi in `data/esercitazioni/worked-examples.mjs` affiancano a ogni concetto il codice esatto, il risultato nativo, cosa osservare e una modifica guidata; aggiungono 38 slide ai moduli 05–07. I reset del documento nativo appartengono al layer base, così utility e componenti possono determinare davvero tipografia, margini e colori dei link. Gli schemi delle altre esercitazioni usano i token della propria sezione. Solo slide attiva e stampa montano i documenti; il movimento si arresta anche con scheda nascosta o movimento ridotto. Escape chiude prima l’eventuale dialogo, poi restituisce il focus al canvas per proseguire con le frecce. Il dialogo si apre su richiesta e resta visibile in stampa. Il form annuncia la conferma locale dopo la validazione. La configurazione CSS mostrata condivide con gli esempi le coppie di colore corrette per il contrasto. Tre pagine di riferimenti usano liste daisyUI nella slide, con etichette e URL delle rispettive fonti e apertura in una nuova scheda. `data/esercitazioni/native-examples.mjs` conserva trascrizioni e ricostruzioni; `scripts/build/exercise-native.mjs` le applica alla specifica, mantenendo 534 slide. `scripts/build/framework-examples.mjs` rigenera HTML e CSS; i raster storici restano intatti nell’archivio. `pnpm check:exercise-native` verifica i 101 documenti HTML distinti, senza immagini raster, testo tagliato o scorrimento interno; `pnpm check:exercises` verifica anche le tre liste di risorse e le interazioni con il canvas.

## Originali, manutenzione e verifica

Gli originali Drive, il catalogo delle fonti e la corrispondenza fra pagine originali e nuove slide restano in `assets/esercitazioni/`; immagini pubblicabili separate dagli originali. Conservare attribuzioni e link della fonte. La pulizia elimina output riproducibili, metadati e cartelle vuote, proteggendo originali, licenze e rapporti referenziati. `pnpm clean --keep-dev` conserva il catalogo del server in uso; `--dry-run` mostra l’effetto previsto.

Per nuove slide eseguire `pnpm check:source` e `pnpm build`, più i controlli pertinenti di layout, tipografia, movimento, progressione e separazione dei deck. Verificare i nuovi layout su desktop, viewport stretto e stampa in un browser isolato; controllare l’indice locale e quello della build online, anche da tastiera. Aggiornare i conteggi soltanto per inserimenti intenzionali, mantenendo le verifiche di contenuto, asset e accessibilità. Rapporti e screenshot appartengono a `reports/`.

## Specifiche della lezione di Tipografia

Questo documento conserva le scelte della lezione Slidev 08. Il contratto editoriale del booklet resta in `DESIGN.md`; contenuti, fonti e corrispondenze delle slide sono in `docs/fonti/07-tipografia-griglie.md` e nei manifest degli asset.

## Composizione

La lezione riusa Slidev, daisyUI, i componenti e i token esistenti, nella palette sky/Ambra. Titoli ordinari nella posizione comune e corpo centrato nell’area sicura sopra il footer; copertina metro `ux-type` originale. Il titolo visibile e il footer sono «Tipografia», mentre gli identificatori tecnici `tipografia-griglie` restano stabili.

Le slide `typography-slide` riusano `lesson-columns`, con spiegazione a sinistra e galleria a destra. `typography-images` conserva le proporzioni dei campioni; `typography-images-stacked` dispone i confronti orizzontali in una colonna, senza deformarli. La didascalia comune segue il gruppo. `LessonFigure` offre l’ingrandimento condiviso; immagini e ingrandimenti restano senza cornici, ombre o angoli aggiunti. Campioni, opere e screenshot conservano forme e colori della fonte. Le regole condivise appartengono a `styles/lessons.css`.

Le tre card degli obiettivi usano lettera con lente, campioni di caratteri con selezione e libro con occhiali nella famiglia illustrativa sky/Ambra. Riutilizzano l’angolo illustrato da 96 px e lo spazio inferiore delle card a tre colonne. Prompt, PNG originali e WebP lossless sono in `assets/theme-imagegen/lesson-08-cards/manifest.json`.

Otto aperture `section-divider` riusano `chapter-slide` e `ChapterMetro`, con titolo, breve frase e numero di sezione. Omettono ribbon, footer e avanzamento. Entrano nella numerazione della lezione, hanno `sectionDivider: true` e `lessonMinutes: 0`; la numerazione del contenuto riprende nella slide successiva.

Nelle slide storiche 7–22, `LessonHistoryPeriod` mostra data o intervallo in alto a destra sotto il ribbon, con nome del periodo e Heroicon del libro aperto. Riusa `stat` daisyUI e i dati `data/typography-history-periods.json`. Il titolo conserva spazio per il richiamo; le date distinguono epoca, esempio e introduzione della tecnologia. Il richiamo resta visibile in stampa.

La slide 10 confronta due estratti impilati ed etichettati: gotico della Bibbia di Gutenberg e romano di Jenson. Il dettaglio gotico seleziona tre righe tramite viewport SVG sul JPEG originale Bayerische Staatsbibliothek / HUMI Project. Fonte, diritti Public Domain Mark 1.0 e coordinate restano in `assets/booklet/tipografia-gotico/`.

La slide 41 spiega i cinque assi registrati con coppie di contorni autentici di Roboto Serif, Roboto Flex e Nunito. Ogni coppia cambia un solo asse e mantiene il corpo visualizzato; `slnt` e `ital` restano distinti e `opsz` mostra il cambiamento del disegno. Etichette, valori e campioni appartengono a un’unica figura vettoriale con l’ingrandimento condiviso. Font originali, licenze, coordinate e generatore sono conservati in `assets/booklet/tipografia-assi-variabili/`.

Le slide 44–51 presentano la classificazione come osservazione di terminazioni, spessori e costruzione. Otto figure con campioni autentici mostrano la panoramica, i serif, Times/Georgia, gli slab, i sans, gli script, il gotico e una superfamiglia coordinata. I confronti mantengono testo e corpo; le lettere rilevanti sono ingrandite, con nomi e criteri accanto. Script e gotico hanno slide distinte. Le tre figure del booklet precedenti restano conservate come originali; i manifest in `assets/booklet/tipografia-classificazioni/` documentano font, licenze, istanze e nuove pubblicazioni. Le note mantengono i riferimenti storici e guidano la lettura dei campioni.

## Anteprime dei font

I nomi dei font aprono l’anteprima dalla parola stessa. Una sottolineatura tratteggiata da 1 px nel primario della lezione (`--section-primary`), con offset 0,16 em, li distingue dai link. Testo, metriche e possibilità di andare a capo restano quelli originali.

`data/font-previews.json` possiede nomi, alias e campioni; `SlideFont` mostra nome e «Tipografia» composta con contorni autentici. Quando il font non è disponibile, usa un campione documentario identificato, senza sostituirlo con una famiglia simile. Disegni storici, interpretazioni digitali e repertori come Fraktur e Antiqua hanno etichette pertinenti. Originali, fonti, versioni, hash, licenze e generatore restano in `assets/font-previews/`; i binari dei font commerciali installati non entrano nella distribuzione.

Il tooltip daisyUI bianco è teletrasportato fuori dal canvas scalato e contenuto nel viewport. Quando c’è spazio si apre sopra il nome, lasciando accessibili le righe successive. Si apre con puntatore, focus, tocco, Invio o Spazio; Escape lo chiude senza spostare il focus. Il puntatore può raggiungerlo. Font e acronimi condividono una sola anteprima aperta; cambio slide e stampa la chiudono. In stampa il nome torna testo semplice.

Il trasformatore annota soltanto nomi completi nel testo visibile. Conserva link, controlli, attributi, URL, codice, SVG e interpolazioni; i nomi personali completi restano testo ordinario. `data-no-font-previews` esclude gli omonimi. `AcronymText` applica lo stesso catalogo nei componenti. La build limita il catalogo ai nomi citati nella presentazione selezionata.

## Video e vista relatore

`LessonVideo` usa `data/lesson-videos.json`: player 16:9 largo 760 px, centrato senza cornice, titolo e autore con link diretto. L’iframe viene montato soltanto sulla slide attiva e visibile, senza autoplay; cambio slide, scheda nascosta e stampa lo rimuovono. La stampa conserva titolo e URL. Il video Linotype occupa la slide 16; i due minuti pianificati sono un budget didattico.

La vista relatore nativa di Slidev resta abilitata con `presenter: true`, barra strumenti nativa, slide corrente, successiva e timer. Tutte le 116 slide di Tipografia hanno note autorizzate: prosa semplice, parole chiave in grassetto e paragrafi brevi separati da una riga vuota. Le altre lezioni restano senza note.

## Percorso e pubblicazione

La lezione comprende 116 slide e 71,5 minuti pianificati, con un’attività di 10 minuti. Le 19 slide su griglie e interfacce e la slide sulle prove esplorative restano nei rispettivi archivi con note, mapping, fonti e asset. Le tavole autonome di Cereal e Netflix Sans non avevano slide dedicate; il confronto generale resta attivo.

Tipografia è disponibile in locale e online come presentazione autonoma. Il corso pubblica 720 slide e ne conserva 1330 in locale; le lezioni 09–10 e le nove esercitazioni restano `localOnly`. Immagini e font pubblici sono condivisi; la build conserva gli asset effettivamente citati e non precarica globalmente le immagini. Verificare sorgenti, build, indice, figure, tooltip, vista relatore, viewport stretto e stampa attraverso un’anteprima isolata.
