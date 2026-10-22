// Tavole correnti 344–345: doppia pagina del Duomo approvata dall’utente.
// Un solo blocco riceve paragrafi normali, senza suddivisione in righe o pagine.
#import "../../template/stile.typ": sito, immagine
#import "../../template/editoriale.typ": nota-compatta, testo-diritti
#import "../../template/doppia-pagina.typ": sagoma-duomo

// La figura attraversa il dorso e arriva al bordo inferiore dei due fogli.
// Il testo segue la sagoma nelle quattro colonne; il seguito scorre liberamente.
#sagoma-duomo(
  id: "fig-duomo",
  file: path("/assets/images/figure/tipografia/duomo-firenze-illustrazione.png"),
  profilo: json(path("/assets/dati/sagome/duomo-firenze.json")),
  didascalia: [Firenze e il complesso del Duomo.],
  alt: "Sagoma illustrata del complesso del Duomo di Firenze.",
)[
=== Firenze: tipi, officine e cultura editoriale

Il caso fiorentino (@fig-duomo) mostra un’altra dimensione della storia tipografica: la *disponibilità dei caratteri* è una condizione concreta della produzione culturale. Nel Cinquecento _Lorenzo Torrentino_ lavora come stampatore ducale e pubblica opere che appartengono alla vita letteraria, artistica e istituzionale della città. Fra le produzioni più note vi è la prima edizione delle _Vite_ del pittore e architetto _Giorgio Vasari_, nel 1550, conservata anche nella Biblioteca degli Uffizi. La successiva versione ampliata del 1568 sarà stampata dai Giunti: la distinzione fra le due edizioni evita di attribuire a un’unica officina oggetti diversi @basagniVasari.#nota-compatta([Uffizi, Vite 1550/1568: posseduto (§ 6.3) e scheda del 1568.], ("https://pdf.uffizi.it/1777886745656-cartacollezioni-2.pdf", "https://www.uffizi.it/opere/vasari-giunti"))

_Torrentino_ non inaugura la stampa a Firenze, dove le officine erano attive da decenni. Il suo interesse per questo percorso riguarda invece l’incontro fra una committenza, una selezione di opere e i mezzi necessari per comporle. Pubblicare testi latini o greci richiede di procurarsi serie di segni adeguate, oltre alle competenze per usarle. *Le lettere sono beni materiali*: si acquistano, si trasferiscono e si consumano, e la loro disponibilità apre o limita ciò che un’officina può realizzare.

Un libro storico può quindi essere letto anche come testimonianza del suo *apparato tipografico*. Il frontespizio dichiara un titolo e una responsabilità editoriale; il corpo del testo mostra le forme, le varianti e i repertori di cui lo stampatore disponeva. L’analisi delle lettere non richiede di ricostruire tutta la storia politica del committente. Richiede invece di chiedersi quali segni sono stati scelti, quali tradizioni richiamano e come permettono a quel testo di esistere nella forma che osserviamo.
=== _Caslon_, _Baskerville_, _Didot_ e _Bodoni_

Nel corso del Settecento i caratteri romani vengono reinterpretati attraverso rapporti sempre diversi fra spessore, asse e terminazioni. _William Caslon_, fonditore inglese, conserva il contrasto e l’energia dei modelli precedenti. Il foglio di campioni del 1734 permette di considerare il suo lavoro come un repertorio di caratteri destinati alla stampa, prima che come un nome scelto oggi da un menu. Parlare di _Caslon_ significa infatti confrontarsi con una produzione storica, a cui numerose versioni successive si sono ispirate.

Lo stampatore inglese _John Baskerville_ cerca a Birmingham segni più nitidi. Il suo _Virgilio_ del 1757 è il primo libro della sua officina. La ricerca comprende il disegno delle lettere, ma anche inchiostri, carta e *qualità dell’impressione*: un tratto sottile può essere efficace solo se il processo di riproduzione lo conserva. La Cadbury Research Library documenta l’impiego della carta velina, più liscia, e gli esperimenti di _Baskerville_ per ottenere una stampa nera e definita. La forma non può quindi essere separata completamente dalle condizioni in cui viene resa visibile @birminghamBaskerville.#sito([University of Birmingham, Cadbury Research Library, «Baskerville».], "https://www.birmingham.ac.uk/facilities/cadbury/rarebooks/fine-printing-private-press/baskerville")

Fra Settecento e Ottocento i _Didot_, famiglia di tipografi francesi, e il tipografo _Giambattista Bodoni_ a Parma sviluppano interpretazioni con *forti contrasti*, *assi prevalentemente verticali* e grazie sottili. Il _Manuale tipografico_ di _Bodoni_, pubblicato postumo nel 1818, rende evidente la vastità del suo lavoro @bodoni1818. La @fig-bodoni permette di osservare il carattere nel contesto di una pagina autentica, invece di ridurlo a poche lettere isolate.#sito([Biblioteca Bodoni, Universidad de Salamanca.], "https://bibliotecabodoni.usal.es/libro/manuale-tipografico-1")

#immagine(path("/assets/images/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"),
  [_Giambattista Bodoni_, _Manuale tipografico_, vol. I, 1818. Contrasto dei tratti e grazie sottili, fra tondo e corsivo. Edizione postuma.],
  diritti: [Immagine: Biblioteca Bodoni, Universidad de Salamanca.],
  alt: "Pagine del Manuale tipografico di Bodoni con caratteri tondi e corsivi.") <fig-bodoni>
]

I frontespizi e il colophon permettono di confrontare le responsabilità editoriali delle due edizioni delle _Vite_ (@fig-tipo-vasari-edizioni).

// Tre originali affiancati nello stesso gruppo, con una sola didascalia comune.
// Il posizionamento mobile lascia a Typst la scelta della pagina del gruppo.
#figure(
  grid(columns: (1fr, 1fr, 1fr), gutter: 8pt,
    image(path("/assets/images/figure/tipografia/vasari-vite-torrentino-1550-frontespizio.jpg"),
      width: 100%, alt: "Frontespizio delle Vite di Vasari, edizione Torrentino del 1550."),
    image(path("/assets/images/figure/tipografia/vasari-vite-torrentino-1550-colophon.jpg"),
      width: 100%, alt: "Colophon delle Vite di Vasari, edizione Torrentino del 1550."),
    image(path("/assets/images/figure/tipografia/vasari-vite-giunti-1568-frontespizio.jpg"),
      width: 100%, alt: "Frontespizio delle Vite di Vasari, edizione Giunti del 1568.")),
  placement: top, scope: "parent", kind: image,
  caption: [_Vasari_, _Le vite_: 1550, _Torrentino_ (a sinistra: frontespizio e colophon); 1568, Giunti (a destra: frontespizio). Dettagli originali.
    #v(4pt)#testo-diritti[Getty Research Institute / Internet Archive.]],
) <fig-tipo-vasari-edizioni>
