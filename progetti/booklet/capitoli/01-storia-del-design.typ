// Capitolo 01: unico testo per volume e compilazione autonoma.
#import "../template/stile.typ": booklet, capitolo
#import "../template/piano.typ": parametri-capitolo

#let testo = [
#import "../template/figure.typ": figura-al-vivo, figura-nel-testo
#import "../template/editoriale.typ": nota-compatta
#import "../template/sagome.typ": capolettera
// Ordine editoriale del capitolo; le varianti restano nei rispettivi ambiti locali.

// Storia del design: prosa e apparati della fonte corrente, con le revisioni verificate.
// La prosa scorre automaticamente fra le schermate e le tavole ampie su fogli dedicati.
// Le figure richiamano bitmap canonici e i due schemi SVG correnti; la scala viene verificata nell’impaginato comune.

#[
#import "../template/stile.typ": sito, immagine

// Tavola 3 · 198:1993

*Come disse _Ivan Chermayeff_, il design della storia è la storia del design.* @meggs2025-storia.#sito([_Ivan Chermayeff_, cit. in _Philip B. Meggs_, _Meggs’ History of Graphic Design_, “_Preface to the First Edition_”, Wiley. Anteprima O’Reilly.], "https://www.oreilly.com/library/view/meggs-history-of/9781119743293/f04.xhtml")

Ogni epoca ha il suo spirito, un complesso intreccio di idee, valori e sensibilità che i tedeschi chiamano Zeitgeist. Tra le tante forme di espressione umana, il graphic design ha una straordinaria capacità di catturare questo spirito, grazie al suo legame diretto con la vita sociale, politica ed economica di una cultura.

Dalle pitture rupestri agli schermi digitali, l’umanità ha sempre cercato modi per trasformare idee in immagini e dare ordine al caos dell’informazione. Gli scribi sumeri che inventarono la scrittura, gli artigiani egiziani, i tipografi rinascimentali: ciascuno ha aggiunto un tassello a una storia che ci appartiene ancora oggi. Nel 1922 _William Addison Dwiggins_ utilizzò l’espressione graphic design per descrivere attività di organizzazione degli elementi visivi nella stampa @preston2026-graphic.#sito([_David Preston_, ricerca sulla storia del termine graphic design, 2026.], "https://www.visible-language.org/journal/issue-60-1-graphic-design-terminology/")

Il design, in tutte le sue forme – architettura, moda, grafica – può ridare coesione alla nostra esperienza di vita, intrecciando estetica e utilità in un nuovo dialogo tra l’uomo e il suo ambiente.

// Tavola 4 · 198:2017

== Storia del graphic design: correnti e movimenti

*_“We shape our tools and thereafter they shape us”_*

_John M. Culkin_ @culkin1967-tools.#sito([_John M. Culkin_, “_A Schoolman’s Guide to Marshall McLuhan_”, Saturday Review, 18 marzo 1967, pp. 51–53, 70–72; citazione a p. 70.], "https://webspace.royalroads.ca/llefevre/wp-content/uploads/sites/258/2017/08/A-Schoolmans-Guide-to-Marshall-McLuhan-1.pdf")

La storia della comunicazione visiva precede di molti millenni la nascita del graphic design come professione. Nella preistoria, pitture rupestri e incisioni su roccia permettevano già di rappresentare figure, attività e simboli.

Esempi come le pitture di Lascaux e i petroglifi diffusi nel mondo testimoniano l’antico bisogno di comunicare attraverso immagini. Non sono opere di graphic design in senso moderno, ma fanno parte della storia più ampia dei linguaggi visivi.

// Tavola 5 · 198:2052

=== Le origini

Le origini della comunicazione scritta rappresentano un punto di svolta fondamentale nella storia della civiltà umana, con profonde implicazioni per il campo del graphic design. I sistemi di scrittura, emersi indipendentemente in diverse culture, trasformarono la capacità di registrare informazioni, svolgere compiti amministrativi e facilitare comunicazioni complesse. Uno dei primi sistemi di scrittura noti, il cuneiforme sumero, apparve intorno al 3400 a.C. in Mesopotamia, seguito dai geroglifici egizi (3100 a.C.), che univano arte e utilità su monumenti di pietra e rotoli di papiro.

=== I manoscritti miniati medievali

#capolettera(
  id: "iniziale-storia-n-medievale",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/iniziale-n-scuola-medievale-docente.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/iniziale-n-scuola-medievale-docente.json")),
  width: 64pt, lettera: "N",
)[
el Medioevo, una delle espressioni più importanti della comunicazione visiva fu rappresentata dai manoscritti miniati, codici copiati a mano e impreziositi da decorazioni, iniziali ornate e illustrazioni. Molti di essi erano legati alla sfera religiosa e venivano prodotti nei monasteri, dove copisti e miniatori lavoravano con grande precisione negli scriptoria. Accanto ai testi sacri, tuttavia, vennero realizzati anche manoscritti di argomento letterario, giuridico e scientifico. Attraverso la stretta unione tra scrittura e apparato figurativo, questi codici testimoniano una fase fondamentale nella storia della cultura visiva, anticipando lo sviluppo della moderna comunicazione tra parola e immagine (@fig-storia-libro-ore).#sito([The Met, foglio di un _Libro d’ore_.], "https://www.metmuseum.org/art/collection/search/32837")
]

#figura-al-vivo(
  id: "fig-storia-libro-ore", file: path("/risorse-condivise/immagini/figure/storia-del-design/libro-ore-foglio-miniato-1390-1400-met.jpg"),
  didascalia: [Anonimo francese, foglio di un _Libro d’ore_, 1390–1400. The Met, inv. 23.21.9.],
  alt: "Foglio manoscritto di un Libro d’ore con iniziali, decorazioni e miniature.",
  diritti: [Public Domain; The Met Open Access.],
  rapporto: 1082 / 1431, rifilo: false,
)

// Tavola 6 · 198:2437

Gli stemmi araldici, diffusi in Europa nel XII secolo, sono un importante precedente dei moderni sistemi di identità visiva. Servivano a distinguere persone, casate e territori attraverso segni riconoscibili, presenti su scudi e vessilli.

Come i loghi moderni, associavano un’immagine a un’identità e ne favorivano il riconoscimento. Il loro impiego si estese anche ai sigilli in ceralacca, usati per attestare l’autenticità di documenti e comunicazioni.

=== La miniatura islamica e persiana

Dal X al XV secolo, i manoscritti dei paesi islamici raggiunsero un livello straordinario di maestria artistica e tecnica, soprattutto nella tradizione della miniatura persiana.

La ricchezza del disegno e delle illustrazioni dei manoscritti persiani è ben visibile nella pagina che illustra il _Khamsa_ (“Il quintetto”) del grande poeta del XII secolo _Nizami_ (@fig-storia-khamsa) @ecker2019-khamsa.#sito([_Heather Ecker_, Dallas Museum of Art: _Khusraw_ al palazzo di _Shirin_ e il Khamsa di _Nizami_.], "https://blog.dma.org/2019/02/07/the-artful-overlapping-of-old-and-modern-iran/")

#figura-al-vivo(
  id: "fig-storia-khamsa",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/miniatura-persiana-khamsa-nizami.png"),
  didascalia: [_Khusraw al palazzo di Shirin_, miniatura da un manoscritto del _Khamsa_ di _Nizami_, ultimo quarto del XV secolo. The Keir Collection of Islamic Art, in prestito al Dallas Museum of Art, K.1.2014.738.],
  alt: "Miniatura persiana con figure e testo, da un manoscritto del Khamsa.",
  rapporto: 0.705961152043, ancoraggio: (0.5, 0.5),
)

// Grafia Nizami attestata dalla fonte curatoriale DMA; il poeta è autore del testo, non della miniatura.
// Omissione del riferimento regionale approvata dall’utente; la discrepanza resta nel rapporto delle fonti.

// Tavola 7 · 198:2077

=== Cina, le radici della stampa

La stampa permise di riprodurre testi e immagini in più copie, trasformando la circolazione delle informazioni. In Cina, la *stampa xilografica* si sviluppò intorno al VII secolo: si inchiostrava una *matrice* di legno incisa in rilievo e la si premeva sulla carta. La disponibilità della carta favorì questa produzione. Le radici della stampa precedono quindi di molti secoli il suo sviluppo nell’Europa del Rinascimento.

Tra il 1041 e il 1048, *_Bi Sheng_* sperimentò in Cina la stampa con caratteri mobili. In Corea, il *_Jikji_* del *1377* è il più antico libro conservato stampato con *caratteri mobili metallici*. Xilografia e caratteri mobili continuarono a coesistere: la scelta del procedimento dipendeva da testi, risorse e pratiche produttive. La stampa europea ebbe un proprio sviluppo tecnico e commerciale; non va presentata come l’origine mondiale dei caratteri mobili (@fig-storia-jikji).#sito([Bibliothèque nationale de France, _Jikji_.], "https://www.bnf.fr/en/jikji-treasure-world-printing")

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/jikji-1377-secondo-volume-gallica.jpg"),
  [Pagine del _Jikji_, stampato a Cheongju, Corea, nel 1377. BnF, Coréen 109. Fonte: Gallica.],
  alt: "Due pagine del Jikji del 1377, con caratteri disposti in colonne.") <fig-storia-jikji>

- *VII secolo* — Xilografia

- *1041–1048* — _Bi Sheng_

- *1377* — _Jikji_

- *XV secolo* — Europa

Una traccia di lettura della storia della stampa.

// Tavola 8 · 198:2456

=== Il Rinascimento e l'invenzione di _Gutenberg_

Con l'inizio del Rinascimento, emerse un profondo cambiamento nei principi di design. L’epoca rinascimentale portò un rinnovato interesse per le conoscenze classiche e i principi artistici dell’antica Grecia e Roma.

Questo cambiamento fu guidato da un più ampio movimento culturale che enfatizzava l’umanesimo, l’esplorazione e l’educazione. Gli artisti iniziarono a dare priorità al realismo, alla prospettiva e all’anatomia, portando a forme più naturalistiche e proporzionate sia nell’arte che nella tipografia.

Intorno al 1440, _Gutenberg_ trasformò la stampa in Europa con un sistema di caratteri mobili metallici, che permettevano di comporre blocchi di testo smontabili e riutilizzabili, a differenza dei caratteri incisi su tavolette.

Questa tecnica prevedeva l’uso di punzoni in metallo per creare matrici in negativo, da cui si ricavavano i caratteri attraverso una colata di lega di piombo, antimonio e stagno.

Nei primi anni della stampa europea, molti caratteri riprendevano la scrittura gotico-textura degli amanuensi. Nel 1470 *_Nicolas Jenson_* incise a Venezia un carattere romano divenuto un riferimento per la tipografia (@fig-storia-jenson).

Nel 1501, il _Virgilio_ pubblicato da _Aldo Manuzio_ unì il *formato in ottavo* al *corsivo* inciso da _Francesco Griffo_, ispirato alla scrittura umanistica. Formato e carattere favorirono la *portabilità* del libro. _Manuzio_ contribuì anche a sistematizzare la punteggiatura: l’innovazione riguardava la stampa e il modo di leggere.#sito([Biblioteca Nazionale Marciana, mostra digitale delle edizioni aldine.], "https://bibliotecanazionalemarciana.cultura.gov.it/en/library/digital-library/aldo-manutius-ten-interludes/")

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/nicolas-jenson-carattere-romano-1470.png"),
  [Il carattere romano di _Nicolas Jenson_, 1470.],
  alt: "Riproduzione di un carattere romano inciso da Nicolas Jenson nel 1470.") <fig-storia-jenson>

// Tavola 9 · 2532:263

=== Stampa e finitura a mano

La Bibbia di _Gutenberg_, stampata a Magonza intorno al 1454–1455, mostra come *tipografia e lavoro manuale* convivessero. Il testo veniva impresso con caratteri mobili; iniziali, titoli e indicazioni dei capitoli potevano essere completati da *rubricatori e miniatori* dopo la stampa.#sito([Library of Congress.], "https://guides.loc.gov/gutenberg")

Queste aggiunte organizzavano la lettura e distinguevano le copie. Acquirenti e artigiani intervenivano anche su decorazione e legatura, creando esemplari con aspetti diversi.

La pagina conserva quindi pratiche della cultura manoscritta mentre cambia il modo di produrre il testo. Osserva le due colonne, le iniziali ingrandite e l’ornamento: la storia della stampa riguarda anche il progetto della pagina e le attività necessarie a completarla (@fig-storia-gutenberg).#sito([Library of Congress, pagina della _Bibbia di Gutenberg_.], "https://www.loc.gov/pictures/item/2006680004/")

