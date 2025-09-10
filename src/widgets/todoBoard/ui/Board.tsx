import { type TODO, TODO_STATUS, useTodoStore } from '@/entities/todo'
import type { STATUS_TYPE } from '@/entities/todo/types'
import { STATUS_LABELS } from '@/features/todoDialog'
import { Card, Column, Menu } from '@/widgets/todoBoard'
import { useMemo } from 'react'

export default function Board() {
  const todos = useTodoStore((s) => s.items)

  const byStatus = useMemo(() => {
    const g: Record<STATUS_TYPE, TODO[]> = {
      [TODO_STATUS.TODO]: [],
      [TODO_STATUS.DOING]: [],
      [TODO_STATUS.DONE]: [],
      [TODO_STATUS.DEFER]: [],
      [TODO_STATUS.REMOVE]: [],
    }
    for (const t of todos) {
      g[t.status].push(t)
    }
    return g
  }, [todos])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
      {/* 할 일 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.TODO]}
        status={TODO_STATUS.TODO}
        count={String(byStatus[TODO_STATUS.TODO].length)}
      >
        {byStatus[TODO_STATUS.TODO].length > 0 ? (
          byStatus[TODO_STATUS.TODO].map((t) => (
            <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
          ))
        ) : (
          <p>아직 일정이 없습니다!</p>
        )}
      </Column>

      {/* 진행중 (DOING) */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.DOING]}
        status={TODO_STATUS.DOING}
        count={String(byStatus[TODO_STATUS.DOING].length)}
      >
        {byStatus[TODO_STATUS.DOING].length > 0 ? (
          byStatus[TODO_STATUS.DOING].map((t) => (
            <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
          ))
        ) : (
          <p>아직 일정이 없습니다!</p>
        )}
      </Column>

      {/* 보류 (DEFER) */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.DEFER]}
        status={TODO_STATUS.DEFER}
        count={String(byStatus[TODO_STATUS.DEFER].length)}
      >
        {byStatus[TODO_STATUS.DEFER].length > 0 ? (
          byStatus[TODO_STATUS.DEFER].map((t) => (
            <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
          ))
        ) : (
          <p>아직 일정이 없습니다!</p>
        )}
      </Column>

      {/* 완료 (DONE) */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.DONE]}
        status={TODO_STATUS.DONE}
        count={String(byStatus[TODO_STATUS.DONE].length)}
      >
        {byStatus[TODO_STATUS.DONE].length > 0 ? (
          byStatus[TODO_STATUS.DONE].map((t) => (
            <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
          ))
        ) : (
          <p>아직 일정이 없습니다!</p>
        )}
      </Column>
    </div>
  )
}
