import { type STATUS_TYPE, type TODO, type TODO_HISTORY } from '@/entities/todo'
import { partsInTZ } from '@/shared/lib'
import { Badge } from '@/shared/ui/shadcn'
import { TYPE_INFO, buildWhen } from '@/widgets/timeline'
import { Calendar, Clock, Pencil } from 'lucide-react'
import { type ReactNode } from 'react'

type Props = {
  todo: TODO
  history: TODO_HISTORY
  renderMenu: ReactNode
}

export default function TimelineItem({ todo, history, renderMenu }: Props) {
  const info = TYPE_INFO[history.to as STATUS_TYPE] || TYPE_INFO.todo
  const when = buildWhen(todo.dateSingle as any, todo.timeSingle as any)

  return (
    <div className="relative pl-12">
      <div className="absolute left-[22px] top-2 h-4 w-4 rounded-full ring-4 ring-background/60 shadow-sm flex items-center justify-center">
        <div className={`h-2.5 w-2.5 rounded-full ${info.dotClass}`} />
      </div>
      <div
        aria-hidden
        className="absolute left-[30px] -translate-x-1/2 top-[45px] bottom-0 w-px bg-border"
      />

      <div className="max-w-[500px] md:w-[500px] border border-gray-200/70 rounded-xl p-4 flex items-start gap-3">
        <div className="flex flex-col min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0 mb-1">
              <Badge variant="outline" className={`h-5 px-2 text-[11px] ${info.badgeClass}`}>
                {info.badge}
              </Badge>
              <h4 className="flex-1 min-w-0 text-sm font-medium leading-none tracking-tight truncate">
                {todo.title}
              </h4>
            </div>

            <div className="mb-1 flex items-center gap-3 text-[11px] text-muted-foreground">
              {!!when?.date && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {when.date}
                </span>
              )}
              {!!when?.time && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {when.time}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground line-clamp-1 mb-2">
              {todo.description || '-'}
            </p>

            <div className="flex items-center gap-1">
              {history.meta?.reason && !history.meta?.mood && <Pencil width={15} height={15} />}
              {history.meta?.mood && (
                <span className="pr-1 h-[17px] text-sm flex">{history.meta.mood}</span>
              )}
              {history.meta?.reason && (
                <p className={`mt-1 text-sm text-muted-foreground ${info.spanClass}`}>
                  {history.meta.reason}
                </p>
              )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{todo.tags}</div>
            <span className="text-xs text-muted-foreground">
              {history.at && partsInTZ(new Date(history.at)).date}{' '}
              {history.at && partsInTZ(new Date(history.at)).time}
            </span>
          </div>
        </div>

        <div className="ml-auto shrink-0 flex flex-col items-end gap-2">{renderMenu}</div>
      </div>
    </div>
  )
}
