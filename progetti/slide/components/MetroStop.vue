<script setup lang="ts">
withDefaults(defineProps<{
  x: number
  y: number
  rotation?: number
  offset?: number
  length?: number
  arrivalDelay?: number
}>(), { rotation: 0, offset: 11, length: 20, arrivalDelay: 620 })
</script>

<template>
  <g class="metro-cover-stop" :transform="`translate(${x} ${y}) rotate(${rotation})`"
    :style="{ '--stop-arrival-delay': `${arrivalDelay}ms` }">
    <line class="metro-station-tick" x1="0" :y1="offset" x2="0" :y2="offset + length" />
    <line class="metro-stop-arrival" x1="0" :y1="offset" x2="0" :y2="offset + length" />
  </g>
</template>
