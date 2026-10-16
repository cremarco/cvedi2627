<script setup lang="ts">
import HeroIcon from './HeroIcon.vue'
const deck = import.meta.env.VITE_CVEDI_DECK
const menu = `${import.meta.env.VITE_CVEDI_MENU_BASE || '/'}#/3`
</script>

<template>
  <a v-if="deck && deck !== 'apertura'" :href="menu" class="btn btn-ghost btn-square lesson-deck-menu" aria-label="Indice delle lezioni" title="Indice delle lezioni">
    <HeroIcon name="book-open" />
  </a>
</template>

<style scoped>
.lesson-deck-menu { position: fixed; top: 4px; left: 4px; z-index: 100; width: 44px; height: 44px; min-height: 44px; color: var(--color-base-content); background: var(--color-base-100); }
.lesson-deck-menu svg { width: 22px; height: 22px; }
@media print { .lesson-deck-menu { display: none; } }
</style>
