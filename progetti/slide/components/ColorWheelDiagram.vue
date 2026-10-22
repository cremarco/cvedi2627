<script setup lang="ts">
import { colorWheels, type ColorWheelVariant } from '../data/color-wheels'

defineProps<{ variant: ColorWheelVariant; playing: boolean }>()
</script>

<template>
  <span class="color-wheel-diagram" :class="{ 'is-playing': playing }" :data-color-wheel="variant" v-html="colorWheels[variant]" />
</template>
