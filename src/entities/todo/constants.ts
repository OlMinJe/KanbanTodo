import type { PRIORITY_TYPE, STATUS_TYPE } from '@/entities/todo'

// 작업 상태
export const TODO_STATUS = {
  TODO: 'todo',
  HOLD: 'hold',
  IN_PROGRESS: 'inProgress',
  COMPLETE: 'complete',
  REMOVE: 'remove',
} as const

// 우선순위
export const TODO_PRIORITY = {
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
} as const

// 값 배열
export const PRIORITY_VALUES = Object.values(TODO_PRIORITY) as PRIORITY_TYPE[]
export const STATUS_VALUES = Object.values(TODO_STATUS) as STATUS_TYPE[]
