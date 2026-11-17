import { tailwindDocExamples, responsiveDocExamples, responsivePlaygroundURL } from './tailwind-doc-examples.mjs'
import originalFrameworkSlides from './framework-original.json' with { type: 'json' }

// Beginner path: one article in Tailwind Play, via CDN, then compiled locally.
export const introPlayURL = 'https://play.tailwindcss.com/ceF5gcvINn'

export const introStandaloneVersion = '4.3.5'
export const introStandaloneAssets = `https://github.com/tailwindlabs/tailwindcss/releases/tag/v${introStandaloneVersion}`
export const introStandaloneDownloads = {
  macArm: `https://github.com/tailwindlabs/tailwindcss/releases/download/v${introStandaloneVersion}/tailwindcss-macos-arm64`,
  macIntel: `https://github.com/tailwindlabs/tailwindcss/releases/download/v${introStandaloneVersion}/tailwindcss-macos-x64`,
  windows: `https://github.com/tailwindlabs/tailwindcss/releases/download/v${introStandaloneVersion}/tailwindcss-windows-x64.exe`,
}

export const introSources = {
  introWeight: ['Tailwind · font-weight', 'https://tailwindcss.com/docs/font-weight'],
  introBackground: ['Tailwind · background-color', 'https://tailwindcss.com/docs/background-color'],
  introTextColor: ['Tailwind · color', 'https://tailwindcss.com/docs/color'],
  introDisplay: ['Tailwind · display', 'https://tailwindcss.com/docs/display'],
  introAlign: ['Tailwind · align-items', 'https://tailwindcss.com/docs/align-items'],
  introEditor: ['Tailwind · preparare l’editor', 'https://tailwindcss.com/docs/editor-setup'],
  introStandalone: ['Tailwind · CLI standalone', 'https://tailwindcss.com/docs/installation/tailwind-cli'],
  introPlay: ['Tailwind · playground', 'https://play.tailwindcss.com'],
  introCDN: ['Tailwind · Play CDN', 'https://tailwindcss.com/docs/installation/play-cdn'],
  introTerminal: ['VS Code · terminale', 'https://code.visualstudio.com/docs/terminal/basics'],
  introCommandLine: ['MDN · riga di comando', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line'],
  introWidth: ['Tailwind · larghezza massima', 'https://tailwindcss.com/docs/max-width'],
  introType: ['Tailwind · dimensioni del testo', 'https://tailwindcss.com/docs/font-size'],
  introMargin: ['Tailwind · margini', 'https://tailwindcss.com/docs/margin'],
  introColor: ['Tailwind · colori', 'https://tailwindcss.com/docs/colors'],
}

export const introOutline = [
  'Framework e librerie',
  'Introduzione a Tailwind',
  'Utility e layout responsive',
]

export const introCommands = {
  prepare: 'chmod +x ./tailwindcss',
  build: './tailwindcss -i ./input.css -o ./output.css',
  watch: './tailwindcss -i ./input.css -o ./output.css --watch',
  windowsBuild: '.\\tailwindcss.exe -i ./input.css -o ./output.css',
  windowsWatch: '.\\tailwindcss.exe -i ./input.css -o ./output.css --watch',
}

export const introFragments = {
  first: `<article class="bg-emerald-50 p-4">
  <h1 class="text-xl font-bold">
    Laboratorio aperto
  </h1>
  <p class="mt-2">Giovedì, ore 14</p>
</article>`,
  spacing: `<article class="bg-emerald-50 p-8">
  <h1 class="text-xl font-bold">
    Laboratorio aperto
  </h1>
  <p class="mt-4">Giovedì, ore 14</p>
</article>`,
  color: `<article class="bg-emerald-950 p-4">
  <h1 class="text-xl font-bold text-white">
    Laboratorio aperto
  </h1>
  <p class="mt-2 text-emerald-100">
    Giovedì, ore 14
  </p>
</article>`,
  type: `<article class="bg-emerald-50 p-4">
  <h1 class="text-2xl font-bold">
    Laboratorio aperto
  </h1>
  <p class="mt-2 text-base">
    Giovedì, ore 14
  </p>
</article>`,
  container: `<div class="mx-auto max-w-sm px-4">
  <article class="bg-emerald-50 p-4">
    <h1 class="text-xl font-bold">
      Laboratorio aperto
    </h1>
    <p class="mt-2">Giovedì, ore 14</p>
  </article>
</div>`,
  flex: `<header class="flex items-center
               justify-between gap-4">
  <h1 class="text-xl font-bold">
    Laboratorio aperto
  </h1>
  <p>Giovedì, ore 14</p>
</header>`,
  grid: `<div class="grid grid-cols-2 gap-4">
  <p class="bg-emerald-50 p-4">Analisi</p>
  <p class="bg-emerald-50 p-4">Prototipo</p>
  <p class="bg-emerald-50 p-4">Test</p>
  <p class="bg-emerald-50 p-4">Revisione</p>
</div>`,
  responsive: `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <p class="bg-emerald-50 p-4">Analisi</p>
  <p class="bg-emerald-50 p-4">Prototipo</p>
  <p class="bg-emerald-50 p-4">Test</p>
  <p class="bg-emerald-50 p-4">Revisione</p>
</div>`,
  sidebar: `<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
  <section class="bg-emerald-50 p-4 md:col-span-2">
    Contenuto del laboratorio
  </section>
  <aside class="bg-emerald-100 p-4">Menu</aside>
</div>`,
}

export const introCDNScript = '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>'
export const introLocalLink = '<link rel="stylesheet" href="./output.css">'
export const introInputCSS = '@import "tailwindcss";\n'
export function introDocument(mode = 'cdn', body = introFragments.first) {
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laboratorio aperto</title>
  ${mode === 'cdn' ? introCDNScript : introLocalLink}
</head>
<body class="font-sans text-emerald-950">
${body}
</body>
</html>
`
}

export const introFinalBody = `<main class="mx-auto max-w-5xl px-4 py-8">
  <header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <h1 class="text-2xl font-bold">Laboratorio aperto</h1>
    <p>Giovedì, ore 14</p>
  </header>
  <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
    <section class="md:col-span-2" aria-label="Programma">
      <h2 class="text-xl font-bold">Il programma</h2>
      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <p class="bg-emerald-50 p-4">Analisi</p>
        <p class="bg-emerald-50 p-4">Prototipo</p>
        <p class="bg-emerald-50 p-4">Test</p>
        <p class="bg-emerald-50 p-4">Revisione</p>
      </div>
    </section>
    <aside class="bg-emerald-100 p-4">
      <h2 class="font-bold">Menu</h2>
      <p class="mt-2">Porta il tuo prototipo e una domanda.</p>
    </aside>
  </div>
</main>`

const paragraph = (value, bullet = false) => ({
  text: value.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1'), bullet, level: 0,
  runs: value.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean).map(text => text.startsWith('`')
    ? { text: text.slice(1, -1), mono: true }
    : text.startsWith('**') ? { text: text.slice(2, -2), bold: true } : { text }),
})
const copy = (...values) => ({ kind: 'text', paragraphs: values.map(value => paragraph(value)) })
const list = (...values) => ({ kind: 'text', paragraphs: values.map(value => paragraph(value, true)) })
const code = text => ({ kind: 'code', text })
const table = (rows, codeColumns = [], options = {}) => ({ kind: 'table', rows, codeColumns, ...options })

