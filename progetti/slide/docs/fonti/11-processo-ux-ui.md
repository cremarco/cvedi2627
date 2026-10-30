# Processo UX e UI · fonti della lezione 11

127 slide, 187.5 minuti pianificati, inclusi 18 minuti di attività e 3 di restituzione. Presentazione pubblicata su GitHub Pages, successiva a Composizione, con palette violet/Cedro e numerazione autonoma.

La slide contenuti-realistici precede wireframe-documento e introduce l’uso di nomi, durata, indirizzo, costo e stati prima degli esempi. La slide sketch-wireframe-mockup definisce schizzo esplorativo, schema strutturale e proposta visiva statica, distinguendoli dal prototipo che simula azioni e risposte. Le sedici tavole ImageGen del percorso di Passo seguono wireframe-documento: quattro sketch a mano, quattro wireframe a bassa fedeltà con blocchi segnaposto, quattro wireframe digitali a media fedeltà e quattro mockup ad alta fedeltà. Ogni livello mostra le stesse otto schermate, raccolte in home/visite, ricerca/risultati, dettaglio/riepilogo e richiesta/conferma. Domicilio, professionista, data, orari, durata e costo provengono dai dati dello scenario. L’invio resta una richiesta in attesa; la conferma dipende dall’accettazione del professionista. data/ux-wireframe-sequence.json separa contenuti e sequenza dalle immagini; assets/theme-imagegen/lesson-11-wireframes/ conserva PNG, WebP lossless, prompt e riferimenti fra i livelli con hash. Le tavole sono statiche e usano LessonFigure per didascalia, alternativa testuale e ingrandimento. Il confronto wireframe-progressione riprende lo stesso riepilogo in quattro passaggi: sketch, blocchi segnaposto, media fedeltà con contenuti e mockup. La bassa fedeltà mostra soltanto struttura, campi e azioni; dati e comandi realistici sono conservati negli altri elaborati. Il precedente confronto a tre pannelli resta nel manifest revisioni/prima-bassa-fedelta; il precedente SVG generico è conservato in archivedImages. La slide revisione-v1 confronta la stessa proposta nei risultati: V0 mostra Giulia Riva e l’orario; V1 anticipa domicilio, fascia serale e totale prima di «Vedi visita». La tavola ImageGen segue le schermate di ricerca e risultati approvate; il manifest della serie conserva originale, prompt e i due riferimenti. Il precedente SVG resta in archivedImages. La distinzione tra richiesta e conferma resta nella revisione V2.

La struttura segue le quattordici attività del capitolo 3 di Matteo Di Pascale (2019), consultato nelle pagine fisiche 38–45 del PDF fornito. Carlo, Giovanni e Viola appartengono al caso narrativo del libro. Il capitolo 09 Typst è la fonte editoriale corrente; le lezioni 03–06 e 08 del 2025/26 e il booklet di dicembre 2024 contribuiscono ai contenuti. Percorsi, pagine fisiche, hash e fonti primarie sono in references.json. I richiami all’autore e al manuale sono omessi dai contenuti visibili su richiesta dell’utente; la provenienza completa rimane nei registri locali.

Le quattordici aperture usano domanda, tre attività, risultato atteso e richiamo applicato a una lezione precedente. Subito dopo ciascuna apertura, un’applicazione sviluppa lo stesso servizio: rete locale coordinata di fisioterapisti a domicilio. Il caso cumulativo è in data/ux-service-case.json; ogni elaborato ha un identificativo e usa il risultato del passo precedente. Requisiti R1–R5, criteri C1–C4 e tre episodi E1–E3 collegano struttura, prove e revisioni. Tutti gli episodi di ricerca e valutazione, gli indirizzi, i professionisti aggiunti, le disponibilità, le condizioni e i prezzi sono simulati. Nessun risultato didattico è presentato come ricerca svolta o dimostrazione dell’efficacia sul campo.

