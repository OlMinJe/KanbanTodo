import type { RAW_DATE } from '@/shared/lib'

export type STATUS_TYPE = 'todo' | 'doing' | 'done' | 'remove' | 'defer'
export type PRIORITY_TYPE = 'P1' | 'P2' | 'P3'

export type TODO_MODE = 'create' | 'update'

export type SUBMIT_PAYLOAD = {
  title: string
  status: STATUS_TYPE
  priority: PRIORITY_TYPE
  description?: string | null
  dateSingle: string | null
  timeSingle: string | null
}

export type SORT_BY = 'at' | 'priority' | 'title' | 'status' | 'updatedAt' | 'createdAt'
export type SORT_ORDER = 'asc' | 'desc'

export type LIST_PAYLOAD = {
  page?: number
  pageSize?: number
  sortBy?: SORT_BY
  order?: 'asc' | 'desc'
  filter?: TODO_FILTER
}

export type LIST_RESULT = {
  items: { todo: TODO; history: NonNullable<TODO['history']>[number]; key: string; at: string }[]
  page: number
  pageSize: number
  total: number
  pages: number
  hasPrev: boolean
  hasNext: boolean
}

export type TODO_STATUS_META = {
  reason?: string // 삭제/보류/되돌리기 사유 등
  mood?: string // 완료 시 선택한 이모지
  retryDate?: RAW_DATE
  retryTime?: string | null
}

export type TODO_HISTORY = {
  at: string | null
  from: STATUS_TYPE // 이전 상태
  to: STATUS_TYPE // 바뀐 상태
  prevDate?: string | null
  prevTime?: string | null
  meta?: TODO_STATUS_META
}

// [ ] 타입 분리 필요
export type TODO = {
  id: string
  title: string
  status: STATUS_TYPE
  priority: PRIORITY_TYPE
  description?: string | null
  tags?: []
  createdAt: string | null
  updatedAt?: string | null
  dateSingle?: string | null
  timeSingle?: string | null
  history?: TODO_HISTORY[]
}

export type FORM_ERRORS = Partial<
  Record<'title' | 'status' | 'priority' | 'dateSingle' | 'timeSingle', string>
>

export type TODO_FILTER = {
  date?: string | null
  status?: STATUS_TYPE | STATUS_TYPE[]
  priorities?: PRIORITY_TYPE[]
  q?: string
  tagsAny?: string[]
  tagsAll?: string[]
}
