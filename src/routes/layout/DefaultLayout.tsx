import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
