import { type STATUS_TYPE } from '@/entities/todo'
import { cn } from '@/shared/lib'
import { STATUS_TONE } from '../lib/theme'

type Props = {
  status: STATUS_TYPE
  title: string
  count?: string
  children?: React.ReactNode
}
export default function Column({ status, title, count, children }: Props) {
  const tone = STATUS_TONE[status]

  return (
    <section className="rounded-xl p-2 min-h-[200px]">
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <span className={cn('w-2 h-2 rounded-full', tone.bg)} />
          <h2 className={cn('font-semibold text-sm', tone.text)}>{title}</h2>
        </div>
        <span className="rounded-md bg-white/30 px-2 py-0.5 text-xs shadow-sm">{count}</span>
      </header>
      <div className="grid gap-2">{children}</div>
    </section>
  )
}
