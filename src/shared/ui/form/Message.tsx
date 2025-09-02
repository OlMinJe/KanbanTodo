import { type FIELD_COMMON_PROPS } from '@/shared/ui/form'

type MESSAGE_PROPS = Pick<FIELD_COMMON_PROPS, 'id' | 'error' | 'hint'>

const ErrorMessage = ({ id, error }: Omit<MESSAGE_PROPS, 'hint'>) => {
  const hintId = id ? `${id}-hint` : undefined
  return (
    <p id={hintId} className="text-xs text-red-600">
      {error}
    </p>
  )
}

const HintMessage = ({ id, hint }: Omit<MESSAGE_PROPS, 'error'>) => {
  const errorId = id ? `${id}-error` : undefined
  return (
    <p id={errorId} className="text-xs text-muted-foreground">
      {hint}
    </p>
  )
}

export default function Message({ id, error, hint }: MESSAGE_PROPS) {
  return (
    <div className="mt-1 space-y-1">
      {error && <ErrorMessage id={id} error={error} />}
      {!error && hint && <HintMessage id={id} hint={hint} />}
    </div>
  )
}
