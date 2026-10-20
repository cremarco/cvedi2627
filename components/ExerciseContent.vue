<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import ExerciseNative from './ExerciseNative.vue'

interface Run { text: string; href?: string; bold?: boolean; italic?: boolean; underline?: boolean; mono?: boolean }
interface Paragraph { text: string; runs: Run[]; bullet?: boolean; level?: number }
interface Block { kind: string; text?: string; paragraphs?: Paragraph[]; rows?: string[][]; src?: string; alt?: string; caption?: string; example?: string }
interface ExerciseSlide { number: number; sourceSlide: number | null; sourceKind?: string; part: number; parts: number; kind: string; blocks: Block[]; sources?: { title: string; url: string }[]; credit?: string }
const props = defineProps<{ exercise: string; slide: number }>()
const files = import.meta.glob('../data/esercitazioni/*.json', { import: 'default' })
const slides = shallowRef<ExerciseSlide[]>([])
watch(() => props.exercise, async exercise => {
  const load = files[`../data/esercitazioni/${exercise}.json`]
  if (!load) throw new Error(`Esercitazione sconosciuta: ${exercise}`)
  slides.value = await load() as ExerciseSlide[]
}, { immediate: true })
const content = computed(() => slides.value.find(slide => slide.number === props.slide))
</script>

<template>
  <div v-if="content" class="exercise-content" :data-exercise-slide="content.number" :data-source-slide="content.sourceSlide" :data-source-kind="content.sourceKind">
    <span v-if="content.parts > 1" class="badge badge-outline exercise-continuation" :aria-label="`Parte ${content.part} di ${content.parts}`">{{ content.part }} / {{ content.parts }}</span>
    <template v-for="(block, index) in content.blocks" :key="index">
      <div v-if="block.kind === 'code'" class="mockup-code exercise-code"><pre><code>{{ block.text }}</code></pre></div>
      <div v-else-if="block.kind === 'text'" class="exercise-copy">
        <template v-for="(paragraph, p) in block.paragraphs" :key="p">
          <component :is="paragraph.bullet ? 'ul' : 'div'" :class="{ 'exercise-list': paragraph.bullet }">
            <component :is="paragraph.bullet ? 'li' : 'p'">
              <template v-for="(run, r) in paragraph.runs" :key="r">
                <component :is="run.href ? 'a' : 'span'" :href="run.href" :class="{ 'font-semibold': run.bold, italic: run.italic, underline: run.underline, link: run.href, 'exercise-inline-code': run.mono }">{{ run.text }}</component>
              </template>
            </component>
          </component>
        </template>
      </div>
      <table v-else-if="block.kind === 'table'" class="table exercise-table"><tbody><tr v-for="(row, y) in block.rows" :key="y"><component :is="y === 0 ? 'th' : 'td'" v-for="(cell, x) in row" :key="x" :scope="y === 0 ? 'col' : undefined">{{ cell }}</component></tr></tbody></table>
      <ExerciseNative v-else-if="block.kind === 'native' && block.example" :example="block.example" :caption="block.caption" />
    </template>
    <p v-if="content.kind === 'closing'" class="lead">{{ content.credit || 'Elia Guarnieri · elia.guarnieri@unimib.it' }}</p>
    <p v-if="content.sources?.length" class="exercise-sources">
      <span>Fonti: </span><template v-for="(source, i) in content.sources" :key="source.url"><span v-if="i"> · </span><a class="link" :href="source.url">{{ source.title }}</a></template>
    </p>
  </div>
</template>
