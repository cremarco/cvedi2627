import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { slideSet, slideSetStyle } from '../utils/slide-sets'

/** Resolve the owning slide, including inactive slides and teleported figures. */
export function useSlideSet(frontmatter?: () => Record<string, unknown> | undefined) {
  const { $page, $nav } = useSlideContext()
  const matter = computed(() => frontmatter?.() ?? $nav.value.slides.find(slide => slide.no === $page.value)?.meta.slide.frontmatter ?? {})
  const set = computed(() => slideSet(matter.value.lesson))
  const setStyle = computed(() => slideSetStyle(set.value))
  return { matter, set, setStyle, page: $page, nav: $nav }
}
