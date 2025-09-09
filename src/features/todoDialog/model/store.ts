import type { FORM_ERRORS, PRIORITY_TYPE, STATUS_TYPE } from '@/entities/todo'
import type { INIT_OPTION, TODO_FORM_FIELDS, TODO_FORM_STORE } from '@/features/todoDialog'
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

const toDate = (v: unknown): Date | null => (v ? new Date(v as any) : null)

export const todoFormStore = createStore<TODO_FORM_STORE>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      init: ({ mode, initial }: INIT_OPTION) =>
        set((s: TODO_FORM_STORE) => ({
          ...INITIAL_STATE,
          mode,
          title: initial?.title ?? '',
          status: (initial?.status ?? '') as TODO_FORM_STORE['status'],
          priority: (initial?.priority ?? '') as TODO_FORM_STORE['priority'],
          description: initial?.description ?? '',
          dateSingle: toDate(initial?.date),
          timeSingle: initial?.time ?? s.timeSingle,
          dateStart: toDate(initial?.dateStart),
          timeStart: initial?.timeStart ?? s.timeStart,
          dateEnd: toDate(initial?.dateEnd),
          timeEnd: initial?.timeEnd ?? s.timeEnd,
        })),

      errors: {},
      resetErrors: () => set({ errors: {} }),
      resetToInitial: () => set(() => ({ ...INITIAL_STATE })),

      clearErrors: (keys: (keyof FORM_ERRORS)[]) =>
        set((s: TODO_FORM_STORE) => {
          if (!keys?.length) return s
          const next = { ...s.errors }
          keys.forEach((k) => {
            if (k in next) delete (next as any)[k]
          })
          return { ...s, errors: next }
        }),

      setField: <K extends Field>(key: K, value: TODO_FORM_FIELDS[K]) =>
        set((s: TODO_FORM_STORE) => {
          const nextErrors = { ...s.errors }
          const toClear = ERROR_CLEAR_MAP[key] ?? []
          toClear.forEach((ek) => {
            if (ek in nextErrors) delete (nextErrors as any)[ek]
          })
          return { ...(s as any), [key]: value, errors: nextErrors }
        }),

      setFields: (partial: Partial<TODO_FORM_FIELDS>) =>
        set((s: TODO_FORM_STORE) => {
          const nextErrors = { ...s.errors }
          ;(Object.keys(partial) as Field[]).forEach((k) => {
            const toClear = ERROR_CLEAR_MAP[k] ?? []
            toClear.forEach((ek) => {
              if (ek in nextErrors) delete (nextErrors as any)[ek]
            })
          })
          return { ...(s as any), ...(partial as any), errors: nextErrors }
        }),

      // 개별 setter (타입 일치)
      setTitle: (v: string) => get().setField('title', v),
      setStatus: (v: STATUS_TYPE | '') => get().setField('status', v),
      setPriority: (v: PRIORITY_TYPE | '') => get().setField('priority', v),
      setDescription: (v: string) => get().setField('description', v),
      setIsRange: (b: boolean) => get().setField('isRange', b),
      setDateSingle: (d: Date | null) => get().setField('dateSingle', d),
      setTimeSingle: (v: string) => get().setField('timeSingle', v),
      setDateStart: (d: Date | null) => get().setField('dateStart', d),
      setTimeStart: (v: string) => get().setField('timeStart', v),
      setDateEnd: (d: Date | null) => get().setField('dateEnd', d),
      setTimeEnd: (v: string) => get().setField('timeEnd', v),

      // dialog
      openEditForStatus: (variant?: STATUS_TYPE) =>
        set({ editVariant: (variant ?? get().editVariant) as STATUS_TYPE, editOpen: true }),
      closeEdit: () => set({ editOpen: false }),

      // validate
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
          status: s.status,
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
      partialize: (s: TODO_FORM_STORE) => ({
        mode: s.mode,
        title: s.title,
        status: s.status,
        priority: s.priority,
        description: s.description,
        isRange: s.isRange,
        timeSingle: s.timeSingle,
        timeStart: s.timeStart,
        timeEnd: s.timeEnd,
        editVariant: s.editVariant,
      }),
      migrate: (persisted) => persisted as any,
    }
  )
)
