// Caratteristiche e relazioni, tavole398–406: prosa corrente Figma, figure originali e apparati nativi.
// Le immagini mobili non assegnano pagine o righe al corpo del capitolo.
#import "../../template/editoriale.typ": testo-diritti
#import "../../template/stile.typ": sito, immagine
#import "../../template/campioni.typ": confronto
#import "../../template/documenti.typ": dettaglio

== Caratteristiche e relazioni

Una classificazione ci orienta; le caratteristiche permettono di mettere a confronto disegni concreti. Due caratteri dello stesso gruppo possono differire molto per peso, larghezza, altezza delle minuscole, contrasto e profilo dei terminali. Invece di chiedere soltanto quale “stile” rappresentino, possiamo osservare come queste proprietà costruiscano la presenza delle parole.

Un confronto utile conserva alcuni elementi e ne varia altri. Se cambiamo contemporaneamente famiglia, corpo, peso e testo, diventa difficile capire quale decisione abbia prodotto l’effetto. Per studiare il peso teniamo *costanti frase e dimensione*; per osservare le proporzioni affianchiamo gli stessi segni; per valutare l’uso torniamo poi a parole complete. Il *campione isolato* chiarisce un rapporto, mentre la *prova contestuale* ne verifica le conseguenze.

La tipografia combina misure e percezione. Un valore numerico non sostituisce il giudizio, ma aiuta a descriverlo e a ripetere la prova. Anche termini come “morbido”, “forte” o “elegante” diventano più utili quando vengono collegati a un dettaglio: un raccordo arrotondato, una massa di tratti scuri, una forte differenza di spessore. Questo passaggio *dalla sensazione all’osservazione* permette di discutere le scelte senza ridurle al gusto individuale e prepara la lettura degli esempi successivi.

=== Peso e larghezza

Il peso descrive la presenza dei tratti rispetto alla struttura del segno. Aumentarlo modifica il *rapporto fra pieni e vuoti*: gli spazi interni possono ridursi, i raccordi richiedono correzioni e una parola acquista una densità differente. Un Bold riuscito non è semplicemente il contorno del Regular ingrossato in modo uniforme. Il disegno può cambiare per mantenere riconoscibilità ed equilibrio lungo la famiglia.

