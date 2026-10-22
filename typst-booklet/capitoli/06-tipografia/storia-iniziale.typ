// Tipografia: prima parte della storia dei caratteri, dalle tavole Figma 334–341.
// I paragrafi sono testo ordinario: nessuna riga o pagina della fonte viene fissata.
#import "../../template/stile.typ": sito, immagine
#import "../../template/editoriale.typ": nota-compatta, testo-diritti
#import "../../template/sagome.typ": sagoma
#import "../../template/figure.typ": figura-pagina
#import "../../template/doppia-pagina.typ": sagoma-regionale
#import "../../template/documenti.typ": dettaglio
#import "../../template/campioni.typ": dettaglio-figura

== Storia dei caratteri

#sagoma(
  id: "fig-tipo-lettera-materia",
  file: path("/assets/images/figure/tipografia/lettera-a-tridimensionale.png"),
  profilo: json(path("/assets/dati/sagome/lettera-a-tridimensionale.json")),
  width: 70pt,
  didascalia: [La lettera come oggetto: forma, controforma, materia e ombra.],
  alt: "Lettera a minuscola tridimensionale, scontornata, con superficie scura e fianco azzurro.",
)[
Le parole arrivano al lettore attraverso forme visibili. Prima ancora di riconoscere una frase, incontriamo lettere sottili o robuste, regolari o irrequiete, familiari o insolite. La tipografia prende in carico questa presenza: *sceglie e coordina i caratteri*, ne regola la dimensione e le distanze, rende il linguaggio disponibile alla lettura. La sua funzione pratica convive con una funzione espressiva. La stessa espressione può assumere un tono riservato, istituzionale o giocoso attraverso un diverso disegno delle lettere, senza che cambi il suo significato letterale.
]

Per comprendere queste possibilità è utile guardare al passato. Una forma che oggi appare naturale è spesso il risultato di strumenti, materiali e abitudini accumulati nei secoli. Le grazie, il contrasto fra tratti sottili e spessi, il corsivo e perfino il nome di alcune misure raccontano il lavoro di chi ha scritto, inciso, fuso e programmato i caratteri. La storia aiuta quindi a riconoscere le ragioni di una soluzione e a valutarne l’uso attuale.

Scrittura e tipografia hanno però storie differenti. La scrittura è un *sistema di segni* che rende rappresentabile una lingua; la tipografia, nel suo significato storico, *organizza testi attraverso tipi riproducibili*. Un’iscrizione antica non è già un font, così come un manoscritto non è un libro composto con caratteri mobili. Le forme passano da un mezzo all’altro, ma cambiano il processo che le produce e il modo in cui possono essere ripetute. Da questa distinzione prende avvio il percorso che conduce dalla mano al tipo, dal tipo al file e dal file allo schermo. Una lettera trattata come oggetto introduce il rapporto fra segno, materia e spazio (@fig-tipo-lettera-materia).

=== L’alfabeto latino prima della stampa

La storia dell’alfabeto latino attraversa culture e trasformazioni diverse. La trasmissione di forme dai Fenici ai Greci, agli Etruschi e poi ai Romani non va letta come il passaggio immutato di un insieme di simboli: ogni comunità adatta i segni alla propria lingua e al proprio modo di scrivere. Le lettere che usiamo conservano alcune tracce di questo lungo processo, ma non coincidono con le loro antenate. La forma di una A contemporanea è una convenzione condivisa e, nello stesso tempo, un progetto che ammette numerose interpretazioni @t06-knott2014.#sito([Elizabeth Knott, Alphabet Origins: From Kipling to Sinai. The Metropolitan Museum of Art, 2014.], "https://www.metmuseum.org/exhibitions/listings/2014/assyria-to-iberia/blog/posts/alphabet")

Nell’ambito latino, le maiuscole delle iscrizioni e le scritture librarie offrono modelli differenti. Incidere una lettera su pietra e tracciarla con una penna richiede gesti, tempi e resistenze diversi. Nella scrittura a penna, la forma della punta e l’angolo con cui viene tenuta contribuiscono alla variazione di spessore del segno. Quando più tardi queste forme saranno tradotte in metallo, il rapporto fra i tratti rimarrà visibile, anche se il procedimento produttivo sarà ormai un altro.

