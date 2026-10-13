<script setup lang="ts">
import { serviceImages } from '../data/accessibility-services'
import { publicAsset } from '../utils/public-asset'
defineProps<{ kind: keyof typeof serviceImages; compact?: boolean }>()
</script>

<template>
  <figure class="a11y-service-media" :class="{ 'is-compact': compact }"><img :src="publicAsset(serviceImages[kind].src)" :alt="serviceImages[kind].alt" :width="serviceImages[kind].width" :height="serviceImages[kind].height" /></figure>
</template>

<style scoped>
.a11y-service-media { margin:0; min-width:0; width:100%; height:116px; overflow:hidden; }
.a11y-service-media.is-compact { height:84px; }
.a11y-service-media img { display:block; width:100%; height:100%; object-fit:cover; border:0; border-radius:0; box-shadow:none; }
</style>
