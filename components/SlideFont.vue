<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import fontPreviews from '../data/font-previews.json'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import { useSlideSet } from '../composables/use-slide-set'
import { claimAcronymTooltip, releaseAcronymTooltip } from '../utils/acronym-tooltip'
import { publicAsset } from '../utils/public-asset'

type FontPreview = {
  name: string
  sample: { src: string; alt: string; kind: 'word' | 'document'; caption?: string }
}

const props = defineProps<{ fontId: string; label: string }>()
const catalog = fontPreviews as Record<string, FontPreview>
const font = computed(() => catalog[props.fontId])
const trigger = ref<HTMLElement>()
const popup = ref<HTMLElement>()
const open = ref(false)
const insideControl = ref(false)
const position = ref({ left: '12px', top: '12px', visibility: 'hidden' as 'hidden' | 'visible' })
const tooltipId = `font-preview-${useId()}`
const { isActive, isPrinting } = useSlidePlayback()
const { setStyle } = useSlideSet()
const portal = ref<HTMLElement | string>('body')
let closeTimer: ReturnType<typeof setTimeout> | undefined
let control: HTMLElement | null = null
let dialog: HTMLDialogElement | null = null
let triggerHovered = false
let popupHovered = false
let pointer: { x: number; y: number } | undefined

function cancelClose() { clearTimeout(closeTimer) }
function hide() {
  cancelClose()
  open.value = false
  triggerHovered = false
  popupHovered = false
  releaseAcronymTooltip(hide)
}
function hasFocus() {
  return document.activeElement === trigger.value || Boolean(control?.contains(document.activeElement))
}
function scheduleClose() {
  cancelClose()
  closeTimer = setTimeout(() => {
    if (!triggerHovered && !popupHovered && !hasFocus()) hide()
  }, 150)
}
function anchorRect() {
  const rects = Array.from(trigger.value?.getClientRects() ?? [])
  return (pointer && rects.find(rect => pointer!.x >= rect.left && pointer!.x <= rect.right
    && pointer!.y >= rect.top && pointer!.y <= rect.bottom)) || rects[0]
}
function positionPopup() {
  if (!open.value || !popup.value) return
  const anchor = anchorRect()
  if (!anchor) return hide()
  const rect = popup.value.getBoundingClientRect()
  const margin = 12
  const availableAbove = anchor.top - margin
  const availableBelow = innerHeight - anchor.bottom - margin
  // Prefer the space above so the preview leaves the following lines available.
  const below = availableAbove < rect.height && (availableBelow >= rect.height || availableBelow > availableAbove)
  const left = Math.max(margin, Math.min(innerWidth - rect.width - margin, anchor.left + anchor.width / 2 - rect.width / 2))
  const top = Math.max(margin, Math.min(innerHeight - rect.height - margin, below ? anchor.bottom : anchor.top - rect.height))
  position.value = { left: `${left}px`, top: `${top}px`, visibility: 'visible' }
}
async function show(event?: Event) {
  cancelClose()
  if (!trigger.value || !font.value || isPrinting.value) return
  if (event instanceof MouseEvent && event.type === 'mouseenter') {
    triggerHovered = true
    pointer = { x: event.clientX, y: event.clientY }
  }
  else if (event?.type === 'focus') pointer = undefined
  const rect = trigger.value.getBoundingClientRect()
  if (!rect.width || !rect.height) return
  claimAcronymTooltip(hide)
  if (!open.value) position.value.visibility = 'hidden'
  open.value = true
  await nextTick()
  positionPopup()
}
function leaveTrigger() {
  triggerHovered = false
  scheduleClose()
}
function enterPopup() { popupHovered = true; cancelClose() }
function leavePopup() { popupHovered = false; scheduleClose() }
function activate(event: MouseEvent) {
  // A font name inside a real control keeps that control's native action.
  if (!insideControl.value) {
    event.preventDefault()
    event.stopPropagation()
  }
  show(event)
}
function keyActivate(event: KeyboardEvent) {
  if (insideControl.value || !['Enter', ' '].includes(event.key)) return
  event.preventDefault()
  event.stopPropagation()
  show(event)
}
function dismiss(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    event.stopPropagation()
    hide()
  }
}
function outside(event: PointerEvent) {
  const target = event.target as Node
  if (!trigger.value?.contains(target) && !popup.value?.contains(target)) hide()
}
function scroll(event: Event) {
  // The small-screen panel may scroll without dismissing itself.
  if (!(event.target instanceof Node) || !popup.value?.contains(event.target)) hide()
}
function bindDismissal(bind: boolean) {
  const method = bind ? 'addEventListener' : 'removeEventListener'
  window[method]('keydown', dismiss, true)
  window[method]('resize', hide)
  window[method]('scroll', scroll, true)
  window[method]('beforeprint', hide)
  window[method]('pointerdown', outside)
}
watch(open, bindDismissal)
watch(isActive, active => { if (!active) hide() })
watch(isPrinting, printing => { if (printing) hide() })
watch(() => props.fontId, hide)
onMounted(() => {
  control = trigger.value?.parentElement?.closest<HTMLElement>('a, button, [role="button"]') ?? null
  insideControl.value = Boolean(control)
  control?.addEventListener('focus', show)
  control?.addEventListener('blur', scheduleClose)
  dialog = trigger.value?.closest('dialog') ?? null
  if (dialog) portal.value = dialog
  dialog?.addEventListener('close', hide)
})
onBeforeUnmount(() => {
  hide()
  control?.removeEventListener('focus', show)
  control?.removeEventListener('blur', scheduleClose)
  dialog?.removeEventListener('close', hide)
  bindDismissal(false)
})
</script>

<template>
  <span v-if="font" ref="trigger" class="slide-font-trigger" :class="{ 'slide-font-print': isPrinting }"
    :data-font-id="fontId" :role="insideControl ? undefined : 'button'"
    :tabindex="insideControl || isPrinting ? undefined : 0"
    :aria-label="insideControl ? undefined : `${label}: mostra un campione del carattere`"
    :aria-describedby="open ? tooltipId : undefined"
    @mouseenter="show" @mouseleave="leaveTrigger" @focus="show" @blur="scheduleClose"
    @click="activate" @keydown="keyActivate">{{ label }}</span>
  <span v-else>{{ label }}</span>
  <Teleport :to="portal">
    <span v-if="open && font && !isPrinting" ref="popup" class="tooltip tooltip-open slide-font-tooltip"
      :style="[setStyle, position]" @mouseenter="enterPopup" @mouseleave="leavePopup">
      <span :id="tooltipId" class="tooltip-content" role="tooltip">
        <span class="slide-font-name">{{ font.name }}</span>
        <img class="slide-font-sample" :class="`slide-font-sample--${font.sample.kind}`"
          :src="publicAsset(font.sample.src)" :alt="font.sample.alt" @load="positionPopup">
        <span v-if="font.sample.caption" class="slide-font-caption">{{ font.sample.caption }}</span>
      </span>
    </span>
  </Teleport>
</template>
