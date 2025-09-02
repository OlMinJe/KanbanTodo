import { logoImg } from '@/shared/assets'
import { ROUTES } from '@/shared/lib/routes'
import { ThemeToggle } from '@/shared/theme'
import { MainNav } from '@/widgets/layout'
import { NavLink } from 'react-router'

export default function Header() {
  return (
    <header className="shrink-0 ">
      <h1 className="sr-only">헤더 영역입니다.</h1>
      <div className="px-5 py-5 w-full flex justify-between justify-items-center">
        <NavLink to={ROUTES.HOME.to} className="flex items-center">
          <img src={logoImg} alt="logo image" className="w-10 mr-1" />
          <span className="hidden md:inline">칸투펀치</span>
        </NavLink>
        <MainNav />
        <ThemeToggle />
      </div>
    </header>
  )
}
