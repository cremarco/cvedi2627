<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'

const props = defineProps<{ src: string }>()
</script>

<template>
  <figure class="slide-illustration" aria-hidden="true">
    <img :src="publicAsset(props.src)" alt="" decoding="async" />
  </figure>
</template>
