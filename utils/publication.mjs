// Publication is the default for every Slidev build. Dev and local exports keep
// the complete teaching deck; localOnly imports never enter the published deck.
export function publicationExtensions(mode) {
  if (mode !== 'build') return []
  return [{
    name: 'cvedi-publication',
    async transformSlide(content, frontmatter) {
      if (frontmatter.localOnly === true) frontmatter.disabled = true
      return content.replace(/<LocalOnly>\s*[\s\S]*?<\/LocalOnly>/g, '')
    },
  }]
}

// This subtree contains only figures belonging to lessons 04–09. Originals
// and local public assets remain in the repository; remove only build copies.
export const localAssetDirectories = ['images/processo-ux']
