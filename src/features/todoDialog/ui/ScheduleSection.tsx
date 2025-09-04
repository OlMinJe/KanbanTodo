import type { TODO } from '@/entities/todo'
import { DatePopover, useTodoFormStore } from '@/features/todoDialog'
import { InputField } from '@/shared/ui/form'
import { Switch } from '@/shared/ui/shadcn'
import { useEffect, type ChangeEvent } from 'react'

export default function ScheduleSection({ todo }: { todo: TODO }) {
  const {
    isRange,
    setIsRange,
    dateSingle,
    setDateSingle,
    timeSingle,
    setTimeSingle,
    dateStart,
    setDateStart,
    timeStart,
    setTimeStart,
    dateEnd,
    setDateEnd,
    timeEnd,
    setTimeEnd,
    errors,
    clearErrors,
  } = useTodoFormStore((s) => s)

  useEffect(() => {
    setIsRange(todo.isRange)
    todo.date && setDateSingle(new Date(todo.date))
    todo.time && setTimeSingle(todo.time)
    todo.startDate && setDateStart(new Date(todo.startDate))
    todo.startTime && setTimeStart(todo.startTime)
    todo.endDate && setDateEnd(new Date(todo.endDate))
    todo.endTime && setTimeEnd(todo.endTime)
  }, [todo?.id])

  return (
    <fieldset className="mt-4 space-y-3">
      <legend className="sr-only">날짜/시간</legend>
      <div className="flex items-center gap-2">
        <Switch
          checked={isRange}
          onCheckedChange={(b) => {
            setIsRange(b)
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
              setDateSingle(d)
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
              setTimeSingle(e.target.value)
              clearErrors?.(['time'])
            }}
            error={errors?.time}
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
                setDateStart(d)
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
                setTimeStart(e.target.value)
                clearErrors?.(['timeStart', 'range'])
              }}
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
              value={dateEnd}
              onValueChange={(d) => {
                setDateEnd(d)
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
                setTimeEnd(e.target.value)
                clearErrors?.(['timeEnd', 'range'])
              }}
              error={errors?.timeEnd}
            />
          </div>
          {errors?.range && <p className="text-xs text-red-600">{errors.range}</p>}
        </>
      )}
    </fieldset>
  )
}
