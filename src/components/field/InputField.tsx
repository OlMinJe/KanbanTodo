import BaseField from '@/components/field/BaseField'
import { Input } from '@/components/ui'
import type { COMMON_FIELD_PROPS } from '@/types/field'
import type { InputHTMLAttributes } from 'react'

type INPUT_FIELD_PROPS = COMMON_FIELD_PROPS & InputHTMLAttributes<HTMLInputElement>

export default function InputField(props: INPUT_FIELD_PROPS) {
  const { id, name, label, required, hint, error, containerClassName, ...rest } = props

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
      {(common) => <Input {...rest} {...common} />}
    </BaseField>
  )
}
