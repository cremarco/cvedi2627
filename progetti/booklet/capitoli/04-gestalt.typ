// Capitolo 04: unico testo per volume e compilazione autonoma.
#import "../template/stile.typ": booklet, capitolo
#import "../template/piano.typ": parametri-capitolo

#let testo = [
#import "../template/figure.typ": figura-al-vivo, figura-nel-testo
// Ordine editoriale del capitolo; le varianti restano nei rispettivi ambiti locali.

#[
#import "../template/stile.typ": sito, immagine



// Fonte 198:3080 · C03 · 138 · SX — Ideazione: percezione e Gestalt
== Ideazione: percezione e Gestalt

*L’ideazione sviluppa più risposte al problema emerso dalla ricerca. Le alternative riguardano il funzionamento, i contenuti e la forma dell’esperienza.*

Nel caso di _Sara_, per esempio, si possono confrontare diversi modi di mostrare la data, la disponibilità e la conferma di una prenotazione. Per motivare queste scelte occorre capire come le persone percepiscono gli elementi, li raggruppano e riconoscono le relazioni fra loro. Il linguaggio visivo aiuta a dare forma alle proposte e a discuterle.

Confrontare più alternative permette di scegliere quali sviluppare nei prototipi. Percezione, gerarchia e colore diventano così strumenti del progetto: le scelte vanno poi verificate osservando come le persone comprendono e usano l’interfaccia.



// Fonte 198:3543 · C03 · 139 · DX — Percezione visiva: le origini della Gestalt
=== Percezione visiva: le origini della Gestalt

*Le origini*

La scuola della Gestalt nacque nel 1912, con la pubblicazione, da parte dello psicologo _Max Wertheimer_, dello studio sul movimento apparente (percezione fenomenica del movimento in assenza di movimento fisico). Altri esponenti importanti furono _Kurt Koffka_ e _Wolfgang Köhler_, che contribuirono allo sviluppo della scuola.
I gestaltisti studiarono anche le modalità con cui il nostro cervello identifica un oggetto a partire da un insieme di stimoli. _Köhler_ e gli altri diedero contributi importanti anche per quanto riguarda la psicologia del ragionamento e dell’apprendimento.


*La teoria della Gestalt*

Agli inizi del secolo scorso gli studiosi appartenenti alla Scuola della Psicologia della Gestalt (o Psicologia della Forma) tentarono di dare una risposta alla domanda fondamentale di come l’attivazione di alcuni recettori sulla retina possa portare alla percezione di oggetti distinti gli uni dagli altri. Capire quali sono le modalità con cui si compiono questi processi è fondamentale per un designer e per un comunicatore.



// Fonte 198:4344 · C03 · 140 · SX — Dalle parti all’insieme
=== Dalle parti all’insieme

Nel 1923, _Wertheimer_ descrisse fattori di organizzazione percettiva: elementi separati possono essere percepiti come gruppi in base alle loro relazioni. Il tutto presenta qualità che dipendono dalla configurazione, oltre che dalle singole parti (@fig-gestalt-73).

*Lo spazio partecipa alla composizione*

Lo spazio positivo è occupato dagli elementi; quello negativo si trova attorno e tra essi. Il rapporto tra pieni e vuoti aiuta a separare gruppi, creare gerarchie e dare ritmo alla lettura. Figura e sfondo possono anche alternarsi, come nel manifesto della @fig-gestalt-74.

*Una relazione deve essere riconoscibile*

Nelle interfacce, la disposizione suggerisce quali elementi sono collegati: un’etichetta vicina al proprio campo, per esempio, viene letta come sua descrizione. Distanze, separazioni e rilievo visivo devono rendere riconoscibili queste relazioni. Poiché i principi possono suggerire letture diverse, occorre verificarle osservando l’uso.

#figura-nel-testo(
  id: "fig-gestalt-73", file: path("/risorse-condivise/immagini/figure/gestalt/01-dalle-parti-all-insieme.svg"),
  didascalia: [Intervalli costanti suggeriscono una sequenza continua; uno spazio maggiore separa due gruppi di tre elementi. @gestalt-palmer2002#sito([_Palmer_ (2002).], "https://palmerlab.berkeley.edu/pdf/Palmer.pdf") @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")],
  diritti: none, alt: "Intervalli costanti suggeriscono una sequenza continua; uno spazio maggiore separa due gruppi di tre elementi.",
  rapporto: 363.0 / 108.0, colonne: 1,
)



// Fonte 198:4912 · C03 · 141 · DX — Black Swan: forma e contrasto
#figura-al-vivo(
  id: "fig-gestalt-74", file: path("/risorse-condivise/immagini/figure/gestalt/02-black-swan-forma-e-contrasto.png"),
  didascalia: [Black Swan: una composizione giocata su forma, colore e contrasto.],
  diritti: none, alt: "Black Swan: una composizione giocata su forma, colore e contrasto.",
  rapporto: 706 / 936,
)



// Fonte 3894:2081 · C03 · 143 · DX — Le nove leggi della Gestalt
=== Le nove leggi

- Vicinanza (proximity)
- Somiglianza (similarity)
- Destino comune (common fate)
- Buona continuazione (good continuation)
- Chiusura (closure)
- Simmetria (symmetry)
- Figura e sfondo (figure–ground)
- Esperienza passata (past experience)
- Regione comune (common region)

La regione comune fu proposta da _Stephen E. Palmer_ nel 1992, dopo le formulazioni classiche della Gestalt @gestalt-palmer1992.


]
#[
#import "../template/stile.typ": sito, immagine


// Fonte 3721:1964 · C03 · 144 · SX — Vicinanza (proximity)
== Vicinanza (proximity)

A parità di altre condizioni, elementi vicini fra loro tendono a essere percepiti come appartenenti allo stesso gruppo visivo.

#figura-nel-testo(
  id: "fig-gestalt-75", file: path("/risorse-condivise/immagini/figure/gestalt/03-vicinanza-proximity.svg"),
  didascalia: [Gli stessi punti, con uguale numero, dimensione e colore, appaiono distribuiti uniformemente oppure raccolti in coppie: cambiano soltanto gli intervalli.],
  diritti: none, alt: "Gli stessi punti, con uguale numero, dimensione e colore, appaiono distribuiti uniformemente oppure raccolti in coppie: cambiano soltanto gli intervalli.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:2029 · C03 · 145 · DX — Vicinanza: come funziona
=== Vicinanza: come funziona

La vicinanza è un fattore di organizzazione percettiva: quando osserviamo più elementi, tendiamo a raccogliere nello stesso insieme quelli separati da intervalli minori. Il raggruppamento può emergere senza cornici, collegamenti o cambiamenti di colore. Una serie di punti identici, per esempio, può apparire suddivisa in righe, colonne o coppie soltanto modificando le distanze che separano i punti.

Conta il rapporto fra le distanze, non una misura valida in ogni situazione. Per rendere distinguibili alcuni gruppi, lo spazio interno a ciascun gruppo dovrebbe essere inferiore a quello che lo separa dai gruppi vicini. Se tutti gli intervalli diventano simili, la suddivisione perde evidenza; se un elemento si avvicina a un altro insieme, può cambiare l’appartenenza che gli attribuiamo.

La vicinanza non determina da sola ogni lettura. Colore, forma, allineamento e contenitori possono sostenere lo stesso raggruppamento oppure suggerirne uno diverso. Per comprendere un esempio, osserva quali elementi sembrano appartenersi e quali distanze producono questa impressione. Confronta poi configurazioni in cui cambiano soltanto gli intervalli: mantenere costanti dimensione, numero e aspetto degli elementi permette di riconoscere meglio il contributo della vicinanza (@fig-gestalt-75–#ref(<fig-gestalt-83>, supplement: none)).

 @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")



// Fonte 198:4238 · C03 · 146 · SX — Vicinanza nel web
=== Vicinanza nel web

La vicinanza aiuta a capire quali elementi sono collegati. Nel web, un titolo va accostato ai contenuti che introduce, mentre uno spazio più ampio distingue gruppi diversi.

Nel dettaglio di Netflix, «La mia lista» è vicina alla propria riga di locandine; l’intervallo prima di «I più cercati» separa le due categorie. Anche allineamento e formato ripetuto contribuiscono alla lettura.

#figura-nel-testo(
  id: "fig-gestalt-76", file: path("/risorse-condivise/immagini/figure/gestalt/04-vicinanza-nel-web.png"),
  didascalia: [Netflix: titoli vicini alle righe, spazi fra categorie. Dettaglio; vista completa nella @fig-gestalt-80.],
  diritti: [Netflix · screenshot storico. Diritti dei rispettivi titolari.], alt: "Netflix: titoli vicini alle righe, spazi fra categorie. Dettaglio; vista completa nella figura collegata.",
  rapporto: 650 / 300, colonne: 2,
)



// Fonte 3864:2018 · C03 · 147 · DX — Vicinanza: logo reale
=== Vicinanza: il logo Unilever

I piccoli simboli sono separati, ma le distanze ridotte li fanno leggere come un insieme compatto. Prima riconosciamo la U, poi possiamo esplorare i singoli elementi. La vicinanza contribuisce all’unità del marchio insieme al colore comune e al contorno complessivo.

#figura-nel-testo(
  id: "fig-gestalt-77", file: path("/risorse-condivise/immagini/figure/gestalt/05-vicinanza-logo-reale.svg"),
  didascalia: [Unilever: simboli distinti riuniti nella sagoma di una U.#sito([Marchio Unilever. Fonte: Unilever, The logo. Lettura percettiva a fini.], "https://www.unilever.pk/our-company/the-logo/")],
  diritti: [Marchio Unilever. Fonte: Unilever, The logo. Lettura percettiva a fini didattici.], alt: "Unilever: simboli distinti riuniti nella sagoma di una U.",
  rapporto: 1426.0 / 1080.0, colonne: 1,
)



// Fonte 3863:2018 · C03 · 148 · SX — Vicinanza: fotografia
#figura-nel-testo(
  id: "fig-gestalt-78", file: path("/risorse-condivise/immagini/figure/gestalt/06-vicinanza-fotografia.png"),
  didascalia: [Gli acini più vicini si leggono come grappoli distinti; gli intervalli più ampi separano i gruppi. Anche colore, sovrapposizioni e connessioni contribuiscono al raggruppamento.#sito([_LBM1948_ · CC BY-SA 4.0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:La_Rioja,_vi%C3%B1as_(2000)_06.jpg")],
  diritti: [LBM1948 · CC BY-SA 4.0 · Wikimedia Commons], alt: "Gli acini più vicini si leggono come grappoli distinti; gli intervalli più ampi separano i gruppi. Anche colore, sovrapposizioni e connessioni contribuiscono al raggruppamento.",
  rapporto: 952 / 684, colonne: 1,
)



// Fonte 3897:2088 · C03 · 149 · DX — Vicinanza: altre immagini e grafiche
#figura-al-vivo(
  id: "fig-gestalt-79", file: path("/risorse-condivise/immagini/figure/gestalt/07-vicinanza-altre-immagini-e-grafiche.png"),
  didascalia: [Nature Valley: le chips ravvicinate suggeriscono un albero. Vicinanza e riconoscimento della forma cooperano.], diritti: [Campbell Mithun · Nature Valley Fruit Crisps.], alt: "Nature Valley: le chips ravvicinate suggeriscono un albero. Vicinanza e riconoscimento della forma cooperano.",
  rapporto: 851 / 1200,
)



// Fonte 3417:1097 · C03 · 150 · SX — Vicinanza: il catalogo Netflix
#figura-nel-testo(
  id: "fig-gestalt-80", file: path("/risorse-condivise/immagini/figure/gestalt/08-vicinanza-il-catalogo-netflix.png"),
  didascalia: [Netflix: il titolo è vicino alla riga che descrive; lo spazio maggiore separa ciascun gruppo dal successivo.],
  diritti: [Netflix · screenshot storico. Diritti dei rispettivi titolari.], alt: "Netflix: il titolo è vicino alla riga che descrive; lo spazio maggiore separa ciascun gruppo dal successivo.",
  rapporto: 852 / 648, colonne: 2,
)



