import type { TODO_PRIORITY, TODO_STATUS } from '@/entities/todo'

// 숫자 우선순위
export type PRIORITY_TYPE = (typeof TODO_PRIORITY)[keyof typeof TODO_PRIORITY]

// 작업 상태
export type STATUS_TYPE = (typeof TODO_STATUS)[keyof typeof TODO_STATUS]

export interface TODO {
  id: string // UUID
  title: string // [필수]
  status: STATUS_TYPE // [필수]
  priority: PRIORITY_TYPE // [필수]

  // 날짜/시간 (단일 or 기간)
  isRange: boolean // true면 기간
  date?: string // YYYY-MM-DD (단일)
  startDate?: string // YYYY-MM-DD (기간 시작)
  endDate?: string // YYYY-MM-DD (기간 종료)
  time?: string // HH:mm:ss (단일)
  startTime?: string // HH:mm:ss (기간 시작 시간)
  endTime?: string // HH:mm:ss (기간 종료 시간)

  description?: string | null // [선택]
  tags?: string[] // [선택]

  // 상태별 메타
  onHoldReason?: string | null
  retryAt?: string | null // YYYY-MM-DD

  completionNote?: string | null
  completionEmoji?: string | null
  completedAt?: string | null // ISODateTime

  // 감사/감시
  createdAt: string // ISODateTime
  updatedAt: string // ISODateTime
  deletedAt?: string | null // ISODateTime
  deleteReason?: string | null // [선택]
}
