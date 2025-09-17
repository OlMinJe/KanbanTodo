import type { PRIORITY_TYPE, SORT_BY, SORT_ORDER, STATUS_TYPE } from '@/entities/todo'
import { TODO_STATUS } from '@/entities/todo'
import { SearchField } from '@/features/search'

type PROPS = {
  q: string
  setQ: (v: string) => void
  statuses: string[]
  toggleStatus: (v: STATUS_TYPE) => void
  priorities: string[]
  togglePriority: (v: PRIORITY_TYPE) => void
  sortBy: string
  setSortBy: (v: SORT_BY) => void
  sortOrder: string
  setSortOrder: (v: SORT_ORDER) => void
  onApply: () => void
  onReset: () => void
}

const STATUS_OPTIONS = [
  { key: TODO_STATUS.TODO, label: '할 일' },
  { key: TODO_STATUS.DOING, label: '진행중' },
  { key: TODO_STATUS.DEFER, label: '보류' },
  { key: TODO_STATUS.DONE, label: '완료' },
  { key: TODO_STATUS.REMOVE, label: '삭제' },
]

export default function SearchPanel(props: PROPS) {
  const {
    q,
    setQ,
    statuses,
    toggleStatus,
    priorities,
    togglePriority,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    onApply,
    onReset,
  } = props
  return (
    <>
      <label className="mb-2 block text-xs text-gray-600 ">검색어</label>
      <SearchField
        className="mb-3"
        value={q}
        onChange={setQ}
        onSubmit={onApply}
        onClear={() => setQ('')}
      />

      <div className="mb-2 text-xs text-gray-600">상태</div>
      <div className="mb-3 grid grid-cols-3 gap-2 text-sm">
        {STATUS_OPTIONS.map((s) => (
          <label key={s.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={statuses.includes(s.key)}
              onChange={() => toggleStatus(s.key)}
            />
            {s.label}
          </label>
        ))}
      </div>

      <div className="mb-2 text-xs text-gray-600">우선순위</div>
      <div className="mb-3 grid grid-cols-3 gap-2 text-sm">
        {(['P1', 'P2', 'P3'] as const).map((p) => (
          <label key={p} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={priorities.includes(p)}
              onChange={() => togglePriority(p)}
            />
            {p}
          </label>
        ))}
      </div>

      <div className="mb-2 text-xs text-gray-600">정렬</div>
      <div className="mb-4 flex items-center gap-2">
        <select
          className="w-full rounded-md border px-2 py-1 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SORT_BY)}
        >
          <option value="title">제목</option>
          <option value="priority">우선순위</option>
          <option value="at">최신 수정/생성일</option>
        </select>
        <select
          className="w-24 rounded-md border px-2 py-1 text-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SORT_ORDER)}
        >
          <option value="desc">내림차</option>
          <option value="asc">오름차</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
          onClick={onReset}
          type="button"
        >
          초기화
        </button>
        <button
          className="rounded-md bg-black px-3 py-1 text-xs text-white hover:opacity-90"
          onClick={onApply}
          type="button"
        >
          적용
        </button>
      </div>
    </>
  )
}
