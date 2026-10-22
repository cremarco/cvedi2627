// Dal disegno al font: tavole correnti Figma 372–385.
// Testo continuo e modificabile; campioni autentici e ritagli nativi documentati.
#import "../../template/stile.typ": immagine, sito
#import "../../template/editoriale.typ": nota-compatta, testo-diritti
#import "../../template/campioni.typ": campione, confronto
#import "../../template/documenti.typ": dettaglio

== Dal disegno al font

Dopo aver riconosciuto le parti della lettera, possiamo distinguere tre livelli che nell’uso quotidiano vengono spesso chiamati tutti “font”. Il typeface è il *progetto delle forme*: comprende proporzioni, dettagli, relazioni e ritmo riconoscibili di un disegno tipografico. *La famiglia riunisce varianti* concepite per convivere, come tondo e corsivo o una serie di pesi. Il font è la *risorsa che rende utilizzabili* quei segni; nell’ambiente digitale è normalmente un file con contorni, misure e informazioni necessarie alla composizione.

La distinzione ha una conseguenza concreta. Dire che un testo è composto in Garamond identifica una tradizione e un nome, ma non basta a riprodurlo: occorrono la precisa interpretazione, il produttore, la versione e lo stile. Due famiglie che portano quel nome possono avere repertori, spaziature e proporzioni diversi. Anche la scelta Regular non costituisce una misura assoluta: identifica una posizione interna a un progetto.

#campione(titolo: [EB Garamond · Regular / Italic], didascalia: [Due stili di un’interpretazione moderna.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/assets/images/figure/tipografia/font/eb-garamond-regular-italic.svg"), width: 187.09pt, alt: "EB Garamond · Regular / Italic: Due stili di un’interpretazione moderna.")
] <fig-tipo-278a>


Nella tipografia di metallo, una fonte era legata anche a un corpo e a uno stile determinati. Il file scalabile ha reso molto più elastico questo rapporto, senza cancellare il lavoro di disegno. Quando selezioniamo una voce nel menu del programma non scegliamo soltanto un aspetto, ma un sistema di possibilità. Conoscere quel sistema permette di valutare fin dall’inizio se saprà sostenere titoli, citazioni, numeri, accenti e lingue del progetto @t06-monotype-glossario.#sito([Monotype, The A–Z of typographic terms.], "https://www.monotype.com/resources/typographic-terms")

=== Caratteri e glifi

Un carattere appartiene al sistema della scrittura; un glifo è una *forma impiegata per rappresentarlo*. La lettera g rimane riconoscibile come la stessa lettera anche quando cambia da una costruzione a un solo occhio a una a due occhi. A cambiare è la soluzione grafica, non necessariamente il contenuto del testo. Questa distinzione ci consente di parlare del disegno senza confonderlo con l’informazione che viene scritta.

Fra caratteri e glifi *non esiste una corrispondenza obbligatoria* uno a uno. Più caratteri possono essere rappresentati da una legatura; una lettera accentata può richiedere un glifo composto oppure il posizionamento di un accento su una base. Un medesimo carattere può inoltre disporre di forme iniziali, finali, locali o alternative. Il software sceglie e dispone i glifi attraverso un processo di composizione che tiene conto del font, della lingua e della scrittura. La @fig-tipo-288a conserva lo stesso testo nelle due rese @t06-opentype-features.#sito([Microsoft, OpenType: Registered Features.], "https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist")

#immagine(path("/assets/images/figure/tipografia/font/caratteri-e-glifi-fi.svg"),
  [Testo: U+0066 U+0069. Due glifi o una legatura.],
  diritti: [EB Garamond; SIL OFL 1.1.],
  alt: "Testo: U+0066 U+0069. Due glifi o una legatura.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-288a>


Il repertorio comprende dunque molto più delle ventisei lettere dell’alfabeto inglese. Nel campione (@fig-tipo-279) compaiono segni che possono diventare decisivi in un testo italiano o multilingue: maiuscole accentate, diacritici, cifre, virgolette e simboli. Controllarli significa *preservare il contenuto*. La mancanza di una È o di una ł non è un piccolo difetto decorativo da correggere con una lettera simile: può modificare la grafia corretta di una parola o di un nome.

