#import "../../template/stile.typ": immagine, sito

// Proprietà, modelli e schemi cromatici, con esempi e ruoli.
#set page(columns: 1)

== Teoria e uso del colore

*Il colore partecipa alla gerarchia già costruita con dimensione, posizione e spazio: permette di distinguere elementi, stabilire relazioni e caratterizzare il linguaggio visivo del progetto.*

La psicologia del colore studia le relazioni tra percezione cromatica, associazioni ed emozioni. Non esiste però una corrispondenza fissa tra ogni colore e una specifica emozione o area del cervello: esperienza, cultura, contesto e composizione influenzano la risposta delle persone.

La scelta di una palette va quindi collegata al compito e al pubblico emersi dalla ricerca, mantenendo leggibilità e segnali comprensibili. Quando il colore riguarda il testo, questa decisione si intreccia con la tipografia.

Nella scelta distingui tre domande: come appare il colore nell’accostamento, quali associazioni richiama e quale funzione svolge. Un colore di marca caratterizza il prodotto; un colore di stato aiuta a riconoscere ciò che è avvenuto. Verifica entrambe le funzioni nella schermata concreta.

=== Le proprietà del colore

Tonalità, saturazione e valore descrivono aspetti diversi di un colore. Nel modello HSV, H individua la tinta sulla ruota, S la saturazione e V il valore. Confrontare serie in cui cambia un parametro alla volta aiuta a riconoscerne gli effetti nella composizione (@fig-colore-196).#sito([Adobe, HSB, RGB e relazioni cromatiche.], "https://helpx.adobe.com/photoshop-elements/desktop/working-with-colors/color.html")

#immagine(path("/assets/images/figure/colore/proprieta-hsv.png"),
  [Un parametro alla volta: variazioni di tonalità, saturazione e valore nel modello HSV.],
  alt: "Un parametro alla volta: variazioni di tonalità, saturazione e valore nel modello HSV.",
  width: 137mm) <fig-colore-196>

Il valore V non coincide con la luminanza relativa usata dalle WCAG: due campioni con lo stesso V possono avere contrasti molto diversi rispetto allo sfondo.

=== Colore emesso e colore stampato

Uno schermo produce luce attraverso componenti rosse, verdi e blu: è la sintesi additiva RGB. Nella stampa, ciano, magenta e giallo assorbono parte della luce; il nero K completa il processo CMYK. RYB è un riferimento pittorico tradizionale, con primari differenti (@fig-colore-197).#sito([Adobe, modi colore.], "https://helpx.adobe.com/photoshop/desktop/adjust-color/choose-colors/color-modes-in-photoshop.html")

#immagine(path("/assets/images/figure/colore/modelli-rgb-cmy-ryb.png"),
  [Schemi illustrativi di RGB, CMY e primari RYB; le sovrapposizioni non simulano una prova di stampa.],
  alt: "Schemi illustrativi di RGB, CMY e primari RYB; le sovrapposizioni non simulano una prova di stampa.",
  width: 137mm) <fig-colore-197>

Il risultato dipende anche dallo spazio colore, dal profilo e dal supporto. Un colore visibile sullo schermo può non essere riproducibile nello stesso modo con gli inchiostri.

=== Leggere la ruota cromatica

La ruota dispone le tonalità lungo un percorso circolare. Il riferimento cambia le vicinanze e le opposizioni: nella ruota RGB/HSV rosso e ciano sono opposti; nel riferimento pittorico RYB lo sono rosso e verde. Le due costruzioni non vanno sovrapposte (@fig-colore-198).#sito([Adobe, HSB, RGB e relazioni cromatiche.], "https://helpx.adobe.com/photoshop-elements/desktop/working-with-colors/color.html")

#immagine(path("/assets/images/figure/colore/ruote-hsv-ryb.png"),
  [Ruote cromatiche: RGB/HSV (a sinistra) e RYB tradizionale (a destra). Le terne grandi indicano i primari del riferimento.],
  alt: "Ruote cromatiche: RGB/HSV (a sinistra) e RYB tradizionale (a destra). Le terne grandi indicano i primari del riferimento.",
  width: 137mm) <fig-colore-198>

