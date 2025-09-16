import { includesYMD, TODO_STATUS, useTodoStore } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { TodoForm } from '@/features/todoDialog'
import { asYMD } from '@/shared/lib'
import { Funnel, Plus } from 'lucide-react'
import { useMemo } from 'react'

export default function TodoToolbar() {
  const items = useTodoStore((s) => s.items)
  const selectedDateYMD = useTodoStore((s) => s.selectedDateYMD)

  const count = useMemo(() => {
    const ymd = asYMD(selectedDateYMD as string | Date)
    const today = (items ?? []).filter(
      (t) => (!ymd || includesYMD(t, ymd)) && t.status !== TODO_STATUS.REMOVE
    )
    return today.length
  }, [items, selectedDateYMD])

  return (
    <div className="flex justify-between">
      <div>Total {count || '0'}</div>
      <div className="flex items-center justify-end gap-2">
        <Funnel width="15px" height="15px" />
        <BaseDialog
          title="TODO 만들기"
          trigger={
            <button type="button" className="rounded p-1">
              <Plus size={18} />
            </button>
          }
          render={({ close }) => <TodoForm type="create" onCancel={close} />}
        />
      </div>
    </div>
  )
}