#figura-nel-testo(
  id: "fig-storia-gutenberg",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
  didascalia: [Pagina miniata della Bibbia di _Gutenberg_, ca. 1454–1455. Library of Congress, Prints and Photographs Division, LC-USZ62-51844. Riproduzione in bianco e nero.],
  alt: "Pagina della Bibbia di Gutenberg con due colonne di testo, iniziali ingrandite e ornamento, riprodotta in bianco e nero.",
  diritti: [Library of Congress: nessuna restrizione nota alla pubblicazione.],
  rapporto: 1102 / 1536,
  colonne: 2,
  altezza: 110mm,
)

// Tavola 10 · 2532:285

=== Xilografie e caratteri mobili

Nel _Liber chronicarum_ di _Hartmann Schedel_, stampato da _Anton Koberger_ a Norimberga nel 1493, *testo e illustrazioni* formano un progetto unitario. Caratteri mobili e xilografie sono entrambi *procedimenti a rilievo*: i blocchi illustrati potevano essere affiancati ai tipi e stampati insieme @thompson2003-xilografia.#sito([The Met.], "https://www.metmuseum.org/essays/the-printed-image-in-the-west-woodcut")

La pagina diventa così un insieme da comporre, distribuendo parole, figure e spazi. Le matrici illustrate potevano essere riutilizzate. Nel foglio riprodotto, il testo composto con i tipi occupa un blocco sopra la xilografia.

Il procedimento favoriva la riproduzione, lasciando spazio anche alla coloritura manuale di alcuni esemplari. Questo libro rende visibile un passaggio decisivo per la grafica editoriale: organizzare la relazione fra ciò che il lettore legge e ciò che osserva (@fig-storia-wolgemut).#sito([The Met, _Danza della morte_.], "https://www.metmuseum.org/art/collection/search/390220")

#figura-al-vivo(
  id: "fig-storia-wolgemut",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/wolgemut-danza-morte-cronaca-norimberga-1493.jpg"),
  didascalia: [_Michael Wolgemut_, _Danza della morte_, foglio da _The Nuremberg Chronicle_, 1493. The Met, inv. 2018.839.160. Bequest of _Herbert Mitchell_, 2008.],
  alt: "Foglio della Cronaca di Norimberga con un blocco tipografico sopra la xilografia della Danza della morte.",
  diritti: [Public Domain; CC0.],
  rapporto: 0.700380641653, ancoraggio: (0.5, 0.5),
)

// Tavola 11 · 198:2097

I tipografi adottarono presto le marche tipografiche: segni distintivi stampati sui libri per identificare stampatori ed editori. Questi marchi avevano una funzione di riconoscimento e potevano comunicare la qualità della produzione.

Nel Seicento si diffusero le gazzette, periodici di informazione che contribuirono allo sviluppo del giornalismo. La stampa periodica divenne anche un nuovo spazio per gli annunci pubblicitari (@fig-storia-gazzetta).

#figura-nel-testo(
  id: "fig-storia-gazzetta",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/gazzetta-mantova-1674-02-16.jpg"),
  didascalia: [Gazzetta di Mantova del 16 febbraio 1674.],
  alt: "Pagina della Gazzetta di Mantova del 16 febbraio 1674.",
  rapporto: 960 / 1308,
  colonne: 2,
  altezza: 110mm,
)

=== Illuminismo, tipografia e nuovi caratteri

A partire dalla metà del XVIII secolo, la società europea conobbe un notevole sviluppo delle scoperte scientifiche e delle innovazioni tecniche, che consentirono una produzione di macchine e beni sempre più massiccia e perfezionata.

Questa rivoluzione tecnico-scientifica fu accompagnata da una trasformazione culturale che sancì il tramonto dell’antico sapere custodito da pochi eruditi a favore di una cultura diffusa, aperta alla critica e concepita come patrimonio comune. In tale prospettiva, la comunicazione di massa delle nuove conoscenze divenne un compito prioritario, assumendo due caratteri principali: da un lato, rappresentava l’ideologia della modernità e del progresso; dall’altro, si inseriva nella logica di mercato, creando strutture industriali e distributive ispirate al modello capitalistico. In questo contesto, la disciplina grafica trovò il proprio spazio per fiorire.

// Tavola 12 · 198:2471

La tipografia evolse con la diffusione di gazzette, libri, cataloghi e periodici.

Un esempio è l’*_Encyclopédie_* di _Denis Diderot_ e _Jean le Rond d’Alembert_, pubblicata tra il 1751 e il 1772. Organizzando nozioni e immagini con un metodo logico e sistematico, rese più accessibili concetti e informazioni e diede nuovo rilievo alla comunicazione visiva.

In Inghilterra i caratteri romani acquisirono crescente importanza grazie anche al lavoro di _William Caslon_ e *_John Baskerville_*. Quest’ultimo affidò la qualità dei suoi volumi alla tipografia, più che a fregi e illustrazioni. In Italia, *_Giambattista Bodoni_* fondò una stamperia a Parma e sviluppò caratteri ispirati ai canoni neoclassici, riconoscibili per il forte contrasto dei tratti e l’equilibrio formale (@fig-storia-encyclopedie).

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/encyclopedie-diderot-alembert-frontespizio.png"),
  [L’_Encyclopédie_ di _Denis Diderot_ e _Jean le Rond d’Alembert_.],
  alt: "Pagina dell’Encyclopédie di Denis Diderot e Jean le Rond d’Alembert.") <fig-storia-encyclopedie>

// Tavola 13 · 198:2120

=== Industria, pubblicità e nuovi linguaggi

La crescita del pubblico dei lettori e della *domanda editoriale*, insieme alle trasformazioni tecniche, modificò la produzione di libri e periodici. La composizione e la stampa si specializzarono progressivamente: testo, immagini e impaginazione richiedevano competenze e processi coordinati. Nel XIX secolo, il progetto grafico acquistò un ruolo sempre più riconoscibile nella comunicazione commerciale e culturale.

Il *manifesto* divenne uno dei suoi mezzi più diffusi. Poteva promuovere spettacoli, trasporti e beni di consumo, raggiungendo le persone nello spazio pubblico. Nuove tecniche di riproduzione e caratteri di grandi dimensioni ne cambiarono la presenza visiva. L’evoluzione del design riguarda quindi il rapporto fra *strumenti produttivi*, messaggio e destinatari.

I manifesti stampati con grandi caratteri in legno venivano ampiamente utilizzati nel corso del XIX secolo per pubblicizzare nuovi mezzi di trasporto, intrattenimento e beni di consumo.

Il manifesto divenne ancora più popolare grazie ai progressi nella *litografia*, sviluppata da _Alois Senefelder_ in Baviera alla fine del XVIII secolo. Sfruttando questa scoperta, le litografie a colori, chiamate cromolitografie, vennero ampiamente utilizzate nella seconda metà del XIX secolo.

*Glossario — Editoria.* L’editoria comprende la produzione, la pubblicazione e la distribuzione di opere, mettendo in relazione autori e lettori. Il progetto editoriale cura i contenuti e la loro forma: caratteri, impaginazione, immagini, materiali e supporti contribuiscono alla qualità della lettura.

*Produzione · Messaggio · Destinatari.*

Produzione, messaggio e destinatari: tre dimensioni del progetto grafico.

// Tavola 14 · 198:2487

=== Manifesti e cromolitografia

I designer crearono manifesti sempre più colorati che decoravano le pareti delle città, pubblicizzando eventi, spettacoli itineranti e prodotti per la casa. I designer delle cromolitografie disegnavano tutti gli elementi, testo e immagine, come un’unica opera d’arte; liberati dai vincoli tecnici della stampa a caratteri mobili, potevano inventare ornamenti fantasiosi e stili di scrittura a piacere.

In Francia si sviluppò un vero e proprio movimento legato ai manifesti pubblicitari; suo pioniere fu il designer *_Jules Chéret_*. Dagli anni Sessanta dell’Ottocento creò manifesti litografici su larga scala caratterizzati da colori vivaci, figure animate, superfici lavorate accostate a forme piatte e figure gioiose e dinamiche che catturavano l’essenza dello spirito della belle époque parigina di fine secolo. _Chéret_ disegnò più di mille manifesti nel corso della sua carriera (@fig-storia-cheret).

#figura-al-vivo(
  id: "fig-storia-cheret",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/jules-cheret-pantomimes-lumineuses-1892.png"),
  didascalia: [“_Pantomimes Lumineuses_” di _Jules Chéret_, 1892.],
  alt: "Manifesto a colori Pantomimes Lumineuses di Jules Chéret, 1892.",
  rapporto: 0.72105619499, ancoraggio: (0.5, 0.5),
)

// Tavola 15 · 198:2140

La *cromolitografia* rese le immagini a colori più diffuse e accessibili. Scatole di latta, confezioni e biglietti da visita adottarono cromie vivaci e tipografie ornamentali. Si diffusero anche gli scrap: figurine stampate con uccelli, fiori e altri soggetti, raccolte soprattutto dai bambini.

Riviste, giornali e libri raggiunsero un pubblico più ampio grazie anche alla composizione tipografica meccanizzata. La *Linotype* di _Ottmar Mergenthaler_, introdotta commercialmente nel 1886, accelerò la produzione delle pagine.

=== Arts and Crafts

Alla crescita dell’industria si affiancò il movimento Arts and Crafts, che difendeva la qualità dei materiali e del lavoro artigianale @vam2026-artigianato.#sito([Victoria and Albert Museum, Arts and Crafts: an introduction, aggiornato il 30 settembre 2026.], "https://www.vam.ac.uk/articles/arts-and-crafts-an-introduction") *_William Morris_* fondò la *Kelmscott Press* nel 1891: caratteri, margini, carta e illustrazioni erano progettati come un *insieme*, collegando leggibilità e qualità dell’oggetto libro.

=== L'Art Nouveau

La fine dell'Ottocento coincise con la fioritura dell'Art Nouveau, movimento artistico che investì trasversalmente tutte le discipline del progetto: architettura, moda, arredamento, grafica e design del prodotto. I suoi tratti distintivi erano la linea sinuosa e curvilinea, le forme astratte, i contorni marcati e le campiture piatte (elementi mutuati dalle stampe giapponesi *ukiyo-e*) insieme a un uso del colore come elemento dominante della composizione.

*Glossario — ukiyo-e.* L'ukiyo-e (浮世絵) è un genere di stampa artistica giapponese a blocchi di legno fiorito tra il XVII e il XIX secolo durante il periodo Edo. Il termine significa "immagini del mondo fluttuante" e ritrae con colori vivaci la vita urbana, i paesaggi, gli attori kabuki e le bellezze di quel tempo.

// Tavola 16 · 198:2501

Tra le opere più innovative del movimento si annovera il manifesto realizzato nel 1893 da *_Henri de Toulouse-Lautrec_* raffigurante la ballerina _Jane Avril_, allora in scena al Jardin de Paris.

Fu tuttavia *_Alphonse Mucha_*, giovane artista ceco attivo a Parigi, a diventare uno dei protagonisti più riconoscibili della grafica Art Nouveau. A partire dagli anni Novanta dell'Ottocento, elaborò composizioni, per lo più incentrate su figure femminili avvenenti, i cui capelli e abiti si dispiegavano in motivi ritmici, che aspiravano a una perfezione idealizzata. Nelle sue opere confluivano in equilibrio serrato elementi decorativi di ascendenza bizantina e islamica, scritte stilizzate e sinuose forme femminili. Come molti suoi contemporanei, _Mucha_ raggiunse la notorietà attraverso i manifesti, ma ricevette commissioni anche per copertine di riviste, packaging, progetti editoriali, materiali pubblicitari e persino francobolli (@fig-storia-mucha).

#figura-al-vivo(
  id: "fig-storia-mucha", file: path("/risorse-condivise/immagini/figure/storia-del-design/alphonse-mucha-primavera-1900.jpg"),
  didascalia: [_La Primavera_ di _Alphonse Mucha_, 1900.],
  alt: "Manifesto La Primavera di Alphonse Mucha, con una figura femminile e motivi ornamentali.",
  rapporto: 400 / 813, rifilo: false,
)
]
#[
#import "../template/stile.typ": sito, immagine


// Tavola 17 · 2257:229

=== Un’identità per l’industria

Nel 1907 AEG nominò *_Peter Behrens_* consulente artistico. Il suo lavoro collegava logo, pubblicità, packaging, prodotti e architettura: l’immagine dell’impresa prendeva forma attraverso molti *punti di contatto*. Il manifesto per le lampade a filamento metallico unisce il nome dell’azienda a una composizione concentrata sulla luce e sul prodotto. I Musei di Berlino considerano questo lavoro uno dei primi esempi di *corporate design*. Il caso mostra un cambiamento di scala: il designer non compone soltanto un singolo messaggio, ma costruisce relazioni riconoscibili tra artefatti diversi. La *coerenza* diventa una qualità del sistema (@fig-storia-aeg).#sito([Staatliche Museen zu Berlin, _Peter Behrens_, _AEG-Metallfadenlampe_.], "https://search.smb.museum/object/obj-931917")

