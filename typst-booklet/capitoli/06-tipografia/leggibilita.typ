// Leggibilità e lettura, tavole459–469 della fonte corrente.
// I paragrafi scorrono da soli: nessuna riga viene posizionata manualmente.
// Gli SVG conservano i contorni autentici e le misure dichiarate dei campioni.
#import "../../template/stile.typ": immagine, sito
#import "../../template/campioni.typ": confronto
#import "../../template/editoriale.typ": nota-compatta, testo-diritti

== Leggibilità e lettura

Un testo può essere decifrabile e risultare comunque faticoso da leggere. Per capire dove intervenire è utile distinguere due domande. La legibility riguarda soprattutto la possibilità di *riconoscere i segni e distinguerli*: vedere una lettera, separarla da un’altra, leggere una cifra senza scambiarla per un simbolo simile. La readability riguarda *l’esperienza del testo nel suo sviluppo*: seguire una riga, passare alla successiva, cogliere i passaggi e comprendere il messaggio. Le due dimensioni interagiscono, ma non coincidono.

Il disegno del carattere partecipa alla prima domanda attraverso dettagli, proporzioni e differenze fra glifi. Alla seconda contribuiscono anche la dimensione, le distanze, la lunghezza delle righe e l’articolazione dei paragrafi. Il linguaggio del contenuto rimane decisivo: nessun font trasforma un’istruzione ambigua in una frase chiara. In questo capitolo osserviamo la componente tipografica, riconoscendo che essa lavora insieme alle altre condizioni della lettura.

Durante la lettura gli occhi non scorrono in modo uniforme lungo la riga: alternano movimenti rapidi, chiamati saccadi, e brevi periodi di relativa stabilità, le fissazioni, durante i quali viene raccolta gran parte dell’informazione visiva utile. Non tutte le parole vengono fissate direttamente e possono esserci ritorni all’indietro. La ricerca di _Keith Rayner_ mostra che questi comportamenti dipendono anche da frequenza, prevedibilità e difficoltà delle parole, oltre che dalle condizioni del testo e dalle abilità del lettore. Non si può quindi dedurre da un singolo tempo di fissazione la qualità generale di un font @t06-rayner2009.#sito([Rayner (2009).], "https://doi.org/10.16910/jemr.2.5.2")

Riconoscere una parola non equivale però a fotografarne soltanto la sagoma esterna. La sintesi di _Kevin Larson_ sul riconoscimento delle parole distingue il modello della forma globale dall’elaborazione dell’informazione sulle lettere. Il lettore esperto non deve necessariamente nominare ogni lettera una dopo l’altra, ma le differenze fra i segni restano parte dell’informazione che usa. Per il progetto tipografico questo chiarisce perché non basti preservare il profilo complessivo della parola: devono restare leggibili anche i dettagli, gli accenti e gli spazi che la compongono @t06-larson2005.#sito([Larson (2005); versione web.], "https://learn.microsoft.com/en-us/typography/develop/word-recognition")

La distinzione cambia il modo di verificare un progetto. Se una persona legge male un codice, il confronto deve includere lettere e numeri isolati o in sequenze poco prevedibili. Se perde il punto in un paragrafo, è più utile osservare il passaggio fra le righe. Una *prova di lettura continua* non misura esattamente la stessa cosa di una *prova di riconoscimento rapido*, e una preferenza dichiarata per una forma non è automaticamente una maggiore accuratezza.

La domanda progettuale diventa quindi concreta: quale contenuto deve essere letto, da chi e in quali condizioni? Un grande titolo visto per pochi istanti, una pagina studiata a lungo e un numero da copiare richiedono attenzioni differenti. Dare un nome al compito impedisce di ridurre la leggibilità a una classifica astratta dei caratteri.


=== Quando una lettera somiglia a un’altra

In un codice, il lettore può avere pochi indizi per correggere un errore. Nel campione (@fig-tipo-344a), la I maiuscola, la l minuscola e il numero 1 possono avvicinarsi molto; la sequenza rn può apparire simile a una m; una O e uno 0 possono diventare difficili da separare. La familiarità con una parola aiuta a interpretare il contesto, ma non sempre un codice o un nome proprio offre questa possibilità. Conviene quindi provare i caratteri proprio dove l’ambiguità avrebbe una conseguenza.

