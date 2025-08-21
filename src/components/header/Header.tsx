import MainNav from '@/components/header/MainNav'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  return (
    <header>
      <h1 className="sr-only">헤더 영역입니다.</h1>
      <div className="px-5 py-5 w-full flex justify-between justify-items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="logo image" className="w-10 mr-1" />
          칸투펀치
        </div>
        <MainNav />
        <div className="flex items-center space-x-2">
          <Label htmlFor="theme-mode">
            <Sun className="text-orange-400" />
            <Moon className="text-yellow-400" />
          </Label>
          <Switch id="theme-mode" />
        </div>
      </div>
    </header>
  )
}
