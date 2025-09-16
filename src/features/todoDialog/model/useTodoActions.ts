import type { PRIORITY_TYPE, STATUS_TYPE, TODO, TODO_STATUS_META } from '@/entities/todo'
import { updateTodo as apiUpdateTodo, createTodo } from '@/entities/todo'
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
    const schedule = { type: 'single', at: (p.schedule.at as string) ?? nowISO } as const

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

      let next: Partial<TODO> = {
        title: title.trim(),
        status: (status || base.status) as STATUS_TYPE,
        priority: (priority || base.priority) as PRIORITY_TYPE,
        description: description?.trim() || null,
      }

      const at = schedule.at ?? new Date().toISOString()
      const { date, time } = fromISO(at)
      next = {
        ...next,
        dateSingle: date,
        timeSingle: time,
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

  const confirmUpdate = useCallback(
    async (extra?: TODO_STATUS_META) => {
      if (!validateCore() || !validateSchedule() || !todo) return

      const patch = toUpdatedTodo(todo)
      await apiUpdateTodo(todo.id, { ...patch, meta: extra })

      closeEdit()
      resetErrors()
      resetToInitial()
      onDone()
    },
    [todo, validateCore, validateSchedule, toUpdatedTodo, closeEdit, resetErrors, onDone]
  )

  const confirmRemove = useCallback(
    async (extra?: TODO_STATUS_META) => {
      if (!todo) return

      await apiUpdateTodo(todo.id, { ...todo, status: 'remove', meta: extra })

      closeEdit()
      resetErrors()
      resetToInitial()
      onDone()
    },
    [todo, closeEdit, resetErrors, resetToInitial, onDone]
  )

  const handleCancel = useCallback(() => {
    resetErrors()
    resetToInitial()
    onDone()
  }, [resetErrors, resetToInitial, onDone])

  return { handleSubmit, confirmUpdate, confirmRemove, handleCancel }
}