// Fonte 3692:2327 · C03 · 151 · DX — Algida: marchi nel catalogo
#figura-nel-testo(
  id: "fig-gestalt-81", file: path("/risorse-condivise/immagini/figure/gestalt/09-algida-marchi-nel-catalogo.png"),
  didascalia: [Algida: la vicinanza fra prodotto e marchio rende riconoscibile ogni gruppo del catalogo.#sito([Algida / The Magnum Ice Cream Company · screenshot ufficiale del 14.], "https://www.sharehappy.it/home.html")],
  diritti: [Algida / The Magnum Ice Cream Company · screenshot ufficiale del 14 ottobre 2026.], alt: "Algida: la vicinanza fra prodotto e marchio rende riconoscibile ogni gruppo del catalogo.",
  rapporto: 390 / 844, colonne: 1,
)



// Fonte 3897:2106 · C03 · 152 · SX — Vicinanza: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-82", file: path("/risorse-condivise/immagini/figure/gestalt/10-vicinanza-altri-screenshot-reali.png"),
  didascalia: [GitHub: titolo, etichette e metadati ravvicinati formano ogni issue.#sito([Issues · microsoft/vscode · GitHub · screenshot del 15 ottobre 2026..], "https://github.com/microsoft/vscode/issues")],
  diritti: [Issues · microsoft/vscode · GitHub · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "GitHub: titolo, etichette e metadati ravvicinati formano ogni issue.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-83", file: path("/risorse-condivise/immagini/figure/gestalt/11-vicinanza-altri-screenshot-reali.png"),
  didascalia: [Pane&Trita: fotografia, indirizzo e pulsante si leggono come un gruppo.],
  diritti: [Diritti dei rispettivi titolari.], alt: "Pane&Trita: fotografia, indirizzo e pulsante si leggono come un gruppo.",
  rapporto: 1099 / 413, colonne: 2,
)



// Fonte 3721:2140 · C03 · 153 · DX — Somiglianza (similarity)
== Somiglianza (similarity)

Elementi simili per forma, colore, dimensione o orientamento tendono a essere percepiti come parti di un insieme, anche se distanti.

#figura-nel-testo(
  id: "fig-gestalt-84", file: path("/risorse-condivise/immagini/figure/gestalt/12-somiglianza-similarity.svg"),
  didascalia: [Nella stessa griglia, posizioni e distanze restano costanti. Alternare il colore per colonne o per righe fa emergere raggruppamenti differenti.],
  diritti: none, alt: "Nella stessa griglia, posizioni e distanze restano costanti. Alternare il colore per colonne o per righe fa emergere raggruppamenti differenti.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:2148 · C03 · 154 · SX — Somiglianza: come funziona
=== Somiglianza: come funziona

La somiglianza favorisce il raggruppamento di elementi che condividono una caratteristica visiva. Possiamo riconoscere una serie di cerchi fra quadrati, oppure seguire i punti dello stesso colore all’interno di una griglia regolare. Gli elementi non devono essere identici in ogni aspetto: è sufficiente che una proprietà comune risulti abbastanza evidente da suggerire una relazione fra loro.

Il raggruppamento può attraversare la distanza. Punti con lo stesso aspetto possono apparire collegati anche quando fra loro si trovano elementi differenti. La lettura dipende però dalla configurazione complessiva: contrasto, dimensione, densità e posizione modificano la forza del segnale. Non esiste una graduatoria universale che renda sempre il colore più efficace della forma, o la forma più efficace della dimensione.

Per osservare il principio, confronta griglie con posizioni e intervalli identici, modificando una sola proprietà. Se il colore varia per colonna, potresti leggere colonne; se varia per riga, potresti leggere righe. Quando somiglianza e vicinanza indicano insiemi differenti, la configurazione può diventare ambigua. Nel descrivere una composizione, distingui quindi la proprietà condivisa dall’interpretazione del suo significato: assomigliarsi suggerisce una relazione, ma non spiega ancora quale relazione sia (@fig-gestalt-84–#ref(<fig-gestalt-94>, supplement: none)).

 @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")



// Fonte 198:4250 · C03 · 155 · DX — Somiglianza nel web
=== Somiglianza nel web

Nel web, elementi che condividono una funzione possono presentare caratteristiche coerenti. Forma, tipografia e struttura ricorrente aiutano a riconoscere contenuti dello stesso tipo e a confrontarli, anche quando le informazioni sono differenti.

Nella schermata di AppFlowy, le attività condividono il formato della scheda. La somiglianza segnala la loro appartenenza allo stesso sistema; colonne ed etichette aggiungono altri raggruppamenti. La coerenza va mantenuta senza appiattire le differenze: ruoli e stati distinti richiedono segnali comprensibili, che non dipendano soltanto dal colore.

#figura-nel-testo(
  id: "fig-gestalt-85", file: path("/risorse-condivise/immagini/figure/gestalt/13-somiglianza-nel-web.png"),
  didascalia: [AppFlowy: le attività condividono il formato della scheda; etichette e colonne introducono ulteriori raggruppamenti.],
  diritti: [AppFlowy · screenshot. Diritti dei rispettivi titolari.], alt: "AppFlowy: le attività condividono il formato della scheda; etichette e colonne introducono ulteriori raggruppamenti.",
  rapporto: 1742 / 1014, colonne: 2,
)



// Fonte 3864:2045 · C03 · 156 · SX — Somiglianza: logo reale
=== Somiglianza: il logo Audi

I quattro anelli condividono forma circolare, dimensione e spessore. La ripetizione rende immediata la loro appartenenza allo stesso insieme, anche prima di conoscere il significato storico del marchio. La sovrapposizione e l’allineamento rafforzano questo raggruppamento.

#figura-nel-testo(
  id: "fig-gestalt-86", file: path("/risorse-condivise/immagini/figure/gestalt/14-somiglianza-logo-reale.png"),
  didascalia: [Audi: quattro anelli con forma e peso visivo comuni.#sito([© AUDI AG. Audi logo: New Corporate Design, immagine AL090142.], "https://www.audi.com/en/photos/detail/audi-logo-new-corporate-design-1282")],
  diritti: [© AUDI AG. Audi logo: New Corporate Design, immagine AL090142.], alt: "Audi: quattro anelli con forma e peso visivo comuni.",
  rapporto: 1200 / 1200, colonne: 1,
)



// Fonte 3863:2038 · C03 · 157 · DX — Somiglianza: fotografia
#figura-nel-testo(
  id: "fig-gestalt-87", file: path("/risorse-condivise/immagini/figure/gestalt/15-somiglianza-fotografia.png"),
  didascalia: [Fra biglie mescolate, colori e superfici simili permettono di ritrovare famiglie visive anche quando gli elementi non sono tutti adiacenti.#sito([_StockyPics_ · CC0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Colorful_marbles_(21447639398).jpg")],
  diritti: [StockyPics · CC0 · Wikimedia Commons], alt: "Fra biglie mescolate, colori e superfici simili permettono di ritrovare famiglie visive anche quando gli elementi non sono tutti adiacenti.",
  rapporto: 1280 / 853, colonne: 1,
)



// Fonte 3897:2127 · C03 · 158 · SX — Somiglianza: altre immagini e grafiche
#figura-al-vivo(
  id: "fig-gestalt-88", file: path("/risorse-condivise/immagini/figure/gestalt/16-somiglianza-altre-immagini-e-grafiche.png"),
  didascalia: [Haribo: forma e colore accomunano gli orsetti gialli; quello verde si distingue.],
  diritti: [Haribo, «Be Different» · autore non indicato.], alt: "Haribo: forma e colore accomunano gli orsetti gialli; quello verde si distingue.",
  rapporto: 989 / 1280,
  rifilo: false,
)



// Fonte 3417:1199 · C03 · 159 · DX — Somiglianza: schede e categorie
#figura-nel-testo(
  id: "fig-gestalt-89", file: path("/risorse-condivise/immagini/figure/gestalt/17-somiglianza-schede-e-categorie.png"),
  didascalia: [AppFlowy: le attività condividono il formato della scheda; etichette e colonne introducono ulteriori raggruppamenti.],
  diritti: [AppFlowy · screenshot. Diritti dei rispettivi titolari.], alt: "AppFlowy: le attività condividono il formato della scheda; etichette e colonne introducono ulteriori raggruppamenti.",
  rapporto: 1742 / 1014, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-90", file: path("/risorse-condivise/immagini/figure/gestalt/18-somiglianza-schede-e-categorie.png"),
  didascalia: [Pane&Trita: le due schede rosse risultano più simili fra loro rispetto alla terza.],
  diritti: [Rispettivi diritti.], alt: "Pane&Trita: le due schede rosse risultano più simili fra loro rispetto alla terza.",
  rapporto: 1103 / 263, colonne: 2,
)



// Fonte 3804:2037 · C03 · 160 · SX — Api&Bio: schede delle persone
#figura-nel-testo(
  id: "fig-gestalt-91", file: path("/risorse-condivise/immagini/figure/gestalt/19-api-bio-schede-delle-persone.png"),
  didascalia: [Api&Bio: tre persone sono presentate con lo stesso formato di immagine, ruolo e biografia.],
  diritti: [Api&Bio · screenshot storico. Autori non indicati nella fonte.], alt: "Api&Bio: tre persone sono presentate con lo stesso formato di immagine, ruolo e biografia.",
  rapporto: 1220 / 583, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-92", file: path("/risorse-condivise/immagini/figure/gestalt/20-api-bio-schede-delle-persone.png"),
  didascalia: [Dettaglio: la struttura ripetuta suggerisce che le schede appartengano alla stessa famiglia.],
  diritti: [Api&Bio · screenshot storico. Autori non indicati nella fonte.], alt: "Dettaglio: la struttura ripetuta suggerisce che le schede appartengano alla stessa famiglia.",
  rapporto: 410 / 583, colonne: 2,
)



// Fonte 3897:2148 · C03 · 161 · DX — Somiglianza: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-93", file: path("/risorse-condivise/immagini/figure/gestalt/21-somiglianza-altri-screenshot-reali.png"),
  didascalia: [Trello: le schede ripetono immagine, titolo e descrizione.#sito([Templates | Trello · screenshot del 15 ottobre 2026. Diritti dei.], "https://trello.com/templates")],
  diritti: [Templates | Trello · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Trello: le schede ripetono immagine, titolo e descrizione.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-94", file: path("/risorse-condivise/immagini/figure/gestalt/22-somiglianza-altri-screenshot-reali.png"),
  didascalia: [Amazon: titoli, riquadri e immagini ripetono formati coerenti.],
  diritti: [Diritti dei rispettivi titolari.], alt: "Amazon: titoli, riquadri e immagini ripetono formati coerenti.",
  rapporto: 1360 / 625, colonne: 2,
)


]
#[
#import "../template/stile.typ": sito, immagine


// Fonte 3721:2282 · C03 · 162 · SX — Destino comune (common fate)
== Destino comune (common fate)

Elementi che si muovono o cambiano in modo concorde tendono a essere percepiti come appartenenti allo stesso gruppo nel tempo.

#figura-nel-testo(
  id: "fig-gestalt-95", file: path("/risorse-condivise/immagini/figure/gestalt/23-destino-comune-common-fate.svg"),
  didascalia: [Tre istanti della stessa configurazione: alcuni punti si spostano insieme, conservando le distanze interne; gli altri restano fermi. La sequenza rende osservabile il cambiamento concorde.],
  diritti: none, alt: "Tre istanti della stessa configurazione: alcuni punti si spostano insieme, conservando le distanze interne; gli altri restano fermi. La sequenza rende osservabile il cambiamento concorde.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:2236 · C03 · 163 · DX — Destino comune: come funziona
=== Destino comune: come funziona

Il destino comune riguarda il comportamento degli elementi nel tempo. Se alcuni punti si spostano insieme mentre altri restano fermi, quelli in movimento tendono a essere percepiti come un gruppo. Anche elementi inizialmente mescolati possono apparire collegati quando condividono una trasformazione. La relazione emerge dal confronto fra stati successivi, non soltanto dalla loro disposizione in un’immagine statica.

