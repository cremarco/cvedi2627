// Capitolo 05: unico testo per volume e compilazione autonoma.
#import "../template/stile.typ": booklet, capitolo
#import "../template/piano.typ": parametri-capitolo

#let testo = [
#import "../template/figure.typ": figura-al-vivo, figura-nel-testo
#import "../template/colore.typ": schema-armonia
#import "../template/editoriale.typ": nota-compatta
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
#import "../template/stile.typ": immagine, sito

// Proprietà, modelli e schemi cromatici, con esempi e ruoli.
#set page(columns: 1)

== Teoria e uso del colore

*Il colore partecipa alla gerarchia già costruita con dimensione, posizione e spazio: permette di distinguere elementi, stabilire relazioni e caratterizzare il linguaggio visivo del progetto.*

La psicologia del colore studia le relazioni tra percezione cromatica, associazioni ed emozioni. Non esiste però una corrispondenza fissa tra ogni colore e una specifica emozione o area del cervello: esperienza, cultura, contesto e composizione influenzano la risposta delle persone.

La scelta di una palette va quindi collegata al compito e al pubblico emersi dalla ricerca, mantenendo leggibilità e segnali comprensibili. Quando il colore riguarda il testo, questa decisione si intreccia con la tipografia.

Nella scelta distingui tre domande: come appare il colore nell’accostamento, quali associazioni richiama e quale funzione svolge. Un colore di marca caratterizza il prodotto; un colore di stato aiuta a riconoscere ciò che è avvenuto. Verifica entrambe le funzioni nella schermata concreta.

=== Le proprietà del colore

Tonalità, saturazione e valore descrivono aspetti diversi di un colore. Nel modello HSV, $H$ individua la tinta sulla ruota, $S$ la saturazione e $V$ il valore. Confrontare serie in cui cambia un parametro alla volta aiuta a riconoscerne gli effetti nella composizione (@fig-colore-196).#sito([Adobe, HSB, RGB e relazioni cromatiche.], "https://helpx.adobe.com/photoshop-elements/desktop/working-with-colors/color.html")

#immagine(path("/risorse-condivise/immagini/figure/colore/proprieta-hsv.png"),
  [Un parametro alla volta: variazioni di tonalità, saturazione e valore nel modello HSV.],
  alt: "Un parametro alla volta: variazioni di tonalità, saturazione e valore nel modello HSV.",
  width: 137mm) <fig-colore-196>

Il valore $V$ non coincide con la luminanza relativa usata dalle WCAG: due campioni con lo stesso $V$ possono avere contrasti molto diversi rispetto allo sfondo.

=== Colore emesso e colore stampato

Uno schermo produce luce attraverso componenti rosse, verdi e blu: è la sintesi additiva RGB. Nella stampa, ciano, magenta e giallo assorbono parte della luce; il nero K completa il processo CMYK. RYB è un riferimento pittorico tradizionale, con primari differenti (@fig-colore-197).#sito([Adobe, modi colore.], "https://helpx.adobe.com/photoshop/desktop/adjust-color/choose-colors/color-modes-in-photoshop.html")

#immagine(path("/risorse-condivise/immagini/figure/colore/modelli-rgb-cmy-ryb.png"),
  [Schemi illustrativi di RGB, CMY e primari RYB; le sovrapposizioni non simulano una prova di stampa.],
  alt: "Schemi illustrativi di RGB, CMY e primari RYB; le sovrapposizioni non simulano una prova di stampa.",
  width: 137mm) <fig-colore-197>

Il risultato dipende anche dallo spazio colore, dal profilo e dal supporto. Un colore visibile sullo schermo può non essere riproducibile nello stesso modo con gli inchiostri.

=== Leggere la ruota cromatica

La ruota dispone le tonalità lungo un percorso circolare. Il riferimento cambia le vicinanze e le opposizioni: nella ruota RGB/HSV rosso e ciano sono opposti; nel riferimento pittorico RYB lo sono rosso e verde. Le due costruzioni non vanno sovrapposte (@fig-colore-198).#sito([Adobe, HSB, RGB e relazioni cromatiche.], "https://helpx.adobe.com/photoshop-elements/desktop/working-with-colors/color.html")

#immagine(path("/risorse-condivise/immagini/figure/colore/ruote-hsv-ryb.png"),
  [Ruote cromatiche: RGB/HSV (a sinistra) e RYB tradizionale (a destra). Le terne grandi indicano i primari del riferimento.],
  alt: "Ruote cromatiche: RGB/HSV (a sinistra) e RYB tradizionale (a destra). Le terne grandi indicano i primari del riferimento.",
  width: 137mm) <fig-colore-198>

I diagrammi usano dodici campioni, punti selezionati più grandi e collegamenti geometrici. In HSV i passi di $H$ sono di 30°; la ruota RYB è uno schema tradizionale e non descrive la miscela reale di ogni pigmento.

=== Monocromatico

Uno schema monocromatico parte da una sola tinta e ne varia saturazione e valore. La continuità cromatica può unificare l’interfaccia; le differenze fra superfici, contenuti e azioni devono restare riconoscibili (@fig-colore-199).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#schema-armonia(path("/risorse-condivise/immagini/figure/colore/schema-monocromatico.svg"),
  [Schema monocromatico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i tre campioni interni variano saturazione e valore.],
  alt: "Schema monocromatico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i tre campioni interni variano saturazione e valore.",
  legenda: [Una sola tinta · $S$ e $V$ variano]) <fig-colore-199>

I tre campioni interni mantengono $H = 210°$ e cambiano $S$ e $V$. Una palette monocromatica non impone a testo, sfondo e pulsanti la stessa intensità. Neutri e spazi vuoti contribuiscono alla gerarchia; ogni coppia di testo e sfondo richiede una verifica del contrasto.

=== Monocromatico: esempi

Smartwater e Netlife Research mostrano due dominanti molto diverse: blu nel primo caso, verde nel secondo. In entrambi, variazioni della stessa famiglia e colori neutri costruiscono gran parte della composizione (@fig-colore-200).

