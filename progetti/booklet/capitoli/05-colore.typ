// Capitolo 05: unico testo per volume e compilazione autonoma.
#import "../template/layout.typ": booklet, chapter, website-note
#import "../template/plan.typ": chapter-parameters
#import "../template/figures.typ": image-figure
#import "../template/editorial.typ": caption-content, compact-note
#import "../template/pages.typ": document-plate

#let content = [
#import "../assets/diagrams/color-harmonies.typ": harmony-chart
// Ordine editoriale del capitolo; le varianti restano nei rispettivi ambiti locali.
// Cultura e Albers condividono lo stesso ambito di pagina: separarli chiuderebbe il flusso prima del previsto.
// Le varianti a una colonna comprendono il ritorno a due; le regole IKEA restano nel loro blocco.
// Trasposizione del capitolo Colore dalla fonte Figma corrente del 21 ottobre 2026.
// Prosa, enfasi, attribuzioni e originali sono verificati nel rapporto di copertura.
// Nessuna riga, colonna o pagina del corpo è posizionata manualmente.

// Preordine nativo delle fonti W3C2024: i suffissi APA seguono i titoli.
// form:none non stampa citazioni aggiuntive; quelle visibili restano nella prosa.
#cite(<coloreCompositing2024>, form: none)
#cite(<coloreWcag22>, form: none)

// Le sequenze di diagrammi ampi usano localmente una colonna, come richiesto.
// Il resto del capitolo mantiene le due colonne native del volume.
// Le figure restano nel flusso, con caption modificabile e richiami nativi.

#[

// Proprietà, modelli e schemi cromatici, con esempi e ruoli.
#set page(columns: 1)

== Teoria e uso del colore

*Il colore partecipa alla gerarchia già costruita con dimensione, posizione e spazio: permette di distinguere elementi, stabilire relazioni e caratterizzare il linguaggio visivo del progetto.*

La psicologia del colore studia le relazioni tra percezione cromatica, associazioni ed emozioni. Non esiste però una corrispondenza fissa tra ogni colore e una specifica emozione o area del cervello: esperienza, cultura, contesto e composizione sono determinanti nell'influenzare la risposta delle persone.

La scelta di una palette va quindi collegata al compito e al pubblico emersi dalla ricerca, mantenendo leggibilità e segnali comprensibili. Quando il colore riguarda il testo, questa decisione si intreccia con la tipografia.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Quando scegli un colore, osserva come appare accanto agli altri, quali significati può evocare per il tuo pubblico e che cosa deve comunicare. Un colore di marca aiuta a riconoscere il prodotto, mentre un colore di stato può segnalare, per esempio, che un’azione è riuscita. Nella schermata finale, verifica che il colore svolga il ruolo che gli hai assegnato.»
]
#highlight(fill: rgb("FFF1A8"))[Nella scelta distingui tre domande: come appare il colore nell’accostamento, quali associazioni richiama e quale funzione svolge. Un colore di marca caratterizza il prodotto; un colore di stato aiuta a riconoscere ciò che è avvenuto. Verifica entrambe le funzioni nella schermata concreta.]

=== Le proprietà del colore

Al colore possiamo attribuire delle proprietà; tonalità, saturazione e valore, per esempio, descrivono aspetti diversi di uno stesso colore. Nel modello HSV, $H$ individua la tinta sulla ruota, $S$ la saturazione e $V$ il valore. Confrontare serie in cui cambia un parametro alla volta aiuta a riconoscerne gli effetti nella composizione (@fig-colore-196).#website-note([Adobe, HSB, RGB e relazioni cromatiche.], "https://helpx.adobe.com/photoshop-elements/desktop/working-with-colors/color.html")

#image-figure(path("/risorse-condivise/immagini/figure/colore/proprieta-hsv.png"),
  [Un parametro alla volta: variazioni di tonalità, saturazione e valore nel modello HSV.],
  format: "due-colonne",
  alt: "Un parametro alla volta: variazioni di tonalità, saturazione e valore nel modello HSV.",
  width: 137mm,
  id: "fig-colore-196",
)

Il valore $V$ non coincide con la luminanza relativa usata dalle WCAG: due campioni con lo stesso $V$ possono infatti avere contrasti molto diversi rispetto allo sfondo.

=== Colore emesso e colore stampato

Nella progettazione cromatica, ci sono aspetti che vanno tenuti in considerazione. Uno schermo produce luce attraverso componenti rosse, verdi e blu: è la sintesi additiva RGB. Nella stampa, ciano, magenta e giallo assorbono parte della luce; il nero K completa il processo CMYK. RYB è un riferimento pittorico tradizionale, con primari differenti (@fig-colore-197).#website-note([Adobe, modi colore.], "https://helpx.adobe.com/photoshop/desktop/adjust-color/choose-colors/color-modes-in-photoshop.html")

#image-figure(path("/risorse-condivise/immagini/figure/colore/modelli-rgb-cmy-ryb.png"),
  [Schemi illustrativi di RGB, CMY e primari RYB; le sovrapposizioni non simulano una prova di stampa.],
  format: "due-colonne",
  alt: "Schemi illustrativi di RGB, CMY e primari RYB; le sovrapposizioni non simulano una prova di stampa.",
  width: 137mm,
  id: "fig-colore-197",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nel passaggio dallo schermo alla stampa, uno stesso colore può cambiare aspetto. La resa dipende dallo spazio colore, dal profilo usato per la conversione e dal materiale su cui si stampa. Alcuni colori visibili sullo schermo sono fuori dalla gamma riproducibile con gli inchiostri e il supporto scelti.»
]
#highlight(fill: rgb("FFF1A8"))[Il risultato dipende anche dallo spazio colore, dal profilo e dal supporto. Un colore visibile sullo schermo può non essere riproducibile nello stesso modo con gli inchiostri.]

=== Leggere la ruota cromatica

La ruota cromatica è uno schema visivo che dispone le tonalità lungo un percorso circolare. Il riferimento cambia le vicinanze e le opposizioni: nella ruota RGB/HSV rosso e ciano sono opposti; nel riferimento pittorico RYB lo sono rosso e verde. Le due costruzioni non vanno sovrapposte (@fig-colore-198).#website-note([Adobe, HSB, RGB e relazioni cromatiche.], "https://helpx.adobe.com/photoshop-elements/desktop/working-with-colors/color.html")

#image-figure(path("/risorse-condivise/immagini/figure/colore/ruote-hsv-ryb.png"),
  [Ruote cromatiche: RGB/HSV (a sinistra) e RYB tradizionale (a destra). Le terne grandi indicano i primari del riferimento.],
  format: "due-colonne",
  alt: "Ruote cromatiche: RGB/HSV (a sinistra) e RYB tradizionale (a destra). Le terne grandi indicano i primari del riferimento.",
  width: 137mm,
  id: "fig-colore-198",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Ogni ruota mostra dodici campioni. Nei diagrammi, i punti più grandi evidenziano le tinte selezionate e i segmenti mostrano come sono disposte sulla ruota. In HSV, la tonalità $H$ cambia di 30° da un campione al successivo. La ruota RYB segue una convenzione pittorica. Per sapere quale colore produce una miscela concreta, occorre considerare i pigmenti usati.»
]
#highlight(fill: rgb("FFF1A8"))[I diagrammi usano dodici campioni, punti selezionati più grandi e collegamenti geometrici. In HSV i passi di $H$ sono di 30°; la ruota RYB è uno schema tradizionale e non descrive la miscela reale di ogni pigmento.]

=== Monocromatico

Uno schema monocromatico parte da una sola tinta e ne varia saturazione e valore. La continuità cromatica può unificare l’interfaccia ma le differenze fra superfici, contenuti e azioni devono restare riconoscibili (@fig-colore-199).#website-note([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#figure([#harmony-chart(path("/risorse-condivise/immagini/figure/colore/schema-monocromatico.svg"), alt: "Schema monocromatico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i tre campioni interni variano saturazione e valore.", legend: [Una sola tinta · $S$ e $V$ variano], palette-alt: "Campioni della palette cromatica originale.")],
  kind: image, supplement: [Figura], placement: top, scope: "column",
  caption: caption-content([Schema monocromatico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i tre campioni interni variano saturazione e valore.], rights: none),
) <fig-colore-199>

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «I tre campioni interni hanno la stessa tonalità ($H = 210°$) e si distinguono per saturazione ($S$) e valore ($V$). Puoi usare queste variazioni per dare un peso diverso a sfondo, testo e pulsanti. Anche i colori neutri e gli spazi vuoti aiutano a separare gli elementi. Verifica il contrasto di ogni testo rispetto allo sfondo su cui compare.»
]
#highlight(fill: rgb("FFF1A8"))[I tre campioni interni mantengono $H = 210°$ e cambiano $S$ e $V$. Una palette monocromatica non impone a testo, sfondo e pulsanti la stessa intensità. Neutri e spazi vuoti contribuiscono alla gerarchia; ogni coppia di testo e sfondo richiede una verifica del contrasto.]

=== Monocromatico: esempi

Smartwater e Netlife Research mostrano due dominanti molto diverse: blu nel primo caso, verde nel secondo. In entrambi, variazioni della stessa famiglia e colori neutri costruiscono gran parte della composizione (@fig-colore-200 e @fig-colore-netlife-research).

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/smartwater.svg"),
  [Smartwater. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-200",
  alt: "Smartwater. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/netlife-research.svg"),
  [Netlife Research. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-netlife-research",
  alt: "Netlife Research. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

Smartwater usa il blu per ambiente, acqua e prodotto, con dettagli chiari.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «La composizione si definisce monocromatica perché la maggior parte dei suoi elementi riprende le variazioni di una stessa tinta. Nelle immagini e nei dettagli possono comparire anche altri colori.»
]
Netlife Research concentra il campo sul verde; testo scuro e aree chiare distinguono navigazione e contenuti. #highlight(fill: rgb("FFF1A8"))[Monocromatico descrive la prevalenza della palette, non ogni pixel delle immagini.]

=== Analogo

