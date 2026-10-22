// I manifesti conservano il disegno originale, con prosa e apparati nativi.
#import "../../../template/editoriale.typ": testo-diritti
#import "../../../template/stile.typ": immagine, sito
#import "../../../template/campioni.typ": confronto
#import "../../../template/documenti.typ": dettaglio
#import "../../../template/doppia-pagina.typ": sagoma-pagina

=== Lettere disegnate per il manifesto

Nei manifesti italiani fra Otto e Novecento la parola può partecipare all’immagine attraverso un disegno specifico. Non è sempre utile cercare il nome di un font: il cartellonista può costruire le lettere per quell’opera, adattando il titolo e le indicazioni alla propria lingua figurativa. Osservare il documento permette di distinguere questa *scrittura progettata* da una composizione realizzata con un carattere riutilizzabile.

Nel manifesto _La Bohème_ del cartellonista _Adolf Hohenstein_, del 1895–1896 secondo la scheda della Morgan Library, il titolo possiede un andamento che appartiene all’opera. Le curve, l’ampiezza e la forma delle lettere vanno esaminate insieme, senza attribuire automaticamente la parola a un font contemporaneo dall’aspetto Liberty. In _Fisso l’idea_ del grafico _Marcello Dudovich_ la scritta prende un’altra presenza, più compatta e incisiva. Il catalogo delle Raccolte Bertarelli consente di identificare l’autore e il documento: la comparazione riguarda due modi concreti di dare una figura al titolo (@fig-tipo-317a e @fig-tipo-317b) @t06-boheme.#sito([The Morgan Library & Museum, La Bohème, Adolf Hohenstein, 1895–1896.], "https://www.themorgan.org/music-manuscripts-and-printed-music/284731") @t06-dudovich.#sito([Lombardia Beni Culturali, Fisso l’idea, Marcello Dudovich; scheda H0110-02150.], "https://www.lombardiabeniculturali.it/stampe/schede/H0110-02150/")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/assets/images/figure/tipografia/esempi/manifesti/dudovich-fisso-l-idea.jpg"),
  [_Fisso l’idea_: titolo e testo condensato.], diritti: [Marcello Dudovich; Civica Raccolta delle Stampe Achille Bertarelli.],
  alt: "Fisso l’idea: titolo e testo condensato.",
  
) <fig-tipo-317a>
],
[#immagine(path("/assets/images/figure/tipografia/esempi/manifesti/hohenstein-la-boheme-1895-1896.jpg"),
  [_La Bohème_, 1895–1896: altezze diverse nel titolo.], diritti: [Adolf Hohenstein; Officine Grafiche Ricordi.],
  alt: "La Bohème, 1895–1896: altezze diverse nel titolo.",
  
) <fig-tipo-317b>
],
  )
]

Nel _Campari_ della @fig-tipo-318, _Depero_ accosta la C incisa da un taglio triangolare alle A prive di traversa: curve e punte dialogano con la figura geometrica. L’identità del carattere dipende dal disegno e dal comportamento dei segni, non soltanto dalla loro dimensione. Le lettere possono sembrare meccaniche o dinamiche perché le osserviamo dentro una cultura figurativa e dentro l’opera specifica, non perché un angolo retto contenga per natura un’emozione @t06-depero-campari.#sito([Archivio Depero, Depero e Campari, 2019.], "https://depero.it/2019/10/30/depero-e-campari-2/")

#immagine(path("/assets/images/figure/tipografia/esempi/manifesti/depero-campari-1928.jpg"),
  [_Campari_, 1928: curve e angoli netti nel nome.], diritti: [Fortunato Depero; Archivio Depero / Campari.],
  alt: "Campari, 1928: curve e angoli netti nel nome.",
  
) <fig-tipo-318>

