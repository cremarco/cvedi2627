<script setup lang="ts">
import { useNav } from '@slidev/client'

withDefaults(defineProps<{ to: string | number; showArrow?: boolean }>(), { showArrow: true })
const { go } = useNav()
</script>

<template>
  <button type="button" class="btn btn-outline slide-action" :class="{ 'slide-action-brief': typeof to === 'string' && to.startsWith('brief-') }" @click="go(to)" @keydown.enter.stop @keydown.space.stop>
    <slot />
    <svg v-if="showArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  </button>
</template>

<style scoped>
.slide-action.btn {
  --action-color: var(--slide-accent);
  --action-deep: var(--slide-subtitle);
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
.slide-action-brief.btn {
  --action-color: var(--cvedi-brief-base);
  --action-deep: var(--cvedi-brief-deep);
}
.slide-action svg { width: 18px; height: 18px; flex: 0 0 auto; }
.slide-action.btn:focus-visible { outline: 3px solid var(--action-color); outline-offset: 3px; }
.slide-action.btn:active { background: var(--action-deep); color: var(--cvedi-paper); }
@media (hover: hover) {
  .slide-action.btn:hover { background: var(--action-color); color: var(--cvedi-paper); }
}
</style>