Direzione, velocità e contemporaneità contribuiscono a rendere concorde il cambiamento. Un movimento solidale può conservare le distanze interne del gruppo mentre ne modifica la posizione rispetto agli elementi circostanti. Somiglianza e vicinanza possono rafforzare la relazione, ma non sostituiscono l’osservazione temporale. Un insieme di frecce parallele rappresenta una direzione possibile; non mostra, da solo, che gli elementi si stiano effettivamente muovendo insieme.

In una pagina stampata il fenomeno può essere documentato attraverso una sequenza di fotogrammi, con ordine di lettura e intervalli temporali dichiarati. Per confrontare gli stati occorre poter riconoscere gli stessi elementi in ogni fotogramma. Fotografie di stormi o persone in cammino possono suggerire un’azione comune, ma registrano soltanto un istante: sono indizi visivi da distinguere da una dimostrazione del movimento condiviso (@fig-gestalt-95–#ref(<fig-gestalt-104>, supplement: none)).

 @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")



// Fonte 198:4261 · C03 · 164 · SX — Destino comune nel web
=== Destino comune nel web

Nel web, il movimento condiviso può rendere riconoscibile una relazione durante una transizione. Un pannello e le sue voci possono aprirsi insieme; in un carousel, immagine, titolo e didascalia possono spostarsi mantenendo le proprie posizioni reciproche.

I tre screenshot mostrano stati reali del carousel Bootstrap. La documentazione descrive la transizione animata fra le slide; le immagini statiche ne documentano gli stati, ma non dimostrano direzione, velocità o simultaneità del movimento. Per osservare il destino comune occorre riprodurre la transizione. I contenuti devono restare comprensibili anche con le animazioni ridotte.

#figura-nel-testo(
  id: "fig-gestalt-96", file: path("/risorse-condivise/immagini/figure/gestalt/24-destino-comune-nel-web.svg"),
  didascalia: [Bootstrap: tre stati reali dello stesso carousel, in ordine di acquisizione. Per osservare il movimento condiviso occorre vedere la transizione animata.#sito([Bootstrap 5.3, Carousel with captions · 14 ottobre 2026. Documentazione CC.], "https://getbootstrap.com/docs/5.3/components/carousel/")],
  diritti: [Bootstrap 5.3, Carousel with captions · 14 ottobre 2026. Documentazione CC BY 3.0; codice MIT.], alt: "Bootstrap: tre stati reali dello stesso carousel, in ordine di acquisizione. Per osservare il movimento condiviso occorre vedere la transizione animata.",
  rapporto: 363.0 / 233.05517578125, colonne: 2,
)



// Fonte 3864:2073 · C03 · 165 · DX — Destino comune: logo reale
=== Destino comune: il logo Google Dots

Nel segmento “Thinking” i quattro punti ruotano nello stesso senso attorno a un centro comune, mantenendo quasi costanti distanze e configurazione. Il cambiamento coordinato li fa leggere come un unico gruppo in movimento. È una rotazione comune, non una traslazione con vettori paralleli. I fotogrammi documentano la sequenza; per osservare il movimento occorre aprire il filmato originale.

#figura-nel-testo(
  id: "fig-gestalt-97", file: path("/risorse-condivise/immagini/figure/gestalt/25-destino-comune-logo-reale.svg"),
  didascalia: [Google Dots, stato Thinking: viste complete e dettagli della stessa rotazione comune, a 6,5000 s; 6,6167 s; 6,7667 s.#sito([Google, Evolving the Google Identity, 2015. Fotogrammi dall’animazione.], "https://design.google/library/evolving-google-identity")],
  diritti: [Google, Evolving the Google Identity, 2015. Fotogrammi dall’animazione ufficiale Google Dots.], alt: "Google Dots, stato Thinking: viste complete e dettagli della stessa rotazione comune, a 6,5000 s; 6,6167 s; 6,7667 s.",
  rapporto: 363 / 199.880859375, colonne: 2,
)



// Fonte 3863:2058 · C03 · 166 · SX — Destino comune: fotografia
#figura-nel-testo(
  id: "fig-gestalt-98", file: path("/risorse-condivise/immagini/figure/gestalt/26-destino-comune-fotografia.png"),
  didascalia: [Posture e orientamento delle biciclette suggeriscono una direzione condivisa nel peloton. La fotografia fissa richiama il destino comune; per osservarlo direttamente serve una sequenza in movimento.#sito([_Spielvogel_ · CC0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:2014-07-16_Etape_11_du_Tour_de_France._Peloton_5._Free_image_Spielvogel._No_copyright.jpg")],
  diritti: [Spielvogel · CC0 · Wikimedia Commons], alt: "Posture e orientamento delle biciclette suggeriscono una direzione condivisa nel peloton. La fotografia fissa richiama il destino comune; per osservarlo direttamente serve una sequenza in movimento.",
  rapporto: 1600 / 1067, colonne: 1,
)



// Fonte 3897:2169 · C03 · 167 · DX — Destino comune: altre immagini e grafiche
#figura-nel-testo(
  id: "fig-gestalt-99", file: path("/risorse-condivise/immagini/figure/gestalt/27-destino-comune-altre-immagini-e-grafiche.png"),
  didascalia: [Turkish Airlines: lo stormo suggerisce una direzione condivisa. La pubblicità statica non documenta il movimento.],
  diritti: [Turkish Airlines, campagna pubblicitaria · autore non indicato.], alt: "Turkish Airlines: lo stormo suggerisce una direzione condivisa. La pubblicità statica non documenta il movimento.",
  rapporto: 1600 / 1132, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-100", file: path("/risorse-condivise/immagini/figure/gestalt/28-destino-comune-altre-immagini-e-grafiche.png"),
  didascalia: [Dettaglio dello stormo: orientamento e disposizione suggeriscono un insieme.],
  diritti: [Turkish Airlines, campagna pubblicitaria · autore non indicato.], alt: "Dettaglio dello stormo: orientamento e disposizione suggeriscono un insieme.",
  rapporto: 1000 / 333, colonne: 1,
)



// Fonte 3804:2047 · C03 · 168 · SX — Bootstrap: il contenuto scorre come un’unità
#figura-nel-testo(
  id: "fig-gestalt-101", file: path("/risorse-condivise/immagini/figure/gestalt/29-bootstrap-il-contenuto-scorre-come-un-unit.png"),
  didascalia: [Carousel Bootstrap: immagine, titolo e testo appartengono alla stessa slide.],
  diritti: [Bootstrap 5.3, Carousel with captions. Tre stati acquisiti il 14 ottobre 2026. Documentazione CC BY 3.0; codice MIT.], alt: "Carousel Bootstrap: immagine, titolo e testo appartengono alla stessa slide.",
  rapporto: 1280 / 720, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-102", file: path("/risorse-condivise/immagini/figure/gestalt/30-bootstrap-il-contenuto-scorre-come-un-unit.svg"),
  didascalia: [Durante la transizione, immagine e didascalia scorrono insieme; i controlli restano fermi.],
  diritti: [Bootstrap 5.3, Carousel with captions. Tre stati acquisiti il 14 ottobre 2026. Documentazione CC BY 3.0; codice MIT.], alt: "Durante la transizione, immagine e didascalia scorrono insieme; i controlli restano fermi.",
  rapporto: 419.9999237060547 / 92.99267578125, colonne: 2,
)



