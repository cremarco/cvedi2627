<script setup lang="ts">
import { useSlideSet } from '../composables/use-slide-set'
import ExerciseResultContent, { type ExampleResult } from './ExerciseResultContent.vue'
import ExerciseNative from './ExerciseNative.vue'
import { highlightExerciseCode, exerciseCodeLanguage } from '../utils/exercise-code.mjs'
export interface TagReference { tags: string[]; title: string; url: string; example?: string; traits: string[]; native?: string; introduction?: { runs: { text: string; bold?: boolean; mono?: boolean }[] }[]; result?: ExampleResult; samples?: { example: string; description: string; result: ExampleResult }[] }
defineProps<{ items: TagReference[]; arrangement?: 'stacked-pair' | 'rows' | 'example-result' | 'samples' | 'grid'; sharedTraits?: string[] }>()
const { set } = useSlideSet()
const fragments = (text: string) => text.split(/(<\/?[a-z][^<>]*>|`[^`]+`)/gi).filter(Boolean).map(text => ({ text: text.startsWith('`') ? text.slice(1, -1) : text, code: /^<\/?[a-z][^<>]*>$/i.test(text) || text.startsWith('`') }))
</script>

<template>
  <div :class="['exercise-tag-reference', { 'exercise-tag-reference--matched': arrangement === 'rows' || arrangement === 'samples' || (arrangement === 'example-result' && items.some(item => item.result || item.native)), 'exercise-tag-reference--grid': arrangement === 'grid', 'exercise-tag-reference--samples': arrangement === 'samples', 'exercise-tag-reference--example-result': arrangement === 'example-result', 'exercise-tag-reference--rows': arrangement === 'rows', 'exercise-tag-reference--stacked': arrangement === 'stacked-pair', 'exercise-tag-reference--results': items.some(item => item.result) }]" :style="{ '--tag-columns': items.length, '--exercise-result-surface': `var(--cvedi-${set.palette}-surface)` }">
    <section v-for="item in items" :key="item.tags.join(',')" class="exercise-tag-section exercise-copy" :aria-label="item.title">
      <header class="exercise-tag-header">
        <div class="exercise-tag-identity">
          <h2><template v-for="(tag, index) in item.tags" :key="tag"><span v-if="index" class="exercise-tag-range"> … </span><code class="exercise-inline-code">{{ tag }}</code></template></h2>
        </div>
        <p class="exercise-tag-role">{{ item.title }}</p>
        <a class="link exercise-tag-mdn" :href="item.url" :aria-label="`MDN: ${item.title}`" target="_blank" rel="noopener noreferrer">MDN<span class="sr-only"> (si apre in una nuova scheda)</span></a>
      </header>
      <div v-if="item.introduction" class="exercise-tag-introduction"><p v-for="(paragraph, index) in item.introduction" :key="index"><template v-for="(run, r) in paragraph.runs" :key="r"><component v-for="(fragment, f) in fragments(run.text)" :is="fragment.code ? 'code' : 'span'" :key="f" :class="{ 'font-semibold': run.bold, 'exercise-inline-code': fragment.code }">{{ fragment.text }}</component></template></p></div>
      <div v-if="item.samples" class="exercise-tag-samples">
        <template v-for="sample in item.samples" :key="sample.example">
          <div class="mockup-code exercise-code"><pre><code :data-language="exerciseCodeLanguage(sample.example)" v-html="highlightExerciseCode(sample.example)" /></pre></div>
          <div class="exercise-tag-output"><ExerciseResultContent :result="sample.result" /><span class="exercise-tag-description">{{ sample.description }}</span></div>
        </template>
      </div>
      <template v-else>
        <div class="mockup-code exercise-code"><pre><code :data-language="exerciseCodeLanguage(item.example)" v-html="highlightExerciseCode(item.example!)" /></pre></div>
        <div v-if="item.result" class="exercise-tag-output"><span class="exercise-tag-output-label">Risultato</span><ExerciseResultContent :result="item.result" /></div>
        <div v-if="item.native" class="exercise-tag-preview"><ExerciseNative :example="item.native" :caption="''" /></div>
      </template>
      <ul v-if="item.traits.length" class="exercise-list exercise-tag-traits">
        <li v-for="trait in item.traits" :key="trait"><template v-for="(fragment, index) in fragments(trait)" :key="index"><component :is="fragment.code ? 'code' : 'span'" :class="{ 'exercise-inline-code': fragment.code }">{{ fragment.text }}</component></template></li>
      </ul>
    </section>
    <div v-if="sharedTraits?.length" class="exercise-copy exercise-tag-shared"><ul class="exercise-list"><li v-for="trait in sharedTraits" :key="trait">{{ trait }}</li></ul></div>
  </div>
</template>
