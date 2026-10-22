# Design del booklet CVeDI

## Ambito e riferimenti

Questo documento definisce il sistema editoriale del **booklet**, per i prossimi capitoli e le revisioni richieste. Non disciplina le slide, il sito del corso o gli esempi web autonomi.

Il riferimento operativo è il [sistema editoriale Figma](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC/Booklet?node-id=4286-534), aggiornato sulla base della Page [101 · Tipografia · Nuovo design](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC/Booklet?node-id=4226-16023). Le regole combinano i componenti e le misure osservati con i commenti di Marco Cremaschi e le sue risposte esplicite. Le istruzioni dell’utente prevalgono; una modifica intenzionale al sistema aggiorna Figma e questo documento insieme. Le regole non ancora definite vanno chiarite prima di introdurle nel contratto.

Le descrizioni e i conteggi degli snapshot precedenti documentano le rispettive revisioni. Non sostituiscono queste regole né attestano che tutte le pagine esistenti siano già state adeguate. Folio, progressivi delle figure e colore del capitolo di Tipografia non diventano valori universali per gli altri capitoli.

## Formato e gabbia

Le quote native Figma riportate qui corrispondono ai punti del documento di stampa. Mantenere le misure senza scalarle arbitrariamente durante esportazione e impaginazione.

| Elemento | Misura |
| --- | --- |
| Pagina | 170 × 240 mm · 481,89 × 680,315 pt |
| Doppia pagina | 340 × 240 mm |
| Colonne | Due da 66 mm · 187,09 pt |
| Intercolonna | 5 mm · 14,17 pt |
| Larghezza della gabbia | 388,35 pt |
| Margine esterno e superiore | 15 mm · 42,52 pt |
| Margine interno | 18 mm · 51,02 pt |
| Area ordinaria di lettura | Da y 42,52 a y 623,62 · altezza 581,10 pt |
| Fascia del folio | Da y 639,465 a y 661,465 pt |

Le pagine SX e DX hanno margini speculari. Sulla pagina sinistra la gabbia comincia a x 42,52; sulla destra a x 51,02. Il margine inferiore della gabbia è circa 20 mm; resta separato dalla posizione del folio.

Usare le griglie condivise `Booklet / Teston / Gabbia / Sinistra` e `Destra`. Le dodici guide native per pagina comprendono bordi, margini, colonne, inizio e fine della gabbia e fascia del folio. Sono strumenti non stampabili: non simulare le guide con linee visibili nel PDF.

## Tipografia

Sora governa aperture e sezioni; DM Sans governa lettura, sottoparagrafi, didascalie e apparati. I font usati negli esempi sono contenuto didattico e conservano il proprio disegno.

| Ruolo | Famiglia e peso | Corpo / interlinea |
| --- | --- | --- |
| Apertura | Sora Bold · 700 | 47 / 42 pt |
| Numero monumentale | Sora Bold · 700 | 440 / 440 pt |
| Codice della sezione | Sora ExtraBold · 800 | 100 / 100 pt |
| Titolo della sezione | Sora ExtraBold · 800 | 20 / 20 pt |
| Lead | DM Sans Regular · 400 | 15 / 21 pt |
| Corpo | DM Sans Regular · 400 · opsz 18 | 12 / 14 pt |
| Enfasi del corpo | DM Sans Bold · 700 · opsz 14 | 12 / 14 pt |
| Sottoparagrafo | DM Sans Black · 900 · opsz 14 | 14 / 14 pt |
| Didascalia | DM Sans Light · 300 · opsz 9 | 9 / 10,8 pt |
| Prefisso e numero della figura | DM Sans Medium · 500 · opsz 14 | 9 / 10,8 pt |
| Diritti dell’immagine | DM Sans Italic · 400 · opsz 9 | 8 / 10 pt |
| Folio | DM Sans Medium · 500 · opsz 14 | 12 / 14 pt |
| Bibliografia | DM Sans Regular · 400 · opsz 9 | 8 / 10 pt |
| Note Typst | DM Sans Regular · 400 | 7,5 / 9 pt |
| URL nelle note Typst | DM Sans Regular · 400 | 7 / 8,5 pt |

