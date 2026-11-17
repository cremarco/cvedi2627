import { mkdir, writeFile, readFile, copyFile, readdir, rm } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { utilityPlaygroundURL, utilityPlaygroundHTML, utilityPlaygroundCSS, responsivePlaygroundURL, responsivePlaygroundHTML } from '../../data/esercitazioni/tailwind-doc-examples.mjs'
import { introCommands, introDocument, introFinalBody, introInputCSS, introFragments, introPlayURL, introStandaloneDownloads, introStandaloneVersion } from '../../data/esercitazioni/tailwind-intro.mjs'

const folder = 'progetti/slide/assets/esercitazioni/tailwind-intro'
const web = 'progetti/slide/public/images/esercitazioni/esercizio-05'
const cli = path.resolve('node_modules/@tailwindcss/cli/dist/index.mjs')
const digest = bytes => createHash('sha256').update(bytes).digest('hex')
const files = []
for (const name of ['cdn', 'locale', 'responsive']) {
  const directory = `${folder}/esempio/${name}`
  await mkdir(directory, { recursive: true })
  await mkdir(`${web}/${name}`, { recursive: true })
  const document = introDocument(name === 'cdn' ? 'cdn' : 'local', name === 'responsive' ? introFinalBody : undefined)
  await writeFile(`${directory}/index.html`, document)
  if (name !== 'cdn') {
    for (const target of [directory, `${web}/${name}`]) await rm(`${target}/package.json`, { force: true })
    await writeFile(`${directory}/input.css`, introInputCSS)
    await writeFile(`${directory}/COMANDI.txt`, `Scarica la CLI standalone per il tuo sistema e mettila in questa cartella.
macOS: rinomina il file tailwindcss, poi esegui una volta ${introCommands.prepare}
Windows: rinomina il file tailwindcss.exe, mantenendo l’estensione .exe.

macOS:
${introCommands.build}
${introCommands.watch}

Windows · PowerShell:
${introCommands.windowsBuild}
${introCommands.windowsWatch}

Ctrl+C interrompe la compilazione automatica.
`)
    const runner = process.env.TAILWIND_STANDALONE
    const args = ['-i', 'input.css', '-o', 'output.css', '--minify']
    execFileSync(runner ? path.resolve(runner) : process.execPath, runner ? args : [cli, ...args], { cwd: path.resolve(directory), stdio: 'inherit' })
  }
  for (const file of await readdir(directory)) {
    const source = `${directory}/${file}`
    const bytes = await readFile(source)
    await copyFile(source, `${web}/${name}/${file}`)
    files.push({ source, web: `/images/esercitazioni/esercizio-05/${name}/${file}`, sha256: digest(bytes), generated: file === 'output.css' })
  }
}
const playground = { url: introPlayURL, html: `<body class="font-sans text-emerald-950">\n${introFragments.first}\n</body>`, css: introInputCSS }
await writeFile(`${folder}/esempio/playground.json`, JSON.stringify(playground, null, 2) + '\n')
await copyFile(`${folder}/esempio/playground.json`, `${web}/playground.json`)
const utilityPlayground = { url: utilityPlaygroundURL, html: utilityPlaygroundHTML, css: utilityPlaygroundCSS }
await writeFile(`${folder}/esempio/utility-playground.json`, JSON.stringify(utilityPlayground, null, 2) + '\n')
await copyFile(`${folder}/esempio/utility-playground.json`, `${web}/utility-playground.json`)
const responsivePlayground = { url: responsivePlaygroundURL, html: responsivePlaygroundHTML, css: utilityPlaygroundCSS }
await writeFile(`${folder}/esempio/responsive-playground.json`, JSON.stringify(responsivePlayground, null, 2) + '\n')
await copyFile(`${folder}/esempio/responsive-playground.json`, `${web}/responsive-playground.json`)
const instructions = `Laboratorio aperto · Esercitazione 05

Prima prova l’esempio nel playground: ${introPlayURL}
playground.json conserva HTML, CSS e URL della prova online.
Per studiare le utility usa la scheda Laboratorio: ${utilityPlaygroundURL}
utility-playground.json ne conserva il codice.
Per i prefissi responsive usa ${responsivePlaygroundURL}
responsive-playground.json ne conserva il codice.
Poi le cartelle mostrano lo stesso esempio nel progetto.

cdn: apri index.html nel browser. La Play CDN richiede Internet.
locale: contiene lo stesso articolo con un collegamento al CSS locale.
responsive: sviluppa l'articolo in una pagina con programma e menu laterale.

Per lavorare su locale o responsive:
1. Scarica la CLI standalone ufficiale per il tuo sistema:
   macOS Apple: ${introStandaloneDownloads.macArm}
   macOS Intel: ${introStandaloneDownloads.macIntel}
   Windows x64: ${introStandaloneDownloads.windows}
2. Sposta l’eseguibile nella cartella scelta, accanto a index.html e input.css.
3. Rinominalo tailwindcss su macOS o tailwindcss.exe su Windows.
4. Apri la cartella in VS Code e scegli Terminale → Nuovo terminale.
5. Su macOS esegui una volta ${introCommands.prepare}
6. Avvia il comando adatto al tuo sistema indicato in COMANDI.txt.
7. Apri index.html nel browser. Dopo ogni modifica salva e ricarica.
8. Ctrl+C interrompe la compilazione.

output.css è incluso per poter vedere subito il risultato. Viene rigenerato dal comando.
Per partire da zero usa il percorso delle slide dalla cartella della prova CDN.

Fonti: https://tailwindcss.com/docs/installation/play-cdn
https://tailwindcss.com/docs/installation/tailwind-cli
Esempio originale CVeDI · Elia Guarnieri
`
await writeFile(`${folder}/esempio/LEGGIMI.txt`, instructions)
await copyFile(`${folder}/esempio/LEGGIMI.txt`, `${web}/LEGGIMI.txt`)
execFileSync('python3', ['-c', 'import pathlib,sys,zipfile; root=pathlib.Path(sys.argv[1]); out=pathlib.Path(sys.argv[2]); z=zipfile.ZipFile(out,"w",zipfile.ZIP_DEFLATED); [z.write(p,p.relative_to(root)) for p in sorted(root.rglob("*")) if p.is_file()]; z.close()', `${folder}/esempio`, `${web}/laboratorio-tailwind.zip`])
const archives = await Promise.all((await readdir(`${folder}/archivio`)).map(async name => ({ file: `${folder}/archivio/${name}`, sha256: digest(await readFile(`${folder}/archivio/${name}`)) })))
await writeFile(`${folder}/manifest.json`, JSON.stringify({
  id: 'tailwind-intro-2026-11', checkedOn: '2026-11-16',
  specification: 'progetti/slide/data/esercitazioni/tailwind-intro.mjs',
  generator: 'progetti/slide/scripts/build/tailwind-intro.mjs',
  rights: 'Esempio e prosa originali CVeDI · Elia Guarnieri. Documentazione ufficiale collegata nelle slide.',
  sourceExercise: { original: 'progetti/slide/assets/esercitazioni/originali/05-framework-bootstrap.pptx', adaptedSections: ['Librerie, toolkit e framework', 'Primo utilizzo via CDN', 'Layout responsive', 'Consegne 28–31'], figures: ['responsive-layout-desktop.svg', 'responsive-layout-mobile.svg'] },
  standalone: { version: introStandaloneVersion, downloads: introStandaloneDownloads },
  playground, utilityPlayground, responsivePlayground, archives, files,
}, null, 2) + '\n')
console.log('Tailwind 05: three stages generated; CDN and local bodies are identical.')
