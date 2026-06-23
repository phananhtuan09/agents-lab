import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from '@/features/app-shell/ErrorBoundary'
import { LoadingFallback } from '@/features/app-shell/LoadingFallback'
import { setupGlobalErrorHandlers } from '@/lib/logging/global-handlers'
import './index.css'

setupGlobalErrorHandlers();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)