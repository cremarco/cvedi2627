<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import manifest from '../assets/booklet-preview/manifest.json'
import { publicAsset } from '../utils/public-asset'

type Page = { src: string; alt: string; coverSide?: 'left' | 'right' }
type Spread = { left: Page; right: Page; label: string }
type Turn = { target: number; direction: 'forward' | 'backward' }

const cover = manifest.cover.src
const spreads: Spread[] = [{
  left: { src: cover, alt: 'Retro del booklet', coverSide: 'left' },
  right: { src: cover, alt: 'Copertina di Comunicazione visiva e design delle interfacce', coverSide: 'right' },
  label: 'Copertina',
}]
for (let i = 0; i < manifest.pages.length; i += 2) {
  const left = manifest.pages[i]
  const right = manifest.pages[i + 1]
  spreads.push({
    left: { src: left.src, alt: `Pagina ${left.number}: ${left.title}` },
    right: { src: right.src, alt: `Pagina ${right.number}: ${right.title}` },
    label: `Pagine ${left.number}–${right.number}`,
  })
}

const index = ref(0)
const turn = ref<Turn | null>(null)
const autoplay = ref(true)
const { isActive, canAnimate, prefersReducedMotion } = useSlidePlayback()
let autoTimer: ReturnType<typeof setTimeout> | undefined
let autoDirection: Turn['direction'] = 'forward'
const spread = computed(() => spreads[index.value])
const underPages = computed(() => {
  const destination = turn.value ? spreads[turn.value.target] : spread.value
  return turn.value?.direction === 'forward'
    ? [spread.value.left, destination.right]
    : turn.value?.direction === 'backward'
      ? [destination.left, spread.value.right]
      : [spread.value.left, spread.value.right]
})
const turningPages = computed(() => {
  if (!turn.value) return []
  const destination = spreads[turn.value.target]
  return turn.value.direction === 'forward'
    ? [spread.value.right, destination.left]
    : [spread.value.left, destination.right]
})

function cancelAuto() {
  clearTimeout(autoTimer)
  autoTimer = undefined
}
function scheduleNext(delay = 1600) {
  cancelAuto()
  if (prefersReducedMotion.value) {
    autoplay.value = false
    return
  }
  if (!canAnimate.value || !autoplay.value || turn.value) return
  autoTimer = setTimeout(() => {
    if (!canAnimate.value || !autoplay.value) return
    if (index.value === spreads.length - 1) autoDirection = 'backward'
    if (index.value === 0) autoDirection = 'forward'
    flip(autoDirection, false)
  }, delay)
}
function flip(direction: 'forward' | 'backward', manual = true) {
  if (turn.value) return
  const target = index.value + (direction === 'forward' ? 1 : -1)
  if (target < 0 || target >= spreads.length) return
  if (manual) {
    autoplay.value = false
    cancelAuto()
  }
  if (prefersReducedMotion.value) {
    index.value = target
    return
  }
  turn.value = { target, direction }
}
function completeTurn() {
  if (!turn.value) return
  index.value = turn.value.target
  turn.value = null
}
function finishTurn(event: AnimationEvent) {
  if (event.target !== event.currentTarget || !turn.value) return
  completeTurn()
  scheduleNext()
}
function toggleAutoplay() {
  autoplay.value = !autoplay.value
  if (autoplay.value) scheduleNext(600)
  else cancelAuto()
}
watch(isActive, (active, _previous, onCleanup) => {
  onCleanup(cancelAuto)
  cancelAuto()
  turn.value = null
  index.value = 0
  autoDirection = 'forward'
  autoplay.value = true
  if (active) scheduleNext(900)
}, { immediate: true })
watch(canAnimate, canPlay => {
  if (canPlay) scheduleNext(900)
  else {
    cancelAuto()
    // Print and hidden views must not depend on a pending animationend event.
    completeTurn()
  }
})
watch(prefersReducedMotion, reduced => {
  if (!reduced) return
  autoplay.value = false
  cancelAuto()
  // Reduced-motion CSS removes the animation, so finish any pending turn here.
  completeTurn()
})
</script>

<template>
  <div class="booklet-preview" @keydown.left.stop.prevent="flip('backward')" @keydown.right.stop.prevent="flip('forward')" @pointerdown.stop @pointerup.stop @touchstart.stop @touchend.stop>
    <div class="booklet-stage" role="group" aria-label="Anteprima sfogliabile del booklet" :aria-busy="!!turn">
      <div v-for="(page, side) in underPages" :key="side" class="booklet-page" :class="[side ? 'booklet-page-right' : 'booklet-page-left', page.coverSide ? `booklet-cover-${page.coverSide}` : '']">
        <img :src="publicAsset(page.src)" :alt="page.alt" width="959" height="1282" draggable="false" />
      </div>
      <div v-if="turn" class="booklet-turning-leaf" :class="`booklet-turn-${turn.direction}`" aria-hidden="true" @animationend="finishTurn">
        <div v-for="(page, face) in turningPages" :key="face" class="booklet-page-face" :class="[face ? 'booklet-page-back' : 'booklet-page-front', page.coverSide ? `booklet-cover-${page.coverSide}` : '']">
          <img :src="publicAsset(page.src)" alt="" width="959" height="1282" draggable="false" />
        </div>
      </div>
      <button class="btn btn-ghost booklet-page-button booklet-hit-left" type="button" aria-label="Sfoglia la pagina a sinistra" :disabled="index === 0 || !!turn" @click.stop="flip('backward')" />
      <button class="btn btn-ghost booklet-page-button booklet-hit-right" type="button" aria-label="Sfoglia la pagina a destra" :disabled="index === spreads.length - 1 || !!turn" @click.stop="flip('forward')" />
    </div>
    <nav class="booklet-controls" aria-label="Sfoglia il booklet" @click.stop>
      <button class="btn btn-sm btn-ghost" type="button" :aria-disabled="index === 0 || !!turn" @click="flip('backward')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
        Indietro
      </button>
      <div class="booklet-playback">
        <span class="booklet-page-label" role="status" :aria-live="autoplay ? 'off' : 'polite'" aria-atomic="true">{{ spread.label }}<span class="booklet-position">{{ index + 1 }} / {{ spreads.length }}</span></span>
        <button class="btn btn-sm btn-ghost" type="button" :aria-label="autoplay ? 'Metti in pausa lo sfogliamento automatico' : 'Avvia lo sfogliamento automatico'" @click="toggleAutoplay">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path v-if="autoplay" d="M8 5v14M16 5v14" /><path v-else d="m8 5 11 7-11 7Z" /></svg>
          {{ autoplay ? 'Pausa' : 'Auto' }}
        </button>
      </div>
      <button class="btn btn-sm btn-ghost" type="button" :aria-disabled="index === spreads.length - 1 || !!turn" @click="flip('forward')">
        {{ index === 0 ? 'Sfoglia' : 'Avanti' }}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
      </button>
    </nav>
    <div hidden aria-hidden="true"><img v-for="page in manifest.pages" :key="page.number" :src="publicAsset(page.src)" alt="" /></div>
  </div>
</template>
