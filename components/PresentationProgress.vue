<script setup lang="ts">
import { computed } from 'vue'
import { slideSet, slideSetStyle } from '../utils/slide-sets'

const props = withDefaults(defineProps<{
  lesson: string
  page: number
  total: number
  instant?: boolean
  onDark?: boolean
}>(), { instant: false, onDark: false })

const state = computed(() => {
  const total = Number.isFinite(props.total) ? Math.max(0, Math.floor(props.total)) : 0
  const page = Number.isFinite(props.page) ? Math.min(total, Math.max(0, Math.floor(props.page))) : 0
  return { total, page, fraction: total ? page / total : 0 }
})
const set = computed(() => slideSet(props.lesson))
const setStyle = computed(() => slideSetStyle(set.value))
const label = computed(() => `Slide ${state.value.page} di ${state.value.total}`)
</script>

<template>
  <div
    v-if="state.total > 0 && state.page > 0"
    class="presentation-progress-rail"
    :data-lesson="set.id"
    :data-instant="instant"
    :data-on-dark="onDark"
    :style="setStyle"
  >
    <progress
      class="progress sr-only"
      :value="state.page"
      :max="state.total"
      :aria-valuenow="state.page"
      :aria-valuetext="label"
      aria-label="Avanzamento della lezione"
    />
    <!-- A new set starts at its own fraction, without animating from the previous set. -->
    <span
      :key="lesson"
      class="presentation-progress-fill"
      :style="{ transform: `scaleX(${state.fraction})` }"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.presentation-progress-rail {
  --progress-fill: var(--section-accent);
  --progress-track: color-mix(in oklch, var(--section-accent) 10%, white);
  position: absolute;
  z-index: 30;
  inset: auto 72px 14px;
  height: 3px;
  border-radius: 999px;
  background: var(--progress-track);
  overflow: hidden;
  pointer-events: none;
}
.presentation-progress-rail[data-on-dark="true"] {
  --progress-fill: var(--section-accent-soft);
  --progress-track: color-mix(in oklch, var(--section-primary) 88%, var(--section-accent-soft));
}
.presentation-progress-fill {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--progress-fill);
  transform-origin: left center;
  transition: transform var(--cvedi-motion-data, 520ms) var(--cvedi-ease-out, cubic-bezier(.16, 1, .3, 1));
}
.presentation-progress-rail[data-instant="true"] .presentation-progress-fill { transition: none; }
@media (prefers-reduced-motion: reduce), print {
  .presentation-progress-fill { transition: none; }
}
</style>
