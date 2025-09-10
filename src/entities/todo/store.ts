import type { SUBMIT_PAYLOAD, TODO, TODO_HISTORY } from '@/entities/todo'
import { normalizeUpdateFromPayload, TODO_KEY, todoCreateDTO } from '@/entities/todo'
import { create } from 'zustand'
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'

type TodoState = {
  items: TODO[]
}

type TodoActions = {
  createFromPayload: (payload: SUBMIT_PAYLOAD) => TODO
  updateFromPayload: (id: string, payload: SUBMIT_PAYLOAD) => TODO | undefined
  updateTodo: (
    id: string,
    patch: Partial<TODO> & { meta?: TODO_HISTORY['meta'] }
  ) => TODO | undefined
  removeTodo: (id: string) => boolean
  getTodo: (id: string) => TODO | undefined
  listTodos: () => TODO[]
  clearAll: () => void
}

const initialState: TodoState = { items: [] }

export const useTodoStore = create<TodoState & TodoActions>()(
  persist(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      createFromPayload: (payload) => {
        const record = todoCreateDTO(payload)
        set((s) => ({ items: [...s.items, record] }))
        return record
      },

      updateFromPayload: (id, payload) => {
        const idx = get().items.findIndex((t) => t.id === id)
        if (idx < 0) return
        set((s) => ({
          items: s.items.map((t, i) => (i === idx ? normalizeUpdateFromPayload(t, payload) : t)),
        }))
        return get().items[idx]
      },

      updateTodo: (id, patch) => {
        const idx = get().items.findIndex((t) => t.id === id)
        if (idx < 0) return

        const prev = get().items[idx]
        const now = new Date().toISOString()

        const { meta, ...rest } = patch as { meta?: TODO_HISTORY['meta'] } & Partial<TODO>
        let next: TODO = {
          ...prev,
          ...rest,
          updatedAt: now,
        }

        if (patch.status && patch.status !== prev.status) {
          const entry = {
            at: now,
            from: prev.status,
            to: patch.status,
            meta: patch.meta,
          }
          next.history = [...(prev.history ?? []), entry]
        }

        set((s) => ({
          items: s.items.map((t, i) => (i === idx ? next : t)),
        }))
        return get().items[idx]
      },

      removeTodo: (id) => {
        const before = get().items.length
        set((s) => ({ items: s.items.filter((t) => t.id !== id) }))
        return get().items.length !== before
      },

      getTodo: (id) => get().items.find((t) => t.id === id),
      listTodos: () => get().items.slice(),
      clearAll: () => set(() => ({ items: [] })),
    })),
    {
      name: TODO_KEY,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted: any) => {
        if (!persisted) return { items: [] }
        return persisted
      },
      partialize: (s) => ({ items: s.items }),
    }
  )
)
