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
  // single
  dateSingle?: string
  timeSingle?: string
  // range
  dateStart?: string
  timeStart?: string
  dateEnd?: string
  timeEnd?: string
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
