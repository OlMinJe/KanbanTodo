import type { PRIORITY_TYPE, STATUS_TYPE } from '@/entities/todo'

// 우선순위
export const TODO_PRIORITY = {
  P1: 1,
  P2: 2,
  P3: 3,
} as const

// 작업 상태
export const TODO_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  ON_HOLD: 'ON_HOLD',
} as const

// 값 배열
export const PRIORITY_VALUES = Object.values(TODO_PRIORITY) as PRIORITY_TYPE[]
export const STATUS_VALUES = Object.values(TODO_STATUS) as STATUS_TYPE[]

export const STATUS_LABEL: Record<STATUS_TYPE, string> = {
  TODO: '할 일',
  IN_PROGRESS: '진행중',
  DONE: '완료',
  ON_HOLD: '보류',
}
