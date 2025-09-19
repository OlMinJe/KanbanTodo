import type { SORT_BY, SORT_ORDER, STATUS_TYPE, TODO } from '@/entities/todo'
import { filterTodos, TODO_STATUS, useTodoStore } from '@/entities/todo'
import { groupByStatus } from '@/widgets/chart'
import { sortTodos } from '@/widgets/todoBoard'
import { create } from 'zustand'

type BOARD_STATE = {
  ORDER: STATUS_TYPE[]
  byStatus: Record<STATUS_TYPE, TODO[]>
  recalc: () => void
}

export const useBoardStore = create<BOARD_STATE>((set, get) => ({
  ORDER: [TODO_STATUS.TODO, TODO_STATUS.DOING, TODO_STATUS.DEFER, TODO_STATUS.DONE],
  byStatus: {
    [TODO_STATUS.TODO]: [],
    [TODO_STATUS.DOING]: [],
    [TODO_STATUS.DEFER]: [],
    [TODO_STATUS.DONE]: [],
    [TODO_STATUS.REMOVE]: [],
  },
  recalc: () => {
    const {
      items,
      listFilter,
      sortBy: _sortBy,
      sortOrder: _sortOrder,
      selectedDateYMD,
    } = useTodoStore.getState()

    let list = items as TODO[]

    if (listFilter) {
      list = filterTodos(list, listFilter)
    }

    const sortBy = (_sortBy ?? 'at') as SORT_BY
    const sortOrder = (_sortOrder ?? 'desc') as SORT_ORDER
    list = sortTodos(list.slice(), sortBy, sortOrder)

    if (selectedDateYMD) {
      list = filterTodos(list, { date: selectedDateYMD })
    }

    const next = groupByStatus(list) as Record<STATUS_TYPE, TODO[]>

    const prev = get().byStatus
    if (!isByStatusEqual(prev, next, get().ORDER)) {
      set({ byStatus: next })
    }
  },
}))

function isByStatusEqual(
  a: Record<STATUS_TYPE, TODO[]> | undefined,
  b: Record<STATUS_TYPE, TODO[]>,
  order: STATUS_TYPE[]
) {
  if (!a) return false
  for (const s of order) {
    const aa = a[s] ?? []
    const bb = b[s] ?? []
    if (aa.length !== bb.length) return false
    for (let i = 0; i < aa.length; i++) {
      if (aa[i]?.id !== bb[i]?.id) return false
    }
  }
  return true
}
