import { TODO_STATUS, type STATUS_TYPE } from '@/entities/todo'
import type { ChartConfig } from '@/shared/ui/shadcn'

export const STATUS_ORDER: STATUS_TYPE[] = [
  TODO_STATUS.TODO,
  TODO_STATUS.DOING,
  TODO_STATUS.DEFER,
  TODO_STATUS.DONE,
  TODO_STATUS.REMOVE,
]

export const barChartConfig = {
  count: {
    label: '작업 갯수',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const commonChartConfig = {
  todo: {
    label: 'todo',
    color: 'var(--chart-1)',
  },
  doing: {
    label: 'doing',
    color: 'var(--chart-2)',
  },
  defer: {
    label: 'defer',
    color: 'var(--chart-3)',
  },
  done: {
    label: 'done',
    color: 'var(--chart-4)',
  },
  remove: {
    label: 'remove',
    color: 'var(--chart-5)',
  },
}

export const horizontalConfig = {
  status: {
    label: '작업 상태',
  },
  ...commonChartConfig,
} satisfies ChartConfig

export const chartConfig = {
  count: {
    label: '작업 갯수',
  },
  ...commonChartConfig,
} satisfies ChartConfig

export const DAY_MS = 86_400_000
export const DAYS = 30 as const
