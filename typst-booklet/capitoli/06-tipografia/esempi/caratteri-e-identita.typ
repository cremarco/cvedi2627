// Caratteri in uso: prosa, campioni contestuali e documenti autonomi.
#import "../../../template/stile.typ": immagine, sito
#import "../../../template/editoriale.typ": nota-compatta, testo-diritti
#import "../../../template/campioni.typ": confronto, riga-campioni, dettaglio-figura
#import "../../../template/documenti.typ": dettaglio, tavola-documentaria

=== Frutiger e la segnaletica di Roissy

La segnaletica pone una domanda diversa rispetto a un logotipo: quanto rapidamente si riesce a *riconoscere la parola* nella situazione prevista? Un’indicazione viene incontrata a una certa distanza, da un punto di vista variabile e spesso durante uno spostamento. L’occhio non dispone del tempo e della posizione stabile di una lettura al tavolo. Le differenze fra segni simili, le aperture e la distribuzione dei pieni diventano perciò problemi concreti di disegno.

Il disegnatore di caratteri svizzero _Adrian Frutiger_ sviluppò per l’aeroporto di Roissy un carattere destinato a questo impiego. Il Museum für Gestaltung Zürich conserva le prove realizzate dall’Atelier Frutiger + Pfäffli fra il 1970 e il 1972. Nella parola «Douane» si confrontano tre soluzioni: la figura documenta un *prototipo di studio*, non un cartello già installato (@fig-tipo-310). Questa distinzione restituisce al documento la sua funzione: mostrare che il carattere veniva valutato attraverso prove della *parola completa* @t06-roissy.#sito([Museum für Gestaltung Zürich, Typeface design Douane, 1970–1972.], "https://old.eguide.ch/en/objekt/1879/")

#immagine(path("/assets/images/figure/tipografia/esempi/segnaletica/frutiger-douane-prototipi-roissy-1970-1972.jpg"),
  [«Douane»: tre varianti del prototipo Roissy, 1970–1972. Il confronto riguarda forme e spazi della stessa parola.],
  diritti: [Adrian Frutiger / Atelier Frutiger + Pfäffli; Museum für Gestaltung Zürich / ZHdK.],
  alt: "«Douane»: tre varianti del prototipo Roissy, 1970–1972. Il confronto riguarda forme e spazi della stessa parola.",
) <fig-tipo-310>

Possiamo seguire le curve della D e della o, osservare l’apertura della e e confrontare il ritmo dei vuoti fra i segni. Una lettera può risultare ben distinta nell’ingrandimento e perdere chiarezza quando la parola viene ridotta o osservata da lontano. Anche un tratto più spesso può aiutare la presenza complessiva e contemporaneamente ridurre una controforma. Il progetto nasce dall’equilibrio di questi effetti, non dall’applicazione di un unico valore ideale.

#dettaglio-figura(titolo: [Roissy · prototipo 1970–1972], riferimento: <fig-tipo-310>,
  didascalia: [Un particolare del prototipo, distinto dal campione del font retail.],
)[
  #dettaglio(path("/assets/images/figure/tipografia/esempi/segnaletica/frutiger-douane-prototipi-roissy-1970-1972.jpg"),
    width: 160pt, height: 46pt, originale-width: 187.09pt, originale-height: 206.489pt,
    dx: -14pt, dy: -10pt, alt: "Dettaglio della parola Douane nel prototipo conservato a Zurigo.")
]

Il successivo impiego di Frutiger in altri contesti non rende automaticamente intercambiabili segnaletica, testi e titolazioni. Ogni applicazione richiede una nuova verifica della versione utilizzata, del corpo e della spaziatura. Il valore didattico del prototipo consiste proprio nel rendere visibile un metodo: formulare una domanda, costruire *varianti confrontabili* e valutarle nelle condizioni di lettura. Osservare le sole lettere è necessario, ma la parola intera rimane l’unità entro cui quelle lettere devono collaborare.

=== Helvetica e Futura a confronto

