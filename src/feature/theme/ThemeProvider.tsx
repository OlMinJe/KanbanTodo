import type { CTX_TYPE, THEME_TYPE } from '@/feature/theme'
import { THEME_KEY, THEME_STATE, getInitialTheme } from '@/feature/theme'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext<CTX_TYPE | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<THEME_TYPE>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.classList.toggle(THEME_STATE.DARK, theme === THEME_STATE.DARK)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const value = useMemo<CTX_TYPE>(
    () => ({
      theme,
      set: setTheme,
      toggle: () =>
        setTheme((t) => (t === THEME_STATE.DARK ? THEME_STATE.LIGHT : THEME_STATE.DARK)),
    }),
    [theme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