// La N è il capolettera della parola «Nel», come nella tavola Figma 336.
// Il resto del paragrafo rimane continuo: Meander decide da solo le righe.
// L’alternativa «N» conserva la lettera iniziale anche nella lettura assistita.
#sagoma(
  id: "fig-tipo-iniziale-n",
  file: path("/assets/images/figure/tipografia/iniziale-n-miniata.png"),
  profilo: json(path("/assets/dati/sagome/iniziale-n-miniata.json")),
  width: 66.783pt,
  lato: left,
  didascalia: [Iniziale N miniata, illustrazione contemporanea ispirata alla decorazione dei manoscritti medievali.],
  alt: "N",
)[
el Medioevo la produzione manoscritta coinvolge ambienti monastici, ma anche copisti laici e attività legate alle università. Le scritture non sono tutte uguali: modelli arrotondati convivono con forme più serrate e angolose, e le abbreviazioni rispondono alle pratiche dei lettori. Nel Rinascimento, gli umanisti recupereranno scritture librarie più antiche, che riterranno vicine ai modelli dell’antichità: da questo recupero nasceranno le minuscole umanistiche. I primi stampatori europei avranno quindi a disposizione forme di lettere già familiari ai lettori e le tradurranno in caratteri mobili. L’innovazione tecnica entra così nella vita quotidiana attraverso una continuità visiva. La @fig-tipo-iniziale-n richiama la decorazione dei manoscritti con un’illustrazione contemporanea.
]

=== La stampa prima di _Gutenberg_

Riprodurre un testo richiede di distinguere il segno dalla matrice che ne permette la ripetizione. Nella xilografia si incide in rilievo un intero blocco, conservando sulla superficie le parti che riceveranno l’inchiostro. Il testo e le eventuali immagini vengono trasferiti come un insieme. Con i caratteri mobili, invece, i segni sono elementi separati: dopo l’impressione possono essere scomposti, riordinati e impiegati per altre parole. L’unità riutilizzabile cambia il modo di preparare il testo, anche se entrambe le tecniche possono continuare a essere usate.

Il _Sutra del Diamante_, datato *11 maggio 868*, mostra un esempio di stampa xilografica (@fig-tipo-sutra-diamante). Nella riproduzione, la scena del Buddha che predica occupa la parte destra; a sinistra cominciano le colonne di testo. Immagine e scrittura sono ottenute incidendo blocchi di legno e imprimendoli sulla carta. La finezza dei segni documenta una tecnica già sviluppata, alla quale collaboravano disegnatori, scribi e intagliatori @t06-dunhuang-guide.#nota-compatta([British Library, Life in ancient Dunhuang, pp. 29–30 del PDF; riproduzione fotografica Or.8210/P.2.], ("https://idp.bl.uk/wp-content/uploads/2025/01/BL.SR_.Large_.Print_.Guide_.V3.pdf", "https://www.flickr.com/photos/britishlibrary/12459240784"))

// Il frontespizio xilografico precede il caso a caratteri mobili del Jikji.
// La figura può spostarsi nella gabbia; le righe del testo restano automatiche.
#immagine(path("/assets/images/figure/tipografia/storia/sutra-diamante-868-frontespizio-testo-british-library.jpg"),
  [_Sutra del Diamante_, 11 maggio 868: frontespizio illustrato e inizio del testo, stampati da blocchi di legno. Il documento completo è un rotolo; qui ne è riprodotta una parte.],
  diritti: [British Library, Or.8210/P.2, immagine 010627. Riproduzione distribuita su Wikimedia Commons con CC0 1.0.],
  alt: "Parte del Sutra del Diamante dell’868: a destra il Buddha circondato da discepoli, a sinistra colonne di testo cinese stampato.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-sutra-diamante>