V0 mostra la prima bozza; V1 anticipa zona, fascia serale e totale; V2 distingue invio, attesa e accettazione del professionista; V3 conserva i dati durante il recupero e rende gestibili richieste e visite. UxServicePrototype dimostra tutte e quattro le versioni con controlli reali e dati locali in data/ux-service-prototype.json. La presentazione segue i wireframe approvati: marchio Passo, intestazione bianca, risultati con fotografie e orari selezionabili, dettaglio della visita prima del riepilogo con contatti e consenso e azioni principali in evidenza. V0 usa i grigi; V1–V3 usano violetto e Cedro. Titoli e comandi sono condivisi con data/ux-wireframe-sequence.json. La prima bozza conserva il costo tardivo e «Prenota», mentre V2–V3 distinguono richiesta e conferma. La ricerca controlla il CAP della copertura illustrativa, senza geocodificare il domicilio. Le simulazioni di slot perso e conferma umana sono controlli didattici esterni all’interfaccia del servizio. Non viene inviata alcuna richiesta. Stampa ed export mostrano un riepilogo deterministico. La proposta finale conserva i limiti: disponibilità e tempi reali, condizioni effettive e prove con persone e tecnologie assistive.

Le 63 figure comprendono 23 ricostruzioni per la proiezione, 5 elaborati nativi del caso, sei schemi SMART, un documento attribuito, cinque illustrazioni di scena e tre ritratti, un’infografica SMART e un ritratto realistico di Viola e 18 tavole di wireframe e confronto generate con ImageGen; tre motivi vettoriali illustrano gli obiettivi. Le ricostruzioni mantengono gli originali in reconstruction.original. I nuovi esempi sono registrati in nativeDiagram con renderer, font e hash. Tutti i 34 schemi usano gabbia da 800 pt, canvas da 842 pt con 40 pt liberi per lo zoom, Nunito Sans in tracciati, corpo 15,5 pt e note 14 pt. Il font deriva dai contorni web con istanze 400/600/700 e famiglia CVeDI Diagram Sans; originale, licenza e ricevute restano in ricostruite/font/. Le verifiche misurano almeno 20 px per il corpo e 18 per le note nel canvas. Il documento attivo conserva l’attribuzione: wireframe NS di Jolanda Dekker. Il dettaglio WCC Properties di JH Specialty è escluso su richiesta; ritaglio, attribuzione e originale integrale restano conservati in archivedImages e negli asset originali. La scheda persona di Iulian Corunga è conservata in archivedImages; la slide persona-documento usa UxPersonaSheet e data/ux-persona.json, con testi italiani nativi e il ritratto realistico già approvato di Viola. Obiettivo, contesto, bisogni, comportamenti, ostacoli e domande da approfondire seguono il caso delle visite serali a domicilio. Le cinque illustrazioni di scena e i tre ritratti ImageGen conservano PNG, prompt, WebP lossless e hash. I ritratti di Carlo, Giovanni e Viola sono registrati separatamente in assets/theme-imagegen/lesson-11-cast/manifest.json; la slide del caso mantiene nomi e spiegazioni come testo nativo, senza didascalie aggiuntive. Caption, alternative e ingrandimento seguono il sistema condiviso. Nessun PDF del booklet viene compilato o aperto.

Le 12 tabelle dai registri sono richiamate come UxProcessTable con codice semantico, senza src immagine. Le 14 applicazioni e la tabella delle decisioni usano HTML diretto. Il componente condiviso LessonTable mantiene intestazioni, scope, dati selezionabili e stampa. pnpm check:ux-tables verifica contenuti e geometria di tutte le tabelle nei tre formati; i controlli delle sorgenti impediscono il ripristino dei riferimenti SVG nel contenuto visibile. Gli originali grafici e le attribuzioni rimangono conservati.