Il corpo del booklet Typst è **giustificato**, con lingua italiana e sillabazione automatica, su richiesta esplicita dell’utente. Questo aggiornamento supera la precedente bandiera sinistra del modello Figma per la nuova impaginazione. Conservare la dimensione ottica e il peso effettivi: il nome «9pt Regular» di un font o subset storico non definisce da solo il corpo o l’asse ottico da applicare.

Il testo discorsivo usa uno spazio fra paragrafi di 10 pt. I sottoparagrafi occupano una colonna da 187,09 pt e distano 4 pt dal contenuto seguente. I titoli crescono in altezza con il testo; non comprimere i caratteri per farli entrare.

Usare il grassetto per enfasi semantiche mirate. I nomi propri di persona nella prosa vanno in corsivo. I titoli delle opere usano corsivo o virgolette, con un criterio coerente. Conservare corsivi, simboli e notazioni pertinenti, come *em*, senza estendere accidentalmente l’enfasi ad articoli o parole adiacenti.

## Colori

La carta è bianca `#FFFFFF`; l’inchiostro ordinario è `#2E3138`. L’accento appartiene al capitolo e va gestito attraverso le variabili condivise, mantenendo coerenti titoli, codici, folio e altri elementi editoriali che svolgono lo stesso ruolo.

Nel capitolo di Tipografia l’accento è `#AFC7E8`, controllato da `capitolo/tipografia/colore` nelle collezioni `Booklet / Teston / Primitivi` ed `Editoriale`. L’alias semantico collega i componenti al primitivo. La guida conserva anche le altre tinte disponibili: la loro presenza non assegna automaticamente una palette a un nuovo capitolo.

Conservare il blu funzionale dei collegamenti dove previsto. La prosa mantiene il colore dell’inchiostro; l’accento non colora automaticamente interi paragrafi. Fotografie, opere, marchi e screenshot documentari conservano i colori originali.

## Regole editoriali per i prossimi capitoli

### Struttura e ordine di lettura

Nel modello Figma ogni **sezione principale**, per esempio 9.1, comincia su una pagina nuova. Nella nuova edizione **Typst**, su richiesta dell’utente di evitare colonne vuote, sezioni e sottoparagrafi proseguono nel flusso delle due colonne, senza un salto obbligatorio prima del titolo. Il titolo resta associato al primo passaggio che introduce, senza lasciarlo isolato al fondo di una colonna.

Si legge tutta la colonna sinistra dall’alto al basso, poi la destra e infine la pagina successiva. Un sottotitolo non riavvia una coppia di colonne parallele. Le continuazioni devono essere riconoscibili, senza frammenti sospesi o salti ambigui fra pagine lontane.

Comporre insieme prosa, immagini e didascalie. Distribuire il contenuto fra pagine contigue, conservando margini e ritmo: evitare grandi vuoti accidentali e spazi dilatati per riempire il foglio. Il bianco intenzionale di un’opera o di un’apertura mantiene la propria funzione.

I codici dei sottoparagrafi seguono la struttura del capitolo, come `9.1.1.`; il progressivo riparte nella sezione pertinente. Tenere codice e formulazione separati nei dati quando possibile. Aggiornare indice, folio, progressivi delle figure e collegamenti dopo inserimenti o riordini.

### Prosa ed esempi

Scrivere testi chiari, concreti e discorsivi, collegando ogni passaggio al suo contesto. Spiegare termini specialistici e acronimi necessari alla comprensione. Evitare frasi banali, riferimenti senza antecedente, formulazioni meccaniche e ripetizioni. Una spiegazione accessoria può stare in nota quando interromperebbe il ragionamento.

Accompagnare i concetti visivi con esempi osservabili e spiegare che cosa guardare. Quando si discute un’opera, mostrarne l’immagine nel punto pertinente. Nei casi reali descrivere scelte concrete, con riferimenti recuperabili; le applicazioni web e ai videogiochi devono avere uno sviluppo coerente con l’argomento del capitolo.

Verificare la correttezza di disegni, campioni, spiegazioni e studi citati. Distinguere ciò che un’immagine mostra dalle interpretazioni e dagli effetti che richiedono ulteriori verifiche. Il lettore deve poter recuperare gli studi e le fonti richiamati.

