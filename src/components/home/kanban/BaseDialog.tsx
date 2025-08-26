import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui'
import DialogForm from '@/feature/kanban/DialogForm'

// dialog open type = create/update/read

export default function BaseDialog({ type }: { type: string }) {
  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>{type}</DialogTitle>
        <DialogDescription>필요한 내용을 입력하세요.</DialogDescription>
      </DialogHeader>
      <DialogForm />
    </DialogContent>
  )
}
