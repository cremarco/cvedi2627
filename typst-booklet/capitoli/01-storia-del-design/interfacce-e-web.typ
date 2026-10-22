#import "../../template/stile.typ": sito, immagine, schermata


== Storia delle interfacce digitali

*_Forma, contenuto e comportamento vanno letti insieme._*

Una chiave di lettura

=== Una storia di relazioni

Ogni tendenza racconta una storia visiva, intrecciandosi con le tecnologie disponibili e i valori culturali del momento. Si evolve organicamente, portando con sé l’eredità del passato mentre guarda al futuro.

Nelle pagine seguenti distinguiamo modelli d’interazione, sistemi di progettazione e scelte estetiche. Per ogni esempio osserviamo quali informazioni mette in evidenza, come rende riconoscibili le azioni e quali compromessi introduce.

// Tavole 36–38: le tappe sono un elenco nativo, senza il tracciato metro.

=== Le origini

Il 9 dicembre 1968, *_Douglas Engelbart_* e il suo gruppo presentarono *NLS* (oN-Line System). La dimostrazione, poi nota come “*The Mother of All Demos*”, mostrava mouse, collegamenti ipertestuali, elaborazione di testi e *lavoro collaborativo* con comunicazione audio e video. Il computer veniva proposto come strumento per organizzare conoscenza e cooperare @engelbartEnglish1968-nls.#sito([Douglas C. Engelbart e William K. English, A research center for augmenting human intellect, 9 dicembre 1968.], "https://doi.org/10.1145/1476589.1476645") Questo evento contribuì a trasformare la percezione dei computer, presentandoli come strumenti di collaborazione e produttività e ampliando la loro funzione oltre la mera esecuzione di calcoli complessi.

Lo *Xerox Alto*, realizzato al PARC nel 1973, era un *sistema di ricerca* con schermo grafico, mouse e rete. L’interfaccia dipendeva dai *programmi*: Bravo lavorava sui documenti, Gypsy sul taglia e incolla, Smalltalk su finestre e strumenti grafici. Queste esperienze contribuirono alle convenzioni sviluppate nelle interfacce successive @chm-alto.#sito([Computer History Museum, Xerox Alto: Bravo, Gypsy e Smalltalk.], "https://www.computerhistory.org/revolution/input-output/14/347")

*Tre momenti della ricerca sulle interfacce grafiche.*

- *1968* — NLS
- *1973* — Xerox Alto
- *1980 circa* — Smalltalk-80

La schermata Smalltalk-80 (@fig-storia-36-1) documenta finestre e strumenti grafici.

#immagine(path("/assets/images/figure/storia-del-design/smalltalk-80-interfaccia-finestre-1980.jpg"),
  [Smalltalk-80: finestre e strumenti grafici, circa 1980. PARC Library, Computer History Museum.],
  diritti: [© PARC (Palo Alto Research Center, Incorporated).],
  alt: "Smalltalk-80: finestre e strumenti grafici, circa 1980. PARC Library, Computer History Museum.") <fig-storia-36-1>

=== Il paradigma WIMP

Il *paradigma WIMP* riunisce Windows, Icons, Menus e Pointer: finestre, icone, menu e puntatore. Questi elementi organizzano un linguaggio di interazione riconoscibile. Le metafore di scrivania, cartella e cestino offrono punti di riferimento, ma richiedono *apprendimento* e familiarità.

L’azione può essere collegata a un oggetto visibile e il risultato mostrato sullo schermo. Questo rapporto fra comando e *feedback* resta importante anche nelle interfacce touch, dove cambiano i gesti e le dimensioni dei controlli.

La @fig-storia-37-1 riunisce finestre, icone, menu e puntatore.

#immagine(path("/assets/images/figure/storia-del-design/paradigma-wimp-finestre-icone-menu-puntatore.png"),
  [Paradigma WIMP: finestre, icone, menu e puntatore.],
  alt: "Paradigma WIMP: finestre, icone, menu e puntatore.",
  placement: bottom, scope: "parent") <fig-storia-37-1>

=== Un linguaggio di pochi pixel

