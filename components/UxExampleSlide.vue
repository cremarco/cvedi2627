<script setup lang="ts">
import { computed } from 'vue'
import examples from '../data/ux-examples.json'
import LessonFigure from './LessonFigure.vue'

const props = defineProps<{ exampleId: string }>()
const example = computed(() => {
  const match = examples.find(item => item.id === props.exampleId)
  if (!match) throw new Error(`Unknown UX example: ${props.exampleId}`)
  return match
})
</script>

<template>
  <section class="ux-example" aria-label="Esempio di UX negli oggetti e negli spazi">
    <div class="lesson-columns">
      <div class="ux-example-copy">
        <p class="lead">{{ example.description }}</p>
        <p>{{ example.question }}</p>
        <a v-if="example.sourceUrl" :href="example.sourceUrl" target="_blank" rel="noopener noreferrer" class="link ux-example-source">Fonte: {{ example.sourceLabel }}</a>
      </div>
      <LessonFigure :src="example.src" :alt="example.alt" :caption="example.caption" />
    </div>
  </section>
</template>
