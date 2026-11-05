<script setup lang="ts">
import AcronymText from './AcronymText.vue'

defineProps<{
  definition: {
    title: string
    fields: { id: string; title: string; text: string; tone?: string }[]
  }
  caption?: string
}>()
</script>

<template>
  <section class="ux-hypothesis" :aria-label="definition.title">
    <dl class="list ux-hypothesis-grid">
      <div v-for="field in definition.fields" :key="field.id" class="list-row ux-hypothesis-field" :class="{ 'is-soft': field.tone === 'soft' }">
        <dt><AcronymText :text="field.title" /></dt>
        <dd><AcronymText :text="field.text" /></dd>
      </div>
    </dl>
    <p v-if="caption" class="lesson-caption"><AcronymText :text="caption" /></p>
  </section>
</template>

<style scoped>
.ux-hypothesis {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  gap: var(--cvedi-space-related);
  min-height: 0;
  width: 100%;
  user-select: text;
}
dl.ux-hypothesis-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--cvedi-space-columns);
  row-gap: var(--cvedi-space-peers);
  margin: 0;
}
.ux-hypothesis-grid > .ux-hypothesis-field {
  display: flex;
  flex-direction: column;
  gap: var(--cvedi-space-copy);
  min-width: 0;
  padding: var(--cvedi-space-peers);
  border-top: 1px solid var(--slide-rule);
  border-radius: 0;
}
.ux-hypothesis-field::after { display: none; }
.ux-hypothesis-grid > .is-soft {
  border-top-color: transparent;
  border-radius: var(--cvedi-radius);
  background: color-mix(in oklch, var(--section-primary) 8%, var(--color-base-100));
}
.ux-hypothesis-field dt {
  margin: 0;
  color: var(--section-primary-deep);
  font: 600 var(--cvedi-type-card-title)/1.35 var(--theme-font);
}
.ux-hypothesis-field dd {
  margin: 0;
  color: var(--theme-body);
  font: 400 var(--cvedi-type-body)/1.45 var(--theme-font);
}
.ux-hypothesis > .lesson-caption { margin: 0; }
@media print {
  .ux-hypothesis-field { print-color-adjust: exact; }
}
</style>