#immagine(path("/assets/images/figure/tipografia/font/work-sans-repertorio.svg"),
  [Work Sans: maiuscole accentate, diacritici, cifre, virgolette e simboli del repertorio.],
  diritti: [Wei Huang / The Work Sans Project Authors; SIL OFL 1.1.],
  alt: "Work Sans: maiuscole accentate, diacritici, cifre, virgolette e simboli del repertorio.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-279>


=== Calligrafia, lettering e tipografia

Calligrafia, lettering e tipografia possono produrre forme simili e richiedono conoscenze comuni, ma descrivono attività diverse. Nella calligrafia la forma nasce dal *movimento di uno strumento*: direzione, pressione, inclinazione e sequenza dei tratti incidono sul risultato. Nel lettering *le lettere vengono disegnate* e corrette per una composizione particolare. Nella tipografia si compone utilizzando un repertorio di *segni riutilizzabili*, già progettati per combinarsi con molti altri. La @fig-tipo-279a mostra un esempio illustrativo contemporaneo.

#immagine(path("/assets/images/figure/tipografia/font/gesto-esempio-calligrafico.png"),
  [«Gesto»: esempio illustrativo contemporaneo di scrittura calligrafica.],
  alt: "«Gesto»: esempio illustrativo contemporaneo di scrittura calligrafica.",
) <fig-tipo-279a>


Un logotipo disegnato a mano può essere riprodotto identico migliaia di volte senza diventare per questo un font. Può contenere una legatura unica, un terminale adattato alla lettera vicina o uno spazio che funziona soltanto in quel nome. Per trasformarlo in un alfabeto utilizzabile in testi differenti occorre un ulteriore progetto: disegnare i segni mancanti e stabilire come si comportano in combinazioni non previste dal marchio iniziale. Pacifico è un brush script; Great Vibes uno script calligrafico. Richiamano la scrittura, ma qui sono composti con font, non scritti a mano. Anche il lettering può essere geometrico: l’aspetto non rivela il procedimento. La distinzione è fra parole disegnate per un caso e un repertorio riutilizzabile. Un marchio non mostra da solo le qualità di una famiglia; uno specimen ne mostra varietà e continuità. I campioni @fig-tipo-pacifico e @fig-tipo-great-vibes rendono osservabile questa differenza.

#campione(titolo: [Pacifico Regular], didascalia: [Campione di un brush script composto con un font.],
  diritti: [Vernon Adams e altri autori; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/assets/images/figure/tipografia/font/pacifico-regular-aag.svg"), width: 187.09pt, alt: "Pacifico Regular: Campione di un brush script composto con un font.")
] <fig-tipo-pacifico>


#campione(titolo: [Great Vibes Regular], didascalia: [Campione di uno script calligrafico composto con un font.],
  diritti: [Robert Leuschke; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/assets/images/figure/tipografia/font/great-vibes-regular-aag.svg"), width: 187.09pt, alt: "Great Vibes Regular: Campione di uno script calligrafico composto con un font.")
] <fig-tipo-great-vibes>


=== Progettare una famiglia di segni

Il *type design* comincia da una domanda d’uso. Un carattere per un quotidiano deve sopportare condizioni diverse da un alfabeto per un titolo sperimentale; una famiglia destinata a più scritture richiede un programma diverso da un lettering di poche lettere. Il progettista definisce repertorio, dimensioni d’impiego, pesi e caratteristiche, studia i modelli pertinenti e li trasforma in un sistema coerente. Disegnare una bella a isolata è soltanto l’inizio.

Le lettere si giudicano nelle parole. Curve, aste e spazi laterali devono costruire un *ritmo sufficientemente continuo*, pur mantenendo le differenze che rendono riconoscibili i segni. Per questo si alternano osservazione del dettaglio e prove di testo: una curva riuscita in grande può chiudersi in piccolo, un accento può urtare quello della riga vicina, un peso estremo può rendere instabile una forma. Anche le varianti vengono controllate come relazioni, non come trasformazioni meccaniche della prima versione.

