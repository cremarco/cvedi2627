# Griglie e layout · fonti delle slide

La lezione 09, autonoma e pubblicata online, segue Tipografia (08) e conclude il percorso delle lezioni. Comprende 63 slide senza divisori intermedi e 78 minuti pianificati, inclusi 15 minuti di attività.

La fonte testuale corrente è `progetti/booklet/capitoli/07-griglia.typ`, comprese le integrazioni locali successive alla Page Figma `4954:42`. Non si attribuiscono ai nuovi contenuti ordinali o folio dello snapshot storico. Il piano editoriale e la mappa delle slide sono in `progetti/slide/assets/booklet/lezione-griglie/`; le 19 slide precedenti restano nell’archivio di Tipografia con le loro attribuzioni e note.

Le figure riusano gli originali del capitolo. Negli SVG per le slide, il testo diventa tracciato del font DM Sans originale: geometrie, testi, immagini e colori restano quelli della fonte. Originali, hash, font e licenze sono registrati in `image-manifest.json`; la ricostruzione avviene con `progetti/slide/scripts/build/griglie-assets.py` e `progetti/slide/scripts/build/griglie-slides.mjs`. Tutte le figure conservano alternativa testuale, didascalia, diritti e ingrandimento condiviso. La descrizione di Greiman indica la sola vista complessiva mostrata nella slide; la caption originale con il dettaglio resta nel catalogo. Le caselle vuote della matrice 398, assenti nel font originale, sono segni geometrici documentati nel manifest.

Le integrazioni didattiche originali sono distinte dalle figure del booklet: confronti su box model, ordine delle colonne, query, Grid/Flexbox, immagini e rapporto aureo, più il kit simulato «Luce e spazio». Sorgenti SVG, font, hash, riferimenti e contenuti del kit sono in `progetti/slide/assets/slide-materials/griglie/manifest.json`; il generatore è `progetti/slide/scripts/build/griglie-teaching-assets.py`. Non hanno folio o nodi Figma attribuiti.

I nove passaggi accorpati o esclusi sono conservati in `simplification-archive.json`, con piano, mapping, Markdown e rimandi ai contenuti attivi. Fra questi restano gli schemi storici su responsive/adaptive, percentuali di attenzione e «Area aurea», insieme alla precedente lettura critica. Vogue rimane un confronto storico, non una descrizione del sito attuale; le immagini non consentono di ricostruire breakpoint, tracce CSS o voci nascoste. Reflow, ingrandimento e spaziatura restano prove distinte del prodotto implementato.

Le 63 note del relatore autorizzate sono un copione italiano per sintesi vocale, conservato per alias in `speaker-notes.json` e inserito dal generatore nei commenti Slidev. Approfondiscono i contenuti attivi con il capitolo corrente, senza riattivare i passaggi archiviati. Numeri e formule sono pronunciabili, le attività invitano a sospendere l’audio e le fonti non vengono lette come indirizzi. Tutte le note includono direttamente `[calm, matter-of-fact delivery]` e pause più distese, con stabilità comune 0,90; rimuovendo i soli tag si recupera il testo integrale conservato in `speaker-notes-original.json`. Ogni slide dispone di una nuova registrazione coerente con queste note e di controlli di riproduzione condivisi. Dopo la verifica integrale dei 63 file, le registrazioni precedenti sono rimosse su richiesta; i relativi metadati restano separati in `archivedClips` del manifest audio. La selezione non contiene rigenerazioni in attesa. Il copione mira a circa 60 minuti di parlato; i 15 minuti di attività restano autonomi e il budget della presentazione resta 78 minuti.