La larghezza riguarda invece le proporzioni orizzontali. Condensed, normale ed extended offrono modi diversi di distribuire la forma nello spazio. In una *variante progettata*, curve, spessori, aperture e spazi vengono adattati insieme. La *compressione geometrica* di un font normale, al contrario, altera tutto secondo un unico rapporto. I campioni delle @fig-tipo-296 e @fig-tipo-297 distinguono questi due procedimenti nello stesso carattere @t06-wdth2021.#sito([Microsoft, wdth design-variation axis tag.], "https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_wdth")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#immagine(path("/assets/images/figure/tipografia/classificazioni/roboto-serif-larghezza-progettata.svg"),
  [Roboto Serif, asse di larghezza wdth 75: la variante stretta adatta il disegno dei tratti.],
  diritti: [Contorni originali; SIL OFL 1.1.],
  alt: "Roboto Serif, asse di larghezza wdth 75: la variante stretta adatta il disegno dei tratti.",
) <fig-tipo-296>
],
    [#immagine(path("/assets/images/figure/tipografia/classificazioni/roboto-serif-compressione-geometrica.svg"),
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

#immagine(path("/assets/images/figure/tipografia/classificazioni/altezza-x-sei-font.svg"),
  [Stesso corpo 32, sei font originali. La guida tratteggiata mostra l’altezza della x, espressa in _em_.],
  diritti: [Font SIL OFL 1.1.],
  alt: "Stesso corpo 32, sei font originali. La guida tratteggiata mostra l’altezza della x, espressa in em.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-298>


=== Contrasto e asse

Il *contrasto tipografico* è la differenza di spessore all’interno del segno. Non coincide con il contrasto cromatico fra testo e sfondo e non riguarda soltanto il rapporto fra asta e grazie: può alternare tratti robusti e sottili nelle curve, nelle diagonali e nei raccordi. Un disegno a contrasto ridotto costruisce una presenza più uniforme; uno a contrasto elevato rende più evidente l’alternanza.

L’asse aiuta a leggere come quella distribuzione si orienti nelle forme curve. Una o con modulazione diagonale e una con modulazione verticale possono mostrare un ritmo diverso pur appartenendo entrambe ai serif. L’asse *non va confuso con la postura*: una lettera tonda può avere asse inclinato, mentre un corsivo può essere inclinato nel suo insieme. Sono due osservazioni che riguardano aspetti differenti del disegno.

In un didone le linee sottili possono risultare incisive in grande e fragili in piccolo; in una famiglia a basso contrasto altri dettagli possono svolgere un ruolo più importante nel riconoscimento. Queste tendenze non stabiliscono una superiorità generale. La resa dipende dalla variante e dal supporto. Nel passare da un dettaglio ingrandito alla dimensione effettiva, osserviamo quali tratti rimangano visibili e quali differenze si attenuino: il carattere che giudichiamo è sempre quello reso concretamente, con le sue proporzioni e le sue condizioni di riproduzione (@fig-tipo-299).

#immagine(path("/assets/images/figure/tipografia/classificazioni/contrasto-tratti-tre-font.svg"),
  [Contrasto dei tratti in Work Sans, EB Garamond e Bodoni Moda, allo stesso corpo 58. Le famiglie differiscono anche per altre proprietà.],
  diritti: [Specimen originali dai font; SIL OFL 1.1.],
  alt: "Contrasto dei tratti in Work Sans, EB Garamond e Bodoni Moda, allo stesso corpo 58. Le famiglie differiscono anche per altre proprietà.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-299>


=== Il profilo dei tratti

Un terminale può chiudersi con un *taglio netto*, una curva, una goccia o una forma appuntita. Il raccordo fra due tratti può essere *angolare o arrotondato*. Queste decisioni modificano la silhouette e gli spazi vicini, producendo differenze riconoscibili anche fra famiglie con proporzioni simili. Per osservarle conviene scegliere la stessa lettera e ingrandire il punto in cui il tratto termina o cambia direzione.

L’arrotondamento non equivale necessariamente a una costruzione circolare dell’intero alfabeto. Si possono arrotondare terminali di un disegno dal forte impianto geometrico oppure raccordare morbidamente una struttura di origine calligrafica. Allo stesso modo, un profilo netto può appartenere a una famiglia da testo o a un carattere espressivo. Il dettaglio acquisisce valore nel sistema di relazioni che lo accompagna.

Descrivere una forma come amichevole o severa può essere un’*ipotesi progettuale, da verificare*. Un angolo non contiene da solo un’emozione, e una terminazione morbida non rende automaticamente adatta una famiglia ai bambini. È più preciso spiegare che cosa osserviamo e come immaginiamo che venga interpretato da quel pubblico. Questo permette di distinguere l’analisi del segno dall’associazione culturale, lasciando spazio a un confronto con lettori reali anziché trasformare il dettaglio in una regola universale (@fig-tipo-300).

#immagine(path("/assets/images/figure/tipografia/classificazioni/terminali-r-s-a.svg"),
  [Terminali di r, s e a in Work Sans, Alegreya Sans e Quicksand: i dettagli mostrano soluzioni diverse entro ciascuna famiglia.],
  diritti: [Contorni originali dei font; SIL OFL 1.1.],
  alt: "Terminali di r, s e a in Work Sans, Alegreya Sans e Quicksand: i dettagli mostrano soluzioni diverse entro ciascuna famiglia.",
  width: 137mm, placement: top, scope: "parent",
) <fig-tipo-300>


=== Le correzioni ottiche

La precisione geometrica è uno strumento del disegno, ma la *regolarità visiva richiede correzioni*. Una forma curva che termina sulla stessa linea di una forma piatta può sembrare più piccola; una punta può apparire più corta. Per compensare queste differenze, le curve e le forme appuntite possono oltrepassare leggermente le *linee nominali*. Questo superamento viene chiamato overshoot.

Il confronto (@fig-tipo-301) usa i contorni autentici di H, O e A in EB Garamond, insieme alla linea di base e al riferimento delle capitali registrato nel font. I superamenti non sono stati amplificati per renderli più spettacolari. Servono a vedere che una famiglia può risultare coerente pur senza far coincidere ogni estremità con la stessa guida geometrica. Correggere manualmente tutti i segni per riportarli sulla linea cancellerebbe parte di quel lavoro.

