// Prova temporanea e autonoma, con la gabbia e i componenti del volume.
#import "../template/layout.typ": booklet, chapter
#import "../template/plan.typ": chapter-parameters
#import "../template/figures.typ": image-figure
#import "../template/geometry.typ": page-width, grid-width, grid-bottom, footnote-space, footnote-gap

#let content = [
== Immagine in una colonna

La @fig-prova-posizionamento-colonna accompagna un breve testo sull’inquadratura. L’immagine e la didascalia occupano la stessa colonna. Il testo prosegue nella pagina e passa a destra quando arriva al fondo della colonna sinistra.

#image-figure(
  path("/progetti/booklet/assets/figure-singole/composizione/sguardo-ritratto.jpeg"),
  [Paesaggio con griglia dei terzi. L’albero è vicino alla verticale destra, mentre il rilievo occupa il lato opposto.],
  format: "una-colonna", placement: none,
  id: "fig-prova-posizionamento-colonna",
  alt: "Paesaggio con campo fiorito, montagna a sinistra e albero a destra, sotto una griglia di tre righe e tre colonne.",
)

Alla larghezza di una colonna si riconoscono ancora i soggetti e la griglia. La didascalia va a capo sotto la fotografia e il suo margine sinistro coincide con quello dell’immagine. La vicinanza dei due elementi permette di ritrovare il dettaglio descritto durante la lettura.

Il richiamo può comparire anche quando la figura è già entrata nella pagina. Il suo compito è indicare a quale immagine tornare e, nella versione digitale, portare direttamente alla visuale.

== Immagine su due colonne

La @fig-prova-posizionamento-gabbia occupa tutta la gabbia. I due impaginati vanno osservati insieme per confrontare la posizione dei blocchi. A questa scala si distinguono sia le etichette sia gli allineamenti. La didascalia segue la larghezza dell’insieme.

#image-figure(
  path("/risorse-condivise/immagini/figure/griglia/diagrammi/359-contenuti-allineamenti-intervalli.svg"),
  [Gli stessi contenuti prima e dopo la scelta di allineamenti e intervalli comuni.],
  format: "due-colonne", placement: top,
  id: "fig-prova-posizionamento-gabbia",
  alt: "Due schemi affiancati mostrano gli stessi blocchi, prima con posizioni libere e poi su allineamenti comuni.",
)

Una figura larga può aprire la pagina. Il testo riprende sotto la didascalia, dalla colonna sinistra alla destra. Confrontare i bordi della figura con quelli del testo permette di verificare che condividano la stessa gabbia.

== Testo intorno a una sagoma

#image-figure(
  path("/progetti/booklet/assets/forme-naturali-scontornate/immagini/foglia.png"),
  [Foglia con nervatura centrale e venature diagonali.],
  format: "sagoma", id: "fig-prova-posizionamento-sagoma",
  profile: json(path("/progetti/booklet/assets/forme-naturali-scontornate/profili/foglia.json")),
  width: 70pt, side: right,
  rights: [CVeDI, 2026.],
  alt: "Foglia verde intera, con nervatura centrale e venature diagonali, su fondo trasparente.",
)[
  Nella @fig-prova-posizionamento-sagoma la foglia si inserisce a destra. Le righe si accorciano dove incontrano il profilo e recuperano la larghezza della colonna sotto l’immagine. Il margine di rispetto lascia spazio tra il bordo della foglia e le parole. La didascalia e il credito completano la figura e il testo riprende alla larghezza ordinaria.
]

Alla scala di stampa, controllare il distacco tra le righe e la parte più larga della foglia. La nota esplicativa permette di verificare anche lo spazio al piede.#footnote[Nota campione per verificare il distacco dal corpo e la posizione rispetto al folio.]

La sagoma lascia spazio a sinistra per l’inizio del paragrafo. Se l’immagine cresce, meno parole trovano posto in ogni riga e il passaggio alla larghezza normale si sposta più in basso. Vale la pena provare due misure con lo stesso testo e confrontare dove cadono le parole più lunghe.

