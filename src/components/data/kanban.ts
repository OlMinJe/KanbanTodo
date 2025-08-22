import type { KanbanColumn } from '../types/kanban'

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    key: 'todo',
    title: '할 일',
    count: 2,
    dotClass: 'bg-orange-500',
  },
  {
    key: 'inprogress',
    title: '진행 중',
    count: 1,
    dotClass: 'bg-amber-500',
  },
  {
    key: 'done',
    title: '완료',
    count: 5,
    dotClass: 'bg-emerald-500',
  },
  {
    key: 'defer',
    title: '보류',
    count: 1,
    dotClass: 'bg-blue-500',
  },
]
