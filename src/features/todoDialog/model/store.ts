import type { TODO } from '@/entities/todo'
import { getTodo } from '@/entities/todo/api'
import type { INIT_OPTION, TODO_FORM_STORE } from '@/features/todoDialog'
import {
  buildSchedule,
  INITIAL_STATE,
  makeCoreErrors,
  makeScheduleErrors,
} from '@/features/todoDialog'
import { createStore } from 'zustand/vanilla'

const ERROR_CLEAR_MAP: Partial<Record<keyof TODO, (keyof (typeof INITIAL_STATE)['errors'])[]>> = {
  title: ['title'],
  status: ['status'],
  priority: ['priority'],
  isRange: ['date', 'time', 'dateStart', 'timeStart', 'dateEnd', 'timeEnd', 'range'],
  dateSingle: ['date'],
  timeSingle: ['time'],
  dateStart: ['dateStart', 'range'],
  timeStart: ['timeStart', 'range'],
  dateEnd: ['dateEnd', 'range'],
  timeEnd: ['timeEnd', 'range'],
}

export const todoFormStore = createStore<TODO_FORM_STORE>()((set, get) => ({
  ...INITIAL_STATE,

  init: async (opt: INIT_OPTION) => {
    set(() => ({ ...INITIAL_STATE, mode: opt.mode }))

    if (opt.mode === 'update') {
      const rec = await getTodo(opt.id)
      if (!rec) return
      set((s) => ({
        ...s,
        mode: 'update',
        title: rec.title ?? '',
        status: rec.status ?? '',
        priority: rec.priority ?? '',
        description: rec.description ?? '',
        isRange: !!rec.isRange,
        dateSingle: rec.dateSingle ? new Date(rec.dateSingle) : null,
        timeSingle: rec.timeSingle ?? '',
        dateStart: rec.dateStart ? new Date(rec.dateStart) : null,
        timeStart: rec.timeStart ?? '',
        dateEnd: rec.dateEnd ? new Date(rec.dateEnd) : null,
        timeEnd: rec.timeEnd ?? '',
        errors: {},
        editVariant: rec.status,
      }))
    }

    if (opt.mode === 'create') {
      const hhmm = new Date().toISOString().substring(11, 16)
      set((s) => ({
        ...s,
        status: s.status || 'todo',
        priority: s.priority || 'P2',
        isRange: false,
        dateSingle: s.dateSingle ?? new Date(),
        timeSingle: s.timeSingle || hhmm,
        errors: {},
      }))
    }
  },

  resetErrors: () => set({ errors: {} }),
  resetToInitial: () => set(() => ({ ...INITIAL_STATE })),

  clearErrors: (keys) =>
    set((s) => {
      if (!keys?.length) return s
      const next = { ...s.errors }
      keys.forEach((k) => {
        if (k in next) delete (next as any)[k]
      })
      return { ...s, errors: next }
    }),

  setField: (key, value) =>
    set((s: any) => {
      const nextErrors = { ...s.errors }
      const toClear = ERROR_CLEAR_MAP[key as keyof TODO] ?? []
      toClear.forEach((ek) => {
        if (ek in nextErrors) delete (nextErrors as any)[ek]
      })
      return { ...s, [key]: value, errors: nextErrors }
    }),

  setFields: (partial) =>
    set((s: any) => {
      const nextErrors = { ...s.errors }
      Object.keys(partial).forEach((k) => {
        const toClear = ERROR_CLEAR_MAP[k as keyof TODO] ?? []
        toClear.forEach((ek) => {
          if (ek in nextErrors) delete (nextErrors as any)[ek]
        })
      })
      return { ...s, ...partial, errors: nextErrors }
    }),

  openEditForStatus: (variant) =>
    set({ editVariant: variant ?? get().editVariant, editOpen: true }),
  closeEdit: () => set({ editOpen: false }),

  validateCore: () => {
    const s = get()
    const next = makeCoreErrors(s.title, s.status, s.priority)
    set({ errors: { ...s.errors, ...next } })
    return Object.keys(next).length === 0
  },

  validateSchedule: () => {
    const s = get()
    const next = makeScheduleErrors(
      s.isRange,
      s.dateSingle,
      s.timeSingle,
      s.dateStart,
      s.timeStart,
      s.dateEnd,
      s.timeEnd
    )
    set({ errors: { ...s.errors, ...next } })
    return Object.values(next).every((v) => !v)
  },

  buildPayload: () => {
    const s = get()
    const schedule = buildSchedule(
      s.isRange,
      s.dateSingle,
      s.timeSingle,
      s.dateStart,
      s.timeStart,
      s.dateEnd,
      s.timeEnd
    )
    return {
      title: s.title,
      status: s.status,
      priority: s.priority,
      description: s.description,
      mode: s.mode,
      schedule,
    }
  },
}))
