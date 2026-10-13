<script setup lang="ts">
import { computed } from 'vue'
import { splitAcronyms } from '../utils/acronyms.mjs'
import SlideAcronym from './SlideAcronym.vue'

const props = defineProps<{ text?: unknown }>()
const parts = computed(() => splitAcronyms(props.text))
</script>

<template>
  <template v-for="(part, index) in parts" :key="index"><SlideAcronym v-if="part.expansion" :term="part.text" /><template v-else>{{ part.text }}</template></template>
</template>