Helvetica e Futura vengono spesso riunite sotto l’etichetta di caratteri moderni. Il confronto delle loro lettere (@fig-tipo-311a, @fig-tipo-311b, @fig-tipo-311c e @fig-tipo-311d-confronto) mostra però che l’assenza delle grazie non determina una sola voce. La struttura geometrica di Futura privilegia cerchi, linee e proporzioni essenziali, mentre il disegno di Helvetica produce un ritmo più vicino alla tradizione delle grottesche. Osservare la a, la G, la t e le aperture aiuta a rendere precisa una differenza che l’aggettivo «pulito» lascia indistinta.

_Paul Renner_ progettò Futura per la fonderia Bauer; la famiglia fu presentata nel 1927 @t06-futura.#nota-compatta([Monotype, Die Futura des Jahrhunderts: disegno del 1927 e successivo Futura Now.], "https://www.monotype.com/de/ressourcen/expertise/die-futura-des-jahrhunderts") La geometria visibile non significa che ogni lettera sia il risultato meccanico di un cerchio e di un righello: *correzioni e proporzioni ottiche* permettono ai segni di convivere nella parola. Helvetica nacque invece dal lavoro di _Max Miedinger_, _Eduard Hoffmann_ e della fonderia Haas @t06-helvetica. Il progetto è stato ampliato e reinterpretato, perciò i nomi Helvetica, Neue Helvetica e Helvetica Now non designano file identici @t06-helvetica-now.#nota-compatta([Monotype, Helvetica Now: famiglia e comunicato del 9 aprile 2019.], ("https://www.monotype.com/fonts/helvetica-now", "https://www.monotype.com/press-releases/monotype-introduces-helvetica-now-reinvented-to-meet-the-typographical-demands-of-today-s-creative-professionals"))

// Quattro visuali autentiche: i primi due glifi condividono il corpo 36;
// i ritagli editoriali di App e Fru sono identificati come esempi differenti.
#confronto[
  #figure([
    #riga-campioni((
      (titolo: [Helvetica Regular · 36], visuale: image(path("/assets/images/figure/tipografia/classificazioni/helvetica-regular-aag.svg"), width: 66.05pt)),
      (titolo: [Helvetica Neue Regular · 36], visuale: image(path("/assets/images/figure/tipografia/esempi/marchi/helvetica-neue-regular-aag.svg"), width: 65.54pt)),
      (titolo: [Helvetica Now · dettaglio], visuale: dettaglio(path("/assets/images/figure/tipografia/classificazioni/helvetica-now-specimen-ufficiale.png"),
        width: 63pt, height: 31.687pt, originale-width: 470.601pt, originale-height: 315.477pt,
        dx: -225.89pt, dy: -179.61pt, alt: "App, dettaglio dello specimen ufficiale Helvetica Now.")),
      (titolo: [Frutiger LT · retail], visuale: image(path("/assets/images/figure/tipografia/esempi/segnaletica/frutiger-lt-campione-retail.png"), width: 86.46pt)),
    ))
  ], kind: image, caption: [Helvetica, Helvetica Neue, Helvetica Now («App») e Frutiger LT («Fru»). Il campione digitale Frutiger LT è attuale: non è il prototipo Roissy.
    #v(4pt)#testo-diritti[Monotype; Linotype / MyFonts.]
  ]) <fig-tipo-sans-varianti>
]

La diffusione di queste famiglie ha favorito associazioni con istituzioni, imprese e linguaggi del Novecento. Tuttavia chiamare Helvetica «neutrale» non significa che sia priva di storia o che sparisca sempre dalla percezione. Il suo impiego ripetuto può diventare esso stesso un segnale culturale. Anche Futura può apparire severa, giocosa o monumentale in base a peso, cassa e spaziatura; il nome del carattere non decide il tono finale.

