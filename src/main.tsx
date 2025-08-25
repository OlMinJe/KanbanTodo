import { ThemeProvider } from '@/feature/theme/ThemeProvider'
import '@/index.css'
import Router from '@/routes'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Suspense>
  </StrictMode>
)
