// Cinema e videogiochi: i fotogrammi conservano la propria versione e funzione.
#import "../../../template/stile.typ": immagine, sito
#import "../../../template/editoriale.typ": nota-compatta, testo-diritti
#import "../../../template/campioni.typ": confronto, dettaglio-figura
#import "../../../template/documenti.typ": dettaglio, tavola-documentaria

=== La tipografia nel cinema e nelle serie

Nel cinema il carattere può essere incontrato prima che inizi la storia e può contribuire a prepararne il registro. I titoli di testa assegnano alla scrittura un tempo, una comparsa e una trasformazione. La lettera non occupa soltanto uno spazio: attraversa il campo, si ricompone oppure scompare. Il confronto va quindi condotto sulla sequenza e non esclusivamente su un fotogramma isolato.

Prima dei titoli di testa, locandine e materiali promozionali assegnano al film una voce tipografica. *Trajan*, disegnato da _Carol Twombly_ per Adobe nel 1989, riprende le capitali dell’iscrizione alla base della Colonna Traiana a Roma. La Brown University Library ne documenta l’impiego nella promozione cinematografica e mette a confronto le lettere dell’iscrizione con il carattere digitale @t06-trajan2012.#nota-compatta([btylr (2012), Brown University Library; Adobe Fonts, Trajan.], ("https://library.brown.edu/dps/curio/from-caesar-monuments-to-movie-posters/", "https://fonts.adobe.com/fonts/trajan")) Il campione della @fig-tipo-trajan mostra la successiva famiglia *Trajan Pro 3*: osserviamo le proporzioni delle maiuscole, le grazie e la variazione dei pesi. La stessa origine lapidaria può entrare nella comunicazione di racconti e ambientazioni differenti; il suo significato dipende anche dalle immagini e dalle parole che la accompagnano.

// Campione autentico pubblicato da Adobe: la versione Pro 3 resta distinta
// dal primo Trajan del 1989 e dai documenti cinematografici storici.
#immagine(path("/assets/images/figure/tipografia/esempi/cinema/trajan-pro-3-sei-pesi-specimen-adobe.jpeg"),
  [Trajan Pro 3: sei pesi, da ExtraLight a Black, nello specimen ufficiale Adobe. Le linee a destra rendono visibile il diverso spessore.],
  diritti: [Carol Twombly e Robert Slimbach / Adobe Originals. Campione Adobe Fonts.],
  alt: "Trajan Pro 3: i nomi ExtraLight, Light, Regular, Semibold, Bold e Black composti nei sei pesi, con linee di diverso spessore a destra.",
) <fig-tipo-trajan>

Il lavoro del grafico _Saul Bass_ per il regista _Alfred Hitchcock_ mostra come progettare il movimento dei titoli. In _North by Northwest_ del 1959 i blocchi di testo si muovono secondo direzioni riconoscibili e si confrontano con le linee dell’immagine (@fig-tipo-325a e @fig-tipo-325b); in _Psycho_ del 1960 (@fig-tipo-324a) la frammentazione e la ricomposizione delle parole producono una tensione visiva @t06-bass-psycho.#sito([Alliance Graphique Internationale, Saul Bass, _Psycho_,1960.], "https://a-g-i.org/design/psycho") Qui interessa il *comportamento della scrittura*, senza attribuire al solo nome del font l’effetto dell’intera sequenza. La collezione dell’Academy conserva materiali che documentano il lavoro di _Bass_ e dei suoi collaboratori.  @t06-bass-academy.#sito([Academy Film Archive, Saul Bass Collection.], "https://www.oscars.org/film-archive/collections/saul-bass-collection") @t06-bass-north.#sito([Alliance Graphique Internationale, Saul Bass, _North by Northwest_,1959.], "https://a-g-i.org/design/north-by-northwest")

#confronto[
  #figure([
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      dettaglio(path("/assets/images/figure/tipografia/esempi/cinema/saul-bass-psycho-sequenza-1960.jpg"),
        width: 187.09pt, height: 48pt, originale-width: 1573.68pt, originale-height: 891.12pt,
        dx: -167.15pt, dy: -419.19pt, alt: "PSYCHO: titolo integro in un fotogramma originale della sequenza."),
      dettaglio(path("/assets/images/figure/tipografia/esempi/cinema/saul-bass-psycho-sequenza-1960.jpg"),
        width: 187.09pt, height: 48pt, originale-width: 1573.68pt, originale-height: 891.12pt,
        dx: -690.92pt, dy: -419.19pt, alt: "PSYCHO: lo stesso titolo frammentato in un altro fotogramma originale."),
    )
  ], kind: image, caption: [_Psycho_,1960: il titolo integro e frammentato. Dettagli dai fotogrammi AGI.
    #v(4pt)#testo-diritti[Titoli Saul Bass; regia Alfred Hitchcock. Riproduzione: Alliance Graphique Internationale.]
  ]) <fig-tipo-324a>
]



