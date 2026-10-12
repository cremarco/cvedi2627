<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { accessibilityDemo, type AccessibilityDemoId } from '../data/accessibility-demos'
import AccessibilityScenario from './AccessibilityScenario.vue'

const props = defineProps<{ exampleId: AccessibilityDemoId }>()
const demo = computed(() => accessibilityDemo(props.exampleId))
const resetKey = ref(0)
const { isActive, canAnimate, prefersReducedMotion, isVisible, isPrinting } = useSlidePlayback()
const playbackEnabled = computed(() => isActive.value && isVisible.value && !isPrinting.value)
const badScenario = ref<InstanceType<typeof AccessibilityScenario>>()
const goodScenario = ref<InstanceType<typeof AccessibilityScenario>>()
</script>

<template>
  <div class="a11y-demo" :data-example="exampleId" @keydown.stop>
    <div class="a11y-demo-toolbar">
      <p>{{ demo.instructions }}</p>
      <button type="button" class="btn btn-outline a11y-reset" @click="resetKey++">Reimposta gli scenari</button>
    </div>
    <div class="a11y-demo-comparison">
      <AccessibilityScenario :key="`${exampleId}-bad-${resetKey}`" ref="badScenario" :example-id="exampleId" :good="false" :active="playbackEnabled" :motion-allowed="canAnimate" :reduced-motion="prefersReducedMotion" @play="goodScenario?.stopMedia()" />
      <AccessibilityScenario :key="`${exampleId}-good-${resetKey}`" ref="goodScenario" :example-id="exampleId" :good="true" :active="playbackEnabled" :motion-allowed="canAnimate" :reduced-motion="prefersReducedMotion" @play="badScenario?.stopMedia()" />
    </div>
    <p class="a11y-demo-verification">{{ demo.verify }}</p>
  </div>
</template>

<style src="../styles/accessibility-demos.css"></style>
