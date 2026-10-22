let closeActive: (() => void) | undefined

/** Only the tooltip currently being read owns global dismissal listeners. */
export function claimAcronymTooltip(close: () => void) {
  if (closeActive !== close) closeActive?.()
  closeActive = close
}
export function releaseAcronymTooltip(close: () => void) {
  if (closeActive === close) closeActive = undefined
}
