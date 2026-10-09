// Publication is the default for every Slidev build. Dev and local exports keep
// the complete teaching deck; localOnly imports never enter the published deck.
export function publicationExtensions(mode) {
  if (mode !== 'build') return []
  return [{
    name: 'cvedi-publication',
    async transformSlide(content, frontmatter) {
      if (frontmatter.localOnly === true) frontmatter.disabled = true
      // Consume the entire block line so Markdown does not wrap the following
      // grid item in a paragraph when the local-only content is removed.
      return content.replace(/^[ \t]*<LocalOnly>[\s\S]*?<\/LocalOnly>[ \t]*(?:\r?\n|$)/gm, '')
    },
  }]
}

// Unpublished illustration families remain local. The shared UX figures are
// filtered against the compiled bundle so lesson 04 can retain its own assets.
export const localAssetDirectories = ['images/generated/theme-2026/chapters/local']
export const sharedLessonAssetDirectories = ['images/processo-ux']
