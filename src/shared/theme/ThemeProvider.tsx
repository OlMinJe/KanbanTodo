import { getInitialTheme, type CTX, type THEME } from '@/shared/theme'
import { THEME_KEY, THEME_STATE } from '@/shared/theme/constants'
import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export const ThemeContext = createContext<CTX | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<THEME>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.classList.toggle(THEME_STATE.DARK, theme === THEME_STATE.DARK)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const value = useMemo<CTX>(
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
