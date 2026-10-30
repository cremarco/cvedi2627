<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import process from '../data/ux-process-explorer.json'
import LessonFigure from './LessonFigure.vue'
import SlideAction from './SlideAction.vue'
import HeroIcon from './HeroIcon.vue'

defineProps<{ intro: string; fallbackSrc: string; fallbackAlt: string; fallbackCaption: string }>()
const { isActive, isPrinting } = useSlidePlayback()
const prefix = 'ux-explorer-' + useId().replaceAll(':', '')
const surface = ref<HTMLElement>()
const buttons = new Map<number, HTMLButtonElement>()
const selectedNumber = ref(1)
const selected = computed(() => process.steps.find(step => step.number === selectedNumber.value)!)
const selectedPhase = computed(() => process.phases.find(phase => phase.steps.includes(selectedNumber.value))!)
const edges = ref<{ from: number; to: number; d: string }[]>([])
const viewBox = ref('0 0 1136 230')
let observer: ResizeObserver | undefined
let frame: number | undefined

function rememberButton(element: unknown, number: number) {
  if (element instanceof HTMLButtonElement) buttons.set(number, element)
  else buttons.delete(number)
}
function measureEdges() {
  const root = surface.value
  if (!root || !root.clientWidth || !root.getBoundingClientRect().width) return
  const bounds = root.getBoundingClientRect(), scale = bounds.width / root.clientWidth
  viewBox.value = `0 0 ${root.clientWidth} ${root.clientHeight}`
  edges.value = process.steps.slice(0, -1).flatMap((step, index) => {
    const first = buttons.get(step.number), second = buttons.get(process.steps[index + 1].number)
    if (!first || !second) return []
    const a = first.getBoundingClientRect(), b = second.getBoundingClientRect()
    if (!a.width || !b.width) return []
    if (Math.abs(a.top - b.top) < 1) {
      const y = ((a.top + a.bottom) / 2 - bounds.top) / scale
      return [{ from: step.number, to: step.number + 1,
        d: `M${(a.right - bounds.left) / scale},${y} H${(b.left - bounds.left) / scale}` }]
    }
    const x1 = ((a.left + a.right) / 2 - bounds.left) / scale
    const x2 = ((b.left + b.right) / 2 - bounds.left) / scale
    const y1 = (a.bottom - bounds.top) / scale, y2 = (b.top - bounds.top) / scale
    const middle = (y1 + y2) / 2
    return [{ from: step.number, to: step.number + 1, d: `M${x1},${y1} V${middle} H${x2} V${y2}` }]
  })
}
function scheduleEdges() {
  if (frame !== undefined) cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => { frame = undefined; measureEdges() })
}
async function selectStep(number: number, focus = false) {
  selectedNumber.value = number
  if (focus) {
    await nextTick()
    buttons.get(number)?.focus()
  }
}
function onKey(event: KeyboardEvent, number: number) {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  const increment = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
  if (increment !== undefined || event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    const next = event.key === 'Home' ? 1 : event.key === 'End' ? 14 : Math.max(1, Math.min(14, number + increment!))
    selectStep(next, true)
  }
}
function onRootKey(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  event.preventDefault()
  ;(event.target as HTMLElement)?.blur()
}
onMounted(() => {
  observer = new ResizeObserver(scheduleEdges)
  if (surface.value) observer.observe(surface.value)
  scheduleEdges()
})
watch(surface, (element, previous) => {
  if (previous) observer?.unobserve(previous)
  if (element) observer?.observe(element)
  scheduleEdges()
}, { flush: 'post' })
onBeforeUnmount(() => {
  observer?.disconnect()
  if (frame !== undefined) cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="ux-process-explorer">
    <div v-if="!isPrinting" class="ux-explorer-interactive" @keydown.stop="onRootKey" @keyup.stop>
      <p class="lead ux-explorer-intro">{{ intro }}</p>
      <div class="ux-explorer-workspace">
      <div ref="surface" class="ux-explorer-map" role="group" aria-label="Mappa interattiva dei quattordici passi del processo">
        <svg class="ux-explorer-connections" :viewBox="viewBox" preserveAspectRatio="none" aria-hidden="true">
          <defs><marker :id="prefix + '-arrow'" markerUnits="userSpaceOnUse" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0 4 2.5 0 5" fill="none" stroke="currentColor" /></marker></defs>
          <path v-for="edge in edges" :key="edge.from" :d="edge.d" :data-to="edge.to" :marker-end="`url(#${prefix}-arrow)`" :class="{ 'is-selected': edge.to === selectedNumber }" />
        </svg>
        <section v-for="phase in process.phases" :key="phase.id" class="ux-explorer-phase" :class="{ 'is-current': selectedPhase.id === phase.id }" :aria-labelledby="prefix + '-' + phase.id">
          <h3 :id="prefix + '-' + phase.id" class="ux-explorer-phase-title">{{ phase.label }}</h3>
          <div class="ux-explorer-phase-steps" :style="{ '--phase-columns': phase.steps.length === 4 ? 2 : phase.steps.length }">
          <button v-for="number in phase.steps" :key="number" :ref="element => rememberButton(element, number)"
            type="button" class="btn btn-outline ux-explorer-node"
            :class="{ 'is-selected': selectedNumber === number }" :data-step="number"
            :aria-pressed="selectedNumber === number" :aria-controls="prefix + '-detail'"
            :aria-label="`Passo ${number}: ${process.steps[number - 1].title}`"
            :tabindex="isActive && selectedNumber === number ? 0 : -1" :disabled="!isActive"
            @click="selectStep(number, true)" @keydown="onKey($event, number)">
            <span class="ux-explorer-number" aria-hidden="true">{{ String(number).padStart(2, '0') }}</span>
            <span>{{ process.steps[number - 1].label }}</span>
          </button>
          </div>
        </section>
      </div>
      <section :id="prefix + '-detail'" class="card ux-explorer-detail" :aria-labelledby="prefix + '-title'" aria-live="polite" aria-atomic="true">
        <div class="card-body">
        <div class="ux-explorer-detail-heading">
          <h2 :id="prefix + '-title'">{{ String(selected.number).padStart(2, '0') }} · {{ selected.title }}</h2>
        </div>
        <dl class="ux-explorer-fields">
          <div><dt>Obiettivo</dt><dd>{{ selected.goal }}</dd></div>
          <div><dt>Attività</dt><dd>{{ selected.activity }}</dd></div>
          <div><dt>Risultato</dt><dd>{{ selected.output }}</dd></div>
        </dl>
        <SlideAction :to="selected.target" :show-arrow="true" class="ux-explorer-open">Apri spiegazione</SlideAction>
        </div>
      </section>
        <div class="ux-explorer-detail-footer">
          <button type="button" class="btn btn-ghost ux-explorer-return" :disabled="!isActive"
            :aria-label="`${selected.relatedLabel}: passo ${selected.relatedStep}`"
            @click="selectStep(selected.relatedStep, true)">
            <HeroIcon name="arrow-path" />{{ selected.relatedLabel }}
          </button>
          <p class="ux-explorer-help">Frecce: passi · Tab: link · Esc: slide</p>
        </div>
      </div>
    </div>
    <div v-else class="ux-explorer-print">
      <LessonFigure :src="fallbackSrc" :alt="fallbackAlt" :caption="fallbackCaption" />
    </div>
  </div>
</template>

<style scoped>
.ux-process-explorer { display: flex; flex: 1 1 0; flex-direction: column; min-height: 0; width: 100%; }
.ux-explorer-interactive { display: flex; flex: 1 1 0; flex-direction: column; gap: 16px; min-height: 0; }
.ux-explorer-intro.lead { flex: 0 0 auto; margin: 0; }
.ux-explorer-workspace { display: grid; grid-template-columns: minmax(0, 1fr) 360px; grid-template-rows: minmax(0, 1fr) 44px; grid-template-areas: 'map detail' 'footer detail'; gap: 16px 32px; flex: 1 1 0; min-height: 0; }
.ux-explorer-map { grid-area: map; position: relative; display: flex; flex-direction: column; justify-content: space-between; gap: 20px; min-width: 0; min-height: 364px; }
.ux-explorer-connections { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; color: var(--cvedi-muted); }
.ux-explorer-connections > path { fill: none; stroke: currentColor; stroke-width: 1; opacity: .85; }
.ux-explorer-connections > path.is-selected { color: var(--section-primary); }
.ux-explorer-phase { position: relative; display: grid; grid-template-columns: 160px minmax(0, 1fr); align-items: center; gap: 16px; min-width: 0; }
.ux-explorer-phase-title { margin: 0; color: var(--cvedi-body); font: 600 var(--cvedi-type-card-title)/1.3 var(--cvedi-font-reading); }
.ux-explorer-phase.is-current .ux-explorer-phase-title { color: var(--section-primary); }
.ux-explorer-phase-steps { display: grid; grid-template-columns: repeat(var(--phase-columns), minmax(0, 1fr)); gap: 20px 8px; min-width: 0; }
.ux-explorer-node.btn { position: relative; display: flex; justify-content: flex-start; gap: 8px; width: 100%; min-width: 0; min-height: 44px; height: 44px; padding: 6px 10px; border: 1px solid var(--cvedi-rule); border-radius: var(--cvedi-radius); background: var(--cvedi-paper); color: var(--cvedi-body); font: 500 var(--cvedi-type-card-body)/1.2 var(--cvedi-font-reading); text-align: left; white-space: nowrap; box-shadow: none; transition: none; }
.ux-explorer-node.btn:hover { border-color: var(--section-primary); background: var(--color-base-200); color: var(--section-primary); }
.ux-explorer-node.btn.is-selected { border-color: var(--section-primary); background: var(--color-primary); color: var(--color-primary-content); }
.ux-explorer-number { flex: 0 0 24px; font-size: var(--cvedi-type-note); font-weight: 700; font-variant-numeric: tabular-nums; }
.ux-explorer-node.btn:focus-visible, .ux-explorer-return.btn:focus-visible { outline: 3px solid var(--section-primary); outline-offset: 3px; }
.ux-explorer-detail.card { grid-area: detail; min-width: 0; min-height: 0; border: 1px solid var(--cvedi-rule); border-radius: var(--cvedi-radius); background: var(--color-base-100); box-shadow: none; }
.ux-explorer-detail > .card-body { display: flex; flex-direction: column; gap: 16px; min-width: 0; min-height: 0; padding: 20px; }
.ux-explorer-detail-heading { flex: 0 0 auto; min-height: 62.4px; }
.ux-explorer-detail-heading h2 { margin: 0; color: var(--section-primary); font: 600 var(--cvedi-type-card-title)/1.3 var(--cvedi-font-reading); text-wrap: balance; }
.ux-explorer-open.slide-action { flex: 0 0 auto; justify-content: space-between; width: 100%; margin: auto 0 0; }
.ux-explorer-fields { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin: 0; }
.ux-explorer-fields > div { min-width: 0; }
.ux-explorer-fields dt { margin: 0 0 4px; color: var(--cvedi-muted); font: 600 var(--cvedi-type-note)/1.3 var(--cvedi-font-reading); }
.ux-explorer-fields dd { margin: 0; color: var(--cvedi-body); font: 400 var(--cvedi-type-card-body)/1.4 var(--cvedi-font-reading); }
.ux-explorer-detail-footer { grid-area: footer; display: flex; align-items: center; justify-content: space-between; gap: 16px; min-width: 0; }
.ux-explorer-return.btn { flex: 0 0 auto; gap: 8px; height: 44px; min-height: 44px; padding: 0; color: var(--section-primary); font: 500 var(--cvedi-type-note)/1.3 var(--cvedi-font-reading); }
.ux-explorer-return svg { width: 18px; height: 18px; }
.ux-explorer-help { margin: 0; color: var(--cvedi-muted); font: 400 var(--cvedi-type-note)/1.3 var(--cvedi-font-reading); }
.ux-explorer-print { display: flex; flex: 1 1 0; min-height: 0; }
.ux-explorer-print > :deep(.lesson-figure) { flex: 1 1 0; }
</style>