#immagine(path("/assets/images/figure/tipografia/esempi/cinema/saul-bass-north-by-northwest-titolo-1959.jpg"),
  [_North by Northwest_,1959: fotogramma con titolo e linee diagonali.], diritti: [Saul Bass; Metro-Goldwyn-Mayer; archivio Alliance Graphique Internationale.],
  alt: "North by Northwest,1959: fotogramma con titolo e linee diagonali.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-325a>

// Tavola autonoma440: i due documenti restano insieme su un foglio ordinario.
#tavola-documentaria[
#immagine(path("/assets/images/figure/tipografia/esempi/cinema/saul-bass-north-by-northwest-nove-fotogrammi-1959.jpg"),
  [_North by Northwest_,1959: nove fotogrammi, dalle linee ai titoli alla scena urbana.], diritti: [Saul Bass; Metro-Goldwyn-Mayer; archivio Alliance Graphique Internationale.],
  alt: "North by Northwest,1959: nove fotogrammi, dalle linee ai titoli alla scena urbana.",
  
) <fig-tipo-325b>

#immagine(path("/assets/images/figure/tipografia/esempi/cinema/imaginary-forces-stranger-things-titolo.jpg"),
  [_Stranger Things_: il titolo a contorno rosso nella sequenza d’apertura.], diritti: [Imaginary Forces per Netflix; direzione creativa Michelle Dougherty.],
  alt: "Stranger Things: il titolo a contorno rosso nella sequenza d’apertura.",
  
) <fig-tipo-326>

]

_Stranger Things_ introduce, nella @fig-tipo-326, un’altra relazione fra carattere e memoria culturale. La sequenza di Imaginary Forces usa il trattamento delle lettere e l’aspetto delle titolazioni ottiche per richiamare un ambiente visivo precedente.  La base tipografica, ITC Benguiat, è parte della soluzione; contorni, incastri e movimento ne fanno un titolo specifico.  Digitare lo stesso nome nel font commerciale non ricostruisce automaticamente l’opera. Il progetto si comprende osservando come le lettere vengano mostrate prima nei dettagli e poi riconosciute come insieme @t06-stranger.#sito([Imaginary Forces, _Stranger Things_: titoli e crediti.], "https://beta.imaginaryforces.com/project/stranger-things") @t06-stranger-commarts.#sito([Imaginary Forces, “_Stranger Things_” titles: dichiarazione dei progettisti e caratteri, Communication Arts.], "https://www.commarts.com/project/24604/stranger-things-titles")

#dettaglio-figura(titolo: [ITC Benguiat nel titolo], riferimento: <fig-tipo-326>,
  didascalia: [Il trattamento del titolo nella sequenza _Stranger Things_; stesso fotogramma della tavola documentaria. Imaginary Forces / Netflix.],
)[
  #image(path("/assets/images/figure/tipografia/esempi/cinema/imaginary-forces-stranger-things-titolo.jpg"), width: 187.09pt,
    alt: "Titolo Stranger Things a contorno rosso, nel fotogramma originale Imaginary Forces.")
]

// La lettura conclusiva segue i due documenti, poi il discorso prosegue.
Le scritte presenti nel mondo narrativo del film svolgono invece un altro ruolo. Insegne, lettere e documenti possono indicare un’epoca o un ambiente: sono *tipografia diegetica*. Una forma incompatibile con il periodo può incrinare la credibilità, mentre una scrittura coerente può sostenere la scena senza attirare un’attenzione esplicita. Titoli e scritte di scena richiedono dunque domande differenti: i primi possono anticipare un racconto, le seconde devono appartenere al suo mondo. In entrambi i casi la precisione tipografica significa verificare il *documento, il trattamento e la funzione* delle parole.

=== La tipografia nei videogiochi

