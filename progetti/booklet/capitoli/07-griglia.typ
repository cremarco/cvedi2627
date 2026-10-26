// Capitolo 07: unico testo per volume e compilazione autonoma.
#import "../template/stile.typ": booklet, capitolo
#import "../template/piano.typ": parametri-capitolo
#import "../template/esercizi.typ": esercizio

#let testo = [
// Capitolo 07 dalla Page Figma 4954:42, verificata il 22 ottobre 2026.
// Il piano assegna il numero del volume; i codici storici identificano le fonti.
// Le citazioni silenziose includono le fonti nella bibliografia APA,
// senza aggiungere parole alla prosa originale né duplicare le note sitografiche.
#set page(numbering: "1")
#cite(<grigliaMuller>, form: none)
#cite(<grigliaMusica>, form: none)
#cite(<grigliaUnigrid>, form: none)
#cite(<grigliaGreiman>, form: none)
#cite(<grigliaGgs>, form: none)
#cite(<grigliaCssgrid>, form: none)
#cite(<grigliaCssunits>, form: none)
// Preordine cronologico delle opere MDN del 2026 per i suffissi APA nativi.
#cite(<grigliaBoxSizing>, form: none)
#cite(<grigliaImages>, form: none)

#[
#import "../template/stile.typ": sito
#import "../template/geometria.typ": colonna
#import "../template/griglia.typ": figura-griglia, doppia-griglia

// Prosa corrente Figma; rimandi e note sono elementi nativi del volume.

// Titolo e confronto restano nello stesso inserto a gabbia intera:
// il diagramma non può scavalcare il titolo; la prosa riprende nelle due colonne.
#place(top, scope: "parent", float: true)[
  #block(width: colonna)[
    == Dallo spazio alla struttura
  ]
  #figura-griglia("359", placement: none)
]

// La frase della copertina Figma rimane testo editoriale, fuori dalla grafica approvata.
#text(weight: 500)[Dare una struttura allo spazio e alla lettura]

La griglia è un sistema di relazioni spaziali: aiuta a organizzare i contenuti e a rendere riconoscibile il loro ordine.

Un titolo, una fotografia e un testo occupano lo stesso foglio, ma non hanno lo stesso compito. Per comporli bisogna decidere dove inizia la lettura, quali elementi appartengono allo stesso gruppo e dove lasciare una pausa.

La griglia rende esplicite queste relazioni.

Stabilisce riferimenti comuni ai quali agganciare contenuti diversi: margini, allineamenti, intervalli, colonne e quote orizzontali. Nella @fig-griglia-359, gli stessi elementi passano da un accumulo senza riferimenti a una composizione leggibile. Il cambiamento riguarda i rapporti fra le parti, prima ancora della loro forma.

=== Rendere visibili le relazioni

#figura-griglia("360")

Osserviamo una pagina di appuntamenti. Il nome del servizio identifica l'oggetto, la data permette di riconoscere la prenotazione e il comando di modifica consente di agire. Se questi elementi cambiano posizione a ogni riga, il confronto richiede continue ricerche.

Nella @fig-griglia-360, date e azioni ritornano sulle stesse verticali. Il lettore può confrontare più appuntamenti senza ricostruire ogni volta la struttura. Il bianco fra le righe separa record distinti; quello più breve fra etichetta e valore li tiene uniti.

Questo assetto non dimostra da solo una maggiore velocità di esecuzione. Formula una scelta verificabile: si può chiedere a una persona di individuare una data e osservare esitazioni, errori e percorso seguito. Una griglia diventa utile quando sostiene un compito riconoscibile.

=== Griglia, layout e gerarchia

#figura-griglia("361")

La griglia descrive possibilità di collocazione; il layout è la disposizione concreta di una pagina. Una struttura a sei colonne può accogliere un'immagine larga tre colonne oppure una figura larga quattro. Non impone che ogni elemento occupi una singola cella.

La gerarchia stabilisce invece le priorità fra i contenuti. Dimensione, peso, posizione, contrasto e distanza contribuiscono a distinguere un titolo da una nota.

Un allineamento perfetto non risolve una pagina in cui tutti i contenuti chiedono la stessa attenzione.

La @fig-griglia-361 mostra tre occupazioni dello stesso reticolo: il campo colorato si estende su tre, due o quattro colonne. Titolo e righe schematiche mantengono i propri riferimenti. La griglia rende possibili queste variazioni; la gerarchia dipende da come vengono usate nel layout.

=== Il bianco ha una misura

#figura-griglia("362")

Il margine distingue il contenuto dal bordo della pagina. L'intercolonna separa flussi di lettura vicini. Lo spazio dentro un controllo tiene il testo lontano dal suo limite. Sono distanze diverse, che rispondono a problemi diversi.

Una scala di spaziatura permette di ripetere rapporti coerenti. Nella @fig-griglia-362, le distanze sono in rapporto 1:2:4: 8 dentro il gruppo, 16 fra gruppi, 32 fra sezioni. Sono unità convenzionali del diagramma; in un progetto vanno tradotte in misure esplicite. I valori sono una scelta dell'esempio, non una regola universale.

La verifica deve includere anche ciò che cambia: un titolo su due righe, un'etichetta tradotta, un messaggio di errore. Se il sistema accetta soltanto testi corti, il suo ordine è fragile. Si correggono le regole e lo spazio disponibile, senza ridurre automaticamente il corpo per conservare l'aspetto iniziale.
]
#[
#import "../template/stile.typ": sito
#import "../template/griglia.typ": figura-griglia, doppia-griglia

// Prosa corrente Figma; rimandi e note sono elementi nativi del volume.

== Una storia di sistemi e scelte

Dalla pagina ripetibile ai sistemi di pubblicazione, la griglia diventa un modo per prendere e condividere decisioni.

#figura-griglia("363")

Margini e colonne coordinano da tempo testo, annotazioni e immagini. La griglia moderna rende esplicite e condivisibili queste scelte, senza costituire un'invenzione riconducibile a una sola data o persona.

Seguono tre esempi: _Musica Viva_ (1957), Unigrid (dal 1977) e il manuale di _Josef Müller-Brockmann_ (1981). La @fig-griglia-363 collega pagina, sistema e interfaccia: ambiti che si influenzano e continuano a coesistere.

=== Un metodo esplicito

#figura-griglia("364")

In _Grid systems in graphic design_, pubblicato da Arthur Niggli nel 1981, _Josef Müller-Brockmann_ presenta la griglia come strumento sistematico di organizzazione. Il metodo mette in rapporto formato, margini, colonne, suddivisioni orizzontali e caratteri.#sito([_Müller-Brockmann_, 1981: scheda dell’editore Niggli.], "https://niggli.ch/products/rastersysteme-fur-die-visuelle-gestaltung")

La @fig-griglia-364 confronta due scelte: distribuire oggetti isolati oppure costruire una famiglia di allineamenti che possa ospitare pagine diverse.

È uno schema di lettura del metodo, non una riproduzione delle tavole del libro.

La ripetizione rende confrontabili le decisioni. Si può descrivere perché una figura occupa due colonne e perché una didascalia segue un'altra misura. Questo rende il progetto discutibile e modificabile, senza trasformare il reticolo in un vincolo da rispettare a ogni costo. La forma del contenuto può richiedere un'altra griglia o una deroga riconoscibile.

=== Musica Viva, 1957

#figura-griglia("365", colonne: 1, altezza: 110mm)

Nel manifesto _Musica Viva_ di _Josef Müller-Brockmann_, le informazioni del concerto occupano quattro campi verticali nella parte superiore. In basso, segni obliqui di lunghezza e spessore diversi introducono un ritmo distinto. La @fig-griglia-365 conserva l'opera intera.#sito([Scheda dell'opera, MoMA.], "https://www.moma.org/collection/works/4885")

Si osservano gli inizi dei blocchi, le pause fra gruppi e il rapporto fra testo fitto e superficie libera. Queste relazioni sono leggibili nell'immagine; non equivalgono alla ricostruzione del reticolo originale dell'autore.

=== Unigrid: un sistema editoriale

#figura-griglia("366", colonne: 1, altezza: 110mm)

