import { type STATUS_TYPE } from '@/entities/todo'
import { STATUS_LABELS } from '@/features/todoDialog'
import type { PropsWithChildren } from 'react'

export default function Column({
  title,
  status,
  count,
  children,
}: PropsWithChildren<{ title: string; status: STATUS_TYPE; count: string }>) {
  const color =
    status === STATUS_LABELS.todo
      ? 'bg-gray-400'
      : status === STATUS_LABELS.inProgress
        ? 'bg-blue-400'
        : status === STATUS_LABELS.hold
          ? 'bg-yellow-400'
          : 'bg-green-400'

  return (
    <section className="rounded-xl p-2 min-w-[240px] min-h-[200px]">
      <header>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            <h2 className="font-semibold text-sm">{title}</h2>
          </div>
          <span className="rounded-md bg-white/30 px-2 py-0.5 text-xs shadow-sm">{count || 2}</span>
        </div>
      </header>
      <div className="grid gap-2">{children}</div>
    </section>
  )
}
