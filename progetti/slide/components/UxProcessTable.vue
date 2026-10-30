<script setup lang="ts">
import { computed } from 'vue'
import LessonTable from './LessonTable.vue'
import { processTables } from '../data/lesson-tables.mjs'

const props = defineProps<{ code: string; caption?: string }>()
const definition = computed(() => {
  const table = processTables[props.code]
  if (!table) throw new Error('Missing native UX process table: ' + props.code)
  return table
})
</script>

<template>
  <LessonTable :definition="definition" :caption="caption" :data-table-code="code" />
</template>