// Fonte 3897:2187 · C03 · 169 · DX — Destino comune: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-103", file: path("/risorse-condivise/immagini/figure/gestalt/31-destino-comune-altri-screenshot-reali.png"),
  didascalia: [Swiper: uno stato reale della traccia durante lo stesso trascinamento.#sito([Swiper demo · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], "https://swiperjs.com/demos/110-slides-per-view/core")<nota-fonti-fig-gestalt-103>],
  diritti: [Swiper demo · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Swiper: uno stato reale della traccia durante lo stesso trascinamento.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-104", file: path("/risorse-condivise/immagini/figure/gestalt/32-destino-comune-altri-screenshot-reali.svg"),
  didascalia: [Dettagli di tre istanti consecutivi: la traccia avanza di 100 px fra gli screenshot; le distanze reciproche restano costanti.#sito([Swiper demo · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], "https://swiperjs.com/demos/110-slides-per-view/core")],
  diritti: [Swiper demo · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Dettagli di tre istanti consecutivi: la traccia avanza di 100 px fra gli screenshot; le distanze reciproche restano costanti.",
  rapporto: 420.0 / 214.0, colonne: 2,
)



// Fonte 3721:2432 · C03 · 170 · SX — Buona continuazione (good continuation)
== Buona continuazione (good continuation)

Contorni allineati o che proseguono senza bruschi cambi di direzione tendono a essere percepiti come parti dello stesso percorso visivo.

#figura-nel-testo(
  id: "fig-gestalt-105", file: path("/risorse-condivise/immagini/figure/gestalt/33-buona-continuazione-good-continuation.svg"),
  didascalia: [Due percorsi di punti si incrociano. La direzione regolare favorisce la lettura di due andamenti continui, invece di frammenti che cambiano bruscamente direzione.],
  diritti: none, alt: "Due percorsi di punti si incrociano. La direzione regolare favorisce la lettura di due andamenti continui, invece di frammenti che cambiano bruscamente direzione.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:21248 · C03 · 171 · DX — Buona continuazione: come funziona
=== Buona continuazione: come funziona

La buona continuazione descrive la tendenza a organizzare contorni e allineamenti secondo percorsi regolari. Quando due linee si incrociano, tendiamo a seguire ciascuna lungo la direzione che richiede il cambiamento più graduale. La stessa configurazione può essere letta come due percorsi continui, invece che come frammenti che si incontrano e cambiano bruscamente direzione nel punto di intersezione.

Il principio non richiede che ogni tratto sia materialmente collegato. Una successione di punti può suggerire un andamento lineare o curvo se la loro disposizione mantiene una direzione riconoscibile. Interruzioni moderate non eliminano necessariamente il percorso percepito. Spostare alcuni punti o introdurre una svolta improvvisa può invece modificare la lettura, soprattutto quando diventa disponibile un altro andamento più regolare e plausibile.

La buona continuazione va distinta dalla semplice connessione: una linea che collega due oggetti può raggrupparli anche senza costruire un percorso regolare. Va inoltre distinta dall’affermazione che gli occhi seguano sempre una traiettoria prestabilita. Nel progetto grafico, allineamenti e sequenze possono suggerire un ordine di lettura; il percorso effettivo dipende anche dal compito, dall’attenzione e dagli altri segnali presenti nella composizione (@fig-gestalt-105–#ref(<fig-gestalt-112>, supplement: none)).

 @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")



// Fonte 198:4273 · C03 · 172 · SX — Buona continuazione nel web
=== Buona continuazione nel web

Nel web, allineamenti e percorsi regolari possono suggerire la prosecuzione di una serie e sostenere l’ordine delle informazioni. Un tracciato curvo può attraversare più aree mantenendo una direzione riconoscibile, anche quando testi e immagini cambiano posizione.

Nel progetto Api&Bio, il percorso puntinato prosegue fra le illustrazioni. La continuità del tratto mette in relazione parti distanti della composizione. Lo screenshot documenta una soluzione storica del progetto, non il suo funzionamento attuale. Il percorso visivo suggerito non dimostra da solo l’ordine effettivo di lettura degli utenti.

#figura-nel-testo(
  id: "fig-gestalt-106", file: path("/risorse-condivise/immagini/figure/gestalt/34-buona-continuazione-nel-web.png"),
  didascalia: [Api&Bio, dettaglio dello screenshot storico: il tracciato curvo prosegue fra le illustrazioni. La vista completa è nella @fig-gestalt-110.],
  diritti: [Api&Bio · screenshot storico. Autori non indicati nella fonte.], alt: "Api&Bio, dettaglio dello screenshot storico: il tracciato curvo prosegue fra le illustrazioni. La vista completa è nella figura collegata.",
  rapporto: 664 / 384, colonne: 2,
)



// Fonte 3864:2114 · C03 · 173 · DX — Buona continuazione: logo reale
=== Buona continuazione: il logo Coca-Cola

Le curve e i raccordi della scrittura suggeriscono percorsi fluidi fra lettere e prolungamenti, anche nei punti più intrecciati. La buona continuazione contribuisce alla coesione del logotipo insieme alla familiarità con la parola. È una lettura della forma grafica: non descrive un percorso dello sguardo misurato.

#figura-nel-testo(
  id: "fig-gestalt-107", file: path("/risorse-condivise/immagini/figure/gestalt/35-buona-continuazione-logo-reale.png"),
  didascalia: [Coca-Cola: curve e raccordi suggeriscono percorsi continui nel logotipo.#sito([Marchio Coca-Cola. Logotipo storico ideato da _Frank M. Robinson_. Fonte.], "https://www.coca-colacompany.com/about-us/history/coke-lore-trademark-chronology")],
  diritti: [Marchio Coca-Cola. Logotipo storico ideato da Frank M. Robinson. Fonte immagine: sito ufficiale Coca-Cola US.], alt: "Coca-Cola: curve e raccordi suggeriscono percorsi continui nel logotipo.",
  rapporto: 573 / 180, colonne: 1,
)



// Fonte 3863:2078 · C03 · 174 · SX — Buona continuazione: fotografia
#figura-nel-testo(
  id: "fig-gestalt-108", file: path("/risorse-condivise/immagini/figure/gestalt/36-buona-continuazione-fotografia.png"),
  didascalia: [Le linee della carreggiata accompagnano lo sguardo lungo la curva: i tratti successivi si leggono come un percorso continuo che prosegue in profondità. #sito([_Captain76_ · Public domain · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Winding_road.jpg")],
  diritti: [Captain76 · Public domain · Wikimedia Commons], alt: "Le linee della carreggiata accompagnano lo sguardo lungo la curva: i tratti successivi si leggono come un percorso continuo che prosegue in profondità.",
  rapporto: 1062 / 1600, colonne: 1,
)



// Fonte 3897:2217 · C03 · 175 · DX — Buona continuazione: altre immagini e grafiche
#figura-al-vivo(
  id: "fig-gestalt-109", file: path("/risorse-condivise/immagini/figure/gestalt/37-buona-continuazione-altre-immagini-e-grafiche.png"),
  didascalia: [MINI: il cavo prosegue in curve regolari e richiama una strada.], diritti: [MINI, «While others play playlist. The MINI is its own soundtrack.» · autore non indicato.], alt: "MINI: il cavo prosegue in curve regolari e richiama una strada.",
  rapporto: 850 / 1202,
)



// Fonte 3804:2065 · C03 · 176 · SX — Api&Bio: un percorso fra le sezioni
#figura-nel-testo(
  id: "fig-gestalt-110", file: path("/risorse-condivise/immagini/figure/gestalt/38-api-bio-un-percorso-fra-le-sezioni.png"),
  didascalia: [Api&Bio: un tracciato curvo attraversa le sezioni e suggerisce un percorso continuo fra testi e illustrazioni.],
  diritti: [Api&Bio · screenshot storico. Autori non indicati nella fonte.], alt: "Api&Bio: un tracciato curvo attraversa le sezioni e suggerisce un percorso continuo fra testi e illustrazioni.",
  rapporto: 664 / 870, colonne: 1,
)



// Fonte 3897:2235 · C03 · 177 · DX — Buona continuazione: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-111", file: path("/risorse-condivise/immagini/figure/gestalt/39-buona-continuazione-altri-screenshot-reali.png"),
  didascalia: [USWDS: segmenti e tappe proseguono sullo stesso asse.#sito([Step indicator | U.S. Web Design System (USWDS) · screenshot del 15.], "https://designsystem.digital.gov/components/step-indicator/")],
  diritti: [Step indicator | U.S. Web Design System (USWDS) · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "USWDS: segmenti e tappe proseguono sullo stesso asse.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-112", file: path("/risorse-condivise/immagini/figure/gestalt/40-buona-continuazione-altri-screenshot-reali.png"),
  didascalia: [Burger King: le promozioni proseguono lungo una stessa direzione.],
  diritti: [Diritti dei rispettivi titolari.], alt: "Burger King: le promozioni proseguono lungo una stessa direzione.",
  rapporto: 1385 / 635, colonne: 2,
)


]
#[
#import "../template/stile.typ": sito, immagine


// Fonte 3721:2461 · C03 · 178 · SX — Chiusura (closure)
== Chiusura (closure)

Elementi disposti lungo un contorno chiuso o quasi chiuso tendono a essere organizzati come una figura unitaria, anche con interruzioni.

#figura-nel-testo(
  id: "fig-gestalt-113", file: path("/risorse-condivise/immagini/figure/gestalt/41-chiusura-closure.svg"),
  didascalia: [Punti separati suggeriscono un cerchio e un quadrato. Le interruzioni lasciano riconoscibile il contorno complessivo, pur senza disegnarlo interamente.],
  diritti: none, alt: "Punti separati suggeriscono un cerchio e un quadrato. Le interruzioni lasciano riconoscibile il contorno complessivo, pur senza disegnarlo interamente.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:21343 · C03 · 179 · DX — Chiusura: come funziona
=== Chiusura: come funziona

La chiusura favorisce l’organizzazione di elementi che delimitano un’area o suggeriscono un contorno quasi completo. Archi separati, per esempio, possono apparire come parti di un cerchio anziché come frammenti indipendenti. La relazione dipende dalla disposizione dei tratti: spostarli o ruotarli può indebolire la figura d’insieme, anche quando numero, dimensione e forma dei singoli elementi restano invariati.

Percepire una figura unitaria non significa necessariamente vedere tutti i bordi mancanti. Nella configurazione di _Kanizsa_, alcuni elementi induttori possono far apparire un triangolo con margini non disegnati: si parla di contorni illusori e di completamento modale. Se invece una superficie copre parte di un oggetto e lo percepiamo come continuo dietro l’ostacolo, il completamento è amodale: la parte nascosta non appare direttamente visibile.

Questi fenomeni sono collegati all’organizzazione delle forme, ma non sono sinonimi. Per spiegare un esempio, chiediti se i frammenti delimitano un insieme, se compaiono margini illusori o se una parte viene interpretata come nascosta. Nel caso dei punti disposti in cerchio, lo schema mostra un contorno suggerito dalla disposizione. Il risultato non autorizza ad attribuire alla chiusura ogni immagine incompleta o ogni oggetto facilmente riconoscibile (@fig-gestalt-113–#ref(<fig-gestalt-121>, supplement: none)).

 @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")



// Fonte 198:4285 · C03 · 180 · SX — Chiusura nel web
=== Chiusura nel web

Nel web, icone e indicatori possono restare riconoscibili anche quando il contorno è interrotto. La disposizione dei tratti suggerisce una forma complessiva: un arco sufficientemente esteso può richiamare un anello.

Lo screenshot reale della documentazione Bootstrap mostra uno spinner dal contorno aperto. Il completamento percettivo sostiene il riconoscimento della forma circolare; la funzione di caricamento dipende anche dalla convenzione appresa e dall’animazione descritta nella fonte. Lo screenshot documenta la forma, mentre la rotazione va osservata nell’esempio funzionante. Forma e messaggio accessibile devono comunicare insieme lo stato dell’interfaccia.

#figura-nel-testo(
  id: "fig-gestalt-114", file: path("/risorse-condivise/immagini/figure/gestalt/42-chiusura-nel-web.png"),
  didascalia: [Bootstrap, dettaglio reale dello spinner: l’arco aperto suggerisce un anello. La @fig-gestalt-119 mostra una vista completa della stessa documentazione.#sito([Bootstrap 5.3, Spinners · screenshot del 15 ottobre 2026, DPR 3..], "https://getbootstrap.com/docs/5.3/components/spinners/")],
  diritti: [Bootstrap 5.3, Spinners · screenshot del 15 ottobre 2026, DPR 3. Documentazione CC BY 3.0; codice MIT.], alt: "Bootstrap, dettaglio reale dello spinner: l’arco aperto suggerisce un anello. La la figura collegata mostra una vista completa della stessa documentazione.",
  rapporto: 690 / 255, colonne: 1,
)



// Fonte 3864:2142 · C03 · 181 · DX — Chiusura: logo reale
=== Chiusura: il logo WWF

Orecchie, occhi e zampe bastano a suggerire un panda. Il bianco della testa e del corpo non è delimitato ovunque da una linea: la percezione completa i contorni mancanti e ricostruisce una figura unitaria. Anche la conoscenza dell’animale contribuisce al riconoscimento.

#figura-nel-testo(
  id: "fig-gestalt-115", file: path("/risorse-condivise/immagini/figure/gestalt/43-chiusura-logo-reale.svg"),
  didascalia: [WWF: il panda si completa oltre i tratti effettivamente disegnati.#sito([WWF® e ©1986 Panda Symbol sono di proprietà di WWF. Tutti i diritti riservati.], "https://www.worldwildlife.org/about/history-of-wwfs-panda-logo/")],
  diritti: [WWF® e ©1986 Panda Symbol sono di proprietà di WWF. Tutti i diritti riservati.], alt: "WWF: il panda si completa oltre i tratti effettivamente disegnati.",
  rapporto: 584.0 / 877.0, colonne: 1, altezza: 146.5pt * 877 / 584,
)



// Fonte 3863:2098 · C03 · 182 · SX — Chiusura: fotografia
#figura-nel-testo(
  id: "fig-gestalt-116", file: path("/risorse-condivise/immagini/figure/gestalt/44-chiusura-fotografia.png"),
  didascalia: [La rete interrompe porzioni del gatto, che viene comunque percepito come un unico animale. È un completamento amodale dietro un ostacolo, affine alla chiusura di contorni incompleti.#sito([_Syrio_ · CC BY-SA 4.0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Scared_cat_behind_a_wire_fence.jpg")],
  diritti: [Syrio · CC BY-SA 4.0 · Wikimedia Commons], alt: "La rete interrompe porzioni del gatto, che viene comunque percepito come un unico animale. È un completamento amodale dietro un ostacolo, affine alla chiusura di contorni incompleti.",
  rapporto: 1600 / 1200, colonne: 1,
)



// Fonte 3897:2256 · C03 · 183 · DX — Chiusura: Sea & Vines
#figura-al-vivo(
  id: "fig-gestalt-117", file: path("/risorse-condivise/immagini/figure/gestalt/45-chiusura-sea-vines.png"),
  didascalia: [Sea & Vines: le forchette suggeriscono il profilo di un calice incompleto.], diritti: [Sea & Vines Food & Wine Festival, 2012. Autore non indicato.], alt: "Sea & Vines: le forchette suggeriscono il profilo di un calice incompleto.",
  rapporto: 1125 / 1590,
)



// Fonte 3919:2088 · C03 · 184 · SX — Chiusura: Heinz
#figura-al-vivo(
  id: "fig-gestalt-118", file: path("/risorse-condivise/immagini/figure/gestalt/46-chiusura-heinz.png"),
  didascalia: [Heinz: fette, collo ed etichetta suggeriscono una bottiglia dal contorno irregolare.],
  diritti: [Heinz, pubblicità. Autore non indicato; rispettivi diritti.], alt: "Heinz: fette, collo ed etichetta suggeriscono una bottiglia dal contorno irregolare.",
  rapporto: 291 / 398,
)



// Fonte 3804:2072 · C03 · 185 · DX — Loader: contorni aperti nel web
#figura-nel-testo(
  id: "fig-gestalt-119", file: path("/risorse-condivise/immagini/figure/gestalt/47-loader-contorni-aperti-nel-web.png"),
  didascalia: [Bootstrap: lo spinner suggerisce un anello con un contorno aperto. La rotazione e la convenzione appresa ne comunicano la funzione di caricamento.#sito([Bootstrap 5.3, Spinners · screenshot del 14 ottobre 2026. Documentazione.], "https://getbootstrap.com/docs/5.3/components/spinners/")],
  diritti: [Bootstrap 5.3, Spinners · screenshot del 14 ottobre 2026. Documentazione CC BY 3.0; codice MIT.], alt: "Bootstrap: lo spinner suggerisce un anello con un contorno aperto. La rotazione e la convenzione appresa ne comunicano la funzione di caricamento.",
  rapporto: 1280 / 720, colonne: 2,
)



