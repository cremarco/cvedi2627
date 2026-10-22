<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="lesson-ribbon-wrap" aria-hidden="true">
    <span class="badge badge-primary lesson-ribbon">{{ label }}</span>
  </div>
</template>

<style scoped>
.lesson-ribbon-wrap {
  position: absolute;
  top: 0;
  right: 72px;
  z-index: 8;
  pointer-events: none;
  filter: drop-shadow(var(--theme-ribbon-shadow));
}
.lesson-ribbon.badge {
  display: flex;
  width: auto;
  height: 38px;
  min-height: 38px;
  padding: 0 18px;
  border: 0;
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 10px) 100%, 0 100%);
  background: var(--section-primary);
  color: var(--color-primary-content, white);
  font: 700 var(--cvedi-type-ribbon, 12px)/1.2 var(--cvedi-font-display);
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
}
@media print { .lesson-ribbon-wrap { display: none; } }
</style>
