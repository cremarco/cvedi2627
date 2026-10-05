<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'
import LessonImageContent from './LessonImageContent.vue'

withDefaults(defineProps<{
  src: string
  alt: string
  caption?: string
  panels?: number
  panelAspectRatio?: string
}>(), { panels: 1, panelAspectRatio: '4 / 3' })

const captionWidth = ref<string>()
function matchCaptionWidth(size: { width: number }) {
  if (size.width > 0) captionWidth.value = `${size.width}px`
}

const dialog = ref<HTMLDialogElement>()
const dialogId = `lesson-image-${useId()}`
const accent = ref('var(--cvedi-indigo-700)')
const isActive = useIsSlideActive()
watch(isActive, active => { if (!active && dialog.value?.open) dialog.value.close() })

function openImage(event: MouseEvent) {
  accent.value = getComputedStyle(event.currentTarget as HTMLElement).getPropertyValue('--slide-accent')
  dialog.value?.showModal()
}
</script>

<template>
  <figure class="lesson-figure" :style="{ '--lesson-image-width': captionWidth }">
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
    <figcaption>
      <span v-if="caption" class="lesson-caption">{{ caption }}</span>
      <button type="button" class="btn btn-ghost lesson-image-hint" aria-haspopup="dialog" :aria-controls="dialogId" @click="openImage">Ingrandisci</button>
    </figcaption>
  </figure>
  <Teleport to="body">
    <dialog
      :id="dialogId"
      ref="dialog"
      class="modal lesson-image-dialog"
      :aria-labelledby="`${dialogId}-title`"
      :style="{ '--image-accent': accent }"
      @keydown.stop
    >
      <div class="modal-box">
        <header>
          <p :id="`${dialogId}-title`">{{ caption || alt }}</p>
          <form method="dialog"><button type="submit" class="btn">Chiudi</button></form>
        </header>
        <LessonImageContent :src="src" :alt="alt" :panels="panels" :panel-aspect-ratio="panelAspectRatio" />
      </div>
      <form method="dialog" class="modal-backdrop"><button type="submit">Chiudi immagine</button></form>
    </dialog>
  </Teleport>
</template>
