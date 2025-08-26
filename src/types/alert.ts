import type { ReactNode } from 'react'

export type ALERT_TYPE = 'success' | 'info' | 'warning' | 'error'

export type ALERT_ITEM_INPUT = {
  type: ALERT_TYPE
  title: ReactNode
  message?: ReactNode
}

export type ALERT_ITEM = ALERT_ITEM_INPUT & { id: string }
