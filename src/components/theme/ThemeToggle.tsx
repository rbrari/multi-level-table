import type { Theme } from '@/components/theme/types'
import { useTheme } from '@/components/theme/useTheme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Check, Moon, Sun } from 'lucide-react'

interface ThemeMenuItemProps {
  readonly value: Theme
  readonly label: string
  readonly currentTheme: Theme
  readonly onSelect: (theme: Theme) => void
}

function ThemeMenuItem({ value, label, currentTheme, onSelect }: ThemeMenuItemProps) {
  return (
    <DropdownMenuItem onClick={() => onSelect(value)}>
      <Check className={cn('mr-2 size-4', { 'opacity-0': currentTheme !== value })} />
      {label}
    </DropdownMenuItem>
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[9999]">
        <ThemeMenuItem value="light" label="Light" currentTheme={theme} onSelect={setTheme} />
        <ThemeMenuItem value="dark" label="Dark" currentTheme={theme} onSelect={setTheme} />
        <ThemeMenuItem value="system" label="System" currentTheme={theme} onSelect={setTheme} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
