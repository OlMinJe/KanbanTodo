import type { STATUS_TYPE } from '@/entities/todo/types'

export const STATUS_TONE: Record<STATUS_TYPE, { bg: string; text: string; pill: string }> = {
  todo: {
    bg: 'bg-gray-400',
    text: 'text-gray-400',
    pill: 'bg-slate-200',
  },
  doing: {
    bg: 'bg-blue-400',
    text: 'text-blue-400',
    pill: 'bg-indigo-200',
  },
  defer: {
    bg: 'bg-yellow-400',
    text: 'text-yellow-400',
    pill: 'bg-amber-200',
  },
  done: {
    bg: 'bg-green-400',
    text: 'text-green-400',
    pill: 'bg-emerald-200',
  },
  remove: {
    bg: 'bg-red-400',
    text: 'text-red-400',
    pill: 'bg-rose-200',
  },
}
