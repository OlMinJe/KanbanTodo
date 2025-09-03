import { MOODS, NOTE_MAX } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'

export default function Complete(props: any) {
  const { mood, setMood, note, setNote } = props

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
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Shadcn.Label htmlFor="note">한 줄 소감</Shadcn.Label>
          <span
            className={`text-xs ${note.length > NOTE_MAX ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            {note.length}/{NOTE_MAX}
          </span>
        </div>
        <Shadcn.Input
          id="note"
          placeholder={`최대 ${NOTE_MAX}자`}
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
        />
      </div>
    </div>
  )
}
