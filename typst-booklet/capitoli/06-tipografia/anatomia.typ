// Anatomia delle lettere: trascrizione dalle tavole Figma 359–371.
// Testo e didascalie modificabili; nessun limite di righe o pagine.
#import "../../template/editoriale.typ": testo-diritti
#import "../../template/stile.typ": immagine, sito

== Anatomia delle lettere

Dopo aver incontrato lettere prodotte con strumenti e finalità differenti, serve un lessico che permetta di confrontarle. *L’anatomia dei caratteri* dà un nome alle loro parti e alle relazioni che le tengono insieme. Parlare di un’asta, di una controforma o di un terminale è più preciso che definire una lettera soltanto «elegante» o «moderna». Il vocabolario non sostituisce l’osservazione: permette di indicare dove si trova la differenza che stiamo osservando @t06-monotype-glossario.#sito([Monotype, The A–Z of typographic terms.], "https://www.monotype.com/resources/typographic-terms")

Molti termini usano metafore del corpo: la lettera può avere una pancia, una gamba, una spalla o un orecchio. Queste parole sono strumenti descrittivi. Non implicano che ogni segno contenga tutte le parti. Una g a due occhielli offre dettagli che una g a un solo occhio non possiede; un carattere privo di grazie non può mostrarle come se fossero state semplicemente nascoste. Anche *la terminologia varia* fra scuole e lingue: per questo i campioni accompagnano i nomi italiani con il termine inglese quando aiuta a riconoscere la voce nei software e nella letteratura. La mappa (@fig-tipo-258) introduce un percorso dall’insieme al dettaglio. Le guide rendono confrontabili le altezze, mentre gli agganci segnalano parti disegnate e spazi interni. Nei campioni successivi il blu non inventa una nuova forma: evidenzia una porzione dei *contorni del font*. Si può così passare dal campione al singolo glifo e tornare al campione, verificando che il dettaglio analizzato appartenga davvero al carattere mostrato @t06-roboto-serif.#sito([Commercial Type e Greg Gazdowicz, Roboto Serif: file e licenza.], "https://github.com/google/fonts/tree/main/ofl/robotoserif")

#figure(
  stack(dir: ttb, spacing: 8pt,
    image(path("/assets/images/figure/tipografia/anatomia/riferimenti-verticali.svg"), width: 137mm, alt: "Riferimenti verticali della lettera: ascendente, maiuscole, altezza della x, linea di base e discendente."), 
    image(path("/assets/images/figure/tipografia/anatomia/dettagli-anatomici.svg"), width: 137mm, alt: "Sei dettagli anatomici: asta, spalla, orecchio, grazia, controforma e pancia."), 
  ), kind: image, placement: top, scope: "parent",
  caption: [Quote del campione e sei dettagli anatomici, distinti in due pannelli.
    #v(4pt)#testo-diritti[Roboto Serif 500, Commercial Type e Google Fonts; SIL OFL 1.1.]],
) <fig-tipo-258>

=== Il corpo: una misura, non una sagoma

Quando si imposta un testo a 12 punti, non si sta dichiarando che tutte le lettere visibili siano alte 12 punti. Il corpo è *una misura nominale* che stabilisce la scala del carattere. Nel tipo metallico è legato al corpo fisico del pezzo; nel digitale l’_em_ fornisce la scala di *un sistema di coordinate* in cui descrivere le forme. A 12 punti un _em_ misura 12 punti, ma i contorni possono occuparne porzioni diverse e, in alcuni casi, oltrepassarne i limiti. Il punto tipografico usato nel sistema PostScript corrisponde a *1/72 di pollice*. Un valore di corpo non indica però quanti pixel saranno effettivamente impiegati dal dispositivo, né coincide con l’altezza della x o delle maiuscole. Sono grandezze collegate, ma distinte. I font possono impiegare anche un diverso numero di unità interne per _em_: questo aumenta o modifica la precisione delle coordinate senza rendere più grande la lettera quando viene composta allo stesso corpo. La conseguenza è visibile in un confronto elementare. Due campioni impostati alla stessa misura possono apparire di dimensioni diverse perché differiscono le proporzioni fra minuscole, maiuscole ed estensioni. Per confrontarli è utile mantenere la scala dichiarata e osservare le parti; per farli convivere può servire un *aggiustamento ottico*. La misura comune è un punto di partenza, non la promessa di un’identica presenza visiva. L’anatomia aiuta proprio a spiegare da dove proviene quella differenza @t06-opentype-head.#sito([Microsoft, OpenType: head — Font Header Table.], "https://learn.microsoft.com/en-us/typography/opentype/spec/head")

