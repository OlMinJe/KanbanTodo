export type DateInput = Date | string | number | null | undefined

export const KST_TZ = 'Asia/Seoul' as const

// Date 파라미터 정규화
const asDate = (d: DateInput): Date | null => {
  if (d == null) return null
  const date = d instanceof Date ? d : new Date(d)
  return Number.isNaN(date.getTime()) ? null : date
}

// TZ 기준 Y/M/D 숫자 파싱 (toISO에서만 사용)
const ymdInTZ = (date: Date, tz: string = KST_TZ) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const y = Number(parts.find((p) => p.type === 'year')!.value)
  const m = Number(parts.find((p) => p.type === 'month')!.value)
  const d = Number(parts.find((p) => p.type === 'day')!.value)
  return { y, m, d }
}
const pad2 = (n: number) => String(n).padStart(2, '0')

// 공통 포맷 헬퍼: 주어진 Date를 지정 TZ 기준으로 {date, time} 문자열로 변환
//  - date: 'YYYY-MM-DD' (en-CA)
//  - time: 'HH:mm:ss'   (en-GB, 24h, zero-pad)
const partsInTZ = (date: Date, tz: string) => {
  const dateStr = date.toLocaleDateString('en-CA', { timeZone: tz }) // YYYY-MM-DD
  const timeStr = date.toLocaleTimeString('en-GB', {
    timeZone: tz,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) // HH:mm:ss
  return { date: dateStr, time: timeStr }
}

// ──────────────────────────────────────────────────────────
/** ko-KR 사용자용 가독 포맷
 *  - fmt(new Date()) -> "2025. 8. 26."
 *  - fmt(new Date(), 'ko-KR', { dateStyle: 'full' }) -> "2025년 8월 26일 화요일"
 *  - fmt(new Date(), 'ko-KR', { dateStyle: 'medium', timeStyle: 'short' })
 */
export function fmt(
  d: DateInput,
  locale: string = 'ko-KR',
  opts?: Intl.DateTimeFormatOptions,
  tz: string = KST_TZ,
  fallback = ''
): string {
  const date = asDate(d)
  if (!date) return fallback
  return new Intl.DateTimeFormat(locale, { timeZone: tz, ...(opts ?? {}) }).format(date)
}

// YYYY-MM-DD (기본 KST)
export function ymd(d: DateInput, tz: string = KST_TZ, fallback = ''): string {
  const date = asDate(d)
  if (!date) return fallback
  return date.toLocaleDateString('en-CA', { timeZone: tz })
}

// 현재 시각을 KST로 쪼갠 값
export const nowParts = (tz: string = KST_TZ) => partsInTZ(new Date(), tz)

// 서버에서 가져온 ISO(UTC)를 KST로 변환
export function fromISO(iso?: string | null, tz: string = KST_TZ) {
  if (!iso) return { date: undefined, time: undefined }
  const d = asDate(iso)
  if (!d) return { date: undefined, time: undefined }
  return partsInTZ(d, tz)
}

// 사용자가 고른 날짜/시간(KST)을 공통 시간(UTC ISO)으로 저장
// - date: Date 또는 'YYYY-MM-DD'
// - time: 'HH:mm' | 'HH:mm:ss'
export function toISO(date: Date | string | null, time: string, tz: string = KST_TZ) {
  if (!date) return null
  const base = asDate(date)
  if (!base) return null

  const [hh, mm, ssRaw] = (time ?? '').split(':')
  const h = Number(hh || 0)
  const m = Number(mm || 0)
  const s = Number(ssRaw || 0)

  const { y, m: mon, d } = ymdInTZ(base, tz)

  // KST(+09:00)를 공통 시간(UTC) => UTC = KST - 9h
  let utcMs: number
  if (tz === KST_TZ) {
    utcMs = Date.UTC(y, mon - 1, d, h - 9, m, s, 0)
  } else {
    // 필요 시 다른 TZ 지원 가능 (현 요구사항은 KST)
    const guess = new Date(`${y}-${pad2(mon)}-${pad2(d)}T${pad2(h)}:${pad2(m)}:${pad2(s)}`)
    utcMs = guess.getTime()
  }

  return new Date(utcMs).toISOString()
}

// 시간 문자열 정규화 & 파생 유틸
export const ensureHMS = (s?: string) => {
  if (!s) return '00:00:00'
  const parts = s.split(':')
  if (parts.length === 2) return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:00`
  const [hh = '00', mm = '00', ss = '00'] = parts
  return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`
}
export const hms8 = (s?: string) => ensureHMS(s).slice(0, 8)

// Date | 'YYYY-MM-DD' → 'YYYY-MM-DD' (KST)
export const asYMD = (d: string | Date): string => {
  if (typeof d === 'string') return d.slice(0, 10)
  return d.toLocaleDateString('en-CA', { timeZone: KST_TZ })
}

// 특정 epoch(ms)을 KST 기준 {date, time}으로
export const partsAtKST = (ms: number) => {
  return partsInTZ(new Date(ms), KST_TZ)
}

// KST(YYYY-MM-DD + HH:mm:ss) → UTC epoch(ms)
export const msFromKST = (dateYMD?: string, timeHMS?: string) => {
  if (!dateYMD || !timeHMS) return NaN
  const iso = toISO(dateYMD, ensureHMS(timeHMS)) // KST → UTC ISO
  return iso ? new Date(iso).getTime() : NaN
}