Osserviamo i segni *al corpo effettivo*, prima di ingrandirli per capire da quali dettagli dipenda la differenza. Nella I possiamo cercare barre o terminazioni; nella l una curva o un piede; nell’1 una bandierina e una base. Non tutti questi elementi sono presenti in ogni disegno, e non esiste un’unica soluzione corretta. Conta che le *forme restino distinguibili* nelle condizioni previste. Anche lo zero barrato, quando disponibile, va valutato nel suo uso: la barra deve essere riconosciuta come parte della cifra e non scambiata per un altro segno.

La vicinanza di rn e m mostra invece che la spaziatura partecipa al problema. Una riduzione eccessiva degli intervalli può avvicinare lettere diverse fino a farle sembrare un unico segno. Aumentare lo spazio senza criterio non risolve tutto: può disgregare la parola e cambiare il ritmo del testo.

Un campione utile contiene quindi parole ordinarie, nomi, cifre e *sequenze poco prevedibili*. Il confronto deve mantenere dichiarati corpo, *peso e spaziatura*, così da capire quale cambiamento produce l’effetto osservato. La distinzione dei glifi non è una qualità da dedurre soltanto dal nome della famiglia o dall’appartenenza alla categoria serif o sans serif.

#immagine(path("/assets/images/figure/tipografia/leggibilita/distinguere-i-l-uno-rn-m-o-zero.svg"),
  [I, l e 1; rn e m; O e 0. Osserva i dettagli che distinguono i segni di DM Sans.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "I, l e 1; rn e m; O e 0. Osserva i dettagli che distinguono i segni di DM Sans.", width: 187.09pt,
) <fig-tipo-344a>

=== La dimensione apparente e la distanza di lettura

Il corpo nominale è una parte della scelta, non la descrizione completa della *dimensione percepita*. Due caratteri composti allo stesso numero di punti o pixel possono avere altezze della x, maiuscole e spessori differenti. Nella @fig-tipo-344c DM Sans ed EB Garamond sono composti a 24 punti sulla stessa linea di base. La diversa altezza della x rende visibile il rapporto fra corpo nominale e dimensione apparente; non è una classifica di leggibilità.

La @fig-tipo-344b invita a osservare la stessa riga a distanze diverse. Per scegliere una misura occorre considerare anche la distanza. Un testo che si legge da vicino su un libro non pone lo stesso problema di una scritta osservata dall’altra parte di una stanza. La *dimensione angolare del segno*, la qualità del supporto e le condizioni visive della persona cambiano l’esperienza. Sullo schermo intervengono inoltre risoluzione, rasterizzazione e impostazioni del dispositivo: una fotografia ingrandita di una parola non riproduce automaticamente la sua lettura reale. Anche le unità richiedono attenzione. Nel CSS il rapporto convenzionale è 96 pixel per pollice e 72 punti per pollice: un punto corrisponde quindi a 4/3 di CSS pixel. Questa equivalenza nel sistema delle unità non garantisce che un centimetro CSS misuri fisicamente un centimetro su qualsiasi schermo. Il CSS pixel non va confuso con un singolo pixel hardware, e un campione stampato nel booklet non può diventare una misura fisica dell’interfaccia @t06-css-values2024.#sito([W3C (2024), lunghezze assolute.], "https://www.w3.org/TR/css-values-4/#absolute-lengths")

Sedici CSS pixel possono essere un punto di partenza per una prova di testo, ma *non sono un minimo generale* stabilito dalle WCAG. La misura va giudicata con il font, il compito e la *possibilità di ingrandire*. Se la composizione funziona soltanto alla dimensione iniziale prevista dal progettista, il problema non si esaurisce nella scelta di un numero più grande.

#immagine(path("/assets/images/figure/tipografia/leggibilita/distanza-di-lettura-dm-sans-12pt.svg"),
  [DM Sans 12 pt: avvicina e allontana il foglio.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "DM Sans 12 pt: avvicina e allontana il foglio.", width: 187.09pt,
) <fig-tipo-344b>

#immagine(path("/assets/images/figure/tipografia/leggibilita/pari-corpo-dm-sans-eb-garamond.svg"),
  [Pari corpo, altezze diverse: DM Sans ed EB Garamond a 24 pt.], diritti: [DM Sans, ©2014 The DM Sans Project Authors. EB Garamond, ©2017 The EB Garamond Project Authors. SIL OFL 1.1.],
  alt: "Pari corpo, altezze diverse: DM Sans ed EB Garamond a 24 pt.", width: 187.09pt,
) <fig-tipo-344c>

