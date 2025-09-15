'use client'

import { useTodoStore } from '@/entities/todo'
import * as Shadcn from '@/shared/ui/shadcn'
import { barChartConfig, doneThisWeekByWeekday, weekLabelKST } from '@/widgets/chart'
import { TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import { Bar, BarChart as BaseBarChart, CartesianGrid, XAxis } from 'recharts'

export default function BarChart() {
  const items = useTodoStore((s) => s.items)
  const data = useMemo(() => doneThisWeekByWeekday(items), [items])
  const desc = useMemo(() => weekLabelKST(new Date()), [])

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
              tickFormatter={(value) => value.slice(0, 3)}
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
          <span className="font-medium">완료율 72%</span>
          <span className="text-muted-foreground">총 58건 · 완료 42건</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-600">
          <TrendingUp className="h-4 w-4" />
          <span>전주 대비 +5.2%</span>
        </div>
      </Shadcn.CardFooter>
    </Shadcn.Card>
  )
}