// Fonte 3897:2277 · C03 · 186 · SX — Chiusura: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-120", file: path("/risorse-condivise/immagini/figure/gestalt/48-chiusura-altri-screenshot-reali.png"),
  didascalia: [Carbon: un arco incompleto suggerisce un anello.#sito([Loading | Carbon Design System · screenshot del 15 ottobre 2026. Diritti.], "https://www.carbondesignsystem.com/building-blocks/core/components/loading/guidelines")<nota-fonti-fig-gestalt-120>],
  diritti: [Loading | Carbon Design System · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Carbon: un arco incompleto suggerisce un anello.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-121", file: path("/risorse-condivise/immagini/figure/gestalt/49-chiusura-altri-screenshot-reali.png"),
  didascalia: [Dettaglio dello stesso fotogramma: il contorno interrotto resta riconoscibile.#sito([Loading | Carbon Design System · screenshot del 15 ottobre 2026. Diritti.], "https://www.carbondesignsystem.com/building-blocks/core/components/loading/guidelines")],
  diritti: [Loading | Carbon Design System · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Dettaglio dello stesso fotogramma: il contorno interrotto resta riconoscibile.",
  rapporto: 414 / 414, colonne: 1,
)



// Fonte 3721:2472 · C03 · 187 · DX — Simmetria (symmetry)
== Simmetria (symmetry)

Elementi disposti in modo speculare rispetto a un asse tendono a essere percepiti come parti correlate di una stessa configurazione visiva.

#figura-nel-testo(
  id: "fig-gestalt-122", file: path("/risorse-condivise/immagini/figure/gestalt/50-simmetria-symmetry.svg"),
  didascalia: [Le coppie di punti corrispondono rispetto all’asse verticale. Nel confronto, gli stessi elementi perdono la disposizione speculare: simmetria e numero degli elementi sono variabili distinte.],
  diritti: none, alt: "Le coppie di punti corrispondono rispetto all’asse verticale. Nel confronto, gli stessi elementi perdono la disposizione speculare: simmetria e numero degli elementi sono variabili distinte.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:21422 · C03 · 188 · SX — Simmetria: come funziona
=== Simmetria: come funziona

La simmetria è una relazione geometrica fra parti della configurazione. Nella simmetria bilaterale, i punti di una metà trovano corrispondenza nell’altra rispetto a un asse. Questa regolarità può favorire il riconoscimento di un insieme: due contorni speculari possono apparire come i lati di una stessa figura, anche quando fra loro rimane uno spazio privo di segni.

Il contributo della simmetria dipende dalla disposizione complessiva e dagli altri fattori di organizzazione. Nel confronto a punti, è utile mantenere numero, dimensione e densità simili, modificando soltanto le corrispondenze rispetto all’asse. Un piccolo spostamento può rendere visibile la perdita di regolarità; il risultato non implica che ogni composizione asimmetrica sia difficile da comprendere o che ogni insieme simmetrico venga riconosciuto immediatamente.

Simmetria ed equilibrio visivo non coincidono. Due aree possono bilanciarsi per dimensione, contrasto o posizione senza essere speculari. Anche un layout centrato non è necessariamente simmetrico nei suoi contenuti. Nella tradizione della Gestalt, la simmetria è considerata un fattore di organizzazione e di buona forma; nelle applicazioni progettuali occorre precisare quale corrispondenza geometrica è effettivamente presente, evitando di chiamare simmetrica qualsiasi composizione ordinata (@fig-gestalt-122–#ref(<fig-gestalt-131>, supplement: none)).

 @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")



// Fonte 198:4297 · C03 · 189 · DX — Simmetria nel web
=== Simmetria nel web

Nel web, posizioni corrispondenti ai due lati di un asse possono suggerire una composizione unitaria. Un elemento centrale e due gruppi laterali possono mettere in relazione contenuti differenti senza renderli identici.

Nella pagina iniziale di Wikipedia, il globo occupa il centro e i collegamenti alle lingue si distribuiscono ai suoi lati. La corrispondenza riguarda soprattutto le posizioni: testi e lunghezze sono diversi, quindi la simmetria non è perfetta. Quando il layout cambia, va verificato come si trasformano l’asse e le relazioni fra gli elementi, senza sacrificare lettura e gerarchia.

#figura-nel-testo(
  id: "fig-gestalt-123", file: path("/risorse-condivise/immagini/figure/gestalt/51-simmetria-nel-web.png"),
  didascalia: [Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale. Si corrispondono le posizioni, mentre i testi sono differenti.#sito([Wikipedia · screenshot del 14 ottobre 2026. © Wikimedia Foundation e.], "https://www.wikipedia.org/")],
  diritti: [Wikipedia · screenshot del 14 ottobre 2026. © Wikimedia Foundation e rispettivi titolari.], alt: "Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale. Si corrispondono le posizioni, mentre i testi sono differenti.",
  rapporto: 1280 / 720, colonne: 2,
)



// Fonte 3864:2169 · C03 · 190 · SX — Simmetria: logo reale
=== Simmetria: il logo Volkswagen

Le lettere V e W e il cerchio condividono un asse verticale. La corrispondenza fra lato destro e sinistro dà stabilità alla figura e aiuta a percepirla come un insieme ordinato. La simmetria riguarda la struttura dell’emblema, non la presenza di elementi identici affiancati.

#figura-nel-testo(
  id: "fig-gestalt-124", file: path("/risorse-condivise/immagini/figure/gestalt/52-simmetria-logo-reale.png"),
  didascalia: [Volkswagen, 2019: un asse verticale organizza l’emblema.#sito([© Volkswagen AG. Volkswagen unveils new brand design and logo,.], "https://www.volkswagen-newsroom.com/en/images/detail/volkswagen-unveils-new-brand-design-and-logo-30063")],
  diritti: [© Volkswagen AG. Volkswagen unveils new brand design and logo, DB2019AL01916, 2019.], alt: "Volkswagen, 2019: un asse verticale organizza l’emblema.",
  rapporto: 1600 / 900, colonne: 1,
)



// Fonte 3863:2118 · C03 · 191 · DX — Simmetria: fotografia
#figura-nel-testo(
  id: "fig-gestalt-125", file: path("/risorse-condivise/immagini/figure/gestalt/53-simmetria-fotografia.png"),
  didascalia: [L’asse centrale riunisce cupola, facciata e minareti in un insieme bilanciato; le corrispondenze fra destra e sinistra rafforzano la lettura unitaria dell’edificio.#sito([_Nelson C Simon_ · CC BY-SA 4.0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Reflection_of_the_Taj_Mahal.jpg")],
  diritti: [Nelson C Simon · CC BY-SA 4.0 · Wikimedia Commons], alt: "L’asse centrale riunisce cupola, facciata e minareti in un insieme bilanciato; le corrispondenze fra destra e sinistra rafforzano la lettura unitaria dell’edificio.",
  rapporto: 1600 / 1067, colonne: 1,
)



// Fonte 3897:2295 · C03 · 192 · SX — Simmetria: altre immagini e grafiche
#figura-nel-testo(
  id: "fig-gestalt-126", file: path("/risorse-condivise/immagini/figure/gestalt/54-simmetria-altre-immagini-e-grafiche.png"),
  didascalia: [HSBC: le forme dell’emblema si corrispondono rispetto agli assi verticale e orizzontale.],
  diritti: [HSBC · autore del marchio non indicato nella fonte.], alt: "HSBC: le forme dell’emblema si corrispondono rispetto agli assi verticale e orizzontale.",
  rapporto: 337 / 290, colonne: 1,
)



// Fonte 3692:2376 · C03 · 193 · DX — Adham Dannaway: volto e metà
#figura-nel-testo(
  id: "fig-gestalt-127", file: path("/risorse-condivise/immagini/figure/gestalt/55-adham-dannaway-volto-e-met.png"),
  didascalia: [_Adham Dannaway_: due metà differenti compongono un volto intorno a un asse centrale.#sito([© _Adham Dannaway_ · portfolio, immagine.], "https://www.adhamdannaway.com/")<nota-fonti-fig-gestalt-127>],
  diritti: [© Adham Dannaway · portfolio, immagine.], alt: "Adham Dannaway: due metà differenti compongono un volto intorno a un asse centrale.",
  rapporto: 1843 / 692, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-128", file: path("/risorse-condivise/immagini/figure/gestalt/56-adham-dannaway-volto-e-met.png"),
  didascalia: [Dettaglio della stessa immagine: i tratti del volto trovano corrispondenza ai due lati; i contenuti delle metà sono differenti.#sito([© _Adham Dannaway_ · portfolio, immagine.], "https://www.adhamdannaway.com/")],
  diritti: [© Adham Dannaway · portfolio, immagine.], alt: "Dettaglio della stessa immagine: i tratti del volto trovano corrispondenza ai due lati; i contenuti delle metà sono differenti.",
  rapporto: 405 / 600, colonne: 1,
)



// Fonte 3804:2087 · C03 · 194 · SX — Wikipedia: lingue attorno a un asse
#figura-nel-testo(
  id: "fig-gestalt-129", file: path("/risorse-condivise/immagini/figure/gestalt/57-wikipedia-lingue-attorno-a-un-asse.png"),
  didascalia: [Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale.],
  diritti: [Wikipedia, pagina iniziale italiana. Screenshot del 14 ottobre 2026. © Wikimedia Foundation e rispettivi titolari.], alt: "Wikipedia: il globo centrale e le lingue si organizzano attorno a un asse verticale.",
  rapporto: 1280 / 720, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-130", file: path("/risorse-condivise/immagini/figure/gestalt/58-wikipedia-lingue-attorno-a-un-asse.png"),
  didascalia: [Dettaglio: le posizioni si corrispondono ai due lati, mentre testi e lingue sono differenti.],
  diritti: [Wikipedia, pagina iniziale italiana. Screenshot del 14 ottobre 2026. © Wikimedia Foundation e rispettivi titolari.], alt: "Dettaglio: le posizioni si corrispondono ai due lati, mentre testi e lingue sono differenti.",
  rapporto: 555 / 545, colonne: 2,
)



// Fonte 3897:2313 · C03 · 195 · DX — Simmetria: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-131", file: path("/risorse-condivise/immagini/figure/gestalt/59-simmetria-altri-screenshot-reali.png"),
  didascalia: [OBS: controlli uguali e centri equidistanti; i simboli sono differenti.#sito([Download | OBS · screenshot del 15 ottobre 2026. Diritti dei rispettivi.], "https://obsproject.com/download")],
  diritti: [Download | OBS · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "OBS: controlli uguali e centri equidistanti; i simboli sono differenti.",
  rapporto: 3840 / 2160, colonne: 2,
)


]
#[
#import "../template/stile.typ": sito, immagine


// Fonte 3721:2523 · C03 · 196 · SX — Figura e sfondo (figure–ground)
== Figura e sfondo (figure–ground)

Nell’organizzare una scena distinguiamo figure e sfondo: i contorni possono appartenere a una forma oppure rendere riconoscibile lo spazio che la circonda.

#figura-nel-testo(
  id: "fig-gestalt-132", file: path("/risorse-condivise/immagini/figure/gestalt/60-figura-e-sfondo-figure-ground.svg"),
  didascalia: [Lo stesso contorno separa un vaso centrale da due profili laterali. Invertire i colori aiuta a esplorare le possibili letture di figura e sfondo.],
  diritti: none, alt: "Lo stesso contorno separa un vaso centrale da due profili laterali. Invertire i colori aiuta a esplorare le possibili letture di figura e sfondo.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:21569 · C03 · 197 · DX — Figura e sfondo: come funziona
=== Figura e sfondo: come funziona

L’organizzazione figura–sfondo riguarda il modo in cui attribuiamo forme e contorni alle parti della scena. Una regione può essere percepita come figura definita, mentre l’altra appare come sfondo che prosegue dietro di essa. Il margine condiviso tende ad appartenere alla figura: non è quindi soltanto una differenza di colore, ma una diversa organizzazione della superficie visiva.

Alcune configurazioni permettono letture alternative. Nel vaso di _Rubin_, il contorno può definire un vaso centrale oppure due profili laterali. Cambiando ciò che viene percepito come figura, cambia anche il significato attribuito agli stessi margini. Le letture possono alternarsi; non occorre affermare che tutte le persone le vedano con uguale facilità o che possano mantenere entrambe stabili nello stesso momento.

Contrasto, dimensione relativa, contorni e contesto contribuiscono alla distinzione, ma nessun singolo segnale spiega ogni esempio. Lo spazio negativo di un marchio può diventare una forma riconoscibile quando il progetto ne definisce con precisione i margini. Per descrivere lo schema, indica quale area viene letta come figura e quale come sfondo; poi osserva se il rapporto può invertirsi. Evita di identificare automaticamente lo sfondo con il bianco e la figura con il colore più scuro (@fig-gestalt-132–#ref(<fig-gestalt-140>, supplement: none)).

 @gestalt-rubin1915#sito([_Rubin_ (1915).], "https://www.kb.dk/e-mat/dod/111408024790-bw.pdf")



// Fonte 198:4321 · C03 · 198 · SX — Figura e sfondo nel web
=== Figura e sfondo nel web

Nel web, contrasto, nitidezza e sovrapposizione possono distinguere il contenuto in primo piano dal contesto circostante. Una superficie che emerge davanti alla pagina suggerisce quale elemento richieda attenzione in quel momento.

Nello screenshot di MDN Web Docs, il campo di ricerca rimane nitido mentre la pagina sottostante è oscurata e sfocata. Questa separazione visiva distingue figura e sfondo. La schermata non documenta da sola un comportamento modale: gestione del focus, tastiera e interazione con i contenuti sottostanti richiedono una verifica funzionale.

#figura-nel-testo(
  id: "fig-gestalt-133", file: path("/risorse-condivise/immagini/figure/gestalt/61-figura-e-sfondo-nel-web.png"),
  didascalia: [MDN: il campo di ricerca resta nitido davanti alla pagina oscurata e sfocata, separandosi dal contesto sottostante.#sito([MDN Web Docs, ricerca sulla homepage · 14 ottobre 2026. © Mozilla e.], "https://developer.mozilla.org/")],
  diritti: [MDN Web Docs, ricerca sulla homepage · 14 ottobre 2026. © Mozilla e contributori.], alt: "MDN: il campo di ricerca resta nitido davanti alla pagina oscurata e sfocata, separandosi dal contesto sottostante.",
  rapporto: 1280 / 720, colonne: 2,
)



// Fonte 3864:2224 · C03 · 199 · DX — Figura e sfondo: logo reale
=== Figura e sfondo: il logo FedEx

Lo spazio chiaro fra la E e la x ha il contorno di una freccia rivolta a destra. All’inizio può essere percepito come semplice sfondo del testo; quando lo riconosciamo, acquista una forma propria. Le lettere e lo spazio negativo partecipano così alla stessa composizione.

#figura-nel-testo(
  id: "fig-gestalt-134", file: path("/risorse-condivise/immagini/figure/gestalt/62-figura-e-sfondo-logo-reale.png"),
  didascalia: [FedEx: lo spazio fra E e x diventa una freccia.#sito([Marchio FedEx · Brandfolder ufficiale, collective\_eng\_2c\_pos\_rgb.png, 15.], "https://brand.fedex.com/organizations/fedex/search")],
  diritti: [Marchio FedEx · Brandfolder ufficiale, collective\_eng\_2c\_pos\_rgb.png, 15 ottobre 2026.], alt: "FedEx: lo spazio fra E e x diventa una freccia.",
  rapporto: 453 / 222, colonne: 1,
)



// Fonte 3863:2158 · C03 · 200 · SX — Figura e sfondo: fotografia
#figura-nel-testo(
  id: "fig-gestalt-135", file: path("/risorse-condivise/immagini/figure/gestalt/63-figura-e-sfondo-fotografia.png"),
  didascalia: [Le sagome scure degli uccelli emergono sull’acqua luminosa: il contrasto e il contorno condiviso separano le figure dallo sfondo.#sito([_Sandra Uecker_ / USFWS Mountain Prairie · Public domain · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Bear_River_Birds_at_Sunset_(52038067851).jpg")],
  diritti: [Sandra Uecker / USFWS Mountain Prairie · Public domain · Wikimedia Commons], alt: "Le sagome scure degli uccelli emergono sull’acqua luminosa: il contrasto e il contorno condiviso separano le figure dallo sfondo.",
  rapporto: 1600 / 884, colonne: 1,
)



// Fonte 3897:2370 · C03 · 201 · DX — Figura e sfondo: altre immagini e grafiche
#figura-nel-testo(
  id: "fig-gestalt-136", file: path("/risorse-condivise/immagini/figure/gestalt/64-figura-e-sfondo-altre-immagini-e-grafiche.png"),
  didascalia: [Spartan Golf: la figura del golfista partecipa anche al profilo di un guerriero.],
  diritti: [Richard Fonteneau, «Spartan Golf», concept, 2010 · Logopond, progetto 91660.], alt: "Spartan Golf: la figura del golfista partecipa anche al profilo di un guerriero.",
  rapporto: 350 / 317, colonne: 1,
)



// Fonte 3804:2107 · C03 · 202 · SX — MDN: la ricerca in primo piano
#figura-nel-testo(
  id: "fig-gestalt-137", file: path("/risorse-condivise/immagini/figure/gestalt/65-mdn-la-ricerca-in-primo-piano.png"),
  didascalia: [MDN: il campo di ricerca emerge davanti alla pagina oscurata e sfocata.],
  diritti: [MDN Web Docs, ricerca aperta sulla homepage. Screenshot del 14 ottobre 2026. © Mozilla e contributori; rispettivi diritti su marchi e asset.], alt: "MDN: il campo di ricerca emerge davanti alla pagina oscurata e sfocata.",
  rapporto: 1280 / 720, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-138", file: path("/risorse-condivise/immagini/figure/gestalt/66-mdn-la-ricerca-in-primo-piano.png"),
  didascalia: [Dettaglio: contorno e contrasto separano il campo attivo dal contesto sottostante.],
  diritti: [MDN Web Docs, ricerca aperta sulla homepage. Screenshot del 14 ottobre 2026. © Mozilla e contributori; rispettivi diritti su marchi e asset.], alt: "Dettaglio: contorno e contrasto separano il campo attivo dal contesto sottostante.",
  rapporto: 825 / 220, colonne: 2,
)



// Fonte 3897:2388 · C03 · 203 · DX — Figura e sfondo: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-139", file: path("/risorse-condivise/immagini/figure/gestalt/67-figura-e-sfondo-altri-screenshot-reali.png"),
  didascalia: [Tailwind: la ricerca nitida emerge davanti alla documentazione attenuata.#sito([Installing Tailwind CSS with Vite - Tailwind CSS · screenshot del 15.], "https://tailwindcss.com/docs/installation/using-vite")],
  diritti: [Installing Tailwind CSS with Vite - Tailwind CSS · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Tailwind: la ricerca nitida emerge davanti alla documentazione attenuata.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-140", file: path("/risorse-condivise/immagini/figure/gestalt/68-figura-e-sfondo-altri-screenshot-reali.png"),
  didascalia: [Atelier: il volto illuminato e il testo chiaro emergono dal fondo scuro.],
  diritti: [Diritti dei rispettivi titolari.], alt: "Atelier: il volto illuminato e il testo chiaro emergono dal fondo scuro.",
  rapporto: 562 / 316, colonne: 2,
)



// Fonte 3721:2536 · C03 · 204 · SX — Esperienza passata (past experience)
== Esperienza passata (past experience)

Conoscenze e associazioni apprese contribuiscono a riconoscere forme e significati familiari, influenzando il modo in cui interpretiamo una configurazione visiva.

#figura-nel-testo(
  id: "fig-gestalt-141", file: path("/risorse-condivise/immagini/figure/gestalt/69-esperienza-passata-past-experience.svg"),
  didascalia: [I punti suggeriscono una lettera incompleta. La stessa configurazione ruotata può essere meno familiare: disposizione dei tratti e conoscenza dell’alfabeto concorrono al riconoscimento.],
  diritti: none, alt: "I punti suggeriscono una lettera incompleta. La stessa configurazione ruotata può essere meno familiare: disposizione dei tratti e conoscenza dell’alfabeto concorrono al riconoscimento.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:21652 · C03 · 205 · DX — Esperienza passata: come funziona
=== Esperienza passata: come funziona

L’esperienza passata contribuisce all’interpretazione di ciò che vediamo. Una disposizione di tratti può richiamare una lettera, un simbolo o un oggetto già conosciuto. Il riconoscimento dipende sia dalle caratteristiche presenti nell’immagine sia dalle conoscenze dell’osservatore. Una forma familiare per una persona può risultare poco significativa per chi non condivide lo stesso alfabeto, la stessa convenzione o lo stesso contesto culturale.

Nello schema, un insieme di punti suggerisce una lettera incompleta. La disposizione sostiene il riconoscimento, mentre la conoscenza dell’alfabeto permette di attribuirle un nome. Ruotare la configurazione o modificare alcuni allineamenti può rendere la lettura meno immediata. Il confronto mostra una possibile influenza della familiarità; non dimostra che il riconoscimento derivi esclusivamente dall’esperienza, perché continuazione, chiusura e altre relazioni visive rimangono presenti.

È utile distinguere questo contributo appreso dai fattori di raggruppamento formulati attraverso distanze, somiglianze e movimento. L’esperienza non va trattata come una regola che garantisce la stessa risposta in ogni pubblico. Per descrivere un esempio, esplicita quale conoscenza viene richiamata e quale interpretazione rende possibile. Un marchio noto, una convenzione d’interfaccia e una forma naturale familiare attivano conoscenze differenti, anche quando il riconoscimento sembra immediato (@fig-gestalt-141–#ref(<fig-gestalt-151>, supplement: none)).

 @gestalt-wertheimer1923#sito([_Wertheimer_ (1923).], "https://doi.org/10.1007/BF00410640")



// Fonte 198:4333 · C03 · 206 · SX — Esperienza passata nel web
=== Esperienza passata nel web

Nel web, molte interpretazioni dipendono da convenzioni apprese: una lente può richiamare la ricerca, una sottolineatura un collegamento, il rosso una condizione di errore. La familiarità aiuta chi conosce già quel segno e lo ritrova in un contesto coerente.

Nell’esempio reale del GOV.UK Design System, il rosso compare nel messaggio e nei bordi dei campi. Il testo esplicita il problema, così la segnalazione non dipende soltanto dal colore o dall’esperienza precedente. Le convenzioni vanno verificate con il pubblico previsto: la diffusione di un segno non garantisce una comprensione universale.

#figura-nel-testo(
  id: "fig-gestalt-142", file: path("/risorse-condivise/immagini/figure/gestalt/70-esperienza-passata-nel-web.png"),
  didascalia: [GOV.UK: messaggio e bordi rossi richiamano una convenzione di errore; il testo precisa il problema e integra il segnale cromatico.#sito([GOV.UK Design System, Error message · screenshot del 14 ottobre 2026. Open.], "https://design-system.service.gov.uk/components/error-message/")],
  diritti: [GOV.UK Design System, Error message · screenshot del 14 ottobre 2026. Open Government Licence v3.0.], alt: "GOV.UK: messaggio e bordi rossi richiamano una convenzione di errore; il testo precisa il problema e integra il segnale cromatico.",
  rapporto: 600 / 220, colonne: 2,
)



// Fonte 3864:2252 · C03 · 207 · DX — Esperienza passata: logo reale
=== Esperienza passata: il logo Goodwill

Chi conosce l’alfabeto latino può riconoscere nella figura una g minuscola; gli stessi tratti richiamano un volto sorridente. Il marchio mette in relazione due letture familiari. L’esperienza passata interviene soprattutto nel riconoscimento della lettera e dell’identità Goodwill, appresi nel tempo.

#figura-nel-testo(
  id: "fig-gestalt-143", file: path("/risorse-condivise/immagini/figure/gestalt/71-esperienza-passata-logo-reale.svg"),
  didascalia: [Goodwill: marchio regionale completo e dettaglio della Smiling G. La stessa g si legge come lettera e volto sorridente.#sito([Marchio Goodwill. Smiling G: _Joseph Selame_, 1968. Asset: Goodwill.], "https://www.goodwillnynj.org/smiling-g-turns-50/")],
  diritti: [Marchio Goodwill. Smiling G: Joseph Selame, 1968. Asset: Goodwill Industries of Greater Cleveland and East Central Ohio.], alt: "Goodwill: marchio regionale completo e dettaglio della Smiling G. La stessa g si legge come lettera e volto sorridente.",
  rapporto: 363 / 227.38411712646484, colonne: 1,
)



// Fonte 3863:2178 · C03 · 208 · SX — Esperienza passata: fotografia
#figura-nel-testo(
  id: "fig-gestalt-144", file: path("/risorse-condivise/immagini/figure/gestalt/72-esperienza-passata-fotografia.png"),
  didascalia: [In Irlanda «STAD» significa «STOP». Chi conosce la lingua legge la parola; chi non la conosce può inferirne la funzione dal contesto stradale appreso.#sito([_Mucklagh_ · CC0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Road_Marking-1100839,_Dingle_Peninsula,_Co._Kerry,_Ireland.jpg")],
  diritti: [Mucklagh · CC0 · Wikimedia Commons], alt: "In Irlanda «STAD» significa «STOP». Chi conosce la lingua legge la parola; chi non la conosce può inferirne la funzione dal contesto stradale appreso.",
  rapporto: 1280 / 960, colonne: 1,
)



// Fonte 3897:2409 · C03 · 209 · DX — Esperienza passata: altre immagini e grafiche
#figura-al-vivo(
  id: "fig-gestalt-145", file: path("/risorse-condivise/immagini/figure/gestalt/73-esperienza-passata-altre-immagini-e-grafiche.png"),
  didascalia: [Coca-Cola: colore e marchio richiamano associazioni apprese con la marca.],
  diritti: [Coca-Cola, «Feel it» · autore non indicato.], alt: "Coca-Cola: colore e marchio richiamano associazioni apprese con la marca.",
  rapporto: 598 / 720,
)



// Fonte 3804:2117 · C03 · 210 · SX — GOV.UK: riconoscere un errore
#figura-nel-testo(
  id: "fig-gestalt-146", file: path("/risorse-condivise/immagini/figure/gestalt/74-gov-uk-riconoscere-un-errore.png"),
  didascalia: [GOV.UK: il rosso richiama una convenzione di errore; il testo precisa il problema.],
  diritti: [GOV.UK Design System, Error message. Screenshot del 14 ottobre 2026. OGL v3.0.], alt: "GOV.UK: il rosso richiama una convenzione di errore; il testo precisa il problema.",
  rapporto: 600 / 220, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-147", file: path("/risorse-condivise/immagini/figure/gestalt/75-gov-uk-riconoscere-un-errore.png"),
  didascalia: [Dettaglio: i bordi rossi associano lo stato di errore ai campi della risposta.],
  diritti: [GOV.UK Design System, Error message. Screenshot del 14 ottobre 2026. OGL v3.0.], alt: "Dettaglio: i bordi rossi associano lo stato di errore ai campi della risposta.",
  rapporto: 300 / 90, colonne: 1,
)



// Fonte 3897:2430 · C03 · 211 · DX — Esperienza passata: IKEA
#figura-nel-testo(
  id: "fig-gestalt-148", file: path("/risorse-condivise/immagini/figure/gestalt/76-esperienza-passata-ikea.png"),
  didascalia: [IKEA: i simboli della testata richiamano convenzioni d’uso apprese.#sito([IKEA Italia · screenshot reale del 15 ottobre 2026. Dettaglio ricavato.], "https://www.ikea.com/it/it/")<nota-fonti-fig-gestalt-148>],
  diritti: [IKEA Italia · screenshot reale del 15 ottobre 2026. Dettaglio ricavato dallo stesso screenshot; diritti dei rispettivi titolari.], alt: "IKEA: i simboli della testata richiamano convenzioni d’uso apprese.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-149", file: path("/risorse-condivise/immagini/figure/gestalt/77-esperienza-passata-ikea.png"),
  didascalia: [Dettaglio della stessa testata: ricerca, profilo, preferiti e acquisti.#sito([IKEA Italia · screenshot reale del 15 ottobre 2026. Dettaglio ricavato.], "https://www.ikea.com/it/it/")],
  diritti: [IKEA Italia · screenshot reale del 15 ottobre 2026. Dettaglio ricavato dallo stesso screenshot; diritti dei rispettivi titolari.], alt: "Dettaglio della stessa testata: ricerca, profilo, preferiti e acquisti.",
  rapporto: 1800 / 216, colonne: 2,
)



// Fonte 3919:2092 · C03 · 212 · SX — Esperienza passata: Oxfam
#figura-nel-testo(
  id: "fig-gestalt-150", file: path("/risorse-condivise/immagini/figure/gestalt/78-esperienza-passata-oxfam.png"),
  didascalia: [Oxfam: le icone social richiamano servizi già conosciuti.#sito([Oxfam, screenshot storico. Diritti dei rispettivi titolari.], "https://www.nngroup.com/articles/anchoring-principle/")<nota-fonti-fig-gestalt-150>],
  diritti: [Oxfam, screenshot storico. Diritti dei rispettivi titolari.], alt: "Oxfam: le icone social richiamano servizi già conosciuti.",
  rapporto: 1280 / 839, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-151", file: path("/risorse-condivise/immagini/figure/gestalt/79-esperienza-passata-oxfam.png"),
  didascalia: [Dettaglio dello stesso screenshot: Twitter, Facebook e YouTube.#sito([Oxfam, screenshot storico. Diritti dei rispettivi titolari.], "https://www.nngroup.com/articles/anchoring-principle/")],
  diritti: [Oxfam, screenshot storico. Diritti dei rispettivi titolari.], alt: "Dettaglio dello stesso screenshot: Twitter, Facebook e YouTube.",
  rapporto: 335 / 86, colonne: 1,
)


]
#[
#import "../template/stile.typ": sito, immagine


// Fonte 3721:2488 · C03 · 213 · DX — Regione comune (common region)
== Regione comune (common region)

Elementi collocati dentro la stessa area delimitata tendono a essere percepiti come un gruppo, anche quando altri elementi sono più vicini.

#figura-nel-testo(
  id: "fig-gestalt-152", file: path("/risorse-condivise/immagini/figure/gestalt/80-regione-comune-common-region.svg"),
  didascalia: [Posizione e distanza dei punti restano identiche. Aggiungendo due contorni, gli elementi racchiusi nella stessa area formano gruppi riconoscibili.],
  diritti: none, alt: "Posizione e distanza dei punti restano identiche. Aggiungendo due contorni, gli elementi racchiusi nella stessa area formano gruppi riconoscibili.",
  rapporto: 363.0 / 240.0, colonne: 1,
)



// Fonte 3861:21503 · C03 · 214 · SX — Regione comune: come funziona
=== Regione comune: come funziona

Una regione comune è un’area che comprende più elementi e li distingue da ciò che si trova all’esterno. Il confine può essere suggerito da un contorno o da una superficie visivamente distinta. Quando alcuni punti condividono la stessa regione, tendiamo a considerarli appartenenti a un insieme: il contenitore introduce una relazione ulteriore rispetto alla loro distanza o somiglianza.

Per osservare il contributo della regione, confronta configurazioni con punti nelle medesime posizioni. Nel primo caso non compare alcun confine; nel secondo, un contorno raccoglie alcuni elementi. Il raggruppamento può cambiare pur mantenendo costanti gli intervalli. Se i confini attraversano gruppi suggeriti dalla vicinanza, i due segnali possono entrare in competizione. Il risultato va descritto in relazione alla configurazione concreta, senza attribuire sempre lo stesso peso a ciascun fattore.

_Stephen E. Palmer_ propone la regione comune come principio di raggruppamento nel 1992, dopo le formulazioni classiche della Gestalt. È quindi un’aggiunta successiva alle leggi storiche. Qui interessa l’appartenenza di più elementi a una stessa area; nella chiusura interessa invece l’organizzazione di parti che suggeriscono il contorno di una figura (@fig-gestalt-152–#ref(<fig-gestalt-164>, supplement: none)).

 @gestalt-palmer1992#sito([_Palmer_ (1992).], "https://doi.org/10.1016/0010-0285(92)90014-S")



// Fonte 198:4309 · C03 · 215 · DX — Regione comune nel web
=== Regione comune nel web

Nel web, schede, pannelli e superfici di sfondo possono raccogliere informazioni correlate. Il confine di una regione suggerisce quali contenuti appartengano allo stesso insieme, anche quando al suo interno ci sono più elementi.

Nella pagina Pricing di Notion, Free e Plus condividono una regione chiara; Business ed Enterprise sono raccolti nella regione azzurra adiacente. Spaziatura e colonne distinguono le singole proposte dentro i gruppi più ampi. Il contenitore deve corrispondere a una relazione significativa: aggiungere un riquadro a ogni elemento può rendere meno evidenti i raggruppamenti principali.

#figura-nel-testo(
  id: "fig-gestalt-153", file: path("/risorse-condivise/immagini/figure/gestalt/81-regione-comune-nel-web.png"),
  didascalia: [Notion: Free e Plus condividono una regione chiara; Business ed Enterprise sono raccolti nella regione azzurra adiacente.#sito([Notion, Pricing · screenshot del 14 ottobre 2026, versione inglese, EUR. ©.], "https://www.notion.so/pricing")],
  diritti: [Notion, Pricing · screenshot del 14 ottobre 2026, versione inglese, EUR. © Notion. Valori storici nello screenshot.], alt: "Notion: Free e Plus condividono una regione chiara; Business ed Enterprise sono raccolti nella regione azzurra adiacente.",
  rapporto: 1280 / 720, colonne: 2,
)



// Fonte 3864:2197 · C03 · 216 · SX — Regione comune: logo reale
=== Regione comune: il logo LEGO

Le quattro lettere sono contenute nella stessa superficie rossa, delimitata da un contorno quadrato. Questo campo comune le raccoglie in un’unità visiva distinta da ciò che circonda il marchio. Vicinanza, sovrapposizione e stile delle lettere contribuiscono a loro volta alla lettura.

#figura-nel-testo(
  id: "fig-gestalt-154", file: path("/risorse-condivise/immagini/figure/gestalt/82-regione-comune-logo-reale.svg"),
  didascalia: [LEGO: la superficie rossa riunisce il marchio in una regione comune.#sito([LEGO e il logo LEGO sono marchi del LEGO Group. ©2026 The LEGO Group.], "https://www.lego.com/en-ch/aboutus/newsroom/lego-brand-logos-portfolio-assets")],
  diritti: [LEGO e il logo LEGO sono marchi del LEGO Group. ©2026 The LEGO Group.], alt: "LEGO: la superficie rossa riunisce il marchio in una regione comune.",
  rapporto: 141.732 / 141.733, colonne: 1,
)



// Fonte 3863:2138 · C03 · 217 · DX — Regione comune: fotografia
#figura-nel-testo(
  id: "fig-gestalt-155", file: path("/risorse-condivise/immagini/figure/gestalt/83-regione-comune-fotografia.png"),
  didascalia: [Gli scomparti del bento raccolgono ingredienti diversi: il confine del contenitore li fa leggere come gruppi, anche quando colore e forma non coincidono.#sito([_Gamene_ · CC BY 2.0 · Wikimedia Commons], "https://commons.wikimedia.org/wiki/File:Spring_roll_bento_(4015192611).jpg")],
  diritti: [Gamene · CC BY 2.0 · Wikimedia Commons], alt: "Gli scomparti del bento raccolgono ingredienti diversi: il confine del contenitore li fa leggere come gruppi, anche quando colore e forma non coincidono.",
  rapporto: 1280 / 1256, colonne: 1,
)



// Fonte 3897:2331 · C03 · 218 · SX — Regione comune: dashboard pubblicata su Tableau
#figura-nel-testo(
  id: "fig-gestalt-156", file: path("/risorse-condivise/immagini/figure/gestalt/84-regione-comune-dashboard-pubblicata-su-tableau.png"),
  didascalia: [Tableau Public: ogni pannello bianco raccoglie informazioni in una regione distinta.#sito([_Kavin Kumar G_, Car Insurance policies dashboard, Tableau Public (2022) ·.], "https://public.tableau.com/app/profile/kavin.kumar.g/viz/CarInsurancepoliciesdashboard/viz")<nota-fonti-fig-gestalt-156>],
  diritti: [Kavin Kumar G, Car Insurance policies dashboard, Tableau Public (2022) · screenshot reale del 15 ottobre 2026; rispettivi diritti.], alt: "Tableau Public: ogni pannello bianco raccoglie informazioni in una regione distinta.",
  rapporto: 7500 / 5181, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-157", file: path("/risorse-condivise/immagini/figure/gestalt/85-regione-comune-dashboard-pubblicata-su-tableau.png"),
  didascalia: [Dettaglio dello stesso screenshot: ogni pannello riunisce simbolo, nome e valore.#footnote(<nota-fonti-fig-gestalt-156>)],
  diritti: [Visualizzazione pubblicata su Tableau Public], alt: "Dettaglio dello stesso screenshot: ogni pannello riunisce simbolo, nome e valore.",
  rapporto: 2580 / 570, colonne: 2,
)



// Fonte 198:4884 · C03 · 219 · DX — Regione comune: il catalogo Apple Watch
#figura-nel-testo(
  id: "fig-gestalt-158", file: path("/risorse-condivise/immagini/figure/gestalt/86-regione-comune-il-catalogo-apple-watch.png"),
  didascalia: [Apple Watch: fondi e confini dividono il catalogo in aree, associando immagini e informazioni alla rispettiva regione.],
  diritti: [© Apple · pagina Apple Watch, screenshot storico.], alt: "Apple Watch: fondi e confini dividono il catalogo in aree, associando immagini e informazioni alla rispettiva regione.",
  rapporto: 1014 / 1300, colonne: 2,
)



// Fonte 3692:2386 · C03 · 220 · SX — Xbox: aree verdi e fotografie
#figura-nel-testo(
  id: "fig-gestalt-159", file: path("/risorse-condivise/immagini/figure/gestalt/87-xbox-aree-verdi-e-fotografie.png"),
  didascalia: [Xbox: fotografie e superfici verdi raccolgono i contenuti in regioni visive distinte.],
  diritti: [© Microsoft / Xbox · immagine.], alt: "Xbox: fotografie e superfici verdi raccolgono i contenuti in regioni visive distinte.",
  rapporto: 1897 / 922, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-160", file: path("/risorse-condivise/immagini/figure/gestalt/88-xbox-aree-verdi-e-fotografie.png"),
  didascalia: [Dettaglio della stessa immagine: fotografia, testo e azione condividono l’area dedicata alla singola proposta.],
  diritti: [© Microsoft / Xbox · immagine.], alt: "Dettaglio della stessa immagine: fotografia, testo e azione condividono l’area dedicata alla singola proposta.",
  rapporto: 946 / 462, colonne: 2,
)



// Fonte 3804:2097 · C03 · 221 · DX — Notion: due gruppi di piani
#figura-nel-testo(
  id: "fig-gestalt-161", file: path("/risorse-condivise/immagini/figure/gestalt/89-notion-due-gruppi-di-piani.png"),
  didascalia: [Notion: una regione chiara e una azzurra raccolgono due gruppi di piani.],
  diritti: [Notion, Pricing. Screenshot del 14 ottobre 2026, versione inglese con valuta EUR. © Notion. Valori documentati nello screenshot.], alt: "Notion: una regione chiara e una azzurra raccolgono due gruppi di piani.",
  rapporto: 1280 / 720, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-162", file: path("/risorse-condivise/immagini/figure/gestalt/90-notion-due-gruppi-di-piani.png"),
  didascalia: [Dettaglio: il bordo comune racchiude Free e Plus; lo spazio interno distingue le due proposte.],
  diritti: [Notion, Pricing. Screenshot del 14 ottobre 2026, versione inglese con valuta EUR. © Notion. Valori documentati nello screenshot.], alt: "Dettaglio: il bordo comune racchiude Free e Plus; lo spazio interno distingue le due proposte.",
  rapporto: 510 / 510, colonne: 2,
)



// Fonte 3897:2349 · C03 · 222 · SX — Regione comune: altri screenshot reali
#figura-nel-testo(
  id: "fig-gestalt-163", file: path("/risorse-condivise/immagini/figure/gestalt/91-regione-comune-altri-screenshot-reali.png"),
  didascalia: [Slack: ogni piano riunisce prezzo, pulsante e funzioni in una regione delimitata.#sito([Slack Pricing Plans: Find the Right Fit for Your Team | Slack · screenshot.], "https://slack.com/pricing")],
  diritti: [Slack Pricing Plans: Find the Right Fit for Your Team | Slack · screenshot del 15 ottobre 2026. Diritti dei rispettivi titolari.], alt: "Slack: ogni piano riunisce prezzo, pulsante e funzioni in una regione delimitata.",
  rapporto: 3840 / 2160, colonne: 2,
)

#figura-nel-testo(
  id: "fig-gestalt-164", file: path("/risorse-condivise/immagini/figure/gestalt/92-regione-comune-altri-screenshot-reali.png"),
  didascalia: [Pane&Trita: la superficie rossa raccoglie marchio e navigazione.],
  diritti: [Diritti dei rispettivi titolari.], alt: "Pane&Trita: la superficie rossa raccoglie marchio e navigazione.",
  rapporto: 1338 / 94, colonne: 2,
)



