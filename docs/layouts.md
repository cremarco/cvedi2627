# Composizioni delle slide

Le 165 slide condividono palette del booklet, font, margini e footer. La struttura varia secondo il contenuto: confrontare, seguire un percorso, leggere una tesi o osservare un artefatto. Le classi sono dichiarate nel frontmatter, senza selettori basati sul numero della pagina.

## Regole comuni

- Canvas 1280 × 720, margini laterali 68 px e titolo delle slide di lettura a 64 px dal bordo superiore. Almeno 12 px separano il contenuto dal footer.
- Aperture, domande e percorsi metro conservano il proprio centro compositivo. Le affermazioni delle lezioni mantengono il titolo comune e una tesi centrale.
- Confronti brevi: colonne aperte con filetto neutro e intestazioni allineate. Matrici, casi di esercitazione e informazioni amministrative: card del sistema esistente.
- Figure complete e proporzionate. Le interfacce e i diagrammi occupano circa il 70% della regione; i poster usano l’altezza disponibile. Le didascalie restano separate.
- Le immagini composite 61 e 141 mostrano tutte le regioni originali affiancate mediante CSS. File locali e metadati di provenienza restano identici.
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
| 67 | Condividere una lingua visiva | Confronto in colonne aperte |
| 68 | Istruzioni che guidano l’azione | Figura dominante e testo a sinistra |
| 69 | L’interfaccia rende possibile un dialogo | Figura dominante e testo a sinistra |
| 70 | La forma incontra il contesto | 2 pannelli informativi |
| 71 | Dal bisogno alla risposta | Confronto in colonne aperte |
| 72 | Dare coerenza agli elementi | Figura dominante e testo a sinistra |
| 73 | Che cos’è la User Experience? | Titolo stabile, tesi centrale e spiegazione |
| 74 | L’esperienza attraversa il servizio | Sequenza di passi collegati |
| 75 | La UI dà forma all’interazione | Confronto in colonne aperte |
| 76 | La UI è parte della UX | Relazione di inclusione UX/UI |
| 77 | Usabilità: riuscire a fare | Confronto in colonne aperte |
| 78 | La qualità dell’esperienza | Matrice di 6 elementi |
| 79 | Dove finisce il pavimento? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 80 | Una decorazione, tanti indizi | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 81 | Il bordo deve farsi leggere | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 82 | Quando il pattern prende il sopravvento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 83 | Il percorso è una sequenza | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 84 | Progettare anche il passaggio | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 85 | Un accesso va seguito fino in fondo | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 86 | La luce come istruzione | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 87 | Forma, luce, orientamento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 88 | Lidl · anche la cassa è un’interfaccia | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 89 | Ricaricare o continuare a lavorare? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 90 | OXO · progettare la presa | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 91 | LEGO · aiutare anche a smontare | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 92 | Un menu può ostacolare un compito | Figura dominante e testo a sinistra |
| 93 | Che cosa fa lo UX designer? | Confronto in colonne aperte |
| 94 | Attività · UX, UI o usabilità? | 3 pannelli informativi |
| 95 | Un processo, molte iterazioni | 3 pannelli informativi |
| 96 | Quattordici fasi, cinque nuclei | Mappa illustrata: cinque stazioni, quattordici fasi e richiamo all’iterazione |
| 97 | Il caso: fisioterapisti e clienti | Confronto in colonne aperte |
| 98 | 1 · Impostare il progetto | Confronto in colonne aperte |
| 99 | 2 · Comprendere problemi e persone | Confronto in colonne aperte |
| 100 | Viola: dal profilo al bisogno | Confronto in colonne aperte |
| 101 | 3 · Organizzare l’esperienza | Figura dominante e testo a sinistra |
| 102 | Condividere ciò che il prodotto deve fare | Confronto in colonne aperte |
| 103 | 4 · Strutturare il sistema | Figura dominante e testo a sinistra |
| 104 | Il wireframe organizza la schermata | Figura dominante e testo a sinistra |
| 105 | 5 · Verificare con un prototipo | 3 pannelli informativi |
| 106 | Correggere, dare forma, verificare ancora | 3 card informative |
| 107 | Design Thinking: una cornice di lavoro | Titolo stabile, tesi centrale e spiegazione |
| 108 | Cinque modalità del Design Thinking | Sequenza di passi collegati |
| 109 | Empathize e Define | Confronto in colonne aperte |
| 110 | Ideate: esplorare prima di scegliere | 3 pannelli informativi |
| 111 | Prototype e Test: imparare facendo | Confronto in colonne aperte |
| 112 | UX e Design Thinking si incontrano | Ciclo di iterazione |
| 113 | Tre idee da portare con voi | Confronto in colonne aperte |
| 114 | Verifica finale · Spiegare una scelta | Spiegazione e domande aperte |
| 115 | Storia del design | Apertura di capitolo con percorso metro |
| 116 | Cosa impareremo | Confronto in colonne aperte |
| 117 | Dall’introduzione alla storia | Titolo stabile, tesi centrale e spiegazione |
| 118 | Come leggere un artefatto | Confronto in colonne aperte |
| 119 | Un percorso, molte continuità | Sequenza di passi collegati |
| 120 | Prima della pagina | Figura dominante e testo a sinistra |
| 121 | Scrivere significa organizzare | Confronto in colonne aperte |
| 122 | Parola e immagine nel manoscritto | Figura completa in altezza e testo a sinistra |
| 123 | Segni per riconoscere | Confronto in colonne aperte |
| 124 | Cina: riprodurre e ricomporre | Figura completa in altezza e testo a sinistra |
| 125 | Gutenberg: un sistema di produzione | Confronto in colonne aperte |
| 126 | Il carattere progetta la lettura | Figura completa in altezza e testo a sinistra |
| 127 | Dalla bottega al pubblico | Confronto in colonne aperte |
| 128 | Organizzare il sapere | Confronto in colonne aperte |
| 129 | Tipografia: funzione ed espressione | Confronto in colonne aperte |
| 130 | La litografia apre nuove possibilità | Confronto in colonne aperte |
| 131 | Il manifesto entra nella città | Figura completa in altezza e testo a sinistra |
| 132 | Art Nouveau: un linguaggio integrato | Confronto in colonne aperte |
| 133 | Mucha: riconoscere un repertorio | Figura completa in altezza e testo a sinistra |
| 134 | Quando il design persuade | Confronto in colonne aperte |
| 135 | Due strategie di persuasione | Due poster completi alla stessa altezza |
| 136 | Attività · Leggere la persuasione | Spiegazione e domande aperte |
| 137 | Bauhaus: arte, tecnica, progetto | Figura completa in altezza e testo a sinistra |
| 138 | Moholy-Nagy: comporre relazioni | Figura completa in altezza e testo a sinistra |
| 139 | Art Déco: dare forma alla modernità | Confronto in colonne aperte |
| 140 | Paul Rand: costruire un’idea visiva | Figura completa in altezza e testo a sinistra |
| 141 | La rivista come ritmo di lettura | Tre aperture affiancate e spiegazione in due colonne |
| 142 | La tipografia diventa immagine | Figura completa in altezza e testo a sinistra |
| 143 | Il tavolo di lavoro diventa software | Figura dominante e testo a sinistra |
| 144 | Sperimentare cambia la lettura | Figura completa in altezza e testo a sinistra |
| 145 | Dal leggere all’interagire | 3 pannelli informativi |
| 146 | Le interfacce hanno una storia | Titolo stabile, tesi centrale e spiegazione |
| 147 | 1968: il computer come collaborazione | Confronto in colonne aperte |
| 148 | Xerox: oggetti sullo schermo | Figura dominante e testo a sinistra |
| 149 | WIMP: quattro elementi coordinati | Matrice di 4 elementi |
| 150 | Attività · La metafora della scrivania | Spiegazione e domande aperte |
| 151 | Il primo web: testo e collegamenti | Figura dominante e testo a sinistra |
| 152 | Web 2.0: partecipazione e volume | Figura dominante e testo a sinistra |
| 153 | Scheumorfismo: riconoscere una funzione | Figura dominante e testo a sinistra |
| 154 | Flat design: ridurre il rilievo | Figura completa in altezza e testo a sinistra |
| 155 | Semplice non significa sempre usabile | Confronto in colonne aperte |
| 156 | Neumorfismo: oggetti dalla superficie | Figura dominante e testo a sinistra |
| 157 | Glassmorfismo: livelli e trasparenze | Figura dominante e testo a sinistra |
| 158 | Minimalismo: scegliere che cosa resta | Figura dominante e testo a sinistra |
| 159 | Y2K: reinterpretare un immaginario | Figura dominante e testo a sinistra |
| 160 | Massimalismo: coordinare la densità | Figura dominante e testo a sinistra |
| 161 | Brutalismo web e neobrutalismo | Figura dominante e testo a sinistra |
| 162 | Attività · Un controllo è riconoscibile? | Figura dominante e testo a sinistra |
| 163 | Tre eredità da riconoscere | Confronto in colonne aperte |
| 164 | Verifica finale · Motivare uno stile | Spiegazione e domande aperte |
| 165 | Domande? | Mappa a pieno canvas e fascia di testo |

## Verifica

`scripts/check/slides.mjs` risolve i capitoli importati e verifica 165 slide, 62 + 50 slide di lezione, 120 minuti per capitolo, fonti, note, alias, numerazione, immagini e zona del footer. I rapporti della revisione precedente documentano un giro visivo che include tutte le slide desktop, 69 viste strette, 10 viste di stampa, due viste relatore e 9 ingrandimenti su desktop/viewport stretto.

Evidenze locali: `reports/layout-review/final/`. Screenshot e rapporto JSON sono ignorati da Git; il sistema e le scelte restano documentati in questo file e in `docs/design.md`.
