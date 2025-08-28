import type { ReactNode } from 'react'

export type KANBAN_MODE = 'create' | 'read' | 'update'
export type KANBAN_VRIANT = 'markAsTodo' | 'markAsHold' | 'markAsComplete' | 'remove'
export type KANBAN_STATUS = 'todo' | 'hold' | 'complete'

export type DIALOG_CONTROLS = {
  open: boolean
  setOpen: (v: boolean) => void
  close: () => void
  openDialog: () => void
  toggle: () => void
}

export type BASE_DIALOG_PROPS = {
  type?: string
  des?: string
  trigger?: ReactNode
  children?: ReactNode
  contentClassName?: string
}

export type BASE_DIALOG_COMPONENT_PROPS = BASE_DIALOG_PROPS & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  render?: (controls: DIALOG_CONTROLS) => ReactNode
}

export type EDIT_DIALOG_PROPS = {
  variant: KANBAN_VRIANT
  defaults?: { reason: string; mood: string; note: string }
  onCancel: () => void
}
