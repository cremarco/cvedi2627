<script setup lang="ts">
import HeroIcon from './HeroIcon.vue'
import AcronymText from './AcronymText.vue'
import type { HeroIconName } from '../data/heroicons'

withDefaults(defineProps<{
  kind?: 'question' | 'request' | 'explore' | 'curiosity'
  title?: string
}>(), { kind: 'question' })

const labels = {
  question: 'Domanda',
  request: 'Richiesta',
  explore: 'Approfondimento',
  curiosity: 'Curiosità',
}
const icons = {
  question: 'question-mark-circle',
  request: 'pencil-square',
  explore: 'book-open',
  curiosity: 'light-bulb',
} satisfies Record<keyof typeof labels, HeroIconName>
</script>

<template>
  <aside class="alert alert-soft cvedi-notice" role="note" :aria-label="title || labels[kind]" :data-kind="kind">
    <div class="cvedi-notice-copy">
      <h2 v-if="title"><AcronymText :text="title" /></h2>
      <slot />
    </div>
    <HeroIcon class="cvedi-notice-icon" :name="icons[kind]" />
  </aside>
</template>