#figura-al-vivo(
  id: "fig-storia-aeg", file: path("/risorse-condivise/immagini/figure/storia-del-design/behrens-aeg-metallfadenlampe-manifesto-1907.jpg"),
  didascalia: [_Peter Behrens_, manifesto AEG-Metallfadenlampe, 1907. Staatliche Museen zu Berlin, Kunstbibliothek. Foto: _Dietmar Katz_.],
  alt: "Manifesto AEG-Metallfadenlampe di Peter Behrens con il nome dell’azienda e il prodotto illuminante.",
  diritti: [Public Domain Mark 1.0, scheda Staatliche Museen zu Berlin.],
  rapporto: 2709 / 3500, rifilo: false,
)

// Tavola 18 · 198:2162

=== La grafica politica e la Prima Guerra Mondiale

Oltre alla sfera estetica, commerciale e aziendale, il design grafico assunse un ruolo di primo piano anche sul piano politico agli albori del Novecento, come testimoniano i manifesti e la propaganda visiva prodotti durante la Prima Guerra Mondiale. Con la stampa a colori ormai giunta a un elevato grado di maturità tecnica, i governi si servirono del manifesto per raccogliere fondi a sostegno dello sforzo bellico, stimolare la produttività sul fronte interno, demonizzare il nemico, incentivare l'arruolamento nelle forze armate e alimentare il morale della popolazione civile.

Il *Plakatstil* (tedesco per “stile del manifesto”), legato al Sachplakat (“manifesto dell’oggetto”), fu un movimento di grafica moderna nato in Germania intorno al 1905. Caratterizzato da una drastica riduzione degli elementi visivi, in favore di un’immagine chiara e semplificata, fu utilizzato per molti manifesti delle Potenze centrali, mentre gli Alleati, per i loro manifesti di propaganda, usarono principalmente illustratori di riviste esperti in immagini narrative realistiche.

// Tavola 19 · 198:2515 — continuazione del confronto precedente.

Il contrasto tra questi due approcci può essere approfondito mettendo a confronto il manifesto "Kanin-Felle abliefern! Das Heer braucht sie!" (Consegnate le pelli di coniglio! L'esercito ne ha bisogno!) del designer tedesco *_Gipkens_* con il lavoro "I Want You for U.S. Army" dell’americano *_James Montgomery Flagg_* (entrambi del 1917).

*_Gipkens_* esprimeva il suo soggetto attraverso segni e simboli ridotti a campiture di colore piatto all'interno di una composizione visiva unificata.

Al contrario, _Flagg_ usava lettere in grassetto e un ritratto realistico di una figura allegorica che si rivolgeva direttamente alla potenziale recluta.

Questi due manifesti mostrano approcci diversi alla propaganda visiva, senza esaurire la varietà del design grafico dell’epoca (@fig-storia-gipkens, @fig-storia-flagg).

#figura-al-vivo(
  id: "fig-storia-gipkens", file: path("/risorse-condivise/immagini/figure/storia-del-design/julius-gipkens-kanin-felle-manifesto-1917.jpg"),
  didascalia: [Manifesto di _Julius Gipkens_, 1917.],
  alt: "Manifesto Kanin-Felle abliefern! di Julius Gipkens, 1917, con figure ridotte a campiture piatte.",
  rapporto: 448 / 685, rifilo: false,
)

#figura-al-vivo(
  id: "fig-storia-flagg", file: path("/risorse-condivise/immagini/figure/storia-del-design/james-montgomery-flagg-i-want-you-1917.png"),
  didascalia: [Il manifesto di _James Montgomery Flagg_, 1917.],
  alt: "Manifesto I Want You for U.S. Army di James Montgomery Flagg, con una figura che si rivolge alla recluta.",
  rapporto: 1095 / 1436, rifilo: false,
)

=== Il Bauhaus

Il Bauhaus, una scuola di design tedesca fondata nel 1919 sotto la direzione dell'architetto _Walter Gropius_, divenne il crogiolo in cui le istanze dei principali movimenti artistici del primo Novecento furono esaminate e fuse in una visione progettuale organica.

Nei suoi anni iniziali la scuola adottò un'impostazione espressionista e utopica, per poi orientarsi progressivamente verso un approccio funzionalista.

Artisti e designer si proponevano di sancire una nuova unità tra arte e tecnologia, elaborando soluzioni formali, spesso fondate sulle geometrie pure del Modernismo, capaci di esprimere lo spirito di meccanizzazione dell'era della macchina (@fig-storia-bauhaus).

Tra i contributi più significativi alla teoria del design visivo si distinse quello di *_Moholy-Nagy_*, che introdusse un approccio sistematico alla comunicazione visiva, valorizzando il fotomontaggio, una tecnica basata sulla sovrapposizione o sull'accostamento di elementi fotografici distinti, come strumento illustrativo d'elezione.

_Moholy-Nagy_ promosse inoltre l'integrazione armonica di testo e immagine in un'unica composizione, nonché l'adozione di una tipografia funzionale e razionale (@fig-storia-moholy).#sito([MoMA, _László Moholy-Nagy_, _Structure of the World_.], "https://www.moma.org/collection/works/54521")

#figura-al-vivo(
  id: "fig-storia-bauhaus",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/joost-schmidt-bauhaus-ausstellung-1923.jpg"),
  didascalia: [Manifesto “_Bauhaus-Ausstellung 1923_”.],
  alt: "Manifesto dell’esposizione Bauhaus del 1923.",
  rapporto: 0.691133294187, ancoraggio: (0.5, 0.5),
)

#figura-al-vivo(
  id: "fig-storia-moholy", file: path("/risorse-condivise/immagini/figure/storia-del-design/moholy-nagy-structure-world-fotomontaggio-1925.jpg"),
  didascalia: [_László Moholy-Nagy_, _Structure of the World_, ca. 1925. Fotomontaggio. MoMA, inv. 508.1939.],
  alt: "Fotomontaggio Structure of the World di László Moholy-Nagy, circa 1925.",
  diritti: [© Artists Rights Society (ARS), New York / VG Bild-Kunst, Bonn.],
  rapporto: 1448 / 2000, rifilo: false,
)

// Tavola 20 · 198:2184

=== La Nuova Tipografia

Negli anni Venti, la Nuova Tipografia valorizzò *asimmetria*, gerarchie e integrazione fra testo e immagini. *_Jan Tschichold_* ne sistematizzò i principi in _Die neue Typographie_ (1928), diffondendo un linguaggio funzionale in manifesti, libri e materiali commerciali @bungard2010-tipografia.#sito([_Brigitta Bungard_, colloquio con la curatrice _Juliet Kinchin_ per The New Typography, MoMA, 12 febbraio 2010.], "https://www.moma.org/explore/inside_out/2010/02/12/rediscovering-the-new-typography/")

=== Art Déco e Streamline

*Art Déco* e *Streamline Moderne* si svilupparono tra gli anni Venti e Quaranta nell’arte, nell’architettura e nel design. Nel progetto grafico, zigzag, raggiere solari e linee geometriche ricorrevano in caratteri, manifesti e packaging, evocando lo spirito della nuova era tecnologica.

// Tavola 21 · 2532:307

=== Il Costruttivismo

Dopo la rivoluzione del 1917, il *Costruttivismo* propone un nuovo ruolo sociale per l’artista: un progettista che collega forme, materiali e produzione alla trasformazione della società. Manifesti, riviste e libri diventano strumenti di comunicazione collettiva, nei quali la tipografia partecipa alla costruzione del messaggio.#sito([MoMA.], "https://www.moma.org/calendar/galleries/5948")#super[, ]#sito([National Gallery of Art.], "https://www.nga.gov/artworks/93943-wendingen")

Queste ricerche circolano oltre i confini sovietici attraverso pubblicazioni, mostre e collaborazioni. *_El Lissitzky_* contribuisce a questo scambio internazionale. Nella copertina di _Wendingen_, linee, cerchi, piani di colore e lettere inclinate formano una composizione dinamica.

L’esempio permette di leggere insieme organizzazione dello spazio, contrasto e direzione. Il significato emerge dalle relazioni tra gli elementi e dalla funzione editoriale, dentro uno specifico contesto culturale e politico (@fig-storia-wendingen).

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/el-lissitzky-wendingen-copertina-1921-1923.jpg"),
  [_El Lissitzky_, _Wendingen_, 1921 (pubblicato 1923). Copertina litografica. National Gallery of Art, Washington, inv. 1995.77.4.],
  alt: "Copertina di Wendingen di El Lissitzky: linee, cerchi, piani di colore e lettere inclinate.",
  diritti: [CC0 1.0; National Gallery of Art, Washington.]) <fig-storia-wendingen>

// Tavola 22 · 2532:329

=== Il libro come strumento

Nel 1923 _El Lissitzky_ progetta a Berlino _Dlia golosa_ (_Per la voce_), una raccolta di tredici poesie di _Vladimir Mayakovsky_ destinate alla *lettura ad alta voce*. Le composizioni sono costruite con lettere, filetti e segni disponibili nelle tipografie: rosso e nero organizzano forme e parole.#sito([RISD Museum.], "https://risdmuseum.org/art-design/collection/dlia-golosa-voice-2006921")#super[, ]#sito([MoMA.], "https://www.moma.org/collection/works/14473")

Il libro comprende un *indice a tacche* lungo il margine, simile a quello di una rubrica. Il lettore può trovare rapidamente il componimento da recitare; ciascuna apertura mette in relazione testo e configurazione visiva.

Il progetto mostra come la grafica possa sostenere un’attività concreta. Sequenza, orientamento e consultazione fanno parte dell’oggetto libro: la forma contribuisce al suo uso, oltre che alla sua identità (@fig-storia-dlia-golosa).

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/el-lissitzky-dlia-golosa-per-voce-1923.jpg"),
  [_El Lissitzky_, _Dlia golosa_ (_Per la voce_), testi di _Vladimir Mayakovsky_, 1923. RISD Museum, inv. 2006.92.1.],
  alt: "Apertura di Dlia golosa, con composizioni tipografiche rosse e nere e indice a tacche.",
  diritti: [CC0 1.0; RISD Museum.]) <fig-storia-dlia-golosa>

// Tavola 23 · 2257:247

=== Isotype: rendere confrontabili i dati

Nella Vienna degli anni Venti, _Otto Neurath_ e il suo gruppo svilupparono un metodo per comunicare fatti sociali ed economici attraverso immagini. *_Marie Neurath_* trasformava dati e concetti in strutture comprensibili; *_Gerd Arntz_* disegnava i pittogrammi.#sito([University of Reading, Marie Neurath Collection: ruolo di transformer nel sistema Isotype.], "https://collections.reading.ac.uk/special-collections/collections/marie-neurath-collection/") Nel sistema poi chiamato *Isotype*, una quantità maggiore era rappresentata ripetendo *unità uguali*, anziché ingrandendo arbitrariamente una figura. Nell’atlante _Gesellschaft und Wirtschaft_ del 1930, ogni automobile del grafico riprodotto indica 2,5 milioni di veicoli. Immagini, disposizione e *legenda* lavorano insieme: la semplificazione orienta il confronto, mentre il valore delle unità resta esplicito. È un precedente importante della visualizzazione dei dati (@fig-storia-isotype).#sito([Gerd Arntz Web Archive, _Kraftwagenbestand der Erde_.], "https://gerdarntz.org/node/706/index.html")

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/neurath-arntz-isotype-automobili-mondo-1930.jpg"),
  [_Kraftwagenbestand der Erde_, da _Gesellschaft und Wirtschaft_, 1930. _Otto Neurath_ e _Gerd Arntz_. Ogni automobile rappresenta 2,5 milioni di veicoli. _Gerd Arntz_ Web Archive.],
  alt: "Grafico Isotype sul numero di automobili nel mondo: pittogrammi uguali ripetuti, ognuno pari a 2,5 milioni di veicoli.",
  diritti: [© Gerd Arntz; diritti riservati.],
  placement: top, scope: "parent") <fig-storia-isotype>

// Tavola 24 · 2257:265

=== La mappa come sistema di relazioni

*_Harry Beck_* elaborò il suo primo *diagramma* della metropolitana londinese nel 1931; la mappa fu pubblicata nel 1933. Sostituì il tracciato geografico con linee orizzontali, verticali e diagonali a 45 gradi, distribuendo le stazioni con spazi più regolari. Colori e simboli rendevano leggibili i percorsi e gli interscambi. La scelta privilegiava le *relazioni* utili al viaggio rispetto alla somiglianza con il territorio. Il caso chiarisce una funzione del *design dell’informazione*: selezionare ciò che serve a un compito. Una rappresentazione efficace può semplificare la realtà, purché il lettore sappia quali relazioni conserva e quali distanze altera (@fig-storia-beck).#sito([London Transport Museum, mappa di _Harry Beck_, 1933.], "https://shop.ltmuseum.co.uk/products/harry-beck-underground-map-1933")

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/beck-mappa-metropolitana-londra-1933.jpg"),
  [_Harry Beck_, diagramma della metropolitana di Londra, 1933. Riproduzione ufficiale del London Transport Museum.],
  alt: "Diagramma della metropolitana londinese del 1933 di Harry Beck, con linee schematiche, stazioni e interscambi.",
  diritti: [© TfL / London Transport Museum.],
  placement: top, scope: "parent") <fig-storia-beck>

