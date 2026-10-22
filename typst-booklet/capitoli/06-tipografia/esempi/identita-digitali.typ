// Identità digitali: campioni autentici e schermate documentate.
// Il corpo è prosa ordinaria; le quote descrivono soltanto ritagli delle immagini.
#import "../../../template/stile.typ": immagine, sito
#import "../../../template/editoriale.typ": nota-compatta, testo-diritti
#import "../../../template/campioni.typ": confronto, riga-campioni, dettaglio-figura
#import "../../../template/documenti.typ": dettaglio

=== I caratteri di sistema di Apple e Android

La storia tipografica dei sistemi Apple mostra il cambiamento dei vincoli. Nel Macintosh del 1984, Chicago, Geneva e Monaco di _Susan Kare_ nascono come *disegni bitmap*: ogni pixel contribuisce al riconoscimento, e un alfabeto proporzionale risponde a un compito diverso da uno monospazio. Nei successivi Mac OS X, Lucida Grande dei disegnatori di caratteri _Charles Bigelow_ e _Kris Holmes_ porta una voce umanistica, con minuscole ampie e controforme aperte.#nota-compatta([Susan Kare, testimonianza riportata da MyFonts; Bigelow e Holmes, confronto Lucida Grande–Helvetica Neue.], ("https://www.myfonts.com/es/collections/susan-kare", "https://lucidafonts.com/blogs/bigelow-holmes-blog/whats-the-difference-between-lucida-grande-and-helvetica-neue")) Nel 2014 Yosemite passa a Helvetica Neue; nel 2015 San Francisco diventa il carattere di sistema di OS X El Capitan. Non è una sequenza di caratteri progressivamente migliori in assoluto: cambiano risoluzioni, dimensioni degli schermi e necessità del prodotto. Il confronto deve seguire proporzioni, spazi e repertori di ciascuna versione, senza attribuire l’intera evoluzione a un solo episodio biografico del cofondatore di Apple _Steve Jobs_ @t06-apple2015.#nota-compatta([Apple, Yosemite, WWDC14, sessione 209, pp. 228–229; annuncio El Capitan (2015).], ("https://devstreaming-cdn.apple.com/videos/wwdc/2014/209xxbyg01mfqt8/209/209_adapting_your_app_to_the_new_ui_of_os_x_yosemite.pdf", "https://www.apple.com/newsroom/2015/06/08Apple-Announces-OS-X-El-Capitan-with-Refined-Experience-Improved-Performance/"))

// I vettoriali successivi restano distinti dal documento bitmap del Macintosh.
#confronto[
  #figure([
    #set text(hyphenate: false)
    #riga-campioni((
      (titolo: [Chicago · bitmap storico], visuale: dettaglio(path("/assets/images/figure/tipografia/storia/kare-chicago-documento-cornell-2016.png"),
        width: 48.6pt, height: 25.92pt, originale-width: 972pt, originale-height: 547.02pt,
        dx: -273.24pt, dy: -154.44pt, alt: "Chi, dettaglio del carattere bitmap Chicago nel documento Cornell Tech.")),
      (titolo: [Geneva · vettoriale], visuale: image(path("/assets/images/figure/tipografia/esempi/interfacce/geneva-aag-36.svg"), width: 71pt)),
      (titolo: [Monaco · vettoriale], visuale: image(path("/assets/images/figure/tipografia/esempi/interfacce/monaco-aag-36.svg"), width: 67pt)),
      (titolo: [Lucida Grande · vettoriale], visuale: image(path("/assets/images/figure/tipografia/esempi/interfacce/lucida-grande-aag-36.svg"), width: 70pt)),
    ))
    #v(8pt)
    #text(size: 10pt, weight: 500)[Helvetica Neue Regular · vettoriale]
    #v(4pt)
    #image(path("/assets/images/figure/tipografia/esempi/marchi/helvetica-neue-regular-aag.svg"), width: 66pt)
  ], kind: image, caption: [Chicago bitmap: dettaglio «Chi». Geneva, Monaco, Lucida Grande e Helvetica Neue sono versioni vettoriali successive, distinte dai bitmap del 1984.
    #v(4pt)#testo-diritti[Susan Kare / Apple; documento Cornell Tech, 2016. Glifi successivi: Apple; Bigelow & Holmes; Linotype.]
  ]) <fig-tipo-313a>
]

