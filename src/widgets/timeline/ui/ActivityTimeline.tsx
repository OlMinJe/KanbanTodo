import { useTodoStore, type LIST_RESULT } from '@/entities/todo'
import { Button, Separator } from '@/shared/ui/shadcn'
import { TimelineItem } from '@/widgets/timeline'
import { Menu } from '@/widgets/todoBoard'
import { Funnel } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ActivityTimeline() {
  const listTodos = useTodoStore((s) => s.listTodos)
  const PAGE_SIZE = 5

  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(true)
  const [activities, setActivities] = useState<LIST_RESULT['items']>([])

  const loadedPagesRef = useRef<Set<number>>(new Set())
  useEffect(() => {
    if (loadedPagesRef.current.has(page)) return
    loadedPagesRef.current.add(page)

    const { items, hasNext: next } = listTodos({ page, pageSize: PAGE_SIZE })
    setHasNext(Boolean(next))

    setActivities((prev) => {
      const next = new Map(prev.map((x) => [x.key, x]))
      for (const x of items) if (!next.has(x.key)) next.set(x.key, x)
      return Array.from(next.values())
    })
  }, [page, listTodos])

  const onLoadMore = () => {
    if (hasNext) setPage((p) => p + 1)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">타임라인</h2>
          <Separator orientation="vertical" className="mx-1 h-4" />
          <span className="text-sm text-muted-foreground">활동 히스토리</span>
        </div>
        <Funnel width="15px" height="15px" />
      </div>

      {/* List */}
      <div className="relative px-4 sm:px-5 py-4">
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
            <Button variant="secondary" onClick={onLoadMore}>
              더 많은 활동 보기
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
