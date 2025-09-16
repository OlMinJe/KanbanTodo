import { SearchPanel, useSearch } from '@/features/search'
import { Button, Separator } from '@/shared/ui/shadcn'
import { TimelineItem, useTimeline } from '@/widgets/timeline'
import { Menu } from '@/widgets/todoBoard'
import { Funnel, X } from 'lucide-react'
import { useState } from 'react'

export default function ActivityTimeline() {
  const { activities, hasNext, total, loadMore } = useTimeline()
  const search = useSearch()

  const [open, setOpen] = useState(false)

  const toggleInArray = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]

  return (
    <div>
      {/* Header */}
      <header className="px-0 sm:px-5 py-3 relative">
        <div className="flex items-center mb-3">
          <h2 className="text-base font-semibold">타임라인</h2>
          <Separator orientation="vertical" className="mx-1 h-4" />
          <span className="text-sm text-muted-foreground">활동 히스토리</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            Total <strong>{total}</strong>
          </div>
          <button
            type="button"
            className="rounded p-1 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Filter, Search and Sort"
          >
            <Funnel width="15px" height="15px" />
          </button>
        </div>

        {open && (
          <div className="absolute right-5 top-20 z-10 w-72 rounded-xl border bg-white p-3 shadow-xl">
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
      </header>

      {/* List */}
      <div className="relative px-0 sm:px-5 py-4">
        <div className="space-y-6">
          {activities.map(({ key, todo, history }) => (
            <TimelineItem
              key={key}
              todo={todo}
              history={history}
              renderMenu={<Menu todo={todo} />}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center">
          {hasNext ? (
            <Button variant="secondary" onClick={loadMore}>
              더 많은 활동 보기
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
