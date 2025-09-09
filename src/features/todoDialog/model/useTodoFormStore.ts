import type { TODO_FORM_STORE } from '@/features/todoDialog/model/initial'
import { todoFormStore } from '@/features/todoDialog/model/store'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export function useTodoFormStore(): TODO_FORM_STORE
export function useTodoFormStore<U>(
  selector: (s: TODO_FORM_STORE) => U,
  equalityFn?: (a: U, b: U) => boolean
): U

export function useTodoFormStore<U = TODO_FORM_STORE>(
  selector?: (s: TODO_FORM_STORE) => U,
  equalityFn?: (a: U, b: U) => boolean
) {
  const sel = (selector ?? ((s: TODO_FORM_STORE) => s as unknown as U)) as (s: TODO_FORM_STORE) => U

  return useStoreWithEqualityFn(todoFormStore, sel, equalityFn as any)
}
