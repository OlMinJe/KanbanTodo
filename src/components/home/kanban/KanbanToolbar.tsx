import BaseDialog from '@/components/home/kanban/BaseDialog'
import { Dialog, DialogTrigger } from '@/components/ui'
import { Funnel, Plus } from 'lucide-react'

export default function KanbanToolbar() {
  return (
    <div className="flex items-center justify-end gap-2">
      <Funnel width="15px" height="15px" />
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className="rounded p-1">
            <Plus size={18} />
          </button>
        </DialogTrigger>
        <BaseDialog type="create" />
      </Dialog>
    </div>
  )
}
