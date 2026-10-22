#import "../../template/stile.typ": sito, immagine, schermata


=== Neumorfismo

Il neumorfismo usa luci e *ombre* morbide per far apparire gli elementi come rilievi dello stesso materiale dello sfondo. La continuità cromatica produce un effetto delicato, quasi plastico. Proprio questa continuità può però indebolire il *contrasto* e nascondere lo stato dei controlli. L’effetto decorativo deve poter scomparire senza rendere ambiguo il comando: testo, icona, bordo e stato selezionato restano leggibili @malewicz-neumorfismo.#sito([Michał Malewicz, Neumorphism in user interfaces: rilievi, contrasto e stati dei controlli.], "https://hype4.academy/articles/design/neumorphism-in-user-interfaces")

Il rilievo può perdere leggibilità. Testo, bordi e stati attivi richiedono un contrasto indipendente dalle ombre. L’esempio della @fig-storia-49-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-50-1, @fig-storia-50-2, @fig-storia-50-3, @fig-storia-50-4.

#immagine(path("/assets/images/figure/storia-del-design/neumorphism-io-generatore-mobile-2026.png"),
  [_Adam Giebl_ · Neumorphism.io mobile · fonte ufficiale#sito([Adam Giebl · Neumorphism.io mobile], "https://neumorphism.io/")],
  alt: "Adam Giebl · Neumorphism.io mobile fonte ufficiale · neumorphism.io") <fig-storia-50-1>

#immagine(path("/assets/images/figure/storia-del-design/akaspanion-ui-neumorphism-componenti-2026.png"),
  [AKAspanion · UI Neumorphism · screenshot#sito([AKAspanion · UI Neumorphism], "https://akaspanion.github.io/ui-neumorphism/")],
  alt: "AKAspanion · UI Neumorphism screenshot · akaspanion.github.io") <fig-storia-50-2>

#immagine(path("/assets/images/figure/storia-del-design/themesberg-neumorphism-ui-about-2026.png"),
  [Themesberg · Neumorphism UI About · screenshot#sito([Themesberg · Neumorphism UI About], "https://demo.themesberg.com/neumorphism-ui/html/pages/about.html")],
  alt: "Themesberg · Neumorphism UI About screenshot · demo.themesberg.com") <fig-storia-50-3>

