/** Resolve public assets when the presentation is hosted in a subdirectory. */
export function publicAsset(url: string) {
  if (!url.startsWith('/') || url.startsWith('//')) return url
  return `${import.meta.env.BASE_URL}${url.slice(1)}`
}