Nel 1977 _Vincent Gleason_, responsabile delle pubblicazioni del National Park Service, coinvolge _Massimo Vignelli_ nella definizione di Unigrid. Il sistema coordina formati, pieghe, tipografia e produzione delle brochure. Il primo esempio per un parco è quello di Clara Barton, del 1978.#sito([National Park Service, storia di Unigrid.], "https://www.nps.gov/subjects/hfc/a-brief-history-of-the-unigrid.htm")

I pannelli di base misurano 4 × 8¼ pollici. Formati e combinazioni possono cambiare, mantenendo una riconoscibilità comune. Nella @fig-griglia-366 si osservano testata, colonne, cronologia e mappa della brochure originale.

=== Coordinare senza uniformare

#figura-griglia("367")

Un sistema editoriale deve accogliere contenuti differenti: una mappa richiede un campo continuo, una cronologia dispone eventi in sequenza, un testo lungo richiede una misura leggibile. Unigrid consente composizioni diverse all'interno di regole comuni.

La @fig-griglia-367 usa tre pannelli per mostrare questa logica. La testata torna alla stessa quota; i campi sottostanti cambiano disposizione. Le etichette indicano possibili destinazioni dei pannelli: sono schemi di ingombro, non mappe, cronologie o brochure reali del National Park Service.

La coerenza si riconosce nei riferimenti che ritornano: il bordo del titolo, un intervallo fra fasce, la posizione dei dati di servizio. Per valutare il sistema non basta sovrapporre due pagine: bisogna controllare che i contenuti diversi possano trovare spazio senza perdere il proprio significato.

=== Che cosa passa allo schermo

#figura-griglia("368")

Dal progetto editoriale arrivano principi ancora utili: allineamenti ricorrenti, misure di lettura, intervalli e gerarchie. Sullo schermo queste relazioni devono funzionare anche quando la finestra cambia larghezza o compare un contenuto imprevisto.

La @fig-griglia-368 schematizza il passaggio da due colonne a una sequenza verticale: si riconoscono ancora testo e immagine.

Nell'interfaccia reale occorre conservare tutti i contenuti e le azioni, mantenendo ogni comando vicino all'informazione sulla quale agisce.

La dimensione di una schermata non può essere assunta come formato definitivo. Per documentare il progetto occorre descrivere sia gli stati rappresentativi, sia il comportamento fra uno stato e l'altro. Una serie di immagini mostra alcuni risultati; le regole spiegano come ottenerli quando lo spazio disponibile è diverso.
]
#[
#import "../template/stile.typ": sito
#import "../template/griglia.typ": figura-griglia, doppia-griglia

// Prosa corrente Figma; rimandi e note sono elementi nativi del volume.

== Anatomia e costruzione

Una griglia si costruisce mettendo in relazione il contenitore, i contenuti e le distanze che li rendono leggibili.

#figura-griglia("369")

Prima di scegliere quante colonne usare, occorre definire lo spazio disponibile e il contenuto che deve abitarlo. Nel libro entrano in gioco formato, margini e rilegatura; in un'interfaccia contano anche finestra, navigazione e aree riservate ai controlli.

La @fig-griglia-369 separa il foglio dal campo utilizzabile. Il margine interno tiene conto del dorso; quello esterno lascia un distacco dal taglio. Il piede conserva uno spazio distinto per il folio.

// Un documento unico attraversa il dorso; i due testi restano modificabili.
#doppia-griglia("370",
  sinistra: [
=== Leggere il reticolo

Le colonne suddividono la larghezza; le fasce orizzontali coordinano quote e altezze. Le loro intersezioni individuano moduli. Un modulo può contenere una parte di una figura oppure contribuire a un'area più ampia.

La @fig-griglia-370 attraversa questa doppia pagina: il campo continua alla stessa quota e con la stessa scala. Il dorso resta una zona da considerare, soprattutto se vi cadono testo o dettagli essenziali.
  ],
  destra: [
#block(above: 14pt, below: 4pt, sticky: true)[#text(size: 14pt, weight: 900)[Colonne, fasce e aree]]

L'intercolonna separa due colonne adiacenti. Una linea di flusso è un riferimento orizzontale sul quale possono iniziare blocchi differenti. L'area è uno spazio occupato da un contenuto, anche quando attraversa più moduli.

Nel confronto della @fig-griglia-370, i campi chiari mostrano le suddivisioni; quelli più intensi mostrano gli ingombri. La griglia di costruzione e la disposizione effettiva diventano così distinguibili.
  ],
)
// La tavola documentaria conserva i termini e i segni dell'originale del 2024.
La @fig-griglia-2024-102-anatomia distingue colonne, righe, margini e gutter attraverso segni e colori differenti.

#figura-griglia("2024-102-anatomia", colonne: 2, altezza: 150mm)


=== Calcolare e verificare

#figura-griglia("371", didascalia: [
  $170 - 15 - 18 - 5 = 132 thin "mm"$; $132 / 2 = 66 thin "mm"$ per colonna. Un elemento su due colonne comprende il vuoto centrale e misura 137 mm.
])

#block(sticky: true)[Nella @fig-griglia-371, se $W$ è la larghezza totale, $L$ e $R$ i margini laterali, $g$ l'intercolonna e $n$ il numero di colonne, la larghezza di ogni colonna uguale è]

$ c = (W - L - R - (n - 1) g) / n. $

Con $W = 170 thin "mm"$, $L = 15 thin "mm"$, $R = 18 thin "mm"$ e $g = 5 thin "mm"$, due colonne si dividono 132 mm: $c = 66 thin "mm"$.

#block(sticky: true)[Un elemento che occupa $k$ colonne contigue comprende anche le intercolonne interne:]

$ s = k c + (k - 1) g. $

Qui, su due colonne, misura $66 + 5 + 66 = 137 thin "mm"$, l'intera gabbia.

La formula vale per colonne uguali. In una gabbia asimmetrica si sommano le diverse larghezze e gli intervalli compresi nell'area. Si prova poi il risultato con testi e immagini reali: l'esattezza aritmetica non garantisce una misura di lettura adatta.

// Integrazione editoriale: distingue le distanze del progetto dalle proprietà CSS.
=== Margine, intercolonna e spazio interno

#figura-griglia("materiali-spazi")

Il margine della pagina è il campo fra il bordo del supporto e la gabbia. Nel web, una distanza analoga può dipendere dalla larghezza del contenitore e dal suo posizionamento. La proprietà CSS `margin` descrive invece lo spazio esterno a un elemento: non identifica necessariamente il margine dell'intera pagina.

Nella @fig-griglia-materiali-spazi, il campo esterno separa la raccolta dal bordo; l'intervallo centrale distingue due schede; lo spazio interno tiene titolo e testo lontani dal limite della propria scheda. Le tre distanze hanno compiti differenti, anche quando condividono la stessa misura.

In una griglia CSS, `gap` può definire gli intervalli fra le tracce. Il `padding` appartiene all'interno del singolo elemento. Aumentare il primo separa le schede; aumentare il secondo, a parità di ingombro esterno, riduce lo spazio disponibile per i contenuti della scheda. Una distanza aggiunta in entrambi i punti si somma: non va contata una sola volta perché nel disegno appariva come un unico vuoto.

Anche la larghezza dichiarata richiede una convenzione. Con `box-sizing: border-box`, una misura di 240 px CSS comprende contenuto, padding e bordo, ma esclude il margine. Con 16 px di padding e un bordo di 1 px per lato, al contenuto restano $240 - 2 times 16 - 2 times 1 = 206 thin "px"$. Con `content-box`, la larghezza dichiarata riguarda invece il solo contenuto #cite(<grigliaBoxSizing>).#sito([W3C, box-sizing e limiti del riquadro.], "https://www.w3.org/TR/css-sizing-3/#box-sizing")

Un campo colorato nel progetto indica un'area visiva; non rivela quale elemento HTML o proprietà CSS la produca. Si documentano perciò sia la distanza desiderata, sia il riquadro dal quale viene misurata.

=== La griglia delle linee di base

#figura-griglia("372")

La linea di base è il riferimento sul quale si appoggia la maggior parte delle lettere; i tratti discendenti, come quelli di p e g, scendono sotto di essa. Una griglia di base ripete riferimenti orizzontali per coordinare le righe.

