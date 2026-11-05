<script setup lang="ts">
import { highlightExerciseCode } from '../utils/exercise-code.mjs'

defineProps<{ reveal?: boolean }>()
const examples = [
  { source: 'ul#primary-nav li.active { ... }', terms: '1 + 100 + 1 + 10', total: 112 },
  { source: 'ul.active > p.fake-class { ... }', terms: '1 + 10 + 1 + 10', total: 22 },
]
</script>

<template>
  <div class="exercise-specificity">
    <div v-for="example in examples" :key="example.source" class="exercise-specificity-row">
      <div class="mockup-code exercise-code"><pre><code data-language="css" v-html="highlightExerciseCode(example.source)" /></pre></div>
      <span v-if="reveal" class="exercise-specificity-arrow" aria-hidden="true">⟶</span>
      <p v-if="reveal" class="exercise-specificity-total">{{ example.terms }} = <strong>{{ example.total }}</strong></p>
    </div>
    <p v-if="reveal" class="exercise-specificity-note">Questi pesi sono una scorciatoia didattica: il browser confronta le colonne ID, classi e tipi, non la loro somma.</p>
  </div>
</template>
