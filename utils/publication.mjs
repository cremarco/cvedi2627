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

// This subtree contains only figures belonging to lessons 04–09. Originals
// and local public assets remain in the repository; remove only build copies.
export const localAssetDirectories = ['images/processo-ux', 'images/generated/theme-2026/chapters/local']