#immagine(path("/risorse-condivise/immagini/figure/colore/esempi-monocromatici-smartwater-netlife.svg"),
  [A · SMARTWATER; B · NETLIFE RESEARCH. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · SMARTWATER; B · NETLIFE RESEARCH. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-200>

A · Smartwater usa il blu per ambiente, acqua e prodotto, con dettagli chiari.

B · Netlife Research concentra il campo sul verde; testo scuro e aree chiare distinguono navigazione e contenuti. Monocromatico descrive la prevalenza della palette, non ogni pixel delle immagini.

=== Analogo

Uno schema analogo seleziona tinte vicine sulla ruota. In questo esempio HSV, ciano, azzurro e blu occupano tre posizioni consecutive. La vicinanza delle tinte sostiene la continuità visiva senza annullare le differenze (@fig-colore-201).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#schema-armonia(path("/risorse-condivise/immagini/figure/colore/schema-analogo.svg"),
  [Schema analogo sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema analogo sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  legenda: [$H = 180°, 210°, 240°$ · tinte vicine]) <fig-colore-201>

Scegli una dominante e usa le tinte adiacenti per superfici o accenti. Saturazione, valore e quantità aiutano a separare le funzioni. Se i colori hanno luminanza simile, un titolo o un controllo può restare poco leggibile anche in una palette coerente.

=== Analogo: esempi

Boost accosta giallo e arancione; Omnium combina blu, violetto e ciano. Le schermate mostrano come famiglie vicine possano sostenere una dominante calda o fredda, variando anche saturazione e valore (@fig-colore-202).

#immagine(path("/risorse-condivise/immagini/figure/colore/esempi-analoghi-boost-omnium.svg"),
  [A · BOOST; B · OMNIUM. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · BOOST; B · OMNIUM. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-202>

A · Nel sito Boost il fondo e il prodotto mantengono passaggi caldi; il bianco evidenzia il titolo.

B · In Omnium luce e volume dell’illustrazione sviluppano passaggi fra tinte vicine. I campioni sono indicativi: le ruote spiegano una relazione e non misurano gli screenshot.

=== Complementare

Uno schema complementare accosta due tinte opposte sulla ruota adottata. Nell’esempio HSV, arancione e azzurro sono distanti 180°. La relazione rende evidente la differenza di tinta, ma non misura il contrasto di luminanza (@fig-colore-203).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#schema-armonia(path("/risorse-condivise/immagini/figure/colore/schema-complementare.svg"),
  [Schema complementare sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema complementare sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  legenda: [$H = 30°$ e $210°$ · distanza $180°$]) <fig-colore-203>

Assegna quantità e funzioni diverse ai due colori: una dominante può occupare il fondo e l’opposto può identificare un accento. Verifica le coppie effettive di testo e superficie. I complementari cambiano con il riferimento: qui la costruzione è HSV.

=== Complementare: esempi

Série Découvertes e The Ancient World accostano campi blu a elementi arancioni o sabbia. Le differenze di area e posizione costruiscono una gerarchia e richiamano una relazione complementare fra famiglie di tinta (@fig-colore-204).

#immagine(path("/risorse-condivise/immagini/figure/colore/esempi-complementari-serie-decouvertes-ancient-world.svg"),
  [A · SÉRIE DÉCOUVERTES; B · THE ANCIENT WORLD. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  diritti: [The Ancient World: attribuzione della fonte ad Akraaf Elkami.],
  alt: "A · SÉRIE DÉCOUVERTES; B · THE ANCIENT WORLD. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-204>

A · Série Découvertes, presentata da WKND 91,9 FM, usa arancione e blu scuro con pesi differenti.

B · The Ancient World combina blu petrolio e toni caldi del paesaggio. Una schermata fotografica contiene molte tinte: l’etichetta descrive la relazione generale.

=== Complementare divergente

Lo schema complementare divergente usa una tinta e le due adiacenti al suo opposto. Rispetto alla coppia complementare aggiunge una seconda direzione di accento. Nel diagramma, arancione, ciano e blu formano la terna selezionata (@fig-colore-205).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#schema-armonia(path("/risorse-condivise/immagini/figure/colore/schema-complementare-divergente.svg"),
  [Schema complementare divergente sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema complementare divergente sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  legenda: [$H = 30°, 180°, 240°$ · ai lati dell’opposto]) <fig-colore-205>

La base e i due accenti non devono competere con la stessa intensità. Varia saturazione, valore e quantità in funzione del contenuto. Prima di assegnare colori a errori, conferme o focus, controlla che tali stati restino distinguibili e siano spiegati anche dal testo.

=== Complementare divergente: esempi

Neverland e Skin Health Alliance permettono di osservare una dominante accompagnata da accenti su due famiglie diverse. Le palette reali usano sfumature attenuate e colori delle immagini: la relazione va letta come orientamento (@fig-colore-206).

#immagine(path("/risorse-condivise/immagini/figure/colore/esempi-complementari-divergenti-neverland-skin-health.svg"),
  [A · NEVERLAND; B · SKIN HEALTH ALLIANCE. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · NEVERLAND; B · SKIN HEALTH ALLIANCE. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-206>

A · Neverland costruisce il campo sul rosa, con dettagli verde menta e piccoli accenti caldi.

B · Skin Health Alliance distribuisce viola chiaro, giallo e verde scuro fra fondo e blocchi informativi. Il dato “82%” emerge anche per scala, posizione e contenuto.

=== Triadico

Uno schema triadico seleziona tre tinte equidistanti sulla ruota. Nel riferimento HSV gli intervalli sono di 120°. La geometria definisce la relazione fra le tinte; saturazione, valore e quantità restano scelte progettuali ulteriori (@fig-colore-207).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#schema-armonia(path("/risorse-condivise/immagini/figure/colore/schema-triadico.svg"),
  [Schema triadico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema triadico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  legenda: [$H = 30°, 150°, 270°$ · intervalli di $120°$]) <fig-colore-207>

Scegli una tinta dominante e assegna alle altre ruoli riconoscibili. Una triade non richiede tre aree uguali o tre accenti ugualmente intensi. Verifica ogni coppia necessaria alla lettura e all’interazione: la distanza angolare non garantisce il contrasto.

=== Triadico: esempi

SecretKey richiama tre famiglie, viola, arancione e verde attenuato. SMI serve da confronto critico: contare tre campioni non basta per riconoscere una triade esatta, perché alcuni possono funzionare come neutri (@fig-colore-208).

#immagine(path("/risorse-condivise/immagini/figure/colore/esempi-triadici-secretkey-smi.svg"),
  [A · SECRETKEY; B · SMI · CONFRONTO. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · SECRETKEY; B · SMI · CONFRONTO. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-208>

A · In SecretKey viola e arancione costruiscono ambiente e accenti; il verde compare soprattutto nell’illustrazione.

B · In SMI emergono viola e verde con un fondo bruno neutro. La lettura come triadico resta da verificare: lo screenshot da solo non dimostra tre intervalli di 120°.

=== Dalla palette ai ruoli

Una palette diventa un sistema quando ogni colore ha un uso riconoscibile. Superficie, testo, azione, bordo e focus hanno esigenze differenti. I colori di marca possono coincidere con quelli di stato: testo, icone e posizione devono allora chiarire la funzione (@fig-colore-209).#sito([GOV.UK Design System, Error summary.], "https://design-system.service.gov.uk/components/error-summary/")#sito([GOV.UK Design System, Colour.], "https://design-system.service.gov.uk/styles/colour/")

#immagine(path("/risorse-condivise/immagini/figure/colore/govuk-ruoli-cromatici-errore.svg"),
  [GOV.UK Design System: riepilogo, messaggio e bordo rendono riconoscibile l’errore insieme al testo. Screenshot dell’esempio ufficiale, 16 ottobre 2026.],
  diritti: [© Crown copyright. Open Government Licence v3.0, salvo eccezioni dichiarate dalla fonte.],
  alt: "GOV.UK Design System: riepilogo, messaggio e bordo rendono riconoscibile l’errore insieme al testo. Screenshot dell’esempio ufficiale, 16 ottobre 2026.",
  width: 137mm) <fig-colore-209>

Nell’esempio GOV.UK il rosso accomuna riepilogo, messaggio e bordo del campo. Il testo specifica cosa correggere e il link conduce alla risposta: l’informazione resta comprensibile anche senza distinguere il colore. I campioni sopra lo screenshot ricordano ruoli diversi, non tutti presenti in questo stato.

// Riprendono le due colonne per colori e identità visive.
#set page(columns: 2)

=== Colori caldi e colori freddi

Per convenzione si definiscono calde le tonalità vicine a rosso, arancio e giallo, e fredde quelle vicine a blu, verde e viola. La percezione di caldo e freddo dipende però anche dalle tonalità accostate.

Bianco, nero e grigi sono colori acromatici. Un grigio può apparire più caldo o freddo in presenza di una dominante cromatica o per effetto dello sfondo. Anche saturazione e valore modificano l’effetto della tinta: confrontali mantenendo costanti gli altri parametri (@fig-colore-210).

#immagine(path("/risorse-condivise/immagini/figure/colore/scena-colori-caldi-freddi.png"),
  [La stessa scena interpretata con colori caldi e colori freddi.],
  alt: "La stessa scena interpretata con colori caldi e colori freddi.",
  width: 66mm) <fig-colore-210>

=== Rosso

Il rosso può richiamare passione, energia, pericolo o urgenza, secondo il contesto culturale e comunicativo.

Nel design può rendere evidente un elemento se contrasta con lo sfondo. Va usato in modo coerente: associare lo stesso colore a un’azione positiva e a un errore può creare ambiguità. Se colore di marca ed errore coincidono, testo, icone e posizione devono rendere riconoscibile la funzione (@fig-colore-211).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-rosso.png"),
  [Il rosso nelle identità visive di Adobe, Canon, Coca-Cola e Marvel.],
  alt: "Il rosso nelle identità visive di Adobe, Canon, Coca-Cola e Marvel.",
  width: calc.min(66mm, 210pt * 241 / 334)) <fig-colore-211>

=== Arancio

L’arancione è una tonalità calda che può suggerire energia, entusiasmo o informalità. Le associazioni cambiano con saturazione, luminosità e contesto.

Nel design può dare rilievo a inviti all’azione e accenti visivi. Per conservarne l’efficacia, occorre valutare contrasto e coerenza con l’identità del progetto. Quando molti elementi hanno la stessa evidenza cromatica, l’azione principale diventa più difficile da individuare (@fig-colore-212).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-arancio.png"),
  [L’arancione nelle identità visive di easyJet, Etsy, SoundCloud e Nickelodeon.],
  alt: "L’arancione nelle identità visive di easyJet, Etsy, SoundCloud e Nickelodeon.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-212>

=== Giallo

Il giallo può richiamare sole, calore e vivacità; in altri contesti segnala attenzione o pericolo.

Nel design può creare accenti luminosi, ma su uno sfondo chiaro alcune tonalità risultano poco leggibili. La scelta va verificata attraverso il contrasto, senza presumere che il colore produca sempre la stessa emozione. Il giallo puro su bianco ha contrasto circa 1,07:1; il nero sullo stesso giallo circa 19,56:1 (@fig-colore-213).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-giallo.png"),
  [Il giallo nelle identità visive di Nikon, CAT, Ferrari e Hertz.],
  alt: "Il giallo nelle identità visive di Nikon, CAT, Ferrari e Hertz.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-213>

=== Verde

Il verde è spesso associato a natura, crescita ed equilibrio, ma i suoi significati variano tra contesti e culture.

Può sostenere l’identità visiva di prodotti legati all’ambiente o indicare uno stato positivo nell’interfaccia. Questa convenzione non basta da sola: colore, testo e icone devono contribuire insieme a rendere il messaggio comprensibile. Una conferma come «Salvato» deve dichiarare ciò che è avvenuto, anche quando il verde non viene distinto (@fig-colore-214).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-verde.png"),
  [Il verde nelle identità visive di Lacoste, Spotify, Tic Tac e Sprite.],
  alt: "Il verde nelle identità visive di Lacoste, Spotify, Tic Tac e Sprite.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-214>

=== Blu

Il blu è spesso usato nelle identità visive per suggerire affidabilità, stabilità o competenza. Può anche richiamare distanza o malinconia, secondo il contesto.

Nessuna di queste associazioni è automatica. Tonalità, contrasto, immagini e tono del messaggio contribuiscono insieme alla percezione del marchio. Colore di marca, link e selezione sono ruoli distinti; la sottolineatura può rendere riconoscibile un collegamento (@fig-colore-215).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-blu.png"),
  [Il blu nelle identità visive di American Express, Oral-B, Zurich e Allianz.],
  alt: "Il blu nelle identità visive di American Express, Oral-B, Zurich e Allianz.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-215>

=== Marrone

Il marrone può richiamare terra, legno, artigianalità e calore. Per questo compare spesso nelle identità di prodotti alimentari e materiali naturali.

Può essere usato come sfondo o accento, valutandone luminosità e contrasto. Il senso di familiarità o solidità dipende anche dagli altri elementi della composizione. Confronta una stessa tinta su superfici chiare e scure: la leggibilità riguarda sempre la coppia effettivamente usata (@fig-colore-216).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-marrone.png"),
  [Il marrone nelle identità visive di M&M’s, Nespresso, Pernigotti e UPS.],
  alt: "Il marrone nelle identità visive di M&M’s, Nespresso, Pernigotti e UPS.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-216>

=== Rosa

Il rosa può suggerire delicatezza, vivacità, romanticismo o provocazione, secondo tonalità e contesto.

Le associazioni con il genere sono convenzioni culturali, non preferenze universali. Nel design la scelta dovrebbe partire dall’identità del progetto e dalla ricerca sul pubblico, senza presumere che tutte le persone di un gruppo condividano gli stessi gusti. Confronta campiture chiare e accenti saturi per osservare come la stessa famiglia cromatica può costruire gerarchie diverse (@fig-colore-217).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-rosa.png"),
  [Il rosa nelle identità visive di Cosmopolitan, Donut King, Barbie e Telekom.],
  alt: "Il rosa nelle identità visive di Cosmopolitan, Donut King, Barbie e Telekom.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-217>

=== Viola

Il viola può richiamare prestigio, creatività, mistero o spiritualità. Queste associazioni dipendono dalla storia e dalle convenzioni del contesto in cui viene usato.

Nel design può differenziare un’identità visiva o dare rilievo a un elemento. Contrasto, saturazione e rapporto con gli altri colori ne determinano l’efficacia. Scegli un ruolo riconoscibile, come superficie o accento, e controlla la leggibilità dei contenuti che vi si sovrappongono (@fig-colore-218).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-viola.png"),
  [Il viola nelle identità visive di Milka, Claire’s, Twitch e Yahoo.],
  alt: "Il viola nelle identità visive di Milka, Claire’s, Twitch e Yahoo.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-218>

=== Bianco

Il bianco può suggerire chiarezza, semplicità o purezza in alcuni contesti; in altri è associato al lutto. Il significato dipende dalle convenzioni del pubblico.

Nel design è spesso usato come sfondo. La leggibilità dipende però dal contrasto con testo e controlli e dalla gestione dello spazio, non dal bianco in sé. La superficie bianca e lo spazio vuoto hanno ruoli distinti: distanze, bordi e accostamenti organizzano la composizione (@fig-colore-219).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-bianco.png"),
  [Il bianco nei marchi di Armani Exchange e Apple su fondo scuro.],
  alt: "Il bianco nei marchi di Armani Exchange e Apple su fondo scuro.",
  width: calc.min(66mm, 210pt * 363 / 306)) <fig-colore-219>

=== Nero

Il nero può richiamare tragedia, lutto o mistero e assumere un tono tradizionale, moderno o serio, secondo il contesto. Nei prodotti premium e di lusso compare spesso nel packaging come convenzione di prestigio e costo elevato.

Può creare contrasti forti: leggibilità e coerenza dipendono dalle superfici accostate. Confronta nero pieno e neutri scuri rispetto alla funzione nella composizione (@fig-colore-220).

#immagine(path("/risorse-condivise/immagini/figure/colore/marchi-nero.png"),
  [Il nero nelle identità visive di Prada, Chanel e Bentley.],
  alt: "Il nero nelle identità visive di Prada, Chanel e Bentley.",
  width: calc.min(66mm, 210pt * 249 / 332)) <fig-colore-220>
]
#[
#import "../template/stile.typ": immagine, sito
#import "../template/documenti.typ": tavola-documentaria


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

