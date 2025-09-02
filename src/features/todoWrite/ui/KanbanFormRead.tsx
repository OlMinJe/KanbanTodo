// TODO: 기능 구현 시 정리 필요
export type KanbanReadData = {
  title: string
  status: 'todo' | 'hold' | 'complete'
  priority: string
  singleDate?: string
  singleTime?: string
  rangeStartDate?: string
  rangeStartTime?: string
  rangeEndDate?: string
  rangeEndTime?: string
  description?: string
}

export default function KanbanFormRead({ data }: { data: KanbanReadData }) {
  return (
    <div className="flex flex-col gap-5">
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <BadgeLike label="상태" value={labelOfStatus(data.status)} />
          <BadgeLike label="우선순위" value={data.priority} />
        </div>
      </section>

      {/* 날짜/시간 */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">기간?</span>
        </div>

        <div className="flex gap-4">
          <ReadField label="날짜" value={data.singleDate ?? '-'} />
          <ReadField label="시간" value={data.singleTime ?? '-'} />
        </div>

        <div className="flex gap-5">
          <div className="flex gap-4">
            <ReadField label="시작 날짜" value={data.rangeStartDate ?? '-'} />
            <ReadField label="시작 시간" value={data.rangeStartTime ?? '-'} />
          </div>
          <div className="flex gap-4">
            <ReadField label="종료 날짜" value={data.rangeEndDate ?? '-'} />
            <ReadField label="종료 시간" value={data.rangeEndTime ?? '-'} />
          </div>
        </div>
      </section>

      {data.description?.trim() && (
        <section className="space-y-2">
          <div className="text-sm font-medium">설명</div>
          <p className="rounded-md border p-3 text-sm leading-6">{data.description}</p>
        </section>
      )}
    </div>
  )
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="min-h-[36px] rounded-md border px-3 py-2 text-sm">{value}</span>
    </div>
  )
}

function BadgeLike({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </span>
  )
}

// TODO 진행 중! 이 있었네..
function labelOfStatus(s: 'todo' | 'hold' | 'complete') {
  switch (s) {
    case 'todo':
      return '할 일'
    case 'hold':
      return '보류'
    case 'complete':
      return '완료'
  }
}
