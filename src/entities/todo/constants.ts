import type { PRIORITY_TYPE, STATUS_TYPE } from '@/entities/todo'

export const TODO_STATUS = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done',
  REMOVE: 'remove',
  DEFER: 'defer',
} as const satisfies Record<string, STATUS_TYPE>

export const TODO_PRIORITY = {
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
} as const satisfies Record<string, PRIORITY_TYPE>

export const TODO_KEY = import.meta.env.VITE_STORAGE_TODO_KEY