Le etichette degli esempi costruiti per il booklet sono in italiano. Gli artefatti documentari conservano il contenuto originale; eventuali traduzioni e spiegazioni restano testo editoriale distinto.

### Immagini e scala

Scegliere dimensioni e formato in base al contenuto e alla leggibilità del dettaglio utile: una colonna, affiancamenti, gabbia intera, immagine al vivo o doppia pagina. **L’obbligo di uniformare la grandezza degli esempi riguarda soltanto il capitolo di Tipografia.** Negli altri capitoli non imporre una larghezza o una scala unica a tutte le immagini.

Collocare le immagini accanto al passaggio che le spiega, prima che il discorso cambi soggetto. Se il dettaglio analizzato è troppo piccolo, conservare la vista complessiva e affiancare o aggiungere un ingrandimento pertinente. Usare originali nitidi, proporzioni corrette e ritagli intenzionali; non tagliare etichette o parti necessarie alla spiegazione.

Le immagini non ricevono cornici, ombre o angoli decorativi aggiunti. I segni interni a un’opera, a un diagramma o a un controllo illustrato appartengono al contenuto e mantengono la propria funzione.

Gli esempi costruiti ad hoc possono usare immagini generate quando chiariscono il concetto. Le immagini documentarie conservano la propria fonte e identità; le ricostruzioni non devono apparire come documenti originali. Omettere dalle didascalie formule di produzione come «illustrazione didattica originale» e nomi dei generatori. Originali, prompt e provenienza tecnica restano nei manifest locali.

### Sagome e doppie pagine

Il testo può seguire la sagoma delle immagini scontornate nelle composizioni che lo richiedono, mantenendo l’ordine sinistra–destra. Conservare il distacco nominale di 8 pt e, nelle composizioni sagomate del modello, una giustezza minima di 108 pt. Modificare testo o sagoma richiede una nuova ricomposizione delle righe.

Una figura sul dorso è una composizione unica: le due metà hanno la stessa scala, la stessa quota e pagine realmente affiancate nella sequenza di stampa. Verificare parità SX/DX dopo ogni riordino. Quando necessario, inserire una pagina pertinente di esempi per ripristinare l’accoppiamento, conservando i contenuti e aggiornando i rimandi. Una sola figura distribuita su due pagine mantiene una didascalia comune riconoscibile.

Per il **Duomo di Firenze** l’utente ha richiesto la composizione sul dorso, allineata al bordo inferiore del foglio come in Figma. Ha confermato un’eccezione limitata alle due pagine della figura: le note occupano le sole **colonne esterne da 66 mm**, nella fascia inferiore di 35 mm, per lasciare libere le metà interne attraversate dall’immagine. La figura conserva una sola didascalia sulla pagina sinistra. Le altre pagine mantengono le note a tutta gabbia.

### Didascalie e diritti

La didascalia identifica il soggetto e spiega il dettaglio osservabile utile al discorso. Resta vicina alla visuale, con distacco ordinario di 8 pt, e si distingue dalla prosa attraverso il ruolo tipografico 9/10,8. Nei confronti affiancati allineare immagini e inizio delle caption quando la composizione lo consente.

Il prefisso «Figura» e il relativo numero usano il ruolo Medium; la spiegazione usa Light. Conservare nomi, numeri e punteggiatura coerenti. Ogni richiamo numerato nella prosa ha un collegamento nativo alla figura corretta, da verificare dopo ogni riordino.

I **diritti sono un blocco separato dalla spiegazione**, in DM Sans Italic **8/10 pt**. Indicare il titolare e le condizioni disponibili nella fonte verificata. Autore dell’opera, ente che conserva l’immagine, sito di provenienza e titolare dei diritti possono essere diversi: non inventare attribuzioni né considerarli automaticamente equivalenti.

Il testo destinato al lettore omette riferimenti al corso, agli elaborati degli studenti, al vecchio manuale e alle operazioni di recupero o revisione degli asset. Conservare nei registri locali provenienza, edizioni, date e informazioni tecniche; mantenere le attribuzioni delle opere e le informazioni necessarie a interpretare un esempio simulato o una versione storica.

### Bibliografia, note e collegamenti

