import type { STATUS_TYPE, TODO } from '@/entities/todo'
import { TODO_STATUS } from '@/entities/todo'

// TODO 중복인데 shared로 뺴야할까
export function groupByStatus(todos: TODO[]) {
  const g: Record<STATUS_TYPE, TODO[]> = {
    [TODO_STATUS.TODO]: [],
    [TODO_STATUS.DOING]: [],
    [TODO_STATUS.DEFER]: [],
    [TODO_STATUS.DONE]: [],
    [TODO_STATUS.REMOVE]: [],
  }
  for (const t of todos) g[t.status]?.push(t)
  return g
}
