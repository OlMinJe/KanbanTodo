import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui'
import { KANBAN_COLUMNS } from '@/feature/kanban/constants'
import { Ellipsis, Funnel, Plus } from 'lucide-react'

export default function Kanban() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Funnel width="15px" height="15px" color="black" />
        <Plus width="18px" height="18px" />
      </div>

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
              <Card className="min-w-[240px] min-h-[160px] p-3 flex flex-col justify-end">
                <CardHeader className="flex flex-row items-start justify-between p-0">
                  <CardTitle className="text-base font-medium">주제 TODO</CardTitle>
                  <Ellipsis width="18px" height="18px" />
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
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
