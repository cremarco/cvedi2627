// Capitolo 08: prosa condivisa dal volume e dalla compilazione autonoma.
#import "../template/layout.typ": booklet, chapter, website-note
#import "../template/plan.typ": chapter-parameters
#import "../template/exercises.typ": exercise
#import "../template/figures.typ": image-figure, image-spread, keep-together
#import "../template/editorial.typ": caption-content, panel-letter
// Fonti Figma, materiali preparatori e originali sono registrati nel manifest.
#import "../assets/diagrams/composition-examples.typ": (
  invitation-comparison, metaphor-comparison, visual-search, action-priorities,
  balance-comparison)

#let content = [
== Dalle parti al messaggio

Una pagina può avere una griglia regolare, un carattere leggibile e una palette coerente, e lasciare comunque incerto il lettore. Per capire un invito occorre distinguere che cosa accade, quando, dove e come partecipare. Per modificare una prenotazione bisogna riconoscere l’appuntamento e trovare l’azione pertinente. La composizione mette in relazione queste informazioni e attribuisce loro un peso.

Il capitolo sulle griglie ha mostrato che un reticolo regolare può contenere una gerarchia confusa. La composizione affronta questo limite: usa gli obiettivi e le condizioni d’uso emersi dalla ricerca per coordinare raggruppamenti percettivi, colore, tipografia e struttura spaziale, rispettando le esigenze di accessibilità.

Partiremo dalla domanda del lettore per scegliere immagini e segni, metterli in relazione nello spazio e costruire le priorità. Distingueremo poi le intenzioni del progetto dai modi di consultare la pagina, fino alla lettura dei casi e alla verifica di una proposta.

Il linguaggio visivo offre forma, colore, immagine e spazio. La griglia stabilisce riferimenti e possibilità di collocazione; il layout è la disposizione concreta degli elementi. La gerarchia rende riconoscibili le priorità del contenuto attraverso differenze di dimensione, contrasto, posizione, distanza e trattamento tipografico. Questi strumenti collaborano: un titolo isolato può risaltare anche senza occupare l’area maggiore della pagina @compGordon.

=== Cominciare dal lettore

La domanda da cui partire riprende il lavoro della ricerca: che cosa cerca la persona e in quale situazione? Nel caso simulato di _Sara_, già incontrato nei capitoli di ricerca e griglia, il compito è riconoscere l’appuntamento e modificarlo. La gerarchia deve rendere distinguibili i dati della prenotazione e l’azione pertinente. Le differenze visive devono essere usate in modo coerente in tutta l’interfaccia e verificate con persone reali, per accertare che aiutino davvero a trovare l’informazione cercata.

La stessa attenzione al compito guida l’invito a un laboratorio. Una buona gerarchia suggerisce un percorso di lettura senza imporre un’unica sequenza di consultazione: chi usa la pagina può scegliere da dove partire. Una persona che conosce già il laboratorio può cercare subito la data; un’altra può aver bisogno di capire prima l’argomento. La composizione deve sostenere entrambe le consultazioni, rendendo visibili le relazioni fra le parti.

#figure(block(width: 100%)[
  #set text(size: 10pt, weight: 400, variations: (opsz: 18))
  #set par(justify: false, leading: 2pt, spacing: 7pt)
  #invitation-comparison()
],
  kind: image, placement: top, scope: "parent",
  caption: caption-content([Lo stesso contenuto in tre composizioni simulate: a. informazioni con peso simile; b. titolo, data e luogo distinti; c. invito all’azione riconoscibile. La trasformazione rende esplicite le priorità.], rights: none),
)#label("fig-comp-" + "invito")

Nella @fig-comp-invito il contenuto resta quasi identico, mentre cambiano i rapporti. Il titolo identifica l’attività; data e orario formano un gruppo; nome e indirizzo individuano il luogo. Il comando finale propone il passo successivo.

La variazione distingue i ruoli, senza ingrandire ogni elemento: è questo rapporto fra differenze visive e funzioni del contenuto che permette di motivare una gerarchia.

=== Dare una funzione alle differenze

Dal compito del lettore si ricava quindi un criterio per scegliere quali differenze introdurre. Una differenza visiva è utile quando permette di comprendere una differenza di contenuto. Se il colore acceso identifica il comando principale, applicarlo anche a tre promozioni e a un avviso secondario rende quel segnale meno selettivo. Se due testi hanno lo stesso peso, la loro posizione e la distanza possono comunque chiarire che uno è un titolo e l’altro un valore.

Prima di scegliere un effetto, conviene formulare una priorità verificabile: «La persona deve riconoscere il servizio e trovare la modifica dell’appuntamento». Questa frase permette di discutere una composizione in termini concreti. La domanda diventa quale elemento aiuti il compito, quale lo ostacoli e quali informazioni debbano restare disponibili durante l’azione.

== Forma, colore e materia

Definita la domanda del lettore, occorre scegliere con quali elementi rappresentare il contenuto. Riprendiamo forma, colore e materia per capire quali possibilità offrono alla composizione: le forme delimitano e distinguono gli elementi; il colore costruisce relazioni e contrasti; le superfici suggeriscono qualità visive e tattili. Entrano nelle immagini, nei segni e nei rapporti spaziali della pagina senza possedere un significato fisso separato dall’uso. Un cerchio può essere un marchio, un comando, un indicatore di stato o una semplice campitura: il contesto ne precisa la funzione.

=== Forme geometriche

Le forme regolari offrono un punto di partenza per confrontare orientamento, simmetria e ripetizione. I marchi che seguono permettono di osservare come una stessa geometria sostenga identità differenti.

Il quadrato è caratterizzato da lati uguali e angoli retti. La simmetria e la regolarità possono suggerire stabilità ed equilibrio; la sua struttura permette di costruire sistemi modulari o composizioni più articolate. Nei marchi della @fig-comp-quadrato, la forma offre un perimetro e un riferimento comune, mentre segni e colori distinguono le identità.

Il cerchio è la regione delimitata da una circonferenza, i cui punti sono equidistanti dal centro. La simmetria può evocare continuità; alcune composizioni circolari suggeriscono movimento. Il ruolo centrale o di supporto dipende dalla dimensione e dalla relazione con gli altri elementi, come negli esempi della @fig-comp-cerchio.

#image-figure(path("/risorse-condivise/immagini/figure/composizione/quadrato.svg"),
  [Il quadrato come struttura geometrica nei marchi.],
  format: "una-colonna",
  id: "fig-comp-quadrato",
  rights: none,
  alt: "Il quadrato come struttura geometrica nei marchi.",
  aspect-ratio: 2.770992218501984,
  height: 110mm,
)

#image-figure(path("/risorse-condivise/immagini/figure/composizione/cerchio.svg"),
  [Il cerchio come struttura geometrica nei marchi.],
  format: "una-colonna",
  id: "fig-comp-cerchio",
  rights: none,
  alt: "Il cerchio come struttura geometrica nei marchi.",
  aspect-ratio: 2.77099245621688,
  height: 110mm,
)

Il triangolo equilatero ha tre lati uguali e tre angoli interni di 60°. Quando poggia su un lato può apparire stabile; se poggia su un vertice, la stessa figura può suggerire un equilibrio più precario. L’orientamento modifica quindi il rapporto con lo spazio circostante. Nella @fig-comp-triangolo, la geometria è una risorsa costruttiva del marchio, non una spiegazione sufficiente del suo significato.

L’esagono regolare ha sei lati uguali e angoli interni di 120°. La ripetizione permette di costruire strutture modulari senza interstizi. Regolarità, angoli e combinazioni possono sostenere impressioni di ordine, continuità o dinamismo, da leggere nella composizione concreta della @fig-comp-esagono.

#image-figure(path("/risorse-condivise/immagini/figure/composizione/triangolo.svg"),
  [Il triangolo come struttura geometrica nei marchi.],
  format: "una-colonna",
  id: "fig-comp-triangolo",
  rights: none,
  alt: "Il triangolo come struttura geometrica nei marchi.",
  aspect-ratio: 2.7709923017725937,
  height: 110mm,
)

#image-figure(path("/risorse-condivise/immagini/figure/composizione/esagono.svg"),
  [L’esagono come struttura geometrica nei marchi.],
  format: "una-colonna",
  id: "fig-comp-esagono",
  rights: none,
  alt: "L’esagono come struttura geometrica nei marchi.",
  aspect-ratio: 2.7709923730053814,
  height: 110mm,
)

=== Forme astratte e corrispondenze

Dalla struttura geometrica possiamo passare alle associazioni suscitate dal profilo di un segno, anche quando non rappresenta un oggetto. Le forme astratte si allontanano dalla rappresentazione realistica attraverso semplificazioni, deformazioni e combinazioni. Possono conservare un richiamo riconoscibile oppure essere non figurative. Il confronto fra suoni e forme aiuta a interrogare queste associazioni prima di usarle nel progetto.

L’esperimento associato ai nomi inventati «Takete» e «Maluma», di _Wolfgang Köhler_, mette in relazione suoni e forme. La @fig-comp-takete-maluma confronta un profilo angoloso e uno arrotondato. L’associazione più frequente fra il primo e «Takete», fra il secondo e «Maluma», illustra una corrispondenza fra modalità sensoriali; non assegna un significato universale a ogni curva.

#figure(block(width: 100%)[
  #set text(size: 10pt, weight: 400, variations: (opsz: 18))
  #set par(justify: false, leading: 2pt, spacing: 7pt)
  #grid(columns: (1fr, 1fr), column-gutter: 12pt, row-gutter: 6pt,
    image(path("/progetti/booklet/assets/takete-maluma/takete.svg"), width: 100%,
      alt: "Takete: un tracciato angoloso con segmenti incrociati, ripreso dai disegni di Köhler."),
    image(path("/progetti/booklet/assets/takete-maluma/maluma.svg"), width: 100%,
      alt: "Maluma: un tracciato curvilineo continuo a tre lobi con incroci, ripreso dai disegni di Köhler."),
    align(center)[#panel-letter[a] · Takete],
    align(center)[#panel-letter[b] · Maluma],
  )
],
  kind: image, placement: top, scope: "column",
  caption: caption-content([Profili spigolosi e curvilinei a confronto. @compShinohara],
    rights: [Da _Shinohara et al._ (2016), fig. 1a, su disegni di _Wolfgang Köhler_. CC BY 4.0; colore e disposizione adattati.]),
)#label("fig-comp-" + "takete-maluma")

