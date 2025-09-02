import { AlertProvider, ThemeProvider } from '@/app/providers'
import Router from '@/app/routes'
import '@/index.css'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <ThemeProvider>
        <AlertProvider />
        <Router />
      </ThemeProvider>
    </Suspense>
  </StrictMode>
)
