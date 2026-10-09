<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'
import LessonImageContent from './LessonImageContent.vue'
import { useSlideSet } from '../composables/use-slide-set'

const { setStyle } = useSlideSet()

withDefaults(defineProps<{
  src: string
  alt: string
  caption?: string
  panels?: number
  panelAspectRatio?: string
  verticalRange?: [number, number]
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
const dialogId = `lesson-image-${useId()}`
const isActive = useIsSlideActive()
watch(isActive, active => { if (!active && dialog.value?.open) dialog.value.close() })

function openImage() {
  dialog.value?.showModal()
}
</script>

<template>
  <figure class="lesson-figure" :style="{ '--lesson-image-width': captionWidth, '--lesson-image-height': imageHeight, '--lesson-image-empty-space': imageEmptySpace }">
    <div class="lesson-figure-media relative">
      <button
        type="button"
        class="lesson-image-button"
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
          :max-scale="maxScale"
          @size-change="matchImageSize"
        />
      </button>
      <button type="button" class="btn btn-ghost btn-square lesson-image-hint" :aria-label="`Ingrandisci: ${alt}`" title="Ingrandisci" aria-haspopup="dialog" :aria-controls="dialogId" @click="openImage">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path class="lesson-image-hint-outline" d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
          <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
        </svg>
      </button>
    </div>
    <figcaption v-if="caption">
      <span class="lesson-caption">{{ caption }}</span>
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
    >
      <div class="modal-box">
        <header>
          <p :id="`${dialogId}-title`">{{ caption || alt }}</p>
          <form method="dialog">
            <button type="submit" class="btn btn-outline lesson-image-close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" /></svg>
              <span>Chiudi</span>
            </button>
          </form>
        </header>
        <LessonImageContent :src="src" :alt="alt" :panels="panels" :panel-aspect-ratio="panelAspectRatio" :vertical-range="zoomFullImage ? undefined : verticalRange" :max-scale="maxScale" />
      </div>
      <form method="dialog" class="modal-backdrop"><button type="submit">Chiudi immagine</button></form>
    </dialog>
  </Teleport>
</template>