La stessa interlinea non basta ad allineare due colonne: serve anche una quota iniziale comune. Nella @fig-griglia-372 le righe ritornano ogni 14 punti. Un titolo interrompe il testo; la ripresa torna su una delle linee della stessa serie, calcolando insieme titolo e distanze.

La griglia di base è distinta dalle fasce modulari. Note e didascalie possono usare ritmi propri; il sistema deve indicare quali elementi seguono il passo principale. Si controllano le linee di base effettive dei glifi, non soltanto il bordo dei rettangoli di testo.

=== Costruire con contenuti reali

#figura-griglia("373")

Un reticolo vuoto nasconde molti problemi. Una didascalia può essere più lunga del previsto; un'immagine verticale può lasciare un residuo difficile da usare; un nome proprio può non entrare nello spazio assegnato.

La @fig-griglia-373 prova tre ingombri sullo stesso reticolo: un titolo su due righe, un'immagine verticale e un elenco. I testi sono leggibili e l'immagine ha un campo riconoscibile: si può controllare se rientrano nello spazio previsto.

È un campione iniziale da estendere con i contenuti effettivi.

Conviene preparare un campione di casi ordinari e di casi limite prima di estendere il sistema. Se la soluzione richiede sempre correzioni locali, si rivede la griglia: numero di colonne, intervalli o regole di occupazione. Le eccezioni motivate restano possibili, ma non devono compensare un modello incapace di accogliere i contenuti ricorrenti.
]
#[
// Testi nativi della fonte corrente: prosa, corsivi, note e rimandi rimangono modificabili.
#import "../template/stile.typ": sito
#import "../template/editoriale.typ": sottotitolo-lettura
#import "../template/griglia.typ": figura-griglia, doppia-griglia

// Fonte Figma 4954:63 · folio 521.
== Tipologie e pagina editoriale

La griglia si sceglie in funzione della lettura: continuità del testo, confronto, ritmo delle immagini e priorità.

#figura-griglia("374")

Le tipologie di griglia descrivono logiche di organizzazione. Una struttura a blocco concentra la lettura in un campo principale; una struttura a colonne consente flussi affiancati; una modulare aggiunge suddivisioni orizzontali; una gerarchica stabilisce aree di misura diversa secondo le priorità.

La @fig-griglia-374 confronta queste quattro logiche attraverso campi di testo e immagine schematici. Le categorie possono combinarsi: una pagina modulare può avere un'area dominante e una gabbia a colonne può accogliere un testo continuo. Servono a descrivere le scelte, non a classificare ogni pagina in modo esclusivo.

// La prosa descrive una lettura su una sola colonna: la variante riguarda questo passaggio.
#set page(columns: 1)

// Fonte Figma 4954:64 · folio 522.
=== Una colonna, una sequenza

#figura-griglia("375")

La griglia a blocco affida il discorso a un campo principale. È adatta a una lettura continua, quando testo e immagini possono seguire un ordine verticale riconoscibile. La misura della riga dipende da corpo, carattere, interlinea e distanza di lettura.

In questa pagina il testo usa una sola colonna più larga di quella ordinaria. La @fig-griglia-375 distingue il campo di lettura dal margine disponibile per un'annotazione. Il margine non avvia un secondo discorso parallelo: il richiamo permette di raggiungere la nota dal punto pertinente.

Allargare una colonna non significa occupare automaticamente tutta la pagina. Si può mantenere una misura più breve e lasciare un campo libero per l'immagine o per una pausa. La verifica riguarda il ritorno da una riga alla successiva e la continuità dell'argomentazione, oltre alla quantità di testo che entra nel foglio.

// Riprende la misura ordinaria prima del confronto fra colonne.
#set page(columns: 2)

// Fonte Figma 4954:65 · folio 523.
=== Colonne per confrontare

#figura-griglia("376")

Una griglia a colonne permette di accostare informazioni e di assegnare larghezze diverse ai contenuti. Il testo può occupare una colonna, mentre un'immagine ne attraversa due. Una didascalia segue la misura della figura che spiega.

Nella @fig-griglia-376, sei unità consentono rapporti 3+3, 2+4 e 1+5. L'ultima combinazione può essere utile per una nota breve, ma non per un lungo testo nella fascia più stretta. La divisibilità offre possibilità; non garantisce che tutte siano leggibili.

Le colonne non devono creare ambiguità nell'ordine. Se il lettore deve completare il testo a sinistra prima di passare a destra, titoli e raccordi devono confermare quel percorso. Quando i campi sono confronti autonomi, etichette esplicite permettono invece di leggere ogni esempio come un'unità.

// La divisibilità spiega una convenzione progettuale, senza imporla a ogni formato.
=== Perché dodici colonne

#figura-griglia("materiali-dodici")

Dodici è divisibile per due, tre e quattro. Una stessa struttura può quindi ospitare due campi da sei unità, tre da quattro oppure quattro da tre. Nella @fig-griglia-materiali-dodici, le divisioni #box[$6 + 6$], #box[$4 + 4 + 4$] e #box[$3 + 3 + 3 + 3$] cambiano il numero di contenuti affiancati mantenendo gli stessi riferimenti.

Le dodici unità sono possibilità di occupazione, non l'obbligo di mostrare dodici schede. Un titolo può attraversare l'intera larghezza mentre tre appuntamenti occupano quattro unità ciascuno. La scelta dipende da ciò che deve entrare: data, servizio e azione hanno bisogno di una misura leggibile, oltre che di una divisione esatta.

Gli intervalli interni a un campo fanno parte della sua larghezza, come nella formula dello span. Un'area su sei colonne comprende cinque intercolonne; il vuoto che la separa dall'area successiva resta distinto. Per due campi uguali separati da un gutter, non si assegna a ciascuno metà della larghezza totale per poi aggiungere ancora l'intervallo.

Non esiste una sequenza universale di dodici colonne su desktop, otto su tablet e quattro su telefono. La 2x Grid di IBM, discussa più avanti, usa configurazioni da quattro, otto o sedici colonne. Queste convenzioni appartengono ai rispettivi sistemi; il contenuto può richiedere altre scelte.

Bootstrap 5.3 propone invece dodici colonne per impostazione predefinita, con occupazioni e cambi di disposizione configurabili. Il suo sistema principale chiamato _grid_ è costruito con Flexbox: il nome non indica automaticamente l'uso della tecnologia CSS Grid.#sito([Bootstrap 5.3, struttura e funzionamento del sistema a griglia.], "https://getbootstrap.com/docs/5.3/layout/grid/") <sito-grigliaBootstrap> Prima di adottarlo si controlla come dimensiona colonne e gutter, così la griglia del disegno e quella implementata descrivono le stesse relazioni.

// Stesso documento sui due fogli: un solo numero e una sola didascalia.
#doppia-griglia("377",
  sinistra: [
// Fonte Figma 4954:66 · folio 524.
=== Gli stessi contenuti, due assetti

Una pagina racconta una mostra immaginaria attraverso titolo, presentazione, programma e immagine. Nel primo assetto, due campi di pari larghezza accostano testo e immagine; il programma segue sotto. La prosa resta una sequenza unica.

La @fig-griglia-377 continua sulla pagina destra. Il contenuto resta uguale: cambia la distribuzione dello spazio. Il confronto riguarda il layout, non due versioni abbreviate del testo.

  ],
  destra: [
// Fonte Figma 4954:67 · folio 525.
#sottotitolo-lettura[Dare spazio a una priorità]

Nel secondo assetto l'immagine è più larga e la colonna di lettura più stretta. Il programma occupa il campo sotto l'immagine, senza sovrapporsi a essa; il titolo collega i due campi.

La @fig-griglia-377 permette di confrontare misura delle righe, peso dell'immagine e percorso di lettura. La soluzione asimmetrica non è automaticamente più dinamica o migliore: occorre verificare quale assetto sostiene meglio lo scopo della pagina e quanto materiale può accogliere.

  ],
)

// Il documento editoriale affianca un caso reale al diagramma delle sei unità.
#figura-griglia("2024-103-editoriale")

Nella @fig-griglia-2024-103-editoriale, le guide sovrapposte alla doppia pagina rendono visibili allineamenti e divisioni del campo. Testi, fotografie e riquadri occupano porzioni diverse della stessa struttura.

// Fonte Figma 4954:68 · folio 526.
=== La griglia modulare