#immagine(path("/assets/images/figure/tipografia/classificazioni/eb-garamond-overshoot.svg"),
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
#immagine(path("/assets/images/figure/tipografia/classificazioni/roboto-serif-dimensione-ottica-8.svg"),
  [Roboto Serif per testo: opsz 8, peso 400 e larghezza 100. Confronto alla stessa scala.],
  diritti: [Contorni originali; SIL OFL 1.1.],
  alt: "Roboto Serif per testo: opsz 8, peso 400 e larghezza 100. Confronto alla stessa scala.",
  width: 137mm,
) <fig-tipo-302>

#immagine(path("/assets/images/figure/tipografia/classificazioni/roboto-serif-dimensione-ottica-72.svg"),
  [Roboto Serif per titoli: opsz 72, peso 400 e larghezza 100 invariati.],
  diritti: [Contorni originali; SIL OFL 1.1.],
  alt: "Roboto Serif per titoli: opsz 72, peso 400 e larghezza 100 invariati.",
  width: 137mm,
) <fig-tipo-303>

]

=== La voce delle forme

Le forme dei caratteri partecipano al tono del messaggio. Una parola può apparire cerimoniale, quotidiana, tecnica o giocosa prima che si siano lette tutte le frasi. Questa impressione nasce dall’incontro fra qualità osservabili, abitudini di lettura e precedenti usi del carattere. Il peso può suggerire presenza, un corsivo può richiamare movimento o scrittura, una forma familiare può ricordare una testata: nessuno di questi rapporti vale però allo stesso modo in ogni contesto.

Parlare di “personalità” del font è una metafora utile se la si tratta come *attribuzione del lettore*. La ricerca di _Eva Brumberger_ sulle personas mostra che i partecipanti assegnano caratteristiche a caratteri e testi, e mette in luce l’importanza di studiare la loro relazione. Il fatto che emergano *associazioni condivise in un campione* non consente di trasformarle in un dizionario permanente delle emozioni. Esperienze, lingua, formazione e tradizioni d’uso contribuiscono al giudizio @t06-brumberger2003.#sito([Brumberger, 2003], "https://asu.elsevierpure.com/en/publications/the-rhetoric-of-typography-the-persona-of-typeface-and-text/")

La neutralità, a sua volta, può essere un effetto ricercato: un carattere familiare può attirare poca attenzione sulla propria forma in una situazione, mentre in un’altra richiamare istituzioni o stili riconoscibili. La scelta rimane espressiva anche quando cerca discrezione. L’obiettivo progettuale è capire quale voce sia pertinente alle parole e alle *aspettative del destinatario*, non assegnare per sempre un sentimento a ciascuna categoria.

=== Tipografia ed emozioni: gli esperimenti

Nel 1968 _Albert J. Kastl_ e _Irvin L. Child_ studiarono il significato emotivo associato a quattro variabili: angolare o curvo, pesante o leggero, semplice o ornato, con o senza grazie. I quaranta studenti partecipanti espressero giudizi su campioni tipografici e stati d’animo. Emersero associazioni fra combinazioni di proprietà e qualità emotive, ma il risultato riguarda *quegli stimoli e quel gruppo*: non dimostra che ogni carattere curvo provochi felicità o che ogni serif generi tristezza @t06-kastl1968.#sito([Kastl e Child, 1968], "https://doi.org/10.1037/h0026506")

Nel 2012 _Beth E. Koch_ utilizzò sei alfabeti, soprattutto varianti di Helvetica e un confronto con Glypha, per ridurre l’interferenza del significato delle parole. Quarantadue persone completarono il questionario con lo strumento non verbale PrEmo. I confronti mostrarono differenze legate in particolare a peso e larghezza; non tutte le proprietà analizzate produssero differenze significative. Il numero limitato di stimoli e la composizione del campione impediscono di generalizzare quei risultati a tutte le famiglie e a tutte le popolazioni @t06-koch2012.#sito([Koch, 2012], "https://journals.uc.edu/index.php/vl/article/view/5862") La @fig-tipo-303a mostra due campioni attuali per osservare le famiglie citate; non riproduce gli stimoli dell’esperimento.

