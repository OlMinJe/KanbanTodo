import { BaseField, type OPTION, type TRIGGER_PROPS } from '@/shared/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn'

type SELECT_FIELD_BASE_RPOPS = TRIGGER_PROPS & {
  options: ReadonlyArray<OPTION>
  value: string
  onValueChange: (v: string) => void
}

export default function SelectField(props: SELECT_FIELD_BASE_RPOPS) {
  const { id, name, label, required, hint, error, placeholder, ...restProps } = props
  const { containerClassName, triggerClassName, options, value, onValueChange, ...rest } = restProps

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
        <Select onValueChange={onValueChange} defaultValue={value} {...rest}>
          <SelectTrigger className={triggerClassName} {...common}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </BaseField>
  )
}
