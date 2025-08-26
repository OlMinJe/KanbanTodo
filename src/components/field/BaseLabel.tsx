import { Label } from '@/components/ui'
import type { FIELD_DEFUALT_PROPS } from '@/types/field'
import { memo } from 'react'

type LABEL_TYPE = Omit<FIELD_DEFUALT_PROPS, 'id'>

const BaseLabel = (props: LABEL_TYPE) => {
  const { name, label, required } = props
  if (!label) return null

  return (
    <Label htmlFor={name} className="block text-sm font-medium">
      {label} {required ? <span className="text-red-600">*</span> : null}
    </Label>
  )
}

const memoValue = (prev: LABEL_TYPE, next: LABEL_TYPE) =>
  prev.name === next.name && prev.label === next.label && prev.required === next.required

export default memo(BaseLabel, memoValue)