I diagrammi usano dodici campioni, punti selezionati più grandi e collegamenti geometrici. In HSV i passi di H sono di 30°; la ruota RYB è uno schema tradizionale e non descrive la miscela reale di ogni pigmento.

=== Monocromatico

Uno schema monocromatico parte da una sola tinta e ne varia saturazione e valore. La continuità cromatica può unificare l’interfaccia; le differenze fra superfici, contenuti e azioni devono restare riconoscibili (@fig-colore-199).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#immagine(path("/assets/images/figure/colore/schema-monocromatico.svg"),
  [Schema monocromatico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i tre campioni interni variano saturazione e valore.],
  alt: "Schema monocromatico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i tre campioni interni variano saturazione e valore.",
  width: 137mm) <fig-colore-199>

I tre campioni interni mantengono H = 210° e cambiano S e V. Una palette monocromatica non impone a testo, sfondo e pulsanti la stessa intensità. Neutri e spazi vuoti contribuiscono alla gerarchia; ogni coppia di testo e sfondo richiede una verifica del contrasto.

=== Monocromatico: esempi

Smartwater e Netlife Research mostrano due dominanti molto diverse: blu nel primo caso, verde nel secondo. In entrambi, variazioni della stessa famiglia e colori neutri costruiscono gran parte della composizione (@fig-colore-200).

