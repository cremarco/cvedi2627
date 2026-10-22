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
| Corpo | DM Sans Regular · 400 · opsz 18 | 11 / 13,5 pt |
| Enfasi del corpo | DM Sans Bold · 700 · opsz 14 | 11 / 13,5 pt |
| Citazione bibliografica nel testo | DM Sans · peso del testo circostante | 10/11 del corpo circostante · interlinea del paragrafo |
| Sottoparagrafo | DM Sans Black · 900 · opsz 14 | 14 / 14 pt |
| Didascalia | DM Sans Light · 300 · opsz 9 | 9 / 10,8 pt |
| Prefisso e numero della figura | DM Sans Medium · 500 · opsz 14 | 9 / 10,8 pt |
| Diritti dell’immagine | DM Sans Italic · 400 · opsz 9 | 8 / 10 pt |
| Folio | DM Sans Medium · 500 · opsz 14 | 12 / 14 pt |
| Bibliografia | DM Sans Regular · 400 · opsz 9 | 8 / 10 pt |
| Note Typst | DM Sans Regular · 400 | 7,5 / 9 pt |
| URL nelle note Typst | DM Sans Regular · 400 | 7 / 8,5 pt |

Per le sette aperture attive dell’edizione Typst, i corpi, le interlinee, le spaziature e le posizioni specifiche di `assets/booklet/aperture-imagegen-svg-v1/composizioni.json` sostituiscono i due preset di apertura e numero monumentale riportati nella tabella. Titolo e codice usano Sora 700; gli altri ruoli editoriali mantengono le misure indicate.

Il corpo del booklet Typst è **giustificato**, con lingua italiana e sillabazione automatica, su richiesta esplicita dell’utente. Questo aggiornamento supera la precedente bandiera sinistra del modello Figma per la nuova impaginazione. Conservare la dimensione ottica e il peso effettivi: il nome «9pt Regular» di un font o subset storico non definisce da solo il corpo o l’asse ottico da applicare.

Il corpo dell’edizione Typst usa **11/13,5 pt** in tutti i capitoli, comprese le regioni sagomate, su richiesta dell’utente dopo il confronto stampabile. Questo è il preset predefinito (`lettura=11-13.5`); `lettura=12-14` resta disponibile per confrontare la misura precedente. Famiglia, peso, dimensione ottica e spazio fra paragrafi restano quelli del sistema editoriale. Figure e campioni didattici, didascalie, diritti, note, folio, titoli e apparati conservano i propri ruoli e le rispettive misure.

Il testo discorsivo usa uno spazio fra paragrafi di 10 pt. I sottoparagrafi occupano una colonna da 187,09 pt e distano 4 pt dal contenuto seguente. I titoli crescono in altezza con il testo; non comprimere i caratteri per farli entrare.

Usare il grassetto per enfasi semantiche mirate. I nomi propri di persona vanno in corsivo nella prosa, nelle intestazioni, nelle didascalie e nelle note editoriali. Le citazioni e le bibliografie native conservano lo stile APA. I titoli delle opere usano corsivo o virgolette, con un criterio coerente. Conservare corsivi, simboli e notazioni pertinenti, come *em*, senza estendere accidentalmente l’enfasi ad articoli o parole adiacenti.

Nel booklet Typst, equazioni, disuguaglianze e variabili matematiche si compongono con il markup matematico nativo, anche nelle didascalie. Le formule isolate usano frazioni e radicali composti; le unità restano in tondo e i decimali mantengono la virgola italiana. Il font matematico è New Computer Modern Math, distribuito con Typst; il testo ordinario conserva DM Sans. Gli originali documentari e le trascrizioni delle fonti restano conservati.

## Colori

La carta è bianca `#FFFFFF`; l’inchiostro ordinario è `#2E3138`. L’accento appartiene al capitolo e va gestito attraverso le variabili condivise, mantenendo coerenti titoli, codici, folio e altri elementi editoriali che svolgono lo stesso ruolo.

Nella fonte Figma del capitolo di Tipografia l’accento è `#AFC7E8`, controllato da `capitolo/tipografia/colore` nelle collezioni `Booklet / Teston / Primitivi` ed `Editoriale`. L’alias semantico collega i componenti al primitivo. L’edizione Typst usa invece la sequenza richiesta dall’utente, documentata nella tabella dei capitoli: preliminari gray 300, poi le famiglie Tailwind da red in ordine, nella tonalità 300.

