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
| Bibliografia e note | DM Sans Regular · 400 | 10 / 12 pt |
| URL nelle note | DM Sans Regular · 400 | 9 / 11 pt |

Il corpo è **a bandiera sinistra**, senza giustificazione. Conservare la dimensione ottica e il peso effettivi: il nome «9pt Regular» di un font o subset storico non definisce da solo il corpo o l’asse ottico da applicare.

Il testo discorsivo usa uno spazio fra paragrafi di 10 pt. I sottoparagrafi occupano una colonna da 187,09 pt e distano 4 pt dal contenuto seguente. I titoli crescono in altezza con il testo; non comprimere i caratteri per farli entrare.

Usare il grassetto per enfasi semantiche mirate. I nomi propri di persona nella prosa vanno in corsivo. I titoli delle opere usano corsivo o virgolette, con un criterio coerente. Conservare corsivi, simboli e notazioni pertinenti, come *em*, senza estendere accidentalmente l’enfasi ad articoli o parole adiacenti.

## Colori

La carta è bianca `#FFFFFF`; l’inchiostro ordinario è `#2E3138`. L’accento appartiene al capitolo e va gestito attraverso le variabili condivise, mantenendo coerenti titoli, codici, folio e altri elementi editoriali che svolgono lo stesso ruolo.

Nel capitolo di Tipografia l’accento è `#AFC7E8`, controllato da `capitolo/tipografia/colore` nelle collezioni `Booklet / Teston / Primitivi` ed `Editoriale`. L’alias semantico collega i componenti al primitivo. La guida conserva anche le altre tinte disponibili: la loro presenza non assegna automaticamente una palette a un nuovo capitolo.

Conservare il blu funzionale dei collegamenti dove previsto. La prosa mantiene il colore dell’inchiostro; l’accento non colora automaticamente interi paragrafi. Fotografie, opere, marchi e screenshot documentari conservano i colori originali.

## Regole editoriali per i prossimi capitoli

### Struttura e ordine di lettura

Ogni **sezione principale**, per esempio 9.1, comincia su una pagina nuova. I sottoparagrafi, per esempio 9.1.1, proseguono nel flusso della pagina. Il titolo resta associato al primo passaggio che introduce, senza lasciarlo isolato al fondo di una colonna.

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

### Didascalie e diritti

La didascalia identifica il soggetto e spiega il dettaglio osservabile utile al discorso. Resta vicina alla visuale, con distacco ordinario di 8 pt, e si distingue dalla prosa attraverso il ruolo tipografico 9/10,8. Nei confronti affiancati allineare immagini e inizio delle caption quando la composizione lo consente.

Il prefisso «Figura» e il relativo numero usano il ruolo Medium; la spiegazione usa Light. Conservare nomi, numeri e punteggiatura coerenti. Ogni richiamo numerato nella prosa ha un collegamento nativo alla figura corretta, da verificare dopo ogni riordino.

I **diritti sono un blocco separato dalla spiegazione**, in DM Sans Italic **8/10 pt**. Indicare il titolare e le condizioni disponibili nella fonte verificata. Autore dell’opera, ente che conserva l’immagine, sito di provenienza e titolare dei diritti possono essere diversi: non inventare attribuzioni né considerarli automaticamente equivalenti.

Il testo destinato al lettore omette riferimenti al corso, agli elaborati degli studenti, al vecchio manuale e alle operazioni di recupero o revisione degli asset. Conservare nei registri locali provenienza, edizioni, date e informazioni tecniche; mantenere le attribuzioni delle opere e le informazioni necessarie a interpretare un esempio simulato o una versione storica.

### Bibliografia, note e collegamenti

La bibliografia finale contiene riferimenti bibliografici completi e recuperabili, impaginati **a larghezza della gabbia**. Non segue le due colonne del corpo e non diventa un elenco di siti.

Gli URL di consultazione stanno nelle **note al piede della pagina pertinente**, con link attivi e richiami numerici in apice. Usare citazioni e note 10/12 pt, URL 9/11 pt. Ogni nota deve avere il proprio richiamo e ogni richiamo la propria nota; dopo spostamenti o eliminazioni verificare numerazione e corrispondenza.

Riservare alle note lo spazio necessario e ricomporre il corpo sopra di esse, senza sovrapposizioni al folio. Affiancare ai titoli dei criteri normativi codice e collegamento alla fonte ufficiale, con il riferimento pertinente anche in nota.

## Componenti e modalità di lavoro

Usare frame di pagina ordinari e **componenti granulari collegati**: corpo, titoli, sezioni, immagini, didascalie, diritti, note, folio e indice. Non creare componenti di pagina intera. I contenitori correlati usano auto-layout; testi e righe seguono il contenuto senza altezza fissa che li tagli.

Per cambiare la grafica usare `Go to main component`; per cambiare il contenuto usare le proprietà delle istanze e i segmenti di testo. Conservare enfasi, corsivi, link e ordine di lettura. Non sostituire un testo ricco con un’unica proprietà piatta che cancelli la formattazione.

| Famiglia riutilizzabile | Funzione |
| --- | --- |
| `Booklet / Teston / Componenti / Testo discorsivo` | Corpo 12/14 a bandiera sinistra |
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
