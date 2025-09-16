import type { TODO_FILTER } from '@/entities/todo'
import { useTodoStore, type LIST_RESULT, type SORT_BY, type SORT_ORDER } from '@/entities/todo'
import { create } from 'zustand'

const PAGE_SIZE = 5

const mapSortBy = (uiSortBy: unknown): SORT_BY => (uiSortBy === 'title' ? 'title' : 'at')

function buildQueryFromTodoStore(): {
  sortBy: SORT_BY
  order: SORT_ORDER
  filter?: TODO_FILTER
} {
  const s = useTodoStore.getState()
  return {
    sortBy: mapSortBy(s.sortBy as SORT_BY | unknown),
    order: (s.sortOrder as SORT_ORDER) ?? 'desc',
    filter: s.listFilter ?? undefined,
  }
}

function callListTodos(p: number) {
  const { listTodos } = useTodoStore.getState()
  const { sortBy, order, filter } = buildQueryFromTodoStore()
  return listTodos({
    page: p,
    pageSize: PAGE_SIZE,
    sortBy,
    order,
    filter,
  })
}

type TIMELINE_STATE = {
  page: number
  hasNext: boolean
  activities: LIST_RESULT['items']
  resetAndFetchFirst: () => void
  fetchNextPage: () => void
  fetchPage: (p: number) => void
  _loadedPages: Set<number>
}

export const useTimelineStore = create<TIMELINE_STATE>((set, get) => ({
  page: 1,
  hasNext: true,
  activities: [],
  _loadedPages: new Set<number>(),

  fetchPage: (p: number) => {
    const loaded = get()._loadedPages
    if (loaded.has(p)) return
    loaded.add(p)

    const { items, hasNext } = callListTodos(p)
    set((s) => ({
      page: p,
      hasNext: Boolean(hasNext),
      activities: p === 1 ? items : [...s.activities, ...items],
      _loadedPages: loaded,
    }))
  },

  resetAndFetchFirst: () => {
    set({
      page: 1,
      hasNext: true,
      activities: [],
      _loadedPages: new Set<number>(),
    })
    get().fetchPage(1)
  },

  fetchNextPage: () => {
    const { hasNext, page } = get()
    if (!hasNext) return
    get().fetchPage(page + 1)
  },
}))
