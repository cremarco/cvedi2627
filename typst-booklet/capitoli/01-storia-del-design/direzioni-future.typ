#import "../../template/stile.typ": sito, immagine, schermata


== Possibili direzioni future

Il futuro delle interfacce non coincide con un unico nuovo stile. Gli esempi già disponibili suggeriscono *direzioni diverse*: tipografia più adattabile, materiali che comunicano profondità, strumenti generati su richiesta e pagine attente alle risorse. Sono punti di partenza, non previsioni certe.

Una scelta visiva è davvero efficace quando nasce da un *contesto d’uso* preciso e quando se ne possono verificare gli effetti. Per valutarla, conviene porsi tre domande: che cosa aiuta l’utente a capire? Quale azione gli rende più evidente? E, soprattutto, quali costi o difficoltà comporta? Un’interfaccia non è ben progettata perché è esteticamente gradevole, ma perché le sue scelte grafiche, messe alla prova, migliorano il modo in cui le persone la usano.

Scenari progettuali, osservati a ottobre 2026

*Adattare* — Tipografia e gerarchie cambiano con spazio, compito e preferenze.

*Orientare* — Profondità e materiali chiariscono relazioni tra contenuti e strumenti.

*Generare* — Il sistema propone forme e strumenti in risposta a una richiesta.

*Alleggerire* — Risorse, accessibilità e qualità dell’esperienza si valutano insieme.

// Tavola 62 · Tipografia adattabile

=== Tipografia adattabile ed espressiva

I *caratteri variabili* permettono di modificare peso, larghezza e altre qualità delle lettere entro gli assi previsti dal progetto. *Roboto Flex* mostra come una famiglia possa adattare titoli e testi a ruoli differenti @google-font-variabili. Material 3 Expressive combina invece forme, colore e movimento per dare maggiore identità alle interfacce @google-expressive.#sito([Google Design, Better, Easier, Emotional UX: ricerca e limiti contestuali di Material 3 Expressive.], "https://design.google/library/expressive-material-design-google-research") Una possibile direzione è un linguaggio visivo che cambia con lo spazio e le *preferenze* della persona, mantenendo gerarchie riconoscibili. L’espressività richiede misura: deformazioni e animazioni non devono ostacolare la lettura.

Una gerarchia stabile permette di adattare il carattere delle lettere senza disorientare. Espressività, deformazioni e movimento vanno dosati per proteggere la lettura. La @fig-storia-62-1 mostra il laboratorio Caffè TTC su schermo ampio; la @fig-storia-62-2 documenta gli assi di Roboto Flex.



#immagine(path("/assets/images/figure/storia-del-design/roboto-flex-assi-carattere-variabile-google.png"),
  [Assi di Roboto Flex. Google Developers.#sito([Assi di Roboto Flex.], "https://codelabs.developers.google.com/migrating-variable-fonts")],
  diritti: [Google Developers. Contenuti del Codelab CC BY 4.0, salvo eccezioni dichiarate.],
  alt: "Assi di Roboto Flex. Google Developers.") <fig-storia-62-2>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-adattabile-home-desktop.png"),
  [Caffè TTC · Tipografia adattabile, schermo ampio. Il campione usa Roboto Flex e offre controlli per variare il carattere.#sito([Caffè TTC · Tipografia adattabile], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=adattabile")],
  <fig-storia-62-1>,
  "Caffè TTC, laboratorio tipografico su schermo ampio: campione La tua lettura, preset e controlli degli assi di Roboto Flex.")

// Tavola 63 · Profondità

=== Profondità e materiali dinamici

La *profondità* può distinguere contenuti, strumenti e stati dell’interfaccia. *Liquid Glass* organizza controlli e navigazione sopra il contenuto con un materiale dinamico @apple-materiali. Nelle linee guida di *visionOS*, finestre e volumi occupano uno spazio percepibile attraverso distanza, occlusione e ombre @apple-spazio. Questi esempi aprono una possibile direzione: superfici capaci di adattarsi al contesto e comunicare relazioni. La tridimensionalità serve quando chiarisce il compito. Testi sospesi, livelli eccessivi o trasparenze indiscriminate possono aumentare fatica e ambiguità.