Le esperienze asiatiche precedono la tipografia europea. In Cina l’inventore _Bi Sheng_ sperimenta caratteri mobili in ceramica nell’XI secolo. In Corea, il secondo volume del _Jikji_ fu stampato nel tempio Heungdeok-sa di Cheongju nel luglio 1377 con tipi metallici. L’UNESCO lo riconosce come la più antica testimonianza conservata di stampa con caratteri mobili metallici. La parola «conservata» è essenziale: identifica un documento che possiamo studiare, senza trasformarlo automaticamente nel primo tentativo mai realizzato. La @fig-tipo-jikji mostra una doppia pagina del volume conservato dalla Bibliothèque nationale de France @t06-bnf-jikji.#nota-compatta([BnF, Jikji; UNESCO, Memory of the World, iscrizione 2001.], ("https://www.bnf.fr/en/jikji-treasure-world-printing", "https://www.unesco.org/en/memory-world/baegun-hwasang-chorok-buljo-jikji-simche-yojeol-volii-second-volume-anthology-great-buddhist-priests"))

Questi precedenti impediscono di presentare _Johannes Gutenberg_, tipografo attivo a Magonza nel Quattrocento, come l’inventore mondiale della stampa o la sua Bibbia come il primo libro stampato in assoluto. Non obbligano però a immaginare una trasmissione diretta di cui non abbiamo dimostrazione. Le esperienze vanno riconosciute nei rispettivi contesti, nei materiali impiegati e nei sistemi di scrittura a cui rispondevano. La vicenda europea avrà conseguenze specifiche sulla produzione e circolazione dei libri, all’interno di una storia della stampa molto più ampia.

#immagine(path("/assets/images/figure/storia-del-design/jikji-1377-secondo-volume-gallica.jpg"),
  [Una doppia pagina del _Jikji_, secondo volume, stampato a Cheongju nel 1377 con caratteri mobili metallici.],
  diritti: [Bibliothèque nationale de France, département des Manuscrits, Coréen 109. Gallica, vista digitale f37.],
  alt: "Doppia pagina del Jikji con caratteri mobili metallici disposti in colonne.",
  placement: top, scope: "parent") <fig-tipo-jikji>

=== Il sistema di _Gutenberg_

A Magonza, intorno alla metà del Quattrocento, _Johannes Gutenberg_ mette a punto un sistema capace di produrre tipi metallici uniformi e intercambiabili e di usarli per la stampa dei libri. La sua importanza riguarda l’integrazione di più operazioni: ottenere i caratteri, comporre il testo, preparare gli inchiostri e imprimere il foglio con il torchio. La Bibbia che porta il suo nome fu probabilmente completata nel 1455. La Library of Congress la descrive come il primo grande libro dell’Europa occidentale stampato con caratteri mobili metallici @t06-loc-gutenberg.#sito([Library of Congress, The Gutenberg Bible.], "https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html")

// L’inserto segue la presentazione della Bibbia, prima dei tipi metallici.
La pagina della Bibbia di _Gutenberg_ (@fig-tipo-bibbia) mostra il rapporto tra il testo stampato con tipi mobili, l’iniziale e la decorazione. Il carattere riprende il gotico librario; la finitura ornamentale della pagina documenta la continuità con la lavorazione manuale.

// Inserto documentario a pagina intera, come nella tavola Figma 340.
#figura-pagina(
  id: "fig-tipo-bibbia",
  file: path("/assets/images/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
  didascalia: [Bibbia di _Gutenberg_: il testo a tipi mobili convive con la finitura ornamentale della pagina. Riproduzione fotografica.],
  diritti: [Library of Congress, LC-USZ62-51844.],
  alt: "Pagina della Bibbia di Gutenberg con testo gotico in due colonne, capilettera decorati e motivi ornamentali.",
)

