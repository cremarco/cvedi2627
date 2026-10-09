# iLMeteo · confronto di interfacce

## Platform
web

## Product Purpose
Esempio didattico CVeDI: confrontare la versione acquisita di iLMeteo e il redesign costruito dall’utente attraverso modifiche successive alla copia originale.

## Operating Context
L’ingresso apre il nuovo redesign. Home, Milano e Meteo domani sono disponibili in entrambe le versioni. Una tab laterale passa alla pagina corrispondente con la transizione a tendina esistente. La home del corso collega `ilmeteo/redesign/index.html`.

## Capabilities and Constraints
Dati congelati: Home e Italia sono acquisiti l’8 ottobre 2026, Milano il 9 ottobre. I controlli locali riusano esclusivamente contenuti acquisiti; servizi assenti mostrano lo stato locale esistente. La mappa radar del redesign è un segnaposto illustrativo richiesto dall’utente, senza dati meteorologici reali. Le copie precedenti, fonti, attribuzioni e licenze restano conservate. Pubblicazione su GitHub Pages autorizzata esplicitamente dall’utente il 9 ottobre 2026.

## Brand Commitments
Navbar navy, marchio bianco con sole arancio, ricerca integrata, ticker arancio con testo bianco ripetuto e punti equidistanti, schede dei giorni piatte e testo introduttivo in paragrafi. Conservare l’aspetto costruito dall’utente. Non applicare la grafica delle slide o del Caffè TTC.

## Evidence on Hand
`originale/` conserva le pagine precedenti; `sources/`, `data/` e `assets/manifest.json` conservano acquisizioni e provenienza. `assets/brand/` contiene il logo didattico ImageGen e il suo prompt; `assets/placeholder-manifest.json` descrive il segnaposto. Gli asset attivi riusano licenze e font locali. Il vecchio redesign sostituito è recuperabile dalla storia Git.

## Definition of Done
Sei pagine navigabili, confronto animato bidirezionale, tastiera, movimento ridotto e stampa verificati. Il nuovo collegamento della home funziona nella build Pages anche sotto `/cvedi2627/`. Pubblicazione dei soli file di runtime e asset locali; codice sorgente, CSS compilati e controlli separati.