Nei sistemi digitali la tipografia deve affrontare parole brevi, numeri, messaggi lunghi e repertori linguistici differenti. Apple presenta San Francisco come una famiglia progettata per queste condizioni: le forme e la spaziatura si adattano alla *dimensione e al contesto d’uso*. Il progetto non si esaurisce nell’assenza di grazie. Riguarda il rapporto fra disegno, corpo, spazi e funzioni di composizione, compresi dettagli apparentemente minimi come il posizionamento dei due punti quando vengono visualizzati gli orari.

La documentazione distingue SF Pro, SF Compact, SF Mono e i relativi impieghi. SF Compact risponde alle esigenze di spazi ridotti; SF Mono usa larghezze uniformi; altre estensioni rispettano le strutture di sistemi di scrittura diversi. Nel campione ufficiale (@fig-tipo-313), il saluto «hello», ampio e pesante, si confronta con il «ciao» stretto; latino, cirillico, arabo ed ebraico estendono l’osservazione oltre un solo alfabeto @t06-apple-fonts.#nota-compatta([Apple Developer, Fonts: repertori e impieghi dei caratteri di sistema.], ("https://developer.apple.com/fonts/", "https://developer.apple.com/documentation/technologyoverviews/fonts"))

#confronto[
  #figure([
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#image(path("/assets/images/figure/tipografia/esempi/interfacce/apple-san-francisco-campione-ufficiale.png"), width: 187.09pt,
        alt: "Campione ufficiale Apple con saluti in latino, cirillico, arabo ed ebraico.")],
      [
        #set par(justify: false, spacing: 4pt)
        #set text(size: 10pt, weight: 500)
        SF Pro · dettaglio
        #v(4pt)
        #dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/apple-san-francisco-pro-compact-mono-wwdc22.png"),
          width: 37.346pt, height: 20.371pt, originale-width: 407.415pt, originale-height: 229.171pt,
          dx: -76.81pt, dy: -47.96pt, alt: "Dettaglio SF Pro dal campione Apple WWDC22.")
        #v(6pt)
        SF Compact · dettaglio
        #v(4pt)
        #dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/apple-san-francisco-pro-compact-mono-wwdc22.png"),
          width: 52.2pt, height: 20.795pt, originale-width: 407.415pt, originale-height: 229.171pt,
          dx: -76.39pt, dy: -102.7pt, alt: "Dettaglio SF Compact dal campione Apple WWDC22.")
        #v(6pt)
        SF Mono · dettaglio
        #v(4pt)
        #dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/apple-san-francisco-pro-compact-mono-wwdc22.png"),
          width: 45.834pt, height: 21.22pt, originale-width: 407.415pt, originale-height: 229.171pt,
          dx: -76.39pt, dy: -158.3pt, alt: "Dettaglio SF Mono dal campione Apple WWDC22.")
      ],
    )
  ], kind: image, caption: [San Francisco: campione ufficiale Apple. SF Pro, SF Compact e SF Mono: dettagli dalla presentazione WWDC22, sessione110381, 1:36.
    #v(4pt)#testo-diritti[Apple.]
  ]) <fig-tipo-313>
]

Anche Roboto mostra un carattere progettato come risorsa per un ambiente digitale. Il designer di Google _Christian Robertson_ ne documenta la revisione insieme al sistema Material: il disegno fu raffinato per sostenere una gamma di dispositivi e usi. Nei campioni possiamo guardare le minuscole, i numeri e le differenze fra pesi, osservando come i dettagli conservino una presenza coerente quando aumenta la densità del testo. La famiglia e le sue versioni vanno identificate con precisione, senza assumere che ogni carattere denominato Roboto abbia lo stesso repertorio o gli stessi assi @t06-robertson2014.#sito([Christian Robertson, The New Roboto, 2014.], "https://developers.googleblog.com/en/the-new-roboto/")

