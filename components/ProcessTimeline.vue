<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import MetroTrack from './MetroTrack.vue'

type TimelineStep = string | { title: string; detail?: string }
const props = withDefaults(defineProps<{
  steps: TimelineStep[]
  label?: string
}>(), {
  label: 'Fasi del progetto',
})

const root = ref<HTMLElement>()
const entries = computed(() => props.steps.map(step => typeof step === 'string' ? { title: step } : step))
const stations = computed(() => entries.value.map((_, index) => 4 + (index + .5) * 1136 / entries.value.length))
const arrivals = ref<number[]>([])
const route = computed(() => {
  const first = stations.value[0], last = stations.value.at(-1)!
  const gapIndex = Math.floor((stations.value.length - 2) / 2)
  const gapStart = stations.value[gapIndex], gap = stations.value[gapIndex + 1] - gapStart
  // Retain the original four-stop route; scale its middle bend inside a gap.
  const bend = (x: number) => gapStart + (x - 430) / 284 * gap
  return `M -92 24 H${first - 82} Q${first - 72} 24 ${first - 64} 32 L${first - 28} 68 Q${first - 20} 76 ${first - 8} 76 H${bend(490)} Q${bend(500)} 76 ${bend(508)} 68 L${bend(534)} 42 Q${bend(542)} 34 ${bend(552)} 34 H${bend(592)} Q${bend(602)} 34 ${bend(610)} 42 L${bend(636)} 68 Q${bend(644)} 76 ${bend(654)} 76 H${last + 20} Q${last + 30} 76 ${last + 38} 68 L${last + 84} 26 Q${last + 92} 18 ${last + 102} 18 H1236`
})

function measureArrivals() {
  if (!root.value) return
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', route.value)
  const length = path.getTotalLength()
  const duration = parseFloat(getComputedStyle(root.value).getPropertyValue('--cvedi-motion-metro'))
  arrivals.value = stations.value.map(x => {
    let low = 0, high = length
    for (let iteration = 0; iteration < 24; iteration++) {
      const mid = (low + high) / 2
      if (path.getPointAtLength(mid).x < x) low = mid
      else high = mid
    }
    // The segment head is dash length minus dash offset, not just the offset.
    return duration * ((low + high) / (2 * length) + .1 - .085) / (.1 + 1.1)
  })
}
onMounted(measureArrivals)
watch(route, measureArrivals, { flush: 'post' })
</script>

<template>
  <div ref="root" class="cvedi-metro-timeline">
    <MetroTrack :route="route" view-box="-68 0 1280 112" />
    <ul class="timeline timeline-horizontal cvedi-process-timeline" :aria-label="label">
      <li v-for="(step, index) in entries" :key="step.title" :style="{ '--station-arrival-delay': `${arrivals[index] ?? 0}ms` }">
        <hr v-if="index > 0" aria-hidden="true" />
        <div class="timeline-middle">
          <span class="badge badge-accent metro-station">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <div class="timeline-end">
          <span class="timeline-title">{{ step.title }}</span>
          <span v-if="step.detail" class="timeline-detail">{{ step.detail }}</span>
        </div>
        <hr v-if="index < entries.length - 1" aria-hidden="true" />
      </li>
    </ul>
  </div>
</template>
