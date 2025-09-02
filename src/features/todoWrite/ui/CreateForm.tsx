//  생성 폼
export default function CreateForm() {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <form style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
      <h1>새 Todo 만들기</h1>

      <label>
        제목 <input name="title" required />
      </label>

      <label>
        우선순위
        <select name="priority" defaultValue={1}>
          <option value={1}>P1</option>
          <option value={2}>P2</option>
          <option value={3}>P3</option>
        </select>
      </label>

      <label>
        기간으로 입력 <input type="checkbox" name="isRange" />
      </label>

      <fieldset style={{ border: '1px solid #e5e7eb', padding: 10 }}>
        <legend>일정</legend>
        <div style={{ display: 'grid', gap: 8 }}>
          <div>
            <small>단일</small>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="date" name="date" defaultValue={today} />
              <input type="time" name="time" defaultValue="09:00" />
            </div>
          </div>
          <div>
            <small>기간</small>
            <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <input type="date" name="startDate" />
              <input type="date" name="endDate" />
              <input type="time" name="startTime" />
              <input type="time" name="endTime" />
            </div>
          </div>
        </div>
      </fieldset>

      <label>
        설명 <textarea name="description" rows={3} />
      </label>

      <label>
        태그 (쉼표로 구분) <input name="tags" placeholder="work, urgent" />
      </label>

      <div>
        <button type="submit">생성</button>
      </div>
    </form>
  )
}
