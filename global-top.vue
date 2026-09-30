<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total, currentSlideRoute, isPrintMode } = useNav()
const displayedPage = ref(currentPage.value)
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let frame = 0

function finishProgress() {
  cancelAnimationFrame(frame)
  displayedPage.value = currentPage.value
}

// Native <progress> values do not interpolate reliably with CSS transitions.
// Animate its value, while assistive technology receives the actual page number.
watch(currentPage, target => {
  cancelAnimationFrame(frame)
  if (reducedMotion.matches || isPrintMode.value) return finishProgress()
  const from = displayedPage.value
  const start = performance.now()
  const duration = Number.parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--cvedi-motion-data')) || 520
  function tick(now: number) {
    const elapsed = Math.min(Math.max((now - start) / duration, 0), 1)
    displayedPage.value = elapsed === 1 ? target : from + (target - from) * (1 - 2 ** (-10 * elapsed))
    if (elapsed < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})
reducedMotion.addEventListener('change', finishProgress)
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  reducedMotion.removeEventListener('change', finishProgress)
})
const gallery = computed(() => String(currentSlideRoute.value.meta.slide.frontmatter.class ?? '').includes('archive-wall-slide'))
const progressWidth = computed(() => `${Math.min(100, Math.max(0, displayedPage.value / (total.value || 1) * 100))}%`)
</script>

<template>
  <div v-show="!gallery" class="presentation-progress-rail">
    <progress
      class="progress sr-only"
      :value="displayedPage"
      :max="total"
      :aria-valuenow="currentPage"
      :aria-valuetext="`Slide ${currentPage} di ${total}`"
      aria-label="Avanzamento della presentazione"
    />
    <span class="presentation-progress-fill" :style="{ width: progressWidth }" aria-hidden="true" />
  </div>
</template>
