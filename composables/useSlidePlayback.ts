import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'

// Slidev keeps many slides mounted. Share one set of browser listeners instead
// of adding three listeners for every layout and animated component.
const prefersReducedMotion = ref(false)
const isPrinting = ref(false)
const isVisible = ref(true)
let consumers = 0
let motionQuery: MediaQueryList | undefined
let printQuery: MediaQueryList | undefined

function syncEnvironment() {
  prefersReducedMotion.value = motionQuery?.matches ?? false
  isPrinting.value = printQuery?.matches ?? false
  isVisible.value = !document.hidden
}

function acquireEnvironment() {
  if (consumers++ > 0) return
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  // The native print query complements Slidev's screen-media export state.
  printQuery = window.matchMedia('print')
  motionQuery.addEventListener('change', syncEnvironment)
  printQuery.addEventListener('change', syncEnvironment)
  document.addEventListener('visibilitychange', syncEnvironment)
  syncEnvironment()
}

function releaseEnvironment() {
  if (--consumers > 0) return
  motionQuery?.removeEventListener('change', syncEnvironment)
  printQuery?.removeEventListener('change', syncEnvironment)
  document.removeEventListener('visibilitychange', syncEnvironment)
  motionQuery = printQuery = undefined
}

/** Playback conditions shared by animated slide components that remain mounted. */
export function useSlidePlayback() {
  const isMounted = ref(false)
  const isActive = useIsSlideActive()
  const { isPrintMode } = useNav()
  const { $renderContext } = useSlideContext()

  const canAnimate = computed(() =>
    isMounted.value && isActive.value && ['slide', 'presenter'].includes($renderContext.value)
      && !isPrintMode.value && !isPrinting.value && !prefersReducedMotion.value && isVisible.value,
  )

  onMounted(() => {
    acquireEnvironment()
    isMounted.value = true
  })
  onBeforeUnmount(() => {
    isMounted.value = false
    releaseEnvironment()
  })

  return { isActive, canAnimate, prefersReducedMotion }
}
