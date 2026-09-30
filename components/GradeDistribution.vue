<script setup lang="ts">
import { computed } from 'vue'
import { grades, gradeBands, gradeTones, gradePercent, gradeNumber, type GradeCategory } from '../data/grades'

const props = defineProps<{ category: GradeCategory }>()
const data = computed(() => grades[props.category])
const mostFrequent = computed(() => data.value.bins.indexOf(Math.max(...data.value.bins)))
const descriptions: Record<GradeCategory, string> = {
  project: 'voti di progetto o approfondimento',
  oral: 'voti orali',
  written: 'voti degli scritti',
  final: 'voti finali',
}
const period = computed(() => {
  const years = data.value.byYear.map(item => item.year)
  return `${years[0]} al ${years[years.length - 1]}`
})
</script>

<template>
  <p class="grade-intro">{{ data.n }} {{ descriptions[category] }} nei registri dal {{ period }}.</p>
  <div class="grade-distribution" aria-label="Distribuzione dei voti per fascia">
    <div v-for="(count, index) in data.bins" :key="gradeBands[index]" class="grade-range" :class="gradeTones[index]" :style="{ '--grade-order': index }">
      <div class="grade-range-head">
        <span>{{ gradeBands[index] }}</span>
        <strong>{{ gradePercent(count, data.n) }} <small>· {{ count }} voti</small></strong>
      </div>
      <progress class="progress" :value="count" :max="data.n" :aria-label="`${gradeBands[index]}: ${count} voti su ${data.n}`" />
    </div>
  </div>
  <div class="stats grade-summary-stats">
    <div class="stat">
      <div class="stat-title">Fascia più frequente</div>
      <div class="stat-value">{{ gradeBands[mostFrequent] }}</div>
      <div class="stat-desc">{{ data.bins[mostFrequent] }} voti · {{ gradePercent(data.bins[mostFrequent], data.n) }}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Mediana</div>
      <div class="stat-value">{{ gradeNumber(data.median) }}</div>
      <div class="stat-desc">su {{ data.n }} voti registrati</div>
    </div>
  </div>
</template>
