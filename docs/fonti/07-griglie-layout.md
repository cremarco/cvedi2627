# Griglie e layout · fonti delle slide

Il set autonomo locale segue Tipografia, senza cambiare la numerazione delle lezioni esistenti. Comprende 73 slide, sette sezioni e 80.5 minuti pianificati, inclusi 15 minuti di attività.

La fonte testuale corrente è `typst-booklet/capitoli/07-griglia.typ`, comprese le integrazioni locali successive alla Page Figma `4954:42`. Non si attribuiscono ai nuovi contenuti ordinali o folio dello snapshot storico. Il piano editoriale e la mappa delle slide sono in `assets/booklet/lezione-griglie/`; le 19 slide precedenti restano nell’archivio di Tipografia con le loro attribuzioni e note.

Le figure riusano gli originali del capitolo. Negli SVG per le slide, il testo diventa tracciato del font DM Sans originale: geometrie, testi, immagini e colori restano quelli della fonte. Originali, hash, font e licenze sono registrati in `image-manifest.json`; la ricostruzione avviene con `scripts/build/griglie-assets.py` e `scripts/build/griglie-slides.mjs`. Tutte le figure conservano alternativa testuale, didascalia, diritti e ingrandimento condiviso. La descrizione di Greiman indica la sola vista complessiva mostrata nella slide; la caption originale con il dettaglio resta nel catalogo. Le caselle vuote della matrice 398, assenti nel font originale, sono segni geometrici documentati nel manifest.

Gli schemi storici su responsive/adaptive, percentuali di attenzione e «Area aurea» sono accompagnati dalla lettura critica del capitolo. Vogue è un confronto storico, non una descrizione del sito attuale; le immagini non consentono di ricostruire breakpoint, tracce CSS o voci nascoste. Reflow, ingrandimento e spaziatura sono prove distinte del prodotto implementato.

