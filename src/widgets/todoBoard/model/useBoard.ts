import { useTodoStore, type STATUS_TYPE, type TODO } from '@/entities/todo'
import { useEffect } from 'react'
import { useBoardStore } from './store'

const EMPTY_BY_STATUS = {
  todo: [] as TODO[],
  doing: [] as TODO[],
  defer: [] as TODO[],
  done: [] as TODO[],
  remove: [] as TODO[],
} satisfies Record<STATUS_TYPE, TODO[]>

export function useBoard() {
  const ORDER = useBoardStore((s) => s.ORDER)
  const byStatus = useBoardStore((s) => s.byStatus) ?? EMPTY_BY_STATUS
  const recalc = useBoardStore((s) => s.recalc)

  const selectedDateYMD = useTodoStore((s) => s.selectedDateYMD)

  useEffect(() => {
    recalc()
  }, [recalc])

  useEffect(() => {
    recalc()
  }, [recalc, selectedDateYMD])

  useEffect(() => {
    const unsub = useTodoStore.subscribe((state, prev) => {
      if (
        state.items !== prev.items ||
        state.listFilter !== prev.listFilter ||
        state.sortBy !== prev.sortBy ||
        state.sortOrder !== prev.sortOrder
      ) {
        recalc()
      }
    })
    return unsub
  }, [recalc])

  return { ORDER, byStatus, recalc }
}
