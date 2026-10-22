import summary from './grade-summary.json'

export type GradeCategory = keyof typeof summary.categories
export const grades = summary.categories
export const gradeBands = summary.bands.map(label => label === '30+' ? '30 o più' : label.replace('-', '–'))
export const gradeTones = ['grade-tone-low', 'grade-tone-mid', 'grade-tone-high', 'grade-tone-top']

const percentFormat = new Intl.NumberFormat('it-IT', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function gradePercent(count: number, total: number): string {
  return percentFormat.format(total ? count / total : 0)
}

export function gradeNumber(value: number): string {
  return value.toLocaleString('it-IT')
}
