<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'

defineProps<{ footer?: string; frontmatter?: Record<string, unknown> }>()

const { $page, $nav } = useSlideContext()
const isActive = useIsSlideActive()
</script>

<template>
  <div class="slidev-layout default" :class="{ 'is-active': isActive }">
    <slot />
    <footer class="slide-footer">
      <span v-if="footer" class="slide-label">{{ footer }}</span>
      <span class="slide-index" :aria-label="`Slide ${$page} di ${$nav.total}`">
        {{ String($page).padStart(2, '0') }} / {{ $nav.total }}
      </span>
    </footer>
  </div>
</template>
