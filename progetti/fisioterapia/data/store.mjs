import { isCalendarDate, isOfferedProposal, isOfferedSlot } from './availability.mjs'

const key = 'passo-visite-v1'
let memory = []
export let storageAvailable = true
export function readBookings() {
  if (!storageAvailable) return memory
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]')
    if (!Array.isArray(value)) return []
    memory = value.filter(item => item && typeof item.id === 'string' && ['pending', 'confirmed', 'declined', 'cancelled'].includes(item.status) && typeof item.professional === 'string' && isCalendarDate(item.date) && typeof item.time === 'string')
    return memory
  } catch { storageAvailable = false; return memory }
}
export function saveBookings(bookings) {
  memory = bookings
  try { localStorage.setItem(key, JSON.stringify(bookings)) } catch { storageAvailable = false }
}
export function clearBookings() { saveBookings([]) }
export function available(professional, date, time, ignoreId = '') {
  if (!isOfferedSlot(professional, date, time)) return false
  return !readBookings().some(item => item.id !== ignoreId && ['pending', 'confirmed'].includes(item.status) && ((item.professional === professional && item.date === date && item.time === time) || (item.change?.professional === professional && item.change?.date === date && item.change?.time === time)))
}
export function respond(id, accepted) {
  const bookings = readBookings()
  const item = bookings.find(booking => booking.id === id)
  if (!item || !(item.status === 'pending' || item.status === 'confirmed' && item.change)) return false
  const proposal = item.change ? { ...item, ...item.change } : item
  if (accepted && (!isOfferedProposal(proposal) || !available(proposal.professional, proposal.date, proposal.time, item.id))) return false
  if (item.change) {
    if (accepted) { Object.assign(item, item.change); item.lastChange = 'La modifica è stata accettata.' }
    else item.lastChange = 'La modifica non è stata accettata. La visita precedente resta confermata.'
    delete item.change
  } else if (item.status === 'pending') item.status = accepted ? 'confirmed' : 'declined'
  saveBookings(bookings)
  return true
}
