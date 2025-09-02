import { Toolbar } from '@/features/todoToolbar'
import { Board } from '@/widgets/todoBoard'
import { Calendar } from '@/widgets/todoCalendar'

export default function Home() {
  return (
    <div className="w-fit my-0 mx-auto text-center">
      <Calendar />
      <div className="space-y-4">
        <Toolbar />
        <Board />
      </div>
    </div>
  )
}