=== Linea di base, altezza della x e maiuscole

La *linea di base*, o baseline, è il riferimento su cui si allineano le lettere latine in una riga ordinaria. Non è il bordo inferiore di ogni segno: alcune parti scendono sotto di essa e le forme tonde possono oltrepassarla leggermente per una compensazione ottica. Nei nostri schemi la guida permette di individuare un punto comune, senza tagliare idealmente tutto ciò che lo supera.

*L’altezza della x*, o x-height, descrive l’altezza di riferimento delle minuscole prive di estensioni. La x è il segno da cui prende nome; la misura non indica l’altezza di ciascun glifo dell’alfabeto. Una b, una p e una maiuscola hanno strutture che occupano zone diverse. Il campione (@fig-tipo-259) isola la x, così che la relazione fra il punto di partenza e la parte superiore resti leggibile.

#immagine(path("/assets/images/figure/tipografia/anatomia/altezza-x.svg"),
  [Altezza della x, misurata fra la linea di base e la sommità della lettera.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Altezza della x, misurata fra la linea di base e la sommità della lettera.",
) <fig-tipo-259>

*L’altezza delle maiuscole*, o cap-height, si osserva a partire dalla stessa baseline. La H della @fig-tipo-260 offre un riferimento piano e rende immediato il confronto con l’altezza delle minuscole. Una O o una lettera appuntita può sporgere un poco oltre la linea convenzionale per apparire della stessa altezza: questa eccedenza ottica è chiamata overshoot.

#immagine(path("/assets/images/figure/tipografia/anatomia/altezza-maiuscole.svg"),
  [Altezza delle maiuscole: le guide collegano la linea di base alla sommità della H.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Altezza delle maiuscole: le guide collegano la linea di base alla sommità della H.",
) <fig-tipo-260>

Nelle quote bisogna infine distinguere i valori dichiarati dal font dai limiti esatti dei contorni. Le *metriche nominali* servono al funzionamento dell’insieme; un singolo glifo può fermarsi prima o superarle. Guardare contemporaneamente misura e forma evita di trattare una guida come una barriera rigida e prepara a confrontare caratteri con proporzioni differenti.

=== Ascendenti e discendenti

Nel confronto fra h e n, una parte della differenza è affidata all’estensione verticale. L’ascendente è la porzione della minuscola che *supera l’altezza della x*. Nella h della @fig-tipo-261 il blu individua soltanto quella zona: l’asta continua anche sotto, ma non tutta l’asta è un ascendente. La distinzione permette di descrivere un carattere con estensioni lunghe senza confondere la misura della parte con il corpo complessivo.

#immagine(path("/assets/images/figure/tipografia/anatomia/ascendente.svg"),
  [Nella h, l’ascendente supera l’altezza della x; il tratto è evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Nella h, l’ascendente supera l’altezza della x; il tratto è evidenziato in blu.",
) <fig-tipo-261>

Il discendente è invece la parte che *scende sotto la linea di base*. La p della @fig-tipo-262 rende chiaro il rapporto: la pancia resta nella zona delle minuscole, mentre il prolungamento dell’asta occupa lo spazio inferiore. Altre lettere, come g, j, q e y, possono scendere con forme differenti. Un discendente non deve essere per forza un segmento verticale; può contenere curve e terminazioni, secondo il disegno del glifo.

#immagine(path("/assets/images/figure/tipografia/anatomia/discendente.svg"),
  [Nella p, il discendente scende sotto la linea di base, indicata dalla guida orizzontale.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Nella p, il discendente scende sotto la linea di base, indicata dalla guida orizzontale.",
) <fig-tipo-262>

Le altezze di queste estensioni *non sono universali*. In alcuni caratteri gli ascendenti superano le maiuscole, in altri il rapporto è diverso. Anche accenti e segni diacritici occupano spazio e vanno osservati sui testi reali. Per questo conoscere soltanto l’altezza della x non basta a descrivere la presenza verticale di una famiglia. La forma di una parola nasce dall’alternanza fra corpi centrali ed estensioni: provando parole che contengono molte h, b, p o g diventa più facile riconoscere quanto questa alternanza contribuisca alla sua fisionomia.

=== Aste, tratti, braccia e gambe

Il tratto è l’elemento disegnato che costruisce la lettera: può essere rettilineo o curvo, verticale, orizzontale o diagonale. L’asta è uno dei *tratti portanti*, tipicamente verticale. Nella h della @fig-tipo-263 possiamo individuarla e distinguerla dalla curva della spalla. Il termine generale «tratto», illustrato nella @fig-tipo-264, permette invece di parlare del disegno senza assegnargli subito una funzione più specifica.

