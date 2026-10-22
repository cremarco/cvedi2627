#import "../../template/stile.typ": sito, immagine
#import "componenti.typ": tavola-gestalt


// Fonte 3721:2461 · C03 · 178 · SX — Chiusura (closure)
== Chiusura (closure)

Elementi disposti lungo un contorno chiuso o quasi chiuso tendono a essere organizzati come una figura unitaria, anche con interruzioni.

#immagine(path("/assets/images/figure/gestalt/41-chiusura-closure.svg"),
  [Punti separati suggeriscono un cerchio e un quadrato. Le interruzioni lasciano riconoscibile il contorno complessivo, pur senza disegnarlo interamente.],
  alt: "Punti separati suggeriscono un cerchio e un quadrato. Le interruzioni lasciano riconoscibile il contorno complessivo, pur senza disegnarlo interamente.",
  width: 187.09pt) <fig-gestalt-113>


#place.flush()

// Fonte 3861:21343 · C03 · 179 · DX — Chiusura: come funziona
=== Chiusura: come funziona

La chiusura favorisce l’organizzazione di elementi che delimitano un’area o suggeriscono un contorno quasi completo. Archi separati, per esempio, possono apparire come parti di un cerchio anziché come frammenti indipendenti. La relazione dipende dalla disposizione dei tratti: spostarli o ruotarli può indebolire la figura d’insieme, anche quando numero, dimensione e forma dei singoli elementi restano invariati.

Percepire una figura unitaria non significa necessariamente vedere tutti i bordi mancanti. Nella configurazione di Kanizsa, alcuni elementi induttori possono far apparire un triangolo con margini non disegnati: si parla di contorni illusori e di completamento modale. Se invece una superficie copre parte di un oggetto e lo percepiamo come continuo dietro l’ostacolo, il completamento è amodale: la parte nascosta non appare direttamente visibile.

Questi fenomeni sono collegati all’organizzazione delle forme, ma non sono sinonimi. Per spiegare un esempio, chiediti se i frammenti delimitano un insieme, se compaiono margini illusori o se una parte viene interpretata come nascosta. Nel caso dei punti disposti in cerchio, lo schema mostra un contorno suggerito dalla disposizione. Il risultato non autorizza ad attribuire alla chiusura ogni immagine incompleta o ogni oggetto facilmente riconoscibile (@fig-gestalt-113–#ref(<fig-gestalt-121>, supplement: none)).

 @gestalt-wertheimer1923#sito([Wertheimer (1923).], "https://doi.org/10.1007/BF00410640")


#place.flush()

// Fonte 198:4285 · C03 · 180 · SX — Chiusura nel web
=== Chiusura nel web

Nel web, icone e indicatori possono restare riconoscibili anche quando il contorno è interrotto. La disposizione dei tratti suggerisce una forma complessiva: un arco sufficientemente esteso può richiamare un anello.

Lo screenshot reale della documentazione Bootstrap mostra uno spinner dal contorno aperto. Il completamento percettivo sostiene il riconoscimento della forma circolare; la funzione di caricamento dipende anche dalla convenzione appresa e dall’animazione descritta nella fonte. Lo screenshot documenta la forma, mentre la rotazione va osservata nell’esempio funzionante. Forma e messaggio accessibile devono comunicare insieme lo stato dell’interfaccia.

#immagine(path("/assets/images/figure/gestalt/42-chiusura-nel-web.png"),
  [Bootstrap, dettaglio reale dello spinner: l’arco aperto suggerisce un anello. La @fig-gestalt-119 mostra una vista completa della stessa documentazione.],
  alt: "Bootstrap, dettaglio reale dello spinner: l’arco aperto suggerisce un anello. La la figura collegata mostra una vista completa della stessa documentazione.",
  width: 388.35pt,
  diritti: [Bootstrap 5.3, Spinners · screenshot del 15 ottobre 2026, DPR 3. Documentazione CC BY 3.0; codice MIT.],
  placement: top, scope: "parent") <fig-gestalt-114>


#place.flush()

Fonti per @fig-gestalt-114. #sito([Bootstrap 5.3, Spinners · screenshot del 15 ottobre 2026, DPR 3..], "https://getbootstrap.com/docs/5.3/components/spinners/")


#place.flush()

// Fonte 3864:2142 · C03 · 181 · DX — Chiusura: logo reale
=== Chiusura: il logo WWF

Orecchie, occhi e zampe bastano a suggerire un panda. Il bianco della testa e del corpo non è delimitato ovunque da una linea: la percezione completa i contorni mancanti e ricostruisce una figura unitaria. Anche la conoscenza dell’animale contribuisce al riconoscimento.

