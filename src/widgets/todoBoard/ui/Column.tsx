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
    <section
      className={cn('rounded-2xl border shadow-sm backdrop-blur-sm overflow-hidden', tone.ring)}
    >
      <header className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <span className={cn('h-2.5 w-2.5 rounded-full', tone.dot)} />
          <h2 className={cn('text-sm font-semibold', tone.text)}>{title}</h2>
        </div>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm border',
            tone.text
          )}
        >
          {count}
        </span>
      </header>

      <div className={cn('min-h-[150px] h-full p-3 space-y-3', tone.bodyBg)}>{children}</div>
    </section>
  )
}