La convenzione non impedisce l’invenzione: fornisce le forme apprese con cui il lettore interpreta le novità. Un disegno può aderire a modelli storici, reinterpretarli o mettere in discussione alcune abitudini. La sua originalità si valuta insieme allo scopo. Una soluzione adatta a interrompere e sorprendere può essere poco adatta alla *lettura continuativa*; la stessa scelta assume quindi valori diversi se osservata come esperimento, come strumento di informazione o come parte di un’identità.

=== New Alphabet e Swift: i vincoli tecnici

New Alphabet e Swift mostrano risposte diverse ai vincoli tecnici (@fig-tipo-279b e @fig-tipo-279c). Nel 1967 il grafico olandese _Wim Crouwel_ sviluppò New Alphabet come esperimento sulle limitazioni dei tubi a raggi catodici, usati negli schermi e nella fotocomposizione: una costruzione fortemente regolata sostituiva molte curve convenzionali con segmenti e raccordi angolari. Il risultato spostava il problema dal riconoscere subito le lettere all’immaginare un diverso rapporto fra alfabeto e macchina. The Foundry Types lo descrive come una *provocazione teorica* destinata ad alimentare la discussione, non come una proposta universale per leggere testi correnti @t06-new-alphabet.#sito([The Foundry Types, New Alphabet.], "https://www.thefoundrytypes.com/fonts/new-alphabet/")

#campione(titolo: [New Alphabet], fascia: 63pt,
  didascalia: [New Alphabet (1967), dettaglio.], diritti: [_Wim Crouwel_ / The Foundry Types.])[
  #dettaglio(path("/assets/images/figure/tipografia/font/crouwel-new-alphabet-documento-1967.jpg"),
    width: 187.09pt, height: 63pt, originale-width: 187pt, originale-height: 124.417pt,
    dx: 0pt, dy: -18.7pt, alt: "Dettaglio delle lettere angolari di New Alphabet nel documento del 1967.")
] <fig-tipo-279b>


Swift, disegnato negli anni Ottanta da _Gerard Unger_, tipografo olandese, affrontava invece le *condizioni della stampa dei quotidiani*. Grazie robuste e profili netti contribuivano a far sopravvivere le forme sulla carta e nelle lavorazioni veloci dell’epoca. La successiva Neue Swift rielaborò il progetto sul piano tecnico ed estetico. L’espressività non scompariva: nasceva anche dalla risposta al supporto @t06-swift2023.#nota-compatta([Linotype/MyFonts, Swift; Monotype, Neue Swift Field Guide (2023).], ("https://www.myfonts.com/collections/swift-font-linotype", "https://cms.myfonts.com/sites/default/files/2023-10/Neue-Swift-Font-Field-Guide.pdf"))

#campione(titolo: [Swift], didascalia: [Swift: campione digitale attuale.],
  diritti: [_Gerard Unger_; Linotype/MyFonts.])[
  #dettaglio(path("/assets/images/figure/tipografia/font/unger-swift-quality-campione.png"),
    width: 114.52pt, height: 35.84pt, originale-width: 806.4pt, originale-height: 403.2pt,
    dx: -46.2pt, dy: -252.84pt, alt: "Quality, campione digitale autentico di Swift.")
] <fig-tipo-279c>


Accostare i due casi evita di identificare l’innovazione con un solo stile. Un progetto può cercare una radicale discontinuità oppure introdurre cambiamenti relativamente discreti per *conservare la qualità della lettura*. In entrambi i casi contano le relazioni fra strumenti, segni e uso. Il giudizio sul carattere comincia da queste relazioni, prima di stabilire se la sua forma ci sembri familiare o insolita.

=== Pesi, tondo, corsivo e obliquo

