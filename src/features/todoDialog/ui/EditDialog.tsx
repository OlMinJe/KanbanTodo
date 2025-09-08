import type { STATUS_TYPE, TODO } from '@/entities/todo'
import { Complete, Delete, Hold, MOODS } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'
import { useState } from 'react'

type EDIT_DIALOG_PROPS = {
  variant: STATUS_TYPE
  defaults?: { reason: string; mood: string; note: string }
  onCancel: () => void
  todo?: TODO
}

export default function EditDialog(props: EDIT_DIALOG_PROPS & { onSuccess?: () => void }) {
  const { variant, defaults, onCancel, onSuccess } = props

  const [reason, setReason] = useState(defaults?.reason ?? '')
  const [mood, setMood] = useState(defaults?.mood as (typeof MOODS)[number])
  const [note, setNote] = useState(defaults?.note ?? '')

  console.log(variant)

  return (
    <div>
      {variant === 'todo' && <Hold reason={reason} setReason={setReason} />}

      {variant === 'hold' && <Hold reason={reason} setReason={setReason} />}

      {variant === 'complete' && (
        <Complete mood={mood} setMood={setMood} note={note} setNote={setNote} />
      )}

      {variant === 'remove' && <Delete reason={reason} setReason={setReason} />}

      <div className="flex justify-end gap-2 pt-2">
        <Shadcn.Button variant="ghost" onClick={onCancel} type="button">
          취소
        </Shadcn.Button>
        <Shadcn.Button
          onClick={() => {
            onSuccess?.()
          }}
          type="button"
        >
          확인
        </Shadcn.Button>
      </div>
    </div>
  )
}
