<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { lessonPagination } from './utils/lesson-pagination'
import PresentationProgress from './components/PresentationProgress.vue'

const { currentSlideNo, slides, isPrintMode } = useNav()
const pagination = computed(() => lessonPagination(slides.value, currentSlideNo.value))
</script>

<template>
  <PresentationProgress
    :lesson="pagination.lesson"
    :page="pagination.page"
    :total="pagination.total"
    :instant="isPrintMode"
  />
</template>
