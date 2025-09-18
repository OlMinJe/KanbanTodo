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

export const useBoardStore = create<BOARD_STATE>((set) => ({
  ORDER: [TODO_STATUS.TODO, TODO_STATUS.DOING, TODO_STATUS.DEFER, TODO_STATUS.DONE],
  byStatus: {
    [TODO_STATUS.TODO]: [],
    [TODO_STATUS.DOING]: [],
    [TODO_STATUS.DEFER]: [],
    [TODO_STATUS.DONE]: [],
    [TODO_STATUS.REMOVE]: [],
  },
  recalc: () => {
    const s = useTodoStore.getState()
    const items = s.items as TODO[]
    const listFilter = s.listFilter
    const sortBy = (s.sortBy ?? 'at') as SORT_BY
    const sortOrder = (s.sortOrder ?? 'desc') as SORT_ORDER
    const selectedDateYMD = s.selectedDateYMD

    // 필터
    const filtered = listFilter ? filterTodos(items, listFilter) : items
    // 정렬
    const visible = sortTodos([...filtered], sortBy, sortOrder)
    // 날짜 필터
    const todos = filterTodos(visible, { date: selectedDateYMD })
    // 상태별 그룹
    const byStatus = groupByStatus(todos)

    set({ byStatus })
  },
}))
