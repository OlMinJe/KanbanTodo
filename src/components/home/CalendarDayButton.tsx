import { CalendarDayButton as BaseCalendarDayButton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'

type CalendarDayButtonProps = ComponentProps<typeof BaseCalendarDayButton>

const CalendarDayButton = ({ className, ...props }: CalendarDayButtonProps) => {
  return (
    <BaseCalendarDayButton
      {...props}
      className={cn(
        'max-h-10 px-7 md:px-12 py-0 rounded-md text-sm font-normal',
        // hover
        'hover:bg-orange-300 hover:text-white hover:rounded-md ',
        // selected
        'data-[selected-single=true]:!bg-orange-500 data-[selected-single=true]:!text-white',
        'aria-selected:!bg-orange-500 aria-selected:!text-white',
        'data-[selected=true]:!bg-orange-500 data-[selected=true]:!text-white',

        // 날짜 범위 선택
        // 'data-[range-start=true]:!bg-orange-500 data-[range-start=true]:!text-white',
        // 'data-[range-end=true]:!bg-orange-500 data-[range-end=true]:!text-white',
        // 'data-[range-middle=true]:bg-orange-100 data-[range-middle=true]:text-orange-900',

        className
      )}
    />
  )
}

export default CalendarDayButton
