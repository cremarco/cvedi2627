<script setup lang="ts">
defineProps<{ rows: string[][]; caption?: string }>()
</script>

<template>
  <figure class="exercise-display-comparison">
    <table class="table table-zebra exercise-display-table">
      <caption v-if="caption">{{ caption }}</caption>
      <colgroup><col class="exercise-display-description" /><col /><col /><col /></colgroup>
      <thead><tr><th v-for="(heading, index) in rows[0]" :key="heading" scope="col"><code v-if="index">{{ heading }}</code><span v-else>{{ heading }}</span></th></tr></thead>
      <tbody>
        <tr v-for="row in rows.slice(1)" :key="row[0]">
          <th scope="row">{{ row[0] }}</th>
          <td v-for="(value, index) in row.slice(1)" :key="index"><span class="exercise-display-answer" :class="{ 'is-yes': value === 'SI' }"><span class="exercise-display-sign" aria-hidden="true">{{ value === 'SI' ? '✓' : '−' }}</span>{{ value === 'SI' ? 'Sì' : 'No' }}</span></td>
        </tr>
      </tbody>
    </table>
  </figure>
</template>
