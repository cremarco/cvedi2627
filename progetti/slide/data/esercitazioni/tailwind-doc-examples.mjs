// Slides 41–47 map a few utilities to equivalent CSS in the default theme.
export const utilityPlaygroundURL = 'https://play.tailwindcss.com/ciBuSF7cKr'
export const utilityPlaygroundHTML = `<main class="mx-auto max-w-sm p-4">
  <article class="bg-emerald-50 p-4 text-emerald-950">
    <header class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Laboratorio</h1>
      <span>14:00</span>
    </header>
    <p class="mt-4">Introduzione a Tailwind CSS.</p>
    <div class="mt-4 grid grid-cols-2 gap-4">
      <p>Analisi</p>
      <p>Prototipo</p>
    </div>
  </article>
</main>`
export const utilityPlaygroundCSS = '@import "tailwindcss";\n'

export const tailwindDocExamples = {
  spacing: {
    title: 'Spacing', keys: ['spacing', 'introMargin'],
    rows: [['p-4', 'padding: 1rem;'], ['mt-4', 'margin-top: 1rem;']],
    code: '<article class="p-4">\n  <p class="mt-4">Introduzione a Tailwind CSS.</p>\n</article>',
  },
  typography: {
    title: 'Typography', keys: ['introType', 'introWeight'],
    rows: [['text-xl', 'font-size: 1.25rem; line-height: 1.75rem;'], ['font-bold', 'font-weight: 700;']],
    code: '<h1 class="text-xl font-bold">Laboratorio</h1>',
  },
  colors: {
    title: 'Colors', keys: ['introBackground', 'introTextColor'],
    rows: [['bg-emerald-50', 'background-color: var(--color-emerald-50);'], ['text-emerald-950', 'color: var(--color-emerald-950);']],
    code: '<p class="bg-emerald-50 text-emerald-950">Laboratorio</p>',
  },
  utilities: {
    title: 'Styling with utility classes', keys: ['utilities'],
    rows: [['bg-emerald-50', 'background-color: var(--color-emerald-50);'], ['p-4', 'padding: 1rem;'], ['text-emerald-950', 'color: var(--color-emerald-950);']],
    code: '<article class="bg-emerald-50 p-4 text-emerald-950">\n  Laboratorio\n</article>',
  },
  sizing: {
    title: 'Sizing', keys: ['introWidth', 'introMargin'],
    rows: [['max-w-sm', 'max-width: 24rem;'], ['mx-auto', 'margin-inline: auto;']],
    code: '<main class="mx-auto max-w-sm">Laboratorio</main>',
  },
  flexbox: {
    title: 'Flexbox', keys: ['introDisplay', 'introAlign', 'justify'],
    rows: [['flex', 'display: flex;'], ['items-center', 'align-items: center;'], ['justify-between', 'justify-content: space-between;']],
    code: '<header class="flex items-center justify-between">\n  <span>Laboratorio</span><span>14:00</span>\n</header>',
  },
  grid: {
    title: 'Grid', keys: ['introDisplay', 'grid', 'gap'],
    rows: [['grid', 'display: grid;'], ['grid-cols-2', 'grid-template-columns: repeat(2, minmax(0, 1fr));'], ['gap-4', 'gap: 1rem;']],
    code: '<div class="grid grid-cols-2 gap-4">\n  <p>Analisi</p><p>Prototipo</p>\n</div>',
  },
}

export const responsivePlaygroundURL = 'https://play.tailwindcss.com/IGLV053DD0'
export const responsivePlaygroundHTML = `<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
  <section class="bg-emerald-50 p-4 md:col-span-2">Analisi · Prototipo · Test · Revisione</section>
  <aside class="bg-emerald-100 p-4">Menu</aside>
</div>`

export const responsiveDocExamples = [
  {
    title: 'I breakpoint predefiniti', showPlayground: false, headers: ['Breakpoint prefix', 'Dispositivo indicativo', 'Larghezza minima', 'CSS'], keys: ['responsive'],
    codeColumns: [0, 3], italicCells: ['none'], widths: [18, 25, 22, 35],
    rows: [['none', 'Smartphone / default', '0', 'Stili di base, senza @media'], ['sm', 'Smartphone ampio', '40rem (640px)', '@media (width >= 40rem)'], ['md', 'Tablet', '48rem (768px)', '@media (width >= 48rem)'], ['lg', 'Laptop', '64rem (1024px)', '@media (width >= 64rem)'], ['xl', 'Desktop', '80rem (1280px)', '@media (width >= 80rem)'], ['2xl', 'Desktop ampio', '96rem (1536px)', '@media (width >= 96rem)']],
    copy: 'Dispositivi indicativi: conta la larghezza disponibile. Pixel calcolati con font iniziale di 16px.',
  },
  {
    title: 'Media query con Tailwind CSS', showSources: false, headers: ['Classe', 'CSS'], keys: ['responsive'],
    rows: [['md:grid-cols-3', 'grid-template-columns: repeat(3, minmax(0, 1fr));'], ['md:col-span-2', 'grid-column: span 2 / span 2;']],
    copy: '`grid-cols-1` è la base; `md:` equivale a `@media (width >= 48rem)`.',
    code: responsivePlaygroundHTML,
  },
]
