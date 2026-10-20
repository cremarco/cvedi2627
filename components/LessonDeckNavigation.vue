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
    <a v-if="deck && deck !== 'apertura'" :href="menu" class="btn lesson-deck-menu" :style="setStyle" :aria-label="`Torna al menu delle ${exercise ? 'esercitazioni' : 'lezioni'}`" @keydown.enter.stop>
      <HeroIcon name="chevron-left" stroke-width="2" />
      <span>Menu {{ exercise ? 'esercitazioni' : 'lezioni' }}</span>
    </a>
  </Teleport>
</template>

<style scoped>
.lesson-deck-menu.btn {
  position: fixed;
  top: max(4px, env(safe-area-inset-top));
  left: max(8px, env(safe-area-inset-left));
  z-index: 100;
  height: 44px;
  min-height: 44px;
  padding-inline: 10px 14px;
  gap: 6px;
  border: 1px solid var(--cvedi-rule);
  border-radius: 12px;
  color: var(--section-primary-deep);
  background: var(--cvedi-paper);
  box-shadow: none;
  font: 600 16px/1.2 var(--cvedi-font-display);
  text-decoration: none;
}
.lesson-deck-menu svg { width: 20px; height: 20px; }
.lesson-deck-menu.btn:is(:hover, :active) { color: var(--cvedi-paper); background: var(--section-primary-deep); border-color: var(--section-primary-deep); }
.lesson-deck-menu.btn:focus-visible { outline: 3px solid currentColor; outline-offset: -5px; }
@media print { .lesson-deck-menu { display: none; } }
</style>
