export interface PaginationSlide {
  no: number
  meta: { slide: { frontmatter: Record<string, unknown> } }
}

export interface LessonPagination {
  lesson: string
  page: number
  total: number
}

const courseLesson = 'presentazione-corso'
const lessonOf = (slide: PaginationSlide) => String(slide.meta.slide.frontmatter.lesson ?? courseLesson)

/** Index a complete deck once, including lessons with non-contiguous slides. */
export function createLessonPaginationIndex(slides: readonly PaginationSlide[]) {
  const totals = new Map<string, number>()
  const positions = new Map<string, number>()
  const bySlide = new Map<number, LessonPagination>()

  for (const slide of slides) {
    const lesson = lessonOf(slide)
    totals.set(lesson, (totals.get(lesson) ?? 0) + 1)
  }

  for (const slide of slides) {
    const lesson = lessonOf(slide)
    const page = (positions.get(lesson) ?? 0) + 1
    positions.set(lesson, page)
    if (!bySlide.has(slide.no)) bySlide.set(slide.no, { lesson, page, total: totals.get(lesson)! })
  }

  return {
    bySlide,
    fallback: { lesson: courseLesson, page: 0, total: totals.get(courseLesson) ?? 0 },
  }
}

/** Count pages within a lesson; untagged slides form the course presentation. */
export function lessonPagination(slides: readonly PaginationSlide[], slideNo: number): LessonPagination {
  const index = createLessonPaginationIndex(slides)
  return index.bySlide.get(slideNo) ?? index.fallback
}
