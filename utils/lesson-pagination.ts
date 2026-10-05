interface PaginationSlide {
  no: number
  meta: { slide: { frontmatter: Record<string, unknown> } }
}

/** Count pages within a lesson; untagged slides form the course presentation. */
export function lessonPagination(slides: readonly PaginationSlide[], slideNo: number) {
  const lessonOf = (slide: PaginationSlide) => String(slide.meta.slide.frontmatter.lesson ?? 'presentazione-corso')
  const current = slides.find(slide => slide.no === slideNo)
  const lesson = current ? lessonOf(current) : 'presentazione-corso'
  const lessonSlides = slides.filter(slide => lessonOf(slide) === lesson)

  return {
    lesson,
    page: lessonSlides.findIndex(slide => slide.no === slideNo) + 1,
    total: lessonSlides.length,
  }
}
