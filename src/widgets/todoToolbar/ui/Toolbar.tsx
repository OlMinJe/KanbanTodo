import { BaseDialog } from '@/features/dialog'
import { SearchPanel, useSearch } from '@/features/search'
import { TodoForm } from '@/features/todoDialog'
import { useToolbar } from '@/widgets/todoToolbar'
import { Funnel, Plus, X } from 'lucide-react'

export default function Toolbar() {
  const { open, setOpen, count } = useToolbar()
  const search = useSearch()

  const toggleInArray = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]

  return (
    <div className="flex justify-between mb-2">
      <div>Total {count || '0'}</div>
      <div className="relative flex items-center justify-end gap-2">
        <button
          type="button"
          className="rounded p-1 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Filter, Search and Sort"
        >
          <Funnel width="15px" height="15px" />
        </button>

        {open && (
          <div className="absolute right-10 top-0 z-10 w-72 rounded-xl border bg-white p-3 shadow-xl">
            <div className="mb-2 flex items-start justify-end">
              <button
                className="rounded p-1 hover:bg-gray-100"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            <SearchPanel
              q={search.q}
              setQ={search.setQ}
              statuses={search.statuses}
              toggleStatus={(v) => search.setStatuses((prev) => toggleInArray(prev, v))}
              priorities={search.priorities}
              togglePriority={(v) => search.setPriorities((prev) => toggleInArray(prev, v))}
              sortBy={search.sortBy}
              setSortBy={search.setSortBy}
              sortOrder={search.sortOrder}
              setSortOrder={search.setSortOrder}
              onApply={() => {
                search.apply()
                setOpen(false)
              }}
              onReset={() => {
                search.reset()
              }}
            />
          </div>
        )}

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
