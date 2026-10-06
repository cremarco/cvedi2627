<script setup lang="ts">
import { computed } from 'vue'
import MetroTrack from './MetroTrack.vue'
import MetroStop from './MetroStop.vue'
import { coverRoutes, type CoverRouteId } from '../data/cover-routes'

const props = defineProps<{ section: CoverRouteId }>()
const lines = computed(() => coverRoutes[props.section])
const primary = computed(() => lines.value[0])
const stop = computed(() => primary.value.stations[1])
</script>

<template>
  <div class="chapter-metro-route" :data-cover-route="section" aria-hidden="true">
    <MetroTrack v-for="(line, index) in lines" :key="index"
      class="chapter-metro-line" :class="`chapter-metro-line--${line.tone}`"
      :route="line.route" view-box="0 0 1280 720" reveal
      :journey-progress="'stopProgress' in line ? line.stopProgress : undefined"
      :style="{ '--cover-route-duration': `${line.duration}ms`, '--cover-route-delay': `${line.delay}ms`, '--metro-reveal-from': 'reverse' in line && line.reverse ? -1 : 1 }" />
    <svg class="cvedi-metro-route" viewBox="0 0 1280 720" aria-hidden="true" focusable="false">
      <g v-for="(line, index) in lines" :key="index">
        <template v-for="(station, stationIndex) in line.stations" :key="stationIndex">
          <g v-if="line.tone !== 'track' || stationIndex !== 1" class="metro-cover-station"
            :style="{ '--station-delay': `${station.delay}ms` }">
            <circle class="metro-station-disc" :cx="station.x" :cy="station.y" r="7" />
            <circle class="metro-station-core" :cx="station.x" :cy="station.y" r="2" />
          </g>
        </template>
      </g>
      <MetroStop :x="stop.x" :y="stop.y" :arrival-delay="620 + primary.delay" />
    </svg>
  </div>
</template>
