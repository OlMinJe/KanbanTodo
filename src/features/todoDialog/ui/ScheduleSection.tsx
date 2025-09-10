import type { FORM_ERRORS, TODO } from '@/entities/todo'
import { DatePopover, useTodoFormStore } from '@/features/todoDialog'
import { InputField } from '@/shared/ui/form'
import { Switch } from '@/shared/ui/shadcn'
import { type ChangeEvent } from 'react'

export default function ScheduleSection(props: { todo: TODO; errors?: FORM_ERRORS }) {
  const { errors = {} } = props
  const {
    isRange,
    dateSingle,
    timeSingle,
    dateStart,
    timeStart,
    dateEnd,
    timeEnd,
    setField,
    clearErrors,
  } = useTodoFormStore((s) => s)

  return (
    <fieldset className="mt-4 space-y-3">
      <legend className="sr-only">날짜/시간</legend>

      <div className="flex items-center gap-2">
        <Switch
          checked={!!isRange}
          onCheckedChange={(b) => {
            setField('isRange', b)
            clearErrors?.(['date', 'time', 'dateStart', 'timeStart', 'dateEnd', 'timeEnd', 'range'])
          }}
        />
        <span className="text-sm">기간 선택(시작/종료)</span>
      </div>

      {!isRange && (
        <div className="flex gap-4">
          <DatePopover
            id="single-date"
            name="single-date"
            label="날짜"
            required
            containerClassName="flex flex-col gap-3"
            value={dateSingle}
            onValueChange={(d) => {
              setField('dateSingle', d)
              clearErrors?.(['date'])
            }}
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
            value={timeSingle}
            onChange={(e: any) => {
              setField('timeSingle', e.target.value)
              clearErrors?.(['time'])
            }}
            error={errors?.time}
            defaultValue="10:30:00"
          />
        </div>
      )}

      {isRange && (
        <>
          <div className="flex gap-4">
            <DatePopover
              id="range-start-date"
              name="range-start-date"
              label="시작 날짜"
              required
              containerClassName="flex flex-col gap-3"
              value={dateStart}
              onValueChange={(d) => {
                setField('dateStart', d)
                clearErrors?.(['dateStart', 'range'])
              }}
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
              value={timeStart}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setField('timeStart', e.target.value)
                clearErrors?.(['timeStart', 'range'])
              }}
              error={errors?.timeStart}
              defaultValue="10:30:00"
            />
          </div>

          <div className="flex gap-4">
            <DatePopover
              id="range-end-date"
              name="range-end-date"
              label="종료 날짜"
              required
              containerClassName="flex flex-col gap-3"
              value={dateEnd}
              onValueChange={(d) => {
                setField('dateEnd', d)
                clearErrors?.(['dateEnd', 'range'])
              }}
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
              value={timeEnd}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setField('timeEnd', e.target.value)
                clearErrors?.(['timeEnd', 'range'])
              }}
              error={errors?.timeEnd}
              defaultValue="10:30:00"
            />
          </div>

          {errors?.range && <p className="text-xs text-red-600">{errors.range}</p>}
        </>
      )}
    </fieldset>
  )
}