#figure([
  #text(size: 10pt, weight: 500)[Roboto Regular · Aag, corpo 36]
  #v(4pt)
  #image(path("/assets/images/figure/tipografia/esempi/interfacce/roboto-regular-aag-36.svg"), width: 66pt)
], kind: image, caption: [Roboto Regular: contorni autentici della versione digitale del campione. La famiglia va distinta dalle successive estensioni e revisioni.
  #v(4pt)#testo-diritti[Christian Robertson / Google.]
]) <fig-tipo-roboto-sistema>

Questi casi chiariscono una differenza fra *identità e prestazione*. Una famiglia propria può offrire continuità, ma la leggibilità non nasce automaticamente dal possesso del font. Occorre verificare *parole reali, cifre, accenti*, misure e condizioni dello schermo. La storia dei caratteri bitmap del Macintosh rende evidente lo stesso principio in un altro ambiente tecnico: ogni risoluzione pone vincoli specifici. Il passaggio ai contorni scalabili ha ampliato le possibilità, ma non ha eliminato il lavoro sul disegno delle lettere. I campioni delle @fig-tipo-313a e @fig-tipo-roboto-sistema permettono di confrontare questi disegni.

=== Cereal, Reith e Netflix Sans

Airbnb Cereal, BBC Reith e Netflix Sans permettono di osservare tre famiglie sviluppate per usi estesi di una marca. Il problema è diverso da quello di un nome disegnato una sola volta. I caratteri devono comporre *contenuti imprevedibili* e conservare una voce attraverso pesi, dimensioni e lingue. Le pagine dei progettisti sono particolarmente utili perché mostrano il repertorio e le prove, oltre all’applicazione finale.

Airbnb presenta Cereal come una famiglia realizzata con Dalton Maag e introdotta nel 2018. Il riferimento al carattere aziendale non implica che ogni elemento dell’interfaccia sia immutabile: un sistema vive attraverso versioni e aggiornamenti. Per leggere il progetto conviene confrontare la rotondità delle lettere, le aperture e il rapporto fra pesi. Sono scelte che devono restare riconoscibili sia in un titolo sia in una sequenza di informazioni brevi, dove cifre e segni di punteggiatura hanno un ruolo frequente @t06-cereal2018.#sito([Karri Saarinen, Working Type, Airbnb Design, 2018.], "https://medium.com/airbnb-design/working-type-81294544608b")

// I ritagli originali occupano una colonna, come richiesto nel commento313.
// Tutte le quote del ritaglio crescono dello stesso fattore: nessuna deformazione.
#figure([
  #text(size: 10pt, weight: 500)[Airbnb Cereal · dettaglio «ab»]
  #v(4pt)
  #dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/airbnb-cereal-specimen-originale.svg"),
    width: 187.09pt, height: 82.8541pt, originale-width: 1469.9929pt, originale-height: 721.8083pt,
    dx: -447.6796pt, dy: -189.0945pt, alt: "ab, dettaglio dello specimen originale Airbnb Cereal.")
], kind: image, caption: [Airbnb Cereal: minuscole dal campione originale.
  #v(4pt)#testo-diritti[Airbnb / Dalton Maag.]
]) <fig-tipo-cereal-dettaglio>

BBC Reith rende ancora più chiara l’ampiezza del compito. Dalton Maag documenta una suite con serif, sans, condensed e rounded, sviluppata attraverso prove e consultazioni. La presenza di arabo, cirillico e latino mostra che l’identità tipografica non consiste nella ripetizione di un unico alfabeto. I campioni e i fogli annotati permettono di seguire il lavoro sulle lettere, evitando di confondere l’obiettivo dichiarato di leggibilità con una superiorità universale già dimostrata (@fig-tipo-314a, @fig-tipo-314b, @fig-tipo-314c e @fig-tipo-314d) @t06-reith.#sito([Dalton Maag, BBC Reith.], "https://www.daltonmaag.com/portfolio/custom-fonts/bbc-reith.html")

#figure([
  #dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/bbc-sounds-schermata-documentata.jpg"),
    width: 187.09pt, height: 290pt, originale-width: 187.09pt, originale-height: 405.07pt,
    dx: 0pt, dy: 0pt, alt: "Parte superiore della schermata documentata BBC Sounds.")
], kind: image, caption: [Dettaglio superiore dell’app BBC Sounds: titoli in grassetto e descrizioni regolari.
  #v(4pt)#testo-diritti[BBC Reith; Dalton Maag per BBC.]
]) <fig-tipo-314a>

