export type DateInput = Date | string | number | null | undefined

export function fmt(d: DateInput, fallback = ''): string {
  if (d == null) return fallback
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return fallback
  return date.toISOString().slice(0, 10) // YYYY-MM-DD
}

// fmt(new Date())                                  // 2025. 08. 26. (예시)
// fmt(new Date(), 'ko-KR', { dateStyle: 'full' })  // 2025년 8월 26일 화요일
// fmt(new Date(), 'ko-KR', { dateStyle: 'medium', timeStyle: 'short' }) // 날짜+시간