Il bordo inferiore della foglia e la fine del paragrafo si trovano a quote diverse. In questa prova la didascalia segue il paragrafo e il credito resta subito sotto. Il gruppo si distingue dal testo nella colonna a fianco e dalla nota al piede.

#image-figure(
  path("/risorse-condivise/immagini/figure/griglia/diagrammi/370-anatomia-doppia-pagina.svg"),
  [Un solo schema attraversa il dorso. Colonne, fasce e moduli si leggono alla stessa scala sui due fogli.],
  format: "doppia-pagina", id: "fig-prova-posizionamento-doppia",
  dimensions: (964, 300),
  alt: "Schema di due pagine affiancate che mostra margini, colonne, intercolonne, fasce e moduli.",
  left-body: [
    == Immagine sulla doppia pagina

    La @fig-prova-posizionamento-doppia comincia sul foglio sinistro e prosegue sul destro. Il testo resta sopra la visuale, dentro i margini. La didascalia sul primo foglio introduce lo schema e il rinvio sul secondo lo collega alla stessa figura.

    Osservando i due fogli insieme si possono confrontare i margini verso il dorso con quelli esterni. Le fasce del disegno offrono riferimenti per verificare che le due metà siano alla stessa altezza.
  ],
  right-body: [
    == Verifica sul foglio destro

    La fascia inferiore prosegue oltre la piega. Per verificare la continuità si accostano le due pagine con i bordi interni a contatto e si controlla che le linee orizzontali si incontrino. Il testo e il folio occupano la propria posizione su ciascun foglio.

    Una prova stampata può essere piegata o rilegata prima di decidere il ritaglio. Le scritte e i dettagli che servono alla lettura vanno tenuti a distanza dalla parte di immagine che può finire nella piega.

    La @fig-prova-posizionamento-pagina occupa un foglio dedicato. Il manifesto mantiene le sue proporzioni, con la didascalia sotto l’immagine e il folio al piede.
  ],
)

#image-figure(
  path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-120-01-source-01.png"),
  [_Ernst Scheidegger_, manifesto della Nona Triennale di Milano, 1951.],
  format: "tutta-pagina", id: "fig-prova-posizionamento-pagina",
  rights: [_Ernst Scheidegger_.],
  alt: "Manifesto della Nona Triennale di Milano di Ernst Scheidegger, 1951, con il numero e i testi disposti tra campiture di colore.",
)

== Al bordo esterno

La @fig-prova-posizionamento-esterno arriva fino al bordo esterno del foglio. La didascalia rientra nella gabbia e segue lo stesso margine del testo. In una pagina destra l’immagine arriva fino a destra. In una pagina sinistra la composizione si specchia.

#image-figure(
  path("/risorse-condivise/immagini/figure/composizione-slidev/squint.svg"),
  [Lo stesso invito, in versione leggibile e sfocata, per confrontare i pesi visivi.],
  format: "al-vivo-esterno", placement: top,
  id: "fig-prova-posizionamento-esterno",
  rights: [CVeDI, 2026. Diagramma simulato.],
  alt: "Due inviti alla stessa scala, uno leggibile e uno sfocato, per confrontare masse, contrasti e raggruppamenti.",
)

#colbreak()

== Capolettera

#image-figure(
  path("/risorse-condivise/immagini/figure/storia-del-design/iniziale-n-scuola-medievale-docente.png"),
  none, format: "capolettera", id: "iniziale-prova-posizionamento",
  profile: json(path("/risorse-condivise/dati/sagome/iniziale-n-scuola-medievale-docente.json")),
  width: 64pt, letter: "N",
)[
ella prima parola del paragrafo, l’iniziale illustrata completa il testo. Le prime righe scorrono accanto alla N e tornano alla larghezza della colonna dopo il margine di rispetto. L’iniziale si legge insieme al resto della parola.
]

