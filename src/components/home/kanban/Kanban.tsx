import KanbanTable from '@/components/home/kanban/KanbanTable'
import KanbanToolbar from '@/components/home/kanban/KanbanToolbar'

export default function Kanban() {
  return (
    <div className="space-y-4">
      <KanbanToolbar />
      <KanbanTable />
    </div>
  )
}