// Tavola 25 · 198:2532

Nel suo articolo _New Kind of Printing Calls for New Design_, pubblicato sul «_Boston Evening Transcript_» il 29 agosto 1922, il designer editoriale _William Addison Dwiggins_ utilizzò l’espressione "*graphic design*" per descrivere il proprio ruolo nella strutturazione e nella gestione degli elementi visivi nel libro @preston2026-graphic.

=== Anni ‘40

Negli anni Quaranta emerse *_Paul Rand_*, designer americano capace di un approccio personale e originale alla modernità visiva. _Rand_ sapeva sfruttare con acutezza il potere simbolico del colore e della forma: in un manifesto del 1947 destinato a promuovere la pubblicità nella metropolitana di New York, ricorse a semplici geometrie elementari per costruire un'immagine astratta che alludeva a una figura e a un bersaglio, traducendo visivamente il concetto di "centrare l'obiettivo" attraverso la comunicazione pubblicitaria (@fig-storia-rand).

_Rand_ raccolse le proprie riflessioni sul progetto grafico in *_Thoughts on Design_* (1947) @rand1947-thoughts.#sito([_Paul Rand_, Thoughts on Design, prima edizione del 1947: archivio dell’autore.], "https://www.paulrand.design/writing/books/thoughts-on-design-1st-edition.html") Il suo lavoro mette in relazione *forma e comunicazione*: colore, composizione e sintesi visiva contribuiscono alla chiarezza del messaggio.

Fra i suoi *progetti storici* di identità aziendale compaiono Westinghouse, Yale, ABC, UPS e IBM. I marchi possono cambiare nel tempo: l’analisi deve considerare la versione del segno e le *regole* che ne guidano l’impiego sui diversi supporti.

#figura-al-vivo(
  id: "fig-storia-rand", file: path("/risorse-condivise/immagini/figure/storia-del-design/paul-rand-subway-posters-score-1947.png"),
  didascalia: [Manifesto di _Paul Rand_ per promuovere la metro di New York (1947).],
  alt: "Manifesto di Paul Rand del 1947 per la pubblicità nella metropolitana di New York, con geometrie che richiamano una figura e un bersaglio.",
  rapporto: 450 / 625, rifilo: false,
)

// Tavola 26 · 198:2256

=== Design editoriale e griglie

*_Alexey Brodovitch_*, direttore artistico di «_Harper’s Bazaar_» dal 1934 al 1958, costruì un ritmo di lettura alternando layout articolati e ampi *spazi bianchi*, anche attraverso il lavoro di _Richard Avedon_ (@fig-storia-brodovitch).

Nel dopoguerra, _Henry Wolf_ e _Otto Storch_ integrarono concetto, testo, immagine e tipografia. Televisione e cinema aprirono nuovi spazi alla *grafica animata*.

// Un solo raw contiene le tre aperture; non ripetere l’intera immagine per ciascun crop Figma.
// Il collage conserva intere le tre aperture e segue la larghezza della colonna.

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/brodovitch-harpers-bazaar-tre-aperture-editoriali.jpg"),
  [Pagine di «_Harper’s Bazaar_», direzione artistica di _Alexey Brodovitch_.],
  alt: "Tre aperture editoriali di Harper’s Bazaar disposte verticalmente, sotto la direzione artistica di Alexey Brodovitch.",
  placement: top) <fig-storia-brodovitch>

=== Lo stile svizzero

Negli anni Cinquanta e Sessanta, lo stile tipografico svizzero privilegiò caratteri senza grazie, composizioni asimmetriche e *griglie*. *_Josef Müller-Brockmann_* ne fu un protagonista. La griglia organizzava testo e immagini secondo relazioni ripetibili, sostenendo la *coerenza* tra pagine, manifesti e sistemi informativi (@fig-storia-musica-viva).#sito([MoMA, _Josef Müller-Brockmann_, _Musica Viva_.], "https://www.moma.org/collection/works/4885")

#figura-al-vivo(
  id: "fig-storia-musica-viva",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/muller-brockmann-musica-viva-manifesto-1957.jpg"),
  didascalia: [_Josef Müller-Brockmann_, _Musica Viva_, 1957. Fotolitografia. MoMA, dono dell’artista.],
  alt: "Manifesto Musica Viva di Josef Müller-Brockmann, 1957.",
  rapporto: 0.71, ancoraggio: (0.5, 0.5),
)

// Tavola 27 · 2532:351

=== L’identità come programma

Nel 1962 _Otl Aicher_ e il *gruppo E5* della Hochschule für Gestaltung di Ulm avviano per Lufthansa il progetto 1400. Il segno della gru, disegnato nel 1918 da _Otto Firle_ per Deutsche Luft-Reederei, viene precisato e inserito in un *programma coordinato*.#sito([Lufthansa.], "https://www.lufthansa.com/de/en/100-years/crane")#super[, ]#sito([HfG-Archiv Ulm.], "https://hfg-archiv.museumulm.de/en/bequests/the-bequest-of-otl-aicher/")

Proporzioni, colori e regole di applicazione collegano aerei, biglietti, etichette per bagagli e architettura. Criteri condivisi mantengono riconoscibile l’identità su supporti diversi, realizzati e aggiornati da persone diverse.

Il caso mostra che il progetto riguarda anche la gestione dell’identità. Una griglia organizza la singola composizione; un programma stabilisce come più composizioni appartengano alla stessa famiglia. Il designer definisce gli artefatti e le regole che ne guidano la continuità (@fig-storia-lufthansa).

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/lufthansa-programma-identita-1962.svg"),
  [Schema analitico sul programma d’identità. Caso storico: _Otl Aicher_ e gruppo E5, Lufthansa, 1962. Fonti: Lufthansa; HfG-Archiv Ulm.],
  alt: "Schema del programma Lufthansa: proporzioni, colore e disposizione coordinano aerei, biglietti, etichette per bagagli e spazi.",
  placement: bottom, scope: "parent") <fig-storia-lufthansa>

// Tavola 28 · 2532:402

=== Una famiglia per orientarsi

Per i Giochi olimpici di Monaco del 1972, il *Dipartimento XI* diretto da _Otl Aicher_ coordina pubblicazioni, manifesti, biglietti e segnaletica. _Gerhard Joksch_ è responsabile dei pittogrammi sportivi; _Alfred Kern_ del design dell’informazione, dei pittogrammi informativi e della segnaletica @holt-monaco.#sito([The Rainbow Games.], "https://www.otlaicher.de/en/articles/the-rainbow-games/")#super[, ]#sito([Design as a team sport.], "https://www.otlaicher.de/en/articles/design-as-a-team-sport/")

Colori, caratteri, formati e griglie creano una *parentela visiva*: le applicazioni variano conservando caratteristiche riconoscibili. La coerenza organizza quindi la diversità delle funzioni, dalla comunicazione dell’evento all’orientamento dei visitatori.

Simboli e informazioni vengono collegati ai luoghi in cui occorre scegliere una direzione o riconoscere un servizio. I pittogrammi mirano a superare le barriere linguistiche, senza garantire comprensione automatica: il significato va letto nel contesto. Identità e orientamento condividono così un linguaggio per compiti diversi (@fig-storia-monaco).

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/monaco-1972-famiglia-visiva-orientamento.svg"),
  [Schema analitico: parentela visiva e compiti diversi. Caso storico: Dipartimento XI diretto da _Otl Aicher_, Monaco 1972. Fonti: IDZ, _The Rainbow Games_ e _Design as a team sport_.],
  alt: "Schema di Monaco 1972: colore, caratteri, formato e griglia collegano informazione sull’evento e orientamento nello spazio.",
  placement: top, scope: "parent") <fig-storia-monaco>

// Completa le figure mobili di questa sezione prima degli esempi successivi.
// È un vincolo d'ordine nativo, senza imporre un folio o dividere la prosa.

// Tavola 29 · 198:2595

=== Anni ‘60

Negli anni Sessanta, *_Herb Lubalin_* sfruttò le potenzialità della fotocomposizione per esplorare nuove frontiere tipografiche: lettere sovrapposte, spaziature compresse, ritmi visivi inediti.

Tra i suoi lavori più noti figura il logo per la rivista “_Avant Garde_”, poi divenuto uno dei caratteri più celebri dell'epoca (@fig-storia-avant-garde).

#figura-al-vivo(
  id: "fig-storia-avant-garde", file: path("/risorse-condivise/immagini/figure/storia-del-design/herb-lubalin-avant-garde-copertina-1968.png"),
  didascalia: [Copertina di _Avant Garde_ (1968), con il logo di _H. Lubalin_.],
  alt: "Copertina completa di Avant Garde del 1968 con il logotipo disegnato da Herb Lubalin.",
  rapporto: 1227 / 1281, rifilo: false,
)

In parallelo, la pubblicità attraversava una propria rivoluzione creativa, fondata su titoli arguti e immagini di grande impatto.

*_George Lois_*, tra i più influenti designer pubblicitari del periodo, firmò oltre novanta copertine per “_Esquire_”, usando la fotografia come strumento per affrontare temi scottanti quali i diritti civili e le tensioni politiche (@fig-storia-esquire).

#figura-al-vivo(
  id: "fig-storia-esquire", file: path("/risorse-condivise/immagini/figure/storia-del-design/george-lois-esquire-copertina-1968.jpg"),
  didascalia: [Copertina di _G. Lois_ per “_Esquire_” (1968).],
  alt: "Copertina fotografica di Esquire del 1968, diretta da George Lois.",
  rapporto: 1920 / 2456, rifilo: false,
)

// Tavola 30 · 198:2206

=== Anni ‘80 e la nascita dei software

Prima del *desktop publishing*, molti layout venivano tracciati a mano. Testi composti separatamente, bozze e riproduzioni fotografiche delle immagini erano assemblati su carta o cartoncino per preparare la stampa. Gli strumenti digitali modificarono questo processo, riunendo sempre più operazioni sullo schermo.

Nel 1984, *MacPaint*, programmato da _Bill Atkinson_ con il contributo progettuale di _Susan Kare_, mise a disposizione strumenti grafici azionati attraverso icone e mouse (@fig-storia-macpaint) @atkinsonHertzfeld2010-macpaint.#sito([_Bill Atkinson_ e _Andy Hertzfeld_, intervista e dimostrazione di MacPaint, registrata il 6 maggio 2010; trascrizione Computer History Museum © 2015.], "https://archive.computerhistory.org/resources/access/text/2015/12/102743021-05-01-acc.pdf") *PostScript*, sviluppato da Adobe, descriveva testo e immagini per la stampa. Nel 1985, *PageMaker* e la stampante LaserWriter contribuirono alla diffusione del *desktop publishing* sul Macintosh.#sito([Computer History Museum, Desktop Publishing.], "https://www.computerhistory.org/revolution/personal-computers/17/306")

Il cambiamento riguardava il flusso di lavoro: il designer poteva modificare impaginazione e caratteri, confrontare varianti e preparare materiali digitali per la produzione. Le nuove possibilità alimentavano anche la sperimentazione: sovrapposizioni, frammentazioni e variazioni tipografiche diventavano parte del tono della pagina.

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/macpaint-macintosh-interfaccia-1984.png"),
  [MacPaint sul Macintosh, prima versione, 1984.],
  alt: "Schermata della prima versione di MacPaint sul Macintosh, con strumenti grafici e area di disegno.",
  placement: top) <fig-storia-macpaint>

// Tavola 31 · 198:2552

=== Tipografia espressiva

Negli anni Novanta, *_David Carson_* portò una *tipografia* fortemente espressiva in riviste come _Beach Culture_ e _Ray Gun_. Sovrapposizioni, frammentazione e contrasti trasformavano la pagina in parte del *tono editoriale* (@fig-storia-ray-gun).

#figura-al-vivo(
  id: "fig-storia-ray-gun", file: path("/risorse-condivise/immagini/figure/storia-del-design/david-carson-ray-gun-copertina-1992.jpg"),
  didascalia: [Copertina di “_Ray Gun_”, sotto la direzione artistica di _D. Carson_ (1992).],
  alt: "Copertina di Ray Gun del 1992, sotto la direzione artistica di David Carson, con tipografia espressiva.",
  rapporto: 750 / 888, rifilo: false,
)

