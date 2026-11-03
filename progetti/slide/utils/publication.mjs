import { lessonDecks } from './lesson-decks.mjs'

const localNarration = new Set(lessonDecks.filter(deck => deck.audioLocalOnly).map(deck => deck.lesson))

// Publication is the default for every Slidev build. Dev and local exports keep
// the complete teaching deck; localOnly imports never enter the published deck.
export function publicationExtensions(mode) {
  if (mode !== 'build') return []
  return [{
    name: 'cvedi-publication',
    transformRawLines(lines) {
      // Slidev also ships frontmatterRaw: remove private media before parsing.
      let start = -1
      for (let end = 0; end < lines.length; end++) {
        if (lines[end].trim() !== '---') continue
        if (start >= 0) {
          const lesson = lines.slice(start + 1, end).find(line => /^lesson:/.test(line))
            ?.replace(/^lesson:\s*/, '').replace(/^["']|["']$/g, '').trim()
          if (localNarration.has(lesson))
            for (let index = start + 1; index < end; index++)
              if (/^narration(?:Audio|Captions):/.test(lines[index])) lines[index] = ''
        }
        start = end
      }
    },
    async transformSlide(content, frontmatter) {
      if (frontmatter.localOnly === true) frontmatter.disabled = true
      if (localNarration.has(frontmatter.lesson)) {
        delete frontmatter.narrationAudio
        delete frontmatter.narrationCaptions
      }
      // Consume the entire block line so Markdown does not wrap the following
      // grid item in a paragraph when the local-only content is removed.
      return content.replace(/^[ \t]*<LocalOnly>[\s\S]*?<\/LocalOnly>[ \t]*(?:\r?\n|$)/gm, '')
    },
  }]
}

// Unpublished illustration families remain local. The shared UX figures are
// filtered against the compiled bundle so published lessons retain their assets.
export const localAssetDirectories = ['images/generated/theme-2026/chapters/local', 'audio/lezione-test-usabilita', 'captions/lezione-test-usabilita']
export const sharedLessonAssetDirectories = ['images/processo-ux', 'images/processo-ux-ui']
