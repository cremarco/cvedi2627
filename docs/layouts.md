# Composizioni delle slide

Le 202 slide condividono palette del booklet, font, margini e footer. La struttura varia secondo il contenuto: confrontare, seguire un percorso, leggere una tesi o osservare un artefatto. Le classi sono dichiarate nel frontmatter, senza selettori basati sul numero della pagina.

## Regole comuni

- Canvas 1280 × 720, margini laterali 68 px e titolo delle slide di lettura a 64 px dal bordo superiore. Almeno 12 px separano il contenuto dal footer.
- Aperture, domande e percorsi metro conservano il proprio centro compositivo. Le affermazioni delle lezioni mantengono il titolo comune e una tesi centrale.
- Confronti brevi: colonne aperte con filetto neutro e intestazioni allineate. Matrici, casi di esercitazione e informazioni amministrative: card del sistema esistente.
- Figure complete e proporzionate. Le interfacce e i diagrammi occupano circa il 70% della regione; i poster usano l’altezza disponibile. Le didascalie restano separate.
- Le immagini composite 76 e 177 mostrano tutte le regioni originali affiancate mediante CSS. File locali e metadati di provenienza restano identici.
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
| 31 | Dal brief alle decisioni | Matrice di 4 card: persone, AI, identità e sito |
| 32 | Ricerca: alternative e riferimenti | 2 card illustrate: interfacce comparabili e riferimenti mirati |
| 33 | Tre profili, bisogni diversi | 3 card illustrate: obiettivo, contesto, fiducia e delega |
| 34 | Dare una direzione al concept | 3 card illustrate: messaggio, linguaggio visivo e motivazione |
| 35 | Organizzare il sito WHAT IF? | Matrice di 6 card: architettura di partenza del sito WHAT IF? |
| 36 | Dal percorso ai wireframe | 2 card illustrate: wireframe responsive e user flow/storyboard |
| 37 | Un flusso da verificare | 3 passi numerati con card: scegliere, configurare e confermare |
| 38 | Dallo stile al design system | 3 card illustrate: fondamenti, componenti e applicazione |
| 39 | Mockup: coprire pagine e stati | 3 card illustrate: tipologie di pagina, dispositivi e stati |
| 40 | Revisioni: mostrare e motivare | Matrice di 4 card: progressione delle revisioni |
| 41 | Tre materiali per la consegna | 3 card illustrate: sito, design system e documentazione; condizioni di consegna separate |
| 42 | Codice leggibile e verificato | 3 card illustrate: organizzazione, HTML/CSS e risorse |
| 43 | Il design system finale | 3 card illustrate: identità, componenti ed esempi di applicazione |
| 44 | Documentare l’evoluzione | 3 card illustrate: punto di partenza, modifiche ed esito |
| 45 | Come verrà letto il progetto | Matrice di 4 card: criteri di valutazione del progetto |
| 46 | Approfondimento | 3 pannelli informativi |
| 47 | Approfondimento: fasi | Percorso metro in quattro tappe |
| 48 | Approfondimento: attività | 2 pannelli informativi |
| 49 | Approfondimento | Affermazione centrale |
| 50 | Approfondimenti: esempi | Elenco in due colonne |
| 51 | Approfondimento: consegna | 2 pannelli informativi |
| 52 | Esame scritto in presenza | 2 pannelli informativi |
| 53 | Esame orale | Un pannello entro 900 px |
| 54 | Bibliografia | Copertina e cinque doppie pagine sfogliabili del booklet, con riferimento bibliografico |
| 55 | Regole d’esame | 5 pannelli informativi su due righe |
| 56 | Votazione | Due frazioni collegate: punteggio intermedio e voto finale; progetto oppure approfondimento |
| 57 | Date d’esame | 2 pannelli informativi |
| 58 | Progetti e approfondimenti | Distribuzione e riepilogo |
| 59 | Valutazioni orali | Distribuzione e riepilogo |
| 60 | Prove scritte | Distribuzione e riepilogo |
| 61 | Voto finale | Distribuzione e riepilogo |
| 62 | Voti finali: sei anni a confronto | Confronto annuale in tabella |
| 63 | Domande? | Domanda centrale |
| 64 | Archivio progetti | Apertura di capitolo con percorso metro |
| 65 | Archivio progetti | Archivio a pieno canvas con collegamento |
| 66 | Argomenti da approfondire? | Domanda centrale |
| 67 | Contatti | Un pannello entro 900 px |
| 68 | Introduzione a UX e UI | Apertura di capitolo con percorso metro |
| 69 | Cosa impareremo | Confronto in colonne aperte |
| 70 | Quale oggetto vi ha messo in difficoltà? | Spiegazione e domande aperte |
| 71 | Design e società | Titolo stabile, tesi centrale e spiegazione |
| 72 | Quattro funzioni del design | Matrice di 4 elementi |
| 73 | Comunicare significa orientare | 3 pannelli informativi |
| 74 | Una forma può cambiare significato | Figura dominante e testo a sinistra |
| 75 | Progettare per uno scopo | Figura completa in altezza e testo a sinistra |
| 76 | Oggetti che comunicano | Dritto e rovescio affiancati e commento a sinistra |
| 77 | Funzione, forma, vincoli | Confronto in colonne aperte |
| 78 | Come riconoscere un buon design | Matrice di 6 elementi |
| 79 | La qualità dipende dal contesto | 3 pannelli informativi |
| 80 | Attività · Leggere una porta | Figura completa in altezza e testo a sinistra |
| 81 | Comunicazione visiva | Titolo stabile, tesi centrale e spiegazione |
| 82 | Che cosa deve fare un’immagine? | 3 card: funzioni dell’immagine e applicazione illustrativa |
| 83 | Condividere una lingua visiva | Confronto in colonne aperte |
| 84 | Stessi contenuti, priorità diverse | Due form daisyUI in sola lettura con gli stessi contenuti e gerarchie diverse |
| 85 | Istruzioni che guidano l’azione | Figura dominante e testo a sinistra |
| 86 | L’interfaccia rende possibile un dialogo | Figura dominante e testo a sinistra |
| 87 | La forma incontra il contesto | 2 pannelli informativi |
| 88 | Dal bisogno alla risposta | Confronto in colonne aperte |
| 89 | Dare coerenza agli elementi | Figura dominante e testo a sinistra |
| 90 | Che cos’è la User Experience? | Titolo stabile, tesi centrale e spiegazione |
| 91 | L’esperienza attraversa il servizio | Sequenza di passi collegati |
| 92 | La UI dà forma all’interazione | Confronto in colonne aperte |
| 93 | La UI si tocca, si vede, si ascolta | Due figure storiche affiancate e confronto dei controlli |
| 94 | La UI è parte della UX | Relazione di inclusione UX/UI |
| 95 | Usabilità: riuscire a fare | Confronto in colonne aperte |
| 96 | La qualità dell’esperienza | Matrice di 6 elementi |
| 97 | Indizi, comandi, esiti | 3 card: indizio, comando e feedback |
| 98 | Dove finisce il pavimento? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 99 | Una decorazione, tanti indizi | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 100 | Il bordo deve farsi leggere | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 101 | Quando il pattern prende il sopravvento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 102 | Il percorso è una sequenza | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 103 | Progettare anche il passaggio | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 104 | Un accesso va seguito fino in fondo | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 105 | La luce come istruzione | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 106 | Forma, luce, orientamento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 107 | Lidl · anche la cassa è un’interfaccia | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 108 | La cassa continua dopo il pagamento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 109 | Ricaricare o continuare a lavorare? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 110 | Quale manopola accende quel fornello? | Esempio UX con figura orizzontale dominante, descrizione e domanda |
| 111 | Premi 1, compare 6 | Esempio UX con figura orizzontale dominante, descrizione e domanda |
| 112 | OXO · progettare la presa | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 113 | LEGO · aiutare anche a smontare | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 114 | Un menu può ostacolare un compito | Figura dominante e testo a sinistra |
| 115 | Quando l’attesa smentisce la promessa | Messaggio storico di attesa ingrandibile e commento separato |
| 116 | Che cosa fa lo UX designer? | Confronto in colonne aperte |
| 117 | Attività · UX, UI o usabilità? | 3 card con illustrazioni allineate in basso a destra |
| 118 | Un processo, molte iterazioni | 3 pannelli informativi |
| 119 | Quattordici fasi, cinque nuclei | Mappa illustrata: cinque stazioni, quattordici fasi e richiamo all’iterazione |
| 120 | Il caso: fisioterapisti e clienti | Confronto in colonne aperte |
| 121 | 1 · Impostare il progetto | Confronto in colonne aperte |
| 122 | Un obiettivo che possiamo verificare | Matrice di card: obiettivo illustrativo e criteri SMART |
| 123 | Confrontare alternative e riferimenti | 3 card per distinguere concorrenti, alternative e riferimenti |
| 124 | 2 · Comprendere problemi e persone | Confronto in colonne aperte |
| 125 | La domanda guida il metodo | 3 card: domande di ricerca e metodi |
| 126 | Viola: dal profilo al bisogno | Confronto in colonne aperte |
| 127 | Dalle evidenze alle personas | 3 card: evidenze, profilo e bisogno |
| 128 | 3 · Organizzare l’esperienza | Figura dominante e testo a sinistra |
| 129 | Dal viaggio alle decisioni nel sistema | 2 card: journey del servizio e flow con decisione esplicita |
| 130 | Condividere ciò che il prodotto deve fare | Confronto in colonne aperte |
| 131 | Concordare le priorità: MoSCoW | 4 card: priorità MoSCoW e requisiti illustrativi |
| 132 | Il concept orienta le scelte | 2 card: ipotesi di concept per lo stesso servizio |
| 133 | La moodboard rende visibile un’atmosfera | Moodboard originale ingrandibile e spiegazione separata |
| 134 | 4 · Strutturare il sistema | Figura dominante e testo a sinistra |
| 135 | Il wireframe organizza la schermata | Figura dominante e testo a sinistra |
| 136 | Dal foglio ai controlli | 3 card: progressione da zone a contenuti e controlli |
| 137 | Un test moderato ha tre elementi | 3 card: partecipante, compito e facilitatore |
| 138 | Un obiettivo, senza suggerire il percorso | 2 card: obiettivo e consegna senza suggerire il percorso |
| 139 | 5 · Verificare con un prototipo | 3 pannelli informativi |
| 140 | Dall’osservazione alla prossima verifica | 3 card: osservazione, ipotesi e prossima verifica |
| 141 | Correggere, dare forma, verificare ancora | 3 card informative |
| 142 | Design Thinking: una cornice di lavoro | Titolo stabile, tesi centrale e spiegazione |
| 143 | Cinque modalità del Design Thinking | Sequenza di passi collegati |
| 144 | Empathize e Define | Confronto in colonne aperte |
| 145 | Ideate: esplorare prima di scegliere | 3 pannelli informativi |
| 146 | Prototype e Test: imparare facendo | Confronto in colonne aperte |
| 147 | UX e Design Thinking si incontrano | Ciclo di iterazione |
| 148 | Tre idee da portare con voi | Confronto in colonne aperte |
| 149 | Verifica finale · Spiegare una scelta | Spiegazione e domande aperte |
| 150 | Storia del design | Apertura di capitolo con percorso metro |
| 151 | Cosa impareremo | Confronto in colonne aperte |
| 152 | Dall’introduzione alla storia | Titolo stabile, tesi centrale e spiegazione |
| 153 | Come leggere un artefatto | Confronto in colonne aperte |
| 154 | Un percorso, molte continuità | Sequenza di passi collegati |
| 155 | Prima della pagina | Figura dominante e testo a sinistra |
| 156 | Scrivere significa organizzare | Confronto in colonne aperte |
| 157 | Parola e immagine nel manoscritto | Figura completa in altezza e testo a sinistra |
| 158 | Segni per riconoscere | Confronto in colonne aperte |
| 159 | Cina: riprodurre e ricomporre | Figura completa in altezza e testo a sinistra |
| 160 | Gutenberg: un sistema di produzione | Confronto in colonne aperte |
| 161 | Il carattere progetta la lettura | Figura completa in altezza e testo a sinistra |
| 162 | Dalla bottega al pubblico | Confronto in colonne aperte |
| 163 | Organizzare il sapere | Confronto in colonne aperte |
| 164 | Tipografia: funzione ed espressione | Confronto in colonne aperte |
| 165 | La litografia apre nuove possibilità | Confronto in colonne aperte |
| 166 | Il manifesto entra nella città | Figura completa in altezza e testo a sinistra |
| 167 | Art Nouveau: un linguaggio integrato | Confronto in colonne aperte |
| 168 | Mucha: riconoscere un repertorio | Figura completa in altezza e testo a sinistra |
| 169 | Quando il design persuade | Confronto in colonne aperte |
| 170 | Due strategie di persuasione | Due poster completi alla stessa altezza |
| 171 | Attività · Leggere la persuasione | Spiegazione e domande aperte |
| 172 | Bauhaus: arte, tecnica, progetto | Figura completa in altezza e testo a sinistra |
| 173 | Moholy-Nagy: comporre relazioni | Figura completa in altezza e testo a sinistra |
| 174 | Albers: il colore si legge in relazione | Confronto CSS: stesso colore centrale su campiture diverse |
| 175 | Art Déco: dare forma alla modernità | Confronto in colonne aperte |
| 176 | Paul Rand: costruire un’idea visiva | Figura completa in altezza e testo a sinistra |
| 177 | La rivista come ritmo di lettura | Tre aperture affiancate e spiegazione in due colonne |
| 178 | La tipografia diventa immagine | Figura completa in altezza e testo a sinistra |
| 179 | Comporre il testo e stampare | 2 card: composizione del testo e riproduzione delle copie |
| 180 | Il tavolo di lavoro diventa software | Figura dominante e testo a sinistra |
| 181 | Sperimentare cambia la lettura | Figura completa in altezza e testo a sinistra |
| 182 | Dal leggere all’interagire | 3 pannelli informativi |
| 183 | Le interfacce hanno una storia | Titolo stabile, tesi centrale e spiegazione |
| 184 | 1968: il computer come collaborazione | Confronto in colonne aperte |
| 185 | Xerox: oggetti sullo schermo | Figura dominante e testo a sinistra |
| 186 | WIMP: quattro elementi coordinati | Matrice di 4 elementi |
| 187 | Attività · La metafora della scrivania | Spiegazione e domande aperte |
| 188 | Il primo web: testo e collegamenti | Figura dominante e testo a sinistra |
| 189 | Web 2.0: partecipazione e volume | Figura dominante e testo a sinistra |
| 190 | Scheumorfismo: riconoscere una funzione | Figura dominante e testo a sinistra |
| 191 | Flat design: ridurre il rilievo | Figura completa in altezza e testo a sinistra |
| 192 | Semplice non significa sempre usabile | Confronto in colonne aperte |
| 193 | Neumorfismo: oggetti dalla superficie | Figura dominante e testo a sinistra |
| 194 | Glassmorfismo: livelli e trasparenze | Figura dominante e testo a sinistra |
| 195 | Minimalismo: scegliere che cosa resta | Figura dominante e testo a sinistra |
| 196 | Y2K: reinterpretare un immaginario | Figura dominante e testo a sinistra |
| 197 | Massimalismo: coordinare la densità | Figura dominante e testo a sinistra |
| 198 | Brutalismo web e neobrutalismo | Figura dominante e testo a sinistra |
| 199 | Attività · Un controllo è riconoscibile? | Figura dominante e testo a sinistra |
| 200 | Tre eredità da riconoscere | Confronto in colonne aperte |
| 201 | Verifica finale · Motivare uno stile | Spiegazione e domande aperte |
| 202 | Domande? | Mappa a pieno canvas e fascia di testo |

