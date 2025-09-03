import { BaseDialog } from '@/features/dialog'
import { TodoForm } from '@/features/todoDialog'
import { Funnel, Plus } from 'lucide-react'

export default function TodoToolbar() {
  return (
    <div className="flex items-center justify-end gap-2">
      <Funnel width="15px" height="15px" />
      <BaseDialog
        type="TODO 만들기"
        trigger={
          <button type="button" className="rounded p-1">
            <Plus size={18} />
          </button>
        }
        render={({ close }) => <TodoForm type="create" onCancel={close} />}
      />
    </div>
  )
}
