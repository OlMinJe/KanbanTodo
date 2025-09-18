import type { STATUS_TYPE, SUBMIT_PAYLOAD, TODO } from '@/entities/todo'
import { uuidv4 } from '@/shared/lib'

export const includesYMD = (todo: TODO, ymd: string): boolean => {
  const single = (todo as any).dateSingle
  return !!single && single === ymd
}

export function todoCreateDTO(p: SUBMIT_PAYLOAD): TODO {
  const now = new Date().toISOString()

  const base: TODO = {
    ...p,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
    title: p.title,
    status: p.status,
    priority: p.priority,
    description: p.description ?? null,
    dateSingle: p.dateSingle,
    timeSingle: p.timeSingle,
  }

  return base
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
