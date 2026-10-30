import registry from './processo-ux-ui-tables.json' with { type: 'json' }
import smart from './ux-smart.json' with { type: 'json' }

export { registry }

// SMART keeps one source of truth for both its lesson content and native tables.
export const lessonTables = {
  ...registry.tables,
  ...Object.fromEntries(smart.criteria.filter(item => item.rows?.length).map(item => [
    `/images/processo-ux-ui/${item.code}.svg`,
    { title: `${item.letter} · ${item.label}`, headers: [], widths: [24, 76],
      rows: item.rows, panels: item.panels ?? [], note: item.note, caption: '' },
  ])),
}

// Content uses semantic table codes; legacy image URLs remain provenance keys.
export const processTables = Object.fromEntries(Object.entries(lessonTables).map(([asset, definition]) => [
  asset.split('/').at(-1).replace('.svg', ''), definition,
]))
