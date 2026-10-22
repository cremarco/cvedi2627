#import "../../template/stile.typ": sito, immagine
#import "componenti.typ": tavola-gestalt



#place.flush()

// Fonte 198:3080 · C03 · 138 · SX — Ideazione: percezione e Gestalt
== Ideazione: percezione e Gestalt

*L’ideazione sviluppa più risposte al problema emerso dalla ricerca. Le alternative riguardano il funzionamento, i contenuti e la forma dell’esperienza.*

Nel caso di Sara, per esempio, si possono confrontare diversi modi di mostrare la data, la disponibilità e la conferma di una prenotazione. Per motivare queste scelte occorre capire come le persone percepiscono gli elementi, li raggruppano e riconoscono le relazioni fra loro. Il linguaggio visivo aiuta a dare forma alle proposte e a discuterle.

Confrontare più alternative permette di scegliere quali sviluppare nei prototipi. Percezione, gerarchia e colore diventano così strumenti del progetto: le scelte vanno poi verificate osservando come le persone comprendono e usano l’interfaccia.


#place.flush()

// Fonte 198:3543 · C03 · 139 · DX — Percezione visiva: le origini della Gestalt
=== Percezione visiva: le origini della Gestalt

*Le origini*

La scuola della Gestalt nacque nel 1912, con la pubblicazione, da parte dello psicologo _Max Wertheimer_, dello studio sul movimento apparente (percezione fenomenica del movimento in assenza di movimento fisico). Altri esponenti importanti furono _Kurt Koffka_ e _Wolfgang Köhler_, che contribuirono allo sviluppo della scuola.
I gestaltisti studiarono anche le modalità con cui il nostro cervello identifica un oggetto a partire da un insieme di stimoli. _Köhler_ e gli altri diedero contributi importanti anche per quanto riguarda la psicologia del ragionamento e dell’apprendimento.


*La teoria della Gestalt*

Agli inizi del secolo scorso gli studiosi appartenenti alla Scuola della Psicologia della Gestalt (o Psicologia della Forma) tentarono di dare una risposta alla domanda fondamentale di come l’attivazione di alcuni recettori sulla retina possa portare alla percezione di oggetti distinti gli uni dagli altri. Capire quali sono le modalità con cui si compiono questi processi è fondamentale per un designer e per un comunicatore.


#place.flush()

// Fonte 198:4344 · C03 · 140 · SX — Dalle parti all’insieme
=== Dalle parti all’insieme

Nel 1923, _Wertheimer_ descrisse fattori di organizzazione percettiva: elementi separati possono essere percepiti come gruppi in base alle loro relazioni. Il tutto presenta qualità che dipendono dalla configurazione, oltre che dalle singole parti (@fig-gestalt-73).

*Lo spazio partecipa alla composizione*

Lo spazio positivo è occupato dagli elementi; quello negativo si trova attorno e tra essi. Il rapporto tra pieni e vuoti aiuta a separare gruppi, creare gerarchie e dare ritmo alla lettura. Figura e sfondo possono anche alternarsi, come nel manifesto della @fig-gestalt-74.

*Una relazione deve essere riconoscibile*

Nelle interfacce, la disposizione suggerisce quali elementi sono collegati: un’etichetta vicina al proprio campo, per esempio, viene letta come sua descrizione. Distanze, separazioni e rilievo visivo devono rendere riconoscibili queste relazioni. Poiché i principi possono suggerire letture diverse, occorre verificarle osservando l’uso.

#immagine(path("/assets/images/figure/gestalt/01-dalle-parti-all-insieme.svg"),
  [Intervalli costanti suggeriscono una sequenza continua; uno spazio maggiore separa due gruppi di tre elementi.],
  alt: "Intervalli costanti suggeriscono una sequenza continua; uno spazio maggiore separa due gruppi di tre elementi.",
  width: 187.09pt) <fig-gestalt-73>


#place.flush()

Fonti per @fig-gestalt-73.  @gestalt-palmer2002#sito([Palmer (2002).], "https://palmerlab.berkeley.edu/pdf/Palmer.pdf") @gestalt-wertheimer1923#sito([Wertheimer (1923).], "https://doi.org/10.1007/BF00410640")


#place.flush()

// Fonte 198:4912 · C03 · 141 · DX — Black Swan: forma e contrasto
#tavola-gestalt((
  (file: path("/assets/images/figure/gestalt/02-black-swan-forma-e-contrasto.png"), didascalia: [Black Swan: una composizione giocata su forma, colore e contrasto.], diritti: none, alt: "Black Swan: una composizione giocata su forma, colore e contrasto.", rapporto: 0.7542735042735043, larghezza-fonte: 363, etichetta: <fig-gestalt-74>),
), note: [])


#place.flush()

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


#place.flush()
