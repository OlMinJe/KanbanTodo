import { TODO_STATUS, type FORM_ERRORS, type TODO_FORM_STORE } from '@/entities/todo'
import {
  INITIAL_STATE,
  buildSchedule,
  makeCoreErrors,
  makeScheduleErrors,
} from '@/features/todoDialog'
import { createStore } from 'zustand'

export const todoFormStore = createStore<TODO_FORM_STORE>((set, get) => ({
  ...INITIAL_STATE,

  // init
  init: ({ mode, initial }) =>
    set((s) => ({
      ...INITIAL_STATE,
      mode,
      title: initial?.title ?? '',
      taskStatus: initial?.taskStatus ?? '',
      priority: initial?.priority ?? '',
      description: initial?.description ?? '',
      dateSingle: initial?.date ?? null,
      timeSingle: initial?.time ?? s.timeSingle,
    })),

  resetErrors: () => set({ errors: {} }),

  clearErrors: (keys: (keyof FORM_ERRORS)[]) =>
    set((s) => {
      if (!keys?.length) return s
      const next = { ...s.errors }
      keys.forEach((k) => {
        if (k in next) delete (next as any)[k]
      })
      return { ...s, errors: next }
    }),

  // setters
  setTitle: (v) => set((s) => ({ title: v, errors: { ...s.errors, title: undefined } })),
  setTaskStatus: (v) =>
    set((s) => ({ taskStatus: v, errors: { ...s.errors, taskStatus: undefined } })),
  setPriority: (v) => set((s) => ({ priority: v, errors: { ...s.errors, priority: undefined } })),
  setDescription: (v) => set({ description: v }),
  setIsRange: (b) =>
    set((s) => ({
      isRange: b,
      errors: {
        ...s.errors,
        date: undefined,
        time: undefined,
        dateStart: undefined,
        timeStart: undefined,
        dateEnd: undefined,
        timeEnd: undefined,
        range: undefined,
      },
    })),
  setDateSingle: (d) => set((s) => ({ dateSingle: d, errors: { ...s.errors, date: undefined } })),
  setTimeSingle: (v) => set((s) => ({ timeSingle: v, errors: { ...s.errors, time: undefined } })),
  setDateStart: (d) =>
    set((s) => ({ dateStart: d, errors: { ...s.errors, dateStart: undefined, range: undefined } })),
  setTimeStart: (v) =>
    set((s) => ({ timeStart: v, errors: { ...s.errors, timeStart: undefined, range: undefined } })),
  setDateEnd: (d) =>
    set((s) => ({ dateEnd: d, errors: { ...s.errors, dateEnd: undefined, range: undefined } })),
  setTimeEnd: (v) =>
    set((s) => ({ timeEnd: v, errors: { ...s.errors, timeEnd: undefined, range: undefined } })),

  // dialog
  openEditForStatus: () => set({ editVariant: TODO_STATUS[get().taskStatus], editOpen: true }),
  closeEdit: () => set({ editOpen: false }),

  // validate
  validateCore: () => {
    const s = get()
    const next = makeCoreErrors(s.title, s.taskStatus, s.priority)
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

  // payload
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
      taskStatus: s.taskStatus,
      priority: s.priority,
      description: s.description,
      mode: s.mode,
      schedule,
    }
  },
}))