L’ipotesi Caffè TTC (@fig-storia-63-1) viene affiancata agli esempi documentari di Liquid Glass (@fig-storia-63-2, @fig-storia-63-3) e visionOS (@fig-storia-63-4, @fig-storia-63-5).



#immagine(path("/assets/images/figure/storia-del-design/apple-liquid-glass-materiale-sfondo-chiaro.png"),
  [Liquid Glass, chiaro. Apple HIG.#sito([Liquid Glass, chiaro.], "https://developer.apple.com/design/human-interface-guidelines/materials")],
  alt: "Liquid Glass, chiaro. Apple HIG.") <fig-storia-63-2>

#immagine(path("/assets/images/figure/storia-del-design/apple-liquid-glass-materiale-sfondo-scuro.png"),
  [Liquid Glass, scuro. Apple HIG.#sito([Liquid Glass, scuro.], "https://developer.apple.com/design/human-interface-guidelines/materials")],
  alt: "Liquid Glass, scuro. Apple HIG.") <fig-storia-63-3>

#immagine(path("/assets/images/figure/storia-del-design/apple-visionos-finestra-spaziale-notes.png"),
  [Finestra in visionOS. Apple HIG.#sito([Finestra in visionOS.], "https://developer.apple.com/design/human-interface-guidelines/spatial-layout/")],
  alt: "Finestra in visionOS. Apple HIG.") <fig-storia-63-4>

#immagine(path("/assets/images/figure/storia-del-design/apple-visionos-volume-spaziale.png"),
  [Volume in visionOS. Apple HIG.#sito([Volume in visionOS.], "https://developer.apple.com/design/human-interface-guidelines/spatial-layout/")],
  alt: "Volume in visionOS. Apple HIG.") <fig-storia-63-5>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-interfaccia-spaziale-home.png"),
  [Caffè TTC · simulazione AR. Pannelli e prodotti su piani distinti davanti a una strada fotografica sintetica; la scena non usa la fotocamera.#sito([Caffè TTC · simulazione AR], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=spaziale")],
  <fig-storia-63-1>,
  "Caffè TTC · simulazione AR. Pannelli e prodotti su piani distinti davanti a una strada fotografica sintetica; la scena non usa la fotocamera.")

// Tavola 64 · La conversazione del sito TTC sostituisce il precedente calcolatore fittizio.

=== Interfacce generate su richiesta

Un’*interfaccia generativa* può costruire strumenti e visualizzazioni in risposta a una richiesta, invece di restituire soltanto testo. Gli esperimenti di *Google Research* mostrano pagine, giochi e simulazioni creati in funzione del compito @leviathan2025-generative. La possibile evoluzione riguarda anche lo stile: la stessa informazione potrebbe assumere forme diverse per una persona o un contesto. La ricerca segnala però tempi di generazione e inesattezze. Occorrono *controlli stabili*, indicazioni sulla provenienza dei contenuti e possibilità di correggere il risultato senza perdere orientamento.

La persona verifica e corregge la proposta prima di confermare. Stato, provenienza e recupero dagli errori devono restare leggibili; tempi di generazione ed errori richiedono attenzione. La conversazione simulata della @fig-storia-generativa mostra come richieste successive compongano la pagina; la @fig-storia-64-1 documenta gli esperimenti di Google Research.



#immagine(path("/assets/images/figure/storia-del-design/google-research-interfacce-generative-2025.png"),
  [Interfacce generative. Google Research, 2025.#sito([Interfacce generative.], "https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/")],
  alt: "Interfacce generative. Google Research, 2025.") <fig-storia-64-1>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-interfaccia-generativa-home.png"),
  [Caffè TTC · interfaccia generativa. La conversazione predefinita compone la pagina con i dati locali del bar: è una simulazione, con contenuti fittizi.#sito([Caffè TTC · interfaccia generativa], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=generativa")],
  <fig-storia-generativa>,
  "Conversazione simulata di Caffè TTC: tre richieste e tre risposte compongono la pagina con le proposte, l’indirizzo e gli orari del bar immaginario.")

