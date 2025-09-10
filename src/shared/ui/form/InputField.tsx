import { BaseField, type FIELD_COMMON_PROPS } from '@/shared/ui/form'
import { Input } from '@/shared/ui/shadcn'
import type { InputHTMLAttributes } from 'react'

type INPUT_FIELD_PROPS = FIELD_COMMON_PROPS & InputHTMLAttributes<HTMLInputElement>

export default function InputField(props: INPUT_FIELD_PROPS) {
  const { id, name, label, required, hint, error, containerClassName, onChange, value, ...rest } =
    props

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
          {...rest}
          value={typeof value === 'string' ? value : (value ?? '')}
          onChange={(e) => {
            onChange?.(e)
          }}
        />
      )}
    </BaseField>
  )
}
