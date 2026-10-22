<script setup lang="ts">
import AcronymText from './AcronymText.vue'
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { accessibilityDemo, type AccessibilityDemoId } from '../data/accessibility-demos'
import AccessibilityScenario from './AccessibilityScenario.vue'
import HeroIcon from './HeroIcon.vue'

const props = defineProps<{ exampleId: AccessibilityDemoId }>()
const demo = computed(() => accessibilityDemo(props.exampleId))
const resetKey = ref(0)
const { isActive, canAnimate, prefersReducedMotion, isVisible, isPrinting } = useSlidePlayback()
const playbackEnabled = computed(() => isActive.value && isVisible.value && !isPrinting.value)
const badScenario = ref<InstanceType<typeof AccessibilityScenario>>()
const goodScenario = ref<InstanceType<typeof AccessibilityScenario>>()
const verificationOpen = ref(false)
const help = ref<HTMLElement>()
const helpButton = ref<HTMLButtonElement>()
const helpId = `a11y-help-${useId()}`
function resetScenarios() { resetKey.value++; verificationOpen.value = false }
function closeHelp(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !verificationOpen.value) return
  verificationOpen.value = false; helpButton.value?.focus(); event.stopPropagation()
}
function outsideHelp(event: PointerEvent) {
  if (verificationOpen.value && !help.value?.contains(event.target as Node)) verificationOpen.value = false
}
onMounted(() => document.addEventListener('pointerdown', outsideHelp))
onBeforeUnmount(() => document.removeEventListener('pointerdown', outsideHelp))
</script>

<template>
  <div class="a11y-demo" :data-example="exampleId" @keydown.stop="closeHelp">
    <div class="a11y-demo-toolbar">
      <div class="a11y-lab-tools">
        <div ref="help" class="dropdown dropdown-top dropdown-end a11y-demo-verification" :class="{ 'dropdown-open': verificationOpen }">
          <div class="tooltip tooltip-top tooltip-end" data-tip="Come verificare questo esempio">
            <button ref="helpButton" type="button" class="btn btn-ghost btn-square" aria-label="Come verificare questo esempio" :aria-expanded="verificationOpen" :aria-controls="helpId" @click="verificationOpen = !verificationOpen"><HeroIcon name="question-mark-circle" /></button>
          </div>
          <div v-if="verificationOpen" :id="helpId" class="dropdown-content a11y-verification-panel" role="note">
            <h2>Come verificare</h2><p><AcronymText :text="demo.liveVerify" /></p>
          </div>
        </div>
        <div class="tooltip tooltip-top tooltip-end" data-tip="Reimposta gli scenari"><button type="button" class="btn btn-ghost btn-square a11y-reset" aria-label="Reimposta gli scenari" @click="resetScenarios"><HeroIcon name="arrow-path" /></button></div>
      </div>
    </div>
    <div class="a11y-demo-comparison">
      <AccessibilityScenario :key="`${exampleId}-bad-${resetKey}`" ref="badScenario" :example-id="exampleId" :good="false" :active="playbackEnabled" :motion-allowed="canAnimate" :reduced-motion="prefersReducedMotion" @play="goodScenario?.stopMedia()" />
      <AccessibilityScenario :key="`${exampleId}-good-${resetKey}`" ref="goodScenario" :example-id="exampleId" :good="true" :active="playbackEnabled" :motion-allowed="canAnimate" :reduced-motion="prefersReducedMotion" @play="badScenario?.stopMedia()" />
    </div>
  </div>
</template>

<style src="../styles/accessibility-demos.css"></style>
