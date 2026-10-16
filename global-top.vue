<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useLessonPagination } from './composables/use-lesson-pagination'
import LessonDeckNavigation from './components/LessonDeckNavigation.vue'
import PresentationProgress from './components/PresentationProgress.vue'

const { currentSlideNo, currentFrontmatter, slides, isPrintMode } = useNav()
const pagination = useLessonPagination(slides, currentSlideNo)
const isCover = computed(() => String(currentFrontmatter.value.class ?? '').split(/\s+/)
  .some(name => name === 'cover-slide' || name === 'chapter-slide'))
const onDark = computed(() => {
  const classes = String(currentFrontmatter.value.class ?? '').split(/\s+/)
  return classes.includes('chapter-slide') || classes.includes('archive-wall-slide')
})
const compact = computed(() => String(currentFrontmatter.value.class ?? '').split(/\s+/).includes('interactive-example-slide'))
</script>

<template>
  <LessonDeckNavigation />
  <PresentationProgress
    v-if="!isCover"
    :lesson="pagination.lesson"
    :page="pagination.page"
    :total="pagination.total"
    :instant="isPrintMode"
    :on-dark="onDark"
    :compact="compact"
  />
</template>
