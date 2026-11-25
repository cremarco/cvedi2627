import captures from '../../assets/esercitazioni/git/vscode.json' with { type: 'json' }

const assets = '/images/esercitazioni/git'
const historyCrop = [0, 0, 1, 161 / 218]

export function gitFigures(source) {
  return Object.fromEntries(source.filter(page => page.sourceSlide !== 1).flatMap(page => page.blocks.filter(block => block.kind === 'image').map(image => {
    const basename = image.src.split('/').at(-1)
    const diagram = page.sourceSlide === 14
    const capture = captures[page.sourceSlide]
    return [image.src, {
      original: image.src,
      sourceSlide: page.sourceSlide,
      src: `${assets}/${diagram ? 'flusso-git.svg' : capture ? `vscode/${page.sourceSlide}.webp` : basename}`,
      kind: diagram ? 'diagram' : capture ? 'capture' : 'screenshot',
      credit: 'Elia Guarnieri · Esercitazione 08',
      ...(capture ? { captures: [...new Set(capture.fragments.map(fragment => fragment.file))] } : {}),
    }]
  })))
}

const run = text => ({ text })
const mono = text => ({ text, mono: true })
const paragraph = (...runs) => ({ text: runs.map(run => run.text).join(''), runs, bullet: false, level: 0 })
const copy = (...paragraphs) => ({ kind: 'text', paragraphs })
const terminal = (...commands) => ({ kind: 'code', text: commands.map(command => `$ ${command.trim()}`).join('\n') })

const ignore = {
  kind: 'content', title: 'Il file .gitignore', sourceSlide: null, sourceSlides: [], sourceKind: 'course-addition',
  part: 1, parts: 1, layout: 'columns',
  blocks: [
    copy(paragraph(run('Crea un file chiamato '), mono('.gitignore'), run(' nella radice del progetto. Scrivi un pattern per riga e includi il file nel primo commit.')),
      paragraph(run('Git applica le regole ai file non ancora tracciati. I file già tracciati restano nel repository.'))),
    { kind: 'code', text: '# Dipendenze e file generati\nnode_modules/\ndist/\n\n# Configurazione locale, log e file di sistema\n.env\n.env.*\n*.log\n.DS_Store' },
  ],
  sources: [{ title: 'Documentazione Git', url: 'https://git-scm.com/docs/gitignore' }],
}

function shortcut(paragraph, pattern, keys) {
  paragraph.runs = paragraph.runs.flatMap(fragment => {
    const index = fragment.text.search(pattern)
    if (index < 0) return [fragment]
    const matched = fragment.text.match(pattern)[0]
    return [
      { ...fragment, text: fragment.text.slice(0, index) },
      { text: keys.join(' → '), shortcut: keys },
      { ...fragment, text: fragment.text.slice(index + matched.length) },
    ].filter(fragment => fragment.text)
  })
  paragraph.text = paragraph.runs.map(fragment => fragment.text).join('')
}

function installationTerminal(block) {
  const [version, identity, ssh, ...rest] = block.paragraphs
  const [versionCommand] = version.runs.filter(run => run.mono)
  const identityCommands = identity.runs.filter(run => run.mono)
  const [sshCommand] = ssh.runs.filter(run => run.mono)
  return [
    [
      copy(version, paragraph(identity.runs[0])),
      terminal(versionCommand.text, ...identityCommands.map(run => run.text.replace(/[“”]/g, '"'))),
      copy(paragraph(ssh.runs[0])),
      terminal(sshCommand.text),
      copy(paragraph(run('Premete invio confermando ogni prompt senza inserire niente.'))),
    ],
    [copy(...rest)],
  ]
}

export function reviseGitExercise(source) {
  const figures = gitFigures(source)
  const dividers = new Set([3, 8, 15, 19, 29])
  const columns = new Set([20, 25, 38])
  const splitAfter = { 10: 4, 12: 4 }
  const slides = structuredClone(source).flatMap(page => {
    const { sourceSlide, title } = page
    const cover = sourceSlide === 1
    const closing = sourceSlide === source.length
    const kind = cover ? 'cover' : closing ? 'closing' : dividers.has(sourceSlide) ? 'divider' : 'content'
    let blocks = cover || closing ? [] : page.blocks.map(block => {
      if (block.kind !== 'image') return block
      const figure = figures[block.src]
      return {
        kind: 'figure', src: figure.src, alt: captures[sourceSlide]?.alt ?? block.alt,
        ...(figure.kind === 'diagram' ? {
          alt: 'Working Directory → Git Add → Staging Area → Git Commit → Local Repo (HEAD) → Git Push → Remote Repo (MAIN). Git Merge va dal repository locale alla cartella di lavoro, Git Fetch dal remoto al repository locale, Git Pull dal remoto alla cartella di lavoro.',
          caption: 'Flusso di lavoro Git, dalla slide originale 14.',
        } : {}),
        ...(sourceSlide === 38 ? { crop: historyCrop } : {}),
        showCaption: false,
      }
    })
    const layout = sourceSlide === 14 ? 'wide-diagram' : columns.has(sourceSlide) ? 'columns' : blocks.some(block => block.kind === 'figure')
      ? blocks.length === 1 ? 'figure' : 'diagram'
      : undefined
    if (layout === 'columns') {
      const paragraphs = blocks.filter(block => block.kind === 'text').flatMap(block => block.paragraphs)
      blocks = [{ kind: 'text', paragraphs }, ...blocks.filter(block => block.kind !== 'text')]
    }
    if (sourceSlide === 21) shortcut(blocks[0].paragraphs[0], /“\+”/, ['+'])
    if (sourceSlide === 22) shortcut(blocks[0].paragraphs[0], /puntini -> Commit -> Undo last Commit/, ['⋯', 'Commit', 'Undo Last Commit'])
    if (sourceSlide === 27) shortcut(blocks[0].paragraphs[0], /i tre “puntini -> Branch -> Merge Branch…”/, ['⋯', 'Branch', 'Merge…'])
    if (sourceSlide === 32) {
      const first = blocks[0].paragraphs[0]
      shortcut(first, /puntini -> Remote -> Add Remote…/, ['⋯', 'Remote', 'Add Remote…'])
      first.runs[0].text = 'In Source Control, accanto al repository, selezionate '
      first.text = first.runs.map(run => run.text).join('')
    }
    const split = splitAfter[sourceSlide]
    const parts = sourceSlide === 17 ? installationTerminal(blocks[0]) : split ? [blocks[0].paragraphs.slice(0, split), blocks[0].paragraphs.slice(split)]
      .map(paragraphs => [{ ...blocks[0], paragraphs, text: paragraphs.map(p => p.text).join('\n') }]) : [blocks]
    const numberedTitle = parts.length > 1
    const pages = parts.map((blocks, index) => ({
      sourceSlide, sourceSlides: [sourceSlide],
      title: cover ? 'Git' : closing ? 'Fine esercitazione 08' : numberedTitle ? `${title} [${index + 1}]` : title,
      kind, blocks, part: numberedTitle ? 1 : index + 1, parts: numberedTitle ? 1 : parts.length,
      ...(layout && !cover ? { layout } : {}),
    }))
    return sourceSlide === 20 ? [...pages, ignore] : pages
  })
  return slides.map((slide, index) => ({ ...slide, number: index + 1 }))
}