Conservare il blu funzionale dei collegamenti dove previsto. La prosa mantiene il colore dell’inchiostro; l’accento non colora automaticamente interi paragrafi. Fotografie, opere, marchi e screenshot documentari conservano i colori originali.

## Regole editoriali per i prossimi capitoli

### Struttura e ordine di lettura

I titoli dei capitoli sono brevi sintagmi nominali, con un argomento riconoscibile e coerente con i contenuti. Il titolo completo è definito una sola volta in `typst-booklet/piano.json` e condiviso da apertura, indice e segnalibro PDF. Eventuali salti di riga appartengono soltanto alla presentazione dell’apertura: non producono una seconda versione del titolo nei dati. Nei titoli riformulati la congiunzione «e» resta unita alla parola seguente, anche nella variante maiuscola, per evitare una riga composta dalla sola congiunzione. «Colore e significato» conserva il titolo e la presentazione approvati.

Nel modello Figma ogni **sezione principale**, per esempio 9.1, comincia su una pagina nuova. Nella nuova edizione **Typst**, su richiesta dell’utente di evitare colonne vuote, sezioni e sottoparagrafi proseguono nel flusso delle due colonne, senza un salto obbligatorio prima del titolo. Il titolo resta associato al primo passaggio che introduce, senza lasciarlo isolato al fondo di una colonna.

Si legge tutta la colonna sinistra dall’alto al basso, poi la destra e infine la pagina successiva. Un sottotitolo non riavvia una coppia di colonne parallele. Le continuazioni devono essere riconoscibili, senza frammenti sospesi o salti ambigui fra pagine lontane.

Comporre insieme prosa, immagini e didascalie. Distribuire il contenuto fra pagine contigue, conservando margini e ritmo: evitare grandi vuoti accidentali e spazi dilatati per riempire il foglio. Il bianco intenzionale di un’opera o di un’apertura mantiene la propria funzione.

Nell’edizione Typst, la distribuzione di testo e figure è automatica anche fra passaggi successivi: non usare `place.flush()` come separatore editoriale. Le figure ordinarie sono mobili; le tavole documentarie conservano il formato a pagina intera ma possono spostarsi per consentire alla prosa successiva di completare il foglio precedente. Didascalie e diritti si spostano con le immagini e i richiami aprono la loro posizione visiva. Restano fisse le composizioni intenzionali: sagome e testo associato, figure sul dorso, raccordi delle doppie pagine, schermate Caffè TTC al vivo, esercizi e apparati. La fascia note di 35 mm e le varianti approvate a una colonna restano confermate.

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

La richiesta comprende tutti i rimandi ai materiali di preparazione editoriale: vecchi booklet, presentazioni, approfondimenti e slide. Ometterli da prosa, caption e diritti, footnote, citazioni visibili e invisibili, apparati delle fonti e bibliografie. La provenienza degli asset rimane nei manifest locali; opere, immagini, contenuti didattici e attribuzioni originali si conservano. Conservare studi, standard e documentazione primaria esterna che sostengono i contenuti; le presentazioni usate come fonte rientrano nei rimandi da omettere.

### Bibliografia, note e collegamenti

Ogni capitolo termina con una sezione intitolata **Bibliografia**, in **APA 7**, con citazioni autore–anno nel testo e riferimenti in ordine alfabetico. I riferimenti completi e recuperabili sono impaginati **a larghezza della gabbia**, in DM Sans Regular 400, opsz 9, corpo 8/10 pt a bandiera sinistra. DOI e URL bibliografici previsti da APA restano nel riferimento; i link di consultazione sono distinti e vanno nelle note. La bibliografia non segue le due colonne del corpo e non diventa un elenco di siti.

Le citazioni bibliografiche nel testo, parentetiche e narrative, mantengono famiglia e peso del testo circostante e usano **il rapporto 10/11 della sua misura**, cioè **10 pt nel corpo da 11 pt**, e il colore **`#626872`**, leggermente più chiaro dell’inchiostro ordinario `#2E3138`. La misura relativa segue anche il testo delle didascalie; l’interlinea resta quella del paragrafo. La presentazione si applica agli elementi `cite` nativi: contenuti, punteggiatura APA, disambiguazione, ordinamento e collegamenti alla bibliografia restano automatici. Le citazioni testuali fra virgolette conservano il proprio ruolo editoriale; bibliografia finale, sitografia e misure delle note mantengono i rispettivi apparati.

