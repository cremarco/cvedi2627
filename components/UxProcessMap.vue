<script setup lang="ts">
import { useId } from 'vue'

const nuclei = [
  { title: 'Impostare', phases: ['Brief con gli stakeholder', 'Obiettivi di business', 'Analisi dei competitor'] },
  { title: 'Comprendere', phases: ['Definizione del problema', 'User research', 'Personas'] },
  { title: 'Organizzare', phases: ['Customer journey e user flow', 'Business Requirements Document'] },
  { title: 'Strutturare', phases: ['Architettura dell’informazione', 'Wireframing'] },
  { title: 'Verificare e dare forma', phases: ['Prototipi e test di usabilità', 'Iterazioni sui prototipi', 'UI e mockup', 'Test finale'] },
]
const mapId = `ux-process-${useId()}`
const symbols = [
  ['M9 4H6a2 2 0 0 0-2 2v14h16V6a2 2 0 0 0-2-2h-3', 'M9 2h6v4H9ZM8 11h8M8 15h6'],
  ['M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z', 'm14.5 14.5 6 6'],
  ['M9 3h6v5H9ZM2 16h6v5H2ZM16 16h6v5h-6Z', 'M12 8v4M5 16v-4h14v4'],
  ['M2 4h20v16H2Z', 'M2 9h20M8 9v11M11 12h8M11 16h5'],
  ['M6 3h12v18H6Z', 'm9 12 2 2 4-4M10 18h4'],
]
let nextPhase = 1
const groups = nuclei.map(nucleus => {
  const start = nextPhase
  nextPhase += nucleus.phases.length
  return { ...nucleus, start }
})
</script>

<template>
  <div class="ux-process-overview">
    <div class="ux-process-map" aria-label="Quattordici fasi UX in cinque nuclei: una mappa iterativa">
      <svg class="ux-process-route" viewBox="0 0 1000 32" preserveAspectRatio="none" aria-hidden="true"><path d="M94 16H906" /></svg>
      <section v-for="(nucleus, index) in groups" :key="nucleus.title" class="card ux-process-station" :aria-labelledby="`${mapId}-${index}`">
        <figure class="ux-process-art" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path v-for="(path, pathIndex) in symbols[index]" :key="pathIndex" :d="path" /></svg>
        </figure>
        <span class="badge badge-accent ux-nucleus-number" aria-hidden="true">{{ index + 1 }}</span>
        <div class="card-body">
          <h2 :id="`${mapId}-${index}`" class="card-title">{{ nucleus.title }}</h2>
          <ol :start="nucleus.start">
            <li v-for="phase in nucleus.phases" :key="phase">{{ phase }}</li>
          </ol>
        </div>
      </section>
    </div>
    <p class="ux-process-iteration">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-5m5 0V2m0 5a8 8 0 0 0-14-1M4 17h5m-5 0v5m0-5a8 8 0 0 0 14 1" /></svg>
      <span>Le evidenze possono riportare a qualsiasi nucleo.</span>
    </p>
  </div>
</template>
