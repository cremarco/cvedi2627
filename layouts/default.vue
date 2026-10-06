<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { lessonPagination } from '../utils/lesson-pagination'

const props = defineProps<{ footer?: string; frontmatter?: Record<string, unknown> }>()

const { $page, $nav } = useSlideContext()
const isActive = useIsSlideActive()
const pagination = computed(() => lessonPagination($nav.value.slides, $page.value))
const slideMatter = computed(() => props.frontmatter ?? $nav.value.slides.find(slide => slide.no === $page.value)?.meta.slide.frontmatter ?? {})
const isChapter = computed(() => String(slideMatter.value.class ?? '').split(/\s+/).includes('chapter-slide'))
const lessonLabel = computed(() => ({
  'presentazione-corso': 'Lezione 1',
  introduzione: 'Lezione 2',
  'storia-design': 'Lezione 3',
  'brief-progetto': 'Brief di progetto',
}[pagination.value.lesson] ?? 'CVeDI 2026/27'))
</script>

<template>
  <div class="slidev-layout default" :class="{ 'is-active': isActive }">
    <div v-if="!isChapter && pagination.lesson !== 'apertura'" class="lesson-ribbon-wrap" aria-hidden="true">
      <span class="lesson-ribbon">{{ lessonLabel }}</span>
    </div>
    <slot />
    <footer class="slide-footer">
      <span v-if="footer" class="slide-label">{{ footer }}</span>
      <span class="slide-index" :aria-label="`Slide ${pagination.page} di ${pagination.total}`">
        {{ String(pagination.page).padStart(2, '0') }} / {{ pagination.total }}
      </span>
    </footer>
  </div>
</template>
