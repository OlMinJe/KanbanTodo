import { BaseField, type FIELD_COMMON_PROPS, type OPTION } from '@/shared/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn'
import cn from 'clsx'

type SELECT_FIELD_PROPS = FIELD_COMMON_PROPS & {
  options: OPTION[]
  value?: string | null
  onValueChange?: (v: string) => void
  placeholder?: string
  triggerClassName?: string
}

export default function SelectField(props: SELECT_FIELD_PROPS) {
  const {
    id,
    name,
    label,
    required,
    hint,
    error,
    containerClassName,
    options,
    value,
    onValueChange,
    placeholder,
    triggerClassName,
  } = props

  const controlledValue = (value ?? undefined) as string | undefined

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
      {(common) => (
        <Select value={controlledValue} onValueChange={(v) => onValueChange?.(v)}>
          <SelectTrigger className={cn('min-w-[150px]', triggerClassName)} {...common}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </BaseField>
  )
}
