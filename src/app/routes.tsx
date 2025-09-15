import { ROUTES } from '@/shared/lib'
import { DefaultLayout } from '@/widgets/layout'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

const Home = lazy(() => import('@/pages/home'))
const StatsChart = lazy(() => import('@/pages/statsChart'))
const Timeline = lazy(() => import('@/pages/timeline'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const router = createBrowserRouter([
  {
    path: ROUTES.HOME.to,
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [
      { path: ROUTES.HOME.to, element: <Home /> },
      { path: ROUTES.TIMELINE.to, element: <Timeline /> },
      { path: ROUTES.STATS_CHART.to, element: <StatsChart /> },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