Le icone del Macintosh mostrano come i limiti tecnici possano diventare materia del progetto. *_Susan Kare_* lavorava anche su carta quadrettata: ogni quadrato corrispondeva a un *pixel*. Nelle icone del sistema, le forbici suggerivano il taglio del testo e il cestino la cancellazione dei file. La figura non decorava soltanto lo schermo: traduceva un’*azione* in un segno riconoscibile. _Kare_ contribuì anche al progetto di MacPaint; _Bill Atkinson_ racconta che osservarla usare il programma gli suggeriva modifiche e nuove funzioni. Il *linguaggio visivo* e il comportamento dell’interfaccia crescevano quindi insieme, attraverso il confronto con un’utilizzatrice reale @atkinsonHertzfeld2010-macpaint.#sito([Bill Atkinson e Andy Hertzfeld, intervista su MacPaint, registrata il 6 maggio 2010; passaggio su Susan Kare a p. 9 della trascrizione © CHM 2015.], "https://archive.computerhistory.org/resources/access/text/2015/12/102743021-05-01-acc.pdf")

Lo schizzo a quadretti (@fig-storia-38-1) mostra il rapporto fra disegno e pixel.

Fonte della @fig-storia-38-1.#sito([Susan Kare, Graphic icon sketch, 1982–1983. Matita e inchiostro su carta quadrettata. MoMA e SFMOMA, dono della designer.], "https://www.moma.org/collection/works/188386")

#immagine(path("/assets/images/figure/storia-del-design/susan-kare-graphic-icon-sketch-1982-1983.jpg"),
  [_Susan Kare_, Graphic icon sketch, 1982–1983. Matita e inchiostro su carta quadrettata. MoMA e SFMOMA, dono della designer.],
  diritti: [© Susan Kare.],
  alt: "Susan Kare, Graphic icon sketch, 1982–1983. Matita e inchiostro su carta quadrettata. MoMA e SFMOMA, dono della designer.",
  placement: top, scope: "parent") <fig-storia-38-1>

// Atlante: le schermate autentiche sono distinte dalle undici demo fittizie.

*Atlante degli stili.* I nomi rimandano alle fonti online. Le gallerie mostrano schermate autentiche di siti, applicazioni e demo; le immagini Caffè TTC sono esercizi visivi.

I siti documentari sono stati acquisiti o reperiti il 6 ottobre 2026; le schermate di Caffè TTC il 21 ottobre 2026. I siti storici conservati e i temi dimostrativi sono identificati nelle didascalie.

Caffè TTC è un bar immaginario. Le undici varianti condividono i dati del bar e ne cambiano il linguaggio visivo e la composizione. Le schermate documentano l’esempio web interattivo; non rappresentano undici attività reali.

// Tavole 39–40 · Il primo web

=== Il primo web

Nei primi anni del web, le pagine sono costruite soprattutto con *HTML* e offrono un controllo limitato sull’aspetto grafico. Testi, link e immagini guidano la navigazione; con la diffusione dei *CSS* diventa possibile separare progressivamente contenuto e presentazione @w3c1996-css.#sito([W3C, annuncio della Recommendation CSS1, 17 dicembre 1996.], "https://www.w3.org/press-releases/1996/css1-rec/") La progettazione dell’esperienza utente si sviluppa insieme a questi strumenti.

Leggi la gerarchia prodotta da titoli, link e regole del browser: il contenuto precede l’apparato visivo. L’esempio della @fig-storia-39-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-40-1, @fig-storia-40-2, @fig-storia-40-3, @fig-storia-40-4.

#immagine(path("/assets/images/figure/storia-del-design/cern-primo-sito-mobile-cattura-2026.png"),
  [CERN · viewport stretto · archivio / tema storico#sito([CERN · viewport stretto], "https://info.cern.ch/hypertext/WWW/TheProject.html")],
  alt: "CERN · viewport stretto archivio / tema storico · info.cern.ch") <fig-storia-40-1>

#immagine(path("/assets/images/figure/storia-del-design/cern-primo-sito-desktop-cattura-2026.png"),
  [CERN · The World Wide Web project · archivio / tema storico#sito([CERN · The World Wide Web project], "https://info.cern.ch/hypertext/WWW/TheProject.html")],
  alt: "CERN · The World Wide Web project archivio / tema storico · info.cern.ch") <fig-storia-40-2>

