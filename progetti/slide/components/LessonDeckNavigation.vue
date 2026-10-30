<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import HeroIcon from './HeroIcon.vue'
import { slideSet, slideSetStyle } from '../utils/slide-sets'
const deck = import.meta.env.VITE_CVEDI_DECK
const exercise = deck?.startsWith('esercitazione-')
const menu = `${import.meta.env.VITE_CVEDI_MENU_BASE || '/'}#/${exercise ? 'indice-esercitazioni' : '3'}`
const { currentFrontmatter } = useNav()
const setStyle = computed(() => slideSetStyle(slideSet(currentFrontmatter.value.lesson)))
</script>

<template>
  <Teleport to="body">
    <a v-if="deck && deck !== 'apertura'" :href="menu" class="btn btn-xs lesson-deck-menu" :style="setStyle" :aria-label="`Torna al menu delle ${exercise ? 'esercitazioni' : 'lezioni'}`" @keydown.enter.stop>
      <HeroIcon name="chevron-left" stroke-width="2" />
      <span>Menu {{ exercise ? 'esercitazioni' : 'lezioni' }}</span>
    </a>
  </Teleport>
</template>

<style scoped>
.lesson-deck-menu.btn {
  position: fixed;
  top: max(4px, env(safe-area-inset-top));
  left: env(safe-area-inset-left, 0px);
  z-index: 100;
  height: 24px;
  min-height: 24px;
  padding-inline: 4px 8px;
  gap: 2px;
  border: 1px solid var(--cvedi-rule);
  border-radius: 0 6px 6px 0;
  color: var(--section-primary-deep);
  background: var(--cvedi-paper);
  box-shadow: none;
  font: 600 12px/1.2 var(--cvedi-font-display);
  text-decoration: none;
}
.lesson-deck-menu svg { width: 14px; height: 14px; }
.lesson-deck-menu.btn:is(:hover, :active) { color: var(--cvedi-paper); background: var(--section-primary-deep); border-color: var(--section-primary-deep); }
.lesson-deck-menu.btn:focus-visible { outline: 2px solid currentColor; outline-offset: -2px; }
@media print { .lesson-deck-menu { display: none; } }
</style>
