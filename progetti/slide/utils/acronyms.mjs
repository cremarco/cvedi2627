import glossary from '../data/acronyms.json' with { type: 'json' }

export { glossary }
const terms = Object.keys(glossary).sort((a, b) => b.length - a.length)
const pattern = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
const acronyms = new RegExp(`(?<![\\p{L}\\p{N}_])(${pattern})(?![\\p{L}\\p{N}_])`, 'gu')
const addresses = /(?:https?:\/\/|www\.)[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi

/** Preserve every character; only complete, curated terms receive a tooltip. */
export function splitAcronyms(value) {
  const text = String(value ?? '')
  const protectedRanges = [...text.matchAll(addresses)].map(match => [match.index, match.index + match[0].length])
  const parts = []
  let cursor = 0
  for (const match of text.matchAll(acronyms)) {
    if (protectedRanges.some(([start, end]) => match.index >= start && match.index < end)) continue
    if (match.index > cursor) parts.push({ text: text.slice(cursor, match.index) })
    parts.push({ text: match[0], expansion: glossary[match[0]] })
    cursor = match.index + match[0].length
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) })
  return parts
}

const ignoredTags = new Set(['script', 'style', 'pre', 'code', 'kbd', 'svg', 'math', 'textarea', 'abbr', 'slideacronym', 'acronymtext'])
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
const markup = /<!--[\s\S]*?-->|<\/?[a-z][\w:.-]*(?:[^"'<>]|"[^"]*"|'[^']*')*>|\{\{[\s\S]*?\}\}/gi

/** Runs on rendered Markdown, before Vue compilation. Never mutates Vue's DOM,
 * attributes, code, interpolations, or the original teaching content. */
export function annotateAcronyms(html) {
  const stack = []
  let cursor = 0
  let result = ''
  function annotate(text) {
    if (stack.some(entry => entry.skip)) return text
    return splitAcronyms(text).map(part => part.expansion
      ? `<SlideAcronym term="${part.text}" />`
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
      stack.push({ name, skip: ignoredTags.has(name) || /\b(?:v-pre|data-no-acronyms)\b/.test(match[0]) })
    }
  }
  return result + annotate(html.slice(cursor))
}