Nello studio di #cite(<coloreJonauskaite2020>, form: "prose"), 4.598 partecipanti di 30 nazioni e 22 lingue hanno associato 12 nomi di colore a 20 concetti emotivi. Sono emerse somiglianze diffuse e differenze legate anche alla vicinanza linguistica e geografica.#sito([_Jonauskaite_ et al. (2020).], "https://doi.org/10.1177/0956797620948810")

// Mappa culturale e confronto fotografico.
#set page(columns: 1)

=== Leggere una mappa culturale

Questa visualizzazione storica riunisce 84 significati e dieci categorie culturali molto ampie. Osserva come cambiano gli accostamenti fra categorie e significati (@fig-colore-221) @coloreMcCandless2009.#sito([_McCandless_ e AlwaysWithHonor, Colours in Culture, v1.0, aprile 2009.], "https://informationisbeautiful.net/visualizations/colours-in-cultures/")

#immagine(path("/risorse-condivise/immagini/figure/colore/mappa-colours-in-culture-2009.png"),
  [_Colours in Culture_, _David McCandless_ e AlwaysWithHonor.com, v1.0, aprile 2009.],
  diritti: [David McCandless e AlwaysWithHonor.com, 2009.],
  alt: "Colours in Culture, David McCandless e AlwaysWithHonor.com, v1.0, aprile 2009.",
  width: 137mm) <fig-colore-221>

