import type { STATUS_TYPE, TODO } from '@/entities/todo'
import { TODO_STATUS } from '@/entities/todo'
import { fromTZDateISO, KST_TZ, partsInTZ, toTZDateISO } from '@/shared/lib'
import { STATUS_ORDER } from '@/widgets/chart'

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
  const endMs = Date.parse(toTZDateISO(endYMD, KST_TZ)!)

  return items.filter((t) => {
    let sMs: number, eMs: number
    // sMs = (t.dateSingle ?? undefined, ensureHMS(t.timeSingle ?? '00:00:00'))
    sMs = Number(t.dateSingle)
    eMs = sMs
    if (Number.isNaN(sMs) || Number.isNaN(eMs)) return false
    return eMs >= startMs && sMs <= endMs
  })
}

export function doneWeekday(items: TODO[]) {
  const week = filterWeekKST(items)
  const counts = [0, 0, 0, 0, 0, 0, 0]

  for (const t of week) {
    if (t.status !== TODO_STATUS.DONE) continue

    const ymd = t.dateSingle
    // const hms = t.timeSingle ?? '00:00:00'
    const ms = fromTZDateISO(ymd)
    if (Number.isNaN(ms)) continue

    const wd = new Intl.DateTimeFormat('en-US', {
      timeZone: KST_TZ,
      weekday: 'short',
    }).format(new Date()) as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

    // 월(0)~일(6) 인덱스
    const idx = ({ Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 } as const)[wd]
    counts[idx]++
  }

  const labels = ['월', '화', '수', '목', '금', '토', '일'] as const
  return labels.map((label, i) => ({ label, count: counts[i] }))
}

export function weekLabelKST(ref: Date = new Date()) {
  const { date } = partsInTZ(ref, KST_TZ) // 'YYYY-MM-DD'
  const [yy, mm, dd] = date.split('-').map(Number)

  // const firstIso = toTZDateISO(ref)
  const firstDay = new Date()
  const wd = new Intl.DateTimeFormat('en-US', { timeZone: KST_TZ, weekday: 'short' }).format(
    firstDay
  ) as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

  const sun0 = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd]
  const firstMonShift = (sun0 + 6) % 7
  const weekIndex = Math.floor((firstMonShift + (dd - 1)) / 7) + 1

  return `${yy}년도 ${mm}월 ${weekIndex}주차`
}

export function toWindowMs(t: TODO): [number, number] {
  const s = toTZDateISO(t.dateSingle)
  return [Number(s), Number(s)]
}

export function dayWindowMs(ymd: string): [number, number] {
  const start = Date.parse(toTZDateISO(ymd)!)
  const end = Date.parse(toTZDateISO(ymd)!)
  return [start, end]
}