I tre esempi suggeriscono di guardare il passaggio dal *repertorio alla parola*. Un titolo breve consente interventi che sarebbero faticosi nel testo continuo; la modifica può arrivare fino a rendere una lettera parte della scena. Rimane però una *soglia di riconoscimento*: chi guarda deve poter ricostruire la parola oppure deve essere messo intenzionalmente nella condizione di scoprirla. Quando riprendiamo queste strategie in un progetto nuovo, dobbiamo chiarire se stiamo disegnando un lettering, usando un font display o trasformando un titolo in immagine. Sono *operazioni differenti*, anche quando il risultato sembra simile.



// L'annuncio originale ha uno sfondo trasparente. Lo stesso algoritmo alpha
// compone un corpo unico nelle due colonne del foglio; il seguito può continuare.
// cite() conserva autore–anno e link nativi, permettendo l'a capo nella sagoma.
#sagoma-pagina(
  id: "fig-tipo-319c",
  file: path("/assets/images/figure/tipografia/esempi/manifesti/olivetti-lettera-32-annuncio.png"),
  profilo: json(path("/assets/dati/sagome/olivetti-lettera-32-annuncio.json")),
  larghezza: 240pt,
  // Il primo pixel visibile tocca il bordo sinistro del foglio; l'originale
  // conserva tutto il marchio e il margine trasparente fuori pagina.
  al-vivo-sinistro: true,
  fondo-immagine: 15mm + 240pt * 425 / 611,
  didascalia: [Olivetti Lettera 32: il nome compatto del modello si distingue dal marchio Olivetti e dalle due righe che lo accompagnano.
    #v(4pt)#testo-diritti[Olivetti; Associazione Archivio Storico Olivetti.]],
  alt: "Annuncio Olivetti Lettera 32: cerniera aperta, macchina e nome del modello, su fondo trasparente.",
)[
=== Olivetti e Barilla: marchio e messaggio

La comunicazione Olivetti offre molti esempi in cui le lettere assumono una presenza autonoma. Nel lavoro del grafico _Giovanni Pintori_ possono diventare segni, aggregazioni e figure, mantenendo un rapporto con il prodotto che produce o elabora scrittura. Il testo dell’annuncio e il nome Olivetti non devono necessariamente assumere lo stesso aspetto. Un modello di macchina, uno slogan e una firma richiedono *rapporti diversi fra parola e riconoscimento* #cite(<t06-olivetti22>).#sito([Associazione Archivio Storico Olivetti, Lettera 22: progetto e pubblicità.], "https://www.archiviostoricolivetti.it/museo-digitale/lettera-22/")

L’Archivio Storico Olivetti documenta manifesti per la Lettera 22 e altri progetti di _Pintori_. Nel confronto tipografico conviene seguire il disegno del nome del prodotto, le differenze di cassa e l’eventuale passaggio fra serif e sans serif, evitando di ridurre l’analisi alla posizione dei testi. Ci interessa come le lettere rendano diversi i registri del messaggio e come il nome della marca resti riconoscibile attraverso applicazioni differenti (@fig-tipo-319c, @fig-tipo-319a e @fig-tipo-319b) #cite(<t06-olivetti-portatili>).#sito([Associazione Archivio Storico Olivetti, Dalla MP1 alla Valentine, passando per la Lettera 22 e 32.], "https://www.storiaolivetti.it/articolo/55-dalla-mp1-alla-valentine-passando-per-la-letter/")


]



#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/assets/images/figure/tipografia/esempi/manifesti/pintori-olivetti-lettera-22-piramide-lettere-nome-corsivo.jpg"),
  [Olivetti Lettera 22: piramide di lettere e nome del modello in corsivo.], diritti: [Giovanni Pintori; Associazione Archivio Storico Olivetti.],
  alt: "Olivetti Lettera 22: macchina verde, piramide di lettere e nome del modello in corsivo.",
  
) <fig-tipo-319a>
],
[#immagine(path("/assets/images/figure/tipografia/esempi/manifesti/pintori-olivetti-lettera-22-onde-colorate-nome-tondo.jpg"),
  [Olivetti Lettera 22: onde colorate e nome del modello in tondo pesante.], diritti: [Giovanni Pintori; Associazione Archivio Storico Olivetti.],
  alt: "Olivetti Lettera 22: onde colorate, macchina di profilo e nome del modello in tondo pesante.",
  
) <fig-tipo-319b>
],
  )
]

