import { BaseField, type FIELD_COMMON_PROPS } from '@/shared/ui/form'
import { Input } from '@/shared/ui/shadcn'
import type { InputHTMLAttributes } from 'react'

type INPUT_FIELD_PROPS = FIELD_COMMON_PROPS & InputHTMLAttributes<HTMLInputElement>

export default function InputField(props: INPUT_FIELD_PROPS) {
  const {
    id,
    name,
    label,
    required,
    hint,
    error,
    containerClassName,
    value,
    defaultValue,
    onChange,
    ...rest
  } = props

  const isControlled = value !== undefined

  const normalizedValue =
    typeof value === 'string' || typeof value === 'number' ? value : (value ?? '')

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    ...(rest as any),
    ...(isControlled ? { value: normalizedValue } : { defaultValue }),
    onChange: (e) => {
      onChange?.(e)
    },
  }

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
        <Input
          {...common}
          {...inputProps}
          onChange={(e) => {
            onChange?.(e)
          }}
        />
      )}
    </BaseField>
  )
}