Un confronto efficace *mantiene costanti parole, dimensione e colore*, poi esamina l’ingombro effettivo e il disegno dei segni. La parità del corpo nominale non garantisce la stessa dimensione percepita: bisogna osservare l’altezza delle minuscole e l’area occupata. Questo è il passaggio che rende utili i casi celebri al progetto quotidiano. Non scegliamo una reputazione astratta, ma una *versione concreta di una famiglia*, verificata sulle parole che dovrà comporre. Si vedano anche i campioni della @fig-tipo-sans-varianti.

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/assets/images/figure/tipografia/esempi/editoria/futura-specimen-storico-pesi-e-corpi.png"),
  [Futura: pagina di uno specimen storico, con diversi pesi e corpi.],
  diritti: [Paul Renner, Futura; documento riprodotto da Monotype.],
  alt: "Futura: pagina di uno specimen storico, con diversi pesi e corpi.",
) <fig-tipo-311a>
],
[#immagine(path("/assets/images/figure/tipografia/esempi/editoria/futura-copertina-specimen-storico.png"),
  [Futura: copertina storica, maiuscole spaziate.],
  diritti: [Paul Renner, Futura; documento riprodotto da Monotype.],
  alt: "Futura: copertina storica, maiuscole spaziate.",
) <fig-tipo-311b>
],
  )
]

#immagine(path("/assets/images/figure/tipografia/classificazioni/helvetica-now-specimen-ufficiale.png"),
  [Helvetica Now: pesi diversi in uso.], diritti: [Monotype.],
  alt: "Specimen ufficiale Helvetica Now: parole in diversi pesi.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-311c>

#immagine(path("/assets/images/figure/tipografia/classificazioni/helvetica-futura-aag.svg"),
  [Helvetica Regular e Futura Medium: Aag, corpo 36. I contorni autentici delle versioni digitali conservano le differenze delle forme.],
  diritti: [Monotype / Linotype.], alt: "Aag in Helvetica Regular e Futura Medium allo stesso corpo nominale.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-311d-confronto>

=== IKEA: da Futura a Verdana

Il passaggio dalla famiglia Futura impiegata nella comunicazione IKEA a Verdana è un esempio utile per discutere la *continuità tipografica*. Le differenze non consistono semplicemente nell’eliminare le grazie, perché entrambe le famiglie sono senza grazie. Cambiano invece le proporzioni, l’altezza delle minuscole, la forma della a, l’ampiezza degli occhielli e l’ingombro delle parole. Un titolo conosciuto può apparire diverso anche quando contenuto e colore rimangono invariati @t06-carter2013.#sito([MyFonts, Creative Characters: Matthew Carter, ottobre 2013.], "https://www.myfonts.com/pages/newsletters-cc-201310")

La scelta di Verdana richiama il problema del rapporto fra carattere e mezzo. La famiglia fu disegnata da _Matthew Carter_ per Microsoft con un’attenzione specifica alla leggibilità sugli schermi a bassa risoluzione. Questa origine non impedisce di usarla sulla carta; invita però a osservare come il suo disegno si comporti in una grande titolazione, dove i particolari e le proporzioni diventano più evidenti. Un carattere progettato per un vincolo tecnico può assumere una presenza espressiva proprio quando viene portato in un altro contesto @t06-verdana.

È essenziale distinguere il *testo del catalogo dal logotipo* IKEA. Il museo aziendale documenta la storia di quest’ultimo e l’impiego di un disegno interno basato su una Futura molto pesante. Il cambiamento del carattere dei testi non implica che anche le quattro lettere nel marchio siano state ricomposte in Verdana. Per isolare le differenze del disegno, il campione (@fig-tipo-312) confronta le due famiglie autentiche su una frase originale: è una dimostrazione, non una pagina del catalogo @t06-ikea-logo.#sito([IKEA Museum, The history of the IKEA logo.], "https://www.ikeamuseum.com/en/explore/the-story-of-ikea/history-of-the-logotype/")

#immagine(path("/assets/images/figure/tipografia/esempi/editoria/futura-verdana-confronto-stessa-frase.svg"),
  [Futura Medium e Verdana Regular, con la stessa frase e lo stesso corpo nominale. Il campione non è una riproduzione del catalogo IKEA.],
  diritti: [Contorni autentici di Futura e Verdana.],
  alt: "Futura Medium e Verdana Regular, con la stessa frase e lo stesso corpo nominale. Il campione non è una riproduzione del catalogo IKEA.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-312>

