export type TODO_COLUMNS = {
  key: string
  title: string
  count: number
  dotClass: string
}

export type TODO_MODE = 'create' | 'read' | 'update'
export type TODO_VRIANT = 'markAsTodo' | 'markAsHold' | 'markAsComplete' | 'remove'
export type TODO_STATUS = 'todo' | 'hold' | 'complete'

export type EDIT_DIALOG_PROPS = {
  variant: TODO_VRIANT
  defaults?: { reason: string; mood: string; note: string }
  onCancel: () => void
}
