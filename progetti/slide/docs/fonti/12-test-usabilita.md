# Lezione 12 · Test di usabilità

Le 110 registrazioni dispongono di sottotitoli WebVTT in `progetti/slide/assets/captions/lezione-test-usabilita/manifest.json`, allineati localmente con Whisper medium tramite stable-ts sul copione approvato. Le tracce conservano il testo completo senza tag vocali; hash audio, hash testo, tempi delle parole e versioni degli strumenti restano negli asset. Il player usa `narrationCaptions`, CC attivo al primo utilizzo e preferenza persistente; pausa e riavvio seguono la traccia nativa, senza chiamate esterne. La build prepara soltanto il mirror locale e verifica l'integrità; non esegue Whisper.

Importazione conservativa delle pagine fisiche 8–86 di `materiali/lezioni/2025-2026/08-usability-testing-contesto-culturale.pdf`, nella raccolta 2025/26: principi di usabilità, Norman, dieci euristiche di Nielsen e test. Il titolo interno del PDF reca «CVeDI 2425 - Lezione 8 - Usability testing e contesto culturale »; il manifest conserva entrambe le informazioni senza modificare la fonte.

111 slide, budget indicativo di 120 minuti, disponibili soltanto nell’anteprima locale. Il testo, i dati storici, i consigli e l’ordine delle pagine originali sono conservati; la revisione scientifica dei testi resta separata. Le pagine dense e la tabella sono distribuite su più slide; il testo rimane selezionabile. La copertina appartiene al sistema attuale; sintesi e obiettivi iniziali riprendono soltanto frasi già presenti alle pagine 48 e 52. Nessuna nuova attività.

Su richiesta esplicita, le 110 slide di contenuto hanno un copione italiano da pronunciare integralmente: 13250 parole, paragrafi brevi, lettura delle figure e raccordi al caso Passo. Il testo originale è in `progetti/slide/assets/lezione-test-usabilita/speaker-notes-original.json`; `progetti/slide/assets/lezione-test-usabilita/speaker-notes.json` aggiunge tono neutro e pause come nelle lezioni 09–10, senza cambiare i caratteri del parlato. La slide finale delle fonti è esclusa dalle note su richiesta dell’utente. Il generatore conserva le note per alias e i controlli verificano la corrispondenza completa. Il copione contestualizza dati economici storici, numerosità e cadenza dei test, formule enfatiche, distinzione fra affordance e significanti e fra gravità e priorità, senza modificare la trascrizione visibile. I riferimenti di verifica sono in `progetti/slide/assets/lezione-test-usabilita/speaker-notes-sources.json`. Su richiesta dell’utente, soltanto le prime 110 slide selezionano una registrazione in `progetti/slide/assets/lezione-test-usabilita/audio-approved.json`: voce Cremarco, modello eleven_v4, italiano, stabilità e somiglianza 0,90, MP3 44,1 kHz a 128 kbps, dalle stesse impostazioni delle lezioni precedenti. Originali e ricevute sono in assets/audio/lezione-test-usabilita; il mirror espone solo i file selezionati. La sintesi è separata dalla build; la configurazione del presenter rimane invariata.

Le cinque integrazioni sui criteri sono separate in `progetti/slide/assets/lezione-test-usabilita/integrazioni-criteri.json`: dopo Nielsen, tre criteri applicati al caso Passo (Shneiderman, Tognazzini, Bastien e Scapin) precedono il raccordo fra valutazione euristica e test con utenti. La bibliografia conclusiva include ISO 9241-110:2020 come standard distinto dagli elenchi di euristiche. Occupano 8 minuti.

Le quattro integrazioni operative in `progetti/slide/assets/lezione-test-usabilita/integrazioni-test.json` sviluppano componenti dell’usabilità, preparazione e consenso, criteri di successo e gravità dei problemi. Derivano dal confronto richiesto con Matteo di Pascale, *Manuale di sopravvivenza per UX designer. Guida pratica alla progettazione*, Hoepli, 2019, ISBN 978-88-203-9010-5, pagine fisiche PDF 142–148; le fonti primarie sono collegate nelle slide pertinenti. Il registro conserva provenienza, pagine e correzioni metodologiche rispetto al libro. Su richiesta dell’utente, autore, anno e pagine del manuale sono omessi nelle quattro slide; rimangono i collegamenti alle fonti primarie. SUS resta facoltativo e fuori dal percorso. Le nuove slide occupano 10 minuti; insieme ai criteri assegnano 18 minuti alle integrazioni e 102 ad aperture e percorso importato, entro le due ore. Alias storici, trascrizioni e figure sono conservati.

Su richiesta dell’utente, 17 immagini didattiche sono ridisegnate nella palette purple/Verde prato della lezione: nove immagini con ImageGen integrato e otto interfacce e schemi SVG con Nunito Sans. I due ritratti documentari rimangono originali. La slide 35 usa uno screenshot reale di Google acquisito dal browser, con colori originali e provenienza in `progetti/slide/assets/lezione-test-usabilita/screenshot-reali/manifest.json`. Il registro `progetti/slide/assets/lezione-test-usabilita/ricostruite/manifest.json` seleziona le figure; PNG ImageGen, prompt, SVG modificabili, screenshot, etichette e relazioni dirette restano separati dalle risorse web. Le interfacce ricostruite hanno una didascalia esplicita. Tutte le figure attive usano l’ingrandimento condiviso.