#block(above: 10pt, below: 10pt, breakable: false)[
#image-figure(path("/progetti/booklet/assets/bouba-kiki/bouba.svg"),
  [Bouba: lo stimolo arrotondato usato nello studio. @compCwiek],
  format: "sagoma", id: "fig-comp-bouba",
  profile: json(path("/progetti/booklet/assets/bouba-kiki/derivati/bouba.json")),
  width: 48pt, side: right,
  rights: [Da _Ćwiek et al._, fig. 1, con forme adattate da _Bremner et al._ (2013). CC BY 4.0; sfondo reso trasparente.],
  alt: "Bouba: stimolo originale nero con sette lobi arrotondati, su fondo trasparente.",
)[
Una ricerca successiva su «bouba» e «kiki» ha coinvolto 917 partecipanti di 25 lingue e dieci sistemi di scrittura, trovando una robusta tendenza complessiva all’associazione fra suono e forma @compCwiek.
]
]

#block(above: 10pt, below: 10pt, breakable: false)[
#image-figure(path("/progetti/booklet/assets/bouba-kiki/kiki.svg"),
  [Kiki: lo stimolo appuntito usato nello studio. @compCwiek],
  format: "sagoma", id: "fig-comp-kiki",
  profile: json(path("/progetti/booklet/assets/bouba-kiki/derivati/kiki.json")),
  width: 48pt, side: left,
  rights: [Da _Ćwiek et al._, fig. 1, con forme adattate da _Bremner et al._ (2013). CC BY 4.0; sfondo reso trasparente.],
  alt: "Kiki: stimolo originale nero con sette punte disuguali, su fondo trasparente.",
)[
La presenza di differenze fra persone e gruppi invita a distinguere una regolarità sperimentale dalla comprensione di un marchio o di un comando: quest’ultima richiede un contesto e una verifica specifici.
]
]

// Image coordinates are relative to the text grid; prose flows continuously.
#image-spread((
  (
    file: path("/progetti/booklet/assets/forme-naturali-scontornate/immagini/foglia.png"),
    format: "sagoma", id: "fig-comp-forme-naturali",
    profile: json(path("/progetti/booklet/assets/forme-naturali-scontornate/profili/foglia.json")),
    page: 0, x: 248pt, y: 20pt, width: 140pt, caption-x: 201pt,
    caption: [Texture e geometrie naturali: venature di una foglia.],
    rights: [CVeDI, 2026.],
    alt: "Foglia intera verde con nervatura centrale e venature diagonali, su fondo trasparente.",
  ),
  (
    file: path("/progetti/booklet/assets/forme-naturali-scontornate/immagini/fiore.png"),
    format: "sagoma", id: "fig-comp-fiore",
    profile: json(path("/progetti/booklet/assets/forme-naturali-scontornate/profili/fiore.json")),
    page: 0, x: 0pt, y: 270pt, width: 140pt,
    caption: [Texture e geometrie naturali: petali e centro di un fiore.],
    rights: [CVeDI, 2026.],
    alt: "Fiore intero visto frontalmente, con petali bianchi e centro giallo ricco di piccoli elementi, su fondo trasparente.",
  ),
  (
    file: path("/progetti/booklet/assets/forme-naturali-scontornate/immagini/conchiglia.png"),
    format: "sagoma", id: "fig-comp-conchiglia",
    profile: json(path("/progetti/booklet/assets/forme-naturali-scontornate/profili/conchiglia.json")),
    page: 1, x: 124pt, y: 100pt, width: 140pt, caption-x: 201pt,
    caption: [Texture e geometrie naturali: spirale di una conchiglia.],
    rights: [CVeDI, 2026.],
    alt: "Conchiglia spiraliforme intera con rilievi e sfumature grigie e ocra, su fondo trasparente.",
  ),
), pages: 2)[
=== Forme naturali e texture

L’osservazione può estendersi dalle geometrie regolari alle strutture naturali e alle superfici. Foglie, fiori e conchiglie offrono simmetrie, ramificazioni, ripetizioni e spirali; studiarle può guidare l’ideazione, come mostrano le figure #ref(<fig-comp-forme-naturali>, supplement: none), #ref(<fig-comp-fiore>, supplement: none) e #ref(<fig-comp-conchiglia>, supplement: none). Le proporzioni naturali variano e il richiamo alla natura non prova la sostenibilità del prodotto: per valutarla occorrono informazioni sulle sue caratteristiche.

Dalla struttura di una forma si passa alla qualità visibile della sua superficie. La texture descrive l’organizzazione visibile di una superficie: venature, grana, trama, rilievi o ripetizioni. Una fotografia del legno mostra differenze di colore e luminosità dalle quali possiamo immaginare una qualità tattile; una campitura digitale può riprenderle senza possedere quel materiale. Distinguere superficie fisica e sua rappresentazione aiuta a leggere il rapporto fra confezione, fotografia e interfaccia.

In una pagina, una texture può unificare uno sfondo oppure introdurre un contrasto con un’area liscia. Il suo dettaglio va però confrontato con testo e controlli. Se la trama compete con le lettere o simula un rilievo ambiguo, può ostacolare la lettura del comando. La verifica riguarda la composizione alla dimensione d’uso, non il solo campione ingrandito. Materialità, luce e spazio vanno considerati insieme @compArnheim.

=== Il colore nella composizione

Forma e superficie partecipano al messaggio insieme al colore. Il capitolo sul colore ne ha distinto proprietà, associazioni culturali e ruoli funzionali; qui interessa come la palette collabori con soggetti, parole e luce per costruire un’atmosfera. Più avanti ne osserveremo l’uso per distinguere le priorità.

I colori possono assumere significati culturali e qualità espressive che cambiano con il contesto. Luminosità, saturazione, contrasto e colori circostanti ne modificano la presenza. Il rosso può richiamare festa, fortuna, pericolo o divieto secondo le convenzioni; può suggerire energia e urgenza, ma risalta soltanto in relazione all’ambiente cromatico. Il blu può richiamare istituzioni, tecnologia o malinconia, e contribuire a impressioni di calma, distanza o stabilità.

Queste associazioni sono possibilità progettuali. Nel paesaggio della @fig-comp-paesaggio-xilografia, osserviamo il rapporto fra il soggetto e le campiture, senza trasformare ogni tinta in un’emozione obbligatoria. La palette partecipa a un messaggio più ampio, che comprende soggetti, parole, luce e composizione.
]

== Immagini, segni e significato

Forme, colori e superfici diventano parte di immagini e segni ai quali il lettore attribuisce un significato. Per sceglierli non basta riconoscerne lo stile: occorre stabilire quale informazione aggiungano e quale funzione assumano nella pagina. Fotografia e illustrazione possono descrivere contenuti, evocare atmosfere e sostenere un racconto; metafore e icone pongono anche il problema delle convenzioni necessarie a comprenderle.

Le figure #ref(<fig-comp-fotografia-illustrazione>, supplement: none), #ref(<fig-comp-paesaggio-xilografia>, supplement: none) e #ref(<fig-comp-afghan-girl>, supplement: none) presentano immagini differenti per mezzo e soggetto. Il confronto serve a osservare che cosa viene mostrato e quale interpretazione può nascere dal contesto.

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/pranzo-grattacielo.jpeg"),
  [_Lunch Atop a Skyscraper_: scena di vita nella fotografia.],
  format: "una-colonna",
  id: "fig-comp-fotografia-illustrazione",
  rights: [Bettmann / Getty Images.],
  alt: "Lunch Atop a Skyscraper: scena di vita nella fotografia.",
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/paesaggio-xilografia.jpeg"),
  [Paesaggio con il monte Fuji: illustrazione xilografica.],
  format: "una-colonna",
  id: "fig-comp-paesaggio-xilografia",
  rights: none,
  alt: "Paesaggio con il monte Fuji: illustrazione xilografica.",
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/afghan-girl.png"),
  [_Afghan Girl_: ritratto fotografico.],
  format: "una-colonna",
  id: "fig-comp-afghan-girl",
  rights: [© _Steve McCurry_.],
  alt: "Afghan Girl: ritratto fotografico.",
)

=== Evocare, descrivere, sintetizzare

La scelta comincia dalla funzione: che cosa deve permettere di capire quell’immagine? Il suo ruolo dipende dal messaggio, dal testo che la accompagna e dal punto in cui compare. Nelle figure @fig-comp-funzioni-immagini, @fig-comp-funzione-descrittiva e @fig-comp-funzione-sintetica, l’ambiente del locale può evocare un’atmosfera; le pietanze descrivono l’offerta; i piccoli segni sintetizzano categorie. Queste funzioni possono coesistere. Una fotografia usata come sfondo e la stessa fotografia accostata a una descrizione rispondono a domande diverse.

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/funzione-evocativa.png"),
  [Funzione evocativa: la fotografia dell’ambiente suggerisce l’atmosfera di un locale.],
  format: "una-colonna",
  id: "fig-comp-funzioni-immagini",
  rights: none,
  alt: "Funzione evocativa: la fotografia dell’ambiente suggerisce l’atmosfera di un locale.",
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/funzione-descrittiva.png"),
  [Funzione descrittiva: le fotografie delle pietanze presentano l’offerta.],
  format: "una-colonna",
  id: "fig-comp-funzione-descrittiva",
  rights: none,
  alt: "Funzione descrittiva: le fotografie delle pietanze presentano l’offerta.",
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/funzione-sintetica.png"),
  [Funzione sintetica: piccoli segni identificano categorie.],
  format: "una-colonna",
  id: "fig-comp-funzione-sintetica",
  rights: none,
  alt: "Funzione sintetica: piccoli segni identificano categorie.",
)

In un tutorial può mostrare il risultato di un passaggio; in una ricetta può permettere di confrontare una consistenza; in un catalogo può documentare una finitura. La fotografia d’ambiente di un ristorante aiuta invece a immaginare lo spazio, ma non sostituisce l’indirizzo o gli orari. Questa distinzione evita di affidare a un’atmosfera informazioni operative che richiedono parole precise.

In un portfolio l’immagine può essere l’oggetto stesso della consultazione: il lettore deve esaminare il lavoro, non soltanto percepire uno stile. In una scheda prodotto, viste generali e dettagli possono rispondere a domande complementari su proporzioni, materiali e uso. Prima di aggiungere una nuova fotografia, è utile stabilire quale informazione renda disponibile rispetto a quelle già presenti.

=== Fotografia o illustrazione

Una volta definito che cosa comunicare, si sceglie come rappresentarlo. Fotografia e illustrazione offrono possibilità diverse da confrontare rispetto alla stessa funzione.

Le figure @fig-comp-allbirds-headspace e @fig-comp-headspace mostrano due scelte: Allbirds mette in scena persone, prodotto e ambiente; Headspace costruisce personaggi e situazioni con forme e colori coerenti.#website-note([Allbirds, sito ufficiale; la figura conserva una versione storica.], "https://www.allbirds.com/")#website-note([Headspace, sito ufficiale; la figura conserva una versione storica.], "https://www.headspace.com/")

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/allbirds.png"),
  [Allbirds: fotografia ambientata nella comunicazione del prodotto.],
  format: "due-colonne",
  id: "fig-comp-allbirds-headspace",
  rights: [© Allbirds. Versione storica; data della cattura non indicata.],
  alt: "Allbirds: fotografia ambientata nella comunicazione del prodotto.",
  height: 110mm,
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/headspace.png"),
  [Headspace: personaggi e scene illustrati.],
  format: "due-colonne",
  id: "fig-comp-headspace",
  rights: [© Headspace. Versione storica; data della cattura non indicata.],
  alt: "Headspace: personaggi e scene illustrati.",
  height: 110mm,
)

