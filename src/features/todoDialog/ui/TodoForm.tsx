import { TODO_STATUS, type PRIORITY_TYPE, type STATUS_TYPE, type TODO_MODE } from '@/entities/todo'
import { createTodo } from '@/entities/todo/api'
import { BaseDialog } from '@/features/dialog'
import {
  EditDialog,
  PRIOITY_OPTIONS,
  ScheduleSection,
  STATUS_DIALOG_TEXT,
  TASK_STATUS_OPTIONS,
  useTodoFormStore,
} from '@/features/todoDialog'
import { InputField, SelectField } from '@/shared/ui/form'
import { Button } from '@/shared/ui/shadcn'
import { useEffect, type FormEvent } from 'react'

export default function TodoForm(props: {
  type: Extract<TODO_MODE, 'create' | 'update'>
  onCancel: () => void
}) {
  const { type, onCancel } = props
  const {
    // init
    init,
    resetErrors,
    // fields
    title,
    setTitle,
    taskStatus,
    setTaskStatus,
    priority,
    setPriority,
    description,
    setDescription,
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
  } = useTodoFormStore()

  useEffect(() => {
    init({ mode: type })
    return () => resetErrors()
  }, [type, init, resetErrors])

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validateCore() || !validateSchedule()) return

    const payload = buildPayload()

    console.log('payload', payload)

    if (type === 'create') {
      const created = await createTodo(payload)
      console.log('created', created)
      onCancel() // 리스트 갱신
    }
  }

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
            onChange={(e: any) => setTitle(e.target.value)}
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
            onValueChange={(v: string) => setTaskStatus(v as STATUS_TYPE)}
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
            onValueChange={(v: any) => setPriority(v as PRIORITY_TYPE)}
          />
        </div>
      </fieldset>

      <ScheduleSection />

      <fieldset className="mb-5">
        <InputField
          id="description"
          name="description"
          label="TODO 설명"
          placeholder="TODO에 대한 설명을 입력하세요"
          type="textarea"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
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
            render={({ close }) => <EditDialog variant="remove" onCancel={close} />}
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
                  openEditForStatus()
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
