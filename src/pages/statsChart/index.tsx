import { AreaChart, BarCharHorizontal, BarChart, PieChartCountText } from '@/widgets/chart'

export default function StatsChart() {
  return (
    <div className="min-w-[320px] max-w-3xl mx-auto my-0">
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <BarChart />
        <BarCharHorizontal />
        <PieChartCountText />
      </div>
      <AreaChart />
    </div>
  )
}