Le sette tabelle riusano il componente condiviso `LessonTable` tramite `TestUsabilityTable`; i dati per alias in `progetti/slide/data/test-usabilita-tables.json` conservano tutte le intestazioni e celle originali, con scope, selezione del testo e stile del corso anche in stampa.

Tutte le card hanno un’illustrazione decorativa pertinente della famiglia purple/Verde prato: nove originali ImageGen trasparenti per 29 card in dieci slide. Il manifest in `progetti/slide/assets/lezione-test-usabilita/card-artwork.json` conserva soggetti, prompt, originali, hash e proprietari; il generatore ripristina il mapping completo. Il componente `CvediCard` applica i ruoli condivisi: 96 px e riserva inferiore 112 px nelle tre colonne, 168 px nelle due colonne.

La slide 42 «Test di usabilità» completa su richiesta dell’utente il divisorio della pagina 41 con tre passaggi illustrati: scegliere la situazione, condurre la sessione e migliorare il progetto. `progetti/slide/assets/lezione-test-usabilita/apertura-test.json` registra contenuti e provenienza, coerenti con il copione già registrato. Alias, durata, audio e sottotitoli rimangono invariati.

Su richiesta dell’utente, 15 spiegazioni dense usano una sintesi nativa a sinistra e una scena pertinente a destra. `progetti/slide/assets/lezione-test-usabilita/layout-illustrato.json` registra i testi visibili, i riferimenti e gli hash dei paragrafi originali e dei copioni; la trascrizione completa resta conservata nei blocchi del manifest e nella fonte. `progetti/slide/assets/lezione-test-usabilita/illustrazioni-testo/manifest.json` conserva dodici illustrazioni originali ImageGen, prompt, hash e slide proprietarie. Titoli, attribuzioni, ordine, durate, copioni e registrazioni restano invariati.

La slide 4 «Principi di usabilità» completa su richiesta dell’utente l’apertura della pagina 8 con tre card illustrate: riconoscere le azioni, prevedere le conseguenze e correggere gli errori. Le domande riprendono testualmente il copione già registrato; `progetti/slide/assets/lezione-test-usabilita/apertura-principi.json` separa l’integrazione dalla trascrizione storica. Titolo, alias, note, audio e durata restano invariati.

La slide 26 «Le euristiche di Jakob Nielsen» completa su richiesta dell’utente il divisorio della pagina 29 con una panoramica delle dieci euristiche. Le intestazioni sono ricavate dalle pagine 31–40 e disposte in due liste numerate native; introduzione, raccordo e provenienza sono in `progetti/slide/assets/lezione-test-usabilita/apertura-euristiche.json`. Copione, audio, sottotitoli, alias e durata rimangono invariati.

Il PDF originale, le trascrizioni per pagina, gli hash, i 20 ritagli e le attribuzioni NN/g e Steve Krug sono conservati separatamente in `progetti/slide/assets/lezione-test-usabilita/`. Su richiesta dell’utente, la dicitura ripetuta «Steve Krug · Don’t Make Me Think» è omessa dalle slide e conservata nei registri delle fonti. Le attribuzioni non indicate nella fonte restano esplicitamente non determinate nei metadati. Il set archiviato `test-implementazione` rimane invariato e inattivo.