L’estensione SMART comprende un’introduzione illustrata, l’esempio del compito conservato, cinque criteri applicati e una sintesi. Rispetto alle 104 slide precedenti, aggiunge sette slide e 10,5 minuti. L’infografica ImageGen è registrata in assets/theme-imagegen/lesson-11-smart/manifest.json, con originale, prompt e derivato lossless. La variante Specific, Measurable, Actionable, Realistic e Time-based segue le pagine fisiche 57–59 del manuale allegato; fonte, copia consultata e hash sono nel registro locale. I contenuti sono in data/ux-smart.json e il renderer smart.typ riusa il sistema dei diagrammi. Ogni criterio riguarda Carlo, Giovanni e Viola. Cinque partecipanti e due settimane sono una proposta di pianificazione da concordare: gli esiti devono ancora essere raccolti. L’alias processo-ux-ui-obiettivo mantiene l’introduzione e l’alias processo-ux-ui-obiettivo-caso conserva l’esempio precedente; seguono i cinque criteri e la sintesi, prima di processo-ux-ui-misure.

La mappa interattiva usa UxProcessExplorer con quattordici card illustrate in cinque nuclei e pannello laterale da 300 px, nell’intera area di contenuto. Il manifest assets/theme-imagegen/lesson-11-map/manifest.json registra sei riusi e otto nuove illustrazioni decorative, con originali, prompt, alpha e hash. Titolo e introduzione visibili, pulsante di ritorno e guida testuale sono omessi su richiesta. Frecce, Home, End, Tab ed Escape conservano la navigazione; stampa ed export usano la mappa nativa completa. La selezione mantiene il focus e collegamenti con contrasto almeno 3:1. Il piano conserva i riferimenti alle lezioni precedenti e i 78 alias originali rimasti nel medesimo ordine relativo; le due slide rimosse su richiesta restano in archivedSlides. L’estensione intenzionale aggiunge 14 applicazioni, sei figure del caso e quattro versioni navigabili: 24 slide e 24 minuti. Le due attività rimangono di 8 e 10 minuti. Non sono aggiunte note del relatore o registrazioni. La lezione e le figure attive sono pubblicate anche su GitHub Pages; gli originali e gli asset archiviati restano conservati nei sorgenti.

La sitemap del sito da realizzare segue il confronto fra journey, flow e sitemap. UxBookingSitemap presenta Home, Il servizio, Trova una visita, Le mie visite e Assistenza con pagine distinte per ricerca, risultati, dettaglio, riepilogo, accesso e gestione. I contenuti sono in data/ux-booking-sitemap.json e sviluppano IA-01. Attesa e conferma restano stati del dettaglio; modifica e annullamento sono azioni. Il footer comune raccoglie privacy, cookie, accessibilità e condizioni.

## Corrispondenze

