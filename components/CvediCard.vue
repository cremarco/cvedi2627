<script setup lang="ts">
import { computed, useId } from 'vue'

const props = defineProps<{ title: string; illustration?: string; illustrationVariant?: 'roomy' | 'compact' }>()
const titleId = useId()

const watermarkPaths = computed(() => {
  const source = props.illustration ?? ''
  if (/theory|book|reading/i.test(source)) {
    return [
      'M12 5.25C8.5 3.8 5 3.8 2.25 5.25v14.5C5 18.3 8.5 18.3 12 19.75c3.5-1.45 7-1.45 9.75 0V5.25C19 3.8 15.5 3.8 12 5.25Z',
      'M12 5.25v14.5',
    ]
  }
  if (/exercises|devices|simulation|sliders/i.test(source)) {
    return ['m7.5 6-6 6 6 6M16.5 6l6 6-6 6M14.25 3.75l-4.5 16.5']
  }
  if (/people|person|seminars|workshops|service|accessibility|multimodal/i.test(source)) {
    return [
      'M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM5.25 21v-1.5a6.75 6.75 0 0 1 13.5 0V21',
      'M19.5 3.75a3 3 0 0 1 0 6M21.75 19.5v-1.25a4.5 4.5 0 0 0-3-4.25M4.5 3.75a3 3 0 0 0 0 6M2.25 19.5v-1.25a4.5 4.5 0 0 1 3-4.25',
    ]
  }
  return [
    'M14.25 2.25H6A2.25 2.25 0 0 0 3.75 4.5v15A2.25 2.25 0 0 0 6 21.75h12a2.25 2.25 0 0 0 2.25-2.25V8.25l-6-6Z',
    'M14.25 2.25v6h6M7.5 12h9M7.5 15.75h9',
  ]
})
</script>

<template>
  <article class="card cvedi-card" :aria-labelledby="titleId">
    <svg v-if="illustration" class="card-watermark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path v-for="(path, index) in watermarkPaths" :key="index" class="card-watermark-path" :d="path" />
    </svg>
    <div class="card-body">
      <div class="card-heading">
        <h2 :id="titleId" class="card-title">{{ title }}</h2>
      </div>
      <slot />
    </div>
  </article>
</template>
