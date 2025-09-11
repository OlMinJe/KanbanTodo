import type { FORM_ERRORS, TODO } from '@/entities/todo'
import { DatePopover, useScheduleFields } from '@/features/todoDialog'
import { InputField } from '@/shared/ui/form'
import { Switch } from '@/shared/ui/shadcn'

export default function ScheduleSection(props: {
  todo: TODO
  errors?: FORM_ERRORS
  openedAt?: number
}) {
  const { errors = {}, openedAt } = props
  const { state, display, handlers } = useScheduleFields({ openedAt })

  return (
    <fieldset className="mt-4 space-y-3">
      <legend className="sr-only">날짜/시간</legend>

      <div className="flex items-center gap-2">
        <Switch checked={!!state.isRange} onCheckedChange={handlers.onToggleRange} />
        <span className="text-sm">기간 선택(시작/종료)</span>
      </div>

      {!state.isRange && (
        <div className="flex gap-4">
          <DatePopover
            id="single-date"
            name="single-date"
            label="날짜"
            required
            containerClassName="flex flex-col gap-3"
            value={state.dateSingle}
            onValueChange={(d) => handlers.onChangeSingleDate(d ?? new Date())}
            error={errors?.date}
          />
          <InputField
            id="single-time"
            name="single-time"
            label="시간"
            required
            containerClassName="flex flex-col gap-3"
            type="time"
            step="1"
            value={display.timeSingle8}
            onChange={handlers.onChangeSingleTime as any}
            error={errors?.time}
          />
        </div>
      )}

      {state.isRange && (
        <>
          <div className="flex gap-4">
            <DatePopover
              id="range-start-date"
              name="range-start-date"
              label="시작 날짜"
              required
              containerClassName="flex flex-col gap-3"
              value={state.dateStart}
              onValueChange={(d) => handlers.onChangeStartDate(d ?? new Date())}
              error={errors?.dateStart}
            />
            <InputField
              id="range-start-time"
              name="range-start-time"
              label="시작 시간"
              required
              containerClassName="flex flex-col gap-3"
              type="time"
              step="1"
              value={display.timeStart8}
              onChange={handlers.onChangeStartTime}
              error={errors?.timeStart}
            />
          </div>

          <div className="flex gap-4">
            <DatePopover
              id="range-end-date"
              name="range-end-date"
              label="종료 날짜"
              required
              containerClassName="flex flex-col gap-3"
              value={state.dateEnd}
              onValueChange={(d) => handlers.onChangeEndDate(d ?? new Date())}
              error={errors?.dateEnd}
            />
            <InputField
              id="range-end-time"
              name="range-end-time"
              label="종료 시간"
              required
              containerClassName="flex flex-col gap-3"
              type="time"
              step="1"
              value={display.timeEnd8}
              onChange={handlers.onChangeEndTime}
              error={errors?.timeEnd}
            />
          </div>

          {errors?.range && <p className="text-xs text-red-600">{errors.range}</p>}
        </>
      )}
    </fieldset>
  )
}
