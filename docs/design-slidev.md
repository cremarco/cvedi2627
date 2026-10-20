# Regole delle slide di Tipografia

Questo documento conserva le scelte della lezione Slidev 08. Il contratto editoriale del booklet resta in `DESIGN.md`; contenuti, fonti e corrispondenze delle slide sono in `docs/fonti/07-tipografia-griglie.md` e nei manifest degli asset.

## Composizione

La lezione riusa Slidev, daisyUI, i componenti e i token esistenti, nella palette sky/Ambra. Titoli ordinari nella posizione comune e corpo centrato nell’area sicura sopra il footer; copertina metro `ux-type` originale. Il titolo visibile e il footer sono «Tipografia», mentre gli identificatori tecnici `tipografia-griglie` restano stabili.

Le slide `typography-slide` riusano `lesson-columns`, con spiegazione a sinistra e galleria a destra. `typography-images` conserva le proporzioni dei campioni; `typography-images-stacked` dispone i confronti orizzontali in una colonna, senza deformarli. La didascalia comune segue il gruppo. `LessonFigure` offre l’ingrandimento condiviso; immagini e ingrandimenti restano senza cornici, ombre o angoli aggiunti. Campioni, opere e screenshot conservano forme e colori della fonte. Le regole condivise appartengono a `styles/lessons.css`.

Le tre card degli obiettivi usano lettera con lente, campioni di caratteri con selezione e libro con occhiali nella famiglia illustrativa sky/Ambra. Riutilizzano l’angolo illustrato da 96 px e lo spazio inferiore delle card a tre colonne. Prompt, PNG originali e WebP lossless sono in `assets/theme-imagegen/lesson-08-cards/manifest.json`.

Otto aperture `section-divider` riusano `chapter-slide` e `ChapterMetro`, con titolo, breve frase e numero di sezione. Omettono ribbon, footer e avanzamento. Entrano nella numerazione della lezione, hanno `sectionDivider: true` e `lessonMinutes: 0`; la numerazione del contenuto riprende nella slide successiva.

Nelle slide storiche 7–22, `LessonHistoryPeriod` mostra data o intervallo in alto a destra sotto il ribbon, con nome del periodo e Heroicon del libro aperto. Riusa `stat` daisyUI e i dati `data/typography-history-periods.json`. Il titolo conserva spazio per il richiamo; le date distinguono epoca, esempio e introduzione della tecnologia. Il richiamo resta visibile in stampa.

La slide 10 confronta due estratti impilati ed etichettati: gotico della Bibbia di Gutenberg e romano di Jenson. Il dettaglio gotico seleziona tre righe tramite viewport SVG sul JPEG originale Bayerische Staatsbibliothek / HUMI Project. Fonte, diritti Public Domain Mark 1.0 e coordinate restano in `assets/booklet/tipografia-gotico/`.

## Anteprime dei font

I nomi dei font aprono l’anteprima dalla parola stessa. Una sottolineatura tratteggiata da 1 px nel primario della lezione (`--section-primary`), con offset 0,16 em, li distingue dai link. Testo, metriche e possibilità di andare a capo restano quelli originali.

`data/font-previews.json` possiede nomi, alias e campioni; `SlideFont` mostra nome e «Tipografia» composta con contorni autentici. Quando il font non è disponibile, usa un campione documentario identificato, senza sostituirlo con una famiglia simile. Disegni storici, interpretazioni digitali e repertori come Fraktur e Antiqua hanno etichette pertinenti. Originali, fonti, versioni, hash, licenze e generatore restano in `assets/font-previews/`; i binari dei font commerciali installati non entrano nella distribuzione.

Il tooltip daisyUI bianco è teletrasportato fuori dal canvas scalato e contenuto nel viewport. Quando c’è spazio si apre sopra il nome, lasciando accessibili le righe successive. Si apre con puntatore, focus, tocco, Invio o Spazio; Escape lo chiude senza spostare il focus. Il puntatore può raggiungerlo. Font e acronimi condividono una sola anteprima aperta; cambio slide e stampa la chiudono. In stampa il nome torna testo semplice.

Il trasformatore annota soltanto nomi completi nel testo visibile. Conserva link, controlli, attributi, URL, codice, SVG e interpolazioni; i nomi personali completi restano testo ordinario. `data-no-font-previews` esclude gli omonimi. `AcronymText` applica lo stesso catalogo nei componenti. La build limita il catalogo ai nomi citati nella presentazione selezionata.

## Video e vista relatore

`LessonVideo` usa `data/lesson-videos.json`: player 16:9 largo 760 px, centrato senza cornice, titolo e autore con link diretto. L’iframe viene montato soltanto sulla slide attiva e visibile, senza autoplay; cambio slide, scheda nascosta e stampa lo rimuovono. La stampa conserva titolo e URL. Il video Linotype occupa la slide 16; i due minuti pianificati sono un budget didattico.

La vista relatore nativa di Slidev resta abilitata con `presenter: true`, barra strumenti nativa, slide corrente, successiva e timer. Tutte le 114 slide di Tipografia hanno note autorizzate: prosa semplice, parole chiave in grassetto e paragrafi brevi separati da una riga vuota. Le altre lezioni restano senza note.

## Percorso e pubblicazione

La lezione comprende 114 slide e 69,5 minuti pianificati, con un’attività di 10 minuti. Le 19 slide su griglie e interfacce e la slide sulle prove esplorative restano nei rispettivi archivi con note, mapping, fonti e asset. Le tavole autonome di Cereal e Netflix Sans non avevano slide dedicate; il confronto generale resta attivo.

Tipografia è disponibile in locale e online come presentazione autonoma. Il corso pubblica 717 slide e ne conserva 793 in locale; soltanto le lezioni 09–10 restano `localOnly`. Immagini e font pubblici sono condivisi; la build conserva gli asset effettivamente citati e non precarica globalmente le immagini. Verificare sorgenti, build, indice, figure, tooltip, vista relatore, viewport stretto e stampa attraverso un’anteprima isolata.
