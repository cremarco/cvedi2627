<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
import { computed, shallowRef, watch } from 'vue'
import LessonFigure from './LessonFigure.vue'
import LessonTable from './LessonTable.vue'
import AcronymText from './AcronymText.vue'
import ExerciseAnnotatedCode from './ExerciseAnnotatedCode.vue'
import ExerciseTagReference, { type TagReference } from './ExerciseTagReference.vue'
import ExercisePathReference, { type PathReference } from './ExercisePathReference.vue'
import ExerciseNative from './ExerciseNative.vue'
import ExerciseSpecificity from './ExerciseSpecificity.vue'
import ExerciseOriginalLayout, { type OriginalLayout } from './ExerciseOriginalLayout.vue'
import ExerciseDisplayTable from './ExerciseDisplayTable.vue'
import { highlightExerciseCode, exerciseCodeLanguage } from '../utils/exercise-code.mjs'

interface Run { superscript?: boolean; text: string; href?: string; bold?: boolean; italic?: boolean; underline?: boolean; mono?: boolean }
interface Paragraph { text: string; runs: Run[]; bullet?: boolean; level?: number }
interface Block { segments?: { text: string; label?: string }[]; fileHeaders?: boolean; figures?: { src: string; alt: string; showDialogTitle?: boolean }[]; files?: { label: string; text: string }[]; title?: string; kind: string; widths?: number[]; italicCells?: string[]; codeColumns?: number[]; showCaption?: boolean; showDialogTitle?: boolean; content?: OriginalLayout; resourceLayout?: 'list' | 'plain'; showHint?: boolean; items?: TagReference[]; paths?: PathReference[]; arrangement?: 'stacked-pair' | 'rows' | 'example-result' | 'explanation-code' | 'explanation-figure' | 'samples' | 'grid'; sharedTraits?: string[]; opening?: string; closing?: string; labels?: string[]; text?: string; paragraphs?: Paragraph[]; rows?: string[][]; src?: string; crop?: [number, number, number, number]; alt?: string; caption?: string; example?: string; resources?: { title: string; url: string }[] }
interface ExerciseSlide { showSources?: boolean; title: string; layout?: string; number: number; sourceSlide: number | null; sourceKind?: string; part: number; parts: number; kind: string; blocks: Block[]; sources?: { title: string; url: string; visible?: boolean }[]; credit?: string }
// Preserve source runs while recognizing tags embedded in ordinary prose.
function inlineRuns(runs: Run[]) {
  return runs.flatMap(run => run.mono ? [run] : run.text.split(/(<\/?[a-z][^<>]*>)/gi).filter(Boolean).map(text => ({ ...run, text, mono: /^<\/?[a-z][^<>]*>$/i.test(text) })))
}
const props = defineProps<{ exercise: string; slide: number }>()
// Only authorized exercise data enters production bundles.
const files = import.meta.env.PROD
  ? {
      '../data/esercitazioni/01.json': () => import('../data/esercitazioni/01.json').then(module => module.default),
      '../data/esercitazioni/02.json': () => import('../data/esercitazioni/02.json').then(module => module.default),
      '../data/esercitazioni/03.json': () => import('../data/esercitazioni/03.json').then(module => module.default),
      '../data/esercitazioni/04.json': () => import('../data/esercitazioni/04.json').then(module => module.default),
      '../data/esercitazioni/05.json': () => import('../data/esercitazioni/05.json').then(module => module.default),
      '../data/esercitazioni/06.json': () => import('../data/esercitazioni/06.json').then(module => module.default),
    }
  : import.meta.glob('../data/esercitazioni/*.json', { import: 'default' })
