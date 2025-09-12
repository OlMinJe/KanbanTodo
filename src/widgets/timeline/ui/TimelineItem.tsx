import { type STATUS_TYPE, type TODO, type TODO_HISTORY } from '@/entities/todo'
import { partsInTZ } from '@/shared/lib'
import { Badge } from '@/shared/ui/shadcn'
import { TYPE_INFO } from '@/widgets/timeline'
import { type ReactNode } from 'react'

type Props = {
  todo: TODO
  history: TODO_HISTORY
  renderMenu: ReactNode
}

export default function TimelineItem({ todo, history, renderMenu }: Props) {
  const info = TYPE_INFO[history.to as STATUS_TYPE] || TYPE_INFO.todo
  const Icon = info.icon

  return (
    <div className="relative pl-12">
      <div className="absolute left-[22px] top-2 h-4 w-4 rounded-full ring-4 ring-background/60 shadow-sm flex items-center justify-center">
        <div className={`h-2.5 w-2.5 rounded-full ${info.dotClass}`} />
      </div>
      <div
        aria-hidden
        className="absolute left-[30px] -translate-x-1/2 top-[45px] bottom-0 w-px bg-border"
      />

      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full border bg-muted/40 p-2 text-muted-foreground">
          <Icon className="size-4" />
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {history.at && partsInTZ(new Date(history.at)).date}{' '}
            {history.at && partsInTZ(new Date(history.at)).time}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium leading-none truncate">{todo.title}</h4>
              <Badge variant="outline" className={`h-5 px-2 text-[11px] ${info.badgeClass}`}>
                {info.badge}
              </Badge>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">{todo.description || '-'}</p>

            {history.meta?.reason ? (
              <p className={`mt-1 text-sm text-muted-foreground" ${info.spanClass}`}>
                {history.meta.reason}
              </p>
            ) : null}

            <div className="mt-1 text-xs text-muted-foreground">{todo.tags}</div>
          </div>
        </div>

        <div className="ml-auto shrink-0 flex flex-col items-end gap-2">{renderMenu}</div>
      </div>
    </div>
  )
}