## Verifica

`scripts/check/slides.mjs` risolve i capitoli importati e verifica 202 slide, incluse le 15 slide operative del brief e le 82 + 52 slide di lezione, 120 minuti per capitolo, fonti, note, alias, numerazione, immagini e zona del footer. I casi aggiunti dal [confronto 2025/26](../assets/slide-audit/2025-2026.json) sono compresi nelle selezioni per viewport stretto e stampa, individuati tramite alias; i casi precedenti sono risolti tramite titolo e lezione per conservare la copertura dopo gli inserimenti.

La verifica nel browser del 5 ottobre 2026 documenta la baseline precedente di 187 slide su desktop e nel viewport 636 × 778. Controlla anche le 59 figure: proporzioni native, coincidenza fra larghezza e posizione di immagine e didascalia, bordo nel colore del capitolo e apertura dell'ingrandimento. Tutti i 59 ingrandimenti sono verificati anche nel viewport stretto; su desktop sono controllati Esc, ritorno del focus e isolamento delle frecce dalla navigazione Slidev. Le 46 illustrazioni nelle card si trovano a 12 px dai bordi inferiore e destro. Numerazione e avanzamento corrispondono alla lezione su tutte le slide. Lo sfogliamento del booklet è verificato con movimento normale, pausa stabile e navigazione manuale. Il rapporto conserva separatamente il transitorio del titolo animato di apertura e la sua verifica a movimento concluso.

Evidenze della baseline di 187 slide: `reports/layout-review/final/runtime-2026-10-05.json` e screenshot nella stessa cartella. Le 15 slide operative del brief introdotte successivamente richiedono una verifica distinta; il rapporto precedente non attesta il deck attuale di 202 slide. Screenshot e rapporto JSON sono ignorati da Git; il sistema e le scelte restano documentati in questo file e in `docs/design.md`.
