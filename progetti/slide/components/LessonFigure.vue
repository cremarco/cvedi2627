<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import LessonImageContent from './LessonImageContent.vue'
import HeroIcon from './HeroIcon.vue'
import AcronymText from './AcronymText.vue'
import { useSlideSet } from '../composables/use-slide-set'
import { useSlidePlayback } from '../composables/useSlidePlayback'

const { setStyle } = useSlideSet()

withDefaults(defineProps<{
  src: string
  alt: string
  caption?: string
  panels?: number
  panelAspectRatio?: string
  verticalRange?: [number, number]
  crop?: [number, number, number, number]
  maxScale?: number
  zoomFullImage?: boolean
}>(), { panels: 1, panelAspectRatio: '4 / 3' })

const captionWidth = ref<string>()
const imageHeight = ref<string>()
const imageEmptySpace = ref<string>()
function matchImageSize(size: { width: number; height: number; emptySpaceY: number }) {
  if (size.width > 0) captionWidth.value = `${size.width}px`
  if (size.height > 0) imageHeight.value = `${size.height}px`
  imageEmptySpace.value = `${size.emptySpaceY}px`
}

const dialog = ref<HTMLDialogElement>()
const imageIsOpen = ref(false)
const dialogId = `lesson-image-${useId()}`
const { isActive, canAnimate, isPrinting } = useSlidePlayback()
const replay = ref(0)
watch(isActive, active => { if (!active && dialog.value?.open) dialog.value.close() })

function openImage() {
  if (!dialog.value || dialog.value.open) return
  imageIsOpen.value = true
  dialog.value.showModal()
}

function syncDialogState() {
  // A queued close event can arrive after the native dialog has reopened.
  imageIsOpen.value = Boolean(dialog.value?.open)
}
</script>

<template>
  <figure class="lesson-figure" :style="{ '--lesson-image-width': captionWidth, '--lesson-image-height': imageHeight, '--lesson-image-empty-space': imageEmptySpace }">
    <div class="lesson-figure-media relative">
      <button
        type="button"
        class="lesson-image-button"
        :class="{ 'lesson-image-with-overlay': $slots.overlay && !isPrinting }"
        :aria-label="`Ingrandisci: ${alt}`"
        aria-haspopup="dialog"
        :aria-controls="dialogId"
        @click="openImage"
      >
        <LessonImageContent
          :src="src"
          :alt="alt"
          :panels="panels"
          :panel-aspect-ratio="panelAspectRatio"
          :vertical-range="verticalRange"
          :crop="crop"
          :max-scale="maxScale"
          @size-change="matchImageSize"
        />
        <span v-if="$slots.overlay" v-show="!isPrinting" class="lesson-image-overlay" aria-hidden="true">
          <slot name="overlay" :playing="canAnimate && !imageIsOpen" :replay="replay" />
        </span>
      </button>
      <button v-if="$slots.overlay" v-show="!isPrinting" type="button" class="btn btn-ghost btn-sm lesson-image-replay" :disabled="!canAnimate" :title="canAnimate ? 'Ripeti l’animazione del diagramma' : 'Animazione disattivata con movimento ridotto'" @click.stop="replay++">
        <HeroIcon name="arrow-path" />
        <span>Rianima</span>
      </button>
      <button v-show="!isPrinting" type="button" class="btn btn-ghost btn-square lesson-image-hint" :aria-label="`Ingrandisci: ${alt}`" title="Ingrandisci" aria-haspopup="dialog" :aria-controls="dialogId" @click="openImage">
        <HeroIcon name="arrows-pointing-out" outline-class="lesson-image-hint-outline" stroke-width="1.8" />
      </button>
    </div>
    <figcaption v-if="caption">
      <span class="lesson-caption"><AcronymText :text="caption" /></span>
    </figcaption>
  </figure>
  <Teleport to="body">
    <dialog
      :id="dialogId"
      ref="dialog"
      class="modal lesson-image-dialog"
      :aria-labelledby="`${dialogId}-title`"
      :style="setStyle"
      @keydown.stop
      @close="syncDialogState"
    >
      <div class="modal-box">
        <header>
          <p :id="`${dialogId}-title`"><AcronymText :text="caption || alt" /></p>
          <form method="dialog">
            <button type="submit" class="btn btn-outline lesson-image-close" autofocus>
              <HeroIcon name="x-mark" stroke-width="1.8" />
              <span>Chiudi</span>
            </button>
          </form>
        </header>
        <LessonImageContent v-if="imageIsOpen" :src="src" :alt="alt" :panels="panels" :panel-aspect-ratio="panelAspectRatio" :vertical-range="zoomFullImage ? undefined : verticalRange" :crop="crop" :max-scale="maxScale" />
      </div>
      <form method="dialog" class="modal-backdrop"><button type="submit">Chiudi immagine</button></form>
    </dialog>
  </Teleport>
</template>