#immagine(path("/assets/images/figure/tipografia/anatomia/asta.svg"),
  [L’asta verticale della h, evidenziata in blu, è uno dei tratti portanti della lettera.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "L’asta verticale della h, evidenziata in blu, è uno dei tratti portanti della lettera.",
) <fig-tipo-263>

#immagine(path("/assets/images/figure/tipografia/anatomia/tratto-obliquo.svg"),
  [Il tratto obliquo destro della v, evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Il tratto obliquo destro della v, evidenziato in blu.",
) <fig-tipo-264>

Un braccio ha *un’estremità libera*: nella E i tratti orizzontali si protendono dall’asta senza chiudersi su un secondo sostegno. La @fig-tipo-266 mostra la parte selezionata nel campione. La gamba scende invece dal corpo della lettera, spesso in diagonale, come nella R o nella K. Nella @fig-tipo-265 la K mostra questa *discesa distinta dall’asta verticale* e dal braccio obliquo superiore. L’utilità dei nomi emerge soprattutto nel confronto: due R possono condividere una struttura riconoscibile e differire per l’attacco, l’inclinazione o la conclusione della gamba. Dire che una R «è più dinamica» rimane una prima impressione; indicare una gamba che si apre progressivamente verso l’esterno rende l’osservazione discutibile e verificabile. Lo stesso vale per la larghezza dei bracci della E o per la proporzione delle aste della H. Questi elementi non sono pezzi indipendenti da assemblare sempre nello stesso modo. Il disegnatore deve coordinare raccordi, spessori e curvature affinché la lettera rimanga riconoscibile e appartenga alla stessa famiglia delle altre. L’anatomia scompone per permettere di capire, ma il risultato va sempre *ricomposto nella forma intera*.

#immagine(path("/assets/images/figure/tipografia/anatomia/braccio.svg"),
  [Il braccio superiore della E si estende dall’asta verticale e rimane libero all’estremità.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Il braccio superiore della E si estende dall’asta verticale e rimane libero all’estremità.",
) <fig-tipo-266>

#immagine(path("/assets/images/figure/tipografia/anatomia/gamba.svg"),
  [La gamba della K è il tratto obliquo che dal nodo centrale scende verso la linea di base.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La gamba della K è il tratto obliquo che dal nodo centrale scende verso la linea di base.",
) <fig-tipo-265>

=== Spalle, orecchi, spine e code

*La spalla* è la curva che, in lettere come h, m e n, conduce dall’asta verso un altro tratto. Il campione (@fig-tipo-268) permette di seguire questo passaggio: la forma può aprirsi dolcemente oppure cambiare direzione con maggiore decisione. La n non è quindi descritta soltanto da altezza e larghezza; conta anche il modo in cui la curva entra nell’asta e ritorna verso la linea di base.

#immagine(path("/assets/images/figure/tipografia/anatomia/spalla.svg"),
  [La spalla della n è il tratto curvo che raccorda l’asta alla parte destra della lettera.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La spalla della n è il tratto curvo che raccorda l’asta alla parte destra della lettera.",
) <fig-tipo-268>

*L’orecchio è una piccola sporgenza*, riconoscibile nella parte superiore della g a due occhielli. Nella @fig-tipo-267 è evidenziato un dettaglio che può cambiare molto fra famiglie: direzione, lunghezza e conclusione contribuiscono all’identità del segno. La sua presenza dipende però dalla forma concreta adottata per la lettera, perciò va cercato nel glifo e non presunto sulla base del solo nome.

#immagine(path("/assets/images/figure/tipografia/anatomia/orecchio.svg"),
  [La piccola sporgenza in alto a destra della g è l’orecchio, evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La piccola sporgenza in alto a destra della g è l’orecchio, evidenziato in blu.",
) <fig-tipo-267>

La spina è *l’andamento curvo principale* della S e della s. Nella @fig-tipo-269 attraversa la zona centrale e coordina le due parti della lettera. Seguirla con lo sguardo aiuta a vedere che una S non nasce necessariamente da due semicerchi uguali. La relazione fra la parte alta e quella bassa, insieme ai cambiamenti di spessore, produce l’equilibrio della forma.

#immagine(path("/assets/images/figure/tipografia/anatomia/spina.svg"),
  [La spina della S è la curva centrale che raccorda le due parti del segno.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La spina della S è la curva centrale che raccorda le due parti del segno.",
) <fig-tipo-269>

