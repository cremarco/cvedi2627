<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { lessonPagination } from './utils/lesson-pagination'
import PresentationProgress from './components/PresentationProgress.vue'

const { currentSlideNo, slides, isPrintMode } = useNav()
const pagination = computed(() => lessonPagination(slides.value, currentSlideNo.value))
const onDark = computed(() => {
  const matter = slides.value.find(slide => slide.no === currentSlideNo.value)?.meta.slide.frontmatter
  const classes = String(matter?.class ?? '').split(/\s+/)
  return classes.includes('chapter-slide') || classes.includes('archive-wall-slide')
})
</script>

<template>
  <PresentationProgress
    :lesson="pagination.lesson"
    :page="pagination.page"
    :total="pagination.total"
    :instant="isPrintMode"
    :on-dark="onDark"
  />
</template>
