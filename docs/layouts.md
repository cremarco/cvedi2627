# Composizioni delle slide

Le 153 slide condividono palette del booklet, font, margini e footer. La struttura varia secondo il contenuto: confrontare, seguire un percorso, leggere una tesi o osservare un artefatto. Le classi sono dichiarate nel frontmatter, senza selettori basati sul numero della pagina.

## Regole comuni

- Canvas 1280 × 720, margini laterali 68 px e titolo delle slide di lettura a 64 px dal bordo superiore. Almeno 12 px separano il contenuto dal footer.
- Aperture, domande e percorsi metro conservano il proprio centro compositivo. Le affermazioni delle lezioni mantengono il titolo comune e una tesi centrale.
- Confronti brevi: colonne aperte con filetto neutro e intestazioni allineate. Matrici, casi di esercitazione e informazioni amministrative: card del sistema esistente.
- Figure complete e proporzionate. Le interfacce e i diagrammi occupano circa il 70% della regione; i poster usano l’altezza disponibile. Le didascalie restano separate.
- Le immagini composite 61 e 129 mostrano tutte le regioni originali affiancate mediante CSS. File locali e metadati di provenienza restano identici.
- Il pulsante sull’immagine apre l’ingrandimento con didascalia, focus protetto, chiusura visibile o Esc e ritorno al pulsante. I comandi della presentazione non cambiano slide mentre l’immagine è aperta.
- Il canvas si scala sui viewport stretti; gli ingrandimenti usano il viewport disponibile. Stampa e movimento ridotto sono gestiti separatamente.

## Famiglie

