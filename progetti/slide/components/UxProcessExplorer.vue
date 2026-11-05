<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import process from '../data/ux-process-explorer.json'
import LessonFigure from './LessonFigure.vue'
import SlideAction from './SlideAction.vue'
import { publicAsset } from '../utils/public-asset'

defineProps<{ fallbackSrc: string; fallbackAlt: string; fallbackCaption: string }>()
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
            <img class="ux-explorer-node-artwork" :src="publicAsset(process.steps[number - 1].artwork)" alt="" aria-hidden="true" decoding="async" />
            <span class="ux-explorer-number" aria-hidden="true">{{ String(number).padStart(2, '0') }}</span>
            <span class="ux-explorer-node-label">{{ process.steps[number - 1].label }}</span>
          </button>
          </div>
        </section>
      </div>
      <section :id="prefix + '-detail'" class="card ux-explorer-detail" :aria-labelledby="prefix + '-title'" aria-live="polite" aria-atomic="true">
        <div class="card-body">
        <header class="ux-explorer-detail-heading">
          <h2 :id="prefix + '-title'" :aria-label="`Passo ${selected.number}: ${selected.title}`"><span class="ux-explorer-detail-number">{{ String(selected.number).padStart(2, '0') }}</span><span>{{ selected.title }}</span></h2>
        </header>
        <dl class="ux-explorer-fields">
          <div><dt>Obiettivo</dt><dd>{{ selected.goal }}</dd></div>
          <div><dt>Attività</dt><dd>{{ selected.activity }}</dd></div>
          <div class="ux-explorer-outcome"><dt>Risultato atteso</dt><dd>{{ selected.output }}</dd></div>
        </dl>
        <div class="card-actions ux-explorer-detail-actions"><SlideAction :to="selected.target" :show-arrow="true" class="ux-explorer-open">Apri spiegazione</SlideAction></div>
        </div>
      </section>
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
.ux-explorer-workspace { display: grid; grid-template-columns: minmax(0, 1fr) 300px; grid-template-rows: minmax(0, 1fr); grid-template-areas: 'map detail'; gap: 32px; flex: 1 1 0; min-height: 0; }
.ux-explorer-map { grid-area: map; position: relative; display: flex; flex-direction: column; justify-content: space-between; gap: 20px; min-width: 0; min-height: 364px; }
.ux-explorer-connections { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; color: var(--cvedi-muted); }
.ux-explorer-connections > path { fill: none; stroke: currentColor; stroke-width: 1; opacity: .85; }
.ux-explorer-connections > path.is-selected { color: var(--section-primary); }
.ux-explorer-phase { position: relative; display: grid; grid-template-columns: 144px minmax(0, 1fr); align-items: center; gap: 16px; min-width: 0; }
.ux-explorer-phase-title { margin: 0; color: var(--cvedi-body); font: 600 var(--cvedi-type-card-title)/1.3 var(--cvedi-font-reading); }
.ux-explorer-phase.is-current .ux-explorer-phase-title { color: var(--section-primary); }
.ux-explorer-phase-steps { display: grid; grid-template-columns: repeat(var(--phase-columns), minmax(0, 1fr)); gap: 20px 8px; min-width: 0; }
.ux-explorer-node.btn { position: relative; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 4px; width: 100%; min-width: 0; min-height: 80px; height: 80px; padding: 12px 80px 12px 12px; overflow: hidden; border: 1px solid var(--cvedi-rule); border-radius: var(--cvedi-radius); background: var(--cvedi-paper); color: var(--cvedi-body); font: 500 var(--cvedi-type-card-body)/1.2 var(--cvedi-font-reading); text-align: left; white-space: normal; box-shadow: none; transition: none; }
.ux-explorer-node.btn:hover { border-color: var(--section-primary); background: var(--color-base-200); color: var(--section-primary); }
.ux-explorer-node.btn.is-selected { border-color: var(--section-primary); background: var(--color-primary); color: var(--color-primary-content); }
.ux-explorer-node-artwork { position: absolute; right: -8px; bottom: -8px; width: 80px; height: 80px; object-fit: contain; opacity: .6; pointer-events: none; }
.ux-explorer-node.is-selected .ux-explorer-node-artwork { opacity: .9; }
.ux-explorer-number { position: relative; z-index: 1; flex: 0 0 auto; font-size: var(--cvedi-type-note); font-weight: 700; font-variant-numeric: tabular-nums; }
.ux-explorer-node-label { position: relative; z-index: 1; }
.ux-explorer-node.btn:focus-visible { outline: 3px solid var(--section-primary); outline-offset: 3px; }
.ux-explorer-detail.card { grid-area: detail; min-width: 0; min-height: 0; border: 1px solid var(--cvedi-rule); border-radius: var(--cvedi-radius); background: var(--color-base-100); box-shadow: none; }
.ux-explorer-detail > .card-body { display: flex; flex-direction: column; gap: var(--cvedi-space-related); min-width: 0; min-height: 0; padding: var(--cvedi-space-peers); }
.ux-explorer-detail-heading { flex: 0 0 auto; padding-bottom: var(--cvedi-space-related); border-bottom: 1px solid var(--cvedi-rule); }
.ux-explorer-detail-heading h2 { display: flex; align-items: baseline; gap: var(--cvedi-space-copy); margin: 0; color: var(--section-primary); font: 600 var(--cvedi-type-card-title)/1.3 var(--cvedi-font-reading); text-wrap: balance; }
.ux-explorer-detail-number { flex: 0 0 auto; font-variant-numeric: tabular-nums; }
.ux-explorer-detail-actions { flex: 0 0 auto; }
.ux-explorer-open.slide-action { flex: 0 0 auto; justify-content: space-between; width: 100%; margin: 0; }
.ux-explorer-fields { display: flex; flex: 1 1 auto; flex-direction: column; gap: var(--cvedi-space-peers); min-height: 0; margin: 0; }
.ux-explorer-fields > div { flex: 0 0 auto; min-width: 0; }
.ux-explorer-fields dt { margin: 0 0 6px; color: var(--cvedi-muted); font: 600 var(--cvedi-type-note)/1.3 var(--cvedi-font-reading); }
.ux-explorer-fields dd { margin: 0; color: var(--cvedi-body); font: 400 var(--cvedi-type-card-body)/1.4 var(--cvedi-font-reading); }
.ux-explorer-fields > .ux-explorer-outcome { margin-top: auto; margin-inline: calc(-1 * var(--cvedi-space-peers)); padding: var(--cvedi-space-related) var(--cvedi-space-peers); border-block: 1px solid var(--cvedi-rule); background: color-mix(in oklch, var(--section-primary) 6%, var(--color-base-100)); }
.ux-explorer-outcome dt { color: var(--section-primary); }
.ux-explorer-print { display: flex; flex: 1 1 0; min-height: 0; }
.ux-explorer-print > :deep(.lesson-figure) { flex: 1 1 0; }
</style>
