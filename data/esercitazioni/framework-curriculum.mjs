// Original CVeDI teaching material. Official references checked 2026-10-21.
// Content and runnable examples are independent of the Slidev presentation.
const tw = path => `https://tailwindcss.com/docs/${path}`
const du = path => `https://daisyui.com/${path}/`
export const sources = {
  utilities: ['Tailwind · utility classes', tw('styling-with-utility-classes')],
  cli: ['Tailwind · installazione CLI', tw('installation/tailwind-cli')],
  vite: ['Tailwind · Vite', tw('installation/using-vite')],
  responsive: ['Tailwind · responsive design', tw('responsive-design')],
  states: ['Tailwind · stati e varianti', tw('hover-focus-and-other-states')],
  detection: ['Tailwind · rilevamento delle classi', tw('detecting-classes-in-source-files')],
  theme: ['Tailwind · theme variables', tw('theme')],
  preflight: ['Tailwind · Preflight', tw('preflight')],
  grid: ['Tailwind · Grid', tw('grid-template-columns')],
  flex: ['Tailwind · Flexbox', tw('flex')],
  spacing: ['Tailwind · padding', tw('padding')],
  custom: ['Tailwind · CSS personalizzato', tw('adding-custom-styles')],
  install: ['daisyUI · installazione', du('docs/install')],
  use: ['daisyUI · utilizzo', du('docs/use')],
  colors: ['daisyUI · colori semantici', du('docs/colors')],
  themes: ['daisyUI · temi', du('docs/themes')],
  customize: ['daisyUI · personalizzazione', du('docs/customize')],
  config: ['daisyUI · configurazione', du('docs/config')],
  button: ['daisyUI · Button', du('components/button')],
  card: ['daisyUI · Card', du('components/card')],
  alert: ['daisyUI · Alert', du('components/alert')],
  input: ['daisyUI · Input', du('components/input')],
  validator: ['daisyUI · Validator', du('components/validator')],
  select: ['daisyUI · Select', du('components/select')],
  checkbox: ['daisyUI · Checkbox', du('components/checkbox')],
  navbar: ['daisyUI · Navbar', du('components/navbar')],
  breadcrumbs: ['daisyUI · Breadcrumbs', du('components/breadcrumbs')],
  dropdown: ['daisyUI · Dropdown', du('components/dropdown')],
  collapse: ['daisyUI · Collapse', du('components/collapse')],
  modal: ['daisyUI · Modal', du('components/modal')],
  table: ['daisyUI · Table', du('components/table')],
  loading: ['daisyUI · Loading', du('components/loading')],
  controller: ['daisyUI · Theme Controller', du('components/theme-controller')],
  variables: ['MDN · custom properties', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties'],
  validation: ['MDN · validazione dei form', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation'],
  contrast: ['W3C · contrasto del testo', 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html'],
}
export const snippets = {
  first: `<article class="max-w-xl rounded-xl bg-emerald-50 p-6 text-emerald-950">
  <h2 class="text-2xl font-bold">Laboratorio aperto</h2>
  <p class="mt-3">Porta una domanda e il tuo prototipo.</p>
</article>`,
  flex: `<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
  <h2 class="text-2xl font-bold">Laboratorio aperto</h2>
  <p class="sm:ml-auto">Giovedì, ore 14</p>
</div>`,
  grid: `<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
  <p class="rounded-lg bg-emerald-100 p-6">Osserva</p>
  <p class="rounded-lg bg-emerald-100 p-6">Progetta</p>
  <p class="rounded-lg bg-emerald-100 p-6">Verifica</p>
</div>`,
  responsive: `<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <p class="rounded-lg bg-emerald-100 p-6">Programma</p>
  <p class="rounded-lg bg-emerald-100 p-6">Materiali</p>
</div>`,
  focus: `<a href="#programma"
  class="rounded px-4 py-2 underline hover:no-underline
    focus-visible:outline-2 focus-visible:outline-offset-4">
  Leggi il programma
</a>`,
  colors: `<div class="flex flex-wrap gap-4">
  <button class="btn btn-primary">Azione principale</button>
  <button class="btn btn-secondary">Azione secondaria</button>
  <button class="btn btn-accent">Accento</button>
</div>`,
  buttons: `<div class="flex flex-wrap gap-4">
  <button type="button" class="btn btn-primary">Iscriviti</button>
  <button type="button" class="btn btn-outline">Salva</button>
  <button type="button" class="btn" disabled>Non disponibile</button>
</div>`,
  card: `<article class="card card-border max-w-xl bg-base-100">
  <div class="card-body">
    <h2 class="card-title">Laboratorio di interfacce</h2>
    <p>Un incontro per verificare il tuo prototipo.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Prenota un posto</button>
    </div>
  </div>
</article>`,
  cards: `<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
  <article class="card card-border bg-base-100">
    <div class="card-body"><h2 class="card-title">Analisi</h2>
      <p>Definisci il problema.</p></div>
  </article>
  <article class="card card-border bg-base-100">
    <div class="card-body"><h2 class="card-title">Prototipo</h2>
      <p>Metti alla prova una soluzione.</p></div>
  </article>
</div>`,
  alert: `<div role="alert" class="alert alert-error">
  <span>Iscrizione non completata: controlla il campo email.</span>
</div>`,
  form: `<form class="grid max-w-xl gap-4">
  <label for="nome">Nome e cognome</label>
  <input id="nome" name="nome" autocomplete="name"
    class="input w-full" required>
  <label for="email">Email</label>
  <input id="email" name="email" type="email"
    autocomplete="email" class="input w-full" required>
  <button class="btn btn-primary">Iscriviti</button>
</form>`,
  validation: `<div class="grid max-w-xl gap-3">
  <label for="email">Email</label>
  <input id="email" type="email" value="mario"
    class="input input-error w-full" required
    aria-invalid="true" aria-describedby="email-errore">
  <p id="email-errore" class="text-error">
    Scrivi un indirizzo come nome@esempio.it.
  </p>
</div>`,
  selection: `<div class="grid max-w-xl gap-4">
  <label for="turno">Scegli un turno</label>
  <select id="turno" class="select w-full">
    <option>Mattina</option><option>Pomeriggio</option>
  </select>
  <label class="flex items-center gap-3">
    <input type="checkbox" class="checkbox" checked>
    Ricevi il promemoria
  </label>
</div>`,
  navbar: `<nav class="navbar bg-base-200" aria-label="Principale">
  <div class="navbar-start">Laboratorio</div>
  <div class="navbar-end gap-2">
    <a class="btn btn-ghost" href="#programma">Programma</a>
    <a class="btn btn-primary" href="#iscrizione">Iscriviti</a>
  </div>
</nav>`,
  breadcrumbs: `<nav class="breadcrumbs" aria-label="Percorso">
  <ul>
    <li><a href="#corsi">Corsi</a></li>
    <li><a href="#laboratori">Laboratori</a></li>
    <li aria-current="page">Interfacce</li>
  </ul>
</nav>`,
  dropdown: `<details class="dropdown" open>
  <summary class="btn">Materiali</summary>
  <ul class="menu dropdown-content w-64 bg-base-200 p-2">
    <li><a href="#brief">Brief del progetto</a></li>
    <li><a href="#consegna">Modalità di consegna</a></li>
  </ul>
</details>`,
  collapse: `<details class="collapse collapse-arrow bg-base-200" open>
  <summary class="collapse-title font-semibold">
    Devo portare il computer?
  </summary>
  <div class="collapse-content">
    <p>Sì, insieme al prototipo da verificare.</p>
  </div>
</details>`,
  modal: `<button class="btn" onclick="document.getElementById('avviso').showModal()">Apri</button>
<dialog id="avviso" class="modal" aria-labelledby="titolo">
  <div class="modal-box">
    <h2 id="titolo" class="text-xl font-bold">Posto prenotato</h2>
    <p class="py-4">Riceverai le indicazioni via email.</p>
    <form method="dialog">
      <button class="btn">Chiudi</button>
    </form>
  </div>
</dialog>`,
  table: `<table class="table">
  <caption>Turni disponibili</caption>
  <thead><tr>
    <th scope="col">Turno</th><th scope="col">Posti</th>
  </tr></thead>
  <tbody>
    <tr><th scope="row">Mattina</th><td>12</td></tr>
    <tr><th scope="row">Pomeriggio</th><td>8</td></tr>
  </tbody>
</table>`,
  loading: `<div class="grid justify-items-start gap-4">
  <button class="btn btn-primary" disabled aria-busy="true">
    <span class="loading loading-spinner" aria-hidden="true"></span>
    Invio in corso
  </button>
  <p role="status">Attendi la conferma dell’iscrizione.</p>
</div>`,
  themes: `<div class="grid grid-cols-2 gap-4">
  <section data-theme="light" class="bg-base-100 p-6 text-base-content">
    <h2 class="text-xl font-bold">Tema chiaro</h2>
    <button class="btn btn-primary mt-4">Iscriviti</button>
  </section>
  <section data-theme="dark" class="bg-base-100 p-6 text-base-content">
    <h2 class="text-xl font-bold">Tema scuro</h2>
    <button class="btn btn-primary mt-4">Iscriviti</button>
  </section>
</div>`,
}
const customTheme = `@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-primary: oklch(45% 0.085 224);
  --color-primary-content: oklch(98% 0 0);
  --radius-box: 1rem;
}`
export const examples = Object.fromEntries(Object.entries(snippets).map(([key, html]) => [key, { html }]))
examples.responsive.comparison = true
examples.focus.focus = 'a'
examples.modal.modal = 'avviso'
examples.custom = { html: snippets.card, custom: true }

const refs = keys => keys.map(key => ({ id: key, title: sources[key][0], url: sources[key][1] }))
const para = text => ({ text, runs: [{ text }] })
const text = (...paragraphs) => ({ kind: 'text', paragraphs: paragraphs.map(para) })
const code = value => ({ kind: 'code', text: value })
const s = (title, blocks, keys, kind = 'content') => ({ title, kind, blocks, sources: refs(keys) })
const T = (title, paragraphs, ...keys) => s(title, [text(...paragraphs)], keys)
const C = (title, value, ...keys) => s(title, [code(value)], keys)
const I = (title, example, alt, ...keys) => s(title, [{ kind: 'image', src: `/images/esercitazioni/framework-${example}.webp`, alt, caption: alt, example }], keys)
const cover = title => s(title, [], [], 'cover')
const end = (number, ...keys) => ({ ...s(`Fine esercitazione ${number}`, [text('Riprendi il codice degli esempi, modifica un parametro e confronta il risultato prima di procedere.')], keys, 'closing'), credit: 'Rielaborazione didattica CVeDI · fonti ufficiali collegate' })

const tailwind = [
  cover('Tailwind CSS: basi e layout'),
  T('Dal CSS al progetto', ['Obiettivo: comporre un’interfaccia responsive con utility, riconoscendo le proprietà CSS che ogni classe applica.', 'Il percorso usa Tailwind CSS 4. Il codice degli esempi è originale e modificabile.'], 'utilities'),
  T('Che cosa fa un framework CSS', ['Un insieme di convenzioni e strumenti organizza stili e riuso. HTML, cascata e layout del browser continuano a funzionare secondo le regole del web.', 'Tailwind genera utility; nel modulo successivo daisyUI aggiunge classi per componenti.'], 'utilities', 'use'),
  T('Una utility, un compito', ['Le classi descrivono decisioni di stile: p-6 aggiunge padding, font-bold cambia il peso, grid abilita CSS Grid.', 'Leggi le classi per gruppi: layout, spazio, tipografia, colore e stati.'], 'utilities'),
  C('Leggere una composizione', '<section class="grid gap-4 p-6">\n  <h2 class="text-2xl font-bold">Layout, spazio e tipografia</h2>\n</section>', 'utilities'),
  T('Una classe si può decodificare', ['In md:grid-cols-2, md: è la condizione e grid-cols-2 è l’utility.', 'La condizione non modifica il significato HTML dell’elemento: un titolo rimane un titolo perché usa h1, h2 e così via.'], 'responsive', 'utilities'),
  C('Installare: percorso con la CLI', 'npm install -D tailwindcss @tailwindcss/cli\n\nnpx @tailwindcss/cli -i ./src/input.css \\\n  -o ./public/output.css --watch', 'cli'),
  C('Il CSS di ingresso', '@import "tailwindcss";\n\n/* src/input.css: la CLI produce public/output.css. */', 'cli'),
  C('Collegare il CSS compilato', '<!-- Nel documento public/index.html -->\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<link rel="stylesheet" href="./output.css">', 'cli', 'responsive'),
  C('Il primo contenuto', snippets.first, 'utilities'),
  I('Risultato: utility in combinazione', 'first', 'Padding, misura del testo e gerarchia derivano da classi distinte.', 'utilities'),
  T('Preflight: la base cambia', ['L’import di Tailwind include Preflight. Tra gli effetti: rimozione dei margini predefiniti e titoli senza una gerarchia visiva automatica.', 'La semantica resta nell’HTML; dimensione, peso e spazio dei titoli vanno scelti esplicitamente.'], 'preflight'),
  T('Spazio: padding, margini e gap', ['p-* agisce all’interno; m-* all’esterno; gap-* separa gli elementi di un contenitore Flexbox o Grid.', 'Per il flusso logico usa anche ps-* e pe-*. Parti da una scala coerente e verifica gli spazi nel risultato.'], 'spacing', 'grid'),
  C('Flexbox: da colonna a riga', snippets.flex, 'flex', 'responsive'),
  I('Risultato: una riga flessibile', 'flex', 'Su questa larghezza il titolo e l’orario condividono una riga.', 'flex', 'responsive'),
  C('Grid: tre colonne quando c’è spazio', snippets.grid, 'grid', 'responsive'),
  I('Risultato: struttura in colonne', 'grid', 'Tre fasi condividono colonne e intervalli regolari.', 'grid'),
  T('Mobile-first: la base non ha prefisso', ['Le utility senza prefisso valgono a ogni larghezza. md: aggiunge regole dalla soglia md in avanti.', 'sm: non significa “solo smartphone”. Scegli i breakpoint quando il contenuto richiede una disposizione diversa.'], 'responsive'),
  s('I breakpoint predefiniti', [{ kind: 'table', rows: [['Variante', 'Larghezza minima'], ['sm:', '40rem · 640px'], ['md:', '48rem · 768px'], ['lg:', '64rem · 1024px'], ['xl:', '80rem · 1280px'], ['2xl:', '96rem · 1536px']] }], ['responsive']),
  C('Stesso contenuto, due disposizioni', snippets.responsive, 'responsive', 'grid'),
  I('Risultato: viewport ampio e stretto', 'responsive', 'Lo stesso HTML passa da due colonne a una; i viewport degli esempi sono reali.', 'responsive'),
  C('Contenere la larghezza', '<main class="mx-auto w-full max-w-5xl px-4 sm:px-6">\n  <p class="max-w-prose">Una riga di testo con misura controllata.</p>\n</main>', 'utilities', 'responsive'),
  T('La tipografia è una gerarchia', ['Dimensione, peso e interlinea hanno ruoli distinti. Un carattere grande non deve sostituire l’elemento semantico corretto.', 'Controlla righe troppo lunghe, testo che va a capo e spazio fra titolo e paragrafo.'], 'utilities'),
  C('Titolo e paragrafo', '<h2 class="text-2xl font-bold leading-tight">Materiali del laboratorio</h2>\n<p class="mt-4 max-w-prose text-lg leading-relaxed">\n  Leggi il brief e prepara una prima ipotesi.\n</p>', 'utilities'),
  C('Hover e focus sono stati diversi', snippets.focus, 'states'),
  I('Risultato: focus da tastiera', 'focus', 'Il contorno identifica il collegamento che riceve il focus.', 'states'),
  T('Varianti e preferenze', ['Le varianti possono dipendere da stati, media query e attributi. motion-reduce: permette di adattare gli effetti alle preferenze di movimento.', 'Definisci il risultato anche senza hover e verifica la navigazione da tastiera.'], 'states'),
  T('Le classi devono essere riconoscibili', ['Tailwind cerca nomi di classe completi nei sorgenti. Concatenare frammenti come bg- + colore + -600 può impedire la generazione dello stile.', 'Prepara una mappa di stringhe complete e registra esplicitamente i sorgenti esterni con @source quando necessario.'], 'detection'),
  C('Una mappa statica di classi', 'const stato = {\n  disponibile: "bg-emerald-100 text-emerald-950",\n  esaurito: "bg-amber-100 text-amber-950",\n};\n// Usa una delle stringhe complete, senza costruire il nome a pezzi.', 'detection'),
  C('Valori specifici senza perdere la regola', '<div class="grid grid-cols-[auto_1fr] gap-4">\n  <span>14:00</span><p>Laboratorio di interfacce</p>\n</div>\n<!-- Le parentesi quadre contengono un valore CSS specifico. -->', 'custom'),
  C('Token che producono utility', '@import "tailwindcss";\n@theme {\n  --color-laboratorio: oklch(45% 0.085 224);\n}\n/* Ora esistono utility come bg-laboratorio. */', 'theme'),
  T('Riuso: prima riconosci la ripetizione', ['Una sequenza di utility può essere estratta in un componente del progetto quando struttura e comportamento si ripetono.', 'Nel prossimo modulo useremo componenti CSS già definiti da daisyUI e utility Tailwind per il layout che li contiene.'], 'custom', 'use'),
  C('Alternativa: integrazione con Vite', 'import { defineConfig } from "vite";\nimport tailwindcss from "@tailwindcss/vite";\n\nexport default defineConfig({\n  plugins: [tailwindcss()],\n});\n// Installa tailwindcss e @tailwindcss/vite; importa il CSS nel progetto.', 'vite'),
  T('Laboratorio · una scheda responsive', ['In 15 minuti costruisci una scheda per un laboratorio: titolo, descrizione, data e un collegamento descrittivo.', 'Usa una colonna come base e due aree affiancate quando il contenuto lo consente. Consegna HTML, CSS di ingresso e due screenshot.'], 'responsive', 'utilities'),
  T('Verifica prima di consegnare', ['Il CSS compilato è collegato e le classi usate esistono? Il contenuto resta leggibile a 390px e a 1280px?', 'Titoli, collegamenti e ordine di lettura hanno senso anche senza lo stile? Il focus è riconoscibile?'], 'detection', 'states'),
  end('05', 'utilities', 'responsive'),
]

const daisy = [
  cover('daisyUI: componenti per le interfacce'),
  T('Dalle utility ai componenti', ['Obiettivo: costruire un’interfaccia coerente con daisyUI 5 e Tailwind CSS 4.', 'Per ogni esempio separeremo struttura HTML, aspetto e comportamento, verificando anche etichette, stati e tastiera.'], 'use', 'install'),
  T('Chi fa che cosa', ['Tailwind compone layout e dettagli con utility. daisyUI aggiunge classi come btn e card per gruppi ricorrenti di stili.', 'L’applicazione continua a gestire dati, operazioni e feedback. Le classi CSS non sostituiscono questi comportamenti.'], 'use'),
  C('Installare il plugin', 'npm install -D daisyui@5\n\n# Il progetto usa già Tailwind CSS 4 e la sua compilazione.', 'install'),
  C('Abilitare daisyUI nel CSS', '@import "tailwindcss";\n@plugin "daisyui" {\n  themes: light --default, dark;\n}', 'install', 'config'),
  T('Le classi non cambiano la semantica', ['Un’azione usa un button; una destinazione usa un collegamento con href. Campi ed errori devono avere nomi e relazioni esplicite.', 'Scegli la struttura nativa prevista dal componente e verifica il comportamento nel browser.'], 'button', 'input'),
  T('Colori legati al ruolo', ['primary, secondary e accent descrivono ruoli. base-* definisce le superfici; error e success comunicano uno stato.', 'La coppia *-content specifica il testo sulla superficie corrispondente. Evita di assegnare lo stesso colore a ruoli diversi senza una ragione.'], 'colors'),
  C('Tre ruoli, tre classi', snippets.colors, 'colors', 'button'),
  I('Risultato: ruoli riconoscibili', 'colors', 'Le varianti cambiano il trattamento visivo mantenendo il componente btn.', 'colors', 'button'),
  T('Button: azione e priorità', ['btn fornisce la base; varianti e dimensioni cambiano l’aspetto. Usa il primario per l’azione che deve emergere.', 'Per impedire un’azione su un button usa l’attributo disabled, mantenendo comprensibile il motivo nel contesto.'], 'button'),
  C('Button: struttura', snippets.buttons, 'button'),
  I('Button: risultato', 'buttons', 'Azione principale, alternativa e stato disabilitato sono distinti.', 'button'),
  T('Card: un contenuto con un confine', ['card raggruppa contenuti correlati; card-body organizza il corpo e card-actions raccoglie le azioni.', 'Usa un titolo significativo. Se la scheda porta a una destinazione, mantieni un collegamento reale invece di affidarti al clic sul contenitore.'], 'card'),
  C('Card: struttura', snippets.card, 'card'),
  I('Card: risultato', 'card', 'Un solo contenuto, una descrizione e un’azione esplicita.', 'card'),
  C('Più card: il layout resta a Tailwind', snippets.cards, 'card', 'grid'),
  T('Alert: spiegare un evento', ['L’alert comunica un’informazione rilevante e può includere un’azione di recupero.', 'Il messaggio deve spiegare il problema anche senza il colore. Riserva role="alert" ai messaggi urgenti che compaiono dinamicamente.'], 'alert'),
  C('Alert: un messaggio comprensibile', snippets.alert, 'alert'),
  I('Alert: risultato', 'alert', 'Il testo indica il problema e il punto da controllare.', 'alert'),
  T('Form: iniziare dalle etichette', ['Collega ogni label al suo controllo con for e id. type, name e autocomplete aiutano il browser a capire il dato richiesto.', 'Il placeholder può dare un esempio, ma non sostituisce un’etichetta visibile.'], 'input'),
  C('Form: struttura essenziale', snippets.form, 'input'),
  I('Form: risultato', 'form', 'Ogni campo ha un’etichetta persistente e l’azione conclude il gruppo.', 'input'),
  T('Validazione: tre responsabilità', ['HTML può verificare vincoli come required e type="email". Validator applica uno stile agli stati supportati.', 'Il progetto deve spiegare gli errori e aggiornare aria-invalid; il server deve verificare nuovamente i dati ricevuti.'], 'validator', 'validation'),
  C('Errore: uno stato esplicito', snippets.validation, 'input', 'validation'),
  I('Errore: risultato', 'validation', 'Lo stato illustrato mantiene il dato inserito e spiega come correggerlo.', 'input', 'validation'),
  T('Scelte: controlli nativi', ['Select, checkbox e radio rispondono a compiti differenti: una scelta da un elenco, un’opzione indipendente, una scelta esclusiva.', 'Mantieni etichette e raggruppamenti comprensibili; non affidarti soltanto a forma e colore.'], 'select', 'checkbox'),
  C('Scelte: struttura', snippets.selection, 'select', 'checkbox'),
  I('Scelte: risultato', 'selection', 'Il turno e il promemoria sono due decisioni indipendenti.', 'select', 'checkbox'),
  T('Navigazione: una destinazione reale', ['Uno stile da pulsante può essere applicato a un link, ma il suo significato resta una navigazione.', 'Scegli nomi che anticipino la destinazione e un ordine coerente con il percorso della pagina.'], 'navbar', 'button'),
  C('Navbar: struttura', snippets.navbar, 'navbar'),
  I('Navbar: risultato', 'navbar', 'Identità e destinazioni principali condividono una barra.', 'navbar'),
  T('Breadcrumbs: dove mi trovo', ['Il percorso mostra la gerarchia delle sezioni. Non sostituisce il menu principale e non deve riprodurre tutta la cronologia.', 'L’elemento corrente è identificato con aria-current="page".'], 'breadcrumbs'),
  C('Breadcrumbs: struttura', snippets.breadcrumbs, 'breadcrumbs'),
  I('Breadcrumbs: risultato', 'breadcrumbs', 'Le sezioni precedenti sono destinazioni; l’ultima è la pagina corrente.', 'breadcrumbs'),
  T('Dropdown: aprire una scelta', ['La variante con details e summary usa l’apertura nativa del browser.', 'Il menu deve avere spazio per apparire e restare raggiungibile da tastiera. Verifica anche come si chiude nel pattern scelto.'], 'dropdown'),
  C('Dropdown: struttura aperta', snippets.dropdown, 'dropdown'),
  I('Dropdown: risultato aperto', 'dropdown', 'Il pannello mostra due destinazioni collegate ai materiali.', 'dropdown'),
  T('Disclosure: mostrare un approfondimento', ['Un details con summary mantiene un controllo nativo per espandere e richiudere il contenuto.', 'Non nascondere informazioni indispensabili per completare il compito. Valuta cosa resta disponibile nella stampa.'], 'collapse'),
  C('Disclosure: struttura aperta', snippets.collapse, 'collapse'),
  I('Disclosure: risultato aperto', 'collapse', 'Domanda e risposta restano nello stesso gruppo.', 'collapse'),
  T('Modal: un’interruzione motivata', ['Usa un dialog quando serve un’interazione che protegga il focus. showModal() apre il dialogo nativo.', 'Verifica nome del dialogo, chiusura con Escape e ritorno del focus. Il CSS non sostituisce la logica dell’operazione.'], 'modal'),
  C('Modal: apertura e chiusura native', snippets.modal, 'modal'),
  I('Modal: risultato', 'modal', 'Il dialogo ha un titolo e un’azione di chiusura espliciti.', 'modal'),
  T('Table: relazioni fra dati', ['Le tabelle descrivono relazioni fra righe e colonne. Caption e intestazioni aiutano a interpretare i valori.', 'La classe table definisce l’aspetto; th e scope mantengono il significato delle celle.'], 'table'),
  C('Table: struttura', snippets.table, 'table'),
  I('Table: risultato', 'table', 'I turni e il numero di posti mantengono intestazioni riconoscibili.', 'table'),
  T('Personalizzare con misura', ['Usa prima le varianti del componente; aggiungi utility per spaziatura, larghezza o disposizione.', 'Controlla gli stati dopo una personalizzazione: un dettaglio utile sul tema chiaro può diventare poco leggibile su quello scuro.'], 'customize'),
  T('Attesa: impedire il doppio invio', ['Durante un’operazione comunica lo stato con testo e un indicatore. Se disabiliti l’azione, spiega perché non è disponibile.', 'Al completamento aggiorna lo stato e rendi chiaro l’esito, senza lasciare uno spinner permanente.'], 'loading'),
  C('Attesa: struttura', snippets.loading, 'loading'),
  I('Attesa: risultato', 'loading', 'Il pulsante è disabilitato e il testo comunica l’operazione in corso.', 'loading'),
  T('Laboratorio · comporre un’iscrizione', ['In 20 minuti combina navbar, scheda del laboratorio, form etichettato e messaggi di esito.', 'Prevedi almeno: compilazione iniziale, errore correggibile, invio in corso e conferma. Conserva HTML e screenshot degli stati.'], 'card', 'input'),
  T('Una verifica con un’altra persona', ['Il compito si completa con la tastiera? Il focus è visibile e segue un ordine sensato?', 'Le etichette spiegano i dati richiesti? Un errore si capisce senza conoscere il colore? I link portano a una destinazione?'], 'input', 'modal'),
  I('Risultato: due card in griglia', 'cards', 'I componenti mantengono la propria struttura mentre Grid ne dispone il gruppo.', 'card', 'grid'),
  end('06', 'use', 'customize'),
]

const themes = [
  cover('Temi con Tailwind CSS e daisyUI'),
  T('Dai valori ai ruoli', ['Obiettivo: personalizzare un’interfaccia attraverso custom properties e ruoli cromatici coerenti.', 'Riutilizza la pagina del laboratorio precedente e conserva stati, semantica e ordine di lettura mentre cambi tema.'], 'variables', 'colors'),
  T('Una custom property è un valore CSS', ['Il nome inizia con due trattini. La proprietà segue la cascata e può essere ereditata dagli elementi discendenti.', 'var() legge il valore nel contesto in cui viene usato. Il nome descrittivo rende esplicito il suo scopo.'], 'variables'),
  C('Dichiarare e usare una variabile', ':root { --spazio-sezione: 2rem; }\n.sezione { padding-block: var(--spazio-sezione); }', 'variables'),
  C('Cambiare il valore in un contesto', ':root { --spazio-sezione: 2rem; }\n.compact { --spazio-sezione: 1rem; }\n.sezione { padding-block: var(--spazio-sezione); }\n\n/* Una .sezione dentro .compact eredita il valore locale. */', 'variables'),
  C('Un fallback per un valore assente', '.sezione {\n  padding-block: var(--spazio-sezione, 2rem);\n}\n/* Il fallback entra in gioco se la variabile non è disponibile. */', 'variables'),
  T('Lo scope segue la struttura', ['Una variabile su un contenitore può cambiare il valore per i discendenti senza riscrivere ogni regola.', 'Controlla dove la proprietà è definita e quale dichiarazione vince nella cascata; evita sovrascritture locali non documentate.'], 'variables'),
  T(':root e @theme hanno compiti diversi', ['Usa :root per una normale custom property. Usa @theme quando vuoi collegare un token alle utility di Tailwind.', 'Un colore definito nel namespace --color-* genera le corrispondenti utility. Non tutte le variabili del progetto devono diventare utility.'], 'theme'),
  C('Un token Tailwind', '@import "tailwindcss";\n@theme {\n  --color-laboratorio: oklch(45% 0.085 224);\n}\n/* bg-laboratorio e text-laboratorio usano questo token. */', 'theme'),
  T('Il tema daisyUI è un insieme di ruoli', ['I componenti leggono variabili semantiche: cambiare tema può aggiornare insieme superfici, testo e azioni.', 'Per sfruttarlo, usa classi come bg-base-100 e text-base-content nei contenitori del progetto.'], 'colors'),
  C('Abilitare due temi', '@import "tailwindcss";\n@plugin "daisyui" {\n  themes: light --default, dark;\n}\n/* Il tema scuro è disponibile; qui non è selezionato automaticamente. */', 'config'),
  C('Applicare il tema a una sezione', snippets.themes, 'themes'),
  I('Due temi, gli stessi componenti', 'themes', 'Le due sezioni usano lo stesso ruolo primario su superfici differenti.', 'themes', 'colors'),
  T('Scegliere le coppie di colore', ['Definisci insieme superficie e contenuto: primary con primary-content, base-100 con base-content.', 'Controlla il testo, i bordi e gli stati, non soltanto il campione di colore isolato.'], 'colors'),
  C('Personalizzare un tema esistente', customTheme, 'themes'),
  C('Personalizzare la geometria', '@plugin "daisyui/theme" {\n  name: "light";\n  --radius-box: 1rem;\n  --radius-field: 0.5rem;\n  --radius-selector: 0.25rem;\n}\n/* Gli altri valori del tema light restano ereditati. */', 'themes', 'config'),
  I('Risultato: primario e geometria', 'custom', 'La card mantiene struttura e contenuti; cambiano primario e raggio del tema.', 'themes', 'customize'),
  T('Cambiare tema è una scelta dell’interfaccia', ['Theme Controller può usare un controllo nativo per selezionare un tema già abilitato.', 'La persistenza tra visite richiede una gestione aggiuntiva. Esplicita quale scelta appartiene all’utente e quale è il valore iniziale.'], 'controller'),
  C('Un controllo per il tema scuro', '<label class="flex items-center gap-3">\n  <input type="checkbox" value="dark"\n    class="checkbox theme-controller">\n  Usa il tema scuro\n</label>', 'controller'),
  T('Verificare il contrasto in entrambi i temi', ['Per il testo ordinario, WCAG 2.2 richiede almeno 4,5:1; per il testo grande la soglia è 3:1.', 'Misura la coppia reale di testo e sfondo anche negli stati. Un nome come primary non garantisce da solo il contrasto.'], 'contrast'),
  T('Laboratorio · costruire una variante', ['In 15 minuti modifica il primario e la geometria della pagina del laboratorio. Aggiungi il selettore del tema.', 'Consegna due screenshot e annota tre coppie testo–sfondo verificate, includendo almeno uno stato di errore.'], 'themes', 'contrast'),
  T('Rivedere il sistema', ['Il cambio tema conserva contenuti, focus e operazioni? Le etichette e i messaggi restano leggibili?', 'Raccogli le scelte in pochi ruoli condivisi. Documenta le eccezioni prima di introdurre valori isolati nel markup.'], 'colors', 'controller'),
  end('07', 'themes', 'colors'),
]

export const curriculum = [
  { number: 5, title: 'Tailwind CSS: basi e layout', slug: 'tailwind-css', slides: tailwind },
  { number: 6, title: 'daisyUI: componenti per le interfacce', slug: 'daisyui-componenti', slides: daisy },
  { number: 7, title: 'Temi con Tailwind CSS e daisyUI', slug: 'temi-tailwind-daisyui', slides: themes },
]
for (const module of curriculum) module.slides.forEach((slide, index) => Object.assign(slide, { number: index + 1, sourceSlide: null, sourceKind: 'official-docs', revision: 'tailwind-daisyui-2026-10', part: 1, parts: 1 }))