#immagine(path("/assets/images/figure/storia-del-design/berkshire-hathaway-homepage-2026.png"),
  [Berkshire Hathaway · homepage · fonte ufficiale#sito([Berkshire Hathaway · homepage], "https://www.berkshirehathaway.com/")],
  alt: "Berkshire Hathaway · homepage fonte ufficiale · berkshirehathaway.com") <fig-storia-40-3>

#immagine(path("/assets/images/figure/storia-del-design/space-jam-sito-1996-cattura-2026.png"),
  [Warner Bros. · Space Jam, 1996 · archivio / tema storico#sito([Warner Bros. · Space Jam, 1996], "https://www.spacejam.com/1996/")],
  alt: "Warner Bros. · Space Jam, 1996 archivio / tema storico · spacejam.com") <fig-storia-40-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-primo-web-home.png"),
  [Caffè TTC · Il primo web. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Il primo web], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=html")],
  <fig-storia-39-1>,
  "Pagina iniziale di Caffè TTC · Il primo web: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 41–42 · Web 2.0

=== Web 2.0

Negli anni Duemila, blog, social network e piattaforme di condivisione cambiano il ruolo degli utenti: da semplici lettori diventano *protagonisti*, in grado di produrre e diffondere contenuti. Molte interfacce adottano uno stile riconoscibile, fatto di *gradienti*, ombre, pulsanti lucidi e angoli arrotondati.

Queste scelte visive non definiscono il web 2.0. Un modello di partecipazione e uno stile grafico sono due cose distinte: la possibilità di pubblicare, commentare o collaborare riguarda il *funzionamento* del servizio, non il suo aspetto. Una piattaforma può essere pienamente partecipativa anche con un’interfaccia essenziale, così come un sito dall’aspetto «lucido» può non offrire alcuna forma di interazione.

Il repertorio lucido non definisce il Web 2.0: partecipazione e aspetto dell’interfaccia sono dimensioni diverse. L’esempio della @fig-storia-41-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-42-1, @fig-storia-42-2, @fig-storia-42-3, @fig-storia-42-4.

#immagine(path("/assets/images/figure/storia-del-design/jquery-mobile-tema-classic-2026.png"),
  [OpenJS · jQuery Mobile Classic · archivio / tema storico#sito([OpenJS · jQuery Mobile Classic], "https://demos.jquerymobile.com/1.4.5/theme-classic/")],
  alt: "OpenJS · jQuery Mobile Classic archivio / tema storico · demos.jquerymobile.com") <fig-storia-42-1>

#immagine(path("/assets/images/figure/storia-del-design/jquery-ui-themeroller-2026.png"),
  [OpenJS · jQuery UI ThemeRoller · screenshot#sito([OpenJS · jQuery UI ThemeRoller], "https://jqueryui.com/themeroller/")],
  alt: "OpenJS · jQuery UI ThemeRoller screenshot · jqueryui.com") <fig-storia-42-2>

#immagine(path("/assets/images/figure/storia-del-design/wordpress-tema-default-kubrick-2026.png"),
  [WordPress · Default / Kubrick · archivio / tema storico#sito([WordPress · Default / Kubrick], "https://wordpress.org/themes/default/")],
  alt: "WordPress · Default / Kubrick archivio / tema storico · wordpress.org") <fig-storia-42-3>

#immagine(path("/assets/images/figure/storia-del-design/jquery-mobile-versione-1-3-2-cattura-2026.png"),
  [OpenJS · jQuery Mobile 1.3.2 · archivio / tema storico#sito([OpenJS · jQuery Mobile 1.3.2], "https://demos.jquerymobile.com/1.3.2/")],
  alt: "OpenJS · jQuery Mobile 1.3.2 archivio / tema storico · demos.jquerymobile.com") <fig-storia-42-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-web-2-0-home.png"),
  [Caffè TTC · Web 2.0. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Web 2.0], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=web2")],
  <fig-storia-41-1>,
  "Pagina iniziale di Caffè TTC · Web 2.0: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 43–44 · Scheumorfismo