Le categorie accorpano società, lingue e religioni differenti. Il grafico non misura preferenze individuali né l’efficacia di un’interfaccia. Usalo per formulare domande da verificare nel contesto del progetto.

=== Rosso e bianco: conta il contesto

Uno stesso colore può cambiare significato secondo rito, oggetto e occasione. Le immagini d’archivio mostrano usi da interpretare attraverso fonti e contesto, senza dedurre l’identità delle persone dal colore (@fig-colore-222).

#immagine(path("/risorse-condivise/immagini/figure/colore/lanterne-rosse-abiti-bianchi.svg"),
  [Lanterne rosse; persone in abiti bianchi con ritratti e fiori. Autori, luoghi e date delle fotografie non indicati.],
  alt: "Lanterne rosse; persone in abiti bianchi con ritratti e fiori. Autori, luoghi e date delle fotografie non indicati.",
  width: 137mm) <fig-colore-222>

Nel Capodanno lunare cinese, lanterne e decorazioni rosse partecipano a una tradizione celebrativa e augurale. Questo uso non prescrive la palette di ogni prodotto rivolto a un pubblico cinese.

In tradizioni funerarie cinesi documentate, gli abiti bianchi possono esprimere il lutto. Lo studio del festival dei Nove Imperatori mostra anche interpretazioni di purezza e variazioni locali. La foto non identifica da sola il rito rappresentato @coloreNineEmperor2023.#sito([Smithsonian, Chinese Red (2016).], "https://asia-archive.si.edu/red/")#sito([Nine Emperor Gods Festival Documentation and Research Project (2023), vol. 1, cap. 7, pp. 440, 486, 494.], "https://singaporeccc.org.sg/events/the-nine-emperor-gods-festival-in-singapore-heritage-culture-and-community/")

// I casi IKEA mantengono la gabbia ordinaria.
#set page(columns: 2)

#[
#show figure: set block(above: 0pt, below: 0pt)

=== Il rosso nella campagna IKEA

