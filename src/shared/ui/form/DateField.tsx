import { fmt } from '@/shared/lib/date'
import { BaseField, type DATE_TYPE, type TRIGGER_PROPS } from '@/shared/ui/form'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn'
import { ChevronDownIcon } from 'lucide-react'

type DATE_FIELD_PROPS = TRIGGER_PROPS & {
  value: DATE_TYPE
  onChange: (d: DATE_TYPE) => void
  open: boolean
  onOpenChange: (o: boolean) => void
}

export default function DateField(props: DATE_FIELD_PROPS) {
  const { id, name, label, required, hint, error, containerClassName, placeholder, ...restProps } =
    props
  const { disabled = false, value, onChange, open, onOpenChange } = restProps

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
              className="w-40 justify-between font-normal"
              {...common}
            >
              <span>{fmt(value) || placeholder}</span>
              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-60" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={value}
              onSelect={(d) => {
                onChange(d)
                onOpenChange(false)
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </BaseField>
  )
}
