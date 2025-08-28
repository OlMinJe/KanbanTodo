import { Input, Label } from '@/components/ui'
import { MOODS, NOTE_MAX } from '@/constants/dialog'

export default function CompleteContents(props: any) {
  const { mood, setMood, note, setNote } = props

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label>지금 기분</Label>
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`h-10 w-10 rounded-2xl border flex items-center justify-center text-xl ${
                mood === m ? 'border-foreground' : 'border-muted'
              }`}
              aria-pressed={mood === m}
              aria-label={`감정 ${m}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="note">한 줄 소감</Label>
          <span
            className={`text-xs ${note.length > NOTE_MAX ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            {note.length}/{NOTE_MAX}
          </span>
        </div>
        <Input
          id="note"
          placeholder={`최대 ${NOTE_MAX}자`}
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
        />
      </div>
    </div>
  )
}
