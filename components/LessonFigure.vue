<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'
import LessonImageContent from './LessonImageContent.vue'

withDefaults(defineProps<{
  src: string
  alt: string
  caption?: string
  bordered?: boolean
  panels?: number
  panelAspectRatio?: string
}>(), { bordered: true, panels: 1, panelAspectRatio: '4 / 3' })

const captionWidth = ref<string>()
function matchCaptionWidth(size: { width: number }) {
  if (size.width > 0) captionWidth.value = `${size.width}px`
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
  <figure class="lesson-figure" :style="{ '--lesson-image-width': captionWidth, '--cvedi-image-border': bordered ? undefined : '0px' }">
    <div class="lesson-figure-actions">
      <button type="button" class="btn btn-outline lesson-image-hint" aria-haspopup="dialog" :aria-controls="dialogId" @click="openImage">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
        </svg>
        <span>Ingrandisci</span>
      </button>
    </div>
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
        @size-change="matchCaptionWidth"
      />
    </button>
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
      :style="{ '--cvedi-image-border': bordered ? undefined : '0px' }"
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
        <LessonImageContent :src="src" :alt="alt" :panels="panels" :panel-aspect-ratio="panelAspectRatio" />
      </div>
      <form method="dialog" class="modal-backdrop"><button type="submit">Chiudi immagine</button></form>
    </dialog>
  </Teleport>
</template>
