import { type OPTION } from '@/shared/ui/form'

export const TASK_STATUS_OPTIONS: OPTION[] = [
  { value: '0', label: '할 일' },
  { value: '1', label: '진행중' },
  { value: '2', label: '완료' },
  { value: '3', label: '보류' },
]

export const PRIOITY_OPTIONS: OPTION[] = [
  { value: '1', label: '1순위' },
  { value: '2', label: '2순위' },
  { value: '3', label: '3순위' },
]

type TODO_COLUMNS = {
  key: string
  title: string
  count: number
  dotClass: string
}
export const TODO_COLUMNS_DATA: TODO_COLUMNS[] = [
  {
    key: 'todo',
    title: '할 일',
    count: 2,
    dotClass: 'bg-orange-500',
  },
  {
    key: 'inprogress',
    title: '진행 중',
    count: 1,
    dotClass: 'bg-amber-500',
  },
  {
    key: 'done',
    title: '완료',
    count: 5,
    dotClass: 'bg-emerald-500',
  },
  {
    key: 'defer',
    title: '보류',
    count: 1,
    dotClass: 'bg-blue-500',
  },
]

export const DEFAULT_TIME_START = '10:30:00'
export const DEFAULT_TIME_END = '11:30:00'

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

  markAsTodo: {
    title: '할 일로 변경할까요?',
    description: "상태를 '할 일'로 되돌립니다. 필요한 경우 이유나 메모를 함께 남겨 주세요.",
  },

  markAsHold: {
    title: '보류로 변경할까요?',
    description: '진행을 잠시 멈춰둘게요. 보류 사유와 다시 시도할 날짜를 입력해 주세요.',
  },

  markAsComplete: {
    title: '완료로 변경할까요?',
    description: '수고하셨어요! 지금의 감정을 선택하고 한 줄 소감을 남겨 주세요.',
  },

  remove: {
    title: '정말 삭제하시겠어요?',
    description: '삭제하면 되돌릴 수 없어요. 삭제 사유를 입력해 주세요.',
  },
} as const

export const MOODS = ['😀', '🙂', '😐', '🙁', '😫'] as const
export const NOTE_MAX = 100 as const