La **sitografia resta nei footnote**, cioè nelle **note al piede della pagina pertinente**, con link attivi e richiami numerici in apice. La separazione fra sitografia nelle note e bibliografia alla fine di ogni capitolo è una regola permanente confermata dall’utente, da rispettare anche durante ricerche, verifiche delle fonti e uso di skill bibliografiche. Nella nuova edizione Typst usare note 7,5/9 pt e URL 7/8,5 pt, misure confermate dall’utente; le misure Figma precedenti erano rispettivamente 8/10 e 7/9 pt. Ogni nota deve avere il proprio richiamo e ogni richiamo la propria nota; dopo spostamenti o eliminazioni verificare numerazione e corrispondenza.

La nota può adottare una variante breve: autore e anno, oppure autore e istituzione, nelle misure delle note approvate, affiancati all’URL sulla stessa riga. La citazione integrale resta in bibliografia. Allineare coerentemente le righe e adattare le giustezze ai contenuti, senza imporre una ripartizione fissa della larghezza.

Riservare alle note lo spazio necessario e ricomporre il corpo sopra di esse, senza sovrapposizioni al folio. Fra le voci consecutive usare un distacco di 3,5 pt, conservando l’interlinea effettiva di 9 pt e la fascia approvata di 35 mm. Affiancare ai titoli dei criteri normativi codice e collegamento alla fonte ufficiale, con il riferimento pertinente anche in nota.

## Componenti e modalità di lavoro

Usare frame di pagina ordinari e **componenti granulari collegati**: corpo, titoli, sezioni, immagini, didascalie, diritti, note, folio e indice. Non creare componenti di pagina intera. I contenitori correlati usano auto-layout; testi e righe seguono il contenuto senza altezza fissa che li tagli.

Per cambiare la grafica usare `Go to main component`; per cambiare il contenuto usare le proprietà delle istanze e i segmenti di testo. Conservare enfasi, corsivi, link e ordine di lettura. Non sostituire un testo ricco con un’unica proprietà piatta che cancelli la formattazione.

| Famiglia riutilizzabile | Funzione |
| --- | --- |
| `Booklet / Teston / Componenti / Testo discorsivo` | Modello Figma 12/14 a bandiera sinistra; Typst 11/13,5 giustificato |
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

## Capitolo 10 · La griglia

La Page Figma `102 · Griglia · Nuovo design` (`4954:42`) usa l’accento Salvia `#A5BDB0`, attraverso i token `chapter/griglia/colore` nelle collezioni Primitivi ed Editoriale. Il token semantico mantiene l’alias al primitivo. La nuova Tipografia termina al folio 502; seguono le 48 pagine 503–550 di Griglia e Wireframe comincia a 551.

Le variazioni della gabbia fanno parte della spiegazione: due colonne da 187,09 pt, una colonna da 288 pt, brevi passaggi a gabbia intera, testo e figura affiancati, composizioni modulari e asimmetriche, documenti dominanti e doppie pagine. Formato, margini speculari, font di lettura, apparati e folio seguono il sistema Teston. La copertina usa un reticolo nativo, titolo Sora Bold 47/42 e numero di capitolo Sora Bold 200/210, dimensionato per questa composizione. I codici di sezione mantengono Sora ExtraBold 100/100.

Le figure 3.370 e 3.377 occupano rispettivamente le coppie 516–517 e 524–525. Ogni coppia usa due istanze dello stesso componente a scala identica e alla stessa quota, con una didascalia comune. I reticoli stampati appartengono alle figure didattiche; le dodici guide native di ogni pagina restano non stampabili. Il taglio del testo nella figura 3.388 è un esempio negativo esplicitamente identificato nella figura e nella didascalia.

Le 42 figure sono numerate 3.359–3.400 e conservano richiami nativi nella prosa. I 43 componenti delle figure comprendono anche il dettaglio dell’opera di April Greiman. Corpo, sezioni, didascalie, diritti, note, indice, bibliografia e folio riutilizzano i componenti granulari Teston. Le fonti, gli originali e il registro corrente sono in `assets/booklet/griglia-nuovo-design/`; PDF e verifiche dell’intero capitolo sono in `reports/griglia-nuovo-design/`.

Nella trasposizione Typst Griglia è il capitolo **07**: i codici della fonte restano identificatori dei dati e i numeri stampati seguono il contatore del nuovo capitolo. I 39 diagrammi conservano forme, colori e testi degli SVG esportati dai componenti correnti; didascalie, diritti e richiami appartengono ai componenti editoriali Typst. Musica Viva, Unigrid e l’opera di April Greiman usano gli originali documentari, verificati attraverso gli hash delle immagini correnti in Figma. Il dettaglio Greiman conserva il ritaglio dell’istanza e lo stesso numero della vista completa.

