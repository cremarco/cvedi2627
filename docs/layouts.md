# Composizioni delle slide

Le 187 slide condividono palette del booklet, font, margini e footer. La struttura varia secondo il contenuto: confrontare, seguire un percorso, leggere una tesi o osservare un artefatto. Le classi sono dichiarate nel frontmatter, senza selettori basati sul numero della pagina.

## Regole comuni

- Canvas 1280 × 720, margini laterali 68 px e titolo delle slide di lettura a 64 px dal bordo superiore. Almeno 12 px separano il contenuto dal footer.
- Aperture, domande e percorsi metro conservano il proprio centro compositivo. Le affermazioni delle lezioni mantengono il titolo comune e una tesi centrale.
- Confronti brevi: colonne aperte con filetto neutro e intestazioni allineate. Matrici, casi di esercitazione e informazioni amministrative: card del sistema esistente.
- Figure complete e proporzionate. Le interfacce e i diagrammi occupano circa il 70% della regione; i poster usano l’altezza disponibile. Le didascalie restano separate.
- Le immagini composite 61 e 162 mostrano tutte le regioni originali affiancate mediante CSS. File locali e metadati di provenienza restano identici.
- Il pulsante sull’immagine apre l’ingrandimento con didascalia, focus protetto, chiusura visibile o Esc e ritorno al pulsante. I comandi della presentazione non cambiano slide mentre l’immagine è aperta.
- Il canvas si scala sui viewport stretti; gli ingrandimenti usano il viewport disponibile. Stampa e movimento ridotto sono gestiti separatamente.

## Famiglie

| Famiglia | Classe / componente | Uso |
| --- | --- | --- |
| Lettura | `reading-slide` | Titolo stabile e contenuto nei margini |
| Confronto aperto | `concept-slide` | Concetti equivalenti, intestazioni e testi allineati con subgrid |
| Affermazione | `statement-slide` | Tesi centrale e spiegazione vicina |
| Figura con testo | `figure-slide` | Artefatto completo e commento separato |
| Esempio UX | `UxExampleSlide` | Un caso per pagina, con descrizione, domanda e figura ingrandibile |
| Figura dominante | `figure-dominant` | Diagrammi e interfacce con più spazio delle spiegazioni |
| Coppia di figure | `figure-pair` | Stessa altezza e didascalie distinte |
| Regioni affiancate | `image-panels`, `LessonFigure.panels` | Sequenze contenute in un’unica immagine |
| Percorso e dipendenza | `sequence-slide`, `formula-flow` | Numeri per passi reali; connettore fra punteggio e voto finale |
| Strutture specifiche | Metro, process map, steps, tabelle e archivio | Relazioni esplicite senza forzarle in card generiche |

## Scelta per ogni slide

