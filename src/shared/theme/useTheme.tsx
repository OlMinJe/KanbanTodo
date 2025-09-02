import { ThemeContext } from '@/app/providers'
import { useContext } from 'react'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme: ThemeProvider')
  return ctx
}
