<script setup lang="ts">
import AcronymText from './AcronymText.vue'

defineProps<{
  definition: {
    title: string
    headers: string[]
    widths: number[]
    rows: string[][]
    panels?: string[][]
    note: string
    caption: string
  }
  caption?: string
}>()
</script>

<template>
  <figure class="lesson-table-figure">
    <div v-if="definition.panels?.length" class="cvedi-grid two lesson-table-context">
      <section v-for="(panel, index) in definition.panels" :key="index">
        <h3><AcronymText :text="panel[0]" /></h3>
        <p><AcronymText :text="panel[1]" /></p>
      </section>
    </div>
    <table class="table lesson-native-table">
      <caption class="sr-only">{{ definition.title }}</caption>
      <colgroup><col v-for="(width, index) in definition.widths" :key="index" :style="{ width: `${width}%` }" /></colgroup>
      <thead v-if="definition.headers.length">
        <tr><th v-for="(heading, index) in definition.headers" :key="index" scope="col"><AcronymText :text="heading" /></th></tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in definition.rows" :key="index">
          <th scope="row"><AcronymText :text="row[0]" /></th>
          <td v-for="(cell, column) in row.slice(1)" :key="column"><AcronymText :text="cell" /></td>
        </tr>
      </tbody>
    </table>
    <p v-if="definition.note" class="lesson-table-note"><AcronymText :text="definition.note" /></p>
    <figcaption v-if="definition.caption || caption"><span class="lesson-caption"><AcronymText :text="definition.caption || caption" /></span></figcaption>
  </figure>
</template>

<style scoped>
.lesson-table-figure {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  gap: var(--cvedi-space-copy);
  min-width: 0;
  min-height: 0;
  width: 100%;
  margin: 0;
}
figure.lesson-table-figure .table.lesson-native-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 0;
  user-select: text;
  color: var(--theme-body);
  font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font);
}
figure.lesson-table-figure .table.lesson-native-table thead { font: inherit; }
figure.lesson-table-figure .table.lesson-native-table :is(th, td) {
  padding: 8px 12px;
  border-bottom: 1px solid var(--slide-rule);
  vertical-align: top;
  white-space: normal;
  overflow-wrap: break-word;
  text-align: left;
  font: inherit;
}
figure.lesson-table-figure .table.lesson-native-table thead th {
  color: var(--color-primary-content);
  background: var(--section-primary);
  font-weight: 600;
}
figure.lesson-table-figure .table.lesson-native-table tbody th {
  color: var(--section-primary-deep);
  background: color-mix(in oklch, var(--section-primary) 8%, var(--color-base-100));
  font-weight: 600;
}
figure.lesson-table-figure .lesson-table-note {
  margin: 0;
  color: var(--theme-body);
  font: 400 var(--cvedi-type-note)/1.4 var(--theme-font);
}
.lesson-table-figure figcaption { margin: 0; }
figure.lesson-table-figure .lesson-table-context { margin-bottom: var(--cvedi-space-copy); }
figure.lesson-table-figure .lesson-table-context h3 {
  margin: 0 0 var(--cvedi-space-copy);
  color: var(--section-primary-deep);
  font: 600 var(--cvedi-type-compact-title)/1.35 var(--theme-font);
}
figure.lesson-table-figure .lesson-table-context p {
  margin: 0;
  color: var(--theme-body);
  font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font);
}
@media print {
  .lesson-native-table { print-color-adjust: exact; }
}
</style>
