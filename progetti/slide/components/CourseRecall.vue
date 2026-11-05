<script setup lang="ts">
import { computed } from 'vue'
import CvediNotice from './CvediNotice.vue'
import { deckDirectory } from '../utils/lesson-decks.mjs'

const props = defineProps<{ lesson: string; target: string; label: string; application: string }>()
const href = computed(() => `${import.meta.env.VITE_CVEDI_MENU_BASE || '/'}${deckDirectory(props.lesson)}#/${props.target}`)
</script>

<template>
  <CvediNotice kind="explore" title="Argomenti già affrontati" class="ux-step-recall">
    <p><a class="link" :href="href" target="_blank" rel="noopener noreferrer" :aria-label="`Riprendi ${label} (nuova scheda)`">{{ label }}</a>: {{ application }}</p>
  </CvediNotice>
</template>
