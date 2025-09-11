import { showError } from '@/shared/notification'
import { type THEME } from '@/shared/theme'
import { THEME_KEY, THEME_STATE } from '@/shared/theme/constants'

const isTheme = (v: unknown): v is THEME => v === THEME_STATE.DARK || v === THEME_STATE.LIGHT

export default function getInitialTheme(): THEME {
  if (typeof window === 'undefined') return THEME_STATE.LIGHT

  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (isTheme(saved)) return saved
  } catch {
    showError('테마 정보 없음', '테마 정보 가져오기에 실패하였습니다.')
  }

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEME_STATE.DARK
      : THEME_STATE.LIGHT
  } catch {
    showError('테마 전환 실패', '테마 전환에 실패하였습니다..')
    return THEME_STATE.LIGHT
  }
}
