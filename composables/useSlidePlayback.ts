import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'

/** Playback conditions shared by animated slide components that remain mounted. */
export function useSlidePlayback() {
  const isMounted = ref(false)
  const isActive = useIsSlideActive()
  const { isPrintMode } = useNav()
  const { $renderContext } = useSlideContext()
  const motionQuery = typeof window === 'undefined'
    ? undefined
    : window.matchMedia('(prefers-reduced-motion: reduce)')
  // Slidev's print state covers its export route, not native browser printing.
  const printQuery = typeof window === 'undefined'
    ? undefined
    : window.matchMedia('print')
  const prefersReducedMotion = ref(motionQuery?.matches ?? false)
  const isPrinting = ref(printQuery?.matches ?? false)
  const isVisible = ref(typeof document === 'undefined' || !document.hidden)

  const canAnimate = computed(() =>
    isMounted.value && isActive.value && ['slide', 'presenter'].includes($renderContext.value)
      && !isPrintMode.value && !isPrinting.value && !prefersReducedMotion.value && isVisible.value,
  )

  function syncMotion() {
    prefersReducedMotion.value = motionQuery?.matches ?? false
  }

  function syncPrint() {
    isPrinting.value = printQuery?.matches ?? false
  }

  function syncVisibility() {
    isVisible.value = !document.hidden
  }

  onMounted(() => {
    motionQuery?.addEventListener('change', syncMotion)
    printQuery?.addEventListener('change', syncPrint)
    document.addEventListener('visibilitychange', syncVisibility)
    syncMotion()
    syncPrint()
    syncVisibility()
    isMounted.value = true
  })
  onBeforeUnmount(() => {
    isMounted.value = false
    motionQuery?.removeEventListener('change', syncMotion)
    printQuery?.removeEventListener('change', syncPrint)
    document.removeEventListener('visibilitychange', syncVisibility)
  })

  return { isActive, canAnimate, prefersReducedMotion }
}
