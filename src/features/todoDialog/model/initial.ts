import type { PRIORITY_TYPE, STATUS_TYPE } from '@/entities/todo'

export const INITIAL_STATE = {
  mode: 'create' as 'create' | 'update',
  title: '',
  status: '' as STATUS_TYPE | '',
  priority: '' as PRIORITY_TYPE | '',
  description: '',
  isRange: false,
  dateSingle: null as Date | null,
  timeSingle: '',
  dateStart: null as Date | null,
  timeStart: '',
  dateEnd: null as Date | null,
  timeEnd: '',
  editOpen: false,
  editVariant: undefined as STATUS_TYPE | undefined,
  errors: {} as Record<string, string | undefined>,
}

export type INIT_OPTION =
  | { mode: 'create' }
  | {
      mode: 'update'
      id: string
      todo?: Partial<{
        title: string
        status: STATUS_TYPE | ''
        priority: PRIORITY_TYPE | ''
        description: string
        isRange: boolean
        dateSingle: Date | null
        timeSingle: string
        dateStart: Date | null
        timeStart: string
        dateEnd: Date | null
        timeEnd: string
      }>
    }

export type TODO_FORM_STORE = typeof INITIAL_STATE & {
  init: (opt: INIT_OPTION) => void | Promise<void>
  resetErrors: () => void
  resetToInitial: () => void
  clearErrors: (keys: (keyof (typeof INITIAL_STATE)['errors'])[]) => void
  setField: <K extends keyof typeof INITIAL_STATE>(k: K, v: any) => void
  setFields: (partial: Partial<typeof INITIAL_STATE>) => void
  openEditForStatus: (variant?: STATUS_TYPE) => void
  closeEdit: () => void
  validateCore: () => boolean
  validateSchedule: () => boolean
  buildPayload: () => {
    title: string
    status: STATUS_TYPE | ''
    priority: PRIORITY_TYPE | ''
    description: string
    mode: 'create' | 'update'
    schedule: any
  }
}
