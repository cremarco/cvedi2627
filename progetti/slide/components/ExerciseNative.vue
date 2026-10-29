<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { useSlideSet } from '../composables/use-slide-set'
import { examples } from '../data/esercitazioni/framework-curriculum.mjs'
import { nativeExamples, renderNativeDocument } from '../data/esercitazioni/native-examples.mjs'
import baseCSS from '../assets/esercitazioni/tailwind-daisyui/render.css?raw'
import customCSS from '../assets/esercitazioni/tailwind-daisyui/custom.css?raw'
import tokens from '../../../risorse-condivise/stili/tokens.css?raw'

const props = defineProps<{ example: string; caption?: string }>()
const { isActive, isPrinting, canAnimate } = useSlidePlayback()
const { set } = useSlideSet()
const frame = ref<HTMLIFrameElement>()
const figure = ref<HTMLElement>()
const height = ref(396)
function receive(event: MessageEvent) {
  if (event.source !== frame.value?.contentWindow) return
  if (event.data?.type === 'cvedi-native-height' && Number.isFinite(event.data.height)) height.value = Math.max(60, Math.min(396, event.data.height))
  if (event.data?.type === 'cvedi-native-escape') figure.value?.focus({ preventScroll: true })
}
function syncMotion() {
  frame.value?.contentWindow?.postMessage({ type: 'cvedi-native-motion', paused: !canAnimate.value }, '*')
}
watch(canAnimate, syncMotion, { flush: 'post' })
onMounted(() => window.addEventListener('message', receive))
onBeforeUnmount(() => window.removeEventListener('message', receive))
const framework = computed(() => props.example.startsWith('framework:'))
const entry = computed(() => framework.value ? examples[props.example.slice(10)] : nativeExamples[props.example])
const interactive = computed(() => /<(?:a|button|input|select|textarea|summary)\b/.test(entry.value?.html || ''))
const document = computed(() => {
  if (!entry.value) throw new Error(`Esempio nativo sconosciuto: ${props.example}`)
  const palette = set.value.palette
  const theme = framework.value ? '' : tokens + `:root,[data-theme=light]{--color-primary:var(--cvedi-${palette}-base);--color-primary-content:#fff;--color-base-200:var(--cvedi-${palette}-surface);--color-base-300:var(--cvedi-${palette}-light);--color-base-content:var(--cvedi-body);--color-accent:var(--cvedi-${palette}-accent-light);--color-accent-content:var(--cvedi-gray-950);}`
  return renderNativeDocument(entry.value, baseCSS, customCSS, theme)
})
</script>

<template>
  <figure ref="figure" class="exercise-native" tabindex="-1" :data-native-example="example">
    <iframe v-if="isActive || isPrinting" ref="frame" :title="caption || entry.caption || 'Esempio HTML nativo'" :srcdoc="document" sandbox="allow-scripts allow-forms" class="exercise-native-frame" :style="{ height: `${height}px` }" @load="syncMotion" />
    <div v-else class="exercise-native-placeholder" aria-hidden="true" />
    <figcaption v-if="caption !== '' && (caption || entry.caption || interactive)">{{ caption || entry.caption }}<span v-if="interactive" class="exercise-native-hint"> · <kbd class="kbd kbd-sm">Esc</kbd> torna alla slide</span></figcaption>
  </figure>
</template>
