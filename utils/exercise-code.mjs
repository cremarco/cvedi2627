import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import html from 'shiki/langs/html.mjs'
import css from 'shiki/langs/css.mjs'
import javascript from 'shiki/langs/javascript.mjs'
import bash from 'shiki/langs/bash.mjs'
import json from 'shiki/langs/json.mjs'
import diff from 'shiki/langs/diff.mjs'
import theme from 'shiki/themes/github-dark-high-contrast.mjs'

const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const cache = new Map()
let highlighter

export function exerciseCodeLanguage(source = '') {
  const code = source.trim()
  if (/^(?:<<<<<<<|=======|>>>>>>>|@@\s)/m.test(code)) return 'diff'
  if (/^(?:<!|<\/?[a-z])/i.test(code)) return 'html'
  if (/^(?:npm|pnpm|npx|git|curl|cd|mkdir|touch)\s/m.test(code)) return 'bash'
  if (/^(?:import\s|export\s|const\s|let\s|var\s|function\b|if\s*\(|for\s*\(|while\s*\(|\/\/|\$\(|jQuery\(|document\.|console\.|\.\w+\s*\()/m.test(code) || /=>|\bfunction\s*\(|\.addEventListener\(/.test(code)) return 'javascript'
  if (/<\/?[a-z][^>]*>/i.test(code)) return 'html'
  if (/^[\[{]/.test(code)) {
    try { JSON.parse(code); return 'json' } catch { /* CSS and JS can also start with braces. */ }
  }
  if (/^@(?:import|plugin|theme|media|supports|layer|utility)\b/m.test(code) || /[^{}\n]+\{/.test(code) || /\/\*/.test(code) || /^[\w-]+\s*:\s*\S/.test(code)) return 'css'
  return 'text'
}

// Color spans only: daisyUI owns the panel, <pre>, spacing and typography.
// A single shared instance and cache also serve the isolated native examples.
export function highlightExerciseCode(source = '', language = exerciseCodeLanguage(source)) {
  const key = `${language}\0${source}`
  if (cache.has(key)) return cache.get(key)
  if (language === 'text') return escape(source)
  highlighter ??= createHighlighterCoreSync({
    themes: [theme], langs: [html, css, javascript, bash, json, diff],
    engine: createJavaScriptRegexEngine(),
  })
  const lines = highlighter.codeToTokensBase(source, { lang: language, theme: theme.name })
  const endings = source.match(/\r\n|\r|\n/g) || []
  const raw = lines.map((tokens, i) => tokens.map(token => token.content).join('') + (endings[i] || '')).join('')
  if (raw !== source) throw new Error('Syntax highlighting must preserve the exact source text')
  const colored = lines.map((tokens, i) => tokens.map(token => {
    const content = escape(token.content)
    return /^#[\da-f]{6}$/i.test(token.color || '') ? `<span style="color:${token.color}">${content}</span>` : content
  }).join('') + (endings[i] || '')).join('')
  cache.set(key, colored)
  return colored
}
