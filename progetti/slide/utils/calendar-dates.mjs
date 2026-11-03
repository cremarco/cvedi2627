import calendar from '../data/calendar.json' with { type: 'json' }

const shortDate = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short', timeZone: 'UTC' })
const fullDate = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function calendarDates(target) {
  return Object.values(calendar).flat().filter(row => row.type !== 'Annullata' && row.targets?.includes(target)).map((row, index, rows) => ({
    date: row.isoDate,
    label: shortDate.format(new Date(row.isoDate)) + (index === rows.length - 1 ? ' ' + row.isoDate.slice(0, 4) : '') + (row.delivery === 'remote' ? ' · Da remoto' : ''),
    fullLabel: fullDate.format(new Date(row.isoDate)) + (row.delivery === 'remote' ? ' · Lezione da remoto' : ''),
  }))
}
