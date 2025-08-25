import { ROUTES } from '@/lib/routes'
import DefaultLayout from '@/routes/layout/DefaultLayout'
import { Home, NotFound, Stats, Timeline } from '@/routes/pages'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: ROUTES.HOME.to,
        element: <Home />,
      },
      {
        path: ROUTES.TIMELINE.to,
        element: <Timeline />,
      },
      {
        path: ROUTES.STATS.to,
        element: <Stats />,
      },
      {
        path: ROUTES.NOT_FOUND.to,
        element: <NotFound />,
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
