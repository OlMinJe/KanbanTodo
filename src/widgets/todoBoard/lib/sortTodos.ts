import type { SORT_BY, SORT_ORDER, TODO } from '@/entities/todo'

export function sortTodos(rows: TODO[], by: SORT_BY, order: SORT_ORDER) {
  const pick = (t: TODO): number | string => {
    if (by === 'at') {
      const raw = (t as any).updatedAt ?? (t as any).createdAt ?? (t as any).at ?? 0
      const n = typeof raw === 'string' ? Date.parse(raw) : Number(raw)
      return Number.isFinite(n) ? n : 0
    }
    return (t as any)[by] ?? ''
  }

  rows.sort((a, b) => {
    const ax = pick(a)
    const bx = pick(b)
    const cmp = ax < bx ? -1 : ax > bx ? 1 : 0
    return order === 'asc' ? cmp : -cmp
  })

  return rows
}