const slides = shallowRef<ExerciseSlide[]>([])
watch(() => props.exercise, async exercise => {
  const load = files[`../data/esercitazioni/${exercise}.json`]
  if (!load) throw new Error(`Esercitazione sconosciuta: ${exercise}`)
  slides.value = await load() as ExerciseSlide[]
}, { immediate: true })
const content = computed(() => slides.value.find(slide => slide.number === props.slide))
const visibleSources = computed(() => content.value?.showSources === false ? [] : (content.value?.sources ?? []).filter(source => source.visible !== false))
</script>

<template>
  <div v-if="content" :class="['exercise-content', { 'exercise-content--diagram': content.layout === 'diagram', 'exercise-content--figure': content.layout === 'figure', 'exercise-content--sizing': content.layout === 'sizing-example', 'exercise-content--display-overview': content.layout === 'display-overview', 'exercise-content--screenshot': content.layout === 'screenshot', 'exercise-content--columns': content.layout === 'columns', 'exercise-content--code-columns': ['code-columns', 'code-columns-wide-first'].includes(content.layout ?? ''), 'exercise-content--code-columns-wide-first': content.layout === 'code-columns-wide-first', 'exercise-content--comparison': content.layout === 'comparison' }]" :data-exercise="exercise" :data-exercise-slide="content.number" :data-source-slide="content.sourceSlide" :data-source-kind="content.sourceKind">
    <span v-if="content.parts > 1" class="badge badge-outline exercise-continuation" :aria-label="`Parte ${content.part} di ${content.parts}`">{{ content.part }} / {{ content.parts }}</span>
    <template v-for="(block, index) in content.blocks" :key="index">
      <ExerciseOriginalLayout v-if="block.kind === 'original-layout'" :content="block.content!" />
      <ExerciseDisplayTable v-else-if="block.kind === 'display-comparison'" :rows="block.rows!" :caption="block.caption" />
      <ExercisePathReference v-else-if="block.kind === 'path-reference'" :items="block.paths!" />
      <ExerciseSpecificity v-else-if="block.kind === 'specificity-examples'" :reveal="block.example === 'reveal'" />
      <ExerciseTagReference v-else-if="block.kind === 'tag-reference'" :items="block.items!" :arrangement="block.arrangement" :shared-traits="block.sharedTraits" />
      <ExerciseAnnotatedCode v-else-if="block.kind === 'annotated-code'" :text="block.text!" :opening="block.opening" :closing="block.closing" :labels="block.labels" :segments="block.segments" />
      <section v-else-if="block.kind === 'code-group'" class="exercise-code-group">
        <h2 v-if="block.title">{{ block.title }}</h2>
        <div v-for="file in block.files" :key="file.label" class="exercise-code-file">
          <h3 v-if="!block.fileHeaders">{{ file.label }}</h3>
          <div class="mockup-code exercise-code" :class="{ 'exercise-code--file-header': block.fileHeaders }">
            <span v-if="block.fileHeaders" class="exercise-code-file-title">{{ file.label }}</span>
            <pre><code :data-language="exerciseCodeLanguage(file.text)" v-html="highlightExerciseCode(file.text)" /></pre>
          </div>
        </div>
      </section>
      <div v-else-if="block.kind === 'figure-group'" class="exercise-figure-group">
        <LessonFigure v-for="figure in block.figures" :key="figure.src" :src="figure.src" :alt="figure.alt" :show-dialog-title="figure.showDialogTitle" />
      </div>
      <p v-else-if="block.kind === 'citation'" class="exercise-citation">
        <template v-for="(run, r) in block.paragraphs![0].runs" :key="r"><component :is="run.href ? 'a' : 'span'" :href="run.href" :target="run.href ? '_blank' : undefined" :rel="run.href ? 'noopener noreferrer' : undefined" :class="{ italic: run.italic, link: run.href }">{{ run.text }}</component></template>
      </p>
      <div v-else-if="block.kind === 'code'" class="mockup-code exercise-code"><pre><code :data-language="exerciseCodeLanguage(block.text)" v-html="highlightExerciseCode(block.text)" /></pre></div>
      <div v-else-if="block.kind === 'text'" class="exercise-copy">
        <template v-for="(paragraph, p) in block.paragraphs" :key="p">
          <component :is="paragraph.bullet ? 'ul' : 'div'" :class="{ 'exercise-list': paragraph.bullet }">
            <component :is="paragraph.bullet ? 'li' : 'p'">
              <template v-for="(run, r) in inlineRuns(paragraph.runs)" :key="r">
                <sup v-if="run.superscript"><a class="link" :href="run.href" target="_blank" rel="noopener noreferrer">{{ run.text }}</a></sup>
                <component v-else :is="run.href ? 'a' : run.mono ? 'code' : 'span'" :href="run.href ? publicAsset(run.href) : undefined" :target="run.href ? '_blank' : undefined" :rel="run.href ? 'noopener noreferrer' : undefined" :class="{ 'font-semibold': run.bold, italic: run.italic, underline: run.underline, link: run.href, 'exercise-inline-code': run.mono }">{{ run.text }}</component>
              </template>
            </component>
          </component>
        </template>
      </div>
      <LessonTable v-else-if="block.kind === 'table' && ['05', '06'].includes(exercise)" :definition="{ title: content.title, headers: block.rows![0], widths: block.widths ?? (block.rows![0].length === 2 ? [32, 68] : [27, 38, 35]), rows: block.rows!.slice(1), note: '', caption: '' }">
        <template #cell="{ text, column }"><em v-if="block.italicCells?.includes(text)">{{ text }}</em><code v-else-if="block.codeColumns?.includes(column)">{{ text }}</code><AcronymText v-else :text="text" /></template>
      </LessonTable>
      <table v-else-if="block.kind === 'table'" class="table exercise-table"><tbody><tr v-for="(row, y) in block.rows" :key="y"><component :is="y === 0 ? 'th' : 'td'" v-for="(cell, x) in row" :key="x" :scope="y === 0 ? 'col' : undefined"><em v-if="block.italicCells?.includes(cell)">{{ cell }}</em><code v-else-if="y > 0 && block.codeColumns?.includes(x)">{{ cell }}</code><template v-else>{{ cell }}</template></component></tr></tbody></table>
      <LessonFigure v-else-if="block.kind === 'figure'" :src="block.src!" :alt="block.alt!" :caption="block.showCaption === false ? undefined : block.caption" :crop="block.crop" :show-dialog-title="block.showDialogTitle" />
      <ExerciseNative v-else-if="block.kind === 'native' && block.example" :example="block.example" :caption="block.caption" :show-hint="block.showHint" />
      <div v-else-if="block.kind === 'resources'" class="exercise-resource-group" :class="{ 'exercise-resource-group--list': block.resourceLayout === 'list' }">
        <template v-if="block.resourceLayout === 'plain'">
          <p v-for="resource in block.resources" :key="resource.url" class="exercise-resource-link"><a class="link" :href="resource.url" target="_blank" rel="noopener noreferrer">{{ resource.title }}<span class="sr-only"> (si apre in una nuova scheda)</span></a></p>
        </template>
        <ul v-else class="list exercise-resources">
          <li v-for="resource in block.resources" :key="resource.url" class="list-row"><a class="link" :href="resource.url" target="_blank" rel="noopener noreferrer">{{ resource.title }}<span class="sr-only"> (si apre in una nuova scheda)</span></a></li>
        </ul>
        <p v-if="block.showHint !== false" class="exercise-resource-hint">I collegamenti si aprono in una nuova scheda.</p>
      </div>
    </template>
    <p v-if="content.kind === 'closing'" class="lead">{{ content.credit || 'Elia Guarnieri · elia.guarnieri@unimib.it' }}</p>
    <p v-if="visibleSources.length" class="exercise-sources">
      <span>Fonti: </span><template v-for="(source, i) in visibleSources" :key="source.url"><span v-if="i"> · </span><a class="link" :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a></template>
    </p>
  </div>
</template>
