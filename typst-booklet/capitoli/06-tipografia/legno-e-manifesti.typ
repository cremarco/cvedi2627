// Tavole Figma 347–348: il testo segue l'alpha dell'illustrazione.
#import "../../template/stile.typ": immagine, sito
#import "../../template/sagome.typ": sagoma
#import "../../template/campioni.typ": dettaglio-figura

=== Caratteri in legno e manifesti

#sagoma(
  id: "fig-tipo-legno-materia",
  file: path("/assets/images/figure/tipografia/tipi-legno-illustrazione.png"),
  profilo: json(path("/assets/dati/sagome/tipi-legno-illustrazione.json")),
  width: 70pt,
  didascalia: [Caratteri di legno: massa e rilievo dei blocchi per lettere di grandi dimensioni.],
  alt: "Illustrazione scontornata di caratteri mobili di legno.",
)[
L’espansione di manifesti, avvisi e pubblicità nell’Ottocento amplia la gamma dei compiti assegnati alle lettere. Accanto al testo da leggere da vicino compaiono segni destinati a essere riconosciuti a distanza e in tempi brevi. Le fonderie propongono forme più pesanti, più strette, più larghe e più elaborate. Le _fat faces_ sono caratteri con grazie che esasperano il contrasto: *aste molto spesse e filetti sottili* rendono le lettere massicce senza uniformare tutti i tratti.#sito([Ilene Strizver, Guide to Typestyles: Didone Typefaces, sezione Bodoni Poster. Monotype / MyFonts.], "https://www.myfonts.com/pages/fontscom-learning-fontology-level-1-type-families-didone") Altre forme, con grazie squadrate o prive di grazie, trovano nuovi spazi nella comunicazione commerciale. La *tipografia display* esiste dunque molto prima dei computer e non coincide con un singolo stile decorativo.
]

Per i *grandi corpi*, cioè le dimensioni elevate dei caratteri necessarie ai manifesti, il legno offre vantaggi pratici rispetto al metallo: i blocchi risultano più leggeri e meno costosi da produrre (@fig-tipo-legno-materia). La raccolta del grafico _Rob Roy Kelly_ dell’Università del Texas documenta questo repertorio e permette di mettere in rapporto i blocchi con le loro prove di stampa. Nella @fig-tipo-legno-campione la forte altezza e la ridotta larghezza non sono un incidente: sono un modo di costruire una voce visiva che può salire molto senza occupare la stessa quantità di spazio in orizzontale @t06-woodtype.#sito([Rob Roy Kelly American Wood Type Collection, University of Texas at Austin, What is Wood Type?], "https://rrk.finearts.utexas.edu/info/what-is-wood-type/")

#immagine(path("/assets/images/figure/tipografia/caratteri-legno-campione-117.jpg"),
  [Tipi di legno No. 117 e relativa prova di stampa: forme strette e alte per i grandi corpi. Il gruppo tridimensionale della @fig-tipo-legno-materia è un’illustrazione di studio dei blocchi tipografici.],
  diritti: [Rob Roy Kelly American Wood Type Collection, The University of Texas at Austin.],
  alt: "Campione storico di caratteri in legno alti e stretti.") <fig-tipo-legno-campione>

Il carattere diventa così una presenza della città. L’ampiezza delle varianti rende possibile differenziare messaggi e attività, ma richiede anche una scelta: una lettera progettata per un titolo vistoso può diventare faticosa in un paragrafo minuto. La distinzione fra testo e display nasce da esigenze d’uso e non dalla semplice contrapposizione fra caratteri sobri e fantasiosi. Perfino una forma molto regolare può essere disegnata soltanto per grandi dimensioni, mentre un carattere da lettura può conservare dettagli espressivi senza ostacolare il testo.

// Il commento Figma333 richiede un richiamo ai blocchi anche alla conclusione.
// Il galleggiante nativo riserva il proprio spazio al fondo della colonna:
// non assegna righe alla prosa e non invade la fascia delle note.
#place(bottom, float: true, scope: "column", clearance: 10pt,
  block(width: 100%, breakable: false)[
    #dettaglio-figura(titolo: [Tipi in legno · massa e rilievo],
      riferimento: <fig-tipo-legno-materia>,
      didascalia: [Ripresa dell’illustrazione di studio; il documento storico No. 117 resta distinto.],
    )[
      #image(path("/assets/images/figure/tipografia/tipi-legno-illustrazione.png"),
        height: 150pt, alt: "Ripresa dell’illustrazione di studio con cinque blocchi tipografici in legno.")
    ]
  ])