// Tavola 65 · Risorse

=== Un’estetica attenta alle risorse

La *leggerezza* può diventare una scelta visiva oltre che tecnica: immagini selezionate, tipografia ottimizzata e movimento proporzionato rendono più intenzionale la pagina. Le *Web Sustainability Guidelines* collegano esperienza, sviluppo e infrastrutture; a ottobre 2026 sono ancora una bozza W3C @w3c2026-sostenibilita.#sito([W3C, Web Sustainability Guidelines, Group Note Draft del 24 settembre 2026; non una Recommendation.], "https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20260924/") *Low-tech Magazine* offre un caso concreto: sito statico, immagini retinate e server alimentato dal sole @dedecker2018-lowtech.#sito([Kris De Decker, Marie Otsuka e Roel Roscam Abbing, How to Build a Low-tech Website?, 24 settembre 2018.], "https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/") Non esiste però un’estetica automaticamente sostenibile. Vanno misurati risorse e risultati, mantenendo accessibilità e qualità del servizio; un sito solare può anche andare offline.

Menu e orari restano disponibili come testo e collegamenti. Nella variante Primissimo web non vengono caricate immagini. Il risultato va verificato su connessioni lente e con tecnologie assistive, mantenendo qualità e disponibilità del servizio. Le @fig-storia-65-1 e @fig-storia-65-2 distinguono l’ipotesi Caffè TTC dal sito solare documentato.



#immagine(path("/assets/images/figure/storia-del-design/low-tech-magazine-sito-solare-2026.jpg"),
  [Sito solare di Low-tech Magazine, ottobre 2026.#sito([Sito solare di Low-tech], "https://solar.lowtechmagazine.com/")],
  alt: "Sito solare di Low-tech Magazine, ottobre 2026.") <fig-storia-65-2>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-primissimo-web-testuale-home.png"),
  [Caffè TTC · Primissimo web. Pagina composta da testo e collegamenti, senza immagini. La composizione essenziale riduce le risorse visive, senza dimostrare da sola la sostenibilità del servizio.#sito([Caffè TTC · Primissimo web], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=text")],
  <fig-storia-65-1>,
  "Caffè TTC · Primissimo web. Pagina composta da testo e collegamenti, senza immagini. La composizione essenziale riduce le risorse visive, senza dimostrare da sola la sostenibilità del servizio.")

// Tavola 66 · Criteri verificabili, non un nuovo stile imposto.

=== Una scelta, non una moda

Uno stile visivo non risolve da solo un problema di interazione. La storia mostra che tecnologie, media e pratiche d’uso cambiano insieme: alcune *convenzioni* restano, altre si trasformano. Per scegliere un linguaggio utile al progetto, occorre confrontare identità, *comprensione* e *condizioni reali d’uso*. Gli esempi di questo capitolo sono strumenti di lettura, non un catalogo di ricette.

*Compito* — Quale azione deve riconoscere e compiere la persona?

*Gerarchia* — Che cosa viene letto per primo? Quali relazioni restano visibili?

*Segnali* — Link, pulsanti e stati comunicano la loro funzione?

*Contesto* — Lo stile regge su schermi, dispositivi e condizioni d’uso differenti?

*Verifica* — Osservazione e prove con le persone confermano le scelte?

Le WCAG (Web Content Accessibility Guidelines) sono le linee guida del W3C per rendere i contenuti web accessibili alle persone con disabilità. Per le interfacce web, la versione 2.2 richiede al livello AA un *contrasto* del testo di almeno 4,5:1, o 3:1 per il testo grande. Gli elementi visivi essenziali dei controlli richiedono in genere 3:1, con le eccezioni previste @w3c2024-wcag22.#sito([W3C, WCAG 2.2: criteri 1.4.3 Contrasto minimo e 1.4.11 Contrasto non testuale, Recommendation del 12 dicembre 2024.], "https://www.w3.org/TR/WCAG22/") Un effetto visivo va valutato insieme alla *leggibilità* e alla riconoscibilità dell’azione.

