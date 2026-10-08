# Caffè TTC · quattro pagine, 22 stili

Aprire **index.html** e scegliere uno stile dal select nell’intestazione. Il sito usa risorse locali e funziona offline: per copiarlo o condividerlo, conservare l’intera cartella `esempi/caffe-luce/`. Il percorso tecnico mantiene il nome precedente; il bar ora si chiama **Caffè TTC**.

**Home**, **Menu**, **Il locale** e **Contatti** sono pagine complete collegate fra loro. Il menu comprende 15 proposte in quattro categorie, con descrizioni e prezzi; i filtri cambiano la categoria visibile. Contatti mostra indirizzo, orari e un modulo che prepara una bozza locale scaricabile o apribile nella posta. Modificare un campo o l’argomento revoca la bozza precedente e rimuove le sue azioni: **Prepara il messaggio** genera una nuova bozza con il testo aggiornato. Il sito non invia il messaggio e non salva i dati del modulo.

Caffè TTC è un bar immaginario. Menu, prezzi, indirizzo e contatti sono dimostrativi; `ciao@caffettc.example` usa un [dominio riservato agli esempi](https://www.rfc-editor.org/rfc/rfc2606). Il marchio **Banco TTC** conserva due T sopra una C che richiama il banco. Il simbolo è SVG e il nome resta testo accessibile: entrambi seguono la grammatica scelta, insieme a navigazione, select, controlli e immagini. I tre concetti originali Banco, Incontro e Soglia e le relative prove sono conservati in `assets/brand/concepts/`; non costituiscono un kit di identità definitivo.

## Uso e formati

La scelta viaggia in `?stile=` fra pagine, ricaricamento e Indietro. Per esempio, `menu.html?stile=y2k` apre direttamente il menu Y2K. JavaScript serve al cambio di stile, alle immagini e alle interazioni; senza JavaScript rimangono i contenuti testuali e i collegamenti.

Primo web, Web 2.0, scheumorfismo e Y2K conservano una larghezza minima di **1024 px** e scorrono orizzontalmente sui viewport stretti. È una scelta deliberata di queste ricostruzioni. Le altre 18 varianti sono responsive. Le griglie comuni dei valori passano a due colonne tra 721 e 1000 px, con la terza voce a tutta larghezza; le composizioni specifiche mantengono la propria gerarchia. Fino a 720 px il contenuto responsive segue una colonna. Il listino cresce con i suoi articoli, senza sovrapporre note e sezioni successive. La stampa A4 conserva il menu completo e tiene insieme identità e dichiarazione del footer, spiegazione e nota del modulo, titolo e testo della nota del menu. Massimalismo usa due colonne in A4; gli hero delle sei esperienze crescono con il testo. La stampa può occupare più pagine. Le strutture cambiano secondo lo stile, mantenendo dati e funzioni del bar.

Il select **Argomento** conserva una freccia visibile e il materiale di ogni variante. Minimalismo e Bento usano bordi dei campi con contrasto di almeno 3:1, distinti dai filetti decorativi; focus e uso da tastiera restano condivisi.

Questa distinzione non assegna rigidamente una tecnologia a un’epoca: [Ethan Marcotte definì il Responsive Web Design nel 2010](https://alistapart.com/article/responsive-web-design/), mentre [Fluid Grids](https://alistapart.com/article/fluidgrids/) descriveva già nel 2009 griglie proporzionali. Y2K, minimalismo e altri repertori possono essere reinterpretati oggi su layout responsive.

Anteprima HTTP opzionale, dalla radice del repository:

```sh
python3 -m http.server 4187 --bind 127.0.0.1 --directory esempi/caffe-luce
```

Aprire [Caffè TTC in locale](http://127.0.0.1:4187/). Gli URL relativi permettono anche il trasferimento della cartella sotto un altro percorso.

## Le 22 grammatiche

Sedici varianti interpretano correnti, tradizioni grafiche e composizioni; sei esplorano scenari futuri. Non sono una cronologia universale. La tabella separa il fondamento documentato dalle scelte didattiche del sito: font e fotografie sintetiche non ricostruiscono automaticamente gli artefatti citati.

| Stile / ID | Tipografia e composizione | Profondità e controlli | Marchio e immagini | Fondamento primario |
| --- | --- | --- | --- | --- |
| Primo web `html` | Times; documento sequenziale, intestazione su due righe e immagine contenuta. | Link blu, select nativo e separatori; azione come collegamento ordinario. | Simbolo compatto a una tinta; illustrazioni retinate. | [CERN, primo sito](https://info.cern.ch/hypertext/WWW/TheProject.html): riferimento documentale, distinto dal nostro bar grafico. |
| Web 2.0 `web2` | Trebuchet MS/Arial; masthead e schede di navigazione lucide. | Gradienti, bevel e pulsanti a rilievo; moduli arrotondati. | Ombra del simbolo; illustrazioni levigate con contorni e sfumature. | [Kubrick](https://wordpress.org/themes/default/) e [ThemeRoller](https://jqueryui.com/themeroller/): repertorio visivo, non una dimostrazione di partecipazione Web 2.0. |
| Scheumorfismo `scheu` | Lora; impaginazione di un menu rilegato. | Carta avorio, cuoio e pulsanti tangibili; campi incavati. | Marchio inciso; illustrazioni a tratteggio seppia. | [Apple, GarageBand 2011](https://www.apple.com/newsroom/2011/11/01GarageBand-Now-Available-for-iPhone-and-iPod-touch-Users/): metafore fisiche; il menu inciso è una nostra interpretazione. |
| Flat `flat` | Inter; campiture continue e gerarchia geometrica. | Superfici opache, pulsanti rettangolari; nessuna luce simulata. | C terracotta; illustrazioni a forme piene senza texture o gradienti. | [Designmodo, Flat UI](https://designmodo.github.io/Flat-UI/). |
| Material 1 `material` | Roboto; app bar, tab e superfici di carta. | Raggio piccolo, elevazioni distinte e pulsante rialzato. | Simbolo compatto; fotografie sintetiche dei prodotti. | [Google, specifiche M1](https://m1.material.io/components/buttons.html): prima generazione, distinta da M3. |
| Neumorfismo `neumo` | Nunito; elementi che emergono da una base continua. | Coppie di ombre morbide, campi incavati; focus e testo leggibili indipendentemente dal rilievo. | Rilievo morbido del simbolo; ceramica e scene opache. | [Oleksandr Plyuto, artefatto originale](https://dribbble.com/shots/7994421-Skeuomorph-Mobile-Banking). |
| Glassmorfismo `glass` | Inter; strumenti su un piano distinto dal contenuto. | Un blur nell’header, contorni luminosi e azioni opache. | Segno con contorno; ambiente ciano/lavanda, alimenti opachi. | [Microsoft, Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic): riferimento al materiale, non ai colori obbligati. |
| Minimalismo `minimal` | Inter; campi editoriali aperti e spazio negativo. | Filetti sottili, azioni sottolineate e pochi contenitori. | Segno piccolo a una tinta; immagini sintetiche sobrie. | [Studio Yoke](https://www.studioyoke.co.uk/), artefatto del creatore; bianco/nero è una scelta di questa variante. |
| Y2K `y2k` | Audiowide/Space Grotesk; pannelli tecnici e bande cromate. | Tagli netti, riflessi elettrici e controlli metallici. | Monogramma cromato; fotografie sintetiche con repertorio cyber. | [Spotify, Wrapped 2023](https://newsroom.spotify.com/2023-11-29/wrapped-design-marketing-brand-creative-inside-spotify/): revival dichiarato dell’internet dei primi Duemila. |
| Massimalismo `max` | Fraunces/Space Grotesk; ritmo denso, tipi espressivi e collage. | Magenta, viola, arancio e lime; pulsanti sagomati e livelli decorativi. | Due colori e lieve inclinazione; collage con prodotti riconoscibili. | [TOILETPAPER](https://www.toiletpapermagazine.org/), artefatto dei creatori. |
| Neobrutalismo `neo` | Archivo Black/Space Grotesk; blocchi espliciti e metadati IBM Plex Mono. | Contorni neri, campiture accese, ombre nette e controlli squadrati. | Segno giallo contornato; immagini dal repertorio grafico forte. | [Neobrutalism Components](https://www.neobrutalism.dev/docs). |
| Brutalismo web `brutal` | Space Grotesk/Roboto; masthead ampio, elenco e densità da documento. | Superfici dirette, filetti e link sottolineati; ombre assenti. | Simbolo grande monocromo; fotografie sintetiche senza cornice. | [Brutalist Websites, intervista NWEB](https://brutalistwebsites.com/nweb.club/): distinto dai blocchi decorati del neobrutalismo. |
| Internazionale `swiss` | Inter; griglia asimmetrica a 12 colonne e allineamenti condivisi. | Nero, bianco e rosso; gerarchia e filetti, azioni senza rilievo. | Marchio rosso; fotografie sintetiche composte sulla griglia. | [Biblioteca nazionale svizzera, 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970): tradizione trasferita sul web. |
| Pixel `pixel` | Press Start 2P nei titoli, Space Grotesk nel corpo; revival responsive a 8 bit. | Bordi a gradini, controlli a matrice e contrasto esplicito. | Variante del monogramma a pixel; pixel art originale, senza filtro sulle foto. | [NES.css](https://nostalgic-css.github.io/NES.css/): artefatto di revival, non un browser degli anni Ottanta. |
| Bento `bento` | Inter; l’intera pagina è un mosaico di moduli con estensioni diverse. | Superfici opache, angoli morbidi e azioni arrotondate. | Accento verde nel segno; fotografie sintetiche distribuite nel mosaico. | [Magic UI, Bento Grid](https://magicui.design/docs/components/bento-grid): schema compositivo contemporaneo. |
| Art Déco `deco` | Limelight/Lora; ritmo centrato, simmetria e insegne. | Avorio, nero, ottone e filetti; azioni geometriche senza ombra. | Segno a contorno; immagini sintetiche nello stesso repertorio. | [Musée des Arts Décoratifs, centenario](https://madparis.fr/1925-2025-Cent-ans-d-Art-deco): rilettura digitale, non stile nato sul web. |
| Adattabile `adattabile` | Roboto Flex; dimensione, peso, larghezza e dimensione ottica rispondono alla scelta di lettura. | Superfici blu chiare, opzioni e cursore con stato visibile. | Il simbolo segue la larghezza; illustrazioni editoriali. | [Google Codelabs, variable fonts](https://codelabs.developers.google.com/migrating-variable-fonts). |
| Spaziale `spaziale` | Inter; scena, dettaglio e strumenti su piani selezionabili. | Header traslucido, contenuto opaco e prospettiva controllata. | Segno inclinato; fotografie sintetiche e scena con visore AR. | [Apple, Spatial layout](https://developer.apple.com/design/human-interface-guidelines/spatial-layout/) e [Microsoft, coordinate](https://learn.microsoft.com/en-us/windows/mixed-reality/design/coordinate-systems). |
| Generativa `generativa` | Space Grotesk; una richiesta assembla strumenti con contenuti locali. | Campo di richiesta, esempi e output diversi per prodotti, orari o luogo. | C color ambra; illustrazioni a collage di carta. | [Google Research, Generative UI](https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/): principio di composizione, senza modello AI nel sito. |
| Essenziale `risorse` | Georgia/Times di sistema; prima il documento testuale. | Nessun effetto superfluo; pulsante esplicito per le immagini. | Segno compatto a una tinta; incisioni verdi su carta chiara, runtime ridotto. | [Low-tech Magazine](https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/): scelte di consegna, senza certificazione ambientale. |
| Organica `organica` | Lora; superficie e dettaglio cambiano secondo la selezione. | Contorni asimmetrici e variazioni finite di forma e posizione. | Segno leggermente inclinato; illustrazioni biomorfiche a carta ritagliata. | [Google, Expressive Design](https://design.google/library/expressive-material-design-google-research): ispirazione; l’ipotesi organica è originale. |
| Olografica `olografica` | Space Grotesk; quattro viste del bar su una superficie proiettata. | Apertura esplicita in dialog nativo, prospettiva frontale/laterale e uscita. | Segno luminoso a contorno; scena sintetica con proiettore e prodotti sospesi. | [Microsoft Research, near-eye](https://www.microsoft.com/en-us/research/project/holographic-near-eye-displays-virtual-augmented-reality/) e [Shi et al., Nature 2021](https://www.nature.com/articles/s41586-020-03152-0): ricerca fisica distinta dalla simulazione CSS. |

## Le sei esperienze

I controlli modificano il risultato nel browser. Adattabile cambia assi tipografici reali; Spaziale seleziona soggetto e distanza dei piani, mantenendo accessibili tutti i filtri anche su mobile nello stato vicino; Generativa compone il listino di 15 articoli, le categorie richieste o altre viste con un riconoscitore deterministico di richieste; Organica cambia contorni e apre il dettaglio scelto. Generativa accetta i nomi visibili di categorie e articoli e alias come **Dal forno**, **forno**, **infusi** e **girella**. **Bevande** e **da bere** restituiscono Caffè e Tè; altre categorie vengono aggiunte solo se richieste. Le preferenze delle esperienze sono conservate nella sessione quando il browser lo permette.

Prima della scelta, Essenziale non richiede bitmap: il pulsante **Mostra le immagini · 84,8 kB** assegna la sorgente. Dopo il caricamento la preferenza si conserva fra pagine nella sessione. Titoli e immagini del Menu occupano la colonna sinistra e le liste la colonna destra più ampia, anche per Salato senza immagine; mobile e stampa usano tutta la larghezza. La tavola WebP condivisa è **384 × 576 px, 84.790 byte**. Questa misura descrive il file; non misura traffico totale, consumo energetico, emissioni o sostenibilità. Il marchio SVG rimane disponibile anche prima del caricamento.

Olografica offre **Proietta il sito**: il sito sfuma e un dialog nativo mostra Home, Menu, Il locale e Contatti nella scena del tavolo. Il menu proiettato riusa tutti i 15 articoli, descrizioni e prezzi; orari e contatti provengono dagli stessi dati. Si può cambiare prospettiva e tornare al sito con il pulsante o Esc, ritrovando il focus sul comando di apertura. Il movimento ridotto elimina le transizioni della proiezione e dei piani e contorni interattivi di Spaziale e Organica.

Spaziale e Olografica hanno scene d’uso differenti: visore e pannelli ancorati nell’ambiente per la prima, proiettore e contenuti luminosi sopra il tavolo per la seconda. Sono immagini sintetiche di ipotesi: il sito non attiva AR, non documenta un proiettore esistente e non ricostruisce un fronte d’onda olografico. Neon, iridescenza e CSS 3D non sono olografia fisica. Il fondamento e i limiti sono approfonditi nel [rapporto di ricerca](../../reports/caffe-luce-v2/research.md).

## Sorgenti e manutenzione

| File | Responsabilità |
| --- | --- |
| `contenuti.json` → `contenuti.js` | Dati canonici: identità, 15 articoli, quattro categorie, prezzi, indirizzo e orari. |
| `index.html`, `menu.html`, `locale.html`, `contatti.html` | Pagine statiche generate da `scripts/build/caffe-ttc.mjs`, leggibili anche senza un server. |
| `stili.js` | Catalogo, descrizioni, fonti e comportamento responsive/legacy di ogni stile. |
| `immagini.js` | Sorgenti, dimensioni, byte e crop generati dai manifest in `assets/ttc-v3/`. |
| `app.js` | Select, query, collegamenti, cambio degli asset e stati di caricamento. |
| `site.js`, `future.js`, `projection.js` | Filtri e bozze; sei esperienze; dialog della proiezione. |
| `styles.source.css` | Tailwind/daisyUI e base; importa `rich`, `historical`, `extra`, `future`, `brand` e `projection.source.css`. |
| `styles.css` | CSS compilato: non modificare manualmente. |

Dalla radice, con le dipendenze del repository già installate:

```sh
pnpm build:caffe-ttc
pnpm check:caffe-luce
```

`build:caffe-ttc` rigenera registro immagini, pagine, dati browser e CSS. Per una sola modifica di presentazione è disponibile `pnpm css:caffe-luce`. Il checker controlla 22 varianti su quattro pagine, con quattro viewport e stampa A4, copia offline isolata, navigazione, tastiera, dati, asset e interazioni. Il percorso predefinito è `reports/caffe-ttc-v3/`; `CAFFE_REPORT` consente di scegliere un’altra cartella.

**Verifica finale: PASS, 540 casi**, inclusi 76 casi di interazione, 288 PNG e 88 PDF A4 per 210 pagine fisiche; zero errori, richieste esterne ed errori console. Il [rapporto conclusivo](../../reports/caffe-ttc-review-final/verification.json) è in `reports/caffe-ttc-review-final/`, scelto con `CAFFE_REPORT`. La [revisione delle 22 versioni](../../reports/tmp/ttc-review-current/review.md) riunisce tre analisi indipendenti delle quattro pagine a 1440, 1032 e 390 px e di tutti gli 88 PDF, con le correzioni e le conferme successive: sette PDF Contatti e sette indicatori select; 16 casi a schermo e 32 PDF; 60 casi mirati, 28 pagine aggiornate e otto PDF reali. Alcuni PDF conservano un ultimo foglio con il solo footer: il contenuto è completo e la paginazione multipagina resta ammessa.

I controlli `pnpm check:source` e `pnpm build` del repository Slidev sono passati in questa revisione: 491 slide sorgente, 241 online, senza modifiche alle slide. Questi controlli non sostituiscono la verifica browser del café.

## Asset, originali e licenze

Ogni stile ha una nuova tavola in `assets/ttc-v3/`: due colonne per tre righe, con i sei soggetti `hero`, `locale`, `coffee`, `croissant`, `tea`, `frontage`. I PNG originali sono conservati insieme alle copie WebP di runtime. `provenance-<stile>.json` registra prompt esatti, passaggi di generazione, riferimenti, dimensioni, crop misurati, byte e SHA-256. Gli asset rappresentano lo stesso bar immaginario; non sono screenshot storici né fotografie documentarie. I ritagli rispettano le regioni registrate, anche quando differiscono dalla divisione ideale in quadrati; il sito non aggiunge cornici alle immagini.

Le scene d’uso aggiuntive `spaziale-v2` e `olografica-v2` sono in `assets/futuri/scene/`, con PNG originali, WebP e provenienza. L’atlante precedente, le sue fonti e i manifest, le prime immagini future e la precedente verifica Glass sono conservati nelle rispettive cartelle e non sostituiscono le tavole TTC attive.

I tre simboli e logotipi dei concetti sono geometrie SVG originali, con letterforme a tracciati; la provenienza e le prove a 16/32/64 px, monocrome e rovesciate sono in `assets/brand/concepts/brief-provenance.json`. Il sito usa Banco TTC e adatta il suo trattamento mantenendo due T e la C; il master originale resta conservato.

I font di runtime sono locali. Le licenze sono in `assets/licenses/`, con manifest per il deck e gli stili e file dedicati a Inter, Roboto Flex, Press Start 2P e Limelight. `assets/fonts/roboto-flex-provenienza.json` documenta gli assi; `extra-fonts-provenienza.json` conserva font, originali TTF, risposte CSS, copertura italiana, hash e licenze dei due nuovi caratteri. Non rimuovere originali, attribuzioni o licenze degli asset attivi.

Il punto di partenza didattico resta il [Booklet, Atlante degli stili](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC?node-id=2186-1910) e `lezioni/03-storia-design.md`; la nuova struttura TTC estende il caso autonomo, senza modificare il sistema grafico delle slide.
