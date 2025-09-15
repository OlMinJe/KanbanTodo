'use client'

import { getInitialTheme, type THEME } from '@/shared/theme'
import { THEME_KEY, THEME_STATE } from '@/shared/theme/constants'
import { useEffect, type ReactNode } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'

export const useThemeStore = create<{
  theme: THEME
  set: (t: THEME) => void
  toggle: () => void
}>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        theme: typeof window !== 'undefined' ? getInitialTheme() : THEME_STATE.LIGHT,

        set: (t) => set({ theme: t }),
        toggle: () =>
          set({
            theme: get().theme === THEME_STATE.DARK ? THEME_STATE.LIGHT : THEME_STATE.DARK,
          }),
      }),
      {
        name: THEME_KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({ theme: s.theme }),
      }
    )
  )
)

function applyThemeClass(t: THEME) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle(THEME_STATE.DARK, t === THEME_STATE.DARK)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyThemeClass(useThemeStore.getState().theme)

    const unsub = useThemeStore.subscribe(
      (s) => s.theme,
      (t) => applyThemeClass(t),
      { fireImmediately: false }
    )
    return unsub
  }, [])

  return <>{children}</>
}

export function useTheme() {
  const theme = useThemeStore((s) => s.theme)
  const set = useThemeStore((s) => s.set)
  const toggle = useThemeStore((s) => s.toggle)
  return { theme, set, toggle }
}
