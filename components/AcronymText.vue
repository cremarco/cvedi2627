<script setup lang="ts">
import { computed } from 'vue'
import { splitAcronyms } from '../utils/acronyms.mjs'
import { splitFontNames } from '../utils/font-previews.mjs'
import SlideAcronym from './SlideAcronym.vue'
import SlideFont from './SlideFont.vue'

const props = defineProps<{ text?: unknown }>()
const parts = computed(() => splitFontNames(props.text).flatMap(part => part.fontId ? [part] : splitAcronyms(part.text)))
</script>

<template>
  <template v-for="(part, index) in parts" :key="index"><SlideFont v-if="part.fontId" :font-id="part.fontId" :label="part.text" /><SlideAcronym v-else-if="part.expansion" :term="part.text" /><template v-else>{{ part.text }}</template></template>
</template>
