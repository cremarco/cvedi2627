<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { publicAsset } from '../utils/public-asset'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  panels?: number
  panelAspectRatio?: string
  verticalRange?: [number, number]
  maxScale?: number
}>(), { panels: 1, panelAspectRatio: '4 / 3', maxScale: Infinity })

const emit = defineEmits<{ sizeChange: [size: { width: number; height: number; emptySpaceY: number }] }>()
const container = ref<HTMLSpanElement>()
const image = ref<HTMLImageElement>()
const imageSize = ref<{ width: string; height: string }>()
// A detail is an explicit viewport on the original screenshot. Its overview
// remains a separate figure; the source bitmap is never resampled or rewritten.
const range = computed(() => {
  const [start, end] = props.verticalRange ?? [0, 1]
  return Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end <= 1 && start < end
    ? [start, end] : [0, 1]
})
const detailStyle = computed(() => {
  const [start, end] = range.value
  const span = end - start
  return span < 1 ? { objectFit: 'cover', objectPosition: `center ${start / (1 - span) * 100}%` } : undefined
})
let observer: ResizeObserver | undefined
let resizeFrame: number | undefined

function scheduleImageSize() {
  if (resizeFrame !== undefined) return
  // Updating the caption can resize the observed image slot. Measure on the
  // next frame so this feedback does not mutate layout inside ResizeObserver.
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = undefined
    syncImageSize()
  })
}

function syncImageSize() {
  const frame = container.value
  if (!frame || !frame.clientWidth || !frame.clientHeight) return
  if (props.panels > 1) {
    const gap = parseFloat(getComputedStyle(frame).columnGap) || 0
    const [ratioWidth, ratioHeight = 1] = props.panelAspectRatio.split('/').map(Number)
    const ratio = ratioWidth > 0 && ratioHeight > 0 && Number.isFinite(ratioWidth / ratioHeight)
      ? ratioWidth / ratioHeight
      : 4 / 3
    const totalGap = gap * (props.panels - 1)
    const width = Math.min(
      Math.max(0, frame.clientWidth - totalGap) / props.panels,
      frame.clientHeight * ratio,
    )
    const height = width / ratio
    // Fit both axes; only the occupied width belongs to the caption.
    imageSize.value = { width: `${width}px`, height: `${height}px` }
    emit('sizeChange', { width: width * props.panels + totalGap, height, emptySpaceY: Math.max(0, frame.clientHeight - height) })
    return
  }

  const element = image.value
  if (!element?.naturalWidth || !element.naturalHeight) return
  const scale = Math.min(
    props.maxScale > 0 ? props.maxScale : Infinity,
    frame.clientWidth / element.naturalWidth,
    frame.clientHeight / (element.naturalHeight * (range.value[1] - range.value[0])),
  )
  const width = element.naturalWidth * scale
  const height = element.naturalHeight * (range.value[1] - range.value[0]) * scale
  // Single figures retain the original ratio without an added frame.
  imageSize.value = { width: `${width}px`, height: `${height}px` }
  emit('sizeChange', { width, height, emptySpaceY: Math.max(0, frame.clientHeight - height) })
}

onMounted(() => {
  observer = new ResizeObserver(scheduleImageSize)
  if (container.value) observer.observe(container.value)
  syncImageSize()
})
onBeforeUnmount(() => {
  observer?.disconnect()
  if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame)
})
watch(() => [props.src, props.panels, props.panelAspectRatio, props.maxScale, ...range.value], syncImageSize, { flush: 'post' })
</script>

<template>
  <span
    ref="container"
    :class="panels > 1 ? 'lesson-figure-panels' : 'lesson-image-content'"
    :style="{ '--figure-panels': panels, '--figure-panel-ratio': panelAspectRatio }"
  >
    <template v-if="panels > 1">
      <img
        v-for="panel in panels"
        :key="panel"
        :src="publicAsset(src)"
        :alt="panel === 1 ? alt : ''"
        :aria-hidden="panel > 1 ? true : undefined"
        :style="{ ...imageSize, objectPosition: `center ${(panel - 1) / (panels - 1) * 100}%` }"
        @load="syncImageSize"
      />
    </template>
    <img v-else ref="image" :src="publicAsset(src)" :alt="alt" :style="{ ...imageSize, ...detailStyle }" @load="syncImageSize" />
  </span>
</template>