// Fonte 3451:1154 · C03 · 223 · DX — Quando i principi interagiscono
== Quando i principi interagiscono

Quando osserviamo una composizione, vicinanza, somiglianza e altri fattori agiscono insieme. Se suggeriscono lo stesso raggruppamento, lo rafforzano; se indicano relazioni diverse, entrano in conflitto. Il confronto seguente mantiene fisse le posizioni dei punti e cambia soltanto il colore, per mostrare come uno stesso insieme possa suggerire suddivisioni differenti (@fig-gestalt-165).

Nella riga a, gli intervalli fra i punti suggeriscono tre coppie. Nella riga b, i colori uguali confermano le coppie; nella riga c, la corrispondenza dei colori unisce punti che appartengono a coppie diverse.

Quando i segnali concordano, il raggruppamento può risultare più evidente. Quando competono, la lettura dipende dalla configurazione complessiva: nessun fattore prevale sempre. Nel progetto conviene far concordare i segnali che esprimono la stessa relazione e verificare eventuali ambiguità nel compito.

#figura-nel-testo(
  id: "fig-gestalt-165", file: path("/risorse-condivise/immagini/figure/gestalt/93-quando-i-principi-interagiscono.svg"),
  didascalia: [a. La vicinanza suggerisce coppie. b. Il colore sostiene le stesse coppie. c. Colore e vicinanza suggeriscono raggruppamenti diversi. @gestalt-wertheimer1938#sito([_Wertheimer_ (1923/1938).], "https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm")],
  diritti: none, alt: "a. La vicinanza suggerisce coppie. b. Il colore sostiene le stesse coppie. c. Colore e vicinanza suggeriscono raggruppamenti diversi.",
  rapporto: 363.0 / 184.0, colonne: 1,
)



