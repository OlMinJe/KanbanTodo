import { useTodoStore } from '@/entities/todo'
import { useTimelineStore } from '@/widgets/timeline/model/store'
import { useEffect } from 'react'

export type USE_TIMELINE = {
  activities: ReturnType<typeof useTimelineStore.getState>['activities']
  hasNext: boolean
  total: number
  loadMore: () => void
  page: number
}

export function useTimeline(): USE_TIMELINE {
  const activities = useTimelineStore((s) => s.activities)
  const hasNext = useTimelineStore((s) => s.hasNext)
  const page = useTimelineStore((s) => s.page)
  const loadMore = useTimelineStore((s) => s.fetchNextPage)
  const resetAndFetchFirst = useTimelineStore((s) => s.resetAndFetchFirst)

  const total = useTodoStore((s) => s.items.length)

  const listTodosFn = useTodoStore((s) => s.listTodos)
  useEffect(() => {
    resetAndFetchFirst()
  }, [listTodosFn, resetAndFetchFirst])

  useEffect(() => {
    const unsub = useTodoStore.subscribe((state, prev) => {
      if (
        state.listFilter !== prev.listFilter ||
        state.sortBy !== prev.sortBy ||
        state.sortOrder !== prev.sortOrder
      ) {
        resetAndFetchFirst()
      }
    })
    return unsub
  }, [resetAndFetchFirst])

  return { activities, hasNext, total, loadMore, page }
}
