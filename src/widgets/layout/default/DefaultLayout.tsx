import { Footer, Header } from '@/widgets/layout'
import { Outlet } from 'react-router'

export default function DefaultLayout() {
  return (
    <div className="w-dvw min-h-screen min-h-dvh flex flex-col">
      <Header />
      <main className="p-5 flex-1 min-h-0 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
