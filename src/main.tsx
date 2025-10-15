import App from '@/App.tsx'
import { ThemeProvider } from '@/components/theme'
import '@/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

async function enableMocking() {
  const { worker } = await import('./mocks/browser.ts')
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider defaultTheme="system">
        <App />
      </ThemeProvider>
    </StrictMode>,
  ),
)
