import type { ReactNode } from 'react'

export type ALERT_TYPE = 'success' | 'info' | 'warning' | 'error'

export type ALERT_ITEM_INPUT = {
  type: ALERT_TYPE
  title: ReactNode
  message?: ReactNode
}

export type ALERT_ITEM = ALERT_ITEM_INPUT & { id: string }

export type ALERT_FUNCTION = (title: ReactNode, message?: ReactNode, className?: string) => string

// 스토어 타입
export interface ALERT_STATE {
  items: ALERT_ITEM[]
  push: (i: ALERT_ITEM_INPUT) => string
  remove: (id: string) => void
  clear: () => void
}