#confronto[
#figure([
#grid(columns: (1fr, 1fr), gutter: 5mm,
  [#text(size: 10pt, weight: 500)[Helvetica Regular]#v(4pt)
   #image(path("/assets/images/figure/tipografia/classificazioni/helvetica-regular-aag.svg"), width: 66.05pt, alt: "Helvetica Regular: Aag, corpo 36.")],
  [#text(size: 10pt, weight: 500)[Glypha Roman]#v(4pt)
   #box(height: 54pt, align(left + horizon, dettaglio(path("/assets/images/figure/tipografia/classificazioni/glypha-roman-specimen-ufficiale.jpg"), width: 108.29pt, height: 32.13pt, originale-width: 272pt, originale-height: 136pt, dx: -32.3pt, dy: -15.130859pt, alt: "Dettaglio autentico di Glypha Roman dallo specimen Linotype/MyFonts.")))],
)
], kind: image, caption: [Helvetica e Glypha Roman: esempi di confronto, distinti dagli stimoli di _Koch_ (2012).
  #v(4pt)#testo-diritti[Helvetica / Haas; Glypha Roman / Linotype, MyFonts.]]) <fig-tipo-303a>

]


I due studi rendono verificabile una domanda che altrimenti resterebbe affidata all’intuizione. Per applicarli al progetto dobbiamo conservare anche metodo e limiti, distinguendo il *giudizio dichiarato* davanti a un alfabeto dalla lettura di un testo, dalla comprensione e da un comportamento d’acquisto. Sono *compiti diversi*: una misura non può sostituire automaticamente le altre.

=== La congruenza fra forma e significato

Un’altra domanda riguarda la congruenza fra ciò che la parola significa e ciò che la forma suggerisce. _Lewis_ e _Walker_, nel 1989, trovarono *tempi di risposta più lunghi* quando qualità attribuite al carattere e significato dello stimolo entravano in conflitto. Era un compito sperimentale di decisione rapida, non una dimostrazione che qualunque testo “coerente” venga sempre compreso o ricordato meglio @t06-lewis1989.#sito([Lewis e Walker, 1989], "https://doi.org/10.1111/j.2044-8295.1989.tb02317.x")

_Childers_ e _Jass_, nel 2002, portarono il problema nel contesto pubblicitario. I loro esperimenti mostrarono che le associazioni del carattere possono contribuire alla percezione della marca e che la *coerenza fra tipografia, immagine e messaggio* può sostenere il ricordo dei benefici presentati. La conclusione utile riguarda una relazione fra elementi, non il potere isolato di un font di garantire credibilità o vendite @t06-childers2002.#sito([Childers e Jass, 2002], "https://doi.org/10.1207/S15327663JCP1202_03")

Altre ricerche precisano la diversità degli esiti. _Velasco_ e colleghi, nel 2015, osservarono associazioni fra forme tonde e la parola “dolce”, e fra forme angolari e altri termini di gusto: si tratta di corrispondenze, non di una modifica necessaria del sapore reale @t06-velasco2015.#sito([Velasco et al., 2015], "https://doi.org/10.1177/2041669515593040") _Juni_ e _Gross_, nel 2008, rilevarono differenze nelle valutazioni di due testi satirici composti in Arial e Times New Roman @t06-juni2008.#sito([Juni e Gross, 2008], "https://doi.org/10.2466/pms.106.1.35-42") _Medved_ e colleghe, nel 2023, trovarono differenze di piacevolezza e velocità fra i caratteri arrotondati e angolari selezionati per il loro studio @t06-medved2023.#sito([Medved et al., 2023], "https://doi.org/10.3389/fpsyg.2023.1107839") Questi risultati invitano a formulare *ipotesi specifiche* e a provarle. Non sostituiscono l’osservazione del pubblico, della lingua e del testo che stiamo progettando.

Il confronto della @fig-tipo-303b permette di osservare Arial e Times New Roman nelle versioni digitali indicate, senza identificarle con gli stimoli usati negli esperimenti.

#figure([
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    text(size: 10pt, weight: 500)[Arial Regular],
    text(size: 10pt, weight: 500)[Times New Roman Regular],
  )
  #v(4pt)
  #image(path("/assets/images/figure/tipografia/classificazioni/arial-times-new-roman-aag.svg"),
    width: 137mm, alt: "Arial Regular e Times New Roman Regular: Aag, corpo 36, contorni autentici.")
], kind: image, placement: top, scope: "parent",
  caption: [Arial Regular e Times New Roman Regular, corpo 36. Esempi dei font, distinti dagli stimoli degli esperimenti.
    #v(4pt)#testo-diritti[Versioni digitali Monotype.]],
) <fig-tipo-303b>