Nessuno dei due mezzi garantisce da solo autenticità, comprensione o memorabilità. Una fotografia può essere messa in scena; un’illustrazione può documentare accuratamente una struttura. La scelta considera pertinenza, livello di dettaglio, stile, disponibilità dei soggetti e leggibilità nella composizione finale.

Proporzioni corrette e risoluzione sufficiente permettono di esaminare i dettagli, ma una foto nitida può essere poco utile al compito e un ritaglio scorretto può eliminare informazioni necessarie. Anche una fotografia stock va scelta per ciò che comunica nella pagina, considerando la genericità e il rapporto con il testo.

=== Contesto e interpretazione

La scelta del mezzo lascia aperta una seconda domanda: su quali indizi si costruisce l’interpretazione? Come nel lavoro di ricerca, descrivere ciò che è osservabile va distinto dall’attribuirgli un significato. Titolo, attribuzione e contesto aiutano a leggere una fotografia e a precisarne l’interpretazione. Le figure @fig-comp-doisneau-widener e @fig-comp-widener presentano separatamente _Le Baiser de l’Hôtel de Ville_, di _Robert Doisneau_ (1950), e _Tank Man_, di _Jeff Widener_ per Associated Press (1989). Inquadratura e relazioni fra le figure sostengono la lettura; una didascalia aggiunge informazioni che l’immagine da sola non restituisce.

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/doisneau.png"),
  [_Le Baiser de l’Hôtel de Ville_, _Robert Doisneau_, 1950.],
  format: "una-colonna",
  id: "fig-comp-doisneau-widener",
  rights: [© Atelier _Robert Doisneau_.],
  alt: "Le Baiser de l’Hôtel de Ville, Robert Doisneau, 1950.",
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/widener.png"),
  [_Tank Man_, _Jeff Widener_ / Associated Press, 1989.],
  format: "una-colonna",
  id: "fig-comp-widener",
  rights: [© _Jeff Widener_ / Associated Press.],
  alt: "Tank Man, Jeff Widener / Associated Press, 1989.",
)

Descrivere chi o che cosa è visibile viene prima dell’attribuire un’intenzione. Un gruppo di persone non documenta da solo un consenso; un volto sorridente non prova la soddisfazione per un servizio. La distinzione fra riconoscimento, convenzione e interpretazione è centrale nell’analisi delle immagini @compPolidoro.

Quando cambia il contesto, può cambiare anche la funzione del segno. Una stella può indicare un preferito, una valutazione o una categoria di servizio. Il disegno comune non rende equivalenti queste azioni. Testo vicino, posizione, stato selezionato e comportamento del controllo precisano il significato nella singola interfaccia.

=== Metafore visive

Il rapporto fra ciò che si vede e ciò che si intende può diventare una scelta espressiva deliberata. Una metafora mette in relazione due ambiti attraverso una caratteristica condivisa. Nell’immagine pubblicitaria il soggetto di cui si parla può essere sostituito da un altro oppure fuso con esso; riconoscere il trasferimento richiede di comprendere entrambi i riferimenti @compForceville. Questa relazione può rendere un messaggio più sintetico, ma può anche diventare oscura se la convenzione non è familiare al destinatario.

#figure(block(width: 100%)[
  #set text(size: 10pt, weight: 400, variations: (opsz: 18))
  #set par(justify: false, leading: 2pt, spacing: 7pt)
  #metaphor-comparison(
    battery-alt: "Batteria carica, segno usato per rappresentare una pausa caffè.",
    cup-alt: "Tazza con le barre di una batteria: fusione di due soggetti.")
],
  kind: image, placement: top, scope: "column",
  caption: caption-content([Due immagini per l’ipotetico messaggio «Una pausa caffè per ripartire»: a. la batteria sostituisce la tazza; b. tazza e batteria sono fuse. Il riferimento all’energia è figurato e dipende dal contesto del messaggio.], rights: none),
)#label("fig-comp-" + "metafore")

Nella @fig-comp-metafore, la batteria rappresenta figurativamente una pausa caffè attraverso l’idea del ricaricarsi. La variante a sostituisce il soggetto; la variante b mantiene la tazza e le aggiunge le barre della batteria. La frase accompagna la lettura e delimita il senso del confronto: non si tratta di una descrizione letterale delle proprietà della bevanda.

Nelle interfacce, cartelle, cestini e scrivanie richiamano oggetti e attività conosciuti per rendere rappresentabili organizzazione e azioni. La metafora offre un orientamento iniziale, ma non esaurisce il funzionamento del sistema. Un cestino digitale può consentire il ripristino; un invio può avere conseguenze diverse dal gesto quotidiano al quale somiglia. Il testo del comando deve chiarire l’azione effettiva.

=== Icone e pittogrammi

Quando un segno serve a individuare un’azione, la relazione con il significato deve essere leggibile anche alla scala del controllo. Per questo occorre distinguere il ruolo operativo di un’icona da quello di un’immagine illustrativa: possono avere scale, dettagli e funzioni differenti. Nel confronto IBM della @fig-comp-ibm-pittogrammi, il pittogramma sostiene il contenuto di una card; impiegato in una lista al posto delle icone di interfaccia, lo stesso tipo di segno non è adatto al ruolo previsto dal sistema.#website-note([IBM Design Language, Pictograms: Usage.], "https://www.ibm.com/design/language/iconography/pictograms/usage/")

#figure(block(width: 100%)[
  #set par(justify: false, leading: 0pt, spacing: 0pt)
  #image(path("/risorse-condivise/immagini/figure/composizione/ibm-pittogrammi.svg"),
    width: 100%,
    alt: "IBM: a. un pittogramma usato come illustrazione; b. pittogrammi impiegati al posto di icone UI, uso sconsigliato dal sistema.")
  #v(6pt)
  // Match the two source panels and their 20-unit gutter without editing the screenshots.
  #grid(columns: (1fr, 1fr), column-gutter: (20 / 363) * 100%,
    align(center, text(size: 9pt, weight: 500)[#panel-letter[a]]),
    align(center, text(size: 9pt, weight: 500)[#panel-letter[b]]))
], kind: image, placement: top, scope: "parent",
  caption: caption-content(
    [IBM: a. un pittogramma usato come illustrazione; b. pittogrammi impiegati al posto di icone UI, uso sconsigliato dal sistema.],
    rights: [© IBM. Esempi della documentazione ufficiale.]),
)#label("fig-comp-ibm-pittogrammi")

Per un controllo serve un segno riconoscibile nel contesto e distinguibile da quelli che indicano altre azioni. Aumentare i dettagli non aumenta necessariamente la chiarezza: alcuni scompaiono a dimensioni ridotte, mentre altri rendono due icone quasi uguali. Coerenza di tratto, proporzioni e ingombro permette di leggere una famiglia; l’etichetta può chiarire ciò che il disegno lascia ambiguo.

La prova consiste nel chiedere quale azione ci si aspetta dal controllo e poi confrontare la risposta con il suo funzionamento. Un’icona non è automaticamente un linguaggio universale. Come nel capitolo sull’accessibilità, la funzione guida anche l’alternativa testuale. Segno, etichetta e nome accessibile devono comunicare la stessa azione; il nome accessibile ne conserva lo scopo anche quando l’immagine non viene percepita.#website-note([W3C WAI, Functional Images.], "https://www.w3.org/WAI/tutorials/images/functional/")

=== La forma dentro un racconto

Le icone mostrano quanto il significato dipenda dall’uso del segno. Il confronto con un racconto amplia questa osservazione: permette di vedere come geometrie, comportamenti e contesto collaborino, senza attribuire un valore fisso a ogni forma.

Nel film _Up_ @compUp, il profilo di _Carl Fredricksen_ è costruito attraverso volumi squadrati, mentre _Russell_ presenta contorni più arrotondati. Le due immagini della @fig-comp-up mostrano questa differenza. È una scelta di caratterizzazione all’interno dell’opera; non dimostra che ogni quadrato comunichi rigidità o che ogni cerchio rappresenti bontà.#website-note([Pixar Animation Studios, Up: personaggi e mondo del film.], "https://www.pixar.com/upfilm")

#figure(block(width: 100%)[
  #set text(size: 10pt, weight: 400, variations: (opsz: 18))
  #set par(justify: false, leading: 2pt, spacing: 7pt)

  #grid(columns: 1, row-gutter: 12pt,
    image(path("/risorse-condivise/immagini/figure/composizione/up-1.jpg"), width: 100%, alt: "Carl Fredricksen con profilo squadrato e annotazioni geometriche."),
    layout(space => {
      let scale = space.width / 797
      // Source-pixel coordinates keep the vector outlines aligned at any print width.
      box(width: space.width, height: 411 * scale)[
        #image(path("/risorse-condivise/immagini/figure/composizione/up-2.jpg"),
          width: 100%, alt: "Russell: cerchi bianchi evidenziano il contorno arrotondato del viso e i due occhi.")
        #for (x, y, diameter) in ((259, 113, 184), (300, 176, 28), (355, 176, 28)) {
          place(top + left, dx: x * scale, dy: y * scale,
            circle(radius: diameter * scale / 2, fill: none, stroke: 0.5pt + white))
        }
      ]
    }))

],
  kind: image, placement: top, scope: "column",
  caption: caption-content([_Carl Fredricksen_ e _Russell_ in _Up_, 2009. I rettangoli su Carl e i cerchi su Russell evidenziano la costruzione dei profili. Osservare volumi del viso, occhiali e contorni; il confronto riguarda questi personaggi.], rights: [© Disney / Pixar.]),
)#label("fig-comp-" + "up")

La lettura della forma cambia con gesti, voce, azioni e sviluppo narrativo. Anche in un marchio, il nome e gli usi accumulati nel tempo partecipano al significato. Il confronto fra media insegna quindi a osservare una relazione concreta fra elementi, invece di costruire un dizionario nel quale ogni forma possiede un solo valore.

== Comporre lo spazio e il testo

Scelte le immagini e chiarita la loro funzione, bisogna decidere che cosa entra nel campo visibile e come si collega alle parole. La griglia offre riferimenti di collocazione; inquadratura, taglio e distanza precisano le relazioni che il lettore può riconoscere.

Lo spazio è l’area o la distanza fra gli elementi di una composizione. Avvicinare, separare o lasciare vuota una zona rende visibili relazioni e differenze. Lo spazio negativo, o bianco, non deve necessariamente essere bianco: è lo spazio privo del contenuto che assume il ruolo di figura in quel passaggio.

