import { DatePopover } from '@/features/todoDialog'
import { InputField } from '@/shared/ui/form'

export default function Defer(props: {
  reason: string
  setReason: (v: string) => void
  error?: string
}) {
  const { reason, setReason, error } = props

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <InputField
          id="reason"
          name="reason"
          label="보류 사유"
          required={true}
          placeholder="왜 보류하나요?"
          value={reason}
          onChange={(e: any) => setReason(e.target.value)}
          maxLength={500}
          className="min-h-[96px]"
          error={error}
        />
      </div>
      <div className="space-y-2 flex gap-4">
        <DatePopover
          id="retryDate"
          name="retryDate"
          label="재시도 날짜"
          required={true}
          error={error}
          containerClassName="flex flex-col gap-3"
        />
        <div className="flex flex-col gap-3">
          <InputField
            id="retry-time"
            name="range-time"
            label="재시도 시간"
            required={true}
            error={error}
            containerClassName="flex flex-col gap-3"
            type="time"
            step="1"
            defaultValue="10:30:00"
          />
        </div>
      </div>
    </div>
  )
}
