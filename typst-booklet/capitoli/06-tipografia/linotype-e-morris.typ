// Tavole Figma 348–351: composizione meccanica e revival tipografico.
#import "../../template/stile.typ": sito
#import "../../template/editoriale.typ": nota-compatta, testo-diritti
#import "../../template/doppia-pagina.typ": sagoma-regionale
#import "../../template/figure.typ": figura-pagina
#import "../../template/documenti.typ": dettaglio

// L'illustrazione della fonte attraversa il dorso. Le note restano a tutta gabbia.
// La scelta sulla fotografia mancante è ancora in attesa della risposta umana.
// Le citazioni in prosa usano la forma narrativa APA nativa, anche senza data.
#cite(<t06-lanston>, form: none)
#cite(<t06-linotype>, form: none)
#sagoma-regionale(
  id: "fig-tipo-linotype",
  file: path("/assets/images/figure/tipografia/linotype-illustrazione.png"),
  profilo: json(path("/assets/dati/sagome/linotype-illustrazione.json")),
  larghezza: 240pt,
  inizio-immagine: 170mm - 120pt,
  fondo-immagine: 240mm - 20mm - 35mm - 8pt,
  note-esterne: false,
  didascalia: [Linotype «square base», Londra, 1892: illustrazione di studio rielaborata dalla fotografia dell’esemplare. La tastiera seleziona le matrici per fondere righe intere.
    #v(4pt)#testo-diritti[Science Museum Group Collection, 1928-303. © The Board of Trustees of the Science Museum; CC BY-NC-SA 4.0.]],
  alt: "Illustrazione scontornata di una macchina Linotype con tastiera e struttura meccanica.",
)[
=== Linotype e composizione meccanica

La crescente richiesta di testi stampati spinge a meccanizzare anche il lavoro che precede l’impressione. La Linotype dell’inventore tedesco _Ottmar Mergenthaler_, introdotta commercialmente nel 1886, riunisce selezione delle matrici, giustificazione e fusione delle righe. Premendo i tasti, l’operatore fa scendere le matrici dei segni necessari; una volta completata la riga, il metallo fuso produce una barra che porta l’intera linea stampante. Le matrici vengono poi separate e ricondotte ai loro alloggiamenti per essere utilizzate di nuovo. La @fig-tipo-linotype illustra questa tipologia di macchina. Il #cite(<t06-linotype>, form: "prose") ne conserva un esemplare del 1892.#sito([Science Museum Group, Early Linotype composing machine, 1892.], "https://collection.sciencemuseumgroup.org.uk/objects/co37924/early-linotype-composing-machine-1892")

Il nome descrive questa logica: una linea di tipi diventa una sola unità di metallo. La barra, detta _slug_, è diversa dalle matrici che l’hanno generata. È questa sequenza, illustrata nel manuale della Mergenthaler Linotype Company, a rendere più rapida la preparazione del testo. La macchina non inventa una nuova lingua delle lettere: trasferisce una parte della composizione in un sistema meccanico e impone condizioni produttive con cui anche il disegno dei caratteri deve confrontarsi @t06-rogers1925.#nota-compatta([Rogers, manuale Linotype (1925); Smithsonian, Mergenthaler Linotype Company Records.], ("https://www.linotype.org/OnLineDocs/LinotypeInstructionBook-1925/LIB-contents.pdf", "https://collections.si.edu/search/detail/ead_collection%3Asova-nmah-ac-0666"))

Il sistema *Monotype* affronta la composizione con una soluzione differente: una tastiera prepara un nastro perforato che comanda una fonditrice, capace di produrre singoli tipi e disporli in righe. Il #cite(<t06-lanston>, form: "prose") conserva una macchina Lanston del 1897 che documenta questa logica. La differenza rispetto alla Linotype riguarda quindi l’unità fusa: il carattere singolo oppure la riga intera. In entrambi i casi il comando meccanico prepara il testo da stampare; non va confuso con il procedimento che trasferisce l’inchiostro sul foglio.#sito([Science Museum Group, Composition caster, Lanston Monotype Corporation, 1897.], "https://collection.sciencemuseumgroup.org.uk/objects/co8989730/composition-caster-by-the-lanston-monotype-corporation-ltd-1897")

Da qui occorre tenere separati due percorsi. La *fotocomposizione* registra i segni con la luce su carta o pellicola fotosensibile, anziché fondere righe.#nota-compatta([USITC, Publication 2281 (1990), p. 7: fotocomposizione su materiale fotosensibile.], "https://www.usitc.gov/publications/701_731/pub2281.pdf") La *composizione digitale* prepara poi il testo come dati. L’offset è un procedimento di stampa indiretta: l’immagine inchiostrata passa dalla lastra a un cilindro rivestito di gomma e poi al foglio. Riguarda quindi il trasferimento dell’immagine sul supporto. Perciò non è corretto affermare che l’offset «sostituì la Linotype» come se fossero due macchine concorrenti per la stessa operazione. Un testo composto in un file può essere destinato a una lastra per la stampa offset oppure a una macchina digitale. La storia delle tecnologie procede attraverso intrecci e coesistenze: una fase prepara il contenuto, un’altra lo rende visibile sulla carta.

=== _William Morris_ e il revival tipografico

L’industrializzazione non produce una sola idea di progresso. _William Morris_, designer e scrittore inglese, fonda la Kelmscott Press nel 1891. Studia i libri del Quattrocento per migliorare la stampa. Golden, Troy e Chaucer sono i suoi caratteri: Golden è un romano ispirato a _Nicolas Jenson_, stampatore a Venezia nel XV secolo; Troy è gotico e Chaucer ne è una versione più piccola. Il #cite(<t06-morris-archive>, form: "prose") dell’Università dell’Iowa conserva i libri della stamperia.#sito([William Morris Archive, University of Iowa, Typefaces.], "https://morrisarchive.lib.uiowa.edu/exhibits/show/bookarts/kelmscottpress/typefaces")

Il riferimento storico non consiste nel prelevare una lettera e ripeterla senza modifiche. _Morris_ osserva le stampe, le fa ingrandire fotograficamente e ridisegna le forme; i punzoni vengono incisi da _Edward Prince_, punzonista per le stamperie d’arte. La collaborazione fra chi concepisce il carattere e chi realizza gli strumenti resta determinante. Il passato diventa un materiale da interpretare, mentre tecnologie relativamente recenti, come la fotografia, rendono possibile studiarlo con una precisione diversa.

Il ridisegno dei tipi antichi di _Morris_ mostra due strade. Un revival tipografico può cercare fedeltà documentaria, oppure può assumere un modello come punto di partenza per un nuovo impiego. In entrambi i casi occorre dichiarare quale fonte si sta osservando e quale trasformazione è stata compiuta. Una versione digitale di un carattere storico deve affrontare schermi, repertori e dimensioni che il suo modello non conosceva. L’interesse della storia sta anche in questo: mostra che conservare una tradizione e inventare nuove forme sono attività che possono procedere insieme, purché non si confondano l’originale e la sua reinterpretazione.
]