Uno schema analogo seleziona tinte vicine sulla ruota. In questo esempio HSV, ciano, azzurro e blu occupano tre posizioni consecutive. La vicinanza delle tinte sostiene la continuità visiva senza annullare le differenze (@fig-colore-201).#website-note([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#figure([#harmony-chart(path("/risorse-condivise/immagini/figure/colore/schema-analogo.svg"), alt: "Schema analogo sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.", legend: [$H = 180°, 210°, 240°$ · tinte vicine], palette-alt: "Campioni della palette cromatica originale.")],
  kind: image, supplement: [Figura], placement: top, scope: "column",
  caption: caption-content([Schema analogo sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.], rights: none),
) <fig-colore-201>

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Lascia che una tinta prevalga e usa quelle vicine sulla ruota per distinguere superfici e dettagli. Regola quanto spazio occupa ciascuna tinta e quanto appare satura, chiara o scura in base al suo ruolo. Anche due tinte che si accordano bene possono avere una luminanza simile. Controlla che titoli e comandi si distinguano dalle superfici su cui compaiono.»
]
#highlight(fill: rgb("FFF1A8"))[Scegli una dominante e usa le tinte adiacenti per superfici o accenti. Saturazione, valore e quantità aiutano a separare le funzioni. Se i colori hanno luminanza simile, un titolo o un controllo può restare poco leggibile anche in una palette coerente.]

=== Analogo: esempi

Il sito Boost preso ad esempio accosta giallo e arancione; Omnium combina blu, violetto e ciano. Le schermate mostrano come famiglie vicine possano sostenere una dominante calda o fredda, variando anche saturazione e valore (@fig-colore-202 e @fig-colore-omnium).

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/boost.svg"),
  [Boost. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-202",
  alt: "Boost. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/omnium.svg"),
  [Omnium. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-omnium",
  alt: "Omnium. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

Nel sito Boost il fondo e il prodotto mantengono passaggi caldi; il bianco evidenzia il titolo.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «I campioni delle figure aiutano a riconoscere le famiglie di colore che prevalgono nelle schermate. Sono approssimazioni. La ruota mostra invece la posizione reciproca delle tinte in uno schema analogo.»
]
In Omnium luce e volume dell’illustrazione sviluppano passaggi fra tinte vicine. #highlight(fill: rgb("FFF1A8"))[I campioni sono indicativi: le ruote spiegano una relazione e non misurano gli screenshot.]

=== Complementare

Uno schema complementare accosta due tinte opposte sulla ruota adottata. Nell’esempio HSV, arancione e azzurro sono distanti 180°. La relazione rende evidente la differenza di tinta, ma non misura il contrasto di luminanza (@fig-colore-203).#website-note([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#figure([#harmony-chart(path("/risorse-condivise/immagini/figure/colore/schema-complementare.svg"), alt: "Schema complementare sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.", legend: [$H = 30°$ e $210°$ · distanza $180°$], palette-alt: "Campioni della palette cromatica originale.")],
  kind: image, supplement: [Figura], placement: top, scope: "column",
  caption: caption-content([Schema complementare sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.], rights: none),
) <fig-colore-203>

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Puoi usare un colore per le superfici più ampie, come lo sfondo, e riservare il suo opposto agli elementi da mettere in risalto. Controlla il contrasto tra i testi e le superfici su cui li collochi. In questo esempio la coppia è complementare sulla ruota HSV. Con un’altra ruota, la stessa tinta può avere un opposto diverso.»
]
#highlight(fill: rgb("FFF1A8"))[Assegna quantità e funzioni diverse ai due colori: una dominante può occupare il fondo e l’opposto può identificare un accento. Verifica le coppie effettive di testo e superficie. I complementari cambiano con il riferimento: qui la costruzione è HSV.]

=== Complementare: esempi

Série Découvertes e The Ancient World accostano campi blu a elementi arancioni o sabbia. Le differenze di area e posizione costruiscono una gerarchia e richiamano una relazione complementare fra famiglie di tinta (@fig-colore-204 e @fig-colore-ancient-world).

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/serie-decouvertes.svg"),
  [Série Découvertes. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-204",
  alt: "Série Découvertes. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/ancient-world.svg"),
  [The Ancient World. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-ancient-world",
  alt: "The Ancient World. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

Série Découvertes, presentata da WKND 91,9 FM, usa arancione e blu scuro con pesi differenti.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «In The Ancient World, il blu petrolio si accosta ai toni caldi del paesaggio. È questo accostamento a richiamare lo schema complementare. Le altre sfumature della fotografia fanno parte della composizione e arricchiscono la palette.»
]
#highlight(fill: rgb("FFF1A8"))[The Ancient World combina blu petrolio e toni caldi del paesaggio. Una schermata fotografica contiene molte tinte: l’etichetta descrive la relazione generale.]

=== Complementare divergente

Lo schema complementare divergente usa una tinta e le due adiacenti al suo opposto. Rispetto alla coppia complementare aggiunge una seconda direzione di accento. Nel diagramma, arancione, ciano e blu formano la terna selezionata (@fig-colore-205).#website-note([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#figure([#harmony-chart(path("/risorse-condivise/immagini/figure/colore/schema-complementare-divergente.svg"), alt: "Schema complementare divergente sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.", legend: [$H = 30°, 180°, 240°$ · ai lati dell’opposto], palette-alt: "Campioni della palette cromatica originale.")],
  kind: image, supplement: [Figura], placement: top, scope: "column",
  caption: caption-content([Schema complementare divergente sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.], rights: none),
) <fig-colore-205>

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Usa la tinta di base per dare unità alla composizione e dosa i due accenti secondo l’importanza degli elementi. Puoi regolare quanto spazio occupano, quanto sono saturi e quanto appaiono chiari o scuri. Nella schermata finale, verifica che errori, conferme e focus siano riconoscibili. Accompagna errori e conferme con un testo esplicito e rendi il focus visibile con un indicatore, per esempio un contorno ben distinguibile.»
]
#highlight(fill: rgb("FFF1A8"))[La base e i due accenti non devono competere con la stessa intensità. Varia saturazione, valore e quantità in funzione del contenuto. Prima di assegnare colori a errori, conferme o focus, controlla che tali stati restino distinguibili e siano spiegati anche dal testo.]

=== Complementare divergente: esempi

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nelle schermate, le tinte possono essere più tenui di quelle del diagramma e le immagini aggiungono altre sfumature. Lo schema aiuta a riconoscere il rapporto tra la tinta dominante e i due accenti.»
]
Gli screenshot di Neverland e Skin Health Alliance permettono di osservare una dominante accompagnata da accenti su due famiglie diverse. #highlight(fill: rgb("FFF1A8"))[Le palette reali usano sfumature attenuate e colori delle immagini: la relazione va letta come orientamento] (@fig-colore-206 e @fig-colore-skin-health-alliance).

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/neverland.svg"),
  [Neverland. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-206",
  alt: "Neverland. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/skin-health-alliance.svg"),
  [Skin Health Alliance. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-skin-health-alliance",
  alt: "Skin Health Alliance. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

Neverland costruisce il campo sul rosa, con dettagli verde menta e piccoli accenti caldi.

Skin Health Alliance distribuisce viola chiaro, giallo e verde scuro fra fondo e blocchi informativi. Il dato “82%” emerge anche per scala, posizione e contenuto.

=== Triadico

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Uno schema triadico, selezionatre tre tinte a uguale distanza sulla ruota. Nel modello HSV, tra una tinta e la successiva ci sono 120°. Una volta scelte le tinte, si può ancora decidere quanto renderle sature, quanto schiarirle o scurirle e quanto spazio assegnare a ciascuna.»
]
#highlight(fill: rgb("FFF1A8"))[Uno schema triadico seleziona tre tinte equidistanti sulla ruota. Nel riferimento HSV gli intervalli sono di 120°. La geometria definisce la relazione fra le tinte; saturazione, valore e quantità restano scelte progettuali ulteriori] (@fig-colore-207).#website-note([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#figure([#harmony-chart(path("/risorse-condivise/immagini/figure/colore/schema-triadico.svg"), alt: "Schema triadico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.", legend: [$H = 30°, 150°, 270°$ · intervalli di $120°$], palette-alt: "Campioni della palette cromatica originale.")],
  kind: image, supplement: [Figura], placement: top, scope: "column",
  caption: caption-content([Schema triadico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.], rights: none),
) <fig-colore-207>

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Fai prevalere una delle tre tinte e assegna alle altre due un compito preciso, per esempio distinguere una superficie o mettere in risalto un comando. Varia la loro intensità e lo spazio che occupano in base alla gerarchia della pagina. Per verificare la leggibilità di un testo o la visibilità di un controllo, confrontalo direttamente con la superficie su cui compare.»
]
#highlight(fill: rgb("FFF1A8"))[Scegli una tinta dominante e assegna alle altre ruoli riconoscibili. Una triade non richiede tre aree uguali o tre accenti ugualmente intensi. Verifica ogni coppia necessaria alla lettura e all’interazione: la distanza angolare non garantisce il contrasto.]

=== Triadico: esempi

SecretKey richiama tre famiglie, viola, arancione e verde attenuato. SMI serve da confronto critico: contare tre campioni non basta per riconoscere una triade esatta, perché alcuni possono funzionare come neutri (@fig-colore-208 e @fig-colore-smi).

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/secretkey.svg"),
  [Secretkey. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-208",
  alt: "Secretkey. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/smi.svg"),
  [SMI · confronto. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  format: "due-colonne",
  id: "fig-colore-smi",
  alt: "SMI · confronto. Screenshot storico; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  height: 110mm,
)

In SecretKey viola e arancione costruiscono ambiente e accenti; il verde compare soprattutto nell’illustrazione.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nella schermata di SMI, il viola e il verde risaltano sul fondo bruno. Per stabilire se l’accostamento segue uno schema triadico, occorre individuare le tre tinte di riferimento della palette e verificare che si trovino a intervalli di 120° sulla ruota HSV.»
]
#highlight(fill: rgb("FFF1A8"))[In SMI emergono viola e verde con un fondo bruno neutro. La lettura come triadico resta da verificare: lo screenshot da solo non dimostra tre intervalli di 120°.]

