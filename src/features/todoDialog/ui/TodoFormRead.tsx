import { getTodo, removeTodo, type STATUS_TYPE } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { EditDialog, PROPS_INFO, STATUS_DIALOG_TEXT, TodoForm } from '@/features/todoDialog'
import { fromISO, getStatusLabel } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn'
import { useEffect, useMemo, useState } from 'react'

function pickParts(
  todo: any,
  isoKey: string,
  dateKey: string,
  timeKey: string
): { date?: string; time?: string } {
  const iso = todo?.[isoKey] as string | undefined | null
  if (iso) {
    const parts = fromISO(iso)
    return {
      date: parts.date,
      time: parts.time ? parts.time.slice(0, 5) : undefined,
    }
  }
  return {
    date: todo?.[dateKey],
    time: (todo?.[timeKey] ?? '').slice(0, 5) || undefined,
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

  const display = useMemo(() => {
    if (!todo) return null

    if (todo.isRange) {
      const start = pickParts(todo, 'startsAt', 'dateStart', 'timeStart')
      const end = pickParts(todo, 'endsAt', 'dateEnd', 'timeEnd')
      return {
        isRange: true,
        startDate: start.date ?? '-',
        startTime: start.time ?? '-',
        endDate: end.date ?? '-',
        endTime: end.time ?? '-',
      }
    } else {
      const single = pickParts(todo, 'scheduledAt', 'dateSingle', 'timeSingle')
      return {
        isRange: false,
        date: single.date ?? '-',
        time: single.time ?? '-',
      }
    }
  }, [todo])

  if (!todo || !display) return <div className="p-4">불러오는 중…</div>

  return (
    <div className="flex flex-col gap-5">
      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <BadgeLike label="상태" value={getStatusLabel(todo.status as STATUS_TYPE)} />
          <BadgeLike label="우선순위" value={todo.priority} />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">기간</span>
        </div>

        {display.isRange ? (
          <div className="flex gap-5">
            <div className="flex gap-4">
              <ReadField label="시작 날짜" value={display.startDate} />
              <ReadField label="시작 시간" value={display.startTime} />
            </div>
            <div className="flex gap-4">
              <ReadField label="종료 날짜" value={display.endDate} />
              <ReadField label="종료 시간" value={display.endTime} />
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <ReadField label="날짜" value={display.date} />
            <ReadField label="시간" value={display.time} />
          </div>
        )}
      </section>

      {todo.description?.trim() && (
        <section className="space-y-2">
          <div className="text-sm font-medium">설명</div>
          <p className="rounded-md border p-3 text-sm leading-6">{todo.description}</p>
        </section>
      )}

      <div className="flex justify-end gap-2">
        <BaseDialog
          title={PROPS_INFO.update.title}
          des={PROPS_INFO.update.description}
          trigger={<Button type="button">수정하기</Button>}
        >
          {({ close }) => <TodoForm type="update" todoId={todo.id} onCancel={close} />}
        </BaseDialog>

        <BaseDialog
          title={STATUS_DIALOG_TEXT.remove.title}
          des={STATUS_DIALOG_TEXT.remove.description}
          trigger={
            <Button type="button" className="text-red-500">
              삭제하기
            </Button>
          }
        >
          {({ close }) => (
            <EditDialog
              variant="remove"
              todo={todo}
              onCancel={close}
              onSuccess={async () => {
                await removeTodo(todo.id)
                close()
              }}
            />
          )}
        </BaseDialog>
      </div>
    </div>
  )
}

function ReadField({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="min-h-[36px] rounded-md border px-3 py-2 text-sm">{value ?? '-'}</span>
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
