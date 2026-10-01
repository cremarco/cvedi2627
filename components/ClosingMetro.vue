<script setup lang="ts">
import { useId } from 'vue'
import geometry from '../assets/metro-map/geometric-animation.json'

const maskId = `closing-map-${useId()}`
const backgrounds = geometry.lanes.filter(lane => lane.family === 'blue')
const routes = geometry.lanes.filter(lane => lane.family !== 'blue')
</script>

<template>
  <svg class="closing-metro-map" viewBox="0 0 1741 903" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <mask v-for="route in routes" :id="`${maskId}-${route.id}`" :key="route.id" maskUnits="userSpaceOnUse" x="0" y="0" width="1741" height="903" style="mask-type: luminance">
        <path class="closing-metro-reveal" :d="route.d" :stroke-width="route.width + 2"
          :style="{ '--route-duration': route.duration, '--route-delay': route.delay }"
          pathLength="1" fill="none" stroke="white" stroke-linecap="round" />
      </mask>
    </defs>
    <rect width="1741" height="903" fill="white" />
    <g class="closing-metro-details">
      <path v-for="field in backgrounds" :key="field.id" :d="field.fillD" :fill="field.color" />
      <rect x="340" y="215" width="405" height="370" rx="22" fill="#F5F3D7" />
    </g>
    <path v-for="route in routes" :key="route.id" :d="route.fillD" :fill="route.color" :mask="`url(#${maskId}-${route.id})`" />
    <g fill="#F0B100">
      <circle v-for="dot in geometry.dots" :key="dot.id" class="closing-metro-dot" :cx="dot.cx" :cy="dot.cy" r="3.5" :style="{ '--dot-delay': dot.delay }" />
    </g>
  </svg>
</template>
