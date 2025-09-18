export type RAW_DATE = Date | string | null | undefined
export const KST_TZ = 'Asia/Seoul' as const

export const pad2 = (n: number) => String(n).padStart(2, '0')

export const asDate = (d: RAW_DATE): Date | null => {
  if (d == null) return null
  const date = d instanceof Date ? d : new Date(d)
  return Number.isNaN(date.getTime()) ? null : date
}

/**
 * ensureHMS
 * @param s (string)
 * @returns 'HH:mm:ss'
 */
export const ensureHMS = (s?: string) => {
  if (!s) return '00:00:00'
  const parts = s.split(':')
  if (parts.length === 2) return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:00`
  const [hh = '00', mm = '00', ss = '00'] = parts
  return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`
}

/**
 * asYMD
 * @param d (Date | string)
 * @returns 'YYYY-MM-DD' (KST 기준)
 */
export const asYMD = (d: Date | string) => {
  if (typeof d === 'string') return d.slice(0, 10)
  return d.toLocaleDateString('en-CA', { timeZone: KST_TZ })
}

/**
 * ymdInTZ
 * @param date
 * @param tz
 * @returns y, m, d (TZ 기준으로 Y/M/D 추출)
 */
export const ymdInTZ = (date: Date, tz: string = KST_TZ) => {
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

/**
 * partsInTZ
 * @param date
 * @param tz
 * @returns { date: dateStr, time: timeStr } KST 기준 날짜와 시간 각각 포맷
 */
export const partsInTZ = (date: Date, tz: string = KST_TZ) => {
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

/**
 * function
 * @param d
 * @param locale
 * @param opts
 * @param tz
 * @param fallback
 * @returns "2025년 8월 26일 화요일" 형식의 포맷 가능(ko-KR)
 */
export function fmt(
  d: RAW_DATE,
  locale: string = 'ko-KR',
  opts?: Intl.DateTimeFormatOptions,
  tz: string = KST_TZ,
  fallback = ''
): string {
  const date = asDate(d)
  if (!date) return fallback
  return new Intl.DateTimeFormat(locale, { timeZone: tz, ...(opts ?? {}) }).format(date)
}

/**
 * toServerTZ (입력 => 서버 전송)
 * @param input
 * @param tz
 * @returns UTC ISO
 */
export function toServerTZ(input: RAW_DATE, tz: string = KST_TZ): string | null {
  if (!input) return null

  // Date 에서 ISO로 파싱
  if (typeof input === 'string') {
    const s = input.trim()
    const hasTZ = /([zZ]|[+\-]\d{2}:?\d{2})$/.test(s) // UTC 여부 확인
    if (hasTZ) {
      const d = new Date(s)
      return Number.isNaN(d.getTime()) ? null : d.toISOString()
    }

    // 'YYYY-MM-DD[ T]HH:mm[:ss]'(KST 기준)
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/)
    if (m) {
      const [, y, mo, d, hh = '00', mm = '00', ss = '00'] = m
      const Y = Number(y),
        M = Number(mo),
        D = Number(d)
      const H = Number(hh),
        Min = Number(mm),
        S = Number(ss)

      if (tz === KST_TZ) {
        const utcMs = Date.UTC(Y, M - 1, D, H - 9, Min, S, 0)
        return new Date(utcMs).toISOString()
      } else {
        const guess = new Date(`${y}-${mo}-${d}T${hh}:${mm}:${ss}`)
        return Number.isNaN(guess.getTime()) ? null : guess.toISOString()
      }
    }
  }

  // 문자열 이외
  const base = asDate(input)
  if (!base) return null

  // TZ 기준
  const { y, m, d } = ymdInTZ(base, tz)
  const hms = base.toLocaleTimeString('en-GB', {
    timeZone: tz,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const [hhStr, mmStr, ssStr] = ensureHMS(hms).split(':')
  const H = Number(hhStr)
  const Min = Number(mmStr)
  const S = Number(ssStr)

  if (tz === KST_TZ) {
    const utcMs = Date.UTC(y, m - 1, d, H - 9, Min, S, 0)
    return new Date(utcMs).toISOString()
  } else {
    const guess = new Date(`${y}-${pad2(m)}-${pad2(d)}T${pad2(H)}:${pad2(Min)}:${pad2(S)}`)
    return Number.isNaN(guess.getTime()) ? null : guess.toISOString()
  }
}

/**
 * toTZDateISO - 날짜만(자정 기준)
 * @param dateInput
 * @param tz
 * @returns 예시 '2025-08-26T00:00:00+09:00'
 */
export function toTZDateISO(dateInput: RAW_DATE, tz: string = KST_TZ): string | null {
  const d = asDate(dateInput)
  if (!d) return null
  const ymd = d.toLocaleDateString('en-CA', { timeZone: tz })
  const offset = tz === KST_TZ ? '+09:00' : 'Z'
  return `${ymd}T00:00:00${offset}`
}

/**
 * toTZTimeISO - 시간만(기준일 1970-01-01)
 * @param timeInput
 * @param tz
 * @returns 예시 '1970-01-01T10:30:00+09:00'
 */
export function toTZTimeISO(timeInput?: string | null, tz: string = KST_TZ): string | null {
  const hms = ensureHMS(timeInput ?? '00:00:00')
  const offset = tz === KST_TZ ? '+09:00' : 'Z'
  return `1970-01-01T${hms}${offset}`
}

/**
 * fromServerTZ - UTC ISO => KST
 * @param iso
 * @param tz
 * @returns dateYMD = 'YYYY-MM-DD'
 * @returns timeHMS = 'HH:mm:ss'
 * @returns pretty = '2025년 8월 26일 화요일'
 * @returns dateObj = Date
 */
export function fromServerTZ(
  iso?: string | null,
  tz: string = KST_TZ
): { dateYMD?: string; timeHMS?: string; pretty?: string; dateObj?: Date } {
  const d = asDate(iso)
  if (!d) return {}

  const dateYMD = d.toLocaleDateString('en-CA', { timeZone: tz })
  const timeHMS = d.toLocaleTimeString('en-GB', {
    timeZone: tz,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const pretty = fmt(d, 'ko-KR', { dateStyle: 'full' }, tz)
  const dateObj = new Date(`${dateYMD}T${timeHMS}+09:00`)

  return { dateYMD, timeHMS, pretty, dateObj }
}

/**
 * fromTZDateISO - 날짜만(자정 기준)
 * @param iso
 * @param tz
 * @returns 'YYYY-MM-DD'
 */
export function fromTZDateISO(iso?: string | null, tz: string = KST_TZ): string | undefined {
  const d = asDate(iso)
  if (!d) return undefined
  return d.toLocaleDateString('en-CA', { timeZone: tz })
}

/**
 * fromTZTimeISO - 시간만(기준일 1970-01-01)
 * @param iso
 * @param tz
 * @returns 'HH:mm:ss'
 */
export function fromTZTimeISO(iso?: string | null, tz: string = KST_TZ): string | undefined {
  const d = asDate(iso)
  if (!d) return undefined
  return d.toLocaleTimeString('en-GB', {
    timeZone: tz,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
