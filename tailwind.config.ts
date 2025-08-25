import type { Config } from 'tailwindcss'

export default {
  content: ['index.html', 'src/**/*.{ts,tsx,js,jsx}'],
  theme: { extend: {} },
  plugins: [],
  darkMode: 'class',
} satisfies Config