// Il salto nativo può generare un foglio di raccordo per aprire la coppia
// sul lato sinistro. Lo sfondo, limitato a quel solo salto, ripete dettagli
// già descritti nella figura completa: non contiene nuove informazioni.
// Non crea pagine mediante una query e non interferisce con le note Meander.
#[
  #set page(background: place(top + left, dx: 18mm, dy: 15mm,
    block(width: 137mm)[
      #dettaglio-figura(titolo: [Testo a stampa e iniziali decorate],
        riferimento: <fig-tipo-bibbia>,
        didascalia: [Nella parte superiore della pagina, il testo gotico in due colonne convive con le iniziali e la decorazione. Riproduzione fotografica in bianco e nero.],
      )[
        #dettaglio(path("/assets/images/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
          width: 388.35pt, height: 253.62pt,
          originale-width: 563.09pt, originale-height: 563.09pt * 1536 / 1102,
          dx: -51.1pt, dy: -51.1pt,
          alt: "Ingrandimento delle iniziali decorate e delle righe gotiche nella parte superiore della pagina della Bibbia di Gutenberg.")
      ]
      #v(4pt)#testo-diritti[Library of Congress, LC-USZ62-51844.]
      #v(22pt)
      #dettaglio-figura(titolo: [Il margine ornamentale],
        riferimento: <fig-tipo-bibbia>,
        didascalia: [Nel margine inferiore i motivi ornamentali proseguono oltre le due colonne del testo. La visuale completa precede questi dettagli.],
      )[
        #dettaglio(path("/assets/images/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
          width: 388.35pt, height: 148.27pt,
          originale-width: 388.35pt, originale-height: 388.35pt * 1536 / 1102,
          dx: 0pt, dy: -370pt,
          alt: "Ingrandimento del margine inferiore ornato della stessa pagina della Bibbia di Gutenberg.")
      ]
      #v(4pt)#testo-diritti[Library of Congress, LC-USZ62-51844.]
    ]))
  #pagebreak(to: "even", weak: true)
]

// La cassa richiesta nei commenti 320 e 323 è estratta dal PDF originale.
// Colore e trasparenza restano quelli dell'immagine incorporata nel documento.
// La stessa immagine occupa il dorso della coppia, come nelle tavole 338–339.
// Si ferma sopra la fascia delle note: l'eccezione del Duomo non si estende qui.
#sagoma-regionale(
  id: "fig-tipo-metallici",
  file: path("/assets/images/figure/tipografia/storia/cassa-caratteri-mobili-scomparti.png"),
  profilo: json(path("/assets/dati/sagome/cassa-caratteri-mobili-scomparti.json")),
  larghezza: 440pt,
  inizio-immagine: 170mm - 220pt,
  fondo-immagine: 240mm - 20mm - 35mm - 8pt,
  note-esterne: false,
  didascalia: [Cassa a scomparti e tipi mobili: gli elementi separati possono essere scelti e riordinati per comporre il testo. Illustrazione.],
  alt: "Illustrazione di una cassa di legno a scomparti con caratteri mobili e alcuni tipi metallici separati, sul dorso di due pagine.",
)[
Il tipo porta in rilievo l’immagine rovesciata del segno. Per ricavare più esemplari della stessa forma si lavora su una catena di strumenti: il punzone imprime la propria forma in una matrice e la matrice serve alla fusione dei tipi. I tipi già fusi (@fig-tipo-metallici) si accostano agli elementi di spazio. Il testo composto, inchiostrato e sottoposto alla pressione del torchio lascia sul foglio l’immagine leggibile. La matrice di fusione e la forma di stampa sono dunque oggetti differenti: chiamare «matrice» l’intero testo composto nasconde questa distinzione.

I caratteri della Bibbia riprendono il gotico librario. Le forme angolose e dense mantengono un legame riconoscibile con il manoscritto; iniziali e titoli potevano inoltre ricevere interventi manuali a colori. La nuova tecnologia non cancella immediatamente la lavorazione artigianale. Introduce una diversa economia della ripetizione: la fatica di preparare il testo può essere distribuita su più esemplari, mentre i tipi tornano disponibili per altre composizioni. La lettera diventa una piccola unità materiale che appartiene a un insieme coordinato.

=== Venezia e i tipi romani

La diffusione della stampa crea una rete di officine e competenze. Venezia diviene uno dei luoghi decisivi per l’elaborazione del libro a stampa: alle attività dei tipografi si intrecciano quelle di librai, incisori, correttori e studiosi. La forma del carattere dipende quindi anche dai testi da pubblicare e dai lettori a cui vengono destinati. Non esiste un’unica strada dal manoscritto alla stampa: la scelta fra forme gotiche e romane risponde a tradizioni e pubblici differenti.

Nel 1470 lo stampatore francese _Nicolas Jenson_ stampa a Venezia il _De evangelica praeparatione_ di _Eusebio di Cesarea_, autore cristiano del IV secolo, con un romano che diventerà un riferimento nella storia del disegno dei caratteri (@fig-tipo-jenson). La scheda catalografica online di #cite(<t06-jenson>, form: "prose") descrive l’esemplare conservato dalla biblioteca e ne registra data, luogo di stampa e identificazione del tipo impiegato.#nota-compatta([Morgan Library, scheda dell’opera; Atalanta/WeiaR, fotografia di un diverso esemplare.], ("https://www.themorgan.org/incunables/134238", "https://commons.wikimedia.org/wiki/File:JensonEusebius.jpg")) Il confronto con il gotico rende visibile una diversa interpretazione delle lettere: forme più aperte, proporzioni riconducibili alla cultura umanistica e un andamento che conserva la memoria del gesto della penna. Non si tratta di rendere ogni segno geometrico o identico agli altri, ma di trovare una parentela coerente fra forme diverse. La durata di questo modello non consiste nella conservazione immobile di una sagoma. Nei secoli successivi altri progettisti studieranno le stampe di _Jenson_ e ne ricaveranno nuove interpretazioni. Quando un font contemporaneo richiama un modello veneziano, si colloca in questa storia di letture e adattamenti. Per riconoscere il legame occorre osservare il disegno effettivo delle lettere, distinguendo l’opera quattrocentesca dal suo recupero moderno. Un nome storico può indicare una fonte d’ispirazione senza garantire la riproduzione fedele del tipo originale.

]

