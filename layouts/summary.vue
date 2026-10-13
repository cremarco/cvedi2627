<script setup lang="ts">
import DefaultLayout from './default.vue'
import AcronymText from '../components/AcronymText.vue'
import { useSlideSet } from '../composables/use-slide-set'

const props = defineProps<{ footer?: string; frontmatter?: Record<string, unknown> }>()
const { matter } = useSlideSet(() => props.frontmatter)
</script>

<template>
  <DefaultLayout class="lesson-summary-slide" :footer="footer" :frontmatter="frontmatter">
    <slot />
    <section class="lesson-summary-body" aria-label="Sintesi della lezione">
      <p class="lesson-summary-statement"><AcronymText :text="matter.summaryStatement" /></p>
      <p class="lesson-summary-support"><AcronymText :text="matter.summarySupport" /></p>
    </section>
  </DefaultLayout>
</template>
