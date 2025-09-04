import { listTodos, type TODO, TODO_STATUS } from '@/entities/todo'
import { STATUS_LABELS } from '@/features/todoDialog'
import { Card, Column, Menu } from '@/widgets/todoBoard'
import { useEffect, useMemo, useState } from 'react'

export default function Board() {
  const [todos, setTodos] = useState<TODO[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listTodos()
        setTodos(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  // 상태별 그룹핑
  const byStatus = useMemo(() => {
    const g: Record<(typeof TODO_STATUS)[keyof typeof TODO_STATUS], TODO[]> = {
      [TODO_STATUS.TODO]: [],
      [TODO_STATUS.IN_PROGRESS]: [],
      [TODO_STATUS.HOLD]: [],
      [TODO_STATUS.REMOVE]: [],
      [TODO_STATUS.COMPLETE]: [],
    }
    for (const t of todos) g[t.status]?.push(t)
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

      {/* 진행중 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.IN_PROGRESS]}
        status={TODO_STATUS.IN_PROGRESS}
        count={String(byStatus[TODO_STATUS.IN_PROGRESS].length)}
      >
        {byStatus[TODO_STATUS.IN_PROGRESS].length > 0 ? (
          byStatus[TODO_STATUS.IN_PROGRESS].map((t) => (
            <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
          ))
        ) : (
          <p>아직 일정이 없습니다!</p>
        )}
      </Column>

      {/* 보류 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.HOLD]}
        status={TODO_STATUS.HOLD}
        count={String(byStatus[TODO_STATUS.HOLD].length)}
      >
        {byStatus[TODO_STATUS.HOLD].length > 0 ? (
          byStatus[TODO_STATUS.HOLD].map((t) => (
            <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
          ))
        ) : (
          <p>아직 일정이 없습니다!</p>
        )}
      </Column>

      {/* 완료 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.COMPLETE]}
        status={TODO_STATUS.COMPLETE}
        count={String(byStatus[TODO_STATUS.COMPLETE].length)}
      >
        {byStatus[TODO_STATUS.COMPLETE].length > 0 ? (
          byStatus[TODO_STATUS.COMPLETE].map((t) => (
            <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
          ))
        ) : (
          <p>아직 일정이 없습니다!</p>
        )}
      </Column>
    </div>
  )
}