Nella schermata storica IKEA per il Capodanno lunare, il riferimento culturale emerge dai prodotti, dalle fotografie e dal testo: lanterne, pendenti e dettagli rossi entrano in una scena domestica (@fig-colore-223).#sito([IKEA, FÖSSTA Collection, 1 dicembre 2022. La fonte documenta la collezione e il tema, non data la cattura.], "https://www.ikea.com/us/en/newsroom/range-news/foessta-collection-puba8fbaf50/")

#immagine(path("/risorse-condivise/immagini/figure/colore/ikea-capodanno-lunare.jpg"),
  [IKEA Cina, campagna per il Capodanno lunare. Schermata storica del 2022–2023; giorno di acquisizione non documentato.],
  diritti: [© Inter IKEA Systems B.V.],
  alt: "IKEA Cina, campagna per il Capodanno lunare. Schermata storica del 2022–2023; giorno di acquisizione non documentato.",
  width: calc.min(66mm, 100pt * 1364 / 872)) <fig-colore-223>

Il sito non diventa interamente rosso. Nella stessa schermata compaiono superfici chiare, un riquadro arancio e una lampada blu: il colore celebrativo convive con la gerarchia dell’interfaccia.

La collezione FÖSSTA, documentata da IKEA nel 2022, è un riferimento primario per il tema festivo. La cattura resta storica, con giorno non documentato; non rappresenta il sito attuale.

=== Confrontare le campagne, poi verificare

La schermata storica svedese accosta offerte, risparmio energetico e piccoli prezzi. Blu, bruno e grigio organizzano messaggi quotidiani diversi dal tema festivo della campagna per il Capodanno lunare (@fig-colore-224).#sito([IKEA, cultura e valori.], "https://www.inter.ikea.com/en/how-we-do-business/ikea-culture-and-values")#sito([_Jonauskaite_ et al. (2020).], "https://doi.org/10.1177/0956797620948810")

#immagine(path("/risorse-condivise/immagini/figure/colore/ikea-vita-quotidiana.jpg"),
  [IKEA Svezia, «Just nu på IKEA»: offerte e vita quotidiana. Schermata storica del 2022–2023; giorno di acquisizione non documentato.],
  diritti: [© Inter IKEA Systems B.V.],
  alt: "IKEA Svezia, «Just nu på IKEA»: offerte e vita quotidiana. Schermata storica del 2022–2023; giorno di acquisizione non documentato.",
  width: calc.min(66mm, 100pt * 1688 / 992)) <fig-colore-224>

Le due schermate appartengono allo stesso marchio, ma cambiano lingua, contenuti e campagna. Il confronto illustra scelte progettuali: non misura preferenze nazionali né dimostra l’effetto della localizzazione.

Nel progetto distingui il colore di marca, il tema della campagna e i segnali funzionali. Confronta varianti dello stesso compito con il pubblico destinatario e osserva comprensione, errori e riconoscimento delle azioni.
]

// Convenzioni, categorie linguistiche e applicazione culturale.
#set page(columns: 1)

=== Il colore di un dato è una convenzione

Nelle interfacce finanziarie, rosso e verde possono indicare andamenti opposti. Il significato operativo della tinta dipende dalla convenzione del prodotto e dalle abitudini del pubblico.#nota-compatta([CGSE, Trader Terminal User Manual (2021), § 5.1.4, PDF p. 13], ("https://cgse.com.hk/chines/sites/default/files/gtp-user-manual-trader-terminal-20211022b.pdf",), etichetta: ("https://cgse.com.hk/chines/sites/default/files/gtp-user-manual-trader-terminal-20211022b.pdf",)) <nota-url-05-18>#sito([MagicTrader Plus Android v3.0 (2012), § 40e, PDF p. 21.], "https://www.cmbwinglungbank.com/wlb_corporate/files/hk/upload/about-us/service-guide/10.10.1.9.4-CnSecTeleStoQuoUsrGuiAnd.pdf")

*Convenzione locale.* Il manuale MagicTrader Plus distingue lo stile di Hong Kong da quello della Cina continentale. Anche all’interno della stessa area geografica, prodotti e mercati possono adottare corrispondenze diverse: una sola convenzione «asiatica» non descrive questi casi.

*Personalizzazione.* Il CGSE Trader Terminal permette di invertire i colori assegnati ad aumento e diminuzione. La coppia rosso–verde resta la stessa, mentre cambia ciò che ciascuna tinta comunica.

*Segnali espliciti.* Prima di interpretare il colore, leggi legenda, segno, unità e grandezza rappresentata. In un progetto, accompagna la tinta con testo, simboli o direzione del dato: la @fig-colore-225 mostra due configurazioni documentate.

=== Due convenzioni, due letture del grafico

I due grafici del manuale CGSE mostrano convenzioni cromatiche opposte. Le etichette italiane rendono esplicita la corrispondenza fra andamento e colore (@fig-colore-225).#footnote(<nota-url-05-18>)

#immagine(path("/risorse-condivise/immagini/figure/colore/cgse-convenzioni-grafici.svg"),
  [CGSE Trader Terminal, manuale 2021, §5.1.4, PDF p. 13. Screenshot storici originali CGSE / Infocast Finance; lettere e traduzione didattica aggiunte.],
  diritti: [CGSE / Infocast Finance.],
  alt: "CGSE Trader Terminal, manuale 2021, §5.1.4, PDF p. 13. Screenshot storici originali CGSE / Infocast Finance; lettere e traduzione didattica aggiunte.",
  width: 137mm) <fig-colore-225>

Il confronto documenta una funzione del prodotto nel 2021. Non misura le preferenze del pubblico. La legenda va letta prima di attribuire al rosso o al verde un valore positivo o negativo.

=== Le parole organizzano anche il colore

Le lingue non suddividono sempre lo spettro nello stesso modo. Nell’area dei blu, il russo distingue goluboy e siniy: il primo rimanda ai blu più chiari, il secondo ai blu più scuri (@fig-colore-226).

#immagine(path("/risorse-condivise/immagini/figure/colore/lingua-categorie-blu.svg"),
  [Campioni illustrativi per goluboy e siniy. Lo schema non riproduce gli stimoli né il confine sperimentale di _Winawer_ et al. (2007).],
  alt: "Campioni illustrativi per goluboy e siniy. Lo schema non riproduce gli stimoli né il confine sperimentale di Winawer et al. (2007).",
  width: 137mm) <fig-colore-226>

