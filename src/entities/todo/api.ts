import {
  TODO_PRIORITY,
  TODO_STATUS,
  type PRIORITY_TYPE,
  type STATUS_TYPE,
  type SUBMIT_PAYLOAD,
  type TODO,
} from '@/entities/todo'
import { fromISO, loadJSON, saveJSON, uuidv4 } from '@/shared/lib'

const STORAGE_KEY = '@kanban/todos'

export function todoCreateDTO(p: SUBMIT_PAYLOAD): TODO {
  const now = new Date().toISOString()
  const status: STATUS_TYPE = (p.taskStatus || TODO_STATUS.TODO) as STATUS_TYPE
  const priority: PRIORITY_TYPE = (p.priority || TODO_PRIORITY.P2) as PRIORITY_TYPE

  const base: TODO = {
    id: uuidv4(),
    title: p.title.trim(),
    status,
    priority,
    isRange: p.schedule.type === 'range',
    description: p.description?.trim() || null,
    tags: [],
    createdAt: now,
    updatedAt: now,
  }

  if (p.schedule.type === 'single') {
    const { date, time } = fromISO(p.schedule.at)
    return { ...base, isRange: false, date, time }
  }

  const s = fromISO(p.schedule.start)
  const e = fromISO(p.schedule.end)
  return {
    ...base,
    isRange: true,
    startDate: s.date,
    startTime: s.time,
    endDate: e.date,
    endTime: e.time,
  }
}

// 생성
export async function createTodo(payload: SUBMIT_PAYLOAD): Promise<TODO> {
  const record = todoCreateDTO(payload)
  const list = loadJSON<TODO[]>(STORAGE_KEY, [])
  list.push(record)
  saveJSON<TODO[]>(STORAGE_KEY, list)
  return record
}
