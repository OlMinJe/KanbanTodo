import { Alert, AlertDescription, AlertTitle } from '@/components/ui'
import { ICON, VARIANT } from '@/constants/alert'
import type { ALERT_CARD_PROPS } from '@/types/alert'
import { X } from 'lucide-react'

export default function AlertCard({ type = 'info', title, message, onClose }: ALERT_CARD_PROPS) {
  const Icon = ICON[type]
  const variant = VARIANT[type]

  return (
    <Alert
      variant={variant}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className="flex items-start gap-3 pr-8"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="space-y-1">
        <AlertTitle>{title}</AlertTitle>
        {message ? <AlertDescription>{message}</AlertDescription> : null}
      </div>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded p-1 opacity-70 hover:opacity-100"
        aria-label="Dismiss alert"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  )
}