=== Montaggio e manipolazione

Il software ampliò le possibilità di *montaggio*: trasparenze, distorsioni e sovrapposizioni collegavano testo e immagini in composizioni complesse. Nel *1999*, il servizio postale statunitense emise un francobollo dedicato a _Frederick Law Olmsted_, progettato da *_Ethel Kessler_*. Il *montaggio* di ritratto, paesaggio e disegni richiama le diverse componenti del lavoro del paesaggista (@fig-storia-olmsted).

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/ethel-kessler-frederick-law-olmsted-francobollo-1999.png"),
  [_Ethel Kessler_, francobollo commemorativo _Frederick Law Olmsted_, USPS, 1999.],
  alt: "Francobollo USPS del 1999 dedicato a Frederick Law Olmsted: montaggio di ritratto, paesaggio e disegni.") <fig-storia-olmsted>

// Tavola 32 · 198:2229

=== Grafica e rivoluzione digitale

Il *World Wide Web* si sviluppò su *Internet*, una rete già esistente. Documenti collegati tra loro e accessibili attraverso un browser crearono un nuovo ambiente per la comunicazione visiva. Il caso del CERN (@fig-storia-cern) permette di distinguere l’infrastruttura di rete dal sistema di pubblicazione e navigazione.

Il *web design* condivide con la stampa testo, immagini e colore, ma introduce condizioni diverse: dimensioni dello schermo variabili, collegamenti ipertestuali, navigazione e contenuti che possono cambiare. Il progettista deve organizzare *informazioni e azioni*, considerando anche tempi di caricamento e strumenti di accesso.

La pagina non è più soltanto un oggetto concluso: entra in relazione con altre pagine e con i comportamenti delle persone. La funzione del designer si amplia alla costruzione di *sistemi coerenti*, mantenendo un compito centrale: dare forma e *chiarezza* alla comunicazione.

- *Rete* — Internet collega i sistemi.

- *Documenti* — Il Web pubblica e collega documenti.

- *Interazione* — Il progetto organizza informazioni e azioni.

Dall’infrastruttura alle azioni delle persone. Schema di lettura.

// Tavola 33 · 2257:301

=== Il web: documenti e collegamenti

Il web nacque al CERN per facilitare la *condivisione* di informazioni tra ricercatori. _Tim Berners-Lee_ propose il progetto nel 1989; alla fine del 1990 erano in funzione il primo server e il browser. Nel 1991 il software venne diffuso oltre il laboratorio. La pagina del progetto collegava descrizioni, istruzioni e risorse: l’*ipertesto* trasformava il documento in un punto di accesso a una rete di contenuti. Il browser originale permetteva anche di *modificare le pagine*. Nel 1993 CERN rese il software disponibile senza royalty.#sito([CERN, A short history of the Web.], "https://home.cern/science/computing/the-birth-of-the-web/short-history-web/") Questo caso ricorda che l’evoluzione del web riguarda insieme navigazione, produzione dei contenuti e *apertura* degli strumenti (@fig-storia-cern).#sito([CERN, browser WorldWideWeb su NeXT, screenshot del 1993.], "https://info.cern.ch/NextBrowser1.html")

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/cern-browser-worldwideweb-next-1993.png"),
  [Il browser WorldWideWeb di _Tim Berners-Lee_ su un computer NeXT. Screenshot del 1993. Fonte: CERN.],
  alt: "Browser WorldWideWeb di Tim Berners-Lee su NeXT, screenshot del 1993 con documenti e collegamenti ipertestuali.",
  diritti: [© CERN. Uso didattico e informativo con credito CERN.],
  placement: top, scope: "parent") <fig-storia-cern>

// Tavola 34 · 2266:300

=== Dall’artefatto al sistema

La storia del design non è una successione di stili isolati. Un nuovo *mezzo* cambia ciò che si può produrre e distribuire; il progetto gli dà una forma comprensibile. La stampa moltiplica le copie, l’*identità coordinata* collega artefatti diversi, l’interfaccia organizza *azioni e risposte*. In ciascun caso, le scelte visive devono essere lette insieme al pubblico, al compito e agli strumenti disponibili.

- *Riprodurre* — Stampa e tipografia: la pagina rende ripetibile un messaggio.

- *Coordinare* — Identità e griglie: le relazioni sostengono la coerenza fra artefatti.

- *Interagire* — Finestre, icone e link: la forma rende visibili azioni e stati.

- *Adattare* — Sistemi e contesti: il linguaggio cambia conservando il senso.

Traccia di lettura delle trasformazioni del progetto. Elaborazione didattica; i passaggi possono coesistere.


// Testo continuo dalle tavole correnti 35–66. Non usa coordinate di impaginazione.

// Le visuali restano originali condivisi; didascalie e richiami sono testo nativo.
]
#[
#import "../template/stile.typ": sito, immagine, schermata


== Storia delle interfacce digitali

*_Forma, contenuto e comportamento vanno letti insieme._*

Una chiave di lettura

=== Una storia di relazioni

Ogni tendenza racconta una storia visiva, intrecciandosi con le tecnologie disponibili e i valori culturali del momento. Si evolve organicamente, portando con sé l’eredità del passato mentre guarda al futuro.

Nelle pagine seguenti distinguiamo modelli d’interazione, sistemi di progettazione e scelte estetiche. Per ogni esempio osserviamo quali informazioni mette in evidenza, come rende riconoscibili le azioni e quali compromessi introduce.

// Tavole 36–38: le tappe sono un elenco nativo, senza il tracciato metro.

=== Le origini

Il 9 dicembre 1968, *_Douglas Engelbart_* e il suo gruppo presentarono *NLS* (oN-Line System). La dimostrazione, poi nota come “*The Mother of All Demos*”, mostrava mouse, collegamenti ipertestuali, elaborazione di testi e *lavoro collaborativo* con comunicazione audio e video. Il computer veniva proposto come strumento per organizzare conoscenza e cooperare @engelbartEnglish1968-nls.#sito([_Douglas C. Engelbart_ e _William K. English_, A research center for augmenting human intellect, 9 dicembre 1968.], "https://doi.org/10.1145/1476589.1476645") Questo evento contribuì a trasformare la percezione dei computer, presentandoli come strumenti di collaborazione e produttività e ampliando la loro funzione oltre la mera esecuzione di calcoli complessi.

Lo *Xerox Alto*, realizzato al PARC nel 1973, era un *sistema di ricerca* con schermo grafico, mouse e rete. L’interfaccia dipendeva dai *programmi*: Bravo lavorava sui documenti, Gypsy sul taglia e incolla, Smalltalk su finestre e strumenti grafici. Queste esperienze contribuirono alle convenzioni sviluppate nelle interfacce successive.#sito([Computer History Museum, Xerox Alto: Bravo, Gypsy e Smalltalk.], "https://www.computerhistory.org/revolution/input-output/14/347")

*Tre momenti della ricerca sulle interfacce grafiche.*

- *1968* — NLS
- *1973* — Xerox Alto
- *1980 circa* — Smalltalk-80

La schermata Smalltalk-80 (@fig-storia-36-1) documenta finestre e strumenti grafici.

#figura-nel-testo(
  id: "fig-storia-36-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/smalltalk-80-interfaccia-finestre-1980.jpg"),
  didascalia: [Smalltalk-80: finestre e strumenti grafici, circa 1980. PARC Library, Computer History Museum.],
  diritti: [© PARC (Palo Alto Research Center, Incorporated).],
  alt: "Smalltalk-80: finestre e strumenti grafici, circa 1980. PARC Library, Computer History Museum.",
  rapporto: 600 / 705,
  colonne: 2,
  altezza: 110mm,
)

=== Il paradigma WIMP

Il *paradigma WIMP* riunisce Windows, Icons, Menus e Pointer: finestre, icone, menu e puntatore. Questi elementi organizzano un linguaggio di interazione riconoscibile. Le metafore di scrivania, cartella e cestino offrono punti di riferimento, ma richiedono *apprendimento* e familiarità.

L’azione può essere collegata a un oggetto visibile e il risultato mostrato sullo schermo. Questo rapporto fra comando e *feedback* resta importante anche nelle interfacce touch, dove cambiano i gesti e le dimensioni dei controlli.

La @fig-storia-37-1 riunisce finestre, icone, menu e puntatore.

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/paradigma-wimp-finestre-icone-menu-puntatore.png"),
  [Paradigma WIMP: finestre, icone, menu e puntatore.],
  alt: "Paradigma WIMP: finestre, icone, menu e puntatore.",
  placement: bottom, scope: "parent") <fig-storia-37-1>

#[
  #show heading.where(level: 3): it => block(above: 14pt, below: 4pt, sticky: true)[
    // Conserva le righe alte 14 pt del titolo ordinario anche con il font pixel.
    #set text(font: "Press Start 2P", size: 9.5pt, weight: 400, hyphenate: false,
      top-edge: 12.6pt, bottom-edge: -1.4pt)
    #set par(justify: false, leading: 0pt)
    #context counter(heading).display("1.1.1.")#h(3pt)#it.body
  ]
  === Un linguaggio di pochi pixel
]

Le icone del Macintosh mostrano come i limiti tecnici possano diventare materia del progetto. *_Susan Kare_* lavorava anche su carta quadrettata: ogni quadrato corrispondeva a un *pixel*. Nelle icone del sistema, le forbici suggerivano il taglio del testo e il cestino la cancellazione dei file. La figura non decorava soltanto lo schermo: traduceva un’*azione* in un segno riconoscibile. _Kare_ contribuì anche al progetto di MacPaint; _Bill Atkinson_ racconta che osservarla usare il programma gli suggeriva modifiche e nuove funzioni. Il *linguaggio visivo* e il comportamento dell’interfaccia crescevano quindi insieme, attraverso il confronto con un’utilizzatrice reale @atkinsonHertzfeld2010-macpaint.#sito([_Bill Atkinson_ e _Andy Hertzfeld_, intervista su MacPaint, registrata il 6 maggio 2010; passaggio su _Susan Kare_ a p. 9 della trascrizione © CHM 2015.], "https://archive.computerhistory.org/resources/access/text/2015/12/102743021-05-01-acc.pdf")

Lo schizzo a quadretti (@fig-storia-38-1) mostra il rapporto fra disegno e pixel.

Fonte della @fig-storia-38-1.#sito([_Susan Kare_, Graphic icon sketch, 1982–1983. Matita e inchiostro su carta quadrettata. MoMA e SFMOMA, dono della designer.], "https://www.moma.org/collection/works/188386")

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/susan-kare-graphic-icon-sketch-1982-1983.jpg"),
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

#figura-nel-testo(
  id: "fig-storia-40-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/cern-primo-sito-mobile-cattura-2026.png"),
  didascalia: [CERN · viewport stretto · archivio / tema storico#sito([CERN · viewport stretto; The World Wide Web project.], "https://info.cern.ch/hypertext/WWW/TheProject.html") <nota-cern-viewport-progetto>],
  alt: "CERN · viewport stretto archivio / tema storico · info.cern.ch",
  rapporto: 480 / 660,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/cern-primo-sito-desktop-cattura-2026.png"),
  [CERN · The World Wide Web project · archivio / tema storico#sito([CERN · viewport stretto; The World Wide Web project.], "https://info.cern.ch/hypertext/WWW/TheProject.html") <nota-layout-01-039>],
  alt: "CERN · The World Wide Web project archivio / tema storico · info.cern.ch") <fig-storia-40-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/berkshire-hathaway-homepage-2026.png"),
  [Berkshire Hathaway · homepage · fonte ufficiale#sito([Berkshire Hathaway · homepage], "https://www.berkshirehathaway.com/")],
  alt: "Berkshire Hathaway · homepage fonte ufficiale · berkshirehathaway.com") <fig-storia-40-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/space-jam-sito-1996-cattura-2026.png"),
  [Warner Bros. · Space Jam, 1996 · archivio / tema storico#sito([Warner Bros. · Space Jam, 1996], "https://www.spacejam.com/1996/")],
  alt: "Warner Bros. · Space Jam, 1996 archivio / tema storico · spacejam.com") <fig-storia-40-4>

#figura-nel-testo(
  id: "fig-storia-39-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primo-web-home.png"),
  didascalia: [Caffè TTC · Il primo web. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Il primo web], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=html")],
  alt: "Pagina iniziale di Caffè TTC · Il primo web: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 41–42 · Web 2.0

=== Web 2.0

Negli anni Duemila, blog, social network e piattaforme di condivisione cambiano il ruolo degli utenti: da semplici lettori diventano *protagonisti*, in grado di produrre e diffondere contenuti. Molte interfacce adottano uno stile riconoscibile, fatto di *gradienti*, ombre, pulsanti lucidi e angoli arrotondati.