| Slide | Titolo | Passaggio della fonte | Sezione del capitolo | Figure |
| --- | --- | --- | --- | --- |
| 1 | Processo UX e UI | — | Un processo per prendere decisioni |  |
| 2 | Dal bisogno alla verifica | — | Un processo per prendere decisioni |  |
| 3 | Che cosa impareremo | — | Un processo per prendere decisioni |  |
| 4 | Un’esperienza attraversa più schermate | — | Un processo per prendere decisioni | illustrazione-brief |
| 5 | Il caso di Carlo, Giovanni e Viola | — | Il caso dei fisioterapisti | ritratto-carlo, ritratto-giovanni, ritratto-viola |
| 6 | Due lati dello stesso servizio | — | Il caso dei fisioterapisti |  |
| 7 | Quattordici attività, cinque nuclei | — | Un processo per prendere decisioni | processo |
| 8 | Una prova può cambiare la domanda | — | Iterazione e responsabilità |  |
| 9 | 01 · Intervista e brief | 1 | Intervista agli stakeholder e brief |  |
| 10 | Dal brief scegliamo una rete a domicilio | 1 | Intervista agli stakeholder e brief |  |
| 11 | Dalla richiesta alle domande | 1 | Intervista agli stakeholder e brief | brief |
| 12 | Vincoli e responsabilità | 1 | Intervista agli stakeholder e brief | responsabilita |
| 13 | 02 · Obiettivi di business | 2 | Analisi degli obiettivi di business |  |
| 14 | Il risultato è una richiesta comprensibile | 2 | Analisi degli obiettivi di business |  |
| 15 | Rendere osservabile un obiettivo | 2 | Analisi degli obiettivi di business | infografica-smart |
| 16 | Dal generico al compito di Viola | 2 | Analisi degli obiettivi di business | obiettivi |
| 17 | S · Specific — Specifico | 2 | Analisi degli obiettivi di business | smart-specifico |
| 18 | M · Measurable — Misurabile | 2 | Analisi degli obiettivi di business | smart-misurabile |
| 19 | A · Actionable — Eseguibile | 2 | Analisi degli obiettivi di business | smart-eseguibile |
| 20 | R · Realistic — Realistico | 2 | Analisi degli obiettivi di business | smart-realistico |
| 21 | T · Time-based — Definito nel tempo | 2 | Analisi degli obiettivi di business | smart-tempo |
| 22 | Un obiettivo SMART per il primo ciclo | 2 | Analisi degli obiettivi di business | smart-obiettivo-completo |
| 23 | Misura, contesto e confronto | 2 | Analisi degli obiettivi di business |  |
| 24 | 03 · Analisi dei competitor | 3 | Analisi dei competitor |  |
| 25 | Tre modi per prenotare la stessa visita | 3 | Analisi dei competitor |  |
| 26 | Confrontare il servizio oltre la grafica | 3 | Analisi dei competitor | confronto-alternative |
| 27 | Dal confronto a una scelta | 3 | Analisi dei competitor |  |
| 28 | 04 · Definizione del problema | 4 | Definizione dei problemi |  |
| 29 | Rendiamo verificabile l’ostacolo di Viola | 4 | Definizione dei problemi |  |
| 30 | Formulare un’ipotesi da provare | 4 | Definizione dei problemi | ipotesi |
| 31 | 05 · User research | 5 | User research |  |
| 32 | Dagli appunti a decisioni provvisorie | 5 | User research |  |
| 33 | Preparare un piano di ricerca | 5 | User research |  |
| 34 | Domande che fanno raccontare | 5 | User research | illustrazione-ricerca |
| 35 | Coinvolgere persone pertinenti | 5 | User research | ritratto-viola, viola-realistica |
| 36 | Dal comportamento alla prossima prova | 5 | User research | evidenze |
| 37 | Dagli appunti ai bisogni | 5 | User research |  |
| 38 | 06 · User personas | 6 | User personas |  |
| 39 | Il profilo orienta le scelte del servizio | 6 | User personas |  |
| 40 | Che cosa cambia per Viola? | 6 | User personas | viola |
| 41 | La user persona di Viola | 6 | User personas | viola-realistica |
| 42 | Usare una persona per decidere | 6 | User personas |  |
| 43 | 07 · Customer journey e user flow | 7 | Customer journey e user flow |  |
| 44 | Colleghiamo viaggio, schermate e risposta umana | 7 | Customer journey e user flow |  |
| 45 | Una porzione del viaggio di Viola | 7 | Customer journey e user flow | journey |
| 46 | Il viaggio dipende anche dal servizio | 7 | Customer journey e user flow | journey-responsabilita |
| 47 | 07 · User flow | 7 | Customer journey e user flow |  |
| 48 | Prenotare comprende anche il recupero | 7 | Customer journey e user flow | flow |
| 49 | Rami alternativi e dati conservati | 7 | Customer journey e user flow |  |
| 50 | Journey, flow e sitemap | 7 | Customer journey e user flow | confronto-mappe |
| 51 | La sitemap di Passo | 7 | Customer journey e user flow |  |
| 52 | 08 · Documento dei requisiti | 8 | Business Requirements Document |  |
| 53 | Cinque requisiti rendono costruibile il percorso | 8 | Business Requirements Document |  |
| 54 | Dal bisogno a un criterio verificabile | 8 | Business Requirements Document | requisiti |
| 55 | Bisogno, user story e accettazione | 8 | Business Requirements Document | accettazione |
| 56 | Dal bisogno al requisito | — | Business Requirements Document |  |
| 57 | 09 · Architettura dell’informazione | 9 | Architettura dell’informazione |  |
| 58 | L’architettura segue ciò che Viola deve fare | 9 | Architettura dell’informazione |  |
| 59 | Una struttura da discutere | 9 | Architettura dell’informazione | sitemap |
| 60 | Verificare etichette e raggruppamenti | 9 | Architettura dell’informazione |  |
| 61 | 10 · Wireframing | 10 | Wireframing |  |
| 62 | V0 mette alla prova la prima struttura | 10 | Wireframing |  |
| 63 | Sketch, wireframe e mockup | 10 | Wireframing |  |
| 64 | Wireframe con contenuti realistici | 10 | Wireframing | illustrazione-wireframe |
| 65 | Disegnare per capire una funzione | 10 | Wireframing | wireframe-carta |
| 66 | Sketch a mano · Home e visite | 10 | Wireframing | wireframe-mano-home-visite |
| 67 | Sketch a mano · Ricerca e risultati | 10 | Wireframing | wireframe-mano-ricerca-risultati |
| 68 | Sketch a mano · Dettaglio e riepilogo | 10 | Wireframing | wireframe-mano-dettaglio-riepilogo |
| 69 | Sketch a mano · Richiesta e conferma | 10 | Wireframing | wireframe-mano-attesa-conferma |
| 70 | Bassa fedeltà · Home e visite | 10 | Wireframing | wireframe-bassa-home-visite |
| 71 | Bassa fedeltà · Ricerca e risultati | 10 | Wireframing | wireframe-bassa-ricerca-risultati |
| 72 | Bassa fedeltà · Dettaglio e riepilogo | 10 | Wireframing | wireframe-bassa-dettaglio-riepilogo |
| 73 | Bassa fedeltà · Richiesta e conferma | 10 | Wireframing | wireframe-bassa-attesa-conferma |
| 74 | Media fedeltà · Home e visite | 10 | Wireframing | wireframe-media-home-visite |
| 75 | Media fedeltà · Ricerca e risultati | 10 | Wireframing | wireframe-media-ricerca-risultati |
| 76 | Media fedeltà · Dettaglio e riepilogo | 10 | Wireframing | wireframe-media-dettaglio-riepilogo |
| 77 | Media fedeltà · Richiesta e conferma | 10 | Wireframing | wireframe-media-attesa-conferma |
| 78 | Mockup ad alta fedeltà · Home e visite | 10 | Wireframing | wireframe-alta-home-visite |
| 79 | Mockup ad alta fedeltà · Ricerca e risultati | 10 | Wireframing | wireframe-alta-ricerca-risultati |
| 80 | Mockup ad alta fedeltà · Dettaglio e riepilogo | 10 | Wireframing | wireframe-alta-dettaglio-riepilogo |
| 81 | Mockup ad alta fedeltà · Richiesta e conferma | 10 | Wireframing | wireframe-alta-attesa-conferma |
| 82 | Dallo sketch al mockup, la stessa struttura | 10 | Wireframing | wireframe-ui |
| 83 | V0 · Dalla struttura alle prime schermate | 10 | Wireframing | caso-wireframe-v0 |
| 84 | 11 · Prototipo e prima prova | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 85 | Proviamo V0 e registriamo l’ostacolo | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 86 | V0 · Proviamo la prima bozza | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 87 | Prototipare quanto serve alla domanda | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 88 | 11 · Preparare un test di usabilità | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 89 | Una consegna descrive l’obiettivo | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 90 | La domanda organizza la prova | 11 | Prototipo a bassa fedeltà e test di usabilità | test |
| 91 | Una sessione dall’inizio alla fine | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 92 | Che cosa abbiamo osservato? | 11 | Prototipo a bassa fedeltà e test di usabilità |  |
| 93 | Registrare un episodio di prova | 11 | Prototipo a bassa fedeltà e test di usabilità | registro-prova |
| 94 | 12 · Iterazioni sui prototipi | 12 | Iterazioni sui prototipi |  |
| 95 | Due revisioni cambiano decisioni precise | 12 | Iterazioni sui prototipi |  |
| 96 | Un problema, un’ipotesi, una nuova prova | 12 | Iterazioni sui prototipi | iterazione |
| 97 | V0 → V1 · Prima la compatibilità | 12 | Iterazioni sui prototipi | caso-iterazione-v1 |
| 98 | V1 · Troviamo una proposta compatibile | 12 | Iterazioni sui prototipi |  |
| 99 | V1 → V2 · Rendere esplicita la promessa | 12 | Iterazioni sui prototipi | caso-iterazione-v2 |
| 100 | Decidere che cosa correggere | 12 | Iterazioni sui prototipi |  |
| 101 | Dare una priorità ai problemi | 12 | Iterazioni sui prototipi | priorita-problemi |
| 102 | 13 · UI e mockup | 13 | User Interface e mockup |  |
| 103 | La UI dà forma alle regole di V2 | 13 | User Interface e mockup |  |
| 104 | Passo · Il sistema visivo applicato | 13 | User Interface e mockup | caso-sistema-ui |
| 105 | V2 · Richiesta, attesa e conferma | 13 | User Interface e mockup |  |
| 106 | Progettare scelta, recupero ed esito | 13 | User Interface e mockup | stati |
| 107 | La UI comprende parole e comportamento | 13 | User Interface e mockup | ui-annotata |
| 108 | Componenti, varianti e contenuti | 13 | User Interface e mockup |  |
| 109 | 14 · Nuova verifica della soluzione | 14 | Nuova verifica della soluzione |  |
| 110 | V3 completa il recupero e la gestione | 14 | Nuova verifica della soluzione |  |
| 111 | V2 → V3 · Recuperare uno slot perso | 14 | Nuova verifica della soluzione | caso-iterazione-v3 |
| 112 | V3 · Percorriamo il servizio completo | 14 | Nuova verifica della soluzione |  |
| 113 | Valutare uso e accessibilità | 14 | Nuova verifica della soluzione |  |
| 114 | Consegna: aspetto, regole e questioni aperte | — | Conservare ciò che si è appreso | illustrazione-requisiti |
| 115 | Una consegna verificabile | — | Conservare ciò che si è appreso | consegna-stato |
| 116 | Il servizio finale collega persone e risposte | — | Conservare ciò che si è appreso | caso-servizio-finale |
| 117 | Dal prototipo al servizio reale | — | Dal progetto al servizio | illustrazione-verifica |
| 118 | Ipotesi, prova, apprendimento | — | Iterazione e Lean UX | ciclo |
| 119 | Scegliere la prossima attività | — | Scegliere il lavoro necessario |  |
| 120 | Dal requisito alla prossima prova | — | Scegliere il lavoro necessario |  |
| 121 | Rendere discutibile la proposta | — | Scegliere il lavoro necessario |  |
| 122 | Adattare il processo al progetto | — | Scegliere il lavoro necessario |  |
| 123 | Dal bisogno alla scelta motivata | — | Scegliere il lavoro necessario |  |
| 124 | Risorse · Dal bisogno alla decisione | — | Scegliere il lavoro necessario |  |
| 125 | Fonti · Ricerca e rappresentazione | — | Fonti · Ricerca e rappresentazione |  |
| 126 | Fonti · Valutazione e apprendimento | — | Fonti · Valutazione e apprendimento |  |
| 127 | Fonti · Documenti ed esempi | — | Fonti · Documenti ed esempi |  |