| Slide | Titolo | Sezione della fonte | Figure |
|---|---|---|---|
| 1 | Griglie e layout | Dallo spazio alla struttura | — |
| 2 | Organizzare, adattare, verificare | Dallo spazio alla struttura | — |
| 3 | Dallo spazio alla struttura | Dallo spazio alla struttura | — |
| 4 | Dare struttura alle relazioni | Dallo spazio alla struttura | 359 |
| 5 | Allineamenti per confrontare | Rendere visibili le relazioni | 360 |
| 6 | Griglia, layout e gerarchia | Griglia, layout e gerarchia | 361 |
| 7 | Il bianco ha una misura | Il bianco ha una misura | 362 |
| 8 | Una storia di sistemi e scelte | Una storia di sistemi e scelte | — |
| 9 | Un metodo esplicito | Un metodo esplicito | 364 |
| 10 | Musica Viva, 1957 | Musica Viva, 1957 | 365 |
| 11 | Unigrid: un sistema editoriale | Unigrid: un sistema editoriale | 366 |
| 12 | Coordinare senza uniformare | Coordinare senza uniformare | 367 |
| 13 | Che cosa passa allo schermo | Che cosa passa allo schermo | 368 |
| 14 | Anatomia e costruzione | Anatomia e costruzione | — |
| 15 | Definire il campo utile | Anatomia e costruzione | 369 |
| 16 | Leggere il reticolo | Leggere il reticolo | 370 |
| 17 | Distinguere le parti della griglia | Leggere il reticolo | 2024-102-anatomia |
| 18 | Calcolare colonne uguali | Calcolare e verificare | 371 |
| 19 | Occupare più colonne | Calcolare e verificare | — |
| 20 | Margine, gutter e padding | Margine, intercolonna e spazio interno | materiali-spazi |
| 21 | Che cosa comprende la larghezza | Margine, intercolonna e spazio interno | — |
| 22 | Coordinare le linee di base | La griglia delle linee di base | 372 |
| 23 | Provare contenuti reali | Costruire con contenuti reali | 373 |
| 24 | Tipologie e pagina editoriale | Tipologie e pagina editoriale | — |
| 25 | Quattro logiche di organizzazione | Tipologie e pagina editoriale | 374 |
| 26 | Una colonna, una sequenza | Una colonna, una sequenza | 375 |
| 27 | Colonne per confrontare | Colonne per confrontare | 376 |
| 28 | Rendere chiaro l'ordine | Colonne per confrontare | — |
| 29 | Perché dodici colonne | Perché dodici colonne | materiali-dodici |
| 30 | Gli stessi contenuti, due assetti | Gli stessi contenuti, due assetti | 377 |
| 31 | Leggere una doppia pagina | Gli stessi contenuti, due assetti | 2024-103-editoriale |
| 32 | La griglia modulare | La griglia modulare | 378 |
| 33 | Gerarchia e asimmetria | Gerarchia e asimmetria | 379 |
| 34 | Progettare la doppia pagina | Progettare la doppia pagina | 380 |
| 35 | Dal foglio al viewport | Dal foglio al viewport | — |
| 36 | La griglia diventa comportamento | Dal foglio al viewport | 381 |
| 37 | Fisso, fluido e ibrido | Fisso, fluido e ibrido | 382 |
| 38 | Responsive e adaptive: leggere il confronto | Fisso, fluido e ibrido | 2024-105-responsive-adaptive |
| 39 | Un contenitore fluido con un limite | Un contenitore fluido con un limite | materiali-contenitore |
| 40 | La soglia nasce dal contenuto | Scegliere i punti di cambiamento | 383 |
| 41 | Viewport o contenitore? | Scegliere i punti di cambiamento | — |
| 42 | Golden Grid System | Golden Grid System | 384 |
| 43 | Leggere la presentazione originale | Golden Grid System | 2024-101-ggs |
| 44 | IBM e la 2x Grid | IBM e la 2x Grid | 385 |
| 45 | Dalla pagina al componente | Dalla griglia ai componenti | 386 |
| 46 | CSS Grid e Flexbox | Dalla griglia ai componenti | — |
| 47 | Conservare il soggetto | Adattare l'immagine, conservare il soggetto | materiali-immagini |
| 48 | Risoluzione e inquadratura | Risoluzione e inquadratura sono due scelte | — |
| 49 | Ordine visivo e ordine di lettura | Ordine visivo e ordine di lettura | 387 |
| 50 | Reflow: 320 px CSS | Reflow e testo che cresce | 388 |
| 51 | Resize Text: testo al 200% | Reflow e testo che cresce | — |
| 52 | Text Spacing: quattro valori insieme | Reflow e testo che cresce | — |
| 53 | Proporzioni e rottura | Proporzioni e rottura | — |
| 54 | Terzi e proporzioni auree | Proporzioni e rottura | 389 |
| 55 | Leggere criticamente i due schemi | Proporzioni e rottura | 2024-107-attenzione, 2024-107-terzi |
| 56 | Aureo, Fibonacci e spirale | Aureo, _Fibonacci_ e spirale | 390 |
| 57 | Confrontare la costruzione | Aureo, _Fibonacci_ e spirale | 2024-106-aureo |
| 58 | April Greiman, 1986 | _April Greiman_, 1986 | 391 |
| 59 | Uscire dalla griglia con uno scopo | Uscire dalla griglia con uno scopo | 392 |
| 60 | Leggere, progettare, verificare | Leggere, progettare, verificare | — |
| 61 | Osservare, ipotizzare, verificare | Leggere, progettare, verificare | 393 |
| 62 | Sara deve spostare un appuntamento | Sara deve spostare un appuntamento | 394 |
| 63 | Scegliere una nuova data | Scegliere una nuova data | 395 |
| 64 | Dall’interfaccia web al gioco | Dall'interfaccia web al gioco | 396 |
| 65 | Vogue Italia: due disposizioni | Leggere un confronto desktop e telefono | materiali-caso-responsive |
| 66 | Esercizio: tre strutture, stessi contenuti | Un esercizio di ricomposizione | 397 |
| 67 | Esercizio: due larghezze, una regola | Un esercizio di ricomposizione | — |
| 68 | Una matrice di prove | Una matrice di prove | 398 |
| 69 | Errori che la griglia non risolve | Errori che la griglia non risolve | 399 |
| 70 | Dal layout al flusso | Dal layout al flusso | 400 |
| 71 | Fonti: sistemi e opere | Lettura delle fonti | — |
| 72 | Fonti: layout e immagini | Lettura delle fonti | — |
| 73 | Fonti: adattamento e accessibilità | Lettura delle fonti | — |

Le fonti primarie del capitolo sono in `typst-booklet/bibliografia/07-griglia.yml`; i collegamenti didattici delle slide sono conservati nel piano editoriale. Le attribuzioni delle opere non vengono sostituite dalle fonti tecniche.