Ogni capitolo termina con una bibliografia in **APA 7**, con citazioni autore–anno nel testo e riferimenti in ordine alfabetico. I riferimenti completi e recuperabili sono impaginati **a larghezza della gabbia**, in DM Sans Regular 400, opsz 9, corpo 8/10 pt a bandiera sinistra. DOI e URL bibliografici previsti da APA restano nel riferimento; i link di consultazione sono distinti e vanno nelle note. La bibliografia non segue le due colonne del corpo e non diventa un elenco di siti.

Gli URL di consultazione stanno nelle **note al piede della pagina pertinente**, con link attivi e richiami numerici in apice. Nella nuova edizione Typst usare note 7,5/9 pt e URL 7/8,5 pt, misure confermate dall’utente; le misure Figma precedenti erano rispettivamente 8/10 e 7/9 pt. Ogni nota deve avere il proprio richiamo e ogni richiamo la propria nota; dopo spostamenti o eliminazioni verificare numerazione e corrispondenza.

La nota può adottare una variante breve: autore e anno, oppure autore e istituzione, nelle misure delle note approvate, affiancati all’URL sulla stessa riga. La citazione integrale resta in bibliografia. Allineare coerentemente le righe e adattare le giustezze ai contenuti, senza imporre una ripartizione fissa della larghezza.

Riservare alle note lo spazio necessario e ricomporre il corpo sopra di esse, senza sovrapposizioni al folio. Fra le voci consecutive usare un distacco di 3,5 pt, conservando l’interlinea effettiva di 9 pt e la fascia approvata di 35 mm. Affiancare ai titoli dei criteri normativi codice e collegamento alla fonte ufficiale, con il riferimento pertinente anche in nota.

## Componenti e modalità di lavoro

Usare frame di pagina ordinari e **componenti granulari collegati**: corpo, titoli, sezioni, immagini, didascalie, diritti, note, folio e indice. Non creare componenti di pagina intera. I contenitori correlati usano auto-layout; testi e righe seguono il contenuto senza altezza fissa che li tagli.

Per cambiare la grafica usare `Go to main component`; per cambiare il contenuto usare le proprietà delle istanze e i segmenti di testo. Conservare enfasi, corsivi, link e ordine di lettura. Non sostituire un testo ricco con un’unica proprietà piatta che cancelli la formattazione.

| Famiglia riutilizzabile | Funzione |
| --- | --- |
| `Booklet / Teston / Componenti / Testo discorsivo` | Modello Figma 12/14 a bandiera sinistra; nuovo Typst giustificato |
| `Sezione` e `Sottotitolo di lettura / Colonna` | Apertura della sezione e sottoparagrafi nel flusso |
| `Didascalia / Colonna` e `Didascalia / Gabbia` | Caption alla larghezza pertinente |
| `Diritti` | Credito dei diritti separato, corsivo 8/10 |
| `Riferimento bibliografico / Gabbia` | Bibliografia a larghezza 388,35 pt |
| `Note` | Apparato al piede con testi e collegamenti nativi |
| `Folio tre cifre / SX` e `DX` | Numero centrato in rettangolo 32 × 22 pt |

I nomi abbreviati nella tabella appartengono alla stessa famiglia `Booklet / Teston / Componenti`. Il componente Diritti può adattarsi alla larghezza della figura; lo spazio aggiuntivo entra nel calcolo dell’altezza complessiva della composizione.

Il folio ha padding di 4 pt, numero centrato e tracking 0, senza contorno o filetto. Il rettangolo usa l’accento del capitolo. L’indice usa titolo Sora Bold 35 pt, codice principale Sora ExtraBold 30 pt, voce principale DM Sans SemiBold 16/20 e sottovoci 14/16,8 con rientro di 12 pt; i numeri di pagina sono allineati a destra e collegati alle aperture.

Conservare originali, file font, fonti, licenze, trasparenze e ritagli documentati. I campioni di font identificati usano glifi autentici; deformazioni geometriche e vere varianti del font devono restare distinguibili. La provenienza degli asset e gli archivi non devono interrompere il percorso visibile del lettore.

## Verifica prima della consegna

Controllare l’intero capitolo in ordine di lettura, comprese le doppie pagine, alla dimensione di lettura e nel PDF di stampa. La verifica comprende:

