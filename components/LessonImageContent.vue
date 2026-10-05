<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { publicAsset } from '../utils/public-asset'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  panels?: number
  panelAspectRatio?: string
}>(), { panels: 1, panelAspectRatio: '4 / 3' })

const emit = defineEmits<{ sizeChange: [size: { width: number; height: number }] }>()
const container = ref<HTMLSpanElement>()
const image = ref<HTMLImageElement>()
const imageSize = ref<{ width: string; height: string }>()
let observer: ResizeObserver | undefined

function syncImageSize() {
  const frame = container.value
  if (!frame || !frame.clientWidth || !frame.clientHeight) return
  if (props.panels > 1) {
    emit('sizeChange', { width: frame.clientWidth, height: frame.clientHeight })
    return
  }

  const element = image.value
  if (!element?.naturalWidth || !element.naturalHeight) return
  const style = getComputedStyle(element)
  const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
  const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  const scale = Math.min(
    Math.max(0, frame.clientWidth - borderX) / element.naturalWidth,
    Math.max(0, frame.clientHeight - borderY) / element.naturalHeight,
  )
  const width = element.naturalWidth * scale
  const height = element.naturalHeight * scale
  // The image keeps its native ratio; the border sits outside its actual pixels.
  imageSize.value = { width: `${width}px`, height: `${height}px` }
  emit('sizeChange', { width: width + borderX, height: height + borderY })
}

onMounted(() => {
  observer = new ResizeObserver(syncImageSize)
  if (container.value) observer.observe(container.value)
  syncImageSize()
})
onBeforeUnmount(() => observer?.disconnect())
watch(() => [props.panels, props.panelAspectRatio], syncImageSize, { flush: 'post' })
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
        :style="{ objectPosition: `center ${(panel - 1) / (panels - 1) * 100}%` }"
        @load="syncImageSize"
      />
    </template>
    <img v-else ref="image" :src="publicAsset(src)" :alt="alt" :style="imageSize" @load="syncImageSize" />
  </span>
</template>
