<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useSlideSet } from '../composables/use-slide-set'
import { slideSet } from '../utils/slide-sets'

const props = withDefaults(defineProps<{ to: string | number; showArrow?: boolean }>(), { showArrow: true })
const { go } = useNav()
const { set, nav } = useSlideSet()
const actionStyle = computed(() => {
  const target = nav.value.slides.find(slide => typeof props.to === 'number'
    ? slide.no === props.to
    : slide.meta.slide.frontmatter.routeAlias === props.to)
  const destination = target ? slideSet(target.meta.slide.frontmatter.lesson) : set.value
  return {
    '--action-set-color': `var(--cvedi-${destination.palette}-base)`,
    '--action-set-deep': `var(--cvedi-${destination.palette}-canvas)`,
  }
})
</script>

<template>
  <button type="button" class="btn btn-outline slide-action" :style="actionStyle" @click="go(to)" @keydown.enter.stop @keydown.space.stop>
    <slot />
    <svg v-if="showArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  </button>
</template>

<style scoped>
.slide-action.btn {
  --action-color: var(--action-set-color, var(--slide-accent));
  --action-deep: var(--action-set-deep, var(--slide-subtitle));
  min-height: 44px;
  height: 44px;
  padding: 0 16px;
  gap: 8px;
  margin-right: 12px;
  border: 1px solid var(--action-color);
  border-radius: var(--cvedi-radius);
  background: var(--cvedi-paper);
  color: var(--action-color);
  box-shadow: none;
  font: 600 var(--cvedi-type-label)/1.4 var(--cvedi-font-display);
}
.slide-action svg { width: 18px; height: 18px; flex: 0 0 auto; }
.slide-action.btn:focus-visible { outline: 3px solid var(--action-color); outline-offset: 3px; }
.slide-action.btn:active { background: var(--action-deep); color: var(--cvedi-paper); }
@media (hover: hover) {
  .slide-action.btn:hover { background: var(--action-color); color: var(--cvedi-paper); }
}
</style>