| Slide | Titolo | Sezione della fonte | Figure |
|---|---|---|---|
| 1 | Griglie e layout | Dallo spazio alla struttura | — |
| 2 | Organizzare, adattare, verificare | Dallo spazio alla struttura | — |
| 3 | Cosa impareremo | Dallo spazio alla struttura | — |
| 4 | Dare struttura alle relazioni | Dallo spazio alla struttura | 359 |
| 5 | Allineamenti per confrontare | Rendere visibili le relazioni | 360 |
| 6 | Griglia, layout e gerarchia | Griglia, layout e gerarchia | 361 |
| 7 | Il bianco ha una misura | Il bianco ha una misura | 362 |
| 8 | Un metodo esplicito | Un metodo esplicito | 364 |
| 9 | Musica Viva, 1957 | Musica Viva, 1957 | 365 |
| 10 | Unigrid: un sistema editoriale | Unigrid: un sistema editoriale | 366 |
| 11 | Coordinare senza uniformare | Coordinare senza uniformare | 367 |
| 12 | Definire il campo utile | Anatomia e costruzione | 369 |
| 13 | Leggere il reticolo | Leggere il reticolo | 370 |
| 14 | Distinguere le parti della griglia | Leggere il reticolo | 2024-102-anatomia |
| 15 | Calcolare colonne uguali | Calcolare e verificare | 371 |
| 16 | Occupare più colonne | Calcolare e verificare | — |
| 17 | Margine, gutter e padding | Margine, intercolonna e spazio interno | materiali-spazi |
| 18 | La stessa width, due ingombri | Margine, intercolonna e spazio interno | didattica-box-sizing |
| 19 | Coordinare le linee di base | La griglia delle linee di base | 372 |
| 20 | Provare contenuti reali | Costruire con contenuti reali | 373 |
| 21 | Quattro logiche di organizzazione | Tipologie e pagina editoriale | 374 |
| 22 | Una colonna, una sequenza | Una colonna, una sequenza | 375 |
| 23 | Colonne per confrontare | Colonne per confrontare | 376 |
| 24 | Rendere chiaro l'ordine | Colonne per confrontare | didattica-ordine-colonne |
| 25 | Perché dodici colonne | Perché dodici colonne | materiali-dodici |
| 26 | Gli stessi contenuti, due assetti | Gli stessi contenuti, due assetti | 377 |
| 27 | Leggere una doppia pagina | Gli stessi contenuti, due assetti | 2024-103-editoriale |
| 28 | La griglia modulare | La griglia modulare | 378 |
| 29 | Gerarchia e asimmetria | Gerarchia e asimmetria | 379 |
| 30 | Progettare la doppia pagina | Progettare la doppia pagina | 380 |
| 31 | Terzi e proporzioni auree | Proporzioni e rottura | 389 |
| 32 | Leggere il rapporto aureo | Aureo, _Fibonacci_ e spirale | didattica-rapporto-aureo |
| 33 | Aureo, Fibonacci e spirale | Aureo, _Fibonacci_ e spirale | 390 |
| 34 | April Greiman, 1986 | _April Greiman_, 1986 | 391 |
| 35 | Uscire dalla griglia con uno scopo | Uscire dalla griglia con uno scopo | 392 |
| 36 | La griglia diventa comportamento | Dal foglio al viewport | 381 |
| 37 | Fisso, fluido e ibrido | Fisso, fluido e ibrido | 382 |
| 38 | Un contenitore fluido con un limite | Un contenitore fluido con un limite | materiali-contenitore |
| 39 | La soglia nasce dal contenuto | Scegliere i punti di cambiamento | 383 |
| 40 | Viewport o contenitore? | Scegliere i punti di cambiamento | didattica-query-contenitore |
| 41 | Golden Grid System | Golden Grid System | 384 |
| 42 | IBM e la 2x Grid | IBM e la 2x Grid | 385 |
| 43 | Dalla pagina al componente | Dalla griglia ai componenti | 386 |
| 44 | CSS Grid e Flexbox | Dalla griglia ai componenti | didattica-grid-flexbox |
| 45 | Conservare il soggetto | Adattare l'immagine, conservare il soggetto | materiali-immagini |
| 46 | Risoluzione e inquadratura | Risoluzione e inquadratura sono due scelte | didattica-immagini-scelte |
| 47 | Vogue Italia: due disposizioni | Leggere un confronto desktop e telefono | materiali-caso-responsive |
| 48 | Ordine visivo e ordine di lettura | Ordine visivo e ordine di lettura | 387 |
| 49 | Reflow: 320 px CSS | Reflow e testo che cresce | 388 |
| 50 | Resize Text: testo al 200% | Reflow e testo che cresce | — |
| 51 | Text Spacing: quattro valori insieme | Reflow e testo che cresce | — |
| 52 | Sara deve spostare un appuntamento | Sara deve spostare un appuntamento | 394 |
| 53 | Scegliere una nuova data | Scegliere una nuova data | 395 |
| 54 | Dal layout al flusso | Dal layout al flusso | 400 |
| 55 | I contenuti comuni: Luce e spazio | Un esercizio di ricomposizione | — |
| 56 | Immagine e formati della prova | Un esercizio di ricomposizione | didattica-luce-e-spazio |
| 57 | Una matrice di prove | Una matrice di prove | 398 |
| 58 | Esercizio: tre strutture, stessi contenuti | Un esercizio di ricomposizione | 397 |
| 59 | Esercizio: due larghezze, una regola | Un esercizio di ricomposizione | — |
| 60 | Leggere, progettare, verificare | Errori che la griglia non risolve | 399 |
| 61 | Fonti: sistemi e opere | Lettura delle fonti | — |
| 62 | Fonti: layout e immagini | Lettura delle fonti | — |
| 63 | Fonti: adattamento e accessibilità | Lettura delle fonti | — |

Le fonti primarie del capitolo sono in `progetti/booklet/bibliografia/07-griglia.yml`; i collegamenti didattici delle slide sono conservati nel piano editoriale. Le attribuzioni delle opere non vengono sostituite dalle fonti tecniche.