=== Dalla palette ai ruoli

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Per usare la palette in modo coerente, stabilisci quali colori servono per le superfici, i testi, i comandi, i bordi e l’indicatore di focus. Se una tinta del marchio serve anche a segnalare uno stato, chiarisci il suo significato con un testo esplicito, un’icona o la posizione del messaggio nella schermata.»
]
#highlight(fill: rgb("FFF1A8"))[Una palette diventa un sistema quando ogni colore ha un uso riconoscibile. Superficie, testo, azione, bordo e focus hanno esigenze differenti. I colori di marca possono coincidere con quelli di stato: testo, icone e posizione devono allora chiarire la funzione] (@fig-colore-209).#website-note([GOV.UK Design System, Error summary.], "https://design-system.service.gov.uk/components/error-summary/")#website-note([GOV.UK Design System, Colour.], "https://design-system.service.gov.uk/styles/colour/")

#image-figure(path("/risorse-condivise/immagini/figure/colore/govuk-ruoli-cromatici-errore.svg"),
  [GOV.UK Design System: riepilogo, messaggio e bordo rendono riconoscibile l’errore insieme al testo. Screenshot dell’esempio ufficiale, 16 ottobre 2026.],
  format: "due-colonne",
  rights: [© Crown copyright. Open Government Licence v3.0, salvo eccezioni dichiarate dalla fonte.],
  alt: "GOV.UK Design System: riepilogo, messaggio e bordo rendono riconoscibile l’errore insieme al testo. Screenshot dell’esempio ufficiale, 16 ottobre 2026.",
  width: 137mm,
  id: "fig-colore-209",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nell’esempio di GOV.UK, il rosso collega il riepilogo degli errori, il messaggio vicino alla risposta e il bordo del campo da correggere. Il messaggio spiega che cosa correggere e il link nel riepilogo porta al punto del modulo dove intervenire. Questi segnali rendono l’errore comprensibile anche a chi fatica a distinguere il rosso. Sopra lo screenshot, i campioni illustrano anche altri ruoli della palette, come il focus.»
]
#highlight(fill: rgb("FFF1A8"))[Nell’esempio GOV.UK il rosso accomuna riepilogo, messaggio e bordo del campo. Il testo specifica cosa correggere e il link conduce alla risposta: l’informazione resta comprensibile anche senza distinguere il colore. I campioni sopra lo screenshot ricordano ruoli diversi, non tutti presenti in questo stato.]

// Riprendono le due colonne per colori e identità visive.
#set page(columns: 2)

=== Colori caldi e colori freddi

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «In genere si chiamano calde le tinte vicine al rosso, all’arancione e al giallo, e fredde quelle vicine al blu, al verde e al viola. L’impressione cambia con l’accostamento. Lo stesso verde, per esempio, può sembrare più caldo accanto a un blu e più freddo accanto a un giallo.»
]
#highlight(fill: rgb("FFF1A8"))[Per convenzione si definiscono calde le tonalità vicine a rosso, arancio e giallo, e fredde quelle vicine a blu, verde e viola. La percezione di caldo e freddo dipende però anche dalle tonalità accostate.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Bianco, nero e grigi si chiamano acromatici perché privi di tonalità. Lo stesso grigio può sembrare più caldo o più freddo a seconda del colore di sfondo e delle tinte che lo circondano. Anche saturazione e valore cambiano l’aspetto dei colori. Per capire che cosa cambia, confronta campioni della stessa tinta variando prima la saturazione e poi il valore, un parametro alla volta.»
]
#highlight(fill: rgb("FFF1A8"))[Bianco, nero e grigi sono colori acromatici. Un grigio può apparire più caldo o freddo in presenza di una dominante cromatica o per effetto dello sfondo. Anche saturazione e valore modificano l’effetto della tinta: confrontali mantenendo costanti gli altri parametri] (@fig-colore-210).

#image-figure(path("/risorse-condivise/immagini/figure/colore/scena-colori-caldi-freddi.png"),
  [La stessa scena interpretata con colori caldi e colori freddi.],
  format: "una-colonna",
  alt: "La stessa scena interpretata con colori caldi e colori freddi.",
  width: 66mm,
  id: "fig-colore-210",
)

=== Rosso

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «A seconda della situazione e delle convenzioni del pubblico, il rosso può evocare passione o energia, oppure richiamare l’attenzione su un pericolo o su qualcosa di urgente.»
]
#highlight(fill: rgb("FFF1A8"))[Il rosso può richiamare passione, energia, pericolo o urgenza, secondo il contesto culturale e comunicativo.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Il rosso può far risaltare un elemento quando crea un contrasto sufficiente con lo sfondo. Usare lo stesso rosso per una conferma e per un errore può rendere ambigui i due stati. Quando il rosso del marchio serve anche per gli errori, rendi chiaro che cosa è successo con un messaggio esplicito, un’icona riconoscibile e una posizione coerente, per esempio vicino al campo da correggere.»
]
#highlight(fill: rgb("FFF1A8"))[Nel design può rendere evidente un elemento se contrasta con lo sfondo. Va usato in modo coerente: associare lo stesso colore a un’azione positiva e a un errore può creare ambiguità. Se colore di marca ed errore coincidono, testo, icone e posizione devono rendere riconoscibile la funzione] (@fig-colore-211).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-rosso.png"),
  [Il rosso nelle identità visive di Adobe, Canon, Coca-Cola e Marvel.],
  format: "una-colonna",
  alt: "Il rosso nelle identità visive di Adobe, Canon, Coca-Cola e Marvel.",
  width: calc.min(66mm, 210pt * 241 / 334),
  id: "fig-colore-211",
)

=== Arancio

L’arancione è una tonalità calda che può suggerire energia, entusiasmo o informalità. Le associazioni cambiano con saturazione, luminosità e contesto.

Nel design può dare rilievo a inviti all’azione e accenti visivi. Per conservarne l’efficacia, occorre valutare contrasto e coerenza con l’identità del progetto. Quando molti elementi hanno la stessa evidenza cromatica, l’azione principale diventa più difficile da individuare (@fig-colore-212).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-arancio.png"),
  [L’arancione nelle identità visive di easyJet, Etsy, SoundCloud e Nickelodeon.],
  format: "una-colonna",
  alt: "L’arancione nelle identità visive di easyJet, Etsy, SoundCloud e Nickelodeon.",
  width: calc.min(66mm, 210pt * 250 / 343),
  id: "fig-colore-212",
)

=== Giallo

Il giallo può richiamare sole, calore e vivacità; in altri contesti segnala attenzione o pericolo.

Nel design può creare accenti luminosi, ma su uno sfondo chiaro alcune tonalità risultano poco leggibili. La scelta va verificata attraverso il contrasto, senza presumere che il colore produca sempre la stessa emozione. Il giallo puro su bianco ha contrasto circa 1,07:1; il nero sullo stesso giallo circa 19,56:1 (@fig-colore-213).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-giallo.png"),
  [Il giallo nelle identità visive di Nikon, CAT, Ferrari e Hertz.],
  format: "una-colonna",
  alt: "Il giallo nelle identità visive di Nikon, CAT, Ferrari e Hertz.",
  width: calc.min(66mm, 210pt * 250 / 343),
  id: "fig-colore-213",
)

=== Verde

Il verde è spesso associato a natura, crescita ed equilibrio, ma i suoi significati variano tra contesti e culture.

Può sostenere l’identità visiva di prodotti legati all’ambiente o indicare uno stato positivo nell’interfaccia. Questa convenzione non basta da sola: colore, testo e icone devono contribuire insieme a rendere il messaggio comprensibile. Una conferma come «Salvato» deve dichiarare ciò che è avvenuto, anche quando il verde non viene distinto (@fig-colore-214).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-verde.png"),
  [Il verde nelle identità visive di Lacoste, Spotify, Tic Tac e Sprite.],
  format: "una-colonna",
  alt: "Il verde nelle identità visive di Lacoste, Spotify, Tic Tac e Sprite.",
  width: calc.min(66mm, 210pt * 250 / 343),
  id: "fig-colore-214",
)

=== Blu

Il blu è spesso usato nelle identità visive per suggerire affidabilità, stabilità o competenza. Può anche richiamare distanza o malinconia, secondo il contesto.

Nessuna di queste associazioni è automatica. Tonalità, contrasto, immagini e tono del messaggio contribuiscono insieme alla percezione del marchio. Colore di marca, link e selezione sono ruoli distinti; la sottolineatura può rendere riconoscibile un collegamento (@fig-colore-215).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-blu.png"),
  [Il blu nelle identità visive di American Express, Oral-B, Zurich e Allianz.],
  format: "una-colonna",
  alt: "Il blu nelle identità visive di American Express, Oral-B, Zurich e Allianz.",
  width: calc.min(66mm, 210pt * 250 / 343),
  id: "fig-colore-215",
)

=== Marrone

Il marrone può richiamare terra, legno, artigianalità e calore. Per questo compare spesso nelle identità di prodotti alimentari e materiali naturali.

Può essere usato come sfondo o accento, valutandone luminosità e contrasto. Il senso di familiarità o solidità dipende anche dagli altri elementi della composizione. Confronta una stessa tinta su superfici chiare e scure: la leggibilità riguarda sempre la coppia effettivamente usata (@fig-colore-216).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-marrone.png"),
  [Il marrone nelle identità visive di M&M’s, Nespresso, Pernigotti e UPS.],
  format: "una-colonna",
  alt: "Il marrone nelle identità visive di M&M’s, Nespresso, Pernigotti e UPS.",
  width: calc.min(66mm, 210pt * 250 / 343),
  id: "fig-colore-216",
)

=== Rosa

Il rosa può suggerire delicatezza, vivacità, romanticismo o provocazione, secondo tonalità e contesto.

