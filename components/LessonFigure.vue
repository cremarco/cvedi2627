<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'
import { publicAsset } from '../utils/public-asset'
withDefaults(defineProps<{ src: string; alt: string; caption?: string; panels?: number; panelAspectRatio?: string }>(), { panels: 1, panelAspectRatio: '4 / 3' })
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
  <figure class="lesson-figure">
    <button type="button" class="lesson-image-button" :aria-label="`Ingrandisci: ${alt}`" aria-haspopup="dialog" :aria-controls="dialogId" @click="openImage">
      <span v-if="panels > 1" class="lesson-figure-panels" :style="{ '--figure-panels': panels, '--figure-panel-ratio': panelAspectRatio }">
        <img v-for="panel in panels" :key="panel" :src="publicAsset(src)" :alt="panel === 1 ? alt : ''" :aria-hidden="panel > 1 ? true : undefined" :style="{ objectPosition: `center ${(panel - 1) / (panels - 1) * 100}%` }" />
      </span>
      <img v-else :src="publicAsset(src)" :alt="alt" />
    </button>
    <figcaption><span>{{ caption }}</span><span class="lesson-image-hint" aria-hidden="true">Ingrandisci</span></figcaption>
  </figure>
  <Teleport to="body">
    <dialog :id="dialogId" ref="dialog" class="modal lesson-image-dialog" :aria-labelledby="`${dialogId}-title`" :style="{ '--image-accent': accent }" @keydown.stop>
      <div class="modal-box">
        <header><p :id="`${dialogId}-title`">{{ caption || alt }}</p><form method="dialog"><button type="submit" class="btn">Chiudi</button></form></header>
        <div v-if="panels > 1" class="lesson-figure-panels" :style="{ '--figure-panels': panels, '--figure-panel-ratio': panelAspectRatio }">
          <img v-for="panel in panels" :key="panel" :src="publicAsset(src)" :alt="panel === 1 ? alt : ''" :aria-hidden="panel > 1 ? true : undefined" :style="{ objectPosition: `center ${(panel - 1) / (panels - 1) * 100}%` }" />
        </div>
        <img v-else :src="publicAsset(src)" :alt="alt" />
      </div>
      <form method="dialog" class="modal-backdrop"><button type="submit">Chiudi immagine</button></form>
    </dialog>
  </Teleport>
</template>
