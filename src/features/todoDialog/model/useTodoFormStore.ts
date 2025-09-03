import type { TODO_FORM_STORE } from '@/entities/todo'
import { todoFormStore } from '@/features/todoDialog'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export function useTodoFormStore(): TODO_FORM_STORE
export function useTodoFormStore<U>(
  selector: (s: TODO_FORM_STORE) => U,
  equalityFn?: (a: U, b: U) => boolean
): U
export function useTodoFormStore<U>(
  selector?: (s: TODO_FORM_STORE) => U,
  equalityFn?: (a: U, b: U) => boolean
) {
  const sel = (selector as any) ?? ((s: TODO_FORM_STORE) => s)
  return useStoreWithEqualityFn(todoFormStore, sel, equalityFn as any)
}
