# Composizioni delle slide

Le 221 slide condividono palette del booklet, font, margini e footer. La struttura varia secondo il contenuto: confrontare, seguire un percorso, leggere una tesi o osservare un artefatto. Le classi sono dichiarate nel frontmatter, senza selettori basati sul numero della pagina.

## Regole comuni

- Canvas 1280 × 720, margini laterali 68 px e titolo delle slide di lettura a 64 px dal bordo superiore. Almeno 12 px separano il contenuto dal footer.
- Aperture, domande e percorsi metro conservano il proprio centro compositivo. Le affermazioni delle lezioni mantengono il titolo comune e una tesi centrale.
- Confronti brevi: colonne aperte con filetto neutro e intestazioni allineate. Matrici, casi di esercitazione e informazioni amministrative: card del sistema esistente.
- Figure complete e proporzionate. Le interfacce e i diagrammi occupano circa il 70% della regione; i poster usano l’altezza disponibile. Le didascalie restano separate. Il comando «Ingrandisci» si trova sopra la figura, allineato al suo bordo destro; la didascalia resta sotto.
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
| 3 | Indice delle lezioni | Indice delle lezioni e accesso autonomo al brief |
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
| 24 | Approfondimento | 3 pannelli informativi |
| 25 | Approfondimento: fasi | Percorso metro in quattro tappe |
| 26 | Approfondimento: attività | 2 pannelli informativi |
| 27 | Approfondimento | Affermazione centrale |
| 28 | Approfondimenti: esempi | Elenco in due colonne |
| 29 | Approfondimento: consegna | 2 pannelli informativi |
| 30 | Esame scritto in presenza | 2 pannelli informativi |
| 31 | Esame orale | Un pannello entro 900 px |
| 32 | Bibliografia | Copertina e cinque doppie pagine sfogliabili del booklet, con riferimento bibliografico |
| 33 | Regole d’esame | 5 pannelli informativi su due righe |
| 34 | Votazione | Due frazioni collegate: punteggio intermedio e voto finale; progetto oppure approfondimento |
| 35 | Date d’esame | 2 pannelli informativi |
| 36 | Progetti e approfondimenti | Distribuzione e riepilogo |
| 37 | Valutazioni orali | Distribuzione e riepilogo |
| 38 | Prove scritte | Distribuzione e riepilogo |
| 39 | Voto finale | Distribuzione e riepilogo |
| 40 | Voti finali: sei anni a confronto | Confronto annuale in tabella |
| 41 | Domande? | Domanda centrale |
| 42 | Archivio progetti | Apertura di capitolo con percorso metro |
| 43 | Archivio progetti | Archivio a pieno canvas con collegamento |
| 44 | Argomenti da approfondire? | Domanda centrale |
| 45 | Contatti | Un pannello entro 900 px |
| 46 | Brief di progetto | Apertura autonoma con percorso metro |
| 47 | Obiettivo e percorso | 3 card illustrate e indice interno del brief |
| 48 | WHAT IF? | Spiegazione e illustrazione editoriale |
| 49 | Dal bisogno al concept | Spiegazione e illustrazione editoriale |
| 50 | Potenzialità dell’AI | Matrice di 6 elementi |
| 51 | Spunti per partire | Matrice di 4 elementi |
| 52 | Dal concept al sito web | Spiegazione e illustrazione editoriale |
| 53 | Un percorso completo | Tre passi con numerazione esplicita |
| 54 | Progetto: requisiti | 3 pannelli informativi |
| 55 | Dal brief alle decisioni | Matrice di 4 card: persone, AI, identità e sito |
| 56 | Ricerca: alternative e riferimenti | 2 card illustrate: interfacce comparabili e riferimenti mirati |
| 57 | Tre profili, bisogni diversi | 3 card illustrate: obiettivo, contesto, fiducia e delega |
| 58 | Dare una direzione al concept | 3 card illustrate: messaggio, linguaggio visivo e motivazione |
| 59 | Organizzare il sito WHAT IF? | Alberatura nativa: homepage, sezioni e tre schede del catalogo |
| 60 | Dal percorso ai wireframe | 2 card illustrate: wireframe responsive e user flow/storyboard |
| 61 | Un flusso da verificare | 3 passi numerati con card: scegliere, configurare e confermare |
| 62 | Dallo stile al design system | 3 card illustrate: fondamenti, componenti e applicazione |
| 63 | Mockup: coprire pagine e stati | 3 card illustrate: tipologie di pagina, dispositivi e stati |
| 64 | Revisioni: mostrare e motivare | Matrice di 4 card: progressione delle revisioni |
| 65 | Tre materiali per la consegna | 3 card illustrate: sito, design system e documentazione; condizioni di consegna separate |
| 66 | Codice leggibile e verificato | 3 card illustrate: organizzazione, HTML/CSS e risorse |
| 67 | Il design system finale | 3 card illustrate: identità, componenti ed esempi di applicazione |
| 68 | Documentare l’evoluzione | 3 card illustrate: punto di partenza, modifiche ed esito |
| 69 | Come verrà letto il progetto | Matrice di 4 card: criteri di valutazione del progetto |
| 70 | Prima della consegna | 3 card illustrate: requisiti, materiali e comunicazioni |
| 71 | Introduzione a UX e UI | Apertura di capitolo con percorso metro |
| 72 | Cosa impareremo | Confronto in colonne aperte |
| 73 | Quale oggetto vi ha messo in difficoltà? | Spiegazione e domande aperte |
| 74 | Design e società | Titolo stabile, tesi centrale e spiegazione |
| 75 | Quattro funzioni del design | Matrice di 4 elementi |
| 76 | Comunicare significa orientare | 3 pannelli informativi |
| 77 | Una forma può cambiare significato | Figura dominante e testo a sinistra |
| 78 | Progettare per uno scopo | Figura completa in altezza e testo a sinistra |
| 79 | Oggetti che comunicano | Dritto e rovescio affiancati e commento a sinistra |
| 80 | Funzione, forma, vincoli | Confronto in colonne aperte |
| 81 | Come riconoscere un buon design | Matrice di 6 elementi |
| 82 | La qualità dipende dal contesto | 3 pannelli informativi |
| 83 | Attività · Leggere una porta | Figura completa in altezza e testo a sinistra |
| 84 | Comunicazione visiva | Titolo stabile, tesi centrale e spiegazione |
| 85 | Che cosa deve fare un’immagine? | 3 card: funzioni dell’immagine e applicazione illustrativa |
| 86 | Condividere una lingua visiva | Confronto in colonne aperte |
| 87 | Stessi contenuti, priorità diverse | Due form daisyUI in sola lettura con gli stessi contenuti e gerarchie diverse |
| 88 | Istruzioni che guidano l’azione | Figura dominante e testo a sinistra |
| 89 | L’interfaccia rende possibile un dialogo | Figura dominante e testo a sinistra |
| 90 | La forma incontra il contesto | 2 pannelli informativi |
| 91 | Dal bisogno alla risposta | Confronto in colonne aperte |
| 92 | Dare coerenza agli elementi | Figura dominante e testo a sinistra |
| 93 | Che cos’è la User Experience? | Titolo stabile, tesi centrale e spiegazione |
| 94 | L’esperienza attraversa il servizio | Sequenza di passi collegati |
| 95 | La UI dà forma all’interazione | Confronto in colonne aperte |
| 96 | La UI si tocca, si vede, si ascolta | Due figure storiche affiancate e confronto dei controlli |
| 97 | La UI è parte della UX | Relazione di inclusione UX/UI |
| 98 | Usabilità: riuscire a fare | Confronto in colonne aperte |
| 99 | La qualità dell’esperienza | Matrice di 6 elementi |
| 100 | Indizi, comandi, esiti | 3 card: indizio, comando e feedback |
| 101 | Dove finisce il pavimento? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 102 | Una decorazione, tanti indizi | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 103 | Il bordo deve farsi leggere | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 104 | Quando il pattern prende il sopravvento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 105 | Il percorso è una sequenza | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 106 | Progettare anche il passaggio | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 107 | Un accesso va seguito fino in fondo | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 108 | La luce come istruzione | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 109 | Forma, luce, orientamento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 110 | Lidl · anche la cassa è un’interfaccia | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 111 | La cassa continua dopo il pagamento | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 112 | Ricaricare o continuare a lavorare? | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 113 | Quale manopola accende quel fornello? | Esempio UX con figura orizzontale dominante, descrizione e domanda |
| 114 | Premi 1, compare 6 | Esempio UX con figura orizzontale dominante, descrizione e domanda |
| 115 | OXO · progettare la presa | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 116 | LEGO · aiutare anche a smontare | Esempio UX con descrizione, domanda e immagine completa ingrandibile |
| 117 | Un menu può ostacolare un compito | Figura dominante e testo a sinistra |
| 118 | Quando l’attesa smentisce la promessa | Messaggio storico di attesa ingrandibile e commento separato |
| 119 | Che cosa fa lo UX designer? | Confronto in colonne aperte |
| 120 | Attività · UX, UI o usabilità? | 3 card con illustrazioni allineate in basso a destra |
| 121 | Un processo, molte iterazioni | 3 pannelli informativi |
| 122 | Quattordici fasi, cinque nuclei | Mappa illustrata: cinque stazioni, quattordici fasi e richiamo all’iterazione |
| 123 | Il caso: fisioterapisti e clienti | Confronto in colonne aperte |
| 124 | 1 · Impostare il progetto | Confronto in colonne aperte |
| 125 | Un obiettivo che possiamo verificare | Matrice di card: obiettivo illustrativo e criteri SMART |
| 126 | Confrontare alternative e riferimenti | 3 card per distinguere concorrenti, alternative e riferimenti |
| 127 | 2 · Comprendere problemi e persone | Confronto in colonne aperte |
| 128 | La domanda guida il metodo | 3 card: domande di ricerca e metodi |
| 129 | Viola: dal profilo al bisogno | Confronto in colonne aperte |
| 130 | Dalle evidenze alle personas | 3 card: evidenze, profilo e bisogno |
| 131 | 3 · Organizzare l’esperienza | Figura dominante e testo a sinistra |
| 132 | Dal viaggio alle decisioni nel sistema | 2 card: journey del servizio e flow con decisione esplicita |
| 133 | Condividere ciò che il prodotto deve fare | Confronto in colonne aperte |
| 134 | Concordare le priorità: MoSCoW | 4 card: priorità MoSCoW e requisiti illustrativi |
| 135 | Il concept orienta le scelte | 2 card: ipotesi di concept per lo stesso servizio |
| 136 | La moodboard rende visibile un’atmosfera | Moodboard originale ingrandibile e spiegazione separata |
| 137 | 4 · Strutturare il sistema | Figura dominante e testo a sinistra |
| 138 | Il wireframe organizza la schermata | Figura dominante e testo a sinistra |
| 139 | Dal foglio ai controlli | 3 card: progressione da zone a contenuti e controlli |
| 140 | Un test moderato ha tre elementi | 3 card: partecipante, compito e facilitatore |
| 141 | Un obiettivo, senza suggerire il percorso | 2 card: obiettivo e consegna senza suggerire il percorso |
| 142 | 5 · Verificare con un prototipo | 3 pannelli informativi |
| 143 | Dall’osservazione alla prossima verifica | 3 card: osservazione, ipotesi e prossima verifica |
| 144 | Correggere, dare forma, verificare ancora | 3 card informative |
| 145 | Design Thinking: una cornice di lavoro | Titolo stabile, tesi centrale e spiegazione |
| 146 | Cinque modalità del Design Thinking | Sequenza di passi collegati |
| 147 | Empathize e Define | Confronto in colonne aperte |
| 148 | Ideate: esplorare prima di scegliere | 3 pannelli informativi |
| 149 | Prototype e Test: imparare facendo | Confronto in colonne aperte |
| 150 | UX e Design Thinking si incontrano | Ciclo di iterazione |
| 151 | Tre idee da portare con voi | Confronto in colonne aperte |
| 152 | Verifica finale · Spiegare una scelta | Spiegazione e domande aperte |
| 153 | Storia del design | Apertura di capitolo con percorso metro |
| 154 | Cosa impareremo | Testo e confronti aperti, con richiami al percorso del capitolo |
| 155 | Dall’introduzione alla storia | Testo e confronti aperti, con richiami al percorso del capitolo |
| 156 | Come leggere un artefatto | Testo e confronti aperti, con richiami al percorso del capitolo |
| 157 | Un percorso, molte continuità | Testo e confronti aperti, con richiami al percorso del capitolo |
| 158 | Prima della pagina | Figura o confronto documentato con didascalia e ingrandimento |
| 159 | Scrivere significa organizzare | Testo e confronti aperti, con richiami al percorso del capitolo |
| 160 | Parola e immagine nel manoscritto | Figura o confronto documentato con didascalia e ingrandimento |
| 161 | Segni per riconoscere | Testo e confronti aperti, con richiami al percorso del capitolo |
| 162 | Cina: riprodurre e ricomporre | Figura o confronto documentato con didascalia e ingrandimento |
| 163 | Prima di Gutenberg: il Jikji | Figura o confronto documentato con didascalia e ingrandimento |
| 164 | Gutenberg: un sistema di produzione | Testo e confronti aperti, con richiami al percorso del capitolo |
| 165 | Il carattere progetta la lettura | Figura o confronto documentato con didascalia e ingrandimento |
| 166 | Dalla bottega al pubblico | Testo e confronti aperti, con richiami al percorso del capitolo |
| 167 | Organizzare il sapere | Testo e confronti aperti, con richiami al percorso del capitolo |
| 168 | Tipografia: funzione ed espressione | Testo e confronti aperti, con richiami al percorso del capitolo |
| 169 | La litografia apre nuove possibilità | Testo e confronti aperti, con richiami al percorso del capitolo |
| 170 | Il manifesto entra nella città | Figura o confronto documentato con didascalia e ingrandimento |
| 171 | Art Nouveau: un linguaggio integrato | Testo e confronti aperti, con richiami al percorso del capitolo |
| 172 | Mucha: riconoscere un repertorio | Figura o confronto documentato con didascalia e ingrandimento |
| 173 | Behrens e AEG: un’identità coordinata | Figura o confronto documentato con didascalia e ingrandimento |
| 174 | Quando il design persuade | Testo e confronti aperti, con richiami al percorso del capitolo |
| 175 | Due strategie di persuasione | Figura o confronto documentato con didascalia e ingrandimento |
| 176 | Attività · Leggere la persuasione | Attività e domande aperte |
| 177 | Bauhaus: arte, tecnica, progetto | Figura o confronto documentato con didascalia e ingrandimento |
| 178 | Moholy-Nagy: comporre relazioni | Figura o confronto documentato con didascalia e ingrandimento |
| 179 | Albers: il colore si legge in relazione | Testo e confronti aperti, con richiami al percorso del capitolo |
| 180 | Art Déco: dare forma alla modernità | Testo e confronti aperti, con richiami al percorso del capitolo |
| 181 | Isotype: rendere confrontabili i dati | Figura o confronto documentato con didascalia e ingrandimento |
| 182 | Beck: una mappa per il viaggio | Figura o confronto documentato con didascalia e ingrandimento |
| 183 | Paul Rand: costruire un’idea visiva | Figura o confronto documentato con didascalia e ingrandimento |
| 184 | La rivista come ritmo di lettura | Figura o confronto documentato con didascalia e ingrandimento |
| 185 | La griglia rende visibili le relazioni | Figura o confronto documentato con didascalia e ingrandimento |
| 186 | La tipografia diventa immagine | Figura o confronto documentato con didascalia e ingrandimento |
| 187 | Comporre il testo e stampare | Testo e confronti aperti, con richiami al percorso del capitolo |
| 188 | Il tavolo di lavoro diventa software | Figura o confronto documentato con didascalia e ingrandimento |
| 189 | Sperimentare cambia la lettura | Figura o confronto documentato con didascalia e ingrandimento |
| 190 | Dal leggere all’interagire | Testo e confronti aperti, con richiami al percorso del capitolo |
| 191 | CERN: il Web collega documenti | Figura o confronto documentato con didascalia e ingrandimento |
| 192 | Dall’artefatto al sistema | Testo e confronti aperti, con richiami al percorso del capitolo |
| 193 | 1968: il computer come collaborazione | Testo e confronti aperti, con richiami al percorso del capitolo |
| 194 | Xerox: ambienti grafici da sperimentare | Figura o confronto documentato con didascalia e ingrandimento |
| 195 | WIMP: quattro elementi coordinati | Testo e confronti aperti, con richiami al percorso del capitolo |
| 196 | Susan Kare: un linguaggio di pochi pixel | Figura o confronto documentato con didascalia e ingrandimento |
| 197 | Attività · La metafora della scrivania | Attività e domande aperte |
| 198 | Il primo web: testo e collegamenti | Pagina nello stile html · figura completa e testo aperto |
| 199 | Web 2.0: partecipazione e volume | Pagina nello stile web2 · figura completa e testo aperto |
| 200 | Scheumorfismo: riconoscere una funzione | Pagina nello stile scheu · figura completa e testo aperto |
| 201 | Flat design: ridurre il rilievo | Pagina nello stile flat · figura completa e testo aperto |
| 202 | Material Design: superfici e comportamento | Pagina nello stile material · figura completa e testo aperto |
| 203 | Semplice non significa sempre usabile | Testo e confronti aperti, con richiami al percorso del capitolo |
| 204 | Neumorfismo: oggetti dalla superficie | Pagina nello stile neumo · figura completa e testo aperto |
| 205 | Glassmorfismo: livelli e trasparenze | Pagina nello stile glass · figura completa e testo aperto |
| 206 | Minimalismo: scegliere che cosa resta | Pagina nello stile minimal · figura completa e testo aperto |
| 207 | Y2K: reinterpretare un immaginario | Pagina nello stile y2k · figura completa e testo aperto |
| 208 | Massimalismo: coordinare la densità | Pagina nello stile max · figura completa e testo aperto |
| 209 | Brutalismo web e neobrutalismo | Pagina nello stile neo · figura completa e testo aperto |
| 210 | Attività · Un controllo è riconoscibile? | Figura o confronto documentato con didascalia e ingrandimento |
| 211 | Possibili direzioni: quattro domande | Testo e confronti aperti, con richiami al percorso del capitolo |
| 212 | Tipografia adattabile ed espressiva | Figura o confronto documentato con didascalia e ingrandimento |
| 213 | Liquid Glass: dare un ruolo al materiale | Figura o confronto documentato con didascalia e ingrandimento |
| 214 | Interfacce spaziali: finestre e volumi | Figura o confronto documentato con didascalia e ingrandimento |
| 215 | Interfacce generate su richiesta | Figura o confronto documentato con didascalia e ingrandimento |
| 216 | Un’estetica attenta alle risorse | Figura o confronto documentato con didascalia e ingrandimento |
| 217 | Lo stile va verificato | Testo e confronti aperti, con richiami al percorso del capitolo |
| 218 | Tre eredità da riconoscere | Testo e confronti aperti, con richiami al percorso del capitolo |
| 219 | Fonti per continuare | Testo e confronti aperti, con richiami al percorso del capitolo |
| 220 | Verifica finale · Motivare uno stile | Attività e domande aperte |
| 221 | Domande? | Mappa a pieno canvas e fascia di testo |

