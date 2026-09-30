<script setup lang="ts">
defineProps<{ route: string; viewBox: string }>()
</script>

<template>
  <svg class="cvedi-metro-route" :viewBox="viewBox" aria-hidden="true" focusable="false">
    <path class="metro-track" :d="route" />
    <path class="metro-train" :d="route" pathLength="1" />
    <path class="metro-divider" :d="route" />
  </svg>
</template>
