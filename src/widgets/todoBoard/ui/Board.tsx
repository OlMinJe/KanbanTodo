import { type STATUS_TYPE, type TODO, Card, Column, TODO_STATUS } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { EditDialog, PROPS_INFO, TodoForm } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'
import { mockTodos } from '@/widgets/todoBoard'
import { Ellipsis, Trash2 } from 'lucide-react'

export default function Board() {
  // 상태별 분류
  const byStatus: Record<STATUS_TYPE, TODO[]> = {
    [TODO_STATUS.TODO]: mockTodos.filter((t) => t.status === TODO_STATUS.TODO),
    [TODO_STATUS.IN_PROGRESS]: mockTodos.filter((t) => t.status === TODO_STATUS.IN_PROGRESS),
    [TODO_STATUS.ON_HOLD]: mockTodos.filter((t) => t.status === TODO_STATUS.ON_HOLD),
    [TODO_STATUS.DONE]: mockTodos.filter((t) => t.status === TODO_STATUS.DONE),
  }

  const Menu = ({ todo }: { todo: TODO }) => (
    <Shadcn.Menubar className="bg-transparent border-0 p-0 shadow-none h-auto inline-flex">
      <Shadcn.MenubarMenu>
        <Shadcn.MenubarTrigger asChild>
          <button type="button">
            <Ellipsis width={18} height={18} />
          </button>
        </Shadcn.MenubarTrigger>
        <Shadcn.MenubarContent>
          <BaseDialog
            type={PROPS_INFO.update.title}
            des={PROPS_INFO.update.description}
            trigger={
              <Shadcn.MenubarItem onSelect={(e) => e.preventDefault()}>수정하기</Shadcn.MenubarItem>
            }
          >
            {({ close }) => <TodoForm type="update" onCancel={close} />}
          </BaseDialog>

          <Shadcn.MenubarItem>복사하기(추후)</Shadcn.MenubarItem>

          <Shadcn.MenubarSeparator />

          <BaseDialog
            type={PROPS_INFO.remove.title}
            des={PROPS_INFO.remove.description}
            trigger={
              <Shadcn.MenubarItem className="text-red-400" onSelect={(e) => e.preventDefault()}>
                삭제하기
                <Shadcn.MenubarShortcut>
                  <Trash2 />
                </Shadcn.MenubarShortcut>
              </Shadcn.MenubarItem>
            }
          >
            {({ close }) => <EditDialog variant="remove" onCancel={close} />}
          </BaseDialog>
        </Shadcn.MenubarContent>
      </Shadcn.MenubarMenu>
    </Shadcn.Menubar>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
      <Column
        title="할 일"
        status={TODO_STATUS.TODO}
        count={String(byStatus[TODO_STATUS.TODO].length)}
      >
        {byStatus[TODO_STATUS.TODO].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>

      <Column
        title="진행중"
        status={TODO_STATUS.IN_PROGRESS}
        count={String(byStatus[TODO_STATUS.IN_PROGRESS].length)}
      >
        {byStatus[TODO_STATUS.IN_PROGRESS].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>

      <Column
        title="보류"
        status={TODO_STATUS.ON_HOLD}
        count={String(byStatus[TODO_STATUS.ON_HOLD].length)}
      >
        {byStatus[TODO_STATUS.ON_HOLD].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>

      <Column
        title="완료"
        status={TODO_STATUS.DONE}
        count={String(byStatus[TODO_STATUS.DONE].length)}
      >
        {byStatus[TODO_STATUS.DONE].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>
    </div>
  )
}