=== Inquadratura e direzione

La relazione spaziale comincia dai confini dell’immagine e dalla posizione del soggetto al loro interno. I riferimenti geometrici già incontrati nel capitolo sulle griglie aiutano a discutere questa scelta.

La regola dei terzi divide l’inquadratura in tre parti per ciascun asse, ottenendo nove aree e quattro intersezioni. Il paesaggio nella @fig-comp-sguardo-spazio mostra la griglia sovrapposta alla fotografia. Può offrire riferimenti per collocare i soggetti, ma non sostituisce una decisione sul messaggio. Una composizione centrata può essere altrettanto pertinente quando serve evidenziare un asse o costruire simmetria.

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/sguardo-ritratto.jpeg"),
  [Regola dei terzi nel paesaggio: la griglia aiuta a osservare la posizione dell’albero, vicino alla verticale destra, e della montagna sulla sinistra.],
  format: "una-colonna",
  id: "fig-comp-sguardo-spazio",
  rights: none,
  alt: "Paesaggio con campo fiorito, montagna a sinistra e albero a destra; una griglia di tre righe e tre colonne è sovrapposta alla fotografia.",
)

In fotografia, il rapporto fra soggetto e sfondo contribuisce a definirne il rilievo. La _looking room_ è lo spazio lasciato nella direzione dello sguardo o del movimento; la _headroom_ è l’intervallo fra la testa e il bordo superiore dell’inquadratura. Nel ritratto della @fig-comp-sguardo-direzione la posizione del soggetto e lo spazio davanti a esso rendono percepibile una direzione.

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/sguardo-direzione.jpeg"),
  [Spazio e direzione dello sguardo nel ritratto. Looking room indica lo spazio davanti al volto; l’etichetta headroom è collocata lateralmente, ma il termine indica lo spazio sopra la testa. Le annotazioni sono conservate nel documento.],
  format: "una-colonna",
  id: "fig-comp-sguardo-direzione",
  rights: none,
  alt: "Ritratto in bianco e nero di una persona di profilo rivolta verso una finestra a sinistra. Le linee indicano lo spazio davanti al volto; l’etichetta headroom è collocata lateralmente anziché sopra la testa.",
)

Nel layout web, un volto rivolto al testo può collegare figura e parole; orientarlo verso l’esterno cambia la relazione. Questa disposizione suggerisce un legame compositivo, mentre il percorso dello sguardo va verificato nella pagina completa.

=== Taglio, formato e rapporto con le parole

Quando l’immagine entra in un layout, l’inquadratura deve confrontarsi con il formato disponibile e con le parole vicine. Il taglio decide quali elementi dell’immagine entrano nel campo visibile e quanto spazio ricevono. Passare da un formato orizzontale a uno verticale può escludere una persona, una direzione o un indizio del contesto. Prima di scegliere il ritaglio, occorre identificare il dettaglio che il lettore deve poter osservare.

Testo e immagine possono completarsi: il testo identifica un servizio o una circostanza, mentre la fotografia mostra una situazione concreta. Possono anche ripetere la stessa informazione o creare uno scarto intenzionale, come in una metafora. La collocazione rende leggibile il rapporto: un testo molto distante può essere associato a un’altra figura, soprattutto quando la pagina presenta più immagini simili.

_Roland Barthes_ distingue due funzioni del testo rispetto all’immagine: l’_ancoraggio_ e il _relais_. Nel primo caso, le parole orientano l’interpretazione: una didascalia può identificare persone, luogo o circostanza e restringere le letture possibili. Nel relais, parole e immagini contribuiscono insieme allo sviluppo del racconto, come nei dialoghi di un fumetto @compBarthes. Per una pagina informativa, la distinzione aiuta a decidere quali informazioni mostrare e quali rendere esplicite con le parole.

Per adattare una composizione a schermi diversi, si controllano insieme soggetto, taglio, dimensione del testo e posizione della didascalia. Un’immagine ridotta conserva il significato soltanto se il dettaglio necessario resta leggibile. Se la fotografia deve contenere un prodotto intero, il ritaglio che lo interrompe cambia l’informazione; se il compito è osservare una finitura, un dettaglio può essere più utile della vista generale.

=== Pieno e vuoto costruiscono figure

Lo spazio non serve soltanto a separare immagine e testo: può partecipare alla forma riconosciuta. Riprendiamo così il rapporto fra figura e sfondo studiato nella Gestalt, osservando come diventi una risorsa per costruire il messaggio.

Nelle figure @fig-comp-pieno-vuoto e @fig-comp-spartan-golf, _Negative Spaces_, di _Tang Yau Hoong_, e il concept _Spartan Golf_, di _Richard Fonteneau_ (2010), mostrano come il rapporto fra margini e campiture possa suggerire più forme. Nel secondo si riconoscono un golfista e un richiamo all’elmo. La familiarità sostiene l’interpretazione: non occorre attribuire ogni sagoma riconoscibile alla chiusura.

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/negative-spaces.png"),
  [_Negative Spaces_, di _Tang Yau Hoong_.],
  format: "una-colonna",
  id: "fig-comp-pieno-vuoto",
  rights: [© _Tang Yau Hoong_.],
  alt: "Negative Spaces, di Tang Yau Hoong.",
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/spartan-golf.png"),
  [_Spartan Golf_, concept di _Richard Fonteneau_, 2010: sagoma di golfista e richiamo all’elmo.],
  format: "una-colonna",
  id: "fig-comp-spartan-golf",
  rights: [_Richard Fonteneau_, _Spartan Golf_, concept, 2010.],
  alt: "Spartan Golf, concept di Richard Fonteneau, 2010: sagoma di golfista e richiamo all’elmo.",
)

La forma riconosciuta può dipendere dall’assegnazione del contorno all’una o all’altra regione. La composizione aggiunge alla spiegazione percettiva una decisione comunicativa: quali letture rendere disponibili e quale relazione costruire fra di esse @compArnheim.

== Costruire le priorità

Scegliere i segni e collocarli nello spazio prepara una decisione ulteriore: che cosa deve emergere per quel lettore e per quel compito? Le relazioni diventano gerarchia quando rendono distinguibili i ruoli delle informazioni. Esaminiamo quindi gli strumenti con cui dare rilievo, associare le parti e mantenere riconoscibile un ordine.

Come nei raggruppamenti percettivi, più segnali possono cooperare o entrare in conflitto. Nella stessa pagina, scala e spazio possono confermarsi; un’immagine molto contrastante può invece competere con il titolo principale. La scelta riguarda il rapporto fra le parti: non occorre applicare tutti gli strumenti a ogni composizione.

=== Dimensione e scala

Per distinguere due ruoli possiamo anzitutto variare l’ingombro degli elementi. La dimensione è uno strumento per dare rilievo. Nei giornali, per esempio, titoli e corpo degli articoli ricevono trattamenti diversi. L’effetto dipende anche da posizione, contrasto e contenuto: una parola piccola ma isolata può risultare più evidente di un’immagine grande e poco contrastante.

La scala descrive la dimensione di un elemento rispetto agli altri o a un riferimento. Nel manifesto _Julius Caesar_ della @fig-comp-julius-caesar, le differenze di ingombro contribuiscono a distinguere i livelli della comunicazione. Dimensione maggiore e importanza vanno messe in relazione, senza presumere che coincidano in ogni situazione.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-098-01-source-01.png"),
  [_Julius Caesar_, Shakespeare in the Park 2017, _Paula Scher_ / Pentagram: scala e dimensione nella gerarchia del manifesto.],
  format: "una-colonna",
  id: "fig-comp-julius-caesar",
  rights: [_Paula Scher_ / Pentagram per The Public Theater; collaborazione _Kirstin Rocke-Huber_.],
  alt: "Julius Caesar, Shakespeare in the Park 2017, Paula Scher / Pentagram: scala e dimensione nella gerarchia del manifesto.",
  aspect-ratio: 0.49917081260364843,
  crop: false,
)

=== Colore e contrasto

La scala agisce insieme alle differenze rispetto all’ambiente circostante. Il contrasto mette in relazione elementi differenti: chiaro e scuro, grande e piccolo, ruvido e liscio. Può creare un punto focale e rendere riconoscibile la struttura. Un colore saturo risalta se si distingue dall’ambiente; il contrasto di luminosità permette di distinguere testo e controlli, mentre differenze di tonalità possono separare gruppi.

Le locandine di _Barbie_ (@fig-comp-barbie-dune) e _Dune_ (@fig-comp-dune) mostrano due palette che sostengono atmosfere visive differenti e collaborano con i soggetti e le scritte. Non occorre dedurre dai colori, da soli, l’intero significato dei film. Anche un trattamento in due colori, o _duotone_, rimappa i toni dell’immagine e ne cambia le relazioni con il resto della pagina.

// Stack two independent figures in one column, with separate captions and IDs.
#keep-together(columns: 1)[
#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/barbie.png"),
  [Locandina di _Barbie_: il colore definisce un’atmosfera visiva.],
  format: "una-colonna",
  height: 60mm,
  id: "fig-comp-barbie-dune",
  rights: [© Warner Bros.],
  alt: "Locandina di Barbie: il colore definisce un’atmosfera visiva.",
)

#v(12pt)
#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/dune.png"),
  [Locandina di _Dune_: il colore definisce un’atmosfera visiva.],
  format: "una-colonna",
  height: 60mm,
  id: "fig-comp-dune",
  rights: [© Warner Bros.],
  alt: "Locandina di Dune: il colore definisce un’atmosfera visiva.",
)
]

Tonalità calde e fredde possono contribuire a impressioni di distanza o peso, ma luminosità, saturazione e accostamenti modificano il risultato. Molti accenti contemporanei possono indebolire la distinzione fra livelli. Una buona palette assegna ruoli ripetibili alle differenze e mantiene leggibili anche le informazioni secondarie.

=== Gerarchia tipografica

Nel testo, scala e contrasto devono sostenere i ruoli già definiti nel capitolo sulla tipografia. Qui confrontiamo il rilievo di titoli, corpo e note anche con immagini, campiture e spazio. Le priorità si rendono riconoscibili attraverso dimensione, peso, spaziatura, posizione e colore. Una sola famiglia può offrire differenze sufficienti fra titolo, sottotitolo, corpo e note. Se tutti i testi ricevono lo stesso trattamento, altre relazioni, come distanza e posizione, devono sostenere la distinzione.

Nel _MoMA Poster Series_, di _Rebecca Nolte_, dimensioni, pesi e disposizione distinguono i testi della @fig-comp-moma-tipografia. È un esercizio tipografico sul calendario espositivo.

