import { deckHref, deckLocation } from './lesson-decks.mjs'

/** Coordinate document changes; Slidev continues to synchronize slides within a deck. */
export function installPresenterNavigation(browser, menuBase) {
  const base = new URL(menuBase, browser.location.href)
  const channel = new browser.BroadcastChannel(`cvedi-deck-navigation:${base.pathname}`)
  const current = () => deckLocation(browser.location.href, base)
  const presenter = () => current()?.route.startsWith('presenter/')
  let leaving = false

  function destination(href, asPresenter) {
    const input = new URL(href, browser.location.href)
    const location = deckLocation(input.href, base)
    if (!location) return
    const slide = location.route.replace(/^presenter\//, '')
    const target = (asPresenter ? 'presenter/' : '') + slide
    const url = new URL(deckHref(location.deck.id, target + (location.query ? '?' + location.query : ''), base.pathname), base.origin)
    if (input.search) url.search = input.search
    return url
  }

  function receive({ data }) {
    // A window in another lesson, print view or presenter session must stay independent.
    const location = current()
    if (leaving || !location || presenter() || /^(?:print|overview|notes)(?:\/|$)/.test(location.route)) return
    if (data?.from !== location.root || typeof data?.to !== 'string') return
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
    if (!url || deckLocation(url.href, base)?.root === current()?.root) return
    event.preventDefault()
    leaving = true
    channel.postMessage({ from: current().root, to: url.href })
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
