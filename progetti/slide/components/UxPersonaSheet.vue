<script setup lang="ts">
import LessonFigure from './LessonFigure.vue'
import persona from '../data/ux-persona.json'

defineProps<{ portraitSrc: string; portraitAlt: string }>()
</script>

<template>
  <section class="ux-persona-sheet" :aria-label="`Scheda persona di ${persona.name}`">
    <aside class="ux-persona-profile">
      <LessonFigure :src="portraitSrc" :alt="portraitAlt" />
      <div class="ux-persona-identity">
        <h2>{{ persona.name }}</h2>
        <p>{{ persona.profile }}</p>
      </div>
      <blockquote>{{ persona.quote }}</blockquote>
    </aside>
    <div class="ux-persona-content">
      <section class="ux-persona-goal" aria-labelledby="viola-persona-goal">
        <h3 id="viola-persona-goal">Obiettivo</h3>
        <p>{{ persona.goal }}</p>
      </section>
      <dl class="list ux-persona-fields">
        <div v-for="field in persona.fields" :key="field.id" class="list-row ux-persona-field">
          <dt>{{ field.title }}</dt>
          <dd>{{ field.text }}</dd>
        </div>
      </dl>
    </div>
    <p class="ux-persona-question"><strong>Da approfondire</strong><span>{{ persona.openQuestion }}</span></p>
  </section>
</template>

<style scoped>
.ux-persona-sheet {
  display: grid;
  flex: 1 1 0;
  grid-template-columns: 272px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;
  column-gap: var(--cvedi-space-columns);
  row-gap: var(--cvedi-space-peers);
  min-height: 0;
  width: 100%;
  user-select: text;
}
.ux-persona-profile {
  display: flex;
  flex-direction: column;
  gap: var(--cvedi-space-related);
  min-width: 0;
}
.ux-persona-profile :deep(.lesson-figure) {
  flex: 0 0 248px;
  width: 248px;
  height: 248px;
  min-height: 0;
  margin: 0 auto;
}
.ux-persona-profile :deep(.lesson-figure-media) { height: 100%; }
.ux-persona-identity h2 {
  margin: 0 0 var(--cvedi-space-copy);
  color: var(--theme-ink);
  font: 600 32px/1.2 var(--theme-font);
}
.ux-persona-identity p,
.ux-persona-profile blockquote {
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--theme-body);
  font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font);
}
.ux-persona-profile blockquote { color: var(--section-primary-deep); }
.ux-persona-content {
  display: flex;
  flex-direction: column;
  gap: var(--cvedi-space-peers);
  min-width: 0;
}
.ux-persona-goal {
  padding: var(--cvedi-space-peers);
  border-radius: var(--cvedi-radius);
  background: color-mix(in oklch, var(--section-primary) 8%, var(--color-base-100));
}
.ux-persona-goal h3 {
  margin: 0 0 var(--cvedi-space-copy);
  color: var(--section-primary-deep);
  font: 600 var(--cvedi-type-compact-title)/1.3 var(--theme-font);
}
.ux-persona-goal p {
  margin: 0;
  color: var(--theme-ink);
  font: 400 var(--cvedi-type-lead)/1.35 var(--theme-font);
}
dl.ux-persona-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--cvedi-space-columns);
  row-gap: var(--cvedi-space-peers);
  margin: 0;
}
.ux-persona-fields > .ux-persona-field {
  display: flex;
  flex-direction: column;
  gap: var(--cvedi-space-copy);
  min-width: 0;
  padding: var(--cvedi-space-related) 0 0;
  border-top: 1px solid var(--slide-rule);
  border-radius: 0;
}
.ux-persona-field::after { display: none; }
.ux-persona-field dt {
  color: var(--section-primary-deep);
  font: 600 var(--cvedi-type-compact-title)/1.3 var(--theme-font);
}
.ux-persona-field dd {
  margin: 0;
  color: var(--theme-body);
  font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font);
}
.ux-persona-question {
  display: flex;
  grid-column: 1 / -1;
  align-items: baseline;
  gap: var(--cvedi-space-peers);
  margin: 0;
  padding-top: var(--cvedi-space-related);
  border-top: 1px solid var(--slide-rule);
  color: var(--theme-body);
  font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font);
}
.ux-persona-question strong { flex: 0 0 auto; color: var(--section-primary-deep); font-weight: 600; }
@media print {
  .ux-persona-goal { print-color-adjust: exact; }
}
</style>