Il progetto non documenta una commissione ufficiale del museo. Pochi stili coerenti aiutano a riconoscere la funzione dei blocchi; variazioni arbitrarie costringono a ricostruire la struttura. La gerarchia tipografica organizza il contenuto anche quando il lettore non segue tutte le righe. Nel digitale, il ruolo del titolo deve restare riconoscibile anche nella struttura del documento e nella consultazione con tecnologie assistive, come discusso nell’accessibilità.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-102-01-source-01.jpeg"),
  [_Rebecca Nolte_, _MoMA Poster Series_, 2014: esercizio tipografico sul calendario espositivo 2013. Dimensioni, pesi e disposizione distinguono le informazioni.],
  format: "una-colonna",
  id: "fig-comp-moma-tipografia",
  rights: [© _Rebecca Nolte_. Marchio MoMA del rispettivo titolare.],
  alt: "Rebecca Nolte, MoMA Poster Series, 2014: esercizio tipografico sul calendario espositivo 2013. Dimensioni, pesi e disposizione distinguono le informazioni.",
  aspect-ratio: 0.6666666666666666,
  crop: false,
)

=== Spaziatura e prossimità

Distinguere i testi non basta se resta incerta la loro appartenenza. La vicinanza studiata nella Gestalt diventa una scelta di spaziatura: intervalli interni, distanze fra gruppi e margini devono confermare le associazioni di contenuto. Un’interruzione maggiore può segnalare un cambio di argomento; una distanza minore può tenere unita un’etichetta al suo valore. Non esiste una quantità di vuoto valida per ogni progetto: una pagina densa e una composizione essenziale richiedono scelte diverse.

La prossimità suggerisce una relazione fra elementi vicini. In un modulo, un’etichetta deve essere associabile al proprio campo; una distanza ambigua può farla sembrare riferita al campo successivo. La verifica considera anche i testi più lunghi e i messaggi di errore, perché questi possono modificare gli intervalli originari.

La disposizione può fare più che raggruppare informazioni: può suggerire una figura non esplicitamente disegnata. Nelle venature del legno della @fig-comp-pareidolia-legno riconosciamo un volto: è un caso di _pareidolia_, il riconoscimento di una figura familiare in uno stimolo ambiguo. L’esempio non dimostra soltanto la prossimità; mostra la collaborazione fra disposizione e interpretazione.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-108-01-source-01.jpeg"),
  [Un volto nelle venature del legno: la disposizione delle forme favorisce la pareidolia.],
  format: "una-colonna",
  id: "fig-comp-pareidolia-legno",
  rights: none,
  alt: "Un volto nelle venature del legno: la disposizione delle forme favorisce la pareidolia.",
  aspect-ratio: 0.768125,
  height: 110mm,
)

=== Lo spazio negativo come messaggio

Oltre a rendere riconoscibili gruppi e figure, il vuoto può attribuire rilievo a una zona. Torniamo al rapporto fra figura e sfondo per osservare insieme le sue funzioni: separare gli elementi e contribuire al messaggio. Una composizione troppo affollata può rendere incerto il confine fra informazioni, ma l’efficacia del bianco non dipende dalla sua quantità assoluta: conta quali relazioni rende visibili.

Nel manifesto del Melbourne Food & Wine Festival della @fig-comp-melbourne, il rapporto fra figura e sfondo rende riconoscibili una forchetta e alcune bottiglie. Lo spazio negativo diventa parte del messaggio, richiamando cibo e vino. Il vuoto svolge così una funzione rappresentativa oltre a separare elementi.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-110-01-source-01.png"),
  [Melbourne Food & Wine Festival: una figura costruita con lo spazio negativo.],
  format: "una-colonna",
  id: "fig-comp-melbourne",
  rights: [Melbourne Food & Wine Festival.],
  alt: "Melbourne Food & Wine Festival: una figura costruita con lo spazio negativo.",
  aspect-ratio: 0.7107093184979137,
  crop: false,
)

=== Allineamento

Le distanze definiscono gruppi; i riferimenti comuni permettono di collegarli attraverso la pagina. Allineare rende riconoscibili bordi, assi e linee di base condivisi fra testo e immagini. Nei testi lunghi, una bandiera coerente con la direzione di lettura offre un riferimento costante all’inizio delle righe.

La composizione centrata della campagna Adidas, nella @fig-comp-adidas, mette in relazione testo e immagine attraverso un asse. Un allineamento diverso risponderebbe a un’altra intenzione. L’asse organizza le relazioni visibili; il suo rapporto con l’esplorazione effettiva della pagina richiede una verifica, che riprenderemo parlando di attenzione.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-112-01-source-01.png"),
  [Campagna Adidas: allineamento del testo e relazione con l’immagine.],
  format: "una-colonna",
  id: "fig-comp-adidas",
  rights: [© Adidas.],
  alt: "Campagna Adidas: allineamento del testo e relazione con l’immagine.",
  aspect-ratio: 0.723314606741573,
  crop: false,
)

=== Dispari, centro ed equilibrio

Scelti gli assi, occorre valutare come gli elementi distribuiscano il proprio peso attorno a essi. Un gruppo dispari permette di collocare un elemento al centro e distribuire gli altri ai suoi lati. La strategia può rendere riconoscibile un soggetto principale, ma funziona soltanto se dimensioni, distanze e contrasti sostengono quella relazione. Un oggetto laterale più brillante può prevalere sul centro geometrico.

La campagna Häagen-Dazs della @fig-comp-haagen-dazs usa una composizione dispari. Osservare il rapporto fra i prodotti aiuta a discutere il centro e l’equilibrio; il numero, da solo, non garantisce bellezza o chiarezza. In una lista funzionale, aggiungere un elemento soltanto per ottenere un numero dispari introdurrebbe un criterio estraneo al contenuto.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-114-01-source-01.png"),
  [Campagna Häagen-Dazs: prodotti disposti secondo una composizione dispari.],
  format: "una-colonna",
  id: "fig-comp-haagen-dazs",
  rights: [© Häagen-Dazs.],
  alt: "Campagna Häagen-Dazs: prodotti disposti secondo una composizione dispari.",
)

=== Equilibrio simmetrico e asimmetrico

Il centro geometrico non esaurisce il problema dell’equilibrio. In una composizione simmetrica, forme e posizioni si corrispondono rispetto a un asse; in una composizione asimmetrica, elementi differenti possono controbilanciarsi attraverso dimensione, contrasto, distanza e spazio circostante. Il peso visivo indica il rilievo che attribuiamo a un elemento nell’insieme: un oggetto piccolo e isolato può richiamare l’attenzione, mentre una massa più grande può risultare meno evidente se si confonde con lo sfondo @compArnheim.

#figure(block(width: 100%)[
  #set text(size: 10pt, weight: 400, variations: (opsz: 18))
  #set par(justify: false, leading: 2pt, spacing: 7pt)
  #balance-comparison()
],
  kind: image, placement: top, scope: "column",
  caption: caption-content([Due schemi simulati di equilibrio: a. dischi uguali in posizioni speculari; b. dischi di dimensioni diverse a distanze differenti dall’asse. La linea serve a confrontare le posizioni; lo schema non misura il peso percettivo.], rights: none),
)#label("fig-comp-equilibrio")

Nella @fig-comp-equilibrio, il primo campo rende immediata la corrispondenza delle parti. Nel secondo, la relazione va discussa osservando insieme grandezza e collocazione. Per valutare una pagina reale occorre aggiungere anche contenuto, colore e significato dei soggetti. L’equilibrio può essere cercato oppure volutamente alterato per rendere percepibile una tensione.

Nel paesaggio della @fig-comp-sguardo-spazio, albero e montagna hanno ingombri e posizioni differenti: la griglia dei terzi offre riferimenti per descriverli. In una pagina, un’immagine ampia può invece confrontarsi con un titolo breve ma molto contrastato. Prima di spostare gli elementi per ottenere una simmetria, conviene verificare quale relazione sostenga il messaggio e se la priorità resti riconoscibile.

=== Ripetizione e ritmo

Per collegare più gruppi o più pagine, un riferimento può ritornare nel tempo e nello spazio. Ripetere una forma, un colore, una dimensione o uno stile tipografico può unificare la composizione. Nelle pubblicazioni, gli stessi ruoli ritornano per titoli, corpo e note; nelle interfacce, un trattamento coerente permette di riconoscere comandi con funzioni simili. Il testo sottolineato può essere letto come collegamento grazie a una convenzione appresa.

La ripetizione costruisce anche un ritmo, fatto di ritorni e intervalli. Nella campagna Coca-Cola della @fig-comp-cocacola, la disposizione delle bottiglie suggerisce un sorriso. Il nuovo elemento nasce dalla relazione fra parti ripetute, dimensione e prossimità, non dalla sola presenza del marchio.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-116-01-source-01.jpeg"),
  [Campagna Coca-Cola: la ripetizione delle bottiglie suggerisce un sorriso.],
  format: "una-colonna",
  id: "fig-comp-cocacola",
  rights: [© The Coca-Cola Company.],
  alt: "Campagna Coca-Cola: la ripetizione delle bottiglie suggerisce un sorriso.",
  aspect-ratio: 1.0,
  crop: false,
)

Una variazione dentro una sequenza regolare può segnalare un cambiamento: la coerenza rende riconoscibile la variazione e permette di valutarne il ruolo. Se però ogni elemento ha un colore o una dimensione diversa, manca il riferimento rispetto al quale riconoscere l’eccezione.

=== Linee e movimento suggerito

Ritorni e intervalli possono anche collegare zone distanti della pagina. Una composizione statica può suggerire una direzione attraverso inclinazioni, punti allineati, elementi ripetuti o relazioni fra pieni e vuoti. Le linee guida possono essere implicite: non è necessario tracciare una freccia per mettere in relazione due zone.

Nella @fig-comp-linee-direzione osserviamo come le direzioni interne costruiscano un percorso attraverso la composizione. Il movimento suggerito non equivale a un movimento registrato degli occhi. Nelle interfacce, va distinto anche dall’animazione effettiva, che introduce cambiamenti nel tempo e richiede controlli specifici di accessibilità.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-118-01-source-01.png"),
  [Linee e direzione: un percorso visivo attraverso la composizione.],
  format: "una-colonna",
  id: "fig-comp-linee-direzione",
  rights: none,
  alt: "Linee e direzione: un percorso visivo attraverso la composizione.",
  aspect-ratio: 0.7096774193548387,
  crop: false,
)

=== Griglia e variazione

