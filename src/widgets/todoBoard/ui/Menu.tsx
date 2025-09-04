import { type TODO } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { EditDialog, PROPS_INFO, STATUS_DIALOG_TEXT, TodoForm } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'
import { Ellipsis, Trash2 } from 'lucide-react'

export default function Menu({ todo }: { todo: TODO }) {
  const prevent = (e: Event) => e.preventDefault()

  return (
    <Shadcn.Menubar className="bg-transparent border-0 p-0 shadow-none h-auto inline-flex">
      <Shadcn.MenubarMenu>
        <Shadcn.MenubarTrigger asChild>
          <button type="button" aria-label={`menu-${todo.id}`}>
            <Ellipsis width={18} height={18} />
          </button>
        </Shadcn.MenubarTrigger>
        <Shadcn.MenubarContent>
          <BaseDialog
            title={PROPS_INFO.update.title}
            des={PROPS_INFO.update.description}
            trigger={<Shadcn.MenubarItem onSelect={prevent}>수정하기</Shadcn.MenubarItem>}
          >
            {({ close }) => <TodoForm type="update" onCancel={close} todo={todo} />}
          </BaseDialog>
          <Shadcn.MenubarItem onSelect={prevent}>복사하기(추후)</Shadcn.MenubarItem>
          <Shadcn.MenubarSeparator />

          <BaseDialog
            title={STATUS_DIALOG_TEXT.remove.title}
            des={STATUS_DIALOG_TEXT.remove.description}
            trigger={
              <Shadcn.MenubarItem className="text-red-400" onSelect={prevent}>
                삭제하기
                <Shadcn.MenubarShortcut>
                  <Trash2 />
                </Shadcn.MenubarShortcut>
              </Shadcn.MenubarItem>
            }
          >
            {({ close }) => <EditDialog variant="remove" onCancel={close} todo={todo} />}
          </BaseDialog>
        </Shadcn.MenubarContent>
      </Shadcn.MenubarMenu>
    </Shadcn.Menubar>
  )
}
