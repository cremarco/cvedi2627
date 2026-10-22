<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { publicAsset } from '../utils/public-asset'
import HeroIcon from './HeroIcon.vue'

const props = defineProps<{ src: string }>()
const { isActive, isVisible, isPrinting } = useSlidePlayback()
const { $renderContext } = useSlideContext()
const available = computed(() => isActive.value && !isPrinting.value
  && ['slide', 'presenter'].includes($renderContext.value))
const canPlay = computed(() => available.value && isVisible.value)
const source = computed(() => publicAsset(props.src))
const audio = ref<HTMLAudioElement>()
const playing = ref(false)
const starting = ref(false)
const error = ref('')
const id = useId()
let request = 0
let wantsPlayback = false

function pause() {
  request++
  wantsPlayback = false
  starting.value = false
  audio.value?.pause()
  playing.value = false
}

async function play(fromBeginning = false) {
  const player = audio.value
  if (!player || !canPlay.value) return
  const currentRequest = ++request
  wantsPlayback = true
  starting.value = true
  if (error.value) player.load()
  error.value = ''
  if (fromBeginning || player.ended) player.currentTime = 0
  try {
    await player.play()
    // A previous play promise must not pause a newer request to restart.
    if (!canPlay.value || !wantsPlayback) player.pause()
  } catch (cause) {
    if (canPlay.value && currentRequest === request && (cause as Error).name !== 'AbortError')
      error.value = 'Audio non disponibile. Premi Riproduci per riprovare.'
  } finally {
    if (currentRequest === request) starting.value = false
  }
}

function failed() {
  pause()
  error.value = 'Audio non disponibile. Premi Riproduci per riprovare.'
}

// Slidev also mounts previews: only the current presentation may own a player.
// Pause before removing it, and never resume automatically on tab/slide return.
watch(canPlay, value => { if (!value) pause() }, { flush: 'sync' })
watch(source, () => { pause(); error.value = '' })
onBeforeUnmount(pause)
</script>

<template>
  <section v-if="available" class="lesson-audio" aria-label="Audio della slide" @click.stop @keydown.stop>
    <audio :id="id" ref="audio" :src="source" preload="none"
      @playing="playing = true" @pause="playing = false" @ended="playing = false" @error="failed" />
    <span v-if="error" class="lesson-audio-error" role="status">{{ error }}</span>
    <div class="join join-vertical" role="group" aria-label="Controlli audio">
      <button type="button" class="btn btn-sm btn-square join-item" aria-label="Riproduci audio" title="Riproduci audio" :aria-controls="id" :disabled="playing || starting" @click="play()">
        <HeroIcon name="play" />
      </button>
      <button type="button" class="btn btn-sm btn-square join-item" aria-label="Metti in pausa l’audio" title="Metti in pausa l’audio" :aria-controls="id" :disabled="!playing && !starting" @click="pause">
        <HeroIcon name="pause" />
      </button>
      <button type="button" class="btn btn-sm btn-square join-item" aria-label="Riproduci dall’inizio" title="Riproduci dall’inizio" :aria-controls="id" :disabled="starting" @click="play(true)">
        <HeroIcon name="arrow-path" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.lesson-audio {
  position: absolute;
  z-index: 40;
  top: 50%;
  right: 24px;
  width: max-content;
  max-width: calc(100% - 144px);
  margin: 0;
  transform: translateY(-50%);
  color: var(--section-primary-deep);
}
.lesson-audio .btn {
  width: 32px;
  min-width: 32px;
  min-height: 32px;
  height: 32px;
  padding: 0;
  border-color: var(--cvedi-rule);
  background: var(--cvedi-paper);
  color: var(--section-primary-deep);
  box-shadow: none;
  font: 600 18px/1.2 var(--cvedi-font-display);
}
.lesson-audio .btn:not(:disabled):is(:hover, :active) {
  background: var(--section-primary-deep);
  color: var(--cvedi-paper);
  border-color: var(--section-primary-deep);
}
.lesson-audio .btn:disabled { opacity: .45; }
.lesson-audio .btn:focus-visible { outline: 3px solid var(--section-accent); outline-offset: 3px; }
.lesson-audio svg { width: 18px; height: 18px; }
.lesson-audio-error {
  position: absolute;
  right: 0;
  bottom: calc(100% + 12px);
  width: 280px;
  display: block;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--cvedi-paper);
  color: var(--section-primary-deep);
  font: 400 18px/1.4 var(--cvedi-font-display);
}
@media print { .lesson-audio { display: none; } }
</style>