#figura-griglia("378")

Quando si aggiungono suddivisioni orizzontali, le intersezioni con le colonne formano moduli. Un catalogo può assegnare un campo ricorrente a immagine, nome e dati di ogni oggetto. Una figura più importante può occupare più moduli.

La @fig-griglia-378 mostra una raccolta di sei schede. Quote comuni rendono confrontabili i dati; un elemento più esteso occupa due unità senza cambiare la posizione delle etichette. La modularità non impone che tutte le immagini abbiano lo stesso contenuto o lo stesso peso.

Il controllo riguarda anche gli spazi interni. Se le descrizioni crescono, si decide se l'altezza della riga segue l'elemento più lungo o se le schede possono avere altezze autonome. La scelta cambia gli allineamenti e l'ordine di scansione: deve essere intenzionale e provata con casi realistici.

// Fonte Figma 4954:69 · folio 527.
=== Gerarchia e asimmetria

#figura-griglia("379")

Una griglia gerarchica attribuisce aree differenti a contenuti con priorità diverse. In una pagina di notizie, un articolo principale può dominare, mentre aggiornamenti brevi occupano campi secondari. Le relazioni si costruiscono a partire dal contenuto, senza richiedere celle tutte uguali.

Nella @fig-griglia-379, la notizia principale occupa il campo più ampio e ha un titolo maggiore.

Aggiornamento e servizio condividono una verticale laterale. L'asimmetria riguarda la distribuzione delle masse; la coerenza dipende ancora da allineamenti e distanze.

Prima di introdurre una nuova misura conviene chiedersi quale differenza esprima. Se due elementi hanno lo stesso ruolo, misure arbitrarie possono suggerire una priorità inesistente. Se i ruoli sono diversi, una variazione motivata aiuta a riconoscerli.

// Fonte Figma 4954:70 · folio 528.
=== Progettare la doppia pagina

#figura-griglia("380")

Un libro aperto mostra due pagine insieme. Margini interni, posizione dei folio e rapporti fra immagini devono essere valutati anche in questa unità. Una figura sul dorso è una composizione unica, divisa dal limite fisico della rilegatura.

La @fig-griglia-380 mette a confronto un dettaglio essenziale sul dorso e lo stesso dettaglio spostato in un campo leggibile. Le due metà mantengono scala e quota; il soggetto viene collocato in modo da non dipendere dalla parte meno visibile.

La parità dei folio conta: la pagina pari è a sinistra, quella dispari a destra. Dopo un inserimento si ricontrollano tutti gli accoppiamenti interessati. Due immagini vicine nel file di lavoro non formano una doppia pagina di stampa se la numerazione le colloca su lati incompatibili.
]
#[
// Testi nativi della fonte corrente: prosa, corsivi, note e rimandi rimangono modificabili.
#import "../template/stile.typ": sito
#import "../template/griglia.typ": figura-griglia

// Fonte Figma 4954:71 · folio 529.
== Dal foglio al viewport

Sullo schermo la griglia descrive un comportamento: come si ridistribuiscono i contenuti quando lo spazio cambia.

#figura-griglia("381")

Il viewport è l'area nella quale il browser dispone la pagina. Per il layout conta la larghezza disponibile in pixel CSS, che può cambiare con finestra, orientamento e zoom della pagina.

La @fig-griglia-381 mostra ogni esempio in due larghezze: una misura resta fissa, una varia in modo fluido, due campi si ricompongono in verticale. Il progetto responsivo può combinare fluidità e cambi di disposizione: non è una categoria separata dal layout fluido.#sito([Google, macro layout responsivi.], "https://web.dev/learn/design/macro-layouts") <sito-grigliaMacro>

#figura-griglia("2024-104-web")

La @fig-griglia-2024-104-web raffigura una griglia su monitor, tablet e telefono. Le sagome mostrano formati diversi; per verificare l'adattamento del layout occorrono più larghezze dello stesso contenuto, come nel confronto precedente.

// Fonte Figma 4954:72 · folio 530.
=== Fisso, fluido e ibrido

#figura-griglia("382")

In un layout fisso una misura resta costante. In uno fluido alcune misure seguono lo spazio disponibile. Il layout ibrido combina i due comportamenti: per esempio un menu di larghezza stabile accanto a un'area di lavoro flessibile.

Nella @fig-griglia-382 il menu conserva la propria misura e il campo principale cambia larghezza.

Quando lo spazio non basta, occorre un'altra disposizione della navigazione.

Si chiama spesso adattivo un layout che passa fra poche larghezze prefissate, restando fisso fra le soglie. Il responsive può unire fluidità e cambi di regola: va provato anche alle larghezze intermedie.#sito([Google, layout adattivi e responsivi.], "https://web.dev/learn/design/intro") <sito-grigliaAdaptive>

Minimi, massimi e ritorno a capo pongono limiti alla fluidità: evitano righe troppo lunghe e campi troppo stretti.

// Il confronto conserva l'infografica storica e ne esplicita il limite concettuale.
La @fig-griglia-2024-105-responsive-adaptive presenta un confronto storico fra responsive e adaptive. L'associazione fra responsive e client-side, adaptive e server-side semplifica eccessivamente il tema: fluidità e configurazioni predisposte non determinano da sole dove venga eseguito il codice.

#figura-griglia("2024-105-responsive-adaptive", colonne: 2, altezza: 150mm)

// Dossi, p. 8: il limite massimo è sviluppato con un esempio autonomo,
// verificato sulla documentazione CSS; numeri e diagramma sono scelte editoriali.
=== Un contenitore fluido con un limite

#figura-griglia("materiali-contenitore")

Una pagina può allargarsi con la finestra senza lasciare che i contenuti crescano indefinitamente. Immaginiamo un campo centrato, con almeno 24 px CSS liberi per lato e una larghezza massima di 960 px. Fino al limite il campo segue lo spazio disponibile; oltre, aumenta lo spazio esterno.

#block(sticky: true)[Se $V$ è la larghezza disponibile, $m$ il margine minimo e $M$ il massimo scelto per il campo, nell'esempio vale]

$ W = min(V - 2 m, M). $

La @fig-griglia-materiali-contenitore confronta due condizioni. Con $V = 720 thin "px"$, il campo misura $672 thin "px"$ e i margini sono 24. Con $V = 1280 thin "px"$, il campo si ferma a 960 e restano 160 px per lato. Il calcolo presuppone un campo centrato, senza una barra laterale che sottragga altro spazio.

La proprietà CSS `max-width` pone un limite alla larghezza. Non sceglie da sola né la centratura né i margini e non richiede necessariamente una media query.#sito([MDN, larghezza massima di un elemento.], "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-width") <sito-grigliaMaxwidth> La disposizione delle schede può quindi restare uguale mentre cambia la larghezza del contenitore: raggiungere il massimo non equivale a introdurre un breakpoint.

I numeri dell'esempio non sono una misura consigliata per ogni sito. Si scelgono insieme a leggibilità delle righe, dettaglio delle immagini e spazio necessario ai controlli.

// Fonte Figma 4954:73 · folio 531.
=== Scegliere i punti di cambiamento

#figura-griglia("383", didascalia: [
  $240 + 240 + 24 + 24 + 24 = 552 thin "px"$ CSS nel contenitore. Sotto la soglia, le due schede passano a una per riga.
])

Un breakpoint è una soglia alla quale cambia una regola di layout. Si cerca dove il contenuto smette di funzionare, senza assumere che ogni categoria di dispositivo richieda una soglia propria.#sito([Google, media query e adattamento.], "https://web.dev/learn/design/media-queries") <sito-grigliaBreakpoints>

Nella @fig-griglia-383, due schede richiedono almeno 240 px CSS ciascuna, compresi bordi e spazi interni; l'intervallo è 24 e i margini laterali sono 24. Servono 552 px nel contenitore. Sotto questa larghezza le schede si impilano. La soglia coincide con quella del viewport soltanto se il contenitore ne occupa tutta la larghezza.

Il pixel CSS è un'unità logica e può corrispondere a più pixel fisici dello schermo.#sito([W3C, unità CSS e pixel del dispositivo.], "https://www.w3.org/TR/css-values-3/#absolute-lengths") Si provano larghezze appena sotto e sopra la soglia, testi lunghi e ingrandimento: 552 px risolve questo esempio, non ogni interfaccia.

