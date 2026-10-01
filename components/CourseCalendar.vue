<script setup lang="ts">
import { computed } from 'vue'
import calendar from '../data/calendar.json'

const props = defineProps<{ period: keyof typeof calendar }>()
const rows = computed(() => calendar[props.period])
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-sm cvedi-calendar" aria-label="Calendario delle lezioni e delle esercitazioni 2026/27">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Tipo</th>
          <th scope="col">Orario</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="row.date"
          :class="{ annullata: row.type === 'Annullata', esercitazione: row.type === 'Esercitazione' }"
          :style="{ '--calendar-order': Math.min(index, 12) }"
        >
          <th scope="row">{{ row.date }}</th>
          <td>
            <span class="badge" :class="row.type === 'Annullata' ? 'badge-ghost' : 'badge-soft badge-primary'">
              {{ row.type }}
            </span>
          </td>
          <td>{{ row.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
