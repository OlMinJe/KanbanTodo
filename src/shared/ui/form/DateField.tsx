import { cn, fmt, type RAW_DATE } from '@/shared/lib'
import { BaseField, type TRIGGER_PROPS } from '@/shared/ui/form'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useMemo } from 'react'

type DATE_FIELD_PROPS = TRIGGER_PROPS & {
  value: RAW_DATE
  onChange: (d: RAW_DATE) => void
  open: boolean
  onOpenChange: (o: boolean) => void
}

export default function DateField(props: DATE_FIELD_PROPS) {
  const { id, name, label, required, hint, error, containerClassName, placeholder, ...restProps } =
    props
  const { disabled = false, value, onChange, open, onOpenChange, triggerClassName } = restProps

  const selected = useMemo(() => {
    if (!value) return undefined
    return value instanceof Date ? value : new Date(value as any)
  }, [value])

  useEffect(() => {
    if (!selected) {
      onChange(new Date() as any)
    }
  }, [])

  const displayText = fmt(selected) || placeholder || fmt(new Date())

  return (
    <BaseField
      id={id}
      name={name}
      label={label}
      required={required}
      hint={hint}
      error={error}
      containerClassName={containerClassName}
    >
      {(common: any) => (
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              className={cn('w-40 justify-between font-normal', triggerClassName)}
              {...common}
            >
              <span>{displayText}</span>
              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-60" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={selected}
              onSelect={(d) => {
                onChange((d ?? null) as any)
                onOpenChange(false)
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </BaseField>
  )
}
