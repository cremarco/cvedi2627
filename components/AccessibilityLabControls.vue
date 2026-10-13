<script setup lang="ts">
import { computed, inject } from 'vue'
import { accessibilityLabTargetKey } from '../composables/accessibility-lab'
const lab = inject(accessibilityLabTargetKey)
const target = computed(() => lab?.value)
</script>

<template>
  <Teleport v-if="target" :to="target"><div class="a11y-lab-control-group"><slot /></div></Teleport>
</template>
