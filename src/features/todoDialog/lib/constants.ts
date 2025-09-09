import type { STATUS_TYPE } from '@/entities/todo'
import { TODO_STATUS } from '@/entities/todo'
import { type OPTION } from '@/shared/ui/form'

// 'todo' | 'doing' | 'done' | 'remove'
export const STATUS_LABELS: Record<STATUS_TYPE, string> = {
  [TODO_STATUS.TODO]: '할 일',
  [TODO_STATUS.DOING]: '진행 중',
  [TODO_STATUS.DONE]: '완료',
  [TODO_STATUS.DEFER]: '보류',
  [TODO_STATUS.REMOVE]: '삭제',
}

export const TASK_STATUS_OPTIONS: OPTION[] = [
  { value: TODO_STATUS.TODO, label: STATUS_LABELS[TODO_STATUS.TODO] },
  { value: TODO_STATUS.DOING, label: STATUS_LABELS[TODO_STATUS.DOING] },
  { value: TODO_STATUS.DONE, label: STATUS_LABELS[TODO_STATUS.DONE] },
  { value: TODO_STATUS.REMOVE, label: STATUS_LABELS[TODO_STATUS.REMOVE] },
]

export const PRIORITY_OPTIONS: OPTION[] = [
  { value: 'P1', label: '1순위' },
  { value: 'P2', label: '2순위' },
  { value: 'P3', label: '3순위' },
]

export const MOODS = ['😀', '🙂', '😐', '🙁', '😫'] as const
export const NOTE_MAX = 100 as const

export const STATUS_DIALOG_TEXT: Record<STATUS_TYPE, { title: string; description: string }> = {
  [TODO_STATUS.TODO]: {
    title: '할 일로 변경할까요?',
    description: "상태를 '할 일'로 설정합니다.",
  },
  [TODO_STATUS.DOING]: {
    title: '진행 중으로 변경할까요?',
    description: '작업을 시작합니다.',
  },
  [TODO_STATUS.DONE]: {
    title: '완료로 변경할까요?',
    description: '수고하셨어요! 소감을 남겨 주세요.',
  },
  [TODO_STATUS.DEFER]: {
    title: '보류로 변경할까요?',
    description: '보류로 변경한 사유를 작성해 주세요!',
  },
  [TODO_STATUS.REMOVE]: {
    title: '정말 삭제하시겠어요?',
    description: '삭제하면 되돌릴 수 없어요. 삭제 사유를 입력해 주세요.',
  },
}

export const PROPS_INFO = {
  create: {
    title: 'TODO를 생성해요!',
    description: '할 일 제목과 (선택) 마감일·메모를 입력해 주세요.',
  },
  read: {
    title: '',
    description: '',
  },
  update: {
    title: '일정을 변경할까요?',
    description: '변경할 내용을 입력해 주세요.',
  },
} as const