Il capitolo Typst include inoltre otto figure della sezione Griglia dell’edizione PDF di dicembre 2024, pp. 100–107, su richiesta dell’utente. I sette originali raster e il diagramma vettoriale sono associati alle spiegazioni pertinenti, con didascalie, diritti, citazioni e rimandi nativi; le 42 figure correnti restano presenti. Anatomia e infografica verticale usano inserti documentari per conservarne la leggibilità. Gli originali non vengono riscritti: il testo distingue la terminologia client/server dal comportamento del layout, qualifica le percentuali non documentate e corregge l’etichetta «Area aurea» applicata a una divisione in terzi. Le immagini e la loro provenienza sono nel manifest `assets/images/figure/griglia/manifest.json`; il catalogo editoriale e la bibliografia restano separati.

Le integrazioni Typst dai materiali locali sviluppano quattro lacune operative: distanze e box model, larghezza massima del contenitore fluido, convenzione delle dodici colonne e adattamento delle immagini. Quattro diagrammi di sintesi e un confronto storico di Vogue si aggiungono alle cinquanta figure precedenti, senza sostituirle. Le spiegazioni tecniche rimandano alle specifiche e alle documentazioni primarie; provenienza degli elaborati e originali delle schermate restano nei manifest locali. Le schermate attestano la versione documentata, senza dedurne codice, breakpoint o funzionamento del sito attuale. La figura 7.1 segue immediatamente il titolo nel medesimo blocco iniziale a gabbia intera; da lì la prosa continua nelle due colonne native. Queste integrazioni non attestano modifiche alla fonte Figma.

Le due figure sul dorso usano `typst-booklet/template/documenti-doppi.typ`, con due pagine native a gabbia intera e margini ordinari. La coppia comincia su un foglio pari; un solo asset integro attraversa i due fogli alla stessa scala e quota. Una sola figura nativa sulla pagina sinistra alimenta il contatore e la didascalia comune; a destra compare il richiamo di continuazione. La prosa dei due passaggi resta modificabile e determina la quota minima necessaria alla figura, senza assegnare coordinate alle righe. Un ingombro incompatibile con il foglio genera un errore esplicito. I metadati `booklet-documento-doppio` permettono di controllare parità, quota e scala; non si applicano profili alpha o composizioni Meander ai diagrammi rettangolari.

## Trasposizione in Typst · campione in valutazione

Il sorgente `typst-booklet/main.typ` legge `typst-booklet/piano.json`, che definisce i sette capitoli richiesti, numerati **01–07**, con titoli, file, fonti e stato dell’importazione. Alle sei lezioni iniziali si aggiunge **La griglia**, dalla Page Figma corrente `4954:42`, su richiesta dell’utente. I testi restano in file distinti per capitolo; le fonti native Hayagriva `.yml` o BibLaTeX `.bib` sono separate. I numeri 03–08 delle lezioni Slidev, i codici dei capitoli Figma e i loro folio identificano le fonti; non stabiliscono la numerazione del nuovo volume.

I contenuti delle sei lezioni iniziali e il capitolo **07 · La griglia** sono inclusi nel volume. La griglia importa la fonte corrente e le relative attribuzioni; testo e didascalie restano modificabili in Typst e la bibliografia APA è separata in `bibliografia/07-griglia.yml`. Lo stato `in-revisione` distingue la presenza del capitolo dalla conclusione della verifica editoriale. Tipografia comprende le sezioni 6.1–6.9 fino alla tavola corrente 490 e resta nello stato `in-revisione`, con scelte editoriali e verifiche globali ancora aperte. Colore conserva la variante di gabbia approvata. Gli inserti dei capitoli 02–04 sono verificati dopo la richiesta di conservarne il formato a pagina intera. Il documento include soltanto i file disponibili, senza pagine vuote per quelli in preparazione. Introduzione, Processo UX, Define, Linguaggio visivo e Gerarchia visiva sono esclusi dal piano. Le prove precedenti di Introduzione e Griglia, con le rispettive fonti, sono conservate in `typst-booklet/esperimenti/capitoli-esclusi/`; la vecchia Griglia esclusa non è la fonte dell’attuale capitolo 07.

L’impaginazione usa pagine e colonne native, testo continuo, numerazione automatica e bibliografia nativa per capitolo. Le sagome usano Meander ufficiale 0.4.4 soltanto nella regione della figura e un profilo ricavato dall’alpha dell’asset; il testo successivo non ha limiti di pagina. Non importare il concept metro o coordinate delle righe Figma. Ogni capitolo è seguito da una pagina Appunti. Il codice del progetto ha commenti in italiano.

