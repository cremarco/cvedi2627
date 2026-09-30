<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
defineProps<{ title: string; illustration?: string }>()
</script>

<template>
  <article class="card cvedi-card" :class="{ 'cvedi-card-illustrated': illustration }">
    <img v-if="illustration" class="card-illustration" :src="publicAsset(illustration)" alt="" aria-hidden="true" />
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <slot />
    </div>
  </article>
</template>