Le associazioni con il genere sono convenzioni culturali, non preferenze universali. Nel design la scelta dovrebbe partire dall’identità del progetto e dalla ricerca sul pubblico, senza presumere che tutte le persone di un gruppo condividano gli stessi gusti. Confronta campiture chiare e accenti saturi per osservare come la stessa famiglia cromatica può costruire gerarchie diverse (@fig-colore-217).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-rosa.png"),
  [Il rosa nelle identità visive di Cosmopolitan, Donut King, Barbie e Telekom.],
  format: "una-colonna",
  alt: "Il rosa nelle identità visive di Cosmopolitan, Donut King, Barbie e Telekom.",
  width: calc.min(66mm, 210pt * 250 / 343),
  id: "fig-colore-217",
)

=== Viola

Il viola può richiamare prestigio, creatività, mistero o spiritualità. Queste associazioni dipendono dalla storia e dalle convenzioni del contesto in cui viene usato.

Nel design può differenziare un’identità visiva o dare rilievo a un elemento. Contrasto, saturazione e rapporto con gli altri colori ne determinano l’efficacia. Scegli un ruolo riconoscibile, come superficie o accento, e controlla la leggibilità dei contenuti che vi si sovrappongono (@fig-colore-218).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-viola.png"),
  [Il viola nelle identità visive di Milka, Claire’s, Twitch e Yahoo.],
  format: "una-colonna",
  alt: "Il viola nelle identità visive di Milka, Claire’s, Twitch e Yahoo.",
  width: calc.min(66mm, 210pt * 250 / 343),
  id: "fig-colore-218",
)

=== Bianco

Il bianco può suggerire chiarezza, semplicità o purezza in alcuni contesti; in altri è associato al lutto. Il significato dipende dalle convenzioni del pubblico.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Il bianco è spesso usato come sfondo. Quando lo scegli, verifica che il testo si legga bene e che i controlli risaltino sulla superficie. Guarda anche come sono distribuiti gli elementi. Lo spazio vuoto è la parte della pagina lasciata libera, qualunque sia il colore dello sfondo. Insieme a bordi e accostamenti, le distanze aiutano a capire quali elementi appartengono allo stesso gruppo.»
]
#highlight(fill: rgb("FFF1A8"))[Nel design è spesso usato come sfondo. La leggibilità dipende però dal contrasto con testo e controlli e dalla gestione dello spazio, non dal bianco in sé. La superficie bianca e lo spazio vuoto hanno ruoli distinti: distanze, bordi e accostamenti organizzano la composizione] (@fig-colore-219).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-bianco.png"),
  [Il bianco nei marchi di Armani Exchange e Apple su fondo scuro.],
  format: "una-colonna",
  alt: "Il bianco nei marchi di Armani Exchange e Apple su fondo scuro.",
  width: calc.min(66mm, 210pt * 363 / 306),
  id: "fig-colore-219",
)

=== Nero

Il nero può richiamare tragedia, lutto o mistero e assumere un tono tradizionale, moderno o serio, secondo il contesto. Nei prodotti premium e di lusso compare spesso nel packaging come convenzione di prestigio e costo elevato.

Può creare contrasti forti: leggibilità e coerenza dipendono dalle superfici accostate. Confronta nero pieno e neutri scuri rispetto alla funzione nella composizione (@fig-colore-220).

#image-figure(path("/risorse-condivise/immagini/figure/colore/marchi-nero.png"),
  [Il nero nelle identità visive di Prada, Chanel e Bentley.],
  format: "una-colonna",
  alt: "Il nero nelle identità visive di Prada, Chanel e Bentley.",
  width: calc.min(66mm, 210pt * 249 / 332),
  id: "fig-colore-220",
)
]
#[


== I significati culturali del colore

=== Il colore cambia significato

Religione, storia, funzione dell’oggetto e convenzioni locali possono modificare la lettura dello stesso colore. Più significati possono coesistere nella stessa società.

=== In quale contesto?

Il bianco può richiamare purezza o comparire in pratiche funerarie; il rosso può indicare celebrazione oppure pericolo. Una tabella culturale suggerisce domande, ma non sostituisce la ricerca.

=== Per quale pubblico?

Esamina riferimenti locali e confrontati con le persone a cui il progetto è destinato. Verifica gli accostamenti nella composizione concreta.

=== Il messaggio resta chiaro?

Accompagna stati e azioni con testo, icone o forme. Il significato deve restare riconoscibile anche quando il colore non viene distinto o l’associazione non è condivisa.

Le associazioni dichiarate fra colori ed emozioni possono mostrare somiglianze e variazioni culturali. Associare la parola «rosso» a un’emozione non dimostra però che una superficie rossa provochi quell’emozione: usa queste conoscenze per formulare ipotesi e confrontale con persone e compiti del progetto.

Nello studio di #cite(<coloreJonauskaite2020>, form: "prose"), 4.598 partecipanti di 30 nazioni e 22 lingue hanno associato 12 nomi di colore a 20 concetti emotivi. Sono emerse somiglianze diffuse e differenze legate anche alla vicinanza linguistica e geografica.#website-note([_Jonauskaite_ et al. (2020).], "https://doi.org/10.1177/0956797620948810")

// Mappa culturale e confronto fotografico.
#set page(columns: 1)

=== Leggere una mappa culturale

Questa visualizzazione storica riunisce 84 significati e dieci categorie culturali molto ampie. Osserva come cambiano gli accostamenti fra categorie e significati (@fig-colore-221) @coloreMcCandless2009.#website-note([_McCandless_ e AlwaysWithHonor, Colours in Culture, v1.0, aprile 2009.], "https://informationisbeautiful.net/visualizations/colours-in-cultures/")

#image-figure(path("/risorse-condivise/immagini/figure/colore/mappa-colours-in-culture-2009.png"),
  [_Colours in Culture_, _David McCandless_ e AlwaysWithHonor.com, v1.0, aprile 2009.],
  format: "due-colonne",
  rights: [David McCandless e AlwaysWithHonor.com, 2009.],
  alt: "Colours in Culture, David McCandless e AlwaysWithHonor.com, v1.0, aprile 2009.",
  width: 137mm,
  id: "fig-colore-221",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Ogni categoria della mappa riunisce società, lingue e tradizioni religiose diverse. Se un’associazione ti sembra rilevante, trasformala in una domanda per il tuo progetto. Per esempio, chiedi alle persone a cui si rivolge l’interfaccia che cosa comunica quel colore nella schermata e osserva se le aiuta a capire come agire.»
]
#highlight(fill: rgb("FFF1A8"))[Le categorie accorpano società, lingue e religioni differenti. Il grafico non misura preferenze individuali né l’efficacia di un’interfaccia. Usalo per formulare domande da verificare nel contesto del progetto.]

=== Rosso e bianco: conta il contesto

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Per interpretare un colore, chiediti dove compare, su quale oggetto e in quale occasione. Le immagini d’archivio mostrano come il rosso e il bianco entrano in composizioni diverse. Per capire quale significato assumono e chi partecipa alla scena, servono informazioni sulla provenienza delle fotografie e sul contesto in cui sono state scattate.»
]
#highlight(fill: rgb("FFF1A8"))[Uno stesso colore può cambiare significato secondo rito, oggetto e occasione. Le immagini d’archivio mostrano usi da interpretare attraverso fonti e contesto, senza dedurre l’identità delle persone dal colore] (@fig-colore-222 e @fig-colore-abiti-bianchi).

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/lanterne-rosse.svg"),
  [Lanterne rosse. Autori, luoghi e date delle fotografie non indicati.],
  format: "una-colonna",
  id: "fig-colore-222",
  alt: "Lanterne rosse. Autori, luoghi e date delle fotografie non indicati.",
  height: 110mm,
)

#image-figure(path("/progetti/booklet/assets/figure-singole/colore/abiti-bianchi.svg"),
  [Persone in abiti bianchi con ritratti e fiori. Autori, luoghi e date delle fotografie non indicati.],
  format: "una-colonna",
  id: "fig-colore-abiti-bianchi",
  alt: "Persone in abiti bianchi con ritratti e fiori. Autori, luoghi e date delle fotografie non indicati.",
  height: 110mm,
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Durante il Capodanno lunare cinese, il rosso delle lanterne e delle decorazioni esprime un augurio legato alla festa. È un riferimento pertinente per una campagna dedicata a quella ricorrenza. Per altri prodotti e occasioni, scegli i colori a partire dal messaggio e dal pubblico a cui ti rivolgi.»
]
#highlight(fill: rgb("FFF1A8"))[Nel Capodanno lunare cinese, lanterne e decorazioni rosse partecipano a una tradizione celebrativa e augurale. Questo uso non prescrive la palette di ogni prodotto rivolto a un pubblico cinese.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «In alcune tradizioni funerarie cinesi gli abiti bianchi esprimono il lutto. Lo studio sul festival dei Nove Imperatori documenta anche usi del bianco legati alla purezza, con variazioni locali. Per identificare il rito di una fotografia occorrono informazioni sull’occasione e sul luogo in cui è stata scattata.»
]
#highlight(fill: rgb("FFF1A8"))[In tradizioni funerarie cinesi documentate, gli abiti bianchi possono esprimere il lutto. Lo studio del festival dei Nove Imperatori mostra anche interpretazioni di purezza e variazioni locali. La foto non identifica da sola il rito rappresentato] @coloreNineEmperor2023.#website-note([Smithsonian, Chinese Red (2016).], "https://asia-archive.si.edu/red/")#website-note([Nine Emperor Gods Festival Documentation and Research Project (2023), vol. 1, cap. 7, pp. 440, 486, 494.], "https://singaporeccc.org.sg/events/the-nine-emperor-gods-festival-in-singapore-heritage-culture-and-community/")

// I casi IKEA mantengono la gabbia ordinaria.
#set page(columns: 2)

#[
#show "figure": set block(above: 0pt, below: 0pt)

=== Il rosso nella campagna IKEA

Nella schermata storica IKEA per il Capodanno lunare, il riferimento culturale emerge dai prodotti, dalle fotografie e dal testo: lanterne, pendenti e dettagli rossi entrano in una scena domestica (@fig-colore-223).#website-note([IKEA, FÖSSTA Collection, 1 dicembre 2022. La fonte documenta la collezione e il tema, non data la cattura.], "https://www.ikea.com/us/en/newsroom/range-news/foessta-collection-puba8fbaf50/")

