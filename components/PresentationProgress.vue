<script setup lang="ts">
import { computed } from 'vue'
import { slideSet, slideSetStyle } from '../utils/slide-sets'

const props = withDefaults(defineProps<{
  lesson: string
  page: number
  total: number
  instant?: boolean
}>(), { instant: false })

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
  position: absolute;
  z-index: 30;
  inset: auto 72px 14px;
  height: 3px;
  border-radius: 999px;
  background: color-mix(in oklch, var(--section-primary) 12%, white);
  overflow: hidden;
  pointer-events: none;
}
.presentation-progress-fill {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--section-primary);
  transform-origin: left center;
  transition: transform var(--cvedi-motion-data, 520ms) var(--cvedi-ease-out, cubic-bezier(.16, 1, .3, 1));
}
.presentation-progress-rail[data-instant="true"] .presentation-progress-fill { transition: none; }
@media (prefers-reduced-motion: reduce), print {
  .presentation-progress-fill { transition: none; }
}
</style>
