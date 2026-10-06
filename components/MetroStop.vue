<script setup lang="ts">
withDefaults(defineProps<{
  x: number
  y: number
  radius?: number
  arrivalDelay?: number
}>(), { radius: 26, arrivalDelay: 620 })
</script>

<template>
  <g class="metro-cover-stop" :transform="`translate(${x} ${y})`"
    :style="{ '--stop-arrival-delay': `${arrivalDelay}ms` }">
    <circle class="metro-stop-arrival" :r="radius + 2" />
    <circle class="metro-stop-disc" :r="radius" />
    <circle class="metro-stop-core" r="7" />
  </g>
</template>
