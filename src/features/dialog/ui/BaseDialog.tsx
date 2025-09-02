import type { BASE_DIALOG_PROPS, DIALOG_CONTROLS } from '@/features/dialog'
import * as Shadcn from '@/shared/ui/shadcn'
import { useState } from 'react'

export default function BaseDialog(props: BASE_DIALOG_PROPS) {
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

  const resolvedChildren =
    typeof children === 'function'
      ? (children as (c: DIALOG_CONTROLS) => React.ReactNode)(controls)
      : children

  return (
    <Shadcn.Dialog open={open} onOpenChange={setOpen}>
      <Shadcn.DialogTrigger asChild>{trigger}</Shadcn.DialogTrigger>
      <Shadcn.DialogContent className={contentClassName}>
        <Shadcn.DialogHeader>
          <Shadcn.DialogTitle>{type}</Shadcn.DialogTitle>
          {des ? <Shadcn.DialogDescription>{des}</Shadcn.DialogDescription> : null}
        </Shadcn.DialogHeader>
        {render ? render(controls) : resolvedChildren}
      </Shadcn.DialogContent>
    </Shadcn.Dialog>
  )
}