Il documento della Kelmscott Press del 16 febbraio 1897 confronta Golden, Troy e Chaucer (@fig-tipo-morris-caratteri). La pagina di _The Well at the World’s End_, stampata dalla Kelmscott Press nel 1896 (@fig-tipo-kelmscott), mostra l’iniziale ornata e il testo gotico in due colonne. Il progetto di _William Morris_ riprende modelli antichi e li rielabora nel contesto produttivo di fine Ottocento @t06-kelmscott.#sito([The Metropolitan Museum of Art, William Morris, The Well at the World’s End, 1896.], "https://www.metmuseum.org/art/collection/search/354288")

#figure(
  dettaglio(path("/assets/images/figure/tipografia/morris-kelmscott-tre-caratteri-1897.jpg"),
    width: 187.09pt, height: 61.854pt, originale-width: 359.671pt, originale-height: 479.561pt,
    dx: -91.64pt, dy: -94.69pt, alt: "Tre righe originali che identificano i caratteri Golden, Troy e Chaucer."),
  kind: image, caption: [Documento Kelmscott Press, 16 febbraio 1897. _William Morris_; pubblico dominio.],
) <fig-tipo-morris-caratteri>

#figura-pagina(
  id: "fig-tipo-kelmscott",
  file: path("/assets/images/figure/tipografia/morris-kelmscott-well-worlds-end-1896.png"),
  didascalia: [_William Morris_, _The Well at the World’s End_, Kelmscott Press, 1896. Iniziale ornata e testo gotico in due colonne; dettaglio della pagina destra.],
  diritti: [The Metropolitan Museum of Art, 17.3.2641(13), Harris Brisbane Dick Fund, 1917. Public Domain.],
  alt: "Pagina della Kelmscott Press con iniziale decorata, testo gotico su due colonne e bordo ornamentale.",
)
