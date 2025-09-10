import { InputField } from '@/shared/ui/form'

export default function Doing(props: {
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
          label="진행 중"
          placeholder="진행에 대한 다짐을 작성해주세요!"
          value={reason}
          onChange={(e: any) => setReason(e.target.value)}
          maxLength={500}
          className="min-h-[96px]"
          error={error}
        />
      </div>
    </div>
  )
}