// Fonte 3451:1313 · C03 · 224 · SX — Vicinanza, regione e connessione
=== Vicinanza, regione e connessione

_Essere vicini, condividere un’area e avere un collegamento visibile sono relazioni differenti (@fig-gestalt-166)._

Il confronto conserva posizione e dimensione dei punti. Nei pannelli b e c compaiono rispettivamente regioni e collegamenti. La connessione degli elementi può suggerire un’unità anche senza ridurre la loro distanza.

La buona continuazione riguarda invece la continuità di direzione dei contorni. La connectedness uniforme descrive la segmentazione dell’immagine in regioni con proprietà omogenee: va distinta dal raggruppamento di elementi già individuati.

Nelle interfacce, osserva quale relazione viene espressa da un contenitore, da una linea o dalla spaziatura; non attribuirle tutte alla continuità.

#figura-nel-testo(
  id: "fig-gestalt-166", file: path("/risorse-condivise/immagini/figure/gestalt/94-vicinanza-regione-e-connessione.svg"),
  didascalia: [a. Punti equidistanti. b. Un contorno racchiude ciascuna coppia. c. Un tratto connette gli elementi della coppia. @gestalt-palmer2002#sito([_Palmer_ (2002).], "https://palmerlab.berkeley.edu/pdf/Palmer.pdf")],
  diritti: none, alt: "a. Punti equidistanti. b. Un contorno racchiude ciascuna coppia. c. Un tratto connette gli elementi della coppia.",
  rapporto: 363.0 / 184.0, colonne: 1,
)



