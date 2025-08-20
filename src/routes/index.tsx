import Timeline from '@/routes//pages/Timeline'
import DefaultLayout from '@/routes/layout/DefaultLayout'
import Home from '@/routes/pages/Home'
import Stats from '@/routes/pages/Stats'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/timeline',
        element: <Timeline />,
      },
      {
        path: '/stats',
        element: <Stats />,
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
