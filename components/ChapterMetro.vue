<script setup lang="ts">
import { computed } from 'vue'
import MetroTrack from './MetroTrack.vue'

const props = defineProps<{ section: 'course' | 'exam' | 'archive' }>()

// Routes follow the actual Inter title footprints on the 1280 × 720 canvas.
// The short course title turns early; the exam title has a longer upper run;
// the archive route rises beside the title from below its subtitle.
const routes = {
  course: 'M -24 224 H384 Q396 224 404 232 L514 342 Q522 350 534 350 H896 Q908 350 916 342 L972 286 Q980 278 992 278 H1304',
  exam: 'M -24 224 H838 Q850 224 858 232 L918 292 Q926 300 926 312 V420 Q926 432 934 440 L994 500 Q1002 508 1014 508 H1304',
  archive: 'M -24 464 H744 Q756 464 764 456 L956 264 Q964 256 976 256 H1096 Q1108 256 1116 248 L1204 160 Q1212 152 1224 152 H1304',
}
const route = computed(() => routes[props.section])
</script>

<template>
  <MetroTrack class="chapter-metro-route" :route="route" view-box="0 0 1280 720" />
</template>
