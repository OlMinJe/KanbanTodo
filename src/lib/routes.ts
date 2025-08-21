// 내부 라우트
export const ROUTES = {
  HOME: { to: '/', label: 'To-Do' },
  TIMELINE: { to: '/timeline', label: '타임라인' },
  STATS: { to: '/stats', label: '통계' },
  NOT_FOUND: { to: '*', label: 'NOT_FOUND' },
}

export type RouteKey = keyof typeof ROUTES
export type RouteInfo = (typeof ROUTES)[RouteKey]

export const NAV_ORDER = ['HOME', 'TIMELINE', 'STATS'] as const

export const NAV_ITEMS: Readonly<RouteInfo[]> = NAV_ORDER.map((k) => ROUTES[k])

// ───────────────────────────────────────────────────────────

// 외부 링크
export const EXTERNAL_LINKS = {
  BLOG: {
    href: 'https://velog.io/@ol_minje/posts',
    label: '블로그',
    ariaLabel: '블로그',
    iconClass: 'fa-solid fa-pen',
  },
  GITHUB: {
    href: 'https://github.com/OlMinJe',
    label: 'GitHub',
    ariaLabel: 'GitHub',
    iconClass: 'fa-brands fa-github',
  },
} as const

export type ExternalKey = keyof typeof EXTERNAL_LINKS
export type ExternalInfo = (typeof EXTERNAL_LINKS)[ExternalKey]
