<script setup lang="ts">
const nuclei = [
  { title: 'Impostare', phases: ['Brief con gli stakeholder', 'Obiettivi di business', 'Analisi dei competitor'] },
  { title: 'Comprendere', phases: ['Definizione del problema', 'User research', 'Personas'] },
  { title: 'Organizzare', phases: ['Customer journey e user flow', 'Business Requirements Document'] },
  { title: 'Strutturare', phases: ['Architettura dell’informazione', 'Wireframing'] },
  { title: 'Verificare e dare forma', phases: ['Prototipi e test di usabilità', 'Iterazioni sui prototipi', 'UI e mockup', 'Test finale'] },
]
const offsets = [0, 3, 6, 8, 10]
</script>

<template>
  <div class="ux-process-map" aria-label="Quattordici fasi UX in cinque nuclei: una mappa iterativa">
    <section v-for="(nucleus, index) in nuclei" :key="nucleus.title" class="card cvedi-card">
      <div class="card-body">
        <h2 class="card-title"><span class="badge badge-accent">{{ index + 1 }}</span>{{ nucleus.title }}</h2>
        <ol :start="offsets[index] + 1">
          <li v-for="phase in nucleus.phases" :key="phase">{{ phase }}</li>
        </ol>
      </div>
    </section>
  </div>
</template>
