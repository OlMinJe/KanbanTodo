import type { FORM_ERRORS, STATUS_TYPE } from '@/entities/todo'
import { STATUS_LABELS } from '@/features/todoDialog'
import { type RAW_DATE } from '@/shared/lib'

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

export const makeScheduleErrors = (ds: RAW_DATE, ts: string | null): FORM_ERRORS => {
  const e: FORM_ERRORS = {}
  if (!ds) e.dateSingle = '날짜를 선택하세요.'
  if (!ts) e.timeSingle = '시간을 입력하세요.'
  return e
}

export const getStatusLabel = (code: STATUS_TYPE) => STATUS_LABELS[code]