#immagine(path("/assets/images/figure/storia-del-design/neumorphism-io-generatore-desktop-2026.png"),
  [_Adam Giebl_ · Neumorphism.io · fonte ufficiale#sito([Adam Giebl · Neumorphism.io], "https://neumorphism.io/")],
  alt: "Adam Giebl · Neumorphism.io fonte ufficiale · neumorphism.io") <fig-storia-50-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-neumorfismo-home.png"),
  [Caffè TTC · Neumorfismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Neumorfismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=neumo")],
  <fig-storia-49-1>,
  "Pagina iniziale di Caffè TTC · Neumorfismo: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 51–52 · Glassmorfismo

=== Glassmorfismo

Il glassmorfismo suggerisce superfici di vetro attraverso traslucenza, sfocatura e sovrapposizioni. Il fondo resta percepibile mentre il pannello occupa un livello distinto. Nei sistemi ufficiali questi effetti hanno ruoli specifici: Fluent usa Acrylic per superfici transitorie, come menu e popover @microsoft-materiali.#sito([Microsoft Learn, Acrylic material.], "https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic")#super[, ]#sito([Microsoft, Fluent 2: Material.], "https://fluent2.microsoft.design/material") La trasparenza va verificata su fondi diversi; un pannello elegante può perdere *leggibilità* quando cambiano immagini, luminosità e colori sottostanti.

Il fondo influenza la lettura del pannello. Trasparenza e sfocatura devono adattarsi al contenuto sottostante. L’esempio della @fig-storia-51-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-52-1, @fig-storia-52-2, @fig-storia-52-3, @fig-storia-52-4.

#immagine(path("/assets/images/figure/storia-del-design/apple-music-finestra-verticale-2026.png"),
  [Apple Music · finestra verticale · sito attuale#sito([Apple Music · finestra verticale], "https://music.apple.com/us/new")],
  alt: "Apple Music · finestra verticale sito attuale · music.apple.com") <fig-storia-52-1>

#immagine(path("/assets/images/figure/storia-del-design/windows-11-pannello-widgets-2021.png"),
  [Windows 11 · Widgets, 2021 · fonte ufficiale#sito([Windows 11 · Widgets, 2021], "https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/")],
  alt: "Windows 11 · Widgets, 2021 fonte ufficiale · blogs.windows.com") <fig-storia-52-2>

#immagine(path("/assets/images/figure/storia-del-design/windows-11-menu-start-2021.png"),
  [Windows 11 · Start · fonte ufficiale#sito([Windows 11 · Start], "https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/")],
  alt: "Windows 11 · Start fonte ufficiale · blogs.windows.com") <fig-storia-52-3>

#immagine(path("/assets/images/figure/storia-del-design/visionos-app-store-2026.png"),
  [visionOS · App Store · fonte ufficiale#sito([visionOS · App Store], "https://www.apple.com/apple-vision-pro/")],
  alt: "visionOS · App Store fonte ufficiale · apple.com") <fig-storia-52-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-glassmorfismo-home.png"),
  [Caffè TTC · Glassmorfismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Glassmorfismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=glass")],
  <fig-storia-51-1>,
  "Pagina iniziale di Caffè TTC · Glassmorfismo: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 53–54 · Minimalismo

=== Minimalismo

Il minimalismo riduce gli elementi che non sostengono il contenuto o il compito. Spazio negativo, palette contenuta e gerarchie tipografiche guidano l’attenzione. Riduzione non significa assenza di struttura: se spariscono etichette, navigazione o indizi d’interazione, la pagina può diventare più difficile da usare. La qualità del risultato si valuta attraverso ciò che consente di leggere e fare, oltre che attraverso ciò che elimina @moran2015-minimalismo.#sito([Kate Moran, The Characteristics of Minimalism in Web Design, Nielsen Norman Group, 12 luglio 2015.], "https://www.nngroup.com/articles/characteristics-minimalism/")

Lo spazio negativo è una scelta: togliere elementi non significa togliere orientamento e feedback. L’esempio della @fig-storia-53-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-54-1, @fig-storia-54-2, @fig-storia-54-3, @fig-storia-54-4.

#immagine(path("/assets/images/figure/storia-del-design/studio-yoke-homepage-mobile-2026.png"),
  [Studio Yoke · mobile · sito attuale#sito([Studio Yoke · mobile], "https://www.studioyoke.co.uk/")],
  alt: "Studio Yoke · mobile sito attuale · studioyoke.co.uk") <fig-storia-54-1>

#immagine(path("/assets/images/figure/storia-del-design/kinfolk-homepage-2026.png"),
  [Kinfolk · homepage · sito attuale#sito([Kinfolk · homepage], "https://www.kinfolk.com/")],
  alt: "Kinfolk · homepage sito attuale · kinfolk.com") <fig-storia-54-2>

#immagine(path("/assets/images/figure/storia-del-design/apple-homepage-2026.png"),
  [Apple · homepage · sito attuale#sito([Apple · homepage], "https://www.apple.com/")],
  alt: "Apple · homepage sito attuale · apple.com") <fig-storia-54-3>

#immagine(path("/assets/images/figure/storia-del-design/studio-yoke-homepage-desktop-2026.png"),
  [Studio Yoke · desktop · sito attuale#sito([Studio Yoke · desktop], "https://www.studioyoke.co.uk/")],
  alt: "Studio Yoke · desktop sito attuale · studioyoke.co.uk") <fig-storia-54-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-minimalismo-home.png"),
  [Caffè TTC · Minimalismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Minimalismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=minimal")],
  <fig-storia-53-1>,
  "Pagina iniziale di Caffè TTC · Minimalismo: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 55–56 · Y2K

=== Y2K

Con *Y2K* si indica una famiglia di richiami alla cultura visiva intorno al passaggio di millennio: cromature, bagliori, gradienti, pixel e finestre. Le reinterpretazioni contemporanee selezionano alcuni di questi caratteri senza riprodurre necessariamente una pagina storica. Per Spotify Wrapped 2023, il gruppo di design dichiarò un riferimento alle espressioni del primo internet, tradotte in un sistema attuale di layout stratificati e dinamici @spotify2023-wrapped.#sito([Spotify Newsroom, intervista a Louisa Ferguson sul progetto di Wrapped 2023, 29 novembre 2023.], "https://newsroom.spotify.com/2023-11-29/wrapped-design-marketing-brand-creative-inside-spotify/")

Cromature e futurismo pop convivono con richiami al primo internet: sono repertori da rileggere, non date obbligate. L’esempio della @fig-storia-55-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-56-1, @fig-storia-56-2, @fig-storia-56-3, @fig-storia-56-4.

#immagine(path("/assets/images/figure/storia-del-design/bratz-homepage-mobile-2026.png"),
  [Bratz · mobile · sito attuale#sito([Bratz · mobile], "https://www.bratz.com/")],
  alt: "Bratz · mobile sito attuale · bratz.com") <fig-storia-56-1>

#immagine(path("/assets/images/figure/storia-del-design/girls-who-code-girls-campagna-2022.png"),
  [Girls Who Code Girls · campagna 2022 · archivio / tema storico#sito([Girls Who Code Girls · campagna 2022], "https://www.girlswhocodegirls.com/")],
  alt: "Girls Who Code Girls · campagna 2022 archivio / tema storico · girlswhocodegirls.com") <fig-storia-56-2>

#immagine(path("/assets/images/figure/storia-del-design/camerons-world-collage-2026.png"),
  [Cameron’s World · collage · sito attuale#sito([Cameron’s World · collage], "https://www.cameronsworld.net/")],
  alt: "Cameron’s World · collage sito attuale · cameronsworld.net") <fig-storia-56-3>

#immagine(path("/assets/images/figure/storia-del-design/bratz-homepage-desktop-2026.png"),
  [Bratz · desktop · sito attuale#sito([Bratz · desktop], "https://www.bratz.com/")],
  alt: "Bratz · desktop sito attuale · bratz.com") <fig-storia-56-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-y2k-home.png"),
  [Caffè TTC · Y2K. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Y2K], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=y2k")],
  <fig-storia-55-1>,
  "Pagina iniziale di Caffè TTC · Y2K: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 57–58 · Massimalismo

=== Massimalismo

Il massimalismo combina densità visiva, colori, motivi, immagini e caratteri differenti. Per trasformare questa ricchezza in un sistema leggibile, il progetto rende riconoscibili *gerarchie* e percorsi di lettura.

La quantità di elementi diventa una scelta espressiva, da mettere in relazione con contenuto, pubblico e compito. Anche una composizione ricca richiede pause e punti di riferimento: il lettore deve distinguere il messaggio principale dalle informazioni secondarie.

Coordinare la densità è parte del progetto. Arngren, catalogo online norvegese di elettronica, gadget e veicoli, mostra un caso limite di accumulazione, non un modello di usabilità. L’esempio della @fig-storia-57-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-58-1, @fig-storia-58-2, @fig-storia-58-3, @fig-storia-58-4.

#immagine(path("/assets/images/figure/storia-del-design/toiletpaper-homepage-mobile-2026.png"),
  [TOILETPAPER · mobile · sito attuale#sito([TOILETPAPER · mobile], "https://www.toiletpapermagazine.org/")],
  alt: "TOILETPAPER · mobile sito attuale · toiletpapermagazine.org") <fig-storia-58-1>

#immagine(path("/assets/images/figure/storia-del-design/one-and-all-sito-2019.png"),
  [ONE&ALL · 2019 · archivio / tema storico#sito([ONE&ALL · 2019], "https://www.obergine.com/news-and-blog/2019/november-2019/maximalist-web-design")],
  alt: "ONE&ALL · 2019 archivio / tema storico · obergine.com") <fig-storia-58-2>

#immagine(path("/assets/images/figure/storia-del-design/arngren-catalogo-2026.png"),
  [Arngren · catalogo · sito attuale#sito([Arngren · catalogo], "https://www.arngren.net/")],
  alt: "Arngren · catalogo sito attuale · arngren.net") <fig-storia-58-3>

#immagine(path("/assets/images/figure/storia-del-design/toiletpaper-homepage-desktop-2026.png"),
  [TOILETPAPER · desktop · sito attuale#sito([TOILETPAPER · desktop], "https://www.toiletpapermagazine.org/")],
  alt: "TOILETPAPER · desktop sito attuale · toiletpapermagazine.org") <fig-storia-58-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-massimalismo-home.png"),
  [Caffè TTC · Massimalismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Massimalismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=max")],
  <fig-storia-57-1>,
  "Pagina iniziale di Caffè TTC · Massimalismo: navigazione, proposte del bar e informazioni pratiche.")

// Tavole 59–60 · Brutalismo e neobrutalismo

=== Brutalismo e neobrutalismo

Nel web, il brutalismo presenta spesso strutture esplicite, caratteri utilitari e un’apparenza poco rifinita. Il neobrutalismo ne rielabora la forza visiva con *bordi* spessi, *ombre* nette, grandi titoli e colori accesi. La homepage di Gumroad offre un esempio di questa seconda direzione @sheikh2025-neobrutalismo.#sito([Hayat Sheikh, Neobrutalism: Definition and Best Practices, Nielsen Norman Group, 11 aprile 2025.], "https://www.nngroup.com/articles/neobrutalism/") Un’identità marcata richiede comunque gerarchie, spazi e stati chiari: un contrasto cromatico vistoso non garantisce un contrasto sufficiente per leggere.

Nel neobrutalismo bordi e ombre diventano segni espliciti. Il contrasto espressivo non garantisce la leggibilità. L’esempio della @fig-storia-59-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-60-1, @fig-storia-60-2, @fig-storia-60-3, @fig-storia-60-4.

#immagine(path("/assets/images/figure/storia-del-design/gumroad-homepage-mobile-2026.png"),
  [Gumroad · mobile · sito attuale#sito([Gumroad · mobile], "https://gumroad.com/")],
  alt: "Gumroad · mobile sito attuale · gumroad.com") <fig-storia-60-1>

#immagine(path("/assets/images/figure/storia-del-design/neobrutalism-components-homepage-2026.png"),
  [Neobrutalism components · sito implementato · sito attuale#sito([Neobrutalism components · sito implementato], "https://www.neobrutalism.dev/")],
  alt: "Neobrutalism components · sito implementato sito attuale · neobrutalism.dev") <fig-storia-60-2>

#immagine(path("/assets/images/figure/storia-del-design/panda-css-homepage-2026.png"),
  [Panda CSS · homepage · sito attuale#sito([Panda CSS · homepage], "https://panda-css.com/")],
  alt: "Panda CSS · homepage sito attuale · panda-css.com") <fig-storia-60-3>

#immagine(path("/assets/images/figure/storia-del-design/gumroad-homepage-desktop-2026.png"),
  [Gumroad · desktop · sito attuale#sito([Gumroad · desktop], "https://gumroad.com/")],
  alt: "Gumroad · desktop sito attuale · gumroad.com") <fig-storia-60-4>

#schermata(path("/assets/images/figure/caffe-ttc/caffe-ttc-neobrutalismo-home.png"),
  [Caffè TTC · Brutalismo e neobrutalismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Brutalismo e neobrutalismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=neo")],
  <fig-storia-59-1>,
  "Pagina iniziale di Caffè TTC · Brutalismo e neobrutalismo: navigazione, proposte del bar e informazioni pratiche.")