## Verifica

`scripts/check/slides.mjs` risolve i capitoli importati e verifica 221 slide, incluse le 15 slide operative del brief e le 82 + 68 slide di lezione, 120 minuti per capitolo, fonti, note, alias, numerazione, immagini e zona del footer. I casi aggiunti dal [confronto 2025/26](../assets/slide-audit/2025-2026.json) sono compresi nelle selezioni per viewport stretto e stampa, individuati tramite alias; i casi precedenti sono risolti tramite titolo e lezione per conservare la copertura dopo gli inserimenti.

La verifica nel browser del 5 ottobre 2026 documenta la baseline precedente di 187 slide su desktop e nel viewport 636 × 778. Controlla anche le 59 figure: proporzioni native, coincidenza fra larghezza e posizione di immagine e didascalia, bordo nel colore del capitolo e apertura dell'ingrandimento. Tutti i 59 ingrandimenti sono verificati anche nel viewport stretto; su desktop sono controllati Esc, ritorno del focus e isolamento delle frecce dalla navigazione Slidev. Le 46 illustrazioni nelle card si trovano a 12 px dai bordi inferiore e destro. Numerazione e avanzamento corrispondono alla lezione su tutte le slide. Lo sfogliamento del booklet è verificato con movimento normale, pausa stabile e navigazione manuale. Il rapporto conserva separatamente il transitorio del titolo animato di apertura e la sua verifica a movimento concluso.

