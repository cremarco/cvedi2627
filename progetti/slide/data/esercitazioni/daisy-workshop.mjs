import { themeSlides } from './tailwind-theme.mjs'

export const workshopTitle = 'Componenti e temi con daisyUI'
export const workshopRevision = 'daisy-workshop-2026-11'
const chapters = {
  components: 'Utility e componenti',
  setup: 'Node.js e npm',
  workshop: 'Componenti e temi daisyUI',
}
export const workshopSources = {
  nodeRuntime: ['Node.js', 'https://nodejs.org/learn/getting-started/introduction-to-nodejs'],
  npmAbout: ['npm', 'https://docs.npmjs.com/about-npm/'],
  nodeDownload: ['Download ufficiale di Node.js', 'https://nodejs.org/en/download'],
  npmVersions: ['npm · verifica delle versioni', 'https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/#checking-your-version-of-npm-and-nodejs'],
  npmInit: ['npm · inizializzazione', 'https://docs.npmjs.com/cli/v11/commands/npm-init/'],
  npmPackage: ['npm · package.json', 'https://docs.npmjs.com/cli/v11/configuring-npm/package-json/'],
  npmLock: ['npm · package-lock.json', 'https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/'],
  npmScripts: ['npm · scripts', 'https://docs.npmjs.com/cli/v11/using-npm/scripts/'],
  daisyIntro: ['daisyUI · introduzione', 'https://daisyui.com/docs/intro/'],
  daisyCLI: ['daisyUI · installazione con Tailwind CLI', 'https://daisyui.com/docs/install/cli/'],
  tailwindThemeTokens: ['Tailwind · variabili del tema', 'https://tailwindcss.com/docs/theme#what-are-theme-variables'],
  daisyThemeVariables: ['daisyUI · elenco delle variabili del tema', 'https://daisyui.com/docs/themes/#how-to-add-a-new-custom-theme'],
  daisyThemeGenerator: ['daisyUI · generatore di temi', 'https://daisyui.com/theme-generator/'],
  daisyLabel: ['MDN · elemento label', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label'],
  daisyData: ['MDN · attributi data-*', 'https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes'],
  daisyFocus: ['MDN · focus visibile', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible'],
}

const tailwindImport = '@import "tailwindcss";'
const layerSetup = `${tailwindImport}

@plugin "daisyui";`
const themeSetup = `@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}`
const devCommand = 'tailwindcss -i input.css -o output.css --watch'
const scripts = JSON.stringify({
  scripts: {
    dev: devCommand,
  },
}, null, 2)

const themeColors = {
  light: {
    '--color-base-100': '#fff',
    '--color-base-content': '#182433',
    '--color-primary': 'oklch(55% 0.11 250)',
    '--color-primary-content': '#fff',
  },
  dark: {
    '--color-base-100': '#182433',
    '--color-base-content': '#fff',
    '--color-primary': 'oklch(75% 0.10 250)',
    '--color-primary-content': '#182433',
  },
}
const themeGeometry = {
  '--radius-box': '1rem',
  '--radius-field': '0.5rem',
  '--size-field': '0.25rem',
  '--border': '2px',
}
const declarations = (properties, indent = '') => Object.entries(properties)
  .map(([name, value]) => `${indent}${name}: ${value};`).join('\n')
const themeOverride = (name, rules = declarations(themeColors[name], '  ')) => `@plugin "daisyui/theme" {
  name: "${name}";
  ${name === 'light' ? 'default' : 'prefersdark'}: true;
${rules}
}`

// Exported from the daisyUI theme generator with the Autumn palette and 1rem field radius.
export const studioThemeCSS = `@plugin "daisyui/theme" {
  name: "studio";
  default: false;
  prefersdark: false;
  color-scheme: "light";
  --color-base-100: oklch(95.814% 0 0);
  --color-base-200: oklch(89.107% 0 0);
  --color-base-300: oklch(82.4% 0 0);
  --color-base-content: oklch(19.162% 0 0);
  --color-primary: oklch(40.723% 0.161 17.53);
  --color-primary-content: oklch(88.144% 0.032 17.53);
  --color-secondary: oklch(61.676% 0.169 23.865);
  --color-secondary-content: oklch(12.335% 0.033 23.865);
  --color-accent: oklch(73.425% 0.094 60.729);
  --color-accent-content: oklch(14.685% 0.018 60.729);
  --color-neutral: oklch(54.367% 0.037 51.902);
  --color-neutral-content: oklch(90.873% 0.007 51.902);
  --color-info: oklch(69.224% 0.097 207.284);
  --color-info-content: oklch(13.844% 0.019 207.284);
  --color-success: oklch(60.995% 0.08 174.616);
  --color-success-content: oklch(12.199% 0.016 174.616);
  --color-warning: oklch(70.081% 0.164 56.844);
  --color-warning-content: oklch(14.016% 0.032 56.844);
  --color-error: oklch(53.07% 0.241 24.16);
  --color-error-content: oklch(90.614% 0.048 24.16);
  --radius-selector: 1rem;
  --radius-field: 1rem;
  --radius-box: 1rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 1;
  --noise: 0;
}`
export const studioThemePath = '/examples/esercitazione-07/studio-theme.css'
const studioThemeVariables = studioThemeCSS.split('\n').filter(line => line.startsWith('  --'))
const studioThemeExcerpt = `@plugin "daisyui/theme" {
  name: "studio";
${studioThemeVariables.filter(line => /^  --(?:color-primary(?:-content)?|radius-field):/.test(line)).join('\n')}
  /* … */
}`
const studioButton = `<button data-theme="studio" type="button"
  class="btn btn-primary">Iscriviti</button>`

const action = `<button type="submit"
  class="btn btn-primary">
  Iscriviti
</button>`

const utilityAction = `<button type="submit" class="rounded-md
  bg-action px-3 py-2 text-on-action
  hover:bg-action-hover">
  Iscriviti
</button>`

const componentCSS = `@layer components {
  .submit-button {
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    background-color: var(--ui-action);
    color: var(--ui-on-action);

    &:hover {
      background-color: var(--ui-action-hover);
    }
  }
}`

const componentAction = `<button type="submit"
  class="submit-button">
  Iscriviti
</button>`

const field = `<div class="grid gap-2">
  <label for="email">Email</label>
  <input id="email" name="email"
    type="email" autocomplete="email"
    class="input w-full" required>
</div>`

const semantic = `<p class="bg-white p-2 text-black">
  Colori fissi
</p>
<p class="bg-base-100 p-2
  text-base-content">
  Colori del tema
</p>`

function themedPanels(content) {
  return `<div class="workshop-themes">${[['light', 'Chiaro'], ['dark', 'Scuro']].map(([name, label]) =>
    `<section data-theme="${name}" aria-label="${label}" class="workshop-surface">
      <p class="native-label">${label}</p>
      ${content}
    </section>`).join('')}</div>`
}

const card = `<article
  class="card card-border bg-base-100
  border-base-content/50">
  <div class="card-body">
    <h3 class="card-title">Incontro</h3>
    <p>Giovedì, ore 14</p>
  </div>
</article>`

export const workshopExamples = {
  action: {
    source: action,
    result: `<form class="workshop-action grid gap-2" data-theme="light">
      ${action}
      <output></output>
    </form>`,
  },
  studio: { source: studioButton, result: studioButton },
  field: { source: field, result: field },
  card: { source: card, result: card },
  roles: { source: semantic, result: themedPanels(semantic) },
}

export const workshopExampleStyles = `
:root, [data-theme="light"] { ${declarations({ ...themeColors.light, ...themeGeometry })} }
[data-theme="dark"] { ${declarations({ ...themeColors.dark, ...themeGeometry })} }
[data-theme="studio"] { color-scheme: light; ${studioThemeVariables.join('\n')} }
html { font-size: 16px; }
.native-result > * { min-width: 0; }
.native-result > :is(.grid, .card) { width: 100%; max-width: 24rem; }
.workshop-action[data-theme="light"] { background: transparent; }
.workshop-action > button { justify-self: start; }
.workshop-action > output:empty { display: none; }
.workshop-themes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; width: 100%; }
.workshop-themes .native-label { margin-bottom: 6px; }
.workshop-surface { display: grid; align-content: start; gap: 8px; padding: 12px; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--cvedi-radius, 8px); }
@media print { .native-result { print-color-adjust: exact; } }
`

const paragraph = (text, bullet = false) => ({
  text: text.replaceAll('`', ''),
  runs: text.split(/(`[^`]+`)/g).filter(Boolean).map(value => value.startsWith('`')
    ? { text: value.slice(1, -1), mono: true }
    : { text: value }),
  bullet,
})
const copy = (...paragraphs) => ({ kind: 'text', paragraphs: paragraphs.map(text => paragraph(text)) })
const list = (...items) => ({ kind: 'text', paragraphs: items.map(text => paragraph(text, true)) })
const code = text => ({ kind: 'code', text })
const file = (label, text) => ({ kind: 'code-group', fileHeaders: true, files: [{ label, text }] })
const preview = (id, caption = '') => ({ kind: 'native', example: `daisy-workshop:${id}`, caption, showHint: false })
const slide = (title, blocks, ...refs) => ({ title, blocks, refs })
const divider = (title, ...refs) => ({ ...slide(title, [], ...refs), kind: 'divider', showSources: false })
const drawings = themeSlides.filter(entry => entry.layout === 'figure').map((entry, index) => ({
  ...slide(index === 0 ? 'Esercizio' : entry.title, index === 0
    ? [{ ...entry.blocks[0], caption: 'La tavola indica le proporzioni da conservare. La linea tratteggiata delimita la viewport.' }]
    : entry.blocks, 'theme'), layout: 'figure', showSources: false,
}))

export function createDaisyWorkshop(sources) {
  const visibleURLs = new Set()
  const componentReference = (heading, reference, tags, title, example, traits, ...refs) => slide(heading, [{
    kind: 'tag-reference',
    items: [{
      tags, title, traits, tagSeparator: ' + ',
      url: sources[reference][1], referenceLabel: 'daisyUI', native: `daisy-workshop:${example}`,
    }],
  }], reference, ...refs)
  return [
    { ...slide(workshopTitle, []), kind: 'cover' },
    { ...slide(workshopTitle, [
      list(...Object.values(chapters)),
    ], 'daisyIntro', 'cli', 'themes'), showSources: false },
    divider(chapters.components, 'daisyIntro'),
    { ...slide('Utility', [
      copy(
        '`px-3` e `py-2` impostano il `padding`. `rounded-md` imposta il `border-radius`.',
        '`bg-action` e `text-on-action` impostano i colori.',
        '`hover:bg-action-hover` cambia il `background-color` in `hover`.',
      ),
      file('index.html', utilityAction),
    ], 'utilities'), layout: 'columns', showSources: false },
    { ...slide('Layer dei componenti', [
      copy('Quando lo stesso pulsante compare in più punti, conviene tenere le regole in un posto solo. Tailwind usa `@layer components` per raggruppare le classi CSS dei componenti.'),
      file('input.css', componentCSS),
    ], 'custom'), showSources: false },
    { ...slide('Classe riusabile', [
      copy('Nell’HTML basta la classe `submit-button`. Una modifica alla regola CSS aggiorna tutti i pulsanti che la usano.'),
      file('index.html', componentAction),
    ], 'custom'), layout: 'columns', showSources: false },
    { ...slide('Libreria di componenti', [
      copy('daisyUI è una libreria di componenti per Tailwind. Fornisce classi pronte per pulsanti, campi e altri controlli, con stili coordinati dallo stesso tema.'),
      { kind: 'code-group', fileHeaders: true, files: [
        { label: 'CSS del progetto', text: componentAction },
        { label: 'daisyUI', text: action },
      ] },
      copy('`submit-button` applica le regole definite in `input.css`. `btn` riunisce `padding`, `border-radius` e stile di `hover`. `btn-primary` usa il colore `primary` del tema.'),
    ], 'daisyIntro'), layout: 'code-columns' },
    divider(chapters.setup, 'nodeRuntime', 'npmAbout'),
    { ...slide('Gli strumenti del progetto', [
      copy('La CLI standalone di Tailwind basta per generare il CSS. Per installare librerie come daisyUI e gestirne le versioni, il progetto usa Node.js e il gestore di pacchetti npm.'),
      list(
        'Node.js esegue la CLI di Tailwind, che genera il file `output.css` usato dal browser',
        'npm installa Tailwind e daisyUI nella cartella del progetto',
      ),
    ], 'cli', 'config', 'npmPackage', 'npmLock'), showSources: false },
    slide('Runtime e pacchetti', [
      copy('Un runtime è l’ambiente in cui gira un programma. Il JavaScript di una pagina gira nel browser. Con Node.js, un programma JavaScript può girare anche dal terminale.'),
      copy('Un pacchetto raccoglie i file di una libreria o di uno strumento. Un gestore come npm installa il pacchetto nella versione richiesta insieme alle sue dipendenze, cioè gli altri pacchetti necessari per farlo funzionare.'),
    ], 'nodeRuntime', 'npmAbout'),
    slide('Installazione di Node.js', [
      copy('Dalla pagina di download, scegli la versione LTS (Long-Term Support). L’installer ufficiale include anche npm.'),
      list(
        'macOS. Scarica il pacchetto `.pkg` e segui i passaggi dell’installer',
        'Windows. Scarica Windows Installer `.msi` per il tuo tipo di sistema e mantieni le opzioni predefinite per npm e il PATH. Il tipo di sistema compare in Impostazioni → Sistema → Informazioni',
      ),
    ], 'nodeDownload'),
    slide('Verifica dell’installazione', [
      copy('Apri un nuovo terminale dopo l’installazione. I due comandi mostrano le versioni di Node.js e npm.'),
      code('node -v\nnpm -v'),
      copy('Se il terminale di VS Code non riconosce un comando, riapri VS Code per aggiornare il PATH.'),
    ], 'npmVersions'),
    { ...slide('Cartella di lavoro', [
      copy('Per gli esempi servono una pagina `index.html` e un foglio di stile `input.css` nella stessa cartella.'),
      list(
        'Apri la cartella in VS Code',
        'Scegli Terminale → Nuovo terminale',
        'Usa `ls` per verificare che i due file siano nella cartella',
      ),
    ], 'introTerminal'), showSources: false },
    slide('Inizializzazione', [
      copy('Esegui `npm init` nella cartella con `index.html`. npm chiede nome, versione e altri dettagli del pacchetto. Premi Invio per accettare il valore proposto.'),
      code('npm init'),
      copy('Dopo la conferma compare `package.json` nella cartella del progetto.'),
    ], 'npmInit'),
    slide('package.json', [
      copy('Il file raccoglie le informazioni del progetto. `name` e `version` identificano il pacchetto. `scripts` associa un nome a ciascun comando di progetto.'),
      file('package.json · estratto', JSON.stringify({ name: 'sito-esempio', version: '1.0.0', scripts: {} }, null, 2)),
    ], 'npmPackage'),
    slide('Tailwind CSS', [
      copy('Per compilare Tailwind CSS è necessario installare due pacchetti come `devDependencies`, la sezione per gli strumenti di sviluppo. La sezione `dependencies` raccoglie i pacchetti che servono all’applicazione quando è in uso.'),
      code('npm install -D tailwindcss@4 @tailwindcss/cli@4'),
      list(
        '`npm install` installa i pacchetti, `-D` li aggiunge alle `devDependencies` di `package.json`',
        '`tailwindcss@4` contiene il framework, `@tailwindcss/cli@4` fornisce il comando che genera il CSS',
        '`@4` seleziona la versione principale 4 per entrambi i pacchetti',
      ),
      copy('npm salva i file in `node_modules` e registra le versioni esatte in `package-lock.json`. Il comando `npm install` può ricreare la cartella dai due file JSON del progetto.'),
    ], 'cli', 'npmPackage', 'npmLock'),
    slide('Script npm', [
      copy('In `package.json` è possibile inserire comandi nella sezione `scripts`. A sinistra si scrive un nome a scelta, a destra il comando da eseguire.'),
      file('package.json · proprietà scripts', scripts),
    ], 'npmScripts'),
    slide('Avvio della compilazione', [
      copy('In `input.css` serve `' + tailwindImport + '`. In `index.html`, il foglio di stile punta a `output.css`.'),
      { kind: 'code-group', fileHeaders: true, files: [
        { label: 'Comando diretto', text: `npx ${devCommand}` },
        { label: 'Con dev in scripts', text: 'npm run dev' },
      ] },
      copy('Entrambi i comandi generano `output.css`. Con `--watch`, Tailwind aggiorna il file a ogni modifica dei sorgenti. `Ctrl+C` interrompe il processo.'),
    ], 'cli', 'npmScripts'),
    divider(chapters.workshop, 'daisyCLI', 'themes'),
    slide('Installazione di daisyUI', [
      copy('Esegui il comando nella cartella del progetto. Se `npm run dev` è attivo, interrompilo con `Ctrl+C` per liberare il terminale.'),
      code('npm install -D daisyui@5'),
      copy('npm aggiunge daisyUI alle `devDependencies` e aggiorna il lockfile.'),
    ], 'daisyCLI'),
    slide('Configurazione del plugin', [
      copy('In `input.css`, `@plugin "daisyui";` carica il pacchetto installato con npm. Tailwind include nel CSS gli stili dei componenti usati nell’HTML.'),
      file('input.css · inizio del file', layerSetup),
      copy('Salva `input.css` e riavvia `npm run dev`. Le opzioni del plugin si possono inserire tra parentesi graffe al posto del punto e virgola.'),
    ], 'daisyCLI'),
    slide('Temi daisyUI', [
      copy('L’opzione `themes` elenca i temi disponibili. `--default` indica il tema predefinito, `--prefersdark` quello da usare quando il sistema è in modalità scura.'),
      file('input.css · configurazione di @plugin', themeSetup),
    ], 'config'),
    slide('Tema della pagina', [
      copy('L’attributo `data-theme` sceglie uno dei temi abilitati. Su `<html>` vale per l’intera pagina. Su un contenitore, vale solo per quella parte della pagina.'),
      file('index.html · apertura del documento', '<html lang="it" data-theme="dark">'),
    ], 'daisyData'),
    divider('Personalizzazione', 'themes'),
    { ...slide('Il tema di Tailwind', [
      copy('In Tailwind, `@theme` definisce valori che diventano disponibili nelle utility. Per esempio, `--color-surface` rende disponibile `bg-surface` per impostare il `background-color`.'),
      { kind: 'code-group', fileHeaders: true, files: [
        { label: 'input.css', text: '@theme {\n  --color-surface: #182433;\n  --color-ink: #fff;\n}' },
        { label: 'index.html', text: '<p class="bg-surface text-ink">\n  Un avviso\n</p>' },
      ] },
    ], 'tailwindThemeTokens'), layout: 'code-columns' },
    slide('Colori e ruoli', [
      copy('Con daisyUI, utility e componenti condividono ruoli già definiti. `base-100` è lo sfondo della superficie, `base-content` il testo su quella superficie. Ogni tema assegna valori a quei ruoli.'),
      preview('roles', 'Il primo paragrafo ha colori fissi. Il secondo usa i colori del tema attivo.'),
    ], 'colors'),
    { ...slide('Palette', [
      copy('Per cambiare la palette di un tema esistente, aggiungi un blocco `@plugin "daisyui/theme"` dopo `@plugin "daisyui"`. Con `name: "light";` si parte dal tema chiaro e si modificano i valori elencati nel blocco.'),
      { kind: 'code-group', fileHeaders: true, files: [
        { label: 'input.css · light', text: themeOverride('light') },
        { label: 'input.css · dark', text: themeOverride('dark') },
      ] },
      copy('`--color-primary` imposta il colore dell’azione principale, `--color-primary-content` il testo su quel colore. Le classi dell’HTML restano le stesse.'),
    ], 'colors', 'themes'), layout: 'code-columns' },
    slide('Variabili del tema', [
      copy('Lo stesso blocco può controllare anche forma e dimensioni. `--radius-box` modifica il `border-radius` delle card, `--radius-field` quello di campi e pulsanti.'),
      file('input.css · light', themeOverride('light', `  /* … */\n${declarations(themeGeometry, '  ')}`)),
      copy('`--size-field` è l’unità di base per la dimensione dei controlli. `--border` imposta lo spessore dei contorni dei componenti che la usano.'),
    ], 'daisyThemeVariables'),
    slide('Un tema personalizzato', [
      { kind: 'text', paragraphs: [{
        text: 'Aggiungi il blocco in input.css dopo @plugin "daisyui". CSS completo del tema Studio',
        runs: [
          ...paragraph('Aggiungi il blocco in `input.css` dopo `@plugin "daisyui"`. ').runs,
          { text: 'CSS completo del tema Studio', href: studioThemePath },
        ],
        bullet: false,
      }] },
      file('input.css · estratto dal generatore', studioThemeExcerpt),
      preview('studio'),
    ], 'daisyThemeGenerator', 'daisyThemeVariables'),
    divider('Componenti', 'daisyIntro'),
    componentReference('Pulsante', 'button', ['btn', 'btn-primary'], 'Azione principale', 'action', [
      '`btn` applica lo stile di base al tag `<button>`',
      '`btn-primary` usa i colori `primary` e `primary-content` del tema',
    ]),
    componentReference('Campo di testo', 'input', ['input'], 'Campo email', 'field', [
      '`input` applica lo stile al campo e `w-full` ne estende la larghezza',
      '`for` collega l’etichetta all’`id` del campo. Con `type="email"` il browser controlla il formato',
    ]),
    componentReference('Card', 'card', ['card'], 'Scheda informativa', 'card', [
      '`card-border` aggiunge il contorno. `border-base-content/50` gli assegna il colore del testo al 50% di opacità',
      '`card-body` raggruppa i contenuti e `card-title` definisce lo stile del titolo',
    ]),
    { ...slide('Esercizio', [
      copy('Realizza una pagina con un modulo di iscrizione e un riquadro informativo. Usa le tavole come riferimento per il layout.'),
      list(
        'Installa daisyUI con npm e associa una palette a ciascun tema in `input.css`',
        'Aggiungi un pulsante e un campo con etichetta in una delle regioni',
        'Mantieni il layout responsive in Tailwind e usa i colori del tema anche in un elemento personalizzato',
        'Esegui `npm run dev` per avviare il progetto',
      ),
    ], 'themes'), showSources: false },
    ...drawings,
    { ...slide('Fine esercitazione 07', [], 'themes'), kind: 'closing', showSources: false },
  ].map(({ refs, ...entry }, index) => ({
    ...entry,
    kind: entry.kind ?? 'content',
    sources: refs.map(id => {
      const [title, url] = sources[id]
      const inHeader = entry.blocks.some(block => block.kind === 'tag-reference' && block.items.some(item => item.url === url))
      const visible = entry.showSources !== false && !visibleURLs.has(url) && !inHeader
      if (visible || inHeader) visibleURLs.add(url)
      return { id, title, url, ...(visible ? {} : { visible: false }) }
    }),
    number: index + 1,
    sourceSlide: null,
    sourceKind: 'official-docs',
    revision: workshopRevision,
    part: 1,
    parts: 1,
  }))
}