#immagine(path("/assets/images/figure/gestalt/43-chiusura-logo-reale.svg"),
  [WWF: il panda si completa oltre i tratti effettivamente disegnati.],
  alt: "WWF: il panda si completa oltre i tratti effettivamente disegnati.",
  width: 146.50pt,
  diritti: [WWF® e ©1986 Panda Symbol sono di proprietà di WWF. Tutti i diritti riservati.],
  placement: top, scope: "parent") <fig-gestalt-115>


#place.flush()

Fonti per @fig-gestalt-115. #sito([WWF® e ©1986 Panda Symbol sono di proprietà di WWF. Tutti i diritti riservati.], "https://www.worldwildlife.org/about/history-of-wwfs-panda-logo/")


#place.flush()

// Fonte 3863:2098 · C03 · 182 · SX — Chiusura: fotografia
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/44-chiusura-fotografia.png"), didascalia: [La rete interrompe porzioni del gatto, che viene comunque percepito come un unico animale. È un completamento amodale dietro un ostacolo, affine alla chiusura di contorni incompleti.], diritti: [Syrio · CC BY-SA 4.0 · Wikimedia Commons], alt: "La rete interrompe porzioni del gatto, che viene comunque percepito come un unico animale. È un completamento amodale dietro un ostacolo, affine alla chiusura di contorni incompleti.", rapporto: 1.3333333333333333, larghezza-fonte: 420.0, etichetta: <fig-gestalt-116>),
), note: [Fonti per @fig-gestalt-116. #sito([Syrio · CC BY-SA 4.0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Scared_cat_behind_a_wire_fence.jpg")

])


#place.flush()

// Fonte 3897:2256 · C03 · 183 · DX — Chiusura: Sea & Vines
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/45-chiusura-sea-vines.png"), didascalia: [Sea & Vines: le forchette suggeriscono il profilo di un calice incompleto.], diritti: [Sea & Vines Food & Wine Festival, 2012. Autore non indicato.], alt: "Sea & Vines: le forchette suggeriscono il profilo di un calice incompleto.", rapporto: 0.7075471698113207, larghezza-fonte: 342.45281982421875, etichetta: <fig-gestalt-117>),
), note: [])


#place.flush()

// Fonte 3919:2088 · C03 · 184 · SX — Chiusura: Heinz
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/46-chiusura-heinz.png"), didascalia: [Heinz: fette, collo ed etichetta suggeriscono una bottiglia dal contorno irregolare.], diritti: [Heinz, pubblicità. Autore non indicato; rispettivi diritti.], alt: "Heinz: fette, collo ed etichetta suggeriscono una bottiglia dal contorno irregolare.", rapporto: 0.7311557788944724, larghezza-fonte: 353.87939453125, etichetta: <fig-gestalt-118>),
), note: [])


#place.flush()

// Fonte 3804:2072 · C03 · 185 · DX — Loader: contorni aperti nel web
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/47-loader-contorni-aperti-nel-web.png"), didascalia: [Bootstrap: lo spinner suggerisce un anello con un contorno aperto. La rotazione e la convenzione appresa ne comunicano la funzione di caricamento.], diritti: [Bootstrap 5.3, Spinners · screenshot del 14 ottobre 2026. Documentazione CC BY 3.0; codice MIT.], alt: "Bootstrap: lo spinner suggerisce un anello con un contorno aperto. La rotazione e la convenzione appresa ne comunicano la funzione di caricamento.", rapporto: 1.7777777777777777, larghezza-fonte: 420.0, etichetta: <fig-gestalt-119>),
), note: [Fonti per @fig-gestalt-119. #sito([Bootstrap 5.3, Spinners · screenshot del 14 ottobre 2026. Documentazione.], "https://getbootstrap.com/docs/5.3/components/spinners/")

])


#place.flush()

// Fonte 3897:2277 · C03 · 186 · SX — Chiusura: altri screenshot reali
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/48-chiusura-altri-screenshot-reali.png"), didascalia: [Carbon: un arco incompleto suggerisce un anello.], diritti: [Loading | Carbon Design System · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Carbon: un arco incompleto suggerisce un anello.", rapporto: 1.7777777777777777, larghezza-fonte: 420.0, etichetta: <fig-gestalt-120>),
  (file: path("/assets/images/figure/gestalt/49-chiusura-altri-screenshot-reali.png"), didascalia: [Dettaglio dello stesso fotogramma: il contorno interrotto resta riconoscibile.], diritti: [Loading | Carbon Design System · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Dettaglio dello stesso fotogramma: il contorno interrotto resta riconoscibile.", rapporto: 1.0, larghezza-fonte: 200.0, etichetta: <fig-gestalt-121>),
), note: [Fonti per @fig-gestalt-120, @fig-gestalt-121. #sito([Loading | Carbon Design System · screenshot del 15 ottobre 2026. Diritti.], "https://www.carbondesignsystem.com/building-blocks/core/components/loading/guidelines")

])


#place.flush()

