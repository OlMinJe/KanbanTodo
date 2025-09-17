import type { PRIORITY_TYPE, STATUS_TYPE, TODO, TODO_MODE } from '@/entities/todo'
import { getTodo, TODO_STATUS } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import {
  EditDialog,
  PRIORITY_OPTIONS,
  ScheduleSection,
  STATUS_DIALOG_TEXT,
  TASK_STATUS_OPTIONS,
  useTodoActions,
  useTodoFormStore,
} from '@/features/todoDialog'
import { InputField, SelectField } from '@/shared/ui/form'
import { Button } from '@/shared/ui/shadcn'
import { useEffect, useState } from 'react'

type Props = {
  type: Extract<TODO_MODE, 'create' | 'update'>
  onCancel: () => void
  todoId?: string
}

const EMPTY_TODO: TODO = {
  id: '',
  title: '',
  status: 'todo',
  priority: 'P2',
  description: null,
  tags: [],
  createdAt: '',
  updatedAt: '',
}

export default function TodoForm({ type, onCancel, todoId }: Props) {
  const {
    init,
    resetErrors,
    title,
    status,
    priority,
    description,
    setField,
    editOpen,
    editVariant,
    openEditForStatus,
    closeEdit,
    validateCore,
    validateSchedule,
    mode,
    errors,
  } = useTodoFormStore((s) => s)

  const [current, setCurrent] = useState<TODO | null>(null)

  useEffect(() => {
    let mounted = true
    if (type === 'create') {
      init({ mode: 'create' })
      setCurrent(null)
    } else if (type === 'update' && todoId) {
      init({ mode: 'update', id: todoId })
      getTodo(todoId).then((t) => {
        if (mounted) setCurrent(t ?? null)
      })
    }
    return () => {
      mounted = false
      resetErrors()
    }
  }, [type, todoId, init, resetErrors])

  const { handleSubmit, confirmUpdate, confirmRemove, handleCancel } = useTodoActions({
    todo: current ?? undefined,
    onDone: onCancel,
  })

  const variantSafe = editVariant ?? TODO_STATUS.TODO

  return (
    <form noValidate onSubmit={handleSubmit}>
      <fieldset className="mb-3">
        <legend className="sr-only">필수 입력 정보</legend>

        <div className="flex flex-col flex-1 gap-3">
          <InputField
            id="title"
            name="title"
            label="TODO 제목"
            required
            placeholder="제목을 입력하세요"
            containerClassName="min-w-auto"
            value={title ?? ''}
            onChange={(e) => setField('title', e.currentTarget.value)}
            error={errors.title}
          />

          <div className="flex gap-3">
            <SelectField
              id="todo-state"
              name="todo-state"
              label="작업 상태"
              required
              placeholder="작업 상태"
              containerClassName="basis-1/2 min-w-0"
              triggerClassName="w-full"
              options={TASK_STATUS_OPTIONS}
              value={status ?? ''}
              onValueChange={(v) => setField('status', v as STATUS_TYPE | '')}
              error={errors.status}
            />
            <SelectField
              id="priority"
              name="priority"
              label="작업 순위"
              required
              placeholder="작업 순위"
              containerClassName="basis-1/2 min-w-0"
              triggerClassName="w-full"
              options={PRIORITY_OPTIONS}
              value={priority ?? ''}
              onValueChange={(v) => setField('priority', v as PRIORITY_TYPE | '')}
              error={errors.priority}
            />
          </div>
        </div>
      </fieldset>

      <ScheduleSection
        todo={type === 'update' ? (current ?? EMPTY_TODO) : EMPTY_TODO}
        errors={errors}
      />

      <fieldset className="mb-5">
        <InputField
          id="description"
          name="description"
          label="TODO 설명"
          placeholder="TODO에 대한 설명을 입력하세요"
          value={description ?? ''}
          onChange={(e) => setField('description', e.currentTarget.value)}
        />
      </fieldset>

      <div className="flex justify-end">
        {mode !== 'create' && (
          <BaseDialog
            title={STATUS_DIALOG_TEXT[TODO_STATUS.REMOVE].title}
            des={STATUS_DIALOG_TEXT[TODO_STATUS.REMOVE].description}
            trigger={
              <Button type="button" className="text-red-500">
                삭제하기
              </Button>
            }
            render={({ close }) => (
              <EditDialog
                variant={TODO_STATUS.REMOVE}
                onCancel={close}
                onSuccess={async (extra) => {
                  await confirmRemove(extra)
                  close()
                }}
              />
            )}
          />
        )}

        <div className="flex items-center gap-2">
          <Button type="button" onClick={handleCancel}>
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
                onClick={async () => {
                  if (!validateCore() || !validateSchedule()) return
                  openEditForStatus((status || TODO_STATUS.TODO) as STATUS_TYPE)

                  const next = (status || TODO_STATUS.TODO) as STATUS_TYPE
                  const prev = (current?.status || TODO_STATUS.TODO) as STATUS_TYPE

                  if (next === prev) {
                    await confirmUpdate(undefined as any)
                    return
                  }
                  openEditForStatus(next)
                }}
              >
                수정하기
              </Button>

              <BaseDialog
                title={STATUS_DIALOG_TEXT[variantSafe].title}
                des={STATUS_DIALOG_TEXT[variantSafe].description}
                open={editOpen}
                trigger={<span />}
                render={({ close }) => (
                  <EditDialog
                    variant={variantSafe}
                    onCancel={() => {
                      close()
                      closeEdit()
                    }}
                    onSuccess={async (extra) => {
                      await confirmUpdate(extra)
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
