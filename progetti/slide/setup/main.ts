import { installPresenterNavigation } from '../utils/presenter-navigation.mjs'

export default function setup() {
  if (!import.meta.env.VITE_CVEDI_DECK || typeof window.BroadcastChannel === 'undefined') return
  const dispose = installPresenterNavigation(window, import.meta.env.VITE_CVEDI_MENU_BASE || '/')
  import.meta.hot?.dispose(dispose)
}
