const root = document.documentElement
const prefix = root.dataset.legacyProjectPrefix
if (prefix && location.pathname.startsWith(prefix)) {
  const relative = location.pathname.slice(prefix.length).replace(/^\/+/, '')
  const destination = new URL(relative, root.dataset.projectArchive)
  destination.search = location.search
  destination.hash = location.hash
  document.querySelector('[data-archive-link]').href = destination.href
  location.replace(destination.href)
}
