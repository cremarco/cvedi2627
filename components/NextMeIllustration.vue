<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'

defineProps<{ src: string }>()
</script>

<template>
  <figure class="nextme-illustration" aria-hidden="true">
    <img :src="publicAsset(src)" alt="" />
  </figure>
</template>
