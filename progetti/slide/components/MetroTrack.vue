<script setup lang="ts">
import { useId } from 'vue'

withDefaults(defineProps<{
  route: string
  viewBox: string
  reveal?: boolean
  journeyProgress?: number
}>(), { reveal: false })

const maskId = `metro-route-${useId()}`
</script>

<template>
  <svg class="cvedi-metro-route" :viewBox="viewBox" aria-hidden="true" focusable="false">
    <defs v-if="reveal">
      <mask :id="maskId" maskUnits="userSpaceOnUse" x="-32" y="-32" width="1344" height="784" style="mask-type: luminance">
        <path class="metro-route-reveal" :d="route" pathLength="1" stroke="white" />
      </mask>
    </defs>
    <g :mask="reveal ? `url(#${maskId})` : undefined">
      <path class="metro-track" :d="route" />
      <path v-if="!reveal" class="metro-train" :d="route" pathLength="1" />
      <path class="metro-divider" :d="route" />
    </g>
    <path v-if="journeyProgress !== undefined" class="metro-train metro-cover-train" :d="route" pathLength="1"
      :style="{ '--metro-stop-offset': .06 - (journeyProgress ?? 1) }" />
  </svg>
</template>
