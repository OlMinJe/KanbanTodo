import { type ALERT_TYPE } from '@/shared/notification'
import type { Alert } from '@/shared/ui/shadcn'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, type LucideIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

export const ICON: Record<ALERT_TYPE, LucideIcon> = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
}

type ALERT_VARIANT = ComponentProps<typeof Alert>['variant']
export const VARIANT: Record<ALERT_TYPE, ALERT_VARIANT> = {
  success: 'default',
  info: 'default',
  warning: 'default',
  error: 'destructive',
}