#cite(<coloreWinawer2007>, form: "prose") hanno confrontato parlanti russi e inglesi in un compito rapido di discriminazione. I parlanti russi erano più veloci quando i colori appartenevano alle due categorie diverse; il vantaggio scompariva durante un’interferenza verbale, ma non durante quella spaziale.

Il risultato riguarda quel compito sperimentale. Nel progetto di un’interfaccia suggerisce di verificare anche i nomi dei campioni e delle categorie nella lingua del pubblico, senza ricavare una palette nazionale dallo studio.#sito([_Winawer_ et al. (2007).], "https://doi.org/10.1073/pnas.0701644104")

// I riferimenti culturali applicati e gli studi usano la gabbia ordinaria.
#set page(columns: 2)

=== Un fiore, un rito, un riferimento culturale

Un colore acquista significato anche attraverso gli oggetti, le pratiche e le occasioni in cui compare. Il cempasúchil, un fiore giallo o arancione, partecipa alle ofrendas del Día de los Muertos in Messico.#sito([INAH, Cempasúchil y mariposas: símbolos del regreso de las almas.], "https://www.inah.gob.mx/foto-del-dia/cempasuchil-y-mariposas-simbolos-del-regreso-de-las-almas")#nota-compatta([Google Doodles, Day of the Dead 2024, opera e intervista a _Lucia Sarabia_], ("https://doodles.google/doodle/day-of-the-dead-2024/",), etichetta: ("https://doodles.google/doodle/day-of-the-dead-2024/",)) <nota-url-05-23>

*L’oggetto.* Non si osserva soltanto una tinta astratta: la forma del fiore, i petali e il profumo rendono riconoscibile un oggetto legato alla ricorrenza.

*L’occasione.* Nelle pratiche ricordate dalle fonti culturali messicane, i fiori accompagnano il ricordo dei defunti e l’accoglienza delle anime. Il significato appartiene al rito e alle tradizioni delle comunità che lo praticano.

*Il riferimento progettuale.* Nella @fig-colore-227, Google riprende fiori e figure della tradizione in un Doodle per la ricorrenza. La scelta cromatica opera insieme ai soggetti rappresentati e alla data della pubblicazione.

*Descrivere il contesto.* «Arancione» da solo non riassume una cultura o un’emozione. Per spiegare una scelta, precisa quale oggetto, occasione e messaggio la rendono comprensibile al pubblico.

=== Il riferimento culturale entra nell’interfaccia

Il 1 novembre 2024 Google ha pubblicato un Doodle di _Lucia Sarabia_ dedicato al Día de los Muertos. Fiori di cempasúchil e cani della tradizione compongono il marchio per l’occasione (@fig-colore-227).#footnote(<nota-url-05-23>)

#immagine(path("/risorse-condivise/immagini/figure/colore/google-day-of-the-dead-2024.png"),
  [_Day of the Dead 2024_, Google Doodles, 1 novembre 2024. Illustrazione di _Lucia Sarabia_; Archivio ufficiale consultato il 16 ottobre 2026.],
  diritti: [© Google / Lucia Sarabia.],
  alt: "Day of the Dead 2024, Google Doodles, 1 novembre 2024. Illustrazione di Lucia Sarabia; Archivio ufficiale consultato il 16 ottobre 2026.",
  width: 66mm) <fig-colore-227>

Il riferimento culturale emerge dalla relazione fra colore, soggetti e ricorrenza. L’archivio ufficiale documenta le scelte dell’artista e il loro contesto.

L’esempio mostra un’applicazione reale nella comunicazione di un’interfaccia. Per trasferire un riferimento nel proprio progetto, verifica che le persone riconoscano l’occasione e comprendano il messaggio previsto.

=== Associazioni, preferenze e uso

Associare, preferire e usare un colore sono domande diverse. Un’associazione culturale può suggerire un’ipotesi; non basta per stabilire quale palette piaccia o quale interfaccia funzioni meglio @coloreClarke2008.

*Associare.* Quale oggetto, idea o occasione richiama questo colore? Parti da domande aperte: dove lo incontri, che cosa ti fa pensare, quale messaggio ti aspetti?

*Preferire.* Quanto piace a questa persona, in questa situazione? #cite(<coloreTaylor2013>, form: "prose") hanno osservato preferenze differenti fra i gruppi britannico e himba studiati. #cite(<coloreDavis2021>, form: "prose") hanno confrontato bambini di quattro contesti culturali: il rapporto fra genere e preferenza per il rosa variava fra i campioni. Questi risultati non forniscono una regola universale per scegliere una palette.

*Usare.* Il colore aiuta a trovare un comando e a capire uno stato? Osserva lo svolgimento dello stesso compito con il pubblico previsto: comprensione, errori e riconoscimento delle azioni richiedono prove sull’interfaccia.

*Verificare.* Distingui messaggio, gusto e prestazione. Mantieni testo, simboli o forme per comunicare stati ed errori anche quando la sola differenza cromatica non viene riconosciuta.#sito([_Taylor_ et al. (2013).], "https://doi.org/10.1037/a0030273")#sito([_Davis_ et al. (2021).], "https://doi.org/10.1111/cdev.13528")#sito([_Clarke_ e _Costall_ (2008).], "https://doi.org/10.1002/col.20435")

== Interaction of Color: lo studio di _Albers_

*_“I colori si presentano in un flusso continuo, costantemente in rapporto con vicini che variano e in condizioni altrettanto variabili”_* #cite(<coloreAlbers2013>, supplement: [pp. 26–27]).#sito([_Josef Albers_, Interazione del colore, Il Saggiatore, 2013; originale 1963.], "https://www.ilsaggiatore.com/libro/interazione-del-colore")

_Josef Albers_

=== _Josef Albers_ e il Bauhaus

Il Bauhaus, fondato in Germania nel 1919, mise in relazione arte, artigianato e progettazione per la produzione industriale. Le sue esperienze influenzarono il graphic design e lo studio degli elementi del linguaggio visivo.

_Josef Albers_ fu tra i docenti della scuola e proseguì la propria ricerca negli Stati Uniti. I suoi esercizi sul colore confluirono in _Interaction of Color_, pubblicato nel 1963: un percorso di apprendimento basato sull’osservazione delle relazioni cromatiche @coloreAlbers1963.

Gli esercizi di _Albers_ mostrano che l’aspetto di un colore cambia in relazione ai colori circostanti. Una stessa superficie può apparire diversa su due sfondi; superfici differenti possono invece sembrare simili.

Questa relatività percettiva distingue il colore fisico dalla sua apparenza nella composizione. Non implica che la percezione sia soltanto soggettiva o che il colore sia sempre ingannevole.

