import type { KANBAN_MODE, KANBAN_STATUS, KANBAN_VRIANT } from '@/types/dialog'
import { create } from 'zustand'

type KANBAN_INITISTATE = {
  mode: KANBAN_MODE
  setMode: (m: KANBAN_MODE) => void
  taskStatus: KANBAN_STATUS | ''
  setTaskStatus: (s: KANBAN_STATUS | '') => void
  editOpen: boolean
  editVariant: KANBAN_VRIANT
  openEditByStatus: (s: KANBAN_STATUS | '') => void
  closeEdit: () => void
}

export const useKanbanStore = create<KANBAN_INITISTATE>((set) => ({
  mode: 'read',
  setMode: (m) => set({ mode: m }),
  taskStatus: '',
  setTaskStatus: (s) => set({ taskStatus: s }),
  editOpen: false,
  editVariant: 'markAsComplete',
  openEditByStatus: (s) =>
    set({
      editOpen: true,
      editVariant:
        s === 'todo'
          ? 'markAsTodo'
          : s === 'hold'
            ? 'markAsHold'
            : s === 'complete'
              ? 'markAsComplete'
              : 'markAsComplete',
    }),
  closeEdit: () => set({ editOpen: false }),
}))
