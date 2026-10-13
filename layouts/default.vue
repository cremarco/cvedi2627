<script setup lang="ts">
import { computed } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { useLessonPagination } from '../composables/use-lesson-pagination'
import { useSlideSet } from '../composables/use-slide-set'
import SlideRibbon from '../components/SlideRibbon.vue'
import AcronymText from '../components/AcronymText.vue'

const props = defineProps<{ footer?: string; frontmatter?: Record<string, unknown> }>()

const { matter, set, setStyle, page, nav } = useSlideSet(() => props.frontmatter)
const { isActive, canAnimate } = useSlidePlayback()
const pagination = useLessonPagination(() => nav.value.slides, page)
const classes = computed(() => new Set(String(matter.value.class ?? '').split(/\s+/)))
const isChapter = computed(() => classes.value.has('chapter-slide'))
const isCover = computed(() => isChapter.value || classes.value.has('cover-slide'))
const isArchiveWall = computed(() => classes.value.has('archive-wall-slide'))
const isInteractive = computed(() => classes.value.has('interactive-example-slide'))
const lessonNumber = computed(() => {
  const value = Number(matter.value.lessonNumber)
  return Number.isInteger(value) && value > 0 ? value : set.value.lessonNumber ?? null
})
</script>

<template>
  <div class="slidev-layout default" :data-lesson="set.id" :style="setStyle" :class="{ 'is-active': isActive, 'motion-enabled': canAnimate, 'interactive-canvas': isInteractive, 'fixed-title-slide': !isCover && !isInteractive, 'centered-content-slide': !isCover && !isArchiveWall && !isInteractive }">
    <SlideRibbon v-if="!isCover && !isInteractive && set.id !== 'apertura'" :label="set.label" />
    <span v-if="isChapter && lessonNumber" class="chapter-lesson-number absolute">Lezione {{ String(lessonNumber).padStart(2, '0') }}</span>
    <slot />
    <footer v-if="!isCover" class="slide-footer">
      <span v-if="footer && !isCover && !isInteractive" class="slide-label"><AcronymText :text="footer" /></span>
      <span class="slide-index" :aria-label="`Slide ${pagination.page} di ${pagination.total}`">
        {{ pagination.page }} / {{ pagination.total }}
      </span>
    </footer>
  </div>
</template>