Frontespizio, crediti e indice usano numeri romani minuscoli (`i`, `ii`, `iii`…), anche nel folio e nelle etichette PDF. Il primo capitolo comincia sul recto e riparte da pagina 1 con la numerazione araba ordinaria. Il salto nativo dopo l’indice conserva la parità delle pagine dei capitoli già presenti: un nuovo capitolo non deve invertire i margini speculari o rimuovere le tavole di raccordo delle doppie pagine.

Diritti e contatto appartengono una sola volta agli apparati del volume. Il blocco dell’avviso, con il riferimento normativo, è allineato al fondo della gabbia della pagina dei crediti, nel rispetto del margine inferiore. Le figure con etichette minute usano il posizionamento mobile nativo a gabbia intera, senza imporre pagine alla prosa.

Storia del design conserva il percorso della fonte corrente, dalle origini agli scenari delle interfacce, con bibliografia APA di capitolo. L’atlante distingue gli esempi documentari dalle varianti del bar immaginario Caffè TTC. La miniatura del Khamsa conserva l’identificazione curatoriale del Dallas Museum e omette l’attribuzione a Shiraz, su conferma dell’utente.

Gli asset attivi condivisi con le slide sono in `assets/images/figure/<tema>/`, con nomi descrittivi e manifest di provenienza; font e OFL in `assets/fonts/editoriali/`. Il mirror web `public/images/shared/` è generato e ignorato da Git. Conservare gli originali delle importazioni precedenti durante la migrazione.

Noto Sans JP completa gli script assenti nei font editoriali, a partire dai caratteri giapponesi del glossario ukiyo-e. Noto Sans SC completa i caratteri cinesi assenti anche nel font JP, come 劳 nel nome 麦当劳. Sono fallback locali con licenza OFL: prosa latina e titoli mantengono rispettivamente DM Sans e Sora.

Gli esempi del bar si chiamano **Caffè TTC**. Su richiesta dell’utente usano schermate reali del sito locale, ciascuna su una pagina dedicata di 170 × 240 mm, a pieno formato e senza tab Design, selettore dello stile, folio o didascalie sovrapposte. Il viewport ha lo stesso rapporto del foglio: non ritagliare né deformare la cattura per riempirlo. Didascalia, richiamo e URL appartengono al testo che precede la schermata. Questi inserti riguardano soltanto le immagini richieste; la prosa continua a essere composta automaticamente. Le visuali precedenti di Caffè Luce restano in archivio. Per la sezione sulle risorse l’utente ha scelto la variante TTC «Primissimo web», senza immagini, accanto al caso documentato di Low-tech Magazine.

La cartella `typst-booklet/` separa `capitoli/`, `bibliografia/`, `template/`, `anteprime/`, `scripts/`, `esperimenti/` e `build/`. Frontespizio, crediti e indice sono raccolti in `capitoli/00-frontespizio-indice.typ`. Le composizioni delle aperture sono raccolte in `template/aperture/`; i dati alpha derivati stanno in `assets/dati/sagome/`. L’archivio delle prove grafiche è in `assets/archivio/typst/`, distinto dagli asset attivi. Le copie esattamente identiche di immagini, font e licenze sono consolidate nell’originale condiviso, conservando vecchi percorsi e hash nel manifest d’archivio.

Su richiesta dell’utente, `capitoli/` contiene un solo `.typ` completo per capitolo, senza sottocartelle o frammenti di prosa. Ogni file è compilabile autonomamente ed esporta `testo`, che `main.typ` importa per assemblare lo stesso contenuto nel volume. I blocchi di contenuto conservano gli ambiti locali delle regole di pagina e delle figure. Le composizioni specifiche di Ricerca, Accessibilità, Gestalt, Griglia e dei consigli tipografici appartengono a `template/`; fonti e dati restano separati. `template/pagine.typ` raccoglie i contenitori documentari, al vivo e Appunti; `figure.typ` compone le figure e misura gli inserti; `editoriale.typ` conserva i ruoli granulari; `profili.typ` valida e legge le sagome per entrambi i motori di flusso. La guida operativa è in `typst-booklet/README.md`; compilazione e verifiche sono nei moduli di `scripts/booklet/`.