Una media query sulla larghezza considera il viewport; una container query sulle dimensioni considera un contenitore antenato predisposto.#sito([MDN, query sulle dimensioni dei contenitori.], "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries") <sito-grigliaContainer> La stessa scheda può così assumere assetti diversi in una barra laterale e nel campo principale della stessa finestra. Si documentano la soglia e il contenitore di riferimento.

// Fonte Figma 4954:74 · folio 532.
=== Golden Grid System

#figura-griglia("384")

Il Golden Grid System di _Joni Korpi_ è un esempio storico di griglia fluida e ripiegabile. Il progetto parte da 18 colonne uguali: due servono come margini esterni e 16 restano disponibili per il layout. Queste possono essere raggruppate in 8 o 4 colonne.#sito([_Joni Korpi_, repository originale; codice MIT.], "https://github.com/jonikorpi/Golden-Grid-System")

La @fig-griglia-384 rende visibile l'accorpamento. I gruppi diventano più larghi mentre diminuisce il loro numero. Il nome del sistema non implica che la suddivisione segua la sezione aurea.

Il repository originale è archiviato: è utile per comprendere una logica progettuale e leggere le scelte del codice, senza assumere che costituisca la soluzione necessaria per un nuovo prodotto.

#figura-griglia("2024-101-ggs")

La @fig-griglia-2024-101-ggs mostra la presentazione originale del Golden Grid System. Il reticolo e gli esempi di ripiegamento affiancano la spiegazione delle colonne, degli intervalli e della griglia di base.

// Fonte Figma 4954:75 · folio 533.
=== IBM e la 2x Grid

#figura-griglia("385")

La 2x Grid di IBM usa una mini unità quadrata di 8 pixel e rapporti costruiti moltiplicando o dividendo per due. Il sistema descrive griglie fisse, fluide e ibride. Nella documentazione Carbon consultata, i breakpoint prevedono 4, 8 o 16 colonne.#sito([IBM Carbon, 2x Grid; versione consultata il 21 ottobre 2026.], "https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview") <sito-grigliaCarbon>

La @fig-griglia-385 mostra il principio di suddivisione, non tutte le specifiche del sistema. La misura di base coordina spazi e oggetti, mentre il numero di colonne può cambiare con la larghezza.

Questi valori appartengono a Carbon. Per un altro prodotto si valuta se sostengono i contenuti e i vincoli effettivi. Una scala condivisa riduce le decisioni ripetitive, ma va accompagnata da regole che descrivano occupazione delle colonne, spazi interni e comportamento dei componenti.

// Fonte Figma 4954:76 · folio 534.
=== Dalla griglia ai componenti

#figura-griglia("386")

La griglia della pagina e il layout interno di un componente operano a scale diverse. Una scheda può occupare quattro colonne della pagina, ma al suo interno deve ancora organizzare titolo, descrizione, stato e azione.

Nella @fig-griglia-386, le due schede accostano testi di lunghezza diversa. Ogni scheda mantiene il proprio ordine e cresce con il testo.

L'altezza segue il contenuto; il comando non viene collocato a una quota fissa che potrebbe sovrapporsi a una descrizione più lunga.

Nel web, CSS Grid coordina righe e colonne; una traccia è lo spazio fra due linee adiacenti della griglia, un'area può comprendere più celle. Flexbox organizza relazioni principalmente lungo un asse.#sito([W3C, CSS Grid Layout Module Level 1.], "https://www.w3.org/TR/css-grid-1/") Le guide del disegno non devono tradursi una per una in tracce CSS: si implementano regole capaci di accogliere anche contenuti imprevisti.

Per scegliere fra i due strumenti si può osservare una raccolta di cinque schede. Con tre tracce Grid uguali, le prime tre occupano la prima riga e le altre due restano allineate alle prime due colonne. Con Flexbox, consentendo agli elementi di crescere, le due schede dell'ultima riga possono invece dividersi tutta la larghezza: ogni riga distribuisce il proprio spazio.#sito([MDN, relazioni fra CSS Grid e altri metodi di layout.], "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods") <sito-grigliaGridFlex>

Nel catalogo, l'allineamento fra righe può rendere più facile confrontare campi omologhi. In un gruppo di azioni può essere utile che ogni riga occupi lo spazio disponibile. Conta la relazione da mantenere, insieme al comportamento con testi lunghi; il solo aspetto della prima riga non basta a scegliere.

#[
// Integrazione editoriale: immagini, risoluzione e ritaglio restano distinti.
#import "../template/stile.typ": sito
#import "../template/editoriale.typ": nota-compatta
#import "../template/griglia.typ": figura-griglia

// Celentano, p. 8: il problema del ritaglio diventa una verifica esplicita.
=== Adattare l'immagine, conservare il soggetto

#figura-griglia("materiali-immagini")

Quando una scheda passa da un campo largo a uno stretto, anche l'immagine deve conservare il proprio significato. Ridurre proporzionalmente un'immagine intera, ritagliarla e sostituirla con un'inquadratura diversa sono decisioni differenti.

Nella @fig-griglia-materiali-immagini, tre campi verticali contengono lo stesso paesaggio. Il primo conserva l'intera immagine e lascia spazio libero; il secondo riempie il campo, ma il ritaglio centrale perde il soggetto laterale. Il terzo sposta l'inquadratura per conservarlo. Il contenitore resta uguale: cambia ciò che il lettore può vedere.

Con `object-fit: contain` l'immagine mantiene le proporzioni e resta interamente visibile nel campo. Con `cover` mantiene le proporzioni e riempie il campo, tagliando l'eventuale eccedenza. `object-position` ne controlla l'allineamento.#nota-compatta([MDN, adattamento e posizione delle immagini.],
  ("https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit",
   "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-position"),
  etichetta: ("object-fit", "object-position")) <sito-grigliaObjectfit> Un punto focale utile in un formato può richiedere una scelta diversa in un altro: si controllano volti, testo nell'immagine e dettaglio discusso nella didascalia.

=== Risoluzione e inquadratura sono due scelte

Una fotografia può essere disponibile in più risoluzioni pur mostrando la stessa scena. In HTML, `srcset` descrive le risorse candidate; con descrittori di larghezza, `sizes` comunica lo spazio di visualizzazione previsto. Il browser usa queste informazioni nella scelta della risorsa. `sizes` non assegna la larghezza CSS dell'immagine #cite(<grigliaImages>).#sito([WHATWG, immagini adattabili nello standard HTML.], "https://html.spec.whatwg.org/multipage/images.html#adaptive-images")

Un caso diverso richiede un taglio dedicato: una fotografia d'insieme per il campo largo e un dettaglio riconoscibile per quello stretto. L'elemento `picture` può proporre sorgenti condizionate per questa direzione artistica. Fornire più pixel non recupera una parte del soggetto esclusa dal ritaglio.

Si provano insieme formato, risorsa e testo vicino. Se un'immagine spiega dove si trova un ingresso, quel punto deve restare visibile anche nella variante stretta. Se una didascalia confronta due oggetti, un ritaglio che ne conserva soltanto uno interrompe il discorso. La scelta dell'inquadratura appartiene quindi al progetto dei contenuti, oltre che alla gestione dello spazio.
]

// Fonte Figma 4954:77 · folio 535.
=== Ordine visivo e ordine di lettura

#figura-griglia("387")

Spostare un elemento con CSS Grid può cambiare la posizione visiva senza cambiare la sequenza del documento HTML. Lettura con tecnologie assistive e spostamento del focus con la tastiera possono allora seguire un ordine diverso da quello suggerito dalla composizione.#sito([W3C, CSS Grid: ordine e accessibilità.], "https://www.w3.org/TR/css-grid-1/#order-accessibility")

Nella @fig-griglia-387 i numeri identificano la sequenza 1–2–3, conservata quando i campi si impilano. L'ordine nel documento va progettato a partire dal significato; il posizionamento visivo non deve compensare una sequenza logica sbagliata.

Si verifica sull'interfaccia implementata: si legge la sequenza del documento, si percorrono i controlli con la tastiera e si confrontano entrambi con la disposizione visiva. I numeri del diagramma esplicitano una decisione; il disegno da solo non verifica il comportamento reale.