- Chiarezza, continuità e completezza di prosa ed esempi; assenza di duplicati.
- Coerenza di font, pesi, corpi, allineamenti, colori e gabbia.
- Dimensioni e nitidezza delle immagini, ritagli, sagome e continuità delle figure sul dorso.
- Vicinanza di figure, caption e diritti; assenza di sovrapposizioni o tagli.
- Folio, indice, progressivi delle figure, richiami, note e destinazioni dei link.
- Conservazione di contenuti, originali, attribuzioni e licenze.
- Assenza di guide e copie di archivio nell’esportazione.

Una segnalazione ricorrente richiede un controllo di tutte le occorrenze nel capitolo e dei relativi componenti condivisi. Le richieste puntuali di eliminazione o sostituzione restano legate al proprio bersaglio: non autorizzano a rimuovere contenuti analoghi altrove.

Conservare rapporti e screenshot in `reports/`. La ricognizione dei 115 commenti dell’utente, le decisioni confermate e il controllo del sistema aggiornato sono registrati in `reports/booklet-design-system/regole.json` e `verifica.json`. I manifest di `assets/booklet/tipografia-nuovo-design/` conservano fonti e geometrie delle revisioni precedenti.


## Trasposizione in Typst · campione in valutazione

Il sorgente `typst-booklet/main.typ` legge `typst-booklet/piano.json`, che definisce le sole sei lezioni richieste, numerate **01–06**, con titoli, file, fonti e stato dell’importazione. I testi restano in file distinti per capitolo; le fonti native Hayagriva `.yml` o BibLaTeX `.bib` sono separate. I numeri 03–08 delle lezioni Slidev, i codici dei capitoli Figma e i loro folio identificano le fonti; non stabiliscono la numerazione del nuovo volume.

I contenuti delle sei lezioni sono inclusi nel volume. Tipografia comprende le sezioni 6.1–6.9 fino alla tavola corrente 490 e resta nello stato `in-revisione`, con scelte editoriali e verifiche globali ancora aperte. Colore conserva la variante di gabbia approvata. Gli inserti dei capitoli 02–04 sono verificati dopo la richiesta di conservarne il formato a pagina intera. Il documento include soltanto i file disponibili, senza pagine vuote per quelli in preparazione. Introduzione, Processo UX, Define, Linguaggio visivo, Gerarchia visiva e Griglia sono esclusi dal piano. Le prove di Introduzione e Griglia, con le rispettive fonti, sono conservate in `typst-booklet/esperimenti/capitoli-esclusi/`.

L’impaginazione usa pagine e colonne native, testo continuo, numerazione automatica e bibliografia nativa per capitolo. Le sagome usano Meander ufficiale 0.4.4 soltanto nella regione della figura e un profilo ricavato dall’alpha dell’asset; il testo successivo non ha limiti di pagina. Non importare il concept metro o coordinate delle righe Figma. Ogni capitolo è seguito da una pagina Appunti. Il codice del progetto ha commenti in italiano.

Diritti e contatto appartengono una sola volta agli apparati del volume. Il blocco dell’avviso, con il riferimento normativo, è allineato al fondo della gabbia della pagina dei crediti, nel rispetto del margine inferiore. Le figure con etichette minute usano il posizionamento mobile nativo a gabbia intera, senza imporre pagine alla prosa.

Storia del design conserva il percorso della fonte corrente, dalle origini agli scenari delle interfacce, con bibliografia APA di capitolo. L’atlante distingue gli esempi documentari dalle varianti del bar immaginario Caffè TTC. La miniatura del Khamsa conserva l’identificazione curatoriale del Dallas Museum e omette l’attribuzione a Shiraz, su conferma dell’utente.

Gli asset attivi condivisi con le slide sono in `assets/images/figure/<tema>/`, con nomi descrittivi e manifest di provenienza; font e OFL in `assets/fonts/editoriali/`. Il mirror web `public/images/shared/` è generato e ignorato da Git. Conservare gli originali delle importazioni precedenti durante la migrazione.

Noto Sans JP completa gli script assenti nei font editoriali, a partire dai caratteri giapponesi del glossario ukiyo-e. Noto Sans SC completa i caratteri cinesi assenti anche nel font JP, come 劳 nel nome 麦当劳. Sono fallback locali con licenza OFL: prosa latina e titoli mantengono rispettivamente DM Sans e Sora.

