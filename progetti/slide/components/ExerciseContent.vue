<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
import { computed, shallowRef, watch } from 'vue'
import LessonFigure from './LessonFigure.vue'
import ExerciseAnnotatedCode from './ExerciseAnnotatedCode.vue'
import ExerciseTagReference, { type TagReference } from './ExerciseTagReference.vue'
import ExercisePathReference, { type PathReference } from './ExercisePathReference.vue'
import ExerciseNative from './ExerciseNative.vue'
import { highlightExerciseCode, exerciseCodeLanguage } from '../utils/exercise-code.mjs'

interface Run { text: string; href?: string; bold?: boolean; italic?: boolean; underline?: boolean; mono?: boolean }
interface Paragraph { text: string; runs: Run[]; bullet?: boolean; level?: number }
interface Block { kind: string; resourceLayout?: 'list'; showHint?: boolean; items?: TagReference[]; paths?: PathReference[]; arrangement?: 'stacked-pair' | 'rows' | 'example-result' | 'samples' | 'grid'; sharedTraits?: string[]; opening?: string; closing?: string; labels?: string[]; text?: string; paragraphs?: Paragraph[]; rows?: string[][]; src?: string; crop?: [number, number, number, number]; alt?: string; caption?: string; example?: string; resources?: { title: string; url: string }[] }
interface ExerciseSlide { layout?: string; number: number; sourceSlide: number | null; sourceKind?: string; part: number; parts: number; kind: string; blocks: Block[]; sources?: { title: string; url: string }[]; credit?: string }
// Preserve source runs while recognizing tags embedded in ordinary prose.
function inlineRuns(runs: Run[]) {
  return runs.flatMap(run => run.mono ? [run] : run.text.split(/(<\/?[a-z][^<>]*>)/gi).filter(Boolean).map(text => ({ ...run, text, mono: /^<\/?[a-z][^<>]*>$/i.test(text) })))
}
const props = defineProps<{ exercise: string; slide: number }>()
// Only the authorized exercise data enters production bundles.
const files = import.meta.env.PROD
  ? { '../data/esercitazioni/01.json': () => import('../data/esercitazioni/01.json').then(module => module.default) }
  : import.meta.glob('../data/esercitazioni/*.json', { import: 'default' })
const slides = shallowRef<ExerciseSlide[]>([])
watch(() => props.exercise, async exercise => {
  const load = files[`../data/esercitazioni/${exercise}.json`]
  if (!load) throw new Error(`Esercitazione sconosciuta: ${exercise}`)
  slides.value = await load() as ExerciseSlide[]
}, { immediate: true })
const content = computed(() => slides.value.find(slide => slide.number === props.slide))
</script>

<template>
  <div v-if="content" :class="['exercise-content', { 'exercise-content--diagram': content.layout === 'diagram', 'exercise-content--figure': content.layout === 'figure', 'exercise-content--screenshot': content.layout === 'screenshot', 'exercise-content--columns': content.layout === 'columns', 'exercise-content--code-columns': content.layout === 'code-columns' }]" :data-exercise-slide="content.number" :data-source-slide="content.sourceSlide" :data-source-kind="content.sourceKind">
    <span v-if="content.parts > 1" class="badge badge-outline exercise-continuation" :aria-label="`Parte ${content.part} di ${content.parts}`">{{ content.part }} / {{ content.parts }}</span>
    <template v-for="(block, index) in content.blocks" :key="index">
      <ExercisePathReference v-if="block.kind === 'path-reference'" :items="block.paths!" />
      <ExerciseTagReference v-else-if="block.kind === 'tag-reference'" :items="block.items!" :arrangement="block.arrangement" :shared-traits="block.sharedTraits" />
      <ExerciseAnnotatedCode v-else-if="block.kind === 'annotated-code'" :text="block.text!" :opening="block.opening!" :closing="block.closing!" :labels="block.labels!" />
      <div v-else-if="block.kind === 'code'" class="mockup-code exercise-code"><pre><code :data-language="exerciseCodeLanguage(block.text)" v-html="highlightExerciseCode(block.text)" /></pre></div>
      <div v-else-if="block.kind === 'text'" class="exercise-copy">
        <template v-for="(paragraph, p) in block.paragraphs" :key="p">
          <component :is="paragraph.bullet ? 'ul' : 'div'" :class="{ 'exercise-list': paragraph.bullet }">
            <component :is="paragraph.bullet ? 'li' : 'p'">
              <template v-for="(run, r) in inlineRuns(paragraph.runs)" :key="r">
                <component :is="run.href ? 'a' : run.mono ? 'code' : 'span'" :href="run.href ? publicAsset(run.href) : undefined" :target="run.href ? '_blank' : undefined" :rel="run.href ? 'noopener noreferrer' : undefined" :class="{ 'font-semibold': run.bold, italic: run.italic, underline: run.underline, link: run.href, 'exercise-inline-code': run.mono }">{{ run.text }}</component>
              </template>
            </component>
          </component>
        </template>
      </div>
      <table v-else-if="block.kind === 'table'" class="table exercise-table"><tbody><tr v-for="(row, y) in block.rows" :key="y"><component :is="y === 0 ? 'th' : 'td'" v-for="(cell, x) in row" :key="x" :scope="y === 0 ? 'col' : undefined">{{ cell }}</component></tr></tbody></table>
      <LessonFigure v-else-if="block.kind === 'figure'" :src="block.src!" :alt="block.alt!" :caption="block.caption" :crop="block.crop" />
      <ExerciseNative v-else-if="block.kind === 'native' && block.example" :example="block.example" :caption="block.caption" />
      <div v-else-if="block.kind === 'resources'" class="exercise-resource-group" :class="{ 'exercise-resource-group--list': block.resourceLayout === 'list' }">
        <ul class="list exercise-resources">
          <li v-for="resource in block.resources" :key="resource.url" class="list-row"><a class="link" :href="resource.url" target="_blank" rel="noopener noreferrer">{{ resource.title }}<span class="sr-only"> (si apre in una nuova scheda)</span></a></li>
        </ul>
        <p v-if="block.showHint !== false" class="exercise-resource-hint">I collegamenti si aprono in una nuova scheda.</p>
      </div>
    </template>
    <p v-if="content.kind === 'closing'" class="lead">{{ content.credit || 'Elia Guarnieri · elia.guarnieri@unimib.it' }}</p>
    <p v-if="content.sources?.length" class="exercise-sources">
      <span>Fonti: </span><template v-for="(source, i) in content.sources" :key="source.url"><span v-if="i"> · </span><a class="link" :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a></template>
    </p>
  </div>
</template>
