<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
defineProps<{ src: string; alt: string; caption?: string }>()
</script>

<template>
  <figure class="lesson-figure">
    <img :src="publicAsset(src)" :alt="alt" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
