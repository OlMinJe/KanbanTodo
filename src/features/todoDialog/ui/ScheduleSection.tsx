import type { FORM_ERRORS, TODO } from '@/entities/todo'
import { DatePopover, useScheduleFields } from '@/features/todoDialog'
import { InputField } from '@/shared/ui/form'

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

      <div className="flex gap-4">
        <DatePopover
          id="single-date"
          name="single-date"
          label="날짜"
          required
          containerClassName="flex flex-col gap-3"
          value={state.dateSingle}
          onValueChange={(d) => handlers.onChangeSingleDate(d ?? new Date())}
          error={errors?.dateSingle}
        />
        <InputField
          id="single-time"
          name="single-time"
          label="시간"
          required
          containerClassName="flex flex-col gap-3"
          type="time"
          step="1"
          value={display.timeSingle}
          onChange={handlers.onChangeSingleTime as any}
          error={errors?.timeSingle}
        />
      </div>
    </fieldset>
  )
}