// Fonte Figma 4954:78 · folio 536.
=== Reflow e testo che cresce <griglia-reflow>

#figura-griglia("388")

WCAG 2.2, criterio 1.4.10 Reflow (AA), richiede per il contenuto a scorrimento verticale una larghezza equivalente a 320 px CSS, senza perdita di informazioni o funzionalità né scorrimento in due dimensioni. Una prova equivalente parte da 1280 px CSS con zoom al 400%. L'eccezione riguarda le parti che necessitano di due dimensioni, come una mappa, non l'intera pagina.#sito([W3C WAI, 1.4.10 Reflow (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html") <sito-grigliaReflow>

Nella @fig-griglia-388 lo stesso messaggio entra in un contenitore fisso e in uno che cresce. Il secondo conserva tutto il testo; il primo lo taglia.

Il criterio 1.4.4 Resize Text (AA) richiede testo ingrandibile fino al 200% con le normali funzioni del browser, senza richiedere tecnologie assistive e senza perdita di contenuti o funzionalità, salvo sottotitoli dei media e immagini di testo.#sito([W3C WAI, 1.4.4 Resize Text (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html") <sito-grigliaResize> Il criterio 1.4.12 Text Spacing (AA), nei contenuti che supportano tali proprietà, prova insieme questi valori minimi: interlinea 1,5 volte il corpo, spazio dopo i paragrafi 2 volte, fra lettere 0,12 e fra parole 0,16 volte.#sito([W3C WAI, 1.4.12 Text Spacing (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html") <sito-grigliaSpacing>

Si modificano queste quattro proprietà senza cambiare gli altri stili. Questi valori verificano l'adattamento alle preferenze dell'utente; non prescrivono lo stile iniziale. Reflow, ingrandimento e spaziatura sono prove distinte, da eseguire sul prodotto funzionante.
]
#[
// Testi nativi della fonte corrente: prosa, corsivi, note e rimandi rimangono modificabili.
#import "../template/stile.typ": sito
#import "../template/griglia.typ": figura-griglia

// Fonte Figma 4954:79 · folio 537.
== Proporzioni e rottura

Una regola compositiva è un'ipotesi da mettere alla prova. Anche la sua deroga deve avere un ruolo leggibile.

#figura-griglia("389")

Le proporzioni possono fornire un punto di partenza per dividere un campo. Terzi, metà e rapporti asimmetrici producono possibilità diverse; nessuno di essi stabilisce da solo dove debbano trovarsi i contenuti.

La @fig-griglia-389 confronta divisioni in terzi e divisioni auree sullo stesso rettangolo. Le linee non coincidono: i terzi corrispondono a circa 33,3% e 66,7%, le divisioni auree a circa 38,2% e 61,8%.#sito([Adobe, uso e limiti della regola dei terzi.], "https://www.adobe.com/creativecloud/photography/technique/rule-of-thirds.html") <sito-grigliaThirds>

// I due originali restano distinti; la spiegazione segnala le affermazioni non dimostrate.
#figura-griglia("2024-107-attenzione", colonne: 1)

Il documento non indica una ricerca a sostegno delle percentuali della @fig-griglia-2024-107-attenzione. Quei numeri non possono essere assunti come distribuzione generale dell'attenzione visiva.

#figura-griglia("2024-107-terzi")

La @fig-griglia-2024-107-terzi indica le quattro intersezioni dei terzi come punti di forza, ma chiama impropriamente «Area aurea» il campo centrale. Il confronto geometrico precedente permette di distinguere le due costruzioni.

// Fonte Figma 4954:80 · folio 538.
=== Aureo, _Fibonacci_ e spirale

#figura-griglia("390")

#block(sticky: true)[La sezione aurea divide un segmento in una parte maggiore $a$ e una minore $b$, con $a > b > 0$, in modo che]

$ (a + b) / a = a / b. $

#block(sticky: true)[Il rapporto è]

$ phi = (1 + sqrt(5)) / 2 approx "1,618". $

La parte maggiore occupa circa il 61,8% del totale.

Nella successione di _Fibonacci_, ogni termine dopo i primi due è la somma dei precedenti: $1, 1, 2, 3, 5, 8, 13$. I rapporti fra termini consecutivi si avvicinano a $phi$, senza essere tutti uguali a esso.

La @fig-griglia-390 distingue i quadrati di lati _Fibonacci_ dalla spirale costruita con quarti di cerchio. Questa costruzione approssima un andamento a spirale, ma non coincide esattamente con una spirale logaritmica aurea. Un diagramma matematico descrive relazioni precise; non certifica il valore estetico di una pagina o di un'opera.

#figura-griglia("2024-106-aureo")

La @fig-griglia-2024-106-aureo affianca rettangoli e andamento a spirale in una rappresentazione di _MPAstudio_. Si può confrontare il disegno con i quadrati e i quarti di cerchio appena descritti, mantenendo distinte proporzione aurea e costruzione approssimata della spirale.

// Fonte Figma 4954:81 · folio 539.
// La tavola aurea deve essere completata prima di passare all'opera successiva.

=== _April Greiman_, 1986

#figura-griglia("391")

In _DOES IT MAKE SENSE?_, per _Design Quarterly_ 133, _April Greiman_ combina nel 1986 corpo digitalizzato, immagini, segni e testi con scale differenti. L'opera si ripiega nel formato della rivista; la testimonianza dell'autrice descrive il passaggio da video a pixel.#sito([MoMA, scheda e testimonianza di _April Greiman_.], "https://www.moma.org/audio/playlist/297/4835")

Nella @fig-griglia-391, il corpo attraversa il campo mentre immagini e segni introducono altri centri di attenzione. Questa lettura osserva sovrapposizioni e cambi di scala; non dimostra che l'opera sia priva di struttura.

// Fonte Figma 4954:82 · folio 540.
=== Uscire dalla griglia con uno scopo

#figura-griglia("392", colonne: 1)

Una deroga è leggibile quando si riconosce il sistema dal quale si allontana. Un titolo può superare una colonna per introdurre una sezione; una figura può andare al vivo per rendere visibile un dettaglio; un elemento inclinato può segnalare un cambio di registro.

La @fig-griglia-392 conserva margini, corpo e allineamenti del testo, mentre un solo elemento attraversa due campi. L'eccezione ha un oggetto preciso. Se ogni elemento introduce una misura diversa, diventa difficile riconoscere sia la regola sia la sua deroga.

Dopo la variazione si verifica ancora la lettura: il titolo resta associato al paragrafo, la didascalia resta vicina alla figura e nessun dettaglio necessario cade nel taglio o nel dorso. L'intenzione espressiva non elimina questi vincoli; li rende parte della scelta.
]
#[
// Testi nativi della fonte corrente: prosa, corsivi, note e rimandi rimangono modificabili.
#import "../template/stile.typ": sito
#import "../template/griglia.typ": figura-griglia

// Fonte Figma 4954:83 · folio 541.
== Leggere, progettare, verificare

La qualità della griglia si valuta con i contenuti e con i compiti: leggere, confrontare, trovare e agire.

#figura-griglia("393")

Per analizzare una composizione conviene partire da ciò che è osservabile. Si individuano margini, inizi dei testi, quote ricorrenti e rapporti di prossimità. Si distinguono poi questi indizi dalle ipotesi sul reticolo usato dall'autore.

La @fig-griglia-393 segue tre passaggi: osservare, formulare un'ipotesi, verificarla con altri contenuti. Una sola immagine può suggerire una griglia; un insieme di pagine permette di capire quali riferimenti ritornano.

// Fonte Figma 4954:84 · folio 542.
=== Sara deve spostare un appuntamento

#figura-griglia("394")

_Sara_ ha prenotato una visita e deve cambiare giorno. Nell'esempio simulato, il primo assetto mette in evidenza una promozione e lascia il comando di modifica lontano dai dati della prenotazione. Il secondo raccoglie servizio, data e azione in una stessa area.

La @fig-griglia-394 confronta le due distribuzioni. Non cambia il servizio offerto: cambia la priorità assegnata ai contenuti.

Il titolo della prenotazione e la data diventano il punto di ingresso; l'azione segue le informazioni necessarie per riconoscere l'appuntamento.

