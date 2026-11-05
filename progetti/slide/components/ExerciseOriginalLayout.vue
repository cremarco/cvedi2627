<script setup lang="ts">
import ExerciseNative from './ExerciseNative.vue'
import { highlightExerciseCode } from '../utils/exercise-code.mjs'
export interface OriginalLayout { label?: string; url?: string; paragraphs: { text: string; bullet?: boolean; runs: { text: string; mono?: boolean; bold?: boolean; href?: string }[] }[]; code?: string; example?: string }
defineProps<{ content: OriginalLayout }>()
</script>

<template>
  <div class="exercise-original-layout" :class="{ 'exercise-original-layout--stacked': !content.example }">
    <section class="exercise-copy exercise-original-copy">
      <h2 v-if="content.label"><component :is="['FLOATING', 'POSITION'].includes(content.label) ? 'span' : 'code'" :class="{ 'exercise-inline-code': !['FLOATING', 'POSITION'].includes(content.label) }">{{ content.label }}</component><a v-if="content.url" class="link exercise-original-mdn" :href="content.url" target="_blank" rel="noopener noreferrer">MDN</a></h2>
      <template v-for="(paragraph, index) in content.paragraphs" :key="index">
        <component :is="paragraph.bullet ? 'ul' : 'div'" :class="{ 'exercise-list': paragraph.bullet }"><component :is="paragraph.bullet ? 'li' : 'p'"><component v-for="(run, r) in paragraph.runs" :is="run.href ? 'a' : run.mono ? 'code' : 'span'" :key="r" :class="{ 'exercise-inline-code': run.mono, 'font-semibold': run.bold, link: run.href }" :href="run.href" :target="run.href ? '_blank' : undefined" :rel="run.href ? 'noopener noreferrer' : undefined">{{ run.text }}</component></component></component>
      </template>
      <div v-if="content.example && content.code" class="mockup-code exercise-code"><pre><code data-language="css" v-html="highlightExerciseCode(content.code)" /></pre></div>
    </section>
    <ExerciseNative v-if="content.example" :example="content.example" caption="" />
    <div v-else-if="content.code" class="mockup-code exercise-code"><pre><code data-language="css" v-html="highlightExerciseCode(content.code)" /></pre></div>
  </div>
</template>