=== L’interlinea

In una composizione uniforme, l’interlinea si misura come *distanza fra le linee di base* di due righe successive. Non coincide con la fascia bianca che sembra separare le lettere: questa dipende anche da ascendenti, discendenti e altezza delle minuscole. Due font con la stessa interlinea possono quindi produrre ritmi diversi. Leggere la misura dalla baseline aiuta a non confondere il parametro con il suo effetto visibile.

Una distanza troppo ridotta può avvicinare estensioni e accenti alle lettere della riga vicina e rendere più incerto il passaggio. Una distanza molto ampia può invece far percepire ogni riga come un’unità isolata. La scelta non va fatta soltanto per riempire una pagina. Occorre seguire il testo, osservare come si ritrova la *riga successiva* e valutare la relazione con la sua lunghezza. Quando la riga si allunga, un ritmo verticale diverso può aiutare; quando è breve, lo stesso aumento può risultare eccessivo.

Nel CSS line-height controlla l’altezza delle line box. In righe semplici con font e corpo uniformi, la relazione con la distanza fra le baseline è diretta; con elementi in linea, segni di dimensioni diverse o font di riserva, bisogna controllare il risultato effettivo. Il valore numerico dichiarato non autorizza a ignorare ciò che accade ai contorni.#nota-compatta([W3C, CSS 2.1, § 10.8: calcolo dell’altezza delle righe.], "https://www.w3.org/TR/CSS2/visudet.html#line-height")

La @fig-tipo-344d presenta una prova che mantiene costanti testo, font, peso, corpo e larghezza e *modifica soltanto l’interlinea*. Il confronto mostra il costo di ciascuna scelta, ma non consegna un rapporto valido per tutti. Anche l’eventuale personalizzazione del lettore va prevista: la distanza fra le righe non è un ornamento fisso, ma una condizione attraverso cui il testo può diventare più adatto a chi lo legge.

#immagine(path("/assets/images/figure/tipografia/leggibilita/interlinea-14-18pt.svg"),
  [Interlinea: 14 e 18 pt, con lo stesso corpo.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Interlinea: 14 e 18 pt, con lo stesso corpo.", width: 187.09pt,
) <fig-tipo-344d>

=== Giustezza e struttura del paragrafo

La giustezza è la *larghezza disponibile* per la composizione della riga. Una colonna molto stretta interrompe spesso le frasi e moltiplica i ritorni a capo; una molto ampia può rendere difficile ritrovare il punto da cui ripartire. Non basta contarne le parole: lingue, font, corpi e contenuti occupano lo spazio in modo diverso. Un testo ricco di abbreviazioni o numeri non si comporta come una pagina di prosa narrativa. La @fig-tipo-344e rende visibile come una diversa giustezza cambi i ritorni a capo.

L’indicazione di circa 50–75 caratteri per riga, spazi compresi, può essere un riferimento iniziale per alcune composizioni di testo continuo latino. *Non è una legge percettiva* né una misura da imporre a ogni supporto. Il criterio WCAG 1.4.8, di livello AAA, considera fra le proprie condizioni la possibilità di contenere la larghezza entro 80 caratteri o glifi, 40 per CJK: si tratta di un requisito specifico di presentazione, non della dimostrazione di una lunghezza ottimale universale. Anche l’unità ch offre soltanto una stima dell’ingombro, non un conteggio esatto delle lettere che entreranno nella riga @t06-wcag2024.#nota-compatta([W3C (2024), WCAG 1.4.8 (AAA); documento esplicativo Understanding.], ("https://www.w3.org/TR/WCAG22/#visual-presentation", "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html"))

Il paragrafo organizza invece il procedere del discorso. Il rientro della prima riga e l’intervallo fra i blocchi sono due convenzioni per segnalarne l’inizio. Non appartengono rigidamente alla carta o al web: la scelta dipende dal testo e dalla continuità che si vuole rendere riconoscibile. Usare rientri e grandi intervalli insieme senza una ragione può duplicare il segnale; non è però vietato combinarli quando hanno funzioni distinte e coerenti.

La separazione deve *corrispondere al contenuto*. Inserire pause a intervalli regolari può frammentare un ragionamento che dovrebbe restare unito; eliminarle tutte può nascondere il passaggio fra idee. Il controllo prosegue fra pagine e colonne: le prime o le ultime righe di un paragrafo possono rimanere isolate, formando vedove e orfane. Le impostazioni di composizione aiutano a mantenere più righe insieme.#nota-compatta([W3C, CSS Fragmentation 3, § 3.3: orphans e widows. Candidate Recommendation, 2018.], "https://www.w3.org/TR/css-break-3/#widows-orphans")

