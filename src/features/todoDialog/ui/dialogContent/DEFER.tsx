import { DatePopover } from '@/features/todoDialog'
import { asYMD } from '@/shared/lib' // 날짜 문자열 변환용
import { InputField } from '@/shared/ui/form'

type Props = {
  reason: string
  setReason: (v: string) => void
  reasonError?: string
  retryDate: string
  setRetryDate: (v?: string) => void
  retryDateError?: string
  retryTime: string
  setRetryTime: (v?: string) => void
  retryTimeError?: string
}

export default function Defer(props: Props) {
  const {
    reason,
    setReason,
    reasonError,
    retryDate,
    setRetryDate,
    retryDateError,
    retryTime,
    setRetryTime,
    retryTimeError,
  } = props

  const dateValue: Date | null = retryDate ? new Date(`${retryDate}T00:00:00`) : null

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <InputField
          id="reason"
          name="reason"
          label="보류 사유"
          required
          placeholder="왜 보류하나요?"
          value={reason}
          onChange={(e: any) => setReason(e.target.value)}
          maxLength={500}
          className="min-h-[96px]"
          error={reasonError}
        />
      </div>

      <div className="space-y-2 flex gap-4">
        <DatePopover
          id="retryDate"
          name="retryDate"
          label="재시도 날짜"
          required
          value={dateValue}
          onValueChange={(d?: Date | null) => setRetryDate(d ? asYMD(d) : '')}
          error={retryDateError}
          containerClassName="flex flex-col gap-3 basis-1/2"
        />

        <div className="flex flex-col gap-3 basis-1/2">
          <InputField
            id="retryTime"
            name="retryTime"
            label="재시도 시간"
            required
            type="time"
            step="1"
            value={retryTime ?? ''}
            onChange={(e: any) => setRetryTime(e.target.value)}
            error={retryTimeError}
          />
        </div>
      </div>
    </div>
  )
}