Il capolettera occupa lo spazio di più righe. Alla scala di stampa si può verificare che l’inizio del paragrafo resti riconoscibile e che il testo torni ad allinearsi con i capoversi successivi.

== Immagine al vivo sui quattro lati

La @fig-prova-posizionamento-vivo occupa il foglio successivo fino al taglio. La miniatura e la didascalia qui sotto anticipano l’opera e rimandano alla pagina che la ospita.

Nel manifesto a pagina intera, il foglio ospita anche la didascalia e il folio. Qui la didascalia è già sulla pagina di lettura e il foglio seguente è riservato alla sola immagine. Sfogliando avanti e indietro, la miniatura aiuta a ritrovare il punto in cui è presentata. Il rimando indica il folio corrispondente anche quando il numero non compare sopra l’immagine.

#image-figure(
  path("/risorse-condivise/immagini/figure/gestalt/07-vicinanza-altre-immagini-e-grafiche.png"),
  [Nature Valley Fruit Crisps. Le chips disposte una vicina all’altra suggeriscono la forma di un albero.],
  format: "al-vivo", id: "fig-prova-posizionamento-vivo",
  rights: [Campbell Mithun · Nature Valley Fruit Crisps.],
  alt: "Annuncio Nature Valley Fruit Crisps con chips che formano la chioma di un albero.",
)

In una prova stampata, si controlla prima l’intero perimetro. La campitura arriva ai bordi e il soggetto rimane leggibile quando il foglio è rifilato. I dettagli da preservare si possono individuare sull’originale, segnando le scritte, il marchio e gli elementi che spiegano la figura. Nell’annuncio la chioma, il prodotto e il nome devono restare riconoscibili come parti dello stesso insieme.

La didascalia ha una sua posizione al piede. Il filetto la separa dal testo e la miniatura mantiene le proporzioni dell’immagine. Il credito resta con la didascalia. In PDF il rimando conduce direttamente al foglio al vivo, così il collegamento è utile anche quando si leggono le pagine una alla volta.

#image-figure(
  path("/risorse-condivise/immagini/figure/tipografia/storia/cassa-caratteri-mobili-scomparti.png"),
  [Cassa a scomparti e tipi mobili. L’illustrazione attraversa il dorso della doppia pagina.],
  format: "sagoma-doppia", id: "fig-prova-posizionamento-sagoma-doppia",
  profile: json(path("/risorse-condivise/dati/sagome/cassa-caratteri-mobili-scomparti.json")),
  width: 440pt, image-start: page-width - 220pt,
  image-bottom: grid-bottom - footnote-space - footnote-gap,
  alt: "Cassa di legno a scomparti con caratteri mobili e tipi metallici separati, disposta sul dorso di due pagine.",
)[
  == Sagoma sulla doppia pagina

  Un’unica immagine occupa parte di entrambi i fogli. Le quattro colonne si leggono in sequenza. Si scende lungo le due colonne di sinistra, si gira lo sguardo verso il foglio destro e si legge fino all’ultima riga disponibile.

  La cassa dei caratteri mobili alleggerisce il bordo superiore con alcuni elementi isolati. La sagoma del contenitore si allarga più in basso. Le righe di testo sfruttano le zone libere e si fermano dove il margine di rispetto diventerebbe troppo stretto. Il passaggio successivo riprende nella colonna seguente.

  Sulla pagina di sinistra il bordo della cassa entra dalla parte del dorso. La colonna più esterna conserva più spazio nella zona inferiore. Si può seguire il percorso dalla prima frase fino alla didascalia. Il numero di figura identifica le due parti dell’illustrazione con un’unica descrizione.

  Avvicinando le pagine si verifica che gli scomparti coincidano lungo il taglio interno. In una stampa rilegata, una striscia dell’illustrazione può scomparire nella piega. Conviene appoggiare il foglio aperto su un piano e controllare quali dettagli restano visibili con una normale apertura del libro.

  Sulla pagina di destra il profilo occupa la parte bassa verso il dorso. La colonna esterna offre spazio per le ultime righe. Qui si può osservare se la ripresa della lettura è chiara anche quando la forma non è simmetrica e lascia quantità di spazio diverse sui due lati.

  Anche il bianco conta. La prima riga dopo un’interruzione deve poter essere trovata senza confonderla con la didascalia o con un elemento dentro l’immagine. Una prova a grandezza reale rende visibili la distanza tra il testo e il profilo, il salto tra le colonne e il passaggio da un foglio all’altro.

  Per confrontare due varianti si può spostare la cassa un po’ più in alto. La nuova posizione cambia subito il numero di righe che entrano sopra l’immagine e accanto agli scomparti. Si giudica l’esito seguendo il paragrafo dall’inizio alla fine, con particolare attenzione ai punti in cui il testo cambia regione.

  Infine, si controlla il piede della doppia pagina. La cassa termina sopra la fascia delle note, e i numeri di pagina rimangono allineati ai rispettivi margini esterni. Queste quote sono riferimenti utili quando cambiano la lunghezza del testo o la scala della visuale.
]

