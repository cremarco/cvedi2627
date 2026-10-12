<script setup lang="ts">
import { useId } from 'vue'
import { thematicArtwork } from '../utils/card-artwork'
import { publicAsset } from '../utils/public-asset'
import HeroIcon from './HeroIcon.vue'

const nuclei = [
  { title: 'Impostare', phases: ['Brief con gli stakeholder', 'Obiettivi di business', 'Analisi dei competitor'] },
  { title: 'Comprendere', phases: ['Definizione del problema', 'User research', 'Personas'] },
  { title: 'Organizzare', phases: ['Customer journey e user flow', 'Business Requirements Document'] },
  { title: 'Strutturare', phases: ['Architettura dell’informazione', 'Wireframing'] },
  { title: 'Verificare e dare forma', phases: ['Prototipi e test di usabilità', 'Iterazioni sui prototipi', 'UI e mockup', 'Test finale'] },
]
const mapId = `ux-process-${useId()}`
const artwork = ['introduction-goals', 'introduction-research', 'introduction-workflow', 'introduction-structure', 'introduction-testing']
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
          <img :src="publicAsset(thematicArtwork(artwork[index]))" alt="" decoding="async" />
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
      <HeroIcon name="arrow-path" stroke-width="1.8" />
      <span>Le evidenze possono riportare a qualsiasi nucleo.</span>
    </p>
  </div>
</template>
