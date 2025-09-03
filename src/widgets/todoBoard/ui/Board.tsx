import { type TODO, TODO_STATUS } from '@/entities/todo'
import { BaseDialog } from '@/features/dialog'
import { EditDialog, PROPS_INFO, STATUS_LABELS, TodoForm } from '@/features/todoDialog'
import * as Shadcn from '@/shared/ui/shadcn'
import { Card, Column, mockTodos } from '@/widgets/todoBoard'
import { Ellipsis, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

export default function Board() {
  // TODO: 데이터 받아오 ㄹ곳
  const todos: TODO[] = mockTodos

  // 상태별 그룹핑
  const byStatus = useMemo(() => {
    const g: Record<(typeof TODO_STATUS)[keyof typeof TODO_STATUS], TODO[]> = {
      [TODO_STATUS.TODO]: [],
      [TODO_STATUS.IN_PROGRESS]: [],
      [TODO_STATUS.HOLD]: [],
      [TODO_STATUS.REMOVE]: [],
      [TODO_STATUS.COMPLETE]: [],
    }
    for (const t of todos) g[t.status]?.push(t)
    return g
  }, [todos])

  const Menu = ({ todo }: { todo: TODO }) => (
    <Shadcn.Menubar className="bg-transparent border-0 p-0 shadow-none h-auto inline-flex">
      <Shadcn.MenubarMenu>
        <Shadcn.MenubarTrigger asChild>
          <button type="button" aria-label="todo menu">
            <Ellipsis width={18} height={18} />
          </button>
        </Shadcn.MenubarTrigger>
        <Shadcn.MenubarContent>
          <BaseDialog
            title={PROPS_INFO.update.title}
            des={PROPS_INFO.update.description}
            trigger={
              <Shadcn.MenubarItem onSelect={(e) => e.preventDefault()}>수정하기</Shadcn.MenubarItem>
            }
          >
            {({ close }) => <TodoForm type="update" onCancel={close} />}
          </BaseDialog>

          <Shadcn.MenubarItem onSelect={(e) => e.preventDefault()}>
            복사하기(추후)
          </Shadcn.MenubarItem>

          <Shadcn.MenubarSeparator />

          <BaseDialog
            title={PROPS_INFO.remove.title}
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
      {/* 할 일 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.TODO]}
        status={TODO_STATUS.TODO}
        count={String(byStatus[TODO_STATUS.TODO].length)}
      >
        {byStatus[TODO_STATUS.TODO].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>

      {/* 진행중 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.IN_PROGRESS]}
        status={TODO_STATUS.IN_PROGRESS}
        count={String(byStatus[TODO_STATUS.IN_PROGRESS].length)}
      >
        {byStatus[TODO_STATUS.IN_PROGRESS].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>

      {/* 보류 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.HOLD]}
        status={TODO_STATUS.HOLD}
        count={String(byStatus[TODO_STATUS.HOLD].length)}
      >
        {byStatus[TODO_STATUS.HOLD].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>

      {/* 완료 */}
      <Column
        title={STATUS_LABELS[TODO_STATUS.COMPLETE]}
        status={TODO_STATUS.COMPLETE}
        count={String(byStatus[TODO_STATUS.COMPLETE].length)}
      >
        {byStatus[TODO_STATUS.COMPLETE].map((t) => (
          <Card key={t.id} todo={t} renderMenu={<Menu todo={t} />} />
        ))}
      </Column>
    </div>
  )
}