Le aperture attive sono **grafiche flat SVG a tutta pagina**, ricostruite dai sette concept selezionati in `assets/booklet/aperture-imagegen-svg-v1/`. Il campo radice `aperture` di `typst-booklet/piano.json` indica questa famiglia. `numero` e `codice` identificano il capitolo corrente; il resolver legge manifest e `composizioni.json` della famiglia e seleziona il fondo di `disegni/` per numero. `apertura_originale` conserva soltanto il riferimento al motivo storico della biblioteca precedente: non seleziona più la grafica attiva.

Su richiesta dell’utente, l’edizione Typst mantiene gray 300 ai preliminari e la sequenza Tailwind red, orange, amber, yellow, lime, green ed emerald 300 nei sette capitoli. I metadati e le tinte delle fonti Figma restano distinti. La colonna «Tema storico» registra la provenienza della selezione precedente.

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

Il manifest `assets/images/aperture/manifest.json` conserva le dodici grafiche precedenti e, nella sezione `palette`, l’ordine completo di 26 famiglie, i valori OKLCH ufficiali e gli equivalenti esadecimali convertiti con Typst. `template/palette.typ` continua a risolvere la tinta del capitolo corrente e quella dei preliminari. I fondi attivi hanno le campiture esatte del capitolo; numeri di sezione e folio conservano la stessa tinta. Le forme, i colori secondari e lo spettro restano modificabili nei gruppi SVG nominati e nei relativi ruoli `data-palette`.

`template/aperture/apertura.typ` usa i fondi senza testo e compone **titolo e numero come testo Typst nativo in Sora 700**. Corpi, interlinee, spaziature, posizioni e salti di riga seguono le quote del campionario approvato in `composizioni.json`. Il titolo completo rimane definito una sola volta nel piano: un solo heading nativo alimenta indice e segnalibri PDF. Gli esecutivi autonomi in `svg/` includono invece titolo e numero come elementi di testo modificabili, con font Sora incorporato. I ruoli tipografici e il flusso del corpo mantengono il sistema esistente.

Sono ammessi **colori secondari**, conservando la tinta assegnata come dominante. Colore mantiene il nastro a tutte le diciassette famiglie cromatiche Tailwind, con lime 300 come campo principale e due campioni corallo identici. I fondi SVG contengono forme native e campiture piatte, senza raster, gradienti o testi incorporati. Non appiattire tutta la grafica in un unico colore.

L’apertura attiva di Tipografia usa il **macrosegno illustrativo ricostruito dal concept**, con controforma e asta: non è un campione autentico del glifo Sora. Titolo e numero usano invece Sora autentica; il codice 06 ha l’accento blue 600 `#155DFC` sul fondo green 300. Fonte e licenza OFL sono in `assets/fonts/editoriali/`. Griglie usa la nuova composizione modulare con emerald 300; l’accento Salvia della fonte Figma resta documentato come dato della fonte.

La biblioteca in `assets/images/aperture/` conserva le **dodici aperture precedenti confermate dall’utente**, compreso il contorno autentico della «a» Sora Bold e il motivo storico 12. Le rispettive composizioni, inclusa la variante del titolo di Griglie a 200 pt di giustezza e 47 pt di corpo, restano documenti della biblioteca precedente. Le versioni SVG ancora anteriori sono in `assets/archivio/typst/copertine/svg-v1/`; originali, prompt e provenienza della famiglia attiva sono nel suo manifest.

Lo sfondo occupa l’intero foglio e le forme possono uscire intenzionalmente dal bordo. `typst-booklet/anteprime/aperture.typ` usa lo stesso resolver e gli stessi dati di `main.typ`, mostrando le sette aperture attive.

Restano confermate le note **7,5/9 pt, con URL 7/8,5 pt**. La misura ridotta risponde al commento Figma #427. Il commento #403 riguarda invece la bibliografia della tavola 491 e richiede una valutazione locale, senza estendere la riduzione a tutti gli apparati. I commenti #425–426 riguardano soltanto il titolo «Consigli utili» della tavola corrente 470: ingrandimento e possibile vicinanza al bordo sono una variante locale ancora da comporre.

Le note del corpo occupano **tutta la gabbia di 137 mm sotto entrambe le colonne**. L’utente ha confermato una fascia inferiore fissa di **35 mm**, separata dal testo da 8 pt e riservata anche nelle pagine con poche note. Il testo continua a scorrere nelle colonne native. Il componente `template/note.typ` conserva contatori e richiami `footnote`, misura soltanto le voci e le dispone nella fascia della pagina effettiva del richiamo. I corpi restano nel documento insieme al proprio richiamo e non nel footer decorativo; URL e collegamenti di andata e ritorno rimangono attivi. Se le note superano la fascia, la compilazione segnala la pagina interessata senza tagliare le fonti. Aperture, bibliografie, Appunti e schermate a pieno formato mantengono le rispettive gabbie.