#image-figure(path("/risorse-condivise/immagini/figure/colore/ikea-capodanno-lunare.jpg"),
  [IKEA Cina, campagna per il Capodanno lunare. Schermata storica del 2022–2023; giorno di acquisizione non documentato.],
  format: "una-colonna",
  rights: [© Inter IKEA Systems B.V.],
  alt: "IKEA Cina, campagna per il Capodanno lunare. Schermata storica del 2022–2023; giorno di acquisizione non documentato.",
  width: calc.min(66mm, 100pt * 1364 / 872),
  id: "fig-colore-223",
)

Il sito non diventa interamente rosso. Nella stessa schermata compaiono superfici chiare, un riquadro arancio e una lampada blu: il colore celebrativo convive con la gerarchia dell’interfaccia.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «La presentazione della collezione FÖSSTA pubblicata da IKEA nel 2022 conferma che i prodotti erano pensati per il Capodanno lunare. La schermata storica mostra come il tema compariva sul sito in quel periodo. La data esatta della cattura resta sconosciuta.»
]
#highlight(fill: rgb("FFF1A8"))[La collezione FÖSSTA, documentata da IKEA nel 2022, è un riferimento primario per il tema festivo. La cattura resta storica, con giorno non documentato; non rappresenta il sito attuale.]

=== Confrontare le campagne, poi verificare

La schermata storica svedese accosta offerte, risparmio energetico e piccoli prezzi. Blu, bruno e grigio organizzano messaggi quotidiani diversi dal tema festivo della campagna per il Capodanno lunare (@fig-colore-224).#website-note([IKEA, cultura e valori.], "https://www.inter.ikea.com/en/how-we-do-business/ikea-culture-and-values")#website-note([_Jonauskaite_ et al. (2020).], "https://doi.org/10.1177/0956797620948810")

#image-figure(path("/risorse-condivise/immagini/figure/colore/ikea-vita-quotidiana.jpg"),
  [IKEA Svezia, «Just nu på IKEA»: offerte e vita quotidiana. Schermata storica del 2022–2023; giorno di acquisizione non documentato.],
  format: "una-colonna",
  rights: [© Inter IKEA Systems B.V.],
  alt: "IKEA Svezia, «Just nu på IKEA»: offerte e vita quotidiana. Schermata storica del 2022–2023; giorno di acquisizione non documentato.",
  width: calc.min(66mm, 100pt * 1688 / 992),
  id: "fig-colore-224",
)

Le due schermate appartengono allo stesso marchio, ma cambiano lingua, contenuti e campagna. Il confronto illustra scelte progettuali: non misura preferenze nazionali né dimostra l’effetto della localizzazione.

Quando progetti, distingui il colore di marca, il tema della campagna e i segnali funzionali. Confronta varianti dello stesso compito con il pubblico destinatario e osserva comprensione, errori e riconoscimento delle azioni.
]

// Convenzioni, categorie linguistiche e applicazione culturale.
#set page(columns: 1)

=== Il colore di un dato è una convenzione

Nelle interfacce finanziarie, rosso e verde possono indicare andamenti opposti. Il significato operativo della tinta dipende dalla convenzione del prodotto e dalle abitudini del pubblico.#compact-note([CGSE, Trader Terminal User Manual (2021), § 5.1.4, PDF p. 13], ("https://cgse.com.hk/chines/sites/default/files/gtp-user-manual-trader-terminal-20211022b.pdf",), tag: ("https://cgse.com.hk/chines/sites/default/files/gtp-user-manual-trader-terminal-20211022b.pdf",)) <nota-url-05-18>#website-note([MagicTrader Plus Android v3.0 (2012), § 40e, PDF p. 21.], "https://www.cmbwinglungbank.com/wlb_corporate/files/hk/upload/about-us/service-guide/10.10.1.9.4-CnSecTeleStoQuoUsrGuiAnd.pdf")

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «La distinzione tra Hong Kong e Cina continentale mostra che la stessa coppia di colori può essere letta in modi diversi anche in mercati vicini. Per interpretare i dati, verifica quale convenzione adotta quel prodotto e se permette di cambiarla.»
]
*Convenzione locale.* Il manuale MagicTrader Plus distingue lo stile di Hong Kong da quello della Cina continentale. #highlight(fill: rgb("FFF1A8"))[Anche all’interno della stessa area geografica, prodotti e mercati possono adottare corrispondenze diverse: una sola convenzione «asiatica» non descrive questi casi.]

*Personalizzazione.* Il CGSE Trader Terminal permette di invertire i colori assegnati ad aumento e diminuzione. La coppia rosso–verde resta la stessa, mentre cambia ciò che ciascuna tinta comunica.

*Segnali espliciti.* Prima di interpretare il colore, leggi legenda, segno, unità e grandezza rappresentata. In un progetto, accompagna la tinta con testo, simboli o direzione del dato: la @fig-colore-225 mostra due configurazioni documentate.

=== Due convenzioni, due letture del grafico

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Le etichette italiane aiutano a leggere le due configurazioni del manuale CGSE. Nel primo grafico il verde indica un aumento e il rosso una diminuzione. Nel secondo, il rosso indica l’aumento e il verde la diminuzione.»
]
#highlight(fill: rgb("FFF1A8"))[I due grafici del manuale CGSE mostrano convenzioni cromatiche opposte. Le etichette italiane rendono esplicita la corrispondenza fra andamento e colore] (@fig-colore-225).#footnote(<nota-url-05-18>)

#image-figure(path("/risorse-condivise/immagini/figure/colore/cgse-convenzioni-grafici.svg"),
  [CGSE Trader Terminal, manuale 2021, §5.1.4, PDF p. 13. Screenshot storici originali CGSE / Infocast Finance; lettere e traduzione didattica aggiunte.],
  format: "due-colonne",
  rights: [CGSE / Infocast Finance.],
  alt: "CGSE Trader Terminal, manuale 2021, §5.1.4, PDF p. 13. Screenshot storici originali CGSE / Infocast Finance; lettere e traduzione didattica aggiunte.",
  width: 137mm,
  id: "fig-colore-225",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Il manuale del 2021 documenta la possibilità di scegliere tra due convenzioni del terminale. Per sapere quale preferiscano le persone servirebbe una verifica con il pubblico. Per leggere il grafico, parti dalla legenda e controlla quale andamento indica ciascun colore.»
]
#highlight(fill: rgb("FFF1A8"))[Il confronto documenta una funzione del prodotto nel 2021. Non misura le preferenze del pubblico. La legenda va letta prima di attribuire al rosso o al verde un valore positivo o negativo.]

=== Le parole organizzano anche il colore

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Lingue diverse possono dare nomi diversi alle stesse gamme di colore. In inglese, _blue_ comprende sia i blu chiari sia quelli scuri. Il russo usa due termini comuni, _goluboy_ per i blu più chiari e _siniy_ per quelli più scuri.»
  #linebreak()
  Per la didascalia, usare «I campioni illustrano le gamme di blu chiamate _goluboy_ e _siniy_ in russo. La figura 1 dello studio di _Winawer_ et al. (2007) mostra i campioni usati nell’esperimento. La separazione tra le categorie è qui indicativa.»
]
#highlight(fill: rgb("FFF1A8"))[Le lingue non suddividono sempre lo spettro nello stesso modo. Nell’area dei blu, il russo distingue goluboy e siniy: il primo rimanda ai blu più chiari, il secondo ai blu più scuri] (@fig-colore-226).

#image-figure(path("/risorse-condivise/immagini/figure/colore/lingua-categorie-blu.svg"),
  [#highlight(fill: rgb("FFF1A8"))[Campioni illustrativi per goluboy e siniy. Lo schema non riproduce gli stimoli né il confine sperimentale di _Winawer_ et al. (2007).]],
  format: "due-colonne",
  alt: "Campioni illustrativi per goluboy e siniy. Lo schema non riproduce gli stimoli né il confine sperimentale di Winawer et al. (2007).",
  width: 137mm,
  id: "fig-colore-226",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nel 2007, _Winawer_ e colleghi hanno chiesto a parlanti russi e inglesi di scegliere, tra due campioni blu, quello identico a un campione di riferimento. I parlanti russi rispondevano più in fretta quando le due opzioni appartenevano a categorie diverse in russo. Il vantaggio scompariva quando dovevano anche ripetere mentalmente una serie di cifre e restava presente quando dovevano ricordare una disposizione di caselle. Nei parlanti inglesi non è emerso un vantaggio analogo.»
]
#highlight(fill: rgb("FFF1A8"))[#cite(<coloreWinawer2007>, form: "prose") hanno confrontato parlanti russi e inglesi in un compito rapido di discriminazione. I parlanti russi erano più veloci quando i colori appartenevano alle due categorie diverse; il vantaggio scompariva durante un’interferenza verbale, ma non durante quella spaziale.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Lo studio suggerisce che i nomi appresi in una lingua possono influire sulla rapidità con cui distinguiamo tinte simili in un compito specifico. Se un’interfaccia chiede di riconoscere o scegliere un colore, verifica con il tuo pubblico che le etichette dei campioni e delle categorie siano comprensibili nella sua lingua. La scelta della palette richiede di considerare anche il compito e il contesto d’uso.»
]
#highlight(fill: rgb("FFF1A8"))[Il risultato riguarda quel compito sperimentale. Nel progetto di un’interfaccia suggerisce di verificare anche i nomi dei campioni e delle categorie nella lingua del pubblico, senza ricavare una palette nazionale dallo studio.]#website-note([_Winawer_ et al. (2007).], "https://doi.org/10.1073/pnas.0701644104")

// I riferimenti culturali applicati e gli studi usano la gabbia ordinaria.
#set page(columns: 2)

=== Un fiore, un rito, un riferimento culturale

