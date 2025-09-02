import { DateField, type TRIGGER_PROPS } from '@/shared/ui/form'
import { memo, useEffect, useMemo, useState } from 'react'

const DatePopover = (props: TRIGGER_PROPS) => {
  const { id, name, label, required, hint, error, containerClassName, triggerClassName, disabled } =
    props
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const today = useMemo(() => new Date(), [])

  useEffect(() => {
    if (date === undefined) {
      setDate(today)
    }
  }, [date, setDate, today])

  return (
    <DateField
      id={id}
      name={name}
      label={label}
      required={required}
      hint={hint}
      error={error}
      containerClassName={containerClassName}
      placeholder={String(today)}
      value={date}
      onChange={setDate}
      open={open}
      onOpenChange={setOpen}
      triggerClassName={triggerClassName}
      disabled={disabled}
    />
  )
}

const memoValue = (a: TRIGGER_PROPS, b: TRIGGER_PROPS) =>
  a.name === b.name &&
  a.label === b.label &&
  a.hint === b.hint &&
  a.error === b.error &&
  a.containerClassName === b.containerClassName &&
  a.triggerClassName === b.triggerClassName &&
  a.placeholder === b.placeholder &&
  a.disabled === b.disabled

export default memo(DatePopover, memoValue)