Le copertine complete mostrano i due cataloghi svedesi: quello del 2009 (@fig-tipo-312a) @t06-ikea2009 e quello del 2010 (@fig-tipo-312b) @t06-ikea2010.#nota-compatta([IKEA Museum, catalogo svedese 2009. IKEA Museum, catalogo svedese 2010.], ("https://ikeamuseum.com/en/explore/ikea-catalogue/2009-ikea-catalogue/", "https://ikeamuseum.com/en/explore/ikea-catalogue/2010-ikea-catalogue/"))

// Il caso si conclude prima degli inserti: la prosa resta continua e libera.
La reazione a un cambiamento familiare *non misura da sola* la facilità di lettura. Può riguardare una perdita di riconoscibilità, un’abitudine o una preferenza. Per valutare una sostituzione servono *domande distinte*: le lettere sono distinguibili, le parole mantengono una presenza adatta al messaggio, le informazioni vengono comprese, la nuova voce resta riconoscibile nel tempo? Il caso IKEA aiuta a formulare queste domande senza ridurre una decisione complessa al giudizio «bello» o «brutto» sul nome di un font.

// Documento autonomo della fonte: una pagina, senza fascia di note.
#tavola-documentaria[
  #set par(justify: false, spacing: 6pt)
  #text(font: "Sora", weight: 700, size: 20pt)[Il catalogo IKEA 2009]
  #v(8pt)
  #figure([
    #text(size: 10pt, weight: 500)[Copertina · edizione svedese · 2009]
    #v(4pt)
    #align(center, image(path("/assets/images/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2009-copertina.jpg"), width: 319.282pt, height: 380pt, fit: "contain",
      alt: "Copertina integrale del catalogo IKEA 2009, edizione svedese."))
    #v(8pt)
    #text(size: 10pt, weight: 500)[Dettaglio originale · titolo]
    #v(4pt)
    #dettaglio(path("/assets/images/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2009-copertina.jpg"), width: 137.2pt, height: 36pt,
      originale-width: 496.4pt, originale-height: 590.8pt, dx: -160.8pt, dy: -406.4pt,
      alt: "Titolo INRED, ingrandito dalla stessa copertina IKEA 2009.")
  ], kind: image, caption: [IKEA, catalogo 2009, edizione svedese: copertina integrale e dettaglio del titolo «INRED». Il documento usa parole e immagini diverse dall’edizione 2010; non è una prova a variabile unica.
    #v(4pt)#testo-diritti[© Inter IKEA Systems B.V. Fonte: IKEA Museum.]
  ]) <fig-tipo-312a>
]

// Documento autonomo della fonte: una pagina, senza fascia di note.
#tavola-documentaria[
  #set par(justify: false, spacing: 6pt)
  #text(font: "Sora", weight: 700, size: 20pt)[Il catalogo IKEA 2010]
  #v(8pt)
  #figure([
    #text(size: 10pt, weight: 500)[Copertina · edizione svedese · 2010]
    #v(4pt)
    #align(center, image(path("/assets/images/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2010-copertina.jpg"), width: 329.161pt, height: 380pt, fit: "contain",
      alt: "Copertina integrale del catalogo IKEA 2010, edizione svedese."))
    #v(8pt)
    #text(size: 10pt, weight: 500)[Dettaglio originale · titolo]
    #v(4pt)
    #dettaglio(path("/assets/images/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2010-copertina.jpg"), width: 141.923pt, height: 36pt,
      originale-width: 793.385pt, originale-height: 915.923pt, dx: -38.08pt, dy: -552.46pt,
      alt: "Titolo OLIKA, ingrandito dalla stessa copertina IKEA 2010.")
  ], kind: image, caption: [IKEA, catalogo 2010, edizione svedese: copertina integrale e dettaglio del titolo «OLIKA». Il carattere dei testi e il logotipo aziendale hanno ruoli distinti.
    #v(4pt)#testo-diritti[© Inter IKEA Systems B.V. Fonte: IKEA Museum.]
  ]) <fig-tipo-312b>
]

// Il commento conclusivo segue i due documenti; il testo successivo prosegue nel flusso.
