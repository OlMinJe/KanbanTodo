import { removeTodo, type TODO } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { EditDialog, PROPS_INFO, STATUS_DIALOG_TEXT, TodoForm } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'
import { Ellipsis, Trash2 } from 'lucide-react'

export default function Menu({ todo }: { todo: TODO }) {
  const stop = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <Shadcn.DropdownMenu>
      <Shadcn.DropdownMenuTrigger asChild>
        <button type="button" aria-label={`menu-${todo.id}`} onMouseDown={stop} onClick={stop}>
          <Ellipsis width={18} height={18} />
        </button>
      </Shadcn.DropdownMenuTrigger>

      <Shadcn.DropdownMenuContent align="end" sideOffset={4} onMouseDown={stop} onClick={stop}>
        <BaseDialog
          title={PROPS_INFO.update.title}
          des={PROPS_INFO.update.description}
          trigger={
            <Shadcn.DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              수정하기
            </Shadcn.DropdownMenuItem>
          }
        >
          {({ close }) => <TodoForm type="update" onCancel={close} todoId={todo.id} />}
        </BaseDialog>

        <Shadcn.DropdownMenuItem>복사하기(추후)</Shadcn.DropdownMenuItem>
        <Shadcn.DropdownMenuSeparator />

        <BaseDialog
          title={STATUS_DIALOG_TEXT.remove.title}
          des={STATUS_DIALOG_TEXT.remove.description}
          trigger={
            <Shadcn.DropdownMenuItem className="text-red-400" onSelect={(e) => e.preventDefault()}>
              삭제하기
              <Shadcn.MenubarShortcut>
                <Trash2 />
              </Shadcn.MenubarShortcut>
            </Shadcn.DropdownMenuItem>
          }
        >
          {({ close }) => (
            <EditDialog
              variant="remove"
              onCancel={close}
              todo={todo}
              onSuccess={async () => {
                await removeTodo(todo.id)
                close()
              }}
            />
          )}
        </BaseDialog>
      </Shadcn.DropdownMenuContent>
    </Shadcn.DropdownMenu>
  )
}