La famiglia permette di cambiare accento mantenendo una continuità di disegno. Il peso varia la presenza dei tratti: Light, Regular, Medium, Semibold, Bold e Black indicano posizioni che *dipendono dal progetto* (@fig-tipo-282). Le scale numeriche aiutano il software a selezionare gli stili, ma un 700 non possiede lo stesso spessore apparente in tutte le famiglie. Confrontare richiede di guardare lettere e parole al medesimo corpo, tenendo conto anche delle proporzioni. Un secondo cambiamento riguarda la postura. Il tondo, spesso indicato come roman, usa normalmente forme diritte. Il corsivo o italic può *ridisegnare la struttura delle lettere*, modificando collegamenti, terminali e ritmo oltre all’inclinazione. L’obliquo conserva in genere più da vicino la costruzione del tondo, ma può essere una variante progettata con proprie correzioni. Non coincide necessariamente con una semplice deformazione eseguita dal programma.

#immagine(path("/assets/images/figure/tipografia/font/roboto-serif-sei-pesi.svg"),
  [Roboto Serif: pesi 100, 300, 400, 500, 700 e 900 allo stesso corpo 25. Larghezza 100, dimensione ottica 20 e grado 0 costanti.],
  diritti: [Commercial Type / Google; SIL OFL 1.1.],
  alt: "Roboto Serif: pesi 100, 300, 400, 500, 700 e 900 allo stesso corpo 25. Larghezza 100, dimensione ottica 20 e grado 0 costanti.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-282>


I campioni delle @fig-tipo-280, @fig-tipo-281 e @fig-tipo-283 permettono di vedere la differenza: il tondo e il corsivo originali di EB Garamond sono affiancati, nell’ultima figura, a un tondo ottenuto con *un’inclinazione artificiale*. La distinzione è pratica. Se manca un corsivo reale, il pulsante del software può produrre una simulazione che altera spessori e spazi senza introdurre le forme previste da un disegnatore. Conviene conoscere gli stili disponibili prima di affidare loro citazioni, enfasi o termini stranieri.

#campione(titolo: [EB Garamond Regular], didascalia: [A, a e g in tondo, contorni autentici.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/assets/images/figure/tipografia/font/eb-garamond-tondo.svg"), width: 187.09pt, alt: "EB Garamond Regular: A, a e g in tondo, contorni autentici.")
] <fig-tipo-280>


#campione(titolo: [EB Garamond Italic], didascalia: [A, a e g in corsivo, contorni autentici.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/assets/images/figure/tipografia/font/eb-garamond-corsivo.svg"), width: 187.09pt, alt: "EB Garamond Italic: A, a e g in corsivo, contorni autentici.")
] <fig-tipo-281>


#immagine(path("/assets/images/figure/tipografia/font/eb-garamond-corsivo-e-simulazione.svg"),
  [EB Garamond: a, g e f in tondo, corsivo originale e tondo inclinato artificialmente di 12°, a parità di corpo e scala.],
  diritti: [EB Garamond Regular e Italic; SIL OFL 1.1.],
  alt: "EB Garamond: a, g e f in tondo, corsivo originale e tondo inclinato artificialmente di 12°, a parità di corpo e scala.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-283>


=== Legature e varianti OpenType

*OpenType* è una specifica per i file font: organizza le forme dei glifi, le misure e le regole che permettono al programma di scegliere e posizionare i segni @t06-opentype-file. Un font può così custodire diverse forme per comporre lo stesso testo. *Le legature sostituiscono* una sequenza di glifi con una forma disegnata per l’incontro: fi, fl e ffi sono esempi frequenti nella tipografia latina. Nel confronto fra le @fig-tipo-284 e @fig-tipo-285 le lettere digitate non cambiano; cambia la regola applicata dal font. La crenatura, al contrario, *regola la posizione* dei segni senza necessariamente sostituirne la forma.

#immagine(path("/assets/images/figure/tipografia/font/eb-garamond-legature-disattivate.svg"),
  [EB Garamond 400: fi, fl e ffi senza legature; crenatura disattivata.],
  diritti: [Contorni e avanzamenti originali del font; SIL OFL 1.1.],
  alt: "EB Garamond 400: fi, fl e ffi senza legature; crenatura disattivata.",
) <fig-tipo-284>