// Fonte 3416:1403 · C03 · 225 · DX — Che cosa dimostrano gli studi
== Che cosa dimostrano gli studi

_Una preferenza visiva, una prima impressione e il completamento di un compito misurano aspetti differenti dell’esperienza._

*Prime impressioni*

_Möller_, _Brezing_ e _Unz_ studiano l’accettazione e la raccomandazione di siti mostrati per tre secondi. I risultati permettono quindi di discutere come organizzazione visiva e presenza sociale si colleghino alle prime impressioni in quel contesto. Non forniscono invece una misura generale della prestazione delle persone nello svolgimento di compiti.

*Scelte osservate nei siti*

_Kapllani_ ed _Elmimouni_ esaminano manualmente 60 siti, selezionati tra quelli molto visitati e i candidati ai Webby Awards 2018–2019. Osservano l’uso di somiglianza, simmetria e chiusura, descrivendo così scelte ricorrenti nel campione. Documentare queste scelte non permette però di concludere che una singola soluzione causi popolarità o maggiore usabilità.

*Dalla fonte alla proposta*

Un risultato va interpretato considerando il compito, i partecipanti, la versione dell’interfaccia e la misura utilizzata nello studio. Questi elementi aiutano a capire in quale contesto sia stato ottenuto, prima di trasferirlo a una proposta. Anche questi esempi restano osservazioni e confronti didattici: diventano evidenze d’uso quando sono accompagnati da una prova documentata.

 @gestalt-moeller2012#sito([_Möller_, _Brezing_ e _Unz_ (2012).], "https://doi.org/10.1080/0144929X.2011.642893") @gestalt-kapllani2020#sito([_Kapllani_ ed _Elmimouni_ (2020).], "https://doi.org/10.1002/pra2.340")



// Fonte 3416:1513 · C03 · 226 · SX — Dal principio alla prova
== Dal principio alla prova

_La relazione visiva suggerita dalla composizione deve essere confrontata con ciò che una persona riesce a capire e a fare._

*Formulare un’ipotesi*

La verifica parte da un compito concreto, come trovare un prodotto, associare un’etichetta al campo o riconoscere lo stato di una risposta. L’ipotesi collega il compito alle relazioni visive che potrebbero facilitarlo: per esempio, una minore distanza potrebbe chiarire l’associazione fra etichetta e campo. Forme e delimitazioni offrono altri aspetti da considerare.

*Cambiare una relazione*

Nel caso del modulo si possono confrontare due versioni dello stesso contenuto, variando soltanto la distanza fra etichetta e campo e conservando testi, dimensioni e funzioni. Il confronto rende esplicita la relazione messa alla prova. Quando cambiano più aspetti insieme, occorre descriverli tutti, evitando di attribuire il risultato a uno soltanto.

*Osservare e rivedere*

La persona viene invitata a svolgere il compito: nel modulo, per esempio, si osservano eventuali associazioni errate fra etichette e campi, esitazioni e richieste di aiuto. Registrando anche il contesto della prova, le osservazioni diventano un riferimento per rivedere le alternative e preparano il lavoro successivo su forma e gerarchia visiva.#sito([W3C WAI, valutare con le persone.], "https://www.w3.org/WAI/test-evaluate/involving-users/")


]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#capitolo(..parametri-capitolo(4), testo)
