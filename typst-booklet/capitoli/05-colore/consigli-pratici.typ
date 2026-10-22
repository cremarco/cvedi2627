#import "../../template/stile.typ": immagine, sito

#set page(columns: 1)

== Consigli pratici

=== La regola del 60-30-10

La regola del 60-30-10 può aiutare a distribuire colori dominanti, secondari e d’accento. Questa regola è spesso utilizzata nel design di interni.

Le proporzioni sono indicative e vanno adattate al progetto. Scegli un colore dominante e applicalo nel 60% dello spazio, un altro secondario utilizzato nel 30% e un ultimo colore per il restante 10%.

Le quote riguardano aree visive e non garantiscono leggibilità o gerarchia. Nell’interfaccia distingui neutri, accento e colori di stato; assegna i ruoli e verifica separatamente ogni coppia di testo e sfondo (@fig-colore-234).

#immagine(path("/assets/images/figure/colore/palette-cinema-dominanti-accenti.png"),
  [Distribuzione dei colori dominanti, secondari e d’accento in due esempi cinematografici.],
  alt: "Distribuzione dei colori dominanti, secondari e d’accento in due esempi cinematografici.",
  width: calc.min(137mm, 190pt * 324 / 191)) <fig-colore-234>

// Consigli ordinari e immagini compatte.
#set page(columns: 2)

=== Lasciati ispirare dalla natura

Osserva l’armonia e il contrasto dei colori della natura per trovare ispirazione per le tue palette.

Dall’immagine ricava una prima selezione, poi assegna superficie, testo e accento. Provali nei componenti: un accostamento efficace nella fotografia può richiedere modifiche per rendere leggibili informazioni e controlli (@fig-colore-235).

#immagine(path("/assets/images/figure/colore/palette-ghiaccio-foresta-deserto-fiori.png"),
  [Palette cromatiche ricavate da ghiaccio, foresta, deserto e fiori.],
  alt: "Palette cromatiche ricavate da ghiaccio, foresta, deserto e fiori.",
  width: 66mm) <fig-colore-235>

=== Scegli il contrasto in base al contesto

Il testo deve distinguersi chiaramente dallo sfondo. Nero su bianco può essere una scelta efficace; un grigio scuro può rendere il tono visivo più morbido, purché mantenga un contrasto adeguato.

Il comfort dipende anche da luminosità dello schermo, ambiente, dimensione dei caratteri e condizioni di visione. Verifica le combinazioni nel contesto d’uso e conserva i rapporti richiesti dalle WCAG.

Le alternative mostrate sono punti di partenza da valutare, non una regola che vieta il nero puro.

Al livello AA, le WCAG 2.2 richiedono almeno 4,5:1 per il testo ordinario e 3:1 per il testo grande. Le informazioni visive necessarie a riconoscere controlli, stati e grafici richiedono 3:1 rispetto ai colori adiacenti, con le eccezioni dei criteri. Le dimensioni del disegno non certificano da sole il testo grande (@fig-colore-236) @coloreWcag22.#sito([W3C, WCAG 2.2, criterio 1.4.3, Contrasto (minimo).], "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")#sito([W3C, WCAG 2.2, criterio 1.4.11, Contrasto non testuale.], "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html")

#immagine(path("/assets/images/figure/colore/alternative-nero-puro.png"),
  [Alternative al nero puro per il testo su fondo chiaro.],
  alt: "Alternative al nero puro per il testo su fondo chiaro.",
  width: 66mm) <fig-colore-236>

=== Ombre e luci

Il colore delle ombre dipende dall’illuminazione, dall’ambiente e dalle superfici. Un’ombra può contenere dominanti cromatiche diverse dal colore dell’oggetto.

Nell’interfaccia, ombre leggermente tonalizzate possono contribuire alla coerenza della palette. La scelta va valutata in relazione a sfondo, contrasto e profondità che si vuole suggerire (@fig-colore-237).

#immagine(path("/assets/images/figure/colore/ombre-luci-colori-ambiente.png"),
  [Ombre e luci: colori ricavati dall’ambiente e dalle superfici.],
  alt: "Ombre e luci: colori ricavati dall’ambiente e dalle superfici.",
  width: 66mm) <fig-colore-237>

