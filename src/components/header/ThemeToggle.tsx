import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="theme-mode">
        <Sun />
        <Moon />
      </Label>
      <Switch id="theme-mode" />
    </div>
  )
}
