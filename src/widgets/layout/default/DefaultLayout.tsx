import { Footer, Header } from '@/widgets/layout'
import { Outlet } from 'react-router'

export default function DefaultLayout() {
  return (
    <div className="w-full min-h-screen min-h-dvh flex flex-col">
      <Header />
      <main className="p-5 flex-1 min-h-0overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
