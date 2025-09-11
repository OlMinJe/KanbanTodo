export type STATUS_TYPE = 'todo' | 'doing' | 'done' | 'remove' | 'defer'
export type PRIORITY_TYPE = 'P1' | 'P2' | 'P3'

export type TODO_MODE = 'create' | 'update'

export type SingleSchedule = {
  type: 'single'
  at: string // ISO datetime
}

export type RangeSchedule = {
  type: 'range'
  start: string // ISO datetime
  end: string // ISO datetime
}

export type SCHEDULE = SingleSchedule | RangeSchedule

export type SUBMIT_PAYLOAD = {
  title: string
  status?: STATUS_TYPE
  priority?: PRIORITY_TYPE
  description?: string | null
  schedule: SCHEDULE
}

export type TODO_STATUS_META = {
  reason?: string // 삭제/보류/되돌리기 사유 등
  mood?: string // 완료 시 선택한 이모지
}

export type TODO_HISTORY = {
  at: string // 기록 시각(ISO)
  from: STATUS_TYPE // 이전 상태
  to: STATUS_TYPE // 바뀐 상태
  meta?: TODO_STATUS_META
}

export type TODO = {
  id: string
  title: string
  status: STATUS_TYPE
  priority: PRIORITY_TYPE
  description: string | null
  isRange: boolean
  tags: []
  createdAt: string // ISO
  updatedAt: string // ISO
  dateSingle?: string
  timeSingle?: string
  dateStart?: string
  timeStart?: string
  dateEnd?: string
  timeEnd?: string
  history?: TODO_HISTORY[]
}

export type FORM_ERRORS = Partial<
  Record<
    | 'title'
    | 'status'
    | 'priority'
    | 'date'
    | 'time'
    | 'dateStart'
    | 'timeStart'
    | 'dateEnd'
    | 'timeEnd'
    | 'range',
    string
  >
>

export type SCHEDULE_PAYLOAD =
  | { type: 'single'; at: string | null }
  | { type: 'range'; start: string | null; end: string | null }

export type TODO_FILTER = {
  date?: Date | string
  status?: STATUS_TYPE | STATUS_TYPE[]
  priorities?: PRIORITY_TYPE[]
  q?: string
  tagsAny?: string[]
  tagsAll?: string[]
}
