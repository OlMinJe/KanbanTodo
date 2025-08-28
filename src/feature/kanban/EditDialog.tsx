import { CompleteContents, DeleteContents, HoldContents } from '@/components/dialog'
import { Button } from '@/components/ui'
import { MOODS } from '@/constants/dialog'
import type { EDIT_DIALOG_PROPS } from '@/types/dialog'
import { useState } from 'react'

export default function EditDialog(props: EDIT_DIALOG_PROPS & { onSuccess?: () => void }) {
  const { variant = 'markAsComplete', defaults, onCancel, onSuccess } = props

  const [reason, setReason] = useState(defaults?.reason ?? '')
  const [mood, setMood] = useState((defaults?.mood as (typeof MOODS)[number]) ?? MOODS[0])
  const [note, setNote] = useState(defaults?.note ?? '')

  return (
    <div>
      {variant === 'markAsTodo' && <HoldContents reason={reason} setReason={setReason} />}

      {variant === 'markAsHold' && <HoldContents reason={reason} setReason={setReason} />}

      {variant === 'markAsComplete' && (
        <CompleteContents mood={mood} setMood={setMood} note={note} setNote={setNote} />
      )}

      {variant === 'remove' && <DeleteContents reason={reason} setReason={setReason} />}

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel} type="button">
          취소
        </Button>
        <Button
          onClick={() => {
            onSuccess?.()
          }}
          type="button"
        >
          확인
        </Button>
      </div>
    </div>
  )
}
