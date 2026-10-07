<script setup lang="ts">
import { computed } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { lessonPagination } from '../utils/lesson-pagination'
import { useSlideSet } from '../composables/use-slide-set'
import SlideRibbon from '../components/SlideRibbon.vue'

const props = defineProps<{ footer?: string; frontmatter?: Record<string, unknown> }>()

const { matter, set, setStyle, page, nav } = useSlideSet(() => props.frontmatter)
const { isActive, canAnimate } = useSlidePlayback()
const pagination = computed(() => lessonPagination(nav.value.slides, page.value))
const classes = computed(() => new Set(String(matter.value.class ?? '').split(/\s+/)))
const isChapter = computed(() => classes.value.has('chapter-slide'))
const isCover = computed(() => isChapter.value || classes.value.has('cover-slide'))
const isArchiveWall = computed(() => classes.value.has('archive-wall-slide'))
const lessonNumber = computed(() => {
  const value = Number(matter.value.lessonNumber)
  return Number.isInteger(value) && value > 0 ? value : set.value.lessonNumber ?? null
})
</script>

<template>
  <div class="slidev-layout default" :data-lesson="set.id" :style="setStyle" :class="{ 'is-active': isActive, 'motion-enabled': canAnimate, 'fixed-title-slide': !isCover, 'centered-content-slide': !isCover && !isArchiveWall }">
    <SlideRibbon v-if="!isCover && set.id !== 'apertura'" :label="set.label" />
    <span v-if="isChapter && lessonNumber" class="chapter-lesson-number absolute">Lezione {{ String(lessonNumber).padStart(2, '0') }}</span>
    <slot />
    <footer class="slide-footer">
      <span v-if="footer" class="slide-label">{{ footer }}</span>
      <span v-if="!classes.has('cover-slide')" class="slide-index" :aria-label="`Slide ${pagination.page} di ${pagination.total}`">
        {{ String(pagination.page).padStart(2, '0') }} / {{ pagination.total }}
      </span>
    </footer>
  </div>
</template>
