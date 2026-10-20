<script setup lang="ts">
import { computed } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { useLessonPagination } from '../composables/use-lesson-pagination'
import { useSlideSet } from '../composables/use-slide-set'
import SlideRibbon from '../components/SlideRibbon.vue'
import AcronymText from '../components/AcronymText.vue'
import LessonHistoryPeriod from '../components/LessonHistoryPeriod.vue'
import historyPeriods from '../data/typography-history-periods.json'

const props = defineProps<{ footer?: string; frontmatter?: Record<string, unknown> }>()

const { matter, set, setStyle, page, nav } = useSlideSet(() => props.frontmatter)
const { isActive, canAnimate } = useSlidePlayback()
const pagination = useLessonPagination(() => nav.value.slides, page)
const classes = computed(() => new Set(String(matter.value.class ?? '').split(/\s+/)))
const isChapter = computed(() => classes.value.has('chapter-slide'))
const isCover = computed(() => isChapter.value || classes.value.has('cover-slide'))
const isArchiveWall = computed(() => classes.value.has('archive-wall-slide'))
const isInteractive = computed(() => classes.value.has('interactive-example-slide'))
const historyPeriod = computed(() => {
  if (set.value.id !== 'tipografia-griglie') return null
  const key = String(matter.value.historyPeriod ?? '')
  return Object.hasOwn(historyPeriods, key) ? historyPeriods[key as keyof typeof historyPeriods] : null
})
const lessonNumber = computed(() => {
  const value = Number(matter.value.lessonNumber)
  return Number.isInteger(value) && value > 0 ? value : set.value.lessonNumber ?? null
})
const sectionNumber = computed(() => {
  if (matter.value.sectionDivider !== true) return null
  const value = Number(matter.value.sectionNumber)
  return Number.isInteger(value) && value > 0 ? value : null
})
</script>

<template>
  <div class="slidev-layout default" :data-lesson="set.id" :style="setStyle" :class="{ 'is-active': isActive, 'motion-enabled': canAnimate, 'interactive-canvas': isInteractive, 'fixed-title-slide': !isCover && !isInteractive, 'centered-content-slide': !isCover && !isArchiveWall && !isInteractive, 'has-history-period': !!historyPeriod }">
    <SlideRibbon v-if="!isCover && !isInteractive && set.id !== 'apertura'" :label="set.label" />
    <LessonHistoryPeriod v-if="historyPeriod && !isCover" :period="historyPeriod" />
    <span v-if="isChapter && lessonNumber" class="chapter-lesson-number absolute">Lezione {{ String(lessonNumber).padStart(2, '0') }}<template v-if="sectionNumber"> · Sezione {{ String(sectionNumber).padStart(2, '0') }}</template></span>
    <slot />
    <footer v-if="!isCover" class="slide-footer">
      <span v-if="footer && !isCover && !isInteractive" class="slide-label"><AcronymText :text="footer" /></span>
      <span class="slide-index" :aria-label="`Slide ${pagination.page} di ${pagination.total}`">
        {{ pagination.page }} / {{ pagination.total }}
      </span>
    </footer>
  </div>
</template>