#immagine(path("/assets/images/figure/tipografia/font/eb-garamond-legature-attivate.svg"),
  [EB Garamond 400: fi, fl e ffi con le legature standard del font, funzione liga.],
  diritti: [SIL OFL 1.1.],
  alt: "EB Garamond 400: fi, fl e ffi con le legature standard del font, funzione liga.",
) <fig-tipo-285>


Le legature standard possono risolvere collisioni o raccordi sgradevoli; quelle discrezionali introducono spesso un’accentuazione più particolare. Non tutte sono adatte a qualsiasi testo. Un’ampia spaziatura fra lettere può rendere incongrua una coppia saldata, mentre una forma molto ornamentale può richiamare più attenzione di quanto serva. In altre scritture alcune sostituzioni sono essenziali alla corretta composizione: non vanno trattate come abbellimenti facoltativi.

OpenType può offrire inoltre varianti contestuali, forme locali, svolazzi e insiemi stilistici. La presenza nel file non garantisce che ogni applicazione li attivi nello stesso modo, perciò si controlla il risultato nel programma effettivamente usato. Per una variante grafica è preferibile utilizzare la funzione prevista dal font, *conservando le lettere del testo*, anziché inserire un segno insolito che le somigli. In questo modo aspetto e informazione restano distinti e il repertorio può esprimere la propria ricchezza senza compromettere le parole.

=== Maiuscoletto e cifre

Il maiuscoletto utilizza forme di capitale progettate per un’altezza più contenuta. È *diverso da una maiuscola rimpicciolita*: quando si riduce meccanicamente un segno si assottigliano anche tratti e dettagli, mentre una variante disegnata può conservare peso e proporzioni adeguati al testo che la circonda. I due campioni delle @fig-tipo-286 e @fig-tipo-287 hanno un’altezza visibile confrontabile, ma mostrano esiti diversi. La differenza riguarda il disegno, oltre alla dimensione.

// Le due visuali rimangono vicine e alla medesima scala.
#confronto[
#immagine(path("/assets/images/figure/tipografia/font/eb-garamond-maiuscole-ridotte.svg"),
  [Maiuscole di EB Garamond 400 ridotte uniformemente: si assottigliano anche i tratti.],
  diritti: [Simulazione geometrica; SIL OFL 1.1.],
  alt: "Maiuscole di EB Garamond 400 ridotte uniformemente: si assottigliano anche i tratti.",
  width: 137mm,
) <fig-tipo-286>

#immagine(path("/assets/images/figure/tipografia/font/eb-garamond-maiuscoletto-reale.svg"),
  [Maiuscoletto reale di EB Garamond 400, funzione c2sc, a confronto con la riduzione geometrica.],
  diritti: [Glifi originali del font; SIL OFL 1.1.],
  alt: "Maiuscoletto reale di EB Garamond 400, funzione c2sc, a confronto con la riduzione geometrica.",
  width: 137mm,
) <fig-tipo-287>

]

Anche le cifre possono offrire più soluzioni. Le cifre allineate, o lining, hanno altezze riferite a una linea comune e spesso un rapporto evidente con le capitali. Quelle elzeviriane, o oldstyle, possono avere ascendenti e discendenti e si inseriscono con un ritmo diverso nel minuscolo. Questa distinzione riguarda la *forma verticale*; un’altra riguarda la larghezza: le cifre proporzionali occupano spazi differenti, quelle tabulari hanno un *avanzamento costante* (@fig-tipo-288).

#immagine(path("/assets/images/figure/tipografia/font/roboto-serif-tipi-di-cifre.svg"),
  [Roboto Serif 400: cifre allineate ed elzeviriane, in versione proporzionale e tabulare. Funzioni lnum/onum e pnum/tnum; crenatura disattivata.],
  diritti: [Commercial Type / Google; SIL OFL 1.1.],
  alt: "Roboto Serif 400: cifre allineate ed elzeviriane, in versione proporzionale e tabulare. Funzioni lnum/onum e pnum/tnum; crenatura disattivata.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-288>


