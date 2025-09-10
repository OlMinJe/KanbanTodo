import type { PRIORITY_TYPE, STATUS_TYPE, TODO } from '@/entities/todo'
import {
  removeTodo as apiRemoveTodo,
  updateTodo as apiUpdateTodo,
  createTodo,
} from '@/entities/todo'
import { useTodoFormStore } from '@/features/todoDialog'
import { fromISO } from '@/shared/lib'
import { useCallback, type FormEvent } from 'react'
import { shallow } from 'zustand/shallow'

type Params = { todo?: TODO; onDone: () => void }

export function useTodoActions({ todo, onDone }: Params) {
  const {
    buildPayload,
    validateCore,
    validateSchedule,
    closeEdit,
    resetErrors,
    resetToInitial,
    mode,
  } = useTodoFormStore(
    (s) => ({
      buildPayload: s.buildPayload,
      validateCore: s.validateCore,
      validateSchedule: s.validateSchedule,
      closeEdit: s.closeEdit,
      resetErrors: s.resetErrors,
      resetToInitial: s.resetToInitial,
      mode: s.mode,
    }),
    shallow
  )

  const toSubmitPayload = useCallback(() => {
    const p = buildPayload()
    const nowISO = new Date().toISOString()
    const plus30m = new Date(Date.now() + 30 * 60 * 1000).toISOString()
    const schedule =
      p.schedule.type === 'single'
        ? ({ type: 'single', at: (p.schedule.at as string) ?? nowISO } as const)
        : ({
            type: 'range',
            start: (p.schedule.start as string) ?? nowISO,
            end: (p.schedule.end as string) ?? plus30m,
          } as const)
    return {
      title: p.title,
      status: (p.status || undefined) as STATUS_TYPE | undefined,
      priority: (p.priority || undefined) as PRIORITY_TYPE | undefined,
      description: p.description ?? null,
      schedule,
    }
  }, [buildPayload])

  const toUpdatedTodo = useCallback(
    (base: TODO) => {
      const p = buildPayload()
      const { schedule, title, status, priority, description } = p
      let next: TODO = {
        ...base,
        title: title.trim(),
        status: (status || base.status) as STATUS_TYPE,
        priority: (priority || base.priority) as PRIORITY_TYPE,
        description: description?.trim() || null,
        isRange: schedule.type === 'range',
      }
      if (schedule.type === 'single') {
        const at = schedule.at ?? new Date().toISOString()
        const { date, time } = fromISO(at)
        next = {
          ...next,
          isRange: false,
          dateSingle: date,
          timeSingle: time,
          dateStart: undefined,
          timeStart: undefined,
          dateEnd: undefined,
          timeEnd: undefined,
        }
      } else {
        const s = fromISO(schedule.start ?? new Date().toISOString())
        const e = fromISO(schedule.end ?? new Date(Date.now() + 30 * 60 * 1000).toISOString())
        next = {
          ...next,
          isRange: true,
          dateStart: s.date,
          timeStart: s.time,
          dateEnd: e.date,
          timeEnd: e.time,
          dateSingle: undefined,
          timeSingle: undefined,
        }
      }
      return next
    },
    [buildPayload]
  )

  const handleSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault()
      if (mode !== 'create') return
      if (!validateCore() || !validateSchedule()) return
      await createTodo(toSubmitPayload())
      resetErrors()
      resetToInitial()
      onDone()
    },
    [mode, validateCore, validateSchedule, toSubmitPayload, resetErrors, resetToInitial, onDone]
  )

  const confirmUpdate = useCallback(async () => {
    if (!validateCore() || !validateSchedule() || !todo) return
    await apiUpdateTodo(todo.id, toUpdatedTodo(todo))
    closeEdit()
    resetErrors()
    resetToInitial()
    onDone()
  }, [
    todo,
    validateCore,
    validateSchedule,
    toUpdatedTodo,
    closeEdit,
    resetErrors,
    resetToInitial,
    onDone,
  ])

  const confirmRemove = useCallback(async () => {
    if (!todo) return
    await apiRemoveTodo(todo.id)
    closeEdit()
    resetErrors()
    resetToInitial()
    onDone()
  }, [todo, closeEdit, resetErrors, resetToInitial, onDone])

  const handleCancel = useCallback(() => {
    resetErrors()
    resetToInitial()
    onDone()
  }, [resetErrors, resetToInitial, onDone])

  return { handleSubmit, confirmUpdate, confirmRemove, handleCancel }
}
