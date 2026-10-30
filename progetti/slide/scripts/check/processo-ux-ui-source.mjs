import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../../../..', import.meta.url))
const read = async file => JSON.parse(await readFile(path.join(root, file), 'utf8'))
const sha = async file => createHash('sha256').update(await readFile(path.join(root, file))).digest('hex')
export async function checkUxProcessSources(deck) {
  const manifest = await read('progetti/slide/assets/booklet/lezione-processo-ux-ui/manifest.json')
  const plan = await read(manifest.editorialPlan)
  const assets = await read(manifest.imageManifest)
  const sources = await read(manifest.references)
  const slides = deck.slides.filter(slide => slide.frontmatter.lesson === manifest.lesson)
  assert.equal(manifest.number, 11)
  assert.equal(manifest.palette, 'violet')
  assert.equal(manifest.slideCount, 104, 'intentional extension: fourteen applications, six case diagrams and four prototype versions')
  assert.equal(slides.length, manifest.slideCount)
  assert.equal(plan.slides.length, slides.length)
  assert.equal(await sha(manifest.sourceFile), manifest.sourceSha256, 'current chapter provenance')
  assert.deepEqual([...new Set(plan.slides.map(slide => slide.step).filter(Boolean))], Array.from({ length: 14 }, (_, i) => i + 1))
  assert.equal(new Set(plan.slides.map(slide => slide.alias)).size, slides.length, 'unique routes')
  assert.deepEqual(plan.slides.filter(slide => slide.kind === 'step-intro').map(slide => slide.step), Array.from({ length: 14 }, (_, i) => i + 1), 'all fourteen steps share the same opening structure')
  const previous = await read('progetti/slide/assets/booklet/lezione-processo-ux-ui/revisioni/prima-estensione.json')
  assert.ok(previous['content-plan.json'].slides.every(old => plan.slides.some(slide => slide.alias === old.alias)), 'all earlier bookmarks remain valid after the extension')
  assert.equal(plan.slides.reduce((sum, slide) => sum + slide.minutes, 0), manifest.minutes)
  assert.equal(manifest.activityMinutes, 18)
  assert.deepEqual(plan.slides.filter(slide => slide.kind === 'activity').map(slide => slide.minutes), [8, 10])
  assert.ok(sources.sources.some(source => source.id === 'book' && source.physicalPages[0] === 38 && source.physicalPages[1] === 45))
  assert.ok(sources.sources.some(source => source.id === 'booklet-2024'))
  assert.ok(sources.sources.filter(source => source.id.startsWith('old-')).length >= 5)
  for (const source of sources.sources) {
    assert.match(source.sha256, /^[a-f0-9]{64}$/)
    if (!path.isAbsolute(source.file)) assert.equal(await sha(source.file), source.sha256, source.id + ': intact preparatory source')
  }
  const images = new Map(assets.images.map(image => [image.code, image]))
  const serviceCase = await read(manifest.serviceCaseData)
  const prototype = await read(manifest.servicePrototypeData)
  for (const key of ['name', 'person', 'address', 'date', 'dateLabel', 'time', 'alternativeTime', 'durationMinutes'])
    assert.equal(serviceCase.service[key], prototype.service[key], 'case and prototype share ' + key)
  assert.equal(serviceCase.service.provider, prototype.service.professional)
  assert.equal(serviceCase.service.totalEuros, prototype.service.priceEuro)
  assert.equal(prototype.service.travelIncluded, true, 'the simulated total includes travel')
  assert.deepEqual(serviceCase.stages.map(stage => stage.step), Array.from({ length: 14 }, (_, i) => i + 1), 'the scenario is applied at every step')
  assert.deepEqual(serviceCase.iterations.map(item => [item.from, item.to]), [['v0', 'v1'], ['v1', 'v2'], ['v2', 'v3']], 'three consecutive revisions lead to the final service')
  assert.ok(serviceCase.iterations.every(item => item.simulated && item.problem && item.change && item.proof), 'simulated episodes link problems, revisions and checks')
  assert.equal(new Set(serviceCase.stages.map(stage => stage.artifactId)).size, 14, 'fourteen identifiable deliverables')
  assert.ok(serviceCase.openQuestions.length >= 3, 'the final proposal keeps unresolved service questions visible')
  const realService = slides.find(slide => slide.frontmatter.routeAlias === 'processo-ux-ui-servizio-reale')
  for (const question of serviceCase.openQuestions) assert.ok(realService.content.includes(question), 'open service questions remain visible')
  for (const [index, stage] of serviceCase.stages.entries()) {
    if (index) assert.equal(stage.inputRef, serviceCase.stages[index - 1].artifactId, 'each deliverable feeds the next step')
    const opener = plan.slides.findIndex(slide => slide.kind === 'step-intro' && slide.step === stage.step)
    const application = plan.slides[opener + 1]
    assert.equal(application.kind, 'case-application', 'each opening is immediately applied to the scenario')
    assert.equal(application.artifactId, stage.artifactId)
  }
  assert.deepEqual(plan.slides.filter(slide => slide.kind === 'service-prototype').map(slide => slide.prototypeVersion), ['v0', 'v1', 'v2', 'v3'], 'all four service versions are demonstrated')
  const used = new Set()
  for (const [index, slide] of slides.entries()) {
    const expected = plan.slides[index]
    assert.equal(slide.frontmatter.lessonSlide, index + 1)
    assert.equal(slide.frontmatter.routeAlias, expected.alias)
    assert.equal(slide.title, expected.title)
    assert.equal(slide.frontmatter.localOnly, true, 'new lesson remains in the local preview')
    assert.equal(slide.frontmatter.lessonMinutes, expected.minutes)
    assert.equal(slide.frontmatter.uxStep, expected.step ?? undefined)
    assert.ok(!slide.note?.trim(), 'no unrequested speaker notes')
    assert.ok(!slide.frontmatter.narrationAudio, 'no unrequested narration')
    assert.doesNotMatch(slide.content, /pascale|manuale di sopravvivenza|utenti del libro/i, 'requested author references stay out of visible copy and image alternatives')
    for (const key of expected.sourceKeys ?? [])
      assert.ok(sources.contentSources.some(source => source.id === key), key + ': documented extension source')
    assert.deepEqual(slide.frontmatter.bookletFigures, expected.figures)
    if (expected.kind === 'step-intro') {
      assert.equal(expected.points.length, 3, 'each step states three activities')
      assert.ok(expected.lead.endsWith('?') && expected.output, 'each step states a question and an expected output')
      assert.equal(expected.figures.length, 0, 'examples retain their own readable space')
      assert.deepEqual([...slide.content.matchAll(/<dt>(.*?)<\/dt>/g)].map(match => match[1]), ['Domanda', 'Attività', 'Risultato', 'Dal corso'], 'common field order')
      const recall = expected.courseRecall
      assert.ok(recall.label && recall.application && recall.lessonNumber < 11, 'applied recall of an earlier lesson')
      const prior = await readFile(path.join(root, recall.source), 'utf8')
      assert.ok(prior.split('\n').some(line => line.startsWith('routeAlias:') && line.split(':').slice(1).join(':').trim().replaceAll('"', '') === recall.alias), 'recall is grounded in an actual earlier slide')
      assert.ok(slide.content.includes(recall.application), 'applied course connection is visible')
    }
    if (expected.kind === 'case-application') {
      const stage = serviceCase.stages.find(stage => stage.step === expected.step)
      for (const text of [stage.context, stage.decision, stage.artifactTitle, stage.handoff, ...stage.rows.map(row => row.text)]) assert.ok(slide.content.includes(text), 'complete case application remains visible')
      assert.match(slide.content, /Caso simulato/)
    }
    if (expected.kind === 'service-prototype') assert.match(slide.content, new RegExp(`<UxServicePrototype version="${expected.prototypeVersion}"`))
    if (expected.cards) {
      assert.ok([2, 3].includes(expected.cards.length), 'parallel concepts keep two or three columns')
      for (const card of expected.cards) assert.ok(card.title && card.text, 'headings and complete explanations retained')
    }
    const prose = [expected.lead, ...expected.points, ...(expected.cards ?? []).map(card => card.text)].join(' ')
    for (const phrase of expected.emphasis ?? []) assert.ok(prose.includes(phrase), phrase + ': emphasis belongs to actual copy')
    for (const code of expected.figures) {
      const image = images.get(code)
      assert.ok(image?.caption && image.rights && image.alt, code + ': caption, attribution and alt')
      assert.doesNotMatch(image.caption + ' ' + image.alt, /pascale|manuale di sopravvivenza/i)
      assert.ok(slide.content.includes(image.web), code + ': expected figure')
      assert.equal(await sha(image.source), image.sourceSha256, code + ': retained source')
      assert.equal(await sha('progetti/slide/public' + image.web), image.sha256, code + ': intact web bytes')
      if (image.reconstruction) {
        const reconstruction = image.reconstruction
        assert.notEqual(image.source, reconstruction.original.source, 'reconstruction has a separate source')
        assert.equal(await sha(reconstruction.original.source), reconstruction.original.sha256, 'earlier figure retained')
        assert.equal(await sha(reconstruction.renderer), reconstruction.rendererSha256, 'editable slide reconstruction retained')
        assert.equal(reconstruction.palette, 'violet/Cedro')
        assert.equal(reconstruction.bodySize, 15.5)
        const svg = await readFile(path.join(root, image.source), 'utf8')
        assert.match(svg, /data-cvedi-body-size="15.5"/)
        assert.equal(Number(svg.match(/viewBox="0 0 ([\d.]+)/)?.[1]), reconstruction.canvasWidth, 'reading scale matches actual SVG geometry')
        assert.equal(reconstruction.zoomClearance, 40, 'zoom control has its own clear area')
      }
      if (image.nativeDiagram) {
        const diagram = image.nativeDiagram
        assert.equal(await sha(diagram.renderer), diagram.rendererSha256, 'native case renderer retained')
        assert.equal(diagram.bodySize, 15.5)
        assert.equal(diagram.zoomClearance, 40)
        const svg = await readFile(path.join(root, image.source), 'utf8')
        assert.match(svg, /data-cvedi-body-size="15.5"/)
        assert.equal(Number(svg.match(/viewBox="0 0 ([\d.]+)/)?.[1]), diagram.canvasWidth)
      }
      used.add(code)
    }
    for (const reference of expected.references.filter(item => item.url)) {
      assert.match(reference.url, /^https:\/\//)
      assert.ok(slide.content.includes(reference.url))
    }
  }
  assert.equal(used.size, assets.images.length, 'every lesson figure has an active owner')
  assert.equal(assets.objectiveArtwork.length, 3)
  assert.equal(assets.images.filter(image => image.reconstruction).length, 25, 'didactic diagrams rebuilt for slide reading')
  assert.equal(assets.images.filter(image => image.nativeDiagram).length, 6, 'six new cumulative service examples')
  const diagramFont = await read('progetti/slide/assets/slide-materials/processo-ux-ui/ricostruite/font/manifest.json')
  for (const instance of diagramFont.instances) assert.equal(await sha(instance.file), instance.sha256, 'Nunito Sans outline instance retained')
  assert.equal(await sha(diagramFont.source), diagramFont.sourceSha256, 'original web font retained')
  assert.equal(await sha(diagramFont.license), diagramFont.licenseSha256, 'font license retained')
  const earlierDesign = await read('progetti/slide/assets/booklet/lezione-processo-ux-ui/revisioni/prima-revisione-didattica.json')
  const earlierAliases = new Set(earlierDesign.slides.map(slide => slide.alias))
  assert.deepEqual(plan.slides.filter(slide => earlierAliases.has(slide.alias)).map(slide => slide.alias), earlierDesign.slides.map(slide => slide.alias), 'all earlier bookmarks keep their relative sequence')
  assert.deepEqual(plan.slides.filter(slide => earlierAliases.has(slide.alias)).map(slide => slide.minutes), earlierDesign.slides.map(slide => slide.minutes), 'existing slide and activity durations remain intact')
  for (const reference of plan.designReferences) assert.ok((await readFile(path.join(root, reference.source), 'utf8')).trim(), 'actual earlier slide source')
  const illustrations = await read('progetti/slide/assets/theme-imagegen/lesson-11-process/manifest.json')
  assert.equal(illustrations.images.length, 5, 'five requested editorial illustrations')
  for (const illustration of illustrations.images) {
    const owner = plan.slides.find(slide => slide.slug === illustration.slideSlug)
    assert.equal(owner.kind, 'illustrated', 'illustration uses the shared text and image layout')
    assert.deepEqual(owner.figures, [illustration.code])
    assert.equal(await sha(illustration.original), illustration.originalSha256, 'original generated PNG retained')
    assert.equal(await sha(illustration.prompt), illustration.promptSha256, 'generation prompt retained')
    assert.equal(await sha(illustration.derivative), illustration.sha256, 'lossless derivative retained')
    assert.equal(images.get(illustration.code).generationTool, 'image_gen integrato')
    assert.match(images.get(illustration.code).rights, /generata con IA/)
  }
  const map = await read(manifest.processMapData)
  assert.equal(map.lesson, manifest.lesson)
  assert.deepEqual(map.steps.map(step => step.number), Array.from({ length: 14 }, (_, index) => index + 1))
  assert.deepEqual(map.phases.flatMap(phase => phase.steps), map.steps.map(step => step.number), 'five phases contain each step once in order')
  assert.equal(map.phases.length, 5)
  assert.doesNotMatch(JSON.stringify(map), /pascale|manuale di sopravvivenza/i)
  for (const step of map.steps) {
    assert.ok(step.goal && step.activity && step.output && step.relatedLabel)
    assert.ok(slides.some(slide => slide.frontmatter.routeAlias === step.target && slide.frontmatter.uxStep === step.number), 'step opens its own explanation')
    assert.ok(map.steps.some(candidate => candidate.number === step.relatedStep), 'iteration returns to an existing step')
  }
  assert.match(slides.find(slide => slide.frontmatter.routeAlias === 'processo-ux-ui-mappa').content, /<UxProcessExplorer\b/)
  for (const icon of assets.objectiveArtwork) {
    assert.equal(await sha(icon.source), icon.sha256)
    assert.equal(await sha('progetti/slide/public' + icon.web), icon.sha256)
  }
  const chapter = await readFile(path.join(root, manifest.sourceFile), 'utf8')
  for (const slide of plan.slides.filter(slide => slide.kind !== 'references'))
    assert.ok(chapter.includes('== ' + slide.sourceHeading), slide.alias + ': actual chapter heading')
  return { slides: slides.length, minutes: manifest.minutes, activityMinutes: manifest.activityMinutes,
    figures: used.size, objectiveArtwork: assets.objectiveArtwork.length, localOnly: true }
}
