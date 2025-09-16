import { useTodoStore } from '@/entities/todo'
import { useToolbarStore } from '@/widgets/todoToolbar'
import { useEffect } from 'react'

export function useToolbar() {
  const open = useToolbarStore((s) => s.open)
  const setOpen = useToolbarStore((s) => s.setOpen)
  const count = useToolbarStore((s) => s.count)
  const recalc = useToolbarStore((s) => s.recalc)

  useEffect(() => {
    recalc()
  }, [recalc])

  useEffect(() => {
    const unsub = useTodoStore.subscribe((state, prev) => {
      if (state.items !== prev.items || state.selectedDateYMD !== prev.selectedDateYMD) {
        recalc()
      }
    })
    return unsub
  }, [recalc])

  return { open, setOpen, count }
}
