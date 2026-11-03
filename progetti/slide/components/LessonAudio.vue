<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { useCaptionPreference } from '../composables/useCaptionPreference'
import { useSpokenCaption } from '../composables/useSpokenCaption'
import { publicAsset } from '../utils/public-asset'
import HeroIcon from './HeroIcon.vue'

const props = defineProps<{ src: string; captions?: string }>()
const { captionsEnabled, toggleCaptions } = useCaptionPreference()
const { isActive, isVisible, isPrinting } = useSlidePlayback()
const { $renderContext } = useSlideContext()
const available = computed(() => isActive.value && !isPrinting.value
  && ['slide', 'presenter'].includes($renderContext.value))
const canPlay = computed(() => available.value && isVisible.value)
const source = computed(() => publicAsset(props.src))
const captionSource = computed(() => props.captions ? publicAsset(props.captions) : undefined)
const audio = ref<HTMLAudioElement>()
const track = ref<HTMLTrackElement>()
const caption = ref('')
const captionCueId = ref('')
const captionError = ref(false)
const hasStarted = ref(false)
const playing = ref(false)
const starting = ref(false)
const error = ref('')
const id = useId()
const captionId = useId()
const highlightEnabled = computed(() => canPlay.value && hasStarted.value && captionsEnabled.value && !captionError.value)
const { captionParts, currentWord, spokenThrough, syncWord } = useSpokenCaption({
  audio, source: captionSource, text: caption, cueId: captionCueId, enabled: highlightEnabled, playing,
})
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
  hasStarted.value = true
  if (error.value) player.load()
  error.value = ''
  if (fromBeginning || player.ended) player.currentTime = 0
  try {
    await player.play()
    // A previous play promise must not pause a newer request to restart.
    if (!canPlay.value || !wantsPlayback) player.pause()
    else updateCaption()
  } catch (cause) {
    if (canPlay.value && currentRequest === request && (cause as Error).name !== 'AbortError')
      error.value = 'Audio non disponibile. Premi Riproduci per riprovare.'
  } finally {
    if (currentRequest === request) starting.value = false
  }
}

function failed() {
  pause()
  hasStarted.value = false
  caption.value = ''
  error.value = 'Audio non disponibile. Premi Riproduci per riprovare.'
}

function updateCaption() {
  const cues = Array.from(track.value?.track.activeCues ?? [])
  caption.value = cues
    .map(cue => (cue as VTTCue).getCueAsHTML().textContent ?? '').join('\n')
  captionCueId.value = cues[0]?.id ?? ''
  syncWord()
}

function ended() {
  playing.value = false
  hasStarted.value = false
  caption.value = ''
}

// Audio has no native caption display surface. Let the browser manage cue timing
// in hidden mode and render its active text in the slide's reserved bottom band.
watch(track, element => { if (element) element.track.mode = 'hidden' }, { flush: 'post' })
watch(captionSource, () => { caption.value = ''; captionError.value = false })

// Slidev also mounts previews: only the current presentation may own a player.
// Pause before removing it, and never resume automatically on tab/slide return.
watch(canPlay, value => {
  if (!value) {
    pause()
    hasStarted.value = false
    caption.value = ''
  }
}, { flush: 'sync' })
watch(source, () => { pause(); error.value = ''; hasStarted.value = false; caption.value = '' })
onBeforeUnmount(pause)
</script>

<template>
  <section v-if="available" class="lesson-audio" aria-label="Audio della slide" @click.stop @keydown.stop>
    <audio :id="id" ref="audio" :src="source" preload="none"
      @playing="playing = true" @pause="playing = false" @ended="ended" @error="failed"
      @seeked="updateCaption" @emptied="caption = ''">
      <track v-if="captionSource" :key="captionSource" ref="track" kind="captions" :src="captionSource"
        srclang="it" label="Italiano" @cuechange="updateCaption" @load="updateCaption" @error="captionError = true" />
    </audio>
    <span v-if="error" class="lesson-audio-error" role="status">{{ error }}</span>
    <span v-else-if="captionError" class="lesson-audio-error" role="status">Sottotitoli non disponibili.</span>
    <div class="join join-vertical" role="group" aria-label="Controlli audio">
      <button type="button" class="btn btn-sm btn-square join-item" aria-label="Riproduci audio" title="Riproduci audio" :aria-controls="id" :disabled="playing || starting" @click="play()">
        <HeroIcon name="play" />
      </button>
      <button type="button" class="btn btn-sm btn-square join-item" aria-label="Metti in pausa l’audio" title="Metti in pausa l’audio" :aria-controls="id" :disabled="!playing && !starting" @click="pause">
        <HeroIcon name="pause" />
      </button>
      <button type="button" class="btn btn-sm btn-square join-item" aria-label="Riproduci dall’inizio" title="Riproduci dall’inizio" :aria-controls="id" :disabled="starting" @click="play(true)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M5.25 5.25v13.5m13.5-13.5L8.25 12l10.5 6.75V5.25Z" />
        </svg>
      </button>
      <button v-if="captionSource" type="button" class="btn btn-sm btn-square join-item" aria-label="Sottotitoli"
        :title="captionsEnabled ? 'Disattiva sottotitoli' : 'Attiva sottotitoli'" :aria-pressed="captionsEnabled"
        :aria-controls="captionId" :disabled="captionError" @click="toggleCaptions">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M10 9.5a2.5 2.5 0 1 0 0 5m8-5a2.5 2.5 0 1 0 0 5" />
        </svg>
      </button>
    </div>
  </section>
  <div v-if="available && captionSource" :id="captionId" class="lesson-captions" role="region" aria-label="Sottotitoli della narrazione"
    :hidden="!canPlay || !hasStarted || !captionsEnabled || !caption || captionError"><span v-for="(part, index) in captionParts" :key="`${captionCueId}-${index}`"
      :class="{ 'lesson-caption-word': part.index >= 0, 'is-spoken': part.index >= 0 && part.index <= spokenThrough, 'is-current': part.index >= 0 && part.index === currentWord }">{{ part.text }}</span></div>
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
.lesson-audio .btn[aria-pressed="true"] {
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
.lesson-captions {
  --caption-spoken: color-mix(in srgb, var(--section-primary) 60%, var(--cvedi-paper));
  position: absolute;
  z-index: 40;
  bottom: 22px;
  left: 240px;
  right: 240px;
  padding: 4px 16px;
  border-radius: 8px;
  background: #000;
  color: var(--cvedi-paper);
  font: 500 22px/24px var(--cvedi-font-reading);
  text-align: center;
  white-space: pre-line;
  pointer-events: none;
}
.lesson-captions[hidden] { display: none; }
.lesson-caption-word {
  color: inherit;
  transition: color 100ms cubic-bezier(.16, 1, .3, 1);
}
.lesson-caption-word.is-spoken {
  color: var(--caption-spoken);
}
@media (prefers-reduced-motion: reduce) {
  .lesson-caption-word { transition: none; }
}
@media print { .lesson-audio, .lesson-captions { display: none; } }
</style>
