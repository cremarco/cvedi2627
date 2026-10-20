<script setup lang="ts">
import HeroIcon from './HeroIcon.vue'

defineProps<{ period: { era: string; date: string } }>()
</script>

<template>
  <aside class="stats lesson-history-period" aria-label="Periodo storico" data-no-font-previews data-no-acronyms>
    <div class="stat">
      <div class="stat-figure"><HeroIcon name="book-open" /></div>
      <div class="stat-title">{{ period.era }}</div>
      <div class="stat-value">{{ period.date }}</div>
    </div>
  </aside>
</template>