| Slide | Pagina originale | Titolo |
| --- | --- | --- |
| 1 | Raccordo iniziale | Test di usabilità |
| 2 | Raccordo iniziale | Osservare l’uso |
| 3 | Raccordo iniziale | Gli obiettivi dei test di usabilità |
| 4 | 8 | Principi di usabilità |
| 5 | 9 | Progettare user-friendly |
| 6 | Integrazione verificata | Che cosa osserviamo nell’usabilità |
| 7 | 10 | Progettare user-friendly |
| 8 | 11 | I principi di Donald Norman |
| 9 | 12 | I principi di Donald Norman |
| 10 | 13 | I principi di Donald Norman |
| 11 | 14 | I principi di Donald Norman |
| 12 | 15 | Affordance · esempio |
| 13 | 16 | I principi di Donald Norman |
| 14 | 17 | I principi di Donald Norman |
| 15 | 18 | Significanti · esempio |
| 16 | 19 | I principi di Donald Norman |
| 17 | 20 | Mapping · esempio |
| 18 | 21 | I principi di Donald Norman |
| 19 | 22 | I principi di Donald Norman |
| 20 | 23 | Vincoli · esempio |
| 21 | 24 | I principi di Donald Norman |
| 22 | 25 | I principi di Donald Norman |
| 23 | 26 | Feedback · esempio |
| 24 | 27 | I principi di Donald Norman |
| 25 | 28 | Modello concettuale · esempio |
| 26 | 29 | Le euristiche di Jakob Nielsen |
| 27 | 30 | Le euristiche di Jakob Nielsen |
| 28 | 31 | Le euristiche di Nielsen |
| 29 | 32 | Le euristiche di Nielsen |
| 30 | 33 | Le euristiche di Nielsen |
| 31 | 34 | Le euristiche di Nielsen |
| 32 | 35 | Le euristiche di Nielsen |
| 33 | 36 | Le euristiche di Nielsen |
| 34 | 37 | Le euristiche di Nielsen |
| 35 | 38 | Le euristiche di Nielsen |
| 36 | 39 | Le euristiche di Nielsen |
| 37 | 40 | Le euristiche di Nielsen |
| 38 | Integrazione verificata | Capire quando un flusso è concluso |
| 39 | Integrazione verificata | Proteggere il lavoro e conservare lo stato |
| 40 | Integrazione verificata | Ridurre il lavoro richiesto dal compito |
| 41 | Integrazione verificata | Dall’ispezione alla prova con utenti |
| 42 | 41 | Test di usabilità |
| 43 | 42 | Focus group: perché escluderlo? (1) |
| 44 | 43 | Focus group: perché escluderlo? (2) |
| 45 | 44 | Test di usabilità (1) |
| 46 | 44 | Test di usabilità (1) |
| 47 | 45 | Test di usabilità (2) |
| 48 | 46 | Test di usabilità (3) |
| 49 | 47 | Test tradizionali e test fai da te |
| 50 | 47 | Test tradizionali e test fai da te |
| 51 | 47 | Test tradizionali e test fai da te |
| 52 | 47 | Test tradizionali e test fai da te |
| 53 | 47 | Test tradizionali e test fai da te |
| 54 | 48 | Why Usability Test? (1) |
| 55 | 49 | Why Usability Test? (2) |
| 56 | 50 | Why Usability Test? (3) |
| 57 | 51 | Why Usability Test? (4) |
| 58 | 51 | Why Usability Test? (4) |
| 59 | 51 | Why Usability Test? (4) |
| 60 | 52 | Usability testing: le componenti |
| 61 | 53 | Usability testing: le componenti |
| 62 | 54 | Usability testing: il facilitatore (1) |
| 63 | 55 | Usability testing: il facilitatore (2) |
| 64 | 56 | Usability testing: i compiti (1) |
| 65 | 57 | Usability testing: i compiti (2) |
| 66 | 58 | Usability testing: i compiti (3) |
| 67 | 59 | Usability testing: il partecipante |
| 68 | 60 | Usability testing: il partecipante |
| 69 | 61 | Come svolgere un Usability Testing? |
| 70 | 62 | Quanto spesso si devono eseguire i test? (1) |
| 71 | 63 | Quanto spesso si devono eseguire i test? (2) |
| 72 | 63 | Quanto spesso si devono eseguire i test? (2) |
| 73 | 64 | Quanti utenti servono? (1) |
| 74 | 65 | Quanti utenti servono? (2) |
| 75 | 65 | Quanti utenti servono? (2) |
| 76 | 66 | Quanti utenti servono? |
| 77 | 66 | Quanti utenti servono? |
| 78 | 67 | Dove si eseguono i test? |
| 79 | Integrazione verificata | Preparare la sessione e il consenso |
| 80 | 68 | Chi deve osservare? (1) |
| 81 | 69 | Chi deve osservare? (2) |
| 82 | 69 | Chi deve osservare? (2) |
| 83 | 70 | Cosa testare e quando testarlo? (1) |
| 84 | 70 | Cosa testare e quando testarlo? (1) |
| 85 | 71 | Cosa testare e quando testarlo? (2) |
| 86 | 72 | Come si scelgono le attività per i test? (1) |
| 87 | 73 | Come si scelgono le attività per i test? (2) |
| 88 | 74 | Come si scelgono le attività per i test? (3) |
| 89 | Integrazione verificata | Definire prima il successo del compito |
| 90 | 75 | Come si scelgono le attività per i test? (4) |
| 91 | 75 | Come si scelgono le attività per i test? (4) |
| 92 | 76 | Cosa succede durante i test? (1) |
| 93 | 76 | Cosa succede durante i test? (1) |
| 94 | 77 | Cosa succede durante i test? (2) |
| 95 | 77 | Cosa succede durante i test? (2) |
| 96 | 78 | Cosa succede durante i test? (3) |
| 97 | 79 | Problemi tipici |
| 98 | 79 | Problemi tipici |
| 99 | 79 | Problemi tipici |
| 100 | 80 | Il debriefing (1) |
| 101 | 81 | Il debriefing (2) |
| 102 | 81 | Il debriefing (2) |
| 103 | Integrazione verificata | Valutare la gravità dei problemi |
| 104 | 82 | Il debriefing |
| 105 | 82 | Il debriefing |
| 106 | 83 | Il debriefing |
| 107 | 83 | Il debriefing |
| 108 | 84 | Il debriefing |
| 109 | 85 | Il debriefing |
| 110 | 86 | Il debriefing |
| 111 | Integrazione verificata | Principi e fonti di riferimento |
