import type { PRIORITY_TYPE, SORT_BY, SORT_ORDER, STATUS_TYPE } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'
import { create } from 'zustand'

export type SearchState = {
  q: string
  statuses: string[]
  priorities: string[]
  sortBy: SORT_BY
  sortOrder: string

  setQ: (v: string) => void
  setStatuses: (updater: (prev: STATUS_TYPE[]) => string[] | string[]) => void
  setPriorities: (updater: (prev: PRIORITY_TYPE[]) => string[] | string[]) => void
  setSortBy: (v: SORT_BY) => void
  setSortOrder: (v: SORT_ORDER) => void

  buildPatch: () => { q?: string; status?: string[]; priorities?: string[] }
  apply: () => void
  reset: () => void

  syncFromTodo: () => void
}

// [ ] useSearchStore - 필터가 정상작동 하는지 확인 필요
export const useSearchStore = create<SearchState>((set, get) => ({
  ...(() => {
    const s = useTodoStore.getState()
    const lf = s.listFilter ?? {}
    const sortBy = s.sortBy ?? 'at'
    const sortOrder = s.sortOrder ?? 'desc'
    const q = (lf as any).q ?? ''
    const statuses = Array.isArray((lf as any).status)
      ? ((lf as any).status as string[])
      : (lf as any).status
        ? [(lf as any).status as string]
        : []
    const priorities = (lf as any).priorities ?? []
    return { q, statuses, priorities, sortBy, sortOrder }
  })(),

  setQ: (v) => set({ q: v }),
  setStatuses: (updater) =>
    set((s) => ({
      statuses: typeof updater === 'function' ? (updater as any)(s.statuses) : (updater as any),
    })),
  setPriorities: (updater) =>
    set((s) => ({
      priorities: typeof updater === 'function' ? (updater as any)(s.priorities) : (updater as any),
    })),
  setSortBy: (v) => set({ sortBy: v }),
  setSortOrder: (v) => set({ sortOrder: v }),

  buildPatch: () => {
    const { q, statuses, priorities } = get()
    const patch: { q?: string; status?: string[]; priorities?: string[] } = {}
    const qq = (q ?? '').trim()
    if (qq) patch.q = qq
    if (Array.isArray(statuses) && statuses.length) patch.status = statuses
    if (Array.isArray(priorities) && priorities.length) patch.priorities = priorities
    return patch
  },

  apply: () => {
    const { buildPatch, sortBy, sortOrder } = get()
    const { setListFilter, listFilter, setSort } = useTodoStore.getState()

    const patch = { ...(listFilter ?? {}), ...buildPatch() }
    const empty =
      !patch.q &&
      !patch.status &&
      !patch.priorities &&
      !patch.date &&
      !patch.tagsAny &&
      !patch.tagsAll

    setListFilter(empty ? null : (patch as any))
    setSort(sortBy as any, sortOrder as any)
  },

  reset: () => {
    const { clearListFilter, setSort } = useTodoStore.getState()
    set({ q: '', statuses: [], priorities: [], sortBy: 'at', sortOrder: 'desc' })
    clearListFilter()
    setSort('at' as any, 'desc' as any)
  },

  syncFromTodo: () => {
    const s = useTodoStore.getState()
    const lf = s.listFilter ?? {}
    set({
      q: (lf as any).q ?? '',
      statuses: Array.isArray((lf as any).status)
        ? ((lf as any).status as string[])
        : (lf as any).status
          ? [(lf as any).status as string]
          : [],
      priorities: (lf as any).priorities ?? [],
      sortBy: s.sortBy ?? 'at',
      sortOrder: s.sortOrder ?? 'desc',
    })
  },
}))
