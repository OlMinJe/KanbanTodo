import type { SUBMIT_PAYLOAD, TODO, TODO_FILTER, TODO_HISTORY } from '@/entities/todo'
import {
  filterTodos,
  includesYMD,
  matchPriority,
  matchQuery,
  matchStatus,
  matchTags,
  normalizeUpdateFromPayload,
  TODO_KEY,
  todoCreateDTO,
} from '@/entities/todo'
import { asYMD } from '@/shared/lib'
import { create } from 'zustand'
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'

type TodoState = {
  items: TODO[]
  selectedDateYMD?: string
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
  filterTodos: (items: TODO[], filter: TODO_FILTER) => TODO[]
  clearAll: () => void
  setSelectedDate: (d?: Date | string) => void
}

const initialState: TodoState = { items: [], selectedDateYMD: asYMD(new Date()) }

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
        // const before = get().items.length
        // set((s) => ({ items: s.items.filter((t) => t.id !== id) }))
        // return get().items.length !== before
        const prev = get().items.find((t) => t.id === id)
        if (!prev) return false
        if (prev.status === 'remove') return false

        const updated = get().updateTodo(id, { status: 'remove' })
        return !!updated
      },

      getTodo: (id) => get().items.find((t) => t.id === id),
      listTodos: () => get().items.slice(),
      filterTodos: (items: TODO[], filter: TODO_FILTER = {}) => {
        const ymd = filter.date ? asYMD(filter.date) : undefined
        return (items ?? []).filter(
          (t) =>
            (!ymd || includesYMD(t, ymd)) &&
            matchStatus(t, filter.status) &&
            matchPriority(t, filter.priorities) &&
            matchTags(t, filter.tagsAny, filter.tagsAll) &&
            matchQuery(t, filter.q)
        )
      },
      clearAll: () => set(() => ({ items: [] })),
      setSelectedDate: (d) => set({ selectedDateYMD: d ? asYMD(d) : undefined }),
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

export const selectTodosFiltered =
  (filter: TODO_FILTER = {}) =>
  (s: TodoState): TODO[] =>
    filterTodos(s.items, filter)

export const selectTodosByDate =
  (date: Date | string) =>
  (s: TodoState): TODO[] =>
    filterTodos(s.items, { date })

export const selectSelectedDateYMD = (s: TodoState) => s.selectedDateYMD
export const selectTodosBySelectedDate = (s: TodoState): TODO[] =>
  filterTodos(s.items, { date: s.selectedDateYMD })
export const selectTodoById =
  (id: string) =>
  (s: TodoState): TODO | undefined =>
    s.items.find((t) => t.id === id)
export const selectTodoCount = (s: TodoState): number => s.items.length
