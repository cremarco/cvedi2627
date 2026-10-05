<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
defineProps<{ title: string; illustration?: string; illustrationVariant?: 'roomy' | 'compact' }>()
</script>

<template>
  <article class="card cvedi-card" :class="{ 'cvedi-card-illustrated': illustration, 'cvedi-card-roomy': illustration && illustrationVariant === 'roomy', 'cvedi-card-compact': illustration && illustrationVariant === 'compact' }">
    <div class="card-body">
      <div class="card-heading">
        <h2 class="card-title">{{ title }}</h2>
      </div>
      <slot />
      <div v-if="illustration" class="card-decoration" aria-hidden="true">
        <img class="card-illustration" :src="publicAsset(illustration)" alt="" />
      </div>
    </div>
  </article>
</template>
