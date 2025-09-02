import type { ALERT_ITEM, ALERT_ITEM_INPUT } from '@/shared/notification'
import { create } from 'zustand'

interface ALERT_STATE {
  items: ALERT_ITEM[]
  push: (i: ALERT_ITEM_INPUT) => string
  remove: (id: string) => void
  clear: () => void
}

export const useAlertStore = create<ALERT_STATE>((set) => ({
  items: [],
  push: (item: ALERT_ITEM_INPUT) => {
    const id = String(Math.random())
    const newItem: ALERT_ITEM = { id, ...item }
    set((s) => ({ items: [...s.items, newItem] }))
    return id
  },
  remove: (id: string) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
  clear: () => set({ items: [] }),
}))
