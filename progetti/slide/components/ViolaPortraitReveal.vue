<script setup lang="ts">
import { computed, ref } from 'vue'
import LessonFigure from './LessonFigure.vue'
import { publicAsset } from '../utils/public-asset'

defineProps<{ illustrationSrc: string; photoSrc: string; alt: string }>()
const photoReady = ref(false)
const illustrationReady = ref(false)
const ready = computed(() => photoReady.value && illustrationReady.value)
</script>

<template>
  <LessonFigure :src="photoSrc" :alt="alt" replay-label="Ripeti la trasformazione di Viola">
    <template #overlay="{ playing, replay }">
      <span :key="replay" class="viola-portrait" :class="{ 'is-playing': playing && ready, 'is-loading': !ready }">
        <img class="viola-portrait-photo" :src="publicAsset(photoSrc)" alt="" decoding="async" @load="photoReady = true" />
        <img class="viola-portrait-illustration" :src="publicAsset(illustrationSrc)" alt="" decoding="async" @load="illustrationReady = true" />
      </span>
    </template>
  </LessonFigure>
</template>

<style scoped>
.viola-portrait { position: relative; display: block; width: 100%; height: 100%; }
.viola-portrait > img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; }
.viola-portrait-photo { opacity: 1; }
.viola-portrait-illustration { opacity: 0; }
.viola-portrait.is-loading .viola-portrait-photo { opacity: 0; }
.viola-portrait.is-loading .viola-portrait-illustration { opacity: 1; }
.viola-portrait.is-playing .viola-portrait-photo { animation: cvedi-viola-photo 1.8s cubic-bezier(.22, 1, .36, 1) .9s both; }
.viola-portrait.is-playing .viola-portrait-illustration { animation: cvedi-viola-illustration 1.8s cubic-bezier(.22, 1, .36, 1) .9s both; }
@keyframes cvedi-viola-photo {
  from { opacity: 0; filter: blur(3px); }
  to { opacity: 1; filter: blur(0); }
}
@keyframes cvedi-viola-illustration {
  from { opacity: 1; filter: blur(0); }
  to { opacity: 0; filter: blur(2px); }
}
@media (prefers-reduced-motion: reduce) {
  .viola-portrait.is-playing > img { animation: none; }
}
</style>