Gli esempi del bar si chiamano **Caffè TTC**. Su richiesta dell’utente usano schermate reali del sito locale, ciascuna su una pagina dedicata di 170 × 240 mm, a pieno formato e senza tab Design, selettore dello stile, folio o didascalie sovrapposte. Il viewport ha lo stesso rapporto del foglio: non ritagliare né deformare la cattura per riempirlo. Didascalia, richiamo e URL appartengono al testo che precede la schermata. Questi inserti riguardano soltanto le immagini richieste; la prosa continua a essere composta automaticamente. Le visuali precedenti di Caffè Luce restano in archivio. Per la sezione sulle risorse l’utente ha scelto la variante TTC «Primissimo web», senza immagini, accanto al caso documentato di Low-tech Magazine.

La cartella `typst-booklet/` separa `apparati/`, `capitoli/`, `bibliografia/`, `template/`, `anteprime/`, `scripts/`, `esperimenti/` e `build/`. Le composizioni delle aperture sono raccolte in `template/aperture/`; i dati alpha derivati stanno in `assets/dati/sagome/`. L’archivio delle prove grafiche è in `assets/archivio/typst/`, distinto dagli asset attivi. Le copie esattamente identiche di immagini, font e licenze sono consolidate nell’originale condiviso, conservando vecchi percorsi e hash nel manifest d’archivio.

Gli ingressi dei sei capitoli assemblano moduli per argomento; le regole di pagina che condividono una sequenza rimangono nello stesso ambito. `template/pagine.typ` raccoglie i contenitori documentari, al vivo e Appunti; `figure.typ` compone le figure e misura gli inserti; `editoriale.typ` conserva i ruoli granulari; `profili.typ` valida e legge le sagome per entrambi i motori di flusso. Il riuso dei componenti conserva gabbia, contenuti e impaginazione; la guida operativa e la scelta dei componenti sono in `typst-booklet/README.md`. Compilazione e verifiche sono organizzate nei moduli di `scripts/booklet/`, con gli ingressi pubblici invariati.