#immagine(path("/assets/images/figure/colore/esempi-monocromatici-smartwater-netlife.svg"),
  [A · SMARTWATER; B · NETLIFE RESEARCH. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · SMARTWATER; B · NETLIFE RESEARCH. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-200>

A · Smartwater usa il blu per ambiente, acqua e prodotto, con dettagli chiari.

B · Netlife Research concentra il campo sul verde; testo scuro e aree chiare distinguono navigazione e contenuti. Monocromatico descrive la prevalenza della palette, non ogni pixel delle immagini.

=== Analogo

Uno schema analogo seleziona tinte vicine sulla ruota. In questo esempio HSV, ciano, azzurro e blu occupano tre posizioni consecutive. La vicinanza delle tinte sostiene la continuità visiva senza annullare le differenze (@fig-colore-201).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#immagine(path("/assets/images/figure/colore/schema-analogo.svg"),
  [Schema analogo sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema analogo sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  width: 137mm) <fig-colore-201>

Scegli una dominante e usa le tinte adiacenti per superfici o accenti. Saturazione, valore e quantità aiutano a separare le funzioni. Se i colori hanno luminanza simile, un titolo o un controllo può restare poco leggibile anche in una palette coerente.

=== Analogo: esempi

Boost accosta giallo e arancione; Omnium combina blu, violetto e ciano. Le schermate mostrano come famiglie vicine possano sostenere una dominante calda o fredda, variando anche saturazione e valore (@fig-colore-202).

#immagine(path("/assets/images/figure/colore/esempi-analoghi-boost-omnium.svg"),
  [A · BOOST; B · OMNIUM. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · BOOST; B · OMNIUM. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-202>

A · Nel sito Boost il fondo e il prodotto mantengono passaggi caldi; il bianco evidenzia il titolo.

B · In Omnium luce e volume dell’illustrazione sviluppano passaggi fra tinte vicine. I campioni sono indicativi: le ruote spiegano una relazione e non misurano gli screenshot.

=== Complementare

Uno schema complementare accosta due tinte opposte sulla ruota adottata. Nell’esempio HSV, arancione e azzurro sono distanti 180°. La relazione rende evidente la differenza di tinta, ma non misura il contrasto di luminanza (@fig-colore-203).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#immagine(path("/assets/images/figure/colore/schema-complementare.svg"),
  [Schema complementare sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema complementare sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  width: 137mm) <fig-colore-203>

Assegna quantità e funzioni diverse ai due colori: una dominante può occupare il fondo e l’opposto può identificare un accento. Verifica le coppie effettive di testo e superficie. I complementari cambiano con il riferimento: qui la costruzione è HSV.

=== Complementare: esempi

Série Découvertes e The Ancient World accostano campi blu a elementi arancioni o sabbia. Le differenze di area e posizione costruiscono una gerarchia e richiamano una relazione complementare fra famiglie di tinta (@fig-colore-204).

#immagine(path("/assets/images/figure/colore/esempi-complementari-serie-decouvertes-ancient-world.svg"),
  [A · SÉRIE DÉCOUVERTES; B · THE ANCIENT WORLD. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  diritti: [The Ancient World: attribuzione della fonte ad Akraaf Elkami.],
  alt: "A · SÉRIE DÉCOUVERTES; B · THE ANCIENT WORLD. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-204>

A · Série Découvertes, presentata da WKND 91,9 FM, usa arancione e blu scuro con pesi differenti.

B · The Ancient World combina blu petrolio e toni caldi del paesaggio. Una schermata fotografica contiene molte tinte: l’etichetta descrive la relazione generale.

=== Complementare divergente

Lo schema complementare divergente usa una tinta e le due adiacenti al suo opposto. Rispetto alla coppia complementare aggiunge una seconda direzione di accento. Nel diagramma, arancione, ciano e blu formano la terna selezionata (@fig-colore-205).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#immagine(path("/assets/images/figure/colore/schema-complementare-divergente.svg"),
  [Schema complementare divergente sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema complementare divergente sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  width: 137mm) <fig-colore-205>

La base e i due accenti non devono competere con la stessa intensità. Varia saturazione, valore e quantità in funzione del contenuto. Prima di assegnare colori a errori, conferme o focus, controlla che tali stati restino distinguibili e siano spiegati anche dal testo.

=== Complementare divergente: esempi

Neverland e Skin Health Alliance permettono di osservare una dominante accompagnata da accenti su due famiglie diverse. Le palette reali usano sfumature attenuate e colori delle immagini: la relazione va letta come orientamento (@fig-colore-206).

#immagine(path("/assets/images/figure/colore/esempi-complementari-divergenti-neverland-skin-health.svg"),
  [A · NEVERLAND; B · SKIN HEALTH ALLIANCE. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · NEVERLAND; B · SKIN HEALTH ALLIANCE. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-206>

A · Neverland costruisce il campo sul rosa, con dettagli verde menta e piccoli accenti caldi.

B · Skin Health Alliance distribuisce viola chiaro, giallo e verde scuro fra fondo e blocchi informativi. Il dato “82%” emerge anche per scala, posizione e contenuto.

=== Triadico

Uno schema triadico seleziona tre tinte equidistanti sulla ruota. Nel riferimento HSV gli intervalli sono di 120°. La geometria definisce la relazione fra le tinte; saturazione, valore e quantità restano scelte progettuali ulteriori (@fig-colore-207).#sito([Adobe Color, ruota cromatica e costruzione della palette.], "https://color.adobe.com/create/color-wheel")

#immagine(path("/assets/images/figure/colore/schema-triadico.svg"),
  [Schema triadico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.],
  alt: "Schema triadico sulla ruota HSV. I cerchi grandi indicano le tinte selezionate; i collegamenti ne mostrano la relazione geometrica.",
  width: 137mm) <fig-colore-207>

Scegli una tinta dominante e assegna alle altre ruoli riconoscibili. Una triade non richiede tre aree uguali o tre accenti ugualmente intensi. Verifica ogni coppia necessaria alla lettura e all’interazione: la distanza angolare non garantisce il contrasto.

=== Triadico: esempi

SecretKey richiama tre famiglie, viola, arancione e verde attenuato. SMI serve da confronto critico: contare tre campioni non basta per riconoscere una triade esatta, perché alcuni possono funzionare come neutri (@fig-colore-208).

#immagine(path("/assets/images/figure/colore/esempi-triadici-secretkey-smi.svg"),
  [A · SECRETKEY; B · SMI · CONFRONTO. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.],
  alt: "A · SECRETKEY; B · SMI · CONFRONTO. Screenshot storici; data di acquisizione non documentata. Campioni cromatici indicativi, non misurati.",
  width: 137mm) <fig-colore-208>

A · In SecretKey viola e arancione costruiscono ambiente e accenti; il verde compare soprattutto nell’illustrazione.

B · In SMI emergono viola e verde con un fondo bruno neutro. La lettura come triadico resta da verificare: lo screenshot da solo non dimostra tre intervalli di 120°.

=== Dalla palette ai ruoli

Una palette diventa un sistema quando ogni colore ha un uso riconoscibile. Superficie, testo, azione, bordo e focus hanno esigenze differenti. I colori di marca possono coincidere con quelli di stato: testo, icone e posizione devono allora chiarire la funzione (@fig-colore-209).#sito([GOV.UK Design System, Error summary.], "https://design-system.service.gov.uk/components/error-summary/")#sito([GOV.UK Design System, Colour.], "https://design-system.service.gov.uk/styles/colour/")

#immagine(path("/assets/images/figure/colore/govuk-ruoli-cromatici-errore.svg"),
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

#immagine(path("/assets/images/figure/colore/scena-colori-caldi-freddi.png"),
  [La stessa scena interpretata con colori caldi e colori freddi.],
  alt: "La stessa scena interpretata con colori caldi e colori freddi.",
  width: 66mm) <fig-colore-210>

=== Rosso

Il rosso può richiamare passione, energia, pericolo o urgenza, secondo il contesto culturale e comunicativo.

Nel design può rendere evidente un elemento se contrasta con lo sfondo. Va usato in modo coerente: associare lo stesso colore a un’azione positiva e a un errore può creare ambiguità. Se colore di marca ed errore coincidono, testo, icone e posizione devono rendere riconoscibile la funzione (@fig-colore-211).

#immagine(path("/assets/images/figure/colore/marchi-rosso.png"),
  [Il rosso nelle identità visive di Adobe, Canon, Coca-Cola e Marvel.],
  alt: "Il rosso nelle identità visive di Adobe, Canon, Coca-Cola e Marvel.",
  width: calc.min(66mm, 210pt * 241 / 334)) <fig-colore-211>

