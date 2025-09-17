import { AreaChart, BarCharHorizontal, BarChart, PieChartCountText } from '@/widgets/chart'

export default function StatsChart() {
  return (
    <div className="container mx-auto max-w-5xl px-4">
      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PieChartCountText />
          <BarCharHorizontal />
        </div>
        <BarChart />
      </div>
      <AreaChart />
    </div>
  )
}
