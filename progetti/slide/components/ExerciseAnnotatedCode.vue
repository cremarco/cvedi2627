<script setup lang="ts">
import { computed } from 'vue'
import { highlightExerciseCode } from '../utils/exercise-code.mjs'
const props = defineProps<{ text: string; opening?: string; closing?: string; labels?: string[]; segments?: { text: string; label?: string }[] }>()
const segments = computed(() => props.segments ?? [
  { text: props.opening!, label: props.labels?.[0] },
  { text: props.text.slice(props.opening!.length, -props.closing!.length) },
  { text: props.closing!, label: props.labels?.[1] },
])
const columns = computed(() => segments.value.map(segment => `${segment.text.length}ch`).join(' '))
</script>

<template>
  <div class="exercise-annotated-code" :class="{ 'exercise-annotated-code--segments': props.segments }" :style="{ '--annotation-columns': columns }">
    <div class="mockup-code exercise-code"><pre><code :data-language="props.segments ? 'css' : 'html'" v-html="highlightExerciseCode(text)" /></pre></div>
    <div class="exercise-code-labels">
      <template v-for="(segment, index) in segments" :key="index">
        <span v-if="segment.label" :style="{ gridColumn: index + 1 }">{{ segment.label }}</span>
      </template>
    </div>
  </div>
</template>
