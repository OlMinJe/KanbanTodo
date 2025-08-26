import { showError } from '@/lib/alert'
import type { THEME } from '@/types/theme'

const isTheme = (v: unknown): v is THEME => v === 'dark' || v === 'light'

export default function getInitialTheme(): THEME {
  // 테마 가져오기
  try {
    const saved = localStorage.getItem('THEME_KEY')
    if (isTheme(saved)) return saved
  } catch {
    showError('테마 정보 없음', '테마 정보 가져오기에 실패하였습니다.')
    return 'light'
  }
  // 브라우저 선호 결과를 토대로 테마 모드 결정
  try {
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    showError('테마 전환 실패', '테마 전환에 실패하였습니다..')
    return 'light'
  }
}