_Interaction of Color_ propone confronti pratici per sviluppare la sensibilità alle relazioni cromatiche. Osservare e modificare gli accostamenti è parte del metodo di apprendimento (@fig-colore-228).

#figura-nel-testo(
  id: "fig-colore-228", file: path("/risorse-condivise/immagini/figure/colore/albers-interaction-of-color-copertina.png"),
  didascalia: [Copertina di _Interaction of Color_ di _Josef Albers_.],
  alt: "Copertina di Interaction of Color di Josef Albers.",
  rapporto: 158 / 242,
  colonne: 1,
)

=== La relatività del colore

#block(breakable: false)[
_“I piccoli viola interni sono, di fatto, identici. Ma quello superiore sembra invece uguale al viola più chiaro sul fondo”_ @coloreAlbers2013.
]

Confronta prima l’apparenza dei due campioni, poi verifica che il valore sia identico. Coprire temporaneamente gli sfondi aiuta a osservare la differenza fra il colore del campione e la sua apparenza. Nell’interfaccia, prova lo stesso testo o la stessa icona su superfici diverse (@fig-colore-229).#sito([_Josef Albers_, Interazione del colore, Il Saggiatore, 2013; originale 1963.], "https://www.ilsaggiatore.com/libro/interazione-del-colore")<nota-url-05-30>

// Tavola originale a piena gabbia, senza note: la caption resta nativa.
#figura-al-vivo(
  id: "fig-colore-229",
  file: path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"),
  didascalia: [_Interazione del colore_: superfici sovrapposte e contrasti cromatici.],
  alt: "Interazione del colore: superfici sovrapposte e contrasti cromatici.",
  rapporto: 0.751868469743, ancoraggio: (0.5, 0.5),
)

=== Gli sfondi invertiti

Osservando con attenzione il tratto superiore che unisce le due X possiamo dedurre che il colore è uguale. Sembrano esserci soltanto due colori sulla tavola, ma in realtà ce ne sono tre, perché il colore della X non è uguale né a quello del rettangolo a sinistra, né a quello di destra @coloreAlbers2013.

Segui il campione continuo attraverso i due sfondi oppure maschera una parte della tavola. L’esercizio rende visibile il rapporto fra campione e contesto. Quando cambi una superficie del progetto, ricontrolla anche gli elementi che vi si sovrappongono (@fig-colore-230).#footnote(<nota-url-05-30>)

// Tavola originale a piena gabbia, senza note: la caption resta nativa.
#tavola-documentaria[
#immagine(path("/risorse-condivise/immagini/figure/colore/albers-colore-sfondo.svg"),
  [_Interazione del colore_: la percezione cambia con lo sfondo.],
  alt: "Interazione del colore: la percezione cambia con lo sfondo.",
  width: 137mm) <fig-colore-230>
]

=== La sottrazione del colore

Focalizzando lo sguardo sui singoli rettangoli interni, si nota come i loro colori siano differenti, benché a prima vista non sembri così.

I colori di fondo sembrano sottrarsi al colore dei piccoli rettangoli sovrapposti @coloreAlbers2013.

Qui «sottrazione» descrive una relazione percettiva fra campioni e sfondi. Non è la sintesi sottrattiva degli inchiostri CMYK. Confronta separatamente i campioni interni e poi torna all’insieme per osservare come cambia il giudizio sull’accostamento (@fig-colore-231).#footnote(<nota-url-05-30>)

// Tavola originale a piena gabbia, senza note: la caption resta nativa.
#figura-al-vivo(
  id: "fig-colore-231",
  file: path("/risorse-condivise/immagini/figure/colore/albers-campi-cromatici-quadrati.svg"),
  didascalia: [_Interazione del colore_: relazioni tra campi cromatici e piccoli quadrati.],
  alt: "Interazione del colore: relazioni tra campi cromatici e piccoli quadrati.",
  rapporto: 0.750373679631, ancoraggio: (0.5, 0.5),
)

=== Il contrasto successivo

Fissate per circa 30 secondi il punto nel cerchio rosso, poi spostate lo sguardo sul cerchio bianco. Può comparire un’immagine residua di tonalità verde o azzurro-verde.

L’effetto dipende dall’adattamento del sistema visivo allo stimolo e dai meccanismi che elaborano le differenze cromatiche. Non significa che singole cellule “leggano” rosso, verde e blu come i pixel di uno schermo: la percezione nasce dall’elaborazione combinata dei segnali.

Il contrasto simultaneo riguarda colori presenti nello stesso momento; quello successivo emerge dopo l’esposizione a uno stimolo. Nell’esercizio conta quindi anche la sequenza di osservazione, oltre ai colori e allo sfondo (@fig-colore-232).

// Esercizio schematico compatto in una colonna, con caption nativa.
#figura-nel-testo(
  id: "fig-colore-232",
  file: path("/risorse-condivise/immagini/figure/colore/albers-forma-colore-sfondo.svg"),
  didascalia: [Contrasto tra forma, colore e sfondo in due campi visivi.],
  alt: "Contrasto tra forma, colore e sfondo in due campi visivi.",
  rapporto: 0.750373679631,
  colonne: 1,
)

=== L’effetto _Bezold_

_“Il rosso con il bianco sembra molto più chiaro del rosso con il nero, soprattutto a distanza.”_

Nell’esempio, lo stesso rosso appare più chiaro quando è intrecciato con il bianco e più scuro quando è intrecciato con il nero. L’effetto dipende dalla disposizione e dalla scala dei dettagli.

Confronta la tavola da vicino e da più lontano: quanto incidono i dettagli bianchi e neri sulla lettura dell’insieme? Ripeti il confronto a dimensioni diverse. Anche pattern e dettagli minuti di un’interfaccia vanno valutati nella scala di utilizzo (@fig-colore-233).

// Esercizio schematico compatto in una colonna, con caption nativa.
#figura-nel-testo(
  id: "fig-colore-233",
  file: path("/risorse-condivise/immagini/figure/colore/albers-contrasto-sfondo.svg"),
  didascalia: [La percezione del contrasto cambia con il colore dello sfondo.],
  alt: "La percezione del contrasto cambia con il colore dello sfondo.",
  rapporto: 0.750373679631,
  colonne: 1,
)

// La distribuzione cromatica si osserva in una figura ampia.
]
#[
#import "../template/stile.typ": immagine, sito

#set page(columns: 1)

== Consigli pratici

=== La regola del 60-30-10

La regola del 60-30-10 può aiutare a distribuire colori dominanti, secondari e d’accento. Questa regola è spesso utilizzata nel design di interni.

