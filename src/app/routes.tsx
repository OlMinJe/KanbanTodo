import { ROUTES } from '@/shared/lib/routes'
import { DefaultLayout } from '@/widgets/layout'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

const Home = lazy(() => import('@/pages/home'))
const Stats = lazy(() => import('@/pages/stats'))
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
      { path: ROUTES.STATS.to, element: <Stats /> },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