#immagine(path("/assets/images/figure/tipografia/leggibilita/giustezza-e-ritorni-a-capo.svg"),
  [DM Sans 12/14 pt: cambia la giustezza.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "DM Sans 12/14 pt: cambia la giustezza.", width: 187.09pt,
) <fig-tipo-344e>

=== Allineamento e sillabazione

L’allineamento, confrontato nella @fig-tipo-344f, stabilisce come le righe si dispongono rispetto ai bordi del testo. Nella bandiera sinistra l’inizio rimane stabile e le chiusure variano; nella bandiera destra avviene il contrario. Nel centrato cambia il punto di partenza di ogni riga. Il giustificato porta invece le righe ai due margini distribuendo lo spazio secondo il sistema di composizione. Per un testo italiano continuo, *un inizio riconoscibile* facilita il ritorno al rigo; altre scritture e altri compiti richiedono di considerare direzioni e convenzioni proprie.

Il centrato può essere adatto a poche parole o a una composizione intenzionale, ma un lungo paragrafo centrato obbliga a cercare ogni nuovo inizio. La bandiera mantiene più stabile lo spazio fra parole, lasciando variabile il bordo esterno. Il giustificato offre invece un blocco regolare, ma deve trovare punti di interruzione sufficienti. Nelle colonne strette può generare intervalli molto diversi e percorsi bianchi che attraversano le righe, spesso chiamati fiumi.

La sillabazione aiuta il sistema a distribuire il testo, ma richiede *la lingua corretta* e un controllo delle divisioni. Nomi propri, sigle, termini tecnici e sequenze di trattini in fine riga meritano una revisione. Non conviene correggere ogni riga inserendo spazi o interruzioni manuali che perderanno senso quando il testo cambierà misura. Il lavoro deve agire sulle proprietà della composizione e poi controllarne gli esiti.

La scelta non è quindi fra un allineamento bello e uno brutto in assoluto. Nel libro stampato è possibile rifinire una condizione relativamente stabile; nel web la stessa frase può assumere molte larghezze. Il progetto deve reggere queste variazioni. Una soluzione è convincente quando mantiene un *ritmo leggibile nelle condizioni reali*, oltre a produrre un bordo gradevole nel campione iniziale.#nota-compatta([W3C, CSS Text 3: allineamento, giustificazione e sillabazione. Candidate Recommendation Draft, 2026.], "https://www.w3.org/TR/css-text-3/")

#immagine(path("/assets/images/figure/tipografia/leggibilita/allineamento-sinistra-centrato-giustificato.svg"),
  [Stesso testo in DM Sans 12/14 pt: cambia soltanto l’allineamento.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Stesso testo in DM Sans 12/14 pt: cambia soltanto l’allineamento.", width: 137mm, placement: top, scope: "parent",
) <fig-tipo-344f>

=== Kerning, tracking e spazi fra parole

La distanza fra due lettere non si giudica soltanto con il righello. Una A accanto a una V lascia un vuoto diverso da quello che appare fra due aste verticali. La crenatura, o kerning, regola *specifici accostamenti* in relazione alle loro forme. Il font può contenere dati che il sistema di composizione applica alle coppie; in OpenType, le operazioni di posizionamento possono essere definite nella tabella GPOS. La scelta delle coppie e dei valori appartiene al disegno della famiglia, non a una formula identica per ogni alfabeto. Il confronto fra le @fig-tipo-345 e @fig-tipo-346 mantiene gli stessi contorni, lo stesso corpo e le stesse coppie AV, VA e To. Cambia l’applicazione dei valori di kerning ricavati dal file. I campioni permettono di osservare il vuoto senza sostituire una forma autentica con una simulazione inventata. La correzione può essere negativa o positiva: il suo scopo è rendere coerente il ritmo, non avvicinare indiscriminatamente tutti i segni.

