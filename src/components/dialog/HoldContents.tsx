import { InputField } from '@/components/field'
import { DatePopver } from '@/feature/kanban'

export default function HoldContents(props: any) {
  const { reason, setReason } = props

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <InputField
          id="reason"
          name="reason"
          label="보류 사유"
          placeholder="왜 보류하나요?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={500}
          className="min-h-[96px]"
        />
      </div>
      <div className="space-y-2 flex gap-4">
        <DatePopver
          id="retryDate"
          name="retryDate"
          label="재시도 날짜"
          required={true}
          hint=""
          error=""
          containerClassName="flex flex-col gap-3"
        />
        <div className="flex flex-col gap-3">
          <InputField
            id="retry-time"
            name="range-time"
            label="재시도 시간"
            required={true}
            hint=""
            error=""
            placeholder=""
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
