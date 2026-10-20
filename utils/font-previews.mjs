import catalog from '../data/font-previews.json' with { type: 'json' }

export { catalog }

const entries = Object.entries(catalog).flatMap(([fontId, font]) =>
  [...new Set([font.name, ...(font.aliases ?? [])])].map(text => ({ text, fontId })))
const lookup = new Map(entries.map(entry => [entry.text, entry.fontId]))
const pattern = [...lookup.keys()].sort((a, b) => b.length - a.length)
  .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
const fontNames = pattern ? new RegExp(`(?<![\\p{L}\\p{N}_])(${pattern})(?![\\p{L}\\p{N}_])`, 'gu') : null
const addresses = /(?:https?:\/\/|www\.)[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi

// Namesakes in full personal names and institutional credits are not font uses.
const people = {
  Bodoni: /(?:Giambattista|Giovanni Battista|Biblioteca)\s+$/u,
  Baskerville: /John\s+$/u,
  Caslon: /William\s+$/u,
  Didot: /(?:Firmin|Pierre)\s+$/u,
  Garamond: /Claude\s+$/u,
  Frutiger: /(?:Adrian|Atelier)\s+$/u,
  Jenson: /(?:Nicolas|Nicolaus)\s+$/u,
}

/** Keep the exact visible wording, including punctuation and spacing. */
export function splitFontNames(value) {
  const text = String(value ?? '')
  if (!fontNames) return [{ text }]
  const protectedRanges = [...text.matchAll(addresses)].map(match => [match.index, match.index + match[0].length])
  const parts = []
  let cursor = 0
  for (const match of text.matchAll(fontNames)) {
    if (protectedRanges.some(([start, end]) => match.index >= start && match.index < end)) continue
    if (people[match[0]]?.test(text.slice(0, match.index))) continue
    if (match.index > cursor) parts.push({ text: text.slice(cursor, match.index) })
    parts.push({ text: match[0], fontId: lookup.get(match[0]) })
    cursor = match.index + match[0].length
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) })
  return parts.length ? parts : [{ text }]
}

const ignoredTags = new Set(['a', 'button', 'script', 'style', 'pre', 'code', 'kbd', 'svg', 'math', 'textarea', 'abbr', 'slideacronym', 'acronymtext', 'slidefont', 'fontnametext'])
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
const markup = /<!--[\s\S]*?-->|<\/?[a-z][\w:.-]*(?:[^"'<>]|"[^"]*"|'[^']*')*>|\{\{[\s\S]*?\}\}/gi
const attribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Annotate rendered Markdown before Vue compilation, never the live DOM.
 * Link destinations, attributes, specimens, code and opt-outs remain intact. */
export function annotateFontNames(html) {
  const stack = []
  let cursor = 0
  let result = ''
  function annotate(text) {
    if (stack.some(entry => entry.skip)) return text
    return splitFontNames(text).map(part => part.fontId
      ? `<SlideFont font-id="${attribute(part.fontId)}" label="${attribute(part.text)}" />`
      : part.text).join('')
  }
  for (const match of html.matchAll(markup)) {
    result += annotate(html.slice(cursor, match.index)) + match[0]
    cursor = match.index + match[0].length
    const tag = match[0].match(/^<(\/?)(([a-z])[\w:.-]*)/i)
    if (!tag) continue
    const name = tag[2].toLowerCase()
    if (tag[1]) {
      const index = stack.map(entry => entry.name).lastIndexOf(name)
      if (index >= 0) stack.splice(index)
    } else if (!voidTags.has(name) && !/\/\s*>$/.test(match[0])) {
      stack.push({ name, skip: ignoredTags.has(name)
        || /\b(?:v-pre|data-no-font-previews)\b/.test(match[0])
        || /\brole\s*=\s*["'](?:button|link)["']/i.test(match[0]) })
    }
  }
  return result + annotate(html.slice(cursor))
}
