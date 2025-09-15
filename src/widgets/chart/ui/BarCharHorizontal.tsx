'use client'

import { useTodoStore } from '@/entities/todo'
import * as Shadcn from '@/shared/ui/shadcn'
import {
  barCharHorizontalConfig,
  filterThisWeekKST,
  groupByStatus,
  makeStatusChartData,
  STATUS_ORDER,
  weekLabelKST,
} from '@/widgets/chart'
import { useMemo } from 'react'
import { Bar, BarChart, Cell, XAxis, YAxis } from 'recharts'

export default function BarCharHorizontal() {
  const items = useTodoStore((s) => s.items)
  const weekItems = useMemo(() => filterThisWeekKST(items), [items])
  const chartData = useMemo(() => makeStatusChartData(weekItems), [weekItems])
  const groupedThisWeek = useMemo(() => groupByStatus(weekItems), [weekItems])

  const desc = useMemo(() => weekLabelKST(new Date()), [])

  const { topStatuses, topCount } = useMemo(() => {
    let max = 0
    for (const s of STATUS_ORDER) {
      const n = groupedThisWeek[s]?.length ?? 0
      if (n > max) max = n
    }
    return {
      topStatuses: STATUS_ORDER.filter((s) => (groupedThisWeek[s]?.length ?? 0) === max),
      topCount: max,
    }
  }, [groupedThisWeek])

  const total = items.length
  const pct = total ? (topCount / total) * 100 : 0

  return (
    <Shadcn.Card>
      <Shadcn.CardHeader>
        <Shadcn.CardTitle>작업 상태(주간)</Shadcn.CardTitle>
        <Shadcn.CardDescription>{desc}</Shadcn.CardDescription>
      </Shadcn.CardHeader>
      <Shadcn.CardContent>
        <Shadcn.ChartContainer config={barCharHorizontalConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                barCharHorizontalConfig[value as keyof typeof barCharHorizontalConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <Shadcn.ChartTooltip
              cursor={false}
              content={<Shadcn.ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5}>
              {chartData.map((d) => (
                <Cell key={d.status} fill={`var(--color-${d.status})`} />
              ))}
            </Bar>
          </BarChart>
        </Shadcn.ChartContainer>
      </Shadcn.CardContent>
      <Shadcn.CardFooter className="text-sm flex-col gap-1">
        <p>
          <b>{topStatuses}</b>
          {pct.toFixed(2)}% ({topCount}/{total})
        </p>
        <p>로 가장 높은 비율을 차지합니다!</p>
      </Shadcn.CardFooter>
    </Shadcn.Card>
  )
}
