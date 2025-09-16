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

export const makeScheduleErrors = (ds: Date | null, ts: string): FORM_ERRORS => {
  const e: FORM_ERRORS = {}
  if (!ds) e.dateSingle = '날짜를 선택하세요.'
  if (!ts) e.timeSingle = '시간을 입력하세요.'
  return e
}

export const buildSchedule = (ds: Date | null, ts: string): SCHEDULE_PAYLOAD => ({
  type: 'single',
  at: toISO(ds, ts),
})