=== Scheumorfismo

Lo scheumorfismo, dal greco skeûos («contenitore» o «utensile») e morphḗ («forma»), trasferisce nel digitale forme riconoscibili del mondo fisico: una cartella, un cestino o le pagine di un taccuino. Può aiutare a intuire una *funzione* attraverso una metafora già nota. Quando diventa *realismo decorativo*, usa texture, rilievi e ombre per imitare materiali. La familiarità dipende però dall’esperienza della persona: una metafora poco conosciuta può risultare inefficace @chan2024-scheumorfismo.#sito([Megan Chan, Skeuomorphism, Nielsen Norman Group, 15 marzo 2024.], "https://www.nngroup.com/articles/skeuomorphism/")

La metafora fisica offre indizi soltanto a chi la conosce. Texture e rilievi devono sostenere il compito. L’esempio della @fig-storia-43-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-44-1, @fig-storia-44-2, @fig-storia-44-3, @fig-storia-44-4.

#immagine(path("/assets/images/figure/storia-del-design/webamp-lettore-musicale-2026.png"),
  [_Jordan Eldredge_ · Webamp · sito attuale#sito([Jordan Eldredge · Webamp], "https://webamp.org/")],
  alt: "Jordan Eldredge · Webamp sito attuale · webamp.org") <fig-storia-44-1>

#immagine(path("/assets/images/figure/storia-del-design/garageband-smart-guitar-2026.png"),
  [Apple · GarageBand Smart Guitar · fonte ufficiale#sito([Apple · GarageBand Smart Guitar], "https://www.apple.com/ios/garageband/")],
  alt: "Apple · GarageBand Smart Guitar fonte ufficiale · apple.com") <fig-storia-44-2>

#immagine(path("/assets/images/figure/storia-del-design/garageband-amplificatori-pedali-2026.png"),
  [Apple · GarageBand, amplificatori e pedali · fonte ufficiale#sito([Apple · GarageBand, amplificatori e pedali], "https://www.apple.com/mac/garageband/")],
  alt: "Apple · GarageBand, amplificatori e pedali fonte ufficiale · apple.com") <fig-storia-44-3>

