<script setup lang="ts">
import decision from '../data/ux-persona-decision.json'
</script>

<template>
  <section class="ux-persona-decision" aria-label="Dal bisogno di Viola alla scelta progettuale">
    <p class="lead ux-persona-need">{{ decision.need }}</p>
    <div class="ux-persona-paths">
      <section v-for="path in decision.paths" :key="path.id" class="ux-persona-path" :class="{ 'is-hypothesis': path.id === 'compatibility-first' }" :aria-labelledby="`persona-path-${path.id}`">
        <h2 :id="`persona-path-${path.id}`">{{ path.title }}</h2>
        <ol class="steps steps-horizontal">
          <li v-for="step in path.steps" :key="step" class="step" :class="{ 'step-primary': path.id === 'compatibility-first' }"><span>{{ step }}</span></li>
        </ol>
      </section>
    </div>
    <div class="ux-persona-decision-notes">
      <section class="ux-persona-test-question">
        <h2>Domanda per la prova</h2>
        <p>{{ decision.question }}</p>
      </section>
      <section class="ux-persona-evidence">
        <h2>Che cosa orienta la scelta</h2>
        <p>{{ decision.evidence }}</p>
      </section>
    </div>
  </section>
</template>

<style scoped>
.ux-persona-decision {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  gap: var(--cvedi-space-peers);
  min-height: 0;
  width: 100%;
  user-select: text;
}
.ux-persona-decision > .ux-persona-need { margin: 0; }
.ux-persona-paths { display: flex; flex-direction: column; gap: var(--cvedi-space-related); }
.ux-persona-path {
  display: grid;
  grid-template-columns: 216px minmax(0, 1fr);
  align-items: center;
  gap: var(--cvedi-space-peers);
  padding: var(--cvedi-space-related);
}
.ux-persona-path.is-hypothesis {
  border-radius: var(--cvedi-radius);
  background: color-mix(in oklch, var(--section-primary) 8%, var(--color-base-100));
}
.ux-persona-decision h2 {
  margin: 0;
  color: var(--section-primary-deep);
  font: 600 var(--cvedi-type-compact-title)/1.35 var(--theme-font);
}
.ux-persona-path .steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: visible;
  color: var(--theme-body);
}
.ux-persona-path .step { min-width: 0; font: 400 var(--cvedi-type-card-body)/1.35 var(--theme-font); }
.ux-persona-path .step span { max-width: 230px; padding-inline: var(--cvedi-space-copy); }
.ux-persona-path .step::after { font: 600 var(--cvedi-type-card-body)/1 var(--theme-font); }
.ux-persona-decision-notes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--cvedi-space-columns);
  padding-top: var(--cvedi-space-related);
  border-top: 1px solid var(--slide-rule);
}
.ux-persona-decision-notes p { margin: var(--cvedi-space-copy) 0 0; color: var(--theme-body); }
.ux-persona-test-question p { font: 400 var(--cvedi-type-body)/1.4 var(--theme-font); }
.ux-persona-evidence p { font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font); }
@media print {
  .ux-persona-path.is-hypothesis { print-color-adjust: exact; }
}
</style>
