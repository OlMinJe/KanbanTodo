import type { STATUS_TYPE } from '@/entities/todo'
import { type TODO, TODO_STATUS, useTodoStore } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { STATUS_LABELS, TodoFormRead } from '@/features/todoDialog'
import { Card, Column, Menu } from '@/widgets/todoBoard'
import { useMemo } from 'react'

export default function Board() {
  const todos = useTodoStore((s) => s.items)

  const byStatus = useMemo(() => {
    const g: Record<STATUS_TYPE, TODO[]> = {
      [TODO_STATUS.TODO]: [],
      [TODO_STATUS.DOING]: [],
      [TODO_STATUS.DEFER]: [],
      [TODO_STATUS.DONE]: [],
      [TODO_STATUS.REMOVE]: [],
    }
    for (const t of todos) g[t.status]?.push(t)
    return g
  }, [todos])

  const ORDER: STATUS_TYPE[] = [
    TODO_STATUS.TODO,
    TODO_STATUS.DOING,
    TODO_STATUS.DEFER,
    TODO_STATUS.DONE,
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
      {ORDER.map((status) => {
        const list = byStatus[status]
        return (
          <Column
            key={status}
            title={STATUS_LABELS[status]}
            status={status}
            count={String(list.length)}
          >
            {list.length > 0 ? (
              list.map((t) => (
                <BaseDialog
                  key={t.id}
                  title={t.title}
                  des=""
                  trigger={
                    <div
                      role="button"
                      tabIndex={0}
                      className="text-left w-full focus:outline-none"
                      onClick={(e) => {
                        const el = e.target as HTMLElement
                        if (el.closest('[data-card-menu]')) {
                          e.stopPropagation()
                          e.preventDefault()
                          return
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          const el = e.target as HTMLElement
                          if (el.closest('[data-card-menu]')) return
                          e.preventDefault()
                          ;(e.currentTarget as HTMLElement).click()
                        }
                      }}
                    >
                      <Card todo={t} renderMenu={<Menu todo={t} />} />
                    </div>
                  }
                  render={() => <TodoFormRead todoId={t.id} />}
                />
              ))
            ) : (
              <p>아직 일정이 없습니다!</p>
            )}
          </Column>
        )
      })}
    </div>
  )
}
