<script setup lang="ts">
import { heroicons, type HeroIconName } from '../data/heroicons'

defineProps<{ name: HeroIconName; outlineClass?: string }>()
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path v-if="outlineClass" :class="outlineClass" :d="heroicons[name]" />
    <path :d="heroicons[name]" />
  </svg>
</template>
