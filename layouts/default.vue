<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { lessonPagination } from '../utils/lesson-pagination'

defineProps<{ footer?: string; frontmatter?: Record<string, unknown> }>()

const { $page, $nav } = useSlideContext()
const isActive = useIsSlideActive()
const pagination = computed(() => lessonPagination($nav.value.slides, $page.value))
</script>

<template>
  <div class="slidev-layout default" :class="{ 'is-active': isActive }">
    <slot />
    <footer class="slide-footer">
      <span v-if="footer" class="slide-label">{{ footer }}</span>
      <span class="slide-index" :aria-label="`Slide ${pagination.page} di ${pagination.total}`">
        {{ String(pagination.page).padStart(2, '0') }} / {{ pagination.total }}
      </span>
    </footer>
  </div>
</template>
