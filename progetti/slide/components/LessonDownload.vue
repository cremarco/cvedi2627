<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'

defineProps<{ src: string }>()
</script>

<template>
  <a class="link" :href="publicAsset(src)" download><slot /></a>
</template>
