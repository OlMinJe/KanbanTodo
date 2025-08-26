import { Alert, AlertDescription, AlertTitle } from '@/components/ui'
import { CheckCircle2, X } from 'lucide-react'

export default function AlertCard({ type = 'info', title, message }: any) {
  return (
    <Alert
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className="flex items-start gap-3 pr-8"
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="space-y-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      <button
        className="absolute right-2 top-2 rounded p-1 opacity-70 hover:opacity-100"
        aria-label="Dismiss alert"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  )
}