Evidenze della baseline di 187 slide: `reports/layout-review/final/runtime-2026-10-05.json` e screenshot nella stessa cartella. Le 15 slide operative del brief introdotte successivamente richiedono una verifica distinta; il rapporto precedente non attesta il deck attuale di 221 slide. Screenshot e rapporto JSON sono ignorati da Git; il sistema e le scelte restano documentati in questo file e in `docs/design.md`.

## Stili delle interfacce

Le undici varianti `web-style-*` applicano all’intera slide il linguaggio illustrato: font, palette, titoli, corpo, didascalie, footer e trattamento della figura. `styles/web-styles.css` è circoscritto a queste pagine e conserva i controlli accessibili di ingrandimento. Le immagini rimangono complete e proporzionate; i contenuti si leggono in colonne aperte. Le fonti e le licenze dei caratteri locali sono in `public/fonts/web-styles/manifest.json`. Le slide delle direzioni future mantengono invece la palette C02 per distinguere gli scenari dalla storia degli stili.

La verifica del 6 ottobre 2026 copre il deck aggiornato di 221 slide: 388 rendering controllati, undici stili verificati su desktop e viewport stretto, immagini ingrandibili, note del relatore e stampa. I tre rilievi iniziali riguardavano la sola didascalia della slide Albers in tre modalità; la figura è stata ricomposta e il controllo mirato successivo è passato. Le altre verifiche già riuscite sono conservate nel rapporto finale `reports/slides-c2-2026-10-06/runtime-final.json`.

Il Brief di progetto è un set autonomo di 25 pagine (46–70 del deck), dopo Contatti. Copertina e indice interno introducono il tema WHAT IF?; numerazione e barra ripartono da 1. Il corso contiene 46 pagine, Introduzione 82 e Storia del design 68.
