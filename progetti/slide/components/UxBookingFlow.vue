<script setup lang="ts">
import { ref, useId } from 'vue'
import HeroIcon from './HeroIcon.vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import flow from '../data/ux-booking-flow.json'

defineProps<{ caption?: string }>()
const { canAnimate, isPrinting } = useSlidePlayback()
const replay = ref(0)
const markerId = `booking-arrow-${useId().replace(/:/g, '')}`
// Coordinates share the 1136 px content grid. Words and relationships live in data.
const routes = [
  { id: 'search-availability', d: 'M236 88 H300', delay: 0 },
  { id: 'availability-review', d: 'M536 88 H600', delay: 360, labelPosition: [568, 70] },
  { id: 'availability-retry', d: 'M418 160 V236', delay: 360, labelPosition: [440, 204], recovery: true },
  { id: 'retry-search', d: 'M418 396 V420 H118 V160', delay: 720, recovery: true },
  { id: 'review-edit', d: 'M622 160 V236', delay: 1080, labelPosition: [636, 204], anchor: 'start', recovery: true },
  { id: 'edit-review', d: 'M814 236 V160', delay: 1440, labelPosition: [800, 204], anchor: 'end', recovery: true },
  { id: 'review-request', d: 'M836 88 H900', delay: 1800 },
  { id: 'request-confirmed', d: 'M1018 160 V236', delay: 2160, labelPosition: [1040, 204], anchor: 'start' },
].map(route => ({ ...route, ...flow.connections.find(connection => connection.id === route.id) }))
</script>

<template>
  <figure class="ux-booking-flow" :aria-label="flow.title">
    <div class="booking-diagram">
      <svg class="booking-connectors" viewBox="0 0 1136 436" aria-hidden="true" focusable="false">
        <defs>
          <marker :id="markerId" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M1 1 L9 5 L1 9 Z" fill="currentColor" />
          </marker>
        </defs>
        <g v-for="route in routes" :key="route.id" :class="{ 'is-recovery': route.recovery }">
          <path class="booking-route" :d="route.d" :marker-end="`url(#${markerId})`" />
        </g>
        <g :key="replay" :class="{ 'is-playing': canAnimate }">
          <path v-for="route in routes" :key="route.id" class="booking-route-reveal" :d="route.d" pathLength="1" :style="{ '--route-delay': `${route.delay}ms` }" />
        </g>
      </svg>
      <template v-for="route in routes" :key="route.id">
        <span v-if="route.labelPosition" class="booking-label" :class="route.anchor && `is-${route.anchor}`" aria-hidden="true" :style="{ left: `${route.labelPosition[0] / 1136 * 100}%`, top: `${(route.labelPosition[1] - 18) / 436 * 100}%` }">{{ route.label }}</span>
      </template>
      <div v-for="node in flow.nodes" :key="node.id" class="card booking-node" :class="node.tone && `is-${node.tone}`" :style="{ left: `${node.column * 300 / 1136 * 100}%`, top: `${(node.row ? 236 : 16) / 436 * 100}%`, height: `${node.row ? 160 : 144}px` }">
        <div class="card-body">
          <h2 class="card-title">{{ node.title }}</h2>
          <p>{{ node.text }}</p>
        </div>
      </div>
    </div>
    <ol class="sr-only">
      <li v-for="connection in flow.connections" :key="connection.id">{{ connection.description }}</li>
    </ol>
    <figcaption>
      <p class="booking-note">{{ flow.note }}</p>
      <div class="booking-caption-row">
        <p v-if="caption" class="lesson-caption">{{ caption }}</p>
        <button v-if="canAnimate && !isPrinting" class="btn btn-ghost btn-sm booking-replay" type="button" aria-label="Rianima i percorsi di prenotazione" @click.stop="replay++" @keydown.enter.stop @keydown.space.stop>
          <HeroIcon name="arrow-path" /> Rianima
        </button>
      </div>
    </figcaption>
  </figure>
</template>

<style scoped>
.ux-booking-flow {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  width: 100%;
  margin: 0;
  user-select: text;
}
.booking-diagram { position: relative; width: 100%; height: 436px; flex: none; }
.booking-connectors { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; color: var(--section-primary); }
.booking-route { fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; }
.is-recovery .booking-route { stroke-dasharray: 6 5; }
.booking-label { position: absolute; transform: translateX(-50%); color: var(--section-primary-deep); font: 600 var(--cvedi-type-note)/1.3 var(--theme-font); }
.booking-label.is-start { transform: none; }
.booking-label.is-end { transform: translateX(-100%); }
.booking-node { position: absolute; width: calc(236 / 1136 * 100%); border-radius: var(--cvedi-radius); background: color-mix(in oklch, var(--section-primary) 8%, var(--color-base-100)); box-shadow: none; }
.booking-node > .card-body { display: flex; flex-direction: column; gap: 8px; padding: 18px; }
.booking-node .card-title { margin: 0; color: var(--section-primary-deep); font: 600 var(--cvedi-type-card-title)/1.2 var(--theme-font); }
.booking-node .card-body > p { margin: 0; color: var(--theme-body); font: 400 var(--cvedi-type-card-body)/1.35 var(--theme-font); }
.booking-node.is-decision { background: var(--section-accent-soft); outline: 2px solid var(--section-accent); outline-offset: -2px; }
.booking-node.is-confirmed { background: var(--section-accent-on-dark); }
.booking-node.is-recovery { background: color-mix(in oklch, var(--section-primary) 4%, var(--color-base-100)); outline: 1px dashed var(--section-primary); outline-offset: -1px; }
.ux-booking-flow > figcaption { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
.booking-note { margin: 0; color: var(--theme-body); font: 400 var(--cvedi-type-note)/1.4 var(--theme-font); }
.booking-caption-row { display: flex; align-items: center; justify-content: space-between; gap: var(--cvedi-space-related); min-height: 32px; }
.ux-booking-flow .booking-caption-row > .lesson-caption { flex: 1 1 0; min-width: 0; width: auto; margin: 0; }
.booking-replay.btn { flex: none; min-height: 32px; height: 32px; padding: 4px 8px; color: var(--section-primary); font: 600 var(--cvedi-type-label)/1.2 var(--theme-font); }
.booking-replay > svg { width: 18px; height: 18px; }
.booking-replay:focus-visible { outline: 2px solid var(--section-primary); outline-offset: 3px; }
.booking-route-reveal { fill: none; stroke: var(--section-primary); stroke-width: 5; stroke-linecap: round; opacity: 0; }
.is-playing .booking-route-reveal { stroke-dasharray: 1; animation: cvedi-booking-route 560ms var(--cvedi-ease-out) var(--route-delay) both; }
@keyframes cvedi-booking-route {
  0% { stroke-dashoffset: 1; opacity: 0; }
  10% { opacity: 1; }
  75% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@media (prefers-reduced-motion: reduce), print {
  .is-playing .booking-route-reveal { animation: none; }
  .booking-replay { display: none; }
}
@media print { .booking-node { print-color-adjust: exact; } }
</style>
