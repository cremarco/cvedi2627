import { deckDirectory, lessonDecks } from './lesson-decks.mjs'

/** Coordinate document changes; Slidev continues to synchronize slides within a deck. */
export function installPresenterNavigation(browser, menuBase) {
  const base = new URL(menuBase, browser.location.href)
  const paths = new Set(lessonDecks.map(deck => base.pathname + deckDirectory(deck.id)))
  const channel = new browser.BroadcastChannel(`cvedi-deck-navigation:${base.pathname}`)
  const presenter = () => browser.location.hash.startsWith('#/presenter/')
  let leaving = false

  function destination(href, asPresenter) {
    const url = new URL(href, browser.location.href)
    if (url.origin !== base.origin || !paths.has(url.pathname) || !url.hash.startsWith('#/')) return
    const slide = url.hash.slice(2).replace(/^presenter\//, '')
    url.hash = `#/${asPresenter ? 'presenter/' : ''}${slide}`
    return url
  }

  function receive({ data }) {
    // A window in another lesson, print view or presenter session must stay independent.
    if (leaving || presenter() || !browser.location.hash.startsWith('#/') || /^#\/(?:print|overview|notes)(?:\/|$)/.test(browser.location.hash)) return
    if (data?.from !== browser.location.pathname || typeof data?.to !== 'string') return
    const url = destination(data.to, false)
    if (!url) return
    leaving = true
    browser.location.assign(url.href)
  }

  function click(event) {
    if (leaving || !presenter() || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest?.('a.slide-action, a.lesson-deck-menu')
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
    const url = destination(link.href, true)
    if (!url || url.pathname === browser.location.pathname) return
    event.preventDefault()
    leaving = true
    channel.postMessage({ from: browser.location.pathname, to: url.href })
    browser.location.assign(url.href)
  }

  function resume() { leaving = false }
  browser.addEventListener('pageshow', resume)
  channel.addEventListener('message', receive)
  browser.document.addEventListener('click', click, true)
  return () => {
    browser.removeEventListener('pageshow', resume)
    channel.close()
    browser.document.removeEventListener('click', click, true)
  }
}