| Slide | Titolo | Struttura |
| --- | --- | --- |
| 1 | Comunicazione visiva e design delle interfacce · CVeDI 2026/27 | Mappa a pieno canvas e fascia di testo |
| 2 | Il corso si rinnova. | Annuncio, diagramma e invito al feedback |
| 3 | Indice delle lezioni | Indice di navigazione in matrice |
| 4 | Navigare con la tastiera | Due tabelle di scorciatoie |
| 5 | Come partecipare? | Domanda centrale |
| 6 | In una parola, come descriveresti l’ultimo semestre? | Domanda centrale |
| 7 | Il corso | Apertura di capitolo con percorso metro |
| 8 | Gli obiettivi del corso | Matrice di 4 elementi |
| 9 | Lezioni teoriche | Elenco in due colonne |
| 10 | Esercitazioni | Elenco in due colonne |
| 11 | Giorni e orari | Titolo e spiegazione |
| 12 | Calendario · settembre e ottobre | Tabella cronologica |
| 13 | Calendario · ottobre e novembre | Tabella cronologica |
| 14 | Calendario · novembre e gennaio | Tabella cronologica |
| 15 | Domande? | Domanda centrale |
| 16 | Slide e video | 3 pannelli informativi |
| 17 | Domande? | Domanda centrale |
| 18 | Modalità d’esame | Apertura di capitolo con percorso metro |
| 19 | Tre parti dell’esame | 3 pannelli informativi |
| 20 | Individuale e di gruppo | 2 pannelli informativi |
| 21 | Progetto | 2 pannelli informativi |
| 22 | Progetto: fasi | Percorso metro in quattro tappe |
| 23 | Progetto: consegna e scadenze | 2 pannelli informativi |
| 24 | WHAT IF? | Spiegazione e illustrazione editoriale |
| 25 | Dal bisogno al concept | Spiegazione e illustrazione editoriale |
| 26 | Potenzialità dell’AI | Matrice di 6 elementi |
| 27 | Spunti per partire | Matrice di 4 elementi |
| 28 | Dal concept al sito web | Spiegazione e illustrazione editoriale |
| 29 | Un percorso completo | Tre passi con numerazione esplicita |
| 30 | Progetto: requisiti | 3 pannelli informativi |
| 31 | Approfondimento | 3 pannelli informativi |
| 32 | Approfondimento: fasi | Percorso metro in quattro tappe |
| 33 | Approfondimento: attività | 2 pannelli informativi |
| 34 | Approfondimento | Affermazione centrale |
| 35 | Approfondimenti: esempi | Elenco in due colonne |
| 36 | Approfondimento: consegna | 2 pannelli informativi |
| 37 | Esame scritto in presenza | 2 pannelli informativi |
| 38 | Esame orale | Un pannello entro 900 px |
| 39 | Bibliografia | Copertina e cinque doppie pagine sfogliabili del booklet, con riferimento bibliografico |
| 40 | Regole d’esame | 5 pannelli informativi su due righe |
| 41 | Votazione | Due frazioni collegate: punteggio intermedio e voto finale; progetto oppure approfondimento |
| 42 | Date d’esame | 2 pannelli informativi |
| 43 | Progetti e approfondimenti | Distribuzione e riepilogo |
| 44 | Valutazioni orali | Distribuzione e riepilogo |
| 45 | Prove scritte | Distribuzione e riepilogo |
| 46 | Voto finale | Distribuzione e riepilogo |
| 47 | Voti finali: sei anni a confronto | Confronto annuale in tabella |
| 48 | Domande? | Domanda centrale |
| 49 | Archivio progetti | Apertura di capitolo con percorso metro |
| 50 | Archivio progetti | Archivio a pieno canvas con collegamento |
| 51 | Argomenti da approfondire? | Domanda centrale |
| 52 | Contatti | Un pannello entro 900 px |
| 53 | Introduzione a UX e UI | Apertura di capitolo con percorso metro |
| 54 | Cosa impareremo | Confronto in colonne aperte |
| 55 | Quale oggetto vi ha messo in difficoltà? | Spiegazione e domande aperte |
| 56 | Design e società | Titolo stabile, tesi centrale e spiegazione |
| 57 | Quattro funzioni del design | Matrice di 4 elementi |
| 58 | Comunicare significa orientare | 3 pannelli informativi |
| 59 | Una forma può cambiare significato | Figura dominante e testo a sinistra |
| 60 | Progettare per uno scopo | Figura completa in altezza e testo a sinistra |
| 61 | Oggetti che comunicano | Dritto e rovescio affiancati e commento a sinistra |
| 62 | Funzione, forma, vincoli | Confronto in colonne aperte |
| 63 | Come riconoscere un buon design | Matrice di 6 elementi |
| 64 | La qualità dipende dal contesto | 3 pannelli informativi |
| 65 | Attività · Leggere una porta | Figura completa in altezza e testo a sinistra |
| 66 | Comunicazione visiva | Titolo stabile, tesi centrale e spiegazione |
| 67 | Che cosa deve fare un’immagine? | 3 card: funzioni dell’immagine e applicazione illustrativa |
| 68 | Condividere una lingua visiva | Confronto in colonne aperte |
| 69 | Stessi contenuti, priorità diverse | Due form daisyUI in sola lettura con gli stessi contenuti e gerarchie diverse |
| 70 | Istruzioni che guidano l’azione | Figura dominante e testo a sinistra |
| 71 | L’interfaccia rende possibile un dialogo | Figura dominante e testo a sinistra |
| 72 | La forma incontra il contesto | 2 pannelli informativi |
| 73 | Dal bisogno alla risposta | Confronto in colonne aperte |
| 74 | Dare coerenza agli elementi | Figura dominante e testo a sinistra |
| 75 | Che cos’è la User Experience? | Titolo stabile, tesi centrale e spiegazione |
| 76 | L’esperienza attraversa il servizio | Sequenza di passi collegati |
| 77 | La UI dà forma all’interazione | Confronto in colonne aperte |
| 78 | La UI si tocca, si vede, si ascolta | Due figure storiche affiancate e confronto dei controlli |
| 79 | La UI è parte della UX | Relazione di inclusione UX/UI |
| 80 | Usabilità: riuscire a fare | Confronto in colonne aperte |
| 81 | La qualità dell’esperienza | Matrice di 6 elementi |
| 82 | Indizi, comandi, esiti | 3 card: indizio, comando e feedback |
| 83 | Dove finisce il pavimento? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 84 | Una decorazione, tanti indizi | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 85 | Il bordo deve farsi leggere | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 86 | Quando il pattern prende il sopravvento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 87 | Il percorso è una sequenza | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 88 | Progettare anche il passaggio | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 89 | Un accesso va seguito fino in fondo | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 90 | La luce come istruzione | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 91 | Forma, luce, orientamento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 92 | Lidl · anche la cassa è un’interfaccia | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 93 | La cassa continua dopo il pagamento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 94 | Ricaricare o continuare a lavorare? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 95 | Quale manopola accende quel fornello? | Esempio UX con figura orizzontale dominante, descrizione e domanda |
| 96 | Premi 1, compare 6 | Esempio UX con figura orizzontale dominante, descrizione e domanda |
| 97 | OXO · progettare la presa | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 98 | LEGO · aiutare anche a smontare | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 99 | Un menu può ostacolare un compito | Figura dominante e testo a sinistra |
| 100 | Quando l’attesa smentisce la promessa | Messaggio storico di attesa ingrandibile e commento separato |
| 101 | Che cosa fa lo UX designer? | Confronto in colonne aperte |
| 102 | Attività · UX, UI o usabilità? | 3 card con illustrazioni allineate in basso a destra |
| 103 | Un processo, molte iterazioni | 3 pannelli informativi |
| 104 | Quattordici fasi, cinque nuclei | Mappa illustrata: cinque stazioni, quattordici fasi e richiamo all’iterazione |
| 105 | Il caso: fisioterapisti e clienti | Confronto in colonne aperte |
| 106 | 1 · Impostare il progetto | Confronto in colonne aperte |
| 107 | Un obiettivo che possiamo verificare | Matrice di card: obiettivo illustrativo e criteri SMART |
| 108 | Confrontare alternative e riferimenti | 3 card per distinguere concorrenti, alternative e riferimenti |
| 109 | 2 · Comprendere problemi e persone | Confronto in colonne aperte |
| 110 | La domanda guida il metodo | 3 card: domande di ricerca e metodi |
| 111 | Viola: dal profilo al bisogno | Confronto in colonne aperte |
| 112 | Dalle evidenze alle personas | 3 card: evidenze, profilo e bisogno |
| 113 | 3 · Organizzare l’esperienza | Figura dominante e testo a sinistra |
| 114 | Dal viaggio alle decisioni nel sistema | 2 card: journey del servizio e flow con decisione esplicita |
| 115 | Condividere ciò che il prodotto deve fare | Confronto in colonne aperte |
| 116 | Concordare le priorità: MoSCoW | 4 card: priorità MoSCoW e requisiti illustrativi |
| 117 | Il concept orienta le scelte | 2 card: ipotesi di concept per lo stesso servizio |
| 118 | La moodboard rende visibile un’atmosfera | Moodboard originale ingrandibile e spiegazione separata |
| 119 | 4 · Strutturare il sistema | Figura dominante e testo a sinistra |
| 120 | Il wireframe organizza la schermata | Figura dominante e testo a sinistra |
| 121 | Dal foglio ai controlli | 3 card: progressione da zone a contenuti e controlli |
| 122 | Un test moderato ha tre elementi | 3 card: partecipante, compito e facilitatore |
| 123 | Un obiettivo, senza suggerire il percorso | 2 card: obiettivo e consegna senza suggerire il percorso |
| 124 | 5 · Verificare con un prototipo | 3 pannelli informativi |
| 125 | Dall’osservazione alla prossima verifica | 3 card: osservazione, ipotesi e prossima verifica |
| 126 | Correggere, dare forma, verificare ancora | 3 card informative |
| 127 | Design Thinking: una cornice di lavoro | Titolo stabile, tesi centrale e spiegazione |
| 128 | Cinque modalità del Design Thinking | Sequenza di passi collegati |
| 129 | Empathize e Define | Confronto in colonne aperte |
| 130 | Ideate: esplorare prima di scegliere | 3 pannelli informativi |
| 131 | Prototype e Test: imparare facendo | Confronto in colonne aperte |
| 132 | UX e Design Thinking si incontrano | Ciclo di iterazione |
| 133 | Tre idee da portare con voi | Confronto in colonne aperte |
| 134 | Verifica finale · Spiegare una scelta | Spiegazione e domande aperte |
| 135 | Storia del design | Apertura di capitolo con percorso metro |
| 136 | Cosa impareremo | Confronto in colonne aperte |
| 137 | Dall’introduzione alla storia | Titolo stabile, tesi centrale e spiegazione |
| 138 | Come leggere un artefatto | Confronto in colonne aperte |
| 139 | Un percorso, molte continuità | Sequenza di passi collegati |
| 140 | Prima della pagina | Figura dominante e testo a sinistra |
| 141 | Scrivere significa organizzare | Confronto in colonne aperte |
| 142 | Parola e immagine nel manoscritto | Figura completa in altezza e testo a sinistra |
| 143 | Segni per riconoscere | Confronto in colonne aperte |
| 144 | Cina: riprodurre e ricomporre | Figura completa in altezza e testo a sinistra |
| 145 | Gutenberg: un sistema di produzione | Confronto in colonne aperte |
| 146 | Il carattere progetta la lettura | Figura completa in altezza e testo a sinistra |
| 147 | Dalla bottega al pubblico | Confronto in colonne aperte |
| 148 | Organizzare il sapere | Confronto in colonne aperte |
| 149 | Tipografia: funzione ed espressione | Confronto in colonne aperte |
| 150 | La litografia apre nuove possibilità | Confronto in colonne aperte |
| 151 | Il manifesto entra nella città | Figura completa in altezza e testo a sinistra |
| 152 | Art Nouveau: un linguaggio integrato | Confronto in colonne aperte |
| 153 | Mucha: riconoscere un repertorio | Figura completa in altezza e testo a sinistra |
| 154 | Quando il design persuade | Confronto in colonne aperte |
| 155 | Due strategie di persuasione | Due poster completi alla stessa altezza |
| 156 | Attività · Leggere la persuasione | Spiegazione e domande aperte |
| 157 | Bauhaus: arte, tecnica, progetto | Figura completa in altezza e testo a sinistra |
| 158 | Moholy-Nagy: comporre relazioni | Figura completa in altezza e testo a sinistra |
| 159 | Albers: il colore si legge in relazione | Confronto CSS: stesso colore centrale su campiture diverse |
| 160 | Art Déco: dare forma alla modernità | Confronto in colonne aperte |
| 161 | Paul Rand: costruire un’idea visiva | Figura completa in altezza e testo a sinistra |
| 162 | La rivista come ritmo di lettura | Tre aperture affiancate e spiegazione in due colonne |
| 163 | La tipografia diventa immagine | Figura completa in altezza e testo a sinistra |
| 164 | Comporre il testo e stampare | 2 card: composizione del testo e riproduzione delle copie |
| 165 | Il tavolo di lavoro diventa software | Figura dominante e testo a sinistra |
| 166 | Sperimentare cambia la lettura | Figura completa in altezza e testo a sinistra |
| 167 | Dal leggere all’interagire | 3 pannelli informativi |
| 168 | Le interfacce hanno una storia | Titolo stabile, tesi centrale e spiegazione |
| 169 | 1968: il computer come collaborazione | Confronto in colonne aperte |
| 170 | Xerox: oggetti sullo schermo | Figura dominante e testo a sinistra |
| 171 | WIMP: quattro elementi coordinati | Matrice di 4 elementi |
| 172 | Attività · La metafora della scrivania | Spiegazione e domande aperte |
| 173 | Il primo web: testo e collegamenti | Figura dominante e testo a sinistra |
| 174 | Web 2.0: partecipazione e volume | Figura dominante e testo a sinistra |
| 175 | Scheumorfismo: riconoscere una funzione | Figura dominante e testo a sinistra |
| 176 | Flat design: ridurre il rilievo | Figura completa in altezza e testo a sinistra |
| 177 | Semplice non significa sempre usabile | Confronto in colonne aperte |
| 178 | Neumorfismo: oggetti dalla superficie | Figura dominante e testo a sinistra |
| 179 | Glassmorfismo: livelli e trasparenze | Figura dominante e testo a sinistra |
| 180 | Minimalismo: scegliere che cosa resta | Figura dominante e testo a sinistra |
| 181 | Y2K: reinterpretare un immaginario | Figura dominante e testo a sinistra |
| 182 | Massimalismo: coordinare la densità | Figura dominante e testo a sinistra |
| 183 | Brutalismo web e neobrutalismo | Figura dominante e testo a sinistra |
| 184 | Attività · Un controllo è riconoscibile? | Figura dominante e testo a sinistra |
| 185 | Tre eredità da riconoscere | Confronto in colonne aperte |
| 186 | Verifica finale · Motivare uno stile | Spiegazione e domande aperte |
| 187 | Domande? | Mappa a pieno canvas e fascia di testo |