Queste scelte visive non definiscono il web 2.0. Un modello di partecipazione e uno stile grafico sono due cose distinte: la possibilità di pubblicare, commentare o collaborare riguarda il *funzionamento* del servizio, non il suo aspetto. Una piattaforma può essere pienamente partecipativa anche con un’interfaccia essenziale, così come un sito dall’aspetto «lucido» può non offrire alcuna forma di interazione.

Il repertorio lucido non definisce il Web 2.0: partecipazione e aspetto dell’interfaccia sono dimensioni diverse. L’esempio della @fig-storia-41-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-42-1, @fig-storia-42-2, @fig-storia-42-3, @fig-storia-42-4.

#figura-nel-testo(
  id: "fig-storia-42-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/jquery-mobile-tema-classic-2026.png"),
  didascalia: [OpenJS · jQuery Mobile Classic · archivio / tema storico#sito([OpenJS · jQuery Mobile Classic], "https://demos.jquerymobile.com/1.4.5/theme-classic/")],
  alt: "OpenJS · jQuery Mobile Classic archivio / tema storico · demos.jquerymobile.com",
  rapporto: 480 / 900,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/jquery-ui-themeroller-2026.png"),
  [OpenJS · jQuery UI ThemeRoller · screenshot#sito([OpenJS · jQuery UI ThemeRoller], "https://jqueryui.com/themeroller/")],
  alt: "OpenJS · jQuery UI ThemeRoller screenshot · jqueryui.com") <fig-storia-42-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/wordpress-tema-default-kubrick-2026.png"),
  [WordPress · Default / Kubrick · archivio / tema storico#sito([WordPress · Default / Kubrick], "https://wordpress.org/themes/default/")],
  alt: "WordPress · Default / Kubrick archivio / tema storico · wordpress.org") <fig-storia-42-3>

#figura-nel-testo(
  id: "fig-storia-42-4",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/jquery-mobile-versione-1-3-2-cattura-2026.png"),
  didascalia: [OpenJS · jQuery Mobile 1.3.2 · archivio / tema storico#sito([OpenJS · jQuery Mobile 1.3.2], "https://demos.jquerymobile.com/1.3.2/")],
  alt: "OpenJS · jQuery Mobile 1.3.2 archivio / tema storico · demos.jquerymobile.com",
  rapporto: 480 / 900,
  colonne: 2,
  altezza: 110mm,
)

#figura-nel-testo(
  id: "fig-storia-41-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-web-2-0-home.png"),
  didascalia: [Caffè TTC · Web 2.0. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Web 2.0], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=web2")],
  alt: "Pagina iniziale di Caffè TTC · Web 2.0: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 43–44 · Scheumorfismo

=== Scheumorfismo

Lo scheumorfismo, dal greco skeûos («contenitore» o «utensile») e morphḗ («forma»), trasferisce nel digitale forme riconoscibili del mondo fisico: una cartella, un cestino o le pagine di un taccuino. Può aiutare a intuire una *funzione* attraverso una metafora già nota. Quando diventa *realismo decorativo*, usa texture, rilievi e ombre per imitare materiali. La familiarità dipende però dall’esperienza della persona: una metafora poco conosciuta può risultare inefficace @chan2024-scheumorfismo.#sito([_Megan Chan_, Skeuomorphism, Nielsen Norman Group, 15 marzo 2024.], "https://www.nngroup.com/articles/skeuomorphism/")

La metafora fisica offre indizi soltanto a chi la conosce. Texture e rilievi devono sostenere il compito. L’esempio della @fig-storia-43-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-44-1, @fig-storia-44-2, @fig-storia-44-3, @fig-storia-44-4.

#figura-nel-testo(
  id: "fig-storia-44-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/webamp-lettore-musicale-2026.png"),
  didascalia: [_Jordan Eldredge_ · Webamp · sito attuale#sito([_Jordan Eldredge_ · Webamp], "https://webamp.org/")],
  alt: "Jordan Eldredge · Webamp sito attuale · webamp.org",
  rapporto: 560 / 936,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/garageband-smart-guitar-2026.png"),
  [Apple · GarageBand Smart Guitar · fonte ufficiale#sito([Apple · GarageBand Smart Guitar], "https://www.apple.com/ios/garageband/")],
  alt: "Apple · GarageBand Smart Guitar fonte ufficiale · apple.com") <fig-storia-44-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/garageband-amplificatori-pedali-2026.png"),
  [Apple · GarageBand, amplificatori e pedali · fonte ufficiale#sito([Apple · GarageBand, amplificatori e pedali], "https://www.apple.com/mac/garageband/")],
  alt: "Apple · GarageBand, amplificatori e pedali fonte ufficiale · apple.com") <fig-storia-44-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/reason-rack-virtuale-2026.png"),
  [Reason Studios · rack virtuale · fonte ufficiale#sito([Reason Studios · rack virtuale], "https://www.reasonstudios.com/")],
  alt: "Reason Studios · rack virtuale fonte ufficiale · reasonstudios.com") <fig-storia-44-4>

#figura-nel-testo(
  id: "fig-storia-43-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-scheumorfismo-home.png"),
  didascalia: [Caffè TTC · Scheumorfismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Scheumorfismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=scheu")],
  alt: "Pagina iniziale di Caffè TTC · Scheumorfismo: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 45–46 · Flat design

=== Flat design

Il flat design nasce da una scelta di sottrazione: abbandona texture e simulazioni di materiali e punta su forme *bidimensionali*, campiture piene e una tipografia chiara. Si diffonde nelle interfacce degli anni Dieci, ma sarebbe un errore pensare che un’interfaccia graficamente semplice sia anche semplice da usare. Pulsanti e link, infatti, devono continuare a mostrare in *modo visibile* quale sia la loro funzione. Bastano accorgimenti discreti, come un’ombra misurata o una sottolineatura, per far capire all’utente che cosa è cliccabile, senza rinunciare all’essenzialità della composizione @moran2017-flat.#sito([_Kate Moran_, Flat-Design Best Practices, Nielsen Norman Group, 12 marzo 2017.], "https://www.nngroup.com/articles/flat-design-best-practices/")

Ridurre i materiali simulati non elimina il bisogno di indizi: azioni e stati devono restare riconoscibili. L’esempio della @fig-storia-45-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-46-1, @fig-storia-46-2, @fig-storia-46-3, @fig-storia-46-4.

#figura-nel-testo(
  id: "fig-storia-46-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/metro-ui-tiles-componenti-2026.png"),
  didascalia: [_Serhii Pimenov_ · Metro UI Tiles · screenshot#sito([_Serhii Pimenov_ · Metro UI Tiles], "https://v4.metroui.org.ua/tiles.html")],
  alt: "Serhii Pimenov · Metro UI Tiles screenshot · v4.metroui.org.ua",
  rapporto: 320 / 471,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/gov-uk-homepage-2026.png"),
  [Government Digital Service · GOV.UK · fonte ufficiale#sito([Government Digital Service · GOV.UK], "https://www.gov.uk/")],
  alt: "Government Digital Service · GOV.UK fonte ufficiale · gov.uk") <fig-storia-46-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/designmodo-flat-ui-accesso-2026.png"),
  [Designmodo · Flat UI, modulo di accesso · screenshot#nota-compatta([Designmodo · Flat UI, modulo di accesso; Designmodo · Flat UI], ("https://designmodo.github.io/Flat-UI/",), etichetta: ("https://designmodo.github.io/Flat-UI/",)) <nota-url-01-57>],
  alt: "Designmodo · Flat UI, modulo di accesso screenshot · designmodo.github.io") <fig-storia-46-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/designmodo-flat-ui-componenti-2026.png"),
  [Designmodo · Flat UI · screenshot#nota-compatta([Designmodo · Flat UI, modulo di accesso; Designmodo · Flat UI], ("https://designmodo.github.io/Flat-UI/",), etichetta: ("https://designmodo.github.io/Flat-UI/",)) <nota-layout-01-058>],
  alt: "Designmodo · Flat UI screenshot · designmodo.github.io", width: 66mm, placement: top, scope: "parent") <fig-storia-46-4>

#figura-nel-testo(
  id: "fig-storia-45-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-flat-design-home.png"),
  didascalia: [Caffè TTC · Flat design. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Flat design], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=flat")],
  alt: "Pagina iniziale di Caffè TTC · Flat design: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 47–48 · Material Design

=== Material Design

Presentato da Google nel 2014, *Material Design* organizza l’interfaccia come un sistema di superfici, livelli e movimenti. La carta è una metafora di partenza: ombre e sovrapposizioni indicano relazioni e possibilità d’azione. Il *movimento* spiega i passaggi tra stati. Componenti, tipografia e regole condivise mirano a rendere *coerenti* le esperienze su dispositivi diversi @jitkoff2014-material.#sito([_Nicholas Jitkoff_, annuncio di Material Design, Google Developers Blog, 25 giugno 2014.], "https://developers.googleblog.com/en/this-is-material-design/")

Superfici, gerarchie e transizioni appartengono a un sistema: la coerenza va verificata nell’uso. L’esempio della @fig-storia-47-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-48-1, @fig-storia-48-2, @fig-storia-48-3, @fig-storia-48-4.

#figura-nel-testo(
  id: "fig-storia-48-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/google-material-design-3-mobile-2026.png"),
  didascalia: [Google · Material Design 3 mobile · fonte ufficiale#nota-compatta([#([Google · Material Design 3 mobile; Google · Material Design 3])], ("https://m3.material.io/",), etichetta: ("https://m3.material.io/",)) <nota-storia-material-mobile-desktop>],
  alt: "Google · Material Design 3 mobile fonte ufficiale · m3.material.io",
  rapporto: 480 / 900,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/creative-tim-material-dashboard-3-2026.png"),
  [Creative Tim · Material Dashboard 3 · screenshot#sito([Creative Tim · Material Dashboard 3], "https://demos.creative-tim.com/material-dashboard-free/pages/dashboard")],
  alt: "Creative Tim · Material Dashboard 3 screenshot · demos.creative-tim.com") <fig-storia-48-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/google-material-design-3-desktop-2026.png"),
  [Google · Material Design 3 · fonte ufficiale#footnote(<nota-storia-material-mobile-desktop>)],
  alt: "Google · Material Design 3 fonte ufficiale · m3.material.io") <fig-storia-48-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/materialize-homepage-2026.png"),
  [Materialize · homepage · screenshot#sito([Materialize · homepage], "https://materializecss.com/")],
  alt: "Materialize · homepage screenshot · materializecss.com") <fig-storia-48-4>

#figura-nel-testo(
  id: "fig-storia-47-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-material-design-home.png"),
  didascalia: [Caffè TTC · Material Design. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Material Design], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=material")],
  alt: "Pagina iniziale di Caffè TTC · Material Design: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 49–50 · Neumorfismo
]
#[
#import "../template/stile.typ": sito, immagine, schermata


=== Neumorfismo

Il neumorfismo usa luci e *ombre* morbide per far apparire gli elementi come rilievi dello stesso materiale dello sfondo. La continuità cromatica produce un effetto delicato, quasi plastico. Proprio questa continuità può però indebolire il *contrasto* e nascondere lo stato dei controlli. L’effetto decorativo deve poter scomparire senza rendere ambiguo il comando: testo, icona, bordo e stato selezionato restano leggibili @malewicz-neumorfismo.#sito([_Michał Malewicz_, Neumorphism in user interfaces: rilievi, contrasto e stati dei controlli.], "https://hype4.academy/articles/design/neumorphism-in-user-interfaces")

Il rilievo può perdere leggibilità. Testo, bordi e stati attivi richiedono un contrasto indipendente dalle ombre. L’esempio della @fig-storia-49-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-50-1, @fig-storia-50-2, @fig-storia-50-3, @fig-storia-50-4.