Un colore acquista significato anche attraverso gli oggetti, le pratiche e le occasioni in cui compare. Il cempasúchil, un fiore giallo o arancione, partecipa alle ofrendas del Día de los Muertos in Messico.#website-note([INAH, Cempasúchil y mariposas: símbolos del regreso de las almas.], "https://www.inah.gob.mx/foto-del-dia/cempasuchil-y-mariposas-simbolos-del-regreso-de-las-almas")#compact-note([Google Doodles, Day of the Dead 2024, opera e intervista a _Lucia Sarabia_], ("https://doodles.google/doodle/day-of-the-dead-2024/",), tag: ("https://doodles.google/doodle/day-of-the-dead-2024/",)) <nota-url-05-23>

*L’oggetto.* Non si osserva soltanto una tinta astratta: la forma del fiore, i petali e il profumo rendono riconoscibile un oggetto legato alla ricorrenza.

*L’occasione.* Nelle pratiche ricordate dalle fonti culturali messicane, i fiori accompagnano il ricordo dei defunti e l’accoglienza delle anime. Il significato appartiene al rito e alle tradizioni delle comunità che lo praticano.

*Il riferimento progettuale.* Nella @fig-colore-227, Google riprende fiori e figure della tradizione in un Doodle per la ricorrenza. La scelta cromatica opera insieme ai soggetti rappresentati e alla data della pubblicazione.

*Descrivere il contesto.* «Arancione» da solo non riassume una cultura o un’emozione. Per spiegare una scelta, precisa quale oggetto, occasione e messaggio la rendono comprensibile al pubblico.

=== Il riferimento culturale entra nell’interfaccia

Il 1 novembre 2024 Google ha pubblicato un Doodle di _Lucia Sarabia_ dedicato al Día de los Muertos. Fiori di cempasúchil e cani della tradizione compongono il marchio per l’occasione (@fig-colore-227).#footnote(<nota-url-05-23>)

#image-figure(path("/risorse-condivise/immagini/figure/colore/google-day-of-the-dead-2024.png"),
  [_Day of the Dead 2024_, Google Doodles, 1 novembre 2024. Illustrazione di _Lucia Sarabia_. Archivio ufficiale.],
  format: "una-colonna",
  rights: [© Google / Lucia Sarabia.],
  alt: "Day of the Dead 2024, Google Doodles, 1 novembre 2024. Illustrazione di Lucia Sarabia. Archivio ufficiale.",
  width: 66mm,
  id: "fig-colore-227",
)

Il riferimento culturale emerge dalla relazione fra colore, soggetti e ricorrenza. L’archivio ufficiale documenta le scelte dell’artista e il loro contesto.

L’esempio mostra un’applicazione reale nella comunicazione di un’interfaccia. Per trasferire un riferimento nel proprio progetto, verifica che le persone riconoscano l’occasione e comprendano il messaggio previsto.

=== Associazioni, preferenze e uso

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Quando valuti un colore, chiediti che cosa evoca, quanto piace e se aiuta a svolgere il compito. Un’associazione culturale può suggerire un messaggio da mettere alla prova. Per capire quale palette piace, chiedi alle persone quali colori preferiscono. Per capire se la palette aiuta a usare l’interfaccia, osserva come svolgono il compito.»
]
#highlight(fill: rgb("FFF1A8"))[Associare, preferire e usare un colore sono domande diverse. Un’associazione culturale può suggerire un’ipotesi; non basta per stabilire quale palette piaccia o quale interfaccia funzioni meglio] @coloreClarke2008.

*Associare.* Quale oggetto, idea o occasione richiama questo colore? Parti da domande aperte: dove lo incontri, che cosa ti fa pensare, quale messaggio ti aspetti?

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con « hanno rilevato preferenze cromatiche diverse nei due gruppi di adulti da loro studiati, britannici e himba (un popolo dell'Africa sudoccidentale)..»
]
*Preferire.* Quanto piace a questa persona, in questa situazione? #cite(<coloreTaylor2013>, form: "prose") #highlight(fill: rgb("FFF1A8"))[hanno osservato preferenze differenti fra i gruppi britannico e himba studiati.] #cite(<coloreDavis2021>, form: "prose") hanno confrontato bambini di quattro contesti culturali: il rapporto fra genere e preferenza per il rosa variava fra i campioni. Questi risultati non forniscono una regola universale per scegliere una palette.

*Usare.* Il colore aiuta a trovare un comando e a capire uno stato? Osserva lo svolgimento dello stesso compito con il pubblico previsto: comprensione, errori e riconoscimento delle azioni richiedono prove sull’interfaccia.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Verifica separatamente che cosa le persone capiscono, quali colori preferiscono e come riescono a svolgere il compito. Per rendere riconoscibili gli stati e gli errori anche quando i colori si confondono, affianca alla tinta un testo, un simbolo o una forma. Per esempio, accanto a un campo con il bordo rosso, indica con un messaggio che cosa va corretto.»
]
*Verificare.* #highlight(fill: rgb("FFF1A8"))[Distingui messaggio, gusto e prestazione. Mantieni testo, simboli o forme per comunicare stati ed errori anche quando la sola differenza cromatica non viene riconosciuta.]#website-note([_Taylor_ et al. (2013).], "https://doi.org/10.1037/a0030273")#website-note([_Davis_ et al. (2021).], "https://doi.org/10.1111/cdev.13528")#website-note([_Clarke_ e _Costall_ (2008).], "https://doi.org/10.1002/col.20435")

== Interaction of Color: lo studio di _Albers_

*_“I colori si presentano in un flusso continuo, costantemente in rapporto con vicini che variano e in condizioni altrettanto variabili”_* #cite(<coloreAlbers2013>, supplement: [pp. 26–27]).#website-note([_Josef Albers_, Interazione del colore, Il Saggiatore, 2013; originale 1963.], "https://www.ilsaggiatore.com/libro/interazione-del-colore")

_Josef Albers_

=== _Josef Albers_ e il Bauhaus

Il Bauhaus, fondato in Germania nel 1919, mise in relazione arte, artigianato e progettazione per la produzione industriale. Le sue esperienze influenzarono il graphic design e lo studio degli elementi del linguaggio visivo.

_Josef Albers_ fu tra i docenti della scuola e proseguì la propria ricerca negli Stati Uniti. I suoi esercizi sul colore confluirono in _Interaction of Color_, pubblicato nel 1963: un percorso di apprendimento basato sull’osservazione delle relazioni cromatiche @coloreAlbers1963.

Gli esercizi di _Albers_ mostrano che l’aspetto di un colore cambia in relazione ai colori circostanti. Una stessa superficie può apparire diversa su due sfondi; superfici differenti possono invece sembrare simili.

Questa relatività percettiva distingue il colore fisico dalla sua apparenza nella composizione. Non implica che la percezione sia soltanto soggettiva o che il colore sia sempre ingannevole.

_Interaction of Color_ propone confronti pratici per sviluppare la sensibilità alle relazioni cromatiche. Osservare e modificare gli accostamenti è parte integrante del metodo di apprendimento (@fig-colore-228).

#image-figure(path("/risorse-condivise/immagini/figure/colore/albers-interaction-of-color-copertina.png"),
  [Copertina di _Interaction of Color_ di _Josef Albers_.],
  format: "una-colonna",
  id: "fig-colore-228",
  alt: "Copertina di Interaction of Color di Josef Albers.",
  aspect-ratio: 158 / 242,
  height: 110mm,
)

=== La relatività del colore

#block(breakable: false)[
_“I piccoli viola interni sono, di fatto, identici. Ma quello superiore sembra invece uguale al viola più chiaro sul fondo”_ @coloreAlbers2013.
]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Osserva i due piccoli rettangoli viola della tavola di _Albers_. Quello in alto risalta sul fondo scuro e sembra più chiaro di quello in basso, circondato da un viola più chiaro. I due rettangoli sono dello stesso colore. Per confrontarli, copri i fondi con un foglio neutro e lascia visibile una porzione di ciascun rettangolo. In un’interfaccia puoi fare una prova simile usando la stessa icona, con lo stesso colore, su due superfici diverse.»
]
#highlight(fill: rgb("FFF1A8"))[Confronta prima l’apparenza dei due campioni, poi verifica che il valore sia identico. Coprire temporaneamente gli sfondi aiuta a osservare la differenza fra il colore del campione e la sua apparenza. Nell’interfaccia, prova lo stesso testo o la stessa icona su superfici diverse] (@fig-colore-229).#website-note([_Josef Albers_, Interazione del colore, Il Saggiatore, 2013; originale 1963.], "https://www.ilsaggiatore.com/libro/interazione-del-colore")<nota-url-05-30>

// Tavola originale a piena gabbia, senza note: la caption resta nativa.
#image-figure(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"),
  [_Interazione del colore_: superfici sovrapposte e contrasti cromatici.],
  format: "una-colonna",
  id: "fig-colore-229",
  alt: "Interazione del colore: superfici sovrapposte e contrasti cromatici.",
  aspect-ratio: 0.751868469743,
  anchor: (0.5, 0.5),
)

=== Gli sfondi invertiti

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nella tavola delle due X, quella in alto sembra tendere al verde sul fondo giallo, mentre quella in basso sembra più gialla sul fondo verdastro. Segui il piccolo tratto sul bordo destro, dove la linea passa da uno sfondo all’altro. Le due X sono tracciate con lo stesso colore. La tavola usa quindi tre colori, uno per ciascuno sfondo e un terzo per entrambe le X.»
]
#highlight(fill: rgb("FFF1A8"))[Osservando con attenzione il tratto superiore che unisce le due X possiamo dedurre che il colore è uguale. Sembrano esserci soltanto due colori sulla tavola, ma in realtà ce ne sono tre, perché il colore della X non è uguale né a quello del rettangolo a sinistra, né a quello di destra] @coloreAlbers2013.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Confronta le due X prima con gli sfondi visibili, poi lasciando scoperto soltanto un breve tratto di ciascuna. Osserva quanto cambia la loro apparenza quando riduci la porzione di sfondo che vedi. Lo stesso accade in un’interfaccia. Se cambi lo sfondo di una scheda, controlla di nuovo che testo e icone risaltino sulla nuova superficie.»
]
#highlight(fill: rgb("FFF1A8"))[Segui il campione continuo attraverso i due sfondi oppure maschera una parte della tavola. L’esercizio rende visibile il rapporto fra campione e contesto. Quando cambi una superficie del progetto, ricontrolla anche gli elementi che vi si sovrappongono] (@fig-colore-230).#website-note([_Josef Albers_, Interazione del colore, Il Saggiatore, 2013; originale 1963.], "https://www.ilsaggiatore.com/libro/interazione-del-colore")