// Fonte 3721:2472 · C03 · 187 · DX — Simmetria (symmetry)
== Simmetria (symmetry)

Elementi disposti in modo speculare rispetto a un asse tendono a essere percepiti come parti correlate di una stessa configurazione visiva.

#immagine(path("/assets/images/figure/gestalt/50-simmetria-symmetry.svg"),
  [Le coppie di punti corrispondono rispetto all’asse verticale. Nel confronto, gli stessi elementi perdono la disposizione speculare: simmetria e numero degli elementi sono variabili distinte.],
  alt: "Le coppie di punti corrispondono rispetto all’asse verticale. Nel confronto, gli stessi elementi perdono la disposizione speculare: simmetria e numero degli elementi sono variabili distinte.",
  width: 187.09pt) <fig-gestalt-122>


#place.flush()

// Fonte 3861:21422 · C03 · 188 · SX — Simmetria: come funziona
=== Simmetria: come funziona

La simmetria è una relazione geometrica fra parti della configurazione. Nella simmetria bilaterale, i punti di una metà trovano corrispondenza nell’altra rispetto a un asse. Questa regolarità può favorire il riconoscimento di un insieme: due contorni speculari possono apparire come i lati di una stessa figura, anche quando fra loro rimane uno spazio privo di segni.

Il contributo della simmetria dipende dalla disposizione complessiva e dagli altri fattori di organizzazione. Nel confronto a punti, è utile mantenere numero, dimensione e densità simili, modificando soltanto le corrispondenze rispetto all’asse. Un piccolo spostamento può rendere visibile la perdita di regolarità; il risultato non implica che ogni composizione asimmetrica sia difficile da comprendere o che ogni insieme simmetrico venga riconosciuto immediatamente.

Simmetria ed equilibrio visivo non coincidono. Due aree possono bilanciarsi per dimensione, contrasto o posizione senza essere speculari. Anche un layout centrato non è necessariamente simmetrico nei suoi contenuti. Nella tradizione della Gestalt, la simmetria è considerata un fattore di organizzazione e di buona forma; nelle applicazioni progettuali occorre precisare quale corrispondenza geometrica è effettivamente presente, evitando di chiamare simmetrica qualsiasi composizione ordinata (@fig-gestalt-122–#ref(<fig-gestalt-131>, supplement: none)).

 @gestalt-wertheimer1923#sito([Wertheimer (1923).], "https://doi.org/10.1007/BF00410640")


#place.flush()

// Fonte 198:4297 · C03 · 189 · DX — Simmetria nel web
=== Simmetria nel web

Nel web, posizioni corrispondenti ai due lati di un asse possono suggerire una composizione unitaria. Un elemento centrale e due gruppi laterali possono mettere in relazione contenuti differenti senza renderli identici.

Nella pagina iniziale di Wikipedia, il globo occupa il centro e i collegamenti alle lingue si distribuiscono ai suoi lati. La corrispondenza riguarda soprattutto le posizioni: testi e lunghezze sono diversi, quindi la simmetria non è perfetta. Quando il layout cambia, va verificato come si trasformano l’asse e le relazioni fra gli elementi, senza sacrificare lettura e gerarchia.

#immagine(path("/assets/images/figure/gestalt/51-simmetria-nel-web.png"),
  [Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale. Si corrispondono le posizioni, mentre i testi sono differenti.],
  alt: "Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale. Si corrispondono le posizioni, mentre i testi sono differenti.",
  width: 388.35pt,
  diritti: [Wikipedia · screenshot del 14 ottobre 2026. © Wikimedia Foundation e rispettivi titolari.],
  placement: top, scope: "parent") <fig-gestalt-123>


#place.flush()

Fonti per @fig-gestalt-123. #sito([Wikipedia · screenshot del 14 ottobre 2026. © Wikimedia Foundation e.], "https://www.wikipedia.org/")


#place.flush()

// Fonte 3864:2169 · C03 · 190 · SX — Simmetria: logo reale
=== Simmetria: il logo Volkswagen

Le lettere V e W e il cerchio condividono un asse verticale. La corrispondenza fra lato destro e sinistro dà stabilità alla figura e aiuta a percepirla come un insieme ordinato. La simmetria riguarda la struttura dell’emblema, non la presenza di elementi identici affiancati.

#immagine(path("/assets/images/figure/gestalt/52-simmetria-logo-reale.png"),
  [Volkswagen, 2019: un asse verticale organizza l’emblema.],
  alt: "Volkswagen, 2019: un asse verticale organizza l’emblema.",
  width: 388.35pt,
  diritti: [© Volkswagen AG. Volkswagen unveils new brand design and logo, DB2019AL01916, 2019.],
  placement: top, scope: "parent") <fig-gestalt-124>


#place.flush()

