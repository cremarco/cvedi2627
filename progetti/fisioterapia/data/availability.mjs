import { brand, professionals } from './content.mjs'

export const coveredCaps = ['20121', '20122', '20123', '20124', '20125', '20126', '20159', '20161']
export const isCalendarDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value + 'T12:00:00Z')) && new Date(value + 'T12:00:00Z').toISOString().slice(0, 10) === value
export const isCovered = cap => coveredCaps.includes(cap)
export const isOfferedDay = query => query?.date === brand.date && query?.period === 'sera'
export const isOfferedSlot = (id, date, time) => date === brand.date && professionals.some(person => person.id === id && person.times.includes(time))
export const isOfferedProposal = proposal => typeof proposal?.address === 'string' && proposal.address.trim().length >= 5 && isCovered(proposal.cap) && isOfferedDay(proposal) && isOfferedSlot(proposal.professional, proposal.date, proposal.time)
