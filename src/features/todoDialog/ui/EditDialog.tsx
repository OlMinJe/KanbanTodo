import type { STATUS_TYPE, TODO, TODO_STATUS_META } from '@/entities/todo'
import { Defer, Delete, Doing, Done, MOODS, Todo } from '@/features/todoDialog'
import { asYMD, ensureHMS } from '@/shared/lib'
import * as Shadcn from '@/shared/ui/shadcn'
import { useMemo, useState } from 'react'

type EDIT_DIALOG_PROPS = {
  variant: STATUS_TYPE
  defaults?: { reason: string; mood: string; note?: string }
  onCancel: () => void
  todo?: TODO
  onSuccess?: (extra: TODO_STATUS_META) => void
}

export default function EditDialog(props: EDIT_DIALOG_PROPS) {
  const { variant, defaults, onCancel, onSuccess } = props

  const [reason, setReason] = useState<string>(defaults?.reason ?? '')
  const [mood, setMood] = useState<(typeof MOODS)[number] | undefined>(
    (defaults?.mood as any) ?? undefined
  )

  const [retryDate, setRetryDate] = useState<string>('')
  const [retryTime, setRetryTime] = useState<string>('10:30:00')

  const [tried, setTried] = useState(false)

  const needReason = useMemo(
    () => variant === 'todo' || variant === 'defer' || variant === 'done' || variant === 'remove',
    [variant]
  )
  const needRetry = useMemo(() => variant === 'defer', [variant])
  const needMood = useMemo(() => variant === 'done', [variant])

  const reasonInvalid = needReason && reason.trim() === ''
  const moodInvalid = needMood && (!mood || !MOODS.includes(mood))
  const retryInvalid = needRetry && (!retryDate || !retryTime)

  const canSubmit = !reasonInvalid && !moodInvalid && !retryInvalid

  const onConfirm = () => {
    if (!canSubmit) {
      setTried(true)
      return
    }
    onSuccess?.({
      reason: reason.trim(),
      mood,
      retryDate: retryDate ?? asYMD(retryDate),
      retryTime: ensureHMS(retryTime),
    })
  }

  return (
    <div>
      {variant === 'todo' && (
        <Todo
          reason={reason}
          setReason={setReason}
          error={tried && reasonInvalid ? '변경 사유를 입력해 주세요.' : undefined}
        />
      )}

      {variant === 'doing' && (
        <Doing
          reason={reason}
          setReason={setReason}
          error={tried && reasonInvalid ? '변경 사유를 입력해 주세요.' : undefined}
        />
      )}

      {variant === 'defer' && (
        <Defer
          reason={reason}
          setReason={setReason}
          reasonError={tried && reasonInvalid ? '보류 사유를 입력해 주세요.' : undefined}
          retryDate={retryDate}
          setRetryDate={(v?: string) => setRetryDate(v ?? '')}
          retryDateError={
            tried && needRetry && !retryDate ? '재시도 날짜를 선택해 주세요.' : undefined
          }
          retryTime={retryTime}
          setRetryTime={(v?: string) => setRetryTime(v ?? '')}
        />
      )}

      {variant === 'done' && (
        <Done
          mood={mood}
          setMood={setMood}
          reason={reason}
          setReason={setReason}
          moodError={tried && moodInvalid ? '기분을 선택해 주세요.' : undefined}
        />
      )}

      {variant === 'remove' && (
        <Delete
          reason={reason}
          setReason={setReason}
          error={tried && reasonInvalid ? '삭제 사유를 입력해 주세요.' : undefined}
        />
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Shadcn.Button variant="ghost" onClick={onCancel} type="button">
          취소
        </Shadcn.Button>
        <Shadcn.Button
          onClick={onConfirm}
          type="button"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
        >
          확인
        </Shadcn.Button>
      </div>
    </div>
  )
}
