import type { FORM_ERRORS, PRIORITY_TYPE, STATUS_TYPE, TODO_MODE } from '@/entities/todo/types'
import type { buildSchedule } from '@/features/todoDialog'

export type TODO_FORM_FIELDS = {
  title: string
  status: STATUS_TYPE | ''
  priority: PRIORITY_TYPE | ''
  description: string
  isRange: boolean
  // single
  dateSingle: Date | null
  timeSingle: string
  // range
  dateStart: Date | null
  timeStart: string
  dateEnd: Date | null
  timeEnd: string
}

export type INIT_OPTION = {
  mode: TODO_MODE
  initial?: Partial<{
    title: string
    status: STATUS_TYPE | ''
    priority: PRIORITY_TYPE | ''
    description: string
    date: Date | null
    time: string
    dateStart: Date | null
    timeStart: string
    dateEnd: Date | null
    timeEnd: string
  }>
}

export type TODO_FORM_STORE = TODO_FORM_FIELDS & {
  mode: TODO_MODE
  editOpen: boolean
  editVariant: STATUS_TYPE
  errors: FORM_ERRORS
  // actions
  init: (opt: INIT_OPTION) => void
  resetErrors: () => void
  resetToInitial: () => void
  clearErrors: (keys: (keyof FORM_ERRORS)[]) => void
  setField: <K extends keyof TODO_FORM_FIELDS>(k: K, v: TODO_FORM_FIELDS[K]) => void
  setFields: (partial: Partial<TODO_FORM_FIELDS>) => void
  setTitle: (v: string) => void
  setStatus: (v: STATUS_TYPE | '') => void
  setPriority: (v: PRIORITY_TYPE | '') => void
  setDescription: (v: string) => void
  setIsRange: (b: boolean) => void
  setDateSingle: (d: Date | null) => void
  setTimeSingle: (v: string) => void
  setDateStart: (d: Date | null) => void
  setTimeStart: (v: string) => void
  setDateEnd: (d: Date | null) => void
  setTimeEnd: (v: string) => void
  openEditForStatus: (variant?: STATUS_TYPE) => void
  closeEdit: () => void
  validateCore: () => boolean
  validateSchedule: () => boolean
  buildPayload: () => {
    title: string
    status: STATUS_TYPE | ''
    priority: PRIORITY_TYPE | ''
    description: string
    mode: TODO_MODE
    schedule: ReturnType<typeof buildSchedule>
  }
}

export const INITIAL_STATE: TODO_FORM_STORE = {
  mode: 'create',
  title: '',
  status: '',
  priority: '',
  description: '',
  isRange: false,
  dateSingle: null,
  timeSingle: '',
  dateStart: null,
  timeStart: '',
  dateEnd: null,
  timeEnd: '',
  editOpen: false,
  editVariant: 'todo',
  errors: {},
  init: (() => {}) as any,
  resetErrors: (() => {}) as any,
  resetToInitial: (() => {}) as any,
  clearErrors: (() => {}) as any,
  setField: (() => {}) as any,
  setFields: (() => {}) as any,
  setTitle: (() => {}) as any,
  setStatus: (() => {}) as any,
  setPriority: (() => {}) as any,
  setDescription: (() => {}) as any,
  setIsRange: (() => {}) as any,
  setDateSingle: (() => {}) as any,
  setTimeSingle: (() => {}) as any,
  setDateStart: (() => {}) as any,
  setTimeStart: (() => {}) as any,
  setDateEnd: (() => {}) as any,
  setTimeEnd: (() => {}) as any,
  openEditForStatus: (() => {}) as any,
  closeEdit: (() => {}) as any,
  validateCore: (() => false) as any,
  validateSchedule: (() => false) as any,
  buildPayload: (() => ({
    title: '',
    status: '',
    priority: '',
    description: '',
    mode: 'create',
    schedule: { type: 'single', at: null },
  })) as any,
}
