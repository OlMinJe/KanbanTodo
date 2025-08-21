import { ROUTES } from '@/lib/routes'
import Timeline from '@/routes//pages/Timeline'
import DefaultLayout from '@/routes/layout/DefaultLayout'
import Home from '@/routes/pages/Home'
import NotFound from '@/routes/pages/NotFound'
import Stats from '@/routes/pages/Stats'
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
