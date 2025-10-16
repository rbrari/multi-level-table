import { ThemeToggle } from '@/components/theme'
import { Building2 } from 'lucide-react'

interface HeaderProps {
  title?: string
}

export function Header({ title = 'Stealth Company' }: Readonly<HeaderProps>) {
  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">
              <Building2 className="size-4" />
            </span>
          </div>
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
