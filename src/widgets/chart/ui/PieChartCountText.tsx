'use client'

import { useTodoStore } from '@/entities/todo'
import * as Shadcn from '@/shared/ui/shadcn'
import { useMemo } from 'react'
import { Cell, Label, Pie, PieChart } from 'recharts'
import { pieChartConfig, STATUS_ORDER } from '../lib/constant'
import { filterThisWeekKST, groupByStatus, makeStatusChartData } from '../model/util'

export default function PieChartCountText() {
  const items = useTodoStore((s) => s.items)
  const weekItems = useMemo(() => filterThisWeekKST(items), [items])
  const chartData = useMemo(() => makeStatusChartData(weekItems), [weekItems])
  const groupedThisWeek = useMemo(() => groupByStatus(weekItems), [weekItems])

  const { topStatuses, topCount, total } = useMemo(() => {
    let max = 0
    for (const s of STATUS_ORDER) {
      const n = groupedThisWeek[s]?.length ?? 0
      if (n > max) max = n
    }
    const top = STATUS_ORDER.filter((s) => (groupedThisWeek[s]?.length ?? 0) === max)
    const totalCount = weekItems.length
    return { topStatuses: top, topCount: max, total: totalCount }
  }, [groupedThisWeek, weekItems.length])

  return (
    <Shadcn.Card className="flex flex-col">
      <Shadcn.CardHeader className="items-center pb-0">
        <Shadcn.CardTitle>작업 상태(주간)</Shadcn.CardTitle>
        <Shadcn.CardDescription>2024년도 9월 n주차</Shadcn.CardDescription>
      </Shadcn.CardHeader>

      <Shadcn.CardContent className="flex-1 pb-0">
        <Shadcn.ChartContainer
          config={pieChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Shadcn.ChartTooltip
              cursor={false}
              content={<Shadcn.ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="status" innerRadius={60} strokeWidth={5}>
              {/* ✅ 각 조각 색 지정 */}
              {chartData.map((d) => (
                <Cell key={d.status} fill={`var(--color-${d.status})`} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox)) return null
                  const labels =
                    topStatuses.length > 0
                      ? topStatuses
                          .map((s) => pieChartConfig[s as keyof typeof pieChartConfig]?.label ?? s)
                          .join(', ')
                      : '데이터 없음'
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {labels}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {total > 0
                          ? `${topCount.toLocaleString()} / ${total.toLocaleString()}`
                          : '0'}
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </Shadcn.ChartContainer>
      </Shadcn.CardContent>
    </Shadcn.Card>
  )
}
