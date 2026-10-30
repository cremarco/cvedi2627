<script setup lang="ts">
import { computed } from 'vue'
import LessonFigure from './LessonFigure.vue'
import LessonTable from './LessonTable.vue'
import UxHypothesis from './UxHypothesis.vue'
import UxBookingFlow from './UxBookingFlow.vue'
import UxServiceArchitecture from './UxServiceArchitecture.vue'
import { lessonTables } from '../data/lesson-tables.mjs'
import hypothesis from '../data/ux-hypothesis.json'
import bookingFlow from '../data/ux-booking-flow.json'
import serviceArchitecture from '../data/ux-service-architecture.json'

const props = defineProps<{ src: string; alt: string; caption?: string }>()
const table = computed(() => lessonTables[props.src])
const isHypothesis = computed(() => props.src === hypothesis.source.asset)
const isBookingFlow = computed(() => props.src === bookingFlow.source.asset)
const isServiceArchitecture = computed(() => props.src === serviceArchitecture.source.asset)
</script>

<template>
  <UxHypothesis v-if="isHypothesis" :definition="hypothesis" :caption="caption" />
  <UxBookingFlow v-else-if="isBookingFlow" :caption="caption" />
  <UxServiceArchitecture v-else-if="isServiceArchitecture" :caption="caption" />
  <LessonTable v-else-if="table" :definition="table" :caption="caption" />
  <LessonFigure v-else v-bind="props" />
</template>