Il tracking agisce invece sulla *spaziatura complessiva di una sequenza*. Nel CSS letter-spacing aggiunge o sottrae spazio fra le unità tipografiche interessate; word-spacing interviene sui *separatori fra parole*. Sono controlli diversi e non vanno usati come se fossero intercambiabili. Un titolo maiuscolo può richiedere una diversa apertura, ma il tracking di un paragrafo non dovrebbe essere alterato pesantemente per risolvere una sola riga @t06-gpos.#sito([Microsoft, OpenType GPOS.], "https://learn.microsoft.com/en-us/typography/opentype/spec/gpos") La @fig-tipo-346a distingue visivamente il tracking dallo spazio fra parole.

Una spaziatura troppo serrata può fondere i segni; una troppo aperta può indebolire la parola. Anche qui la scrittura conta: sistemi con lettere connesse, come l’arabo, non possono ricevere automaticamente gli stessi interventi pensati per il latino. L’osservazione deve includere unità, connessioni e regole del testo effettivo.

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#immagine(path("/assets/images/figure/tipografia/leggibilita/roboto-serif-senza-kerning.svg"),
  [Roboto Serif senza kerning: AVATAR a 32 pt, coppie a 20 pt. Contorni autentici, non deformati.], diritti: [Campione originale. Roboto Serif, ©2020 The Roboto Serif Project Authors; etichette DM Sans. SIL OFL 1.1.],
  alt: "Roboto Serif senza kerning: AVATAR a 32 pt, coppie a 20 pt. Contorni autentici, non deformati.", width: 187.09pt,
) <fig-tipo-345>
],
[#immagine(path("/assets/images/figure/tipografia/leggibilita/roboto-serif-con-kerning.svg"),
  [Stessi glifi e corpi, kerning attivo: cambiano gli accostamenti AV, VA e To, non le forme.], diritti: [Campione originale. Roboto Serif, ©2020 The Roboto Serif Project Authors; etichette DM Sans. SIL OFL 1.1.],
  alt: "Stessi glifi e corpi, kerning attivo: cambiano gli accostamenti AV, VA e To, non le forme.", width: 187.09pt,
) <fig-tipo-346>
],
  )
]

#immagine(path("/assets/images/figure/tipografia/leggibilita/tracking-e-spazi-fra-parole.svg"),
  [DM Sans: tracking a 26 pt, incrementi −0,8/0/+1,6 pt. Sotto, testo a 12 pt: cambia solo lo spazio fra parole, di 0/+3 pt. Le lettere non cambiano forma.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "DM Sans: tracking a 26 pt, incrementi −0,8/0/+1,6 pt. Sotto, testo a 12 pt: cambia solo lo spazio fra parole, di 0/+3 pt. Le lettere non cambiano forma.", width: 187.09pt,
) <fig-tipo-346a>

=== Unità di misura e colore tipografico

Per regolare la tipografia occorre capire a quale grandezza si riferisce ogni unità. L’_em_ è legato al *corpo del carattere*: se il font-size calcolato è 16 CSS pixel, un _em_ corrisponde a 16 CSS pixel. Non è la larghezza della M, che dipende dal suo disegno. Quando _em_ compare nella proprietà font-size, il riferimento è invece la dimensione ereditata. Questa distinzione spiega perché le stesse unità possano produrre risultati diversi se applicate a proprietà differenti.

Nella terminologia tipografica un en è mezzo _em_. Il CSS non dispone però di un’unità di lunghezza chiamata en: mezzo _em_ si scrive 0.5em, con il punto decimale e senza spazio fra numero e unità. Rem fa riferimento al corpo della radice del documento. Nel testo latino orizzontale, ch si basa *sull’avanzamento del glifo zero* del font usato, non sulla larghezza media di tutte le lettere. È utile per stimare uno spazio testuale, ma una misura di 60 ch non promette esattamente 60 caratteri in ogni riga @t06-css-values2024.#sito([W3C (2024), unità relative al font.], "https://www.w3.org/TR/css-values-4/#font-relative-lengths")

Accanto alle misure esiste una qualità d’insieme che si percepisce anche allontanando lo sguardo: il *colore tipografico*. Un blocco di lettere nere può apparire più chiaro o più scuro senza cambiare il colore dei glifi. Peso, frequenza dei tratti, spazi fra lettere e parole e distanza fra righe distribuiscono pieni e vuoti. Questa densità è ciò che si osserva quando si confronta la tessitura di due paragrafi. Nella @fig-tipo-346b varia soltanto il peso del carattere.

