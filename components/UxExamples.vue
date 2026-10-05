<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'
import examples from '../data/ux-examples.json'
import LessonFigure from './LessonFigure.vue'

const selected = ref(0)
const current = computed(() => examples[selected.value])
const isActive = useIsSlideActive()
watch(isActive, active => { if (active) selected.value = 0 })
</script>

<template>
  <section class="ux-examples" aria-label="Esempi di UX negli oggetti e negli spazi">
    <div class="lesson-columns">
      <div class="ux-example-copy" aria-live="polite" aria-atomic="true">
        <h2>{{ current.title }}</h2>
        <p class="lead">{{ current.description }}</p>
        <p>{{ current.question }}</p>
        <a v-if="current.sourceUrl" :href="current.sourceUrl" target="_blank" rel="noopener noreferrer" class="ux-example-source">Fonte: {{ current.sourceLabel }}</a>
      </div>
      <LessonFigure :src="current.src" :alt="current.alt" :caption="current.caption" />
    </div>
    <nav class="ux-example-controls" aria-label="Carrellata degli esempi" @keydown.stop>
      <button type="button" class="btn btn-ghost" :disabled="selected === 0" @click.stop="selected--">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
        Precedente
      </button>
      <select v-model.number="selected" class="select" aria-label="Scegli un esempio">
        <option v-for="(example, index) in examples" :key="example.src" :value="index">{{ index + 1 }} / {{ examples.length }} · {{ example.title }}</option>
      </select>
      <button type="button" class="btn btn-ghost" :disabled="selected === examples.length - 1" @click.stop="selected++">
        Successivo
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
      </button>
    </nav>
  </section>
</template>
