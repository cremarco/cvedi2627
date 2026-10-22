<script setup lang="ts">
import { computed } from 'vue'
import videos from '../data/lesson-videos.json'
import { useSlidePlayback } from '../composables/useSlidePlayback'

const props = defineProps<{ video: keyof typeof videos }>()
const entry = computed(() => videos[props.video])
const { isActive, isPrinting, isVisible } = useSlidePlayback()
// Unmounting the player stops audio when leaving the slide, hiding the tab,
// or printing. Entering the slide never starts playback automatically.
const showPlayer = computed(() => isActive.value && isVisible.value && !isPrinting.value)
const playerUrl = computed(() => `https://www.youtube-nocookie.com/embed/${entry.value.youtubeId}?rel=0&playsinline=1`)
</script>

<template>
  <figure class="lesson-video">
    <div class="lesson-video-stage">
      <iframe v-if="showPlayer" :src="playerUrl" :title="`${entry.title} — ${entry.author}`"
        width="760" height="428" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
        allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen />
      <div v-else class="lesson-video-fallback">
        <p>{{ entry.title }}</p>
        <a :href="entry.url" target="_blank" rel="noopener noreferrer">{{ entry.url }}</a>
      </div>
    </div>
    <figcaption>
      <span>{{ entry.title }} · {{ entry.author }}</span>
      <a class="link" :href="entry.url" target="_blank" rel="noopener noreferrer">Apri su YouTube</a>
    </figcaption>
  </figure>
</template>
