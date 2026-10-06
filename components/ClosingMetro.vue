<script setup lang="ts">
import { useId } from 'vue'
import geometry from '../assets/metro-map/geometric-animation.json'

defineProps<{ original?: boolean }>()

const maskId = `closing-map-${useId()}`
const backgrounds = geometry.lanes.filter(lane => lane.family === 'blue')
const routes = geometry.lanes.filter(lane => lane.family !== 'blue')

// Keep the original route choreography, compressed to one 790 ms entrance.
// The SVG geometry and final composition are unchanged.
const entranceTime = (time: string) => `${Math.round(parseFloat(time) * 65)}ms`

const routeTone: Record<string, string> = {
  red: 'primary',
  yellow: 'accent',
  orange: 'light',
  indigo: 'primary',
  pink: 'accent',
  teal: 'light',
  violet: 'primary',
}
</script>

<template>
  <svg class="closing-metro-map" viewBox="0 0 1741 903" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <mask v-for="route in routes" :id="`${maskId}-${route.id}`" :key="route.id" maskUnits="userSpaceOnUse" x="0" y="0" width="1741" height="903" style="mask-type: luminance">
        <path class="closing-metro-reveal" :d="route.d" :stroke-width="route.width + 2"
          :style="{ '--route-duration': entranceTime(route.duration), '--route-delay': entranceTime(route.delay) }"
          pathLength="1" fill="none" stroke="white" stroke-linecap="round" />
      </mask>
    </defs>
    <rect v-if="original" width="1741" height="903" fill="white" />
    <g class="closing-metro-details">
      <path v-for="field in backgrounds" :key="field.id" :class="{ 'closing-metro-field': !original }" :d="field.fillD" :fill="original ? field.color : undefined" />
      <rect v-if="original" x="340" y="215" width="405" height="370" rx="22" fill="#F5F3D7" />
    </g>
    <path v-for="route in routes" :key="route.id" class="closing-metro-route" :class="original ? undefined : `closing-metro-route--${routeTone[route.family]}`" :fill="original ? route.color : undefined" :d="route.fillD" :mask="`url(#${maskId}-${route.id})`" />
    <g :class="{ 'closing-metro-stations': !original }" :fill="original ? '#F0B100' : undefined">
      <circle v-for="dot in geometry.dots" :key="dot.id" class="closing-metro-dot" :cx="dot.cx" :cy="dot.cy" r="3.5" :style="{ '--dot-delay': entranceTime(dot.delay) }" />
    </g>
  </svg>
</template>

<style scoped>
.closing-metro-field {
  fill: color-mix(in srgb, var(--section-primary) 18%, transparent);
}

.closing-metro-route--primary {
  fill: color-mix(in srgb, var(--section-primary) 78%, transparent);
}

.closing-metro-route--accent {
  fill: color-mix(in srgb, var(--section-accent-soft) 74%, transparent);
}

.closing-metro-route--light {
  fill: rgb(255 255 255 / 64%);
}

.closing-metro-stations {
  fill: var(--section-accent);
}
</style>
