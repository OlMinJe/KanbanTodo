import { asYMD, ensureHMS, fmt, KST_TZ, msFromKST, partsInTZ } from '@/shared/lib'

export function buildWhen(dateSingle: string, timeSingle: string): { date: string; time: string } {
  if (!dateSingle || !timeSingle) {
    return {
      date: '날짜 데이터가 없습니다',
      time: '시간 데이터가 없습니다.',
    }
  }

  console.log(typeof dateSingle)

  const ymd = typeof dateSingle === 'string' ? dateSingle.slice(0, 10) : asYMD(dateSingle)
  const hms = ensureHMS(timeSingle ?? '00:00:00')
  const ms = msFromKST(ymd, hms)
  const d = new Date(ms)
  return {
    date: fmt(d, 'ko-KR', { dateStyle: 'full' }, KST_TZ),
    time: partsInTZ(d, KST_TZ).time.slice(0, 5),
  }
}
