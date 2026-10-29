<script setup lang="ts">
import { computed } from 'vue'
import { highlightExerciseCode } from '../utils/exercise-code.mjs'
const props = defineProps<{ text: string; opening: string; closing: string; labels: string[] }>()
const columns = computed(() => `${props.opening.length}ch ${props.text.length - props.opening.length - props.closing.length}ch ${props.closing.length}ch`)
</script>

<template>
  <div class="exercise-annotated-code" :style="{ '--annotation-columns': columns }">
    <div class="mockup-code exercise-code"><pre><code data-language="html" v-html="highlightExerciseCode(text)" /></pre></div>
    <div class="exercise-code-labels"><span>{{ labels[0] }}</span><span>{{ labels[1] }}</span></div>
  </div>
</template>
