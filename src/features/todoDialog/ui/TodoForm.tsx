import {
  TODO_STATUS,
  type PRIORITY_TYPE,
  type STATUS_TYPE,
  type TODO,
  type TODO_MODE,
} from '@/entities/todo'
import { createTodo, removeTodo, updateTodo } from '@/entities/todo/api'
import { BaseDialog } from '@/features/dialog'
import {
  EditDialog,
  PRIOITY_OPTIONS,
  ScheduleSection,
  STATUS_DIALOG_TEXT,
  TASK_STATUS_OPTIONS,
  useTodoFormStore,
} from '@/features/todoDialog'
import { fromISO } from '@/shared/lib'
import { InputField, SelectField } from '@/shared/ui/form'
import { Button } from '@/shared/ui/shadcn'
import { useEffect, type FormEvent } from 'react'

export default function TodoForm(props: {
  type: Extract<TODO_MODE, 'create' | 'update'>
  onCancel: () => void
  todo: TODO
}) {
  const { type, onCancel, todo } = props

  const {
    init,
    resetErrors,
    // fields
    title,
    taskStatus,
    priority,
    description,
    setField,
    // dialogs
    editOpen,
    editVariant,
    openEditForStatus,
    closeEdit,
    // validation & payload
    validateCore,
    validateSchedule,
    buildPayload,
    // mode
    mode,
  } = useTodoFormStore((s) => s)

  useEffect(() => {
    init({ mode: type })
    return () => resetErrors()
  }, [type, init, resetErrors])

  useEffect(() => {
    if (!todo) return
    if (todo.title) setField('title', todo.title)
    if (todo.status) setField('taskStatus', todo.status as STATUS_TYPE)
    if (todo.priority) setField('priority', todo.priority as PRIORITY_TYPE)
    if (typeof todo.description === 'string') setField('description', todo.description || '')
  }, [todo, setField])

  const toUpdatedTodo = (base: TODO, payloadReturn: ReturnType<typeof buildPayload>): TODO => {
    const { schedule, title, taskStatus, priority, description } = payloadReturn

    let next: TODO = {
      ...base,
      title: title.trim(),
      status: (taskStatus || base.status) as STATUS_TYPE,
      priority: (priority || base.priority) as PRIORITY_TYPE,
      description: description?.trim() || null,
      isRange: schedule.type === 'range',
    }

    if (schedule.type === 'single') {
      const { date, time } = fromISO(schedule.at!)
      next = {
        ...next,
        isRange: false,
        date,
        time,
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
      }
    } else {
      const s = fromISO(schedule.start!)
      const e = fromISO(schedule.end!)
      next = {
        ...next,
        isRange: true,
        startDate: s.date,
        startTime: s.time,
        endDate: e.date,
        endTime: e.time,
        date: undefined,
        time: undefined,
      }
    }
    return next
  }

  const confirmUpdate = async () => {
    if (!validateCore() || !validateSchedule()) return
    const payload = buildPayload()
    const updatedTodo = toUpdatedTodo(todo, payload)
    const updated = await updateTodo(todo.id, updatedTodo)
    console.log('update', updated)
    closeEdit()
    onCancel() // TODO: 리스트 갱신 필요
  }

  const confirmRemove = async () => {
    const ok = await removeTodo(todo.id)
    console.log('remove', ok)
    closeEdit()
    onCancel() // TODO: 리스트 갱신 필요
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (mode !== 'create') return

    if (!validateCore() || !validateSchedule()) return
    const payload = buildPayload()
    const created = await createTodo(payload)
    console.log('created', created)
    onCancel() // TODO: 리스트 갱신 필요
  }

  console.log('editVariant', editVariant)

  return (
    <form noValidate onSubmit={handleSubmit}>
      <fieldset className="mb-5">
        <legend className="sr-only">필수 입력 정보</legend>

        <div className="flex gap-3">
          <InputField
            id="title"
            name="title"
            label="TODO 제목"
            required
            placeholder="제목을 입력하세요"
            containerClassName="min-w-auto"
            value={title}
            onChange={(e: any) => setField('title', e.target.value)}
          />

          <SelectField
            id="todo-state"
            name="todo-state"
            label="작업 상태"
            required
            placeholder="작업 상태"
            triggerClassName="w-[120px]"
            options={TASK_STATUS_OPTIONS}
            value={taskStatus}
            onValueChange={(v: string) => setField('taskStatus', v as STATUS_TYPE)}
          />

          <SelectField
            id="priority"
            name="priority"
            label="작업 순위"
            required
            placeholder="작업 순위"
            triggerClassName="w-[120px]"
            options={PRIOITY_OPTIONS}
            value={priority}
            onValueChange={(v: any) => setField('priority', v as PRIORITY_TYPE)}
          />
        </div>
      </fieldset>

      <ScheduleSection todo={todo} />

      <fieldset className="mb-5">
        <InputField
          id="description"
          name="description"
          label="TODO 설명"
          placeholder="TODO에 대한 설명을 입력하세요"
          type="textarea"
          value={description || ''}
          onChange={(e: any) => setField('description', e.target.value)}
        />
      </fieldset>

      <div className="flex justify-between">
        {mode === TODO_STATUS.REMOVE && (
          <BaseDialog
            title={STATUS_DIALOG_TEXT[TODO_STATUS.REMOVE]['title']}
            des={STATUS_DIALOG_TEXT[TODO_STATUS.REMOVE]['description']}
            trigger={
              <Button type="button" className="text-red-500">
                삭제하기
              </Button>
            }
            render={({ close }) => (
              <EditDialog
                variant="remove"
                onCancel={close}
                onSuccess={async () => {
                  await confirmRemove()
                  close()
                }}
              />
            )}
          />
        )}

        <div className="flex items-center gap-2">
          <Button type="button" onClick={onCancel}>
            취소
          </Button>

          {mode === 'create' && (
            <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
              저장
            </Button>
          )}

          {mode === 'update' && (
            <>
              <Button
                type="button"
                className="text-red-500"
                onClick={() => {
                  if (!validateCore() || !validateSchedule()) return
                  const v = (taskStatus || 'todo') as STATUS_TYPE
                  openEditForStatus(v)
                }}
              >
                수정하기
              </Button>

              <BaseDialog
                title={STATUS_DIALOG_TEXT[editVariant]?.['title']}
                des={STATUS_DIALOG_TEXT[editVariant]?.['description']}
                open={editOpen}
                trigger={<span />}
                render={({ close }) => (
                  <EditDialog
                    variant={editVariant}
                    onCancel={() => {
                      close()
                      closeEdit()
                    }}
                    onSuccess={async () => {
                      await confirmUpdate()
                      close()
                    }}
                  />
                )}
              />
            </>
          )}
        </div>
      </div>
    </form>
  )
}
