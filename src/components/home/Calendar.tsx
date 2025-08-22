import CalendarDayButton from '@/components/home/CalendarDayButton'
import { Calendar as BaseCalendar } from '@/components/ui/calendar'
import { useState, type ComponentProps } from 'react'

type CalendarProps = ComponentProps<typeof BaseCalendar>

const Calendar = ({ className, ...props }: CalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <BaseCalendar
      {...props}
      mode="single"
      selected={date}
      onSelect={setDate}
      className="mt-0 mb-5 mx-auto text-foreground"
      classNames={{
        caption_label:
          'flex items-center gap-1 text-xl h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
        month_caption: 'flex items-center justify-center h-(--cell-size) w-full',
        dropdowns:
          'w-full flex items-center text-sm font-medium justify-start h-(--cell-size) gap-1 [&>*:first-child]:order-2 [&>*:last-child]:order-1',
        dropdown_root: 'relative',
        day: '',
        today: 'bg-orange-100 text-orange-900 rounded-md',
        nav: 'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-end',
      }}
      components={{
        DayButton: CalendarDayButton,
      }}
      captionLayout="dropdown"
      // 드롭다운 범위
      startMonth={new Date(2000, 0)}
      endMonth={new Date(2030, 11)}
      // 한국어 포맷
      formatters={{
        formatCaption: (d) => d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' }),
        formatWeekdayName: (d) => d.toLocaleDateString('ko-KR', { weekday: 'short' }),
        formatMonthDropdown: (d) => d.toLocaleDateString('ko-KR', { month: 'long' }),
        formatYearDropdown: (d) => d.toLocaleDateString('ko-KR', { year: 'numeric' }),
      }}
    />
  )
}

export default Calendar
