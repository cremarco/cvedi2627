<script setup lang="ts">
import { ref } from 'vue'
import HeroIcon from './HeroIcon.vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import architecture from '../data/ux-service-architecture.json'

defineProps<{ caption?: string }>()
const { canAnimate, isPrinting } = useSlidePlayback()
const replay = ref(0)
// Branch endpoints match the centers of the three columns on the shared grid.
const branches = ['M568 24 H173.33 V56', 'M568 24 V56', 'M568 24 H962.67 V56']
</script>

<template>
  <figure class="ux-service-architecture" :aria-label="architecture.title">
    <div :key="replay" class="architecture-diagram" :class="{ 'is-playing': canAnimate }">
      <div class="card architecture-root">
        <div class="card-body">
          <h2 class="card-title">{{ architecture.root.title }}</h2>
          <p>{{ architecture.root.description }}</p>
        </div>
      </div>
      <svg class="architecture-connectors" viewBox="0 0 1136 56" aria-hidden="true" focusable="false">
        <path class="architecture-connector" d="M568 0 V24" pathLength="1" style="--reveal-delay: 280ms" />
        <path v-for="(branch, index) in branches" :key="branch" class="architecture-connector" :d="branch" pathLength="1" :style="{ '--reveal-delay': `${540 + index * 360}ms` }" />
      </svg>
      <ul class="architecture-sections" :aria-label="`Sezioni di ${architecture.root.title}`">
        <li v-for="(section, index) in architecture.sections" :key="section.id" class="architecture-group" :style="{ '--reveal-delay': `${820 + index * 360}ms` }">
          <h3>{{ section.title }}</h3>
          <ul class="architecture-items">
            <li v-for="(item, itemIndex) in section.items" :key="item" class="architecture-item" :style="{ '--reveal-delay': `${1090 + index * 360 + itemIndex * 90}ms` }">{{ item }}</li>
          </ul>
        </li>
      </ul>
    </div>
    <figcaption class="architecture-caption-row">
      <p v-if="caption" class="lesson-caption">{{ caption }}</p>
      <button v-if="canAnimate && !isPrinting" type="button" class="btn btn-ghost btn-sm architecture-replay" aria-label="Rianima l’architettura del servizio" @click.stop="replay++" @keydown.enter.stop @keydown.space.stop>
        <HeroIcon name="arrow-path" /> Rianima
      </button>
    </figcaption>
  </figure>
</template>

<style scoped>
.ux-service-architecture {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  gap: var(--cvedi-space-related);
  min-height: 0;
  width: 100%;
  margin: 0;
  user-select: text;
}
.architecture-diagram { width: 100%; }
.architecture-root.card {
  width: 480px;
  max-width: 100%;
  height: 88px;
  margin: 0 auto;
  border-radius: var(--cvedi-radius);
  background: color-mix(in oklch, var(--section-primary) 9%, var(--color-base-100));
  box-shadow: none;
}
.architecture-root > .card-body { align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; }
.ux-service-architecture .architecture-root h2, .ux-service-architecture .architecture-group h3 {
  margin: 0;
  color: var(--section-primary-deep);
  font: 600 var(--cvedi-type-card-title)/1.35 var(--theme-font);
}
.ux-service-architecture .architecture-root p { margin: 0; color: var(--theme-body); font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font); }
.architecture-connectors { display: block; width: 100%; height: 56px; overflow: visible; color: var(--section-primary); }
.architecture-connector { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linejoin: round; }
.ux-service-architecture ul { margin: 0; padding: 0; list-style: none; }
.architecture-sections { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--cvedi-space-columns); }
.ux-service-architecture .architecture-group { min-width: 0; margin: 0; padding: 16px; border-top: 1px solid var(--cvedi-rule); }
.ux-service-architecture .architecture-group h3 { margin-bottom: 12px; }
.architecture-items { display: flex; flex-direction: column; gap: 8px; }
.ux-service-architecture .architecture-item { margin: 0; padding: 0; color: var(--theme-body); font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font); }
.architecture-caption-row { display: flex; align-items: center; justify-content: space-between; gap: var(--cvedi-space-related); min-height: 32px; }
.ux-service-architecture .architecture-caption-row > .lesson-caption { flex: 1 1 0; min-width: 0; width: auto; margin: 0; }
.architecture-replay.btn { flex: none; min-height: 32px; height: 32px; padding: 4px 8px; color: var(--section-primary); font: 600 var(--cvedi-type-label)/1.2 var(--theme-font); }
.architecture-replay > svg { width: 18px; height: 18px; }
.architecture-replay:focus-visible { outline: 2px solid var(--section-primary); outline-offset: 3px; }
.is-playing .architecture-root { animation: cvedi-architecture-reveal 280ms var(--cvedi-ease-out) both; }
.is-playing .architecture-group, .is-playing .architecture-item { animation: cvedi-architecture-reveal 260ms var(--cvedi-ease-out) var(--reveal-delay) both; }
.is-playing .architecture-connector { stroke-dasharray: 1; animation: cvedi-architecture-branch 280ms var(--cvedi-ease-out) var(--reveal-delay) both; }
@keyframes cvedi-architecture-reveal {
  from { clip-path: inset(0 0 100% 0); opacity: 0; }
  to { clip-path: inset(0); opacity: 1; }
}
@keyframes cvedi-architecture-branch {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce), print {
  .is-playing :is(.architecture-root, .architecture-group, .architecture-item, .architecture-connector) { animation: none; }
  .architecture-replay { display: none; }
}
@media print { .architecture-root { print-color-adjust: exact; } }
</style>