Nel lavoro del grafico e architetto _Erberto Carboni_ per Barilla, documentato dall’archivio aziendale, la continuità coinvolge anche il lettering. La scritta del marchio mantiene una forma definita, mentre lo slogan può assumere un’altra inclinazione, un altro ritmo e un altro tratto. Il manifesto del 1952 (@fig-tipo-320a) «Con pasta Barilla è sempre domenica» permette di confrontare due scritture senza confonderle: quella che identifica il prodotto e quella che formula la promessa dell’annuncio @t06-gonizzi2000.#sito([Giancarlo Gonizzi (a cura di), Pasta on Exhibition, Archivio Storico Barilla, 2000.], "https://www.archiviostoricobarilla.com/wp-content/uploads/2019/04/Pasta_on_Exhibition.pdf")

// La lettura dei manifesti Barilla riprende nel flusso ordinario.
Il corsivo non è una sola categoria espressiva. Può indicare un gesto rapido, ricordare una firma, rendere più continua una parola o costruire un richiamo a una scrittura quotidiana. Nel secondo manifesto Barilla (@fig-tipo-320b), «vera pasta all’uovo» è in tondo e «con cinque uova per chilogrammo» in corsivo. Il confronto con Olivetti suggerisce una distinzione: *l’unità dell’identità* non richiede che ogni frase abbia il medesimo disegno. Richiede che la *variazione sia intenzionale* e che il ruolo di ciascuna scrittura rimanga comprensibile @t06-salce-barilla.#sito([Museo nazionale Collezione Salce, inventario12826, Barilla vera pasta all’uovo.], "https://catalogo.beniculturali.it/detail/HistoricOrArtisticProperty/0500670436")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#figure([
      #image(path("/assets/images/figure/tipografia/esempi/manifesti/carboni-barilla-sempre-domenica-1952.jpg"), width: 187.09pt,
        alt: "Con pasta Barilla è sempre domenica: annuncio completo del1952.")
      #v(10pt)
      #dettaglio(path("/assets/images/figure/tipografia/esempi/manifesti/carboni-barilla-sempre-domenica-1952.jpg"),
        width: 187.09pt, height: 87.309pt, originale-width: 532.487pt, originale-height: 160.706pt,
        dx: -328.13pt, dy: -71.96pt, alt: "Barilla: ingrandimento del nome nello stesso annuncio.")
      #v(10pt)
      #dettaglio(path("/assets/images/figure/tipografia/esempi/manifesti/carboni-barilla-sempre-domenica-1952.jpg"),
        width: 187.09pt, height: 54.019pt, originale-width: 292.493pt, originale-height: 88.275pt,
        dx: 0pt, dy: 0pt, alt: "Dettaglio dello slogan nello stesso annuncio Barilla.")
    ], kind: image, caption: [_Con pasta Barilla è sempre domenica_, 1952: annuncio e ingrandimenti del marchio e dello slogan.
      #v(4pt)#testo-diritti[Erberto Carboni; Archivio Storico Barilla.]
    ]) <fig-tipo-320a>],
    [#immagine(path("/assets/images/figure/tipografia/esempi/manifesti/carboni-barilla-pasta-all-uovo-1952-1953.png"),
  [_Barilla vera pasta all’uovo_, circa 1952–1953: nome calligrafico, frase in tondo e slogan in corsivo.], diritti: [Erberto Carboni; Museo nazionale Collezione Salce, inventario12826.],
  alt: "Barilla vera pasta all’uovo, circa 1952–1953: nome calligrafico, frase in tondo e slogan in corsivo.",
  
) <fig-tipo-320b>
],
  )
]
