import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import { createLessonPaginationIndex, type PaginationSlide } from '../utils/lesson-pagination'

type PaginationIndex = ReturnType<typeof createLessonPaginationIndex>
const indexes = new WeakMap<readonly PaginationSlide[], ComputedRef<PaginationIndex>>()

/** Share one reactive index between mounted layouts and the global progress bar. */
export function useLessonPagination(
  slides: MaybeRefOrGetter<readonly PaginationSlide[]>,
  slideNo: MaybeRefOrGetter<number>,
) {
  return computed(() => {
    const deck = toValue(slides)
    let index = indexes.get(deck)
    if (!index) {
      index = computed(() => createLessonPaginationIndex(deck))
      indexes.set(deck, index)
    }
    const pagination = index.value
    return pagination.bySlide.get(toValue(slideNo)) ?? pagination.fallback
  })
}
