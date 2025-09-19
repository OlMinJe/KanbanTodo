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
      <div>
        Total <strong>{count || '0'}</strong>
      </div>
      <div className="relative flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Filter Panel Button"
          aria-pressed={open}
          onClick={() => setOpen(!open)}
          className="rounded p-1
             text-muted-foreground hover:bg-muted hover:text-foreground
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
             disabled:pointer-events-none disabled:opacity-50
             transition-colors"
        >
          <Funnel width="15px" height="15px" />
        </button>

        {open && (
          <div
            role="dialog"
            aria-modal="true"
            className="absolute right-5 top-20 z-50 w-72 rounded-xl border
             bg-background text-foreground border-border p-3 shadow-xl
             transition-colors"
          >
            <div className="mb-2 flex items-start justify-end">
              <button
                className="rounded p-1 text-muted-foreground hover:bg-muted
                 focus:outline-none focus:ring-2 focus:ring-ring
                 transition-colors"
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
              toggleStatus={(v) => search.setStatuses((prev: string[]) => toggleInArray(prev, v))}
              priorities={search.priorities}
              togglePriority={(v) =>
                search.setPriorities((prev: string[]) => toggleInArray(prev, v))
              }
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
