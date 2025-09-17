import { useTodoStore } from '@/entities/todo'
import * as Shadcn from '@/shared/ui/shadcn'
import {
  filterWeekKST,
  groupByStatus,
  horizontalConfig,
  makeStatusChartData,
  STATUS_ORDER,
  weekLabelKST,
} from '@/widgets/chart'
import { useMemo } from 'react'
import { Bar, BarChart, Cell, XAxis, YAxis } from 'recharts'

export default function BarCharHorizontal() {
  const items = useTodoStore((s) => s.items)
  const weekItems = useMemo(() => filterWeekKST(items), [items])
  const chartData = useMemo(() => makeStatusChartData(weekItems), [weekItems])
  const groupedThisWeek = useMemo(() => groupByStatus(weekItems), [weekItems])

  const desc = useMemo(() => weekLabelKST(new Date()), [])

  const { topStatuses, topCount, total } = useMemo(() => {
    let max = 0
    for (const s of STATUS_ORDER) {
      const n = groupedThisWeek[s]?.length ?? 0
      if (n > max) max = n
    }
    return {
      topStatuses: STATUS_ORDER.filter((s) => (groupedThisWeek[s]?.length ?? 0) === max),
      topCount: max,
      total: weekItems.length,
    }
  }, [groupedThisWeek, weekItems.length])

  const pct = total ? (topCount / total) * 100 : 0

  return (
    <Shadcn.Card className="content-around">
      <Shadcn.CardHeader>
        <Shadcn.CardTitle>작업 상태(주간)</Shadcn.CardTitle>
        <Shadcn.CardDescription>{desc}</Shadcn.CardDescription>
      </Shadcn.CardHeader>
      <Shadcn.CardContent>
        <Shadcn.ChartContainer config={horizontalConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -10,
            }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                horizontalConfig[value as keyof typeof horizontalConfig]?.label
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
        <div>
          <b>{topStatuses}</b> <span className="text-red-400">{pct.toFixed(2)}%</span>
          <span className="text-gray-400">
            ({topCount}/{total})
          </span>
          로
        </div>
        <p>가장 높은 비율을 차지합니다!</p>
      </Shadcn.CardFooter>
    </Shadcn.Card>
  )
}
