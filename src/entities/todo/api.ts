import { create } from 'zustand'
import { combine, createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import {
  TODO_PRIORITY,
  TODO_STATUS,
  type PRIORITY_TYPE,
  type STATUS_TYPE,
  type SUBMIT_PAYLOAD,
  type TODO,
} from '@/entities/todo'
import { fromISO, uuidv4 } from '@/shared/lib'

// helpers ---------------------------------
const STORAGE_KEY = '@kanban/todos'

export function todoCreateDTO(p: SUBMIT_PAYLOAD): TODO {
  const now = new Date().toISOString()
  const status: STATUS_TYPE = (p.taskStatus || TODO_STATUS.TODO) as STATUS_TYPE
  const priority: PRIORITY_TYPE = (p.priority || TODO_PRIORITY.P2) as PRIORITY_TYPE

  const base: TODO = {
    id: uuidv4(),
    title: p.title.trim(),
    status,
    priority,
    isRange: p.schedule.type === 'range',
    description: p.description?.trim() || null,
    tags: [],
    createdAt: now,
    updatedAt: now,
  }

  if (p.schedule.type === 'single') {
    const { date, time } = fromISO(p.schedule.at!)
    return { ...base, isRange: false, date, time }
  }

  const s = fromISO(p.schedule.start!)
  const e = fromISO(p.schedule.end!)
  return {
    ...base,
    isRange: true,
    startDate: s.date,
    startTime: s.time,
    endDate: e.date,
    endTime: e.time,
  }
}

function normalizeUpdateFromPayload(base: TODO, p: SUBMIT_PAYLOAD): TODO {
  const now = new Date().toISOString()
  let next: TODO = {
    ...base,
    title: p.title.trim(),
    status: (p.taskStatus || base.status) as STATUS_TYPE,
    priority: (p.priority || base.priority) as PRIORITY_TYPE,
    description: p.description?.trim() || null,
    isRange: p.schedule.type === 'range',
    updatedAt: now,
  }

  if (p.schedule.type === 'single') {
    const { date, time } = fromISO(p.schedule.at!)
    next = {
      ...next,
      isRange: false,
      date,
      time,
      startDate: undefined,
      startTime: undefined,
      endDate: undefined,
      endTime: undefined,
    }
  } else {
    const s = fromISO(p.schedule.start!)
    const e = fromISO(p.schedule.end!)
    next = {
      ...next,
      isRange: true,
      startDate: s.date,
      startTime: s.time,
      endDate: e.date,
      endTime: e.time,
      date: undefined,
      time: undefined,
    }
  }

  return next
}

/* ---------------------------------  ---------------------------------- */

// store ---------------------------------
type TodoState = {
  items: TODO[]
}

type TodoActions = {
  createFromPayload: (payload: SUBMIT_PAYLOAD) => TODO
  updateFromPayload: (id: string, payload: SUBMIT_PAYLOAD) => TODO | undefined
  updateTodo: (id: string, patch: Partial<TODO>) => TODO | undefined
  removeTodo: (id: string) => boolean
  getTodo: (id: string) => TODO | undefined
  listTodos: () => TODO[]
  clearAll: () => void
}

const initialState: TodoState = {
  items: [],
}

export const useTodoStore = create<TodoState & TodoActions>()(
  persist(
    subscribeWithSelector(
      immer(
        combine(initialState, (set, get) => ({
          createFromPayload: (payload) => {
            const record = todoCreateDTO(payload)
            set((s) => {
              s.items.push(record)
            })
            return record
          },

          updateFromPayload: (id, payload) => {
            const idx = get().items.findIndex((t) => t.id === id)
            if (idx < 0) return
            set((s) => {
              const current = s.items[idx]
              s.items[idx] = normalizeUpdateFromPayload(current, payload)
            })
            return get().items[idx]
          },

          updateTodo: (id, patch) => {
            const idx = get().items.findIndex((t) => t.id === id)
            if (idx < 0) return
            set((s) => {
              const next = {
                ...s.items[idx],
                ...patch,
                updatedAt: new Date().toISOString(),
              } as TODO
              s.items[idx] = next
            })
            return get().items[idx]
          },

          removeTodo: (id) => {
            const before = get().items.length
            set((s) => {
              s.items = s.items.filter((t) => t.id !== id)
            })
            return get().items.length !== before
          },

          getTodo: (id) => get().items.find((t) => t.id === id),
          listTodos: () => get().items.slice(),

          clearAll: () => set((s) => void (s.items = [])),
        }))
      )
    ),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted: any) => {
        if (!persisted) return { items: [] }
        return persisted
      },
      partialize: (s) => ({ items: s.items }),
    }
  )
)

// API ------------------------------
export async function createTodo(payload: SUBMIT_PAYLOAD): Promise<TODO> {
  return useTodoStore.getState().createFromPayload(payload)
}

export async function listTodos(): Promise<TODO[]> {
  return useTodoStore.getState().listTodos()
}

export async function getTodo(id: string): Promise<TODO | undefined> {
  return useTodoStore.getState().getTodo(id)
}

export async function updateTodo(
  id: string,
  payload: TODO | Partial<TODO>
): Promise<TODO | undefined> {
  return useTodoStore.getState().updateTodo(id, payload)
}

export async function removeTodo(id: string): Promise<boolean> {
  return useTodoStore.getState().removeTodo(id)
}
