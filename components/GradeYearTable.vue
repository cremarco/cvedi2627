<script setup lang="ts">
import { grades, gradeBands, gradeTones, gradePercent, gradeNumber } from '../data/grades'
</script>

<template>
  <div class="overflow-x-auto grade-table-wrap">
    <table class="table table-sm grade-year-table" aria-label="Distribuzione dei voti finali per anno accademico">
      <thead>
        <tr>
          <th scope="col">Registro</th>
          <th v-for="band in gradeBands" :key="band" scope="col">{{ band }}</th>
          <th scope="col">Mediana</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in grades.final.byYear" :key="row.year" :style="{ '--grade-order': index }">
          <th scope="row">{{ row.year }}<small>n = {{ row.n }}</small></th>
          <td v-for="(count, band) in row.bins" :key="gradeBands[band]">
            <span class="grade-table-value">{{ gradePercent(count, row.n) }}</span>
            <progress class="progress" :class="gradeTones[band]" :value="count" :max="row.n" :aria-label="`${row.year}, ${gradeBands[band]}: ${count} voti su ${row.n}`" />
          </td>
          <td class="grade-table-median">{{ gradeNumber(row.median) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
