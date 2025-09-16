import type { PRIORITY_TYPE, STATUS_TYPE, SUBMIT_PAYLOAD, TODO } from '@/entities/todo'
import { TODO_PRIORITY, TODO_STATUS } from '@/entities/todo'
import { fromISO, uuidv4 } from '@/shared/lib'

export function todoCreateDTO(p: SUBMIT_PAYLOAD): TODO {
  const now = new Date().toISOString()
  const status: STATUS_TYPE = (p.status || TODO_STATUS.TODO) as STATUS_TYPE
  const priority: PRIORITY_TYPE = (p.priority || TODO_PRIORITY.P2) as PRIORITY_TYPE

  const base: TODO = {
    id: uuidv4(),
    title: p.title.trim(),
    status,
    priority,
    description: p.description?.trim() || null,
    tags: [],
    createdAt: now,
    updatedAt: now,
  }

  const { date, time } = fromISO(p.schedule.at!)
  return { ...base, dateSingle: date, timeSingle: time }
}

export function normalizeUpdateFromPayload(base: TODO, p: SUBMIT_PAYLOAD): TODO {
  const now = new Date().toISOString()
  let next: TODO = {
    ...base,
    title: p.title.trim(),
    status: (p.status || base.status) as STATUS_TYPE,
    priority: (p.priority || base.priority) as PRIORITY_TYPE,
    description: p.description?.trim() || null,
    updatedAt: now,
  }
  const { date, time } = fromISO(p.schedule.at!)
  next = {
    ...next,
    dateSingle: date,
    timeSingle: time,
  }

  return next
}

export const matchStatus = (t: TODO, st?: STATUS_TYPE | STATUS_TYPE[]) => {
  if (!st) return true
  const arr = Array.isArray(st) ? st : [st]
  return arr.includes((t as any).status)
}

export const matchPriority = (t: TODO, ps?: string[]) => {
  if (!ps?.length) return true
  return ps.includes((t as any).priority)
}

export const matchTags = (t: TODO, anyTags?: string[], allTags?: string[]) => {
  const tags: string[] = Array.isArray((t as any).tags) ? (t as any).tags : []
  if (anyTags?.length && !anyTags.some((tag) => tags.includes(tag))) return false
  if (allTags?.length && !allTags.every((tag) => tags.includes(tag))) return false
  return true
}

export const matchQuery = (t: TODO, q?: string) => {
  if (!q?.trim()) return true
  const s = q.trim().toLowerCase()
  return (
    String((t as any).title ?? '')
      .toLowerCase()
      .includes(s) ||
    String((t as any).description ?? '')
      .toLowerCase()
      .includes(s)
  )
}

export const includesYMD = (todo: TODO, ymd: string): boolean => {
  const single = (todo as any).dateSingle
  return !!single && single === ymd
  // }
}