#figura-nel-testo(
  id: "fig-storia-50-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/neumorphism-io-generatore-mobile-2026.png"),
  didascalia: [_Adam Giebl_ · Neumorphism.io mobile · fonte ufficiale#sito([_Adam Giebl_ · Neumorphism.io mobile], "https://neumorphism.io/")],
  alt: "Adam Giebl · Neumorphism.io mobile fonte ufficiale · neumorphism.io",
  rapporto: 480 / 900,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/akaspanion-ui-neumorphism-componenti-2026.png"),
  [_AKAspanion_ · UI Neumorphism · screenshot#sito([_AKAspanion_ · UI Neumorphism], "https://akaspanion.github.io/ui-neumorphism/")],
  alt: "AKAspanion · UI Neumorphism screenshot · akaspanion.github.io") <fig-storia-50-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/themesberg-neumorphism-ui-about-2026.png"),
  [Themesberg · Neumorphism UI About · screenshot#sito([Themesberg · Neumorphism UI About], "https://demo.themesberg.com/neumorphism-ui/html/pages/about.html")],
  alt: "Themesberg · Neumorphism UI About screenshot · demo.themesberg.com") <fig-storia-50-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/neumorphism-io-generatore-desktop-2026.png"),
  [_Adam Giebl_ · Neumorphism.io · fonte ufficiale#sito([_Adam Giebl_ · Neumorphism.io], "https://neumorphism.io/")],
  alt: "Adam Giebl · Neumorphism.io fonte ufficiale · neumorphism.io") <fig-storia-50-4>

#figura-nel-testo(
  id: "fig-storia-49-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-neumorfismo-home.png"),
  didascalia: [Caffè TTC · Neumorfismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Neumorfismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=neumo")],
  alt: "Pagina iniziale di Caffè TTC · Neumorfismo: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 51–52 · Glassmorfismo

=== Glassmorfismo

Il glassmorfismo suggerisce superfici di vetro attraverso traslucenza, sfocatura e sovrapposizioni. Il fondo resta percepibile mentre il pannello occupa un livello distinto. Nei sistemi ufficiali questi effetti hanno ruoli specifici: Fluent usa Acrylic per superfici transitorie, come menu e popover.#sito([Microsoft Learn, Acrylic material.], "https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic")#super[, ]#sito([Microsoft, Fluent 2: Material.], "https://fluent2.microsoft.design/material") La trasparenza va verificata su fondi diversi; un pannello elegante può perdere *leggibilità* quando cambiano immagini, luminosità e colori sottostanti.

Il fondo influenza la lettura del pannello. Trasparenza e sfocatura devono adattarsi al contenuto sottostante. L’esempio della @fig-storia-51-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-52-1, @fig-storia-52-2, @fig-storia-52-3, @fig-storia-52-4.

#figura-nel-testo(
  id: "fig-storia-52-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/apple-music-finestra-verticale-2026.png"),
  didascalia: [Apple Music · finestra verticale · sito attuale#sito([Apple Music · finestra verticale], "https://music.apple.com/us/new")],
  alt: "Apple Music · finestra verticale sito attuale · music.apple.com",
  rapporto: 1000 / 1250,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/windows-11-pannello-widgets-2021.png"),
  [Windows 11 · Widgets, 2021 · fonte ufficiale#sito([Windows 11 · Widgets, 2021; Windows 11 · Start], "https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/") <nota-storia-windows-11-widgets-start>],
  alt: "Windows 11 · Widgets, 2021 fonte ufficiale · blogs.windows.com") <fig-storia-52-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/windows-11-menu-start-2021.png"),
  [Windows 11 · Start · fonte ufficiale#sito([Windows 11 · Widgets, 2021; Windows 11 · Start], "https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/") <nota-layout-01-076>],
  alt: "Windows 11 · Start fonte ufficiale · blogs.windows.com") <fig-storia-52-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/visionos-app-store-2026.png"),
  [visionOS · App Store · fonte ufficiale#sito([visionOS · App Store], "https://www.apple.com/apple-vision-pro/")],
  alt: "visionOS · App Store fonte ufficiale · apple.com") <fig-storia-52-4>

#figura-nel-testo(
  id: "fig-storia-51-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-glassmorfismo-home.png"),
  didascalia: [Caffè TTC · Glassmorfismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Glassmorfismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=glass")],
  alt: "Pagina iniziale di Caffè TTC · Glassmorfismo: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 53–54 · Minimalismo

=== Minimalismo

Il minimalismo riduce gli elementi che non sostengono il contenuto o il compito. Spazio negativo, palette contenuta e gerarchie tipografiche guidano l’attenzione. Riduzione non significa assenza di struttura: se spariscono etichette, navigazione o indizi d’interazione, la pagina può diventare più difficile da usare. La qualità del risultato si valuta attraverso ciò che consente di leggere e fare, oltre che attraverso ciò che elimina @moran2015-minimalismo.#sito([_Kate Moran_, The Characteristics of Minimalism in Web Design, Nielsen Norman Group, 12 luglio 2015.], "https://www.nngroup.com/articles/characteristics-minimalism/")

Lo spazio negativo è una scelta: togliere elementi non significa togliere orientamento e feedback. L’esempio della @fig-storia-53-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-54-1, @fig-storia-54-2, @fig-storia-54-3, @fig-storia-54-4.

#figura-nel-testo(
  id: "fig-storia-54-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/studio-yoke-homepage-mobile-2026.png"),
  didascalia: [Studio Yoke · mobile · sito attuale#sito([Studio Yoke · mobile; Studio Yoke · desktop], "https://www.studioyoke.co.uk/") <nota-storia-studio-yoke-mobile-desktop>],
  alt: "Studio Yoke · mobile sito attuale · studioyoke.co.uk",
  rapporto: 480 / 760,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/kinfolk-homepage-2026.png"),
  [Kinfolk · homepage · sito attuale#sito([Kinfolk · homepage], "https://www.kinfolk.com/")],
  alt: "Kinfolk · homepage sito attuale · kinfolk.com") <fig-storia-54-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/apple-homepage-2026.png"),
  [Apple · homepage · sito attuale#sito([Apple · homepage], "https://www.apple.com/")],
  alt: "Apple · homepage sito attuale · apple.com") <fig-storia-54-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/studio-yoke-homepage-desktop-2026.png"),
  [Studio Yoke · desktop · sito attuale#sito([Studio Yoke · mobile; Studio Yoke · desktop], "https://www.studioyoke.co.uk/") <nota-storia-studio-yoke-mobile-desktop-locale-1>],
  alt: "Studio Yoke · desktop sito attuale · studioyoke.co.uk") <fig-storia-54-4>

#figura-nel-testo(
  id: "fig-storia-53-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-minimalismo-home.png"),
  didascalia: [Caffè TTC · Minimalismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Minimalismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=minimal")],
  alt: "Pagina iniziale di Caffè TTC · Minimalismo: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 55–56 · Y2K

=== Y2K

Con *Y2K* si indica una famiglia di richiami alla cultura visiva intorno al passaggio di millennio: cromature, bagliori, gradienti, pixel e finestre. Le reinterpretazioni contemporanee selezionano alcuni di questi caratteri senza riprodurre necessariamente una pagina storica. Per Spotify Wrapped 2023, il gruppo di design dichiarò un riferimento alle espressioni del primo internet, tradotte in un sistema attuale di layout stratificati e dinamici @spotify2023-wrapped.#sito([Spotify Newsroom, intervista a _Louisa Ferguson_ sul progetto di Wrapped 2023, 29 novembre 2023.], "https://newsroom.spotify.com/2023-11-29/wrapped-design-marketing-brand-creative-inside-spotify/")

Cromature e futurismo pop convivono con richiami al primo internet: sono repertori da rileggere, non date obbligate. L’esempio della @fig-storia-55-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-56-1, @fig-storia-56-2, @fig-storia-56-3, @fig-storia-56-4.

#figura-nel-testo(
  id: "fig-storia-56-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/bratz-homepage-mobile-2026.png"),
  didascalia: [Bratz · mobile · sito attuale#nota-compatta([#([Bratz · mobile; Bratz · desktop])], ("https://www.bratz.com/",), etichetta: ("https://www.bratz.com/",)) <nota-storia-bratz-mobile-desktop>],
  alt: "Bratz · mobile sito attuale · bratz.com",
  rapporto: 480 / 760,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/girls-who-code-girls-campagna-2022.png"),
  [Girls Who Code Girls · campagna 2022 · archivio / tema storico#sito([Girls Who Code Girls · campagna 2022], "https://www.girlswhocodegirls.com/")],
  alt: "Girls Who Code Girls · campagna 2022 archivio / tema storico · girlswhocodegirls.com") <fig-storia-56-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/camerons-world-collage-2026.png"),
  [Cameron’s World · collage · sito attuale#sito([Cameron’s World · collage], "https://www.cameronsworld.net/")],
  alt: "Cameron’s World · collage sito attuale · cameronsworld.net") <fig-storia-56-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/bratz-homepage-desktop-2026.png"),
  [Bratz · desktop · sito attuale#nota-compatta([#([Bratz · mobile; Bratz · desktop])], ("https://www.bratz.com/",), etichetta: ("https://www.bratz.com/",)) <nota-storia-bratz-mobile-desktop-locale-1>],
  alt: "Bratz · desktop sito attuale · bratz.com", width: 66mm, placement: top, scope: "parent") <fig-storia-56-4>

#figura-nel-testo(
  id: "fig-storia-55-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-y2k-home.png"),
  didascalia: [Caffè TTC · Y2K. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Y2K], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=y2k")],
  alt: "Pagina iniziale di Caffè TTC · Y2K: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 57–58 · Massimalismo

=== Massimalismo

Il massimalismo combina densità visiva, colori, motivi, immagini e caratteri differenti. Per trasformare questa ricchezza in un sistema leggibile, il progetto rende riconoscibili *gerarchie* e percorsi di lettura.

La quantità di elementi diventa una scelta espressiva, da mettere in relazione con contenuto, pubblico e compito. Anche una composizione ricca richiede pause e punti di riferimento: il lettore deve distinguere il messaggio principale dalle informazioni secondarie.

Coordinare la densità è parte del progetto. Arngren, catalogo online norvegese di elettronica, gadget e veicoli, mostra un caso limite di accumulazione, non un modello di usabilità. L’esempio della @fig-storia-57-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-58-1, @fig-storia-58-2, @fig-storia-58-3, @fig-storia-58-4.

#figura-nel-testo(
  id: "fig-storia-58-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/toiletpaper-homepage-mobile-2026.png"),
  didascalia: [TOILETPAPER · mobile · sito attuale#sito([TOILETPAPER · mobile; TOILETPAPER · desktop], "https://www.toiletpapermagazine.org/") <nota-storia-toiletpaper-mobile-desktop>],
  alt: "TOILETPAPER · mobile sito attuale · toiletpapermagazine.org",
  rapporto: 480 / 760,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/one-and-all-sito-2019.png"),
  [ONE&ALL · 2019 · archivio / tema storico#sito([ONE&ALL · 2019], "https://www.obergine.com/news-and-blog/2019/november-2019/maximalist-web-design")],
  alt: "ONE&ALL · 2019 archivio / tema storico · obergine.com") <fig-storia-58-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/arngren-catalogo-2026.png"),
  [Arngren · catalogo · sito attuale#sito([Arngren · catalogo], "https://www.arngren.net/")],
  alt: "Arngren · catalogo sito attuale · arngren.net") <fig-storia-58-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/toiletpaper-homepage-desktop-2026.png"),
  [TOILETPAPER · desktop · sito attuale#sito([TOILETPAPER · mobile; TOILETPAPER · desktop], "https://www.toiletpapermagazine.org/") <nota-storia-toiletpaper-mobile-desktop-locale-1>],
  alt: "TOILETPAPER · desktop sito attuale · toiletpapermagazine.org") <fig-storia-58-4>

#figura-nel-testo(
  id: "fig-storia-57-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-massimalismo-home.png"),
  didascalia: [Caffè TTC · Massimalismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Massimalismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=max")],
  alt: "Pagina iniziale di Caffè TTC · Massimalismo: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavole 59–60 · Brutalismo e neobrutalismo

=== Brutalismo e neobrutalismo

Nel web, il brutalismo presenta spesso strutture esplicite, caratteri utilitari e un’apparenza poco rifinita. Il neobrutalismo ne rielabora la forza visiva con *bordi* spessi, *ombre* nette, grandi titoli e colori accesi. La homepage di Gumroad offre un esempio di questa seconda direzione @sheikh2025-neobrutalismo.#sito([_Hayat Sheikh_, Neobrutalism: Definition and Best Practices, Nielsen Norman Group, 11 aprile 2025.], "https://www.nngroup.com/articles/neobrutalism/") Un’identità marcata richiede comunque gerarchie, spazi e stati chiari: un contrasto cromatico vistoso non garantisce un contrasto sufficiente per leggere.

Nel neobrutalismo bordi e ombre diventano segni espliciti. Il contrasto espressivo non garantisce la leggibilità. L’esempio della @fig-storia-59-1 riprende i dati del bar nelle diverse varianti.



*Esempi reali.* @fig-storia-60-1, @fig-storia-60-2, @fig-storia-60-3, @fig-storia-60-4.

#figura-nel-testo(
  id: "fig-storia-60-1",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/gumroad-homepage-mobile-2026.png"),
  didascalia: [Gumroad · mobile · sito attuale#nota-compatta([Gumroad · mobile; Gumroad · desktop], "https://gumroad.com/") <nota-storia-gumroad-mobile-desktop>],
  alt: "Gumroad · mobile sito attuale · gumroad.com",
  rapporto: 480 / 760,
  colonne: 2,
  altezza: 110mm,
)

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/neobrutalism-components-homepage-2026.png"),
  [Neobrutalism components · sito implementato · sito attuale#sito([Neobrutalism components · sito implementato], "https://www.neobrutalism.dev/")],
  alt: "Neobrutalism components · sito implementato sito attuale · neobrutalism.dev") <fig-storia-60-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/panda-css-homepage-2026.png"),
  [Panda CSS · homepage · sito attuale#nota-compatta([Panda CSS · homepage], "https://panda-css.com/")],
  alt: "Panda CSS · homepage sito attuale · panda-css.com") <fig-storia-60-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/gumroad-homepage-desktop-2026.png"),
  [Gumroad · desktop · sito attuale#nota-compatta([Gumroad · mobile; Gumroad · desktop], "https://gumroad.com/") <nota-storia-gumroad-mobile-desktop-locale-1>],
  alt: "Gumroad · desktop sito attuale · gumroad.com") <fig-storia-60-4>

#figura-nel-testo(
  id: "fig-storia-59-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-neobrutalismo-home.png"),
  didascalia: [Caffè TTC · Brutalismo e neobrutalismo. Schermata dell’esempio web; bar e contenuti sono fittizi.#sito([Caffè TTC · Brutalismo e neobrutalismo], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=neo")],
  alt: "Pagina iniziale di Caffè TTC · Brutalismo e neobrutalismo: navigazione, proposte del bar e informazioni pratiche.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)
]
#[
#import "../template/stile.typ": sito, immagine, schermata


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

