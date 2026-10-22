/** Stable catalog key shared by the presentation and its source checks. */
export function normalizeTitle(title) {
  return title.normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/^(?:\d+|[a-z])\s*[·.]\s*/i, '')
    .trim().toLowerCase()
}