// Tavola originale a piena gabbia, senza note: la caption resta nativa.
#document-plate[
#image-figure(path("/risorse-condivise/immagini/figure/colore/albers-colore-sfondo.svg"),
  [_Interazione del colore_: la percezione cambia con lo sfondo.],
  format: "due-colonne",
  alt: "Interazione del colore: la percezione cambia con lo sfondo.",
  width: 137mm,
  id: "fig-colore-230",
)
]

=== La sottrazione del colore

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nella tavola di _Albers_ ci sono due piccoli rettangoli, uno sul fondo rosso e l’altro sul fondo blu. A prima vista possono sembrare più simili di quanto appaiano quando li osservi senza i rispettivi sfondi.»
]
#highlight(fill: rgb("FFF1A8"))[Focalizzando lo sguardo sui singoli rettangoli interni, si nota come i loro colori siano differenti, benché a prima vista non sembri così.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «_Albers_ parla di «sottrazione» perché ogni fondo modifica il colore che percepiamo nel rettangolo sovrapposto. I due fondi spostano l’apparenza dei campioni in direzioni che possono farli sembrare più simili.»
]
#highlight(fill: rgb("FFF1A8"))[I colori di fondo sembrano sottrarsi al colore dei piccoli rettangoli sovrapposti] @coloreAlbers2013.

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Confronta i due rettangoli al centro, poi guarda il bordo destro, dove i colori dei campioni sono accostati con gli sfondi scambiati. Puoi anche coprire i fondi lasciando visibile una porzione di ciascun rettangolo. L’esercizio riguarda il modo in cui lo sfondo cambia il colore percepito. Nella stampa CMYK, invece, si parla di sottrazione perché gli inchiostri assorbono parte della luce.»
]
#highlight(fill: rgb("FFF1A8"))[Qui «sottrazione» descrive una relazione percettiva fra campioni e sfondi. Non è la sintesi sottrattiva degli inchiostri CMYK. Confronta separatamente i campioni interni e poi torna all’insieme per osservare come cambia il giudizio sull’accostamento] (@fig-colore-231).#website-note([_Josef Albers_, Interazione del colore, Il Saggiatore, 2013; originale 1963.], "https://www.ilsaggiatore.com/libro/interazione-del-colore")

// Tavola originale a piena gabbia, senza note: la caption resta nativa.
#image-figure(path("/risorse-condivise/immagini/figure/colore/albers-campi-cromatici-quadrati.svg"),
  [_Interazione del colore_: relazioni tra campi cromatici e piccoli quadrati.],
  format: "una-colonna",
  id: "fig-colore-231",
  height: 110mm,
  alt: "Interazione del colore: relazioni tra campi cromatici e piccoli quadrati.",
  aspect-ratio: 0.750373679631,
  anchor: (0.5, 0.5),
)

=== Il contrasto successivo

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Fissa per circa 30 secondi il punto nero al centro del cerchio rosso in alto. Sposta subito lo sguardo sul punto nero del cerchio bianco in basso. Sul bianco può apparire per qualche istante una macchia verde o azzurro-verde con la forma del cerchio rosso. È l’immagine residua.»
]
#highlight(fill: rgb("FFF1A8"))[Fissate per circa 30 secondi il punto nel cerchio rosso, poi spostate lo sguardo sul cerchio bianco. Può comparire un’immagine residua di tonalità verde o azzurro-verde.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Durante la fissazione del cerchio rosso, il sistema visivo si adatta al colore. L’adattamento dura ancora per qualche istante dopo che lo sguardo si sposta sul cerchio bianco. Per questo una parte del cerchio può apparire colorata.»
]
#highlight(fill: rgb("FFF1A8"))[L’effetto dipende dall’adattamento del sistema visivo allo stimolo e dai meccanismi che elaborano le differenze cromatiche. Non significa che singole cellule “leggano” rosso, verde e blu come i pixel di uno schermo: la percezione nasce dall’elaborazione combinata dei segnali.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nella tavola dei rettangoli, lo sfondo cambia l’aspetto del campione mentre li osservi insieme. È il contrasto simultaneo. Nell’esercizio dei cerchi, invece, il rosso guardato per primo influenza ciò che vedi dopo sul bianco. È il contrasto successivo. Per osservarlo, conta quindi l’ordine in cui guardi i due cerchi.»
]
#highlight(fill: rgb("FFF1A8"))[Il contrasto simultaneo riguarda colori presenti nello stesso momento; quello successivo emerge dopo l’esposizione a uno stimolo. Nell’esercizio conta quindi anche la sequenza di osservazione, oltre ai colori e allo sfondo] (@fig-colore-232).

// Esercizio schematico compatto in una colonna, con caption nativa.
#image-figure(path("/risorse-condivise/immagini/figure/colore/albers-forma-colore-sfondo.svg"),
  [Contrasto tra forma, colore e sfondo in due campi visivi.],
  format: "una-colonna",
  id: "fig-colore-232",
  alt: "Contrasto tra forma, colore e sfondo in due campi visivi.",
  aspect-ratio: 0.750373679631,
  height: 110mm,
)

=== L’effetto _Bezold_

_“Il rosso con il bianco sembra molto più chiaro del rosso con il nero, soprattutto a distanza.”_

Nell’esempio, lo stesso rosso appare più chiaro quando è intrecciato con il bianco e più scuro quando è intrecciato con il nero. L’effetto dipende dalla disposizione e dalla scala dei dettagli.

Confronta la tavola da vicino e da più lontano: quanto incidono i dettagli bianchi e neri sulla lettura dell’insieme? Ripeti il confronto a dimensioni diverse. Anche pattern e dettagli minuti di un’interfaccia vanno valutati nella scala di utilizzo (@fig-colore-233).

// Esercizio schematico compatto in una colonna, con caption nativa.
#image-figure(path("/risorse-condivise/immagini/figure/colore/albers-contrasto-sfondo.svg"),
  [La percezione del contrasto cambia con il colore dello sfondo.],
  format: "una-colonna",
  id: "fig-colore-233",
  alt: "La percezione del contrasto cambia con il colore dello sfondo.",
  aspect-ratio: 0.750373679631,
  height: 110mm,
)

// La distribuzione cromatica si osserva in una figura ampia.
]
#[

#set page(columns: 1)

== Consigli pratici

=== La regola del 60-30-10

La regola del 60-30-10 può aiutare a distribuire colori dominanti, secondari e d’accento. Questa regola è spesso utilizzata nel design di interni.

Le proporzioni sono indicative e vanno adattate al progetto. Scegli un colore dominante e applicalo nel 60% dello spazio, un altro secondario utilizzato nel 30% e un ultimo colore per il restante 10%.

Le quote riguardano aree visive e non garantiscono leggibilità o gerarchia. Nell’interfaccia distingui neutri, accento e colori di stato; assegna i ruoli e verifica separatamente ogni coppia di testo e sfondo (@fig-colore-234).

#image-figure(path("/risorse-condivise/immagini/figure/colore/palette-cinema-dominanti-accenti.png"),
  [Distribuzione dei colori dominanti, secondari e d’accento in due esempi cinematografici.],
  format: "una-colonna",
  alt: "Distribuzione dei colori dominanti, secondari e d’accento in due esempi cinematografici.",
  width: calc.min(137mm, 190pt * 324 / 191),
  id: "fig-colore-234",
)

// Consigli ordinari e immagini compatte.
#set page(columns: 2)

=== Lasciati ispirare dalla natura

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Quando cerchi un punto di partenza per una palette, osserva i colori di un paesaggio o di un dettaglio naturale. Nota quali tinte si ripetono, quali si fondono con lo sfondo e quali risaltano. Questi rapporti possono suggerirti quali colori usare come base e quali riservare agli accenti.»
]
#highlight(fill: rgb("FFF1A8"))[Osserva l’armonia e il contrasto dei colori della natura per trovare ispirazione per le tue palette.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Scegli alcuni colori dell’immagine e prova ad assegnare a ciascuno un ruolo, per esempio lo sfondo, il testo o un dettaglio da mettere in risalto. Applica poi la palette a una schermata. Se il testo si perde sul fondo o un pulsante è difficile da individuare, adatta i colori mantenendo il legame con l’immagine di partenza.»
]
#highlight(fill: rgb("FFF1A8"))[Dall’immagine ricava una prima selezione, poi assegna superficie, testo e accento. Provali nei componenti: un accostamento efficace nella fotografia può richiedere modifiche per rendere leggibili informazioni e controlli] (@fig-colore-235).

#image-figure(path("/risorse-condivise/immagini/figure/colore/palette-ghiaccio-foresta-deserto-fiori.png"),
  [Palette cromatiche ricavate da ghiaccio, foresta, deserto e fiori.],
  format: "una-colonna",
  alt: "Palette cromatiche ricavate da ghiaccio, foresta, deserto e fiori.",
  width: 66mm,
  id: "fig-colore-235",
)