| Famiglia | Classe / componente | Uso |
| --- | --- | --- |
| Lettura | `reading-slide` | Titolo stabile e contenuto nei margini |
| Confronto aperto | `concept-slide` | Concetti equivalenti, intestazioni e testi allineati con subgrid |
| Affermazione | `statement-slide` | Tesi centrale e spiegazione vicina |
| Figura con testo | `figure-slide` | Artefatto completo e commento separato |
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
| 79 | La UX esiste anche senza schermi | Carrellata di 13 esempi, testo e foto completa, selettore e navigazione |
| 80 | Un menu può ostacolare un compito | Figura dominante e testo a sinistra |
| 81 | Che cosa fa lo UX designer? | Confronto in colonne aperte |
| 82 | Attività · UX, UI o usabilità? | 3 pannelli informativi |
| 83 | Un processo, molte iterazioni | 3 pannelli informativi |
| 84 | Quattordici fasi, cinque nuclei | Mappa di cinque nuclei e quattordici fasi |
| 85 | Il caso: fisioterapisti e clienti | Confronto in colonne aperte |
| 86 | 1 · Impostare il progetto | Confronto in colonne aperte |
| 87 | 2 · Comprendere problemi e persone | Confronto in colonne aperte |
| 88 | Viola: dal profilo al bisogno | Confronto in colonne aperte |
| 89 | 3 · Organizzare l’esperienza | Figura dominante e testo a sinistra |
| 90 | Condividere ciò che il prodotto deve fare | Confronto in colonne aperte |
| 91 | 4 · Strutturare il sistema | Figura dominante e testo a sinistra |
| 92 | Il wireframe organizza la schermata | Figura dominante e testo a sinistra |
| 93 | 5 · Verificare con un prototipo | 3 pannelli informativi |
| 94 | Correggere, dare forma, verificare ancora | Confronto in colonne aperte |
| 95 | Design Thinking: una cornice di lavoro | Titolo stabile, tesi centrale e spiegazione |
| 96 | Cinque modalità del Design Thinking | Sequenza di passi collegati |
| 97 | Empathize e Define | Confronto in colonne aperte |
| 98 | Ideate: esplorare prima di scegliere | 3 pannelli informativi |
| 99 | Prototype e Test: imparare facendo | Confronto in colonne aperte |
| 100 | UX e Design Thinking si incontrano | Ciclo di iterazione |
| 101 | Tre idee da portare con voi | Confronto in colonne aperte |
| 102 | Verifica finale · Spiegare una scelta | Spiegazione e domande aperte |
| 103 | Storia del design | Apertura di capitolo con percorso metro |
| 104 | Cosa impareremo | Confronto in colonne aperte |
| 105 | Dall’introduzione alla storia | Titolo stabile, tesi centrale e spiegazione |
| 106 | Come leggere un artefatto | Confronto in colonne aperte |
| 107 | Un percorso, molte continuità | Sequenza di passi collegati |
| 108 | Prima della pagina | Figura dominante e testo a sinistra |
| 109 | Scrivere significa organizzare | Confronto in colonne aperte |
| 110 | Parola e immagine nel manoscritto | Figura completa in altezza e testo a sinistra |
| 111 | Segni per riconoscere | Confronto in colonne aperte |
| 112 | Cina: riprodurre e ricomporre | Figura completa in altezza e testo a sinistra |
| 113 | Gutenberg: un sistema di produzione | Confronto in colonne aperte |
| 114 | Il carattere progetta la lettura | Figura completa in altezza e testo a sinistra |
| 115 | Dalla bottega al pubblico | Confronto in colonne aperte |
| 116 | Organizzare il sapere | Confronto in colonne aperte |
| 117 | Tipografia: funzione ed espressione | Confronto in colonne aperte |
| 118 | La litografia apre nuove possibilità | Confronto in colonne aperte |
| 119 | Il manifesto entra nella città | Figura completa in altezza e testo a sinistra |
| 120 | Art Nouveau: un linguaggio integrato | Confronto in colonne aperte |
| 121 | Mucha: riconoscere un repertorio | Figura completa in altezza e testo a sinistra |
| 122 | Quando il design persuade | Confronto in colonne aperte |
| 123 | Due strategie di persuasione | Due poster completi alla stessa altezza |
| 124 | Attività · Leggere la persuasione | Spiegazione e domande aperte |
| 125 | Bauhaus: arte, tecnica, progetto | Figura completa in altezza e testo a sinistra |
| 126 | Moholy-Nagy: comporre relazioni | Figura completa in altezza e testo a sinistra |
| 127 | Art Déco: dare forma alla modernità | Confronto in colonne aperte |
| 128 | Paul Rand: costruire un’idea visiva | Figura completa in altezza e testo a sinistra |
| 129 | La rivista come ritmo di lettura | Tre aperture affiancate e spiegazione in due colonne |
| 130 | La tipografia diventa immagine | Figura completa in altezza e testo a sinistra |
| 131 | Il tavolo di lavoro diventa software | Figura dominante e testo a sinistra |
| 132 | Sperimentare cambia la lettura | Figura completa in altezza e testo a sinistra |
| 133 | Dal leggere all’interagire | 3 pannelli informativi |
| 134 | Le interfacce hanno una storia | Titolo stabile, tesi centrale e spiegazione |
| 135 | 1968: il computer come collaborazione | Confronto in colonne aperte |
| 136 | Xerox: oggetti sullo schermo | Figura dominante e testo a sinistra |
| 137 | WIMP: quattro elementi coordinati | Matrice di 4 elementi |
| 138 | Attività · La metafora della scrivania | Spiegazione e domande aperte |
| 139 | Il primo web: testo e collegamenti | Figura dominante e testo a sinistra |
| 140 | Web 2.0: partecipazione e volume | Figura dominante e testo a sinistra |
| 141 | Scheumorfismo: riconoscere una funzione | Figura dominante e testo a sinistra |
| 142 | Flat design: ridurre il rilievo | Figura completa in altezza e testo a sinistra |
| 143 | Semplice non significa sempre usabile | Confronto in colonne aperte |
| 144 | Neumorfismo: oggetti dalla superficie | Figura dominante e testo a sinistra |
| 145 | Glassmorfismo: livelli e trasparenze | Figura dominante e testo a sinistra |
| 146 | Minimalismo: scegliere che cosa resta | Figura dominante e testo a sinistra |
| 147 | Y2K: reinterpretare un immaginario | Figura dominante e testo a sinistra |
| 148 | Massimalismo: coordinare la densità | Figura dominante e testo a sinistra |
| 149 | Brutalismo web e neobrutalismo | Figura dominante e testo a sinistra |
| 150 | Attività · Un controllo è riconoscibile? | Figura dominante e testo a sinistra |
| 151 | Tre eredità da riconoscere | Confronto in colonne aperte |
| 152 | Verifica finale · Motivare uno stile | Spiegazione e domande aperte |
| 153 | Domande? | Mappa a pieno canvas e fascia di testo |

## Verifica

`scripts/check/slides.mjs` risolve i capitoli importati e verifica 153 slide, 50 + 50 slide di lezione, 120 minuti per capitolo, fonti, note, alias, numerazione, immagini e zona del footer. I rapporti della revisione precedente documentano un giro visivo che include tutte le slide desktop, 69 viste strette, 10 viste di stampa, due viste relatore e 9 ingrandimenti su desktop/viewport stretto.

Evidenze locali: `reports/layout-review/final/`. Screenshot e rapporto JSON sono ignorati da Git; il sistema e le scelte restano documentati in questo file e in `docs/design.md`.