Il colore tipografico *non coincide con il contrasto cromatico* fra testo e sfondo e non misura da solo la facilità di lettura. Un blocco più scuro può derivare da un peso maggiore oppure da spazi più stretti: due cause con conseguenze differenti. Per capire il risultato conviene cambiare una variabile alla volta, osservare l’insieme e poi tornare alle singole parole.

#immagine(path("/assets/images/figure/tipografia/leggibilita/peso-e-colore-tipografico.svg"),
  [Stesse parole e nero; DM Sans 12/14 pt, pesi 400 e 700. Osserva la densità.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Stesse parole e nero; DM Sans 12/14 pt, pesi 400 e 700. Osserva la densità.", width: 137mm, placement: top, scope: "parent",
) <fig-tipo-346b>

=== Leggibilità ed evidenze sperimentali

Il confronto fra serif e sans serif è spesso trasformato in una regola semplice: grazie per la carta, assenza di grazie per lo schermo. Questa scorciatoia nasconde differenze decisive fra i singoli caratteri e fra le condizioni di lettura. Corpo, spessore, spaziatura e qualità della riproduzione possono contare più dell’etichetta. Un serif progettato per piccoli corpi non va confrontato soltanto con un sans scelto per un grande titolo, come se cambiasse una sola caratteristica.

Nello studio _Serifs and font legibility_, _Arditi_ e _Cho_ hanno controllato la presenza e la dimensione delle grazie in caratteri sperimentali, osservando soglie di riconoscimento e velocità di lettura. I risultati *non forniscono un vantaggio generale* della categoria serif nella lettura continua. Il valore didattico del lavoro sta anche nel metodo: *isolare una caratteristica* permette di distinguere il suo effetto da quello di tutte le altre differenze presenti in due famiglie commerciali @t06-arditi2005.#sito([Arditi e Cho (2005).], "https://doi.org/10.1016/j.visres.2005.06.013")

Un’analoga prudenza serve per i caratteri promossi specificamente per la dislessia. _Kuster_ e collaboratori, in due esperimenti con bambini con e senza dislessia, non hanno osservato una maggiore velocità o accuratezza con Dyslexie rispetto ai caratteri di confronto @t06-kuster2018.#sito([Kuster et al. (2018).], "https://doi.org/10.1007/s11881-017-0154-6") _Wery_ e _Diliberto_ non hanno trovato benefici di OpenDyslexic nelle prove del loro studio @t06-wery2017.#sito([Wery e Diliberto (2017).], "https://doi.org/10.1007/s11881-016-0127-1") Questi risultati non annullano le preferenze delle persone e non dimostrano che tutti i caratteri abbiano sempre lo stesso effetto. Impediscono però di presentare un font come una soluzione universale o una cura.

La scelta responsabile unisce *evidenze e prove contestuali*. Si può offrire una presentazione iniziale ragionata e lasciare spazio a dimensioni e spaziature differenti. Il carattere sostiene la lettura attraverso le sue proprietà concrete; la sua promessa commerciale, da sola, non può diventare una conclusione scientifica.


// Campioni documentari, senza numero: non sono gli stimoli degli esperimenti.
#confronto[
  #block(breakable: false)[
    #set par(justify: false, leading: 2pt)
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#text(size: 10pt, weight: 500)[Dyslexie Regular · dettaglio]
        #v(4pt)
        #box(width: 100%, height: 54pt, align(left + horizon,
          image(path("/assets/images/figure/tipografia/leggibilita/dyslexie-dettaglio-pdf-ufficiale-2015.png"),
            width: 136.138pt, alt: "Dyslexie Regular: dettaglio del PDF ufficiale 2015.")))],
      [#text(size: 10pt, weight: 500)[OpenDyslexic Regular]
        #v(4pt)
        #box(width: 100%, height: 54pt, align(left + horizon,
          image(path("/assets/images/figure/tipografia/leggibilita/opendyslexic-regular-campione.svg"),
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

#immagine(path("/assets/images/figure/tipografia/leggibilita/reflow-stesso-testo-due-giustezze.svg"),
  [Stesso testo e corpo in due giustezze. Riducendo la larghezza aumentano le righe: il contenitore cresce, senza tagliare parole o rimpicciolire i caratteri.], diritti: [DM Sans, ©2014 The DM Sans Project Authors; SIL OFL 1.1.],
  alt: "Stesso testo e corpo in due giustezze. Riducendo la larghezza aumentano le righe: il contenitore cresce, senza tagliare parole o rimpicciolire i caratteri.", width: 187.09pt,
) <fig-tipo-346c>