// Confronti ampi dei temi e della palette applicata.
#set page(columns: 1)

=== La stessa interfaccia in chiaro e scuro

Nel passaggio fra tema chiaro e scuro conserva il ruolo dei colori e rivedine i valori. Superfici, testo, azioni e stati devono restare distinguibili. Una semplice inversione può alterare contrasto, accenti e percezione della profondità (@fig-colore-238).#sito([IBM Carbon, Themes. Documentazione consultata il 16 ottobre 2026.], "https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview")

#immagine(path("/assets/images/figure/colore/carbon-temi-white-gray-100.svg"),
  [Carbon Design System: lo stesso select nei temi White e Gray 100. I numeri nell’immagine rimandano ai ruoli documentati da IBM. Immagine ufficiale, consultata il 16 ottobre 2026.],
  diritti: [© IBM.],
  alt: "Carbon Design System: lo stesso select nei temi White e Gray 100. I numeri nell’immagine rimandano ai ruoli documentati da IBM. Immagine ufficiale, consultata il 16 ottobre 2026.",
  width: 137mm) <fig-colore-238>

Carbon conserva nomi e ruoli dei token e ne cambia i valori. Le annotazioni confrontano testo, icona, bordo, campo e sfondo.

La scelta dipende dal contesto d’uso e dall’obiettivo. Nero e grigi neutri si abbinano a molte palette; i grigi tonalizzati possono rafforzare la coerenza del prodotto. In entrambi i casi il contrasto con lo sfondo va verificato.

=== Dal riferimento alla schermata

Una fotografia suggerisce una prima direzione cromatica. Seleziona poi i valori in base all’uso: superficie, testo, azione e accento. Nel caso simulato di Sara, il pulsante deve rendere chiara la conferma dello spostamento dell’appuntamento (@fig-colore-239).#footnote[
  #set text(size: 7.5pt, variations: (opsz: 9))
  Adobe Color, ruota cromatica e costruzione della palette.
  #text(size: 7pt)[#link("https://color.adobe.com/create/color-wheel")]
  #linebreak()
  W3C, WCAG 2.2, criterio 1.4.3, Contrasto (minimo).
  #text(size: 7pt)[#link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")]
]

#immagine(path("/assets/images/figure/colore/palette-fotografia-schermata-sara.svg"),
  [Riferimento fotografico, palette adattata e confronto sul testo del pulsante. Caso simulato.],
  alt: "Riferimento fotografico, palette adattata e confronto sul testo del pulsante. Caso simulato.",
  width: 137mm) <fig-colore-239>

La palette è ispirata alla fotografia e adattata ai ruoli. La coppia iniziale bianco/verde chiaro è poco leggibile; un testo scuro aumenta il contrasto mantenendo la stessa campitura.

Per il testo, il colore è una parte della decisione: forma delle lettere, peso, dimensione e spaziatura determinano insieme come la gerarchia diventa leggibile. Queste relazioni guidano il passaggio alla tipografia del prototipo.

// Chiusura del capitolo nella gabbia ordinaria.
#set page(columns: 2)

=== Grigio tonalizzato

Le due scritte, sebbene appaiano entrambe nere, utilizzano due colori differenti (nero e blu scurissimo).

A parità di opacità l’effetto visivo finale è molto diverso: nel primo caso si avrà un grigio e nel secondo un grigio-blu.

Se i testi utilizzano una tonalità di un certo colore si hanno maggiori opportunità per avere più armonia con il resto dell'interfaccia.

Usare il nero e il grigio non è un male!

Un colore opaco e uno trasparente possono apparire simili su uno sfondo e diversi su un altro. Riducendo l’opacità, il risultato dipende dal colore sottostante: verifica ciascuna combinazione o definisci valori dedicati al ruolo (@fig-colore-240) @coloreCompositing2024.#sito([W3C, Compositing and Blending, § 5.1: colore sorgente, opacità e sfondo.], "https://www.w3.org/TR/compositing-1/#simplealphacompositing")

#immagine(path("/assets/images/figure/colore/grigi-neutri-tonalizzati.png"),
  [Grigi neutri e grigi tonalizzati applicati al testo.],
  alt: "Grigi neutri e grigi tonalizzati applicati al testo.",
  width: 66mm) <fig-colore-240>
