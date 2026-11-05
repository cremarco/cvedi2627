<script setup lang="ts">
import { computed } from 'vue'
import LessonTable from './LessonTable.vue'
import tables from '../data/test-usabilita-tables.json'

const props = defineProps<{ code: string }>()
const definition = computed(() => {
  const table = tables[props.code as keyof typeof tables]
  if (!table) throw new Error('Missing usability table: ' + props.code)
  return table
})
</script>

<template>
  <LessonTable :definition="definition" :data-table-code="code" />
</template>
