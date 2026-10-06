<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { lessonPagination } from './utils/lesson-pagination'

const { currentSlideNo, slides, isPrintMode } = useNav()
const pagination = computed(() => lessonPagination(slides.value, currentSlideNo.value))
const displayedPage = ref(pagination.value.page)
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let frame = 0

function finishProgress() {
  cancelAnimationFrame(frame)
  displayedPage.value = pagination.value.page
}

// Native <progress> values do not interpolate reliably with CSS transitions.
// Animate its value, while assistive technology receives the actual page number.
watch(pagination, (next, previous) => {
  cancelAnimationFrame(frame)
  if (next.lesson !== previous.lesson || reducedMotion.matches || isPrintMode.value) return finishProgress()
  const target = next.page
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
watch(isPrintMode, finishProgress)
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  reducedMotion.removeEventListener('change', finishProgress)
})
const progressWidth = computed(() => `${Math.min(100, Math.max(0, displayedPage.value / (pagination.value.total || 1) * 100))}%`)
</script>

<template>
  <div class="presentation-progress-rail">
    <progress
      class="progress sr-only"
      :value="displayedPage"
      :max="pagination.total"
      :aria-valuenow="pagination.page"
      :aria-valuetext="`Slide ${pagination.page} di ${pagination.total}`"
      aria-label="Avanzamento della lezione"
    />
    <span class="presentation-progress-fill" :style="{ width: progressWidth }" aria-hidden="true" />
  </div>
</template>
