import type { TODO_PRIORITY, TODO_STATUS } from '@/entities/todo'

export type PRIORITY_TYPE = (typeof TODO_PRIORITY)[keyof typeof TODO_PRIORITY] // 숫자 우선순위
export type STATUS_TYPE = (typeof TODO_STATUS)[keyof typeof TODO_STATUS] // 작업 상태

export type TODO_MODE = 'create' | 'update' | 'remove'

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

  // 상태별
  onHoldReason?: string | null
  retryAt?: string | null // YYYY-MM-DD

  completionNote?: string | null
  completionEmoji?: string | null
  completedAt?: string | null // ISODateTime

  createdAt: string // ISODateTime
  updatedAt: string // ISODateTime
  deletedAt?: string | null // ISODateTime
  deleteReason?: string | null // [선택]
}

// store
export type FORM_ERRORS = Partial<{
  title: string
  taskStatus: string
  priority: string
  date: string
  time: string
  dateStart: string
  timeStart: string
  dateEnd: string
  timeEnd: string
  range: string
}>

export type SCHEDULE_PAYLOAD =
  | { type: 'single'; at: string | null }
  | { type: 'range'; start: string | null; end: string | null }

export type SUBMIT_PAYLOAD = {
  title: string
  taskStatus: STATUS_TYPE | ''
  priority: PRIORITY_TYPE | ''
  description: string
  mode: TODO_MODE
  schedule: SCHEDULE_PAYLOAD
}

export type INIT_OPTION = {
  mode: TODO_MODE
  initial?: Partial<Pick<TODO_FORM_STORE, 'title' | 'taskStatus' | 'priority' | 'description'>> & {
    date?: Date | null
    time?: string
  }
}

export type TODO_FORM_STORE = {
  // 기본 필드
  mode: TODO_MODE
  title: string
  taskStatus: STATUS_TYPE | ''
  priority: PRIORITY_TYPE | ''
  description: string

  // 일정(단일/기간)
  isRange: boolean
  // 단일
  dateSingle: Date | null
  timeSingle: string
  // 기간
  dateStart: Date | null
  timeStart: string
  dateEnd: Date | null
  timeEnd: string

  // 다이얼로그
  editOpen: boolean
  editVariant: STATUS_TYPE

  // 에러
  errors: FORM_ERRORS
  clearErrors?: (keys: (keyof FORM_ERRORS)[]) => void

  // lifecycles
  init: (opts: INIT_OPTION) => void
  resetErrors: () => void

  // setters
  setTitle: (v: string) => void
  setTaskStatus: (v: STATUS_TYPE | '') => void
  setPriority: (v: PRIORITY_TYPE | '') => void
  setDescription: (v: string) => void
  setIsRange: (b: boolean) => void
  setDateSingle: (d: Date | null) => void
  setTimeSingle: (v: string) => void
  setDateStart: (d: Date | null) => void
  setTimeStart: (v: string) => void
  setDateEnd: (d: Date | null) => void
  setTimeEnd: (v: string) => void

  // dialog
  openEditForStatus: () => void
  closeEdit: () => void

  // validate & payload
  validateCore: () => boolean
  validateSchedule: () => boolean
  buildPayload: () => SUBMIT_PAYLOAD
}
