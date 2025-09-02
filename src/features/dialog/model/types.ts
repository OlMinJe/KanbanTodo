import type { ReactNode } from 'react'

export type DIALOG_CONTROLS = {
  open: boolean
  setOpen: (v: boolean) => void
  close: () => void
  openDialog: () => void
  toggle: () => void
}

export type RENDER_FN = (controls: DIALOG_CONTROLS) => ReactNode

export type BASE_DIALOG_PROPS = {
  type?: string
  des?: string
  trigger?: ReactNode
  contentClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode | RENDER_FN
  render?: (controls: DIALOG_CONTROLS) => ReactNode
}