Fonti per @fig-gestalt-124. #sito([© Volkswagen AG. Volkswagen unveils new brand design and logo,.], "https://www.volkswagen-newsroom.com/en/images/detail/volkswagen-unveils-new-brand-design-and-logo-30063")


#place.flush()

// Fonte 3863:2118 · C03 · 191 · DX — Simmetria: fotografia
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/53-simmetria-fotografia.png"), didascalia: [L’asse centrale riunisce cupola, facciata e minareti in un insieme bilanciato; le corrispondenze fra destra e sinistra rafforzano la lettura unitaria dell’edificio.], diritti: [Nelson C Simon · CC BY-SA 4.0 · Wikimedia Commons], alt: "L’asse centrale riunisce cupola, facciata e minareti in un insieme bilanciato; le corrispondenze fra destra e sinistra rafforzano la lettura unitaria dell’edificio.", rapporto: 1.499531396438613, larghezza-fonte: 420.0, etichetta: <fig-gestalt-125>),
), note: [Fonti per @fig-gestalt-125. #sito([Nelson C Simon · CC BY-SA 4.0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Reflection_of_the_Taj_Mahal.jpg")

])


#place.flush()

// Fonte 3897:2295 · C03 · 192 · SX — Simmetria: altre immagini e grafiche
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/54-simmetria-altre-immagini-e-grafiche.png"), didascalia: [HSBC: le forme dell’emblema si corrispondono rispetto agli assi verticale e orizzontale.], diritti: [HSBC · autore del marchio non indicato nella fonte.], alt: "HSBC: le forme dell’emblema si corrispondono rispetto agli assi verticale e orizzontale.", rapporto: 1.1620689655172414, larghezza-fonte: 337, etichetta: <fig-gestalt-126>),
), note: [])


#place.flush()

// Fonte 3692:2376 · C03 · 193 · DX — Adham Dannaway: volto e metà
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/55-adham-dannaway-volto-e-met.png"), didascalia: [Adham Dannaway: due metà differenti compongono un volto intorno a un asse centrale.], diritti: [© Adham Dannaway · portfolio, immagine.], alt: "Adham Dannaway: due metà differenti compongono un volto intorno a un asse centrale.", rapporto: 2.663294797687861, larghezza-fonte: 291.10894775390625, etichetta: <fig-gestalt-127>),
  (file: path("/assets/images/figure/gestalt/56-adham-dannaway-volto-e-met.png"), didascalia: [Dettaglio della stessa immagine: i tratti del volto trovano corrispondenza ai due lati; i contenuti delle metà sono differenti.], diritti: [© Adham Dannaway · portfolio, immagine.], alt: "Dettaglio della stessa immagine: i tratti del volto trovano corrispondenza ai due lati; i contenuti delle metà sono differenti.", rapporto: 0.675, larghezza-fonte: 224.5697479248047, etichetta: <fig-gestalt-128>),
), note: [Fonti per @fig-gestalt-127, @fig-gestalt-128. #sito([© Adham Dannaway · portfolio, immagine.], "https://www.adhamdannaway.com/")

])


#place.flush()

// Fonte 3804:2087 · C03 · 194 · SX — Wikipedia: lingue attorno a un asse
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/57-wikipedia-lingue-attorno-a-un-asse.png"), didascalia: [Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale.], diritti: [Wikipedia, pagina iniziale italiana. Screenshot del 14 ottobre 2026. © Wikimedia Foundation e rispettivi titolari.], alt: "Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale.", rapporto: 1.7777777777777777, larghezza-fonte: 407.1980895996094, etichetta: <fig-gestalt-129>),
  (file: path("/assets/images/figure/gestalt/58-wikipedia-lingue-attorno-a-un-asse.png"), didascalia: [Dettaglio: le posizioni si corrispondono ai due lati, mentre testi e lingue sono differenti.], diritti: [Wikipedia, pagina iniziale italiana. Screenshot del 14 ottobre 2026. © Wikimedia Foundation e rispettivi titolari.], alt: "Dettaglio: le posizioni si corrispondono ai due lati, mentre testi e lingue sono differenti.", rapporto: 1.018348623853211, larghezza-fonte: 213.2942352294922, etichetta: <fig-gestalt-130>),
), note: [])


#place.flush()

// Fonte 3897:2313 · C03 · 195 · DX — Simmetria: altri screenshot reali
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/59-simmetria-altri-screenshot-reali.png"), didascalia: [OBS: controlli uguali e centri equidistanti; i simboli sono differenti.], diritti: [Download | OBS · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "OBS: controlli uguali e centri equidistanti; i simboli sono differenti.", rapporto: 1.7777777777777777, larghezza-fonte: 420.0, etichetta: <fig-gestalt-131>),
), note: [Fonti per @fig-gestalt-131. #sito([Download | OBS · screenshot del 15 ottobre 2026. Diritti dei rispettivi.], "https://obsproject.com/download")

])


#place.flush()
