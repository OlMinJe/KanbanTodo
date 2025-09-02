import { type TODO_COLUMNS } from '@/features/todoWrite'
import { type OPTION } from '@/shared/ui/form'

export const TASK_STATUS_OPTIONS: OPTION[] = [
  { value: '0', label: '할 일' },
  { value: '1', label: '진행중' },
  { value: '2', label: '완료' },
  { value: '3', label: '보류' },
]

export const PRIOITY_OPTIONS: OPTION[] = [
  { value: '1', label: '1순위' },
  { value: '2', label: '2순위' },
  { value: '3', label: '3순위' },
]

export const TODO_COLUMNS_DATA: TODO_COLUMNS[] = [
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