La coda è infine il *prolungamento che distingue*, fra gli esempi più evidenti, la Q dalla O. La @fig-tipo-270 la mostra nel contorno originale del carattere. Può partire dall’interno, attraversare il bordo o svilupparsi all’esterno, secondo il progetto. Basta confrontare poche Q per capire quanto un dettaglio apparentemente secondario possa rendere riconoscibile un’intera famiglia, senza che quel dettaglio debba essere ripetuto in tutte le altre lettere.

#immagine(path("/assets/images/figure/tipografia/anatomia/coda.svg"),
  [La coda della Q sporge dal corpo circolare della lettera e ne modifica il profilo inferiore.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La coda della Q sporge dal corpo circolare della lettera e ne modifica il profilo inferiore.",
) <fig-tipo-270>

=== Barre, grazie e terminali

La *barra trasversale* unisce o attraversa altri tratti. È facile individuarla nella H e nella A: una parte orizzontale mette in relazione le strutture che salgono. La @fig-tipo-271 mostra invece il tratto che attraversa una f. Nei glossari inglesi si può incontrare una distinzione più fine fra crossbar, che collega, e cross stroke, come il tratto che attraversa una t o una f. La funzione e la posizione aiutano a scegliere la parola appropriata, evitando di chiamare genericamente «asta» ogni segmento della lettera.

#immagine(path("/assets/images/figure/tipografia/anatomia/barra.svg"),
  [La barra della f attraversa l’asta con un tratto orizzontale, qui evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La barra della f attraversa l’asta con un tratto orizzontale, qui evidenziato in blu.",
) <fig-tipo-271>

La grazia, o serif, è *un’appendice all’estremità* di un tratto principale. Nella @fig-tipo-272 il blu ne rende evidente il rapporto con il sostegno. La presenza della grazia è solo l’inizio dell’osservazione: contano la forma, lo spessore e il modo in cui si raccorda all’asta. Una terminazione sottile e netta produce un risultato diverso da una grazia massiccia o da una raccordata con una curva.

#immagine(path("/assets/images/figure/tipografia/anatomia/grazia.svg"),
  [La grazia alla base della n mostra il piccolo tratto che conclude l’asta.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La grazia alla base della n mostra il piccolo tratto che conclude l’asta.",
) <fig-tipo-272>

Con terminale indichiamo qui la conclusione di un tratto *priva di grazia*, come nel campione (@fig-tipo-273). Può essere tagliata, arrotondata, affusolata o assumere una forma a goccia. Anche caratteri appartenenti alla stessa grande categoria possono differire molto proprio nelle terminazioni. Il confronto di c, a o r è spesso più informativo di un confronto limitato a lettere rettilinee.

#immagine(path("/assets/images/figure/tipografia/anatomia/terminale.svg"),
  [Terminale superiore della f: l’ingrandimento 4× rende leggibile il profilo della parte finale del tratto.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Terminale superiore della f: l’ingrandimento 4× rende leggibile il profilo della parte finale del tratto.",
  width: 300pt, placement: top, scope: "parent",
) <fig-tipo-273>

Descrivere questi dettagli non basta a dedurre un’emozione precisa o una superiorità nella lettura. Una grazia non rende automaticamente «classico» ogni messaggio, così come la sua assenza *non garantisce modernità*. Prima di interpretare l’effetto, l’anatomia invita a nominare la forma che effettivamente osserviamo.

=== Pance e controforme: disegnare anche il vuoto

Una lettera non è fatta soltanto di parti nere. I tratti delimitano spazi che partecipano al riconoscimento tanto quanto il loro contorno esterno. La pancia, o bowl, è *la parte curva che circonda* uno spazio, come nella D della @fig-tipo-274. La controforma, o counter, è invece *il vuoto racchiuso o parzialmente racchiuso* dai tratti. La differenza è fondamentale: la pancia appartiene al segno disegnato, la controforma allo spazio che esso rende percepibile.

#immagine(path("/assets/images/figure/tipografia/anatomia/pancia.svg"),
  [La pancia della D è il tratto curvo che, insieme all’asta, racchiude la controforma.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La pancia della D è il tratto curvo che, insieme all’asta, racchiude la controforma.",
) <fig-tipo-274>

Nel campione (@fig-tipo-275) il centro della o rimane bianco; il blu ne segue il bordo interno. In questo modo l’evidenziazione non confonde il vuoto con una nuova macchia da aggiungere alla lettera. Se la forma viene inspessita, lo spazio può ridursi; se si cambia il rapporto fra tratti e curve, può cambiare la sua apertura. Queste relazioni saranno decisive quando esamineremo pesi e piccoli corpi.