La doppia pagina del Duomo usa `template/doppia-pagina.typ`: stessa immagine originale sui due fogli, al vivo inferiore, con profilo alpha e una sola didascalia comune. Meander distribuisce un unico corpo di testo nelle quattro colonne; il seguito riprende il flusso nativo senza un limite di pagine. Per l’eccezione confermata dall’utente, le voci delle note sono nelle colonne esterne da 66 mm delle sole due pagine. I richiami sono misurati separatamente dalle voci, che conservano contatori, link e ruolo nativo `Note`; oltre la coppia torna la larghezza ordinaria di 137 mm.

Prima della prima coppia di Tipografia, l’eventuale foglio di raccordo generato dal salto nativo alla pagina pari ripete due ingrandimenti della Bibbia di Gutenberg già descritta. La variante locale usa lo sfondo del solo salto, senza aggiungere note, numeri di figura o nuove informazioni; il testo del capitolo resta nel corpo del documento. Non cambia il numero o la parità delle pagine della coppia.

Le voci sono disposte in regioni indipendenti dalla misurazione Meander, con altezza ricavata dal contenuto. Il testo sagomato non dipende dalle interrogazioni delle note: una modifica a monte può ricomporre il volume conservando la doppia pagina e la separazione fra le voci.

`sagoma-pagina` riusa il componente per una fotografia trasparente su un solo foglio: due colonne, immagine e didascalia originali, note nella fascia ordinaria a tutta gabbia. Le quote riguardano la figura e il suo profilo alpha, mai le righe della prosa. I paragrafi sul soggetto raffigurato scorrono attorno alla sagoma; gli argomenti successivi riprendono il flusso ordinario. La misura delle voci usa font, interlinea e larghezza della stampa, ma non crea copie di `footnote.entry` durante le prove di ingombro. Il ruolo nativo `Note` e i collegamenti appartengono alle sole voci effettive.

Per l’annuncio **Olivetti Lettera 32**, il commento Figma #379 richiede il bordo sinistro del foglio. Nella ricomposizione a 11/13,5 pt, questa composizione fissa inizia su pagina pari (`partenza: "even"`), a sinistra nella coppia aperta, così il lato al vivo coincide con il bordo esterno del volume. La variante `al-vivo-sinistro` allinea il primo pixel visibile dell’alpha; soltanto il margine trasparente dell’asset oltrepassa il foglio. L’immagine conserva larghezza di 240 pt, proporzioni, originale e didascalia; la prosa segue il profilo con 8 pt di rispetto e le note restano nella fascia ordinaria. Dopo modifiche a monte, il componente raggiunge automaticamente la prossima pagina pari: l’eventuale pagina necessaria alla parità appartiene a questa composizione specifica.

I commenti si verificano insieme al bersaglio e al testo corrente prima dell’importazione del relativo capitolo. Il registro `reports/typst-booklet/commenti-importazione.json` comprende 111 commenti: 95 riletti dal vivo e 16 storici non riverificati. L’audit resta parziale e non implica una verifica di tutti i commenti. Nessuna modifica a Figma è inclusa in questa trasposizione. Il contratto delle misure Figma resta documentato sopra; le modifiche intenzionali alla nuova edizione Typst sono dichiarate qui e non attestano aggiornamenti grafici già applicati ai frame originali.


### Inserti documentari e variante Colore approvati

Le figure che in Figma occupavano una tavola autonoma conservano una pagina dedicata nel nuovo volume, con posizione automatica nel flusso; si mantengono insieme anche le coppie appartenenti alla stessa tavola. Il formato al vivo si conserva solo dove era attestato. Questa richiesta non ingrandisce tutte le figure: prosa e visuali delle pagine discorsive continuano a ricomporsi normalmente. Proporzioni, didascalie, diritti, richiami e folio restano conservati. Le pagine di sole figure senza note usano la gabbia ordinaria (137 mm, margini superiore 15/inferiore 20 mm e medesima posizione del folio); le pagine del corpo mantengono la fascia delle note da 35 mm. `template/pagine.typ` distingue `tavola-mobile()` dai contenitori a pagina fissa. Il componente `template/figure.typ` misura la didascalia e adatta proporzionalmente la sola immagine.

Per Colore l’utente ha approvato una colonna nelle seguenti sequenze con diagrammi larghi; altrove restano due colonne native:

