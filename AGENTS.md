# Lavorare su CVeDI

## Prima delle modifiche

Il repository contiene cinque progetti in `progetti/`; consultare [la struttura](docs/struttura-progetto.md). Gli asset esclusivi e gli script specifici stanno nel rispettivo progetto; immagini, font, dati, metro e token comuni stanno in `risorse-condivise/`. `risorse-condivise/stili/tokens.css` è la sorgente condivisa di home e slide. Eseguire i comandi `pnpm` dalla radice.

Leggere `PRODUCT.md` prima di creare o modificare contenuti, componenti, immagini o stili. Per le slide leggere anche [il contratto visivo](progetti/slide/docs/slidev/design.md), ricavato dalle lezioni 01–08, e [la guida operativa dei set](progetti/slide/docs/design-slidev.md). Per il booklet leggere anche `progetti/booklet/DESIGN.md`: è il contratto editoriale esclusivo del booklet, non delle slide o del sito. Le istruzioni esplicite dell’utente hanno precedenza; un cambiamento intenzionale del sistema del booklet aggiorna anche il documento.

Per scrivere o impaginare i prossimi capitoli del booklet, applicare anche la sezione «Regole editoriali per i prossimi capitoli» di `progetti/booklet/DESIGN.md`, ricavata dai commenti Figma. Verificare insieme prosa, esempi, didascalie, fonti, ordine delle colonne e doppie pagine; una correzione ricorrente richiede un controllo dell’intero capitolo.

## Vincoli

- Conservare contenuti e attribuzioni salvo richiesta esplicita di revisione.
- Nel booklet mantenere la sitografia nei footnote della pagina pertinente e la bibliografia in una sezione intitolata «Bibliografia» alla fine di ogni capitolo. Conservare questa separazione anche durante ricerche, verifiche delle fonti e uso di skill bibliografiche.
- I richiami alle note esplicative e sitografiche sono soltanto numeri in apice. Le fonti bibliografiche (articoli, libri, atti di convegno, rapporti e altre pubblicazioni) usano citazioni autore–anno e bibliografia APA. Se una fonte ha sia una citazione bibliografica sia un sito di consultazione in nota, mantenere entrambi: l’URL non rende superfluo il richiamo APA. Non aggiungere una citazione autore–anno a una nota soltanto perché contiene un URL.
- Verificare il ruolo delle fonti in `progetti/booklet/bibliografia/ruoli-fonti.json`: i semplici siti restano soltanto nelle note e non devono avere neppure `cite(form: none)`, che li inserirebbe nella bibliografia. La presenza di metadati in un file `.bib` o `.yml` non rende una pagina web una pubblicazione. Articoli online, standard e documenti pubblicati si distinguono da homepage, FAQ, schede di catalogo e pagine di consultazione. `pnpm check:booklet` controlla questa separazione e la presenza degli URL nelle note del capitolo pertinente.
- Sulla stessa pagina un URL deve comparire in una sola voce di nota. Unire eventuali note sovrapposte conservando spiegazioni e collegamenti distinti; gli altri richiami riutilizzano il numero della nota tramite `footnote(<etichetta>)`, senza numeri scritti a mano. Ricontrollare dopo la ricomposizione: la verifica CLI rileva URL ripetuti in voci diverse della stessa pagina. Query e ancore diverse restano destinazioni distinte. Ogni richiamo, anche ripetuto, deve avere la propria voce sulla stessa pagina fisica. Se l’URL ricompare su un’altra pagina, creare una nuova nota locale con un nuovo numero; riutilizzare l’etichetta soltanto nei richiami della medesima pagina.
- Nel booklet omettere i rimandi ai materiali di preparazione editoriale: vecchi booklet, presentazioni, approfondimenti e slide. La regola vale per testo, caption e diritti, note, citazioni visibili o invisibili e bibliografie; conservare provenienza e originali nei manifest locali, insieme alle attribuzioni delle opere.
- Per le slide riutilizzare Slidev, daisyUI, componenti e token esistenti; nel booklet usare i componenti Figma del sistema editoriale. Mantenere la separazione fra contenuti, dati e presentazione.
- Per le slide: titoli ordinari nella posizione comune e corpo centrato; copertine metro originali e palette del set.
- Nel deck Slidev non aggiungere note del relatore né riattivare presenter, terza lezione o voci future dell’indice senza richiesta.
- Immagini senza cornici; nelle slide presentare gli esempi didattici attraverso immagini e ingrandimento condiviso.
- Nel booklet, per creare o rifare illustrazioni di utenti in qualsiasi capitolo, usare lo stile Persona Spectrum approvato: teste senza lineamenti, contorni neri uniformi, forme essenziali e accento del capitolo. Conservare azioni, posture e ausili; riferimento e regola completa sono in `progetti/booklet/DESIGN.md`, sezione «Immagini e scala».
- Conservare originali, fonti e licenze degli asset attivi. Non modificare i file CSS compilati manualmente.

## Verifica e documentazione

Non aprire PDF del booklet nella preview di Codex, compresi i PDF dei singoli capitoli: possono provocare il crash dell'app. Il divieto riguarda anche `open_in_codex`, allegati e direttive `codex-file-citation`, anteprime automatiche e copie rinominate del volume. Non allegare né creare collegamenti cliccabili al PDF nelle risposte: indicarne il percorso come codice, per la consultazione in un lettore esterno. Compilare e verificare i PDF soltanto tramite CLI.

Per l'ispezione visiva usare `pnpm preview:booklet --pages 8-9` sul PDF già compilato, eventualmente con `--target NOME`: richiede pagine fisiche esplicite, ne accetta al massimo otto e produce soltanto PNG a lato lungo massimo 1600 px in `progetti/booklet/build/anteprime-ispezione/`. Aprire o mostrare soltanto i PNG richiesti, senza caricare in blocco la cartella. Se il PDF non è aggiornato, compilare prima il target pertinente. L'anteprima non ricompila né sostituisce i controlli editoriali.

Il hook di progetto `.codex/hooks.json` blocca preventivamente `open_in_codex` sui PDF del booklet e, in questo progetto, sui PDF da almeno 20 MiB. Non disabilitarlo né aggirarlo cambiando nome, percorso o strumento. La sua attivazione iniziale richiede la revisione in `/hooks` nel Codex CLI; prima della fiducia valgono comunque tutte le regole qui sopra. Le schede PDF già salvate non passano dal hook: chiuderle prima di riaprire la chat, usando se necessario il ripristino ad app chiusa già predisposto.

Per nuove slide eseguire `pnpm check:source` e `pnpm build`; scegliere i controlli browser pertinenti fra `check`, `check:layout`, `check:motion`, `check:progress` e `check:typography`. Verificare i nuovi layout su desktop, viewport stretto e stampa, con un’anteprima isolata dalle schede dell’utente.

Aggiornare i conteggi strutturali solo per inserimenti intenzionali, conservando le verifiche di contenuto, asset e accessibilità. Tenere rapporti e screenshot in `reports/` o in una cartella temporanea, senza ricreare documentazione cronologica duplicata.
