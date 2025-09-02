export type THEME = 'light' | 'dark'

export type CTX = {
  theme: THEME
  set: (t: THEME) => void
  toggle: () => void
}

export type THEME_STATE = {
  theme: THEME
  setTheme: (t: THEME) => void
  toggle: () => void
}