Le proporzioni sono indicative e vanno adattate al progetto. Scegli un colore dominante e applicalo nel 60% dello spazio, un altro secondario utilizzato nel 30% e un ultimo colore per il restante 10%.

Le quote riguardano aree visive e non garantiscono leggibilità o gerarchia. Nell’interfaccia distingui neutri, accento e colori di stato; assegna i ruoli e verifica separatamente ogni coppia di testo e sfondo (@fig-colore-234).

#immagine(path("/risorse-condivise/immagini/figure/colore/palette-cinema-dominanti-accenti.png"),
  [Distribuzione dei colori dominanti, secondari e d’accento in due esempi cinematografici.],
  alt: "Distribuzione dei colori dominanti, secondari e d’accento in due esempi cinematografici.",
  width: calc.min(137mm, 190pt * 324 / 191)) <fig-colore-234>

// Consigli ordinari e immagini compatte.
#set page(columns: 2)

=== Lasciati ispirare dalla natura

Osserva l’armonia e il contrasto dei colori della natura per trovare ispirazione per le tue palette.

Dall’immagine ricava una prima selezione, poi assegna superficie, testo e accento. Provali nei componenti: un accostamento efficace nella fotografia può richiedere modifiche per rendere leggibili informazioni e controlli (@fig-colore-235).

#immagine(path("/risorse-condivise/immagini/figure/colore/palette-ghiaccio-foresta-deserto-fiori.png"),
  [Palette cromatiche ricavate da ghiaccio, foresta, deserto e fiori.],
  alt: "Palette cromatiche ricavate da ghiaccio, foresta, deserto e fiori.",
  width: 66mm) <fig-colore-235>

=== Scegli il contrasto in base al contesto

Il testo deve distinguersi chiaramente dallo sfondo. Nero su bianco può essere una scelta efficace; un grigio scuro può rendere il tono visivo più morbido, purché mantenga un contrasto adeguato.

Il comfort dipende anche da luminosità dello schermo, ambiente, dimensione dei caratteri e condizioni di visione. Verifica le combinazioni nel contesto d’uso e conserva i rapporti richiesti dalle WCAG.

Le alternative mostrate sono punti di partenza da valutare, non una regola che vieta il nero puro.

Al livello AA, le WCAG 2.2 richiedono almeno 4,5:1 per il testo ordinario e 3:1 per il testo grande. Le informazioni visive necessarie a riconoscere controlli, stati e grafici richiedono 3:1 rispetto ai colori adiacenti, con le eccezioni dei criteri. Le dimensioni del disegno non certificano da sole il testo grande (@fig-colore-236) @coloreWcag22.#sito([W3C, WCAG 2.2, criterio 1.4.3, Contrasto (minimo).], "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")#sito([W3C, WCAG 2.2, criterio 1.4.11, Contrasto non testuale.], "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html")

#immagine(path("/risorse-condivise/immagini/figure/colore/alternative-nero-puro.png"),
  [Alternative al nero puro per il testo su fondo chiaro.],
  alt: "Alternative al nero puro per il testo su fondo chiaro.",
  width: 66mm) <fig-colore-236>

=== Ombre e luci

Il colore delle ombre dipende dall’illuminazione, dall’ambiente e dalle superfici. Un’ombra può contenere dominanti cromatiche diverse dal colore dell’oggetto.

Nell’interfaccia, ombre leggermente tonalizzate possono contribuire alla coerenza della palette. La scelta va valutata in relazione a sfondo, contrasto e profondità che si vuole suggerire (@fig-colore-237).

#immagine(path("/risorse-condivise/immagini/figure/colore/ombre-luci-colori-ambiente.png"),
  [Ombre e luci: colori ricavati dall’ambiente e dalle superfici.],
  alt: "Ombre e luci: colori ricavati dall’ambiente e dalle superfici.",
  width: 66mm) <fig-colore-237>

// Confronti ampi dei temi e della palette applicata.
#set page(columns: 1)

=== La stessa interfaccia in chiaro e scuro

Nel passaggio fra tema chiaro e scuro conserva il ruolo dei colori e rivedine i valori. Superfici, testo, azioni e stati devono restare distinguibili. Una semplice inversione può alterare contrasto, accenti e percezione della profondità (@fig-colore-238).#sito([IBM Carbon, Themes. Documentazione consultata il 16 ottobre 2026.], "https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview")

#immagine(path("/risorse-condivise/immagini/figure/colore/carbon-temi-white-gray-100.svg"),
  [Carbon Design System: lo stesso select nei temi White e Gray 100. I numeri nell’immagine rimandano ai ruoli documentati da IBM. Immagine ufficiale, consultata il 16 ottobre 2026.],
  diritti: [© IBM.],
  alt: "Carbon Design System: lo stesso select nei temi White e Gray 100. I numeri nell’immagine rimandano ai ruoli documentati da IBM. Immagine ufficiale, consultata il 16 ottobre 2026.",
  width: 137mm) <fig-colore-238>

Carbon conserva nomi e ruoli dei token e ne cambia i valori. Le annotazioni confrontano testo, icona, bordo, campo e sfondo.

La scelta dipende dal contesto d’uso e dall’obiettivo. Nero e grigi neutri si abbinano a molte palette; i grigi tonalizzati possono rafforzare la coerenza del prodotto. In entrambi i casi il contrasto con lo sfondo va verificato.

=== Dal riferimento alla schermata

Una fotografia suggerisce una prima direzione cromatica. Seleziona poi i valori in base all’uso: superficie, testo, azione e accento. Nel caso simulato di _Sara_, il pulsante deve rendere chiara la conferma dello spostamento dell’appuntamento (@fig-colore-239).#footnote[
  #set text(size: 7.5pt, variations: (opsz: 9))
  Adobe Color, ruota cromatica e costruzione della palette.
  #text(size: 7pt)[#link("https://color.adobe.com/create/color-wheel")]
  #linebreak()
  W3C, WCAG 2.2, criterio 1.4.3, Contrasto (minimo).
  #text(size: 7pt)[#link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")]
]

#immagine(path("/risorse-condivise/immagini/figure/colore/palette-fotografia-schermata-sara.svg"),
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

#immagine(path("/risorse-condivise/immagini/figure/colore/grigi-neutri-tonalizzati.png"),
  [Grigi neutri e grigi tonalizzati applicati al testo.],
  alt: "Grigi neutri e grigi tonalizzati applicati al testo.",
  width: 66mm) <fig-colore-240>
]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#capitolo(..parametri-capitolo(5), testo)
