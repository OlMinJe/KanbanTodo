import { TODO_STATUS, type STATUS_TYPE } from '@/entities/todo'

type Tone = {
  text: string // 헤더 텍스트
  dot: string // 헤더 점 색
  ring: string // 섹션 외곽선
  bodyBg: string // 본문 배경
}

export const STATUS_TONE: Record<STATUS_TYPE, Tone> = {
  [TODO_STATUS.TODO]: {
    text: 'text-sky-700 dark:text-sky-300',
    dot: 'bg-sky-500',
    ring: 'border-sky-200/70',
    bodyBg: 'bg-sky-50/40 dark:bg-sky-900/10',
  },
  [TODO_STATUS.DOING]: {
    text: 'text-indigo-700 dark:text-indigo-300',
    dot: 'bg-indigo-500',
    ring: 'border-indigo-200/70',
    bodyBg: 'bg-indigo-50/40 dark:bg-indigo-900/10',
  },
  [TODO_STATUS.DEFER]: {
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
    ring: 'border-amber-200/70',
    bodyBg: 'bg-amber-50/40 dark:bg-amber-900/10',
  },
  [TODO_STATUS.DONE]: {
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    ring: 'border-emerald-200/70',
    bodyBg: 'bg-emerald-50/40 dark:bg-emerald-900/10',
  },
  [TODO_STATUS.REMOVE]: {
    text: 'text-zinc-500 dark:text-zinc-400',
    dot: 'bg-zinc-400',
    ring: 'border-zinc-200/70',
    bodyBg: 'bg-zinc-50/40 dark:bg-zinc-900/10',
  },
}
