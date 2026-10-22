// Una vera sagoma alpha sulla doppia pagina, con un solo corpo di prosa.
// Il profilo deriva dall'immagine originale; le note mantengono la fascia ordinaria.
#import "../../../template/editoriale.typ": testo-diritti
#import "../../../template/stile.typ": immagine, sito
#import "../../../template/doppia-pagina.typ": sagoma-regionale
#import "../../../template/documenti.typ": tavola-documentaria
#import "../../../template/campioni.typ": campione

// Il documento completo conserva il contesto del dettaglio precedente e occupa
// il foglio che serve ad allineare la doppia pagina seguente. Nessuna prosa divisa.
#tavola-documentaria[
    #immagine(path("/assets/images/figure/tipografia/esempi/marchi/eurostile-campionario-nebiolo.png"),
      [Eurostile: il campionario Nebiolo completo permette di osservare il rapporto fra le varianti. Il dettaglio «Incomunicabili» è mostrato nella @fig-tipo-eurostile-microgramma.],
      diritti: [Nebiolo; riproduzione Archivio Tipografico.],
      alt: "Due pagine del campionario storico Eurostile, con parole, corpi e larghezze differenti.",
      width: 137mm,
    ) <fig-tipo-eurostile-documento>
]


// La vista completa dà contesto al ritaglio CARGO già usato nel confronto.
// È uno specimen digitale promozionale: non un documento stampato nel 1952.
#tavola-documentaria[
  #immagine(path("/assets/images/figure/tipografia/esempi/marchi/microgramma-urw-specimen-digitale.png"),
    [Microgramma: specimen digitale promozionale URW/MyFonts. La scritta «CARGO» ingrandita nella @fig-tipo-eurostile-microgramma appartiene a questa composizione contemporanea; la data 1952 nell’immagine richiama l’origine del carattere.],
    diritti: [URW Type Foundry / MyFonts.],
    alt: "Specimen digitale URW Microgramma: nome del carattere e autori sopra un camion con la scritta CARGO COMPANY.",
    width: 137mm,
  ) <fig-tipo-microgramma-documento>
]

#sagoma-regionale(
  id: "fig-tipo-308a",
  file: path("/assets/images/figure/tipografia/esempi/marchi/langosteria-apertura-volto-spumeggiante-alpi.png"),
  profilo: json(path("/assets/dati/sagome/langosteria-apertura-editoriale.json")),
  larghezza: 476pt,
  inizio-immagine: 170mm - 238pt,
  fondo-immagine: 476pt * 1241 / 1645,
  note-esterne: false,
  didascalia: [Langosteria, apertura «Il volto spumeggiante delle Alpi»: il maiuscolo del titolo si distingue dai testi di lettura.
    #v(4pt)#testo-diritti[CBA Design per Langosteria; illustrazioni Elisa Macellari.]],
  alt: "Menu Langosteria aperto sul dorso delle due pagine, con titolo e illustrazione delle Alpi; calice e bordo del libro scontornati.",
)[
=== La tipografia di Langosteria

Nel progetto di CBA per Langosteria il carattere dei titoli si riconosce per le *proporzioni slanciate e l’alto contrasto* fra tratti. Le aste sottili e le parti più piene costruiscono una presenza incisiva senza ricorrere necessariamente a un peso massiccio. I campioni documentari consentono di osservare come i segni vengano accostati per formare il nome e come il ritmo delle lettere ritorni nelle titolazioni (dalla @fig-tipo-308a alla @fig-tipo-308d). La fonte del progetto descrive questi aspetti senza identificare un particolare file Bodoni. È quindi più corretto riconoscere una parentela con i serif ad alto contrasto che attribuire alla famiglia storica qualsiasi scritta dalla forma simile. «Bodoni» comprende inoltre interpretazioni differenti: per usare il nome come identificazione tecnica servirebbero la versione, la fonderia e il riscontro dei contorni. Qui la descrizione delle lettere fornisce già gli strumenti necessari per discutere la scelta. Nel menu documentato dalla @fig-tipo-309, «COCKTAILS» è in maiuscolo con grazie; i nomi dei cocktail sono senza grazie e più pesanti delle descrizioni e dei prezzi. Il carattere distintivo del titolo può restare concentrato nelle poche parole a cui è affidata l’espressione della marca; un testo più fitto richiede invece di controllare il peso, i dettagli e la spaziatura nella misura di lettura. Le immagini documentano un uso concreto: non sono una prova di superiorità di quel serif su tutte le altre soluzioni @t06-langosteria.#sito([CBA Design, Langosteria: ritmo, ricerca e gusto.], "https://cba-design.com/italy/work/langosteria-rebranding/")

Il rapporto fra identità e *testo variabile* emerge quando immaginiamo di sostituire una voce corta con un nome lungo, ricco di accenti o di consonanti consecutive. La personalità deve sopravvivere senza ricorrere a deformazioni geometriche o a spaziature arbitrarie. Studiare il caso significa perciò seguire ciò che rimane *riconoscibile attraverso parole diverse*: contrasto, proporzioni e trattamento dei segni. Le scelte di gabbia e l’organizzazione generale del menu appartengono all’impaginazione; qui ci interessa il comportamento della voce tipografica.

]

// Meander divide soltanto la prosa: le figure numerate restano nel flusso nativo.
// I dettagli condividono una fascia grafica; caption e diritti crescono col testo.
#tavola-documentaria[
  #grid(columns: (1fr, 1fr), column-gutter: 5mm,
    [#campione(fascia: 106pt,
      didascalia: [Langosteria: nel monogramma L si distinguono tratti sottili e spessi.],
      diritti: [CBA Design per Langosteria.],
    )[
      #image(path("/assets/images/figure/tipografia/esempi/marchi/langosteria-monogramma-l.png"),
        width: 106pt, alt: "Langosteria: monogramma L con contrasto fra tratti sottili e spessi.")
    ] <fig-tipo-308b>],
    [#campione(fascia: 106pt,
      didascalia: [Langosteria: contrasto dei tratti e accostamento ravvicinato di L e A nel logotipo.],
      diritti: [CBA Design per Langosteria.],
    )[
      #image(path("/assets/images/figure/tipografia/esempi/marchi/langosteria-logotipo-la.png"),
        width: 187.09pt, alt: "Langosteria: accostamento ravvicinato di L e A nel logotipo.")
    ] <fig-tipo-308c>],
  )
  #v(16pt)
  #immagine(path("/assets/images/figure/tipografia/esempi/marchi/langosteria-campione-tipografico-cba.png"),
    [Langosteria, campione CBA: proporzioni slanciate e tratti ad alto contrasto.],
    diritti: [Identità CBA Design; illustrazioni Elisa Macellari.],
    alt: "Langosteria, campione CBA: proporzioni slanciate e tratti ad alto contrasto.",
    width: 137mm,
  ) <fig-tipo-308d>
]

#tavola-documentaria[
#immagine(path("/assets/images/figure/tipografia/esempi/marchi/langosteria-menu-cocktail-cba.jpg"),
  [Menu Langosteria: titoli, nomi dei cocktail e ingredienti cambiano cassa e peso.],
  diritti: [CBA Design; illustrazioni Elisa Macellari.],
  alt: "Menu Langosteria: titoli, nomi dei cocktail e ingredienti cambiano cassa e peso.",
  width: 137mm,
) <fig-tipo-309>
]