// Gli esempi chiariscono il recupero di un modello; i campioni già presenti
// rimangono nel loro contesto, collegati da riferimenti automatici.
Due casi rendono concreta questa distinzione. Il Golden del designer e scrittore inglese ottocentesco _William Morris_ riprende i romani di _Jenson_, ma è un nuovo disegno: lo ritroveremo nel documento della @fig-tipo-morris-caratteri @t06-morris-archive. Per i modelli cinquecenteschi dell’incisore francese _Claude Garamont_, il progetto digitale EB Garamond offre oggi tondo e corsivo (@fig-tipo-278a). Il nome storico non identifica da solo il file contemporaneo: occorre distinguere il modello, la reinterpretazione e lo stile effettivamente usato @t06-eb-garamond.#nota-compatta([William Morris Archive, Golden Type; EB Garamond, descrizione del progetto digitale e fonti storiche.], ("https://morrisarchive.lib.uiowa.edu/exhibits/show/bookarts/kelmscottpress/typefaces", "https://github.com/google/fonts/blob/main/ofl/ebgaramond/DESCRIPTION.en_us.html"))

// Il documento segue la coppia sagomata nel flusso ordinario. La gabbia intera
// rende leggibili i dettagli dei tipi e non interrompe la sagoma della cassa.
#immagine(path("/assets/images/figure/tipografia/jenson-eusebio-1470-dettaglio.jpg"),
  [Dettaglio del carattere romano nell’_Eusebio_ stampato da _Nicolas Jenson_ a Venezia, 1470.],
  diritti: [Foto Atalanta/WeiaR, 3 febbraio 2008; esemplare del Museum Meermanno-Westreenianum, fotografato alla Koninklijke Bibliotheek, L’Aia. Wikimedia Commons, CC BY-SA 4.0. Riproduzione invariata.],
  alt: "Dettaglio di righe del De evangelica praeparatione composte nel romano di Jenson.",
  width: 137mm, placement: top, scope: "parent") <fig-tipo-jenson>
