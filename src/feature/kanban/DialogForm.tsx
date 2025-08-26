import { InputField, SelectField } from '@/components/field'
import { Button, Switch } from '@/components/ui'
import { PRIOITY_OPTIONS, TASK_STATUS_OPTIONS } from '@/constants/field'
import DateField from '@/feature/kanban/DatePopver'

// TODO props 값 정리 필요
export default function DialogForm() {
  return (
    <form>
      {/* 필수: TODO 제목, 상태, 우선순위 */}
      <fieldset className="mb-5">
        <legend className="sr-only">필수 입력 정보</legend>
        {/* content */}
        <div className="flex gap-3">
          <InputField
            id="title"
            name="title"
            label="TODO 제목"
            required={true}
            hint=""
            error=""
            placeholder="제목을 입력하세요"
            containerClassName="min-w-auto"
          />
          <SelectField
            id="todo-state"
            name="todo-state"
            label="작업 상태"
            required={true}
            hint=""
            error=""
            placeholder="작업 상태"
            triggerClassName="w-[100px]"
            options={TASK_STATUS_OPTIONS}
            value=""
            onValueChange={() => console.log('SelectField onValueChange')}
          />
          <SelectField
            id="priority"
            name="priority"
            label="작업 순위"
            required={true}
            hint=""
            error=""
            placeholder="작업 순위"
            containerClassName=""
            triggerClassName="w-[100px]"
            options={PRIOITY_OPTIONS}
            value=""
            onValueChange={() => console.log('SelectField onValueChange')}
          />
        </div>
        <div>
          {/* 토글로 단일 혹은 기간 선택 */}
          <Switch></Switch>
          <div className="flex gap-4">
            <DateField
              id="single-date"
              name="single-date"
              label="날짜"
              required={true}
              hint=""
              error=""
              containerClassName="flex flex-col gap-3"
            />
            <div className="flex flex-col gap-3">
              <InputField
                id="single-time"
                name="single-time"
                label="시간"
                required={true}
                hint=""
                error=""
                containerClassName="flex flex-col gap-3"
                type="time"
                step="1"
                defaultValue="10:30:00"
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-4">
              <DateField
                id="range-date-start"
                name="range-date-start"
                label="시작 날짜"
                required={true}
                hint=""
                error=""
                containerClassName="flex flex-col gap-3"
              />
              <div className="flex flex-col gap-3">
                <InputField
                  id="range-time-start"
                  name="range-time-start"
                  label="시작 시간"
                  required={true}
                  hint=""
                  error=""
                  placeholder=""
                  containerClassName="flex flex-col gap-3"
                  type="time"
                  step="1"
                  defaultValue="10:30:00"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <DateField
                id="range-date-end"
                name="range-date-end"
                label="종료 날짜"
                required={true}
                hint=""
                error=""
                containerClassName="flex flex-col gap-3"
                placeholder=""
              />
              <div className="flex flex-col gap-3">
                <InputField
                  id="range-time-end"
                  name="range-time-end"
                  label="종료 시간"
                  required={true}
                  hint=""
                  error=""
                  containerClassName="flex flex-col gap-3"
                  type="time"
                  step="1"
                  defaultValue="10:30:00"
                />
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-5">
        <InputField
          id="description"
          name="description"
          label="TODO 설명"
          placeholder="TODO에 대한 설명을 입력하세요"
          type="textarea"
        />
      </fieldset>

      <Button>제출</Button>
    </form>
  )
}