- Da «Teoria e uso del colore» a «Dalla palette ai ruoli»; ritorno a due in «Colori caldi e colori freddi».
- Da «Leggere una mappa culturale» a «Rosso e bianco»; ritorno a due in «Il rosso nella campagna IKEA».
- Da «Il colore di un dato è una convenzione» a «Le parole organizzano anche il colore»; ritorno a due in «Un fiore, un rito, un riferimento culturale».
- «Consigli pratici» e il 60–30–10; ritorno a due in «Lasciati ispirare dalla natura».
- Da «La stessa interfaccia in chiaro e scuro» a «Dal riferimento alla schermata»; ritorno a due in «Grigio tonalizzato».

Le cinque tavole Albers sono inserti autonomi da 137 mm, privi di note. I titoli e i confini esatti della variante restano in `reports/typst-booklet/05-colore/gabbia-approvata.json`. Le citazioni senza testo (`cite` con `form: none`) all’inizio dei capitoli 03 e 05 assegnano i suffissi delle opere dello stesso autore/anno nell’ordine alfabetico richiesto da APA; autori, date, URL e citazioni visibili non sono sostituiti manualmente. Nel capitolo completo di Tipografia, dieci coorti autore–anno richiedono anche quattro intervalli alfabetici nativi: Typst 0.15.1/Hayagriva 0.10.1 elabora correttamente al massimo tre coorti per bibliografia (difetto #507). Il parametro `target` assegna ogni citazione a un solo intervallo; i quattro elenchi consecutivi formano un’unica bibliografia visibile. I suffissi seguono l’ordine dell’elenco, con date complete prima dei titoli a parità di anno. I dati delle fonti restano separati e invariati. Una regola di presentazione limitata alla bibliografia elimina la virgola che Typst0.15.1 aggiunge impropriamente ad alcune date con il solo anno; le date attestate non vengono completate artificialmente. Volume e anteprima isolata usano la stessa variante, risolta da `template/piano.typ`. Lo stato `in-revisione` distingue la presenza dei contenuti dalla conclusione della verifica editoriale; non dichiara il volume pronto alla pubblicazione. L’estratto precedente è conservato, invariato, in `assets/archivio/typst/estratti/06-tipografia.typ`.

## Aperture SVG dai concept ImageGen · famiglia attiva

La famiglia `assets/booklet/aperture-imagegen-svg-v1/`, selezionata dal campo radice `aperture` del piano, fornisce le sette aperture del volume Typst. Il resolver legge il manifest e `composizioni.json`, seleziona i fondi senza testo di `disegni/` per numero e passa le quote al componente nativo. I sette esecutivi autonomi in `svg/` contengono forme vettoriali e titolo/numero come testo Sora modificabile. Le quote seguono il campionario approvato; il titolo completo proviene dal piano unico e il relativo heading resta unico. Macrosegno illustrativo di Tipografia, codice 06 blue 600, palette esatte, campiture piatte, spettro a diciassette famiglie e due campioni corallo identici sono conservati. Originali, prompt, font e licenze restano documentati nel manifest. Le dodici aperture precedenti restano nella biblioteca storica; l’integrazione riguarda le aperture del booklet Typst e non attesta modifiche ai frame Figma o ai contenuti dei capitoli.

La rifinitura del campionario usa bordi condivisi, tangenti raccordate, archi ellittici esatti e un profilo unico per il nastro cromatico; le giunzioni sono verificate anche al 400%. Titoli, numeri e quote tipografiche restano quelli della ricostruzione.

Nell’apertura Colore tutte le sagome usano esclusivamente archi ellittici nativi e rette; le diagonali del nastro sono tangenti comuni calcolate alle ellissi. Centri e raggi sono separati in `geometria-colore.json`, con rigenerazione attraverso `geometria-colore.py`. Le separazioni dello spettro sono rette e le irregolarità del concept raster vengono regolarizzate geometricamente.

Il controllo generale regolarizza le controcurve di Ricerca e Tipografia e le tangenti dei profili di Gestalt, mantenendo i nodi della composizione. In Griglie il modulo bianco inferiore sinistro termina sullo stesso asse del quarto superiore. Il codice di Tipografia usa blue 600 `#155DFC` sul fondo green 300, per un contrasto di 3,74; contenuto, font, dimensioni e posizioni dei testi sono conservati. La verifica include gli ingombri reali dell'inchiostro, modifiche programmatiche reversibili e il confronto delle campiture fra SVG e PDF; rapporto e dettagli restano in `reports/booklet-aperture-svg-v1/`.