Questa è un'ipotesi progettuale. La prova consiste nel chiedere di spostare la visita senza indicare il comando, osservando percorso, esitazioni ed esito. Se le persone non riconoscono la funzione, la sola vicinanza spaziale può non bastare: vanno rivisti anche etichetta e feedback.

// Fonte Figma 4954:85 · folio 543.
=== Scegliere una nuova data

#figura-griglia("395")

Nel passaggio successivo, _Sara_ deve confrontare giorni e orari disponibili. Un calendario offre una vista sintetica del mese; una lista può rendere più espliciti gli appuntamenti effettivamente selezionabili. La scelta dipende dalla quantità di date e dal compito.

La @fig-griglia-395 mostra una lista di giorni con lo stato selezionato. Dopo il giorno scelto, la sequenza prosegue con orari, riepilogo e conferma. Lo stato selezionato ha anche un'etichetta, così il significato non dipende soltanto dal colore.

La disposizione deve consentire di tornare alla scelta precedente senza perdere il contesto. Si provano tastiera, ingrandimento e testi lunghi: il focus deve restare visibile e lo stato selezionato deve essere comunicato anche dal controllo implementato. Una lista alternativa può facilitare la scelta quando la visione del mese non è necessaria al compito.

// Fonte Figma 4954:86 · folio 544.
=== Dall'interfaccia web al gioco

#figura-griglia("396")

In un'interfaccia di gioco, il reticolo deve tenere conto del campo visivo e del contenuto in movimento. Stato, obiettivo e comandi possono richiedere posizioni stabili, mentre l'area di gioco cambia continuamente.

La @fig-griglia-396 mostra un'interfaccia simulata: informazioni di stato in alto, obiettivo su un lato, azioni disponibili in basso. Il centro conserva spazio per l'azione. Il diagramma rappresenta una scelta di distribuzione, senza imitare un titolo commerciale specifico.

Si prova su rapporti di schermo differenti, con sottotitoli e messaggi di lunghezza variabile. Gli elementi non devono coprirsi né nascondere dettagli necessari. La griglia dell'interfaccia può coordinare i gruppi, ma la verifica richiede anche il gioco in movimento, la distanza di visione e i sistemi di controllo previsti.

// Lettura del confronto documentario conservato in Dossi, p. 9.
=== Leggere un confronto desktop e telefono

#figura-griglia("materiali-caso-responsive")

Le schermate storiche di Vogue Italia nella @fig-griglia-materiali-caso-responsive mostrano gli stessi contenuti editoriali in due disposizioni. La data di cattura non è attestata. Le viste permettono di leggere quella composizione, senza descrivere necessariamente il sito attuale.

Sul desktop la testata occupa un campo largo e il contenuto di copertina è affiancato al contributo _In the bag_. Nella vista per telefono la testata è più compatta e il secondo contributo compare sotto la copertina. Il titolo va su più righe. Si conservano soggetti e ruoli riconoscibili, mentre cambia la distribuzione dello spazio.

La riga di categorie visibile sul desktop non compare nella vista per telefono. L'icona del menu è però già presente in entrambe: queste immagini non dimostrano la trasformazione di una navigazione estesa in un'icona. Per verificare le voci disponibili e il loro ordine servirebbe anche aprire il menu.

Il confronto permette di osservare allineamenti, occupazioni e successioni, ma non rivela il numero esatto delle tracce CSS o il breakpoint usato. Le due viste sono parzialmente sovrapposte nel montaggio; ciò che resta coperto non può essere ricostruito dalla sola immagine. Si annotano queste limitazioni prima di proporre una griglia capace di riprodurre le relazioni osservate con altri contenuti.

// Fonte Figma 4954:87 · folio 545.
#figura-griglia("397", placement: bottom)

#esercizio(id: "ricomposizione", titolo: [Un esercizio di ricomposizione])[

Si prepara un piccolo insieme di contenuti: titolo di un incontro, presentazione di circa 80 parole, tre appuntamenti, un'immagine e una nota di servizio. Il materiale resta uguale in tutte le varianti.

La @fig-griglia-397 propone tre vincoli di partenza: una colonna continua, una gabbia a sei unità e una struttura modulare. Ogni soluzione deve indicare il primo ingresso, l'ordine di lettura e la posizione della nota. Una variante può usare una doppia pagina, purché la parità sia corretta.

Si confrontano poi le proposte alla stessa dimensione. Si cerca dove una riga diventa troppo lunga, dove un gruppo si spezza e dove una figura perde dettaglio. La discussione deve riferirsi a elementi osservabili: non basta definire una composizione più pulita o più interessante senza spiegare che cosa consente di leggere.

Si traduce poi una proposta in due larghezze di contenitore, conservando titolo, appuntamenti, immagine e nota. Prima di disporre gli elementi si dichiarano margini minimi, intervalli e larghezza massima. Se si usano dodici unità, si annota quante ne occupa ogni gruppo; nella variante stretta si verifica quali gruppi debbano impilarsi per restare leggibili.

La seconda prova riguarda l'immagine: si indica il dettaglio che deve restare riconoscibile e si confrontano un ridimensionamento proporzionale e un ritaglio. La consegna comprende la regola scelta e una condizione nella quale fallisce, per esempio una data su due righe o il soggetto escluso dal campo. Si corregge la regola e si ripetono entrambi i formati, così il confronto documenta anche il motivo della decisione.
]

// Fonte Figma 4954:88 · folio 546.
=== Una matrice di prove

#figura-griglia("398")

La verifica incrocia contenuti e condizioni. Un titolo corto non mette alla prova gli stessi limiti di uno su quattro righe; una finestra stretta non equivale a una larga con testo ingrandito.

La @fig-griglia-398 organizza quattro condizioni: larghezza ordinaria, ridotta, testo lungo e ingrandimento. Ogni cella richiede un esito su ordine, tagli, sovrapposizioni o accesso alle azioni. Si annotano passa/non passa, contenuto, larghezza e ingrandimento usati.

Poi si combinano i casi, per esempio testo lungo in una finestra stretta.

Per il libro si aggiungono scala di stampa, dorso e doppie pagine; per il web, sequenza del documento e tastiera. Le prove di accessibilità a pagina #ref(<griglia-reflow>, form: "page", supplement: none) hanno parametri specifici e vanno registrate separatamente. Una correzione ricorrente richiede di rivedere la regola comune e ricontrollare tutte le pagine o i componenti che la usano.

// Fonte Figma 4954:89 · folio 547.
=== Errori che la griglia non risolve

#figura-griglia("399")

Un reticolo regolare può contenere una gerarchia confusa. Una scheda perfettamente allineata può usare un'etichetta incomprensibile. Un'immagine può occupare il campo corretto e tagliare proprio il dettaglio discusso nel testo.

La @fig-griglia-399 ricompone tre relazioni: il titolo con il proprio paragrafo, l'azione con l'oggetto e la didascalia con la figura.

La correzione riguarda i rapporti semantici e spaziali, non soltanto l'aggancio alle linee.

Quando il contenuto non entra, si valuta prima come distribuirlo: un altro accorpamento, una pagina di continuazione, una figura più adatta o una diversa misura di lettura. Ridurre sistematicamente il corpo conserva l'ingombro ma sposta il problema sulla leggibilità. Una revisione efficace rende esplicita la causa e controlla tutte le sue occorrenze.

// Fonte Figma 4954:90 · folio 548.
=== Dal layout al flusso

#figura-griglia("400")

La griglia coordina lo spazio di una pagina o di una schermata. Nel progetto di un'interfaccia occorre collegare questi stati: da dove si arriva, quale azione è disponibile e che cosa accade dopo.

Nella @fig-griglia-400, lo scenario di _Sara_ termina con un esito esplicito: la modifica è riuscita e la nuova data compare nella schermata finale. La sequenza collega scelta e risultato. Prima della conferma si controlla la nuova data; dopo si deve poter riconoscere quale appuntamento è stato modificato.

