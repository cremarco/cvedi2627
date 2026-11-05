<script setup lang="ts">
import sitemap from '../data/ux-booking-sitemap.json'
</script>

<template>
  <figure class="ux-booking-sitemap" :aria-label="sitemap.title">
    <div class="sitemap-tree">
      <div class="sitemap-home">{{ sitemap.home }}</div>
      <ul class="list sitemap-branches" :aria-label="`Sezioni di ${sitemap.home}`">
        <li v-for="section in sitemap.sections" :key="section.id" class="list-row sitemap-branch">
          <h2 class="sitemap-section" :class="{ 'is-booking': section.id === 'ricerca' }">{{ section.title }}</h2>
          <ul class="list sitemap-pages">
            <li v-for="page in section.pages" :key="page" class="list-row sitemap-page">{{ page }}</li>
          </ul>
        </li>
      </ul>
    </div>
    <figcaption class="sitemap-notes">
      <p class="lesson-caption">{{ sitemap.states }}</p>
      <p class="lesson-caption">{{ sitemap.footer }}</p>
    </figcaption>
  </figure>
</template>

<style scoped>
.ux-booking-sitemap {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  gap: var(--cvedi-space-related);
  width: 100%;
  min-height: 0;
  margin: 0;
  user-select: text;
}
.sitemap-tree { --sitemap-line: color-mix(in oklch, var(--section-primary) 65%, transparent); }
.sitemap-home {
  position: relative;
  width: 240px;
  margin: 0 auto 32px;
  padding: 8px 16px;
  border-radius: var(--cvedi-radius);
  background: var(--section-primary);
  color: white;
  text-align: center;
  font: 600 var(--cvedi-type-card-title)/1.35 var(--theme-font);
}
.sitemap-home::after {
  position: absolute;
  top: 100%;
  left: 50%;
  height: 16px;
  border-left: 1.5px solid var(--sitemap-line);
  content: '';
}
ul.sitemap-branches {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--cvedi-space-peers);
  margin: 0;
  padding: 0;
  list-style: none;
}
.sitemap-branches > .sitemap-branch {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border-radius: 0;
}
.sitemap-branch::before {
  position: absolute;
  top: -16px;
  left: 50%;
  width: calc(100% + var(--cvedi-space-peers));
  height: 16px;
  border-top: 1.5px solid var(--sitemap-line);
  border-left: 1.5px solid var(--sitemap-line);
  content: '';
}
.sitemap-branch:last-child::before { width: 0; border-top: 0; }
.sitemap-branch::after, .sitemap-page::after { display: none; }
.sitemap-branch > .sitemap-section {
  margin: 0;
  padding: 8px 10px;
  border-radius: var(--cvedi-radius);
  background: color-mix(in oklch, var(--section-primary) 9%, var(--color-base-100));
  color: var(--section-primary-deep);
  text-align: center;
  font: 600 var(--cvedi-type-card-title)/1.35 var(--theme-font);
}
.sitemap-branch > .is-booking { background: var(--section-accent-soft); color: var(--theme-ink); }
ul.sitemap-pages {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 0 12px;
  padding: 0 0 0 16px;
  border-left: 1.5px solid var(--sitemap-line);
  list-style: none;
}
.sitemap-pages::before {
  position: absolute;
  bottom: 100%;
  left: -1.5px;
  height: 16px;
  border-left: 1.5px solid var(--sitemap-line);
  content: '';
}
.sitemap-pages > .sitemap-page {
  position: relative;
  display: block;
  min-width: 0;
  margin: 0;
  padding: 8px 10px;
  border-radius: var(--cvedi-radius);
  background: color-mix(in oklch, var(--section-primary) 4%, var(--color-base-100));
  color: var(--theme-body);
  font: 400 var(--cvedi-type-card-body)/1.4 var(--theme-font);
}
.sitemap-page::before {
  position: absolute;
  top: 50%;
  right: 100%;
  width: 16px;
  border-top: 1.5px solid var(--sitemap-line);
  content: '';
}
.sitemap-notes { display: grid; gap: 4px; }
.sitemap-notes > p { margin: 0; }
@media print { .sitemap-home, .sitemap-section, .sitemap-page { print-color-adjust: exact; } }
</style>
