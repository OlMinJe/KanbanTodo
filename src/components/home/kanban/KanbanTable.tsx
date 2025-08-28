import { BaseDialog } from '@/components/dialog'
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui'
import { DIALOG_TYPES } from '@/constants/dialog'
import { KANBAN_COLUMNS } from '@/constants/field'
import { EditDialog, KanbanForm } from '@/feature/kanban'
import { Ellipsis, Trash2 } from 'lucide-react'

export default function KanbanTable() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {KANBAN_COLUMNS.map((col) => (
        <section key={col.key}>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <span className={`inline-block size-2 rounded-full ${col.dotClass}`} />
              {col.title}
            </div>
            <span className="rounded-md bg-white/30 px-2 py-0.5 text-xs shadow-sm">
              {col.count}
            </span>
          </div>

          <div className="space-y-3">
            <BaseDialog
              type={DIALOG_TYPES['read'].title}
              des={DIALOG_TYPES['read'].description}
              trigger={
                <Card className="min-w-[240px] min-h-[160px] p-3 flex flex-col justify-end">
                  <CardHeader className="flex flex-row items-start justify-between p-0">
                    <CardTitle className="text-base font-medium">주제 TODO</CardTitle>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>
                          <Ellipsis width="18px" height="18px" />
                        </MenubarTrigger>
                        <MenubarContent>
                          <BaseDialog
                            type={DIALOG_TYPES['update'].title}
                            des={DIALOG_TYPES['update'].description}
                            trigger={
                              <MenubarItem onSelect={(e) => e.preventDefault()}>
                                수정하기
                              </MenubarItem>
                            }
                            render={({ close }) => <KanbanForm type="update" onCancel={close} />}
                          />
                          <MenubarItem>복사하기(추후)</MenubarItem>
                          <MenubarSeparator />
                          <BaseDialog
                            type={DIALOG_TYPES['remove'].title}
                            des={DIALOG_TYPES['remove'].description}
                            trigger={
                              <MenubarItem
                                className="text-red-400"
                                onSelect={(e) => e.preventDefault()}
                              >
                                삭제하기
                                <MenubarShortcut>
                                  <Trash2 />
                                </MenubarShortcut>
                              </MenubarItem>
                            }
                            render={({ close }) => <EditDialog variant="remove" onCancel={close} />}
                          />
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </CardHeader>

                  <CardContent className="text-sm flex-1 flex flex-col gap-1 p-0">
                    {/* 두줄까지만 출력 */}
                    <p>작업 내용 입니다.</p>
                    <p className="text-gray-400 text-xs">링크나 메모 한 줄 출력</p>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between text-xs text-muted-foreground p-0">
                    <Badge variant="secondary">태그</Badge>
                    <span>우선순위</span>
                  </CardFooter>
                </Card>
              }
              render={({ close }) => <KanbanForm type="read" onCancel={close} />}
            />
          </div>
        </section>
      ))}
    </div>
  )
}
