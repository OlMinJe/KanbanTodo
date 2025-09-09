import type { FORM_ERRORS, SCHEDULE_PAYLOAD, STATUS_TYPE } from '@/entities/todo'
import { toISO } from '@/shared/lib'

export const makeCoreErrors = (
  title: string,
  status: STATUS_TYPE | '',
  priority: string
): FORM_ERRORS => {
  const e: FORM_ERRORS = {}
  if (!title.trim()) e.title = '제목을 입력하세요.'
  if (!status) e.status = '작업 상태를 선택하세요.'
  if (!priority) e.priority = '작업 순위를 선택하세요.'
  return e
}

export const makeScheduleErrors = (
  isRange: boolean,
  ds: Date | null,
  ts: string,
  dS: Date | null,
  tS: string,
  dE: Date | null,
  tE: string
): FORM_ERRORS => {
  const e: FORM_ERRORS = {}
  if (!isRange) {
    if (!ds) e.date = '날짜를 선택하세요.'
    if (!ts) e.time = '시간을 입력하세요.'
  } else {
    if (!dS) e.dateStart = '시작 날짜를 선택하세요.'
    if (!tS) e.timeStart = '시작 시간을 입력하세요.'
    if (!dE) e.dateEnd = '종료 날짜를 선택하세요.'
    if (!tE) e.timeEnd = '종료 시간을 입력하세요.'
    const s = toISO(dS, tS)
    const f = toISO(dE, tE)
    if (s && f && new Date(s) > new Date(f)) e.range = '종료가 시작보다 빠를 수 없습니다.'
  }
  return e
}

export const buildSchedule = (
  isRange: boolean,
  ds: Date | null,
  ts: string,
  dS: Date | null,
  tS: string,
  dE: Date | null,
  tE: string
): SCHEDULE_PAYLOAD =>
  !isRange
    ? { type: 'single', at: toISO(ds, ts) }
    : { type: 'range', start: toISO(dS, tS), end: toISO(dE, tE) }
