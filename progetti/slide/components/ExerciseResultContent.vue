<script setup lang="ts">
import { publicAsset } from '../utils/public-asset'
export interface ExampleResult { tag: 'u' | 'em' | 'strong' | 'ul' | 'ol' | 'img' | 'a' | 'div'; text?: string; items?: string[]; src?: string; alt?: string; href?: string }
defineProps<{ result: ExampleResult }>()
</script>

<template>
  <img v-if="result.tag === 'img'" class="exercise-tag-image" :src="publicAsset(result.src!)" :alt="result.alt" />
  <a v-else-if="result.tag === 'a'" class="link" :href="publicAsset(result.href!)" target="_blank" rel="noopener noreferrer">{{ result.text }}<span class="sr-only"> (si apre in una nuova scheda)</span></a>
  <component :is="result.tag" v-else><template v-if="result.items"><li v-for="text in result.items" :key="text">{{ text }}</li></template><template v-else>{{ result.text }}</template></component>
</template>
