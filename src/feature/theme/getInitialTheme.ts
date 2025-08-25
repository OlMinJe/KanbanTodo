import type { THEME } from '@/types/theme'

const isTheme = (v: unknown): v is THEME => v === 'dark' || v === 'light'

export default function getInitialTheme(): THEME {
  try {
    const saved = localStorage.getItem('THEME_KEY')
    if (isTheme(saved)) return saved
  } catch {
    // TODO: 오류 alert
    return 'light'
  }
  try {
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    // TODO: 오류 alert
    return 'light'
  }
}
