export type FIELD_DEFUALT_PROPS = {
  id: string
  name: string
  label: string
  required?: boolean
}

export type FIELD_COMMON_PROPS = FIELD_DEFUALT_PROPS & {
  hint?: string
  error?: string
  placeholder?: string
  containerClassName?: string
}

export type OPTION = { value: string; label: string }

export type TRIGGER = {
  triggerClassName?: string
  disabled?: boolean
}

export type DATE_TYPE = Date | undefined

export type TRIGGER_PROPS = FIELD_COMMON_PROPS & TRIGGER

export type DATE_FIELD_PROPS = TRIGGER_PROPS & {
  value: DATE_TYPE
  onChange: (d: DATE_TYPE) => void
  open: boolean
  onOpenChange: (o: boolean) => void
}