Il passaggio al wireframe sviluppa queste relazioni fra schermate. Le decisioni spaziali restano utili, ma vengono lette insieme a navigazione, priorità e feedback. Una griglia funziona quando aiuta a comporre contenuti che conservano significato anche nel passaggio da uno stato al successivo.
]
#[
// Apparato con note locali: conserva la fascia riservata del corpo.
#import "../template/editoriale.typ": titolo-apparato, nota-compatta
#pagebreak(weak: true)
#page(columns: 1)[
#set text(size: 9pt, variations: (opsz: 9))
#set par(justify: false, leading: 2pt, spacing: 7pt)
// Le descrizioni bibliografiche della fonte restano prosa nativa.
// Autori, date e URL appartengono alla bibliografia APA e alle note.
#titolo-apparato[Lettura delle fonti]
#v(14pt)
#columns(2)[

#block(breakable: false)[
  #cite(<grigliaMuller>, form: "prose")

  Manuale di costruzione della griglia, con esempi sui rapporti fra formato, tipografia e organizzazione.
]

#block(breakable: false)[
  #cite(<grigliaMusica>, form: "prose")

  Fotolitografia, dono dell'artista. Riferimento documentario per il manifesto riprodotto nella @fig-griglia-365.
]

#block(breakable: false)[
  #cite(<grigliaUnigrid>, form: "prose")

  Ricostruzione istituzionale del progetto del 1977 e della prima brochure per Clara Barton del 1978. Comprende formati, pannelli, produzione e variazioni del sistema.
]

#block(breakable: false)[
  #cite(<grigliaGgs>, form: "prose")

  Descrizione e codice della griglia fluida: 18 colonne complessive, 16 utili, raggruppabili in 8 o 4; licenza MIT per il codice.
]

#block(breakable: false)[
  #emph("Carbon Design System: 2x Grid")#nota-compatta([IBM Carbon, 2x Grid; versione consultata il 21 ottobre 2026], ("https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview",), etichetta: ([Carbon\/2x-grid],)) <sito-grigliaCarbon-locale-24>

  Documentazione ufficiale di mini unità, logica di divisione, comportamenti e breakpoint. Le misure sono specifiche del sistema Carbon.
]

#block(breakable: false)[
  #cite(<grigliaCssgrid>, form: "prose")

  Definisce linee, tracce, celle e aree, oltre al rapporto fra posizionamento visivo e ordine del documento.
]

#block(breakable: false)[
  #cite(<grigliaGreiman>, form: "prose")

  Testimonianza dell'autrice sull'uso del video e del computer per la composizione del numero della rivista.
]

#block(breakable: false)[
  #emph("Macro layouts")#nota-compatta([Google, macro layout responsivi], ("https://web.dev/learn/design/macro-layouts",), etichetta: ([web.dev\/…\/macro-layouts],)) <sito-grigliaMacro-locale-25>

  Organizzazione globale della pagina e adattamento della disposizione allo spazio disponibile.
]

#block(breakable: false)[
  #emph("Media queries")#nota-compatta([Google, media query e adattamento], ("https://web.dev/learn/design/media-queries",), etichetta: ([web.dev\/…\/media-queries],)) <sito-grigliaBreakpoints-locale-26>

  Condizioni CSS per adattare la presentazione a larghezza, modalità di fruizione e preferenze dell'utente.
]

#block(breakable: false)[
  #emph("Understanding Success Criterion 1.4.10: Reflow")#nota-compatta([W3C WAI, 1.4.10 Reflow (AA)], ("https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",), etichetta: ([w3.org\/…\/reflow],)) <sito-grigliaReflow-locale-27>

  Spiega il requisito a 320 CSS pixel per contenuti a scorrimento verticale e le eccezioni per parti che richiedono una disposizione bidimensionale.
]

#block(breakable: false)[
  #emph("Understanding Success Criterion 1.4.4: Resize Text")#nota-compatta([W3C WAI, 1.4.4 Resize Text (AA)], ("https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html",), etichetta: ([w3.org\/…\/resize-text],)) <sito-grigliaResize-locale-28>

  Descrive il ridimensionamento del testo fino al 200% senza perdita di informazioni o funzionalità, con le eccezioni previste dal criterio.
]

#block(breakable: false)[
  #emph("Understanding Success Criterion 1.4.12: Text Spacing")#nota-compatta([W3C WAI, 1.4.12 Text Spacing (AA)], ("https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html",), etichetta: ([w3.org\/…\/text-spacing],)) <sito-grigliaSpacing-locale-29>

  Distingue i valori di prova delle spaziature dallo stile iniziale della pagina. L'applicazione delle preferenze non deve provocare perdita di contenuti o funzionalità.
]

#block(breakable: false)[
  #emph("How to use (& break) the rule of thirds in photography")#nota-compatta([Adobe, uso e limiti della regola dei terzi], ("https://www.adobe.com/creativecloud/photography/technique/rule-of-thirds.html",), etichetta: ([adobe.com\/…\/rule-of-thirds],)) <sito-grigliaThirds-locale-30>

  Divisione del campo in terzi come guida compositiva, da valutare in rapporto al soggetto.
]

#block(breakable: false)[
  #cite(<grigliaCssunits>, form: "prose")

  Definisce il pixel CSS e il suo rapporto con i pixel del dispositivo e le altre unità di misura.
]

#block(breakable: false)[
  #emph("Introduction")#nota-compatta([Google, layout adattivi e responsivi], ("https://web.dev/learn/design/intro",), etichetta: ([web.dev\/…\/intro],)) <sito-grigliaAdaptive-locale-31>

  Confronta layout fissi, fluidi, adattivi e responsivi; spiega la combinazione di fluidità e cambiamenti alle soglie.
]

#block(breakable: false)[
  #emph("CSS container queries")#nota-compatta([MDN, query sulle dimensioni dei contenitori], ("https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries",), etichetta: ([MDN\/Container\_queries],)) <sito-grigliaContainer-locale-32>

  Descrive l'adattamento dei componenti in base alle dimensioni di un contenitore antenato predisposto e il confronto con le media query.
]

#block(breakable: false)[
  #cite(<grigliaBoxSizing>, form: "prose")

  Definisce a quale riquadro si riferiscono le misure dichiarate: contenuto oppure contenuto, padding e bordo. Il margine resta esterno.
]

#block(breakable: false)[
  #emph("Grid system")#nota-compatta([Bootstrap 5.3, struttura e funzionamento del sistema a griglia], ("https://getbootstrap.com/docs/5.3/layout/grid/",), etichetta: ("https://getbootstrap.com/docs/5.3/layout/grid/",)) <sito-grigliaBootstrap-locale-33>

  Documenta la griglia configurabile a dodici colonne di Bootstrap 5.3, costruita con Flexbox. Le convenzioni del framework non sono prescrizioni universali.
]

#block(breakable: false)[
  #emph("max-width CSS property")#nota-compatta([MDN, larghezza massima di un elemento], ("https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-width",), etichetta: ([MDN\/max-width],)) <sito-grigliaMaxwidth-locale-34>

  Descrive il limite massimo della larghezza di un elemento, distinto dalla sua centratura e dalle soglie che cambiano la disposizione.
]

#block(breakable: false)[
  #emph("Relationship of grid layout to other layout methods")#nota-compatta([MDN, relazioni fra CSS Grid e altri metodi di layout], ("https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods",), etichetta: ([MDN\/Relationship\_with\_other\_layout\_methods],)) <sito-grigliaGridFlex-locale-35>

  Confronta il coordinamento bidimensionale di Grid con le righe indipendenti di Flexbox, includendo esempi con ritorno a capo.
]

#block(breakable: false)[
  #cite(<grigliaImages>, form: "prose")

  Distingue la scelta di risorse con risoluzioni diverse dalla direzione artistica; definisce srcset, sizes e picture.
]

#block(breakable: false)[
  #emph("object-fit CSS property")#nota-compatta([MDN, adattamento e posizione delle immagini], ("https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit", "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-position",), etichetta: ([MDN\/object-fit], [MDN\/object-position],)) <sito-grigliaObjectfit-locale-36>

  Definisce come il contenuto di un'immagine si adatta al proprio riquadro, conservando l'intero soggetto o ritagliando l'eccedenza.
]

#block(breakable: false)[
  #emph("object-position CSS property")#footnote(<sito-grigliaObjectfit-locale-36>)

  Descrive l'allineamento dell'immagine nel riquadro: il punto focale va verificato insieme al formato e alla didascalia.
]

]
]
]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#capitolo(..parametri-capitolo(7), testo)