Forma verticale e larghezza sono due proprietà indipendenti: possono combinarsi se il font lo consente. In una colonna di prezzi le tabulari *mantengono gli allineamenti*; in una frase le proporzionali possono offrire un ritmo più naturale. Esistono inoltre frazioni, numeratori, denominatori, apici e pedici disegnati. Prima di ricorrere a riduzioni e spostamenti manuali, si verifica se la famiglia possiede già questi segni: una risorsa adatta comprende anche i dettagli necessari al contenuto.

=== Unicode e copertura linguistica

Unicode assegna codici ai caratteri: U+0041 identifica la A latina maiuscola. Cambiando font *cambia il glifo, non il carattere*. Un font OpenType contiene forme e regole: f e i possono diventare una legatura, ma nel testo restano due lettere. Altre regole scelgono varianti e posizionano accenti. La resa nasce dall’incontro fra *testo codificato*, font disponibili e motore di composizione. Il quadratino tofu può segnalare un *glifo non disponibile*. Se manca È, il sistema può cercarla in un font di riserva, con peso o proporzioni diversi; senza una forma adatta può mostrare il riquadro. È diverso da una *codifica errata*: i byte UTF-8 di «è», letti come Latin-1, producono «Ã¨». Qui sono i dati a essere interpretati male. Prima di cambiare font va identificata la causa. La verifica comincia da parole complete, nomi propri e segni meno frequenti, non soltanto dal titolo della pagina. È utile includere diacritici, valute, punteggiatura e tutte le lingue previste. Il repertorio latino di base non basta a garantire una corretta versione polacca o turca, né la disponibilità del cirillico assicura quella del greco. La copertura va letta nella documentazione e confermata nella *composizione effettiva*, perché numero dei glifi e numero delle lingue supportate descrivono aspetti differenti @t06-unicode-fonts.#nota-compatta([Unicode Consortium, Fonts and Keyboards; Glossary, caratteri e glifi.], ("https://www.unicode.org/faq/font_keyboard.html", "https://unicode.org/glossary/"))

=== Le famiglie multiscript

Una famiglia multiscript cerca una relazione fra *sistemi di scrittura differenti*. La coerenza può riguardare il peso visivo, il contrasto, il trattamento dei terminali o la destinazione d’uso, ma non richiede che ogni segno assomigli a una lettera latina. Ogni scrittura possiede forme, convenzioni e ritmi che vanno rispettati. Tradurre una frase comporta quindi anche una nuova prova tipografica.

Noto (@fig-tipo-288b), progetto sviluppato da Google con numerosi collaboratori e Monotype, riunisce famiglie destinate a molte scritture e prende il nome dall’obiettivo di ridurre i segni mancanti. Non è un singolo file che risolve automaticamente ogni lingua: si selezionano le famiglie pertinenti e se ne controllano composizione e compatibilità. Una parola latina, una sequenza di caratteri giapponesi e un testo arabo possono avere densità e altezze apparenti diverse allo stesso corpo nominale @t06-noto.#nota-compatta([Google Fonts, Noto; repository Noto Latin-Greek-Cyrillic.], ("https://fonts.google.com/noto", "https://github.com/notofonts/latin-greek-cyrillic"))

#immagine(path("/assets/images/figure/tipografia/font/noto-tre-repertori-dettagli.svg"),
  [Noto Sans e Noto Sans Arabic: dettagli dei repertori latino, greco e arabo, non traduzioni.],
  diritti: [The Noto Project Authors, 2022; SIL OFL 1.1.],
  alt: "Noto Sans e Noto Sans Arabic: dettagli dei repertori latino, greco e arabo, non traduzioni.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-288b>