Per coordinare scala, allineamenti, intervalli e direzioni possiamo riprendere la griglia del capitolo precedente. Qui interessa osservare come riferimenti regolari e loro variazioni sostengano gerarchie differenti, attraverso relazioni fra righe, colonne e moduli. Il manifesto della Nona Triennale di Milano, di _Ernst Scheidegger_, nella @fig-comp-triennale rende visibili i rapporti fra campiture, numero e testi. Il progetto _Shakespeare in the Park 2013_, di _Paula Scher_ con Pentagram e _Kirstin Rocke-Huber_, nella @fig-comp-manifesto-modulare usa invece sovrapposizioni e lettere di scala diversa per costruire una gerarchia.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-120-01-source-01.png"),
  [_Ernst Scheidegger_, manifesto della Nona Triennale di Milano, 1951: relazioni fra campiture, numero e testi.],
  format: "una-colonna",
  id: "fig-comp-triennale",
  rights: [_Ernst Scheidegger_.],
  alt: "Ernst Scheidegger, manifesto della Nona Triennale di Milano, 1951: relazioni fra campiture, numero e testi.",
  aspect-ratio: 0.6998394863563403,
  crop: false,
)
#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-121-01-source-01.png"),
  [_Paula Scher_ / Pentagram, _Shakespeare in the Park 2013_: sovrapposizioni, lettere di scala diversa e gerarchia del testo.],
  format: "una-colonna",
  id: "fig-comp-manifesto-modulare",
  rights: [_Paula Scher_ / Pentagram per The Public Theater; collaborazione _Kirstin Rocke-Huber_.],
  alt: "Paula Scher / Pentagram, Shakespeare in the Park 2013: sovrapposizioni, lettere di scala diversa e gerarchia del testo.",
  aspect-ratio: 0.5032894736842105,
  crop: false,
)
#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-122-01-source-01.png"),
  [_Paula Scher_, _The Public Theater, 95–96 Season_, 1995: densità tipografica, direzioni contrastanti e variazioni di peso.],
  format: "una-colonna",
  id: "fig-comp-manifesto-denso",
  rights: [© _Paula Scher_. Esemplare conservato al MoMA; dono della designer.],
  alt: "Paula Scher, The Public Theater, 95–96 Season, 1995: densità tipografica, direzioni contrastanti e variazioni di peso.",
  aspect-ratio: 0.7565359477124183,
  crop: false,
)

Le composizioni decentrate possono costruire tensione ed equilibrio; quelle centrate possono evidenziare stabilità o simmetria. Una griglia obliqua introduce direzioni ulteriori. Anche l’interruzione di un riferimento comune può creare enfasi, se il lettore dispone di un ordine rispetto al quale riconoscerla.

Nel manifesto _The Public Theater, 95–96 Season_, di _Paula Scher_, nella @fig-comp-manifesto-denso, pesi, inclinazioni e spaziature costruiscono un impianto espressivo e denso. Non è un esempio di griglia regolare: il ritmo tipografico distingue le informazioni anche attraverso direzioni contrastanti. Il confronto mostra che una gerarchia può emergere da relazioni differenti, senza richiedere che tutte le composizioni abbiano lo stesso ordine geometrico.

Rompere la griglia richiede quindi una decisione precisa. Disperdere gli elementi senza una relazione con il messaggio può rendere più difficile la lettura: la libertà compositiva conserva i vincoli di associazioni comprensibili, testo leggibile e priorità coerenti con il contenuto.

=== Prospettiva e profondità

Scala, sovrapposizione e direzione possono coordinarsi anche per suggerire una profondità su una superficie piana. La prospettiva mostra questa possibilità e permette di tornare sul rapporto fra ingombro e rilievo visivo. Nella prospettiva lineare, rette della scena parallele fra loro e non parallele al piano dell’immagine convergono verso un punto di fuga comune; quelle parallele al piano dell’immagine restano parallele nella rappresentazione. Una strada, per esempio, appare più stretta mentre si allontana. A parità di dimensioni reali e condizioni di proiezione, lo stesso oggetto vicino occupa un’area visiva maggiore di quello lontano.

La @fig-comp-prospettiva-tipografica usa il testo come elemento spaziale: la direzione e le variazioni di ingombro partecipano alla composizione. Anche qui, l’oggetto più grande non è necessariamente il primo a essere osservato; contrasto e contenuto possono proporre altre priorità.

#image-figure(path("/risorse-condivise/fonti/booklet/capitolo-3/originals/c03-124-01-source-01.png"),
  [Prospettiva tipografica: il testo costruisce profondità e movimento.],
  format: "una-colonna",
  id: "fig-comp-prospettiva-tipografica",
  rights: none,
  alt: "Prospettiva tipografica: il testo costruisce profondità e movimento.",
  aspect-ratio: 0.7058011049723757,
  crop: false,
)

== Attenzione e percorsi di lettura

Gli strumenti appena esaminati descrivono le priorità proposte dalla composizione. Per valutarle bisogna tornare alle persone e ai loro obiettivi: rendere un elemento distinguibile non garantisce che venga cercato, compreso o usato. La persona non esplora una pagina in modo passivo. Può cercare una parola, riconoscere una fotografia già vista o concentrarsi su una zona che si aspetta contenga la risposta. Comprendere questa relazione permette di distinguere visibilità, attenzione e comprensione.

=== Salienza e ricerca visiva

Cominciamo da ciò che rende un elemento distinguibile, per confrontarlo poi con ciò che la persona sta cercando. La _salienza_ è il rilievo di un elemento rispetto al campo circostante. Una differenza di colore, orientamento o dimensione può renderlo più distinguibile; l’effetto dipende da quali differenze sono già presenti. Nel confronto simulato della @fig-comp-salienza, un disco diverso interrompe una serie regolare nel campo a, mentre nel campo b numerose variazioni competono.

#figure(block(width: 100%)[
  #set text(size: 10pt, weight: 400, variations: (opsz: 18))
  #set par(justify: false, leading: 2pt, spacing: 7pt)
  #visual-search()
],
  kind: image, placement: top, scope: "column",
  caption: caption-content([Ricerca visiva in due campi simulati: a. un solo disco è diverso dagli altri; b. più differenze competono. Il diagramma confronta le condizioni, senza rappresentare tempi o risultati misurati.], rights: none),
)#label("fig-comp-" + "salienza")

Per _Anne Treisman_ e _Garry Gelade_, distinguere caratteristiche e combinarle in oggetti riconoscibili richiede processi differenti @compTreisman.

Nei loro esperimenti, cercare combinazioni di caratteristiche richiedeva condizioni diverse dalla ricerca basata su una sola differenza. Il diagramma propone una domanda progettuale, senza riprodurre quei dati sperimentali.

Il modello _Guided Search 6.0_, di _Jeremy M. Wolfe_, considera una guida dell’attenzione che integra caratteristiche dello stimolo, obiettivi, esperienza precedente e conoscenza della scena @compWolfe. Una priorità visiva dipende quindi anche da ciò che la persona cerca. Il contrasto può facilitare la distinzione, ma non stabilisce da solo l’ordine completo della consultazione.

=== Segnali concorrenti e azioni

Il rilievo visivo diventa utile al compito quando i segnali sostengono priorità comprensibili. In una schermata con molti badge, notifiche e pulsanti enfatizzati, ogni segnale deve essere interpretato in rapporto agli altri. Per assegnare una priorità occorre decidere quale domanda soddisfare per prima e quali informazioni devono restare disponibili. Ridurre la competizione non significa nascondere condizioni, costi o azioni secondarie necessarie.

#figure(block(width: 100%)[
  #set text(size: 10pt, weight: 400, variations: (opsz: 18))
  #set par(justify: false, leading: 2pt, spacing: 7pt)
  #action-priorities()
],
  kind: image, placement: top, scope: "column",
  caption: caption-content([Due versioni simulate di un appuntamento. Il compito è spostare la visita: a. tre azioni con identica enfasi; b. modifica, indicazioni e annullamento ricevono pesi differenti. «Annulla» resta leggibile e disponibile.], rights: none),
)#label("fig-comp-" + "priorita")

Nella @fig-comp-priorita, il compito è spostare una visita. La versione a enfatizza ugualmente modifica, indicazioni e annullamento. Nella b risalta la modifica; indirizzo e annullamento restano leggibili. La differenza suggerisce un’ipotesi sulla priorità visiva, da verificare osservando se la persona riesce a spostare la visita.

Anche il significato dell’azione conta. Un comando distruttivo molto evidente può attirare l’attenzione nella direzione sbagliata. Per valutare la gerarchia bisogna chiedere che cosa la persona si aspetta di ottenere, osservare eventuali errori e verificare che i segnali non inducano un’associazione scorretta fra comando e contenuto.

=== Vedere, scegliere, raggiungere

L’enfasi grafica interviene su una parte del compito. Dopo aver individuato un comando, la persona deve comprenderlo, scegliere una risposta e raggiungere il bersaglio con il dispositivo disponibile. Questi passaggi pongono problemi differenti: un pulsante evidente può avere un’etichetta ambigua oppure un’area cliccabile troppo piccola.

La legge di _Hick–Hyman_ collega il tempo di reazione all’incertezza fra le risposte possibili in compiti sperimentali di scelta. Conta anche la probabilità delle alternative, oltre al loro numero @compHick @compHyman.

Nel progetto di un menu, questo invita a rendere prevedibili gruppi ed etichette e a distinguere le azioni pertinenti. Il modello riguarda condizioni controllate; un elenco di voci familiari, una ricerca per nome e una decisione d’acquisto richiedono confronti diversi. Il numero di pulsanti, da solo, non consente di prevedere il tempo necessario a decidere.

La legge di _Fitts_ mette invece in relazione il tempo del movimento con la distanza dal bersaglio e con la precisione richiesta per raggiungerlo @compFitts @compMacKenzie. Nell’interfaccia, dimensione del segno e area attivabile possono essere differenti. Ingrandire soltanto il pittogramma lascia irrisolto il problema se il bersaglio effettivo resta stretto. Anche la posizione iniziale del puntatore, la direzione di avvicinamento e il dispositivo vanno considerati nella prova.

Riprendiamo l’appuntamento della @fig-comp-priorita: riconoscere «Modifica appuntamento», distinguerlo da «Annulla» e attivarlo senza errori sono tre verifiche complementari. Organizzare le alternative aiuta la scelta; dimensionare e distanziare le aree attive riguarda il movimento. Le misure minime e le eccezioni dei bersagli sono sviluppate nel capitolo sull’accessibilità. Qui la composizione deve coordinare questi vincoli con la gerarchia delle informazioni, conservando disponibili anche le azioni secondarie necessarie.

=== Lo schema a Z

Dalla competizione fra singoli segnali passiamo alla distribuzione complessiva delle informazioni. Alcuni schemi possono aiutare a discuterla, purché si distingua una proposta di composizione da un comportamento osservato.

Lo schema a Z propone un percorso orizzontale nella parte superiore, un passaggio diagonale e un secondo percorso orizzontale più in basso. Può servire a ragionare sulla distribuzione di pochi blocchi, per esempio identità, messaggio e invito all’azione. Non rappresenta una traiettoria obbligata dello sguardo.

La @fig-comp-aesop-percorso mostra una versione storica della homepage Aesop. I blocchi possono essere discussi attraverso quello schema, ma l’immagine non registra movimenti oculari. Il percorso effettivo dipende dal contenuto, dal compito, dalla direzione di lettura e dalle priorità della persona.

