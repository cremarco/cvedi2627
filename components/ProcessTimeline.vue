<script setup lang="ts">
import MetroTrack from './MetroTrack.vue'

withDefaults(defineProps<{
  steps: [string, string, string, string]
  label?: string
}>(), {
  label: 'Fasi del progetto',
})

// Four stations on the 1280 px canvas; the paired track echoes the booklet's metro map.
const route = 'M -92 24 H64 Q74 24 82 32 L118 68 Q126 76 138 76 H490 Q500 76 508 68 L534 42 Q542 34 552 34 H592 Q602 34 610 42 L636 68 Q644 76 654 76 H1018 Q1028 76 1036 68 L1082 26 Q1090 18 1100 18 H1236'
</script>

<template>
  <div class="cvedi-metro-timeline">
    <MetroTrack :route="route" view-box="-68 0 1280 112" />
    <ul class="timeline timeline-horizontal cvedi-process-timeline" :aria-label="label">
      <li v-for="(step, index) in steps" :key="step" :style="{ '--station-order': index }">
        <hr v-if="index > 0" aria-hidden="true" />
        <div class="timeline-middle">
          <span class="badge badge-accent metro-station">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <div class="timeline-end">{{ step }}</div>
        <hr v-if="index < steps.length - 1" aria-hidden="true" />
      </li>
    </ul>
  </div>
</template>