Anche la direzione appartiene alla scrittura e al contenuto. L’arabo e l’ebraico si leggono normalmente da destra a sinistra, ma al loro interno numeri e frammenti in altre scritture possono richiedere un *comportamento bidirezionale*. Nelle scritture dell’Asia orientale esistono convenzioni orizzontali e verticali differenti: non si possono ridurre tutte a una sola regola “orientale”. La scelta del font deve consentire queste specificità. Per giudicarne l’armonia serve osservare testi reali e *coinvolgere chi legge quella lingua*, evitando di usare il latino come misura universale (@fig-tipo-289).

#immagine(path("/assets/images/figure/tipografia/font/noto-tre-repertori.svg"),
  [Noto Sans e Noto Sans Arabic: repertori latino, greco e arabo. Campioni distinti, senza equivalenza traduttiva.],
  diritti: [The Noto Project Authors, 2022; SIL OFL 1.1.],
  alt: "Noto Sans e Noto Sans Arabic: repertori latino, greco e arabo. Campioni distinti, senza equivalenza traduttiva.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-289>


=== Font statici e variabili

Un *font statico* contiene uno stile fissato: per passare da Regular a Bold si seleziona un altro font della famiglia. Un *font variabile* può offrire più pesi nello stesso file, tramite un *controllo chiamato asse*.

L’asse del peso si chiama wght. Nel campione Work Sans (@fig-tipo-289a) selezioniamo 400, 550 e 700. A corpo 36 invariato, *550 è una posizione intermedia*: cambiano il disegno e lo spessore dei tratti. Non è un ingrandimento.

#immagine(path("/assets/images/figure/tipografia/font/work-sans-asse-peso.svg"),
  [Work Sans 2.012: tre valori di wght, corpo 36. Asse 100–900.],
  diritti: [Wei Huang e autori; SIL OFL 1.1.],
  alt: "Work Sans 2.012: tre valori di wght, corpo 36. Asse 100–900.",
) <fig-tipo-289a>


Il software calcola queste forme dai dati predisposti dal disegnatore: è l’*interpolazione*. Non mescola font diversi né inventa forme arbitrarie. I nomi Regular e Bold possono restare come posizioni già nominate. Ogni font dichiara *assi e limiti*: Work Sans ha *solo l’asse wght*, da 100 a 900. Altri font possono prevedere wdth (larghezza), slnt (inclinazione), ital (corsivo) e opsz (dimensione ottica); alcuni cambi sono discreti @t06-variable.#sito([Microsoft, OpenType Font Variations Overview.], "https://learn.microsoft.com/en-us/typography/opentype/spec/otvaroverview")

La variazione permette regolazioni precise, non una compressione arbitraria delle lettere. Il font *non si anima da solo*: è l’applicazione a collegare un asse a un comando o a dati. Un effetto dinamico va verificato per leggibilità, stabilità e continuità.

=== Formati e licenze dei font

Il formato del file *non costituisce una categoria estetica*. OpenType è una specifica che organizza diversi tipi di dati tipografici; le estensioni .otf e .ttf, da sole, non dicono se un carattere sia storico, geometrico, variabile o adatto al testo lungo. Per l’uso sul web WOFF2 offre un contenitore compresso di dati font. La scelta del formato riguarda il canale di distribuzione e il supporto tecnico, mentre il disegno si valuta sui segni.

L’espressione web-safe indica tradizionalmente famiglie la cui presenza era considerata probabile su molte piattaforme diffuse. Non è una garanzia universale: sistemi, versioni e installazioni possono offrire risorse differenti. Per questo il progetto prevede una sequenza di *famiglie di riserva*, o font stack, conclusa da una famiglia generica come serif o sans-serif. Il browser cerca i segni necessari fra le risorse disponibili, mentre un webfont può fornire un file specifico. Anche usando lo stesso nome, però, versioni del font e sistemi di resa possono produrre differenze nelle misure e nell’aspetto. La verifica deve quindi comprendere sia il font previsto sia le alternative: la disponibilità probabile non assicura una composizione identica su tutti i dispositivi.

