import { useAlertStore, type ALERT_ITEM_INPUT, type ALERT_TYPE } from '@/shared/notification'
import type { ReactNode } from 'react'

type ALERT_FUNCTION = (title: ReactNode, message?: ReactNode) => string

// 공통 실행 함수
const showAlert = (opts: ALERT_ITEM_INPUT) => useAlertStore.getState().push(opts)

// 타입별 실행 함수
const createShow =
  (type: ALERT_TYPE): ALERT_FUNCTION =>
  (title, message) =>
    showAlert({ type, title, message })

export const showSuccess: ALERT_FUNCTION = createShow('success')
export const showInfo: ALERT_FUNCTION = createShow('info')
export const showWarning: ALERT_FUNCTION = createShow('warning')
export const showError: ALERT_FUNCTION = createShow('error')
