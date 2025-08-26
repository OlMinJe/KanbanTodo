import { BaseLabel, Message } from '@/components/field'
import type { COMMON_FIELD_PROPS, FIELD_DEFUALT_PROPS } from '@/types/field'
import { memo, type ReactNode } from 'react'

type BASE_INPUT_PROPS = COMMON_FIELD_PROPS & {
  children: (common: FIELD_DEFUALT_PROPS) => ReactNode
}

function BaseField(props: BASE_INPUT_PROPS) {
  const { id, name, label, required = false, hint, error, containerClassName, children } = props

  const common: FIELD_DEFUALT_PROPS = { id, name, label, required }

  return (
    <div className={containerClassName}>
      {label && <BaseLabel name={name} label={label} required={required} />}
      {children(common)}
      <Message id={id} error={error} hint={hint} />
    </div>
  )
}

const areEqual = (a: BASE_INPUT_PROPS, b: BASE_INPUT_PROPS) =>
  a.id === b.id &&
  a.name === b.name &&
  a.label === b.label &&
  a.hint === b.hint &&
  a.error === b.error &&
  a.required === b.required &&
  a.containerClassName === b.containerClassName &&
  a.children === b.children

export default memo(BaseField, areEqual)