#immagine(path("/assets/images/figure/tipografia/esempi/interfacce/bbc-reith-prove-correzioni-a-mano.jpg"),
  [BBC Reith: prove con correzioni a mano.], diritti: [Dalton Maag per BBC.],
  alt: "BBC Reith: prove con correzioni a mano.",
  
) <fig-tipo-314b>

// Fondo nero e tracciati bianchi sono entrambi parti del documento originale.
#figure([
  #box(width: 187.09pt, height: 51.267pt, clip: true)[
    #image(path("/assets/images/figure/tipografia/esempi/interfacce/bbc-reith-serif-sans-fondo.svg"), width: 187.09pt)
    #place(top + left, dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/bbc-reith-serif-sans-maschera.svg"),
      width: 187.09pt, height: 51.267pt, originale-width: 212.886pt, originale-height: 53.9939pt,
      dx: -12.927pt, dy: -1.44pt, alt: "BBC Reith: campione serif e sans, tondi e corsivi."))
  ]
], kind: image, caption: [BBC Reith: serif e sans, tondi e corsivi.
  #v(4pt)#testo-diritti[Dalton Maag per BBC.]
]) <fig-tipo-314c>

#immagine(path("/assets/images/figure/tipografia/esempi/interfacce/bbc-reith-aperture-annotate.svg"),
  [BBC Reith: terminali e aperture annotati.], diritti: [Dalton Maag per BBC.],
  alt: "BBC Reith: terminali e aperture annotati.",
  
) <fig-tipo-314d>

Netflix Sans, sviluppato con Dalton Maag e documentato anche dal progettista _Noah Nathan_, aggiunge un altro esempio di famiglia proprietaria. La scelta di commissionare un carattere dipende da controllo della voce, copertura e gestione dell’uso; non autorizza a dedurre qualità dal solo fatto che il disegno sia esclusivo. Nei tre casi il criterio interessante è la continuità fra repertorio *e applicazioni*: quanto bene il sistema conserva differenze utili, regge parole nuove e distingue i segni nelle *dimensioni realmente necessarie* @t06-netflix.#sito([Noah Nathan, Netflix Sans.], "https://www.noahnathan.com/netflix-sans")

#figure([
  #text(size: 10pt, weight: 500)[Netflix Sans · dettaglio «Wat»]
  #v(4pt)
  #dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/netflix-sans-specimen-noah-nathan.png"),
    width: 187.09pt, height: 80.8889pt, originale-width: 687.8309pt, originale-height: 386.9056pt,
    dx: -189.8413pt, dy: -99.8875pt, alt: "Wat, dettaglio del campione originale Netflix Sans.")
], kind: image, caption: [Netflix Sans: particolare dello specimen di progetto.
  #v(4pt)#testo-diritti[Noah Nathan / Netflix; sviluppo Dalton Maag.]
]) <fig-tipo-netflix-dettaglio>

=== Duolingo e Calm: ruoli e tono del testo

Nel sistema Duolingo documentato dalle linee guida archiviate nel 2025, Feather Bold è destinato alle *titolazioni brevi* e fortemente riconoscibili; DIN Next Rounded sostiene i testi più lunghi. Il disegno personalizzato di Feather Bold, sviluppato a partire dalla forma della mascotte, rende visibile una relazione fra figura e alfabeto. Nel lettering annotato, l’ascendente della d richiama un’ala e il terminale della g un sopracciglio della mascotte; l’alfabeto estende questi gesti alle altre lettere (@fig-tipo-315a e @fig-tipo-315b) @t06-duolingo.#sito([Duolingo, Typography, linee guida archiviate il 31 marzo 2025.], "https://web.archive.org/web/20250331234946/https://design.duolingo.com/identity/typography")

