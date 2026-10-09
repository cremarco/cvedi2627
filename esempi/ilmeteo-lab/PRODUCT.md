# iLMeteo · laboratorio di riprogettazione

## Platform
web

## Product Purpose
Esercitazione locale di Comunicazione visiva e design delle interfacce: confrontare tre pagine autentiche di iLMeteo con una riprogettazione motivata e verificabile.

## Operating Context
L’ingresso del laboratorio apre direttamente la Home originale acquisita, senza pagina introduttiva. La pagina di analisi è conservata ma non è collegata nella navigazione del laboratorio.

Home, previsioni di Milano e previsioni nazionali di domani. Bologna è conservata nell’archivio e le sue vecchie pagine reindirizzano a Milano. Consultazione breve per scegliere luogo e data, leggere condizioni e dettagli, poi approfondire. Desktop, smartphone, tastiera, ingrandimento e stampa. Home e Italia conservano l’acquisizione dell’8 ottobre 2026; Milano usa la propria acquisizione del 9 ottobre 2026. Le date sono distinte nell’interfaccia. Nessuna copia è aggiornata in tempo reale.

## Capabilities and Constraints
Tre copie originali fedeli, tre pagine riprogettate, analisi delle criticità e confronto tra le versioni. Le pagine funzionano localmente senza servizi remoti necessari. Ricerca e selezioni operano sul contenuto acquisito; altri luoghi e servizi sono collegamenti espliciti al sito ufficiale oppure stati chiaramente non disponibili nella copia. I dati, le unità, le attribuzioni e i testi di fonte sono conservati. Nessuna previsione o allerta inventata. Riorganizzazione, etichette e sintesi derivate dai dati possono migliorare la comprensione. Pubblicazione esterna esclusa dal compito.

## Brand Commitments
Conservare il nome iLMeteo e il legame con blu e arancio. Su richiesta dell’utente, il redesign usa il nuovo logo didattico `redesign/assets/brand/ilmeteo-modern-v1.png`, generato con ImageGen: monogramma iL blu, sole arancio come punto della i e lettering Meteo sans-serif. Le copie originali conservano il logo autentico e la sua provenienza. Su richiesta dell’utente, il redesign usa anche una famiglia di icone ImageGen per condizioni meteo, ricerca e cambio versione; codici e testi meteorologici restano quelli acquisiti e, su successiva richiesta dell’utente, la mappa nazionale principale è ridisegnata con lo stesso linguaggio grafico. È indicata come grafica ridisegnata e collega la mappa acquisita per confronto; le altre mappe conservano l’artwork originale. La nuova interfaccia possiede un sistema autonomo; non applicare il linguaggio delle slide né quello di Caffè TTC. Usare daisyUI e Tailwind già presenti, separando contenuti, dati e presentazione.

## Evidence on Hand
HTML grezzo in sources/, copie consultabili in originale/, inventario degli asset e hash in assets/manifest.json, contenuti congelati in data/capture.json. Evidenze e controlli in reports/ilmeteo-lab/ nella radice del repository.

## Definition of Done
Originali acquisiti con provenienza; analisi indipendente di design e tecnica; sistema scelto e documentato; sei pagine navigabili; contenuti verificati; risorse locali; ricerca, filtri e navigazione testati; layout desktop/mobile/200% e stampa controllati; revisione finale indipendente completata. La qualità è dimostrata dai controlli e da prove di utilizzo, senza promettere perfezione universale.