=== Arancio

L’arancione è una tonalità calda che può suggerire energia, entusiasmo o informalità. Le associazioni cambiano con saturazione, luminosità e contesto.

Nel design può dare rilievo a inviti all’azione e accenti visivi. Per conservarne l’efficacia, occorre valutare contrasto e coerenza con l’identità del progetto. Quando molti elementi hanno la stessa evidenza cromatica, l’azione principale diventa più difficile da individuare (@fig-colore-212).

#immagine(path("/assets/images/figure/colore/marchi-arancio.png"),
  [L’arancione nelle identità visive di easyJet, Etsy, SoundCloud e Nickelodeon.],
  alt: "L’arancione nelle identità visive di easyJet, Etsy, SoundCloud e Nickelodeon.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-212>

=== Giallo

Il giallo può richiamare sole, calore e vivacità; in altri contesti segnala attenzione o pericolo.

Nel design può creare accenti luminosi, ma su uno sfondo chiaro alcune tonalità risultano poco leggibili. La scelta va verificata attraverso il contrasto, senza presumere che il colore produca sempre la stessa emozione. Il giallo puro su bianco ha contrasto circa 1,07:1; il nero sullo stesso giallo circa 19,56:1 (@fig-colore-213).

#immagine(path("/assets/images/figure/colore/marchi-giallo.png"),
  [Il giallo nelle identità visive di Nikon, CAT, Ferrari e Hertz.],
  alt: "Il giallo nelle identità visive di Nikon, CAT, Ferrari e Hertz.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-213>

=== Verde

Il verde è spesso associato a natura, crescita ed equilibrio, ma i suoi significati variano tra contesti e culture.

Può sostenere l’identità visiva di prodotti legati all’ambiente o indicare uno stato positivo nell’interfaccia. Questa convenzione non basta da sola: colore, testo e icone devono contribuire insieme a rendere il messaggio comprensibile. Una conferma come «Salvato» deve dichiarare ciò che è avvenuto, anche quando il verde non viene distinto (@fig-colore-214).

#immagine(path("/assets/images/figure/colore/marchi-verde.png"),
  [Il verde nelle identità visive di Lacoste, Spotify, Tic Tac e Sprite.],
  alt: "Il verde nelle identità visive di Lacoste, Spotify, Tic Tac e Sprite.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-214>

=== Blu

Il blu è spesso usato nelle identità visive per suggerire affidabilità, stabilità o competenza. Può anche richiamare distanza o malinconia, secondo il contesto.

Nessuna di queste associazioni è automatica. Tonalità, contrasto, immagini e tono del messaggio contribuiscono insieme alla percezione del marchio. Colore di marca, link e selezione sono ruoli distinti; la sottolineatura può rendere riconoscibile un collegamento (@fig-colore-215).

