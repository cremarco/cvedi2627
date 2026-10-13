<script setup lang="ts">
import AcronymText from './AcronymText.vue'
import { computed, provide, ref, useId } from 'vue'
import { accessibilityDemo, type AccessibilityDemoId } from '../data/accessibility-demos'
import AccessibilityPerceptionExamples from './AccessibilityPerceptionExamples.vue'
import AccessibilityActionExamples from './AccessibilityActionExamples.vue'
import AccessibilityUnderstandingExamples from './AccessibilityUnderstandingExamples.vue'
import AccessibilityProcessExamples from './AccessibilityProcessExamples.vue'
import { accessibilityLabTargetKey } from '../composables/accessibility-lab'
import { useSlidePlayback } from '../composables/useSlidePlayback'

const props = defineProps<{ exampleId: AccessibilityDemoId; good: boolean; active: boolean; motionAllowed: boolean; reducedMotion: boolean }>()
const emit = defineEmits<{ play: [] }>()
const headingId = `a11y-scenario-${useId()}`
const demo = computed(() => accessibilityDemo(props.exampleId))
const insight = ref('')
const labTarget = ref<HTMLElement>()
const { isPrinting } = useSlidePlayback()
provide(accessibilityLabTargetKey, labTarget)
const process = ref<InstanceType<typeof AccessibilityProcessExamples>>()
const perceptionIds = ['contrasto-testo', 'contrasto-controlli', 'adattamento', 'immagini']
const actionIds = ['tastiera', 'puntamento', 'semantica', 'autenticazione']
const understandingIds = ['cognitiva', 'moduli', 'personalizzazione', 'lingua']
defineExpose({ stopMedia: () => process.value?.stopMedia() })
</script>

<template>
  <section class="a11y-scenario" :class="good ? 'is-good' : 'is-bad'" :data-variant="good ? 'good' : 'bad'" :aria-labelledby="headingId">
    <div class="a11y-scenario-heading">
      <h2 :id="headingId">{{ good ? 'Scenario funzionante' : 'Scenario errato' }}</h2>
    </div>
    <div class="a11y-ui" :data-task="exampleId">
      <div class="a11y-app">
      <AccessibilityPerceptionExamples v-if="perceptionIds.includes(exampleId)" v-bind="props" @insight="insight = $event" />
      <AccessibilityActionExamples v-else-if="actionIds.includes(exampleId)" v-bind="props" @insight="insight = $event" />
      <AccessibilityUnderstandingExamples v-else-if="understandingIds.includes(exampleId)" v-bind="props" @insight="insight = $event" />
      <AccessibilityProcessExamples v-else ref="process" v-bind="props" @insight="insight = $event" @play="emit('play')" />
      </div>
    </div>
    <div class="a11y-scenario-lab" role="group" :aria-label="`Istruzioni e prova: ${good ? 'scenario funzionante' : 'scenario errato'}`">
      <div ref="labTarget" class="a11y-scenario-tools"></div>
      <div class="a11y-scenario-caption">
        <p class="a11y-scenario-summary"><AcronymText :text="demo.variantLabels[good ? 'good' : 'bad']" /></p>
        <p class="a11y-scenario-insight" role="note"><AcronymText :text="isPrinting ? demo.startHints[good ? 'good' : 'bad'] : insight || demo.startHints[good ? 'good' : 'bad']" /></p>
      </div>
    </div>
  </section>
</template>
