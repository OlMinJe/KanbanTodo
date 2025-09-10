import { MOODS, NOTE_MAX } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'

export default function Done(props: {
  mood: (typeof MOODS)[number] | undefined
  setMood: (m: (typeof MOODS)[number]) => void
  reason: string
  setReason: (v: string) => void
  error?: string
  moodError?: string
  reasonError?: string
}) {
  const { mood, setMood, reason, setReason, moodError, reasonError } = props

  const moodErrId = moodError ? 'done-mood-error' : undefined
  const reasonErrId = reasonError ? 'done-reason-error' : undefined

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Shadcn.Label>지금 기분</Shadcn.Label>
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`h-10 w-10 rounded-2xl border flex items-center justify-center text-xl ${
                mood === m ? 'border-foreground' : 'border-muted'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {moodError && (
          <div id={moodErrId} className="text-red-500 text-sm">
            {moodError}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Shadcn.Label htmlFor="note">한 줄 소감</Shadcn.Label>
          <span
            className={`text-xs ${reason.length > NOTE_MAX ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            {reason.length}/{NOTE_MAX}
          </span>
        </div>
        <Shadcn.Input
          id="note"
          placeholder={`최대 ${NOTE_MAX}자`}
          value={reason}
          required={true}
          onChange={(e) => setReason(e.target.value.slice(0, NOTE_MAX))}
          max="100"
        />
        {reasonError && (
          <div id={reasonErrId} className="text-red-500 text-sm">
            {reasonError}
          </div>
        )}
      </div>
    </div>
  )
}
