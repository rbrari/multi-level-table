import type { ThemeProviderState } from '@/components/theme/types'
import { createContext } from 'react'

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => {
    throw new Error('setTheme must be used within ThemeProvider')
  },
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