I *caratteri variabili* permettono di modificare peso, larghezza e altre qualità delle lettere entro gli assi previsti dal progetto. *Roboto Flex* mostra come una famiglia possa adattare titoli e testi a ruoli differenti.#nota-compatta(text("Migrating to variable fonts"), "https://codelabs.developers.google.com/migrating-variable-fonts", etichetta: text("codelabs.developers.google.com/migrating-variable-fonts")) Material 3 Expressive combina invece forme, colore e movimento per dare maggiore identità alle interfacce @google-expressive.#sito([Google Design, Better, Easier, Emotional UX: ricerca e limiti contestuali di Material 3 Expressive.], "https://design.google/library/expressive-material-design-google-research") Una possibile direzione è un linguaggio visivo che cambia con lo spazio e le *preferenze* della persona, mantenendo gerarchie riconoscibili. L’espressività richiede misura: deformazioni e animazioni non devono ostacolare la lettura.

Una gerarchia stabile permette di adattare il carattere delle lettere senza disorientare. Espressività, deformazioni e movimento vanno dosati per proteggere la lettura. La @fig-storia-62-1 mostra il laboratorio Caffè TTC su schermo ampio; la @fig-storia-62-2 documenta gli assi di Roboto Flex.



#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/roboto-flex-assi-carattere-variabile-google.png"),
  [Assi di Roboto Flex. Google Developers.#sito([Assi di Roboto Flex.], "https://codelabs.developers.google.com/migrating-variable-fonts")],
  diritti: [Google Developers. Contenuti del Codelab CC BY 4.0, salvo eccezioni dichiarate.],
  alt: "Assi di Roboto Flex. Google Developers.") <fig-storia-62-2>

#figura-nel-testo(
  id: "fig-storia-62-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-adattabile-home-desktop.png"),
  didascalia: [Caffè TTC · Tipografia adattabile, schermo ampio. Il campione usa Roboto Flex e offre controlli per variare il carattere.#sito([Caffè TTC · Tipografia adattabile], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=adattabile")],
  alt: "Caffè TTC, laboratorio tipografico su schermo ampio: campione La tua lettura, preset e controlli degli assi di Roboto Flex.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavola 63 · Profondità

=== Profondità e materiali dinamici

La *profondità* può distinguere contenuti, strumenti e stati dell’interfaccia. *Liquid Glass* organizza controlli e navigazione sopra il contenuto con un materiale dinamico.#nota-compatta([#text("Materials")#text("; ")Liquid Glass, chiaro; Liquid Glass, scuro], ("https://developer.apple.com/design/human-interface-guidelines/materials",), etichetta: (text("developer.apple.com/…/materials"),)) <nota-url-01-106> Nelle linee guida di *visionOS*, finestre e volumi occupano uno spazio percepibile attraverso distanza, occlusione e ombre.#nota-compatta(text("Spatial layout"), "https://developer.apple.com/design/human-interface-guidelines/spatial-layout/", etichetta: text("developer.apple.com/…/spatial-layout")) Questi esempi aprono una possibile direzione: superfici capaci di adattarsi al contesto e comunicare relazioni. La tridimensionalità serve quando chiarisce il compito. Testi sospesi, livelli eccessivi o trasparenze indiscriminate possono aumentare fatica e ambiguità.

L’ipotesi Caffè TTC (@fig-storia-63-1) viene affiancata agli esempi documentari di Liquid Glass (@fig-storia-63-2, @fig-storia-63-3) e visionOS (@fig-storia-63-4, @fig-storia-63-5).



#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/apple-liquid-glass-materiale-sfondo-chiaro.png"),
  [Liquid Glass, chiaro. Apple HIG.#nota-compatta([#text("Materials")#text("; ")Liquid Glass, chiaro; Liquid Glass, scuro], ("https://developer.apple.com/design/human-interface-guidelines/materials",), etichetta: (text("developer.apple.com/…/materials"),)) <nota-url-01-106-locale-immagini>],
  alt: "Liquid Glass, chiaro. Apple HIG.") <fig-storia-63-2>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/apple-liquid-glass-materiale-sfondo-scuro.png"),
  [Liquid Glass, scuro. Apple HIG.#nota-compatta([#text("Materials")#text("; ")Liquid Glass, chiaro; Liquid Glass, scuro], ("https://developer.apple.com/design/human-interface-guidelines/materials",), etichetta: (text("developer.apple.com/…/materials"),)) <nota-layout-01-109>],
  alt: "Liquid Glass, scuro. Apple HIG.") <fig-storia-63-3>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/apple-visionos-finestra-spaziale-notes.png"),
  [Finestra in visionOS. Apple HIG.#nota-compatta([#([Finestra in visionOS; Volume in visionOS])], ("https://developer.apple.com/design/human-interface-guidelines/spatial-layout/",), etichetta: ("https://developer.apple.com/design/human-interface-guidelines/spatial-layout/",)) <nota-url-01-110>],
  alt: "Finestra in visionOS. Apple HIG.") <fig-storia-63-4>

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/apple-visionos-volume-spaziale.png"),
  [Volume in visionOS. Apple HIG.#footnote(<nota-url-01-110>)],
  alt: "Volume in visionOS. Apple HIG.", width: 66mm, placement: top, scope: "parent") <fig-storia-63-5>

#figura-nel-testo(
  id: "fig-storia-63-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-interfaccia-spaziale-home.png"),
  didascalia: [Caffè TTC · simulazione AR. Pannelli e prodotti su piani distinti davanti a una strada fotografica sintetica; la scena non usa la fotocamera.#sito([Caffè TTC · simulazione AR], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=spaziale")],
  alt: "Caffè TTC · simulazione AR. Pannelli e prodotti su piani distinti davanti a una strada fotografica sintetica; la scena non usa la fotocamera.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavola 64 · La conversazione del sito TTC sostituisce il precedente calcolatore fittizio.

=== Interfacce generate su richiesta

Un’*interfaccia generativa* può costruire strumenti e visualizzazioni in risposta a una richiesta, invece di restituire soltanto testo. Gli esperimenti di *Google Research* mostrano pagine, giochi e simulazioni creati in funzione del compito @leviathan2025-generative. La possibile evoluzione riguarda anche lo stile: la stessa informazione potrebbe assumere forme diverse per una persona o un contesto. La ricerca segnala però tempi di generazione e inesattezze. Occorrono *controlli stabili*, indicazioni sulla provenienza dei contenuti e possibilità di correggere il risultato senza perdere orientamento.

La persona verifica e corregge la proposta prima di confermare. Stato, provenienza e recupero dagli errori devono restare leggibili; tempi di generazione ed errori richiedono attenzione. La conversazione simulata della @fig-storia-generativa mostra come richieste successive compongano la pagina; la @fig-storia-64-1 documenta gli esperimenti di Google Research.



#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/google-research-interfacce-generative-2025.png"),
  [Interfacce generative. Google Research, 2025.#sito([Interfacce generative.], "https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/")],
  alt: "Interfacce generative. Google Research, 2025.") <fig-storia-64-1>

#figura-nel-testo(
  id: "fig-storia-generativa", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-interfaccia-generativa-home.png"),
  didascalia: [Caffè TTC · interfaccia generativa. La conversazione predefinita compone la pagina con i dati locali del bar: è una simulazione, con contenuti fittizi.#sito([Caffè TTC · interfaccia generativa], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=generativa")],
  alt: "Conversazione simulata di Caffè TTC: tre richieste e tre risposte compongono la pagina con le proposte, l’indirizzo e gli orari del bar immaginario.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavola 65 · Risorse

=== Un’estetica attenta alle risorse

La *leggerezza* può diventare una scelta visiva oltre che tecnica: immagini selezionate, tipografia ottimizzata e movimento proporzionato rendono più intenzionale la pagina. Le *Web Sustainability Guidelines* collegano esperienza, sviluppo e infrastrutture; a ottobre 2026 sono ancora una bozza W3C @w3c2026-sostenibilita.#sito([W3C, Web Sustainability Guidelines, Group Note Draft del 24 settembre 2026; non una Recommendation.], "https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20260924/") *Low-tech Magazine* offre un caso concreto: sito statico, immagini retinate e server alimentato dal sole @dedecker2018-lowtech.#sito([_Kris De Decker_, _Marie Otsuka_ e _Roel Roscam Abbing_, How to Build a Low-tech Website?, 24 settembre 2018.], "https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/") Non esiste però un’estetica automaticamente sostenibile. Vanno misurati risorse e risultati, mantenendo accessibilità e qualità del servizio; un sito solare può anche andare offline.

Menu e orari restano disponibili come testo e collegamenti. Nella variante Primissimo web non vengono caricate immagini. Il risultato va verificato su connessioni lente e con tecnologie assistive, mantenendo qualità e disponibilità del servizio. Le @fig-storia-65-1 e @fig-storia-65-2 distinguono l’ipotesi Caffè TTC dal sito solare documentato.



#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/low-tech-magazine-sito-solare-2026.jpg"),
  [Sito solare di Low-tech Magazine, ottobre 2026.#sito([Sito solare di Low-tech], "https://solar.lowtechmagazine.com/")],
  alt: "Sito solare di Low-tech Magazine, ottobre 2026.") <fig-storia-65-2>

#figura-nel-testo(
  id: "fig-storia-65-1", file: path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primissimo-web-testuale-home.png"),
  didascalia: [Caffè TTC · Primissimo web. Pagina composta da testo e collegamenti, senza immagini. La composizione essenziale riduce le risorse visive, senza dimostrare da sola la sostenibilità del servizio.#sito([Caffè TTC · Primissimo web], "https://cremarco.github.io/cvedi2627/web-design-examples/index.html?stile=text")],
  alt: "Caffè TTC · Primissimo web. Pagina composta da testo e collegamenti, senza immagini. La composizione essenziale riduce le risorse visive, senza dimostrare da sola la sostenibilità del servizio.",
  rapporto: 2380 / 3360, colonne: 2, altezza: 110mm,
)

// Tavola 66 · Criteri verificabili, non un nuovo stile imposto.

=== Una scelta, non una moda

Uno stile visivo non risolve da solo un problema di interazione. La storia mostra che tecnologie, media e pratiche d’uso cambiano insieme: alcune *convenzioni* restano, altre si trasformano. Per scegliere un linguaggio utile al progetto, occorre confrontare identità, *comprensione* e *condizioni reali d’uso*. Gli esempi di questo capitolo sono strumenti di lettura, non un catalogo di ricette.

*Compito* — Quale azione deve riconoscere e compiere la persona?

*Gerarchia* — Che cosa viene letto per primo? Quali relazioni restano visibili?

*Segnali* — Link, pulsanti e stati comunicano la loro funzione?

*Contesto* — Lo stile regge su schermi, dispositivi e condizioni d’uso differenti?

*Verifica* — Osservazione e prove con le persone confermano le scelte?

Le WCAG (Web Content Accessibility Guidelines) sono le linee guida del W3C per rendere i contenuti web accessibili alle persone con disabilità. Per le interfacce web, la versione 2.2 richiede al livello AA un *contrasto* del testo di almeno 4,5:1, o 3:1 per il testo grande. Gli elementi visivi essenziali dei controlli richiedono in genere 3:1, con le eccezioni previste @w3c2024-wcag22.#sito([W3C, WCAG 2.2: criteri 1.4.3 Contrasto minimo e 1.4.11 Contrasto non testuale, Recommendation del 12 dicembre 2024.], "https://www.w3.org/TR/WCAG22/") Un effetto visivo va valutato insieme alla *leggibilità* e alla riconoscibilità dell’azione.
]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#capitolo(..parametri-capitolo(1), testo)
