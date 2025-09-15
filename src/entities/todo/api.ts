import type {
  LIST_PAYLOAD,
  LIST_RESULT,
  SUBMIT_PAYLOAD,
  TODO,
  TODO_FILTER,
  TODO_HISTORY,
} from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'

export async function createTodo(payload: SUBMIT_PAYLOAD): Promise<TODO> {
  return useTodoStore.getState().createTodo(payload)
}

export async function listTodos(opts?: LIST_PAYLOAD): Promise<LIST_RESULT> {
  return useTodoStore.getState().listTodos(opts)
}

export function filterTodos(items: TODO[], filter: TODO_FILTER = {}): TODO[] {
  return useTodoStore.getState().filterTodos(items, filter)
}

export async function getTodo(id: string): Promise<TODO | undefined> {
  return useTodoStore.getState().getTodo(id)
}

export async function updateTodo(
  id: string,
  payload: Partial<TODO> & { meta?: TODO_HISTORY['meta'] }
): Promise<TODO | undefined> {
  return useTodoStore.getState().updateTodo(id, payload)
}

export async function removeTodo(id: string): Promise<boolean> {
  return useTodoStore.getState().removeTodo(id)
}