#image-figure(
  path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/olivetti-lettera-32-annuncio.png"),
  [Annuncio Olivetti Lettera 32. La cerniera aperta incornicia la macchina per scrivere.],
  format: "sagoma-pagina", id: "fig-prova-posizionamento-sagoma-pagina",
  profile: json(path("/risorse-condivise/dati/sagome/olivetti-lettera-32-annuncio.json")),
  width: 200pt, image-start: grid-width - 200pt, image-bottom: 133mm,
  rights: [Olivetti; Associazione Archivio Storico Olivetti.],
  alt: "Annuncio Olivetti Lettera 32 con cerniera, macchina per scrivere e nome del modello su fondo trasparente.",
)[
  == Sagoma su una pagina

  L’annuncio entra nella gabbia come un’immagine scontornata. Il testo appartiene a un unico flusso e occupa lo spazio disponibile nelle due colonne. Nella prima si controlla come termina la lettura in basso. Nella seconda si osserva come le righe riprendono sopra, accanto e sotto l’immagine.

  La cerniera allarga l’annuncio sopra la macchina. Quando il profilo lascia spazio sufficiente, una riga può continuare accanto alla figura. Nelle zone più occupate serve invece interrompere la regione di testo e riprendere più in basso. Gli intervalli bianchi appartengono alla forma della pagina e rendono visibili i passaggi tra queste regioni.

  Durante la lettura si può tenere il dito sul margine sinistro di ogni regione. Sopra la sagoma le righe cominciano allo stesso punto. Dove compare l’annuncio, il profilo modifica lo spazio disponibile. Sotto, la colonna ritorna alla sua misura e permette di leggere il seguito senza cercare un nuovo inizio.

  La didascalia identifica il modello e il credito ne documenta la provenienza. Nel PDF il numero di figura conduce all’immagine. Nel foglio stampato, la posizione della didascalia lascia libero il corpo della colonna accanto all’annuncio.

  Le ultime righe possono arrivare sotto la macchina. In quella zona torna utile osservare la distanza tra il corpo del testo e le scritte della pubblicità. Il nome del modello appartiene all’immagine. Il paragrafo mantiene la propria misura e la consueta interlinea.
]
]

// Riusa le quote e l'illustrazione di Griglie, con un titolo da campione.
#let opening = chapter-parameters(7)
#let composition = opening.composition
#let title = composition.titolo
#title.insert("corpo", 88)
#composition.insert("titolo", title)
#composition.insert("a_capo_dopo", 2)
#composition.insert("numero", 10)
#let sample = opening + (number: 10, title: "Prova di impaginazione",
  composition: composition, sources: none)

#show: booklet
#chapter(..sample, content)
