<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ src: string }>()
const subject = computed(() => /concept/.test(props.src) ? 'concept' : /site/.test(props.src) ? 'site' : 'future')
</script>

<template>
  <figure class="nextme-illustration reference-illustration" aria-hidden="true">
    <svg viewBox="0 0 320 320" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <template v-if="subject === 'concept'">
        <rect x="65" y="40" width="190" height="240" rx="14" fill="white" />
        <path d="M100 90h120M100 120h80M100 210h120M100 240h90" />
        <rect x="100" y="152" width="48" height="30" rx="5" class="reference-icon-accent" />
        <path d="M174 167h46" />
      </template>
      <template v-else-if="subject === 'site'">
        <rect x="30" y="55" width="260" height="185" rx="16" fill="white" />
        <path d="M30 95h260M140 240v30M180 240v30M110 270h100M65 75h2M82 75h2" />
        <rect x="65" y="125" width="72" height="80" rx="6" class="reference-icon-accent" />
        <path d="M160 132h95M160 160h70M160 188h80" />
      </template>
      <template v-else>
        <rect x="40" y="65" width="240" height="190" rx="16" fill="white" />
        <path d="M40 110h240M90 45v40M230 45v40M80 145h35M145 145h35M210 145h30M80 185h35M210 185h30M80 220h35" />
        <rect x="140" y="177" width="47" height="47" rx="7" class="reference-icon-accent" />
      </template>
    </svg>
  </figure>
</template>
