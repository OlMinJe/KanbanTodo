export function fmt(
  d?: Date,
  locale = 'ko-KR',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeZone: 'Asia/Seoul' }
): string {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat(locale, options).format(d)
  } catch {
    return d.toISOString().slice(0, 10)
  }
}

// fmt(new Date())                                  // 2025. 08. 26. (예시)
// fmt(new Date(), 'ko-KR', { dateStyle: 'full' })  // 2025년 8월 26일 화요일
// fmt(new Date(), 'ko-KR', { dateStyle: 'medium', timeStyle: 'short' }) // 날짜+시간