#immagine(path("/assets/images/figure/tipografia/anatomia/controforma.svg"),
  [La controforma della o è lo spazio interno delimitato dal contorno della lettera, indicato dalla guida blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La controforma della o è lo spazio interno delimitato dal contorno della lettera, indicato dalla guida blu.",
) <fig-tipo-275>

*L’apertura è il varco* attraverso cui una controforma non chiusa comunica con lo spazio esterno. Una c e una e possono mostrarne differenze molto visibili: non conta soltanto quanto è grande lo spazio interno, ma anche come il suo ingresso viene delimitato dai terminali. Osservare i vuoti impedisce di giudicare un carattere soltanto dalla massa dei tratti.

Il termine italiano «occhiello» viene usato con significati non sempre identici nei diversi testi. Per evitare ambiguità, in questo capitolo precisiamo quando stiamo parlando del tratto curvo e quando del vuoto interno. Il disegno completo resta il riferimento: una definizione è utile se consente di ritrovare la parte nel campione, non se obbliga il campione a somigliare a un’illustrazione convenzionale.

=== Collegamenti, svolazzi e speroni

La g a due occhielli permette di osservare una relazione più complessa. Il collegamento, o link, *unisce il corpo superiore* alla parte inferiore della lettera. Nella @fig-tipo-276 l’evidenziazione è limitata al tratto che svolge questa funzione. Non va confuso con il raccordo curvo fra una grazia e un’asta: la parola italiana «raccordo» può infatti descrivere più situazioni, mentre la posizione nella g chiarisce il significato di link.

#immagine(path("/assets/images/figure/tipografia/anatomia/collegamento.svg"),
  [Il collegamento della g unisce la parte superiore all’occhiello inferiore; il tratto è evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Il collegamento della g unisce la parte superiore all’occhiello inferiore; il tratto è evidenziato in blu.",
) <fig-tipo-276>

Lo svolazzo, o swash, estende un tratto con una funzione espressiva. La @fig-tipo-277 confronta la B corsiva ordinaria di EB Garamond con la variante dotata di svolazzo, prevista dal font. È un caso differente dai campioni principali, tratti da Roboto Serif, e la didascalia dichiara il cambiamento. Lo svolazzo non è stato aggiunto a mano per rendere decorativa una lettera comune: appartiene a *una variante progettata* e disponibile nel repertorio. Nell’uso va controllato in rapporto alle lettere vicine, perché la sua estensione può creare incroci o collisioni @t06-eb-garamond.#sito([Georg Duffner e Octavio Pardo, EB Garamond: file e licenza.], "https://github.com/google/fonts/tree/main/ofl/ebgaramond")

#immagine(path("/assets/images/figure/tipografia/anatomia/svolazzo.svg"),
  [B corsiva ordinaria e B con svolazzo, allo stesso corpo. L’estensione decorativa appartiene a una variante disegnata del font.],
  diritti: [EB Garamond Italic, variante B.swsh; SIL OFL 1.1.],
  alt: "B corsiva ordinaria e B con svolazzo, allo stesso corpo. L’estensione decorativa appartiene a una variante disegnata del font. EB Garamond Italic, variante B.swsh; SIL OFL 1.1.",
) <fig-tipo-277>

Lo sperone, o spur, è una piccola sporgenza da un tratto principale. Nel campione (@fig-tipo-278) viene indicato lo *sperone inferiore destro* nella G di Work Sans. Non tutti i caratteri hanno lo stesso sperone nella stessa posizione; trasferire il segno di una G su un’altra per farla coincidere con un modello didattico altererebbe il documento che stiamo analizzando @t06-work-sans.#sito([Wei Huang, Work Sans: file e licenza.], "https://github.com/google/fonts/tree/main/ofl/worksans")

#immagine(path("/assets/images/figure/tipografia/anatomia/sperone.svg"),
  [Sperone della G di Work Sans Medium (500). Il dettaglio 2,2× isola la piccola proiezione nella parte inferiore destra.],
  diritti: [Work Sans, Wei Huang / The Work Sans Project Authors; SIL OFL 1.1.],
  alt: "Sperone inferiore destro della G di Work Sans Medium, con dettaglio ingrandito 2,2 volte.",
  width: 388.35pt, placement: top, scope: "parent",
) <fig-tipo-278>

Al termine di questo percorso possiamo tornare a una parola intera. Linee di riferimento, tratti, terminazioni e vuoti devono essere *riconosciuti insieme*: la lettera mantiene la propria identità attraverso tutte queste relazioni. Dal dettaglio passiamo ora alla famiglia, per capire come il disegno venga coordinato in font, varianti e repertori che permettono di scrivere testi completi.