## Verifica

`scripts/check/slides.mjs` risolve i capitoli importati e verifica 187 slide, 82 + 52 slide di lezione, 120 minuti per capitolo, fonti, note, alias, numerazione, immagini e zona del footer. I casi aggiunti dal [confronto 2025/26](../assets/slide-audit/2025-2026.json) sono compresi nelle selezioni per viewport stretto e stampa, individuati tramite alias; i casi precedenti sono risolti tramite titolo e lezione per conservare la copertura dopo gli inserimenti.

La verifica nel browser del 5 ottobre 2026 copre tutte le 187 slide su desktop e nel viewport 636 × 778. Controlla anche le 59 figure: proporzioni native, coincidenza fra larghezza e posizione di immagine e didascalia, bordo nel colore del capitolo e apertura dell'ingrandimento. Tutti i 59 ingrandimenti sono verificati anche nel viewport stretto; su desktop sono controllati Esc, ritorno del focus e isolamento delle frecce dalla navigazione Slidev. Le 46 illustrazioni nelle card si trovano a 12 px dai bordi inferiore e destro. Numerazione e avanzamento corrispondono alla lezione su tutte le slide. Lo sfogliamento del booklet è verificato con movimento normale, pausa stabile e navigazione manuale. Il rapporto conserva separatamente il transitorio del titolo animato di apertura e la sua verifica a movimento concluso.

Evidenze locali: `reports/layout-review/final/runtime-2026-10-05.json` e screenshot nella stessa cartella. Screenshot e rapporto JSON sono ignorati da Git; il sistema e le scelte restano documentati in questo file e in `docs/design.md`.
