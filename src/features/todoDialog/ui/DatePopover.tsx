import { fmt } from '@/shared/lib'
import { DateField, type TRIGGER_PROPS } from '@/shared/ui/form'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

type Props = TRIGGER_PROPS & {
  value?: Date | null
  onValueChange?: (d: Date | null) => void
  defaultValue?: Date
}

const DatePopover = (props: Props) => {
  const {
    id,
    name,
    label,
    required,
    hint,
    error,
    containerClassName,
    triggerClassName,
    disabled,
    value,
    onValueChange,
    defaultValue,
  } = props

  const today = useMemo(() => defaultValue ?? new Date(), [defaultValue])
  const placeholderText = useMemo(() => fmt(today), [today])

  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState<Date | undefined>(undefined)

  const isControlled = value !== undefined

  useEffect(() => {
    if (!isControlled && inner === undefined) setInner(today)
  }, [isControlled, inner, today])

  const didInitControlled = useRef(false)
  useEffect(() => {
    if (!isControlled) return
    if (didInitControlled.current) return
    if (value == null) {
      onValueChange?.(today)
      didInitControlled.current = true
    }
  }, [isControlled, value, today, onValueChange])

  const val = isControlled ? (value ?? undefined) : inner
  const setVal = (d?: Date) => {
    if (isControlled) onValueChange?.(d ?? null)
    else setInner(d)
  }

  return (
    <DateField
      id={id}
      name={name}
      label={label}
      required={required}
      hint={hint}
      error={error}
      containerClassName={containerClassName}
      placeholder={placeholderText}
      value={val}
      onChange={setVal}
      open={open}
      onOpenChange={setOpen}
      triggerClassName={triggerClassName}
      disabled={disabled}
    />
  )
}

export default memo(DatePopover)
