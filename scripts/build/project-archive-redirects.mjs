import { cp, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { projectArchiveURL } from '../../utils/project-archive.mjs'

export async function copyProjectArchiveRedirects(output, base) {
  const legacyPrefix = `${base}project/`
  const document = (missing = false) => `<!doctype html>
<html lang="it" data-theme="course-home" data-project-archive="${projectArchiveURL}" data-legacy-project-prefix="${legacyPrefix}">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${missing ? '' : `<meta http-equiv="refresh" content="0;url=${projectArchiveURL}">`}
  <title>${missing ? 'Pagina non trovata' : 'Archivio progetti'} · CVeDI</title>
  <link rel="stylesheet" href="${base}home-assets/home.css">
  <script src="${base}home-assets/project-redirect.js" defer></script>
</head>
<body>
  <main class="page-width">
    <h1>${missing ? 'Pagina non trovata' : 'Archivio progetti'}</h1>
    <p>L’archivio dei progetti degli studenti è disponibile al nuovo indirizzo.</p>
    <p><a class="link" data-archive-link href="${projectArchiveURL}">Apri l’archivio dei progetti</a></p>
    <p><a class="link" href="${base}">Torna al corso</a></p>
  </main>
</body>
</html>
`
  await mkdir(path.join(output, 'project'), { recursive: true })
  await writeFile(path.join(output, 'project/index.html'), document())
  await writeFile(path.join(output, '404.html'), document(true))
  await cp(new URL('../../home/project-redirect.js', import.meta.url), path.join(output, 'home-assets/project-redirect.js'))
}