#image-figure(path("/risorse-condivise/immagini/figure/composizione/aesop-percorso.svg"),
  [Homepage di Aesop: distribuzione dei blocchi nella versione documentata. Lo schema a Z è una lettura compositiva, non una misurazione dello sguardo.],
  format: "due-colonne",
  id: "fig-comp-aesop-percorso",
  rights: [© Aesop. Cattura storica; data non indicata.],
  alt: "Homepage di Aesop: distribuzione dei blocchi nella versione documentata. Lo schema a Z è una lettura compositiva, non una misurazione dello sguardo.",
  aspect-ratio: 2.0685715166110437,
  height: 110mm,
)

=== Scansione a F e struttura del testo

Mentre la Z offre uno schema compositivo, la F descrive un andamento osservato in alcune condizioni di esplorazione. In alcuni studi sui contenuti web, lo sguardo attraversa una prima fascia orizzontale, una seconda più breve e poi scende lungo il margine iniziale del testo. Questo andamento approssimativo è chiamato _pattern a F_. Riguarda l’esplorazione del contenuto e non descrive automaticamente la consultazione dell’intera pagina @compPernice.

Non coincide con la lettura di ogni riga e non vale per tutte le pagine. Titoli descrittivi, informazioni anticipate e paragrafi riconoscibili aiutano a trovare ciò che serve senza affidarsi a un solo schema. La campagna Diesel (@fig-comp-diesel-contrasto e @fig-comp-diesel-seconda) permette di esercitare questa distinzione: possiamo descrivere il contrasto fra immagine e testo e discutere le priorità proposte, ma la composizione non documenta il percorso effettivo degli occhi e non è una prova sperimentale del pattern a F.

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/diesel-prima.png"),
  [Campagna Diesel: contrasto fra testo, immagine e sfondo nella composizione.],
  format: "tutta-pagina",
  id: "fig-comp-diesel-contrasto",
  rights: [© Diesel.],
  alt: "Campagna Diesel: contrasto fra testo, immagine e sfondo nella composizione.",
)

#image-figure(path("/progetti/booklet/assets/figure-singole/composizione/diesel-seconda.png"),
  [Campagna Diesel: un altro esempio del contrasto fra testo, immagine e sfondo.],
  format: "tutta-pagina",
  id: "fig-comp-diesel-seconda",
  rights: [© Diesel.],
  alt: "Campagna Diesel: un altro esempio del contrasto fra testo, immagine e sfondo.",
)

F e Z possono suggerire domande sulla distribuzione delle informazioni e sulla direzione di lettura. Hanno però origini e ruoli differenti. Per una pagina concreta occorre verificare se il lettore trova il contenuto pertinente, anziché valutare quanto il suo percorso somigli a una lettera.

=== Informazione durante il gioco

Nei videogiochi la scena cambia durante la consultazione degli indicatori. Lo *heads-up display*, o *HUD*, presenta dati come salute, munizioni e orientamento. Il compito stabilisce quali informazioni servano in ciascun momento. La composizione deve renderle consultabili senza nascondere l’azione.

_Celia Hodent_, descrivendo il lavoro su _Fortnite_, collega la visibilità delle informazioni alla possibilità di ridurre ciò che il giocatore deve ricordare @compHodent. Nella @fig-comp-hud-fortnite, relativa a una versione storica per PC, salute ed equipaggiamento occupano la fascia inferiore, mentre la mappa è in alto a destra. La zona centrale resta disponibile per l’azione e il mirino. Si può osservare questa distribuzione senza considerarla una soluzione valida per ogni gioco o per ogni dimensione di schermo.

#image-figure(path("/progetti/booklet/assets/composition-materials/images/fortnite-hud.jpg"),
  [_Fortnite_, HUD in una versione storica per PC. Salute, equipaggiamento e mappa occupano zone distinte attorno alla scena. I riquadri rossi e i numeri sono annotazioni già presenti nella riproduzione.],
  format: "due-colonne",
  id: "fig-comp-hud-fortnite",
  rights: [© Epic Games.],
  alt: "Schermata di Fortnite con mirino centrale, salute in basso, equipaggiamento a destra e mappa nell’angolo superiore destro; riquadri rossi numerati evidenziano gli elementi dell’HUD.",
  height: 110mm,
)

Le informazioni possono anche appartenere al mondo rappresentato. La distinzione fra elementi *diegetici* e *non diegetici* riguarda questa appartenenza; un secondo criterio è la collocazione nello spazio del gioco o sul piano dello schermo. _Erik Fagerholt_ e _Magnus Lorentzon_ esaminano insieme questi criteri @compFagerholt: descrivere lo stato del personaggio non basta a rendere un indicatore parte del suo mondo.

In _Dead Space_ (@fig-comp-dead-space), la salute è visibile dalla fascia luminosa sul dorso della tuta e le munizioni dal contatore presso l’arma. Integrare gli indicatori nella scena introduce vincoli di scala, contrasto e visibilità al cambiare dell’inquadratura e dell’illuminazione. La scelta va valutata rispetto al compito e al contesto: una UI interamente diegetica non garantisce, da sola, un’esperienza più immersiva @compFagerholt.

#image-figure(path("/progetti/booklet/assets/composition-materials/images/dead-space.png"),
  [_Dead Space_, 2008: la fascia luminosa sul dorso della tuta indica la salute; il contatore delle munizioni è associato all’arma.],
  format: "una-colonna",
  id: "fig-comp-dead-space",
  rights: [© Electronic Arts.],
  alt: "Isaac visto di spalle in Dead Space: una fascia luminosa segue il dorso della tuta e un contatore azzurro compare presso l’arma.",
)

Per verificare la gerarchia, si chiede di trovare salute, equipaggiamento o obiettivo mentre la scena cambia, osservando omissioni, errori e interferenze con l’azione. La prova precisa dispositivo e condizioni d’uso.

== Leggere una composizione

Dopo aver distinto strumenti compositivi e comportamento del lettore, possiamo osservare più scelte insieme. Come nella lettura dei casi storici, il confronto fra opere e documenti aiuta a riconoscere quali relazioni sostengano il messaggio e quali dipendano dal mezzo e dal contesto. Una lettura utile identifica prima gli elementi visibili, poi le loro relazioni, e infine discute le interpretazioni nel contesto dell’opera. Non basta assegnare a ogni immagine il nome di un principio.

=== Dall’arte alla pagina

Un’opera con un centro evidente permette di mettere in relazione posizione, direzioni e racconto, prima di chiedersi che cosa possa essere trasferito a una pagina informativa.

Nell’_Ultima Cena_, di _Leonardo da Vinci_, la figura di Cristo occupa una posizione centrale e le linee dell’ambiente sostengono una costruzione prospettica. La @fig-comp-cenacolo mostra una riproduzione annotata: le frecce e il rettangolo rossi sono segni sovrapposti alla fotografia, utili a distinguere un’osservazione sulla composizione dal documento dell’opera.#website-note([Museo del Cenacolo Vinciano, sito istituzionale.], "https://cenacolovinciano.org/")

#image-figure(path("/risorse-condivise/immagini/figure/composizione/cenacolo-1.png"),
  [_Ultima Cena_, _Leonardo da Vinci_, 1495–1498, Santa Maria delle Grazie, Milano. Riproduzione annotata: i segni rossi evidenziano la posizione centrale e le direzioni verso di essa; non appartengono all’opera.],
  format: "due-colonne",
  id: "fig-comp-cenacolo",
  rights: [Opera di pubblico dominio.],
  alt: "Riproduzione dell’Ultima Cena con segni rossi che evidenziano la figura centrale.",
  placement: top,
  scope: "parent",
)

La centralità assume un ruolo nel racconto e nell’iconografia; non è una ricetta da trasferire invariata a ogni interfaccia. In un giornale, la scala di un titolo distingue una notizia; in un manifesto, parola e immagine devono costruire un messaggio riconoscibile; in un servizio digitale, il lettore può dover confrontare più alternative. Il confronto fra questi contesti rende evidente che gerarchia non significa sempre un unico centro.

L’invito della @fig-comp-invito permette di riportare questa osservazione su un contenuto quotidiano. Titolo, data, luogo e azione hanno ruoli diversi; l’allineamento li collega senza renderli equivalenti. L’esempio è progressivo perché mantiene il messaggio e varia la composizione: consente di discutere l’effetto di una scelta senza cambiare contemporaneamente il contenuto.

=== Un caso cinematografico

Il cinema amplia il confronto perché permette di osservare composizioni diverse all’interno dello stesso racconto. _The Grand Budapest Hotel_, di _Wes Anderson_ @compBudapest, riunisce forma, spazio, colore e priorità in più inquadrature: il caso serve a leggere come queste relazioni cambino insieme. Le immagini non sono considerate come un repertorio di emozioni automatiche: mostrano relazioni che possono essere descritte e interpretate nel contesto del film.#website-note([Searchlight Pictures, The Grand Budapest Hotel: film, clip e materiali ufficiali.], "https://www.searchlightpictures.com/thegrandbudapesthotel/")

#image-figure(path("/risorse-condivise/immagini/figure/composizione/budapest-simmetria-1.png"),
  [_The Grand Budapest Hotel_, 2014: le due figure principali condividono il centro e sono affiancate da figure secondarie.],
  format: "due-colonne",
  id: "fig-comp-budapest",
  rights: [© Fox Searchlight Pictures.],
  alt: "The Grand Budapest Hotel, 2014: le due figure principali condividono il centro e sono affiancate da figure secondarie.",
  height: 110mm,
)

#image-figure(path("/risorse-condivise/immagini/figure/composizione/budapest-cornice-4.png"),
  [_The Grand Budapest Hotel_, 2014: la grata costruisce una seconda cornice.],
  format: "due-colonne",
  id: "fig-comp-budapest-cornice",
  rights: [© Fox Searchlight Pictures.],
  alt: "The Grand Budapest Hotel, 2014: la grata costruisce una seconda cornice.",
  height: 110mm,
)

#image-figure(path("/risorse-condivise/immagini/figure/composizione/budapest-spazio-formati-1.png"),
  [_The Grand Budapest Hotel_, 2014: lo spazio della sala prevale sull’ingombro dei personaggi.],
  format: "due-colonne",
  id: "fig-comp-budapest-spazio",
  rights: [© Fox Searchlight Pictures.],
  alt: "The Grand Budapest Hotel, 2014: lo spazio della sala prevale sull’ingombro dei personaggi.",
  height: 110mm,
)

Nella @fig-comp-budapest, le figure principali condividono il centro e sono messe in relazione con quelle ai lati. Nella @fig-comp-budapest-cornice, le sbarre definiscono una cornice interna che delimita ulteriormente il campo visibile. Nella @fig-comp-budapest-spazio, l’ampiezza della sala lascia i personaggi piccoli rispetto all’ambiente: la scala riguarda anche la quantità di spazio che li circonda.

