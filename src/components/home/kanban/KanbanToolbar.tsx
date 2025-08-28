import { BaseDialog } from '@/components/dialog'
import { KanbanForm } from '@/feature/kanban'
import { Funnel, Plus } from 'lucide-react'

export default function KanbanToolbar() {
  return (
    <div className="flex items-center justify-end gap-2">
      <Funnel width="15px" height="15px" />
      <BaseDialog
        type="create"
        des="필요한 내용을 입력하세요."
        trigger={
          <button type="button" className="rounded p-1">
            <Plus size={18} />
          </button>
        }
        render={({ close }) => <KanbanForm type="create" onCancel={close} />}
      />
    </div>
  )
}