const hiddenSourceTitles = new Set([
  "Che cos’è Tailwind CSS",
  "Una classe, una decisione",
  "Dal CSS alle utility",
  "Tre modi per usare Tailwind",
  "Che cos’è una CDN",
  "Apriamo il terminale in VS Code",
  "Prompt, comando e risposta",
  "Dove siamo? Che cosa c’è qui?",
  "Leggere un percorso",
  "Se qualcosa non funziona",
  "Piccola prova nel terminale",
  "La stessa pagina, un CSS locale",
  "2 · Prepariamo l’eseguibile",
  "3 · Creiamo il CSS di ingresso",
  "4 · Generiamo il CSS",
  "5 · Sostituiamo il collegamento alla CDN",
  "6 · Aggiorniamo il CSS a ogni modifica",
  "Spacing",
  "Typography",
  "Colors",
  "Styling with utility classes",
  "Sizing",
  "Flexbox",
  "Grid",
  "Esercizio"
])

export function createTailwindIntro(sources) {
  const slides = []
  let section = 0
  const add = (title, blocks, keys = ['utilities'], options = {}) => {
    slides.push({ title, kind: 'content', section, blocks, showSources: !hiddenSourceTitles.has(title),
      sources: keys.map(id => ({ id, title: sources[id][0], url: sources[id][1] })), ...options })
  }
  const divider = (number, title) => { section = number; add(title, [], ['utilities'], { kind: 'divider' }) }
  const explain = (title, values, syntax, keys) => add(title, [copy(...values), code(syntax)], keys)
  const playground = url => ({ kind: 'resources', resourceLayout: 'plain', showHint: false, resources: [{ title: 'playground', url }] })
  const resources = (title, items, keys, options = {}) => add(title, [{ kind: 'resources', resourceLayout: 'list', showHint: false, resources: items.map(([title, url]) => ({ title, url })) }], keys, options)

  add('Introduzione a Tailwind CSS', [], [], { kind: 'cover' })
  add('Introduzione a Tailwind CSS', [list(...introOutline)], ['utilities'], { showSources: false })

  divider(1, introOutline[0])
  for (const original of originalFrameworkSlides) {
    if (original.number === 10) continue
    const merged = original.number === 9
    const blocks = structuredClone(original.blocks)
    if (merged) {
      const opening = blocks[0].paragraphs[0]
      opening.runs[0].text = opening.runs[0].text.replace('10 anni', '20 anni')
      opening.runs.splice(2, 0, { text: '1', superscript: true, href: 'https://martinfowler.com/bliki/InversionOfControl.html' })
      opening.text = opening.runs.map(run => run.text).join('')
      blocks.push({ kind: 'figure-group', figures: [
        { src: '/images/esercitazioni/framework-controllo.svg', caption: 'Framework', alt: 'Framework: Application è contenuta nel Framework, sopra Platform.', showDialogTitle: false },
        { src: '/images/esercitazioni/librerie-controllo.svg', caption: 'Librerie', alt: 'Librerie: Application è accanto a Library 1, Library 2 e Library 3, tutte sopra Platform.', showDialogTitle: false },
      ] }, { kind: 'citation', paragraphs: [{ text: '1. Fowler, M. (2005, 26 giugno). Inversion of control. MartinFowler.com. https://martinfowler.com/bliki/InversionOfControl.html', runs: [
        { text: '1. Fowler, M. (2005, 26 giugno). ' }, { text: 'Inversion of control.', italic: true }, { text: ' MartinFowler.com. ' }, { text: 'https://martinfowler.com/bliki/InversionOfControl.html', href: 'https://martinfowler.com/bliki/InversionOfControl.html' },
      ] }] })
    }
    add(original.title, blocks, [], { sourceKind: 'retained-import', retainedFrom: { file: 'progetti/slide/assets/esercitazioni/bootstrap-archive/05.json', number: original.number, sourceSlide: original.sourceSlide, ...(original.sourceSlide === 10 ? { omittedBlocks: [1] } : {}), ...(merged ? { numbers: [9, 10], editorialChanges: ['elapsed-years', 'fowler-citation', 'separate-diagrams'] } : {}) }, ...(merged ? { layout: 'columns' } : {}) })
  }
  add('Che cos’è un framework CSS', [copy('Un framework CSS raccoglie regole, classi e convenzioni riutilizzabili per costruire l’aspetto delle pagine web.', 'Le classi permettono di applicare stili per spaziature, testo, colori e layout. Le proprietà restano quelle del CSS che abbiamo già utilizzato.', 'Qui la struttura fornita dal framework riguarda gli stili: continuiamo a scegliere noi i tag, il contenuto e la disposizione della pagina.')], ['utilities'], { showSources: false })

  divider(2, introOutline[1])
  add('Che cos’è Tailwind CSS', [copy('Tailwind CSS è un **framework CSS open-source di tipo utility-first**.', 'Le **utility class** applicano scelte di stile, come uno spazio, un colore o un allineamento. Le proprietà CSS restano quelle che conosciamo già.', '**Utility-first** significa partire da queste classi e combinarle nell’attributo `class` dell’HTML. Scegliamo noi struttura, contenuti e aspetto della pagina, riutilizzando gli stili forniti da Tailwind.')], ['utilities'])
  add('Una classe, una decisione', [copy('Nel CSS scritto da noi definiamo la classe `scheda`. Con Tailwind usiamo `p-4`, che applica il padding.'),
    { kind: 'code-group', title: 'CSS tradizionale', files: [{ label: 'CSS', text: '.scheda { padding: 1rem; }' }, { label: 'HTML', text: '<article class="scheda">\n  Laboratorio aperto\n</article>' }] },
    { kind: 'code-group', title: 'Tailwind CSS', files: [{ label: 'CSS', text: '@import "tailwindcss";' }, { label: 'HTML', text: '<article class="p-4">\n  Laboratorio aperto\n</article>' }] },
  ], ['utilities', 'spacing'], { layout: 'comparison' })
  add('Dal CSS alle utility', [table([
    ['Proprietà', 'Utility', 'CSS equivalente'],
    ['Padding', 'p-4', 'padding: 1rem'],
    ['Bold', 'font-bold', 'font-weight: 700'],
    ['Flexbox', 'flex', 'display: flex'],
    ['Gap', 'gap-4', 'gap: 1rem'],
  ], [1, 2]), copy('Una utility esprime una scelta di stile: può corrispondere a una o più dichiarazioni CSS. Combinando le classi costruiamo il nostro layout senza riscrivere ogni regola.')], ['utilities', 'spacing', 'gap'])

  add('Stati con le varianti', [copy('Un prefisso aggiunge una condizione: la utility si applica quando quella condizione è soddisfatta.'), table([
    ['Variante', 'Quando ha effetto'],
    ['hover:underline', 'Sottolineatura al passaggio del puntatore'],
    ['focus-visible:outline-2', 'Contorno per evidenziare il focus, per esempio usando la tastiera'],
    ['active:bg-emerald-100', 'Sfondo durante l’attivazione dell’elemento'],
  ], [0])], ['states'])
  add('Come viene preparato il CSS', [copy('Uno strumento legge i file del progetto, riconosce le classi utilizzate e **genera le utility corrispondenti** nel file CSS finale.', 'In questo modo il progetto include gli stili di base e le utility necessarie, anziché un catalogo completo di classi precompilate. La dimensione del CSS dipende dalle classi usate.', 'Questo passaggio si chiama **build**, cioè generazione dei file da usare nel sito.')], ['detection'])

  add('Tre modi per usare Tailwind', [table([
    ['Modalità', 'Quando la usiamo'],
    ['Playground', 'Per imparare e provare le utility online, senza preparare un progetto'],
    ['CDN', 'Per integrare Tailwind rapidamente in un prototipo HTML'],
    ['Installazione locale', 'Per generare il CSS del progetto e prepararlo alla pubblicazione'],
  ])], ['introPlay', 'introCDN', 'cli'])
  add('Proviamo Tailwind nel playground', [copy('Un **playground** è un ambiente online in cui scrivere codice e vedere subito il risultato. Tailwind Play ha già gli strumenti necessari: per cominciare basta il browser.'), playground(introPlayURL)], ['introPlay'], { showSources: false })

  add('Che cos’è una CDN', [copy('Una **Content Delivery Network** è una rete di server da cui possiamo caricare risorse per la nostra pagina.', 'La Play CDN di Tailwind ci permette di provare le utility direttamente nel browser, senza installare strumenti sul computer.', 'La usiamo per il **fast prototyping**, cioè per costruire e provare rapidamente un’idea.')], ['introCDN'])
  add('CDN', [copy('Per usare Tailwind tramite CDN, il documento HTML deve contenere questo script nella sezione `<head>`. Lo script carica Tailwind nel browser e rende disponibili le utility nella pagina.'), code(introCDNScript)], ['introCDN'], { showSources: false })
  add('Installare Tailwind sul computer', [copy('Per generare il CSS sul nostro computer useremo il **terminale**, una finestra in cui scrivere comandi.', 'Tailwind si può installare in vari modi. Noi useremo la **CLI standalone**: un programma contenuto in un solo file, immediato da preparare e senza dipendenze da installare.')], ['introStandalone'], { showSources: false })
  add('Che cos’è il terminale', [copy('È una finestra in cui scriviamo istruzioni per il computer e leggiamo le risposte.', 'L’interprete dei comandi, detto **shell**, legge le istruzioni. In Windows useremo PowerShell; in macOS il terminale usa normalmente zsh.', 'Per Tailwind lo useremo per avviare la generazione del CSS con un programma scaricato sul computer.')], ['introCommandLine', 'introTerminal'])
  add('Apriamo il terminale in VS Code', [list('Creiamo la cartella laboratorio-tailwind e apriamola in VS Code', 'Creiamo index.html e copiamo l’esempio del playground nel body del documento', 'Scegliamo Terminale → Nuovo terminale', 'Compare un pannello nella parte inferiore di VS Code', 'Il nuovo terminale parte normalmente dalla cartella aperta: controlliamo sempre il percorso')], ['introTerminal'])
  explain('Prompt, comando e risposta', ['Il **prompt** indica che la shell è pronta. Aspetto e percorso cambiano fra computer.', 'Digitiamo `pwd` dopo il prompt e premiamo Invio. La risposta indica la cartella corrente.', 'Il simbolo `$` è parte del prompt illustrato: il comando da digitare è soltanto `pwd`.'], '$ pwd\n/Users/nome/laboratorio-tailwind', ['introCommandLine'])
  add('Dove siamo? Che cosa c’è qui?', [table([
    ['Comando', 'Che cosa fa'],
    ['pwd', 'Mostra il percorso della cartella corrente'],
    ['ls', 'Elenca file e cartelle presenti qui'],
    ['cd ..', 'Sposta nella cartella superiore'],
    ['cd laboratorio-tailwind', 'Entra nella sottocartella indicata'],
  ], [0])], ['introCommandLine', 'introTerminal'])
  explain('Leggere un percorso', ['`cd` significa cambiare cartella. Il nome dopo lo spazio indica dove andare.', '`..` indica la cartella superiore. Un nome semplice indica una sottocartella della posizione corrente.', 'Le virgolette tengono insieme un percorso che contiene spazi.'], 'cd ..\n\ncd laboratorio-tailwind\n\ncd "Materiali del corso"', ['introCommandLine'])
  add('Se qualcosa non funziona', [table([
    ['Messaggio o situazione', 'Primo controllo'],
    ['Comando non trovato / non riconosciuto', 'Nome digitato e programma installato'],
    ['Percorso o file non trovato', 'Cartella corrente e nome del file'],
    ['Il prompt non ritorna', 'Il programma può essere ancora in esecuzione'],
  ]), copy('Con **Ctrl+C** chiediamo di interrompere il programma attivo. Per rilanciare un comando possiamo usare Freccia su e poi Invio.')], ['introCommandLine', 'introTerminal'])
  add('Piccola prova nel terminale', [list('Esegui pwd e controlla che il percorso termini con laboratorio-tailwind', 'Esegui ls e ritrova index.html', 'Esegui cd .. per uscire, poi cd laboratorio-tailwind per rientrare', 'Esegui di nuovo pwd: sei tornato nel progetto')], ['introCommandLine'])

  add('La stessa pagina, un CSS locale', [copy('Con la Play CDN il browser genera gli stili durante la prova.', 'Con la CLI, Tailwind legge le classi nei file del progetto e genera `output.css` sul computer.', 'Conserviamo l’articolo di Laboratorio aperto: cambierà il modo in cui gli stili arrivano alla pagina.')], ['introCDN'])
  add('1 · Scarichiamo la CLI standalone', [copy('**CLI** significa interfaccia a riga di comando. La versione **standalone** è un programma completo in un solo file: lo scarichiamo e lo avviamo dal terminale.', 'Apriamo la sezione **Assets** della pagina collegata e scegliamo il file per il nostro sistema.'), list('**Mac:** menu Apple → Informazioni su questo Mac. Con chip Apple Silicon scegliamo `tailwindcss-macos-arm64`; con processore Intel scegliamo `tailwindcss-macos-x64`', '**Windows:** Impostazioni → Sistema → Informazioni → Tipo sistema. Per Windows a 64 bit su processore x64 scegliamo `tailwindcss-windows-x64.exe`. Per Windows a 32 bit non è disponibile un eseguibile standalone'), { kind: 'resources', resourceLayout: 'plain', showHint: false, resources: [
    { title: 'Scarica tailwind', url: introStandaloneAssets },
  ] }], ['introStandalone'], { showSources: false })
  add('2 · Prepariamo l’eseguibile', [copy('Spostiamo il file scaricato nella cartella `laboratorio-tailwind`, accanto a `index.html`.', 'Rinominiamolo `tailwindcss` su Mac oppure `tailwindcss.exe` su Windows, mantenendo l’estensione `.exe`.', 'Solo su Mac, eseguiamo questo comando una volta per renderlo eseguibile:'), code(introCommands.prepare), copy('Nei prossimi comandi `./` su Mac e `.\\` in PowerShell indicano il programma nella cartella corrente.')], ['introStandalone', 'introCommandLine'])
  explain('3 · Creiamo il CSS di ingresso', ['In VS Code creiamo `input.css` accanto a `index.html` e salviamolo.', 'Questa istruzione importa Tailwind per la compilazione.', '`input.css` è la sorgente. `output.css` sarà il risultato generato.'], introInputCSS.trimEnd(), ['cli'])
  explain('4 · Generiamo il CSS', ['Nel terminale controlliamo con `pwd` e `ls` di essere nella cartella con l’eseguibile, `index.html` e `input.css`.', 'Eseguiamo il comando del nostro sistema. `-i` indica il file da leggere; `-o` indica il CSS da scrivere.', 'Alla fine compare `output.css`, pronto da collegare alla pagina.'], `# macOS\n${introCommands.build}\n\n# Windows · PowerShell\n${introCommands.windowsBuild}`, ['introStandalone'])
  add('5 · Sostituiamo il collegamento alla CDN', [copy('In `<head>` togliamo lo script della Play CDN e inseriamo il collegamento al CSS generato. Il contenuto di `<body>` rimane identico.'), code(`<!-- Collegamento precedente: da togliere -->\n${introCDNScript}\n\n<!-- Nuovo collegamento: da inserire -->\n${introLocalLink}`)], ['introCDN', 'cli'])
  add('6 · Aggiorniamo il CSS a ogni modifica', [code(`# macOS\n${introCommands.watch}\n\n# Windows · PowerShell\n${introCommands.windowsWatch}`), copy('`--watch` lascia il programma attivo: quando salviamo i file, Tailwind aggiorna il CSS.', 'Il prompt rimane occupato finché il programma è in ascolto. Lo interrompiamo con **Ctrl+C**.', 'Salviamo l’HTML e ricarichiamo il browser per vedere le modifiche.')], ['cli', 'introTerminal'])

  add('Prepariamo l’editor', [copy('In VS Code installiamo **Tailwind CSS IntelliSense**, l’estensione ufficiale indicata dalla guida Tailwind.'), list('Apriamo il pannello Estensioni dalla barra laterale di VS Code', 'Cerchiamo Tailwind CSS IntelliSense e scegliamo Installa', 'Apriamo input.css, facciamo clic su CSS nella barra in basso e selezioniamo Tailwind CSS'), copy('Questa modalità riconosce la sintassi e le direttive specifiche di Tailwind. Per generare il CSS continuiamo a usare la CLI standalone.')], ['introEditor'])

  divider(3, introOutline[2])
  for (const example of Object.values(tailwindDocExamples)) add(example.title, [table([['Classe', 'CSS'], ...example.rows], [0, 1]), code(example.code)], example.keys)
  for (const example of responsiveDocExamples) add(example.title, [
    table([example.headers, ...example.rows], example.codeColumns ?? [0, 1], { ...(example.widths ? { widths: example.widths } : {}), ...(example.italicCells ? { italicCells: example.italicCells } : {}) }),
    ...(example.copy ? [copy(example.copy)] : []),
    ...(example.code ? [code(example.code)] : []),
    ...(example.showPlayground === false ? [] : [playground(responsivePlaygroundURL)]),
  ], example.keys, { showSources: example.showSources !== false })

  add('Esercizio', [copy('Riprendi l’esercizio finale della quarta esercitazione e riproduci il layout delle due tavole successive utilizzando le utility di Tailwind CSS.'), list('Conserva contenuti, proporzioni e ordine delle regioni del layout originale', 'Segui un approccio mobile first e adatta la pagina da mobile a desktop', 'La linea tratteggiata delimita la viewport e distingue i contenuti visibili subito da quelli raggiungibili scorrendo', 'Usa l’installazione locale di Tailwind per generare il CSS della pagina')], ['responsive', 'grid', 'cli'])
  add('Il layout da riprodurre · desktop', [{ kind: 'figure', src: '/images/esercitazioni/responsive-layout-desktop.svg', alt: 'Tavola desktop: testata con titolo e testo, due voci, regioni 1, 2 e 3 e un’immagine. Misure relative e linea del fold guidano la ricostruzione.', caption: 'Conserva proporzioni e contenuti della tavola. Il fold indica la parte visibile senza scorrere.' }], ['grid', 'responsive'], { layout: 'figure', showSources: false })
  add('Il layout da riprodurre · mobile', [{ kind: 'figure', src: '/images/esercitazioni/responsive-layout-mobile.svg', alt: 'Tavola mobile: testata, voci, immagine e regioni 1, 2 e 3 in sequenza. La seconda colonna della tavola prosegue il flusso della prima.', caption: 'Leggi la seconda colonna della tavola come prosecuzione della prima, non come due colonne della pagina mobile.', showDialogTitle: false }], ['responsive'], { layout: 'figure', showSources: false })
  resources('Riferimenti', [
    ['Tailwind · installazione con la CLI', sources.cli[1]],
    ['Tailwind · utility e responsive', sources.responsive[1]],
    ['VS Code · usare il terminale', sources.introTerminal[1]],
  ], ['utilities'], { showSources: false })
  add('Fine esercitazione 05', [], ['utilities', 'cli'], { kind: 'closing', showSources: false, credit: 'Elia Guarnieri · elia.guarnieri@unimib.it' })
  return slides
}
