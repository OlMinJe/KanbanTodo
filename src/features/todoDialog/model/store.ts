import {
  type FORM_ERRORS,
  type STATUS_TYPE,
  type TODO_FORM_FIELDS,
  type TODO_FORM_STORE,
} from '@/entities/todo'
import {
  INITIAL_STATE,
  buildSchedule,
  makeCoreErrors,
  makeScheduleErrors,
} from '@/features/todoDialog'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

type ErrorKey = keyof FORM_ERRORS
type Field = keyof TODO_FORM_FIELDS

const ERROR_CLEAR_MAP: Partial<Record<Field, ErrorKey[]>> = {
  title: ['title'],
  taskStatus: ['taskStatus'],
  priority: ['priority'],
  isRange: ['date', 'time', 'dateStart', 'timeStart', 'dateEnd', 'timeEnd', 'range'],
  dateSingle: ['date'],
  timeSingle: ['time'],
  dateStart: ['dateStart', 'range'],
  timeStart: ['timeStart', 'range'],
  dateEnd: ['dateEnd', 'range'],
  timeEnd: ['timeEnd', 'range'],
}

export const todoFormStore = createStore<TODO_FORM_STORE>()(
  persist(
    (set, get) => ({
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

      errors: {},
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

      setField: <K extends Field>(key: K, value: TODO_FORM_FIELDS[K]) =>
        set((s) => {
          const nextErrors = { ...s.errors }
          const toClear = ERROR_CLEAR_MAP[key] ?? []
          toClear.forEach((ek) => {
            if (ek in nextErrors) delete (nextErrors as any)[ek]
          })
          return { ...(s as any), [key]: value, errors: nextErrors } as TODO_FORM_STORE
        }),

      // 일괄 setter
      setFields: (partial) =>
        set((s) => {
          const nextErrors = { ...s.errors }
          ;(Object.keys(partial) as Field[]).forEach((k) => {
            const toClear = ERROR_CLEAR_MAP[k] ?? []
            toClear.forEach((ek) => {
              if (ek in nextErrors) delete (nextErrors as any)[ek]
            })
          })
          return { ...(s as any), ...(partial as any), errors: nextErrors } as TODO_FORM_STORE
        }),

      // 개별 setter(내부 위임용)
      setTitle: (v) => get().setField('title', v),
      setTaskStatus: (v) => get().setField('taskStatus', v),
      setPriority: (v) => get().setField('priority', v),
      setDescription: (v) => get().setField('description', v),
      setIsRange: (b) => get().setField('isRange', b),
      setDateSingle: (d) => get().setField('dateSingle', d),
      setTimeSingle: (v) => get().setField('timeSingle', v),
      setDateStart: (d) => get().setField('dateStart', d),
      setTimeStart: (v) => get().setField('timeStart', v),
      setDateEnd: (d) => get().setField('dateEnd', d),
      setTimeEnd: (v) => get().setField('timeEnd', v),

      // dialog
      openEditForStatus: (variant?: STATUS_TYPE) =>
        set({ editVariant: variant ?? get().editVariant, editOpen: true }),
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
    }),
    {
      name: '@kanban/todoForm',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        mode: s.mode,
        title: s.title,
        taskStatus: s.taskStatus,
        priority: s.priority,
        description: s.description,
        isRange: s.isRange,
        dateSingle: s.dateSingle,
        timeSingle: s.timeSingle,
        dateStart: s.dateStart,
        timeStart: s.timeStart,
        dateEnd: s.dateEnd,
        timeEnd: s.timeEnd,
        editVariant: s.editVariant,
      }),
      migrate: (persisted, _version) => persisted as any,
    }
  )
)
