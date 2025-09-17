import type { STATUS_TYPE, TODO } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { STATUS_LABELS, TodoFormRead } from '@/features/todoDialog'
import { Card, Column, Menu, useBoard } from '@/widgets/todoBoard'

export default function Board() {
  const { ORDER, byStatus } = useBoard()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ORDER.map((status: STATUS_TYPE) => {
        const list = byStatus[status] as TODO[]
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
                  render={({ close }) => <TodoFormRead todoId={t.id} onCancel={close} />}
                />
              ))
            ) : (
              <div className="text-gray-500 text-sm">아직 일정이 없습니다!</div>
            )}
          </Column>
        )
      })}
    </div>
  )
}
