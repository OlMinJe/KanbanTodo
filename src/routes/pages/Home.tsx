import Calendar from '@/components/home/Calendar'
import Kanban from '@/components/home/Kanban'

export default function Home() {
  return (
    <div className="w-fit my-0 mx-auto text-center">
      <Calendar />
      <Kanban />
    </div>
  )
}
