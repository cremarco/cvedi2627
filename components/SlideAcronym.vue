<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'
import { glossary } from '../utils/acronyms.mjs'
import { claimAcronymTooltip, releaseAcronymTooltip } from '../utils/acronym-tooltip'

const props = defineProps<{ term: string }>()
const expansion = computed(() => glossary[props.term])
const trigger = ref<HTMLElement>()
const popup = ref<HTMLElement>()
const open = ref(false)
const insideControl = ref(false)
const below = ref(false)
const position = ref({ left: '0px', top: '0px' })
const tooltipId = `acronym-${useId()}`
const isActive = useIsSlideActive()
const portal = ref<HTMLElement | string>('body')
let closeTimer: ReturnType<typeof setTimeout> | undefined
let control: HTMLElement | null = null
let dialog: HTMLDialogElement | null = null

function cancelClose() { clearTimeout(closeTimer) }
function hide() { cancelClose(); open.value = false; releaseAcronymTooltip(hide) }
function scheduleClose() {
  cancelClose()
  if (document.activeElement !== trigger.value && document.activeElement !== control) closeTimer = setTimeout(hide, 120)
}
async function show() {
  cancelClose()
  if (!trigger.value || !expansion.value) return
  const rect = trigger.value.getBoundingClientRect()
  if (!rect.width || !rect.height) return
  claimAcronymTooltip(hide)
  below.value = rect.top < 100
  position.value = { left: `${rect.left + rect.width / 2}px`, top: `${below.value ? rect.bottom : rect.top}px` }
  open.value = true
  await nextTick()
  if (!popup.value || !open.value) return
  const halfWidth = popup.value.getBoundingClientRect().width / 2
  const center = Math.max(halfWidth + 12, Math.min(innerWidth - halfWidth - 12, rect.left + rect.width / 2))
  below.value = rect.top < popup.value.getBoundingClientRect().height + 12
  position.value = { left: `${center}px`, top: `${below.value ? rect.bottom : rect.top}px` }
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
function bindDismissal(bind: boolean) {
  const method = bind ? 'addEventListener' : 'removeEventListener'
  window[method]('keydown', dismiss, true)
  window[method]('resize', hide)
  window[method]('scroll', hide, true)
  window[method]('beforeprint', hide)
  window[method]('pointerdown', outside)
}
watch(open, bindDismissal)
watch(isActive, active => { if (!active) hide() })
onMounted(() => {
  control = trigger.value?.closest<HTMLElement>('a, button, [role="button"]') ?? null
  insideControl.value = Boolean(control)
  control?.addEventListener('focus', show)
  control?.addEventListener('blur', hide)
  dialog = trigger.value?.closest('dialog') ?? null
  if (dialog) portal.value = dialog
  dialog?.addEventListener('close', hide)
})
onBeforeUnmount(() => {
  hide()
  control?.removeEventListener('focus', show)
  control?.removeEventListener('blur', hide)
  dialog?.removeEventListener('close', hide)
  bindDismissal(false)
})
</script>

<template>
  <abbr ref="trigger" class="slide-acronym" :tabindex="insideControl ? undefined : 0"
    :aria-label="`${term}: ${expansion}`" :aria-describedby="open ? tooltipId : undefined"
    @mouseenter="show" @mouseleave="scheduleClose" @focus="show" @blur="hide" @click="show">{{ term }}</abbr>
  <Teleport :to="portal">
    <span v-if="open" class="tooltip tooltip-open slide-acronym-tooltip" :class="below ? 'tooltip-bottom' : 'tooltip-top'" :style="position">
      <span :id="tooltipId" ref="popup" class="tooltip-content" role="tooltip" @mouseenter="cancelClose" @mouseleave="scheduleClose">{{ expansion }}</span>
    </span>
  </Teleport>
</template>
