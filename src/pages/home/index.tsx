import { Board } from '@/widgets/todoBoard'
import { Calendar } from '@/widgets/todoCalendar'
import { Toolbar } from '@/widgets/todoToolbar'

export default function Home() {
  return (
    <div className="max-w-[1000px] pb-15 my-0 mx-auto text-center">
      <Calendar />
      <div className="p-4 sm:p-6 lg:p-0">
        <Toolbar />
        <Board />
      </div>
    </div>
  )
}
