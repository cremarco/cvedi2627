<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
defineProps<{ title: string; illustration?: string; illustrationVariant?: 'roomy' | 'compact' }>()
</script>

<template>
  <article class="card cvedi-card" :class="{ 'cvedi-card-illustrated': illustration, 'cvedi-card-roomy': illustration && illustrationVariant === 'roomy', 'cvedi-card-compact': illustration && illustrationVariant === 'compact' }">
    <div class="card-body">
      <div class="card-heading">
        <h2 class="card-title">{{ title }}</h2>
        <img v-if="illustration" class="card-illustration" :src="publicAsset(illustration)" alt="" aria-hidden="true" />
      </div>
      <slot />
    </div>
  </article>
</template>