#immagine(path("/assets/images/figure/tipografia/esempi/interfacce/duolingo-lettering-annotato.jpg"),
  [Duolingo: lettering del nome con annotazioni sui richiami alla mascotte.], diritti: [Johnson Banks, Beth Johnson e Fontsmith per Duolingo.],
  alt: "Duolingo: lettering del nome con annotazioni sui richiami alla mascotte.",
  
) <fig-tipo-315a>

#immagine(path("/assets/images/figure/tipografia/esempi/interfacce/duolingo-feather-bold-minuscole.jpg"),
  [Feather Bold: curve e terminali delle minuscole.], diritti: [Johnson Banks, Beth Johnson e Fontsmith per Duolingo.],
  alt: "Feather Bold: curve e terminali delle minuscole.",
  
) <fig-tipo-315b>

Il caso è utile proprio perché il carattere più distintivo non viene applicato indistintamente a tutto. Una frase lunga, un messaggio variabile e una titolazione breve pongono richieste differenti. Le regole della marca assegnano *usi specifici* e un carattere sostitutivo quando le risorse proprietarie non sono disponibili. Si tratta di indicazioni locali: i valori numerici e le preferenze di cassa stabiliti per Duolingo non diventano regole generali della tipografia @t06-johnson-duolingo.#sito([Beth Johnson, Identity & Bespoke Typeface for Duolingo.], "https://bethjohnson.design/duolingo")

#confronto[
  #figure([
    #riga-campioni((
      (titolo: [Feather Bold · dettaglio a–f], visuale: dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/duolingo-feather-bold-minuscole.jpg"),
        width: 145.08pt, height: 30.68pt, originale-width: 486.434pt, originale-height: 295.752pt,
        dx: -79.3pt, dy: -47.84pt, alt: "Prime minuscole del campione autentico Feather Bold.")),
      (titolo: [DIN Next Rounded · dettaglio], visuale: dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/din-next-rounded-specimen-monotype.png"),
        width: 57.12pt, height: 27.84pt, originale-width: 384pt, originale-height: 192pt,
        dx: -21.12pt, dy: -22.08pt, alt: "DIN, dettaglio dello specimen ufficiale DIN Next Rounded.")),
    ))
  ], kind: image, caption: [Feather Bold e DIN Next Rounded: dettagli originali. Il campione DIN è uno specimen della famiglia, non un’applicazione Duolingo.
    #v(4pt)#testo-diritti[Johnson Banks, Beth Johnson, Fontsmith; Monotype.]
  ]) <fig-tipo-duolingo-caratteri>
]

Calm offre un confronto da condurre con maggiore cautela. Il nome presenta una scrittura fluida, mentre i testi del servizio possono adottare caratteri diversi attraverso pagine, versioni e dispositivi. Non basta associare il prodotto alla meditazione per concludere che ogni testo sia composto in serif o che una famiglia rallenti fisiologicamente la lettura e riduca l’ansia. Possiamo invece osservare la forma del marchio, la regolarità dei testi e la quantità di spazio fra i segni, riferendoci a una versione documentata del prodotto. Il wordmark della @fig-tipo-315c documenta il nome del servizio.#sito([Calm, sito ufficiale, consultato il 20 ottobre 2026.], "https://www.calm.com/")

#immagine(path("/assets/images/figure/tipografia/esempi/interfacce/calm-wordmark-consultato-2026-10-20.png"),
  [Calm: wordmark dal sito ufficiale, consultato il 20 ottobre 2026. La data del disegno non è indicata.], diritti: [© Calm.],
  alt: "Calm: wordmark dal sito ufficiale, consultato il 20 ottobre 2026. La data del disegno non è indicata.",
  
) <fig-tipo-315c>

Il confronto chiarisce la *differenza fra intenzione e risultato*. Un progettista può cercare una voce giocosa o raccolta e scegliere forme coerenti con quell’ipotesi; per sapere come vengano interpretate deve però raccogliere riscontri. La descrizione «arrotondato» nomina una caratteristica visibile, mentre «rassicurante» descrive una possibile lettura. Tenere distinti questi due livelli permette di discutere il tono in modo preciso e di cambiare una scelta quando le risposte del pubblico non corrispondono alle attese.

=== La semplificazione dei logotipi