Le aperture sono **grafiche flat SVG a tutta pagina**. La biblioteca approvata conserva dodici motivi con i rispettivi colori [Tailwind](https://tailwindcss.com/docs/colors), tonalità 300. Il piano attivo seleziona sei temi originali senza riassegnarne tinte o motivi: `numero` e `codice` indicano il nuovo capitolo, mentre `apertura_originale` identifica la grafica nel manifest. Questa distinzione vale per la nuova edizione Typst e non modifica i frame Figma.

| Codice e capitolo | Lezione Slidev | Tema originale | Palette conservata | Stato |
| --- | --- | --- | --- | --- |
| 01 · Storia del design | 03 | 2 | orange 300 · `#FFB86A` | Completo |
| 02 · Ricerca, contesto e inclusione | 04 | 4 | yellow 300 · `#FFDF20` | Completo |
| 03 · Accessibilità e design inclusivo | 05 | 5 | lime 300 · `#BBF451` | Completo |
| 04 · Gestalt | 06 | 7 | emerald 300 · `#5EE9B5` | Completo |
| 05 · Colore e significato | 07 | 10 | sky 300 · `#74D4FF` | Completo |
| 06 · Tipografia | 08 | 11 | blue 300 · `#8EC5FF` | In revisione |

Il manifest `assets/images/aperture/manifest.json` conserva i valori OKLCH ufficiali e gli equivalenti esadecimali convertiti con Typst. Ogni tema mantiene **composizione, scala, peso e spaziatura di titolo e numero** approvati; il titolo e il nuovo codice 01–06 restano testo nativo modificabile. L’API `apertura(numero: ..., tema: ...)` separa il numero corrente dall’identità grafica originale. Sora rimane la famiglia comune, con heading nativi per indice e segnalibri. Le varianti riguardano soltanto le aperture, senza alterare il flusso e i ruoli tipografici del corpo.

Sono ammessi **colori secondari**, conservando la tinta assegnata come dominante. Il capitolo Colore fa eccezione su richiesta esplicita: usa uno spettro ricco di tutte le diciassette famiglie cromatiche Tailwind, con sky come campo principale. Gli SVG contengono forme native e campiture piatte, senza raster, gradienti o testi incorporati. I ruoli `principale`, `secondario` e `spettro` distinguono le tinte modificabili; non appiattire tutta la grafica in un unico colore.

Tipografia usa il contorno autentico della «a» di Sora Bold, a scala uniforme, con linee metriche e numero composto in due pesi. Fonte e licenza OFL sono in `assets/fonts/editoriali/`. Le altre grafiche approvate, compresa Griglia, restano nella biblioteca senza diventare capitoli attivi. Le versioni precedenti degli SVG sono conservate in `assets/archivio/typst/copertine/svg-v1/`.

Lo sfondo occupa l’intero foglio e le forme possono uscire intenzionalmente dal bordo. `typst-booklet/anteprime/aperture.typ` legge lo stesso piano di `main.typ` e mostra soltanto le sei aperture attive, anche quando il relativo testo è ancora da importare.

La biblioteca conserva le **dodici aperture confermate dall’utente**. Restano confermate anche le note **7,5/9 pt, con URL 7/8,5 pt**. La misura ridotta risponde al commento Figma #427. Il commento #403 riguarda invece la bibliografia della tavola 491 e richiede una valutazione locale, senza estendere la riduzione a tutti gli apparati. I commenti #425–426 riguardano soltanto il titolo «Consigli utili» della tavola corrente 470: ingrandimento e possibile vicinanza al bordo sono una variante locale ancora da comporre.

Le note del corpo occupano **tutta la gabbia di 137 mm sotto entrambe le colonne**. L’utente ha confermato una fascia inferiore fissa di **35 mm**, separata dal testo da 8 pt e riservata anche nelle pagine con poche note. Il testo continua a scorrere nelle colonne native. Il componente `template/note.typ` conserva contatori e richiami `footnote`, misura soltanto le voci e le dispone nella fascia della pagina effettiva del richiamo. I corpi restano nel documento insieme al proprio richiamo e non nel footer decorativo; URL e collegamenti di andata e ritorno rimangono attivi. Se le note superano la fascia, la compilazione segnala la pagina interessata senza tagliare le fonti. Aperture, bibliografie, Appunti e schermate a pieno formato mantengono le rispettive gabbie.

La doppia pagina del Duomo usa `template/doppia-pagina.typ`: stessa immagine originale sui due fogli, al vivo inferiore, con profilo alpha e una sola didascalia comune. Meander distribuisce un unico corpo di testo nelle quattro colonne; il seguito riprende il flusso nativo senza un limite di pagine. Per l’eccezione confermata dall’utente, le voci delle note sono nelle colonne esterne da 66 mm delle sole due pagine. I richiami sono misurati separatamente dalle voci, che conservano contatori, link e ruolo nativo `Note`; oltre la coppia torna la larghezza ordinaria di 137 mm.

Prima della prima coppia di Tipografia, l’eventuale foglio di raccordo generato dal salto nativo alla pagina pari ripete due ingrandimenti della Bibbia di Gutenberg già descritta. La variante locale usa lo sfondo del solo salto, senza aggiungere note, numeri di figura o nuove informazioni; il testo del capitolo resta nel corpo del documento. Non cambia il numero o la parità delle pagine della coppia.

Le voci sono disposte in regioni indipendenti dalla misurazione Meander, con altezza ricavata dal contenuto. Il testo sagomato non dipende dalle interrogazioni delle note: una modifica a monte può ricomporre il volume conservando la doppia pagina e la separazione fra le voci.

`sagoma-pagina` riusa il componente per una fotografia trasparente su un solo foglio: due colonne, immagine e didascalia originali, note nella fascia ordinaria a tutta gabbia. Le quote riguardano la figura e il suo profilo alpha, mai le righe della prosa. I paragrafi sul soggetto raffigurato scorrono attorno alla sagoma; gli argomenti successivi riprendono il flusso ordinario. La misura delle voci usa font, interlinea e larghezza della stampa, ma non crea copie di `footnote.entry` durante le prove di ingombro. Il ruolo nativo `Note` e i collegamenti appartengono alle sole voci effettive.

Per l’annuncio **Olivetti Lettera 32**, il commento Figma #379 richiede il bordo sinistro del foglio. La variante `al-vivo-sinistro` allinea il primo pixel visibile dell’alpha, compensando il margine della pagina effettiva; soltanto il margine trasparente dell’asset oltrepassa il foglio. Scala, proporzioni, originale, didascalia e flusso della prosa restano quelli della figura. L’allineamento si adatta anche a un cambio di parità prodotto dalla ricomposizione del volume.

I commenti si verificano insieme al bersaglio e al testo corrente prima dell’importazione del relativo capitolo. Il registro `reports/typst-booklet/commenti-importazione.json` comprende 111 commenti: 95 riletti dal vivo e 16 storici non riverificati. L’audit resta parziale e non implica una verifica di tutti i commenti. Nessuna modifica a Figma è inclusa in questa trasposizione. Il contratto delle misure Figma resta documentato sopra; le modifiche intenzionali alla nuova edizione Typst sono dichiarate qui e non attestano aggiornamenti grafici già applicati ai frame originali.


### Inserti documentari e variante Colore approvati

Le figure che in Figma occupavano una tavola autonoma conservano una pagina dedicata nel nuovo volume; si mantengono insieme anche le coppie appartenenti alla stessa tavola. Il formato al vivo si conserva solo dove era attestato. Questa richiesta non ingrandisce tutte le figure: prosa e visuali delle pagine discorsive continuano a ricomporsi normalmente. Proporzioni, didascalie, diritti, richiami e folio restano conservati. Le pagine di sole figure senza note usano la gabbia ordinaria (137 mm, margini superiore 15/inferiore 20 mm e footer-descent 17 pt); le pagine del corpo mantengono la fascia delle note da 35 mm. Il componente `template/figure.typ` misura la didascalia e adatta proporzionalmente la sola immagine.

Per Colore l’utente ha approvato una colonna nelle seguenti sequenze con diagrammi larghi; altrove restano due colonne native:

- Da «Teoria e uso del colore» a «Dalla palette ai ruoli»; ritorno a due in «Colori caldi e colori freddi».
- Da «Leggere una mappa culturale» a «Rosso e bianco»; ritorno a due in «Il rosso nella campagna IKEA».
- Da «Il colore di un dato è una convenzione» a «Le parole organizzano anche il colore»; ritorno a due in «Un fiore, un rito, un riferimento culturale».
- «Consigli pratici» e il 60–30–10; ritorno a due in «Lasciati ispirare dalla natura».
- Da «La stessa interfaccia in chiaro e scuro» a «Dal riferimento alla schermata»; ritorno a due in «Grigio tonalizzato».

Le cinque tavole Albers sono inserti autonomi da 137 mm, privi di note. I titoli e i confini esatti della variante restano in `reports/typst-booklet/05-colore/gabbia-approvata.json`. Le citazioni senza testo (`cite` con `form: none`) all’inizio dei capitoli 03 e 05 assegnano i suffissi delle opere dello stesso autore/anno nell’ordine alfabetico richiesto da APA; autori, date, URL e citazioni visibili non sono sostituiti manualmente. Nel capitolo completo di Tipografia, dieci coorti autore–anno richiedono anche quattro intervalli alfabetici nativi: Typst 0.15.1/Hayagriva 0.10.1 elabora correttamente al massimo tre coorti per bibliografia (difetto #507). Il parametro `target` assegna ogni citazione a un solo intervallo; i quattro elenchi consecutivi formano un’unica bibliografia visibile. I suffissi seguono l’ordine dell’elenco, con date complete prima dei titoli a parità di anno. I dati delle fonti restano separati e invariati. Una regola di presentazione limitata alla bibliografia elimina la virgola che Typst0.15.1 aggiunge impropriamente ad alcune date con il solo anno; le date attestate non vengono completate artificialmente. Volume e anteprima isolata usano la stessa variante, risolta da `template/piano.typ`. Lo stato `in-revisione` distingue la presenza dei contenuti dalla conclusione della verifica editoriale; non dichiara il volume pronto alla pubblicazione. L’estratto precedente è conservato, invariato, in `assets/archivio/typst/estratti/06-tipografia.typ`.
