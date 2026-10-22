// Tavole Figma 341–343: prosa continua e documenti originali.
#import "../../template/stile.typ": immagine, sito
#import "../../template/editoriale.typ": nota-compatta
#import "../../template/documenti.typ": dettaglio, tavola-documentaria, campione-storico

=== _Manuzio_ e _Griffo_: romano e corsivo

Alla fine del Quattrocento e all’inizio del Cinquecento il lavoro dell’editore e umanista _Aldo Manuzio_ collega la scelta delle opere alla progettazione della loro forma materiale. L’editore promuove la pubblicazione di testi greci, latini e volgari e si avvale di studiosi e incisori. Il romano preparato per il _De Aetna_ dell’umanista veneziano _Pietro Bembo_, pubblicato nel 1496 secondo la datazione moderna, viene commissionato a _Francesco Griffo_, incisore di punzoni bolognese. La forma del carattere nasce dunque da una collaborazione: l’editore definisce un programma e il punzonista traduce le esigenze in un alfabeto riproducibile @t06-marciana.#sito([Biblioteca Nazionale Marciana, Aldo Manutius: ten interludes.], "https://bibliotecanazionalemarciana.cultura.gov.it/en/library/digital-library/aldo-manutius-ten-interludes/")

Il corsivo inciso da _Griffo_ compare in una breve iscrizione nel 1500 ed è usato nell’edizione aldina del poeta latino _Virgilio_, pubblicata nell’aprile 1501. La serie dei libri portatili prosegue nel maggio dello stesso anno con le opere di _Orazio_, poeta latino (@fig-tipo-orazio). Il modello è legato alla scrittura umanistica corsiva, ma non è una sua copia meccanica: una forma tracciata dalla penna deve essere ripensata per funzionare come tipo separato e ripetibile. Per questo è più corretto parlare del *corsivo inciso da _Griffo_ per _Manuzio_*, distinguendo il contributo del disegnatore e incisore da quello dell’editore.

Anche il formato contribuisce all’esperienza del libro. L’*ottavo* indica una struttura ottenuta dalla piegatura del foglio in otto carte, cioè sedici pagine; non definisce una misura fissa in centimetri. I libri piccoli e i manoscritti portatili esistevano già: l’innovazione aldina consiste nell’affermazione di una serie editoriale riconoscibile, in cui il formato maneggevole si accompagna a testi e caratteri attentamente scelti. Il corsivo, che oggi usiamo spesso per un’enfasi interna alla frase, poteva allora sostenere interi testi. La sua storia mostra che anche la funzione di una variante tipografica cambia nel tempo.

#immagine(path("/assets/images/figure/tipografia/orazio-manuzio-1501-miniatura.jpg"),
  [_Orazio_, _Carmina_, Venezia, _Aldo Manuzio_, maggio 1501: apertura delle _Odi_ in corsivo di _Francesco Griffo_, esemplare miniato per _Mino Rossi_.],
  diritti: [Collezione T. Kimball Brooker; riproduzione Sotheby’s, _Bibliotheca Brookeriana_, lotto 780, 2024.],
  alt: "Pagina miniata delle Odi di Orazio, con titolo maiuscolo e versi nel corsivo inciso da Griffo.",
  width: 220pt, placement: top, scope: "parent") <fig-tipo-orazio>

Nel volume di _Orazio_ pubblicato da _Aldo Manuzio_ a Venezia nel maggio 1501, il titolo in maiuscolo e i versi in corsivo svolgono ruoli diversi (@fig-tipo-orazio). I dettagli ingrandiscono la stessa pagina: *non sono ricostruzioni con un font digitale*. Il corsivo è inciso da _Francesco Griffo_; la miniatura appartiene all’esemplare per _Mino Rossi_.#nota-compatta([Sotheby’s, Bibliotheca Brookeriana, lotto 780 (2024): Orazio, maggio 1501.], "https://www.sothebys.com/en/buy/auction/2024/bibliotheca-brookeriana-a-renaissance-library-the-aldine-collection-d-m/horatius-flaccus-horatius-venice-aldo-1501") I documenti completi permettono inoltre di confrontare il romano del _De Aetna_ e il corsivo delle _Bucoliche_ (@fig-tipo-de-aetna; @fig-tipo-virgilio).

// Il facsimile resta nel flusso delle colonne accanto alla spiegazione.
// Typst sceglie la prima colonna utile: nessuna riga della prosa è assegnata.
#immagine(path("/assets/images/figure/tipografia/bembo-de-aetna-1496-apertura.jpg"),
  [_Bembo_, _De Aetna_, 1496 (1495 m.v.). Venezia, _Aldo Manuzio_.],
  diritti: [BNCF, Ald.1.1.40; scansione © 2010 ProQuest.],
  alt: "Pagina del De Aetna di Pietro Bembo, stampata da Manuzio nel romano di Griffo.",
  width: 187.09pt, placement: top) <fig-tipo-de-aetna>

// I valori dei due ritagli provengono dal contesto Figma della tavola 343.
// Viene spostata soltanto la fotografia dentro una finestra; il testo resta libero.
#tavola-documentaria[
  #campione-storico(titolo: [Maiuscole del titolo · Orazio 1501],
    didascalia: [Dettaglio della @fig-tipo-orazio: «HORATII», dal titolo delle _Odi di Orazio_, Venezia, _Aldo Manuzio_, 1501. Collezione T. Kimball Brooker; riproduzione Sotheby’s, lotto 780, 2024.])[
    #dettaglio(path("/assets/images/figure/tipografia/orazio-manuzio-1501-miniatura.jpg"),
      width: 284.595pt, height: 54pt, originale-width: 1894.378pt, originale-height: 2918.919pt,
      dx: -532.7pt, dy: -394.05pt, alt: "Dettaglio fotografico della parola HORATII in maiuscolo.")
  ]
  #v(14pt)
  #campione-storico(titolo: [Il corsivo di _Griffo_ · 1501],
    didascalia: [Dettaglio della @fig-tipo-orazio: «atavis edite», dai versi delle _Odi di Orazio_, Venezia, _Aldo Manuzio_, 1501. Corsivo inciso da _Francesco Griffo_. Collezione T. Kimball Brooker; riproduzione Sotheby’s, lotto 780, 2024.])[
    #dettaglio(path("/assets/images/figure/tipografia/orazio-manuzio-1501-miniatura.jpg"),
      width: 207.9pt, height: 54pt, originale-width: 1752.3pt, originale-height: 2700pt,
      dx: -877.5pt, dy: -940.95pt, alt: "Dettaglio fotografico delle parole atavis edite nel corsivo di Griffo.")
  ]
  #v(18pt)
  #align(center)[
    #block(width: 187.09pt)[
      #immagine(path("/assets/images/figure/tipografia/virgilio-manuzio-1501-bucoliche.jpg"),
      [_Virgilio_, Venezia, _Manuzio_, aprile 1501: _Bucoliche_.],
      diritti: [John Rylands Library, The University of Manchester Library.],
      alt: "Apertura delle Bucoliche di Virgilio nell’edizione aldina del 1501.") <fig-tipo-virgilio>
    ]
  ]
]