=== Scegli il contrasto in base al contesto

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Su fondo bianco, il nero offre un contrasto elevato e può essere una scelta efficace. Se cerchi un effetto visivo più morbido, prova un grigio scuro. Misura il contrasto di entrambe le combinazioni e osserva come si leggono nella schermata.»
]
#highlight(fill: rgb("FFF1A8"))[Il testo deve distinguersi chiaramente dallo sfondo. Nero su bianco può essere una scelta efficace; un grigio scuro può rendere il tono visivo più morbido, purché mantenga un contrasto adeguato.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «La sensazione di comfort può cambiare con la luminosità dello schermo, la luce dell’ambiente, la dimensione dei caratteri e le condizioni di visione. Prova il testo in condizioni simili a quelle d’uso e verifica che ogni combinazione rispetti le soglie di contrasto delle WCAG.»
]
#highlight(fill: rgb("FFF1A8"))[Il comfort dipende anche da luminosità dello schermo, ambiente, dimensione dei caratteri e condizioni di visione. Verifica le combinazioni nel contesto d’uso e conserva i rapporti richiesti dalle WCAG.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Usa i campioni della figura per confrontare il nero puro con altre tonalità scure. Scegli la combinazione che si adatta al progetto e mantiene un contrasto sufficiente con lo sfondo.»
]
#highlight(fill: rgb("FFF1A8"))[Le alternative mostrate sono punti di partenza da valutare, non una regola che vieta il nero puro.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Al livello AA, le WCAG 2.2 richiedono di norma almeno 4,5:1 tra il testo e lo sfondo. Per il testo grande la soglia è 3:1. Per applicarla, controlla dimensione e peso dei caratteri così come appaiono nell’interfaccia, secondo la definizione delle WCAG. I segnali visivi necessari per riconoscere un controllo, capirne lo stato o leggere un grafico devono raggiungere almeno 3:1 rispetto ai colori adiacenti, salvo le eccezioni previste dai criteri.»
]
#highlight(fill: rgb("FFF1A8"))[Al livello AA, le WCAG 2.2 richiedono almeno 4,5:1 per il testo ordinario e 3:1 per il testo grande. Le informazioni visive necessarie a riconoscere controlli, stati e grafici richiedono 3:1 rispetto ai colori adiacenti, con le eccezioni dei criteri. Le dimensioni del disegno non certificano da sole il testo grande] (@fig-colore-236) @coloreWcag22.#website-note([W3C, WCAG 2.2, criterio 1.4.3, Contrasto (minimo).], "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")#website-note([W3C, WCAG 2.2, criterio 1.4.11, Contrasto non testuale.], "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html")

#image-figure(path("/risorse-condivise/immagini/figure/colore/alternative-nero-puro.png"),
  [Alternative al nero puro per il testo su fondo chiaro.],
  format: "una-colonna",
  alt: "Alternative al nero puro per il testo su fondo chiaro.",
  width: 66mm,
  id: "fig-colore-236",
)

=== Ombre e luci

Il colore delle ombre dipende dall’illuminazione, dall’ambiente e dalle superfici. Un’ombra può contenere dominanti cromatiche diverse dal colore dell’oggetto.

Nell’interfaccia, ombre leggermente tonalizzate possono contribuire alla coerenza della palette. La scelta va valutata in relazione a sfondo, contrasto e profondità che si vuole suggerire (@fig-colore-237).

#image-figure(path("/risorse-condivise/immagini/figure/colore/ombre-luci-colori-ambiente.png"),
  [Ombre e luci: colori ricavati dall’ambiente e dalle superfici.],
  format: "una-colonna",
  alt: "Ombre e luci: colori ricavati dall’ambiente e dalle superfici.",
  width: 66mm,
  id: "fig-colore-237",
)

// Confronti ampi dei temi e della palette applicata.
#set page(columns: 1)

=== La stessa interfaccia in chiaro e scuro

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Quando adatti una schermata dal tema chiaro a quello scuro, conserva la funzione di ogni colore e scegli valori adatti al nuovo sfondo. Controlla che i testi si leggano, che azioni e stati si distinguano e che le superfici sovrapposte mantengano una gerarchia riconoscibile. Una semplice inversione può cambiare queste relazioni anche quando il layout è identico.»
  #linebreak()
 
]
#highlight(fill: rgb("FFF1A8"))[Nel passaggio fra tema chiaro e scuro conserva il ruolo dei colori e rivedine i valori. Superfici, testo, azioni e stati devono restare distinguibili. Una semplice inversione può alterare contrasto, accenti e percezione della profondità] (@fig-colore-238).#website-note([IBM Carbon, Themes; documentazione.], "https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview")

#image-figure(path("/risorse-condivise/immagini/figure/colore/carbon-temi-white-gray-100.svg"),
  [#highlight(fill: rgb("FFF1A8"))[Carbon Design System: lo stesso select nei temi White e Gray 100. I numeri nell’immagine rimandano ai ruoli documentati da IBM. Immagine ufficiale.]],
  format: "due-colonne",
  rights: [© IBM.],
  alt: "Carbon Design System: lo stesso select nei temi White e Gray 100. I numeri nell’immagine rimandano ai ruoli documentati da IBM. Immagine ufficiale.",
  width: 137mm,
  id: "fig-colore-238",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «In Carbon, i token sono nomi che identificano un ruolo, come il colore del testo principale o dello sfondo della pagina. Il nome e il ruolo restano gli stessi nei due temi, mentre cambia il valore assegnato. Nel menu a tendina della figura, segui le annotazioni per confrontare testo, icona, bordo, campo e sfondo.»
]
#highlight(fill: rgb("FFF1A8"))[Carbon conserva nomi e ruoli dei token e ne cambia i valori. Le annotazioni confrontano testo, icona, bordo, campo e sfondo.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Per scegliere i neutri, parti dall’effetto che cerchi nella schermata. Nero e grigi neutri si accostano facilmente a palette diverse. Un grigio con una lieve sfumatura della tinta dominante può legare meglio le superfici al resto della palette. In entrambi i casi, misura il contrasto con il fondo effettivo.»
]
#highlight(fill: rgb("FFF1A8"))[La scelta dipende dal contesto d’uso e dall’obiettivo. Nero e grigi neutri si abbinano a molte palette; i grigi tonalizzati possono rafforzare la coerenza del prodotto. In entrambi i casi il contrasto con lo sfondo va verificato.]

=== Dal riferimento alla schermata

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Parti da una fotografia per scegliere una famiglia di colori. Adatta poi i campioni alla funzione che avranno nella schermata, distinguendo il colore delle superfici, dei testi, delle azioni e degli accenti. Nel caso simulato di _Sara_, il pulsante deve distinguersi e la scritta «Conferma spostamento» deve essere facile da leggere.»
]
#highlight(fill: rgb("FFF1A8"))[Una fotografia suggerisce una prima direzione cromatica. Seleziona poi i valori in base all’uso: superficie, testo, azione e accento. Nel caso simulato di _Sara_, il pulsante deve rendere chiara la conferma dello spostamento dell’appuntamento] (@fig-colore-239).#footnote[
  #set text(size: 7.5pt, variations: (opsz: 9))
  Adobe Color, ruota cromatica e costruzione della palette.
  #text(size: 7pt)[#link("https://color.adobe.com/create/color-wheel")]
  #linebreak()
  W3C, WCAG 2.2, criterio 1.4.3, Contrasto (minimo).
  #text(size: 7pt)[#link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")]
]

#image-figure(path("/risorse-condivise/immagini/figure/colore/palette-fotografia-schermata-sara.svg"),
  [#highlight(fill: rgb("FFF1A8"))[Riferimento fotografico, palette adattata e confronto sul testo del pulsante. Caso simulato.]],
  format: "due-colonne",
  alt: "Riferimento fotografico, palette adattata e confronto sul testo del pulsante. Caso simulato.",
  width: 137mm,
  id: "fig-colore-239",
)

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Nel primo pulsante, il testo bianco si distingue poco dal fondo verde chiaro e il contrasto è di 1,53:1. Nella versione rivista, il fondo resta lo stesso e il testo diventa scuro. Il contrasto sale a 9,82:1, così la scritta «Conferma spostamento» risulta più leggibile.»
  #linebreak()
  Per la didascalia, usare «Nel caso simulato di _Sara_, la fotografia orienta la palette. Il confronto mostra come cambia il contrasto della scritta del pulsante quando si passa dal bianco a un colore scuro.»
]
#highlight(fill: rgb("FFF1A8"))[La palette è ispirata alla fotografia e adattata ai ruoli. La coppia iniziale bianco/verde chiaro è poco leggibile; un testo scuro aumenta il contrasto mantenendo la stessa campitura.]

#block(above: 0pt, below: 10pt, width: 100%, sticky: true, breakable: false, fill: rgb("FFF1F1"),
  stroke: (left: 2pt + rgb("FFA2A2")), inset: 8pt)[
  #set text(size: 9pt)
  #set par(justify: false, leading: 1pt, spacing: 0pt)
  #text(weight: 700)[Nota editoriale]
  #linebreak()
  Sostituire con «Il contrasto aiuta a leggere il testo. Le scelte tipografiche rendono più chiara la gerarchia del prototipo. La forma delle lettere, il peso, le dimensioni e la spaziatura aiutano a distinguere a colpo d’occhio titoli, informazioni e comandi.»
]
#highlight(fill: rgb("FFF1A8"))[Per il testo, il colore è una parte della decisione: forma delle lettere, peso, dimensione e spaziatura determinano insieme come la gerarchia diventa leggibile. Queste relazioni guidano il passaggio alla tipografia del prototipo.]

// Chiusura del capitolo nella gabbia ordinaria.
#set page(columns: 2)

=== Grigio tonalizzato

Le due scritte, sebbene appaiano entrambe nere, utilizzano due colori differenti (nero e blu scurissimo).

A parità di opacità l’effetto visivo finale è molto diverso: nel primo caso si avrà un grigio e nel secondo un grigio-blu.

Se i testi utilizzano una tonalità di un certo colore si hanno maggiori opportunità per avere più armonia con il resto dell'interfaccia.

Usare il nero e il grigio non è un male!

Un colore opaco e uno trasparente possono apparire simili su uno sfondo e diversi su un altro. Riducendo l’opacità, il risultato dipende dal colore sottostante: verifica ciascuna combinazione o definisci valori dedicati al ruolo (@fig-colore-240) @coloreCompositing2024.#website-note([W3C, Compositing and Blending, § 5.1: colore sorgente, opacità e sfondo.], "https://www.w3.org/TR/compositing-1/#simplealphacompositing")

#image-figure(path("/risorse-condivise/immagini/figure/colore/grigi-neutri-tonalizzati.png"),
  [Grigi neutri e grigi tonalizzati applicati al testo.],
  format: "una-colonna",
  alt: "Grigi neutri e grigi tonalizzati applicati al testo.",
  width: 66mm,
  id: "fig-colore-240",
)
]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#chapter(..chapter-parameters(5), content)
