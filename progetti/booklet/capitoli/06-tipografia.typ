// Capitolo 06: unico testo per volume e compilazione autonoma.
#import "../template/stile.typ": booklet, capitolo
#import "../template/piano.typ": parametri-capitolo

#let testo = [
// Capitolo completo: tutto il testo modificabile è raccolto in questo file.
// Volume e anteprima leggono lo stesso assemblaggio e le fonti del piano.
#[
// Sequenza completa dei paragrafi del capitolo.
// Preordine nativo necessario alla compatibilità APA di Typst 0.15.1.
#import "../bibliografia/06-tipografia-gruppi.typ": preordine-fonti
#for chiave in preordine-fonti [#cite(chiave, form: none)

]

#[
// Tipografia: prima parte della storia dei caratteri, dalle tavole Figma 334–341.
// I paragrafi sono testo ordinario: nessuna riga o pagina della fonte viene fissata.
#import "../template/stile.typ": sito, immagine
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/sagome.typ": sagoma
#import "../template/figure.typ": figura-pagina
#import "../template/doppia-pagina.typ": sagoma-regionale
#import "../template/documenti.typ": dettaglio
#import "../template/campioni.typ": dettaglio-figura, confronto

== Storia dei caratteri

#sagoma(
  id: "fig-tipo-lettera-materia",
  file: path("/risorse-condivise/immagini/figure/tipografia/lettera-a-tridimensionale.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/lettera-a-tridimensionale.json")),
  width: 70pt,
  didascalia: [La lettera come oggetto: forma, controforma, materia e ombra.],
  alt: "Lettera a minuscola tridimensionale, scontornata, con superficie scura e fianco azzurro.",
)[
Le parole arrivano al lettore attraverso forme visibili. Prima ancora di riconoscere una frase, incontriamo lettere sottili o robuste, regolari o irrequiete, familiari o insolite. La tipografia prende in carico questa presenza: *sceglie e coordina i caratteri*, ne regola la dimensione e le distanze, rende il linguaggio disponibile alla lettura. La sua funzione pratica convive con una funzione espressiva. La stessa espressione può assumere un tono riservato, istituzionale o giocoso attraverso un diverso disegno delle lettere, senza che cambi il suo significato letterale.
]

Per comprendere queste possibilità è utile guardare al passato. Una forma che oggi appare naturale è spesso il risultato di strumenti, materiali e abitudini accumulati nei secoli. Le grazie, il contrasto fra tratti sottili e spessi, il corsivo e perfino il nome di alcune misure raccontano il lavoro di chi ha scritto, inciso, fuso e programmato i caratteri. La storia aiuta quindi a riconoscere le ragioni di una soluzione e a valutarne l’uso attuale.

Scrittura e tipografia hanno però storie differenti. La scrittura è un *sistema di segni* che rende rappresentabile una lingua; la tipografia, nel suo significato storico, *organizza testi attraverso tipi riproducibili*. Un’iscrizione antica non è già un font, così come un manoscritto non è un libro composto con caratteri mobili. Le forme passano da un mezzo all’altro, ma cambiano il processo che le produce e il modo in cui possono essere ripetute. Da questa distinzione prende avvio il percorso che conduce dalla mano al tipo, dal tipo al file e dal file allo schermo. Una lettera trattata come oggetto introduce il rapporto fra segno, materia e spazio (@fig-tipo-lettera-materia).

=== L’alfabeto latino prima della stampa

La storia dell’alfabeto latino attraversa culture e trasformazioni diverse. La trasmissione di forme dai Fenici ai Greci, agli Etruschi e poi ai Romani non va letta come il passaggio immutato di un insieme di simboli: ogni comunità adatta i segni alla propria lingua e al proprio modo di scrivere. Le lettere che usiamo conservano alcune tracce di questo lungo processo, ma non coincidono con le loro antenate. La forma di una A contemporanea è una convenzione condivisa e, nello stesso tempo, un progetto che ammette numerose interpretazioni @t06-knott2014.#sito([_Elizabeth Knott_, Alphabet Origins: From Kipling to Sinai. The Metropolitan Museum of Art, 2014.], "https://www.metmuseum.org/exhibitions/listings/2014/assyria-to-iberia/blog/posts/alphabet")

Nell’ambito latino, le maiuscole delle iscrizioni e le scritture librarie offrono modelli differenti. Incidere una lettera su pietra e tracciarla con una penna richiede gesti, tempi e resistenze diversi. Nella scrittura a penna, la forma della punta e l’angolo con cui viene tenuta contribuiscono alla variazione di spessore del segno. Quando più tardi queste forme saranno tradotte in metallo, il rapporto fra i tratti rimarrà visibile, anche se il procedimento produttivo sarà ormai un altro.

// La N è il capolettera della parola «Nel», come nella tavola Figma 336.
// Il resto del paragrafo rimane continuo: Meander decide da solo le righe.
// L’alternativa «N» conserva la lettera iniziale anche nella lettura assistita.
#sagoma(
  id: "fig-tipo-iniziale-n",
  file: path("/risorse-condivise/immagini/figure/tipografia/iniziale-n-miniata.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/iniziale-n-miniata.json")),
  width: 66.783pt,
  lato: left,
  didascalia: [Iniziale N miniata, illustrazione contemporanea ispirata alla decorazione dei manoscritti medievali.],
  alt: "N",
)[
el Medioevo la produzione manoscritta coinvolge ambienti monastici, ma anche copisti laici e attività legate alle università. Le scritture non sono tutte uguali: modelli arrotondati convivono con forme più serrate e angolose, e le abbreviazioni rispondono alle pratiche dei lettori. Nel Rinascimento, gli umanisti recupereranno scritture librarie più antiche, che riterranno vicine ai modelli dell’antichità: da questo recupero nasceranno le minuscole umanistiche. I primi stampatori europei avranno quindi a disposizione forme di lettere già familiari ai lettori e le tradurranno in caratteri mobili. L’innovazione tecnica entra così nella vita quotidiana attraverso una continuità visiva. La @fig-tipo-iniziale-n richiama la decorazione dei manoscritti con un’illustrazione contemporanea.
]

=== La stampa prima di _Gutenberg_

Riprodurre un testo richiede di distinguere il segno dalla matrice che ne permette la ripetizione. Nella xilografia si incide in rilievo un intero blocco, conservando sulla superficie le parti che riceveranno l’inchiostro. Il testo e le eventuali immagini vengono trasferiti come un insieme. Con i caratteri mobili, invece, i segni sono elementi separati: dopo l’impressione possono essere scomposti, riordinati e impiegati per altre parole. L’unità riutilizzabile cambia il modo di preparare il testo, anche se entrambe le tecniche possono continuare a essere usate.

Il _Sutra del Diamante_, datato *11 maggio 868*, mostra un esempio di stampa xilografica (@fig-tipo-sutra-diamante). Nella riproduzione, la scena del _Buddha_ che predica occupa la parte destra; a sinistra cominciano le colonne di testo. Immagine e scrittura sono ottenute incidendo blocchi di legno e imprimendoli sulla carta. La finezza dei segni documenta una tecnica già sviluppata, alla quale collaboravano disegnatori, scribi e intagliatori @t06-dunhuang-guide.#nota-compatta([British Library, Life in ancient Dunhuang, pp. 29–30 del PDF; riproduzione fotografica Or.8210/P.2.], ("https://idp.bl.uk/wp-content/uploads/2025/01/BL.SR_.Large_.Print_.Guide_.V3.pdf", "https://www.flickr.com/photos/britishlibrary/12459240784"))

// Il frontespizio xilografico precede il caso a caratteri mobili del Jikji.
// La figura può spostarsi nella gabbia; le righe del testo restano automatiche.
#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/sutra-diamante-868-frontespizio-testo-british-library.jpg"),
  [_Sutra del Diamante_, 11 maggio 868: frontespizio illustrato e inizio del testo, stampati da blocchi di legno. Il documento completo è un rotolo; qui ne è riprodotta una parte.],
  diritti: [British Library, Or.8210/P.2, immagine 010627. Riproduzione distribuita su Wikimedia Commons con CC0 1.0.],
  alt: "Parte del Sutra del Diamante dell’868: a destra il Buddha circondato da discepoli, a sinistra colonne di testo cinese stampato.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-sutra-diamante>

Le esperienze asiatiche precedono la tipografia europea. In Cina l’inventore _Bi Sheng_ sperimenta caratteri mobili in ceramica nell’XI secolo. In Corea, il secondo volume del _Jikji_ fu stampato nel tempio Heungdeok-sa di Cheongju nel luglio 1377 con tipi metallici. L’UNESCO lo riconosce come la più antica testimonianza conservata di stampa con caratteri mobili metallici. La parola «conservata» è essenziale: identifica un documento che possiamo studiare, senza trasformarlo automaticamente nel primo tentativo mai realizzato. La @fig-tipo-jikji mostra una doppia pagina del volume conservato dalla Bibliothèque nationale de France @t06-bnf-jikji.#nota-compatta([BnF, Jikji; UNESCO, Memory of the World, iscrizione 2001.], ("https://www.bnf.fr/en/jikji-treasure-world-printing", "https://www.unesco.org/en/memory-world/baegun-hwasang-chorok-buljo-jikji-simche-yojeol-volii-second-volume-anthology-great-buddhist-priests"))

Questi precedenti impediscono di presentare _Johannes Gutenberg_, tipografo attivo a Magonza nel Quattrocento, come l’inventore mondiale della stampa o la sua Bibbia come il primo libro stampato in assoluto. Non obbligano però a immaginare una trasmissione diretta di cui non abbiamo dimostrazione. Le esperienze vanno riconosciute nei rispettivi contesti, nei materiali impiegati e nei sistemi di scrittura a cui rispondevano. La vicenda europea avrà conseguenze specifiche sulla produzione e circolazione dei libri, all’interno di una storia della stampa molto più ampia.

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/jikji-1377-secondo-volume-gallica.jpg"),
  [Una doppia pagina del _Jikji_, secondo volume, stampato a Cheongju nel 1377 con caratteri mobili metallici.],
  diritti: [Bibliothèque nationale de France, département des Manuscrits, Coréen 109. Gallica, vista digitale f37.],
  alt: "Doppia pagina del Jikji con caratteri mobili metallici disposti in colonne.",
  placement: top, scope: "parent") <fig-tipo-jikji>

=== Il sistema di _Gutenberg_

A Magonza, intorno alla metà del Quattrocento, _Johannes Gutenberg_ mette a punto un sistema capace di produrre tipi metallici uniformi e intercambiabili e di usarli per la stampa dei libri. La sua importanza riguarda l’integrazione di più operazioni: ottenere i caratteri, comporre il testo, preparare gli inchiostri e imprimere il foglio con il torchio. La Bibbia che porta il suo nome fu probabilmente completata nel 1455. La Library of Congress la descrive come il primo grande libro dell’Europa occidentale stampato con caratteri mobili metallici @t06-loc-gutenberg.#sito([Library of Congress, The Gutenberg Bible.], "https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html")

// L’inserto segue la presentazione della Bibbia, prima dei tipi metallici.
La pagina della Bibbia di _Gutenberg_ (@fig-tipo-bibbia) mostra il rapporto tra il testo stampato con tipi mobili, l’iniziale e la decorazione. Il carattere riprende il gotico librario; la finitura ornamentale della pagina documenta la continuità con la lavorazione manuale.

// Inserto documentario a pagina intera, come nella tavola Figma 340.
#figura-pagina(
  id: "fig-tipo-bibbia",
  file: path("/risorse-condivise/immagini/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
  didascalia: [Bibbia di _Gutenberg_: il testo a tipi mobili convive con la finitura ornamentale della pagina. Riproduzione fotografica.],
  diritti: [Library of Congress, LC-USZ62-51844.],
  alt: "Pagina della Bibbia di Gutenberg con testo gotico in due colonne, capilettera decorati e motivi ornamentali.",
)

// Il salto nativo può generare un foglio di raccordo per aprire la coppia
// sul lato sinistro. Lo sfondo, limitato a quel solo salto, ripete dettagli
// già descritti nella figura completa: non contiene nuove informazioni.
// Non crea pagine mediante una query e non interferisce con le note Meander.
#[
  #set page(background: place(top + left, dx: 18mm, dy: 15mm,
    block(width: 137mm)[
      #dettaglio-figura(titolo: [Testo a stampa e iniziali decorate],
        riferimento: <fig-tipo-bibbia>,
        didascalia: [Nella parte superiore della pagina, il testo gotico in due colonne convive con le iniziali e la decorazione. Riproduzione fotografica in bianco e nero.],
      )[
        #dettaglio(path("/risorse-condivise/immagini/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
          width: 388.35pt, height: 253.62pt,
          originale-width: 563.09pt, originale-height: 563.09pt * 1536 / 1102,
          dx: -51.1pt, dy: -51.1pt,
          alt: "Ingrandimento delle iniziali decorate e delle righe gotiche nella parte superiore della pagina della Bibbia di Gutenberg.")
      ]
      #v(4pt)#testo-diritti[Library of Congress, LC-USZ62-51844.]
      #v(22pt)
      #dettaglio-figura(titolo: [Il margine ornamentale],
        riferimento: <fig-tipo-bibbia>,
        didascalia: [Nel margine inferiore i motivi ornamentali proseguono oltre le due colonne del testo. La visuale completa precede questi dettagli.],
      )[
        #dettaglio(path("/risorse-condivise/immagini/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
          width: 388.35pt, height: 148.27pt,
          originale-width: 388.35pt, originale-height: 388.35pt * 1536 / 1102,
          dx: 0pt, dy: -370pt,
          alt: "Ingrandimento del margine inferiore ornato della stessa pagina della Bibbia di Gutenberg.")
      ]
      #v(4pt)#testo-diritti[Library of Congress, LC-USZ62-51844.]
    ]))
  #pagebreak(to: "even", weak: true)
]

// La cassa richiesta nei commenti 320 e 323 è estratta dal PDF originale.
// Colore e trasparenza restano quelli dell'immagine incorporata nel documento.
// La stessa immagine occupa il dorso della coppia, come nelle tavole 338–339.
// Si ferma sopra la fascia delle note: l'eccezione del Duomo non si estende qui.
#sagoma-regionale(
  id: "fig-tipo-metallici",
  file: path("/risorse-condivise/immagini/figure/tipografia/storia/cassa-caratteri-mobili-scomparti.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/cassa-caratteri-mobili-scomparti.json")),
  larghezza: 440pt,
  inizio-immagine: 170mm - 220pt,
  fondo-immagine: 240mm - 20mm - 35mm - 8pt,
  note-esterne: false,
  didascalia: [Cassa a scomparti e tipi mobili: gli elementi separati possono essere scelti e riordinati per comporre il testo. Illustrazione.],
  alt: "Illustrazione di una cassa di legno a scomparti con caratteri mobili e alcuni tipi metallici separati, sul dorso di due pagine.",
)[
Il tipo porta in rilievo l’immagine rovesciata del segno. Per ricavare più esemplari della stessa forma si lavora su una catena di strumenti: il punzone imprime la propria forma in una matrice e la matrice serve alla fusione dei tipi. I tipi già fusi (@fig-tipo-metallici) si accostano agli elementi di spazio. Il testo composto, inchiostrato e sottoposto alla pressione del torchio lascia sul foglio l’immagine leggibile. La matrice di fusione e la forma di stampa sono dunque oggetti differenti: chiamare «matrice» l’intero testo composto nasconde questa distinzione.

I caratteri della Bibbia riprendono il gotico librario. Le forme angolose e dense mantengono un legame riconoscibile con il manoscritto; iniziali e titoli potevano inoltre ricevere interventi manuali a colori. La nuova tecnologia non cancella immediatamente la lavorazione artigianale. Introduce una diversa economia della ripetizione: la fatica di preparare il testo può essere distribuita su più esemplari, mentre i tipi tornano disponibili per altre composizioni. La lettera diventa una piccola unità materiale che appartiene a un insieme coordinato.

=== Venezia e i tipi romani

La diffusione della stampa crea una rete di officine e competenze. Venezia diviene uno dei luoghi decisivi per l’elaborazione del libro a stampa: alle attività dei tipografi si intrecciano quelle di librai, incisori, correttori e studiosi. La forma del carattere dipende quindi anche dai testi da pubblicare e dai lettori a cui vengono destinati. Non esiste un’unica strada dal manoscritto alla stampa: la scelta fra forme gotiche e romane risponde a tradizioni e pubblici differenti.

Nel 1470 lo stampatore francese _Nicolas Jenson_ stampa a Venezia il _De evangelica praeparatione_ di _Eusebio di Cesarea_, autore cristiano del IV secolo, con un romano che diventerà un riferimento nella storia del disegno dei caratteri (@fig-tipo-jenson). La scheda catalografica online di #cite(<t06-jenson>, form: "prose") descrive l’esemplare conservato dalla biblioteca e ne registra data, luogo di stampa e identificazione del tipo impiegato.#nota-compatta([Morgan Library, scheda dell’opera; _Atalanta/WeiaR_, fotografia di un diverso esemplare.], ("https://www.themorgan.org/incunables/134238", "https://commons.wikimedia.org/wiki/File:JensonEusebius.jpg")) Il confronto con il gotico rende visibile una diversa interpretazione delle lettere: forme più aperte, proporzioni riconducibili alla cultura umanistica e un andamento che conserva la memoria del gesto della penna. Non si tratta di rendere ogni segno geometrico o identico agli altri, ma di trovare una parentela coerente fra forme diverse. La durata di questo modello non consiste nella conservazione immobile di una sagoma. Nei secoli successivi altri progettisti studieranno le stampe di _Jenson_ e ne ricaveranno nuove interpretazioni. Quando un font contemporaneo richiama un modello veneziano, si colloca in questa storia di letture e adattamenti. Per riconoscere il legame occorre osservare il disegno effettivo delle lettere, distinguendo l’opera quattrocentesca dal suo recupero moderno. Un nome storico può indicare una fonte d’ispirazione senza garantire la riproduzione fedele del tipo originale.

]

// Gli esempi chiariscono il recupero di un modello; i campioni già presenti
// rimangono nel loro contesto, collegati da riferimenti automatici.
Il Golden di _William Morris_, designer e scrittore inglese dell’Ottocento, riprende i romani di _Jenson_ con un nuovo disegno (@fig-tipo-morris-caratteri) @t06-morris-archive. EB Garamond è invece il progetto digitale in tondo e corsivo ispirato ai modelli cinquecenteschi di _Claude Garamont_, incisore francese (@fig-tipo-278a) @t06-eb-garamond. Modello storico, reinterpretazione e stile usato restano distinti: il nome non identifica da solo il file contemporaneo.#nota-compatta([William Morris Archive, Golden Type; EB Garamond, descrizione del progetto digitale e fonti storiche.], ("https://morrisarchive.lib.uiowa.edu/exhibits/show/bookarts/kelmscottpress/typefaces", "https://github.com/google/fonts/blob/main/ofl/ebgaramond/DESCRIPTION.en_us.html"))

// Il documento segue la coppia sagomata nel flusso ordinario. La gabbia intera
// rende leggibili i dettagli dei tipi e non interrompe la sagoma della cassa.
#immagine(path("/risorse-condivise/immagini/figure/tipografia/jenson-eusebio-1470-dettaglio.jpg"),
  [Dettaglio del carattere romano nell’_Eusebio_ stampato da _Nicolas Jenson_ a Venezia, 1470.],
  diritti: [Foto Atalanta/WeiaR, 3 febbraio 2008; esemplare del Museum Meermanno-Westreenianum, fotografato alla Koninklijke Bibliotheek, L’Aia. Wikimedia Commons, CC BY-SA 4.0. Riproduzione invariata.],
  alt: "Dettaglio di righe del De evangelica praeparatione composte nel romano di Jenson.",
  width: 137mm, placement: top, scope: "parent") <fig-tipo-jenson>

// Gli esempi locali seguono il documento di Jenson nella medesima coda nativa.
#confronto[
  #set par(justify: false, spacing: 4pt)
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#text(size: 10pt, weight: 500)[Golden · 1897]
     #v(4pt)
     #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/morris-kelmscott-tre-caratteri-1897.jpg"),
       width: 187.09pt, height: 20pt, originale-width: 359.671pt, originale-height: 479.561pt,
       dx: -91.64pt, dy: -94.69pt, alt: "La prima riga del documento Kelmscott: This is the Golden type.")],
    [#text(size: 10pt, weight: 500)[EB Garamond · Regular / Italic]
     #v(4pt)
     #image(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-regular-italic.svg"),
       width: 187.09pt, alt: "EB Garamond Regular e Italic: campioni originali dei due stili.")],
  )
  #v(4pt)
  #block[
    #set par(leading: 1.8pt)
    #text(size: 9pt, weight: 300)[Dettagli della @fig-tipo-morris-caratteri e della @fig-tipo-278a. Modello storico e interpretazione digitale.]
  ]
  #testo-diritti([Kelmscott Press, 16 febbraio 1897; pubblico dominio. EB Garamond: Georg Duffner e Octavio Pardo; SIL OFL 1.1.])
]

]
#[
// Tavole Figma 341–343: prosa continua e documenti originali.
#import "../template/stile.typ": immagine, sito
#import "../template/editoriale.typ": nota-compatta
#import "../template/documenti.typ": dettaglio, tavola-documentaria, campione-storico

=== _Manuzio_ e _Griffo_: romano e corsivo

Alla fine del Quattrocento e all’inizio del Cinquecento il lavoro dell’editore e umanista _Aldo Manuzio_ collega la scelta delle opere alla progettazione della loro forma materiale. L’editore promuove la pubblicazione di testi greci, latini e volgari e si avvale di studiosi e incisori. Il romano preparato per il _De Aetna_ dell’umanista veneziano _Pietro Bembo_, pubblicato nel 1496 secondo la datazione moderna, viene commissionato a _Francesco Griffo_, incisore di punzoni bolognese. La forma del carattere nasce dunque da una collaborazione: l’editore definisce un programma e il punzonista traduce le esigenze in un alfabeto riproducibile @t06-marciana.#sito([Biblioteca Nazionale Marciana, _Aldo Manutius_: ten interludes.], "https://bibliotecanazionalemarciana.cultura.gov.it/en/library/digital-library/aldo-manutius-ten-interludes/")

Il corsivo inciso da _Griffo_ compare in una breve iscrizione nel 1500 ed è usato nell’edizione aldina del poeta latino _Virgilio_, pubblicata nell’aprile 1501. La serie dei libri portatili prosegue nel maggio dello stesso anno con le opere di _Orazio_, poeta latino (@fig-tipo-orazio). Il modello è legato alla scrittura umanistica corsiva, ma non è una sua copia meccanica: una forma tracciata dalla penna deve essere ripensata per funzionare come tipo separato e ripetibile. Per questo è più corretto parlare del *corsivo inciso da _Griffo_ per _Manuzio_*, distinguendo il contributo del disegnatore e incisore da quello dell’editore.

Anche il formato contribuisce all’esperienza del libro. L’*ottavo* indica una struttura ottenuta dalla piegatura del foglio in otto carte, cioè sedici pagine; non definisce una misura fissa in centimetri. I libri piccoli e i manoscritti portatili esistevano già: l’innovazione aldina consiste nell’affermazione di una serie editoriale riconoscibile, in cui il formato maneggevole si accompagna a testi e caratteri attentamente scelti. Il corsivo, che oggi usiamo spesso per un’enfasi interna alla frase, poteva allora sostenere interi testi. La sua storia mostra che anche la funzione di una variante tipografica cambia nel tempo.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/orazio-manuzio-1501-miniatura.jpg"),
  [_Orazio_, _Carmina_, Venezia, _Aldo Manuzio_, maggio 1501: apertura delle _Odi_ in corsivo di _Francesco Griffo_, esemplare miniato per _Mino Rossi_.],
  diritti: [Collezione T. Kimball Brooker; riproduzione Sotheby’s, _Bibliotheca Brookeriana_, lotto 780, 2024.],
  alt: "Pagina miniata delle Odi di Orazio, con titolo maiuscolo e versi nel corsivo inciso da Griffo.",
  width: 220pt, placement: top, scope: "parent") <fig-tipo-orazio>

Nel volume di _Orazio_ pubblicato da _Aldo Manuzio_ a Venezia nel maggio 1501, il titolo in maiuscolo e i versi in corsivo svolgono ruoli diversi (@fig-tipo-orazio). I dettagli ingrandiscono la stessa pagina: *non sono ricostruzioni con un font digitale*. Il corsivo è inciso da _Francesco Griffo_; la miniatura appartiene all’esemplare per _Mino Rossi_.#nota-compatta([Sotheby’s, Bibliotheca Brookeriana, lotto 780 (2024): _Orazio_, maggio 1501.], "https://www.sothebys.com/en/buy/auction/2024/bibliotheca-brookeriana-a-renaissance-library-the-aldine-collection-d-m/horatius-flaccus-horatius-venice-aldo-1501") I documenti completi mostrano il romano del _De Aetna_ e il corsivo delle _Bucoliche_ (@fig-tipo-de-aetna; @fig-tipo-virgilio).

// Il facsimile resta nel flusso delle colonne accanto alla spiegazione.
// Typst sceglie la prima colonna utile: nessuna riga della prosa è assegnata.
#immagine(path("/risorse-condivise/immagini/figure/tipografia/bembo-de-aetna-1496-apertura.jpg"),
  [_Bembo_, _De Aetna_, 1496 (1495 m.v.). Venezia, _Aldo Manuzio_.],
  diritti: [BNCF, Ald.1.1.40; scansione © 2010 ProQuest.],
  alt: "Pagina del De Aetna di Pietro Bembo, stampata da Manuzio nel romano di Griffo.",
  width: 187.09pt, placement: top) <fig-tipo-de-aetna>

// I valori dei due ritagli provengono dal contesto Figma della tavola 343.
// Viene spostata soltanto la fotografia dentro una finestra; il testo resta libero.
#tavola-documentaria[
  #campione-storico(titolo: [Maiuscole del titolo · _Orazio_ 1501],
    didascalia: [Dettaglio della @fig-tipo-orazio: «HORATII», dal titolo delle _Odi di Orazio_, Venezia, _Aldo Manuzio_, 1501. Collezione _T. Kimball Brooker_; riproduzione Sotheby’s, lotto 780, 2024.])[
    #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/orazio-manuzio-1501-miniatura.jpg"),
      width: 284.595pt, height: 54pt, originale-width: 1894.378pt, originale-height: 2918.919pt,
      dx: -532.7pt, dy: -394.05pt, alt: "Dettaglio fotografico della parola HORATII in maiuscolo.")
  ]
  #v(14pt)
  #campione-storico(titolo: [Il corsivo di _Griffo_ · 1501],
    didascalia: [Dettaglio della @fig-tipo-orazio: «atavis edite», dai versi delle _Odi di Orazio_, Venezia, _Aldo Manuzio_, 1501. Corsivo inciso da _Francesco Griffo_. Collezione _T. Kimball Brooker_; riproduzione Sotheby’s, lotto 780, 2024.])[
    #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/orazio-manuzio-1501-miniatura.jpg"),
      width: 207.9pt, height: 54pt, originale-width: 1752.3pt, originale-height: 2700pt,
      dx: -877.5pt, dy: -940.95pt, alt: "Dettaglio fotografico delle parole atavis edite nel corsivo di Griffo.")
  ]
  #v(18pt)
  #align(center)[
    #block(width: 187.09pt)[
      #immagine(path("/risorse-condivise/immagini/figure/tipografia/virgilio-manuzio-1501-bucoliche.jpg"),
      [_Virgilio_, Venezia, _Manuzio_, aprile 1501: _Bucoliche_.],
      diritti: [John Rylands Library, The University of Manchester Library.],
      alt: "Apertura delle Bucoliche di Virgilio nell’edizione aldina del 1501.") <fig-tipo-virgilio>
    ]
  ]
]
]
#[
// Tavole correnti 344–345: doppia pagina del Duomo approvata dall’utente.
// Un solo blocco riceve paragrafi normali, senza suddivisione in righe o pagine.
#import "../template/stile.typ": sito, immagine
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/doppia-pagina.typ": sagoma-duomo

// La figura attraversa il dorso e arriva al bordo inferiore dei due fogli.
// Il testo segue la sagoma nelle quattro colonne; il seguito scorre liberamente.
#sagoma-duomo(
  id: "fig-duomo",
  file: path("/risorse-condivise/immagini/figure/tipografia/duomo-firenze-illustrazione.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/duomo-firenze.json")),
  didascalia: [Firenze e il complesso del Duomo.],
  alt: "Sagoma illustrata del complesso del Duomo di Firenze.",
)[
=== Firenze: tipi, officine e cultura editoriale

Il caso fiorentino (@fig-duomo) mostra un’altra dimensione della storia tipografica: la *disponibilità dei caratteri* è una condizione concreta della produzione culturale. Nel Cinquecento _Lorenzo Torrentino_ lavora come stampatore ducale e pubblica opere che appartengono alla vita letteraria, artistica e istituzionale della città. Fra le produzioni più note vi è la prima edizione delle _Vite_ del pittore e architetto _Giorgio Vasari_, nel 1550, conservata anche nella Biblioteca degli Uffizi. La successiva versione ampliata del 1568 sarà stampata dai Giunti: la distinzione fra le due edizioni evita di attribuire a un’unica officina oggetti diversi @basagniVasari.#nota-compatta([Uffizi, Vite 1550/1568: posseduto (§ 6.3) e scheda del 1568.], ("https://pdf.uffizi.it/1777886745656-cartacollezioni-2.pdf", "https://www.uffizi.it/opere/vasari-giunti"))

_Torrentino_ non inaugura la stampa a Firenze, dove le officine erano attive da decenni. Il suo interesse per questo percorso riguarda invece l’incontro fra una committenza, una selezione di opere e i mezzi necessari per comporle. Pubblicare testi latini o greci richiede di procurarsi serie di segni adeguate, oltre alle competenze per usarle. *Le lettere sono beni materiali*: si acquistano, si trasferiscono e si consumano, e la loro disponibilità apre o limita ciò che un’officina può realizzare.

Un libro storico può quindi essere letto anche come testimonianza del suo *apparato tipografico*. Il frontespizio dichiara un titolo e una responsabilità editoriale; il corpo del testo mostra le forme, le varianti e i repertori di cui lo stampatore disponeva. L’analisi delle lettere non richiede di ricostruire tutta la storia politica del committente. Richiede invece di chiedersi quali segni sono stati scelti, quali tradizioni richiamano e come permettono a quel testo di esistere nella forma che osserviamo.
=== _Caslon_, _Baskerville_, _Didot_ e _Bodoni_

Nel corso del Settecento i caratteri romani vengono reinterpretati attraverso rapporti sempre diversi fra spessore, asse e terminazioni. _William Caslon_, fonditore inglese, conserva il contrasto e l’energia dei modelli precedenti. Il foglio di campioni del 1734 permette di considerare il suo lavoro come un repertorio di caratteri destinati alla stampa, prima che come un nome scelto oggi da un menu. Parlare di _Caslon_ significa infatti confrontarsi con una produzione storica, a cui numerose versioni successive si sono ispirate.

Lo stampatore inglese _John Baskerville_ cerca a Birmingham segni più nitidi. Il suo _Virgilio_ del 1757 è il primo libro della sua officina. La ricerca comprende il disegno delle lettere, ma anche inchiostri, carta e *qualità dell’impressione*: un tratto sottile può essere efficace solo se il processo di riproduzione lo conserva. La Cadbury Research Library documenta l’impiego della carta velina, più liscia, e gli esperimenti di _Baskerville_ per ottenere una stampa nera e definita. La forma non può quindi essere separata completamente dalle condizioni in cui viene resa visibile @birminghamBaskerville.#sito([University of Birmingham, Cadbury Research Library, «Baskerville».], "https://www.birmingham.ac.uk/facilities/cadbury/rarebooks/fine-printing-private-press/baskerville")

Fra Settecento e Ottocento i _Didot_, famiglia di tipografi francesi, e il tipografo _Giambattista Bodoni_ a Parma sviluppano interpretazioni con *forti contrasti*, *assi prevalentemente verticali* e grazie sottili. Il _Manuale tipografico_ di _Bodoni_, pubblicato postumo nel 1818, rende evidente la vastità del suo lavoro @bodoni1818. La @fig-bodoni permette di osservare il carattere nel contesto di una pagina autentica, invece di ridurlo a poche lettere isolate.#sito([Biblioteca Bodoni, Universidad de Salamanca.], "https://bibliotecabodoni.usal.es/libro/manuale-tipografico-1")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"),
  [_Giambattista Bodoni_, _Manuale tipografico_, vol. I, 1818. Contrasto dei tratti e grazie sottili, fra tondo e corsivo. Edizione postuma.],
  diritti: [Immagine: Biblioteca Bodoni, Universidad de Salamanca.],
  alt: "Pagine del Manuale tipografico di Bodoni con caratteri tondi e corsivi.") <fig-bodoni>
]

I frontespizi e il colophon permettono di confrontare le responsabilità editoriali delle due edizioni delle _Vite_ (@fig-tipo-vasari-edizioni).

// Tre originali affiancati nello stesso gruppo, con una sola didascalia comune.
// Il posizionamento mobile lascia a Typst la scelta della pagina del gruppo.
#figure(
  grid(columns: (1fr, 1fr, 1fr), gutter: 8pt,
    image(path("/risorse-condivise/immagini/figure/tipografia/vasari-vite-torrentino-1550-frontespizio.jpg"),
      width: 100%, alt: "Frontespizio delle Vite di Vasari, edizione Torrentino del 1550."),
    image(path("/risorse-condivise/immagini/figure/tipografia/vasari-vite-torrentino-1550-colophon.jpg"),
      width: 100%, alt: "Colophon delle Vite di Vasari, edizione Torrentino del 1550."),
    image(path("/risorse-condivise/immagini/figure/tipografia/vasari-vite-giunti-1568-frontespizio.jpg"),
      width: 100%, alt: "Frontespizio delle Vite di Vasari, edizione Giunti del 1568.")),
  placement: top, scope: "parent", kind: image,
  caption: [_Vasari_, _Le vite_: 1550, _Torrentino_ (a sinistra: frontespizio e colophon); 1568, Giunti (a destra: frontespizio). Dettagli originali.
    #v(4pt)#testo-diritti[Getty Research Institute / Internet Archive.]],
) <fig-tipo-vasari-edizioni>
]
#[
// Documento autonomo della tavola Figma 346: originali e dettagli conservati.
#import "../template/stile.typ": immagine
#import "../template/documenti.typ": dettaglio, tavola-documentaria, campione-storico

// La spiegazione resta insieme ai documenti a cui si riferisce.
// Il testo è ordinario e modificabile: nessuna riga o quota di pagina è imposta.
#tavola-documentaria[
  Nel _Manuale tipografico_ di _Giambattista Bodoni_, pubblicato postumo a Parma nel 1818, tondo e corsivo mostrano ritmo e costruzione diversi. I due dettagli provengono dalla stessa apertura riprodotta nella @fig-bodoni. Il confronto riguarda i caratteri stampati nel documento storico, non una loro versione digitale. Il foglio di _Caslon_ del 1734 e il frontespizio del _Virgilio_ di _Baskerville_ (@fig-tipo-caslon; @fig-tipo-baskerville) documentano altri due repertori del Settecento.

  #v(10pt)

  #campione-storico(titolo: [_Bodoni_ · Tondo · 1818],
    didascalia: [Dettaglio della @fig-bodoni: «Quousque», dal _Manuale tipografico_, vol. I, Parma, 1818, pubblicato postumo. Riproduzione Biblioteca Bodoni, Università di Salamanca.])[
    #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"),
      width: 154.286pt, height: 54pt, originale-width: 1131.429pt, originale-height: 856.286pt,
      dx: -704.57pt, dy: -267.43pt, alt: "Quousque, dettaglio fotografico in tondo dal Manuale di Bodoni.")
  ]
  #v(14pt)
  #campione-storico(titolo: [_Bodoni_ · Corsivo · 1818],
    didascalia: [Dettaglio della @fig-bodoni: «diu etiam furor», dal _Manuale tipografico_, vol. I, Parma, 1818, pubblicato postumo. Riproduzione Biblioteca Bodoni, Università di Salamanca.])[
    #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"),
      width: 270pt, height: 54pt, originale-width: 1320pt, originale-height: 999pt,
      dx: -819pt, dy: -523.5pt, alt: "diu etiam furor, dettaglio fotografico in corsivo dal Manuale di Bodoni.")
  ]
  #v(14pt)
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#immagine(path("/risorse-condivise/immagini/figure/tipografia/caslon-campioni-1734-columbia.jpg"),
      [_William Caslon_, foglio di campioni, 1734 (Ironmonger-Row).],
      diritti: [Columbia University Libraries, RBML.],
      width: 138.975pt, alt: "Foglio di campioni di William Caslon del 1734.") <fig-tipo-caslon>],
    [#immagine(path("/risorse-condivise/immagini/figure/tipografia/baskerville-virgilio-1757-frontespizio.jpg"),
      [_Virgilio_, 1757: frontespizio. Stampa _John Baskerville_, Birmingham.],
      diritti: [Columbia University Libraries, RBML.],
      width: 138.607pt, alt: "Frontespizio del Virgilio stampato da Baskerville a Birmingham nel 1757.") <fig-tipo-baskerville>],
  )
]

Le etichette «antico», «transizionale» e «moderno» aiuteranno più avanti a descrivere queste differenze. Qui conta riconoscere una trasformazione graduale, non una gara in cui il nuovo disegno rende sbagliato il precedente. Un carattere contemporaneo ispirato a _Bodoni_ deve inoltre essere identificato con la propria versione: condividerne il nome non basta a renderlo uguale ai tipi incisi nella sua officina.
]
#[
// Tavole Figma 347–348: il testo segue l'alpha dell'illustrazione.
#import "../template/stile.typ": immagine, sito
#import "../template/sagome.typ": sagoma
#import "../template/campioni.typ": dettaglio-figura

=== Caratteri in legno e manifesti

#sagoma(
  id: "fig-tipo-legno-materia",
  file: path("/risorse-condivise/immagini/figure/tipografia/tipi-legno-illustrazione.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/tipi-legno-illustrazione.json")),
  width: 70pt,
  didascalia: [Caratteri di legno: massa e rilievo dei blocchi per lettere di grandi dimensioni.],
  alt: "Illustrazione scontornata di caratteri mobili di legno.",
)[
L’espansione di manifesti, avvisi e pubblicità nell’Ottocento amplia la gamma dei compiti assegnati alle lettere. Accanto al testo da leggere da vicino compaiono segni destinati a essere riconosciuti a distanza e in tempi brevi. Le fonderie propongono forme più pesanti, più strette, più larghe e più elaborate. Le _fat faces_ sono caratteri con grazie che esasperano il contrasto: *aste molto spesse e filetti sottili* rendono le lettere massicce senza uniformare tutti i tratti.#sito([_Ilene Strizver_, Guide to Typestyles: Didone Typefaces, sezione Bodoni Poster. Monotype / MyFonts.], "https://www.myfonts.com/pages/fontscom-learning-fontology-level-1-type-families-didone") Altre forme, con grazie squadrate o prive di grazie, trovano nuovi spazi nella comunicazione commerciale. La *tipografia display* esiste dunque molto prima dei computer e non coincide con un singolo stile decorativo.
]

Per i *grandi corpi*, cioè le dimensioni elevate dei caratteri necessarie ai manifesti, il legno offre vantaggi pratici rispetto al metallo: i blocchi risultano più leggeri e meno costosi da produrre (@fig-tipo-legno-materia). La raccolta del grafico _Rob Roy Kelly_ dell’Università del Texas documenta questo repertorio e permette di mettere in rapporto i blocchi con le loro prove di stampa. Nella @fig-tipo-legno-campione la forte altezza e la ridotta larghezza non sono un incidente: sono un modo di costruire una voce visiva che può salire molto senza occupare la stessa quantità di spazio in orizzontale @t06-woodtype.#sito([Rob Roy Kelly American Wood Type Collection, University of Texas at Austin, What is Wood Type?], "https://rrk.finearts.utexas.edu/info/what-is-wood-type/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/caratteri-legno-campione-117.jpg"),
  [Tipi di legno No. 117 e relativa prova di stampa: forme strette e alte per i grandi corpi. Il gruppo tridimensionale della @fig-tipo-legno-materia è un’illustrazione di studio dei blocchi tipografici.],
  diritti: [Rob Roy Kelly American Wood Type Collection, The University of Texas at Austin.],
  alt: "Campione storico di caratteri in legno alti e stretti.") <fig-tipo-legno-campione>

Il carattere diventa così una presenza della città. L’ampiezza delle varianti rende possibile differenziare messaggi e attività, ma richiede anche una scelta: una lettera progettata per un titolo vistoso può diventare faticosa in un paragrafo minuto. La distinzione fra testo e display nasce da esigenze d’uso e non dalla semplice contrapposizione fra caratteri sobri e fantasiosi. Perfino una forma molto regolare può essere disegnata soltanto per grandi dimensioni, mentre un carattere da lettura può conservare dettagli espressivi senza ostacolare il testo.

// Il commento Figma333 richiede un richiamo ai blocchi anche alla conclusione.
// Il galleggiante nativo riserva il proprio spazio al fondo della colonna:
// non assegna righe alla prosa e non invade la fascia delle note.
#place(bottom, float: true, scope: "column", clearance: 10pt,
  block(width: 100%, breakable: false)[
    #dettaglio-figura(titolo: [Tipi in legno · massa e rilievo],
      riferimento: <fig-tipo-legno-materia>,
      didascalia: [Ripresa dell’illustrazione di studio; il documento storico No. 117 resta distinto.],
    )[
      #image(path("/risorse-condivise/immagini/figure/tipografia/tipi-legno-illustrazione.png"),
        height: 150pt, alt: "Ripresa dell’illustrazione di studio con cinque blocchi tipografici in legno.")
    ]
  ])
]
#[
// Tavole Figma 348–351: composizione meccanica e revival tipografico.
#import "../template/stile.typ": sito
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/doppia-pagina.typ": sagoma-regionale
#import "../template/figure.typ": figura-pagina
#import "../template/documenti.typ": dettaglio

// L'illustrazione della fonte attraversa il dorso. Le note restano a tutta gabbia.
// La scelta sulla fotografia mancante è ancora in attesa della risposta umana.
// Le citazioni in prosa usano la forma narrativa APA nativa, anche senza data.
#cite(<t06-lanston>, form: none)
#cite(<t06-linotype>, form: none)
#sagoma-regionale(
  id: "fig-tipo-linotype",
  file: path("/risorse-condivise/immagini/figure/tipografia/linotype-illustrazione.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/linotype-illustrazione.json")),
  larghezza: 240pt,
  inizio-immagine: 170mm - 120pt,
  fondo-immagine: 240mm - 20mm - 35mm - 8pt,
  note-esterne: false,
  didascalia: [Linotype «square base», Londra, 1892: illustrazione di studio rielaborata dalla fotografia dell’esemplare. La tastiera seleziona le matrici per fondere righe intere.
    #v(4pt)#testo-diritti[Science Museum Group Collection, 1928-303. © The Board of Trustees of the Science Museum; CC BY-NC-SA 4.0.]],
  alt: "Illustrazione scontornata di una macchina Linotype con tastiera e struttura meccanica.",
)[
=== Linotype e composizione meccanica

La crescente richiesta di testi stampati spinge a meccanizzare anche il lavoro che precede l’impressione. La Linotype dell’inventore tedesco _Ottmar Mergenthaler_, introdotta commercialmente nel 1886, riunisce selezione delle matrici, giustificazione e fusione delle righe. Premendo i tasti, l’operatore fa scendere le matrici dei segni necessari; una volta completata la riga, il metallo fuso produce una barra che porta l’intera linea stampante. Le matrici vengono poi separate e ricondotte ai loro alloggiamenti per essere utilizzate di nuovo. La @fig-tipo-linotype illustra questa tipologia di macchina. Il #cite(<t06-linotype>, form: "prose") ne conserva un esemplare del 1892.#sito([Science Museum Group, Early Linotype composing machine, 1892.], "https://collection.sciencemuseumgroup.org.uk/objects/co37924/early-linotype-composing-machine-1892")

Il nome descrive questa logica: una linea di tipi diventa una sola unità di metallo. La barra, detta _slug_, è diversa dalle matrici che l’hanno generata. È questa sequenza, illustrata nel manuale della Mergenthaler Linotype Company, a rendere più rapida la preparazione del testo. La macchina non inventa una nuova lingua delle lettere: trasferisce una parte della composizione in un sistema meccanico e impone condizioni produttive con cui anche il disegno dei caratteri deve confrontarsi @t06-rogers1925.#nota-compatta([_Rogers_, manuale Linotype (1925); Smithsonian, Mergenthaler Linotype Company Records.], ("https://www.linotype.org/OnLineDocs/LinotypeInstructionBook-1925/LIB-contents.pdf", "https://collections.si.edu/search/detail/ead_collection%3Asova-nmah-ac-0666"))

Il sistema *Monotype* affronta la composizione con una soluzione differente: una tastiera prepara un nastro perforato che comanda una fonditrice, capace di produrre singoli tipi e disporli in righe. Il #cite(<t06-lanston>, form: "prose") conserva una macchina Lanston del 1897 che documenta questa logica. La differenza rispetto alla Linotype riguarda quindi l’unità fusa: il carattere singolo oppure la riga intera. In entrambi i casi il comando meccanico prepara il testo da stampare; non va confuso con il procedimento che trasferisce l’inchiostro sul foglio.#sito([Science Museum Group, Composition caster, Lanston Monotype Corporation, 1897.], "https://collection.sciencemuseumgroup.org.uk/objects/co8989730/composition-caster-by-the-lanston-monotype-corporation-ltd-1897")

Da qui occorre tenere separati due percorsi. La *fotocomposizione* registra i segni con la luce su carta o pellicola fotosensibile, anziché fondere righe.#nota-compatta([USITC, Publication 2281 (1990), p. 7: fotocomposizione su materiale fotosensibile.], "https://www.usitc.gov/publications/701_731/pub2281.pdf") La *composizione digitale* prepara poi il testo come dati. L’offset è un procedimento di stampa indiretta: l’immagine inchiostrata passa dalla lastra a un cilindro rivestito di gomma e poi al foglio. Riguarda quindi il trasferimento dell’immagine sul supporto. Perciò non è corretto affermare che l’offset «sostituì la Linotype» come se fossero due macchine concorrenti per la stessa operazione. Un testo composto in un file può essere destinato a una lastra per la stampa offset oppure a una macchina digitale. La storia delle tecnologie procede attraverso intrecci e coesistenze: una fase prepara il contenuto, un’altra lo rende visibile sulla carta.

=== _William Morris_ e il revival tipografico

L’industrializzazione non produce una sola idea di progresso. _William Morris_, designer e scrittore inglese, fonda la Kelmscott Press nel 1891. Studia i libri del Quattrocento per migliorare la stampa. Golden, Troy e Chaucer sono i suoi caratteri: Golden è un romano ispirato a _Nicolas Jenson_, stampatore a Venezia nel XV secolo; Troy è gotico e Chaucer ne è una versione più piccola. Il #cite(<t06-morris-archive>, form: "prose") dell’Università dell’Iowa conserva i libri della stamperia.#sito([William Morris Archive, University of Iowa, Typefaces.], "https://morrisarchive.lib.uiowa.edu/exhibits/show/bookarts/kelmscottpress/typefaces")

Il riferimento storico non consiste nel prelevare una lettera e ripeterla senza modifiche. _Morris_ osserva le stampe, le fa ingrandire fotograficamente e ridisegna le forme; i punzoni vengono incisi da _Edward Prince_, punzonista per le stamperie d’arte. La collaborazione fra chi concepisce il carattere e chi realizza gli strumenti resta determinante. Il passato diventa un materiale da interpretare, mentre tecnologie relativamente recenti, come la fotografia, rendono possibile studiarlo con una precisione diversa.

Il ridisegno dei tipi antichi di _Morris_ mostra due strade. Un revival tipografico può cercare fedeltà documentaria, oppure può assumere un modello come punto di partenza per un nuovo impiego. In entrambi i casi occorre dichiarare quale fonte si sta osservando e quale trasformazione è stata compiuta. Una versione digitale di un carattere storico deve affrontare schermi, repertori e dimensioni che il suo modello non conosceva. L’interesse della storia sta anche in questo: mostra che conservare una tradizione e inventare nuove forme sono attività che possono procedere insieme, purché non si confondano l’originale e la sua reinterpretazione.
]

Il documento della Kelmscott Press del 16 febbraio 1897 confronta Golden, Troy e Chaucer (@fig-tipo-morris-caratteri). La pagina di _The Well at the World’s End_, stampata dalla Kelmscott Press nel 1896 (@fig-tipo-kelmscott), mostra l’iniziale ornata e il testo gotico in due colonne. Il progetto di _William Morris_ riprende modelli antichi e li rielabora nel contesto produttivo di fine Ottocento @t06-kelmscott.#sito([The Metropolitan Museum of Art, _William Morris_, The Well at the World’s End, 1896.], "https://www.metmuseum.org/art/collection/search/354288")

#figure(
  dettaglio(path("/risorse-condivise/immagini/figure/tipografia/morris-kelmscott-tre-caratteri-1897.jpg"),
    width: 187.09pt, height: 61.854pt, originale-width: 359.671pt, originale-height: 479.561pt,
    dx: -91.64pt, dy: -94.69pt, alt: "Tre righe originali che identificano i caratteri Golden, Troy e Chaucer."),
  kind: image, caption: [Documento Kelmscott Press, 16 febbraio 1897. _William Morris_; pubblico dominio.],
) <fig-tipo-morris-caratteri>

#figura-pagina(
  id: "fig-tipo-kelmscott",
  file: path("/risorse-condivise/immagini/figure/tipografia/morris-kelmscott-well-worlds-end-1896.png"),
  didascalia: [_William Morris_, _The Well at the World’s End_, Kelmscott Press, 1896. Iniziale ornata e testo gotico in due colonne; dettaglio della pagina destra.],
  diritti: [The Metropolitan Museum of Art, 17.3.2641(13), Harris Brisbane Dick Fund, 1917. Public Domain.],
  alt: "Pagina della Kelmscott Press con iniziale decorata, testo gotico su due colonne e bordo ornamentale.",
)
]
#[
// Tavole correnti Figma 351–358: avanguardie, tipografia moderna e digitale.
// Prosa e didascalie native; i documenti e i glifi conservano i propri originali.
#import "../template/stile.typ": immagine, sito
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/documenti.typ": dettaglio
#import "../template/campioni.typ": campione, campione-font, dettaglio-figura

// Preordine delle opere dello stesso autore/anno, per i suffissi APA alfabetici.
// L’ordine delle opere senza data è definito nel file che compone il capitolo.

=== La tipografia delle avanguardie

Nel primo Novecento le avanguardie rendono esplicita la forza visiva della parola stampata. Il lettore incontra lettere che cambiano dimensione, peso, inclinazione e direzione; la forma partecipa *al ritmo e al tono* del testo. In _Zang Tumb Tumb_, pubblicato nel 1914, _Filippo Tommaso Marinetti_, poeta e promotore del Futurismo, rievoca l’assedio di Adrianopoli attraverso una scrittura legata all’onomatopea e alle parole in libertà. Il designer _Cesare Cavanna_ cura la veste tipografica dell’opera, come documenta la scheda del MoMA: anche in un’opera fortemente associata al suo autore letterario, la responsabilità della forma merita di essere identificata. Nella copertina (@fig-tipo-250) la ripetizione di «Tumb» e i salti di corpo fanno percepire il titolo come *una sequenza sonora*. Il Futurismo esalta macchine e velocità dell’industrializzazione; il manifesto di _Marinetti_ (1909) celebra militarismo e patriottismo. _Zang Tumb Tumb_ rievoca l’assedio di Adrianopoli nella prima guerra balcanica (1912–13), prima della Grande Guerra. Corpi e direzioni traducono esplosioni e rumori in ritmo visivo: la forma non è neutra @t06-zang.#sito([The Museum of Modern Art, Zang Tumb Tumb, 1914.], "https://www.moma.org/collection/works/31450")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/marinetti-zang-tumb-tumb-1914.jpg"),
  [_Zang Tumb Tumb_, 1914: corpo, inclinazione e ripetizione del titolo costruiscono un ritmo visivo. _Filippo Tommaso Marinetti_; tipografia di _Cesare Cavanna_; Edizioni Futuriste di Poesia, Milano.],
  diritti: [MoMA, dono della Judith Rothschild Foundation.],
  alt: "Zang Tumb Tumb, 1914: corpo, inclinazione e ripetizione del titolo costruiscono un ritmo visivo. Filippo Tommaso Marinetti; tipografia di Cesare Cavanna; Edizioni Futuriste di Poesia, Milano.",
  width: 154.379pt,
) <fig-tipo-250>


_Fortunato Depero_, artista futurista attivo nella grafica pubblicitaria, continua a esplorare il rapporto fra parola, immagine e promozione nel _Depero futurista_ del 1927, noto come _Libro imbullonato_ (@fig-tipo-251). Il Mart documenta l’uso audace dei caratteri e il confronto concreto con le possibilità dell’officina; il MoMA conserva l’opera come libro illustrato stampato tipograficamente. Le lettere possono assumere un ruolo quasi corporeo, parlare attraverso la loro massa o trasformarsi in figura. La lezione non è che ogni testo debba sorprendere: è che il carattere può essere il *principale materiale espressivo* di un’opera. La sua funzione va valutata in relazione a ciò che il lettore è chiamato a fare @t06-depero.#nota-compatta([MoMA, Depero Futurista (1927); Mart, Depero dalla A alla Z, Editoria.], ("https://www.moma.org/collection/works/13429", "https://www.mart.tn.it/opere-archivi/depero-dalla-a-alla-z-128038"))

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/depero-libro-imbullonato-1927.jpg"),
  [_Fortunato Depero_, _Depero Futurista_, 1927: copertina del _Libro imbullonato_. Lettere di dimensioni e direzioni differenti rendono il titolo una figura.],
  diritti: [MoMA, 202.1997. Acquisto, trasferito dalla Biblioteca del Museum of Modern Art, New York; © 2026 Artists Rights Society (ARS), New York / SIAE, Roma.],
  alt: "Fortunato Depero, _Depero Futurista_, 1927: copertina del Libro imbullonato. Lettere di dimensioni e direzioni differenti rendono il titolo una figura.",
) <fig-tipo-251>


=== L’alfabeto come progetto moderno

La ricerca moderna non riguarda soltanto l’espressività di una parola isolata. Riguarda anche la possibilità di ripensare *l’alfabeto come un sistema*. Nel 1925 _Herbert Bayer_, grafico e docente al Bauhaus, elabora il progetto Universal: le lettere senza grazie e le costruzioni semplificate propongono una diversa coerenza formale. Il foglio originale conservato dalla Letterform Archive mostra anche varianti di alcuni segni. La @fig-tipo-252 permette di guardare all’esperimento nella sua materialità, come disegno a inchiostro e gouache su cartone. Il nome «Universal» esprime *un’ambizione storica*, non una leggibilità garantita per ogni persona e lingua. Il foglio del 1925 mostra un progetto e le sue varianti. Per ricavarne un font occorre scegliere fra le varianti, completare il repertorio necessario (per esempio accenti, cifre e punteggiatura), regolare le spaziature e verificare parole e righe a più dimensioni. Se si sviluppano più pesi o stili, occorre coordinarli. La traduzione digitale comporta quindi nuove scelte, non la semplice copia del disegno @t06-bayer.#sito([Letterform Archive, _Herbert Bayer_, Original lettering for Universal Type, 1925.], "https://exhibitions.letterformarchive.org/bauhaus/artworks/original-lettering-for-universal-type") Negli stessi anni il disegnatore di caratteri tedesco _Paul Renner_ sviluppa Futura (@fig-tipo-255a), pubblicato dalla fonderia Bauer nel 1927. La presenza di forme geometriche lo avvicina al clima della modernità, ma non autorizza ad attribuirlo a _Bayer_ o a definirlo un prodotto del Bauhaus. I due casi condividono domande e contesto, conservando *autori e processi distinti* @t06-futura.#sito([Monotype, Will the real Futura please stand up?], "https://www.monotype.com/resources/expertise/will-real-futura-please-stand")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/bayer-universal-1925.png"),
  [_Original lettering for Universal Type_, 1925. Il foglio conserva costruzioni e varianti del progetto di alfabeto. _Herbert Bayer_, Dessau; inchiostro e gouache su cartone.],
  diritti: [Letterform Archive.],
  alt: "_Original lettering for Universal Type_, 1925. Il foglio conserva costruzioni e varianti del progetto di alfabeto. Herbert Bayer, Dessau; inchiostro e gouache su cartone.",
) <fig-tipo-252>


#campione-font(path("/risorse-condivise/immagini/figure/tipografia/storia/futura-medium-contorni.svg"),
  titolo: [Futura Medium], larghezza: 67.166pt, da-alto: 2.3544pt,
  didascalia: [Futura Medium, estratto di contorni autentici.], diritti: [_Paul Renner_.],
  alt: "Campione Aag del carattere Futura Medium, dal disegno originale del font.") <fig-tipo-255a>

// La parola è lo stesso SVG autentico usato dalle slide: 48 × 0,75 = 36 pt.
// reflow riserva l’ingombro ruotato; nessun testo viene coperto o ripartito.
#block(breakable: false, above: 8pt, below: 10pt)[
  #dettaglio-figura(titolo: [Futura Medium · lettura verticale],
    riferimento: <fig-tipo-255a>,
    didascalia: [«Tipografia», corpo nominale 36 pt, ruotata di 90°.],
  )[
    #rotate(90deg, reflow: true,
      image(path("/risorse-condivise/immagini/figure/tipografia/storia/futura-medium-parola-tipografia.svg"),
        width: 225.14062pt * 0.75,
        alt: "La parola Tipografia in Futura Medium, ruotata di novanta gradi; contorni e proporzioni invariati."))
  ]
  #v(4pt)#testo-diritti[Futura Medium: Neufville Digital; parti Visualogik Technology & Design.]
]


Anche _Jan Tschichold_, tipografo e teorico della Nuova Tipografia, partecipa al dibattito con _Elementare Typographie_ nel 1925. Il suo programma attribuisce ai caratteri un *ruolo funzionale e comunicativo*, in rapporto alle possibilità della produzione moderna. Qui «moderno» non indica uno stile unico: _Bayer_ ripensa l’alfabeto, _Renner_ sviluppa Futura e _Tschichold_ propone regole per comporre la pagina. Le classificazioni successive descriveranno le forme dei caratteri; non basteranno, da sole, a spiegare questi diversi obiettivi progettuali. La @fig-tipo-253 conserva il documento con cui questa proposta viene presentata al pubblico dei tipografi @t06-tschichold.#sito([Deutsche Nationalbibliothek, Elementary typography.], "https://mediengeschichte.dnb.de/DBSMZBN/Content/EN/TheAestheticsOfTheBook/09-jan-tschichold-elementare-typografie-en.html")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/tschichold-elementare-typographie-1925.jpg"),
  [_Elementare Typographie_, ottobre 1925: minuscole senza grazie e pesi marcati. Supplemento di _Typographische Mitteilungen_. _Jan Tschichold_.],
  diritti: [Deutsches Buch- und Schriftmuseum, Deutsche Nationalbibliothek, Leipzig.],
  alt: "Elementare Typographie, ottobre 1925: minuscole senza grazie e pesi marcati. Supplemento di Typographische Mitteilungen. Jan Tschichold.",
  width: 150.647pt,
) <fig-tipo-253>


=== Quando le lettere diventano un segno politico

Un carattere *può diventare un simbolo politico* quando un movimento lo usa per rappresentarsi. Il regime nazista tedesco usò la Fraktur e altre scritture spezzate per evocare una presunta tradizione nazionale. Il 3 gennaio 1941 _Martin Bormann_, capo dello staff di _Rudolf Heß_, vice del dittatore nazista _Adolf Hitler_, comunicò invece una decisione di _Hitler_: sostituirle gradualmente con l’Antiqua, i caratteri di tradizione umanistica, negli stampati e negli usi ufficiali. La circolare giustificava la svolta attribuendo falsamente alle scritture spezzate un’origine ebraica. Era un’accusa antisemita usata come propaganda, priva di fondamento storico. L’intestazione in scrittura spezzata e il testo dattiloscritto mostrano i due repertori nello stesso documento (@fig-tipo-254) @t06-bormann1941.#sito([_Martin Bormann_, circolare del 3 gennaio 1941, riproduzione originale.], "https://commons.wikimedia.org/wiki/File:Schrifterlass_Antiqua1941.jpg")

#figure(
  stack(dir: ttb, spacing: 8pt,
    align(center, image(path("/risorse-condivise/immagini/figure/tipografia/storia/bormann-circolare-antiqua-1941.jpg"),
      width: 100.198pt, alt: "Circolare di Bormann del 3 gennaio 1941, documento completo.")),
    dettaglio(path("/risorse-condivise/immagini/figure/tipografia/storia/bormann-circolare-antiqua-1941.jpg"),
      width: 187.09pt, height: 37.418pt, originale-width: 495.788pt, originale-height: 792.014pt,
      dx: -17.46pt, dy: -26.82pt, alt: "Intestazione della circolare in scrittura Fraktur, ingrandita."),
    dettaglio(path("/risorse-condivise/immagini/figure/tipografia/storia/bormann-circolare-antiqua-1941.jpg"),
      width: 187.09pt, height: 16.119pt, originale-width: 457.651pt, originale-height: 731.09pt,
      dx: -51.81pt, dy: -282.07pt, alt: "Prima riga dattiloscritta della circolare, ingrandita."),
  ), kind: image,
  caption: [Circolare di _Martin Bormann_, 3 gennaio 1941, sul passaggio all’Antiqua. Dall’alto: documento integrale; intestazione in Fraktur ingrandita; prima riga dattiloscritta ingrandita. Il confronto rende visibile la differenza tra i repertori richiamati nel testo.
    #v(4pt)#testo-diritti[Wikimedia Commons, Schrifterlass Antiqua1941; opera ufficiale indicata come pubblico dominio nella scheda.]],
) <fig-tipo-254>


Il medesimo regime usò dunque prima la Fraktur e poi l’Antiqua. Le forme delle lettere *non hanno un orientamento politico innato*: il significato dipende da chi le usa, dal messaggio e dal contesto. Il confronto dei due repertori è visibile nella @fig-tipo-fraktur-antiqua. Sono la scelta, il testo, la ripetizione e la situazione storica a costruire associazioni che possono durare anche dopo un cambiamento ufficiale.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/fraktur-antiqua-confronto.svg"),
  [Due repertori a confronto, attraverso campioni digitali: UnifrakturMaguntia ed EB Garamond.],
  alt: "Le parole composte in UnifrakturMaguntia e in EB Garamond, con etichette che distinguono Fraktur e Antiqua.",
  placement: top, scope: "parent") <fig-tipo-fraktur-antiqua>


Un diverso linguaggio della propaganda è visibile nel manifesto _Let’s Fulfill the Plan of Great Works_ del 1930 di _Gustav Klutsis_, artista lettone attivo nella propaganda sovietica, conservato al MoMA (@fig-tipo-255). Le parole in cirillico presentano forme senza grazie, compatte e di peso marcato; le differenze di corpo rendono evidenti alcune parti dello slogan. Qui osserviamo la tipografia come presenza di un *messaggio politico specifico*, senza attribuire a tutti i caratteri geometrici o privi di grazie il medesimo significato. Leggere il documento significa distinguere il disegno delle lettere dall’ideologia che lo impiega e identificare precisamente autore, data e funzione @t06-klutsis.#sito([The Museum of Modern Art, Let’s Fulfill the Plan of Great Works, 1930.], "https://www.moma.org/collection/works/6487")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/klutsis-piano-grandi-opere-1930.jpg"),
  [_Gustav Klutsis_, _Let’s Fulfill the Plan of Great Works_, 1930. Le parole in cirillico e i contrasti di corpo fanno parte di un preciso messaggio politico.],
  diritti: [MoMA, 357.1937, Purchase Fund, Jan Tschichold Collection. © Artists Rights Society.],
  alt: "Gustav Klutsis, Let’s Fulfill the Plan of Great Works, 1930. Le parole in cirillico e i contrasti di corpo fanno parte di un preciso messaggio politico.",
  width: 150.601pt,
) <fig-tipo-255>


=== La tipografia svizzera

Nel secondo dopoguerra il lavoro di progettisti svizzeri contribuisce alla diffusione internazionale di una tipografia che privilegia repertori essenziali e caratteri senza grazie. È una scelta storicamente riconoscibile, spesso collegata a un’idea di precisione e controllo. Non significa però che il sans serif sia privo di personalità: la selezione di un carattere, il suo peso e il rapporto fra maiuscole e minuscole continuano a *costruire un tono*. Il manifesto _beethoven_ (1955) del grafico svizzero _Josef Müller-Brockmann_ offre un esempio di minuscole compatte e controllate. Il carattere sostiene il contenuto culturale senza illustrare letteralmente la musica né ricorrere a un alfabeto decorativo (@fig-tipo-256). La Fondazione Müller-Brockmann documenta la discussione con il committente sulle minuscole: una scelta che oggi può sembrare ovvia era parte del progetto @t06-muller.#sito([Shizuko Yoshikawa and Josef Müller-Brockmann Foundation, _Josef Müller-Brockmann_.], "https://www.shizukoyoshikawa.ch/ja/josef-mueller-brockmann/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/muller-brockmann-beethoven-1955.png"),
  [_beethoven_, 22 febbraio 1955: titolo in minuscolo senza grazie nel manifesto per la Tonhalle-Gesellschaft Zürich. _Josef Müller-Brockmann_.],
  diritti: [Shizuko Yoshikawa and Josef Müller-Brockmann Foundation.],
  alt: "beethoven, 22 febbraio 1955: titolo in minuscolo senza grazie nel manifesto per la Tonhalle-Gesellschaft Zürich. Josef Müller-Brockmann.",
  width: 115.911pt,
) <fig-tipo-256>


Nel 1957 il disegnatore di caratteri svizzero _Max Miedinger_ sviluppa con _Eduard Hoffmann_, direttore della fonderia Haas, il carattere che diventerà Helvetica (@fig-tipo-256a). Il suo ampio impiego ne accresce familiarità e riconoscibilità, ma *non lo rende una soluzione universale*. La storia di un carattere comprende le funzioni per cui nasce e quelle che gli vengono affidate in seguito. Quando entra nelle identità aziendali, nella segnaletica o negli schermi, può ricevere nuove versioni e correzioni. L’idea di «neutralità» va quindi letta come un’intenzione comunicativa o una *percezione contestuale*, non come una proprietà scientifica presente in tutte le lettere prive di grazie @t06-helvetica.#sito([Monotype, The complicated legacy of Helvetica.], "https://www.monotype.com/resources/articles/complicated-legacy-helvetica")

#campione-font(path("/risorse-condivise/immagini/figure/tipografia/storia/helvetica-regular-contorni.svg"),
  titolo: [Helvetica Regular], larghezza: 61.084pt, da-alto: 5.3784pt,
  didascalia: [Helvetica Regular, contorni autentici.], diritti: [_Max Miedinger_ / Haas.],
  alt: "Campione Aag del carattere Helvetica Regular, dal disegno originale del font.") <fig-tipo-256a>


=== Il pixel e il contorno

Con il computer, il carattere diventa anche un *insieme di dati*. Sui primi schermi a bassa risoluzione, una curva deve essere descritta da pochi pixel e il disegnatore deve decidere come preservare le differenze fra i segni. Non basta ridurre una lettera pensata per la stampa: la disponibilità di una manciata di elementi può richiedere una soluzione specifica. La tipografia per lo schermo rende particolarmente evidente il rapporto fra forma ideale e forma effettivamente visualizzata. La @fig-tipo-257a rende visibile la costruzione per celle.

#campione(titolo: [Lettere a pixel],
  didascalia: [Lettere a pixel; in azzurro una cella.])[
  #image(path("/risorse-condivise/immagini/figure/tipografia/storia/lettere-pixel-matrice-5x7.svg"),
    width: 66pt, height: 42pt, alt: "A e a costruite su matrici di 5 per 7 celle; una cella è evidenziata in azzurro.")
] <fig-tipo-257a>


_Susan Kare_, grafica statunitense autrice di icone e font per il Macintosh, racconta in prima persona questo lavoro. Il primo carattere di sistema, poi chiamato Chicago, era pensato come un disegno robusto per l’interfaccia (@fig-tipo-chicago). La disponibilità di caratteri proporzionali permetteva inoltre di assegnare a lettere come m e i larghezze differenti. Nel suo racconto, il passaggio ai nomi di grandi città appartiene alla stessa cultura di progetto: il font è un elemento funzionale, ma anche una parte riconoscibile dell’esperienza del computer @t06-kare.#sito([_Susan Kare_, World Class Cities. Folklore.org.], "https://folklore.org/World_Class_Cities.html")

#campione(titolo: [Chicago], fascia: 40pt,
  didascalia: [Chicago: dettaglio del campione bitmap originale.],
  diritti: [Kare / Apple; riproduzione Cornell Tech, 2016.])[
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/storia/kare-chicago-documento-cornell-2016.png"),
    width: 119.88pt, height: 25.92pt, originale-width: 972pt, originale-height: 547.02pt,
    dx: -273.24pt, dy: -154.44pt, alt: "Parola Chicago nel campione bitmap autentico, tratta dal documento Cornell Tech.")
] <fig-tipo-chicago>


_Zuzana Licko_, disegnatrice di caratteri e cofondatrice di Emigre, assume a sua volta le condizioni della bassa risoluzione come un materiale progettuale. La famiglia Lo-Res di Emigre riunisce nel 2001 lavori iniziati nel 1985. Nella @fig-tipo-257 gradini e blocchi non sono difetti da nascondere, ma *tratti dell’identità del carattere*. L’immagine è tratta da uno *specimen*, una presentazione di campioni che mostra il disegno e le possibilità d’uso di un carattere. È una presentazione contemporanea di quella ricerca, non uno screenshot del 1985 @t06-lores.#sito([Emigre, Lo-Res Font Family.], "https://www.emigre.com/Fonts/Lo-Res")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/storia/licko-lo-res-specimen.png"),
  [Lo-Res: costruzione per pixel in uno specimen attuale di progetti avviati nel 1985 e riuniti nella famiglia del 2001.],
  diritti: [_Zuzana Licko_, Emigre.],
  alt: "Lo-Res: costruzione per pixel in uno specimen attuale di progetti avviati nel 1985 e riuniti nella famiglia del 2001. Zuzana Licko, Emigre.",
) <fig-tipo-257>


Nel 1985 l’incontro fra il Macintosh, PageMaker di Aldus, il linguaggio PostScript di Adobe e la stampante LaserWriter favorisce l’affermazione del *desktop publishing*. Una parte crescente della composizione tipografica diventa accessibile sul personal computer: scegliere il carattere, controllare le righe e correggere il testo può avvenire nello stesso ambiente. Il Computer History Museum documenta questo passaggio; la documentazione Aldus del 1987 mostra già controlli di crenatura, interlinea e sillabazione. Non è la fine dei mestieri della stampa, ma un cambiamento nella distribuzione degli strumenti e delle decisioni sul testo @t06-chm-dtp @t06-aldus1987.#footnote[Computer History Museum, Desktop Publishing: #text(size: 7pt)[#link("https://www.computerhistory.org/revolution/personal-computers/17/306")]. Documentazione Aldus, circa 1987: #text(size: 7pt)[#link("https://archive.computerhistory.org/resources/text/Aldus/aldus.folder.1987.102659290.pdf")].]

Parallelamente, i font a contorni descrivono la forma attraverso *coordinate e curve*. Per mostrarla su uno schermo, il software la ridimensiona e la converte in una griglia di pixel: questo passaggio è la rasterizzazione. La diffusione di strumenti digitali amplia le possibilità di disegno, di distribuzione e di composizione. Un file può contenere numerosi glifi e funzioni, e una famiglia variabile può definire un campo di variazioni. La storia non termina con la scomparsa dei vincoli: cambiano i vincoli, mentre restano da decidere proporzioni, differenze e qualità della lettura. Per descriverle con precisione, il passo successivo è entrare nell’anatomia delle lettere.
]
#[
// Anatomia delle lettere: trascrizione dalle tavole Figma 359–371.
// Testo e didascalie modificabili; nessun limite di righe o pagine.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito

== Anatomia delle lettere

Dopo aver incontrato lettere prodotte con strumenti e finalità differenti, serve un lessico che permetta di confrontarle. *L’anatomia dei caratteri* dà un nome alle loro parti e alle relazioni che le tengono insieme. Parlare di un’asta, di una controforma o di un terminale è più preciso che definire una lettera soltanto «elegante» o «moderna». Il vocabolario non sostituisce l’osservazione: permette di indicare dove si trova la differenza che stiamo osservando @t06-monotype-glossario.#sito([Monotype, The A–Z of typographic terms.], "https://www.monotype.com/resources/typographic-terms")

Molti termini usano metafore del corpo: la lettera può avere una pancia, una gamba, una spalla o un orecchio. Queste parole sono strumenti descrittivi. Non implicano che ogni segno contenga tutte le parti. Una g a due occhielli offre dettagli che una g a un solo occhio non possiede; un carattere privo di grazie non può mostrarle come se fossero state semplicemente nascoste. Anche *la terminologia varia* fra scuole e lingue: per questo i campioni accompagnano i nomi italiani con il termine inglese quando aiuta a riconoscere la voce nei software e nella letteratura. La mappa (@fig-tipo-258) introduce un percorso dall’insieme al dettaglio. Le guide rendono confrontabili le altezze, mentre gli agganci segnalano parti disegnate e spazi interni. Nei campioni successivi il blu non inventa una nuova forma: evidenzia una porzione dei *contorni del font*. Si può così passare dal campione al singolo glifo e tornare al campione, verificando che il dettaglio analizzato appartenga davvero al carattere mostrato @t06-roboto-serif.#sito([Commercial Type e _Greg Gazdowicz_, Roboto Serif: file e licenza.], "https://github.com/google/fonts/tree/main/ofl/robotoserif")

#figure(
  stack(dir: ttb, spacing: 8pt,
    image(path("/risorse-condivise/immagini/figure/tipografia/anatomia/riferimenti-verticali.svg"), width: 137mm, alt: "Riferimenti verticali della lettera: ascendente, maiuscole, altezza della x, linea di base e discendente."),
    image(path("/risorse-condivise/immagini/figure/tipografia/anatomia/dettagli-anatomici.svg"), width: 137mm, alt: "Sei dettagli anatomici: asta, spalla, orecchio, grazia, controforma e pancia."),
  ), kind: image, placement: top, scope: "parent",
  caption: [Quote del campione e sei dettagli anatomici, distinti in due pannelli.
    #v(4pt)#testo-diritti[Roboto Serif 500, Commercial Type e Google Fonts; SIL OFL 1.1.]],
) <fig-tipo-258>

=== Il corpo: una misura, non una sagoma

Quando si imposta un testo a 12 punti, non si sta dichiarando che tutte le lettere visibili siano alte 12 punti. Il corpo è *una misura nominale* che stabilisce la scala del carattere. Nel tipo metallico è legato al corpo fisico del pezzo; nel digitale l’_em_ fornisce la scala di *un sistema di coordinate* in cui descrivere le forme. A 12 punti un _em_ misura 12 punti, ma i contorni possono occuparne porzioni diverse e, in alcuni casi, oltrepassarne i limiti. Il punto tipografico usato nel sistema PostScript corrisponde a *1/72 di pollice*. Un valore di corpo non indica però quanti pixel saranno effettivamente impiegati dal dispositivo, né coincide con l’altezza della x o delle maiuscole. Sono grandezze collegate, ma distinte. I font possono impiegare anche un diverso numero di unità interne per _em_: questo aumenta o modifica la precisione delle coordinate senza rendere più grande la lettera quando viene composta allo stesso corpo. La conseguenza è visibile in un confronto elementare. Due campioni impostati alla stessa misura possono apparire di dimensioni diverse perché differiscono le proporzioni fra minuscole, maiuscole ed estensioni. Per confrontarli è utile mantenere la scala dichiarata e osservare le parti; per farli convivere può servire un *aggiustamento ottico*. La misura comune è un punto di partenza, non la promessa di un’identica presenza visiva. L’anatomia aiuta proprio a spiegare da dove proviene quella differenza @t06-opentype-head.#sito([Microsoft, OpenType: head — Font Header Table.], "https://learn.microsoft.com/en-us/typography/opentype/spec/head")

=== Linea di base, altezza della x e maiuscole

La *linea di base*, o baseline, è il riferimento su cui si allineano le lettere latine in una riga ordinaria. Non è il bordo inferiore di ogni segno: alcune parti scendono sotto di essa e le forme tonde possono oltrepassarla leggermente per una compensazione ottica. Nei nostri schemi la guida permette di individuare un punto comune, senza tagliare idealmente tutto ciò che lo supera.

*L’altezza della x*, o x-height, descrive l’altezza di riferimento delle minuscole prive di estensioni. La x è il segno da cui prende nome; la misura non indica l’altezza di ciascun glifo dell’alfabeto. Una b, una p e una maiuscola hanno strutture che occupano zone diverse. Il campione (@fig-tipo-259) isola la x, così che la relazione fra il punto di partenza e la parte superiore resti leggibile.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/altezza-x.svg"),
  [Altezza della x, misurata fra la linea di base e la sommità della lettera.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Altezza della x, misurata fra la linea di base e la sommità della lettera.",
) <fig-tipo-259>

*L’altezza delle maiuscole*, o cap-height, si osserva a partire dalla stessa baseline. La H della @fig-tipo-260 offre un riferimento piano e rende immediato il confronto con l’altezza delle minuscole. Una O o una lettera appuntita può sporgere un poco oltre la linea convenzionale per apparire della stessa altezza: questa eccedenza ottica è chiamata overshoot.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/altezza-maiuscole.svg"),
  [Altezza delle maiuscole: le guide collegano la linea di base alla sommità della H.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Altezza delle maiuscole: le guide collegano la linea di base alla sommità della H.",
) <fig-tipo-260>

Nelle quote bisogna infine distinguere i valori dichiarati dal font dai limiti esatti dei contorni. Le *metriche nominali* servono al funzionamento dell’insieme; un singolo glifo può fermarsi prima o superarle. Guardare contemporaneamente misura e forma evita di trattare una guida come una barriera rigida e prepara a confrontare caratteri con proporzioni differenti.

=== Ascendenti e discendenti

Nel confronto fra h e n, una parte della differenza è affidata all’estensione verticale. L’ascendente è la porzione della minuscola che *supera l’altezza della x*. Nella h della @fig-tipo-261 il blu individua soltanto quella zona: l’asta continua anche sotto, ma non tutta l’asta è un ascendente. La distinzione permette di descrivere un carattere con estensioni lunghe senza confondere la misura della parte con il corpo complessivo.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/ascendente.svg"),
  [Nella h, l’ascendente supera l’altezza della x; il tratto è evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Nella h, l’ascendente supera l’altezza della x; il tratto è evidenziato in blu.",
) <fig-tipo-261>

Il discendente è invece la parte che *scende sotto la linea di base*. La p della @fig-tipo-262 rende chiaro il rapporto: la pancia resta nella zona delle minuscole, mentre il prolungamento dell’asta occupa lo spazio inferiore. Altre lettere, come g, j, q e y, possono scendere con forme differenti. Un discendente non deve essere per forza un segmento verticale; può contenere curve e terminazioni, secondo il disegno del glifo.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/discendente.svg"),
  [Nella p, il discendente scende sotto la linea di base, indicata dalla guida orizzontale.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Nella p, il discendente scende sotto la linea di base, indicata dalla guida orizzontale.",
) <fig-tipo-262>

Le altezze di queste estensioni *non sono universali*. In alcuni caratteri gli ascendenti superano le maiuscole, in altri il rapporto è diverso. Anche accenti e segni diacritici occupano spazio e vanno osservati sui testi reali. Per questo conoscere soltanto l’altezza della x non basta a descrivere la presenza verticale di una famiglia. La forma di una parola nasce dall’alternanza fra corpi centrali ed estensioni: provando parole che contengono molte h, b, p o g diventa più facile riconoscere quanto questa alternanza contribuisca alla sua fisionomia.

=== Aste, tratti, braccia e gambe

Il tratto è l’elemento disegnato che costruisce la lettera: può essere rettilineo o curvo, verticale, orizzontale o diagonale. L’asta è uno dei *tratti portanti*, tipicamente verticale. Nella h della @fig-tipo-263 possiamo individuarla e distinguerla dalla curva della spalla. Il termine generale «tratto», illustrato nella @fig-tipo-264, permette invece di parlare del disegno senza assegnargli subito una funzione più specifica.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/asta.svg"),
  [L’asta verticale della h, evidenziata in blu, è uno dei tratti portanti della lettera.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "L’asta verticale della h, evidenziata in blu, è uno dei tratti portanti della lettera.",
) <fig-tipo-263>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/tratto-obliquo.svg"),
  [Il tratto obliquo destro della v, evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Il tratto obliquo destro della v, evidenziato in blu.",
) <fig-tipo-264>

Un braccio ha *un’estremità libera*: nella E i tratti orizzontali si protendono dall’asta senza chiudersi su un secondo sostegno. La @fig-tipo-266 mostra la parte selezionata nel campione. La gamba scende invece dal corpo della lettera, spesso in diagonale, come nella R o nella K. Nella @fig-tipo-265 la K mostra questa *discesa distinta dall’asta verticale* e dal braccio obliquo superiore. L’utilità dei nomi emerge soprattutto nel confronto: due R possono condividere una struttura riconoscibile e differire per l’attacco, l’inclinazione o la conclusione della gamba. Dire che una R «è più dinamica» rimane una prima impressione; indicare una gamba che si apre progressivamente verso l’esterno rende l’osservazione discutibile e verificabile. Lo stesso vale per la larghezza dei bracci della E o per la proporzione delle aste della H. Questi elementi non sono pezzi indipendenti da assemblare sempre nello stesso modo. Il disegnatore deve coordinare raccordi, spessori e curvature affinché la lettera rimanga riconoscibile e appartenga alla stessa famiglia delle altre. L’anatomia scompone per permettere di capire, ma il risultato va sempre *ricomposto nella forma intera*.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/braccio.svg"),
  [Il braccio superiore della E si estende dall’asta verticale e rimane libero all’estremità.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Il braccio superiore della E si estende dall’asta verticale e rimane libero all’estremità.",
) <fig-tipo-266>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/gamba.svg"),
  [La gamba della K è il tratto obliquo che dal nodo centrale scende verso la linea di base.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La gamba della K è il tratto obliquo che dal nodo centrale scende verso la linea di base.",
) <fig-tipo-265>

=== Spalle, orecchi, spine e code

*La spalla* è la curva che, in lettere come h, m e n, conduce dall’asta verso un altro tratto. Il campione (@fig-tipo-268) permette di seguire questo passaggio: la forma può aprirsi dolcemente oppure cambiare direzione con maggiore decisione. La n non è quindi descritta soltanto da altezza e larghezza; conta anche il modo in cui la curva entra nell’asta e ritorna verso la linea di base.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/spalla.svg"),
  [La spalla della n è il tratto curvo che raccorda l’asta alla parte destra della lettera.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La spalla della n è il tratto curvo che raccorda l’asta alla parte destra della lettera.",
) <fig-tipo-268>

*L’orecchio è una piccola sporgenza*, riconoscibile nella parte superiore della g a due occhielli. Nella @fig-tipo-267 è evidenziato un dettaglio che può cambiare molto fra famiglie: direzione, lunghezza e conclusione contribuiscono all’identità del segno. La sua presenza dipende però dalla forma concreta adottata per la lettera, perciò va cercato nel glifo e non presunto sulla base del solo nome.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/orecchio.svg"),
  [La piccola sporgenza in alto a destra della g è l’orecchio, evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La piccola sporgenza in alto a destra della g è l’orecchio, evidenziato in blu.",
) <fig-tipo-267>

La spina è *l’andamento curvo principale* della S e della s. Nella @fig-tipo-269 attraversa la zona centrale e coordina le due parti della lettera. Seguirla con lo sguardo aiuta a vedere che una S non nasce necessariamente da due semicerchi uguali. La relazione fra la parte alta e quella bassa, insieme ai cambiamenti di spessore, produce l’equilibrio della forma.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/spina.svg"),
  [La spina della S è la curva centrale che raccorda le due parti del segno.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La spina della S è la curva centrale che raccorda le due parti del segno.",
) <fig-tipo-269>

La coda è infine il *prolungamento che distingue*, fra gli esempi più evidenti, la Q dalla O. La @fig-tipo-270 la mostra nel contorno originale del carattere. Può partire dall’interno, attraversare il bordo o svilupparsi all’esterno, secondo il progetto. Basta confrontare poche Q per capire quanto un dettaglio apparentemente secondario possa rendere riconoscibile un’intera famiglia, senza che quel dettaglio debba essere ripetuto in tutte le altre lettere.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/coda.svg"),
  [La coda della Q sporge dal corpo circolare della lettera e ne modifica il profilo inferiore.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La coda della Q sporge dal corpo circolare della lettera e ne modifica il profilo inferiore.",
) <fig-tipo-270>

=== Barre, grazie e terminali

La *barra trasversale* unisce o attraversa altri tratti. È facile individuarla nella H e nella A: una parte orizzontale mette in relazione le strutture che salgono. La @fig-tipo-271 mostra invece il tratto che attraversa una f. Nei glossari inglesi si può incontrare una distinzione più fine fra crossbar, che collega, e cross stroke, come il tratto che attraversa una t o una f. La funzione e la posizione aiutano a scegliere la parola appropriata, evitando di chiamare genericamente «asta» ogni segmento della lettera.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/barra.svg"),
  [La barra della f attraversa l’asta con un tratto orizzontale, qui evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La barra della f attraversa l’asta con un tratto orizzontale, qui evidenziato in blu.",
) <fig-tipo-271>

La grazia, o serif, è *un’appendice all’estremità* di un tratto principale. Nella @fig-tipo-272 il blu ne rende evidente il rapporto con il sostegno. La presenza della grazia è solo l’inizio dell’osservazione: contano la forma, lo spessore e il modo in cui si raccorda all’asta. Una terminazione sottile e netta produce un risultato diverso da una grazia massiccia o da una raccordata con una curva.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/grazia.svg"),
  [La grazia alla base della n mostra il piccolo tratto che conclude l’asta.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La grazia alla base della n mostra il piccolo tratto che conclude l’asta.",
) <fig-tipo-272>

Con terminale indichiamo qui la conclusione di un tratto *priva di grazia*, come nel campione (@fig-tipo-273). Può essere tagliata, arrotondata, affusolata o assumere una forma a goccia. Anche caratteri appartenenti alla stessa grande categoria possono differire molto proprio nelle terminazioni. Il confronto di c, a o r è spesso più informativo di un confronto limitato a lettere rettilinee.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/terminale.svg"),
  [Terminale superiore della f: l’ingrandimento 4× rende leggibile il profilo della parte finale del tratto.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Terminale superiore della f: l’ingrandimento 4× rende leggibile il profilo della parte finale del tratto.",
  width: 300pt, placement: top, scope: "parent",
) <fig-tipo-273>

Descrivere questi dettagli non basta a dedurre un’emozione precisa o una superiorità nella lettura. Una grazia non rende automaticamente «classico» ogni messaggio, così come la sua assenza *non garantisce modernità*. Prima di interpretare l’effetto, l’anatomia invita a nominare la forma che effettivamente osserviamo.

=== Pance e controforme: disegnare anche il vuoto

Una lettera non è fatta soltanto di parti nere. I tratti delimitano spazi che partecipano al riconoscimento tanto quanto il loro contorno esterno. La pancia, o bowl, è *la parte curva che circonda* uno spazio, come nella D della @fig-tipo-274. La controforma, o counter, è invece *il vuoto racchiuso o parzialmente racchiuso* dai tratti. La differenza è fondamentale: la pancia appartiene al segno disegnato, la controforma allo spazio che esso rende percepibile.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/pancia.svg"),
  [La pancia della D è il tratto curvo che, insieme all’asta, racchiude la controforma.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La pancia della D è il tratto curvo che, insieme all’asta, racchiude la controforma.",
) <fig-tipo-274>

Nel campione (@fig-tipo-275) il centro della o rimane bianco; il blu ne segue il bordo interno. In questo modo l’evidenziazione non confonde il vuoto con una nuova macchia da aggiungere alla lettera. Se la forma viene inspessita, lo spazio può ridursi; se si cambia il rapporto fra tratti e curve, può cambiare la sua apertura. Queste relazioni saranno decisive quando esamineremo pesi e piccoli corpi.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/controforma.svg"),
  [La controforma della o è lo spazio interno delimitato dal contorno della lettera, indicato dalla guida blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "La controforma della o è lo spazio interno delimitato dal contorno della lettera, indicato dalla guida blu.",
) <fig-tipo-275>

*L’apertura è il varco* attraverso cui una controforma non chiusa comunica con lo spazio esterno. Una c e una e possono mostrarne differenze molto visibili: non conta soltanto quanto è grande lo spazio interno, ma anche come il suo ingresso viene delimitato dai terminali. Osservare i vuoti impedisce di giudicare un carattere soltanto dalla massa dei tratti.

Il termine italiano «occhiello» viene usato con significati non sempre identici nei diversi testi. Per evitare ambiguità, in questo capitolo precisiamo quando stiamo parlando del tratto curvo e quando del vuoto interno. Il disegno completo resta il riferimento: una definizione è utile se consente di ritrovare la parte nel campione, non se obbliga il campione a somigliare a un’illustrazione convenzionale.

=== Collegamenti, svolazzi e speroni

La g a due occhielli permette di osservare una relazione più complessa. Il collegamento, o link, *unisce il corpo superiore* alla parte inferiore della lettera. Nella @fig-tipo-276 l’evidenziazione è limitata al tratto che svolge questa funzione. Non va confuso con il raccordo curvo fra una grazia e un’asta: la parola italiana «raccordo» può infatti descrivere più situazioni, mentre la posizione nella g chiarisce il significato di link.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/collegamento.svg"),
  [Il collegamento della g unisce la parte superiore all’occhiello inferiore; il tratto è evidenziato in blu.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Il collegamento della g unisce la parte superiore all’occhiello inferiore; il tratto è evidenziato in blu.",
) <fig-tipo-276>

Lo svolazzo, o swash, estende un tratto con una funzione espressiva. La @fig-tipo-277 confronta la B corsiva ordinaria di EB Garamond con la variante dotata di svolazzo, prevista dal font. È un caso differente dai campioni principali, tratti da Roboto Serif, e la didascalia dichiara il cambiamento. Lo svolazzo non è stato aggiunto a mano per rendere decorativa una lettera comune: appartiene a *una variante progettata* e disponibile nel repertorio. Nell’uso va controllato in rapporto alle lettere vicine, perché la sua estensione può creare incroci o collisioni @t06-eb-garamond.#sito([_Georg Duffner_ e _Octavio Pardo_, EB Garamond: file e licenza.], "https://github.com/google/fonts/tree/main/ofl/ebgaramond")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/svolazzo.svg"),
  [B corsiva ordinaria e B con svolazzo, allo stesso corpo. L’estensione decorativa appartiene a una variante disegnata del font.],
  diritti: [EB Garamond Italic, variante B.swsh; SIL OFL 1.1.],
  alt: "B corsiva ordinaria e B con svolazzo, allo stesso corpo. L’estensione decorativa appartiene a una variante disegnata del font. EB Garamond Italic, variante B.swsh; SIL OFL 1.1.",
) <fig-tipo-277>

Lo sperone, o spur, è una piccola sporgenza da un tratto principale. Nel campione (@fig-tipo-278) viene indicato lo *sperone inferiore destro* nella G di Work Sans. Non tutti i caratteri hanno lo stesso sperone nella stessa posizione; trasferire il segno di una G su un’altra per farla coincidere con un modello didattico altererebbe il documento che stiamo analizzando @t06-work-sans.#sito([_Wei Huang_, Work Sans: file e licenza.], "https://github.com/google/fonts/tree/main/ofl/worksans")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/anatomia/sperone.svg"),
  [Sperone della G di Work Sans Medium (500). Il dettaglio 2,2× isola la piccola proiezione nella parte inferiore destra.],
  diritti: [Work Sans, Wei Huang / The Work Sans Project Authors; SIL OFL 1.1.],
  alt: "Sperone inferiore destro della G di Work Sans Medium, con dettaglio ingrandito 2,2 volte.",
  width: 388.35pt, placement: top, scope: "parent",
) <fig-tipo-278>

Al termine di questo percorso possiamo tornare a una parola intera. Linee di riferimento, tratti, terminazioni e vuoti devono essere *riconosciuti insieme*: la lettera mantiene la propria identità attraverso tutte queste relazioni. Dal dettaglio passiamo ora alla famiglia, per capire come il disegno venga coordinato in font, varianti e repertori che permettono di scrivere testi completi.
]
#[
// Dal disegno al font: tavole correnti Figma 372–385.
// Testo continuo e modificabile; campioni autentici e ritagli nativi documentati.
#import "../template/stile.typ": immagine, sito
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/campioni.typ": campione, confronto
#import "../template/documenti.typ": dettaglio

== Dal disegno al font

Dopo aver riconosciuto le parti della lettera, possiamo distinguere tre livelli che nell’uso quotidiano vengono spesso chiamati tutti “font”. Il typeface è il *progetto delle forme*: comprende proporzioni, dettagli, relazioni e ritmo riconoscibili di un disegno tipografico. *La famiglia riunisce varianti* concepite per convivere, come tondo e corsivo o una serie di pesi. Il font è la *risorsa che rende utilizzabili* quei segni; nell’ambiente digitale è normalmente un file con contorni, misure e informazioni necessarie alla composizione.

La distinzione ha una conseguenza concreta. Dire che un testo è composto in Garamond identifica una tradizione e un nome, ma non basta a riprodurlo: occorrono la precisa interpretazione, il produttore, la versione e lo stile. Due famiglie che portano quel nome possono avere repertori, spaziature e proporzioni diversi. Anche la scelta Regular non costituisce una misura assoluta: identifica una posizione interna a un progetto.

#campione(titolo: [EB Garamond · Regular / Italic], didascalia: [Due stili di un’interpretazione moderna.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-regular-italic.svg"), width: 187.09pt, alt: "EB Garamond · Regular / Italic: Due stili di un’interpretazione moderna.")
] <fig-tipo-278a>


Nella tipografia di metallo, una fonte era legata anche a un corpo e a uno stile determinati. Il file scalabile ha reso molto più elastico questo rapporto, senza cancellare il lavoro di disegno. Quando selezioniamo una voce nel menu del programma non scegliamo soltanto un aspetto, ma un sistema di possibilità. Conoscere quel sistema permette di valutare fin dall’inizio se saprà sostenere titoli, citazioni, numeri, accenti e lingue del progetto @t06-monotype-glossario.#sito([Monotype, The A–Z of typographic terms.], "https://www.monotype.com/resources/typographic-terms")

=== Caratteri e glifi

Un carattere appartiene al sistema della scrittura; un glifo è una *forma impiegata per rappresentarlo*. La lettera g rimane riconoscibile come la stessa lettera anche quando cambia da una costruzione a un solo occhio a una a due occhi. A cambiare è la soluzione grafica, non necessariamente il contenuto del testo. Questa distinzione ci consente di parlare del disegno senza confonderlo con l’informazione che viene scritta.

Fra caratteri e glifi *non esiste una corrispondenza obbligatoria* uno a uno. Più caratteri possono essere rappresentati da una legatura; una lettera accentata può richiedere un glifo composto oppure il posizionamento di un accento su una base. Un medesimo carattere può inoltre disporre di forme iniziali, finali, locali o alternative. Il software sceglie e dispone i glifi attraverso un processo di composizione che tiene conto del font, della lingua e della scrittura. La @fig-tipo-288a conserva lo stesso testo nelle due rese @t06-opentype-features.#sito([Microsoft, OpenType: Registered Features.], "https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/caratteri-e-glifi-fi.svg"),
  [Testo: U+0066 U+0069. Due glifi o una legatura.],
  diritti: [EB Garamond; SIL OFL 1.1.],
  alt: "Testo: U+0066 U+0069. Due glifi o una legatura.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-288a>


Il repertorio comprende dunque molto più delle ventisei lettere dell’alfabeto inglese. Nel campione (@fig-tipo-279) compaiono segni che possono diventare decisivi in un testo italiano o multilingue: maiuscole accentate, diacritici, cifre, virgolette e simboli. Controllarli significa *preservare il contenuto*. La mancanza di una È o di una ł non è un piccolo difetto decorativo da correggere con una lettera simile: può modificare la grafia corretta di una parola o di un nome.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/work-sans-repertorio.svg"),
  [Work Sans: maiuscole accentate, diacritici, cifre, virgolette e simboli del repertorio.],
  diritti: [Wei Huang / The Work Sans Project Authors; SIL OFL 1.1.],
  alt: "Work Sans: maiuscole accentate, diacritici, cifre, virgolette e simboli del repertorio.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-279>


=== Calligrafia, lettering e tipografia

Calligrafia, lettering e tipografia possono produrre forme simili e richiedono conoscenze comuni, ma descrivono attività diverse. Nella calligrafia la forma nasce dal *movimento di uno strumento*: direzione, pressione, inclinazione e sequenza dei tratti incidono sul risultato. Nel lettering *le lettere vengono disegnate* e corrette per una composizione particolare. Nella tipografia si compone utilizzando un repertorio di *segni riutilizzabili*, già progettati per combinarsi con molti altri. La @fig-tipo-279a mostra un esempio illustrativo contemporaneo.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/gesto-esempio-calligrafico.png"),
  [«Gesto»: esempio illustrativo contemporaneo di scrittura calligrafica.],
  alt: "«Gesto»: esempio illustrativo contemporaneo di scrittura calligrafica.",
) <fig-tipo-279a>


Un logotipo disegnato a mano può essere riprodotto identico migliaia di volte senza diventare per questo un font. Può contenere una legatura unica, un terminale adattato alla lettera vicina o uno spazio che funziona soltanto in quel nome. Per trasformarlo in un alfabeto utilizzabile in testi differenti occorre un ulteriore progetto: disegnare i segni mancanti e stabilire come si comportano in combinazioni non previste dal marchio iniziale. Pacifico è un brush script; Great Vibes uno script calligrafico. Richiamano la scrittura, ma qui sono composti con font, non scritti a mano. Anche il lettering può essere geometrico: l’aspetto non rivela il procedimento. La distinzione è fra parole disegnate per un caso e un repertorio riutilizzabile. Un marchio non mostra da solo le qualità di una famiglia; uno specimen ne mostra varietà e continuità. I campioni @fig-tipo-pacifico e @fig-tipo-great-vibes rendono osservabile questa differenza.

#campione(titolo: [Pacifico Regular], didascalia: [Campione di un brush script composto con un font.],
  diritti: [Vernon Adams e altri autori; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/risorse-condivise/immagini/figure/tipografia/font/pacifico-regular-aag.svg"), width: 187.09pt, alt: "Pacifico Regular: Campione di un brush script composto con un font.")
] <fig-tipo-pacifico>


#campione(titolo: [Great Vibes Regular], didascalia: [Campione di uno script calligrafico composto con un font.],
  diritti: [Robert Leuschke; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/risorse-condivise/immagini/figure/tipografia/font/great-vibes-regular-aag.svg"), width: 187.09pt, alt: "Great Vibes Regular: Campione di uno script calligrafico composto con un font.")
] <fig-tipo-great-vibes>


=== Progettare una famiglia di segni

Il *type design* comincia da una domanda d’uso. Un carattere per un quotidiano deve sopportare condizioni diverse da un alfabeto per un titolo sperimentale; una famiglia destinata a più scritture richiede un programma diverso da un lettering di poche lettere. Il progettista definisce repertorio, dimensioni d’impiego, pesi e caratteristiche, studia i modelli pertinenti e li trasforma in un sistema coerente. Disegnare una bella a isolata è soltanto l’inizio.

Le lettere si giudicano nelle parole. Curve, aste e spazi laterali devono costruire un *ritmo sufficientemente continuo*, pur mantenendo le differenze che rendono riconoscibili i segni. Per questo si alternano osservazione del dettaglio e prove di testo: una curva riuscita in grande può chiudersi in piccolo, un accento può urtare quello della riga vicina, un peso estremo può rendere instabile una forma. Anche le varianti vengono controllate come relazioni, non come trasformazioni meccaniche della prima versione.

La convenzione non impedisce l’invenzione: fornisce le forme apprese con cui il lettore interpreta le novità. Un disegno può aderire a modelli storici, reinterpretarli o mettere in discussione alcune abitudini. La sua originalità si valuta insieme allo scopo. Una soluzione adatta a interrompere e sorprendere può essere poco adatta alla *lettura continuativa*; la stessa scelta assume quindi valori diversi se osservata come esperimento, come strumento di informazione o come parte di un’identità.

=== New Alphabet e Swift: i vincoli tecnici

New Alphabet e Swift mostrano risposte diverse ai vincoli tecnici (@fig-tipo-279b e @fig-tipo-279c). Nel 1967 il grafico olandese _Wim Crouwel_ sviluppò New Alphabet come esperimento sulle limitazioni dei tubi a raggi catodici, usati negli schermi e nella fotocomposizione: una costruzione fortemente regolata sostituiva molte curve convenzionali con segmenti e raccordi angolari. Il risultato spostava il problema dal riconoscere subito le lettere all’immaginare un diverso rapporto fra alfabeto e macchina. The Foundry Types lo descrive come una *provocazione teorica* destinata ad alimentare la discussione, non come una proposta universale per leggere testi correnti @t06-new-alphabet.#sito([The Foundry Types, New Alphabet.], "https://www.thefoundrytypes.com/fonts/new-alphabet/")

#campione(titolo: [New Alphabet], fascia: 63pt,
  didascalia: [New Alphabet (1967), dettaglio.], diritti: [_Wim Crouwel_ / The Foundry Types.])[
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/font/crouwel-new-alphabet-documento-1967.jpg"),
    width: 187.09pt, height: 63pt, originale-width: 187pt, originale-height: 124.417pt,
    dx: 0pt, dy: -18.7pt, alt: "Dettaglio delle lettere angolari di New Alphabet nel documento del 1967.")
] <fig-tipo-279b>


Swift, disegnato negli anni Ottanta da _Gerard Unger_, tipografo olandese, affrontava invece le *condizioni della stampa dei quotidiani*. Grazie robuste e profili netti contribuivano a far sopravvivere le forme sulla carta e nelle lavorazioni veloci dell’epoca. La successiva Neue Swift rielaborò il progetto sul piano tecnico ed estetico. L’espressività non scompariva: nasceva anche dalla risposta al supporto @t06-swift2023.#nota-compatta([Linotype/MyFonts, Swift; Monotype, Neue Swift Field Guide (2023).], ("https://www.myfonts.com/collections/swift-font-linotype", "https://cms.myfonts.com/sites/default/files/2023-10/Neue-Swift-Font-Field-Guide.pdf"))

#campione(titolo: [Swift], didascalia: [Swift: campione digitale attuale.],
  diritti: [_Gerard Unger_; Linotype/MyFonts.])[
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/font/unger-swift-quality-campione.png"),
    width: 114.52pt, height: 35.84pt, originale-width: 806.4pt, originale-height: 403.2pt,
    dx: -46.2pt, dy: -252.84pt, alt: "Quality, campione digitale autentico di Swift.")
] <fig-tipo-279c>


Accostare i due casi evita di identificare l’innovazione con un solo stile. Un progetto può cercare una radicale discontinuità oppure introdurre cambiamenti relativamente discreti per *conservare la qualità della lettura*. In entrambi i casi contano le relazioni fra strumenti, segni e uso. Il giudizio sul carattere comincia da queste relazioni, prima di stabilire se la sua forma ci sembri familiare o insolita.

=== Pesi, tondo, corsivo e obliquo

La famiglia permette di cambiare accento mantenendo una continuità di disegno. Il peso varia la presenza dei tratti: Light, Regular, Medium, Semibold, Bold e Black indicano posizioni che *dipendono dal progetto* (@fig-tipo-282). Le scale numeriche aiutano il software a selezionare gli stili, ma un 700 non possiede lo stesso spessore apparente in tutte le famiglie. Confrontare richiede di guardare lettere e parole al medesimo corpo, tenendo conto anche delle proporzioni. Un secondo cambiamento riguarda la postura. Il tondo, spesso indicato come roman, usa normalmente forme diritte. Il corsivo o italic può *ridisegnare la struttura delle lettere*, modificando collegamenti, terminali e ritmo oltre all’inclinazione. L’obliquo conserva in genere più da vicino la costruzione del tondo, ma può essere una variante progettata con proprie correzioni. Non coincide necessariamente con una semplice deformazione eseguita dal programma.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/roboto-serif-sei-pesi.svg"),
  [Roboto Serif: pesi 100, 300, 400, 500, 700 e 900 allo stesso corpo 25. Larghezza 100, dimensione ottica 20 e grado 0 costanti.],
  diritti: [Commercial Type / Google; SIL OFL 1.1.],
  alt: "Roboto Serif: pesi 100, 300, 400, 500, 700 e 900 allo stesso corpo 25. Larghezza 100, dimensione ottica 20 e grado 0 costanti.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-282>


I campioni delle @fig-tipo-280, @fig-tipo-281 e @fig-tipo-283 permettono di vedere la differenza: il tondo e il corsivo originali di EB Garamond sono affiancati, nell’ultima figura, a un tondo ottenuto con *un’inclinazione artificiale*. La distinzione è pratica. Se manca un corsivo reale, il pulsante del software può produrre una simulazione che altera spessori e spazi senza introdurre le forme previste da un disegnatore. Conviene conoscere gli stili disponibili prima di affidare loro citazioni, enfasi o termini stranieri.

#campione(titolo: [EB Garamond Regular], didascalia: [A, a e g in tondo, contorni autentici.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-tondo.svg"), width: 187.09pt, alt: "EB Garamond Regular: A, a e g in tondo, contorni autentici.")
] <fig-tipo-280>


#campione(titolo: [EB Garamond Italic], didascalia: [A, a e g in corsivo, contorni autentici.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.], fascia: 54pt)[
  #image(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-corsivo.svg"), width: 187.09pt, alt: "EB Garamond Italic: A, a e g in corsivo, contorni autentici.")
] <fig-tipo-281>


#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-corsivo-e-simulazione.svg"),
  [EB Garamond: a, g e f in tondo, corsivo originale e tondo inclinato artificialmente di 12°, a parità di corpo e scala.],
  diritti: [EB Garamond Regular e Italic; SIL OFL 1.1.],
  alt: "EB Garamond: a, g e f in tondo, corsivo originale e tondo inclinato artificialmente di 12°, a parità di corpo e scala.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-283>


=== Legature e varianti OpenType

*OpenType* è una specifica per i file font: organizza le forme dei glifi, le misure e le regole che permettono al programma di scegliere e posizionare i segni @t06-opentype-file. Un font può così custodire diverse forme per comporre lo stesso testo. *Le legature sostituiscono* una sequenza di glifi con una forma disegnata per l’incontro: fi, fl e ffi sono esempi frequenti nella tipografia latina. Nel confronto fra le @fig-tipo-284 e @fig-tipo-285 le lettere digitate non cambiano; cambia la regola applicata dal font. La crenatura, al contrario, *regola la posizione* dei segni senza necessariamente sostituirne la forma.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-legature-disattivate.svg"),
  [EB Garamond 400: fi, fl e ffi senza legature; crenatura disattivata.],
  diritti: [Contorni e avanzamenti originali del font; SIL OFL 1.1.],
  alt: "EB Garamond 400: fi, fl e ffi senza legature; crenatura disattivata.",
) <fig-tipo-284>


#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-legature-attivate.svg"),
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
#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-maiuscole-ridotte.svg"),
  [Maiuscole di EB Garamond 400 ridotte uniformemente: si assottigliano anche i tratti.],
  diritti: [Simulazione geometrica; SIL OFL 1.1.],
  alt: "Maiuscole di EB Garamond 400 ridotte uniformemente: si assottigliano anche i tratti.",
  width: 137mm,
) <fig-tipo-286>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-maiuscoletto-reale.svg"),
  [Maiuscoletto reale di EB Garamond 400, funzione c2sc, a confronto con la riduzione geometrica.],
  diritti: [Glifi originali del font; SIL OFL 1.1.],
  alt: "Maiuscoletto reale di EB Garamond 400, funzione c2sc, a confronto con la riduzione geometrica.",
  width: 137mm,
) <fig-tipo-287>

]

Anche le cifre possono offrire più soluzioni. Le cifre allineate, o lining, hanno altezze riferite a una linea comune e spesso un rapporto evidente con le capitali. Quelle elzeviriane, o oldstyle, possono avere ascendenti e discendenti e si inseriscono con un ritmo diverso nel minuscolo. Questa distinzione riguarda la *forma verticale*; un’altra riguarda la larghezza: le cifre proporzionali occupano spazi differenti, quelle tabulari hanno un *avanzamento costante* (@fig-tipo-288).

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/roboto-serif-tipi-di-cifre.svg"),
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

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/noto-tre-repertori-dettagli.svg"),
  [Noto Sans e Noto Sans Arabic: dettagli dei repertori latino, greco e arabo, non traduzioni.],
  diritti: [The Noto Project Authors, 2022; SIL OFL 1.1.],
  alt: "Noto Sans e Noto Sans Arabic: dettagli dei repertori latino, greco e arabo, non traduzioni.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-288b>


Anche la direzione appartiene alla scrittura e al contenuto. L’arabo e l’ebraico si leggono normalmente da destra a sinistra, ma al loro interno numeri e frammenti in altre scritture possono richiedere un *comportamento bidirezionale*. Nelle scritture dell’Asia orientale esistono convenzioni orizzontali e verticali differenti: non si possono ridurre tutte a una sola regola “orientale”. La scelta del font deve consentire queste specificità. Per giudicarne l’armonia serve osservare testi reali e *coinvolgere chi legge quella lingua*, evitando di usare il latino come misura universale (@fig-tipo-289).

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/noto-tre-repertori.svg"),
  [Noto Sans e Noto Sans Arabic: repertori latino, greco e arabo. Campioni distinti, senza equivalenza traduttiva.],
  diritti: [The Noto Project Authors, 2022; SIL OFL 1.1.],
  alt: "Noto Sans e Noto Sans Arabic: repertori latino, greco e arabo. Campioni distinti, senza equivalenza traduttiva.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-289>


=== Font statici e variabili

Un *font statico* contiene uno stile fissato: per passare da Regular a Bold si seleziona un altro font della famiglia. Un *font variabile* può offrire più pesi nello stesso file, tramite un *controllo chiamato asse*.

L’asse del peso si chiama wght. Nel campione Work Sans (@fig-tipo-289a) selezioniamo 400, 550 e 700. A corpo 36 invariato, *550 è una posizione intermedia*: cambiano il disegno e lo spessore dei tratti. Non è un ingrandimento.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/work-sans-asse-peso.svg"),
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

#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/eb-garamond-regular-aag.svg"),
  [EB Garamond Regular: Aag, corpo 36. Contorni autentici.],
  diritti: [Georg Duffner e Octavio Pardo; SIL OFL 1.1.],
  alt: "EB Garamond Regular: Aag, corpo 36. Contorni autentici.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-280-licenza>


=== New Alphabet e Neue Swift: gli specimen

Nel 1967 _Wim Crouwel_ concepisce *New Alphabet* (@fig-tipo-290) per i limiti della fotocomposizione a tubo catodico. Una *griglia 5 × 9* e segmenti con angoli a 45° sostituiscono le curve; una barra sopra il segno indica la maiuscola.

È un *esperimento teorico*, non un font per lunghi testi: la regola è coerente, ma rende i segni meno familiari. Mostra come un vincolo tecnico possa trasformare radicalmente il disegno. *Swift (1985)*, di _Gerard Unger_, nasce per i quotidiani: grazie robuste e spazi interni aperti rispondono a carta ruvida e stampa veloce. *Neue Swift (2009)* aggiorna il progetto e amplia i glifi; il dettaglio di Neue Swift in @fig-tipo-291 viene dalla guida Monotype del *2023*, non uno specimen del 1985.

#confronto[
#immagine(path("/risorse-condivise/immagini/figure/tipografia/font/crouwel-new-alphabet-documento-1967.jpg"),
  [New Alphabet, 1967: lettere ridotte a un sistema di segni angolari.],
  diritti: [_Wim Crouwel_; The Foundry Types.],
  alt: "New Alphabet, 1967: lettere ridotte a un sistema di segni angolari.",
  width: 214.646pt,
) <fig-tipo-290>




#figure(stack(dir: ltr, spacing: 14.17pt,
  dettaglio(path("/risorse-condivise/immagini/figure/tipografia/font/unger-swift-quality-campione.png"),
    width: 114.52pt, height: 35.84pt, originale-width: 806.4pt, originale-height: 403.2pt,
    dx: -46.2pt, dy: -252.84pt, alt: "Quality, campione digitale autentico di Swift."),
  image(path("/risorse-condivise/immagini/figure/tipografia/font/unger-neue-swift-typography-guida-2023.png"),
    width: 253.349pt, alt: "Typography, dettaglio di Neue Swift dalla guida Monotype del 2023.")),
  kind: image,
  caption: [Swift: «Quality», campione digitale Linotype attuale. Neue Swift: «Typography», guida Monotype 2023.
    #v(4pt)#testo-diritti[_Gerard Unger_; Linotype/Monotype, Font Field Guide № 035.]],
) <fig-tipo-291>
]


Nella parola Typography osserviamo le grazie lunghe, l’orecchio triangolare della g e i raccordi netti delle curve. Il confronto non cerca un vincitore: valutiamo *forme e scopo d’uso*, non una generica superiorità dei serif.
]
#[
// Classificazioni, tavole386–397: prosa corrente Figma, figure originali e apparati nativi.
// Le immagini mobili non assegnano pagine o righe al corpo del capitolo.
#import "../template/stile.typ": sito, immagine
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/campioni.typ": confronto, riga-campioni
#import "../template/documenti.typ": tavola-documentaria, dettaglio

== Classificare le forme

Classificare serve a orientarsi fra disegni numerosi e a dare un nome alle differenze osservate. Una categoria è utile quando invita a guardare: *presenza delle grazie*, contrasto dei tratti, asse delle curve, proporzioni e derivazione dalla scrittura. Diventa invece un ostacolo se viene usata come una spiegazione completa del carattere o come una ricetta per stabilirne automaticamente il tono e la leggibilità.

Le classificazioni non sono nate tutte per rispondere alla stessa domanda. Alcune collegano le forme alla storia della stampa europea; altre facilitano la ricerca in un catalogo commerciale; altre ancora descrivono la destinazione d’uso o il comportamento dei segni. Perciò parole come serif, monospazio e display *non si escludono*: la prima riguarda la forma, la seconda l’avanzamento, la terza un impiego previsto. Una famiglia può essere contemporaneamente serif e display, oppure sans serif e monospazio.

Il confronto efficace passa *dal dettaglio al sistema*. Una singola grazia non esaurisce una famiglia, e la a a un solo occhio non rende da sola geometrico un carattere. Osserviamo alcune lettere caratteristiche, una parola completa e una breve sequenza. Il nome del gruppo verrà dopo, come aiuto a descrivere ciò che abbiamo riconosciuto. Le categorie seguenti sono quindi direzioni di lettura del disegno, con confini mobili e numerose zone di incontro @t06-haley.#nota-compatta([_Allan Haley_, Type Classifications; Monotype, A Typography Style Guide.], ("https://www.myfonts.com/pages/fontscom-learning-fontology-level-1-type-anatomy-type-classifications", "https://www.monotype.com/resources/guide-type-styles"))

=== _Thibaudeau_, _Vox_, _Novarese_

La classificazione del tipografo _Francis Thibaudeau_, pubblicata nel 1921, poneva al centro *presenza e forma delle grazie*. Raggruppare elzeviri, didoni, egiziani e bastoni rendeva immediatamente visibili alcuni contrasti del repertorio latino disponibile. Era un sistema sintetico, legato al patrimonio tipografico e alle esigenze del suo tempo, al quale si affiancavano le scritture e le forme di fantasia @t06-thibaudeau1921.#sito([_Francis Thibaudeau_, La lettre d’imprimerie, 1921.], "https://books.google.com/books?id=eYa6AAAAIAAJ")

Il tipografo e critico _Maximilien Vox_ propose nel 1954 una lettura più articolata, adottata dall’Association Typographique Internationale nel 1962. Umanistici, garaldes e reali collegavano il disegno a diverse fasi storiche; didoni, meccanici e lineari evidenziavano altre trasformazioni; incisi, scritti e manuali completavano il nucleo originario. La classificazione di _Aldo Novarese_, progettista italiano di caratteri della fonderia Nebiolo, organizzava a sua volta lapidari, medievali, veneziani, transizionali, bodoniani, scritti, ornati, egiziani, lineari e fantasie. Queste denominazioni restano importanti per leggere manuali e specimen, anche quando non coincidono con i filtri di un catalogo attuale @t06-novarese2020.#sito([_Aldo Novarese_, Alfa-Beta, riedizione 2020.], "https://archiviotipografico.it/product/aldo-novarese-alfa-beta/")

Non costituiscono però una tassonomia universale condivisa da tutte le culture. Nel 2021 ATypI *ha ritirato il proprio sostegno* al sistema Vox-ATypI, sottolineandone l’insufficienza rispetto alla diversità delle scritture del mondo. Conoscere una classificazione storica significa quindi comprenderne anche il punto di vista. La presentiamo come *strumento situato*: aiuta a riconoscere una tradizione, mentre altri repertori e progetti contemporanei richiedono criteri ulteriori. Le tavole @fig-tipo-291a, @fig-tipo-291b e @fig-tipo-291c offrono applicazioni contemporanee dei tre sistemi @t06-atypi2021.#sito([ATypI, ritiro del sostegno alla classificazione Vox-ATypI, 2021.], "https://atypi.org/2021/04/27/atypi-de-adopted-the-vox-atypi-typeface-classification-system/")

#tavola-documentaria[
#figure([
#text(size: 14pt, weight: 900)[_Thibaudeau_ · quattro gruppi principali]
#v(8pt)
#riga-campioni((
  (titolo: [Elzeviri#linebreak() EB Garamond · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/eb-garamond-regular-aag.svg"), width: 57.22pt, alt: "EB Garamond · Regular · Aag36")),
  (titolo: [Didoni#linebreak() Bodoni 72 · Book], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/bodoni-72-book-aag.svg"), width: 56.54pt, alt: "Bodoni 72 · Book · Aag36")),
  (titolo: [Egiziani#linebreak() Rockwell · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/rockwell-regular-aag.svg"), width: 76.32pt, alt: "Rockwell · Regular · Aag36")),
  (titolo: [Bastoni#linebreak() Helvetica · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-regular-aag.svg"), width: 66.05pt, alt: "Helvetica · Regular · Aag36")),
))
], kind: image, caption: [Applicazioni didattiche contemporanee, non esemplari scelti da _Thibaudeau_. Le scritture e le fantasie aggiuntive sono illustrate da Brush Script MT e da New Alphabet nella @fig-tipo-291c.
  #v(4pt)#testo-diritti[Versioni digitali: EB Garamond (SIL OFL 1.1) e font macOS.]]) <fig-tipo-291a>

#v(14pt)
#figure([
#text(size: 14pt, weight: 900)[_Vox_ · nove classi originarie]
#v(8pt)
#riga-campioni((
  (titolo: [Umanistici#linebreak() _Jenson_ · 1470], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/jenson-eusebio-1470-dettaglio.jpg"), width: 84pt, height: 28pt, originale-width: 374.18pt, originale-height: 106.772pt, dx: 0pt, dy: -53pt, alt: "Dettaglio fotografico delle lettere stampate da Jenson nel 1470.")),
  (titolo: [Garaldes#linebreak() EB Garamond · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/eb-garamond-regular-aag.svg"), width: 57.22pt, alt: "EB Garamond · Regular · Aag36")),
  (titolo: [Reali#linebreak() Baskerville · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/baskerville-regular-aag.svg"), width: 60.39pt, alt: "Baskerville · Regular · Aag36")),
))
#v(8pt)
#riga-campioni((
  (titolo: [Didoni#linebreak() Bodoni 72 · Book], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/bodoni-72-book-aag.svg"), width: 56.54pt, alt: "Bodoni 72 · Book · Aag36")),
  (titolo: [Meccanici#linebreak() Rockwell · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/rockwell-regular-aag.svg"), width: 76.32pt, alt: "Rockwell · Regular · Aag36")),
  (titolo: [Lineari#linebreak() Gill Sans · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/gill-sans-regular-aag.svg"), width: 56.74pt, alt: "Gill Sans · Regular · Aag36")),
))
#v(8pt)
#riga-campioni((
  (titolo: [Incisi#linebreak() Copperplate · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/copperplate-regular-aag.svg"), width: 68.02pt, alt: "Copperplate · Regular · Aag36")),
  (titolo: [Scritti#linebreak() Brush Script MT · Italic], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/brush-script-mt-italic-aag.svg"), width: 55.91pt, alt: "Brush Script MT · Italic · Aag36")),
  (titolo: [Manuali#linebreak() Bradley Hand · Bold], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/bradley-hand-bold-aag.svg"), width: 69.86pt, alt: "Bradley Hand · Bold · Aag36")),
))
], kind: image, caption: [Esempi morfologici: le edizioni digitali non sono originali del 1954. _Jenson_: ritaglio della @fig-tipo-jenson. Copperplate e Bradley Hand illustrano, senza equivalenze rigide, origine incisoria e gesto manuale.
  #v(4pt)#testo-diritti[Foto Atalanta/WeiaR, CC BY-SA 4.0. Font macOS; EB Garamond: SIL OFL 1.1. Sistema: ATypI, 2021.]]) <fig-tipo-291b>

]

#confronto[
#figure([
#text(size: 14pt, weight: 900)[_Novarese_ · dieci famiglie]
#v(8pt)
#riga-campioni((
  (titolo: [Lapidari#linebreak() Copperplate · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/copperplate-regular-aag.svg"), width: 68.02pt, alt: "Copperplate · Regular · Aag36")),
  (titolo: [Medievali · Book#linebreak() Unifraktur#linebreak() Maguntia], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/unifrakturmaguntia-book-aag.svg"), width: 64.61pt, alt: "UnifrakturMaguntia · Book · Aag36")),
  (titolo: [Veneziani#linebreak() EB Garamond · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/eb-garamond-regular-aag.svg"), width: 57.22pt, alt: "EB Garamond · Regular · Aag36")),
  (titolo: [Transizionali#linebreak() Baskerville · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/baskerville-regular-aag.svg"), width: 60.39pt, alt: "Baskerville · Regular · Aag36")),
))
#v(8pt)
#riga-campioni((
  (titolo: [Bodoniani#linebreak() Bodoni 72 · Book], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/bodoni-72-book-aag.svg"), width: 56.54pt, alt: "Bodoni 72 · Book · Aag36")),
  (titolo: [Scritti#linebreak() Brush Script MT · Italic], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/brush-script-mt-italic-aag.svg"), width: 55.91pt, alt: "Brush Script MT · Italic · Aag36")),
  (titolo: [Ornati · Plain#linebreak() Academy#linebreak() Engraved LET], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/academy-engraved-let-plain-aag.svg"), width: 61.87pt, alt: "Academy Engraved LET · Plain · Aag36")),
  (titolo: [Egiziani#linebreak() Rockwell · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/rockwell-regular-aag.svg"), width: 76.32pt, alt: "Rockwell · Regular · Aag36")),
))
#v(8pt)
#riga-campioni((
  (titolo: [Lineari#linebreak() Helvetica · Regular], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-regular-aag.svg"), width: 66.05pt, alt: "Helvetica · Regular · Aag36")),
  (titolo: [Fantasie#linebreak() New Alphabet · 1967], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/font/crouwel-new-alphabet-documento-1967.jpg"), width: 81.1623pt, alt: "New Alphabet, documento originale del 1967.")),
))
], kind: image, caption: [Esempi moderni, non assegnazioni dell’autore. Fraktur moderna, distinta dai caratteri di _Gutenberg_. New Alphabet: @fig-tipo-290. I tre sistemi non sono equivalenti.
  #v(4pt)#testo-diritti[Font macOS; EB Garamond e UnifrakturMaguntia: SIL OFL 1.1.]]) <fig-tipo-291c>

]


=== Dalla scrittura ai serif antichi

Nei caratteri comunemente indicati come oldstyle o antichi rimane evidente una relazione con la scrittura e con i primi tondi della stampa. Il *contrasto fra tratti* è generalmente moderato; le curve mostrano spesso un *asse inclinato* e le grazie si raccordano alle aste. Queste tendenze descrivono una famiglia di soluzioni, non un modello unico: le differenze fra un disegno di ascendenza veneziana e uno ispirato ai caratteri del Cinquecento sono significative.

Per osservare la relazione con il gesto, seguiamo il passaggio fra i tratti spessi e quelli sottili di una o e il modo in cui un’asta entra nella grazia.

Nei veneziani la traversa inclinata della e può essere un indizio utile; in molte garaldes il disegno assume un equilibrio differente. Non occorre però trasformare ogni indizio in una regola senza eccezioni: i *revival digitali reinterpretano i modelli*, talvolta combinando fonti diverse.

Nomi come Garamond rimandano a questa storia, ma identificano oggi molte famiglie differenti. EB Garamond è un progetto digitale specifico e va nominato come tale quando viene usato in uno specimen. La precisione serve a osservare il carattere concreto: dimensione delle minuscole, apertura delle controforme e disegno del corsivo possono cambiare sensibilmente anche fra famiglie che occupano una posizione vicina nella mappa storica. Il confronto fra Garamond e Baskerville rende concreta questa varietà. Nei disegni di ascendenza garaldiana cerchiamo la modulazione diagonale e i raccordi che collegano le grazie alle aste; in Baskerville il contrasto e l’impianto più verticale assumono un altro equilibrio. Il campione Libre Baskerville identifica una specifica interpretazione digitale di questa seconda tradizione, non il carattere storico in ogni sua versione. Nessuno dei due nomi autorizza una separazione rigida fra carta e schermo: contano la versione utilizzata e la resa delle forme al *corpo effettivo* (@fig-tipo-292).

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/serif-quattro-direzioni.svg"),
  [Quattro direzioni dei serif: EB Garamond, Libre Baskerville, Bodoni Moda e Bitter, con lo stesso testo e corpo 40.],
  diritti: [Specimen originali dai font; SIL OFL 1.1.],
  alt: "Quattro direzioni dei serif: EB Garamond, Libre Baskerville, Bodoni Moda e Bitter, con lo stesso testo e corpo 40.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-292>


=== Transizionali e didoni

I caratteri transizionali rendono visibile un cambiamento graduale rispetto agli oldstyle. In molti di essi *cresce la differenza fra tratti* spessi e sottili, l’asse tende a diventare più verticale e le grazie assumono un andamento più regolare. Il termine non indica una fase imperfetta destinata a essere superata: Baskerville, per esempio, resta un riferimento autonomo, con un proprio equilibrio di proporzioni e dettagli.

Il nome *didoni* unisce i nomi _Didot_ e _Bodoni_, due riferimenti di questa tradizione. In questi caratteri il contrasto può diventare molto marcato: si osservano aste robuste, filetti sottili, *asse verticale e grazie fini*, spesso con raccordi poco pronunciati.#sito([_Ilene Strizver_, Guide to Typestyles: Didone Typefaces. Monotype / MyFonts.], "https://www.myfonts.com/pages/fontscom-learning-fontology-level-1-type-families-didone") Sono caratteristiche che emergono chiaramente in grande e che richiedono attenzione quando il segno viene ridotto: una *variante progettata per titoli* non equivale a una versione destinata al testo corrente.

La parola “moderno”, usata storicamente per questi disegni, può ingannare se la si confonde con “disegnato oggi”. Descrive una posizione nella storia del carattere latino. Un didone può essere contemporaneo per data e impiego, oppure una digitalizzazione di un modello precedente. Il campione non va giudicato per la sola etichetta: osserviamo quanto siano sottili i filetti, come terminino le curve e quali dimensioni rendano effettivamente percepibile il disegno. Il confronto chiarisce differenze morfologiche, senza stabilire una graduatoria fra antico e moderno.

Times New Roman collega la tradizione serif a un programma di economia e lettura nel giornale. Comparve nel Times di Londra nel 1932, attraverso i disegni di _Victor Lardent_, grafico del Times, sotto la direzione di _Stanley Morison_, consulente tipografico di Monotype, e la successiva elaborazione della fonderia. Le sue forme compatte conservano riferimenti oldstyle pur rispondendo a esigenze differenti. La diffusione successiva non lo rende automaticamente “neutro”, scadente o inadatto ai libri: un giudizio sul suo impiego deve considerare testo, versione e contesto, anziché trasformare la familiarità del nome in un difetto del disegno @t06-times.#sito([Microsoft Typography, Times New Roman.], "https://learn.microsoft.com/en-us/typography/font-list/times-new-roman")

Georgia offre un confronto utile. Negli anni Novanta il progettista britannico _Matthew Carter_ riprese elementi dello Scotch Roman, aumentando l’altezza delle minuscole, alleggerendo le capitali e mantenendo le ascendenti sopra di esse per affrontare la resa sullo schermo. Le cifre non allineate e il corsivo, con forme proprie di a e g, contribuiscono alla sua identità. Non è quindi un Times New Roman ingrandito: *redistribuisce le relazioni fra le parti* della lettera. Le origini per lo schermo spiegano alcune scelte, senza limitarne l’uso al digitale o garantire lo stesso risultato su ogni dispositivo. Il confronto della @fig-tipo-292a mostra i due disegni digitali allo stesso corpo @t06-georgia.#sito([Microsoft Typography, Georgia.], "https://learn.microsoft.com/en-us/typography/font-list/georgia")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/times-new-roman-georgia-aag.svg"),
  [Times New Roman Regular e Georgia Regular, corpo 36. Contorni delle versioni digitali, distinti dai campioni storici.],
  diritti: [Monotype / Microsoft.],
  alt: "Times New Roman Regular e Georgia Regular, corpo 36. Contorni delle versioni digitali, distinti dai campioni storici.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-292a>


=== Grazie robuste e forme ibride

Gli slab serif, spesso chiamati egiziani, sono riconoscibili per *grazie robuste, frequentemente squadrate*. La categoria comprende disegni con contrasti e raccordi anche molto diversi: alcune famiglie enfatizzano blocchi netti e masse uniformi, altre collegano più morbidamente aste e grazie. La forza del dettaglio non obbliga quindi a un solo tono, né impedisce impieghi nel testo se il progetto della famiglia li prevede.

Il nome storico “egiziano” non dimostra una discendenza dai geroglifici. Appartiene alla storia delle denominazioni tipografiche e commerciali. Nel confronto conviene tornare alla forma: rapporto fra spessore delle grazie e delle aste, *apertura delle lettere*, larghezza e costruzione delle curve. Questi elementi spiegano meglio del nome perché due slab possano apparire così diversi.

Fra serif e sans serif esistono anche soluzioni intermedie, comunemente descritte come *semi-serif o ibride*. Alcune mantengono piccole espansioni soltanto in certe terminazioni. Le superfamiglie possono invece coordinare disegni serif e sans attraverso proporzioni condivise, senza che i singoli caratteri siano necessariamente ibridi. Non sono categorie residue per disegni “non riusciti”, ma possibilità progettuali. Consentono di dosare la relazione con il gesto e con la tradizione tipografica. La loro presenza ricorda che una classificazione è una mappa continua: fra due poli riconoscibili si possono costruire molte relazioni, tutte da osservare nel carattere effettivamente usato @t06-superfamilies.#sito([Monotype, What are font superfamilies and why do we need them?], "https://www.monotype.com/resources/expertise/what-are-font-superfamilies")

=== Le differenze dentro i sans serif

L’assenza delle grazie è soltanto un primo tratto comune ai sans serif. Nei grotteschi e nei neogrotteschi incontriamo costruzioni relativamente regolari, spesso con differenze di contrasto contenute, ma con soluzioni specifiche nelle aperture, nelle proporzioni e nelle lettere più caratteristiche. Raggruppare Helvetica e altri sans nella stessa grande area non significa considerarli sostituibili senza conseguenze.

I sans umanistici conservano in modo più esplicito una relazione con il gesto scritto e con proporzioni differenziate. Il ritmo può dipendere da *aperture ampie, modulazione dei tratti* e forme che ricordano la tradizione calligrafica. I geometrici richiamano invece cerchi, segmenti e strutture semplificate. Futura è un riferimento storico di questa direzione, ma anche un disegno apparentemente geometrico richiede adattamenti per funzionare come alfabeto: le lettere non nascono dalla ripetizione indifferente di una stessa figura. Il campione della @fig-tipo-311d accosta Helvetica e Futura.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-futura-aag.svg"),
  [A sinistra Helvetica Regular, a destra Futura Medium: Aag allo stesso corpo nominale di 36 pt. In Helvetica la a ha due piani e la g due occhi; in Futura entrambe hanno una costruzione semplice.],
  diritti: [Helvetica: Max Miedinger / Haas; Futura: Paul Renner / Bauer.],
  alt: "A sinistra Helvetica Regular con a a due piani e g a due occhi; a destra Futura Medium con a e g semplici. Campioni Aag a 36 pt.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-311d>


Per riconoscere le differenze, osserviamo a e g, la curva della o, il braccio della r e le aperture di c ed e. Sono indizi da collegare, senza ridurre un carattere a una sola lettera. Alcune famiglie contemporanee uniscono scheletro geometrico e terminali umanistici oppure sviluppano varianti diverse entro un programma comune. Il sans serif non porta dunque con sé una personalità neutra o una superiorità tecnica automatica: la scelta dipende dal disegno specifico e dal rapporto che costruisce con parole, destinatari e contesto (@fig-tipo-293).

Futura, Franklin Gothic e Helvetica occupano posizioni differenti in quest’area. Nel Futura di _Paul Renner_ le forme geometriche convivono con *proporzioni classiche delle capitali* e correzioni ottiche: la costruzione circolare non esaurisce il disegno. Franklin Gothic, legato a _Morris Fuller Benton_, progettista della fonderia American Type Founders, e alla tradizione americana, conserva invece una modulazione più riconoscibile dei tratti. Le successive riedizioni ITC ne ampliano pesi e repertorio e modificano alcuni rapporti, fra cui l’altezza delle minuscole. Helvetica rappresenta un altro sviluppo: compattezza e continuità del ritmo si accompagnano a soluzioni specifiche, osservabili nella a e nella g a due occhi. Non significa che il suo alfabeto usi soltanto orizzontali e verticali: lettere come A, K, N e V mantengono diagonali evidenti. Anche le versioni denominate Helvetica vanno distinte: Helvetica Now, per esempio, articola il progetto in *dimensioni ottiche Micro, Text e Display* @t06-franklin.#sito([Microsoft Typography, Franklin Gothic.], "https://learn.microsoft.com/en-us/typography/font-list/franklin-gothic")

I caratteri Johnston e Gill Sans mostrano un’altra via alla costruzione del sans. Johnston, disegnato dal calligrafo britannico _Edward Johnston_ e introdotto nella rete londinese nel 1916, appartiene a un programma di riconoscibilità della segnaletica; Gill Sans, disegnato da _Eric Gill_ e pubblicato da Monotype dal 1928, sviluppa una propria interpretazione umanistica. Nelle forme di Gill Sans sono particolarmente riconoscibili la g a due occhi e la gamba espansa della R. La relazione storica fra i due caratteri non li rende identici, né consente di attribuire a Gill Sans la commissione originaria per la metropolitana. Il confronto mostra come proporzioni e memoria del gesto possano caratterizzare un alfabeto anche quando le grazie sono assenti @t06-gill.#nota-compatta([Monotype, Gill Sans; TfL, The lettering of London, Johnston (1916).], ("https://www.myfonts.com/collections/gill-sans-font-monotype-imaging/", "https://tfl.gov.uk/info-for/media/press-releases/2016/november/-tfl-partners-with-two-global-brands-to-bring-the-lettering-of-london-to-life"))

Verdana, infine, rende visibile il ruolo del mezzo nel dettaglio di un sans. _Carter_ ne disegnò forme e spaziature generose per le condizioni dei piccoli testi sullo schermo, mentre _Tom Rickner_, specialista della resa digitale dei font, curò l’hinting. *Lettere facilmente confondibili*, come I, l e la cifra 1, furono differenziate con particolare attenzione. L’ampiezza non è un ingombro da correggere comprimendo il font, ma parte di quell’equilibrio. Il progetto non dimostra però che una famiglia nata per lo schermo sia inutilizzabile sulla carta, né che ogni sans raggiunga la stessa distinguibilità: la prova va riferita a quei segni, alle condizioni di resa e al compito di lettura @t06-verdana.#sito([Microsoft Typography, Verdana.], "https://learn.microsoft.com/en-us/typography/font-list/verdana")

#confronto[
#figure([
#stack(dir: ttb, spacing: 12pt,
  image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/sans-grottesco-umanistico-geometrico.svg"), width: 137mm, alt: "Work Sans, Alegreya Sans e Quicksand: Aag, corpo 36."),
  image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/sans-helvetica-futura-verdana-gill.svg"), width: 137mm, alt: "Helvetica, Futura, Verdana e Gill Sans: campioni Aag autentici."),
)
#v(12pt)
#riga-campioni((
(titolo: [Franklin Gothic], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/franklin-gothic-specimen-ufficiale.png"), width: 60pt, height: 27pt, originale-width: 375pt, originale-height: 39.75pt, dx: -5.25pt, dy: -6pt, alt: "Five, dettaglio di Franklin Gothic Book dallo specimen ufficiale.")),
(titolo: [Johnston Sans], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/johnston-sans-proof-sheet-tfl.jpg"), width: 79.1pt, height: 28pt, originale-width: 336.7pt, originale-height: 464.8pt, dx: -53.9pt, dy: -58.1pt, alt: "ABC, dettaglio di Johnston Sans dal proof sheet di Transport for London.")),
(titolo: [Helvetica Now], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-now-specimen-ufficiale.png"), width: 64.8pt, height: 32.32pt, originale-width: 480pt, originale-height: 321.778pt, dx: -230.4pt, dy: -183.2pt, alt: "App, dettaglio di Helvetica Now dallo specimen ufficiale.")),
))
], kind: image, caption: [Dall’alto, da sinistra a destra: Work Sans (grottesco), Alegreya Sans (umanistico), Quicksand (geometrico); nella seconda riga Helvetica, Futura, Verdana e Gill Sans. Le prime due righe mostrano Aag a corpo nominale 36 pt. In basso, dettagli documentari: «Five» in Franklin Gothic Book, «ABC» in Johnston Sans e «App» in Helvetica Now.
  #v(4pt)#testo-diritti[Work Sans, Alegreya Sans e Quicksand: SIL OFL 1.1. Gill Sans e Helvetica Now, Monotype; Franklin Gothic Book, Microsoft; Johnston Sans, proof sheet TfL.]]) <fig-tipo-293>

]


=== Il gesto scritto e il gotico

I caratteri script richiamano la scrittura, ma possono farlo attraverso modelli molto lontani: un corsivo formale con collegamenti continui, una pennellata rapida, una grafia quotidiana o un disegno deliberatamente irregolare. La continuità apparente del gesto è già stata trasformata in un repertorio ripetibile. Per conservarne la naturalezza alcuni font offrono *alternative e sostituzioni contestuali*, così che incontri diversi fra lettere non risultino identici.

Le forme blackletter derivano invece da *tradizioni di scrittura spezzata* e comprendono famiglie differenti. L’etichetta italiana “gotico” è ampia e non coincide con Gothic quando questo termine compare in alcuni nomi inglesi di sans serif. Guardare il disegno evita l’equivoco: densità, angoli, ritmo verticale e costruzione delle minuscole rendono riconoscibile una blackletter più del nome commerciale.

Script e blackletter hanno accumulato associazioni attraverso la loro storia d’uso. Un particolare script può richiamare una dedica o un’etichetta; una blackletter può evocare un manoscritto, una testata o una scena musicale. Queste relazioni *non sono proprietà naturali* delle forme: cambiano con luogo, epoca e lettore. È utile riconoscerle per capire un esempio, evitando però di attribuire a un’intera categoria un unico sentimento. Nel progetto si osserva quale specifica tradizione il carattere richiama e se il suo repertorio sostiene le parole da comporre (@fig-tipo-294).

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/script-e-blackletter.svg"),
  [Pacifico e UnifrakturMaguntia: il gesto dello script e le forme della tradizione blackletter, nei disegni originali dei due font.],
  diritti: [Specimen originali; SIL Open Font License 1.1.],
  alt: "Pacifico e UnifrakturMaguntia: il gesto dello script e le forme della tradizione blackletter, nei disegni originali dei due font.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-294>


=== Display e monospazio

Display descrive una *destinazione d’uso*: caratteri progettati soprattutto per corpi grandi e testi relativamente brevi. Una famiglia display può essere serif, sans, script, geometrica oppure fortemente ornamentale. In grande possono emergere contrasti estremi, dettagli minuti e soluzioni che in piccolo perderebbero chiarezza. La categoria *non è sinonimo di vintage*, né indica necessariamente una forma eccentrica.

Monospazio descrive invece l’avanzamento. Ogni carattere di spaziatura occupa la *stessa larghezza di composizione*, compresi i segni visivamente stretti e quelli larghi. Questa regola produce un ritmo diverso da quello di un carattere proporzionale e ha una funzione evidente nel codice o nei contesti che richiedono celle allineate. Non significa che ogni lettera abbia lo stesso contorno, né che le distanze visive fra i tratti diventino identiche.

Separare queste dimensioni rende più precisa la scelta. Una famiglia può offrire sia una versione proporzionale sia una monospazio; una serif può essere disegnata per il testo o per i titoli; una script può avere molti usi oltre al logo. Quando descriviamo un font conviene quindi comporre una piccola frase: come sono costruiti i segni, quale regola ne governa l’avanzamento e per quali dimensioni sono stati pensati. Questa descrizione accompagna meglio il progetto di un’etichetta unica, perché collega la classificazione alle qualità osservabili (@fig-tipo-295).

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/proporzionale-monospazio-display.svg"),
  [Work Sans proporzionale, Liberation Mono a larghezza fissa e Bodoni Moda per titoli. Le guide mostrano l’avanzamento costante dei glifi monospaziati.],
  diritti: [Specimen originali dai font; SIL OFL 1.1.],
  alt: "Work Sans proporzionale, Liberation Mono a larghezza fissa e Bodoni Moda per titoli. Le guide mostrano l’avanzamento costante dei glifi monospaziati.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-295>
]
#[
// Caratteristiche e relazioni, tavole398–406: prosa corrente Figma, figure originali e apparati nativi.
// Le immagini mobili non assegnano pagine o righe al corpo del capitolo.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": sito, immagine
#import "../template/campioni.typ": confronto
#import "../template/documenti.typ": dettaglio

== Caratteristiche e relazioni

Una classificazione ci orienta; le caratteristiche permettono di mettere a confronto disegni concreti. Due caratteri dello stesso gruppo possono differire molto per peso, larghezza, altezza delle minuscole, contrasto e profilo dei terminali. Invece di chiedere soltanto quale “stile” rappresentino, possiamo osservare come queste proprietà costruiscano la presenza delle parole.

Un confronto utile conserva alcuni elementi e ne varia altri. Se cambiamo contemporaneamente famiglia, corpo, peso e testo, diventa difficile capire quale decisione abbia prodotto l’effetto. Per studiare il peso teniamo *costanti frase e dimensione*; per osservare le proporzioni affianchiamo gli stessi segni; per valutare l’uso torniamo poi a parole complete. Il *campione isolato* chiarisce un rapporto, mentre la *prova contestuale* ne verifica le conseguenze.

La tipografia combina misure e percezione. Un valore numerico non sostituisce il giudizio, ma aiuta a descriverlo e a ripetere la prova. Anche termini come “morbido”, “forte” o “elegante” diventano più utili quando vengono collegati a un dettaglio: un raccordo arrotondato, una massa di tratti scuri, una forte differenza di spessore. Questo passaggio *dalla sensazione all’osservazione* permette di discutere le scelte senza ridurle al gusto individuale e prepara la lettura degli esempi successivi.

=== Peso e larghezza

Il peso descrive la presenza dei tratti rispetto alla struttura del segno. Aumentarlo modifica il *rapporto fra pieni e vuoti*: gli spazi interni possono ridursi, i raccordi richiedono correzioni e una parola acquista una densità differente. Un Bold riuscito non è semplicemente il contorno del Regular ingrossato in modo uniforme. Il disegno può cambiare per mantenere riconoscibilità ed equilibrio lungo la famiglia.

La larghezza riguarda invece le proporzioni orizzontali. Condensed, normale ed extended offrono modi diversi di distribuire la forma nello spazio. In una *variante progettata*, curve, spessori, aperture e spazi vengono adattati insieme. La *compressione geometrica* di un font normale, al contrario, altera tutto secondo un unico rapporto. I campioni delle @fig-tipo-296 e @fig-tipo-297 distinguono questi due procedimenti nello stesso carattere @t06-wdth2021.#sito([Microsoft, wdth design-variation axis tag.], "https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_wdth")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/roboto-serif-larghezza-progettata.svg"),
  [Roboto Serif, asse di larghezza wdth 75: la variante stretta adatta il disegno dei tratti.],
  diritti: [Contorni originali; SIL OFL 1.1.],
  alt: "Roboto Serif, asse di larghezza wdth 75: la variante stretta adatta il disegno dei tratti.",
) <fig-tipo-296>
],
    [#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/roboto-serif-compressione-geometrica.svg"),
  [Roboto Serif compresso geometricamente: la deformazione stringe l’intero segno, anziché usare una variante disegnata.],
  diritti: [Roboto Serif, Commercial Type / Google; SIL OFL 1.1.],
  alt: "Roboto Serif compresso geometricamente: la deformazione stringe l’intero segno, anziché usare una variante disegnata.",
) <fig-tipo-297>
],
  )
]

Peso e larghezza possono interagire, ma non sono la stessa proprietà. Una lettera larga e leggera non occupa visivamente la pagina come una stretta e molto scura; entrambe possono attirare l’attenzione per ragioni diverse. Nessuna delle due garantisce di per sé maggiore leggibilità o una precisa emozione. Conviene dichiarare la proprietà osservata e provare le combinazioni reali: il numero dell’asse o il nome dello stile identificano una scelta, mentre l’esito si giudica sulle lettere, sui loro spazi e sulle parole.

=== Altezze e proporzioni

Il corpo nominale *non coincide con l’altezza visibile* della lettera. All’interno dello spazio del font ogni progetto distribuisce diversamente minuscole, capitali, ascendenti e discendenti. L’x-height misura l’altezza della x minuscola dalla linea di base e offre un riferimento per osservare questa distribuzione. Due testi allo stesso corpo possono quindi apparire di dimensioni diverse. Un’altezza delle minuscole generosa può rendere più evidenti alcune forme, ma non è una qualità da massimizzare senza limiti. Se si riduce troppo la differenza con ascendenti e capitali, cambiano ritmo e distinzione fra i segni; anche gli accenti hanno bisogno del proprio spazio. Una x-height più contenuta può offrire rapporti diversi, da valutare alla dimensione d’uso. Non esiste un singolo valore che descriva da solo la qualità di lettura di una famiglia.

Il confronto (@fig-tipo-298) invita a osservare il *rapporto fra minuscolo e corpo*, poi quello fra minuscole, capitali e tratti sporgenti. Nella scelta interessa *l’intero equilibrio*: ampiezza delle controforme, differenze fra lettere simili, proporzioni delle parole e comportamento dei diacritici. Un carattere visivamente grande può richiedere una dimensione nominale inferiore a un altro, senza che questo renda i due progetti equivalenti. La misura fornisce un punto di partenza; il campione reale mostra che cosa quella misura significhi nel disegno.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/altezza-x-sei-font.svg"),
  [Stesso corpo 32, sei font originali. La guida tratteggiata mostra l’altezza della x, espressa in _em_.],
  diritti: [Font SIL OFL 1.1.],
  alt: "Stesso corpo 32, sei font originali. La guida tratteggiata mostra l’altezza della x, espressa in em.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-298>


=== Contrasto e asse

Il *contrasto tipografico* è la differenza di spessore all’interno del segno. Non coincide con il contrasto cromatico fra testo e sfondo e non riguarda soltanto il rapporto fra asta e grazie: può alternare tratti robusti e sottili nelle curve, nelle diagonali e nei raccordi. Un disegno a contrasto ridotto costruisce una presenza più uniforme; uno a contrasto elevato rende più evidente l’alternanza.

L’asse aiuta a leggere come quella distribuzione si orienti nelle forme curve. Una o con modulazione diagonale e una con modulazione verticale possono mostrare un ritmo diverso pur appartenendo entrambe ai serif. L’asse *non va confuso con la postura*: una lettera tonda può avere asse inclinato, mentre un corsivo può essere inclinato nel suo insieme. Sono due osservazioni che riguardano aspetti differenti del disegno.

In un didone le linee sottili possono risultare incisive in grande e fragili in piccolo; in una famiglia a basso contrasto altri dettagli possono svolgere un ruolo più importante nel riconoscimento. Queste tendenze non stabiliscono una superiorità generale. La resa dipende dalla variante e dal supporto. Nel passare da un dettaglio ingrandito alla dimensione effettiva, osserviamo quali tratti rimangano visibili e quali differenze si attenuino: il carattere che giudichiamo è sempre quello reso concretamente, con le sue proporzioni e le sue condizioni di riproduzione (@fig-tipo-299).

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/contrasto-tratti-tre-font.svg"),
  [Contrasto dei tratti in Work Sans, EB Garamond e Bodoni Moda, allo stesso corpo 58. Le famiglie differiscono anche per altre proprietà.],
  diritti: [Specimen originali dai font; SIL OFL 1.1.],
  alt: "Contrasto dei tratti in Work Sans, EB Garamond e Bodoni Moda, allo stesso corpo 58. Le famiglie differiscono anche per altre proprietà.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-299>


=== Il profilo dei tratti

Un terminale può chiudersi con un *taglio netto*, una curva, una goccia o una forma appuntita. Il raccordo fra due tratti può essere *angolare o arrotondato*. Queste decisioni modificano la silhouette e gli spazi vicini, producendo differenze riconoscibili anche fra famiglie con proporzioni simili. Per osservarle conviene scegliere la stessa lettera e ingrandire il punto in cui il tratto termina o cambia direzione.

L’arrotondamento non equivale necessariamente a una costruzione circolare dell’intero alfabeto. Si possono arrotondare terminali di un disegno dal forte impianto geometrico oppure raccordare morbidamente una struttura di origine calligrafica. Allo stesso modo, un profilo netto può appartenere a una famiglia da testo o a un carattere espressivo. Il dettaglio acquisisce valore nel sistema di relazioni che lo accompagna.

Descrivere una forma come amichevole o severa può essere un’*ipotesi progettuale, da verificare*. Un angolo non contiene da solo un’emozione, e una terminazione morbida non rende automaticamente adatta una famiglia ai bambini. È più preciso spiegare che cosa osserviamo e come immaginiamo che venga interpretato da quel pubblico. Questo permette di distinguere l’analisi del segno dall’associazione culturale, lasciando spazio a un confronto con lettori reali anziché trasformare il dettaglio in una regola universale (@fig-tipo-300).

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/terminali-r-s-a.svg"),
  [Terminali di r, s e a in Work Sans, Alegreya Sans e Quicksand: i dettagli mostrano soluzioni diverse entro ciascuna famiglia.],
  diritti: [Contorni originali dei font; SIL OFL 1.1.],
  alt: "Terminali di r, s e a in Work Sans, Alegreya Sans e Quicksand: i dettagli mostrano soluzioni diverse entro ciascuna famiglia.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-300>


=== Le correzioni ottiche

La precisione geometrica è uno strumento del disegno, ma la *regolarità visiva richiede correzioni*. Una forma curva che termina sulla stessa linea di una forma piatta può sembrare più piccola; una punta può apparire più corta. Per compensare queste differenze, le curve e le forme appuntite possono oltrepassare leggermente le *linee nominali*. Questo superamento viene chiamato overshoot.

Il confronto (@fig-tipo-301) usa i contorni autentici di H, O e A in EB Garamond, insieme alla linea di base e al riferimento delle capitali registrato nel font. I superamenti non sono stati amplificati per renderli più spettacolari. Servono a vedere che una famiglia può risultare coerente pur senza far coincidere ogni estremità con la stessa guida geometrica. Correggere manualmente tutti i segni per riportarli sulla linea cancellerebbe parte di quel lavoro.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/eb-garamond-overshoot.svg"),
  [Overshoot in EB Garamond 400: O e A oltrepassano le quote nominali tracciate per la H.],
  diritti: [Schema dai contorni originali; SIL OFL 1.1.],
  alt: "Overshoot in EB Garamond 400: O e A oltrepassano le quote nominali tracciate per la H.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-301>


Altre compensazioni interessano incroci, curve, spessori e spazi: due tratti misurati allo stesso modo possono apparire diversi per orientamento e relazione con ciò che li circonda. Le correzioni appartengono al progetto complessivo e cambiano fra famiglie. Osservarle non significa cercare difetti nelle lettere, ma comprendere come il disegno usi differenze minute per costruire una *continuità percepita*. Il testo completo rimane la prova decisiva, perché è nella sequenza che le singole compensazioni diventano ritmo.

=== La dimensione ottica

Ingrandire un carattere e modificare la sua *dimensione ottica* sono operazioni differenti. La scala rende più grande la stessa forma; una variante ottica *modifica invece il disegno* per la dimensione alla quale dovrà essere usato. Nei piccoli corpi il progetto può rafforzare tratti, aprire spazi e riequilibrare proporzioni. Nei corpi grandi può consentire dettagli più fini e contrasti maggiori. La soluzione concreta dipende dalla famiglia.

Alcuni progetti distribuiscono queste varianti in file distinti, con nomi come Text e Display; altri adottano l’asse opsz di un font variabile. Non tutti i font variabili contengono questo asse e non ogni applicazione lo gestisce automaticamente allo stesso modo. Va quindi distinto ciò che il file permette da ciò che il software sta realmente applicando. Nei campioni delle @fig-tipo-302 e @fig-tipo-303, Roboto Serif è mostrato alla stessa scala con peso e larghezza costanti: *cambia soltanto opsz*, fra i valori 8 e 72. L’ingrandimento del confronto rende visibile la differenza del disegno e non simula l’asse. Tornando alle dimensioni effettive, possiamo capire perché scegliere una variante ottica sia diverso dal ridurre un campione da titolo. La famiglia non offre un’unica forma valida a qualsiasi scala, ma una relazione progettata fra dettaglio e uso @t06-opsz2024.#sito([Microsoft, opsz design-variation axis tag.], "https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_opsz")

#confronto[
#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/roboto-serif-dimensione-ottica-8.svg"),
  [Roboto Serif per testo: opsz 8, peso 400 e larghezza 100. Confronto alla stessa scala.],
  diritti: [Contorni originali; SIL OFL 1.1.],
  alt: "Roboto Serif per testo: opsz 8, peso 400 e larghezza 100. Confronto alla stessa scala.",
  width: 137mm,
) <fig-tipo-302>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/roboto-serif-dimensione-ottica-72.svg"),
  [Roboto Serif per titoli: opsz 72, peso 400 e larghezza 100 invariati.],
  diritti: [Contorni originali; SIL OFL 1.1.],
  alt: "Roboto Serif per titoli: opsz 72, peso 400 e larghezza 100 invariati.",
  width: 137mm,
) <fig-tipo-303>

]

=== La voce delle forme

Le forme dei caratteri partecipano al tono del messaggio. Una parola può apparire cerimoniale, quotidiana, tecnica o giocosa prima che si siano lette tutte le frasi. Questa impressione nasce dall’incontro fra qualità osservabili, abitudini di lettura e precedenti usi del carattere. Il peso può suggerire presenza, un corsivo può richiamare movimento o scrittura, una forma familiare può ricordare una testata: nessuno di questi rapporti vale però allo stesso modo in ogni contesto.

Parlare di “personalità” del font è una metafora utile se la si tratta come *attribuzione del lettore*. La ricerca di _Eva Brumberger_ sulle personas mostra che i partecipanti assegnano caratteristiche a caratteri e testi, e mette in luce l’importanza di studiare la loro relazione. Il fatto che emergano *associazioni condivise in un campione* non consente di trasformarle in un dizionario permanente delle emozioni. Esperienze, lingua, formazione e tradizioni d’uso contribuiscono al giudizio @t06-brumberger2003.#sito([_Brumberger_, 2003], "https://asu.elsevierpure.com/en/publications/the-rhetoric-of-typography-the-persona-of-typeface-and-text/")

La neutralità, a sua volta, può essere un effetto ricercato: un carattere familiare può attirare poca attenzione sulla propria forma in una situazione, mentre in un’altra richiamare istituzioni o stili riconoscibili. La scelta rimane espressiva anche quando cerca discrezione. L’obiettivo progettuale è capire quale voce sia pertinente alle parole e alle *aspettative del destinatario*, non assegnare per sempre un sentimento a ciascuna categoria.

=== Tipografia ed emozioni: gli esperimenti

Nel 1968 _Albert J. Kastl_ e _Irvin L. Child_ studiarono il significato emotivo associato a quattro variabili: angolare o curvo, pesante o leggero, semplice o ornato, con o senza grazie. I quaranta studenti partecipanti espressero giudizi su campioni tipografici e stati d’animo. Emersero associazioni fra combinazioni di proprietà e qualità emotive, ma il risultato riguarda *quegli stimoli e quel gruppo*: non dimostra che ogni carattere curvo provochi felicità o che ogni serif generi tristezza @t06-kastl1968.#sito([_Kastl_ e _Child_, 1968], "https://doi.org/10.1037/h0026506")

Nel 2012 _Beth E. Koch_ utilizzò sei alfabeti, soprattutto varianti di Helvetica e un confronto con Glypha, per ridurre l’interferenza del significato delle parole. Quarantadue persone completarono il questionario con lo strumento non verbale PrEmo. I confronti mostrarono differenze legate in particolare a peso e larghezza; non tutte le proprietà analizzate produssero differenze significative. Il numero limitato di stimoli e la composizione del campione impediscono di generalizzare quei risultati a tutte le famiglie e a tutte le popolazioni @t06-koch2012.#sito([_Koch_, 2012], "https://journals.uc.edu/index.php/vl/article/view/5862") La @fig-tipo-303a mostra due campioni attuali per osservare le famiglie citate; non riproduce gli stimoli dell’esperimento.

#confronto[
#figure([
#grid(columns: (1fr, 1fr), gutter: 5mm,
  [#text(size: 10pt, weight: 500)[Helvetica Regular]#v(4pt)
   #image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-regular-aag.svg"), width: 66.05pt, alt: "Helvetica Regular: Aag, corpo 36.")],
  [#text(size: 10pt, weight: 500)[Glypha Roman]#v(4pt)
   #box(height: 54pt, align(left + horizon, dettaglio(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/glypha-roman-specimen-ufficiale.jpg"), width: 108.29pt, height: 32.13pt, originale-width: 272pt, originale-height: 136pt, dx: -32.3pt, dy: -15.130859pt, alt: "Dettaglio autentico di Glypha Roman dallo specimen Linotype/MyFonts.")))],
)
], kind: image, caption: [Helvetica e Glypha Roman: esempi di confronto, distinti dagli stimoli di _Koch_ (2012).
  #v(4pt)#testo-diritti[Helvetica / Haas; Glypha Roman / Linotype, MyFonts.]]) <fig-tipo-303a>

]


I due studi rendono verificabile una domanda che altrimenti resterebbe affidata all’intuizione. Per applicarli al progetto dobbiamo conservare anche metodo e limiti, distinguendo il *giudizio dichiarato* davanti a un alfabeto dalla lettura di un testo, dalla comprensione e da un comportamento d’acquisto. Sono *compiti diversi*: una misura non può sostituire automaticamente le altre.

=== La congruenza fra forma e significato

Un’altra domanda riguarda la congruenza fra ciò che la parola significa e ciò che la forma suggerisce. _Lewis_ e _Walker_, nel 1989, trovarono *tempi di risposta più lunghi* quando qualità attribuite al carattere e significato dello stimolo entravano in conflitto. Era un compito sperimentale di decisione rapida, non una dimostrazione che qualunque testo “coerente” venga sempre compreso o ricordato meglio @t06-lewis1989.#sito([_Lewis_ e _Walker_, 1989], "https://doi.org/10.1111/j.2044-8295.1989.tb02317.x")

_Childers_ e _Jass_, nel 2002, portarono il problema nel contesto pubblicitario. I loro esperimenti mostrarono che le associazioni del carattere possono contribuire alla percezione della marca e che la *coerenza fra tipografia, immagine e messaggio* può sostenere il ricordo dei benefici presentati. La conclusione utile riguarda una relazione fra elementi, non il potere isolato di un font di garantire credibilità o vendite @t06-childers2002.#sito([_Childers_ e _Jass_, 2002], "https://doi.org/10.1207/S15327663JCP1202_03")

Altre ricerche precisano la diversità degli esiti. _Velasco_ e colleghi, nel 2015, osservarono associazioni fra forme tonde e la parola “dolce”, e fra forme angolari e altri termini di gusto: si tratta di corrispondenze, non di una modifica necessaria del sapore reale @t06-velasco2015.#sito([_Velasco_ et al., 2015], "https://doi.org/10.1177/2041669515593040") _Juni_ e _Gross_, nel 2008, rilevarono differenze nelle valutazioni di due testi satirici composti in Arial e Times New Roman @t06-juni2008.#sito([_Juni_ e _Gross_, 2008], "https://doi.org/10.2466/pms.106.1.35-42") _Medved_ e colleghe, nel 2023, trovarono differenze di piacevolezza e velocità fra i caratteri arrotondati e angolari selezionati per il loro studio @t06-medved2023.#sito([_Medved_ et al., 2023], "https://doi.org/10.3389/fpsyg.2023.1107839") Questi risultati invitano a formulare *ipotesi specifiche* e a provarle. Non sostituiscono l’osservazione del pubblico, della lingua e del testo che stiamo progettando.

Il confronto della @fig-tipo-303b permette di osservare Arial e Times New Roman nelle versioni digitali indicate, senza identificarle con gli stimoli usati negli esperimenti.

#figure([
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    text(size: 10pt, weight: 500)[Arial Regular],
    text(size: 10pt, weight: 500)[Times New Roman Regular],
  )
  #v(4pt)
  #image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/arial-times-new-roman-aag.svg"),
    width: 137mm, alt: "Arial Regular e Times New Roman Regular: Aag, corpo 36, contorni autentici.")
], kind: image, placement: top, scope: "parent",
  caption: [Arial Regular e Times New Roman Regular, corpo 36. Esempi dei font, distinti dagli stimoli degli esperimenti.
    #v(4pt)#testo-diritti[Versioni digitali Monotype.]],
) <fig-tipo-303b>
]
#[
// La prosa continua fra sezioni e colonne; i file seguono gli argomenti.
#import "../template/stile.typ": immagine

== Leggere gli esempi

La scelta tipografica acquista senso dentro un messaggio. Le lettere di un’insegna, di un disco o di una schermata hanno gli stessi elementi anatomici che abbiamo imparato a riconoscere, ma rispondono a situazioni diverse. Un nome deve restare nella memoria; un’indicazione deve essere decifrata mentre ci si muove; un titolo può anticipare il tono di una storia. Il disegno va messo in *relazione con il compito*.

Negli esempi che seguono partiremo dalle *caratteristiche visibili*. Osserveremo la presenza delle grazie, il contrasto dei tratti, la larghezza, le aperture, le terminazioni e i collegamenti. Poi considereremo le convenzioni attraverso cui quelle forme sono state utilizzate. Dire che una scritta appare solenne o informale è già un’interpretazione: può essere motivata, confrontata con altre letture e discussa, senza trasformarla in una proprietà immutabile del font. La stessa famiglia può servire messaggi molto differenti.

Il confronto della frase «I will always find you» rende immediato questo passaggio. Le parole rimangono uguali, mentre cambiano la scrittura e il loro trattamento grafico (@fig-tipo-304). La promessa può essere letta in registri diversi, ma l’immagine non permette di isolare il contributo della famiglia tipografica: intervengono anche dimensione, spazi, irregolarità e supporto. È un esempio da interpretare, *non un esperimento controllato*. Quando progettiamo un confronto nuovo dobbiamo decidere che cosa mantenere costante e quale variabile modificare.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/stessa-frase-due-registri-lettering.png"),
  [La stessa frase, «I will always find you», assume toni diversi con forme tonde e segni angolosi. Il confronto va interpretato nel contesto, insieme a dimensione, spazi e supporto.],
  alt: "La stessa frase, «I will always find you», assume toni diversi con forme tonde e segni angolosi. Il confronto va interpretato nel contesto, insieme a dimensione, spazi e supporto.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-304>

#[
// Marchi e campioni originali: didascalie e riferimenti restano modificabili.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": campione
#import "../template/documenti.typ": dettaglio

=== Il nome come disegno: Coca-Cola

Il logotipo Coca-Cola (@fig-tipo-305) mostra quanto possa diventare riconoscibile una parola quando i segni lavorano come un insieme. Le due C, le curve, i *tratti di collegamento* e gli svolazzi costruiscono un profilo continuo. Non stiamo osservando soltanto un corsivo scelto da un menu: stiamo osservando un lettering specifico, il cui equilibrio dipende dai rapporti fra quelle lettere e quelle parole. La forma della C iniziale prepara il movimento dei segni successivi, mentre le parti allungate tornano a occupare lo spazio intorno al nome.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/coca-cola-logotipo-documentato-2025.jpg"),
  [Logotipo Coca-Cola, versione documentata dal sito ufficiale nel 2025. Osservare i collegamenti e l’ingombro degli svolazzi.],
  diritti: [The Coca-Cola Company.],
  alt: "Logotipo Coca-Cola, versione documentata dal sito ufficiale nel 2025. Osservare i collegamenti e l’ingombro degli svolazzi.",
) <fig-tipo-305>

La documentazione aziendale attribuisce al contabile _Frank M. Robinson_ la proposta del nome e l’elaborazione della scritta a partire dalla tradizione Spencerian. È un metodo di calligrafia corsiva americano dell’Ottocento, ideato da _Platt Rogers Spencer_ @t06-coca2012.#sito([The Coca-Cola Company, Coke Lore: Trademark Chronology, 2012.], "https://www.coca-colacompany.com/about-us/history/coke-lore-trademark-chronology") Questa provenienza aiuta a capire la struttura del segno, ma non basta a descriverne l’uso contemporaneo: la familiarità accumulata attraverso le ripetizioni rende il disegno una presenza riconoscibile anche per chi non conosce il nome dello stile calligrafico. Il campione di Spencerian Script del 1885 (@fig-tipo-spencerian) mostra un corsivo tipografico ottocentesco da confrontare con il marchio @t06-spencerian1885.#sito([MacKellar, Smiths & Jordan, campionario del 1885, p. 54; Cornell University Library.], "https://archive.org/details/cu31924032183760/page/n61/mode/1up")

#campione(titolo: [Spencerian Script · campione 1885],
  didascalia: [Spencerian Script: parola dal campionario MacKellar, Smiths & Jordan, 1885, p. 54. Il corsivo tipografico è un documento distinto dal lettering Coca-Cola.],
  diritti: [MacKellar, Smiths & Jordan; Cornell University Library. Pubblico dominio negli Stati Uniti.],
)[
  #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/spencerian-script-mackellar-1885-parola.png"), width: 160pt,
    alt: "La parola Spencerian, con la virgola, nel campione tipografico ottocentesco.")
] <fig-tipo-spencerian>

Nel logotipo ogni collegamento appartiene a un insieme definito; nel font occorre invece predisporre *molte combinazioni possibili*, comprese parole mai previste dal disegnatore. Copiare il marchio e aggiungere lettere simili non equivale a possedere un alfabeto coerente. Anche un carattere ispirato alla calligrafia Spencerian avrà proporzioni, raccordi e spaziature proprie.

Il caso suggerisce un criterio di progetto: decidere dove serve un *segno fortemente individuale* e dove serve un *sistema esteso*. Il nome può tollerare una struttura elaborata perché ricorre sempre nella medesima forma; ingredienti, istruzioni e informazioni variabili richiedono un repertorio più ampio. Non occorre che tutti questi testi imitino gli svolazzi del marchio. La continuità può essere costruita mantenendo il nome autentico e scegliendo caratteri di accompagnamento che ne rispettino il ruolo senza riprodurne ogni gesto.

=== Tiffany e _Vogue_: grazie e contrasto

Tiffany & Co. permette di distinguere la scelta di un modello tipografico dalla *rifinitura di un logotipo*. Nel progetto diretto dalla grafica _Paula Scher_ per Pentagram il nome fu ridisegnato a mano, cercando l’aspetto di un carattere composto in metallo. Il risultato non si ricostruisce semplicemente digitando le parole in un serif somigliante. Occorre osservare le proporzioni delle maiuscole, la relazione fra i due nomi, la forma della e commerciale e il modo in cui i segni mantengono la propria precisione quando vengono impressi sul supporto (@fig-tipo-306a).

// La vista complessiva e il dettaglio usano la stessa fotografia originale.
// Il ritaglio ingrandisce il nome, senza ridisegnarlo né aggiungere un font.
#figure([
  #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/tiffany-confezione-e-lettering-pentagram.jpg"), width: 100%,
    alt: "Confezioni Tiffany azzurre, con il nome impresso sulla scatola in primo piano.")
  #v(6pt)
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/tiffany-confezione-e-lettering-pentagram.jpg"),
    width: 187.09pt, height: 68pt, originale-width: 570pt, originale-height: 380.297pt,
    dx: -315pt, dy: -280pt,
    alt: "Ingrandimento della scritta Tiffany & Co. visibile sulla stessa confezione.")
], kind: image, caption: [Tiffany & Co.: confezione e dettaglio del lettering ridisegnato; l’ingrandimento mostra grazie e tratti sottili.
  #v(4pt)#testo-diritti[Paula Scher / Pentagram per Tiffany & Co.]
]) <fig-tipo-306a>

Pentagram documenta anche la riduzione della scritta sulle confezioni e il ricorso alla stampa a caldo. Qui il disegno del segno e il *procedimento di riproduzione* si incontrano: un tratto sottile può apparire diverso se stampato con inchiostro, impresso o visualizzato a schermo @t06-tiffany.#sito([Pentagram, Tiffany & Co.; progetto diretto da _Paula Scher_.], "https://www.pentagram.com/work/tiffany-co")

La testata _Vogue_ offre un confronto utile (@fig-tipo-306b). Le maiuscole con forte *contrasto fra aste e filetti* appartengono a una tradizione tipografica riconoscibile nell’editoria di moda. Conviene analizzare la specifica testata riprodotta, anziché affermare che tutte le edizioni e tutti i periodi abbiano impiegato invariabilmente lo stesso font. La continuità che percepiamo dipende da lettere particolari e dalla loro ripetizione, oltre che dalla cultura editoriale in cui le abbiamo incontrate.#sito([Vogue, testata e sito della rivista.], "https://www.vogue.com/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/vogue-testata-contrasto.jpg"),
  [_Vogue_: testata a forte contrasto.],
  diritti: [Vogue / Condé Nast.],
  alt: "Vogue: testata a forte contrasto.",
) <fig-tipo-306b>

In entrambi i casi la categoria «serif» è troppo ampia per spiegare il risultato. Una grazia robusta e raccordata produce una presenza diversa da una terminazione sottile e netta; un contrasto elevato non coincide automaticamente con il lusso. È la combinazione di forma, qualità della riproduzione e uso storico a rendere plausibile quell’interpretazione. Il progettista può servirsi di queste associazioni, ma deve verificarle sul documento e sul pubblico a cui si rivolge.

=== Geometria e continuità: RAI e Diadora

Una scritta senza grazie può presentare *geometrie molto diverse*. La documentazione RAI sul marchio del 2000 identifica Futura per la dicitura che accompagna la farfalla. Le forme geometriche e l’alternanza fra maiuscola e minuscole danno alla parola un ritmo differente rispetto alle precedenti sigle tutte maiuscole. Il confronto va condotto sulle lettere: altezza della R, presenza delle curve, larghezza della a e piccolo punto della i sono dettagli che cambiano il profilo del nome anche quando rimane breve (@fig-tipo-307a) @t06-rai-logo.#sito([Rai, Storia ed evoluzione del logo, p. 6.], "https://www.rai.it/dl/docs/1426244578970Storia_del_logo_Rai.pdf")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/rai-farfalla-marchio-2000-inarea.svg"),
  [Rai: il marchio del 2000 con la farfalla, nella riproduzione vettoriale del portfolio Inarea. La documentazione Rai identifica Futura per il logotipo.],
  diritti: [Stefano Aureli per AReA di Antonio Romano / Rai. Riproduzione: Inarea.],
  alt: "Marchio Rai del 2000: dicitura Rai e simbolo della farfalla con due profili umani.",
) <fig-tipo-307a>

La sequenza storica interessa qui per il passaggio fra disegni tipografici. Non ogni variante del marchio coincide con un font impiegato senza modifiche, e una somiglianza non permette di ricostruire il lavoro sul segno. Anche quando la fonte dichiara una famiglia, lo spazio fra le lettere e le eventuali *correzioni del logotipo* vanno osservati nell’esecutivo. Il disegno registrato è il documento da confrontare.

Nel nome Diadora (@fig-tipo-307b) con lettere estese e squadrate notiamo invece un altro modo di costruire la geometria. Le curve si raccordano a lati quasi rettilinei; l’espansione orizzontale conferisce un andamento largo, mentre gli angoli ammorbidiscono la chiusura delle forme. L’accostamento con uno specimen Eurostile aiuta a riconoscere questa famiglia di soluzioni, ma non autorizza a dichiarare identico ogni contorno del marchio.  Perciò descriviamo il lettering senza trasformare l’identificazione proposta da fonti secondarie in una certezza di produzione. I campioni della @fig-tipo-eurostile-microgramma distinguono il documento storico e la versione digitale. Eurostile costituisce comunque un riferimento storico pertinente. _Aldo Novarese_ lo sviluppò per Nebiolo nel 1962, ampliando il precedente Microgramma con le minuscole @t06-eurostile.#sito([Archivio Tipografico, Eurostile: Nebiolo, _Aldo Novarese_, 1962.], "https://archiviotipografico.it/en/collections/movable-type/eurostile/") Il campione completo nella @fig-tipo-microgramma-documento documenta invece la versione digitale di Microgramma pubblicata da URW @t06-microgramma-urw.#sito([URW Type Foundry, Microgramma: scheda della famiglia digitale su MyFonts.], "https://www.myfonts.com/collections/microgramma-font-urw/") Il caso permette di mettere in relazione la cultura delle forme squadrate con una soluzione concreta, mantenendo separati il *carattere* documentato e l’applicazione *da verificare*. Nel progetto questa distinzione è pratica: partire da una famiglia e intervenire sul nome può generare un logotipo nuovo, che conserva *una parentela formale* senza coincidere con la semplice composizione del font.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/diadora-logotipo-squadrato.png"),
  [Diadora: lettere estese e squadrate.],
  diritti: [Diadora.],
  alt: "Diadora: lettere estese e squadrate.",
) <fig-tipo-307b>


// I due campioni Eurostile ripetuti nella fonte sono lo stesso ritaglio:
// qui una sola visuale conserva il confronto con Microgramma e le attribuzioni.
#figure([
  #set par(justify: false, spacing: 4pt)
  #text(size: 10pt, weight: 500)[Eurostile · campionario Nebiolo]
  #v(4pt)
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/eurostile-campionario-nebiolo.png"),
    width: 180.6pt, height: 25.2pt, originale-width: 585pt, originale-height: 414.6pt,
    dx: -31.2pt, dy: -282pt, alt: "La parola Incomunicabili nel campionario storico Eurostile.")
  #v(8pt)
  #text(size: 10pt, weight: 500)[Microgramma · versione digitale URW]
  #v(4pt)
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/microgramma-urw-specimen-digitale.png"),
    width: 110.4pt, height: 28.32pt, originale-width: 384pt, originale-height: 192pt,
    dx: -118.08pt, dy: -72.24pt, alt: "CARGO, campione digitale di Microgramma URW.")
], kind: image, caption: [Eurostile: campionario Nebiolo. Microgramma: specimen digitale URW/MyFonts, versione successiva, non l’originale del 1952.
  #v(4pt)#testo-diritti[Archivio Tipografico; URW / MyFonts.]
]) <fig-tipo-eurostile-microgramma>
]
#[
// Una vera sagoma alpha sulla doppia pagina, con un solo corpo di prosa.
// Il profilo deriva dall'immagine originale; le note mantengono la fascia ordinaria.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito
#import "../template/doppia-pagina.typ": sagoma-regionale
#import "../template/documenti.typ": tavola-documentaria
#import "../template/campioni.typ": campione

// Il documento completo conserva il contesto del dettaglio precedente e occupa
// il foglio che serve ad allineare la doppia pagina seguente. Nessuna prosa divisa.
#tavola-documentaria(fissa: true)[
    #immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/eurostile-campionario-nebiolo.png"),
      [Eurostile: il campionario Nebiolo completo permette di osservare il rapporto fra le varianti. Il dettaglio «Incomunicabili» è mostrato nella @fig-tipo-eurostile-microgramma.],
      diritti: [Nebiolo; riproduzione Archivio Tipografico.],
      alt: "Due pagine del campionario storico Eurostile, con parole, corpi e larghezze differenti.",
      width: 137mm,
    ) <fig-tipo-eurostile-documento>
]


// La vista completa dà contesto al ritaglio CARGO già usato nel confronto.
// È uno specimen digitale promozionale: non un documento stampato nel 1952.
#tavola-documentaria(fissa: true)[
  #immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/microgramma-urw-specimen-digitale.png"),
    [Microgramma: specimen digitale promozionale URW/MyFonts. La scritta «CARGO» ingrandita nella @fig-tipo-eurostile-microgramma appartiene a questa composizione contemporanea; la data 1952 nell’immagine richiama l’origine del carattere.],
    diritti: [URW Type Foundry / MyFonts.],
    alt: "Specimen digitale URW Microgramma: nome del carattere e autori sopra un camion con la scritta CARGO COMPANY.",
    width: 137mm,
  ) <fig-tipo-microgramma-documento>
]

#sagoma-regionale(
  id: "fig-tipo-308a",
  file: path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/langosteria-apertura-volto-spumeggiante-alpi.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/langosteria-apertura-editoriale.json")),
  larghezza: 476pt,
  inizio-immagine: 170mm - 238pt,
  fondo-immagine: 476pt * 1241 / 1645,
  note-esterne: false,
  didascalia: [Langosteria, apertura «Il volto spumeggiante delle Alpi»: il maiuscolo del titolo si distingue dai testi di lettura.
    #v(4pt)#testo-diritti[CBA Design per Langosteria; illustrazioni Elisa Macellari.]],
  alt: "Menu Langosteria aperto sul dorso delle due pagine, con titolo e illustrazione delle Alpi; calice e bordo del libro scontornati.",
)[
=== La tipografia di Langosteria

Nel progetto di CBA per Langosteria il carattere dei titoli si riconosce per le *proporzioni slanciate e l’alto contrasto* fra tratti. Le aste sottili e le parti più piene costruiscono una presenza incisiva senza ricorrere necessariamente a un peso massiccio. I campioni documentari consentono di osservare come i segni vengano accostati per formare il nome e come il ritmo delle lettere ritorni nelle titolazioni (dalla @fig-tipo-308a alla @fig-tipo-308d). La fonte del progetto descrive questi aspetti senza identificare un particolare file Bodoni. È quindi più corretto riconoscere una parentela con i serif ad alto contrasto che attribuire alla famiglia storica qualsiasi scritta dalla forma simile. «Bodoni» comprende inoltre interpretazioni differenti: per usare il nome come identificazione tecnica servirebbero la versione, la fonderia e il riscontro dei contorni. Qui la descrizione delle lettere fornisce già gli strumenti necessari per discutere la scelta. Nel menu documentato dalla @fig-tipo-309, «COCKTAILS» è in maiuscolo con grazie; i nomi dei cocktail sono senza grazie e più pesanti delle descrizioni e dei prezzi. Il carattere distintivo del titolo può restare concentrato nelle poche parole a cui è affidata l’espressione della marca; un testo più fitto richiede invece di controllare il peso, i dettagli e la spaziatura nella misura di lettura. Le immagini documentano un uso concreto: non sono una prova di superiorità di quel serif su tutte le altre soluzioni @t06-langosteria.#sito([CBA Design, Langosteria: ritmo, ricerca e gusto.], "https://cba-design.com/italy/work/langosteria-rebranding/")

Il rapporto fra identità e *testo variabile* emerge quando immaginiamo di sostituire una voce corta con un nome lungo, ricco di accenti o di consonanti consecutive. La personalità deve sopravvivere senza ricorrere a deformazioni geometriche o a spaziature arbitrarie. Studiare il caso significa perciò seguire ciò che rimane *riconoscibile attraverso parole diverse*: contrasto, proporzioni e trattamento dei segni. Le scelte di gabbia e l’organizzazione generale del menu appartengono all’impaginazione; qui ci interessa il comportamento della voce tipografica.

]

// Meander divide soltanto la prosa: le figure numerate restano nel flusso nativo.
// I dettagli condividono una fascia grafica; caption e diritti crescono col testo.
#tavola-documentaria[
  #grid(columns: (1fr, 1fr), column-gutter: 5mm,
    [#campione(fascia: 106pt,
      didascalia: [Langosteria: nel monogramma L si distinguono tratti sottili e spessi.],
      diritti: [CBA Design per Langosteria.],
    )[
      #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/langosteria-monogramma-l.png"),
        width: 106pt, alt: "Langosteria: monogramma L con contrasto fra tratti sottili e spessi.")
    ] <fig-tipo-308b>],
    [#campione(fascia: 106pt,
      didascalia: [Langosteria: contrasto dei tratti e accostamento ravvicinato di L e A nel logotipo.],
      diritti: [CBA Design per Langosteria.],
    )[
      #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/langosteria-logotipo-la.png"),
        width: 187.09pt, alt: "Langosteria: accostamento ravvicinato di L e A nel logotipo.")
    ] <fig-tipo-308c>],
  )
  #v(16pt)
  #immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/langosteria-campione-tipografico-cba.png"),
    [Langosteria, campione CBA: proporzioni slanciate e tratti ad alto contrasto.],
    diritti: [Identità CBA Design; illustrazioni Elisa Macellari.],
    alt: "Langosteria, campione CBA: proporzioni slanciate e tratti ad alto contrasto.",
    width: 137mm,
  ) <fig-tipo-308d>
]

#tavola-documentaria[
#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/langosteria-menu-cocktail-cba.jpg"),
  [Menu Langosteria: titoli, nomi dei cocktail e ingredienti cambiano cassa e peso.],
  diritti: [CBA Design; illustrazioni Elisa Macellari.],
  alt: "Menu Langosteria: titoli, nomi dei cocktail e ingredienti cambiano cassa e peso.",
  width: 137mm,
) <fig-tipo-309>
]
]
#[
// Caratteri in uso: prosa, campioni contestuali e documenti autonomi.
#import "../template/stile.typ": immagine, sito
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/campioni.typ": confronto, riga-campioni, dettaglio-figura
#import "../template/documenti.typ": dettaglio, tavola-documentaria

=== Frutiger e la segnaletica di Roissy

La segnaletica pone una domanda diversa rispetto a un logotipo: quanto rapidamente si riesce a *riconoscere la parola* nella situazione prevista? Un’indicazione viene incontrata a una certa distanza, da un punto di vista variabile e spesso durante uno spostamento. L’occhio non dispone del tempo e della posizione stabile di una lettura al tavolo. Le differenze fra segni simili, le aperture e la distribuzione dei pieni diventano perciò problemi concreti di disegno.

Il disegnatore di caratteri svizzero _Adrian Frutiger_ sviluppò per l’aeroporto di Roissy un carattere destinato a questo impiego. Il Museum für Gestaltung Zürich conserva le prove realizzate dall’Atelier Frutiger + Pfäffli fra il 1970 e il 1972. Nella parola «Douane» si confrontano tre soluzioni: la figura documenta un *prototipo di studio*, non un cartello già installato (@fig-tipo-310). Questa distinzione restituisce al documento la sua funzione: mostrare che il carattere veniva valutato attraverso prove della *parola completa* @t06-roissy.#sito([Museum für Gestaltung Zürich, Typeface design Douane, 1970–1972.], "https://old.eguide.ch/en/objekt/1879/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/segnaletica/frutiger-douane-prototipi-roissy-1970-1972.jpg"),
  [«Douane»: tre varianti del prototipo Roissy, 1970–1972. Il confronto riguarda forme e spazi della stessa parola.],
  diritti: [Adrian Frutiger / Atelier Frutiger + Pfäffli; Museum für Gestaltung Zürich / ZHdK.],
  alt: "«Douane»: tre varianti del prototipo Roissy, 1970–1972. Il confronto riguarda forme e spazi della stessa parola.",
) <fig-tipo-310>

Possiamo seguire le curve della D e della o, osservare l’apertura della e e confrontare il ritmo dei vuoti fra i segni. Una lettera può risultare ben distinta nell’ingrandimento e perdere chiarezza quando la parola viene ridotta o osservata da lontano. Anche un tratto più spesso può aiutare la presenza complessiva e contemporaneamente ridurre una controforma. Il progetto nasce dall’equilibrio di questi effetti, non dall’applicazione di un unico valore ideale.

#dettaglio-figura(titolo: [Roissy · prototipo 1970–1972], riferimento: <fig-tipo-310>,
  didascalia: [Un particolare del prototipo, distinto dal campione del font retail.],
)[
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/segnaletica/frutiger-douane-prototipi-roissy-1970-1972.jpg"),
    width: 160pt, height: 46pt, originale-width: 187.09pt, originale-height: 206.489pt,
    dx: -14pt, dy: -10pt, alt: "Dettaglio della parola Douane nel prototipo conservato a Zurigo.")
]

Il successivo impiego di Frutiger in altri contesti non rende automaticamente intercambiabili segnaletica, testi e titolazioni. Ogni applicazione richiede una nuova verifica della versione utilizzata, del corpo e della spaziatura. Il valore didattico del prototipo consiste proprio nel rendere visibile un metodo: formulare una domanda, costruire *varianti confrontabili* e valutarle nelle condizioni di lettura. Osservare le sole lettere è necessario, ma la parola intera rimane l’unità entro cui quelle lettere devono collaborare.

=== Helvetica e Futura a confronto

Helvetica e Futura vengono spesso riunite sotto l’etichetta di caratteri moderni. Il confronto delle loro lettere (@fig-tipo-311a, @fig-tipo-311b, @fig-tipo-311c e @fig-tipo-311d-confronto) mostra però che l’assenza delle grazie non determina una sola voce. La struttura geometrica di Futura privilegia cerchi, linee e proporzioni essenziali, mentre il disegno di Helvetica produce un ritmo più vicino alla tradizione delle grottesche. Osservare la a, la G, la t e le aperture aiuta a rendere precisa una differenza che l’aggettivo «pulito» lascia indistinta.

_Paul Renner_ progettò Futura per la fonderia Bauer; la famiglia fu presentata nel 1927 @t06-futura.#nota-compatta([Monotype, Die Futura des Jahrhunderts: disegno del 1927 e successivo Futura Now.], "https://www.monotype.com/de/ressourcen/expertise/die-futura-des-jahrhunderts") La geometria visibile non significa che ogni lettera sia il risultato meccanico di un cerchio e di un righello: *correzioni e proporzioni ottiche* permettono ai segni di convivere nella parola. Helvetica nacque invece dal lavoro di _Max Miedinger_, _Eduard Hoffmann_ e della fonderia Haas @t06-helvetica. Il progetto è stato ampliato e reinterpretato, perciò i nomi Helvetica, Neue Helvetica e Helvetica Now non designano file identici @t06-helvetica-now.#nota-compatta([Monotype, Helvetica Now: famiglia e comunicato del 9 aprile 2019.], ("https://www.monotype.com/fonts/helvetica-now", "https://www.monotype.com/press-releases/monotype-introduces-helvetica-now-reinvented-to-meet-the-typographical-demands-of-today-s-creative-professionals"))

// Quattro visuali autentiche: i primi due glifi condividono il corpo 36;
// i ritagli editoriali di App e Fru sono identificati come esempi differenti.
#confronto[
  #figure([
    #riga-campioni((
      (titolo: [Helvetica Regular · 36], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-regular-aag.svg"), width: 66.05pt)),
      (titolo: [Helvetica Neue Regular · 36], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/helvetica-neue-regular-aag.svg"), width: 65.54pt)),
      (titolo: [Helvetica Now · dettaglio], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-now-specimen-ufficiale.png"),
        width: 63pt, height: 31.687pt, originale-width: 470.601pt, originale-height: 315.477pt,
        dx: -225.89pt, dy: -179.61pt, alt: "App, dettaglio dello specimen ufficiale Helvetica Now.")),
      (titolo: [Frutiger LT · retail], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/esempi/segnaletica/frutiger-lt-campione-retail.png"), width: 86.46pt)),
    ))
  ], kind: image, caption: [Helvetica, Helvetica Neue, Helvetica Now («App») e Frutiger LT («Fru»). Il campione digitale Frutiger LT è attuale: non è il prototipo Roissy.
    #v(4pt)#testo-diritti[Monotype; Linotype / MyFonts.]
  ]) <fig-tipo-sans-varianti>
]

La diffusione di queste famiglie ha favorito associazioni con istituzioni, imprese e linguaggi del Novecento. Tuttavia chiamare Helvetica «neutrale» non significa che sia priva di storia o che sparisca sempre dalla percezione. Il suo impiego ripetuto può diventare esso stesso un segnale culturale. Anche Futura può apparire severa, giocosa o monumentale in base a peso, cassa e spaziatura; il nome del carattere non decide il tono finale.

Un confronto efficace *mantiene costanti parole, dimensione e colore*, poi esamina l’ingombro effettivo e il disegno dei segni. La parità del corpo nominale non garantisce la stessa dimensione percepita: bisogna osservare l’altezza delle minuscole e l’area occupata. Questo è il passaggio che rende utili i casi celebri al progetto quotidiano. Non scegliamo una reputazione astratta, ma una *versione concreta di una famiglia*, verificata sulle parole che dovrà comporre. Si vedano anche i campioni della @fig-tipo-sans-varianti.

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/editoria/futura-specimen-storico-pesi-e-corpi.png"),
  [Futura: pagina di uno specimen storico, con diversi pesi e corpi.],
  diritti: [Paul Renner, Futura; documento riprodotto da Monotype.],
  alt: "Futura: pagina di uno specimen storico, con diversi pesi e corpi.",
) <fig-tipo-311a>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/editoria/futura-copertina-specimen-storico.png"),
  [Futura: copertina storica, maiuscole spaziate.],
  diritti: [Paul Renner, Futura; documento riprodotto da Monotype.],
  alt: "Futura: copertina storica, maiuscole spaziate.",
) <fig-tipo-311b>
],
  )
]

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-now-specimen-ufficiale.png"),
  [Helvetica Now: pesi diversi in uso.], diritti: [Monotype.],
  alt: "Specimen ufficiale Helvetica Now: parole in diversi pesi.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-311c>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/classificazioni/helvetica-futura-aag.svg"),
  [Helvetica Regular e Futura Medium: Aag, corpo 36. I contorni autentici delle versioni digitali conservano le differenze delle forme.],
  diritti: [Monotype / Linotype.], alt: "Aag in Helvetica Regular e Futura Medium allo stesso corpo nominale.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-311d-confronto>

=== IKEA: da Futura a Verdana

Il passaggio dalla famiglia Futura impiegata nella comunicazione IKEA a Verdana è un esempio utile per discutere la *continuità tipografica*. Le differenze non consistono semplicemente nell’eliminare le grazie, perché entrambe le famiglie sono senza grazie. Cambiano invece le proporzioni, l’altezza delle minuscole, la forma della a, l’ampiezza degli occhielli e l’ingombro delle parole. Un titolo conosciuto può apparire diverso anche quando contenuto e colore rimangono invariati @t06-carter2013.#sito([MyFonts, Creative Characters: _Matthew Carter_, ottobre 2013.], "https://www.myfonts.com/pages/newsletters-cc-201310")

La scelta di Verdana richiama il problema del rapporto fra carattere e mezzo. La famiglia fu disegnata da _Matthew Carter_ per Microsoft con un’attenzione specifica alla leggibilità sugli schermi a bassa risoluzione. Questa origine non impedisce di usarla sulla carta; invita però a osservare come il suo disegno si comporti in una grande titolazione, dove i particolari e le proporzioni diventano più evidenti. Un carattere progettato per un vincolo tecnico può assumere una presenza espressiva proprio quando viene portato in un altro contesto @t06-verdana.

È essenziale distinguere il *testo del catalogo dal logotipo* IKEA. Il museo aziendale documenta la storia di quest’ultimo e l’impiego di un disegno interno basato su una Futura molto pesante. Il cambiamento del carattere dei testi non implica che anche le quattro lettere nel marchio siano state ricomposte in Verdana. Per isolare le differenze del disegno, il campione (@fig-tipo-312) confronta le due famiglie autentiche su una frase originale: è una dimostrazione, non una pagina del catalogo @t06-ikea-logo.#sito([IKEA Museum, The history of the IKEA logo.], "https://www.ikeamuseum.com/en/explore/the-story-of-ikea/history-of-the-logotype/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/editoria/futura-verdana-confronto-stessa-frase.svg"),
  [Futura Medium e Verdana Regular, con la stessa frase e lo stesso corpo nominale. Il campione non è una riproduzione del catalogo IKEA.],
  diritti: [Contorni autentici di Futura e Verdana.],
  alt: "Futura Medium e Verdana Regular, con la stessa frase e lo stesso corpo nominale. Il campione non è una riproduzione del catalogo IKEA.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-312>

Le copertine complete mostrano i due cataloghi svedesi: quello del 2009 (@fig-tipo-312a) @t06-ikea2009 e quello del 2010 (@fig-tipo-312b) @t06-ikea2010.#nota-compatta([IKEA Museum, catalogo svedese 2009. IKEA Museum, catalogo svedese 2010.], ("https://ikeamuseum.com/en/explore/ikea-catalogue/2009-ikea-catalogue/", "https://ikeamuseum.com/en/explore/ikea-catalogue/2010-ikea-catalogue/"))

// Il caso si conclude prima degli inserti: la prosa resta continua e libera.
La reazione a un cambiamento familiare *non misura da sola* la facilità di lettura. Può riguardare una perdita di riconoscibilità, un’abitudine o una preferenza. Per valutare una sostituzione servono *domande distinte*: le lettere sono distinguibili, le parole mantengono una presenza adatta al messaggio, le informazioni vengono comprese, la nuova voce resta riconoscibile nel tempo? Il caso IKEA aiuta a formulare queste domande senza ridurre una decisione complessa al giudizio «bello» o «brutto» sul nome di un font.

// Documento autonomo della fonte: una pagina, senza fascia di note.
#tavola-documentaria[
  #set par(justify: false, spacing: 6pt)
  #text(font: "Sora", weight: 700, size: 20pt)[Il catalogo IKEA 2009]
  #v(8pt)
  #figure([
    #text(size: 10pt, weight: 500)[Copertina · edizione svedese · 2009]
    #v(4pt)
    #align(center, image(path("/risorse-condivise/immagini/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2009-copertina.jpg"), width: 319.282pt, height: 380pt, fit: "contain",
      alt: "Copertina integrale del catalogo IKEA 2009, edizione svedese."))
    #v(8pt)
    #text(size: 10pt, weight: 500)[Dettaglio originale · titolo]
    #v(4pt)
    #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2009-copertina.jpg"), width: 137.2pt, height: 36pt,
      originale-width: 496.4pt, originale-height: 590.8pt, dx: -160.8pt, dy: -406.4pt,
      alt: "Titolo INRED, ingrandito dalla stessa copertina IKEA 2009.")
  ], kind: image, caption: [IKEA, catalogo 2009, edizione svedese: copertina integrale e dettaglio del titolo «INRED». Il documento usa parole e immagini diverse dall’edizione 2010; non è una prova a variabile unica.
    #v(4pt)#testo-diritti[© Inter IKEA Systems B.V. Fonte: IKEA Museum.]
  ]) <fig-tipo-312a>
]

// Documento autonomo della fonte: una pagina, senza fascia di note.
#tavola-documentaria[
  #set par(justify: false, spacing: 6pt)
  #text(font: "Sora", weight: 700, size: 20pt)[Il catalogo IKEA 2010]
  #v(8pt)
  #figure([
    #text(size: 10pt, weight: 500)[Copertina · edizione svedese · 2010]
    #v(4pt)
    #align(center, image(path("/risorse-condivise/immagini/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2010-copertina.jpg"), width: 329.161pt, height: 380pt, fit: "contain",
      alt: "Copertina integrale del catalogo IKEA 2010, edizione svedese."))
    #v(8pt)
    #text(size: 10pt, weight: 500)[Dettaglio originale · titolo]
    #v(4pt)
    #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/editoria/ikea-catalogo-svedese-2010-copertina.jpg"), width: 141.923pt, height: 36pt,
      originale-width: 793.385pt, originale-height: 915.923pt, dx: -38.08pt, dy: -552.46pt,
      alt: "Titolo OLIKA, ingrandito dalla stessa copertina IKEA 2010.")
  ], kind: image, caption: [IKEA, catalogo 2010, edizione svedese: copertina integrale e dettaglio del titolo «OLIKA». Il carattere dei testi e il logotipo aziendale hanno ruoli distinti.
    #v(4pt)#testo-diritti[© Inter IKEA Systems B.V. Fonte: IKEA Museum.]
  ]) <fig-tipo-312b>
]

// Il commento conclusivo segue i due documenti; il testo successivo prosegue nel flusso.
]
#[
// Identità digitali: campioni autentici e schermate documentate.
// Il corpo è prosa ordinaria; le quote descrivono soltanto ritagli delle immagini.
#import "../template/stile.typ": immagine, sito
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/campioni.typ": confronto, riga-campioni, dettaglio-figura
#import "../template/documenti.typ": dettaglio

=== I caratteri di sistema di Apple e Android

La storia tipografica dei sistemi Apple mostra il cambiamento dei vincoli. Nel Macintosh del 1984, Chicago, Geneva e Monaco di _Susan Kare_ nascono come *disegni bitmap*: ogni pixel contribuisce al riconoscimento, e un alfabeto proporzionale risponde a un compito diverso da uno monospazio. Nei successivi Mac OS X, Lucida Grande dei disegnatori di caratteri _Charles Bigelow_ e _Kris Holmes_ porta una voce umanistica, con minuscole ampie e controforme aperte.#nota-compatta([_Susan Kare_, testimonianza riportata da MyFonts; _Bigelow_ e _Holmes_, confronto Lucida Grande–Helvetica Neue.], ("https://www.myfonts.com/es/collections/susan-kare", "https://lucidafonts.com/blogs/bigelow-holmes-blog/whats-the-difference-between-lucida-grande-and-helvetica-neue")) Nel 2014 Yosemite passa a Helvetica Neue; nel 2015 San Francisco diventa il carattere di sistema di OS X El Capitan. Non è una sequenza di caratteri progressivamente migliori in assoluto: cambiano risoluzioni, dimensioni degli schermi e necessità del prodotto. Il confronto deve seguire proporzioni, spazi e repertori di ciascuna versione, senza attribuire l’intera evoluzione a un solo episodio biografico del cofondatore di Apple _Steve Jobs_ @t06-apple2015.#nota-compatta([Apple, annuncio El Capitan (2015).], "https://www.apple.com/newsroom/2015/06/08Apple-Announces-OS-X-El-Capitan-with-Refined-Experience-Improved-Performance/")

// I vettoriali successivi restano distinti dal documento bitmap del Macintosh.
#confronto[
  #figure([
    #set text(hyphenate: false)
    #riga-campioni((
      (titolo: [Chicago · bitmap storico], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/storia/kare-chicago-documento-cornell-2016.png"),
        width: 48.6pt, height: 25.92pt, originale-width: 972pt, originale-height: 547.02pt,
        dx: -273.24pt, dy: -154.44pt, alt: "Chi, dettaglio del carattere bitmap Chicago nel documento Cornell Tech.")),
      (titolo: [Geneva · vettoriale], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/geneva-aag-36.svg"), width: 71pt)),
      (titolo: [Monaco · vettoriale], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/monaco-aag-36.svg"), width: 67pt)),
      (titolo: [Lucida Grande · vettoriale], visuale: image(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/lucida-grande-aag-36.svg"), width: 70pt)),
    ))
    #v(8pt)
    #text(size: 10pt, weight: 500)[Helvetica Neue Regular · vettoriale]
    #v(4pt)
    #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/helvetica-neue-regular-aag.svg"), width: 66pt)
  ], kind: image, caption: [Chicago bitmap: dettaglio «Chi». Geneva, Monaco, Lucida Grande e Helvetica Neue sono versioni vettoriali successive, distinte dai bitmap del 1984.
    #v(4pt)#testo-diritti[Susan Kare / Apple; documento Cornell Tech, 2016. Glifi successivi: Apple; Bigelow & Holmes; Linotype.]
  ]) <fig-tipo-313a>
]

Nei sistemi digitali la tipografia deve affrontare parole brevi, numeri, messaggi lunghi e repertori linguistici differenti. Apple presenta San Francisco come una famiglia progettata per queste condizioni: le forme e la spaziatura si adattano alla *dimensione e al contesto d’uso*. Il progetto non si esaurisce nell’assenza di grazie. Riguarda il rapporto fra disegno, corpo, spazi e funzioni di composizione, compresi dettagli apparentemente minimi come il posizionamento dei due punti quando vengono visualizzati gli orari.

La documentazione distingue SF Pro, SF Compact, SF Mono e i relativi impieghi. SF Compact risponde alle esigenze di spazi ridotti; SF Mono usa larghezze uniformi; altre estensioni rispettano le strutture di sistemi di scrittura diversi. Nel campione ufficiale (@fig-tipo-313), il saluto «hello», ampio e pesante, si confronta con il «ciao» stretto; latino, cirillico, arabo ed ebraico estendono l’osservazione oltre un solo alfabeto @t06-apple-fonts.#nota-compatta([Apple Developer, Fonts: repertori e impieghi dei caratteri di sistema.], ("https://developer.apple.com/fonts/", "https://developer.apple.com/documentation/technologyoverviews/fonts"))

#confronto[
  #figure([
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#image(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/apple-san-francisco-campione-ufficiale.png"), width: 187.09pt,
        alt: "Campione ufficiale Apple con saluti in latino, cirillico, arabo ed ebraico.")],
      [
        #set par(justify: false, spacing: 4pt)
        #set text(size: 10pt, weight: 500)
        SF Pro · dettaglio
        #v(4pt)
        #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/apple-san-francisco-pro-compact-mono-wwdc22.png"),
          width: 37.346pt, height: 20.371pt, originale-width: 407.415pt, originale-height: 229.171pt,
          dx: -76.81pt, dy: -47.96pt, alt: "Dettaglio SF Pro dal campione Apple.")
        #v(6pt)
        SF Compact · dettaglio
        #v(4pt)
        #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/apple-san-francisco-pro-compact-mono-wwdc22.png"),
          width: 52.2pt, height: 20.795pt, originale-width: 407.415pt, originale-height: 229.171pt,
          dx: -76.39pt, dy: -102.7pt, alt: "Dettaglio SF Compact dal campione Apple.")
        #v(6pt)
        SF Mono · dettaglio
        #v(4pt)
        #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/apple-san-francisco-pro-compact-mono-wwdc22.png"),
          width: 45.834pt, height: 21.22pt, originale-width: 407.415pt, originale-height: 229.171pt,
          dx: -76.39pt, dy: -158.3pt, alt: "Dettaglio SF Mono dal campione Apple.")
      ],
    )
  ], kind: image, caption: [San Francisco: campione ufficiale Apple. Dettagli di SF Pro, SF Compact e SF Mono.
    #v(4pt)#testo-diritti[Apple.]
  ]) <fig-tipo-313>
]

Anche Roboto mostra un carattere progettato come risorsa per un ambiente digitale. Il designer di Google _Christian Robertson_ ne documenta la revisione insieme al sistema Material: il disegno fu raffinato per sostenere una gamma di dispositivi e usi. Nei campioni possiamo guardare le minuscole, i numeri e le differenze fra pesi, osservando come i dettagli conservino una presenza coerente quando aumenta la densità del testo. La famiglia e le sue versioni vanno identificate con precisione, senza assumere che ogni carattere denominato Roboto abbia lo stesso repertorio o gli stessi assi @t06-robertson2014.#sito([_Christian Robertson_, The New Roboto, 2014.], "https://developers.googleblog.com/en/the-new-roboto/")

#figure([
  #text(size: 10pt, weight: 500)[Roboto Regular · Aag, corpo 36]
  #v(4pt)
  #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/roboto-regular-aag-36.svg"), width: 66pt)
], kind: image, caption: [Roboto Regular: contorni autentici della versione digitale del campione. La famiglia va distinta dalle successive estensioni e revisioni.
  #v(4pt)#testo-diritti[Christian Robertson / Google.]
]) <fig-tipo-roboto-sistema>

Questi casi chiariscono una differenza fra *identità e prestazione*. Una famiglia propria può offrire continuità, ma la leggibilità non nasce automaticamente dal possesso del font. Occorre verificare *parole reali, cifre, accenti*, misure e condizioni dello schermo. La storia dei caratteri bitmap del Macintosh rende evidente lo stesso principio in un altro ambiente tecnico: ogni risoluzione pone vincoli specifici. Il passaggio ai contorni scalabili ha ampliato le possibilità, ma non ha eliminato il lavoro sul disegno delle lettere. I campioni delle @fig-tipo-313a e @fig-tipo-roboto-sistema permettono di confrontare questi disegni.

=== Cereal, Reith e Netflix Sans

Airbnb Cereal, BBC Reith e Netflix Sans permettono di osservare tre famiglie sviluppate per usi estesi di una marca. Il problema è diverso da quello di un nome disegnato una sola volta. I caratteri devono comporre *contenuti imprevedibili* e conservare una voce attraverso pesi, dimensioni e lingue. Le pagine dei progettisti sono particolarmente utili perché mostrano il repertorio e le prove, oltre all’applicazione finale.

Airbnb presenta Cereal come una famiglia realizzata con Dalton Maag e introdotta nel 2018. Il riferimento al carattere aziendale non implica che ogni elemento dell’interfaccia sia immutabile: un sistema vive attraverso versioni e aggiornamenti. Per leggere il progetto conviene confrontare la rotondità delle lettere, le aperture e il rapporto fra pesi. Sono scelte che devono restare riconoscibili sia in un titolo sia in una sequenza di informazioni brevi, dove cifre e segni di punteggiatura hanno un ruolo frequente @t06-cereal2018.#sito([_Karri Saarinen_, Working Type, Airbnb Design, 2018.], "https://medium.com/airbnb-design/working-type-81294544608b")

// I ritagli originali occupano una colonna, come richiesto nel commento313.
// Tutte le quote del ritaglio crescono dello stesso fattore: nessuna deformazione.
#figure([
  #text(size: 10pt, weight: 500)[Airbnb Cereal · dettaglio «ab»]
  #v(4pt)
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/airbnb-cereal-specimen-originale.svg"),
    width: 187.09pt, height: 82.8541pt, originale-width: 1469.9929pt, originale-height: 721.8083pt,
    dx: -447.6796pt, dy: -189.0945pt, alt: "ab, dettaglio dello specimen originale Airbnb Cereal.")
], kind: image, caption: [Airbnb Cereal: minuscole dal campione originale.
  #v(4pt)#testo-diritti[Airbnb / Dalton Maag.]
]) <fig-tipo-cereal-dettaglio>

BBC Reith rende ancora più chiara l’ampiezza del compito. Dalton Maag documenta una suite con serif, sans, condensed e rounded, sviluppata attraverso prove e consultazioni. La presenza di arabo, cirillico e latino mostra che l’identità tipografica non consiste nella ripetizione di un unico alfabeto. I campioni e i fogli annotati permettono di seguire il lavoro sulle lettere, evitando di confondere l’obiettivo dichiarato di leggibilità con una superiorità universale già dimostrata (@fig-tipo-314a, @fig-tipo-314b, @fig-tipo-314c e @fig-tipo-314d) @t06-reith.#sito([Dalton Maag, BBC Reith.], "https://www.daltonmaag.com/portfolio/custom-fonts/bbc-reith.html")

#figure([
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/bbc-sounds-schermata-documentata.jpg"),
    width: 187.09pt, height: 290pt, originale-width: 187.09pt, originale-height: 405.07pt,
    dx: 0pt, dy: 0pt, alt: "Parte superiore della schermata documentata BBC Sounds.")
], kind: image, caption: [Dettaglio superiore dell’app BBC Sounds: titoli in grassetto e descrizioni regolari.
  #v(4pt)#testo-diritti[BBC Reith; Dalton Maag per BBC.]
]) <fig-tipo-314a>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/bbc-reith-prove-correzioni-a-mano.jpg"),
  [BBC Reith: prove con correzioni a mano.], diritti: [Dalton Maag per BBC.],
  alt: "BBC Reith: prove con correzioni a mano.",

) <fig-tipo-314b>

// Fondo nero e tracciati bianchi sono entrambi parti del documento originale.
#figure([
  #box(width: 187.09pt, height: 51.267pt, clip: true)[
    #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/bbc-reith-serif-sans-fondo.svg"), width: 187.09pt)
    #place(top + left, dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/bbc-reith-serif-sans-maschera.svg"),
      width: 187.09pt, height: 51.267pt, originale-width: 212.886pt, originale-height: 53.9939pt,
      dx: -12.927pt, dy: -1.44pt, alt: "BBC Reith: campione serif e sans, tondi e corsivi."))
  ]
], kind: image, caption: [BBC Reith: serif e sans, tondi e corsivi.
  #v(4pt)#testo-diritti[Dalton Maag per BBC.]
]) <fig-tipo-314c>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/bbc-reith-aperture-annotate.svg"),
  [BBC Reith: terminali e aperture annotati.], diritti: [Dalton Maag per BBC.],
  alt: "BBC Reith: terminali e aperture annotati.",

) <fig-tipo-314d>

Netflix Sans, sviluppato con Dalton Maag e documentato anche dal progettista _Noah Nathan_, aggiunge un altro esempio di famiglia proprietaria. La scelta di commissionare un carattere dipende da controllo della voce, copertura e gestione dell’uso; non autorizza a dedurre qualità dal solo fatto che il disegno sia esclusivo. Nei tre casi il criterio interessante è la continuità fra repertorio *e applicazioni*: quanto bene il sistema conserva differenze utili, regge parole nuove e distingue i segni nelle *dimensioni realmente necessarie* @t06-netflix.#sito([_Noah Nathan_, Netflix Sans.], "https://www.noahnathan.com/netflix-sans")

#figure([
  #text(size: 10pt, weight: 500)[Netflix Sans · dettaglio «Wat»]
  #v(4pt)
  #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/netflix-sans-specimen-noah-nathan.png"),
    width: 187.09pt, height: 80.8889pt, originale-width: 687.8309pt, originale-height: 386.9056pt,
    dx: -189.8413pt, dy: -99.8875pt, alt: "Wat, dettaglio del campione originale Netflix Sans.")
], kind: image, caption: [Netflix Sans: particolare dello specimen di progetto.
  #v(4pt)#testo-diritti[Noah Nathan / Netflix; sviluppo Dalton Maag.]
]) <fig-tipo-netflix-dettaglio>

=== Duolingo e Calm: ruoli e tono del testo

Nel sistema Duolingo documentato dalle linee guida archiviate nel 2025, Feather Bold è destinato alle *titolazioni brevi* e fortemente riconoscibili; DIN Next Rounded sostiene i testi più lunghi. Il disegno personalizzato di Feather Bold, sviluppato a partire dalla forma della mascotte, rende visibile una relazione fra figura e alfabeto. Nel lettering annotato, l’ascendente della d richiama un’ala e il terminale della g un sopracciglio della mascotte; l’alfabeto estende questi gesti alle altre lettere (@fig-tipo-315a e @fig-tipo-315b) @t06-duolingo.#sito([Duolingo, Typography, linee guida archiviate il 31 marzo 2025.], "https://web.archive.org/web/20250331234946/https://design.duolingo.com/identity/typography")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/duolingo-lettering-annotato.jpg"),
  [Duolingo: lettering del nome con annotazioni sui richiami alla mascotte.], diritti: [Johnson Banks, Beth Johnson e Fontsmith per Duolingo.],
  alt: "Duolingo: lettering del nome con annotazioni sui richiami alla mascotte.",

) <fig-tipo-315a>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/duolingo-feather-bold-minuscole.jpg"),
  [Feather Bold: curve e terminali delle minuscole.], diritti: [Johnson Banks, Beth Johnson e Fontsmith per Duolingo.],
  alt: "Feather Bold: curve e terminali delle minuscole.",

) <fig-tipo-315b>

Il caso è utile proprio perché il carattere più distintivo non viene applicato indistintamente a tutto. Una frase lunga, un messaggio variabile e una titolazione breve pongono richieste differenti. Le regole della marca assegnano *usi specifici* e un carattere sostitutivo quando le risorse proprietarie non sono disponibili. Si tratta di indicazioni locali: i valori numerici e le preferenze di cassa stabiliti per Duolingo non diventano regole generali della tipografia @t06-johnson-duolingo.#sito([_Beth Johnson_, Identity & Bespoke Typeface for Duolingo.], "https://bethjohnson.design/duolingo")

#confronto[
  #figure([
    #riga-campioni((
      (titolo: [Feather Bold · dettaglio a–f], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/duolingo-feather-bold-minuscole.jpg"),
        width: 145.08pt, height: 30.68pt, originale-width: 486.434pt, originale-height: 295.752pt,
        dx: -79.3pt, dy: -47.84pt, alt: "Prime minuscole del campione autentico Feather Bold.")),
      (titolo: [DIN Next Rounded · dettaglio], visuale: dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/din-next-rounded-specimen-monotype.png"),
        width: 57.12pt, height: 27.84pt, originale-width: 384pt, originale-height: 192pt,
        dx: -21.12pt, dy: -22.08pt, alt: "DIN, dettaglio dello specimen ufficiale DIN Next Rounded.")),
    ))
  ], kind: image, caption: [Feather Bold e DIN Next Rounded: dettagli originali. Il campione DIN è uno specimen della famiglia, non un’applicazione Duolingo.
    #v(4pt)#testo-diritti[Johnson Banks, Beth Johnson, Fontsmith; Monotype.]
  ]) <fig-tipo-duolingo-caratteri>
]

Calm offre un confronto da condurre con maggiore cautela. Il nome presenta una scrittura fluida, mentre i testi del servizio possono adottare caratteri diversi attraverso pagine, versioni e dispositivi. Non basta associare il prodotto alla meditazione per concludere che ogni testo sia composto in serif o che una famiglia rallenti fisiologicamente la lettura e riduca l’ansia. Possiamo invece osservare la forma del marchio, la regolarità dei testi e la quantità di spazio fra i segni, riferendoci a una versione documentata del prodotto. Il wordmark della @fig-tipo-315c documenta il nome del servizio.#sito([Calm, sito ufficiale, consultato il 20 ottobre 2026.], "https://www.calm.com/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/calm-wordmark-consultato-2026-10-20.png"),
  [Calm: wordmark dal sito ufficiale, consultato il 20 ottobre 2026. La data del disegno non è indicata.], diritti: [© Calm.],
  alt: "Calm: wordmark dal sito ufficiale, consultato il 20 ottobre 2026. La data del disegno non è indicata.",

) <fig-tipo-315c>

Il confronto chiarisce la *differenza fra intenzione e risultato*. Un progettista può cercare una voce giocosa o raccolta e scegliere forme coerenti con quell’ipotesi; per sapere come vengano interpretate deve però raccogliere riscontri. La descrizione «arrotondato» nomina una caratteristica visibile, mentre «rassicurante» descrive una possibile lettura. Tenere distinti questi due livelli permette di discutere il tono in modo preciso e di cambiare una scelta quando le risposte del pubblico non corrispondono alle attese.

=== La semplificazione dei logotipi

La semplificazione dei logotipi rende evidente quanto il carattere contribuisca alla *continuità di una marca*. Nel passaggio a forme più regolari possono scomparire dettagli storici, tratti calligrafici o contrasti marcati. Talvolta aumenta la facilità di riproduzione in piccole dimensioni; contemporaneamente può ridursi la distanza visiva da altri nomi. Nessuno di questi effetti è automatico: dipende dalle forme specifiche conservate, modificate o eliminate.

Google documenta la costruzione del proprio logotipo geometrico e della famiglia Product Sans nel progetto d’identità del 2015. La e inclinata è uno dei particolari mantenuti come tratto riconoscibile. Il confronto fra un nome e un alfabeto complementare mostra di nuovo che il *logotipo e il font* non sono la stessa cosa. La continuità può affidarsi a un dettaglio irregolare dentro un insieme apparentemente molto semplice, anziché a un’ornamentazione complessa (@fig-tipo-316) @t06-google2015.#sito([Google Design, Evolving the Google Identity, progetto2015.], "https://design.google/library/evolving-google-identity")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/google-logotipo-identita-2015.png"),
  [Google: logotipo documentato nel progetto d’identità 2015. La e inclinata mantiene una differenza riconoscibile.], diritti: [Google Design.],
  alt: "Google: logotipo documentato nel progetto d’identità 2015. La e inclinata mantiene una differenza riconoscibile.",

) <fig-tipo-316>


#dettaglio-figura(titolo: [Product Sans · due forme della a], riferimento: <fig-tipo-316>,
  didascalia: [Il campione dell’alfabeto complementare mostra due forme in «Maps», distinte dal lettering del nome Google. © 2015 Google Inc.],
)[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/google-product-sans-due-a-maps.svg"),
      width: 80.3pt, height: 34.1pt, originale-width: 213.593pt, originale-height: 87.2604pt,
      dx: -127.6pt, dy: -5.5pt, alt: "Maps, prima forma della a in Product Sans."),
    dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/google-product-sans-due-a-maps.svg"),
      width: 80.3pt, height: 34.1pt, originale-width: 213.593pt, originale-height: 87.2604pt,
      dx: -127.6pt, dy: -47.85pt, alt: "Maps, seconda forma della a in Product Sans."),
  )
]

Burberry permette di evitare una lettura della storia come marcia irreversibile verso il sans serif. Dopo la fase di semplificazione, nel 2023 il marchio presentò un nuovo disegno ispirato all’archivio. Questa successione non dimostra che un serif sia migliore o peggiore: mostra che una strategia può recuperare particolari quando vuole rafforzare una diversa idea di continuità. Le date sono necessarie, perché un’immagine storica di un logo può essere scambiata facilmente per la versione attuale. Il disegno del 2023 è documentato dalla @fig-tipo-316a @t06-burberry2023.#sito([Burberry, nuova identità sotto la direzione di _Daniel Lee_, 6 febbraio 2023.], "https://www.burberryplc.com/news/brand/2023/introducing-the-first-creative-expression-of-burberry-under-dani")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/interfacce/burberry-wordmark-2023.svg"),
  [Burberry: wordmark dell’identità 2023, dalla copertina dell’_Annual Report 2022/23_. Dettaglio originale.], diritti: [© Burberry.],
  alt: "Burberry: wordmark dell’identità 2023, dalla copertina dell’Annual Report 2022/23. Dettaglio originale.",

) <fig-tipo-316a>

Il progetto richiede di decidere quali differenze debbano restare attive. Possiamo osservare il terminale di una r, il rapporto fra due lettere, una curva o la spaziatura del nome prima di giudicare l’insieme. Se il cambiamento elimina proprio il dettaglio che rendeva riconoscibile una parola, la pulizia formale può avere un costo. Se conserva un’anomalia efficace e corregge difetti di riproduzione, la riduzione può invece rendere più preciso il segno. Sono ipotesi da controllare sulla specifica applicazione, senza elevare una moda di settore a legge tipografica.
]
#[
// I manifesti conservano il disegno originale, con prosa e apparati nativi.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto
#import "../template/documenti.typ": dettaglio
#import "../template/doppia-pagina.typ": sagoma-pagina

=== Lettere disegnate per il manifesto

Nei manifesti italiani fra Otto e Novecento la parola può partecipare all’immagine attraverso un disegno specifico. Non è sempre utile cercare il nome di un font: il cartellonista può costruire le lettere per quell’opera, adattando il titolo e le indicazioni alla propria lingua figurativa. Osservare il documento permette di distinguere questa *scrittura progettata* da una composizione realizzata con un carattere riutilizzabile.

Nel manifesto _La Bohème_ del cartellonista _Adolf Hohenstein_, del 1895–1896 secondo la scheda della Morgan Library, il titolo possiede un andamento che appartiene all’opera. Le curve, l’ampiezza e la forma delle lettere vanno esaminate insieme, senza attribuire automaticamente la parola a un font contemporaneo dall’aspetto Liberty. In _Fisso l’idea_ del grafico _Marcello Dudovich_ la scritta prende un’altra presenza, più compatta e incisiva. Il catalogo delle Raccolte Bertarelli consente di identificare l’autore e il documento: la comparazione riguarda due modi concreti di dare una figura al titolo (@fig-tipo-317a e @fig-tipo-317b) @t06-boheme.#sito([The Morgan Library & Museum, La Bohème, _Adolf Hohenstein_, 1895–1896.], "https://www.themorgan.org/music-manuscripts-and-printed-music/284731") @t06-dudovich.#sito([Lombardia Beni Culturali, Fisso l’idea, _Marcello Dudovich_; scheda H0110-02150.], "https://www.lombardiabeniculturali.it/stampe/schede/H0110-02150/")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/dudovich-fisso-l-idea.jpg"),
  [_Fisso l’idea_: titolo e testo condensato.], diritti: [Marcello Dudovich; Civica Raccolta delle Stampe Achille Bertarelli.],
  alt: "Fisso l’idea: titolo e testo condensato.",

) <fig-tipo-317a>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/hohenstein-la-boheme-1895-1896.jpg"),
  [_La Bohème_, 1895–1896: altezze diverse nel titolo.], diritti: [Adolf Hohenstein; Officine Grafiche Ricordi.],
  alt: "La Bohème, 1895–1896: altezze diverse nel titolo.",

) <fig-tipo-317b>
],
  )
]

Nel _Campari_ della @fig-tipo-318, _Depero_ accosta la C incisa da un taglio triangolare alle A prive di traversa: curve e punte dialogano con la figura geometrica. L’identità del carattere dipende dal disegno e dal comportamento dei segni, non soltanto dalla loro dimensione. Le lettere possono sembrare meccaniche o dinamiche perché le osserviamo dentro una cultura figurativa e dentro l’opera specifica, non perché un angolo retto contenga per natura un’emozione @t06-depero-campari.#sito([Archivio Depero, Depero e Campari, 2019.], "https://depero.it/2019/10/30/depero-e-campari-2/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/depero-campari-1928.jpg"),
  [_Campari_, 1928: curve e angoli netti nel nome.], diritti: [Fortunato Depero; Archivio Depero / Campari.],
  alt: "Campari, 1928: curve e angoli netti nel nome.",

) <fig-tipo-318>

I tre esempi suggeriscono di guardare il passaggio dal *repertorio alla parola*. Un titolo breve consente interventi che sarebbero faticosi nel testo continuo; la modifica può arrivare fino a rendere una lettera parte della scena. Rimane però una *soglia di riconoscimento*: chi guarda deve poter ricostruire la parola oppure deve essere messo intenzionalmente nella condizione di scoprirla. Quando riprendiamo queste strategie in un progetto nuovo, dobbiamo chiarire se stiamo disegnando un lettering, usando un font display o trasformando un titolo in immagine. Sono *operazioni differenti*, anche quando il risultato sembra simile.



// L'annuncio originale ha uno sfondo trasparente. Lo stesso algoritmo alpha
// compone un corpo unico nelle due colonne del foglio; il seguito può continuare.
// cite() conserva autore–anno e link nativi, permettendo l'a capo nella sagoma.
#sagoma-pagina(
  id: "fig-tipo-319c",
  file: path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/olivetti-lettera-32-annuncio.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/olivetti-lettera-32-annuncio.json")),
  larghezza: 240pt,
  // Il primo pixel visibile tocca il bordo sinistro del foglio; l'originale
  // conserva tutto il marchio e il margine trasparente fuori pagina.
  al-vivo-sinistro: true,
  partenza: "even",
  fondo-immagine: 15mm + 240pt * 425 / 611,
  didascalia: [Olivetti Lettera 32: il nome compatto del modello si distingue dal marchio Olivetti e dalle due righe che lo accompagnano.
    #v(4pt)#testo-diritti[Olivetti; Associazione Archivio Storico Olivetti.]],
  alt: "Annuncio Olivetti Lettera 32: cerniera aperta, macchina e nome del modello, su fondo trasparente.",
)[
=== Olivetti e Barilla: marchio e messaggio

La comunicazione Olivetti offre molti esempi in cui le lettere assumono una presenza autonoma. Nel lavoro del grafico _Giovanni Pintori_ possono diventare segni, aggregazioni e figure, mantenendo un rapporto con il prodotto che produce o elabora scrittura. Il testo dell’annuncio e il nome Olivetti non devono necessariamente assumere lo stesso aspetto. Un modello di macchina, uno slogan e una firma richiedono *rapporti diversi fra parola e riconoscimento* #cite(<t06-olivetti22>).#sito([Associazione Archivio Storico Olivetti, Lettera 22: progetto e pubblicità.], "https://www.archiviostoricolivetti.it/museo-digitale/lettera-22/")

L’Archivio Storico Olivetti documenta manifesti per la Lettera 22 e altri progetti di _Pintori_. Nel confronto tipografico conviene seguire il disegno del nome del prodotto, le differenze di cassa e l’eventuale passaggio fra serif e sans serif, evitando di ridurre l’analisi alla posizione dei testi. Ci interessa come le lettere rendano diversi i registri del messaggio e come il nome della marca resti riconoscibile attraverso applicazioni differenti (@fig-tipo-319c, @fig-tipo-319a e @fig-tipo-319b) #cite(<t06-olivetti-portatili>).#sito([Associazione Archivio Storico Olivetti, Dalla MP1 alla Valentine, passando per la Lettera 22 e 32.], "https://www.storiaolivetti.it/articolo/55-dalla-mp1-alla-valentine-passando-per-la-letter/")


]



#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/pintori-olivetti-lettera-22-piramide-lettere-nome-corsivo.jpg"),
  [Olivetti Lettera 22: piramide di lettere e nome del modello in corsivo.], diritti: [Giovanni Pintori; Associazione Archivio Storico Olivetti.],
  alt: "Olivetti Lettera 22: macchina verde, piramide di lettere e nome del modello in corsivo.",

) <fig-tipo-319a>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/pintori-olivetti-lettera-22-onde-colorate-nome-tondo.jpg"),
  [Olivetti Lettera 22: onde colorate e nome del modello in tondo pesante.], diritti: [Giovanni Pintori; Associazione Archivio Storico Olivetti.],
  alt: "Olivetti Lettera 22: onde colorate, macchina di profilo e nome del modello in tondo pesante.",

) <fig-tipo-319b>
],
  )
]

Nel lavoro del grafico e architetto _Erberto Carboni_ per Barilla, documentato dall’archivio aziendale, la continuità coinvolge anche il lettering. La scritta del marchio mantiene una forma definita, mentre lo slogan può assumere un’altra inclinazione, un altro ritmo e un altro tratto. Il manifesto del 1952 (@fig-tipo-320a) «Con pasta Barilla è sempre domenica» permette di confrontare due scritture senza confonderle: quella che identifica il prodotto e quella che formula la promessa dell’annuncio @t06-gonizzi2000.#sito([_Giancarlo Gonizzi_ (a cura di), Pasta on Exhibition, Archivio Storico Barilla, 2000.], "https://www.archiviostoricobarilla.com/wp-content/uploads/2019/04/Pasta_on_Exhibition.pdf")

// La lettura dei manifesti Barilla riprende nel flusso ordinario.
Il corsivo non è una sola categoria espressiva. Può indicare un gesto rapido, ricordare una firma, rendere più continua una parola o costruire un richiamo a una scrittura quotidiana. Nel secondo manifesto Barilla (@fig-tipo-320b), «vera pasta all’uovo» è in tondo e «con cinque uova per chilogrammo» in corsivo. Il confronto con Olivetti suggerisce una distinzione: *l’unità dell’identità* non richiede che ogni frase abbia il medesimo disegno. Richiede che la *variazione sia intenzionale* e che il ruolo di ciascuna scrittura rimanga comprensibile @t06-salce-barilla.#sito([Museo nazionale Collezione Salce, inventario12826, Barilla vera pasta all’uovo.], "https://catalogo.beniculturali.it/detail/HistoricOrArtisticProperty/0500670436")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#figure([
      #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/carboni-barilla-sempre-domenica-1952.jpg"), width: 187.09pt,
        alt: "Con pasta Barilla è sempre domenica: annuncio completo del1952.")
      #v(10pt)
      #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/carboni-barilla-sempre-domenica-1952.jpg"),
        width: 187.09pt, height: 87.309pt, originale-width: 532.487pt, originale-height: 160.706pt,
        dx: -328.13pt, dy: -71.96pt, alt: "Barilla: ingrandimento del nome nello stesso annuncio.")
      #v(10pt)
      #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/carboni-barilla-sempre-domenica-1952.jpg"),
        width: 187.09pt, height: 54.019pt, originale-width: 292.493pt, originale-height: 88.275pt,
        dx: 0pt, dy: 0pt, alt: "Dettaglio dello slogan nello stesso annuncio Barilla.")
    ], kind: image, caption: [_Con pasta Barilla è sempre domenica_, 1952: annuncio e ingrandimenti del marchio e dello slogan.
      #v(4pt)#testo-diritti[Erberto Carboni; Archivio Storico Barilla.]
    ]) <fig-tipo-320a>],
    [#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/manifesti/carboni-barilla-pasta-all-uovo-1952-1953.png"),
  [_Barilla vera pasta all’uovo_, circa 1952–1953: nome calligrafico, frase in tondo e slogan in corsivo.], diritti: [Erberto Carboni; Museo nazionale Collezione Salce, inventario12826.],
  alt: "Barilla vera pasta all’uovo, circa 1952–1953: nome calligrafico, frase in tondo e slogan in corsivo.",

) <fig-tipo-320b>
],
  )
]
]
#[
// La musica: copertine, documenti e dimostrazione temporale restano distinti.
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto
#import "../template/editoriale.typ": nota-compatta

=== La tipografia nelle copertine Blue Note

Una copertina musicale può affidare alla tipografia un compito che supera l’identificazione dell’artista. Le lettere possono costruire una figura, scandire una sequenza o creare un contrasto con la fotografia. Il lavoro del grafico _Reid Miles_ per Blue Note è utile perché permette di confrontare soluzioni diverse di uno stesso progettista, evitando di trasformare un singolo stile in una formula per rappresentare tutto il jazz. In _The Sidewinder_ del trombettista _Lee Morgan_, pubblicato nel 1964 @t06-sidewinder2020#nota-compatta([Blue Note Records, The Sidewinder (2020); attribuzioni di _Reid Miles_ e _Francis Wolff_ (2019).], ("https://www.bluenote.com/spotlight/lee-morgan-the-sidewinder/", "https://www.bluenote.com/blue-note-wall-art/")), la fotografia di _Francis Wolff_ e la tipografia hanno presenze distinte. Il nome e il titolo si leggono come parti di un insieme calibrato: corpi, peso e spazio danno alla scritta un ritmo proprio. In _Unity_ dell’organista _Larry Young_ la parola ingrandita diventa invece una *figura dominante, spezzata su due righe*. La copertina conservata al MoMA è datata 1966 @t06-unity#sito([The Museum of Modern Art, _Reid Miles_, copertina Unity, 1966; oggetto828.2014.], "https://www.moma.org/collection/works/185423"); questa data non va confusa con quella della registrazione del disco (@fig-tipo-321a e @fig-tipo-321b).

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/musica/reid-miles-lee-morgan-sidewinder-1964.jpg"),
  [_Lee Morgan_, _The Sidewinder_, 1964.], diritti: [Design Reid Miles; fotografia Francis Wolff; Blue Note Records.],
  alt: "Lee Morgan, The Sidewinder, 1964.",

) <fig-tipo-321a>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/musica/reid-miles-larry-young-unity-1966.jpg"),
  [_Larry Young_, _Unity_, copertina del1966.], diritti: [Reid Miles; Blue Note Records; MoMA, oggetto828.2014.],
  alt: "Larry Young, Unity, copertina del1966.",

) <fig-tipo-321b>
],
  )
]

Il confronto mostra come il carattere possa partecipare alla percezione di un ritmo senza imitare letteralmente un suono. La ripetizione delle aste, l’alternanza di pieni e vuoti e il contrasto fra scale invitano a un’analogia, ma non dimostrano che ogni ascoltatore veda la stessa qualità musicale.

I crediti permettono di *separare il musicista dal progettista*: _Lee Morgan_ e _Larry Young_ sono gli interpreti, _Reid Miles_ firma le copertine e _Francis Wolff_ la fotografia di _The Sidewinder_. Questa precisione restituisce al progetto la propria natura collaborativa. Per ricavare una lezione dalle copertine non serve copiare il font: possiamo studiare come *una parola cambia funzione* quando aumenta di scala, viene interrotta o si accosta a un’immagine, mantenendo i dettagli che ne permettono il riconoscimento.

=== Tipografia, generi musicali e ritmo

Le associazioni fra forme tipografiche e generi musicali nascono dall’incontro ripetuto con dischi, riviste, concerti e immagini. Una scrittura gotica può ricordare alcune scene metal; un tag può richiamare il graffiti writing e una parte della cultura hip hop; un carattere a matrice può suggerire un ambiente elettronico. Sono *riferimenti storici e situati*. Ogni genere contiene molte pratiche e nessuna di queste forme gli appartiene in modo esclusivo.

Nel progettare una copertina possiamo riprendere una convenzione per rendere subito riconoscibile un contesto oppure introdurre un contrasto. Il contrasto funziona quando diventa *una scelta leggibile*: una voce apparentemente delicata può accompagnare un suono aggressivo, una scrittura irregolare può comparire in un progetto essenziale. Per analizzarlo dobbiamo nominare i segni, la loro struttura e la relazione con il titolo, senza attribuire alla forma un’emozione obbligatoria.

Il grafico _David Carson_, nel lavoro editoriale per _Ray Gun_, porta questa possibilità verso una tipografia che può essere spezzata, sovrapposta o trattata come materia. Le opere del suo archivio permettono di vedere che la leggibilità può entrare intenzionalmente in tensione con la figura. Non ne deriva che una parola difficile da decifrare sia più espressiva: il valore dipende da ciò che il documento chiede al lettore e dal ruolo di quel testo. La copertina della @fig-tipo-322a documenta la testata di _Ray Gun_ @t06-carson.#sito([David Carson Design, archivio Ray Gun.], "https://www.davidcarsondesign.com/t/tag/raygun/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/musica/carson-ray-gun-22-keith-richards-1994-1995.jpg"),
  [_Ray Gun_ n.22, dicembre1994–gennaio1995: la testata spaziata sopra il ritratto del musicista _Keith Richards_.], diritti: [Design David Carson; fotografia Alan Messer.],
  alt: "Ray Gun n.22, dicembre1994–gennaio1995: la testata spaziata sopra il ritratto di Keith Richards.",

) <fig-tipo-322a>

Nei lyric video la parola aggiunge *il tempo alle proprie dimensioni*: comparsa, durata, pausa e movimento possono mettere in rilievo una sillaba o una ripetizione. Nei materiali di un festival il medesimo problema cambia ancora: il nome dell’evento può essere sperimentale, mentre i nomi degli artisti devono essere verificati sulle loro lunghezze reali. Lo schema (@fig-tipo-322) mostra tre momenti successivi dello stesso schermo: appare «Una voce» per un secondo, poi «poi una pausa» per un secondo e infine «poi ancora» per un secondo. Le tre scritte si sostituiscono, anziché comparire insieme. La scansione è regolare: la parola «pausa» è parte del testo visibile, non un intervallo vuoto. Per introdurre una pausa effettiva occorrerebbe aggiungere un momento senza parole; per cambiare ritmo si potrebbero variare le durate. Il ritmo tipografico si studia attraverso *operazioni dichiarate*, non con un elenco di caratteri «adatti alla musica».

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/musica/ritmo-tipografico-tre-intervalli.svg"),
  [Tre stati dello stesso schermo in ordine cronologico: ogni scritta appare da sola per un secondo, poi viene sostituita dalla successiva. I tempi sono esemplificativi; non è mostrato un intervallo vuoto.], diritti: [Contorni autentici Helvetica.],
  alt: "Tre momenti successivi dello stesso schermo: Una voce da 0 a 1 secondo; poi una pausa da 1 a 2; poi ancora da 2 a 3. Una sola scritta è visibile per volta.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-322>

=== _Jamie Reid_ e _Persona 5_: lettere a ritagli

Nella copertina di _Never Mind the Bollocks, Here’s the Sex Pistols_ del 1977, il grafico britannico _Jamie Reid_ mette in relazione lettere di provenienza e presenza differenti. Il titolo compatto e la scritta del gruppo non parlano con la stessa regolarità. Le lettere eterogenee, i tagli e le inclinazioni fanno percepire l’atto materiale del montaggio: una parola può conservare la propria leggibilità anche quando i segni *non appartengono a una sola famiglia* (@fig-tipo-323) @t06-reid-cover.#sito([The Museum of Modern Art, _Jamie Reid_, copertina Never Mind the Bollocks, 1977; oggetto832.2014.], "https://www.moma.org/collection/works/185434")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/musica/jamie-reid-never-mind-bollocks-1977.jpg"),
  [_Never Mind the Bollocks, Here’s the Sex Pistols_, 1977. Il nome del gruppo è costruito con lettere eterogenee.], diritti: [Jamie Reid / Virgin Records; MoMA, oggetto832.2014. © Jamie Reid, Courtesy John Marchant Gallery, UK.],
  alt: "Never Mind the Bollocks, Here’s the Sex Pistols, 1977. Il nome del gruppo è costruito con lettere eterogenee.",

) <fig-tipo-323>

L’archivio di _Reid_ collega questo linguaggio al lavoro cut-up sviluppato per Suburban Press. La somiglianza con una richiesta di riscatto è una convenzione grafica riconoscibile, ma non esaurisce il senso dell’opera né descrive tutte le culture punk. Il documento specifico deve rimanere il punto di partenza: nome, titolo, contrasti e irregolarità sono decisioni osservabili, mentre la loro lettura dipende anche dalla storia del gruppo e della scena @t06-reid-archive.#nota-compatta([John Marchant Gallery, The Jamie Reid Archive e profilo di _Jamie Reid_.], ("https://jmgal3.squarespace.com/jra", "https://johnmarchantgallery.com/artists/jamie-reid-blurb-page"))

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/musica/jamie-reid-last-days-suburban-press-1972.png"),
  [_Jamie Reid_, _Last Days_, 1972: adesivo Suburban Press.], diritti: [Jamie Reid Archive / John Marchant Gallery.],
  alt: "Jamie Reid, Last Days, 1972: adesivo Suburban Press.",

) <fig-tipo-323d>

_Persona 5_ riprende, nella @fig-tipo-324, un linguaggio a ritagli in alcune scritte, nelle lettere di sfida e in parti dell’identità visiva. Il confronto con il documento conservato del gioco permette di vedere come lettere difformi vengano ricondotte a parole riconoscibili. È un’affinità formale pertinente; non basta però a provare una derivazione diretta da una specifica copertina di _Reid_, né a identificare un unico font per tutti i menu. Un videogioco può combinare font commerciali, segni personalizzati e immagini di lettering @t06-persona.#sito([ATLUS, Persona5 Royal: sito ufficiale.], "https://persona.atlus.com/p5r/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/videogiochi/persona-5-menu-lettere-ritagli.png"),
  [_Persona 5_: lettere di misura e inclinazione diverse nel menu.], diritti: [ATLUS / SEGA.],
  alt: "Persona5: lettere di misura e inclinazione diverse nel menu.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-324>

*Irregolarità controllata* significa variare le forme senza ostacolare la lettura. In _Last Days_ (@fig-tipo-323d) i blocchi sono inclinati, ma LAST DAYS e CLOSING DOWN SALE restano riconoscibili. Nel menu di _Persona 5_ (@fig-tipo-324), Skill, Item ed Equip hanno lettere di misure diverse: ordine, spazi e contrasto separano i comandi. Le forme variano, la lettura non è affidata al caso. Per una traduzione ipotetica, una parola più lunga o con un accento richiederebbe nuovi controlli di ingombro e riconoscibilità, non la copia del disegno inglese.
]
#[
// Cinema e videogiochi: i fotogrammi conservano la propria versione e funzione.
#import "../template/stile.typ": immagine, sito
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/campioni.typ": confronto, dettaglio-figura
#import "../template/documenti.typ": dettaglio, tavola-documentaria

=== La tipografia nel cinema e nelle serie

Nel cinema il carattere può essere incontrato prima che inizi la storia e può contribuire a prepararne il registro. I titoli di testa assegnano alla scrittura un tempo, una comparsa e una trasformazione. La lettera non occupa soltanto uno spazio: attraversa il campo, si ricompone oppure scompare. Il confronto va quindi condotto sulla sequenza e non esclusivamente su un fotogramma isolato.

Prima dei titoli di testa, locandine e materiali promozionali assegnano al film una voce tipografica. *Trajan*, disegnato da _Carol Twombly_ per Adobe nel 1989, riprende le capitali dell’iscrizione alla base della Colonna Traiana a Roma. La Brown University Library ne documenta l’impiego nella promozione cinematografica e mette a confronto le lettere dell’iscrizione con il carattere digitale @t06-trajan2012.#nota-compatta([_btylr_ (2012), Brown University Library; Adobe Fonts, Trajan.], ("https://library.brown.edu/dps/curio/from-caesar-monuments-to-movie-posters/", "https://fonts.adobe.com/fonts/trajan")) Il campione della @fig-tipo-trajan mostra la successiva famiglia *Trajan Pro 3*: osserviamo le proporzioni delle maiuscole, le grazie e la variazione dei pesi. La stessa origine lapidaria può entrare nella comunicazione di racconti e ambientazioni differenti; il suo significato dipende anche dalle immagini e dalle parole che la accompagnano.

// Campione autentico pubblicato da Adobe: la versione Pro 3 resta distinta
// dal primo Trajan del 1989 e dai documenti cinematografici storici.
#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/cinema/trajan-pro-3-sei-pesi-specimen-adobe.jpeg"),
  [Trajan Pro 3: sei pesi, da ExtraLight a Black, nello specimen ufficiale Adobe. Le linee a destra rendono visibile il diverso spessore.],
  diritti: [Carol Twombly e Robert Slimbach / Adobe Originals. Campione Adobe Fonts.],
  alt: "Trajan Pro 3: i nomi ExtraLight, Light, Regular, Semibold, Bold e Black composti nei sei pesi, con linee di diverso spessore a destra.",
) <fig-tipo-trajan>

Il lavoro del grafico _Saul Bass_ per il regista _Alfred Hitchcock_ mostra come progettare il movimento dei titoli. In _North by Northwest_ del 1959 i blocchi di testo si muovono secondo direzioni riconoscibili e si confrontano con le linee dell’immagine (@fig-tipo-325a e @fig-tipo-325b); in _Psycho_ del 1960 (@fig-tipo-324a) la frammentazione e la ricomposizione delle parole producono una tensione visiva @t06-bass-psycho.#sito([Alliance Graphique Internationale, _Saul Bass_, _Psycho_,1960.], "https://a-g-i.org/design/psycho") Qui interessa il *comportamento della scrittura*, senza attribuire al solo nome del font l’effetto dell’intera sequenza. La collezione dell’Academy conserva materiali che documentano il lavoro di _Bass_ e dei suoi collaboratori.  @t06-bass-academy.#sito([Academy Film Archive, Saul Bass Collection.], "https://www.oscars.org/film-archive/collections/saul-bass-collection") @t06-bass-north.#sito([Alliance Graphique Internationale, _Saul Bass_, _North by Northwest_,1959.], "https://a-g-i.org/design/north-by-northwest")

#confronto[
  #figure([
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/cinema/saul-bass-psycho-sequenza-1960.jpg"),
        width: 187.09pt, height: 48pt, originale-width: 1573.68pt, originale-height: 891.12pt,
        dx: -167.15pt, dy: -419.19pt, alt: "PSYCHO: titolo integro in un fotogramma originale della sequenza."),
      dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/cinema/saul-bass-psycho-sequenza-1960.jpg"),
        width: 187.09pt, height: 48pt, originale-width: 1573.68pt, originale-height: 891.12pt,
        dx: -690.92pt, dy: -419.19pt, alt: "PSYCHO: lo stesso titolo frammentato in un altro fotogramma originale."),
    )
  ], kind: image, caption: [_Psycho_,1960: il titolo integro e frammentato. Dettagli dai fotogrammi AGI.
    #v(4pt)#testo-diritti[Titoli Saul Bass; regia Alfred Hitchcock. Riproduzione: Alliance Graphique Internationale.]
  ]) <fig-tipo-324a>
]



#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/cinema/saul-bass-north-by-northwest-titolo-1959.jpg"),
  [_North by Northwest_,1959: fotogramma con titolo e linee diagonali.], diritti: [Saul Bass; Metro-Goldwyn-Mayer; archivio Alliance Graphique Internationale.],
  alt: "North by Northwest,1959: fotogramma con titolo e linee diagonali.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-325a>

// Tavola autonoma440: i due documenti restano insieme su un foglio ordinario.
#tavola-documentaria[
#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/cinema/saul-bass-north-by-northwest-nove-fotogrammi-1959.jpg"),
  [_North by Northwest_,1959: nove fotogrammi, dalle linee ai titoli alla scena urbana.], diritti: [Saul Bass; Metro-Goldwyn-Mayer; archivio Alliance Graphique Internationale.],
  alt: "North by Northwest,1959: nove fotogrammi, dalle linee ai titoli alla scena urbana.",

) <fig-tipo-325b>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/cinema/imaginary-forces-stranger-things-titolo.jpg"),
  [_Stranger Things_: il titolo a contorno rosso nella sequenza d’apertura.], diritti: [Imaginary Forces per Netflix; direzione creativa Michelle Dougherty.],
  alt: "Stranger Things: il titolo a contorno rosso nella sequenza d’apertura.",

) <fig-tipo-326>

]

_Stranger Things_ introduce, nella @fig-tipo-326, un’altra relazione fra carattere e memoria culturale. La sequenza di Imaginary Forces usa il trattamento delle lettere e l’aspetto delle titolazioni ottiche per richiamare un ambiente visivo precedente.  La base tipografica, ITC Benguiat, è parte della soluzione; contorni, incastri e movimento ne fanno un titolo specifico.  Digitare lo stesso nome nel font commerciale non ricostruisce automaticamente l’opera. Il progetto si comprende osservando come le lettere vengano mostrate prima nei dettagli e poi riconosciute come insieme @t06-stranger.#sito([Imaginary Forces, _Stranger Things_: titoli e crediti.], "https://beta.imaginaryforces.com/project/stranger-things") @t06-stranger-commarts.#sito([Imaginary Forces, “_Stranger Things_” titles: dichiarazione dei progettisti e caratteri, Communication Arts.], "https://www.commarts.com/project/24604/stranger-things-titles")

#dettaglio-figura(titolo: [ITC Benguiat nel titolo], riferimento: <fig-tipo-326>,
  didascalia: [Il trattamento del titolo nella sequenza _Stranger Things_; stesso fotogramma della tavola documentaria. Imaginary Forces / Netflix.],
)[
  #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/cinema/imaginary-forces-stranger-things-titolo.jpg"), width: 187.09pt,
    alt: "Titolo Stranger Things a contorno rosso, nel fotogramma originale Imaginary Forces.")
]

// La lettura conclusiva segue i due documenti, poi il discorso prosegue.
Le scritte presenti nel mondo narrativo del film svolgono invece un altro ruolo. Insegne, lettere e documenti possono indicare un’epoca o un ambiente: sono *tipografia diegetica*. Una forma incompatibile con il periodo può incrinare la credibilità, mentre una scrittura coerente può sostenere la scena senza attirare un’attenzione esplicita. Titoli e scritte di scena richiedono dunque domande differenti: i primi possono anticipare un racconto, le seconde devono appartenere al suo mondo. In entrambi i casi la precisione tipografica significa verificare il *documento, il trattamento e la funzione* delle parole.

=== La tipografia nei videogiochi

Un titolo spettacolare non è necessariamente un buon carattere per una frase lunga. Nei testi da leggere durante un’azione contano *durata, dimensione, lingua* e differenza fra segni simili. Il caso dei giochi rende quindi visibile una separazione produttiva: una voce può essere molto caratterizzata nel nome e più regolare dove occorre leggere parole nuove. Il compito del progettista è conservare una parentela riconoscibile *senza trasferire nei testi continui* ogni effetto del lettering promozionale. I titoli delle @fig-tipo-327a e @fig-tipo-327b mostrano due trattamenti del nome @t06-lastofus.#sito([PlayStation, _The Last of Us Part I_: sito ufficiale.], "https://www.playstation.com/en-us/games/the-last-of-us-part-i/") @t06-ratchet.#sito([PlayStation, _Ratchet & Clank: Rift Apart_: sito ufficiale.], "https://www.playstation.com/en-us/games/ratchet-and-clank-rift-apart/")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/videogiochi/last-of-us-part-i-logo.jpg"),
  [_The Last of Us Part I_: maiuscole strette e pesanti.], diritti: [Naughty Dog / Sony Interactive Entertainment.],
  alt: "The Last of Us Part I: maiuscole strette e pesanti.",

) <fig-tipo-327a>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/videogiochi/ratchet-clank-rift-apart-logo.png"),
  [_Ratchet & Clank: Rift Apart_: contorni e rilievi.], diritti: [Insomniac Games / Sony Interactive Entertainment.],
  alt: "Ratchet & Clank: Rift Apart: contorni e rilievi.",

) <fig-tipo-327b>
],
  )
]

La @fig-tipo-327c mostra un terzo trattamento: nel titolo promozionale di _Horizon Zero Dawn_ alcune aste si prolungano oltre l’altezza ordinaria delle lettere.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/videogiochi/horizon-zero-dawn-titolo.png"),
  [_Horizon Zero Dawn_: aste prolungate nel titolo promozionale.],
  diritti: [Guerrilla Games / Sony Interactive Entertainment.],
  alt: "Horizon Zero Dawn: titolo promozionale originale con aste prolungate.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-327c>

I tre nomi mostrano come la tipografia possa contribuire all’identità di un gioco senza svolgere ancora il compito di un’interfaccia. In _The Last of Us Part I_ le maiuscole strette e compatte costruiscono una massa rettangolare; in _Ratchet & Clank: Rift Apart_ contorni e rilievi fanno apparire le lettere come oggetti; in _Horizon Zero Dawn_ le aste prolungate modificano il profilo del nome. Sono trattamenti da osservare nelle immagini promozionali, non modelli da trasferire automaticamente a istruzioni, dialoghi o inventari.

Nel gioco, invece, la stessa informazione deve poter essere letta mentre cambiano la scena e l’attenzione del giocatore. _The Last of Us Part I_ offre un caso documentato: si possono ingrandire gli elementi informativi sullo schermo e regolarne il fondo e il colore. Per i sottotitoli sono disponibili tre dimensioni, un fondo scuro e l’indicazione di chi parla. Il carattere del titolo promozionale e queste regolazioni rispondono quindi a problemi diversi @t06-mcallister2022.#sito([_Gillen McAllister_, The Last of Us Part I: Full list of accessibility features, PlayStation.Blog, 26 agosto 2022; sezioni Magnification and Visual Aids e Subtitles.], "https://blog.playstation.com/2022/08/26/the-last-of-us-part-i-full-list-of-accessibility-features/")

Il menu di _Persona 5_ (@fig-tipo-324) permette di osservare un’altra soluzione: le lettere a ritagli partecipano all’identità del gioco, mentre posizione, spazi e contrasto distinguono i comandi. Il confronto invita a separare *riconoscibilità del nome e lettura delle informazioni*. Un segno efficace nella promozione può richiedere una voce diversa nel testo continuo; una scrittura espressiva può funzionare anche in un menu, se le singole azioni restano distinguibili. La verifica riguarda sempre le parole effettive, la loro dimensione e la situazione in cui vengono lette.

Non serve affermare che un font sia per adulti e un altro per bambini: l’età del pubblico non si ricava da una grazia o da un angolo arrotondato, e la *funzione del testo* cambia fra marchio, istruzione e dialogo.
]
#[
// Opere originali: nessuna ricostruzione dei lettering con font sostitutivi.
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto

=== La parola come immagine

Nel calligramma la parola non è soltanto una sequenza da leggere: può descrivere una forma attraverso la disposizione dei suoi segni. Questa tradizione incontra il lettering contemporaneo quando il disegno viene modificato per rendere visibile un significato. Occorre distinguere l’intervento sulle singole lettere dall’andamento di un intero testo. In entrambi i casi il lettore è invitato ad alternare *riconoscimento verbale* e osservazione dell’immagine.

Il designer _Ji Lee_ pone in _Word as Image_ un vincolo preciso: rappresentare il significato usando gli elementi grafici delle lettere della parola, *senza aggiungere parti esterne*. Il limite spinge a cercare nella struttura del segno una possibilità figurativa. Un cambiamento di posizione, una sottrazione o un rapporto fra pieni e vuoti possono bastare. L’efficacia deriva dalla precisione dell’idea e dal fatto che *la parola resti ricostruibile*, non dalla quantità di effetti applicati (@fig-tipo-328a, @fig-tipo-328b e @fig-tipo-328c) @t06-ji-lee.#sito([_Ji Lee_, Word as Image: progetto e vincolo sulle lettere.], "https://pleaseenjoy.com/word-as-image")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/parola-immagine/ji-lee-clock.jpg"),
  [_Clock_: la parola diventa un quadrante.], diritti: [Ji Lee, Word as Image.],
  alt: "Clock: la parola diventa un quadrante.",
) <fig-tipo-328a>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/parola-immagine/ji-lee-elevator.jpg"),
  [_Elevator_: V e A formano due frecce opposte.], diritti: [Ji Lee, Word as Image.],
  alt: "Elevator: V e A formano due frecce opposte.",
) <fig-tipo-328b>
],
  )
]

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/parola-immagine/ji-lee-gravity.png"),
  [_Gravity_: lettere inclinate e accumulate in basso.], diritti: [Ji Lee, Word as Image.],
  alt: "Gravity: lettere inclinate e accumulate in basso.", width: 300pt, placement: top, scope: "parent",
) <fig-tipo-328c>

Il confronto con l’artista e grafico d’avanguardia _El Lissitzky_ nella @fig-tipo-329 rende evidente un’altra possibilità: una lettera può assumere una presenza monumentale e partecipare a un’immagine tipografica senza illustrare letteralmente il significato di una singola parola. Nei documenti storici è necessario distinguere il titolo dell’opera, la lingua e il progetto: non ogni composizione costruttivista è un calligramma. L’analisi delle lettere può riconoscere scala, rotazione e rapporto fra forme senza trasformare l’esempio in una lezione generale di composizione @t06-wendingen.#sito([National Gallery of Art, _El Lissitzky_, Wendingen, 1921 (pubblicato 1923), 1995.77.4.], "https://www.nga.gov/artworks/93943-wendingen")

#immagine(path("/risorse-condivise/immagini/figure/storia-del-design/el-lissitzky-wendingen-copertina-1921-1923.jpg"),
  [_Wendingen_, 1921 (pubblicato 1923): lettera ingrandita e titolo obliquo.], diritti: [El Lissitzky; National Gallery of Art, Washington, 1995.77.4. Immagine di pubblico dominio.],
  alt: "Wendingen, 1921 (pubblicato 1923): lettera ingrandita e titolo obliquo.", width: 137mm, placement: top, scope: "parent",
) <fig-tipo-329>

Un esercizio può partire da «PIOGGIA», «ONDA» e «PORTA», collegando disegno e significato. La prima può suggerire una caduta attraverso una sequenza verticale, la seconda una variazione di livello, la terza un’apertura nella parola. Sono proposte didattiche, distinte dalle opere di _Ji Lee_. Separare il riferimento dalla propria prova conserva la correttezza delle attribuzioni. Queste operazioni funzionano soprattutto nei messaggi brevi: prima di estenderle a molte righe dobbiamo verificare quale fatica richiedano per ricostruire le parole.

=== La prospettiva tipografica di _Apeloig_

Nel manifesto _Chicago, naissance d’une métropole_ del 1987, il grafico francese _Philippe Apeloig_ mette la parola in relazione con la profondità della fotografia. Le lettere non si limitano a sovrapporsi a un’immagine: la loro deformazione prospettica partecipa alla rappresentazione dello spazio. Il titolo sembra entrare nella scena, facendo dell’atto di leggere un percorso fra distanze diverse (@fig-tipo-330) @t06-apeloig-chicago.#sito([SFMOMA, _Philippe Apeloig_, Chicago exhibition poster, 1987, 2016.289.], "https://www.sfmoma.org/artwork/2016.289/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/parola-immagine/philippe-apeloig-chicago-1987.jpg"),
  [_Chicago_, 1987: il titolo entra nella profondità della fotografia.], diritti: [Philippe Apeloig; SFMOMA, 2016.289. © Philippe Apeloig / Artists Rights Society (ARS), New York.],
  alt: "Chicago, 1987: il titolo entra nella profondità della fotografia.",
) <fig-tipo-330>

_Apeloig_ descrive questo lavoro come una delle prime esperienze in cui il computer gli permise di esplorare una dimensione architettonica del testo. Il documento consente di osservare un uso intenzionale della *trasformazione geometrica*. È diverso dal comprimere un carattere per farlo rientrare in una riga: qui la deformazione è parte esplicita dell’idea figurativa e cambia la posizione apparente delle parole. Il titolo mantiene gli indizi necessari alla lettura mentre mostra la propria condizione d’immagine @t06-apeloig-interview.#sito([_Philippe Apeloig_, Interview, 2001.], "https://apeloig.com/entretien/?lang=en") La differenza è utile quando si valutano le libertà sul disegno dei segni. Un carattere può essere trasformato per ottenere un effetto dichiarato, ma occorre sapere che cosa si sta modificando. Schiacciare le lettere altera il rapporto fra tratti verticali e orizzontali; la prospettiva rende diverse le parti della stessa parola. Non stiamo usando una *vera variante di larghezza*, nella quale il disegnatore avrebbe corretto proporzioni e spessori per preservare l’equilibrio.

Il manifesto mette quindi in dialogo due competenze: conoscere il comportamento del carattere e decidere dove interromperne la regolarità. La libertà progettuale diventa leggibile quando il trattamento *sostiene un’idea specifica*. Per questo è utile osservare l’opera intera e poi tornare a un dettaglio delle lettere. L’ingrandimento consente di riconoscere il tipo di trasformazione; il documento completo mostra se quella trasformazione riesca a tenere insieme titolo, significato e immagine. La stessa operazione, ripetuta senza quella relazione, produrrebbe soltanto un effetto grafico.

=== Montecatini Pro: dal lettering al font

Montecatini Pro traduce un riferimento ai manifesti italiani in Stile Liberty in una famiglia capace di comporre parole nuove. Il progetto dei disegnatori di caratteri _Louise Fili_, _Andy Anzollitto_ e _Nick Misani_, con produzione Schriftlabor, non replica una sola insegna: organizza un repertorio di forme e di relazioni. È il passaggio dal gesto specifico del lettering a uno strumento tipografico esteso @t06-montecatini-fili.#sito([Louise Fili Ltd, Montecatini Pro: origine e sviluppo della famiglia.], "https://www.louisefili.com/montecatini-pro")

La documentazione TipoFili presenta ventiquattro stili, ottenuti da *sei pesi e quattro larghezze*. Questo numero riguarda una struttura della famiglia, non ventiquattro emozioni o ventiquattro varianti intercambiabili. Una larghezza più stretta permette di affrontare una parola lunga in modo diverso da una semplice compressione geometrica; un peso più forte modifica il rapporto fra pieni e vuoti @t06-montecatini-tipofili.#sito([TipoFili, Montecatini Pro: ventiquattro stili, progettisti e produzione.], "https://tipofili.com/fonts/montecatini")

Gli alternati aggiungono una seconda possibilità. Alcune forme cambiano in relazione ai segni vicini: un incontro fra lettere può produrre un raccordo previsto dal progetto. Altri *alternati stilistici* consentono di scegliere un disegno diverso per un singolo glifo. Nel titolo dello specimen ufficiale possiamo osservare la giunzione CA (@fig-tipo-331), senza dedurre da quella sola immagine che tutti i possibili accostamenti abbiano lo stesso comportamento.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/parola-immagine/montecatini-pro-specimen-raccordo-ca.png"),
  [Montecatini Pro: campione ufficiale con raccordo fra C e A.], diritti: [Louise Fili, Andy Anzollitto, Nick Misani; produzione Schriftlabor; specimen TipoFili.],
  alt: "Montecatini Pro: campione ufficiale con raccordo fra C e A.",
) <fig-tipo-331>

Il caso rende concreto un criterio già incontrato con i logotipi. La personalità non dipende soltanto dalla forma isolata delle lettere, ma da come lavorano insieme nella parola. Quando utilizziamo una famiglia ricca di alternati dobbiamo leggere il risultato, anziché attivare indiscriminatamente tutte le funzioni. Un raccordo efficace in un nome può essere invadente in un altro. Il carattere mette a disposizione delle possibilità; il progetto consiste nel scegliere quelle che rendono più preciso il messaggio, *conservando la leggibilità* e dichiarando con esattezza la variante utilizzata.
]
#[
// Siti e marchi: le schermate conservate non descrivono versioni future del sito.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto
#import "../template/documenti.typ": dettaglio, tavola-documentaria

=== Marchi e testi: Mancini, Rustichella e Aesop

Due produttori dello stesso settore possono presentare voci tipografiche differenti. Nelle schermate conservate di Pasta Mancini e Rustichella d’Abruzzo (@fig-tipo-332a, @fig-tipo-332b e @fig-tipo-332c) il confronto pertinente riguarda il lettering dei marchi (@fig-tipo-332d e @fig-tipo-332e) e il trattamento tipografico degli altri testi. Le grazie, l’inclinazione e le proporzioni permettono di descrivere differenze reali senza ricavare dal marchio una misura della qualità del prodotto @t06-mancini.#sito([Pasta Mancini, sito ufficiale. Le figure riproducono schermate conservate della fonte.], "https://www.pastamancini.com/") @t06-rustichella.#sito([Rustichella d’Abruzzo, sito ufficiale. Le figure riproducono schermate conservate della fonte.], "https://rustichella.it/")

Nel caso Mancini una frase in corsivo con grazie si distingue dal disegno senza grazie di altri testi. Il *cambiamento di registro* non implica un’incoerenza: il corsivo può essere riservato a un’affermazione specifica, mentre le informazioni variabili vengono affidate a forme più regolari. Nella frase di Rustichella osserviamo invece una diversa presenza di grazie e dettagli. L’analisi deve rimanere legata alla versione riprodotta; lo screenshot conservato non dimostra che il sito attuale conservi lo stesso font.

Aesop aggiunge, nella @fig-tipo-333, un esempio del rapporto fra il nome e i testi della pagina. Il logotipo presenta tratti modulati, mentre il titolo e la descrizione adottano forme più uniformi. Il contrasto fra una scritta distintiva e *caratteri di accompagnamento* più regolari può diventare parte dell’identità visiva di un prodotto. Prima di chiamare «serif» l’intero sistema bisogna guardare i singoli testi: il nome e le descrizioni possono usare disegni diversi @t06-aesop.#sito([Aesop, sito ufficiale. La figura riproduce la schermata conservata della fonte.], "https://www.aesop.com/")

I tre casi consentono di discutere il tono partendo da indizi circoscritti. Una forma può richiamare tradizione o precisione attraverso convenzioni incontrate in altri documenti, ma quelle associazioni *non sono risultati obbligatori*. Il valore del confronto consiste nel riconoscere quali parti del nome siano personalizzate e quali testi vengano composti con un repertorio riutilizzabile. Qui non analizziamo la distribuzione delle immagini o la struttura della pagina web: isoliamo la voce delle lettere e il suo rapporto con le parole che accompagnano il prodotto.

// Schermata e dettaglio derivano dai due originali conservati in Figma.
// Il ritaglio riguarda solo l'immagine, senza posizionare righe del capitolo.
#confronto[
  #grid(columns: (270pt, 104.18pt), gutter: 14.17pt,
    [
      #figure([
        #image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/pasta-mancini-schermata-corsivo.png"), width: 270pt,
          alt: "Pasta Mancini: schermata conservata con frase in corsivo e altri testi senza grazie.")
        #v(8pt)
        #text(size: 9pt)[Dettaglio ingrandito del corsivo]
        #v(4pt)
        #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/pasta-mancini-home-storica.jpg"),
          width: 270pt, height: 20.625pt, originale-width: 515.625pt, originale-height: 292.969pt,
          dx: -123.75pt, dy: -249.84pt,
          alt: "Frase in corsivo della stessa homepage Mancini, ingrandita dal documento originale.")
      ], kind: image, caption: [Pasta Mancini: corsivo con grazie e testi senza grazie nello screenshot conservato.
        #v(4pt)#testo-diritti[Pasta Mancini.]
      ]) <fig-tipo-332a>
      #v(10pt)
      #immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/pasta-mancini-monogramma-e-nome.png"),
        [Mancini Pastificio Agricolo: monogramma M e nome senza grazie su tre righe.],
        diritti: [Pasta Mancini.], width: 40.437pt,
        alt: "Mancini Pastificio Agricolo: monogramma M sopra il nome su tre righe.",
      ) <fig-tipo-332d>
    ],
    [
      #figure(image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/pasta-mancini-schermata-estesa.png"),
        width: 104.18pt, alt: "Pasta Mancini: screenshot esteso conservato del sito."),
        kind: image, caption: none) <fig-tipo-332b>
    ],
  )
  // La didascalia della schermata lunga usa l'intera larghezza del confronto.
  // Il numero e il collegamento restano quelli della figura nativa.
  #v(8pt)
  #block(width: 137mm, above: 0pt, below: 0pt)[
    #set text(size: 9pt, weight: 300, variations: (opsz: 9))
    #set par(justify: false, leading: 1.8pt, spacing: 0pt)
    #text(weight: 500)[#ref(<fig-tipo-332b>) —] Pasta Mancini: screenshot esteso del sito. «Il pastificio agricolo», «La pasta» e «Agenda» mostrano ruoli tipografici differenti.
    #v(4pt)#testo-diritti[Pasta Mancini.]
  ]
]

// La tavola450 della fonte contiene soltanto questi tre documenti:
// restano sullo stesso foglio ordinario, senza una fascia delle note vuota.
#tavola-documentaria[
  // I soli intervalli espliciti separano i tre documenti: niente spazi duplicati.
  #set par(spacing: 0pt)
  #set block(above: 0pt, below: 0pt)
  #immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/rustichella-abruzzo-schermata.png"),
    [Rustichella d’Abruzzo: titolo con grazie nello screenshot conservato del sito.],
    diritti: [Rustichella d’Abruzzo.], alt: "Rustichella d’Abruzzo: schermata conservata con titolo con grazie.",
  ) <fig-tipo-332c>
  #v(6pt)
  #figure(image(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/aesop-schermata-nome-e-testi.jpg"),
    width: 137mm, height: 140.837pt, fit: "contain",
    alt: "Aesop: schermata conservata con nome e testi di accompagnamento."),
    kind: image, caption: [Aesop: tratti modulati nel nome e testi più uniformi nello screenshot conservato.
      #v(4pt)#testo-diritti[Aesop.]
    ]) <fig-tipo-333>
  #v(6pt)
  #immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/rustichella-abruzzo-marchio-centenario.png"),
    [Rustichella d’Abruzzo, marchio del centenario: «1924–2024, 100 anni di pasta», con cifre e scritta con grazie.],
    diritti: [Rustichella d’Abruzzo.], width: 120pt,
    alt: "Rustichella d’Abruzzo: marchio del centenario1924–2024.",
  ) <fig-tipo-332e>
]
]
#[
// Originali e ingrandimenti documentari: le quote riguardano solo le immagini.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto
#import "../template/documenti.typ": dettaglio

=== Calligrafia e lettering nei marchi

Il confronto fra marchi calligrafici e nomi dalle lettere più regolari rende visibile la varietà del lettering. Kellogg’s (@fig-tipo-334a) collega la propria scritta alla firma del fondatore nella documentazione aziendale. Il segno conserva un andamento continuo e riconoscibile, ma la sua riproduzione è un esecutivo definito, non una firma diversa ogni volta. La scrittura personale diventa *un’identità ripetibile* @t06-kelloggs.#sito([Kellogg’s, Our History: firma del fondatore e marchio.], "https://www.kelloggs.com/en-tr/who-we-are/our-history.html")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#figure([
#box(width: 100%, height: 68.28pt, align(center + horizon, image(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/kelloggs-marchio.jpg"), width: 126.071pt, alt: "Marchio Kellogg’s, lettering continuo.")))
], kind: image, caption: [Kellogg’s: lettering continuo basato sulla firma.
  #v(4pt)#testo-diritti[Kellogg’s.]
]) <fig-tipo-334a>
],
[#figure([
#box(width: 100%, height: 68.28pt, align(center + horizon, image(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/barbie-marchio.jpg"), width: 141.505pt, alt: "Marchio Barbie, lettere inclinate e collegate.")))
], kind: image, caption: [Barbie: scritta inclinata e lettere collegate.
  #v(4pt)#testo-diritti[Mattel / Barbie.]
]) <fig-tipo-334b>
],
  )
]

Barbie (@fig-tipo-334b) e Disney (@fig-tipo-334c) offrono altri nomi che utilizzano gesti grafici caratterizzati. Le curve, i raccordi e alcuni particolari delle iniziali permettono di riconoscere il marchio prima di analizzare ogni segno. La somiglianza con un font script disponibile in commercio non basta però a identificarne l’origine. Riprodurre un nome digitandolo in Brush Script o in un carattere ispirato al marchio non equivale a mostrare il documento autentico. Anche l’etichetta «per bambini» è troppo generica: il segno vive dentro una storia di prodotti e di narrazioni, non dentro una proprietà universale delle curve @t06-barbie.#sito([Mattel Creations, Barbie Signature.], "https://uk.creations.mattel.com/pages/barbie-signature") @t06-disney.#sito([Disney, sito ufficiale; marchio consultato il 20 ottobre 2026, disegno non datato.], "https://www.disney.com/")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#block(breakable: false)[
      #set par(justify: false, spacing: 4pt)
      #text(size: 10pt, weight: 500)[Brush Script MT Italic]
      #v(4pt)
      #box(width: 100%, height: 54pt, align(left + horizon,
        image(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/brush-script-mt-specimen.svg"),
          width: 53.9121pt, alt: "Tre glifi autentici Brush Script MT Italic.")))
      #v(4pt)
      #text(size: 9pt, weight: 300)[Tre glifi della versione digitale attuale; questo campione non è il lettering dei marchi.]
      #v(4pt)#testo-diritti[© Monotype.]
    ]],
    [#figure([
      #grid(columns: (1fr, 1fr), column-gutter: 12pt,
        box(height: 70pt, align(center + horizon,
          image(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/disney-wordmark-ufficiale-2026.png"), width: 86.46pt,
            alt: "Wordmark Disney ufficiale, disegno non datato."))),
        box(height: 70pt, align(center + horizon,
          image(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/lego-marchio-storico-1973-1998.jpg"), width: 54pt,
            alt: "LEGO: versione storica del marchio 1973–1998."))),
      )
    ], kind: image, caption: [Disney: marchio del sito ufficiale, consultato 20 ottobre 2026; disegno non datato. LEGO: versione 1973–1998.
      #v(4pt)#testo-diritti[© Disney. © The LEGO Group.]
    ]) <fig-tipo-334c>],
  )
]

LEGO costruisce una diversa presenza attraverso lettere arrotondate e contorni marcati. La storia ufficiale documenta nel 1973 una revisione con il doppio bordo intorno alle lettere bianche. @t06-lego.#sito([The LEGO Group, A modern, international company: marchio 1973–1998.], "https://www.lego.com/en-us/history/articles/f-a-modern-international-company") Il contorno rende il nome una figura definita e va distinto dal *peso del glifo*: ispessire una lettera e aggiungerle un bordo producono effetti differenti sulle controforme e sulla distanza fra i segni del nome. Anche Nike (@fig-tipo-334d) richiede di separare gli elementi: lo Swoosh è un simbolo, mentre la dicitura Nike è lettering e i testi pubblicitari appartengono a un sistema più ampio. Il caso impedisce di usare la figura di un emblema come prova del font della marca @t06-nike2025.#sito([Department of Nike Archives, The Nike Swoosh Logo, 2 ottobre 2025.], "https://about.nike.com/en/magazine/nike-swoosh-logo-history") In tutti questi nomi il punto utile è la *distinzione fra segno particolare e repertorio*: conoscere le forme di un logotipo aiuta a descriverne la riconoscibilità, ma non autorizza a ricostruire l’intero alfabeto né a prevedere la risposta di qualsiasi lettore.

#figure([
#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/nike-timeline-marchi-archivio-2025.jpg"), width: 130pt, height: 68pt,
  originale-width: 652.8pt, originale-height: 435.2pt, dx: -433.695pt, dy: -70.9766pt,
  alt: "NIKE: lettering e Swoosh completi nel dettaglio etichettato 1976 della tavola ufficiale.")
], kind: image, caption: [NIKE: lettering e Swoosh, versione indicata 1976 nella tavola del Department of Nike Archives (2025). Dettaglio.
  #v(4pt)#testo-diritti[© NIKE, Inc.]
]) <fig-tipo-334d>


=== Tropicana: i limiti del confronto

Il ridisegno Tropicana del 2009 non cambia solo le lettere (@fig-tipo-335b). La foto accosta versioni Orange Tangerine: il nome orizzontale sopra l’arancia con cannuccia diventa verticale sul margine. Nel nuovo fronte dominano un bicchiere e «100% orange and tangerine». Cambiano insieme trattamento del nome, immagine e gerarchia: non è un confronto del solo font. Queste osservazioni non misurano la risposta dei lettori. Chiedere «riesci a leggere Tropicana?» è diverso da chiedere «ritrovi il prodotto abituale?». Un nome decifrabile può avere un profilo meno familiare; la fotografia non dimostra quale elemento abbia determinato un esito commerciale @t06-airey2015.#sito([_David Airey_, Logo Design Love, 2ª ed., p. 61; foto _Brian Alexander Gray_.], "https://www.pearson.de/media/muster/ext/9780133812770.pdf") La @fig-tipo-335a conserva un’altra fotografia, di _j_lai_: le due confezioni appartengono a varianti differenti del prodotto, perciò non isolano una sola variabile @t06-jlai2008.#sito([_j_lai_, tropicana - old and new, 20 dicembre 2008; #link("https://creativecommons.org/licenses/by/2.0/")[CC BY 2.0].], "https://www.flickr.com/photos/jlai321/3123175118")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#figure([
#box(width: 100%, height: 145.514pt, align(center + horizon, [#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/confronti/tropicana-j-lai-2008-varianti-diverse.jpg"), width: 157pt, height: 73.59375pt,
  originale-width: 209.333pt, originale-height: 167.4667pt, dx: -26.9844pt, dy: -24.53125pt,
  alt: "Tropicana: due confezioni di varianti diverse nella fotografia j_lai.")]))
], kind: image, caption: [Tropicana: dettagli. Varianti diverse; fotografia ritagliata.
  #v(4pt)#testo-diritti[j_lai, 20 dicembre 2008; CC BY 2.0.]
]) <fig-tipo-335a>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/confronti/tropicana-orange-tangerine-2009-confronto.jpg"),
  [Tropicana Orange Tangerine: prima a sinistra, redesign del 2009 a destra. Data dello scatto non indicata.], diritti: [Foto Brian Alexander Gray, in D. Airey, Logo Design Love, 2ª ed., p. 61; estratto Pearson.],
  alt: "Tropicana Orange Tangerine: prima a sinistra, redesign del 2009 a destra. Data dello scatto non indicata.", width: 187.09pt,
) <fig-tipo-335b>
],
  )
]

Frutteto (@fig-tipo-335) è un marchio fittizio, non una confezione Tropicana né un test sulle vendite. Serve a isolare il cambiamento delle lettere: nome, figura del frutto, colori, posizione e corpo nominale restano uguali. A sinistra il nome è in EB Garamond Regular, con grazie e contrasto fra tratti sottili e spessi; a destra è in Helvetica Regular, senza grazie e con tratti più uniformi. Osserviamo soprattutto i terminali della F e della t. Le due parole hanno larghezze diverse perché cambiano le proporzioni dei glifi, anche a parità di corpo nominale. Per una verifica con lettori, separiamo tre compiti: leggere il nome, riconoscere il prodotto e descriverne il tono. Dichiariamo le variabili mantenute costanti, pubblico e condizioni della prova. Il solo carattere non basta a spiegare una variazione delle vendite. Il confronto non autorizza regole come «i sans serif fanno perdere fiducia»: vale per casi specifici.

#confronto[
#figure([
#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/confronti/frutteto-serif-sans-confronto.svg"), width: 388.35pt, height: 167.94pt,
  originale-width: 388.35pt, originale-height: 194.175pt, dx: 0pt, dy: -11.36pt,
  alt: "Frutteto, marchio fittizio: nome e figura uguali, lettere in EB Garamond e Helvetica.")
], kind: image, caption: [Frutteto, confronto fittizio: a sinistra EB Garamond Regular (serif), a destra Helvetica Regular (sans serif). Restano uguali nome, figura del frutto, colori, posizione e corpo nominale; cambiano le forme delle lettere e la larghezza della parola.
  #v(4pt)#testo-diritti[Contorni autentici dei due caratteri.]
]) <fig-tipo-335>
]
]
#[
// Originali e ingrandimenti documentari: le quote riguardano solo le immagini.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto, dettaglio-figura
#import "../template/documenti.typ": dettaglio

=== Gotham e la campagna _Obama_

Il carattere può assumere significati nuovi attraverso un impiego particolarmente visibile. La campagna presidenziale di _Barack Obama_ rende evidente questa possibilità: la cronologia di Hoefler&Co. documenta la scelta di Gotham Bold nel 2007 e il suo ruolo nell’identità delle elezioni 2008. La famiglia esisteva prima di quell’impiego, ma la sua presenza ripetuta nelle parole della campagna contribuì a creare *un’associazione storica riconoscibile*.  @t06-hoefler2017.#sito([Hoefler&Co., Thanks, Obamas., 20 gennaio 2017; cronologia dal 2007.], "https://www.typography.com/blog/the-obama-typefaces")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/politica/obama-campagna-gotham-fotografia.jpg"),
  [Campagna _Obama_: scritte in Gotham, con maiuscole a scale diverse.], diritti: [Fotografia Associated Press/Paul Sancya; archivio Jonathan Hoefler.],
  alt: "Campagna Obama: scritte in Gotham, con maiuscole a scale diverse.", width: 187.09pt,
) <fig-tipo-336a>
],
[#figure([
#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/politica/gotham-logotipi-politici.jpg"), width: 187.09pt, height: 93.545pt,
  originale-width: 1404.579pt, originale-height: 655.658pt, dx: -1217.49pt, dy: -468.57pt,
  alt: "Due identità politiche in Gotham, ritaglio documentario del campionario completo.")
], kind: image, caption: [Due identità politiche in Gotham: maiuscole e pesi diversi. Ritaglio.
  #v(4pt)#testo-diritti[Jonathan Hoefler; marchi dei rispettivi committenti.]
]) <fig-tipo-336b>
],
  )
]

Osservando il documento possiamo descrivere il peso, le proporzioni e l’uso delle maiuscole. Possiamo poi discutere perché quelle forme siano state lette come adeguate a quel messaggio. Non possiamo però concludere che Gotham contenga di per sé speranza, credibilità o una posizione politica. Questi significati dipendono dal testo, dalla situazione e dalla memoria di chi guarda. Lo stesso font può servire soggetti diversi (@fig-tipo-336b) e anche contenuti tra loro incompatibili. La successiva evoluzione è altrettanto istruttiva. La documentazione della fonderia distingue Gotham dal *lettering personalizzato con grazie* per i nomi del presidente _Barack Obama_ e del vicepresidente _Joe Biden_ nella campagna 2012. Non si tratta di assegnare semplicemente un altro peso al medesimo file: l’intervento modifica il disegno del nome. Questo caso riunisce quindi l’uso di una famiglia e la costruzione di un logotipo specifico. Il documento (@fig-tipo-336a) mostra l’impiego della scrittura nella campagna precedente. I dettagli della @fig-tipo-336c consentono di osservare il lettering con grazie per il 2012 @t06-hoefler2011.#sito([_Jonathan Hoefler_, Can We Add Serifs to Gotham?, 4 aprile 2011.], "https://www.typography.com/blog/can-we-add-serifs-to-gotham")

// Lo stesso originale fornisce il dettaglio; il numero non viene duplicato.
#dettaglio-figura(titolo: [Gotham · dettaglio documentario], riferimento: <fig-tipo-336b>,
  didascalia: [NIKEMA in Gotham: marchio elettorale di _Nikema Williams_, politica statunitense. Documento del tipografo _Jonathan Hoefler_.],
)[
#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/politica/gotham-logotipi-politici.jpg"), width: 187.09pt, height: 35.695pt,
  originale-width: 3457.668pt, originale-height: 1614.039pt, dx: -3021.73pt, dy: -1242.1pt,
  alt: "NIKEMA: dettaglio autentico del lettering in Gotham.")
]

#confronto[
#figure([
#grid(columns: (1fr, 1fr), gutter: 5mm,
[#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/politica/obama-biden-lettering-serif-2012.svg"), width: 187pt, height: 28pt,
  originale-width: 525pt, originale-height: 479.85pt, dx: -38.58pt, dy: -93.625pt,
  alt: "OBAMA: dettaglio del lettering personalizzato con grazie per il 2012.")],
[#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/politica/obama-biden-lettering-serif-2012.svg"), width: 187pt, height: 28pt,
  originale-width: 525pt, originale-height: 479.85pt, dx: -301.43pt, dy: -93.625pt,
  alt: "BIDEN: dettaglio dello stesso lettering personalizzato con grazie.")],
)
], kind: image, caption: [Dettagli del lettering _Obama_–_Biden_ per la campagna 2012. Fonte H&Co., 4 aprile 2011.
  #v(4pt)#testo-diritti[Jonathan Hoefler per Blue State Digital.]
]) <fig-tipo-336c>
]

Per studiare i caratteri nella propaganda e nella comunicazione politica occorre mantenere insieme *precisione formale e precisione storica*. La data evita di confondere campagne diverse; l’attribuzione distingue chi ha scelto il font da chi l’ha disegnato; il confronto delle parole mostra le trasformazioni. Il progetto può servirsi della memoria tipografica di un’epoca, ma non può controllarne automaticamente l’interpretazione. Riconoscere questa relazione rende l’analisi più utile di un elenco di caratteri descritti come democratici, autorevoli o ribelli per natura @t06-hoefler-gotham.#sito([_Jonathan Hoefler_, The History of the Gotham Typeface.], "https://jonathanhoefler.com/articles/history-of-the-gotham-font")
]
#[
// Originali e ingrandimenti documentari: le quote riguardano solo le immagini.
#import "../template/stile.typ": sito
#import "../template/editoriale.typ": nota-compatta, testo-diritti
#import "../template/campioni.typ": confronto
#import "../template/documenti.typ": dettaglio

=== Conservare un’identità fra scritture diverse

Quando un nome passa da un sistema di scrittura a un altro non basta sostituire le lettere mantenendo la stessa sagoma. Cambiano la struttura dei segni, le convenzioni di collegamento e i rapporti fra pieni e vuoti. Alcune scritture non distinguono maiuscole e minuscole; altre richiedono che i segni cambino forma nel contesto. Un’identità multiscript deve cercare una parentela senza forzare questi sistemi nel modello dell’alfabeto latino.

Coca-Cola (@fig-tipo-337e) offre versioni del nome in scritture differenti. Il confronto deve osservare il ritmo e il movimento del segno, anziché cercare una corrispondenza lettera per lettera. Una curva del logotipo latino può suggerire un riferimento, ma il nome localizzato deve continuare a essere *leggibile e linguisticamente corretto* per chi usa quella scrittura. La fedeltà riguarda l’identità percepita, non l’obbligo di riprodurre ogni svolazzo @t06-cocacola-cina2025.#sito([The Coca-Cola Company, Share a Coke, Cina, 28 aprile 2025.], "https://www.coca-cola.com/cn/zh/media-center/Share-a-Coke")

#figure([
#grid(columns: (1fr, 1fr), gutter: 7pt,
[#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/marchi/coca-cola-logotipo-documentato-2025.jpg"),
 width: 90pt, height: 30pt, originale-width: 109.091pt, originale-height: 61.364pt,
 dx: -10.91pt, dy: -15.34pt, alt: "Coca-Cola: lettering latino documentato nel 2025.")],
[#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/multiscript/coca-cola-share-a-coke-cina-2025.jpg"), width: 90pt, height: 30pt,
  originale-width: 796.641pt, originale-height: 448.305pt, dx: -10.55pt, dy: -10.55pt,
  alt: "Coca-Cola: nome cinese da Share a Coke, Cina, 2025.")],
)
], kind: image, caption: [Coca-Cola: latino documentato nel 2025 e cinese da Share a Coke, Cina, 2025. Dettagli dai documenti originali.
  #v(4pt)#testo-diritti[© The Coca-Cola Company.]
]) <fig-tipo-337e>

Uniqlo (@fig-tipo-337b) rende visibile un’altra strategia accostando il nome in alfabeto latino e in katakana. Le due scritture possono condividere una presenza compatta senza diventare lo stesso repertorio. Pepsi, nel campione storico della @fig-tipo-337a, e McDonald’s mostrano a loro volta come il nome o i caratteri di accompagnamento possano essere adattati: la parentela va cercata nel *peso ottico*, nelle proporzioni e nel trattamento dei terminali, non in una misura identica applicata a glifi di struttura diversa @t06-uniqlo.#nota-compatta([Uniqlo, marchi ufficiali; Fast Retailing, Annual Report 2006, pp. 2–4, _Kashiwa Sato_.], ("https://www.uniqlo.com/jp/ja/contents/feature/common/icons/header.svg", "https://www.fastretailing.com/eng/ir/library/pdf/annual2006.pdf"))

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#figure([
#box(width: 100%, height: 83.151pt, align(center + horizon, image(path("/risorse-condivise/immagini/figure/tipografia/esempi/multiscript/pepsi-marchi-storici-latino-arabo-cinese.jpg"), width: 187.09pt, alt: "Pepsi: versioni storiche in scrittura latina, araba e cinese.")))
], kind: image, caption: [Pepsi: versioni precedenti del marchio in alfabeto latino, scrittura araba e caratteri cinesi.
  #v(4pt)#testo-diritti[PepsiCo.]
]) <fig-tipo-337a>
],
[#figure([
#box(width: 100%, height: 83.151pt, align(center + horizon, image(path("/risorse-condivise/immagini/figure/tipografia/esempi/multiscript/uniqlo-marchi-katakana-latino.svg"), width: 187.09pt, alt: "Uniqlo: marchi in katakana e in alfabeto latino.")))
], kind: image, caption: [Uniqlo: versioni del marchio in katakana e in alfabeto latino.
  #v(4pt)#testo-diritti[Kashiwa Sato per Uniqlo / Fast Retailing.]
]) <fig-tipo-337b>
],
  )
]

Il caso Starbucks ricorda infine che il simbolo della marca e la tipografia dei testi localizzati sono livelli differenti. La presenza della stessa immagine non garantisce la coerenza dei caratteri, né autorizza a giudicare tutte le scritture attraverso il latino. Occorrono competenze linguistiche e tipografiche specifiche per verificare legature, diacritici e spazi. Il confronto documentario serve a porre queste domande; un carattere multiscript va poi provato con *parole reali e con lettori competenti*, evitando di deformare i segni per farli assomigliare a quelli di un’altra lingua. Nella @fig-tipo-337d il confronto riguarda un lavoro calligrafico specifico per il negozio Starbucks di 37 Smith Street a Singapore, durante la lavorazione dell’insegna. @t06-starbucks2025.#sito([Starbucks Singapore, video sul negozio 37 Smith Street, 15 aprile 2025, 31 secondi.], "https://www.linkedin.com/posts/starbucks-singapore_starbuckssingapore-37smithstreet-craftsmanship-activity-7317841654982369281-GeBr") La @fig-tipo-337c mostra invece il nome nella navigazione di un sito McDonald’s storico.

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#figure([
#box(width: 100%, height: 54pt, align(center + horizon, [#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/multiscript/mcdonalds-cina-schermata-storica.jpg"), width: 93pt, height: 38pt,
  originale-width: 2532pt, originale-height: 3271pt, dx: -672pt, dy: -147pt,
  alt: "McDonald’s Cina: i tre caratteri del nome nella navigazione dello screenshot storico.")]))
], kind: image, caption: [McDonald’s Cina: nome 麦当劳 nella navigazione del sito. Dettaglio da una schermata storica; data di cattura non indicata.
  #v(4pt)#testo-diritti[© McDonald’s.]
]) <fig-tipo-337c>
],
[#figure([
#box(width: 100%, height: 54pt, align(center + horizon,
 box(width: 114pt, height: 38pt, clip: true, align(top + left,
  move(dx: -7pt, dy: -18pt, rotate(90deg, reflow: true,
   image(path("/risorse-condivise/immagini/figure/tipografia/esempi/multiscript/starbucks-singapore-insegna-lavorazione-2025.png"), width: 72pt,
    alt: "Starbucks, Singapore: insegna in lavorazione. Dettaglio ruotato del fotogramma a31 secondi.")))))))
], kind: image, caption: [Starbucks, Singapore, 37 Smith Street: insegna in lavorazione. Video 2025, 31 s; dettaglio ruotato.
  #v(4pt)#testo-diritti[Calligrafia Yong Cheong Thye; intaglio Cheh Kai Hon. © Starbucks.]
]) <fig-tipo-337d>
],
  )
]
]
#[
// Originali e ingrandimenti documentari: le quote riguardano solo le immagini.
#import "../template/editoriale.typ": testo-diritti
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto, dettaglio-figura
#import "../template/documenti.typ": dettaglio

=== Happy Meal e McCafé: due registri

L’accostamento di Happy Meal e McCafé mostra che una stessa impresa può usare nomi con voci grafiche differenti. Conviene partire dal lettering effettivo: nel nome McCafé storico si riconosce un andamento script, non un generico serif. Le lettere collegate e il ritmo della scrittura permettono di distinguere il nome da una parola composta con un carattere regolare. Il fatto che il prodotto sia rivolto a un pubblico adulto non trasforma automaticamente quelle forme in una categoria tipografica.

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#figure([
  #box(width: 100%, height: 136.795pt, align(center + horizon,
    image(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/mccafe-marchio-storico-script.jpg"),
      width: 89.92pt, alt: "McCafé: versione storica con lettere connesse e sottolineatura.")))
], kind: image, caption: [McCafé: versione storica con lettere connesse e sottolineatura.
  #v(4pt)#testo-diritti[McDonald’s.]
]) <fig-tipo-338a>
],
[#figure([
  #box(width: 100%, height: 136.795pt, align(center + horizon,
    image(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/happy-meal-marchio.jpg"),
      width: 148.112pt, alt: "Happy Meal: minuscole arrotondate e colorate.")))
], kind: image, caption: [Happy Meal: minuscole arrotondate e colorate.
  #v(4pt)#testo-diritti[McDonald’s.]
]) <fig-tipo-338b>
],
  )
]

*La versione e la data* sono particolarmente importanti. Nel 2026 McDonald’s ha documentato un aggiornamento del wordmark McCafé (@fig-tipo-338c) @t06-mccafe2026.#sito([McDonald’s, McDonald’s Refreshes McCafé Brand Visual Identity, 1 maggio 2026.], "https://corporate.mcdonalds.com/corpmcd/our-stories/article/mcdonalds-refreshes-mccafe-brand-visual-identity.html") Per questo, un confronto didattico deve quindi dichiarare se mostra un documento precedente o la nuova scritta. Conservare un campione storico è utile, purché non venga presentato come fotografia invariabile della marca. Anche un nome molto familiare può subire modifiche che cambiano terminali, collegamenti e rapporto fra i segni. Il confronto con Happy Meal riguarda il modo in cui vengono costruite due parole e il loro tono apparente, *senza attribuire un’età obbligatoria* alle forme arrotondate o una maggiore qualità alle scritture più sottili (@fig-tipo-338a e @fig-tipo-338b). I bambini e gli adulti leggono messaggi reali, non categorie astratte di caratteri. I segni devono restare distinguibili e la voce deve essere valutata nel contesto dei testi che la accompagnano.

#figure([
#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/esempi/lettering/mccafe-usa-applicazione-ufficiale-2026.jpg"), width: 87pt, height: 44pt,
  originale-width: 499.751pt, originale-height: 222.492pt, dx: -37.65pt, dy: -96.1279pt,
  alt: "McCafé 2026: parola completa e accento nell’applicazione sul bicchiere.")
], kind: image, caption: [McCafé 2026: applicazione sul bicchiere nel sito ufficiale USA, consultato 20 ottobre 2026. Dettaglio.
  #v(4pt)#testo-diritti[© McDonald’s.]
]) <fig-tipo-338c>

Questo caso completa la distinzione fra *coerenza e uniformità*. Un sistema può prevedere registri diversi per nomi diversi; la relazione si costruisce attraverso tratti riconoscibili, ripetizioni e regole d’uso. Per analizzarla dal punto di vista tipografico dobbiamo isolare gli aspetti delle lettere, lasciando ad altre sezioni del libro la strategia commerciale e l’organizzazione dei prodotti.

=== Adeguatezza e pregiudizio: Comic Sans

Comic Sans è un caso in cui il giudizio su un carattere può precedere l’osservazione delle lettere. La sua fama ha generato apprezzamenti, rifiuti e usi ironici; nessuno di questi atteggiamenti sostituisce l’analisi del contesto. Il disegno nasce da una richiesta precisa di tono: il disegnatore di caratteri _Vincent Connare_ lo sviluppò nel 1994 guardando il linguaggio dei fumetti e interrogandosi sull’inadeguatezza di una scrittura troppo formale per un personaggio digitale @t06-comic2025.#sito([Microsoft, Comic Sans MS font family, 8 agosto 2025; testimonianza di _Vincent Connare_.], "https://learn.microsoft.com/en-us/typography/font-list/comic-sans-ms")

#dettaglio-figura(titolo: [Comic Sans MS Regular], riferimento: <fig-tipo-339>,
  didascalia: [Contorni autentici del carattere; il confronto completo dei due messaggi segue.],
)[
  #box(width: 100%, height: 54pt, align(left + horizon,
    image(path("/risorse-condivise/immagini/figure/tipografia/esempi/confronti/comic-sans-ms-specimen.svg"),
      width: 60.21pt, alt: "Tre glifi autentici Comic Sans MS Regular.")))
]

La documentazione Microsoft chiarisce una distinzione spesso perduta nel racconto: il progetto fu suggerito dall’ambiente di Microsoft Bob, ma il carattere non entrò nella versione distribuita del prodotto. Arrivò invece con Microsoft Plus! per Windows 95. La storia conta perché permette di capire un’intenzione senza trasformarla in una giustificazione per qualsiasi applicazione successiva @t06-mcclune2019.#sito([_Danielle McClune_, Why we love to hate Comic Sans, Microsoft Design, 21 ottobre 2019.], "https://microsoft.design/articles/why-we-love-to-hate-comic-sans/")

Le due prove originali confrontano Comic Sans con Noto Sans dentro messaggi differenti: l’invito a un laboratorio di fumetto e una comunicazione di servizio (@fig-tipo-339). All’interno di ciascuna coppia *testo, corpo e spazio* rimangono uguali. Possiamo chiedere quale voce appaia più adeguata, quali indizi sostengano la risposta e se il messaggio venga compreso. Le domande *sul tono* e quelle *sulla lettura* devono rimanere distinte: un carattere giudicato poco appropriato può essere decifrabile, mentre un carattere autorevole può perdere chiarezza se composto male.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/esempi/confronti/comic-sans-noto-sans-due-messaggi.svg"),
  [Due messaggi a confronto in Comic Sans MS Regular e Noto Sans Regular: entro ciascuna coppia testo, corpo nominale e posizione restano uguali.], diritti: [Contorni autentici Comic Sans MS e Noto Sans.],
  alt: "Due messaggi a confronto in Comic Sans MS Regular e Noto Sans Regular: entro ciascuna coppia testo, corpo nominale e posizione restano uguali.", width: 137mm, placement: top, scope: "parent",
) <fig-tipo-339>

L’esercizio non richiede una risposta obbligatoria. È utile proprio quando emerge un disaccordo motivato, perché mostra il ruolo dell’esperienza e delle convenzioni. Non dimostra che Comic Sans sia universalmente infantile, né che risolva difficoltà di lettura come la dislessia. Per sostenere quest’ultima affermazione servirebbero studi specifici e un confronto adeguato. Qui il caso permette di imparare a formulare un *giudizio contestuale* prima di affidarsi alla reputazione di un nome.
]
]
#[
// Leggibilità e lettura, tavole459–469 della fonte corrente.
// I paragrafi scorrono da soli: nessuna riga viene posizionata manualmente.
// Gli SVG conservano i contorni autentici e le misure dichiarate dei campioni.
#import "../template/stile.typ": immagine, sito
#import "../template/campioni.typ": confronto
#import "../template/editoriale.typ": nota-compatta, testo-diritti

== Leggibilità e lettura

Un testo può essere decifrabile e risultare comunque faticoso da leggere. Per capire dove intervenire è utile distinguere due domande. La legibility riguarda soprattutto la possibilità di *riconoscere i segni e distinguerli*: vedere una lettera, separarla da un’altra, leggere una cifra senza scambiarla per un simbolo simile. La readability riguarda *l’esperienza del testo nel suo sviluppo*: seguire una riga, passare alla successiva, cogliere i passaggi e comprendere il messaggio. Le due dimensioni interagiscono, ma non coincidono.

Il disegno del carattere partecipa alla prima domanda attraverso dettagli, proporzioni e differenze fra glifi. Alla seconda contribuiscono anche la dimensione, le distanze, la lunghezza delle righe e l’articolazione dei paragrafi. Il linguaggio del contenuto rimane decisivo: nessun font trasforma un’istruzione ambigua in una frase chiara. In questo capitolo osserviamo la componente tipografica, riconoscendo che essa lavora insieme alle altre condizioni della lettura.

Durante la lettura gli occhi non scorrono in modo uniforme lungo la riga: alternano movimenti rapidi, chiamati saccadi, e brevi periodi di relativa stabilità, le fissazioni, durante i quali viene raccolta gran parte dell’informazione visiva utile. Non tutte le parole vengono fissate direttamente e possono esserci ritorni all’indietro. La ricerca di _Keith Rayner_ mostra che questi comportamenti dipendono anche da frequenza, prevedibilità e difficoltà delle parole, oltre che dalle condizioni del testo e dalle abilità del lettore. Non si può quindi dedurre da un singolo tempo di fissazione la qualità generale di un font @t06-rayner2009.#sito([_Rayner_ (2009).], "https://doi.org/10.16910/jemr.2.5.2")

Riconoscere una parola non equivale però a fotografarne soltanto la sagoma esterna. La sintesi di _Kevin Larson_ sul riconoscimento delle parole distingue il modello della forma globale dall’elaborazione dell’informazione sulle lettere. Il lettore esperto non deve necessariamente nominare ogni lettera una dopo l’altra, ma le differenze fra i segni restano parte dell’informazione che usa. Per il progetto tipografico questo chiarisce perché non basti preservare il profilo complessivo della parola: devono restare leggibili anche i dettagli, gli accenti e gli spazi che la compongono @t06-larson2005.#sito([_Larson_ (2005); versione web.], "https://learn.microsoft.com/en-us/typography/develop/word-recognition")

La distinzione cambia il modo di verificare un progetto. Se una persona legge male un codice, il confronto deve includere lettere e numeri isolati o in sequenze poco prevedibili. Se perde il punto in un paragrafo, è più utile osservare il passaggio fra le righe. Una *prova di lettura continua* non misura esattamente la stessa cosa di una *prova di riconoscimento rapido*, e una preferenza dichiarata per una forma non è automaticamente una maggiore accuratezza.

La domanda progettuale diventa quindi concreta: quale contenuto deve essere letto, da chi e in quali condizioni? Un grande titolo visto per pochi istanti, una pagina studiata a lungo e un numero da copiare richiedono attenzioni differenti. Dare un nome al compito impedisce di ridurre la leggibilità a una classifica astratta dei caratteri.


=== Quando una lettera somiglia a un’altra

In un codice, il lettore può avere pochi indizi per correggere un errore. Nel campione (@fig-tipo-344a), la I maiuscola, la l minuscola e il numero 1 possono avvicinarsi molto; la sequenza rn può apparire simile a una m; una O e uno 0 possono diventare difficili da separare. La familiarità con una parola aiuta a interpretare il contesto, ma non sempre un codice o un nome proprio offre questa possibilità. Conviene quindi provare i caratteri proprio dove l’ambiguità avrebbe una conseguenza.

Osserviamo i segni *al corpo effettivo*, prima di ingrandirli per capire da quali dettagli dipenda la differenza. Nella I possiamo cercare barre o terminazioni; nella l una curva o un piede; nell’1 una bandierina e una base. Non tutti questi elementi sono presenti in ogni disegno, e non esiste un’unica soluzione corretta. Conta che le *forme restino distinguibili* nelle condizioni previste. Anche lo zero barrato, quando disponibile, va valutato nel suo uso: la barra deve essere riconosciuta come parte della cifra e non scambiata per un altro segno.

La vicinanza di rn e m mostra invece che la spaziatura partecipa al problema. Una riduzione eccessiva degli intervalli può avvicinare lettere diverse fino a farle sembrare un unico segno. Aumentare lo spazio senza criterio non risolve tutto: può disgregare la parola e cambiare il ritmo del testo.

Un campione utile contiene quindi parole ordinarie, nomi, cifre e *sequenze poco prevedibili*. Il confronto deve mantenere dichiarati corpo, *peso e spaziatura*, così da capire quale cambiamento produce l’effetto osservato. La distinzione dei glifi non è una qualità da dedurre soltanto dal nome della famiglia o dall’appartenenza alla categoria serif o sans serif.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/distinguere-i-l-uno-rn-m-o-zero.svg"),
  [I, l e 1; rn e m; O e 0. Osserva i dettagli che distinguono i segni di DM Sans.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "I, l e 1; rn e m; O e 0. Osserva i dettagli che distinguono i segni di DM Sans.", width: 187.09pt,
) <fig-tipo-344a>

=== La dimensione apparente e la distanza di lettura

Il corpo nominale è una parte della scelta, non la descrizione completa della *dimensione percepita*. Due caratteri composti allo stesso numero di punti o pixel possono avere altezze della x, maiuscole e spessori differenti. Nella @fig-tipo-344c DM Sans ed EB Garamond sono composti a 24 punti sulla stessa linea di base. La diversa altezza della x rende visibile il rapporto fra corpo nominale e dimensione apparente; non è una classifica di leggibilità.

La @fig-tipo-344b invita a osservare la stessa riga a distanze diverse. Per scegliere una misura occorre considerare anche la distanza. Un testo che si legge da vicino su un libro non pone lo stesso problema di una scritta osservata dall’altra parte di una stanza. La *dimensione angolare del segno*, la qualità del supporto e le condizioni visive della persona cambiano l’esperienza. Sullo schermo intervengono inoltre risoluzione, rasterizzazione e impostazioni del dispositivo: una fotografia ingrandita di una parola non riproduce automaticamente la sua lettura reale. Anche le unità richiedono attenzione. Nel CSS il rapporto convenzionale è 96 pixel per pollice e 72 punti per pollice: un punto corrisponde quindi a 4/3 di CSS pixel. Questa equivalenza nel sistema delle unità non garantisce che un centimetro CSS misuri fisicamente un centimetro su qualsiasi schermo. Il CSS pixel non va confuso con un singolo pixel hardware, e un campione stampato su carta non può diventare una misura fisica dell’interfaccia @t06-css-values2024.#sito([W3C (2024), lunghezze assolute.], "https://www.w3.org/TR/css-values-4/#absolute-lengths")

Sedici CSS pixel possono essere un punto di partenza per una prova di testo, ma *non sono un minimo generale* stabilito dalle WCAG. La misura va giudicata con il font, il compito e la *possibilità di ingrandire*. Se la composizione funziona soltanto alla dimensione iniziale prevista dal progettista, il problema non si esaurisce nella scelta di un numero più grande.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/distanza-di-lettura-dm-sans-12pt.svg"),
  [DM Sans 12 pt: avvicina e allontana il foglio.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "DM Sans 12 pt: avvicina e allontana il foglio.", width: 187.09pt,
) <fig-tipo-344b>

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/pari-corpo-dm-sans-eb-garamond.svg"),
  [Pari corpo, altezze diverse: DM Sans ed EB Garamond a 24 pt.], diritti: [DM Sans, ©2014 The DM Sans Project Authors. EB Garamond, ©2017 The EB Garamond Project Authors. SIL OFL 1.1.],
  alt: "Pari corpo, altezze diverse: DM Sans ed EB Garamond a 24 pt.", width: 187.09pt,
) <fig-tipo-344c>

=== L’interlinea

In una composizione uniforme, l’interlinea si misura come *distanza fra le linee di base* di due righe successive. Non coincide con la fascia bianca che sembra separare le lettere: questa dipende anche da ascendenti, discendenti e altezza delle minuscole. Due font con la stessa interlinea possono quindi produrre ritmi diversi. Leggere la misura dalla baseline aiuta a non confondere il parametro con il suo effetto visibile.

Una distanza troppo ridotta può avvicinare estensioni e accenti alle lettere della riga vicina e rendere più incerto il passaggio. Una distanza molto ampia può invece far percepire ogni riga come un’unità isolata. La scelta non va fatta soltanto per riempire una pagina. Occorre seguire il testo, osservare come si ritrova la *riga successiva* e valutare la relazione con la sua lunghezza. Quando la riga si allunga, un ritmo verticale diverso può aiutare; quando è breve, lo stesso aumento può risultare eccessivo.

Nel CSS line-height controlla l’altezza delle line box. In righe semplici con font e corpo uniformi, la relazione con la distanza fra le baseline è diretta; con elementi in linea, segni di dimensioni diverse o font di riserva, bisogna controllare il risultato effettivo. Il valore numerico dichiarato non autorizza a ignorare ciò che accade ai contorni.#nota-compatta([W3C, CSS 2.1, § 10.8: calcolo dell’altezza delle righe.], "https://www.w3.org/TR/CSS2/visudet.html#line-height")

La @fig-tipo-344d presenta una prova che mantiene costanti testo, font, peso, corpo e larghezza e *modifica soltanto l’interlinea*. Il confronto mostra il costo di ciascuna scelta, ma non consegna un rapporto valido per tutti. Anche l’eventuale personalizzazione del lettore va prevista: la distanza fra le righe non è un ornamento fisso, ma una condizione attraverso cui il testo può diventare più adatto a chi lo legge.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/interlinea-14-18pt.svg"),
  [Interlinea: 14 e 18 pt, con lo stesso corpo.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Interlinea: 14 e 18 pt, con lo stesso corpo.", width: 187.09pt,
) <fig-tipo-344d>

=== Giustezza e struttura del paragrafo

La giustezza è la *larghezza disponibile* per la composizione della riga. Una colonna molto stretta interrompe spesso le frasi e moltiplica i ritorni a capo; una molto ampia può rendere difficile ritrovare il punto da cui ripartire. Non basta contarne le parole: lingue, font, corpi e contenuti occupano lo spazio in modo diverso. Un testo ricco di abbreviazioni o numeri non si comporta come una pagina di prosa narrativa. La @fig-tipo-344e rende visibile come una diversa giustezza cambi i ritorni a capo.

L’indicazione di circa 50–75 caratteri per riga, spazi compresi, può essere un riferimento iniziale per alcune composizioni di testo continuo latino. *Non è una legge percettiva* né una misura da imporre a ogni supporto. Il criterio WCAG 1.4.8, di livello AAA, considera fra le proprie condizioni la possibilità di contenere la larghezza entro 80 caratteri o glifi, 40 per CJK: si tratta di un requisito specifico di presentazione, non della dimostrazione di una lunghezza ottimale universale. Anche l’unità ch offre soltanto una stima dell’ingombro, non un conteggio esatto delle lettere che entreranno nella riga @t06-wcag2024.#nota-compatta([W3C (2024), WCAG 1.4.8 (AAA); documento esplicativo Understanding.], ("https://www.w3.org/TR/WCAG22/#visual-presentation", "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html"))

Il paragrafo organizza invece il procedere del discorso. Il rientro della prima riga e l’intervallo fra i blocchi sono due convenzioni per segnalarne l’inizio. Non appartengono rigidamente alla carta o al web: la scelta dipende dal testo e dalla continuità che si vuole rendere riconoscibile. Usare rientri e grandi intervalli insieme senza una ragione può duplicare il segnale; non è però vietato combinarli quando hanno funzioni distinte e coerenti.

La separazione deve *corrispondere al contenuto*. Inserire pause a intervalli regolari può frammentare un ragionamento che dovrebbe restare unito; eliminarle tutte può nascondere il passaggio fra idee. Il controllo prosegue fra pagine e colonne: le prime o le ultime righe di un paragrafo possono rimanere isolate, formando vedove e orfane. Le impostazioni di composizione aiutano a mantenere più righe insieme.#nota-compatta([W3C, CSS Fragmentation 3, § 3.3: orphans e widows. Candidate Recommendation, 2018.], "https://www.w3.org/TR/css-break-3/#widows-orphans")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/giustezza-e-ritorni-a-capo.svg"),
  [DM Sans 12/14 pt: cambia la giustezza.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "DM Sans 12/14 pt: cambia la giustezza.", width: 187.09pt,
) <fig-tipo-344e>

=== Allineamento e sillabazione

L’allineamento, confrontato nella @fig-tipo-344f, stabilisce come le righe si dispongono rispetto ai bordi del testo. Nella bandiera sinistra l’inizio rimane stabile e le chiusure variano; nella bandiera destra avviene il contrario. Nel centrato cambia il punto di partenza di ogni riga. Il giustificato porta invece le righe ai due margini distribuendo lo spazio secondo il sistema di composizione. Per un testo italiano continuo, *un inizio riconoscibile* facilita il ritorno al rigo; altre scritture e altri compiti richiedono di considerare direzioni e convenzioni proprie.

Il centrato può essere adatto a poche parole o a una composizione intenzionale, ma un lungo paragrafo centrato obbliga a cercare ogni nuovo inizio. La bandiera mantiene più stabile lo spazio fra parole, lasciando variabile il bordo esterno. Il giustificato offre invece un blocco regolare, ma deve trovare punti di interruzione sufficienti. Nelle colonne strette può generare intervalli molto diversi e percorsi bianchi che attraversano le righe, spesso chiamati fiumi.

La sillabazione aiuta il sistema a distribuire il testo, ma richiede *la lingua corretta* e un controllo delle divisioni. Nomi propri, sigle, termini tecnici e sequenze di trattini in fine riga meritano una revisione. Non conviene correggere ogni riga inserendo spazi o interruzioni manuali che perderanno senso quando il testo cambierà misura. Il lavoro deve agire sulle proprietà della composizione e poi controllarne gli esiti.

La scelta non è quindi fra un allineamento bello e uno brutto in assoluto. Nel libro stampato è possibile rifinire una condizione relativamente stabile; nel web la stessa frase può assumere molte larghezze. Il progetto deve reggere queste variazioni. Una soluzione è convincente quando mantiene un *ritmo leggibile nelle condizioni reali*, oltre a produrre un bordo gradevole nel campione iniziale.#nota-compatta([W3C, CSS Text 3: allineamento, giustificazione e sillabazione. Candidate Recommendation Draft, 2026.], "https://www.w3.org/TR/css-text-3/")

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/allineamento-sinistra-centrato-giustificato.svg"),
  [Stesso testo in DM Sans 12/14 pt: cambia soltanto l’allineamento.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Stesso testo in DM Sans 12/14 pt: cambia soltanto l’allineamento.", width: 137mm, placement: top, scope: "parent",
) <fig-tipo-344f>

=== Kerning, tracking e spazi fra parole

La distanza fra due lettere non si giudica soltanto con il righello. Una A accanto a una V lascia un vuoto diverso da quello che appare fra due aste verticali. La crenatura, o kerning, regola *specifici accostamenti* in relazione alle loro forme. Il font può contenere dati che il sistema di composizione applica alle coppie; in OpenType, le operazioni di posizionamento possono essere definite nella tabella GPOS. La scelta delle coppie e dei valori appartiene al disegno della famiglia, non a una formula identica per ogni alfabeto. Il confronto fra le @fig-tipo-345 e @fig-tipo-346 mantiene gli stessi contorni, lo stesso corpo e le stesse coppie AV, VA e To. Cambia l’applicazione dei valori di kerning ricavati dal file. I campioni permettono di osservare il vuoto senza sostituire una forma autentica con una simulazione inventata. La correzione può essere negativa o positiva: il suo scopo è rendere coerente il ritmo, non avvicinare indiscriminatamente tutti i segni.

Il tracking agisce invece sulla *spaziatura complessiva di una sequenza*. Nel CSS letter-spacing aggiunge o sottrae spazio fra le unità tipografiche interessate; word-spacing interviene sui *separatori fra parole*. Sono controlli diversi e non vanno usati come se fossero intercambiabili. Un titolo maiuscolo può richiedere una diversa apertura, ma il tracking di un paragrafo non dovrebbe essere alterato pesantemente per risolvere una sola riga @t06-gpos.#sito([Microsoft, OpenType GPOS.], "https://learn.microsoft.com/en-us/typography/opentype/spec/gpos") La @fig-tipo-346a distingue visivamente il tracking dallo spazio fra parole.

Una spaziatura troppo serrata può fondere i segni; una troppo aperta può indebolire la parola. Anche qui la scrittura conta: sistemi con lettere connesse, come l’arabo, non possono ricevere automaticamente gli stessi interventi pensati per il latino. L’osservazione deve includere unità, connessioni e regole del testo effettivo.

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/roboto-serif-senza-kerning.svg"),
  [Roboto Serif senza kerning: AVATAR a 32 pt, coppie a 20 pt. Contorni autentici, non deformati.], diritti: [Campione originale. Roboto Serif, ©2020 The Roboto Serif Project Authors; etichette DM Sans. SIL OFL 1.1.],
  alt: "Roboto Serif senza kerning: AVATAR a 32 pt, coppie a 20 pt. Contorni autentici, non deformati.", width: 187.09pt,
) <fig-tipo-345>
],
[#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/roboto-serif-con-kerning.svg"),
  [Stessi glifi e corpi, kerning attivo: cambiano gli accostamenti AV, VA e To, non le forme.], diritti: [Campione originale. Roboto Serif, ©2020 The Roboto Serif Project Authors; etichette DM Sans. SIL OFL 1.1.],
  alt: "Stessi glifi e corpi, kerning attivo: cambiano gli accostamenti AV, VA e To, non le forme.", width: 187.09pt,
) <fig-tipo-346>
],
  )
]

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/tracking-e-spazi-fra-parole.svg"),
  [DM Sans: tracking a 26 pt, incrementi −0,8/0/+1,6 pt. Sotto, testo a 12 pt: cambia solo lo spazio fra parole, di 0/+3 pt. Le lettere non cambiano forma.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "DM Sans: tracking a 26 pt, incrementi −0,8/0/+1,6 pt. Sotto, testo a 12 pt: cambia solo lo spazio fra parole, di 0/+3 pt. Le lettere non cambiano forma.", width: 187.09pt,
) <fig-tipo-346a>

=== Unità di misura e colore tipografico

Per regolare la tipografia occorre capire a quale grandezza si riferisce ogni unità. L’_em_ è legato al *corpo del carattere*: se il font-size calcolato è 16 CSS pixel, un _em_ corrisponde a 16 CSS pixel. Non è la larghezza della M, che dipende dal suo disegno. Quando _em_ compare nella proprietà font-size, il riferimento è invece la dimensione ereditata. Questa distinzione spiega perché le stesse unità possano produrre risultati diversi se applicate a proprietà differenti.

Nella terminologia tipografica un en è mezzo _em_. Il CSS non dispone però di un’unità di lunghezza chiamata en: mezzo _em_ si scrive 0.5em, con il punto decimale e senza spazio fra numero e unità. Rem fa riferimento al corpo della radice del documento. Nel testo latino orizzontale, ch si basa *sull’avanzamento del glifo zero* del font usato, non sulla larghezza media di tutte le lettere. È utile per stimare uno spazio testuale, ma una misura di 60 ch non promette esattamente 60 caratteri in ogni riga @t06-css-values2024.#sito([W3C (2024), unità relative al font.], "https://www.w3.org/TR/css-values-4/#font-relative-lengths")

Accanto alle misure esiste una qualità d’insieme che si percepisce anche allontanando lo sguardo: il *colore tipografico*. Un blocco di lettere nere può apparire più chiaro o più scuro senza cambiare il colore dei glifi. Peso, frequenza dei tratti, spazi fra lettere e parole e distanza fra righe distribuiscono pieni e vuoti. Questa densità è ciò che si osserva quando si confronta la tessitura di due paragrafi. Nella @fig-tipo-346b varia soltanto il peso del carattere.

Il colore tipografico *non coincide con il contrasto cromatico* fra testo e sfondo e non misura da solo la facilità di lettura. Un blocco più scuro può derivare da un peso maggiore oppure da spazi più stretti: due cause con conseguenze differenti. Per capire il risultato conviene cambiare una variabile alla volta, osservare l’insieme e poi tornare alle singole parole.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/peso-e-colore-tipografico.svg"),
  [Stesse parole e nero; DM Sans 12/14 pt, pesi 400 e 700. Osserva la densità.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Stesse parole e nero; DM Sans 12/14 pt, pesi 400 e 700. Osserva la densità.", width: 137mm, placement: top, scope: "parent",
) <fig-tipo-346b>

=== Leggibilità ed evidenze sperimentali

Il confronto fra serif e sans serif è spesso trasformato in una regola semplice: grazie per la carta, assenza di grazie per lo schermo. Questa scorciatoia nasconde differenze decisive fra i singoli caratteri e fra le condizioni di lettura. Corpo, spessore, spaziatura e qualità della riproduzione possono contare più dell’etichetta. Un serif progettato per piccoli corpi non va confrontato soltanto con un sans scelto per un grande titolo, come se cambiasse una sola caratteristica.

Nello studio _Serifs and font legibility_, _Arditi_ e _Cho_ hanno controllato la presenza e la dimensione delle grazie in caratteri sperimentali, osservando soglie di riconoscimento e velocità di lettura. I risultati *non forniscono un vantaggio generale* della categoria serif nella lettura continua. Il valore didattico del lavoro sta anche nel metodo: *isolare una caratteristica* permette di distinguere il suo effetto da quello di tutte le altre differenze presenti in due famiglie commerciali @t06-arditi2005.#sito([_Arditi_ e _Cho_ (2005).], "https://doi.org/10.1016/j.visres.2005.06.013")

Un’analoga prudenza serve per i caratteri promossi specificamente per la dislessia. _Kuster_ e collaboratori, in due esperimenti con bambini con e senza dislessia, non hanno osservato una maggiore velocità o accuratezza con Dyslexie rispetto ai caratteri di confronto @t06-kuster2018.#sito([_Kuster_ et al. (2018).], "https://doi.org/10.1007/s11881-017-0154-6") _Wery_ e _Diliberto_ non hanno trovato benefici di OpenDyslexic nelle prove del loro studio @t06-wery2017.#sito([_Wery_ e _Diliberto_ (2017).], "https://doi.org/10.1007/s11881-016-0127-1") Questi risultati non annullano le preferenze delle persone e non dimostrano che tutti i caratteri abbiano sempre lo stesso effetto. Impediscono però di presentare un font come una soluzione universale o una cura.

La scelta responsabile unisce *evidenze e prove contestuali*. Si può offrire una presentazione iniziale ragionata e lasciare spazio a dimensioni e spaziature differenti. Il carattere sostiene la lettura attraverso le sue proprietà concrete; la sua promessa commerciale, da sola, non può diventare una conclusione scientifica.


// Campioni documentari, senza numero: non sono gli stimoli degli esperimenti.
#confronto[
  #block(breakable: false)[
    #set par(justify: false, leading: 2pt)
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#text(size: 10pt, weight: 500)[Dyslexie Regular · dettaglio]
        #v(4pt)
        #box(width: 100%, height: 54pt, align(left + horizon,
          image(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/dyslexie-dettaglio-pdf-ufficiale-2015.png"),
            width: 136.138pt, alt: "Dyslexie Regular: dettaglio del PDF ufficiale 2015.")))],
      [#text(size: 10pt, weight: 500)[OpenDyslexic Regular]
        #v(4pt)
        #box(width: 100%, height: 54pt, align(left + horizon,
          image(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/opendyslexic-regular-campione.svg"),
            width: 87.048pt, alt: "Campione autentico OpenDyslexic Regular 0.990.")))],
    )
    #v(4pt)
    #text(size: 9pt, weight: 300)[Campioni Dyslexie e OpenDyslexic: esempi, non stimoli degli studi.]
    #v(4pt)
    #testo-diritti[Dyslexie: dettaglio del PDF ufficiale del 2015. OpenDyslexic 0.990: © Abbie Gonzalez; SIL OFL 1.1.]
  ]
]

I due campioni documentari permettono di osservare i caratteri citati.#nota-compatta([Dyslexie, PDF ufficiale2015. OpenDyslexic, file originali, versione e licenza.], ("https://dyslexiefont.com/wp-content/uploads/2024/04/adults-example-text-eng.pdf", "https://github.com/antijingoist/opendyslexic"))

=== Quando il lettore cambia la composizione <sec-tipo-reflow>

Sul web il testo può cambiare corpo e ingombro dopo la pubblicazione. Il lettore può ingrandire, usare una finestra più stretta o applicare le proprie preferenze di spaziatura. La qualità tipografica comprende la capacità di accompagnare questi cambiamenti: lettere leggibili alla prima apertura non bastano se, aumentando il testo, le ultime righe vengono tagliate o si sovrappongono a quelle successive.

WCAG 1.4.4 (AA) richiede testo ingrandibile fino al 200 per cento senza richiedere tecnologie assistive e *senza perdita di contenuto o funzioni*. Sono esclusi sottotitoli dei media e immagini di testo @t06-wcag2024.#sito([W3C (2024), WCAG 1.4.4 (AA).], "https://www.w3.org/TR/WCAG22/#resize-text") La ricomposizione, o reflow (1.4.10, AA), richiede contenuti e funzioni integri senza scorrimento su entrambi gli assi: il testo orizzontale si verifica a 320 CSS pixel di larghezza. Sono esenti solo le parti che richiedono due dimensioni per uso o significato. Rimpicciolire l’intera pagina non equivale a permettere che le *righe si ricompongano*.#sito([W3C (2024), WCAG 1.4.10 (AA).], "https://www.w3.org/TR/WCAG22/#reflow")

Il criterio 1.4.12 riguarda le modifiche simultanee alla spaziatura: interlinea almeno 1,5 volte il corpo, spazio dopo i paragrafi almeno 2 volte, lettere almeno 0,12 _em_ e parole almeno 0,16 _em_. Questi valori definiscono una *prova di adattamento* nei contenuti a cui il criterio si applica. *Non sono una ricetta* che obbliga a comporre ogni testo con quelle distanze, né il requisito impone di aggiungere un pannello di personalizzazione dentro ogni sito.#sito([W3C (2024), WCAG 1.4.12 (AA).], "https://www.w3.org/TR/WCAG22/#text-spacing")

Il controllo tipografico consiste nel verificare che, applicando queste condizioni, le parole restino disponibili e le righe continuino a trovare spazio. I contenitori devono poter crescere e i titoli andare a capo quando serve. Una composizione solida conserva il proprio intento anche quando smette di coincidere con il campione iniziale. Le verifiche più ampie dell’accessibilità appartengono alla sezione dedicata; qui il punto è permettere al testo di cambiare senza perdere la possibilità di essere letto. La @fig-tipo-346c mostra lo stesso testo ricomposto in due larghezze, a corpo costante.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/leggibilita/reflow-stesso-testo-due-giustezze.svg"),
  [Stesso testo e corpo in due giustezze. Riducendo la larghezza aumentano le righe: il contenitore cresce, senza tagliare parole o rimpicciolire i caratteri.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Stesso testo e corpo in due giustezze. Riducendo la larghezza aumentano le righe: il contenitore cresce, senza tagliare parole o rimpicciolire i caratteri.", width: 187.09pt,
) <fig-tipo-346c>
]
#[
// Consigli utili, tavole470–486: testo continuo e riferimenti automatici.
// I campioni sono separati dalla prosa; le continuazioni Figma sono ricongiunte.
// Il titolo usa per ora il ruolo ordinario: la variante locale è ancora in valutazione.
#import "../template/stile.typ": sito
#import "../template/editoriale.typ": nota-compatta
#import "../template/consigli-tipografia.typ": prenotazione, ruoli, larghezza, corsivo, ortotipografia, enfasi, collegamenti, fallback, interlinea, esercizio

== Consigli utili

=== Cominciare dalle parole che saranno davvero lette

La scelta di un carattere diventa più affidabile quando parte dal contenuto effettivo.

Un alfabetiere e una bella parola mostrano alcune qualità del disegno, ma non anticipano tutto ciò che accadrà in una pagina. Prepara un campione con i testi del progetto: un titolo che possa andare a capo, due paragrafi consecutivi e i nomi, le date, gli importi, i codici o i termini tecnici realmente previsti. Il campione della @fig-tipo-347 riunisce questi elementi @t06-lowvision2016.#sito([W3C (2016), Low Vision Requirements, Working Draft.], "https://www.w3.org/TR/low-vision-needs/")

Il campione va letto alla *dimensione d’impiego*. Ingrandirlo serve poi a capire i dettagli, ma non sostituisce questa prova. Annota un problema osservabile: «la I, la l e l’1 si confondono in questo codice», «perdo l’inizio della riga successiva» oppure «non ritrovo la scadenza». Queste indicazioni aiutano a cercare una soluzione; «il font non funziona» lascia aperte troppe interpretazioni. Il campione illustrato simula una prenotazione: nel progetto va sostituito con il contenuto effettivo.

Anche gli strumenti di ricerca e abbinamento, come i cataloghi delle fonderie o i generatori di coppie tipografiche, sono utili soprattutto per restringere il campo. La popolarità di un carattere su altri siti non dimostra che sia adatto al testo che stiamo progettando. Un confronto fra famiglie deve quindi essere riportato ai requisiti del progetto, senza trasformare una raccomandazione automatica in una decisione finale.

Il primo esito del lavoro non è necessariamente un nome definitivo. Può essere una breve lista di alternative che possiedono i segni, gli stili e le prestazioni richieste. Da quella lista si passa alla prova: una scelta grafica diventa argomentabile quando possiamo spiegare *quale problema risolve* e quali compromessi comporta.

#prenotazione()

=== Abbinare le famiglie e definirne i ruoli

Una famiglia ben articolata può sostenere molti compiti senza richiedere continui cambiamenti di carattere.

Prima di aggiungere un’altra famiglia, conviene verificare se pesi, corsivi, larghezze e funzioni già disponibili sono sufficienti. Il vantaggio non è la riduzione numerica in sé: è la possibilità di mantenere un rapporto riconoscibile fra le parti del testo e di controllare più facilmente il risultato @t06-carbon2026.#sito([IBM (2026), Carbon: Typography.], "https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets")

La prudente indicazione di lavorare con poche famiglie non coincide con una legge che vieta di superare il numero tre. Un progetto editoriale può usare una voce per la lettura e un’altra per titoli o citazioni; un repertorio multilingue può richiedere integrazioni ulteriori. L’importante è *assegnare una ragione a ciascuna presenza* e applicarla con coerenza. Se due caratteri cambiano continuamente ruolo, il lettore deve ricostruire ogni volta il criterio. La @fig-tipo-348 rende visibili tre ruoli nella stessa famiglia.

Negli abbinamenti va osservata anche la convivenza materiale. Due font allo stesso corpo possono mostrare altezze apparenti diverse; un corsivo può sembrare più sottile del testo vicino; le cifre possono creare una tessitura incompatibile con il paragrafo. Prima di scegliere sulla base di una somiglianza o di un contrasto interessante, bisogna comporre almeno alcune righe in cui le famiglie si incontrano.

È utile inoltre definire stili di testo ripetibili, invece di correggere ogni occorrenza separatamente. Il sistema può fissare corpo, peso e interlinea per una funzione e prevedere eccezioni motivate per casi speciali. Carbon, per esempio, documenta ruoli e misure del proprio sistema: è un caso di applicazione, non una scala universale. Definire gli stili permette di introdurre differenze intenzionali e riconoscere un cambiamento dovuto a un errore di applicazione @t06-carbon2026.#sito([IBM (2026), ruoli e stili di testo.], "https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets")

#ruoli()

=== Far entrare il testo senza schiacciare le lettere

Quando una frase non entra, la prima tentazione può essere ridurre orizzontalmente il testo fino a occupare lo spazio disponibile. La trasformazione geometrica modifica però insieme proporzioni, spessori e vuoti. Una O diventa più stretta senza che i suoi tratti vengano compensati; le grazie e le curve seguono la stessa deformazione. La parola può sembrare adattata al contenitore, ma il suo disegno non è più quello progettato.

Il confronto fra @fig-tipo-349 e @fig-tipo-350 mostra un’alternativa reale: usare un asse di larghezza del font, identificato dal tag wdth. Una variante condensed o un asse di larghezza appartengono a un progetto che coordina le forme lungo la variazione. Il valore wdth 75 identifica una posizione nell’asse: non impone che ogni parola sia larga esattamente il 75% della versione normale. La disponibilità va verificata nel file; il nome «condensed» non autorizza a produrre una variante artificiale @t06-wdth2021.#nota-compatta([Microsoft (2021), asse wdth. Roboto Serif: originali e licenza.], ("https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_wdth", "https://github.com/google/fonts/tree/main/ofl/robotoserif"))

Lo stesso controllo riguarda grassetto, corsivo e maiuscoletto. Uno stile disegnato, anche un obliquo progettato, è diverso da una simulazione del software. Un corsivo autentico può cambiare la struttura di a, f e g; un maiuscoletto progettato conserva spessori e proporzioni che le maiuscole ridotte possono perdere. Sul web, verifica che gli stili e le funzioni richiesti siano anche distribuiti e dichiarati correttamente: se mancano, il browser può sostituirli o simularli. Durante la prova, disattivare le simulazioni aiuta a riconoscere le varianti mancanti @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: simulazioni.], "https://www.w3.org/TR/css-fonts-4/") La @fig-tipo-350a confronta un corsivo autentico con un tondo inclinato.

Se la famiglia non offre ciò che serve, si può modificare il corpo, rivedere la formulazione, accettare un ritorno a capo oppure scegliere un’altra famiglia. La soluzione va decisa in rapporto al testo. La capienza di una riga è un vincolo reale, ma non dovrebbe essere risolta distruggendo proprio le qualità del carattere che avevano motivato la scelta @t06-eb-garamond.#sito([EB Garamond: famiglia e stili originali.], "https://github.com/google/fonts/tree/main/ofl/ebgaramond")

#larghezza()

#corsivo()

=== La revisione ortotipografica

Un buon carattere non può correggere da solo una lettera sbagliata. Anche in maiuscolo, le vocali mantengono l’accento richiesto: È, CITTÀ e PERCHÉ non vanno sostituite con lettere seguite dall’apostrofo. Controlla l’accento di ogni parola: È e CAFFÈ hanno la è grave; PERCHÉ e VENTITRÉ la é acuta. La revisione del testo precede il giudizio sulla resa del font, perché una sostituzione impropria cambia il contenuto oltre alla sua forma @t06-crusca2002.#sito([Accademia della Crusca (2002), accenti.], "https://accademiadellacrusca.it/it/consulenza/vademecum-sullaccento-quando-indicarlo-e-dove-pronunciarlo/34") @t06-marzullo2003.#sito([_Mara Marzullo_ (2003), accenti e apostrofi.], "https://accademiadellacrusca.it/it/consulenza/guida-alluso-di-accenti-e-apostrofi-nellitaliano/100")

Nel testo composto, l’apostrofo tipografico ’ è distinto dal segno diritto usato in molti formati informatici. Le virgolette possono seguire una convenzione editoriale italiana, come «queste», con una coppia diversa per le citazioni interne. Scegli un criterio e applicalo all’intero lavoro. Uno stesso carattere può avere più usi: ’ può essere apostrofo o virgoletta di chiusura; la funzione dipende dal contesto. Non confonderlo con la virgoletta di apertura ‘ o con il simbolo di misura ′ @t06-unicode17.#nota-compatta([Unicode 17, capitolo6: segni e punteggiatura. Unicode, General Punctuation.], ("https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-6/", "https://www.unicode.org/charts/PDF/U2000.pdf"))

Nei campioni, il trattino collega «tecnico-scientifico», la lineetta esprime l’intervallo «10–12» e il meno indica «−5». Sono caratteri distinti, anche quando il font li disegna in modo simile. La lineetta può anche delimitare un inciso, secondo la convenzione editoriale scelta. Controlla le sostituzioni automatiche: codice, URL, indirizzi e dati strutturati devono conservare i caratteri richiesti dal formato. La @fig-tipo-351 mette a confronto segni con funzioni diverse.

Fra numero e unità, uno spazio non separabile può evitare che «10 kg» si divida a fine riga. Usalo solo nei gruppi che devono restare insieme e controlla che possano andare a capo senza uscire dal contenitore. Verifica anche che il font contenga *tutti i segni necessari*: un accento, un simbolo valutario o una parentesi provenienti da un font di riserva involontario possono interrompere la continuità visiva del testo. Correggere questi casi fa parte della revisione, prima della consegna @t06-uax14-2026.#nota-compatta([_Leroy_ (2026), UAX 14: spazi non separabili. Unicode, Mathematical Operators: segno meno.], ("https://www.unicode.org/reports/tr14/#GL", "https://www.unicode.org/charts/PDF/U2200.pdf"))

#ortotipografia()

=== Dare enfasi senza alzare sempre la voce

Il maiuscolo può essere efficace in un titolo breve, in una sigla o in una convenzione editoriale precisa.

Estenderlo a un lungo testo cambia profilo e ingombro delle parole e può rendere la lettura più impegnativa. L’effetto dipende anche dal corpo e dalle esigenze del lettore: va osservato su un intero passaggio, non soltanto su un’etichetta di due parole @t06-arditi2007.#sito([_Arditi_ e _Cho_ (2007): corpo e condizioni visive.], "https://pmc.ncbi.nlm.nih.gov/articles/PMC2016788/") Le indicazioni di una guida come GOV.UK esprimono anche convenzioni del servizio e non costituiscono divieti universali @t06-govuk-style.#sito([Government Digital Service, capitalisation.], "https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/#capitalisation")

Anche grassetto e corsivo funzionano meglio quando hanno *un compito definito*. Se quasi tutto il testo è marcato come importante, l’enfasi perde capacità di distinguere. Un peso molto scuro può chiudere alcuni spazi interni in piccolo; un corsivo usato per molte righe può assumere una voce diversa dal corpo. Non significa che queste scelte siano sbagliate in assoluto: richiedono una prova nell’estensione e nella misura previste.

Prima di aumentare il peso, decidi quale informazione debba essere ritrovata. Nel campione la domanda è: «Fino a che ora resta valida la prenotazione?». Confronta il paragrafo tutto in grassetto con quello che marca solo «fino alle 18»: osserva quale differenza segnala la scadenza. Per un compito diverso potrebbe servire un’altra enfasi. Nella @fig-tipo-352 cambia soltanto l’estensione del grassetto.

Nel testo continuo, convenzioni stabili aiutano il lettore a riconoscere i segnali: una citazione, un titolo d’opera o un richiamo non dovrebbero cambiare trattamento senza ragione. L’enfasi può essere sobria oppure intensa, purché conservi la possibilità di leggere il contenuto e distinguere ciò che conta. Se le marcature non aiutano il compito previsto, riducile o cambia quali parole metti in evidenza @t06-carbon2026.#sito([IBM (2026), stili tipografici.], "https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets")

#enfasi()

=== Contrasto e riconoscibilità dei link

La scelta del font perde efficacia se le lettere si distinguono a fatica dallo sfondo.

Un testo sottile e molto chiaro può sembrare delicato nel campione ingrandito e diventare poco leggibile al corpo d’uso. Il controllo deve riguardare la *combinazione effettiva*: testo su carta bianca, sopra una fotografia o entro una superficie colorata non pongono la stessa condizione. Se l’immagine varia sotto le parole, il contrasto va valutato nelle zone che esse attraversano.

Per il testo web ordinario, WCAG 1.4.3, livello AA, richiede almeno 4,5:1 fra testo e sfondo; per il testo grande, almeno 3:1. Grande significa almeno 18 punti, oppure 14 punti in grassetto, con le equivalenze previste per altre scritture. Il valore calcolato deve raggiungere la soglia prima dell’arrotondamento. Il rapporto è una verifica necessaria nei casi a cui si applica, ma non esaurisce la qualità della resa: corpo minuto e tratti fragili restano problemi da osservare @t06-wcag2024.#sito([W3C (2024), WCAG 1.4.3 (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")

Dentro un paragrafo, la sottolineatura offre un segnale riconoscibile anche senza distinguere le tinte. Se si sceglie di ometterla, non basta un blu diverso: la tecnica W3C G183 usa almeno 3:1 fra collegamento e testo circostante. È un confronto distinto da quello fra testo e sfondo, che per il testo web ordinario deve comunque raggiungere 4,5:1. La sottolineatura va collocata con attenzione, così da non confondersi con i discendenti delle lettere. La @fig-tipo-353 mostra due modi di segnalare il medesimo collegamento @t06-w3c-g183.#nota-compatta([W3C, tecnica G183: contrasto fra link e testo circostante. W3C, Understanding Use of Color, 1.4.1 (A).], ("https://www.w3.org/WAI/WCAG22/Techniques/general/G183", "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"))

Scegli parole che facciano capire che cosa si troverà seguendo il collegamento. Quando serve il contesto, deve essere associato al link anche nella struttura della pagina, per esempio nello stesso paragrafo. Un’etichetta comprensibile da sola rimane una scelta utile quando possibile @t06-wcag2024.#sito([W3C, Link Purpose (In Context), 2.4.4 (A).], "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html")

Anche per le evidenziazioni conviene mantenere una *convenzione stabile* e non moltiplicare sottolineature decorative che sembrino collegamenti. Qui interessa la distinzione visibile fra testo ordinario e testo marcato; le modalità di attivazione e gli altri aspetti dell’interazione vengono affrontati nelle sezioni dedicate. La tipografia contribuisce offrendo un segnale riconoscibile prima ancora che il lettore decida di usarlo.

#collegamenti()

=== Verificare caricamento e fallback

Il carattere previsto dal progetto può non essere disponibile quando si apre una pagina web.

Il browser può mostrare un *font di riserva* mentre scarica il webfont oppure mantenerlo se il file non arriva. Il descrittore CSS font-display regola l’attesa e la possibilità di sostituzione, non la velocità del download. Con swap il font può sostituire il fallback anche se arriva tardi; con fallback e optional questa possibilità è limitata. La scelta va osservata sia quando il testo compare sia quando il font cambia @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: font-display.], "https://www.w3.org/TR/css-fonts-4/") @t06-font-best2022.#sito([_Hempenius_ e _Pollard_ (2022), Best practices for fonts.], "https://web.dev/articles/font-best-practices")

Nel browser, svuota la cache e ricarica la pagina rallentando o bloccando il webfont. Controlla che il font di riserva sia disponibile e che titoli, pulsanti e contenuti successivi si ricompongano senza tagli. Ripeti la prova con il font principale caricato. La sequenza dei font di riserva termina con una famiglia generica: il file installato sul computer del progettista potrebbe mancare sul dispositivo del lettore.

Le proporzioni del fallback possono *cambiare i ritorni a capo* e l’ingombro della pagina. Lettere più larghe allungano un titolo; un’altezza apparente diversa può far sembrare il corpo più piccolo o più grande. Nel CSS, size-adjust può avvicinare la scala e ascent-override, descent-override e line-gap-override possono avvicinare le metriche verticali. I valori si misurano per la coppia scelta e si provano nel browser: non eliminano automaticamente ogni differenza di impaginazione. La @fig-tipo-354 conserva contenuto e larghezza e cambia la famiglia @t06-argyle2021.#sito([_Adam Argyle_ (2021), size-adjust.], "https://web.dev/articles/css-size-adjust")

Distribuisci gli stili e i repertori necessari, conservando anche i segni dei contenuti futuri prevedibili e le funzioni tipografiche richieste. Togliere accenti o simboli per ridurre i file può provocare sostituzioni nelle parole. Un font variabile riunisce più varianti, ma non è sempre più leggero di un singolo stile statico: confronta formati, repertori e stili che il progetto consegnerà davvero.

Controlla anche la licenza: usare un font sul computer o incorporarlo in un documento non implica automaticamente il diritto di distribuirlo con un’applicazione o servirlo dal sito. DM Sans e Sora, per esempio, sono distribuiti con la SIL Open Font License, che permette l’uso come webfont rispettandone le condizioni. La FAQ Microsoft riguarda invece i font forniti con Windows. Identifica file e versione e conserva la licenza applicabile: le condizioni di un font non si trasferiscono a un altro @t06-ofl2007.#sito([SIL International, OFL FAQ: uso web.], "https://openfontlicense.org/ofl-faq/#2-using-ofl-fonts-for-webpages-and-online-webfont-services") @t06-font-redistribution.#sito([Microsoft, Font redistribution FAQ.], "https://learn.microsoft.com/en-us/typography/fonts/font-faq")

#fallback()

=== Confrontare una scelta alla volta

Una pagina ordinata può contenere un carattere mancante, una parola divisa male, un corsivo simulato o una riga che scompare quando il testo aumenta.

La revisione parte dalle condizioni che il lettore incontrerà e dai passaggi più impegnativi. Prima di cambiare una misura, formula il problema che la modifica dovrebbe risolvere.

Per confrontare due interlinee mantieni testo, font, corpo e larghezza uguali. Leggi l’intero paragrafo e segna dove perdi l’inizio della riga successiva, ripeti una riga o salti una parola. Se una variante riduce questi problemi senza crearne altri nel formato finale, conserva la modifica e ricontrolla la pagina. Cambiare una scelta alla volta aiuta a diagnosticare il problema; corpo, riga e interlinea vanno poi osservati insieme. Nella @fig-tipo-355 cambia soltanto l’interlinea.

Confrontare due famiglie allo stesso corpo mostra che cosa accade sostituendo il font nelle misure già impostate. Per confrontarle a una scala simile, dichiara come le hai pareggiate, per esempio attraverso l’altezza della x: non diventano identiche per proporzioni e spazi. Registra font, versione, peso, corpo e larghezza. Se il font dispone di un asse ottico opsz, annotane anche l’impostazione: modifica il disegno senza cambiare il corpo nominale ed è distinto dalla correzione della presenza apparente fra famiglie @t06-opsz2024.#sito([Microsoft (2024), asse opsz.], "https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_opsz")

Con altre persone, definisci prima il compito: copiare un codice, trovare una scadenza o leggere e spiegare un passaggio. Annota errori, esitazioni e risultato; se cronometri la lettura, controlla anche la comprensione. Alterna l’ordine dei campioni e, quando il testo già letto faciliterebbe la risposta, usa brani equivalenti. Chiedere quale campione piace raccoglie invece una preferenza. Riporta che cosa hai osservato e con chi: una prova esplorativa non stabilisce una classifica generale dei font @t06-arditi2005.#sito([_Arditi_ e _Cho_ (2005), confronti controllati.], "https://pmc.ncbi.nlm.nih.gov/articles/PMC4612630/") @t06-wallace2022.#sito([_Wallace_ et al. (2022), Towards Individuated Reading Experiences.], "https://jdobr.es/pdf/Wallace-etal-2022-Font-Individuals.pdf")

Su carta controlla una stampa o una prova affidabile alla dimensione finale. Sul web verifica il testo al 200% senza perdita di contenuti o funzioni. Per la normale lettura verticale, controlla anche la ricomposizione a una larghezza equivalente a 320 pixel CSS: il testo ordinario deve potersi leggere senza scorrere in entrambe le direzioni. Le parti che richiedono una disposizione bidimensionale, come alcune tabelle, seguono le eccezioni del criterio @t06-wcag2024.#nota-compatta([W3C, Understanding Resize Text, 1.4.4 (AA). W3C, Understanding Reflow, 1.4.10 (AA).], ("https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html", "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html"))

La verifica finale comprende anche condizioni combinate. Per WCAG 1.4.12, sul web applica insieme interlinea ad almeno 1,5 volte il corpo, spazio dopo i paragrafi ad almeno 2 volte il corpo, spaziatura delle lettere ad almeno 0,12 _em_ e delle parole ad almeno 0,16 _em_, senza cambiare altre proprietà. Controlla che contenuti e funzioni restino disponibili. Questi valori verificano l’adattabilità nelle tecnologie pertinenti, come HTML e CSS: non sono impostazioni grafiche obbligatorie e non si applicano allo stesso modo al PDF di stampa @t06-wcag2024.#sito([W3C, Understanding Text Spacing, 1.4.12 (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html")

#interlinea()

#esercizio()
]
#[
// Tipografia per il web, tavole487–490: nessuna altezza imposta alla prosa.
// I campioni sono documenti vettoriali originali; il codice è nativo e modificabile.
#import "../template/stile.typ": immagine, sito
#import "../template/documenti.typ": dettaglio
#import "../template/editoriale.typ": nota-compatta, testo-diritti

== Tipografia per il web

=== Dal file alla pagina

Sul web la scelta di un carattere dipende anche da un file disponibile e da come il browser compone il testo. Un download lento o un segno mancante possono attivare un font di riserva: la pagina deve funzionare anche in quella condizione.

OpenType descrive dati e funzioni del font @t06-opentype-file.#nota-compatta([Microsoft, The OpenType Font File.], "https://learn.microsoft.com/en-us/typography/opentype/spec/otff") WOFF2 (*Web Open Font Format 2.0*) è un formato compresso per distribuirli sul web, anche nel caso di font variabili. Non è un’altra categoria stilistica e non rende ogni file più leggero di qualunque alternativa @t06-woff2024.#nota-compatta([W3C (2024), WOFF 2.], "https://www.w3.org/TR/WOFF2/")

#block(sticky: true, above: 10pt, below: 4pt)[#text(size: 14pt, weight: 900)[Un esempio CSS]]

La regola \@font-face associa un nome a una risorsa; font-family lo richiama nel testo. Nel codice il percorso è dimostrativo. Il range 100–1000 richiede il file variabile corrispondente @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: regola font-face e descrittori.], "https://www.w3.org/TR/css-fonts-4/#font-face-rule")  Controlla il permesso web e conserva licenza e avvisi: DM Sans e Sora sono distribuiti con SIL OFL 1.1 @t06-ofl2007.#sito([SIL International, OFL FAQ: uso web e servizi webfont.], "https://openfontlicense.org/ofl-faq/#2-using-ofl-fonts-for-webpages-and-online-webfont-services")

// Il codice rimane testo selezionabile. Il percorso del font è dimostrativo.
#block(breakable: false, above: 8pt, below: 10pt)[
  #set text(font: "DM Sans 9pt", size: 10pt)
  #set par(justify: false, leading: 2pt)
  #show raw: set text(font: "DM Sans 9pt", size: 10pt)
#raw("@font-face {\n  font-family: \"DM Sans\";\n  src: url(\"dm-sans.woff2\")\n    format(\"woff2\");\n  font-weight: 100 1000;\n  font-style: normal;\n  font-display: swap;\n}\n.titolo {\n  font-family: \"DM Sans\",\n    sans-serif;\n}", lang: "css", block: true)
]

=== Scegliere il font disponibile

font-family è una lista di priorità, non la promessa che tutto il testo userà una sola famiglia. Se il font manca o non contiene un segno, il browser cerca un’alternativa. Chiudi la lista con una famiglia generica, come sans-serif: il suo risultato dipende dal dispositivo @t06-font-family.#nota-compatta([MDN, font-family.], "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-family")

font-display regola che cosa accade durante l’attesa. Con swap il font può sostituire quello di riserva quando diventa disponibile; fallback e optional limitano questa possibilità. Non rendono il file più veloce. Una sostituzione può cambiare i ritorni a capo: la @fig-tipo-354 mostra già questo effetto fra DM Sans e Sora @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: font-display.], "https://www.w3.org/TR/css-fonts-4/#font-display-desc")

La @fig-tipo-356 distingue due condizioni, non due istanti cronometrati. Sora è dichiarato già disponibile nella condizione di riserva: non rappresenta il risultato garantito di sans-serif. Nella pagina reale rallenta o blocca il font, ricarica senza cache e controlla quali lettere e contenuti rimangono accessibili.

Osserva anche nomi accentati, importi e simboli del progetto. Una sostituzione può riguardare soltanto alcuni segni, non l’intero paragrafo. Se un titolo cambia riga, verifica ciò che spinge più in basso, non soltanto il titolo.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/web/font-disponibile-e-fallback-sora.svg"),
  [Due condizioni della stessa richiesta. Sora è già disponibile come riserva; quando DM Sans è disponibile, torna la priorità del primo nome. Non sono misurati tempi di caricamento.], diritti: [©2019 The Sora Project Authors; ©2014 The DM Sans Project Authors. SIL OFL 1.1.], alt: "Due condizioni della stessa richiesta. Sora è già disponibile come riserva; quando DM Sans è disponibile, torna la priorità del primo nome. Non sono misurati tempi di caricamento.", width: 187.09pt,
) <fig-tipo-356>

=== Dichiarare le variazioni

Un font variabile espone intervalli progettati nel file. Per il peso, il descrittore font-weight di \@font-face dichiara l’intervallo disponibile; la proprietà font-weight sceglie poi un valore per il testo. Nel DM Sans usato qui l’asse wght va da 100 a 1000: 650 è una posizione reale, non un grassetto simulato @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: font-weight.], "https://www.w3.org/TR/css-fonts-4/#font-weight-desc") Il file della famiglia permette di verificare l’intervallo dichiarato.#sito([DM Sans: originali, metadati e licenza.], "https://github.com/google/fonts/tree/main/ofl/dmsans")

I tre campioni della @fig-tipo-357 mantengono famiglia, corpo, dimensione ottica e contenuto: cambia il peso. Non sono tre font scaricati separatamente. Per gli assi comuni usa prima le proprietà CSS corrispondenti; font-variation-settings serve al controllo di basso livello e può prevalere su quelle proprietà. Non assegnare un asse che il file non contiene @t06-css-fonts2026.#nota-compatta([W3C (2026), CSS Fonts 4; MDN, font-variation-settings.], ("https://www.w3.org/TR/css-fonts-4/#font-variation-settings-def", "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings"))

// Il codice rimane testo selezionabile. Il percorso del font è dimostrativo.
#block(breakable: false, above: 8pt, below: 10pt)[
  #set text(font: "DM Sans 9pt", size: 10pt)
  #set par(justify: false, leading: 2pt)
  #show raw: set text(font: "DM Sans 9pt", size: 10pt)
#raw(".titolo { font-weight: 650; }", lang: "css", block: true)
]

Dopo la dichiarazione, controlla nel browser che sia usato il file previsto e che il peso cambi davvero. Riduci i dati solo dopo aver elencato lingue, segni e stili necessari: un file piccolo che perde accenti o simboli non soddisfa il progetto.

Confronta i valori 400, 650 e 800 sullo stesso titolo. Se appaiono uguali, controlla il file effettivamente usato e l’intervallo dichiarato, prima di correggere il disegno a mano o aggiungere una simulazione.

#immagine(path("/risorse-condivise/immagini/figure/tipografia/web/dm-sans-pesi-400-650-800.svg"),
  [DM Sans a 24 pt, dimensione ottica 24: cambiano soltanto i pesi 400, 650 e 800 dell’asse wght. I valori CSS non sono deformazioni geometriche né misure di prestazione.], diritti: [©2014 The DM Sans Project Authors; SIL OFL 1.1.], alt: "DM Sans a 24 pt, dimensione ottica 24: cambiano soltanto i pesi 400, 650 e 800 dell’asse wght. I valori CSS non sono deformazioni geometriche né misure di prestazione.", width: 187.09pt,
) <fig-tipo-357>

=== Verificare la pagina che cambia

Una misura CSS non basta a garantire la lettura. Il contenitore deve accogliere parole più grandi, righe aggiuntive e un font di riserva diverso. La @fig-tipo-358 mostra la stessa azione a 12 e 24 pt: il testo va a capo e il controllo cresce, invece di nascondere le ultime parole. È uno schema di adattamento, non la certificazione di un sito.

// Due dettagli dello stesso SVG: la scala resta1:1 e le condizioni sono affiancate.
// I ritagli eliminano soltanto il bianco fra i due campioni, senza tagliare i segni.
#figure([
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#box(width: 100%, height: 118pt)[
      #dettaglio(path("/risorse-condivise/immagini/figure/tipografia/web/comando-testo-12-24pt-ricomposto.svg"),
        width: 187.09pt, height: 60pt, originale-width: 187.09pt, originale-height: 200pt,
        dx: 0pt, dy: 0pt, alt: "Stesso comando: testo12pt nella larghezza originale.")
    ]],
    [#dettaglio(path("/risorse-condivise/immagini/figure/tipografia/web/comando-testo-12-24pt-ricomposto.svg"),
      width: 187.09pt, height: 118pt, originale-width: 187.09pt, originale-height: 200pt,
      dx: 0pt, dy: -70pt, alt: "Stesso comando: testo24pt, contenitore cresciuto e parole intere.")],
  )
], kind: image, placement: bottom, scope: "parent", caption: [Lo stesso comando a 12 e 24 pt, nella stessa larghezza e con dimensione ottica fissata a 12. Il controllo cresce e conserva le parole. Due condizioni affiancate dello stesso schema; la figura non è un test di conformità WCAG.
  #v(4pt)#testo-diritti[©2014 The DM Sans Project Authors; SIL OFL 1.1.]
]) <fig-tipo-358>



Nella pagina reale prova prima il font caricato e poi quello non disponibile. Ingrandisci il testo fino al 200% senza perdere contenuti o funzioni, nelle condizioni di WCAG 1.4.4. Per il normale contenuto a scorrimento verticale verifica anche 320 CSS pixel di larghezza secondo 1.4.10: non deve essere necessario scorrere sui due assi, salvo le parti ammesse in eccezione @t06-wcag2024.#sito([W3C (2024), WCAG 2.2, 1.4.4 e 1.4.10 (AA).], "https://www.w3.org/TR/WCAG22/#reflow")

Applica poi insieme le spaziature di 1.4.12, già descritte nella @sec-tipo-reflow, senza cambiare altre proprietà. Cerca parole tagliate, sovrapposizioni e comandi che non si possono più raggiungere. Registra browser, dimensioni, file e problema osservato: una figura chiarisce il controllo, ma il risultato si verifica sulla pagina funzionante.#sito([W3C, Understanding Text Spacing, 1.4.12 (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html")

Ripeti la prova sul passaggio più lungo e sul comando più impegnativo. Conservare il testo non significa solo vederlo: l’azione deve restare raggiungibile senza dover indovinare parole scomparse.
]
]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#capitolo(..parametri-capitolo(6), testo)
