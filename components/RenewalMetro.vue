<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
</script>

<template>
  <div class="renewal-materials" aria-label="Materiali del corso 2026/27">
    <span class="renewal-materials-year">26/27</span>
    <img :src="publicAsset('/images/generated/renewal/materiali-v1.png')" alt="" class="renewal-materials-graphic" aria-hidden="true" />
    <span class="renewal-materials-caption">Slide <span aria-hidden="true">·</span> Bibliografia</span>
  </div>
</template>