#immagine(path("/assets/images/figure/storia-del-design/reason-rack-virtuale-2026.png"),
  [Reason Studios · rack virtuale · fonte ufficiale#sito([Reason Studios · rack virtuale], "https://www.reasonstudios.com/")],
  alt: "Reason Studios · rack virtuale fonte ufficiale · reasonstudios.com") <fig-storia-44-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-scheumorfismo-home.png"),
  [Caffè TTC · Scheumorfismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Scheumorfismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=scheu")],
  <fig-storia-43-1>,
  "Pagina iniziale di Caffè TTC · Scheumorfismo: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 45–46 · Flat design

=== Flat design

Il flat design nasce da una scelta di sottrazione: abbandona texture e simulazioni di materiali e punta su forme *bidimensionali*, campiture piene e una tipografia chiara. Si diffonde nelle interfacce degli anni Dieci, ma sarebbe un errore pensare che un’interfaccia graficamente semplice sia anche semplice da usare. Pulsanti e link, infatti, devono continuare a mostrare in *modo visibile* quale sia la loro funzione. Bastano accorgimenti discreti, come un’ombra misurata o una sottolineatura, per far capire all’utente che cosa è cliccabile, senza rinunciare all’essenzialità della composizione @moran2017-flat.#sito([Kate Moran, Flat-Design Best Practices, Nielsen Norman Group, 12 marzo 2017.], "https://www.nngroup.com/articles/flat-design-best-practices/")

Ridurre i materiali simulati non elimina il bisogno di indizi: azioni e stati devono restare riconoscibili. L’esempio della @fig-storia-45-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-46-1, @fig-storia-46-2, @fig-storia-46-3, @fig-storia-46-4.

#immagine(path("/assets/images/figure/storia-del-design/metro-ui-tiles-componenti-2026.png"),
  [_Serhii Pimenov_ · Metro UI Tiles · screenshot#sito([Serhii Pimenov · Metro UI Tiles], "https://v4.metroui.org.ua/tiles.html")],
  alt: "Serhii Pimenov · Metro UI Tiles screenshot · v4.metroui.org.ua") <fig-storia-46-1>

#immagine(path("/assets/images/figure/storia-del-design/gov-uk-homepage-2026.png"),
  [Government Digital Service · GOV.UK · fonte ufficiale#sito([Government Digital Service · GOV.UK], "https://www.gov.uk/")],
  alt: "Government Digital Service · GOV.UK fonte ufficiale · gov.uk") <fig-storia-46-2>

#immagine(path("/assets/images/figure/storia-del-design/designmodo-flat-ui-accesso-2026.png"),
  [Designmodo · Flat UI, modulo di accesso · screenshot#sito([Designmodo · Flat UI, modulo di accesso], "https://designmodo.github.io/Flat-UI/")],
  alt: "Designmodo · Flat UI, modulo di accesso screenshot · designmodo.github.io") <fig-storia-46-3>

#immagine(path("/assets/images/figure/storia-del-design/designmodo-flat-ui-componenti-2026.png"),
  [Designmodo · Flat UI · screenshot#sito([Designmodo · Flat UI], "https://designmodo.github.io/Flat-UI/")],
  alt: "Designmodo · Flat UI screenshot · designmodo.github.io") <fig-storia-46-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-flat-design-home.png"),
  [Caffè TTC · Flat design. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Flat design], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=flat")],
  <fig-storia-45-1>,
  "Pagina iniziale di Caffè TTC · Flat design: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 47–48 · Material Design

=== Material Design

Presentato da Google nel 2014, *Material Design* organizza l’interfaccia come un sistema di superfici, livelli e movimenti. La carta è una metafora di partenza: ombre e sovrapposizioni indicano relazioni e possibilità d’azione. Il *movimento* spiega i passaggi tra stati. Componenti, tipografia e regole condivise mirano a rendere *coerenti* le esperienze su dispositivi diversi @jitkoff2014-material.#sito([Nicholas Jitkoff, annuncio di Material Design, Google Developers Blog, 25 giugno 2014.], "https://developers.googleblog.com/en/this-is-material-design/")

Superfici, gerarchie e transizioni appartengono a un sistema: la coerenza va verificata nell’uso. L’esempio della @fig-storia-47-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-48-1, @fig-storia-48-2, @fig-storia-48-3, @fig-storia-48-4.

#immagine(path("/assets/images/figure/storia-del-design/google-material-design-3-mobile-2026.png"),
  [Google · Material Design 3 mobile · fonte ufficiale#sito([Google · Material Design 3 mobile], "https://m3.material.io/")],
  alt: "Google · Material Design 3 mobile fonte ufficiale · m3.material.io") <fig-storia-48-1>

#immagine(path("/assets/images/figure/storia-del-design/creative-tim-material-dashboard-3-2026.png"),
  [Creative Tim · Material Dashboard 3 · screenshot#sito([Creative Tim · Material Dashboard 3], "https://demos.creative-tim.com/material-dashboard-free/pages/dashboard")],
  alt: "Creative Tim · Material Dashboard 3 screenshot · demos.creative-tim.com") <fig-storia-48-2>

#immagine(path("/assets/images/figure/storia-del-design/google-material-design-3-desktop-2026.png"),
  [Google · Material Design 3 · fonte ufficiale#sito([Google · Material Design 3], "https://m3.material.io/")],
  alt: "Google · Material Design 3 fonte ufficiale · m3.material.io") <fig-storia-48-3>

#immagine(path("/assets/images/figure/storia-del-design/materialize-homepage-2026.png"),
  [Materialize · homepage · screenshot#sito([Materialize · homepage], "https://materializecss.com/")],
  alt: "Materialize · homepage screenshot · materializecss.com") <fig-storia-48-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-material-design-home.png"),
  [Caffè TTC · Material Design. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Material Design], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=material")],
  <fig-storia-47-1>,
  "Pagina iniziale di Caffè TTC · Material Design: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 49–50 · Neumorfismo