La semplificazione dei logotipi rende evidente quanto il carattere contribuisca alla *continuità di una marca*. Nel passaggio a forme più regolari possono scomparire dettagli storici, tratti calligrafici o contrasti marcati. Talvolta aumenta la facilità di riproduzione in piccole dimensioni; contemporaneamente può ridursi la distanza visiva da altri nomi. Nessuno di questi effetti è automatico: dipende dalle forme specifiche conservate, modificate o eliminate.

Google documenta la costruzione del proprio logotipo geometrico e della famiglia Product Sans nel progetto d’identità del 2015. La e inclinata è uno dei particolari mantenuti come tratto riconoscibile. Il confronto fra un nome e un alfabeto complementare mostra di nuovo che il *logotipo e il font* non sono la stessa cosa. La continuità può affidarsi a un dettaglio irregolare dentro un insieme apparentemente molto semplice, anziché a un’ornamentazione complessa (@fig-tipo-316) @t06-google2015.#sito([Google Design, Evolving the Google Identity, progetto2015.], "https://design.google/library/evolving-google-identity")

#immagine(path("/assets/images/figure/tipografia/esempi/interfacce/google-logotipo-identita-2015.png"),
  [Google: logotipo documentato nel progetto d’identità 2015. La e inclinata mantiene una differenza riconoscibile.], diritti: [Google Design.],
  alt: "Google: logotipo documentato nel progetto d’identità 2015. La e inclinata mantiene una differenza riconoscibile.",
  
) <fig-tipo-316>


#dettaglio-figura(titolo: [Product Sans · due forme della a], riferimento: <fig-tipo-316>,
  didascalia: [Il campione dell’alfabeto complementare mostra due forme in «Maps», distinte dal lettering del nome Google. © 2015 Google Inc.],
)[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/google-product-sans-due-a-maps.svg"),
      width: 80.3pt, height: 34.1pt, originale-width: 213.593pt, originale-height: 87.2604pt,
      dx: -127.6pt, dy: -5.5pt, alt: "Maps, prima forma della a in Product Sans."),
    dettaglio(path("/assets/images/figure/tipografia/esempi/interfacce/google-product-sans-due-a-maps.svg"),
      width: 80.3pt, height: 34.1pt, originale-width: 213.593pt, originale-height: 87.2604pt,
      dx: -127.6pt, dy: -47.85pt, alt: "Maps, seconda forma della a in Product Sans."),
  )
]

Burberry permette di evitare una lettura della storia come marcia irreversibile verso il sans serif. Dopo la fase di semplificazione, nel 2023 il marchio presentò un nuovo disegno ispirato all’archivio. Questa successione non dimostra che un serif sia migliore o peggiore: mostra che una strategia può recuperare particolari quando vuole rafforzare una diversa idea di continuità. Le date sono necessarie, perché un’immagine storica di un logo può essere scambiata facilmente per la versione attuale. Il disegno del 2023 è documentato dalla @fig-tipo-316a @t06-burberry2023.#sito([Burberry, nuova identità sotto la direzione di Daniel Lee, 6 febbraio 2023.], "https://www.burberryplc.com/news/brand/2023/introducing-the-first-creative-expression-of-burberry-under-dani")

#immagine(path("/assets/images/figure/tipografia/esempi/interfacce/burberry-wordmark-2023.svg"),
  [Burberry: wordmark dell’identità 2023, dalla copertina dell’Annual Report 2022/23. Dettaglio originale.], diritti: [© Burberry.],
  alt: "Burberry: wordmark dell’identità 2023, dalla copertina dell’Annual Report 2022/23. Dettaglio originale.",
  
) <fig-tipo-316a>

Il progetto richiede di decidere quali differenze debbano restare attive. Possiamo osservare il terminale di una r, il rapporto fra due lettere, una curva o la spaziatura del nome prima di giudicare l’insieme. Se il cambiamento elimina proprio il dettaglio che rendeva riconoscibile una parola, la pulizia formale può avere un costo. Se conserva un’anomalia efficace e corregge difetti di riproduzione, la riduzione può invece rendere più preciso il segno. Sono ipotesi da controllare sulla specifica applicazione, senza elevare una moda di settore a legge tipografica.
