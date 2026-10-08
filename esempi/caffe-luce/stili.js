/* CAFFÈ TTC · repertori storici e scenari dichiaratamente sperimentali.
 * I contenuti sono condivisi; struttura, interazione e immagini seguono lo stile.
 * [x, y, width, height] usa pixel sorgente, senza modificare i raster originali.
 */
(() => {
  const figmaFile = 'https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC';
  const figma = (node, label = 'Booklet · esempio e descrizione') => ({
    label,
    url: `${figmaFile}?node-id=${node.replace(':', '-')}`,
  });
  const historicalImage = (id, regions) => ({
    src: `assets/atlante/demo-${id}.webp`,
    width: 1448,
    height: 1086,
    regions,
  });
  // I concept futuri condividono quattro pannelli, nell’ordine hero/caffè/croissant/tè.
  // Gli originali PNG sono conservati; il sito carica le copie WebP ottimizzate.
  const futureImage = (id) => {
    const [width, height] = id === 'risorse' ? [960, 640] : [1536, 1024];
    const [w, h] = [width / 2, height / 2];
    return {
      src: `assets/futuri/${id}.webp`, width, height,
      regions: { hero: [0, 0, w, h], coffee: [w, 0, w, h], croissant: [0, h, w, h], tea: [w, h, w, h] },
    };
  };

  window.CAFFE_STYLES = [
    {
      id: 'html',
      label: 'Primo web',
      group: 'atlante',
      summary: 'Serif, link blu e regole del browser: il documento rende visibile la propria struttura.',
      detail: 'Interpretazione del web grafico degli anni Novanta: Times, link blu e controlli nativi. Il CERN originale è un documento testuale; le immagini retinate richiamano altri siti grafici dell’epoca, non una sua ricostruzione.',
      sources: [figma('198:2319'), { label: 'CERN · primo sito web', url: 'https://info.cern.ch/hypertext/WWW/TheProject.html' }],
      image: historicalImage('html', {
        hero: [646, 97, 782, 415],
        coffee: [107, 661, 300, 162],
        croissant: [544, 658, 350, 162],
        tea: [1027, 660, 335, 162],
      }),
    },
    {
      id: 'web2',
      label: 'Web 2.0',
      group: 'atlante',
      summary: 'Blu, gradienti lucidi e forme arrotondate richiamano un repertorio degli anni Duemila.',
      detail: 'Pulsanti a rilievo, superfici sfumate e immagini levigate. Il Web 2.0 riguarda anche pubblicazione e partecipazione: questi effetti illustrano soltanto una sua cultura visiva.',
      sources: [figma('198:2652'), { label: 'WordPress · Default / Kubrick', url: 'https://wordpress.org/themes/default/' }, { label: 'OpenJS · jQuery UI ThemeRoller', url: 'https://jqueryui.com/themeroller/' }],
      image: historicalImage('web2', {
        hero: [650, 79, 784, 402],
        coffee: [96, 630, 350, 150],
        croissant: [550, 629, 352, 150],
        tea: [998, 625, 360, 154],
      }),
    },
    {
      id: 'scheu',
      label: 'Scheumorfismo',
      group: 'atlante',
      summary: 'Carta, cuoio e rilievi rendono il menu un oggetto digitale dall’aspetto familiare.',
      detail: 'Metafore del mondo fisico, texture discrete e pulsanti tangibili. Le immagini riprendono incisioni su carta. La familiarità dipende dall’esperienza della persona, non dal solo realismo.',
      sources: [figma('198:2345'), { label: 'Apple · GarageBand', url: 'https://www.apple.com/mac/garageband/' }],
      image: historicalImage('scheu', {
        hero: [651, 85, 785, 413],
        coffee: [102, 650, 350, 149],
        croissant: [546, 648, 353, 151],
        tea: [1008, 647, 353, 151],
      }),
    },
    {
      id: 'flat',
      label: 'Flat design',
      group: 'atlante',
      summary: 'Campiture piene, geometria e tipografia riducono la simulazione dei materiali.',
      detail: 'La variante canonica usa avorio, blu scuro e terracotta, con illustrazioni bidimensionali. Diffuso negli anni Dieci, il flat richiede comunque indizi riconoscibili per azioni e stati.',
      sources: [figma('198:2675'), { label: 'Designmodo · Flat UI', url: 'https://designmodo.github.io/Flat-UI/' }],
      image: historicalImage('flat', {
        hero: [648, 71, 800, 415],
        coffee: [90, 625, 357, 160],
        croissant: [545, 625, 355, 160],
        tea: [1000, 622, 350, 163],
      }),
    },
    {
      id: 'material',
      label: 'Material · prima generazione',
      group: 'atlante',
      summary: 'Superfici di carta, elevazioni misurate e componenti formano un sistema coerente.',
      detail: 'Riprende la prima generazione di Material: app bar opaca, carta quasi neutra, raggi piccoli, Roboto, fotografie e ruoli di elevazione distinti. La composizione riprende il sistema del 2014, distinto dal Material 3 contemporaneo.',
      sources: [figma('198:2381'), { label: 'Google · Material Design 2014', url: 'https://developers.googleblog.com/en/this-is-material-design/' }, { label: 'Google · Material prima generazione', url: 'https://m1.material.io/components/buttons.html' }],
      image: historicalImage('material', {
        hero: [645, 84, 767, 405],
        coffee: [80, 630, 360, 154],
        croissant: [545, 630, 355, 154],
        tea: [1000, 627, 350, 157],
      }),
    },
    {
      id: 'neumo',
      label: 'Neumorfismo',
      group: 'atlante',
      summary: 'Ombre e luci morbide fanno emergere gli elementi da una superficie continua.',
      detail: 'Grigio chiaro e controlli che emergono da una superficie continua, con ceramica opaca nelle fotografie. Testo, bordi e focus conservano un contrasto indipendente dal rilievo: le ombre da sole non identificano i controlli.',
      sources: [figma('198:2363'), { label: 'Plyuto · artefatto originale', url: 'https://dribbble.com/shots/7994421-Skeuomorph-Mobile-Banking' }, { label: 'Adam Giebl · Neumorphism', url: 'https://neumorphism.io/' }],
      image: historicalImage('neumo', {
        hero: [639, 82, 781, 400],
        coffee: [109, 629, 331, 153],
        croissant: [554, 630, 340, 152],
        tea: [1004, 624, 339, 158],
      }),
    },
    {
      id: 'glass',
      label: 'Glassmorfismo',
      group: 'atlante',
      summary: 'Traslucenza, sfocatura e bordi luminosi distinguono i livelli dell’interfaccia.',
      detail: 'Traslucenza e sfocatura distinguono il livello degli strumenti su un campo ciano e lavanda. Il contenuto resta opaco e leggibile; il vetro riguarda l’interfaccia, non trasforma gli alimenti in materiale trasparente.',
      sources: [figma('198:2688'), { label: 'Microsoft · Acrylic', url: 'https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic' }],
      image: {
        src: 'assets/verifica-stili/glass-v1.webp', width: 1536, height: 1024,
        regions: { hero: [0, 0, 768, 512], coffee: [768, 0, 768, 512], croissant: [0, 512, 768, 512], tea: [768, 512, 768, 512] },
      },
    },
    {
      id: 'minimal',
      label: 'Minimalismo',
      group: 'atlante',
      summary: 'Bianco, nero e spazio negativo concentrano l’attenzione su contenuto e gerarchie.',
      detail: 'Tipografia essenziale, filetti sottili e immagini monocromatiche. Ridurre gli elementi richiede scelte precise: navigazione, etichette e feedback continuano a spiegare dove leggere e agire.',
      sources: [figma('198:2701'), { label: 'Studio Yoke', url: 'https://www.studioyoke.co.uk/' }],
      image: historicalImage('minimal', {
        hero: [648, 71, 800, 415],
        coffee: [100, 626, 345, 156],
        croissant: [548, 626, 348, 156],
        tea: [1000, 623, 350, 159],
      }),
    },
    {
      id: 'y2k',
      label: 'Y2K',
      group: 'atlante',
      summary: 'Cromature, lilla e futurismo pop reinterpretano l’immaginario del passaggio di millennio.',
      detail: 'Titoli futuristici, superfici metalliche e riflessi elettrici. È una rilettura contemporanea di un repertorio, non una data obbligata né un sinonimo dello stile lucido del Web 2.0.',
      sources: [figma('198:2399'), { label: 'Makemepulse · Girls Who Code Girls', url: 'https://www.makemepulse.com/case-study/girls-who-code-girls' }, { label: 'Spotify · direzione creativa Wrapped 2023', url: 'https://newsroom.spotify.com/2023-11-29/wrapped-design-marketing-brand-creative-inside-spotify/' }],
      image: historicalImage('y2k', {
        hero: [651, 76, 784, 402],
        coffee: [100, 619, 350, 164],
        croissant: [544, 619, 357, 164],
        tea: [1000, 618, 360, 165],
      }),
    },
    {
      id: 'max',
      label: 'Massimalismo',
      group: 'atlante',
      summary: 'Colori saturi, pattern e tipi espressivi coordinano una densità visiva intenzionale.',
      detail: 'Magenta, viola, arancio e lime costruiscono una composizione densa ed espressiva. Le immagini diventano collage illustrati. Pause e gerarchie continuano a distinguere messaggio principale e dettagli.',
      sources: [figma('198:2715'), { label: 'TOILETPAPER', url: 'https://www.toiletpapermagazine.org/' }],
      image: historicalImage('max', {
        hero: [694, 74, 754, 405],
        coffee: [110, 619, 358, 164],
        croissant: [540, 619, 367, 164],
        tea: [1000, 619, 350, 164],
      }),
    },
    {
      id: 'neo',
      label: 'Neobrutalismo',
      group: 'atlante',
      summary: 'Bordi neri, campiture accese e ombre nette rendono esplicita la struttura.',
      detail: 'Il booklet distingue brutalismo e neobrutalismo; questa variante mostra il secondo: titoli pesanti, sans nel corpo, mono nelle etichette, giallo, rosa e menta. Contorni e ombre nette mantengono gerarchie e stati leggibili.',
      sources: [figma('198:2418'), { label: 'Neobrutalism Components · creatore', url: 'https://www.neobrutalism.dev/docs' }, { label: 'Brutalist Websites · distinzione', url: 'https://brutalistwebsites.com/' }],
      image: historicalImage('neo', {
        hero: [668, 99, 748, 383],
        coffee: [74, 642, 364, 157],
        croissant: [548, 642, 355, 157],
        tea: [1035, 641, 343, 158],
      }),
    },
    {
      id: 'adattabile',
      label: 'Adattabile · lettura',
      group: 'booklet',
      summary: 'La persona sceglie distanza e larghezza: la tipografia risponde con assi variabili reali.',
      detail: 'Roboto Flex cambia peso, larghezza e dimensione ottica. Tre distanze di lettura e un cursore regolano davvero i caratteri; la preferenza si conserva fra pagine. La tecnologia esiste già: lo scenario esplora un uso più personale dell’interfaccia.',
      sources: [figma('2258:295'), { label: 'Google · Roboto Flex', url: 'https://codelabs.developers.google.com/migrating-variable-fonts' }],
      image: futureImage('adattabile'),
    },
    {
      id: 'spaziale',
      label: 'Spaziale · menu in AR',
      group: 'booklet',
      summary: 'Una scena d’uso con visore colloca il menu nell’ambiente, su piani selezionabili.',
      detail: 'La scena mostra una persona al bancone con pannelli AR. Nel sito, selezione e distanza cambiano i piani del dettaglio e dei prodotti. È una simulazione su schermo della relazione fra luogo e strumenti, ispirata al layout spaziale; il browser non attiva un visore.',
      sources: [figma('2258:317'), { label: 'Apple · Materials', url: 'https://developer.apple.com/design/human-interface-guidelines/materials' }, { label: 'Apple · Spatial layout', url: 'https://developer.apple.com/design/human-interface-guidelines/spatial-layout/' }, { label: 'Microsoft · coordinate e ancore spaziali', url: 'https://learn.microsoft.com/en-us/windows/mixed-reality/design/coordinate-systems' }],
      image: futureImage('spaziale'),
    },
    {
      id: 'generativa',
      label: 'Generativa · su richiesta',
      group: 'booklet',
      summary: 'Una richiesta compone una lista di prodotti, una settimana di apertura o una vista del locale.',
      detail: 'Il composer locale riconosce intenti limitati e costruisce widget differenti dai contenuti del bar. Dimostra la composizione per compito; è un prototipo deterministico, senza chiamate AI, e non implementa il modello generativo della ricerca citata.',
      sources: [figma('2258:352'), { label: 'Google Research · Generative UI', url: 'https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/' }],
      image: futureImage('generativa'),
    },
    {
      id: 'risorse',
      label: 'Essenziale · risorse',
      group: 'booklet',
      summary: 'Il testo arriva per primo; le illustrazioni locali sono caricate solo su richiesta.',
      detail: 'Font di sistema e documento essenziale riprendono Low-tech Magazine. Prima della scelta le illustrazioni non hanno src; un pulsante carica la tavola condivisa e dichiara il suo peso effettivo. Le immagini hanno una resa a incisione compressa; il peso del file non misura energia o sostenibilità.',
      sources: [figma('2258:381'), { label: 'Low-tech Magazine · costruire un sito leggero', url: 'https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/' }],
      image: futureImage('risorse'),
    },
    {
      id: 'organica',
      label: 'Organica · forme vive',
      group: 'sperimentale',
      summary: 'Una superficie morbida cambia forma e apre il contenuto scelto dalla persona.',
      detail: 'La selezione modifica contorni, campitura e posizione della superficie, poi si assesta. La stessa scelta apre il dettaglio del prodotto o gli orari. È un esperimento di risposta organica, senza movimento continuo e senza promesse di benefici o sostenibilità.',
      sources: [{ label: 'Ispirazione · Google Material 3 Expressive', url: 'https://design.google/library/expressive-material-design-google-research' }],
      image: futureImage('organica'),
    },
    {
      id: 'olografica',
      label: 'Olografica · proiezione',
      group: 'sperimentale',
      summary: 'Una persona seleziona un menu luminoso proiettato sopra un tavolo del bar.',
      detail: 'La scena ricostruisce proiettore, gesto e copie luminose dei prodotti sopra il tavolo. Un comando fa sparire il sito e apre le quattro pagine in una superficie proiettata, con listino, orari e prospettiva selezionabile. È una scena speculativa su schermo, distinta dai pannelli AR del visore; non documenta un hardware esistente.',
      sources: [{ label: 'Microsoft Research · olografia near-eye', url: 'https://www.microsoft.com/en-us/research/project/holographic-near-eye-displays-virtual-augmented-reality/' }, { label: 'Ricerca · olografia computazionale', url: 'https://www.nature.com/articles/s41586-020-03152-0' }],
      image: futureImage('olografica'),
    },
  ];
  window.CAFFE_STYLES.splice(11, 0,
    {
      id: 'brutal', label: 'Brutalismo web', group: 'atlante',
      summary: 'Tipografia esplicita, collegamenti diretti e densità da documento di lavoro.',
      detail: 'Una pagina senza addolcimenti: masthead ampio, listino visibile e link sottolineati. Interpreta il brutalismo web raccolto dal suo curatore, distinto dal neobrutalismo a campiture, ombre nette e bordi decorativi.',
      sources: [{ label: 'Brutalist Websites · curatore', url: 'https://brutalistwebsites.com/' }, { label: 'NWEB · intervista al creatore', url: 'https://brutalistwebsites.com/nweb.club/' }]
    },
    {
      id: 'swiss', label: 'Stile tipografico internazionale', group: 'atlante',
      summary: 'Griglia asimmetrica, tipografia senza grazie e gerarchie precise.',
      detail: 'Rilettura digitale dello stile tipografico internazionale del secondo Novecento: nero, bianco e rosso, fotografie e relazioni rigorose fra colonne. È una tradizione grafica trasferita sul web, non una fase universale della sua storia.',
      sources: [{ label: 'Biblioteca nazionale svizzera · stile internazionale 1950–1970', url: 'https://www.nb.admin.ch/en/the-international-style-1950-1970' }]
    },
    {
      id: 'pixel', label: 'Pixel · retro 8 bit', group: 'atlante',
      summary: 'Pixel art, caratteri a matrice e bordi a gradini reinterpretano il videogioco.',
      detail: 'Una rilettura contemporanea del repertorio a 8 bit: immagini disegnate a pixel, titoli Press Start 2P e controlli a gradini. Il corpo conserva una tipografia leggibile e il sito si adatta allo schermo; non pretende di ricostruire un browser degli anni Ottanta.',
      sources: [{ label: 'NES.css · progetto del creatore', url: 'https://nostalgic-css.github.io/NES.css/' }]
    },
    {
      id: 'bento', label: 'Bento · composizione modulare', group: 'atlante',
      summary: 'Un mosaico di moduli di misure diverse organizza menu, locale e orari.',
      detail: 'Il bento è una strategia di composizione recente: moduli con estensioni diverse e gerarchia fra informazioni, fotografie e azioni. Qui la pagina intera è una griglia modulare, con superfici opache; non è soltanto una serie di schede uguali.',
      sources: [{ label: 'Magic UI · Bento Grid, progetto del creatore', url: 'https://magicui.design/docs/components/bento-grid' }]
    },
    {
      id: 'deco', label: 'Art Déco · rilettura digitale', group: 'atlante',
      summary: 'Simmetria, segni a gradini e filetti color ottone danno ritmo al bar.',
      detail: 'Una rilettura digitale della cultura Art Déco: avorio, nero e ottone, geometria simmetrica e tipografia da insegna. È una direzione di identità per il bar, non uno stile nato sul web né una previsione del suo futuro.',
      sources: [{ label: 'Musée des Arts Décoratifs · centenario Art Déco', url: 'https://madparis.fr/1925-2025-Cent-ans-d-Art-deco' }]
    }
  );
  window.CAFFE_STYLES.forEach(function (style) {
    if (window.CAFFE_IMAGES && window.CAFFE_IMAGES[style.id]) style.image = window.CAFFE_IMAGES[style.id];
    if (!style.image && window.CAFFE_IMAGES) style.image = window.CAFFE_IMAGES.flat;
    if (style.id === 'spaziale' || style.id === 'olografica') {
      style.scene = {
        src: 'assets/futuri/scene/' + style.id + '-v2.webp', width: 1586, height: 992,
        alt: style.id === 'olografica'
          ? 'Scenario speculativo: al tavolo del bar una persona seleziona un croissant luminoso sospeso sopra un proiettore; espresso, croissant e tè reali restano sul tavolo.'
          : 'Scenario speculativo: al bancone del bar una persona con visore seleziona un croissant su pannelli tridimensionali ancorati nell’ambiente, accanto ai prodotti reali.'
      };
    }
  });
  // Comportamento scelto per queste ricostruzioni: brochure del primo web e
  // del millennio con griglia fissa; interpretazioni recenti con breakpoint.
  // I layout fluidi precedono il termine Responsive Web Design del 2010.
  const legacy = new Set(['html', 'web2', 'scheu', 'y2k']);
  window.CAFFE_STYLES.forEach(function (style) {
    style.layout = legacy.has(style.id) ? 'legacy' : 'responsive';
  });
})();
