import type { PRIORITY_TYPE, SORT_BY, SORT_ORDER, STATUS_TYPE } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'
import { useSearchStore } from '@/features/search'
import { useEffect } from 'react'

export type USE_SEARCH = {
  q: string
  setQ: (v: string) => void
  statuses: string[]
  setStatuses: (updater: (prev: STATUS_TYPE[]) => string[] | string[]) => void
  priorities: string[]
  setPriorities: (updater: (prev: PRIORITY_TYPE[]) => string[] | string[]) => void
  sortBy: string
  setSortBy: (v: SORT_BY) => void
  sortOrder: string
  setSortOrder: (v: SORT_ORDER) => void
  apply: () => void
  reset: () => void
  buildPatch: () => { q?: string; status?: string[]; priorities?: string[] }
}

export function useSearch(): USE_SEARCH {
  const q = useSearchStore((s) => s.q)
  const setQ = useSearchStore((s) => s.setQ)

  const statuses = useSearchStore((s) => s.statuses)
  const setStatuses = useSearchStore((s) => s.setStatuses)

  const priorities = useSearchStore((s) => s.priorities)
  const setPriorities = useSearchStore((s) => s.setPriorities)

  const sortBy = useSearchStore((s) => s.sortBy)
  const setSortBy = useSearchStore((s) => s.setSortBy)

  const sortOrder = useSearchStore((s) => s.sortOrder)
  const setSortOrder = useSearchStore((s) => s.setSortOrder)

  const apply = useSearchStore((s) => s.apply)
  const reset = useSearchStore((s) => s.reset)
  const buildPatch = useSearchStore((s) => s.buildPatch)
  const syncFromTodo = useSearchStore((s) => s.syncFromTodo)

  useEffect(() => {
    const unsub = useTodoStore.subscribe((state, prev) => {
      if (
        state.listFilter !== prev.listFilter ||
        state.sortBy !== prev.sortBy ||
        state.sortOrder !== prev.sortOrder
      ) {
        syncFromTodo()
      }
    })
    return unsub
  }, [syncFromTodo])

  return {
    q,
    setQ,
    statuses,
    setStatuses,
    priorities,
    setPriorities,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    apply,
    reset,
    buildPatch,
  }
}
