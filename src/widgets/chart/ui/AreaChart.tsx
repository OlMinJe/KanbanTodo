'use client'

import { TODO_STATUS, useTodoStore } from '@/entities/todo'
import { KST_TZ, partsInTZ, toTZDateISO } from '@/shared/lib'
import * as Shadcn from '@/shared/ui/shadcn'
import { chartConfig, DAY_MS, DAYS, dayWindowMs, STATUS_ORDER } from '@/widgets/chart'
import { useMemo } from 'react'
import { Area, AreaChart as BaseAreaChart, CartesianGrid, XAxis } from 'recharts'

type ROW = { date: string } & Record<(typeof STATUS_ORDER)[number], number>

export default function AreaChart() {
  const items = useTodoStore((s) => s.items)

  const data = useMemo(() => {
    const { date: todayYMD } = partsInTZ(new Date(), KST_TZ)
    const startMs = Date.parse(toTZDateISO(todayYMD)!) - (DAYS - 1) * DAY_MS
    const windows = items.map((t) => ({ t, w: dayWindowMs(t.dateSingle) }))

    const rows: ROW[] = []
    for (let i = 0; i < DAYS; i++) {
      const curMs = startMs + i * DAY_MS
      const ymd = partsInTZ(new Date(curMs), KST_TZ).date
      const [dStart, dEnd] = dayWindowMs(ymd)

      const acc = {
        [TODO_STATUS.TODO]: 0,
        [TODO_STATUS.DOING]: 0,
        [TODO_STATUS.DEFER]: 0,
        [TODO_STATUS.DONE]: 0,
        [TODO_STATUS.REMOVE]: 0,
      } as Record<(typeof STATUS_ORDER)[number], number>

      for (const {
        t,
        w: [sMs, eMs],
      } of windows) {
        if (Number.isNaN(sMs) || Number.isNaN(eMs)) continue
        if (eMs >= dStart && sMs <= dEnd) acc[t.status]++
      }

      rows.push({ date: ymd, ...acc })
    }
    return rows
  }, [items])

  return (
    <Shadcn.Card className="pt-0">
      <Shadcn.CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <Shadcn.CardTitle>상태별 월간 기록</Shadcn.CardTitle>
          <Shadcn.CardDescription>최근 30일 상태별</Shadcn.CardDescription>
        </div>
      </Shadcn.CardHeader>

      <Shadcn.CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <Shadcn.ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <BaseAreaChart data={data}>
            <defs>
              {STATUS_ORDER.map((s) => (
                <linearGradient key={s} id={`fill-${s}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`var(--color-${s})`} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={`var(--color-${s})`} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) =>
                new Date(value).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })
              }
            />

            <Shadcn.ChartTooltip
              cursor={false}
              content={
                <Shadcn.ChartTooltipContent
                  labelFormatter={(value: string) =>
                    new Date(value).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
                  }
                  indicator="dot"
                />
              }
            />

            {STATUS_ORDER.map((s) => (
              <Area
                key={s}
                dataKey={s}
                type="linear"
                stackId="a"
                fill={`url(#fill-${s})`}
                stroke={`var(--color-${s})`}
              />
            ))}

            <Shadcn.ChartLegend content={<Shadcn.ChartLegendContent />} />
          </BaseAreaChart>
        </Shadcn.ChartContainer>
      </Shadcn.CardContent>
    </Shadcn.Card>
  )
}
