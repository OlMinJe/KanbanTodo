import { includesYMD, TODO_STATUS, useTodoStore, type TODO } from '@/entities/todo'
import { asYMD } from '@/shared/lib'
import { create } from 'zustand'

type TOOLBAR_STATE = {
  open: boolean
  count: number
  setOpen: (v: boolean) => void
  recalc: () => void
}

export const useToolbarStore = create<TOOLBAR_STATE>((set) => ({
  open: false,
  count: 0,
  setOpen: (v) => set({ open: v }),
  recalc: () => {
    const s = useTodoStore.getState()
    const items = (s.items ?? []) as TODO[]
    const ymd = asYMD(s.selectedDateYMD as string | Date)
    const today = items.filter(
      (t) => (!ymd || includesYMD(t, ymd)) && t.status !== TODO_STATUS.REMOVE
    )
    set({ count: today.length })
  },
}))
