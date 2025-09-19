import type { STATUS_TYPE, TODO } from '@/entities/todo'
import { TODO_STATUS } from '@/entities/todo'
import { fromTZDateISO, KST_TZ, partsInTZ, toTZDateISO } from '@/shared/lib'
import { DAY_MS, STATUS_ORDER } from '@/widgets/chart'

// [ ] lib로 분리 필요
export function groupByStatus(items: TODO[]) {
  const g: Record<STATUS_TYPE, TODO[]> = {
    [TODO_STATUS.TODO]: [],
    [TODO_STATUS.DOING]: [],
    [TODO_STATUS.DEFER]: [],
    [TODO_STATUS.DONE]: [],
    [TODO_STATUS.REMOVE]: [],
  }
  for (const t of items) g[t.status].push(t)
  return g
}

export function makeStatusChartData(items: TODO[]) {
  const g = groupByStatus(items)
  return STATUS_ORDER.map((s) => ({
    status: s,
    count: g[s]?.length ?? 0,
  }))
}

// 하루 전체 구간을 반환
export function dayWindowMs(ymd: string | null | undefined): [number, number] {
  const start = Date.parse(toTZDateISO(ymd)!)
  const end = start + DAY_MS - 1 // 하루 끝까지
  return [start, end]
}

export function filterWeekKST(items: TODO[], ref: Date = new Date()) {
  const { date: todayYMD } = partsInTZ(ref, KST_TZ)

  const weekdayShort = new Intl.DateTimeFormat('en-US', {
    timeZone: KST_TZ,
    weekday: 'short',
  }).format(ref) as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

  const sun0 = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[weekdayShort]
  const daysFromMonday = (sun0 + 6) % 7

  const shiftYMD = (ymd: string, days: number) => {
    const base = Date.parse(toTZDateISO(ymd, KST_TZ)!)
    return partsInTZ(new Date(base + days * 86_400_000), KST_TZ).date
  }

  const startYMD = shiftYMD(todayYMD, -daysFromMonday) // 이번주 월
  const endYMD = shiftYMD(startYMD, 6) // 이번주 일

  const startMs = Date.parse(toTZDateISO(startYMD, KST_TZ)!)
  const endMs = Date.parse(toTZDateISO(endYMD, KST_TZ)!) + DAY_MS - 1 // 일요일 23:59:59.999
  return items.filter((t) => {
    const [sMs, eMs] = dayWindowMs(t.dateSingle)
    return eMs >= startMs && sMs <= endMs
  })
}

export function doneWeekday(items: TODO[]) {
  const week = filterWeekKST(items)
  const counts = [0, 0, 0, 0, 0, 0, 0]

  for (const t of week) {
    if (t.status !== TODO_STATUS.DONE) continue

    const ms = fromTZDateISO(t.dateSingle)
    if (Number.isNaN(ms)) continue

    const wd = new Intl.DateTimeFormat('en-US', {
      timeZone: KST_TZ,
      weekday: 'short',
    }).format(new Date()) as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

    const idx = ({ Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 } as const)[wd]
    counts[idx]++
  }

  const labels = ['월', '화', '수', '목', '금', '토', '일'] as const
  return labels.map((label, i) => ({ label, count: counts[i] }))
}

export function weekLabelKST(ref: Date = new Date()) {
  const { date } = partsInTZ(ref, KST_TZ) // 'YYYY-MM-DD'
  const [yy, mm, dd] = date.split('-').map(Number)

  const firstDay = new Date()
  const wd = new Intl.DateTimeFormat('en-US', { timeZone: KST_TZ, weekday: 'short' }).format(
    firstDay
  ) as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

  const sun0 = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd]
  const firstMonShift = (sun0 + 6) % 7
  const weekIndex = Math.floor((firstMonShift + (dd - 1)) / 7) + 1

  return `${yy}년도 ${mm}월 ${weekIndex}주차`
}
