import { type THEME } from '@/shared/theme'

export const THEME_KEY = import.meta.env.VITE_STORAGE_THEME_KEY ?? 'theme'
export const THEME_STATE = {
  LIGHT: 'light',
  DARK: 'dark',
} as Record<'LIGHT' | 'DARK', THEME>
