import type { STATUS_TYPE } from '@/entities/todo'

export const TYPE_INFO: Record<
  STATUS_TYPE,
  {
    badge: string
    dotClass: string
    badgeClass: string
    spanClass: string
  }
> = {
  todo: {
    badge: 'todo',
    dotClass: 'bg-blue-500',
    badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    spanClass: 'text-blue-500',
  },
  doing: {
    badge: 'doing',
    dotClass: 'bg-amber-500',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    spanClass: 'text-amber-400',
  },
  done: {
    badge: 'done',
    dotClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    spanClass: 'text-emerald-400',
  },
  defer: {
    badge: 'defer',
    dotClass: 'bg-slate-400',
    badgeClass: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    spanClass: 'text-slate-400',
  },
  remove: {
    badge: 'remove',
    dotClass: 'bg-rose-500',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    spanClass: 'text-rose-400',
  },
}
