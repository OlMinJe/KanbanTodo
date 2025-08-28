import { InputField } from '@/components/field'

export default function DeleteContents(props: any) {
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
          onChange={(e) => setReason(e.target.value)}
          maxLength={500}
          className="min-h-[96px]"
        />
      </div>
    </div>
  )
}