#immagine(path("/assets/images/figure/colore/marchi-blu.png"),
  [Il blu nelle identità visive di American Express, Oral-B, Zurich e Allianz.],
  alt: "Il blu nelle identità visive di American Express, Oral-B, Zurich e Allianz.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-215>

=== Marrone

Il marrone può richiamare terra, legno, artigianalità e calore. Per questo compare spesso nelle identità di prodotti alimentari e materiali naturali.

Può essere usato come sfondo o accento, valutandone luminosità e contrasto. Il senso di familiarità o solidità dipende anche dagli altri elementi della composizione. Confronta una stessa tinta su superfici chiare e scure: la leggibilità riguarda sempre la coppia effettivamente usata (@fig-colore-216).

#immagine(path("/assets/images/figure/colore/marchi-marrone.png"),
  [Il marrone nelle identità visive di M&M’s, Nespresso, Pernigotti e UPS.],
  alt: "Il marrone nelle identità visive di M&M’s, Nespresso, Pernigotti e UPS.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-216>

=== Rosa

Il rosa può suggerire delicatezza, vivacità, romanticismo o provocazione, secondo tonalità e contesto.

Le associazioni con il genere sono convenzioni culturali, non preferenze universali. Nel design la scelta dovrebbe partire dall’identità del progetto e dalla ricerca sul pubblico, senza presumere che tutte le persone di un gruppo condividano gli stessi gusti. Confronta campiture chiare e accenti saturi per osservare come la stessa famiglia cromatica può costruire gerarchie diverse (@fig-colore-217).

#immagine(path("/assets/images/figure/colore/marchi-rosa.png"),
  [Il rosa nelle identità visive di Cosmopolitan, Donut King, Barbie e Telekom.],
  alt: "Il rosa nelle identità visive di Cosmopolitan, Donut King, Barbie e Telekom.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-217>

=== Viola

Il viola può richiamare prestigio, creatività, mistero o spiritualità. Queste associazioni dipendono dalla storia e dalle convenzioni del contesto in cui viene usato.

Nel design può differenziare un’identità visiva o dare rilievo a un elemento. Contrasto, saturazione e rapporto con gli altri colori ne determinano l’efficacia. Scegli un ruolo riconoscibile, come superficie o accento, e controlla la leggibilità dei contenuti che vi si sovrappongono (@fig-colore-218).

#immagine(path("/assets/images/figure/colore/marchi-viola.png"),
  [Il viola nelle identità visive di Milka, Claire’s, Twitch e Yahoo.],
  alt: "Il viola nelle identità visive di Milka, Claire’s, Twitch e Yahoo.",
  width: calc.min(66mm, 210pt * 250 / 343)) <fig-colore-218>

=== Bianco

Il bianco può suggerire chiarezza, semplicità o purezza in alcuni contesti; in altri è associato al lutto. Il significato dipende dalle convenzioni del pubblico.

Nel design è spesso usato come sfondo. La leggibilità dipende però dal contrasto con testo e controlli e dalla gestione dello spazio, non dal bianco in sé. La superficie bianca e lo spazio vuoto hanno ruoli distinti: distanze, bordi e accostamenti organizzano la composizione (@fig-colore-219).

#immagine(path("/assets/images/figure/colore/marchi-bianco.png"),
  [Il bianco nei marchi di Armani Exchange e Apple su fondo scuro.],
  alt: "Il bianco nei marchi di Armani Exchange e Apple su fondo scuro.",
  width: calc.min(66mm, 210pt * 363 / 306)) <fig-colore-219>

=== Nero

Il nero può richiamare tragedia, lutto o mistero e assumere un tono tradizionale, moderno o serio, secondo il contesto. Nei prodotti premium e di lusso compare spesso nel packaging come convenzione di prestigio e costo elevato.

Può creare contrasti forti: leggibilità e coerenza dipendono dalle superfici accostate. Confronta nero pieno e neutri scuri rispetto alla funzione nella composizione (@fig-colore-220).

#immagine(path("/assets/images/figure/colore/marchi-nero.png"),
  [Il nero nelle identità visive di Prada, Chanel e Bentley.],
  alt: "Il nero nelle identità visive di Prada, Chanel e Bentley.",
  width: calc.min(66mm, 210pt * 249 / 332)) <fig-colore-220>
