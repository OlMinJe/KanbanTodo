import { getTodo } from '@/entities/todo'
import { useEffect, useState } from 'react'

// TODO 진행 중! 이 있었네..
function labelOfStatus(s: 'todo' | 'doing' | 'done' | 'defer' | 'remove') {
  switch (s) {
    case 'todo':
      return '할 일'
    case 'doing':
      return '진행 중'
    case 'done':
      return '완료'
    case 'defer':
      return '보류'
    case 'remove':
      return '삭제'
  }
}

export default function TodoFormRead({ todoId }: { todoId: string }) {
  const [todo, setTodo] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const t = await getTodo(todoId)
      setTodo(t ?? null)
    })()
  }, [todoId])

  console.log(todo)

  if (!todo) return <div className="p-4">불러오는 중…</div>
  return (
    <div className="flex flex-col gap-5">
      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <BadgeLike label="상태" value={labelOfStatus(todo.status)} />
          <BadgeLike label="우선순위" value={todo.priority} />
        </div>
      </section>

      {/* 날짜/시간 */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">기간</span>
        </div>

        {todo.isRange ? (
          <div className="flex gap-5">
            <div className="flex gap-4">
              <ReadField label="시작 날짜" value={todo.dateStart ?? '-'} />
              <ReadField label="시작 시간" value={todo.timeStart ?? '-'} />
            </div>
            <div className="flex gap-4">
              <ReadField label="종료 날짜" value={todo.dateEnd ?? '-'} />
              <ReadField label="종료 시간" value={todo.timeEnd ?? '-'} />
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <ReadField label="날짜" value={todo.dateSingle ?? '-'} />
            <ReadField label="시간" value={todo.timeSingle ?? '-'} />
          </div>
        )}
      </section>

      {todo.description?.trim() && (
        <section className="space-y-2">
          <div className="text-sm font-medium">설명</div>
          <p className="rounded-md border p-3 text-sm leading-6">{todo.description}</p>
        </section>
      )}
    </div>
  )
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="min-h-[36px] rounded-md border px-3 py-2 text-sm">{value}</span>
    </div>
  )
}

function BadgeLike({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5">
      <span className="text-[11px] text-muted-foreground sr-only">{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </span>
  )
}