Occorre conservare anche provenienza, versione e condizioni d’uso. Avere un font installato consente gli *usi previsti dalla sua licenza*, ma non implica automaticamente il diritto di distribuirne il file insieme a un sito o a un’applicazione. Comporre un’immagine, incorporare un font in un documento e trasferire la risorsa ad altri sono operazioni diverse, da confrontare con le condizioni della risorsa specifica @t06-font-redistribution.#sito([Microsoft Typography, Font redistribution FAQ.], "https://learn.microsoft.com/en-us/typography/fonts/font-faq")

I font con licenza aperta offrono possibilità esplicite, senza essere privi di regole. EB Garamond, usato nei campioni di questo capitolo, è distribuito con SIL Open Font License 1.1: nella ridistribuzione *si conservano gli avvisi* e la licenza applicabili; il documento composto non deve adottare per questo la stessa licenza. Registrare questi dati insieme agli asset permette di riprodurre le scelte e di aggiornare il progetto senza sostituzioni casuali. Il font diventa così una parte documentata del lavoro, al pari delle immagini e dei testi. Il campione della @fig-tipo-280-licenza conserva i contorni della risorsa documentata @t06-ofl2007.#sito([SIL International, Open Font License 1.1, 2007.], "https://openfontlicense.org/open-font-license-official-text/")

#immagine(path("/assets/images/figure/tipografia/font/eb-garamond-regular-aag.svg"),
  [EB Garamond Regular: Aag, corpo 36. Contorni autentici.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.],
  alt: "EB Garamond Regular: Aag, corpo 36. Contorni autentici.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-280-licenza>


=== New Alphabet e Neue Swift: gli specimen

Nel 1967 _Wim Crouwel_ concepisce *New Alphabet* (@fig-tipo-290) per i limiti della fotocomposizione a tubo catodico. Una *griglia 5 × 9* e segmenti con angoli a 45° sostituiscono le curve; una barra sopra il segno indica la maiuscola.

È un *esperimento teorico*, non un font per lunghi testi: la regola è coerente, ma rende i segni meno familiari. Mostra come un vincolo tecnico possa trasformare radicalmente il disegno. *Swift (1985)*, di _Gerard Unger_, nasce per i quotidiani: grazie robuste e spazi interni aperti rispondono a carta ruvida e stampa veloce. *Neue Swift (2009)* aggiorna il progetto e amplia i glifi; il dettaglio di Neue Swift in @fig-tipo-291 viene dalla guida Monotype del *2023*, non uno specimen del 1985.

#confronto[
#immagine(path("/assets/images/figure/tipografia/font/crouwel-new-alphabet-documento-1967.jpg"),
  [New Alphabet, 1967: lettere ridotte a un sistema di segni angolari.],
  diritti: [_Wim Crouwel_; The Foundry Types.],
  alt: "New Alphabet, 1967: lettere ridotte a un sistema di segni angolari.",
  width: 214.646pt,
) <fig-tipo-290>




#figure(stack(dir: ltr, spacing: 14.17pt,
  dettaglio(path("/assets/images/figure/tipografia/font/unger-swift-quality-campione.png"),
    width: 114.52pt, height: 35.84pt, originale-width: 806.4pt, originale-height: 403.2pt,
    dx: -46.2pt, dy: -252.84pt, alt: "Quality, campione digitale autentico di Swift."),
  image(path("/assets/images/figure/tipografia/font/unger-neue-swift-typography-guida-2023.png"),
    width: 253.349pt, alt: "Typography, dettaglio di Neue Swift dalla guida Monotype del 2023.")),
  kind: image,
  caption: [Swift: «Quality», campione digitale Linotype attuale. Neue Swift: «Typography», guida Monotype 2023.
    #v(4pt)#testo-diritti[_Gerard Unger_; Linotype/Monotype, Font Field Guide № 035.]],
) <fig-tipo-291>
]


Nella parola Typography osserviamo le grazie lunghe, l’orecchio triangolare della g e i raccordi netti delle curve. Il confronto non cerca un vincitore: valutiamo *forme e scopo d’uso*, non una generica superiorità dei serif.

