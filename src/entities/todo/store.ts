import type {
  LIST_PAYLOAD,
  LIST_RESULT,
  SORT_BY,
  SORT_ORDER,
  SUBMIT_PAYLOAD,
  TODO,
  TODO_FILTER,
  TODO_HISTORY,
} from '@/entities/todo'
import {
  filterTodos,
  matchDate,
  matchPriority,
  matchQuery,
  matchStatus,
  matchTags,
  TODO_KEY,
  todoCreateDTO,
} from '@/entities/todo'
import { asYMD, toServerTZ, toTZDateISO, toTZTimeISO } from '@/shared/lib'
import { create } from 'zustand'
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'

type TOTO_STATE = {
  items: TODO[]
  selectedDateYMD?: string
  listFilter: TODO_FILTER | null
  sortBy: SORT_BY
  sortOrder: SORT_ORDER
}

type TOTO_ACTIONS = {
  createTodo: (payload: SUBMIT_PAYLOAD) => TODO
  updateTodo: (
    id: string,
    patch: Partial<TODO> & { meta?: TODO_HISTORY['meta'] }
  ) => TODO | undefined
  removeTodo: (id: string) => boolean
  getTodo: (id: string) => TODO | undefined
  listTodos: (opts?: LIST_PAYLOAD) => LIST_RESULT
  filterTodos: (items: TODO[], filter?: TODO_FILTER) => TODO[]
  clearAll: () => void
  setSelectedDate: (d?: Date | string) => void
  setListFilter: (f: TODO_FILTER | null) => void
  setSort: (by: SORT_BY, order?: SORT_ORDER) => void
  clearListFilter: () => void
}

const initialState: TOTO_STATE = {
  items: [],
  selectedDateYMD: asYMD(new Date()),
  listFilter: null,
  sortBy: 'at',
  sortOrder: 'desc',
}

export const useTodoStore = create<TOTO_STATE & TOTO_ACTIONS>()(
  persist(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      createTodo: (payload) => {
        const record = todoCreateDTO(payload)
        const now = record.createdAt ?? new Date()

        const entry: TODO_HISTORY = {
          at: toServerTZ(now),
          from: record.status,
          to: record.status,
          prevDate: record.dateSingle,
          prevTime: record.timeSingle,
        }

        const withHistory: TODO = {
          ...record,
          updatedAt: toServerTZ(now),
          history: [...(record.history ?? []), entry],
        }

        set((s) => ({ items: [...s.items, withHistory] }))
        return withHistory
      },

      updateTodo: (id, patch) => {
        const idx = get().items.findIndex((t) => t.id === id)
        if (idx < 0) return

        const prev = get().items[idx]
        const now = new Date()

        const { meta, ...rest } = patch as { meta?: TODO_HISTORY['meta'] } & Partial<TODO>
        let next: TODO = {
          ...prev,
          ...rest,
          updatedAt: toServerTZ(now),
        }

        if (patch.meta?.retryDate && patch.meta?.retryTime) {
          next.dateSingle = toTZDateISO(patch.meta?.retryDate)
          next.timeSingle = toTZTimeISO(patch.meta?.retryTime)
        }

        if (patch.status && patch.status !== prev.status) {
          const entry = {
            at: toServerTZ(now),
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
      listTodos: (opts?: LIST_PAYLOAD) => {
        // [ ] listTodos - 날짜/시간 파싱 체크
        const { page = 1, pageSize = 20, sortBy = 'at', order = 'desc', filter } = opts ?? {}

        const base = get().items
        const filtered = filter ? filterTodos(base, filter) : base

        const rows: LIST_RESULT['items'] = []
        for (const t of filtered) {
          const hs = t.history ?? []
          for (const h of hs) {
            const at = h.at ?? t.updatedAt ?? t.createdAt ?? ''
            const key = `${t.id}|${h.at ?? ''}|${h.from ?? ''}|${h.to ?? ''}`
            rows.push({ key, todo: t, history: h, at })
          }
        }

        const itemList: typeof rows = []
        const seen = new Set<string>()
        for (const r of rows) {
          if (seen.has(r.key)) continue
          seen.add(r.key)
          itemList.push(r)
        }

        const sorted = itemList.sort((a, b) => {
          let ax: number | string = a[sortBy as keyof typeof a] as any
          let bx: number | string = b[sortBy as keyof typeof b] as any
          ax = typeof ax === 'string' ? Date.parse(ax) || 0 : (ax as any)
          bx = typeof bx === 'string' ? Date.parse(bx) || 0 : (bx as any)
          const cmp = ax < bx ? -1 : ax > bx ? 1 : 0
          return order === 'asc' ? cmp : -cmp
        })

        const size = Math.max(1, pageSize)
        const cur = Math.max(1, page)
        const start = (cur - 1) * size
        const end = start + size

        const total = sorted.length
        const pages = Math.max(1, Math.ceil(total / size))
        const items = sorted.slice(start, end)

        return {
          items,
          page: cur,
          pageSize: size,
          total,
          pages,
          hasPrev: cur > 1,
          hasNext: end < total,
        }
      },
      filterTodos: (items: TODO[], filter: TODO_FILTER = {}) => {
        if (!items?.length) return []
        const { date, status, priorities, tagsAny, tagsAll, q } = filter

        return items.filter(
          (t) =>
            matchDate(t, date) &&
            matchStatus(t, status) &&
            matchPriority(t, priorities) &&
            matchTags(t, tagsAny, tagsAll) &&
            matchQuery(t, q)
        )
      },
      clearAll: () => set(() => ({ items: [] })),
      setSelectedDate: (d) => {
        set((prev) => {
          const ymd = d ? asYMD(d as string | Date) : undefined
          if (prev.selectedDateYMD === ymd) return prev
          return { selectedDateYMD: ymd }
        })
      },
      setListFilter: (f) => set(() => ({ listFilter: f })),
      clearListFilter: () => set(() => ({ listFilter: null })),
      setSort: (by, order) =>
        set((s) => ({
          sortBy: by,
          sortOrder: order ?? s.sortOrder,
        })),
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
