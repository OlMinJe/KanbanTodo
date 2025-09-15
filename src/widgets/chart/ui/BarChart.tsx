'use client'

import { TODO_STATUS, useTodoStore } from '@/entities/todo'
import * as Shadcn from '@/shared/ui/shadcn'
import { barChartConfig, doneWeekday, filterWeekKST, weekLabelKST } from '@/widgets/chart'
import { TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import { Bar, BarChart as BaseBarChart, CartesianGrid, XAxis } from 'recharts'

export default function BarChart() {
  const items = useTodoStore((s) => s.items)
  const data = useMemo(() => doneWeekday(items), [items])
  const desc = useMemo(() => weekLabelKST(new Date()), [])

  // 주차 데이터
  const thisWeek = useMemo(() => filterWeekKST(items), [items])
  const lastWeek = useMemo(() => {
    const ref = new Date()
    ref.setDate(ref.getDate() - 7)
    return filterWeekKST(items, ref)
  }, [items])

  // 완료 총합
  const doneThis = useMemo(
    () => thisWeek.filter((t) => t.status === TODO_STATUS.DONE).length,
    [thisWeek]
  )
  const totalThis = useMemo(
    () => thisWeek.filter((t) => t.status !== TODO_STATUS.REMOVE).length,
    [thisWeek]
  )
  const rate = totalThis ? (doneThis / totalThis) * 100 : 0

  const doneLast = useMemo(
    () => lastWeek.filter((t) => t.status === TODO_STATUS.DONE).length,
    [lastWeek]
  )
  const diff = doneThis - doneLast
  const diffPct = doneLast === 0 ? (doneThis > 0 ? 100 : 0) : (diff / doneLast) * 100
  const trendClass =
    diffPct > 0 ? 'text-emerald-600' : diffPct < 0 ? 'text-rose-600' : 'text-muted-foreground'
  const sign = diffPct > 0 ? '+' : diffPct < 0 ? '' : '' // 0%면 부호 없음

  return (
    <Shadcn.Card>
      <Shadcn.CardHeader>
        <Shadcn.CardTitle>완료율 주간 기록</Shadcn.CardTitle>
        <Shadcn.CardDescription>{desc}</Shadcn.CardDescription>
      </Shadcn.CardHeader>

      <Shadcn.CardContent>
        <Shadcn.ChartContainer config={barChartConfig}>
          <BaseBarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(v: string) => v.slice(0, 3)}
            />
            <Shadcn.ChartTooltip
              cursor={false}
              content={<Shadcn.ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BaseBarChart>
        </Shadcn.ChartContainer>
      </Shadcn.CardContent>

      <Shadcn.CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-medium">완료율 {rate.toFixed(0)}%</span>
          <span className="text-muted-foreground">
            총 {totalThis.toLocaleString()}건 · 완료 {doneThis.toLocaleString()}건
          </span>
        </div>
        <div className={`flex items-center gap-2 ${trendClass}`}>
          <TrendingUp className="h-4 w-4" />
          <span>
            전주 대비 {sign}
            {Math.abs(diffPct).toFixed(1)}%
          </span>
        </div>
      </Shadcn.CardFooter>
    </Shadcn.Card>
  )
}
