import type { STATUS_TYPE } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'
import { useBoardStore } from '@/widgets/todoBoard'
import { useEffect } from 'react'

export function useBoard() {
  const ORDER = useBoardStore((s) => s.ORDER) as STATUS_TYPE[]
  const byStatus = useBoardStore((s) => s.byStatus)
  const recalc = useBoardStore((s) => s.recalc)

  useEffect(() => {
    recalc()
  }, [])

  useEffect(() => {
    const unsub = useTodoStore.subscribe((state, prev) => {
      if (
        state.items !== prev.items ||
        state.listFilter !== prev.listFilter ||
        state.sortBy !== prev.sortBy ||
        state.sortOrder !== prev.sortOrder ||
        state.selectedDateYMD !== prev.selectedDateYMD
      ) {
        recalc()
      }
    })
    return unsub
  }, [recalc])

  return { ORDER, byStatus }
}
