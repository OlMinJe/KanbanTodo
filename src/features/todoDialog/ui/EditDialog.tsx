import { type MOODS, Complete, Delete, Hold } from '@/features/dialog'
import { type EDIT_DIALOG_PROPS } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'
import { useState } from 'react'

export default function EditDialog(props: EDIT_DIALOG_PROPS & { onSuccess?: () => void }) {
  const { variant = 'markAsComplete', defaults, onCancel, onSuccess } = props

  const [reason, setReason] = useState(defaults?.reason ?? '')
  const [mood, setMood] = useState(defaults?.mood as (typeof MOODS)[number])
  const [note, setNote] = useState(defaults?.note ?? '')

  return (
    <div>
      {variant === 'markAsTodo' && <Hold reason={reason} setReason={setReason} />}

      {variant === 'markAsHold' && <Hold reason={reason} setReason={setReason} />}

      {variant === 'markAsComplete' && (
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
