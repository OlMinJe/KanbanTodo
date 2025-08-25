import { Label, Switch } from '@/components/ui'
import { THEME_STATE, useTheme } from '@/feature/theme'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === THEME_STATE.DARK

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="theme-mode" className="flex items-center">
        {isDark ? <Moon className="text-yellow-400" /> : <Sun className="text-orange-400" />}
      </Label>
      <Switch id="theme-mode" checked={isDark} onCheckedChange={toggle} />
    </div>
  )
}
