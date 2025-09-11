import type { SUBMIT_PAYLOAD, TODO, TODO_FILTER, TODO_HISTORY } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'

export async function createTodo(payload: SUBMIT_PAYLOAD): Promise<TODO> {
  return useTodoStore.getState().createFromPayload(payload)
}

export async function listTodos(): Promise<TODO[]> {
  return useTodoStore.getState().listTodos()
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

export async function updateTodoFromPayload(
  id: string,
  payload: SUBMIT_PAYLOAD
): Promise<TODO | undefined> {
  return useTodoStore.getState().updateFromPayload(id, payload)
}

export async function removeTodo(id: string): Promise<boolean> {
  return useTodoStore.getState().removeTodo(id)
}