Il film varia anche il rapporto fra larghezza e altezza del quadro: 1,37:1 per il racconto degli anni Trenta, 2,40:1 per quello degli anni Sessanta e 1,85:1 per le cornici temporali più recenti.#website-note([The Criterion Collection, scheda dell’edizione approvata dal regista; formati 1,37:1, 1,85:1 e 2,40:1.], "https://www.criterion.com/films/29601-the-grand-budapest-hotel") Il formato aiuta così a distinguere i livelli del racconto. Nell’intervista a _Wes Anderson_, la scelta è ricondotta anche alle convenzioni cinematografiche delle diverse epoche @compOsenlund.

Il caso riprende così la scelta del campo visibile: cambiare formato modifica la composizione e un ritaglio può eliminare relazioni necessarie. Una cornice interna può essere costruita da finestre, porte o elementi scenici. Rispetto alla semplice riduzione dell’immagine, mantiene leggibile una relazione fra il soggetto e ciò che lo circonda. Nel film, montaggio, durata, suono e azioni modificano la lettura delle singole inquadrature; un fotogramma permette di esaminare una composizione, ma non restituisce da solo l’esperienza della sequenza.

Il caso suggerisce anche un trasferimento prudente al progetto digitale: distinguere soggetto e contesto, assegnare un peso allo spazio e verificare quali elementi incorniciano un’informazione. Non occorre rendere ogni pagina simmetrica per applicare queste osservazioni.


== Progettare, confrontare, verificare

L’analisi dei casi diventa ora un metodo per motivare le proprie scelte. La domanda del lettore orienta un’idea guida; i riferimenti aiutano a discuterla, una variazione rende confrontabile una relazione e la prova con un compito permette di rivederla. Il contenuto disponibile va organizzato assegnando ruoli ai blocchi: ciò che identifica la pagina, ciò che permette di confrontare e ciò che consente di agire. Ritroviamo così il passaggio dalla ricerca all’ipotesi e alla verifica, applicato all’intera composizione.

=== Dall’idea guida alle scelte visive

Per coordinare gli strumenti esaminati serve una direzione da discutere rispetto al problema. Il _concept visivo_ è l’idea guida che mette in relazione le scelte espressive del progetto. Non coincide con un colore o con uno slogan: permette di motivare insieme immagini, forme, tipografia e tono delle parole. Può evolvere mentre si confrontano le proposte con contenuti, destinatari e vincoli.

Per il laboratorio di fotografia della @fig-comp-invito, «sperimentare con la luce» può diventare un’ipotesi di concept: fotografie che mettono a confronto luci e ombre, tagli che isolano un dettaglio e parole che invitano a osservare. Ogni scelta deve avere una ragione riconoscibile. Una campitura molto espressiva che rende illeggibile l’orario ostacolerebbe comunque la funzione dell’invito.

=== Raccogliere e discutere una moodboard

#block(breakable: false, above: 4pt, below: 10pt)[Per discutere l’idea guida attraverso esempi concreti, la _moodboard_ raccoglie riferimenti visivi: fotografie, colori, texture, forme e prove tipografiche @compYang.]

#image-figure(path("/risorse-condivise/immagini/figure/composizione/moodboard-riferimenti.jpg"),
  [Fotografie di ambienti, persone e dettagli accostate a una palette. Osservare come il giallo e i toni verde-azzurri ricorrano fra campioni e soggetti; la tavola propone una direzione visiva, senza definire una pagina.],
  format: "una-colonna",
  id: "fig-comp-moodboard-riferimenti",
  rights: none,
  alt: "Moodboard con sedute gialle, una persona, una pianta e campioni cromatici gialli e verde-azzurri.",
)

Le parole «luminoso» o «sperimentale» possono suggerire immagini diverse a persone diverse. La tavola permette di confrontare queste interpretazioni prima di definire la composizione delle pagine.

#block(breakable: false, above: 10pt, below: 10pt)[La @fig-comp-moodboard-riferimenti raccoglie un’atmosfera attraverso fotografie e colori ricorrenti; la @fig-comp-moodboard-sistema precisa ipotesi su texture, tipografia e iconografia. Le didascalie indicano i dettagli da confrontare.]

#image-figure(path("/risorse-condivise/immagini/figure/composizione/moodboard-sistema.jpg"),
  [_Ecommerce Moodboard_, progetto CandleScience. Colore e texture, tipografia e iconografia affiancano fotografie di prodotti e materiali. Riproduzione parziale: il bordo inferiore interrompe i campioni tipografici. La tavola non documenta il layout finale del negozio.],
  format: "una-colonna",
  id: "fig-comp-moodboard-sistema",
  rights: [Marchio CandleScience del rispettivo titolare.],
  alt: "Tavola parziale CandleScience con fotografie, palette e sezioni di texture, tipografia e iconografia; i campioni tipografici proseguono oltre il bordo inferiore.",
)

#block(breakable: false, above: 10pt, below: 10pt)[Per rendere utile la raccolta si annota che cosa interessa di ogni riferimento: la luce di una fotografia, il rapporto fra pieni e vuoti, il dettaglio di una superficie. Si conservano autore e provenienza delle immagini.]

#block(breakable: false, above: 10pt, below: 10pt)[Direzioni diverse si confrontano su tavole separate. La moodboard orienta le scelte; la disposizione dei contenuti e il funzionamento dei comandi richiedono ancora un layout e una verifica.]

=== Dai riferimenti alle decisioni

La raccolta diventa operativa quando ciascun riferimento si collega a una scelta da provare. Una moodboard può orientare la direzione visiva e aiutare a discuterla nel gruppo di progetto @compYang; il layout deve poi dare forma a contenuti, gerarchie e azioni effettive. Per rendere esplicito questo passaggio, conviene annotare tre elementi:

- *Riferimento.* Quale caratteristica interessa: un taglio fotografico, la distanza fra i blocchi, un contrasto o una texture?
- *Scelta.* In quale parte della pagina sarà tradotta e quale ruolo avrà per il messaggio o il compito?
- *Verifica.* Quale osservazione permetterà di capire se la scelta aiuta il lettore?

Nel laboratorio di fotografia della @fig-comp-invito, il concept «sperimentare con la luce» può suggerire immagini con contrasti marcati. Una scelta concreta è riservare quei contrasti alla fotografia e dare al testo uno sfondo uniforme. La verifica riguarda la lettura di data, luogo e iscrizione. Un riferimento visivo diventa così un’ipotesi motivata, che può essere modificata quando rende più difficile trovare le informazioni necessarie.

Questo registro aiuta anche a confrontare una prima proposta con il risultato successivo: permette di distinguere ciò che è stato mantenuto, ciò che è cambiato e il motivo della revisione. La somiglianza stilistica fra una tavola e una schermata, da sola, non documenta il processo attraverso il quale è stato progettato un prodotto.

=== Costruire una variazione motivata

#block(breakable: false, above: 4pt, below: 10pt)[Dai riferimenti si passa a una composizione da confrontare, riprendendo la variazione di una scelta alla volta già praticata in tipografia e griglia. Si conserva una versione iniziale e se ne modifica una relazione: scala del titolo, spazio fra gruppi, posizione dell’immagine o peso del comando. Mantenere riconoscibile ciò che cambia aiuta a discutere il risultato.]

Se testo, immagini, colori e struttura variano tutti insieme, diventa più difficile comprendere quale scelta abbia prodotto un miglioramento o un problema.

Il confronto va fatto nella dimensione d’uso. Si controllano leggibilità dei dettagli, rapporto fra testo e immagine, presenza delle informazioni necessarie e comportamento quando il contenuto cresce. Una variante mobile può cambiare l’ordine dei blocchi e il taglio della fotografia, conservando significato e associazioni; una traduzione può allungare un comando. La coerenza riguarda le funzioni, anche quando la disposizione concreta si adatta.

=== Osservare la composizione sfocata

Una prima verifica delle varianti riguarda il peso complessivo dei blocchi, prima di osservarne l’uso. Socchiudere gli occhi o applicare una lieve sfocatura gaussiana a una copia della schermata riduce i dettagli e permette di osservare masse, contrasti e raggruppamenti. Questo controllo, chiamato _squint test_, può far emergere un’immagine secondaria che prevale sul titolo o un comando che si confonde con lo sfondo @compGordonGerarchia. Nell’invito della @fig-comp-invito si può confrontare quali blocchi restano distinguibili nelle tre varianti, anche quando le parole diventano illeggibili.

Si affiancano sempre originale e copia sfocata, mantenendo uguali dimensioni e intensità del filtro fra le varianti. Il controllo suggerisce quali rapporti rivedere; non misura la comprensione del messaggio, il percorso degli occhi o la possibilità di completare un’azione. Per verificarli occorre tornare al contenuto leggibile e alla prova con un compito.

=== Verificare con un compito

Il controllo dei pesi lascia aperta la domanda iniziale: la persona riesce a comprendere il messaggio e a fare ciò che le serve? Una consegna concreta rende osservabile il confronto: trovare l’orario di un’attività, identificare il materiale di un prodotto, modificare un appuntamento.

Si osservano il primo elemento individuato, le esitazioni, le associazioni fra etichette e controlli e l’esito dell’azione. Non basta chiedere quale versione piaccia di più quando la domanda riguarda la comprensione o la possibilità di agire.

Il percorso degli occhi può essere una delle informazioni disponibili, ma non dimostra da solo che il contenuto sia stato compreso. Allo stesso modo, una risposta corretta ottenuta con molte esitazioni segnala un problema diverso da un’azione rapida sul comando sbagliato. Le osservazioni vanno interpretate insieme al contesto e alla domanda della prova.

#exercise(id: "composizione", title: [Esercizio di composizione])[

Scegli un manifesto o una schermata. Scrivi quale messaggio o azione deve essere riconoscibile per prima e quali informazioni devono rimanere disponibili. Identifica poi i segnali esistenti: scala, contrasto, raggruppamenti, spazio, allineamento, immagini e convenzioni.

Produci una variazione motivata e affiancala alla versione iniziale. Spiega quale relazione dovrebbe emergere e quale elemento potrebbe attirare attenzione in modo concorrente. Se usi una metafora o un’icona, esplicita il significato previsto e il contesto necessario per comprenderlo. In un’interfaccia, distingui anche il riconoscimento del comando, la scelta e la sua attivazione.

Infine, formula una prova con un compito e confronta le risposte. Conserva anche le osservazioni che contraddicono l’ipotesi iniziale: possono indicare un segnale poco chiaro, una priorità diversa o un contenuto mancante. La revisione della composizione torna così al problema dal quale era partita: rendere riconoscibili le informazioni e le possibilità d’azione pertinenti.
]
]

#show: booklet
#chapter(..chapter-parameters(8), content)