Un titolo spettacolare non è necessariamente un buon carattere per una frase lunga. Nei testi da leggere durante un’azione contano *durata, dimensione, lingua* e differenza fra segni simili. Il caso dei giochi rende quindi visibile una separazione produttiva: una voce può essere molto caratterizzata nel nome e più regolare dove occorre leggere parole nuove. Il compito del progettista è conservare una parentela riconoscibile *senza trasferire nei testi continui* ogni effetto del lettering promozionale. I titoli delle @fig-tipo-327a e @fig-tipo-327b mostrano due trattamenti del nome @t06-lastofus.#sito([PlayStation, _The Last of Us Part I_: sito ufficiale.], "https://www.playstation.com/en-us/games/the-last-of-us-part-i/") @t06-ratchet.#sito([PlayStation, _Ratchet & Clank: Rift Apart_: sito ufficiale.], "https://www.playstation.com/en-us/games/ratchet-and-clank-rift-apart/")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/assets/images/figure/tipografia/esempi/videogiochi/last-of-us-part-i-logo.jpg"),
  [_The Last of Us Part I_: maiuscole strette e pesanti.], diritti: [Naughty Dog / Sony Interactive Entertainment.],
  alt: "The Last of Us Part I: maiuscole strette e pesanti.",
  
) <fig-tipo-327a>
],
[#immagine(path("/assets/images/figure/tipografia/esempi/videogiochi/ratchet-clank-rift-apart-logo.png"),
  [_Ratchet & Clank: Rift Apart_: contorni e rilievi.], diritti: [Insomniac Games / Sony Interactive Entertainment.],
  alt: "Ratchet & Clank: Rift Apart: contorni e rilievi.",
  
) <fig-tipo-327b>
],
  )
]

La @fig-tipo-327c mostra un terzo trattamento: nel titolo promozionale di _Horizon Zero Dawn_ alcune aste si prolungano oltre l’altezza ordinaria delle lettere.

#immagine(path("/assets/images/figure/tipografia/esempi/videogiochi/horizon-zero-dawn-titolo.png"),
  [_Horizon Zero Dawn_: aste prolungate nel titolo promozionale.],
  diritti: [Guerrilla Games / Sony Interactive Entertainment.],
  alt: "Horizon Zero Dawn: titolo promozionale originale con aste prolungate.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-327c>

I tre nomi mostrano come la tipografia possa contribuire all’identità di un gioco senza svolgere ancora il compito di un’interfaccia. In _The Last of Us Part I_ le maiuscole strette e compatte costruiscono una massa rettangolare; in _Ratchet & Clank: Rift Apart_ contorni e rilievi fanno apparire le lettere come oggetti; in _Horizon Zero Dawn_ le aste prolungate modificano il profilo del nome. Sono trattamenti da osservare nelle immagini promozionali, non modelli da trasferire automaticamente a istruzioni, dialoghi o inventari.

Nel gioco, invece, la stessa informazione deve poter essere letta mentre cambiano la scena e l’attenzione del giocatore. _The Last of Us Part I_ offre un caso documentato: si possono ingrandire gli elementi informativi sullo schermo e regolarne il fondo e il colore. Per i sottotitoli sono disponibili tre dimensioni, un fondo scuro e l’indicazione di chi parla. Il carattere del titolo promozionale e queste regolazioni rispondono quindi a problemi diversi @t06-mcallister2022.#sito([Gillen McAllister, The Last of Us Part I: Full list of accessibility features, PlayStation.Blog, 26 agosto 2022; sezioni Magnification and Visual Aids e Subtitles.], "https://blog.playstation.com/2022/08/26/the-last-of-us-part-i-full-list-of-accessibility-features/")

Il menu di _Persona 5_ (@fig-tipo-324) permette di osservare un’altra soluzione: le lettere a ritagli partecipano all’identità del gioco, mentre posizione, spazi e contrasto distinguono i comandi. Il confronto invita a separare *riconoscibilità del nome e lettura delle informazioni*. Un segno efficace nella promozione può richiedere una voce diversa nel testo continuo; una scrittura espressiva può funzionare anche in un menu, se le singole azioni restano distinguibili. La verifica riguarda sempre le parole effettive, la loro dimensione e la situazione in cui vengono lette.

Non serve affermare che un font sia per adulti e un altro per bambini: l’età del pubblico non si ricava da una grazia o da un angolo arrotondato, e la *funzione del testo* cambia fra marchio, istruzione e dialogo.
