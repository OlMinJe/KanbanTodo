import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import type { BASE_DIALOG_COMPONENT_PROPS, DIALOG_CONTROLS } from '@/types/dialog'
import { useState } from 'react'

export default function BaseDialog(props: BASE_DIALOG_COMPONENT_PROPS) {
  const {
    type,
    des,
    trigger,
    children,
    render,
    contentClassName = 'min-w-fit',
    open: controlledOpen,
    onOpenChange,
  } = props

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = typeof controlledOpen === 'boolean'
  const open = isControlled ? (controlledOpen as boolean) : uncontrolledOpen
  const setOpen = (v: boolean) => (isControlled ? onOpenChange?.(v) : setUncontrolledOpen(v))

  const controls: DIALOG_CONTROLS = {
    open,
    setOpen,
    close: () => setOpen(false),
    openDialog: () => setOpen(true),
    toggle: () => setOpen(!open),
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>{type}</DialogTitle>
          {des ? <DialogDescription>{des}</DialogDescription> : null}
        </DialogHeader>
        {render ? render(controls) : children}
      </DialogContent>
    </Dialog>
  )
}
