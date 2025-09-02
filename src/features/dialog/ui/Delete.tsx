import { InputField } from '@/shared/ui/form'

export default function Delete(props: any) {
  const { reason, setReason } = props
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <InputField
          id="deleteReason"
          name="deleteReason"
          label="삭제 사유"
          placeholder="왜 삭제하나요?"
          value={reason}
          onChange={(e: any) => setReason(e.target.value)}
          maxLength={500}
          className="min-h-[96px]"
        />
      </div>
    </div>
  )
}
