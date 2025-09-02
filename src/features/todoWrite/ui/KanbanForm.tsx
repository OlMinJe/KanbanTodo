import { BaseDialog, PROPS_INFO } from '@/features/dialog'
import {
  DatePopover,
  EditDialog,
  PRIOITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  type TODO_MODE,
  type TODO_STATUS,
  type TODO_VRIANT,
} from '@/features/todoWrite'
import { InputField, SelectField } from '@/shared/ui/form'
import { Button, Switch } from '@/shared/ui/shadcn'
import { useEffect, useMemo, useState } from 'react'

const statusToVariant = (s: TODO_STATUS | ''): TODO_VRIANT => {
  switch (s) {
    case 'todo':
      return 'markAsTodo'
    case 'hold':
      return 'markAsHold'
    case 'complete':
      return 'markAsComplete'
    default:
      return 'markAsComplete'
  }
}

export default function KanbanForm(props: { type: TODO_MODE; onCancel: () => void }) {
  const { type, onCancel } = props

  const [mode, setMode] = useState<TODO_MODE>(type)
  useEffect(() => {
    setMode(type)
  }, [type])

  const isRead = mode === 'read'

  // 폼 필드 상태
  const [taskStatus, setTaskStatus] = useState<TODO_STATUS | ''>('')

  // 수정
  const [editOpen, setEditOpen] = useState(false)
  const [editVariant, setEditVariant] = useState<TODO_VRIANT>('markAsComplete')

  const editDialogTitle = useMemo(() => PROPS_INFO[editVariant].title, [editVariant])
  const editDialogDesc = useMemo(() => PROPS_INFO[editVariant].description, [editVariant])

  const handleOpenEdit = () => {
    const v = statusToVariant(taskStatus)
    setEditVariant(v)
    setEditOpen(true)
  }

  const enterUpdateMode = () => setMode('update')

  return (
    <form>
      {/* 필수 입력 */}
      <fieldset className="mb-5" disabled={isRead}>
        <legend className="sr-only">필수 입력 정보</legend>

        <div className="flex gap-3">
          <InputField
            id="title"
            name="title"
            label="TODO 제목"
            required
            placeholder="제목을 입력하세요"
            containerClassName="min-w-auto"
            readOnly={isRead}
          />

          <SelectField
            id="todo-state"
            name="todo-state"
            label="작업 상태"
            required
            placeholder="작업 상태"
            triggerClassName="w-[100px]"
            options={TASK_STATUS_OPTIONS}
            value={taskStatus}
            onValueChange={(v: any) => setTaskStatus(v as TODO_STATUS)}
            disabled={isRead}
          />

          <SelectField
            id="priority"
            name="priority"
            label="작업 순위"
            required
            placeholder="작업 순위"
            triggerClassName="w-[100px]"
            options={PRIOITY_OPTIONS}
            value=""
            onValueChange={() => {}}
            disabled={isRead}
          />
        </div>

        {/* 날짜/시간 */}
        <div>
          <Switch disabled={isRead} />
          <div className="flex gap-4">
            <DatePopover
              id="single-date"
              name="single-date"
              label="날짜"
              required
              containerClassName="flex flex-col gap-3"
              disabled={isRead}
            />
            <InputField
              id="single-time"
              name="single-time"
              label="시간"
              required
              containerClassName="flex flex-col gap-3"
              type="time"
              step="1"
              defaultValue="10:30:00"
              readOnly={isRead}
            />
          </div>
        </div>
      </fieldset>

      {/* 설명 */}
      <fieldset className="mb-5" disabled={isRead}>
        <InputField
          id="description"
          name="description"
          label="TODO 설명"
          placeholder="TODO에 대한 설명을 입력하세요"
          type="textarea"
          readOnly={isRead}
        />
      </fieldset>

      <div className="flex justify-between">
        {/* 삭제 다이얼로그 */}
        {mode !== 'create' && (
          <BaseDialog
            type={PROPS_INFO['remove'].title}
            des={PROPS_INFO['remove'].description}
            trigger={
              <Button type="button" className="text-red-400">
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

          {mode === 'create' && <Button type="button">저장</Button>}
          {mode === 'read' && (
            <Button type="button" onClick={enterUpdateMode}>
              수정
            </Button>
          )}
          {mode === 'update' && (
            <Button type="button" className="text-red-400" onClick={handleOpenEdit}>
              수정하기
            </Button>
          )}

          <BaseDialog
            type={editDialogTitle}
            des={editDialogDesc}
            open={editOpen}
            trigger={<span />}
            render={({ close }) => <EditDialog variant={editVariant} onCancel={close} />}
          />
        </div>
      </div>
    </form>
  )
}
